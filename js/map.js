var map;
window.markerArr = [];
window.markers = {};

// function load() {
//   map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
//   map.setCenter(...);
//   map.savePosition();
//   ...
// }

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

	$.ajax({
	    url: 'locations.json.php',
	    async: false,
	    dataType: 'json',
	    success: function (data) {
	      	// do stuff with data.  
	        locations = data;
	        // console.log(data)
	    }
	});

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

      // A nicer draw of the infowindow
	var oldDraw = infowindow.draw;
	infowindow.draw = function() {
		oldDraw.apply(this);
		$(infowindow.div_).hide();
		$(infowindow.div_).fadeIn('fast');
	}

	var marker, i;

	for (i = 0; i < locations.length; i++) {

		marker = new google.maps.Marker({
			position: new google.maps.LatLng(locations[i].lat, locations[i].lng),
			icon: 'img/' + locations[i].level + '_pin.svg',
			// animation: google.maps.Animation.DROP,
			__gm_id: (i + 100),
			map: map,
		});

		if (locations[i].type == 'pending') {
			marker.icon = 'img/pending_'+ locations[i].level +'_pin.svg'
		}

		markerKey = locations[i].ID.toString();
		window.markers[markerKey] = {
			'marker': marker,
			'location': locations[i]
		};

		google.maps.event.addListener(marker, 'click', (function(marker, i) {

			return function() 
			{ 
				kylaStyle(marker,locations[i]);
			}

		})(marker, i));

		google.maps.event.addListener(map, 'click', function() {
			infowindow.close();
		});
	}

	//Associate the styled map with the MapTypeId and set it to display.
	map.mapTypes.set('map_style', styledMap);
	map.setMapTypeId('map_style');

	// Holly Chips, Kyla style
	var kylaStyle = function(marker, location){

		if (window.currMarker) window.currMarker.setIcon(window.currMarkerIcon);
		window.currMarker = marker;
		window.currMarkerIcon = marker.icon;
        marker.setIcon("img/select_pin.svg");
        infowindow.setContent("<span class='title'>" + location.school + "</span><hr><address class='address'>" + location.address+ "</address><br><span class='grades'>Grades " + location.grades + "</span><div class='tool-tip-triangle'></div>");
        infowindow.open(map, marker);
	}

	$(document).ready(function() {
		for (i = 0; i < locations.length; i++) {
			$('#locationSelect').append("<option value='" + locations[i].lat + "," + locations[i].lng + "' data-marker='" + locations[i].ID + "'>" + locations[i].school + "</option>")
		}
		// select a marker from dropdown menu
		/*$("select#locationSelect").change(function() {

			var latLngString = $(this).val();
			var latLngArray = latLngString.split(",");

			var latLng = new google.maps.LatLng(latLngArray[0], latLngArray[1]);
			map.panTo(latLng);
			map.setZoom(16)

			var markerId = $("option:selected", this).data('marker');
			var marker = window.markers[markerId].marker;
			var location = window.markers[markerId].location

			// Make a resubale function
			// kylaStyle(marker, location);
		});*/
	});
}

google.maps.event.addDomListener(window, 'load', initialize);