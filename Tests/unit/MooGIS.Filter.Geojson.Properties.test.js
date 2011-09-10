/**Tests for MooGIS.Filter.Geojson.Properties.
*Written with JSSpec.
*
*@author	Matti Schneider-Ghibaudo
*/

(function() {

var subject,
	numberSubject,
	signal,
	data,
	expectedData = {
		"type": "FeatureCollection",
		"features": [ geojsonData().features[0] ]
	};
	
describe('Filter.Geojson.Properties', {
	before_all: function() {
		source = new MooGIS.Source.Geojson.Input(geojsonData());
	},
	
	before: function() {
		if (subject)
			subject.setSource(); // very important: otherwise, the source still has a reference to the previous subject, which is not useful anymore but still has a closure reference to the `signal`
	
		signal = 0;
		setData = undefined;
		
		subject = new MooGIS.Filter.Geojson.Properties(source, {
			match: {
				'someText': 'Text'
			}
		});
		
		subject.addEvent('set', function(data) {
			signal++;
			setData = data;
		});
	},
	
	"Class is available": function() {
		value_of(MooGIS.Filter.Geojson.Properties).should_not_be_undefined();
	},
	
	"Data is filtered properly": function() {
		value_of(subject.stream()).should_be(expectedData);
	},
	
	"Set event is properly fired and filters apply": function() {
		value_of(signal).should_be(0);
		
		subject.reload();
		
		value_of(signal).should_be(1);
		value_of(setData).should_be(expectedData);
	},
	
	"Filter over numbers": function() {
		subject.setSource();
		subject = new MooGIS.Filter.Geojson.Properties(source, {
			match: {
				'someNumber': 23,
			}
		});
		
		subject.reload();
		
		value_of(signal).should_be(1);
		value_of(setData).should_be(expectedData);
	}
});

})();
