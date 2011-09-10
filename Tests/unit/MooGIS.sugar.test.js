/**Tests for MooGIS.sugar.
*Written with JSSpec.
*
*@author	Matti Schneider-Ghibaudo
*/

(function() {

describe('Sugar', {
	"Global shortcut": function() {
		value_of(gis).should_be(MooGIS);
	},
	
	"Filter shortcut": function() {
		var short = gis.filter('GeoJSON', 'PassThrough_short', function(data) {
			return true;
		});
		
		value_of(short).should_be(MooGIS.Filter.GeoJSON.PassThrough_short);
		value_of(short).should_be(MooGIS.Filter.GeoJSON.PassThrough);
	}
});


})();
