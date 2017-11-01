<script type="text/javascript">
import BaseRating from '../BaseRating.vue'
import FaGlyph from './font-awesome-glyph.vue'

export default BaseRating.extend({
    name: 'Fa-Rating',
    components: {
        FaGlyph
    },
    props: {
        glyph: {
            type: String,
            required: true
        },
        activeColor: {
            type: String,
            default: '#000'
        }
    },
    created() {
        this.customProps['glyph'] = this.glyph
    },
    data() {
        return {
            type: 'fa-glyph'
        }
    }
})
</script>
