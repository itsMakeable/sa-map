var map;
window.markerArr = [];
window.markers  = {};
function initialize() {

  var styles = [{
    "featureType": "administrative",
    "stylers": [{
      "visibility": "off"
    }]
  }, {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [{
      "color": "#bee0d0"
    }]
  }, {
    "featureType": "road.local",
    "elementType": "labels",
    "stylers": [{
      "visibility": "off"
    }]
  }, {
    "featureType": "transit",
    "elementType": "labels",
    "stylers": [{
      "visibility": "off"
    }]
  }, {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [{
      "color": "#7f9bd2"
    }]
  }, {
    "featureType": "water",
    "elementType": "geometry.stroke",
    "stylers": [{
      "color": "#7c9ad2"
    }, {
      "saturation": 100
    }, {
      "lightness": 100
    }, {
      "weight": 1
    }]
  }, {
    "featureType": "landscape",
    "elementType": "geometry.fill",
    "stylers": [{
      "color": "#e0eaf4"
    }]
  }, {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [{
      "color": "#ffffff"
    }]
  }, {}, {
    "featureType": "poi.school",
    "elementType": "geometry",
    "stylers": [{
      "color": "#e7dcea"
    }]
  }, {
    "featureType": "poi.attraction",
    "elementType": "geometry.fill",
    "stylers": [{
      "color": "#e7daea"
    }]
  }, {}, {
    "featureType": "poi.government",
    "elementType": "geometry",
    "stylers": [{
      "color": "#e7daea"
    }]
  }, {
    "featureType": "poi.business",
    "elementType": "geometry",
    "stylers": [{
      "color": "#e7dcea"
    }]
  }, {
    "featureType": "poi.medical",
    "elementType": "geometry",
    "stylers": [{
      "color": "#e7daea"
    }]
  }, {
    "featureType": "poi.place_of_worship",
    "elementType": "geometry",
    "stylers": [{
      "color": "#e7dcea"
    }]
  }, {
    "featureType": "poi.sports_complex",
    "elementType": "geometry",
    "stylers": [{
      "color": "#e7daea"
    }]
  }, {
    "featureType": "poi",
    "elementType": "labels",
    "stylers": [{
      "visibility": "off"
    }]
  }, {
    "featureType": "road.arterial",
    "elementType": "labels"
  }, {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [{
      "visibility": "off"
    }]
  }];


  var mapCenter = new google.maps.LatLng(40.730564, -73.979699);

  var locations = [
    ['Harlem 1', 40.80251, -73.9468, 'elementary', '34 West 118th St, 2nd Floor New York, NY 10026', 'K&ndash;4', 'harlem-1'],
    ['Harlem 2', 40.80565, -73.93547, 'elementary', '144 East 128th St, 3rd Floor New York, NY 10035', 'K&ndash;4', 'harlem-2'],
    ['Harlem 3', 40.79554, -73.94413, 'elementary', '141 East 111th St, 3rd Floor New York, NY 10029', 'K&ndash;4', 'harlem-3'],
    ['Harlem 4', 40.80158, -73.95527, 'elementary', '240 West 113th St, 3rd Floor New York, NY 10026', 'K&ndash;4', 'harlem-4'],
    ['Harlem 5', 40.8199, -73.94458, 'elementary', '301 West 140th St, 3rd Floor New York, NY 10030', 'K&ndash;4', 'harlem-5'],
    // ['Bronx 1', 40.81345, -73.92566, 'elementary', '339 Morris Ave 2nd Floor Bronx, NY 10451', 'K&ndash;4'],
    // ['Bronx 2', 40.83591, -73.90499, 'elementary', '450 St. Pauls Place 5th Floor, Bronx, NY 10456', 'K&ndash;4'],
    // ['Upper West', 40.78608, -73.97433, 'elementary', '145 West 84th St, 2nd Floor New York, NY 10024', 'K&ndash;4'],
    // ['Bed-Stuy 1', 40.69713, -73.94666, 'elementary', '70 Tompkins Ave 2nd Floor, Brooklyn, NY 11206', 'K&ndash;4'],
    // ['Bed-Stuy 2', 40.69762, -73.9433, 'elementary', '211 Throop Ave, 3rd Floor Brooklyn, NY 11206', 'K&ndash;4'],
    // ['Cobble Hill', 40.69868, -73.98594, 'elementary', '284 Baltic St, Lower Level Brooklyn, NY 11201', 'K&ndash;4'],
    // ['Williamsburg', 40.71157, -73.9599, 'elementary', '183 South 3rd St, 4th Floor Brooklyn, NY 11211', 'K&ndash;4'],
    // ['Harlem West', 40.80235, -73.95446, 'middle', '215 West 114th St, 5th Floor New York, NY 10026', '5&ndash;8'],
    // ['Harlem Central', 40.79828, -73.95065, 'middle', '21 West 111th St, 2nd Floor New York, NY 10026', '5&ndash;6'],
    // // Future Schools
    // ['Hell\'s Kitchen', 40.76361, -73.99115, 'elementary', '439 West 49th St, New York, NY 10019', 'K&ndash;4'],
    // ['Crown Heights', 40.66903, -73.93434, 'elementary', '1025 Eastern Parkway, Brooklyn, NY 11213', 'K&ndash;4'],
    // ['Fort Greene', 40.69635, -73.97594, 'elementary', '101 Park Ave, Brooklyn, NY 11205', 'K&ndash;4'],
    // ['Union Square', 40.73539, -73.98786, 'elementary', '40 Irving Place, New York, NY 10003', 'K&ndash;4'],
    // ['Prospect Heights', 40.67349, -73.95113, 'elementary', '801 Park Place, Brooklyn, NY 11216', 'K&ndash;4'],
    // ['Bronx 3', 40.82482, -73.9062, 'elementary', '968 Cauldwell Ave, Bronx, NY 10456', 'K&ndash;4'],
    // ['Harlem North Central', 40.81399, -73.94259, 'middle', '175 West 134th St, New York, NY 10030', '5'],
    // ['Harlem East', 40.79554, -73.94413, 'middle', '141 East 111th St, 3rd Floor New York, NY 10029', '5']
  ];
  
  // Create a new StyledMapType object, passing it the array of styles,
  // as well as the name to be displayed on the map type control.
  var styledMap = new google.maps.StyledMapType(styles, {
    name: "Success Academy Schools"
  });

  // Create a map object, and include the MapTypeId to add
  // to the map type control.
  var mapOptions = {
    zoom: 13,
    center: mapCenter,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
    }
  };
  var boxOptions = {
    boxStyle: {
      // background: "url(tool-tip.png)"
      backgroundColor: 'white',
      textAlign: "center",
      fontSize: "8pt",
      width: "186px",
      minHeight: "124px",
      borderRadius: '10px',
      paddingTop: '20px',
      paddingLeft: '20px',
      paddingBottom: '10px',
      paddingRight: '20px'
    },
    disableAutoPan: true,
    pixelOffset: new google.maps.Size(-93, -172),
    closeBoxURL: "",
    isHidden: false,
    enableEventPropagation: true,
    addClass: 'marker'
  };

  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  var infowindow = new InfoBox(boxOptions);
  var oldDraw = infowindow.draw;
  infowindow.draw = function() {
     oldDraw.apply(this);
     $(infowindow.div_).hide();
     $(infowindow.div_).fadeIn('fast')
  }
  var marker, i;

  for (i = 0; i < locations.length; i++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][1], locations[i][2]),
      icon: 'img/' + locations[i][3] + '_pin.svg',
      // animation: google.maps.Animation.DROP,
      __gm_id: (i+100),
      map: map,
    });
    
    markerKey = locations[i][6].toString();
    console.log(markerKey);
    // window.markers = { markerKey : marker };
    window.markers[markerKey] = { 'marker' : marker, 'location' : locations[i]};

    // console.log(marker)

    google.maps.event.addListener(marker, 'click', (function(marker, i) {

      return function() {
        window.currMarkerIcon = marker.icon;
        marker.setIcon("img/select_pin.svg");                                    
        infowindow.setContent("<span class='title'>" + locations[i][0] + "</span><hr><address class='address'>" + locations[i][4] + "</address><br><span class='grades'>Grades " + locations[i][5] + "</span><div class='tool-tip-triangle'></div>");
        infowindow.open(map, marker);


        if(window.currMarker)
            window.currMarker.setIcon(window.currMarkerIcon);

        window.currMarker = marker;

      }

    })(marker, i));
    google.maps.event.addListener(map, 'click', function() {
        infowindow.close();
    });
  }


  //Associate the styled map with the MapTypeId and set it to display.
  map.mapTypes.set('map_style', styledMap);
  map.setMapTypeId('map_style');



  $(document).ready(function() {
    for (i = 0; i < locations.length; i++) {
      $('#mySelect').append("<option value='" + locations[i][1]+","+ locations[i][2] + "' data-marker='"+locations[i][6]+"'>" + locations[i][0] + "</option>")
    }
  // select a marker from dropdown menu
  $("select#mySelect").change(function(){ 
    
      var latLngString = $(this).val();
      var latLngArray = latLngString.split(",");

      var latLng = new google.maps.LatLng(latLngArray[0], latLngArray[1]);
      map.panTo(latLng);
      map.setZoom(16)

      // console.log($(this).data());
      var markerId = $("option:selected", this).data('marker');
      var marker = window.markers[markerId].marker;
      var location = window.markers[markerId].location
      console.log(marker)

      // Make a resubale function
      window.currMarkerIcon = marker.icon;
      marker.setIcon("img/select_pin.svg");                                    
      infowindow.setContent("<span class='title'>" + location[0] + "</span><hr><address class='address'>" + location[4] + "</address><br><span class='grades'>Grades " + location[5] + "</span><div class='tool-tip-triangle'></div>");
      infowindow.open(map, marker);


      if(window.currMarker)
          window.currMarker.setIcon(window.currMarkerIcon);

      window.currMarker = marker;
      

  });
   });
}

google.maps.event.addDomListener(window, 'load', initialize);