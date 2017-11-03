import Vue from 'vue';
import Image from '../src/raters/images/image.vue'

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

describe('Image', () => {

    it('should set the opacity to the customProp opacity', () => {
        // Use mixin and suppress prop warnings
        var Component = Image.extend({
            props: {
                customProps: {
                    default: function() {
                        return { opacity: 1 }
                    }
                }
            }
        });
        var component = new Component();

        expect(component.opacity).toEqual(1);
    });

    it('should set the src to the customProp src', () => {
        // Use mixin and suppress prop warnings
        var Component = Image.extend({
            props: {
                customProps: {
                    default: function() {
                        return { src: "foo" }
                    }
                }
            }
        });
        var component = new Component();

        expect(component.src).toBe("foo");
    });

    it('should return the fill Level', () => {
        // Use mixin and suppress prop warnings
        var Component = Image.extend({
            props: {
                customProps: {
                    default: function() {
                        return { src: "foo" }
                    }
                }
            }
        });
        var component = new Component();
        component.fill = 45;

        expect(component.getFill).toBe("45%");
    });

    it('should return the fill Level when using rtl', () => {
        // Use mixin and suppress prop warnings
        var Component = Image.extend({
            props: {
                customProps: {
                    default: function() {
                        return { src: "foo" }
                    }
                },
                rtl: {
                  default: true
                }
            }
        });
        var component = new Component();
        component.fill = 45;

        // Fill level should always be the same. The image is masked using x position instead
        expect(component.getFill).toBe("45%");
    });

    it('should return the x position for the mask', () => {
        // Use mixin and suppress prop warnings
        var Component = Image.extend({
            props: {
                customProps: {
                    default: function() {
                        return { src: "foo" }
                    }
                }
            }
        });
        var component = new Component();
        component.fill = 45;

        // x is always 0 when using left to right because that mask coordinates start from left to right
        expect(component.getX).toEqual(0);
    });

    it('should return the x position for the mask when using rtl', () => {
        // Use mixin and suppress prop warnings
        var Component = Image.extend({
            props: {
                customProps: {
                    default: function() {
                        return { src: "foo" }
                    }
                },
                rtl: {
                  default: true
                }
            },
            created(){
                console.log(this.rtl);
            }
        });
        var component = new Component();
        component.fill = 45;

        // We need to offset the mask when using rtl, so we remove the inverse of the mask
        expect(component.getX).toBe("55%");
    });

});