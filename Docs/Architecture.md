MooGIS architecture
===================

Overview
--------

Standard steps:
- create a `MooGIS.XXX`, `XXX` being your implementation, or one of the standard ones. Will handle all display of information.
- create a `MooGIS.Source.GeoJSON` (or whichever Source subclass suits you best).
- create any number of instances of `MooGIS.Group` and `MooGIS.Filter` to feed your MooGIS.
- open channels in the MooGIS instance to feed it the features streams outputted by your filters: `myMooGis.addStream(someSource)`.
- create whatever complex hierarchy of groups, filters and renderers you want, register the ones you want to be user-accessible, and watch the magic as events invisibly handle all filtering and chaining!

Controller
----------

A class is called a "Controller" if it extends MooGIS. It is a Controller in the meaning of the MVC2 pattern.

It manages all views of the entire GIS system (groups, filters and so on), and not only the map.

View.Map
--------

A `MooGIS.View.Map` is an **interface** for actual maps API, such as Leaflet, Google Maps… It is **not** a full API abstraction (more details later). It merely allows you to display the feature streams by mapping the drawing primitives, nothing more.

### Underlying map instance ###

A `View.Map` embeds what is referred to an "underlying map instance", that is, the actual map object, depending on the API you chose. For example, with [Leaflet](http://leaflet.cloudmade.com), it will be an `L.Map`; with [Google Maps v3](http://code.google.com/intl/fr/apis/maps/documentation/javascript/reference.html), a `google.maps.Map`, and so on. This underlying instance is always accessible through `myView.map()`.

### API abstraction limits ###

Even though it might be tempting to, the Views will **not** try to abstract away their underlying instance.

#### But I want to!! ####

Well, then you're trying to recreate [Mapstraction](http://mapstraction.com/). If that's what you want, simply implement a View based on Mapstraction  :)

#### But… why not do it directly?! ####

The problem with trying to abstract away everything is that, in the end, you'll need _that_ API-specific feature, and you'll call it in one Module. From there on, your Module won't be generic anyway. And while the cost of re-implementing that feature for another API would be quite low (find the corresponding API call, if necessary by wrapping one helper function), creating an abstraction layer in View would have a very high cost (spot generic methods, create converter functions, implement it in View without crippling it with duplicate code… and making sure the abstraction layer is compatible with every single other API! Maintenance nightmare).

#### Well, I still really want to give it a try… ####

Great! Please make sure to do a pull request once you're done, that looks promising  :)

Simply extend `MooGIS.View.Map` with your one-size-fits-all View.Map!


Modules and Groups
------------------

A Group contains Modules.

Modules can be either _input modules_ ("Filters"), or _output modules_ ("Renderers").

Filters can be chained together in a Group. Each Filter, and each Group, can be a source of features to be displayed on the map.

Renderers can subscribe to a Source, and be updated every time a feature is added or removed from that Source, therefore giving realtime information about the currently active features.

### Genericity ###

Renderers and Filters may totally be API (read: View)-specific. It'd be preferable they were interchangeable but, as explained in the "API Abstraction" paragraph, it's usually unfortunately not worth the costs. Simply implement your Module for each API you need to support, and be done with it. If you can make it, abstract away the key component that talks to the map, and bundle it as a bridge.

Namespaces
----------

Root namespace: `MooGIS`.
- `MooGIS` is the main controller class, that will bind a `MooGIS.View.*` instance to a `MooGIS.Model.Source` instance and handle all filter chains.
- `MooGIS.View` contains all view classes.
- `MooGIS.Source` is the superclass of any class that wants to be used as a source of features to be displayed on a view. A [composite](http://en.wikipedia.org/wiki/Composite_pattern) pattern is used here, so that filtered and chained sources are still `Source` instances themselves.
- `MooGIS.Filter` is the namespace for all classes that define filters over a `Source`.
- `MooGIS.Renderer` is the namespace for all classes that define renderers over a `Source`.