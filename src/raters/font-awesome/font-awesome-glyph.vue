<script type="text/javascript">
import FaBaseGlyph from './FaBaseGlyph.vue'

export default FaBaseGlyph.extend({
    created() {
        this.updateGlyph()
    },
    methods: {
        updateGlyph() {
            this.points = [this.customProps.glyph]
        }
    }
})
</script>
