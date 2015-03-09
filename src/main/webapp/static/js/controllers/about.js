'use strict';

var aboutCtrl = function($rootScope) {

    $rootScope.base.isFooterBottom = true;

    $('.ng-cloak').removeClass('ng-cloak');

};

module.exports = [ '$rootScope', aboutCtrl ];