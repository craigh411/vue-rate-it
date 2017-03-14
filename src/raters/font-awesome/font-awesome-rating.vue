<script type="text/javascript">
import BaseRating from '../BaseRating.vue';
import FaGlyph from './font-awesome-glyph.vue';

export default BaseRating.extend({
    name: 'FA-Rating',
    components: {
        FaGlyph
    },
    created(){
      this.customProps['glyph'] = this.fa;
    },
    props: {
      fa: {
        type: String,
        default: 'flash'
      }
    },
    data() {
        return {
            type: 'fa-glyph'
        }
    }
});
</script>

<style scoped>
.inline {
    display: inline-flex;
    margin-left:5px;
}
</style>
