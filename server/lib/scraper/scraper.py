import json
import re
from collections import OrderedDict
from datetime import datetime
from pprint import pprint

import requests

BASE = 'http://www.nba.com/.element/json/1.1/sect/freeagents/freeagents%s.json'


def scrape(year):
    return parse(get(year))


def get(year):
    try:
        with requests.Session() as s:
            return s.get(BASE % year).json()
    except:
        return None


def parse(resp):
    if not resp:
        return None

    last_modified = datetime.strptime(
        resp['metaData']['lastModified'], '%m/%d/%Y').date().isoformat()

    docs = {
        'meta': {
            'updated': last_modified
        },
        'data': []
    }

    for player in resp['listData']:
        doc = OrderedDict()

        for k, v in player.items():
            k = resp['listHead'][k].lower().strip().replace(' ', '_')

            v = None if v == '---' else v

            if v and k in ('exp', 'age', 'contract'):
                try:
                    v = int(re.sub(r'\D', '', v))
                except:
                    v = None

            doc[k] = v

        docs['data'].append(doc)

    return docs


if __name__ == '__main__':
    import sys

    year = sys.argv[1] if sys.argv.__len__ > 1 else '2016'
    with open('out.json', 'w') as f:
        f.write(json.dumps(scrape(year), indent=2, sort_keys=True))
