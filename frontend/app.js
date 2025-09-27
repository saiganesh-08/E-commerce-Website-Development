// AngularJS E-commerce Application
// Main application module and configuration

(function() {
    'use strict';

    // Define the main AngularJS module
    var app = angular.module('ecommerceApp', [
        'ngRoute',      // For routing
        'ngCookies',    // For cookie management
        'ngSanitize'    // For HTML sanitization
    ]);

    // Application Configuration
    app.config(['$routeProvider', '$locationProvider', '$httpProvider', 
        function($routeProvider, $locationProvider, $httpProvider) {

        // Enable HTML5 mode for clean URLs
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        // Configure routing
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'HomeController',
                controllerAs: 'vm'
            })
            .when('/products', {
                templateUrl: 'views/products.html',
                controller: 'ProductController',
                controllerAs: 'vm'
            })
            .when('/product/:id', {
                templateUrl: 'views/product-detail.html',
                controller: 'ProductDetailController',
                controllerAs: 'vm'
            })
            .when('/cart', {
                templateUrl: 'views/cart.html',
                controller: 'CartController',
                controllerAs: 'vm'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'AuthController',
                controllerAs: 'vm'
            })
            .when('/register', {
                templateUrl: 'views/register.html',
                controller: 'AuthController',
                controllerAs: 'vm'
            })
            .when('/profile', {
                templateUrl: 'views/profile.html',
                controller: 'ProfileController',
                controllerAs: 'vm',
                requireAuth: true
            })
            .when('/orders', {
                templateUrl: 'views/orders.html',
                controller: 'OrderController',
                controllerAs: 'vm',
                requireAuth: true
            })
            .when('/admin', {
                templateUrl: 'views/admin/dashboard.html',
                controller: 'AdminController',
                controllerAs: 'vm',
                requireAuth: true,
                requireAdmin: true
            })
            .otherwise({
                redirectTo: '/'
            });

        // Configure HTTP interceptor for authentication
        $httpProvider.interceptors.push('authInterceptor');
    }]);

    // Application Run Block
    app.run(['$rootScope', '$location', 'AuthService', function($rootScope, $location, AuthService) {
        
        // Check authentication on route change
        $rootScope.$on('$routeChangeStart', function(event, next, current) {
            
            // Check if route requires authentication
            if (next.requireAuth) {
                if (!AuthService.isAuthenticated()) {
                    event.preventDefault();
                    $location.path('/login');
                    return;
                }
            }
            
            // Check if route requires admin privileges
            if (next.requireAdmin) {
                if (!AuthService.isAdmin()) {
                    event.preventDefault();
                    $location.path('/');
                    return;
                }
            }
        });

        // Global error handling
        $rootScope.$on('$routeChangeError', function(event, current, previous, rejection) {
            console.error('Route change error:', rejection);
            $location.path('/');
        });
    }]);

    // Main Application Controller
    app.controller('MainController', ['$scope', '$location', 'AuthService', 'CartService',
        function($scope, $location, AuthService, CartService) {
            var vm = this;

            // Initialize controller
            vm.init = function() {
                vm.user = AuthService.getCurrentUser();
                vm.cartItemCount = CartService.getItemCount();
                vm.isAuthenticated = AuthService.isAuthenticated();
            };

            // Navigation methods
            vm.goToProducts = function() {
                $location.path('/products');
            };

            vm.goToCart = function() {
                $location.path('/cart');
            };

            vm.goToProfile = function() {
                $location.path('/profile');
            };

            vm.logout = function() {
                AuthService.logout();
                vm.user = null;
                vm.isAuthenticated = false;
                $location.path('/');
            };

            // Search functionality
            vm.searchQuery = '';
            vm.search = function() {
                if (vm.searchQuery.trim()) {
                    $location.path('/products').search('q', vm.searchQuery);
                }
            };

            // Listen for authentication changes
            $scope.$on('auth:login', function() {
                vm.user = AuthService.getCurrentUser();
                vm.isAuthenticated = true;
            });

            $scope.$on('auth:logout', function() {
                vm.user = null;
                vm.isAuthenticated = false;
            });

            // Listen for cart changes
            $scope.$on('cart:updated', function() {
                vm.cartItemCount = CartService.getItemCount();
            });

            // Initialize controller
            vm.init();
        }
    ]);

    // Authentication Interceptor
    app.factory('authInterceptor', ['$q', '$location', 'AuthService',
        function($q, $location, AuthService) {
            return {
                request: function(config) {
                    // Add authentication token to requests
                    var token = AuthService.getToken();
                    if (token) {
                        config.headers.Authorization = 'Bearer ' + token;
                    }
                    return config;
                },
                
                responseError: function(response) {
                    // Handle authentication errors
                    if (response.status === 401) {
                        AuthService.logout();
                        $location.path('/login');
                    }
                    return $q.reject(response);
                }
            };
        }
    ]);

    // Global Constants
    app.constant('API_CONFIG', {
        baseUrl: 'http://localhost:5000/api',
        timeout: 10000,
        endpoints: {
            auth: {
                login: '/auth/login',
                register: '/auth/register',
                logout: '/auth/logout',
                profile: '/auth/profile'
            },
            products: {
                base: '/products',
                search: '/products/search',
                categories: '/products/categories'
            },
            cart: {
                base: '/cart',
                add: '/cart/add',
                update: '/cart/update',
                remove: '/cart/remove'
            },
            orders: {
                base: '/orders',
                create: '/orders/create',
                history: '/orders/history'
            },
            admin: {
                dashboard: '/admin/dashboard',
                users: '/admin/users',
                products: '/admin/products',
                orders: '/admin/orders'
            }
        }
    });

    // Global Utility Filters
    app.filter('currency', function() {
        return function(amount) {
            return '$' + parseFloat(amount).toFixed(2);
        };
    });

    app.filter('truncate', function() {
        return function(text, length, end) {
            if (!text) return '';
            if (isNaN(length)) length = 100;
            if (end === undefined) end = '...';
            
            if (text.length <= length || text.length - end.length <= length) {
                return text;
            } else {
                return String(text).substring(0, length - end.length) + end;
            }
        };
    });

    // Initialize application when DOM is ready
    angular.element(document).ready(function() {
        console.log('AngularJS E-commerce Application Initialized');
        angular.bootstrap(document, ['ecommerceApp']);
    });

})();
