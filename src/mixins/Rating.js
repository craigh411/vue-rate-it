export default {
    props: {
        increment: {
            type: Number,
            default: 1
        },
        rating: {
            type: Number,
            default: 0
        },
        activeColor: {
            type: String,
            default: "#ffd055"
        },
        inactiveColor: {
            type: String,
            default: "#d8d8d8"
        },
        maxRating: {
            type: Number,
            default: 5
        },
        itemSize: {
            type: Number,
            default: 50
        },
        showRating: {
            type: Boolean,
            default: true
        },
        readOnly: {
            type: Boolean,
            default: false
        },
        textClass: {
            type: String,
            default: ""
        },
        inline: {
            type: Boolean,
            default: false
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
        this.step = this.increment * 100;
        this.currentRating = this.rating;
        this.selectedRating = this.rating;
        this.createRating();
    },
    methods: {
        setRating($event, persist) {
            if (!this.readOnly) {
                let position = $event.position / 100;
                this.currentRating = (($event.id + position) - 1).toFixed(2);
                this.currentRating = (this.currentRating > this.maxRating) ? this.maxRating : this.currentRating;
                this.createRating();
                if (persist) {
                    this.selectedRating = this.currentRating;
                    this.$emit('rating-selected', this.selectedRating);
                } else {
                    this.$emit('current-rating', this.currentRating);
                }
            }
        },
        resetRating() {
            if (!this.readOnly) {
                this.currentRating = this.selectedRating;
                this.createRating();
            }
        },
        createRating() {
            this.round();
            for (var i = 0; i < this.maxRating; i++) {
                let level = 0;
                if (i < this.currentRating) {
                    level = (this.currentRating - i > 1) ? 100 : (this.currentRating - i) * 100;
                }
                this.$set(this.fillLevel, i, Math.round(level));
            }
        },
        round() {
            var inv = 1.0 / this.increment;
            this.currentRating = Math.ceil(this.currentRating * inv) / inv;
        }
    },
    watch: {
        rating(val) {
            this.currentRating = val;
            this.selectedRating = val;
            this.createRating();
        }
    },
    data() {
        return {
            step: 0,
            fillLevel: [],
            currentRating: 0,
            selectedRating: 0,
            customProps: {}
        }
    }
}
