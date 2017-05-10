'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    props: {
        fill: {
            type: Number,
            default: 0
        },
        size: {
            type: Number,
            default: 50
        },
        index: {
            type: Number,
            required: true
        },
        activeColor: {
            type: String,
            required: true
        },
        inactiveColor: {
            type: String,
            required: true
        },
        borderColor: {
            type: String,
            default: "#999"
        },
        borderWidth: {
            type: Number,
            default: 0
        },
        spacing: {
            type: Number,
            default: 0
        },
        customProps: {
            type: Object,
            default: function _default() {
                return {};
            }
        }
    },
    created: function created() {
        this.fillId = Math.random().toString(36).substring(7);
    },

    computed: {
        pointsToString: function pointsToString() {
            return this.points.join(',');
        },
        getFillId: function getFillId() {
            return 'url(#' + this.fillId + ')';
        },
        getWidth: function getWidth() {
            return parseInt(this.size) + parseInt(this.borderWidth * this.borders);
        },
        getHeight: function getHeight() {
            return this.originalHeight / this.originalWidth * this.getWidth;
        },
        getFill: function getFill() {
            return this.fill + "%";
        },
        getSpacing: function getSpacing() {
            return this.spacing + this.borderWidth / 2 + "px";
        }
    },
    methods: {
        mouseMoving: function mouseMoving($event) {
            this.$emit('mouse-move', {
                event: $event,
                position: this.getPosition($event),
                id: this.index
            });
        },
        getPosition: function getPosition($event) {
            // calculate position in percentage.
            var width = 92 / 100 * (this.size + this.borderWidth);
            var position = Math.round(100 / width * $event.offsetX);
            return Math.min(position, 100);
        },
        selected: function selected($event) {
            this.$emit('selected', {
                id: this.index,
                position: this.getPosition($event)
            });
        }
    },
    data: function data() {
        return {
            fillId: '',
            originalWidth: 50,
            orignalHeight: 50,
            borders: 1
        };
    }
};