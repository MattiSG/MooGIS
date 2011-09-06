/*
---
description: Abstract definition of a MooGIS view. Instances of subclasses should be used.

license: to be determined

authors:
- Matti Schneider-Ghibaudo

requires:
- core/1.3: '*'
- MooGIS
- MooGIS.Controller
- MooGIS.Group

provides: [MooGIS.Controller]

version: 0.0.1

---
*/

MooGIS.View = new Class({
	/**The following events are to be fired:
	*domready: when all initialization has been done, but the map is still loading tiles
	*load: when the map has finished loading tiles
	*/
	Implements: [Options, Events],
/*
	_map: implementation-specific map instance (L.Map instance for Leaflet, google.maps.Map for GMaps…). To be defined by subclasses.
	_controller: null,
	_container: Element,
	renderersWidget: PDCMapRenderersListWidget,
	cache: {},
*/	
	options: {
		/**Attributes for generated elements.
		*/
		IDs: {
			map:			'map',
			status:			'status',
			left:			'leftWrapper',
			details:		'details'
		},
		/**Attributes for generated elements.
		*/
		classes: {
			selected:		'selected'
		},
		/**Empty the container on load or not.
		*Allows you to put a diagnostic/loading message while waiting for maps to load.
		*/
		clearContainer: true
	},
	
/**********INIT**********/
	initialize: function init(container, options) {
		this._container = $(container);
		this.setOptions(options);
		
		if (this.options.clearContainer)
			this._container.empty();
		
		this.buildDOM();
			
		this._map = this.initMap();
		
		this.fireEvent('domready');
		
		/* Firing the 'load' event is the responsiblity of subclasses */
	},
	
	buildDOM: function buildDOM() {
		['status', 'left', 'map', 'details'].each(function(item) {
			this[item + 'Container'] = new Element('div', {
				id : this.options.IDs[item]
			}).inject(this._container);
		}, this);
		
		this.renderersWidget = new PDCMapRenderersListWidget(this.leftContainer, this._controller)
									.addEvent('viewportChange', this.showBounds.bind(this));
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
	
/**********INTERFACE MANAGEMENT**********/	
	showDetails: function showDetails(details) {
		this.detailsContainer.set('html', details);
		return this;
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
});