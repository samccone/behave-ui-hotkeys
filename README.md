# behave-ui-hotkeys
A Marionette Behavior that allows you to add hotkey functionality to any view.

## Usage:

```
npm install --save behave-ui-hotkeys
```

Then just require and use as you would any other behavior:

```
var Hotkeys = require('behave-ui-konami'),
    _ = require('underscore');

var View = Marionette.ItemView.extend({
    template: _.template('<h1>Hotkeys!!</h1>'),
    behaviors: {
        Hotkeys: {
            behaviorClass: Hotkeys,
            hotkeys: {
               'cmd:alt:y': 'viewMethod'
            }
        }
    },
    initialize: function() {
        this.on('hotkey:cmd:alt:y', function() {
            // hotkey fired!
        });
    },
    viewMethod: function(e) {
        // hotkey fired!
    }
});
```

NOTES:

 - You can use only one code (f1, 4, a, s, delete, pageup, etc), but as many helper keys (cmd, ctrl, alt, shift) as you would like
 - Codes are case insensitive, F1 will become f1, DELETE will become delete, etc...
 - If you specify a view method that does not exist, it will just call event
 - If you do not want to call a view method pass and empty string as the value, i.e.

```
hotkeys: {
    'ctrl:alt:o': 'open', // will fire event: 'hotkey:ctrl:alt:o', will call: this.view.open()
    'ctrl:alt:p': '' // will only fire event: 'hotkey:ctrl:alt:p', will not call any method
}
```

## Dev

To setup the dev environment just run `npm install`
You can then run `grunt watch` to automagically run tests and jshint

## Test

To run tests run either `npm test` or `grunt test`, former is an alias for the latter.

## Release History

- 0.0.1 - Initial Release
