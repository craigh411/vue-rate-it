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
            default: '#999'
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
            default: function() {
                return {}
            }
        },
        rtl:{
            type: Boolean,
            default: false
        }
    },
    created() {
        this.fillId = Math.random().toString(36).substring(7)
    },
    computed: {
        pointsToString() {
            return this.points.join(',')
        },
        getFillId() {
            return 'url(#' + this.fillId + ')'
        },
        getWidth() {
            return parseInt(this.size) + parseInt(this.borderWidth * this.borders)
        },
        getHeight() {
            return (this.originalHeight / this.originalWidth) * this.getWidth
        },
        getFill() {
            return (this.rtl) ? 100 - this.fill + '%' : this.fill + '%'
        },
        getSpacing() {
            return (this.spacing + (this.borderWidth / 2)) + 'px'
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
            var width = (92 / 100) * (this.size + this.borderWidth)
            const offset = (this.rtl) ? Math.min($event.offsetX, 45) : Math.max($event.offsetX, 1)
            var position = Math.round((100 / width) * offset)

            return Math.min(position, 100)
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
            fillId: '',
            originalWidth: 50,
            orignalHeight: 50,
            borders: 1
        }
    }
}
