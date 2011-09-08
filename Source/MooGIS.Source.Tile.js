/*
---
description: Defines a MooGIS Tile source.

license: to be determined

authors:
- Matti Schneider-Ghibaudo

requires:
- core/1.3: '*'
- MooGIS.Source

provides: [MooGIS.Source.Tile]

version: 0.0.1

---
*/

MooGIS.Source.Tile = new Class({
	Extends: MooGIS.Source,
	
	initialize: function init(options) {
		this.parent(options);
	}
});
