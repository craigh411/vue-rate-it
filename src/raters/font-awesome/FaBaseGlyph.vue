<script type="text/javascript">
import Path from '../../templates/Path.vue'

export default Path.extend({
    props: {
        customProps: {
            required: true,
            type: Object
        }
    },
    created() {
        this.coords.x1 = '-2%'
    },
    data() {
        return {
            points: [],
            originalWidth: 179,
            originalHeight: 179,
            pathAttrs: {
                'transform': 'scale(0.1)'
            }
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
