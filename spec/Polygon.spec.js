import Vue from 'vue';
import Polygon from '../src/templates/Polygon.vue'

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

describe('Polygon', () => {
	 it('should recalculate points based on size', () => {
        // Use mixin and suppress prop warnings
        var Component = Polygon.extend({
            props: dProps,
            data() {
                return {
                    points: [10, 20, 30, 40],
                    originalWidth: 25,
                    originalHeight: 25
                }
            }
        });

        var component = new Component();

        // original width is half the default size of 50, so all points should be doubled!
        expect(component.points).toEqual([20, 40, 60, 80])
    });
});