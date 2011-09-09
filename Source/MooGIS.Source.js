/*
---
description: Defines a MooGIS feature source that fetches a GeoJSON file from the given URL.

license: to be determined

authors:
- Matti Schneider-Ghibaudo

requires:
- core/1.3: '*'
- MooGIS.Source

provides: [MooGIS.Source]

version: 0.0.1

---
*/

/**See documentation in Docs/FeatureSource.md
*
*/
MooGIS.Source = new Class({
	Implements: [Options, Events],
	
	initialize: function init(options) {
		this.setOptions(options);
	},
	
	reload: function reload() {
		this.fireEvent('set', this.stream());
	},
	
	complement: function complement() {
		return []; // for a Source, no complement!
	}
});
