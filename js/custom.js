// Google maps variables
var map;
var marker;

//Phone gap variables
var userAgent = navigator.userAgent + '';
// Phone gap set up
if (userAgent.indexOf('iPhone') > -1) {
  document.write('<script src="js/lib/cordova-iphone.js"></sc' + 'ript>');
  var mobile_system = 'iphone';
} else if (userAgent.indexOf('Android') > -1) {
  document.write('<script src="js/lib/cordova-android.js"></sc' + 'ript>');
  var mobile_system = 'android';
} else {
  var mobile_system = '';
}

// Setting up the Current Location Identifier Button
function CenterControl(controlDiv, map) {
  // Set CSS for the button border.
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.border = '2px solid #fff';
  controlUI.style.borderRadius = '3px';
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI.style.cursor = 'pointer';
  controlUI.style.marginBottom = '22px';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to recenter the map';
  controlDiv.appendChild(controlUI);

  // Set CSS for the button interior.
  var controlText = document.createElement('div');
  controlText.style.color = 'rgb(25,25,25)';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText.style.fontSize = '16px';
  controlText.style.lineHeight = '38px';
  controlText.style.paddingLeft = '5px';
  controlText.style.paddingRight = '5px';
  controlText.innerHTML = 'Current Location';
  controlUI.appendChild(controlText);

  // Setup the click event listeners: simply diplays a marker on current location when clicked.
  controlUI.addEventListener('click', function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position){
        var markerOptions = {
          position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
          animation: google.maps.Animation.BOUNCE
        };

        marker = new google.maps.Marker(markerOptions);
        marker.setMap(map);
      });
    }
  });

}

//Google map rendering code
function initMap(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position){
      var mapOptions = {
        center: new google.maps.LatLng(position.coords.latitude,position.coords.longitude),
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      map = new google.maps.Map(document.getElementById('map'), mapOptions);

      // Setting up the control button
      var centerControlDiv = document.createElement('div');
      var centerControl = new CenterControl(centerControlDiv, map);
      centerControlDiv.index = 1;
      map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(centerControlDiv);
    });
  } else {
    alert("Your browser does not support google maps");
  }

}
