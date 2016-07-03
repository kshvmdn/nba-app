import PythonShell from 'python-shell';

export default function getFreeAgentData (year) {
  const options = {
    mode: 'json',
    scriptPath: './server/lib/scraper',
    args: [year]
  };

  const script = ''; // __main__.py

  return new Promise((resolve, reject) => {
    try {
      PythonShell.run(script, options, (err, results) => {
        if (err) reject(err);

        if (!results || !results[0]) {
          let e = new Error('Failed to retrieve data.');
          e.status = 404;

          reject(e);
        }

        resolve(results[0]);
      });
    } catch(e) {
      reject(e);
    }
  });
}
