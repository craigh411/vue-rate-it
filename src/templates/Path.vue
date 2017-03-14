<template>
    <div :style="{display:'inline-block', 'padding-left': getPadding}">
        <svg :width="getWidth" :height="getHeight" :viewBox="getViewbox" @mousemove="mouseMoving" @click="selected" style="overflow:visible;">
            <linearGradient :id="grad" x1="0" x2="100%" y1="0" y2="0">
                <stop :offset="getFill" :stop-color="activeColor" />
                <stop :offset="getFill" :stop-color="inactiveColor" />
            </linearGradient>

            <path v-bind="pathAttrs" :d="pointsToString" :fill="getGradId" :stroke="borderColor" :stroke-width="borderWidth" vector-effect="non-scaling-stroke" />
            <path  v-bind="pathAttrs" :d="pointsToString" :fill="getGradId" />
        </svg>
    </div>
</template>

<script type="text/javascript">
import Vue from 'vue';
import RatingItem from '../mixins/RatingItem.js';
export default Vue.extend({
    mixins: [RatingItem],
    computed: {
        getViewbox() {
            return "0 0 " + this.originalWidth + " " + this.originalHeight;
        },
        getPadding() {
            return (this.padding + (this.borderWidth / 2)) + "px";
        }
    },
    methods: {
        calculatePoints() {}
    },
    data() {
        return {
            pathAttrs: {}
        }
    }
});
</script>
