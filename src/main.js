import firebase from 'firebase/app';
import Vue from 'vue';
import Vuelidate from 'vuelidate';
import VueMeta from 'vue-meta';
import dateFilter from '@/filters/date.filter';
import currencyFilter from '@/filters/currency.filter';
import localizeFilter from '@/filters/localize.filter';
import messagePlugin from '@/utils/message.plugin';
import tooltipDirective from '@/directives/tooltip.directive';
import Loader from '@/components/app/Loader.vue';
import Paginate from 'vuejs-paginate';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import 'materialize-css/dist/js/materialize.min';

import 'firebase/auth';
import 'firebase/database';

Vue.config.productionTip = false;

Vue.filter('date', dateFilter);
Vue.filter('currency', currencyFilter);
Vue.filter('localize', localizeFilter);
Vue.directive('tooltip', tooltipDirective);
Vue.use(Vuelidate);
Vue.use(VueMeta);
Vue.use(messagePlugin);
Vue.component('Loader', Loader);
Vue.component('Paginate', Paginate);

firebase.initializeApp({
  apiKey: 'AIzaSyDnTYrNnPOePAD0buOI_DflizWKsHZvkgs',
  authDomain: 'vue-crm-2d82b.firebaseapp.com',
  projectId: 'vue-crm-2d82b',
  storageBucket: 'vue-crm-2d82b.appspot.com',
  messagingSenderId: '394082080173',
  appId: '1:394082080173:web:36fe2ff3be2b22cb013d24',
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app');
  }
});
