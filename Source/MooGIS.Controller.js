/*
---
description: Controls a complex map containing several hundreds or thousands markers with a lot of metadata.

license: to be determined

authors:
- Matti Schneider-Ghibaudo

requires:
- core/1.3: '*'
- MooGIS
- MooGIS.View
- MooGIS.Group

provides: [MooGIS.Controller]

version: 0.0.1

---
*/


MooGIS.Controller = new Class({
	Implements: [Options, Events],
/*
	source: MooGIS.Group,
	view: MooGIS.View,
	saveRequest: Request,
*/	
	options: {
		/**Options for an async request to a server that will save the serialized status of this MooGIS setup.
		*Set to `false` to deactivate distant save altogether.
		*/
		save: {
			url: 'save',
			interval: 10000, //ms, set to 0 to deactivate
			method: 'post',
			successValue: 'ok'
		}
	},
	
	initialize: function init(source, view, options) {
		this.source = source;
		this.view = view;
		this.setOptions(options);
		
		if (this.options.save) {
			this.saveRequest = new Request(this.options.save);
			this.save.periodical(this.options.save.interval, this);
		}
		
		this.view.setController(this);
	},
	
	getModel: function getModel() {
		return this.source;
	},
	
	getView: function getView() {
		return this.view;
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