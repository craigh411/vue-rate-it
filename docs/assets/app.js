import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue'

import Home from './components/views/Home.vue';
import Stars from './components/views/Stars.vue';
import Hearts from './components/views/Hearts.vue';
import Images from './components/views/Images.vue';
import FA from './components/views/FontAwesome.vue';
import Extending from './components/views/Extending.vue';

Vue.use(VueRouter);

const routes = [
    { path: '/', component: Home },
    { path: '/docs/stars', component: Stars },
    { path: '/docs/hearts', component: Hearts },
    { path: '/docs/images', component: Images },
    { path: '/docs/font-awesome', component: FA},
        { path: '/extending', component: Extending}
]

const router = new VueRouter({
    routes
})

const app = new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
