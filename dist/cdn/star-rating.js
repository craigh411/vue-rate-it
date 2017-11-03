(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("Vue"));
	else if(typeof define === 'function' && define.amd)
		define("VueRateIt", ["Vue"], factory);
	else if(typeof exports === 'object')
		exports["VueRateIt"] = factory(require("Vue"));
	else
		root["VueRateIt"] = factory(root["Vue"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 43);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  scopeId,
  cssModules
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  // inject cssModules
  if (cssModules) {
    var computed = Object.create(options.computed || null)
    Object.keys(cssModules).forEach(function (key) {
      var module = cssModules[key]
      computed[key] = function () { return module }
    })
    options.computed = computed
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(7)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(8)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(10),
  /* template */
  __webpack_require__(11),
  /* scopeId */
  "data-v-217e3916",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
            default: '#999'
        },
        borderWidth: {
            type: Number,
            default: 0
        },
        spacing: {
            type: Number,
            default: 0
        },
        customProps: {
            type: Object,
            default: function _default() {
                return {};
            }
        },
        rtl: {
            type: Boolean,
            default: false
        }
    },
    created: function created() {
        this.fillId = Math.random().toString(36).substring(7);
    },

    computed: {
        pointsToString: function pointsToString() {
            return this.points.join(',');
        },
        getFillId: function getFillId() {
            return 'url(#' + this.fillId + ')';
        },
        getWidth: function getWidth() {
            return parseInt(this.size) + parseInt(this.borderWidth * this.borders);
        },
        getHeight: function getHeight() {
            return this.originalHeight / this.originalWidth * this.getWidth;
        },
        getFill: function getFill() {
            return this.rtl ? 100 - this.fill + '%' : this.fill + '%';
        },
        getSpacing: function getSpacing() {
            return this.spacing + this.borderWidth / 2 + 'px';
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
            var width = 92 / 100 * (this.size + this.borderWidth);
            var offset = this.rtl ? Math.min($event.offsetX, 45) : Math.max($event.offsetX, 1);
            var position = Math.round(100 / width * offset);

            return Math.min(position, 100);
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
            fillId: '',
            originalWidth: 50,
            orignalHeight: 50,
            borders: 1
        };
    }
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

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
            default: '#ffd055'
        },
        inactiveColor: {
            type: String,
            default: '#d8d8d8'
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
            default: ''
        },
        inline: {
            type: Boolean,
            default: false
        },
        borderColor: {
            type: String,
            default: '#999'
        },
        borderWidth: {
            type: Number,
            default: 2
        },
        spacing: {
            type: Number,
            default: 0
        },
        fixedPoints: {
            type: Number,
            default: null
        },
        rtl: {
            type: Boolean,
            default: false
        }
    },
    model: {
        prop: 'rating',
        event: 'rating-selected'
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
                var position = this.rtl ? (100 - $event.position) / 100 : $event.position / 100;
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
            this.currentRating = Math.min(this.maxRating, Math.ceil(this.currentRating * inv) / inv);
        }
    },
    computed: {
        formattedRating: function formattedRating() {
            return this.fixedPoints === null ? this.currentRating : this.currentRating.toFixed(this.fixedPoints);
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
            selectedRating: 0,
            customProps: {}
        };
    }
};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(9);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("77372b13", content, true);

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)();
// imports


// module
exports.push([module.i, ".vue-rate-it-rating-item[data-v-217e3916]{display:inline-block}.vue-rate-it-pointer[data-v-217e3916]{cursor:pointer}.vue-rate-it-rating[data-v-217e3916]{display:flex;align-items:center}.vue-rate-it-inline[data-v-217e3916]{display:inline-flex}.vue-rate-it-rating-text[data-v-217e3916]{margin-top:7px;margin-left:7px}.vue-rate-it-rtl[data-v-217e3916]{direction:rtl}.vue-rate-it-rtl .vue-rate-it-rating-text[data-v-217e3916]{margin-right:10px;direction:rtl}", ""]);

// exports


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = __webpack_require__(1);

var _vue2 = _interopRequireDefault(_vue);

var _Rating = __webpack_require__(6);

