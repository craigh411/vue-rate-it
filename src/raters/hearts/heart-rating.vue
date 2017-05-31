<script type="text/javascript">
import BaseRating from '../BaseRating.vue'
import Heart from './heart.vue'
export default BaseRating.extend({
    name: 'Heart-Rating',
    components: {
        Heart
    },
    props: {
        borderWidth: {
            type: Number,
            default: 3
        },
        activeColor: {
            type: String,
            default: '#d80000'
        },
        inactiveColor: {
            type: String,
            default: '#ffc4c4'
        },
        borderColor: {
            type: String,
            default: '#8b0000'
        }
    },
    data() {
        return {
            type: 'heart'
        }
    }
})
</script>

<style>
.rating-container.inline {
    display: inline-flex;
    margin-left: 5px;
    margin-right: 1px;
}
</style>
