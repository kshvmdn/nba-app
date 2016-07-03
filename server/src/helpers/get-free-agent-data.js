import PythonShell from 'python-shell';

export default function getFreeAgentData (year) {
  const options = {
    mode: 'json',
    scriptPath: './server/lib/scraper',
    args: [year, `./server/.data/${year}.json`]
  };

  const script = ''; // __main__.py

  return new Promise((resolve, reject) => {
    try {
      PythonShell.run(script, options, (err, results) => {
        if (err) return reject(err);

        if (!results || !results[0]) {
          let e = new Error('Failed to retrieve data.');
          e.status = 404;

          return reject(e);
        }

        return resolve(results[0]);
      });
    } catch(e) {
      return reject(e);
    }
  });
}
