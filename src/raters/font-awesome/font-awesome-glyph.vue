<script type="text/javascript">
import Path from '../../templates/Path.vue';
import Glyphs from './glyphs.js';
export default Path.extend({
	props: {
		customProps: {
			required: true,
			type: Object
		}
	},
	created(){
	  let glyph = this.customProps.glyph;
      this.points = [Glyphs[glyph]];
	},
    data() {
        return {
         points: ["M1536 1312v-1120q0 -50 -34 -89t-86 -60.5t-103.5 -32t-96.5 -10.5t-96.5 10.5t-103.5 32t-86 60.5t-34 89t34 89t86 60.5t103.5 32t96.5 10.5q105 0 192 -39v537l-768 -237v-709q0 -50 -34 -89t-86 -60.5t-103.5 -32t-96.5 -10.5t-96.5 10.5t-103.5 32t-86 60.5t-34 89 t34 89t86 60.5t103.5 32t96.5 10.5q105 0 192 -39v967q0 31 19 56.5t49 35.5l832 256q12 4 28 4q40 0 68 -28t28 -68z"],
            originalWidth: 179,
            originalHeight: 179,
            borders: 1,
            pathAttrs: {"transform": "scale(0.1)"}
        }
    }
});
</script>
