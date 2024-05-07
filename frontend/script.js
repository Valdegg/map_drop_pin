const API_KEY = 'AIzaSyBn6WjBHH9k-10lfly__jieuASMER3iJ5c';

var map = {
	init: function() {

	}
};

$(window).on('load', function() {

	$.get('https://maps.googleapis.com/maps/api/geocode/json', {
		'address': '1600 Amphitheatre Parkway, Mountain+View, CA',
		'key': API_KEY
	}, function(data) {
		console.log(data);
	});

	 //?latlng=40.714224,-73.961452&key=
	/*$.get('https://maps.googleapis.com/maps/api/geocode/json', {
		'latlng': '40.714224,-73.961452',
		'key': API_KEY
	}, function(data) {
		console.log(data);
	});*/


	/*https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY*/

	async function initMap() {
	// Request needed libraries.
		const { Map } = await google.maps.importLibrary("maps");
		const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary(
			"marker",
		);
		const map = new google.maps.Map(document.getElementById("map"), {
			zoom: 4,
			center: { lat: -25.363882, lng: 131.044922 },
			mapId: "DEMO_MAP_ID",
		});

		map.addListener("click", (e) => {
			placeMarkerAndPanTo(e.latLng, map);
			console.log('latlng', e.latLng);
			$.get('https://maps.googleapis.com/maps/api/geocode/json', {
				'latlng': e.latLng.lat()+','+e.latLng.lng(),
				'key': API_KEY
			}, function(data) {
				console.log('from click', data);
			});
		});
	}

	function placeMarkerAndPanTo(latLng, map) {
		new google.maps.marker.AdvancedMarkerElement({
			position: latLng,
			map: map,
		});
		map.panTo(latLng);
	}

	initMap();

	//map.init();
});