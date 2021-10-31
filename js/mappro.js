
//map is Working two coordiantes for latitude and Longitude & working tileLayer

const map = L.map('mapid').setView([22.9074872, 79.07306671],5); //  5 is zoom 

const  tittleurl =  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'; //that is {s} is sub Domain x-axis, Y-axis,Z-axis

const attribution = '&copy; <a href="https://www.google.com/">GooGle</a>';

const tiles = L.tileLayer(tittleurl,{attribution});
tiles.addTo(map);



const generateList = ()=>{

    const ul = document.querySelector('.list');

    storelist.forEach((shop) => {

        const li = document.createElement('li');

        const div = document.createElement('div');

        const a = document.createElement('a');

        const p = document.createElement('p');

        a.addEventListener('click', () => {
            flyToStore(shop);
        });

        
        div.classList.add('shop-item');

        a.innerText = shop.properties.name;

        p.innerText = shop.properties.address;
        
        div.appendChild(a);

        div.appendChild(p);

        li.appendChild(div);

        ul.appendChild(li);

    });
}

generateList();


function makePopupContent(shop){

    return `
    
 <div>
    <h4>${shop.properties.name}</h4>
    <p>${shop.properties.address}</p>
    <div class="phone-number">
        <a href="tel:${shop.properties.phone}">${shop.properties.phone}</a>
</div>
</div>

`

}

// zoom control options
const zoomOptions = {
    zoomInText: 'S',
    zoomOutText: 'P',
    zoomInTitle:'santosh',
    zoomOutTitle:'pal',
    position:'bottomright'
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



function onEachFeature(feature,layer){

    layer.bindPopup(makePopupContent(feature));

    console.log("Hellofor lefet testing........");

}

const sp = L.icon({
    iconUrl: './img/4.jpeg',
    iconSize: [60, 50]
});


const shopsLayer = L.geoJSON(storelist, {
    onEachFeature: onEachFeature,
    pointToLayer: function(feature, latlng) {
        return L.marker(latlng, { icon: sp });
    }
});
shopsLayer.addTo(map);


function flyToStore(store){

    const lat = store.geometry.coordinates[1];

    const lng = store.geometry.coordinates[0];

    map.flyTo([lat,lng],14,{

        duration:3

    });

    setTimeout(()=>{
    L.popup({closeButton:true,offset:L.point(0,-8)})   
    .setLatLng([lat,lng])
    .setContent(makePopupContent(store))
    .openOn(map);
        
    },3000);

    
}





