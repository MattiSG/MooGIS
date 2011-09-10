/*
---
description: Defines a MooGIS Geojson source that fetches a GeoJSON file from the given URL.

license: to be determined

authors:
- Matti Schneider-Ghibaudo

requires:
- core/1.3: '*'
- MooGIS.Source.Geojson

provides: [MooGIS.Source.Geojson.Distant]

version: 0.0.1

---
*/

MooGIS.Source.Geojson.Distant = new Class({
	/**Fires the `set` source event, plus the following additional events:
	* - `error`: if there was an error fetching or parsing the file
	*	- param:	String	an explanation of the error (in English, but rather developer-oriented)
	*/
	Extends: MooGIS.Source.Geojson,
	
	/*
	url: String,
	request: Request.JSON,
	cache: GeoJSON data
	*/
	
	options: {
		/**Request.JSON options for fetching the GeoJSON file.
		*/
		request: {
			method: 'get'
		}
	},
	
	/**
	*@param	url	String	the URL from which to fetch the GeoJSON object.
	*/
	initialize: function init(url, opts) {
		this.parent(opts);
		
		this.url = url;
		
		this.request = new Request.JSON(Object.merge({
			url: url
		}, this.options.request));
		
		this.request.addEvents({
			success: function(geoJSON) {
				this.cache = geoJSON;
				this.fireEvent('set', geoJSON);
			}.bind(this),
			error: this.handleError.pass('Invalid GeoJSON from "' + this.url + '"', this),
			failure: this.handleError.pass('Request to "' + this.url + '" failed', this),
			exception: this.handleError.pass('Invalid request to "' + this.url + '"', this)
		});
	},
	
	handleError: function handleError(errorDetails) {
		this.fireEvent('error', errorDetails);
	},
	
	/**
	*Remember to call `load`, and that `load` is async!
	*/
	stream: function stream() {
		if (! this.cache) {
			this.load();
			throw('GeoJSON file not loaded yet!');
		}
			
		return this.cache;
	},
	
	/**Fetches the GeoJSON file.
	*Will trigger the `set` event once the file is fetched.
	*/
	load: function load() {
		this.request.send();
	}
});
