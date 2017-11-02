<template>
    <div :style="{display:'inline-block', 'margin-right': getSpacing}">
        <svg :width="getWidth" :height="getHeight" :viewBox="getViewbox" @mousemove="mouseMoving" @click="selected" style="overflow:visible;">
            <linearGradient :id="fillId" v-bind="coords">
                <stop :offset="getFill" :stop-color="(rtl) ? inactiveColor : activeColor" />
                <stop :offset="getFill" :stop-color="(rtl) ? activeColor : inactiveColor" />
            </linearGradient>

            <path v-bind="pathAttrs" :d="pointsToString" :fill="getFillId" :stroke="borderColor" :stroke-width="borderWidth" vector-effect="non-scaling-stroke" />
            <path  v-bind="pathAttrs" :d="pointsToString" :fill="getFillId" />
        </svg>
    </div>
</template>

<script type="text/javascript">
import Vue from 'vue'
import RatingItem from '../mixins/RatingItem.js'
export default Vue.extend({
    mixins: [RatingItem],
    computed: {
        getViewbox() {
            return '0 0 ' + this.originalWidth + ' ' + this.originalHeight
        },
        getFill() {
            // Account for any adjustment to the x1 coordinate of the LinearGradient
            const adjustment = (this.fill / 100) * Math.abs(this.x1Val)
            const adjustedFill = (this.x1Val > 0) ? (this.fill - adjustment) : (this.fill + adjustment)
            return (this.rtl) ? 100 - adjustedFill + '%' : adjustedFill + '%'

        },
        x1Val() {
            return parseInt(this.coords.x1.replace('%'))
        }
    },
    data() {
        return {
            points: [],
            pathAttrs: {},
            coords: { x1: '0%', x2: '100%', y1: '0%', y2: '0%' }
        }
    }
})
</script>
