import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import CodeToMusic from './components/CodeToMusic.vue';

Vue.config.productionTip = false;

Vue.use(VueRouter);
const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '*',
      name: 'code-to-music-component',
      component: CodeToMusic,
    },
  ],
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
