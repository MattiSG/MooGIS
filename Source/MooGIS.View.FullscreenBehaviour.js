/*
---
description: Example of clever view event attachment to add a fullscreen toggle to a MooGIS.View.

license: to be determined

authors:
- Matti Schneider-Ghibaudo

requires:
- core/1.3: '*'
- MooGIS.View

provides: [MooGIS.View.FullscreenBehaviour]

version: 0.0.1

---
*/

/**Usage: `MooGIS.View.FullscreenBehaviour(myView [, options])`. No use of the `new` operator, you're attaching a behaviour to an instance.
*
*Adds the following events to the ones triggered by the attached `MooGIS.View`:
* - `enterFullscreen`: when the view enters fullscreen mode
* - `exitFullscreen`: when the view exits fullscreen mode
*
*Adds the following methods and fields to `MooGIS.View`:
* - `isFullscreen`: `Boolean`
* - `fullscreenButton`: `Element`
* - `toggleFullscreen()`
* - `enterFullscreen()`
* - `exitFullscreen()`
*
*@returns	Element	the fullscreen toggle button
*/
MooGIS.View.FullscreenBehaviour = function attachFullscreenBehaviour(view, options) {
/**********OPTIONS SETUP**********/
	options = Object.merge({
		/**Attribute for the toggle button.
		*/
		ID: 'fullscreen',
		/**CSS class to be added to the view container to actually toggle the fullscreen behaviour.
		*/
		'class': 'fullscreen',
		/**Go full screen immediately?
		*/
		onLoad: false
	}, options);
	
		
/**********IMPLEMENTING BEHAVIOUR IN VIEW**********/
/*We don't implement in the class because this behaviour is per-instance.
*/
	view.isFullscreen = false;
	
	/**Listens to the escape key to exit fullscreen
	*@private
	*/
	function exitFullscreenOnEscape(event) {
		if (event.key == 'esc') {
			view.exitFullscreen();
			Event.preventDefault(event);
		}	
	}
		
	view.toggleFullscreen = function toggleFullscreen() {
		var evt = 'enter', // ok, that's maybe a bit too much of optimization, but still… setting it now avoids a useless attribution later on. Same with using toggle() as the main logic instead of as a redirection to exit() and enter(): factors more code in.
			action = 'add';
		
		if (isFullscreen) {
			evt = 'exit';
			action = 'remove';
		}
		
		this.fireEvent(evt + 'Fullscreen');
		this.container()[action + 'Class'](options.class);
		window[action + 'Event']('keypress', exitFullscreenOnEscape)
		this.isFullscreen = ! this.isFullscreen;
	}
		
	view.exitFullscreen = function exitFullscreen() {
		if (this.isFullscreen)
			this.toggleFullscreen();
	};
		
	view.enterFullscreen = function enterFullscreen() {
		if (! this.isFullscreen)
			this.toggleFullscreen();
	};
	
	
/**********CREATING TOGGLER BUTTON**********/
	return view.fullscreenButton = new Element('div', {
		id: options.ID,
		events: {
			click: view.toggleFullscreen.bind(view)
		}
	});
}
