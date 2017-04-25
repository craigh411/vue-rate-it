import Vue from 'vue'
import HeartRating from '../src/raters/hearts/heart-rating.vue'


describe('heart-rating', () => {
    it('should override the parents default prop values', () => {
        let hr = new HeartRating();
        expect(hr.$props.borderWidth).toEqual(3)
        expect(hr.$props.activeColor).toBe("#d80000")
        expect(hr.$props.inactiveColor).toBe("#ffc4c4")
        expect(hr.$props.borderColor).toBe("#8b0000")
    })
})
