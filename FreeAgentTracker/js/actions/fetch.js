const BASE_URL = 'http://www.nba.com/.element/json/1.1/sect/freeagents/freeagents2016.json'

function flattenResults(headers, data) {
  return new Promise((resolve, reject) => {
    let response = data.map((o, i) => {
      let flattened = {};

      Object.keys(o).forEach((key, j) => {
        let k = headers[j].toLowerCase().replace(/\ /g, '_');
        flattened[k] = o[key]
      });

      return flattened;
    });

    return resolve(response)
  })
}

export default function getResults(cb) {
  fetch(BASE_URL)
    .then(response => response.json())
    .then(json => flattenResults(json.listHead, json.listData))
    .then(flat => cb(null, flat))
    .catch(error => cb(error));
}
