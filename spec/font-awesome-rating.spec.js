import Vue from 'vue'
import FaRating from '../src/raters/font-awesome/font-awesome-rating.vue'


describe('heart-rating', () => {
    it('should override the parents default prop values', () => {
    	spyOn(console, 'error'); // Quick and dirty way to suppress warnings about missing props
        let far = new FaRating();
        expect(far.$props.activeColor).toBe("#000")
    })

    it('should set the glyph', () => {
        let far = new FaRating({
        	props: {
        		glyph: {
        			required: false,
        			default: "foo"
        		}
        	}
        });
        expect(far.customProps.glyph).toBe("foo")
    })
})
