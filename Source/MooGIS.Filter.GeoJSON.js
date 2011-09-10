/*
---
description: Defines a MooGIS filter over a GeoJSON stream.

license: to be determined

authors:
- Matti Schneider-Ghibaudo

requires:
- core/1.3: '*'
- MooGIS.Source

provides: [MooGIS.Source.GeoJSON]

version: 0.0.1

---
*/

/**See documentation in Docs/Filters.md
*
*/
MooGIS.Filter.GeoJSON = new Class({
	Extends: MooGIS.Filter,
	
	style: { },
	
	initialize: function init(source, options) {
		this.parent(source, options);
	},
	
	/**Sets this filter's output stream's style and fires a `set` event for updating.
	*TODO:	create a `style` event rather than re-filtering everything.
	*
	*@param	Object	style	a Hash of the following form, where all keys are optional:
	*	{
	*		className:	"a-css-class-name",
	*		color:		"any CSS color",
	*		opacity:	integer between 0 and 1,
	*		size:		,
	*		icon:		"url/to/image",
	*		shadow:		"url/to/image"
	*	}
	*/
	setStyle: function setStyle(style) {
		this.style = style;
		this.reload();
	},
	
	/**Applies this Filter's current style to the given geojson data.
	*Of course, styling GeoJSON-encoded data doesn't make any sense. It is simply a way to specify how the GeoJSON stream should be rendered by the map view. It is finally its responsibility to render it properly.
	*Overwrites previous style for the keys given in the `style` param, leaves the others alone.
	*
	*@returns	the stream, with style information
	*@param	GeoJSON	geojson	the data on which to apply this style
	*/
	_paintData: function _paintData(geojson) {
		geojson.style = Object.merge(geojson.style, style);
		return geojson;	
	},
	
	/**
	*@protected
	*/
	_handleSet: function _handleSet(geojson) {
		geojson.features = geojson.features.filter(this.accepts, this);
		
		this.fireEvent('set', geojson);
	},

	/**
	*@protected
	*/	
	_handleAdd: function _handleAdd(geojson) {
		geojson.features = geojson.features.filter(this.accepts, this);
		
		this.fireEvent('add', geojson);
	},

	/**
	*@protected
	*/
	_handleRemove: function _handleRemove(geojson) {
		this.fireEvent('remove', geojson);
	},
});
