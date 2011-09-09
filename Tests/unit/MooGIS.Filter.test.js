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
		source = new MooGIS.Source.GeoJSON.Distant('https://github.com/MattiSG/MooGIS/raw/master/Demo/assets/GeoJSONdemo.json');
	},
	
	before: function() {
		signal = false;
		secondSignal = false;
	
		subject = new MooGIS.Filter(source);
		secondSubject = new MooGIS.Filter(subject);
		
		subject.accepts = secondSubject.accepts = function(features) {
			return true;
		}
		
		subject.addEvent('set', function() {
			signal = true;
		});
		secondSubject.addEvent('set', function() {
			secondSignal = true;
		});
	},
	
	"'set' events are not sent out of nowhere": function() {
		value_of(signal).should_be(false);
	},
	
	"Source 'set' events are forwarded": function() {
		source.reload();
		
		value_of(signal).should_be(true);
	},
	
	"Chained 'set' events are forwarded": function() {
		source.reload();
		
		value_of(secondSignal).should_be(true);
	}
});


})();
