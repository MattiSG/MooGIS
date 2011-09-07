Feature source
==============

A Source, or feature source, is any object (usually a Module) that implements the `features()` method and fires the following events:

features
--------

Gets the current set of features.

### Implementation tip ###

Since you'll usually be working with big amounts of data (that's a GIS, right?), for optimized memory usage, no need to cache the features (unless you do heavy calculation or know that your set won't change often). The goal of the Source implementation is to chain Filters through event calls, not that each node in the chain stores its current set.

Your Source's main behaviour should be to pass on `remove` events, and to filter `add` and `set` events with your own filter method. If `features()` is called and you did not cache features, simply call `features()` on your source, and filter it!
Determining which way to go (caching or calling your parent) is your Source's responsibility, depending on the data input size and the calculation complexity.

add
---

Must be fired when a feature, or series of features, are added to this set of features.

Params: feature array, the added features. Possibly with length = 1, but always an array.

remove
------

Must be fired when a feature, or series of features, are removed from this set of features.

Params: feature array, the removed features. Possibly with length = 1, but always an array.

**Warning**: the passed features may not have been `add`ed nor `set` previously! Prepare to handle this gracefully.
This allows for more efficient chaining, by avoiding mandatory node caching.

set
---

Must be fired when the set of features is set to a new set of values.

Equivalent to firing `remove` with all the current values, then `add` with all the new ones. However, when firing `set`, those two other events must not be fired.


Feature
=======

What exactly is a feature is to be defined by Modules. The common understanding is a marker, or point, on the map; however, it could as well be a polyline, a vector, an URL…

Then how can I know which feature I'm getting?!
-----------------------------------------------

Let your controller code bind your view updates to specific sources  :)

Example:
	// view has been defined as a MooGIS.View subclass instance
	
	var markerSource = new MooGIS.Group('markers', {
		title: 'Markers'
	});
	
	markerSource.add(new MooGIS.Source.GeoJSON('http://example.com/geo.json'));
	
	markerSource.addEvents({
		add: view.addFeatures.bind(view),
		remove: view.removeFeatures.bind(view),
		set: view.setFeatures.bind(view)
	});
	