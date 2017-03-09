export default {
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
        padding: {
            type: Number,
            default: 0
        }
    },
    created() {
        this.calculatePoints;
        this.grad = Math.random().toString(36).substring(7);
    },
    computed: {
        calculatePoints() {
            this.points = this.points.map((point) => {
                return ((this.size / this.base) * point) + (this.borderWidth * 1.5);
            });
        },
        pointsToString() {
            return this.points.join(',');
        },
        getGradId() {
            return 'url(#' + this.grad + ')';
        },
        getSize() {
            return parseInt(this.size) + parseInt(this.borderWidth * 3) + this.padding;
        },
        getFill() {
            return this.fill + "%";
        }
    },
    methods: {
        mouseMoving($event) {
            this.$emit('mouse-move', {
                event: $event,
                position: this.getPosition($event),
                id: this.index
            })
        },
        getPosition($event) {
            // calculate position in percentage.
            var width = (92 / 100) * this.size;
            var position = Math.round((100 / width) * $event.offsetX);
            return (position > 100) ? 100 : position;
        },
        selected($event) {
            this.$emit('selected', {
                id: this.index,
                position: this.getPosition($event)
            })
        }
    },
    data() {
        return {
            points: [],
            grad: '',
            base: 50
        }
    }
}