import Router from "vue-router";
import Vue from "vue";
import Home from "./pages/home";
import Index from "./pages/index";


Vue.use(Router);

export default new Router({
    routes: [{
            path: "/",
            name: "home",
            component: Home,
            redirect: "index",
            children: [{
                    path: "/index",
                    name: "index",
                    component: Index,
                },
                {
                    path: "/product/:id",
                    name: "product",
                    // component: resolve => require(['./pages/product.vue'], resolve) //路由懒加载（方法1）
                    component: () =>
                        import ('./pages/product.vue') //用插件加载（方法2）
                },
                {
                    path: "/detail/:id",
                    name: "detail",
                    component: () =>
                        import ('./pages/detail.vue')
                },
            ],
        },
        {
            path: "/login",
            name: "login",
            component: () =>
                import ('./pages/login.vue')
        },
        {
            path: "/cart",
            name: "cart",
            component: () =>
                import ('./pages/cart.vue')
        },
        {
            path: "/order",
            name: "order",
            component: () =>
                import ('./pages/order.vue'),
            children: [{
                    path: "Confirm",
                    name: "order-Confirm",
                    component: () =>
                        import ('./pages/orderConfirm.vue')
                },
                {
                    path: "list",
                    name: "order-list",
                    component: () =>
                        import ('./pages/orderList.vue')
                },
                {
                    path: "pay",
                    name: "order-pay",
                    component: () =>
                        import ('./pages/orderPay.vue')
                },
                {
                    path: "alipay",
                    name: "alipay",
                    component: () =>
                        import ('./pages/alipay.vue')
                },
            ],
        },
    ],
});