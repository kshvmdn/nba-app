import re
import requests

from collections import OrderedDict
from datetime import datetime

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
