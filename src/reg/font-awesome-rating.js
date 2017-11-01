import Glyphs from '../../glyphs'
import FontAwesomeRating from '../raters/font-awesome/font-awesome-rating.vue'
import Vue from 'vue'


Vue.prototype.$glyphs = Glyphs
Vue.component('fa-rating', FontAwesomeRating)
