/*
---
description: Defines a MooGIS source for the Geojson channel.

license: to be determined

authors:
- Matti Schneider-Ghibaudo

requires:
- core/1.3: '*'
- MooGIS.Source

provides: [MooGIS.Source.Geojson]

version: 0.0.1

---
*/

MooGIS.Source.Geojson = new Class({
	Extends: MooGIS.Source,

	initialize: function init(options) {
		this.parent(options);
	}
});
