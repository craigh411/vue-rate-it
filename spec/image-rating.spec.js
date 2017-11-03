import Vue from 'vue'
import ImageRating from '../src/raters/images/image-rating.vue'


describe('image-rating', () => {
    it('should set the default value for the backgroundOpacity prop', () => {
    	spyOn(console, 'error'); // Quick and dirty way to suppress warnings about missing props
        let ir = new ImageRating();
        expect(ir.$props.backgroundOpacity).toEqual(0.2)
    })

    it('should set the image src', () => {
        let ir = new ImageRating({
        	props: {
        		src: {
        			required: false,
        			default: "foo"
        		}
        	}
        });
        expect(ir.customProps.src).toBe("foo")
    })

})
