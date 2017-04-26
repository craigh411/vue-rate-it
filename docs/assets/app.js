import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue'

Vue.use(VueRouter);

const Home = resolve => {
    require.ensure([], () => {
        resolve(require('./components/views/Home.vue'))
    }, 'Home')
}
const Stars = resolve => {
    require.ensure([], () => {
        resolve(require('./components/views/Stars.vue'))
    }, 'Stars')
}
const Hearts = resolve => {
    require.ensure([], () => {
        resolve(require('./components/views/Hearts.vue'))
    }, 'Hearts')
}

const Images = resolve => {
    require.ensure([], () => {
        resolve(require('./components/views/Images.vue'))
    }, 'Images')
}

const Fa = resolve => {
    require.ensure([], () => {
        resolve(require('./components/views/FontAwesome.vue'))
    }, 'Font Awesome')
}

const Extending = resolve => {
    require.ensure([], () => {
        resolve(require('./components/views/Extending.vue'))
    }, 'Extending')
}

const routes = [
    { path: '/', component: Home },
    { path: '/docs/stars', component: Stars },
    { path: '/docs/hearts', component: Hearts },
    { path: '/docs/images', component: Images },
    { path: '/docs/font-awesome', component: Fa }, 
    { path: '/extending', component: Extending}
]

const router = new VueRouter({
    routes
})

const app = new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
