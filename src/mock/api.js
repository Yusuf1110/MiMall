import Mock from "mockjs";

Mock.mock('/api/user/cart', {
    "status": 0,
    "data": {
        productMainImage: "/imgs/detail/phone-2.jpg",
        productSubtitle: "xxxx",
        productName: "小米机皇",
        productPrice: 1799,
        cartTotalPrice: 1799,
    }
});