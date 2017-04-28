import Vue from 'vue';
import {FaBaseGlyph} from '../src/index.js';
import {fa_star} from '../glyphs';

describe('FaBaseGlyph', () => {

	it('should allow the glyph points to be set', () => {
		let Component = FaBaseGlyph.extend({
			created(){
				this.points = [fa_star]
			}
		})
        spyOn(console,'error'); // Suppress required props messages for testing
        let rater = new Component();

		expect(rater.$data.points).toEqual([fa_star]);
	});

})