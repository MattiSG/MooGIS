/*
---
description: Defines a MooGIS filter.

license: to be determined

authors:
- Matti Schneider-Ghibaudo

requires:
- core/1.3: '*'
- MooGIS.Source

provides: [MooGIS.Filter]

version: 0.0.1

---
*/

/**See documentation in Docs/Filters.md
*
*/
MooGIS.Filter = new Class({
	Extends: MooGIS.Source,
	
	/**The input stream, a Source-compliant object.
	*/
	_source: null,
	
	options: {
		/**Use a cache or not? This is a memory/speed tradeoff, and most of the time not worth it since events are used. Double-check that your code really needs it.
		* NOT IMPLEMENTED (to be thought about: really clutters the code here. Think about an event-based Mixin).
		*/
//		cache: false
	},
	
	initialize: function init(source, options) {
		this.parent(options);
		this.setSource(source);		
	},
	
	/**Sets this Filter's source and fires a `set` event.
	*Set to null if you want to remove the source (in which case the filter has an empty stream).
	*/
	setSource: function setSource(source) {
		this._source = source;
		if (source) {
			['set', 'add', 'remove'].each(function(eventName) {
				source.addEvent(eventName, this['_handle' + eventName.capitalize()].bind(this))
			}, this);
			
			this.reload();
		}
		
		return this;
	},
	
	_handleSet: function _handleSet(features) {
		features = features.filter(this.accepts, this)
		
		this.fireEvent('set', features);
	},
	
	_handleAdd: function _handleAdd(features) {
		features = features.filter(this.accepts, this);
		
		this.fireEvent('add', features);
	},
	
	_handleRemove: function _handleRemove(features) {
		this.fireEvent('remove', features);
	},
	
	stream: function stream() {
		if (! this.source)
			return [];
		
		return this._source.stream().filter(this.accepts, this);
	},
	
	complement: function complement() {
		if (! this.source)
			return [];
	
		return this._source.stream().filter(function(feature) {
			return ! this.accepts(feature);
		}, this);
	}
	
	/*To be implemented:
	*	accepts(feature)	(returns bool)
	*/
});
