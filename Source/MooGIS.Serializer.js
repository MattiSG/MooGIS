/*
---
description: Serializes and deserializes a user setup and saves it to a distant to server.

license: to be determined

authors:
- Matti Schneider-Ghibaudo

requires:
- core/1.3: '*'
- MooGIS

provides: [MooGIS.Serializer]

version: 0.0.1

---
*/


MooGIS.Controller = new Class({
	Implements: [Options, Events],
/*
	saveRequest: Request,
*/	
	options: {
		/**Interval between autosave requests, in ms
		*Set to false to deactivate the periodical autosave. Remember to call `save()` regularly!
		*/
		interval: 10000,
		/**Options for an async request to a server that will save the serialized status of this MooGIS setup.
		*Set to `false` to deactivate distant save altogether.
		*/
		save: {
			url: 'save',
			method: 'post',
			successValue: 'ok'
		}
	},
	
	initialize: function init(options) {
		this.source = source;
		this.view = view;
		this.setOptions(options);
		
		if (this.options.save) {
			this.saveRequest = new Request(this.options.save);
			this.save.periodical(this.options.interval, this);
		}
		
		this.view.setController(this);
	},
	
	save: function save() {
		this.saveRequest.send({
			data: {
				data: JSON.encode(this.view.serialize())
			}
		}).addEvents({
			complete: this.fireEvent.pass('saveRequest', this),
			failure: this.fireEvent.pass('saveFail', this),
			success: function(responseText) {
				if (responseText == this.options.save.successValue)
					this.fireEvent('saveSuccess');
				else
					this.fireEvent('saveFail');
			}.bind(this)
		});
	},
	
	load: function load(data) {
		if (typeof data == 'string')
			data = JSON.decode(data);
//		this.view.unserialize(data);
	}
});