var _Rating2 = _interopRequireDefault(_Rating);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = _vue2.default.extend({
    mixins: [_Rating2.default],
    data: function data() {
        return {
            type: ''
        };
    }
});

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    class: ['vue-rate-it-rating', {
      'vue-rate-it-rtl': _vm.rtl
    }, {
      'vue-rate-it-inline': _vm.inline
    }, 'vue-rate-it-rating-container']
  }, [_c('div', {
    staticClass: "vue-rate-it-rating",
    on: {
      "mouseleave": _vm.resetRating
    }
  }, [_vm._l((_vm.maxRating), function(n) {
    return _c('div', {
      class: [{
        'vue-rate-it-pointer': !_vm.readOnly
      }, 'vue-rate-it-rating-item']
    }, [_c(_vm.type, {
      tag: "component",
      attrs: {
        "fill": _vm.fillLevel[n - 1],
        "size": _vm.itemSize,
        "index": n,
        "step": _vm.step,
        "active-color": _vm.activeColor,
        "inactive-color": _vm.inactiveColor,
        "border-color": _vm.borderColor,
        "border-width": _vm.borderWidth,
        "spacing": _vm.spacing,
        "custom-props": _vm.customProps,
        "rtl": _vm.rtl
      },
      on: {
        "selected": function($event) {
          _vm.setRating($event, true)
        },
        "mouse-move": _vm.setRating
      }
    })], 1)
  }), _vm._v(" "), (_vm.showRating) ? _c('span', {
    class: ['vue-rate-it-rating-text', _vm.textClass]
  }, [_vm._v(" " + _vm._s(_vm.formattedRating))]) : _vm._e()], 2)])
},staticRenderFns: []}

/***/ }),
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(27),
  /* template */
  __webpack_require__(28),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(24),
  /* template */
  null,
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _BaseRating = __webpack_require__(4);

var _BaseRating2 = _interopRequireDefault(_BaseRating);

var _star = __webpack_require__(25);

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

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(26),
  /* template */
  null,
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Polygon = __webpack_require__(15);

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

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = __webpack_require__(1);

var _vue2 = _interopRequireDefault(_vue);

var _RatingItem = __webpack_require__(5);

var _RatingItem2 = _interopRequireDefault(_RatingItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//

exports.default = _vue2.default.extend({
    mixins: [_RatingItem2.default],
    created: function created() {
        this.calculatePoints();
    },

    methods: {
        calculatePoints: function calculatePoints() {
            var _this = this;

            this.points = this.points.map(function (point) {
                return _this.size / _this.originalWidth * point + _this.borderWidth * (_this.borders / 2);
            });
        }
    },
    data: function data() {
        return {
            points: []
        };
    }
});

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('svg', {
    staticStyle: {
      "overflow": "visible"
    },
    attrs: {
      "width": _vm.getWidth,
      "height": _vm.getHeight
    },
    on: {
      "mousemove": _vm.mouseMoving,
      "click": _vm.selected
    }
  }, [_c('linearGradient', {
    attrs: {
      "id": _vm.fillId,
      "x1": "0",
      "x2": "100%",
      "y1": "0",
      "y2": "0"
    }
  }, [_c('stop', {
    attrs: {
      "offset": _vm.getFill,
      "stop-color": (_vm.rtl) ? _vm.inactiveColor : _vm.activeColor
    }
  }), _vm._v(" "), _c('stop', {
    attrs: {
      "offset": _vm.getFill,
      "stop-color": (_vm.rtl) ? _vm.activeColor : _vm.inactiveColor
    }
  })], 1), _vm._v(" "), _c('polygon', {
    attrs: {
      "points": _vm.pointsToString,
      "fill": _vm.getFillId,
      "stroke": _vm.borderColor,
      "stroke-width": _vm.borderWidth
    }
  }), _vm._v(" "), _c('polygon', {
    attrs: {
      "points": _vm.pointsToString,
      "fill": _vm.getFillId
    }
  })], 1)
},staticRenderFns: []}

/***/ }),
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _starRating = __webpack_require__(23);

var _starRating2 = _interopRequireDefault(_starRating);

var _vue = __webpack_require__(1);

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.component('star-rating', _starRating2.default);

/***/ })
/******/ ]);
});
//# sourceMappingURL=star-rating.js.map