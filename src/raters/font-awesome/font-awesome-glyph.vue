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
    created() {
        let glyph = this.customProps.glyph;
        this.points = [Glyphs[glyph]];
    },
    data() {
        return {
            points: [],
            originalWidth: 179,
            originalHeight: 179,
            pathAttrs: {
                "transform": "scale(0.1)"
            }
        }
    }
});
</script>
