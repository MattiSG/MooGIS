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
		if (subject)
			subject.setSource(); // very important: otherwise, the source still has a reference to the previous subject, which is not useful anymore but still has a closure reference to the `signal`
		if (secondSubject)
			secondSubject.setSource();
		
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
		
		source.reload();
		value_of(signal).should_be(2);
	},
	
	"Chained 'set' events are forwarded, and forwarded once": function() {
		source.reload();
		value_of(secondSignal).should_be(1);
		
		source.reload();
		value_of(secondSignal).should_be(2);
	},
	
	"Changing the source removes all previous event bindings": function() {
		source.reload();
		subject.setSource(null);
		source.reload();
		
		value_of(signal).should_be(1);
		value_of(secondSignal).should_be(1);
	},
});


})();
