/*
---
description: Defines a MooGIS source for the Geojson channel.

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

MooGIS.Source.GeoJSON = new Class({
	Extends: MooGIS.Source,

	initialize: function init(options) {
		this.parent(options);
	}
});
