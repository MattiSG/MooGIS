/*
---
description: Abstract definition of a MooGIS view. Instances of subclasses should be used.

license: to be determined

authors:
- Matti Schneider-Ghibaudo

requires:
- core/1.3: '*'
- MooGIS

provides: [MooGIS.View]

version: 0.0.1

---
*/

MooGIS.View = new Class({
	/**The following events are to be fired:
	*domready: when all initialization has been done
	*load: when the map has finished loading tiles
	*/
	Implements: [Options, Events],
/*
	_mapView: MooGIS.View.Map
	_container: Element,
*/	
	options: {
		/**Attributes for generated elements.
		*/
		IDs: {
			map:			'map',
			modules:		'leftWrapper',
			details:		'details'
		},
		/**Empty the container on load or not.
		*Allows you to put a diagnostic/loading message while waiting for JS to load.
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
		
		this.fireEvent('domready');
	},
	
	buildDOM: function buildDOM() {
		['modules', 'map', 'details'].each(function(item) {
			this[item + 'Container'] = new Element('div', {
				id : this.options.IDs[item]
			}).inject(this._container);
		}, this);
	},
	
	setMap: function setMap(type, options) {
		this._mapView = new MooGIS.View.Map[type](this.mapContainer, options);
		this._mapView.addEvent('load', this.fireEvent('load'));
	},
			
/**********GETTERS**********/
	container: function container() {
		return this._container;
	},
	
/**********INTERFACE MANAGEMENT**********/
	showDetails: function showDetails(details) {
		this.detailsContainer.set('html', details);
		return this;
	}
});