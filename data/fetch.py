import json
import os
import requests
import sys
import time
from pprint import pprint

BASE = 'http://stats.nba.com/stats/%s'
HEADERS = {
    'Host': 'stats.nba.com',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36'
}


def make_request(endpoint, payload):
    response = requests.get(BASE % endpoint, params=payload, headers=HEADERS)
    return response.json()


if __name__ == '__main__':
    if not os.path.exists('player_data'):
        os.makedirs('player_data')

    params = dict(isOnlyCurrentSeason='1', LeagueId='00', Season='2016-17')

    commonallplayers = \
        make_request('commonallplayers', params)['resultSets'][0]

    allplayers = commonallplayers['rowSet']
    i = 0

    for player in allplayers:
        i += 1
        print('{}/{}, {}%'.format(i, len(allplayers), (i/len(allplayers))))

        try:
            current = dict(zip(
                [h.lower() for h in commonallplayers['headers']],
                player))

            if current['rosterstatus'] != 1 or not current['person_id']:
                continue

            print('Fetching {}'.format(current['person_id']))

            if os.path.exists('player_data/%s.json' % current['person_id']):
                continue

            params = dict(LeagueID='00', SeasonType='Regular+Season',
                          PlayerId=current['person_id'])

            commonplayerinfo, playerheadlinestats = \
                make_request('commonplayerinfo', params)['resultSets']

            current['player_info'] = dict(zip(
                [h.lower() for h in commonplayerinfo['headers']],
                commonplayerinfo['rowSet'][0]))

            current['headline_stats'] = dict(zip(
                [h.lower() for h in playerheadlinestats['headers']],
                playerheadlinestats['rowSet'][0]))

            with open('player_data/%s.json' % current['person_id'], 'w+') as f:
                f.write(json.dumps(current))

            time.sleep(1)
        except Exception as e:
            print(e)
            continue
