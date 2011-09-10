Feature source
==============

A Source, or feature source, is any object (usually a Module) that implements the following elements:

Methods
-------

### stream ###

Gets the current data set.

Events
------

### set ###

Must be fired when the data set is set to a new set of values.

Equivalent to firing `remove` with all the current values, then `add` with all the new ones. However, when firing `set`, those two other events must not be fired.

Optional (channel-specific) events
----------------------------------

Most of the channels will transmit sets of data; however, some will only carry unit streams. Those do not need implement the following events, but it is nonetheless much recommended to implement them whenever possible, for performance reasons.

### add ###

Must be fired when one or several data points are added to this data set.

Params: the added data points, encoded as specified by the channel definition

### remove ###

Must be fired when one or several data points are removed from this data set.

Params: the removed data points, encoded as specified by the channel definition

**Warning**: the passed data points may not have been `add`ed nor `set` previously! Prepare to handle this gracefully.
_This allows for more efficient chaining, by avoiding mandatory node caching and diffing._

Actual drawing
==============

Let your controller code bind your view updates to specific sources  :)

Simple example:
	// gis has been defined as a MooGIS subclass instance
	
	var markerSource = new MooGIS.Source.GeoJSON.Distant('http://example.com/geo.json');
	
	gis.addStream('geojson', markerSource);

More interesting example:
	// gis has been defined as a MooGIS subclass instance
	
	var source = new MooGIS.Source.GeoJSON.Distant('http://example.com/geo.json');
	var dimmer = new MooGIS.Filter.GeoJSON(source).setStyle({
		opacity: 0.6
	});
	var highlighter = new MooGIS.Filter.GeoJSON.Properties(dimmer, {
		"some key": "must match this value"
	}).setStyle({
		opacity: 1,
		color: 'red'
	});
	
	gis.addStream('geojson', dimmer);
	gis.addStream('geojson', highlighter);
	

Data types & Channels
=====================

A data type is transmitted over a _channel_. A "channel" is no object, but an architectural concept: streams of data pass through them, from a source and through filters down to the view.

This is why calls to `view.addStream` must precise which channel they want to use: so the view actually knows how to handle the stream.

To work properly, all elements along the stream must know how to handle the data type that's passed around. They are therefore namespaced as defined in the Filter manual, and it is your responsibility to add only nodes that share the same channel when building your stream.

Features
--------

Features are encoded in GeoJSON, which allows you to define points (markers), polylines, and [many other things](http://geojson.org/geojson-spec.html#geometry-objects).

Other types
-----------

GeoJSON allows transmitting most of what you'd want to display on a map.

However, in some cases, you might want your filters to handle different kinds of data. For example, tile layers that you want your user to be able to change (satellite / terrain view switch). Here, the data that would get fed to the view is the URL pattern for the tiles.

In such a case, simply use a Source and Filters that handle URL data instead of GeoJSON!
