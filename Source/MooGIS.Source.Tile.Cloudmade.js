/*
---
description: Defines a MooGIS Tile source that uses Cloudmade servers.

license: to be determined

authors:
- Matti Schneider-Ghibaudo

requires:
- core/1.3: '*'
- MooGIS.Source.Tile

provides: [MooGIS.Source.Tile.Cloudmade]

version: 0.0.1

---
*/

MooGIS.Source.Tile.Cloudmade = new Class({
	/**Fires the `set` source event, plus the following additional events:
	*/
	Extends: MooGIS.Source.Tile,
	
	/*
	url: String,
	request: Request.JSON,
	cache: GeoJSON data
	*/
	
	/**All options from Tiledef, plus 'styleId'.
	*`styleId` is an ID from styles created with Cloudmade Map Editor.
	*
	*@see	Tiledef
	*@see	http://maps.cloudmade.com/editor
	*/
	options: {
		attribution: "Map data CC-BY-SA OpenStreetMap contributors, Imagery ©2011 CloudMade",
		tileSize: 256,
		styleId: 997
	},
	
	/**
	*@param	key	your Cloudmade API key
	*
	*@see	http://cloudmade.com/start
	*/
	initialize: function init(key, opts) {
		this.parent(opts);
		
		this._key = key;
	},
	
	setStyle: function setStyle(id) {
		this.setOptions({
			styleId: id
		});
		
		this.reload();
	},
	
	stream: function stream() {
		return Object.merge(
					this.options,
						{
							url: 'http://{s}.tile.cloudmade.com/'
								+ this._key + '/'
								+ this.options.styleId + '/'
								+ this.options.tileSize
								+ '/{z}/{x}/{y}.png'
						}
					);
	}
});
