<script type="text/javascript">
import BaseRating from '../BaseRating.vue'
import CImage from './image.vue'
export default BaseRating.extend({
    name: 'Image-Rating',
    props: {
        backgroundOpacity: {
            default: 0.2,
            type: Number
        },
        src: {
            type: String,
            required: true
        }
    },
    created() {
        this.customProps['opacity'] = this.backgroundOpacity
        this.customProps['src'] = this.src
    },
    components: {
        CImage
    },
    data() {
        return {
            type: 'c-image'
        }
    }
})
</script>
