/*
---
description: A set of shortcuts that make MooGIS' heavy namespacing more digestible.

license: to be determined

authors:
- Matti Schneider-Ghibaudo

requires:
- core/1.3: '*'
- MooGIS
- MooGIS.Filter
- MooGIS.Source

provides: [MooGIS.sugar]

version: 0.0.1

---
*/

/**MooGIS is available through the shorter `gis`.
*/
var gis = MooGIS;

/**Defines a `MooGIS.Filter.<Channel>.<Implementation>` class.
*
*@returns	the new class. Note: the fully namespaced filter will also be created and made available globally.	
*@param	channel	String	the channel to which this filter may be applied. The corresponding MooGIS.Filter.<Channel> class must exist.
*@param	name 	String	the Filter's name (`<Implementation>`)
*@param	accepts	Function	a `Filter.accepts` method
*/
gis.filter = function newFilter(channel, name, accepts) {
	return MooGIS.Filter[channel][name.capitalize()] = new Class({
		Extends: MooGIS.Filter[channel],
		
		accepts: accepts
	});
}
