/*
---
description: A filter that does not filter anything. Used for testing purposes

license: to be determined

authors:
- Matti Schneider-Ghibaudo

requires:
- core/1.3: '*'
- MooGIS.Filter.Geojson

provides: [MooGIS.Filter.Geojson.PassThrough]

version: 0.0.1

---
*/

MooGIS.Filter.Geojson.PassThrough = new Class({
	Extends: MooGIS.Filter.Geojson,
	
	accepts: function(feature) {
		return true;
	}
});
