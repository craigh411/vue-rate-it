(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var inserted = exports.cache = {}

function noop () {}

exports.insert = function (css) {
  if (inserted[css]) return noop
  inserted[css] = true

  var elem = document.createElement('style')
  elem.setAttribute('type', 'text/css')

  if ('textContent' in elem) {
    elem.textContent = css
  } else {
    elem.styleSheet.cssText = css
  }

  document.getElementsByTagName('head')[0].appendChild(elem)
  return function () {
    document.getElementsByTagName('head')[0].removeChild(elem)
    inserted[css] = false
  }
}

},{}],2:[function(require,module,exports){
var Vue // late bind
var version
var map = window.__VUE_HOT_MAP__ = Object.create(null)
var installed = false
var isBrowserify = false
var initHookName = 'beforeCreate'

exports.install = function (vue, browserify) {
  if (installed) return
  installed = true

  Vue = vue.__esModule ? vue.default : vue
  version = Vue.version.split('.').map(Number)
  isBrowserify = browserify

  // compat with < 2.0.0-alpha.7
  if (Vue.config._lifecycleHooks.indexOf('init') > -1) {
    initHookName = 'init'
  }

  exports.compatible = version[0] >= 2
  if (!exports.compatible) {
    console.warn(
      '[HMR] You are using a version of vue-hot-reload-api that is ' +
      'only compatible with Vue.js core ^2.0.0.'
    )
    return
  }
}

/**
 * Create a record for a hot module, which keeps track of its constructor
 * and instances
 *
 * @param {String} id
 * @param {Object} options
 */

exports.createRecord = function (id, options) {
  var Ctor = null
  if (typeof options === 'function') {
    Ctor = options
    options = Ctor.options
  }
  makeOptionsHot(id, options)
  map[id] = {
    Ctor: Vue.extend(options),
    instances: []
  }
}

/**
 * Make a Component options object hot.
 *
 * @param {String} id
 * @param {Object} options
 */

function makeOptionsHot (id, options) {
  injectHook(options, initHookName, function () {
    map[id].instances.push(this)
  })
  injectHook(options, 'beforeDestroy', function () {
    var instances = map[id].instances
    instances.splice(instances.indexOf(this), 1)
  })
}

/**
 * Inject a hook to a hot reloadable component so that
 * we can keep track of it.
 *
 * @param {Object} options
 * @param {String} name
 * @param {Function} hook
 */

function injectHook (options, name, hook) {
  var existing = options[name]
  options[name] = existing
    ? Array.isArray(existing)
      ? existing.concat(hook)
      : [existing, hook]
    : [hook]
}

function tryWrap (fn) {
  return function (id, arg) {
    try { fn(id, arg) } catch (e) {
      console.error(e)
      console.warn('Something went wrong during Vue component hot-reload. Full reload required.')
    }
  }
}

exports.rerender = tryWrap(function (id, options) {
  var record = map[id]
  if (typeof options === 'function') {
    options = options.options
  }
  record.Ctor.options.render = options.render
  record.Ctor.options.staticRenderFns = options.staticRenderFns
  record.instances.slice().forEach(function (instance) {
    instance.$options.render = options.render
    instance.$options.staticRenderFns = options.staticRenderFns
    instance._staticTrees = [] // reset static trees
    instance.$forceUpdate()
  })
})

exports.reload = tryWrap(function (id, options) {
  if (typeof options === 'function') {
    options = options.options
  }
  makeOptionsHot(id, options)
  var record = map[id]
  if (version[1] < 2) {
    // preserve pre 2.2 behavior for global mixin handling
    record.Ctor.extendOptions = options
  }
  var newCtor = record.Ctor.super.extend(options)
  record.Ctor.options = newCtor.options
  record.Ctor.cid = newCtor.cid
  record.Ctor.prototype = newCtor.prototype
  if (newCtor.release) {
    // temporary global mixin strategy used in < 2.0.0-alpha.6
    newCtor.release()
  }
  record.instances.slice().forEach(function (instance) {
    if (instance.$vnode && instance.$vnode.context) {
      instance.$vnode.context.$forceUpdate()
    } else {
      console.warn('Root or manually mounted instance modified. Full reload required.')
    }
  })
})

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    props: {
        increment: {
            type: Number,
            default: 1
        },
        rating: {
            type: Number,
            default: 0
        },
        activeColor: {
            type: String,
            default: "#ffd055"
        },
        inactiveColor: {
            type: String,
            default: "#d8d8d8"
        },
        maxRating: {
            type: Number,
            default: 5
        },
        itemSize: {
            type: Number,
            default: 50
        },
        showRating: {
            type: Boolean,
            default: true
        },
        readOnly: {
            type: Boolean,
            default: false
        },
        textClass: {
            type: String,
            default: ""
        },
        inline: {
            type: Boolean,
            default: false
        },
        borderColor: {
            type: String,
            default: "#999"
        },
        borderWidth: {
            type: Number,
            default: 0
        },
        padding: {
            type: Number,
            default: 0
        }
    },
    created: function created() {
        this.step = this.increment * 100;
        this.currentRating = this.rating;
        this.selectedRating = this.rating;
        this.createRating();
    },

    methods: {
        setRating: function setRating($event, persist) {
            if (!this.readOnly) {
                var position = $event.position / 100;
                this.currentRating = ($event.id + position - 1).toFixed(2);
                this.currentRating = this.currentRating > this.maxRating ? this.maxRating : this.currentRating;
                this.createRating();
                if (persist) {
                    this.selectedRating = this.currentRating;
                    this.$emit('rating-selected', this.selectedRating);
                } else {
                    this.$emit('current-rating', this.currentRating);
                }
            }
        },
        resetRating: function resetRating() {
            if (!this.readOnly) {
                this.currentRating = this.selectedRating;
                this.createRating();
            }
        },
        createRating: function createRating() {
            this.round();
            for (var i = 0; i < this.maxRating; i++) {
                var level = 0;
                if (i < this.currentRating) {
                    level = this.currentRating - i > 1 ? 100 : (this.currentRating - i) * 100;
                }
                this.$set(this.fillLevel, i, Math.round(level));
            }
        },
        round: function round() {
            var inv = 1.0 / this.increment;
            this.currentRating = Math.ceil(this.currentRating * inv) / inv;
        }
    },
    watch: {
        rating: function rating(val) {
            this.currentRating = val;
            this.selectedRating = val;
            this.createRating();
        }
    },
    data: function data() {
        return {
            step: 0,
            fillLevel: [],
            currentRating: 0,
            selectedRating: 0
        };
    }
};

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    props: {
        fill: {
            type: Number,
            default: 0
        },
        size: {
            type: Number,
            default: 50
        },
        index: {
            type: Number,
            required: true
        },
        activeColor: {
            type: String,
            required: true
        },
        inactiveColor: {
            type: String,
            required: true
        },
        borderColor: {
            type: String,
            default: "#999"
        },
        borderWidth: {
            type: Number,
            default: 0
        },
        padding: {
            type: Number,
            default: 0
        }
    },
    created: function created() {
        this.calculatePoints;
        this.grad = Math.random().toString(36).substring(7);
    },

    computed: {
        calculatePoints: function calculatePoints() {
            var _this = this;

            this.points = this.points.map(function (point) {
                return _this.size / _this.base * point + _this.borderWidth * 1.5;
            });
        },
        pointsToString: function pointsToString() {
            return this.points.join(',');
        },
        getGradId: function getGradId() {
            return 'url(#' + this.grad + ')';
        },
        getSize: function getSize() {
            return parseInt(this.size) + parseInt(this.borderWidth * 3) + this.padding;
        },
        getFill: function getFill() {
            return this.fill + "%";
        }
    },
    methods: {
        mouseMoving: function mouseMoving($event) {
            this.$emit('mouse-move', {
                event: $event,
                position: this.getPosition($event),
                id: this.index
            });
        },
        getPosition: function getPosition($event) {
            // calculate position in percentage.
            var width = 92 / 100 * this.size;
            var position = Math.round(100 / width * $event.offsetX);
            return position > 100 ? 100 : position;
        },
        selected: function selected($event) {
            this.$emit('selected', {
                id: this.index,
                position: this.getPosition($event)
            });
        }
    },
    data: function data() {
        return {
            points: [],
            grad: '',
            base: 50
        };
    }
};

},{}],5:[function(require,module,exports){
(function (global){
var __vueify_style_dispose__ = require("vueify/lib/insert-css").insert(".rating-item[data-v-4109320e] {\r\n    display: inline-block;\r\n}\r\n.pointer[data-v-4109320e] {\r\n    cursor: pointer;\r\n}\r\n.rating[data-v-4109320e] {\r\n    display: flex;\r\n    align-items: center;\r\n}\r\n.inline[data-v-4109320e] {\r\n    display: inline-flex;\r\n}\r\n.rating-text[data-v-4109320e] {\r\n    margin-top: 7px;\r\n    margin-left: 7px;\r\n}")
;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
     value: true
});

var _vue = (typeof window !== "undefined" ? window['Vue'] : typeof global !== "undefined" ? global['Vue'] : null);

var _vue2 = _interopRequireDefault(_vue);

var _Rating = require('../mixins/Rating.js');

var _Rating2 = _interopRequireDefault(_Rating);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _vue2.default.extend({
     mixins: [_Rating2.default]
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:['rating', {inline: _vm.inline}]},[_c('div',{staticClass:"rating",on:{"mouseleave":_vm.resetRating}},[_vm._l((_vm.maxRating),function(n){return _c('span',{class:[{pointer: !_vm.readOnly }, 'rating-item']},[_c(_vm.type,{tag:"component",attrs:{"fill":_vm.fillLevel[n-1],"size":_vm.itemSize,"index":n,"step":_vm.step,"active-color":_vm.activeColor,"inactive-color":_vm.inactiveColor,"border-color":_vm.borderColor,"border-width":_vm.borderWidth,"padding":_vm.padding},on:{"selected":function($event){_vm.setRating($event, true)},"mouse-move":_vm.setRating}})],1)}),_vm._v(" "),(_vm.showRating)?_c('span',{class:['rating-text', _vm.textClass]},[_vm._v(" "+_vm._s(_vm.currentRating))]):_vm._e()],2)])}
__vue__options__.staticRenderFns = []
__vue__options__._scopeId = "data-v-4109320e"
if (module.hot) {(function () {  var hotAPI = require("vueify/node_modules/vue-hot-reload-api")
  hotAPI.install((typeof window !== "undefined" ? window['Vue'] : typeof global !== "undefined" ? global['Vue'] : null), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  module.hot.dispose(__vueify_style_dispose__)
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4109320e", __vue__options__)
  } else {
    hotAPI.rerender("data-v-4109320e", __vue__options__)
  }
})()}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../mixins/Rating.js":3,"vueify/lib/insert-css":1,"vueify/node_modules/vue-hot-reload-api":2}],6:[function(require,module,exports){
(function (global){
;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _BaseRating = require('../BaseRating.vue');

var _BaseRating2 = _interopRequireDefault(_BaseRating);

var _star = require('./star.vue');

var _star2 = _interopRequireDefault(_star);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _BaseRating2.default.extend({
    name: 'Star-Rating',
    components: {
        Star: _star2.default
    },
    data: function data() {
        return {
            type: 'star'
        };
    }
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (module.hot) {(function () {  var hotAPI = require("vueify/node_modules/vue-hot-reload-api")
  hotAPI.install((typeof window !== "undefined" ? window['Vue'] : typeof global !== "undefined" ? global['Vue'] : null), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1b09db0d", __vue__options__)
  } else {
    hotAPI.reload("data-v-1b09db0d", __vue__options__)
  }
})()}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../BaseRating.vue":5,"./star.vue":7,"vueify/node_modules/vue-hot-reload-api":2}],7:[function(require,module,exports){
(function (global){
;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Polygon = require('../../templates/Polygon.vue');

var _Polygon2 = _interopRequireDefault(_Polygon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Polygon2.default.extend({
    data: function data() {
        return {
            points: [19.8, 2.2, 6.6, 43.56, 39.6, 17.16, 0, 17.16, 33, 43.56],
            base: 43
        };
    }
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (module.hot) {(function () {  var hotAPI = require("vueify/node_modules/vue-hot-reload-api")
  hotAPI.install((typeof window !== "undefined" ? window['Vue'] : typeof global !== "undefined" ? global['Vue'] : null), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d432f8e6", __vue__options__)
  } else {
    hotAPI.reload("data-v-d432f8e6", __vue__options__)
  }
})()}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../../templates/Polygon.vue":9,"vueify/node_modules/vue-hot-reload-api":2}],8:[function(require,module,exports){
'use strict';

var _starRating = require('../raters/stars/star-rating.vue');

var _starRating2 = _interopRequireDefault(_starRating);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Vue.component('star-rating', _starRating2.default);

},{"../raters/stars/star-rating.vue":6}],9:[function(require,module,exports){
(function (global){
;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _vue = (typeof window !== "undefined" ? window['Vue'] : typeof global !== "undefined" ? global['Vue'] : null);

var _vue2 = _interopRequireDefault(_vue);

var _RatingItem = require('../mixins/RatingItem.js');

var _RatingItem2 = _interopRequireDefault(_RatingItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _vue2.default.extend({
	mixins: [_RatingItem2.default]
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{attrs:{"height":_vm.getSize,"width":_vm.getSize},on:{"mousemove":_vm.mouseMoving,"click":_vm.selected}},[_c('linearGradient',{attrs:{"id":_vm.grad,"x1":"0","x2":"100%","y1":"0","y2":"0"}},[_c('stop',{attrs:{"offset":_vm.getFill,"stop-color":_vm.activeColor}}),_vm._v(" "),_c('stop',{attrs:{"offset":_vm.getFill,"stop-color":_vm.inactiveColor}})],1),_vm._v(" "),_c('polygon',{attrs:{"points":_vm.pointsToString,"fill":_vm.getGradId,"stroke":_vm.borderColor,"stroke-width":_vm.borderWidth}}),_vm._v(" "),_c('polygon',{attrs:{"points":_vm.pointsToString,"fill":_vm.getGradId}})],1)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vueify/node_modules/vue-hot-reload-api")
  hotAPI.install((typeof window !== "undefined" ? window['Vue'] : typeof global !== "undefined" ? global['Vue'] : null), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3d10b208", __vue__options__)
  } else {
    hotAPI.reload("data-v-3d10b208", __vue__options__)
  }
})()}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../mixins/RatingItem.js":4,"vueify/node_modules/vue-hot-reload-api":2}]},{},[8])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvdnVlaWZ5L2xpYi9pbnNlcnQtY3NzLmpzIiwibm9kZV9tb2R1bGVzL3Z1ZWlmeS9ub2RlX21vZHVsZXMvdnVlLWhvdC1yZWxvYWQtYXBpL2luZGV4LmpzIiwic3JjXFxtaXhpbnNcXFJhdGluZy5qcyIsInNyY1xcbWl4aW5zXFxSYXRpbmdJdGVtLmpzIiwic3JjXFxyYXRlcnNcXHNyY1xccmF0ZXJzXFxCYXNlUmF0aW5nLnZ1ZT84YzJiZTBlYyIsInNyY1xccmF0ZXJzXFxzdGFyc1xcc3JjXFxyYXRlcnNcXHN0YXJzXFxzdGFyLXJhdGluZy52dWU/NWUxMjRkNzQiLCJzcmNcXHJhdGVyc1xcc3RhcnNcXHNyY1xccmF0ZXJzXFxzdGFyc1xcc3Rhci52dWU/NDM3NzdmZWMiLCJzcmNcXHJlZ1xcc3Rhci1yYXRpbmcuanMiLCJzcmNcXHRlbXBsYXRlc1xcc3JjXFx0ZW1wbGF0ZXNcXFBvbHlnb24udnVlPzVjZjJhYzUwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O2tCQ3hJZTtBQUNYLFdBQU87QUFDSCxtQkFBVztBQUNQLGtCQUFNLE1BREM7QUFFUCxxQkFBUztBQUZGLFNBRFI7QUFLSCxnQkFBUTtBQUNKLGtCQUFNLE1BREY7QUFFSixxQkFBUztBQUZMLFNBTEw7QUFTSCxxQkFBYTtBQUNULGtCQUFNLE1BREc7QUFFVCxxQkFBUztBQUZBLFNBVFY7QUFhSCx1QkFBZTtBQUNYLGtCQUFNLE1BREs7QUFFWCxxQkFBUztBQUZFLFNBYlo7QUFpQkgsbUJBQVc7QUFDUCxrQkFBTSxNQURDO0FBRVAscUJBQVM7QUFGRixTQWpCUjtBQXFCSCxrQkFBVTtBQUNOLGtCQUFNLE1BREE7QUFFTixxQkFBUztBQUZILFNBckJQO0FBeUJILG9CQUFZO0FBQ1Isa0JBQU0sT0FERTtBQUVSLHFCQUFTO0FBRkQsU0F6QlQ7QUE2Qkgsa0JBQVU7QUFDTixrQkFBTSxPQURBO0FBRU4scUJBQVM7QUFGSCxTQTdCUDtBQWlDSCxtQkFBVztBQUNQLGtCQUFNLE1BREM7QUFFUCxxQkFBUztBQUZGLFNBakNSO0FBcUNILGdCQUFRO0FBQ0osa0JBQU0sT0FERjtBQUVKLHFCQUFTO0FBRkwsU0FyQ0w7QUF5Q0gscUJBQWE7QUFDVCxrQkFBTSxNQURHO0FBRVQscUJBQVM7QUFGQSxTQXpDVjtBQTZDSCxxQkFBYTtBQUNULGtCQUFNLE1BREc7QUFFVCxxQkFBUztBQUZBLFNBN0NWO0FBaURILGlCQUFTO0FBQ0wsa0JBQU0sTUFERDtBQUVMLHFCQUFTO0FBRko7QUFqRE4sS0FESTtBQXVEWCxXQXZEVyxxQkF1REQ7QUFDTixhQUFLLElBQUwsR0FBWSxLQUFLLFNBQUwsR0FBaUIsR0FBN0I7QUFDQSxhQUFLLGFBQUwsR0FBcUIsS0FBSyxNQUExQjtBQUNBLGFBQUssY0FBTCxHQUFzQixLQUFLLE1BQTNCO0FBQ0EsYUFBSyxZQUFMO0FBQ0gsS0E1RFU7O0FBNkRYLGFBQVM7QUFDTCxpQkFESyxxQkFDSyxNQURMLEVBQ2EsT0FEYixFQUNzQjtBQUN2QixnQkFBSSxDQUFDLEtBQUssUUFBVixFQUFvQjtBQUNoQixvQkFBSSxXQUFXLE9BQU8sUUFBUCxHQUFrQixHQUFqQztBQUNBLHFCQUFLLGFBQUwsR0FBcUIsQ0FBRSxPQUFPLEVBQVAsR0FBWSxRQUFiLEdBQXlCLENBQTFCLEVBQTZCLE9BQTdCLENBQXFDLENBQXJDLENBQXJCO0FBQ0EscUJBQUssYUFBTCxHQUFzQixLQUFLLGFBQUwsR0FBcUIsS0FBSyxTQUEzQixHQUF3QyxLQUFLLFNBQTdDLEdBQXlELEtBQUssYUFBbkY7QUFDQSxxQkFBSyxZQUFMO0FBQ0Esb0JBQUksT0FBSixFQUFhO0FBQ1QseUJBQUssY0FBTCxHQUFzQixLQUFLLGFBQTNCO0FBQ0EseUJBQUssS0FBTCxDQUFXLGlCQUFYLEVBQThCLEtBQUssY0FBbkM7QUFDSCxpQkFIRCxNQUdPO0FBQ0gseUJBQUssS0FBTCxDQUFXLGdCQUFYLEVBQTZCLEtBQUssYUFBbEM7QUFDSDtBQUNKO0FBQ0osU0FkSTtBQWVMLG1CQWZLLHlCQWVTO0FBQ1YsZ0JBQUksQ0FBQyxLQUFLLFFBQVYsRUFBb0I7QUFDaEIscUJBQUssYUFBTCxHQUFxQixLQUFLLGNBQTFCO0FBQ0EscUJBQUssWUFBTDtBQUNIO0FBQ0osU0FwQkk7QUFxQkwsb0JBckJLLDBCQXFCVTtBQUNYLGlCQUFLLEtBQUw7QUFDQSxpQkFBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLEtBQUssU0FBekIsRUFBb0MsR0FBcEMsRUFBeUM7QUFDckMsb0JBQUksUUFBUSxDQUFaO0FBQ0Esb0JBQUksSUFBSSxLQUFLLGFBQWIsRUFBNEI7QUFDeEIsNEJBQVMsS0FBSyxhQUFMLEdBQXFCLENBQXJCLEdBQXlCLENBQTFCLEdBQStCLEdBQS9CLEdBQXFDLENBQUMsS0FBSyxhQUFMLEdBQXFCLENBQXRCLElBQTJCLEdBQXhFO0FBQ0g7QUFDRCxxQkFBSyxJQUFMLENBQVUsS0FBSyxTQUFmLEVBQTBCLENBQTFCLEVBQTZCLEtBQUssS0FBTCxDQUFXLEtBQVgsQ0FBN0I7QUFDSDtBQUNKLFNBOUJJO0FBK0JMLGFBL0JLLG1CQStCRztBQUNKLGdCQUFJLE1BQU0sTUFBTSxLQUFLLFNBQXJCO0FBQ0EsaUJBQUssYUFBTCxHQUFxQixLQUFLLElBQUwsQ0FBVSxLQUFLLGFBQUwsR0FBcUIsR0FBL0IsSUFBc0MsR0FBM0Q7QUFDSDtBQWxDSSxLQTdERTtBQWlHWCxXQUFPO0FBQ0gsY0FERyxrQkFDSSxHQURKLEVBQ1M7QUFDUixpQkFBSyxhQUFMLEdBQXFCLEdBQXJCO0FBQ0EsaUJBQUssY0FBTCxHQUFzQixHQUF0QjtBQUNBLGlCQUFLLFlBQUw7QUFDSDtBQUxFLEtBakdJO0FBd0dYLFFBeEdXLGtCQXdHSjtBQUNILGVBQU87QUFDSCxrQkFBTSxDQURIO0FBRUgsdUJBQVcsRUFGUjtBQUdILDJCQUFlLENBSFo7QUFJSCw0QkFBZ0I7QUFKYixTQUFQO0FBTUg7QUEvR1UsQzs7Ozs7Ozs7a0JDQUE7QUFDWCxXQUFPO0FBQ0gsY0FBTTtBQUNGLGtCQUFNLE1BREo7QUFFRixxQkFBUztBQUZQLFNBREg7QUFLSCxjQUFNO0FBQ0Ysa0JBQU0sTUFESjtBQUVGLHFCQUFTO0FBRlAsU0FMSDtBQVNILGVBQU87QUFDSCxrQkFBTSxNQURIO0FBRUgsc0JBQVU7QUFGUCxTQVRKO0FBYUgscUJBQWE7QUFDVCxrQkFBTSxNQURHO0FBRVQsc0JBQVU7QUFGRCxTQWJWO0FBaUJILHVCQUFlO0FBQ1gsa0JBQU0sTUFESztBQUVYLHNCQUFVO0FBRkMsU0FqQlo7QUFxQkgscUJBQWE7QUFDVCxrQkFBTSxNQURHO0FBRVQscUJBQVM7QUFGQSxTQXJCVjtBQXlCSCxxQkFBYTtBQUNULGtCQUFNLE1BREc7QUFFVCxxQkFBUztBQUZBLFNBekJWO0FBNkJILGlCQUFTO0FBQ0wsa0JBQU0sTUFERDtBQUVMLHFCQUFTO0FBRko7QUE3Qk4sS0FESTtBQW1DWCxXQW5DVyxxQkFtQ0Q7QUFDTixhQUFLLGVBQUw7QUFDQSxhQUFLLElBQUwsR0FBWSxLQUFLLE1BQUwsR0FBYyxRQUFkLENBQXVCLEVBQXZCLEVBQTJCLFNBQTNCLENBQXFDLENBQXJDLENBQVo7QUFDSCxLQXRDVTs7QUF1Q1gsY0FBVTtBQUNOLHVCQURNLDZCQUNZO0FBQUE7O0FBQ2QsaUJBQUssTUFBTCxHQUFjLEtBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0IsVUFBQyxLQUFELEVBQVc7QUFDckMsdUJBQVMsTUFBSyxJQUFMLEdBQVksTUFBSyxJQUFsQixHQUEwQixLQUEzQixHQUFxQyxNQUFLLFdBQUwsR0FBbUIsR0FBL0Q7QUFDSCxhQUZhLENBQWQ7QUFHSCxTQUxLO0FBTU4sc0JBTk0sNEJBTVc7QUFDYixtQkFBTyxLQUFLLE1BQUwsQ0FBWSxJQUFaLENBQWlCLEdBQWpCLENBQVA7QUFDSCxTQVJLO0FBU04saUJBVE0sdUJBU007QUFDUixtQkFBTyxVQUFVLEtBQUssSUFBZixHQUFzQixHQUE3QjtBQUNILFNBWEs7QUFZTixlQVpNLHFCQVlJO0FBQ04sbUJBQU8sU0FBUyxLQUFLLElBQWQsSUFBc0IsU0FBUyxLQUFLLFdBQUwsR0FBbUIsQ0FBNUIsQ0FBdEIsR0FBdUQsS0FBSyxPQUFuRTtBQUNILFNBZEs7QUFlTixlQWZNLHFCQWVJO0FBQ04sbUJBQU8sS0FBSyxJQUFMLEdBQVksR0FBbkI7QUFDSDtBQWpCSyxLQXZDQztBQTBEWCxhQUFTO0FBQ0wsbUJBREssdUJBQ08sTUFEUCxFQUNlO0FBQ2hCLGlCQUFLLEtBQUwsQ0FBVyxZQUFYLEVBQXlCO0FBQ3JCLHVCQUFPLE1BRGM7QUFFckIsMEJBQVUsS0FBSyxXQUFMLENBQWlCLE1BQWpCLENBRlc7QUFHckIsb0JBQUksS0FBSztBQUhZLGFBQXpCO0FBS0gsU0FQSTtBQVFMLG1CQVJLLHVCQVFPLE1BUlAsRUFRZTtBQUNoQjtBQUNBLGdCQUFJLFFBQVMsS0FBSyxHQUFOLEdBQWEsS0FBSyxJQUE5QjtBQUNBLGdCQUFJLFdBQVcsS0FBSyxLQUFMLENBQVksTUFBTSxLQUFQLEdBQWdCLE9BQU8sT0FBbEMsQ0FBZjtBQUNBLG1CQUFRLFdBQVcsR0FBWixHQUFtQixHQUFuQixHQUF5QixRQUFoQztBQUNILFNBYkk7QUFjTCxnQkFkSyxvQkFjSSxNQWRKLEVBY1k7QUFDYixpQkFBSyxLQUFMLENBQVcsVUFBWCxFQUF1QjtBQUNuQixvQkFBSSxLQUFLLEtBRFU7QUFFbkIsMEJBQVUsS0FBSyxXQUFMLENBQWlCLE1BQWpCO0FBRlMsYUFBdkI7QUFJSDtBQW5CSSxLQTFERTtBQStFWCxRQS9FVyxrQkErRUo7QUFDSCxlQUFPO0FBQ0gsb0JBQVEsRUFETDtBQUVILGtCQUFNLEVBRkg7QUFHSCxrQkFBTTtBQUhILFNBQVA7QUFLSDtBQXJGVSxDOzs7Ozs7Ozs7Ozs7O0FDWWY7Ozs7QUFDQTs7Ozs7OztBQUlBO0FBREE7Ozs7QUFoQkE7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0NBOzs7O0FBQ0E7Ozs7Ozs7QUFHQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFUQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNIQTs7Ozs7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQU5BOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0ZBOzs7Ozs7QUFFQSxJQUFJLFNBQUosQ0FBYyxhQUFkOzs7Ozs7Ozs7OztBQ1VBOzs7O0FBQ0E7Ozs7Ozs7QUFHQTtBQURBOzs7OztBQWZBO0FBQUEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIGluc2VydGVkID0gZXhwb3J0cy5jYWNoZSA9IHt9XG5cbmZ1bmN0aW9uIG5vb3AgKCkge31cblxuZXhwb3J0cy5pbnNlcnQgPSBmdW5jdGlvbiAoY3NzKSB7XG4gIGlmIChpbnNlcnRlZFtjc3NdKSByZXR1cm4gbm9vcFxuICBpbnNlcnRlZFtjc3NdID0gdHJ1ZVxuXG4gIHZhciBlbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKVxuICBlbGVtLnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0L2NzcycpXG5cbiAgaWYgKCd0ZXh0Q29udGVudCcgaW4gZWxlbSkge1xuICAgIGVsZW0udGV4dENvbnRlbnQgPSBjc3NcbiAgfSBlbHNlIHtcbiAgICBlbGVtLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzc1xuICB9XG5cbiAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChlbGVtKVxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0ucmVtb3ZlQ2hpbGQoZWxlbSlcbiAgICBpbnNlcnRlZFtjc3NdID0gZmFsc2VcbiAgfVxufVxuIiwidmFyIFZ1ZSAvLyBsYXRlIGJpbmRcbnZhciB2ZXJzaW9uXG52YXIgbWFwID0gd2luZG93Ll9fVlVFX0hPVF9NQVBfXyA9IE9iamVjdC5jcmVhdGUobnVsbClcbnZhciBpbnN0YWxsZWQgPSBmYWxzZVxudmFyIGlzQnJvd3NlcmlmeSA9IGZhbHNlXG52YXIgaW5pdEhvb2tOYW1lID0gJ2JlZm9yZUNyZWF0ZSdcblxuZXhwb3J0cy5pbnN0YWxsID0gZnVuY3Rpb24gKHZ1ZSwgYnJvd3NlcmlmeSkge1xuICBpZiAoaW5zdGFsbGVkKSByZXR1cm5cbiAgaW5zdGFsbGVkID0gdHJ1ZVxuXG4gIFZ1ZSA9IHZ1ZS5fX2VzTW9kdWxlID8gdnVlLmRlZmF1bHQgOiB2dWVcbiAgdmVyc2lvbiA9IFZ1ZS52ZXJzaW9uLnNwbGl0KCcuJykubWFwKE51bWJlcilcbiAgaXNCcm93c2VyaWZ5ID0gYnJvd3NlcmlmeVxuXG4gIC8vIGNvbXBhdCB3aXRoIDwgMi4wLjAtYWxwaGEuN1xuICBpZiAoVnVlLmNvbmZpZy5fbGlmZWN5Y2xlSG9va3MuaW5kZXhPZignaW5pdCcpID4gLTEpIHtcbiAgICBpbml0SG9va05hbWUgPSAnaW5pdCdcbiAgfVxuXG4gIGV4cG9ydHMuY29tcGF0aWJsZSA9IHZlcnNpb25bMF0gPj0gMlxuICBpZiAoIWV4cG9ydHMuY29tcGF0aWJsZSkge1xuICAgIGNvbnNvbGUud2FybihcbiAgICAgICdbSE1SXSBZb3UgYXJlIHVzaW5nIGEgdmVyc2lvbiBvZiB2dWUtaG90LXJlbG9hZC1hcGkgdGhhdCBpcyAnICtcbiAgICAgICdvbmx5IGNvbXBhdGlibGUgd2l0aCBWdWUuanMgY29yZSBeMi4wLjAuJ1xuICAgIClcbiAgICByZXR1cm5cbiAgfVxufVxuXG4vKipcbiAqIENyZWF0ZSBhIHJlY29yZCBmb3IgYSBob3QgbW9kdWxlLCB3aGljaCBrZWVwcyB0cmFjayBvZiBpdHMgY29uc3RydWN0b3JcbiAqIGFuZCBpbnN0YW5jZXNcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKi9cblxuZXhwb3J0cy5jcmVhdGVSZWNvcmQgPSBmdW5jdGlvbiAoaWQsIG9wdGlvbnMpIHtcbiAgdmFyIEN0b3IgPSBudWxsXG4gIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIEN0b3IgPSBvcHRpb25zXG4gICAgb3B0aW9ucyA9IEN0b3Iub3B0aW9uc1xuICB9XG4gIG1ha2VPcHRpb25zSG90KGlkLCBvcHRpb25zKVxuICBtYXBbaWRdID0ge1xuICAgIEN0b3I6IFZ1ZS5leHRlbmQob3B0aW9ucyksXG4gICAgaW5zdGFuY2VzOiBbXVxuICB9XG59XG5cbi8qKlxuICogTWFrZSBhIENvbXBvbmVudCBvcHRpb25zIG9iamVjdCBob3QuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICovXG5cbmZ1bmN0aW9uIG1ha2VPcHRpb25zSG90IChpZCwgb3B0aW9ucykge1xuICBpbmplY3RIb29rKG9wdGlvbnMsIGluaXRIb29rTmFtZSwgZnVuY3Rpb24gKCkge1xuICAgIG1hcFtpZF0uaW5zdGFuY2VzLnB1c2godGhpcylcbiAgfSlcbiAgaW5qZWN0SG9vayhvcHRpb25zLCAnYmVmb3JlRGVzdHJveScsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaW5zdGFuY2VzID0gbWFwW2lkXS5pbnN0YW5jZXNcbiAgICBpbnN0YW5jZXMuc3BsaWNlKGluc3RhbmNlcy5pbmRleE9mKHRoaXMpLCAxKVxuICB9KVxufVxuXG4vKipcbiAqIEluamVjdCBhIGhvb2sgdG8gYSBob3QgcmVsb2FkYWJsZSBjb21wb25lbnQgc28gdGhhdFxuICogd2UgY2FuIGtlZXAgdHJhY2sgb2YgaXQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBob29rXG4gKi9cblxuZnVuY3Rpb24gaW5qZWN0SG9vayAob3B0aW9ucywgbmFtZSwgaG9vaykge1xuICB2YXIgZXhpc3RpbmcgPSBvcHRpb25zW25hbWVdXG4gIG9wdGlvbnNbbmFtZV0gPSBleGlzdGluZ1xuICAgID8gQXJyYXkuaXNBcnJheShleGlzdGluZylcbiAgICAgID8gZXhpc3RpbmcuY29uY2F0KGhvb2spXG4gICAgICA6IFtleGlzdGluZywgaG9va11cbiAgICA6IFtob29rXVxufVxuXG5mdW5jdGlvbiB0cnlXcmFwIChmbikge1xuICByZXR1cm4gZnVuY3Rpb24gKGlkLCBhcmcpIHtcbiAgICB0cnkgeyBmbihpZCwgYXJnKSB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGUpXG4gICAgICBjb25zb2xlLndhcm4oJ1NvbWV0aGluZyB3ZW50IHdyb25nIGR1cmluZyBWdWUgY29tcG9uZW50IGhvdC1yZWxvYWQuIEZ1bGwgcmVsb2FkIHJlcXVpcmVkLicpXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydHMucmVyZW5kZXIgPSB0cnlXcmFwKGZ1bmN0aW9uIChpZCwgb3B0aW9ucykge1xuICB2YXIgcmVjb3JkID0gbWFwW2lkXVxuICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucy5vcHRpb25zXG4gIH1cbiAgcmVjb3JkLkN0b3Iub3B0aW9ucy5yZW5kZXIgPSBvcHRpb25zLnJlbmRlclxuICByZWNvcmQuQ3Rvci5vcHRpb25zLnN0YXRpY1JlbmRlckZucyA9IG9wdGlvbnMuc3RhdGljUmVuZGVyRm5zXG4gIHJlY29yZC5pbnN0YW5jZXMuc2xpY2UoKS5mb3JFYWNoKGZ1bmN0aW9uIChpbnN0YW5jZSkge1xuICAgIGluc3RhbmNlLiRvcHRpb25zLnJlbmRlciA9IG9wdGlvbnMucmVuZGVyXG4gICAgaW5zdGFuY2UuJG9wdGlvbnMuc3RhdGljUmVuZGVyRm5zID0gb3B0aW9ucy5zdGF0aWNSZW5kZXJGbnNcbiAgICBpbnN0YW5jZS5fc3RhdGljVHJlZXMgPSBbXSAvLyByZXNldCBzdGF0aWMgdHJlZXNcbiAgICBpbnN0YW5jZS4kZm9yY2VVcGRhdGUoKVxuICB9KVxufSlcblxuZXhwb3J0cy5yZWxvYWQgPSB0cnlXcmFwKGZ1bmN0aW9uIChpZCwgb3B0aW9ucykge1xuICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucy5vcHRpb25zXG4gIH1cbiAgbWFrZU9wdGlvbnNIb3QoaWQsIG9wdGlvbnMpXG4gIHZhciByZWNvcmQgPSBtYXBbaWRdXG4gIGlmICh2ZXJzaW9uWzFdIDwgMikge1xuICAgIC8vIHByZXNlcnZlIHByZSAyLjIgYmVoYXZpb3IgZm9yIGdsb2JhbCBtaXhpbiBoYW5kbGluZ1xuICAgIHJlY29yZC5DdG9yLmV4dGVuZE9wdGlvbnMgPSBvcHRpb25zXG4gIH1cbiAgdmFyIG5ld0N0b3IgPSByZWNvcmQuQ3Rvci5zdXBlci5leHRlbmQob3B0aW9ucylcbiAgcmVjb3JkLkN0b3Iub3B0aW9ucyA9IG5ld0N0b3Iub3B0aW9uc1xuICByZWNvcmQuQ3Rvci5jaWQgPSBuZXdDdG9yLmNpZFxuICByZWNvcmQuQ3Rvci5wcm90b3R5cGUgPSBuZXdDdG9yLnByb3RvdHlwZVxuICBpZiAobmV3Q3Rvci5yZWxlYXNlKSB7XG4gICAgLy8gdGVtcG9yYXJ5IGdsb2JhbCBtaXhpbiBzdHJhdGVneSB1c2VkIGluIDwgMi4wLjAtYWxwaGEuNlxuICAgIG5ld0N0b3IucmVsZWFzZSgpXG4gIH1cbiAgcmVjb3JkLmluc3RhbmNlcy5zbGljZSgpLmZvckVhY2goZnVuY3Rpb24gKGluc3RhbmNlKSB7XG4gICAgaWYgKGluc3RhbmNlLiR2bm9kZSAmJiBpbnN0YW5jZS4kdm5vZGUuY29udGV4dCkge1xuICAgICAgaW5zdGFuY2UuJHZub2RlLmNvbnRleHQuJGZvcmNlVXBkYXRlKClcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS53YXJuKCdSb290IG9yIG1hbnVhbGx5IG1vdW50ZWQgaW5zdGFuY2UgbW9kaWZpZWQuIEZ1bGwgcmVsb2FkIHJlcXVpcmVkLicpXG4gICAgfVxuICB9KVxufSlcbiIsImV4cG9ydCBkZWZhdWx0IHtcclxuICAgIHByb3BzOiB7XHJcbiAgICAgICAgaW5jcmVtZW50OiB7XHJcbiAgICAgICAgICAgIHR5cGU6IE51bWJlcixcclxuICAgICAgICAgICAgZGVmYXVsdDogMVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmF0aW5nOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IE51bWJlcixcclxuICAgICAgICAgICAgZGVmYXVsdDogMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYWN0aXZlQ29sb3I6IHtcclxuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBcIiNmZmQwNTVcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaW5hY3RpdmVDb2xvcjoge1xyXG4gICAgICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFwiI2Q4ZDhkOFwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBtYXhSYXRpbmc6IHtcclxuICAgICAgICAgICAgdHlwZTogTnVtYmVyLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiA1XHJcbiAgICAgICAgfSxcclxuICAgICAgICBpdGVtU2l6ZToge1xyXG4gICAgICAgICAgICB0eXBlOiBOdW1iZXIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IDUwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzaG93UmF0aW5nOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IEJvb2xlYW4sXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHRydWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlYWRPbmx5OiB7XHJcbiAgICAgICAgICAgIHR5cGU6IEJvb2xlYW4sXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0ZXh0Q2xhc3M6IHtcclxuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBcIlwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBpbmxpbmU6IHtcclxuICAgICAgICAgICAgdHlwZTogQm9vbGVhbixcclxuICAgICAgICAgICAgZGVmYXVsdDogZmFsc2VcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJvcmRlckNvbG9yOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgICAgICAgZGVmYXVsdDogXCIjOTk5XCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJvcmRlcldpZHRoOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IE51bWJlcixcclxuICAgICAgICAgICAgZGVmYXVsdDogMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGFkZGluZzoge1xyXG4gICAgICAgICAgICB0eXBlOiBOdW1iZXIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IDBcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgY3JlYXRlZCgpIHtcclxuICAgICAgICB0aGlzLnN0ZXAgPSB0aGlzLmluY3JlbWVudCAqIDEwMDtcclxuICAgICAgICB0aGlzLmN1cnJlbnRSYXRpbmcgPSB0aGlzLnJhdGluZztcclxuICAgICAgICB0aGlzLnNlbGVjdGVkUmF0aW5nID0gdGhpcy5yYXRpbmc7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVSYXRpbmcoKTtcclxuICAgIH0sXHJcbiAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgc2V0UmF0aW5nKCRldmVudCwgcGVyc2lzdCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMucmVhZE9ubHkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBwb3NpdGlvbiA9ICRldmVudC5wb3NpdGlvbiAvIDEwMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFJhdGluZyA9ICgoJGV2ZW50LmlkICsgcG9zaXRpb24pIC0gMSkudG9GaXhlZCgyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFJhdGluZyA9ICh0aGlzLmN1cnJlbnRSYXRpbmcgPiB0aGlzLm1heFJhdGluZykgPyB0aGlzLm1heFJhdGluZyA6IHRoaXMuY3VycmVudFJhdGluZztcclxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlUmF0aW5nKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAocGVyc2lzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRSYXRpbmcgPSB0aGlzLmN1cnJlbnRSYXRpbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgncmF0aW5nLXNlbGVjdGVkJywgdGhpcy5zZWxlY3RlZFJhdGluZyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2N1cnJlbnQtcmF0aW5nJywgdGhpcy5jdXJyZW50UmF0aW5nKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVzZXRSYXRpbmcoKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5yZWFkT25seSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50UmF0aW5nID0gdGhpcy5zZWxlY3RlZFJhdGluZztcclxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlUmF0aW5nKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGNyZWF0ZVJhdGluZygpIHtcclxuICAgICAgICAgICAgdGhpcy5yb3VuZCgpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubWF4UmF0aW5nOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBsZXZlbCA9IDA7XHJcbiAgICAgICAgICAgICAgICBpZiAoaSA8IHRoaXMuY3VycmVudFJhdGluZykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldmVsID0gKHRoaXMuY3VycmVudFJhdGluZyAtIGkgPiAxKSA/IDEwMCA6ICh0aGlzLmN1cnJlbnRSYXRpbmcgLSBpKSAqIDEwMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuJHNldCh0aGlzLmZpbGxMZXZlbCwgaSwgTWF0aC5yb3VuZChsZXZlbCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICByb3VuZCgpIHtcclxuICAgICAgICAgICAgdmFyIGludiA9IDEuMCAvIHRoaXMuaW5jcmVtZW50O1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRSYXRpbmcgPSBNYXRoLmNlaWwodGhpcy5jdXJyZW50UmF0aW5nICogaW52KSAvIGludjtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgd2F0Y2g6IHtcclxuICAgICAgICByYXRpbmcodmFsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFJhdGluZyA9IHZhbDtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFJhdGluZyA9IHZhbDtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVSYXRpbmcoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZGF0YSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzdGVwOiAwLFxyXG4gICAgICAgICAgICBmaWxsTGV2ZWw6IFtdLFxyXG4gICAgICAgICAgICBjdXJyZW50UmF0aW5nOiAwLFxyXG4gICAgICAgICAgICBzZWxlY3RlZFJhdGluZzogMFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCB7XHJcbiAgICBwcm9wczoge1xyXG4gICAgICAgIGZpbGw6IHtcclxuICAgICAgICAgICAgdHlwZTogTnVtYmVyLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiAwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzaXplOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IE51bWJlcixcclxuICAgICAgICAgICAgZGVmYXVsdDogNTBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGluZGV4OiB7XHJcbiAgICAgICAgICAgIHR5cGU6IE51bWJlcixcclxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFjdGl2ZUNvbG9yOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGluYWN0aXZlQ29sb3I6IHtcclxuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYm9yZGVyQ29sb3I6IHtcclxuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBcIiM5OTlcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYm9yZGVyV2lkdGg6IHtcclxuICAgICAgICAgICAgdHlwZTogTnVtYmVyLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiAwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwYWRkaW5nOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IE51bWJlcixcclxuICAgICAgICAgICAgZGVmYXVsdDogMFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBjcmVhdGVkKCkge1xyXG4gICAgICAgIHRoaXMuY2FsY3VsYXRlUG9pbnRzO1xyXG4gICAgICAgIHRoaXMuZ3JhZCA9IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cmluZyg3KTtcclxuICAgIH0sXHJcbiAgICBjb21wdXRlZDoge1xyXG4gICAgICAgIGNhbGN1bGF0ZVBvaW50cygpIHtcclxuICAgICAgICAgICAgdGhpcy5wb2ludHMgPSB0aGlzLnBvaW50cy5tYXAoKHBvaW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKCh0aGlzLnNpemUgLyB0aGlzLmJhc2UpICogcG9pbnQpICsgKHRoaXMuYm9yZGVyV2lkdGggKiAxLjUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHBvaW50c1RvU3RyaW5nKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wb2ludHMuam9pbignLCcpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0R3JhZElkKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJ3VybCgjJyArIHRoaXMuZ3JhZCArICcpJztcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldFNpemUoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUludCh0aGlzLnNpemUpICsgcGFyc2VJbnQodGhpcy5ib3JkZXJXaWR0aCAqIDMpICsgdGhpcy5wYWRkaW5nO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0RmlsbCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlsbCArIFwiJVwiO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgbW91c2VNb3ZpbmcoJGV2ZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ21vdXNlLW1vdmUnLCB7XHJcbiAgICAgICAgICAgICAgICBldmVudDogJGV2ZW50LFxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IHRoaXMuZ2V0UG9zaXRpb24oJGV2ZW50KSxcclxuICAgICAgICAgICAgICAgIGlkOiB0aGlzLmluZGV4XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXRQb3NpdGlvbigkZXZlbnQpIHtcclxuICAgICAgICAgICAgLy8gY2FsY3VsYXRlIHBvc2l0aW9uIGluIHBlcmNlbnRhZ2UuXHJcbiAgICAgICAgICAgIHZhciB3aWR0aCA9ICg5MiAvIDEwMCkgKiB0aGlzLnNpemU7XHJcbiAgICAgICAgICAgIHZhciBwb3NpdGlvbiA9IE1hdGgucm91bmQoKDEwMCAvIHdpZHRoKSAqICRldmVudC5vZmZzZXRYKTtcclxuICAgICAgICAgICAgcmV0dXJuIChwb3NpdGlvbiA+IDEwMCkgPyAxMDAgOiBwb3NpdGlvbjtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNlbGVjdGVkKCRldmVudCkge1xyXG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdzZWxlY3RlZCcsIHtcclxuICAgICAgICAgICAgICAgIGlkOiB0aGlzLmluZGV4LFxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IHRoaXMuZ2V0UG9zaXRpb24oJGV2ZW50KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBkYXRhKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHBvaW50czogW10sXHJcbiAgICAgICAgICAgIGdyYWQ6ICcnLFxyXG4gICAgICAgICAgICBiYXNlOiA1MFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIjx0ZW1wbGF0ZT5cclxuICAgIDxkaXYgOmNsYXNzPVwiWydyYXRpbmcnLCB7aW5saW5lOiBpbmxpbmV9XVwiPlxyXG4gICAgICAgIDxkaXYgQG1vdXNlbGVhdmU9XCJyZXNldFJhdGluZ1wiIGNsYXNzPVwicmF0aW5nXCI+XHJcbiAgICAgICAgICAgIDxzcGFuIHYtZm9yPVwibiBpbiBtYXhSYXRpbmdcIiA6Y2xhc3M9XCJbe3BvaW50ZXI6ICFyZWFkT25seSB9LCAncmF0aW5nLWl0ZW0nXVwiPlxyXG4gICAgICAgICAgICAgIDxjb21wb25lbnQgOmlzPVwidHlwZVwiIDpmaWxsPVwiZmlsbExldmVsW24tMV1cIiA6c2l6ZT1cIml0ZW1TaXplXCIgOmluZGV4PVwiblwiIDpzdGVwPVwic3RlcFwiIDphY3RpdmUtY29sb3I9XCJhY3RpdmVDb2xvclwiIDppbmFjdGl2ZS1jb2xvcj1cImluYWN0aXZlQ29sb3JcIiA6Ym9yZGVyLWNvbG9yPVwiYm9yZGVyQ29sb3JcIiA6Ym9yZGVyLXdpZHRoPVwiYm9yZGVyV2lkdGhcIiA6cGFkZGluZz1cInBhZGRpbmdcIiBAc2VsZWN0ZWQ9XCJzZXRSYXRpbmcoJGV2ZW50LCB0cnVlKVwiIEBtb3VzZS1tb3ZlPVwic2V0UmF0aW5nXCI+PC9jb21wb25lbnQ+XHJcbiAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4gdi1pZj1cInNob3dSYXRpbmdcIiA6Y2xhc3M9XCJbJ3JhdGluZy10ZXh0JywgdGV4dENsYXNzXVwiPiB7e2N1cnJlbnRSYXRpbmd9fTwvc3Bhbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdCB0eXBlPVwidGV4dC9qYXZhc2NyaXB0XCI+XHJcbmltcG9ydCBWdWUgZnJvbSAndnVlJztcclxuaW1wb3J0IFJhdGluZyBmcm9tICcuLi9taXhpbnMvUmF0aW5nLmpzJztcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBWdWUuZXh0ZW5kKHtcclxuICAgICBtaXhpbnM6IFtSYXRpbmddXHJcbn0pO1xyXG5cclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgc2NvcGVkPlxyXG4ucmF0aW5nLWl0ZW0ge1xyXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG59XHJcbi5wb2ludGVyIHtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG4ucmF0aW5nIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcbi5pbmxpbmUge1xyXG4gICAgZGlzcGxheTogaW5saW5lLWZsZXg7XHJcbn1cclxuLnJhdGluZy10ZXh0IHtcclxuICAgIG1hcmdpbi10b3A6IDdweDtcclxuICAgIG1hcmdpbi1sZWZ0OiA3cHg7XHJcbn1cclxuPC9zdHlsZT4iLCI8c2NyaXB0IHR5cGU9XCJ0ZXh0L2phdmFzY3JpcHRcIj5cclxuaW1wb3J0IEJhc2VSYXRpbmcgZnJvbSAnLi4vQmFzZVJhdGluZy52dWUnO1xyXG5pbXBvcnQgU3RhciBmcm9tICcuL3N0YXIudnVlJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJhc2VSYXRpbmcuZXh0ZW5kKHtcclxuICAgIG5hbWU6ICdTdGFyLVJhdGluZycsXHJcbiAgICBjb21wb25lbnRzOiB7XHJcbiAgICAgICAgU3RhclxyXG4gICAgfSxcclxuICAgIGRhdGEoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdHlwZTogJ3N0YXInXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuPC9zY3JpcHQ+IiwiPHNjcmlwdCB0eXBlPVwidGV4dC9qYXZhc2NyaXB0XCI+XHJcbmltcG9ydCBQb2x5Z29uIGZyb20gJy4uLy4uL3RlbXBsYXRlcy9Qb2x5Z29uLnZ1ZSc7XHJcbmV4cG9ydCBkZWZhdWx0IFBvbHlnb24uZXh0ZW5kKHtcclxuICAgIGRhdGEoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcG9pbnRzOiBbMTkuOCwgMi4yLCA2LjYsIDQzLjU2LCAzOS42LCAxNy4xNiwgMCwgMTcuMTYsIDMzLCA0My41Nl0sXHJcbiAgICAgICAgICAgIGJhc2U6IDQzXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuPC9zY3JpcHQ+XHJcbiIsImltcG9ydCBTdGFyUmF0aW5nIGZyb20gJy4uL3JhdGVycy9zdGFycy9zdGFyLXJhdGluZy52dWUnO1xyXG5cclxuVnVlLmNvbXBvbmVudCgnc3Rhci1yYXRpbmcnLCBTdGFyUmF0aW5nKTsiLCI8dGVtcGxhdGU+XHJcbiAgICA8c3ZnIDpoZWlnaHQ9XCJnZXRTaXplXCIgOndpZHRoPVwiZ2V0U2l6ZVwiIEBtb3VzZW1vdmU9XCJtb3VzZU1vdmluZ1wiIEBjbGljaz1cInNlbGVjdGVkXCI+XHJcbiAgICAgICAgPGxpbmVhckdyYWRpZW50IDppZD1cImdyYWRcIiB4MT1cIjBcIiB4Mj1cIjEwMCVcIiB5MT1cIjBcIiB5Mj1cIjBcIj5cclxuICAgICAgICAgICAgPHN0b3AgOm9mZnNldD1cImdldEZpbGxcIiA6c3RvcC1jb2xvcj1cImFjdGl2ZUNvbG9yXCIgLz5cclxuICAgICAgICAgICAgPHN0b3AgOm9mZnNldD1cImdldEZpbGxcIiA6c3RvcC1jb2xvcj1cImluYWN0aXZlQ29sb3JcIiAvPlxyXG4gICAgICAgIDwvbGluZWFyR3JhZGllbnQ+XHJcbiAgICAgICAgPHBvbHlnb24gOnBvaW50cz1cInBvaW50c1RvU3RyaW5nXCIgOmZpbGw9XCJnZXRHcmFkSWRcIiA6c3Ryb2tlPVwiYm9yZGVyQ29sb3JcIiA6c3Ryb2tlLXdpZHRoPVwiYm9yZGVyV2lkdGhcIiAvPlxyXG4gICAgICAgIDxwb2x5Z29uIDpwb2ludHM9XCJwb2ludHNUb1N0cmluZ1wiIDpmaWxsPVwiZ2V0R3JhZElkXCIgLz5cclxuICAgIDwvc3ZnPlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdCB0eXBlPVwidGV4dC9qYXZhc2NyaXB0XCI+XHJcbmltcG9ydCBWdWUgZnJvbSAndnVlJztcclxuaW1wb3J0IFJhdGluZ0l0ZW0gZnJvbSAnLi4vbWl4aW5zL1JhdGluZ0l0ZW0uanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVnVlLmV4dGVuZCh7XHJcblx0bWl4aW5zOiBbUmF0aW5nSXRlbV1cclxufSk7XHJcblxyXG48L3NjcmlwdD4iXX0=
