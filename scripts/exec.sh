#!/bin/bash +x
export AWS_PROFILE=devseed

CHIPS="docker run --rm -t -v ${PWD}:/mnt chips-ahoy-scripts"
outputDir=data

mkdir -p ${outputDir}

###########################################################
### Add tile and url field
###########################################################

$CHIPS python3 fctile.py \
    --geojson_file sudan_prediction_merged.geojson \
    --zoom 18 \
    --url_map_service="https://evwhs.digitalglobe.com/earthservice/wmtsaccess?CONNECTID=${CONNECTID}&request=GetTile&version=1.0.0&layer=DigitalGlobe:ImageryTileService&featureProfile=Global_Currency_Profile&style=default&format=image/png&TileMatrixSet=EPSG:3857&TileMatrix=EPSG:3857:{z}&TileRow={y}&TileCol={x}" \
    --geojson_output ${outputDir}/sudan_prediction_merged.geojson \
    --chuck 1000 


