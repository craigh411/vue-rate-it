import StarRating from './raters/stars/star-rating.vue';
import HeartRating from './raters/hearts/heart-rating.vue';
import FaRating from './raters/font-awesome/font-awesome-rating.vue';
import ImageRating from './raters/images/image-rating.vue';
import BaseRating from './raters/BaseRating.vue';
import mixins from './mixins/index.js'

const raters = {
    StarRating,
    HeartRating,
    FaRating,
    ImageRating
}

// export raters by default
export default raters;

export {
    mixins,
    StarRating,
    HeartRating,
    FaRating,
    ImageRating,
    BaseRating
}
