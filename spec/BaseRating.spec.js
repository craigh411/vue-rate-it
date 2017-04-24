import Vue from 'vue'
import BaseRating from '../src/raters/BaseRating.vue'
import Star from '../src/raters/stars/Star.vue'

Vue.config.productionTip = false;

describe('BaseRating', () => {

    beforeEach(() => {
        var el = document.createElement("div");
        el.setAttribute('id', 'app');
        document.body.appendChild(el);
    });

    afterEach(() => {
        document.body.innerHTML = "";
    });


    it('should print the given number of rating items on the page', () => {
        var Component = BaseRating.extend({
            components: {
                Star
            },
            data() {
                return {
                    type: 'star'
                }
            }
        });

        Vue.component('my-comp', Component);

        new Vue({
            render: createElement => {
                return createElement('my-comp')
            }
        }).$mount("#app")

        let els = document.getElementsByTagName('polygon');
        // Remember we print a polygon for the background and the forground, so 10 polygons for
        // 5 rating items.
        expect(els.length).toEqual(10);
    }); 
});
