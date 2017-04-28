import { RateIt } from '../src/index';


describe('rate-it', () => {
    it('should require a "with" prop', () => {
        spyOn(console, 'error');
        new RateIt();
        expect(console.error).toHaveBeenCalled();
    });


    it('should set the type as the "when" prop', () => {

        let Component = RateIt.extend({
            props: {
                with: {
                    // Just mock a String to make comparison easier
                    type: String,
                    default: "foo"
                }
            }
        });

        let rateIt = new Component();

        expect(rateIt.$data.type).toBe("foo");
    });


});
