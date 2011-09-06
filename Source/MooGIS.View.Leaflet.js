/*
---
description: Implements a MooGIS View with a Leaflet map.

license: to be determined

authors:
- Matti Schneider-Ghibaudo

requires:
- core/1.3: '*'
- MooGIS.View

provides: [MooGIS.View.Leaflet]

version: 0.0.1

---
*/

MooGIS.View.Leaflet = new Class({
	Extends: MooGIS.View,
	
	options: {
		tileLayer: {
			/**Alternatives:
			* - OSM Mapnik: http://tile.openstreetmap.org/{z}/{x}/{y}.png
			*
			*@see	http://leaflet.cloudmade.com/reference.html#tilelayer
			*@see	http://maps.cloudmade.com/editor
			*/
			url: 'http://{s}.tile.cloudmade.com/YOUR-API-KEY/997/256/{z}/{x}/{y}.png',
			/**
			*@see	http://leaflet.cloudmade.com/reference.html#tilelayer-options
			*/
			options: {
				attribution: "Map data CC-BY-SA OpenStreetMap contributors, Terrain ©2011 CloudMade"
			}
		}
	},
	
	initialize: function init(container, options) {
		this.parent(container, options);
	},
	
	initMap: function initMap() {
		var map = new L.Map(this.options.IDs.map);
		
		map.on('load', this.fireEvent.pass('load', this));
		
		map.setView(new L.LatLng(
						this.options.default.lat,
						this.options.default.lng
					),
					this.options.default.zoom);
		
		map.addLayer(new L.TileLayer(
			this.options.tileLayer.url,
			this.options.tileLayer.options
		));
	},
	
	showBounds: function showBounds(bounds, requester) {
		if (bounds.contains(this.map.getBounds())) //we'll alternate between a "soft" recentering and a "full" one
			this.map.fitBounds(bounds); //hard
		else
			this.map.panTo(bounds.getCenter()); //soft: just make it so that the bounds are contained in the map
	}
});
