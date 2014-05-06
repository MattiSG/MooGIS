/*
---
description: Defines a MooGIS Tile source that uses OpenStreetMap servers.

license: to be determined

authors:
- Matti Schneider

requires:
- core/1.3: '*'
- MooGIS.Source.Tile

provides: [MooGIS.Source.Tile.OpenStreetMap]

version: 0.0.1

---
*/

MooGIS.Source.Tile.OpenStreetMap = new Class({
	/**Fires the `set` source event, plus the following additional events:
	*/
	Extends: MooGIS.Source.Tile,


	stream: function stream() {
		return Object.merge(
					this.options,
						{
							url: 'http://{s}.tile.openstreetmap.com/{z}/{x}/{y}.png'
						}
					);
	}
});
