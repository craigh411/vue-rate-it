import Vue from 'vue'
import FaGlyph from '../src/raters/font-awesome/font-awesome-glyph.vue'

Vue.component('glyph', FaGlyph);

describe('font-awesome-glyph', () => {

  it('loads the given glyph', () => {
    var Component = Vue.extend(FaGlyph);
    var component = new Component(); 
  })

});