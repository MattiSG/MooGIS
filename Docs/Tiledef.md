Tile layer definition (Tiledef)
===============================

A `Tiledef` is used to describe a tiles layer. It is an abstraction over a tiles layer just like GeoJSON is an abstraction over a set of features. Just like it, it is used to encapsulate a description for being streamed from sources to views through filters.

A `Tiledef` is a hash with the following items:

	{
		url: 'http://url/template/with/expansion/items/like/{x}/{y}/{z}', // see http://leaflet.cloudmade.com/reference.html#tilelayer
		attribution: 'Some attribution string, such as "CC-BY-SA OpenStreetMap contributors"',
		
		// all other elements are optional:
		
		minZoom: 0,		// minimum zoom number
		maxZoom: 18,	// maximum zoom number
		tileSize: 256,	// tile size (width and height in pixels, assuming tiles are square)
		subdomains: ['array', 'with', 'subdomains'], // subdomains of the tile service, that may be chosen at random
		errorTileUrl: '',	//URL to the tile image to show in place of tiles that fail to load
		scheme: 'xyz'	// either 'xyz' or 'tms', affects tile numbering (TMS servers use inverse Y axis numbering)
	}
	
The `url` property is an unique identifier. That is, `add` and `remove` events will discriminate based on the `url` property.

Credits
-------

Most of the properties definitions come from [Leaflet](http://leaflet.cloudmade.com/reference.html#tilelayer-options).
