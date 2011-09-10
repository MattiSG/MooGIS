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
		source = new MooGIS.Source.Geojson.Input(geojsonData());
	},
	
	before: function() {
		if (subject)
			subject.setSource(); // very important: otherwise, the source still has a reference to the previous subject, which is not useful anymore but still has a closure reference to the `signal`
		if (secondSubject)
			secondSubject.setSource();
		
		signal = secondSignal = 0;
	
		subject = new MooGIS.Filter.Geojson.PassThrough(source);
		secondSubject = new MooGIS.Filter.Geojson.PassThrough(subject);
		
		subject.addEvent('set', function() {
			signal++;
		});
		secondSubject.addEvent('set', function() {
			secondSignal++;
		});
	},
	
	"Class is available": function() {
		value_of(MooGIS.Filter).should_not_be_undefined();
	},
	
	"'set' events are not sent out of nowhere": function() {
		value_of(signal).should_be(0);
	},
	
	"'stream()' passes the data on": function() {
		value_of(subject.stream()).should_be(source.stream());
		value_of(secondSubject.stream()).should_be(source.stream());
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
	
	"Passed data is not modified by pass-through filters": function() {
		var entered = 0;
		
		function check(features) {
			value_of(features).should_be(geojsonData());
			entered++;
		}
		
		subject.addEvent('set', check);
		secondSubject.addEvent('set', check);
		
		source.reload();
		
		value_of(entered).should_be(2); // just to make sure we actually entered the checks
	},
});


})();
