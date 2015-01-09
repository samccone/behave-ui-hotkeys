var Marionette = require('backbone.marionette'),
    Backbone = require('backbone'),
    _ = require('underscore'),
    Hotkeys = require('../../src/behave-ui-hotkeys'),
    View;

View = Marionette.ItemView.extend({
    template: _.template('<h1>Hotkeys Behavior</h1>'),
    model: new Backbone.Model(),
    behaviors: {
        Hotkeys: {
            behaviorClass: Hotkeys,
            hotkeys: {
                 'delete': 'destroy',
                 'ctrl:cmd:s': 'save',
                 'ctrl:o': 'openFilePicker'
            }
        }
    },
    save: function() { this.model.save(); },
    openFilePicker: function(e) { e.preventDefault(); }
});

describe('Hotkeys Behavior', function() {
    var behavior;

    beforeEach(function() {
        this.view = new View({ model: new Backbone.Model() });
        behavior = this.view._behaviors[0];
    });

    it('has a `hotkeys` property that is a hash of hotkeys and correspsonding view methods',
            function() {

        expect(behavior.options.hotkeys).toBeDefined();
        expect(_.isObject(behavior.options.hotkeys)).toBeTruthy();
    });

    it('has a `_buildHotkeyCache` method that is called on initialize',
            function() {

        expect(behavior._buildHotkeyCache).toBeDefined();
    });

    describe('the `_buildHotkeyCache` method', function() {
        var expected;

        beforeEach(function() {
            expected = {
                hotkey: 'ctrl:cmd:s',
                method: 'save',
                ctrl: true,
                cmd: true,
                shift: false,
                alt: false,
                code: 83
            };
        });

        it('will create a `hotkeys` property that stores all the hotkeys', function() {
            expect(behavior.hotkeys).toBeDefined();
            expect(_.isArray(behavior.hotkeys)).toBeTruthy();
            expect(behavior.hotkeys[1]).toEqual(expected);
        });
    });

    it('has a `_processHotkeys` method that is called on it\'s view\'s keypress event',
            function() {

        expect(behavior._processHotkeys).toBeDefined();
    });

    describe('the `_processHotkeys` method', function() {
        var evt;

        beforeEach(function() {
            evt = {
                which: 83,
                metaKey: true,
                ctrlKey: true,
                altKey: false,
                shiftKey: false
            };
        });

        it('will trigger a view event who\'s namespace matches the hotkey combo',
                function() {

            spyOn(this.view, 'trigger');
            spyOn(this.view.model, 'save');
            behavior._processHotkeys(evt);
            expect(this.view.trigger).toHaveBeenCalledWith('hotkey:ctrl:cmd:s');
        });

        it('will call a view method if one was specified in the hash, and pass the in the event',
                function() {

            spyOn(this.view, 'save');
            spyOn(this.view.model, 'save');
            behavior._processHotkeys(evt);
            expect(this.view.save).toHaveBeenCalledWith(evt);
        });
    });
});
