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
	
	/**List of all currently active Tile Layers.
	*Keys are url templates (Tiledef.url), values the full Tiledef + an additional `_tileLayer` property that references the corresponding `L.TileLayer` instance.
	*
	*@see	Tiledef
	*/
	_tiledefs: { },
	/*
	_geoJsonLayer: L.GeoJSON,
	*/
	
	options: {
		/**L.TileLayer options, to be merged with Tiledefs.
		*
		*@see	http://leaflet.cloudmade.com/reference.html#tilelayer-options
		*@see	Tiledef
		*/
		tileChannel: {
		},
		
		/**L.GeoJSON options, plus 'onFeatureparse' key, that will be mapped to .on('featureparse')
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
							
		return map;
	},
	
	initGeojson: function initGeojson() {
		this._geoJsonLayer = new L.GeoJSON(null, this.options.geojsonChannel);
		
		var onFeatureparse = this.options.geojsonChannel.onFeatureparse;
		if (onFeatureparse)
			this._geoJsonLayer.on('featureparse', onFeatureparse);
			
		this._map.addLayer(this._geoJsonLayer);
	},
	
	/*******INTERFACE COMPLIANCE*******/
	showBounds: function showBounds(bounds) {
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
		this.initGeojson();
		this._geoJsonLayer.addGeoJSON(features);
	},
	
	/*******TILE CHANNEL*******/
	/**
	*@params	varargs	tiledefs
	*
	*@see	http://en.wikipedia.org/wiki/Variadic_function
	*@see	Docs/Channels/Tile
	*/
	addTile: function addTile() {
		Array.each(arguments, function(tiledef) {
			var activeTiledef = this._tiledefs[tiledef.url];
			if (activeTiledef)
				throw("This shouldn't happen: added Tile is a duplicate!"); //DEBUG, to be removed
			
			 var result = this._tiledefs[tiledef.url]
			 			= new L.TileLayer(tiledef.url, Object.merge(this.options.tileChannel, tiledef));
			
			this._map.addLayer(result);
		}, this);
	},

	/**
	*@params	varargs	tiledefs
	*
	*@see	http://en.wikipedia.org/wiki/Variadic_function
	*@see	Docs/Channels/Tile
	*/
	removeTile: function removeTile() {
		Array.each(arguments, function(tiledef) {
			var activeTiledef = this._tiledefs[tiledef.url];
			if (activeTiledef) {
				this._map.removeLayer(activeTiledef);
				delete this._tiledefs[tiledef.url];
			}
		}, this);
	},
	
	/**
	*@params	varargs	tiledefs
	*
	*@see	http://en.wikipedia.org/wiki/Variadic_function
	*@see	Docs/Channels/Tile
	*/
	setTile: function setTile() {
		Object.each(this._tiledefs, function(layer, url) {
			this._map.removeLayer(layer);
			delete this._tiledefs[url];			
		}, this);
		this.addTile.apply(this, arguments);
	}
});
