import Vue from 'vue';
import Path from '../src/templates/Path.vue'

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

describe('Path', () => {

    it('should return the viewbox', () => {
        // Use mixin and suppress prop warnings
        var Component = Path.extend({
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
        expect(component.getViewbox).toBe("0 0 25 25");
    });


    it('should return the value of the x1 coordinate', () => {
        var Component = Path.extend({
            props: dProps,
            data() {
                return {
                    points: [10, 20, 30, 40],
                    originalWidth: 25,
                    originalHeight: 25,
                    coords: { x1: "10%", x2: "100%", y1: "0%", y2: "0%" }
                }
            }
        });

        var component = new Component();
        expect(component.x1Val).toEqual(10);
    })

    it('should adjust the fillLevel when the x1 coordinate is positive', () => {
        var Component = Path.extend({
            props: dProps,
            data() {
                return {
                    points: [10, 20, 30, 40],
                    originalWidth: 25,
                    originalHeight: 25,
                    coords: { x1: "10%", x2: "100%", y1: "0%", y2: "0%" }
                }
            }
        });

        var component = new Component();

        component.$props.fill = 50;
        expect(component.getFill).toBe("45%");
    });


    it('adjust the fillLevel when the x1 coordinate is negative', () => {
        var Component = Path.extend({
            props: dProps,
            data() {
                return {
                    points: [10, 20, 30, 40],
                    originalWidth: 25,
                    originalHeight: 25,
                    coords: { x1: "-10%", x2: "100%", y1: "0%", y2: "0%" }
                }
            }
        });

        var component = new Component();

        component.$props.fill = 50;
        expect(component.getFill).toBe("55%");
    });

    it('should return the fillLevel', () => {
        var Component = Path.extend({
            props: dProps,
            data() {
                return {
                    points: [10, 20, 30, 40],
                }
            }
        });

        var component = new Component();
        component.$props.fill = 55;

        expect(component.getFill).toBe("55%");
    });

    it('should return the fillLevel when using rtl', () => {
        var Component = Path.extend({
            props: dProps,
            data() {
                return {
                    points: [10, 20, 30, 40],
                }
            }
        });

        var component = new Component();
        component.$props.rtl = true 
        component.$props.fill = 55;

        expect(component.getFill).toBe("45%");
    });
});
