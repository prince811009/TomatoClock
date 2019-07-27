import Vue from 'vue';
import normalize from 'normalize.css';
import VueChart from 'vue-chart';
import App from './App.vue';
import { store } from './store';
import 'vue-material-design-icons/styles.css';

Vue.use(normalize);
Vue.use(VueChart);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  store,
}).$mount('#app');
