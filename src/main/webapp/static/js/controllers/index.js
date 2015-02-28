'use strict';

module.exports = angular.module('VOControllers', [])
    // Иерархия контроллеров
    .controller('aboutCtrl', require('./about.js'))
;