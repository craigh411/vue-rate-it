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
        this.updateGlyph();
        this.coords.x1="-2%";
    },
    methods: {
        updateGlyph() {
            let glyph = this.customProps.glyph.replace(/^fa\-/, "");
            this.points = [Glyphs[glyph]];
        }
    },
    data() {
        return {
            points: [],
            originalWidth: 179,
            originalHeight: 179,
            pathAttrs: {
                "transform": "scale(0.1)"
            },
        }
    }
});
</script>

<style>
.rating-container.inline {
    display: inline-flex;
    margin-left: 5px;
    margin-right: 1px;
}
</style>
