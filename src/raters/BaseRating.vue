<template>
    <div :class="['vue-rate-it-rating', {'vue-rate-it-rtl':rtl}, {'vue-rate-it-inline': inline}, 'vue-rate-it-rating-container']">
        <div @mouseleave="resetRating" class="vue-rate-it-rating">
            <div v-for="n in maxRating" :class="[{'vue-rate-it-pointer': !readOnly }, 'vue-rate-it-rating-item']">
              <component 
              :is="type" 
              :fill="fillLevel[n-1]" 
              :size="itemSize" 
              :index="n" 
              :step="step" 
              :active-color="activeColor" 
              :inactive-color="inactiveColor" 
              :border-color="borderColor" 
              :border-width="borderWidth" 
              :spacing="spacing" 
              @selected="setRating($event, true)" 
              @mouse-move="setRating" 
              :custom-props="customProps" 
              :rtl="rtl"></component>
            </div>
            <span v-if="showRating" :class="['vue-rate-it-rating-text', textClass]"> {{formattedRating}}</span>
        </div>
    </div>
</template>

<script type="text/javascript">
import Vue from 'vue'
import Rating from '../mixins/Rating.js'

export default Vue.extend({
    mixins: [Rating],
    data() {
        return {
            type: ''
        }
    }
})

</script>

<style scoped>
.vue-rate-it-rating-item {
    display: inline-block;
}
.vue-rate-it-pointer {
    cursor: pointer;
}
.vue-rate-it-rating {
    display: flex;
    align-items: center;
}
.vue-rate-it-inline {
    display: inline-flex;
}
.vue-rate-it-rating-text {
    margin-top: 7px;
    margin-left: 7px;
}

.vue-rate-it-rtl {
    direction: rtl;
}

.vue-rate-it-rtl .vue-rate-it-rating-text {
    margin-right: 10px;
    direction:rtl;
}

</style>
