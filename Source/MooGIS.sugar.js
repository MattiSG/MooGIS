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
*@param	accepts	Function	a `Filter.accepts(feature)` method
*/
gis.filter = function newFilter(channel, name, accepts) {
	return MooGIS.Filter[channel][name.capitalize()] = new Class({
		Extends: MooGIS.Filter[channel],
		
		accepts: accepts
	});
}

/**Defines a `MooGIS.Source.<Channel>.<Implementation>` class.
*
*@returns	the new class. Note: the fully namespaced source will also be created and made available globally.	
*@param	channel	String	the channel that this source may feed. The corresponding MooGIS.Source.<Channel> class must exist.
*@param	name 	String	the Source's name (`<Implementation>`)
*@param	Stream	Function	a `Source.stream()` method
*@param	optional	helpers	Object	methods that will be implemented in the new class. Same syntax as for `Class.implement` params.
*/
gis.source = function newSource(channel, name, stream, helpers) {
	var result = MooGIS.Source[channel][name.capitalize()] = new Class({
		Extends: MooGIS.Source[channel],
		
		stream: stream
	});
	
	if (helpers)
		result.implement(helpers);
	
	return result;
}