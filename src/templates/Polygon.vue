<template>
        <svg :width="getWidth" :height="getHeight" @mousemove="mouseMoving" @click="selected" style="overflow:visible;">
            <linearGradient :id="fillId" x1="0" x2="100%" y1="0" y2="0">
                <stop :offset="getFill" :stop-color="(rtl) ? inactiveColor : activeColor" />
                <stop :offset="getFill" :stop-color="(rtl) ? activeColor : inactiveColor" />
            </linearGradient>
            <polygon :points="pointsToString" :fill="getFillId" :stroke="borderColor" :stroke-width="borderWidth" />
            <polygon :points="pointsToString" :fill="getFillId" />
        </svg>

</template>

<script type="text/javascript">
import Vue from 'vue'
import RatingItem from '../mixins/RatingItem.js'
export default Vue.extend({
    mixins: [RatingItem],
    created() {
        this.calculatePoints()
    },
    methods: {
        calculatePoints() {
            this.points = this.points.map((point) => {
                return ((this.size / this.originalWidth) * point) + (this.borderWidth * (this.borders / 2))
            })
        }
    },
    data() {
        return {
            points: []
        }
    }
})
</script>
