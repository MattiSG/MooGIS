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
	
	"Source shortcut definition": function() {
		var short = gis.source('Geojson', 'Input_short', geojsonData);
		
		value_of(MooGIS.Source.Geojson.Input_short).should_be(short);
		
		short = new short();
		var long = new MooGIS.Source.Geojson.Input(geojsonData());
		value_of(short.stream()).should_be(long.stream());
	},
	
	"Filter shortcut definition": function() {
		var short = gis.filter('Geojson', 'PassThrough_short', function(data) {
			return true;
		});
		
		value_of(short).should_be(MooGIS.Filter.Geojson.PassThrough_short);
		value_of(short).should_be(MooGIS.Filter.Geojson.PassThrough);
	},
	
	"Filter shortcut usage": function() {
		var short = gis.filter('Geojson', 'PassThrough_short2', function(data) {
			return true;
		});

		var source = new MooGIS.Source.Geojson.Input(geojsonData());
		
		short = new short(source);
		value_of(short.stream()).should_be(source.stream());
	}	

});


})();
