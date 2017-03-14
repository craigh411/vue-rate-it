<script type="text/javascript">
import BaseRating from '../BaseRating.vue';
import Heart from './heart.vue';
export default BaseRating.extend({
    name: 'Heart-Rating',
    components: {
        Heart
    },
    props: {
        padding: {
        	type: Number,
            default: 5
        },
        activeColor: {
            type: String,
            default: "#d80000"
        },
        inactiveColor:{
        	type: String,
        	default: "#ffc4c4"
        },
        borderColor: {
        	type: String,
        	default: "#8b0000"
        }
    },
    data() {
        return {
            type: 'heart'
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
