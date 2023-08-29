// map class initialize
var map = L.map('map').setView([14.758945, -17.393754], 13);
//map.zoomControl.setPosition('topright');

//Adding osm tilelayer
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var CyclOSM = L.tileLayer('https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png', {
	maxZoom: 20,
	attribution: '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var st = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
});

var satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

//Adding marker in the center of map
 var singleMarker = L.marker([14.758945, -17.393754])
     .bindPopup('Pikine.<br> Senegal.')
     .openPopup();

    //ajout echelle carte
    L.control.scale({position: 'bottomleft' }).addTo(map)


    //Map coordinate display
    map.on('mousemove', function (e) {
        $('.coordinate').html(`Latitude: ${e.latlng.lat} Longitude: ${e.latlng.lng}`)
})


   //Geojson load

   //var voirie = L.geoJSON(voirie).addTo(map);

   var Quartier = L.geoJSON(quartier, {
    onEachFeature: function(feature, layer){
        layer.bindPopup(feature.properties.QRT)
    }, 
    style:{
        fillColor: 'red',
        fillOpacity: 0,
        color: 'maroon',
        weight: 1,
        attribution: "NDIAYE HAMZA",
    }})//.addTo(map);
        

   var marker = L.markerClusterGroup();

   var education = L.geoJSON(data, {
       onEachFeature: function(feature, layer) {
           layer.bindPopup(feature.properties.DESCRIPTIF)
    
       }
       
   });
   education.addTo(marker);
   marker.addTo(map);

   var wmsLayer = L.Geoserver.wms("http://localhost:8080/geoserver/wms", {
    layers: "geoapp:dakar",
    attribution: "NDIAYE HAMZA",
  });
  //wmsLayer.addTo(map);


//   var wfsLayer = L.Geoserver.wfs("http://localhost:8080/geoserver/wfs", {
//   layers: "geoapp:SEN_adm4",
//   attribution: "NDIAYE HAMZA",
// });
// wfsLayer.addTo(map);
  

   //Leaflet layer control
   var baseMaps =  {
       'OSM': osm,
       'CyclOSM': CyclOSM,
       'Stamen_Toner': st,
       'Satellite': satellite,
   }

   var overlayMaps = {
       'Dakar Schools': marker,
       'Quartiers': Quartier,
      'Communes': wmsLayer,
     // 'Dakar': wfsLayer,
   };

   
   L.control.layers(baseMaps, overlayMaps, {collapsed: true, position: 'topright'}).addTo(map);


   var layerLegend = L.Geoserver.legend("http://localhost:8080/geoserver/wms", {
    layers: "geoapp:dakar",

    // style: `stylefile`,
  });
  
  layerLegend.addTo(map);

