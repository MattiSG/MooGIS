/*
---
description: Implements a MooGIS View with a Leaflet map.

license: to be determined

authors:
- Matti Schneider-Ghibaudo

requires:
- core/1.3: '*'
- MooGIS.View.Map

provides: [MooGIS.View.Map.Leaflet]

version: 0.0.1

---
*/

MooGIS.View.Map.Leaflet = new Class({
	Extends: MooGIS.View.Map,
	
	/*
	_geoJsonLayer: L.GeoJSON
	*/
	
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
				attribution: "Map data CC-BY-SA OpenStreetMap contributors, Imagery ©2011 CloudMade"
			}
		},
		
		/**GeoJSON options, plus 'onFeatureparse' key, that will be mapped to .on('featureparse')
		*
		*@see	http://leaflet.cloudmade.com/reference.html#geojson-options
		*@see	http://leaflet.cloudmade.com/reference.html#geojson
		*/
		geojsonChannel: {
		}
	},
	
	initialize: function init(container, options) {
		this.parent(container, options);
	},
	
	initMap: function initMap() {
		var map = new L.Map(this._container);
		
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
		
		return map;
	},
	
	initGeoJsonLayer: function initGeoJsonLayer() {
		this._geoJsonLayer = new L.GeoJSON(null, this.options.geojsonChannel);
		
		var onFeatureparse = this.options.geojsonChannel.onFeatureparse;
		if (onFeatureparse)
			this._geoJsonLayer.on('featureparse', onFeatureparse);
			
		this._map.addLayer(this._geoJsonLayer);
	},
	
	/*******INTERFACE COMPLIANCE*******/
	showBounds: function showBounds(bounds, requester) {
		if (bounds.contains(this.map.getBounds())) //we'll alternate between a "soft" recentering and a "full" one
			this.map.fitBounds(bounds); //hard
		else
			this.map.panTo(bounds.getCenter()); //soft: just make it so that the bounds are contained in the map
	},
	
	/*******GEOJSON CHANNEL*******/
	addGeojson: function addGeojson(addedFeatures) {
		this._geoJsonLayer.addGeoJSON(addedFeatures);
	},
	
	//TODO: any way to implement this without an awful cache + NAND?
	removeGeojson: function removeGeojson(removedFeatures) {
		throw('NOT IMPLEMENTED');
	},
	
	
	setGeojson: function setGeojson(features) {
		this.initGeoJsonLayer();
		this._geoJsonLayer.addGeoJSON(features);
	}
});
