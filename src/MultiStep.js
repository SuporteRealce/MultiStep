! function(root, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], function($) {
            return factory($, window, document);
        });
    } else if (typeof exports === 'object') {
        // CommonJS
        module.exports = function(root, $) {
            if (!root) {
                root = window;
            }
            if (!$) {
                $ = typeof window !== 'undefined' ? // jQuery's factory checks for a global window
                    require('jquery') :
                    require('jquery')(root);
            }
            return factory($, root, root.document);
        };
    } else {
        // Browser
        factory(jQuery, window, document);
    }
}(this, function($, w, d) {
    'use strict';

    var _multiModalClass = 'multi-step';
    var _modalHeaderClass = 'modal-header';
    var _modalStepsClass = 'modal-steps';
    var _stepClass = 'step';
    var defaults = {
        data: []
    };

    var multiStep = function($element, options) {
        var $this = this;
        this.id = null;
        this.element = $element;
        this.options = $.extend({}, defaults, options);
        this.destroy = function() {
            console.log('destroying ' + $this.id);
        }
        this.init();
    };

    function uuidv4() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        )
    }

    multiStep.prototype = {
        constructor: multiStep,
        init: function() {
            this._buildMultiStep();
        },
        update: function(options) {
            this.options = $.extend({}, defaults, options);
            this._rebuildData(this.options.data);
        },
        _buildMultiStep: function() {
            var $element = this.element;
            var id = $element.attr('id')
            if (!id || id.trim() == '') {
                id = uuidv4();
                $element.attr('id', id);
            }
            this.id = id;
            $element.addClass(_multiModalClass);
            var $header = $element.find(`.${_modalHeaderClass}`);
            this.header = $header;
            $header.append(`<div class="${_modalStepsClass}"></div>`);
            var $modalSteps = $header.find(`.${_modalStepsClass}`);
            this.modalSteps = $modalSteps;

        },
        _rebuildData: function(data) {
            if (data && data.length > 0) {
                var steps = '';
                this.data = data;
                this.steps = data.length;
                var theme = ['completed', 'skipped', 'current', '']
                for (var i in data) {
                    var currentStep = Number(i) + 1;
                    var stepLabel = data[i].label ? data[i].label : `Step ${currentStep}`;
                    steps += `<div class="${_stepClass} ${theme[i]}" data-step=${currentStep}><div class="dot"></div><label class="label">${stepLabel}</label></div>`;
                }

                this.modalSteps.html(steps);

            }
        }
    }



    $.fn.MultiStep = function(options, callback) {
        if (typeof options == 'object') {
            options = $.extend(true, {}, defaults, options);
        }
        this.each(function() {
            var $this = $(this);
            if (!$this.data('multiStep') && (options ? typeof options == 'object' : true)) {
                $this.data('multiStep', new multiStep($this, options));
            } else if ($this.data('multiStep')) {
                if (typeof options == 'string') {
                    var func = options;
                    var params = callback;
                    $this.data('multiStep')[func].call(params);
                } else {
                    $this.data('multiStep').update(options);
                }

            }


        });
        if (typeof callback == 'function') {
            callback.call(this.element);
        };
        return this;
    };
    $.fn.MultiStep.defaults = defaults;
    $.fn.MultiStep.multiStep = multiStep;


    $(document).ready(function() {
        $('.modal').MultiStep();
    });
});
$.fn.removeClasses = function(arr) {
    if (typeof arr == 'string') {
        arr = [arr];
    }
    for (var i = arr.length - 1; i >= 0; i--) {
        var x = arr[i];
        this.removeClass(x);
    }
    return this;
}
$.fn.addClasses = function(arr) {
    if (typeof arr == 'string') {
        arr = [arr];
    }
    for (var i = arr.length - 1; i >= 0; i--) {
        var x = arr[i];
        this.addClass(x);
    }
    return this;
}