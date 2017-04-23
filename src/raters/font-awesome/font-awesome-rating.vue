<script type="text/javascript">
import BaseRating from '../BaseRating.vue';
import FaGlyph from './font-awesome-glyph.vue';

export default BaseRating.extend({
    name: 'Fa-Rating',
    components: {
        FaGlyph
    },
    created(){
      this.customProps['glyph'] = this.glyph;
    },
    props: {
      glyph: {
        type: String,
        required: true
      }
    },
    data() {
        return {
            type: 'fa-glyph'
        }
    }
});
</script>
