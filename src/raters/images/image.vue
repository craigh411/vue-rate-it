<template>
    <div :style="{display:'inline-block', 'margin-right': getSpacing}">
        <svg :width="getWidth" :height="getHeight" @mousemove="mouseMoving" @click="selected">
            <mask x="0" y="0" :id="fillId">
                <rect fill="#fff" :width="getFill" height="100%" />
            </mask>

            <image :xlink:href="src" :mask="getFillId" :height="getHeight" :width="getWidth" />
            <image :xlink:href="src" :height="getHeight" :width="getWidth" :style="getOpacity" />
        </svg>
    </div>
</template>

<script type="text/javascript">
import Vue from 'vue';
import RatingItem from '../../mixins/es5/RatingItem.js';
export default Vue.extend({
    mixins: [RatingItem],
    created() {
        this.opacity = this.customProps.opacity;
        this.src = this.customProps.src;

        let img = new Image();
        img.onload = () => {
           this.originalHeight = img.height;
           this.originalWidth = img.width;
        };
         img.src = this.src;
    },
    computed: {
        getOpacity() {
            return "opacity:" + this.opacity;
        }
    },
    data() {
        return {
            points: [],
            originalWidth: 400,
            originalHeight: 300,
            borders: 0,
            opacity: 0.1
        }
    }
});
</script>
