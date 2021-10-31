// http://www.coffeegnome.net/creating-contr…button-leaflet
var customControl =  L.Control.extend({

    options: {
      position: 'topleft'
    },
  
    onAdd: function (map) {
      var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
  
      container.style.backgroundColor = 'white';     
      container.style.backgroundImage = "url(https://t1.gstatic.com/images?q=tbn:ANd9GcR6FCUMW5bPn8C4PbKak2BJQQsmC-K9-mbYBeFZm1ZM2w2GRy40Ew)";
      container.style.backgroundSize = "30px 30px";
      container.style.width = '30px';
      container.style.height = '30px';
  
      container.onclick = function(){
        console.log('buttonClicked');
      }
  
      return container;
    }
  });
  var map;
  var readyState = function(e){
    map = new L.Map('map').setView([48.935, 18.14], 14);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    map.addControl(new customControl());
  }
  
  window.addEventListener('DOMContentLoaded', readyState);