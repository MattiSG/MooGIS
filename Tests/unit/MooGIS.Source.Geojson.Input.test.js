/**Tests for MooGIS.Source.Geojson.Input.
*Written with JSSpec.
*
*@author	Matti Schneider-Ghibaudo
*/

(function() {

var subject,
	signal,
	data;
	
describe('Source.Geojson.Input', {
	before: function() {
		signal = 0;
		setData = undefined;
		
		subject = new MooGIS.Source.Geojson.Input(geojsonData());
		
		subject.addEvent('set', function(data) {
			signal++;
			setData = data;
		});
	},
	
	"Class is available": function() {
		value_of(MooGIS.Source.Geojson.Input).should_not_be_undefined();
	},
	
	"Data is not changed when streamed": function() {
		value_of(subject.stream()).should_be(geojsonData());
	},
	
	"Set event is properly fired": function() {
		value_of(signal).should_be(0);
		
		subject.reload();
		
		value_of(signal).should_be(1);
		value_of(setData).should_be(geojsonData());
	}
});

})();
