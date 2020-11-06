
// TODO: make sure all code is up to date
// TODO: push mac online state to database, and reflect in style on map

const map = L.map('map', {
  zoomControl: false,
}).setView([51.605, -2.078], 17);

//geolocation control
var lc = L.control.locate({
  position: 'topright',
  flyTo: true,
  showCompass: true,
  drawCircle: false,
  setView: false
}).addTo(map);

// request loc update and set loc
lc.start();

// set base map
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png', {
  maxZoom: 18,
}).addTo(map);

// carto client
const client = new carto.Client({ 
  apiKey: '606dccebf8b13efcc2a36201730087365a82ab1c',
  username: 'rofor8',
});



// carto data source
const source = new carto.source.SQL('SELECT * FROM  dep');

// marker colors
const style = new carto.style.CartoCSS(`
        #layer {
          marker-width: 30;
          marker-line-width: 5px;
          marker-line-color: 	ramp([status], (#006400, #B22222), ("on", "off"), "=");
          marker-fill: ramp([mods], (#88CCEE, #CC6677, #DDCC77,	#008B8B, #FF00FF, #FF8C00, #CD5C5C), ("R500", "R610", "R510", "R700", "T300", "R710", "R600"), "=");
        }
      `);

//CLICK TOOLTIPS
const layer = new carto.layer.Layer(source, style, {
  featureOverColumns: ['loc', 'mods', 'tag', 'mac'], }
);
const popup = L.popup({
  closeButton: false,
});

// tooltip
function openPopup(featureEvent) {
  let content = '<div class="widget">';

  // tooltip template
  if (featureEvent.data.loc) {
    content += `<h2 class="h2">${featureEvent.data.loc}</h2>
          <h2 class="h2">${featureEvent.data.mods}</h2>
          <h2 class="h2">${featureEvent.data.tag}</h2>
          <h2 class="h2">${featureEvent.data.mac}</h2>
          <form method="GET" action="">
            <input type="button" name="${featureEvent.data.tag}" value="D" align=cen
             onClick="clic(this);">
          </form>`;
  };

  popup.setContent(content);
  popup.setLatLng(featureEvent.latLng);
  if (!popup.isOpen()) {
    popup.openOn(map);
  }

  let derig = featureEvent.data.tag;
  console.log(derig);
}

function closePopup(featureEvent) {
  popup.removeFrom(map);
}

function setPopupsClick() {

  layer.on('featureClicked', openPopup);
}

setPopupsClick();

// ADD LAYERS
client.addLayer(layer);
client.getLeafletLayer().addTo(map);
