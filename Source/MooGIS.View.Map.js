/*
---
description: Abstract definition of a MooGIS view. Instances of subclasses should be used.

license: to be determined

authors:
- Matti Schneider-Ghibaudo

requires:
- core/1.3: '*'
- MooGIS.View

provides: [MooGIS.View.Map]

version: 0.0.1

---
*/

MooGIS.View.Map = new Class({
	/**The following events are to be fired:
	*domready: when all initialization has been done, but the map is still loading tiles
	*load: when the map has finished loading tiles
	*/
	Implements: [Options, Events],
	
/*
	_map: implementation-specific map instance (L.Map instance for Leaflet, google.maps.Map for GMaps…). To be defined by subclasses.
	_container: Element,
	renderersWidget: PDCMapRenderersListWidget,
*/	
	options: {
		/**The default values that the map should show.
		*/
		'default': {
			lat: 46.756667,
			lng: 2.350833,
			zoom: 5
		}
	},
	
	/**Lists all input types this Map can manage. Each stream must be connected to a specific channel, and this list makes runtime incompatibilities detectable.
	* **WARNING**: the channels must be listed in **capitalized lowercase***.
	*
	*For each of these channels, a `View.Map` guarantees being able to manage the `add`, `remove` and `set` events by any stream. This is done by implementing `[eventname][Channelname]` methods.
	*For example, to be rightful to list the Geojson channel in this hash, a `View.Map` subclass has to implement these three methods:
	* - `addGeojson(addedFeaturesArray)`
	* - `removeGeojson(removedFeaturesArray)`
	* - `setGeojson(featuresArray)`
	*/
	channels: [
		'Tile',
		'Geojson'
	],
	
/**********INIT**********/
	initialize: function init(container, options) {
		this._container = $(container);
		this.setOptions(options);
			
		this._map = this.initMap();
		
		this.fireEvent('domready');
		
		/* Firing the 'load' event is the responsiblity of subclasses */
	},
	
	/**To be implemented by subclasses.
	*Initializes the underlying map instance.
	*
	*@returns	the underlying map instance
	*@see	_map
	*/
	/*
	initMap: function initMap() {
		
	},
	*/
		
/**********GETTERS**********/
	/**Returns the underlying, implementation-specific map (L.Map instance for Leaflet, google.maps.Map for GMaps…).
	*Useful for filters and renderers that rely on specific functionalities, even though that should be avoided when possible.
	*/
	map: function map() {
		return this._map;
	},
	
	container: function container() {
		return this._container;
	},

	/**To be implemented by subclasses.
	*Sets the underlying map instance's bounds so that the given bounds are visible.
	*
	*@param	bounds	bounds, in any format that's acceptable for the underlying map instance
	*@param	requester	the Module that requested the viewport change
	*/
	/*
	showBounds: function showBounds(bounds, requester) {
	},
	*/
	
/**********SETTERS**********/
	/**Adds an input stream for display by this map
	*
	*@param	channel	String	the channel ID for this source
	*@param	source	MooGIS.Source	the events source to get attached to
	*/
	addStream: function addStream(channel, source) {
		channel = channel.toLowerCase().capitalize(); // normalization for method matching
		
		['add', 'remove', 'set'].each(function(eventName) {
			source.addEvent(eventName, this[eventName + channel].bind(this));
		}, this);
	}
});