<script type="text/javascript">
import BaseRating from '../BaseRating.vue'
import Star from './star.vue'

export default BaseRating.extend({
    name: 'Star-Rating',
    components: {
        Star
    },
    data() {
        return {
            type: 'star'
        }
    }
})
</script>
