/*
---
description: Defines a MooGIS Geojson source that uses a direct GeoJSON input.

license: to be determined

authors:
- Matti Schneider-Ghibaudo

requires:
- core/1.3: '*'
- MooGIS.Source.GeoJSON

provides: [MooGIS.Source.GeoJSON.Distant]

version: 0.0.1

---
*/

MooGIS.Source.GeoJSON.Input = new Class({
	/**Fires the `set` source event, plus the following additional events:
	*/
	Extends: MooGIS.Source.GeoJSON,
	
	/*
	_data: GeoJSON data
	*/
	
	options: {
	},
	
	/**
	*@param	url	String	the URL from which to fetch the GeoJSON object.
	*/
	initialize: function init(data, opts) {
		this.parent(opts);
		
		this._data = data;
	},

	/**
	*Remember to call `load`, and that `load` is async!
	*/
	stream: function stream() {	
		return [this._data]; // array for interface compliance
	}
});
