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
<<<<<<< HEAD
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// import { VueFlux, Transitions } from 'vue-flux';


// Vue.use(VueFlux)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
=======

>>>>>>> 57ab9e4ba30dacede52cd3d93e53ee51164ceff5
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
