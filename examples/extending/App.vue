<template>
    <div id="app">
        <rate-it :with="faStar"></rate-it>
    </div>
</template>

<script type="text/javascript">
import RateIt from '../../src/raters/rate-it.vue';
import faStar from './components/fa-star.vue';
export default {
    components: {
        RateIt
    },
    data() {
        return {
            faStar: faStar
        }
    }
}
</script>
