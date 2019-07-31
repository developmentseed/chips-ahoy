# Chips Ahoy

Used for validating machine learning chips.

- Start running with `python -m http.server` or clicking on the `index.html`
- Upload a `GeoJSON FeatureCollection`
- Use the keyboard to indicate whether the desired label is present in the chip
- Use the input field to skip to a given chip
- Save

Keyboard commands:
- Left arrow: back one chip
- Right arrow: forward one chip
- Y: assign status `"yes"` and go forward one chip
- N: assign status `"no"` and go forward one chip

# Customize images path

Chips-Ahoy by default points to `http://api.mapbox.com/v4/digitalglobe.0a8e44ba/\${z}/\${x}/\${y}@2x.png?access_token=` but can customized to display other TMS provider ot load local tiles.

e.g:

- Loading local tiles

In order to local files, we should  put the tiles folder in the  `chips-ahoy` folder and add the path in the **Images Path** input filed: 

`/<path to>/${x}-${y}-${z}.jpg`.

- Loading other TMS Layers

`https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}`
