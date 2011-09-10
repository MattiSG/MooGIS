/**Tests for MooGIS.Source.Tile.Cloudmade.
*Written with JSSpec.
*
*@author	Matti Schneider-Ghibaudo
*/

(function() {

var subject,
	secondSubject,
	signal,
	data;

function check(data, styleId) {
	value_of(subject.stream().url).should_be('http://{s}.tile.cloudmade.com/API-KEY/' + styleId + '/256/{z}/{x}/{y}.png');
	value_of(subject.stream().attribution).should_not_be_undefined();
}

describe('Source.Tile.Cloudmade', {
	before: function() {
		signal = 0;
		data = undefined;
		
		subject = new MooGIS.Source.Tile.Cloudmade('API-KEY', {
			styleId: 997
		});
		
		subject.addEvent('set', function(data) {
			signal++;
			setData = data;
		});
	},
	
	"Class is available": function() {
		value_of(MooGIS.Source.Tile.Cloudmade).should_not_be_undefined();
	},
	
	"Data is outputted properly": function() {
		check(subject.stream(), 997);
	},
	
	"Set event is properly fired and filters apply": function() {
		value_of(signal).should_be(0);
		
		subject.reload();
		
		value_of(signal).should_be(1);
		check(setData, 997);
	},
	
	"Changing style sets new tiles": function() {
		value_of(signal).should_be(0);
		
		subject.setStyle(2000);
		
		value_of(signal).should_be(1);
		check(setData, 2000);
	}
});

})();
