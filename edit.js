// TODO: markers not visable at some zoom levels
// TODO:

function setText(id,newvalue) {
  var s= document.getElementById(id);
  s.innerHTML = newvalue;
};

// add marker
map.on('contextmenu', function(e) {

  var popLocation = e.latlng;
  var lat = e.latlng.lat;
  var lng = e.latlng.lng;
  var layerAdd = {
    "type": "Point",
    "coordinates": [lng, lat],
  }
  layerAdded = JSON.stringify(layerAdd);
  document.getElementById('geomy').value = layerAdded;
  var popup = L.popup()
    .setLatLng(popLocation)
    .setContent('<form id="form" onsubmit="return false;">\
               <input type="text" id="userInput" placeholder="Asset Tag" required/>\
                  <input type="text" id="locationy" placeholder="Location" required/>\
               <input id="input" type="submit" onclick="othername();" />\
</form>').openOn(map);

});

// return user text input
function othername() {
  var assetTag = document.getElementById('userInput').value;
  var geom = document.getElementById('geomy').value;
  var loc = document.getElementById('locationy').value;

  if (assetTag == '') {
    return false;
  } else if (loc == '') {
    return false;
  } else {

// add device to dev table
function devAdd() {
   // use Fetch API to send request
 fetch(`https://rofor8.carto.com/api/v2/sql?q=
 INSERT INTO dep (loc, the_geom, tag, mac, mods)
VALUES
(
  '${loc}',
   St_SetSRID(St_GeomFromGeoJSON('${geom}'), 4326),
  '${assetTag}',
(SELECT mac FROM dev WHERE tag='${assetTag}'),
(SELECT mods FROM dev WHERE tag='${assetTag}')
)
&api_key='606dccebf8b13efcc2a36201730087365a82ab1c`, {
   headers: new Headers({
     'Content-Type': 'application/json',
     'Access-Control-Allow-Headers': 'Content-Type',
     'Access-Control-Allow-Origin': '*',
   }),
   method: 'get',
   mode: 'no-cors',
 }).then(function (response) {

 }).catch(function (err) {
   console.log(err);
 });

 client._reload(source);
 console.log('Add marker has been run');
 populateDropDownLocation();
}


// check dep
function depCheck() {

  return fetch(`https://rofor8.carto.com/api/v2/sql?format=geojson&q=
                      SELECT
                        *
                       FROM
                        dep
                       WHERE
                        tag IN ('${assetTag}')
                                &api_key='606dccebf8b13efcc2a36201730087365a82ab1c`)
      .then((resp) => resp.json())
      .then((response) => {
       try {
        var test_dep = response.features[0].properties.tag;
        alert('That has already been deployed')
      }
      catch(err) {
        devAdd()
      }
      });
    };

    // check dev
    function devCheck() {

      return fetch(`https://rofor8.carto.com/api/v2/sql?format=geojson&q=
                          SELECT
                            *
                           FROM
                            dev
                           WHERE
                            tag IN ('${assetTag}')
                                    &api_key='606dccebf8b13efcc2a36201730087365a82ab1c`)
          .then((resp) => resp.json())
          .then((response) => {
           try {
            var test_dev = response.features[0].properties.tag;
            depCheck();
          }
          catch(err) {
            alert('That device is not for this job')
          }
          });
        };



  devCheck()
    map.closePopup();
  }
};

// remove marker
function clic(element) {
  //    alert("Clicked on " + element.name);
  var tagDelete = element.name;
  fetch(`https://rofor8.carto.com/api/v2/sql?q=
          DELETE FROM
            dep
          WHERE
            tag = '${tagDelete}'
      &api_key='606dccebf8b13efcc2a36201730087365a82ab1c`, {
    headers: new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Origin': '*',
    }),
    method: 'get',
    mode: 'no-cors',
  }).then(function (response) {

  }).catch(function (err) {
    console.log(err);
  });

  client._reload(source);
  console.log('Delete marker has been run');

  function stateChange(newState) {
    setTimeout(function(){
        if(newState == -1){console.log("it worked");}
    }, 5);
}

stateChange()

  populateDropDownLocation();

  map.closePopup();
}
