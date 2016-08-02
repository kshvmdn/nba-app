import axios from 'axios';
import moment from 'moment';

const BASE_URL = 'http://www.nba.com/.element/json/1.1/sect/freeagents';

function parseResponse (response) {
  return new Promise((resolve, reject) => {
    const { status, statusText, headers, config, request, data } = response;

    if (!data) return reject(new Error('Failed to fetch data.'));

    const { metaData, listHead, listData, listFoot } = data;

    const contractOptions = {};

    listFoot.forEach((v) => {
      let m = v.match(/\*\*?\*?/g);
      contractOptions[m] = v.split(m)[1].replace(/option/i, '').trim();
    });

    const parsed = listData.map((obj) => {
      let updated = {};
      let option = null;

      for (let prop in obj) {
        let k = listHead[prop].toLowerCase().trim().replace(/ /g, '_');
        let v = obj[prop];

        if (!v || v === '---') v = '';

        let match = v.match(/\*\*?\*?/g);
        if (match) {
          option = contractOptions[match];
          v = v.replace(match, '');
        }

        updated[k] = v || null;
      }

      updated['contract_option'] = option;
      return updated;
    });

    return resolve({
      meta: {
        updated: moment(metaData.lastModified, "MM/DD/YYYY").toISOString(),
        status,
        message: statusText
      },
      data: parsed
    });
  });
}

export default function getFreeAgentData (year, cb) {
  if (!year) year = moment().year();

  axios.get(`${BASE_URL}/freeagents${year}.json`)
    .then((resp) => parseResponse(resp))
    .then((parsed) => cb(null, parsed))
    .catch((e) => cb(e));
}
