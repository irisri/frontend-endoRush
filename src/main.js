import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './assets/styles/styles.scss'
import elementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import VueCarousel from 'vue-carousel';
import Gallery from "vue-cover-gallery";
import VModal from 'vue-js-modal'

Vue.use(Gallery);
Vue.use(VueCarousel);
Vue.use(elementUI);
Vue.use(VModal)
locale.use(lang)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
