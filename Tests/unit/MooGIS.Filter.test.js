/**Tests for MooGIS.Filter.
*Written with JSSpec.
*
*@author	Matti Schneider-Ghibaudo
*/

(function() {

var subject,
	secondSubject,
	source,
	signal,
	secondSignal;

describe('Filter', {
	before_all: function() {
		source = new MooGIS.Source.GeoJSON.Input(geojsonData());
	},
	
	before: function() {
		signal = secondSignal = 0;
	
		subject = new MooGIS.Filter.PassThrough(source);
		secondSubject = new MooGIS.Filter.PassThrough(subject);
		
		subject.addEvent('set', function() {
			signal++;
		});
		secondSubject.addEvent('set', function() {
			secondSignal++;
		});
	},
	
	"'set' events are not sent out of nowhere": function() {
		value_of(signal).should_be(0);
	},
	
	"Source 'set' events are forwarded, and forwarded once": function() {
		source.reload();
		
		value_of(signal).should_be(1);
	},
	
	"Chained 'set' events are forwarded, and forwarded once": function() {
		source.reload();
		
		value_of(secondSignal).should_be(1);
	}
});


})();
