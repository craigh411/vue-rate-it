import Vue from 'vue'
import RatingItem from '../src/mixins/RatingItem.js'

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

describe('RatingItem mixin', () => {

    it('should warn that required props are not present', () => {
        spyOn(console, 'error');

        let vm = new Vue({
            mixins: [RatingItem]
        });

        expect(console.error.calls.count()).toEqual(3);
    });

    it('should set the default props', () => {
        // Use mixin and suppress prop warnings
        var Component = Vue.extend({
            mixins: [RatingItem],
            props: dProps
        })

        var component = new Component();
        let props = component.$props;

        expect(props.fill).toEqual(0);
        expect(props.size).toEqual(50);
        expect(props.borderColor).toBe("#999");
        expect(props.borderWidth).toEqual(0);
        expect(props.spacing).toEqual(0);
        expect(props.customProps).toEqual({});
        expect(props.rtl).toBeFalsy();
    });

    it('should set a random fillId for the rating item', () => {
        // Use mixin and suppress prop warnings
        var Component = Vue.extend({
            mixins: [RatingItem],
            props: dProps
        })

        var component = new Component();

        expect(component.$data.fillId).not.toBe("");
    })


    it('should return the fillId markup for the rating item', () => {
        // Use mixin and suppress prop warnings
        var Component = Vue.extend({
            mixins: [RatingItem],
            props: dProps
        })

        var component = new Component();

        expect(component.getFillId).toBe("url(#" + component.fillId + ")");
    })

  it('should return the current fill level percentage', () => {
        // Use mixin and suppress prop warnings
        var Component = Vue.extend({
            mixins: [RatingItem],
            props: dProps
        })

        var component = new Component();
        component.fill = 45;

        expect(component.getFill).toBe('45%');
  });


  it('should return the current fill level percentage when using rtl', () => {
        // Use mixin and suppress prop warnings
        var Component = Vue.extend({
            mixins: [RatingItem],
            props: dProps
        })

        var component = new Component();
        component.fill = 45;
        component.$props.rtl = true;

        // RTL reverses the inactive and active colors, so this fill level actually refers the the inactive color
        expect(component.getFill).toBe('55%');
  });

    it('should emit the selected event', () => {
        // Use mixin and suppress prop warnings
        var Component = Vue.extend({
            mixins: [RatingItem],
            props: dProps
        })

        var component = new Component();
        component.index = 1;

        spyOn(component, 'getPosition').and.returnValue(25);
        spyOn(component, '$emit');

        component.selected();

        expect(component.getPosition).toHaveBeenCalled();
        expect(component.$emit).toHaveBeenCalledWith('selected', { id: 1, position: 25 })
    });

    it('should emit the mouse-move event', () => {
        // Use mixin and suppress prop warnings
        var Component = Vue.extend({
            mixins: [RatingItem],
            props: dProps
        })

        var component = new Component();
        component.index = 1;

        spyOn(component, 'getPosition').and.returnValue(25);
        spyOn(component, '$emit');

        component.mouseMoving({});

        expect(component.getPosition).toHaveBeenCalled();
        expect(component.$emit).toHaveBeenCalledWith('mouse-move', {event: {}, id: 1, position: 25 })
    });
});
