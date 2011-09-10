/*
---
description: Filters features a GeoJSON stream over their matching with a given set of properties.

license: to be determined

authors:
- Matti Schneider-Ghibaudo

requires:
- core/1.3: '*'
- MooGIS.Source.Geojson

provides: [MooGIS.Source.Geojson.Properties]

version: 0.0.1

---
*/

/**Defines MooGIS.Filter.Geojson.Properties.
*Filters GeoJSON features over whether they match a given set of properties or not.
*Options:
* - match: Object, where the keys are the keys to match in features, and values are Regexps or Strings to match values against
* //TODO: test matching other values than strings.
*
*/
gis.filter('Geojson', 'Properties', function(feature) {
	var against = this.options.match;
	for (k in against) {
		if (! against.hasOwnProperty(k))
			break;
		
		if (! feature[k])
			return false;
		
		if (! feature[k].test(against[k]))
			return false;
	}
	
	return true;
});
