<template>
    <div>
        <nav-menu></nav-menu>
        <div class="ui container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script type="text/javascript">
import NavMenu from './components/NavMenu.vue';
export default {
    components: {
        NavMenu
    }
}
</script>
