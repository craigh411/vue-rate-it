import StarRating from './raters/stars/star-rating.vue'
import HeartRating from './raters/hearts/heart-rating.vue'
import FaRating from './raters/font-awesome/font-awesome-rating.vue'
import ImageRating from './raters/images/image-rating.vue'
import BaseRating from './raters/BaseRating.vue'
import RateIt from './raters/rate-it.vue'
import mixins from './mixins/index.js'
import FaBaseGlyph from './raters/font-awesome/FaBaseGlyph.vue'
import Path from './templates/Path.vue'
import Polygon from './templates/Polygon.vue'

const raters = {
    StarRating,
    HeartRating,
    FaRating,
    ImageRating
}

// export raters by default
export default raters

export {
    mixins,
    StarRating,
    HeartRating,
    FaRating,
    ImageRating,
    BaseRating,
    FaBaseGlyph,
    RateIt,
    Path,
    Polygon
}
