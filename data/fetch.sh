#!/usr/bin/env bash

python3 ./fetch.py
find player_data -name '*.json' -exec cat {} \; | jq --slurp . -c > players.json
mkdir -p ../docs/data; mv players.json $_/
rm -rf player_data
