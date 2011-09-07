/*
---
description: Defines a MooGIS feature source that fetches a GeoJSON file from the given URL.

license: to be determined

authors:
- Matti Schneider-Ghibaudo

requires:
- core/1.3: '*'
- MooGIS.Source

provides: [MooGIS.Source.GeoJSON]

version: 0.0.1

---
*/

MooGIS.Source.GeoJSON = new Class({
	/**Fires the `set` source event, plus the following additional events:
	* - `error`: if there was an error fetching or parsing the file
	*	- param:	String	an explanation of the error (in English, but rather developer-oriented)
	*/
	Extends: MooGIS.Source,
	
	/*
	url: String,
	request: Request.JSON
	*/
	
	options: {
		/**Request.JSON options for fetching the GeoJSON file.
		*/
		request: {}
	},
	
	/**
	*@param	url	String	the URL from which to fetch the GeoJSON object.
	*/
	initialize: function init(url, opts) {
		this.parent(opts);
		
		this.url = url;
		
		this.request = new Request.JSON(Object.merge({
			url: url,
			events: {
				onSuccess: function(geoJSON) {
					this.fireEvent('set', geoJSON);
				}.bind(this),
				onError: this.handleError.pass('Invalid GeoJSON from "' + this.url + '"', this),
				onFailure: this.handleError.pass('Request to "' + this.url + '" failed', this),
				onException: this.handleError.pass('Invalid request to "' + this.url + '"', this)
			}
		}), this.options.request);
	},
	
	handleError: function handleError(errorDetails) {
		this.fireEvent('error', errorDetails);
		this.fireEvent('set', {});
	},
	
	/**Fetches the GeoJSON file.
	*
	*Will trigger the `set` event once the file is fetched, either with the instanciated GeoJSON object or an empty hash in case of an error.
	*/
	load: function load() {
		this.request.send();
	}
});
