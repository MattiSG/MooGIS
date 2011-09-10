Filters
=======

A Filter provides ways to manipulate a stream. It is bound to a specific channel, and may add presentation data to the stream, in a way that is specific for each channel.

A Filter behaves as a Source. That is, it implements the same methods and events.

Namespaces
----------

Filters are namespaced by channel: `MooGIS.Filter.<Channel>.<Implementation>`.

Implementation
--------------

Usually, implementing a filter is just a matter of extending the proper `Filter.<Channel>` class, and specifying your `accepts` method.

Caching
-------

Since you'll usually be working with big amounts of data (that's a GIS, right?), for optimized memory usage, no need to cache the data (unless you do heavy calculation or know that your set won't change often). The goal of the Source implementation is to chain Filters through event calls, not that each node in the chain stores its current set.

Your Filter's main behaviour should be to pass on `remove` events, and to filter `add` and `set` events with your own filter method. If `stream()` is called and you did not cache features, simply call `stream()` on your source, and filter it!
Determining which way to go (caching or calling your parent) is your Source's responsibility, depending on the data input size and the calculation complexity.

