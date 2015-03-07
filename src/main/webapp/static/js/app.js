'use strict';

/*require('./thrift.js');
require('../../gen-js/bedata_types.js');
require('../../gen-js/messageservice_types.js');
require('../../gen-js/MessageService.js');
require('../../gen-js/DialogService.js');
require('../../gen-js/userservice_types.js');
require('../../gen-js/UserService.js');
require('../../gen-js/authservice_types.js');
require('../../gen-js/AuthService.js');
require('../../gen-js/utilityservces_types.js');
require('../../gen-js/UtilityService.js');
require('../../gen-js/fileutils_types.js');
require('../../gen-js/FileService.js');
require('../../gen-js/business_types.js');
require('../../gen-js/BusinessService.js');*/

var c = require('./common.js')();
console.log('c2',c);

require('./directives.js');
require('./services.js');
require('./controllers');

require('angular-ui-router');
require('angular-file-upload');

var main = angular.module('forum', [
  //'ngRoute',
  'ui.router',
 /* 'forum.filters',*/
  'forum.services',
  'forum.directives',
  //'forum.controllers',
  'VOControllers',
  'angularFileUpload'
])
    .config(require('./config'));

