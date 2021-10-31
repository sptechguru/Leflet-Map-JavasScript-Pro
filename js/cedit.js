var baseLayers = {
    'Positron' : new L.TileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
    }),
    'Dark Matter':  new L.TileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',{
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
    }),
    'Simple' : new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
    }),
  }
  
  // that is editable

  var map = new L.Map('map', {
    zoomControl: false,
    center: [43, 0],
    zoom: 3,
    layers: [
      baseLayers.Positron
    ]
  });


  // zoom control options
const zoomOptions = {
  zoomInText: 'S',
  zoomOutText: 'P',
  zoomInTitle:'santosh',
  zoomOutTitle:'pal',
  position:'topright'
};

  // Creating zoom control
const zoom = L.control.zoom(zoomOptions);
zoom.addTo(map);

const scaleOptions = {
  maxWidth:'100',
  metric:true,
  imperial:true,
  updateWhenIdle:true

};

const scale = L.control.scale(scaleOptions);
scale.addTo(map);


  const drawnItems = new L.FeatureGroup();
  map.addLayer(drawnItems);
  const drawControl = new L.Control.Draw({
      edit: {
          featureGroup: drawnItems
      }
  });
  map.addControl(drawControl);
  

  
  L.Control.Custom = L.Control.Layers.extend({
    onAdd: function () {
          this._initLayout();
          this._addButton();
          this._update();
          return this._container;
      },
      _addButton: function () {
        var elements = this._container.getElementsByClassName('leaflet-control-layers-list');
        var button = L.DomUtil.create('button', 'my-button-class', elements[0]);
        button.textContent = 'Close control';
        L.DomEvent.on(button, 'click', function(e){
          L.DomEvent.stop(e);
          this._collapse();
        }, this);
      }
  });
  
  var control = new L.Control.Custom(baseLayers).addTo(map);
  
  cartodb.createLayer(map, 'http://documentation.cartodb.com/api/v2/viz/2b13c956-e7c1-11e2-806b-5404a6a683d5/viz.json')
  .addTo(map)
  .on('done', function(layer) {
   
    control.addOverlay(layer, 'Data');
  
    layer.setInteraction(true)
    .on('featureOver', function(e, pos, latlng, data) {
      cartodb.log.log(e, pos, latlng, data);
    })
    .on('error', function(err) {
      cartodb.log.log('error: ' + err);
    });
  
  }).on('error', function() {
    cartodb.log.log("some error occurred");
  });
  