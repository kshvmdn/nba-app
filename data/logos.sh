#!/usr/bin/env bash

for TEAM in "ATL" "BOS" "BKN" "CHA" "CHI" "CLE" "DAL" "DEN" "DET" "GSW" "HOU" "IND" "LAC" "LAL" "MEM" "MIA" "MIL" "MIN" "NOP" "NYK" "OKC" "ORL" "PHI" "PHX" "POR" "SAC" "SAS" "TOR" "UTA" "WAS"
do
  wget "http://stats.nba.com/media/img/teams/logos/${TEAM}_logo.svg"
  cairosvg ${TEAM}_logo.svg -o ${TEAM}.png
  convert ${TEAM}.png -resize 256x256 ${TEAM}.png
done

rm -f *.svg
mkdir -p ../docs/assets/images/teams; mv *.png $_
