MooGIS
======

A [MooTools](http://mootools.net)- and [Leaflet](http://leaflet.cloudmade.com)-based GIS (Geographical Information System).

Goals
-----

### Primary ###

Allow you to analyse many geographical points ("features" in geo-speak) based on their associated properties.

"Analysis" means:
- statistical analysis (mean, repartition… of properties values) of selected features;
- selection of input sets;
- graphical modification of these sets according to arbitrary filters.

### Secondary ###

- high code quality;
- easy extensibility.

Target browsers
---------------

**Only HTML5 and CSS3 compliant browsers.**

I.e. Chrome, Firefox ≥ 6, Safari ≥ 5, Mobile WebKit ≥ 3.

Opera is not a test target, but occasional compatibility checks might be done, and easy fixes may be applied.

If IE is a must for you, you might be interested in [Google Chrome Frame](http://www.html5rocks.com/en/tutorials/google-chrome-frame/).

That being said, Leaflet and MooTools both support the full [A-grade browsers](http://yuilibrary.com/yui/docs/tutorials/gbs/) range, so compatibility with those will be _passively_ sought (as in, we won't let commas at the end of hashes).

License
-------

To be determined.

**THIS VERSION IS PRE-RELEASE AND SHOULD NOT BE USED, DEPLOYED, NOR DISCLOSED ANYWHERE WITHOUT PRIOR WRITTEN CONSENT FROM THE AUTHOR.**

Coding Style, Philosophy & Implemented standards
------------------------------------------------

### Repo management ###

- [SemVer](http://semver.org), Semantic Versioning.
- [README-Driven Development](http://tom.preston-werner.com/2010/08/23/readme-driven-development.html). Definitely applies to branches too.
- `master` branch should always be deployable; however, only tagged versions are guaranteed stable.
- one branch per functionality. Once functionality is implemented and tested, it is merged into `master`, and the branch is **deleted**.
- code is considered valid only once it has been **documented** and **browser-tested**. Automated tests are not necessary for UI code (maintenance cost too high).
- passed browser testing should always be committed. Even if there were no changes. Just do a commit, if necessary with `--allow-empty`, that says "Tested with browser X", before merging back to `master`.

### File hierarchy ###

- [MooTools Forge-compatible](http://mootools.net/forge/how-to-add).

### Coding style ####

- OOP. Much of it. Hence MooTools. And closure love.
- Follow Google's [JavaScript Style Guide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml), except for:
	* _Method definitions_: a method will be declared as `myObject.myMethod = function myMethod() { … }` for easier debugging.
	* _Visibility (private and protected fields)_: no use of underscore at the end of private methods; use of underscore at the beginning of the method name.
- scope opening brackets are **on the same line** as the control element that opens the scope; scope closing brackets are on their own line, except when in an `if / else if / else` construct, where we want to achieve a `… } else { …` look.

### Comments ###

- star-bang comments (`/*!`) are used in short file headers to prevent [compiler removal](https://github.com/yui/yuicompressor/blob/master/doc/README#L116). Used for component name, authors, and backlink.
- as a result of the [Forge compatibility](http://mootools.net/forge/how-to-add#yamlnotes), a YAML-formatted header comment containing metadata.
- **[Javadoc](http://www.oracle.com/technetwork/java/javase/documentation/index-137868.html)**-style comments **with Markdown** instead of HTML. That seems to be [Markdown-doclet](http://www.richardnichols.net/2009/06/markdown-doclet-for-javadoc/)-parsable, but the main goal is to have the most usable documentation in the code itself. Public documentation elements (i.e. parts that provide details about hash keys, methods…) should be in double-star comments (`/**`).
- inline comments (`//`) and single-star comments (`/*`) comment a specific part of the implementation, and do not give any public-interest information.

### Evils ###

- code duplication;
- hardcoded stuff;
- coupling.

Basically, everything that will end up biting you bad later on.

Credits
-------

### Authors ###
- [Matti Schneider-Ghibaudo](http://mattischneider.fr)

### Used projects ###
- [MooTools](http://mootools.net)
- [Leaflet](http://leaflet.cloudmade.com)
