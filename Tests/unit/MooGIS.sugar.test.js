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
		var short = gis.filter('Geojson', 'PassThrough_short', function(data) {
			return true;
		});
		
		value_of(short).should_be(MooGIS.Filter.Geojson.PassThrough_short);
		value_of(short).should_be(MooGIS.Filter.Geojson.PassThrough);
	},
	
	"Source shortcut": function() {
		var short = gis.source('Geojson', 'Input_short', geojsonData);
		
		value_of(MooGIS.Source.Geojson.Input_short).should_be(short);
		
		short = new short();
		var long = new MooGIS.Source.Geojson.Input(geojsonData());
		value_of(short.stream()).should_be(long.stream());
	}
});


})();
