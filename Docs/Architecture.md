MooGIS architecture
===================

Overview
--------

MVC is used for the main control loop. Communication between components is as much event-driven as possible.

Standard steps:
- create a `MooGIS.View.Leaflet`. Will handle all geographical display of information.
- create a `MooGIS.Group` instance that will feed your view through the controller. It will be referred to as the "blessed group", the one whose output is rendered. Indeed, groups may be chained to create complex filters.
- create a `MooGIS.Controller` with the previously-defined view and source elements. Will handle all layout / renderer registration / save & load commands.
- optionally, use a serialized input through `controller.load(jsonEncodedData)`.
- create whatever complex hierarchy of groups, filters and renderers you want, and watch the magic as events invisibly handle all filtering and chaining.

Modules and Groups
------------------

A Group contains Modules.

Modules can be either _input modules_ ("Filters"), or _output modules_ ("Renderers").

Filters can be chained together in a Group. Each Filter, and each Group, can be a source of features to be displayed on the map.

Renderers can subscribe to a Source, and be updated every time a feature is added or removed from that Source, therefore giving realtime information about the currently active features.

Namespaces
----------

Root namespace: `MooGIS`.
- `MooGIS.View` contains all view classes.
- `MooGIS.Model` contains all model classes (thank you captain obvious!)
	* `MooGIS.Model.Source` is the superclass of any class that wants to be used as a source of features to be displayed on a view. A [composite](http://en.wikipedia.org/wiki/Composite_pattern) pattern is used here, so that filtered and chained sources are still `Source` instances themselves.
- `MooGIS.Controller` is the main controller class, that will bind a `MooGIS.View.*` instance to a `MooGIS.Model.Source` instance and handle all filter chains.
- `MooGIS.Filter` is the namespace for all classes that define filters over a `Source`.
- `MooGIS.Renderer` is the namespace for all classes that define renderers over a `Source`.