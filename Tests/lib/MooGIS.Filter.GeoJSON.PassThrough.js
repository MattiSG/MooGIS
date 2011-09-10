/*
---
description: A filter that does not filter anything. Used for testing purposes

license: to be determined

authors:
- Matti Schneider-Ghibaudo

requires:
- core/1.3: '*'
- MooGIS.Filter.GeoJSON

provides: [MooGIS.Filter.GeoJSON.PassThrough]

version: 0.0.1

---
*/

MooGIS.Filter.GeoJSON.PassThrough = new Class({
	Extends: MooGIS.Filter.GeoJSON,
	
	accepts: function(features) {
		return true;
	}
});
