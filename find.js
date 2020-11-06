// TODO: make sure all 3 menus work
// TODO: delete from menus when markers are deleted from database / refresh menus on delete

// populate dropdown menu //
populateDropDownLocation();
populateDropDownMac();
populateDropDownTag();
console.log('find.js ran')
// Location dropdown


function populateDropDownLocation() {

  var select = document.getElementById("selectDropLocation");
  var length = select.options.length;
  for (i = 0; i < length; i++) {
    select.options[i] = null;
  }

  return fetch(
      `https://rofor8.carto.com/api/v2/sql?format=geojson&q=
                                     SELECT the_geom, loc
                                     FROM dep
                                     ORDER BY loc ASC
                                     &api_key='606dccebf8b13efcc2a36201730087365a82ab1c`
    ).then((resp) => resp.json())
    .then((response) => {
      return response.features.map(function (feature) {
        option = document.createElement('option');
        option.setAttribute('value', feature.properties.loc);
        option.textContent = feature.properties.loc;

        document.getElementById('selectDropLocation').appendChild(option);
                          //  console.log(feature.properties.loc)
                            // TODO: replace with "option" rather than appendChild
      });
    }).catch((error) => {
      console.log(error);
      console.log('ran')
    });
}

// zoom to tooltip
document.getElementById('selectDropLocation').addEventListener('change', function (e) {
  input = e.currentTarget.selectedOptions[0].attributes[0].value;
  return fetch(`https://rofor8.carto.com/api/v2/sql?format=geojson&q=
                              SELECT *
                              FROM dep where loc Ilike '${input}'
                              &api_key='606dccebf8b13efcc2a36201730087365a82ab1c`)
    .then((resp) => resp.json())
    .then((response) => {
      geojsonLayer = L.geoJson(response);
      map.flyTo(geojsonLayer.getBounds().getCenter(), 18);

      // tooltip
      var popup = L.popup()
        .setLatLng([response.features[0].geometry.coordinates[1],
          response.features[0].geometry.coordinates[0]]).setContent(
            `<h2 class="h2">${response.features[0].properties.loc}</h2>
             <h2 class="h2">${response.features[0].properties.mods}</h2>
             <h2 class="h2">${response.features[0].properties.tag}</h2>
             <h2 class="h2">${response.features[0].properties.mac}</h2>
             <form method="GET" action="">
               <input type="button" name="${response.features[0].properties.tag}" value="D" onClick="clic(this);">
             </form>`)
        .openOn(map);

    });
});

// Mac dropdown
function populateDropDownMac() {
  return fetch(
      `https://rofor8.carto.com/api/v2/sql?format=geojson&q=
                                     SELECT the_geom, mac
                                     FROM dep
                                     ORDER BY mac ASC
                                     &api_key='606dccebf8b13efcc2a36201730087365a82ab1c`
    ).then((resp) => resp.json())
    .then((response) => {
      return response.features.map(function (feature) {
        option = document.createElement('option');
        option.setAttribute('value', feature.properties.mac);
        option.textContent = feature.properties.mac;
        document.getElementById('selectDropMac').appendChild(option);
      });
    }).catch((error) => {
      console.log(error);
    });
};

// zoom to tooltip
document.getElementById('selectDropMac').addEventListener('change', function (e) {
  input = e.currentTarget.selectedOptions[0].attributes[0].value;
  return fetch(`https://rofor8.carto.com/api/v2/sql?format=geojson&q=
                              SELECT *
                              FROM dep where mac Ilike '${input}'
                              &api_key='606dccebf8b13efcc2a36201730087365a82ab1c`)
    .then((resp) => resp.json())
    .then((response) => {
      geojsonLayer = L.geoJson(response);
      map.flyTo(geojsonLayer.getBounds().getCenter(), 18);

      // tooltip
      var popup = L.popup()
        .setLatLng([response.features[0].geometry.coordinates[1],
          response.features[0].geometry.coordinates[0]]).setContent(
          `<h2 class="h2">${response.features[0].properties.loc}</h2>
             <h2 class="h2">${response.features[0].properties.mods}</h2>
             <h2 class="h2">${response.features[0].properties.tag}</h2>
             <h2 class="h2">${response.features[0].properties.mac}</h2>
             <form method="GET" action="">
               <input type="button" name="${response.features[0].properties.tag}" value="D" onClick="clic(this);">
             </form>`)
        .openOn(map);

    });
});

// Tag dropdown
function populateDropDownTag() {
  return fetch(
      `https://rofor8.carto.com/api/v2/sql?format=geojson&q=
                                     SELECT the_geom, tag
                                     FROM dep
                                     ORDER BY tag ASC
                                     &api_key='606dccebf8b13efcc2a36201730087365a82ab1c`
    ).then((resp) => resp.json())
    .then((response) => {
      return response.features.map(function (feature) {
        option = document.createElement('option');
        option.setAttribute('value', feature.properties.tag);
        option.textContent = feature.properties.tag;
        document.getElementById('selectDropTag').appendChild(option);
      });
    }).catch((error) => {
      console.log(error);
    });
};

// zoom to tooltip
document.getElementById('selectDropTag').addEventListener("change", function (e) {
  input = e.currentTarget.selectedOptions[0].attributes[0].value;
  return fetch(`https://rofor8.carto.com/api/v2/sql?format=geojson&q=
                              SELECT *
                              FROM dep where tag Ilike '${input}'
                              &api_key='606dccebf8b13efcc2a36201730087365a82ab1c`)
    .then((resp) => resp.json())
    .then((response) => {
      geojsonLayer = L.geoJson(response);
      map.flyTo(geojsonLayer.getBounds().getCenter(), 18);

      // tooltip
      var popup = L.popup()
        .setLatLng([response.features[0].geometry.coordinates[1],
          response.features[0].geometry.coordinates[0]]).setContent(
          `<h2 class="h2">${response.features[0].properties.loc}</h2>
             <h2 class="h2">${response.features[0].properties.mods}</h2>
             <h2 class="h2">${response.features[0].properties.tag}</h2>
             <h2 class="h2">${response.features[0].properties.mac}</h2>
             <form method="GET" action="">
               <input type="button" name="${response.features[0].properties.tag}" value="D" onClick="clic(this);">
             </form>`)
        .openOn(map);

    });
});
