angular.module("angApp")

    .directive('stopEvent', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                element.bind("click touchstart", function (e) {
                    e.stopPropagation();
                });
            }
        };
    })

    .directive('stopEventPrevent', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                element.bind("click touchstart", function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                });
            }
        };
    })

    .directive('spinner', function() {
        return {
            template: '<div class="spinner"><div class="dot bounce1"></div><div class="dot bounce2"></div><div class="dot bounce3"></div></div>',
            link: function(scope, elem, attr) {
                var dots = $(elem).find(".dot");
                dots.addClass(attr.spinnerColor || "black");
            }
        };
    });
