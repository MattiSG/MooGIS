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
* - match: Object, where the key/value pairs are to be matched in features
*
* //TODO: match patterns rather than straight values
*
*/
gis.filter('Geojson', 'Properties', function(feature) {
	var against = this.options.match;
	for (k in against) {
		if (! against.hasOwnProperty(k))
			break;
		
		if (! feature.properties[k])
			return false;
		
		if (feature.properties[k] != against[k])
			return false;
	}
	
	return true;
});
