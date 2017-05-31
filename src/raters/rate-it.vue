<script type="text/javascript">
import BaseRating from './BaseRating.vue'
export default BaseRating.extend({
    name: 'rate-it',
    props: {
        with: {
            type: Function,
            required: true
        }
    },
    created() {
        if (this.with !== undefined) {
            this.type = this.with
        }
    },
    watch: {
        with(val) {
            this.type = val
        }
    }
})
</script>
