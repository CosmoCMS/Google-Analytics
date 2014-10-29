angular.module('googleAnalytics', [])
    .directive('googleAnalytics', ['$window', '$location', 'Page', function($window, $location, Page){
        return {
            scope: {
                googleAnalytics: '@'
            },
            link: function(scope, elm, attrs){
                // Initialize Google Analytics object to store the last page visited
                if(!Page.misc.googleAnalytics){
                    Page.misc.googleAnalytics = {};
                    Page.misc.googleAnalytics.lastPage = '';
                }
                
                if(typeof ga === 'undefined'){
                    // Standard Google Analytics Tracking Code
                    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
                    
                    ga('create', 'UA-33501417-1', 'kauaiheritageproperties.com');
                    ga('send', 'pageview', { page: $location.path() });
                    Page.misc.googleAnalytics.lastPage = $location.path();
                } else {
                    if(Page.misc.googleAnalytics.lastPage !== $location.path())
                        $window.ga('send', 'pageview', { page: $location.path() });
                    
                    Page.misc.googleAnalytics.lastPage = $location.path();
                }
                
                // Watch for registration
                /*
                scope.$on('register', function(){
                    _gaq.push(['_trackEvent', 'Users', 'Registration', 'User registered', '1']);
                });
                */
                // Watch for signin
                
                // Watch for comments
            }
        };
    }]);