import Vue from 'vue'
import Rating from '../src/mixins/Rating.js'

describe('rating mixin', () => {
    it('should set the default props', () => {
        let vm = new Vue({
            mixins: [Rating]
        });

        let props = vm.$props;

        expect(props.increment).toEqual(1);
        expect(props.rating).toEqual(0);
        expect(props.activeColor).toBe("#ffd055");
        expect(props.inactiveColor).toBe("#d8d8d8");
        expect(props.maxRating).toEqual(5);
        expect(props.itemSize).toEqual(50);
        expect(props.showRating).toBeTruthy();
        expect(props.readOnly).toBeFalsy();
        expect(props.textClass).toBe("");
        expect(props.inline).toBeFalsy();
        expect(props.borderColor).toBe("#999");
        expect(props.borderWidth).toEqual(2);
        expect(props.spacing).toEqual(0);
    })

    it('should init the default data', () => {
        let vm = new Vue({
            mixins: [Rating]
        });

        let data = vm.$data;

        expect(data.step).toEqual(100);
        expect(data.fillLevel).toEqual([0, 0, 0, 0, 0]);
        expect(data.currentRating).toEqual(0);
        expect(data.selectedRating).toEqual(0);
        expect(data.customProps).toEqual({});
    });

    it('should round the currentRating to the given increment', () => {
        let vm = new Vue({
            mixins: [Rating]
        });

        let data = vm.$data;

        vm.$props.increment = 0.5;
        data.currentRating = 1.1;
        vm.round();
        expect(data.currentRating).toEqual(1.5);

    })

    it('should set the rating based on the current mouse position', () => {
        let vm = new Vue({
            mixins: [Rating]
        });

        vm.$props.increment = 0.5;
        // Mock mouse position
        let event = {
            position: 45, // percentage position within individual star
            id: 3 // The star that is being moused over
        }

        vm.setRating(event);
        expect(vm.$data.currentRating).toEqual(2.5)
    });

    it('should emit the current rating', () => {
        let vm = new Vue({
            mixins: [Rating]
        });

        spyOn(vm, '$emit')

        // Mock mouse position
        let event = {
            position: 45, // percentage position within individual star
            id: 3 // The star that is being moused over
        }

        vm.setRating(event);
        expect(vm.$emit).toHaveBeenCalledWith('current-rating', 3);
    });

    it('should emit the selected rating', () => {
        let vm = new Vue({
            mixins: [Rating]
        });

        spyOn(vm, '$emit')

        // Mock mouse position
        let event = {
            position: 45, // percentage position within individual star
            id: 3 // The star that is being moused over
        }

        vm.setRating(event, true);
        expect(vm.$emit).toHaveBeenCalledWith('rating-selected', 3);
    });

    it('should not set the rating when readOnly', () => {
        let vm = new Vue({
            mixins: [Rating]
        });
        vm.$props.readOnly = true;

        spyOn(vm, 'createRating');
        vm.setRating();
        expect(vm.createRating).not.toHaveBeenCalled();

    });


    it('should set the current rating to the selected rating', () => {
        let vm = new Vue({
            mixins: [Rating]
        });

        vm.$data.selectedRating = 3;
        vm.$data.currentRating = 4;
        vm.resetRating();

        expect(vm.$data.currentRating).toEqual(3);
    })

    it('should set the fillLevels to the currentRating', () => {
        let vm = new Vue({
            mixins: [Rating]
        });

        vm.$props.increment = 0.5;
        vm.$data.currentRating = 3.5;

        spyOn(vm, 'round');
        vm.createRating();

        expect(vm.round).toHaveBeenCalled();
        expect(vm.$data.fillLevel).toEqual([100, 100, 100, 50, 0]);
    })
});
