import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue'

import Home from './components/views/Home.vue';
import Stars from './components/views/Stars.vue';
import Images from './components/views/Images.vue';

Vue.use(VueRouter);

const routes = [
    { path: '/', component: Home },
    { path: '/docs/stars', component: Stars },
    { path: '/docs/images', component: Images }

]

const router = new VueRouter({
    routes
})

const app = new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
