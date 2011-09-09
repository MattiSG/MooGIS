/*
---
description: A filter that does not filter anything. Used for testing purposes

license: to be determined

authors:
- Matti Schneider-Ghibaudo

requires:
- core/1.3: '*'
- MooGIS.Filter

provides: [MooGIS.Filter.True]

version: 0.0.1

---
*/

MooGIS.Filter.PassThrough = new Class({
	Extends: MooGIS.Filter,
	
	accepts: function(features) {
		return true;
	}
});
