define([
    'jquery',
    'underscore',
    'dropdownDialog',
    'mage/template',
    'mage/smart-keyboard-handler',
    'mage/translate',
    'priceUtils',
    'jquery-ui-modules/widget',
    'jquery/jquery.parsequery',
    'mage/validation/validation',
    'jquery/ui'
], function($, _, dropdownDialog, mageTemplate, keyboardHandler, $t, priceUtils) {
    'use strict';

    var swatchRendererMixin = {
        _init: function() {
            // Don't render the same set of swatches twice
            if ($(this.element).attr('data-rendered')) {
                return;
            }
            $(this.element).attr('data-rendered', true);

            if (_.isEmpty(this.options.jsonConfig.images)) {
                this.options.useAjax = true;
                // creates debounced variant of _LoadProductMedia()
                // to use it in events handlers instead of _LoadProductMedia()
                this._debouncedLoadProductMedia = _.debounce(this._LoadProductMedia.bind(this), 500);
            }

            if (this.options.jsonConfig !== '' && this.options.jsonSwatchConfig !== '') {
                // store unsorted attributes
                this.options.jsonConfig.mappedAttributes = _.clone(this.options.jsonConfig.attributes);
                this._sortAttributes();
                this._RenderControls();
                this._setPreSelectedGallery();
                $(this.element).trigger('swatch.initialized');
            } else {
                console.log('SwatchRenderer: No input data received');
            }
            this.options.tierPriceTemplate = $(this.options.tierPriceTemplateSelector).html();
            $('.options-of-colors').dropdownDialog({
                "appendTo": "[data-block=dropdown]",
                "triggerTarget":"[data-trigger=trigger]",
                "timeout": 2000,
                "closeOnMouseLeave": false,
                "closeOnEscape": true,
                "autoOpen": false,
                "triggerClass": "active",
                "parentClass": "active",
                "buttons": []
            });
            $('.swatch-option').on('click', function() {
                $('.options-of-colors').dropdownDialog('close');
            });
        },

        _RenderSwatchOptions: function (config, controlId) {
            var optionConfig = this.options.jsonSwatchConfig[config.id],
                optionClass = this.options.classes.optionClass,
                sizeConfig = this.options.jsonSwatchImageSizeConfig,
                moreLimit = parseInt(this.options.numberToShow, 10),
                moreClass = this.options.classes.moreButton,
                moreText = this.options.moreButtonText,
                countAttributes = 0,
                html = '';

            if (!this.options.jsonSwatchConfig.hasOwnProperty(config.id)) {
                return '';
            }

            $.each(config.options, function (index) {
                var id,
                    type,
                    value,
                    thumb,
                    label,
                    width,
                    height,
                    attr,
                    swatchImageWidth,
                    swatchImageHeight;

                if (!optionConfig.hasOwnProperty(this.id)) {
                    return '';
                }

                // Add more button
                if (moreLimit === countAttributes++) {
                    html += '<a href="#" class="' + moreClass + '"><span>' + moreText + '</span></a>';
                }

                id = this.id;
                type = parseInt(optionConfig[id].type, 10);
                value = optionConfig[id].hasOwnProperty('value') ?
                    $('<i></i>').text(optionConfig[id].value).html() : '';
                thumb = optionConfig[id].hasOwnProperty('thumb') ? optionConfig[id].thumb : '';
                width = _.has(sizeConfig, 'swatchThumb') ? sizeConfig.swatchThumb.width : 110;
                height = _.has(sizeConfig, 'swatchThumb') ? sizeConfig.swatchThumb.height : 90;
                label = this.label ? $('<i></i>').text(this.label).html() : '';
                attr =
                    ' id="' + controlId + '-item-' + id + '"' +
                    ' index="' + index + '"' +
                    ' aria-checked="false"' +
                    ' aria-describedby="' + controlId + '"' +
                    ' tabindex="0"' +
                    ' option-type="' + type + '"' +
                    ' option-id="' + id + '"' +
                    ' option-label="' + label + '"' +
                    ' aria-label="' + label + '"' +
                    ' option-tooltip-thumb="' + thumb + '"' +
                    ' option-tooltip-value="' + value + '"' +
                    ' role="option"' +
                    ' thumb-width="' + width + '"' +
                    ' thumb-height="' + height + '"';

                swatchImageWidth = _.has(sizeConfig, 'swatchImage') ? sizeConfig.swatchImage.width : 30;
                swatchImageHeight = _.has(sizeConfig, 'swatchImage') ? sizeConfig.swatchImage.height : 20;

                if (!this.hasOwnProperty('products') || this.products.length <= 0) {
                    attr += ' option-empty="true"';
                }

                if (type === 0) {
                    // Text
                    html += '<div class="' + optionClass + ' text" ' + attr + '>' + (value ? value : label) +
                        '</div>';
                } else if (type === 1) {
                    // Color
                    html += '<div class="' + optionClass + ' color" ' + attr +
                        ' style="height:auto; display:flex; justify-content: space-between; padding:10px; width:100px;">' + '' +
                        '<div style="width:20px;height:20px; background: ' + value +
                        ' no-repeat center; background-size: initial; border:1px solid grey"></div>' + label + '</div>';
                } else if (type === 2) {
                    // Image
                    html += '<div class="' + optionClass + ' image" ' + attr +
                        ' style="background: url(' + value + ') no-repeat center; background-size: initial;width:' +
                        swatchImageWidth + 'px; height:' + swatchImageHeight + 'px">' + '' +
                        '</div>';
                } else if (type === 3) {
                    // Clear
                    html += '<div class="' + optionClass + '" ' + attr + '></div>';
                } else {
                    // Default
                    html += '<div class="' + optionClass + '" ' + attr + '>' + label + '</div>';
                }
            });
            if (config.code === 'color') {
                html = '<div data-block="dropdown" class="options-of-colors-wrapper">\n' +
                    '    <button type="button" class="action" data-trigger="trigger">\n' +
                    '        <span>Choose Color</span>\n' +
                    '    </button>\n' +
                    '</div>\n' +
                    '<div class="options-of-colors">\n' +
                    '    <div id="options-of-colors-content-wrapper" style="display: flex; flex-direction: column;">'.concat(html);

                html = html.concat('</div></div>');
            }

            return html;
        }
    }

    return function(targetWidget) {
        $.widget('mage.SwatchRenderer', targetWidget, swatchRendererMixin);

        return $.mage.SwatchRenderer;
    };
});
