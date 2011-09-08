Feature source
==============

A Source, or feature source, is any object (usually a Module) that implements the following elements:

Methods
-------

### features ###

Gets the current set of features.

#### Implementation tip ####

Since you'll usually be working with big amounts of data (that's a GIS, right?), for optimized memory usage, no need to cache the features (unless you do heavy calculation or know that your set won't change often). The goal of the Source implementation is to chain Filters through event calls, not that each node in the chain stores its current set.

Your Source's main behaviour should be to pass on `remove` events, and to filter `add` and `set` events with your own filter method. If `features()` is called and you did not cache features, simply call `features()` on your source, and filter it!
Determining which way to go (caching or calling your parent) is your Source's responsibility, depending on the data input size and the calculation complexity.

Events
------

### add ###

Must be fired when a feature, or series of features, are added to this set of features.

Params: feature array, the added features. Possibly with length = 1, but always an array.

### remove ###

Must be fired when a feature, or series of features, are removed from this set of features.

Params: feature array, the removed features. Possibly with length = 1, but always an array.

**Warning**: the passed features may not have been `add`ed nor `set` previously! Prepare to handle this gracefully.
This allows for more efficient chaining, by avoiding mandatory node caching and diffing.

### set ###

Must be fired when the set of features is set to a new set of values.

Equivalent to firing `remove` with all the current values, then `add` with all the new ones. However, when firing `set`, those two other events must not be fired.


Feature
=======

Features are encoded in GeoJSON, which allows you to define points (markers), polylines, and [many other things](http://geojson.org/geojson-spec.html#geometry-objects).


Actual drawing
==============

Let your controller code bind your view updates to specific sources  :)

Example:
	// gis has been defined as a MooGIS subclass instance
	
	var markerSource = new MooGIS.Group('markers', {
		title: 'Markers'
	});
	
	markerSource.add(new MooGIS.Source.GeoJSON('http://example.com/geo.json'));
	
	gis.addStream(markerSource);
	

Other types of data
===================

GeoJSON allows transmitting most of what you'd want to display on a map.

However, in some cases, you might want your filters to handle different kinds of data. For example, tile layers that you want your user to be able to change (satellite / terrain view switch). Here, the data that would get fed to the view is the URL pattern for the tiles.

In such a case, simply use a Source and Filters that handle URL data instead of GeoJSON!
