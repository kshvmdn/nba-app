import json
import sys

from scraper import scrape

year = sys.argv[1] if len(sys.argv) > 1 else '2016'
data = scrape(year)

if not data:
    raise RuntimeError('Failed to scrape data.')

dump = json.dumps(data, sort_keys=True)

if len(sys.argv) > 2:
    with open(sys.argv[2], 'w') as f:
        f.write(dump)

print(dump)
