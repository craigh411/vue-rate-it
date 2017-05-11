<template>
    <div id="app">
        <rate-it :with="faStar"></rate-it>
    </div>
</template>

<script type="text/javascript">

import faStar from './components/fa-star.vue';
import {RateIt} from '../../dist/vue-rate-it.min.js';

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
