webpackJsonp([5],{

/***/ 68:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "ui basic segment",
    staticStyle: {
      "font-size": "1.1em"
    }
  }, [_c('h1', {
    staticClass: "ui header"
  }, [_vm._v("Building Your Own Components")]), _vm._v(" "), _c('div', {
    staticClass: "ui divider"
  }), _vm._v(" "), _c('p', [_vm._v("vue-rate-it has been designed to be extensible, meaning you can create your own rating components by extending the base components, in fact each component in this project does just that.")]), _vm._v(" "), _c('div', {
    staticClass: "ui message"
  }, [_vm._v("This part of the docs is currently under development.")]), _vm._v(" "), _c('h2', {
    staticClass: "ui header"
  }, [_vm._v("Basics")]), _vm._v(" "), _c('div', {
    staticClass: "ui divider"
  }), _vm._v(" "), _c('p', [_vm._v("vue-rate-it comes out the box with a \"rate-it\" component that allows you to specify a rating item of your choice. In order to make creating a rating item easy, vue-rate-it comes with built in components that can be extended. To start we will look at the how to extend the FaBaseGlyph component so we only import the font awesome glyph we need.")]), _vm._v(" "), _c('h3', {
    staticClass: "ui header"
  }, [_vm._v("Extending the FaBaseGlyph Component")]), _vm._v(" "), _c('p', [_vm._v("If you've never extended a Vue component before, don't worry, it's easy. All you need to do is import the component you want to extend and use Vue's extend functionailty, so for our FaBaseGlyph component we just need to do:")]), _vm._v(" "), _vm._m(0), _vm._v(" "), _c('p', [_vm._v("Now we have done that we can import the font awesome glyph we want from 'vue-rate-it/glyphs'. We can't use hyphens in constant names in JavaScript, so they have been replaced by hyphens. So let's import the fa-thumbs-up glyph:")]), _vm._v(" "), _vm._m(1), _vm._v("\n\nNow the FaBaseGlyph component extends the Path component (more on that later), which allows us to supply an SVG path's points via the points data attribute, so all we need to do is add our imported glyph (which is actaully just an SVG path) to the points array, which we can do in the created hook:\n\n"), _vm._m(2), _vm._v("\n\nAnd that's it, we now have our thumbs up glyph component complete.\n\n"), _c('h3', {
    staticClass: "ui heading"
  }, [_vm._v("Using the rate-it component")]), _vm._v("\n\nNow we have created our thumbs-up-glyph component we can import that with the RateIt component. Here I've assumed we have saved the above component as \"components/thumbs-up-glyph.vue\":\n\n"), _vm._m(3), _vm._v("\n\n\nFinally we need to add our thumbs-up-glyph component to the data attribute so we can pass it as a prop to the rate-it component:\n\n"), _vm._m(4), _vm._v("\n\nAnd that's it, you can now pass all the same props as the "), _c('router-link', {
    attrs: {
      "to": "/docs/font-awesome"
    }
  }, [_vm._v("font-awesome")]), _vm._v(" component, without importing all 700 font-awesome glyphs!\n\n    ")], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "ui segment"
  }, [_c('div', {
    staticStyle: {
      "background": "#ffffff",
      "overflow": "auto",
      "width": "auto",
      "border-width": ".1em .1em .1em .8em",
      "padding": ".2em .6em"
    }
  }, [_c('pre', {
    staticStyle: {
      "margin": "0",
      "line-height": "125%"
    }
  }, [_c('span', {
    staticStyle: {
      "color": "#0000aa"
    }
  }, [_vm._v("import")]), _vm._v(" {FaBaseGlyph} from "), _c('span', {
    staticStyle: {
      "color": "#aa5500"
    }
  }, [_vm._v("'vue-rate-it'")]), _vm._v(";\n\n"), _c('span', {
    staticStyle: {
      "color": "#0000aa"
    }
  }, [_vm._v("export")]), _vm._v(" "), _c('span', {
    staticStyle: {
      "color": "#0000aa"
    }
  }, [_vm._v("default")]), _vm._v(" FaBaseGlyph.extend({})\n")])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "ui segment"
  }, [_c('div', {
    staticStyle: {
      "background": "#ffffff",
      "overflow": "auto",
      "width": "auto",
      "border-width": ".1em .1em .1em .8em",
      "padding": ".2em .6em"
    }
  }, [_c('pre', {
    staticStyle: {
      "margin": "0",
      "line-height": "125%"
    }
  }, [_c('span', {
    staticStyle: {
      "color": "#0000aa"
    }
  }, [_vm._v("import")]), _vm._v(" {FaBaseGlyph} from "), _c('span', {
    staticStyle: {
      "color": "#aa5500"
    }
  }, [_vm._v("'vue-rate-it'")]), _vm._v(";\n"), _c('span', {
    staticStyle: {
      "color": "#0000aa"
    }
  }, [_vm._v("import")]), _vm._v(" {fa_thumbs_up} from "), _c('span', {
    staticStyle: {
      "color": "#aa5500"
    }
  }, [_vm._v("'vue-rate-it/glyphs'")]), _vm._v("\n\n"), _c('span', {
    staticStyle: {
      "color": "#0000aa"
    }
  }, [_vm._v("export")]), _vm._v(" "), _c('span', {
    staticStyle: {
      "color": "#0000aa"
    }
  }, [_vm._v("default")]), _vm._v(" FaBaseGlyph.extend({})\n")])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "ui segment"
  }, [_c('div', {
    staticStyle: {
      "background": "#ffffff",
      "overflow": "auto",
      "width": "auto",
      "border-width": ".1em .1em .1em .8em",
      "padding": ".2em .6em"
    }
  }, [_c('pre', {
    staticStyle: {
      "margin": "0",
      "line-height": "125%"
    }
  }, [_c('span', {
    staticStyle: {
      "color": "#0000aa"
    }
  }, [_vm._v("import")]), _vm._v(" {FaBaseGlyph} from "), _c('span', {
    staticStyle: {
      "color": "#aa5500"
    }
  }, [_vm._v("'vue-rate-it'")]), _vm._v(";\n"), _c('span', {
    staticStyle: {
      "color": "#0000aa"
    }
  }, [_vm._v("import")]), _vm._v(" {fa_thumbs_up} from "), _c('span', {
    staticStyle: {
      "color": "#aa5500"
    }
  }, [_vm._v("'vue-rate-it/glyphs'")]), _vm._v("\n\n"), _c('span', {
    staticStyle: {
      "color": "#0000aa"
    }
  }, [_vm._v("export")]), _vm._v(" "), _c('span', {
    staticStyle: {
      "color": "#0000aa"
    }
  }, [_vm._v("default")]), _vm._v(" FaBaseGlyph.extend({\n  created(){\n    "), _c('span', {
    staticStyle: {
      "color": "#0000aa"
    }
  }, [_vm._v("this")]), _vm._v(".points = [fa_thumbs_up];\n  }\n})\n")])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "ui segment"
  }, [_c('div', {
    staticStyle: {
      "background": "#ffffff",
      "overflow": "auto",
      "width": "auto",
      "border-width": ".1em .1em .1em .8em",
      "padding": ".2em .6em"
    }
  }, [_c('pre', {
    staticStyle: {
      "margin": "0",
      "line-height": "125%"
    }
  }, [_c('span', {
    staticStyle: {
      "color": "#1e90ff",
      "font-weight": "bold"
    }
  }, [_vm._v("<script ")]), _c('span', {
    staticStyle: {
      "color": "#1e90ff"
    }
  }, [_vm._v("type=")]), _c('span', {
    staticStyle: {
      "color": "#aa5500"
    }
  }, [_vm._v("\"text/javascript\"")]), _c('span', {
    staticStyle: {
      "color": "#1e90ff",
      "font-weight": "bold"
    }
  }, [_vm._v(">")]), _vm._v("\n"), _c('span', {
    staticStyle: {
      "color": "#0000aa"
    }
  }, [_vm._v("import")]), _vm._v(" {RateIt} from "), _c('span', {
    staticStyle: {
      "color": "#aa5500"
    }
  }, [_vm._v("'vue-rate-it'")]), _vm._v(";\n"), _c('span', {
    staticStyle: {
      "color": "#0000aa"
    }
  }, [_vm._v("import")]), _vm._v(" ThumbsUpGlyph from "), _c('span', {
    staticStyle: {
      "color": "#aa5500"
    }
  }, [_vm._v("'./comoponents/thumbs-up-glyph.vue'")]), _vm._v("\n\n"), _c('span', {
    staticStyle: {
      "color": "#0000aa"
    }
  }, [_vm._v("export")]), _vm._v(" "), _c('span', {
    staticStyle: {
      "color": "#0000aa"
    }
  }, [_vm._v("default")]), _vm._v("{\n  components:{\n    RateIt\n  }\n}\n"), _c('span', {
    staticStyle: {
      "color": "#1e90ff",
      "font-weight": "bold"
    }
  }, [_vm._v("</script>")]), _vm._v("\n")])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "ui segment"
  }, [_c('div', {
    staticStyle: {
      "background": "#ffffff",
      "overflow": "auto",
      "width": "auto",
      "border-width": ".1em .1em .1em .8em",
      "padding": ".2em .6em"
    }
  }, [_c('pre', {
    staticStyle: {
      "margin": "0",
      "line-height": "125%"
    }
  }, [_c('span', {
    staticStyle: {
      "color": "#1e90ff",
      "font-weight": "bold"
    }
  }, [_vm._v("<template>")]), _vm._v("\n"), _c('span', {
    staticStyle: {
      "color": "#1e90ff",
      "font-weight": "bold"
    }
  }, [_vm._v("<div>")]), _vm._v("\n  "), _c('span', {
    staticStyle: {
      "color": "#1e90ff",
      "font-weight": "bold"
    }
  }, [_vm._v("<rate")]), _c('span', {
    staticStyle: {
      "color": "#1e90ff"
    }
  }, [_vm._v("-it")]), _vm._v(" "), _c('span', {
    staticStyle: {
      "color": "#1e90ff"
    }
  }, [_vm._v(":with=")]), _c('span', {
    staticStyle: {
      "color": "#aa5500"
    }
  }, [_vm._v("\"thumbsUp\"")]), _c('span', {
    staticStyle: {
      "color": "#1e90ff",
      "font-weight": "bold"
    }
  }, [_vm._v(">")]), _c('span', {
    staticStyle: {
      "color": "#1e90ff"
    }
  }, [_vm._v("</rate-it>")]), _vm._v("\n"), _c('span', {
    staticStyle: {
      "color": "#1e90ff",
      "font-weight": "bold"
    }
  }, [_vm._v("</div>")]), _vm._v("\n"), _c('span', {
    staticStyle: {
      "color": "#1e90ff",
      "font-weight": "bold"
    }
  }, [_vm._v("</template>")]), _vm._v("\n\n"), _c('span', {
    staticStyle: {
      "color": "#1e90ff",
      "font-weight": "bold"
    }
  }, [_vm._v("<script ")]), _c('span', {
    staticStyle: {
      "color": "#1e90ff"
    }
  }, [_vm._v("type=")]), _c('span', {
    staticStyle: {
      "color": "#aa5500"
    }
  }, [_vm._v("\"text/javascript\"")]), _c('span', {
    staticStyle: {
      "color": "#1e90ff",
      "font-weight": "bold"
    }
  }, [_vm._v(">")]), _vm._v("\n"), _c('span', {
    staticStyle: {
      "color": "#0000aa"
    }
  }, [_vm._v("import")]), _vm._v(" {RateIt} from "), _c('span', {
    staticStyle: {
      "color": "#aa5500"
    }
  }, [_vm._v("'vue-rate-it'")]), _vm._v(";\n"), _c('span', {
    staticStyle: {
      "color": "#0000aa"
    }
  }, [_vm._v("import")]), _vm._v(" ThumbsUpGlyph from "), _c('span', {
    staticStyle: {
      "color": "#aa5500"
    }
  }, [_vm._v("'./comoponents/thumbs-up-glyph.vue'")]), _vm._v("\n\n"), _c('span', {
    staticStyle: {
      "color": "#0000aa"
    }
  }, [_vm._v("export")]), _vm._v(" "), _c('span', {
    staticStyle: {
      "color": "#0000aa"
    }
  }, [_vm._v("default")]), _vm._v("{\n  components:{\n    RateIt\n  },\n  data(){\n    "), _c('span', {
    staticStyle: {
      "color": "#0000aa"
    }
  }, [_vm._v("return")]), _vm._v("{\n      thumbsUp: ThumbsUpGlyph\n    }\n  }\n}\n"), _c('span', {
    staticStyle: {
      "color": "#1e90ff",
      "font-weight": "bold"
    }
  }, [_vm._v("</script>")]), _vm._v("\n")])])])
}]}

/***/ }),

/***/ 8:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  null,
  /* template */
  __webpack_require__(68),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ })

});