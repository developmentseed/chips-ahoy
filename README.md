# Chips Ahoy

Used for validating machine learning chips.

- Upload a `GeoJSON FeatureCollection`
- Use the `url` properties for load a image.

## Install dependencies and run in local

- If you use [nvm](https://github.com/nvm-sh/nvm), activate the desired Node version:

  `nvm use`

- Install Node modules:

  `yarn install`

- Run in local:

  `yarn start`

- Open your browser in [http://localhost:3000/](http://localhost:3000/)

## Commands:

- `Left arrow` or `a`: back one chip
- `Right arrow` or `d`: forward one chip
- `1` : assign `dc_has_pattern_school=no` and go forward one chip
- `2` : assign `dc_has_pattern_school=unrecognized` and go forward one chip
- `click on the image` : assign `dc_has_pattern_school=yes`, `pointScale={x,y}`, `sizeImage={width,height}` of the imagen and go forward one chip

## Scripts

The scripts to process data are in [geokit](http://devseed.com/geokit-doc-seed/usage/chips-ahoy/)
