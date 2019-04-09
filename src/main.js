import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import Code from './components/Code.vue';

Vue.config.productionTip = false;

Vue.use(VueRouter);
const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '*',
      name: 'code-component',
      component: Code,
    },
  ],
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
