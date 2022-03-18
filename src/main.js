import Vue from "vue";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import store from "./store";
import App from "./App.vue";
import VueLazyload from "vue-lazyload";
import VueCookie from "vue-cookie";
//import env from './env'

//mock开关
const mock = true;
if (mock) {
    require("./mock/api");
}
//根据前端的跨域方式做调整
//采用接口代理
axios.defaults.baseURL = "/api";
//根据环境变量获取不同的请求地址
//axios.defaults.baseURL = env.baseURL;
//请求拦截超时
axios.defaults.timeout = 8000;
//接口错误拦截
axios.interceptors.response.use(function(response) {
    let res = response.data;
    if (res.status == 0) {
        return res.data;
    } else if (res.status == 10) {

        // if (location.hash != '#/index/') {
        //     window.location.href = "/#/login";
        // }
    } else {
        alert(res.msg);
        return Promise.reject();
    }
});
Vue.use(VueLazyload, {
    loading: "/imgs/loading-svg/loading-bars.svg",
});
Vue.use(VueAxios, axios);
Vue.use(VueCookie);

Vue.config.productionTip = false;

new Vue({
    store,
    router,
    render: (h) => h(App),
}).$mount("#app");