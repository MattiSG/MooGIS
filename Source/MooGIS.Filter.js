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
	handledEvents: ['set', 'add', 'remove'],
	
	options: {
		/**Use a cache or not? This is a memory/speed tradeoff, and most of the time not worth it since events are used. Double-check that your code really needs it.
		* NOT IMPLEMENTED (to be thought about: really clutters the code here. Think about an event-based Mixin).
		*/
//		cache: false
	},
	
	initialize: function init(source, options) {
		this.parent(options);
		
		this.handlers = {};
		this.handledEvents.each(function(eventName) {
			this.handlers[eventName] = this['_handle' + eventName.capitalize()].bind(this);
		}, this);
		
		this.setSource(source);
	},
	
	/**Sets this Filter's source and fires a `set` event.
	*Set to null if you want to remove the source (in which case the filter has an empty stream).
	*/
	setSource: function setSource(source) {
		//TODO performance: is `if each, if each` more efficient than `each{if if}`? Complexity says yes (hence current implementation), but maybe the call stack says no…
		if (this._source) {
			Object.each(this.handlers, function(handler, eventName) {
				this._source.removeEvent(eventName, handler);
			}, this);
		}
		
		if (source) {
			Object.each(this.handlers, function(handler, eventName) {
				source.addEvent(eventName, handler);
			}, this);
		}
		
		this._source = source;
		return this;
	},
	
	/**
	*@protected
	*/
	_handleSet: function _handleSet(dataPoints) {
		this.fireEvent('set', this.filter(dataPoints));
	},

	/**
	*@protected
	*/	
	_handleAdd: function _handleAdd(dataPoints) {
		this.fireEvent('add', this.filter(dataPoints));
	},

	/**
	*@protected
	*/
	_handleRemove: function _handleRemove(dataPoints) {
		this.fireEvent('remove', dataPoints);
	},
	
	/**Returns the subset of passed in data points that are accepted by this filter.
	*Defines how to apply the `accepts` method (to be defined by subclasses) to the data points. Usually redefined by each channel.
	*
	*@param	dataPoints	data points, as specified for this channel
	*/
	filter: function filter(dataPoints) {
		return dataPoints.filter(this.accepts, this);
	},
	
	stream: function stream() {
		if (! this._source)
			return null;
		
		return this.filter(this._source.stream());
	}
	
	/*To be implemented:
	*	accepts(feature)	(returns bool)
	*/
});
