<template>
    <div :class="['rating', {inline: inline}]">
        <div @mouseleave="resetRating" class="rating">
            <span v-for="n in maxRating" :class="[{pointer: !readOnly }, 'rating-item']">
              <component :is="type" :fill="fillLevel[n-1]" :size="itemSize" :index="n" :step="step" :active-color="activeColor" :inactive-color="inactiveColor" :border-color="borderColor" :border-width="borderWidth" :padding="padding" @selected="setRating($event, true)" @mouse-move="setRating"></component>
            </span>
            <span v-if="showRating" :class="['rating-text', textClass]"> {{currentRating}}</span>
        </div>
    </div>
</template>

<script type="text/javascript">
import Vue from 'vue';
import Rating from '../mixins/Rating.js';


export default Vue.extend({
     mixins: [Rating]
});

</script>

<style scoped>
.rating-item {
    display: inline-block;
}
.pointer {
    cursor: pointer;
}
.rating {
    display: flex;
    align-items: center;
}
.inline {
    display: inline-flex;
}
.rating-text {
    margin-top: 7px;
    margin-left: 7px;
}
</style>