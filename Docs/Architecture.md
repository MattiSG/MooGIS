MooGIS architecture
===================

Overview
--------

MVC is used for the main control loop. Communication between components is as much event-driven as possible.

Standard steps:
- create a `MooGIS.View.XXX`, `XXX` being your implementation, or one of the standard ones. Will handle all geographical display of information.
- create a `MooGIS.Group` instance that will feed your view through the controller. It will be referred to as the "blessed group", the one whose output is rendered. Indeed, groups may be chained to create complex filters.
- create a `MooGIS.Controller` with the previously-defined view and source elements. Will handle all layout / renderer registration / save & load commands.
- optionally, use a serialized input through `controller.load(jsonEncodedData)`.
- create whatever complex hierarchy of groups, filters and renderers you want, and watch the magic as events invisibly handle all filtering and chaining.

Views
-----

A class is called a "View" if it extends MooGIS.View.

It is a view of the entire GIS system (groups, filters and so on), and not only an abstraction of a map.

### Underlying map instance ###

A view embeds what is referred to an "underlying map instance", that is, the actual map object, depending on the API you chose. For example, with [Leaflet](http://leaflet.cloudmade.com), it will be an `L.Map`; with [Google Maps v3](http://code.google.com/intl/fr/apis/maps/documentation/javascript/reference.html), a `google.maps.Map`, and so on. This underlying instance is always accessible through `myView.getMap()`.

### API abstraction ###

Even though it might be tempting to, the Views will **not** try to abstract away their underlying instance.

#### But I want to!! ####

Well, then you're trying to recreate [Mapstraction](http://mapstraction.com/). If that's what you want, simply implement a View based on Mapstraction  :)

#### But… why not do it directly?! ####

The problem with trying to abstract away everything is that, in the end, you'll need _that_ API-specific feature, and you'll call it in one Module. From there on, your Module won't be generic anyway. And while the cost of re-implementing that feature for another API would be quite low (find the corresponding API call, if necessary by wrapping one helper function), creating an abstraction layer in View would have a very high cost (spot generic methods, create converter functions, implement it in View without crippling it with duplicate code… and making sure the abstraction layer is compatible with every single other API! Maintenance nightmare).

#### Well, I still really want to give it a try… ####

Great! Please make sure to do a pull request once you're done, that looks promising  :)

Simply extend `MooGIS.View` with your one-size-fits-all View!


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
- `MooGIS.View` contains all view classes.
- `MooGIS.Model` contains all model classes (thank you captain obvious!)
	* `MooGIS.Model.Source` is the superclass of any class that wants to be used as a source of features to be displayed on a view. A [composite](http://en.wikipedia.org/wiki/Composite_pattern) pattern is used here, so that filtered and chained sources are still `Source` instances themselves.
- `MooGIS.Controller` is the main controller class, that will bind a `MooGIS.View.*` instance to a `MooGIS.Model.Source` instance and handle all filter chains.
- `MooGIS.Filter` is the namespace for all classes that define filters over a `Source`.
- `MooGIS.Renderer` is the namespace for all classes that define renderers over a `Source`.