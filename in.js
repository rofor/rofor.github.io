 
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