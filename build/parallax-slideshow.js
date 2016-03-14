/* globals $, Parallax */

;(function(window, document, $, Parallax) {

    // Strict Mode
    'use strict';

    var NAME = 'ParallaxSlideshow';
    var DEFAULTS = {
        name: 'parallax-slideshow',
        rateo: 0.5, // aspect rateo of height/width,
        parallaxOptions: {
            clipRelativeInput: true,
            scalarX: 3,
            scalarY: 3
        }
    };

    function ParallaxSlideshow($container, options) {
        this.$container = $container;

        // inject default options and user options inside the scope
        this.extend(this, DEFAULTS, options);

        // define initial props
        this.props = {
            activeBlock: 0,
            navs: $(),
            blocks: $()
        };

        // initialise the plugin
        this.init();

    }

    ParallaxSlideshow.prototype.generateLayer = function(layer) {
        var $layer = $('<li/>', {
            class: this.name + '__layer layer',
            'data-depth': layer.depth
        });
        if (layer.url) {
            var $img = $('<img/>', {
                class: this.name + '__img',
                src: layer.url
            });
            $layer.append($img);
        } else if (layer.element && layer.element.length) {
            $layer.append(layer.element.clone());
        }
        return $layer;
    };

    ParallaxSlideshow.prototype.generateBlock = function(block, index) {
        var _this = this;

        var $block = $('<div/>', {
            class: this.name + '__block',
            'data-id': index
        });

        block.forEach(function(layer) {
            _this.generateLayer(layer).appendTo($block);
        });

        $block.appendTo(this.$container);
    };

    ParallaxSlideshow.prototype.generateNav = function() {
        var _this = this;
        if (this.blocks.length < 2) {
            return;
        }

        var $nav = $('<ul/>', {
            class: this.name + '__nav'
        });
        this.blocks.forEach(function(block, index) {
            var $li = $('<li/>', {
                class: _this.name + '__nav-link',
                'data-to': index
            });
            $li.on('click', function() {
                _this.activateBlock(index);
            });
            $li.appendTo($nav);
        });
        $nav.appendTo(this.$container);
        this.props.navs = $nav.find('li');
    };

    ParallaxSlideshow.prototype.activateBlock = function(index) {
        var $block = this.props.blocks.filter('[data-id="' + index + '"]');

        this.props.navs.removeClass(this.name + '__nav-link--active');
        this.props.navs.filter('[data-to="' + index + '"]').addClass(this.name + '__nav-link--active');
        this.props.blocks.removeClass(this.name + '__block--active');
        this.props.blocks.off('mousemove');

        $block.addClass(this.name + '__block--active');
        this.parallax($block);
    };

    ParallaxSlideshow.prototype.parallax = function($block) {
        if (this.props.parallax) this.props.parallax.disable();
        this.props.parallax = new Parallax($block[0], this.parallaxOptions);
    };

    ParallaxSlideshow.prototype.updateHeight = function() {
        this.props.width = this.$container.width();
        this.props.height = this.props.width * this.rateo;
        this.$container.css('height', this.props.height);
        this.$container.css('font-size', this.props.height/ 20 + 'px');
    };

    ParallaxSlideshow.prototype.init = function() {
        // add class to container
        this.$container.addClass(this.name);
        // update height of the container to respect the given rateo
        this.updateHeightBound = this.updateHeight.bind(this);
        // setup event listener to update height on page resize
        $(window).on('resize', this.updateHeightBound).trigger('resize');
        // generate blocks
        this.blocks.forEach(this.generateBlock.bind(this));
        // cache blocks inside the props object to make it easier to access them later
        this.props.blocks = this.$container.find('.' + this.name + '__block');
        // generate the navigator (if there are more than 1 blocks)
        this.generateNav();
        // activate the first block
        this.activateBlock(this.props.activeBlock);
    };

    ParallaxSlideshow.prototype.destroy = function() {
        $(window).off('resize', this.updateHeightBound);
        this.$container.empty();
    };

    // helpers
    ParallaxSlideshow.prototype.extend = function() {
        if (arguments.length > 1) {
            var master = arguments[0];
            for (var i = 1, l = arguments.length; i < l; i++) {
                var object = arguments[i];
                for (var key in object) {
                    master[key] = object[key];
                }
            }
        }
    };

    window[NAME] = ParallaxSlideshow;
})(window, document, $, Parallax);
