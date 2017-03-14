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
        this.calculatePoints();
        this.grad = Math.random().toString(36).substring(7);
    },

    computed: {
        pointsToString: function pointsToString() {
            return this.points.join(',');
        },
        getGradId: function getGradId() {
            return 'url(#' + this.grad + ')';
        },
        getWidth: function getWidth() {
            return parseInt(this.size) + parseInt(this.borderWidth * this.borders) + this.padding;
        },
        getHeight: function getHeight() {
            return this.originalHeight / this.originalWidth * this.getWidth;
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
        calculatePoints: function calculatePoints() {
            var _this = this;

            this.points = this.points.map(function (point) {
                return _this.size / _this.originalWidth * point + _this.borderWidth * (_this.borders / 2);
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
            originalWidth: 50,
            orignalHeight: 50,
            borders: 1
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
            originalWidth: 43,
            originalHeight: 43,
            borders: 3
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
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{attrs:{"width":_vm.getWidth,"height":_vm.getHeight},on:{"mousemove":_vm.mouseMoving,"click":_vm.selected}},[_c('linearGradient',{attrs:{"id":_vm.grad,"x1":"0","x2":"100%","y1":"0","y2":"0"}},[_c('stop',{attrs:{"offset":_vm.getFill,"stop-color":_vm.activeColor}}),_vm._v(" "),_c('stop',{attrs:{"offset":_vm.getFill,"stop-color":_vm.inactiveColor}})],1),_vm._v(" "),_c('polygon',{attrs:{"points":_vm.pointsToString,"fill":_vm.getGradId,"stroke":_vm.borderColor,"stroke-width":_vm.borderWidth}}),_vm._v(" "),_c('polygon',{attrs:{"points":_vm.pointsToString,"fill":_vm.getGradId}})],1)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vueify/node_modules/vue-hot-reload-api")
  hotAPI.install((typeof window !== "undefined" ? window['Vue'] : typeof global !== "undefined" ? global['Vue'] : null), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3d10b208", __vue__options__)
  } else {
    hotAPI.rerender("data-v-3d10b208", __vue__options__)
  }
})()}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../mixins/RatingItem.js":4,"vueify/node_modules/vue-hot-reload-api":2}]},{},[8])

//# sourceMappingURL=maps/star-rating.js.map
