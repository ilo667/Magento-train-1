var config = {
    map: {
        "*": {
            "imagezoomExtended": "js/extended-image-zoom-widget"
        }
    },
    config: {
        mixins: {
            'js/first-js-module': {
                'js/first-js-module-mixin': true
            },
            'js/first-js-ui-component': {
                'js/first-js-ui-component-mixin': true
            },
            'js/image-zoom-widget': {
                'js/image-zoom-widget-mixin': true
            },
            'Magento_Swatches/js/swatch-renderer': {
                'js/swatch-renderer-mixin': true
            }
        }
    }
};
