Channels & Data types
=====================

A data type is transmitted over a _channel_. A "channel" is no object, but an architectural concept: streams of data pass through them, from a source and through filters down to the view.

This is why calls to `view.addStream` must precise which channel they want to use: so the view actually knows how to handle the stream.

To work properly, all elements along the stream must know how to handle the data type that's passed around. They are therefore namespaced as defined in the Filter manual, and it is your responsibility to add only nodes that share the same channel when building your stream.

Naming
------

Channels are **always** referred to in a lowercase, capitalized fashion. I.e., write "Geojson", **not** "GeoJSON".

This is for easy automatic channel-to-namespace mapping. I like [CoC](http://en.wikipedia.org/wiki/Convention_over_configuration)  :D

Implementation
--------------

Usually, implementing a filter is just a matter of extending the proper `<Type>` class (i.e. `Filter`, `Source`…), and specifying a `filter` method to define how the `accepts` method will be applied to data points.
