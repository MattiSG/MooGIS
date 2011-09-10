/**Factors some common tests for MooGIS classes, and provides tests closure-wrapping.
*
*Provides the following local vars:
* - subjectClass: the actual class object for the given name
*
*@param	name	String	the name of the tested class, without the "MooGIS" root namespace
*@param	tests	Object	an Object of tests, as specified by JSSpec.
*/
function testClass(name, tests) {
	new Asset.javascript('../Source/MooGIS.' + name + '.js', {
		onLoad: function() {
			var subjectClass = MooGIS;
			name.split('.').each(function(ns) {
				subjectClass = subjectClass[ns];
			});
	
			describe(name, Object.merge({
				"Class is available": function() {
					value_of(subjectClass).should_not_be_undefined();
				}
			}, tests));
		}
	});
}