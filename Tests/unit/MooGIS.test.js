/**Tests for MooGIS root.
*Written with JSSpec.
*
*@author	Matti Schneider-Ghibaudo
*/

(function() {

describe('Root', {
	"Global object": function() {
		value_of(MooGIS).should_not_be_undefined();
	}
});


})();
