/*
---
description: Defines a MooGIS Geojson source that uses a direct GeoJSON input.

license: to be determined

authors:
- Matti Schneider-Ghibaudo

requires:
- core/1.3: '*'
- MooGIS.Source.Geojson

provides: [MooGIS.Source.Geojson.Input]

version: 0.0.1

---
*/

MooGIS.Source.Geojson.Input = new Class({
	/**Fires the `set` source event, plus the following additional events:
	*/
	Extends: MooGIS.Source.Geojson,
	
	/*
	_data: GeoJSON data
	*/
	
	options: {
	},
	
	/**
	*@param	data	GeoJSON-encoded data	the features to feed
	*/
	initialize: function init(data, opts) {
		this.parent(opts);
		
		this._data = data;
	},

	stream: function stream() {	
		return this._data;
	}
});
