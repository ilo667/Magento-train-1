define([
    'uiComponent',
    'ko'
    ], function(Component, ko) {
    return Component.extend({
        defaults: {
            template: 'Magento_Cms/js-ui-component-mag-25'
        },

        /**
         * Init
         */
        initialize: function() {
            this._super();

            console.log('js-ui-component-mag-25');
        }
    });
});
