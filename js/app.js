var patientName = document.querySelector(".js-name")
var zipcode = document.querySelector(".js-zipcode")
var submit = document.querySelector(".js-submit")
var clear = document.querySelector(".js-clear")
var markers = []

submit.addEventListener("submit", function( event ){
  event.preventDefault()
  codeAddress(patientName.value, zipcode.value)
  patientName.value = ""
  zipcode.value = ""
  patientName.focus()
})

clear.addEventListener("click", function(){
  if(confirm("Are you sure you want to remove all markers?")){
    setAllMap(null)
  }
})

var map
var geocoder
function initialize() {
  geocoder = new google.maps.Geocoder()
  var mapOptions = {
    zoom: 10,
    center: new google.maps.LatLng(30.2500, -97.7500),
    zoomControl: false,
    streetViewControl: false,
    mapTypeControl: false
  }
  map = new google.maps.Map(document.querySelector('.js-map'), mapOptions)
}

function codeAddress(patientName, zipcode) {
  geocoder.geocode( { 'address': zipcode}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
      });
      var infowindow = new google.maps.InfoWindow({
        content:"<h2>"+patientName+"</h2>"+"<p>"+zipcode+"</p>"
      })
      google.maps.event.addListener(marker, 'click', function() {
	infowindow.open(map,marker);
      });
      markers.push(marker)
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function setAllMap(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

google.maps.event.addDomListener(window, 'load', initialize)
