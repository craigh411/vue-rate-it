<script type="text/javascript">
import FaBaseGlyph from './FaBaseGlyph.vue';
import Glyphs from '../../../glyphs.js';

export default FaBaseGlyph.extend({
    created() {
        this.updateGlyph();
    },
    methods: {
        updateGlyph() {
            let glyph = this.customProps.glyph.replace(/^fa\-/, "");
            this.points = [Glyphs[glyph]];
        }
    }
});
</script>
