const API_KEY = 'AIzaSyBn6WjBHH9k-10lfly__jieuASMER3iJ5c';

var map = {
	$load_map_button: null,
	$address_input: null,
	init: function() {
		var self = this;
		this.$address_input = $('#address-input').first();
		this.$load_map_button = $('#load-map-button').first();

		this.$load_map_button.on('click', function(e) {
			var address = self.$address_input.val();
			self.display_map(address);
		});
	},
	display_map: function(address) {
		var self = this;

		$.get('https://maps.googleapis.com/maps/api/geocode/json', {
			'address': address,
			'key': API_KEY
		}, function(data) {
			console.log('from address', data);
			if(data.results.length > 0) {
				const geometry = data.results[0].geometry.location;
				self.load_map(geometry.lat, geometry.lng);
			} else {
				alert('location not found');
			}
		});

	},
	load_map: function(lat, lng) {
		var self = this;
		const map = new google.maps.Map(document.getElementById("map"), {
			zoom: 12,
			center: { lat: lat, lng: lng },
			mapId: "DEMO_MAP_ID",
		});

		map.addListener("click", (e) => {
			self.placeMarkerAndPanTo(e.latLng, map);
			console.log('latlng', e.latLng);
			var result_values = {
				lat: e.latLng.lat(),
				lng: e.latLng.lng()
			};
			$.get('https://maps.googleapis.com/maps/api/geocode/json', {
				'latlng': e.latLng.lat()+','+e.latLng.lng(),
				'key': API_KEY
			}, function(data) {
				console.log('from click', data);
				result_values.locations = {...data.results};
				$('#json-debug').first().html(JSON.stringify(result_values));
			});
		});
	},
	placeMarkerAndPanTo: function(latLng, map) {
		new google.maps.marker.AdvancedMarkerElement({
			position: latLng,
			map: map,
		});
		map.panTo(latLng);
	}
};

$(window).on('load', function() {

	
	async function initMap() {
		const { Map } = await google.maps.importLibrary("maps");
		const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary(
			"marker",
		);

		map.init();
	}

	initMap();

});