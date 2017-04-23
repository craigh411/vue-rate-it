<template>
    <div :style="{display:'inline-block', 'margin-right': getSpacing}">
        <svg :width="getWidth" :height="getHeight" @mousemove="mouseMoving" @click="selected">
            <linearGradient :id="grad" x1="0" x2="100%" y1="0" y2="0">
                <stop :offset="getFill" :stop-color="activeColor" />
                <stop :offset="getFill" :stop-color="inactiveColor" />
            </linearGradient>
            <polygon :points="pointsToString" :fill="getGradId" :stroke="borderColor" :stroke-width="borderWidth" />
            <polygon :points="pointsToString" :fill="getGradId" />
        </svg>
    </div>
</template>

<script type="text/javascript">
import Vue from 'vue';
import RatingItem from '../mixins/RatingItem.js';
export default Vue.extend({
    mixins: [RatingItem]
});
</script>
