import axios from 'axios';
import moment from 'moment';

const BASE_URL = 'http://www.nba.com/.element/json/1.1/sect/freeagents';

function parseResponse (response) {
  return new Promise((resolve, reject) => {
    const { status, statusText, headers, config, request, data } = response;

    if (!data) return reject(new Error('Couldn\'t get data'));

    const { metaData, listHead, listData, listFoot } = data;

    const lastUpdated = moment(metaData.lastModified, "MM/DD/YYYY").toISOString()

    const optionMap = {};

    listFoot.forEach((el) => {
      let match = el.match(/\*\*?\*?/g);
      optionMap[match] = el.split(match)[1].replace(/option/i, '').trim();
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
          option = optionMap[match];
          v = v.replace(match, '');
        }

        updated[k] = v || null;
      }

      updated['contract_option'] = option;
      return updated;
    });

    return resolve({
      meta: {
        updated: lastUpdated,
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
