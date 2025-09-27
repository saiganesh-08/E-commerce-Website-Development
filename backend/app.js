var app = angular.module('eshopApp', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
        .when("/", {template: "<h2>Welcome to E-Shop!</h2>"})
        .when("/products", {template: "<h2>Products</h2>"})
        .when("/cart", {template: "<h2>Cart</h2>"})
        .when("/orders", {template: "<h2>Orders</h2>"})
        .when("/login", {template: "<h2>Login</h2>"})
        .when("/register", {template: "<h2>Register</h2>"})
        .otherwise({redirectTo: "/"});
});

app.controller('MainController', function() {
    var vm = this;
    vm.cartItemCount = 0;
    vm.user = null; // replace with actual user object after authentication
});
