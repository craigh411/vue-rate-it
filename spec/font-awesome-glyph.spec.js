import Vue from 'vue'
import FaGlyph from '../src/raters/font-awesome/font-awesome-glyph.vue'

Vue.component('fa-glyph', FaGlyph);

var dProps = {
    index: {
        required: false
    },
    activeColor: {
        required: false
    },
    inactiveColor: {
        required: false
    }
};

describe('font-awesome-glyph', () => {
    it('loads the given glyph', () => {
    	spyOn(console, 'error'); // Quick and dirty way to suppress warnings about missing props
        var Component = FaGlyph.extend({
            props: {
                customProps: {
                    default: function() {
                        return { glyph: 'star' }
                    }
                }
            }
        });

        var component = new Component();
        expect(component.$data.points[0] === undefined).toBeFalsy();
    })

    it('loads the given glyph when fa is prepended', () => {
    	spyOn(console,'error'); // Quick and dirty way to suppress warnings
        var Component = FaGlyph.extend({
            props: {
                customProps: {
                    default: function() {
                        return { glyph: 'fa-star' }
                    }
                }
            }
        });

        var component = new Component();
       expect(component.$data.points[0] === undefined).toBeFalsy();
    })

});
