  //Full screan map view
  var mapId = document.getElementById('map');
  function fullScreenView() {
      if(document.fullscreenElement){
          document.exitFullscreen()
      }else {
        mapId.requestFullscreen();
      }       
  }

//Leaflet browser print function
L.control.browserPrint().addTo(map);

//Leaflet measure
// L.control.measure({
// primaryLengthUnit: 'kilometers', 
// secondaryLengthUnit: 'meter', 
// primaryAreaUnit: 'hectares', 
// secondaryAreaUnit: 'sqmeters'
// }).setPosition('topleft').addTo(map);

 //Leaflet search
 L.Control.geocoder().setPosition('topleft').addTo(map);

    //Zoom to layer
$('.zoom-to-layer').click(function () {
    map.setView([14.758945, -17.393754], 13)
})