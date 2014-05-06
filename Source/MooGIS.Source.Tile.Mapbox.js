/*
---
description: Defines a MooGIS Tile source that uses Mapbox servers.

license: to be determined

authors:
- Matti Schneider

requires:
- core/1.3: '*'
- MooGIS.Source.Tile

provides: [MooGIS.Source.Tile.Mapbox]

version: 0.0.1

---
*/

MooGIS.Source.Tile.Mapbox = new Class({
	/**Fires the `set` source event, plus the following additional events:
	*/
	Extends: MooGIS.Source.Tile,

	/**All options from Tiledef, plus 'styleId'.
	*
	*@see	Tiledef
	*/
	options: {
		/**ID of a style created with the Mapbox Editor.
		*
		*@see	https://www.mapbox.com/help/customizing-map-colors/
		*/
		styleId: 'examples.map-80a1b6f7'
	},

	/**Sets the current styleId to the given one and streams the new tiledef.
	*
	*@returns	this	for chainability
	*@param	id	Number of String	the ID of a style created with Cloudmade Map Editor.
	*/
	setStyle: function setStyle(id) {
		this.setOptions({
			styleId: id
		});

		this.reload();

		return this;
	},

	stream: function stream() {
		return Object.merge(
					this.options,
						{
							url: 'http://{s}.tiles.mapbox.com/v3/'
								+ this.options.styleId
								+ '/{z}/{x}/{y}.png'
						}
					);
	}
});
