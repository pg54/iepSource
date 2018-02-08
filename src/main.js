import 'es6-promise/auto';
import Vue from 'vue';
import App from './app';
import router from './router';
import store from './vuex/store';
import Vuex from 'vuex';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import iView from 'iview';
import helper from './util/helper.js';
import 'iview/dist/styles/iview.css';
// import api from './api/index.js';
import './assets/iconfont/iconfont.css'


Vue.use(Vuex);
Vue.use(ElementUI);
Vue.use(iView);
Vue.use(helper);

router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        next()
    } else {
        let token = localStorage.getItem('accessToken');
        if (token) {
            if (to.path == "/" ||to.path == "" ) {
                let fullFuction = localStorage.getItem('isfullFuction')? true: false
                    if (fullFuction) {
                          next({
                              path: '/dynamicConsultation'
                          });
                      } else {
                          next({
                              path: '/studentFile'
                          });
                      }
              } else {
                next();
              }

            
        } else {
            next({
                path: "/login"
            });
        }
    }
})


new Vue({ // eslint-disable-line
  el: '#app',
  router: router,
  store,
  render: h => h(App)
});
