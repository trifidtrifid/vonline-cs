'use strict';

var $ = require('jquery');
// Чтобы Angular испольщовал нормальный jQuery
global.jQuery = global.$ = $;

var angular = require('angular');
if (!angular.version) {
    // эта версия Angular не работает с require
    angular = global.angular;
}

require('jcrop');
require('bootstrap');
require('jquery-ui');
require('datepicker');
require('ace-extra');
require('ace-elements');
require('ace');
require('fancybox');
require('bootbox');

var Thrift = require('thrift');
global.Thrift = Thrift;

console.log('2',Thrift,global.Thrift);

require('bedata_types');
require('messageservice_types');
require('MessageService');
require('DialogService');
require('userservice_types');
require('UserService');
require('authservice_types');
require('AuthService');
require('utilityservces_types');
require('UtilityService');
require('fileutils_types');
require('FileService');
require('business_types');
require('BusinessService');

require('./angular/sanitize.js');
require('./angular/linky-custom.js');
require('./angular/angular-file-upload.js');
require('./angular/ya-map-2.1.min.js');
require('./bower_components/select2/select2.min.js');
require('./bower_components/angular-ui-select2/src/select2.js');
require('./angular/ng-infinite-scroll.js');

require('angular-ui-router');
require('angular-bootstrap');

require('./directives.js');
require('./services');
require('./controllers');

var main = angular.module('forum', [
  //'ngRoute',
  'ui.router',
  'angularFileUpload',
 /* 'forum.filters',*/
  'forum.services',
  'forum.directives',
  //'forum.controllers',
  'VOControllers'
])
    .config(require('./config'));

