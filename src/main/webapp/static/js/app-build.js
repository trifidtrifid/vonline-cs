(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\node_modules\\angular-file-upload\\dist\\angular-file-upload.min.js":[function(require,module,exports){
/*! 1.6.4 */
!function(){var a=angular.module("angularFileUpload",[]);a.service("$upload",["$http","$q","$timeout",function(a,b,c){function d(d){d.method=d.method||"POST",d.headers=d.headers||{},d.transformRequest=d.transformRequest||function(b,c){return window.ArrayBuffer&&b instanceof window.ArrayBuffer?b:a.defaults.transformRequest[0](b,c)};var e=b.defer();window.XMLHttpRequest.__isShim&&(d.headers.__setXHR_=function(){return function(a){a&&(d.__XHR=a,d.xhrFn&&d.xhrFn(a),a.upload.addEventListener("progress",function(a){e.notify(a)},!1),a.upload.addEventListener("load",function(a){a.lengthComputable&&e.notify(a)},!1))}}),a(d).then(function(a){e.resolve(a)},function(a){e.reject(a)},function(a){e.notify(a)});var f=e.promise;return f.success=function(a){return f.then(function(b){a(b.data,b.status,b.headers,d)}),f},f.error=function(a){return f.then(null,function(b){a(b.data,b.status,b.headers,d)}),f},f.progress=function(a){return f.then(null,null,function(b){a(b)}),f},f.abort=function(){return d.__XHR&&c(function(){d.__XHR.abort()}),f},f.xhr=function(a){return d.xhrFn=function(b){return function(){b&&b.apply(f,arguments),a.apply(f,arguments)}}(d.xhrFn),f},f}this.upload=function(b){b.headers=b.headers||{},b.headers["Content-Type"]=void 0,b.transformRequest=b.transformRequest||a.defaults.transformRequest;var c=new FormData,e=b.transformRequest,f=b.data;return b.transformRequest=function(a,c){if(f)if(b.formDataAppender)for(var d in f){var g=f[d];b.formDataAppender(a,d,g)}else for(var d in f){var g=f[d];if("function"==typeof e)g=e(g,c);else for(var h=0;h<e.length;h++){var i=e[h];"function"==typeof i&&(g=i(g,c))}a.append(d,g)}if(null!=b.file){var j=b.fileFormDataName||"file";if("[object Array]"===Object.prototype.toString.call(b.file))for(var k="[object String]"===Object.prototype.toString.call(j),h=0;h<b.file.length;h++)a.append(k?j:j[h],b.file[h],b.fileName&&b.fileName[h]||b.file[h].name);else a.append(j,b.file,b.fileName||b.file.name)}return a},b.data=c,d(b)},this.http=function(a){return d(a)}}]),a.directive("ngFileSelect",["$parse","$timeout",function(a,b){return function(c,d,e){var f=a(e.ngFileSelect);if("input"!==d[0].tagName.toLowerCase()||"file"!==(d.attr("type")&&d.attr("type").toLowerCase())){for(var g=angular.element('<input type="file">'),h=0;h<d[0].attributes.length;h++)g.attr(d[0].attributes[h].name,d[0].attributes[h].value);d.attr("data-multiple")&&g.attr("multiple","true"),g.css("top",0).css("bottom",0).css("left",0).css("right",0).css("width","100%").css("opacity",0).css("position","absolute").css("filter","alpha(opacity=0)"),d.append(g),(""===d.css("position")||"static"===d.css("position"))&&d.css("position","relative"),d=g}d.bind("change",function(a){var d,e,g=[];if(d=a.__files_||a.target.files,null!=d)for(e=0;e<d.length;e++)g.push(d.item(e));b(function(){f(c,{$files:g,$event:a})})})}}]),a.directive("ngFileDropAvailable",["$parse","$timeout",function(a,b){return function(c,d,e){if("draggable"in document.createElement("span")){var f=a(e.ngFileDropAvailable);b(function(){f(c)})}}}]),a.directive("ngFileDrop",["$parse","$timeout","$location",function(a,b,c){return function(d,e,f){function g(a){return/^[\000-\177]*$/.test(a)}function h(a,d){var e=[],f=a.dataTransfer.items;if(f&&f.length>0&&f[0].webkitGetAsEntry&&"file"!=c.protocol()&&f[0].webkitGetAsEntry().isDirectory)for(var h=0;h<f.length;h++){var j=f[h].webkitGetAsEntry();null!=j&&(g(j.name)?i(e,j):e.push(f[h].getAsFile()))}else{var k=a.dataTransfer.files;if(null!=k)for(var h=0;h<k.length;h++)e.push(k.item(h))}!function m(a){b(function(){l?m(10):d(e)},a||0)}()}function i(a,b){if(null!=b)if(b.isDirectory){var c=b.createReader();l++,c.readEntries(function(b){for(var c=0;c<b.length;c++)i(a,b[c]);l--})}else l++,b.file(function(b){l--,a.push(b)})}if("draggable"in document.createElement("span")){var j=null;e[0].addEventListener("dragover",function(c){if(c.stopPropagation(),c.preventDefault(),b.cancel(j),!e[0].__drag_over_class_)if(f.ngFileDragOverClass.search(/\) *$/)>-1){dragOverClassFn=a(f.ngFileDragOverClass);var g=dragOverClassFn(d,{$event:c});e[0].__drag_over_class_=g}else e[0].__drag_over_class_=f.ngFileDragOverClass||"dragover";e.addClass(e[0].__drag_over_class_)},!1),e[0].addEventListener("dragenter",function(a){a.stopPropagation(),a.preventDefault()},!1),e[0].addEventListener("dragleave",function(){j=b(function(){e.removeClass(e[0].__drag_over_class_),e[0].__drag_over_class_=null},f.ngFileDragOverDelay||1)},!1);var k=a(f.ngFileDrop);e[0].addEventListener("drop",function(a){a.stopPropagation(),a.preventDefault(),e.removeClass(e[0].__drag_over_class_),e[0].__drag_over_class_=null,h(a,function(b){k(d,{$files:b,$event:a})})},!1);var l=0}}}])}();
},{}],"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\node_modules\\angular-ui-router\\release\\angular-ui-router.js":[function(require,module,exports){
/**
 * State-based routing for AngularJS
 * @version v0.2.13
 * @link http://angular-ui.github.com/
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

/* commonjs package manager support (eg componentjs) */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){
  module.exports = 'ui.router';
}

(function (window, angular, undefined) {
/*jshint globalstrict:true*/
/*global angular:false*/
'use strict';

var isDefined = angular.isDefined,
    isFunction = angular.isFunction,
    isString = angular.isString,
    isObject = angular.isObject,
    isArray = angular.isArray,
    forEach = angular.forEach,
    extend = angular.extend,
    copy = angular.copy;

function inherit(parent, extra) {
  return extend(new (extend(function() {}, { prototype: parent }))(), extra);
}

function merge(dst) {
  forEach(arguments, function(obj) {
    if (obj !== dst) {
      forEach(obj, function(value, key) {
        if (!dst.hasOwnProperty(key)) dst[key] = value;
      });
    }
  });
  return dst;
}

/**
 * Finds the common ancestor path between two states.
 *
 * @param {Object} first The first state.
 * @param {Object} second The second state.
 * @return {Array} Returns an array of state names in descending order, not including the root.
 */
function ancestors(first, second) {
  var path = [];

  for (var n in first.path) {
    if (first.path[n] !== second.path[n]) break;
    path.push(first.path[n]);
  }
  return path;
}

/**
 * IE8-safe wrapper for `Object.keys()`.
 *
 * @param {Object} object A JavaScript object.
 * @return {Array} Returns the keys of the object as an array.
 */
function objectKeys(object) {
  if (Object.keys) {
    return Object.keys(object);
  }
  var result = [];

  angular.forEach(object, function(val, key) {
    result.push(key);
  });
  return result;
}

/**
 * IE8-safe wrapper for `Array.prototype.indexOf()`.
 *
 * @param {Array} array A JavaScript array.
 * @param {*} value A value to search the array for.
 * @return {Number} Returns the array index value of `value`, or `-1` if not present.
 */
function indexOf(array, value) {
  if (Array.prototype.indexOf) {
    return array.indexOf(value, Number(arguments[2]) || 0);
  }
  var len = array.length >>> 0, from = Number(arguments[2]) || 0;
  from = (from < 0) ? Math.ceil(from) : Math.floor(from);

  if (from < 0) from += len;

  for (; from < len; from++) {
    if (from in array && array[from] === value) return from;
  }
  return -1;
}

/**
 * Merges a set of parameters with all parameters inherited between the common parents of the
 * current state and a given destination state.
 *
 * @param {Object} currentParams The value of the current state parameters ($stateParams).
 * @param {Object} newParams The set of parameters which will be composited with inherited params.
 * @param {Object} $current Internal definition of object representing the current state.
 * @param {Object} $to Internal definition of object representing state to transition to.
 */
function inheritParams(currentParams, newParams, $current, $to) {
  var parents = ancestors($current, $to), parentParams, inherited = {}, inheritList = [];

  for (var i in parents) {
    if (!parents[i].params) continue;
    parentParams = objectKeys(parents[i].params);
    if (!parentParams.length) continue;

    for (var j in parentParams) {
      if (indexOf(inheritList, parentParams[j]) >= 0) continue;
      inheritList.push(parentParams[j]);
      inherited[parentParams[j]] = currentParams[parentParams[j]];
    }
  }
  return extend({}, inherited, newParams);
}

/**
 * Performs a non-strict comparison of the subset of two objects, defined by a list of keys.
 *
 * @param {Object} a The first object.
 * @param {Object} b The second object.
 * @param {Array} keys The list of keys within each object to compare. If the list is empty or not specified,
 *                     it defaults to the list of keys in `a`.
 * @return {Boolean} Returns `true` if the keys match, otherwise `false`.
 */
function equalForKeys(a, b, keys) {
  if (!keys) {
    keys = [];
    for (var n in a) keys.push(n); // Used instead of Object.keys() for IE8 compatibility
  }

  for (var i=0; i<keys.length; i++) {
    var k = keys[i];
    if (a[k] != b[k]) return false; // Not '===', values aren't necessarily normalized
  }
  return true;
}

/**
 * Returns the subset of an object, based on a list of keys.
 *
 * @param {Array} keys
 * @param {Object} values
 * @return {Boolean} Returns a subset of `values`.
 */
function filterByKeys(keys, values) {
  var filtered = {};

  forEach(keys, function (name) {
    filtered[name] = values[name];
  });
  return filtered;
}

// like _.indexBy
// when you know that your index values will be unique, or you want last-one-in to win
function indexBy(array, propName) {
  var result = {};
  forEach(array, function(item) {
    result[item[propName]] = item;
  });
  return result;
}

// extracted from underscore.js
// Return a copy of the object only containing the whitelisted properties.
function pick(obj) {
  var copy = {};
  var keys = Array.prototype.concat.apply(Array.prototype, Array.prototype.slice.call(arguments, 1));
  forEach(keys, function(key) {
    if (key in obj) copy[key] = obj[key];
  });
  return copy;
}

// extracted from underscore.js
// Return a copy of the object omitting the blacklisted properties.
function omit(obj) {
  var copy = {};
  var keys = Array.prototype.concat.apply(Array.prototype, Array.prototype.slice.call(arguments, 1));
  for (var key in obj) {
    if (indexOf(keys, key) == -1) copy[key] = obj[key];
  }
  return copy;
}

function pluck(collection, key) {
  var result = isArray(collection) ? [] : {};

  forEach(collection, function(val, i) {
    result[i] = isFunction(key) ? key(val) : val[key];
  });
  return result;
}

function filter(collection, callback) {
  var array = isArray(collection);
  var result = array ? [] : {};
  forEach(collection, function(val, i) {
    if (callback(val, i)) {
      result[array ? result.length : i] = val;
    }
  });
  return result;
}

function map(collection, callback) {
  var result = isArray(collection) ? [] : {};

  forEach(collection, function(val, i) {
    result[i] = callback(val, i);
  });
  return result;
}

/**
 * @ngdoc overview
 * @name ui.router.util
 *
 * @description
 * # ui.router.util sub-module
 *
 * This module is a dependency of other sub-modules. Do not include this module as a dependency
 * in your angular app (use {@link ui.router} module instead).
 *
 */
angular.module('ui.router.util', ['ng']);

/**
 * @ngdoc overview
 * @name ui.router.router
 * 
 * @requires ui.router.util
 *
 * @description
 * # ui.router.router sub-module
 *
 * This module is a dependency of other sub-modules. Do not include this module as a dependency
 * in your angular app (use {@link ui.router} module instead).
 */
angular.module('ui.router.router', ['ui.router.util']);

/**
 * @ngdoc overview
 * @name ui.router.state
 * 
 * @requires ui.router.router
 * @requires ui.router.util
 *
 * @description
 * # ui.router.state sub-module
 *
 * This module is a dependency of the main ui.router module. Do not include this module as a dependency
 * in your angular app (use {@link ui.router} module instead).
 * 
 */
angular.module('ui.router.state', ['ui.router.router', 'ui.router.util']);

/**
 * @ngdoc overview
 * @name ui.router
 *
 * @requires ui.router.state
 *
 * @description
 * # ui.router
 * 
 * ## The main module for ui.router 
 * There are several sub-modules included with the ui.router module, however only this module is needed
 * as a dependency within your angular app. The other modules are for organization purposes. 
 *
 * The modules are:
 * * ui.router - the main "umbrella" module
 * * ui.router.router - 
 * 
 * *You'll need to include **only** this module as the dependency within your angular app.*
 * 
 * <pre>
 * <!doctype html>
 * <html ng-app="myApp">
 * <head>
 *   <script src="js/angular.js"></script>
 *   <!-- Include the ui-router script -->
 *   <script src="js/angular-ui-router.min.js"></script>
 *   <script>
 *     // ...and add 'ui.router' as a dependency
 *     var myApp = angular.module('myApp', ['ui.router']);
 *   </script>
 * </head>
 * <body>
 * </body>
 * </html>
 * </pre>
 */
angular.module('ui.router', ['ui.router.state']);

angular.module('ui.router.compat', ['ui.router']);

/**
 * @ngdoc object
 * @name ui.router.util.$resolve
 *
 * @requires $q
 * @requires $injector
 *
 * @description
 * Manages resolution of (acyclic) graphs of promises.
 */
$Resolve.$inject = ['$q', '$injector'];
function $Resolve(  $q,    $injector) {
  
  var VISIT_IN_PROGRESS = 1,
      VISIT_DONE = 2,
      NOTHING = {},
      NO_DEPENDENCIES = [],
      NO_LOCALS = NOTHING,
      NO_PARENT = extend($q.when(NOTHING), { $$promises: NOTHING, $$values: NOTHING });
  

  /**
   * @ngdoc function
   * @name ui.router.util.$resolve#study
   * @methodOf ui.router.util.$resolve
   *
   * @description
   * Studies a set of invocables that are likely to be used multiple times.
   * <pre>
   * $resolve.study(invocables)(locals, parent, self)
   * </pre>
   * is equivalent to
   * <pre>
   * $resolve.resolve(invocables, locals, parent, self)
   * </pre>
   * but the former is more efficient (in fact `resolve` just calls `study` 
   * internally).
   *
   * @param {object} invocables Invocable objects
   * @return {function} a function to pass in locals, parent and self
   */
  this.study = function (invocables) {
    if (!isObject(invocables)) throw new Error("'invocables' must be an object");
    var invocableKeys = objectKeys(invocables || {});
    
    // Perform a topological sort of invocables to build an ordered plan
    var plan = [], cycle = [], visited = {};
    function visit(value, key) {
      if (visited[key] === VISIT_DONE) return;
      
      cycle.push(key);
      if (visited[key] === VISIT_IN_PROGRESS) {
        cycle.splice(0, indexOf(cycle, key));
        throw new Error("Cyclic dependency: " + cycle.join(" -> "));
      }
      visited[key] = VISIT_IN_PROGRESS;
      
      if (isString(value)) {
        plan.push(key, [ function() { return $injector.get(value); }], NO_DEPENDENCIES);
      } else {
        var params = $injector.annotate(value);
        forEach(params, function (param) {
          if (param !== key && invocables.hasOwnProperty(param)) visit(invocables[param], param);
        });
        plan.push(key, value, params);
      }
      
      cycle.pop();
      visited[key] = VISIT_DONE;
    }
    forEach(invocables, visit);
    invocables = cycle = visited = null; // plan is all that's required
    
    function isResolve(value) {
      return isObject(value) && value.then && value.$$promises;
    }
    
    return function (locals, parent, self) {
      if (isResolve(locals) && self === undefined) {
        self = parent; parent = locals; locals = null;
      }
      if (!locals) locals = NO_LOCALS;
      else if (!isObject(locals)) {
        throw new Error("'locals' must be an object");
      }       
      if (!parent) parent = NO_PARENT;
      else if (!isResolve(parent)) {
        throw new Error("'parent' must be a promise returned by $resolve.resolve()");
      }
      
      // To complete the overall resolution, we have to wait for the parent
      // promise and for the promise for each invokable in our plan.
      var resolution = $q.defer(),
          result = resolution.promise,
          promises = result.$$promises = {},
          values = extend({}, locals),
          wait = 1 + plan.length/3,
          merged = false;
          
      function done() {
        // Merge parent values we haven't got yet and publish our own $$values
        if (!--wait) {
          if (!merged) merge(values, parent.$$values); 
          result.$$values = values;
          result.$$promises = result.$$promises || true; // keep for isResolve()
          delete result.$$inheritedValues;
          resolution.resolve(values);
        }
      }
      
      function fail(reason) {
        result.$$failure = reason;
        resolution.reject(reason);
      }

      // Short-circuit if parent has already failed
      if (isDefined(parent.$$failure)) {
        fail(parent.$$failure);
        return result;
      }
      
      if (parent.$$inheritedValues) {
        merge(values, omit(parent.$$inheritedValues, invocableKeys));
      }

      // Merge parent values if the parent has already resolved, or merge
      // parent promises and wait if the parent resolve is still in progress.
      extend(promises, parent.$$promises);
      if (parent.$$values) {
        merged = merge(values, omit(parent.$$values, invocableKeys));
        result.$$inheritedValues = omit(parent.$$values, invocableKeys);
        done();
      } else {
        if (parent.$$inheritedValues) {
          result.$$inheritedValues = omit(parent.$$inheritedValues, invocableKeys);
        }        
        parent.then(done, fail);
      }
      
      // Process each invocable in the plan, but ignore any where a local of the same name exists.
      for (var i=0, ii=plan.length; i<ii; i+=3) {
        if (locals.hasOwnProperty(plan[i])) done();
        else invoke(plan[i], plan[i+1], plan[i+2]);
      }
      
      function invoke(key, invocable, params) {
        // Create a deferred for this invocation. Failures will propagate to the resolution as well.
        var invocation = $q.defer(), waitParams = 0;
        function onfailure(reason) {
          invocation.reject(reason);
          fail(reason);
        }
        // Wait for any parameter that we have a promise for (either from parent or from this
        // resolve; in that case study() will have made sure it's ordered before us in the plan).
        forEach(params, function (dep) {
          if (promises.hasOwnProperty(dep) && !locals.hasOwnProperty(dep)) {
            waitParams++;
            promises[dep].then(function (result) {
              values[dep] = result;
              if (!(--waitParams)) proceed();
            }, onfailure);
          }
        });
        if (!waitParams) proceed();
        function proceed() {
          if (isDefined(result.$$failure)) return;
          try {
            invocation.resolve($injector.invoke(invocable, self, values));
            invocation.promise.then(function (result) {
              values[key] = result;
              done();
            }, onfailure);
          } catch (e) {
            onfailure(e);
          }
        }
        // Publish promise synchronously; invocations further down in the plan may depend on it.
        promises[key] = invocation.promise;
      }
      
      return result;
    };
  };
  
  /**
   * @ngdoc function
   * @name ui.router.util.$resolve#resolve
   * @methodOf ui.router.util.$resolve
   *
   * @description
   * Resolves a set of invocables. An invocable is a function to be invoked via 
   * `$injector.invoke()`, and can have an arbitrary number of dependencies. 
   * An invocable can either return a value directly,
   * or a `$q` promise. If a promise is returned it will be resolved and the 
   * resulting value will be used instead. Dependencies of invocables are resolved 
   * (in this order of precedence)
   *
   * - from the specified `locals`
   * - from another invocable that is part of this `$resolve` call
   * - from an invocable that is inherited from a `parent` call to `$resolve` 
   *   (or recursively
   * - from any ancestor `$resolve` of that parent).
   *
   * The return value of `$resolve` is a promise for an object that contains 
   * (in this order of precedence)
   *
   * - any `locals` (if specified)
   * - the resolved return values of all injectables
   * - any values inherited from a `parent` call to `$resolve` (if specified)
   *
   * The promise will resolve after the `parent` promise (if any) and all promises 
   * returned by injectables have been resolved. If any invocable 
   * (or `$injector.invoke`) throws an exception, or if a promise returned by an 
   * invocable is rejected, the `$resolve` promise is immediately rejected with the 
   * same error. A rejection of a `parent` promise (if specified) will likewise be 
   * propagated immediately. Once the `$resolve` promise has been rejected, no 
   * further invocables will be called.
   * 
   * Cyclic dependencies between invocables are not permitted and will caues `$resolve`
   * to throw an error. As a special case, an injectable can depend on a parameter 
   * with the same name as the injectable, which will be fulfilled from the `parent` 
   * injectable of the same name. This allows inherited values to be decorated. 
   * Note that in this case any other injectable in the same `$resolve` with the same
   * dependency would see the decorated value, not the inherited value.
   *
   * Note that missing dependencies -- unlike cyclic dependencies -- will cause an 
   * (asynchronous) rejection of the `$resolve` promise rather than a (synchronous) 
   * exception.
   *
   * Invocables are invoked eagerly as soon as all dependencies are available. 
   * This is true even for dependencies inherited from a `parent` call to `$resolve`.
   *
   * As a special case, an invocable can be a string, in which case it is taken to 
   * be a service name to be passed to `$injector.get()`. This is supported primarily 
   * for backwards-compatibility with the `resolve` property of `$routeProvider` 
   * routes.
   *
   * @param {object} invocables functions to invoke or 
   * `$injector` services to fetch.
   * @param {object} locals  values to make available to the injectables
   * @param {object} parent  a promise returned by another call to `$resolve`.
   * @param {object} self  the `this` for the invoked methods
   * @return {object} Promise for an object that contains the resolved return value
   * of all invocables, as well as any inherited and local values.
   */
  this.resolve = function (invocables, locals, parent, self) {
    return this.study(invocables)(locals, parent, self);
  };
}

angular.module('ui.router.util').service('$resolve', $Resolve);


/**
 * @ngdoc object
 * @name ui.router.util.$templateFactory
 *
 * @requires $http
 * @requires $templateCache
 * @requires $injector
 *
 * @description
 * Service. Manages loading of templates.
 */
$TemplateFactory.$inject = ['$http', '$templateCache', '$injector'];
function $TemplateFactory(  $http,   $templateCache,   $injector) {

  /**
   * @ngdoc function
   * @name ui.router.util.$templateFactory#fromConfig
   * @methodOf ui.router.util.$templateFactory
   *
   * @description
   * Creates a template from a configuration object. 
   *
   * @param {object} config Configuration object for which to load a template. 
   * The following properties are search in the specified order, and the first one 
   * that is defined is used to create the template:
   *
   * @param {string|object} config.template html string template or function to 
   * load via {@link ui.router.util.$templateFactory#fromString fromString}.
   * @param {string|object} config.templateUrl url to load or a function returning 
   * the url to load via {@link ui.router.util.$templateFactory#fromUrl fromUrl}.
   * @param {Function} config.templateProvider function to invoke via 
   * {@link ui.router.util.$templateFactory#fromProvider fromProvider}.
   * @param {object} params  Parameters to pass to the template function.
   * @param {object} locals Locals to pass to `invoke` if the template is loaded 
   * via a `templateProvider`. Defaults to `{ params: params }`.
   *
   * @return {string|object}  The template html as a string, or a promise for 
   * that string,or `null` if no template is configured.
   */
  this.fromConfig = function (config, params, locals) {
    return (
      isDefined(config.template) ? this.fromString(config.template, params) :
      isDefined(config.templateUrl) ? this.fromUrl(config.templateUrl, params) :
      isDefined(config.templateProvider) ? this.fromProvider(config.templateProvider, params, locals) :
      null
    );
  };

  /**
   * @ngdoc function
   * @name ui.router.util.$templateFactory#fromString
   * @methodOf ui.router.util.$templateFactory
   *
   * @description
   * Creates a template from a string or a function returning a string.
   *
   * @param {string|object} template html template as a string or function that 
   * returns an html template as a string.
   * @param {object} params Parameters to pass to the template function.
   *
   * @return {string|object} The template html as a string, or a promise for that 
   * string.
   */
  this.fromString = function (template, params) {
    return isFunction(template) ? template(params) : template;
  };

  /**
   * @ngdoc function
   * @name ui.router.util.$templateFactory#fromUrl
   * @methodOf ui.router.util.$templateFactory
   * 
   * @description
   * Loads a template from the a URL via `$http` and `$templateCache`.
   *
   * @param {string|Function} url url of the template to load, or a function 
   * that returns a url.
   * @param {Object} params Parameters to pass to the url function.
   * @return {string|Promise.<string>} The template html as a string, or a promise 
   * for that string.
   */
  this.fromUrl = function (url, params) {
    if (isFunction(url)) url = url(params);
    if (url == null) return null;
    else return $http
        .get(url, { cache: $templateCache, headers: { Accept: 'text/html' }})
        .then(function(response) { return response.data; });
  };

  /**
   * @ngdoc function
   * @name ui.router.util.$templateFactory#fromProvider
   * @methodOf ui.router.util.$templateFactory
   *
   * @description
   * Creates a template by invoking an injectable provider function.
   *
   * @param {Function} provider Function to invoke via `$injector.invoke`
   * @param {Object} params Parameters for the template.
   * @param {Object} locals Locals to pass to `invoke`. Defaults to 
   * `{ params: params }`.
   * @return {string|Promise.<string>} The template html as a string, or a promise 
   * for that string.
   */
  this.fromProvider = function (provider, params, locals) {
    return $injector.invoke(provider, null, locals || { params: params });
  };
}

angular.module('ui.router.util').service('$templateFactory', $TemplateFactory);

var $$UMFP; // reference to $UrlMatcherFactoryProvider

/**
 * @ngdoc object
 * @name ui.router.util.type:UrlMatcher
 *
 * @description
 * Matches URLs against patterns and extracts named parameters from the path or the search
 * part of the URL. A URL pattern consists of a path pattern, optionally followed by '?' and a list
 * of search parameters. Multiple search parameter names are separated by '&'. Search parameters
 * do not influence whether or not a URL is matched, but their values are passed through into
 * the matched parameters returned by {@link ui.router.util.type:UrlMatcher#methods_exec exec}.
 * 
 * Path parameter placeholders can be specified using simple colon/catch-all syntax or curly brace
 * syntax, which optionally allows a regular expression for the parameter to be specified:
 *
 * * `':'` name - colon placeholder
 * * `'*'` name - catch-all placeholder
 * * `'{' name '}'` - curly placeholder
 * * `'{' name ':' regexp|type '}'` - curly placeholder with regexp or type name. Should the
 *   regexp itself contain curly braces, they must be in matched pairs or escaped with a backslash.
 *
 * Parameter names may contain only word characters (latin letters, digits, and underscore) and
 * must be unique within the pattern (across both path and search parameters). For colon 
 * placeholders or curly placeholders without an explicit regexp, a path parameter matches any
 * number of characters other than '/'. For catch-all placeholders the path parameter matches
 * any number of characters.
 * 
 * Examples:
 * 
 * * `'/hello/'` - Matches only if the path is exactly '/hello/'. There is no special treatment for
 *   trailing slashes, and patterns have to match the entire path, not just a prefix.
 * * `'/user/:id'` - Matches '/user/bob' or '/user/1234!!!' or even '/user/' but not '/user' or
 *   '/user/bob/details'. The second path segment will be captured as the parameter 'id'.
 * * `'/user/{id}'` - Same as the previous example, but using curly brace syntax.
 * * `'/user/{id:[^/]*}'` - Same as the previous example.
 * * `'/user/{id:[0-9a-fA-F]{1,8}}'` - Similar to the previous example, but only matches if the id
 *   parameter consists of 1 to 8 hex digits.
 * * `'/files/{path:.*}'` - Matches any URL starting with '/files/' and captures the rest of the
 *   path into the parameter 'path'.
 * * `'/files/*path'` - ditto.
 * * `'/calendar/{start:date}'` - Matches "/calendar/2014-11-12" (because the pattern defined
 *   in the built-in  `date` Type matches `2014-11-12`) and provides a Date object in $stateParams.start
 *
 * @param {string} pattern  The pattern to compile into a matcher.
 * @param {Object} config  A configuration object hash:
 * @param {Object=} parentMatcher Used to concatenate the pattern/config onto
 *   an existing UrlMatcher
 *
 * * `caseInsensitive` - `true` if URL matching should be case insensitive, otherwise `false`, the default value (for backward compatibility) is `false`.
 * * `strict` - `false` if matching against a URL with a trailing slash should be treated as equivalent to a URL without a trailing slash, the default value is `true`.
 *
 * @property {string} prefix  A static prefix of this pattern. The matcher guarantees that any
 *   URL matching this matcher (i.e. any string for which {@link ui.router.util.type:UrlMatcher#methods_exec exec()} returns
 *   non-null) will start with this prefix.
 *
 * @property {string} source  The pattern that was passed into the constructor
 *
 * @property {string} sourcePath  The path portion of the source property
 *
 * @property {string} sourceSearch  The search portion of the source property
 *
 * @property {string} regex  The constructed regex that will be used to match against the url when 
 *   it is time to determine which url will match.
 *
 * @returns {Object}  New `UrlMatcher` object
 */
function UrlMatcher(pattern, config, parentMatcher) {
  config = extend({ params: {} }, isObject(config) ? config : {});

  // Find all placeholders and create a compiled pattern, using either classic or curly syntax:
  //   '*' name
  //   ':' name
  //   '{' name '}'
  //   '{' name ':' regexp '}'
  // The regular expression is somewhat complicated due to the need to allow curly braces
  // inside the regular expression. The placeholder regexp breaks down as follows:
  //    ([:*])([\w\[\]]+)              - classic placeholder ($1 / $2) (search version has - for snake-case)
  //    \{([\w\[\]]+)(?:\:( ... ))?\}  - curly brace placeholder ($3) with optional regexp/type ... ($4) (search version has - for snake-case
  //    (?: ... | ... | ... )+         - the regexp consists of any number of atoms, an atom being either
  //    [^{}\\]+                       - anything other than curly braces or backslash
  //    \\.                            - a backslash escape
  //    \{(?:[^{}\\]+|\\.)*\}          - a matched set of curly braces containing other atoms
  var placeholder       = /([:*])([\w\[\]]+)|\{([\w\[\]]+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,
      searchPlaceholder = /([:]?)([\w\[\]-]+)|\{([\w\[\]-]+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,
      compiled = '^', last = 0, m,
      segments = this.segments = [],
      parentParams = parentMatcher ? parentMatcher.params : {},
      params = this.params = parentMatcher ? parentMatcher.params.$$new() : new $$UMFP.ParamSet(),
      paramNames = [];

  function addParameter(id, type, config, location) {
    paramNames.push(id);
    if (parentParams[id]) return parentParams[id];
    if (!/^\w+(-+\w+)*(?:\[\])?$/.test(id)) throw new Error("Invalid parameter name '" + id + "' in pattern '" + pattern + "'");
    if (params[id]) throw new Error("Duplicate parameter name '" + id + "' in pattern '" + pattern + "'");
    params[id] = new $$UMFP.Param(id, type, config, location);
    return params[id];
  }

  function quoteRegExp(string, pattern, squash) {
    var surroundPattern = ['',''], result = string.replace(/[\\\[\]\^$*+?.()|{}]/g, "\\$&");
    if (!pattern) return result;
    switch(squash) {
      case false: surroundPattern = ['(', ')'];   break;
      case true:  surroundPattern = ['?(', ')?']; break;
      default:    surroundPattern = ['(' + squash + "|", ')?'];  break;
    }
    return result + surroundPattern[0] + pattern + surroundPattern[1];
  }

  this.source = pattern;

  // Split into static segments separated by path parameter placeholders.
  // The number of segments is always 1 more than the number of parameters.
  function matchDetails(m, isSearch) {
    var id, regexp, segment, type, cfg, arrayMode;
    id          = m[2] || m[3]; // IE[78] returns '' for unmatched groups instead of null
    cfg         = config.params[id];
    segment     = pattern.substring(last, m.index);
    regexp      = isSearch ? m[4] : m[4] || (m[1] == '*' ? '.*' : null);
    type        = $$UMFP.type(regexp || "string") || inherit($$UMFP.type("string"), { pattern: new RegExp(regexp) });
    return {
      id: id, regexp: regexp, segment: segment, type: type, cfg: cfg
    };
  }

  var p, param, segment;
  while ((m = placeholder.exec(pattern))) {
    p = matchDetails(m, false);
    if (p.segment.indexOf('?') >= 0) break; // we're into the search part

    param = addParameter(p.id, p.type, p.cfg, "path");
    compiled += quoteRegExp(p.segment, param.type.pattern.source, param.squash);
    segments.push(p.segment);
    last = placeholder.lastIndex;
  }
  segment = pattern.substring(last);

  // Find any search parameter names and remove them from the last segment
  var i = segment.indexOf('?');

  if (i >= 0) {
    var search = this.sourceSearch = segment.substring(i);
    segment = segment.substring(0, i);
    this.sourcePath = pattern.substring(0, last + i);

    if (search.length > 0) {
      last = 0;
      while ((m = searchPlaceholder.exec(search))) {
        p = matchDetails(m, true);
        param = addParameter(p.id, p.type, p.cfg, "search");
        last = placeholder.lastIndex;
        // check if ?&
      }
    }
  } else {
    this.sourcePath = pattern;
    this.sourceSearch = '';
  }

  compiled += quoteRegExp(segment) + (config.strict === false ? '\/?' : '') + '$';
  segments.push(segment);

  this.regexp = new RegExp(compiled, config.caseInsensitive ? 'i' : undefined);
  this.prefix = segments[0];
  this.$$paramNames = paramNames;
}

/**
 * @ngdoc function
 * @name ui.router.util.type:UrlMatcher#concat
 * @methodOf ui.router.util.type:UrlMatcher
 *
 * @description
 * Returns a new matcher for a pattern constructed by appending the path part and adding the
 * search parameters of the specified pattern to this pattern. The current pattern is not
 * modified. This can be understood as creating a pattern for URLs that are relative to (or
 * suffixes of) the current pattern.
 *
 * @example
 * The following two matchers are equivalent:
 * <pre>
 * new UrlMatcher('/user/{id}?q').concat('/details?date');
 * new UrlMatcher('/user/{id}/details?q&date');
 * </pre>
 *
 * @param {string} pattern  The pattern to append.
 * @param {Object} config  An object hash of the configuration for the matcher.
 * @returns {UrlMatcher}  A matcher for the concatenated pattern.
 */
UrlMatcher.prototype.concat = function (pattern, config) {
  // Because order of search parameters is irrelevant, we can add our own search
  // parameters to the end of the new pattern. Parse the new pattern by itself
  // and then join the bits together, but it's much easier to do this on a string level.
  var defaultConfig = {
    caseInsensitive: $$UMFP.caseInsensitive(),
    strict: $$UMFP.strictMode(),
    squash: $$UMFP.defaultSquashPolicy()
  };
  return new UrlMatcher(this.sourcePath + pattern + this.sourceSearch, extend(defaultConfig, config), this);
};

UrlMatcher.prototype.toString = function () {
  return this.source;
};

/**
 * @ngdoc function
 * @name ui.router.util.type:UrlMatcher#exec
 * @methodOf ui.router.util.type:UrlMatcher
 *
 * @description
 * Tests the specified path against this matcher, and returns an object containing the captured
 * parameter values, or null if the path does not match. The returned object contains the values
 * of any search parameters that are mentioned in the pattern, but their value may be null if
 * they are not present in `searchParams`. This means that search parameters are always treated
 * as optional.
 *
 * @example
 * <pre>
 * new UrlMatcher('/user/{id}?q&r').exec('/user/bob', {
 *   x: '1', q: 'hello'
 * });
 * // returns { id: 'bob', q: 'hello', r: null }
 * </pre>
 *
 * @param {string} path  The URL path to match, e.g. `$location.path()`.
 * @param {Object} searchParams  URL search parameters, e.g. `$location.search()`.
 * @returns {Object}  The captured parameter values.
 */
UrlMatcher.prototype.exec = function (path, searchParams) {
  var m = this.regexp.exec(path);
  if (!m) return null;
  searchParams = searchParams || {};

  var paramNames = this.parameters(), nTotal = paramNames.length,
    nPath = this.segments.length - 1,
    values = {}, i, j, cfg, paramName;

  if (nPath !== m.length - 1) throw new Error("Unbalanced capture group in route '" + this.source + "'");

  function decodePathArray(string) {
    function reverseString(str) { return str.split("").reverse().join(""); }
    function unquoteDashes(str) { return str.replace(/\\-/, "-"); }

    var split = reverseString(string).split(/-(?!\\)/);
    var allReversed = map(split, reverseString);
    return map(allReversed, unquoteDashes).reverse();
  }

  for (i = 0; i < nPath; i++) {
    paramName = paramNames[i];
    var param = this.params[paramName];
    var paramVal = m[i+1];
    // if the param value matches a pre-replace pair, replace the value before decoding.
    for (j = 0; j < param.replace; j++) {
      if (param.replace[j].from === paramVal) paramVal = param.replace[j].to;
    }
    if (paramVal && param.array === true) paramVal = decodePathArray(paramVal);
    values[paramName] = param.value(paramVal);
  }
  for (/**/; i < nTotal; i++) {
    paramName = paramNames[i];
    values[paramName] = this.params[paramName].value(searchParams[paramName]);
  }

  return values;
};

/**
 * @ngdoc function
 * @name ui.router.util.type:UrlMatcher#parameters
 * @methodOf ui.router.util.type:UrlMatcher
 *
 * @description
 * Returns the names of all path and search parameters of this pattern in an unspecified order.
 * 
 * @returns {Array.<string>}  An array of parameter names. Must be treated as read-only. If the
 *    pattern has no parameters, an empty array is returned.
 */
UrlMatcher.prototype.parameters = function (param) {
  if (!isDefined(param)) return this.$$paramNames;
  return this.params[param] || null;
};

/**
 * @ngdoc function
 * @name ui.router.util.type:UrlMatcher#validate
 * @methodOf ui.router.util.type:UrlMatcher
 *
 * @description
 * Checks an object hash of parameters to validate their correctness according to the parameter
 * types of this `UrlMatcher`.
 *
 * @param {Object} params The object hash of parameters to validate.
 * @returns {boolean} Returns `true` if `params` validates, otherwise `false`.
 */
UrlMatcher.prototype.validates = function (params) {
  return this.params.$$validates(params);
};

/**
 * @ngdoc function
 * @name ui.router.util.type:UrlMatcher#format
 * @methodOf ui.router.util.type:UrlMatcher
 *
 * @description
 * Creates a URL that matches this pattern by substituting the specified values
 * for the path and search parameters. Null values for path parameters are
 * treated as empty strings.
 *
 * @example
 * <pre>
 * new UrlMatcher('/user/{id}?q').format({ id:'bob', q:'yes' });
 * // returns '/user/bob?q=yes'
 * </pre>
 *
 * @param {Object} values  the values to substitute for the parameters in this pattern.
 * @returns {string}  the formatted URL (path and optionally search part).
 */
UrlMatcher.prototype.format = function (values) {
  values = values || {};
  var segments = this.segments, params = this.parameters(), paramset = this.params;
  if (!this.validates(values)) return null;

  var i, search = false, nPath = segments.length - 1, nTotal = params.length, result = segments[0];

  function encodeDashes(str) { // Replace dashes with encoded "\-"
    return encodeURIComponent(str).replace(/-/g, function(c) { return '%5C%' + c.charCodeAt(0).toString(16).toUpperCase(); });
  }

  for (i = 0; i < nTotal; i++) {
    var isPathParam = i < nPath;
    var name = params[i], param = paramset[name], value = param.value(values[name]);
    var isDefaultValue = param.isOptional && param.type.equals(param.value(), value);
    var squash = isDefaultValue ? param.squash : false;
    var encoded = param.type.encode(value);

    if (isPathParam) {
      var nextSegment = segments[i + 1];
      if (squash === false) {
        if (encoded != null) {
          if (isArray(encoded)) {
            result += map(encoded, encodeDashes).join("-");
          } else {
            result += encodeURIComponent(encoded);
          }
        }
        result += nextSegment;
      } else if (squash === true) {
        var capture = result.match(/\/$/) ? /\/?(.*)/ : /(.*)/;
        result += nextSegment.match(capture)[1];
      } else if (isString(squash)) {
        result += squash + nextSegment;
      }
    } else {
      if (encoded == null || (isDefaultValue && squash !== false)) continue;
      if (!isArray(encoded)) encoded = [ encoded ];
      encoded = map(encoded, encodeURIComponent).join('&' + name + '=');
      result += (search ? '&' : '?') + (name + '=' + encoded);
      search = true;
    }
  }

  return result;
};

/**
 * @ngdoc object
 * @name ui.router.util.type:Type
 *
 * @description
 * Implements an interface to define custom parameter types that can be decoded from and encoded to
 * string parameters matched in a URL. Used by {@link ui.router.util.type:UrlMatcher `UrlMatcher`}
 * objects when matching or formatting URLs, or comparing or validating parameter values.
 *
 * See {@link ui.router.util.$urlMatcherFactory#methods_type `$urlMatcherFactory#type()`} for more
 * information on registering custom types.
 *
 * @param {Object} config  A configuration object which contains the custom type definition.  The object's
 *        properties will override the default methods and/or pattern in `Type`'s public interface.
 * @example
 * <pre>
 * {
 *   decode: function(val) { return parseInt(val, 10); },
 *   encode: function(val) { return val && val.toString(); },
 *   equals: function(a, b) { return this.is(a) && a === b; },
 *   is: function(val) { return angular.isNumber(val) isFinite(val) && val % 1 === 0; },
 *   pattern: /\d+/
 * }
 * </pre>
 *
 * @property {RegExp} pattern The regular expression pattern used to match values of this type when
 *           coming from a substring of a URL.
 *
 * @returns {Object}  Returns a new `Type` object.
 */
function Type(config) {
  extend(this, config);
}

/**
 * @ngdoc function
 * @name ui.router.util.type:Type#is
 * @methodOf ui.router.util.type:Type
 *
 * @description
 * Detects whether a value is of a particular type. Accepts a native (decoded) value
 * and determines whether it matches the current `Type` object.
 *
 * @param {*} val  The value to check.
 * @param {string} key  Optional. If the type check is happening in the context of a specific
 *        {@link ui.router.util.type:UrlMatcher `UrlMatcher`} object, this is the name of the
 *        parameter in which `val` is stored. Can be used for meta-programming of `Type` objects.
 * @returns {Boolean}  Returns `true` if the value matches the type, otherwise `false`.
 */
Type.prototype.is = function(val, key) {
  return true;
};

/**
 * @ngdoc function
 * @name ui.router.util.type:Type#encode
 * @methodOf ui.router.util.type:Type
 *
 * @description
 * Encodes a custom/native type value to a string that can be embedded in a URL. Note that the
 * return value does *not* need to be URL-safe (i.e. passed through `encodeURIComponent()`), it
 * only needs to be a representation of `val` that has been coerced to a string.
 *
 * @param {*} val  The value to encode.
 * @param {string} key  The name of the parameter in which `val` is stored. Can be used for
 *        meta-programming of `Type` objects.
 * @returns {string}  Returns a string representation of `val` that can be encoded in a URL.
 */
Type.prototype.encode = function(val, key) {
  return val;
};

/**
 * @ngdoc function
 * @name ui.router.util.type:Type#decode
 * @methodOf ui.router.util.type:Type
 *
 * @description
 * Converts a parameter value (from URL string or transition param) to a custom/native value.
 *
 * @param {string} val  The URL parameter value to decode.
 * @param {string} key  The name of the parameter in which `val` is stored. Can be used for
 *        meta-programming of `Type` objects.
 * @returns {*}  Returns a custom representation of the URL parameter value.
 */
Type.prototype.decode = function(val, key) {
  return val;
};

/**
 * @ngdoc function
 * @name ui.router.util.type:Type#equals
 * @methodOf ui.router.util.type:Type
 *
 * @description
 * Determines whether two decoded values are equivalent.
 *
 * @param {*} a  A value to compare against.
 * @param {*} b  A value to compare against.
 * @returns {Boolean}  Returns `true` if the values are equivalent/equal, otherwise `false`.
 */
Type.prototype.equals = function(a, b) {
  return a == b;
};

Type.prototype.$subPattern = function() {
  var sub = this.pattern.toString();
  return sub.substr(1, sub.length - 2);
};

Type.prototype.pattern = /.*/;

Type.prototype.toString = function() { return "{Type:" + this.name + "}"; };

/*
 * Wraps an existing custom Type as an array of Type, depending on 'mode'.
 * e.g.:
 * - urlmatcher pattern "/path?{queryParam[]:int}"
 * - url: "/path?queryParam=1&queryParam=2
 * - $stateParams.queryParam will be [1, 2]
 * if `mode` is "auto", then
 * - url: "/path?queryParam=1 will create $stateParams.queryParam: 1
 * - url: "/path?queryParam=1&queryParam=2 will create $stateParams.queryParam: [1, 2]
 */
Type.prototype.$asArray = function(mode, isSearch) {
  if (!mode) return this;
  if (mode === "auto" && !isSearch) throw new Error("'auto' array mode is for query parameters only");
  return new ArrayType(this, mode);

  function ArrayType(type, mode) {
    function bindTo(type, callbackName) {
      return function() {
        return type[callbackName].apply(type, arguments);
      };
    }

    // Wrap non-array value as array
    function arrayWrap(val) { return isArray(val) ? val : (isDefined(val) ? [ val ] : []); }
    // Unwrap array value for "auto" mode. Return undefined for empty array.
    function arrayUnwrap(val) {
      switch(val.length) {
        case 0: return undefined;
        case 1: return mode === "auto" ? val[0] : val;
        default: return val;
      }
    }
    function falsey(val) { return !val; }

    // Wraps type (.is/.encode/.decode) functions to operate on each value of an array
    function arrayHandler(callback, allTruthyMode) {
      return function handleArray(val) {
        val = arrayWrap(val);
        var result = map(val, callback);
        if (allTruthyMode === true)
          return filter(result, falsey).length === 0;
        return arrayUnwrap(result);
      };
    }

    // Wraps type (.equals) functions to operate on each value of an array
    function arrayEqualsHandler(callback) {
      return function handleArray(val1, val2) {
        var left = arrayWrap(val1), right = arrayWrap(val2);
        if (left.length !== right.length) return false;
        for (var i = 0; i < left.length; i++) {
          if (!callback(left[i], right[i])) return false;
        }
        return true;
      };
    }

    this.encode = arrayHandler(bindTo(type, 'encode'));
    this.decode = arrayHandler(bindTo(type, 'decode'));
    this.is     = arrayHandler(bindTo(type, 'is'), true);
    this.equals = arrayEqualsHandler(bindTo(type, 'equals'));
    this.pattern = type.pattern;
    this.$arrayMode = mode;
  }
};



/**
 * @ngdoc object
 * @name ui.router.util.$urlMatcherFactory
 *
 * @description
 * Factory for {@link ui.router.util.type:UrlMatcher `UrlMatcher`} instances. The factory
 * is also available to providers under the name `$urlMatcherFactoryProvider`.
 */
function $UrlMatcherFactory() {
  $$UMFP = this;

  var isCaseInsensitive = false, isStrictMode = true, defaultSquashPolicy = false;

  function valToString(val) { return val != null ? val.toString().replace(/\//g, "%2F") : val; }
  function valFromString(val) { return val != null ? val.toString().replace(/%2F/g, "/") : val; }
//  TODO: in 1.0, make string .is() return false if value is undefined by default.
//  function regexpMatches(val) { /*jshint validthis:true */ return isDefined(val) && this.pattern.test(val); }
  function regexpMatches(val) { /*jshint validthis:true */ return this.pattern.test(val); }

  var $types = {}, enqueue = true, typeQueue = [], injector, defaultTypes = {
    string: {
      encode: valToString,
      decode: valFromString,
      is: regexpMatches,
      pattern: /[^/]*/
    },
    int: {
      encode: valToString,
      decode: function(val) { return parseInt(val, 10); },
      is: function(val) { return isDefined(val) && this.decode(val.toString()) === val; },
      pattern: /\d+/
    },
    bool: {
      encode: function(val) { return val ? 1 : 0; },
      decode: function(val) { return parseInt(val, 10) !== 0; },
      is: function(val) { return val === true || val === false; },
      pattern: /0|1/
    },
    date: {
      encode: function (val) {
        if (!this.is(val))
          return undefined;
        return [ val.getFullYear(),
          ('0' + (val.getMonth() + 1)).slice(-2),
          ('0' + val.getDate()).slice(-2)
        ].join("-");
      },
      decode: function (val) {
        if (this.is(val)) return val;
        var match = this.capture.exec(val);
        return match ? new Date(match[1], match[2] - 1, match[3]) : undefined;
      },
      is: function(val) { return val instanceof Date && !isNaN(val.valueOf()); },
      equals: function (a, b) { return this.is(a) && this.is(b) && a.toISOString() === b.toISOString(); },
      pattern: /[0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2][0-9]|3[0-1])/,
      capture: /([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/
    },
    json: {
      encode: angular.toJson,
      decode: angular.fromJson,
      is: angular.isObject,
      equals: angular.equals,
      pattern: /[^/]*/
    },
    any: { // does not encode/decode
      encode: angular.identity,
      decode: angular.identity,
      is: angular.identity,
      equals: angular.equals,
      pattern: /.*/
    }
  };

  function getDefaultConfig() {
    return {
      strict: isStrictMode,
      caseInsensitive: isCaseInsensitive
    };
  }

  function isInjectable(value) {
    return (isFunction(value) || (isArray(value) && isFunction(value[value.length - 1])));
  }

  /**
   * [Internal] Get the default value of a parameter, which may be an injectable function.
   */
  $UrlMatcherFactory.$$getDefaultValue = function(config) {
    if (!isInjectable(config.value)) return config.value;
    if (!injector) throw new Error("Injectable functions cannot be called at configuration time");
    return injector.invoke(config.value);
  };

  /**
   * @ngdoc function
   * @name ui.router.util.$urlMatcherFactory#caseInsensitive
   * @methodOf ui.router.util.$urlMatcherFactory
   *
   * @description
   * Defines whether URL matching should be case sensitive (the default behavior), or not.
   *
   * @param {boolean} value `false` to match URL in a case sensitive manner; otherwise `true`;
   * @returns {boolean} the current value of caseInsensitive
   */
  this.caseInsensitive = function(value) {
    if (isDefined(value))
      isCaseInsensitive = value;
    return isCaseInsensitive;
  };

  /**
   * @ngdoc function
   * @name ui.router.util.$urlMatcherFactory#strictMode
   * @methodOf ui.router.util.$urlMatcherFactory
   *
   * @description
   * Defines whether URLs should match trailing slashes, or not (the default behavior).
   *
   * @param {boolean=} value `false` to match trailing slashes in URLs, otherwise `true`.
   * @returns {boolean} the current value of strictMode
   */
  this.strictMode = function(value) {
    if (isDefined(value))
      isStrictMode = value;
    return isStrictMode;
  };

  /**
   * @ngdoc function
   * @name ui.router.util.$urlMatcherFactory#defaultSquashPolicy
   * @methodOf ui.router.util.$urlMatcherFactory
   *
   * @description
   * Sets the default behavior when generating or matching URLs with default parameter values.
   *
   * @param {string} value A string that defines the default parameter URL squashing behavior.
   *    `nosquash`: When generating an href with a default parameter value, do not squash the parameter value from the URL
   *    `slash`: When generating an href with a default parameter value, squash (remove) the parameter value, and, if the
   *             parameter is surrounded by slashes, squash (remove) one slash from the URL
   *    any other string, e.g. "~": When generating an href with a default parameter value, squash (remove)
   *             the parameter value from the URL and replace it with this string.
   */
  this.defaultSquashPolicy = function(value) {
    if (!isDefined(value)) return defaultSquashPolicy;
    if (value !== true && value !== false && !isString(value))
      throw new Error("Invalid squash policy: " + value + ". Valid policies: false, true, arbitrary-string");
    defaultSquashPolicy = value;
    return value;
  };

  /**
   * @ngdoc function
   * @name ui.router.util.$urlMatcherFactory#compile
   * @methodOf ui.router.util.$urlMatcherFactory
   *
   * @description
   * Creates a {@link ui.router.util.type:UrlMatcher `UrlMatcher`} for the specified pattern.
   *
   * @param {string} pattern  The URL pattern.
   * @param {Object} config  The config object hash.
   * @returns {UrlMatcher}  The UrlMatcher.
   */
  this.compile = function (pattern, config) {
    return new UrlMatcher(pattern, extend(getDefaultConfig(), config));
  };

  /**
   * @ngdoc function
   * @name ui.router.util.$urlMatcherFactory#isMatcher
   * @methodOf ui.router.util.$urlMatcherFactory
   *
   * @description
   * Returns true if the specified object is a `UrlMatcher`, or false otherwise.
   *
   * @param {Object} object  The object to perform the type check against.
   * @returns {Boolean}  Returns `true` if the object matches the `UrlMatcher` interface, by
   *          implementing all the same methods.
   */
  this.isMatcher = function (o) {
    if (!isObject(o)) return false;
    var result = true;

    forEach(UrlMatcher.prototype, function(val, name) {
      if (isFunction(val)) {
        result = result && (isDefined(o[name]) && isFunction(o[name]));
      }
    });
    return result;
  };

  /**
   * @ngdoc function
   * @name ui.router.util.$urlMatcherFactory#type
   * @methodOf ui.router.util.$urlMatcherFactory
   *
   * @description
   * Registers a custom {@link ui.router.util.type:Type `Type`} object that can be used to
   * generate URLs with typed parameters.
   *
   * @param {string} name  The type name.
   * @param {Object|Function} definition   The type definition. See
   *        {@link ui.router.util.type:Type `Type`} for information on the values accepted.
   * @param {Object|Function} definitionFn (optional) A function that is injected before the app
   *        runtime starts.  The result of this function is merged into the existing `definition`.
   *        See {@link ui.router.util.type:Type `Type`} for information on the values accepted.
   *
   * @returns {Object}  Returns `$urlMatcherFactoryProvider`.
   *
   * @example
   * This is a simple example of a custom type that encodes and decodes items from an
   * array, using the array index as the URL-encoded value:
   *
   * <pre>
   * var list = ['John', 'Paul', 'George', 'Ringo'];
   *
   * $urlMatcherFactoryProvider.type('listItem', {
   *   encode: function(item) {
   *     // Represent the list item in the URL using its corresponding index
   *     return list.indexOf(item);
   *   },
   *   decode: function(item) {
   *     // Look up the list item by index
   *     return list[parseInt(item, 10)];
   *   },
   *   is: function(item) {
   *     // Ensure the item is valid by checking to see that it appears
   *     // in the list
   *     return list.indexOf(item) > -1;
   *   }
   * });
   *
   * $stateProvider.state('list', {
   *   url: "/list/{item:listItem}",
   *   controller: function($scope, $stateParams) {
   *     console.log($stateParams.item);
   *   }
   * });
   *
   * // ...
   *
   * // Changes URL to '/list/3', logs "Ringo" to the console
   * $state.go('list', { item: "Ringo" });
   * </pre>
   *
   * This is a more complex example of a type that relies on dependency injection to
   * interact with services, and uses the parameter name from the URL to infer how to
   * handle encoding and decoding parameter values:
   *
   * <pre>
   * // Defines a custom type that gets a value from a service,
   * // where each service gets different types of values from
   * // a backend API:
   * $urlMatcherFactoryProvider.type('dbObject', {}, function(Users, Posts) {
   *
   *   // Matches up services to URL parameter names
   *   var services = {
   *     user: Users,
   *     post: Posts
   *   };
   *
   *   return {
   *     encode: function(object) {
   *       // Represent the object in the URL using its unique ID
   *       return object.id;
   *     },
   *     decode: function(value, key) {
   *       // Look up the object by ID, using the parameter
   *       // name (key) to call the correct service
   *       return services[key].findById(value);
   *     },
   *     is: function(object, key) {
   *       // Check that object is a valid dbObject
   *       return angular.isObject(object) && object.id && services[key];
   *     }
   *     equals: function(a, b) {
   *       // Check the equality of decoded objects by comparing
   *       // their unique IDs
   *       return a.id === b.id;
   *     }
   *   };
   * });
   *
   * // In a config() block, you can then attach URLs with
   * // type-annotated parameters:
   * $stateProvider.state('users', {
   *   url: "/users",
   *   // ...
   * }).state('users.item', {
   *   url: "/{user:dbObject}",
   *   controller: function($scope, $stateParams) {
   *     // $stateParams.user will now be an object returned from
   *     // the Users service
   *   },
   *   // ...
   * });
   * </pre>
   */
  this.type = function (name, definition, definitionFn) {
    if (!isDefined(definition)) return $types[name];
    if ($types.hasOwnProperty(name)) throw new Error("A type named '" + name + "' has already been defined.");

    $types[name] = new Type(extend({ name: name }, definition));
    if (definitionFn) {
      typeQueue.push({ name: name, def: definitionFn });
      if (!enqueue) flushTypeQueue();
    }
    return this;
  };

  // `flushTypeQueue()` waits until `$urlMatcherFactory` is injected before invoking the queued `definitionFn`s
  function flushTypeQueue() {
    while(typeQueue.length) {
      var type = typeQueue.shift();
      if (type.pattern) throw new Error("You cannot override a type's .pattern at runtime.");
      angular.extend($types[type.name], injector.invoke(type.def));
    }
  }

  // Register default types. Store them in the prototype of $types.
  forEach(defaultTypes, function(type, name) { $types[name] = new Type(extend({name: name}, type)); });
  $types = inherit($types, {});

  /* No need to document $get, since it returns this */
  this.$get = ['$injector', function ($injector) {
    injector = $injector;
    enqueue = false;
    flushTypeQueue();

    forEach(defaultTypes, function(type, name) {
      if (!$types[name]) $types[name] = new Type(type);
    });
    return this;
  }];

  this.Param = function Param(id, type, config, location) {
    var self = this;
    config = unwrapShorthand(config);
    type = getType(config, type, location);
    var arrayMode = getArrayMode();
    type = arrayMode ? type.$asArray(arrayMode, location === "search") : type;
    if (type.name === "string" && !arrayMode && location === "path" && config.value === undefined)
      config.value = ""; // for 0.2.x; in 0.3.0+ do not automatically default to ""
    var isOptional = config.value !== undefined;
    var squash = getSquashPolicy(config, isOptional);
    var replace = getReplace(config, arrayMode, isOptional, squash);

    function unwrapShorthand(config) {
      var keys = isObject(config) ? objectKeys(config) : [];
      var isShorthand = indexOf(keys, "value") === -1 && indexOf(keys, "type") === -1 &&
                        indexOf(keys, "squash") === -1 && indexOf(keys, "array") === -1;
      if (isShorthand) config = { value: config };
      config.$$fn = isInjectable(config.value) ? config.value : function () { return config.value; };
      return config;
    }

    function getType(config, urlType, location) {
      if (config.type && urlType) throw new Error("Param '"+id+"' has two type configurations.");
      if (urlType) return urlType;
      if (!config.type) return (location === "config" ? $types.any : $types.string);
      return config.type instanceof Type ? config.type : new Type(config.type);
    }

    // array config: param name (param[]) overrides default settings.  explicit config overrides param name.
    function getArrayMode() {
      var arrayDefaults = { array: (location === "search" ? "auto" : false) };
      var arrayParamNomenclature = id.match(/\[\]$/) ? { array: true } : {};
      return extend(arrayDefaults, arrayParamNomenclature, config).array;
    }

    /**
     * returns false, true, or the squash value to indicate the "default parameter url squash policy".
     */
    function getSquashPolicy(config, isOptional) {
      var squash = config.squash;
      if (!isOptional || squash === false) return false;
      if (!isDefined(squash) || squash == null) return defaultSquashPolicy;
      if (squash === true || isString(squash)) return squash;
      throw new Error("Invalid squash policy: '" + squash + "'. Valid policies: false, true, or arbitrary string");
    }

    function getReplace(config, arrayMode, isOptional, squash) {
      var replace, configuredKeys, defaultPolicy = [
        { from: "",   to: (isOptional || arrayMode ? undefined : "") },
        { from: null, to: (isOptional || arrayMode ? undefined : "") }
      ];
      replace = isArray(config.replace) ? config.replace : [];
      if (isString(squash))
        replace.push({ from: squash, to: undefined });
      configuredKeys = map(replace, function(item) { return item.from; } );
      return filter(defaultPolicy, function(item) { return indexOf(configuredKeys, item.from) === -1; }).concat(replace);
    }

    /**
     * [Internal] Get the default value of a parameter, which may be an injectable function.
     */
    function $$getDefaultValue() {
      if (!injector) throw new Error("Injectable functions cannot be called at configuration time");
      return injector.invoke(config.$$fn);
    }

    /**
     * [Internal] Gets the decoded representation of a value if the value is defined, otherwise, returns the
     * default value, which may be the result of an injectable function.
     */
    function $value(value) {
      function hasReplaceVal(val) { return function(obj) { return obj.from === val; }; }
      function $replace(value) {
        var replacement = map(filter(self.replace, hasReplaceVal(value)), function(obj) { return obj.to; });
        return replacement.length ? replacement[0] : value;
      }
      value = $replace(value);
      return isDefined(value) ? self.type.decode(value) : $$getDefaultValue();
    }

    function toString() { return "{Param:" + id + " " + type + " squash: '" + squash + "' optional: " + isOptional + "}"; }

    extend(this, {
      id: id,
      type: type,
      location: location,
      array: arrayMode,
      squash: squash,
      replace: replace,
      isOptional: isOptional,
      value: $value,
      dynamic: undefined,
      config: config,
      toString: toString
    });
  };

  function ParamSet(params) {
    extend(this, params || {});
  }

  ParamSet.prototype = {
    $$new: function() {
      return inherit(this, extend(new ParamSet(), { $$parent: this}));
    },
    $$keys: function () {
      var keys = [], chain = [], parent = this,
        ignore = objectKeys(ParamSet.prototype);
      while (parent) { chain.push(parent); parent = parent.$$parent; }
      chain.reverse();
      forEach(chain, function(paramset) {
        forEach(objectKeys(paramset), function(key) {
            if (indexOf(keys, key) === -1 && indexOf(ignore, key) === -1) keys.push(key);
        });
      });
      return keys;
    },
    $$values: function(paramValues) {
      var values = {}, self = this;
      forEach(self.$$keys(), function(key) {
        values[key] = self[key].value(paramValues && paramValues[key]);
      });
      return values;
    },
    $$equals: function(paramValues1, paramValues2) {
      var equal = true, self = this;
      forEach(self.$$keys(), function(key) {
        var left = paramValues1 && paramValues1[key], right = paramValues2 && paramValues2[key];
        if (!self[key].type.equals(left, right)) equal = false;
      });
      return equal;
    },
    $$validates: function $$validate(paramValues) {
      var result = true, isOptional, val, param, self = this;

      forEach(this.$$keys(), function(key) {
        param = self[key];
        val = paramValues[key];
        isOptional = !val && param.isOptional;
        result = result && (isOptional || !!param.type.is(val));
      });
      return result;
    },
    $$parent: undefined
  };

  this.ParamSet = ParamSet;
}

// Register as a provider so it's available to other providers
angular.module('ui.router.util').provider('$urlMatcherFactory', $UrlMatcherFactory);
angular.module('ui.router.util').run(['$urlMatcherFactory', function($urlMatcherFactory) { }]);

/**
 * @ngdoc object
 * @name ui.router.router.$urlRouterProvider
 *
 * @requires ui.router.util.$urlMatcherFactoryProvider
 * @requires $locationProvider
 *
 * @description
 * `$urlRouterProvider` has the responsibility of watching `$location`. 
 * When `$location` changes it runs through a list of rules one by one until a 
 * match is found. `$urlRouterProvider` is used behind the scenes anytime you specify 
 * a url in a state configuration. All urls are compiled into a UrlMatcher object.
 *
 * There are several methods on `$urlRouterProvider` that make it useful to use directly
 * in your module config.
 */
$UrlRouterProvider.$inject = ['$locationProvider', '$urlMatcherFactoryProvider'];
function $UrlRouterProvider(   $locationProvider,   $urlMatcherFactory) {
  var rules = [], otherwise = null, interceptDeferred = false, listener;

  // Returns a string that is a prefix of all strings matching the RegExp
  function regExpPrefix(re) {
    var prefix = /^\^((?:\\[^a-zA-Z0-9]|[^\\\[\]\^$*+?.()|{}]+)*)/.exec(re.source);
    return (prefix != null) ? prefix[1].replace(/\\(.)/g, "$1") : '';
  }

  // Interpolates matched values into a String.replace()-style pattern
  function interpolate(pattern, match) {
    return pattern.replace(/\$(\$|\d{1,2})/, function (m, what) {
      return match[what === '$' ? 0 : Number(what)];
    });
  }

  /**
   * @ngdoc function
   * @name ui.router.router.$urlRouterProvider#rule
   * @methodOf ui.router.router.$urlRouterProvider
   *
   * @description
   * Defines rules that are used by `$urlRouterProvider` to find matches for
   * specific URLs.
   *
   * @example
   * <pre>
   * var app = angular.module('app', ['ui.router.router']);
   *
   * app.config(function ($urlRouterProvider) {
   *   // Here's an example of how you might allow case insensitive urls
   *   $urlRouterProvider.rule(function ($injector, $location) {
   *     var path = $location.path(),
   *         normalized = path.toLowerCase();
   *
   *     if (path !== normalized) {
   *       return normalized;
   *     }
   *   });
   * });
   * </pre>
   *
   * @param {object} rule Handler function that takes `$injector` and `$location`
   * services as arguments. You can use them to return a valid path as a string.
   *
   * @return {object} `$urlRouterProvider` - `$urlRouterProvider` instance
   */
  this.rule = function (rule) {
    if (!isFunction(rule)) throw new Error("'rule' must be a function");
    rules.push(rule);
    return this;
  };

  /**
   * @ngdoc object
   * @name ui.router.router.$urlRouterProvider#otherwise
   * @methodOf ui.router.router.$urlRouterProvider
   *
   * @description
   * Defines a path that is used when an invalid route is requested.
   *
   * @example
   * <pre>
   * var app = angular.module('app', ['ui.router.router']);
   *
   * app.config(function ($urlRouterProvider) {
   *   // if the path doesn't match any of the urls you configured
   *   // otherwise will take care of routing the user to the
   *   // specified url
   *   $urlRouterProvider.otherwise('/index');
   *
   *   // Example of using function rule as param
   *   $urlRouterProvider.otherwise(function ($injector, $location) {
   *     return '/a/valid/url';
   *   });
   * });
   * </pre>
   *
   * @param {string|object} rule The url path you want to redirect to or a function 
   * rule that returns the url path. The function version is passed two params: 
   * `$injector` and `$location` services, and must return a url string.
   *
   * @return {object} `$urlRouterProvider` - `$urlRouterProvider` instance
   */
  this.otherwise = function (rule) {
    if (isString(rule)) {
      var redirect = rule;
      rule = function () { return redirect; };
    }
    else if (!isFunction(rule)) throw new Error("'rule' must be a function");
    otherwise = rule;
    return this;
  };


  function handleIfMatch($injector, handler, match) {
    if (!match) return false;
    var result = $injector.invoke(handler, handler, { $match: match });
    return isDefined(result) ? result : true;
  }

  /**
   * @ngdoc function
   * @name ui.router.router.$urlRouterProvider#when
   * @methodOf ui.router.router.$urlRouterProvider
   *
   * @description
   * Registers a handler for a given url matching. if handle is a string, it is
   * treated as a redirect, and is interpolated according to the syntax of match
   * (i.e. like `String.replace()` for `RegExp`, or like a `UrlMatcher` pattern otherwise).
   *
   * If the handler is a function, it is injectable. It gets invoked if `$location`
   * matches. You have the option of inject the match object as `$match`.
   *
   * The handler can return
   *
   * - **falsy** to indicate that the rule didn't match after all, then `$urlRouter`
   *   will continue trying to find another one that matches.
   * - **string** which is treated as a redirect and passed to `$location.url()`
   * - **void** or any **truthy** value tells `$urlRouter` that the url was handled.
   *
   * @example
   * <pre>
   * var app = angular.module('app', ['ui.router.router']);
   *
   * app.config(function ($urlRouterProvider) {
   *   $urlRouterProvider.when($state.url, function ($match, $stateParams) {
   *     if ($state.$current.navigable !== state ||
   *         !equalForKeys($match, $stateParams) {
   *      $state.transitionTo(state, $match, false);
   *     }
   *   });
   * });
   * </pre>
   *
   * @param {string|object} what The incoming path that you want to redirect.
   * @param {string|object} handler The path you want to redirect your user to.
   */
  this.when = function (what, handler) {
    var redirect, handlerIsString = isString(handler);
    if (isString(what)) what = $urlMatcherFactory.compile(what);

    if (!handlerIsString && !isFunction(handler) && !isArray(handler))
      throw new Error("invalid 'handler' in when()");

    var strategies = {
      matcher: function (what, handler) {
        if (handlerIsString) {
          redirect = $urlMatcherFactory.compile(handler);
          handler = ['$match', function ($match) { return redirect.format($match); }];
        }
        return extend(function ($injector, $location) {
          return handleIfMatch($injector, handler, what.exec($location.path(), $location.search()));
        }, {
          prefix: isString(what.prefix) ? what.prefix : ''
        });
      },
      regex: function (what, handler) {
        if (what.global || what.sticky) throw new Error("when() RegExp must not be global or sticky");

        if (handlerIsString) {
          redirect = handler;
          handler = ['$match', function ($match) { return interpolate(redirect, $match); }];
        }
        return extend(function ($injector, $location) {
          return handleIfMatch($injector, handler, what.exec($location.path()));
        }, {
          prefix: regExpPrefix(what)
        });
      }
    };

    var check = { matcher: $urlMatcherFactory.isMatcher(what), regex: what instanceof RegExp };

    for (var n in check) {
      if (check[n]) return this.rule(strategies[n](what, handler));
    }

    throw new Error("invalid 'what' in when()");
  };

  /**
   * @ngdoc function
   * @name ui.router.router.$urlRouterProvider#deferIntercept
   * @methodOf ui.router.router.$urlRouterProvider
   *
   * @description
   * Disables (or enables) deferring location change interception.
   *
   * If you wish to customize the behavior of syncing the URL (for example, if you wish to
   * defer a transition but maintain the current URL), call this method at configuration time.
   * Then, at run time, call `$urlRouter.listen()` after you have configured your own
   * `$locationChangeSuccess` event handler.
   *
   * @example
   * <pre>
   * var app = angular.module('app', ['ui.router.router']);
   *
   * app.config(function ($urlRouterProvider) {
   *
   *   // Prevent $urlRouter from automatically intercepting URL changes;
   *   // this allows you to configure custom behavior in between
   *   // location changes and route synchronization:
   *   $urlRouterProvider.deferIntercept();
   *
   * }).run(function ($rootScope, $urlRouter, UserService) {
   *
   *   $rootScope.$on('$locationChangeSuccess', function(e) {
   *     // UserService is an example service for managing user state
   *     if (UserService.isLoggedIn()) return;
   *
   *     // Prevent $urlRouter's default handler from firing
   *     e.preventDefault();
   *
   *     UserService.handleLogin().then(function() {
   *       // Once the user has logged in, sync the current URL
   *       // to the router:
   *       $urlRouter.sync();
   *     });
   *   });
   *
   *   // Configures $urlRouter's listener *after* your custom listener
   *   $urlRouter.listen();
   * });
   * </pre>
   *
   * @param {boolean} defer Indicates whether to defer location change interception. Passing
            no parameter is equivalent to `true`.
   */
  this.deferIntercept = function (defer) {
    if (defer === undefined) defer = true;
    interceptDeferred = defer;
  };

  /**
   * @ngdoc object
   * @name ui.router.router.$urlRouter
   *
   * @requires $location
   * @requires $rootScope
   * @requires $injector
   * @requires $browser
   *
   * @description
   *
   */
  this.$get = $get;
  $get.$inject = ['$location', '$rootScope', '$injector', '$browser'];
  function $get(   $location,   $rootScope,   $injector,   $browser) {

    var baseHref = $browser.baseHref(), location = $location.url(), lastPushedUrl;

    function appendBasePath(url, isHtml5, absolute) {
      if (baseHref === '/') return url;
      if (isHtml5) return baseHref.slice(0, -1) + url;
      if (absolute) return baseHref.slice(1) + url;
      return url;
    }

    // TODO: Optimize groups of rules with non-empty prefix into some sort of decision tree
    function update(evt) {
      if (evt && evt.defaultPrevented) return;
      var ignoreUpdate = lastPushedUrl && $location.url() === lastPushedUrl;
      lastPushedUrl = undefined;
      if (ignoreUpdate) return true;

      function check(rule) {
        var handled = rule($injector, $location);

        if (!handled) return false;
        if (isString(handled)) $location.replace().url(handled);
        return true;
      }
      var n = rules.length, i;

      for (i = 0; i < n; i++) {
        if (check(rules[i])) return;
      }
      // always check otherwise last to allow dynamic updates to the set of rules
      if (otherwise) check(otherwise);
    }

    function listen() {
      listener = listener || $rootScope.$on('$locationChangeSuccess', update);
      return listener;
    }

    if (!interceptDeferred) listen();

    return {
      /**
       * @ngdoc function
       * @name ui.router.router.$urlRouter#sync
       * @methodOf ui.router.router.$urlRouter
       *
       * @description
       * Triggers an update; the same update that happens when the address bar url changes, aka `$locationChangeSuccess`.
       * This method is useful when you need to use `preventDefault()` on the `$locationChangeSuccess` event,
       * perform some custom logic (route protection, auth, config, redirection, etc) and then finally proceed
       * with the transition by calling `$urlRouter.sync()`.
       *
       * @example
       * <pre>
       * angular.module('app', ['ui.router'])
       *   .run(function($rootScope, $urlRouter) {
       *     $rootScope.$on('$locationChangeSuccess', function(evt) {
       *       // Halt state change from even starting
       *       evt.preventDefault();
       *       // Perform custom logic
       *       var meetsRequirement = ...
       *       // Continue with the update and state transition if logic allows
       *       if (meetsRequirement) $urlRouter.sync();
       *     });
       * });
       * </pre>
       */
      sync: function() {
        update();
      },

      listen: function() {
        return listen();
      },

      update: function(read) {
        if (read) {
          location = $location.url();
          return;
        }
        if ($location.url() === location) return;

        $location.url(location);
        $location.replace();
      },

      push: function(urlMatcher, params, options) {
        $location.url(urlMatcher.format(params || {}));
        lastPushedUrl = options && options.$$avoidResync ? $location.url() : undefined;
        if (options && options.replace) $location.replace();
      },

      /**
       * @ngdoc function
       * @name ui.router.router.$urlRouter#href
       * @methodOf ui.router.router.$urlRouter
       *
       * @description
       * A URL generation method that returns the compiled URL for a given
       * {@link ui.router.util.type:UrlMatcher `UrlMatcher`}, populated with the provided parameters.
       *
       * @example
       * <pre>
       * $bob = $urlRouter.href(new UrlMatcher("/about/:person"), {
       *   person: "bob"
       * });
       * // $bob == "/about/bob";
       * </pre>
       *
       * @param {UrlMatcher} urlMatcher The `UrlMatcher` object which is used as the template of the URL to generate.
       * @param {object=} params An object of parameter values to fill the matcher's required parameters.
       * @param {object=} options Options object. The options are:
       *
       * - **`absolute`** - {boolean=false},  If true will generate an absolute url, e.g. "http://www.example.com/fullurl".
       *
       * @returns {string} Returns the fully compiled URL, or `null` if `params` fail validation against `urlMatcher`
       */
      href: function(urlMatcher, params, options) {
        if (!urlMatcher.validates(params)) return null;

        var isHtml5 = $locationProvider.html5Mode();
        if (angular.isObject(isHtml5)) {
          isHtml5 = isHtml5.enabled;
        }
        
        var url = urlMatcher.format(params);
        options = options || {};

        if (!isHtml5 && url !== null) {
          url = "#" + $locationProvider.hashPrefix() + url;
        }
        url = appendBasePath(url, isHtml5, options.absolute);

        if (!options.absolute || !url) {
          return url;
        }

        var slash = (!isHtml5 && url ? '/' : ''), port = $location.port();
        port = (port === 80 || port === 443 ? '' : ':' + port);

        return [$location.protocol(), '://', $location.host(), port, slash, url].join('');
      }
    };
  }
}

angular.module('ui.router.router').provider('$urlRouter', $UrlRouterProvider);

/**
 * @ngdoc object
 * @name ui.router.state.$stateProvider
 *
 * @requires ui.router.router.$urlRouterProvider
 * @requires ui.router.util.$urlMatcherFactoryProvider
 *
 * @description
 * The new `$stateProvider` works similar to Angular's v1 router, but it focuses purely
 * on state.
 *
 * A state corresponds to a "place" in the application in terms of the overall UI and
 * navigation. A state describes (via the controller / template / view properties) what
 * the UI looks like and does at that place.
 *
 * States often have things in common, and the primary way of factoring out these
 * commonalities in this model is via the state hierarchy, i.e. parent/child states aka
 * nested states.
 *
 * The `$stateProvider` provides interfaces to declare these states for your app.
 */
$StateProvider.$inject = ['$urlRouterProvider', '$urlMatcherFactoryProvider'];
function $StateProvider(   $urlRouterProvider,   $urlMatcherFactory) {

  var root, states = {}, $state, queue = {}, abstractKey = 'abstract';

  // Builds state properties from definition passed to registerState()
  var stateBuilder = {

    // Derive parent state from a hierarchical name only if 'parent' is not explicitly defined.
    // state.children = [];
    // if (parent) parent.children.push(state);
    parent: function(state) {
      if (isDefined(state.parent) && state.parent) return findState(state.parent);
      // regex matches any valid composite state name
      // would match "contact.list" but not "contacts"
      var compositeName = /^(.+)\.[^.]+$/.exec(state.name);
      return compositeName ? findState(compositeName[1]) : root;
    },

    // inherit 'data' from parent and override by own values (if any)
    data: function(state) {
      if (state.parent && state.parent.data) {
        state.data = state.self.data = extend({}, state.parent.data, state.data);
      }
      return state.data;
    },

    // Build a URLMatcher if necessary, either via a relative or absolute URL
    url: function(state) {
      var url = state.url, config = { params: state.params || {} };

      if (isString(url)) {
        if (url.charAt(0) == '^') return $urlMatcherFactory.compile(url.substring(1), config);
        return (state.parent.navigable || root).url.concat(url, config);
      }

      if (!url || $urlMatcherFactory.isMatcher(url)) return url;
      throw new Error("Invalid url '" + url + "' in state '" + state + "'");
    },

    // Keep track of the closest ancestor state that has a URL (i.e. is navigable)
    navigable: function(state) {
      return state.url ? state : (state.parent ? state.parent.navigable : null);
    },

    // Own parameters for this state. state.url.params is already built at this point. Create and add non-url params
    ownParams: function(state) {
      var params = state.url && state.url.params || new $$UMFP.ParamSet();
      forEach(state.params || {}, function(config, id) {
        if (!params[id]) params[id] = new $$UMFP.Param(id, null, config, "config");
      });
      return params;
    },

    // Derive parameters for this state and ensure they're a super-set of parent's parameters
    params: function(state) {
      return state.parent && state.parent.params ? extend(state.parent.params.$$new(), state.ownParams) : new $$UMFP.ParamSet();
    },

    // If there is no explicit multi-view configuration, make one up so we don't have
    // to handle both cases in the view directive later. Note that having an explicit
    // 'views' property will mean the default unnamed view properties are ignored. This
    // is also a good time to resolve view names to absolute names, so everything is a
    // straight lookup at link time.
    views: function(state) {
      var views = {};

      forEach(isDefined(state.views) ? state.views : { '': state }, function (view, name) {
        if (name.indexOf('@') < 0) name += '@' + state.parent.name;
        views[name] = view;
      });
      return views;
    },

    // Keep a full path from the root down to this state as this is needed for state activation.
    path: function(state) {
      return state.parent ? state.parent.path.concat(state) : []; // exclude root from path
    },

    // Speed up $state.contains() as it's used a lot
    includes: function(state) {
      var includes = state.parent ? extend({}, state.parent.includes) : {};
      includes[state.name] = true;
      return includes;
    },

    $delegates: {}
  };

  function isRelative(stateName) {
    return stateName.indexOf(".") === 0 || stateName.indexOf("^") === 0;
  }

  function findState(stateOrName, base) {
    if (!stateOrName) return undefined;

    var isStr = isString(stateOrName),
        name  = isStr ? stateOrName : stateOrName.name,
        path  = isRelative(name);

    if (path) {
      if (!base) throw new Error("No reference point given for path '"  + name + "'");
      base = findState(base);
      
      var rel = name.split("."), i = 0, pathLength = rel.length, current = base;

      for (; i < pathLength; i++) {
        if (rel[i] === "" && i === 0) {
          current = base;
          continue;
        }
        if (rel[i] === "^") {
          if (!current.parent) throw new Error("Path '" + name + "' not valid for state '" + base.name + "'");
          current = current.parent;
          continue;
        }
        break;
      }
      rel = rel.slice(i).join(".");
      name = current.name + (current.name && rel ? "." : "") + rel;
    }
    var state = states[name];

    if (state && (isStr || (!isStr && (state === stateOrName || state.self === stateOrName)))) {
      return state;
    }
    return undefined;
  }

  function queueState(parentName, state) {
    if (!queue[parentName]) {
      queue[parentName] = [];
    }
    queue[parentName].push(state);
  }

  function flushQueuedChildren(parentName) {
    var queued = queue[parentName] || [];
    while(queued.length) {
      registerState(queued.shift());
    }
  }

  function registerState(state) {
    // Wrap a new object around the state so we can store our private details easily.
    state = inherit(state, {
      self: state,
      resolve: state.resolve || {},
      toString: function() { return this.name; }
    });

    var name = state.name;
    if (!isString(name) || name.indexOf('@') >= 0) throw new Error("State must have a valid name");
    if (states.hasOwnProperty(name)) throw new Error("State '" + name + "'' is already defined");

    // Get parent name
    var parentName = (name.indexOf('.') !== -1) ? name.substring(0, name.lastIndexOf('.'))
        : (isString(state.parent)) ? state.parent
        : (isObject(state.parent) && isString(state.parent.name)) ? state.parent.name
        : '';

    // If parent is not registered yet, add state to queue and register later
    if (parentName && !states[parentName]) {
      return queueState(parentName, state.self);
    }

    for (var key in stateBuilder) {
      if (isFunction(stateBuilder[key])) state[key] = stateBuilder[key](state, stateBuilder.$delegates[key]);
    }
    states[name] = state;

    // Register the state in the global state list and with $urlRouter if necessary.
    if (!state[abstractKey] && state.url) {
      $urlRouterProvider.when(state.url, ['$match', '$stateParams', function ($match, $stateParams) {
        if ($state.$current.navigable != state || !equalForKeys($match, $stateParams)) {
          $state.transitionTo(state, $match, { inherit: true, location: false });
        }
      }]);
    }

    // Register any queued children
    flushQueuedChildren(name);

    return state;
  }

  // Checks text to see if it looks like a glob.
  function isGlob (text) {
    return text.indexOf('*') > -1;
  }

  // Returns true if glob matches current $state name.
  function doesStateMatchGlob (glob) {
    var globSegments = glob.split('.'),
        segments = $state.$current.name.split('.');

    //match greedy starts
    if (globSegments[0] === '**') {
       segments = segments.slice(indexOf(segments, globSegments[1]));
       segments.unshift('**');
    }
    //match greedy ends
    if (globSegments[globSegments.length - 1] === '**') {
       segments.splice(indexOf(segments, globSegments[globSegments.length - 2]) + 1, Number.MAX_VALUE);
       segments.push('**');
    }

    if (globSegments.length != segments.length) {
      return false;
    }

    //match single stars
    for (var i = 0, l = globSegments.length; i < l; i++) {
      if (globSegments[i] === '*') {
        segments[i] = '*';
      }
    }

    return segments.join('') === globSegments.join('');
  }


  // Implicit root state that is always active
  root = registerState({
    name: '',
    url: '^',
    views: null,
    'abstract': true
  });
  root.navigable = null;


  /**
   * @ngdoc function
   * @name ui.router.state.$stateProvider#decorator
   * @methodOf ui.router.state.$stateProvider
   *
   * @description
   * Allows you to extend (carefully) or override (at your own peril) the 
   * `stateBuilder` object used internally by `$stateProvider`. This can be used 
   * to add custom functionality to ui-router, for example inferring templateUrl 
   * based on the state name.
   *
   * When passing only a name, it returns the current (original or decorated) builder
   * function that matches `name`.
   *
   * The builder functions that can be decorated are listed below. Though not all
   * necessarily have a good use case for decoration, that is up to you to decide.
   *
   * In addition, users can attach custom decorators, which will generate new 
   * properties within the state's internal definition. There is currently no clear 
   * use-case for this beyond accessing internal states (i.e. $state.$current), 
   * however, expect this to become increasingly relevant as we introduce additional 
   * meta-programming features.
   *
   * **Warning**: Decorators should not be interdependent because the order of 
   * execution of the builder functions in non-deterministic. Builder functions 
   * should only be dependent on the state definition object and super function.
   *
   *
   * Existing builder functions and current return values:
   *
   * - **parent** `{object}` - returns the parent state object.
   * - **data** `{object}` - returns state data, including any inherited data that is not
   *   overridden by own values (if any).
   * - **url** `{object}` - returns a {@link ui.router.util.type:UrlMatcher UrlMatcher}
   *   or `null`.
   * - **navigable** `{object}` - returns closest ancestor state that has a URL (aka is 
   *   navigable).
   * - **params** `{object}` - returns an array of state params that are ensured to 
   *   be a super-set of parent's params.
   * - **views** `{object}` - returns a views object where each key is an absolute view 
   *   name (i.e. "viewName@stateName") and each value is the config object 
   *   (template, controller) for the view. Even when you don't use the views object 
   *   explicitly on a state config, one is still created for you internally.
   *   So by decorating this builder function you have access to decorating template 
   *   and controller properties.
   * - **ownParams** `{object}` - returns an array of params that belong to the state, 
   *   not including any params defined by ancestor states.
   * - **path** `{string}` - returns the full path from the root down to this state. 
   *   Needed for state activation.
   * - **includes** `{object}` - returns an object that includes every state that 
   *   would pass a `$state.includes()` test.
   *
   * @example
   * <pre>
   * // Override the internal 'views' builder with a function that takes the state
   * // definition, and a reference to the internal function being overridden:
   * $stateProvider.decorator('views', function (state, parent) {
   *   var result = {},
   *       views = parent(state);
   *
   *   angular.forEach(views, function (config, name) {
   *     var autoName = (state.name + '.' + name).replace('.', '/');
   *     config.templateUrl = config.templateUrl || '/partials/' + autoName + '.html';
   *     result[name] = config;
   *   });
   *   return result;
   * });
   *
   * $stateProvider.state('home', {
   *   views: {
   *     'contact.list': { controller: 'ListController' },
   *     'contact.item': { controller: 'ItemController' }
   *   }
   * });
   *
   * // ...
   *
   * $state.go('home');
   * // Auto-populates list and item views with /partials/home/contact/list.html,
   * // and /partials/home/contact/item.html, respectively.
   * </pre>
   *
   * @param {string} name The name of the builder function to decorate. 
   * @param {object} func A function that is responsible for decorating the original 
   * builder function. The function receives two parameters:
   *
   *   - `{object}` - state - The state config object.
   *   - `{object}` - super - The original builder function.
   *
   * @return {object} $stateProvider - $stateProvider instance
   */
  this.decorator = decorator;
  function decorator(name, func) {
    /*jshint validthis: true */
    if (isString(name) && !isDefined(func)) {
      return stateBuilder[name];
    }
    if (!isFunction(func) || !isString(name)) {
      return this;
    }
    if (stateBuilder[name] && !stateBuilder.$delegates[name]) {
      stateBuilder.$delegates[name] = stateBuilder[name];
    }
    stateBuilder[name] = func;
    return this;
  }

  /**
   * @ngdoc function
   * @name ui.router.state.$stateProvider#state
   * @methodOf ui.router.state.$stateProvider
   *
   * @description
   * Registers a state configuration under a given state name. The stateConfig object
   * has the following acceptable properties.
   *
   * @param {string} name A unique state name, e.g. "home", "about", "contacts".
   * To create a parent/child state use a dot, e.g. "about.sales", "home.newest".
   * @param {object} stateConfig State configuration object.
   * @param {string|function=} stateConfig.template
   * <a id='template'></a>
   *   html template as a string or a function that returns
   *   an html template as a string which should be used by the uiView directives. This property 
   *   takes precedence over templateUrl.
   *   
   *   If `template` is a function, it will be called with the following parameters:
   *
   *   - {array.&lt;object&gt;} - state parameters extracted from the current $location.path() by
   *     applying the current state
   *
   * <pre>template:
   *   "<h1>inline template definition</h1>" +
   *   "<div ui-view></div>"</pre>
   * <pre>template: function(params) {
   *       return "<h1>generated template</h1>"; }</pre>
   * </div>
   *
   * @param {string|function=} stateConfig.templateUrl
   * <a id='templateUrl'></a>
   *
   *   path or function that returns a path to an html
   *   template that should be used by uiView.
   *   
   *   If `templateUrl` is a function, it will be called with the following parameters:
   *
   *   - {array.&lt;object&gt;} - state parameters extracted from the current $location.path() by 
   *     applying the current state
   *
   * <pre>templateUrl: "home.html"</pre>
   * <pre>templateUrl: function(params) {
   *     return myTemplates[params.pageId]; }</pre>
   *
   * @param {function=} stateConfig.templateProvider
   * <a id='templateProvider'></a>
   *    Provider function that returns HTML content string.
   * <pre> templateProvider:
   *       function(MyTemplateService, params) {
   *         return MyTemplateService.getTemplate(params.pageId);
   *       }</pre>
   *
   * @param {string|function=} stateConfig.controller
   * <a id='controller'></a>
   *
   *  Controller fn that should be associated with newly
   *   related scope or the name of a registered controller if passed as a string.
   *   Optionally, the ControllerAs may be declared here.
   * <pre>controller: "MyRegisteredController"</pre>
   * <pre>controller:
   *     "MyRegisteredController as fooCtrl"}</pre>
   * <pre>controller: function($scope, MyService) {
   *     $scope.data = MyService.getData(); }</pre>
   *
   * @param {function=} stateConfig.controllerProvider
   * <a id='controllerProvider'></a>
   *
   * Injectable provider function that returns the actual controller or string.
   * <pre>controllerProvider:
   *   function(MyResolveData) {
   *     if (MyResolveData.foo)
   *       return "FooCtrl"
   *     else if (MyResolveData.bar)
   *       return "BarCtrl";
   *     else return function($scope) {
   *       $scope.baz = "Qux";
   *     }
   *   }</pre>
   *
   * @param {string=} stateConfig.controllerAs
   * <a id='controllerAs'></a>
   * 
   * A controller alias name. If present the controller will be
   *   published to scope under the controllerAs name.
   * <pre>controllerAs: "myCtrl"</pre>
   *
   * @param {object=} stateConfig.resolve
   * <a id='resolve'></a>
   *
   * An optional map&lt;string, function&gt; of dependencies which
   *   should be injected into the controller. If any of these dependencies are promises, 
   *   the router will wait for them all to be resolved before the controller is instantiated.
   *   If all the promises are resolved successfully, the $stateChangeSuccess event is fired
   *   and the values of the resolved promises are injected into any controllers that reference them.
   *   If any  of the promises are rejected the $stateChangeError event is fired.
   *
   *   The map object is:
   *   
   *   - key - {string}: name of dependency to be injected into controller
   *   - factory - {string|function}: If string then it is alias for service. Otherwise if function, 
   *     it is injected and return value it treated as dependency. If result is a promise, it is 
   *     resolved before its value is injected into controller.
   *
   * <pre>resolve: {
   *     myResolve1:
   *       function($http, $stateParams) {
   *         return $http.get("/api/foos/"+stateParams.fooID);
   *       }
   *     }</pre>
   *
   * @param {string=} stateConfig.url
   * <a id='url'></a>
   *
   *   A url fragment with optional parameters. When a state is navigated or
   *   transitioned to, the `$stateParams` service will be populated with any 
   *   parameters that were passed.
   *
   * examples:
   * <pre>url: "/home"
   * url: "/users/:userid"
   * url: "/books/{bookid:[a-zA-Z_-]}"
   * url: "/books/{categoryid:int}"
   * url: "/books/{publishername:string}/{categoryid:int}"
   * url: "/messages?before&after"
   * url: "/messages?{before:date}&{after:date}"</pre>
   * url: "/messages/:mailboxid?{before:date}&{after:date}"
   *
   * @param {object=} stateConfig.views
   * <a id='views'></a>
   * an optional map&lt;string, object&gt; which defined multiple views, or targets views
   * manually/explicitly.
   *
   * Examples:
   *
   * Targets three named `ui-view`s in the parent state's template
   * <pre>views: {
   *     header: {
   *       controller: "headerCtrl",
   *       templateUrl: "header.html"
   *     }, body: {
   *       controller: "bodyCtrl",
   *       templateUrl: "body.html"
   *     }, footer: {
   *       controller: "footCtrl",
   *       templateUrl: "footer.html"
   *     }
   *   }</pre>
   *
   * Targets named `ui-view="header"` from grandparent state 'top''s template, and named `ui-view="body" from parent state's template.
   * <pre>views: {
   *     'header@top': {
   *       controller: "msgHeaderCtrl",
   *       templateUrl: "msgHeader.html"
   *     }, 'body': {
   *       controller: "messagesCtrl",
   *       templateUrl: "messages.html"
   *     }
   *   }</pre>
   *
   * @param {boolean=} [stateConfig.abstract=false]
   * <a id='abstract'></a>
   * An abstract state will never be directly activated,
   *   but can provide inherited properties to its common children states.
   * <pre>abstract: true</pre>
   *
   * @param {function=} stateConfig.onEnter
   * <a id='onEnter'></a>
   *
   * Callback function for when a state is entered. Good way
   *   to trigger an action or dispatch an event, such as opening a dialog.
   * If minifying your scripts, make sure to explictly annotate this function,
   * because it won't be automatically annotated by your build tools.
   *
   * <pre>onEnter: function(MyService, $stateParams) {
   *     MyService.foo($stateParams.myParam);
   * }</pre>
   *
   * @param {function=} stateConfig.onExit
   * <a id='onExit'></a>
   *
   * Callback function for when a state is exited. Good way to
   *   trigger an action or dispatch an event, such as opening a dialog.
   * If minifying your scripts, make sure to explictly annotate this function,
   * because it won't be automatically annotated by your build tools.
   *
   * <pre>onExit: function(MyService, $stateParams) {
   *     MyService.cleanup($stateParams.myParam);
   * }</pre>
   *
   * @param {boolean=} [stateConfig.reloadOnSearch=true]
   * <a id='reloadOnSearch'></a>
   *
   * If `false`, will not retrigger the same state
   *   just because a search/query parameter has changed (via $location.search() or $location.hash()). 
   *   Useful for when you'd like to modify $location.search() without triggering a reload.
   * <pre>reloadOnSearch: false</pre>
   *
   * @param {object=} stateConfig.data
   * <a id='data'></a>
   *
   * Arbitrary data object, useful for custom configuration.  The parent state's `data` is
   *   prototypally inherited.  In other words, adding a data property to a state adds it to
   *   the entire subtree via prototypal inheritance.
   *
   * <pre>data: {
   *     requiredRole: 'foo'
   * } </pre>
   *
   * @param {object=} stateConfig.params
   * <a id='params'></a>
   *
   * A map which optionally configures parameters declared in the `url`, or
   *   defines additional non-url parameters.  For each parameter being
   *   configured, add a configuration object keyed to the name of the parameter.
   *
   *   Each parameter configuration object may contain the following properties:
   *
   *   - ** value ** - {object|function=}: specifies the default value for this
   *     parameter.  This implicitly sets this parameter as optional.
   *
   *     When UI-Router routes to a state and no value is
   *     specified for this parameter in the URL or transition, the
   *     default value will be used instead.  If `value` is a function,
   *     it will be injected and invoked, and the return value used.
   *
   *     *Note*: `undefined` is treated as "no default value" while `null`
   *     is treated as "the default value is `null`".
   *
   *     *Shorthand*: If you only need to configure the default value of the
   *     parameter, you may use a shorthand syntax.   In the **`params`**
   *     map, instead mapping the param name to a full parameter configuration
   *     object, simply set map it to the default parameter value, e.g.:
   *
   * <pre>// define a parameter's default value
   * params: {
   *     param1: { value: "defaultValue" }
   * }
   * // shorthand default values
   * params: {
   *     param1: "defaultValue",
   *     param2: "param2Default"
   * }</pre>
   *
   *   - ** array ** - {boolean=}: *(default: false)* If true, the param value will be
   *     treated as an array of values.  If you specified a Type, the value will be
   *     treated as an array of the specified Type.  Note: query parameter values
   *     default to a special `"auto"` mode.
   *
   *     For query parameters in `"auto"` mode, if multiple  values for a single parameter
   *     are present in the URL (e.g.: `/foo?bar=1&bar=2&bar=3`) then the values
   *     are mapped to an array (e.g.: `{ foo: [ '1', '2', '3' ] }`).  However, if
   *     only one value is present (e.g.: `/foo?bar=1`) then the value is treated as single
   *     value (e.g.: `{ foo: '1' }`).
   *
   * <pre>params: {
   *     param1: { array: true }
   * }</pre>
   *
   *   - ** squash ** - {bool|string=}: `squash` configures how a default parameter value is represented in the URL when
   *     the current parameter value is the same as the default value. If `squash` is not set, it uses the
   *     configured default squash policy.
   *     (See {@link ui.router.util.$urlMatcherFactory#methods_defaultSquashPolicy `defaultSquashPolicy()`})
   *
   *   There are three squash settings:
   *
   *     - false: The parameter's default value is not squashed.  It is encoded and included in the URL
   *     - true: The parameter's default value is omitted from the URL.  If the parameter is preceeded and followed
   *       by slashes in the state's `url` declaration, then one of those slashes are omitted.
   *       This can allow for cleaner looking URLs.
   *     - `"<arbitrary string>"`: The parameter's default value is replaced with an arbitrary placeholder of  your choice.
   *
   * <pre>params: {
   *     param1: {
   *       value: "defaultId",
   *       squash: true
   * } }
   * // squash "defaultValue" to "~"
   * params: {
   *     param1: {
   *       value: "defaultValue",
   *       squash: "~"
   * } }
   * </pre>
   *
   *
   * @example
   * <pre>
   * // Some state name examples
   *
   * // stateName can be a single top-level name (must be unique).
   * $stateProvider.state("home", {});
   *
   * // Or it can be a nested state name. This state is a child of the
   * // above "home" state.
   * $stateProvider.state("home.newest", {});
   *
   * // Nest states as deeply as needed.
   * $stateProvider.state("home.newest.abc.xyz.inception", {});
   *
   * // state() returns $stateProvider, so you can chain state declarations.
   * $stateProvider
   *   .state("home", {})
   *   .state("about", {})
   *   .state("contacts", {});
   * </pre>
   *
   */
  this.state = state;
  function state(name, definition) {
    /*jshint validthis: true */
    if (isObject(name)) definition = name;
    else definition.name = name;
    registerState(definition);
    return this;
  }

  /**
   * @ngdoc object
   * @name ui.router.state.$state
   *
   * @requires $rootScope
   * @requires $q
   * @requires ui.router.state.$view
   * @requires $injector
   * @requires ui.router.util.$resolve
   * @requires ui.router.state.$stateParams
   * @requires ui.router.router.$urlRouter
   *
   * @property {object} params A param object, e.g. {sectionId: section.id)}, that 
   * you'd like to test against the current active state.
   * @property {object} current A reference to the state's config object. However 
   * you passed it in. Useful for accessing custom data.
   * @property {object} transition Currently pending transition. A promise that'll 
   * resolve or reject.
   *
   * @description
   * `$state` service is responsible for representing states as well as transitioning
   * between them. It also provides interfaces to ask for current state or even states
   * you're coming from.
   */
  this.$get = $get;
  $get.$inject = ['$rootScope', '$q', '$view', '$injector', '$resolve', '$stateParams', '$urlRouter', '$location', '$urlMatcherFactory'];
  function $get(   $rootScope,   $q,   $view,   $injector,   $resolve,   $stateParams,   $urlRouter,   $location,   $urlMatcherFactory) {

    var TransitionSuperseded = $q.reject(new Error('transition superseded'));
    var TransitionPrevented = $q.reject(new Error('transition prevented'));
    var TransitionAborted = $q.reject(new Error('transition aborted'));
    var TransitionFailed = $q.reject(new Error('transition failed'));

    // Handles the case where a state which is the target of a transition is not found, and the user
    // can optionally retry or defer the transition
    function handleRedirect(redirect, state, params, options) {
      /**
       * @ngdoc event
       * @name ui.router.state.$state#$stateNotFound
       * @eventOf ui.router.state.$state
       * @eventType broadcast on root scope
       * @description
       * Fired when a requested state **cannot be found** using the provided state name during transition.
       * The event is broadcast allowing any handlers a single chance to deal with the error (usually by
       * lazy-loading the unfound state). A special `unfoundState` object is passed to the listener handler,
       * you can see its three properties in the example. You can use `event.preventDefault()` to abort the
       * transition and the promise returned from `go` will be rejected with a `'transition aborted'` value.
       *
       * @param {Object} event Event object.
       * @param {Object} unfoundState Unfound State information. Contains: `to, toParams, options` properties.
       * @param {State} fromState Current state object.
       * @param {Object} fromParams Current state params.
       *
       * @example
       *
       * <pre>
       * // somewhere, assume lazy.state has not been defined
       * $state.go("lazy.state", {a:1, b:2}, {inherit:false});
       *
       * // somewhere else
       * $scope.$on('$stateNotFound',
       * function(event, unfoundState, fromState, fromParams){
       *     console.log(unfoundState.to); // "lazy.state"
       *     console.log(unfoundState.toParams); // {a:1, b:2}
       *     console.log(unfoundState.options); // {inherit:false} + default options
       * })
       * </pre>
       */
      var evt = $rootScope.$broadcast('$stateNotFound', redirect, state, params);

      if (evt.defaultPrevented) {
        $urlRouter.update();
        return TransitionAborted;
      }

      if (!evt.retry) {
        return null;
      }

      // Allow the handler to return a promise to defer state lookup retry
      if (options.$retry) {
        $urlRouter.update();
        return TransitionFailed;
      }
      var retryTransition = $state.transition = $q.when(evt.retry);

      retryTransition.then(function() {
        if (retryTransition !== $state.transition) return TransitionSuperseded;
        redirect.options.$retry = true;
        return $state.transitionTo(redirect.to, redirect.toParams, redirect.options);
      }, function() {
        return TransitionAborted;
      });
      $urlRouter.update();

      return retryTransition;
    }

    root.locals = { resolve: null, globals: { $stateParams: {} } };

    $state = {
      params: {},
      current: root.self,
      $current: root,
      transition: null
    };

    /**
     * @ngdoc function
     * @name ui.router.state.$state#reload
     * @methodOf ui.router.state.$state
     *
     * @description
     * A method that force reloads the current state. All resolves are re-resolved, events are not re-fired, 
     * and controllers reinstantiated (bug with controllers reinstantiating right now, fixing soon).
     *
     * @example
     * <pre>
     * var app angular.module('app', ['ui.router']);
     *
     * app.controller('ctrl', function ($scope, $state) {
     *   $scope.reload = function(){
     *     $state.reload();
     *   }
     * });
     * </pre>
     *
     * `reload()` is just an alias for:
     * <pre>
     * $state.transitionTo($state.current, $stateParams, { 
     *   reload: true, inherit: false, notify: true
     * });
     * </pre>
     *
     * @returns {promise} A promise representing the state of the new transition. See
     * {@link ui.router.state.$state#methods_go $state.go}.
     */
    $state.reload = function reload() {
      return $state.transitionTo($state.current, $stateParams, { reload: true, inherit: false, notify: true });
    };

    /**
     * @ngdoc function
     * @name ui.router.state.$state#go
     * @methodOf ui.router.state.$state
     *
     * @description
     * Convenience method for transitioning to a new state. `$state.go` calls 
     * `$state.transitionTo` internally but automatically sets options to 
     * `{ location: true, inherit: true, relative: $state.$current, notify: true }`. 
     * This allows you to easily use an absolute or relative to path and specify 
     * only the parameters you'd like to update (while letting unspecified parameters 
     * inherit from the currently active ancestor states).
     *
     * @example
     * <pre>
     * var app = angular.module('app', ['ui.router']);
     *
     * app.controller('ctrl', function ($scope, $state) {
     *   $scope.changeState = function () {
     *     $state.go('contact.detail');
     *   };
     * });
     * </pre>
     * <img src='../ngdoc_assets/StateGoExamples.png'/>
     *
     * @param {string} to Absolute state name or relative state path. Some examples:
     *
     * - `$state.go('contact.detail')` - will go to the `contact.detail` state
     * - `$state.go('^')` - will go to a parent state
     * - `$state.go('^.sibling')` - will go to a sibling state
     * - `$state.go('.child.grandchild')` - will go to grandchild state
     *
     * @param {object=} params A map of the parameters that will be sent to the state, 
     * will populate $stateParams. Any parameters that are not specified will be inherited from currently 
     * defined parameters. This allows, for example, going to a sibling state that shares parameters
     * specified in a parent state. Parameter inheritance only works between common ancestor states, I.e.
     * transitioning to a sibling will get you the parameters for all parents, transitioning to a child
     * will get you all current parameters, etc.
     * @param {object=} options Options object. The options are:
     *
     * - **`location`** - {boolean=true|string=} - If `true` will update the url in the location bar, if `false`
     *    will not. If string, must be `"replace"`, which will update url and also replace last history record.
     * - **`inherit`** - {boolean=true}, If `true` will inherit url parameters from current url.
     * - **`relative`** - {object=$state.$current}, When transitioning with relative path (e.g '^'), 
     *    defines which state to be relative from.
     * - **`notify`** - {boolean=true}, If `true` will broadcast $stateChangeStart and $stateChangeSuccess events.
     * - **`reload`** (v0.2.5) - {boolean=false}, If `true` will force transition even if the state or params 
     *    have not changed, aka a reload of the same state. It differs from reloadOnSearch because you'd
     *    use this when you want to force a reload when *everything* is the same, including search params.
     *
     * @returns {promise} A promise representing the state of the new transition.
     *
     * Possible success values:
     *
     * - $state.current
     *
     * <br/>Possible rejection values:
     *
     * - 'transition superseded' - when a newer transition has been started after this one
     * - 'transition prevented' - when `event.preventDefault()` has been called in a `$stateChangeStart` listener
     * - 'transition aborted' - when `event.preventDefault()` has been called in a `$stateNotFound` listener or
     *   when a `$stateNotFound` `event.retry` promise errors.
     * - 'transition failed' - when a state has been unsuccessfully found after 2 tries.
     * - *resolve error* - when an error has occurred with a `resolve`
     *
     */
    $state.go = function go(to, params, options) {
      return $state.transitionTo(to, params, extend({ inherit: true, relative: $state.$current }, options));
    };

    /**
     * @ngdoc function
     * @name ui.router.state.$state#transitionTo
     * @methodOf ui.router.state.$state
     *
     * @description
     * Low-level method for transitioning to a new state. {@link ui.router.state.$state#methods_go $state.go}
     * uses `transitionTo` internally. `$state.go` is recommended in most situations.
     *
     * @example
     * <pre>
     * var app = angular.module('app', ['ui.router']);
     *
     * app.controller('ctrl', function ($scope, $state) {
     *   $scope.changeState = function () {
     *     $state.transitionTo('contact.detail');
     *   };
     * });
     * </pre>
     *
     * @param {string} to State name.
     * @param {object=} toParams A map of the parameters that will be sent to the state,
     * will populate $stateParams.
     * @param {object=} options Options object. The options are:
     *
     * - **`location`** - {boolean=true|string=} - If `true` will update the url in the location bar, if `false`
     *    will not. If string, must be `"replace"`, which will update url and also replace last history record.
     * - **`inherit`** - {boolean=false}, If `true` will inherit url parameters from current url.
     * - **`relative`** - {object=}, When transitioning with relative path (e.g '^'), 
     *    defines which state to be relative from.
     * - **`notify`** - {boolean=true}, If `true` will broadcast $stateChangeStart and $stateChangeSuccess events.
     * - **`reload`** (v0.2.5) - {boolean=false}, If `true` will force transition even if the state or params 
     *    have not changed, aka a reload of the same state. It differs from reloadOnSearch because you'd
     *    use this when you want to force a reload when *everything* is the same, including search params.
     *
     * @returns {promise} A promise representing the state of the new transition. See
     * {@link ui.router.state.$state#methods_go $state.go}.
     */
    $state.transitionTo = function transitionTo(to, toParams, options) {
      toParams = toParams || {};
      options = extend({
        location: true, inherit: false, relative: null, notify: true, reload: false, $retry: false
      }, options || {});

      var from = $state.$current, fromParams = $state.params, fromPath = from.path;
      var evt, toState = findState(to, options.relative);

      if (!isDefined(toState)) {
        var redirect = { to: to, toParams: toParams, options: options };
        var redirectResult = handleRedirect(redirect, from.self, fromParams, options);

        if (redirectResult) {
          return redirectResult;
        }

        // Always retry once if the $stateNotFound was not prevented
        // (handles either redirect changed or state lazy-definition)
        to = redirect.to;
        toParams = redirect.toParams;
        options = redirect.options;
        toState = findState(to, options.relative);

        if (!isDefined(toState)) {
          if (!options.relative) throw new Error("No such state '" + to + "'");
          throw new Error("Could not resolve '" + to + "' from state '" + options.relative + "'");
        }
      }
      if (toState[abstractKey]) throw new Error("Cannot transition to abstract state '" + to + "'");
      if (options.inherit) toParams = inheritParams($stateParams, toParams || {}, $state.$current, toState);
      if (!toState.params.$$validates(toParams)) return TransitionFailed;

      toParams = toState.params.$$values(toParams);
      to = toState;

      var toPath = to.path;

      // Starting from the root of the path, keep all levels that haven't changed
      var keep = 0, state = toPath[keep], locals = root.locals, toLocals = [];

      if (!options.reload) {
        while (state && state === fromPath[keep] && state.ownParams.$$equals(toParams, fromParams)) {
          locals = toLocals[keep] = state.locals;
          keep++;
          state = toPath[keep];
        }
      }

      // If we're going to the same state and all locals are kept, we've got nothing to do.
      // But clear 'transition', as we still want to cancel any other pending transitions.
      // TODO: We may not want to bump 'transition' if we're called from a location change
      // that we've initiated ourselves, because we might accidentally abort a legitimate
      // transition initiated from code?
      if (shouldTriggerReload(to, from, locals, options)) {
        if (to.self.reloadOnSearch !== false) $urlRouter.update();
        $state.transition = null;
        return $q.when($state.current);
      }

      // Filter parameters before we pass them to event handlers etc.
      toParams = filterByKeys(to.params.$$keys(), toParams || {});

      // Broadcast start event and cancel the transition if requested
      if (options.notify) {
        /**
         * @ngdoc event
         * @name ui.router.state.$state#$stateChangeStart
         * @eventOf ui.router.state.$state
         * @eventType broadcast on root scope
         * @description
         * Fired when the state transition **begins**. You can use `event.preventDefault()`
         * to prevent the transition from happening and then the transition promise will be
         * rejected with a `'transition prevented'` value.
         *
         * @param {Object} event Event object.
         * @param {State} toState The state being transitioned to.
         * @param {Object} toParams The params supplied to the `toState`.
         * @param {State} fromState The current state, pre-transition.
         * @param {Object} fromParams The params supplied to the `fromState`.
         *
         * @example
         *
         * <pre>
         * $rootScope.$on('$stateChangeStart',
         * function(event, toState, toParams, fromState, fromParams){
         *     event.preventDefault();
         *     // transitionTo() promise will be rejected with
         *     // a 'transition prevented' error
         * })
         * </pre>
         */
        if ($rootScope.$broadcast('$stateChangeStart', to.self, toParams, from.self, fromParams).defaultPrevented) {
          $urlRouter.update();
          return TransitionPrevented;
        }
      }

      // Resolve locals for the remaining states, but don't update any global state just
      // yet -- if anything fails to resolve the current state needs to remain untouched.
      // We also set up an inheritance chain for the locals here. This allows the view directive
      // to quickly look up the correct definition for each view in the current state. Even
      // though we create the locals object itself outside resolveState(), it is initially
      // empty and gets filled asynchronously. We need to keep track of the promise for the
      // (fully resolved) current locals, and pass this down the chain.
      var resolved = $q.when(locals);

      for (var l = keep; l < toPath.length; l++, state = toPath[l]) {
        locals = toLocals[l] = inherit(locals);
        resolved = resolveState(state, toParams, state === to, resolved, locals, options);
      }

      // Once everything is resolved, we are ready to perform the actual transition
      // and return a promise for the new state. We also keep track of what the
      // current promise is, so that we can detect overlapping transitions and
      // keep only the outcome of the last transition.
      var transition = $state.transition = resolved.then(function () {
        var l, entering, exiting;

        if ($state.transition !== transition) return TransitionSuperseded;

        // Exit 'from' states not kept
        for (l = fromPath.length - 1; l >= keep; l--) {
          exiting = fromPath[l];
          if (exiting.self.onExit) {
            $injector.invoke(exiting.self.onExit, exiting.self, exiting.locals.globals);
          }
          exiting.locals = null;
        }

        // Enter 'to' states not kept
        for (l = keep; l < toPath.length; l++) {
          entering = toPath[l];
          entering.locals = toLocals[l];
          if (entering.self.onEnter) {
            $injector.invoke(entering.self.onEnter, entering.self, entering.locals.globals);
          }
        }

        // Run it again, to catch any transitions in callbacks
        if ($state.transition !== transition) return TransitionSuperseded;

        // Update globals in $state
        $state.$current = to;
        $state.current = to.self;
        $state.params = toParams;
        copy($state.params, $stateParams);
        $state.transition = null;

        if (options.location && to.navigable) {
          $urlRouter.push(to.navigable.url, to.navigable.locals.globals.$stateParams, {
            $$avoidResync: true, replace: options.location === 'replace'
          });
        }

        if (options.notify) {
        /**
         * @ngdoc event
         * @name ui.router.state.$state#$stateChangeSuccess
         * @eventOf ui.router.state.$state
         * @eventType broadcast on root scope
         * @description
         * Fired once the state transition is **complete**.
         *
         * @param {Object} event Event object.
         * @param {State} toState The state being transitioned to.
         * @param {Object} toParams The params supplied to the `toState`.
         * @param {State} fromState The current state, pre-transition.
         * @param {Object} fromParams The params supplied to the `fromState`.
         */
          $rootScope.$broadcast('$stateChangeSuccess', to.self, toParams, from.self, fromParams);
        }
        $urlRouter.update(true);

        return $state.current;
      }, function (error) {
        if ($state.transition !== transition) return TransitionSuperseded;

        $state.transition = null;
        /**
         * @ngdoc event
         * @name ui.router.state.$state#$stateChangeError
         * @eventOf ui.router.state.$state
         * @eventType broadcast on root scope
         * @description
         * Fired when an **error occurs** during transition. It's important to note that if you
         * have any errors in your resolve functions (javascript errors, non-existent services, etc)
         * they will not throw traditionally. You must listen for this $stateChangeError event to
         * catch **ALL** errors.
         *
         * @param {Object} event Event object.
         * @param {State} toState The state being transitioned to.
         * @param {Object} toParams The params supplied to the `toState`.
         * @param {State} fromState The current state, pre-transition.
         * @param {Object} fromParams The params supplied to the `fromState`.
         * @param {Error} error The resolve error object.
         */
        evt = $rootScope.$broadcast('$stateChangeError', to.self, toParams, from.self, fromParams, error);

        if (!evt.defaultPrevented) {
            $urlRouter.update();
        }

        return $q.reject(error);
      });

      return transition;
    };

    /**
     * @ngdoc function
     * @name ui.router.state.$state#is
     * @methodOf ui.router.state.$state
     *
     * @description
     * Similar to {@link ui.router.state.$state#methods_includes $state.includes},
     * but only checks for the full state name. If params is supplied then it will be
     * tested for strict equality against the current active params object, so all params
     * must match with none missing and no extras.
     *
     * @example
     * <pre>
     * $state.$current.name = 'contacts.details.item';
     *
     * // absolute name
     * $state.is('contact.details.item'); // returns true
     * $state.is(contactDetailItemStateObject); // returns true
     *
     * // relative name (. and ^), typically from a template
     * // E.g. from the 'contacts.details' template
     * <div ng-class="{highlighted: $state.is('.item')}">Item</div>
     * </pre>
     *
     * @param {string|object} stateOrName The state name (absolute or relative) or state object you'd like to check.
     * @param {object=} params A param object, e.g. `{sectionId: section.id}`, that you'd like
     * to test against the current active state.
     * @param {object=} options An options object.  The options are:
     *
     * - **`relative`** - {string|object} -  If `stateOrName` is a relative state name and `options.relative` is set, .is will
     * test relative to `options.relative` state (or name).
     *
     * @returns {boolean} Returns true if it is the state.
     */
    $state.is = function is(stateOrName, params, options) {
      options = extend({ relative: $state.$current }, options || {});
      var state = findState(stateOrName, options.relative);

      if (!isDefined(state)) { return undefined; }
      if ($state.$current !== state) { return false; }
      return params ? equalForKeys(state.params.$$values(params), $stateParams) : true;
    };

    /**
     * @ngdoc function
     * @name ui.router.state.$state#includes
     * @methodOf ui.router.state.$state
     *
     * @description
     * A method to determine if the current active state is equal to or is the child of the
     * state stateName. If any params are passed then they will be tested for a match as well.
     * Not all the parameters need to be passed, just the ones you'd like to test for equality.
     *
     * @example
     * Partial and relative names
     * <pre>
     * $state.$current.name = 'contacts.details.item';
     *
     * // Using partial names
     * $state.includes("contacts"); // returns true
     * $state.includes("contacts.details"); // returns true
     * $state.includes("contacts.details.item"); // returns true
     * $state.includes("contacts.list"); // returns false
     * $state.includes("about"); // returns false
     *
     * // Using relative names (. and ^), typically from a template
     * // E.g. from the 'contacts.details' template
     * <div ng-class="{highlighted: $state.includes('.item')}">Item</div>
     * </pre>
     *
     * Basic globbing patterns
     * <pre>
     * $state.$current.name = 'contacts.details.item.url';
     *
     * $state.includes("*.details.*.*"); // returns true
     * $state.includes("*.details.**"); // returns true
     * $state.includes("**.item.**"); // returns true
     * $state.includes("*.details.item.url"); // returns true
     * $state.includes("*.details.*.url"); // returns true
     * $state.includes("*.details.*"); // returns false
     * $state.includes("item.**"); // returns false
     * </pre>
     *
     * @param {string} stateOrName A partial name, relative name, or glob pattern
     * to be searched for within the current state name.
     * @param {object=} params A param object, e.g. `{sectionId: section.id}`,
     * that you'd like to test against the current active state.
     * @param {object=} options An options object.  The options are:
     *
     * - **`relative`** - {string|object=} -  If `stateOrName` is a relative state reference and `options.relative` is set,
     * .includes will test relative to `options.relative` state (or name).
     *
     * @returns {boolean} Returns true if it does include the state
     */
    $state.includes = function includes(stateOrName, params, options) {
      options = extend({ relative: $state.$current }, options || {});
      if (isString(stateOrName) && isGlob(stateOrName)) {
        if (!doesStateMatchGlob(stateOrName)) {
          return false;
        }
        stateOrName = $state.$current.name;
      }

      var state = findState(stateOrName, options.relative);
      if (!isDefined(state)) { return undefined; }
      if (!isDefined($state.$current.includes[state.name])) { return false; }
      return params ? equalForKeys(state.params.$$values(params), $stateParams, objectKeys(params)) : true;
    };


    /**
     * @ngdoc function
     * @name ui.router.state.$state#href
     * @methodOf ui.router.state.$state
     *
     * @description
     * A url generation method that returns the compiled url for the given state populated with the given params.
     *
     * @example
     * <pre>
     * expect($state.href("about.person", { person: "bob" })).toEqual("/about/bob");
     * </pre>
     *
     * @param {string|object} stateOrName The state name or state object you'd like to generate a url from.
     * @param {object=} params An object of parameter values to fill the state's required parameters.
     * @param {object=} options Options object. The options are:
     *
     * - **`lossy`** - {boolean=true} -  If true, and if there is no url associated with the state provided in the
     *    first parameter, then the constructed href url will be built from the first navigable ancestor (aka
     *    ancestor with a valid url).
     * - **`inherit`** - {boolean=true}, If `true` will inherit url parameters from current url.
     * - **`relative`** - {object=$state.$current}, When transitioning with relative path (e.g '^'), 
     *    defines which state to be relative from.
     * - **`absolute`** - {boolean=false},  If true will generate an absolute url, e.g. "http://www.example.com/fullurl".
     * 
     * @returns {string} compiled state url
     */
    $state.href = function href(stateOrName, params, options) {
      options = extend({
        lossy:    true,
        inherit:  true,
        absolute: false,
        relative: $state.$current
      }, options || {});

      var state = findState(stateOrName, options.relative);

      if (!isDefined(state)) return null;
      if (options.inherit) params = inheritParams($stateParams, params || {}, $state.$current, state);
      
      var nav = (state && options.lossy) ? state.navigable : state;

      if (!nav || nav.url === undefined || nav.url === null) {
        return null;
      }
      return $urlRouter.href(nav.url, filterByKeys(state.params.$$keys(), params || {}), {
        absolute: options.absolute
      });
    };

    /**
     * @ngdoc function
     * @name ui.router.state.$state#get
     * @methodOf ui.router.state.$state
     *
     * @description
     * Returns the state configuration object for any specific state or all states.
     *
     * @param {string|object=} stateOrName (absolute or relative) If provided, will only get the config for
     * the requested state. If not provided, returns an array of ALL state configs.
     * @param {string|object=} context When stateOrName is a relative state reference, the state will be retrieved relative to context.
     * @returns {Object|Array} State configuration object or array of all objects.
     */
    $state.get = function (stateOrName, context) {
      if (arguments.length === 0) return map(objectKeys(states), function(name) { return states[name].self; });
      var state = findState(stateOrName, context || $state.$current);
      return (state && state.self) ? state.self : null;
    };

    function resolveState(state, params, paramsAreFiltered, inherited, dst, options) {
      // Make a restricted $stateParams with only the parameters that apply to this state if
      // necessary. In addition to being available to the controller and onEnter/onExit callbacks,
      // we also need $stateParams to be available for any $injector calls we make during the
      // dependency resolution process.
      var $stateParams = (paramsAreFiltered) ? params : filterByKeys(state.params.$$keys(), params);
      var locals = { $stateParams: $stateParams };

      // Resolve 'global' dependencies for the state, i.e. those not specific to a view.
      // We're also including $stateParams in this; that way the parameters are restricted
      // to the set that should be visible to the state, and are independent of when we update
      // the global $state and $stateParams values.
      dst.resolve = $resolve.resolve(state.resolve, locals, dst.resolve, state);
      var promises = [dst.resolve.then(function (globals) {
        dst.globals = globals;
      })];
      if (inherited) promises.push(inherited);

      // Resolve template and dependencies for all views.
      forEach(state.views, function (view, name) {
        var injectables = (view.resolve && view.resolve !== state.resolve ? view.resolve : {});
        injectables.$template = [ function () {
          return $view.load(name, { view: view, locals: locals, params: $stateParams, notify: options.notify }) || '';
        }];

        promises.push($resolve.resolve(injectables, locals, dst.resolve, state).then(function (result) {
          // References to the controller (only instantiated at link time)
          if (isFunction(view.controllerProvider) || isArray(view.controllerProvider)) {
            var injectLocals = angular.extend({}, injectables, locals);
            result.$$controller = $injector.invoke(view.controllerProvider, null, injectLocals);
          } else {
            result.$$controller = view.controller;
          }
          // Provide access to the state itself for internal use
          result.$$state = state;
          result.$$controllerAs = view.controllerAs;
          dst[name] = result;
        }));
      });

      // Wait for all the promises and then return the activation object
      return $q.all(promises).then(function (values) {
        return dst;
      });
    }

    return $state;
  }

  function shouldTriggerReload(to, from, locals, options) {
    if (to === from && ((locals === from.locals && !options.reload) || (to.self.reloadOnSearch === false))) {
      return true;
    }
  }
}

angular.module('ui.router.state')
  .value('$stateParams', {})
  .provider('$state', $StateProvider);


$ViewProvider.$inject = [];
function $ViewProvider() {

  this.$get = $get;
  /**
   * @ngdoc object
   * @name ui.router.state.$view
   *
   * @requires ui.router.util.$templateFactory
   * @requires $rootScope
   *
   * @description
   *
   */
  $get.$inject = ['$rootScope', '$templateFactory'];
  function $get(   $rootScope,   $templateFactory) {
    return {
      // $view.load('full.viewName', { template: ..., controller: ..., resolve: ..., async: false, params: ... })
      /**
       * @ngdoc function
       * @name ui.router.state.$view#load
       * @methodOf ui.router.state.$view
       *
       * @description
       *
       * @param {string} name name
       * @param {object} options option object.
       */
      load: function load(name, options) {
        var result, defaults = {
          template: null, controller: null, view: null, locals: null, notify: true, async: true, params: {}
        };
        options = extend(defaults, options);

        if (options.view) {
          result = $templateFactory.fromConfig(options.view, options.params, options.locals);
        }
        if (result && options.notify) {
        /**
         * @ngdoc event
         * @name ui.router.state.$state#$viewContentLoading
         * @eventOf ui.router.state.$view
         * @eventType broadcast on root scope
         * @description
         *
         * Fired once the view **begins loading**, *before* the DOM is rendered.
         *
         * @param {Object} event Event object.
         * @param {Object} viewConfig The view config properties (template, controller, etc).
         *
         * @example
         *
         * <pre>
         * $scope.$on('$viewContentLoading',
         * function(event, viewConfig){
         *     // Access to all the view config properties.
         *     // and one special property 'targetView'
         *     // viewConfig.targetView
         * });
         * </pre>
         */
          $rootScope.$broadcast('$viewContentLoading', options);
        }
        return result;
      }
    };
  }
}

angular.module('ui.router.state').provider('$view', $ViewProvider);

/**
 * @ngdoc object
 * @name ui.router.state.$uiViewScrollProvider
 *
 * @description
 * Provider that returns the {@link ui.router.state.$uiViewScroll} service function.
 */
function $ViewScrollProvider() {

  var useAnchorScroll = false;

  /**
   * @ngdoc function
   * @name ui.router.state.$uiViewScrollProvider#useAnchorScroll
   * @methodOf ui.router.state.$uiViewScrollProvider
   *
   * @description
   * Reverts back to using the core [`$anchorScroll`](http://docs.angularjs.org/api/ng.$anchorScroll) service for
   * scrolling based on the url anchor.
   */
  this.useAnchorScroll = function () {
    useAnchorScroll = true;
  };

  /**
   * @ngdoc object
   * @name ui.router.state.$uiViewScroll
   *
   * @requires $anchorScroll
   * @requires $timeout
   *
   * @description
   * When called with a jqLite element, it scrolls the element into view (after a
   * `$timeout` so the DOM has time to refresh).
   *
   * If you prefer to rely on `$anchorScroll` to scroll the view to the anchor,
   * this can be enabled by calling {@link ui.router.state.$uiViewScrollProvider#methods_useAnchorScroll `$uiViewScrollProvider.useAnchorScroll()`}.
   */
  this.$get = ['$anchorScroll', '$timeout', function ($anchorScroll, $timeout) {
    if (useAnchorScroll) {
      return $anchorScroll;
    }

    return function ($element) {
      $timeout(function () {
        $element[0].scrollIntoView();
      }, 0, false);
    };
  }];
}

angular.module('ui.router.state').provider('$uiViewScroll', $ViewScrollProvider);

/**
 * @ngdoc directive
 * @name ui.router.state.directive:ui-view
 *
 * @requires ui.router.state.$state
 * @requires $compile
 * @requires $controller
 * @requires $injector
 * @requires ui.router.state.$uiViewScroll
 * @requires $document
 *
 * @restrict ECA
 *
 * @description
 * The ui-view directive tells $state where to place your templates.
 *
 * @param {string=} name A view name. The name should be unique amongst the other views in the
 * same state. You can have views of the same name that live in different states.
 *
 * @param {string=} autoscroll It allows you to set the scroll behavior of the browser window
 * when a view is populated. By default, $anchorScroll is overridden by ui-router's custom scroll
 * service, {@link ui.router.state.$uiViewScroll}. This custom service let's you
 * scroll ui-view elements into view when they are populated during a state activation.
 *
 * *Note: To revert back to old [`$anchorScroll`](http://docs.angularjs.org/api/ng.$anchorScroll)
 * functionality, call `$uiViewScrollProvider.useAnchorScroll()`.*
 *
 * @param {string=} onload Expression to evaluate whenever the view updates.
 * 
 * @example
 * A view can be unnamed or named. 
 * <pre>
 * <!-- Unnamed -->
 * <div ui-view></div> 
 * 
 * <!-- Named -->
 * <div ui-view="viewName"></div>
 * </pre>
 *
 * You can only have one unnamed view within any template (or root html). If you are only using a 
 * single view and it is unnamed then you can populate it like so:
 * <pre>
 * <div ui-view></div> 
 * $stateProvider.state("home", {
 *   template: "<h1>HELLO!</h1>"
 * })
 * </pre>
 * 
 * The above is a convenient shortcut equivalent to specifying your view explicitly with the {@link ui.router.state.$stateProvider#views `views`}
 * config property, by name, in this case an empty name:
 * <pre>
 * $stateProvider.state("home", {
 *   views: {
 *     "": {
 *       template: "<h1>HELLO!</h1>"
 *     }
 *   }    
 * })
 * </pre>
 * 
 * But typically you'll only use the views property if you name your view or have more than one view 
 * in the same template. There's not really a compelling reason to name a view if its the only one, 
 * but you could if you wanted, like so:
 * <pre>
 * <div ui-view="main"></div>
 * </pre> 
 * <pre>
 * $stateProvider.state("home", {
 *   views: {
 *     "main": {
 *       template: "<h1>HELLO!</h1>"
 *     }
 *   }    
 * })
 * </pre>
 * 
 * Really though, you'll use views to set up multiple views:
 * <pre>
 * <div ui-view></div>
 * <div ui-view="chart"></div> 
 * <div ui-view="data"></div> 
 * </pre>
 * 
 * <pre>
 * $stateProvider.state("home", {
 *   views: {
 *     "": {
 *       template: "<h1>HELLO!</h1>"
 *     },
 *     "chart": {
 *       template: "<chart_thing/>"
 *     },
 *     "data": {
 *       template: "<data_thing/>"
 *     }
 *   }    
 * })
 * </pre>
 *
 * Examples for `autoscroll`:
 *
 * <pre>
 * <!-- If autoscroll present with no expression,
 *      then scroll ui-view into view -->
 * <ui-view autoscroll/>
 *
 * <!-- If autoscroll present with valid expression,
 *      then scroll ui-view into view if expression evaluates to true -->
 * <ui-view autoscroll='true'/>
 * <ui-view autoscroll='false'/>
 * <ui-view autoscroll='scopeVariable'/>
 * </pre>
 */
$ViewDirective.$inject = ['$state', '$injector', '$uiViewScroll', '$interpolate'];
function $ViewDirective(   $state,   $injector,   $uiViewScroll,   $interpolate) {

  function getService() {
    return ($injector.has) ? function(service) {
      return $injector.has(service) ? $injector.get(service) : null;
    } : function(service) {
      try {
        return $injector.get(service);
      } catch (e) {
        return null;
      }
    };
  }

  var service = getService(),
      $animator = service('$animator'),
      $animate = service('$animate');

  // Returns a set of DOM manipulation functions based on which Angular version
  // it should use
  function getRenderer(attrs, scope) {
    var statics = function() {
      return {
        enter: function (element, target, cb) { target.after(element); cb(); },
        leave: function (element, cb) { element.remove(); cb(); }
      };
    };

    if ($animate) {
      return {
        enter: function(element, target, cb) {
          var promise = $animate.enter(element, null, target, cb);
          if (promise && promise.then) promise.then(cb);
        },
        leave: function(element, cb) {
          var promise = $animate.leave(element, cb);
          if (promise && promise.then) promise.then(cb);
        }
      };
    }

    if ($animator) {
      var animate = $animator && $animator(scope, attrs);

      return {
        enter: function(element, target, cb) {animate.enter(element, null, target); cb(); },
        leave: function(element, cb) { animate.leave(element); cb(); }
      };
    }

    return statics();
  }

  var directive = {
    restrict: 'ECA',
    terminal: true,
    priority: 400,
    transclude: 'element',
    compile: function (tElement, tAttrs, $transclude) {
      return function (scope, $element, attrs) {
        var previousEl, currentEl, currentScope, latestLocals,
            onloadExp     = attrs.onload || '',
            autoScrollExp = attrs.autoscroll,
            renderer      = getRenderer(attrs, scope);

        scope.$on('$stateChangeSuccess', function() {
          updateView(false);
        });
        scope.$on('$viewContentLoading', function() {
          updateView(false);
        });

        updateView(true);

        function cleanupLastView() {
          if (previousEl) {
            previousEl.remove();
            previousEl = null;
          }

          if (currentScope) {
            currentScope.$destroy();
            currentScope = null;
          }

          if (currentEl) {
            renderer.leave(currentEl, function() {
              previousEl = null;
            });

            previousEl = currentEl;
            currentEl = null;
          }
        }

        function updateView(firstTime) {
          var newScope,
              name            = getUiViewName(scope, attrs, $element, $interpolate),
              previousLocals  = name && $state.$current && $state.$current.locals[name];

          if (!firstTime && previousLocals === latestLocals) return; // nothing to do
          newScope = scope.$new();
          latestLocals = $state.$current.locals[name];

          var clone = $transclude(newScope, function(clone) {
            renderer.enter(clone, $element, function onUiViewEnter() {
              if(currentScope) {
                currentScope.$emit('$viewContentAnimationEnded');
              }

              if (angular.isDefined(autoScrollExp) && !autoScrollExp || scope.$eval(autoScrollExp)) {
                $uiViewScroll(clone);
              }
            });
            cleanupLastView();
          });

          currentEl = clone;
          currentScope = newScope;
          /**
           * @ngdoc event
           * @name ui.router.state.directive:ui-view#$viewContentLoaded
           * @eventOf ui.router.state.directive:ui-view
           * @eventType emits on ui-view directive scope
           * @description           *
           * Fired once the view is **loaded**, *after* the DOM is rendered.
           *
           * @param {Object} event Event object.
           */
          currentScope.$emit('$viewContentLoaded');
          currentScope.$eval(onloadExp);
        }
      };
    }
  };

  return directive;
}

$ViewDirectiveFill.$inject = ['$compile', '$controller', '$state', '$interpolate'];
function $ViewDirectiveFill (  $compile,   $controller,   $state,   $interpolate) {
  return {
    restrict: 'ECA',
    priority: -400,
    compile: function (tElement) {
      var initial = tElement.html();
      return function (scope, $element, attrs) {
        var current = $state.$current,
            name = getUiViewName(scope, attrs, $element, $interpolate),
            locals  = current && current.locals[name];

        if (! locals) {
          return;
        }

        $element.data('$uiView', { name: name, state: locals.$$state });
        $element.html(locals.$template ? locals.$template : initial);

        var link = $compile($element.contents());

        if (locals.$$controller) {
          locals.$scope = scope;
          var controller = $controller(locals.$$controller, locals);
          if (locals.$$controllerAs) {
            scope[locals.$$controllerAs] = controller;
          }
          $element.data('$ngControllerController', controller);
          $element.children().data('$ngControllerController', controller);
        }

        link(scope);
      };
    }
  };
}

/**
 * Shared ui-view code for both directives:
 * Given scope, element, and its attributes, return the view's name
 */
function getUiViewName(scope, attrs, element, $interpolate) {
  var name = $interpolate(attrs.uiView || attrs.name || '')(scope);
  var inherited = element.inheritedData('$uiView');
  return name.indexOf('@') >= 0 ?  name :  (name + '@' + (inherited ? inherited.state.name : ''));
}

angular.module('ui.router.state').directive('uiView', $ViewDirective);
angular.module('ui.router.state').directive('uiView', $ViewDirectiveFill);

function parseStateRef(ref, current) {
  var preparsed = ref.match(/^\s*({[^}]*})\s*$/), parsed;
  if (preparsed) ref = current + '(' + preparsed[1] + ')';
  parsed = ref.replace(/\n/g, " ").match(/^([^(]+?)\s*(\((.*)\))?$/);
  if (!parsed || parsed.length !== 4) throw new Error("Invalid state ref '" + ref + "'");
  return { state: parsed[1], paramExpr: parsed[3] || null };
}

function stateContext(el) {
  var stateData = el.parent().inheritedData('$uiView');

  if (stateData && stateData.state && stateData.state.name) {
    return stateData.state;
  }
}

/**
 * @ngdoc directive
 * @name ui.router.state.directive:ui-sref
 *
 * @requires ui.router.state.$state
 * @requires $timeout
 *
 * @restrict A
 *
 * @description
 * A directive that binds a link (`<a>` tag) to a state. If the state has an associated 
 * URL, the directive will automatically generate & update the `href` attribute via 
 * the {@link ui.router.state.$state#methods_href $state.href()} method. Clicking 
 * the link will trigger a state transition with optional parameters. 
 *
 * Also middle-clicking, right-clicking, and ctrl-clicking on the link will be 
 * handled natively by the browser.
 *
 * You can also use relative state paths within ui-sref, just like the relative 
 * paths passed to `$state.go()`. You just need to be aware that the path is relative
 * to the state that the link lives in, in other words the state that loaded the 
 * template containing the link.
 *
 * You can specify options to pass to {@link ui.router.state.$state#go $state.go()}
 * using the `ui-sref-opts` attribute. Options are restricted to `location`, `inherit`,
 * and `reload`.
 *
 * @example
 * Here's an example of how you'd use ui-sref and how it would compile. If you have the 
 * following template:
 * <pre>
 * <a ui-sref="home">Home</a> | <a ui-sref="about">About</a> | <a ui-sref="{page: 2}">Next page</a>
 * 
 * <ul>
 *     <li ng-repeat="contact in contacts">
 *         <a ui-sref="contacts.detail({ id: contact.id })">{{ contact.name }}</a>
 *     </li>
 * </ul>
 * </pre>
 * 
 * Then the compiled html would be (assuming Html5Mode is off and current state is contacts):
 * <pre>
 * <a href="#/home" ui-sref="home">Home</a> | <a href="#/about" ui-sref="about">About</a> | <a href="#/contacts?page=2" ui-sref="{page: 2}">Next page</a>
 * 
 * <ul>
 *     <li ng-repeat="contact in contacts">
 *         <a href="#/contacts/1" ui-sref="contacts.detail({ id: contact.id })">Joe</a>
 *     </li>
 *     <li ng-repeat="contact in contacts">
 *         <a href="#/contacts/2" ui-sref="contacts.detail({ id: contact.id })">Alice</a>
 *     </li>
 *     <li ng-repeat="contact in contacts">
 *         <a href="#/contacts/3" ui-sref="contacts.detail({ id: contact.id })">Bob</a>
 *     </li>
 * </ul>
 *
 * <a ui-sref="home" ui-sref-opts="{reload: true}">Home</a>
 * </pre>
 *
 * @param {string} ui-sref 'stateName' can be any valid absolute or relative state
 * @param {Object} ui-sref-opts options to pass to {@link ui.router.state.$state#go $state.go()}
 */
$StateRefDirective.$inject = ['$state', '$timeout'];
function $StateRefDirective($state, $timeout) {
  var allowedOptions = ['location', 'inherit', 'reload'];

  return {
    restrict: 'A',
    require: ['?^uiSrefActive', '?^uiSrefActiveEq'],
    link: function(scope, element, attrs, uiSrefActive) {
      var ref = parseStateRef(attrs.uiSref, $state.current.name);
      var params = null, url = null, base = stateContext(element) || $state.$current;
      var newHref = null, isAnchor = element.prop("tagName") === "A";
      var isForm = element[0].nodeName === "FORM";
      var attr = isForm ? "action" : "href", nav = true;

      var options = { relative: base, inherit: true };
      var optionsOverride = scope.$eval(attrs.uiSrefOpts) || {};

      angular.forEach(allowedOptions, function(option) {
        if (option in optionsOverride) {
          options[option] = optionsOverride[option];
        }
      });

      var update = function(newVal) {
        if (newVal) params = angular.copy(newVal);
        if (!nav) return;

        newHref = $state.href(ref.state, params, options);

        var activeDirective = uiSrefActive[1] || uiSrefActive[0];
        if (activeDirective) {
          activeDirective.$$setStateInfo(ref.state, params);
        }
        if (newHref === null) {
          nav = false;
          return false;
        }
        attrs.$set(attr, newHref);
      };

      if (ref.paramExpr) {
        scope.$watch(ref.paramExpr, function(newVal, oldVal) {
          if (newVal !== params) update(newVal);
        }, true);
        params = angular.copy(scope.$eval(ref.paramExpr));
      }
      update();

      if (isForm) return;

      element.bind("click", function(e) {
        var button = e.which || e.button;
        if ( !(button > 1 || e.ctrlKey || e.metaKey || e.shiftKey || element.attr('target')) ) {
          // HACK: This is to allow ng-clicks to be processed before the transition is initiated:
          var transition = $timeout(function() {
            $state.go(ref.state, params, options);
          });
          e.preventDefault();

          // if the state has no URL, ignore one preventDefault from the <a> directive.
          var ignorePreventDefaultCount = isAnchor && !newHref ? 1: 0;
          e.preventDefault = function() {
            if (ignorePreventDefaultCount-- <= 0)
              $timeout.cancel(transition);
          };
        }
      });
    }
  };
}

/**
 * @ngdoc directive
 * @name ui.router.state.directive:ui-sref-active
 *
 * @requires ui.router.state.$state
 * @requires ui.router.state.$stateParams
 * @requires $interpolate
 *
 * @restrict A
 *
 * @description
 * A directive working alongside ui-sref to add classes to an element when the
 * related ui-sref directive's state is active, and removing them when it is inactive.
 * The primary use-case is to simplify the special appearance of navigation menus
 * relying on `ui-sref`, by having the "active" state's menu button appear different,
 * distinguishing it from the inactive menu items.
 *
 * ui-sref-active can live on the same element as ui-sref or on a parent element. The first
 * ui-sref-active found at the same level or above the ui-sref will be used.
 *
 * Will activate when the ui-sref's target state or any child state is active. If you
 * need to activate only when the ui-sref target state is active and *not* any of
 * it's children, then you will use
 * {@link ui.router.state.directive:ui-sref-active-eq ui-sref-active-eq}
 *
 * @example
 * Given the following template:
 * <pre>
 * <ul>
 *   <li ui-sref-active="active" class="item">
 *     <a href ui-sref="app.user({user: 'bilbobaggins'})">@bilbobaggins</a>
 *   </li>
 * </ul>
 * </pre>
 *
 *
 * When the app state is "app.user" (or any children states), and contains the state parameter "user" with value "bilbobaggins",
 * the resulting HTML will appear as (note the 'active' class):
 * <pre>
 * <ul>
 *   <li ui-sref-active="active" class="item active">
 *     <a ui-sref="app.user({user: 'bilbobaggins'})" href="/users/bilbobaggins">@bilbobaggins</a>
 *   </li>
 * </ul>
 * </pre>
 *
 * The class name is interpolated **once** during the directives link time (any further changes to the
 * interpolated value are ignored).
 *
 * Multiple classes may be specified in a space-separated format:
 * <pre>
 * <ul>
 *   <li ui-sref-active='class1 class2 class3'>
 *     <a ui-sref="app.user">link</a>
 *   </li>
 * </ul>
 * </pre>
 */

/**
 * @ngdoc directive
 * @name ui.router.state.directive:ui-sref-active-eq
 *
 * @requires ui.router.state.$state
 * @requires ui.router.state.$stateParams
 * @requires $interpolate
 *
 * @restrict A
 *
 * @description
 * The same as {@link ui.router.state.directive:ui-sref-active ui-sref-active} but will only activate
 * when the exact target state used in the `ui-sref` is active; no child states.
 *
 */
$StateRefActiveDirective.$inject = ['$state', '$stateParams', '$interpolate'];
function $StateRefActiveDirective($state, $stateParams, $interpolate) {
  return  {
    restrict: "A",
    controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
      var state, params, activeClass;

      // There probably isn't much point in $observing this
      // uiSrefActive and uiSrefActiveEq share the same directive object with some
      // slight difference in logic routing
      activeClass = $interpolate($attrs.uiSrefActiveEq || $attrs.uiSrefActive || '', false)($scope);

      // Allow uiSref to communicate with uiSrefActive[Equals]
      this.$$setStateInfo = function (newState, newParams) {
        state = $state.get(newState, stateContext($element));
        params = newParams;
        update();
      };

      $scope.$on('$stateChangeSuccess', update);

      // Update route state
      function update() {
        if (isMatch()) {
          $element.addClass(activeClass);
        } else {
          $element.removeClass(activeClass);
        }
      }

      function isMatch() {
        if (typeof $attrs.uiSrefActiveEq !== 'undefined') {
          return state && $state.is(state.name, params);
        } else {
          return state && $state.includes(state.name, params);
        }
      }
    }]
  };
}

angular.module('ui.router.state')
  .directive('uiSref', $StateRefDirective)
  .directive('uiSrefActive', $StateRefActiveDirective)
  .directive('uiSrefActiveEq', $StateRefActiveDirective);

/**
 * @ngdoc filter
 * @name ui.router.state.filter:isState
 *
 * @requires ui.router.state.$state
 *
 * @description
 * Translates to {@link ui.router.state.$state#methods_is $state.is("stateName")}.
 */
$IsStateFilter.$inject = ['$state'];
function $IsStateFilter($state) {
  var isFilter = function (state) {
    return $state.is(state);
  };
  isFilter.$stateful = true;
  return isFilter;
}

/**
 * @ngdoc filter
 * @name ui.router.state.filter:includedByState
 *
 * @requires ui.router.state.$state
 *
 * @description
 * Translates to {@link ui.router.state.$state#methods_includes $state.includes('fullOrPartialStateName')}.
 */
$IncludedByStateFilter.$inject = ['$state'];
function $IncludedByStateFilter($state) {
  var includesFilter = function (state) {
    return $state.includes(state);
  };
  includesFilter.$stateful = true;
  return  includesFilter;
}

angular.module('ui.router.state')
  .filter('isState', $IsStateFilter)
  .filter('includedByState', $IncludedByStateFilter);
})(window, window.angular);
},{}],"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\app.js":[function(require,module,exports){
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

//require('./common.js');
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

/*main.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/main");

    $stateProvider
        .state('main', {
            url: "/main",
            templateUrl: "/static/partials/main.html",
            controller: 'wallCtrl as lenta'
        })
        .state('wall-single', {
            url: "/wall-single/:topicId",
            templateUrl: "/static/partials/wall-single.html",
            controller: 'wallSingleCtrl as wallSingle'
        })
        .state('talks', {
            url: "/talks",
            templateUrl: "/static/partials/talks.html",
            controller: 'talksCtrl as talks'
        })
        .state('talks-single', {
            url: "/talks-single/:talkId",
            templateUrl: "/static/partials/talks-single.html",
            controller: 'talksSingleCtrl as talks'
        })
        .state('profit', {
            url: "/profit",
            templateUrl: "/static/partials/profit.html",
            controller: 'advertsCtrl as adverts'
        })
        .state('profit-single', {
            url: "/profit-single/:advertId",
            templateUrl: "/static/partials/profit-single.html",
            controller: 'advertsSingleCtrl as adverts'
        })
        .state('dialogs', {
            url: "/dialogs",
            templateUrl: "/static/partials/dialogs.html",
            controller: 'dialogsCtrl as dialogs'
        })
        .state('dialog-single', {
            url: "/dialog-single/:dialogId",
            templateUrl: "/static/partials/dialog-single.html",
            controller: 'dialogCtrl as dialog'
        })
        .state('neighbours', {
            url: "/neighbours",
            templateUrl: "/static/partials/neighbours.html",
            controller: 'neighboursCtrl as neighbours'
        })
        .state('profile', {
            url: "/profile/:userId",
            templateUrl: "/static/partials/profile.html",
            controller: 'profileCtrl as profile'
        })
        .state('profile.change-avatar', {
            url: "/change-avatar",
            templateUrl: "/static/partials/profile.changeAvatar.html",
            controller: 'changeAvatarCtrl as changeAvatar'
        })
        .state('settings', {
            url: "/settings",
            templateUrl: "/static/partials/settings.html",
            controller: 'settingsCtrl as settings'
        })
        .state('maps', {
            url: "/maps",
            templateUrl: "/static/partials/maps.html",
            controller: 'mapsCtrl as maps'
        })
        .state('set-info', {
            url: "/set-info",
            templateUrl: "/static/partials/set-info.html",
            controller: 'setInfoCtrl as setInfo'
        })
        .state('counters', {
            url: "/counters",
            templateUrl: "/static/partials/counters.html",
            controller: 'countersCtrl as counters'
        })
        .state('counters-history', {
            url: "/counters-history/:counterId",
            templateUrl: "/static/partials/counters-history.html",
            controller: 'countersHistoryCtrl as countersHistory'
        })
        .state('important', {
            url: "/important",
            templateUrl: "/static/partials/important.html",
            controller: 'importantCtrl as important'
        })
        .state('nearby', {
            url: "/nearby",
            templateUrl: "/static/partials/nearby.html",
            controller: 'nearbyCtrl as nearby'
        })
        .state('nearby-single', {
            url: "/nearby-single/:nearbyId",
            templateUrl: "/static/partials/nearby-single.html",
            controller: 'nearbySingleCtrl as nearby'
        })
        .state('rubrics', {
            url: "/rubrics/:rubricId",
            templateUrl: "/static/partials/rubrics.html",
            controller: 'rubricsCtrl as talks'
        })
        .state('rubrics-single', {
            url: "/rubric-single/:rubricId",
            templateUrl: "/static/partials/rubrics-single.html",
            controller: 'rubricsSingleCtrl as talks'
        })
        .state('blog', {
            url: "/blog"
        })
        .state('about', {
            url: "/about"
        })
        .state('contacts', {
            url: "/contacts"
        })
        .state('cabinet', {
            url: "/cabinet",
            templateUrl: "/static/partials/business/cabinet.html",
            controller: 'cabinetCtrl as nearby'
        })
        .state('edit', {
            url: "/edit",
            templateUrl: "/static/partials/business/edit.html",
            controller: 'editCtrl as edit'
        })
        .state('statistic', {
            url: "/statistic",
            templateUrl: "/static/partials/business/statistic.html",
            controller: 'statisticCtrl as maps'
        })
});

main.config(function($locationProvider){
    $locationProvider.html5Mode(true);
});*/

},{"./config":"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\config.js","./controllers":"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\index.js","./directives.js":"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\directives.js","./services.js":"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\services.js","angular-file-upload":"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\node_modules\\angular-file-upload\\dist\\angular-file-upload.min.js","angular-ui-router":"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\node_modules\\angular-ui-router\\release\\angular-ui-router.js"}],"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\config.js":[function(require,module,exports){
'use strict';

var config = function($stateProvider, $urlRouterProvider,$locationProvider) {

    $urlRouterProvider.otherwise("/main");

    $stateProvider
        .state('main', {
            url: "/main",
            templateUrl: "/static/partials/main.html",
            controller: 'wallCtrl as lenta'
        })
        .state('wall-single', {
            url: "/wall-single/:topicId",
            templateUrl: "/static/partials/wall-single.html",
            controller: 'wallSingleCtrl as wallSingle'
        })
        .state('talks', {
            url: "/talks",
            templateUrl: "/static/partials/talks.html",
            controller: 'talksCtrl as talks'
        })
        .state('talks-single', {
            url: "/talks-single/:talkId",
            templateUrl: "/static/partials/talks-single.html",
            controller: 'talksSingleCtrl as talks'
        })
        .state('profit', {
            url: "/profit",
            templateUrl: "/static/partials/profit.html",
            controller: 'advertsCtrl as adverts'
        })
        .state('profit-single', {
            url: "/profit-single/:advertId",
            templateUrl: "/static/partials/profit-single.html",
            controller: 'advertsSingleCtrl as adverts'
        })
        .state('dialogs', {
            url: "/dialogs",
            templateUrl: "/static/partials/dialogs.html",
            controller: 'dialogsCtrl as dialogs'
        })
        .state('dialog-single', {
            url: "/dialog-single/:dialogId",
            templateUrl: "/static/partials/dialog-single.html",
            controller: 'dialogCtrl as dialog'
        })
        .state('neighbours', {
            url: "/neighbours",
            templateUrl: "/static/partials/neighbours.html",
            controller: 'neighboursCtrl as neighbours'
        })
        .state('profile', {
            url: "/profile/:userId",
            templateUrl: "/static/partials/profile.html",
            controller: 'profileCtrl as profile'
        })
        .state('profile.change-avatar', {
            url: "/change-avatar",
            templateUrl: "/static/partials/profile.changeAvatar.html",
            controller: 'changeAvatarCtrl as changeAvatar'
        })
        .state('settings', {
            url: "/settings",
            templateUrl: "/static/partials/settings.html",
            controller: 'settingsCtrl as settings'
        })
        .state('maps', {
            url: "/maps",
            templateUrl: "/static/partials/maps.html",
            controller: 'mapsCtrl as maps'
        })
        .state('set-info', {
            url: "/set-info",
            templateUrl: "/static/partials/set-info.html",
            controller: 'setInfoCtrl as setInfo'
        })
        .state('counters', {
            url: "/counters",
            templateUrl: "/static/partials/counters.html",
            controller: 'countersCtrl as counters'
        })
        .state('counters-history', {
            url: "/counters-history/:counterId",
            templateUrl: "/static/partials/counters-history.html",
            controller: 'countersHistoryCtrl as countersHistory'
        })
        .state('important', {
            url: "/important",
            templateUrl: "/static/partials/important.html",
            controller: 'importantCtrl as important'
        })
        .state('nearby', {
            url: "/nearby",
            templateUrl: "/static/partials/nearby.html",
            controller: 'nearbyCtrl as nearby'
        })
        .state('nearby-single', {
            url: "/nearby-single/:nearbyId",
            templateUrl: "/static/partials/nearby-single.html",
            controller: 'nearbySingleCtrl as nearby'
        })
        .state('rubrics', {
            url: "/rubrics/:rubricId",
            templateUrl: "/static/partials/rubrics.html",
            controller: 'rubricsCtrl as talks'
        })
        .state('rubrics-single', {
            url: "/rubric-single/:rubricId",
            templateUrl: "/static/partials/rubrics-single.html",
            controller: 'rubricsSingleCtrl as talks'
        })
        .state('blog', {
            url: "/blog"
        })
        .state('about', {
            url: "/about"
        })
        .state('contacts', {
            url: "/contacts"
        })
        .state('cabinet', {
            url: "/cabinet",
            templateUrl: "/static/partials/business/cabinet.html",
            controller: 'cabinetCtrl as nearby'
        })
        .state('edit', {
            url: "/edit",
            templateUrl: "/static/partials/business/edit.html",
            controller: 'editCtrl as edit'
        })
        .state('statistic', {
            url: "/statistic",
            templateUrl: "/static/partials/business/statistic.html",
            controller: 'statisticCtrl as maps'
        });

    $locationProvider.html5Mode(true);
};

module.exports = [ '$stateProvider','$urlRouterProvider','$locationProvider', config ];

/*main.config(function($locationProvider){
    $locationProvider.html5Mode(true);
});*/

},{}],"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\about.js":[function(require,module,exports){
'use strict';

var aboutCtrl = function($rootScope) {

    $rootScope.base.isFooterBottom = true;

    $('.ng-cloak').removeClass('ng-cloak');

};

module.exports = [ '$rootScope', aboutCtrl ];
},{}],"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\adverts.js":[function(require,module,exports){

var advertsCtrl = function($rootScope) {
        var adverts = this;

        adverts.attachId = "00000";
        $rootScope.setTab(3);
        $rootScope.base.showAllGroups();
        $rootScope.base.isFooterBottom = false;
        showGroupOverBuilding($rootScope.groups);

        /*if(!$rootScope.importantIsLoadedFromTop)
            $rootScope.importantTopics = messageClient.getImportantNews($rootScope.currentGroup.id);
        $rootScope.importantIsLoadedFromTop = false;*/

        /*initAttachImage($('#attachImage-00000'), $('#attach-area-00000')); // для обсуждений
        initAttachDoc($('#attachDoc-00000'), $('#attach-doc-area-00000')); // для обсуждений*/
        initFancyBox($('.adverts'));

        $rootScope.base.createTopicIsHide = true;
        adverts.isAdvertsLoaded = false;
        adverts.groups = userClientGroups;

        adverts.isTalk = true;
        adverts.isAdvert = true;

        adverts.message = {};
        adverts.message.content = adverts.message.default = TEXT_DEFAULT_3;
        adverts.subject = TEXT_DEFAULT_4;

        $rootScope.base.bufferSelectedGroup = adverts.selectedGroup =
        $rootScope.currentGroup = userClientGroups[3];

        $rootScope.currentRubric = null;

        $rootScope.base.initStartParamsForCreateTopic(adverts);

        adverts.answerFirstMessage = TEXT_DEFAULT_2;

        adverts.topics = messageClient.getAdverts(adverts.selectedGroup.id, 0, 1000).topics;

        initAdverts();

        if (!adverts.topics) adverts.topics = [];

        $rootScope.selectGroupInDropdown_adverts = function(groupId){
            adverts.selectedGroup = $rootScope.base.bufferSelectedGroup = selectGroupInDropdown(groupId);
        };

        function initAdverts(){
            var topicLength;
            adverts.topics ? topicLength = adverts.topics.length : topicLength = 0;

            for(var i = 0; i < topicLength;i++){
                adverts.topics[i].lastUpdateEdit = getTiming(adverts.topics[i].lastUpdate);
                adverts.topics[i].label = getLabel(adverts.groups,adverts.topics[i].groupType);
                adverts.topics[i].tagColor = getTagColor(adverts.topics[i].label);
            }
        }

        $rootScope.advertsChangeGroup = function(groupId){

            adverts.topics = messageClient.getAdverts(groupId,0,1000).topics;

            if(adverts.topics) {
                initAdverts();
            }

        };

        $rootScope.selectGroup(getBuildingGroup($rootScope.currentGroup));

        $('.ng-cloak').removeClass('ng-cloak');

    };

module.exports = [ '$rootScope', advertsCtrl ];
},{}],"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\advertsSingle.js":[function(require,module,exports){

var advertsSingleCtrl = function($rootScope,$stateParams) {
        var advert = this,
            fullTalkMessagesLength,
            advertId = $stateParams.advertId;

        $rootScope.base.isFooterBottom = false;

        $rootScope.base.lastLoadedId = 0;
        $rootScope.base.isEarliestMessages = false;
        $rootScope.base.endOfLoaded = false;

        /*if(!$rootScope.importantIsLoadedFromTop)
            $rootScope.importantTopics = messageClient.getImportantNews($rootScope.currentGroup.id);
        $rootScope.importantIsLoadedFromTop = false;*/

        advert.attachId = "00000";
        advert.selectedGroup = $rootScope.currentGroup;
        advert.topics = messageClient.getAdverts(advert.selectedGroup.id, 0, 1000).topics;
        advert.fullTalkTopic = {};
        advert.fullTalkMessages = {};
        advert.fullTalkFirstMessages = [];
        advert.groups = userClientGroups;

        advert.isTalk = true;

        $rootScope.base.initStartParamsForCreateMessage(advert);

        var showFullTalk = function(advert,advertOutsideId){

            initFancyBox($('.adverts-single'));
            var topicLength;
            advert.topics ? topicLength = advert.topics.length : topicLength = 0;

            var advertId = advertOutsideId,
                fullTalkFirstMessagesLength;
            for(var i = 0; i < topicLength; i++){
                if(advertId == advert.topics[i].id){
                    advert.fullTalkTopic = advert.topics[i];

                    $rootScope.base.initStartParamsForCreateTopic(advert.fullTalkTopic);

                    advert.fullTalkTopic.isTalk = true;
                    advert.fullTalkTopic.isAdvert = true;
                    advert.fullTalkTopic.message.createdEdit = getTiming(advert.fullTalkTopic.message.created);
                    advert.fullTalkTopic.label = getLabel(advert.groups,advert.fullTalkTopic.groupType);
                    advert.fullTalkTopic.tagColor = getTagColor(advert.fullTalkTopic.label);

                }
            }
            if(advert.fullTalkTopic.poll != null){
                setPollEditNames(advert.fullTalkTopic.poll);
                advert.fullTalkTopic.metaType = "poll";
            }else{
                advert.fullTalkTopic.metaType = "message";
            }

            advert.fullTalkFirstMessages = messageClient.getFirstLevelMessages(advertId,advert.selectedGroup.id,6,$rootScope.base.lastLoadedId,0,10).messages;

            $rootScope.base.lastLoadedId = $rootScope.base.initFirstMessages(advert.fullTalkFirstMessages);

            $rootScope.base.isAdvertTitles = false;
            $rootScope.base.mainContentTopIsHide = true;
            $rootScope.base.createTopicIsHide = true;

            $rootScope.base.advert = advert;

        };

        showFullTalk(advert,advertId);

        var initFlagsTopic = [];
        advert.showTopicAnswerInput = function(event,fullTalkTopic){
            event.preventDefault();

            advert.answerShow = true;

            if(!initFlagsTopic[fullTalkTopic.id]) {
               // initAttachImage($('#attachImage-' + fullTalkTopic.id), $('#attach-area-' + fullTalkTopic.id));
                //initAttachDoc($('#attachDoc-' + fullTalkTopic.id), $('#attach-doc-area-' + fullTalkTopic.id));
                initFlagsTopic[fullTalkTopic.id] = true;
            }

            advert.fullTalkTopic.answerInputIsShow ?
                advert.fullTalkTopic.answerInputIsShow = false :
                advert.fullTalkTopic.answerInputIsShow = true ;
        };

        var initFlagsMessage = [];
        advert.showMessageAnswerInput = function(event,fullTalkTopic,firstMessage,message){
            event.preventDefault();
            var attachId;

            if(!message){
                // если это сообщение первого уровня
                attachId = fullTalkTopic.id+'-'+firstMessage.id;

                firstMessage.isTalk = true;

                if(!advert.fulladvertFirstMessages) advert.fulladvertFirstMessages = messageClient.getFirstLevelMessages(advertId,advert.selectedGroup.id,6,0,0,1000).messages;
                var fulladvertFirstMessagesLength = advert.fulladvertFirstMessages.length;

                $rootScope.base.initStartParamsForCreateMessage(firstMessage);

                firstMessage.answerInputIsShow ?
                    firstMessage.answerInputIsShow = false :
                    firstMessage.answerInputIsShow = true;


            }else{
                // если простое сообщение
                attachId = fullTalkTopic.id+'-'+message.id;

                message.isTalk = true;

                if(!advert.fullTalkMessages[firstMessage.id]) advert.fullTalkMessages[firstMessage.id] = messageClient.getMessages(advertId,advert.selectedGroup.id,6,firstMessage.id,0,1000).messages;
                var  fullTalkMessagesLength = advert.fullTalkMessages[firstMessage.id].length;

                $rootScope.base.initStartParamsForCreateMessage(message);

                message.answerInputIsShow ?
                    message.answerInputIsShow = false :
                    message.answerInputIsShow = true;


            }

            if(!initFlagsMessage[attachId]) {
                //initAttachImage($('#attachImage-' + attachId), $('#attach-area-' + attachId));
                //initAttachDoc($('#attachDoc-' + attachId), $('#attach-doc-area-' + attachId));

                initFlagsMessage[attachId] = true;
            }
        };

        advert.toggleTreeFirstMessage = function(event,firstMessage){
            event.preventDefault();

            firstMessage.isTreeOpen ?
                firstMessage.isTreeOpen = false :
                firstMessage.isTreeOpen = true ;


            // --------

            advert.fullTalkMessages[firstMessage.id] = messageClient.getMessages(advertId,advert.selectedGroup.id,1,firstMessage.id,0,1000).messages;
            advert.fullTalkMessages[firstMessage.id] ?
                fullTalkMessagesLength = advert.fullTalkMessages[firstMessage.id].length:
                fullTalkMessagesLength = 0;
            if(advert.fullTalkMessages[firstMessage.id] === null) advert.fullTalkMessages[firstMessage.id] = [];

            for(var i = 0; i < fullTalkMessagesLength; i++){
                advert.fullTalkMessages[firstMessage.id][i].answerInputIsShow = false;
                advert.fullTalkMessages[firstMessage.id][i].isTreeOpen = true;
                advert.fullTalkMessages[firstMessage.id][i].isOpen = true;
                advert.fullTalkMessages[firstMessage.id][i].isParentOpen = true;
                advert.fullTalkMessages[firstMessage.id][i].createdEdit = getTiming(advert.fullTalkMessages[firstMessage.id][i].created);
                advert.fullTalkMessages[firstMessage.id][i].answerMessage = TEXT_DEFAULT_2;

            }

        };

        advert.toggleTree = function(event,message,firstMessage){
            event.preventDefault();

            if(!advert.fullTalkMessages[firstMessage.id]) advert.fullTalkMessages[firstMessage.id] = messageClient.getMessages(advertId,advert.selectedGroup.id,1,firstMessage.id,0,1000).messages;
            var fullTalkMessagesLength = advert.fullTalkMessages[firstMessage.id].length;

            message.isTreeOpen ?
                message.isTreeOpen = false :
                message.isTreeOpen = true ;

            var afterCurrentIndex = false,
                nextMessageOnCurrentLevel = false,
                loopMessageOffset,
                parentOpenStatus,
                areAllMyParentsTreeOpen = [],
                checkAreAllMyParentsTreeOpen = true,
                beginOffset = message.offset,
                parentOpenStatusArray = [];

            for(var i = 0; i < fullTalkMessagesLength; i++){
                loopMessageOffset = advert.fullTalkMessages[firstMessage.id][i].offset;

                if(afterCurrentIndex && !nextMessageOnCurrentLevel
                    && message.offset < loopMessageOffset){

                    areAllMyParentsTreeOpen[loopMessageOffset] = true;

                    if(loopMessageOffset - message.offset == 1){
                        //если это непосредственный потомок

                        advert.fullTalkMessages[firstMessage.id][i].isOpen ?
                            advert.fullTalkMessages[firstMessage.id][i].isOpen = false :
                            advert.fullTalkMessages[firstMessage.id][i].isOpen = true ;

                        parentOpenStatusArray[loopMessageOffset] = true;
                        parentOpenStatus = advert.fullTalkMessages[firstMessage.id][i].isOpen;

                        if (!advert.fullTalkMessages[firstMessage.id][i].isTreeOpen){
                            areAllMyParentsTreeOpen[loopMessageOffset] = false;
                        }
                    }else{
                        // если это птомки потомка

                        checkAreAllMyParentsTreeOpen = true;
                        for(var j = beginOffset; j < loopMessageOffset; j++){
                            // проверяем нет ли у кого в предках isTreeOpen = false
                            if(areAllMyParentsTreeOpen[j] == false){
                                checkAreAllMyParentsTreeOpen = false;
                            }
                        }
                        parentOpenStatus && checkAreAllMyParentsTreeOpen ?
                            advert.fullTalkMessages[firstMessage.id][i].isOpen = true :
                            advert.fullTalkMessages[firstMessage.id][i].isOpen = false ;

                        if (!advert.fullTalkMessages[firstMessage.id][i].isTreeOpen){
                            // если у кого-то из предков не открыто дерево
                            areAllMyParentsTreeOpen[loopMessageOffset] = false;
                        }

                        parentOpenStatusArray[loopMessageOffset] = true;
                    }
                }

                if (afterCurrentIndex && loopMessageOffset == message.offset){
                    nextMessageOnCurrentLevel = true;
                    break;
                }
                if(message.id == advert.fullTalkMessages[firstMessage.id][i].id){
                    afterCurrentIndex = true;
                }
            }
        };

        var buff,lastLoadedIdFF;
        advert.addMoreItems = function(){
            var temp = messageClient.getFirstLevelMessages(advertId,advert.selectedGroup.id,1,$rootScope.base.lastLoadedId,0,10),
                buff = temp.messages;
            if(buff) {
                var buffLength = buff.length;

                if(buffLength != 0) {

                    $rootScope.base.lastLoadedId = buff[buffLength - 1].id;

                    if(lastLoadedIdFF != $rootScope.base.lastLoadedId) {
                        $rootScope.base.initFirstMessages(buff);
                        advert.fullTalkFirstMessages = advert.fullTalkFirstMessages.concat(buff);
                    }

                    lastLoadedIdFF = $rootScope.base.lastLoadedId;

                }
            }else{
                $rootScope.base.endOfLoaded = true;
            }

        };

        $('.ng-cloak').removeClass('ng-cloak');
    }

module.exports = [ '$rootScope','$stateParams', advertsSingleCtrl ];
},{}],"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\base.js":[function(require,module,exports){
//var forumControllers = angular.module('forum.controllers', ['ui.select2','infinite-scroll','ngSanitize','yaMap','ui.bootstrap']);

var baseCtrl = function($scope,$rootScope,$state,$filter,$location) {

    $rootScope.IS_BUSINESS = localStorage.getItem('VO_is_business');
    //$rootScope.IS_BUSINESS = 1;
    //localStorage.removeItem('VO_is_business');

        var base = this;
        base.url = $location.url();
        $scope.$on('$locationChangeSuccess', function($event,newState,oldState){
            console.log('change');
            if (newState.indexOf('blog') == -1 && newState.indexOf('about') == -1 && newState.indexOf('contacts') == -1) {
                var isLogin = authClient.checkIfAuthorized();
                if(!isLogin) document.location.replace('/login');

                if(!userClientGroups) userClientGroups = userClient.getUserGroups();
                if(!shortUserInfo) shortUserInfo = userClient.getShortUserInfo();
                if(!hasStart) start();
                base.url = $location.url();
            }
        });

    if(base.url != '/blog' && base.url != '/about' && base.url != '/contacts') {
        if(!hasStart) start();
    }
    var hasStart = false;

    function start(){
        console.log('1',shortUserInfo);
        hasStart = true;
        $rootScope.isTopSearchShow = true;
        base.neighboursLoadStatus = "";
        base.privateMessagesLoadStatus = "";
        base.profileLoadStatus = "";
        base.settingsLoadStatus = "";
        base.mapsLoadStatus = "";

        base.mainContentTopIsHide = false;
        base.createTopicIsHide = true;
        base.me = shortUserInfo;

        base.isFooterBottom = false;

        base.isTalkTitles = true;

        resetPages(base);
        base.lentaIsActive = true;
        base.emptyMessage = "Сообщений пока нет";

        base.textareaBlur = function (message, defaultText, ctrl, isTopic) {
            if (isTopic) {
                if (message == "") ctrl.message.content = defaultText;
            } else {
                if (message == "") ctrl.commentText = defaultText;
            }
            base.isLentaFocus = false;
        };

        base.textareaFocus = function (message, defaultText, ctrl, isTopic) {
            if (isTopic) {
                if (message == defaultText) ctrl.message.content = "";
            } else {
                if (message == defaultText) ctrl.commentText = "";
            }

        };

        base.addPollInput = function (event, obj, isFocus) {
            event.preventDefault();

            var newInput = {counter: 0, name: "" };
            obj.pollInputs.push(newInput);

            if (isFocus) {
                setTimeout(setNewFocus, 200, $(event.target));
            }

        };

        function setNewFocus(el) {
            el.prev().find('input').focus();
        }

        base.showPoll = function (event, obj) {
            event.preventDefault();

            obj.isPollShow = true;
            obj.pollSubject = "";
            obj.poll = null;

            obj.pollInputs = [
                {
                    counter: 0,
                    name: ""
                },
                {
                    counter: 1,
                    name: ""
                }
            ];
            obj.isPollAvailable = false;
        };

        base.doPoll = function (event, poll) {
            event.preventDefault();
            poll.values = [];
            var pollNamesLength = poll.editNames.length;
            var item;

            for (var i = 0; i < pollNamesLength; i++) {
                if (poll.editNames[i].value == 1) {
                    item = i;
                    break;
                }
            }

            var tempPoll = messageClient.doPoll(poll.pollId, item);
            poll.alreadyPoll = true;
            poll.values = tempPoll.values;

            setPollEditNames(poll);

        };

        base.oldTextLength = 0;
        base.messageChange = function (event) {

            var el = event.target,
                clientHeight = el.clientHeight,
                scrollHeight = el.scrollHeight,
                textLength = el.textLength,
                clientWidth = el.clientWidth,
                textLengthPX, newHeight, removeRowCount,
                defaultHeight, newRowCount;

            defaultHeight = TEXTAREA_DEFAULT_HEIGHT;

            /*
             Исходные данные:
             На один символ приходится ~8px в ширину
             Высота строки текста ~14px

             * Здесь выполняем такие действия :
             * 1) Считаем длину текста в пикселях
             * 2) Определяем целое количестов строк, которые удалили
             * 3) Определям новую высоту с учетом высоты удаленного текста
             * */

            //console.log("0 "+scrollHeight+" "+clientHeight);
            if (scrollHeight > clientHeight) {

                el.style.height = scrollHeight + 'px';
            } else if (scrollHeight > defaultHeight) {
                textLengthPX = (parseInt(base.oldTextLength) - textLength) * 8; // 1
                //console.log("2 "+textLengthPX+" "+clientWidth+" "+textLength);
                if (textLengthPX > clientWidth) {
                    // console.log("3 "+textLengthPX+" "+clientWidth);
                    removeRowCount = Math.floor(textLengthPX / clientWidth); // 2
                    newHeight = parseInt(event.target.style.height) - removeRowCount * 14; // 3
                    newHeight > defaultHeight ? event.target.style.height = newHeight + "px" :
                        event.target.style.height = defaultHeight + 'px';

                } else {
                    el.style.height = scrollHeight - 6 + 'px';

                    //console.log("5 "+textLength+" "+textLength*8/clientWidth);
                }
            } else {
                //console.log('4');
                el.style.height = defaultHeight + 'px';
            }
            base.oldTextLength = textLength;
        };

        base.getTextareaHeight = function (textLength, clientWidth, isTopic) {
            /*if(isTopic){
             var k1 = 10,
             k2 = 19;
             }else{*/
            var k1 = 12,
                k2 = 14;
            //}

            var stringLen = textLength * k1;
            if (stringLen > clientWidth) {
                var rowCount = parseInt(stringLen / clientWidth); // сколько строк
                var areaHeight = rowCount * k2;
            } else {
                areaHeight = TEXTAREA_DEFAULT_HEIGHT;
            }

            return areaHeight;
        };

        base.initFirstMessages = function (firstMessages) {
            var fullTalkFirstMessagesLength,
                lastLoadedId;

            firstMessages ?
                fullTalkFirstMessagesLength = firstMessages.length :
                fullTalkFirstMessagesLength = 0;

            if (fullTalkFirstMessagesLength != 0) lastLoadedId = firstMessages[fullTalkFirstMessagesLength - 1].id;

            if (firstMessages === null) firstMessages = [];

            for (var i = 0; i < fullTalkFirstMessagesLength; i++) {
                firstMessages[i].answerInputIsShow = false;
                firstMessages[i].isTreeOpen = false;
                firstMessages[i].isLoaded = false;
                firstMessages[i].answerMessage = TEXT_DEFAULT_2;
                firstMessages[i].createdEdit = getTiming(firstMessages[i].created);

            }

            return lastLoadedId;
        };

        base.deleteMessage = function (message, messagesArray, isTopic, isWall, isDialog) {

            if (isTopic && !isWall || message.isWallSingle) {
                // если talk-single или profit-single

                bootbox.confirm("Вы уверены, что хотите удалить эту тему?", function (result) {
                    if (result) {

                        try {
                            var deleteResult = messageClient.deleteTopic(message.id);
                            message.message.content = deleteResult.message.content;
                        } catch (e) {
                            // вернул null, значит потомков нет
                        }

                        if (message.message.type == 1) {
                            $state.go('talks');
                        } else if (message.message.type == 6) {
                            $state.go('profit');
                        } else if (message.message.type == 5) {
                            $state.go('main');
                        }

                    }
                });
            } else if (isTopic) {
                try {
                    var deleteResult = messageClient.deleteTopic(message.id);
                    message.message.content = deleteResult.message.content;
                } catch (e) {
                    // вернул null, значит удаление произошло чисто
                    var messagesArrayLength = messagesArray.length;

                    for (var i = 0; i < messagesArrayLength; i++) {

                        var currentId;
                        isWall ? currentId = messagesArray[i].topic.id :
                            currentId = messagesArray[i].id;

                        if (currentId == message.id) {
                            messagesArray.splice(i, 1);
                            break;
                        }
                    }
                }
            } else {
                if (isDialog) {
                    dialogClient.deleteDialogMessage(message.id);

                    messagesArrayLength = messagesArray.length;
                    for (var i = 0; i < messagesArrayLength; i++) {
                        if (messagesArray[i].id == message.id) {
                            messagesArray.splice(i, 1);
                            break;
                        }
                    }

                } else {
                    try {
                        deleteResult = messageClient.deleteMessage(message.id);
                        message.content = deleteResult.content;
                    }
                    catch (e) {
                        messagesArrayLength = messagesArray.length;
                        for (var i = 0; i < messagesArrayLength; i++) {
                            if (messagesArray[i].id == message.id) {
                                messagesArray.splice(i, 1);
                                break;
                            }
                        }
                    }
                }

            }
        };

        base.setEdit = function (event, message, isNeedAnswerShow) {
            if(!message.rubric) {
                //message.selRubricName = "Общее";
                message.rubric = {};
                message.rubric.visibleName = "Общее";
                message.rubric.id = 0;
            }

            //$rootScope.currentRubric = message.rubric;

            console.log('setEdit',$rootScope.currentRubric);
            var isTopic;
            (message.message) ? isTopic = true : isTopic = false;

            if (message.isEdit) {
                message.isEdit = false;

                if (isTopic) {
                    message.message.content = $filter('linky')(message.message.content, 'blank');
                    message.message.content = withTags(message.message.content);
                } else {
                    message.content = $filter('linky')(message.commentText, 'blank');
                    message.content = withTags(message.content);
                }

            } else {

                if (isTopic) {
                    message.message.content = withoutTags(message.message.content);
                } else {
                    message.commentText = withoutTags(message.content);
                }

                var el = event.target;

                var h0 = $(el).closest('.text-container').find('.text:eq(0)').height(),
                    h1 = $(el).closest('.text-container').find('.text:eq(1)').height(),
                    h;

                (h0 > h1) ? h = h0 + 24 : h = h1;

                message.isEdit = true;

                if (message.answerInputIsShow) message.answerInputIsShow = false;

                if (isTopic) {
                    var textLen = message.message.content.length;
                } else {
                    textLen = message.content.length;
                }

                /*if(textLen > base.contentLength){
                 h = (textLen/base.contentLength).toFixed(0)*(h-24);
                 }*/

                if (h < TEXTAREA_DEFAULT_HEIGHT) h = TEXTAREA_DEFAULT_HEIGHT;

                $(el).closest('.text-container').find('.edit-message textarea').height(h + 'px');
            }

            if (isNeedAnswerShow) {
                message.answerShow = true;
                message.commentText = message.content;
                message.isTalk = true;
            }

            if (message.isEdit) {
                // здесь рассматривается ситуация когда мы возвращаемся из редактирования,
                // но выше мы уже переключиди флаг, поэтому пишу message.isEdit, а не !message.isEdit
                if (isTopic) {
                    message.message.content = withoutTags(message.message.content);
                } else {
                    message.commentText = withoutTags(message.content);
                }
            }

        };

        base.pageTitle = "Новости";

        base.user = shortUserInfo;

        base.bufferSelectedGroup = userClientGroups[3];

        base.markImportant = function (event, message) {
            event.preventDefault();
            var isImportant;

            if (message.important == 3 || message.important == 2) {
                message.important = 1;
                isImportant = true;
                message.importantText = 'Снять метку "Важное"';
            } else {
                message.important = 3;
                isImportant = false;
                message.importantText = 'Пометить как "Важное"';
            }

            messageClient.markMessageImportant(message.id, isImportant);
        };

        base.markLike = function (event, message) {
            event.preventDefault();
            var isLike;

            if (message.like == 1) {

                $('#like-help-' + message.id).fadeIn(200);

                setTimeout(hideLikeHelp, 2000, message.id);

            }

            message.like = 1;
            messageClient.markMessageLike(message.id);
        };

        base.initStartParamsForCreateTopic = function (ctrl) {
            ctrl.selectedGroup = $rootScope.base.bufferSelectedGroup = $rootScope.currentGroup;
            
            ctrl.isEdit = false;
            ctrl.isCreateMessageError = false;
            ctrl.isPollAvailable = true;

            if (ctrl.id) {
                // если редактирование
                if (ctrl.poll && ctrl.poll.pollId) {
                    ctrl.isPollShow = true;

                    ctrl.pollSubject = ctrl.poll.subject;
                    var namesLength = ctrl.poll.names.length;
                    ctrl.pollInputs = [];
                    for (var i = 0; i < namesLength; i++) {
                        ctrl.pollInputs[i] = {};
                        ctrl.pollInputs[i].counter = i;
                        ctrl.pollInputs[i].name = ctrl.poll.names[i];
                    }
                    ctrl.isPollAvailable = false;
                }
            } else {
                // если создание


                ctrl.isPollShow = false;
                ctrl.pollSubject = "";
                ctrl.pollInputs = [
                    {
                        counter: 0,
                        name: ""
                    },
                    {
                        counter: 1,
                        name: ""
                    }
                ];
                ctrl.attachedImages = [];
            }

        }

        var hideLikeHelp = function (messageId) {
            $('#like-help-' + messageId).fadeOut(200);
        };

        base.showAllGroups = function () {
            var groupsLength = $rootScope.groups.length;
            for (var i = 0; i < groupsLength; i++) {
                $rootScope.groups[i].isShow = true;
                $rootScope.groups[i].selected = false;
            }
            $rootScope.groups[0].selected = true;
            $rootScope.base.bufferSelectedGroup = $rootScope.groups[0];
        };

        base.groups = userClientGroups;
        base.rubrics = userClientRubrics;

        base.goToDialog = function (userId) {
            var users = [];
            users[0] = userId;
            var dialog = dialogClient.getDialog(users, 0);

            $state.go('dialog-single', { 'dialogId': dialog.id});
        };

        base.selectGroupInDropdown = function (groupId, ctrl) {
            $rootScope.base.bufferSelectedGroup = selectGroupInDropdown(groupId);

            //if(!ctrl.isEdit){
            ctrl.selectedGroup = $rootScope.base.bufferSelectedGroup;
            //}
        };

        base.removeAttach = function (message, index, isImage) {
            isImage ?
                message.images.splice(index, 1) :
                message.documents.splice(index, 1);
        };

        $rootScope.initCreateTopic = function (ctrl) {

            if (ctrl.id) {
                // значит редактирование

                setTimeout(pollAttach, 200, ctrl.id, true); // ждем пока загрузится

            } else {
                // значит создание

                setTimeout(pollAttach, 200, ctrl.attachId, false);

            }

        };

        $rootScope.initCreateMessage = function (ctrlId, isEdit) {

            if (isEdit) {

                setTimeout(pollAttach, 200, ctrlId, true);

            } else {

                setTimeout(pollAttach, 200, ctrlId, false);

            }

        };

        function pollAttach(ctrlId, isEdit) {

            if (isEdit) {
                if ($('#attachImage-edit-' + ctrlId).length) {
                    initAttachImage($('#attachImage-edit-' + ctrlId), $('#attach-area-edit-' + ctrlId)); // ��� ����� ��������
                    initAttachDoc($('#attachDoc-edit-' + ctrlId), $('#attach-doc-area-edit-' + ctrlId), isEdit);
                } else {
                    setTimeout(pollAttach, 200, ctrlId, true);
                }
            } else {
                if ($('#attachImage-' + ctrlId).length) {
                    initAttachImage($('#attachImage-' + ctrlId), $('#attach-area-' + ctrlId)); // ��� ����� ��������
                    initAttachDoc($('#attachDoc-' + ctrlId), $('#attach-doc-area-' + ctrlId));
                } else {
                    setTimeout(pollAttach, 200, ctrlId, false);
                }
            }
        }

        function addSingleTalk(talk) {
            console.log('addSingleTalk-0',$rootScope.currentRubric);

            talk.selectedRubric = $rootScope.currentRubric;
            if(!talk.selectedRubric) {
                talk.selectedRubric = {};
                talk.selectedRubric.id = 0;
            }

            if (talk.isEdit) {
                talk.attachedImages = getAttachedImages($('#attach-area-edit-' + talk.id));
                talk.attachedDocs = getAttachedDocs($('#attach-doc-area-edit-' + talk.id), talk.isEdit);
            } else {
                talk.attachedImages = getAttachedImages($('#attach-area-' + talk.attachId));
                talk.attachedDocs = getAttachedDocs($('#attach-doc-area-' + talk.attachId));
            }

            if (talk.subject == TEXT_DEFAULT_4 || talk.subject == "") {

                talk.isCreateTalkError = true;
                talk.createTalkErrorText = "Вы не указали заголовок";

            } else if (talk.attachedImages.length == 0 && (talk.attachedDocs === undefined || talk.attachedDocs.length == 0) && !talk.isPollShow
                && (talk.message.content == TEXT_DEFAULT_3 || !talk.message.content)) {

                talk.isCreateTalkError = true;
                talk.createTalkErrorText = "Вы не ввели сообщение";

            } else if (talk.isPollShow && (!talk.pollSubject || talk.pollInputs[0].name == "" || talk.pollInputs[1].name == "")) {

                talk.isCreateTalkError = true;
                talk.createTalkErrorText = "Вы не указали данные для опроса";

            } else {

                if (talk.message.content == TEXT_DEFAULT_3 && (talk.attachedImages || talk.attachedDocs || talk.isPollShow)) {
                    talk.message.content = "";
                }
                talk.isCreateTalkError = false;

                var isWall = 0, isAdvert = false;
                if (talk.isAdvert) isAdvert = true;

                console.log('addSingleTalk',$rootScope.currentRubric);
                var newTopic = postTopic(talk, isWall, isAdvert, $filter);

                if (newTopic.poll && talk.poll) talk.poll.pollId = newTopic.poll.pollId;

                newTopic.label = getLabel(base.groups, newTopic.groupType);
                newTopic.tagColor = getTagColor(newTopic.label);

                $rootScope.base.createTopicIsHide = true;

                if (talk.isEdit) {
                    cleanAttached($('#attach-area-edit-' + talk.id));
                    cleanAttached($('#attach-doc-area-edit-' + talk.id));
                    talk.isEdit = false;
                } else {
                    cleanAttached($('#attach-area-' + talk.attachId));
                    cleanAttached($('#attach-doc-area-' + talk.attachId));
                    $rootScope.selectGroup($rootScope.base.bufferSelectedGroup);
                    talk.subject = TEXT_DEFAULT_4;
                }
            }
        }

        function createWallTopic(ctrl) {

            if(ctrl.isEdit && !$rootScope.currentRubric) {
                ctrl.selectedRubric = ctrl.rubric;
            }else{
                ctrl.selectedRubric = $rootScope.currentRubric;
            }

            //console.log('WallTopic',ctrl.selectedRubric);

            if (ctrl.isEdit) {
                ctrl.attachedImages = getAttachedImages($('#attach-area-edit-' + ctrl.id));
                ctrl.attachedDocs = getAttachedDocs($('#attach-doc-area-edit-' + ctrl.id), ctrl.isEdit);
            } else {
                ctrl.attachedImages = getAttachedImages($('#attach-area-' + ctrl.attachId));
                ctrl.attachedDocs = getAttachedDocs($('#attach-doc-area-' + ctrl.attachId));
            }

            if (ctrl.attachedImages.length == 0 && ctrl.attachedDocs && ctrl.attachedDocs.length == 0 && !ctrl.isPollShow
                && (ctrl.message.content == TEXT_DEFAULT_1 || !ctrl.message.content)) {

                ctrl.isCreateMessageError = true;
                ctrl.isCreateMessageGroupError = false;
                ctrl.isCreateMessageRubricError = false;

                ctrl.createMessageErrorText = "Вы не ввели сообщение";

            } else if (ctrl.isPollShow && (!ctrl.pollSubject || ctrl.pollInputs[0].name == "" || ctrl.pollInputs[1].name == "")) {

                ctrl.isCreateMessageError = true;
                ctrl.isCreateMessageGroupError = false;
                ctrl.isCreateMessageRubricError = false;

                ctrl.createMessageErrorText = "Вы не указали данные для опроса";

            } else if(!ctrl.selectedGroup){

                ctrl.isCreateMessageError = false;
                ctrl.isGroupsInMessShow = true;
                ctrl.isCreateMessageGroupError = true;
                ctrl.isCreateMessageRubricError = false;

            }else if(ctrl.selectedRubric === null || ctrl.selectedRubric.id === undefined){

                ctrl.isCreateMessageError = false;
                ctrl.isCreateMessageGroupError = false;
                ctrl.isCreateMessageRubricError = true;
                ctrl.isRubricsInMessShow = true;

            }else{

                if (ctrl.message.content == TEXT_DEFAULT_1 && (ctrl.attachedImages || ctrl.attachedDocs || ctrl.isPollShow)) {
                    ctrl.message.content = "";
                }
                ctrl.isCreateMessageError = false;
                ctrl.isOpenMessageBar = false;
                ctrl.isGroupsInMessShow = false;
                ctrl.isRubricsInMessShow = false;

                //console.log('createWallTopic',ctrl.selectedRubric);

                var isWall = 1,
                    newTopic = postTopic(ctrl, isWall, false, $filter);

                if (ctrl.isEdit) {
                    cleanAttached($('#attach-area-edit-' + ctrl.id));
                    cleanAttached($('#attach-doc-area-edit-' + ctrl.id));
                    ctrl.isEdit = false;
                    if (ctrl.poll && newTopic.poll) {
                        ctrl.poll.alreadyPoll = newTopic.poll.alreadyPoll;
                        ctrl.poll.pollId = newTopic.poll.pollId;
                    }
                } else {
                    ctrl.selectedGroup = ctrl.selGroupName = ctrl.selRubricName = null;
                    ctrl.selectedRubric = {};
                    cleanAttached($('#attach-area-' + ctrl.attachId));
                    cleanAttached($('#attach-doc-area-' + ctrl.attachId));
                }

                if (!ctrl.isWallSingle) $rootScope.selectGroup($rootScope.base.bufferSelectedGroup);

            }
        }

        $rootScope.createTopic = function (event, ctrl) {
            event.preventDefault();

            if (!ctrl.isEdit) {
                $(event.target).closest('.message-input').find('.topic-textarea').height(TEXTAREA_DEFAULT_HEIGHT);
            }

            if (ctrl.isTalk) {
                // значит это talk
                addSingleTalk(ctrl);
            } else {
                // значит это wall
                createWallTopic(ctrl);
            }
        };

        function createWallMessage(wallItem) {
            //wallItem.groupId = lenta.selectedGroupInTop.id;
            wallItem.groupId = $rootScope.base.bufferSelectedGroup.id;

            var isWall = true,
                message = postMessageMy(wallItem, isWall, false, $filter);

            if (message == 0) {
                wallItem.isCreateCommentError = true;
                wallItem.createCommentErrorText = "Вы не ввели сообщение";
            } else {
                wallItem.isCreateCommentError = false;
                base.initStartParamsForCreateMessage(message);

                if (wallItem.messages) {
                    wallItem.messages.push(message);

                    var mesLen = wallItem.messages.length;

                    (mesLen >= $rootScope.COMMENTS_DEFAULT_COUNT && !wallItem.isOpen) ?
                        wallItem.bufferMessages = wallItem.messages.slice(mesLen - $rootScope.COMMENTS_DEFAULT_COUNT) :
                        wallItem.bufferMessages = wallItem.messages;

                } else {
                    wallItem.messages = [];
                    wallItem.messages[0] = message;

                    wallItem.bufferMessages = [];
                    wallItem.bufferMessages[0] = wallItem.messages[0];
                }

            }
        }

        function addSingleFirstMessage(talk) {
            if (talk.fullTalkTopic)talk.topicId = talk.fullTalkTopic.id;

            talk.messageId = talk.id;

            var isWall = false,
                isFirstLevel = true,
                newMessage = postMessageMy(talk, isWall, isFirstLevel, $filter);

            if (newMessage == 0) {
                talk.isCreateFirstMessageError = true;
                talk.createFirstMessageErrorText = "Вы не ввели сообщение";
            } else {
                talk.fullTalkTopic ?
                    talk.fullTalkTopic.answerInputIsShow = false :
                    talk.answerInputIsShow = false;

                talk.isCreateFirstMessageError = false;

                /*if(talk.fullTalkTopic && !talk.fullTalkFirstMessages){
                 talk.fullTalkFirstMessages = [];
                 talk.fullTalkFirstMessages[0] = newMessage;
                 }*/

                talk.isEdit = false;

                if (talk.fullTalkTopic) {
                    if (talk.fullTalkFirstMessages) {

                        if (talk.fullTalkFirstMessages.length < 10 ||
                            $rootScope.base.isEarliestMessages ||
                            $rootScope.base.endOfLoaded) {

                            $rootScope.base.lastLoadedId = newMessage.id;
                            talk.fullTalkFirstMessages.push(newMessage);

                        }

                    } else {
                        talk.fullTalkFirstMessages = [];
                        talk.fullTalkFirstMessages[0] = newMessage;
                        $rootScope.base.lastLoadedId = newMessage.id;
                        $rootScope.base.isEarliestMessages = true;
                    }
                }

            }
        }

        function addSingleMessage(firstMessage, topicId, talk, message) {
            if (!talk.fullTalkMessages[firstMessage.id])
                talk.fullTalkMessages[firstMessage.id] =
                    messageClient.getMessages(topicId, talk.selectedGroup.id, 1, firstMessage.id, 0, 1000).messages;

            var fullTalkMessagesLength;
            talk.fullTalkMessages[firstMessage.id] ?
                fullTalkMessagesLength = talk.fullTalkMessages[firstMessage.id].length :
                fullTalkMessagesLength = 0;

            var newMessage, answer, parentId;

            if (!message) {
                // если добавляем к сообщению первого уровня
                talk.messageId = firstMessage.id;
                talk.message = firstMessage;

                answer = firstMessage.commentText;
                firstMessage.isTreeOpen = true;
                firstMessage.commentText = TEXT_DEFAULT_2;
                parentId = firstMessage.id;

                if (!firstMessage.childCount || firstMessage.childCount == 0) firstMessage.childCount = 1;

            } else {
                // если добавляем к простому сообщению
                talk.messageId = message.id;
                talk.message = message;

                for (var i = 0; i < fullTalkMessagesLength; i++) {
                    if (talk.fullTalkMessages[firstMessage.id][i].id == message.id) {
                        //talk.fullTalkMessages[firstMessage.id][i].answerInputIsShow = false;
                        talk.fullTalkMessages[firstMessage.id][i].isTreeOpen = true;
                        talk.fullTalkMessages[firstMessage.id][i].isOpen = true;
                        talk.fullTalkMessages[firstMessage.id][i].isParentOpen = true;
                        talk.fullTalkMessages[firstMessage.id][i].createdEdit = getTiming(talk.fullTalkMessages[firstMessage.id][i].created);
                        answer = talk.fullTalkMessages[firstMessage.id][i].commentText;
                    }
                }
                parentId = message.id;

            }
            var isWall = false,
                isFirstLevel = false;
            talk.topicId = topicId;
            talk.parentId = parentId;
            talk.commentText = answer;

            newMessage = postMessageMy(talk, isWall, isFirstLevel, $filter);

            if (newMessage == 0) {
                if (!message) {
                    talk.isCreateMessageToFirstError = true;
                    talk.createMessageToFirstErrorText = "Вы не ввели сообщение";
                } else {
                    talk.isCreateMessageError = true;
                    talk.createMessageErrorText = "Вы не ввели сообщение";
                }
            } else {
                if (!message) {
                    talk.isCreateMessageToFirstError = false;
                    firstMessage.answerInputIsShow = false;
                    firstMessage.isEdit = false;

                } else {
                    talk.isCreateMessageError = false;
                    for (var i = 0; i < fullTalkMessagesLength; i++) {
                        if (talk.fullTalkMessages[firstMessage.id][i].id == message.id) {
                            talk.fullTalkMessages[firstMessage.id][i].answerInputIsShow = false;
                            talk.fullTalkMessages[firstMessage.id][i].isEdit = false;
                        }
                    }
                }

                talk.fullTalkMessages[firstMessage.id] = messageClient.getMessages(topicId, talk.selectedGroup.id, 1, firstMessage.id, 0, 1000).messages;

                talk.fullTalkMessages[firstMessage.id] ?
                    fullTalkMessagesLength = talk.fullTalkMessages[firstMessage.id].length :
                    fullTalkMessagesLength = 0;

                for (var i = 0; i < fullTalkMessagesLength; i++) {
                    talk.fullTalkMessages[firstMessage.id][i].answerInputIsShow = false;
                    talk.fullTalkMessages[firstMessage.id][i].isTreeOpen = true;
                    talk.fullTalkMessages[firstMessage.id][i].isOpen = true;
                    talk.fullTalkMessages[firstMessage.id][i].isParentOpen = true;
                    talk.fullTalkMessages[firstMessage.id][i].createdEdit = getTiming(talk.fullTalkMessages[firstMessage.id][i].created);
                    talk.fullTalkMessages[firstMessage.id][i].commentText = TEXT_DEFAULT_2;
                }
            }
        }

        function addDialogMessage(ctrl) {
            var attach = [];

            if ((ctrl.commentText != TEXT_DEFAULT_1 && ctrl.commentText != "") || attach.length != 0) {

                if (ctrl.isEdit) {
                    // значит редактирование

                    var attachImg = getAttachedImages($('#attach-area-edit-' + ctrl.attachId));
                    var attachDoc = getAttachedDocs($('#attach-doc-area-edit-' + ctrl.attachId), true);
                    attach = attachImg.concat(attachDoc);

                    // еще attach
                    ctrl.commentText = $filter('linky')(ctrl.commentText, 'blank');
                    ctrl.commentText = withTags(ctrl.commentText);
                    dialogClient.updateDialogMessage(ctrl.id, ctrl.commentText, attach);

                    cleanAttached($('#attach-area-edit-' + ctrl.attachId));
                    cleanAttached($('#attach-doc-area-edit-' + ctrl.attachId));

                    ctrl.content = ctrl.commentText;

                    ctrl.images = attachImg;
                    ctrl.documents = attachDoc;
                    ctrl.isEdit = false;

                } else {
                    // значит создание
                    attach = getAttachedImages($('#attach-area-' + ctrl.attachId)).concat(getAttachedDocs($('#attach-doc-area-' + ctrl.attachId)));

                    var newDialogMessage = new com.vmesteonline.be.thrift.messageservice.DialogMessage();

                    (ctrl.commentText == TEXT_DEFAULT_1) ?
                        newDialogMessage.content = "" :
                        newDialogMessage.content = ctrl.commentText;

                    newDialogMessage.author = $rootScope.base.me.id;

                    newDialogMessage.created = Date.parse(new Date()) / 1000;
                    newDialogMessage.authorProfile = userClient.getUserProfile(newDialogMessage.author);

                    newDialogMessage.content = $filter('linky')(newDialogMessage.content, 'blank');
                    newDialogMessage.content = withTags(newDialogMessage.content);
                    var tempMessage = dialogClient.postMessage(ctrl.dialogId, newDialogMessage.content, attach);

                    newDialogMessage.images = tempMessage.images;
                    newDialogMessage.documents = tempMessage.documents;
                    newDialogMessage.id = tempMessage.id;
                    newDialogMessage.isDialog = true;
                    newDialogMessage.attachId = ctrl.dialogId + "-" + newDialogMessage.id;

                    //ctrl.privateMessages.unshift(newDialogMessage);
                    $rootScope.base.privateMessages.unshift(newDialogMessage);
                    $rootScope.base.initStartParamsForCreateMessage(newDialogMessage);

                    if (ctrl.privateMessages.length == 1) {
                        // на случай если с 0 добавляется более 20 сообщений
                        // чтобы подгружал от 1го сообщения а не от 0
                        $rootScope.base.lastLoadedId = newDialogMessage.id;
                    }

                    ctrl.commentText = TEXT_DEFAULT_1;

                    cleanAttached($('#attach-area-' + ctrl.attachId));
                    cleanAttached($('#attach-doc-area-' + ctrl.attachId));
                }

            }

        }

        $rootScope.createMessage = function (e, ctrl, topicId, talk, message) {
            e.preventDefault();

            if (!ctrl.isEdit) {
                $(e.target).closest('.answer-block').find('.message-textarea').height(TEXTAREA_DEFAULT_HEIGHT);
            }

            if (ctrl.isTalk) {
                //alert('111 '+ctrl.fullAdvertTopic+" "+ctrl.parentId);
                if ((ctrl.fullTalkTopic || ctrl.parentId == 0) && !topicId) {
                    //alert('1');
                    addSingleFirstMessage(ctrl);
                } else {
                    if (!message) {
                        //alert('2');
                        addSingleMessage(ctrl, topicId, talk);
                    } else {
                        //alert('3');
                        addSingleMessage(message, topicId, talk, ctrl);
                    }
                }

            } else if (ctrl.isDialog) {
                addDialogMessage(ctrl);
            } else {
                createWallMessage(ctrl);
            }

        };

        base.initStartParamsForCreateMessage = function (ctrl) {

            ctrl.isEdit = false;
            ctrl.answerShow = false;
            ctrl.isFocus = false;
            ctrl.isCreateCommentError = false;

            if (ctrl.isDialog) {
                ctrl.default = ctrl.commentText = TEXT_DEFAULT_1;
            } else {
                ctrl.default = ctrl.commentText = TEXT_DEFAULT_2;
            }

            if (ctrl.id || ctrl.isDialog) {
                // занчит редактирование
                if (!ctrl.isTalk) ctrl.commentText = ctrl.content;
                ctrl.answerShow = true;
            } else {
                // значит создание
            }

        };

        base.getUserColor = function (groupType) {
            return getTagColor(getLabel(base.groups, groupType));
        };

        base.toggleFullText = function (ctrl) {
            ctrl.isFullText ? ctrl.isFullText = false : ctrl.isFullText = true;
        };

        base.setPrivateMessages = function (dialogId, loadedLength) {
            try {
                $rootScope.base.privateMessages = dialogClient.getDialogMessages(dialogId, 0, loadedLength, 0);
            } catch (e) {
                $state.go('dialogs');
            }
            var privateMessagesLength = $rootScope.base.privateMessages.length;

            if (privateMessagesLength != 0) $rootScope.base.lastLoadedId = $rootScope.base.privateMessages[privateMessagesLength - 1].id;

            for (var i = 0; i < privateMessagesLength; i++) {
                $rootScope.base.privateMessages[i].authorProfile = userClient.getUserProfile($rootScope.base.privateMessages[i].author);
                $rootScope.base.privateMessages[i].isDialog = true;
                $rootScope.base.privateMessages[i].attachId = dialogId + "-" + $rootScope.base.privateMessages[i].id;
                $rootScope.base.initStartParamsForCreateMessage($rootScope.base.privateMessages[i]);
            }
        };

        base.newPrivateMessagesCount = 0;
        base.biggestCountDialogId = 0;
        $rootScope.newMessages = [];
        $rootScope.newImportantCount = 0;

        var timeStamp = 0;
        base.checkUpdates = function () {
            try {
                timeStamp = messageClient.checkUpdates(timeStamp);
            } catch (e) {
                document.location.replace('/login');
            }

            var updateMap,
                old = 0;

            console.log('timestemp ' + timeStamp);

            if (timeStamp == 0) {
                try {
                    updateMap = messageClient.getDialogUpdates();
                } catch (e) {
                    document.location.replace('/login');
                }
                var temp = 0,
                    currentDialogId,
                    counter = 0;

                if($rootScope.base && $rootScope.base.currentDialogId)currentDialogId = $rootScope.base.currentDialogId;


                $rootScope.newMessages = [];

                for (var dialogId in updateMap) {
                    $rootScope.newMessages[counter++] = {
                        dialogId: dialogId,
                        count: updateMap[dialogId]
                    };
                    if (dialogId != currentDialogId || $rootScope.currentPage != 'dialog-single') {

                        temp += updateMap[dialogId];

                        if (updateMap[dialogId] > old) {
                            base.biggestCountDialogId = dialogId;
                        }

                        old = updateMap[dialogId];
                    } else {
                        base.setPrivateMessages(currentDialogId, 20);
                    }
                }

                base.newPrivateMessagesCount = temp;
                try {
                    $rootScope.$digest();
                } catch (e) {
                    console.log('err');
                }

            } else if (timeStamp == 1) {
                // notification
                $rootScope.newMessages = [];
                base.me.notificationIsShow = true;
                base.me.userNotification = messageClient.getMulticastMessage();

            } else if (timeStamp >= 2 && timeStamp < 10000) {
                // important messages
                console.log('important ' + timeStamp);
                $rootScope.newMessages = [];
                $rootScope.newImportantCount = timeStamp;

                $rootScope.importantTopics = messageClient.getImportantNews($rootScope.currentGroup.id);

            } else {
                $rootScope.newMessages = [];
                $rootScope.newImportantCount = 0;
            }

        };

        setInterval(base.checkUpdates, 5000);

        base.nextNotification = function () {
            base.me.userNotification = messageClient.getNextMulticastMessage();
            if (!base.me.userNotification) {
                base.me.notificationIsShow = false;
            }
        };

        base.groupAddresesList = [];
        base.isAddresesListShow = [];
        base.showGroupAdressesList = function(messageId){
            if(!base.groupAddresesList[messageId]) {
                base.groupAddresesList[messageId] = userClient.getAddressListByMessageId(messageId);
            }
            base.isAddresesListShow[messageId] = true;
        };
        base.hideGroupAdressesList = function(messageId){
            base.isAddresesListShow[messageId] = false;
        };

        base.userMenuToggle = function($event){
            $event.preventDefault();
            $event.stopPropagation();
            base.isUserMenuShow ? base.isUserMenuShow = false : base.isUserMenuShow = true;
        };

        base.isAttachDropdownShow = [];
        base.isHashtagDropdownShow = false;
        base.isRubricsDropdownShow = false;

        base.toggleAttachDropdown = function($event,ctrl,ctrlId){
            $event.stopPropagation();

            var id;
            if(ctrl) {
                (ctrl.isEdit) ? id = ctrl.id : id = ctrl.attachId;
            }else{
                id = ctrlId;
            }

            base.isAttachDropdownShow[id] ?
                base.isAttachDropdownShow[id] = false :
                    base.isAttachDropdownShow[id] = true;

            //console.log('3',id,base.isAttachDropdownShow[id]);
        };
        base.toggleHashtagDropdown = function($event){
            $event.stopPropagation();
            base.isHashtagDropdownShow ? base.isHashtagDropdownShow = false : base.isHashtagDropdownShow = true;
        };
        base.toggleRubricsDropdown = function($event){
            $event.stopPropagation();
            base.isRubricsDropdownShow ? base.isRubricsDropdownShow = false : base.isRubricsDropdownShow = true;
        };

        base.hideDropdown = function(){
            base.isUserMenuShow = false;
            base.isAttachDropdownShow = [];
            base.isHashtagDropdownShow = false;
            base.isRubricsDropdownShow = false;
        };

        base.contentLength = 500;

        /*var lsGroupId = localStorage.getItem('groupId'),
            groupsLength = base.groups.length;*/

        /*if (!lsGroupId) {*/
            $rootScope.currentGroup = getDefaultGroup(base.groups);
        /*} else {
            for (var i = 0; i < groupsLength; i++) {
                if (base.groups[i].id == lsGroupId) {
                    $rootScope.currentGroup = base.groups[i];
                }
            }
            if (!$rootScope.currentGroup) {
                $rootScope.currentGroup = getDefaultGroup(base.groups);
            }
        }*/

        base.isLentaFocus = false;

        base.checkUpdates();

        $rootScope.currentPage = 'lenta';

        $rootScope.leftbar = {};
    }

    $rootScope.base = base;

    };

module.exports = [ '$scope','$rootScope','$state','$filter','$location', baseCtrl ];
},{}],"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\blog.js":[function(require,module,exports){

var blogCtrl = function($rootScope) {
    var blog = this;

    $rootScope.base.isFooterBottom = true;

    blog.isAuth = authClient.checkIfAuthorized();

    if(blog.isAuth){
        //me = userClient.getUserProfile();
        //$('.anonName').removeClass('hidden');
    }

    blog.posts = messageClient.getBlog(0,1000);

    var len = blog.posts.topics.length;
    for(var i = 0; i < len; i++){
        blog.posts.topics[i].isCommentShow = false;
        blog.posts.topics[i].isInputShow = false;
    }

    blog.toggleComm = function($event,post){
        $event.preventDefault();

        if (post.isCommentShow){
            post.isCommentShow = false;

        }else{
            post.isCommentShow = true;

            if(!post.comments) {
                post.comments = messageClient.getMessagesAsList(post.id, 7, 0, false, 1000).messages;
                console.log('finish');
            }
        }

    };

    blog.toggleInput = function($event,post){
        $event.preventDefault();

        post.isInputShow ? post.isInputShow = false : post.isInputShow = true;

        console.log('input',post.isInputShow);

        //$(this).closest('.post').find('.input-group').slideToggle(200,function(){
            /*if(userName){
                $(this).find('textarea').val(userName);
                setCaretToPos($(this).find('textarea')[0],userName.length);
            }
            $(this).find('textarea').focus();*/
        //});
    };

    blog.sendComm = function($event,post){
        $event.preventDefault();
        var message = new com.vmesteonline.be.thrift.messageservice.Message();

        message.id = 0;
        message.topicId = post.id;
        message.type = com.vmesteonline.be.thrift.messageservice.MessageType.BLOG;//7;
        message.groupId = 0;
        message.content = post.commenting;
        message.parentId = 0;
        message.created = Date.parse(new Date())/1000;

        if(!blog.isAuth){
            message.anonName = post.anonName;
        }else{
            message.anonName = "";
        };

        var returnComment = messageClient.postBlogMessage(message);
        if(post.comments && post.comments.length) {
            post.comments.push(returnComment);
        }else{
            post.comments = [];
            post.comments[0] = returnComment;
        }

    };

    blog.getTiming = function(messageObjDate){
        var minute = 60*1000,
            hour = minute*60,
            day = hour*24,
            threeDays = day* 3,
            now = Date.parse(new Date()),
            timing = (now - messageObjDate*1000),
            timeTemp;

        if(timing < minute){
            timing = "только что";
        }else if(timing < hour){
            timing = new Date(timing);
            timing = timing.getMinutes()+" мин назад";
        }else if(timing < day){
            timing = new Date(timing);
            timeTemp = timing.getHours();
            if(timeTemp == 1 || timeTemp == 0){
                timing = "1 час назад";
            }else if(timeTemp > 1 && timeTemp < 5){
                timing = timeTemp + " часа назад";
            }else{
                timing = timeTemp + " часов назад";
            }
        }else if(timing < threeDays){
            timing = new Date(timing);
            timeTemp = timing.getDate();
            if(timeTemp == 1){
                timing = timeTemp+" день назад";
            }else{
                timing = timeTemp+" дней назад";
            }
        }else{
            timeTemp = new Date(messageObjDate*1000).toLocaleDateString();
            var arr = timeTemp.split('.');
            if(arr[0].length == 1) arr[0] = "0"+arr[0];
            if(arr[1].length == 1) arr[1] = "0"+arr[1];
            timing = arr[0]+"."+arr[1]+"."+arr[2];
        }

        return timing;
    };

    /*$('.itemdiv').each(function(){
        var span = $(this).find('.lenta-item-bottom span');
        var created = span.attr('data-created');

        span.text(getTiming(created));
    });

    var h = $(window).height()-105;
    $('.container.coming-soon .main-container').css({'min-height': h});

    $('.post').each(function(){
        var link = $(this).attr('data-postlink');

        $(this).find('.topic').load(link+' .post', function(){
        });
    });

    var isCommentsLoaded = [];
    $('.show-comment').click(function(e){
        e.preventDefault();

        if($(this).text() == "Показать комментарии"){
            $(this).text("Скрыть комментарии");
        }else{
            $(this).text("Показать комментарии");
        }

        var topicId = $(this).closest('.post').attr('data-topicid'),
            dialogs = $(this).closest('.post').find('.dialogs');

        //if(!isCommentsLoaded[topicId]){
        var comments = messageClient.getMessagesAsList(topicId, 7, 0,false,1000).messages;
        //alert(comments.length);

        if(comments){
            var commentsLength = comments.length,
                commentsHTML = "";

            for(var i = 0; i < commentsLength; i++){
                var classNoLink = "",
                    messageAvatar,
                    messageName,
                    messageUserId;

                if(!comments[i].userInfo){
                    messageAvatar = "data/da.gif";
                    messageUserId = 0;
                    classNoLink = "no-link";
                }else{
                    //messageName = comments[i].userInfo.firstName+" "+comments[i].userInfo.lastName;
                    messageAvatar = comments[i].userInfo.avatar;
                    messageUserId = comments[i].userInfo.id;
                }

                messageName = comments[i].anonName;

                commentsHTML += '<div class="itemdiv dialogdiv new">'+
                    '<a href="profile-'+messageUserId+'" class="user '+classNoLink+'">'+
                    '<div class="avatar short2" style="background-image: url('+messageAvatar+')"></div>'+
                    '</a>'+
                    '<div class="body">'+
                    '<div class="name">'+
                    '<a href="profile-'+messageUserId+'" class="'+classNoLink+'">'+messageName+'</a>'+
                    '</div>'+
                    '<div class="text">'+comments[i].content+'</div>'+
                    '<div class="lenta-item-bottom">'+
                    '<span>'+ getTiming(comments[i].created) +'</span>'+
                    '<a href="#"> Ответить</a>'+
                    '</div>'+
                    '</div>'+
                    '</div>';
            }
        }

        dialogs.html("");
        dialogs.prepend(commentsHTML);

        initNoLink($(this).closest('.post'));
        initAnswerToComment($('.new .lenta-item-bottom a'));
        $('.new').removeClass('new');

        isCommentsLoaded[topicId] = true;

        //}

        dialogs.slideToggle(200);
    });

    function initAnswerToComment(selector){
        selector.click(function(e){
            e.preventDefault();

            var userName = $(this).closest('.body').find('.name a').text()+", ";
            $(this).closest('.post').find('.make-comment').trigger('click',userName);
        });
    }
    initAnswerToComment($('.lenta-item-bottom a'));

    $('.make-comment').click(function(e,userName){
        e.preventDefault();

        $(this).closest('.post').find('.input-group').slideToggle(200,function(){
            if(userName){
                $(this).find('textarea').val(userName);
                setCaretToPos($(this).find('textarea')[0],userName.length);
            }
            $(this).find('textarea').focus();
        });
    });

    function initNoLink(selector){

        selector.find('.no-link').click(function(e){
            e.preventDefault();

        });

    }
    initNoLink($('.blog'));

    $('.send-in-blog').click(function(){
        var message = new com.vmesteonline.be.thrift.messageservice.Message();

        message.id = 0;
        message.topicId = $(this).closest('.post').attr('data-topicid');
        message.type = com.vmesteonline.be.thrift.messageservice.MessageType.BLOG;//7;
        message.groupId = 0;
        message.content = $(this).closest('.input-group').find('.message-textarea').val();
        message.parentId = 0;
        message.created = Date.parse(new Date())/1000;

        if(!isAuth){
            message.anonName = $(this).closest('.input-group').find('.anonName').val();
        }else{
            message.anonName = "";
        };

        var returnComment = messageClient.postBlogMessage(message);
        var comments = $(this).closest('.post').find('.dialogs');

        var classNoLink = "";

        if(!isAuth){
            message.avatar = "data/da.gif";
            message.name = message.anonName;
            message.userId = 0;
            classNoLink = "no-link";
        }else{
            message.avatar = returnComment.userInfo.avatar;
            message.name = returnComment.userInfo.firstName+" "+returnComment.userInfo.lastName;
            message.userId = returnComment.userInfo.id ;
        }

        var newCommentHTML = '<div class="itemdiv dialogdiv new">'+
            '<a href="profile-'+ message.userId +'" class="user '+ classNoLink +'">'+
            '<div class="avatar short2" style="background-image: url('+ message.avatar +')"></div>'+
            '</a>'+
            '<div class="body">'+
            '<div class="name">'+
            '<a href="profile-'+ message.userId +'" class="'+ classNoLink +'" >'+ message.name +'</a>'+
            '</div>'+
            '<div class="text">'+ message.content +'</div>'+
            '<div class="lenta-item-bottom">'+
            '<span>'+ getTiming(message.created) +'</span>'+
            '<a href="#">Ответить</a>'+
            '</div>'+
            '</div>'+
            '</div>';

        if(comments.css('display') == 'none'){

            $(this).closest('.post').find('.show-comment').trigger('click');

        }else{
            comments.append(newCommentHTML);

            initNoLink($('.new'));
            initAnswerToComment($('.new .lenta-item-bottom a'));
            $('.new').removeClass('new');
        }

        //setTimeout(tempFunc,1000,comments,newCommentHTML,message,$(this));

        $(this).closest('.input-group').hide();
        $(this).closest('.input-group').find('textarea').val("");

    });

    function getTiming(messageObjDate){
        var minute = 60*1000,
            hour = minute*60,
            day = hour*24,
            threeDays = day* 3,
            now = Date.parse(new Date()),
            timing = (now - messageObjDate*1000),
            timeTemp;

        if(timing < minute){
            timing = "только что";
        }else if(timing < hour){
            timing = new Date(timing);
            timing = timing.getMinutes()+" мин назад";
        }else if(timing < day){
            timing = new Date(timing);
            timeTemp = timing.getHours();
            if(timeTemp == 1 || timeTemp == 0){
                timing = "1 час назад";
            }else if(timeTemp > 1 && timeTemp < 5){
                timing = timeTemp + " часа назад";
            }else{
                timing = timeTemp + " часов назад";
            }
        }else if(timing < threeDays){
            timing = new Date(timing);
            timeTemp = timing.getDate();
            if(timeTemp == 1){
                timing = timeTemp+" день назад";
            }else{
                timing = timeTemp+" дней назад";
            }
        }else{
            timeTemp = new Date(messageObjDate*1000).toLocaleDateString();
            var arr = timeTemp.split('.');
            if(arr[0].length == 1) arr[0] = "0"+arr[0];
            if(arr[1].length == 1) arr[1] = "0"+arr[1];
            timing = arr[0]+"."+arr[1]+"."+arr[2];
        }

        return timing;
    }

    function setSelectionRange(input, selectionStart, selectionEnd) {
        if (input.setSelectionRange) {
            input.focus();
            input.setSelectionRange(selectionStart, selectionEnd);
        }
        else if (input.createTextRange) {
            var range = input.createTextRange();
            range.collapse(true);
            range.moveEnd('character', selectionEnd);
            range.moveStart('character', selectionStart);
            range.select();
        }
    }

    function setCaretToPos (input, pos) {
        setSelectionRange(input, pos, pos);
    }
*/

    $('.ng-cloak').removeClass('ng-cloak');

};

module.exports = [ '$rootScope', blogCtrl ];
},{}],"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\business\\cabinet.js":[function(require,module,exports){

var cabinetCtrl = function($rootScope) {
    var nearby = this,
        postId;

    var businessDescription = new com.vmesteonline.be.thrift.businesservice.BusinessDescription;
    businessDescription.shortName = "Мега Пицца";
    businessDescription.fulltName = "Мега Пицца круто-круто";
    businessDescription.shortInfo = "Мега Пицца круто-круто быстро-быстро";
    businessDescription.fullInfo = "Мега Пицца круто-круто быстро-быстро дешево";
    businessDescription.longitude = '30';
    businessDescription.latitude = '60';
    businessDescription.radius = 500;
    //businessClient.createBusinessDescription(businessDescription,'w','w');

    //console.log('business created');

    nearby.info = businessClient.getMyBusinessInfo();

    /*if ($stateParams.nearbyId && $stateParams.nearbyId != 0){
        postId = $stateParams.nearbyId;
    }*/

    nearby.carouselInterval = 5000;
    /*nearby.addSlide = function() {
        var newWidth = 600 + slides.length + 1;
        slides.push({
            image: 'http://placekitten.com/' + newWidth + '/300',
            text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
                ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
        });
    };
    for (var i=0; i<4; i++) {
        nearby.addSlide();
    }*/

    $rootScope.base.isFooterBottom = true;

    nearby.toggleInput = function($event,post){
        $event.preventDefault();

        post.isInputShow ? post.isInputShow = false : post.isInputShow = true;

        console.log('input',post.isInputShow);

    };

    nearby.wallItem = businessClient.getWallItem(nearby.info.id);
    console.log('1',nearby.wallItem);

    nearby.sendComm = function($event,post){
        $event.preventDefault();
        var message = new com.vmesteonline.be.thrift.messageservice.Message();

        message.id = 0;
        message.topicId = nearby.info.id; //post.id;
        message.type = com.vmesteonline.be.thrift.messageservice.MessageType.WALL;//8;
        message.groupId = 0;
        message.content = post.commenting;
        message.topicId = nearby.wallItem.topic.id;
        message.parentId = 0;
        message.created = Date.parse(new Date())/1000;
        post.commenting = "";

        if(!nearby.isAuth){
            message.anonName = post.anonName;
        }else{
            message.anonName = "";
        };

        console.log('post',message);
        //var returnComment = messageClient.postBusinessTopics(message);
        var returnComment = messageClient.postMessage(message);
        console.log('post2',returnComment);


        if(nearby.wallItem.messages && nearby.wallItem.messages.length) {
            nearby.wallItem.messages.push(returnComment);
        }else{
            nearby.wallItem.messages = [];
            nearby.wallItem.messages[0] = returnComment;
        }

    };

    nearby.getTiming = function(messageObjDate){
        var minute = 60*1000,
            hour = minute*60,
            day = hour*24,
            threeDays = day* 3,
            now = Date.parse(new Date()),
            timing = (now - messageObjDate*1000),
            timeTemp;

        if(timing < minute){
            timing = "только что";
        }else if(timing < hour){
            timing = new Date(timing);
            timing = timing.getMinutes()+" мин назад";
        }else if(timing < day){
            timing = new Date(timing);
            timeTemp = timing.getHours();
            if(timeTemp == 1 || timeTemp == 0){
                timing = "1 час назад";
            }else if(timeTemp > 1 && timeTemp < 5){
                timing = timeTemp + " часа назад";
            }else{
                timing = timeTemp + " часов назад";
            }
        }else if(timing < threeDays){
            timing = new Date(timing);
            timeTemp = timing.getDate();
            if(timeTemp == 1){
                timing = timeTemp+" день назад";
            }else{
                timing = timeTemp+" дней назад";
            }
        }else{
            timeTemp = new Date(messageObjDate*1000).toLocaleDateString();
            var arr = timeTemp.split('.');
            if(arr[0].length == 1) arr[0] = "0"+arr[0];
            if(arr[1].length == 1) arr[1] = "0"+arr[1];
            timing = arr[0]+"."+arr[1]+"."+arr[2];
        }

        return timing;
    };


    $('.ng-cloak').removeClass('ng-cloak');

};

module.exports = [ '$rootScope', cabinetCtrl ];
},{}],"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\business\\edit.js":[function(require,module,exports){

var editCtrl = function($rootScope,$scope, FileUploader) {

    var edit = this;

    var attach = new com.vmesteonline.be.thrift.messageservice.Attach(),
        isLogoUploader, isImagesUploader, imagesCounter = 0,imagesLength;

    $scope.setLoadImage = function(fileBase64){

        var svc = fileClient.saveFileContent(fileBase64, true);
        console.log('setLoadImage',fileBase64);
        if(isLogoUploader){
            edit.businessDescription.logo.URL = attach.URL = edit.logoURL = svc;
            isLogoUploader = false;
        }else if(isImagesUploader){
            edit.businessDescription.images[imagesCounter].URL = svc;
            imagesCounter++;
            if(imagesCounter == imagesLength) isImagesUploader = false;

            console.log('images',imagesCounter,edit.businessDescription.images);
        }

    };

    //var uploader = $scope.uploaderLogo = new FileUploader();
    $scope.uploaderLogo = new FileUploader();
    $scope.uploaderImages = new FileUploader();

    // FILTERS

    $scope.uploaderLogo.filters.push({
        name: 'imageFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    });

    /*uploaderLogo.onWhenAddingFileFailed = function(item *//*{File|FileLikeObject}*//*, filter, options) {
        console.info('onWhenAddingFileFailed', item, filter, options);
    };*/
    $scope.uploaderLogo.onAfterAddingFile = function(fileItem) {
        console.info('onAfterAddingFile 1', fileItem);
        isLogoUploader = true;

        attach.fileName = fileItem._file.name;
        attach.contentType = fileItem._file.type;
    };
    $scope.uploaderImages.onAfterAddingFile = function(fileItem) {
        console.info('onAfterAddingFile 2', fileItem);
    };
    $scope.uploaderImages.onAfterAddingAll = function(addedFileItems) {
        console.info('onAfterAddingAll', addedFileItems);

        isImagesUploader = true;
        //imagesCounter = 0;

        imagesLength = addedFileItems.length;
        for(var i = 0; i < imagesLength; i++){
            edit.businessDescription.images[i] = new com.vmesteonline.be.thrift.messageservice.Attach();
            edit.businessDescription.images[i].fileName = addedFileItems[i]._file.name;
            edit.businessDescription.images[i].contentType = addedFileItems[i]._file.type;
        }

    };
    /*$scope.uploaderLogo.onBeforeUploadItem = function(item) {
        console.info('onBeforeUploadItem', item);
    };
    $scope.uploaderLogo.onProgressItem = function(fileItem, progress) {
        console.info('onProgressItem', fileItem, progress);
    };
    $scope.uploaderLogo.onProgressAll = function(progress) {
        console.info('onProgressAll', progress);
    };
    $scope.uploaderLogo.onSuccessItem = function(fileItem, response, status, headers) {
        console.info('onSuccessItem', fileItem, response, status, headers);
    };
    $scope.uploaderLogo.onErrorItem = function(fileItem, response, status, headers) {
        console.info('onErrorItem', fileItem, response, status, headers);
    };
    $scope.uploaderLogo.onCancelItem = function(fileItem, response, status, headers) {
        console.info('onCancelItem', fileItem, response, status, headers);
    };
    $scope.uploaderLogo.onCompleteItem = function(fileItem, response, status, headers) {
        console.info('onCompleteItem', fileItem, response, status, headers);
    };
    $scope.uploaderLogo.onCompleteAll = function() {
        console.info('onCompleteAll');
    };*/


    $rootScope.businessDescription = edit.businessDescription = businessClient.getMyBusinessInfo();

    //edit.businessDescription = new com.vmesteonline.be.thrift.businesservice.BusinessDescription;

    edit.save = function(){

        //edit.businessDescription.logo.URL = fileClient.saveFileContent(bg, true);
        // bg - binary data base64


        edit.businessDescription.logo = attach;
        console.log('save',edit.businessDescription);
        //edit.businessDescription.logo.fileName = '1';
        //edit.businessDescription.logo.URL = '/static/images/anna.jpg';

        try {
            businessClient.updateBusinessDescription(edit.businessDescription);
            edit.statusText = "Сохранено";
            edit.status = 1;
        }catch(e){
            edit.statusText = "При сохранении произошла ошибка";
            edit.status = 0;
        }

        console.log('after save',edit.businessDescription);

    }

};

module.exports = [ '$rootScope','$scope','FileUploader', editCtrl ];
},{}],"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\business\\statistic.js":[function(require,module,exports){

var statisticCtrl = function($rootScope) {

    var maps = this,
        businessDescription;

    ($rootScope.businessDescription) ?
    businessDescription = $rootScope.businessDescription :
    businessDescription = businessClient.getMyBusinessInfo() ;

    var yaMap;
    maps.afterMapInit=function(nMap){
        yaMap = nMap;
    };

    //var location = userClient.getGroupView(groupId);
    maps.center = [businessDescription.longitude,businessDescription.latitude];
    maps.zoom = 16;
    maps.radius = businessDescription.radius;
    maps.color = MAP_COLOR;

    maps.baloon = {
        geometry: {
            type: 'Point',
            coordinates: maps.center
        },
        // Свойства
        properties: {
            hintContent: "Я здесь"
        }
    };

};

module.exports = [ '$rootScope', statisticCtrl ];
},{}],"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\changeAvatar.js":[function(require,module,exports){

var changeAvatarCtrl = function($state,$rootScope){

        var changeAvatar = this, newSrc,
            x1 = 50, y1 = 50, x2 = 200, y2 = 200,
            imageWidth = 150, imageHeight = 150;

        changeAvatar.save = function(){

            var saveSrc = newSrc+"?w="+ imageWidth +"&h="+ imageHeight +"&s="+x1+","+y1+","+x2+","+y2;
            userClient.updateUserAvatar(saveSrc);
            $rootScope.base.user.avatar = $rootScope.base.avatarBuffer = saveSrc;

            $("#dialog-message").dialog('close');
            $state.go('profile');

            $('.preview-container').addClass('hidden');

            $('.ui-dialog').each(function(){
                if($(this).attr('aria-describedby') == 'dialog-message'){
                    $(this).detach();
                }
            });
        };

        changeAvatar.back = function(){
            $('.load-avatar').find('.file-label').html("").
                removeClass("hide-placeholder selected").
                attr("data-title","Загрузить аватар");

            $('.loadAvatar-area').removeClass('hidden');
            $('.crop-area').addClass('hidden');

            $('.preview-container').addClass('hidden');
            $('.loading').removeClass('hidden');

            $('#image-for-crop').detach();
            $('.jcrop-holder').detach();

            $('.btn-save-avatar').before('<img src="#" id="image-for-crop" alt="#" class="hidden" />');

        };

        initModalAndCrop();

        function initModalAndCrop() {

            $("#dialog-message").removeClass('hide').dialog({
                modal: true,
                width: 504,
                position: ['center', 100],
                title_html: false,
                closeText: "",
                create: function (event, ui) {

                    $('.load-avatar input').ace_file_input({
                        style: 'well',
                        btn_choose: 'Загрузить аватар',
                        btn_change: null,
                        no_icon: '',
                        droppable: true,
                        thumbnail: 'large',
                        icon_remove: null
                    }).on('change', function () {
                        var imageForCrop = $('#image-for-crop');

                        $('.loadAvatar-area,.load-avatar-error').addClass('hidden');
                        $('.crop-area').removeClass('hidden');

                        setTimeout(saveNewAva, 1000);

                        function saveNewAva() {
                            var avaImg = $('.load-avatar').find('.file-label img');
                            if(parseInt(avaImg.css('width')) < 200 || parseInt(avaImg.css('height')) < 200){

                                $('.loading,.btn-save-avatar').addClass('hidden');

                                $('.load-avatar-error')
                                    .text('Изображение должно быть не менее 200px в ширину и высоту. Попробуйте загрузить другое изображение.').removeClass('hidden');

                            }else {
                                $('.loading').addClass('hidden');

                                var bg = avaImg.css('background-image'),
                                    src = avaImg.attr('src');

                                newSrc = fileClient.saveFileContent(bg, true);

                                $('#preview').attr('src', newSrc);

                                imageForCrop.attr('src', newSrc);
                                imageForCrop.css({'max-width': '500px', 'max-height': '500px'});

                                imageForCrop.Jcrop({
                                    aspectRatio: 1,
                                    setSelect: [ 200, 200, 50, 50 ],
                                    onChange: updateCoords,
                                    onSelect: updateCoords
                                }).removeClass('hidden');

                                $('.preview-container,.btn-save-avatar').removeClass('hidden');

                            }
                        }

                        function updateCoords(c) {
                            imageWidth = imageForCrop.width();
                            imageHeight = imageForCrop.height();

                            x1 = c.x;
                            y1 = c.y;
                            x2 = c.x2;
                            y2 = c.y2;
                            $('#x').val(c.x);
                             $('#y').val(c.y);
                             $('#w').val(c.w);
                             $('#h').val(c.h);

                             $('#x2').val(c.x2);
                             $('#y2').val(c.y2);

                            var rx = 150 / c.w; // 150 - размер окна предварительного просмотра
                            var ry = 150 / c.h;

                            $('#preview').css({
                                width: Math.round(rx * imageWidth) + 'px',
                                height: Math.round(ry * imageHeight) + 'px',
                                marginLeft: '-' + Math.round(rx * c.x) + 'px',
                                marginTop: '-' + Math.round(ry * c.y) + 'px'
                            });
                        };
                    });

                },
                close: function (event, ui) {
                    $state.go('profile');

                    $('.preview-container').addClass('hidden');

                    $('.ui-dialog').each(function(){
                        if($(this).attr('aria-describedby') == 'dialog-message'){
                            $(this).detach();
                        }
                    });
                }
            });
        }
    };

module.exports = [ '$state','$rootScope', changeAvatarCtrl ];
},{}],"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\contacts.js":[function(require,module,exports){

var contactsCtrl = function($rootScope) {
    var ctrl = this;

    $rootScope.base.isFooterBottom = true;

    ctrl.isAuth = authClient.checkIfAuthorized();

    if (ctrl.isAuth){
        ctrl.user = userClient.getShortUserInfo();
        ctrl.user_name = ctrl.user.firstName+" "+ctrl.user.lastName;
        ctrl.contacts = userClient.getUserContacts();
    }

    ctrl.send = function($event){
        $event.preventDefault();
        var email,name,
            content = ctrl.content;

        if(ctrl.isAuth){
            email = ctrl.contacts.email;
            name = ctrl.user_name;
        }else{
            email = ctrl.email;
            name = ctrl.name;
        }

        messageClient.sendInfoEmail(email,name,content);
        ctrl.isSend = true;
        ctrl.content = "";
        //console.log(email,name,content);
    };

    var oldTextLength = 0;

    $('.content').keyup(function(event) {

        var el = event.target,
            clientHeight = el.clientHeight,
            scrollHeight = el.scrollHeight,
            textLength = el.textLength,
            clientWidth = el.clientWidth,
            textLengthPX, newHeight, removeRowCount,
            defaultHeight, newRowCount;

        defaultHeight = 100;

        /*
         Исходные данные:
         На один символ приходится ~8px в ширину
         Высота строки текста ~14px

         * Здесь выполняем такие действия :
         * 1) Считаем длину текста в пикселях
         * 2) Определяем целое количестов строк, которые удалили
         * 3) Определям новую высоту с учетом высоты удаленного текста
         * */

        if (scrollHeight > clientHeight) {

            el.style.height = scrollHeight + 'px';
        } else if (scrollHeight > defaultHeight) {
            textLengthPX = (parseInt(oldTextLength) - textLength) * 8; // 1
            if (textLengthPX > clientWidth) {
                removeRowCount = Math.floor(textLengthPX / clientWidth); // 2
                newHeight = parseInt(event.target.style.height) - removeRowCount * 14; // 3
                newHeight > defaultHeight ? event.target.style.height = newHeight + "px" :
                    event.target.style.height = defaultHeight + 'px';

            } else {
                el.style.height = scrollHeight - 6 + 'px';

            }
        } else {
            el.style.height = defaultHeight + 'px';
        }
        oldTextLength = textLength;


        $('.ng-cloak').removeClass('ng-cloak');
    });

    angular.element($('.coming-soon')).css({'min-height': $(window).height()-105});

    $('.ng-cloak').removeClass('ng-cloak');

};

module.exports = [ '$rootScope', contactsCtrl ];
},{}],"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\counters.js":[function(require,module,exports){

var countersCtrl = function($rootScope,$modal,$counters) {
        var counters = this;
        //counters = $scope;

        $rootScope.base.mainContentTopIsHide = true;
        $rootScope.base.pageTitle = "Счетчики";
        $rootScope.base.isFooterBottom = true;

        counters.counters = $counters.getCounters;
        counters.typesArray = [];
        var typesEnumLength = 6;

        var counterService = utilityClient.getCounterService();

        var currentDate = (new Date()).getDate();

        counters.endDateOfMonth = counterService.endDateOfMonth;
        counters.startDateOfMonth = counterService.startDateOfMonth;

    console.log(counterService.startDateOfMonth+" " +
        counterService.endDateOfMonth+" "+
        counterService.infoProvided);

    var isNow;
    if(counterService.endDateOfMonth > counterService.startDateOfMonth){
        isNow = (currentDate >= counterService.startDateOfMonth &&
            currentDate <= counterService.endDateOfMonth);
    }else{
        isNow = (currentDate <= counterService.endDateOfMonth ||
            currentDate >= counterService.startDateOfMonth);
    }

        if(isNow ){

            if(counterService.infoProvided){
                // с 14 по 24, отправлено
                counters.state = 2;
            }else{
                // с 14 по 24, не отправлено
                counters.state = 1;
            }
        }else{
            // время с 24 по 14 число
            counters.state = 0;
        }


    //console.log('state '+counters.state);

        for(var i = 0; i < typesEnumLength; i++){
            counters.typesArray[i] = {};
            counters.typesArray[i].type = i;
            counters.typesArray[i].typeString = $counters.getTypeString(i);
        }

        var countersLength = counters.counters.length;
        for(var i = 0; i < countersLength; i++){
            counters.counters[i].currentValue = "";
            counters.counters[i].isEdit = false;
            counters.counters[i].wasEdit = false;
            counters.counters[i].typeString = $counters.getTypeString(counters.counters[i].type);
        }

        counters.save = function(){

            var countersLen = counters.counters.length,
                currentValue,
                date, isCanSave = true;


            for(var i = 0; i < countersLen; i++){
                if(!counters.counters[i].currentValue) {
                    isCanSave= false;
                    break;
                }
            }

            if(isCanSave) {
                counters.errorText = "";
                for (i = 0; i < countersLen; i++) {
                    if (counters.counters[i].wasEdit) {
                        date = Date.parse(new Date()) / 1000;
                        currentValue = counters.counters[i].currentValue;

                        if (!currentValue) currentValue = 0;
                        utilityClient.setCurrentCounterValue(counters.counters[i].id, currentValue, date);
                        counters.counters[i].lastValue = currentValue;
                        counters.counters[i].currentValue = "";
                        counters.state = 2;
                    }
                }
            }else{
                counters.errorText = "Необходимо указать значения всех счтечиков";
            }

        };

        counters.addCounter = function(){
            var counter = new com.vmesteonline.be.thrift.utilityservice.Counter();
            counter.id = utilityClient.registerCounter(counter);
            counter.isEdit = true;
            counters.counters.push(counter);
        };
        counters.editCounter = function(counter){
            counter.isEdit = true;
        };
        counters.saveEditedCounter = function(counter){
            //alert(counter.id+" "+counter.number+" "+counter.type+" "+counter.location);
            /*for(var p in counter){
                alert(counter[p]+" "+p);
            }*/

            var correctCounter = new com.vmesteonline.be.thrift.utilityservice.Counter();
            correctCounter.id = counter.id;
            correctCounter.location = counter.location;
            correctCounter.type = counter.type;
            correctCounter.number = counter.number;
            correctCounter.lastValue = counter.lastValue;

            utilityClient.updateCounter(correctCounter);
            counter.isEdit = false;
            counter.typeString = $counters.getTypeString(counter.type);
        };
        counters.removeCounter = function(counter){

            var modal = $modal.open({
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                windowClass: 'modal-remove-counter',
                size: 'sm'
            });

            modal.result.then(function () {

                utilityClient.removeCounter(counter.id);
                var countersLength = counters.counters.length;
                for(var i = 0; i< countersLength; i++){

                    if(counter.id == counters.counters[i].id){
                        counters.counters.splice(i,1);
                    }

                }

            });

        };

        counters.countersConfirm = function(){

            var newServicesStatuses = [];
            newServicesStatuses['11'] = true;

            userClient.updateUserServices(newServicesStatuses);

            $rootScope.base.me.countersConfirmed = true;
        };

        counters.cancel = function(){
            counters.state = 1;
        };

        counters.toggleNotification = function(){
           var newServicesStatuses = [];

          if ($rootScope.base.me.countersNotification ){
              $rootScope.base.me.countersNotification = newServicesStatuses['12'] = false;
          }else{
              $rootScope.base.me.countersNotification = newServicesStatuses['12'] = true;
          }

            userClient.updateUserServices(newServicesStatuses);

        };

    counters.inputCounter = function(counter){
        counter.wasEdit = true;
        counter.currentValue = parseInt(counter.currentValue);
     };

        angular.element($('.counters')).css({'min-height': $(window).height()-105});

    };

module.exports = [ '$rootScope','$modal','$counters', countersCtrl ];
},{}],"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\countersHistory.js":[function(require,module,exports){

var countersHistoryCtrl = function($scope,$stateParams,$rootScope,$counters) {

        $rootScope.base.mainContentTopIsHide = true;
        $rootScope.base.pageTitle = "История показаний счетчика";
        $rootScope.base.isFooterBottom = true;

        var counters = $counters.getCounters,
            countersLen = counters.length;
        for(var i = 0; i < countersLen; i++){
            if(counters[i].id == $stateParams.counterId){
                $scope.currentCounter = counters[i];
                $scope.currentCounter.typeString = $counters.getTypeString(counters[i].type);
            }
        }

        var now = Date.parse(new Date())/1000,
            history = utilityClient.getCounterHistory($stateParams.counterId,0,now),
            counter = 0;

        $scope.history = [];
        $scope.counterName = $stateParams.counterName;

        for(var p in history){
            $scope.history[counter] = {};
            $scope.history[counter].date = p;
            $scope.history[counter].val = history[p];
            counter++;
        }

        angular.element($('.counters')).css({'min-height': $(window).height()-105});

    };

module.exports = [ '$state','$stateParams','$rootScope','$counters', countersHistoryCtrl ];
},{}],"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\dialog.js":[function(require,module,exports){

var dialogCtrl = function($rootScope,$stateParams,$state) {

        initFancyBox($('.dialog'));
        $rootScope.base.mainContentTopIsHide = true;
        $rootScope.base.isFooterBottom = false;
        $rootScope.base.lastLoadedId = 0;
        $rootScope.currentPage = 'dialog-single';
        $rootScope.base.currentDialogId = $stateParams.dialogId;
        $rootScope.currentRubric = null;

        var dialog = this,
            lastLoadedId = 0,
            loadedLength = 20;

        try {
            var currentDialog = dialogClient.getDialogById($stateParams.dialogId);

            var currentDialogLength = currentDialog.length;

            dialog.isDialog = true;
            dialog.attachId = '000';
            dialog.dialogId = $stateParams.dialogId;

            dialog.users = currentDialog.users;
            var dialogUsersLength = dialog.users.length;
            for (var i = 0; i < dialogUsersLength; i++) {
                //console.log(dialog.users[i].id+" "+$rootScope.base.me.id);
                if (dialog.users[i] && (dialog.users[i].id == $rootScope.base.me.id)) {
                    dialog.users.splice(i, 1);
                }
            }

            if ($stateParams.dialogId) {
                $rootScope.base.setPrivateMessages(dialog.dialogId,loadedLength);

                dialog.privateMessages = $rootScope.base.privateMessages;
            }

            //dialog.messageText = TEXT_DEFAULT_1;
            $rootScope.base.initStartParamsForCreateMessage(dialog);

        }catch(e){
            $state.go('dialogs');
        }

        var lastLoadedIdFF;
        dialog.addMoreItems = function(){
            var buff = dialogClient.getDialogMessages($stateParams.dialogId,0,loadedLength,$rootScope.base.lastLoadedId);
            if(buff) {
                var buffLength = buff.length;

                if(buffLength != 0) {

                    $rootScope.base.lastLoadedId = buff[buffLength - 1].id;

                    if(lastLoadedIdFF != $rootScope.base.lastLoadedId) {
                        for (var i = 0; i < buffLength; i++) {
                            buff[i].authorProfile = userClient.getUserProfile(buff[i].author);
                        }
                        dialog.privateMessages =
                            $rootScope.base.privateMessages = $rootScope.base.privateMessages.concat(buff);
                    }

                    lastLoadedIdFF = $rootScope.base.lastLoadedId;
                }
            }

        };

        $('.ng-cloak').removeClass('ng-cloak');

    };

module.exports = [ '$rootScope','$stateParams','$state', dialogCtrl ];
},{}],"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\dialogs.js":[function(require,module,exports){

var dialogsCtrl =  function($rootScope,$state){
        $rootScope.isTopSearchShow = false;
        $rootScope.base.mainContentTopIsHide = true;
        $rootScope.leftbar.tab = 0;
        $rootScope.base.isFooterBottom = false;
        $rootScope.currentPage = "dialogs";
        $rootScope.currentRubric = null;

        resetPages($rootScope.base);
        $rootScope.base.privateMessagesIsActive = true;
        $rootScope.base.pageTitle = "Личные сообщения";

        resetAceNavBtns($rootScope.navbar);
        $rootScope.navbar.privateMessagesBtnStatus = "active";

        $rootScope.base.privateMessagesLoadStatus = "isLoaded";

        $rootScope.isNewPrivateMessageAdded = false;

        var dialogs = this;

        dialogs.dialogsList = dialogClient.getDialogs(0);
        var dialogsListLength = dialogs.dialogsList.length;
        for(var i = 0; i < dialogsListLength; i++){
            (dialogs.dialogsList[i].users[0].id != $rootScope.base.me.id) ?
                dialogs.dialogsList[i].anotherUser = dialogs.dialogsList[i].users[0] :
                dialogs.dialogsList[i].anotherUser = dialogs.dialogsList[i].users[1];

            dialogs.dialogsList[i].newMessagesCount = 0;
            console.log("dialog "+$rootScope.newMessages.length);
            if($rootScope.newMessages.length > 0) {
                var newMessagesLength = $rootScope.newMessages.length;
                for(var j = 0; j < newMessagesLength; j++) {
                    if (dialogs.dialogsList[i].id == $rootScope.newMessages[j].dialogId) {
                        dialogs.dialogsList[i].newMessagesCount = $rootScope.newMessages[j].count;
                    }
                }
            }
        }

        dialogs.goToSingleDialog = function(dialogId){
            var usersInfoArray = [],
                usersInfoLength,
                usersId = [];
            for(var i = 0; i < dialogsListLength; i++){
                if(dialogs.dialogsList[i].id == dialogId){
                    usersInfoArray = dialogs.dialogsList[i].users;
                }
            }
            if(usersInfoArray){
                usersInfoLength = usersInfoArray.length;
                for(var i = 0; i < usersInfoLength; i++){
                    usersId[i] = usersInfoArray[i].id
                }
            }
            //$rootScope.currentDialog = dialogClient.getDialog(usersId);
            $state.go('dialog-single',{ dialogId : dialogId});
        };

        $('.ng-cloak').removeClass('ng-cloak');

    };

module.exports = [ '$rootScope','$state', dialogsCtrl ];
},{}],"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\important.js":[function(require,module,exports){

var importantCtrl = function($rootScope) {

        $rootScope.setTab(4);
        $rootScope.base.showAllGroups();
        $rootScope.base.isFooterBottom = false;
        $rootScope.base.pageTitle = "Важно";
        $rootScope.base.mainContentTopIsHide = true;
        $rootScope.currentRubric = null;

        var important = this,
            lastLoadedId = 0,
            loadedLength = 10;

        $rootScope.COMMENTS_DEFAULT_COUNT = 4;
        important.selectedGroupInTop = $rootScope.currentGroup;

        /*if(!$rootScope.importantIsLoadedFromTop)
            $rootScope.importantTopics = messageClient.getImportantTopics($rootScope.currentGroup.id);
        $rootScope.importantIsLoadedFromTop = false;*/

        //important.topics = messageClient.getImportantTopics($rootScope.currentGroup.id);
        important.wallItems = messageClient.getImportantNews($rootScope.currentGroup.id,0,0,0);

        important.attachId = "0";
        //$rootScope.base.initStartParamsForCreateTopic(important);

        important.message = {};

        important.message.content = important.message.default = TEXT_DEFAULT_1;

        $rootScope.importantChangeGroup = function(groupId){

            important.wallItems = messageClient.getImportantNews(groupId, 0, loadedLength);

            if(important.wallItems.length) {
                initWallItem(important.wallItems);

                //lastLoadedId = lenta.wallItems[important.wallItems.length-1].topic.id;
            }

        };

        var wallItemsLength;
        important.wallItems ? wallItemsLength = important.wallItems.length :
            wallItemsLength = 0;

        if(wallItemsLength == 0) $rootScope.base.mainContentTopIsHide = true;

        if(wallItemsLength != 0) lastLoadedId = important.wallItems[wallItemsLength-1].topic.id;

        initWallItem(important.wallItems);

        $rootScope.selectGroupInDropdown_important = function(groupId){
            important.selectedGroup = $rootScope.base.bufferSelectedGroup = selectGroupInDropdown(groupId);
        };

        important.goToAnswerInput = function(event){
            event.preventDefault();
        };

        var initFlagsArray = [];
        important.showAnswerInput = function(event,wallItem,wallMessage){
            event.preventDefault();

            /*wallItem.answerShow ?
             wallItem.answerShow = false :*/
            wallItem.answerShow = true ;
            wallItem.isFocus = true ;

            if(wallMessage){
                var authorName;
                wallMessage.userInfo ?
                    authorName = wallMessage.userInfo.firstName :
                    authorName = wallMessage.authorName.split(' ')[0];
                wallItem.commentText = authorName+", ";
            }else{
                wallItem.commentText = "";
            }

            if(!initFlagsArray[wallItem.topic.id]) {
                // инифицализацмю AttachImage нужно делать только один раз для каждого сообщения
                initFlagsArray[wallItem.topic.id] = true;
            }

        };

        $rootScope.wallChangeGroup = function(groupId){

            important.wallItems = messageClient.getWallItems(groupId, 0, loadedLength);

            if(important.wallItems.length) {
                initWallItem(important.wallItems);

                lastLoadedId = important.wallItems[important.wallItems.length-1].topic.id;
            }

        };

        function initWallItem(wallItems){
            wallItemsLength = wallItems.length;
            for(var i = 0; i < wallItemsLength; i++){

                $rootScope.base.initStartParamsForCreateMessage(wallItems[i]);

                $rootScope.base.initStartParamsForCreateTopic(wallItems[i].topic);

                //  wallItems[i].topic.message.groupId сейчас не задана почему-то
                wallItems[i].label = getLabel($rootScope.base.groups,wallItems[i].topic.groupType);

                wallItems[i].tagColor = getTagColor(wallItems[i].label);

                wallItems[i].isOpen = false;

                if(wallItems[i].topic.message.important == 1){
                    wallItems[i].topic.message.importantText = 'Снять метку "Важное"';
                }else{
                    wallItems[i].topic.message.importantText = 'Пометить как "Важное"';
                }

                if(wallItems[i].topic.message.type == 1){

                    wallItems[i].topic.lastUpdateEdit = getTiming(wallItems[i].topic.lastUpdate);

                }else if(wallItems[i].topic.message.type == 5){

                    wallItems[i].topic.message.createdEdit = getTiming(wallItems[i].topic.message.created);
                    wallItems[i].topic.authorName = getAuthorName(wallItems[i].topic.userInfo);
                    wallItems[i].topic.metaType = "message";

                    var mesLen;
                    wallItems[i].messages ?
                        mesLen = wallItems[i].messages.length:
                        mesLen = 0;

                    for(var j = 0; j < mesLen; j++){
                        wallItems[i].messages[j].createdEdit = getTiming(wallItems[i].messages[j].created);
                        wallItems[i].messages[j].authorName = getAuthorName(wallItems[i].messages[j].userInfo);
                        wallItems[i].messages[j].isEdit = false;

                        $rootScope.base.initStartParamsForCreateMessage(wallItems[i].messages[j]);
                    }

                    (mesLen >= $rootScope.COMMENTS_DEFAULT_COUNT) ?
                        wallItems[i].bufferMessages = wallItems[i].messages.slice(mesLen-$rootScope.COMMENTS_DEFAULT_COUNT):
                        wallItems[i].bufferMessages = wallItems[i].messages;



                    if(wallItems[i].topic.poll != null){
                        //значит это опрос
                        setPollEditNames(wallItems[i].topic.poll);

                        wallItems[i].topic.metaType = "poll";
                    }
                }
            }
        }

        important.toggleComments = function(event,wallItem){
            event.preventDefault();

            var mesLen = wallItem.messages.length;

            if(wallItem.isOpen){
                wallItem.isOpen = false;

                (mesLen >= $rootScope.COMMENTS_DEFAULT_COUNT) ?
                    wallItem.bufferMessages = wallItem.messages.slice(mesLen-$rootScope.COMMENTS_DEFAULT_COUNT):
                    wallItem.bufferMessages = wallItem.messages;

                //wallItem.bufferMessages = wallItem.messages.slice(mesLen-important.COMMENTS_DEFAULT_COUNT);
            }else{
                wallItem.isOpen = true;
                wallItem.bufferMessages = wallItem.messages;
            }
        };

        initFancyBox($('.forum'));

        $('.ng-cloak').removeClass('ng-cloak');

    };

module.exports = [ '$rootScope', importantCtrl ];
},{}],"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\index.js":[function(require,module,exports){
'use strict';

module.exports = angular.module('VOControllers', ['ui.select2','infinite-scroll','ngSanitize','yaMap','ui.bootstrap'])

    .controller('baseCtrl', require('./base.js'))

    .controller('aboutCtrl', require('./about.js'))
    .controller('advertsCtrl', require('./adverts.js'))
    .controller('advertsSingleCtrl', require('./advertsSingle.js'))
    .controller('blogCtrl', require('./blog.js'))
    .controller('changeAvatarCtrl', require('./changeAvatar.js'))
    .controller('contactsCtrl', require('./contacts.js'))
    .controller('countersCtrl', require('./counters.js'))
    .controller('countersHistoryCtrl', require('./countersHistory.js'))
    .controller('dialogCtrl', require('./dialog.js'))
    .controller('dialogsCtrl', require('./dialogs.js'))
    .controller('importantCtrl', require('./important.js'))
    .controller('leftBarCtrl', require('./leftBar.js'))
    .controller('wallCtrl', require('./wall.js'))
    .controller('mainContentTopCtrl', require('./mainContentTop.js'))
    .controller('mapsCtrl', require('./maps.js'))
    .controller('modalInstanceCtrl', require('./modalInstance.js'))
    .controller('navbarCtrl', require('./navbar.js'))
    .controller('nearbyCtrl', require('./nearby.js'))
    .controller('nearbySingleCtrl', require('./nearbySingle.js'))
    .controller('neighboursCtrl', require('./neighbours.js'))
    .controller('profileCtrl', require('./profile.js'))
    .controller('rubricsCtrl', require('./rubrics.js'))
    .controller('rubricsSingleCtrl', require('./rubricsSingle.js'))
    .controller('setInfoCtrl', require('./setInfo.js'))
    .controller('settingsCtrl', require('./settings.js'))
    .controller('talksCtrl', require('./talks.js'))
    .controller('talksSingleCtrl', require('./talksSingle.js'))
    .controller('unconfirmedCtrl', require('./unconfirmed.js'))
    .controller('wallSingleCtrl', require('./wallSingle.js'))

    // business
    .controller('cabinetCtrl', require('./business/cabinet.js'))
    .controller('editCtrl', require('./business/edit.js'))
    .controller('statisticCtrl', require('./business/statistic.js'))
;
},{"./about.js":"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\about.js","./adverts.js":"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\adverts.js","./advertsSingle.js":"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\advertsSingle.js","./base.js":"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\base.js","./blog.js":"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\blog.js","./business/cabinet.js":"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\business\\cabinet.js","./business/edit.js":"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\business\\edit.js","./business/statistic.js":"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\business\\statistic.js","./changeAvatar.js":"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\changeAvatar.js","./contacts.js":"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\contacts.js","./counters.js":"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\counters.js","./countersHistory.js":"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\countersHistory.js","./dialog.js":"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\dialog.js","./dialogs.js":"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\dialogs.js","./important.js":"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\important.js","./leftBar.js":"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\leftBar.js","./mainContentTop.js":"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\mainContentTop.js","./maps.js":"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\maps.js","./modalInstance.js":"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\modalInstance.js","./navbar.js":"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\navbar.js","./nearby.js":"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\nearby.js","./nearbySingle.js":"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\nearbySingle.js","./neighbours.js":"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\neighbours.js","./profile.js":"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\profile.js","./rubrics.js":"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\rubrics.js","./rubricsSingle.js":"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\rubricsSingle.js","./setInfo.js":"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\setInfo.js","./settings.js":"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\settings.js","./talks.js":"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\talks.js","./talksSingle.js":"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\talksSingle.js","./unconfirmed.js":"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\unconfirmed.js","./wall.js":"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\wall.js","./wallSingle.js":"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\wallSingle.js"}],"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\leftBar.js":[function(require,module,exports){

var leftBarCtrl = function($rootScope,$state) {

    $rootScope.setTab = function(newValue){

        $rootScope.leftbar.tab = newValue;
        $rootScope.isTopSearchShow = true;
        resetPages($rootScope.base);
        resetAceNavBtns($rootScope.navbar);

        switch(newValue){
            case 1:
                $rootScope.base.mainContentTopIsHide = false;
                $rootScope.base.lentaIsActive = true;
                $rootScope.currentPage = 'lenta';
                $rootScope.base.pageTitle = "Новости";
                break;
            case 2:
                $rootScope.base.mainContentTopIsHide = false;
                $rootScope.base.isTalkTitles = true;
                $rootScope.base.talksIsActive = true;
                $rootScope.currentPage = 'talks';
                $rootScope.base.pageTitle = "Обсуждения";
                break;
            case 3:
                $rootScope.base.mainContentTopIsHide = false;
                $rootScope.base.isAdvertsTitles = true;
                $rootScope.base.advertsIsActive = true;
                $rootScope.currentPage = 'adverts';
                $rootScope.base.pageTitle = "Объявления";
                break;
            case 4:
                $rootScope.base.mainContentTopIsHide = false;
                $rootScope.base.importantIsActive = true;
                $rootScope.currentPage = 'important';
                $rootScope.base.pageTitle = "Важные сообщения";
                break;
            case 5:
                $rootScope.base.mainContentTopIsHide = false;
                $rootScope.base.importantIsActive = true;
                $rootScope.currentPage = 'nearby';
                $rootScope.base.pageTitle = "Рядом";
                break;
            default :
                break;
        }

    };

    $rootScope.isSet = function(number){
        return $rootScope.leftbar.tab === number;
    };

    $rootScope.setRubric = function(rubric){

            $rootScope.currentRubric = rubric;
            $rootScope.selRubricName = $rootScope.currentRubric.visibleName;
        if(!rubric) {
            $rootScope.currentRubric = {};
            $rootScope.selRubricName = null;
        }

        if($state.current.name != 'main') {
            var st = $state.get('main');
            st.rubricId = rubric.id;
            $state.go('main');
        }else {
            $rootScope.wallChangeRubric($rootScope.currentRubric.id);
        }

    }
  };

module.exports = [ '$rootScope','$state', leftBarCtrl ];
},{}],"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\mainContentTop.js":[function(require,module,exports){

var mainContentTopCtrl = function($rootScope, $state) {

        var topCtrl = this;

        topCtrl.groups = userClientGroups;// ? userClientGroups.reverse() : userClient.getUserGroups().reverse();
        var groups = $rootScope.groups = topCtrl.groups,
            groupsLength = groups.length;

        for(var i = 0; i < groupsLength; i++){
            groups[i].isShow = true;
            if(groups[i].id == $rootScope.currentGroup.id) groups[i].selected = true;
        }

        topCtrl.isSet = function(groupId){
            //return groupId ===
        };

        $rootScope.selectGroup = function(group){
            //var groupId = group.id;

            if(group.id == 0){

                $state.go('set-info');

            }else {
                if($state.current.name == 'set-info') {
                    localStorage.setItem('VO_setInfo_groupId',group.id);
                    $state.go('main');
                }

                for (var i = 0; i < groupsLength; i++) {
                    groups[i].selected = false;
                }

                group.selected = true;

                $rootScope.currentGroup = group;
                $rootScope.base.bufferSelectedGroup = selectGroupInDropdown(group.id);

                //$rootScope.importantTopics = messageClient.getImportantNews(group.id);

                if ($rootScope.currentPage == 'lenta') {
                    $rootScope.wallChangeGroup(group.id);
                    $rootScope.selectGroupInDropdown_lenta(group.id);
                } else if ($rootScope.currentPage == 'talks') {
                    $rootScope.talksChangeGroup(group.id);
                    $rootScope.selectGroupInDropdown_talks(group.id);
                } else if ($rootScope.currentPage == 'adverts') {
                    $rootScope.advertsChangeGroup(group.id);
                    $rootScope.selectGroupInDropdown_adverts(group.id);
                } else if ($rootScope.currentPage == 'neighbours') {
                    $rootScope.neighboursChangeGroup(group.id);
                } else if ($rootScope.currentPage == 'maps') {
                    $rootScope.mapsChangeGroup(group.id);
                } else if ($rootScope.currentPage == 'important') {
                    $rootScope.importantChangeGroup(group.id);
                }

                localStorage.setItem('groupId', group.id);
                //$rootScope.currentGroup = $rootScope.base.selectGroupInDropdown(group.id);
            }
        };

        $rootScope.showCreateTopic = function(event){
            event.preventDefault();

            $rootScope.base.createTopicIsHide ? $rootScope.base.createTopicIsHide = false : $rootScope.base.createTopicIsHide = true;

        };

        $('.ng-cloak').removeClass('ng-cloak');
    };

module.exports = [ '$rootScope','$state', mainContentTopCtrl ];
},{}],"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\maps.js":[function(require,module,exports){

var mapsCtrl = function($rootScope) {
        var maps = this;

        $rootScope.currentPage = "maps";
        $rootScope.isTopSearchShow = false;
        $rootScope.base.mainContentTopIsHide = false;
        $rootScope.leftbar.tab = 0;
        $rootScope.base.pageTitle = "Карты";

        resetPages($rootScope.base);
        $rootScope.base.mapsIsActive = true;

        resetAceNavBtns($rootScope.navbar);
        $rootScope.navbar.mapsBtnStatus = "active";

        $rootScope.base.mapsLoadStatus = "isLoaded";

        showGroupOverBuilding($rootScope.groups);
        //$rootScope.groups[0].isShow = false;
        //$rootScope.groups[1].selected = true;

        /*if($rootScope.currentGroup.id == $rootScope.groups[0].id){
            $rootScope.currentGroup = $rootScope.groups[1];
        }*/
    $rootScope.currentGroup = userClientGroups[3];

        $rootScope.base.isFooterBottom = true;

        var yaMap;
        maps.afterMapInit=function(nMap){
            yaMap = nMap;
        };

        maps.color = MAP_COLOR;

        //maps.url = userClient.getGroupMap($rootScope.currentGroup.id,MAP_COLOR);

        var location = userClient.getGroupView($rootScope.currentGroup.id);

        var setMap = function(location){

            maps.center = [location.longitude,location.latitude];

            if (yaMap) {
                ($rootScope.currentGroup.type == 4) ? yaMap.setZoom(17) : yaMap.setZoom(16); ;
            }else{
                ($rootScope.currentGroup.type == 4) ? maps.zoom = 17 : maps.zoom = 16 ;
            }

            maps.baloon = {
                // Геометрия = тип объекта + географические координаты объекта
                geometry: {
                    // Тип геометрии - точка
                    type: 'Point',
                    // Координаты точки.
                    coordinates: maps.center
                },
                // Свойства
                properties: {
                    hintContent: "Я здесь"
                }
            };

            maps.radius = {
                geometry: {
                    type: 'Circle',
                    coordinates: maps.center,
                    radius: location.radius
                },
                properties: {
                }
            };

        };

        setMap(location);

        $rootScope.mapsChangeGroup = function(groupId){
            var location = userClient.getGroupView(groupId);

            setMap(location);
        };
        //$rootScope.selectGroup(getBuildingGroup($rootScope.currentGroup));

        angular.element($('.maps.page')).css({'min-height': $(window).height()-175}); 

    };

module.exports = [ '$rootScope', mapsCtrl ];
},{}],"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\modalInstance.js":[function(require,module,exports){

var modalInstanceCtrl = function($scope, $modalInstance) {
        $scope.ok = function () {
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    };

module.exports = [ '$scope','$$modalInstance', modalInstanceCtrl ];
},{}],"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\navbar.js":[function(require,module,exports){

var navbarCtrl = function($rootScope) {

        this.privateMessagesBtnStatus = "";
        $rootScope.navbar = this;

        this.logout = function(event){
            event.preventDefault();

            localStorage.removeItem('groupId');
            localStorage.removeItem('VO_is_business');
            authClient.logout();

            document.location.replace("/login");

        };

        //$('.ng-cloak').removeClass('ng-cloak');

  };

module.exports = [ '$rootScope', navbarCtrl ];
},{}],"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\nearby.js":[function(require,module,exports){

var nearbyCtrl = function($rootScope) {
    var nearby = this;

    var groupType = com.vmesteonline.be.thrift.GroupType.NEIGHBORS;
    nearby.businessList = businessClient.getBusinessList(groupType,0);

    $rootScope.base.isFooterBottom = true;
    $rootScope.base.pageTitle = "Рядом";
    $rootScope.base.talksIsActive = $rootScope.base.advertsIsActive = false;
    showGroupOverBuilding($rootScope.groups);
    $rootScope.currentRubric = null;

    nearby.isAuth = authClient.checkIfAuthorized();

    if(nearby.isAuth){
        //me = userClient.getUserProfile();
        //$('.anonName').removeClass('hidden');
    }

    nearby.posts = messageClient.getBusinessTopics(0,1000);

    if(nearby.posts.topics) {
        var len = nearby.posts.topics.length;
        for (var i = 0; i < len; i++) {
            nearby.posts.topics[i].isCommentShow = false;
            nearby.posts.topics[i].isInputShow = false;
            nearby.posts.topics[i].short = nearby.posts.topics[i].message.content.split(';')[0];
        }
    }

    angular.element($('.nearby')).css({'min-height': $(window).height()-110});

    $('.ng-cloak').removeClass('ng-cloak');

};

module.exports = [ '$rootScope', nearbyCtrl ];
},{}],"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\nearbySingle.js":[function(require,module,exports){

var nearbySingleCtrl =  function($rootScope,$stateParams) {
    var nearby = this,
        businessId;

    if ($stateParams.nearbyId && $stateParams.nearbyId != 0){
        businessId = $stateParams.nearbyId;
    }

    nearby.info = businessClient.getBusinessDescription(businessId);
    nearby.wallItem = businessClient.getWallItem(nearby.info.id);

    $rootScope.base.isFooterBottom = true;
    $rootScope.base.pageTitle = "Рядом";

    nearby.isAuth = authClient.checkIfAuthorized();

    if(nearby.isAuth){
        //me = userClient.getUserProfile();
        //$('.anonName').removeClass('hidden');
    }

    nearby.posts = messageClient.getBusinessTopics(0,1000);

    if(nearby.posts.topics) {
        var len = nearby.posts.topics.length;
        for (var i = 0; i < len; i++) {
            console.log(nearby.posts.topics[i].id,parseInt(businessId));
            if(nearby.posts.topics[i].id == parseInt(businessId)){
                nearby.posts.topics[i].isCommentShow = true;
                nearby.posts.topics[i].isInputShow = true;
                nearby.posts.topics[i].full = nearby.posts.topics[i].message.content.split(';')[1];

                nearby.post = nearby.posts.topics[i];
                nearby.post.fullLink = '/'+nearby.posts.topics[i].full;
                console.log(nearby.post);
            }
        }
    }

    nearby.toggleComm = function($event,post){
        $event.preventDefault();

        if (post.isCommentShow){
            post.isCommentShow = false;

        }else{
            post.isCommentShow = true;

            if(!post.comments) {
                post.comments = messageClient.getMessagesAsList(post.id, 8, 0, false, 1000).messages;
                console.log('finish');
            }
        }

    };

    nearby.toggleInput = function($event,post){
        $event.preventDefault();

        post.isInputShow ? post.isInputShow = false : post.isInputShow = true;

        console.log('input',post.isInputShow);

    };

    nearby.sendComm = function($event,post){
        $event.preventDefault();
        var message = new com.vmesteonline.be.thrift.messageservice.Message();

        message.id = 0;
        message.topicId = nearby.info.id; //post.id;
        message.type = com.vmesteonline.be.thrift.messageservice.MessageType.WALL;//8;
        message.groupId = 0;
        message.content = post.commenting;
        message.topicId = nearby.wallItem.topic.id;
        message.parentId = 0;
        message.created = Date.parse(new Date())/1000;
        post.commenting = "";

        if(!nearby.isAuth){
            message.anonName = post.anonName;
        }else{
            message.anonName = "";
        };

        console.log('post',message);
        //var returnComment = messageClient.postBusinessTopics(message);
        var returnComment = messageClient.postMessage(message);
        console.log('post2',returnComment);


        if(nearby.wallItem.messages && nearby.wallItem.messages.length) {
            nearby.wallItem.messages.push(returnComment);
        }else{
            nearby.wallItem.messages = [];
            nearby.wallItem.messages[0] = returnComment;
        }

    };

    nearby.getTiming = function(messageObjDate){
        var minute = 60*1000,
            hour = minute*60,
            day = hour*24,
            threeDays = day* 3,
            now = Date.parse(new Date()),
            timing = (now - messageObjDate*1000),
            timeTemp;

        if(timing < minute){
            timing = "только что";
        }else if(timing < hour){
            timing = new Date(timing);
            timing = timing.getMinutes()+" мин назад";
        }else if(timing < day){
            timing = new Date(timing);
            timeTemp = timing.getHours();
            if(timeTemp == 1 || timeTemp == 0){
                timing = "1 час назад";
            }else if(timeTemp > 1 && timeTemp < 5){
                timing = timeTemp + " часа назад";
            }else{
                timing = timeTemp + " часов назад";
            }
        }else if(timing < threeDays){
            timing = new Date(timing);
            timeTemp = timing.getDate();
            if(timeTemp == 1){
                timing = timeTemp+" день назад";
            }else{
                timing = timeTemp+" дней назад";
            }
        }else{
            timeTemp = new Date(messageObjDate*1000).toLocaleDateString();
            var arr = timeTemp.split('.');
            if(arr[0].length == 1) arr[0] = "0"+arr[0];
            if(arr[1].length == 1) arr[1] = "0"+arr[1];
            timing = arr[0]+"."+arr[1]+"."+arr[2];
        }

        return timing;
    };


    $('.ng-cloak').removeClass('ng-cloak');

};

module.exports = [ '$rootScope','$stateParams', nearbySingleCtrl ];
},{}],"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\neighbours.js":[function(require,module,exports){

var neighboursCtrl = function($rootScope,$state) {
        $rootScope.currentPage = "neighbours";
        $rootScope.isTopSearchShow = false;
        $rootScope.leftbar.tab = 0;
        $rootScope.base.showAllGroups();
        $rootScope.base.isFooterBottom = false;

        resetPages($rootScope.base);
        $rootScope.base.mainContentTopIsHide = false;
        $rootScope.base.neighboursIsActive = true;

        resetAceNavBtns($rootScope.navbar);
        $rootScope.navbar.neighboursBtnStatus = "active";
        $rootScope.base.pageTitle = "";

        $rootScope.currentGroup = userClientGroups[3];

        $rootScope.base.neighboursLoadStatus = "isLoaded";

        var neighbours = this;
        neighbours.neighboors = userClient.getNeighboursByGroup($rootScope.currentGroup.id);

        $rootScope.neighboursChangeGroup = function(groupId){
            neighbours.neighboors = userClient.getNeighboursByGroup(groupId);
            initAutoFill();
        };

        neighbours.neighboorsSize = neighbours.neighboors.length;

        function initAutoFill(){
            var data = [],
                neighboursLength = neighbours.neighboors.length;
            for(var i = 0; i < neighboursLength; i++){
                data[i] = {};
                data[i].label = neighbours.neighboors[i].firstName+" "+neighbours.neighboors[i].lastName;
                data[i].value = neighbours.neighboors[i].id;
                data[i].category = "";
            }
            $("#search-neighbours" ).catcomplete({
                delay: 0,
                source: data,
                select: function(event,ui){
                    $state.go('profile',{ 'userId' : ui.item.value});

                }
            });
        }
        initAutoFill();

        $('.ng-cloak').removeClass('ng-cloak');

    };

module.exports = [ '$rootScope','$state', neighboursCtrl ];
},{}],"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\profile.js":[function(require,module,exports){

var profileCtrl = function($rootScope, $stateParams) {

        $rootScope.isTopSearchShow = false;
        $rootScope.leftbar.tab = 0;

        resetPages($rootScope.base);
        $rootScope.base.profileIsActive = true;
        $rootScope.base.isFooterBottom = true;

        resetAceNavBtns($rootScope.navbar);
        $rootScope.base.mainContentTopIsHide = true;
        $rootScope.base.profileLoadStatus = "isLoaded";

        var profile = this, userId;
        profile.isMayEdit = false;

        $("#dialog-message").addClass('hide');

        if ($stateParams.userId && $stateParams.userId != 0 && $stateParams.userId != shortUserInfo.id){
            userId = $stateParams.userId;
            //profile.userContacts = userClient.getUserContactsExt(userId);
        }else{
            userId = 0;
            profile.isMayEdit = true;

            try {
                var location = userClient.getGroupView($rootScope.groups[0].id);

                profile.map = {};
                profile.map.zoom = 17;
                profile.map.center = [location.longitude, location.latitude];

                profile.map.baloon = {
                    // Геометрия = тип объекта + географические координаты объекта
                    geometry: {
                        // Тип геометрии - точка
                        type: 'Point',
                        // Координаты точки.
                        coordinates: profile.map.center
                    },
                    // Свойства
                    properties: {
                        hintContent: "Я здесь"
                    }
                };
            }catch(err){
            }
            //profile.map = userClient.getGroupMap($rootScope.groups[0].id, MAP_COLOR);
            //profile.userContacts = userClient.getUserContacts();
        }

        profile.userProfile = userClient.getUserProfile(userId);

        var isEmptyContacts = false,
            isEmptyFamily = false,
            isEmptyInterests = false,
            isEmptyNotifications = false,
            isEmptyUserInfo = false;

        if(!profile.userProfile.userInfo || !profile.userProfile.userInfo.birthday) isEmptyUserInfo = true;

        if(!profile.userProfile.contacts || (!profile.userProfile.contacts.homeAddress && !profile.userProfile.contacts.mobilePhone &&
            !profile.userProfile.contacts.email)) isEmptyContacts = true;

        if(!profile.userProfile.family || (!profile.userProfile.family.relations
            && !profile.userProfile.family.childs && !profile.userProfile.family.pets)) isEmptyFamily = true;

        if(!profile.userProfile.interests || (!profile.userProfile.interests.userInterests && !profile.userProfile.interests.job)) isEmptyInterests = true;

        if(!profile.userProfile.notifications) isEmptyNotifications = true;

        //alert(isEmptyUserInfo+" "+isEmptyContacts+" "+isEmptyFamily+" "+isEmptyInterests+" "+isEmptyNotifications);
        if(isEmptyUserInfo && isEmptyContacts && isEmptyFamily && isEmptyInterests && isEmptyNotifications)
            profile.isEmptyProfile = true;

        if(profile.userProfile.userInfo){
            if (profile.userProfile.userInfo.gender == 1){
                profile.userProfile.userInfo.genderMeta = "Женский";
            }else if(profile.userProfile.userInfo.gender == 2){
                profile.userProfile.userInfo.genderMeta = "Мужской";
            }else{
                profile.userProfile.userInfo.genderMeta = "";
            }
        }

        $rootScope.base.avatarBuffer = profile.userProfile.userInfo.avatar;

        if(profile.userProfile.family && profile.userProfile.family.relations == 0){

            if(profile.userProfile.userInfo.gender == 1){
                profile.userProfile.family.relationsMeta = "Замужем";
            }else if(profile.userProfile.userInfo.gender == 2){
                profile.userProfile.family.relationsMeta = "Женат";
            }

        }else if(profile.userProfile.family && profile.userProfile.family.relations == 1){
            if(profile.userProfile.userInfo.gender == 1){
                profile.userProfile.family.relationsMeta = "Не замужем";
            }else if(profile.userProfile.userInfo.gender == 2){
                profile.userProfile.family.relationsMeta = "Холост";
            }
        }

        if(profile.userProfile.family && profile.userProfile.family.pets && profile.userProfile.family.pets.length != 0){
           var petsLength = profile.userProfile.family.pets.length;
            var pets = profile.userProfile.family.pets;
            for(var i = 0; i < petsLength; i++){
                switch(profile.userProfile.family.pets[i].type){
                    case 0:
                        profile.userProfile.family.pets[i].typeMeta = "Кошка";
                        break;
                    case 1:
                        profile.userProfile.family.pets[i].typeMeta = "Собака";
                        break;
                    case 2:
                        profile.userProfile.family.pets[i].typeMeta = "Птичка";
                        break;
                }

            }
        }

        //$rootScope.chageIndex = 0;

        angular.element($('.profile')).css({'min-height': $(window).height()-135});

        $('.ng-cloak').removeClass('ng-cloak');

};

module.exports = [ '$rootScope','$stateParams', profileCtrl ];
},{}],"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\rubrics.js":[function(require,module,exports){

var rubricsCtrl = function($rootScope,$stateParams) {
        /*
        * при работе с обсждениями нужно учесть следующее:
        * есть три типа сообщения :
        * 1) топик. На странице обсуждения может быть только один. Его дети
        * это сообщения первого уровня. Его дети всегда открыты, поэтому у него
        * нет контрола плюс-минус. Страница топика загружается в методе showFullTalk
        * через topicId который передается в функцию при вызове
        * Хранится в объекте talk.fullTalkTopic.
        *
        * 2) Сообщение первого уровня. Берутся через getFirstLevelMessages. Изначально
        * все потомки скрыты и не подгружены. При первом нажатии на контрол плюс-минус
        * подгружаются, потом просто переключается show-hide. ParentId у таких сообщений
        * равен 0. Внимание! : ParentId передается в getFirstLevelMessages через lastLoadedId.        *
        * У каждого сообщения первого уровня есть свой массив сообщений 3го типа.
        * Хранятся в массиве talk.fullTalkFirstMessages.
        *
        * 3) Просто сообщение. Береутся через getMessages(). Через параметр lastLoadedId передается
        * id последнего загруженного простого сообщения, для подгрузки. У каждого простого сообщения
        * есть offset, который задается на БЕ. offset'ы определяют вложенность сообщений и за счет них
        * создается древовидная структура форума.
        * Хранятся в двумерном массиве talk.fullTalkMessages[firstMessage.id][]
        *
        *
        * Есть следующие типы контролов, реализованные для разных типов сообщений:
        * 1) showAnswerInput : реализует клик на "Ответить", показвает поле для отправки
        * сообщения.
        * 2) addMessage: клик на "Отправить", создает и отображает новое сообщение
        * 3) toggleTree: контрол "плюс-минус", скрвает-показвает внутренние сообщения этого
        * сообщения.
        * */
            $rootScope.setTab(2);
            var talk = this;

            talk.attachId = "00";
            initFancyBox($('.talks'));

            $rootScope.base.showAllGroups();
            $rootScope.base.isFooterBottom = false;

            $rootScope.base.createTopicIsHide = true;

            talk.isTalksLoaded = false;
            talk.groups = userClientGroups;

            talk.message = {};
            talk.message.content = talk.message.default = TEXT_DEFAULT_3;
            talk.subject = TEXT_DEFAULT_4;

            $rootScope.base.bufferSelectedGroup = talk.selectedGroup =
            $rootScope.currentGroup = userClientGroups[3];

            $rootScope.base.initStartParamsForCreateTopic(talk);

            talk.isTalk = true;

            talk.fullTalkTopic = {};
            talk.fullTalkTopic.answerInputIsShow = false;
            talk.fullTalkMessages = [];
            talk.fullTalkFirstMessages = [];

            talk.commentText = TEXT_DEFAULT_2;
            var fullTalkFirstMessagesLength,
                talkId;

            /*if(!$rootScope.importantIsLoadedFromTop)
            $rootScope.importantTopics = messageClient.getImportantNews($rootScope.currentGroup.id);
            $rootScope.importantIsLoadedFromTop = false;*/

            talk.topics = messageClient.getTopics(talk.selectedGroup.id, $stateParams.rubricId, 0, 0, 1000).topics;

            initTalks();

            if (!talk.topics) talk.topics = [];

            $rootScope.selectGroupInDropdown_talks = function(groupId){
                talk.selectedGroup = $rootScope.base.bufferSelectedGroup = selectGroupInDropdown(groupId);
            };

        function initTalks(){
            var topicLength;
            talk.topics ? topicLength = talk.topics.length : topicLength = 0;

            for(var i = 0; i < topicLength;i++){
                talk.topics[i].lastUpdateEdit = getTiming(talk.topics[i].lastUpdate);
                talk.topics[i].label = getLabel(talk.groups,talk.topics[i].groupType);
                talk.topics[i].tagColor = getTagColor(talk.topics[i].label);

                if(talk.topics[i].message.important == 1){
                    talk.topics[i].message.importantText = 'Снять метку "Важное"';
                }else{
                    talk.topics[i].message.importantText = 'Пометить как "Важное"';
                }
            }
        }

        $rootScope.talksChangeGroup = function(groupId){

            talk.topics = messageClient.getTopics(groupId,0,0,0,1000).topics;

            if(talk.topics) {
                initTalks();
            }

        };

        $('.ng-cloak').removeClass('ng-cloak');

    };

module.exports = [ '$rootScope','$stateParams', rubricsCtrl ];
},{}],"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\rubricsSingle.js":[function(require,module,exports){

var rubricsSingleCtrl = function($rootScope,$stateParams){

        $rootScope.base.isFooterBottom = false;

        var talk = this,
            fullTalkMessagesLength,
            talkId = $stateParams.talkId;

        $rootScope.base.lastLoadedId = 0;
        $rootScope.base.isEarliestMessages = false;
        $rootScope.base.endOfLoaded = false;

        talk.attachId = "00";
        talk.selectedGroup = $rootScope.currentGroup;

        /*if(!$rootScope.importantIsLoadedFromTop)
            $rootScope.importantTopics = messageClient.getImportantNews($rootScope.currentGroup.id);
        $rootScope.importantIsLoadedFromTop = false;*/

        talk.topics = messageClient.getTopics(talk.selectedGroup.id, 0, 0, 0, 1000).topics;
        talk.fullTalkTopic = {};
        talk.fullTalkMessages = {};
        talk.fullTalkFirstMessages = [];
        talk.groups = userClientGroups;

        talk.isTalk = true;

        $rootScope.base.initStartParamsForCreateMessage(talk);

        var showFullTalk = function(talk,talkOutsideId){

            initFancyBox($('.talks-single'));
            var topicLength;
            talk.topics ? topicLength = talk.topics.length : topicLength = 0;

            var talkId = talkOutsideId;
            for(var i = 0; i < topicLength; i++){
                if(talkId == talk.topics[i].id){
                    talk.fullTalkTopic = talk.topics[i];

                    $rootScope.base.initStartParamsForCreateTopic(talk.fullTalkTopic);

                    talk.fullTalkTopic.isTalk = true;
                    talk.fullTalkTopic.message.createdEdit = getTiming(talk.fullTalkTopic.message.created);
                    talk.fullTalkTopic.label = getLabel(talk.groups,talk.fullTalkTopic.groupType);
                    talk.fullTalkTopic.tagColor = getTagColor(talk.fullTalkTopic.label);

                    if(talk.fullTalkTopic.message.important == 1){
                        talk.fullTalkTopic.message.importantText = 'Снять метку "Важное"';
                    }else{
                        talk.fullTalkTopic.message.importantText = 'Пометить как "Важное"';
                    }
                }
            }

            if (talk.fullTalkTopic.poll != null) {
                setPollEditNames(talk.fullTalkTopic.poll);
                talk.fullTalkTopic.metaType = "poll";
            } else {
                talk.fullTalkTopic.metaType = "message";
            }

            talk.fullTalkFirstMessages = messageClient.getFirstLevelMessages(talkId, talk.selectedGroup.id, 1, $rootScope.base.lastLoadedId, 0, 10).messages;

            $rootScope.base.lastLoadedId = $rootScope.base.initFirstMessages(talk.fullTalkFirstMessages);

            $rootScope.base.isTalkTitles = false;
            $rootScope.base.mainContentTopIsHide = true;
            $rootScope.base.createTopicIsHide = true;

        };

        showFullTalk(talk,talkId);

        var initFlagsTopic = [];
        talk.showTopicAnswerInput = function(event,fullTalkTopic){
            event.preventDefault();

            talk.answerShow = true;

            if(!initFlagsTopic[fullTalkTopic.id]) {
                initFlagsTopic[fullTalkTopic.id] = true;
            }

            talk.fullTalkTopic.answerInputIsShow ?
                talk.fullTalkTopic.answerInputIsShow = false :
                talk.fullTalkTopic.answerInputIsShow = true ;
        };

        var initFlagsMessage = [];
        talk.showMessageAnswerInput = function(event,fullTalkTopic,firstMessage,message){
            event.preventDefault();
            var attachId;

            if(!message){
                // если это сообщение первого уровня
                firstMessage.isTalk = true;
                //firstMessage.isEdit = false;

                attachId = fullTalkTopic.id+'-'+firstMessage.id;

                if(!talk.fullTalkFirstMessages) talk.fullTalkFirstMessages = messageClient.getFirstLevelMessages(talkId,talk.selectedGroup.id,1,0,0,1000).messages;
                var fullTalkFirstMessagesLength = talk.fullTalkFirstMessages.length;

                $rootScope.base.initStartParamsForCreateMessage(firstMessage);

                firstMessage.answerInputIsShow ?
                    firstMessage.answerInputIsShow = false :
                    firstMessage.answerInputIsShow = true;


            }else{
                // если простое сообщение
                message.isTalk = true;
                //message.isEdit = false;

                attachId = fullTalkTopic.id+'-'+message.id;

                if(!talk.fullTalkMessages[firstMessage.id]) talk.fullTalkMessages[firstMessage.id] = messageClient.getMessages(talkId,talk.selectedGroup.id,1,firstMessage.id,0,1000).messages;
                var  fullTalkMessagesLength = talk.fullTalkMessages[firstMessage.id].length;

                $rootScope.base.initStartParamsForCreateMessage(message);
                message.answerInputIsShow ?
                    message.answerInputIsShow = false :
                    message.answerInputIsShow = true;

            }

            if(!initFlagsMessage[attachId]) {
                //initAttachImage($('#attachImage-' + attachId), $('#attach-area-' + attachId));
                //initAttachDoc($('#attachDoc-' + attachId), $('#attach-doc-area-' + attachId));

                initFlagsMessage[attachId] = true;
            }
        };

        talk.toggleTreeFirstMessage = function(event,firstMessage){
            event.preventDefault();

            firstMessage.isTreeOpen ?
                firstMessage.isTreeOpen = false :
                firstMessage.isTreeOpen = true ;


            // --------

            talk.fullTalkMessages[firstMessage.id] = messageClient.getMessages(talkId,talk.selectedGroup.id,1,firstMessage.id,0,1000).messages;
            talk.fullTalkMessages[firstMessage.id] ?
                fullTalkMessagesLength = talk.fullTalkMessages[firstMessage.id].length:
                fullTalkMessagesLength = 0;
            if(talk.fullTalkMessages[firstMessage.id] === null) talk.fullTalkMessages[firstMessage.id] = [];

            for(var i = 0; i < fullTalkMessagesLength; i++){
                talk.fullTalkMessages[firstMessage.id][i].answerInputIsShow = false;
                talk.fullTalkMessages[firstMessage.id][i].isTreeOpen = true;
                talk.fullTalkMessages[firstMessage.id][i].isOpen = true;
                talk.fullTalkMessages[firstMessage.id][i].isParentOpen = true;
                talk.fullTalkMessages[firstMessage.id][i].createdEdit = getTiming(talk.fullTalkMessages[firstMessage.id][i].created);
                talk.fullTalkMessages[firstMessage.id][i].commentText = TEXT_DEFAULT_2;

            }

        };

        talk.toggleTree = function(event,message,firstMessage){
            event.preventDefault();

            if(!talk.fullTalkMessages[firstMessage.id]) talk.fullTalkMessages[firstMessage.id] = messageClient.getMessages(talkId,talk.selectedGroup.id,1,firstMessage.id,0,1000).messages;
            var fullTalkMessagesLength = talk.fullTalkMessages[firstMessage.id].length;

            message.isTreeOpen ?
                message.isTreeOpen = false :
                message.isTreeOpen = true ;

            var afterCurrentIndex = false,
                nextMessageOnCurrentLevel = false,
                loopMessageOffset,
                parentOpenStatus,
                areAllMyParentsTreeOpen = [],
                checkAreAllMyParentsTreeOpen = true,
                beginOffset = message.offset,
                parentOpenStatusArray = [];

            for(var i = 0; i < fullTalkMessagesLength; i++){
                loopMessageOffset = talk.fullTalkMessages[firstMessage.id][i].offset;

                if(afterCurrentIndex && !nextMessageOnCurrentLevel
                    && message.offset < loopMessageOffset){

                    areAllMyParentsTreeOpen[loopMessageOffset] = true;

                    if(loopMessageOffset - message.offset == 1){
                        //если это непосредственный потомок

                        talk.fullTalkMessages[firstMessage.id][i].isOpen ?
                            talk.fullTalkMessages[firstMessage.id][i].isOpen = false :
                            talk.fullTalkMessages[firstMessage.id][i].isOpen = true ;

                        parentOpenStatusArray[loopMessageOffset] = true;
                        parentOpenStatus = talk.fullTalkMessages[firstMessage.id][i].isOpen;

                        if (!talk.fullTalkMessages[firstMessage.id][i].isTreeOpen){
                            areAllMyParentsTreeOpen[loopMessageOffset] = false;
                        }
                    }else{
                        // если это птомки потомка

                        checkAreAllMyParentsTreeOpen = true;
                        for(var j = beginOffset; j < loopMessageOffset; j++){
                            // проверяем нет ли у кого в предках isTreeOpen = false
                            if(areAllMyParentsTreeOpen[j] == false){
                                checkAreAllMyParentsTreeOpen = false;
                            }
                        }
                        parentOpenStatus && checkAreAllMyParentsTreeOpen ?
                            talk.fullTalkMessages[firstMessage.id][i].isOpen = true :
                            talk.fullTalkMessages[firstMessage.id][i].isOpen = false ;

                        if (!talk.fullTalkMessages[firstMessage.id][i].isTreeOpen){
                            // если у кого-то из предков не открыто дерево
                            areAllMyParentsTreeOpen[loopMessageOffset] = false;
                        }

                        parentOpenStatusArray[loopMessageOffset] = true;
                    }
                }

                if (afterCurrentIndex && loopMessageOffset == message.offset){
                    nextMessageOnCurrentLevel = true;
                    break;
                }
                if(message.id == talk.fullTalkMessages[firstMessage.id][i].id){
                    afterCurrentIndex = true;
                }
            }
        };

        var buff,
            lastLoadedIdFF;
        talk.addMoreItems = function(){
            var temp = messageClient.getFirstLevelMessages(talkId,talk.selectedGroup.id,1,$rootScope.base.lastLoadedId,0,10),
                buff = temp.messages;
            if(buff) {
                var buffLength = buff.length;

                if(buffLength != 0) {

                    $rootScope.base.lastLoadedId = buff[buffLength - 1].id;

                    if(lastLoadedIdFF != $rootScope.base.lastLoadedId) {
                        $rootScope.base.initFirstMessages(buff);
                        talk.fullTalkFirstMessages = talk.fullTalkFirstMessages.concat(buff);
                    }

                    lastLoadedIdFF = $rootScope.base.lastLoadedId;

                }
            }else{
                $rootScope.base.endOfLoaded = true;
            }

        };

        $('.ng-cloak').removeClass('ng-cloak');

    };

module.exports = [ '$rootScope','$stateParams', rubricsSingleCtrl ];
},{}],"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\setInfo.js":[function(require,module,exports){

var setInfoCtrl = function($state, $rootScope) {
        var setInfo = this;

        setInfo.isSaveResult = false;
        setInfo.isError = false;

        setInfo.save = function(){
            var staircase, floor,flat;

            (!setInfo.staircase) ? staircase = 0 : staircase = setInfo.staircase;
            (!setInfo.floor) ? floor = 0 : floor = setInfo.floor;
            (!setInfo.flat) ? flat = 0 : flat = setInfo.flat;

            setInfo.isSaveResult = true;
            //try {
                userClient.updateUserAddress(staircase, floor, flat);
                setInfo.info = "Сохранено";
                window.location.replace('/');
                //$rootScope.$apply();
            /*}catch(e){
                setInfo.info = "Произошла ошибка";
                setInfo.isError = true;
            }*/
        };

    };

module.exports = [ '$state','$rootScope', setInfoCtrl ];
},{}],"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\settings.js":[function(require,module,exports){

var settingsCtrl= function($rootScope,$scope) {
        $rootScope.isTopSearchShow = false;
        $rootScope.leftbar.tab = 0;

        resetPages($rootScope.base);
        $rootScope.base.settingsIsActive = true;
        $rootScope.base.isFooterBottom = true;

        resetAceNavBtns($rootScope.navbar);
        $rootScope.base.mainContentTopIsHide = true;

        $rootScope.base.settingsLoadStatus = "isLoaded";

        var settings = this,
            userProfileMeta = userClient.getUserProfile(),
            userContatcsMeta = userProfileMeta.contacts,
            userInfoMeta = userProfileMeta.userInfo,
            userPrivacyMeta = userProfileMeta.privacy,
            userNotificationsMeta = userProfileMeta.notifications,
            userFamilyMeta = userProfileMeta.family,
            userInterestsMeta = userProfileMeta.interests;

        if(userFamilyMeta === null){
            userFamilyMeta = new com.vmesteonline.be.thrift.UserFamily();
        }

        settings.userContacts = clone(userContatcsMeta);
        settings.userInfo = clone(userInfoMeta);
        settings.userPrivacy = clone(userPrivacyMeta);
        settings.userNotifications = clone(userNotificationsMeta);
        if(!settings.userNotifications){
            settings.userNotifications = new com.vmesteonline.be.thrift.Notifications();
            settings.userNotifications.freq = 4;
        }

        settings.family = clone(userFamilyMeta);
        settings.interests = clone(userInterestsMeta);

        if (settings.userInfo.gender == 1) {
            settings.married = "Замужем";
            settings.notMarried = "Не замужем";
        }else if(settings.userInfo.gender == 2){
            settings.married = "Женат";
            settings.notMarried = "Не женат";
        }else{
            settings.married = "В браке";
            settings.notMarried = "Не состою в браке";
        }

        settings.years= [];
        var ind = 0;
        for(var i = 2014; i > 1940; i--){
            settings.years[ind++] = i;
        }

        settings.userInfo.birthday ?
        settings.userInfo.birthdayMeta = new Date(settings.userInfo.birthday*1000) :
        settings.userInfo.birthdayMeta = "";

        if(settings.userInfo.birthdayMeta){
            var month = settings.userInfo.birthdayMeta.getMonth()+1+"";
            if(month.length == 1) month = "0"+month;

            var day = ""+settings.userInfo.birthdayMeta.getDate();
            if(day.length == 1) day = "0"+day;

            var year = settings.userInfo.birthdayMeta.getFullYear();

            settings.userInfo.birthdayMeta = day+"."+month+"."+year;
        }

        if(settings.family.childs === null || settings.family.childs.length == 0){
            settings.family.childs = [];
            settings.family.childs[0] = new com.vmesteonline.be.thrift.Children();
            settings.family.childs[0].name = "";
            var nowYear = new Date();
            nowYear = nowYear.getFullYear();
            //settings.family.childs[0].birthday = Date.parse('01.15.'+nowYear);
            settings.family.childs[0].birthday = null;
            settings.family.childs[0].isNotRemove = true;
        }
        var childsLength = settings.family.childs.length;
        for(var i = 0; i < childsLength; i++){
            if(settings.family.childs[i].birthday) {

                var birthDate = new Date(settings.family.childs[i].birthday*1000);
                    settings.family.childs[i].month = ""+birthDate.getMonth();

                if(settings.family.childs[i].month.length == 1)
                    settings.family.childs[i].month = "0"+settings.family.childs[i].month;

                    settings.family.childs[i].year = birthDate.getFullYear();
            }

        }

        if(settings.family.pets === null || settings.family.pets.length == 0){
            settings.family.pets = [];
            settings.family.pets[0] = new com.vmesteonline.be.thrift.Pet();
            settings.family.pets[0].name = "";
            settings.family.pets[0].type = "0";
            settings.family.pets[0].breed = "";
            settings.family.pets[0].isNotRemove = true;
        }

        settings.oldPassw = "";
        settings.newPassw = "";

        settings.canSave = function(num){
            switch(num){
                case 1:
                    return $scope.formUserInfo.$valid;
                    break;
                case 2:
                    return $scope.formPrivate.$valid;
                    break;
                case 3:
                    return $scope.formAlerts.$valid;
                    break;
                case 4:
                    return $scope.formContacts.$valid;
                    break;
                case 5:
                    return $scope.formFamily.$valid;
                    break;
                case 6:
                    return $scope.formInterests.$valid;
                    break;
            }

        };

        settings.profileInfo = "Сохранено";

        settings.isProfileError = false;
        settings.isProfileResult = false;
        settings.updateUserInfo = function(){
            var temp = new com.vmesteonline.be.thrift.UserInfo();

            settings.userInfo.birthdayMeta ?
                temp.birthday = Date.parse(getCorrectDate(settings.userInfo.birthdayMeta))/1000 :
                temp.birthday = 0;

            temp.gender = settings.userInfo.gender;
            temp.firstName = $rootScope.base.me.firstName = settings.userInfo.firstName;
            temp.lastName = $rootScope.base.me.lastName = settings.userInfo.lastName;

            userClient.updateUserInfo(temp);
            settings.isProfileResult = true;
            settings.isProfileError = false;
            settings.profileInfo = "Сохранено";

        };

        settings.isPasswError = false;
        settings.isPasswResult = false;
        settings.updatePassword = function(){
            if (settings.newPassw.length < 3){
                settings.isPasswResult = true;
                settings.isPasswError = true;
                settings.passwInfo = "Вы указали слишком короткий пароль";
            }else{
                settings.isPasswResult = true;
                try {
                    userClient.changePassword(settings.oldPassw, settings.newPassw);
                    settings.isPasswError = false;
                    settings.passwInfo = "Сохранено";
                }catch(e){
                    settings.isPasswError = true;
                    settings.passwInfo = "Вы указали не верный старый пароль";
                }
            }
        };


        settings.isPrivacyError = false;
        settings.isPrivacyResult = false;
        settings.updatePrivacy = function(){
            userClient.updatePrivacy(settings.userPrivacy);

            settings.isPrivacyResult = true;
            settings.isPrivacyError = false;
        };


        settings.isContactsError = false;
        settings.isContactsResult = false;
        settings.updateContacts = function(){
            var temp = new com.vmesteonline.be.thrift.UserContacts();
            temp.email = settings.userContacts.email;
            temp.mobilePhone = settings.userContacts.mobilePhone;
            userClient.updateContacts(temp);

            settings.isContactsError = false;
            settings.isContactsResult = true;
        };

        settings.isAlertsError = false;
        settings.isAlertsResult = false;
        settings.updateNotifications = function(){
            if(settings.userNotifications && (settings.userNotifications.email || settings.userNotifications.freq) ){
                var temp = new com.vmesteonline.be.thrift.Notifications();
                temp.email = settings.userNotifications.email;
                temp.freq = settings.userNotifications.freq;

                userClient.updateNotifications(temp);

                settings.isAlertsError = false;
                settings.isAlertsResult = true;
            }
        };

        settings.isFamilyError = false;
        settings.isFamilyResult = false;
        settings.updateFamily = function(){
            var temp = new com.vmesteonline.be.thrift.UserFamily();
            temp.relations = settings.family.relations;
            temp.childs = settings.family.childs;
            //temp.childs = [];
            //temp.childs[0] = settings.firstChild;

            temp.pets = settings.family.pets;

            var childsLength = settings.family.childs.length;
            for(var i = 0; i < childsLength; i++){
                if(settings.family.childs[i].name && settings.family.childs[i].name != ""){ <!--  && settings.family.childs[i].month && settings.family.childs[i].year -->

                    var tempMonth = parseInt(settings.family.childs[i].month)+1+"";

                    if(tempMonth.length < 2) tempMonth = "0" + tempMonth;

                    if(settings.family.childs[i].year && settings.family.childs[i].year != '1911' && settings.family.childs[i].month) {
                        temp.childs[i].birthday = Date.parse(getCorrectDate("15."+tempMonth +"." + settings.family.childs[i].year)) / 1000;
                        //alert(tempMonth+" "+getCorrectDate("15."+tempMonth +"." + settings.family.childs[i].year));
                    }else{
                        temp.childs[i].birthday = null;
                    }
                }
            }
            var petsLength = settings.family.pets.length;
            for(var i = 0; i < petsLength; i++){
                if(temp.pets[i] && !temp.pets[i].name){
                    //temp.pets.splice(i,1);
                }
            }

            userClient.updateFamily(temp);

            settings.isFamilyError = false;
            settings.isFamilyResult = true;
        };

        settings.isInterestsError = false;
        settings.isInterestsResult = false;
        settings.updateInterests = function(){
            var temp = new com.vmesteonline.be.thrift.UserInterests();
            temp.job = settings.interests.job;
            temp.userInterests = settings.interests.userInterests;
            userClient.updateInterests(temp);

            settings.isInterestsError = false;
            settings.isInterestsResult = true;
        };

        settings.childAdd = function(event){
            event.preventDefault();

            var newChild = new com.vmesteonline.be.thrift.Children();
            newChild.name = " ";
            var nowYear = new Date();
            nowYear = nowYear.getFullYear();
            newChild.birthday = Date.parse(getCorrectDate('15.01.'+nowYear));

            var birthDate = new Date(newChild.birthday);
            //newChild.month = ""+birthDate.getMonth();
            newChild.month = "";

            if(newChild.length == 1)
                newChild.month = "0"+newChild.month;

            //newChild.year = birthDate.getFullYear();
            newChild.year = "";


            if(settings.family == null){
                settings.family = new com.vmesteonline.be.thrift.UserFamily();
            }
            if(settings.family.childs == null){
                settings.family.childs= [];
            }

            settings.family.childs.length == 0 ?
            settings.family.childs[0] = newChild :
            settings.family.childs.push(newChild);

        };
        settings.removeChild = function(childName){
            var childsLength = settings.family.childs.length;
            for(var i = 0; i < childsLength; i++){
                if(settings.family.childs[i].name == childName) {
                    settings.family.childs.splice(i,1);
                }

            }
        };
        settings.petAdd = function(event){
            event.preventDefault();

            var newPet = new com.vmesteonline.be.thrift.Pet();
            newPet.name = " ";
            newPet.type = "0";

            if(settings.family == null){
                settings.family = new com.vmesteonline.be.thrift.UserFamily();
            }
            if(settings.family.pets == null){
                settings.family.pets= [];
            }

            settings.family.pets.length == 0 ?
                settings.family.pets[0] = newPet :
                settings.family.pets.push(newPet);
        };
        settings.removePet = function(petName){
            var petsLength = settings.family.pets.length;
            for(var i = 0; i < petsLength; i++){
                if(settings.family.pets[i].name == petName) {
                    settings.family.pets.splice(i,1);
                }

            }
        };

        settings.passwChange = false;
        settings.changePassw = function(){
            settings.passwChange = true;
        };

        /*(settings.userInfo.birthday != 0) ?
        settings.birthday = settings.userInfo.birthday :
        settings.birthday = "";*/

        $('#settings-input-3').datepicker({changeMonth:true, changeYear:true,dateFormat: "dd.mm.yy",yearRange:'c-100:+c'});
        $.datepicker.setDefaults($.datepicker.regional['ru']);

        angular.element($('.settings')).css({'min-height': $(window).height()-125});

        $('.ng-cloak').removeClass('ng-cloak');

        var href = document.location.href;
        var hrefInd = href.indexOf("/",9);
        $('input[name="redirect_uri"]').val(href.substring(0,hrefInd)+"/oauth");

    };

module.exports = [ '$rootScope','$scope', settingsCtrl ];
},{}],"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\talks.js":[function(require,module,exports){

var talksCtrl = function($rootScope) {
        /*
        * при работе с обсждениями нужно учесть следующее:
        * есть три типа сообщения :
        * 1) топик. На странице обсуждения может быть только один. Его дети
        * это сообщения первого уровня. Его дети всегда открыты, поэтому у него
        * нет контрола плюс-минус. Страница топика загружается в методе showFullTalk
        * через topicId который передается в функцию при вызове
        * Хранится в объекте talk.fullTalkTopic.
        *
        * 2) Сообщение первого уровня. Берутся через getFirstLevelMessages. Изначально
        * все потомки скрыты и не подгружены. При первом нажатии на контрол плюс-минус
        * подгружаются, потом просто переключается show-hide. ParentId у таких сообщений
        * равен 0. Внимание! : ParentId передается в getFirstLevelMessages через lastLoadedId.        *
        * У каждого сообщения первого уровня есть свой массив сообщений 3го типа.
        * Хранятся в массиве talk.fullTalkFirstMessages.
        *
        * 3) Просто сообщение. Береутся через getMessages(). Через параметр lastLoadedId передается
        * id последнего загруженного простого сообщения, для подгрузки. У каждого простого сообщения
        * есть offset, который задается на БЕ. offset'ы определяют вложенность сообщений и за счет них
        * создается древовидная структура форума.
        * Хранятся в двумерном массиве talk.fullTalkMessages[firstMessage.id][]
        *
        *
        * Есть следующие типы контролов, реализованные для разных типов сообщений:
        * 1) showAnswerInput : реализует клик на "Ответить", показвает поле для отправки
        * сообщения.
        * 2) addMessage: клик на "Отправить", создает и отображает новое сообщение
        * 3) toggleTree: контрол "плюс-минус", скрвает-показвает внутренние сообщения этого
        * сообщения.
        * */
            $rootScope.setTab(2);
            var talk = this;

            talk.attachId = "00";
            initFancyBox($('.talks'));

            $rootScope.base.showAllGroups();
            $rootScope.base.isFooterBottom = false;

            $rootScope.base.createTopicIsHide = true;

            talk.isTalksLoaded = false;
            talk.groups = userClientGroups;

            talk.message = {};
            talk.message.content = talk.message.default = TEXT_DEFAULT_3;
            talk.subject = TEXT_DEFAULT_4;

            $rootScope.base.bufferSelectedGroup = talk.selectedGroup =
            $rootScope.currentGroup = userClientGroups[3];

            $rootScope.currentRubric = null;

            $rootScope.base.initStartParamsForCreateTopic(talk);

            talk.isTalk = true;

            talk.fullTalkTopic = {};
            talk.fullTalkTopic.answerInputIsShow = false;
            talk.fullTalkMessages = [];
            talk.fullTalkFirstMessages = [];

            talk.commentText = TEXT_DEFAULT_2;
            var fullTalkFirstMessagesLength,
                talkId;

            /*if(!$rootScope.importantIsLoadedFromTop)
            $rootScope.importantTopics = messageClient.getImportantNews($rootScope.currentGroup.id);
            $rootScope.importantIsLoadedFromTop = false;*/

            talk.topics = messageClient.getTopics(talk.selectedGroup.id, 0, 0, 0, 1000).topics;

            initTalks();

            if (!talk.topics) talk.topics = [];

            $rootScope.selectGroupInDropdown_talks = function(groupId){
                talk.selectedGroup = $rootScope.base.bufferSelectedGroup = selectGroupInDropdown(groupId);
            };

        function initTalks(){
            var topicLength;
            talk.topics ? topicLength = talk.topics.length : topicLength = 0;

            for(var i = 0; i < topicLength;i++){
                talk.topics[i].lastUpdateEdit = getTiming(talk.topics[i].lastUpdate);
                talk.topics[i].label = getLabel(talk.groups,talk.topics[i].groupType);
                talk.topics[i].tagColor = getTagColor(talk.topics[i].label);

                if(talk.topics[i].message.important == 1){
                    talk.topics[i].message.importantText = 'Снять метку "Важное"';
                }else{
                    talk.topics[i].message.importantText = 'Пометить как "Важное"';
                }
            }
        }

        $rootScope.talksChangeGroup = function(groupId){

            talk.topics = messageClient.getTopics(groupId,0,0,0,1000).topics;

            if(talk.topics) {
                initTalks();
            }

        };

    talk.selRubricName = "Общее";
    talk.selectRubricNew = function(rubric){
        if(rubric) {
            talk.selRubricName = rubric.visibleName;
        }else{
            talk.selRubricName = "Общее";
            $rootScope.currentRubric = {};
            $rootScope.currentRubric.id = 0;
        }

        var rubricsLength = userClientRubrics.length;

        for(var i = 0; i < rubricsLength; i++){
            if(rubric.id == userClientRubrics[i].id){
                $rootScope.currentRubric = userClientRubrics[i];
            }
        }

    };

        $('.ng-cloak').removeClass('ng-cloak');

    };

module.exports = [ '$rootScope', talksCtrl ];
},{}],"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\talksSingle.js":[function(require,module,exports){

var talksSingleCtrl = function($rootScope,$stateParams){

        $rootScope.base.isFooterBottom = false;

        var talk = this,
            fullTalkMessagesLength,
            talkId = $stateParams.talkId;

        $rootScope.base.lastLoadedId = 0;
        $rootScope.base.isEarliestMessages = false;
        $rootScope.base.endOfLoaded = false;

        talk.attachId = "00";
        talk.selectedGroup = getDefaultGroup($rootScope.base.groups);//$rootScope.currentGroup;

        /*if(!$rootScope.importantIsLoadedFromTop)
            $rootScope.importantTopics = messageClient.getImportantNews($rootScope.currentGroup.id);
        $rootScope.importantIsLoadedFromTop = false;*/

    //console.log('0',talk.selectedGroup,getDefaultGroup($rootScope.base.groups));
        talk.topics = messageClient.getTopics(talk.selectedGroup.id, 0, 0, 0, 1000).topics;
        talk.fullTalkTopic = {};
        talk.fullTalkMessages = {};
        talk.fullTalkFirstMessages = [];
        talk.groups = userClientGroups;

        talk.isTalk = true;

        $rootScope.base.initStartParamsForCreateMessage(talk);

        var showFullTalk = function(talk,talkOutsideId){

            initFancyBox($('.talks-single'));
            var topicLength;
            talk.topics ? topicLength = talk.topics.length : topicLength = 0;

            var talkId = talkOutsideId;
            for(var i = 0; i < topicLength; i++){
                if(talkId == talk.topics[i].id){
                    talk.fullTalkTopic = talk.topics[i];
                    talk.fullTalkTopic.rubric = getTopicRubric(talk.fullTalkTopic);
                    if(!talk.fullTalkTopic.rubric) talk.fullTalkTopic.selRubricName = "Общее";

                    talk.fullTalkTopic.selectRubricNew = function(rubric){
                        if(rubric) {
                            talk.fullTalkTopic.selRubricName = rubric.visibleName;
                        }else{
                            talk.fullTalkTopic.selRubricName = "Общее";
                            $rootScope.currentRubric = {};
                            $rootScope.currentRubric.id = 0;
                        }
                        var rubricsLength = userClientRubrics.length;

                        for(var i = 0; i < rubricsLength; i++){
                            if(rubric.id == userClientRubrics[i].id){
                                $rootScope.currentRubric = userClientRubrics[i];
                            }
                        }

                        console.log('talk-single',$rootScope.currentRubric);

                    };

                    $rootScope.base.initStartParamsForCreateTopic(talk.fullTalkTopic);

                    talk.fullTalkTopic.isTalk = true;
                    talk.fullTalkTopic.message.createdEdit = getTiming(talk.fullTalkTopic.message.created);
                    talk.fullTalkTopic.label = getLabel(talk.groups,talk.fullTalkTopic.groupType);
                    talk.fullTalkTopic.tagColor = getTagColor(talk.fullTalkTopic.label);

                    if(talk.fullTalkTopic.message.important == 1){
                        talk.fullTalkTopic.message.importantText = 'Снять метку "Важное"';
                    }else{
                        talk.fullTalkTopic.message.importantText = 'Пометить как "Важное"';
                    }
                }
            }

            if (talk.fullTalkTopic.poll != null) {
                setPollEditNames(talk.fullTalkTopic.poll);
                talk.fullTalkTopic.metaType = "poll";
            } else {
                talk.fullTalkTopic.metaType = "message";
            }

            talk.fullTalkFirstMessages = messageClient.getFirstLevelMessages(talkId, talk.selectedGroup.id, 1, $rootScope.base.lastLoadedId, 0, 10).messages;

            $rootScope.base.lastLoadedId = $rootScope.base.initFirstMessages(talk.fullTalkFirstMessages);

            $rootScope.base.isTalkTitles = false;
            $rootScope.base.mainContentTopIsHide = true;
            $rootScope.base.createTopicIsHide = true;

        };

        showFullTalk(talk,talkId);

        var initFlagsTopic = [];
        talk.showTopicAnswerInput = function(event,fullTalkTopic){
            event.preventDefault();

            talk.answerShow = true;

            if(!initFlagsTopic[fullTalkTopic.id]) {
                initFlagsTopic[fullTalkTopic.id] = true;
            }

            talk.fullTalkTopic.answerInputIsShow ?
                talk.fullTalkTopic.answerInputIsShow = false :
                talk.fullTalkTopic.answerInputIsShow = true ;
        };

        var initFlagsMessage = [];
        talk.showMessageAnswerInput = function(event,fullTalkTopic,firstMessage,message){
            event.preventDefault();
            var attachId;

            if(!message){
                // если это сообщение первого уровня
                firstMessage.isTalk = true;
                //firstMessage.isEdit = false;

                attachId = fullTalkTopic.id+'-'+firstMessage.id;

                if(!talk.fullTalkFirstMessages) talk.fullTalkFirstMessages = messageClient.getFirstLevelMessages(talkId,talk.selectedGroup.id,1,0,0,1000).messages;
                var fullTalkFirstMessagesLength = talk.fullTalkFirstMessages.length;

                $rootScope.base.initStartParamsForCreateMessage(firstMessage);

                firstMessage.answerInputIsShow ?
                    firstMessage.answerInputIsShow = false :
                    firstMessage.answerInputIsShow = true;


            }else{
                // если простое сообщение
                message.isTalk = true;
                //message.isEdit = false;

                attachId = fullTalkTopic.id+'-'+message.id;

                if(!talk.fullTalkMessages[firstMessage.id]) talk.fullTalkMessages[firstMessage.id] = messageClient.getMessages(talkId,talk.selectedGroup.id,1,firstMessage.id,0,1000).messages;
                var  fullTalkMessagesLength = talk.fullTalkMessages[firstMessage.id].length;

                $rootScope.base.initStartParamsForCreateMessage(message);
                message.answerInputIsShow ?
                    message.answerInputIsShow = false :
                    message.answerInputIsShow = true;

            }

            if(!initFlagsMessage[attachId]) {
                //initAttachImage($('#attachImage-' + attachId), $('#attach-area-' + attachId));
                //initAttachDoc($('#attachDoc-' + attachId), $('#attach-doc-area-' + attachId));

                initFlagsMessage[attachId] = true;
            }
        };

        talk.toggleTreeFirstMessage = function(event,firstMessage){
            event.preventDefault();

            firstMessage.isTreeOpen ?
                firstMessage.isTreeOpen = false :
                firstMessage.isTreeOpen = true ;


            // --------

            talk.fullTalkMessages[firstMessage.id] = messageClient.getMessages(talkId,talk.selectedGroup.id,1,firstMessage.id,0,1000).messages;
            talk.fullTalkMessages[firstMessage.id] ?
                fullTalkMessagesLength = talk.fullTalkMessages[firstMessage.id].length:
                fullTalkMessagesLength = 0;
            if(talk.fullTalkMessages[firstMessage.id] === null) talk.fullTalkMessages[firstMessage.id] = [];

            for(var i = 0; i < fullTalkMessagesLength; i++){
                talk.fullTalkMessages[firstMessage.id][i].answerInputIsShow = false;
                talk.fullTalkMessages[firstMessage.id][i].isTreeOpen = true;
                talk.fullTalkMessages[firstMessage.id][i].isOpen = true;
                talk.fullTalkMessages[firstMessage.id][i].isParentOpen = true;
                talk.fullTalkMessages[firstMessage.id][i].createdEdit = getTiming(talk.fullTalkMessages[firstMessage.id][i].created);
                talk.fullTalkMessages[firstMessage.id][i].commentText = TEXT_DEFAULT_2;

            }

        };

        talk.toggleTree = function(event,message,firstMessage){
            event.preventDefault();

            if(!talk.fullTalkMessages[firstMessage.id]) talk.fullTalkMessages[firstMessage.id] = messageClient.getMessages(talkId,talk.selectedGroup.id,1,firstMessage.id,0,1000).messages;
            var fullTalkMessagesLength = talk.fullTalkMessages[firstMessage.id].length;

            message.isTreeOpen ?
                message.isTreeOpen = false :
                message.isTreeOpen = true ;

            var afterCurrentIndex = false,
                nextMessageOnCurrentLevel = false,
                loopMessageOffset,
                parentOpenStatus,
                areAllMyParentsTreeOpen = [],
                checkAreAllMyParentsTreeOpen = true,
                beginOffset = message.offset,
                parentOpenStatusArray = [];

            for(var i = 0; i < fullTalkMessagesLength; i++){
                loopMessageOffset = talk.fullTalkMessages[firstMessage.id][i].offset;

                if(afterCurrentIndex && !nextMessageOnCurrentLevel
                    && message.offset < loopMessageOffset){

                    areAllMyParentsTreeOpen[loopMessageOffset] = true;

                    if(loopMessageOffset - message.offset == 1){
                        //если это непосредственный потомок

                        talk.fullTalkMessages[firstMessage.id][i].isOpen ?
                            talk.fullTalkMessages[firstMessage.id][i].isOpen = false :
                            talk.fullTalkMessages[firstMessage.id][i].isOpen = true ;

                        parentOpenStatusArray[loopMessageOffset] = true;
                        parentOpenStatus = talk.fullTalkMessages[firstMessage.id][i].isOpen;

                        if (!talk.fullTalkMessages[firstMessage.id][i].isTreeOpen){
                            areAllMyParentsTreeOpen[loopMessageOffset] = false;
                        }
                    }else{
                        // если это птомки потомка

                        checkAreAllMyParentsTreeOpen = true;
                        for(var j = beginOffset; j < loopMessageOffset; j++){
                            // проверяем нет ли у кого в предках isTreeOpen = false
                            if(areAllMyParentsTreeOpen[j] == false){
                                checkAreAllMyParentsTreeOpen = false;
                            }
                        }
                        parentOpenStatus && checkAreAllMyParentsTreeOpen ?
                            talk.fullTalkMessages[firstMessage.id][i].isOpen = true :
                            talk.fullTalkMessages[firstMessage.id][i].isOpen = false ;

                        if (!talk.fullTalkMessages[firstMessage.id][i].isTreeOpen){
                            // если у кого-то из предков не открыто дерево
                            areAllMyParentsTreeOpen[loopMessageOffset] = false;
                        }

                        parentOpenStatusArray[loopMessageOffset] = true;
                    }
                }

                if (afterCurrentIndex && loopMessageOffset == message.offset){
                    nextMessageOnCurrentLevel = true;
                    break;
                }
                if(message.id == talk.fullTalkMessages[firstMessage.id][i].id){
                    afterCurrentIndex = true;
                }
            }
        };

        var buff,
            lastLoadedIdFF;
        talk.addMoreItems = function(){
            var temp = messageClient.getFirstLevelMessages(talkId,talk.selectedGroup.id,1,$rootScope.base.lastLoadedId,0,10),
                buff = temp.messages;
            if(buff) {
                var buffLength = buff.length;

                if(buffLength != 0) {

                    $rootScope.base.lastLoadedId = buff[buffLength - 1].id;

                    if(lastLoadedIdFF != $rootScope.base.lastLoadedId) {
                        $rootScope.base.initFirstMessages(buff);
                        talk.fullTalkFirstMessages = talk.fullTalkFirstMessages.concat(buff);
                    }

                    lastLoadedIdFF = $rootScope.base.lastLoadedId;

                }
            }else{
                $rootScope.base.endOfLoaded = true;
            }

        };


        $('.ng-cloak').removeClass('ng-cloak');

    };

module.exports = [ '$rootScope','$stateParams', talksSingleCtrl ];
},{}],"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\unconfirmed.js":[function(require,module,exports){

var unconfirmedCtrl =  function($rootScope) {
    $rootScope.base.isFooterBottom = true;
    $rootScope.base.mainContentTopIsHide = true;
    $rootScope.base.hideSidebar = true;

    var ctrl = this;
    ctrl.user = userClient.getShortUserInfo();
    ctrl.isErrorConfirm = false;

    ctrl.unconfLogin = function(){

        var isConfirm = userClient.confirmUserAddress(ctrl.code);
        console.log(isConfirm);
        if(isConfirm){
            $rootScope.base.me.addressConfirmed = true;
        }else{
            ctrl.isErrorConfirm = true;
        }

    };

    angular.element($('.unconfirm')).css({'min-height': $(window).height()-105});

    $('.ng-cloak').removeClass('ng-cloak');

};

module.exports = [ '$rootScope', unconfirmedCtrl ];
},{}],"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\wall.js":[function(require,module,exports){

var wallCtrl = function($rootScope,$state) {

    var lenta = this;

    /**/

    lenta.isGroupsInMessShow = false;
    lenta.isRubricsInMessShow = false;
    lenta.isOpenMessageBar = false;

    lenta.showGroups = function(){
        lenta.isGroupsInMessShow ? lenta.isGroupsInMessShow = false : lenta.isGroupsInMessShow = true
    };

    lenta.selectGroupNew = function(group){
        lenta.isGroupsInMessShow = false;
        lenta.isCreateMessageGroupError = false;

        //lenta.selGroupName = group.visibleName;
        $rootScope.base.selectGroupInDropdown(group.id,lenta);
    };

    lenta.showRubrics = function(){
        lenta.isRubricsInMessShow ? lenta.isRubricsInMessShow = false : lenta.isRubricsInMessShow = true
    };

    lenta.selectRubricNew = function(rubric,ctrl){
        lenta.isRubricsInMessShow = false;
        lenta.isCreateMessageRubricError = false;

        if(rubric) {
            $rootScope.selRubricName = rubric.visibleName;
        }else{
            $rootScope.selRubricName = "Общее";
            $rootScope.currentRubric = {};
            $rootScope.currentRubric.id = 0;
        }
        //$rootScope.base.selectRubricInDropdown(rubric.id,lenta);
        var rubricsLength = userClientRubrics.length,
            selectedRubric;

        //if(!ctrl.isEdit) {
            for (var i = 0; i < rubricsLength; i++) {
                if (rubric.id == userClientRubrics[i].id) {
                    $rootScope.currentRubric = userClientRubrics[i];
                }
            }
        //}

        if(ctrl){
            rubric ? ctrl.selRubricName = rubric.visibleName : ctrl.selRubricName = "Общее";
        }

        //$rootScope.base.bufferSelectedGroup = selectGroupInDropdown(groupId);

        //ctrl.selectedGroup = $rootScope.base.bufferSelectedGroup;
    };

    //$rootScope.currentRubric.id = 0;

    lenta.closeInput = function(){
        lenta.isCreateMessageError = false;
        lenta.isCreateMessageGroupError = false;
        lenta.isCreateMessageRubricError = false;

        lenta.isOpenMessageBar = false;
        lenta.isGroupsInMessShow = false;
        lenta.isRubricsInMessShow = false;
        lenta.selectedGroup = lenta.selGroupName = $rootScope.selRubricName = $rootScope.currentRubric = null;
        lenta.message.content = TEXT_DEFAULT_1;
    };

    lenta.isCreateMessageError = true;
    lenta.createMessageErrorText = "Вы не указали группу";

    /**/

    $('.ng-cloak').removeClass('ng-cloak');
        $rootScope.setTab(1);
        $rootScope.base.showAllGroups();
        $rootScope.base.isFooterBottom = false;

        var lastLoadedId = 0,
            loadedLength = 10;

        var len = userClientGroups.length;
        lenta.isCreateNewsShow = [];
        for(var i = 0; i < len; i++){
            lenta.isCreateNewsShow[userClientGroups[i].id] = false;
        }
        //lenta.isCreateNewsShow[] = false;
        $rootScope.COMMENTS_DEFAULT_COUNT = 3;

        var ls_setInfo_groupId = localStorage.getItem('VO_setInfo_groupId'),
            currentGroup = userClientGroups[3];

        if(ls_setInfo_groupId){
            var groupsLength = userClientGroups.length;
            for (var i = 0; i < groupsLength; i++) {
                if (userClientGroups[i].id == ls_setInfo_groupId) {
                    currentGroup = userClientGroups[i];
                }
            }
            localStorage.removeItem('VO_setInfo_groupId');
        }

    lenta.selectedGroupInTop = $rootScope.currentGroup =
        $rootScope.base.bufferSelectedGroup = currentGroup;
    //console.log('lenta',$rootScope.currentGroup.id);

        /*if(!$rootScope.importantIsLoadedFromTop)
        $rootScope.importantTopics = messageClient.getImportantNews($rootScope.currentGroup.id);
        $rootScope.importantIsLoadedFromTop = false;*/

        lenta.attachId = "0";
        $rootScope.base.initStartParamsForCreateTopic(lenta);
        lenta.selectedGroup = null;

        lenta.message = {};

        lenta.message.content = lenta.message.default = TEXT_DEFAULT_1;

        $rootScope.wallChangeRubric = function(rubricId){

            lenta.wallItems = messageClient.getWallItems(currentGroup.id, rubricId,0, loadedLength);

            if(lenta.wallItems.length) {
                initWallItem(lenta.wallItems);

                lastLoadedId = lenta.wallItems[lenta.wallItems.length-1].topic.id;
                lastLoadedIdFF = null;
            }

        };

        if($state.current.rubricId) {
            $rootScope.wallChangeRubric($state.current.rubricId);
            $state.current.rubricId = null;
        }else{
            $rootScope.currentRubric = {};
        }

        lenta.wallItems = messageClient.getWallItems($rootScope.base.bufferSelectedGroup.id,$rootScope.currentRubric.id,0,loadedLength);

        var wallItemsLength;
        lenta.wallItems ? wallItemsLength = lenta.wallItems.length :
            wallItemsLength = 0;

        if(wallItemsLength != 0) lastLoadedId = lenta.wallItems[wallItemsLength-1].topic.id;

        initWallItem(lenta.wallItems);

        $rootScope.selectGroupInDropdown_lenta = function(groupId){
            //lenta.selectedGroup = $rootScope.base.bufferSelectedGroup = selectGroupInDropdown(groupId);
            $rootScope.base.bufferSelectedGroup = selectGroupInDropdown(groupId);
        };

        lenta.goToAnswerInput = function(event){
            event.preventDefault();
        };

        var initFlagsArray = [];
        lenta.showAnswerInput = function(event,wallItem,wallMessage){
            event.preventDefault();

            /*wallItem.answerShow ?
                wallItem.answerShow = false :*/
                wallItem.answerShow = true ;
                wallItem.isFocus = true ;

            if(wallMessage){
                var authorName;
                wallMessage.userInfo ?
                    authorName = wallMessage.userInfo.firstName :
                    authorName = wallMessage.authorName.split(' ')[0];
                wallItem.commentText = authorName+", ";
            }else{
                wallItem.commentText = "";
            }

            if(!initFlagsArray[wallItem.topic.id]) {
                // инифицализацмю AttachImage нужно делать только один раз для каждого сообщения
                initFlagsArray[wallItem.topic.id] = true;
            }

        };

        $rootScope.wallChangeGroup = function(groupId){

            lenta.wallItems = messageClient.getWallItems(groupId, $rootScope.currentRubric.id,0, loadedLength);

            if(lenta.wallItems.length) {
                initWallItem(lenta.wallItems);

                lastLoadedId = lenta.wallItems[lenta.wallItems.length-1].topic.id;
                lastLoadedIdFF = null;
            }

        };

        function initWallItem(wallItems){
            wallItemsLength = wallItems.length;
            for(var i = 0; i < wallItemsLength; i++){

                $rootScope.base.initStartParamsForCreateMessage(wallItems[i]);

                $rootScope.base.initStartParamsForCreateTopic(wallItems[i].topic);

                //  wallItems[i].topic.message.groupId сейчас не задана почему-то
                wallItems[i].label = getLabel($rootScope.base.groups,wallItems[i].topic.groupType);

                wallItems[i].tagColor = getTagColor(wallItems[i].label);

                wallItems[i].isOpen = false;

                if(wallItems[i].topic.message.important == 1){
                    wallItems[i].topic.message.importantText = 'Снять метку "Важное"';
                }else{
                    wallItems[i].topic.message.importantText = 'Пометить как "Важное"';
                }

                if(wallItems[i].topic.message.type == 1){

                    wallItems[i].topic.lastUpdateEdit = getTiming(wallItems[i].topic.lastUpdate);

                }else if(wallItems[i].topic.message.type == 5){

                    wallItems[i].topic.message.createdEdit = getTiming(wallItems[i].topic.message.created);
                    wallItems[i].topic.authorName = getAuthorName(wallItems[i].topic.userInfo);
                    wallItems[i].topic.metaType = "message";
                    wallItems[i].topic.rubric = getTopicRubric(wallItems[i].topic);

                    var mesLen;
                    wallItems[i].messages ?
                        mesLen = wallItems[i].messages.length:
                        mesLen = 0;

                    for(var j = 0; j < mesLen; j++){
                        wallItems[i].messages[j].createdEdit = getTiming(wallItems[i].messages[j].created);
                        wallItems[i].messages[j].authorName = getAuthorName(wallItems[i].messages[j].userInfo);
                        wallItems[i].messages[j].isEdit = false;

                        $rootScope.base.initStartParamsForCreateMessage(wallItems[i].messages[j]);
                    }

                    (mesLen >= $rootScope.COMMENTS_DEFAULT_COUNT) ?
                    wallItems[i].bufferMessages = wallItems[i].messages.slice(mesLen-$rootScope.COMMENTS_DEFAULT_COUNT):
                        wallItems[i].bufferMessages = wallItems[i].messages;

                    if(wallItems[i].topic.poll != null){
                        //значит это опрос
                        setPollEditNames(wallItems[i].topic.poll);

                        wallItems[i].topic.metaType = "poll";
                    }
                }
            }
        }

        lenta.toggleComments = function(event,wallItem){
            event.preventDefault();

            var mesLen = wallItem.messages.length;

            if(wallItem.isOpen){
                wallItem.isOpen = false;

                (mesLen >= $rootScope.COMMENTS_DEFAULT_COUNT) ?
                    wallItem.bufferMessages = wallItem.messages.slice(mesLen-$rootScope.COMMENTS_DEFAULT_COUNT):
                    wallItem.bufferMessages = wallItem.messages;

                //wallItem.bufferMessages = wallItem.messages.slice(mesLen-lenta.COMMENTS_DEFAULT_COUNT);
            }else{
                wallItem.isOpen = true;
                wallItem.bufferMessages = wallItem.messages;
            }
        };

        var lastLoadedIdFF;
        lenta.addMoreItems = function(){
            //lastLoadedIdFF = lastLoadedId;
            console.log('addMoreItems',lastLoadedId,loadedLength,$rootScope.base.bufferSelectedGroup.id,$rootScope.currentRubric);
            if(wallItemsLength == 10) {
                var buff = messageClient.getWallItems($rootScope.base.bufferSelectedGroup.id,$rootScope.currentRubric.id, lastLoadedId, loadedLength);
                if (buff) {

                    var buffLength = buff.length;

                    if (buffLength != 0) {

                        lastLoadedId = buff[buffLength - 1].topic.id;

                        if(lastLoadedIdFF != lastLoadedId) {
                            initWallItem(buff);
                            lenta.wallItems = lenta.wallItems.concat(buff);
                        }

                        lastLoadedIdFF = lastLoadedId;

                    }
                }
            }
        };


    $rootScope.initCreateTopic(lenta);

        initFancyBox($('.forum'));

    };

module.exports = [ '$rootScope','$state', wallCtrl ];
},{}],"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\controllers\\wallSingle.js":[function(require,module,exports){

var wallSingleCtrl = function($rootScope, $stateParams){
        var wallSingle = this;

        $rootScope.base.mainContentTopIsHide = true;
        $rootScope.base.isFooterBottom = false;
        initFancyBox($('.lenta-item'));

        // временно, нужна функция getWallItem(topicId)
        $rootScope.currentGroup.id = getDefaultGroup($rootScope.base.groups).id;
        var wallItems = messageClient.getWallItems($rootScope.currentGroup.id,0,0,1000),
        wallItemsLength = wallItems.length;

    //console.log('0',wallItems,$stateParams.topicId);
        for(var i = 0; i < wallItemsLength; i++){
            if(wallItems[i].topic.id == $stateParams.topicId){
                wallSingle.wallItem = wallItems[i];
                wallSingle.wallItem.topic.isWallSingle = true;
            }
        }

    //console.log('11',wallSingle.wallItem,$rootScope.currentGroup.id);
        $rootScope.base.initStartParamsForCreateMessage(wallSingle.wallItem);
        $rootScope.base.initStartParamsForCreateTopic(wallSingle.wallItem.topic);

/*
        wallSingle.wallItem.commentText = TEXT_DEFAULT_2;
        wallSingle.wallItem.answerShow = false;
        wallSingle.wallItem.isFocus = false;
        wallSingle.wallItem.isCreateCommentError = false;
*/

        if(wallSingle.wallItem.topic.message.important == 1){
            wallSingle.wallItem.topic.message.importantText = 'Снять метку "Важное"';
        }else{
            wallSingle.wallItem.topic.message.importantText = 'Пометить как "Важное"';
        }

        //  lenta.wallItems[i].topic.message.groupId сейчас не задана почему-то
        wallSingle.wallItem.label = getLabel(userClientGroups,wallSingle.wallItem.topic.groupType);

        wallSingle.wallItem.tagColor = getTagColor(wallSingle.wallItem.label);

        if(wallSingle.wallItem.topic.message.type == 1){

            wallSingle.wallItem.topic.lastUpdateEdit = getTiming(wallSingle.wallItem.topic.lastUpdate);

        }else if(wallSingle.wallItem.topic.message.type == 5){

            wallSingle.wallItem.topic.message.createdEdit = getTiming(wallSingle.wallItem.topic.message.created);
            wallSingle.wallItem.topic.authorName = getAuthorName(wallSingle.wallItem.topic.userInfo);
            wallSingle.wallItem.topic.metaType = "message";

            var mesLen;
            wallSingle.wallItem.messages ?
                mesLen = wallSingle.wallItem.messages.length:
                mesLen = 0;

            for(var j = 0; j < mesLen; j++){
                wallSingle.wallItem.messages[j].createdEdit = getTiming(wallSingle.wallItem.messages[j].created);
                wallSingle.wallItem.messages[j].authorName = getAuthorName(wallSingle.wallItem.messages[j].userInfo);
                wallSingle.wallItem.messages[j].isEdit = false;

                $rootScope.base.initStartParamsForCreateMessage(wallSingle.wallItem.messages[j]);
            }


            if(wallSingle.wallItem.topic.poll != null){
                //значит это опрос
                setPollEditNames(wallSingle.wallItem.topic.poll);

                wallSingle.wallItem.topic.metaType = "poll";
            }
        }

        var initFlagsArray = [];
        wallSingle.showAnswerInput = function(event,wallItem,wallMessage){
            event.preventDefault();

            /*wallItem.answerShow ?
             wallItem.answerShow = false :*/
            wallItem.answerShow = true ;
            wallItem.isFocus = true ;

            if(wallMessage){
                var authorName;
                wallMessage.userInfo ?
                    authorName = wallMessage.userInfo.firstName :
                    authorName = wallMessage.authorName.split(' ')[0];
                wallItem.commentText = authorName+", ";
            }else{
                wallItem.commentText = "";
            }

            if(!initFlagsArray[wallItem.topic.id]) {
                // инифицализацмю AttachImage нужно делать только один раз для каждого сообщения
                //initAttachImage($('#attachImage-' + wallItem.topic.id), $('#attach-area-' + wallItem.topic.id));
                //initAttachDoc($('#attachDoc-' + wallItem.topic.id), $('#attach-doc-area-' + wallItem.topic.id));
                initFlagsArray[wallItem.topic.id] = true;
            }

        };

        $('.ng-cloak').removeClass('ng-cloak');
    };

module.exports = [ '$rootScope','$stateParams', wallSingleCtrl ];
},{}],"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\directives.js":[function(require,module,exports){
'use strict';

/* Directives */

angular.module('forum.directives', []).
  directive('ngHasfocus', function() {
        return function(scope, element, attrs) {

            scope.$watch(attrs.ngHasfocus, function (nVal, oVal) {
                if (nVal) {
                    element[0].focus();
                    if(scope.wallItem) {
                        setCaretToPos(element[0], scope.wallItem.commentText.length);
                    }else if(scope.ctrl){
                        scope.base.textareaFocus(scope.ctrl.message.content,scope.ctrl.message.default,scope.ctrl,true);
                    }
                }
            });

            element.bind('blur', function() {
                if(scope.wallItem){
                    scope.wallItem.isFocus = false;
                    scope.$apply(attrs.ngHasfocus + " = false");
                }
                //scope.$apply(attrs.ngShow + " = false");
            });

            element.bind('keydown', function (e) {
                if (e.which == 13)
                    scope.$apply(attrs.ngHasfocus + " = false");
            });
        }
    })
    .directive('button',function(){
        return {
            restrict : 'E',
            compile: function(element,attributes){
                element.addClass('btn');
                if(attributes.type == "submit"){
                    element.addClass('btn-primary');
                }
                if(attributes.size){
                    element.addClass('btn-'+attributes.size);
                }

            }
        }

    })
    .directive('pagination',function(){
        /*
        * <pagination num-pages="task.count" current-page="task.current" on-select-page="selectPage()"></pagination>
        * */
        return{
            template : '<div class="pagination">'+
                '<ul>'+
                '<li ng-class="{disabled: noPrevious()}"><a href="#" ng-click="selectPrevious()">Previous</a></li>'+
                '<li ng-repeat="page in pages" ng-class="{active : isActive(page)}"><a href="#" ng-click="selectPage(page)">{{page}}</a></li>'+
                '<li ng-class="{disabled: noNext()}"><a href="#" ng-click="selectNext()">Next</a></li>'+
                '</ul>'+
                '</div>',
            restrict:"E",
            scope : {
                numPages: "=",
                currentPage: "=",
                onSelectPage: "&"
            },
            replace: true,
            link: function(scope){
                scope.$watch('numPages',function(value){
                    scope.pages = [];
                    for(var i = 0; i <= value; i++){
                        scope.pages.push(i);
                    }
                    if(scope.currentPage > value){
                        scope.selectPage(value);
                    }
                });

                scope.isActive = function(page){
                    return scope.currentPage === page;
                };

                scope.selectPage = function(page){
                    if(!scope.isActive(page)){
                        scope.currentPage = page;
                        scope.onSelectPage({page : page});
                    }
                };

                scope.selectNext = function(){
                    if (!scope.noNext()){
                        scope.selectPage(scope.currentPage + 1);
                    }
                };
            }
        }
    })
	.directive('ngThumb', ['$window', function($window) {
        var helper = {
            support: !!($window.FileReader && $window.CanvasRenderingContext2D),
            isFile: function(item) {
                return angular.isObject(item) && item instanceof $window.File;
            },
            isImage: function(file) {
                var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        };

        return {
            restrict: 'A',
            template: '<canvas/>',
            link: function(scope, element, attributes) {
                if (!helper.support) return;

                var params = scope.$eval(attributes.ngThumb);

                if (!helper.isFile(params.file)) return;
                if (!helper.isImage(params.file)) return;

                var canvas = element.find('canvas');
                var reader = new FileReader();

                reader.onload = onLoadFile;
                reader.readAsDataURL(params.file);

                function onLoadFile(event) {
                    var img = new Image();
                    img.onload = onLoadImage;
                    img.src = event.target.result;
                }

                function onLoadImage() {
                    var width = params.width || this.width / this.height * params.height;
                    var height = params.height || this.height / this.width * params.width;
                    canvas.attr({ width: width, height: height });
                    canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);

                    //scope.$parent.fileBase64 = canvas[0].toDataURL();
                    console.log('dir',width,height);

                    scope.$parent.setLoadImage('url('+canvas[0].toDataURL()+')');

                }
            }
        };
    }]);
;



// functions

function setSelectionRange(input, selectionStart, selectionEnd) {
    if (input.setSelectionRange) {
        input.focus();
        input.setSelectionRange(selectionStart, selectionEnd);
    }
    else if (input.createTextRange) {
        var range = input.createTextRange();
        range.collapse(true);
        range.moveEnd('character', selectionEnd);
        range.moveStart('character', selectionStart);
        range.select();
    }
}

function setCaretToPos (input, pos) {
    setSelectionRange(input, pos, pos);
}
},{}],"C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\services.js":[function(require,module,exports){
'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('forum.services', []).
    factory( '$counters', function() {
        return {
            getCounters : utilityClient.getCounters(),
            getTypeString : function (type){
                var typeString;

                switch (parseInt(type)){
                    case 0:
                        typeString = "Горячая вода";
                        break;
                    case 1:
                        typeString = "Холодная вода";
                        break;
                    case 2:
                        typeString = "Электричество(общий)";
                        break;
                    case 3:
                        typeString = "Электричество(ночь)";
                        break;
                    case 4:
                        typeString = "Электричество(день)";
                        break;
                    case 5:
                        typeString = "Газ";
                        break;
                    case 6:
                        typeString = "Другое";
                        break;
                }

                return typeString;
            }
        }
    });

},{}]},{},["C:\\workspace\\projects\\vonline-cs\\vonline-cs\\src\\main\\webapp\\static\\js\\app.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYW5ndWxhci1maWxlLXVwbG9hZC9kaXN0L2FuZ3VsYXItZmlsZS11cGxvYWQubWluLmpzIiwibm9kZV9tb2R1bGVzL2FuZ3VsYXItdWktcm91dGVyL3JlbGVhc2UvYW5ndWxhci11aS1yb3V0ZXIuanMiLCJzdGF0aWMvanMvYXBwLmpzIiwic3RhdGljL2pzL2NvbmZpZy5qcyIsInN0YXRpYy9qcy9jb250cm9sbGVycy9hYm91dC5qcyIsInN0YXRpYy9qcy9jb250cm9sbGVycy9hZHZlcnRzLmpzIiwic3RhdGljL2pzL2NvbnRyb2xsZXJzL2FkdmVydHNTaW5nbGUuanMiLCJzdGF0aWMvanMvY29udHJvbGxlcnMvYmFzZS5qcyIsInN0YXRpYy9qcy9jb250cm9sbGVycy9ibG9nLmpzIiwic3RhdGljL2pzL2NvbnRyb2xsZXJzL2J1c2luZXNzL2NhYmluZXQuanMiLCJzdGF0aWMvanMvY29udHJvbGxlcnMvYnVzaW5lc3MvZWRpdC5qcyIsInN0YXRpYy9qcy9jb250cm9sbGVycy9idXNpbmVzcy9zdGF0aXN0aWMuanMiLCJzdGF0aWMvanMvY29udHJvbGxlcnMvY2hhbmdlQXZhdGFyLmpzIiwic3RhdGljL2pzL2NvbnRyb2xsZXJzL2NvbnRhY3RzLmpzIiwic3RhdGljL2pzL2NvbnRyb2xsZXJzL2NvdW50ZXJzLmpzIiwic3RhdGljL2pzL2NvbnRyb2xsZXJzL2NvdW50ZXJzSGlzdG9yeS5qcyIsInN0YXRpYy9qcy9jb250cm9sbGVycy9kaWFsb2cuanMiLCJzdGF0aWMvanMvY29udHJvbGxlcnMvZGlhbG9ncy5qcyIsInN0YXRpYy9qcy9jb250cm9sbGVycy9pbXBvcnRhbnQuanMiLCJzdGF0aWMvanMvY29udHJvbGxlcnMvaW5kZXguanMiLCJzdGF0aWMvanMvY29udHJvbGxlcnMvbGVmdEJhci5qcyIsInN0YXRpYy9qcy9jb250cm9sbGVycy9tYWluQ29udGVudFRvcC5qcyIsInN0YXRpYy9qcy9jb250cm9sbGVycy9tYXBzLmpzIiwic3RhdGljL2pzL2NvbnRyb2xsZXJzL21vZGFsSW5zdGFuY2UuanMiLCJzdGF0aWMvanMvY29udHJvbGxlcnMvbmF2YmFyLmpzIiwic3RhdGljL2pzL2NvbnRyb2xsZXJzL25lYXJieS5qcyIsInN0YXRpYy9qcy9jb250cm9sbGVycy9uZWFyYnlTaW5nbGUuanMiLCJzdGF0aWMvanMvY29udHJvbGxlcnMvbmVpZ2hib3Vycy5qcyIsInN0YXRpYy9qcy9jb250cm9sbGVycy9wcm9maWxlLmpzIiwic3RhdGljL2pzL2NvbnRyb2xsZXJzL3J1YnJpY3MuanMiLCJzdGF0aWMvanMvY29udHJvbGxlcnMvcnVicmljc1NpbmdsZS5qcyIsInN0YXRpYy9qcy9jb250cm9sbGVycy9zZXRJbmZvLmpzIiwic3RhdGljL2pzL2NvbnRyb2xsZXJzL3NldHRpbmdzLmpzIiwic3RhdGljL2pzL2NvbnRyb2xsZXJzL3RhbGtzLmpzIiwic3RhdGljL2pzL2NvbnRyb2xsZXJzL3RhbGtzU2luZ2xlLmpzIiwic3RhdGljL2pzL2NvbnRyb2xsZXJzL3VuY29uZmlybWVkLmpzIiwic3RhdGljL2pzL2NvbnRyb2xsZXJzL3dhbGwuanMiLCJzdGF0aWMvanMvY29udHJvbGxlcnMvd2FsbFNpbmdsZS5qcyIsInN0YXRpYy9qcy9kaXJlY3RpdmVzLmpzIiwic3RhdGljL2pzL3NlcnZpY2VzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZvSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNySUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3REQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9HQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcFdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcFNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiEgMS42LjQgKi9cbiFmdW5jdGlvbigpe3ZhciBhPWFuZ3VsYXIubW9kdWxlKFwiYW5ndWxhckZpbGVVcGxvYWRcIixbXSk7YS5zZXJ2aWNlKFwiJHVwbG9hZFwiLFtcIiRodHRwXCIsXCIkcVwiLFwiJHRpbWVvdXRcIixmdW5jdGlvbihhLGIsYyl7ZnVuY3Rpb24gZChkKXtkLm1ldGhvZD1kLm1ldGhvZHx8XCJQT1NUXCIsZC5oZWFkZXJzPWQuaGVhZGVyc3x8e30sZC50cmFuc2Zvcm1SZXF1ZXN0PWQudHJhbnNmb3JtUmVxdWVzdHx8ZnVuY3Rpb24oYixjKXtyZXR1cm4gd2luZG93LkFycmF5QnVmZmVyJiZiIGluc3RhbmNlb2Ygd2luZG93LkFycmF5QnVmZmVyP2I6YS5kZWZhdWx0cy50cmFuc2Zvcm1SZXF1ZXN0WzBdKGIsYyl9O3ZhciBlPWIuZGVmZXIoKTt3aW5kb3cuWE1MSHR0cFJlcXVlc3QuX19pc1NoaW0mJihkLmhlYWRlcnMuX19zZXRYSFJfPWZ1bmN0aW9uKCl7cmV0dXJuIGZ1bmN0aW9uKGEpe2EmJihkLl9fWEhSPWEsZC54aHJGbiYmZC54aHJGbihhKSxhLnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKFwicHJvZ3Jlc3NcIixmdW5jdGlvbihhKXtlLm5vdGlmeShhKX0sITEpLGEudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsZnVuY3Rpb24oYSl7YS5sZW5ndGhDb21wdXRhYmxlJiZlLm5vdGlmeShhKX0sITEpKX19KSxhKGQpLnRoZW4oZnVuY3Rpb24oYSl7ZS5yZXNvbHZlKGEpfSxmdW5jdGlvbihhKXtlLnJlamVjdChhKX0sZnVuY3Rpb24oYSl7ZS5ub3RpZnkoYSl9KTt2YXIgZj1lLnByb21pc2U7cmV0dXJuIGYuc3VjY2Vzcz1mdW5jdGlvbihhKXtyZXR1cm4gZi50aGVuKGZ1bmN0aW9uKGIpe2EoYi5kYXRhLGIuc3RhdHVzLGIuaGVhZGVycyxkKX0pLGZ9LGYuZXJyb3I9ZnVuY3Rpb24oYSl7cmV0dXJuIGYudGhlbihudWxsLGZ1bmN0aW9uKGIpe2EoYi5kYXRhLGIuc3RhdHVzLGIuaGVhZGVycyxkKX0pLGZ9LGYucHJvZ3Jlc3M9ZnVuY3Rpb24oYSl7cmV0dXJuIGYudGhlbihudWxsLG51bGwsZnVuY3Rpb24oYil7YShiKX0pLGZ9LGYuYWJvcnQ9ZnVuY3Rpb24oKXtyZXR1cm4gZC5fX1hIUiYmYyhmdW5jdGlvbigpe2QuX19YSFIuYWJvcnQoKX0pLGZ9LGYueGhyPWZ1bmN0aW9uKGEpe3JldHVybiBkLnhockZuPWZ1bmN0aW9uKGIpe3JldHVybiBmdW5jdGlvbigpe2ImJmIuYXBwbHkoZixhcmd1bWVudHMpLGEuYXBwbHkoZixhcmd1bWVudHMpfX0oZC54aHJGbiksZn0sZn10aGlzLnVwbG9hZD1mdW5jdGlvbihiKXtiLmhlYWRlcnM9Yi5oZWFkZXJzfHx7fSxiLmhlYWRlcnNbXCJDb250ZW50LVR5cGVcIl09dm9pZCAwLGIudHJhbnNmb3JtUmVxdWVzdD1iLnRyYW5zZm9ybVJlcXVlc3R8fGEuZGVmYXVsdHMudHJhbnNmb3JtUmVxdWVzdDt2YXIgYz1uZXcgRm9ybURhdGEsZT1iLnRyYW5zZm9ybVJlcXVlc3QsZj1iLmRhdGE7cmV0dXJuIGIudHJhbnNmb3JtUmVxdWVzdD1mdW5jdGlvbihhLGMpe2lmKGYpaWYoYi5mb3JtRGF0YUFwcGVuZGVyKWZvcih2YXIgZCBpbiBmKXt2YXIgZz1mW2RdO2IuZm9ybURhdGFBcHBlbmRlcihhLGQsZyl9ZWxzZSBmb3IodmFyIGQgaW4gZil7dmFyIGc9ZltkXTtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBlKWc9ZShnLGMpO2Vsc2UgZm9yKHZhciBoPTA7aDxlLmxlbmd0aDtoKyspe3ZhciBpPWVbaF07XCJmdW5jdGlvblwiPT10eXBlb2YgaSYmKGc9aShnLGMpKX1hLmFwcGVuZChkLGcpfWlmKG51bGwhPWIuZmlsZSl7dmFyIGo9Yi5maWxlRm9ybURhdGFOYW1lfHxcImZpbGVcIjtpZihcIltvYmplY3QgQXJyYXldXCI9PT1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYi5maWxlKSlmb3IodmFyIGs9XCJbb2JqZWN0IFN0cmluZ11cIj09PU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChqKSxoPTA7aDxiLmZpbGUubGVuZ3RoO2grKylhLmFwcGVuZChrP2o6altoXSxiLmZpbGVbaF0sYi5maWxlTmFtZSYmYi5maWxlTmFtZVtoXXx8Yi5maWxlW2hdLm5hbWUpO2Vsc2UgYS5hcHBlbmQoaixiLmZpbGUsYi5maWxlTmFtZXx8Yi5maWxlLm5hbWUpfXJldHVybiBhfSxiLmRhdGE9YyxkKGIpfSx0aGlzLmh0dHA9ZnVuY3Rpb24oYSl7cmV0dXJuIGQoYSl9fV0pLGEuZGlyZWN0aXZlKFwibmdGaWxlU2VsZWN0XCIsW1wiJHBhcnNlXCIsXCIkdGltZW91dFwiLGZ1bmN0aW9uKGEsYil7cmV0dXJuIGZ1bmN0aW9uKGMsZCxlKXt2YXIgZj1hKGUubmdGaWxlU2VsZWN0KTtpZihcImlucHV0XCIhPT1kWzBdLnRhZ05hbWUudG9Mb3dlckNhc2UoKXx8XCJmaWxlXCIhPT0oZC5hdHRyKFwidHlwZVwiKSYmZC5hdHRyKFwidHlwZVwiKS50b0xvd2VyQ2FzZSgpKSl7Zm9yKHZhciBnPWFuZ3VsYXIuZWxlbWVudCgnPGlucHV0IHR5cGU9XCJmaWxlXCI+JyksaD0wO2g8ZFswXS5hdHRyaWJ1dGVzLmxlbmd0aDtoKyspZy5hdHRyKGRbMF0uYXR0cmlidXRlc1toXS5uYW1lLGRbMF0uYXR0cmlidXRlc1toXS52YWx1ZSk7ZC5hdHRyKFwiZGF0YS1tdWx0aXBsZVwiKSYmZy5hdHRyKFwibXVsdGlwbGVcIixcInRydWVcIiksZy5jc3MoXCJ0b3BcIiwwKS5jc3MoXCJib3R0b21cIiwwKS5jc3MoXCJsZWZ0XCIsMCkuY3NzKFwicmlnaHRcIiwwKS5jc3MoXCJ3aWR0aFwiLFwiMTAwJVwiKS5jc3MoXCJvcGFjaXR5XCIsMCkuY3NzKFwicG9zaXRpb25cIixcImFic29sdXRlXCIpLmNzcyhcImZpbHRlclwiLFwiYWxwaGEob3BhY2l0eT0wKVwiKSxkLmFwcGVuZChnKSwoXCJcIj09PWQuY3NzKFwicG9zaXRpb25cIil8fFwic3RhdGljXCI9PT1kLmNzcyhcInBvc2l0aW9uXCIpKSYmZC5jc3MoXCJwb3NpdGlvblwiLFwicmVsYXRpdmVcIiksZD1nfWQuYmluZChcImNoYW5nZVwiLGZ1bmN0aW9uKGEpe3ZhciBkLGUsZz1bXTtpZihkPWEuX19maWxlc198fGEudGFyZ2V0LmZpbGVzLG51bGwhPWQpZm9yKGU9MDtlPGQubGVuZ3RoO2UrKylnLnB1c2goZC5pdGVtKGUpKTtiKGZ1bmN0aW9uKCl7ZihjLHskZmlsZXM6ZywkZXZlbnQ6YX0pfSl9KX19XSksYS5kaXJlY3RpdmUoXCJuZ0ZpbGVEcm9wQXZhaWxhYmxlXCIsW1wiJHBhcnNlXCIsXCIkdGltZW91dFwiLGZ1bmN0aW9uKGEsYil7cmV0dXJuIGZ1bmN0aW9uKGMsZCxlKXtpZihcImRyYWdnYWJsZVwiaW4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIikpe3ZhciBmPWEoZS5uZ0ZpbGVEcm9wQXZhaWxhYmxlKTtiKGZ1bmN0aW9uKCl7ZihjKX0pfX19XSksYS5kaXJlY3RpdmUoXCJuZ0ZpbGVEcm9wXCIsW1wiJHBhcnNlXCIsXCIkdGltZW91dFwiLFwiJGxvY2F0aW9uXCIsZnVuY3Rpb24oYSxiLGMpe3JldHVybiBmdW5jdGlvbihkLGUsZil7ZnVuY3Rpb24gZyhhKXtyZXR1cm4vXltcXDAwMC1cXDE3N10qJC8udGVzdChhKX1mdW5jdGlvbiBoKGEsZCl7dmFyIGU9W10sZj1hLmRhdGFUcmFuc2Zlci5pdGVtcztpZihmJiZmLmxlbmd0aD4wJiZmWzBdLndlYmtpdEdldEFzRW50cnkmJlwiZmlsZVwiIT1jLnByb3RvY29sKCkmJmZbMF0ud2Via2l0R2V0QXNFbnRyeSgpLmlzRGlyZWN0b3J5KWZvcih2YXIgaD0wO2g8Zi5sZW5ndGg7aCsrKXt2YXIgaj1mW2hdLndlYmtpdEdldEFzRW50cnkoKTtudWxsIT1qJiYoZyhqLm5hbWUpP2koZSxqKTplLnB1c2goZltoXS5nZXRBc0ZpbGUoKSkpfWVsc2V7dmFyIGs9YS5kYXRhVHJhbnNmZXIuZmlsZXM7aWYobnVsbCE9aylmb3IodmFyIGg9MDtoPGsubGVuZ3RoO2grKyllLnB1c2goay5pdGVtKGgpKX0hZnVuY3Rpb24gbShhKXtiKGZ1bmN0aW9uKCl7bD9tKDEwKTpkKGUpfSxhfHwwKX0oKX1mdW5jdGlvbiBpKGEsYil7aWYobnVsbCE9YilpZihiLmlzRGlyZWN0b3J5KXt2YXIgYz1iLmNyZWF0ZVJlYWRlcigpO2wrKyxjLnJlYWRFbnRyaWVzKGZ1bmN0aW9uKGIpe2Zvcih2YXIgYz0wO2M8Yi5sZW5ndGg7YysrKWkoYSxiW2NdKTtsLS19KX1lbHNlIGwrKyxiLmZpbGUoZnVuY3Rpb24oYil7bC0tLGEucHVzaChiKX0pfWlmKFwiZHJhZ2dhYmxlXCJpbiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKSl7dmFyIGo9bnVsbDtlWzBdLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnb3ZlclwiLGZ1bmN0aW9uKGMpe2lmKGMuc3RvcFByb3BhZ2F0aW9uKCksYy5wcmV2ZW50RGVmYXVsdCgpLGIuY2FuY2VsKGopLCFlWzBdLl9fZHJhZ19vdmVyX2NsYXNzXylpZihmLm5nRmlsZURyYWdPdmVyQ2xhc3Muc2VhcmNoKC9cXCkgKiQvKT4tMSl7ZHJhZ092ZXJDbGFzc0ZuPWEoZi5uZ0ZpbGVEcmFnT3ZlckNsYXNzKTt2YXIgZz1kcmFnT3ZlckNsYXNzRm4oZCx7JGV2ZW50OmN9KTtlWzBdLl9fZHJhZ19vdmVyX2NsYXNzXz1nfWVsc2UgZVswXS5fX2RyYWdfb3Zlcl9jbGFzc189Zi5uZ0ZpbGVEcmFnT3ZlckNsYXNzfHxcImRyYWdvdmVyXCI7ZS5hZGRDbGFzcyhlWzBdLl9fZHJhZ19vdmVyX2NsYXNzXyl9LCExKSxlWzBdLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnZW50ZXJcIixmdW5jdGlvbihhKXthLnN0b3BQcm9wYWdhdGlvbigpLGEucHJldmVudERlZmF1bHQoKX0sITEpLGVbMF0uYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdsZWF2ZVwiLGZ1bmN0aW9uKCl7aj1iKGZ1bmN0aW9uKCl7ZS5yZW1vdmVDbGFzcyhlWzBdLl9fZHJhZ19vdmVyX2NsYXNzXyksZVswXS5fX2RyYWdfb3Zlcl9jbGFzc189bnVsbH0sZi5uZ0ZpbGVEcmFnT3ZlckRlbGF5fHwxKX0sITEpO3ZhciBrPWEoZi5uZ0ZpbGVEcm9wKTtlWzBdLmFkZEV2ZW50TGlzdGVuZXIoXCJkcm9wXCIsZnVuY3Rpb24oYSl7YS5zdG9wUHJvcGFnYXRpb24oKSxhLnByZXZlbnREZWZhdWx0KCksZS5yZW1vdmVDbGFzcyhlWzBdLl9fZHJhZ19vdmVyX2NsYXNzXyksZVswXS5fX2RyYWdfb3Zlcl9jbGFzc189bnVsbCxoKGEsZnVuY3Rpb24oYil7ayhkLHskZmlsZXM6YiwkZXZlbnQ6YX0pfSl9LCExKTt2YXIgbD0wfX19XSl9KCk7IiwiLyoqXG4gKiBTdGF0ZS1iYXNlZCByb3V0aW5nIGZvciBBbmd1bGFySlNcbiAqIEB2ZXJzaW9uIHYwLjIuMTNcbiAqIEBsaW5rIGh0dHA6Ly9hbmd1bGFyLXVpLmdpdGh1Yi5jb20vXG4gKiBAbGljZW5zZSBNSVQgTGljZW5zZSwgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG4vKiBjb21tb25qcyBwYWNrYWdlIG1hbmFnZXIgc3VwcG9ydCAoZWcgY29tcG9uZW50anMpICovXG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgZXhwb3J0cyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBtb2R1bGUuZXhwb3J0cyA9PT0gZXhwb3J0cyl7XG4gIG1vZHVsZS5leHBvcnRzID0gJ3VpLnJvdXRlcic7XG59XG5cbihmdW5jdGlvbiAod2luZG93LCBhbmd1bGFyLCB1bmRlZmluZWQpIHtcbi8qanNoaW50IGdsb2JhbHN0cmljdDp0cnVlKi9cbi8qZ2xvYmFsIGFuZ3VsYXI6ZmFsc2UqL1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaXNEZWZpbmVkID0gYW5ndWxhci5pc0RlZmluZWQsXG4gICAgaXNGdW5jdGlvbiA9IGFuZ3VsYXIuaXNGdW5jdGlvbixcbiAgICBpc1N0cmluZyA9IGFuZ3VsYXIuaXNTdHJpbmcsXG4gICAgaXNPYmplY3QgPSBhbmd1bGFyLmlzT2JqZWN0LFxuICAgIGlzQXJyYXkgPSBhbmd1bGFyLmlzQXJyYXksXG4gICAgZm9yRWFjaCA9IGFuZ3VsYXIuZm9yRWFjaCxcbiAgICBleHRlbmQgPSBhbmd1bGFyLmV4dGVuZCxcbiAgICBjb3B5ID0gYW5ndWxhci5jb3B5O1xuXG5mdW5jdGlvbiBpbmhlcml0KHBhcmVudCwgZXh0cmEpIHtcbiAgcmV0dXJuIGV4dGVuZChuZXcgKGV4dGVuZChmdW5jdGlvbigpIHt9LCB7IHByb3RvdHlwZTogcGFyZW50IH0pKSgpLCBleHRyYSk7XG59XG5cbmZ1bmN0aW9uIG1lcmdlKGRzdCkge1xuICBmb3JFYWNoKGFyZ3VtZW50cywgZnVuY3Rpb24ob2JqKSB7XG4gICAgaWYgKG9iaiAhPT0gZHN0KSB7XG4gICAgICBmb3JFYWNoKG9iaiwgZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICAgICAgICBpZiAoIWRzdC5oYXNPd25Qcm9wZXJ0eShrZXkpKSBkc3Rba2V5XSA9IHZhbHVlO1xuICAgICAgfSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGRzdDtcbn1cblxuLyoqXG4gKiBGaW5kcyB0aGUgY29tbW9uIGFuY2VzdG9yIHBhdGggYmV0d2VlbiB0d28gc3RhdGVzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBmaXJzdCBUaGUgZmlyc3Qgc3RhdGUuXG4gKiBAcGFyYW0ge09iamVjdH0gc2Vjb25kIFRoZSBzZWNvbmQgc3RhdGUuXG4gKiBAcmV0dXJuIHtBcnJheX0gUmV0dXJucyBhbiBhcnJheSBvZiBzdGF0ZSBuYW1lcyBpbiBkZXNjZW5kaW5nIG9yZGVyLCBub3QgaW5jbHVkaW5nIHRoZSByb290LlxuICovXG5mdW5jdGlvbiBhbmNlc3RvcnMoZmlyc3QsIHNlY29uZCkge1xuICB2YXIgcGF0aCA9IFtdO1xuXG4gIGZvciAodmFyIG4gaW4gZmlyc3QucGF0aCkge1xuICAgIGlmIChmaXJzdC5wYXRoW25dICE9PSBzZWNvbmQucGF0aFtuXSkgYnJlYWs7XG4gICAgcGF0aC5wdXNoKGZpcnN0LnBhdGhbbl0pO1xuICB9XG4gIHJldHVybiBwYXRoO1xufVxuXG4vKipcbiAqIElFOC1zYWZlIHdyYXBwZXIgZm9yIGBPYmplY3Qua2V5cygpYC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IEEgSmF2YVNjcmlwdCBvYmplY3QuXG4gKiBAcmV0dXJuIHtBcnJheX0gUmV0dXJucyB0aGUga2V5cyBvZiB0aGUgb2JqZWN0IGFzIGFuIGFycmF5LlxuICovXG5mdW5jdGlvbiBvYmplY3RLZXlzKG9iamVjdCkge1xuICBpZiAoT2JqZWN0LmtleXMpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMob2JqZWN0KTtcbiAgfVxuICB2YXIgcmVzdWx0ID0gW107XG5cbiAgYW5ndWxhci5mb3JFYWNoKG9iamVjdCwgZnVuY3Rpb24odmFsLCBrZXkpIHtcbiAgICByZXN1bHQucHVzaChrZXkpO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBJRTgtc2FmZSB3cmFwcGVyIGZvciBgQXJyYXkucHJvdG90eXBlLmluZGV4T2YoKWAuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgQSBKYXZhU2NyaXB0IGFycmF5LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBBIHZhbHVlIHRvIHNlYXJjaCB0aGUgYXJyYXkgZm9yLlxuICogQHJldHVybiB7TnVtYmVyfSBSZXR1cm5zIHRoZSBhcnJheSBpbmRleCB2YWx1ZSBvZiBgdmFsdWVgLCBvciBgLTFgIGlmIG5vdCBwcmVzZW50LlxuICovXG5mdW5jdGlvbiBpbmRleE9mKGFycmF5LCB2YWx1ZSkge1xuICBpZiAoQXJyYXkucHJvdG90eXBlLmluZGV4T2YpIHtcbiAgICByZXR1cm4gYXJyYXkuaW5kZXhPZih2YWx1ZSwgTnVtYmVyKGFyZ3VtZW50c1syXSkgfHwgMCk7XG4gIH1cbiAgdmFyIGxlbiA9IGFycmF5Lmxlbmd0aCA+Pj4gMCwgZnJvbSA9IE51bWJlcihhcmd1bWVudHNbMl0pIHx8IDA7XG4gIGZyb20gPSAoZnJvbSA8IDApID8gTWF0aC5jZWlsKGZyb20pIDogTWF0aC5mbG9vcihmcm9tKTtcblxuICBpZiAoZnJvbSA8IDApIGZyb20gKz0gbGVuO1xuXG4gIGZvciAoOyBmcm9tIDwgbGVuOyBmcm9tKyspIHtcbiAgICBpZiAoZnJvbSBpbiBhcnJheSAmJiBhcnJheVtmcm9tXSA9PT0gdmFsdWUpIHJldHVybiBmcm9tO1xuICB9XG4gIHJldHVybiAtMTtcbn1cblxuLyoqXG4gKiBNZXJnZXMgYSBzZXQgb2YgcGFyYW1ldGVycyB3aXRoIGFsbCBwYXJhbWV0ZXJzIGluaGVyaXRlZCBiZXR3ZWVuIHRoZSBjb21tb24gcGFyZW50cyBvZiB0aGVcbiAqIGN1cnJlbnQgc3RhdGUgYW5kIGEgZ2l2ZW4gZGVzdGluYXRpb24gc3RhdGUuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGN1cnJlbnRQYXJhbXMgVGhlIHZhbHVlIG9mIHRoZSBjdXJyZW50IHN0YXRlIHBhcmFtZXRlcnMgKCRzdGF0ZVBhcmFtcykuXG4gKiBAcGFyYW0ge09iamVjdH0gbmV3UGFyYW1zIFRoZSBzZXQgb2YgcGFyYW1ldGVycyB3aGljaCB3aWxsIGJlIGNvbXBvc2l0ZWQgd2l0aCBpbmhlcml0ZWQgcGFyYW1zLlxuICogQHBhcmFtIHtPYmplY3R9ICRjdXJyZW50IEludGVybmFsIGRlZmluaXRpb24gb2Ygb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgY3VycmVudCBzdGF0ZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSAkdG8gSW50ZXJuYWwgZGVmaW5pdGlvbiBvZiBvYmplY3QgcmVwcmVzZW50aW5nIHN0YXRlIHRvIHRyYW5zaXRpb24gdG8uXG4gKi9cbmZ1bmN0aW9uIGluaGVyaXRQYXJhbXMoY3VycmVudFBhcmFtcywgbmV3UGFyYW1zLCAkY3VycmVudCwgJHRvKSB7XG4gIHZhciBwYXJlbnRzID0gYW5jZXN0b3JzKCRjdXJyZW50LCAkdG8pLCBwYXJlbnRQYXJhbXMsIGluaGVyaXRlZCA9IHt9LCBpbmhlcml0TGlzdCA9IFtdO1xuXG4gIGZvciAodmFyIGkgaW4gcGFyZW50cykge1xuICAgIGlmICghcGFyZW50c1tpXS5wYXJhbXMpIGNvbnRpbnVlO1xuICAgIHBhcmVudFBhcmFtcyA9IG9iamVjdEtleXMocGFyZW50c1tpXS5wYXJhbXMpO1xuICAgIGlmICghcGFyZW50UGFyYW1zLmxlbmd0aCkgY29udGludWU7XG5cbiAgICBmb3IgKHZhciBqIGluIHBhcmVudFBhcmFtcykge1xuICAgICAgaWYgKGluZGV4T2YoaW5oZXJpdExpc3QsIHBhcmVudFBhcmFtc1tqXSkgPj0gMCkgY29udGludWU7XG4gICAgICBpbmhlcml0TGlzdC5wdXNoKHBhcmVudFBhcmFtc1tqXSk7XG4gICAgICBpbmhlcml0ZWRbcGFyZW50UGFyYW1zW2pdXSA9IGN1cnJlbnRQYXJhbXNbcGFyZW50UGFyYW1zW2pdXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGV4dGVuZCh7fSwgaW5oZXJpdGVkLCBuZXdQYXJhbXMpO1xufVxuXG4vKipcbiAqIFBlcmZvcm1zIGEgbm9uLXN0cmljdCBjb21wYXJpc29uIG9mIHRoZSBzdWJzZXQgb2YgdHdvIG9iamVjdHMsIGRlZmluZWQgYnkgYSBsaXN0IG9mIGtleXMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGEgVGhlIGZpcnN0IG9iamVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBiIFRoZSBzZWNvbmQgb2JqZWN0LlxuICogQHBhcmFtIHtBcnJheX0ga2V5cyBUaGUgbGlzdCBvZiBrZXlzIHdpdGhpbiBlYWNoIG9iamVjdCB0byBjb21wYXJlLiBJZiB0aGUgbGlzdCBpcyBlbXB0eSBvciBub3Qgc3BlY2lmaWVkLFxuICogICAgICAgICAgICAgICAgICAgICBpdCBkZWZhdWx0cyB0byB0aGUgbGlzdCBvZiBrZXlzIGluIGBhYC5cbiAqIEByZXR1cm4ge0Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBrZXlzIG1hdGNoLCBvdGhlcndpc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gZXF1YWxGb3JLZXlzKGEsIGIsIGtleXMpIHtcbiAgaWYgKCFrZXlzKSB7XG4gICAga2V5cyA9IFtdO1xuICAgIGZvciAodmFyIG4gaW4gYSkga2V5cy5wdXNoKG4pOyAvLyBVc2VkIGluc3RlYWQgb2YgT2JqZWN0LmtleXMoKSBmb3IgSUU4IGNvbXBhdGliaWxpdHlcbiAgfVxuXG4gIGZvciAodmFyIGk9MDsgaTxrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGsgPSBrZXlzW2ldO1xuICAgIGlmIChhW2tdICE9IGJba10pIHJldHVybiBmYWxzZTsgLy8gTm90ICc9PT0nLCB2YWx1ZXMgYXJlbid0IG5lY2Vzc2FyaWx5IG5vcm1hbGl6ZWRcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBzdWJzZXQgb2YgYW4gb2JqZWN0LCBiYXNlZCBvbiBhIGxpc3Qgb2Yga2V5cy5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBrZXlzXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsdWVzXG4gKiBAcmV0dXJuIHtCb29sZWFufSBSZXR1cm5zIGEgc3Vic2V0IG9mIGB2YWx1ZXNgLlxuICovXG5mdW5jdGlvbiBmaWx0ZXJCeUtleXMoa2V5cywgdmFsdWVzKSB7XG4gIHZhciBmaWx0ZXJlZCA9IHt9O1xuXG4gIGZvckVhY2goa2V5cywgZnVuY3Rpb24gKG5hbWUpIHtcbiAgICBmaWx0ZXJlZFtuYW1lXSA9IHZhbHVlc1tuYW1lXTtcbiAgfSk7XG4gIHJldHVybiBmaWx0ZXJlZDtcbn1cblxuLy8gbGlrZSBfLmluZGV4Qnlcbi8vIHdoZW4geW91IGtub3cgdGhhdCB5b3VyIGluZGV4IHZhbHVlcyB3aWxsIGJlIHVuaXF1ZSwgb3IgeW91IHdhbnQgbGFzdC1vbmUtaW4gdG8gd2luXG5mdW5jdGlvbiBpbmRleEJ5KGFycmF5LCBwcm9wTmFtZSkge1xuICB2YXIgcmVzdWx0ID0ge307XG4gIGZvckVhY2goYXJyYXksIGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICByZXN1bHRbaXRlbVtwcm9wTmFtZV1dID0gaXRlbTtcbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8vIGV4dHJhY3RlZCBmcm9tIHVuZGVyc2NvcmUuanNcbi8vIFJldHVybiBhIGNvcHkgb2YgdGhlIG9iamVjdCBvbmx5IGNvbnRhaW5pbmcgdGhlIHdoaXRlbGlzdGVkIHByb3BlcnRpZXMuXG5mdW5jdGlvbiBwaWNrKG9iaikge1xuICB2YXIgY29weSA9IHt9O1xuICB2YXIga2V5cyA9IEFycmF5LnByb3RvdHlwZS5jb25jYXQuYXBwbHkoQXJyYXkucHJvdG90eXBlLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcbiAgZm9yRWFjaChrZXlzLCBmdW5jdGlvbihrZXkpIHtcbiAgICBpZiAoa2V5IGluIG9iaikgY29weVtrZXldID0gb2JqW2tleV07XG4gIH0pO1xuICByZXR1cm4gY29weTtcbn1cblxuLy8gZXh0cmFjdGVkIGZyb20gdW5kZXJzY29yZS5qc1xuLy8gUmV0dXJuIGEgY29weSBvZiB0aGUgb2JqZWN0IG9taXR0aW5nIHRoZSBibGFja2xpc3RlZCBwcm9wZXJ0aWVzLlxuZnVuY3Rpb24gb21pdChvYmopIHtcbiAgdmFyIGNvcHkgPSB7fTtcbiAgdmFyIGtleXMgPSBBcnJheS5wcm90b3R5cGUuY29uY2F0LmFwcGx5KEFycmF5LnByb3RvdHlwZSwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICBpZiAoaW5kZXhPZihrZXlzLCBrZXkpID09IC0xKSBjb3B5W2tleV0gPSBvYmpba2V5XTtcbiAgfVxuICByZXR1cm4gY29weTtcbn1cblxuZnVuY3Rpb24gcGx1Y2soY29sbGVjdGlvbiwga2V5KSB7XG4gIHZhciByZXN1bHQgPSBpc0FycmF5KGNvbGxlY3Rpb24pID8gW10gOiB7fTtcblxuICBmb3JFYWNoKGNvbGxlY3Rpb24sIGZ1bmN0aW9uKHZhbCwgaSkge1xuICAgIHJlc3VsdFtpXSA9IGlzRnVuY3Rpb24oa2V5KSA/IGtleSh2YWwpIDogdmFsW2tleV07XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBmaWx0ZXIoY29sbGVjdGlvbiwgY2FsbGJhY2spIHtcbiAgdmFyIGFycmF5ID0gaXNBcnJheShjb2xsZWN0aW9uKTtcbiAgdmFyIHJlc3VsdCA9IGFycmF5ID8gW10gOiB7fTtcbiAgZm9yRWFjaChjb2xsZWN0aW9uLCBmdW5jdGlvbih2YWwsIGkpIHtcbiAgICBpZiAoY2FsbGJhY2sodmFsLCBpKSkge1xuICAgICAgcmVzdWx0W2FycmF5ID8gcmVzdWx0Lmxlbmd0aCA6IGldID0gdmFsO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1hcChjb2xsZWN0aW9uLCBjYWxsYmFjaykge1xuICB2YXIgcmVzdWx0ID0gaXNBcnJheShjb2xsZWN0aW9uKSA/IFtdIDoge307XG5cbiAgZm9yRWFjaChjb2xsZWN0aW9uLCBmdW5jdGlvbih2YWwsIGkpIHtcbiAgICByZXN1bHRbaV0gPSBjYWxsYmFjayh2YWwsIGkpO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBAbmdkb2Mgb3ZlcnZpZXdcbiAqIEBuYW1lIHVpLnJvdXRlci51dGlsXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiAjIHVpLnJvdXRlci51dGlsIHN1Yi1tb2R1bGVcbiAqXG4gKiBUaGlzIG1vZHVsZSBpcyBhIGRlcGVuZGVuY3kgb2Ygb3RoZXIgc3ViLW1vZHVsZXMuIERvIG5vdCBpbmNsdWRlIHRoaXMgbW9kdWxlIGFzIGEgZGVwZW5kZW5jeVxuICogaW4geW91ciBhbmd1bGFyIGFwcCAodXNlIHtAbGluayB1aS5yb3V0ZXJ9IG1vZHVsZSBpbnN0ZWFkKS5cbiAqXG4gKi9cbmFuZ3VsYXIubW9kdWxlKCd1aS5yb3V0ZXIudXRpbCcsIFsnbmcnXSk7XG5cbi8qKlxuICogQG5nZG9jIG92ZXJ2aWV3XG4gKiBAbmFtZSB1aS5yb3V0ZXIucm91dGVyXG4gKiBcbiAqIEByZXF1aXJlcyB1aS5yb3V0ZXIudXRpbFxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogIyB1aS5yb3V0ZXIucm91dGVyIHN1Yi1tb2R1bGVcbiAqXG4gKiBUaGlzIG1vZHVsZSBpcyBhIGRlcGVuZGVuY3kgb2Ygb3RoZXIgc3ViLW1vZHVsZXMuIERvIG5vdCBpbmNsdWRlIHRoaXMgbW9kdWxlIGFzIGEgZGVwZW5kZW5jeVxuICogaW4geW91ciBhbmd1bGFyIGFwcCAodXNlIHtAbGluayB1aS5yb3V0ZXJ9IG1vZHVsZSBpbnN0ZWFkKS5cbiAqL1xuYW5ndWxhci5tb2R1bGUoJ3VpLnJvdXRlci5yb3V0ZXInLCBbJ3VpLnJvdXRlci51dGlsJ10pO1xuXG4vKipcbiAqIEBuZ2RvYyBvdmVydmlld1xuICogQG5hbWUgdWkucm91dGVyLnN0YXRlXG4gKiBcbiAqIEByZXF1aXJlcyB1aS5yb3V0ZXIucm91dGVyXG4gKiBAcmVxdWlyZXMgdWkucm91dGVyLnV0aWxcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqICMgdWkucm91dGVyLnN0YXRlIHN1Yi1tb2R1bGVcbiAqXG4gKiBUaGlzIG1vZHVsZSBpcyBhIGRlcGVuZGVuY3kgb2YgdGhlIG1haW4gdWkucm91dGVyIG1vZHVsZS4gRG8gbm90IGluY2x1ZGUgdGhpcyBtb2R1bGUgYXMgYSBkZXBlbmRlbmN5XG4gKiBpbiB5b3VyIGFuZ3VsYXIgYXBwICh1c2Uge0BsaW5rIHVpLnJvdXRlcn0gbW9kdWxlIGluc3RlYWQpLlxuICogXG4gKi9cbmFuZ3VsYXIubW9kdWxlKCd1aS5yb3V0ZXIuc3RhdGUnLCBbJ3VpLnJvdXRlci5yb3V0ZXInLCAndWkucm91dGVyLnV0aWwnXSk7XG5cbi8qKlxuICogQG5nZG9jIG92ZXJ2aWV3XG4gKiBAbmFtZSB1aS5yb3V0ZXJcbiAqXG4gKiBAcmVxdWlyZXMgdWkucm91dGVyLnN0YXRlXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiAjIHVpLnJvdXRlclxuICogXG4gKiAjIyBUaGUgbWFpbiBtb2R1bGUgZm9yIHVpLnJvdXRlciBcbiAqIFRoZXJlIGFyZSBzZXZlcmFsIHN1Yi1tb2R1bGVzIGluY2x1ZGVkIHdpdGggdGhlIHVpLnJvdXRlciBtb2R1bGUsIGhvd2V2ZXIgb25seSB0aGlzIG1vZHVsZSBpcyBuZWVkZWRcbiAqIGFzIGEgZGVwZW5kZW5jeSB3aXRoaW4geW91ciBhbmd1bGFyIGFwcC4gVGhlIG90aGVyIG1vZHVsZXMgYXJlIGZvciBvcmdhbml6YXRpb24gcHVycG9zZXMuIFxuICpcbiAqIFRoZSBtb2R1bGVzIGFyZTpcbiAqICogdWkucm91dGVyIC0gdGhlIG1haW4gXCJ1bWJyZWxsYVwiIG1vZHVsZVxuICogKiB1aS5yb3V0ZXIucm91dGVyIC0gXG4gKiBcbiAqICpZb3UnbGwgbmVlZCB0byBpbmNsdWRlICoqb25seSoqIHRoaXMgbW9kdWxlIGFzIHRoZSBkZXBlbmRlbmN5IHdpdGhpbiB5b3VyIGFuZ3VsYXIgYXBwLipcbiAqIFxuICogPHByZT5cbiAqIDwhZG9jdHlwZSBodG1sPlxuICogPGh0bWwgbmctYXBwPVwibXlBcHBcIj5cbiAqIDxoZWFkPlxuICogICA8c2NyaXB0IHNyYz1cImpzL2FuZ3VsYXIuanNcIj48L3NjcmlwdD5cbiAqICAgPCEtLSBJbmNsdWRlIHRoZSB1aS1yb3V0ZXIgc2NyaXB0IC0tPlxuICogICA8c2NyaXB0IHNyYz1cImpzL2FuZ3VsYXItdWktcm91dGVyLm1pbi5qc1wiPjwvc2NyaXB0PlxuICogICA8c2NyaXB0PlxuICogICAgIC8vIC4uLmFuZCBhZGQgJ3VpLnJvdXRlcicgYXMgYSBkZXBlbmRlbmN5XG4gKiAgICAgdmFyIG15QXBwID0gYW5ndWxhci5tb2R1bGUoJ215QXBwJywgWyd1aS5yb3V0ZXInXSk7XG4gKiAgIDwvc2NyaXB0PlxuICogPC9oZWFkPlxuICogPGJvZHk+XG4gKiA8L2JvZHk+XG4gKiA8L2h0bWw+XG4gKiA8L3ByZT5cbiAqL1xuYW5ndWxhci5tb2R1bGUoJ3VpLnJvdXRlcicsIFsndWkucm91dGVyLnN0YXRlJ10pO1xuXG5hbmd1bGFyLm1vZHVsZSgndWkucm91dGVyLmNvbXBhdCcsIFsndWkucm91dGVyJ10pO1xuXG4vKipcbiAqIEBuZ2RvYyBvYmplY3RcbiAqIEBuYW1lIHVpLnJvdXRlci51dGlsLiRyZXNvbHZlXG4gKlxuICogQHJlcXVpcmVzICRxXG4gKiBAcmVxdWlyZXMgJGluamVjdG9yXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBNYW5hZ2VzIHJlc29sdXRpb24gb2YgKGFjeWNsaWMpIGdyYXBocyBvZiBwcm9taXNlcy5cbiAqL1xuJFJlc29sdmUuJGluamVjdCA9IFsnJHEnLCAnJGluamVjdG9yJ107XG5mdW5jdGlvbiAkUmVzb2x2ZSggICRxLCAgICAkaW5qZWN0b3IpIHtcbiAgXG4gIHZhciBWSVNJVF9JTl9QUk9HUkVTUyA9IDEsXG4gICAgICBWSVNJVF9ET05FID0gMixcbiAgICAgIE5PVEhJTkcgPSB7fSxcbiAgICAgIE5PX0RFUEVOREVOQ0lFUyA9IFtdLFxuICAgICAgTk9fTE9DQUxTID0gTk9USElORyxcbiAgICAgIE5PX1BBUkVOVCA9IGV4dGVuZCgkcS53aGVuKE5PVEhJTkcpLCB7ICQkcHJvbWlzZXM6IE5PVEhJTkcsICQkdmFsdWVzOiBOT1RISU5HIH0pO1xuICBcblxuICAvKipcbiAgICogQG5nZG9jIGZ1bmN0aW9uXG4gICAqIEBuYW1lIHVpLnJvdXRlci51dGlsLiRyZXNvbHZlI3N0dWR5XG4gICAqIEBtZXRob2RPZiB1aS5yb3V0ZXIudXRpbC4kcmVzb2x2ZVxuICAgKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogU3R1ZGllcyBhIHNldCBvZiBpbnZvY2FibGVzIHRoYXQgYXJlIGxpa2VseSB0byBiZSB1c2VkIG11bHRpcGxlIHRpbWVzLlxuICAgKiA8cHJlPlxuICAgKiAkcmVzb2x2ZS5zdHVkeShpbnZvY2FibGVzKShsb2NhbHMsIHBhcmVudCwgc2VsZilcbiAgICogPC9wcmU+XG4gICAqIGlzIGVxdWl2YWxlbnQgdG9cbiAgICogPHByZT5cbiAgICogJHJlc29sdmUucmVzb2x2ZShpbnZvY2FibGVzLCBsb2NhbHMsIHBhcmVudCwgc2VsZilcbiAgICogPC9wcmU+XG4gICAqIGJ1dCB0aGUgZm9ybWVyIGlzIG1vcmUgZWZmaWNpZW50IChpbiBmYWN0IGByZXNvbHZlYCBqdXN0IGNhbGxzIGBzdHVkeWAgXG4gICAqIGludGVybmFsbHkpLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gaW52b2NhYmxlcyBJbnZvY2FibGUgb2JqZWN0c1xuICAgKiBAcmV0dXJuIHtmdW5jdGlvbn0gYSBmdW5jdGlvbiB0byBwYXNzIGluIGxvY2FscywgcGFyZW50IGFuZCBzZWxmXG4gICAqL1xuICB0aGlzLnN0dWR5ID0gZnVuY3Rpb24gKGludm9jYWJsZXMpIHtcbiAgICBpZiAoIWlzT2JqZWN0KGludm9jYWJsZXMpKSB0aHJvdyBuZXcgRXJyb3IoXCInaW52b2NhYmxlcycgbXVzdCBiZSBhbiBvYmplY3RcIik7XG4gICAgdmFyIGludm9jYWJsZUtleXMgPSBvYmplY3RLZXlzKGludm9jYWJsZXMgfHwge30pO1xuICAgIFxuICAgIC8vIFBlcmZvcm0gYSB0b3BvbG9naWNhbCBzb3J0IG9mIGludm9jYWJsZXMgdG8gYnVpbGQgYW4gb3JkZXJlZCBwbGFuXG4gICAgdmFyIHBsYW4gPSBbXSwgY3ljbGUgPSBbXSwgdmlzaXRlZCA9IHt9O1xuICAgIGZ1bmN0aW9uIHZpc2l0KHZhbHVlLCBrZXkpIHtcbiAgICAgIGlmICh2aXNpdGVkW2tleV0gPT09IFZJU0lUX0RPTkUpIHJldHVybjtcbiAgICAgIFxuICAgICAgY3ljbGUucHVzaChrZXkpO1xuICAgICAgaWYgKHZpc2l0ZWRba2V5XSA9PT0gVklTSVRfSU5fUFJPR1JFU1MpIHtcbiAgICAgICAgY3ljbGUuc3BsaWNlKDAsIGluZGV4T2YoY3ljbGUsIGtleSkpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDeWNsaWMgZGVwZW5kZW5jeTogXCIgKyBjeWNsZS5qb2luKFwiIC0+IFwiKSk7XG4gICAgICB9XG4gICAgICB2aXNpdGVkW2tleV0gPSBWSVNJVF9JTl9QUk9HUkVTUztcbiAgICAgIFxuICAgICAgaWYgKGlzU3RyaW5nKHZhbHVlKSkge1xuICAgICAgICBwbGFuLnB1c2goa2V5LCBbIGZ1bmN0aW9uKCkgeyByZXR1cm4gJGluamVjdG9yLmdldCh2YWx1ZSk7IH1dLCBOT19ERVBFTkRFTkNJRVMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHBhcmFtcyA9ICRpbmplY3Rvci5hbm5vdGF0ZSh2YWx1ZSk7XG4gICAgICAgIGZvckVhY2gocGFyYW1zLCBmdW5jdGlvbiAocGFyYW0pIHtcbiAgICAgICAgICBpZiAocGFyYW0gIT09IGtleSAmJiBpbnZvY2FibGVzLmhhc093blByb3BlcnR5KHBhcmFtKSkgdmlzaXQoaW52b2NhYmxlc1twYXJhbV0sIHBhcmFtKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHBsYW4ucHVzaChrZXksIHZhbHVlLCBwYXJhbXMpO1xuICAgICAgfVxuICAgICAgXG4gICAgICBjeWNsZS5wb3AoKTtcbiAgICAgIHZpc2l0ZWRba2V5XSA9IFZJU0lUX0RPTkU7XG4gICAgfVxuICAgIGZvckVhY2goaW52b2NhYmxlcywgdmlzaXQpO1xuICAgIGludm9jYWJsZXMgPSBjeWNsZSA9IHZpc2l0ZWQgPSBudWxsOyAvLyBwbGFuIGlzIGFsbCB0aGF0J3MgcmVxdWlyZWRcbiAgICBcbiAgICBmdW5jdGlvbiBpc1Jlc29sdmUodmFsdWUpIHtcbiAgICAgIHJldHVybiBpc09iamVjdCh2YWx1ZSkgJiYgdmFsdWUudGhlbiAmJiB2YWx1ZS4kJHByb21pc2VzO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gZnVuY3Rpb24gKGxvY2FscywgcGFyZW50LCBzZWxmKSB7XG4gICAgICBpZiAoaXNSZXNvbHZlKGxvY2FscykgJiYgc2VsZiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHNlbGYgPSBwYXJlbnQ7IHBhcmVudCA9IGxvY2FsczsgbG9jYWxzID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIGlmICghbG9jYWxzKSBsb2NhbHMgPSBOT19MT0NBTFM7XG4gICAgICBlbHNlIGlmICghaXNPYmplY3QobG9jYWxzKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCInbG9jYWxzJyBtdXN0IGJlIGFuIG9iamVjdFwiKTtcbiAgICAgIH0gICAgICAgXG4gICAgICBpZiAoIXBhcmVudCkgcGFyZW50ID0gTk9fUEFSRU5UO1xuICAgICAgZWxzZSBpZiAoIWlzUmVzb2x2ZShwYXJlbnQpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIidwYXJlbnQnIG11c3QgYmUgYSBwcm9taXNlIHJldHVybmVkIGJ5ICRyZXNvbHZlLnJlc29sdmUoKVwiKTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLy8gVG8gY29tcGxldGUgdGhlIG92ZXJhbGwgcmVzb2x1dGlvbiwgd2UgaGF2ZSB0byB3YWl0IGZvciB0aGUgcGFyZW50XG4gICAgICAvLyBwcm9taXNlIGFuZCBmb3IgdGhlIHByb21pc2UgZm9yIGVhY2ggaW52b2thYmxlIGluIG91ciBwbGFuLlxuICAgICAgdmFyIHJlc29sdXRpb24gPSAkcS5kZWZlcigpLFxuICAgICAgICAgIHJlc3VsdCA9IHJlc29sdXRpb24ucHJvbWlzZSxcbiAgICAgICAgICBwcm9taXNlcyA9IHJlc3VsdC4kJHByb21pc2VzID0ge30sXG4gICAgICAgICAgdmFsdWVzID0gZXh0ZW5kKHt9LCBsb2NhbHMpLFxuICAgICAgICAgIHdhaXQgPSAxICsgcGxhbi5sZW5ndGgvMyxcbiAgICAgICAgICBtZXJnZWQgPSBmYWxzZTtcbiAgICAgICAgICBcbiAgICAgIGZ1bmN0aW9uIGRvbmUoKSB7XG4gICAgICAgIC8vIE1lcmdlIHBhcmVudCB2YWx1ZXMgd2UgaGF2ZW4ndCBnb3QgeWV0IGFuZCBwdWJsaXNoIG91ciBvd24gJCR2YWx1ZXNcbiAgICAgICAgaWYgKCEtLXdhaXQpIHtcbiAgICAgICAgICBpZiAoIW1lcmdlZCkgbWVyZ2UodmFsdWVzLCBwYXJlbnQuJCR2YWx1ZXMpOyBcbiAgICAgICAgICByZXN1bHQuJCR2YWx1ZXMgPSB2YWx1ZXM7XG4gICAgICAgICAgcmVzdWx0LiQkcHJvbWlzZXMgPSByZXN1bHQuJCRwcm9taXNlcyB8fCB0cnVlOyAvLyBrZWVwIGZvciBpc1Jlc29sdmUoKVxuICAgICAgICAgIGRlbGV0ZSByZXN1bHQuJCRpbmhlcml0ZWRWYWx1ZXM7XG4gICAgICAgICAgcmVzb2x1dGlvbi5yZXNvbHZlKHZhbHVlcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIFxuICAgICAgZnVuY3Rpb24gZmFpbChyZWFzb24pIHtcbiAgICAgICAgcmVzdWx0LiQkZmFpbHVyZSA9IHJlYXNvbjtcbiAgICAgICAgcmVzb2x1dGlvbi5yZWplY3QocmVhc29uKTtcbiAgICAgIH1cblxuICAgICAgLy8gU2hvcnQtY2lyY3VpdCBpZiBwYXJlbnQgaGFzIGFscmVhZHkgZmFpbGVkXG4gICAgICBpZiAoaXNEZWZpbmVkKHBhcmVudC4kJGZhaWx1cmUpKSB7XG4gICAgICAgIGZhaWwocGFyZW50LiQkZmFpbHVyZSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9XG4gICAgICBcbiAgICAgIGlmIChwYXJlbnQuJCRpbmhlcml0ZWRWYWx1ZXMpIHtcbiAgICAgICAgbWVyZ2UodmFsdWVzLCBvbWl0KHBhcmVudC4kJGluaGVyaXRlZFZhbHVlcywgaW52b2NhYmxlS2V5cykpO1xuICAgICAgfVxuXG4gICAgICAvLyBNZXJnZSBwYXJlbnQgdmFsdWVzIGlmIHRoZSBwYXJlbnQgaGFzIGFscmVhZHkgcmVzb2x2ZWQsIG9yIG1lcmdlXG4gICAgICAvLyBwYXJlbnQgcHJvbWlzZXMgYW5kIHdhaXQgaWYgdGhlIHBhcmVudCByZXNvbHZlIGlzIHN0aWxsIGluIHByb2dyZXNzLlxuICAgICAgZXh0ZW5kKHByb21pc2VzLCBwYXJlbnQuJCRwcm9taXNlcyk7XG4gICAgICBpZiAocGFyZW50LiQkdmFsdWVzKSB7XG4gICAgICAgIG1lcmdlZCA9IG1lcmdlKHZhbHVlcywgb21pdChwYXJlbnQuJCR2YWx1ZXMsIGludm9jYWJsZUtleXMpKTtcbiAgICAgICAgcmVzdWx0LiQkaW5oZXJpdGVkVmFsdWVzID0gb21pdChwYXJlbnQuJCR2YWx1ZXMsIGludm9jYWJsZUtleXMpO1xuICAgICAgICBkb25lKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAocGFyZW50LiQkaW5oZXJpdGVkVmFsdWVzKSB7XG4gICAgICAgICAgcmVzdWx0LiQkaW5oZXJpdGVkVmFsdWVzID0gb21pdChwYXJlbnQuJCRpbmhlcml0ZWRWYWx1ZXMsIGludm9jYWJsZUtleXMpO1xuICAgICAgICB9ICAgICAgICBcbiAgICAgICAgcGFyZW50LnRoZW4oZG9uZSwgZmFpbCk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIC8vIFByb2Nlc3MgZWFjaCBpbnZvY2FibGUgaW4gdGhlIHBsYW4sIGJ1dCBpZ25vcmUgYW55IHdoZXJlIGEgbG9jYWwgb2YgdGhlIHNhbWUgbmFtZSBleGlzdHMuXG4gICAgICBmb3IgKHZhciBpPTAsIGlpPXBsYW4ubGVuZ3RoOyBpPGlpOyBpKz0zKSB7XG4gICAgICAgIGlmIChsb2NhbHMuaGFzT3duUHJvcGVydHkocGxhbltpXSkpIGRvbmUoKTtcbiAgICAgICAgZWxzZSBpbnZva2UocGxhbltpXSwgcGxhbltpKzFdLCBwbGFuW2krMl0pO1xuICAgICAgfVxuICAgICAgXG4gICAgICBmdW5jdGlvbiBpbnZva2Uoa2V5LCBpbnZvY2FibGUsIHBhcmFtcykge1xuICAgICAgICAvLyBDcmVhdGUgYSBkZWZlcnJlZCBmb3IgdGhpcyBpbnZvY2F0aW9uLiBGYWlsdXJlcyB3aWxsIHByb3BhZ2F0ZSB0byB0aGUgcmVzb2x1dGlvbiBhcyB3ZWxsLlxuICAgICAgICB2YXIgaW52b2NhdGlvbiA9ICRxLmRlZmVyKCksIHdhaXRQYXJhbXMgPSAwO1xuICAgICAgICBmdW5jdGlvbiBvbmZhaWx1cmUocmVhc29uKSB7XG4gICAgICAgICAgaW52b2NhdGlvbi5yZWplY3QocmVhc29uKTtcbiAgICAgICAgICBmYWlsKHJlYXNvbik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gV2FpdCBmb3IgYW55IHBhcmFtZXRlciB0aGF0IHdlIGhhdmUgYSBwcm9taXNlIGZvciAoZWl0aGVyIGZyb20gcGFyZW50IG9yIGZyb20gdGhpc1xuICAgICAgICAvLyByZXNvbHZlOyBpbiB0aGF0IGNhc2Ugc3R1ZHkoKSB3aWxsIGhhdmUgbWFkZSBzdXJlIGl0J3Mgb3JkZXJlZCBiZWZvcmUgdXMgaW4gdGhlIHBsYW4pLlxuICAgICAgICBmb3JFYWNoKHBhcmFtcywgZnVuY3Rpb24gKGRlcCkge1xuICAgICAgICAgIGlmIChwcm9taXNlcy5oYXNPd25Qcm9wZXJ0eShkZXApICYmICFsb2NhbHMuaGFzT3duUHJvcGVydHkoZGVwKSkge1xuICAgICAgICAgICAgd2FpdFBhcmFtcysrO1xuICAgICAgICAgICAgcHJvbWlzZXNbZGVwXS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgdmFsdWVzW2RlcF0gPSByZXN1bHQ7XG4gICAgICAgICAgICAgIGlmICghKC0td2FpdFBhcmFtcykpIHByb2NlZWQoKTtcbiAgICAgICAgICAgIH0sIG9uZmFpbHVyZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCF3YWl0UGFyYW1zKSBwcm9jZWVkKCk7XG4gICAgICAgIGZ1bmN0aW9uIHByb2NlZWQoKSB7XG4gICAgICAgICAgaWYgKGlzRGVmaW5lZChyZXN1bHQuJCRmYWlsdXJlKSkgcmV0dXJuO1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpbnZvY2F0aW9uLnJlc29sdmUoJGluamVjdG9yLmludm9rZShpbnZvY2FibGUsIHNlbGYsIHZhbHVlcykpO1xuICAgICAgICAgICAgaW52b2NhdGlvbi5wcm9taXNlLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICB2YWx1ZXNba2V5XSA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgfSwgb25mYWlsdXJlKTtcbiAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBvbmZhaWx1cmUoZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIFB1Ymxpc2ggcHJvbWlzZSBzeW5jaHJvbm91c2x5OyBpbnZvY2F0aW9ucyBmdXJ0aGVyIGRvd24gaW4gdGhlIHBsYW4gbWF5IGRlcGVuZCBvbiBpdC5cbiAgICAgICAgcHJvbWlzZXNba2V5XSA9IGludm9jYXRpb24ucHJvbWlzZTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICB9O1xuICBcbiAgLyoqXG4gICAqIEBuZ2RvYyBmdW5jdGlvblxuICAgKiBAbmFtZSB1aS5yb3V0ZXIudXRpbC4kcmVzb2x2ZSNyZXNvbHZlXG4gICAqIEBtZXRob2RPZiB1aS5yb3V0ZXIudXRpbC4kcmVzb2x2ZVxuICAgKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogUmVzb2x2ZXMgYSBzZXQgb2YgaW52b2NhYmxlcy4gQW4gaW52b2NhYmxlIGlzIGEgZnVuY3Rpb24gdG8gYmUgaW52b2tlZCB2aWEgXG4gICAqIGAkaW5qZWN0b3IuaW52b2tlKClgLCBhbmQgY2FuIGhhdmUgYW4gYXJiaXRyYXJ5IG51bWJlciBvZiBkZXBlbmRlbmNpZXMuIFxuICAgKiBBbiBpbnZvY2FibGUgY2FuIGVpdGhlciByZXR1cm4gYSB2YWx1ZSBkaXJlY3RseSxcbiAgICogb3IgYSBgJHFgIHByb21pc2UuIElmIGEgcHJvbWlzZSBpcyByZXR1cm5lZCBpdCB3aWxsIGJlIHJlc29sdmVkIGFuZCB0aGUgXG4gICAqIHJlc3VsdGluZyB2YWx1ZSB3aWxsIGJlIHVzZWQgaW5zdGVhZC4gRGVwZW5kZW5jaWVzIG9mIGludm9jYWJsZXMgYXJlIHJlc29sdmVkIFxuICAgKiAoaW4gdGhpcyBvcmRlciBvZiBwcmVjZWRlbmNlKVxuICAgKlxuICAgKiAtIGZyb20gdGhlIHNwZWNpZmllZCBgbG9jYWxzYFxuICAgKiAtIGZyb20gYW5vdGhlciBpbnZvY2FibGUgdGhhdCBpcyBwYXJ0IG9mIHRoaXMgYCRyZXNvbHZlYCBjYWxsXG4gICAqIC0gZnJvbSBhbiBpbnZvY2FibGUgdGhhdCBpcyBpbmhlcml0ZWQgZnJvbSBhIGBwYXJlbnRgIGNhbGwgdG8gYCRyZXNvbHZlYCBcbiAgICogICAob3IgcmVjdXJzaXZlbHlcbiAgICogLSBmcm9tIGFueSBhbmNlc3RvciBgJHJlc29sdmVgIG9mIHRoYXQgcGFyZW50KS5cbiAgICpcbiAgICogVGhlIHJldHVybiB2YWx1ZSBvZiBgJHJlc29sdmVgIGlzIGEgcHJvbWlzZSBmb3IgYW4gb2JqZWN0IHRoYXQgY29udGFpbnMgXG4gICAqIChpbiB0aGlzIG9yZGVyIG9mIHByZWNlZGVuY2UpXG4gICAqXG4gICAqIC0gYW55IGBsb2NhbHNgIChpZiBzcGVjaWZpZWQpXG4gICAqIC0gdGhlIHJlc29sdmVkIHJldHVybiB2YWx1ZXMgb2YgYWxsIGluamVjdGFibGVzXG4gICAqIC0gYW55IHZhbHVlcyBpbmhlcml0ZWQgZnJvbSBhIGBwYXJlbnRgIGNhbGwgdG8gYCRyZXNvbHZlYCAoaWYgc3BlY2lmaWVkKVxuICAgKlxuICAgKiBUaGUgcHJvbWlzZSB3aWxsIHJlc29sdmUgYWZ0ZXIgdGhlIGBwYXJlbnRgIHByb21pc2UgKGlmIGFueSkgYW5kIGFsbCBwcm9taXNlcyBcbiAgICogcmV0dXJuZWQgYnkgaW5qZWN0YWJsZXMgaGF2ZSBiZWVuIHJlc29sdmVkLiBJZiBhbnkgaW52b2NhYmxlIFxuICAgKiAob3IgYCRpbmplY3Rvci5pbnZva2VgKSB0aHJvd3MgYW4gZXhjZXB0aW9uLCBvciBpZiBhIHByb21pc2UgcmV0dXJuZWQgYnkgYW4gXG4gICAqIGludm9jYWJsZSBpcyByZWplY3RlZCwgdGhlIGAkcmVzb2x2ZWAgcHJvbWlzZSBpcyBpbW1lZGlhdGVseSByZWplY3RlZCB3aXRoIHRoZSBcbiAgICogc2FtZSBlcnJvci4gQSByZWplY3Rpb24gb2YgYSBgcGFyZW50YCBwcm9taXNlIChpZiBzcGVjaWZpZWQpIHdpbGwgbGlrZXdpc2UgYmUgXG4gICAqIHByb3BhZ2F0ZWQgaW1tZWRpYXRlbHkuIE9uY2UgdGhlIGAkcmVzb2x2ZWAgcHJvbWlzZSBoYXMgYmVlbiByZWplY3RlZCwgbm8gXG4gICAqIGZ1cnRoZXIgaW52b2NhYmxlcyB3aWxsIGJlIGNhbGxlZC5cbiAgICogXG4gICAqIEN5Y2xpYyBkZXBlbmRlbmNpZXMgYmV0d2VlbiBpbnZvY2FibGVzIGFyZSBub3QgcGVybWl0dGVkIGFuZCB3aWxsIGNhdWVzIGAkcmVzb2x2ZWBcbiAgICogdG8gdGhyb3cgYW4gZXJyb3IuIEFzIGEgc3BlY2lhbCBjYXNlLCBhbiBpbmplY3RhYmxlIGNhbiBkZXBlbmQgb24gYSBwYXJhbWV0ZXIgXG4gICAqIHdpdGggdGhlIHNhbWUgbmFtZSBhcyB0aGUgaW5qZWN0YWJsZSwgd2hpY2ggd2lsbCBiZSBmdWxmaWxsZWQgZnJvbSB0aGUgYHBhcmVudGAgXG4gICAqIGluamVjdGFibGUgb2YgdGhlIHNhbWUgbmFtZS4gVGhpcyBhbGxvd3MgaW5oZXJpdGVkIHZhbHVlcyB0byBiZSBkZWNvcmF0ZWQuIFxuICAgKiBOb3RlIHRoYXQgaW4gdGhpcyBjYXNlIGFueSBvdGhlciBpbmplY3RhYmxlIGluIHRoZSBzYW1lIGAkcmVzb2x2ZWAgd2l0aCB0aGUgc2FtZVxuICAgKiBkZXBlbmRlbmN5IHdvdWxkIHNlZSB0aGUgZGVjb3JhdGVkIHZhbHVlLCBub3QgdGhlIGluaGVyaXRlZCB2YWx1ZS5cbiAgICpcbiAgICogTm90ZSB0aGF0IG1pc3NpbmcgZGVwZW5kZW5jaWVzIC0tIHVubGlrZSBjeWNsaWMgZGVwZW5kZW5jaWVzIC0tIHdpbGwgY2F1c2UgYW4gXG4gICAqIChhc3luY2hyb25vdXMpIHJlamVjdGlvbiBvZiB0aGUgYCRyZXNvbHZlYCBwcm9taXNlIHJhdGhlciB0aGFuIGEgKHN5bmNocm9ub3VzKSBcbiAgICogZXhjZXB0aW9uLlxuICAgKlxuICAgKiBJbnZvY2FibGVzIGFyZSBpbnZva2VkIGVhZ2VybHkgYXMgc29vbiBhcyBhbGwgZGVwZW5kZW5jaWVzIGFyZSBhdmFpbGFibGUuIFxuICAgKiBUaGlzIGlzIHRydWUgZXZlbiBmb3IgZGVwZW5kZW5jaWVzIGluaGVyaXRlZCBmcm9tIGEgYHBhcmVudGAgY2FsbCB0byBgJHJlc29sdmVgLlxuICAgKlxuICAgKiBBcyBhIHNwZWNpYWwgY2FzZSwgYW4gaW52b2NhYmxlIGNhbiBiZSBhIHN0cmluZywgaW4gd2hpY2ggY2FzZSBpdCBpcyB0YWtlbiB0byBcbiAgICogYmUgYSBzZXJ2aWNlIG5hbWUgdG8gYmUgcGFzc2VkIHRvIGAkaW5qZWN0b3IuZ2V0KClgLiBUaGlzIGlzIHN1cHBvcnRlZCBwcmltYXJpbHkgXG4gICAqIGZvciBiYWNrd2FyZHMtY29tcGF0aWJpbGl0eSB3aXRoIHRoZSBgcmVzb2x2ZWAgcHJvcGVydHkgb2YgYCRyb3V0ZVByb3ZpZGVyYCBcbiAgICogcm91dGVzLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gaW52b2NhYmxlcyBmdW5jdGlvbnMgdG8gaW52b2tlIG9yIFxuICAgKiBgJGluamVjdG9yYCBzZXJ2aWNlcyB0byBmZXRjaC5cbiAgICogQHBhcmFtIHtvYmplY3R9IGxvY2FscyAgdmFsdWVzIHRvIG1ha2UgYXZhaWxhYmxlIHRvIHRoZSBpbmplY3RhYmxlc1xuICAgKiBAcGFyYW0ge29iamVjdH0gcGFyZW50ICBhIHByb21pc2UgcmV0dXJuZWQgYnkgYW5vdGhlciBjYWxsIHRvIGAkcmVzb2x2ZWAuXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBzZWxmICB0aGUgYHRoaXNgIGZvciB0aGUgaW52b2tlZCBtZXRob2RzXG4gICAqIEByZXR1cm4ge29iamVjdH0gUHJvbWlzZSBmb3IgYW4gb2JqZWN0IHRoYXQgY29udGFpbnMgdGhlIHJlc29sdmVkIHJldHVybiB2YWx1ZVxuICAgKiBvZiBhbGwgaW52b2NhYmxlcywgYXMgd2VsbCBhcyBhbnkgaW5oZXJpdGVkIGFuZCBsb2NhbCB2YWx1ZXMuXG4gICAqL1xuICB0aGlzLnJlc29sdmUgPSBmdW5jdGlvbiAoaW52b2NhYmxlcywgbG9jYWxzLCBwYXJlbnQsIHNlbGYpIHtcbiAgICByZXR1cm4gdGhpcy5zdHVkeShpbnZvY2FibGVzKShsb2NhbHMsIHBhcmVudCwgc2VsZik7XG4gIH07XG59XG5cbmFuZ3VsYXIubW9kdWxlKCd1aS5yb3V0ZXIudXRpbCcpLnNlcnZpY2UoJyRyZXNvbHZlJywgJFJlc29sdmUpO1xuXG5cbi8qKlxuICogQG5nZG9jIG9iamVjdFxuICogQG5hbWUgdWkucm91dGVyLnV0aWwuJHRlbXBsYXRlRmFjdG9yeVxuICpcbiAqIEByZXF1aXJlcyAkaHR0cFxuICogQHJlcXVpcmVzICR0ZW1wbGF0ZUNhY2hlXG4gKiBAcmVxdWlyZXMgJGluamVjdG9yXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBTZXJ2aWNlLiBNYW5hZ2VzIGxvYWRpbmcgb2YgdGVtcGxhdGVzLlxuICovXG4kVGVtcGxhdGVGYWN0b3J5LiRpbmplY3QgPSBbJyRodHRwJywgJyR0ZW1wbGF0ZUNhY2hlJywgJyRpbmplY3RvciddO1xuZnVuY3Rpb24gJFRlbXBsYXRlRmFjdG9yeSggICRodHRwLCAgICR0ZW1wbGF0ZUNhY2hlLCAgICRpbmplY3Rvcikge1xuXG4gIC8qKlxuICAgKiBAbmdkb2MgZnVuY3Rpb25cbiAgICogQG5hbWUgdWkucm91dGVyLnV0aWwuJHRlbXBsYXRlRmFjdG9yeSNmcm9tQ29uZmlnXG4gICAqIEBtZXRob2RPZiB1aS5yb3V0ZXIudXRpbC4kdGVtcGxhdGVGYWN0b3J5XG4gICAqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBDcmVhdGVzIGEgdGVtcGxhdGUgZnJvbSBhIGNvbmZpZ3VyYXRpb24gb2JqZWN0LiBcbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IGNvbmZpZyBDb25maWd1cmF0aW9uIG9iamVjdCBmb3Igd2hpY2ggdG8gbG9hZCBhIHRlbXBsYXRlLiBcbiAgICogVGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzIGFyZSBzZWFyY2ggaW4gdGhlIHNwZWNpZmllZCBvcmRlciwgYW5kIHRoZSBmaXJzdCBvbmUgXG4gICAqIHRoYXQgaXMgZGVmaW5lZCBpcyB1c2VkIHRvIGNyZWF0ZSB0aGUgdGVtcGxhdGU6XG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfG9iamVjdH0gY29uZmlnLnRlbXBsYXRlIGh0bWwgc3RyaW5nIHRlbXBsYXRlIG9yIGZ1bmN0aW9uIHRvIFxuICAgKiBsb2FkIHZpYSB7QGxpbmsgdWkucm91dGVyLnV0aWwuJHRlbXBsYXRlRmFjdG9yeSNmcm9tU3RyaW5nIGZyb21TdHJpbmd9LlxuICAgKiBAcGFyYW0ge3N0cmluZ3xvYmplY3R9IGNvbmZpZy50ZW1wbGF0ZVVybCB1cmwgdG8gbG9hZCBvciBhIGZ1bmN0aW9uIHJldHVybmluZyBcbiAgICogdGhlIHVybCB0byBsb2FkIHZpYSB7QGxpbmsgdWkucm91dGVyLnV0aWwuJHRlbXBsYXRlRmFjdG9yeSNmcm9tVXJsIGZyb21Vcmx9LlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb25maWcudGVtcGxhdGVQcm92aWRlciBmdW5jdGlvbiB0byBpbnZva2UgdmlhIFxuICAgKiB7QGxpbmsgdWkucm91dGVyLnV0aWwuJHRlbXBsYXRlRmFjdG9yeSNmcm9tUHJvdmlkZXIgZnJvbVByb3ZpZGVyfS5cbiAgICogQHBhcmFtIHtvYmplY3R9IHBhcmFtcyAgUGFyYW1ldGVycyB0byBwYXNzIHRvIHRoZSB0ZW1wbGF0ZSBmdW5jdGlvbi5cbiAgICogQHBhcmFtIHtvYmplY3R9IGxvY2FscyBMb2NhbHMgdG8gcGFzcyB0byBgaW52b2tlYCBpZiB0aGUgdGVtcGxhdGUgaXMgbG9hZGVkIFxuICAgKiB2aWEgYSBgdGVtcGxhdGVQcm92aWRlcmAuIERlZmF1bHRzIHRvIGB7IHBhcmFtczogcGFyYW1zIH1gLlxuICAgKlxuICAgKiBAcmV0dXJuIHtzdHJpbmd8b2JqZWN0fSAgVGhlIHRlbXBsYXRlIGh0bWwgYXMgYSBzdHJpbmcsIG9yIGEgcHJvbWlzZSBmb3IgXG4gICAqIHRoYXQgc3RyaW5nLG9yIGBudWxsYCBpZiBubyB0ZW1wbGF0ZSBpcyBjb25maWd1cmVkLlxuICAgKi9cbiAgdGhpcy5mcm9tQ29uZmlnID0gZnVuY3Rpb24gKGNvbmZpZywgcGFyYW1zLCBsb2NhbHMpIHtcbiAgICByZXR1cm4gKFxuICAgICAgaXNEZWZpbmVkKGNvbmZpZy50ZW1wbGF0ZSkgPyB0aGlzLmZyb21TdHJpbmcoY29uZmlnLnRlbXBsYXRlLCBwYXJhbXMpIDpcbiAgICAgIGlzRGVmaW5lZChjb25maWcudGVtcGxhdGVVcmwpID8gdGhpcy5mcm9tVXJsKGNvbmZpZy50ZW1wbGF0ZVVybCwgcGFyYW1zKSA6XG4gICAgICBpc0RlZmluZWQoY29uZmlnLnRlbXBsYXRlUHJvdmlkZXIpID8gdGhpcy5mcm9tUHJvdmlkZXIoY29uZmlnLnRlbXBsYXRlUHJvdmlkZXIsIHBhcmFtcywgbG9jYWxzKSA6XG4gICAgICBudWxsXG4gICAgKTtcbiAgfTtcblxuICAvKipcbiAgICogQG5nZG9jIGZ1bmN0aW9uXG4gICAqIEBuYW1lIHVpLnJvdXRlci51dGlsLiR0ZW1wbGF0ZUZhY3RvcnkjZnJvbVN0cmluZ1xuICAgKiBAbWV0aG9kT2YgdWkucm91dGVyLnV0aWwuJHRlbXBsYXRlRmFjdG9yeVxuICAgKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogQ3JlYXRlcyBhIHRlbXBsYXRlIGZyb20gYSBzdHJpbmcgb3IgYSBmdW5jdGlvbiByZXR1cm5pbmcgYSBzdHJpbmcuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfG9iamVjdH0gdGVtcGxhdGUgaHRtbCB0ZW1wbGF0ZSBhcyBhIHN0cmluZyBvciBmdW5jdGlvbiB0aGF0IFxuICAgKiByZXR1cm5zIGFuIGh0bWwgdGVtcGxhdGUgYXMgYSBzdHJpbmcuXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwYXJhbXMgUGFyYW1ldGVycyB0byBwYXNzIHRvIHRoZSB0ZW1wbGF0ZSBmdW5jdGlvbi5cbiAgICpcbiAgICogQHJldHVybiB7c3RyaW5nfG9iamVjdH0gVGhlIHRlbXBsYXRlIGh0bWwgYXMgYSBzdHJpbmcsIG9yIGEgcHJvbWlzZSBmb3IgdGhhdCBcbiAgICogc3RyaW5nLlxuICAgKi9cbiAgdGhpcy5mcm9tU3RyaW5nID0gZnVuY3Rpb24gKHRlbXBsYXRlLCBwYXJhbXMpIHtcbiAgICByZXR1cm4gaXNGdW5jdGlvbih0ZW1wbGF0ZSkgPyB0ZW1wbGF0ZShwYXJhbXMpIDogdGVtcGxhdGU7XG4gIH07XG5cbiAgLyoqXG4gICAqIEBuZ2RvYyBmdW5jdGlvblxuICAgKiBAbmFtZSB1aS5yb3V0ZXIudXRpbC4kdGVtcGxhdGVGYWN0b3J5I2Zyb21VcmxcbiAgICogQG1ldGhvZE9mIHVpLnJvdXRlci51dGlsLiR0ZW1wbGF0ZUZhY3RvcnlcbiAgICogXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBMb2FkcyBhIHRlbXBsYXRlIGZyb20gdGhlIGEgVVJMIHZpYSBgJGh0dHBgIGFuZCBgJHRlbXBsYXRlQ2FjaGVgLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ3xGdW5jdGlvbn0gdXJsIHVybCBvZiB0aGUgdGVtcGxhdGUgdG8gbG9hZCwgb3IgYSBmdW5jdGlvbiBcbiAgICogdGhhdCByZXR1cm5zIGEgdXJsLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIFBhcmFtZXRlcnMgdG8gcGFzcyB0byB0aGUgdXJsIGZ1bmN0aW9uLlxuICAgKiBAcmV0dXJuIHtzdHJpbmd8UHJvbWlzZS48c3RyaW5nPn0gVGhlIHRlbXBsYXRlIGh0bWwgYXMgYSBzdHJpbmcsIG9yIGEgcHJvbWlzZSBcbiAgICogZm9yIHRoYXQgc3RyaW5nLlxuICAgKi9cbiAgdGhpcy5mcm9tVXJsID0gZnVuY3Rpb24gKHVybCwgcGFyYW1zKSB7XG4gICAgaWYgKGlzRnVuY3Rpb24odXJsKSkgdXJsID0gdXJsKHBhcmFtcyk7XG4gICAgaWYgKHVybCA9PSBudWxsKSByZXR1cm4gbnVsbDtcbiAgICBlbHNlIHJldHVybiAkaHR0cFxuICAgICAgICAuZ2V0KHVybCwgeyBjYWNoZTogJHRlbXBsYXRlQ2FjaGUsIGhlYWRlcnM6IHsgQWNjZXB0OiAndGV4dC9odG1sJyB9fSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHsgcmV0dXJuIHJlc3BvbnNlLmRhdGE7IH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBAbmdkb2MgZnVuY3Rpb25cbiAgICogQG5hbWUgdWkucm91dGVyLnV0aWwuJHRlbXBsYXRlRmFjdG9yeSNmcm9tUHJvdmlkZXJcbiAgICogQG1ldGhvZE9mIHVpLnJvdXRlci51dGlsLiR0ZW1wbGF0ZUZhY3RvcnlcbiAgICpcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIENyZWF0ZXMgYSB0ZW1wbGF0ZSBieSBpbnZva2luZyBhbiBpbmplY3RhYmxlIHByb3ZpZGVyIGZ1bmN0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcm92aWRlciBGdW5jdGlvbiB0byBpbnZva2UgdmlhIGAkaW5qZWN0b3IuaW52b2tlYFxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIFBhcmFtZXRlcnMgZm9yIHRoZSB0ZW1wbGF0ZS5cbiAgICogQHBhcmFtIHtPYmplY3R9IGxvY2FscyBMb2NhbHMgdG8gcGFzcyB0byBgaW52b2tlYC4gRGVmYXVsdHMgdG8gXG4gICAqIGB7IHBhcmFtczogcGFyYW1zIH1gLlxuICAgKiBAcmV0dXJuIHtzdHJpbmd8UHJvbWlzZS48c3RyaW5nPn0gVGhlIHRlbXBsYXRlIGh0bWwgYXMgYSBzdHJpbmcsIG9yIGEgcHJvbWlzZSBcbiAgICogZm9yIHRoYXQgc3RyaW5nLlxuICAgKi9cbiAgdGhpcy5mcm9tUHJvdmlkZXIgPSBmdW5jdGlvbiAocHJvdmlkZXIsIHBhcmFtcywgbG9jYWxzKSB7XG4gICAgcmV0dXJuICRpbmplY3Rvci5pbnZva2UocHJvdmlkZXIsIG51bGwsIGxvY2FscyB8fCB7IHBhcmFtczogcGFyYW1zIH0pO1xuICB9O1xufVxuXG5hbmd1bGFyLm1vZHVsZSgndWkucm91dGVyLnV0aWwnKS5zZXJ2aWNlKCckdGVtcGxhdGVGYWN0b3J5JywgJFRlbXBsYXRlRmFjdG9yeSk7XG5cbnZhciAkJFVNRlA7IC8vIHJlZmVyZW5jZSB0byAkVXJsTWF0Y2hlckZhY3RvcnlQcm92aWRlclxuXG4vKipcbiAqIEBuZ2RvYyBvYmplY3RcbiAqIEBuYW1lIHVpLnJvdXRlci51dGlsLnR5cGU6VXJsTWF0Y2hlclxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogTWF0Y2hlcyBVUkxzIGFnYWluc3QgcGF0dGVybnMgYW5kIGV4dHJhY3RzIG5hbWVkIHBhcmFtZXRlcnMgZnJvbSB0aGUgcGF0aCBvciB0aGUgc2VhcmNoXG4gKiBwYXJ0IG9mIHRoZSBVUkwuIEEgVVJMIHBhdHRlcm4gY29uc2lzdHMgb2YgYSBwYXRoIHBhdHRlcm4sIG9wdGlvbmFsbHkgZm9sbG93ZWQgYnkgJz8nIGFuZCBhIGxpc3RcbiAqIG9mIHNlYXJjaCBwYXJhbWV0ZXJzLiBNdWx0aXBsZSBzZWFyY2ggcGFyYW1ldGVyIG5hbWVzIGFyZSBzZXBhcmF0ZWQgYnkgJyYnLiBTZWFyY2ggcGFyYW1ldGVyc1xuICogZG8gbm90IGluZmx1ZW5jZSB3aGV0aGVyIG9yIG5vdCBhIFVSTCBpcyBtYXRjaGVkLCBidXQgdGhlaXIgdmFsdWVzIGFyZSBwYXNzZWQgdGhyb3VnaCBpbnRvXG4gKiB0aGUgbWF0Y2hlZCBwYXJhbWV0ZXJzIHJldHVybmVkIGJ5IHtAbGluayB1aS5yb3V0ZXIudXRpbC50eXBlOlVybE1hdGNoZXIjbWV0aG9kc19leGVjIGV4ZWN9LlxuICogXG4gKiBQYXRoIHBhcmFtZXRlciBwbGFjZWhvbGRlcnMgY2FuIGJlIHNwZWNpZmllZCB1c2luZyBzaW1wbGUgY29sb24vY2F0Y2gtYWxsIHN5bnRheCBvciBjdXJseSBicmFjZVxuICogc3ludGF4LCB3aGljaCBvcHRpb25hbGx5IGFsbG93cyBhIHJlZ3VsYXIgZXhwcmVzc2lvbiBmb3IgdGhlIHBhcmFtZXRlciB0byBiZSBzcGVjaWZpZWQ6XG4gKlxuICogKiBgJzonYCBuYW1lIC0gY29sb24gcGxhY2Vob2xkZXJcbiAqICogYCcqJ2AgbmFtZSAtIGNhdGNoLWFsbCBwbGFjZWhvbGRlclxuICogKiBgJ3snIG5hbWUgJ30nYCAtIGN1cmx5IHBsYWNlaG9sZGVyXG4gKiAqIGAneycgbmFtZSAnOicgcmVnZXhwfHR5cGUgJ30nYCAtIGN1cmx5IHBsYWNlaG9sZGVyIHdpdGggcmVnZXhwIG9yIHR5cGUgbmFtZS4gU2hvdWxkIHRoZVxuICogICByZWdleHAgaXRzZWxmIGNvbnRhaW4gY3VybHkgYnJhY2VzLCB0aGV5IG11c3QgYmUgaW4gbWF0Y2hlZCBwYWlycyBvciBlc2NhcGVkIHdpdGggYSBiYWNrc2xhc2guXG4gKlxuICogUGFyYW1ldGVyIG5hbWVzIG1heSBjb250YWluIG9ubHkgd29yZCBjaGFyYWN0ZXJzIChsYXRpbiBsZXR0ZXJzLCBkaWdpdHMsIGFuZCB1bmRlcnNjb3JlKSBhbmRcbiAqIG11c3QgYmUgdW5pcXVlIHdpdGhpbiB0aGUgcGF0dGVybiAoYWNyb3NzIGJvdGggcGF0aCBhbmQgc2VhcmNoIHBhcmFtZXRlcnMpLiBGb3IgY29sb24gXG4gKiBwbGFjZWhvbGRlcnMgb3IgY3VybHkgcGxhY2Vob2xkZXJzIHdpdGhvdXQgYW4gZXhwbGljaXQgcmVnZXhwLCBhIHBhdGggcGFyYW1ldGVyIG1hdGNoZXMgYW55XG4gKiBudW1iZXIgb2YgY2hhcmFjdGVycyBvdGhlciB0aGFuICcvJy4gRm9yIGNhdGNoLWFsbCBwbGFjZWhvbGRlcnMgdGhlIHBhdGggcGFyYW1ldGVyIG1hdGNoZXNcbiAqIGFueSBudW1iZXIgb2YgY2hhcmFjdGVycy5cbiAqIFxuICogRXhhbXBsZXM6XG4gKiBcbiAqICogYCcvaGVsbG8vJ2AgLSBNYXRjaGVzIG9ubHkgaWYgdGhlIHBhdGggaXMgZXhhY3RseSAnL2hlbGxvLycuIFRoZXJlIGlzIG5vIHNwZWNpYWwgdHJlYXRtZW50IGZvclxuICogICB0cmFpbGluZyBzbGFzaGVzLCBhbmQgcGF0dGVybnMgaGF2ZSB0byBtYXRjaCB0aGUgZW50aXJlIHBhdGgsIG5vdCBqdXN0IGEgcHJlZml4LlxuICogKiBgJy91c2VyLzppZCdgIC0gTWF0Y2hlcyAnL3VzZXIvYm9iJyBvciAnL3VzZXIvMTIzNCEhIScgb3IgZXZlbiAnL3VzZXIvJyBidXQgbm90ICcvdXNlcicgb3JcbiAqICAgJy91c2VyL2JvYi9kZXRhaWxzJy4gVGhlIHNlY29uZCBwYXRoIHNlZ21lbnQgd2lsbCBiZSBjYXB0dXJlZCBhcyB0aGUgcGFyYW1ldGVyICdpZCcuXG4gKiAqIGAnL3VzZXIve2lkfSdgIC0gU2FtZSBhcyB0aGUgcHJldmlvdXMgZXhhbXBsZSwgYnV0IHVzaW5nIGN1cmx5IGJyYWNlIHN5bnRheC5cbiAqICogYCcvdXNlci97aWQ6W14vXSp9J2AgLSBTYW1lIGFzIHRoZSBwcmV2aW91cyBleGFtcGxlLlxuICogKiBgJy91c2VyL3tpZDpbMC05YS1mQS1GXXsxLDh9fSdgIC0gU2ltaWxhciB0byB0aGUgcHJldmlvdXMgZXhhbXBsZSwgYnV0IG9ubHkgbWF0Y2hlcyBpZiB0aGUgaWRcbiAqICAgcGFyYW1ldGVyIGNvbnNpc3RzIG9mIDEgdG8gOCBoZXggZGlnaXRzLlxuICogKiBgJy9maWxlcy97cGF0aDouKn0nYCAtIE1hdGNoZXMgYW55IFVSTCBzdGFydGluZyB3aXRoICcvZmlsZXMvJyBhbmQgY2FwdHVyZXMgdGhlIHJlc3Qgb2YgdGhlXG4gKiAgIHBhdGggaW50byB0aGUgcGFyYW1ldGVyICdwYXRoJy5cbiAqICogYCcvZmlsZXMvKnBhdGgnYCAtIGRpdHRvLlxuICogKiBgJy9jYWxlbmRhci97c3RhcnQ6ZGF0ZX0nYCAtIE1hdGNoZXMgXCIvY2FsZW5kYXIvMjAxNC0xMS0xMlwiIChiZWNhdXNlIHRoZSBwYXR0ZXJuIGRlZmluZWRcbiAqICAgaW4gdGhlIGJ1aWx0LWluICBgZGF0ZWAgVHlwZSBtYXRjaGVzIGAyMDE0LTExLTEyYCkgYW5kIHByb3ZpZGVzIGEgRGF0ZSBvYmplY3QgaW4gJHN0YXRlUGFyYW1zLnN0YXJ0XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHBhdHRlcm4gIFRoZSBwYXR0ZXJuIHRvIGNvbXBpbGUgaW50byBhIG1hdGNoZXIuXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnICBBIGNvbmZpZ3VyYXRpb24gb2JqZWN0IGhhc2g6XG4gKiBAcGFyYW0ge09iamVjdD19IHBhcmVudE1hdGNoZXIgVXNlZCB0byBjb25jYXRlbmF0ZSB0aGUgcGF0dGVybi9jb25maWcgb250b1xuICogICBhbiBleGlzdGluZyBVcmxNYXRjaGVyXG4gKlxuICogKiBgY2FzZUluc2Vuc2l0aXZlYCAtIGB0cnVlYCBpZiBVUkwgbWF0Y2hpbmcgc2hvdWxkIGJlIGNhc2UgaW5zZW5zaXRpdmUsIG90aGVyd2lzZSBgZmFsc2VgLCB0aGUgZGVmYXVsdCB2YWx1ZSAoZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHkpIGlzIGBmYWxzZWAuXG4gKiAqIGBzdHJpY3RgIC0gYGZhbHNlYCBpZiBtYXRjaGluZyBhZ2FpbnN0IGEgVVJMIHdpdGggYSB0cmFpbGluZyBzbGFzaCBzaG91bGQgYmUgdHJlYXRlZCBhcyBlcXVpdmFsZW50IHRvIGEgVVJMIHdpdGhvdXQgYSB0cmFpbGluZyBzbGFzaCwgdGhlIGRlZmF1bHQgdmFsdWUgaXMgYHRydWVgLlxuICpcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBwcmVmaXggIEEgc3RhdGljIHByZWZpeCBvZiB0aGlzIHBhdHRlcm4uIFRoZSBtYXRjaGVyIGd1YXJhbnRlZXMgdGhhdCBhbnlcbiAqICAgVVJMIG1hdGNoaW5nIHRoaXMgbWF0Y2hlciAoaS5lLiBhbnkgc3RyaW5nIGZvciB3aGljaCB7QGxpbmsgdWkucm91dGVyLnV0aWwudHlwZTpVcmxNYXRjaGVyI21ldGhvZHNfZXhlYyBleGVjKCl9IHJldHVybnNcbiAqICAgbm9uLW51bGwpIHdpbGwgc3RhcnQgd2l0aCB0aGlzIHByZWZpeC5cbiAqXG4gKiBAcHJvcGVydHkge3N0cmluZ30gc291cmNlICBUaGUgcGF0dGVybiB0aGF0IHdhcyBwYXNzZWQgaW50byB0aGUgY29uc3RydWN0b3JcbiAqXG4gKiBAcHJvcGVydHkge3N0cmluZ30gc291cmNlUGF0aCAgVGhlIHBhdGggcG9ydGlvbiBvZiB0aGUgc291cmNlIHByb3BlcnR5XG4gKlxuICogQHByb3BlcnR5IHtzdHJpbmd9IHNvdXJjZVNlYXJjaCAgVGhlIHNlYXJjaCBwb3J0aW9uIG9mIHRoZSBzb3VyY2UgcHJvcGVydHlcbiAqXG4gKiBAcHJvcGVydHkge3N0cmluZ30gcmVnZXggIFRoZSBjb25zdHJ1Y3RlZCByZWdleCB0aGF0IHdpbGwgYmUgdXNlZCB0byBtYXRjaCBhZ2FpbnN0IHRoZSB1cmwgd2hlbiBcbiAqICAgaXQgaXMgdGltZSB0byBkZXRlcm1pbmUgd2hpY2ggdXJsIHdpbGwgbWF0Y2guXG4gKlxuICogQHJldHVybnMge09iamVjdH0gIE5ldyBgVXJsTWF0Y2hlcmAgb2JqZWN0XG4gKi9cbmZ1bmN0aW9uIFVybE1hdGNoZXIocGF0dGVybiwgY29uZmlnLCBwYXJlbnRNYXRjaGVyKSB7XG4gIGNvbmZpZyA9IGV4dGVuZCh7IHBhcmFtczoge30gfSwgaXNPYmplY3QoY29uZmlnKSA/IGNvbmZpZyA6IHt9KTtcblxuICAvLyBGaW5kIGFsbCBwbGFjZWhvbGRlcnMgYW5kIGNyZWF0ZSBhIGNvbXBpbGVkIHBhdHRlcm4sIHVzaW5nIGVpdGhlciBjbGFzc2ljIG9yIGN1cmx5IHN5bnRheDpcbiAgLy8gICAnKicgbmFtZVxuICAvLyAgICc6JyBuYW1lXG4gIC8vICAgJ3snIG5hbWUgJ30nXG4gIC8vICAgJ3snIG5hbWUgJzonIHJlZ2V4cCAnfSdcbiAgLy8gVGhlIHJlZ3VsYXIgZXhwcmVzc2lvbiBpcyBzb21ld2hhdCBjb21wbGljYXRlZCBkdWUgdG8gdGhlIG5lZWQgdG8gYWxsb3cgY3VybHkgYnJhY2VzXG4gIC8vIGluc2lkZSB0aGUgcmVndWxhciBleHByZXNzaW9uLiBUaGUgcGxhY2Vob2xkZXIgcmVnZXhwIGJyZWFrcyBkb3duIGFzIGZvbGxvd3M6XG4gIC8vICAgIChbOipdKShbXFx3XFxbXFxdXSspICAgICAgICAgICAgICAtIGNsYXNzaWMgcGxhY2Vob2xkZXIgKCQxIC8gJDIpIChzZWFyY2ggdmVyc2lvbiBoYXMgLSBmb3Igc25ha2UtY2FzZSlcbiAgLy8gICAgXFx7KFtcXHdcXFtcXF1dKykoPzpcXDooIC4uLiApKT9cXH0gIC0gY3VybHkgYnJhY2UgcGxhY2Vob2xkZXIgKCQzKSB3aXRoIG9wdGlvbmFsIHJlZ2V4cC90eXBlIC4uLiAoJDQpIChzZWFyY2ggdmVyc2lvbiBoYXMgLSBmb3Igc25ha2UtY2FzZVxuICAvLyAgICAoPzogLi4uIHwgLi4uIHwgLi4uICkrICAgICAgICAgLSB0aGUgcmVnZXhwIGNvbnNpc3RzIG9mIGFueSBudW1iZXIgb2YgYXRvbXMsIGFuIGF0b20gYmVpbmcgZWl0aGVyXG4gIC8vICAgIFtee31cXFxcXSsgICAgICAgICAgICAgICAgICAgICAgIC0gYW55dGhpbmcgb3RoZXIgdGhhbiBjdXJseSBicmFjZXMgb3IgYmFja3NsYXNoXG4gIC8vICAgIFxcXFwuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC0gYSBiYWNrc2xhc2ggZXNjYXBlXG4gIC8vICAgIFxceyg/Oltee31cXFxcXSt8XFxcXC4pKlxcfSAgICAgICAgICAtIGEgbWF0Y2hlZCBzZXQgb2YgY3VybHkgYnJhY2VzIGNvbnRhaW5pbmcgb3RoZXIgYXRvbXNcbiAgdmFyIHBsYWNlaG9sZGVyICAgICAgID0gLyhbOipdKShbXFx3XFxbXFxdXSspfFxceyhbXFx3XFxbXFxdXSspKD86XFw6KCg/Oltee31cXFxcXSt8XFxcXC58XFx7KD86W157fVxcXFxdK3xcXFxcLikqXFx9KSspKT9cXH0vZyxcbiAgICAgIHNlYXJjaFBsYWNlaG9sZGVyID0gLyhbOl0/KShbXFx3XFxbXFxdLV0rKXxcXHsoW1xcd1xcW1xcXS1dKykoPzpcXDooKD86W157fVxcXFxdK3xcXFxcLnxcXHsoPzpbXnt9XFxcXF0rfFxcXFwuKSpcXH0pKykpP1xcfS9nLFxuICAgICAgY29tcGlsZWQgPSAnXicsIGxhc3QgPSAwLCBtLFxuICAgICAgc2VnbWVudHMgPSB0aGlzLnNlZ21lbnRzID0gW10sXG4gICAgICBwYXJlbnRQYXJhbXMgPSBwYXJlbnRNYXRjaGVyID8gcGFyZW50TWF0Y2hlci5wYXJhbXMgOiB7fSxcbiAgICAgIHBhcmFtcyA9IHRoaXMucGFyYW1zID0gcGFyZW50TWF0Y2hlciA/IHBhcmVudE1hdGNoZXIucGFyYW1zLiQkbmV3KCkgOiBuZXcgJCRVTUZQLlBhcmFtU2V0KCksXG4gICAgICBwYXJhbU5hbWVzID0gW107XG5cbiAgZnVuY3Rpb24gYWRkUGFyYW1ldGVyKGlkLCB0eXBlLCBjb25maWcsIGxvY2F0aW9uKSB7XG4gICAgcGFyYW1OYW1lcy5wdXNoKGlkKTtcbiAgICBpZiAocGFyZW50UGFyYW1zW2lkXSkgcmV0dXJuIHBhcmVudFBhcmFtc1tpZF07XG4gICAgaWYgKCEvXlxcdysoLStcXHcrKSooPzpcXFtcXF0pPyQvLnRlc3QoaWQpKSB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHBhcmFtZXRlciBuYW1lICdcIiArIGlkICsgXCInIGluIHBhdHRlcm4gJ1wiICsgcGF0dGVybiArIFwiJ1wiKTtcbiAgICBpZiAocGFyYW1zW2lkXSkgdGhyb3cgbmV3IEVycm9yKFwiRHVwbGljYXRlIHBhcmFtZXRlciBuYW1lICdcIiArIGlkICsgXCInIGluIHBhdHRlcm4gJ1wiICsgcGF0dGVybiArIFwiJ1wiKTtcbiAgICBwYXJhbXNbaWRdID0gbmV3ICQkVU1GUC5QYXJhbShpZCwgdHlwZSwgY29uZmlnLCBsb2NhdGlvbik7XG4gICAgcmV0dXJuIHBhcmFtc1tpZF07XG4gIH1cblxuICBmdW5jdGlvbiBxdW90ZVJlZ0V4cChzdHJpbmcsIHBhdHRlcm4sIHNxdWFzaCkge1xuICAgIHZhciBzdXJyb3VuZFBhdHRlcm4gPSBbJycsJyddLCByZXN1bHQgPSBzdHJpbmcucmVwbGFjZSgvW1xcXFxcXFtcXF1cXF4kKis/LigpfHt9XS9nLCBcIlxcXFwkJlwiKTtcbiAgICBpZiAoIXBhdHRlcm4pIHJldHVybiByZXN1bHQ7XG4gICAgc3dpdGNoKHNxdWFzaCkge1xuICAgICAgY2FzZSBmYWxzZTogc3Vycm91bmRQYXR0ZXJuID0gWycoJywgJyknXTsgICBicmVhaztcbiAgICAgIGNhc2UgdHJ1ZTogIHN1cnJvdW5kUGF0dGVybiA9IFsnPygnLCAnKT8nXTsgYnJlYWs7XG4gICAgICBkZWZhdWx0OiAgICBzdXJyb3VuZFBhdHRlcm4gPSBbJygnICsgc3F1YXNoICsgXCJ8XCIsICcpPyddOyAgYnJlYWs7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQgKyBzdXJyb3VuZFBhdHRlcm5bMF0gKyBwYXR0ZXJuICsgc3Vycm91bmRQYXR0ZXJuWzFdO1xuICB9XG5cbiAgdGhpcy5zb3VyY2UgPSBwYXR0ZXJuO1xuXG4gIC8vIFNwbGl0IGludG8gc3RhdGljIHNlZ21lbnRzIHNlcGFyYXRlZCBieSBwYXRoIHBhcmFtZXRlciBwbGFjZWhvbGRlcnMuXG4gIC8vIFRoZSBudW1iZXIgb2Ygc2VnbWVudHMgaXMgYWx3YXlzIDEgbW9yZSB0aGFuIHRoZSBudW1iZXIgb2YgcGFyYW1ldGVycy5cbiAgZnVuY3Rpb24gbWF0Y2hEZXRhaWxzKG0sIGlzU2VhcmNoKSB7XG4gICAgdmFyIGlkLCByZWdleHAsIHNlZ21lbnQsIHR5cGUsIGNmZywgYXJyYXlNb2RlO1xuICAgIGlkICAgICAgICAgID0gbVsyXSB8fCBtWzNdOyAvLyBJRVs3OF0gcmV0dXJucyAnJyBmb3IgdW5tYXRjaGVkIGdyb3VwcyBpbnN0ZWFkIG9mIG51bGxcbiAgICBjZmcgICAgICAgICA9IGNvbmZpZy5wYXJhbXNbaWRdO1xuICAgIHNlZ21lbnQgICAgID0gcGF0dGVybi5zdWJzdHJpbmcobGFzdCwgbS5pbmRleCk7XG4gICAgcmVnZXhwICAgICAgPSBpc1NlYXJjaCA/IG1bNF0gOiBtWzRdIHx8IChtWzFdID09ICcqJyA/ICcuKicgOiBudWxsKTtcbiAgICB0eXBlICAgICAgICA9ICQkVU1GUC50eXBlKHJlZ2V4cCB8fCBcInN0cmluZ1wiKSB8fCBpbmhlcml0KCQkVU1GUC50eXBlKFwic3RyaW5nXCIpLCB7IHBhdHRlcm46IG5ldyBSZWdFeHAocmVnZXhwKSB9KTtcbiAgICByZXR1cm4ge1xuICAgICAgaWQ6IGlkLCByZWdleHA6IHJlZ2V4cCwgc2VnbWVudDogc2VnbWVudCwgdHlwZTogdHlwZSwgY2ZnOiBjZmdcbiAgICB9O1xuICB9XG5cbiAgdmFyIHAsIHBhcmFtLCBzZWdtZW50O1xuICB3aGlsZSAoKG0gPSBwbGFjZWhvbGRlci5leGVjKHBhdHRlcm4pKSkge1xuICAgIHAgPSBtYXRjaERldGFpbHMobSwgZmFsc2UpO1xuICAgIGlmIChwLnNlZ21lbnQuaW5kZXhPZignPycpID49IDApIGJyZWFrOyAvLyB3ZSdyZSBpbnRvIHRoZSBzZWFyY2ggcGFydFxuXG4gICAgcGFyYW0gPSBhZGRQYXJhbWV0ZXIocC5pZCwgcC50eXBlLCBwLmNmZywgXCJwYXRoXCIpO1xuICAgIGNvbXBpbGVkICs9IHF1b3RlUmVnRXhwKHAuc2VnbWVudCwgcGFyYW0udHlwZS5wYXR0ZXJuLnNvdXJjZSwgcGFyYW0uc3F1YXNoKTtcbiAgICBzZWdtZW50cy5wdXNoKHAuc2VnbWVudCk7XG4gICAgbGFzdCA9IHBsYWNlaG9sZGVyLmxhc3RJbmRleDtcbiAgfVxuICBzZWdtZW50ID0gcGF0dGVybi5zdWJzdHJpbmcobGFzdCk7XG5cbiAgLy8gRmluZCBhbnkgc2VhcmNoIHBhcmFtZXRlciBuYW1lcyBhbmQgcmVtb3ZlIHRoZW0gZnJvbSB0aGUgbGFzdCBzZWdtZW50XG4gIHZhciBpID0gc2VnbWVudC5pbmRleE9mKCc/Jyk7XG5cbiAgaWYgKGkgPj0gMCkge1xuICAgIHZhciBzZWFyY2ggPSB0aGlzLnNvdXJjZVNlYXJjaCA9IHNlZ21lbnQuc3Vic3RyaW5nKGkpO1xuICAgIHNlZ21lbnQgPSBzZWdtZW50LnN1YnN0cmluZygwLCBpKTtcbiAgICB0aGlzLnNvdXJjZVBhdGggPSBwYXR0ZXJuLnN1YnN0cmluZygwLCBsYXN0ICsgaSk7XG5cbiAgICBpZiAoc2VhcmNoLmxlbmd0aCA+IDApIHtcbiAgICAgIGxhc3QgPSAwO1xuICAgICAgd2hpbGUgKChtID0gc2VhcmNoUGxhY2Vob2xkZXIuZXhlYyhzZWFyY2gpKSkge1xuICAgICAgICBwID0gbWF0Y2hEZXRhaWxzKG0sIHRydWUpO1xuICAgICAgICBwYXJhbSA9IGFkZFBhcmFtZXRlcihwLmlkLCBwLnR5cGUsIHAuY2ZnLCBcInNlYXJjaFwiKTtcbiAgICAgICAgbGFzdCA9IHBsYWNlaG9sZGVyLmxhc3RJbmRleDtcbiAgICAgICAgLy8gY2hlY2sgaWYgPyZcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5zb3VyY2VQYXRoID0gcGF0dGVybjtcbiAgICB0aGlzLnNvdXJjZVNlYXJjaCA9ICcnO1xuICB9XG5cbiAgY29tcGlsZWQgKz0gcXVvdGVSZWdFeHAoc2VnbWVudCkgKyAoY29uZmlnLnN0cmljdCA9PT0gZmFsc2UgPyAnXFwvPycgOiAnJykgKyAnJCc7XG4gIHNlZ21lbnRzLnB1c2goc2VnbWVudCk7XG5cbiAgdGhpcy5yZWdleHAgPSBuZXcgUmVnRXhwKGNvbXBpbGVkLCBjb25maWcuY2FzZUluc2Vuc2l0aXZlID8gJ2knIDogdW5kZWZpbmVkKTtcbiAgdGhpcy5wcmVmaXggPSBzZWdtZW50c1swXTtcbiAgdGhpcy4kJHBhcmFtTmFtZXMgPSBwYXJhbU5hbWVzO1xufVxuXG4vKipcbiAqIEBuZ2RvYyBmdW5jdGlvblxuICogQG5hbWUgdWkucm91dGVyLnV0aWwudHlwZTpVcmxNYXRjaGVyI2NvbmNhdFxuICogQG1ldGhvZE9mIHVpLnJvdXRlci51dGlsLnR5cGU6VXJsTWF0Y2hlclxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJucyBhIG5ldyBtYXRjaGVyIGZvciBhIHBhdHRlcm4gY29uc3RydWN0ZWQgYnkgYXBwZW5kaW5nIHRoZSBwYXRoIHBhcnQgYW5kIGFkZGluZyB0aGVcbiAqIHNlYXJjaCBwYXJhbWV0ZXJzIG9mIHRoZSBzcGVjaWZpZWQgcGF0dGVybiB0byB0aGlzIHBhdHRlcm4uIFRoZSBjdXJyZW50IHBhdHRlcm4gaXMgbm90XG4gKiBtb2RpZmllZC4gVGhpcyBjYW4gYmUgdW5kZXJzdG9vZCBhcyBjcmVhdGluZyBhIHBhdHRlcm4gZm9yIFVSTHMgdGhhdCBhcmUgcmVsYXRpdmUgdG8gKG9yXG4gKiBzdWZmaXhlcyBvZikgdGhlIGN1cnJlbnQgcGF0dGVybi5cbiAqXG4gKiBAZXhhbXBsZVxuICogVGhlIGZvbGxvd2luZyB0d28gbWF0Y2hlcnMgYXJlIGVxdWl2YWxlbnQ6XG4gKiA8cHJlPlxuICogbmV3IFVybE1hdGNoZXIoJy91c2VyL3tpZH0/cScpLmNvbmNhdCgnL2RldGFpbHM/ZGF0ZScpO1xuICogbmV3IFVybE1hdGNoZXIoJy91c2VyL3tpZH0vZGV0YWlscz9xJmRhdGUnKTtcbiAqIDwvcHJlPlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXR0ZXJuICBUaGUgcGF0dGVybiB0byBhcHBlbmQuXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnICBBbiBvYmplY3QgaGFzaCBvZiB0aGUgY29uZmlndXJhdGlvbiBmb3IgdGhlIG1hdGNoZXIuXG4gKiBAcmV0dXJucyB7VXJsTWF0Y2hlcn0gIEEgbWF0Y2hlciBmb3IgdGhlIGNvbmNhdGVuYXRlZCBwYXR0ZXJuLlxuICovXG5VcmxNYXRjaGVyLnByb3RvdHlwZS5jb25jYXQgPSBmdW5jdGlvbiAocGF0dGVybiwgY29uZmlnKSB7XG4gIC8vIEJlY2F1c2Ugb3JkZXIgb2Ygc2VhcmNoIHBhcmFtZXRlcnMgaXMgaXJyZWxldmFudCwgd2UgY2FuIGFkZCBvdXIgb3duIHNlYXJjaFxuICAvLyBwYXJhbWV0ZXJzIHRvIHRoZSBlbmQgb2YgdGhlIG5ldyBwYXR0ZXJuLiBQYXJzZSB0aGUgbmV3IHBhdHRlcm4gYnkgaXRzZWxmXG4gIC8vIGFuZCB0aGVuIGpvaW4gdGhlIGJpdHMgdG9nZXRoZXIsIGJ1dCBpdCdzIG11Y2ggZWFzaWVyIHRvIGRvIHRoaXMgb24gYSBzdHJpbmcgbGV2ZWwuXG4gIHZhciBkZWZhdWx0Q29uZmlnID0ge1xuICAgIGNhc2VJbnNlbnNpdGl2ZTogJCRVTUZQLmNhc2VJbnNlbnNpdGl2ZSgpLFxuICAgIHN0cmljdDogJCRVTUZQLnN0cmljdE1vZGUoKSxcbiAgICBzcXVhc2g6ICQkVU1GUC5kZWZhdWx0U3F1YXNoUG9saWN5KClcbiAgfTtcbiAgcmV0dXJuIG5ldyBVcmxNYXRjaGVyKHRoaXMuc291cmNlUGF0aCArIHBhdHRlcm4gKyB0aGlzLnNvdXJjZVNlYXJjaCwgZXh0ZW5kKGRlZmF1bHRDb25maWcsIGNvbmZpZyksIHRoaXMpO1xufTtcblxuVXJsTWF0Y2hlci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLnNvdXJjZTtcbn07XG5cbi8qKlxuICogQG5nZG9jIGZ1bmN0aW9uXG4gKiBAbmFtZSB1aS5yb3V0ZXIudXRpbC50eXBlOlVybE1hdGNoZXIjZXhlY1xuICogQG1ldGhvZE9mIHVpLnJvdXRlci51dGlsLnR5cGU6VXJsTWF0Y2hlclxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogVGVzdHMgdGhlIHNwZWNpZmllZCBwYXRoIGFnYWluc3QgdGhpcyBtYXRjaGVyLCBhbmQgcmV0dXJucyBhbiBvYmplY3QgY29udGFpbmluZyB0aGUgY2FwdHVyZWRcbiAqIHBhcmFtZXRlciB2YWx1ZXMsIG9yIG51bGwgaWYgdGhlIHBhdGggZG9lcyBub3QgbWF0Y2guIFRoZSByZXR1cm5lZCBvYmplY3QgY29udGFpbnMgdGhlIHZhbHVlc1xuICogb2YgYW55IHNlYXJjaCBwYXJhbWV0ZXJzIHRoYXQgYXJlIG1lbnRpb25lZCBpbiB0aGUgcGF0dGVybiwgYnV0IHRoZWlyIHZhbHVlIG1heSBiZSBudWxsIGlmXG4gKiB0aGV5IGFyZSBub3QgcHJlc2VudCBpbiBgc2VhcmNoUGFyYW1zYC4gVGhpcyBtZWFucyB0aGF0IHNlYXJjaCBwYXJhbWV0ZXJzIGFyZSBhbHdheXMgdHJlYXRlZFxuICogYXMgb3B0aW9uYWwuXG4gKlxuICogQGV4YW1wbGVcbiAqIDxwcmU+XG4gKiBuZXcgVXJsTWF0Y2hlcignL3VzZXIve2lkfT9xJnInKS5leGVjKCcvdXNlci9ib2InLCB7XG4gKiAgIHg6ICcxJywgcTogJ2hlbGxvJ1xuICogfSk7XG4gKiAvLyByZXR1cm5zIHsgaWQ6ICdib2InLCBxOiAnaGVsbG8nLCByOiBudWxsIH1cbiAqIDwvcHJlPlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoICBUaGUgVVJMIHBhdGggdG8gbWF0Y2gsIGUuZy4gYCRsb2NhdGlvbi5wYXRoKClgLlxuICogQHBhcmFtIHtPYmplY3R9IHNlYXJjaFBhcmFtcyAgVVJMIHNlYXJjaCBwYXJhbWV0ZXJzLCBlLmcuIGAkbG9jYXRpb24uc2VhcmNoKClgLlxuICogQHJldHVybnMge09iamVjdH0gIFRoZSBjYXB0dXJlZCBwYXJhbWV0ZXIgdmFsdWVzLlxuICovXG5VcmxNYXRjaGVyLnByb3RvdHlwZS5leGVjID0gZnVuY3Rpb24gKHBhdGgsIHNlYXJjaFBhcmFtcykge1xuICB2YXIgbSA9IHRoaXMucmVnZXhwLmV4ZWMocGF0aCk7XG4gIGlmICghbSkgcmV0dXJuIG51bGw7XG4gIHNlYXJjaFBhcmFtcyA9IHNlYXJjaFBhcmFtcyB8fCB7fTtcblxuICB2YXIgcGFyYW1OYW1lcyA9IHRoaXMucGFyYW1ldGVycygpLCBuVG90YWwgPSBwYXJhbU5hbWVzLmxlbmd0aCxcbiAgICBuUGF0aCA9IHRoaXMuc2VnbWVudHMubGVuZ3RoIC0gMSxcbiAgICB2YWx1ZXMgPSB7fSwgaSwgaiwgY2ZnLCBwYXJhbU5hbWU7XG5cbiAgaWYgKG5QYXRoICE9PSBtLmxlbmd0aCAtIDEpIHRocm93IG5ldyBFcnJvcihcIlVuYmFsYW5jZWQgY2FwdHVyZSBncm91cCBpbiByb3V0ZSAnXCIgKyB0aGlzLnNvdXJjZSArIFwiJ1wiKTtcblxuICBmdW5jdGlvbiBkZWNvZGVQYXRoQXJyYXkoc3RyaW5nKSB7XG4gICAgZnVuY3Rpb24gcmV2ZXJzZVN0cmluZyhzdHIpIHsgcmV0dXJuIHN0ci5zcGxpdChcIlwiKS5yZXZlcnNlKCkuam9pbihcIlwiKTsgfVxuICAgIGZ1bmN0aW9uIHVucXVvdGVEYXNoZXMoc3RyKSB7IHJldHVybiBzdHIucmVwbGFjZSgvXFxcXC0vLCBcIi1cIik7IH1cblxuICAgIHZhciBzcGxpdCA9IHJldmVyc2VTdHJpbmcoc3RyaW5nKS5zcGxpdCgvLSg/IVxcXFwpLyk7XG4gICAgdmFyIGFsbFJldmVyc2VkID0gbWFwKHNwbGl0LCByZXZlcnNlU3RyaW5nKTtcbiAgICByZXR1cm4gbWFwKGFsbFJldmVyc2VkLCB1bnF1b3RlRGFzaGVzKS5yZXZlcnNlKCk7XG4gIH1cblxuICBmb3IgKGkgPSAwOyBpIDwgblBhdGg7IGkrKykge1xuICAgIHBhcmFtTmFtZSA9IHBhcmFtTmFtZXNbaV07XG4gICAgdmFyIHBhcmFtID0gdGhpcy5wYXJhbXNbcGFyYW1OYW1lXTtcbiAgICB2YXIgcGFyYW1WYWwgPSBtW2krMV07XG4gICAgLy8gaWYgdGhlIHBhcmFtIHZhbHVlIG1hdGNoZXMgYSBwcmUtcmVwbGFjZSBwYWlyLCByZXBsYWNlIHRoZSB2YWx1ZSBiZWZvcmUgZGVjb2RpbmcuXG4gICAgZm9yIChqID0gMDsgaiA8IHBhcmFtLnJlcGxhY2U7IGorKykge1xuICAgICAgaWYgKHBhcmFtLnJlcGxhY2Vbal0uZnJvbSA9PT0gcGFyYW1WYWwpIHBhcmFtVmFsID0gcGFyYW0ucmVwbGFjZVtqXS50bztcbiAgICB9XG4gICAgaWYgKHBhcmFtVmFsICYmIHBhcmFtLmFycmF5ID09PSB0cnVlKSBwYXJhbVZhbCA9IGRlY29kZVBhdGhBcnJheShwYXJhbVZhbCk7XG4gICAgdmFsdWVzW3BhcmFtTmFtZV0gPSBwYXJhbS52YWx1ZShwYXJhbVZhbCk7XG4gIH1cbiAgZm9yICgvKiovOyBpIDwgblRvdGFsOyBpKyspIHtcbiAgICBwYXJhbU5hbWUgPSBwYXJhbU5hbWVzW2ldO1xuICAgIHZhbHVlc1twYXJhbU5hbWVdID0gdGhpcy5wYXJhbXNbcGFyYW1OYW1lXS52YWx1ZShzZWFyY2hQYXJhbXNbcGFyYW1OYW1lXSk7XG4gIH1cblxuICByZXR1cm4gdmFsdWVzO1xufTtcblxuLyoqXG4gKiBAbmdkb2MgZnVuY3Rpb25cbiAqIEBuYW1lIHVpLnJvdXRlci51dGlsLnR5cGU6VXJsTWF0Y2hlciNwYXJhbWV0ZXJzXG4gKiBAbWV0aG9kT2YgdWkucm91dGVyLnV0aWwudHlwZTpVcmxNYXRjaGVyXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm5zIHRoZSBuYW1lcyBvZiBhbGwgcGF0aCBhbmQgc2VhcmNoIHBhcmFtZXRlcnMgb2YgdGhpcyBwYXR0ZXJuIGluIGFuIHVuc3BlY2lmaWVkIG9yZGVyLlxuICogXG4gKiBAcmV0dXJucyB7QXJyYXkuPHN0cmluZz59ICBBbiBhcnJheSBvZiBwYXJhbWV0ZXIgbmFtZXMuIE11c3QgYmUgdHJlYXRlZCBhcyByZWFkLW9ubHkuIElmIHRoZVxuICogICAgcGF0dGVybiBoYXMgbm8gcGFyYW1ldGVycywgYW4gZW1wdHkgYXJyYXkgaXMgcmV0dXJuZWQuXG4gKi9cblVybE1hdGNoZXIucHJvdG90eXBlLnBhcmFtZXRlcnMgPSBmdW5jdGlvbiAocGFyYW0pIHtcbiAgaWYgKCFpc0RlZmluZWQocGFyYW0pKSByZXR1cm4gdGhpcy4kJHBhcmFtTmFtZXM7XG4gIHJldHVybiB0aGlzLnBhcmFtc1twYXJhbV0gfHwgbnVsbDtcbn07XG5cbi8qKlxuICogQG5nZG9jIGZ1bmN0aW9uXG4gKiBAbmFtZSB1aS5yb3V0ZXIudXRpbC50eXBlOlVybE1hdGNoZXIjdmFsaWRhdGVcbiAqIEBtZXRob2RPZiB1aS5yb3V0ZXIudXRpbC50eXBlOlVybE1hdGNoZXJcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIENoZWNrcyBhbiBvYmplY3QgaGFzaCBvZiBwYXJhbWV0ZXJzIHRvIHZhbGlkYXRlIHRoZWlyIGNvcnJlY3RuZXNzIGFjY29yZGluZyB0byB0aGUgcGFyYW1ldGVyXG4gKiB0eXBlcyBvZiB0aGlzIGBVcmxNYXRjaGVyYC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIFRoZSBvYmplY3QgaGFzaCBvZiBwYXJhbWV0ZXJzIHRvIHZhbGlkYXRlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBwYXJhbXNgIHZhbGlkYXRlcywgb3RoZXJ3aXNlIGBmYWxzZWAuXG4gKi9cblVybE1hdGNoZXIucHJvdG90eXBlLnZhbGlkYXRlcyA9IGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgcmV0dXJuIHRoaXMucGFyYW1zLiQkdmFsaWRhdGVzKHBhcmFtcyk7XG59O1xuXG4vKipcbiAqIEBuZ2RvYyBmdW5jdGlvblxuICogQG5hbWUgdWkucm91dGVyLnV0aWwudHlwZTpVcmxNYXRjaGVyI2Zvcm1hdFxuICogQG1ldGhvZE9mIHVpLnJvdXRlci51dGlsLnR5cGU6VXJsTWF0Y2hlclxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQ3JlYXRlcyBhIFVSTCB0aGF0IG1hdGNoZXMgdGhpcyBwYXR0ZXJuIGJ5IHN1YnN0aXR1dGluZyB0aGUgc3BlY2lmaWVkIHZhbHVlc1xuICogZm9yIHRoZSBwYXRoIGFuZCBzZWFyY2ggcGFyYW1ldGVycy4gTnVsbCB2YWx1ZXMgZm9yIHBhdGggcGFyYW1ldGVycyBhcmVcbiAqIHRyZWF0ZWQgYXMgZW1wdHkgc3RyaW5ncy5cbiAqXG4gKiBAZXhhbXBsZVxuICogPHByZT5cbiAqIG5ldyBVcmxNYXRjaGVyKCcvdXNlci97aWR9P3EnKS5mb3JtYXQoeyBpZDonYm9iJywgcToneWVzJyB9KTtcbiAqIC8vIHJldHVybnMgJy91c2VyL2JvYj9xPXllcydcbiAqIDwvcHJlPlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWx1ZXMgIHRoZSB2YWx1ZXMgdG8gc3Vic3RpdHV0ZSBmb3IgdGhlIHBhcmFtZXRlcnMgaW4gdGhpcyBwYXR0ZXJuLlxuICogQHJldHVybnMge3N0cmluZ30gIHRoZSBmb3JtYXR0ZWQgVVJMIChwYXRoIGFuZCBvcHRpb25hbGx5IHNlYXJjaCBwYXJ0KS5cbiAqL1xuVXJsTWF0Y2hlci5wcm90b3R5cGUuZm9ybWF0ID0gZnVuY3Rpb24gKHZhbHVlcykge1xuICB2YWx1ZXMgPSB2YWx1ZXMgfHwge307XG4gIHZhciBzZWdtZW50cyA9IHRoaXMuc2VnbWVudHMsIHBhcmFtcyA9IHRoaXMucGFyYW1ldGVycygpLCBwYXJhbXNldCA9IHRoaXMucGFyYW1zO1xuICBpZiAoIXRoaXMudmFsaWRhdGVzKHZhbHVlcykpIHJldHVybiBudWxsO1xuXG4gIHZhciBpLCBzZWFyY2ggPSBmYWxzZSwgblBhdGggPSBzZWdtZW50cy5sZW5ndGggLSAxLCBuVG90YWwgPSBwYXJhbXMubGVuZ3RoLCByZXN1bHQgPSBzZWdtZW50c1swXTtcblxuICBmdW5jdGlvbiBlbmNvZGVEYXNoZXMoc3RyKSB7IC8vIFJlcGxhY2UgZGFzaGVzIHdpdGggZW5jb2RlZCBcIlxcLVwiXG4gICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChzdHIpLnJlcGxhY2UoLy0vZywgZnVuY3Rpb24oYykgeyByZXR1cm4gJyU1QyUnICsgYy5jaGFyQ29kZUF0KDApLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpOyB9KTtcbiAgfVxuXG4gIGZvciAoaSA9IDA7IGkgPCBuVG90YWw7IGkrKykge1xuICAgIHZhciBpc1BhdGhQYXJhbSA9IGkgPCBuUGF0aDtcbiAgICB2YXIgbmFtZSA9IHBhcmFtc1tpXSwgcGFyYW0gPSBwYXJhbXNldFtuYW1lXSwgdmFsdWUgPSBwYXJhbS52YWx1ZSh2YWx1ZXNbbmFtZV0pO1xuICAgIHZhciBpc0RlZmF1bHRWYWx1ZSA9IHBhcmFtLmlzT3B0aW9uYWwgJiYgcGFyYW0udHlwZS5lcXVhbHMocGFyYW0udmFsdWUoKSwgdmFsdWUpO1xuICAgIHZhciBzcXVhc2ggPSBpc0RlZmF1bHRWYWx1ZSA/IHBhcmFtLnNxdWFzaCA6IGZhbHNlO1xuICAgIHZhciBlbmNvZGVkID0gcGFyYW0udHlwZS5lbmNvZGUodmFsdWUpO1xuXG4gICAgaWYgKGlzUGF0aFBhcmFtKSB7XG4gICAgICB2YXIgbmV4dFNlZ21lbnQgPSBzZWdtZW50c1tpICsgMV07XG4gICAgICBpZiAoc3F1YXNoID09PSBmYWxzZSkge1xuICAgICAgICBpZiAoZW5jb2RlZCAhPSBudWxsKSB7XG4gICAgICAgICAgaWYgKGlzQXJyYXkoZW5jb2RlZCkpIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSBtYXAoZW5jb2RlZCwgZW5jb2RlRGFzaGVzKS5qb2luKFwiLVwiKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0ICs9IGVuY29kZVVSSUNvbXBvbmVudChlbmNvZGVkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0ICs9IG5leHRTZWdtZW50O1xuICAgICAgfSBlbHNlIGlmIChzcXVhc2ggPT09IHRydWUpIHtcbiAgICAgICAgdmFyIGNhcHR1cmUgPSByZXN1bHQubWF0Y2goL1xcLyQvKSA/IC9cXC8/KC4qKS8gOiAvKC4qKS87XG4gICAgICAgIHJlc3VsdCArPSBuZXh0U2VnbWVudC5tYXRjaChjYXB0dXJlKVsxXTtcbiAgICAgIH0gZWxzZSBpZiAoaXNTdHJpbmcoc3F1YXNoKSkge1xuICAgICAgICByZXN1bHQgKz0gc3F1YXNoICsgbmV4dFNlZ21lbnQ7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChlbmNvZGVkID09IG51bGwgfHwgKGlzRGVmYXVsdFZhbHVlICYmIHNxdWFzaCAhPT0gZmFsc2UpKSBjb250aW51ZTtcbiAgICAgIGlmICghaXNBcnJheShlbmNvZGVkKSkgZW5jb2RlZCA9IFsgZW5jb2RlZCBdO1xuICAgICAgZW5jb2RlZCA9IG1hcChlbmNvZGVkLCBlbmNvZGVVUklDb21wb25lbnQpLmpvaW4oJyYnICsgbmFtZSArICc9Jyk7XG4gICAgICByZXN1bHQgKz0gKHNlYXJjaCA/ICcmJyA6ICc/JykgKyAobmFtZSArICc9JyArIGVuY29kZWQpO1xuICAgICAgc2VhcmNoID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuLyoqXG4gKiBAbmdkb2Mgb2JqZWN0XG4gKiBAbmFtZSB1aS5yb3V0ZXIudXRpbC50eXBlOlR5cGVcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEltcGxlbWVudHMgYW4gaW50ZXJmYWNlIHRvIGRlZmluZSBjdXN0b20gcGFyYW1ldGVyIHR5cGVzIHRoYXQgY2FuIGJlIGRlY29kZWQgZnJvbSBhbmQgZW5jb2RlZCB0b1xuICogc3RyaW5nIHBhcmFtZXRlcnMgbWF0Y2hlZCBpbiBhIFVSTC4gVXNlZCBieSB7QGxpbmsgdWkucm91dGVyLnV0aWwudHlwZTpVcmxNYXRjaGVyIGBVcmxNYXRjaGVyYH1cbiAqIG9iamVjdHMgd2hlbiBtYXRjaGluZyBvciBmb3JtYXR0aW5nIFVSTHMsIG9yIGNvbXBhcmluZyBvciB2YWxpZGF0aW5nIHBhcmFtZXRlciB2YWx1ZXMuXG4gKlxuICogU2VlIHtAbGluayB1aS5yb3V0ZXIudXRpbC4kdXJsTWF0Y2hlckZhY3RvcnkjbWV0aG9kc190eXBlIGAkdXJsTWF0Y2hlckZhY3RvcnkjdHlwZSgpYH0gZm9yIG1vcmVcbiAqIGluZm9ybWF0aW9uIG9uIHJlZ2lzdGVyaW5nIGN1c3RvbSB0eXBlcy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnICBBIGNvbmZpZ3VyYXRpb24gb2JqZWN0IHdoaWNoIGNvbnRhaW5zIHRoZSBjdXN0b20gdHlwZSBkZWZpbml0aW9uLiAgVGhlIG9iamVjdCdzXG4gKiAgICAgICAgcHJvcGVydGllcyB3aWxsIG92ZXJyaWRlIHRoZSBkZWZhdWx0IG1ldGhvZHMgYW5kL29yIHBhdHRlcm4gaW4gYFR5cGVgJ3MgcHVibGljIGludGVyZmFjZS5cbiAqIEBleGFtcGxlXG4gKiA8cHJlPlxuICoge1xuICogICBkZWNvZGU6IGZ1bmN0aW9uKHZhbCkgeyByZXR1cm4gcGFyc2VJbnQodmFsLCAxMCk7IH0sXG4gKiAgIGVuY29kZTogZnVuY3Rpb24odmFsKSB7IHJldHVybiB2YWwgJiYgdmFsLnRvU3RyaW5nKCk7IH0sXG4gKiAgIGVxdWFsczogZnVuY3Rpb24oYSwgYikgeyByZXR1cm4gdGhpcy5pcyhhKSAmJiBhID09PSBiOyB9LFxuICogICBpczogZnVuY3Rpb24odmFsKSB7IHJldHVybiBhbmd1bGFyLmlzTnVtYmVyKHZhbCkgaXNGaW5pdGUodmFsKSAmJiB2YWwgJSAxID09PSAwOyB9LFxuICogICBwYXR0ZXJuOiAvXFxkKy9cbiAqIH1cbiAqIDwvcHJlPlxuICpcbiAqIEBwcm9wZXJ0eSB7UmVnRXhwfSBwYXR0ZXJuIFRoZSByZWd1bGFyIGV4cHJlc3Npb24gcGF0dGVybiB1c2VkIHRvIG1hdGNoIHZhbHVlcyBvZiB0aGlzIHR5cGUgd2hlblxuICogICAgICAgICAgIGNvbWluZyBmcm9tIGEgc3Vic3RyaW5nIG9mIGEgVVJMLlxuICpcbiAqIEByZXR1cm5zIHtPYmplY3R9ICBSZXR1cm5zIGEgbmV3IGBUeXBlYCBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIFR5cGUoY29uZmlnKSB7XG4gIGV4dGVuZCh0aGlzLCBjb25maWcpO1xufVxuXG4vKipcbiAqIEBuZ2RvYyBmdW5jdGlvblxuICogQG5hbWUgdWkucm91dGVyLnV0aWwudHlwZTpUeXBlI2lzXG4gKiBAbWV0aG9kT2YgdWkucm91dGVyLnV0aWwudHlwZTpUeXBlXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBEZXRlY3RzIHdoZXRoZXIgYSB2YWx1ZSBpcyBvZiBhIHBhcnRpY3VsYXIgdHlwZS4gQWNjZXB0cyBhIG5hdGl2ZSAoZGVjb2RlZCkgdmFsdWVcbiAqIGFuZCBkZXRlcm1pbmVzIHdoZXRoZXIgaXQgbWF0Y2hlcyB0aGUgY3VycmVudCBgVHlwZWAgb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsICBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5ICBPcHRpb25hbC4gSWYgdGhlIHR5cGUgY2hlY2sgaXMgaGFwcGVuaW5nIGluIHRoZSBjb250ZXh0IG9mIGEgc3BlY2lmaWNcbiAqICAgICAgICB7QGxpbmsgdWkucm91dGVyLnV0aWwudHlwZTpVcmxNYXRjaGVyIGBVcmxNYXRjaGVyYH0gb2JqZWN0LCB0aGlzIGlzIHRoZSBuYW1lIG9mIHRoZVxuICogICAgICAgIHBhcmFtZXRlciBpbiB3aGljaCBgdmFsYCBpcyBzdG9yZWQuIENhbiBiZSB1c2VkIGZvciBtZXRhLXByb2dyYW1taW5nIG9mIGBUeXBlYCBvYmplY3RzLlxuICogQHJldHVybnMge0Jvb2xlYW59ICBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdmFsdWUgbWF0Y2hlcyB0aGUgdHlwZSwgb3RoZXJ3aXNlIGBmYWxzZWAuXG4gKi9cblR5cGUucHJvdG90eXBlLmlzID0gZnVuY3Rpb24odmFsLCBrZXkpIHtcbiAgcmV0dXJuIHRydWU7XG59O1xuXG4vKipcbiAqIEBuZ2RvYyBmdW5jdGlvblxuICogQG5hbWUgdWkucm91dGVyLnV0aWwudHlwZTpUeXBlI2VuY29kZVxuICogQG1ldGhvZE9mIHVpLnJvdXRlci51dGlsLnR5cGU6VHlwZVxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogRW5jb2RlcyBhIGN1c3RvbS9uYXRpdmUgdHlwZSB2YWx1ZSB0byBhIHN0cmluZyB0aGF0IGNhbiBiZSBlbWJlZGRlZCBpbiBhIFVSTC4gTm90ZSB0aGF0IHRoZVxuICogcmV0dXJuIHZhbHVlIGRvZXMgKm5vdCogbmVlZCB0byBiZSBVUkwtc2FmZSAoaS5lLiBwYXNzZWQgdGhyb3VnaCBgZW5jb2RlVVJJQ29tcG9uZW50KClgKSwgaXRcbiAqIG9ubHkgbmVlZHMgdG8gYmUgYSByZXByZXNlbnRhdGlvbiBvZiBgdmFsYCB0aGF0IGhhcyBiZWVuIGNvZXJjZWQgdG8gYSBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgIFRoZSB2YWx1ZSB0byBlbmNvZGUuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5ICBUaGUgbmFtZSBvZiB0aGUgcGFyYW1ldGVyIGluIHdoaWNoIGB2YWxgIGlzIHN0b3JlZC4gQ2FuIGJlIHVzZWQgZm9yXG4gKiAgICAgICAgbWV0YS1wcm9ncmFtbWluZyBvZiBgVHlwZWAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9ICBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIGB2YWxgIHRoYXQgY2FuIGJlIGVuY29kZWQgaW4gYSBVUkwuXG4gKi9cblR5cGUucHJvdG90eXBlLmVuY29kZSA9IGZ1bmN0aW9uKHZhbCwga2V5KSB7XG4gIHJldHVybiB2YWw7XG59O1xuXG4vKipcbiAqIEBuZ2RvYyBmdW5jdGlvblxuICogQG5hbWUgdWkucm91dGVyLnV0aWwudHlwZTpUeXBlI2RlY29kZVxuICogQG1ldGhvZE9mIHVpLnJvdXRlci51dGlsLnR5cGU6VHlwZVxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQ29udmVydHMgYSBwYXJhbWV0ZXIgdmFsdWUgKGZyb20gVVJMIHN0cmluZyBvciB0cmFuc2l0aW9uIHBhcmFtKSB0byBhIGN1c3RvbS9uYXRpdmUgdmFsdWUuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHZhbCAgVGhlIFVSTCBwYXJhbWV0ZXIgdmFsdWUgdG8gZGVjb2RlLlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSAgVGhlIG5hbWUgb2YgdGhlIHBhcmFtZXRlciBpbiB3aGljaCBgdmFsYCBpcyBzdG9yZWQuIENhbiBiZSB1c2VkIGZvclxuICogICAgICAgIG1ldGEtcHJvZ3JhbW1pbmcgb2YgYFR5cGVgIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Kn0gIFJldHVybnMgYSBjdXN0b20gcmVwcmVzZW50YXRpb24gb2YgdGhlIFVSTCBwYXJhbWV0ZXIgdmFsdWUuXG4gKi9cblR5cGUucHJvdG90eXBlLmRlY29kZSA9IGZ1bmN0aW9uKHZhbCwga2V5KSB7XG4gIHJldHVybiB2YWw7XG59O1xuXG4vKipcbiAqIEBuZ2RvYyBmdW5jdGlvblxuICogQG5hbWUgdWkucm91dGVyLnV0aWwudHlwZTpUeXBlI2VxdWFsc1xuICogQG1ldGhvZE9mIHVpLnJvdXRlci51dGlsLnR5cGU6VHlwZVxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHR3byBkZWNvZGVkIHZhbHVlcyBhcmUgZXF1aXZhbGVudC5cbiAqXG4gKiBAcGFyYW0geyp9IGEgIEEgdmFsdWUgdG8gY29tcGFyZSBhZ2FpbnN0LlxuICogQHBhcmFtIHsqfSBiICBBIHZhbHVlIHRvIGNvbXBhcmUgYWdhaW5zdC5cbiAqIEByZXR1cm5zIHtCb29sZWFufSAgUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHZhbHVlcyBhcmUgZXF1aXZhbGVudC9lcXVhbCwgb3RoZXJ3aXNlIGBmYWxzZWAuXG4gKi9cblR5cGUucHJvdG90eXBlLmVxdWFscyA9IGZ1bmN0aW9uKGEsIGIpIHtcbiAgcmV0dXJuIGEgPT0gYjtcbn07XG5cblR5cGUucHJvdG90eXBlLiRzdWJQYXR0ZXJuID0gZnVuY3Rpb24oKSB7XG4gIHZhciBzdWIgPSB0aGlzLnBhdHRlcm4udG9TdHJpbmcoKTtcbiAgcmV0dXJuIHN1Yi5zdWJzdHIoMSwgc3ViLmxlbmd0aCAtIDIpO1xufTtcblxuVHlwZS5wcm90b3R5cGUucGF0dGVybiA9IC8uKi87XG5cblR5cGUucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7IHJldHVybiBcIntUeXBlOlwiICsgdGhpcy5uYW1lICsgXCJ9XCI7IH07XG5cbi8qXG4gKiBXcmFwcyBhbiBleGlzdGluZyBjdXN0b20gVHlwZSBhcyBhbiBhcnJheSBvZiBUeXBlLCBkZXBlbmRpbmcgb24gJ21vZGUnLlxuICogZS5nLjpcbiAqIC0gdXJsbWF0Y2hlciBwYXR0ZXJuIFwiL3BhdGg/e3F1ZXJ5UGFyYW1bXTppbnR9XCJcbiAqIC0gdXJsOiBcIi9wYXRoP3F1ZXJ5UGFyYW09MSZxdWVyeVBhcmFtPTJcbiAqIC0gJHN0YXRlUGFyYW1zLnF1ZXJ5UGFyYW0gd2lsbCBiZSBbMSwgMl1cbiAqIGlmIGBtb2RlYCBpcyBcImF1dG9cIiwgdGhlblxuICogLSB1cmw6IFwiL3BhdGg/cXVlcnlQYXJhbT0xIHdpbGwgY3JlYXRlICRzdGF0ZVBhcmFtcy5xdWVyeVBhcmFtOiAxXG4gKiAtIHVybDogXCIvcGF0aD9xdWVyeVBhcmFtPTEmcXVlcnlQYXJhbT0yIHdpbGwgY3JlYXRlICRzdGF0ZVBhcmFtcy5xdWVyeVBhcmFtOiBbMSwgMl1cbiAqL1xuVHlwZS5wcm90b3R5cGUuJGFzQXJyYXkgPSBmdW5jdGlvbihtb2RlLCBpc1NlYXJjaCkge1xuICBpZiAoIW1vZGUpIHJldHVybiB0aGlzO1xuICBpZiAobW9kZSA9PT0gXCJhdXRvXCIgJiYgIWlzU2VhcmNoKSB0aHJvdyBuZXcgRXJyb3IoXCInYXV0bycgYXJyYXkgbW9kZSBpcyBmb3IgcXVlcnkgcGFyYW1ldGVycyBvbmx5XCIpO1xuICByZXR1cm4gbmV3IEFycmF5VHlwZSh0aGlzLCBtb2RlKTtcblxuICBmdW5jdGlvbiBBcnJheVR5cGUodHlwZSwgbW9kZSkge1xuICAgIGZ1bmN0aW9uIGJpbmRUbyh0eXBlLCBjYWxsYmFja05hbWUpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVbY2FsbGJhY2tOYW1lXS5hcHBseSh0eXBlLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBXcmFwIG5vbi1hcnJheSB2YWx1ZSBhcyBhcnJheVxuICAgIGZ1bmN0aW9uIGFycmF5V3JhcCh2YWwpIHsgcmV0dXJuIGlzQXJyYXkodmFsKSA/IHZhbCA6IChpc0RlZmluZWQodmFsKSA/IFsgdmFsIF0gOiBbXSk7IH1cbiAgICAvLyBVbndyYXAgYXJyYXkgdmFsdWUgZm9yIFwiYXV0b1wiIG1vZGUuIFJldHVybiB1bmRlZmluZWQgZm9yIGVtcHR5IGFycmF5LlxuICAgIGZ1bmN0aW9uIGFycmF5VW53cmFwKHZhbCkge1xuICAgICAgc3dpdGNoKHZhbC5sZW5ndGgpIHtcbiAgICAgICAgY2FzZSAwOiByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICBjYXNlIDE6IHJldHVybiBtb2RlID09PSBcImF1dG9cIiA/IHZhbFswXSA6IHZhbDtcbiAgICAgICAgZGVmYXVsdDogcmV0dXJuIHZhbDtcbiAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gZmFsc2V5KHZhbCkgeyByZXR1cm4gIXZhbDsgfVxuXG4gICAgLy8gV3JhcHMgdHlwZSAoLmlzLy5lbmNvZGUvLmRlY29kZSkgZnVuY3Rpb25zIHRvIG9wZXJhdGUgb24gZWFjaCB2YWx1ZSBvZiBhbiBhcnJheVxuICAgIGZ1bmN0aW9uIGFycmF5SGFuZGxlcihjYWxsYmFjaywgYWxsVHJ1dGh5TW9kZSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIGhhbmRsZUFycmF5KHZhbCkge1xuICAgICAgICB2YWwgPSBhcnJheVdyYXAodmFsKTtcbiAgICAgICAgdmFyIHJlc3VsdCA9IG1hcCh2YWwsIGNhbGxiYWNrKTtcbiAgICAgICAgaWYgKGFsbFRydXRoeU1vZGUgPT09IHRydWUpXG4gICAgICAgICAgcmV0dXJuIGZpbHRlcihyZXN1bHQsIGZhbHNleSkubGVuZ3RoID09PSAwO1xuICAgICAgICByZXR1cm4gYXJyYXlVbndyYXAocmVzdWx0KTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gV3JhcHMgdHlwZSAoLmVxdWFscykgZnVuY3Rpb25zIHRvIG9wZXJhdGUgb24gZWFjaCB2YWx1ZSBvZiBhbiBhcnJheVxuICAgIGZ1bmN0aW9uIGFycmF5RXF1YWxzSGFuZGxlcihjYWxsYmFjaykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIGhhbmRsZUFycmF5KHZhbDEsIHZhbDIpIHtcbiAgICAgICAgdmFyIGxlZnQgPSBhcnJheVdyYXAodmFsMSksIHJpZ2h0ID0gYXJyYXlXcmFwKHZhbDIpO1xuICAgICAgICBpZiAobGVmdC5sZW5ndGggIT09IHJpZ2h0Lmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlZnQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAoIWNhbGxiYWNrKGxlZnRbaV0sIHJpZ2h0W2ldKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICB0aGlzLmVuY29kZSA9IGFycmF5SGFuZGxlcihiaW5kVG8odHlwZSwgJ2VuY29kZScpKTtcbiAgICB0aGlzLmRlY29kZSA9IGFycmF5SGFuZGxlcihiaW5kVG8odHlwZSwgJ2RlY29kZScpKTtcbiAgICB0aGlzLmlzICAgICA9IGFycmF5SGFuZGxlcihiaW5kVG8odHlwZSwgJ2lzJyksIHRydWUpO1xuICAgIHRoaXMuZXF1YWxzID0gYXJyYXlFcXVhbHNIYW5kbGVyKGJpbmRUbyh0eXBlLCAnZXF1YWxzJykpO1xuICAgIHRoaXMucGF0dGVybiA9IHR5cGUucGF0dGVybjtcbiAgICB0aGlzLiRhcnJheU1vZGUgPSBtb2RlO1xuICB9XG59O1xuXG5cblxuLyoqXG4gKiBAbmdkb2Mgb2JqZWN0XG4gKiBAbmFtZSB1aS5yb3V0ZXIudXRpbC4kdXJsTWF0Y2hlckZhY3RvcnlcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEZhY3RvcnkgZm9yIHtAbGluayB1aS5yb3V0ZXIudXRpbC50eXBlOlVybE1hdGNoZXIgYFVybE1hdGNoZXJgfSBpbnN0YW5jZXMuIFRoZSBmYWN0b3J5XG4gKiBpcyBhbHNvIGF2YWlsYWJsZSB0byBwcm92aWRlcnMgdW5kZXIgdGhlIG5hbWUgYCR1cmxNYXRjaGVyRmFjdG9yeVByb3ZpZGVyYC5cbiAqL1xuZnVuY3Rpb24gJFVybE1hdGNoZXJGYWN0b3J5KCkge1xuICAkJFVNRlAgPSB0aGlzO1xuXG4gIHZhciBpc0Nhc2VJbnNlbnNpdGl2ZSA9IGZhbHNlLCBpc1N0cmljdE1vZGUgPSB0cnVlLCBkZWZhdWx0U3F1YXNoUG9saWN5ID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gdmFsVG9TdHJpbmcodmFsKSB7IHJldHVybiB2YWwgIT0gbnVsbCA/IHZhbC50b1N0cmluZygpLnJlcGxhY2UoL1xcLy9nLCBcIiUyRlwiKSA6IHZhbDsgfVxuICBmdW5jdGlvbiB2YWxGcm9tU3RyaW5nKHZhbCkgeyByZXR1cm4gdmFsICE9IG51bGwgPyB2YWwudG9TdHJpbmcoKS5yZXBsYWNlKC8lMkYvZywgXCIvXCIpIDogdmFsOyB9XG4vLyAgVE9ETzogaW4gMS4wLCBtYWtlIHN0cmluZyAuaXMoKSByZXR1cm4gZmFsc2UgaWYgdmFsdWUgaXMgdW5kZWZpbmVkIGJ5IGRlZmF1bHQuXG4vLyAgZnVuY3Rpb24gcmVnZXhwTWF0Y2hlcyh2YWwpIHsgLypqc2hpbnQgdmFsaWR0aGlzOnRydWUgKi8gcmV0dXJuIGlzRGVmaW5lZCh2YWwpICYmIHRoaXMucGF0dGVybi50ZXN0KHZhbCk7IH1cbiAgZnVuY3Rpb24gcmVnZXhwTWF0Y2hlcyh2YWwpIHsgLypqc2hpbnQgdmFsaWR0aGlzOnRydWUgKi8gcmV0dXJuIHRoaXMucGF0dGVybi50ZXN0KHZhbCk7IH1cblxuICB2YXIgJHR5cGVzID0ge30sIGVucXVldWUgPSB0cnVlLCB0eXBlUXVldWUgPSBbXSwgaW5qZWN0b3IsIGRlZmF1bHRUeXBlcyA9IHtcbiAgICBzdHJpbmc6IHtcbiAgICAgIGVuY29kZTogdmFsVG9TdHJpbmcsXG4gICAgICBkZWNvZGU6IHZhbEZyb21TdHJpbmcsXG4gICAgICBpczogcmVnZXhwTWF0Y2hlcyxcbiAgICAgIHBhdHRlcm46IC9bXi9dKi9cbiAgICB9LFxuICAgIGludDoge1xuICAgICAgZW5jb2RlOiB2YWxUb1N0cmluZyxcbiAgICAgIGRlY29kZTogZnVuY3Rpb24odmFsKSB7IHJldHVybiBwYXJzZUludCh2YWwsIDEwKTsgfSxcbiAgICAgIGlzOiBmdW5jdGlvbih2YWwpIHsgcmV0dXJuIGlzRGVmaW5lZCh2YWwpICYmIHRoaXMuZGVjb2RlKHZhbC50b1N0cmluZygpKSA9PT0gdmFsOyB9LFxuICAgICAgcGF0dGVybjogL1xcZCsvXG4gICAgfSxcbiAgICBib29sOiB7XG4gICAgICBlbmNvZGU6IGZ1bmN0aW9uKHZhbCkgeyByZXR1cm4gdmFsID8gMSA6IDA7IH0sXG4gICAgICBkZWNvZGU6IGZ1bmN0aW9uKHZhbCkgeyByZXR1cm4gcGFyc2VJbnQodmFsLCAxMCkgIT09IDA7IH0sXG4gICAgICBpczogZnVuY3Rpb24odmFsKSB7IHJldHVybiB2YWwgPT09IHRydWUgfHwgdmFsID09PSBmYWxzZTsgfSxcbiAgICAgIHBhdHRlcm46IC8wfDEvXG4gICAgfSxcbiAgICBkYXRlOiB7XG4gICAgICBlbmNvZGU6IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzKHZhbCkpXG4gICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgcmV0dXJuIFsgdmFsLmdldEZ1bGxZZWFyKCksXG4gICAgICAgICAgKCcwJyArICh2YWwuZ2V0TW9udGgoKSArIDEpKS5zbGljZSgtMiksXG4gICAgICAgICAgKCcwJyArIHZhbC5nZXREYXRlKCkpLnNsaWNlKC0yKVxuICAgICAgICBdLmpvaW4oXCItXCIpO1xuICAgICAgfSxcbiAgICAgIGRlY29kZTogZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICBpZiAodGhpcy5pcyh2YWwpKSByZXR1cm4gdmFsO1xuICAgICAgICB2YXIgbWF0Y2ggPSB0aGlzLmNhcHR1cmUuZXhlYyh2YWwpO1xuICAgICAgICByZXR1cm4gbWF0Y2ggPyBuZXcgRGF0ZShtYXRjaFsxXSwgbWF0Y2hbMl0gLSAxLCBtYXRjaFszXSkgOiB1bmRlZmluZWQ7XG4gICAgICB9LFxuICAgICAgaXM6IGZ1bmN0aW9uKHZhbCkgeyByZXR1cm4gdmFsIGluc3RhbmNlb2YgRGF0ZSAmJiAhaXNOYU4odmFsLnZhbHVlT2YoKSk7IH0sXG4gICAgICBlcXVhbHM6IGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiB0aGlzLmlzKGEpICYmIHRoaXMuaXMoYikgJiYgYS50b0lTT1N0cmluZygpID09PSBiLnRvSVNPU3RyaW5nKCk7IH0sXG4gICAgICBwYXR0ZXJuOiAvWzAtOV17NH0tKD86MFsxLTldfDFbMC0yXSktKD86MFsxLTldfFsxLTJdWzAtOV18M1swLTFdKS8sXG4gICAgICBjYXB0dXJlOiAvKFswLTldezR9KS0oMFsxLTldfDFbMC0yXSktKDBbMS05XXxbMS0yXVswLTldfDNbMC0xXSkvXG4gICAgfSxcbiAgICBqc29uOiB7XG4gICAgICBlbmNvZGU6IGFuZ3VsYXIudG9Kc29uLFxuICAgICAgZGVjb2RlOiBhbmd1bGFyLmZyb21Kc29uLFxuICAgICAgaXM6IGFuZ3VsYXIuaXNPYmplY3QsXG4gICAgICBlcXVhbHM6IGFuZ3VsYXIuZXF1YWxzLFxuICAgICAgcGF0dGVybjogL1teL10qL1xuICAgIH0sXG4gICAgYW55OiB7IC8vIGRvZXMgbm90IGVuY29kZS9kZWNvZGVcbiAgICAgIGVuY29kZTogYW5ndWxhci5pZGVudGl0eSxcbiAgICAgIGRlY29kZTogYW5ndWxhci5pZGVudGl0eSxcbiAgICAgIGlzOiBhbmd1bGFyLmlkZW50aXR5LFxuICAgICAgZXF1YWxzOiBhbmd1bGFyLmVxdWFscyxcbiAgICAgIHBhdHRlcm46IC8uKi9cbiAgICB9XG4gIH07XG5cbiAgZnVuY3Rpb24gZ2V0RGVmYXVsdENvbmZpZygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc3RyaWN0OiBpc1N0cmljdE1vZGUsXG4gICAgICBjYXNlSW5zZW5zaXRpdmU6IGlzQ2FzZUluc2Vuc2l0aXZlXG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzSW5qZWN0YWJsZSh2YWx1ZSkge1xuICAgIHJldHVybiAoaXNGdW5jdGlvbih2YWx1ZSkgfHwgKGlzQXJyYXkodmFsdWUpICYmIGlzRnVuY3Rpb24odmFsdWVbdmFsdWUubGVuZ3RoIC0gMV0pKSk7XG4gIH1cblxuICAvKipcbiAgICogW0ludGVybmFsXSBHZXQgdGhlIGRlZmF1bHQgdmFsdWUgb2YgYSBwYXJhbWV0ZXIsIHdoaWNoIG1heSBiZSBhbiBpbmplY3RhYmxlIGZ1bmN0aW9uLlxuICAgKi9cbiAgJFVybE1hdGNoZXJGYWN0b3J5LiQkZ2V0RGVmYXVsdFZhbHVlID0gZnVuY3Rpb24oY29uZmlnKSB7XG4gICAgaWYgKCFpc0luamVjdGFibGUoY29uZmlnLnZhbHVlKSkgcmV0dXJuIGNvbmZpZy52YWx1ZTtcbiAgICBpZiAoIWluamVjdG9yKSB0aHJvdyBuZXcgRXJyb3IoXCJJbmplY3RhYmxlIGZ1bmN0aW9ucyBjYW5ub3QgYmUgY2FsbGVkIGF0IGNvbmZpZ3VyYXRpb24gdGltZVwiKTtcbiAgICByZXR1cm4gaW5qZWN0b3IuaW52b2tlKGNvbmZpZy52YWx1ZSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEBuZ2RvYyBmdW5jdGlvblxuICAgKiBAbmFtZSB1aS5yb3V0ZXIudXRpbC4kdXJsTWF0Y2hlckZhY3RvcnkjY2FzZUluc2Vuc2l0aXZlXG4gICAqIEBtZXRob2RPZiB1aS5yb3V0ZXIudXRpbC4kdXJsTWF0Y2hlckZhY3RvcnlcbiAgICpcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIERlZmluZXMgd2hldGhlciBVUkwgbWF0Y2hpbmcgc2hvdWxkIGJlIGNhc2Ugc2Vuc2l0aXZlICh0aGUgZGVmYXVsdCBiZWhhdmlvciksIG9yIG5vdC5cbiAgICpcbiAgICogQHBhcmFtIHtib29sZWFufSB2YWx1ZSBgZmFsc2VgIHRvIG1hdGNoIFVSTCBpbiBhIGNhc2Ugc2Vuc2l0aXZlIG1hbm5lcjsgb3RoZXJ3aXNlIGB0cnVlYDtcbiAgICogQHJldHVybnMge2Jvb2xlYW59IHRoZSBjdXJyZW50IHZhbHVlIG9mIGNhc2VJbnNlbnNpdGl2ZVxuICAgKi9cbiAgdGhpcy5jYXNlSW5zZW5zaXRpdmUgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIGlmIChpc0RlZmluZWQodmFsdWUpKVxuICAgICAgaXNDYXNlSW5zZW5zaXRpdmUgPSB2YWx1ZTtcbiAgICByZXR1cm4gaXNDYXNlSW5zZW5zaXRpdmU7XG4gIH07XG5cbiAgLyoqXG4gICAqIEBuZ2RvYyBmdW5jdGlvblxuICAgKiBAbmFtZSB1aS5yb3V0ZXIudXRpbC4kdXJsTWF0Y2hlckZhY3Rvcnkjc3RyaWN0TW9kZVxuICAgKiBAbWV0aG9kT2YgdWkucm91dGVyLnV0aWwuJHVybE1hdGNoZXJGYWN0b3J5XG4gICAqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBEZWZpbmVzIHdoZXRoZXIgVVJMcyBzaG91bGQgbWF0Y2ggdHJhaWxpbmcgc2xhc2hlcywgb3Igbm90ICh0aGUgZGVmYXVsdCBiZWhhdmlvcikuXG4gICAqXG4gICAqIEBwYXJhbSB7Ym9vbGVhbj19IHZhbHVlIGBmYWxzZWAgdG8gbWF0Y2ggdHJhaWxpbmcgc2xhc2hlcyBpbiBVUkxzLCBvdGhlcndpc2UgYHRydWVgLlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gdGhlIGN1cnJlbnQgdmFsdWUgb2Ygc3RyaWN0TW9kZVxuICAgKi9cbiAgdGhpcy5zdHJpY3RNb2RlID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICBpZiAoaXNEZWZpbmVkKHZhbHVlKSlcbiAgICAgIGlzU3RyaWN0TW9kZSA9IHZhbHVlO1xuICAgIHJldHVybiBpc1N0cmljdE1vZGU7XG4gIH07XG5cbiAgLyoqXG4gICAqIEBuZ2RvYyBmdW5jdGlvblxuICAgKiBAbmFtZSB1aS5yb3V0ZXIudXRpbC4kdXJsTWF0Y2hlckZhY3RvcnkjZGVmYXVsdFNxdWFzaFBvbGljeVxuICAgKiBAbWV0aG9kT2YgdWkucm91dGVyLnV0aWwuJHVybE1hdGNoZXJGYWN0b3J5XG4gICAqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBTZXRzIHRoZSBkZWZhdWx0IGJlaGF2aW9yIHdoZW4gZ2VuZXJhdGluZyBvciBtYXRjaGluZyBVUkxzIHdpdGggZGVmYXVsdCBwYXJhbWV0ZXIgdmFsdWVzLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgQSBzdHJpbmcgdGhhdCBkZWZpbmVzIHRoZSBkZWZhdWx0IHBhcmFtZXRlciBVUkwgc3F1YXNoaW5nIGJlaGF2aW9yLlxuICAgKiAgICBgbm9zcXVhc2hgOiBXaGVuIGdlbmVyYXRpbmcgYW4gaHJlZiB3aXRoIGEgZGVmYXVsdCBwYXJhbWV0ZXIgdmFsdWUsIGRvIG5vdCBzcXVhc2ggdGhlIHBhcmFtZXRlciB2YWx1ZSBmcm9tIHRoZSBVUkxcbiAgICogICAgYHNsYXNoYDogV2hlbiBnZW5lcmF0aW5nIGFuIGhyZWYgd2l0aCBhIGRlZmF1bHQgcGFyYW1ldGVyIHZhbHVlLCBzcXVhc2ggKHJlbW92ZSkgdGhlIHBhcmFtZXRlciB2YWx1ZSwgYW5kLCBpZiB0aGVcbiAgICogICAgICAgICAgICAgcGFyYW1ldGVyIGlzIHN1cnJvdW5kZWQgYnkgc2xhc2hlcywgc3F1YXNoIChyZW1vdmUpIG9uZSBzbGFzaCBmcm9tIHRoZSBVUkxcbiAgICogICAgYW55IG90aGVyIHN0cmluZywgZS5nLiBcIn5cIjogV2hlbiBnZW5lcmF0aW5nIGFuIGhyZWYgd2l0aCBhIGRlZmF1bHQgcGFyYW1ldGVyIHZhbHVlLCBzcXVhc2ggKHJlbW92ZSlcbiAgICogICAgICAgICAgICAgdGhlIHBhcmFtZXRlciB2YWx1ZSBmcm9tIHRoZSBVUkwgYW5kIHJlcGxhY2UgaXQgd2l0aCB0aGlzIHN0cmluZy5cbiAgICovXG4gIHRoaXMuZGVmYXVsdFNxdWFzaFBvbGljeSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgaWYgKCFpc0RlZmluZWQodmFsdWUpKSByZXR1cm4gZGVmYXVsdFNxdWFzaFBvbGljeTtcbiAgICBpZiAodmFsdWUgIT09IHRydWUgJiYgdmFsdWUgIT09IGZhbHNlICYmICFpc1N0cmluZyh2YWx1ZSkpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHNxdWFzaCBwb2xpY3k6IFwiICsgdmFsdWUgKyBcIi4gVmFsaWQgcG9saWNpZXM6IGZhbHNlLCB0cnVlLCBhcmJpdHJhcnktc3RyaW5nXCIpO1xuICAgIGRlZmF1bHRTcXVhc2hQb2xpY3kgPSB2YWx1ZTtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH07XG5cbiAgLyoqXG4gICAqIEBuZ2RvYyBmdW5jdGlvblxuICAgKiBAbmFtZSB1aS5yb3V0ZXIudXRpbC4kdXJsTWF0Y2hlckZhY3RvcnkjY29tcGlsZVxuICAgKiBAbWV0aG9kT2YgdWkucm91dGVyLnV0aWwuJHVybE1hdGNoZXJGYWN0b3J5XG4gICAqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBDcmVhdGVzIGEge0BsaW5rIHVpLnJvdXRlci51dGlsLnR5cGU6VXJsTWF0Y2hlciBgVXJsTWF0Y2hlcmB9IGZvciB0aGUgc3BlY2lmaWVkIHBhdHRlcm4uXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwYXR0ZXJuICBUaGUgVVJMIHBhdHRlcm4uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgIFRoZSBjb25maWcgb2JqZWN0IGhhc2guXG4gICAqIEByZXR1cm5zIHtVcmxNYXRjaGVyfSAgVGhlIFVybE1hdGNoZXIuXG4gICAqL1xuICB0aGlzLmNvbXBpbGUgPSBmdW5jdGlvbiAocGF0dGVybiwgY29uZmlnKSB7XG4gICAgcmV0dXJuIG5ldyBVcmxNYXRjaGVyKHBhdHRlcm4sIGV4dGVuZChnZXREZWZhdWx0Q29uZmlnKCksIGNvbmZpZykpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBAbmdkb2MgZnVuY3Rpb25cbiAgICogQG5hbWUgdWkucm91dGVyLnV0aWwuJHVybE1hdGNoZXJGYWN0b3J5I2lzTWF0Y2hlclxuICAgKiBAbWV0aG9kT2YgdWkucm91dGVyLnV0aWwuJHVybE1hdGNoZXJGYWN0b3J5XG4gICAqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHNwZWNpZmllZCBvYmplY3QgaXMgYSBgVXJsTWF0Y2hlcmAsIG9yIGZhbHNlIG90aGVyd2lzZS5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCAgVGhlIG9iamVjdCB0byBwZXJmb3JtIHRoZSB0eXBlIGNoZWNrIGFnYWluc3QuXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSAgUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG9iamVjdCBtYXRjaGVzIHRoZSBgVXJsTWF0Y2hlcmAgaW50ZXJmYWNlLCBieVxuICAgKiAgICAgICAgICBpbXBsZW1lbnRpbmcgYWxsIHRoZSBzYW1lIG1ldGhvZHMuXG4gICAqL1xuICB0aGlzLmlzTWF0Y2hlciA9IGZ1bmN0aW9uIChvKSB7XG4gICAgaWYgKCFpc09iamVjdChvKSkgcmV0dXJuIGZhbHNlO1xuICAgIHZhciByZXN1bHQgPSB0cnVlO1xuXG4gICAgZm9yRWFjaChVcmxNYXRjaGVyLnByb3RvdHlwZSwgZnVuY3Rpb24odmFsLCBuYW1lKSB7XG4gICAgICBpZiAoaXNGdW5jdGlvbih2YWwpKSB7XG4gICAgICAgIHJlc3VsdCA9IHJlc3VsdCAmJiAoaXNEZWZpbmVkKG9bbmFtZV0pICYmIGlzRnVuY3Rpb24ob1tuYW1lXSkpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIEBuZ2RvYyBmdW5jdGlvblxuICAgKiBAbmFtZSB1aS5yb3V0ZXIudXRpbC4kdXJsTWF0Y2hlckZhY3RvcnkjdHlwZVxuICAgKiBAbWV0aG9kT2YgdWkucm91dGVyLnV0aWwuJHVybE1hdGNoZXJGYWN0b3J5XG4gICAqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBSZWdpc3RlcnMgYSBjdXN0b20ge0BsaW5rIHVpLnJvdXRlci51dGlsLnR5cGU6VHlwZSBgVHlwZWB9IG9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIHRvXG4gICAqIGdlbmVyYXRlIFVSTHMgd2l0aCB0eXBlZCBwYXJhbWV0ZXJzLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAgVGhlIHR5cGUgbmFtZS5cbiAgICogQHBhcmFtIHtPYmplY3R8RnVuY3Rpb259IGRlZmluaXRpb24gICBUaGUgdHlwZSBkZWZpbml0aW9uLiBTZWVcbiAgICogICAgICAgIHtAbGluayB1aS5yb3V0ZXIudXRpbC50eXBlOlR5cGUgYFR5cGVgfSBmb3IgaW5mb3JtYXRpb24gb24gdGhlIHZhbHVlcyBhY2NlcHRlZC5cbiAgICogQHBhcmFtIHtPYmplY3R8RnVuY3Rpb259IGRlZmluaXRpb25GbiAob3B0aW9uYWwpIEEgZnVuY3Rpb24gdGhhdCBpcyBpbmplY3RlZCBiZWZvcmUgdGhlIGFwcFxuICAgKiAgICAgICAgcnVudGltZSBzdGFydHMuICBUaGUgcmVzdWx0IG9mIHRoaXMgZnVuY3Rpb24gaXMgbWVyZ2VkIGludG8gdGhlIGV4aXN0aW5nIGBkZWZpbml0aW9uYC5cbiAgICogICAgICAgIFNlZSB7QGxpbmsgdWkucm91dGVyLnV0aWwudHlwZTpUeXBlIGBUeXBlYH0gZm9yIGluZm9ybWF0aW9uIG9uIHRoZSB2YWx1ZXMgYWNjZXB0ZWQuXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9ICBSZXR1cm5zIGAkdXJsTWF0Y2hlckZhY3RvcnlQcm92aWRlcmAuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIFRoaXMgaXMgYSBzaW1wbGUgZXhhbXBsZSBvZiBhIGN1c3RvbSB0eXBlIHRoYXQgZW5jb2RlcyBhbmQgZGVjb2RlcyBpdGVtcyBmcm9tIGFuXG4gICAqIGFycmF5LCB1c2luZyB0aGUgYXJyYXkgaW5kZXggYXMgdGhlIFVSTC1lbmNvZGVkIHZhbHVlOlxuICAgKlxuICAgKiA8cHJlPlxuICAgKiB2YXIgbGlzdCA9IFsnSm9obicsICdQYXVsJywgJ0dlb3JnZScsICdSaW5nbyddO1xuICAgKlxuICAgKiAkdXJsTWF0Y2hlckZhY3RvcnlQcm92aWRlci50eXBlKCdsaXN0SXRlbScsIHtcbiAgICogICBlbmNvZGU6IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICogICAgIC8vIFJlcHJlc2VudCB0aGUgbGlzdCBpdGVtIGluIHRoZSBVUkwgdXNpbmcgaXRzIGNvcnJlc3BvbmRpbmcgaW5kZXhcbiAgICogICAgIHJldHVybiBsaXN0LmluZGV4T2YoaXRlbSk7XG4gICAqICAgfSxcbiAgICogICBkZWNvZGU6IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICogICAgIC8vIExvb2sgdXAgdGhlIGxpc3QgaXRlbSBieSBpbmRleFxuICAgKiAgICAgcmV0dXJuIGxpc3RbcGFyc2VJbnQoaXRlbSwgMTApXTtcbiAgICogICB9LFxuICAgKiAgIGlzOiBmdW5jdGlvbihpdGVtKSB7XG4gICAqICAgICAvLyBFbnN1cmUgdGhlIGl0ZW0gaXMgdmFsaWQgYnkgY2hlY2tpbmcgdG8gc2VlIHRoYXQgaXQgYXBwZWFyc1xuICAgKiAgICAgLy8gaW4gdGhlIGxpc3RcbiAgICogICAgIHJldHVybiBsaXN0LmluZGV4T2YoaXRlbSkgPiAtMTtcbiAgICogICB9XG4gICAqIH0pO1xuICAgKlxuICAgKiAkc3RhdGVQcm92aWRlci5zdGF0ZSgnbGlzdCcsIHtcbiAgICogICB1cmw6IFwiL2xpc3Qve2l0ZW06bGlzdEl0ZW19XCIsXG4gICAqICAgY29udHJvbGxlcjogZnVuY3Rpb24oJHNjb3BlLCAkc3RhdGVQYXJhbXMpIHtcbiAgICogICAgIGNvbnNvbGUubG9nKCRzdGF0ZVBhcmFtcy5pdGVtKTtcbiAgICogICB9XG4gICAqIH0pO1xuICAgKlxuICAgKiAvLyAuLi5cbiAgICpcbiAgICogLy8gQ2hhbmdlcyBVUkwgdG8gJy9saXN0LzMnLCBsb2dzIFwiUmluZ29cIiB0byB0aGUgY29uc29sZVxuICAgKiAkc3RhdGUuZ28oJ2xpc3QnLCB7IGl0ZW06IFwiUmluZ29cIiB9KTtcbiAgICogPC9wcmU+XG4gICAqXG4gICAqIFRoaXMgaXMgYSBtb3JlIGNvbXBsZXggZXhhbXBsZSBvZiBhIHR5cGUgdGhhdCByZWxpZXMgb24gZGVwZW5kZW5jeSBpbmplY3Rpb24gdG9cbiAgICogaW50ZXJhY3Qgd2l0aCBzZXJ2aWNlcywgYW5kIHVzZXMgdGhlIHBhcmFtZXRlciBuYW1lIGZyb20gdGhlIFVSTCB0byBpbmZlciBob3cgdG9cbiAgICogaGFuZGxlIGVuY29kaW5nIGFuZCBkZWNvZGluZyBwYXJhbWV0ZXIgdmFsdWVzOlxuICAgKlxuICAgKiA8cHJlPlxuICAgKiAvLyBEZWZpbmVzIGEgY3VzdG9tIHR5cGUgdGhhdCBnZXRzIGEgdmFsdWUgZnJvbSBhIHNlcnZpY2UsXG4gICAqIC8vIHdoZXJlIGVhY2ggc2VydmljZSBnZXRzIGRpZmZlcmVudCB0eXBlcyBvZiB2YWx1ZXMgZnJvbVxuICAgKiAvLyBhIGJhY2tlbmQgQVBJOlxuICAgKiAkdXJsTWF0Y2hlckZhY3RvcnlQcm92aWRlci50eXBlKCdkYk9iamVjdCcsIHt9LCBmdW5jdGlvbihVc2VycywgUG9zdHMpIHtcbiAgICpcbiAgICogICAvLyBNYXRjaGVzIHVwIHNlcnZpY2VzIHRvIFVSTCBwYXJhbWV0ZXIgbmFtZXNcbiAgICogICB2YXIgc2VydmljZXMgPSB7XG4gICAqICAgICB1c2VyOiBVc2VycyxcbiAgICogICAgIHBvc3Q6IFBvc3RzXG4gICAqICAgfTtcbiAgICpcbiAgICogICByZXR1cm4ge1xuICAgKiAgICAgZW5jb2RlOiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICogICAgICAgLy8gUmVwcmVzZW50IHRoZSBvYmplY3QgaW4gdGhlIFVSTCB1c2luZyBpdHMgdW5pcXVlIElEXG4gICAqICAgICAgIHJldHVybiBvYmplY3QuaWQ7XG4gICAqICAgICB9LFxuICAgKiAgICAgZGVjb2RlOiBmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gICAqICAgICAgIC8vIExvb2sgdXAgdGhlIG9iamVjdCBieSBJRCwgdXNpbmcgdGhlIHBhcmFtZXRlclxuICAgKiAgICAgICAvLyBuYW1lIChrZXkpIHRvIGNhbGwgdGhlIGNvcnJlY3Qgc2VydmljZVxuICAgKiAgICAgICByZXR1cm4gc2VydmljZXNba2V5XS5maW5kQnlJZCh2YWx1ZSk7XG4gICAqICAgICB9LFxuICAgKiAgICAgaXM6IGZ1bmN0aW9uKG9iamVjdCwga2V5KSB7XG4gICAqICAgICAgIC8vIENoZWNrIHRoYXQgb2JqZWN0IGlzIGEgdmFsaWQgZGJPYmplY3RcbiAgICogICAgICAgcmV0dXJuIGFuZ3VsYXIuaXNPYmplY3Qob2JqZWN0KSAmJiBvYmplY3QuaWQgJiYgc2VydmljZXNba2V5XTtcbiAgICogICAgIH1cbiAgICogICAgIGVxdWFsczogZnVuY3Rpb24oYSwgYikge1xuICAgKiAgICAgICAvLyBDaGVjayB0aGUgZXF1YWxpdHkgb2YgZGVjb2RlZCBvYmplY3RzIGJ5IGNvbXBhcmluZ1xuICAgKiAgICAgICAvLyB0aGVpciB1bmlxdWUgSURzXG4gICAqICAgICAgIHJldHVybiBhLmlkID09PSBiLmlkO1xuICAgKiAgICAgfVxuICAgKiAgIH07XG4gICAqIH0pO1xuICAgKlxuICAgKiAvLyBJbiBhIGNvbmZpZygpIGJsb2NrLCB5b3UgY2FuIHRoZW4gYXR0YWNoIFVSTHMgd2l0aFxuICAgKiAvLyB0eXBlLWFubm90YXRlZCBwYXJhbWV0ZXJzOlxuICAgKiAkc3RhdGVQcm92aWRlci5zdGF0ZSgndXNlcnMnLCB7XG4gICAqICAgdXJsOiBcIi91c2Vyc1wiLFxuICAgKiAgIC8vIC4uLlxuICAgKiB9KS5zdGF0ZSgndXNlcnMuaXRlbScsIHtcbiAgICogICB1cmw6IFwiL3t1c2VyOmRiT2JqZWN0fVwiLFxuICAgKiAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCRzY29wZSwgJHN0YXRlUGFyYW1zKSB7XG4gICAqICAgICAvLyAkc3RhdGVQYXJhbXMudXNlciB3aWxsIG5vdyBiZSBhbiBvYmplY3QgcmV0dXJuZWQgZnJvbVxuICAgKiAgICAgLy8gdGhlIFVzZXJzIHNlcnZpY2VcbiAgICogICB9LFxuICAgKiAgIC8vIC4uLlxuICAgKiB9KTtcbiAgICogPC9wcmU+XG4gICAqL1xuICB0aGlzLnR5cGUgPSBmdW5jdGlvbiAobmFtZSwgZGVmaW5pdGlvbiwgZGVmaW5pdGlvbkZuKSB7XG4gICAgaWYgKCFpc0RlZmluZWQoZGVmaW5pdGlvbikpIHJldHVybiAkdHlwZXNbbmFtZV07XG4gICAgaWYgKCR0eXBlcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkgdGhyb3cgbmV3IEVycm9yKFwiQSB0eXBlIG5hbWVkICdcIiArIG5hbWUgKyBcIicgaGFzIGFscmVhZHkgYmVlbiBkZWZpbmVkLlwiKTtcblxuICAgICR0eXBlc1tuYW1lXSA9IG5ldyBUeXBlKGV4dGVuZCh7IG5hbWU6IG5hbWUgfSwgZGVmaW5pdGlvbikpO1xuICAgIGlmIChkZWZpbml0aW9uRm4pIHtcbiAgICAgIHR5cGVRdWV1ZS5wdXNoKHsgbmFtZTogbmFtZSwgZGVmOiBkZWZpbml0aW9uRm4gfSk7XG4gICAgICBpZiAoIWVucXVldWUpIGZsdXNoVHlwZVF1ZXVlKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8vIGBmbHVzaFR5cGVRdWV1ZSgpYCB3YWl0cyB1bnRpbCBgJHVybE1hdGNoZXJGYWN0b3J5YCBpcyBpbmplY3RlZCBiZWZvcmUgaW52b2tpbmcgdGhlIHF1ZXVlZCBgZGVmaW5pdGlvbkZuYHNcbiAgZnVuY3Rpb24gZmx1c2hUeXBlUXVldWUoKSB7XG4gICAgd2hpbGUodHlwZVF1ZXVlLmxlbmd0aCkge1xuICAgICAgdmFyIHR5cGUgPSB0eXBlUXVldWUuc2hpZnQoKTtcbiAgICAgIGlmICh0eXBlLnBhdHRlcm4pIHRocm93IG5ldyBFcnJvcihcIllvdSBjYW5ub3Qgb3ZlcnJpZGUgYSB0eXBlJ3MgLnBhdHRlcm4gYXQgcnVudGltZS5cIik7XG4gICAgICBhbmd1bGFyLmV4dGVuZCgkdHlwZXNbdHlwZS5uYW1lXSwgaW5qZWN0b3IuaW52b2tlKHR5cGUuZGVmKSk7XG4gICAgfVxuICB9XG5cbiAgLy8gUmVnaXN0ZXIgZGVmYXVsdCB0eXBlcy4gU3RvcmUgdGhlbSBpbiB0aGUgcHJvdG90eXBlIG9mICR0eXBlcy5cbiAgZm9yRWFjaChkZWZhdWx0VHlwZXMsIGZ1bmN0aW9uKHR5cGUsIG5hbWUpIHsgJHR5cGVzW25hbWVdID0gbmV3IFR5cGUoZXh0ZW5kKHtuYW1lOiBuYW1lfSwgdHlwZSkpOyB9KTtcbiAgJHR5cGVzID0gaW5oZXJpdCgkdHlwZXMsIHt9KTtcblxuICAvKiBObyBuZWVkIHRvIGRvY3VtZW50ICRnZXQsIHNpbmNlIGl0IHJldHVybnMgdGhpcyAqL1xuICB0aGlzLiRnZXQgPSBbJyRpbmplY3RvcicsIGZ1bmN0aW9uICgkaW5qZWN0b3IpIHtcbiAgICBpbmplY3RvciA9ICRpbmplY3RvcjtcbiAgICBlbnF1ZXVlID0gZmFsc2U7XG4gICAgZmx1c2hUeXBlUXVldWUoKTtcblxuICAgIGZvckVhY2goZGVmYXVsdFR5cGVzLCBmdW5jdGlvbih0eXBlLCBuYW1lKSB7XG4gICAgICBpZiAoISR0eXBlc1tuYW1lXSkgJHR5cGVzW25hbWVdID0gbmV3IFR5cGUodHlwZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1dO1xuXG4gIHRoaXMuUGFyYW0gPSBmdW5jdGlvbiBQYXJhbShpZCwgdHlwZSwgY29uZmlnLCBsb2NhdGlvbikge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBjb25maWcgPSB1bndyYXBTaG9ydGhhbmQoY29uZmlnKTtcbiAgICB0eXBlID0gZ2V0VHlwZShjb25maWcsIHR5cGUsIGxvY2F0aW9uKTtcbiAgICB2YXIgYXJyYXlNb2RlID0gZ2V0QXJyYXlNb2RlKCk7XG4gICAgdHlwZSA9IGFycmF5TW9kZSA/IHR5cGUuJGFzQXJyYXkoYXJyYXlNb2RlLCBsb2NhdGlvbiA9PT0gXCJzZWFyY2hcIikgOiB0eXBlO1xuICAgIGlmICh0eXBlLm5hbWUgPT09IFwic3RyaW5nXCIgJiYgIWFycmF5TW9kZSAmJiBsb2NhdGlvbiA9PT0gXCJwYXRoXCIgJiYgY29uZmlnLnZhbHVlID09PSB1bmRlZmluZWQpXG4gICAgICBjb25maWcudmFsdWUgPSBcIlwiOyAvLyBmb3IgMC4yLng7IGluIDAuMy4wKyBkbyBub3QgYXV0b21hdGljYWxseSBkZWZhdWx0IHRvIFwiXCJcbiAgICB2YXIgaXNPcHRpb25hbCA9IGNvbmZpZy52YWx1ZSAhPT0gdW5kZWZpbmVkO1xuICAgIHZhciBzcXVhc2ggPSBnZXRTcXVhc2hQb2xpY3koY29uZmlnLCBpc09wdGlvbmFsKTtcbiAgICB2YXIgcmVwbGFjZSA9IGdldFJlcGxhY2UoY29uZmlnLCBhcnJheU1vZGUsIGlzT3B0aW9uYWwsIHNxdWFzaCk7XG5cbiAgICBmdW5jdGlvbiB1bndyYXBTaG9ydGhhbmQoY29uZmlnKSB7XG4gICAgICB2YXIga2V5cyA9IGlzT2JqZWN0KGNvbmZpZykgPyBvYmplY3RLZXlzKGNvbmZpZykgOiBbXTtcbiAgICAgIHZhciBpc1Nob3J0aGFuZCA9IGluZGV4T2Yoa2V5cywgXCJ2YWx1ZVwiKSA9PT0gLTEgJiYgaW5kZXhPZihrZXlzLCBcInR5cGVcIikgPT09IC0xICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleE9mKGtleXMsIFwic3F1YXNoXCIpID09PSAtMSAmJiBpbmRleE9mKGtleXMsIFwiYXJyYXlcIikgPT09IC0xO1xuICAgICAgaWYgKGlzU2hvcnRoYW5kKSBjb25maWcgPSB7IHZhbHVlOiBjb25maWcgfTtcbiAgICAgIGNvbmZpZy4kJGZuID0gaXNJbmplY3RhYmxlKGNvbmZpZy52YWx1ZSkgPyBjb25maWcudmFsdWUgOiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb25maWcudmFsdWU7IH07XG4gICAgICByZXR1cm4gY29uZmlnO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFR5cGUoY29uZmlnLCB1cmxUeXBlLCBsb2NhdGlvbikge1xuICAgICAgaWYgKGNvbmZpZy50eXBlICYmIHVybFR5cGUpIHRocm93IG5ldyBFcnJvcihcIlBhcmFtICdcIitpZCtcIicgaGFzIHR3byB0eXBlIGNvbmZpZ3VyYXRpb25zLlwiKTtcbiAgICAgIGlmICh1cmxUeXBlKSByZXR1cm4gdXJsVHlwZTtcbiAgICAgIGlmICghY29uZmlnLnR5cGUpIHJldHVybiAobG9jYXRpb24gPT09IFwiY29uZmlnXCIgPyAkdHlwZXMuYW55IDogJHR5cGVzLnN0cmluZyk7XG4gICAgICByZXR1cm4gY29uZmlnLnR5cGUgaW5zdGFuY2VvZiBUeXBlID8gY29uZmlnLnR5cGUgOiBuZXcgVHlwZShjb25maWcudHlwZSk7XG4gICAgfVxuXG4gICAgLy8gYXJyYXkgY29uZmlnOiBwYXJhbSBuYW1lIChwYXJhbVtdKSBvdmVycmlkZXMgZGVmYXVsdCBzZXR0aW5ncy4gIGV4cGxpY2l0IGNvbmZpZyBvdmVycmlkZXMgcGFyYW0gbmFtZS5cbiAgICBmdW5jdGlvbiBnZXRBcnJheU1vZGUoKSB7XG4gICAgICB2YXIgYXJyYXlEZWZhdWx0cyA9IHsgYXJyYXk6IChsb2NhdGlvbiA9PT0gXCJzZWFyY2hcIiA/IFwiYXV0b1wiIDogZmFsc2UpIH07XG4gICAgICB2YXIgYXJyYXlQYXJhbU5vbWVuY2xhdHVyZSA9IGlkLm1hdGNoKC9cXFtcXF0kLykgPyB7IGFycmF5OiB0cnVlIH0gOiB7fTtcbiAgICAgIHJldHVybiBleHRlbmQoYXJyYXlEZWZhdWx0cywgYXJyYXlQYXJhbU5vbWVuY2xhdHVyZSwgY29uZmlnKS5hcnJheTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZXR1cm5zIGZhbHNlLCB0cnVlLCBvciB0aGUgc3F1YXNoIHZhbHVlIHRvIGluZGljYXRlIHRoZSBcImRlZmF1bHQgcGFyYW1ldGVyIHVybCBzcXVhc2ggcG9saWN5XCIuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0U3F1YXNoUG9saWN5KGNvbmZpZywgaXNPcHRpb25hbCkge1xuICAgICAgdmFyIHNxdWFzaCA9IGNvbmZpZy5zcXVhc2g7XG4gICAgICBpZiAoIWlzT3B0aW9uYWwgfHwgc3F1YXNoID09PSBmYWxzZSkgcmV0dXJuIGZhbHNlO1xuICAgICAgaWYgKCFpc0RlZmluZWQoc3F1YXNoKSB8fCBzcXVhc2ggPT0gbnVsbCkgcmV0dXJuIGRlZmF1bHRTcXVhc2hQb2xpY3k7XG4gICAgICBpZiAoc3F1YXNoID09PSB0cnVlIHx8IGlzU3RyaW5nKHNxdWFzaCkpIHJldHVybiBzcXVhc2g7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHNxdWFzaCBwb2xpY3k6ICdcIiArIHNxdWFzaCArIFwiJy4gVmFsaWQgcG9saWNpZXM6IGZhbHNlLCB0cnVlLCBvciBhcmJpdHJhcnkgc3RyaW5nXCIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFJlcGxhY2UoY29uZmlnLCBhcnJheU1vZGUsIGlzT3B0aW9uYWwsIHNxdWFzaCkge1xuICAgICAgdmFyIHJlcGxhY2UsIGNvbmZpZ3VyZWRLZXlzLCBkZWZhdWx0UG9saWN5ID0gW1xuICAgICAgICB7IGZyb206IFwiXCIsICAgdG86IChpc09wdGlvbmFsIHx8IGFycmF5TW9kZSA/IHVuZGVmaW5lZCA6IFwiXCIpIH0sXG4gICAgICAgIHsgZnJvbTogbnVsbCwgdG86IChpc09wdGlvbmFsIHx8IGFycmF5TW9kZSA/IHVuZGVmaW5lZCA6IFwiXCIpIH1cbiAgICAgIF07XG4gICAgICByZXBsYWNlID0gaXNBcnJheShjb25maWcucmVwbGFjZSkgPyBjb25maWcucmVwbGFjZSA6IFtdO1xuICAgICAgaWYgKGlzU3RyaW5nKHNxdWFzaCkpXG4gICAgICAgIHJlcGxhY2UucHVzaCh7IGZyb206IHNxdWFzaCwgdG86IHVuZGVmaW5lZCB9KTtcbiAgICAgIGNvbmZpZ3VyZWRLZXlzID0gbWFwKHJlcGxhY2UsIGZ1bmN0aW9uKGl0ZW0pIHsgcmV0dXJuIGl0ZW0uZnJvbTsgfSApO1xuICAgICAgcmV0dXJuIGZpbHRlcihkZWZhdWx0UG9saWN5LCBmdW5jdGlvbihpdGVtKSB7IHJldHVybiBpbmRleE9mKGNvbmZpZ3VyZWRLZXlzLCBpdGVtLmZyb20pID09PSAtMTsgfSkuY29uY2F0KHJlcGxhY2UpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFtJbnRlcm5hbF0gR2V0IHRoZSBkZWZhdWx0IHZhbHVlIG9mIGEgcGFyYW1ldGVyLCB3aGljaCBtYXkgYmUgYW4gaW5qZWN0YWJsZSBmdW5jdGlvbi5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiAkJGdldERlZmF1bHRWYWx1ZSgpIHtcbiAgICAgIGlmICghaW5qZWN0b3IpIHRocm93IG5ldyBFcnJvcihcIkluamVjdGFibGUgZnVuY3Rpb25zIGNhbm5vdCBiZSBjYWxsZWQgYXQgY29uZmlndXJhdGlvbiB0aW1lXCIpO1xuICAgICAgcmV0dXJuIGluamVjdG9yLmludm9rZShjb25maWcuJCRmbik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogW0ludGVybmFsXSBHZXRzIHRoZSBkZWNvZGVkIHJlcHJlc2VudGF0aW9uIG9mIGEgdmFsdWUgaWYgdGhlIHZhbHVlIGlzIGRlZmluZWQsIG90aGVyd2lzZSwgcmV0dXJucyB0aGVcbiAgICAgKiBkZWZhdWx0IHZhbHVlLCB3aGljaCBtYXkgYmUgdGhlIHJlc3VsdCBvZiBhbiBpbmplY3RhYmxlIGZ1bmN0aW9uLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uICR2YWx1ZSh2YWx1ZSkge1xuICAgICAgZnVuY3Rpb24gaGFzUmVwbGFjZVZhbCh2YWwpIHsgcmV0dXJuIGZ1bmN0aW9uKG9iaikgeyByZXR1cm4gb2JqLmZyb20gPT09IHZhbDsgfTsgfVxuICAgICAgZnVuY3Rpb24gJHJlcGxhY2UodmFsdWUpIHtcbiAgICAgICAgdmFyIHJlcGxhY2VtZW50ID0gbWFwKGZpbHRlcihzZWxmLnJlcGxhY2UsIGhhc1JlcGxhY2VWYWwodmFsdWUpKSwgZnVuY3Rpb24ob2JqKSB7IHJldHVybiBvYmoudG87IH0pO1xuICAgICAgICByZXR1cm4gcmVwbGFjZW1lbnQubGVuZ3RoID8gcmVwbGFjZW1lbnRbMF0gOiB2YWx1ZTtcbiAgICAgIH1cbiAgICAgIHZhbHVlID0gJHJlcGxhY2UodmFsdWUpO1xuICAgICAgcmV0dXJuIGlzRGVmaW5lZCh2YWx1ZSkgPyBzZWxmLnR5cGUuZGVjb2RlKHZhbHVlKSA6ICQkZ2V0RGVmYXVsdFZhbHVlKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG9TdHJpbmcoKSB7IHJldHVybiBcIntQYXJhbTpcIiArIGlkICsgXCIgXCIgKyB0eXBlICsgXCIgc3F1YXNoOiAnXCIgKyBzcXVhc2ggKyBcIicgb3B0aW9uYWw6IFwiICsgaXNPcHRpb25hbCArIFwifVwiOyB9XG5cbiAgICBleHRlbmQodGhpcywge1xuICAgICAgaWQ6IGlkLFxuICAgICAgdHlwZTogdHlwZSxcbiAgICAgIGxvY2F0aW9uOiBsb2NhdGlvbixcbiAgICAgIGFycmF5OiBhcnJheU1vZGUsXG4gICAgICBzcXVhc2g6IHNxdWFzaCxcbiAgICAgIHJlcGxhY2U6IHJlcGxhY2UsXG4gICAgICBpc09wdGlvbmFsOiBpc09wdGlvbmFsLFxuICAgICAgdmFsdWU6ICR2YWx1ZSxcbiAgICAgIGR5bmFtaWM6IHVuZGVmaW5lZCxcbiAgICAgIGNvbmZpZzogY29uZmlnLFxuICAgICAgdG9TdHJpbmc6IHRvU3RyaW5nXG4gICAgfSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gUGFyYW1TZXQocGFyYW1zKSB7XG4gICAgZXh0ZW5kKHRoaXMsIHBhcmFtcyB8fCB7fSk7XG4gIH1cblxuICBQYXJhbVNldC5wcm90b3R5cGUgPSB7XG4gICAgJCRuZXc6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGluaGVyaXQodGhpcywgZXh0ZW5kKG5ldyBQYXJhbVNldCgpLCB7ICQkcGFyZW50OiB0aGlzfSkpO1xuICAgIH0sXG4gICAgJCRrZXlzOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIga2V5cyA9IFtdLCBjaGFpbiA9IFtdLCBwYXJlbnQgPSB0aGlzLFxuICAgICAgICBpZ25vcmUgPSBvYmplY3RLZXlzKFBhcmFtU2V0LnByb3RvdHlwZSk7XG4gICAgICB3aGlsZSAocGFyZW50KSB7IGNoYWluLnB1c2gocGFyZW50KTsgcGFyZW50ID0gcGFyZW50LiQkcGFyZW50OyB9XG4gICAgICBjaGFpbi5yZXZlcnNlKCk7XG4gICAgICBmb3JFYWNoKGNoYWluLCBmdW5jdGlvbihwYXJhbXNldCkge1xuICAgICAgICBmb3JFYWNoKG9iamVjdEtleXMocGFyYW1zZXQpLCBmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICAgIGlmIChpbmRleE9mKGtleXMsIGtleSkgPT09IC0xICYmIGluZGV4T2YoaWdub3JlLCBrZXkpID09PSAtMSkga2V5cy5wdXNoKGtleSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4ga2V5cztcbiAgICB9LFxuICAgICQkdmFsdWVzOiBmdW5jdGlvbihwYXJhbVZhbHVlcykge1xuICAgICAgdmFyIHZhbHVlcyA9IHt9LCBzZWxmID0gdGhpcztcbiAgICAgIGZvckVhY2goc2VsZi4kJGtleXMoKSwgZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgIHZhbHVlc1trZXldID0gc2VsZltrZXldLnZhbHVlKHBhcmFtVmFsdWVzICYmIHBhcmFtVmFsdWVzW2tleV0pO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gdmFsdWVzO1xuICAgIH0sXG4gICAgJCRlcXVhbHM6IGZ1bmN0aW9uKHBhcmFtVmFsdWVzMSwgcGFyYW1WYWx1ZXMyKSB7XG4gICAgICB2YXIgZXF1YWwgPSB0cnVlLCBzZWxmID0gdGhpcztcbiAgICAgIGZvckVhY2goc2VsZi4kJGtleXMoKSwgZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgIHZhciBsZWZ0ID0gcGFyYW1WYWx1ZXMxICYmIHBhcmFtVmFsdWVzMVtrZXldLCByaWdodCA9IHBhcmFtVmFsdWVzMiAmJiBwYXJhbVZhbHVlczJba2V5XTtcbiAgICAgICAgaWYgKCFzZWxmW2tleV0udHlwZS5lcXVhbHMobGVmdCwgcmlnaHQpKSBlcXVhbCA9IGZhbHNlO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gZXF1YWw7XG4gICAgfSxcbiAgICAkJHZhbGlkYXRlczogZnVuY3Rpb24gJCR2YWxpZGF0ZShwYXJhbVZhbHVlcykge1xuICAgICAgdmFyIHJlc3VsdCA9IHRydWUsIGlzT3B0aW9uYWwsIHZhbCwgcGFyYW0sIHNlbGYgPSB0aGlzO1xuXG4gICAgICBmb3JFYWNoKHRoaXMuJCRrZXlzKCksIGZ1bmN0aW9uKGtleSkge1xuICAgICAgICBwYXJhbSA9IHNlbGZba2V5XTtcbiAgICAgICAgdmFsID0gcGFyYW1WYWx1ZXNba2V5XTtcbiAgICAgICAgaXNPcHRpb25hbCA9ICF2YWwgJiYgcGFyYW0uaXNPcHRpb25hbDtcbiAgICAgICAgcmVzdWx0ID0gcmVzdWx0ICYmIChpc09wdGlvbmFsIHx8ICEhcGFyYW0udHlwZS5pcyh2YWwpKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LFxuICAgICQkcGFyZW50OiB1bmRlZmluZWRcbiAgfTtcblxuICB0aGlzLlBhcmFtU2V0ID0gUGFyYW1TZXQ7XG59XG5cbi8vIFJlZ2lzdGVyIGFzIGEgcHJvdmlkZXIgc28gaXQncyBhdmFpbGFibGUgdG8gb3RoZXIgcHJvdmlkZXJzXG5hbmd1bGFyLm1vZHVsZSgndWkucm91dGVyLnV0aWwnKS5wcm92aWRlcignJHVybE1hdGNoZXJGYWN0b3J5JywgJFVybE1hdGNoZXJGYWN0b3J5KTtcbmFuZ3VsYXIubW9kdWxlKCd1aS5yb3V0ZXIudXRpbCcpLnJ1bihbJyR1cmxNYXRjaGVyRmFjdG9yeScsIGZ1bmN0aW9uKCR1cmxNYXRjaGVyRmFjdG9yeSkgeyB9XSk7XG5cbi8qKlxuICogQG5nZG9jIG9iamVjdFxuICogQG5hbWUgdWkucm91dGVyLnJvdXRlci4kdXJsUm91dGVyUHJvdmlkZXJcbiAqXG4gKiBAcmVxdWlyZXMgdWkucm91dGVyLnV0aWwuJHVybE1hdGNoZXJGYWN0b3J5UHJvdmlkZXJcbiAqIEByZXF1aXJlcyAkbG9jYXRpb25Qcm92aWRlclxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogYCR1cmxSb3V0ZXJQcm92aWRlcmAgaGFzIHRoZSByZXNwb25zaWJpbGl0eSBvZiB3YXRjaGluZyBgJGxvY2F0aW9uYC4gXG4gKiBXaGVuIGAkbG9jYXRpb25gIGNoYW5nZXMgaXQgcnVucyB0aHJvdWdoIGEgbGlzdCBvZiBydWxlcyBvbmUgYnkgb25lIHVudGlsIGEgXG4gKiBtYXRjaCBpcyBmb3VuZC4gYCR1cmxSb3V0ZXJQcm92aWRlcmAgaXMgdXNlZCBiZWhpbmQgdGhlIHNjZW5lcyBhbnl0aW1lIHlvdSBzcGVjaWZ5IFxuICogYSB1cmwgaW4gYSBzdGF0ZSBjb25maWd1cmF0aW9uLiBBbGwgdXJscyBhcmUgY29tcGlsZWQgaW50byBhIFVybE1hdGNoZXIgb2JqZWN0LlxuICpcbiAqIFRoZXJlIGFyZSBzZXZlcmFsIG1ldGhvZHMgb24gYCR1cmxSb3V0ZXJQcm92aWRlcmAgdGhhdCBtYWtlIGl0IHVzZWZ1bCB0byB1c2UgZGlyZWN0bHlcbiAqIGluIHlvdXIgbW9kdWxlIGNvbmZpZy5cbiAqL1xuJFVybFJvdXRlclByb3ZpZGVyLiRpbmplY3QgPSBbJyRsb2NhdGlvblByb3ZpZGVyJywgJyR1cmxNYXRjaGVyRmFjdG9yeVByb3ZpZGVyJ107XG5mdW5jdGlvbiAkVXJsUm91dGVyUHJvdmlkZXIoICAgJGxvY2F0aW9uUHJvdmlkZXIsICAgJHVybE1hdGNoZXJGYWN0b3J5KSB7XG4gIHZhciBydWxlcyA9IFtdLCBvdGhlcndpc2UgPSBudWxsLCBpbnRlcmNlcHREZWZlcnJlZCA9IGZhbHNlLCBsaXN0ZW5lcjtcblxuICAvLyBSZXR1cm5zIGEgc3RyaW5nIHRoYXQgaXMgYSBwcmVmaXggb2YgYWxsIHN0cmluZ3MgbWF0Y2hpbmcgdGhlIFJlZ0V4cFxuICBmdW5jdGlvbiByZWdFeHBQcmVmaXgocmUpIHtcbiAgICB2YXIgcHJlZml4ID0gL15cXF4oKD86XFxcXFteYS16QS1aMC05XXxbXlxcXFxcXFtcXF1cXF4kKis/LigpfHt9XSspKikvLmV4ZWMocmUuc291cmNlKTtcbiAgICByZXR1cm4gKHByZWZpeCAhPSBudWxsKSA/IHByZWZpeFsxXS5yZXBsYWNlKC9cXFxcKC4pL2csIFwiJDFcIikgOiAnJztcbiAgfVxuXG4gIC8vIEludGVycG9sYXRlcyBtYXRjaGVkIHZhbHVlcyBpbnRvIGEgU3RyaW5nLnJlcGxhY2UoKS1zdHlsZSBwYXR0ZXJuXG4gIGZ1bmN0aW9uIGludGVycG9sYXRlKHBhdHRlcm4sIG1hdGNoKSB7XG4gICAgcmV0dXJuIHBhdHRlcm4ucmVwbGFjZSgvXFwkKFxcJHxcXGR7MSwyfSkvLCBmdW5jdGlvbiAobSwgd2hhdCkge1xuICAgICAgcmV0dXJuIG1hdGNoW3doYXQgPT09ICckJyA/IDAgOiBOdW1iZXIod2hhdCldO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBuZ2RvYyBmdW5jdGlvblxuICAgKiBAbmFtZSB1aS5yb3V0ZXIucm91dGVyLiR1cmxSb3V0ZXJQcm92aWRlciNydWxlXG4gICAqIEBtZXRob2RPZiB1aS5yb3V0ZXIucm91dGVyLiR1cmxSb3V0ZXJQcm92aWRlclxuICAgKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogRGVmaW5lcyBydWxlcyB0aGF0IGFyZSB1c2VkIGJ5IGAkdXJsUm91dGVyUHJvdmlkZXJgIHRvIGZpbmQgbWF0Y2hlcyBmb3JcbiAgICogc3BlY2lmaWMgVVJMcy5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogPHByZT5cbiAgICogdmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbJ3VpLnJvdXRlci5yb3V0ZXInXSk7XG4gICAqXG4gICAqIGFwcC5jb25maWcoZnVuY3Rpb24gKCR1cmxSb3V0ZXJQcm92aWRlcikge1xuICAgKiAgIC8vIEhlcmUncyBhbiBleGFtcGxlIG9mIGhvdyB5b3UgbWlnaHQgYWxsb3cgY2FzZSBpbnNlbnNpdGl2ZSB1cmxzXG4gICAqICAgJHVybFJvdXRlclByb3ZpZGVyLnJ1bGUoZnVuY3Rpb24gKCRpbmplY3RvciwgJGxvY2F0aW9uKSB7XG4gICAqICAgICB2YXIgcGF0aCA9ICRsb2NhdGlvbi5wYXRoKCksXG4gICAqICAgICAgICAgbm9ybWFsaXplZCA9IHBhdGgudG9Mb3dlckNhc2UoKTtcbiAgICpcbiAgICogICAgIGlmIChwYXRoICE9PSBub3JtYWxpemVkKSB7XG4gICAqICAgICAgIHJldHVybiBub3JtYWxpemVkO1xuICAgKiAgICAgfVxuICAgKiAgIH0pO1xuICAgKiB9KTtcbiAgICogPC9wcmU+XG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBydWxlIEhhbmRsZXIgZnVuY3Rpb24gdGhhdCB0YWtlcyBgJGluamVjdG9yYCBhbmQgYCRsb2NhdGlvbmBcbiAgICogc2VydmljZXMgYXMgYXJndW1lbnRzLiBZb3UgY2FuIHVzZSB0aGVtIHRvIHJldHVybiBhIHZhbGlkIHBhdGggYXMgYSBzdHJpbmcuXG4gICAqXG4gICAqIEByZXR1cm4ge29iamVjdH0gYCR1cmxSb3V0ZXJQcm92aWRlcmAgLSBgJHVybFJvdXRlclByb3ZpZGVyYCBpbnN0YW5jZVxuICAgKi9cbiAgdGhpcy5ydWxlID0gZnVuY3Rpb24gKHJ1bGUpIHtcbiAgICBpZiAoIWlzRnVuY3Rpb24ocnVsZSkpIHRocm93IG5ldyBFcnJvcihcIidydWxlJyBtdXN0IGJlIGEgZnVuY3Rpb25cIik7XG4gICAgcnVsZXMucHVzaChydWxlKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvKipcbiAgICogQG5nZG9jIG9iamVjdFxuICAgKiBAbmFtZSB1aS5yb3V0ZXIucm91dGVyLiR1cmxSb3V0ZXJQcm92aWRlciNvdGhlcndpc2VcbiAgICogQG1ldGhvZE9mIHVpLnJvdXRlci5yb3V0ZXIuJHVybFJvdXRlclByb3ZpZGVyXG4gICAqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBEZWZpbmVzIGEgcGF0aCB0aGF0IGlzIHVzZWQgd2hlbiBhbiBpbnZhbGlkIHJvdXRlIGlzIHJlcXVlc3RlZC5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogPHByZT5cbiAgICogdmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbJ3VpLnJvdXRlci5yb3V0ZXInXSk7XG4gICAqXG4gICAqIGFwcC5jb25maWcoZnVuY3Rpb24gKCR1cmxSb3V0ZXJQcm92aWRlcikge1xuICAgKiAgIC8vIGlmIHRoZSBwYXRoIGRvZXNuJ3QgbWF0Y2ggYW55IG9mIHRoZSB1cmxzIHlvdSBjb25maWd1cmVkXG4gICAqICAgLy8gb3RoZXJ3aXNlIHdpbGwgdGFrZSBjYXJlIG9mIHJvdXRpbmcgdGhlIHVzZXIgdG8gdGhlXG4gICAqICAgLy8gc3BlY2lmaWVkIHVybFxuICAgKiAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy9pbmRleCcpO1xuICAgKlxuICAgKiAgIC8vIEV4YW1wbGUgb2YgdXNpbmcgZnVuY3Rpb24gcnVsZSBhcyBwYXJhbVxuICAgKiAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoZnVuY3Rpb24gKCRpbmplY3RvciwgJGxvY2F0aW9uKSB7XG4gICAqICAgICByZXR1cm4gJy9hL3ZhbGlkL3VybCc7XG4gICAqICAgfSk7XG4gICAqIH0pO1xuICAgKiA8L3ByZT5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd8b2JqZWN0fSBydWxlIFRoZSB1cmwgcGF0aCB5b3Ugd2FudCB0byByZWRpcmVjdCB0byBvciBhIGZ1bmN0aW9uIFxuICAgKiBydWxlIHRoYXQgcmV0dXJucyB0aGUgdXJsIHBhdGguIFRoZSBmdW5jdGlvbiB2ZXJzaW9uIGlzIHBhc3NlZCB0d28gcGFyYW1zOiBcbiAgICogYCRpbmplY3RvcmAgYW5kIGAkbG9jYXRpb25gIHNlcnZpY2VzLCBhbmQgbXVzdCByZXR1cm4gYSB1cmwgc3RyaW5nLlxuICAgKlxuICAgKiBAcmV0dXJuIHtvYmplY3R9IGAkdXJsUm91dGVyUHJvdmlkZXJgIC0gYCR1cmxSb3V0ZXJQcm92aWRlcmAgaW5zdGFuY2VcbiAgICovXG4gIHRoaXMub3RoZXJ3aXNlID0gZnVuY3Rpb24gKHJ1bGUpIHtcbiAgICBpZiAoaXNTdHJpbmcocnVsZSkpIHtcbiAgICAgIHZhciByZWRpcmVjdCA9IHJ1bGU7XG4gICAgICBydWxlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gcmVkaXJlY3Q7IH07XG4gICAgfVxuICAgIGVsc2UgaWYgKCFpc0Z1bmN0aW9uKHJ1bGUpKSB0aHJvdyBuZXcgRXJyb3IoXCIncnVsZScgbXVzdCBiZSBhIGZ1bmN0aW9uXCIpO1xuICAgIG90aGVyd2lzZSA9IHJ1bGU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cblxuICBmdW5jdGlvbiBoYW5kbGVJZk1hdGNoKCRpbmplY3RvciwgaGFuZGxlciwgbWF0Y2gpIHtcbiAgICBpZiAoIW1hdGNoKSByZXR1cm4gZmFsc2U7XG4gICAgdmFyIHJlc3VsdCA9ICRpbmplY3Rvci5pbnZva2UoaGFuZGxlciwgaGFuZGxlciwgeyAkbWF0Y2g6IG1hdGNoIH0pO1xuICAgIHJldHVybiBpc0RlZmluZWQocmVzdWx0KSA/IHJlc3VsdCA6IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogQG5nZG9jIGZ1bmN0aW9uXG4gICAqIEBuYW1lIHVpLnJvdXRlci5yb3V0ZXIuJHVybFJvdXRlclByb3ZpZGVyI3doZW5cbiAgICogQG1ldGhvZE9mIHVpLnJvdXRlci5yb3V0ZXIuJHVybFJvdXRlclByb3ZpZGVyXG4gICAqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBSZWdpc3RlcnMgYSBoYW5kbGVyIGZvciBhIGdpdmVuIHVybCBtYXRjaGluZy4gaWYgaGFuZGxlIGlzIGEgc3RyaW5nLCBpdCBpc1xuICAgKiB0cmVhdGVkIGFzIGEgcmVkaXJlY3QsIGFuZCBpcyBpbnRlcnBvbGF0ZWQgYWNjb3JkaW5nIHRvIHRoZSBzeW50YXggb2YgbWF0Y2hcbiAgICogKGkuZS4gbGlrZSBgU3RyaW5nLnJlcGxhY2UoKWAgZm9yIGBSZWdFeHBgLCBvciBsaWtlIGEgYFVybE1hdGNoZXJgIHBhdHRlcm4gb3RoZXJ3aXNlKS5cbiAgICpcbiAgICogSWYgdGhlIGhhbmRsZXIgaXMgYSBmdW5jdGlvbiwgaXQgaXMgaW5qZWN0YWJsZS4gSXQgZ2V0cyBpbnZva2VkIGlmIGAkbG9jYXRpb25gXG4gICAqIG1hdGNoZXMuIFlvdSBoYXZlIHRoZSBvcHRpb24gb2YgaW5qZWN0IHRoZSBtYXRjaCBvYmplY3QgYXMgYCRtYXRjaGAuXG4gICAqXG4gICAqIFRoZSBoYW5kbGVyIGNhbiByZXR1cm5cbiAgICpcbiAgICogLSAqKmZhbHN5KiogdG8gaW5kaWNhdGUgdGhhdCB0aGUgcnVsZSBkaWRuJ3QgbWF0Y2ggYWZ0ZXIgYWxsLCB0aGVuIGAkdXJsUm91dGVyYFxuICAgKiAgIHdpbGwgY29udGludWUgdHJ5aW5nIHRvIGZpbmQgYW5vdGhlciBvbmUgdGhhdCBtYXRjaGVzLlxuICAgKiAtICoqc3RyaW5nKiogd2hpY2ggaXMgdHJlYXRlZCBhcyBhIHJlZGlyZWN0IGFuZCBwYXNzZWQgdG8gYCRsb2NhdGlvbi51cmwoKWBcbiAgICogLSAqKnZvaWQqKiBvciBhbnkgKip0cnV0aHkqKiB2YWx1ZSB0ZWxscyBgJHVybFJvdXRlcmAgdGhhdCB0aGUgdXJsIHdhcyBoYW5kbGVkLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiA8cHJlPlxuICAgKiB2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2FwcCcsIFsndWkucm91dGVyLnJvdXRlciddKTtcbiAgICpcbiAgICogYXBwLmNvbmZpZyhmdW5jdGlvbiAoJHVybFJvdXRlclByb3ZpZGVyKSB7XG4gICAqICAgJHVybFJvdXRlclByb3ZpZGVyLndoZW4oJHN0YXRlLnVybCwgZnVuY3Rpb24gKCRtYXRjaCwgJHN0YXRlUGFyYW1zKSB7XG4gICAqICAgICBpZiAoJHN0YXRlLiRjdXJyZW50Lm5hdmlnYWJsZSAhPT0gc3RhdGUgfHxcbiAgICogICAgICAgICAhZXF1YWxGb3JLZXlzKCRtYXRjaCwgJHN0YXRlUGFyYW1zKSB7XG4gICAqICAgICAgJHN0YXRlLnRyYW5zaXRpb25UbyhzdGF0ZSwgJG1hdGNoLCBmYWxzZSk7XG4gICAqICAgICB9XG4gICAqICAgfSk7XG4gICAqIH0pO1xuICAgKiA8L3ByZT5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd8b2JqZWN0fSB3aGF0IFRoZSBpbmNvbWluZyBwYXRoIHRoYXQgeW91IHdhbnQgdG8gcmVkaXJlY3QuXG4gICAqIEBwYXJhbSB7c3RyaW5nfG9iamVjdH0gaGFuZGxlciBUaGUgcGF0aCB5b3Ugd2FudCB0byByZWRpcmVjdCB5b3VyIHVzZXIgdG8uXG4gICAqL1xuICB0aGlzLndoZW4gPSBmdW5jdGlvbiAod2hhdCwgaGFuZGxlcikge1xuICAgIHZhciByZWRpcmVjdCwgaGFuZGxlcklzU3RyaW5nID0gaXNTdHJpbmcoaGFuZGxlcik7XG4gICAgaWYgKGlzU3RyaW5nKHdoYXQpKSB3aGF0ID0gJHVybE1hdGNoZXJGYWN0b3J5LmNvbXBpbGUod2hhdCk7XG5cbiAgICBpZiAoIWhhbmRsZXJJc1N0cmluZyAmJiAhaXNGdW5jdGlvbihoYW5kbGVyKSAmJiAhaXNBcnJheShoYW5kbGVyKSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihcImludmFsaWQgJ2hhbmRsZXInIGluIHdoZW4oKVwiKTtcblxuICAgIHZhciBzdHJhdGVnaWVzID0ge1xuICAgICAgbWF0Y2hlcjogZnVuY3Rpb24gKHdoYXQsIGhhbmRsZXIpIHtcbiAgICAgICAgaWYgKGhhbmRsZXJJc1N0cmluZykge1xuICAgICAgICAgIHJlZGlyZWN0ID0gJHVybE1hdGNoZXJGYWN0b3J5LmNvbXBpbGUoaGFuZGxlcik7XG4gICAgICAgICAgaGFuZGxlciA9IFsnJG1hdGNoJywgZnVuY3Rpb24gKCRtYXRjaCkgeyByZXR1cm4gcmVkaXJlY3QuZm9ybWF0KCRtYXRjaCk7IH1dO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBleHRlbmQoZnVuY3Rpb24gKCRpbmplY3RvciwgJGxvY2F0aW9uKSB7XG4gICAgICAgICAgcmV0dXJuIGhhbmRsZUlmTWF0Y2goJGluamVjdG9yLCBoYW5kbGVyLCB3aGF0LmV4ZWMoJGxvY2F0aW9uLnBhdGgoKSwgJGxvY2F0aW9uLnNlYXJjaCgpKSk7XG4gICAgICAgIH0sIHtcbiAgICAgICAgICBwcmVmaXg6IGlzU3RyaW5nKHdoYXQucHJlZml4KSA/IHdoYXQucHJlZml4IDogJydcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgcmVnZXg6IGZ1bmN0aW9uICh3aGF0LCBoYW5kbGVyKSB7XG4gICAgICAgIGlmICh3aGF0Lmdsb2JhbCB8fCB3aGF0LnN0aWNreSkgdGhyb3cgbmV3IEVycm9yKFwid2hlbigpIFJlZ0V4cCBtdXN0IG5vdCBiZSBnbG9iYWwgb3Igc3RpY2t5XCIpO1xuXG4gICAgICAgIGlmIChoYW5kbGVySXNTdHJpbmcpIHtcbiAgICAgICAgICByZWRpcmVjdCA9IGhhbmRsZXI7XG4gICAgICAgICAgaGFuZGxlciA9IFsnJG1hdGNoJywgZnVuY3Rpb24gKCRtYXRjaCkgeyByZXR1cm4gaW50ZXJwb2xhdGUocmVkaXJlY3QsICRtYXRjaCk7IH1dO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBleHRlbmQoZnVuY3Rpb24gKCRpbmplY3RvciwgJGxvY2F0aW9uKSB7XG4gICAgICAgICAgcmV0dXJuIGhhbmRsZUlmTWF0Y2goJGluamVjdG9yLCBoYW5kbGVyLCB3aGF0LmV4ZWMoJGxvY2F0aW9uLnBhdGgoKSkpO1xuICAgICAgICB9LCB7XG4gICAgICAgICAgcHJlZml4OiByZWdFeHBQcmVmaXgod2hhdClcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZhciBjaGVjayA9IHsgbWF0Y2hlcjogJHVybE1hdGNoZXJGYWN0b3J5LmlzTWF0Y2hlcih3aGF0KSwgcmVnZXg6IHdoYXQgaW5zdGFuY2VvZiBSZWdFeHAgfTtcblxuICAgIGZvciAodmFyIG4gaW4gY2hlY2spIHtcbiAgICAgIGlmIChjaGVja1tuXSkgcmV0dXJuIHRoaXMucnVsZShzdHJhdGVnaWVzW25dKHdoYXQsIGhhbmRsZXIpKTtcbiAgICB9XG5cbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbnZhbGlkICd3aGF0JyBpbiB3aGVuKClcIik7XG4gIH07XG5cbiAgLyoqXG4gICAqIEBuZ2RvYyBmdW5jdGlvblxuICAgKiBAbmFtZSB1aS5yb3V0ZXIucm91dGVyLiR1cmxSb3V0ZXJQcm92aWRlciNkZWZlckludGVyY2VwdFxuICAgKiBAbWV0aG9kT2YgdWkucm91dGVyLnJvdXRlci4kdXJsUm91dGVyUHJvdmlkZXJcbiAgICpcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIERpc2FibGVzIChvciBlbmFibGVzKSBkZWZlcnJpbmcgbG9jYXRpb24gY2hhbmdlIGludGVyY2VwdGlvbi5cbiAgICpcbiAgICogSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIHRoZSBiZWhhdmlvciBvZiBzeW5jaW5nIHRoZSBVUkwgKGZvciBleGFtcGxlLCBpZiB5b3Ugd2lzaCB0b1xuICAgKiBkZWZlciBhIHRyYW5zaXRpb24gYnV0IG1haW50YWluIHRoZSBjdXJyZW50IFVSTCksIGNhbGwgdGhpcyBtZXRob2QgYXQgY29uZmlndXJhdGlvbiB0aW1lLlxuICAgKiBUaGVuLCBhdCBydW4gdGltZSwgY2FsbCBgJHVybFJvdXRlci5saXN0ZW4oKWAgYWZ0ZXIgeW91IGhhdmUgY29uZmlndXJlZCB5b3VyIG93blxuICAgKiBgJGxvY2F0aW9uQ2hhbmdlU3VjY2Vzc2AgZXZlbnQgaGFuZGxlci5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogPHByZT5cbiAgICogdmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbJ3VpLnJvdXRlci5yb3V0ZXInXSk7XG4gICAqXG4gICAqIGFwcC5jb25maWcoZnVuY3Rpb24gKCR1cmxSb3V0ZXJQcm92aWRlcikge1xuICAgKlxuICAgKiAgIC8vIFByZXZlbnQgJHVybFJvdXRlciBmcm9tIGF1dG9tYXRpY2FsbHkgaW50ZXJjZXB0aW5nIFVSTCBjaGFuZ2VzO1xuICAgKiAgIC8vIHRoaXMgYWxsb3dzIHlvdSB0byBjb25maWd1cmUgY3VzdG9tIGJlaGF2aW9yIGluIGJldHdlZW5cbiAgICogICAvLyBsb2NhdGlvbiBjaGFuZ2VzIGFuZCByb3V0ZSBzeW5jaHJvbml6YXRpb246XG4gICAqICAgJHVybFJvdXRlclByb3ZpZGVyLmRlZmVySW50ZXJjZXB0KCk7XG4gICAqXG4gICAqIH0pLnJ1bihmdW5jdGlvbiAoJHJvb3RTY29wZSwgJHVybFJvdXRlciwgVXNlclNlcnZpY2UpIHtcbiAgICpcbiAgICogICAkcm9vdFNjb3BlLiRvbignJGxvY2F0aW9uQ2hhbmdlU3VjY2VzcycsIGZ1bmN0aW9uKGUpIHtcbiAgICogICAgIC8vIFVzZXJTZXJ2aWNlIGlzIGFuIGV4YW1wbGUgc2VydmljZSBmb3IgbWFuYWdpbmcgdXNlciBzdGF0ZVxuICAgKiAgICAgaWYgKFVzZXJTZXJ2aWNlLmlzTG9nZ2VkSW4oKSkgcmV0dXJuO1xuICAgKlxuICAgKiAgICAgLy8gUHJldmVudCAkdXJsUm91dGVyJ3MgZGVmYXVsdCBoYW5kbGVyIGZyb20gZmlyaW5nXG4gICAqICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAqXG4gICAqICAgICBVc2VyU2VydmljZS5oYW5kbGVMb2dpbigpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAqICAgICAgIC8vIE9uY2UgdGhlIHVzZXIgaGFzIGxvZ2dlZCBpbiwgc3luYyB0aGUgY3VycmVudCBVUkxcbiAgICogICAgICAgLy8gdG8gdGhlIHJvdXRlcjpcbiAgICogICAgICAgJHVybFJvdXRlci5zeW5jKCk7XG4gICAqICAgICB9KTtcbiAgICogICB9KTtcbiAgICpcbiAgICogICAvLyBDb25maWd1cmVzICR1cmxSb3V0ZXIncyBsaXN0ZW5lciAqYWZ0ZXIqIHlvdXIgY3VzdG9tIGxpc3RlbmVyXG4gICAqICAgJHVybFJvdXRlci5saXN0ZW4oKTtcbiAgICogfSk7XG4gICAqIDwvcHJlPlxuICAgKlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGRlZmVyIEluZGljYXRlcyB3aGV0aGVyIHRvIGRlZmVyIGxvY2F0aW9uIGNoYW5nZSBpbnRlcmNlcHRpb24uIFBhc3NpbmdcbiAgICAgICAgICAgIG5vIHBhcmFtZXRlciBpcyBlcXVpdmFsZW50IHRvIGB0cnVlYC5cbiAgICovXG4gIHRoaXMuZGVmZXJJbnRlcmNlcHQgPSBmdW5jdGlvbiAoZGVmZXIpIHtcbiAgICBpZiAoZGVmZXIgPT09IHVuZGVmaW5lZCkgZGVmZXIgPSB0cnVlO1xuICAgIGludGVyY2VwdERlZmVycmVkID0gZGVmZXI7XG4gIH07XG5cbiAgLyoqXG4gICAqIEBuZ2RvYyBvYmplY3RcbiAgICogQG5hbWUgdWkucm91dGVyLnJvdXRlci4kdXJsUm91dGVyXG4gICAqXG4gICAqIEByZXF1aXJlcyAkbG9jYXRpb25cbiAgICogQHJlcXVpcmVzICRyb290U2NvcGVcbiAgICogQHJlcXVpcmVzICRpbmplY3RvclxuICAgKiBAcmVxdWlyZXMgJGJyb3dzZXJcbiAgICpcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqXG4gICAqL1xuICB0aGlzLiRnZXQgPSAkZ2V0O1xuICAkZ2V0LiRpbmplY3QgPSBbJyRsb2NhdGlvbicsICckcm9vdFNjb3BlJywgJyRpbmplY3RvcicsICckYnJvd3NlciddO1xuICBmdW5jdGlvbiAkZ2V0KCAgICRsb2NhdGlvbiwgICAkcm9vdFNjb3BlLCAgICRpbmplY3RvciwgICAkYnJvd3Nlcikge1xuXG4gICAgdmFyIGJhc2VIcmVmID0gJGJyb3dzZXIuYmFzZUhyZWYoKSwgbG9jYXRpb24gPSAkbG9jYXRpb24udXJsKCksIGxhc3RQdXNoZWRVcmw7XG5cbiAgICBmdW5jdGlvbiBhcHBlbmRCYXNlUGF0aCh1cmwsIGlzSHRtbDUsIGFic29sdXRlKSB7XG4gICAgICBpZiAoYmFzZUhyZWYgPT09ICcvJykgcmV0dXJuIHVybDtcbiAgICAgIGlmIChpc0h0bWw1KSByZXR1cm4gYmFzZUhyZWYuc2xpY2UoMCwgLTEpICsgdXJsO1xuICAgICAgaWYgKGFic29sdXRlKSByZXR1cm4gYmFzZUhyZWYuc2xpY2UoMSkgKyB1cmw7XG4gICAgICByZXR1cm4gdXJsO1xuICAgIH1cblxuICAgIC8vIFRPRE86IE9wdGltaXplIGdyb3VwcyBvZiBydWxlcyB3aXRoIG5vbi1lbXB0eSBwcmVmaXggaW50byBzb21lIHNvcnQgb2YgZGVjaXNpb24gdHJlZVxuICAgIGZ1bmN0aW9uIHVwZGF0ZShldnQpIHtcbiAgICAgIGlmIChldnQgJiYgZXZ0LmRlZmF1bHRQcmV2ZW50ZWQpIHJldHVybjtcbiAgICAgIHZhciBpZ25vcmVVcGRhdGUgPSBsYXN0UHVzaGVkVXJsICYmICRsb2NhdGlvbi51cmwoKSA9PT0gbGFzdFB1c2hlZFVybDtcbiAgICAgIGxhc3RQdXNoZWRVcmwgPSB1bmRlZmluZWQ7XG4gICAgICBpZiAoaWdub3JlVXBkYXRlKSByZXR1cm4gdHJ1ZTtcblxuICAgICAgZnVuY3Rpb24gY2hlY2socnVsZSkge1xuICAgICAgICB2YXIgaGFuZGxlZCA9IHJ1bGUoJGluamVjdG9yLCAkbG9jYXRpb24pO1xuXG4gICAgICAgIGlmICghaGFuZGxlZCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAoaXNTdHJpbmcoaGFuZGxlZCkpICRsb2NhdGlvbi5yZXBsYWNlKCkudXJsKGhhbmRsZWQpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHZhciBuID0gcnVsZXMubGVuZ3RoLCBpO1xuXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgIGlmIChjaGVjayhydWxlc1tpXSkpIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIGFsd2F5cyBjaGVjayBvdGhlcndpc2UgbGFzdCB0byBhbGxvdyBkeW5hbWljIHVwZGF0ZXMgdG8gdGhlIHNldCBvZiBydWxlc1xuICAgICAgaWYgKG90aGVyd2lzZSkgY2hlY2sob3RoZXJ3aXNlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaXN0ZW4oKSB7XG4gICAgICBsaXN0ZW5lciA9IGxpc3RlbmVyIHx8ICRyb290U2NvcGUuJG9uKCckbG9jYXRpb25DaGFuZ2VTdWNjZXNzJywgdXBkYXRlKTtcbiAgICAgIHJldHVybiBsaXN0ZW5lcjtcbiAgICB9XG5cbiAgICBpZiAoIWludGVyY2VwdERlZmVycmVkKSBsaXN0ZW4oKTtcblxuICAgIHJldHVybiB7XG4gICAgICAvKipcbiAgICAgICAqIEBuZ2RvYyBmdW5jdGlvblxuICAgICAgICogQG5hbWUgdWkucm91dGVyLnJvdXRlci4kdXJsUm91dGVyI3N5bmNcbiAgICAgICAqIEBtZXRob2RPZiB1aS5yb3V0ZXIucm91dGVyLiR1cmxSb3V0ZXJcbiAgICAgICAqXG4gICAgICAgKiBAZGVzY3JpcHRpb25cbiAgICAgICAqIFRyaWdnZXJzIGFuIHVwZGF0ZTsgdGhlIHNhbWUgdXBkYXRlIHRoYXQgaGFwcGVucyB3aGVuIHRoZSBhZGRyZXNzIGJhciB1cmwgY2hhbmdlcywgYWthIGAkbG9jYXRpb25DaGFuZ2VTdWNjZXNzYC5cbiAgICAgICAqIFRoaXMgbWV0aG9kIGlzIHVzZWZ1bCB3aGVuIHlvdSBuZWVkIHRvIHVzZSBgcHJldmVudERlZmF1bHQoKWAgb24gdGhlIGAkbG9jYXRpb25DaGFuZ2VTdWNjZXNzYCBldmVudCxcbiAgICAgICAqIHBlcmZvcm0gc29tZSBjdXN0b20gbG9naWMgKHJvdXRlIHByb3RlY3Rpb24sIGF1dGgsIGNvbmZpZywgcmVkaXJlY3Rpb24sIGV0YykgYW5kIHRoZW4gZmluYWxseSBwcm9jZWVkXG4gICAgICAgKiB3aXRoIHRoZSB0cmFuc2l0aW9uIGJ5IGNhbGxpbmcgYCR1cmxSb3V0ZXIuc3luYygpYC5cbiAgICAgICAqXG4gICAgICAgKiBAZXhhbXBsZVxuICAgICAgICogPHByZT5cbiAgICAgICAqIGFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbJ3VpLnJvdXRlciddKVxuICAgICAgICogICAucnVuKGZ1bmN0aW9uKCRyb290U2NvcGUsICR1cmxSb3V0ZXIpIHtcbiAgICAgICAqICAgICAkcm9vdFNjb3BlLiRvbignJGxvY2F0aW9uQ2hhbmdlU3VjY2VzcycsIGZ1bmN0aW9uKGV2dCkge1xuICAgICAgICogICAgICAgLy8gSGFsdCBzdGF0ZSBjaGFuZ2UgZnJvbSBldmVuIHN0YXJ0aW5nXG4gICAgICAgKiAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAqICAgICAgIC8vIFBlcmZvcm0gY3VzdG9tIGxvZ2ljXG4gICAgICAgKiAgICAgICB2YXIgbWVldHNSZXF1aXJlbWVudCA9IC4uLlxuICAgICAgICogICAgICAgLy8gQ29udGludWUgd2l0aCB0aGUgdXBkYXRlIGFuZCBzdGF0ZSB0cmFuc2l0aW9uIGlmIGxvZ2ljIGFsbG93c1xuICAgICAgICogICAgICAgaWYgKG1lZXRzUmVxdWlyZW1lbnQpICR1cmxSb3V0ZXIuc3luYygpO1xuICAgICAgICogICAgIH0pO1xuICAgICAgICogfSk7XG4gICAgICAgKiA8L3ByZT5cbiAgICAgICAqL1xuICAgICAgc3luYzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHVwZGF0ZSgpO1xuICAgICAgfSxcblxuICAgICAgbGlzdGVuOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGxpc3RlbigpO1xuICAgICAgfSxcblxuICAgICAgdXBkYXRlOiBmdW5jdGlvbihyZWFkKSB7XG4gICAgICAgIGlmIChyZWFkKSB7XG4gICAgICAgICAgbG9jYXRpb24gPSAkbG9jYXRpb24udXJsKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICgkbG9jYXRpb24udXJsKCkgPT09IGxvY2F0aW9uKSByZXR1cm47XG5cbiAgICAgICAgJGxvY2F0aW9uLnVybChsb2NhdGlvbik7XG4gICAgICAgICRsb2NhdGlvbi5yZXBsYWNlKCk7XG4gICAgICB9LFxuXG4gICAgICBwdXNoOiBmdW5jdGlvbih1cmxNYXRjaGVyLCBwYXJhbXMsIG9wdGlvbnMpIHtcbiAgICAgICAgJGxvY2F0aW9uLnVybCh1cmxNYXRjaGVyLmZvcm1hdChwYXJhbXMgfHwge30pKTtcbiAgICAgICAgbGFzdFB1c2hlZFVybCA9IG9wdGlvbnMgJiYgb3B0aW9ucy4kJGF2b2lkUmVzeW5jID8gJGxvY2F0aW9uLnVybCgpIDogdW5kZWZpbmVkO1xuICAgICAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLnJlcGxhY2UpICRsb2NhdGlvbi5yZXBsYWNlKCk7XG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIEBuZ2RvYyBmdW5jdGlvblxuICAgICAgICogQG5hbWUgdWkucm91dGVyLnJvdXRlci4kdXJsUm91dGVyI2hyZWZcbiAgICAgICAqIEBtZXRob2RPZiB1aS5yb3V0ZXIucm91dGVyLiR1cmxSb3V0ZXJcbiAgICAgICAqXG4gICAgICAgKiBAZGVzY3JpcHRpb25cbiAgICAgICAqIEEgVVJMIGdlbmVyYXRpb24gbWV0aG9kIHRoYXQgcmV0dXJucyB0aGUgY29tcGlsZWQgVVJMIGZvciBhIGdpdmVuXG4gICAgICAgKiB7QGxpbmsgdWkucm91dGVyLnV0aWwudHlwZTpVcmxNYXRjaGVyIGBVcmxNYXRjaGVyYH0sIHBvcHVsYXRlZCB3aXRoIHRoZSBwcm92aWRlZCBwYXJhbWV0ZXJzLlxuICAgICAgICpcbiAgICAgICAqIEBleGFtcGxlXG4gICAgICAgKiA8cHJlPlxuICAgICAgICogJGJvYiA9ICR1cmxSb3V0ZXIuaHJlZihuZXcgVXJsTWF0Y2hlcihcIi9hYm91dC86cGVyc29uXCIpLCB7XG4gICAgICAgKiAgIHBlcnNvbjogXCJib2JcIlxuICAgICAgICogfSk7XG4gICAgICAgKiAvLyAkYm9iID09IFwiL2Fib3V0L2JvYlwiO1xuICAgICAgICogPC9wcmU+XG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtVcmxNYXRjaGVyfSB1cmxNYXRjaGVyIFRoZSBgVXJsTWF0Y2hlcmAgb2JqZWN0IHdoaWNoIGlzIHVzZWQgYXMgdGhlIHRlbXBsYXRlIG9mIHRoZSBVUkwgdG8gZ2VuZXJhdGUuXG4gICAgICAgKiBAcGFyYW0ge29iamVjdD19IHBhcmFtcyBBbiBvYmplY3Qgb2YgcGFyYW1ldGVyIHZhbHVlcyB0byBmaWxsIHRoZSBtYXRjaGVyJ3MgcmVxdWlyZWQgcGFyYW1ldGVycy5cbiAgICAgICAqIEBwYXJhbSB7b2JqZWN0PX0gb3B0aW9ucyBPcHRpb25zIG9iamVjdC4gVGhlIG9wdGlvbnMgYXJlOlxuICAgICAgICpcbiAgICAgICAqIC0gKipgYWJzb2x1dGVgKiogLSB7Ym9vbGVhbj1mYWxzZX0sICBJZiB0cnVlIHdpbGwgZ2VuZXJhdGUgYW4gYWJzb2x1dGUgdXJsLCBlLmcuIFwiaHR0cDovL3d3dy5leGFtcGxlLmNvbS9mdWxsdXJsXCIuXG4gICAgICAgKlxuICAgICAgICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgZnVsbHkgY29tcGlsZWQgVVJMLCBvciBgbnVsbGAgaWYgYHBhcmFtc2AgZmFpbCB2YWxpZGF0aW9uIGFnYWluc3QgYHVybE1hdGNoZXJgXG4gICAgICAgKi9cbiAgICAgIGhyZWY6IGZ1bmN0aW9uKHVybE1hdGNoZXIsIHBhcmFtcywgb3B0aW9ucykge1xuICAgICAgICBpZiAoIXVybE1hdGNoZXIudmFsaWRhdGVzKHBhcmFtcykpIHJldHVybiBudWxsO1xuXG4gICAgICAgIHZhciBpc0h0bWw1ID0gJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKCk7XG4gICAgICAgIGlmIChhbmd1bGFyLmlzT2JqZWN0KGlzSHRtbDUpKSB7XG4gICAgICAgICAgaXNIdG1sNSA9IGlzSHRtbDUuZW5hYmxlZDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdmFyIHVybCA9IHVybE1hdGNoZXIuZm9ybWF0KHBhcmFtcyk7XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgICAgIGlmICghaXNIdG1sNSAmJiB1cmwgIT09IG51bGwpIHtcbiAgICAgICAgICB1cmwgPSBcIiNcIiArICRsb2NhdGlvblByb3ZpZGVyLmhhc2hQcmVmaXgoKSArIHVybDtcbiAgICAgICAgfVxuICAgICAgICB1cmwgPSBhcHBlbmRCYXNlUGF0aCh1cmwsIGlzSHRtbDUsIG9wdGlvbnMuYWJzb2x1dGUpO1xuXG4gICAgICAgIGlmICghb3B0aW9ucy5hYnNvbHV0ZSB8fCAhdXJsKSB7XG4gICAgICAgICAgcmV0dXJuIHVybDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzbGFzaCA9ICghaXNIdG1sNSAmJiB1cmwgPyAnLycgOiAnJyksIHBvcnQgPSAkbG9jYXRpb24ucG9ydCgpO1xuICAgICAgICBwb3J0ID0gKHBvcnQgPT09IDgwIHx8IHBvcnQgPT09IDQ0MyA/ICcnIDogJzonICsgcG9ydCk7XG5cbiAgICAgICAgcmV0dXJuIFskbG9jYXRpb24ucHJvdG9jb2woKSwgJzovLycsICRsb2NhdGlvbi5ob3N0KCksIHBvcnQsIHNsYXNoLCB1cmxdLmpvaW4oJycpO1xuICAgICAgfVxuICAgIH07XG4gIH1cbn1cblxuYW5ndWxhci5tb2R1bGUoJ3VpLnJvdXRlci5yb3V0ZXInKS5wcm92aWRlcignJHVybFJvdXRlcicsICRVcmxSb3V0ZXJQcm92aWRlcik7XG5cbi8qKlxuICogQG5nZG9jIG9iamVjdFxuICogQG5hbWUgdWkucm91dGVyLnN0YXRlLiRzdGF0ZVByb3ZpZGVyXG4gKlxuICogQHJlcXVpcmVzIHVpLnJvdXRlci5yb3V0ZXIuJHVybFJvdXRlclByb3ZpZGVyXG4gKiBAcmVxdWlyZXMgdWkucm91dGVyLnV0aWwuJHVybE1hdGNoZXJGYWN0b3J5UHJvdmlkZXJcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFRoZSBuZXcgYCRzdGF0ZVByb3ZpZGVyYCB3b3JrcyBzaW1pbGFyIHRvIEFuZ3VsYXIncyB2MSByb3V0ZXIsIGJ1dCBpdCBmb2N1c2VzIHB1cmVseVxuICogb24gc3RhdGUuXG4gKlxuICogQSBzdGF0ZSBjb3JyZXNwb25kcyB0byBhIFwicGxhY2VcIiBpbiB0aGUgYXBwbGljYXRpb24gaW4gdGVybXMgb2YgdGhlIG92ZXJhbGwgVUkgYW5kXG4gKiBuYXZpZ2F0aW9uLiBBIHN0YXRlIGRlc2NyaWJlcyAodmlhIHRoZSBjb250cm9sbGVyIC8gdGVtcGxhdGUgLyB2aWV3IHByb3BlcnRpZXMpIHdoYXRcbiAqIHRoZSBVSSBsb29rcyBsaWtlIGFuZCBkb2VzIGF0IHRoYXQgcGxhY2UuXG4gKlxuICogU3RhdGVzIG9mdGVuIGhhdmUgdGhpbmdzIGluIGNvbW1vbiwgYW5kIHRoZSBwcmltYXJ5IHdheSBvZiBmYWN0b3Jpbmcgb3V0IHRoZXNlXG4gKiBjb21tb25hbGl0aWVzIGluIHRoaXMgbW9kZWwgaXMgdmlhIHRoZSBzdGF0ZSBoaWVyYXJjaHksIGkuZS4gcGFyZW50L2NoaWxkIHN0YXRlcyBha2FcbiAqIG5lc3RlZCBzdGF0ZXMuXG4gKlxuICogVGhlIGAkc3RhdGVQcm92aWRlcmAgcHJvdmlkZXMgaW50ZXJmYWNlcyB0byBkZWNsYXJlIHRoZXNlIHN0YXRlcyBmb3IgeW91ciBhcHAuXG4gKi9cbiRTdGF0ZVByb3ZpZGVyLiRpbmplY3QgPSBbJyR1cmxSb3V0ZXJQcm92aWRlcicsICckdXJsTWF0Y2hlckZhY3RvcnlQcm92aWRlciddO1xuZnVuY3Rpb24gJFN0YXRlUHJvdmlkZXIoICAgJHVybFJvdXRlclByb3ZpZGVyLCAgICR1cmxNYXRjaGVyRmFjdG9yeSkge1xuXG4gIHZhciByb290LCBzdGF0ZXMgPSB7fSwgJHN0YXRlLCBxdWV1ZSA9IHt9LCBhYnN0cmFjdEtleSA9ICdhYnN0cmFjdCc7XG5cbiAgLy8gQnVpbGRzIHN0YXRlIHByb3BlcnRpZXMgZnJvbSBkZWZpbml0aW9uIHBhc3NlZCB0byByZWdpc3RlclN0YXRlKClcbiAgdmFyIHN0YXRlQnVpbGRlciA9IHtcblxuICAgIC8vIERlcml2ZSBwYXJlbnQgc3RhdGUgZnJvbSBhIGhpZXJhcmNoaWNhbCBuYW1lIG9ubHkgaWYgJ3BhcmVudCcgaXMgbm90IGV4cGxpY2l0bHkgZGVmaW5lZC5cbiAgICAvLyBzdGF0ZS5jaGlsZHJlbiA9IFtdO1xuICAgIC8vIGlmIChwYXJlbnQpIHBhcmVudC5jaGlsZHJlbi5wdXNoKHN0YXRlKTtcbiAgICBwYXJlbnQ6IGZ1bmN0aW9uKHN0YXRlKSB7XG4gICAgICBpZiAoaXNEZWZpbmVkKHN0YXRlLnBhcmVudCkgJiYgc3RhdGUucGFyZW50KSByZXR1cm4gZmluZFN0YXRlKHN0YXRlLnBhcmVudCk7XG4gICAgICAvLyByZWdleCBtYXRjaGVzIGFueSB2YWxpZCBjb21wb3NpdGUgc3RhdGUgbmFtZVxuICAgICAgLy8gd291bGQgbWF0Y2ggXCJjb250YWN0Lmxpc3RcIiBidXQgbm90IFwiY29udGFjdHNcIlxuICAgICAgdmFyIGNvbXBvc2l0ZU5hbWUgPSAvXiguKylcXC5bXi5dKyQvLmV4ZWMoc3RhdGUubmFtZSk7XG4gICAgICByZXR1cm4gY29tcG9zaXRlTmFtZSA/IGZpbmRTdGF0ZShjb21wb3NpdGVOYW1lWzFdKSA6IHJvb3Q7XG4gICAgfSxcblxuICAgIC8vIGluaGVyaXQgJ2RhdGEnIGZyb20gcGFyZW50IGFuZCBvdmVycmlkZSBieSBvd24gdmFsdWVzIChpZiBhbnkpXG4gICAgZGF0YTogZnVuY3Rpb24oc3RhdGUpIHtcbiAgICAgIGlmIChzdGF0ZS5wYXJlbnQgJiYgc3RhdGUucGFyZW50LmRhdGEpIHtcbiAgICAgICAgc3RhdGUuZGF0YSA9IHN0YXRlLnNlbGYuZGF0YSA9IGV4dGVuZCh7fSwgc3RhdGUucGFyZW50LmRhdGEsIHN0YXRlLmRhdGEpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN0YXRlLmRhdGE7XG4gICAgfSxcblxuICAgIC8vIEJ1aWxkIGEgVVJMTWF0Y2hlciBpZiBuZWNlc3NhcnksIGVpdGhlciB2aWEgYSByZWxhdGl2ZSBvciBhYnNvbHV0ZSBVUkxcbiAgICB1cmw6IGZ1bmN0aW9uKHN0YXRlKSB7XG4gICAgICB2YXIgdXJsID0gc3RhdGUudXJsLCBjb25maWcgPSB7IHBhcmFtczogc3RhdGUucGFyYW1zIHx8IHt9IH07XG5cbiAgICAgIGlmIChpc1N0cmluZyh1cmwpKSB7XG4gICAgICAgIGlmICh1cmwuY2hhckF0KDApID09ICdeJykgcmV0dXJuICR1cmxNYXRjaGVyRmFjdG9yeS5jb21waWxlKHVybC5zdWJzdHJpbmcoMSksIGNvbmZpZyk7XG4gICAgICAgIHJldHVybiAoc3RhdGUucGFyZW50Lm5hdmlnYWJsZSB8fCByb290KS51cmwuY29uY2F0KHVybCwgY29uZmlnKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCF1cmwgfHwgJHVybE1hdGNoZXJGYWN0b3J5LmlzTWF0Y2hlcih1cmwpKSByZXR1cm4gdXJsO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCB1cmwgJ1wiICsgdXJsICsgXCInIGluIHN0YXRlICdcIiArIHN0YXRlICsgXCInXCIpO1xuICAgIH0sXG5cbiAgICAvLyBLZWVwIHRyYWNrIG9mIHRoZSBjbG9zZXN0IGFuY2VzdG9yIHN0YXRlIHRoYXQgaGFzIGEgVVJMIChpLmUuIGlzIG5hdmlnYWJsZSlcbiAgICBuYXZpZ2FibGU6IGZ1bmN0aW9uKHN0YXRlKSB7XG4gICAgICByZXR1cm4gc3RhdGUudXJsID8gc3RhdGUgOiAoc3RhdGUucGFyZW50ID8gc3RhdGUucGFyZW50Lm5hdmlnYWJsZSA6IG51bGwpO1xuICAgIH0sXG5cbiAgICAvLyBPd24gcGFyYW1ldGVycyBmb3IgdGhpcyBzdGF0ZS4gc3RhdGUudXJsLnBhcmFtcyBpcyBhbHJlYWR5IGJ1aWx0IGF0IHRoaXMgcG9pbnQuIENyZWF0ZSBhbmQgYWRkIG5vbi11cmwgcGFyYW1zXG4gICAgb3duUGFyYW1zOiBmdW5jdGlvbihzdGF0ZSkge1xuICAgICAgdmFyIHBhcmFtcyA9IHN0YXRlLnVybCAmJiBzdGF0ZS51cmwucGFyYW1zIHx8IG5ldyAkJFVNRlAuUGFyYW1TZXQoKTtcbiAgICAgIGZvckVhY2goc3RhdGUucGFyYW1zIHx8IHt9LCBmdW5jdGlvbihjb25maWcsIGlkKSB7XG4gICAgICAgIGlmICghcGFyYW1zW2lkXSkgcGFyYW1zW2lkXSA9IG5ldyAkJFVNRlAuUGFyYW0oaWQsIG51bGwsIGNvbmZpZywgXCJjb25maWdcIik7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBwYXJhbXM7XG4gICAgfSxcblxuICAgIC8vIERlcml2ZSBwYXJhbWV0ZXJzIGZvciB0aGlzIHN0YXRlIGFuZCBlbnN1cmUgdGhleSdyZSBhIHN1cGVyLXNldCBvZiBwYXJlbnQncyBwYXJhbWV0ZXJzXG4gICAgcGFyYW1zOiBmdW5jdGlvbihzdGF0ZSkge1xuICAgICAgcmV0dXJuIHN0YXRlLnBhcmVudCAmJiBzdGF0ZS5wYXJlbnQucGFyYW1zID8gZXh0ZW5kKHN0YXRlLnBhcmVudC5wYXJhbXMuJCRuZXcoKSwgc3RhdGUub3duUGFyYW1zKSA6IG5ldyAkJFVNRlAuUGFyYW1TZXQoKTtcbiAgICB9LFxuXG4gICAgLy8gSWYgdGhlcmUgaXMgbm8gZXhwbGljaXQgbXVsdGktdmlldyBjb25maWd1cmF0aW9uLCBtYWtlIG9uZSB1cCBzbyB3ZSBkb24ndCBoYXZlXG4gICAgLy8gdG8gaGFuZGxlIGJvdGggY2FzZXMgaW4gdGhlIHZpZXcgZGlyZWN0aXZlIGxhdGVyLiBOb3RlIHRoYXQgaGF2aW5nIGFuIGV4cGxpY2l0XG4gICAgLy8gJ3ZpZXdzJyBwcm9wZXJ0eSB3aWxsIG1lYW4gdGhlIGRlZmF1bHQgdW5uYW1lZCB2aWV3IHByb3BlcnRpZXMgYXJlIGlnbm9yZWQuIFRoaXNcbiAgICAvLyBpcyBhbHNvIGEgZ29vZCB0aW1lIHRvIHJlc29sdmUgdmlldyBuYW1lcyB0byBhYnNvbHV0ZSBuYW1lcywgc28gZXZlcnl0aGluZyBpcyBhXG4gICAgLy8gc3RyYWlnaHQgbG9va3VwIGF0IGxpbmsgdGltZS5cbiAgICB2aWV3czogZnVuY3Rpb24oc3RhdGUpIHtcbiAgICAgIHZhciB2aWV3cyA9IHt9O1xuXG4gICAgICBmb3JFYWNoKGlzRGVmaW5lZChzdGF0ZS52aWV3cykgPyBzdGF0ZS52aWV3cyA6IHsgJyc6IHN0YXRlIH0sIGZ1bmN0aW9uICh2aWV3LCBuYW1lKSB7XG4gICAgICAgIGlmIChuYW1lLmluZGV4T2YoJ0AnKSA8IDApIG5hbWUgKz0gJ0AnICsgc3RhdGUucGFyZW50Lm5hbWU7XG4gICAgICAgIHZpZXdzW25hbWVdID0gdmlldztcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHZpZXdzO1xuICAgIH0sXG5cbiAgICAvLyBLZWVwIGEgZnVsbCBwYXRoIGZyb20gdGhlIHJvb3QgZG93biB0byB0aGlzIHN0YXRlIGFzIHRoaXMgaXMgbmVlZGVkIGZvciBzdGF0ZSBhY3RpdmF0aW9uLlxuICAgIHBhdGg6IGZ1bmN0aW9uKHN0YXRlKSB7XG4gICAgICByZXR1cm4gc3RhdGUucGFyZW50ID8gc3RhdGUucGFyZW50LnBhdGguY29uY2F0KHN0YXRlKSA6IFtdOyAvLyBleGNsdWRlIHJvb3QgZnJvbSBwYXRoXG4gICAgfSxcblxuICAgIC8vIFNwZWVkIHVwICRzdGF0ZS5jb250YWlucygpIGFzIGl0J3MgdXNlZCBhIGxvdFxuICAgIGluY2x1ZGVzOiBmdW5jdGlvbihzdGF0ZSkge1xuICAgICAgdmFyIGluY2x1ZGVzID0gc3RhdGUucGFyZW50ID8gZXh0ZW5kKHt9LCBzdGF0ZS5wYXJlbnQuaW5jbHVkZXMpIDoge307XG4gICAgICBpbmNsdWRlc1tzdGF0ZS5uYW1lXSA9IHRydWU7XG4gICAgICByZXR1cm4gaW5jbHVkZXM7XG4gICAgfSxcblxuICAgICRkZWxlZ2F0ZXM6IHt9XG4gIH07XG5cbiAgZnVuY3Rpb24gaXNSZWxhdGl2ZShzdGF0ZU5hbWUpIHtcbiAgICByZXR1cm4gc3RhdGVOYW1lLmluZGV4T2YoXCIuXCIpID09PSAwIHx8IHN0YXRlTmFtZS5pbmRleE9mKFwiXlwiKSA9PT0gMDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZpbmRTdGF0ZShzdGF0ZU9yTmFtZSwgYmFzZSkge1xuICAgIGlmICghc3RhdGVPck5hbWUpIHJldHVybiB1bmRlZmluZWQ7XG5cbiAgICB2YXIgaXNTdHIgPSBpc1N0cmluZyhzdGF0ZU9yTmFtZSksXG4gICAgICAgIG5hbWUgID0gaXNTdHIgPyBzdGF0ZU9yTmFtZSA6IHN0YXRlT3JOYW1lLm5hbWUsXG4gICAgICAgIHBhdGggID0gaXNSZWxhdGl2ZShuYW1lKTtcblxuICAgIGlmIChwYXRoKSB7XG4gICAgICBpZiAoIWJhc2UpIHRocm93IG5ldyBFcnJvcihcIk5vIHJlZmVyZW5jZSBwb2ludCBnaXZlbiBmb3IgcGF0aCAnXCIgICsgbmFtZSArIFwiJ1wiKTtcbiAgICAgIGJhc2UgPSBmaW5kU3RhdGUoYmFzZSk7XG4gICAgICBcbiAgICAgIHZhciByZWwgPSBuYW1lLnNwbGl0KFwiLlwiKSwgaSA9IDAsIHBhdGhMZW5ndGggPSByZWwubGVuZ3RoLCBjdXJyZW50ID0gYmFzZTtcblxuICAgICAgZm9yICg7IGkgPCBwYXRoTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHJlbFtpXSA9PT0gXCJcIiAmJiBpID09PSAwKSB7XG4gICAgICAgICAgY3VycmVudCA9IGJhc2U7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlbFtpXSA9PT0gXCJeXCIpIHtcbiAgICAgICAgICBpZiAoIWN1cnJlbnQucGFyZW50KSB0aHJvdyBuZXcgRXJyb3IoXCJQYXRoICdcIiArIG5hbWUgKyBcIicgbm90IHZhbGlkIGZvciBzdGF0ZSAnXCIgKyBiYXNlLm5hbWUgKyBcIidcIik7XG4gICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQucGFyZW50O1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgcmVsID0gcmVsLnNsaWNlKGkpLmpvaW4oXCIuXCIpO1xuICAgICAgbmFtZSA9IGN1cnJlbnQubmFtZSArIChjdXJyZW50Lm5hbWUgJiYgcmVsID8gXCIuXCIgOiBcIlwiKSArIHJlbDtcbiAgICB9XG4gICAgdmFyIHN0YXRlID0gc3RhdGVzW25hbWVdO1xuXG4gICAgaWYgKHN0YXRlICYmIChpc1N0ciB8fCAoIWlzU3RyICYmIChzdGF0ZSA9PT0gc3RhdGVPck5hbWUgfHwgc3RhdGUuc2VsZiA9PT0gc3RhdGVPck5hbWUpKSkpIHtcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHF1ZXVlU3RhdGUocGFyZW50TmFtZSwgc3RhdGUpIHtcbiAgICBpZiAoIXF1ZXVlW3BhcmVudE5hbWVdKSB7XG4gICAgICBxdWV1ZVtwYXJlbnROYW1lXSA9IFtdO1xuICAgIH1cbiAgICBxdWV1ZVtwYXJlbnROYW1lXS5wdXNoKHN0YXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZsdXNoUXVldWVkQ2hpbGRyZW4ocGFyZW50TmFtZSkge1xuICAgIHZhciBxdWV1ZWQgPSBxdWV1ZVtwYXJlbnROYW1lXSB8fCBbXTtcbiAgICB3aGlsZShxdWV1ZWQubGVuZ3RoKSB7XG4gICAgICByZWdpc3RlclN0YXRlKHF1ZXVlZC5zaGlmdCgpKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZWdpc3RlclN0YXRlKHN0YXRlKSB7XG4gICAgLy8gV3JhcCBhIG5ldyBvYmplY3QgYXJvdW5kIHRoZSBzdGF0ZSBzbyB3ZSBjYW4gc3RvcmUgb3VyIHByaXZhdGUgZGV0YWlscyBlYXNpbHkuXG4gICAgc3RhdGUgPSBpbmhlcml0KHN0YXRlLCB7XG4gICAgICBzZWxmOiBzdGF0ZSxcbiAgICAgIHJlc29sdmU6IHN0YXRlLnJlc29sdmUgfHwge30sXG4gICAgICB0b1N0cmluZzogZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzLm5hbWU7IH1cbiAgICB9KTtcblxuICAgIHZhciBuYW1lID0gc3RhdGUubmFtZTtcbiAgICBpZiAoIWlzU3RyaW5nKG5hbWUpIHx8IG5hbWUuaW5kZXhPZignQCcpID49IDApIHRocm93IG5ldyBFcnJvcihcIlN0YXRlIG11c3QgaGF2ZSBhIHZhbGlkIG5hbWVcIik7XG4gICAgaWYgKHN0YXRlcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkgdGhyb3cgbmV3IEVycm9yKFwiU3RhdGUgJ1wiICsgbmFtZSArIFwiJycgaXMgYWxyZWFkeSBkZWZpbmVkXCIpO1xuXG4gICAgLy8gR2V0IHBhcmVudCBuYW1lXG4gICAgdmFyIHBhcmVudE5hbWUgPSAobmFtZS5pbmRleE9mKCcuJykgIT09IC0xKSA/IG5hbWUuc3Vic3RyaW5nKDAsIG5hbWUubGFzdEluZGV4T2YoJy4nKSlcbiAgICAgICAgOiAoaXNTdHJpbmcoc3RhdGUucGFyZW50KSkgPyBzdGF0ZS5wYXJlbnRcbiAgICAgICAgOiAoaXNPYmplY3Qoc3RhdGUucGFyZW50KSAmJiBpc1N0cmluZyhzdGF0ZS5wYXJlbnQubmFtZSkpID8gc3RhdGUucGFyZW50Lm5hbWVcbiAgICAgICAgOiAnJztcblxuICAgIC8vIElmIHBhcmVudCBpcyBub3QgcmVnaXN0ZXJlZCB5ZXQsIGFkZCBzdGF0ZSB0byBxdWV1ZSBhbmQgcmVnaXN0ZXIgbGF0ZXJcbiAgICBpZiAocGFyZW50TmFtZSAmJiAhc3RhdGVzW3BhcmVudE5hbWVdKSB7XG4gICAgICByZXR1cm4gcXVldWVTdGF0ZShwYXJlbnROYW1lLCBzdGF0ZS5zZWxmKTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gc3RhdGVCdWlsZGVyKSB7XG4gICAgICBpZiAoaXNGdW5jdGlvbihzdGF0ZUJ1aWxkZXJba2V5XSkpIHN0YXRlW2tleV0gPSBzdGF0ZUJ1aWxkZXJba2V5XShzdGF0ZSwgc3RhdGVCdWlsZGVyLiRkZWxlZ2F0ZXNba2V5XSk7XG4gICAgfVxuICAgIHN0YXRlc1tuYW1lXSA9IHN0YXRlO1xuXG4gICAgLy8gUmVnaXN0ZXIgdGhlIHN0YXRlIGluIHRoZSBnbG9iYWwgc3RhdGUgbGlzdCBhbmQgd2l0aCAkdXJsUm91dGVyIGlmIG5lY2Vzc2FyeS5cbiAgICBpZiAoIXN0YXRlW2Fic3RyYWN0S2V5XSAmJiBzdGF0ZS51cmwpIHtcbiAgICAgICR1cmxSb3V0ZXJQcm92aWRlci53aGVuKHN0YXRlLnVybCwgWyckbWF0Y2gnLCAnJHN0YXRlUGFyYW1zJywgZnVuY3Rpb24gKCRtYXRjaCwgJHN0YXRlUGFyYW1zKSB7XG4gICAgICAgIGlmICgkc3RhdGUuJGN1cnJlbnQubmF2aWdhYmxlICE9IHN0YXRlIHx8ICFlcXVhbEZvcktleXMoJG1hdGNoLCAkc3RhdGVQYXJhbXMpKSB7XG4gICAgICAgICAgJHN0YXRlLnRyYW5zaXRpb25UbyhzdGF0ZSwgJG1hdGNoLCB7IGluaGVyaXQ6IHRydWUsIGxvY2F0aW9uOiBmYWxzZSB9KTtcbiAgICAgICAgfVxuICAgICAgfV0pO1xuICAgIH1cblxuICAgIC8vIFJlZ2lzdGVyIGFueSBxdWV1ZWQgY2hpbGRyZW5cbiAgICBmbHVzaFF1ZXVlZENoaWxkcmVuKG5hbWUpO1xuXG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG5cbiAgLy8gQ2hlY2tzIHRleHQgdG8gc2VlIGlmIGl0IGxvb2tzIGxpa2UgYSBnbG9iLlxuICBmdW5jdGlvbiBpc0dsb2IgKHRleHQpIHtcbiAgICByZXR1cm4gdGV4dC5pbmRleE9mKCcqJykgPiAtMTtcbiAgfVxuXG4gIC8vIFJldHVybnMgdHJ1ZSBpZiBnbG9iIG1hdGNoZXMgY3VycmVudCAkc3RhdGUgbmFtZS5cbiAgZnVuY3Rpb24gZG9lc1N0YXRlTWF0Y2hHbG9iIChnbG9iKSB7XG4gICAgdmFyIGdsb2JTZWdtZW50cyA9IGdsb2Iuc3BsaXQoJy4nKSxcbiAgICAgICAgc2VnbWVudHMgPSAkc3RhdGUuJGN1cnJlbnQubmFtZS5zcGxpdCgnLicpO1xuXG4gICAgLy9tYXRjaCBncmVlZHkgc3RhcnRzXG4gICAgaWYgKGdsb2JTZWdtZW50c1swXSA9PT0gJyoqJykge1xuICAgICAgIHNlZ21lbnRzID0gc2VnbWVudHMuc2xpY2UoaW5kZXhPZihzZWdtZW50cywgZ2xvYlNlZ21lbnRzWzFdKSk7XG4gICAgICAgc2VnbWVudHMudW5zaGlmdCgnKionKTtcbiAgICB9XG4gICAgLy9tYXRjaCBncmVlZHkgZW5kc1xuICAgIGlmIChnbG9iU2VnbWVudHNbZ2xvYlNlZ21lbnRzLmxlbmd0aCAtIDFdID09PSAnKionKSB7XG4gICAgICAgc2VnbWVudHMuc3BsaWNlKGluZGV4T2Yoc2VnbWVudHMsIGdsb2JTZWdtZW50c1tnbG9iU2VnbWVudHMubGVuZ3RoIC0gMl0pICsgMSwgTnVtYmVyLk1BWF9WQUxVRSk7XG4gICAgICAgc2VnbWVudHMucHVzaCgnKionKTtcbiAgICB9XG5cbiAgICBpZiAoZ2xvYlNlZ21lbnRzLmxlbmd0aCAhPSBzZWdtZW50cy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvL21hdGNoIHNpbmdsZSBzdGFyc1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gZ2xvYlNlZ21lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgaWYgKGdsb2JTZWdtZW50c1tpXSA9PT0gJyonKSB7XG4gICAgICAgIHNlZ21lbnRzW2ldID0gJyonO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzZWdtZW50cy5qb2luKCcnKSA9PT0gZ2xvYlNlZ21lbnRzLmpvaW4oJycpO1xuICB9XG5cblxuICAvLyBJbXBsaWNpdCByb290IHN0YXRlIHRoYXQgaXMgYWx3YXlzIGFjdGl2ZVxuICByb290ID0gcmVnaXN0ZXJTdGF0ZSh7XG4gICAgbmFtZTogJycsXG4gICAgdXJsOiAnXicsXG4gICAgdmlld3M6IG51bGwsXG4gICAgJ2Fic3RyYWN0JzogdHJ1ZVxuICB9KTtcbiAgcm9vdC5uYXZpZ2FibGUgPSBudWxsO1xuXG5cbiAgLyoqXG4gICAqIEBuZ2RvYyBmdW5jdGlvblxuICAgKiBAbmFtZSB1aS5yb3V0ZXIuc3RhdGUuJHN0YXRlUHJvdmlkZXIjZGVjb3JhdG9yXG4gICAqIEBtZXRob2RPZiB1aS5yb3V0ZXIuc3RhdGUuJHN0YXRlUHJvdmlkZXJcbiAgICpcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIEFsbG93cyB5b3UgdG8gZXh0ZW5kIChjYXJlZnVsbHkpIG9yIG92ZXJyaWRlIChhdCB5b3VyIG93biBwZXJpbCkgdGhlIFxuICAgKiBgc3RhdGVCdWlsZGVyYCBvYmplY3QgdXNlZCBpbnRlcm5hbGx5IGJ5IGAkc3RhdGVQcm92aWRlcmAuIFRoaXMgY2FuIGJlIHVzZWQgXG4gICAqIHRvIGFkZCBjdXN0b20gZnVuY3Rpb25hbGl0eSB0byB1aS1yb3V0ZXIsIGZvciBleGFtcGxlIGluZmVycmluZyB0ZW1wbGF0ZVVybCBcbiAgICogYmFzZWQgb24gdGhlIHN0YXRlIG5hbWUuXG4gICAqXG4gICAqIFdoZW4gcGFzc2luZyBvbmx5IGEgbmFtZSwgaXQgcmV0dXJucyB0aGUgY3VycmVudCAob3JpZ2luYWwgb3IgZGVjb3JhdGVkKSBidWlsZGVyXG4gICAqIGZ1bmN0aW9uIHRoYXQgbWF0Y2hlcyBgbmFtZWAuXG4gICAqXG4gICAqIFRoZSBidWlsZGVyIGZ1bmN0aW9ucyB0aGF0IGNhbiBiZSBkZWNvcmF0ZWQgYXJlIGxpc3RlZCBiZWxvdy4gVGhvdWdoIG5vdCBhbGxcbiAgICogbmVjZXNzYXJpbHkgaGF2ZSBhIGdvb2QgdXNlIGNhc2UgZm9yIGRlY29yYXRpb24sIHRoYXQgaXMgdXAgdG8geW91IHRvIGRlY2lkZS5cbiAgICpcbiAgICogSW4gYWRkaXRpb24sIHVzZXJzIGNhbiBhdHRhY2ggY3VzdG9tIGRlY29yYXRvcnMsIHdoaWNoIHdpbGwgZ2VuZXJhdGUgbmV3IFxuICAgKiBwcm9wZXJ0aWVzIHdpdGhpbiB0aGUgc3RhdGUncyBpbnRlcm5hbCBkZWZpbml0aW9uLiBUaGVyZSBpcyBjdXJyZW50bHkgbm8gY2xlYXIgXG4gICAqIHVzZS1jYXNlIGZvciB0aGlzIGJleW9uZCBhY2Nlc3NpbmcgaW50ZXJuYWwgc3RhdGVzIChpLmUuICRzdGF0ZS4kY3VycmVudCksIFxuICAgKiBob3dldmVyLCBleHBlY3QgdGhpcyB0byBiZWNvbWUgaW5jcmVhc2luZ2x5IHJlbGV2YW50IGFzIHdlIGludHJvZHVjZSBhZGRpdGlvbmFsIFxuICAgKiBtZXRhLXByb2dyYW1taW5nIGZlYXR1cmVzLlxuICAgKlxuICAgKiAqKldhcm5pbmcqKjogRGVjb3JhdG9ycyBzaG91bGQgbm90IGJlIGludGVyZGVwZW5kZW50IGJlY2F1c2UgdGhlIG9yZGVyIG9mIFxuICAgKiBleGVjdXRpb24gb2YgdGhlIGJ1aWxkZXIgZnVuY3Rpb25zIGluIG5vbi1kZXRlcm1pbmlzdGljLiBCdWlsZGVyIGZ1bmN0aW9ucyBcbiAgICogc2hvdWxkIG9ubHkgYmUgZGVwZW5kZW50IG9uIHRoZSBzdGF0ZSBkZWZpbml0aW9uIG9iamVjdCBhbmQgc3VwZXIgZnVuY3Rpb24uXG4gICAqXG4gICAqXG4gICAqIEV4aXN0aW5nIGJ1aWxkZXIgZnVuY3Rpb25zIGFuZCBjdXJyZW50IHJldHVybiB2YWx1ZXM6XG4gICAqXG4gICAqIC0gKipwYXJlbnQqKiBge29iamVjdH1gIC0gcmV0dXJucyB0aGUgcGFyZW50IHN0YXRlIG9iamVjdC5cbiAgICogLSAqKmRhdGEqKiBge29iamVjdH1gIC0gcmV0dXJucyBzdGF0ZSBkYXRhLCBpbmNsdWRpbmcgYW55IGluaGVyaXRlZCBkYXRhIHRoYXQgaXMgbm90XG4gICAqICAgb3ZlcnJpZGRlbiBieSBvd24gdmFsdWVzIChpZiBhbnkpLlxuICAgKiAtICoqdXJsKiogYHtvYmplY3R9YCAtIHJldHVybnMgYSB7QGxpbmsgdWkucm91dGVyLnV0aWwudHlwZTpVcmxNYXRjaGVyIFVybE1hdGNoZXJ9XG4gICAqICAgb3IgYG51bGxgLlxuICAgKiAtICoqbmF2aWdhYmxlKiogYHtvYmplY3R9YCAtIHJldHVybnMgY2xvc2VzdCBhbmNlc3RvciBzdGF0ZSB0aGF0IGhhcyBhIFVSTCAoYWthIGlzIFxuICAgKiAgIG5hdmlnYWJsZSkuXG4gICAqIC0gKipwYXJhbXMqKiBge29iamVjdH1gIC0gcmV0dXJucyBhbiBhcnJheSBvZiBzdGF0ZSBwYXJhbXMgdGhhdCBhcmUgZW5zdXJlZCB0byBcbiAgICogICBiZSBhIHN1cGVyLXNldCBvZiBwYXJlbnQncyBwYXJhbXMuXG4gICAqIC0gKip2aWV3cyoqIGB7b2JqZWN0fWAgLSByZXR1cm5zIGEgdmlld3Mgb2JqZWN0IHdoZXJlIGVhY2gga2V5IGlzIGFuIGFic29sdXRlIHZpZXcgXG4gICAqICAgbmFtZSAoaS5lLiBcInZpZXdOYW1lQHN0YXRlTmFtZVwiKSBhbmQgZWFjaCB2YWx1ZSBpcyB0aGUgY29uZmlnIG9iamVjdCBcbiAgICogICAodGVtcGxhdGUsIGNvbnRyb2xsZXIpIGZvciB0aGUgdmlldy4gRXZlbiB3aGVuIHlvdSBkb24ndCB1c2UgdGhlIHZpZXdzIG9iamVjdCBcbiAgICogICBleHBsaWNpdGx5IG9uIGEgc3RhdGUgY29uZmlnLCBvbmUgaXMgc3RpbGwgY3JlYXRlZCBmb3IgeW91IGludGVybmFsbHkuXG4gICAqICAgU28gYnkgZGVjb3JhdGluZyB0aGlzIGJ1aWxkZXIgZnVuY3Rpb24geW91IGhhdmUgYWNjZXNzIHRvIGRlY29yYXRpbmcgdGVtcGxhdGUgXG4gICAqICAgYW5kIGNvbnRyb2xsZXIgcHJvcGVydGllcy5cbiAgICogLSAqKm93blBhcmFtcyoqIGB7b2JqZWN0fWAgLSByZXR1cm5zIGFuIGFycmF5IG9mIHBhcmFtcyB0aGF0IGJlbG9uZyB0byB0aGUgc3RhdGUsIFxuICAgKiAgIG5vdCBpbmNsdWRpbmcgYW55IHBhcmFtcyBkZWZpbmVkIGJ5IGFuY2VzdG9yIHN0YXRlcy5cbiAgICogLSAqKnBhdGgqKiBge3N0cmluZ31gIC0gcmV0dXJucyB0aGUgZnVsbCBwYXRoIGZyb20gdGhlIHJvb3QgZG93biB0byB0aGlzIHN0YXRlLiBcbiAgICogICBOZWVkZWQgZm9yIHN0YXRlIGFjdGl2YXRpb24uXG4gICAqIC0gKippbmNsdWRlcyoqIGB7b2JqZWN0fWAgLSByZXR1cm5zIGFuIG9iamVjdCB0aGF0IGluY2x1ZGVzIGV2ZXJ5IHN0YXRlIHRoYXQgXG4gICAqICAgd291bGQgcGFzcyBhIGAkc3RhdGUuaW5jbHVkZXMoKWAgdGVzdC5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogPHByZT5cbiAgICogLy8gT3ZlcnJpZGUgdGhlIGludGVybmFsICd2aWV3cycgYnVpbGRlciB3aXRoIGEgZnVuY3Rpb24gdGhhdCB0YWtlcyB0aGUgc3RhdGVcbiAgICogLy8gZGVmaW5pdGlvbiwgYW5kIGEgcmVmZXJlbmNlIHRvIHRoZSBpbnRlcm5hbCBmdW5jdGlvbiBiZWluZyBvdmVycmlkZGVuOlxuICAgKiAkc3RhdGVQcm92aWRlci5kZWNvcmF0b3IoJ3ZpZXdzJywgZnVuY3Rpb24gKHN0YXRlLCBwYXJlbnQpIHtcbiAgICogICB2YXIgcmVzdWx0ID0ge30sXG4gICAqICAgICAgIHZpZXdzID0gcGFyZW50KHN0YXRlKTtcbiAgICpcbiAgICogICBhbmd1bGFyLmZvckVhY2godmlld3MsIGZ1bmN0aW9uIChjb25maWcsIG5hbWUpIHtcbiAgICogICAgIHZhciBhdXRvTmFtZSA9IChzdGF0ZS5uYW1lICsgJy4nICsgbmFtZSkucmVwbGFjZSgnLicsICcvJyk7XG4gICAqICAgICBjb25maWcudGVtcGxhdGVVcmwgPSBjb25maWcudGVtcGxhdGVVcmwgfHwgJy9wYXJ0aWFscy8nICsgYXV0b05hbWUgKyAnLmh0bWwnO1xuICAgKiAgICAgcmVzdWx0W25hbWVdID0gY29uZmlnO1xuICAgKiAgIH0pO1xuICAgKiAgIHJldHVybiByZXN1bHQ7XG4gICAqIH0pO1xuICAgKlxuICAgKiAkc3RhdGVQcm92aWRlci5zdGF0ZSgnaG9tZScsIHtcbiAgICogICB2aWV3czoge1xuICAgKiAgICAgJ2NvbnRhY3QubGlzdCc6IHsgY29udHJvbGxlcjogJ0xpc3RDb250cm9sbGVyJyB9LFxuICAgKiAgICAgJ2NvbnRhY3QuaXRlbSc6IHsgY29udHJvbGxlcjogJ0l0ZW1Db250cm9sbGVyJyB9XG4gICAqICAgfVxuICAgKiB9KTtcbiAgICpcbiAgICogLy8gLi4uXG4gICAqXG4gICAqICRzdGF0ZS5nbygnaG9tZScpO1xuICAgKiAvLyBBdXRvLXBvcHVsYXRlcyBsaXN0IGFuZCBpdGVtIHZpZXdzIHdpdGggL3BhcnRpYWxzL2hvbWUvY29udGFjdC9saXN0Lmh0bWwsXG4gICAqIC8vIGFuZCAvcGFydGlhbHMvaG9tZS9jb250YWN0L2l0ZW0uaHRtbCwgcmVzcGVjdGl2ZWx5LlxuICAgKiA8L3ByZT5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIGJ1aWxkZXIgZnVuY3Rpb24gdG8gZGVjb3JhdGUuIFxuICAgKiBAcGFyYW0ge29iamVjdH0gZnVuYyBBIGZ1bmN0aW9uIHRoYXQgaXMgcmVzcG9uc2libGUgZm9yIGRlY29yYXRpbmcgdGhlIG9yaWdpbmFsIFxuICAgKiBidWlsZGVyIGZ1bmN0aW9uLiBUaGUgZnVuY3Rpb24gcmVjZWl2ZXMgdHdvIHBhcmFtZXRlcnM6XG4gICAqXG4gICAqICAgLSBge29iamVjdH1gIC0gc3RhdGUgLSBUaGUgc3RhdGUgY29uZmlnIG9iamVjdC5cbiAgICogICAtIGB7b2JqZWN0fWAgLSBzdXBlciAtIFRoZSBvcmlnaW5hbCBidWlsZGVyIGZ1bmN0aW9uLlxuICAgKlxuICAgKiBAcmV0dXJuIHtvYmplY3R9ICRzdGF0ZVByb3ZpZGVyIC0gJHN0YXRlUHJvdmlkZXIgaW5zdGFuY2VcbiAgICovXG4gIHRoaXMuZGVjb3JhdG9yID0gZGVjb3JhdG9yO1xuICBmdW5jdGlvbiBkZWNvcmF0b3IobmFtZSwgZnVuYykge1xuICAgIC8qanNoaW50IHZhbGlkdGhpczogdHJ1ZSAqL1xuICAgIGlmIChpc1N0cmluZyhuYW1lKSAmJiAhaXNEZWZpbmVkKGZ1bmMpKSB7XG4gICAgICByZXR1cm4gc3RhdGVCdWlsZGVyW25hbWVdO1xuICAgIH1cbiAgICBpZiAoIWlzRnVuY3Rpb24oZnVuYykgfHwgIWlzU3RyaW5nKG5hbWUpKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgaWYgKHN0YXRlQnVpbGRlcltuYW1lXSAmJiAhc3RhdGVCdWlsZGVyLiRkZWxlZ2F0ZXNbbmFtZV0pIHtcbiAgICAgIHN0YXRlQnVpbGRlci4kZGVsZWdhdGVzW25hbWVdID0gc3RhdGVCdWlsZGVyW25hbWVdO1xuICAgIH1cbiAgICBzdGF0ZUJ1aWxkZXJbbmFtZV0gPSBmdW5jO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEBuZ2RvYyBmdW5jdGlvblxuICAgKiBAbmFtZSB1aS5yb3V0ZXIuc3RhdGUuJHN0YXRlUHJvdmlkZXIjc3RhdGVcbiAgICogQG1ldGhvZE9mIHVpLnJvdXRlci5zdGF0ZS4kc3RhdGVQcm92aWRlclxuICAgKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogUmVnaXN0ZXJzIGEgc3RhdGUgY29uZmlndXJhdGlvbiB1bmRlciBhIGdpdmVuIHN0YXRlIG5hbWUuIFRoZSBzdGF0ZUNvbmZpZyBvYmplY3RcbiAgICogaGFzIHRoZSBmb2xsb3dpbmcgYWNjZXB0YWJsZSBwcm9wZXJ0aWVzLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBBIHVuaXF1ZSBzdGF0ZSBuYW1lLCBlLmcuIFwiaG9tZVwiLCBcImFib3V0XCIsIFwiY29udGFjdHNcIi5cbiAgICogVG8gY3JlYXRlIGEgcGFyZW50L2NoaWxkIHN0YXRlIHVzZSBhIGRvdCwgZS5nLiBcImFib3V0LnNhbGVzXCIsIFwiaG9tZS5uZXdlc3RcIi5cbiAgICogQHBhcmFtIHtvYmplY3R9IHN0YXRlQ29uZmlnIFN0YXRlIGNvbmZpZ3VyYXRpb24gb2JqZWN0LlxuICAgKiBAcGFyYW0ge3N0cmluZ3xmdW5jdGlvbj19IHN0YXRlQ29uZmlnLnRlbXBsYXRlXG4gICAqIDxhIGlkPSd0ZW1wbGF0ZSc+PC9hPlxuICAgKiAgIGh0bWwgdGVtcGxhdGUgYXMgYSBzdHJpbmcgb3IgYSBmdW5jdGlvbiB0aGF0IHJldHVybnNcbiAgICogICBhbiBodG1sIHRlbXBsYXRlIGFzIGEgc3RyaW5nIHdoaWNoIHNob3VsZCBiZSB1c2VkIGJ5IHRoZSB1aVZpZXcgZGlyZWN0aXZlcy4gVGhpcyBwcm9wZXJ0eSBcbiAgICogICB0YWtlcyBwcmVjZWRlbmNlIG92ZXIgdGVtcGxhdGVVcmwuXG4gICAqICAgXG4gICAqICAgSWYgYHRlbXBsYXRlYCBpcyBhIGZ1bmN0aW9uLCBpdCB3aWxsIGJlIGNhbGxlZCB3aXRoIHRoZSBmb2xsb3dpbmcgcGFyYW1ldGVyczpcbiAgICpcbiAgICogICAtIHthcnJheS4mbHQ7b2JqZWN0Jmd0O30gLSBzdGF0ZSBwYXJhbWV0ZXJzIGV4dHJhY3RlZCBmcm9tIHRoZSBjdXJyZW50ICRsb2NhdGlvbi5wYXRoKCkgYnlcbiAgICogICAgIGFwcGx5aW5nIHRoZSBjdXJyZW50IHN0YXRlXG4gICAqXG4gICAqIDxwcmU+dGVtcGxhdGU6XG4gICAqICAgXCI8aDE+aW5saW5lIHRlbXBsYXRlIGRlZmluaXRpb248L2gxPlwiICtcbiAgICogICBcIjxkaXYgdWktdmlldz48L2Rpdj5cIjwvcHJlPlxuICAgKiA8cHJlPnRlbXBsYXRlOiBmdW5jdGlvbihwYXJhbXMpIHtcbiAgICogICAgICAgcmV0dXJuIFwiPGgxPmdlbmVyYXRlZCB0ZW1wbGF0ZTwvaDE+XCI7IH08L3ByZT5cbiAgICogPC9kaXY+XG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfGZ1bmN0aW9uPX0gc3RhdGVDb25maWcudGVtcGxhdGVVcmxcbiAgICogPGEgaWQ9J3RlbXBsYXRlVXJsJz48L2E+XG4gICAqXG4gICAqICAgcGF0aCBvciBmdW5jdGlvbiB0aGF0IHJldHVybnMgYSBwYXRoIHRvIGFuIGh0bWxcbiAgICogICB0ZW1wbGF0ZSB0aGF0IHNob3VsZCBiZSB1c2VkIGJ5IHVpVmlldy5cbiAgICogICBcbiAgICogICBJZiBgdGVtcGxhdGVVcmxgIGlzIGEgZnVuY3Rpb24sIGl0IHdpbGwgYmUgY2FsbGVkIHdpdGggdGhlIGZvbGxvd2luZyBwYXJhbWV0ZXJzOlxuICAgKlxuICAgKiAgIC0ge2FycmF5LiZsdDtvYmplY3QmZ3Q7fSAtIHN0YXRlIHBhcmFtZXRlcnMgZXh0cmFjdGVkIGZyb20gdGhlIGN1cnJlbnQgJGxvY2F0aW9uLnBhdGgoKSBieSBcbiAgICogICAgIGFwcGx5aW5nIHRoZSBjdXJyZW50IHN0YXRlXG4gICAqXG4gICAqIDxwcmU+dGVtcGxhdGVVcmw6IFwiaG9tZS5odG1sXCI8L3ByZT5cbiAgICogPHByZT50ZW1wbGF0ZVVybDogZnVuY3Rpb24ocGFyYW1zKSB7XG4gICAqICAgICByZXR1cm4gbXlUZW1wbGF0ZXNbcGFyYW1zLnBhZ2VJZF07IH08L3ByZT5cbiAgICpcbiAgICogQHBhcmFtIHtmdW5jdGlvbj19IHN0YXRlQ29uZmlnLnRlbXBsYXRlUHJvdmlkZXJcbiAgICogPGEgaWQ9J3RlbXBsYXRlUHJvdmlkZXInPjwvYT5cbiAgICogICAgUHJvdmlkZXIgZnVuY3Rpb24gdGhhdCByZXR1cm5zIEhUTUwgY29udGVudCBzdHJpbmcuXG4gICAqIDxwcmU+IHRlbXBsYXRlUHJvdmlkZXI6XG4gICAqICAgICAgIGZ1bmN0aW9uKE15VGVtcGxhdGVTZXJ2aWNlLCBwYXJhbXMpIHtcbiAgICogICAgICAgICByZXR1cm4gTXlUZW1wbGF0ZVNlcnZpY2UuZ2V0VGVtcGxhdGUocGFyYW1zLnBhZ2VJZCk7XG4gICAqICAgICAgIH08L3ByZT5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd8ZnVuY3Rpb249fSBzdGF0ZUNvbmZpZy5jb250cm9sbGVyXG4gICAqIDxhIGlkPSdjb250cm9sbGVyJz48L2E+XG4gICAqXG4gICAqICBDb250cm9sbGVyIGZuIHRoYXQgc2hvdWxkIGJlIGFzc29jaWF0ZWQgd2l0aCBuZXdseVxuICAgKiAgIHJlbGF0ZWQgc2NvcGUgb3IgdGhlIG5hbWUgb2YgYSByZWdpc3RlcmVkIGNvbnRyb2xsZXIgaWYgcGFzc2VkIGFzIGEgc3RyaW5nLlxuICAgKiAgIE9wdGlvbmFsbHksIHRoZSBDb250cm9sbGVyQXMgbWF5IGJlIGRlY2xhcmVkIGhlcmUuXG4gICAqIDxwcmU+Y29udHJvbGxlcjogXCJNeVJlZ2lzdGVyZWRDb250cm9sbGVyXCI8L3ByZT5cbiAgICogPHByZT5jb250cm9sbGVyOlxuICAgKiAgICAgXCJNeVJlZ2lzdGVyZWRDb250cm9sbGVyIGFzIGZvb0N0cmxcIn08L3ByZT5cbiAgICogPHByZT5jb250cm9sbGVyOiBmdW5jdGlvbigkc2NvcGUsIE15U2VydmljZSkge1xuICAgKiAgICAgJHNjb3BlLmRhdGEgPSBNeVNlcnZpY2UuZ2V0RGF0YSgpOyB9PC9wcmU+XG4gICAqXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb249fSBzdGF0ZUNvbmZpZy5jb250cm9sbGVyUHJvdmlkZXJcbiAgICogPGEgaWQ9J2NvbnRyb2xsZXJQcm92aWRlcic+PC9hPlxuICAgKlxuICAgKiBJbmplY3RhYmxlIHByb3ZpZGVyIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgYWN0dWFsIGNvbnRyb2xsZXIgb3Igc3RyaW5nLlxuICAgKiA8cHJlPmNvbnRyb2xsZXJQcm92aWRlcjpcbiAgICogICBmdW5jdGlvbihNeVJlc29sdmVEYXRhKSB7XG4gICAqICAgICBpZiAoTXlSZXNvbHZlRGF0YS5mb28pXG4gICAqICAgICAgIHJldHVybiBcIkZvb0N0cmxcIlxuICAgKiAgICAgZWxzZSBpZiAoTXlSZXNvbHZlRGF0YS5iYXIpXG4gICAqICAgICAgIHJldHVybiBcIkJhckN0cmxcIjtcbiAgICogICAgIGVsc2UgcmV0dXJuIGZ1bmN0aW9uKCRzY29wZSkge1xuICAgKiAgICAgICAkc2NvcGUuYmF6ID0gXCJRdXhcIjtcbiAgICogICAgIH1cbiAgICogICB9PC9wcmU+XG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nPX0gc3RhdGVDb25maWcuY29udHJvbGxlckFzXG4gICAqIDxhIGlkPSdjb250cm9sbGVyQXMnPjwvYT5cbiAgICogXG4gICAqIEEgY29udHJvbGxlciBhbGlhcyBuYW1lLiBJZiBwcmVzZW50IHRoZSBjb250cm9sbGVyIHdpbGwgYmVcbiAgICogICBwdWJsaXNoZWQgdG8gc2NvcGUgdW5kZXIgdGhlIGNvbnRyb2xsZXJBcyBuYW1lLlxuICAgKiA8cHJlPmNvbnRyb2xsZXJBczogXCJteUN0cmxcIjwvcHJlPlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdD19IHN0YXRlQ29uZmlnLnJlc29sdmVcbiAgICogPGEgaWQ9J3Jlc29sdmUnPjwvYT5cbiAgICpcbiAgICogQW4gb3B0aW9uYWwgbWFwJmx0O3N0cmluZywgZnVuY3Rpb24mZ3Q7IG9mIGRlcGVuZGVuY2llcyB3aGljaFxuICAgKiAgIHNob3VsZCBiZSBpbmplY3RlZCBpbnRvIHRoZSBjb250cm9sbGVyLiBJZiBhbnkgb2YgdGhlc2UgZGVwZW5kZW5jaWVzIGFyZSBwcm9taXNlcywgXG4gICAqICAgdGhlIHJvdXRlciB3aWxsIHdhaXQgZm9yIHRoZW0gYWxsIHRvIGJlIHJlc29sdmVkIGJlZm9yZSB0aGUgY29udHJvbGxlciBpcyBpbnN0YW50aWF0ZWQuXG4gICAqICAgSWYgYWxsIHRoZSBwcm9taXNlcyBhcmUgcmVzb2x2ZWQgc3VjY2Vzc2Z1bGx5LCB0aGUgJHN0YXRlQ2hhbmdlU3VjY2VzcyBldmVudCBpcyBmaXJlZFxuICAgKiAgIGFuZCB0aGUgdmFsdWVzIG9mIHRoZSByZXNvbHZlZCBwcm9taXNlcyBhcmUgaW5qZWN0ZWQgaW50byBhbnkgY29udHJvbGxlcnMgdGhhdCByZWZlcmVuY2UgdGhlbS5cbiAgICogICBJZiBhbnkgIG9mIHRoZSBwcm9taXNlcyBhcmUgcmVqZWN0ZWQgdGhlICRzdGF0ZUNoYW5nZUVycm9yIGV2ZW50IGlzIGZpcmVkLlxuICAgKlxuICAgKiAgIFRoZSBtYXAgb2JqZWN0IGlzOlxuICAgKiAgIFxuICAgKiAgIC0ga2V5IC0ge3N0cmluZ306IG5hbWUgb2YgZGVwZW5kZW5jeSB0byBiZSBpbmplY3RlZCBpbnRvIGNvbnRyb2xsZXJcbiAgICogICAtIGZhY3RvcnkgLSB7c3RyaW5nfGZ1bmN0aW9ufTogSWYgc3RyaW5nIHRoZW4gaXQgaXMgYWxpYXMgZm9yIHNlcnZpY2UuIE90aGVyd2lzZSBpZiBmdW5jdGlvbiwgXG4gICAqICAgICBpdCBpcyBpbmplY3RlZCBhbmQgcmV0dXJuIHZhbHVlIGl0IHRyZWF0ZWQgYXMgZGVwZW5kZW5jeS4gSWYgcmVzdWx0IGlzIGEgcHJvbWlzZSwgaXQgaXMgXG4gICAqICAgICByZXNvbHZlZCBiZWZvcmUgaXRzIHZhbHVlIGlzIGluamVjdGVkIGludG8gY29udHJvbGxlci5cbiAgICpcbiAgICogPHByZT5yZXNvbHZlOiB7XG4gICAqICAgICBteVJlc29sdmUxOlxuICAgKiAgICAgICBmdW5jdGlvbigkaHR0cCwgJHN0YXRlUGFyYW1zKSB7XG4gICAqICAgICAgICAgcmV0dXJuICRodHRwLmdldChcIi9hcGkvZm9vcy9cIitzdGF0ZVBhcmFtcy5mb29JRCk7XG4gICAqICAgICAgIH1cbiAgICogICAgIH08L3ByZT5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmc9fSBzdGF0ZUNvbmZpZy51cmxcbiAgICogPGEgaWQ9J3VybCc+PC9hPlxuICAgKlxuICAgKiAgIEEgdXJsIGZyYWdtZW50IHdpdGggb3B0aW9uYWwgcGFyYW1ldGVycy4gV2hlbiBhIHN0YXRlIGlzIG5hdmlnYXRlZCBvclxuICAgKiAgIHRyYW5zaXRpb25lZCB0bywgdGhlIGAkc3RhdGVQYXJhbXNgIHNlcnZpY2Ugd2lsbCBiZSBwb3B1bGF0ZWQgd2l0aCBhbnkgXG4gICAqICAgcGFyYW1ldGVycyB0aGF0IHdlcmUgcGFzc2VkLlxuICAgKlxuICAgKiBleGFtcGxlczpcbiAgICogPHByZT51cmw6IFwiL2hvbWVcIlxuICAgKiB1cmw6IFwiL3VzZXJzLzp1c2VyaWRcIlxuICAgKiB1cmw6IFwiL2Jvb2tzL3tib29raWQ6W2EtekEtWl8tXX1cIlxuICAgKiB1cmw6IFwiL2Jvb2tzL3tjYXRlZ29yeWlkOmludH1cIlxuICAgKiB1cmw6IFwiL2Jvb2tzL3twdWJsaXNoZXJuYW1lOnN0cmluZ30ve2NhdGVnb3J5aWQ6aW50fVwiXG4gICAqIHVybDogXCIvbWVzc2FnZXM/YmVmb3JlJmFmdGVyXCJcbiAgICogdXJsOiBcIi9tZXNzYWdlcz97YmVmb3JlOmRhdGV9JnthZnRlcjpkYXRlfVwiPC9wcmU+XG4gICAqIHVybDogXCIvbWVzc2FnZXMvOm1haWxib3hpZD97YmVmb3JlOmRhdGV9JnthZnRlcjpkYXRlfVwiXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0PX0gc3RhdGVDb25maWcudmlld3NcbiAgICogPGEgaWQ9J3ZpZXdzJz48L2E+XG4gICAqIGFuIG9wdGlvbmFsIG1hcCZsdDtzdHJpbmcsIG9iamVjdCZndDsgd2hpY2ggZGVmaW5lZCBtdWx0aXBsZSB2aWV3cywgb3IgdGFyZ2V0cyB2aWV3c1xuICAgKiBtYW51YWxseS9leHBsaWNpdGx5LlxuICAgKlxuICAgKiBFeGFtcGxlczpcbiAgICpcbiAgICogVGFyZ2V0cyB0aHJlZSBuYW1lZCBgdWktdmlld2BzIGluIHRoZSBwYXJlbnQgc3RhdGUncyB0ZW1wbGF0ZVxuICAgKiA8cHJlPnZpZXdzOiB7XG4gICAqICAgICBoZWFkZXI6IHtcbiAgICogICAgICAgY29udHJvbGxlcjogXCJoZWFkZXJDdHJsXCIsXG4gICAqICAgICAgIHRlbXBsYXRlVXJsOiBcImhlYWRlci5odG1sXCJcbiAgICogICAgIH0sIGJvZHk6IHtcbiAgICogICAgICAgY29udHJvbGxlcjogXCJib2R5Q3RybFwiLFxuICAgKiAgICAgICB0ZW1wbGF0ZVVybDogXCJib2R5Lmh0bWxcIlxuICAgKiAgICAgfSwgZm9vdGVyOiB7XG4gICAqICAgICAgIGNvbnRyb2xsZXI6IFwiZm9vdEN0cmxcIixcbiAgICogICAgICAgdGVtcGxhdGVVcmw6IFwiZm9vdGVyLmh0bWxcIlxuICAgKiAgICAgfVxuICAgKiAgIH08L3ByZT5cbiAgICpcbiAgICogVGFyZ2V0cyBuYW1lZCBgdWktdmlldz1cImhlYWRlclwiYCBmcm9tIGdyYW5kcGFyZW50IHN0YXRlICd0b3AnJ3MgdGVtcGxhdGUsIGFuZCBuYW1lZCBgdWktdmlldz1cImJvZHlcIiBmcm9tIHBhcmVudCBzdGF0ZSdzIHRlbXBsYXRlLlxuICAgKiA8cHJlPnZpZXdzOiB7XG4gICAqICAgICAnaGVhZGVyQHRvcCc6IHtcbiAgICogICAgICAgY29udHJvbGxlcjogXCJtc2dIZWFkZXJDdHJsXCIsXG4gICAqICAgICAgIHRlbXBsYXRlVXJsOiBcIm1zZ0hlYWRlci5odG1sXCJcbiAgICogICAgIH0sICdib2R5Jzoge1xuICAgKiAgICAgICBjb250cm9sbGVyOiBcIm1lc3NhZ2VzQ3RybFwiLFxuICAgKiAgICAgICB0ZW1wbGF0ZVVybDogXCJtZXNzYWdlcy5odG1sXCJcbiAgICogICAgIH1cbiAgICogICB9PC9wcmU+XG4gICAqXG4gICAqIEBwYXJhbSB7Ym9vbGVhbj19IFtzdGF0ZUNvbmZpZy5hYnN0cmFjdD1mYWxzZV1cbiAgICogPGEgaWQ9J2Fic3RyYWN0Jz48L2E+XG4gICAqIEFuIGFic3RyYWN0IHN0YXRlIHdpbGwgbmV2ZXIgYmUgZGlyZWN0bHkgYWN0aXZhdGVkLFxuICAgKiAgIGJ1dCBjYW4gcHJvdmlkZSBpbmhlcml0ZWQgcHJvcGVydGllcyB0byBpdHMgY29tbW9uIGNoaWxkcmVuIHN0YXRlcy5cbiAgICogPHByZT5hYnN0cmFjdDogdHJ1ZTwvcHJlPlxuICAgKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uPX0gc3RhdGVDb25maWcub25FbnRlclxuICAgKiA8YSBpZD0nb25FbnRlcic+PC9hPlxuICAgKlxuICAgKiBDYWxsYmFjayBmdW5jdGlvbiBmb3Igd2hlbiBhIHN0YXRlIGlzIGVudGVyZWQuIEdvb2Qgd2F5XG4gICAqICAgdG8gdHJpZ2dlciBhbiBhY3Rpb24gb3IgZGlzcGF0Y2ggYW4gZXZlbnQsIHN1Y2ggYXMgb3BlbmluZyBhIGRpYWxvZy5cbiAgICogSWYgbWluaWZ5aW5nIHlvdXIgc2NyaXB0cywgbWFrZSBzdXJlIHRvIGV4cGxpY3RseSBhbm5vdGF0ZSB0aGlzIGZ1bmN0aW9uLFxuICAgKiBiZWNhdXNlIGl0IHdvbid0IGJlIGF1dG9tYXRpY2FsbHkgYW5ub3RhdGVkIGJ5IHlvdXIgYnVpbGQgdG9vbHMuXG4gICAqXG4gICAqIDxwcmU+b25FbnRlcjogZnVuY3Rpb24oTXlTZXJ2aWNlLCAkc3RhdGVQYXJhbXMpIHtcbiAgICogICAgIE15U2VydmljZS5mb28oJHN0YXRlUGFyYW1zLm15UGFyYW0pO1xuICAgKiB9PC9wcmU+XG4gICAqXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb249fSBzdGF0ZUNvbmZpZy5vbkV4aXRcbiAgICogPGEgaWQ9J29uRXhpdCc+PC9hPlxuICAgKlxuICAgKiBDYWxsYmFjayBmdW5jdGlvbiBmb3Igd2hlbiBhIHN0YXRlIGlzIGV4aXRlZC4gR29vZCB3YXkgdG9cbiAgICogICB0cmlnZ2VyIGFuIGFjdGlvbiBvciBkaXNwYXRjaCBhbiBldmVudCwgc3VjaCBhcyBvcGVuaW5nIGEgZGlhbG9nLlxuICAgKiBJZiBtaW5pZnlpbmcgeW91ciBzY3JpcHRzLCBtYWtlIHN1cmUgdG8gZXhwbGljdGx5IGFubm90YXRlIHRoaXMgZnVuY3Rpb24sXG4gICAqIGJlY2F1c2UgaXQgd29uJ3QgYmUgYXV0b21hdGljYWxseSBhbm5vdGF0ZWQgYnkgeW91ciBidWlsZCB0b29scy5cbiAgICpcbiAgICogPHByZT5vbkV4aXQ6IGZ1bmN0aW9uKE15U2VydmljZSwgJHN0YXRlUGFyYW1zKSB7XG4gICAqICAgICBNeVNlcnZpY2UuY2xlYW51cCgkc3RhdGVQYXJhbXMubXlQYXJhbSk7XG4gICAqIH08L3ByZT5cbiAgICpcbiAgICogQHBhcmFtIHtib29sZWFuPX0gW3N0YXRlQ29uZmlnLnJlbG9hZE9uU2VhcmNoPXRydWVdXG4gICAqIDxhIGlkPSdyZWxvYWRPblNlYXJjaCc+PC9hPlxuICAgKlxuICAgKiBJZiBgZmFsc2VgLCB3aWxsIG5vdCByZXRyaWdnZXIgdGhlIHNhbWUgc3RhdGVcbiAgICogICBqdXN0IGJlY2F1c2UgYSBzZWFyY2gvcXVlcnkgcGFyYW1ldGVyIGhhcyBjaGFuZ2VkICh2aWEgJGxvY2F0aW9uLnNlYXJjaCgpIG9yICRsb2NhdGlvbi5oYXNoKCkpLiBcbiAgICogICBVc2VmdWwgZm9yIHdoZW4geW91J2QgbGlrZSB0byBtb2RpZnkgJGxvY2F0aW9uLnNlYXJjaCgpIHdpdGhvdXQgdHJpZ2dlcmluZyBhIHJlbG9hZC5cbiAgICogPHByZT5yZWxvYWRPblNlYXJjaDogZmFsc2U8L3ByZT5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3Q9fSBzdGF0ZUNvbmZpZy5kYXRhXG4gICAqIDxhIGlkPSdkYXRhJz48L2E+XG4gICAqXG4gICAqIEFyYml0cmFyeSBkYXRhIG9iamVjdCwgdXNlZnVsIGZvciBjdXN0b20gY29uZmlndXJhdGlvbi4gIFRoZSBwYXJlbnQgc3RhdGUncyBgZGF0YWAgaXNcbiAgICogICBwcm90b3R5cGFsbHkgaW5oZXJpdGVkLiAgSW4gb3RoZXIgd29yZHMsIGFkZGluZyBhIGRhdGEgcHJvcGVydHkgdG8gYSBzdGF0ZSBhZGRzIGl0IHRvXG4gICAqICAgdGhlIGVudGlyZSBzdWJ0cmVlIHZpYSBwcm90b3R5cGFsIGluaGVyaXRhbmNlLlxuICAgKlxuICAgKiA8cHJlPmRhdGE6IHtcbiAgICogICAgIHJlcXVpcmVkUm9sZTogJ2ZvbydcbiAgICogfSA8L3ByZT5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3Q9fSBzdGF0ZUNvbmZpZy5wYXJhbXNcbiAgICogPGEgaWQ9J3BhcmFtcyc+PC9hPlxuICAgKlxuICAgKiBBIG1hcCB3aGljaCBvcHRpb25hbGx5IGNvbmZpZ3VyZXMgcGFyYW1ldGVycyBkZWNsYXJlZCBpbiB0aGUgYHVybGAsIG9yXG4gICAqICAgZGVmaW5lcyBhZGRpdGlvbmFsIG5vbi11cmwgcGFyYW1ldGVycy4gIEZvciBlYWNoIHBhcmFtZXRlciBiZWluZ1xuICAgKiAgIGNvbmZpZ3VyZWQsIGFkZCBhIGNvbmZpZ3VyYXRpb24gb2JqZWN0IGtleWVkIHRvIHRoZSBuYW1lIG9mIHRoZSBwYXJhbWV0ZXIuXG4gICAqXG4gICAqICAgRWFjaCBwYXJhbWV0ZXIgY29uZmlndXJhdGlvbiBvYmplY3QgbWF5IGNvbnRhaW4gdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxuICAgKlxuICAgKiAgIC0gKiogdmFsdWUgKiogLSB7b2JqZWN0fGZ1bmN0aW9uPX06IHNwZWNpZmllcyB0aGUgZGVmYXVsdCB2YWx1ZSBmb3IgdGhpc1xuICAgKiAgICAgcGFyYW1ldGVyLiAgVGhpcyBpbXBsaWNpdGx5IHNldHMgdGhpcyBwYXJhbWV0ZXIgYXMgb3B0aW9uYWwuXG4gICAqXG4gICAqICAgICBXaGVuIFVJLVJvdXRlciByb3V0ZXMgdG8gYSBzdGF0ZSBhbmQgbm8gdmFsdWUgaXNcbiAgICogICAgIHNwZWNpZmllZCBmb3IgdGhpcyBwYXJhbWV0ZXIgaW4gdGhlIFVSTCBvciB0cmFuc2l0aW9uLCB0aGVcbiAgICogICAgIGRlZmF1bHQgdmFsdWUgd2lsbCBiZSB1c2VkIGluc3RlYWQuICBJZiBgdmFsdWVgIGlzIGEgZnVuY3Rpb24sXG4gICAqICAgICBpdCB3aWxsIGJlIGluamVjdGVkIGFuZCBpbnZva2VkLCBhbmQgdGhlIHJldHVybiB2YWx1ZSB1c2VkLlxuICAgKlxuICAgKiAgICAgKk5vdGUqOiBgdW5kZWZpbmVkYCBpcyB0cmVhdGVkIGFzIFwibm8gZGVmYXVsdCB2YWx1ZVwiIHdoaWxlIGBudWxsYFxuICAgKiAgICAgaXMgdHJlYXRlZCBhcyBcInRoZSBkZWZhdWx0IHZhbHVlIGlzIGBudWxsYFwiLlxuICAgKlxuICAgKiAgICAgKlNob3J0aGFuZCo6IElmIHlvdSBvbmx5IG5lZWQgdG8gY29uZmlndXJlIHRoZSBkZWZhdWx0IHZhbHVlIG9mIHRoZVxuICAgKiAgICAgcGFyYW1ldGVyLCB5b3UgbWF5IHVzZSBhIHNob3J0aGFuZCBzeW50YXguICAgSW4gdGhlICoqYHBhcmFtc2AqKlxuICAgKiAgICAgbWFwLCBpbnN0ZWFkIG1hcHBpbmcgdGhlIHBhcmFtIG5hbWUgdG8gYSBmdWxsIHBhcmFtZXRlciBjb25maWd1cmF0aW9uXG4gICAqICAgICBvYmplY3QsIHNpbXBseSBzZXQgbWFwIGl0IHRvIHRoZSBkZWZhdWx0IHBhcmFtZXRlciB2YWx1ZSwgZS5nLjpcbiAgICpcbiAgICogPHByZT4vLyBkZWZpbmUgYSBwYXJhbWV0ZXIncyBkZWZhdWx0IHZhbHVlXG4gICAqIHBhcmFtczoge1xuICAgKiAgICAgcGFyYW0xOiB7IHZhbHVlOiBcImRlZmF1bHRWYWx1ZVwiIH1cbiAgICogfVxuICAgKiAvLyBzaG9ydGhhbmQgZGVmYXVsdCB2YWx1ZXNcbiAgICogcGFyYW1zOiB7XG4gICAqICAgICBwYXJhbTE6IFwiZGVmYXVsdFZhbHVlXCIsXG4gICAqICAgICBwYXJhbTI6IFwicGFyYW0yRGVmYXVsdFwiXG4gICAqIH08L3ByZT5cbiAgICpcbiAgICogICAtICoqIGFycmF5ICoqIC0ge2Jvb2xlYW49fTogKihkZWZhdWx0OiBmYWxzZSkqIElmIHRydWUsIHRoZSBwYXJhbSB2YWx1ZSB3aWxsIGJlXG4gICAqICAgICB0cmVhdGVkIGFzIGFuIGFycmF5IG9mIHZhbHVlcy4gIElmIHlvdSBzcGVjaWZpZWQgYSBUeXBlLCB0aGUgdmFsdWUgd2lsbCBiZVxuICAgKiAgICAgdHJlYXRlZCBhcyBhbiBhcnJheSBvZiB0aGUgc3BlY2lmaWVkIFR5cGUuICBOb3RlOiBxdWVyeSBwYXJhbWV0ZXIgdmFsdWVzXG4gICAqICAgICBkZWZhdWx0IHRvIGEgc3BlY2lhbCBgXCJhdXRvXCJgIG1vZGUuXG4gICAqXG4gICAqICAgICBGb3IgcXVlcnkgcGFyYW1ldGVycyBpbiBgXCJhdXRvXCJgIG1vZGUsIGlmIG11bHRpcGxlICB2YWx1ZXMgZm9yIGEgc2luZ2xlIHBhcmFtZXRlclxuICAgKiAgICAgYXJlIHByZXNlbnQgaW4gdGhlIFVSTCAoZS5nLjogYC9mb28/YmFyPTEmYmFyPTImYmFyPTNgKSB0aGVuIHRoZSB2YWx1ZXNcbiAgICogICAgIGFyZSBtYXBwZWQgdG8gYW4gYXJyYXkgKGUuZy46IGB7IGZvbzogWyAnMScsICcyJywgJzMnIF0gfWApLiAgSG93ZXZlciwgaWZcbiAgICogICAgIG9ubHkgb25lIHZhbHVlIGlzIHByZXNlbnQgKGUuZy46IGAvZm9vP2Jhcj0xYCkgdGhlbiB0aGUgdmFsdWUgaXMgdHJlYXRlZCBhcyBzaW5nbGVcbiAgICogICAgIHZhbHVlIChlLmcuOiBgeyBmb286ICcxJyB9YCkuXG4gICAqXG4gICAqIDxwcmU+cGFyYW1zOiB7XG4gICAqICAgICBwYXJhbTE6IHsgYXJyYXk6IHRydWUgfVxuICAgKiB9PC9wcmU+XG4gICAqXG4gICAqICAgLSAqKiBzcXVhc2ggKiogLSB7Ym9vbHxzdHJpbmc9fTogYHNxdWFzaGAgY29uZmlndXJlcyBob3cgYSBkZWZhdWx0IHBhcmFtZXRlciB2YWx1ZSBpcyByZXByZXNlbnRlZCBpbiB0aGUgVVJMIHdoZW5cbiAgICogICAgIHRoZSBjdXJyZW50IHBhcmFtZXRlciB2YWx1ZSBpcyB0aGUgc2FtZSBhcyB0aGUgZGVmYXVsdCB2YWx1ZS4gSWYgYHNxdWFzaGAgaXMgbm90IHNldCwgaXQgdXNlcyB0aGVcbiAgICogICAgIGNvbmZpZ3VyZWQgZGVmYXVsdCBzcXVhc2ggcG9saWN5LlxuICAgKiAgICAgKFNlZSB7QGxpbmsgdWkucm91dGVyLnV0aWwuJHVybE1hdGNoZXJGYWN0b3J5I21ldGhvZHNfZGVmYXVsdFNxdWFzaFBvbGljeSBgZGVmYXVsdFNxdWFzaFBvbGljeSgpYH0pXG4gICAqXG4gICAqICAgVGhlcmUgYXJlIHRocmVlIHNxdWFzaCBzZXR0aW5nczpcbiAgICpcbiAgICogICAgIC0gZmFsc2U6IFRoZSBwYXJhbWV0ZXIncyBkZWZhdWx0IHZhbHVlIGlzIG5vdCBzcXVhc2hlZC4gIEl0IGlzIGVuY29kZWQgYW5kIGluY2x1ZGVkIGluIHRoZSBVUkxcbiAgICogICAgIC0gdHJ1ZTogVGhlIHBhcmFtZXRlcidzIGRlZmF1bHQgdmFsdWUgaXMgb21pdHRlZCBmcm9tIHRoZSBVUkwuICBJZiB0aGUgcGFyYW1ldGVyIGlzIHByZWNlZWRlZCBhbmQgZm9sbG93ZWRcbiAgICogICAgICAgYnkgc2xhc2hlcyBpbiB0aGUgc3RhdGUncyBgdXJsYCBkZWNsYXJhdGlvbiwgdGhlbiBvbmUgb2YgdGhvc2Ugc2xhc2hlcyBhcmUgb21pdHRlZC5cbiAgICogICAgICAgVGhpcyBjYW4gYWxsb3cgZm9yIGNsZWFuZXIgbG9va2luZyBVUkxzLlxuICAgKiAgICAgLSBgXCI8YXJiaXRyYXJ5IHN0cmluZz5cImA6IFRoZSBwYXJhbWV0ZXIncyBkZWZhdWx0IHZhbHVlIGlzIHJlcGxhY2VkIHdpdGggYW4gYXJiaXRyYXJ5IHBsYWNlaG9sZGVyIG9mICB5b3VyIGNob2ljZS5cbiAgICpcbiAgICogPHByZT5wYXJhbXM6IHtcbiAgICogICAgIHBhcmFtMToge1xuICAgKiAgICAgICB2YWx1ZTogXCJkZWZhdWx0SWRcIixcbiAgICogICAgICAgc3F1YXNoOiB0cnVlXG4gICAqIH0gfVxuICAgKiAvLyBzcXVhc2ggXCJkZWZhdWx0VmFsdWVcIiB0byBcIn5cIlxuICAgKiBwYXJhbXM6IHtcbiAgICogICAgIHBhcmFtMToge1xuICAgKiAgICAgICB2YWx1ZTogXCJkZWZhdWx0VmFsdWVcIixcbiAgICogICAgICAgc3F1YXNoOiBcIn5cIlxuICAgKiB9IH1cbiAgICogPC9wcmU+XG4gICAqXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIDxwcmU+XG4gICAqIC8vIFNvbWUgc3RhdGUgbmFtZSBleGFtcGxlc1xuICAgKlxuICAgKiAvLyBzdGF0ZU5hbWUgY2FuIGJlIGEgc2luZ2xlIHRvcC1sZXZlbCBuYW1lIChtdXN0IGJlIHVuaXF1ZSkuXG4gICAqICRzdGF0ZVByb3ZpZGVyLnN0YXRlKFwiaG9tZVwiLCB7fSk7XG4gICAqXG4gICAqIC8vIE9yIGl0IGNhbiBiZSBhIG5lc3RlZCBzdGF0ZSBuYW1lLiBUaGlzIHN0YXRlIGlzIGEgY2hpbGQgb2YgdGhlXG4gICAqIC8vIGFib3ZlIFwiaG9tZVwiIHN0YXRlLlxuICAgKiAkc3RhdGVQcm92aWRlci5zdGF0ZShcImhvbWUubmV3ZXN0XCIsIHt9KTtcbiAgICpcbiAgICogLy8gTmVzdCBzdGF0ZXMgYXMgZGVlcGx5IGFzIG5lZWRlZC5cbiAgICogJHN0YXRlUHJvdmlkZXIuc3RhdGUoXCJob21lLm5ld2VzdC5hYmMueHl6LmluY2VwdGlvblwiLCB7fSk7XG4gICAqXG4gICAqIC8vIHN0YXRlKCkgcmV0dXJucyAkc3RhdGVQcm92aWRlciwgc28geW91IGNhbiBjaGFpbiBzdGF0ZSBkZWNsYXJhdGlvbnMuXG4gICAqICRzdGF0ZVByb3ZpZGVyXG4gICAqICAgLnN0YXRlKFwiaG9tZVwiLCB7fSlcbiAgICogICAuc3RhdGUoXCJhYm91dFwiLCB7fSlcbiAgICogICAuc3RhdGUoXCJjb250YWN0c1wiLCB7fSk7XG4gICAqIDwvcHJlPlxuICAgKlxuICAgKi9cbiAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICBmdW5jdGlvbiBzdGF0ZShuYW1lLCBkZWZpbml0aW9uKSB7XG4gICAgLypqc2hpbnQgdmFsaWR0aGlzOiB0cnVlICovXG4gICAgaWYgKGlzT2JqZWN0KG5hbWUpKSBkZWZpbml0aW9uID0gbmFtZTtcbiAgICBlbHNlIGRlZmluaXRpb24ubmFtZSA9IG5hbWU7XG4gICAgcmVnaXN0ZXJTdGF0ZShkZWZpbml0aW9uKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAbmdkb2Mgb2JqZWN0XG4gICAqIEBuYW1lIHVpLnJvdXRlci5zdGF0ZS4kc3RhdGVcbiAgICpcbiAgICogQHJlcXVpcmVzICRyb290U2NvcGVcbiAgICogQHJlcXVpcmVzICRxXG4gICAqIEByZXF1aXJlcyB1aS5yb3V0ZXIuc3RhdGUuJHZpZXdcbiAgICogQHJlcXVpcmVzICRpbmplY3RvclxuICAgKiBAcmVxdWlyZXMgdWkucm91dGVyLnV0aWwuJHJlc29sdmVcbiAgICogQHJlcXVpcmVzIHVpLnJvdXRlci5zdGF0ZS4kc3RhdGVQYXJhbXNcbiAgICogQHJlcXVpcmVzIHVpLnJvdXRlci5yb3V0ZXIuJHVybFJvdXRlclxuICAgKlxuICAgKiBAcHJvcGVydHkge29iamVjdH0gcGFyYW1zIEEgcGFyYW0gb2JqZWN0LCBlLmcuIHtzZWN0aW9uSWQ6IHNlY3Rpb24uaWQpfSwgdGhhdCBcbiAgICogeW91J2QgbGlrZSB0byB0ZXN0IGFnYWluc3QgdGhlIGN1cnJlbnQgYWN0aXZlIHN0YXRlLlxuICAgKiBAcHJvcGVydHkge29iamVjdH0gY3VycmVudCBBIHJlZmVyZW5jZSB0byB0aGUgc3RhdGUncyBjb25maWcgb2JqZWN0LiBIb3dldmVyIFxuICAgKiB5b3UgcGFzc2VkIGl0IGluLiBVc2VmdWwgZm9yIGFjY2Vzc2luZyBjdXN0b20gZGF0YS5cbiAgICogQHByb3BlcnR5IHtvYmplY3R9IHRyYW5zaXRpb24gQ3VycmVudGx5IHBlbmRpbmcgdHJhbnNpdGlvbi4gQSBwcm9taXNlIHRoYXQnbGwgXG4gICAqIHJlc29sdmUgb3IgcmVqZWN0LlxuICAgKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogYCRzdGF0ZWAgc2VydmljZSBpcyByZXNwb25zaWJsZSBmb3IgcmVwcmVzZW50aW5nIHN0YXRlcyBhcyB3ZWxsIGFzIHRyYW5zaXRpb25pbmdcbiAgICogYmV0d2VlbiB0aGVtLiBJdCBhbHNvIHByb3ZpZGVzIGludGVyZmFjZXMgdG8gYXNrIGZvciBjdXJyZW50IHN0YXRlIG9yIGV2ZW4gc3RhdGVzXG4gICAqIHlvdSdyZSBjb21pbmcgZnJvbS5cbiAgICovXG4gIHRoaXMuJGdldCA9ICRnZXQ7XG4gICRnZXQuJGluamVjdCA9IFsnJHJvb3RTY29wZScsICckcScsICckdmlldycsICckaW5qZWN0b3InLCAnJHJlc29sdmUnLCAnJHN0YXRlUGFyYW1zJywgJyR1cmxSb3V0ZXInLCAnJGxvY2F0aW9uJywgJyR1cmxNYXRjaGVyRmFjdG9yeSddO1xuICBmdW5jdGlvbiAkZ2V0KCAgICRyb290U2NvcGUsICAgJHEsICAgJHZpZXcsICAgJGluamVjdG9yLCAgICRyZXNvbHZlLCAgICRzdGF0ZVBhcmFtcywgICAkdXJsUm91dGVyLCAgICRsb2NhdGlvbiwgICAkdXJsTWF0Y2hlckZhY3RvcnkpIHtcblxuICAgIHZhciBUcmFuc2l0aW9uU3VwZXJzZWRlZCA9ICRxLnJlamVjdChuZXcgRXJyb3IoJ3RyYW5zaXRpb24gc3VwZXJzZWRlZCcpKTtcbiAgICB2YXIgVHJhbnNpdGlvblByZXZlbnRlZCA9ICRxLnJlamVjdChuZXcgRXJyb3IoJ3RyYW5zaXRpb24gcHJldmVudGVkJykpO1xuICAgIHZhciBUcmFuc2l0aW9uQWJvcnRlZCA9ICRxLnJlamVjdChuZXcgRXJyb3IoJ3RyYW5zaXRpb24gYWJvcnRlZCcpKTtcbiAgICB2YXIgVHJhbnNpdGlvbkZhaWxlZCA9ICRxLnJlamVjdChuZXcgRXJyb3IoJ3RyYW5zaXRpb24gZmFpbGVkJykpO1xuXG4gICAgLy8gSGFuZGxlcyB0aGUgY2FzZSB3aGVyZSBhIHN0YXRlIHdoaWNoIGlzIHRoZSB0YXJnZXQgb2YgYSB0cmFuc2l0aW9uIGlzIG5vdCBmb3VuZCwgYW5kIHRoZSB1c2VyXG4gICAgLy8gY2FuIG9wdGlvbmFsbHkgcmV0cnkgb3IgZGVmZXIgdGhlIHRyYW5zaXRpb25cbiAgICBmdW5jdGlvbiBoYW5kbGVSZWRpcmVjdChyZWRpcmVjdCwgc3RhdGUsIHBhcmFtcywgb3B0aW9ucykge1xuICAgICAgLyoqXG4gICAgICAgKiBAbmdkb2MgZXZlbnRcbiAgICAgICAqIEBuYW1lIHVpLnJvdXRlci5zdGF0ZS4kc3RhdGUjJHN0YXRlTm90Rm91bmRcbiAgICAgICAqIEBldmVudE9mIHVpLnJvdXRlci5zdGF0ZS4kc3RhdGVcbiAgICAgICAqIEBldmVudFR5cGUgYnJvYWRjYXN0IG9uIHJvb3Qgc2NvcGVcbiAgICAgICAqIEBkZXNjcmlwdGlvblxuICAgICAgICogRmlyZWQgd2hlbiBhIHJlcXVlc3RlZCBzdGF0ZSAqKmNhbm5vdCBiZSBmb3VuZCoqIHVzaW5nIHRoZSBwcm92aWRlZCBzdGF0ZSBuYW1lIGR1cmluZyB0cmFuc2l0aW9uLlxuICAgICAgICogVGhlIGV2ZW50IGlzIGJyb2FkY2FzdCBhbGxvd2luZyBhbnkgaGFuZGxlcnMgYSBzaW5nbGUgY2hhbmNlIHRvIGRlYWwgd2l0aCB0aGUgZXJyb3IgKHVzdWFsbHkgYnlcbiAgICAgICAqIGxhenktbG9hZGluZyB0aGUgdW5mb3VuZCBzdGF0ZSkuIEEgc3BlY2lhbCBgdW5mb3VuZFN0YXRlYCBvYmplY3QgaXMgcGFzc2VkIHRvIHRoZSBsaXN0ZW5lciBoYW5kbGVyLFxuICAgICAgICogeW91IGNhbiBzZWUgaXRzIHRocmVlIHByb3BlcnRpZXMgaW4gdGhlIGV4YW1wbGUuIFlvdSBjYW4gdXNlIGBldmVudC5wcmV2ZW50RGVmYXVsdCgpYCB0byBhYm9ydCB0aGVcbiAgICAgICAqIHRyYW5zaXRpb24gYW5kIHRoZSBwcm9taXNlIHJldHVybmVkIGZyb20gYGdvYCB3aWxsIGJlIHJlamVjdGVkIHdpdGggYSBgJ3RyYW5zaXRpb24gYWJvcnRlZCdgIHZhbHVlLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCBFdmVudCBvYmplY3QuXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gdW5mb3VuZFN0YXRlIFVuZm91bmQgU3RhdGUgaW5mb3JtYXRpb24uIENvbnRhaW5zOiBgdG8sIHRvUGFyYW1zLCBvcHRpb25zYCBwcm9wZXJ0aWVzLlxuICAgICAgICogQHBhcmFtIHtTdGF0ZX0gZnJvbVN0YXRlIEN1cnJlbnQgc3RhdGUgb2JqZWN0LlxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IGZyb21QYXJhbXMgQ3VycmVudCBzdGF0ZSBwYXJhbXMuXG4gICAgICAgKlxuICAgICAgICogQGV4YW1wbGVcbiAgICAgICAqXG4gICAgICAgKiA8cHJlPlxuICAgICAgICogLy8gc29tZXdoZXJlLCBhc3N1bWUgbGF6eS5zdGF0ZSBoYXMgbm90IGJlZW4gZGVmaW5lZFxuICAgICAgICogJHN0YXRlLmdvKFwibGF6eS5zdGF0ZVwiLCB7YToxLCBiOjJ9LCB7aW5oZXJpdDpmYWxzZX0pO1xuICAgICAgICpcbiAgICAgICAqIC8vIHNvbWV3aGVyZSBlbHNlXG4gICAgICAgKiAkc2NvcGUuJG9uKCckc3RhdGVOb3RGb3VuZCcsXG4gICAgICAgKiBmdW5jdGlvbihldmVudCwgdW5mb3VuZFN0YXRlLCBmcm9tU3RhdGUsIGZyb21QYXJhbXMpe1xuICAgICAgICogICAgIGNvbnNvbGUubG9nKHVuZm91bmRTdGF0ZS50byk7IC8vIFwibGF6eS5zdGF0ZVwiXG4gICAgICAgKiAgICAgY29uc29sZS5sb2codW5mb3VuZFN0YXRlLnRvUGFyYW1zKTsgLy8ge2E6MSwgYjoyfVxuICAgICAgICogICAgIGNvbnNvbGUubG9nKHVuZm91bmRTdGF0ZS5vcHRpb25zKTsgLy8ge2luaGVyaXQ6ZmFsc2V9ICsgZGVmYXVsdCBvcHRpb25zXG4gICAgICAgKiB9KVxuICAgICAgICogPC9wcmU+XG4gICAgICAgKi9cbiAgICAgIHZhciBldnQgPSAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJyRzdGF0ZU5vdEZvdW5kJywgcmVkaXJlY3QsIHN0YXRlLCBwYXJhbXMpO1xuXG4gICAgICBpZiAoZXZ0LmRlZmF1bHRQcmV2ZW50ZWQpIHtcbiAgICAgICAgJHVybFJvdXRlci51cGRhdGUoKTtcbiAgICAgICAgcmV0dXJuIFRyYW5zaXRpb25BYm9ydGVkO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWV2dC5yZXRyeSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgLy8gQWxsb3cgdGhlIGhhbmRsZXIgdG8gcmV0dXJuIGEgcHJvbWlzZSB0byBkZWZlciBzdGF0ZSBsb29rdXAgcmV0cnlcbiAgICAgIGlmIChvcHRpb25zLiRyZXRyeSkge1xuICAgICAgICAkdXJsUm91dGVyLnVwZGF0ZSgpO1xuICAgICAgICByZXR1cm4gVHJhbnNpdGlvbkZhaWxlZDtcbiAgICAgIH1cbiAgICAgIHZhciByZXRyeVRyYW5zaXRpb24gPSAkc3RhdGUudHJhbnNpdGlvbiA9ICRxLndoZW4oZXZ0LnJldHJ5KTtcblxuICAgICAgcmV0cnlUcmFuc2l0aW9uLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChyZXRyeVRyYW5zaXRpb24gIT09ICRzdGF0ZS50cmFuc2l0aW9uKSByZXR1cm4gVHJhbnNpdGlvblN1cGVyc2VkZWQ7XG4gICAgICAgIHJlZGlyZWN0Lm9wdGlvbnMuJHJldHJ5ID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuICRzdGF0ZS50cmFuc2l0aW9uVG8ocmVkaXJlY3QudG8sIHJlZGlyZWN0LnRvUGFyYW1zLCByZWRpcmVjdC5vcHRpb25zKTtcbiAgICAgIH0sIGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gVHJhbnNpdGlvbkFib3J0ZWQ7XG4gICAgICB9KTtcbiAgICAgICR1cmxSb3V0ZXIudXBkYXRlKCk7XG5cbiAgICAgIHJldHVybiByZXRyeVRyYW5zaXRpb247XG4gICAgfVxuXG4gICAgcm9vdC5sb2NhbHMgPSB7IHJlc29sdmU6IG51bGwsIGdsb2JhbHM6IHsgJHN0YXRlUGFyYW1zOiB7fSB9IH07XG5cbiAgICAkc3RhdGUgPSB7XG4gICAgICBwYXJhbXM6IHt9LFxuICAgICAgY3VycmVudDogcm9vdC5zZWxmLFxuICAgICAgJGN1cnJlbnQ6IHJvb3QsXG4gICAgICB0cmFuc2l0aW9uOiBudWxsXG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEBuZ2RvYyBmdW5jdGlvblxuICAgICAqIEBuYW1lIHVpLnJvdXRlci5zdGF0ZS4kc3RhdGUjcmVsb2FkXG4gICAgICogQG1ldGhvZE9mIHVpLnJvdXRlci5zdGF0ZS4kc3RhdGVcbiAgICAgKlxuICAgICAqIEBkZXNjcmlwdGlvblxuICAgICAqIEEgbWV0aG9kIHRoYXQgZm9yY2UgcmVsb2FkcyB0aGUgY3VycmVudCBzdGF0ZS4gQWxsIHJlc29sdmVzIGFyZSByZS1yZXNvbHZlZCwgZXZlbnRzIGFyZSBub3QgcmUtZmlyZWQsIFxuICAgICAqIGFuZCBjb250cm9sbGVycyByZWluc3RhbnRpYXRlZCAoYnVnIHdpdGggY29udHJvbGxlcnMgcmVpbnN0YW50aWF0aW5nIHJpZ2h0IG5vdywgZml4aW5nIHNvb24pLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiA8cHJlPlxuICAgICAqIHZhciBhcHAgYW5ndWxhci5tb2R1bGUoJ2FwcCcsIFsndWkucm91dGVyJ10pO1xuICAgICAqXG4gICAgICogYXBwLmNvbnRyb2xsZXIoJ2N0cmwnLCBmdW5jdGlvbiAoJHNjb3BlLCAkc3RhdGUpIHtcbiAgICAgKiAgICRzY29wZS5yZWxvYWQgPSBmdW5jdGlvbigpe1xuICAgICAqICAgICAkc3RhdGUucmVsb2FkKCk7XG4gICAgICogICB9XG4gICAgICogfSk7XG4gICAgICogPC9wcmU+XG4gICAgICpcbiAgICAgKiBgcmVsb2FkKClgIGlzIGp1c3QgYW4gYWxpYXMgZm9yOlxuICAgICAqIDxwcmU+XG4gICAgICogJHN0YXRlLnRyYW5zaXRpb25Ubygkc3RhdGUuY3VycmVudCwgJHN0YXRlUGFyYW1zLCB7IFxuICAgICAqICAgcmVsb2FkOiB0cnVlLCBpbmhlcml0OiBmYWxzZSwgbm90aWZ5OiB0cnVlXG4gICAgICogfSk7XG4gICAgICogPC9wcmU+XG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7cHJvbWlzZX0gQSBwcm9taXNlIHJlcHJlc2VudGluZyB0aGUgc3RhdGUgb2YgdGhlIG5ldyB0cmFuc2l0aW9uLiBTZWVcbiAgICAgKiB7QGxpbmsgdWkucm91dGVyLnN0YXRlLiRzdGF0ZSNtZXRob2RzX2dvICRzdGF0ZS5nb30uXG4gICAgICovXG4gICAgJHN0YXRlLnJlbG9hZCA9IGZ1bmN0aW9uIHJlbG9hZCgpIHtcbiAgICAgIHJldHVybiAkc3RhdGUudHJhbnNpdGlvblRvKCRzdGF0ZS5jdXJyZW50LCAkc3RhdGVQYXJhbXMsIHsgcmVsb2FkOiB0cnVlLCBpbmhlcml0OiBmYWxzZSwgbm90aWZ5OiB0cnVlIH0pO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBAbmdkb2MgZnVuY3Rpb25cbiAgICAgKiBAbmFtZSB1aS5yb3V0ZXIuc3RhdGUuJHN0YXRlI2dvXG4gICAgICogQG1ldGhvZE9mIHVpLnJvdXRlci5zdGF0ZS4kc3RhdGVcbiAgICAgKlxuICAgICAqIEBkZXNjcmlwdGlvblxuICAgICAqIENvbnZlbmllbmNlIG1ldGhvZCBmb3IgdHJhbnNpdGlvbmluZyB0byBhIG5ldyBzdGF0ZS4gYCRzdGF0ZS5nb2AgY2FsbHMgXG4gICAgICogYCRzdGF0ZS50cmFuc2l0aW9uVG9gIGludGVybmFsbHkgYnV0IGF1dG9tYXRpY2FsbHkgc2V0cyBvcHRpb25zIHRvIFxuICAgICAqIGB7IGxvY2F0aW9uOiB0cnVlLCBpbmhlcml0OiB0cnVlLCByZWxhdGl2ZTogJHN0YXRlLiRjdXJyZW50LCBub3RpZnk6IHRydWUgfWAuIFxuICAgICAqIFRoaXMgYWxsb3dzIHlvdSB0byBlYXNpbHkgdXNlIGFuIGFic29sdXRlIG9yIHJlbGF0aXZlIHRvIHBhdGggYW5kIHNwZWNpZnkgXG4gICAgICogb25seSB0aGUgcGFyYW1ldGVycyB5b3UnZCBsaWtlIHRvIHVwZGF0ZSAod2hpbGUgbGV0dGluZyB1bnNwZWNpZmllZCBwYXJhbWV0ZXJzIFxuICAgICAqIGluaGVyaXQgZnJvbSB0aGUgY3VycmVudGx5IGFjdGl2ZSBhbmNlc3RvciBzdGF0ZXMpLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiA8cHJlPlxuICAgICAqIHZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnYXBwJywgWyd1aS5yb3V0ZXInXSk7XG4gICAgICpcbiAgICAgKiBhcHAuY29udHJvbGxlcignY3RybCcsIGZ1bmN0aW9uICgkc2NvcGUsICRzdGF0ZSkge1xuICAgICAqICAgJHNjb3BlLmNoYW5nZVN0YXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAqICAgICAkc3RhdGUuZ28oJ2NvbnRhY3QuZGV0YWlsJyk7XG4gICAgICogICB9O1xuICAgICAqIH0pO1xuICAgICAqIDwvcHJlPlxuICAgICAqIDxpbWcgc3JjPScuLi9uZ2RvY19hc3NldHMvU3RhdGVHb0V4YW1wbGVzLnBuZycvPlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRvIEFic29sdXRlIHN0YXRlIG5hbWUgb3IgcmVsYXRpdmUgc3RhdGUgcGF0aC4gU29tZSBleGFtcGxlczpcbiAgICAgKlxuICAgICAqIC0gYCRzdGF0ZS5nbygnY29udGFjdC5kZXRhaWwnKWAgLSB3aWxsIGdvIHRvIHRoZSBgY29udGFjdC5kZXRhaWxgIHN0YXRlXG4gICAgICogLSBgJHN0YXRlLmdvKCdeJylgIC0gd2lsbCBnbyB0byBhIHBhcmVudCBzdGF0ZVxuICAgICAqIC0gYCRzdGF0ZS5nbygnXi5zaWJsaW5nJylgIC0gd2lsbCBnbyB0byBhIHNpYmxpbmcgc3RhdGVcbiAgICAgKiAtIGAkc3RhdGUuZ28oJy5jaGlsZC5ncmFuZGNoaWxkJylgIC0gd2lsbCBnbyB0byBncmFuZGNoaWxkIHN0YXRlXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdD19IHBhcmFtcyBBIG1hcCBvZiB0aGUgcGFyYW1ldGVycyB0aGF0IHdpbGwgYmUgc2VudCB0byB0aGUgc3RhdGUsIFxuICAgICAqIHdpbGwgcG9wdWxhdGUgJHN0YXRlUGFyYW1zLiBBbnkgcGFyYW1ldGVycyB0aGF0IGFyZSBub3Qgc3BlY2lmaWVkIHdpbGwgYmUgaW5oZXJpdGVkIGZyb20gY3VycmVudGx5IFxuICAgICAqIGRlZmluZWQgcGFyYW1ldGVycy4gVGhpcyBhbGxvd3MsIGZvciBleGFtcGxlLCBnb2luZyB0byBhIHNpYmxpbmcgc3RhdGUgdGhhdCBzaGFyZXMgcGFyYW1ldGVyc1xuICAgICAqIHNwZWNpZmllZCBpbiBhIHBhcmVudCBzdGF0ZS4gUGFyYW1ldGVyIGluaGVyaXRhbmNlIG9ubHkgd29ya3MgYmV0d2VlbiBjb21tb24gYW5jZXN0b3Igc3RhdGVzLCBJLmUuXG4gICAgICogdHJhbnNpdGlvbmluZyB0byBhIHNpYmxpbmcgd2lsbCBnZXQgeW91IHRoZSBwYXJhbWV0ZXJzIGZvciBhbGwgcGFyZW50cywgdHJhbnNpdGlvbmluZyB0byBhIGNoaWxkXG4gICAgICogd2lsbCBnZXQgeW91IGFsbCBjdXJyZW50IHBhcmFtZXRlcnMsIGV0Yy5cbiAgICAgKiBAcGFyYW0ge29iamVjdD19IG9wdGlvbnMgT3B0aW9ucyBvYmplY3QuIFRoZSBvcHRpb25zIGFyZTpcbiAgICAgKlxuICAgICAqIC0gKipgbG9jYXRpb25gKiogLSB7Ym9vbGVhbj10cnVlfHN0cmluZz19IC0gSWYgYHRydWVgIHdpbGwgdXBkYXRlIHRoZSB1cmwgaW4gdGhlIGxvY2F0aW9uIGJhciwgaWYgYGZhbHNlYFxuICAgICAqICAgIHdpbGwgbm90LiBJZiBzdHJpbmcsIG11c3QgYmUgYFwicmVwbGFjZVwiYCwgd2hpY2ggd2lsbCB1cGRhdGUgdXJsIGFuZCBhbHNvIHJlcGxhY2UgbGFzdCBoaXN0b3J5IHJlY29yZC5cbiAgICAgKiAtICoqYGluaGVyaXRgKiogLSB7Ym9vbGVhbj10cnVlfSwgSWYgYHRydWVgIHdpbGwgaW5oZXJpdCB1cmwgcGFyYW1ldGVycyBmcm9tIGN1cnJlbnQgdXJsLlxuICAgICAqIC0gKipgcmVsYXRpdmVgKiogLSB7b2JqZWN0PSRzdGF0ZS4kY3VycmVudH0sIFdoZW4gdHJhbnNpdGlvbmluZyB3aXRoIHJlbGF0aXZlIHBhdGggKGUuZyAnXicpLCBcbiAgICAgKiAgICBkZWZpbmVzIHdoaWNoIHN0YXRlIHRvIGJlIHJlbGF0aXZlIGZyb20uXG4gICAgICogLSAqKmBub3RpZnlgKiogLSB7Ym9vbGVhbj10cnVlfSwgSWYgYHRydWVgIHdpbGwgYnJvYWRjYXN0ICRzdGF0ZUNoYW5nZVN0YXJ0IGFuZCAkc3RhdGVDaGFuZ2VTdWNjZXNzIGV2ZW50cy5cbiAgICAgKiAtICoqYHJlbG9hZGAqKiAodjAuMi41KSAtIHtib29sZWFuPWZhbHNlfSwgSWYgYHRydWVgIHdpbGwgZm9yY2UgdHJhbnNpdGlvbiBldmVuIGlmIHRoZSBzdGF0ZSBvciBwYXJhbXMgXG4gICAgICogICAgaGF2ZSBub3QgY2hhbmdlZCwgYWthIGEgcmVsb2FkIG9mIHRoZSBzYW1lIHN0YXRlLiBJdCBkaWZmZXJzIGZyb20gcmVsb2FkT25TZWFyY2ggYmVjYXVzZSB5b3UnZFxuICAgICAqICAgIHVzZSB0aGlzIHdoZW4geW91IHdhbnQgdG8gZm9yY2UgYSByZWxvYWQgd2hlbiAqZXZlcnl0aGluZyogaXMgdGhlIHNhbWUsIGluY2x1ZGluZyBzZWFyY2ggcGFyYW1zLlxuICAgICAqXG4gICAgICogQHJldHVybnMge3Byb21pc2V9IEEgcHJvbWlzZSByZXByZXNlbnRpbmcgdGhlIHN0YXRlIG9mIHRoZSBuZXcgdHJhbnNpdGlvbi5cbiAgICAgKlxuICAgICAqIFBvc3NpYmxlIHN1Y2Nlc3MgdmFsdWVzOlxuICAgICAqXG4gICAgICogLSAkc3RhdGUuY3VycmVudFxuICAgICAqXG4gICAgICogPGJyLz5Qb3NzaWJsZSByZWplY3Rpb24gdmFsdWVzOlxuICAgICAqXG4gICAgICogLSAndHJhbnNpdGlvbiBzdXBlcnNlZGVkJyAtIHdoZW4gYSBuZXdlciB0cmFuc2l0aW9uIGhhcyBiZWVuIHN0YXJ0ZWQgYWZ0ZXIgdGhpcyBvbmVcbiAgICAgKiAtICd0cmFuc2l0aW9uIHByZXZlbnRlZCcgLSB3aGVuIGBldmVudC5wcmV2ZW50RGVmYXVsdCgpYCBoYXMgYmVlbiBjYWxsZWQgaW4gYSBgJHN0YXRlQ2hhbmdlU3RhcnRgIGxpc3RlbmVyXG4gICAgICogLSAndHJhbnNpdGlvbiBhYm9ydGVkJyAtIHdoZW4gYGV2ZW50LnByZXZlbnREZWZhdWx0KClgIGhhcyBiZWVuIGNhbGxlZCBpbiBhIGAkc3RhdGVOb3RGb3VuZGAgbGlzdGVuZXIgb3JcbiAgICAgKiAgIHdoZW4gYSBgJHN0YXRlTm90Rm91bmRgIGBldmVudC5yZXRyeWAgcHJvbWlzZSBlcnJvcnMuXG4gICAgICogLSAndHJhbnNpdGlvbiBmYWlsZWQnIC0gd2hlbiBhIHN0YXRlIGhhcyBiZWVuIHVuc3VjY2Vzc2Z1bGx5IGZvdW5kIGFmdGVyIDIgdHJpZXMuXG4gICAgICogLSAqcmVzb2x2ZSBlcnJvciogLSB3aGVuIGFuIGVycm9yIGhhcyBvY2N1cnJlZCB3aXRoIGEgYHJlc29sdmVgXG4gICAgICpcbiAgICAgKi9cbiAgICAkc3RhdGUuZ28gPSBmdW5jdGlvbiBnbyh0bywgcGFyYW1zLCBvcHRpb25zKSB7XG4gICAgICByZXR1cm4gJHN0YXRlLnRyYW5zaXRpb25Ubyh0bywgcGFyYW1zLCBleHRlbmQoeyBpbmhlcml0OiB0cnVlLCByZWxhdGl2ZTogJHN0YXRlLiRjdXJyZW50IH0sIG9wdGlvbnMpKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQG5nZG9jIGZ1bmN0aW9uXG4gICAgICogQG5hbWUgdWkucm91dGVyLnN0YXRlLiRzdGF0ZSN0cmFuc2l0aW9uVG9cbiAgICAgKiBAbWV0aG9kT2YgdWkucm91dGVyLnN0YXRlLiRzdGF0ZVxuICAgICAqXG4gICAgICogQGRlc2NyaXB0aW9uXG4gICAgICogTG93LWxldmVsIG1ldGhvZCBmb3IgdHJhbnNpdGlvbmluZyB0byBhIG5ldyBzdGF0ZS4ge0BsaW5rIHVpLnJvdXRlci5zdGF0ZS4kc3RhdGUjbWV0aG9kc19nbyAkc3RhdGUuZ299XG4gICAgICogdXNlcyBgdHJhbnNpdGlvblRvYCBpbnRlcm5hbGx5LiBgJHN0YXRlLmdvYCBpcyByZWNvbW1lbmRlZCBpbiBtb3N0IHNpdHVhdGlvbnMuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIDxwcmU+XG4gICAgICogdmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbJ3VpLnJvdXRlciddKTtcbiAgICAgKlxuICAgICAqIGFwcC5jb250cm9sbGVyKCdjdHJsJywgZnVuY3Rpb24gKCRzY29wZSwgJHN0YXRlKSB7XG4gICAgICogICAkc2NvcGUuY2hhbmdlU3RhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICogICAgICRzdGF0ZS50cmFuc2l0aW9uVG8oJ2NvbnRhY3QuZGV0YWlsJyk7XG4gICAgICogICB9O1xuICAgICAqIH0pO1xuICAgICAqIDwvcHJlPlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRvIFN0YXRlIG5hbWUuXG4gICAgICogQHBhcmFtIHtvYmplY3Q9fSB0b1BhcmFtcyBBIG1hcCBvZiB0aGUgcGFyYW1ldGVycyB0aGF0IHdpbGwgYmUgc2VudCB0byB0aGUgc3RhdGUsXG4gICAgICogd2lsbCBwb3B1bGF0ZSAkc3RhdGVQYXJhbXMuXG4gICAgICogQHBhcmFtIHtvYmplY3Q9fSBvcHRpb25zIE9wdGlvbnMgb2JqZWN0LiBUaGUgb3B0aW9ucyBhcmU6XG4gICAgICpcbiAgICAgKiAtICoqYGxvY2F0aW9uYCoqIC0ge2Jvb2xlYW49dHJ1ZXxzdHJpbmc9fSAtIElmIGB0cnVlYCB3aWxsIHVwZGF0ZSB0aGUgdXJsIGluIHRoZSBsb2NhdGlvbiBiYXIsIGlmIGBmYWxzZWBcbiAgICAgKiAgICB3aWxsIG5vdC4gSWYgc3RyaW5nLCBtdXN0IGJlIGBcInJlcGxhY2VcImAsIHdoaWNoIHdpbGwgdXBkYXRlIHVybCBhbmQgYWxzbyByZXBsYWNlIGxhc3QgaGlzdG9yeSByZWNvcmQuXG4gICAgICogLSAqKmBpbmhlcml0YCoqIC0ge2Jvb2xlYW49ZmFsc2V9LCBJZiBgdHJ1ZWAgd2lsbCBpbmhlcml0IHVybCBwYXJhbWV0ZXJzIGZyb20gY3VycmVudCB1cmwuXG4gICAgICogLSAqKmByZWxhdGl2ZWAqKiAtIHtvYmplY3Q9fSwgV2hlbiB0cmFuc2l0aW9uaW5nIHdpdGggcmVsYXRpdmUgcGF0aCAoZS5nICdeJyksIFxuICAgICAqICAgIGRlZmluZXMgd2hpY2ggc3RhdGUgdG8gYmUgcmVsYXRpdmUgZnJvbS5cbiAgICAgKiAtICoqYG5vdGlmeWAqKiAtIHtib29sZWFuPXRydWV9LCBJZiBgdHJ1ZWAgd2lsbCBicm9hZGNhc3QgJHN0YXRlQ2hhbmdlU3RhcnQgYW5kICRzdGF0ZUNoYW5nZVN1Y2Nlc3MgZXZlbnRzLlxuICAgICAqIC0gKipgcmVsb2FkYCoqICh2MC4yLjUpIC0ge2Jvb2xlYW49ZmFsc2V9LCBJZiBgdHJ1ZWAgd2lsbCBmb3JjZSB0cmFuc2l0aW9uIGV2ZW4gaWYgdGhlIHN0YXRlIG9yIHBhcmFtcyBcbiAgICAgKiAgICBoYXZlIG5vdCBjaGFuZ2VkLCBha2EgYSByZWxvYWQgb2YgdGhlIHNhbWUgc3RhdGUuIEl0IGRpZmZlcnMgZnJvbSByZWxvYWRPblNlYXJjaCBiZWNhdXNlIHlvdSdkXG4gICAgICogICAgdXNlIHRoaXMgd2hlbiB5b3Ugd2FudCB0byBmb3JjZSBhIHJlbG9hZCB3aGVuICpldmVyeXRoaW5nKiBpcyB0aGUgc2FtZSwgaW5jbHVkaW5nIHNlYXJjaCBwYXJhbXMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7cHJvbWlzZX0gQSBwcm9taXNlIHJlcHJlc2VudGluZyB0aGUgc3RhdGUgb2YgdGhlIG5ldyB0cmFuc2l0aW9uLiBTZWVcbiAgICAgKiB7QGxpbmsgdWkucm91dGVyLnN0YXRlLiRzdGF0ZSNtZXRob2RzX2dvICRzdGF0ZS5nb30uXG4gICAgICovXG4gICAgJHN0YXRlLnRyYW5zaXRpb25UbyA9IGZ1bmN0aW9uIHRyYW5zaXRpb25Ubyh0bywgdG9QYXJhbXMsIG9wdGlvbnMpIHtcbiAgICAgIHRvUGFyYW1zID0gdG9QYXJhbXMgfHwge307XG4gICAgICBvcHRpb25zID0gZXh0ZW5kKHtcbiAgICAgICAgbG9jYXRpb246IHRydWUsIGluaGVyaXQ6IGZhbHNlLCByZWxhdGl2ZTogbnVsbCwgbm90aWZ5OiB0cnVlLCByZWxvYWQ6IGZhbHNlLCAkcmV0cnk6IGZhbHNlXG4gICAgICB9LCBvcHRpb25zIHx8IHt9KTtcblxuICAgICAgdmFyIGZyb20gPSAkc3RhdGUuJGN1cnJlbnQsIGZyb21QYXJhbXMgPSAkc3RhdGUucGFyYW1zLCBmcm9tUGF0aCA9IGZyb20ucGF0aDtcbiAgICAgIHZhciBldnQsIHRvU3RhdGUgPSBmaW5kU3RhdGUodG8sIG9wdGlvbnMucmVsYXRpdmUpO1xuXG4gICAgICBpZiAoIWlzRGVmaW5lZCh0b1N0YXRlKSkge1xuICAgICAgICB2YXIgcmVkaXJlY3QgPSB7IHRvOiB0bywgdG9QYXJhbXM6IHRvUGFyYW1zLCBvcHRpb25zOiBvcHRpb25zIH07XG4gICAgICAgIHZhciByZWRpcmVjdFJlc3VsdCA9IGhhbmRsZVJlZGlyZWN0KHJlZGlyZWN0LCBmcm9tLnNlbGYsIGZyb21QYXJhbXMsIG9wdGlvbnMpO1xuXG4gICAgICAgIGlmIChyZWRpcmVjdFJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiByZWRpcmVjdFJlc3VsdDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFsd2F5cyByZXRyeSBvbmNlIGlmIHRoZSAkc3RhdGVOb3RGb3VuZCB3YXMgbm90IHByZXZlbnRlZFxuICAgICAgICAvLyAoaGFuZGxlcyBlaXRoZXIgcmVkaXJlY3QgY2hhbmdlZCBvciBzdGF0ZSBsYXp5LWRlZmluaXRpb24pXG4gICAgICAgIHRvID0gcmVkaXJlY3QudG87XG4gICAgICAgIHRvUGFyYW1zID0gcmVkaXJlY3QudG9QYXJhbXM7XG4gICAgICAgIG9wdGlvbnMgPSByZWRpcmVjdC5vcHRpb25zO1xuICAgICAgICB0b1N0YXRlID0gZmluZFN0YXRlKHRvLCBvcHRpb25zLnJlbGF0aXZlKTtcblxuICAgICAgICBpZiAoIWlzRGVmaW5lZCh0b1N0YXRlKSkge1xuICAgICAgICAgIGlmICghb3B0aW9ucy5yZWxhdGl2ZSkgdGhyb3cgbmV3IEVycm9yKFwiTm8gc3VjaCBzdGF0ZSAnXCIgKyB0byArIFwiJ1wiKTtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZCBub3QgcmVzb2x2ZSAnXCIgKyB0byArIFwiJyBmcm9tIHN0YXRlICdcIiArIG9wdGlvbnMucmVsYXRpdmUgKyBcIidcIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh0b1N0YXRlW2Fic3RyYWN0S2V5XSkgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IHRyYW5zaXRpb24gdG8gYWJzdHJhY3Qgc3RhdGUgJ1wiICsgdG8gKyBcIidcIik7XG4gICAgICBpZiAob3B0aW9ucy5pbmhlcml0KSB0b1BhcmFtcyA9IGluaGVyaXRQYXJhbXMoJHN0YXRlUGFyYW1zLCB0b1BhcmFtcyB8fCB7fSwgJHN0YXRlLiRjdXJyZW50LCB0b1N0YXRlKTtcbiAgICAgIGlmICghdG9TdGF0ZS5wYXJhbXMuJCR2YWxpZGF0ZXModG9QYXJhbXMpKSByZXR1cm4gVHJhbnNpdGlvbkZhaWxlZDtcblxuICAgICAgdG9QYXJhbXMgPSB0b1N0YXRlLnBhcmFtcy4kJHZhbHVlcyh0b1BhcmFtcyk7XG4gICAgICB0byA9IHRvU3RhdGU7XG5cbiAgICAgIHZhciB0b1BhdGggPSB0by5wYXRoO1xuXG4gICAgICAvLyBTdGFydGluZyBmcm9tIHRoZSByb290IG9mIHRoZSBwYXRoLCBrZWVwIGFsbCBsZXZlbHMgdGhhdCBoYXZlbid0IGNoYW5nZWRcbiAgICAgIHZhciBrZWVwID0gMCwgc3RhdGUgPSB0b1BhdGhba2VlcF0sIGxvY2FscyA9IHJvb3QubG9jYWxzLCB0b0xvY2FscyA9IFtdO1xuXG4gICAgICBpZiAoIW9wdGlvbnMucmVsb2FkKSB7XG4gICAgICAgIHdoaWxlIChzdGF0ZSAmJiBzdGF0ZSA9PT0gZnJvbVBhdGhba2VlcF0gJiYgc3RhdGUub3duUGFyYW1zLiQkZXF1YWxzKHRvUGFyYW1zLCBmcm9tUGFyYW1zKSkge1xuICAgICAgICAgIGxvY2FscyA9IHRvTG9jYWxzW2tlZXBdID0gc3RhdGUubG9jYWxzO1xuICAgICAgICAgIGtlZXArKztcbiAgICAgICAgICBzdGF0ZSA9IHRvUGF0aFtrZWVwXTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBJZiB3ZSdyZSBnb2luZyB0byB0aGUgc2FtZSBzdGF0ZSBhbmQgYWxsIGxvY2FscyBhcmUga2VwdCwgd2UndmUgZ290IG5vdGhpbmcgdG8gZG8uXG4gICAgICAvLyBCdXQgY2xlYXIgJ3RyYW5zaXRpb24nLCBhcyB3ZSBzdGlsbCB3YW50IHRvIGNhbmNlbCBhbnkgb3RoZXIgcGVuZGluZyB0cmFuc2l0aW9ucy5cbiAgICAgIC8vIFRPRE86IFdlIG1heSBub3Qgd2FudCB0byBidW1wICd0cmFuc2l0aW9uJyBpZiB3ZSdyZSBjYWxsZWQgZnJvbSBhIGxvY2F0aW9uIGNoYW5nZVxuICAgICAgLy8gdGhhdCB3ZSd2ZSBpbml0aWF0ZWQgb3Vyc2VsdmVzLCBiZWNhdXNlIHdlIG1pZ2h0IGFjY2lkZW50YWxseSBhYm9ydCBhIGxlZ2l0aW1hdGVcbiAgICAgIC8vIHRyYW5zaXRpb24gaW5pdGlhdGVkIGZyb20gY29kZT9cbiAgICAgIGlmIChzaG91bGRUcmlnZ2VyUmVsb2FkKHRvLCBmcm9tLCBsb2NhbHMsIG9wdGlvbnMpKSB7XG4gICAgICAgIGlmICh0by5zZWxmLnJlbG9hZE9uU2VhcmNoICE9PSBmYWxzZSkgJHVybFJvdXRlci51cGRhdGUoKTtcbiAgICAgICAgJHN0YXRlLnRyYW5zaXRpb24gPSBudWxsO1xuICAgICAgICByZXR1cm4gJHEud2hlbigkc3RhdGUuY3VycmVudCk7XG4gICAgICB9XG5cbiAgICAgIC8vIEZpbHRlciBwYXJhbWV0ZXJzIGJlZm9yZSB3ZSBwYXNzIHRoZW0gdG8gZXZlbnQgaGFuZGxlcnMgZXRjLlxuICAgICAgdG9QYXJhbXMgPSBmaWx0ZXJCeUtleXModG8ucGFyYW1zLiQka2V5cygpLCB0b1BhcmFtcyB8fCB7fSk7XG5cbiAgICAgIC8vIEJyb2FkY2FzdCBzdGFydCBldmVudCBhbmQgY2FuY2VsIHRoZSB0cmFuc2l0aW9uIGlmIHJlcXVlc3RlZFxuICAgICAgaWYgKG9wdGlvbnMubm90aWZ5KSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbmdkb2MgZXZlbnRcbiAgICAgICAgICogQG5hbWUgdWkucm91dGVyLnN0YXRlLiRzdGF0ZSMkc3RhdGVDaGFuZ2VTdGFydFxuICAgICAgICAgKiBAZXZlbnRPZiB1aS5yb3V0ZXIuc3RhdGUuJHN0YXRlXG4gICAgICAgICAqIEBldmVudFR5cGUgYnJvYWRjYXN0IG9uIHJvb3Qgc2NvcGVcbiAgICAgICAgICogQGRlc2NyaXB0aW9uXG4gICAgICAgICAqIEZpcmVkIHdoZW4gdGhlIHN0YXRlIHRyYW5zaXRpb24gKipiZWdpbnMqKi4gWW91IGNhbiB1c2UgYGV2ZW50LnByZXZlbnREZWZhdWx0KClgXG4gICAgICAgICAqIHRvIHByZXZlbnQgdGhlIHRyYW5zaXRpb24gZnJvbSBoYXBwZW5pbmcgYW5kIHRoZW4gdGhlIHRyYW5zaXRpb24gcHJvbWlzZSB3aWxsIGJlXG4gICAgICAgICAqIHJlamVjdGVkIHdpdGggYSBgJ3RyYW5zaXRpb24gcHJldmVudGVkJ2AgdmFsdWUuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCBFdmVudCBvYmplY3QuXG4gICAgICAgICAqIEBwYXJhbSB7U3RhdGV9IHRvU3RhdGUgVGhlIHN0YXRlIGJlaW5nIHRyYW5zaXRpb25lZCB0by5cbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHRvUGFyYW1zIFRoZSBwYXJhbXMgc3VwcGxpZWQgdG8gdGhlIGB0b1N0YXRlYC5cbiAgICAgICAgICogQHBhcmFtIHtTdGF0ZX0gZnJvbVN0YXRlIFRoZSBjdXJyZW50IHN0YXRlLCBwcmUtdHJhbnNpdGlvbi5cbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGZyb21QYXJhbXMgVGhlIHBhcmFtcyBzdXBwbGllZCB0byB0aGUgYGZyb21TdGF0ZWAuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqXG4gICAgICAgICAqIDxwcmU+XG4gICAgICAgICAqICRyb290U2NvcGUuJG9uKCckc3RhdGVDaGFuZ2VTdGFydCcsXG4gICAgICAgICAqIGZ1bmN0aW9uKGV2ZW50LCB0b1N0YXRlLCB0b1BhcmFtcywgZnJvbVN0YXRlLCBmcm9tUGFyYW1zKXtcbiAgICAgICAgICogICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAqICAgICAvLyB0cmFuc2l0aW9uVG8oKSBwcm9taXNlIHdpbGwgYmUgcmVqZWN0ZWQgd2l0aFxuICAgICAgICAgKiAgICAgLy8gYSAndHJhbnNpdGlvbiBwcmV2ZW50ZWQnIGVycm9yXG4gICAgICAgICAqIH0pXG4gICAgICAgICAqIDwvcHJlPlxuICAgICAgICAgKi9cbiAgICAgICAgaWYgKCRyb290U2NvcGUuJGJyb2FkY2FzdCgnJHN0YXRlQ2hhbmdlU3RhcnQnLCB0by5zZWxmLCB0b1BhcmFtcywgZnJvbS5zZWxmLCBmcm9tUGFyYW1zKS5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICAgICAgJHVybFJvdXRlci51cGRhdGUoKTtcbiAgICAgICAgICByZXR1cm4gVHJhbnNpdGlvblByZXZlbnRlZDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBSZXNvbHZlIGxvY2FscyBmb3IgdGhlIHJlbWFpbmluZyBzdGF0ZXMsIGJ1dCBkb24ndCB1cGRhdGUgYW55IGdsb2JhbCBzdGF0ZSBqdXN0XG4gICAgICAvLyB5ZXQgLS0gaWYgYW55dGhpbmcgZmFpbHMgdG8gcmVzb2x2ZSB0aGUgY3VycmVudCBzdGF0ZSBuZWVkcyB0byByZW1haW4gdW50b3VjaGVkLlxuICAgICAgLy8gV2UgYWxzbyBzZXQgdXAgYW4gaW5oZXJpdGFuY2UgY2hhaW4gZm9yIHRoZSBsb2NhbHMgaGVyZS4gVGhpcyBhbGxvd3MgdGhlIHZpZXcgZGlyZWN0aXZlXG4gICAgICAvLyB0byBxdWlja2x5IGxvb2sgdXAgdGhlIGNvcnJlY3QgZGVmaW5pdGlvbiBmb3IgZWFjaCB2aWV3IGluIHRoZSBjdXJyZW50IHN0YXRlLiBFdmVuXG4gICAgICAvLyB0aG91Z2ggd2UgY3JlYXRlIHRoZSBsb2NhbHMgb2JqZWN0IGl0c2VsZiBvdXRzaWRlIHJlc29sdmVTdGF0ZSgpLCBpdCBpcyBpbml0aWFsbHlcbiAgICAgIC8vIGVtcHR5IGFuZCBnZXRzIGZpbGxlZCBhc3luY2hyb25vdXNseS4gV2UgbmVlZCB0byBrZWVwIHRyYWNrIG9mIHRoZSBwcm9taXNlIGZvciB0aGVcbiAgICAgIC8vIChmdWxseSByZXNvbHZlZCkgY3VycmVudCBsb2NhbHMsIGFuZCBwYXNzIHRoaXMgZG93biB0aGUgY2hhaW4uXG4gICAgICB2YXIgcmVzb2x2ZWQgPSAkcS53aGVuKGxvY2Fscyk7XG5cbiAgICAgIGZvciAodmFyIGwgPSBrZWVwOyBsIDwgdG9QYXRoLmxlbmd0aDsgbCsrLCBzdGF0ZSA9IHRvUGF0aFtsXSkge1xuICAgICAgICBsb2NhbHMgPSB0b0xvY2Fsc1tsXSA9IGluaGVyaXQobG9jYWxzKTtcbiAgICAgICAgcmVzb2x2ZWQgPSByZXNvbHZlU3RhdGUoc3RhdGUsIHRvUGFyYW1zLCBzdGF0ZSA9PT0gdG8sIHJlc29sdmVkLCBsb2NhbHMsIG9wdGlvbnMpO1xuICAgICAgfVxuXG4gICAgICAvLyBPbmNlIGV2ZXJ5dGhpbmcgaXMgcmVzb2x2ZWQsIHdlIGFyZSByZWFkeSB0byBwZXJmb3JtIHRoZSBhY3R1YWwgdHJhbnNpdGlvblxuICAgICAgLy8gYW5kIHJldHVybiBhIHByb21pc2UgZm9yIHRoZSBuZXcgc3RhdGUuIFdlIGFsc28ga2VlcCB0cmFjayBvZiB3aGF0IHRoZVxuICAgICAgLy8gY3VycmVudCBwcm9taXNlIGlzLCBzbyB0aGF0IHdlIGNhbiBkZXRlY3Qgb3ZlcmxhcHBpbmcgdHJhbnNpdGlvbnMgYW5kXG4gICAgICAvLyBrZWVwIG9ubHkgdGhlIG91dGNvbWUgb2YgdGhlIGxhc3QgdHJhbnNpdGlvbi5cbiAgICAgIHZhciB0cmFuc2l0aW9uID0gJHN0YXRlLnRyYW5zaXRpb24gPSByZXNvbHZlZC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGwsIGVudGVyaW5nLCBleGl0aW5nO1xuXG4gICAgICAgIGlmICgkc3RhdGUudHJhbnNpdGlvbiAhPT0gdHJhbnNpdGlvbikgcmV0dXJuIFRyYW5zaXRpb25TdXBlcnNlZGVkO1xuXG4gICAgICAgIC8vIEV4aXQgJ2Zyb20nIHN0YXRlcyBub3Qga2VwdFxuICAgICAgICBmb3IgKGwgPSBmcm9tUGF0aC5sZW5ndGggLSAxOyBsID49IGtlZXA7IGwtLSkge1xuICAgICAgICAgIGV4aXRpbmcgPSBmcm9tUGF0aFtsXTtcbiAgICAgICAgICBpZiAoZXhpdGluZy5zZWxmLm9uRXhpdCkge1xuICAgICAgICAgICAgJGluamVjdG9yLmludm9rZShleGl0aW5nLnNlbGYub25FeGl0LCBleGl0aW5nLnNlbGYsIGV4aXRpbmcubG9jYWxzLmdsb2JhbHMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBleGl0aW5nLmxvY2FscyA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBFbnRlciAndG8nIHN0YXRlcyBub3Qga2VwdFxuICAgICAgICBmb3IgKGwgPSBrZWVwOyBsIDwgdG9QYXRoLmxlbmd0aDsgbCsrKSB7XG4gICAgICAgICAgZW50ZXJpbmcgPSB0b1BhdGhbbF07XG4gICAgICAgICAgZW50ZXJpbmcubG9jYWxzID0gdG9Mb2NhbHNbbF07XG4gICAgICAgICAgaWYgKGVudGVyaW5nLnNlbGYub25FbnRlcikge1xuICAgICAgICAgICAgJGluamVjdG9yLmludm9rZShlbnRlcmluZy5zZWxmLm9uRW50ZXIsIGVudGVyaW5nLnNlbGYsIGVudGVyaW5nLmxvY2Fscy5nbG9iYWxzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSdW4gaXQgYWdhaW4sIHRvIGNhdGNoIGFueSB0cmFuc2l0aW9ucyBpbiBjYWxsYmFja3NcbiAgICAgICAgaWYgKCRzdGF0ZS50cmFuc2l0aW9uICE9PSB0cmFuc2l0aW9uKSByZXR1cm4gVHJhbnNpdGlvblN1cGVyc2VkZWQ7XG5cbiAgICAgICAgLy8gVXBkYXRlIGdsb2JhbHMgaW4gJHN0YXRlXG4gICAgICAgICRzdGF0ZS4kY3VycmVudCA9IHRvO1xuICAgICAgICAkc3RhdGUuY3VycmVudCA9IHRvLnNlbGY7XG4gICAgICAgICRzdGF0ZS5wYXJhbXMgPSB0b1BhcmFtcztcbiAgICAgICAgY29weSgkc3RhdGUucGFyYW1zLCAkc3RhdGVQYXJhbXMpO1xuICAgICAgICAkc3RhdGUudHJhbnNpdGlvbiA9IG51bGw7XG5cbiAgICAgICAgaWYgKG9wdGlvbnMubG9jYXRpb24gJiYgdG8ubmF2aWdhYmxlKSB7XG4gICAgICAgICAgJHVybFJvdXRlci5wdXNoKHRvLm5hdmlnYWJsZS51cmwsIHRvLm5hdmlnYWJsZS5sb2NhbHMuZ2xvYmFscy4kc3RhdGVQYXJhbXMsIHtcbiAgICAgICAgICAgICQkYXZvaWRSZXN5bmM6IHRydWUsIHJlcGxhY2U6IG9wdGlvbnMubG9jYXRpb24gPT09ICdyZXBsYWNlJ1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9wdGlvbnMubm90aWZ5KSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbmdkb2MgZXZlbnRcbiAgICAgICAgICogQG5hbWUgdWkucm91dGVyLnN0YXRlLiRzdGF0ZSMkc3RhdGVDaGFuZ2VTdWNjZXNzXG4gICAgICAgICAqIEBldmVudE9mIHVpLnJvdXRlci5zdGF0ZS4kc3RhdGVcbiAgICAgICAgICogQGV2ZW50VHlwZSBicm9hZGNhc3Qgb24gcm9vdCBzY29wZVxuICAgICAgICAgKiBAZGVzY3JpcHRpb25cbiAgICAgICAgICogRmlyZWQgb25jZSB0aGUgc3RhdGUgdHJhbnNpdGlvbiBpcyAqKmNvbXBsZXRlKiouXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCBFdmVudCBvYmplY3QuXG4gICAgICAgICAqIEBwYXJhbSB7U3RhdGV9IHRvU3RhdGUgVGhlIHN0YXRlIGJlaW5nIHRyYW5zaXRpb25lZCB0by5cbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHRvUGFyYW1zIFRoZSBwYXJhbXMgc3VwcGxpZWQgdG8gdGhlIGB0b1N0YXRlYC5cbiAgICAgICAgICogQHBhcmFtIHtTdGF0ZX0gZnJvbVN0YXRlIFRoZSBjdXJyZW50IHN0YXRlLCBwcmUtdHJhbnNpdGlvbi5cbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGZyb21QYXJhbXMgVGhlIHBhcmFtcyBzdXBwbGllZCB0byB0aGUgYGZyb21TdGF0ZWAuXG4gICAgICAgICAqL1xuICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnJHN0YXRlQ2hhbmdlU3VjY2VzcycsIHRvLnNlbGYsIHRvUGFyYW1zLCBmcm9tLnNlbGYsIGZyb21QYXJhbXMpO1xuICAgICAgICB9XG4gICAgICAgICR1cmxSb3V0ZXIudXBkYXRlKHRydWUpO1xuXG4gICAgICAgIHJldHVybiAkc3RhdGUuY3VycmVudDtcbiAgICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICBpZiAoJHN0YXRlLnRyYW5zaXRpb24gIT09IHRyYW5zaXRpb24pIHJldHVybiBUcmFuc2l0aW9uU3VwZXJzZWRlZDtcblxuICAgICAgICAkc3RhdGUudHJhbnNpdGlvbiA9IG51bGw7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbmdkb2MgZXZlbnRcbiAgICAgICAgICogQG5hbWUgdWkucm91dGVyLnN0YXRlLiRzdGF0ZSMkc3RhdGVDaGFuZ2VFcnJvclxuICAgICAgICAgKiBAZXZlbnRPZiB1aS5yb3V0ZXIuc3RhdGUuJHN0YXRlXG4gICAgICAgICAqIEBldmVudFR5cGUgYnJvYWRjYXN0IG9uIHJvb3Qgc2NvcGVcbiAgICAgICAgICogQGRlc2NyaXB0aW9uXG4gICAgICAgICAqIEZpcmVkIHdoZW4gYW4gKiplcnJvciBvY2N1cnMqKiBkdXJpbmcgdHJhbnNpdGlvbi4gSXQncyBpbXBvcnRhbnQgdG8gbm90ZSB0aGF0IGlmIHlvdVxuICAgICAgICAgKiBoYXZlIGFueSBlcnJvcnMgaW4geW91ciByZXNvbHZlIGZ1bmN0aW9ucyAoamF2YXNjcmlwdCBlcnJvcnMsIG5vbi1leGlzdGVudCBzZXJ2aWNlcywgZXRjKVxuICAgICAgICAgKiB0aGV5IHdpbGwgbm90IHRocm93IHRyYWRpdGlvbmFsbHkuIFlvdSBtdXN0IGxpc3RlbiBmb3IgdGhpcyAkc3RhdGVDaGFuZ2VFcnJvciBldmVudCB0b1xuICAgICAgICAgKiBjYXRjaCAqKkFMTCoqIGVycm9ycy5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50IEV2ZW50IG9iamVjdC5cbiAgICAgICAgICogQHBhcmFtIHtTdGF0ZX0gdG9TdGF0ZSBUaGUgc3RhdGUgYmVpbmcgdHJhbnNpdGlvbmVkIHRvLlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gdG9QYXJhbXMgVGhlIHBhcmFtcyBzdXBwbGllZCB0byB0aGUgYHRvU3RhdGVgLlxuICAgICAgICAgKiBAcGFyYW0ge1N0YXRlfSBmcm9tU3RhdGUgVGhlIGN1cnJlbnQgc3RhdGUsIHByZS10cmFuc2l0aW9uLlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gZnJvbVBhcmFtcyBUaGUgcGFyYW1zIHN1cHBsaWVkIHRvIHRoZSBgZnJvbVN0YXRlYC5cbiAgICAgICAgICogQHBhcmFtIHtFcnJvcn0gZXJyb3IgVGhlIHJlc29sdmUgZXJyb3Igb2JqZWN0LlxuICAgICAgICAgKi9cbiAgICAgICAgZXZ0ID0gJHJvb3RTY29wZS4kYnJvYWRjYXN0KCckc3RhdGVDaGFuZ2VFcnJvcicsIHRvLnNlbGYsIHRvUGFyYW1zLCBmcm9tLnNlbGYsIGZyb21QYXJhbXMsIGVycm9yKTtcblxuICAgICAgICBpZiAoIWV2dC5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICAgICAgICAkdXJsUm91dGVyLnVwZGF0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICRxLnJlamVjdChlcnJvcik7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHRyYW5zaXRpb247XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEBuZ2RvYyBmdW5jdGlvblxuICAgICAqIEBuYW1lIHVpLnJvdXRlci5zdGF0ZS4kc3RhdGUjaXNcbiAgICAgKiBAbWV0aG9kT2YgdWkucm91dGVyLnN0YXRlLiRzdGF0ZVxuICAgICAqXG4gICAgICogQGRlc2NyaXB0aW9uXG4gICAgICogU2ltaWxhciB0byB7QGxpbmsgdWkucm91dGVyLnN0YXRlLiRzdGF0ZSNtZXRob2RzX2luY2x1ZGVzICRzdGF0ZS5pbmNsdWRlc30sXG4gICAgICogYnV0IG9ubHkgY2hlY2tzIGZvciB0aGUgZnVsbCBzdGF0ZSBuYW1lLiBJZiBwYXJhbXMgaXMgc3VwcGxpZWQgdGhlbiBpdCB3aWxsIGJlXG4gICAgICogdGVzdGVkIGZvciBzdHJpY3QgZXF1YWxpdHkgYWdhaW5zdCB0aGUgY3VycmVudCBhY3RpdmUgcGFyYW1zIG9iamVjdCwgc28gYWxsIHBhcmFtc1xuICAgICAqIG11c3QgbWF0Y2ggd2l0aCBub25lIG1pc3NpbmcgYW5kIG5vIGV4dHJhcy5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogPHByZT5cbiAgICAgKiAkc3RhdGUuJGN1cnJlbnQubmFtZSA9ICdjb250YWN0cy5kZXRhaWxzLml0ZW0nO1xuICAgICAqXG4gICAgICogLy8gYWJzb2x1dGUgbmFtZVxuICAgICAqICRzdGF0ZS5pcygnY29udGFjdC5kZXRhaWxzLml0ZW0nKTsgLy8gcmV0dXJucyB0cnVlXG4gICAgICogJHN0YXRlLmlzKGNvbnRhY3REZXRhaWxJdGVtU3RhdGVPYmplY3QpOyAvLyByZXR1cm5zIHRydWVcbiAgICAgKlxuICAgICAqIC8vIHJlbGF0aXZlIG5hbWUgKC4gYW5kIF4pLCB0eXBpY2FsbHkgZnJvbSBhIHRlbXBsYXRlXG4gICAgICogLy8gRS5nLiBmcm9tIHRoZSAnY29udGFjdHMuZGV0YWlscycgdGVtcGxhdGVcbiAgICAgKiA8ZGl2IG5nLWNsYXNzPVwie2hpZ2hsaWdodGVkOiAkc3RhdGUuaXMoJy5pdGVtJyl9XCI+SXRlbTwvZGl2PlxuICAgICAqIDwvcHJlPlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd8b2JqZWN0fSBzdGF0ZU9yTmFtZSBUaGUgc3RhdGUgbmFtZSAoYWJzb2x1dGUgb3IgcmVsYXRpdmUpIG9yIHN0YXRlIG9iamVjdCB5b3UnZCBsaWtlIHRvIGNoZWNrLlxuICAgICAqIEBwYXJhbSB7b2JqZWN0PX0gcGFyYW1zIEEgcGFyYW0gb2JqZWN0LCBlLmcuIGB7c2VjdGlvbklkOiBzZWN0aW9uLmlkfWAsIHRoYXQgeW91J2QgbGlrZVxuICAgICAqIHRvIHRlc3QgYWdhaW5zdCB0aGUgY3VycmVudCBhY3RpdmUgc3RhdGUuXG4gICAgICogQHBhcmFtIHtvYmplY3Q9fSBvcHRpb25zIEFuIG9wdGlvbnMgb2JqZWN0LiAgVGhlIG9wdGlvbnMgYXJlOlxuICAgICAqXG4gICAgICogLSAqKmByZWxhdGl2ZWAqKiAtIHtzdHJpbmd8b2JqZWN0fSAtICBJZiBgc3RhdGVPck5hbWVgIGlzIGEgcmVsYXRpdmUgc3RhdGUgbmFtZSBhbmQgYG9wdGlvbnMucmVsYXRpdmVgIGlzIHNldCwgLmlzIHdpbGxcbiAgICAgKiB0ZXN0IHJlbGF0aXZlIHRvIGBvcHRpb25zLnJlbGF0aXZlYCBzdGF0ZSAob3IgbmFtZSkuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIGl0IGlzIHRoZSBzdGF0ZS5cbiAgICAgKi9cbiAgICAkc3RhdGUuaXMgPSBmdW5jdGlvbiBpcyhzdGF0ZU9yTmFtZSwgcGFyYW1zLCBvcHRpb25zKSB7XG4gICAgICBvcHRpb25zID0gZXh0ZW5kKHsgcmVsYXRpdmU6ICRzdGF0ZS4kY3VycmVudCB9LCBvcHRpb25zIHx8IHt9KTtcbiAgICAgIHZhciBzdGF0ZSA9IGZpbmRTdGF0ZShzdGF0ZU9yTmFtZSwgb3B0aW9ucy5yZWxhdGl2ZSk7XG5cbiAgICAgIGlmICghaXNEZWZpbmVkKHN0YXRlKSkgeyByZXR1cm4gdW5kZWZpbmVkOyB9XG4gICAgICBpZiAoJHN0YXRlLiRjdXJyZW50ICE9PSBzdGF0ZSkgeyByZXR1cm4gZmFsc2U7IH1cbiAgICAgIHJldHVybiBwYXJhbXMgPyBlcXVhbEZvcktleXMoc3RhdGUucGFyYW1zLiQkdmFsdWVzKHBhcmFtcyksICRzdGF0ZVBhcmFtcykgOiB0cnVlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBAbmdkb2MgZnVuY3Rpb25cbiAgICAgKiBAbmFtZSB1aS5yb3V0ZXIuc3RhdGUuJHN0YXRlI2luY2x1ZGVzXG4gICAgICogQG1ldGhvZE9mIHVpLnJvdXRlci5zdGF0ZS4kc3RhdGVcbiAgICAgKlxuICAgICAqIEBkZXNjcmlwdGlvblxuICAgICAqIEEgbWV0aG9kIHRvIGRldGVybWluZSBpZiB0aGUgY3VycmVudCBhY3RpdmUgc3RhdGUgaXMgZXF1YWwgdG8gb3IgaXMgdGhlIGNoaWxkIG9mIHRoZVxuICAgICAqIHN0YXRlIHN0YXRlTmFtZS4gSWYgYW55IHBhcmFtcyBhcmUgcGFzc2VkIHRoZW4gdGhleSB3aWxsIGJlIHRlc3RlZCBmb3IgYSBtYXRjaCBhcyB3ZWxsLlxuICAgICAqIE5vdCBhbGwgdGhlIHBhcmFtZXRlcnMgbmVlZCB0byBiZSBwYXNzZWQsIGp1c3QgdGhlIG9uZXMgeW91J2QgbGlrZSB0byB0ZXN0IGZvciBlcXVhbGl0eS5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogUGFydGlhbCBhbmQgcmVsYXRpdmUgbmFtZXNcbiAgICAgKiA8cHJlPlxuICAgICAqICRzdGF0ZS4kY3VycmVudC5uYW1lID0gJ2NvbnRhY3RzLmRldGFpbHMuaXRlbSc7XG4gICAgICpcbiAgICAgKiAvLyBVc2luZyBwYXJ0aWFsIG5hbWVzXG4gICAgICogJHN0YXRlLmluY2x1ZGVzKFwiY29udGFjdHNcIik7IC8vIHJldHVybnMgdHJ1ZVxuICAgICAqICRzdGF0ZS5pbmNsdWRlcyhcImNvbnRhY3RzLmRldGFpbHNcIik7IC8vIHJldHVybnMgdHJ1ZVxuICAgICAqICRzdGF0ZS5pbmNsdWRlcyhcImNvbnRhY3RzLmRldGFpbHMuaXRlbVwiKTsgLy8gcmV0dXJucyB0cnVlXG4gICAgICogJHN0YXRlLmluY2x1ZGVzKFwiY29udGFjdHMubGlzdFwiKTsgLy8gcmV0dXJucyBmYWxzZVxuICAgICAqICRzdGF0ZS5pbmNsdWRlcyhcImFib3V0XCIpOyAvLyByZXR1cm5zIGZhbHNlXG4gICAgICpcbiAgICAgKiAvLyBVc2luZyByZWxhdGl2ZSBuYW1lcyAoLiBhbmQgXiksIHR5cGljYWxseSBmcm9tIGEgdGVtcGxhdGVcbiAgICAgKiAvLyBFLmcuIGZyb20gdGhlICdjb250YWN0cy5kZXRhaWxzJyB0ZW1wbGF0ZVxuICAgICAqIDxkaXYgbmctY2xhc3M9XCJ7aGlnaGxpZ2h0ZWQ6ICRzdGF0ZS5pbmNsdWRlcygnLml0ZW0nKX1cIj5JdGVtPC9kaXY+XG4gICAgICogPC9wcmU+XG4gICAgICpcbiAgICAgKiBCYXNpYyBnbG9iYmluZyBwYXR0ZXJuc1xuICAgICAqIDxwcmU+XG4gICAgICogJHN0YXRlLiRjdXJyZW50Lm5hbWUgPSAnY29udGFjdHMuZGV0YWlscy5pdGVtLnVybCc7XG4gICAgICpcbiAgICAgKiAkc3RhdGUuaW5jbHVkZXMoXCIqLmRldGFpbHMuKi4qXCIpOyAvLyByZXR1cm5zIHRydWVcbiAgICAgKiAkc3RhdGUuaW5jbHVkZXMoXCIqLmRldGFpbHMuKipcIik7IC8vIHJldHVybnMgdHJ1ZVxuICAgICAqICRzdGF0ZS5pbmNsdWRlcyhcIioqLml0ZW0uKipcIik7IC8vIHJldHVybnMgdHJ1ZVxuICAgICAqICRzdGF0ZS5pbmNsdWRlcyhcIiouZGV0YWlscy5pdGVtLnVybFwiKTsgLy8gcmV0dXJucyB0cnVlXG4gICAgICogJHN0YXRlLmluY2x1ZGVzKFwiKi5kZXRhaWxzLioudXJsXCIpOyAvLyByZXR1cm5zIHRydWVcbiAgICAgKiAkc3RhdGUuaW5jbHVkZXMoXCIqLmRldGFpbHMuKlwiKTsgLy8gcmV0dXJucyBmYWxzZVxuICAgICAqICRzdGF0ZS5pbmNsdWRlcyhcIml0ZW0uKipcIik7IC8vIHJldHVybnMgZmFsc2VcbiAgICAgKiA8L3ByZT5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdGF0ZU9yTmFtZSBBIHBhcnRpYWwgbmFtZSwgcmVsYXRpdmUgbmFtZSwgb3IgZ2xvYiBwYXR0ZXJuXG4gICAgICogdG8gYmUgc2VhcmNoZWQgZm9yIHdpdGhpbiB0aGUgY3VycmVudCBzdGF0ZSBuYW1lLlxuICAgICAqIEBwYXJhbSB7b2JqZWN0PX0gcGFyYW1zIEEgcGFyYW0gb2JqZWN0LCBlLmcuIGB7c2VjdGlvbklkOiBzZWN0aW9uLmlkfWAsXG4gICAgICogdGhhdCB5b3UnZCBsaWtlIHRvIHRlc3QgYWdhaW5zdCB0aGUgY3VycmVudCBhY3RpdmUgc3RhdGUuXG4gICAgICogQHBhcmFtIHtvYmplY3Q9fSBvcHRpb25zIEFuIG9wdGlvbnMgb2JqZWN0LiAgVGhlIG9wdGlvbnMgYXJlOlxuICAgICAqXG4gICAgICogLSAqKmByZWxhdGl2ZWAqKiAtIHtzdHJpbmd8b2JqZWN0PX0gLSAgSWYgYHN0YXRlT3JOYW1lYCBpcyBhIHJlbGF0aXZlIHN0YXRlIHJlZmVyZW5jZSBhbmQgYG9wdGlvbnMucmVsYXRpdmVgIGlzIHNldCxcbiAgICAgKiAuaW5jbHVkZXMgd2lsbCB0ZXN0IHJlbGF0aXZlIHRvIGBvcHRpb25zLnJlbGF0aXZlYCBzdGF0ZSAob3IgbmFtZSkuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIGl0IGRvZXMgaW5jbHVkZSB0aGUgc3RhdGVcbiAgICAgKi9cbiAgICAkc3RhdGUuaW5jbHVkZXMgPSBmdW5jdGlvbiBpbmNsdWRlcyhzdGF0ZU9yTmFtZSwgcGFyYW1zLCBvcHRpb25zKSB7XG4gICAgICBvcHRpb25zID0gZXh0ZW5kKHsgcmVsYXRpdmU6ICRzdGF0ZS4kY3VycmVudCB9LCBvcHRpb25zIHx8IHt9KTtcbiAgICAgIGlmIChpc1N0cmluZyhzdGF0ZU9yTmFtZSkgJiYgaXNHbG9iKHN0YXRlT3JOYW1lKSkge1xuICAgICAgICBpZiAoIWRvZXNTdGF0ZU1hdGNoR2xvYihzdGF0ZU9yTmFtZSkpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgc3RhdGVPck5hbWUgPSAkc3RhdGUuJGN1cnJlbnQubmFtZTtcbiAgICAgIH1cblxuICAgICAgdmFyIHN0YXRlID0gZmluZFN0YXRlKHN0YXRlT3JOYW1lLCBvcHRpb25zLnJlbGF0aXZlKTtcbiAgICAgIGlmICghaXNEZWZpbmVkKHN0YXRlKSkgeyByZXR1cm4gdW5kZWZpbmVkOyB9XG4gICAgICBpZiAoIWlzRGVmaW5lZCgkc3RhdGUuJGN1cnJlbnQuaW5jbHVkZXNbc3RhdGUubmFtZV0pKSB7IHJldHVybiBmYWxzZTsgfVxuICAgICAgcmV0dXJuIHBhcmFtcyA/IGVxdWFsRm9yS2V5cyhzdGF0ZS5wYXJhbXMuJCR2YWx1ZXMocGFyYW1zKSwgJHN0YXRlUGFyYW1zLCBvYmplY3RLZXlzKHBhcmFtcykpIDogdHJ1ZTtcbiAgICB9O1xuXG5cbiAgICAvKipcbiAgICAgKiBAbmdkb2MgZnVuY3Rpb25cbiAgICAgKiBAbmFtZSB1aS5yb3V0ZXIuc3RhdGUuJHN0YXRlI2hyZWZcbiAgICAgKiBAbWV0aG9kT2YgdWkucm91dGVyLnN0YXRlLiRzdGF0ZVxuICAgICAqXG4gICAgICogQGRlc2NyaXB0aW9uXG4gICAgICogQSB1cmwgZ2VuZXJhdGlvbiBtZXRob2QgdGhhdCByZXR1cm5zIHRoZSBjb21waWxlZCB1cmwgZm9yIHRoZSBnaXZlbiBzdGF0ZSBwb3B1bGF0ZWQgd2l0aCB0aGUgZ2l2ZW4gcGFyYW1zLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiA8cHJlPlxuICAgICAqIGV4cGVjdCgkc3RhdGUuaHJlZihcImFib3V0LnBlcnNvblwiLCB7IHBlcnNvbjogXCJib2JcIiB9KSkudG9FcXVhbChcIi9hYm91dC9ib2JcIik7XG4gICAgICogPC9wcmU+XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ3xvYmplY3R9IHN0YXRlT3JOYW1lIFRoZSBzdGF0ZSBuYW1lIG9yIHN0YXRlIG9iamVjdCB5b3UnZCBsaWtlIHRvIGdlbmVyYXRlIGEgdXJsIGZyb20uXG4gICAgICogQHBhcmFtIHtvYmplY3Q9fSBwYXJhbXMgQW4gb2JqZWN0IG9mIHBhcmFtZXRlciB2YWx1ZXMgdG8gZmlsbCB0aGUgc3RhdGUncyByZXF1aXJlZCBwYXJhbWV0ZXJzLlxuICAgICAqIEBwYXJhbSB7b2JqZWN0PX0gb3B0aW9ucyBPcHRpb25zIG9iamVjdC4gVGhlIG9wdGlvbnMgYXJlOlxuICAgICAqXG4gICAgICogLSAqKmBsb3NzeWAqKiAtIHtib29sZWFuPXRydWV9IC0gIElmIHRydWUsIGFuZCBpZiB0aGVyZSBpcyBubyB1cmwgYXNzb2NpYXRlZCB3aXRoIHRoZSBzdGF0ZSBwcm92aWRlZCBpbiB0aGVcbiAgICAgKiAgICBmaXJzdCBwYXJhbWV0ZXIsIHRoZW4gdGhlIGNvbnN0cnVjdGVkIGhyZWYgdXJsIHdpbGwgYmUgYnVpbHQgZnJvbSB0aGUgZmlyc3QgbmF2aWdhYmxlIGFuY2VzdG9yIChha2FcbiAgICAgKiAgICBhbmNlc3RvciB3aXRoIGEgdmFsaWQgdXJsKS5cbiAgICAgKiAtICoqYGluaGVyaXRgKiogLSB7Ym9vbGVhbj10cnVlfSwgSWYgYHRydWVgIHdpbGwgaW5oZXJpdCB1cmwgcGFyYW1ldGVycyBmcm9tIGN1cnJlbnQgdXJsLlxuICAgICAqIC0gKipgcmVsYXRpdmVgKiogLSB7b2JqZWN0PSRzdGF0ZS4kY3VycmVudH0sIFdoZW4gdHJhbnNpdGlvbmluZyB3aXRoIHJlbGF0aXZlIHBhdGggKGUuZyAnXicpLCBcbiAgICAgKiAgICBkZWZpbmVzIHdoaWNoIHN0YXRlIHRvIGJlIHJlbGF0aXZlIGZyb20uXG4gICAgICogLSAqKmBhYnNvbHV0ZWAqKiAtIHtib29sZWFuPWZhbHNlfSwgIElmIHRydWUgd2lsbCBnZW5lcmF0ZSBhbiBhYnNvbHV0ZSB1cmwsIGUuZy4gXCJodHRwOi8vd3d3LmV4YW1wbGUuY29tL2Z1bGx1cmxcIi5cbiAgICAgKiBcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBjb21waWxlZCBzdGF0ZSB1cmxcbiAgICAgKi9cbiAgICAkc3RhdGUuaHJlZiA9IGZ1bmN0aW9uIGhyZWYoc3RhdGVPck5hbWUsIHBhcmFtcywgb3B0aW9ucykge1xuICAgICAgb3B0aW9ucyA9IGV4dGVuZCh7XG4gICAgICAgIGxvc3N5OiAgICB0cnVlLFxuICAgICAgICBpbmhlcml0OiAgdHJ1ZSxcbiAgICAgICAgYWJzb2x1dGU6IGZhbHNlLFxuICAgICAgICByZWxhdGl2ZTogJHN0YXRlLiRjdXJyZW50XG4gICAgICB9LCBvcHRpb25zIHx8IHt9KTtcblxuICAgICAgdmFyIHN0YXRlID0gZmluZFN0YXRlKHN0YXRlT3JOYW1lLCBvcHRpb25zLnJlbGF0aXZlKTtcblxuICAgICAgaWYgKCFpc0RlZmluZWQoc3RhdGUpKSByZXR1cm4gbnVsbDtcbiAgICAgIGlmIChvcHRpb25zLmluaGVyaXQpIHBhcmFtcyA9IGluaGVyaXRQYXJhbXMoJHN0YXRlUGFyYW1zLCBwYXJhbXMgfHwge30sICRzdGF0ZS4kY3VycmVudCwgc3RhdGUpO1xuICAgICAgXG4gICAgICB2YXIgbmF2ID0gKHN0YXRlICYmIG9wdGlvbnMubG9zc3kpID8gc3RhdGUubmF2aWdhYmxlIDogc3RhdGU7XG5cbiAgICAgIGlmICghbmF2IHx8IG5hdi51cmwgPT09IHVuZGVmaW5lZCB8fCBuYXYudXJsID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgcmV0dXJuICR1cmxSb3V0ZXIuaHJlZihuYXYudXJsLCBmaWx0ZXJCeUtleXMoc3RhdGUucGFyYW1zLiQka2V5cygpLCBwYXJhbXMgfHwge30pLCB7XG4gICAgICAgIGFic29sdXRlOiBvcHRpb25zLmFic29sdXRlXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQG5nZG9jIGZ1bmN0aW9uXG4gICAgICogQG5hbWUgdWkucm91dGVyLnN0YXRlLiRzdGF0ZSNnZXRcbiAgICAgKiBAbWV0aG9kT2YgdWkucm91dGVyLnN0YXRlLiRzdGF0ZVxuICAgICAqXG4gICAgICogQGRlc2NyaXB0aW9uXG4gICAgICogUmV0dXJucyB0aGUgc3RhdGUgY29uZmlndXJhdGlvbiBvYmplY3QgZm9yIGFueSBzcGVjaWZpYyBzdGF0ZSBvciBhbGwgc3RhdGVzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd8b2JqZWN0PX0gc3RhdGVPck5hbWUgKGFic29sdXRlIG9yIHJlbGF0aXZlKSBJZiBwcm92aWRlZCwgd2lsbCBvbmx5IGdldCB0aGUgY29uZmlnIGZvclxuICAgICAqIHRoZSByZXF1ZXN0ZWQgc3RhdGUuIElmIG5vdCBwcm92aWRlZCwgcmV0dXJucyBhbiBhcnJheSBvZiBBTEwgc3RhdGUgY29uZmlncy5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ3xvYmplY3Q9fSBjb250ZXh0IFdoZW4gc3RhdGVPck5hbWUgaXMgYSByZWxhdGl2ZSBzdGF0ZSByZWZlcmVuY2UsIHRoZSBzdGF0ZSB3aWxsIGJlIHJldHJpZXZlZCByZWxhdGl2ZSB0byBjb250ZXh0LlxuICAgICAqIEByZXR1cm5zIHtPYmplY3R8QXJyYXl9IFN0YXRlIGNvbmZpZ3VyYXRpb24gb2JqZWN0IG9yIGFycmF5IG9mIGFsbCBvYmplY3RzLlxuICAgICAqL1xuICAgICRzdGF0ZS5nZXQgPSBmdW5jdGlvbiAoc3RhdGVPck5hbWUsIGNvbnRleHQpIHtcbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSByZXR1cm4gbWFwKG9iamVjdEtleXMoc3RhdGVzKSwgZnVuY3Rpb24obmFtZSkgeyByZXR1cm4gc3RhdGVzW25hbWVdLnNlbGY7IH0pO1xuICAgICAgdmFyIHN0YXRlID0gZmluZFN0YXRlKHN0YXRlT3JOYW1lLCBjb250ZXh0IHx8ICRzdGF0ZS4kY3VycmVudCk7XG4gICAgICByZXR1cm4gKHN0YXRlICYmIHN0YXRlLnNlbGYpID8gc3RhdGUuc2VsZiA6IG51bGw7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHJlc29sdmVTdGF0ZShzdGF0ZSwgcGFyYW1zLCBwYXJhbXNBcmVGaWx0ZXJlZCwgaW5oZXJpdGVkLCBkc3QsIG9wdGlvbnMpIHtcbiAgICAgIC8vIE1ha2UgYSByZXN0cmljdGVkICRzdGF0ZVBhcmFtcyB3aXRoIG9ubHkgdGhlIHBhcmFtZXRlcnMgdGhhdCBhcHBseSB0byB0aGlzIHN0YXRlIGlmXG4gICAgICAvLyBuZWNlc3NhcnkuIEluIGFkZGl0aW9uIHRvIGJlaW5nIGF2YWlsYWJsZSB0byB0aGUgY29udHJvbGxlciBhbmQgb25FbnRlci9vbkV4aXQgY2FsbGJhY2tzLFxuICAgICAgLy8gd2UgYWxzbyBuZWVkICRzdGF0ZVBhcmFtcyB0byBiZSBhdmFpbGFibGUgZm9yIGFueSAkaW5qZWN0b3IgY2FsbHMgd2UgbWFrZSBkdXJpbmcgdGhlXG4gICAgICAvLyBkZXBlbmRlbmN5IHJlc29sdXRpb24gcHJvY2Vzcy5cbiAgICAgIHZhciAkc3RhdGVQYXJhbXMgPSAocGFyYW1zQXJlRmlsdGVyZWQpID8gcGFyYW1zIDogZmlsdGVyQnlLZXlzKHN0YXRlLnBhcmFtcy4kJGtleXMoKSwgcGFyYW1zKTtcbiAgICAgIHZhciBsb2NhbHMgPSB7ICRzdGF0ZVBhcmFtczogJHN0YXRlUGFyYW1zIH07XG5cbiAgICAgIC8vIFJlc29sdmUgJ2dsb2JhbCcgZGVwZW5kZW5jaWVzIGZvciB0aGUgc3RhdGUsIGkuZS4gdGhvc2Ugbm90IHNwZWNpZmljIHRvIGEgdmlldy5cbiAgICAgIC8vIFdlJ3JlIGFsc28gaW5jbHVkaW5nICRzdGF0ZVBhcmFtcyBpbiB0aGlzOyB0aGF0IHdheSB0aGUgcGFyYW1ldGVycyBhcmUgcmVzdHJpY3RlZFxuICAgICAgLy8gdG8gdGhlIHNldCB0aGF0IHNob3VsZCBiZSB2aXNpYmxlIHRvIHRoZSBzdGF0ZSwgYW5kIGFyZSBpbmRlcGVuZGVudCBvZiB3aGVuIHdlIHVwZGF0ZVxuICAgICAgLy8gdGhlIGdsb2JhbCAkc3RhdGUgYW5kICRzdGF0ZVBhcmFtcyB2YWx1ZXMuXG4gICAgICBkc3QucmVzb2x2ZSA9ICRyZXNvbHZlLnJlc29sdmUoc3RhdGUucmVzb2x2ZSwgbG9jYWxzLCBkc3QucmVzb2x2ZSwgc3RhdGUpO1xuICAgICAgdmFyIHByb21pc2VzID0gW2RzdC5yZXNvbHZlLnRoZW4oZnVuY3Rpb24gKGdsb2JhbHMpIHtcbiAgICAgICAgZHN0Lmdsb2JhbHMgPSBnbG9iYWxzO1xuICAgICAgfSldO1xuICAgICAgaWYgKGluaGVyaXRlZCkgcHJvbWlzZXMucHVzaChpbmhlcml0ZWQpO1xuXG4gICAgICAvLyBSZXNvbHZlIHRlbXBsYXRlIGFuZCBkZXBlbmRlbmNpZXMgZm9yIGFsbCB2aWV3cy5cbiAgICAgIGZvckVhY2goc3RhdGUudmlld3MsIGZ1bmN0aW9uICh2aWV3LCBuYW1lKSB7XG4gICAgICAgIHZhciBpbmplY3RhYmxlcyA9ICh2aWV3LnJlc29sdmUgJiYgdmlldy5yZXNvbHZlICE9PSBzdGF0ZS5yZXNvbHZlID8gdmlldy5yZXNvbHZlIDoge30pO1xuICAgICAgICBpbmplY3RhYmxlcy4kdGVtcGxhdGUgPSBbIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gJHZpZXcubG9hZChuYW1lLCB7IHZpZXc6IHZpZXcsIGxvY2FsczogbG9jYWxzLCBwYXJhbXM6ICRzdGF0ZVBhcmFtcywgbm90aWZ5OiBvcHRpb25zLm5vdGlmeSB9KSB8fCAnJztcbiAgICAgICAgfV07XG5cbiAgICAgICAgcHJvbWlzZXMucHVzaCgkcmVzb2x2ZS5yZXNvbHZlKGluamVjdGFibGVzLCBsb2NhbHMsIGRzdC5yZXNvbHZlLCBzdGF0ZSkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgLy8gUmVmZXJlbmNlcyB0byB0aGUgY29udHJvbGxlciAob25seSBpbnN0YW50aWF0ZWQgYXQgbGluayB0aW1lKVxuICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKHZpZXcuY29udHJvbGxlclByb3ZpZGVyKSB8fCBpc0FycmF5KHZpZXcuY29udHJvbGxlclByb3ZpZGVyKSkge1xuICAgICAgICAgICAgdmFyIGluamVjdExvY2FscyA9IGFuZ3VsYXIuZXh0ZW5kKHt9LCBpbmplY3RhYmxlcywgbG9jYWxzKTtcbiAgICAgICAgICAgIHJlc3VsdC4kJGNvbnRyb2xsZXIgPSAkaW5qZWN0b3IuaW52b2tlKHZpZXcuY29udHJvbGxlclByb3ZpZGVyLCBudWxsLCBpbmplY3RMb2NhbHMpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHQuJCRjb250cm9sbGVyID0gdmlldy5jb250cm9sbGVyO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBQcm92aWRlIGFjY2VzcyB0byB0aGUgc3RhdGUgaXRzZWxmIGZvciBpbnRlcm5hbCB1c2VcbiAgICAgICAgICByZXN1bHQuJCRzdGF0ZSA9IHN0YXRlO1xuICAgICAgICAgIHJlc3VsdC4kJGNvbnRyb2xsZXJBcyA9IHZpZXcuY29udHJvbGxlckFzO1xuICAgICAgICAgIGRzdFtuYW1lXSA9IHJlc3VsdDtcbiAgICAgICAgfSkpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIFdhaXQgZm9yIGFsbCB0aGUgcHJvbWlzZXMgYW5kIHRoZW4gcmV0dXJuIHRoZSBhY3RpdmF0aW9uIG9iamVjdFxuICAgICAgcmV0dXJuICRxLmFsbChwcm9taXNlcykudGhlbihmdW5jdGlvbiAodmFsdWVzKSB7XG4gICAgICAgIHJldHVybiBkc3Q7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gJHN0YXRlO1xuICB9XG5cbiAgZnVuY3Rpb24gc2hvdWxkVHJpZ2dlclJlbG9hZCh0bywgZnJvbSwgbG9jYWxzLCBvcHRpb25zKSB7XG4gICAgaWYgKHRvID09PSBmcm9tICYmICgobG9jYWxzID09PSBmcm9tLmxvY2FscyAmJiAhb3B0aW9ucy5yZWxvYWQpIHx8ICh0by5zZWxmLnJlbG9hZE9uU2VhcmNoID09PSBmYWxzZSkpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbn1cblxuYW5ndWxhci5tb2R1bGUoJ3VpLnJvdXRlci5zdGF0ZScpXG4gIC52YWx1ZSgnJHN0YXRlUGFyYW1zJywge30pXG4gIC5wcm92aWRlcignJHN0YXRlJywgJFN0YXRlUHJvdmlkZXIpO1xuXG5cbiRWaWV3UHJvdmlkZXIuJGluamVjdCA9IFtdO1xuZnVuY3Rpb24gJFZpZXdQcm92aWRlcigpIHtcblxuICB0aGlzLiRnZXQgPSAkZ2V0O1xuICAvKipcbiAgICogQG5nZG9jIG9iamVjdFxuICAgKiBAbmFtZSB1aS5yb3V0ZXIuc3RhdGUuJHZpZXdcbiAgICpcbiAgICogQHJlcXVpcmVzIHVpLnJvdXRlci51dGlsLiR0ZW1wbGF0ZUZhY3RvcnlcbiAgICogQHJlcXVpcmVzICRyb290U2NvcGVcbiAgICpcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqXG4gICAqL1xuICAkZ2V0LiRpbmplY3QgPSBbJyRyb290U2NvcGUnLCAnJHRlbXBsYXRlRmFjdG9yeSddO1xuICBmdW5jdGlvbiAkZ2V0KCAgICRyb290U2NvcGUsICAgJHRlbXBsYXRlRmFjdG9yeSkge1xuICAgIHJldHVybiB7XG4gICAgICAvLyAkdmlldy5sb2FkKCdmdWxsLnZpZXdOYW1lJywgeyB0ZW1wbGF0ZTogLi4uLCBjb250cm9sbGVyOiAuLi4sIHJlc29sdmU6IC4uLiwgYXN5bmM6IGZhbHNlLCBwYXJhbXM6IC4uLiB9KVxuICAgICAgLyoqXG4gICAgICAgKiBAbmdkb2MgZnVuY3Rpb25cbiAgICAgICAqIEBuYW1lIHVpLnJvdXRlci5zdGF0ZS4kdmlldyNsb2FkXG4gICAgICAgKiBAbWV0aG9kT2YgdWkucm91dGVyLnN0YXRlLiR2aWV3XG4gICAgICAgKlxuICAgICAgICogQGRlc2NyaXB0aW9uXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgbmFtZVxuICAgICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgb3B0aW9uIG9iamVjdC5cbiAgICAgICAqL1xuICAgICAgbG9hZDogZnVuY3Rpb24gbG9hZChuYW1lLCBvcHRpb25zKSB7XG4gICAgICAgIHZhciByZXN1bHQsIGRlZmF1bHRzID0ge1xuICAgICAgICAgIHRlbXBsYXRlOiBudWxsLCBjb250cm9sbGVyOiBudWxsLCB2aWV3OiBudWxsLCBsb2NhbHM6IG51bGwsIG5vdGlmeTogdHJ1ZSwgYXN5bmM6IHRydWUsIHBhcmFtczoge31cbiAgICAgICAgfTtcbiAgICAgICAgb3B0aW9ucyA9IGV4dGVuZChkZWZhdWx0cywgb3B0aW9ucyk7XG5cbiAgICAgICAgaWYgKG9wdGlvbnMudmlldykge1xuICAgICAgICAgIHJlc3VsdCA9ICR0ZW1wbGF0ZUZhY3RvcnkuZnJvbUNvbmZpZyhvcHRpb25zLnZpZXcsIG9wdGlvbnMucGFyYW1zLCBvcHRpb25zLmxvY2Fscyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlc3VsdCAmJiBvcHRpb25zLm5vdGlmeSkge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG5nZG9jIGV2ZW50XG4gICAgICAgICAqIEBuYW1lIHVpLnJvdXRlci5zdGF0ZS4kc3RhdGUjJHZpZXdDb250ZW50TG9hZGluZ1xuICAgICAgICAgKiBAZXZlbnRPZiB1aS5yb3V0ZXIuc3RhdGUuJHZpZXdcbiAgICAgICAgICogQGV2ZW50VHlwZSBicm9hZGNhc3Qgb24gcm9vdCBzY29wZVxuICAgICAgICAgKiBAZGVzY3JpcHRpb25cbiAgICAgICAgICpcbiAgICAgICAgICogRmlyZWQgb25jZSB0aGUgdmlldyAqKmJlZ2lucyBsb2FkaW5nKiosICpiZWZvcmUqIHRoZSBET00gaXMgcmVuZGVyZWQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCBFdmVudCBvYmplY3QuXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSB2aWV3Q29uZmlnIFRoZSB2aWV3IGNvbmZpZyBwcm9wZXJ0aWVzICh0ZW1wbGF0ZSwgY29udHJvbGxlciwgZXRjKS5cbiAgICAgICAgICpcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICpcbiAgICAgICAgICogPHByZT5cbiAgICAgICAgICogJHNjb3BlLiRvbignJHZpZXdDb250ZW50TG9hZGluZycsXG4gICAgICAgICAqIGZ1bmN0aW9uKGV2ZW50LCB2aWV3Q29uZmlnKXtcbiAgICAgICAgICogICAgIC8vIEFjY2VzcyB0byBhbGwgdGhlIHZpZXcgY29uZmlnIHByb3BlcnRpZXMuXG4gICAgICAgICAqICAgICAvLyBhbmQgb25lIHNwZWNpYWwgcHJvcGVydHkgJ3RhcmdldFZpZXcnXG4gICAgICAgICAqICAgICAvLyB2aWV3Q29uZmlnLnRhcmdldFZpZXdcbiAgICAgICAgICogfSk7XG4gICAgICAgICAqIDwvcHJlPlxuICAgICAgICAgKi9cbiAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJyR2aWV3Q29udGVudExvYWRpbmcnLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuICAgIH07XG4gIH1cbn1cblxuYW5ndWxhci5tb2R1bGUoJ3VpLnJvdXRlci5zdGF0ZScpLnByb3ZpZGVyKCckdmlldycsICRWaWV3UHJvdmlkZXIpO1xuXG4vKipcbiAqIEBuZ2RvYyBvYmplY3RcbiAqIEBuYW1lIHVpLnJvdXRlci5zdGF0ZS4kdWlWaWV3U2Nyb2xsUHJvdmlkZXJcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFByb3ZpZGVyIHRoYXQgcmV0dXJucyB0aGUge0BsaW5rIHVpLnJvdXRlci5zdGF0ZS4kdWlWaWV3U2Nyb2xsfSBzZXJ2aWNlIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiAkVmlld1Njcm9sbFByb3ZpZGVyKCkge1xuXG4gIHZhciB1c2VBbmNob3JTY3JvbGwgPSBmYWxzZTtcblxuICAvKipcbiAgICogQG5nZG9jIGZ1bmN0aW9uXG4gICAqIEBuYW1lIHVpLnJvdXRlci5zdGF0ZS4kdWlWaWV3U2Nyb2xsUHJvdmlkZXIjdXNlQW5jaG9yU2Nyb2xsXG4gICAqIEBtZXRob2RPZiB1aS5yb3V0ZXIuc3RhdGUuJHVpVmlld1Njcm9sbFByb3ZpZGVyXG4gICAqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBSZXZlcnRzIGJhY2sgdG8gdXNpbmcgdGhlIGNvcmUgW2AkYW5jaG9yU2Nyb2xsYF0oaHR0cDovL2RvY3MuYW5ndWxhcmpzLm9yZy9hcGkvbmcuJGFuY2hvclNjcm9sbCkgc2VydmljZSBmb3JcbiAgICogc2Nyb2xsaW5nIGJhc2VkIG9uIHRoZSB1cmwgYW5jaG9yLlxuICAgKi9cbiAgdGhpcy51c2VBbmNob3JTY3JvbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgdXNlQW5jaG9yU2Nyb2xsID0gdHJ1ZTtcbiAgfTtcblxuICAvKipcbiAgICogQG5nZG9jIG9iamVjdFxuICAgKiBAbmFtZSB1aS5yb3V0ZXIuc3RhdGUuJHVpVmlld1Njcm9sbFxuICAgKlxuICAgKiBAcmVxdWlyZXMgJGFuY2hvclNjcm9sbFxuICAgKiBAcmVxdWlyZXMgJHRpbWVvdXRcbiAgICpcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIFdoZW4gY2FsbGVkIHdpdGggYSBqcUxpdGUgZWxlbWVudCwgaXQgc2Nyb2xscyB0aGUgZWxlbWVudCBpbnRvIHZpZXcgKGFmdGVyIGFcbiAgICogYCR0aW1lb3V0YCBzbyB0aGUgRE9NIGhhcyB0aW1lIHRvIHJlZnJlc2gpLlxuICAgKlxuICAgKiBJZiB5b3UgcHJlZmVyIHRvIHJlbHkgb24gYCRhbmNob3JTY3JvbGxgIHRvIHNjcm9sbCB0aGUgdmlldyB0byB0aGUgYW5jaG9yLFxuICAgKiB0aGlzIGNhbiBiZSBlbmFibGVkIGJ5IGNhbGxpbmcge0BsaW5rIHVpLnJvdXRlci5zdGF0ZS4kdWlWaWV3U2Nyb2xsUHJvdmlkZXIjbWV0aG9kc191c2VBbmNob3JTY3JvbGwgYCR1aVZpZXdTY3JvbGxQcm92aWRlci51c2VBbmNob3JTY3JvbGwoKWB9LlxuICAgKi9cbiAgdGhpcy4kZ2V0ID0gWyckYW5jaG9yU2Nyb2xsJywgJyR0aW1lb3V0JywgZnVuY3Rpb24gKCRhbmNob3JTY3JvbGwsICR0aW1lb3V0KSB7XG4gICAgaWYgKHVzZUFuY2hvclNjcm9sbCkge1xuICAgICAgcmV0dXJuICRhbmNob3JTY3JvbGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgkZWxlbWVudCkge1xuICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAkZWxlbWVudFswXS5zY3JvbGxJbnRvVmlldygpO1xuICAgICAgfSwgMCwgZmFsc2UpO1xuICAgIH07XG4gIH1dO1xufVxuXG5hbmd1bGFyLm1vZHVsZSgndWkucm91dGVyLnN0YXRlJykucHJvdmlkZXIoJyR1aVZpZXdTY3JvbGwnLCAkVmlld1Njcm9sbFByb3ZpZGVyKTtcblxuLyoqXG4gKiBAbmdkb2MgZGlyZWN0aXZlXG4gKiBAbmFtZSB1aS5yb3V0ZXIuc3RhdGUuZGlyZWN0aXZlOnVpLXZpZXdcbiAqXG4gKiBAcmVxdWlyZXMgdWkucm91dGVyLnN0YXRlLiRzdGF0ZVxuICogQHJlcXVpcmVzICRjb21waWxlXG4gKiBAcmVxdWlyZXMgJGNvbnRyb2xsZXJcbiAqIEByZXF1aXJlcyAkaW5qZWN0b3JcbiAqIEByZXF1aXJlcyB1aS5yb3V0ZXIuc3RhdGUuJHVpVmlld1Njcm9sbFxuICogQHJlcXVpcmVzICRkb2N1bWVudFxuICpcbiAqIEByZXN0cmljdCBFQ0FcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFRoZSB1aS12aWV3IGRpcmVjdGl2ZSB0ZWxscyAkc3RhdGUgd2hlcmUgdG8gcGxhY2UgeW91ciB0ZW1wbGF0ZXMuXG4gKlxuICogQHBhcmFtIHtzdHJpbmc9fSBuYW1lIEEgdmlldyBuYW1lLiBUaGUgbmFtZSBzaG91bGQgYmUgdW5pcXVlIGFtb25nc3QgdGhlIG90aGVyIHZpZXdzIGluIHRoZVxuICogc2FtZSBzdGF0ZS4gWW91IGNhbiBoYXZlIHZpZXdzIG9mIHRoZSBzYW1lIG5hbWUgdGhhdCBsaXZlIGluIGRpZmZlcmVudCBzdGF0ZXMuXG4gKlxuICogQHBhcmFtIHtzdHJpbmc9fSBhdXRvc2Nyb2xsIEl0IGFsbG93cyB5b3UgdG8gc2V0IHRoZSBzY3JvbGwgYmVoYXZpb3Igb2YgdGhlIGJyb3dzZXIgd2luZG93XG4gKiB3aGVuIGEgdmlldyBpcyBwb3B1bGF0ZWQuIEJ5IGRlZmF1bHQsICRhbmNob3JTY3JvbGwgaXMgb3ZlcnJpZGRlbiBieSB1aS1yb3V0ZXIncyBjdXN0b20gc2Nyb2xsXG4gKiBzZXJ2aWNlLCB7QGxpbmsgdWkucm91dGVyLnN0YXRlLiR1aVZpZXdTY3JvbGx9LiBUaGlzIGN1c3RvbSBzZXJ2aWNlIGxldCdzIHlvdVxuICogc2Nyb2xsIHVpLXZpZXcgZWxlbWVudHMgaW50byB2aWV3IHdoZW4gdGhleSBhcmUgcG9wdWxhdGVkIGR1cmluZyBhIHN0YXRlIGFjdGl2YXRpb24uXG4gKlxuICogKk5vdGU6IFRvIHJldmVydCBiYWNrIHRvIG9sZCBbYCRhbmNob3JTY3JvbGxgXShodHRwOi8vZG9jcy5hbmd1bGFyanMub3JnL2FwaS9uZy4kYW5jaG9yU2Nyb2xsKVxuICogZnVuY3Rpb25hbGl0eSwgY2FsbCBgJHVpVmlld1Njcm9sbFByb3ZpZGVyLnVzZUFuY2hvclNjcm9sbCgpYC4qXG4gKlxuICogQHBhcmFtIHtzdHJpbmc9fSBvbmxvYWQgRXhwcmVzc2lvbiB0byBldmFsdWF0ZSB3aGVuZXZlciB0aGUgdmlldyB1cGRhdGVzLlxuICogXG4gKiBAZXhhbXBsZVxuICogQSB2aWV3IGNhbiBiZSB1bm5hbWVkIG9yIG5hbWVkLiBcbiAqIDxwcmU+XG4gKiA8IS0tIFVubmFtZWQgLS0+XG4gKiA8ZGl2IHVpLXZpZXc+PC9kaXY+IFxuICogXG4gKiA8IS0tIE5hbWVkIC0tPlxuICogPGRpdiB1aS12aWV3PVwidmlld05hbWVcIj48L2Rpdj5cbiAqIDwvcHJlPlxuICpcbiAqIFlvdSBjYW4gb25seSBoYXZlIG9uZSB1bm5hbWVkIHZpZXcgd2l0aGluIGFueSB0ZW1wbGF0ZSAob3Igcm9vdCBodG1sKS4gSWYgeW91IGFyZSBvbmx5IHVzaW5nIGEgXG4gKiBzaW5nbGUgdmlldyBhbmQgaXQgaXMgdW5uYW1lZCB0aGVuIHlvdSBjYW4gcG9wdWxhdGUgaXQgbGlrZSBzbzpcbiAqIDxwcmU+XG4gKiA8ZGl2IHVpLXZpZXc+PC9kaXY+IFxuICogJHN0YXRlUHJvdmlkZXIuc3RhdGUoXCJob21lXCIsIHtcbiAqICAgdGVtcGxhdGU6IFwiPGgxPkhFTExPITwvaDE+XCJcbiAqIH0pXG4gKiA8L3ByZT5cbiAqIFxuICogVGhlIGFib3ZlIGlzIGEgY29udmVuaWVudCBzaG9ydGN1dCBlcXVpdmFsZW50IHRvIHNwZWNpZnlpbmcgeW91ciB2aWV3IGV4cGxpY2l0bHkgd2l0aCB0aGUge0BsaW5rIHVpLnJvdXRlci5zdGF0ZS4kc3RhdGVQcm92aWRlciN2aWV3cyBgdmlld3NgfVxuICogY29uZmlnIHByb3BlcnR5LCBieSBuYW1lLCBpbiB0aGlzIGNhc2UgYW4gZW1wdHkgbmFtZTpcbiAqIDxwcmU+XG4gKiAkc3RhdGVQcm92aWRlci5zdGF0ZShcImhvbWVcIiwge1xuICogICB2aWV3czoge1xuICogICAgIFwiXCI6IHtcbiAqICAgICAgIHRlbXBsYXRlOiBcIjxoMT5IRUxMTyE8L2gxPlwiXG4gKiAgICAgfVxuICogICB9ICAgIFxuICogfSlcbiAqIDwvcHJlPlxuICogXG4gKiBCdXQgdHlwaWNhbGx5IHlvdSdsbCBvbmx5IHVzZSB0aGUgdmlld3MgcHJvcGVydHkgaWYgeW91IG5hbWUgeW91ciB2aWV3IG9yIGhhdmUgbW9yZSB0aGFuIG9uZSB2aWV3IFxuICogaW4gdGhlIHNhbWUgdGVtcGxhdGUuIFRoZXJlJ3Mgbm90IHJlYWxseSBhIGNvbXBlbGxpbmcgcmVhc29uIHRvIG5hbWUgYSB2aWV3IGlmIGl0cyB0aGUgb25seSBvbmUsIFxuICogYnV0IHlvdSBjb3VsZCBpZiB5b3Ugd2FudGVkLCBsaWtlIHNvOlxuICogPHByZT5cbiAqIDxkaXYgdWktdmlldz1cIm1haW5cIj48L2Rpdj5cbiAqIDwvcHJlPiBcbiAqIDxwcmU+XG4gKiAkc3RhdGVQcm92aWRlci5zdGF0ZShcImhvbWVcIiwge1xuICogICB2aWV3czoge1xuICogICAgIFwibWFpblwiOiB7XG4gKiAgICAgICB0ZW1wbGF0ZTogXCI8aDE+SEVMTE8hPC9oMT5cIlxuICogICAgIH1cbiAqICAgfSAgICBcbiAqIH0pXG4gKiA8L3ByZT5cbiAqIFxuICogUmVhbGx5IHRob3VnaCwgeW91J2xsIHVzZSB2aWV3cyB0byBzZXQgdXAgbXVsdGlwbGUgdmlld3M6XG4gKiA8cHJlPlxuICogPGRpdiB1aS12aWV3PjwvZGl2PlxuICogPGRpdiB1aS12aWV3PVwiY2hhcnRcIj48L2Rpdj4gXG4gKiA8ZGl2IHVpLXZpZXc9XCJkYXRhXCI+PC9kaXY+IFxuICogPC9wcmU+XG4gKiBcbiAqIDxwcmU+XG4gKiAkc3RhdGVQcm92aWRlci5zdGF0ZShcImhvbWVcIiwge1xuICogICB2aWV3czoge1xuICogICAgIFwiXCI6IHtcbiAqICAgICAgIHRlbXBsYXRlOiBcIjxoMT5IRUxMTyE8L2gxPlwiXG4gKiAgICAgfSxcbiAqICAgICBcImNoYXJ0XCI6IHtcbiAqICAgICAgIHRlbXBsYXRlOiBcIjxjaGFydF90aGluZy8+XCJcbiAqICAgICB9LFxuICogICAgIFwiZGF0YVwiOiB7XG4gKiAgICAgICB0ZW1wbGF0ZTogXCI8ZGF0YV90aGluZy8+XCJcbiAqICAgICB9XG4gKiAgIH0gICAgXG4gKiB9KVxuICogPC9wcmU+XG4gKlxuICogRXhhbXBsZXMgZm9yIGBhdXRvc2Nyb2xsYDpcbiAqXG4gKiA8cHJlPlxuICogPCEtLSBJZiBhdXRvc2Nyb2xsIHByZXNlbnQgd2l0aCBubyBleHByZXNzaW9uLFxuICogICAgICB0aGVuIHNjcm9sbCB1aS12aWV3IGludG8gdmlldyAtLT5cbiAqIDx1aS12aWV3IGF1dG9zY3JvbGwvPlxuICpcbiAqIDwhLS0gSWYgYXV0b3Njcm9sbCBwcmVzZW50IHdpdGggdmFsaWQgZXhwcmVzc2lvbixcbiAqICAgICAgdGhlbiBzY3JvbGwgdWktdmlldyBpbnRvIHZpZXcgaWYgZXhwcmVzc2lvbiBldmFsdWF0ZXMgdG8gdHJ1ZSAtLT5cbiAqIDx1aS12aWV3IGF1dG9zY3JvbGw9J3RydWUnLz5cbiAqIDx1aS12aWV3IGF1dG9zY3JvbGw9J2ZhbHNlJy8+XG4gKiA8dWktdmlldyBhdXRvc2Nyb2xsPSdzY29wZVZhcmlhYmxlJy8+XG4gKiA8L3ByZT5cbiAqL1xuJFZpZXdEaXJlY3RpdmUuJGluamVjdCA9IFsnJHN0YXRlJywgJyRpbmplY3RvcicsICckdWlWaWV3U2Nyb2xsJywgJyRpbnRlcnBvbGF0ZSddO1xuZnVuY3Rpb24gJFZpZXdEaXJlY3RpdmUoICAgJHN0YXRlLCAgICRpbmplY3RvciwgICAkdWlWaWV3U2Nyb2xsLCAgICRpbnRlcnBvbGF0ZSkge1xuXG4gIGZ1bmN0aW9uIGdldFNlcnZpY2UoKSB7XG4gICAgcmV0dXJuICgkaW5qZWN0b3IuaGFzKSA/IGZ1bmN0aW9uKHNlcnZpY2UpIHtcbiAgICAgIHJldHVybiAkaW5qZWN0b3IuaGFzKHNlcnZpY2UpID8gJGluamVjdG9yLmdldChzZXJ2aWNlKSA6IG51bGw7XG4gICAgfSA6IGZ1bmN0aW9uKHNlcnZpY2UpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiAkaW5qZWN0b3IuZ2V0KHNlcnZpY2UpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgdmFyIHNlcnZpY2UgPSBnZXRTZXJ2aWNlKCksXG4gICAgICAkYW5pbWF0b3IgPSBzZXJ2aWNlKCckYW5pbWF0b3InKSxcbiAgICAgICRhbmltYXRlID0gc2VydmljZSgnJGFuaW1hdGUnKTtcblxuICAvLyBSZXR1cm5zIGEgc2V0IG9mIERPTSBtYW5pcHVsYXRpb24gZnVuY3Rpb25zIGJhc2VkIG9uIHdoaWNoIEFuZ3VsYXIgdmVyc2lvblxuICAvLyBpdCBzaG91bGQgdXNlXG4gIGZ1bmN0aW9uIGdldFJlbmRlcmVyKGF0dHJzLCBzY29wZSkge1xuICAgIHZhciBzdGF0aWNzID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBlbnRlcjogZnVuY3Rpb24gKGVsZW1lbnQsIHRhcmdldCwgY2IpIHsgdGFyZ2V0LmFmdGVyKGVsZW1lbnQpOyBjYigpOyB9LFxuICAgICAgICBsZWF2ZTogZnVuY3Rpb24gKGVsZW1lbnQsIGNiKSB7IGVsZW1lbnQucmVtb3ZlKCk7IGNiKCk7IH1cbiAgICAgIH07XG4gICAgfTtcblxuICAgIGlmICgkYW5pbWF0ZSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZW50ZXI6IGZ1bmN0aW9uKGVsZW1lbnQsIHRhcmdldCwgY2IpIHtcbiAgICAgICAgICB2YXIgcHJvbWlzZSA9ICRhbmltYXRlLmVudGVyKGVsZW1lbnQsIG51bGwsIHRhcmdldCwgY2IpO1xuICAgICAgICAgIGlmIChwcm9taXNlICYmIHByb21pc2UudGhlbikgcHJvbWlzZS50aGVuKGNiKTtcbiAgICAgICAgfSxcbiAgICAgICAgbGVhdmU6IGZ1bmN0aW9uKGVsZW1lbnQsIGNiKSB7XG4gICAgICAgICAgdmFyIHByb21pc2UgPSAkYW5pbWF0ZS5sZWF2ZShlbGVtZW50LCBjYik7XG4gICAgICAgICAgaWYgKHByb21pc2UgJiYgcHJvbWlzZS50aGVuKSBwcm9taXNlLnRoZW4oY2IpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmICgkYW5pbWF0b3IpIHtcbiAgICAgIHZhciBhbmltYXRlID0gJGFuaW1hdG9yICYmICRhbmltYXRvcihzY29wZSwgYXR0cnMpO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBlbnRlcjogZnVuY3Rpb24oZWxlbWVudCwgdGFyZ2V0LCBjYikge2FuaW1hdGUuZW50ZXIoZWxlbWVudCwgbnVsbCwgdGFyZ2V0KTsgY2IoKTsgfSxcbiAgICAgICAgbGVhdmU6IGZ1bmN0aW9uKGVsZW1lbnQsIGNiKSB7IGFuaW1hdGUubGVhdmUoZWxlbWVudCk7IGNiKCk7IH1cbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0YXRpY3MoKTtcbiAgfVxuXG4gIHZhciBkaXJlY3RpdmUgPSB7XG4gICAgcmVzdHJpY3Q6ICdFQ0EnLFxuICAgIHRlcm1pbmFsOiB0cnVlLFxuICAgIHByaW9yaXR5OiA0MDAsXG4gICAgdHJhbnNjbHVkZTogJ2VsZW1lbnQnLFxuICAgIGNvbXBpbGU6IGZ1bmN0aW9uICh0RWxlbWVudCwgdEF0dHJzLCAkdHJhbnNjbHVkZSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzY29wZSwgJGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHZhciBwcmV2aW91c0VsLCBjdXJyZW50RWwsIGN1cnJlbnRTY29wZSwgbGF0ZXN0TG9jYWxzLFxuICAgICAgICAgICAgb25sb2FkRXhwICAgICA9IGF0dHJzLm9ubG9hZCB8fCAnJyxcbiAgICAgICAgICAgIGF1dG9TY3JvbGxFeHAgPSBhdHRycy5hdXRvc2Nyb2xsLFxuICAgICAgICAgICAgcmVuZGVyZXIgICAgICA9IGdldFJlbmRlcmVyKGF0dHJzLCBzY29wZSk7XG5cbiAgICAgICAgc2NvcGUuJG9uKCckc3RhdGVDaGFuZ2VTdWNjZXNzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdXBkYXRlVmlldyhmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBzY29wZS4kb24oJyR2aWV3Q29udGVudExvYWRpbmcnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICB1cGRhdGVWaWV3KGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdXBkYXRlVmlldyh0cnVlKTtcblxuICAgICAgICBmdW5jdGlvbiBjbGVhbnVwTGFzdFZpZXcoKSB7XG4gICAgICAgICAgaWYgKHByZXZpb3VzRWwpIHtcbiAgICAgICAgICAgIHByZXZpb3VzRWwucmVtb3ZlKCk7XG4gICAgICAgICAgICBwcmV2aW91c0VsID0gbnVsbDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoY3VycmVudFNjb3BlKSB7XG4gICAgICAgICAgICBjdXJyZW50U2NvcGUuJGRlc3Ryb3koKTtcbiAgICAgICAgICAgIGN1cnJlbnRTY29wZSA9IG51bGw7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGN1cnJlbnRFbCkge1xuICAgICAgICAgICAgcmVuZGVyZXIubGVhdmUoY3VycmVudEVsLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcHJldmlvdXNFbCA9IG51bGw7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcHJldmlvdXNFbCA9IGN1cnJlbnRFbDtcbiAgICAgICAgICAgIGN1cnJlbnRFbCA9IG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlVmlldyhmaXJzdFRpbWUpIHtcbiAgICAgICAgICB2YXIgbmV3U2NvcGUsXG4gICAgICAgICAgICAgIG5hbWUgICAgICAgICAgICA9IGdldFVpVmlld05hbWUoc2NvcGUsIGF0dHJzLCAkZWxlbWVudCwgJGludGVycG9sYXRlKSxcbiAgICAgICAgICAgICAgcHJldmlvdXNMb2NhbHMgID0gbmFtZSAmJiAkc3RhdGUuJGN1cnJlbnQgJiYgJHN0YXRlLiRjdXJyZW50LmxvY2Fsc1tuYW1lXTtcblxuICAgICAgICAgIGlmICghZmlyc3RUaW1lICYmIHByZXZpb3VzTG9jYWxzID09PSBsYXRlc3RMb2NhbHMpIHJldHVybjsgLy8gbm90aGluZyB0byBkb1xuICAgICAgICAgIG5ld1Njb3BlID0gc2NvcGUuJG5ldygpO1xuICAgICAgICAgIGxhdGVzdExvY2FscyA9ICRzdGF0ZS4kY3VycmVudC5sb2NhbHNbbmFtZV07XG5cbiAgICAgICAgICB2YXIgY2xvbmUgPSAkdHJhbnNjbHVkZShuZXdTY29wZSwgZnVuY3Rpb24oY2xvbmUpIHtcbiAgICAgICAgICAgIHJlbmRlcmVyLmVudGVyKGNsb25lLCAkZWxlbWVudCwgZnVuY3Rpb24gb25VaVZpZXdFbnRlcigpIHtcbiAgICAgICAgICAgICAgaWYoY3VycmVudFNjb3BlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFNjb3BlLiRlbWl0KCckdmlld0NvbnRlbnRBbmltYXRpb25FbmRlZCcpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKGF1dG9TY3JvbGxFeHApICYmICFhdXRvU2Nyb2xsRXhwIHx8IHNjb3BlLiRldmFsKGF1dG9TY3JvbGxFeHApKSB7XG4gICAgICAgICAgICAgICAgJHVpVmlld1Njcm9sbChjbG9uZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY2xlYW51cExhc3RWaWV3KCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBjdXJyZW50RWwgPSBjbG9uZTtcbiAgICAgICAgICBjdXJyZW50U2NvcGUgPSBuZXdTY29wZTtcbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBAbmdkb2MgZXZlbnRcbiAgICAgICAgICAgKiBAbmFtZSB1aS5yb3V0ZXIuc3RhdGUuZGlyZWN0aXZlOnVpLXZpZXcjJHZpZXdDb250ZW50TG9hZGVkXG4gICAgICAgICAgICogQGV2ZW50T2YgdWkucm91dGVyLnN0YXRlLmRpcmVjdGl2ZTp1aS12aWV3XG4gICAgICAgICAgICogQGV2ZW50VHlwZSBlbWl0cyBvbiB1aS12aWV3IGRpcmVjdGl2ZSBzY29wZVxuICAgICAgICAgICAqIEBkZXNjcmlwdGlvbiAgICAgICAgICAgKlxuICAgICAgICAgICAqIEZpcmVkIG9uY2UgdGhlIHZpZXcgaXMgKipsb2FkZWQqKiwgKmFmdGVyKiB0aGUgRE9NIGlzIHJlbmRlcmVkLlxuICAgICAgICAgICAqXG4gICAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50IEV2ZW50IG9iamVjdC5cbiAgICAgICAgICAgKi9cbiAgICAgICAgICBjdXJyZW50U2NvcGUuJGVtaXQoJyR2aWV3Q29udGVudExvYWRlZCcpO1xuICAgICAgICAgIGN1cnJlbnRTY29wZS4kZXZhbChvbmxvYWRFeHApO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gZGlyZWN0aXZlO1xufVxuXG4kVmlld0RpcmVjdGl2ZUZpbGwuJGluamVjdCA9IFsnJGNvbXBpbGUnLCAnJGNvbnRyb2xsZXInLCAnJHN0YXRlJywgJyRpbnRlcnBvbGF0ZSddO1xuZnVuY3Rpb24gJFZpZXdEaXJlY3RpdmVGaWxsICggICRjb21waWxlLCAgICRjb250cm9sbGVyLCAgICRzdGF0ZSwgICAkaW50ZXJwb2xhdGUpIHtcbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogJ0VDQScsXG4gICAgcHJpb3JpdHk6IC00MDAsXG4gICAgY29tcGlsZTogZnVuY3Rpb24gKHRFbGVtZW50KSB7XG4gICAgICB2YXIgaW5pdGlhbCA9IHRFbGVtZW50Lmh0bWwoKTtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoc2NvcGUsICRlbGVtZW50LCBhdHRycykge1xuICAgICAgICB2YXIgY3VycmVudCA9ICRzdGF0ZS4kY3VycmVudCxcbiAgICAgICAgICAgIG5hbWUgPSBnZXRVaVZpZXdOYW1lKHNjb3BlLCBhdHRycywgJGVsZW1lbnQsICRpbnRlcnBvbGF0ZSksXG4gICAgICAgICAgICBsb2NhbHMgID0gY3VycmVudCAmJiBjdXJyZW50LmxvY2Fsc1tuYW1lXTtcblxuICAgICAgICBpZiAoISBsb2NhbHMpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAkZWxlbWVudC5kYXRhKCckdWlWaWV3JywgeyBuYW1lOiBuYW1lLCBzdGF0ZTogbG9jYWxzLiQkc3RhdGUgfSk7XG4gICAgICAgICRlbGVtZW50Lmh0bWwobG9jYWxzLiR0ZW1wbGF0ZSA/IGxvY2Fscy4kdGVtcGxhdGUgOiBpbml0aWFsKTtcblxuICAgICAgICB2YXIgbGluayA9ICRjb21waWxlKCRlbGVtZW50LmNvbnRlbnRzKCkpO1xuXG4gICAgICAgIGlmIChsb2NhbHMuJCRjb250cm9sbGVyKSB7XG4gICAgICAgICAgbG9jYWxzLiRzY29wZSA9IHNjb3BlO1xuICAgICAgICAgIHZhciBjb250cm9sbGVyID0gJGNvbnRyb2xsZXIobG9jYWxzLiQkY29udHJvbGxlciwgbG9jYWxzKTtcbiAgICAgICAgICBpZiAobG9jYWxzLiQkY29udHJvbGxlckFzKSB7XG4gICAgICAgICAgICBzY29wZVtsb2NhbHMuJCRjb250cm9sbGVyQXNdID0gY29udHJvbGxlcjtcbiAgICAgICAgICB9XG4gICAgICAgICAgJGVsZW1lbnQuZGF0YSgnJG5nQ29udHJvbGxlckNvbnRyb2xsZXInLCBjb250cm9sbGVyKTtcbiAgICAgICAgICAkZWxlbWVudC5jaGlsZHJlbigpLmRhdGEoJyRuZ0NvbnRyb2xsZXJDb250cm9sbGVyJywgY29udHJvbGxlcik7XG4gICAgICAgIH1cblxuICAgICAgICBsaW5rKHNjb3BlKTtcbiAgICAgIH07XG4gICAgfVxuICB9O1xufVxuXG4vKipcbiAqIFNoYXJlZCB1aS12aWV3IGNvZGUgZm9yIGJvdGggZGlyZWN0aXZlczpcbiAqIEdpdmVuIHNjb3BlLCBlbGVtZW50LCBhbmQgaXRzIGF0dHJpYnV0ZXMsIHJldHVybiB0aGUgdmlldydzIG5hbWVcbiAqL1xuZnVuY3Rpb24gZ2V0VWlWaWV3TmFtZShzY29wZSwgYXR0cnMsIGVsZW1lbnQsICRpbnRlcnBvbGF0ZSkge1xuICB2YXIgbmFtZSA9ICRpbnRlcnBvbGF0ZShhdHRycy51aVZpZXcgfHwgYXR0cnMubmFtZSB8fCAnJykoc2NvcGUpO1xuICB2YXIgaW5oZXJpdGVkID0gZWxlbWVudC5pbmhlcml0ZWREYXRhKCckdWlWaWV3Jyk7XG4gIHJldHVybiBuYW1lLmluZGV4T2YoJ0AnKSA+PSAwID8gIG5hbWUgOiAgKG5hbWUgKyAnQCcgKyAoaW5oZXJpdGVkID8gaW5oZXJpdGVkLnN0YXRlLm5hbWUgOiAnJykpO1xufVxuXG5hbmd1bGFyLm1vZHVsZSgndWkucm91dGVyLnN0YXRlJykuZGlyZWN0aXZlKCd1aVZpZXcnLCAkVmlld0RpcmVjdGl2ZSk7XG5hbmd1bGFyLm1vZHVsZSgndWkucm91dGVyLnN0YXRlJykuZGlyZWN0aXZlKCd1aVZpZXcnLCAkVmlld0RpcmVjdGl2ZUZpbGwpO1xuXG5mdW5jdGlvbiBwYXJzZVN0YXRlUmVmKHJlZiwgY3VycmVudCkge1xuICB2YXIgcHJlcGFyc2VkID0gcmVmLm1hdGNoKC9eXFxzKih7W159XSp9KVxccyokLyksIHBhcnNlZDtcbiAgaWYgKHByZXBhcnNlZCkgcmVmID0gY3VycmVudCArICcoJyArIHByZXBhcnNlZFsxXSArICcpJztcbiAgcGFyc2VkID0gcmVmLnJlcGxhY2UoL1xcbi9nLCBcIiBcIikubWF0Y2goL14oW14oXSs/KVxccyooXFwoKC4qKVxcKSk/JC8pO1xuICBpZiAoIXBhcnNlZCB8fCBwYXJzZWQubGVuZ3RoICE9PSA0KSB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHN0YXRlIHJlZiAnXCIgKyByZWYgKyBcIidcIik7XG4gIHJldHVybiB7IHN0YXRlOiBwYXJzZWRbMV0sIHBhcmFtRXhwcjogcGFyc2VkWzNdIHx8IG51bGwgfTtcbn1cblxuZnVuY3Rpb24gc3RhdGVDb250ZXh0KGVsKSB7XG4gIHZhciBzdGF0ZURhdGEgPSBlbC5wYXJlbnQoKS5pbmhlcml0ZWREYXRhKCckdWlWaWV3Jyk7XG5cbiAgaWYgKHN0YXRlRGF0YSAmJiBzdGF0ZURhdGEuc3RhdGUgJiYgc3RhdGVEYXRhLnN0YXRlLm5hbWUpIHtcbiAgICByZXR1cm4gc3RhdGVEYXRhLnN0YXRlO1xuICB9XG59XG5cbi8qKlxuICogQG5nZG9jIGRpcmVjdGl2ZVxuICogQG5hbWUgdWkucm91dGVyLnN0YXRlLmRpcmVjdGl2ZTp1aS1zcmVmXG4gKlxuICogQHJlcXVpcmVzIHVpLnJvdXRlci5zdGF0ZS4kc3RhdGVcbiAqIEByZXF1aXJlcyAkdGltZW91dFxuICpcbiAqIEByZXN0cmljdCBBXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBBIGRpcmVjdGl2ZSB0aGF0IGJpbmRzIGEgbGluayAoYDxhPmAgdGFnKSB0byBhIHN0YXRlLiBJZiB0aGUgc3RhdGUgaGFzIGFuIGFzc29jaWF0ZWQgXG4gKiBVUkwsIHRoZSBkaXJlY3RpdmUgd2lsbCBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlICYgdXBkYXRlIHRoZSBgaHJlZmAgYXR0cmlidXRlIHZpYSBcbiAqIHRoZSB7QGxpbmsgdWkucm91dGVyLnN0YXRlLiRzdGF0ZSNtZXRob2RzX2hyZWYgJHN0YXRlLmhyZWYoKX0gbWV0aG9kLiBDbGlja2luZyBcbiAqIHRoZSBsaW5rIHdpbGwgdHJpZ2dlciBhIHN0YXRlIHRyYW5zaXRpb24gd2l0aCBvcHRpb25hbCBwYXJhbWV0ZXJzLiBcbiAqXG4gKiBBbHNvIG1pZGRsZS1jbGlja2luZywgcmlnaHQtY2xpY2tpbmcsIGFuZCBjdHJsLWNsaWNraW5nIG9uIHRoZSBsaW5rIHdpbGwgYmUgXG4gKiBoYW5kbGVkIG5hdGl2ZWx5IGJ5IHRoZSBicm93c2VyLlxuICpcbiAqIFlvdSBjYW4gYWxzbyB1c2UgcmVsYXRpdmUgc3RhdGUgcGF0aHMgd2l0aGluIHVpLXNyZWYsIGp1c3QgbGlrZSB0aGUgcmVsYXRpdmUgXG4gKiBwYXRocyBwYXNzZWQgdG8gYCRzdGF0ZS5nbygpYC4gWW91IGp1c3QgbmVlZCB0byBiZSBhd2FyZSB0aGF0IHRoZSBwYXRoIGlzIHJlbGF0aXZlXG4gKiB0byB0aGUgc3RhdGUgdGhhdCB0aGUgbGluayBsaXZlcyBpbiwgaW4gb3RoZXIgd29yZHMgdGhlIHN0YXRlIHRoYXQgbG9hZGVkIHRoZSBcbiAqIHRlbXBsYXRlIGNvbnRhaW5pbmcgdGhlIGxpbmsuXG4gKlxuICogWW91IGNhbiBzcGVjaWZ5IG9wdGlvbnMgdG8gcGFzcyB0byB7QGxpbmsgdWkucm91dGVyLnN0YXRlLiRzdGF0ZSNnbyAkc3RhdGUuZ28oKX1cbiAqIHVzaW5nIHRoZSBgdWktc3JlZi1vcHRzYCBhdHRyaWJ1dGUuIE9wdGlvbnMgYXJlIHJlc3RyaWN0ZWQgdG8gYGxvY2F0aW9uYCwgYGluaGVyaXRgLFxuICogYW5kIGByZWxvYWRgLlxuICpcbiAqIEBleGFtcGxlXG4gKiBIZXJlJ3MgYW4gZXhhbXBsZSBvZiBob3cgeW91J2QgdXNlIHVpLXNyZWYgYW5kIGhvdyBpdCB3b3VsZCBjb21waWxlLiBJZiB5b3UgaGF2ZSB0aGUgXG4gKiBmb2xsb3dpbmcgdGVtcGxhdGU6XG4gKiA8cHJlPlxuICogPGEgdWktc3JlZj1cImhvbWVcIj5Ib21lPC9hPiB8IDxhIHVpLXNyZWY9XCJhYm91dFwiPkFib3V0PC9hPiB8IDxhIHVpLXNyZWY9XCJ7cGFnZTogMn1cIj5OZXh0IHBhZ2U8L2E+XG4gKiBcbiAqIDx1bD5cbiAqICAgICA8bGkgbmctcmVwZWF0PVwiY29udGFjdCBpbiBjb250YWN0c1wiPlxuICogICAgICAgICA8YSB1aS1zcmVmPVwiY29udGFjdHMuZGV0YWlsKHsgaWQ6IGNvbnRhY3QuaWQgfSlcIj57eyBjb250YWN0Lm5hbWUgfX08L2E+XG4gKiAgICAgPC9saT5cbiAqIDwvdWw+XG4gKiA8L3ByZT5cbiAqIFxuICogVGhlbiB0aGUgY29tcGlsZWQgaHRtbCB3b3VsZCBiZSAoYXNzdW1pbmcgSHRtbDVNb2RlIGlzIG9mZiBhbmQgY3VycmVudCBzdGF0ZSBpcyBjb250YWN0cyk6XG4gKiA8cHJlPlxuICogPGEgaHJlZj1cIiMvaG9tZVwiIHVpLXNyZWY9XCJob21lXCI+SG9tZTwvYT4gfCA8YSBocmVmPVwiIy9hYm91dFwiIHVpLXNyZWY9XCJhYm91dFwiPkFib3V0PC9hPiB8IDxhIGhyZWY9XCIjL2NvbnRhY3RzP3BhZ2U9MlwiIHVpLXNyZWY9XCJ7cGFnZTogMn1cIj5OZXh0IHBhZ2U8L2E+XG4gKiBcbiAqIDx1bD5cbiAqICAgICA8bGkgbmctcmVwZWF0PVwiY29udGFjdCBpbiBjb250YWN0c1wiPlxuICogICAgICAgICA8YSBocmVmPVwiIy9jb250YWN0cy8xXCIgdWktc3JlZj1cImNvbnRhY3RzLmRldGFpbCh7IGlkOiBjb250YWN0LmlkIH0pXCI+Sm9lPC9hPlxuICogICAgIDwvbGk+XG4gKiAgICAgPGxpIG5nLXJlcGVhdD1cImNvbnRhY3QgaW4gY29udGFjdHNcIj5cbiAqICAgICAgICAgPGEgaHJlZj1cIiMvY29udGFjdHMvMlwiIHVpLXNyZWY9XCJjb250YWN0cy5kZXRhaWwoeyBpZDogY29udGFjdC5pZCB9KVwiPkFsaWNlPC9hPlxuICogICAgIDwvbGk+XG4gKiAgICAgPGxpIG5nLXJlcGVhdD1cImNvbnRhY3QgaW4gY29udGFjdHNcIj5cbiAqICAgICAgICAgPGEgaHJlZj1cIiMvY29udGFjdHMvM1wiIHVpLXNyZWY9XCJjb250YWN0cy5kZXRhaWwoeyBpZDogY29udGFjdC5pZCB9KVwiPkJvYjwvYT5cbiAqICAgICA8L2xpPlxuICogPC91bD5cbiAqXG4gKiA8YSB1aS1zcmVmPVwiaG9tZVwiIHVpLXNyZWYtb3B0cz1cIntyZWxvYWQ6IHRydWV9XCI+SG9tZTwvYT5cbiAqIDwvcHJlPlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1aS1zcmVmICdzdGF0ZU5hbWUnIGNhbiBiZSBhbnkgdmFsaWQgYWJzb2x1dGUgb3IgcmVsYXRpdmUgc3RhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSB1aS1zcmVmLW9wdHMgb3B0aW9ucyB0byBwYXNzIHRvIHtAbGluayB1aS5yb3V0ZXIuc3RhdGUuJHN0YXRlI2dvICRzdGF0ZS5nbygpfVxuICovXG4kU3RhdGVSZWZEaXJlY3RpdmUuJGluamVjdCA9IFsnJHN0YXRlJywgJyR0aW1lb3V0J107XG5mdW5jdGlvbiAkU3RhdGVSZWZEaXJlY3RpdmUoJHN0YXRlLCAkdGltZW91dCkge1xuICB2YXIgYWxsb3dlZE9wdGlvbnMgPSBbJ2xvY2F0aW9uJywgJ2luaGVyaXQnLCAncmVsb2FkJ107XG5cbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogJ0EnLFxuICAgIHJlcXVpcmU6IFsnP151aVNyZWZBY3RpdmUnLCAnP151aVNyZWZBY3RpdmVFcSddLFxuICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycywgdWlTcmVmQWN0aXZlKSB7XG4gICAgICB2YXIgcmVmID0gcGFyc2VTdGF0ZVJlZihhdHRycy51aVNyZWYsICRzdGF0ZS5jdXJyZW50Lm5hbWUpO1xuICAgICAgdmFyIHBhcmFtcyA9IG51bGwsIHVybCA9IG51bGwsIGJhc2UgPSBzdGF0ZUNvbnRleHQoZWxlbWVudCkgfHwgJHN0YXRlLiRjdXJyZW50O1xuICAgICAgdmFyIG5ld0hyZWYgPSBudWxsLCBpc0FuY2hvciA9IGVsZW1lbnQucHJvcChcInRhZ05hbWVcIikgPT09IFwiQVwiO1xuICAgICAgdmFyIGlzRm9ybSA9IGVsZW1lbnRbMF0ubm9kZU5hbWUgPT09IFwiRk9STVwiO1xuICAgICAgdmFyIGF0dHIgPSBpc0Zvcm0gPyBcImFjdGlvblwiIDogXCJocmVmXCIsIG5hdiA9IHRydWU7XG5cbiAgICAgIHZhciBvcHRpb25zID0geyByZWxhdGl2ZTogYmFzZSwgaW5oZXJpdDogdHJ1ZSB9O1xuICAgICAgdmFyIG9wdGlvbnNPdmVycmlkZSA9IHNjb3BlLiRldmFsKGF0dHJzLnVpU3JlZk9wdHMpIHx8IHt9O1xuXG4gICAgICBhbmd1bGFyLmZvckVhY2goYWxsb3dlZE9wdGlvbnMsIGZ1bmN0aW9uKG9wdGlvbikge1xuICAgICAgICBpZiAob3B0aW9uIGluIG9wdGlvbnNPdmVycmlkZSkge1xuICAgICAgICAgIG9wdGlvbnNbb3B0aW9uXSA9IG9wdGlvbnNPdmVycmlkZVtvcHRpb25dO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgdmFyIHVwZGF0ZSA9IGZ1bmN0aW9uKG5ld1ZhbCkge1xuICAgICAgICBpZiAobmV3VmFsKSBwYXJhbXMgPSBhbmd1bGFyLmNvcHkobmV3VmFsKTtcbiAgICAgICAgaWYgKCFuYXYpIHJldHVybjtcblxuICAgICAgICBuZXdIcmVmID0gJHN0YXRlLmhyZWYocmVmLnN0YXRlLCBwYXJhbXMsIG9wdGlvbnMpO1xuXG4gICAgICAgIHZhciBhY3RpdmVEaXJlY3RpdmUgPSB1aVNyZWZBY3RpdmVbMV0gfHwgdWlTcmVmQWN0aXZlWzBdO1xuICAgICAgICBpZiAoYWN0aXZlRGlyZWN0aXZlKSB7XG4gICAgICAgICAgYWN0aXZlRGlyZWN0aXZlLiQkc2V0U3RhdGVJbmZvKHJlZi5zdGF0ZSwgcGFyYW1zKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmV3SHJlZiA9PT0gbnVsbCkge1xuICAgICAgICAgIG5hdiA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBhdHRycy4kc2V0KGF0dHIsIG5ld0hyZWYpO1xuICAgICAgfTtcblxuICAgICAgaWYgKHJlZi5wYXJhbUV4cHIpIHtcbiAgICAgICAgc2NvcGUuJHdhdGNoKHJlZi5wYXJhbUV4cHIsIGZ1bmN0aW9uKG5ld1ZhbCwgb2xkVmFsKSB7XG4gICAgICAgICAgaWYgKG5ld1ZhbCAhPT0gcGFyYW1zKSB1cGRhdGUobmV3VmFsKTtcbiAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICAgIHBhcmFtcyA9IGFuZ3VsYXIuY29weShzY29wZS4kZXZhbChyZWYucGFyYW1FeHByKSk7XG4gICAgICB9XG4gICAgICB1cGRhdGUoKTtcblxuICAgICAgaWYgKGlzRm9ybSkgcmV0dXJuO1xuXG4gICAgICBlbGVtZW50LmJpbmQoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIHZhciBidXR0b24gPSBlLndoaWNoIHx8IGUuYnV0dG9uO1xuICAgICAgICBpZiAoICEoYnV0dG9uID4gMSB8fCBlLmN0cmxLZXkgfHwgZS5tZXRhS2V5IHx8IGUuc2hpZnRLZXkgfHwgZWxlbWVudC5hdHRyKCd0YXJnZXQnKSkgKSB7XG4gICAgICAgICAgLy8gSEFDSzogVGhpcyBpcyB0byBhbGxvdyBuZy1jbGlja3MgdG8gYmUgcHJvY2Vzc2VkIGJlZm9yZSB0aGUgdHJhbnNpdGlvbiBpcyBpbml0aWF0ZWQ6XG4gICAgICAgICAgdmFyIHRyYW5zaXRpb24gPSAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRzdGF0ZS5nbyhyZWYuc3RhdGUsIHBhcmFtcywgb3B0aW9ucyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgLy8gaWYgdGhlIHN0YXRlIGhhcyBubyBVUkwsIGlnbm9yZSBvbmUgcHJldmVudERlZmF1bHQgZnJvbSB0aGUgPGE+IGRpcmVjdGl2ZS5cbiAgICAgICAgICB2YXIgaWdub3JlUHJldmVudERlZmF1bHRDb3VudCA9IGlzQW5jaG9yICYmICFuZXdIcmVmID8gMTogMDtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoaWdub3JlUHJldmVudERlZmF1bHRDb3VudC0tIDw9IDApXG4gICAgICAgICAgICAgICR0aW1lb3V0LmNhbmNlbCh0cmFuc2l0aW9uKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59XG5cbi8qKlxuICogQG5nZG9jIGRpcmVjdGl2ZVxuICogQG5hbWUgdWkucm91dGVyLnN0YXRlLmRpcmVjdGl2ZTp1aS1zcmVmLWFjdGl2ZVxuICpcbiAqIEByZXF1aXJlcyB1aS5yb3V0ZXIuc3RhdGUuJHN0YXRlXG4gKiBAcmVxdWlyZXMgdWkucm91dGVyLnN0YXRlLiRzdGF0ZVBhcmFtc1xuICogQHJlcXVpcmVzICRpbnRlcnBvbGF0ZVxuICpcbiAqIEByZXN0cmljdCBBXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBBIGRpcmVjdGl2ZSB3b3JraW5nIGFsb25nc2lkZSB1aS1zcmVmIHRvIGFkZCBjbGFzc2VzIHRvIGFuIGVsZW1lbnQgd2hlbiB0aGVcbiAqIHJlbGF0ZWQgdWktc3JlZiBkaXJlY3RpdmUncyBzdGF0ZSBpcyBhY3RpdmUsIGFuZCByZW1vdmluZyB0aGVtIHdoZW4gaXQgaXMgaW5hY3RpdmUuXG4gKiBUaGUgcHJpbWFyeSB1c2UtY2FzZSBpcyB0byBzaW1wbGlmeSB0aGUgc3BlY2lhbCBhcHBlYXJhbmNlIG9mIG5hdmlnYXRpb24gbWVudXNcbiAqIHJlbHlpbmcgb24gYHVpLXNyZWZgLCBieSBoYXZpbmcgdGhlIFwiYWN0aXZlXCIgc3RhdGUncyBtZW51IGJ1dHRvbiBhcHBlYXIgZGlmZmVyZW50LFxuICogZGlzdGluZ3Vpc2hpbmcgaXQgZnJvbSB0aGUgaW5hY3RpdmUgbWVudSBpdGVtcy5cbiAqXG4gKiB1aS1zcmVmLWFjdGl2ZSBjYW4gbGl2ZSBvbiB0aGUgc2FtZSBlbGVtZW50IGFzIHVpLXNyZWYgb3Igb24gYSBwYXJlbnQgZWxlbWVudC4gVGhlIGZpcnN0XG4gKiB1aS1zcmVmLWFjdGl2ZSBmb3VuZCBhdCB0aGUgc2FtZSBsZXZlbCBvciBhYm92ZSB0aGUgdWktc3JlZiB3aWxsIGJlIHVzZWQuXG4gKlxuICogV2lsbCBhY3RpdmF0ZSB3aGVuIHRoZSB1aS1zcmVmJ3MgdGFyZ2V0IHN0YXRlIG9yIGFueSBjaGlsZCBzdGF0ZSBpcyBhY3RpdmUuIElmIHlvdVxuICogbmVlZCB0byBhY3RpdmF0ZSBvbmx5IHdoZW4gdGhlIHVpLXNyZWYgdGFyZ2V0IHN0YXRlIGlzIGFjdGl2ZSBhbmQgKm5vdCogYW55IG9mXG4gKiBpdCdzIGNoaWxkcmVuLCB0aGVuIHlvdSB3aWxsIHVzZVxuICoge0BsaW5rIHVpLnJvdXRlci5zdGF0ZS5kaXJlY3RpdmU6dWktc3JlZi1hY3RpdmUtZXEgdWktc3JlZi1hY3RpdmUtZXF9XG4gKlxuICogQGV4YW1wbGVcbiAqIEdpdmVuIHRoZSBmb2xsb3dpbmcgdGVtcGxhdGU6XG4gKiA8cHJlPlxuICogPHVsPlxuICogICA8bGkgdWktc3JlZi1hY3RpdmU9XCJhY3RpdmVcIiBjbGFzcz1cIml0ZW1cIj5cbiAqICAgICA8YSBocmVmIHVpLXNyZWY9XCJhcHAudXNlcih7dXNlcjogJ2JpbGJvYmFnZ2lucyd9KVwiPkBiaWxib2JhZ2dpbnM8L2E+XG4gKiAgIDwvbGk+XG4gKiA8L3VsPlxuICogPC9wcmU+XG4gKlxuICpcbiAqIFdoZW4gdGhlIGFwcCBzdGF0ZSBpcyBcImFwcC51c2VyXCIgKG9yIGFueSBjaGlsZHJlbiBzdGF0ZXMpLCBhbmQgY29udGFpbnMgdGhlIHN0YXRlIHBhcmFtZXRlciBcInVzZXJcIiB3aXRoIHZhbHVlIFwiYmlsYm9iYWdnaW5zXCIsXG4gKiB0aGUgcmVzdWx0aW5nIEhUTUwgd2lsbCBhcHBlYXIgYXMgKG5vdGUgdGhlICdhY3RpdmUnIGNsYXNzKTpcbiAqIDxwcmU+XG4gKiA8dWw+XG4gKiAgIDxsaSB1aS1zcmVmLWFjdGl2ZT1cImFjdGl2ZVwiIGNsYXNzPVwiaXRlbSBhY3RpdmVcIj5cbiAqICAgICA8YSB1aS1zcmVmPVwiYXBwLnVzZXIoe3VzZXI6ICdiaWxib2JhZ2dpbnMnfSlcIiBocmVmPVwiL3VzZXJzL2JpbGJvYmFnZ2luc1wiPkBiaWxib2JhZ2dpbnM8L2E+XG4gKiAgIDwvbGk+XG4gKiA8L3VsPlxuICogPC9wcmU+XG4gKlxuICogVGhlIGNsYXNzIG5hbWUgaXMgaW50ZXJwb2xhdGVkICoqb25jZSoqIGR1cmluZyB0aGUgZGlyZWN0aXZlcyBsaW5rIHRpbWUgKGFueSBmdXJ0aGVyIGNoYW5nZXMgdG8gdGhlXG4gKiBpbnRlcnBvbGF0ZWQgdmFsdWUgYXJlIGlnbm9yZWQpLlxuICpcbiAqIE11bHRpcGxlIGNsYXNzZXMgbWF5IGJlIHNwZWNpZmllZCBpbiBhIHNwYWNlLXNlcGFyYXRlZCBmb3JtYXQ6XG4gKiA8cHJlPlxuICogPHVsPlxuICogICA8bGkgdWktc3JlZi1hY3RpdmU9J2NsYXNzMSBjbGFzczIgY2xhc3MzJz5cbiAqICAgICA8YSB1aS1zcmVmPVwiYXBwLnVzZXJcIj5saW5rPC9hPlxuICogICA8L2xpPlxuICogPC91bD5cbiAqIDwvcHJlPlxuICovXG5cbi8qKlxuICogQG5nZG9jIGRpcmVjdGl2ZVxuICogQG5hbWUgdWkucm91dGVyLnN0YXRlLmRpcmVjdGl2ZTp1aS1zcmVmLWFjdGl2ZS1lcVxuICpcbiAqIEByZXF1aXJlcyB1aS5yb3V0ZXIuc3RhdGUuJHN0YXRlXG4gKiBAcmVxdWlyZXMgdWkucm91dGVyLnN0YXRlLiRzdGF0ZVBhcmFtc1xuICogQHJlcXVpcmVzICRpbnRlcnBvbGF0ZVxuICpcbiAqIEByZXN0cmljdCBBXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBUaGUgc2FtZSBhcyB7QGxpbmsgdWkucm91dGVyLnN0YXRlLmRpcmVjdGl2ZTp1aS1zcmVmLWFjdGl2ZSB1aS1zcmVmLWFjdGl2ZX0gYnV0IHdpbGwgb25seSBhY3RpdmF0ZVxuICogd2hlbiB0aGUgZXhhY3QgdGFyZ2V0IHN0YXRlIHVzZWQgaW4gdGhlIGB1aS1zcmVmYCBpcyBhY3RpdmU7IG5vIGNoaWxkIHN0YXRlcy5cbiAqXG4gKi9cbiRTdGF0ZVJlZkFjdGl2ZURpcmVjdGl2ZS4kaW5qZWN0ID0gWyckc3RhdGUnLCAnJHN0YXRlUGFyYW1zJywgJyRpbnRlcnBvbGF0ZSddO1xuZnVuY3Rpb24gJFN0YXRlUmVmQWN0aXZlRGlyZWN0aXZlKCRzdGF0ZSwgJHN0YXRlUGFyYW1zLCAkaW50ZXJwb2xhdGUpIHtcbiAgcmV0dXJuICB7XG4gICAgcmVzdHJpY3Q6IFwiQVwiLFxuICAgIGNvbnRyb2xsZXI6IFsnJHNjb3BlJywgJyRlbGVtZW50JywgJyRhdHRycycsIGZ1bmN0aW9uICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMpIHtcbiAgICAgIHZhciBzdGF0ZSwgcGFyYW1zLCBhY3RpdmVDbGFzcztcblxuICAgICAgLy8gVGhlcmUgcHJvYmFibHkgaXNuJ3QgbXVjaCBwb2ludCBpbiAkb2JzZXJ2aW5nIHRoaXNcbiAgICAgIC8vIHVpU3JlZkFjdGl2ZSBhbmQgdWlTcmVmQWN0aXZlRXEgc2hhcmUgdGhlIHNhbWUgZGlyZWN0aXZlIG9iamVjdCB3aXRoIHNvbWVcbiAgICAgIC8vIHNsaWdodCBkaWZmZXJlbmNlIGluIGxvZ2ljIHJvdXRpbmdcbiAgICAgIGFjdGl2ZUNsYXNzID0gJGludGVycG9sYXRlKCRhdHRycy51aVNyZWZBY3RpdmVFcSB8fCAkYXR0cnMudWlTcmVmQWN0aXZlIHx8ICcnLCBmYWxzZSkoJHNjb3BlKTtcblxuICAgICAgLy8gQWxsb3cgdWlTcmVmIHRvIGNvbW11bmljYXRlIHdpdGggdWlTcmVmQWN0aXZlW0VxdWFsc11cbiAgICAgIHRoaXMuJCRzZXRTdGF0ZUluZm8gPSBmdW5jdGlvbiAobmV3U3RhdGUsIG5ld1BhcmFtcykge1xuICAgICAgICBzdGF0ZSA9ICRzdGF0ZS5nZXQobmV3U3RhdGUsIHN0YXRlQ29udGV4dCgkZWxlbWVudCkpO1xuICAgICAgICBwYXJhbXMgPSBuZXdQYXJhbXM7XG4gICAgICAgIHVwZGF0ZSgpO1xuICAgICAgfTtcblxuICAgICAgJHNjb3BlLiRvbignJHN0YXRlQ2hhbmdlU3VjY2VzcycsIHVwZGF0ZSk7XG5cbiAgICAgIC8vIFVwZGF0ZSByb3V0ZSBzdGF0ZVxuICAgICAgZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgICAgICBpZiAoaXNNYXRjaCgpKSB7XG4gICAgICAgICAgJGVsZW1lbnQuYWRkQ2xhc3MoYWN0aXZlQ2xhc3MpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICRlbGVtZW50LnJlbW92ZUNsYXNzKGFjdGl2ZUNsYXNzKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBpc01hdGNoKCkge1xuICAgICAgICBpZiAodHlwZW9mICRhdHRycy51aVNyZWZBY3RpdmVFcSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICByZXR1cm4gc3RhdGUgJiYgJHN0YXRlLmlzKHN0YXRlLm5hbWUsIHBhcmFtcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHN0YXRlICYmICRzdGF0ZS5pbmNsdWRlcyhzdGF0ZS5uYW1lLCBwYXJhbXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfV1cbiAgfTtcbn1cblxuYW5ndWxhci5tb2R1bGUoJ3VpLnJvdXRlci5zdGF0ZScpXG4gIC5kaXJlY3RpdmUoJ3VpU3JlZicsICRTdGF0ZVJlZkRpcmVjdGl2ZSlcbiAgLmRpcmVjdGl2ZSgndWlTcmVmQWN0aXZlJywgJFN0YXRlUmVmQWN0aXZlRGlyZWN0aXZlKVxuICAuZGlyZWN0aXZlKCd1aVNyZWZBY3RpdmVFcScsICRTdGF0ZVJlZkFjdGl2ZURpcmVjdGl2ZSk7XG5cbi8qKlxuICogQG5nZG9jIGZpbHRlclxuICogQG5hbWUgdWkucm91dGVyLnN0YXRlLmZpbHRlcjppc1N0YXRlXG4gKlxuICogQHJlcXVpcmVzIHVpLnJvdXRlci5zdGF0ZS4kc3RhdGVcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFRyYW5zbGF0ZXMgdG8ge0BsaW5rIHVpLnJvdXRlci5zdGF0ZS4kc3RhdGUjbWV0aG9kc19pcyAkc3RhdGUuaXMoXCJzdGF0ZU5hbWVcIil9LlxuICovXG4kSXNTdGF0ZUZpbHRlci4kaW5qZWN0ID0gWyckc3RhdGUnXTtcbmZ1bmN0aW9uICRJc1N0YXRlRmlsdGVyKCRzdGF0ZSkge1xuICB2YXIgaXNGaWx0ZXIgPSBmdW5jdGlvbiAoc3RhdGUpIHtcbiAgICByZXR1cm4gJHN0YXRlLmlzKHN0YXRlKTtcbiAgfTtcbiAgaXNGaWx0ZXIuJHN0YXRlZnVsID0gdHJ1ZTtcbiAgcmV0dXJuIGlzRmlsdGVyO1xufVxuXG4vKipcbiAqIEBuZ2RvYyBmaWx0ZXJcbiAqIEBuYW1lIHVpLnJvdXRlci5zdGF0ZS5maWx0ZXI6aW5jbHVkZWRCeVN0YXRlXG4gKlxuICogQHJlcXVpcmVzIHVpLnJvdXRlci5zdGF0ZS4kc3RhdGVcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFRyYW5zbGF0ZXMgdG8ge0BsaW5rIHVpLnJvdXRlci5zdGF0ZS4kc3RhdGUjbWV0aG9kc19pbmNsdWRlcyAkc3RhdGUuaW5jbHVkZXMoJ2Z1bGxPclBhcnRpYWxTdGF0ZU5hbWUnKX0uXG4gKi9cbiRJbmNsdWRlZEJ5U3RhdGVGaWx0ZXIuJGluamVjdCA9IFsnJHN0YXRlJ107XG5mdW5jdGlvbiAkSW5jbHVkZWRCeVN0YXRlRmlsdGVyKCRzdGF0ZSkge1xuICB2YXIgaW5jbHVkZXNGaWx0ZXIgPSBmdW5jdGlvbiAoc3RhdGUpIHtcbiAgICByZXR1cm4gJHN0YXRlLmluY2x1ZGVzKHN0YXRlKTtcbiAgfTtcbiAgaW5jbHVkZXNGaWx0ZXIuJHN0YXRlZnVsID0gdHJ1ZTtcbiAgcmV0dXJuICBpbmNsdWRlc0ZpbHRlcjtcbn1cblxuYW5ndWxhci5tb2R1bGUoJ3VpLnJvdXRlci5zdGF0ZScpXG4gIC5maWx0ZXIoJ2lzU3RhdGUnLCAkSXNTdGF0ZUZpbHRlcilcbiAgLmZpbHRlcignaW5jbHVkZWRCeVN0YXRlJywgJEluY2x1ZGVkQnlTdGF0ZUZpbHRlcik7XG59KSh3aW5kb3csIHdpbmRvdy5hbmd1bGFyKTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG4vKnJlcXVpcmUoJy4vdGhyaWZ0LmpzJyk7XHJcbnJlcXVpcmUoJy4uLy4uL2dlbi1qcy9iZWRhdGFfdHlwZXMuanMnKTtcclxucmVxdWlyZSgnLi4vLi4vZ2VuLWpzL21lc3NhZ2VzZXJ2aWNlX3R5cGVzLmpzJyk7XHJcbnJlcXVpcmUoJy4uLy4uL2dlbi1qcy9NZXNzYWdlU2VydmljZS5qcycpO1xyXG5yZXF1aXJlKCcuLi8uLi9nZW4tanMvRGlhbG9nU2VydmljZS5qcycpO1xyXG5yZXF1aXJlKCcuLi8uLi9nZW4tanMvdXNlcnNlcnZpY2VfdHlwZXMuanMnKTtcclxucmVxdWlyZSgnLi4vLi4vZ2VuLWpzL1VzZXJTZXJ2aWNlLmpzJyk7XHJcbnJlcXVpcmUoJy4uLy4uL2dlbi1qcy9hdXRoc2VydmljZV90eXBlcy5qcycpO1xyXG5yZXF1aXJlKCcuLi8uLi9nZW4tanMvQXV0aFNlcnZpY2UuanMnKTtcclxucmVxdWlyZSgnLi4vLi4vZ2VuLWpzL3V0aWxpdHlzZXJ2Y2VzX3R5cGVzLmpzJyk7XHJcbnJlcXVpcmUoJy4uLy4uL2dlbi1qcy9VdGlsaXR5U2VydmljZS5qcycpO1xyXG5yZXF1aXJlKCcuLi8uLi9nZW4tanMvZmlsZXV0aWxzX3R5cGVzLmpzJyk7XHJcbnJlcXVpcmUoJy4uLy4uL2dlbi1qcy9GaWxlU2VydmljZS5qcycpO1xyXG5yZXF1aXJlKCcuLi8uLi9nZW4tanMvYnVzaW5lc3NfdHlwZXMuanMnKTtcclxucmVxdWlyZSgnLi4vLi4vZ2VuLWpzL0J1c2luZXNzU2VydmljZS5qcycpOyovXHJcblxyXG4vL3JlcXVpcmUoJy4vY29tbW9uLmpzJyk7XHJcbnJlcXVpcmUoJy4vZGlyZWN0aXZlcy5qcycpO1xyXG5yZXF1aXJlKCcuL3NlcnZpY2VzLmpzJyk7XHJcbnJlcXVpcmUoJy4vY29udHJvbGxlcnMnKTtcclxuXHJcbnJlcXVpcmUoJ2FuZ3VsYXItdWktcm91dGVyJyk7XHJcbnJlcXVpcmUoJ2FuZ3VsYXItZmlsZS11cGxvYWQnKTtcclxuXHJcbnZhciBtYWluID0gYW5ndWxhci5tb2R1bGUoJ2ZvcnVtJywgW1xyXG4gIC8vJ25nUm91dGUnLFxyXG4gICd1aS5yb3V0ZXInLFxyXG4gLyogJ2ZvcnVtLmZpbHRlcnMnLCovXHJcbiAgJ2ZvcnVtLnNlcnZpY2VzJyxcclxuICAnZm9ydW0uZGlyZWN0aXZlcycsXHJcbiAgLy8nZm9ydW0uY29udHJvbGxlcnMnLFxyXG4gICdWT0NvbnRyb2xsZXJzJyxcclxuICAnYW5ndWxhckZpbGVVcGxvYWQnXHJcbl0pXHJcbiAgICAuY29uZmlnKHJlcXVpcmUoJy4vY29uZmlnJykpO1xyXG5cclxuLyptYWluLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XHJcblxyXG4gICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZShcIi9tYWluXCIpO1xyXG5cclxuICAgICRzdGF0ZVByb3ZpZGVyXHJcbiAgICAgICAgLnN0YXRlKCdtYWluJywge1xyXG4gICAgICAgICAgICB1cmw6IFwiL21haW5cIixcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwiL3N0YXRpYy9wYXJ0aWFscy9tYWluLmh0bWxcIixcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ3dhbGxDdHJsIGFzIGxlbnRhJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCd3YWxsLXNpbmdsZScsIHtcclxuICAgICAgICAgICAgdXJsOiBcIi93YWxsLXNpbmdsZS86dG9waWNJZFwiLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCIvc3RhdGljL3BhcnRpYWxzL3dhbGwtc2luZ2xlLmh0bWxcIixcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ3dhbGxTaW5nbGVDdHJsIGFzIHdhbGxTaW5nbGUnXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ3RhbGtzJywge1xyXG4gICAgICAgICAgICB1cmw6IFwiL3RhbGtzXCIsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcIi9zdGF0aWMvcGFydGlhbHMvdGFsa3MuaHRtbFwiLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAndGFsa3NDdHJsIGFzIHRhbGtzJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCd0YWxrcy1zaW5nbGUnLCB7XHJcbiAgICAgICAgICAgIHVybDogXCIvdGFsa3Mtc2luZ2xlLzp0YWxrSWRcIixcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwiL3N0YXRpYy9wYXJ0aWFscy90YWxrcy1zaW5nbGUuaHRtbFwiLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAndGFsa3NTaW5nbGVDdHJsIGFzIHRhbGtzJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCdwcm9maXQnLCB7XHJcbiAgICAgICAgICAgIHVybDogXCIvcHJvZml0XCIsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcIi9zdGF0aWMvcGFydGlhbHMvcHJvZml0Lmh0bWxcIixcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ2FkdmVydHNDdHJsIGFzIGFkdmVydHMnXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ3Byb2ZpdC1zaW5nbGUnLCB7XHJcbiAgICAgICAgICAgIHVybDogXCIvcHJvZml0LXNpbmdsZS86YWR2ZXJ0SWRcIixcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwiL3N0YXRpYy9wYXJ0aWFscy9wcm9maXQtc2luZ2xlLmh0bWxcIixcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ2FkdmVydHNTaW5nbGVDdHJsIGFzIGFkdmVydHMnXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ2RpYWxvZ3MnLCB7XHJcbiAgICAgICAgICAgIHVybDogXCIvZGlhbG9nc1wiLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCIvc3RhdGljL3BhcnRpYWxzL2RpYWxvZ3MuaHRtbFwiLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnZGlhbG9nc0N0cmwgYXMgZGlhbG9ncydcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgnZGlhbG9nLXNpbmdsZScsIHtcclxuICAgICAgICAgICAgdXJsOiBcIi9kaWFsb2ctc2luZ2xlLzpkaWFsb2dJZFwiLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCIvc3RhdGljL3BhcnRpYWxzL2RpYWxvZy1zaW5nbGUuaHRtbFwiLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnZGlhbG9nQ3RybCBhcyBkaWFsb2cnXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ25laWdoYm91cnMnLCB7XHJcbiAgICAgICAgICAgIHVybDogXCIvbmVpZ2hib3Vyc1wiLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCIvc3RhdGljL3BhcnRpYWxzL25laWdoYm91cnMuaHRtbFwiLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnbmVpZ2hib3Vyc0N0cmwgYXMgbmVpZ2hib3VycydcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgncHJvZmlsZScsIHtcclxuICAgICAgICAgICAgdXJsOiBcIi9wcm9maWxlLzp1c2VySWRcIixcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwiL3N0YXRpYy9wYXJ0aWFscy9wcm9maWxlLmh0bWxcIixcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ3Byb2ZpbGVDdHJsIGFzIHByb2ZpbGUnXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ3Byb2ZpbGUuY2hhbmdlLWF2YXRhcicsIHtcclxuICAgICAgICAgICAgdXJsOiBcIi9jaGFuZ2UtYXZhdGFyXCIsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcIi9zdGF0aWMvcGFydGlhbHMvcHJvZmlsZS5jaGFuZ2VBdmF0YXIuaHRtbFwiLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnY2hhbmdlQXZhdGFyQ3RybCBhcyBjaGFuZ2VBdmF0YXInXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ3NldHRpbmdzJywge1xyXG4gICAgICAgICAgICB1cmw6IFwiL3NldHRpbmdzXCIsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcIi9zdGF0aWMvcGFydGlhbHMvc2V0dGluZ3MuaHRtbFwiLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnc2V0dGluZ3NDdHJsIGFzIHNldHRpbmdzJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCdtYXBzJywge1xyXG4gICAgICAgICAgICB1cmw6IFwiL21hcHNcIixcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwiL3N0YXRpYy9wYXJ0aWFscy9tYXBzLmh0bWxcIixcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ21hcHNDdHJsIGFzIG1hcHMnXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ3NldC1pbmZvJywge1xyXG4gICAgICAgICAgICB1cmw6IFwiL3NldC1pbmZvXCIsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcIi9zdGF0aWMvcGFydGlhbHMvc2V0LWluZm8uaHRtbFwiLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnc2V0SW5mb0N0cmwgYXMgc2V0SW5mbydcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgnY291bnRlcnMnLCB7XHJcbiAgICAgICAgICAgIHVybDogXCIvY291bnRlcnNcIixcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwiL3N0YXRpYy9wYXJ0aWFscy9jb3VudGVycy5odG1sXCIsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdjb3VudGVyc0N0cmwgYXMgY291bnRlcnMnXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ2NvdW50ZXJzLWhpc3RvcnknLCB7XHJcbiAgICAgICAgICAgIHVybDogXCIvY291bnRlcnMtaGlzdG9yeS86Y291bnRlcklkXCIsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcIi9zdGF0aWMvcGFydGlhbHMvY291bnRlcnMtaGlzdG9yeS5odG1sXCIsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdjb3VudGVyc0hpc3RvcnlDdHJsIGFzIGNvdW50ZXJzSGlzdG9yeSdcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgnaW1wb3J0YW50Jywge1xyXG4gICAgICAgICAgICB1cmw6IFwiL2ltcG9ydGFudFwiLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCIvc3RhdGljL3BhcnRpYWxzL2ltcG9ydGFudC5odG1sXCIsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdpbXBvcnRhbnRDdHJsIGFzIGltcG9ydGFudCdcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgnbmVhcmJ5Jywge1xyXG4gICAgICAgICAgICB1cmw6IFwiL25lYXJieVwiLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCIvc3RhdGljL3BhcnRpYWxzL25lYXJieS5odG1sXCIsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICduZWFyYnlDdHJsIGFzIG5lYXJieSdcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgnbmVhcmJ5LXNpbmdsZScsIHtcclxuICAgICAgICAgICAgdXJsOiBcIi9uZWFyYnktc2luZ2xlLzpuZWFyYnlJZFwiLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCIvc3RhdGljL3BhcnRpYWxzL25lYXJieS1zaW5nbGUuaHRtbFwiLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnbmVhcmJ5U2luZ2xlQ3RybCBhcyBuZWFyYnknXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ3J1YnJpY3MnLCB7XHJcbiAgICAgICAgICAgIHVybDogXCIvcnVicmljcy86cnVicmljSWRcIixcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwiL3N0YXRpYy9wYXJ0aWFscy9ydWJyaWNzLmh0bWxcIixcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ3J1YnJpY3NDdHJsIGFzIHRhbGtzJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCdydWJyaWNzLXNpbmdsZScsIHtcclxuICAgICAgICAgICAgdXJsOiBcIi9ydWJyaWMtc2luZ2xlLzpydWJyaWNJZFwiLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCIvc3RhdGljL3BhcnRpYWxzL3J1YnJpY3Mtc2luZ2xlLmh0bWxcIixcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ3J1YnJpY3NTaW5nbGVDdHJsIGFzIHRhbGtzJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCdibG9nJywge1xyXG4gICAgICAgICAgICB1cmw6IFwiL2Jsb2dcIlxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCdhYm91dCcsIHtcclxuICAgICAgICAgICAgdXJsOiBcIi9hYm91dFwiXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ2NvbnRhY3RzJywge1xyXG4gICAgICAgICAgICB1cmw6IFwiL2NvbnRhY3RzXCJcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgnY2FiaW5ldCcsIHtcclxuICAgICAgICAgICAgdXJsOiBcIi9jYWJpbmV0XCIsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcIi9zdGF0aWMvcGFydGlhbHMvYnVzaW5lc3MvY2FiaW5ldC5odG1sXCIsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdjYWJpbmV0Q3RybCBhcyBuZWFyYnknXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ2VkaXQnLCB7XHJcbiAgICAgICAgICAgIHVybDogXCIvZWRpdFwiLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCIvc3RhdGljL3BhcnRpYWxzL2J1c2luZXNzL2VkaXQuaHRtbFwiLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnZWRpdEN0cmwgYXMgZWRpdCdcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgnc3RhdGlzdGljJywge1xyXG4gICAgICAgICAgICB1cmw6IFwiL3N0YXRpc3RpY1wiLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCIvc3RhdGljL3BhcnRpYWxzL2J1c2luZXNzL3N0YXRpc3RpYy5odG1sXCIsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdzdGF0aXN0aWNDdHJsIGFzIG1hcHMnXHJcbiAgICAgICAgfSlcclxufSk7XHJcblxyXG5tYWluLmNvbmZpZyhmdW5jdGlvbigkbG9jYXRpb25Qcm92aWRlcil7XHJcbiAgICAkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUodHJ1ZSk7XHJcbn0pOyovXHJcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBjb25maWcgPSBmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyLCRsb2NhdGlvblByb3ZpZGVyKSB7XHJcblxyXG4gICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZShcIi9tYWluXCIpO1xyXG5cclxuICAgICRzdGF0ZVByb3ZpZGVyXHJcbiAgICAgICAgLnN0YXRlKCdtYWluJywge1xyXG4gICAgICAgICAgICB1cmw6IFwiL21haW5cIixcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwiL3N0YXRpYy9wYXJ0aWFscy9tYWluLmh0bWxcIixcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ3dhbGxDdHJsIGFzIGxlbnRhJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCd3YWxsLXNpbmdsZScsIHtcclxuICAgICAgICAgICAgdXJsOiBcIi93YWxsLXNpbmdsZS86dG9waWNJZFwiLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCIvc3RhdGljL3BhcnRpYWxzL3dhbGwtc2luZ2xlLmh0bWxcIixcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ3dhbGxTaW5nbGVDdHJsIGFzIHdhbGxTaW5nbGUnXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ3RhbGtzJywge1xyXG4gICAgICAgICAgICB1cmw6IFwiL3RhbGtzXCIsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcIi9zdGF0aWMvcGFydGlhbHMvdGFsa3MuaHRtbFwiLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAndGFsa3NDdHJsIGFzIHRhbGtzJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCd0YWxrcy1zaW5nbGUnLCB7XHJcbiAgICAgICAgICAgIHVybDogXCIvdGFsa3Mtc2luZ2xlLzp0YWxrSWRcIixcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwiL3N0YXRpYy9wYXJ0aWFscy90YWxrcy1zaW5nbGUuaHRtbFwiLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAndGFsa3NTaW5nbGVDdHJsIGFzIHRhbGtzJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCdwcm9maXQnLCB7XHJcbiAgICAgICAgICAgIHVybDogXCIvcHJvZml0XCIsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcIi9zdGF0aWMvcGFydGlhbHMvcHJvZml0Lmh0bWxcIixcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ2FkdmVydHNDdHJsIGFzIGFkdmVydHMnXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ3Byb2ZpdC1zaW5nbGUnLCB7XHJcbiAgICAgICAgICAgIHVybDogXCIvcHJvZml0LXNpbmdsZS86YWR2ZXJ0SWRcIixcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwiL3N0YXRpYy9wYXJ0aWFscy9wcm9maXQtc2luZ2xlLmh0bWxcIixcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ2FkdmVydHNTaW5nbGVDdHJsIGFzIGFkdmVydHMnXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ2RpYWxvZ3MnLCB7XHJcbiAgICAgICAgICAgIHVybDogXCIvZGlhbG9nc1wiLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCIvc3RhdGljL3BhcnRpYWxzL2RpYWxvZ3MuaHRtbFwiLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnZGlhbG9nc0N0cmwgYXMgZGlhbG9ncydcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgnZGlhbG9nLXNpbmdsZScsIHtcclxuICAgICAgICAgICAgdXJsOiBcIi9kaWFsb2ctc2luZ2xlLzpkaWFsb2dJZFwiLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCIvc3RhdGljL3BhcnRpYWxzL2RpYWxvZy1zaW5nbGUuaHRtbFwiLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnZGlhbG9nQ3RybCBhcyBkaWFsb2cnXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ25laWdoYm91cnMnLCB7XHJcbiAgICAgICAgICAgIHVybDogXCIvbmVpZ2hib3Vyc1wiLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCIvc3RhdGljL3BhcnRpYWxzL25laWdoYm91cnMuaHRtbFwiLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnbmVpZ2hib3Vyc0N0cmwgYXMgbmVpZ2hib3VycydcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgncHJvZmlsZScsIHtcclxuICAgICAgICAgICAgdXJsOiBcIi9wcm9maWxlLzp1c2VySWRcIixcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwiL3N0YXRpYy9wYXJ0aWFscy9wcm9maWxlLmh0bWxcIixcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ3Byb2ZpbGVDdHJsIGFzIHByb2ZpbGUnXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ3Byb2ZpbGUuY2hhbmdlLWF2YXRhcicsIHtcclxuICAgICAgICAgICAgdXJsOiBcIi9jaGFuZ2UtYXZhdGFyXCIsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcIi9zdGF0aWMvcGFydGlhbHMvcHJvZmlsZS5jaGFuZ2VBdmF0YXIuaHRtbFwiLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnY2hhbmdlQXZhdGFyQ3RybCBhcyBjaGFuZ2VBdmF0YXInXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ3NldHRpbmdzJywge1xyXG4gICAgICAgICAgICB1cmw6IFwiL3NldHRpbmdzXCIsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcIi9zdGF0aWMvcGFydGlhbHMvc2V0dGluZ3MuaHRtbFwiLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnc2V0dGluZ3NDdHJsIGFzIHNldHRpbmdzJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCdtYXBzJywge1xyXG4gICAgICAgICAgICB1cmw6IFwiL21hcHNcIixcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwiL3N0YXRpYy9wYXJ0aWFscy9tYXBzLmh0bWxcIixcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ21hcHNDdHJsIGFzIG1hcHMnXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ3NldC1pbmZvJywge1xyXG4gICAgICAgICAgICB1cmw6IFwiL3NldC1pbmZvXCIsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcIi9zdGF0aWMvcGFydGlhbHMvc2V0LWluZm8uaHRtbFwiLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnc2V0SW5mb0N0cmwgYXMgc2V0SW5mbydcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgnY291bnRlcnMnLCB7XHJcbiAgICAgICAgICAgIHVybDogXCIvY291bnRlcnNcIixcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwiL3N0YXRpYy9wYXJ0aWFscy9jb3VudGVycy5odG1sXCIsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdjb3VudGVyc0N0cmwgYXMgY291bnRlcnMnXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ2NvdW50ZXJzLWhpc3RvcnknLCB7XHJcbiAgICAgICAgICAgIHVybDogXCIvY291bnRlcnMtaGlzdG9yeS86Y291bnRlcklkXCIsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcIi9zdGF0aWMvcGFydGlhbHMvY291bnRlcnMtaGlzdG9yeS5odG1sXCIsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdjb3VudGVyc0hpc3RvcnlDdHJsIGFzIGNvdW50ZXJzSGlzdG9yeSdcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgnaW1wb3J0YW50Jywge1xyXG4gICAgICAgICAgICB1cmw6IFwiL2ltcG9ydGFudFwiLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCIvc3RhdGljL3BhcnRpYWxzL2ltcG9ydGFudC5odG1sXCIsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdpbXBvcnRhbnRDdHJsIGFzIGltcG9ydGFudCdcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgnbmVhcmJ5Jywge1xyXG4gICAgICAgICAgICB1cmw6IFwiL25lYXJieVwiLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCIvc3RhdGljL3BhcnRpYWxzL25lYXJieS5odG1sXCIsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICduZWFyYnlDdHJsIGFzIG5lYXJieSdcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgnbmVhcmJ5LXNpbmdsZScsIHtcclxuICAgICAgICAgICAgdXJsOiBcIi9uZWFyYnktc2luZ2xlLzpuZWFyYnlJZFwiLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCIvc3RhdGljL3BhcnRpYWxzL25lYXJieS1zaW5nbGUuaHRtbFwiLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnbmVhcmJ5U2luZ2xlQ3RybCBhcyBuZWFyYnknXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ3J1YnJpY3MnLCB7XHJcbiAgICAgICAgICAgIHVybDogXCIvcnVicmljcy86cnVicmljSWRcIixcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwiL3N0YXRpYy9wYXJ0aWFscy9ydWJyaWNzLmh0bWxcIixcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ3J1YnJpY3NDdHJsIGFzIHRhbGtzJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCdydWJyaWNzLXNpbmdsZScsIHtcclxuICAgICAgICAgICAgdXJsOiBcIi9ydWJyaWMtc2luZ2xlLzpydWJyaWNJZFwiLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCIvc3RhdGljL3BhcnRpYWxzL3J1YnJpY3Mtc2luZ2xlLmh0bWxcIixcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ3J1YnJpY3NTaW5nbGVDdHJsIGFzIHRhbGtzJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCdibG9nJywge1xyXG4gICAgICAgICAgICB1cmw6IFwiL2Jsb2dcIlxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCdhYm91dCcsIHtcclxuICAgICAgICAgICAgdXJsOiBcIi9hYm91dFwiXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ2NvbnRhY3RzJywge1xyXG4gICAgICAgICAgICB1cmw6IFwiL2NvbnRhY3RzXCJcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgnY2FiaW5ldCcsIHtcclxuICAgICAgICAgICAgdXJsOiBcIi9jYWJpbmV0XCIsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcIi9zdGF0aWMvcGFydGlhbHMvYnVzaW5lc3MvY2FiaW5ldC5odG1sXCIsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdjYWJpbmV0Q3RybCBhcyBuZWFyYnknXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ2VkaXQnLCB7XHJcbiAgICAgICAgICAgIHVybDogXCIvZWRpdFwiLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCIvc3RhdGljL3BhcnRpYWxzL2J1c2luZXNzL2VkaXQuaHRtbFwiLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnZWRpdEN0cmwgYXMgZWRpdCdcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgnc3RhdGlzdGljJywge1xyXG4gICAgICAgICAgICB1cmw6IFwiL3N0YXRpc3RpY1wiLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCIvc3RhdGljL3BhcnRpYWxzL2J1c2luZXNzL3N0YXRpc3RpYy5odG1sXCIsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdzdGF0aXN0aWNDdHJsIGFzIG1hcHMnXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHRydWUpO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBbICckc3RhdGVQcm92aWRlcicsJyR1cmxSb3V0ZXJQcm92aWRlcicsJyRsb2NhdGlvblByb3ZpZGVyJywgY29uZmlnIF07XHJcblxyXG4vKm1haW4uY29uZmlnKGZ1bmN0aW9uKCRsb2NhdGlvblByb3ZpZGVyKXtcclxuICAgICRsb2NhdGlvblByb3ZpZGVyLmh0bWw1TW9kZSh0cnVlKTtcclxufSk7Ki9cclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIGFib3V0Q3RybCA9IGZ1bmN0aW9uKCRyb290U2NvcGUpIHtcclxuXHJcbiAgICAkcm9vdFNjb3BlLmJhc2UuaXNGb290ZXJCb3R0b20gPSB0cnVlO1xyXG5cclxuICAgICQoJy5uZy1jbG9haycpLnJlbW92ZUNsYXNzKCduZy1jbG9haycpO1xyXG5cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gWyAnJHJvb3RTY29wZScsIGFib3V0Q3RybCBdOyIsIlxyXG52YXIgYWR2ZXJ0c0N0cmwgPSBmdW5jdGlvbigkcm9vdFNjb3BlKSB7XHJcbiAgICAgICAgdmFyIGFkdmVydHMgPSB0aGlzO1xyXG5cclxuICAgICAgICBhZHZlcnRzLmF0dGFjaElkID0gXCIwMDAwMFwiO1xyXG4gICAgICAgICRyb290U2NvcGUuc2V0VGFiKDMpO1xyXG4gICAgICAgICRyb290U2NvcGUuYmFzZS5zaG93QWxsR3JvdXBzKCk7XHJcbiAgICAgICAgJHJvb3RTY29wZS5iYXNlLmlzRm9vdGVyQm90dG9tID0gZmFsc2U7XHJcbiAgICAgICAgc2hvd0dyb3VwT3ZlckJ1aWxkaW5nKCRyb290U2NvcGUuZ3JvdXBzKTtcclxuXHJcbiAgICAgICAgLyppZighJHJvb3RTY29wZS5pbXBvcnRhbnRJc0xvYWRlZEZyb21Ub3ApXHJcbiAgICAgICAgICAgICRyb290U2NvcGUuaW1wb3J0YW50VG9waWNzID0gbWVzc2FnZUNsaWVudC5nZXRJbXBvcnRhbnROZXdzKCRyb290U2NvcGUuY3VycmVudEdyb3VwLmlkKTtcclxuICAgICAgICAkcm9vdFNjb3BlLmltcG9ydGFudElzTG9hZGVkRnJvbVRvcCA9IGZhbHNlOyovXHJcblxyXG4gICAgICAgIC8qaW5pdEF0dGFjaEltYWdlKCQoJyNhdHRhY2hJbWFnZS0wMDAwMCcpLCAkKCcjYXR0YWNoLWFyZWEtMDAwMDAnKSk7IC8vINC00LvRjyDQvtCx0YHRg9C20LTQtdC90LjQuVxyXG4gICAgICAgIGluaXRBdHRhY2hEb2MoJCgnI2F0dGFjaERvYy0wMDAwMCcpLCAkKCcjYXR0YWNoLWRvYy1hcmVhLTAwMDAwJykpOyAvLyDQtNC70Y8g0L7QsdGB0YPQttC00LXQvdC40LkqL1xyXG4gICAgICAgIGluaXRGYW5jeUJveCgkKCcuYWR2ZXJ0cycpKTtcclxuXHJcbiAgICAgICAgJHJvb3RTY29wZS5iYXNlLmNyZWF0ZVRvcGljSXNIaWRlID0gdHJ1ZTtcclxuICAgICAgICBhZHZlcnRzLmlzQWR2ZXJ0c0xvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgIGFkdmVydHMuZ3JvdXBzID0gdXNlckNsaWVudEdyb3VwcztcclxuXHJcbiAgICAgICAgYWR2ZXJ0cy5pc1RhbGsgPSB0cnVlO1xyXG4gICAgICAgIGFkdmVydHMuaXNBZHZlcnQgPSB0cnVlO1xyXG5cclxuICAgICAgICBhZHZlcnRzLm1lc3NhZ2UgPSB7fTtcclxuICAgICAgICBhZHZlcnRzLm1lc3NhZ2UuY29udGVudCA9IGFkdmVydHMubWVzc2FnZS5kZWZhdWx0ID0gVEVYVF9ERUZBVUxUXzM7XHJcbiAgICAgICAgYWR2ZXJ0cy5zdWJqZWN0ID0gVEVYVF9ERUZBVUxUXzQ7XHJcblxyXG4gICAgICAgICRyb290U2NvcGUuYmFzZS5idWZmZXJTZWxlY3RlZEdyb3VwID0gYWR2ZXJ0cy5zZWxlY3RlZEdyb3VwID1cclxuICAgICAgICAkcm9vdFNjb3BlLmN1cnJlbnRHcm91cCA9IHVzZXJDbGllbnRHcm91cHNbM107XHJcblxyXG4gICAgICAgICRyb290U2NvcGUuY3VycmVudFJ1YnJpYyA9IG51bGw7XHJcblxyXG4gICAgICAgICRyb290U2NvcGUuYmFzZS5pbml0U3RhcnRQYXJhbXNGb3JDcmVhdGVUb3BpYyhhZHZlcnRzKTtcclxuXHJcbiAgICAgICAgYWR2ZXJ0cy5hbnN3ZXJGaXJzdE1lc3NhZ2UgPSBURVhUX0RFRkFVTFRfMjtcclxuXHJcbiAgICAgICAgYWR2ZXJ0cy50b3BpY3MgPSBtZXNzYWdlQ2xpZW50LmdldEFkdmVydHMoYWR2ZXJ0cy5zZWxlY3RlZEdyb3VwLmlkLCAwLCAxMDAwKS50b3BpY3M7XHJcblxyXG4gICAgICAgIGluaXRBZHZlcnRzKCk7XHJcblxyXG4gICAgICAgIGlmICghYWR2ZXJ0cy50b3BpY3MpIGFkdmVydHMudG9waWNzID0gW107XHJcblxyXG4gICAgICAgICRyb290U2NvcGUuc2VsZWN0R3JvdXBJbkRyb3Bkb3duX2FkdmVydHMgPSBmdW5jdGlvbihncm91cElkKXtcclxuICAgICAgICAgICAgYWR2ZXJ0cy5zZWxlY3RlZEdyb3VwID0gJHJvb3RTY29wZS5iYXNlLmJ1ZmZlclNlbGVjdGVkR3JvdXAgPSBzZWxlY3RHcm91cEluRHJvcGRvd24oZ3JvdXBJZCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaW5pdEFkdmVydHMoKXtcclxuICAgICAgICAgICAgdmFyIHRvcGljTGVuZ3RoO1xyXG4gICAgICAgICAgICBhZHZlcnRzLnRvcGljcyA/IHRvcGljTGVuZ3RoID0gYWR2ZXJ0cy50b3BpY3MubGVuZ3RoIDogdG9waWNMZW5ndGggPSAwO1xyXG5cclxuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRvcGljTGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgICAgICBhZHZlcnRzLnRvcGljc1tpXS5sYXN0VXBkYXRlRWRpdCA9IGdldFRpbWluZyhhZHZlcnRzLnRvcGljc1tpXS5sYXN0VXBkYXRlKTtcclxuICAgICAgICAgICAgICAgIGFkdmVydHMudG9waWNzW2ldLmxhYmVsID0gZ2V0TGFiZWwoYWR2ZXJ0cy5ncm91cHMsYWR2ZXJ0cy50b3BpY3NbaV0uZ3JvdXBUeXBlKTtcclxuICAgICAgICAgICAgICAgIGFkdmVydHMudG9waWNzW2ldLnRhZ0NvbG9yID0gZ2V0VGFnQ29sb3IoYWR2ZXJ0cy50b3BpY3NbaV0ubGFiZWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkcm9vdFNjb3BlLmFkdmVydHNDaGFuZ2VHcm91cCA9IGZ1bmN0aW9uKGdyb3VwSWQpe1xyXG5cclxuICAgICAgICAgICAgYWR2ZXJ0cy50b3BpY3MgPSBtZXNzYWdlQ2xpZW50LmdldEFkdmVydHMoZ3JvdXBJZCwwLDEwMDApLnRvcGljcztcclxuXHJcbiAgICAgICAgICAgIGlmKGFkdmVydHMudG9waWNzKSB7XHJcbiAgICAgICAgICAgICAgICBpbml0QWR2ZXJ0cygpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRyb290U2NvcGUuc2VsZWN0R3JvdXAoZ2V0QnVpbGRpbmdHcm91cCgkcm9vdFNjb3BlLmN1cnJlbnRHcm91cCkpO1xyXG5cclxuICAgICAgICAkKCcubmctY2xvYWsnKS5yZW1vdmVDbGFzcygnbmctY2xvYWsnKTtcclxuXHJcbiAgICB9O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBbICckcm9vdFNjb3BlJywgYWR2ZXJ0c0N0cmwgXTsiLCJcclxudmFyIGFkdmVydHNTaW5nbGVDdHJsID0gZnVuY3Rpb24oJHJvb3RTY29wZSwkc3RhdGVQYXJhbXMpIHtcclxuICAgICAgICB2YXIgYWR2ZXJ0ID0gdGhpcyxcclxuICAgICAgICAgICAgZnVsbFRhbGtNZXNzYWdlc0xlbmd0aCxcclxuICAgICAgICAgICAgYWR2ZXJ0SWQgPSAkc3RhdGVQYXJhbXMuYWR2ZXJ0SWQ7XHJcblxyXG4gICAgICAgICRyb290U2NvcGUuYmFzZS5pc0Zvb3RlckJvdHRvbSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAkcm9vdFNjb3BlLmJhc2UubGFzdExvYWRlZElkID0gMDtcclxuICAgICAgICAkcm9vdFNjb3BlLmJhc2UuaXNFYXJsaWVzdE1lc3NhZ2VzID0gZmFsc2U7XHJcbiAgICAgICAgJHJvb3RTY29wZS5iYXNlLmVuZE9mTG9hZGVkID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8qaWYoISRyb290U2NvcGUuaW1wb3J0YW50SXNMb2FkZWRGcm9tVG9wKVxyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLmltcG9ydGFudFRvcGljcyA9IG1lc3NhZ2VDbGllbnQuZ2V0SW1wb3J0YW50TmV3cygkcm9vdFNjb3BlLmN1cnJlbnRHcm91cC5pZCk7XHJcbiAgICAgICAgJHJvb3RTY29wZS5pbXBvcnRhbnRJc0xvYWRlZEZyb21Ub3AgPSBmYWxzZTsqL1xyXG5cclxuICAgICAgICBhZHZlcnQuYXR0YWNoSWQgPSBcIjAwMDAwXCI7XHJcbiAgICAgICAgYWR2ZXJ0LnNlbGVjdGVkR3JvdXAgPSAkcm9vdFNjb3BlLmN1cnJlbnRHcm91cDtcclxuICAgICAgICBhZHZlcnQudG9waWNzID0gbWVzc2FnZUNsaWVudC5nZXRBZHZlcnRzKGFkdmVydC5zZWxlY3RlZEdyb3VwLmlkLCAwLCAxMDAwKS50b3BpY3M7XHJcbiAgICAgICAgYWR2ZXJ0LmZ1bGxUYWxrVG9waWMgPSB7fTtcclxuICAgICAgICBhZHZlcnQuZnVsbFRhbGtNZXNzYWdlcyA9IHt9O1xyXG4gICAgICAgIGFkdmVydC5mdWxsVGFsa0ZpcnN0TWVzc2FnZXMgPSBbXTtcclxuICAgICAgICBhZHZlcnQuZ3JvdXBzID0gdXNlckNsaWVudEdyb3VwcztcclxuXHJcbiAgICAgICAgYWR2ZXJ0LmlzVGFsayA9IHRydWU7XHJcblxyXG4gICAgICAgICRyb290U2NvcGUuYmFzZS5pbml0U3RhcnRQYXJhbXNGb3JDcmVhdGVNZXNzYWdlKGFkdmVydCk7XHJcblxyXG4gICAgICAgIHZhciBzaG93RnVsbFRhbGsgPSBmdW5jdGlvbihhZHZlcnQsYWR2ZXJ0T3V0c2lkZUlkKXtcclxuXHJcbiAgICAgICAgICAgIGluaXRGYW5jeUJveCgkKCcuYWR2ZXJ0cy1zaW5nbGUnKSk7XHJcbiAgICAgICAgICAgIHZhciB0b3BpY0xlbmd0aDtcclxuICAgICAgICAgICAgYWR2ZXJ0LnRvcGljcyA/IHRvcGljTGVuZ3RoID0gYWR2ZXJ0LnRvcGljcy5sZW5ndGggOiB0b3BpY0xlbmd0aCA9IDA7XHJcblxyXG4gICAgICAgICAgICB2YXIgYWR2ZXJ0SWQgPSBhZHZlcnRPdXRzaWRlSWQsXHJcbiAgICAgICAgICAgICAgICBmdWxsVGFsa0ZpcnN0TWVzc2FnZXNMZW5ndGg7XHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0b3BpY0xlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGlmKGFkdmVydElkID09IGFkdmVydC50b3BpY3NbaV0uaWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGFkdmVydC5mdWxsVGFsa1RvcGljID0gYWR2ZXJ0LnRvcGljc1tpXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5iYXNlLmluaXRTdGFydFBhcmFtc0ZvckNyZWF0ZVRvcGljKGFkdmVydC5mdWxsVGFsa1RvcGljKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYWR2ZXJ0LmZ1bGxUYWxrVG9waWMuaXNUYWxrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBhZHZlcnQuZnVsbFRhbGtUb3BpYy5pc0FkdmVydCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYWR2ZXJ0LmZ1bGxUYWxrVG9waWMubWVzc2FnZS5jcmVhdGVkRWRpdCA9IGdldFRpbWluZyhhZHZlcnQuZnVsbFRhbGtUb3BpYy5tZXNzYWdlLmNyZWF0ZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGFkdmVydC5mdWxsVGFsa1RvcGljLmxhYmVsID0gZ2V0TGFiZWwoYWR2ZXJ0Lmdyb3VwcyxhZHZlcnQuZnVsbFRhbGtUb3BpYy5ncm91cFR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGFkdmVydC5mdWxsVGFsa1RvcGljLnRhZ0NvbG9yID0gZ2V0VGFnQ29sb3IoYWR2ZXJ0LmZ1bGxUYWxrVG9waWMubGFiZWwpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihhZHZlcnQuZnVsbFRhbGtUb3BpYy5wb2xsICE9IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgc2V0UG9sbEVkaXROYW1lcyhhZHZlcnQuZnVsbFRhbGtUb3BpYy5wb2xsKTtcclxuICAgICAgICAgICAgICAgIGFkdmVydC5mdWxsVGFsa1RvcGljLm1ldGFUeXBlID0gXCJwb2xsXCI7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgYWR2ZXJ0LmZ1bGxUYWxrVG9waWMubWV0YVR5cGUgPSBcIm1lc3NhZ2VcIjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYWR2ZXJ0LmZ1bGxUYWxrRmlyc3RNZXNzYWdlcyA9IG1lc3NhZ2VDbGllbnQuZ2V0Rmlyc3RMZXZlbE1lc3NhZ2VzKGFkdmVydElkLGFkdmVydC5zZWxlY3RlZEdyb3VwLmlkLDYsJHJvb3RTY29wZS5iYXNlLmxhc3RMb2FkZWRJZCwwLDEwKS5tZXNzYWdlcztcclxuXHJcbiAgICAgICAgICAgICRyb290U2NvcGUuYmFzZS5sYXN0TG9hZGVkSWQgPSAkcm9vdFNjb3BlLmJhc2UuaW5pdEZpcnN0TWVzc2FnZXMoYWR2ZXJ0LmZ1bGxUYWxrRmlyc3RNZXNzYWdlcyk7XHJcblxyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLmJhc2UuaXNBZHZlcnRUaXRsZXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS5iYXNlLm1haW5Db250ZW50VG9wSXNIaWRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS5iYXNlLmNyZWF0ZVRvcGljSXNIaWRlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICRyb290U2NvcGUuYmFzZS5hZHZlcnQgPSBhZHZlcnQ7XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHNob3dGdWxsVGFsayhhZHZlcnQsYWR2ZXJ0SWQpO1xyXG5cclxuICAgICAgICB2YXIgaW5pdEZsYWdzVG9waWMgPSBbXTtcclxuICAgICAgICBhZHZlcnQuc2hvd1RvcGljQW5zd2VySW5wdXQgPSBmdW5jdGlvbihldmVudCxmdWxsVGFsa1RvcGljKXtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIGFkdmVydC5hbnN3ZXJTaG93ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGlmKCFpbml0RmxhZ3NUb3BpY1tmdWxsVGFsa1RvcGljLmlkXSkge1xyXG4gICAgICAgICAgICAgICAvLyBpbml0QXR0YWNoSW1hZ2UoJCgnI2F0dGFjaEltYWdlLScgKyBmdWxsVGFsa1RvcGljLmlkKSwgJCgnI2F0dGFjaC1hcmVhLScgKyBmdWxsVGFsa1RvcGljLmlkKSk7XHJcbiAgICAgICAgICAgICAgICAvL2luaXRBdHRhY2hEb2MoJCgnI2F0dGFjaERvYy0nICsgZnVsbFRhbGtUb3BpYy5pZCksICQoJyNhdHRhY2gtZG9jLWFyZWEtJyArIGZ1bGxUYWxrVG9waWMuaWQpKTtcclxuICAgICAgICAgICAgICAgIGluaXRGbGFnc1RvcGljW2Z1bGxUYWxrVG9waWMuaWRdID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYWR2ZXJ0LmZ1bGxUYWxrVG9waWMuYW5zd2VySW5wdXRJc1Nob3cgP1xyXG4gICAgICAgICAgICAgICAgYWR2ZXJ0LmZ1bGxUYWxrVG9waWMuYW5zd2VySW5wdXRJc1Nob3cgPSBmYWxzZSA6XHJcbiAgICAgICAgICAgICAgICBhZHZlcnQuZnVsbFRhbGtUb3BpYy5hbnN3ZXJJbnB1dElzU2hvdyA9IHRydWUgO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHZhciBpbml0RmxhZ3NNZXNzYWdlID0gW107XHJcbiAgICAgICAgYWR2ZXJ0LnNob3dNZXNzYWdlQW5zd2VySW5wdXQgPSBmdW5jdGlvbihldmVudCxmdWxsVGFsa1RvcGljLGZpcnN0TWVzc2FnZSxtZXNzYWdlKXtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgdmFyIGF0dGFjaElkO1xyXG5cclxuICAgICAgICAgICAgaWYoIW1lc3NhZ2Upe1xyXG4gICAgICAgICAgICAgICAgLy8g0LXRgdC70Lgg0Y3RgtC+INGB0L7QvtCx0YnQtdC90LjQtSDQv9C10YDQstC+0LPQviDRg9GA0L7QstC90Y9cclxuICAgICAgICAgICAgICAgIGF0dGFjaElkID0gZnVsbFRhbGtUb3BpYy5pZCsnLScrZmlyc3RNZXNzYWdlLmlkO1xyXG5cclxuICAgICAgICAgICAgICAgIGZpcnN0TWVzc2FnZS5pc1RhbGsgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKCFhZHZlcnQuZnVsbGFkdmVydEZpcnN0TWVzc2FnZXMpIGFkdmVydC5mdWxsYWR2ZXJ0Rmlyc3RNZXNzYWdlcyA9IG1lc3NhZ2VDbGllbnQuZ2V0Rmlyc3RMZXZlbE1lc3NhZ2VzKGFkdmVydElkLGFkdmVydC5zZWxlY3RlZEdyb3VwLmlkLDYsMCwwLDEwMDApLm1lc3NhZ2VzO1xyXG4gICAgICAgICAgICAgICAgdmFyIGZ1bGxhZHZlcnRGaXJzdE1lc3NhZ2VzTGVuZ3RoID0gYWR2ZXJ0LmZ1bGxhZHZlcnRGaXJzdE1lc3NhZ2VzLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmJhc2UuaW5pdFN0YXJ0UGFyYW1zRm9yQ3JlYXRlTWVzc2FnZShmaXJzdE1lc3NhZ2UpO1xyXG5cclxuICAgICAgICAgICAgICAgIGZpcnN0TWVzc2FnZS5hbnN3ZXJJbnB1dElzU2hvdyA/XHJcbiAgICAgICAgICAgICAgICAgICAgZmlyc3RNZXNzYWdlLmFuc3dlcklucHV0SXNTaG93ID0gZmFsc2UgOlxyXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0TWVzc2FnZS5hbnN3ZXJJbnB1dElzU2hvdyA9IHRydWU7XHJcblxyXG5cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAvLyDQtdGB0LvQuCDQv9GA0L7RgdGC0L7QtSDRgdC+0L7QsdGJ0LXQvdC40LVcclxuICAgICAgICAgICAgICAgIGF0dGFjaElkID0gZnVsbFRhbGtUb3BpYy5pZCsnLScrbWVzc2FnZS5pZDtcclxuXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlLmlzVGFsayA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoIWFkdmVydC5mdWxsVGFsa01lc3NhZ2VzW2ZpcnN0TWVzc2FnZS5pZF0pIGFkdmVydC5mdWxsVGFsa01lc3NhZ2VzW2ZpcnN0TWVzc2FnZS5pZF0gPSBtZXNzYWdlQ2xpZW50LmdldE1lc3NhZ2VzKGFkdmVydElkLGFkdmVydC5zZWxlY3RlZEdyb3VwLmlkLDYsZmlyc3RNZXNzYWdlLmlkLDAsMTAwMCkubWVzc2FnZXM7XHJcbiAgICAgICAgICAgICAgICB2YXIgIGZ1bGxUYWxrTWVzc2FnZXNMZW5ndGggPSBhZHZlcnQuZnVsbFRhbGtNZXNzYWdlc1tmaXJzdE1lc3NhZ2UuaWRdLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmJhc2UuaW5pdFN0YXJ0UGFyYW1zRm9yQ3JlYXRlTWVzc2FnZShtZXNzYWdlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlLmFuc3dlcklucHV0SXNTaG93ID9cclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLmFuc3dlcklucHV0SXNTaG93ID0gZmFsc2UgOlxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuYW5zd2VySW5wdXRJc1Nob3cgPSB0cnVlO1xyXG5cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKCFpbml0RmxhZ3NNZXNzYWdlW2F0dGFjaElkXSkge1xyXG4gICAgICAgICAgICAgICAgLy9pbml0QXR0YWNoSW1hZ2UoJCgnI2F0dGFjaEltYWdlLScgKyBhdHRhY2hJZCksICQoJyNhdHRhY2gtYXJlYS0nICsgYXR0YWNoSWQpKTtcclxuICAgICAgICAgICAgICAgIC8vaW5pdEF0dGFjaERvYygkKCcjYXR0YWNoRG9jLScgKyBhdHRhY2hJZCksICQoJyNhdHRhY2gtZG9jLWFyZWEtJyArIGF0dGFjaElkKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaW5pdEZsYWdzTWVzc2FnZVthdHRhY2hJZF0gPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgYWR2ZXJ0LnRvZ2dsZVRyZWVGaXJzdE1lc3NhZ2UgPSBmdW5jdGlvbihldmVudCxmaXJzdE1lc3NhZ2Upe1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgZmlyc3RNZXNzYWdlLmlzVHJlZU9wZW4gP1xyXG4gICAgICAgICAgICAgICAgZmlyc3RNZXNzYWdlLmlzVHJlZU9wZW4gPSBmYWxzZSA6XHJcbiAgICAgICAgICAgICAgICBmaXJzdE1lc3NhZ2UuaXNUcmVlT3BlbiA9IHRydWUgO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vIC0tLS0tLS0tXHJcblxyXG4gICAgICAgICAgICBhZHZlcnQuZnVsbFRhbGtNZXNzYWdlc1tmaXJzdE1lc3NhZ2UuaWRdID0gbWVzc2FnZUNsaWVudC5nZXRNZXNzYWdlcyhhZHZlcnRJZCxhZHZlcnQuc2VsZWN0ZWRHcm91cC5pZCwxLGZpcnN0TWVzc2FnZS5pZCwwLDEwMDApLm1lc3NhZ2VzO1xyXG4gICAgICAgICAgICBhZHZlcnQuZnVsbFRhbGtNZXNzYWdlc1tmaXJzdE1lc3NhZ2UuaWRdID9cclxuICAgICAgICAgICAgICAgIGZ1bGxUYWxrTWVzc2FnZXNMZW5ndGggPSBhZHZlcnQuZnVsbFRhbGtNZXNzYWdlc1tmaXJzdE1lc3NhZ2UuaWRdLmxlbmd0aDpcclxuICAgICAgICAgICAgICAgIGZ1bGxUYWxrTWVzc2FnZXNMZW5ndGggPSAwO1xyXG4gICAgICAgICAgICBpZihhZHZlcnQuZnVsbFRhbGtNZXNzYWdlc1tmaXJzdE1lc3NhZ2UuaWRdID09PSBudWxsKSBhZHZlcnQuZnVsbFRhbGtNZXNzYWdlc1tmaXJzdE1lc3NhZ2UuaWRdID0gW107XHJcblxyXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgZnVsbFRhbGtNZXNzYWdlc0xlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGFkdmVydC5mdWxsVGFsa01lc3NhZ2VzW2ZpcnN0TWVzc2FnZS5pZF1baV0uYW5zd2VySW5wdXRJc1Nob3cgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGFkdmVydC5mdWxsVGFsa01lc3NhZ2VzW2ZpcnN0TWVzc2FnZS5pZF1baV0uaXNUcmVlT3BlbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBhZHZlcnQuZnVsbFRhbGtNZXNzYWdlc1tmaXJzdE1lc3NhZ2UuaWRdW2ldLmlzT3BlbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBhZHZlcnQuZnVsbFRhbGtNZXNzYWdlc1tmaXJzdE1lc3NhZ2UuaWRdW2ldLmlzUGFyZW50T3BlbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBhZHZlcnQuZnVsbFRhbGtNZXNzYWdlc1tmaXJzdE1lc3NhZ2UuaWRdW2ldLmNyZWF0ZWRFZGl0ID0gZ2V0VGltaW5nKGFkdmVydC5mdWxsVGFsa01lc3NhZ2VzW2ZpcnN0TWVzc2FnZS5pZF1baV0uY3JlYXRlZCk7XHJcbiAgICAgICAgICAgICAgICBhZHZlcnQuZnVsbFRhbGtNZXNzYWdlc1tmaXJzdE1lc3NhZ2UuaWRdW2ldLmFuc3dlck1lc3NhZ2UgPSBURVhUX0RFRkFVTFRfMjtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgYWR2ZXJ0LnRvZ2dsZVRyZWUgPSBmdW5jdGlvbihldmVudCxtZXNzYWdlLGZpcnN0TWVzc2FnZSl7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICBpZighYWR2ZXJ0LmZ1bGxUYWxrTWVzc2FnZXNbZmlyc3RNZXNzYWdlLmlkXSkgYWR2ZXJ0LmZ1bGxUYWxrTWVzc2FnZXNbZmlyc3RNZXNzYWdlLmlkXSA9IG1lc3NhZ2VDbGllbnQuZ2V0TWVzc2FnZXMoYWR2ZXJ0SWQsYWR2ZXJ0LnNlbGVjdGVkR3JvdXAuaWQsMSxmaXJzdE1lc3NhZ2UuaWQsMCwxMDAwKS5tZXNzYWdlcztcclxuICAgICAgICAgICAgdmFyIGZ1bGxUYWxrTWVzc2FnZXNMZW5ndGggPSBhZHZlcnQuZnVsbFRhbGtNZXNzYWdlc1tmaXJzdE1lc3NhZ2UuaWRdLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgIG1lc3NhZ2UuaXNUcmVlT3BlbiA/XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlLmlzVHJlZU9wZW4gPSBmYWxzZSA6XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlLmlzVHJlZU9wZW4gPSB0cnVlIDtcclxuXHJcbiAgICAgICAgICAgIHZhciBhZnRlckN1cnJlbnRJbmRleCA9IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgbmV4dE1lc3NhZ2VPbkN1cnJlbnRMZXZlbCA9IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgbG9vcE1lc3NhZ2VPZmZzZXQsXHJcbiAgICAgICAgICAgICAgICBwYXJlbnRPcGVuU3RhdHVzLFxyXG4gICAgICAgICAgICAgICAgYXJlQWxsTXlQYXJlbnRzVHJlZU9wZW4gPSBbXSxcclxuICAgICAgICAgICAgICAgIGNoZWNrQXJlQWxsTXlQYXJlbnRzVHJlZU9wZW4gPSB0cnVlLFxyXG4gICAgICAgICAgICAgICAgYmVnaW5PZmZzZXQgPSBtZXNzYWdlLm9mZnNldCxcclxuICAgICAgICAgICAgICAgIHBhcmVudE9wZW5TdGF0dXNBcnJheSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGZ1bGxUYWxrTWVzc2FnZXNMZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBsb29wTWVzc2FnZU9mZnNldCA9IGFkdmVydC5mdWxsVGFsa01lc3NhZ2VzW2ZpcnN0TWVzc2FnZS5pZF1baV0ub2Zmc2V0O1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKGFmdGVyQ3VycmVudEluZGV4ICYmICFuZXh0TWVzc2FnZU9uQ3VycmVudExldmVsXHJcbiAgICAgICAgICAgICAgICAgICAgJiYgbWVzc2FnZS5vZmZzZXQgPCBsb29wTWVzc2FnZU9mZnNldCl7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGFyZUFsbE15UGFyZW50c1RyZWVPcGVuW2xvb3BNZXNzYWdlT2Zmc2V0XSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGxvb3BNZXNzYWdlT2Zmc2V0IC0gbWVzc2FnZS5vZmZzZXQgPT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v0LXRgdC70Lgg0Y3RgtC+INC90LXQv9C+0YHRgNC10LTRgdGC0LLQtdC90L3Ri9C5INC/0L7RgtC+0LzQvtC6XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhZHZlcnQuZnVsbFRhbGtNZXNzYWdlc1tmaXJzdE1lc3NhZ2UuaWRdW2ldLmlzT3BlbiA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZHZlcnQuZnVsbFRhbGtNZXNzYWdlc1tmaXJzdE1lc3NhZ2UuaWRdW2ldLmlzT3BlbiA9IGZhbHNlIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkdmVydC5mdWxsVGFsa01lc3NhZ2VzW2ZpcnN0TWVzc2FnZS5pZF1baV0uaXNPcGVuID0gdHJ1ZSA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRPcGVuU3RhdHVzQXJyYXlbbG9vcE1lc3NhZ2VPZmZzZXRdID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50T3BlblN0YXR1cyA9IGFkdmVydC5mdWxsVGFsa01lc3NhZ2VzW2ZpcnN0TWVzc2FnZS5pZF1baV0uaXNPcGVuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFhZHZlcnQuZnVsbFRhbGtNZXNzYWdlc1tmaXJzdE1lc3NhZ2UuaWRdW2ldLmlzVHJlZU9wZW4pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJlQWxsTXlQYXJlbnRzVHJlZU9wZW5bbG9vcE1lc3NhZ2VPZmZzZXRdID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g0LXRgdC70Lgg0Y3RgtC+INC/0YLQvtC80LrQuCDQv9C+0YLQvtC80LrQsFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tBcmVBbGxNeVBhcmVudHNUcmVlT3BlbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcih2YXIgaiA9IGJlZ2luT2Zmc2V0OyBqIDwgbG9vcE1lc3NhZ2VPZmZzZXQ7IGorKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDQv9GA0L7QstC10YDRj9C10Lwg0L3QtdGCINC70Lgg0YMg0LrQvtCz0L4g0LIg0L/RgNC10LTQutCw0YUgaXNUcmVlT3BlbiA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihhcmVBbGxNeVBhcmVudHNUcmVlT3BlbltqXSA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tBcmVBbGxNeVBhcmVudHNUcmVlT3BlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudE9wZW5TdGF0dXMgJiYgY2hlY2tBcmVBbGxNeVBhcmVudHNUcmVlT3BlbiA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZHZlcnQuZnVsbFRhbGtNZXNzYWdlc1tmaXJzdE1lc3NhZ2UuaWRdW2ldLmlzT3BlbiA9IHRydWUgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWR2ZXJ0LmZ1bGxUYWxrTWVzc2FnZXNbZmlyc3RNZXNzYWdlLmlkXVtpXS5pc09wZW4gPSBmYWxzZSA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWFkdmVydC5mdWxsVGFsa01lc3NhZ2VzW2ZpcnN0TWVzc2FnZS5pZF1baV0uaXNUcmVlT3Blbil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDQtdGB0LvQuCDRgyDQutC+0LPQvi3RgtC+INC40Lcg0L/RgNC10LTQutC+0LIg0L3QtSDQvtGC0LrRgNGL0YLQviDQtNC10YDQtdCy0L5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZUFsbE15UGFyZW50c1RyZWVPcGVuW2xvb3BNZXNzYWdlT2Zmc2V0XSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRPcGVuU3RhdHVzQXJyYXlbbG9vcE1lc3NhZ2VPZmZzZXRdID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGFmdGVyQ3VycmVudEluZGV4ICYmIGxvb3BNZXNzYWdlT2Zmc2V0ID09IG1lc3NhZ2Uub2Zmc2V0KXtcclxuICAgICAgICAgICAgICAgICAgICBuZXh0TWVzc2FnZU9uQ3VycmVudExldmVsID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKG1lc3NhZ2UuaWQgPT0gYWR2ZXJ0LmZ1bGxUYWxrTWVzc2FnZXNbZmlyc3RNZXNzYWdlLmlkXVtpXS5pZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgYWZ0ZXJDdXJyZW50SW5kZXggPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdmFyIGJ1ZmYsbGFzdExvYWRlZElkRkY7XHJcbiAgICAgICAgYWR2ZXJ0LmFkZE1vcmVJdGVtcyA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHZhciB0ZW1wID0gbWVzc2FnZUNsaWVudC5nZXRGaXJzdExldmVsTWVzc2FnZXMoYWR2ZXJ0SWQsYWR2ZXJ0LnNlbGVjdGVkR3JvdXAuaWQsMSwkcm9vdFNjb3BlLmJhc2UubGFzdExvYWRlZElkLDAsMTApLFxyXG4gICAgICAgICAgICAgICAgYnVmZiA9IHRlbXAubWVzc2FnZXM7XHJcbiAgICAgICAgICAgIGlmKGJ1ZmYpIHtcclxuICAgICAgICAgICAgICAgIHZhciBidWZmTGVuZ3RoID0gYnVmZi5sZW5ndGg7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoYnVmZkxlbmd0aCAhPSAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuYmFzZS5sYXN0TG9hZGVkSWQgPSBidWZmW2J1ZmZMZW5ndGggLSAxXS5pZDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYobGFzdExvYWRlZElkRkYgIT0gJHJvb3RTY29wZS5iYXNlLmxhc3RMb2FkZWRJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmJhc2UuaW5pdEZpcnN0TWVzc2FnZXMoYnVmZik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkdmVydC5mdWxsVGFsa0ZpcnN0TWVzc2FnZXMgPSBhZHZlcnQuZnVsbFRhbGtGaXJzdE1lc3NhZ2VzLmNvbmNhdChidWZmKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxhc3RMb2FkZWRJZEZGID0gJHJvb3RTY29wZS5iYXNlLmxhc3RMb2FkZWRJZDtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5iYXNlLmVuZE9mTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkKCcubmctY2xvYWsnKS5yZW1vdmVDbGFzcygnbmctY2xvYWsnKTtcclxuICAgIH1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gWyAnJHJvb3RTY29wZScsJyRzdGF0ZVBhcmFtcycsIGFkdmVydHNTaW5nbGVDdHJsIF07IiwiLy92YXIgZm9ydW1Db250cm9sbGVycyA9IGFuZ3VsYXIubW9kdWxlKCdmb3J1bS5jb250cm9sbGVycycsIFsndWkuc2VsZWN0MicsJ2luZmluaXRlLXNjcm9sbCcsJ25nU2FuaXRpemUnLCd5YU1hcCcsJ3VpLmJvb3RzdHJhcCddKTtcclxuXHJcbnZhciBiYXNlQ3RybCA9IGZ1bmN0aW9uKCRzY29wZSwkcm9vdFNjb3BlLCRzdGF0ZSwkZmlsdGVyLCRsb2NhdGlvbikge1xyXG5cclxuICAgICRyb290U2NvcGUuSVNfQlVTSU5FU1MgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVk9faXNfYnVzaW5lc3MnKTtcclxuICAgIC8vJHJvb3RTY29wZS5JU19CVVNJTkVTUyA9IDE7XHJcbiAgICAvL2xvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdWT19pc19idXNpbmVzcycpO1xyXG5cclxuICAgICAgICB2YXIgYmFzZSA9IHRoaXM7XHJcbiAgICAgICAgYmFzZS51cmwgPSAkbG9jYXRpb24udXJsKCk7XHJcbiAgICAgICAgJHNjb3BlLiRvbignJGxvY2F0aW9uQ2hhbmdlU3VjY2VzcycsIGZ1bmN0aW9uKCRldmVudCxuZXdTdGF0ZSxvbGRTdGF0ZSl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjaGFuZ2UnKTtcclxuICAgICAgICAgICAgaWYgKG5ld1N0YXRlLmluZGV4T2YoJ2Jsb2cnKSA9PSAtMSAmJiBuZXdTdGF0ZS5pbmRleE9mKCdhYm91dCcpID09IC0xICYmIG5ld1N0YXRlLmluZGV4T2YoJ2NvbnRhY3RzJykgPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIHZhciBpc0xvZ2luID0gYXV0aENsaWVudC5jaGVja0lmQXV0aG9yaXplZCgpO1xyXG4gICAgICAgICAgICAgICAgaWYoIWlzTG9naW4pIGRvY3VtZW50LmxvY2F0aW9uLnJlcGxhY2UoJy9sb2dpbicpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKCF1c2VyQ2xpZW50R3JvdXBzKSB1c2VyQ2xpZW50R3JvdXBzID0gdXNlckNsaWVudC5nZXRVc2VyR3JvdXBzKCk7XHJcbiAgICAgICAgICAgICAgICBpZighc2hvcnRVc2VySW5mbykgc2hvcnRVc2VySW5mbyA9IHVzZXJDbGllbnQuZ2V0U2hvcnRVc2VySW5mbygpO1xyXG4gICAgICAgICAgICAgICAgaWYoIWhhc1N0YXJ0KSBzdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgYmFzZS51cmwgPSAkbG9jYXRpb24udXJsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICBpZihiYXNlLnVybCAhPSAnL2Jsb2cnICYmIGJhc2UudXJsICE9ICcvYWJvdXQnICYmIGJhc2UudXJsICE9ICcvY29udGFjdHMnKSB7XHJcbiAgICAgICAgaWYoIWhhc1N0YXJ0KSBzdGFydCgpO1xyXG4gICAgfVxyXG4gICAgdmFyIGhhc1N0YXJ0ID0gZmFsc2U7XHJcblxyXG4gICAgZnVuY3Rpb24gc3RhcnQoKXtcclxuICAgICAgICBjb25zb2xlLmxvZygnMScsc2hvcnRVc2VySW5mbyk7XHJcbiAgICAgICAgaGFzU3RhcnQgPSB0cnVlO1xyXG4gICAgICAgICRyb290U2NvcGUuaXNUb3BTZWFyY2hTaG93ID0gdHJ1ZTtcclxuICAgICAgICBiYXNlLm5laWdoYm91cnNMb2FkU3RhdHVzID0gXCJcIjtcclxuICAgICAgICBiYXNlLnByaXZhdGVNZXNzYWdlc0xvYWRTdGF0dXMgPSBcIlwiO1xyXG4gICAgICAgIGJhc2UucHJvZmlsZUxvYWRTdGF0dXMgPSBcIlwiO1xyXG4gICAgICAgIGJhc2Uuc2V0dGluZ3NMb2FkU3RhdHVzID0gXCJcIjtcclxuICAgICAgICBiYXNlLm1hcHNMb2FkU3RhdHVzID0gXCJcIjtcclxuXHJcbiAgICAgICAgYmFzZS5tYWluQ29udGVudFRvcElzSGlkZSA9IGZhbHNlO1xyXG4gICAgICAgIGJhc2UuY3JlYXRlVG9waWNJc0hpZGUgPSB0cnVlO1xyXG4gICAgICAgIGJhc2UubWUgPSBzaG9ydFVzZXJJbmZvO1xyXG5cclxuICAgICAgICBiYXNlLmlzRm9vdGVyQm90dG9tID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGJhc2UuaXNUYWxrVGl0bGVzID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgcmVzZXRQYWdlcyhiYXNlKTtcclxuICAgICAgICBiYXNlLmxlbnRhSXNBY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGJhc2UuZW1wdHlNZXNzYWdlID0gXCLQodC+0L7QsdGJ0LXQvdC40Lkg0L/QvtC60LAg0L3QtdGCXCI7XHJcblxyXG4gICAgICAgIGJhc2UudGV4dGFyZWFCbHVyID0gZnVuY3Rpb24gKG1lc3NhZ2UsIGRlZmF1bHRUZXh0LCBjdHJsLCBpc1RvcGljKSB7XHJcbiAgICAgICAgICAgIGlmIChpc1RvcGljKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobWVzc2FnZSA9PSBcIlwiKSBjdHJsLm1lc3NhZ2UuY29udGVudCA9IGRlZmF1bHRUZXh0O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UgPT0gXCJcIikgY3RybC5jb21tZW50VGV4dCA9IGRlZmF1bHRUZXh0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJhc2UuaXNMZW50YUZvY3VzID0gZmFsc2U7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgYmFzZS50ZXh0YXJlYUZvY3VzID0gZnVuY3Rpb24gKG1lc3NhZ2UsIGRlZmF1bHRUZXh0LCBjdHJsLCBpc1RvcGljKSB7XHJcbiAgICAgICAgICAgIGlmIChpc1RvcGljKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobWVzc2FnZSA9PSBkZWZhdWx0VGV4dCkgY3RybC5tZXNzYWdlLmNvbnRlbnQgPSBcIlwiO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UgPT0gZGVmYXVsdFRleHQpIGN0cmwuY29tbWVudFRleHQgPSBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGJhc2UuYWRkUG9sbElucHV0ID0gZnVuY3Rpb24gKGV2ZW50LCBvYmosIGlzRm9jdXMpIHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBuZXdJbnB1dCA9IHtjb3VudGVyOiAwLCBuYW1lOiBcIlwiIH07XHJcbiAgICAgICAgICAgIG9iai5wb2xsSW5wdXRzLnB1c2gobmV3SW5wdXQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGlzRm9jdXMpIHtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoc2V0TmV3Rm9jdXMsIDIwMCwgJChldmVudC50YXJnZXQpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBzZXROZXdGb2N1cyhlbCkge1xyXG4gICAgICAgICAgICBlbC5wcmV2KCkuZmluZCgnaW5wdXQnKS5mb2N1cygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYmFzZS5zaG93UG9sbCA9IGZ1bmN0aW9uIChldmVudCwgb2JqKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICBvYmouaXNQb2xsU2hvdyA9IHRydWU7XHJcbiAgICAgICAgICAgIG9iai5wb2xsU3ViamVjdCA9IFwiXCI7XHJcbiAgICAgICAgICAgIG9iai5wb2xsID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIG9iai5wb2xsSW5wdXRzID0gW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50ZXI6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjb3VudGVyOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiXCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgb2JqLmlzUG9sbEF2YWlsYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGJhc2UuZG9Qb2xsID0gZnVuY3Rpb24gKGV2ZW50LCBwb2xsKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHBvbGwudmFsdWVzID0gW107XHJcbiAgICAgICAgICAgIHZhciBwb2xsTmFtZXNMZW5ndGggPSBwb2xsLmVkaXROYW1lcy5sZW5ndGg7XHJcbiAgICAgICAgICAgIHZhciBpdGVtO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwb2xsTmFtZXNMZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHBvbGwuZWRpdE5hbWVzW2ldLnZhbHVlID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtID0gaTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIHRlbXBQb2xsID0gbWVzc2FnZUNsaWVudC5kb1BvbGwocG9sbC5wb2xsSWQsIGl0ZW0pO1xyXG4gICAgICAgICAgICBwb2xsLmFscmVhZHlQb2xsID0gdHJ1ZTtcclxuICAgICAgICAgICAgcG9sbC52YWx1ZXMgPSB0ZW1wUG9sbC52YWx1ZXM7XHJcblxyXG4gICAgICAgICAgICBzZXRQb2xsRWRpdE5hbWVzKHBvbGwpO1xyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBiYXNlLm9sZFRleHRMZW5ndGggPSAwO1xyXG4gICAgICAgIGJhc2UubWVzc2FnZUNoYW5nZSA9IGZ1bmN0aW9uIChldmVudCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIGVsID0gZXZlbnQudGFyZ2V0LFxyXG4gICAgICAgICAgICAgICAgY2xpZW50SGVpZ2h0ID0gZWwuY2xpZW50SGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgc2Nyb2xsSGVpZ2h0ID0gZWwuc2Nyb2xsSGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgdGV4dExlbmd0aCA9IGVsLnRleHRMZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBjbGllbnRXaWR0aCA9IGVsLmNsaWVudFdpZHRoLFxyXG4gICAgICAgICAgICAgICAgdGV4dExlbmd0aFBYLCBuZXdIZWlnaHQsIHJlbW92ZVJvd0NvdW50LFxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdEhlaWdodCwgbmV3Um93Q291bnQ7XHJcblxyXG4gICAgICAgICAgICBkZWZhdWx0SGVpZ2h0ID0gVEVYVEFSRUFfREVGQVVMVF9IRUlHSFQ7XHJcblxyXG4gICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICAg0JjRgdGF0L7QtNC90YvQtSDQtNCw0L3QvdGL0LU6XHJcbiAgICAgICAgICAgICDQndCwINC+0LTQuNC9INGB0LjQvNCy0L7QuyDQv9GA0LjRhdC+0LTQuNGC0YHRjyB+OHB4INCyINGI0LjRgNC40L3Rg1xyXG4gICAgICAgICAgICAg0JLRi9GB0L7RgtCwINGB0YLRgNC+0LrQuCDRgtC10LrRgdGC0LAgfjE0cHhcclxuXHJcbiAgICAgICAgICAgICAqINCX0LTQtdGB0Ywg0LLRi9C/0L7Qu9C90Y/QtdC8INGC0LDQutC40LUg0LTQtdC50YHRgtCy0LjRjyA6XHJcbiAgICAgICAgICAgICAqIDEpINCh0YfQuNGC0LDQtdC8INC00LvQuNC90YMg0YLQtdC60YHRgtCwINCyINC/0LjQutGB0LXQu9GP0YVcclxuICAgICAgICAgICAgICogMikg0J7Qv9GA0LXQtNC10LvRj9C10Lwg0YbQtdC70L7QtSDQutC+0LvQuNGH0LXRgdGC0L7QsiDRgdGC0YDQvtC6LCDQutC+0YLQvtGA0YvQtSDRg9C00LDQu9C40LvQuFxyXG4gICAgICAgICAgICAgKiAzKSDQntC/0YDQtdC00LXQu9GP0Lwg0L3QvtCy0YPRjiDQstGL0YHQvtGC0YMg0YEg0YPRh9C10YLQvtC8INCy0YvRgdC+0YLRiyDRg9C00LDQu9C10L3QvdC+0LPQviDRgtC10LrRgdGC0LBcclxuICAgICAgICAgICAgICogKi9cclxuXHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCIwIFwiK3Njcm9sbEhlaWdodCtcIiBcIitjbGllbnRIZWlnaHQpO1xyXG4gICAgICAgICAgICBpZiAoc2Nyb2xsSGVpZ2h0ID4gY2xpZW50SGVpZ2h0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gc2Nyb2xsSGVpZ2h0ICsgJ3B4JztcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzY3JvbGxIZWlnaHQgPiBkZWZhdWx0SGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0TGVuZ3RoUFggPSAocGFyc2VJbnQoYmFzZS5vbGRUZXh0TGVuZ3RoKSAtIHRleHRMZW5ndGgpICogODsgLy8gMVxyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIjIgXCIrdGV4dExlbmd0aFBYK1wiIFwiK2NsaWVudFdpZHRoK1wiIFwiK3RleHRMZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRleHRMZW5ndGhQWCA+IGNsaWVudFdpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCIzIFwiK3RleHRMZW5ndGhQWCtcIiBcIitjbGllbnRXaWR0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlUm93Q291bnQgPSBNYXRoLmZsb29yKHRleHRMZW5ndGhQWCAvIGNsaWVudFdpZHRoKTsgLy8gMlxyXG4gICAgICAgICAgICAgICAgICAgIG5ld0hlaWdodCA9IHBhcnNlSW50KGV2ZW50LnRhcmdldC5zdHlsZS5oZWlnaHQpIC0gcmVtb3ZlUm93Q291bnQgKiAxNDsgLy8gM1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld0hlaWdodCA+IGRlZmF1bHRIZWlnaHQgPyBldmVudC50YXJnZXQuc3R5bGUuaGVpZ2h0ID0gbmV3SGVpZ2h0ICsgXCJweFwiIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQudGFyZ2V0LnN0eWxlLmhlaWdodCA9IGRlZmF1bHRIZWlnaHQgKyAncHgnO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gc2Nyb2xsSGVpZ2h0IC0gNiArICdweCc7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCI1IFwiK3RleHRMZW5ndGgrXCIgXCIrdGV4dExlbmd0aCo4L2NsaWVudFdpZHRoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJzQnKTtcclxuICAgICAgICAgICAgICAgIGVsLnN0eWxlLmhlaWdodCA9IGRlZmF1bHRIZWlnaHQgKyAncHgnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJhc2Uub2xkVGV4dExlbmd0aCA9IHRleHRMZW5ndGg7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgYmFzZS5nZXRUZXh0YXJlYUhlaWdodCA9IGZ1bmN0aW9uICh0ZXh0TGVuZ3RoLCBjbGllbnRXaWR0aCwgaXNUb3BpYykge1xyXG4gICAgICAgICAgICAvKmlmKGlzVG9waWMpe1xyXG4gICAgICAgICAgICAgdmFyIGsxID0gMTAsXHJcbiAgICAgICAgICAgICBrMiA9IDE5O1xyXG4gICAgICAgICAgICAgfWVsc2V7Ki9cclxuICAgICAgICAgICAgdmFyIGsxID0gMTIsXHJcbiAgICAgICAgICAgICAgICBrMiA9IDE0O1xyXG4gICAgICAgICAgICAvL31cclxuXHJcbiAgICAgICAgICAgIHZhciBzdHJpbmdMZW4gPSB0ZXh0TGVuZ3RoICogazE7XHJcbiAgICAgICAgICAgIGlmIChzdHJpbmdMZW4gPiBjbGllbnRXaWR0aCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJvd0NvdW50ID0gcGFyc2VJbnQoc3RyaW5nTGVuIC8gY2xpZW50V2lkdGgpOyAvLyDRgdC60L7Qu9GM0LrQviDRgdGC0YDQvtC6XHJcbiAgICAgICAgICAgICAgICB2YXIgYXJlYUhlaWdodCA9IHJvd0NvdW50ICogazI7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBhcmVhSGVpZ2h0ID0gVEVYVEFSRUFfREVGQVVMVF9IRUlHSFQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBhcmVhSGVpZ2h0O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGJhc2UuaW5pdEZpcnN0TWVzc2FnZXMgPSBmdW5jdGlvbiAoZmlyc3RNZXNzYWdlcykge1xyXG4gICAgICAgICAgICB2YXIgZnVsbFRhbGtGaXJzdE1lc3NhZ2VzTGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgbGFzdExvYWRlZElkO1xyXG5cclxuICAgICAgICAgICAgZmlyc3RNZXNzYWdlcyA/XHJcbiAgICAgICAgICAgICAgICBmdWxsVGFsa0ZpcnN0TWVzc2FnZXNMZW5ndGggPSBmaXJzdE1lc3NhZ2VzLmxlbmd0aCA6XHJcbiAgICAgICAgICAgICAgICBmdWxsVGFsa0ZpcnN0TWVzc2FnZXNMZW5ndGggPSAwO1xyXG5cclxuICAgICAgICAgICAgaWYgKGZ1bGxUYWxrRmlyc3RNZXNzYWdlc0xlbmd0aCAhPSAwKSBsYXN0TG9hZGVkSWQgPSBmaXJzdE1lc3NhZ2VzW2Z1bGxUYWxrRmlyc3RNZXNzYWdlc0xlbmd0aCAtIDFdLmlkO1xyXG5cclxuICAgICAgICAgICAgaWYgKGZpcnN0TWVzc2FnZXMgPT09IG51bGwpIGZpcnN0TWVzc2FnZXMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZnVsbFRhbGtGaXJzdE1lc3NhZ2VzTGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGZpcnN0TWVzc2FnZXNbaV0uYW5zd2VySW5wdXRJc1Nob3cgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGZpcnN0TWVzc2FnZXNbaV0uaXNUcmVlT3BlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgZmlyc3RNZXNzYWdlc1tpXS5pc0xvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgZmlyc3RNZXNzYWdlc1tpXS5hbnN3ZXJNZXNzYWdlID0gVEVYVF9ERUZBVUxUXzI7XHJcbiAgICAgICAgICAgICAgICBmaXJzdE1lc3NhZ2VzW2ldLmNyZWF0ZWRFZGl0ID0gZ2V0VGltaW5nKGZpcnN0TWVzc2FnZXNbaV0uY3JlYXRlZCk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbGFzdExvYWRlZElkO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGJhc2UuZGVsZXRlTWVzc2FnZSA9IGZ1bmN0aW9uIChtZXNzYWdlLCBtZXNzYWdlc0FycmF5LCBpc1RvcGljLCBpc1dhbGwsIGlzRGlhbG9nKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoaXNUb3BpYyAmJiAhaXNXYWxsIHx8IG1lc3NhZ2UuaXNXYWxsU2luZ2xlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDQtdGB0LvQuCB0YWxrLXNpbmdsZSDQuNC70LggcHJvZml0LXNpbmdsZVxyXG5cclxuICAgICAgICAgICAgICAgIGJvb3Rib3guY29uZmlybShcItCS0Ysg0YPQstC10YDQtdC90YssINGH0YLQviDRhdC+0YLQuNGC0LUg0YPQtNCw0LvQuNGC0Ywg0Y3RgtGDINGC0LXQvNGDP1wiLCBmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkZWxldGVSZXN1bHQgPSBtZXNzYWdlQ2xpZW50LmRlbGV0ZVRvcGljKG1lc3NhZ2UuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5tZXNzYWdlLmNvbnRlbnQgPSBkZWxldGVSZXN1bHQubWVzc2FnZS5jb250ZW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDQstC10YDQvdGD0LsgbnVsbCwg0LfQvdCw0YfQuNGCINC/0L7RgtC+0LzQutC+0LIg0L3QtdGCXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlLm1lc3NhZ2UudHlwZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ3RhbGtzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobWVzc2FnZS5tZXNzYWdlLnR5cGUgPT0gNikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdwcm9maXQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChtZXNzYWdlLm1lc3NhZ2UudHlwZSA9PSA1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ21haW4nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChpc1RvcGljKSB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkZWxldGVSZXN1bHQgPSBtZXNzYWdlQ2xpZW50LmRlbGV0ZVRvcGljKG1lc3NhZ2UuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UubWVzc2FnZS5jb250ZW50ID0gZGVsZXRlUmVzdWx0Lm1lc3NhZ2UuY29udGVudDtcclxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDQstC10YDQvdGD0LsgbnVsbCwg0LfQvdCw0YfQuNGCINGD0LTQsNC70LXQvdC40LUg0L/RgNC+0LjQt9C+0YjQu9C+INGH0LjRgdGC0L5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZXNBcnJheUxlbmd0aCA9IG1lc3NhZ2VzQXJyYXkubGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1lc3NhZ2VzQXJyYXlMZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRJZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNXYWxsID8gY3VycmVudElkID0gbWVzc2FnZXNBcnJheVtpXS50b3BpYy5pZCA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50SWQgPSBtZXNzYWdlc0FycmF5W2ldLmlkO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRJZCA9PSBtZXNzYWdlLmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlc0FycmF5LnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzRGlhbG9nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlhbG9nQ2xpZW50LmRlbGV0ZURpYWxvZ01lc3NhZ2UobWVzc2FnZS5pZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VzQXJyYXlMZW5ndGggPSBtZXNzYWdlc0FycmF5Lmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1lc3NhZ2VzQXJyYXlMZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobWVzc2FnZXNBcnJheVtpXS5pZCA9PSBtZXNzYWdlLmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlc0FycmF5LnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlUmVzdWx0ID0gbWVzc2FnZUNsaWVudC5kZWxldGVNZXNzYWdlKG1lc3NhZ2UuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLmNvbnRlbnQgPSBkZWxldGVSZXN1bHQuY29udGVudDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZXNBcnJheUxlbmd0aCA9IG1lc3NhZ2VzQXJyYXkubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1lc3NhZ2VzQXJyYXlMZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2VzQXJyYXlbaV0uaWQgPT0gbWVzc2FnZS5pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VzQXJyYXkuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGJhc2Uuc2V0RWRpdCA9IGZ1bmN0aW9uIChldmVudCwgbWVzc2FnZSwgaXNOZWVkQW5zd2VyU2hvdykge1xyXG4gICAgICAgICAgICBpZighbWVzc2FnZS5ydWJyaWMpIHtcclxuICAgICAgICAgICAgICAgIC8vbWVzc2FnZS5zZWxSdWJyaWNOYW1lID0gXCLQntCx0YnQtdC1XCI7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlLnJ1YnJpYyA9IHt9O1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZS5ydWJyaWMudmlzaWJsZU5hbWUgPSBcItCe0LHRidC10LVcIjtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UucnVicmljLmlkID0gMDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8kcm9vdFNjb3BlLmN1cnJlbnRSdWJyaWMgPSBtZXNzYWdlLnJ1YnJpYztcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzZXRFZGl0Jywkcm9vdFNjb3BlLmN1cnJlbnRSdWJyaWMpO1xyXG4gICAgICAgICAgICB2YXIgaXNUb3BpYztcclxuICAgICAgICAgICAgKG1lc3NhZ2UubWVzc2FnZSkgPyBpc1RvcGljID0gdHJ1ZSA6IGlzVG9waWMgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLmlzRWRpdCkge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZS5pc0VkaXQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaXNUb3BpYykge1xyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UubWVzc2FnZS5jb250ZW50ID0gJGZpbHRlcignbGlua3knKShtZXNzYWdlLm1lc3NhZ2UuY29udGVudCwgJ2JsYW5rJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5tZXNzYWdlLmNvbnRlbnQgPSB3aXRoVGFncyhtZXNzYWdlLm1lc3NhZ2UuY29udGVudCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuY29udGVudCA9ICRmaWx0ZXIoJ2xpbmt5JykobWVzc2FnZS5jb21tZW50VGV4dCwgJ2JsYW5rJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5jb250ZW50ID0gd2l0aFRhZ3MobWVzc2FnZS5jb250ZW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGlzVG9waWMpIHtcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLm1lc3NhZ2UuY29udGVudCA9IHdpdGhvdXRUYWdzKG1lc3NhZ2UubWVzc2FnZS5jb250ZW50KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5jb21tZW50VGV4dCA9IHdpdGhvdXRUYWdzKG1lc3NhZ2UuY29udGVudCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGVsID0gZXZlbnQudGFyZ2V0O1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBoMCA9ICQoZWwpLmNsb3Nlc3QoJy50ZXh0LWNvbnRhaW5lcicpLmZpbmQoJy50ZXh0OmVxKDApJykuaGVpZ2h0KCksXHJcbiAgICAgICAgICAgICAgICAgICAgaDEgPSAkKGVsKS5jbG9zZXN0KCcudGV4dC1jb250YWluZXInKS5maW5kKCcudGV4dDplcSgxKScpLmhlaWdodCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGg7XHJcblxyXG4gICAgICAgICAgICAgICAgKGgwID4gaDEpID8gaCA9IGgwICsgMjQgOiBoID0gaDE7XHJcblxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZS5pc0VkaXQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlLmFuc3dlcklucHV0SXNTaG93KSBtZXNzYWdlLmFuc3dlcklucHV0SXNTaG93ID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGlzVG9waWMpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGV4dExlbiA9IG1lc3NhZ2UubWVzc2FnZS5jb250ZW50Lmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dExlbiA9IG1lc3NhZ2UuY29udGVudC5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLyppZih0ZXh0TGVuID4gYmFzZS5jb250ZW50TGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICBoID0gKHRleHRMZW4vYmFzZS5jb250ZW50TGVuZ3RoKS50b0ZpeGVkKDApKihoLTI0KTtcclxuICAgICAgICAgICAgICAgICB9Ki9cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaCA8IFRFWFRBUkVBX0RFRkFVTFRfSEVJR0hUKSBoID0gVEVYVEFSRUFfREVGQVVMVF9IRUlHSFQ7XHJcblxyXG4gICAgICAgICAgICAgICAgJChlbCkuY2xvc2VzdCgnLnRleHQtY29udGFpbmVyJykuZmluZCgnLmVkaXQtbWVzc2FnZSB0ZXh0YXJlYScpLmhlaWdodChoICsgJ3B4Jyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChpc05lZWRBbnN3ZXJTaG93KSB7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlLmFuc3dlclNob3cgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZS5jb21tZW50VGV4dCA9IG1lc3NhZ2UuY29udGVudDtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UuaXNUYWxrID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuaXNFZGl0KSB7XHJcbiAgICAgICAgICAgICAgICAvLyDQt9C00LXRgdGMINGA0LDRgdGB0LzQsNGC0YDQuNCy0LDQtdGC0YHRjyDRgdC40YLRg9Cw0YbQuNGPINC60L7Qs9C00LAg0LzRiyDQstC+0LfQstGA0LDRidCw0LXQvNGB0Y8g0LjQtyDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNGPLFxyXG4gICAgICAgICAgICAgICAgLy8g0L3QviDQstGL0YjQtSDQvNGLINGD0LbQtSDQv9C10YDQtdC60LvRjtGH0LjQtNC4INGE0LvQsNCzLCDQv9C+0Y3RgtC+0LzRgyDQv9C40YjRgyBtZXNzYWdlLmlzRWRpdCwg0LAg0L3QtSAhbWVzc2FnZS5pc0VkaXRcclxuICAgICAgICAgICAgICAgIGlmIChpc1RvcGljKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5tZXNzYWdlLmNvbnRlbnQgPSB3aXRob3V0VGFncyhtZXNzYWdlLm1lc3NhZ2UuY29udGVudCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuY29tbWVudFRleHQgPSB3aXRob3V0VGFncyhtZXNzYWdlLmNvbnRlbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGJhc2UucGFnZVRpdGxlID0gXCLQndC+0LLQvtGB0YLQuFwiO1xyXG5cclxuICAgICAgICBiYXNlLnVzZXIgPSBzaG9ydFVzZXJJbmZvO1xyXG5cclxuICAgICAgICBiYXNlLmJ1ZmZlclNlbGVjdGVkR3JvdXAgPSB1c2VyQ2xpZW50R3JvdXBzWzNdO1xyXG5cclxuICAgICAgICBiYXNlLm1hcmtJbXBvcnRhbnQgPSBmdW5jdGlvbiAoZXZlbnQsIG1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgdmFyIGlzSW1wb3J0YW50O1xyXG5cclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuaW1wb3J0YW50ID09IDMgfHwgbWVzc2FnZS5pbXBvcnRhbnQgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZS5pbXBvcnRhbnQgPSAxO1xyXG4gICAgICAgICAgICAgICAgaXNJbXBvcnRhbnQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZS5pbXBvcnRhbnRUZXh0ID0gJ9Ch0L3Rj9GC0Ywg0LzQtdGC0LrRgyBcItCS0LDQttC90L7QtVwiJztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UuaW1wb3J0YW50ID0gMztcclxuICAgICAgICAgICAgICAgIGlzSW1wb3J0YW50ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlLmltcG9ydGFudFRleHQgPSAn0J/QvtC80LXRgtC40YLRjCDQutCw0LogXCLQktCw0LbQvdC+0LVcIic7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG1lc3NhZ2VDbGllbnQubWFya01lc3NhZ2VJbXBvcnRhbnQobWVzc2FnZS5pZCwgaXNJbXBvcnRhbnQpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGJhc2UubWFya0xpa2UgPSBmdW5jdGlvbiAoZXZlbnQsIG1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgdmFyIGlzTGlrZTtcclxuXHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLmxpa2UgPT0gMSkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoJyNsaWtlLWhlbHAtJyArIG1lc3NhZ2UuaWQpLmZhZGVJbigyMDApO1xyXG5cclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoaGlkZUxpa2VIZWxwLCAyMDAwLCBtZXNzYWdlLmlkKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG1lc3NhZ2UubGlrZSA9IDE7XHJcbiAgICAgICAgICAgIG1lc3NhZ2VDbGllbnQubWFya01lc3NhZ2VMaWtlKG1lc3NhZ2UuaWQpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGJhc2UuaW5pdFN0YXJ0UGFyYW1zRm9yQ3JlYXRlVG9waWMgPSBmdW5jdGlvbiAoY3RybCkge1xyXG4gICAgICAgICAgICBjdHJsLnNlbGVjdGVkR3JvdXAgPSAkcm9vdFNjb3BlLmJhc2UuYnVmZmVyU2VsZWN0ZWRHcm91cCA9ICRyb290U2NvcGUuY3VycmVudEdyb3VwO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY3RybC5pc0VkaXQgPSBmYWxzZTtcclxuICAgICAgICAgICAgY3RybC5pc0NyZWF0ZU1lc3NhZ2VFcnJvciA9IGZhbHNlO1xyXG4gICAgICAgICAgICBjdHJsLmlzUG9sbEF2YWlsYWJsZSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBpZiAoY3RybC5pZCkge1xyXG4gICAgICAgICAgICAgICAgLy8g0LXRgdC70Lgg0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjQtVxyXG4gICAgICAgICAgICAgICAgaWYgKGN0cmwucG9sbCAmJiBjdHJsLnBvbGwucG9sbElkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3RybC5pc1BvbGxTaG93ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY3RybC5wb2xsU3ViamVjdCA9IGN0cmwucG9sbC5zdWJqZWN0O1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBuYW1lc0xlbmd0aCA9IGN0cmwucG9sbC5uYW1lcy5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgY3RybC5wb2xsSW5wdXRzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuYW1lc0xlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0cmwucG9sbElucHV0c1tpXSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdHJsLnBvbGxJbnB1dHNbaV0uY291bnRlciA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0cmwucG9sbElucHV0c1tpXS5uYW1lID0gY3RybC5wb2xsLm5hbWVzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjdHJsLmlzUG9sbEF2YWlsYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8g0LXRgdC70Lgg0YHQvtC30LTQsNC90LjQtVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBjdHJsLmlzUG9sbFNob3cgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGN0cmwucG9sbFN1YmplY3QgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgY3RybC5wb2xsSW5wdXRzID0gW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY291bnRlcjogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb3VudGVyOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgICAgIGN0cmwuYXR0YWNoZWRJbWFnZXMgPSBbXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBoaWRlTGlrZUhlbHAgPSBmdW5jdGlvbiAobWVzc2FnZUlkKSB7XHJcbiAgICAgICAgICAgICQoJyNsaWtlLWhlbHAtJyArIG1lc3NhZ2VJZCkuZmFkZU91dCgyMDApO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGJhc2Uuc2hvd0FsbEdyb3VwcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGdyb3Vwc0xlbmd0aCA9ICRyb290U2NvcGUuZ3JvdXBzLmxlbmd0aDtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBncm91cHNMZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5ncm91cHNbaV0uaXNTaG93ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICRyb290U2NvcGUuZ3JvdXBzW2ldLnNlbGVjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJHJvb3RTY29wZS5ncm91cHNbMF0uc2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLmJhc2UuYnVmZmVyU2VsZWN0ZWRHcm91cCA9ICRyb290U2NvcGUuZ3JvdXBzWzBdO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGJhc2UuZ3JvdXBzID0gdXNlckNsaWVudEdyb3VwcztcclxuICAgICAgICBiYXNlLnJ1YnJpY3MgPSB1c2VyQ2xpZW50UnVicmljcztcclxuXHJcbiAgICAgICAgYmFzZS5nb1RvRGlhbG9nID0gZnVuY3Rpb24gKHVzZXJJZCkge1xyXG4gICAgICAgICAgICB2YXIgdXNlcnMgPSBbXTtcclxuICAgICAgICAgICAgdXNlcnNbMF0gPSB1c2VySWQ7XHJcbiAgICAgICAgICAgIHZhciBkaWFsb2cgPSBkaWFsb2dDbGllbnQuZ2V0RGlhbG9nKHVzZXJzLCAwKTtcclxuXHJcbiAgICAgICAgICAgICRzdGF0ZS5nbygnZGlhbG9nLXNpbmdsZScsIHsgJ2RpYWxvZ0lkJzogZGlhbG9nLmlkfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgYmFzZS5zZWxlY3RHcm91cEluRHJvcGRvd24gPSBmdW5jdGlvbiAoZ3JvdXBJZCwgY3RybCkge1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLmJhc2UuYnVmZmVyU2VsZWN0ZWRHcm91cCA9IHNlbGVjdEdyb3VwSW5Ecm9wZG93bihncm91cElkKTtcclxuXHJcbiAgICAgICAgICAgIC8vaWYoIWN0cmwuaXNFZGl0KXtcclxuICAgICAgICAgICAgY3RybC5zZWxlY3RlZEdyb3VwID0gJHJvb3RTY29wZS5iYXNlLmJ1ZmZlclNlbGVjdGVkR3JvdXA7XHJcbiAgICAgICAgICAgIC8vfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGJhc2UucmVtb3ZlQXR0YWNoID0gZnVuY3Rpb24gKG1lc3NhZ2UsIGluZGV4LCBpc0ltYWdlKSB7XHJcbiAgICAgICAgICAgIGlzSW1hZ2UgP1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZS5pbWFnZXMuc3BsaWNlKGluZGV4LCAxKSA6XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlLmRvY3VtZW50cy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRyb290U2NvcGUuaW5pdENyZWF0ZVRvcGljID0gZnVuY3Rpb24gKGN0cmwpIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChjdHJsLmlkKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDQt9C90LDRh9C40YIg0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjQtVxyXG5cclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQocG9sbEF0dGFjaCwgMjAwLCBjdHJsLmlkLCB0cnVlKTsgLy8g0LbQtNC10Lwg0L/QvtC60LAg0LfQsNCz0YDRg9C30LjRgtGB0Y9cclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyDQt9C90LDRh9C40YIg0YHQvtC30LTQsNC90LjQtVxyXG5cclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQocG9sbEF0dGFjaCwgMjAwLCBjdHJsLmF0dGFjaElkLCBmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRyb290U2NvcGUuaW5pdENyZWF0ZU1lc3NhZ2UgPSBmdW5jdGlvbiAoY3RybElkLCBpc0VkaXQpIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChpc0VkaXQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KHBvbGxBdHRhY2gsIDIwMCwgY3RybElkLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChwb2xsQXR0YWNoLCAyMDAsIGN0cmxJZCwgZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBwb2xsQXR0YWNoKGN0cmxJZCwgaXNFZGl0KSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoaXNFZGl0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJCgnI2F0dGFjaEltYWdlLWVkaXQtJyArIGN0cmxJZCkubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdEF0dGFjaEltYWdlKCQoJyNhdHRhY2hJbWFnZS1lZGl0LScgKyBjdHJsSWQpLCAkKCcjYXR0YWNoLWFyZWEtZWRpdC0nICsgY3RybElkKSk7IC8vIO+/ve+/ve+/vSDvv73vv73vv73vv73vv70g77+977+977+977+977+977+977+977+9XHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdEF0dGFjaERvYygkKCcjYXR0YWNoRG9jLWVkaXQtJyArIGN0cmxJZCksICQoJyNhdHRhY2gtZG9jLWFyZWEtZWRpdC0nICsgY3RybElkKSwgaXNFZGl0KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChwb2xsQXR0YWNoLCAyMDAsIGN0cmxJZCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJCgnI2F0dGFjaEltYWdlLScgKyBjdHJsSWQpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGluaXRBdHRhY2hJbWFnZSgkKCcjYXR0YWNoSW1hZ2UtJyArIGN0cmxJZCksICQoJyNhdHRhY2gtYXJlYS0nICsgY3RybElkKSk7IC8vIO+/ve+/ve+/vSDvv73vv73vv73vv73vv70g77+977+977+977+977+977+977+977+9XHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdEF0dGFjaERvYygkKCcjYXR0YWNoRG9jLScgKyBjdHJsSWQpLCAkKCcjYXR0YWNoLWRvYy1hcmVhLScgKyBjdHJsSWQpKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChwb2xsQXR0YWNoLCAyMDAsIGN0cmxJZCwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBhZGRTaW5nbGVUYWxrKHRhbGspIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2FkZFNpbmdsZVRhbGstMCcsJHJvb3RTY29wZS5jdXJyZW50UnVicmljKTtcclxuXHJcbiAgICAgICAgICAgIHRhbGsuc2VsZWN0ZWRSdWJyaWMgPSAkcm9vdFNjb3BlLmN1cnJlbnRSdWJyaWM7XHJcbiAgICAgICAgICAgIGlmKCF0YWxrLnNlbGVjdGVkUnVicmljKSB7XHJcbiAgICAgICAgICAgICAgICB0YWxrLnNlbGVjdGVkUnVicmljID0ge307XHJcbiAgICAgICAgICAgICAgICB0YWxrLnNlbGVjdGVkUnVicmljLmlkID0gMDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRhbGsuaXNFZGl0KSB7XHJcbiAgICAgICAgICAgICAgICB0YWxrLmF0dGFjaGVkSW1hZ2VzID0gZ2V0QXR0YWNoZWRJbWFnZXMoJCgnI2F0dGFjaC1hcmVhLWVkaXQtJyArIHRhbGsuaWQpKTtcclxuICAgICAgICAgICAgICAgIHRhbGsuYXR0YWNoZWREb2NzID0gZ2V0QXR0YWNoZWREb2NzKCQoJyNhdHRhY2gtZG9jLWFyZWEtZWRpdC0nICsgdGFsay5pZCksIHRhbGsuaXNFZGl0KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRhbGsuYXR0YWNoZWRJbWFnZXMgPSBnZXRBdHRhY2hlZEltYWdlcygkKCcjYXR0YWNoLWFyZWEtJyArIHRhbGsuYXR0YWNoSWQpKTtcclxuICAgICAgICAgICAgICAgIHRhbGsuYXR0YWNoZWREb2NzID0gZ2V0QXR0YWNoZWREb2NzKCQoJyNhdHRhY2gtZG9jLWFyZWEtJyArIHRhbGsuYXR0YWNoSWQpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRhbGsuc3ViamVjdCA9PSBURVhUX0RFRkFVTFRfNCB8fCB0YWxrLnN1YmplY3QgPT0gXCJcIikge1xyXG5cclxuICAgICAgICAgICAgICAgIHRhbGsuaXNDcmVhdGVUYWxrRXJyb3IgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGFsay5jcmVhdGVUYWxrRXJyb3JUZXh0ID0gXCLQktGLINC90LUg0YPQutCw0LfQsNC70Lgg0LfQsNCz0L7Qu9C+0LLQvtC6XCI7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRhbGsuYXR0YWNoZWRJbWFnZXMubGVuZ3RoID09IDAgJiYgKHRhbGsuYXR0YWNoZWREb2NzID09PSB1bmRlZmluZWQgfHwgdGFsay5hdHRhY2hlZERvY3MubGVuZ3RoID09IDApICYmICF0YWxrLmlzUG9sbFNob3dcclxuICAgICAgICAgICAgICAgICYmICh0YWxrLm1lc3NhZ2UuY29udGVudCA9PSBURVhUX0RFRkFVTFRfMyB8fCAhdGFsay5tZXNzYWdlLmNvbnRlbnQpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdGFsay5pc0NyZWF0ZVRhbGtFcnJvciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0YWxrLmNyZWF0ZVRhbGtFcnJvclRleHQgPSBcItCS0Ysg0L3QtSDQstCy0LXQu9C4INGB0L7QvtCx0YnQtdC90LjQtVwiO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0YWxrLmlzUG9sbFNob3cgJiYgKCF0YWxrLnBvbGxTdWJqZWN0IHx8IHRhbGsucG9sbElucHV0c1swXS5uYW1lID09IFwiXCIgfHwgdGFsay5wb2xsSW5wdXRzWzFdLm5hbWUgPT0gXCJcIikpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB0YWxrLmlzQ3JlYXRlVGFsa0Vycm9yID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRhbGsuY3JlYXRlVGFsa0Vycm9yVGV4dCA9IFwi0JLRiyDQvdC1INGD0LrQsNC30LDQu9C4INC00LDQvdC90YvQtSDQtNC70Y8g0L7Qv9GA0L7RgdCwXCI7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0YWxrLm1lc3NhZ2UuY29udGVudCA9PSBURVhUX0RFRkFVTFRfMyAmJiAodGFsay5hdHRhY2hlZEltYWdlcyB8fCB0YWxrLmF0dGFjaGVkRG9jcyB8fCB0YWxrLmlzUG9sbFNob3cpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFsay5tZXNzYWdlLmNvbnRlbnQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGFsay5pc0NyZWF0ZVRhbGtFcnJvciA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBpc1dhbGwgPSAwLCBpc0FkdmVydCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRhbGsuaXNBZHZlcnQpIGlzQWR2ZXJ0ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnYWRkU2luZ2xlVGFsaycsJHJvb3RTY29wZS5jdXJyZW50UnVicmljKTtcclxuICAgICAgICAgICAgICAgIHZhciBuZXdUb3BpYyA9IHBvc3RUb3BpYyh0YWxrLCBpc1dhbGwsIGlzQWR2ZXJ0LCAkZmlsdGVyKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobmV3VG9waWMucG9sbCAmJiB0YWxrLnBvbGwpIHRhbGsucG9sbC5wb2xsSWQgPSBuZXdUb3BpYy5wb2xsLnBvbGxJZDtcclxuXHJcbiAgICAgICAgICAgICAgICBuZXdUb3BpYy5sYWJlbCA9IGdldExhYmVsKGJhc2UuZ3JvdXBzLCBuZXdUb3BpYy5ncm91cFR5cGUpO1xyXG4gICAgICAgICAgICAgICAgbmV3VG9waWMudGFnQ29sb3IgPSBnZXRUYWdDb2xvcihuZXdUb3BpYy5sYWJlbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5iYXNlLmNyZWF0ZVRvcGljSXNIaWRlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGFsay5pc0VkaXQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGVhbkF0dGFjaGVkKCQoJyNhdHRhY2gtYXJlYS1lZGl0LScgKyB0YWxrLmlkKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYW5BdHRhY2hlZCgkKCcjYXR0YWNoLWRvYy1hcmVhLWVkaXQtJyArIHRhbGsuaWQpKTtcclxuICAgICAgICAgICAgICAgICAgICB0YWxrLmlzRWRpdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGVhbkF0dGFjaGVkKCQoJyNhdHRhY2gtYXJlYS0nICsgdGFsay5hdHRhY2hJZCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFuQXR0YWNoZWQoJCgnI2F0dGFjaC1kb2MtYXJlYS0nICsgdGFsay5hdHRhY2hJZCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuc2VsZWN0R3JvdXAoJHJvb3RTY29wZS5iYXNlLmJ1ZmZlclNlbGVjdGVkR3JvdXApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRhbGsuc3ViamVjdCA9IFRFWFRfREVGQVVMVF80O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBjcmVhdGVXYWxsVG9waWMoY3RybCkge1xyXG5cclxuICAgICAgICAgICAgaWYoY3RybC5pc0VkaXQgJiYgISRyb290U2NvcGUuY3VycmVudFJ1YnJpYykge1xyXG4gICAgICAgICAgICAgICAgY3RybC5zZWxlY3RlZFJ1YnJpYyA9IGN0cmwucnVicmljO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGN0cmwuc2VsZWN0ZWRSdWJyaWMgPSAkcm9vdFNjb3BlLmN1cnJlbnRSdWJyaWM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ1dhbGxUb3BpYycsY3RybC5zZWxlY3RlZFJ1YnJpYyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoY3RybC5pc0VkaXQpIHtcclxuICAgICAgICAgICAgICAgIGN0cmwuYXR0YWNoZWRJbWFnZXMgPSBnZXRBdHRhY2hlZEltYWdlcygkKCcjYXR0YWNoLWFyZWEtZWRpdC0nICsgY3RybC5pZCkpO1xyXG4gICAgICAgICAgICAgICAgY3RybC5hdHRhY2hlZERvY3MgPSBnZXRBdHRhY2hlZERvY3MoJCgnI2F0dGFjaC1kb2MtYXJlYS1lZGl0LScgKyBjdHJsLmlkKSwgY3RybC5pc0VkaXQpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY3RybC5hdHRhY2hlZEltYWdlcyA9IGdldEF0dGFjaGVkSW1hZ2VzKCQoJyNhdHRhY2gtYXJlYS0nICsgY3RybC5hdHRhY2hJZCkpO1xyXG4gICAgICAgICAgICAgICAgY3RybC5hdHRhY2hlZERvY3MgPSBnZXRBdHRhY2hlZERvY3MoJCgnI2F0dGFjaC1kb2MtYXJlYS0nICsgY3RybC5hdHRhY2hJZCkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoY3RybC5hdHRhY2hlZEltYWdlcy5sZW5ndGggPT0gMCAmJiBjdHJsLmF0dGFjaGVkRG9jcyAmJiBjdHJsLmF0dGFjaGVkRG9jcy5sZW5ndGggPT0gMCAmJiAhY3RybC5pc1BvbGxTaG93XHJcbiAgICAgICAgICAgICAgICAmJiAoY3RybC5tZXNzYWdlLmNvbnRlbnQgPT0gVEVYVF9ERUZBVUxUXzEgfHwgIWN0cmwubWVzc2FnZS5jb250ZW50KSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGN0cmwuaXNDcmVhdGVNZXNzYWdlRXJyb3IgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgY3RybC5pc0NyZWF0ZU1lc3NhZ2VHcm91cEVycm9yID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBjdHJsLmlzQ3JlYXRlTWVzc2FnZVJ1YnJpY0Vycm9yID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgY3RybC5jcmVhdGVNZXNzYWdlRXJyb3JUZXh0ID0gXCLQktGLINC90LUg0LLQstC10LvQuCDRgdC+0L7QsdGJ0LXQvdC40LVcIjtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3RybC5pc1BvbGxTaG93ICYmICghY3RybC5wb2xsU3ViamVjdCB8fCBjdHJsLnBvbGxJbnB1dHNbMF0ubmFtZSA9PSBcIlwiIHx8IGN0cmwucG9sbElucHV0c1sxXS5uYW1lID09IFwiXCIpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgY3RybC5pc0NyZWF0ZU1lc3NhZ2VFcnJvciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBjdHJsLmlzQ3JlYXRlTWVzc2FnZUdyb3VwRXJyb3IgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGN0cmwuaXNDcmVhdGVNZXNzYWdlUnVicmljRXJyb3IgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICBjdHJsLmNyZWF0ZU1lc3NhZ2VFcnJvclRleHQgPSBcItCS0Ysg0L3QtSDRg9C60LDQt9Cw0LvQuCDQtNCw0L3QvdGL0LUg0LTQu9GPINC+0L/RgNC+0YHQsFwiO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIGlmKCFjdHJsLnNlbGVjdGVkR3JvdXApe1xyXG5cclxuICAgICAgICAgICAgICAgIGN0cmwuaXNDcmVhdGVNZXNzYWdlRXJyb3IgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGN0cmwuaXNHcm91cHNJbk1lc3NTaG93ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGN0cmwuaXNDcmVhdGVNZXNzYWdlR3JvdXBFcnJvciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBjdHJsLmlzQ3JlYXRlTWVzc2FnZVJ1YnJpY0Vycm9yID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICB9ZWxzZSBpZihjdHJsLnNlbGVjdGVkUnVicmljID09PSBudWxsIHx8IGN0cmwuc2VsZWN0ZWRSdWJyaWMuaWQgPT09IHVuZGVmaW5lZCl7XHJcblxyXG4gICAgICAgICAgICAgICAgY3RybC5pc0NyZWF0ZU1lc3NhZ2VFcnJvciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgY3RybC5pc0NyZWF0ZU1lc3NhZ2VHcm91cEVycm9yID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBjdHJsLmlzQ3JlYXRlTWVzc2FnZVJ1YnJpY0Vycm9yID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGN0cmwuaXNSdWJyaWNzSW5NZXNzU2hvdyA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY3RybC5tZXNzYWdlLmNvbnRlbnQgPT0gVEVYVF9ERUZBVUxUXzEgJiYgKGN0cmwuYXR0YWNoZWRJbWFnZXMgfHwgY3RybC5hdHRhY2hlZERvY3MgfHwgY3RybC5pc1BvbGxTaG93KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGN0cmwubWVzc2FnZS5jb250ZW50ID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGN0cmwuaXNDcmVhdGVNZXNzYWdlRXJyb3IgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGN0cmwuaXNPcGVuTWVzc2FnZUJhciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgY3RybC5pc0dyb3Vwc0luTWVzc1Nob3cgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGN0cmwuaXNSdWJyaWNzSW5NZXNzU2hvdyA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ2NyZWF0ZVdhbGxUb3BpYycsY3RybC5zZWxlY3RlZFJ1YnJpYyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGlzV2FsbCA9IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3VG9waWMgPSBwb3N0VG9waWMoY3RybCwgaXNXYWxsLCBmYWxzZSwgJGZpbHRlcik7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGN0cmwuaXNFZGl0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYW5BdHRhY2hlZCgkKCcjYXR0YWNoLWFyZWEtZWRpdC0nICsgY3RybC5pZCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFuQXR0YWNoZWQoJCgnI2F0dGFjaC1kb2MtYXJlYS1lZGl0LScgKyBjdHJsLmlkKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY3RybC5pc0VkaXQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY3RybC5wb2xsICYmIG5ld1RvcGljLnBvbGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3RybC5wb2xsLmFscmVhZHlQb2xsID0gbmV3VG9waWMucG9sbC5hbHJlYWR5UG9sbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3RybC5wb2xsLnBvbGxJZCA9IG5ld1RvcGljLnBvbGwucG9sbElkO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3RybC5zZWxlY3RlZEdyb3VwID0gY3RybC5zZWxHcm91cE5hbWUgPSBjdHJsLnNlbFJ1YnJpY05hbWUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGN0cmwuc2VsZWN0ZWRSdWJyaWMgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICBjbGVhbkF0dGFjaGVkKCQoJyNhdHRhY2gtYXJlYS0nICsgY3RybC5hdHRhY2hJZCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFuQXR0YWNoZWQoJCgnI2F0dGFjaC1kb2MtYXJlYS0nICsgY3RybC5hdHRhY2hJZCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghY3RybC5pc1dhbGxTaW5nbGUpICRyb290U2NvcGUuc2VsZWN0R3JvdXAoJHJvb3RTY29wZS5iYXNlLmJ1ZmZlclNlbGVjdGVkR3JvdXApO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJHJvb3RTY29wZS5jcmVhdGVUb3BpYyA9IGZ1bmN0aW9uIChldmVudCwgY3RybCkge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFjdHJsLmlzRWRpdCkge1xyXG4gICAgICAgICAgICAgICAgJChldmVudC50YXJnZXQpLmNsb3Nlc3QoJy5tZXNzYWdlLWlucHV0JykuZmluZCgnLnRvcGljLXRleHRhcmVhJykuaGVpZ2h0KFRFWFRBUkVBX0RFRkFVTFRfSEVJR0hUKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGN0cmwuaXNUYWxrKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDQt9C90LDRh9C40YIg0Y3RgtC+IHRhbGtcclxuICAgICAgICAgICAgICAgIGFkZFNpbmdsZVRhbGsoY3RybCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyDQt9C90LDRh9C40YIg0Y3RgtC+IHdhbGxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZVdhbGxUb3BpYyhjdHJsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZVdhbGxNZXNzYWdlKHdhbGxJdGVtKSB7XHJcbiAgICAgICAgICAgIC8vd2FsbEl0ZW0uZ3JvdXBJZCA9IGxlbnRhLnNlbGVjdGVkR3JvdXBJblRvcC5pZDtcclxuICAgICAgICAgICAgd2FsbEl0ZW0uZ3JvdXBJZCA9ICRyb290U2NvcGUuYmFzZS5idWZmZXJTZWxlY3RlZEdyb3VwLmlkO1xyXG5cclxuICAgICAgICAgICAgdmFyIGlzV2FsbCA9IHRydWUsXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gcG9zdE1lc3NhZ2VNeSh3YWxsSXRlbSwgaXNXYWxsLCBmYWxzZSwgJGZpbHRlcik7XHJcblxyXG4gICAgICAgICAgICBpZiAobWVzc2FnZSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB3YWxsSXRlbS5pc0NyZWF0ZUNvbW1lbnRFcnJvciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB3YWxsSXRlbS5jcmVhdGVDb21tZW50RXJyb3JUZXh0ID0gXCLQktGLINC90LUg0LLQstC10LvQuCDRgdC+0L7QsdGJ0LXQvdC40LVcIjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHdhbGxJdGVtLmlzQ3JlYXRlQ29tbWVudEVycm9yID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBiYXNlLmluaXRTdGFydFBhcmFtc0ZvckNyZWF0ZU1lc3NhZ2UobWVzc2FnZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHdhbGxJdGVtLm1lc3NhZ2VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2FsbEl0ZW0ubWVzc2FnZXMucHVzaChtZXNzYWdlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1lc0xlbiA9IHdhbGxJdGVtLm1lc3NhZ2VzLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgKG1lc0xlbiA+PSAkcm9vdFNjb3BlLkNPTU1FTlRTX0RFRkFVTFRfQ09VTlQgJiYgIXdhbGxJdGVtLmlzT3BlbikgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3YWxsSXRlbS5idWZmZXJNZXNzYWdlcyA9IHdhbGxJdGVtLm1lc3NhZ2VzLnNsaWNlKG1lc0xlbiAtICRyb290U2NvcGUuQ09NTUVOVFNfREVGQVVMVF9DT1VOVCkgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3YWxsSXRlbS5idWZmZXJNZXNzYWdlcyA9IHdhbGxJdGVtLm1lc3NhZ2VzO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2FsbEl0ZW0ubWVzc2FnZXMgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICB3YWxsSXRlbS5tZXNzYWdlc1swXSA9IG1lc3NhZ2U7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHdhbGxJdGVtLmJ1ZmZlck1lc3NhZ2VzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgd2FsbEl0ZW0uYnVmZmVyTWVzc2FnZXNbMF0gPSB3YWxsSXRlbS5tZXNzYWdlc1swXTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGFkZFNpbmdsZUZpcnN0TWVzc2FnZSh0YWxrKSB7XHJcbiAgICAgICAgICAgIGlmICh0YWxrLmZ1bGxUYWxrVG9waWMpdGFsay50b3BpY0lkID0gdGFsay5mdWxsVGFsa1RvcGljLmlkO1xyXG5cclxuICAgICAgICAgICAgdGFsay5tZXNzYWdlSWQgPSB0YWxrLmlkO1xyXG5cclxuICAgICAgICAgICAgdmFyIGlzV2FsbCA9IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgaXNGaXJzdExldmVsID0gdHJ1ZSxcclxuICAgICAgICAgICAgICAgIG5ld01lc3NhZ2UgPSBwb3N0TWVzc2FnZU15KHRhbGssIGlzV2FsbCwgaXNGaXJzdExldmVsLCAkZmlsdGVyKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChuZXdNZXNzYWdlID09IDApIHtcclxuICAgICAgICAgICAgICAgIHRhbGsuaXNDcmVhdGVGaXJzdE1lc3NhZ2VFcnJvciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0YWxrLmNyZWF0ZUZpcnN0TWVzc2FnZUVycm9yVGV4dCA9IFwi0JLRiyDQvdC1INCy0LLQtdC70Lgg0YHQvtC+0LHRidC10L3QuNC1XCI7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0YWxrLmZ1bGxUYWxrVG9waWMgP1xyXG4gICAgICAgICAgICAgICAgICAgIHRhbGsuZnVsbFRhbGtUb3BpYy5hbnN3ZXJJbnB1dElzU2hvdyA9IGZhbHNlIDpcclxuICAgICAgICAgICAgICAgICAgICB0YWxrLmFuc3dlcklucHV0SXNTaG93ID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgdGFsay5pc0NyZWF0ZUZpcnN0TWVzc2FnZUVycm9yID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgLyppZih0YWxrLmZ1bGxUYWxrVG9waWMgJiYgIXRhbGsuZnVsbFRhbGtGaXJzdE1lc3NhZ2VzKXtcclxuICAgICAgICAgICAgICAgICB0YWxrLmZ1bGxUYWxrRmlyc3RNZXNzYWdlcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgIHRhbGsuZnVsbFRhbGtGaXJzdE1lc3NhZ2VzWzBdID0gbmV3TWVzc2FnZTtcclxuICAgICAgICAgICAgICAgICB9Ki9cclxuXHJcbiAgICAgICAgICAgICAgICB0YWxrLmlzRWRpdCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0YWxrLmZ1bGxUYWxrVG9waWMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGFsay5mdWxsVGFsa0ZpcnN0TWVzc2FnZXMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0YWxrLmZ1bGxUYWxrRmlyc3RNZXNzYWdlcy5sZW5ndGggPCAxMCB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5iYXNlLmlzRWFybGllc3RNZXNzYWdlcyB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5iYXNlLmVuZE9mTG9hZGVkKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5iYXNlLmxhc3RMb2FkZWRJZCA9IG5ld01lc3NhZ2UuaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWxrLmZ1bGxUYWxrRmlyc3RNZXNzYWdlcy5wdXNoKG5ld01lc3NhZ2UpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWxrLmZ1bGxUYWxrRmlyc3RNZXNzYWdlcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWxrLmZ1bGxUYWxrRmlyc3RNZXNzYWdlc1swXSA9IG5ld01lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuYmFzZS5sYXN0TG9hZGVkSWQgPSBuZXdNZXNzYWdlLmlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmJhc2UuaXNFYXJsaWVzdE1lc3NhZ2VzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBhZGRTaW5nbGVNZXNzYWdlKGZpcnN0TWVzc2FnZSwgdG9waWNJZCwgdGFsaywgbWVzc2FnZSkge1xyXG4gICAgICAgICAgICBpZiAoIXRhbGsuZnVsbFRhbGtNZXNzYWdlc1tmaXJzdE1lc3NhZ2UuaWRdKVxyXG4gICAgICAgICAgICAgICAgdGFsay5mdWxsVGFsa01lc3NhZ2VzW2ZpcnN0TWVzc2FnZS5pZF0gPVxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VDbGllbnQuZ2V0TWVzc2FnZXModG9waWNJZCwgdGFsay5zZWxlY3RlZEdyb3VwLmlkLCAxLCBmaXJzdE1lc3NhZ2UuaWQsIDAsIDEwMDApLm1lc3NhZ2VzO1xyXG5cclxuICAgICAgICAgICAgdmFyIGZ1bGxUYWxrTWVzc2FnZXNMZW5ndGg7XHJcbiAgICAgICAgICAgIHRhbGsuZnVsbFRhbGtNZXNzYWdlc1tmaXJzdE1lc3NhZ2UuaWRdID9cclxuICAgICAgICAgICAgICAgIGZ1bGxUYWxrTWVzc2FnZXNMZW5ndGggPSB0YWxrLmZ1bGxUYWxrTWVzc2FnZXNbZmlyc3RNZXNzYWdlLmlkXS5sZW5ndGggOlxyXG4gICAgICAgICAgICAgICAgZnVsbFRhbGtNZXNzYWdlc0xlbmd0aCA9IDA7XHJcblxyXG4gICAgICAgICAgICB2YXIgbmV3TWVzc2FnZSwgYW5zd2VyLCBwYXJlbnRJZDtcclxuXHJcbiAgICAgICAgICAgIGlmICghbWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgLy8g0LXRgdC70Lgg0LTQvtCx0LDQstC70Y/QtdC8INC6INGB0L7QvtCx0YnQtdC90LjRjiDQv9C10YDQstC+0LPQviDRg9GA0L7QstC90Y9cclxuICAgICAgICAgICAgICAgIHRhbGsubWVzc2FnZUlkID0gZmlyc3RNZXNzYWdlLmlkO1xyXG4gICAgICAgICAgICAgICAgdGFsay5tZXNzYWdlID0gZmlyc3RNZXNzYWdlO1xyXG5cclxuICAgICAgICAgICAgICAgIGFuc3dlciA9IGZpcnN0TWVzc2FnZS5jb21tZW50VGV4dDtcclxuICAgICAgICAgICAgICAgIGZpcnN0TWVzc2FnZS5pc1RyZWVPcGVuID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGZpcnN0TWVzc2FnZS5jb21tZW50VGV4dCA9IFRFWFRfREVGQVVMVF8yO1xyXG4gICAgICAgICAgICAgICAgcGFyZW50SWQgPSBmaXJzdE1lc3NhZ2UuaWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFmaXJzdE1lc3NhZ2UuY2hpbGRDb3VudCB8fCBmaXJzdE1lc3NhZ2UuY2hpbGRDb3VudCA9PSAwKSBmaXJzdE1lc3NhZ2UuY2hpbGRDb3VudCA9IDE7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8g0LXRgdC70Lgg0LTQvtCx0LDQstC70Y/QtdC8INC6INC/0YDQvtGB0YLQvtC80YMg0YHQvtC+0LHRidC10L3QuNGOXHJcbiAgICAgICAgICAgICAgICB0YWxrLm1lc3NhZ2VJZCA9IG1lc3NhZ2UuaWQ7XHJcbiAgICAgICAgICAgICAgICB0YWxrLm1lc3NhZ2UgPSBtZXNzYWdlO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZnVsbFRhbGtNZXNzYWdlc0xlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhbGsuZnVsbFRhbGtNZXNzYWdlc1tmaXJzdE1lc3NhZ2UuaWRdW2ldLmlkID09IG1lc3NhZ2UuaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90YWxrLmZ1bGxUYWxrTWVzc2FnZXNbZmlyc3RNZXNzYWdlLmlkXVtpXS5hbnN3ZXJJbnB1dElzU2hvdyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWxrLmZ1bGxUYWxrTWVzc2FnZXNbZmlyc3RNZXNzYWdlLmlkXVtpXS5pc1RyZWVPcGVuID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFsay5mdWxsVGFsa01lc3NhZ2VzW2ZpcnN0TWVzc2FnZS5pZF1baV0uaXNPcGVuID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFsay5mdWxsVGFsa01lc3NhZ2VzW2ZpcnN0TWVzc2FnZS5pZF1baV0uaXNQYXJlbnRPcGVuID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFsay5mdWxsVGFsa01lc3NhZ2VzW2ZpcnN0TWVzc2FnZS5pZF1baV0uY3JlYXRlZEVkaXQgPSBnZXRUaW1pbmcodGFsay5mdWxsVGFsa01lc3NhZ2VzW2ZpcnN0TWVzc2FnZS5pZF1baV0uY3JlYXRlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuc3dlciA9IHRhbGsuZnVsbFRhbGtNZXNzYWdlc1tmaXJzdE1lc3NhZ2UuaWRdW2ldLmNvbW1lbnRUZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHBhcmVudElkID0gbWVzc2FnZS5pZDtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGlzV2FsbCA9IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgaXNGaXJzdExldmVsID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRhbGsudG9waWNJZCA9IHRvcGljSWQ7XHJcbiAgICAgICAgICAgIHRhbGsucGFyZW50SWQgPSBwYXJlbnRJZDtcclxuICAgICAgICAgICAgdGFsay5jb21tZW50VGV4dCA9IGFuc3dlcjtcclxuXHJcbiAgICAgICAgICAgIG5ld01lc3NhZ2UgPSBwb3N0TWVzc2FnZU15KHRhbGssIGlzV2FsbCwgaXNGaXJzdExldmVsLCAkZmlsdGVyKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChuZXdNZXNzYWdlID09IDApIHtcclxuICAgICAgICAgICAgICAgIGlmICghbWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhbGsuaXNDcmVhdGVNZXNzYWdlVG9GaXJzdEVycm9yID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0YWxrLmNyZWF0ZU1lc3NhZ2VUb0ZpcnN0RXJyb3JUZXh0ID0gXCLQktGLINC90LUg0LLQstC10LvQuCDRgdC+0L7QsdGJ0LXQvdC40LVcIjtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFsay5pc0NyZWF0ZU1lc3NhZ2VFcnJvciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFsay5jcmVhdGVNZXNzYWdlRXJyb3JUZXh0ID0gXCLQktGLINC90LUg0LLQstC10LvQuCDRgdC+0L7QsdGJ0LXQvdC40LVcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICghbWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhbGsuaXNDcmVhdGVNZXNzYWdlVG9GaXJzdEVycm9yID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlyc3RNZXNzYWdlLmFuc3dlcklucHV0SXNTaG93ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlyc3RNZXNzYWdlLmlzRWRpdCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFsay5pc0NyZWF0ZU1lc3NhZ2VFcnJvciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZnVsbFRhbGtNZXNzYWdlc0xlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0YWxrLmZ1bGxUYWxrTWVzc2FnZXNbZmlyc3RNZXNzYWdlLmlkXVtpXS5pZCA9PSBtZXNzYWdlLmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWxrLmZ1bGxUYWxrTWVzc2FnZXNbZmlyc3RNZXNzYWdlLmlkXVtpXS5hbnN3ZXJJbnB1dElzU2hvdyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFsay5mdWxsVGFsa01lc3NhZ2VzW2ZpcnN0TWVzc2FnZS5pZF1baV0uaXNFZGl0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGFsay5mdWxsVGFsa01lc3NhZ2VzW2ZpcnN0TWVzc2FnZS5pZF0gPSBtZXNzYWdlQ2xpZW50LmdldE1lc3NhZ2VzKHRvcGljSWQsIHRhbGsuc2VsZWN0ZWRHcm91cC5pZCwgMSwgZmlyc3RNZXNzYWdlLmlkLCAwLCAxMDAwKS5tZXNzYWdlcztcclxuXHJcbiAgICAgICAgICAgICAgICB0YWxrLmZ1bGxUYWxrTWVzc2FnZXNbZmlyc3RNZXNzYWdlLmlkXSA/XHJcbiAgICAgICAgICAgICAgICAgICAgZnVsbFRhbGtNZXNzYWdlc0xlbmd0aCA9IHRhbGsuZnVsbFRhbGtNZXNzYWdlc1tmaXJzdE1lc3NhZ2UuaWRdLmxlbmd0aCA6XHJcbiAgICAgICAgICAgICAgICAgICAgZnVsbFRhbGtNZXNzYWdlc0xlbmd0aCA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmdWxsVGFsa01lc3NhZ2VzTGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0YWxrLmZ1bGxUYWxrTWVzc2FnZXNbZmlyc3RNZXNzYWdlLmlkXVtpXS5hbnN3ZXJJbnB1dElzU2hvdyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRhbGsuZnVsbFRhbGtNZXNzYWdlc1tmaXJzdE1lc3NhZ2UuaWRdW2ldLmlzVHJlZU9wZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRhbGsuZnVsbFRhbGtNZXNzYWdlc1tmaXJzdE1lc3NhZ2UuaWRdW2ldLmlzT3BlbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFsay5mdWxsVGFsa01lc3NhZ2VzW2ZpcnN0TWVzc2FnZS5pZF1baV0uaXNQYXJlbnRPcGVuID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0YWxrLmZ1bGxUYWxrTWVzc2FnZXNbZmlyc3RNZXNzYWdlLmlkXVtpXS5jcmVhdGVkRWRpdCA9IGdldFRpbWluZyh0YWxrLmZ1bGxUYWxrTWVzc2FnZXNbZmlyc3RNZXNzYWdlLmlkXVtpXS5jcmVhdGVkKTtcclxuICAgICAgICAgICAgICAgICAgICB0YWxrLmZ1bGxUYWxrTWVzc2FnZXNbZmlyc3RNZXNzYWdlLmlkXVtpXS5jb21tZW50VGV4dCA9IFRFWFRfREVGQVVMVF8yO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBhZGREaWFsb2dNZXNzYWdlKGN0cmwpIHtcclxuICAgICAgICAgICAgdmFyIGF0dGFjaCA9IFtdO1xyXG5cclxuICAgICAgICAgICAgaWYgKChjdHJsLmNvbW1lbnRUZXh0ICE9IFRFWFRfREVGQVVMVF8xICYmIGN0cmwuY29tbWVudFRleHQgIT0gXCJcIikgfHwgYXR0YWNoLmxlbmd0aCAhPSAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGN0cmwuaXNFZGl0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g0LfQvdCw0YfQuNGCINGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40LVcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGF0dGFjaEltZyA9IGdldEF0dGFjaGVkSW1hZ2VzKCQoJyNhdHRhY2gtYXJlYS1lZGl0LScgKyBjdHJsLmF0dGFjaElkKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGF0dGFjaERvYyA9IGdldEF0dGFjaGVkRG9jcygkKCcjYXR0YWNoLWRvYy1hcmVhLWVkaXQtJyArIGN0cmwuYXR0YWNoSWQpLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBhdHRhY2ggPSBhdHRhY2hJbWcuY29uY2F0KGF0dGFjaERvYyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vINC10YnQtSBhdHRhY2hcclxuICAgICAgICAgICAgICAgICAgICBjdHJsLmNvbW1lbnRUZXh0ID0gJGZpbHRlcignbGlua3knKShjdHJsLmNvbW1lbnRUZXh0LCAnYmxhbmsnKTtcclxuICAgICAgICAgICAgICAgICAgICBjdHJsLmNvbW1lbnRUZXh0ID0gd2l0aFRhZ3MoY3RybC5jb21tZW50VGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlhbG9nQ2xpZW50LnVwZGF0ZURpYWxvZ01lc3NhZ2UoY3RybC5pZCwgY3RybC5jb21tZW50VGV4dCwgYXR0YWNoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYW5BdHRhY2hlZCgkKCcjYXR0YWNoLWFyZWEtZWRpdC0nICsgY3RybC5hdHRhY2hJZCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFuQXR0YWNoZWQoJCgnI2F0dGFjaC1kb2MtYXJlYS1lZGl0LScgKyBjdHJsLmF0dGFjaElkKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGN0cmwuY29udGVudCA9IGN0cmwuY29tbWVudFRleHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGN0cmwuaW1hZ2VzID0gYXR0YWNoSW1nO1xyXG4gICAgICAgICAgICAgICAgICAgIGN0cmwuZG9jdW1lbnRzID0gYXR0YWNoRG9jO1xyXG4gICAgICAgICAgICAgICAgICAgIGN0cmwuaXNFZGl0ID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDQt9C90LDRh9C40YIg0YHQvtC30LTQsNC90LjQtVxyXG4gICAgICAgICAgICAgICAgICAgIGF0dGFjaCA9IGdldEF0dGFjaGVkSW1hZ2VzKCQoJyNhdHRhY2gtYXJlYS0nICsgY3RybC5hdHRhY2hJZCkpLmNvbmNhdChnZXRBdHRhY2hlZERvY3MoJCgnI2F0dGFjaC1kb2MtYXJlYS0nICsgY3RybC5hdHRhY2hJZCkpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld0RpYWxvZ01lc3NhZ2UgPSBuZXcgY29tLnZtZXN0ZW9ubGluZS5iZS50aHJpZnQubWVzc2FnZXNlcnZpY2UuRGlhbG9nTWVzc2FnZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAoY3RybC5jb21tZW50VGV4dCA9PSBURVhUX0RFRkFVTFRfMSkgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdEaWFsb2dNZXNzYWdlLmNvbnRlbnQgPSBcIlwiIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3RGlhbG9nTWVzc2FnZS5jb250ZW50ID0gY3RybC5jb21tZW50VGV4dDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3RGlhbG9nTWVzc2FnZS5hdXRob3IgPSAkcm9vdFNjb3BlLmJhc2UubWUuaWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG5ld0RpYWxvZ01lc3NhZ2UuY3JlYXRlZCA9IERhdGUucGFyc2UobmV3IERhdGUoKSkgLyAxMDAwO1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld0RpYWxvZ01lc3NhZ2UuYXV0aG9yUHJvZmlsZSA9IHVzZXJDbGllbnQuZ2V0VXNlclByb2ZpbGUobmV3RGlhbG9nTWVzc2FnZS5hdXRob3IpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBuZXdEaWFsb2dNZXNzYWdlLmNvbnRlbnQgPSAkZmlsdGVyKCdsaW5reScpKG5ld0RpYWxvZ01lc3NhZ2UuY29udGVudCwgJ2JsYW5rJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3RGlhbG9nTWVzc2FnZS5jb250ZW50ID0gd2l0aFRhZ3MobmV3RGlhbG9nTWVzc2FnZS5jb250ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGVtcE1lc3NhZ2UgPSBkaWFsb2dDbGllbnQucG9zdE1lc3NhZ2UoY3RybC5kaWFsb2dJZCwgbmV3RGlhbG9nTWVzc2FnZS5jb250ZW50LCBhdHRhY2gpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBuZXdEaWFsb2dNZXNzYWdlLmltYWdlcyA9IHRlbXBNZXNzYWdlLmltYWdlcztcclxuICAgICAgICAgICAgICAgICAgICBuZXdEaWFsb2dNZXNzYWdlLmRvY3VtZW50cyA9IHRlbXBNZXNzYWdlLmRvY3VtZW50cztcclxuICAgICAgICAgICAgICAgICAgICBuZXdEaWFsb2dNZXNzYWdlLmlkID0gdGVtcE1lc3NhZ2UuaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3RGlhbG9nTWVzc2FnZS5pc0RpYWxvZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3RGlhbG9nTWVzc2FnZS5hdHRhY2hJZCA9IGN0cmwuZGlhbG9nSWQgKyBcIi1cIiArIG5ld0RpYWxvZ01lc3NhZ2UuaWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vY3RybC5wcml2YXRlTWVzc2FnZXMudW5zaGlmdChuZXdEaWFsb2dNZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmJhc2UucHJpdmF0ZU1lc3NhZ2VzLnVuc2hpZnQobmV3RGlhbG9nTWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5iYXNlLmluaXRTdGFydFBhcmFtc0ZvckNyZWF0ZU1lc3NhZ2UobmV3RGlhbG9nTWVzc2FnZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdHJsLnByaXZhdGVNZXNzYWdlcy5sZW5ndGggPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDQvdCwINGB0LvRg9GH0LDQuSDQtdGB0LvQuCDRgSAwINC00L7QsdCw0LLQu9GP0LXRgtGB0Y8g0LHQvtC70LXQtSAyMCDRgdC+0L7QsdGJ0LXQvdC40LlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g0YfRgtC+0LHRiyDQv9C+0LTQs9GA0YPQttCw0Lsg0L7RgiAx0LPQviDRgdC+0L7QsdGJ0LXQvdC40Y8g0LAg0L3QtSDQvtGCIDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5iYXNlLmxhc3RMb2FkZWRJZCA9IG5ld0RpYWxvZ01lc3NhZ2UuaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjdHJsLmNvbW1lbnRUZXh0ID0gVEVYVF9ERUZBVUxUXzE7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFuQXR0YWNoZWQoJCgnI2F0dGFjaC1hcmVhLScgKyBjdHJsLmF0dGFjaElkKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYW5BdHRhY2hlZCgkKCcjYXR0YWNoLWRvYy1hcmVhLScgKyBjdHJsLmF0dGFjaElkKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJHJvb3RTY29wZS5jcmVhdGVNZXNzYWdlID0gZnVuY3Rpb24gKGUsIGN0cmwsIHRvcGljSWQsIHRhbGssIG1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFjdHJsLmlzRWRpdCkge1xyXG4gICAgICAgICAgICAgICAgJChlLnRhcmdldCkuY2xvc2VzdCgnLmFuc3dlci1ibG9jaycpLmZpbmQoJy5tZXNzYWdlLXRleHRhcmVhJykuaGVpZ2h0KFRFWFRBUkVBX0RFRkFVTFRfSEVJR0hUKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGN0cmwuaXNUYWxrKSB7XHJcbiAgICAgICAgICAgICAgICAvL2FsZXJ0KCcxMTEgJytjdHJsLmZ1bGxBZHZlcnRUb3BpYytcIiBcIitjdHJsLnBhcmVudElkKTtcclxuICAgICAgICAgICAgICAgIGlmICgoY3RybC5mdWxsVGFsa1RvcGljIHx8IGN0cmwucGFyZW50SWQgPT0gMCkgJiYgIXRvcGljSWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL2FsZXJ0KCcxJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRkU2luZ2xlRmlyc3RNZXNzYWdlKGN0cmwpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIW1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9hbGVydCgnMicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRTaW5nbGVNZXNzYWdlKGN0cmwsIHRvcGljSWQsIHRhbGspO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vYWxlcnQoJzMnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkU2luZ2xlTWVzc2FnZShtZXNzYWdlLCB0b3BpY0lkLCB0YWxrLCBjdHJsKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGN0cmwuaXNEaWFsb2cpIHtcclxuICAgICAgICAgICAgICAgIGFkZERpYWxvZ01lc3NhZ2UoY3RybCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjcmVhdGVXYWxsTWVzc2FnZShjdHJsKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBiYXNlLmluaXRTdGFydFBhcmFtc0ZvckNyZWF0ZU1lc3NhZ2UgPSBmdW5jdGlvbiAoY3RybCkge1xyXG5cclxuICAgICAgICAgICAgY3RybC5pc0VkaXQgPSBmYWxzZTtcclxuICAgICAgICAgICAgY3RybC5hbnN3ZXJTaG93ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGN0cmwuaXNGb2N1cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBjdHJsLmlzQ3JlYXRlQ29tbWVudEVycm9yID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBpZiAoY3RybC5pc0RpYWxvZykge1xyXG4gICAgICAgICAgICAgICAgY3RybC5kZWZhdWx0ID0gY3RybC5jb21tZW50VGV4dCA9IFRFWFRfREVGQVVMVF8xO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY3RybC5kZWZhdWx0ID0gY3RybC5jb21tZW50VGV4dCA9IFRFWFRfREVGQVVMVF8yO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoY3RybC5pZCB8fCBjdHJsLmlzRGlhbG9nKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDQt9Cw0L3Rh9C40YIg0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjQtVxyXG4gICAgICAgICAgICAgICAgaWYgKCFjdHJsLmlzVGFsaykgY3RybC5jb21tZW50VGV4dCA9IGN0cmwuY29udGVudDtcclxuICAgICAgICAgICAgICAgIGN0cmwuYW5zd2VyU2hvdyA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyDQt9C90LDRh9C40YIg0YHQvtC30LTQsNC90LjQtVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGJhc2UuZ2V0VXNlckNvbG9yID0gZnVuY3Rpb24gKGdyb3VwVHlwZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZ2V0VGFnQ29sb3IoZ2V0TGFiZWwoYmFzZS5ncm91cHMsIGdyb3VwVHlwZSkpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGJhc2UudG9nZ2xlRnVsbFRleHQgPSBmdW5jdGlvbiAoY3RybCkge1xyXG4gICAgICAgICAgICBjdHJsLmlzRnVsbFRleHQgPyBjdHJsLmlzRnVsbFRleHQgPSBmYWxzZSA6IGN0cmwuaXNGdWxsVGV4dCA9IHRydWU7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgYmFzZS5zZXRQcml2YXRlTWVzc2FnZXMgPSBmdW5jdGlvbiAoZGlhbG9nSWQsIGxvYWRlZExlbmd0aCkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5iYXNlLnByaXZhdGVNZXNzYWdlcyA9IGRpYWxvZ0NsaWVudC5nZXREaWFsb2dNZXNzYWdlcyhkaWFsb2dJZCwgMCwgbG9hZGVkTGVuZ3RoLCAwKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdkaWFsb2dzJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHByaXZhdGVNZXNzYWdlc0xlbmd0aCA9ICRyb290U2NvcGUuYmFzZS5wcml2YXRlTWVzc2FnZXMubGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgaWYgKHByaXZhdGVNZXNzYWdlc0xlbmd0aCAhPSAwKSAkcm9vdFNjb3BlLmJhc2UubGFzdExvYWRlZElkID0gJHJvb3RTY29wZS5iYXNlLnByaXZhdGVNZXNzYWdlc1twcml2YXRlTWVzc2FnZXNMZW5ndGggLSAxXS5pZDtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJpdmF0ZU1lc3NhZ2VzTGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICRyb290U2NvcGUuYmFzZS5wcml2YXRlTWVzc2FnZXNbaV0uYXV0aG9yUHJvZmlsZSA9IHVzZXJDbGllbnQuZ2V0VXNlclByb2ZpbGUoJHJvb3RTY29wZS5iYXNlLnByaXZhdGVNZXNzYWdlc1tpXS5hdXRob3IpO1xyXG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5iYXNlLnByaXZhdGVNZXNzYWdlc1tpXS5pc0RpYWxvZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmJhc2UucHJpdmF0ZU1lc3NhZ2VzW2ldLmF0dGFjaElkID0gZGlhbG9nSWQgKyBcIi1cIiArICRyb290U2NvcGUuYmFzZS5wcml2YXRlTWVzc2FnZXNbaV0uaWQ7XHJcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmJhc2UuaW5pdFN0YXJ0UGFyYW1zRm9yQ3JlYXRlTWVzc2FnZSgkcm9vdFNjb3BlLmJhc2UucHJpdmF0ZU1lc3NhZ2VzW2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGJhc2UubmV3UHJpdmF0ZU1lc3NhZ2VzQ291bnQgPSAwO1xyXG4gICAgICAgIGJhc2UuYmlnZ2VzdENvdW50RGlhbG9nSWQgPSAwO1xyXG4gICAgICAgICRyb290U2NvcGUubmV3TWVzc2FnZXMgPSBbXTtcclxuICAgICAgICAkcm9vdFNjb3BlLm5ld0ltcG9ydGFudENvdW50ID0gMDtcclxuXHJcbiAgICAgICAgdmFyIHRpbWVTdGFtcCA9IDA7XHJcbiAgICAgICAgYmFzZS5jaGVja1VwZGF0ZXMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICB0aW1lU3RhbXAgPSBtZXNzYWdlQ2xpZW50LmNoZWNrVXBkYXRlcyh0aW1lU3RhbXApO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5sb2NhdGlvbi5yZXBsYWNlKCcvbG9naW4nKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIHVwZGF0ZU1hcCxcclxuICAgICAgICAgICAgICAgIG9sZCA9IDA7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygndGltZXN0ZW1wICcgKyB0aW1lU3RhbXApO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRpbWVTdGFtcCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZU1hcCA9IG1lc3NhZ2VDbGllbnQuZ2V0RGlhbG9nVXBkYXRlcygpO1xyXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmxvY2F0aW9uLnJlcGxhY2UoJy9sb2dpbicpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIHRlbXAgPSAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnREaWFsb2dJZCxcclxuICAgICAgICAgICAgICAgICAgICBjb3VudGVyID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZigkcm9vdFNjb3BlLmJhc2UgJiYgJHJvb3RTY29wZS5iYXNlLmN1cnJlbnREaWFsb2dJZCljdXJyZW50RGlhbG9nSWQgPSAkcm9vdFNjb3BlLmJhc2UuY3VycmVudERpYWxvZ0lkO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLm5ld01lc3NhZ2VzID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgZGlhbG9nSWQgaW4gdXBkYXRlTWFwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5uZXdNZXNzYWdlc1tjb3VudGVyKytdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaWFsb2dJZDogZGlhbG9nSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50OiB1cGRhdGVNYXBbZGlhbG9nSWRdXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGlhbG9nSWQgIT0gY3VycmVudERpYWxvZ0lkIHx8ICRyb290U2NvcGUuY3VycmVudFBhZ2UgIT0gJ2RpYWxvZy1zaW5nbGUnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wICs9IHVwZGF0ZU1hcFtkaWFsb2dJZF07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodXBkYXRlTWFwW2RpYWxvZ0lkXSA+IG9sZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFzZS5iaWdnZXN0Q291bnREaWFsb2dJZCA9IGRpYWxvZ0lkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbGQgPSB1cGRhdGVNYXBbZGlhbG9nSWRdO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhc2Uuc2V0UHJpdmF0ZU1lc3NhZ2VzKGN1cnJlbnREaWFsb2dJZCwgMjApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBiYXNlLm5ld1ByaXZhdGVNZXNzYWdlc0NvdW50ID0gdGVtcDtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kZGlnZXN0KCk7XHJcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2VycicpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aW1lU3RhbXAgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgLy8gbm90aWZpY2F0aW9uXHJcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLm5ld01lc3NhZ2VzID0gW107XHJcbiAgICAgICAgICAgICAgICBiYXNlLm1lLm5vdGlmaWNhdGlvbklzU2hvdyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBiYXNlLm1lLnVzZXJOb3RpZmljYXRpb24gPSBtZXNzYWdlQ2xpZW50LmdldE11bHRpY2FzdE1lc3NhZ2UoKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGltZVN0YW1wID49IDIgJiYgdGltZVN0YW1wIDwgMTAwMDApIHtcclxuICAgICAgICAgICAgICAgIC8vIGltcG9ydGFudCBtZXNzYWdlc1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2ltcG9ydGFudCAnICsgdGltZVN0YW1wKTtcclxuICAgICAgICAgICAgICAgICRyb290U2NvcGUubmV3TWVzc2FnZXMgPSBbXTtcclxuICAgICAgICAgICAgICAgICRyb290U2NvcGUubmV3SW1wb3J0YW50Q291bnQgPSB0aW1lU3RhbXA7XHJcblxyXG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5pbXBvcnRhbnRUb3BpY3MgPSBtZXNzYWdlQ2xpZW50LmdldEltcG9ydGFudE5ld3MoJHJvb3RTY29wZS5jdXJyZW50R3JvdXAuaWQpO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICRyb290U2NvcGUubmV3TWVzc2FnZXMgPSBbXTtcclxuICAgICAgICAgICAgICAgICRyb290U2NvcGUubmV3SW1wb3J0YW50Q291bnQgPSAwO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHNldEludGVydmFsKGJhc2UuY2hlY2tVcGRhdGVzLCA1MDAwKTtcclxuXHJcbiAgICAgICAgYmFzZS5uZXh0Tm90aWZpY2F0aW9uID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBiYXNlLm1lLnVzZXJOb3RpZmljYXRpb24gPSBtZXNzYWdlQ2xpZW50LmdldE5leHRNdWx0aWNhc3RNZXNzYWdlKCk7XHJcbiAgICAgICAgICAgIGlmICghYmFzZS5tZS51c2VyTm90aWZpY2F0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBiYXNlLm1lLm5vdGlmaWNhdGlvbklzU2hvdyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgYmFzZS5ncm91cEFkZHJlc2VzTGlzdCA9IFtdO1xyXG4gICAgICAgIGJhc2UuaXNBZGRyZXNlc0xpc3RTaG93ID0gW107XHJcbiAgICAgICAgYmFzZS5zaG93R3JvdXBBZHJlc3Nlc0xpc3QgPSBmdW5jdGlvbihtZXNzYWdlSWQpe1xyXG4gICAgICAgICAgICBpZighYmFzZS5ncm91cEFkZHJlc2VzTGlzdFttZXNzYWdlSWRdKSB7XHJcbiAgICAgICAgICAgICAgICBiYXNlLmdyb3VwQWRkcmVzZXNMaXN0W21lc3NhZ2VJZF0gPSB1c2VyQ2xpZW50LmdldEFkZHJlc3NMaXN0QnlNZXNzYWdlSWQobWVzc2FnZUlkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBiYXNlLmlzQWRkcmVzZXNMaXN0U2hvd1ttZXNzYWdlSWRdID0gdHJ1ZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGJhc2UuaGlkZUdyb3VwQWRyZXNzZXNMaXN0ID0gZnVuY3Rpb24obWVzc2FnZUlkKXtcclxuICAgICAgICAgICAgYmFzZS5pc0FkZHJlc2VzTGlzdFNob3dbbWVzc2FnZUlkXSA9IGZhbHNlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGJhc2UudXNlck1lbnVUb2dnbGUgPSBmdW5jdGlvbigkZXZlbnQpe1xyXG4gICAgICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBiYXNlLmlzVXNlck1lbnVTaG93ID8gYmFzZS5pc1VzZXJNZW51U2hvdyA9IGZhbHNlIDogYmFzZS5pc1VzZXJNZW51U2hvdyA9IHRydWU7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgYmFzZS5pc0F0dGFjaERyb3Bkb3duU2hvdyA9IFtdO1xyXG4gICAgICAgIGJhc2UuaXNIYXNodGFnRHJvcGRvd25TaG93ID0gZmFsc2U7XHJcbiAgICAgICAgYmFzZS5pc1J1YnJpY3NEcm9wZG93blNob3cgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgYmFzZS50b2dnbGVBdHRhY2hEcm9wZG93biA9IGZ1bmN0aW9uKCRldmVudCxjdHJsLGN0cmxJZCl7XHJcbiAgICAgICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBpZDtcclxuICAgICAgICAgICAgaWYoY3RybCkge1xyXG4gICAgICAgICAgICAgICAgKGN0cmwuaXNFZGl0KSA/IGlkID0gY3RybC5pZCA6IGlkID0gY3RybC5hdHRhY2hJZDtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZCA9IGN0cmxJZDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYmFzZS5pc0F0dGFjaERyb3Bkb3duU2hvd1tpZF0gP1xyXG4gICAgICAgICAgICAgICAgYmFzZS5pc0F0dGFjaERyb3Bkb3duU2hvd1tpZF0gPSBmYWxzZSA6XHJcbiAgICAgICAgICAgICAgICAgICAgYmFzZS5pc0F0dGFjaERyb3Bkb3duU2hvd1tpZF0gPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnMycsaWQsYmFzZS5pc0F0dGFjaERyb3Bkb3duU2hvd1tpZF0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgYmFzZS50b2dnbGVIYXNodGFnRHJvcGRvd24gPSBmdW5jdGlvbigkZXZlbnQpe1xyXG4gICAgICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIGJhc2UuaXNIYXNodGFnRHJvcGRvd25TaG93ID8gYmFzZS5pc0hhc2h0YWdEcm9wZG93blNob3cgPSBmYWxzZSA6IGJhc2UuaXNIYXNodGFnRHJvcGRvd25TaG93ID0gdHJ1ZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGJhc2UudG9nZ2xlUnVicmljc0Ryb3Bkb3duID0gZnVuY3Rpb24oJGV2ZW50KXtcclxuICAgICAgICAgICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBiYXNlLmlzUnVicmljc0Ryb3Bkb3duU2hvdyA/IGJhc2UuaXNSdWJyaWNzRHJvcGRvd25TaG93ID0gZmFsc2UgOiBiYXNlLmlzUnVicmljc0Ryb3Bkb3duU2hvdyA9IHRydWU7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgYmFzZS5oaWRlRHJvcGRvd24gPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBiYXNlLmlzVXNlck1lbnVTaG93ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGJhc2UuaXNBdHRhY2hEcm9wZG93blNob3cgPSBbXTtcclxuICAgICAgICAgICAgYmFzZS5pc0hhc2h0YWdEcm9wZG93blNob3cgPSBmYWxzZTtcclxuICAgICAgICAgICAgYmFzZS5pc1J1YnJpY3NEcm9wZG93blNob3cgPSBmYWxzZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBiYXNlLmNvbnRlbnRMZW5ndGggPSA1MDA7XHJcblxyXG4gICAgICAgIC8qdmFyIGxzR3JvdXBJZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdncm91cElkJyksXHJcbiAgICAgICAgICAgIGdyb3Vwc0xlbmd0aCA9IGJhc2UuZ3JvdXBzLmxlbmd0aDsqL1xyXG5cclxuICAgICAgICAvKmlmICghbHNHcm91cElkKSB7Ki9cclxuICAgICAgICAgICAgJHJvb3RTY29wZS5jdXJyZW50R3JvdXAgPSBnZXREZWZhdWx0R3JvdXAoYmFzZS5ncm91cHMpO1xyXG4gICAgICAgIC8qfSBlbHNlIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBncm91cHNMZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGJhc2UuZ3JvdXBzW2ldLmlkID09IGxzR3JvdXBJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuY3VycmVudEdyb3VwID0gYmFzZS5ncm91cHNbaV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCEkcm9vdFNjb3BlLmN1cnJlbnRHcm91cCkge1xyXG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5jdXJyZW50R3JvdXAgPSBnZXREZWZhdWx0R3JvdXAoYmFzZS5ncm91cHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSovXHJcblxyXG4gICAgICAgIGJhc2UuaXNMZW50YUZvY3VzID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGJhc2UuY2hlY2tVcGRhdGVzKCk7XHJcblxyXG4gICAgICAgICRyb290U2NvcGUuY3VycmVudFBhZ2UgPSAnbGVudGEnO1xyXG5cclxuICAgICAgICAkcm9vdFNjb3BlLmxlZnRiYXIgPSB7fTtcclxuICAgIH1cclxuXHJcbiAgICAkcm9vdFNjb3BlLmJhc2UgPSBiYXNlO1xyXG5cclxuICAgIH07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFsgJyRzY29wZScsJyRyb290U2NvcGUnLCckc3RhdGUnLCckZmlsdGVyJywnJGxvY2F0aW9uJywgYmFzZUN0cmwgXTsiLCJcclxudmFyIGJsb2dDdHJsID0gZnVuY3Rpb24oJHJvb3RTY29wZSkge1xyXG4gICAgdmFyIGJsb2cgPSB0aGlzO1xyXG5cclxuICAgICRyb290U2NvcGUuYmFzZS5pc0Zvb3RlckJvdHRvbSA9IHRydWU7XHJcblxyXG4gICAgYmxvZy5pc0F1dGggPSBhdXRoQ2xpZW50LmNoZWNrSWZBdXRob3JpemVkKCk7XHJcblxyXG4gICAgaWYoYmxvZy5pc0F1dGgpe1xyXG4gICAgICAgIC8vbWUgPSB1c2VyQ2xpZW50LmdldFVzZXJQcm9maWxlKCk7XHJcbiAgICAgICAgLy8kKCcuYW5vbk5hbWUnKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XHJcbiAgICB9XHJcblxyXG4gICAgYmxvZy5wb3N0cyA9IG1lc3NhZ2VDbGllbnQuZ2V0QmxvZygwLDEwMDApO1xyXG5cclxuICAgIHZhciBsZW4gPSBibG9nLnBvc3RzLnRvcGljcy5sZW5ndGg7XHJcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspe1xyXG4gICAgICAgIGJsb2cucG9zdHMudG9waWNzW2ldLmlzQ29tbWVudFNob3cgPSBmYWxzZTtcclxuICAgICAgICBibG9nLnBvc3RzLnRvcGljc1tpXS5pc0lucHV0U2hvdyA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGJsb2cudG9nZ2xlQ29tbSA9IGZ1bmN0aW9uKCRldmVudCxwb3N0KXtcclxuICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgaWYgKHBvc3QuaXNDb21tZW50U2hvdyl7XHJcbiAgICAgICAgICAgIHBvc3QuaXNDb21tZW50U2hvdyA9IGZhbHNlO1xyXG5cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcG9zdC5pc0NvbW1lbnRTaG93ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGlmKCFwb3N0LmNvbW1lbnRzKSB7XHJcbiAgICAgICAgICAgICAgICBwb3N0LmNvbW1lbnRzID0gbWVzc2FnZUNsaWVudC5nZXRNZXNzYWdlc0FzTGlzdChwb3N0LmlkLCA3LCAwLCBmYWxzZSwgMTAwMCkubWVzc2FnZXM7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZmluaXNoJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICBibG9nLnRvZ2dsZUlucHV0ID0gZnVuY3Rpb24oJGV2ZW50LHBvc3Qpe1xyXG4gICAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICBwb3N0LmlzSW5wdXRTaG93ID8gcG9zdC5pc0lucHV0U2hvdyA9IGZhbHNlIDogcG9zdC5pc0lucHV0U2hvdyA9IHRydWU7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdpbnB1dCcscG9zdC5pc0lucHV0U2hvdyk7XHJcblxyXG4gICAgICAgIC8vJCh0aGlzKS5jbG9zZXN0KCcucG9zdCcpLmZpbmQoJy5pbnB1dC1ncm91cCcpLnNsaWRlVG9nZ2xlKDIwMCxmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAvKmlmKHVzZXJOYW1lKXtcclxuICAgICAgICAgICAgICAgICQodGhpcykuZmluZCgndGV4dGFyZWEnKS52YWwodXNlck5hbWUpO1xyXG4gICAgICAgICAgICAgICAgc2V0Q2FyZXRUb1BvcygkKHRoaXMpLmZpbmQoJ3RleHRhcmVhJylbMF0sdXNlck5hbWUubGVuZ3RoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkKHRoaXMpLmZpbmQoJ3RleHRhcmVhJykuZm9jdXMoKTsqL1xyXG4gICAgICAgIC8vfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGJsb2cuc2VuZENvbW0gPSBmdW5jdGlvbigkZXZlbnQscG9zdCl7XHJcbiAgICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSBuZXcgY29tLnZtZXN0ZW9ubGluZS5iZS50aHJpZnQubWVzc2FnZXNlcnZpY2UuTWVzc2FnZSgpO1xyXG5cclxuICAgICAgICBtZXNzYWdlLmlkID0gMDtcclxuICAgICAgICBtZXNzYWdlLnRvcGljSWQgPSBwb3N0LmlkO1xyXG4gICAgICAgIG1lc3NhZ2UudHlwZSA9IGNvbS52bWVzdGVvbmxpbmUuYmUudGhyaWZ0Lm1lc3NhZ2VzZXJ2aWNlLk1lc3NhZ2VUeXBlLkJMT0c7Ly83O1xyXG4gICAgICAgIG1lc3NhZ2UuZ3JvdXBJZCA9IDA7XHJcbiAgICAgICAgbWVzc2FnZS5jb250ZW50ID0gcG9zdC5jb21tZW50aW5nO1xyXG4gICAgICAgIG1lc3NhZ2UucGFyZW50SWQgPSAwO1xyXG4gICAgICAgIG1lc3NhZ2UuY3JlYXRlZCA9IERhdGUucGFyc2UobmV3IERhdGUoKSkvMTAwMDtcclxuXHJcbiAgICAgICAgaWYoIWJsb2cuaXNBdXRoKXtcclxuICAgICAgICAgICAgbWVzc2FnZS5hbm9uTmFtZSA9IHBvc3QuYW5vbk5hbWU7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIG1lc3NhZ2UuYW5vbk5hbWUgPSBcIlwiO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHZhciByZXR1cm5Db21tZW50ID0gbWVzc2FnZUNsaWVudC5wb3N0QmxvZ01lc3NhZ2UobWVzc2FnZSk7XHJcbiAgICAgICAgaWYocG9zdC5jb21tZW50cyAmJiBwb3N0LmNvbW1lbnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBwb3N0LmNvbW1lbnRzLnB1c2gocmV0dXJuQ29tbWVudCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHBvc3QuY29tbWVudHMgPSBbXTtcclxuICAgICAgICAgICAgcG9zdC5jb21tZW50c1swXSA9IHJldHVybkNvbW1lbnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgYmxvZy5nZXRUaW1pbmcgPSBmdW5jdGlvbihtZXNzYWdlT2JqRGF0ZSl7XHJcbiAgICAgICAgdmFyIG1pbnV0ZSA9IDYwKjEwMDAsXHJcbiAgICAgICAgICAgIGhvdXIgPSBtaW51dGUqNjAsXHJcbiAgICAgICAgICAgIGRheSA9IGhvdXIqMjQsXHJcbiAgICAgICAgICAgIHRocmVlRGF5cyA9IGRheSogMyxcclxuICAgICAgICAgICAgbm93ID0gRGF0ZS5wYXJzZShuZXcgRGF0ZSgpKSxcclxuICAgICAgICAgICAgdGltaW5nID0gKG5vdyAtIG1lc3NhZ2VPYmpEYXRlKjEwMDApLFxyXG4gICAgICAgICAgICB0aW1lVGVtcDtcclxuXHJcbiAgICAgICAgaWYodGltaW5nIDwgbWludXRlKXtcclxuICAgICAgICAgICAgdGltaW5nID0gXCLRgtC+0LvRjNC60L4g0YfRgtC+XCI7XHJcbiAgICAgICAgfWVsc2UgaWYodGltaW5nIDwgaG91cil7XHJcbiAgICAgICAgICAgIHRpbWluZyA9IG5ldyBEYXRlKHRpbWluZyk7XHJcbiAgICAgICAgICAgIHRpbWluZyA9IHRpbWluZy5nZXRNaW51dGVzKCkrXCIg0LzQuNC9INC90LDQt9Cw0LRcIjtcclxuICAgICAgICB9ZWxzZSBpZih0aW1pbmcgPCBkYXkpe1xyXG4gICAgICAgICAgICB0aW1pbmcgPSBuZXcgRGF0ZSh0aW1pbmcpO1xyXG4gICAgICAgICAgICB0aW1lVGVtcCA9IHRpbWluZy5nZXRIb3VycygpO1xyXG4gICAgICAgICAgICBpZih0aW1lVGVtcCA9PSAxIHx8IHRpbWVUZW1wID09IDApe1xyXG4gICAgICAgICAgICAgICAgdGltaW5nID0gXCIxINGH0LDRgSDQvdCw0LfQsNC0XCI7XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKHRpbWVUZW1wID4gMSAmJiB0aW1lVGVtcCA8IDUpe1xyXG4gICAgICAgICAgICAgICAgdGltaW5nID0gdGltZVRlbXAgKyBcIiDRh9Cw0YHQsCDQvdCw0LfQsNC0XCI7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGltaW5nID0gdGltZVRlbXAgKyBcIiDRh9Cw0YHQvtCyINC90LDQt9Cw0LRcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNlIGlmKHRpbWluZyA8IHRocmVlRGF5cyl7XHJcbiAgICAgICAgICAgIHRpbWluZyA9IG5ldyBEYXRlKHRpbWluZyk7XHJcbiAgICAgICAgICAgIHRpbWVUZW1wID0gdGltaW5nLmdldERhdGUoKTtcclxuICAgICAgICAgICAgaWYodGltZVRlbXAgPT0gMSl7XHJcbiAgICAgICAgICAgICAgICB0aW1pbmcgPSB0aW1lVGVtcCtcIiDQtNC10L3RjCDQvdCw0LfQsNC0XCI7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGltaW5nID0gdGltZVRlbXArXCIg0LTQvdC10Lkg0L3QsNC30LDQtFwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRpbWVUZW1wID0gbmV3IERhdGUobWVzc2FnZU9iakRhdGUqMTAwMCkudG9Mb2NhbGVEYXRlU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIHZhciBhcnIgPSB0aW1lVGVtcC5zcGxpdCgnLicpO1xyXG4gICAgICAgICAgICBpZihhcnJbMF0ubGVuZ3RoID09IDEpIGFyclswXSA9IFwiMFwiK2FyclswXTtcclxuICAgICAgICAgICAgaWYoYXJyWzFdLmxlbmd0aCA9PSAxKSBhcnJbMV0gPSBcIjBcIithcnJbMV07XHJcbiAgICAgICAgICAgIHRpbWluZyA9IGFyclswXStcIi5cIithcnJbMV0rXCIuXCIrYXJyWzJdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRpbWluZztcclxuICAgIH07XHJcblxyXG4gICAgLyokKCcuaXRlbWRpdicpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgc3BhbiA9ICQodGhpcykuZmluZCgnLmxlbnRhLWl0ZW0tYm90dG9tIHNwYW4nKTtcclxuICAgICAgICB2YXIgY3JlYXRlZCA9IHNwYW4uYXR0cignZGF0YS1jcmVhdGVkJyk7XHJcblxyXG4gICAgICAgIHNwYW4udGV4dChnZXRUaW1pbmcoY3JlYXRlZCkpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdmFyIGggPSAkKHdpbmRvdykuaGVpZ2h0KCktMTA1O1xyXG4gICAgJCgnLmNvbnRhaW5lci5jb21pbmctc29vbiAubWFpbi1jb250YWluZXInKS5jc3MoeydtaW4taGVpZ2h0JzogaH0pO1xyXG5cclxuICAgICQoJy5wb3N0JykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciBsaW5rID0gJCh0aGlzKS5hdHRyKCdkYXRhLXBvc3RsaW5rJyk7XHJcblxyXG4gICAgICAgICQodGhpcykuZmluZCgnLnRvcGljJykubG9hZChsaW5rKycgLnBvc3QnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdmFyIGlzQ29tbWVudHNMb2FkZWQgPSBbXTtcclxuICAgICQoJy5zaG93LWNvbW1lbnQnKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgIGlmKCQodGhpcykudGV4dCgpID09IFwi0J/QvtC60LDQt9Cw0YLRjCDQutC+0LzQvNC10L3RgtCw0YDQuNC4XCIpe1xyXG4gICAgICAgICAgICAkKHRoaXMpLnRleHQoXCLQodC60YDRi9GC0Ywg0LrQvtC80LzQtdC90YLQsNGA0LjQuFwiKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgJCh0aGlzKS50ZXh0KFwi0J/QvtC60LDQt9Cw0YLRjCDQutC+0LzQvNC10L3RgtCw0YDQuNC4XCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHRvcGljSWQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5wb3N0JykuYXR0cignZGF0YS10b3BpY2lkJyksXHJcbiAgICAgICAgICAgIGRpYWxvZ3MgPSAkKHRoaXMpLmNsb3Nlc3QoJy5wb3N0JykuZmluZCgnLmRpYWxvZ3MnKTtcclxuXHJcbiAgICAgICAgLy9pZighaXNDb21tZW50c0xvYWRlZFt0b3BpY0lkXSl7XHJcbiAgICAgICAgdmFyIGNvbW1lbnRzID0gbWVzc2FnZUNsaWVudC5nZXRNZXNzYWdlc0FzTGlzdCh0b3BpY0lkLCA3LCAwLGZhbHNlLDEwMDApLm1lc3NhZ2VzO1xyXG4gICAgICAgIC8vYWxlcnQoY29tbWVudHMubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgaWYoY29tbWVudHMpe1xyXG4gICAgICAgICAgICB2YXIgY29tbWVudHNMZW5ndGggPSBjb21tZW50cy5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBjb21tZW50c0hUTUwgPSBcIlwiO1xyXG5cclxuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGNvbW1lbnRzTGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgdmFyIGNsYXNzTm9MaW5rID0gXCJcIixcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlQXZhdGFyLFxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VOYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VVc2VySWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoIWNvbW1lbnRzW2ldLnVzZXJJbmZvKXtcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlQXZhdGFyID0gXCJkYXRhL2RhLmdpZlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VVc2VySWQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTm9MaW5rID0gXCJuby1saW5rXCI7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAvL21lc3NhZ2VOYW1lID0gY29tbWVudHNbaV0udXNlckluZm8uZmlyc3ROYW1lK1wiIFwiK2NvbW1lbnRzW2ldLnVzZXJJbmZvLmxhc3ROYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VBdmF0YXIgPSBjb21tZW50c1tpXS51c2VySW5mby5hdmF0YXI7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZVVzZXJJZCA9IGNvbW1lbnRzW2ldLnVzZXJJbmZvLmlkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VOYW1lID0gY29tbWVudHNbaV0uYW5vbk5hbWU7XHJcblxyXG4gICAgICAgICAgICAgICAgY29tbWVudHNIVE1MICs9ICc8ZGl2IGNsYXNzPVwiaXRlbWRpdiBkaWFsb2dkaXYgbmV3XCI+JytcclxuICAgICAgICAgICAgICAgICAgICAnPGEgaHJlZj1cInByb2ZpbGUtJyttZXNzYWdlVXNlcklkKydcIiBjbGFzcz1cInVzZXIgJytjbGFzc05vTGluaysnXCI+JytcclxuICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImF2YXRhciBzaG9ydDJcIiBzdHlsZT1cImJhY2tncm91bmQtaW1hZ2U6IHVybCgnK21lc3NhZ2VBdmF0YXIrJylcIj48L2Rpdj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICc8L2E+JytcclxuICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImJvZHlcIj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibmFtZVwiPicrXHJcbiAgICAgICAgICAgICAgICAgICAgJzxhIGhyZWY9XCJwcm9maWxlLScrbWVzc2FnZVVzZXJJZCsnXCIgY2xhc3M9XCInK2NsYXNzTm9MaW5rKydcIj4nK21lc3NhZ2VOYW1lKyc8L2E+JytcclxuICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JytcclxuICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cInRleHRcIj4nK2NvbW1lbnRzW2ldLmNvbnRlbnQrJzwvZGl2PicrXHJcbiAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJsZW50YS1pdGVtLWJvdHRvbVwiPicrXHJcbiAgICAgICAgICAgICAgICAgICAgJzxzcGFuPicrIGdldFRpbWluZyhjb21tZW50c1tpXS5jcmVhdGVkKSArJzwvc3Bhbj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICc8YSBocmVmPVwiI1wiPiDQntGC0LLQtdGC0LjRgtGMPC9hPicrXHJcbiAgICAgICAgICAgICAgICAgICAgJzwvZGl2PicrXHJcbiAgICAgICAgICAgICAgICAgICAgJzwvZGl2PicrXHJcbiAgICAgICAgICAgICAgICAgICAgJzwvZGl2Pic7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRpYWxvZ3MuaHRtbChcIlwiKTtcclxuICAgICAgICBkaWFsb2dzLnByZXBlbmQoY29tbWVudHNIVE1MKTtcclxuXHJcbiAgICAgICAgaW5pdE5vTGluaygkKHRoaXMpLmNsb3Nlc3QoJy5wb3N0JykpO1xyXG4gICAgICAgIGluaXRBbnN3ZXJUb0NvbW1lbnQoJCgnLm5ldyAubGVudGEtaXRlbS1ib3R0b20gYScpKTtcclxuICAgICAgICAkKCcubmV3JykucmVtb3ZlQ2xhc3MoJ25ldycpO1xyXG5cclxuICAgICAgICBpc0NvbW1lbnRzTG9hZGVkW3RvcGljSWRdID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgLy99XHJcblxyXG4gICAgICAgIGRpYWxvZ3Muc2xpZGVUb2dnbGUoMjAwKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGluaXRBbnN3ZXJUb0NvbW1lbnQoc2VsZWN0b3Ipe1xyXG4gICAgICAgIHNlbGVjdG9yLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgdXNlck5hbWUgPSAkKHRoaXMpLmNsb3Nlc3QoJy5ib2R5JykuZmluZCgnLm5hbWUgYScpLnRleHQoKStcIiwgXCI7XHJcbiAgICAgICAgICAgICQodGhpcykuY2xvc2VzdCgnLnBvc3QnKS5maW5kKCcubWFrZS1jb21tZW50JykudHJpZ2dlcignY2xpY2snLHVzZXJOYW1lKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGluaXRBbnN3ZXJUb0NvbW1lbnQoJCgnLmxlbnRhLWl0ZW0tYm90dG9tIGEnKSk7XHJcblxyXG4gICAgJCgnLm1ha2UtY29tbWVudCcpLmNsaWNrKGZ1bmN0aW9uKGUsdXNlck5hbWUpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgJCh0aGlzKS5jbG9zZXN0KCcucG9zdCcpLmZpbmQoJy5pbnB1dC1ncm91cCcpLnNsaWRlVG9nZ2xlKDIwMCxmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpZih1c2VyTmFtZSl7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmZpbmQoJ3RleHRhcmVhJykudmFsKHVzZXJOYW1lKTtcclxuICAgICAgICAgICAgICAgIHNldENhcmV0VG9Qb3MoJCh0aGlzKS5maW5kKCd0ZXh0YXJlYScpWzBdLHVzZXJOYW1lLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJCh0aGlzKS5maW5kKCd0ZXh0YXJlYScpLmZvY3VzKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBpbml0Tm9MaW5rKHNlbGVjdG9yKXtcclxuXHJcbiAgICAgICAgc2VsZWN0b3IuZmluZCgnLm5vLWxpbmsnKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcbiAgICBpbml0Tm9MaW5rKCQoJy5ibG9nJykpO1xyXG5cclxuICAgICQoJy5zZW5kLWluLWJsb2cnKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciBtZXNzYWdlID0gbmV3IGNvbS52bWVzdGVvbmxpbmUuYmUudGhyaWZ0Lm1lc3NhZ2VzZXJ2aWNlLk1lc3NhZ2UoKTtcclxuXHJcbiAgICAgICAgbWVzc2FnZS5pZCA9IDA7XHJcbiAgICAgICAgbWVzc2FnZS50b3BpY0lkID0gJCh0aGlzKS5jbG9zZXN0KCcucG9zdCcpLmF0dHIoJ2RhdGEtdG9waWNpZCcpO1xyXG4gICAgICAgIG1lc3NhZ2UudHlwZSA9IGNvbS52bWVzdGVvbmxpbmUuYmUudGhyaWZ0Lm1lc3NhZ2VzZXJ2aWNlLk1lc3NhZ2VUeXBlLkJMT0c7Ly83O1xyXG4gICAgICAgIG1lc3NhZ2UuZ3JvdXBJZCA9IDA7XHJcbiAgICAgICAgbWVzc2FnZS5jb250ZW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuaW5wdXQtZ3JvdXAnKS5maW5kKCcubWVzc2FnZS10ZXh0YXJlYScpLnZhbCgpO1xyXG4gICAgICAgIG1lc3NhZ2UucGFyZW50SWQgPSAwO1xyXG4gICAgICAgIG1lc3NhZ2UuY3JlYXRlZCA9IERhdGUucGFyc2UobmV3IERhdGUoKSkvMTAwMDtcclxuXHJcbiAgICAgICAgaWYoIWlzQXV0aCl7XHJcbiAgICAgICAgICAgIG1lc3NhZ2UuYW5vbk5hbWUgPSAkKHRoaXMpLmNsb3Nlc3QoJy5pbnB1dC1ncm91cCcpLmZpbmQoJy5hbm9uTmFtZScpLnZhbCgpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBtZXNzYWdlLmFub25OYW1lID0gXCJcIjtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB2YXIgcmV0dXJuQ29tbWVudCA9IG1lc3NhZ2VDbGllbnQucG9zdEJsb2dNZXNzYWdlKG1lc3NhZ2UpO1xyXG4gICAgICAgIHZhciBjb21tZW50cyA9ICQodGhpcykuY2xvc2VzdCgnLnBvc3QnKS5maW5kKCcuZGlhbG9ncycpO1xyXG5cclxuICAgICAgICB2YXIgY2xhc3NOb0xpbmsgPSBcIlwiO1xyXG5cclxuICAgICAgICBpZighaXNBdXRoKXtcclxuICAgICAgICAgICAgbWVzc2FnZS5hdmF0YXIgPSBcImRhdGEvZGEuZ2lmXCI7XHJcbiAgICAgICAgICAgIG1lc3NhZ2UubmFtZSA9IG1lc3NhZ2UuYW5vbk5hbWU7XHJcbiAgICAgICAgICAgIG1lc3NhZ2UudXNlcklkID0gMDtcclxuICAgICAgICAgICAgY2xhc3NOb0xpbmsgPSBcIm5vLWxpbmtcIjtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgbWVzc2FnZS5hdmF0YXIgPSByZXR1cm5Db21tZW50LnVzZXJJbmZvLmF2YXRhcjtcclxuICAgICAgICAgICAgbWVzc2FnZS5uYW1lID0gcmV0dXJuQ29tbWVudC51c2VySW5mby5maXJzdE5hbWUrXCIgXCIrcmV0dXJuQ29tbWVudC51c2VySW5mby5sYXN0TmFtZTtcclxuICAgICAgICAgICAgbWVzc2FnZS51c2VySWQgPSByZXR1cm5Db21tZW50LnVzZXJJbmZvLmlkIDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBuZXdDb21tZW50SFRNTCA9ICc8ZGl2IGNsYXNzPVwiaXRlbWRpdiBkaWFsb2dkaXYgbmV3XCI+JytcclxuICAgICAgICAgICAgJzxhIGhyZWY9XCJwcm9maWxlLScrIG1lc3NhZ2UudXNlcklkICsnXCIgY2xhc3M9XCJ1c2VyICcrIGNsYXNzTm9MaW5rICsnXCI+JytcclxuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJhdmF0YXIgc2hvcnQyXCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJysgbWVzc2FnZS5hdmF0YXIgKycpXCI+PC9kaXY+JytcclxuICAgICAgICAgICAgJzwvYT4nK1xyXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cImJvZHlcIj4nK1xyXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm5hbWVcIj4nK1xyXG4gICAgICAgICAgICAnPGEgaHJlZj1cInByb2ZpbGUtJysgbWVzc2FnZS51c2VySWQgKydcIiBjbGFzcz1cIicrIGNsYXNzTm9MaW5rICsnXCIgPicrIG1lc3NhZ2UubmFtZSArJzwvYT4nK1xyXG4gICAgICAgICAgICAnPC9kaXY+JytcclxuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJ0ZXh0XCI+JysgbWVzc2FnZS5jb250ZW50ICsnPC9kaXY+JytcclxuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJsZW50YS1pdGVtLWJvdHRvbVwiPicrXHJcbiAgICAgICAgICAgICc8c3Bhbj4nKyBnZXRUaW1pbmcobWVzc2FnZS5jcmVhdGVkKSArJzwvc3Bhbj4nK1xyXG4gICAgICAgICAgICAnPGEgaHJlZj1cIiNcIj7QntGC0LLQtdGC0LjRgtGMPC9hPicrXHJcbiAgICAgICAgICAgICc8L2Rpdj4nK1xyXG4gICAgICAgICAgICAnPC9kaXY+JytcclxuICAgICAgICAgICAgJzwvZGl2Pic7XHJcblxyXG4gICAgICAgIGlmKGNvbW1lbnRzLmNzcygnZGlzcGxheScpID09ICdub25lJyl7XHJcblxyXG4gICAgICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5wb3N0JykuZmluZCgnLnNob3ctY29tbWVudCcpLnRyaWdnZXIoJ2NsaWNrJyk7XHJcblxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBjb21tZW50cy5hcHBlbmQobmV3Q29tbWVudEhUTUwpO1xyXG5cclxuICAgICAgICAgICAgaW5pdE5vTGluaygkKCcubmV3JykpO1xyXG4gICAgICAgICAgICBpbml0QW5zd2VyVG9Db21tZW50KCQoJy5uZXcgLmxlbnRhLWl0ZW0tYm90dG9tIGEnKSk7XHJcbiAgICAgICAgICAgICQoJy5uZXcnKS5yZW1vdmVDbGFzcygnbmV3Jyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3NldFRpbWVvdXQodGVtcEZ1bmMsMTAwMCxjb21tZW50cyxuZXdDb21tZW50SFRNTCxtZXNzYWdlLCQodGhpcykpO1xyXG5cclxuICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5pbnB1dC1ncm91cCcpLmhpZGUoKTtcclxuICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5pbnB1dC1ncm91cCcpLmZpbmQoJ3RleHRhcmVhJykudmFsKFwiXCIpO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldFRpbWluZyhtZXNzYWdlT2JqRGF0ZSl7XHJcbiAgICAgICAgdmFyIG1pbnV0ZSA9IDYwKjEwMDAsXHJcbiAgICAgICAgICAgIGhvdXIgPSBtaW51dGUqNjAsXHJcbiAgICAgICAgICAgIGRheSA9IGhvdXIqMjQsXHJcbiAgICAgICAgICAgIHRocmVlRGF5cyA9IGRheSogMyxcclxuICAgICAgICAgICAgbm93ID0gRGF0ZS5wYXJzZShuZXcgRGF0ZSgpKSxcclxuICAgICAgICAgICAgdGltaW5nID0gKG5vdyAtIG1lc3NhZ2VPYmpEYXRlKjEwMDApLFxyXG4gICAgICAgICAgICB0aW1lVGVtcDtcclxuXHJcbiAgICAgICAgaWYodGltaW5nIDwgbWludXRlKXtcclxuICAgICAgICAgICAgdGltaW5nID0gXCLRgtC+0LvRjNC60L4g0YfRgtC+XCI7XHJcbiAgICAgICAgfWVsc2UgaWYodGltaW5nIDwgaG91cil7XHJcbiAgICAgICAgICAgIHRpbWluZyA9IG5ldyBEYXRlKHRpbWluZyk7XHJcbiAgICAgICAgICAgIHRpbWluZyA9IHRpbWluZy5nZXRNaW51dGVzKCkrXCIg0LzQuNC9INC90LDQt9Cw0LRcIjtcclxuICAgICAgICB9ZWxzZSBpZih0aW1pbmcgPCBkYXkpe1xyXG4gICAgICAgICAgICB0aW1pbmcgPSBuZXcgRGF0ZSh0aW1pbmcpO1xyXG4gICAgICAgICAgICB0aW1lVGVtcCA9IHRpbWluZy5nZXRIb3VycygpO1xyXG4gICAgICAgICAgICBpZih0aW1lVGVtcCA9PSAxIHx8IHRpbWVUZW1wID09IDApe1xyXG4gICAgICAgICAgICAgICAgdGltaW5nID0gXCIxINGH0LDRgSDQvdCw0LfQsNC0XCI7XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKHRpbWVUZW1wID4gMSAmJiB0aW1lVGVtcCA8IDUpe1xyXG4gICAgICAgICAgICAgICAgdGltaW5nID0gdGltZVRlbXAgKyBcIiDRh9Cw0YHQsCDQvdCw0LfQsNC0XCI7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGltaW5nID0gdGltZVRlbXAgKyBcIiDRh9Cw0YHQvtCyINC90LDQt9Cw0LRcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNlIGlmKHRpbWluZyA8IHRocmVlRGF5cyl7XHJcbiAgICAgICAgICAgIHRpbWluZyA9IG5ldyBEYXRlKHRpbWluZyk7XHJcbiAgICAgICAgICAgIHRpbWVUZW1wID0gdGltaW5nLmdldERhdGUoKTtcclxuICAgICAgICAgICAgaWYodGltZVRlbXAgPT0gMSl7XHJcbiAgICAgICAgICAgICAgICB0aW1pbmcgPSB0aW1lVGVtcCtcIiDQtNC10L3RjCDQvdCw0LfQsNC0XCI7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGltaW5nID0gdGltZVRlbXArXCIg0LTQvdC10Lkg0L3QsNC30LDQtFwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRpbWVUZW1wID0gbmV3IERhdGUobWVzc2FnZU9iakRhdGUqMTAwMCkudG9Mb2NhbGVEYXRlU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIHZhciBhcnIgPSB0aW1lVGVtcC5zcGxpdCgnLicpO1xyXG4gICAgICAgICAgICBpZihhcnJbMF0ubGVuZ3RoID09IDEpIGFyclswXSA9IFwiMFwiK2FyclswXTtcclxuICAgICAgICAgICAgaWYoYXJyWzFdLmxlbmd0aCA9PSAxKSBhcnJbMV0gPSBcIjBcIithcnJbMV07XHJcbiAgICAgICAgICAgIHRpbWluZyA9IGFyclswXStcIi5cIithcnJbMV0rXCIuXCIrYXJyWzJdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRpbWluZztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXRTZWxlY3Rpb25SYW5nZShpbnB1dCwgc2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvbkVuZCkge1xyXG4gICAgICAgIGlmIChpbnB1dC5zZXRTZWxlY3Rpb25SYW5nZSkge1xyXG4gICAgICAgICAgICBpbnB1dC5mb2N1cygpO1xyXG4gICAgICAgICAgICBpbnB1dC5zZXRTZWxlY3Rpb25SYW5nZShzZWxlY3Rpb25TdGFydCwgc2VsZWN0aW9uRW5kKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoaW5wdXQuY3JlYXRlVGV4dFJhbmdlKSB7XHJcbiAgICAgICAgICAgIHZhciByYW5nZSA9IGlucHV0LmNyZWF0ZVRleHRSYW5nZSgpO1xyXG4gICAgICAgICAgICByYW5nZS5jb2xsYXBzZSh0cnVlKTtcclxuICAgICAgICAgICAgcmFuZ2UubW92ZUVuZCgnY2hhcmFjdGVyJywgc2VsZWN0aW9uRW5kKTtcclxuICAgICAgICAgICAgcmFuZ2UubW92ZVN0YXJ0KCdjaGFyYWN0ZXInLCBzZWxlY3Rpb25TdGFydCk7XHJcbiAgICAgICAgICAgIHJhbmdlLnNlbGVjdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXRDYXJldFRvUG9zIChpbnB1dCwgcG9zKSB7XHJcbiAgICAgICAgc2V0U2VsZWN0aW9uUmFuZ2UoaW5wdXQsIHBvcywgcG9zKTtcclxuICAgIH1cclxuKi9cclxuXHJcbiAgICAkKCcubmctY2xvYWsnKS5yZW1vdmVDbGFzcygnbmctY2xvYWsnKTtcclxuXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFsgJyRyb290U2NvcGUnLCBibG9nQ3RybCBdOyIsIlxyXG52YXIgY2FiaW5ldEN0cmwgPSBmdW5jdGlvbigkcm9vdFNjb3BlKSB7XHJcbiAgICB2YXIgbmVhcmJ5ID0gdGhpcyxcclxuICAgICAgICBwb3N0SWQ7XHJcblxyXG4gICAgdmFyIGJ1c2luZXNzRGVzY3JpcHRpb24gPSBuZXcgY29tLnZtZXN0ZW9ubGluZS5iZS50aHJpZnQuYnVzaW5lc3NlcnZpY2UuQnVzaW5lc3NEZXNjcmlwdGlvbjtcclxuICAgIGJ1c2luZXNzRGVzY3JpcHRpb24uc2hvcnROYW1lID0gXCLQnNC10LPQsCDQn9C40YbRhtCwXCI7XHJcbiAgICBidXNpbmVzc0Rlc2NyaXB0aW9uLmZ1bGx0TmFtZSA9IFwi0JzQtdCz0LAg0J/QuNGG0YbQsCDQutGA0YPRgtC+LdC60YDRg9GC0L5cIjtcclxuICAgIGJ1c2luZXNzRGVzY3JpcHRpb24uc2hvcnRJbmZvID0gXCLQnNC10LPQsCDQn9C40YbRhtCwINC60YDRg9GC0L4t0LrRgNGD0YLQviDQsdGL0YHRgtGA0L4t0LHRi9GB0YLRgNC+XCI7XHJcbiAgICBidXNpbmVzc0Rlc2NyaXB0aW9uLmZ1bGxJbmZvID0gXCLQnNC10LPQsCDQn9C40YbRhtCwINC60YDRg9GC0L4t0LrRgNGD0YLQviDQsdGL0YHRgtGA0L4t0LHRi9GB0YLRgNC+INC00LXRiNC10LLQvlwiO1xyXG4gICAgYnVzaW5lc3NEZXNjcmlwdGlvbi5sb25naXR1ZGUgPSAnMzAnO1xyXG4gICAgYnVzaW5lc3NEZXNjcmlwdGlvbi5sYXRpdHVkZSA9ICc2MCc7XHJcbiAgICBidXNpbmVzc0Rlc2NyaXB0aW9uLnJhZGl1cyA9IDUwMDtcclxuICAgIC8vYnVzaW5lc3NDbGllbnQuY3JlYXRlQnVzaW5lc3NEZXNjcmlwdGlvbihidXNpbmVzc0Rlc2NyaXB0aW9uLCd3JywndycpO1xyXG5cclxuICAgIC8vY29uc29sZS5sb2coJ2J1c2luZXNzIGNyZWF0ZWQnKTtcclxuXHJcbiAgICBuZWFyYnkuaW5mbyA9IGJ1c2luZXNzQ2xpZW50LmdldE15QnVzaW5lc3NJbmZvKCk7XHJcblxyXG4gICAgLyppZiAoJHN0YXRlUGFyYW1zLm5lYXJieUlkICYmICRzdGF0ZVBhcmFtcy5uZWFyYnlJZCAhPSAwKXtcclxuICAgICAgICBwb3N0SWQgPSAkc3RhdGVQYXJhbXMubmVhcmJ5SWQ7XHJcbiAgICB9Ki9cclxuXHJcbiAgICBuZWFyYnkuY2Fyb3VzZWxJbnRlcnZhbCA9IDUwMDA7XHJcbiAgICAvKm5lYXJieS5hZGRTbGlkZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBuZXdXaWR0aCA9IDYwMCArIHNsaWRlcy5sZW5ndGggKyAxO1xyXG4gICAgICAgIHNsaWRlcy5wdXNoKHtcclxuICAgICAgICAgICAgaW1hZ2U6ICdodHRwOi8vcGxhY2VraXR0ZW4uY29tLycgKyBuZXdXaWR0aCArICcvMzAwJyxcclxuICAgICAgICAgICAgdGV4dDogWydNb3JlJywnRXh0cmEnLCdMb3RzIG9mJywnU3VycGx1cyddW3NsaWRlcy5sZW5ndGggJSA0XSArICcgJyArXHJcbiAgICAgICAgICAgICAgICBbJ0NhdHMnLCAnS2l0dHlzJywgJ0ZlbGluZXMnLCAnQ3V0ZXMnXVtzbGlkZXMubGVuZ3RoICUgNF1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBmb3IgKHZhciBpPTA7IGk8NDsgaSsrKSB7XHJcbiAgICAgICAgbmVhcmJ5LmFkZFNsaWRlKCk7XHJcbiAgICB9Ki9cclxuXHJcbiAgICAkcm9vdFNjb3BlLmJhc2UuaXNGb290ZXJCb3R0b20gPSB0cnVlO1xyXG5cclxuICAgIG5lYXJieS50b2dnbGVJbnB1dCA9IGZ1bmN0aW9uKCRldmVudCxwb3N0KXtcclxuICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgcG9zdC5pc0lucHV0U2hvdyA/IHBvc3QuaXNJbnB1dFNob3cgPSBmYWxzZSA6IHBvc3QuaXNJbnB1dFNob3cgPSB0cnVlO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZygnaW5wdXQnLHBvc3QuaXNJbnB1dFNob3cpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgbmVhcmJ5LndhbGxJdGVtID0gYnVzaW5lc3NDbGllbnQuZ2V0V2FsbEl0ZW0obmVhcmJ5LmluZm8uaWQpO1xyXG4gICAgY29uc29sZS5sb2coJzEnLG5lYXJieS53YWxsSXRlbSk7XHJcblxyXG4gICAgbmVhcmJ5LnNlbmRDb21tID0gZnVuY3Rpb24oJGV2ZW50LHBvc3Qpe1xyXG4gICAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHZhciBtZXNzYWdlID0gbmV3IGNvbS52bWVzdGVvbmxpbmUuYmUudGhyaWZ0Lm1lc3NhZ2VzZXJ2aWNlLk1lc3NhZ2UoKTtcclxuXHJcbiAgICAgICAgbWVzc2FnZS5pZCA9IDA7XHJcbiAgICAgICAgbWVzc2FnZS50b3BpY0lkID0gbmVhcmJ5LmluZm8uaWQ7IC8vcG9zdC5pZDtcclxuICAgICAgICBtZXNzYWdlLnR5cGUgPSBjb20udm1lc3Rlb25saW5lLmJlLnRocmlmdC5tZXNzYWdlc2VydmljZS5NZXNzYWdlVHlwZS5XQUxMOy8vODtcclxuICAgICAgICBtZXNzYWdlLmdyb3VwSWQgPSAwO1xyXG4gICAgICAgIG1lc3NhZ2UuY29udGVudCA9IHBvc3QuY29tbWVudGluZztcclxuICAgICAgICBtZXNzYWdlLnRvcGljSWQgPSBuZWFyYnkud2FsbEl0ZW0udG9waWMuaWQ7XHJcbiAgICAgICAgbWVzc2FnZS5wYXJlbnRJZCA9IDA7XHJcbiAgICAgICAgbWVzc2FnZS5jcmVhdGVkID0gRGF0ZS5wYXJzZShuZXcgRGF0ZSgpKS8xMDAwO1xyXG4gICAgICAgIHBvc3QuY29tbWVudGluZyA9IFwiXCI7XHJcblxyXG4gICAgICAgIGlmKCFuZWFyYnkuaXNBdXRoKXtcclxuICAgICAgICAgICAgbWVzc2FnZS5hbm9uTmFtZSA9IHBvc3QuYW5vbk5hbWU7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIG1lc3NhZ2UuYW5vbk5hbWUgPSBcIlwiO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdwb3N0JyxtZXNzYWdlKTtcclxuICAgICAgICAvL3ZhciByZXR1cm5Db21tZW50ID0gbWVzc2FnZUNsaWVudC5wb3N0QnVzaW5lc3NUb3BpY3MobWVzc2FnZSk7XHJcbiAgICAgICAgdmFyIHJldHVybkNvbW1lbnQgPSBtZXNzYWdlQ2xpZW50LnBvc3RNZXNzYWdlKG1lc3NhZ2UpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdwb3N0MicscmV0dXJuQ29tbWVudCk7XHJcblxyXG5cclxuICAgICAgICBpZihuZWFyYnkud2FsbEl0ZW0ubWVzc2FnZXMgJiYgbmVhcmJ5LndhbGxJdGVtLm1lc3NhZ2VzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBuZWFyYnkud2FsbEl0ZW0ubWVzc2FnZXMucHVzaChyZXR1cm5Db21tZW50KTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgbmVhcmJ5LndhbGxJdGVtLm1lc3NhZ2VzID0gW107XHJcbiAgICAgICAgICAgIG5lYXJieS53YWxsSXRlbS5tZXNzYWdlc1swXSA9IHJldHVybkNvbW1lbnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgbmVhcmJ5LmdldFRpbWluZyA9IGZ1bmN0aW9uKG1lc3NhZ2VPYmpEYXRlKXtcclxuICAgICAgICB2YXIgbWludXRlID0gNjAqMTAwMCxcclxuICAgICAgICAgICAgaG91ciA9IG1pbnV0ZSo2MCxcclxuICAgICAgICAgICAgZGF5ID0gaG91cioyNCxcclxuICAgICAgICAgICAgdGhyZWVEYXlzID0gZGF5KiAzLFxyXG4gICAgICAgICAgICBub3cgPSBEYXRlLnBhcnNlKG5ldyBEYXRlKCkpLFxyXG4gICAgICAgICAgICB0aW1pbmcgPSAobm93IC0gbWVzc2FnZU9iakRhdGUqMTAwMCksXHJcbiAgICAgICAgICAgIHRpbWVUZW1wO1xyXG5cclxuICAgICAgICBpZih0aW1pbmcgPCBtaW51dGUpe1xyXG4gICAgICAgICAgICB0aW1pbmcgPSBcItGC0L7Qu9GM0LrQviDRh9GC0L5cIjtcclxuICAgICAgICB9ZWxzZSBpZih0aW1pbmcgPCBob3VyKXtcclxuICAgICAgICAgICAgdGltaW5nID0gbmV3IERhdGUodGltaW5nKTtcclxuICAgICAgICAgICAgdGltaW5nID0gdGltaW5nLmdldE1pbnV0ZXMoKStcIiDQvNC40L0g0L3QsNC30LDQtFwiO1xyXG4gICAgICAgIH1lbHNlIGlmKHRpbWluZyA8IGRheSl7XHJcbiAgICAgICAgICAgIHRpbWluZyA9IG5ldyBEYXRlKHRpbWluZyk7XHJcbiAgICAgICAgICAgIHRpbWVUZW1wID0gdGltaW5nLmdldEhvdXJzKCk7XHJcbiAgICAgICAgICAgIGlmKHRpbWVUZW1wID09IDEgfHwgdGltZVRlbXAgPT0gMCl7XHJcbiAgICAgICAgICAgICAgICB0aW1pbmcgPSBcIjEg0YfQsNGBINC90LDQt9Cw0LRcIjtcclxuICAgICAgICAgICAgfWVsc2UgaWYodGltZVRlbXAgPiAxICYmIHRpbWVUZW1wIDwgNSl7XHJcbiAgICAgICAgICAgICAgICB0aW1pbmcgPSB0aW1lVGVtcCArIFwiINGH0LDRgdCwINC90LDQt9Cw0LRcIjtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aW1pbmcgPSB0aW1lVGVtcCArIFwiINGH0LDRgdC+0LIg0L3QsNC30LDQtFwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2UgaWYodGltaW5nIDwgdGhyZWVEYXlzKXtcclxuICAgICAgICAgICAgdGltaW5nID0gbmV3IERhdGUodGltaW5nKTtcclxuICAgICAgICAgICAgdGltZVRlbXAgPSB0aW1pbmcuZ2V0RGF0ZSgpO1xyXG4gICAgICAgICAgICBpZih0aW1lVGVtcCA9PSAxKXtcclxuICAgICAgICAgICAgICAgIHRpbWluZyA9IHRpbWVUZW1wK1wiINC00LXQvdGMINC90LDQt9Cw0LRcIjtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aW1pbmcgPSB0aW1lVGVtcCtcIiDQtNC90LXQuSDQvdCw0LfQsNC0XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGltZVRlbXAgPSBuZXcgRGF0ZShtZXNzYWdlT2JqRGF0ZSoxMDAwKS50b0xvY2FsZURhdGVTdHJpbmcoKTtcclxuICAgICAgICAgICAgdmFyIGFyciA9IHRpbWVUZW1wLnNwbGl0KCcuJyk7XHJcbiAgICAgICAgICAgIGlmKGFyclswXS5sZW5ndGggPT0gMSkgYXJyWzBdID0gXCIwXCIrYXJyWzBdO1xyXG4gICAgICAgICAgICBpZihhcnJbMV0ubGVuZ3RoID09IDEpIGFyclsxXSA9IFwiMFwiK2FyclsxXTtcclxuICAgICAgICAgICAgdGltaW5nID0gYXJyWzBdK1wiLlwiK2FyclsxXStcIi5cIithcnJbMl07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGltaW5nO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgJCgnLm5nLWNsb2FrJykucmVtb3ZlQ2xhc3MoJ25nLWNsb2FrJyk7XHJcblxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBbICckcm9vdFNjb3BlJywgY2FiaW5ldEN0cmwgXTsiLCJcclxudmFyIGVkaXRDdHJsID0gZnVuY3Rpb24oJHJvb3RTY29wZSwkc2NvcGUsIEZpbGVVcGxvYWRlcikge1xyXG5cclxuICAgIHZhciBlZGl0ID0gdGhpcztcclxuXHJcbiAgICB2YXIgYXR0YWNoID0gbmV3IGNvbS52bWVzdGVvbmxpbmUuYmUudGhyaWZ0Lm1lc3NhZ2VzZXJ2aWNlLkF0dGFjaCgpLFxyXG4gICAgICAgIGlzTG9nb1VwbG9hZGVyLCBpc0ltYWdlc1VwbG9hZGVyLCBpbWFnZXNDb3VudGVyID0gMCxpbWFnZXNMZW5ndGg7XHJcblxyXG4gICAgJHNjb3BlLnNldExvYWRJbWFnZSA9IGZ1bmN0aW9uKGZpbGVCYXNlNjQpe1xyXG5cclxuICAgICAgICB2YXIgc3ZjID0gZmlsZUNsaWVudC5zYXZlRmlsZUNvbnRlbnQoZmlsZUJhc2U2NCwgdHJ1ZSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3NldExvYWRJbWFnZScsZmlsZUJhc2U2NCk7XHJcbiAgICAgICAgaWYoaXNMb2dvVXBsb2FkZXIpe1xyXG4gICAgICAgICAgICBlZGl0LmJ1c2luZXNzRGVzY3JpcHRpb24ubG9nby5VUkwgPSBhdHRhY2guVVJMID0gZWRpdC5sb2dvVVJMID0gc3ZjO1xyXG4gICAgICAgICAgICBpc0xvZ29VcGxvYWRlciA9IGZhbHNlO1xyXG4gICAgICAgIH1lbHNlIGlmKGlzSW1hZ2VzVXBsb2FkZXIpe1xyXG4gICAgICAgICAgICBlZGl0LmJ1c2luZXNzRGVzY3JpcHRpb24uaW1hZ2VzW2ltYWdlc0NvdW50ZXJdLlVSTCA9IHN2YztcclxuICAgICAgICAgICAgaW1hZ2VzQ291bnRlcisrO1xyXG4gICAgICAgICAgICBpZihpbWFnZXNDb3VudGVyID09IGltYWdlc0xlbmd0aCkgaXNJbWFnZXNVcGxvYWRlciA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2ltYWdlcycsaW1hZ2VzQ291bnRlcixlZGl0LmJ1c2luZXNzRGVzY3JpcHRpb24uaW1hZ2VzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvL3ZhciB1cGxvYWRlciA9ICRzY29wZS51cGxvYWRlckxvZ28gPSBuZXcgRmlsZVVwbG9hZGVyKCk7XHJcbiAgICAkc2NvcGUudXBsb2FkZXJMb2dvID0gbmV3IEZpbGVVcGxvYWRlcigpO1xyXG4gICAgJHNjb3BlLnVwbG9hZGVySW1hZ2VzID0gbmV3IEZpbGVVcGxvYWRlcigpO1xyXG5cclxuICAgIC8vIEZJTFRFUlNcclxuXHJcbiAgICAkc2NvcGUudXBsb2FkZXJMb2dvLmZpbHRlcnMucHVzaCh7XHJcbiAgICAgICAgbmFtZTogJ2ltYWdlRmlsdGVyJyxcclxuICAgICAgICBmbjogZnVuY3Rpb24oaXRlbSAvKntGaWxlfEZpbGVMaWtlT2JqZWN0fSovLCBvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIHZhciB0eXBlID0gJ3wnICsgaXRlbS50eXBlLnNsaWNlKGl0ZW0udHlwZS5sYXN0SW5kZXhPZignLycpICsgMSkgKyAnfCc7XHJcbiAgICAgICAgICAgIHJldHVybiAnfGpwZ3xwbmd8anBlZ3xibXB8Z2lmfCcuaW5kZXhPZih0eXBlKSAhPT0gLTE7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLyp1cGxvYWRlckxvZ28ub25XaGVuQWRkaW5nRmlsZUZhaWxlZCA9IGZ1bmN0aW9uKGl0ZW0gKi8vKntGaWxlfEZpbGVMaWtlT2JqZWN0fSovLyosIGZpbHRlciwgb3B0aW9ucykge1xyXG4gICAgICAgIGNvbnNvbGUuaW5mbygnb25XaGVuQWRkaW5nRmlsZUZhaWxlZCcsIGl0ZW0sIGZpbHRlciwgb3B0aW9ucyk7XHJcbiAgICB9OyovXHJcbiAgICAkc2NvcGUudXBsb2FkZXJMb2dvLm9uQWZ0ZXJBZGRpbmdGaWxlID0gZnVuY3Rpb24oZmlsZUl0ZW0pIHtcclxuICAgICAgICBjb25zb2xlLmluZm8oJ29uQWZ0ZXJBZGRpbmdGaWxlIDEnLCBmaWxlSXRlbSk7XHJcbiAgICAgICAgaXNMb2dvVXBsb2FkZXIgPSB0cnVlO1xyXG5cclxuICAgICAgICBhdHRhY2guZmlsZU5hbWUgPSBmaWxlSXRlbS5fZmlsZS5uYW1lO1xyXG4gICAgICAgIGF0dGFjaC5jb250ZW50VHlwZSA9IGZpbGVJdGVtLl9maWxlLnR5cGU7XHJcbiAgICB9O1xyXG4gICAgJHNjb3BlLnVwbG9hZGVySW1hZ2VzLm9uQWZ0ZXJBZGRpbmdGaWxlID0gZnVuY3Rpb24oZmlsZUl0ZW0pIHtcclxuICAgICAgICBjb25zb2xlLmluZm8oJ29uQWZ0ZXJBZGRpbmdGaWxlIDInLCBmaWxlSXRlbSk7XHJcbiAgICB9O1xyXG4gICAgJHNjb3BlLnVwbG9hZGVySW1hZ2VzLm9uQWZ0ZXJBZGRpbmdBbGwgPSBmdW5jdGlvbihhZGRlZEZpbGVJdGVtcykge1xyXG4gICAgICAgIGNvbnNvbGUuaW5mbygnb25BZnRlckFkZGluZ0FsbCcsIGFkZGVkRmlsZUl0ZW1zKTtcclxuXHJcbiAgICAgICAgaXNJbWFnZXNVcGxvYWRlciA9IHRydWU7XHJcbiAgICAgICAgLy9pbWFnZXNDb3VudGVyID0gMDtcclxuXHJcbiAgICAgICAgaW1hZ2VzTGVuZ3RoID0gYWRkZWRGaWxlSXRlbXMubGVuZ3RoO1xyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBpbWFnZXNMZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGVkaXQuYnVzaW5lc3NEZXNjcmlwdGlvbi5pbWFnZXNbaV0gPSBuZXcgY29tLnZtZXN0ZW9ubGluZS5iZS50aHJpZnQubWVzc2FnZXNlcnZpY2UuQXR0YWNoKCk7XHJcbiAgICAgICAgICAgIGVkaXQuYnVzaW5lc3NEZXNjcmlwdGlvbi5pbWFnZXNbaV0uZmlsZU5hbWUgPSBhZGRlZEZpbGVJdGVtc1tpXS5fZmlsZS5uYW1lO1xyXG4gICAgICAgICAgICBlZGl0LmJ1c2luZXNzRGVzY3JpcHRpb24uaW1hZ2VzW2ldLmNvbnRlbnRUeXBlID0gYWRkZWRGaWxlSXRlbXNbaV0uX2ZpbGUudHlwZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuICAgIC8qJHNjb3BlLnVwbG9hZGVyTG9nby5vbkJlZm9yZVVwbG9hZEl0ZW0gPSBmdW5jdGlvbihpdGVtKSB7XHJcbiAgICAgICAgY29uc29sZS5pbmZvKCdvbkJlZm9yZVVwbG9hZEl0ZW0nLCBpdGVtKTtcclxuICAgIH07XHJcbiAgICAkc2NvcGUudXBsb2FkZXJMb2dvLm9uUHJvZ3Jlc3NJdGVtID0gZnVuY3Rpb24oZmlsZUl0ZW0sIHByb2dyZXNzKSB7XHJcbiAgICAgICAgY29uc29sZS5pbmZvKCdvblByb2dyZXNzSXRlbScsIGZpbGVJdGVtLCBwcm9ncmVzcyk7XHJcbiAgICB9O1xyXG4gICAgJHNjb3BlLnVwbG9hZGVyTG9nby5vblByb2dyZXNzQWxsID0gZnVuY3Rpb24ocHJvZ3Jlc3MpIHtcclxuICAgICAgICBjb25zb2xlLmluZm8oJ29uUHJvZ3Jlc3NBbGwnLCBwcm9ncmVzcyk7XHJcbiAgICB9O1xyXG4gICAgJHNjb3BlLnVwbG9hZGVyTG9nby5vblN1Y2Nlc3NJdGVtID0gZnVuY3Rpb24oZmlsZUl0ZW0sIHJlc3BvbnNlLCBzdGF0dXMsIGhlYWRlcnMpIHtcclxuICAgICAgICBjb25zb2xlLmluZm8oJ29uU3VjY2Vzc0l0ZW0nLCBmaWxlSXRlbSwgcmVzcG9uc2UsIHN0YXR1cywgaGVhZGVycyk7XHJcbiAgICB9O1xyXG4gICAgJHNjb3BlLnVwbG9hZGVyTG9nby5vbkVycm9ySXRlbSA9IGZ1bmN0aW9uKGZpbGVJdGVtLCByZXNwb25zZSwgc3RhdHVzLCBoZWFkZXJzKSB7XHJcbiAgICAgICAgY29uc29sZS5pbmZvKCdvbkVycm9ySXRlbScsIGZpbGVJdGVtLCByZXNwb25zZSwgc3RhdHVzLCBoZWFkZXJzKTtcclxuICAgIH07XHJcbiAgICAkc2NvcGUudXBsb2FkZXJMb2dvLm9uQ2FuY2VsSXRlbSA9IGZ1bmN0aW9uKGZpbGVJdGVtLCByZXNwb25zZSwgc3RhdHVzLCBoZWFkZXJzKSB7XHJcbiAgICAgICAgY29uc29sZS5pbmZvKCdvbkNhbmNlbEl0ZW0nLCBmaWxlSXRlbSwgcmVzcG9uc2UsIHN0YXR1cywgaGVhZGVycyk7XHJcbiAgICB9O1xyXG4gICAgJHNjb3BlLnVwbG9hZGVyTG9nby5vbkNvbXBsZXRlSXRlbSA9IGZ1bmN0aW9uKGZpbGVJdGVtLCByZXNwb25zZSwgc3RhdHVzLCBoZWFkZXJzKSB7XHJcbiAgICAgICAgY29uc29sZS5pbmZvKCdvbkNvbXBsZXRlSXRlbScsIGZpbGVJdGVtLCByZXNwb25zZSwgc3RhdHVzLCBoZWFkZXJzKTtcclxuICAgIH07XHJcbiAgICAkc2NvcGUudXBsb2FkZXJMb2dvLm9uQ29tcGxldGVBbGwgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBjb25zb2xlLmluZm8oJ29uQ29tcGxldGVBbGwnKTtcclxuICAgIH07Ki9cclxuXHJcblxyXG4gICAgJHJvb3RTY29wZS5idXNpbmVzc0Rlc2NyaXB0aW9uID0gZWRpdC5idXNpbmVzc0Rlc2NyaXB0aW9uID0gYnVzaW5lc3NDbGllbnQuZ2V0TXlCdXNpbmVzc0luZm8oKTtcclxuXHJcbiAgICAvL2VkaXQuYnVzaW5lc3NEZXNjcmlwdGlvbiA9IG5ldyBjb20udm1lc3Rlb25saW5lLmJlLnRocmlmdC5idXNpbmVzc2VydmljZS5CdXNpbmVzc0Rlc2NyaXB0aW9uO1xyXG5cclxuICAgIGVkaXQuc2F2ZSA9IGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgIC8vZWRpdC5idXNpbmVzc0Rlc2NyaXB0aW9uLmxvZ28uVVJMID0gZmlsZUNsaWVudC5zYXZlRmlsZUNvbnRlbnQoYmcsIHRydWUpO1xyXG4gICAgICAgIC8vIGJnIC0gYmluYXJ5IGRhdGEgYmFzZTY0XHJcblxyXG5cclxuICAgICAgICBlZGl0LmJ1c2luZXNzRGVzY3JpcHRpb24ubG9nbyA9IGF0dGFjaDtcclxuICAgICAgICBjb25zb2xlLmxvZygnc2F2ZScsZWRpdC5idXNpbmVzc0Rlc2NyaXB0aW9uKTtcclxuICAgICAgICAvL2VkaXQuYnVzaW5lc3NEZXNjcmlwdGlvbi5sb2dvLmZpbGVOYW1lID0gJzEnO1xyXG4gICAgICAgIC8vZWRpdC5idXNpbmVzc0Rlc2NyaXB0aW9uLmxvZ28uVVJMID0gJy9zdGF0aWMvaW1hZ2VzL2FubmEuanBnJztcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgYnVzaW5lc3NDbGllbnQudXBkYXRlQnVzaW5lc3NEZXNjcmlwdGlvbihlZGl0LmJ1c2luZXNzRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICBlZGl0LnN0YXR1c1RleHQgPSBcItCh0L7RhdGA0LDQvdC10L3QvlwiO1xyXG4gICAgICAgICAgICBlZGl0LnN0YXR1cyA9IDE7XHJcbiAgICAgICAgfWNhdGNoKGUpe1xyXG4gICAgICAgICAgICBlZGl0LnN0YXR1c1RleHQgPSBcItCf0YDQuCDRgdC+0YXRgNCw0L3QtdC90LjQuCDQv9GA0L7QuNC30L7RiNC70LAg0L7RiNC40LHQutCwXCI7XHJcbiAgICAgICAgICAgIGVkaXQuc3RhdHVzID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdhZnRlciBzYXZlJyxlZGl0LmJ1c2luZXNzRGVzY3JpcHRpb24pO1xyXG5cclxuICAgIH1cclxuXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFsgJyRyb290U2NvcGUnLCckc2NvcGUnLCdGaWxlVXBsb2FkZXInLCBlZGl0Q3RybCBdOyIsIlxyXG52YXIgc3RhdGlzdGljQ3RybCA9IGZ1bmN0aW9uKCRyb290U2NvcGUpIHtcclxuXHJcbiAgICB2YXIgbWFwcyA9IHRoaXMsXHJcbiAgICAgICAgYnVzaW5lc3NEZXNjcmlwdGlvbjtcclxuXHJcbiAgICAoJHJvb3RTY29wZS5idXNpbmVzc0Rlc2NyaXB0aW9uKSA/XHJcbiAgICBidXNpbmVzc0Rlc2NyaXB0aW9uID0gJHJvb3RTY29wZS5idXNpbmVzc0Rlc2NyaXB0aW9uIDpcclxuICAgIGJ1c2luZXNzRGVzY3JpcHRpb24gPSBidXNpbmVzc0NsaWVudC5nZXRNeUJ1c2luZXNzSW5mbygpIDtcclxuXHJcbiAgICB2YXIgeWFNYXA7XHJcbiAgICBtYXBzLmFmdGVyTWFwSW5pdD1mdW5jdGlvbihuTWFwKXtcclxuICAgICAgICB5YU1hcCA9IG5NYXA7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vdmFyIGxvY2F0aW9uID0gdXNlckNsaWVudC5nZXRHcm91cFZpZXcoZ3JvdXBJZCk7XHJcbiAgICBtYXBzLmNlbnRlciA9IFtidXNpbmVzc0Rlc2NyaXB0aW9uLmxvbmdpdHVkZSxidXNpbmVzc0Rlc2NyaXB0aW9uLmxhdGl0dWRlXTtcclxuICAgIG1hcHMuem9vbSA9IDE2O1xyXG4gICAgbWFwcy5yYWRpdXMgPSBidXNpbmVzc0Rlc2NyaXB0aW9uLnJhZGl1cztcclxuICAgIG1hcHMuY29sb3IgPSBNQVBfQ09MT1I7XHJcblxyXG4gICAgbWFwcy5iYWxvb24gPSB7XHJcbiAgICAgICAgZ2VvbWV0cnk6IHtcclxuICAgICAgICAgICAgdHlwZTogJ1BvaW50JyxcclxuICAgICAgICAgICAgY29vcmRpbmF0ZXM6IG1hcHMuY2VudGVyXHJcbiAgICAgICAgfSxcclxuICAgICAgICAvLyDQodCy0L7QudGB0YLQstCwXHJcbiAgICAgICAgcHJvcGVydGllczoge1xyXG4gICAgICAgICAgICBoaW50Q29udGVudDogXCLQryDQt9C00LXRgdGMXCJcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gWyAnJHJvb3RTY29wZScsIHN0YXRpc3RpY0N0cmwgXTsiLCJcclxudmFyIGNoYW5nZUF2YXRhckN0cmwgPSBmdW5jdGlvbigkc3RhdGUsJHJvb3RTY29wZSl7XHJcblxyXG4gICAgICAgIHZhciBjaGFuZ2VBdmF0YXIgPSB0aGlzLCBuZXdTcmMsXHJcbiAgICAgICAgICAgIHgxID0gNTAsIHkxID0gNTAsIHgyID0gMjAwLCB5MiA9IDIwMCxcclxuICAgICAgICAgICAgaW1hZ2VXaWR0aCA9IDE1MCwgaW1hZ2VIZWlnaHQgPSAxNTA7XHJcblxyXG4gICAgICAgIGNoYW5nZUF2YXRhci5zYXZlID0gZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgICAgIHZhciBzYXZlU3JjID0gbmV3U3JjK1wiP3c9XCIrIGltYWdlV2lkdGggK1wiJmg9XCIrIGltYWdlSGVpZ2h0ICtcIiZzPVwiK3gxK1wiLFwiK3kxK1wiLFwiK3gyK1wiLFwiK3kyO1xyXG4gICAgICAgICAgICB1c2VyQ2xpZW50LnVwZGF0ZVVzZXJBdmF0YXIoc2F2ZVNyYyk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuYmFzZS51c2VyLmF2YXRhciA9ICRyb290U2NvcGUuYmFzZS5hdmF0YXJCdWZmZXIgPSBzYXZlU3JjO1xyXG5cclxuICAgICAgICAgICAgJChcIiNkaWFsb2ctbWVzc2FnZVwiKS5kaWFsb2coJ2Nsb3NlJyk7XHJcbiAgICAgICAgICAgICRzdGF0ZS5nbygncHJvZmlsZScpO1xyXG5cclxuICAgICAgICAgICAgJCgnLnByZXZpZXctY29udGFpbmVyJykuYWRkQ2xhc3MoJ2hpZGRlbicpO1xyXG5cclxuICAgICAgICAgICAgJCgnLnVpLWRpYWxvZycpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGlmKCQodGhpcykuYXR0cignYXJpYS1kZXNjcmliZWRieScpID09ICdkaWFsb2ctbWVzc2FnZScpe1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuZGV0YWNoKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNoYW5nZUF2YXRhci5iYWNrID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgJCgnLmxvYWQtYXZhdGFyJykuZmluZCgnLmZpbGUtbGFiZWwnKS5odG1sKFwiXCIpLlxyXG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3MoXCJoaWRlLXBsYWNlaG9sZGVyIHNlbGVjdGVkXCIpLlxyXG4gICAgICAgICAgICAgICAgYXR0cihcImRhdGEtdGl0bGVcIixcItCX0LDQs9GA0YPQt9C40YLRjCDQsNCy0LDRgtCw0YBcIik7XHJcblxyXG4gICAgICAgICAgICAkKCcubG9hZEF2YXRhci1hcmVhJykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICAkKCcuY3JvcC1hcmVhJykuYWRkQ2xhc3MoJ2hpZGRlbicpO1xyXG5cclxuICAgICAgICAgICAgJCgnLnByZXZpZXctY29udGFpbmVyJykuYWRkQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICAkKCcubG9hZGluZycpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcclxuXHJcbiAgICAgICAgICAgICQoJyNpbWFnZS1mb3ItY3JvcCcpLmRldGFjaCgpO1xyXG4gICAgICAgICAgICAkKCcuamNyb3AtaG9sZGVyJykuZGV0YWNoKCk7XHJcblxyXG4gICAgICAgICAgICAkKCcuYnRuLXNhdmUtYXZhdGFyJykuYmVmb3JlKCc8aW1nIHNyYz1cIiNcIiBpZD1cImltYWdlLWZvci1jcm9wXCIgYWx0PVwiI1wiIGNsYXNzPVwiaGlkZGVuXCIgLz4nKTtcclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaW5pdE1vZGFsQW5kQ3JvcCgpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBpbml0TW9kYWxBbmRDcm9wKCkge1xyXG5cclxuICAgICAgICAgICAgJChcIiNkaWFsb2ctbWVzc2FnZVwiKS5yZW1vdmVDbGFzcygnaGlkZScpLmRpYWxvZyh7XHJcbiAgICAgICAgICAgICAgICBtb2RhbDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA1MDQsXHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogWydjZW50ZXInLCAxMDBdLFxyXG4gICAgICAgICAgICAgICAgdGl0bGVfaHRtbDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBjbG9zZVRleHQ6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBjcmVhdGU6IGZ1bmN0aW9uIChldmVudCwgdWkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmxvYWQtYXZhdGFyIGlucHV0JykuYWNlX2ZpbGVfaW5wdXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogJ3dlbGwnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBidG5fY2hvb3NlOiAn0JfQsNCz0YDRg9C30LjRgtGMINCw0LLQsNGC0LDRgCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ0bl9jaGFuZ2U6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vX2ljb246ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wcGFibGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRodW1ibmFpbDogJ2xhcmdlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbl9yZW1vdmU6IG51bGxcclxuICAgICAgICAgICAgICAgICAgICB9KS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW1hZ2VGb3JDcm9wID0gJCgnI2ltYWdlLWZvci1jcm9wJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcubG9hZEF2YXRhci1hcmVhLC5sb2FkLWF2YXRhci1lcnJvcicpLmFkZENsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmNyb3AtYXJlYScpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoc2F2ZU5ld0F2YSwgMTAwMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBzYXZlTmV3QXZhKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGF2YUltZyA9ICQoJy5sb2FkLWF2YXRhcicpLmZpbmQoJy5maWxlLWxhYmVsIGltZycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocGFyc2VJbnQoYXZhSW1nLmNzcygnd2lkdGgnKSkgPCAyMDAgfHwgcGFyc2VJbnQoYXZhSW1nLmNzcygnaGVpZ2h0JykpIDwgMjAwKXtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmxvYWRpbmcsLmJ0bi1zYXZlLWF2YXRhcicpLmFkZENsYXNzKCdoaWRkZW4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmxvYWQtYXZhdGFyLWVycm9yJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQoJ9CY0LfQvtCx0YDQsNC20LXQvdC40LUg0LTQvtC70LbQvdC+INCx0YvRgtGMINC90LUg0LzQtdC90LXQtSAyMDBweCDQsiDRiNC40YDQuNC90YMg0Lgg0LLRi9GB0L7RgtGDLiDQn9C+0L/RgNC+0LHRg9C50YLQtSDQt9Cw0LPRgNGD0LfQuNGC0Ywg0LTRgNGD0LPQvtC1INC40LfQvtCx0YDQsNC20LXQvdC40LUuJykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcubG9hZGluZycpLmFkZENsYXNzKCdoaWRkZW4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGJnID0gYXZhSW1nLmNzcygnYmFja2dyb3VuZC1pbWFnZScpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmMgPSBhdmFJbWcuYXR0cignc3JjJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1NyYyA9IGZpbGVDbGllbnQuc2F2ZUZpbGVDb250ZW50KGJnLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnI3ByZXZpZXcnKS5hdHRyKCdzcmMnLCBuZXdTcmMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWFnZUZvckNyb3AuYXR0cignc3JjJywgbmV3U3JjKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWFnZUZvckNyb3AuY3NzKHsnbWF4LXdpZHRoJzogJzUwMHB4JywgJ21heC1oZWlnaHQnOiAnNTAwcHgnfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlRm9yQ3JvcC5KY3JvcCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzcGVjdFJhdGlvOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTZWxlY3Q6IFsgMjAwLCAyMDAsIDUwLCA1MCBdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdXBkYXRlQ29vcmRzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblNlbGVjdDogdXBkYXRlQ29vcmRzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcucHJldmlldy1jb250YWluZXIsLmJ0bi1zYXZlLWF2YXRhcicpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHVwZGF0ZUNvb3JkcyhjKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWFnZVdpZHRoID0gaW1hZ2VGb3JDcm9wLndpZHRoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWFnZUhlaWdodCA9IGltYWdlRm9yQ3JvcC5oZWlnaHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4MSA9IGMueDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHkxID0gYy55O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeDIgPSBjLngyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeTIgPSBjLnkyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnI3gnKS52YWwoYy54KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcjeScpLnZhbChjLnkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJyN3JykudmFsKGMudyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnI2gnKS52YWwoYy5oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnI3gyJykudmFsKGMueDIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJyN5MicpLnZhbChjLnkyKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcnggPSAxNTAgLyBjLnc7IC8vIDE1MCAtINGA0LDQt9C80LXRgCDQvtC60L3QsCDQv9GA0LXQtNCy0LDRgNC40YLQtdC70YzQvdC+0LPQviDQv9GA0L7RgdC80L7RgtGA0LBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByeSA9IDE1MCAvIGMuaDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcjcHJldmlldycpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IE1hdGgucm91bmQocnggKiBpbWFnZVdpZHRoKSArICdweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBNYXRoLnJvdW5kKHJ5ICogaW1hZ2VIZWlnaHQpICsgJ3B4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW5MZWZ0OiAnLScgKyBNYXRoLnJvdW5kKHJ4ICogYy54KSArICdweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luVG9wOiAnLScgKyBNYXRoLnJvdW5kKHJ5ICogYy55KSArICdweCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBjbG9zZTogZnVuY3Rpb24gKGV2ZW50LCB1aSkge1xyXG4gICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygncHJvZmlsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKCcucHJldmlldy1jb250YWluZXInKS5hZGRDbGFzcygnaGlkZGVuJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoJy51aS1kaWFsb2cnKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCQodGhpcykuYXR0cignYXJpYS1kZXNjcmliZWRieScpID09ICdkaWFsb2ctbWVzc2FnZScpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5kZXRhY2goKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBbICckc3RhdGUnLCckcm9vdFNjb3BlJywgY2hhbmdlQXZhdGFyQ3RybCBdOyIsIlxyXG52YXIgY29udGFjdHNDdHJsID0gZnVuY3Rpb24oJHJvb3RTY29wZSkge1xyXG4gICAgdmFyIGN0cmwgPSB0aGlzO1xyXG5cclxuICAgICRyb290U2NvcGUuYmFzZS5pc0Zvb3RlckJvdHRvbSA9IHRydWU7XHJcblxyXG4gICAgY3RybC5pc0F1dGggPSBhdXRoQ2xpZW50LmNoZWNrSWZBdXRob3JpemVkKCk7XHJcblxyXG4gICAgaWYgKGN0cmwuaXNBdXRoKXtcclxuICAgICAgICBjdHJsLnVzZXIgPSB1c2VyQ2xpZW50LmdldFNob3J0VXNlckluZm8oKTtcclxuICAgICAgICBjdHJsLnVzZXJfbmFtZSA9IGN0cmwudXNlci5maXJzdE5hbWUrXCIgXCIrY3RybC51c2VyLmxhc3ROYW1lO1xyXG4gICAgICAgIGN0cmwuY29udGFjdHMgPSB1c2VyQ2xpZW50LmdldFVzZXJDb250YWN0cygpO1xyXG4gICAgfVxyXG5cclxuICAgIGN0cmwuc2VuZCA9IGZ1bmN0aW9uKCRldmVudCl7XHJcbiAgICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgdmFyIGVtYWlsLG5hbWUsXHJcbiAgICAgICAgICAgIGNvbnRlbnQgPSBjdHJsLmNvbnRlbnQ7XHJcblxyXG4gICAgICAgIGlmKGN0cmwuaXNBdXRoKXtcclxuICAgICAgICAgICAgZW1haWwgPSBjdHJsLmNvbnRhY3RzLmVtYWlsO1xyXG4gICAgICAgICAgICBuYW1lID0gY3RybC51c2VyX25hbWU7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGVtYWlsID0gY3RybC5lbWFpbDtcclxuICAgICAgICAgICAgbmFtZSA9IGN0cmwubmFtZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG1lc3NhZ2VDbGllbnQuc2VuZEluZm9FbWFpbChlbWFpbCxuYW1lLGNvbnRlbnQpO1xyXG4gICAgICAgIGN0cmwuaXNTZW5kID0gdHJ1ZTtcclxuICAgICAgICBjdHJsLmNvbnRlbnQgPSBcIlwiO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coZW1haWwsbmFtZSxjb250ZW50KTtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIG9sZFRleHRMZW5ndGggPSAwO1xyXG5cclxuICAgICQoJy5jb250ZW50Jykua2V5dXAoZnVuY3Rpb24oZXZlbnQpIHtcclxuXHJcbiAgICAgICAgdmFyIGVsID0gZXZlbnQudGFyZ2V0LFxyXG4gICAgICAgICAgICBjbGllbnRIZWlnaHQgPSBlbC5jbGllbnRIZWlnaHQsXHJcbiAgICAgICAgICAgIHNjcm9sbEhlaWdodCA9IGVsLnNjcm9sbEhlaWdodCxcclxuICAgICAgICAgICAgdGV4dExlbmd0aCA9IGVsLnRleHRMZW5ndGgsXHJcbiAgICAgICAgICAgIGNsaWVudFdpZHRoID0gZWwuY2xpZW50V2lkdGgsXHJcbiAgICAgICAgICAgIHRleHRMZW5ndGhQWCwgbmV3SGVpZ2h0LCByZW1vdmVSb3dDb3VudCxcclxuICAgICAgICAgICAgZGVmYXVsdEhlaWdodCwgbmV3Um93Q291bnQ7XHJcblxyXG4gICAgICAgIGRlZmF1bHRIZWlnaHQgPSAxMDA7XHJcblxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgINCY0YHRhdC+0LTQvdGL0LUg0LTQsNC90L3Ri9C1OlxyXG4gICAgICAgICDQndCwINC+0LTQuNC9INGB0LjQvNCy0L7QuyDQv9GA0LjRhdC+0LTQuNGC0YHRjyB+OHB4INCyINGI0LjRgNC40L3Rg1xyXG4gICAgICAgICDQktGL0YHQvtGC0LAg0YHRgtGA0L7QutC4INGC0LXQutGB0YLQsCB+MTRweFxyXG5cclxuICAgICAgICAgKiDQl9C00LXRgdGMINCy0YvQv9C+0LvQvdGP0LXQvCDRgtCw0LrQuNC1INC00LXQudGB0YLQstC40Y8gOlxyXG4gICAgICAgICAqIDEpINCh0YfQuNGC0LDQtdC8INC00LvQuNC90YMg0YLQtdC60YHRgtCwINCyINC/0LjQutGB0LXQu9GP0YVcclxuICAgICAgICAgKiAyKSDQntC/0YDQtdC00LXQu9GP0LXQvCDRhtC10LvQvtC1INC60L7Qu9C40YfQtdGB0YLQvtCyINGB0YLRgNC+0LosINC60L7RgtC+0YDRi9C1INGD0LTQsNC70LjQu9C4XHJcbiAgICAgICAgICogMykg0J7Qv9GA0LXQtNC10LvRj9C8INC90L7QstGD0Y4g0LLRi9GB0L7RgtGDINGBINGD0YfQtdGC0L7QvCDQstGL0YHQvtGC0Ysg0YPQtNCw0LvQtdC90L3QvtCz0L4g0YLQtdC60YHRgtCwXHJcbiAgICAgICAgICogKi9cclxuXHJcbiAgICAgICAgaWYgKHNjcm9sbEhlaWdodCA+IGNsaWVudEhlaWdodCkge1xyXG5cclxuICAgICAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gc2Nyb2xsSGVpZ2h0ICsgJ3B4JztcclxuICAgICAgICB9IGVsc2UgaWYgKHNjcm9sbEhlaWdodCA+IGRlZmF1bHRIZWlnaHQpIHtcclxuICAgICAgICAgICAgdGV4dExlbmd0aFBYID0gKHBhcnNlSW50KG9sZFRleHRMZW5ndGgpIC0gdGV4dExlbmd0aCkgKiA4OyAvLyAxXHJcbiAgICAgICAgICAgIGlmICh0ZXh0TGVuZ3RoUFggPiBjbGllbnRXaWR0aCkge1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlUm93Q291bnQgPSBNYXRoLmZsb29yKHRleHRMZW5ndGhQWCAvIGNsaWVudFdpZHRoKTsgLy8gMlxyXG4gICAgICAgICAgICAgICAgbmV3SGVpZ2h0ID0gcGFyc2VJbnQoZXZlbnQudGFyZ2V0LnN0eWxlLmhlaWdodCkgLSByZW1vdmVSb3dDb3VudCAqIDE0OyAvLyAzXHJcbiAgICAgICAgICAgICAgICBuZXdIZWlnaHQgPiBkZWZhdWx0SGVpZ2h0ID8gZXZlbnQudGFyZ2V0LnN0eWxlLmhlaWdodCA9IG5ld0hlaWdodCArIFwicHhcIiA6XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQudGFyZ2V0LnN0eWxlLmhlaWdodCA9IGRlZmF1bHRIZWlnaHQgKyAncHgnO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGVsLnN0eWxlLmhlaWdodCA9IHNjcm9sbEhlaWdodCAtIDYgKyAncHgnO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGVsLnN0eWxlLmhlaWdodCA9IGRlZmF1bHRIZWlnaHQgKyAncHgnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBvbGRUZXh0TGVuZ3RoID0gdGV4dExlbmd0aDtcclxuXHJcblxyXG4gICAgICAgICQoJy5uZy1jbG9haycpLnJlbW92ZUNsYXNzKCduZy1jbG9haycpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgYW5ndWxhci5lbGVtZW50KCQoJy5jb21pbmctc29vbicpKS5jc3MoeydtaW4taGVpZ2h0JzogJCh3aW5kb3cpLmhlaWdodCgpLTEwNX0pO1xyXG5cclxuICAgICQoJy5uZy1jbG9haycpLnJlbW92ZUNsYXNzKCduZy1jbG9haycpO1xyXG5cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gWyAnJHJvb3RTY29wZScsIGNvbnRhY3RzQ3RybCBdOyIsIlxyXG52YXIgY291bnRlcnNDdHJsID0gZnVuY3Rpb24oJHJvb3RTY29wZSwkbW9kYWwsJGNvdW50ZXJzKSB7XHJcbiAgICAgICAgdmFyIGNvdW50ZXJzID0gdGhpcztcclxuICAgICAgICAvL2NvdW50ZXJzID0gJHNjb3BlO1xyXG5cclxuICAgICAgICAkcm9vdFNjb3BlLmJhc2UubWFpbkNvbnRlbnRUb3BJc0hpZGUgPSB0cnVlO1xyXG4gICAgICAgICRyb290U2NvcGUuYmFzZS5wYWdlVGl0bGUgPSBcItCh0YfQtdGC0YfQuNC60LhcIjtcclxuICAgICAgICAkcm9vdFNjb3BlLmJhc2UuaXNGb290ZXJCb3R0b20gPSB0cnVlO1xyXG5cclxuICAgICAgICBjb3VudGVycy5jb3VudGVycyA9ICRjb3VudGVycy5nZXRDb3VudGVycztcclxuICAgICAgICBjb3VudGVycy50eXBlc0FycmF5ID0gW107XHJcbiAgICAgICAgdmFyIHR5cGVzRW51bUxlbmd0aCA9IDY7XHJcblxyXG4gICAgICAgIHZhciBjb3VudGVyU2VydmljZSA9IHV0aWxpdHlDbGllbnQuZ2V0Q291bnRlclNlcnZpY2UoKTtcclxuXHJcbiAgICAgICAgdmFyIGN1cnJlbnREYXRlID0gKG5ldyBEYXRlKCkpLmdldERhdGUoKTtcclxuXHJcbiAgICAgICAgY291bnRlcnMuZW5kRGF0ZU9mTW9udGggPSBjb3VudGVyU2VydmljZS5lbmREYXRlT2ZNb250aDtcclxuICAgICAgICBjb3VudGVycy5zdGFydERhdGVPZk1vbnRoID0gY291bnRlclNlcnZpY2Uuc3RhcnREYXRlT2ZNb250aDtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhjb3VudGVyU2VydmljZS5zdGFydERhdGVPZk1vbnRoK1wiIFwiICtcclxuICAgICAgICBjb3VudGVyU2VydmljZS5lbmREYXRlT2ZNb250aCtcIiBcIitcclxuICAgICAgICBjb3VudGVyU2VydmljZS5pbmZvUHJvdmlkZWQpO1xyXG5cclxuICAgIHZhciBpc05vdztcclxuICAgIGlmKGNvdW50ZXJTZXJ2aWNlLmVuZERhdGVPZk1vbnRoID4gY291bnRlclNlcnZpY2Uuc3RhcnREYXRlT2ZNb250aCl7XHJcbiAgICAgICAgaXNOb3cgPSAoY3VycmVudERhdGUgPj0gY291bnRlclNlcnZpY2Uuc3RhcnREYXRlT2ZNb250aCAmJlxyXG4gICAgICAgICAgICBjdXJyZW50RGF0ZSA8PSBjb3VudGVyU2VydmljZS5lbmREYXRlT2ZNb250aCk7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgICBpc05vdyA9IChjdXJyZW50RGF0ZSA8PSBjb3VudGVyU2VydmljZS5lbmREYXRlT2ZNb250aCB8fFxyXG4gICAgICAgICAgICBjdXJyZW50RGF0ZSA+PSBjb3VudGVyU2VydmljZS5zdGFydERhdGVPZk1vbnRoKTtcclxuICAgIH1cclxuXHJcbiAgICAgICAgaWYoaXNOb3cgKXtcclxuXHJcbiAgICAgICAgICAgIGlmKGNvdW50ZXJTZXJ2aWNlLmluZm9Qcm92aWRlZCl7XHJcbiAgICAgICAgICAgICAgICAvLyDRgSAxNCDQv9C+IDI0LCDQvtGC0L/RgNCw0LLQu9C10L3QvlxyXG4gICAgICAgICAgICAgICAgY291bnRlcnMuc3RhdGUgPSAyO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIC8vINGBIDE0INC/0L4gMjQsINC90LUg0L7RgtC/0YDQsNCy0LvQtdC90L5cclxuICAgICAgICAgICAgICAgIGNvdW50ZXJzLnN0YXRlID0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAvLyDQstGA0LXQvNGPINGBIDI0INC/0L4gMTQg0YfQuNGB0LvQvlxyXG4gICAgICAgICAgICBjb3VudGVycy5zdGF0ZSA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAvL2NvbnNvbGUubG9nKCdzdGF0ZSAnK2NvdW50ZXJzLnN0YXRlKTtcclxuXHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHR5cGVzRW51bUxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgY291bnRlcnMudHlwZXNBcnJheVtpXSA9IHt9O1xyXG4gICAgICAgICAgICBjb3VudGVycy50eXBlc0FycmF5W2ldLnR5cGUgPSBpO1xyXG4gICAgICAgICAgICBjb3VudGVycy50eXBlc0FycmF5W2ldLnR5cGVTdHJpbmcgPSAkY291bnRlcnMuZ2V0VHlwZVN0cmluZyhpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBjb3VudGVyc0xlbmd0aCA9IGNvdW50ZXJzLmNvdW50ZXJzLmxlbmd0aDtcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgY291bnRlcnNMZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGNvdW50ZXJzLmNvdW50ZXJzW2ldLmN1cnJlbnRWYWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgICAgIGNvdW50ZXJzLmNvdW50ZXJzW2ldLmlzRWRpdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBjb3VudGVycy5jb3VudGVyc1tpXS53YXNFZGl0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGNvdW50ZXJzLmNvdW50ZXJzW2ldLnR5cGVTdHJpbmcgPSAkY291bnRlcnMuZ2V0VHlwZVN0cmluZyhjb3VudGVycy5jb3VudGVyc1tpXS50eXBlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvdW50ZXJzLnNhdmUgPSBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICAgICAgdmFyIGNvdW50ZXJzTGVuID0gY291bnRlcnMuY291bnRlcnMubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgY3VycmVudFZhbHVlLFxyXG4gICAgICAgICAgICAgICAgZGF0ZSwgaXNDYW5TYXZlID0gdHJ1ZTtcclxuXHJcblxyXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgY291bnRlcnNMZW47IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBpZighY291bnRlcnMuY291bnRlcnNbaV0uY3VycmVudFZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNDYW5TYXZlPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoaXNDYW5TYXZlKSB7XHJcbiAgICAgICAgICAgICAgICBjb3VudGVycy5lcnJvclRleHQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGNvdW50ZXJzTGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY291bnRlcnMuY291bnRlcnNbaV0ud2FzRWRpdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRlID0gRGF0ZS5wYXJzZShuZXcgRGF0ZSgpKSAvIDEwMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRWYWx1ZSA9IGNvdW50ZXJzLmNvdW50ZXJzW2ldLmN1cnJlbnRWYWx1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY3VycmVudFZhbHVlKSBjdXJyZW50VmFsdWUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlsaXR5Q2xpZW50LnNldEN1cnJlbnRDb3VudGVyVmFsdWUoY291bnRlcnMuY291bnRlcnNbaV0uaWQsIGN1cnJlbnRWYWx1ZSwgZGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50ZXJzLmNvdW50ZXJzW2ldLmxhc3RWYWx1ZSA9IGN1cnJlbnRWYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY291bnRlcnMuY291bnRlcnNbaV0uY3VycmVudFZhbHVlID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY291bnRlcnMuc3RhdGUgPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBjb3VudGVycy5lcnJvclRleHQgPSBcItCd0LXQvtCx0YXQvtC00LjQvNC+INGD0LrQsNC30LDRgtGMINC30L3QsNGH0LXQvdC40Y8g0LLRgdC10YUg0YHRh9GC0LXRh9C40LrQvtCyXCI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY291bnRlcnMuYWRkQ291bnRlciA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHZhciBjb3VudGVyID0gbmV3IGNvbS52bWVzdGVvbmxpbmUuYmUudGhyaWZ0LnV0aWxpdHlzZXJ2aWNlLkNvdW50ZXIoKTtcclxuICAgICAgICAgICAgY291bnRlci5pZCA9IHV0aWxpdHlDbGllbnQucmVnaXN0ZXJDb3VudGVyKGNvdW50ZXIpO1xyXG4gICAgICAgICAgICBjb3VudGVyLmlzRWRpdCA9IHRydWU7XHJcbiAgICAgICAgICAgIGNvdW50ZXJzLmNvdW50ZXJzLnB1c2goY291bnRlcik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb3VudGVycy5lZGl0Q291bnRlciA9IGZ1bmN0aW9uKGNvdW50ZXIpe1xyXG4gICAgICAgICAgICBjb3VudGVyLmlzRWRpdCA9IHRydWU7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb3VudGVycy5zYXZlRWRpdGVkQ291bnRlciA9IGZ1bmN0aW9uKGNvdW50ZXIpe1xyXG4gICAgICAgICAgICAvL2FsZXJ0KGNvdW50ZXIuaWQrXCIgXCIrY291bnRlci5udW1iZXIrXCIgXCIrY291bnRlci50eXBlK1wiIFwiK2NvdW50ZXIubG9jYXRpb24pO1xyXG4gICAgICAgICAgICAvKmZvcih2YXIgcCBpbiBjb3VudGVyKXtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KGNvdW50ZXJbcF0rXCIgXCIrcCk7XHJcbiAgICAgICAgICAgIH0qL1xyXG5cclxuICAgICAgICAgICAgdmFyIGNvcnJlY3RDb3VudGVyID0gbmV3IGNvbS52bWVzdGVvbmxpbmUuYmUudGhyaWZ0LnV0aWxpdHlzZXJ2aWNlLkNvdW50ZXIoKTtcclxuICAgICAgICAgICAgY29ycmVjdENvdW50ZXIuaWQgPSBjb3VudGVyLmlkO1xyXG4gICAgICAgICAgICBjb3JyZWN0Q291bnRlci5sb2NhdGlvbiA9IGNvdW50ZXIubG9jYXRpb247XHJcbiAgICAgICAgICAgIGNvcnJlY3RDb3VudGVyLnR5cGUgPSBjb3VudGVyLnR5cGU7XHJcbiAgICAgICAgICAgIGNvcnJlY3RDb3VudGVyLm51bWJlciA9IGNvdW50ZXIubnVtYmVyO1xyXG4gICAgICAgICAgICBjb3JyZWN0Q291bnRlci5sYXN0VmFsdWUgPSBjb3VudGVyLmxhc3RWYWx1ZTtcclxuXHJcbiAgICAgICAgICAgIHV0aWxpdHlDbGllbnQudXBkYXRlQ291bnRlcihjb3JyZWN0Q291bnRlcik7XHJcbiAgICAgICAgICAgIGNvdW50ZXIuaXNFZGl0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGNvdW50ZXIudHlwZVN0cmluZyA9ICRjb3VudGVycy5nZXRUeXBlU3RyaW5nKGNvdW50ZXIudHlwZSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb3VudGVycy5yZW1vdmVDb3VudGVyID0gZnVuY3Rpb24oY291bnRlcil7XHJcblxyXG4gICAgICAgICAgICB2YXIgbW9kYWwgPSAkbW9kYWwub3Blbih7XHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ215TW9kYWxDb250ZW50Lmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ01vZGFsSW5zdGFuY2VDdHJsJyxcclxuICAgICAgICAgICAgICAgIHdpbmRvd0NsYXNzOiAnbW9kYWwtcmVtb3ZlLWNvdW50ZXInLFxyXG4gICAgICAgICAgICAgICAgc2l6ZTogJ3NtJ1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIG1vZGFsLnJlc3VsdC50aGVuKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB1dGlsaXR5Q2xpZW50LnJlbW92ZUNvdW50ZXIoY291bnRlci5pZCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgY291bnRlcnNMZW5ndGggPSBjb3VudGVycy5jb3VudGVycy5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpPCBjb3VudGVyc0xlbmd0aDsgaSsrKXtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoY291bnRlci5pZCA9PSBjb3VudGVycy5jb3VudGVyc1tpXS5pZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50ZXJzLmNvdW50ZXJzLnNwbGljZShpLDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY291bnRlcnMuY291bnRlcnNDb25maXJtID0gZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgICAgIHZhciBuZXdTZXJ2aWNlc1N0YXR1c2VzID0gW107XHJcbiAgICAgICAgICAgIG5ld1NlcnZpY2VzU3RhdHVzZXNbJzExJ10gPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgdXNlckNsaWVudC51cGRhdGVVc2VyU2VydmljZXMobmV3U2VydmljZXNTdGF0dXNlcyk7XHJcblxyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLmJhc2UubWUuY291bnRlcnNDb25maXJtZWQgPSB0cnVlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNvdW50ZXJzLmNhbmNlbCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGNvdW50ZXJzLnN0YXRlID0gMTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjb3VudGVycy50b2dnbGVOb3RpZmljYXRpb24gPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgIHZhciBuZXdTZXJ2aWNlc1N0YXR1c2VzID0gW107XHJcblxyXG4gICAgICAgICAgaWYgKCRyb290U2NvcGUuYmFzZS5tZS5jb3VudGVyc05vdGlmaWNhdGlvbiApe1xyXG4gICAgICAgICAgICAgICRyb290U2NvcGUuYmFzZS5tZS5jb3VudGVyc05vdGlmaWNhdGlvbiA9IG5ld1NlcnZpY2VzU3RhdHVzZXNbJzEyJ10gPSBmYWxzZTtcclxuICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICRyb290U2NvcGUuYmFzZS5tZS5jb3VudGVyc05vdGlmaWNhdGlvbiA9IG5ld1NlcnZpY2VzU3RhdHVzZXNbJzEyJ10gPSB0cnVlO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdXNlckNsaWVudC51cGRhdGVVc2VyU2VydmljZXMobmV3U2VydmljZXNTdGF0dXNlcyk7XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgY291bnRlcnMuaW5wdXRDb3VudGVyID0gZnVuY3Rpb24oY291bnRlcil7XHJcbiAgICAgICAgY291bnRlci53YXNFZGl0ID0gdHJ1ZTtcclxuICAgICAgICBjb3VudGVyLmN1cnJlbnRWYWx1ZSA9IHBhcnNlSW50KGNvdW50ZXIuY3VycmVudFZhbHVlKTtcclxuICAgICB9O1xyXG5cclxuICAgICAgICBhbmd1bGFyLmVsZW1lbnQoJCgnLmNvdW50ZXJzJykpLmNzcyh7J21pbi1oZWlnaHQnOiAkKHdpbmRvdykuaGVpZ2h0KCktMTA1fSk7XHJcblxyXG4gICAgfTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gWyAnJHJvb3RTY29wZScsJyRtb2RhbCcsJyRjb3VudGVycycsIGNvdW50ZXJzQ3RybCBdOyIsIlxyXG52YXIgY291bnRlcnNIaXN0b3J5Q3RybCA9IGZ1bmN0aW9uKCRzY29wZSwkc3RhdGVQYXJhbXMsJHJvb3RTY29wZSwkY291bnRlcnMpIHtcclxuXHJcbiAgICAgICAgJHJvb3RTY29wZS5iYXNlLm1haW5Db250ZW50VG9wSXNIaWRlID0gdHJ1ZTtcclxuICAgICAgICAkcm9vdFNjb3BlLmJhc2UucGFnZVRpdGxlID0gXCLQmNGB0YLQvtGA0LjRjyDQv9C+0LrQsNC30LDQvdC40Lkg0YHRh9C10YLRh9C40LrQsFwiO1xyXG4gICAgICAgICRyb290U2NvcGUuYmFzZS5pc0Zvb3RlckJvdHRvbSA9IHRydWU7XHJcblxyXG4gICAgICAgIHZhciBjb3VudGVycyA9ICRjb3VudGVycy5nZXRDb3VudGVycyxcclxuICAgICAgICAgICAgY291bnRlcnNMZW4gPSBjb3VudGVycy5sZW5ndGg7XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGNvdW50ZXJzTGVuOyBpKyspe1xyXG4gICAgICAgICAgICBpZihjb3VudGVyc1tpXS5pZCA9PSAkc3RhdGVQYXJhbXMuY291bnRlcklkKXtcclxuICAgICAgICAgICAgICAgICRzY29wZS5jdXJyZW50Q291bnRlciA9IGNvdW50ZXJzW2ldO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmN1cnJlbnRDb3VudGVyLnR5cGVTdHJpbmcgPSAkY291bnRlcnMuZ2V0VHlwZVN0cmluZyhjb3VudGVyc1tpXS50eXBlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIG5vdyA9IERhdGUucGFyc2UobmV3IERhdGUoKSkvMTAwMCxcclxuICAgICAgICAgICAgaGlzdG9yeSA9IHV0aWxpdHlDbGllbnQuZ2V0Q291bnRlckhpc3RvcnkoJHN0YXRlUGFyYW1zLmNvdW50ZXJJZCwwLG5vdyksXHJcbiAgICAgICAgICAgIGNvdW50ZXIgPSAwO1xyXG5cclxuICAgICAgICAkc2NvcGUuaGlzdG9yeSA9IFtdO1xyXG4gICAgICAgICRzY29wZS5jb3VudGVyTmFtZSA9ICRzdGF0ZVBhcmFtcy5jb3VudGVyTmFtZTtcclxuXHJcbiAgICAgICAgZm9yKHZhciBwIGluIGhpc3Rvcnkpe1xyXG4gICAgICAgICAgICAkc2NvcGUuaGlzdG9yeVtjb3VudGVyXSA9IHt9O1xyXG4gICAgICAgICAgICAkc2NvcGUuaGlzdG9yeVtjb3VudGVyXS5kYXRlID0gcDtcclxuICAgICAgICAgICAgJHNjb3BlLmhpc3RvcnlbY291bnRlcl0udmFsID0gaGlzdG9yeVtwXTtcclxuICAgICAgICAgICAgY291bnRlcisrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYW5ndWxhci5lbGVtZW50KCQoJy5jb3VudGVycycpKS5jc3MoeydtaW4taGVpZ2h0JzogJCh3aW5kb3cpLmhlaWdodCgpLTEwNX0pO1xyXG5cclxuICAgIH07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFsgJyRzdGF0ZScsJyRzdGF0ZVBhcmFtcycsJyRyb290U2NvcGUnLCckY291bnRlcnMnLCBjb3VudGVyc0hpc3RvcnlDdHJsIF07IiwiXHJcbnZhciBkaWFsb2dDdHJsID0gZnVuY3Rpb24oJHJvb3RTY29wZSwkc3RhdGVQYXJhbXMsJHN0YXRlKSB7XHJcblxyXG4gICAgICAgIGluaXRGYW5jeUJveCgkKCcuZGlhbG9nJykpO1xyXG4gICAgICAgICRyb290U2NvcGUuYmFzZS5tYWluQ29udGVudFRvcElzSGlkZSA9IHRydWU7XHJcbiAgICAgICAgJHJvb3RTY29wZS5iYXNlLmlzRm9vdGVyQm90dG9tID0gZmFsc2U7XHJcbiAgICAgICAgJHJvb3RTY29wZS5iYXNlLmxhc3RMb2FkZWRJZCA9IDA7XHJcbiAgICAgICAgJHJvb3RTY29wZS5jdXJyZW50UGFnZSA9ICdkaWFsb2ctc2luZ2xlJztcclxuICAgICAgICAkcm9vdFNjb3BlLmJhc2UuY3VycmVudERpYWxvZ0lkID0gJHN0YXRlUGFyYW1zLmRpYWxvZ0lkO1xyXG4gICAgICAgICRyb290U2NvcGUuY3VycmVudFJ1YnJpYyA9IG51bGw7XHJcblxyXG4gICAgICAgIHZhciBkaWFsb2cgPSB0aGlzLFxyXG4gICAgICAgICAgICBsYXN0TG9hZGVkSWQgPSAwLFxyXG4gICAgICAgICAgICBsb2FkZWRMZW5ndGggPSAyMDtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdmFyIGN1cnJlbnREaWFsb2cgPSBkaWFsb2dDbGllbnQuZ2V0RGlhbG9nQnlJZCgkc3RhdGVQYXJhbXMuZGlhbG9nSWQpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGN1cnJlbnREaWFsb2dMZW5ndGggPSBjdXJyZW50RGlhbG9nLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgIGRpYWxvZy5pc0RpYWxvZyA9IHRydWU7XHJcbiAgICAgICAgICAgIGRpYWxvZy5hdHRhY2hJZCA9ICcwMDAnO1xyXG4gICAgICAgICAgICBkaWFsb2cuZGlhbG9nSWQgPSAkc3RhdGVQYXJhbXMuZGlhbG9nSWQ7XHJcblxyXG4gICAgICAgICAgICBkaWFsb2cudXNlcnMgPSBjdXJyZW50RGlhbG9nLnVzZXJzO1xyXG4gICAgICAgICAgICB2YXIgZGlhbG9nVXNlcnNMZW5ndGggPSBkaWFsb2cudXNlcnMubGVuZ3RoO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRpYWxvZ1VzZXJzTGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coZGlhbG9nLnVzZXJzW2ldLmlkK1wiIFwiKyRyb290U2NvcGUuYmFzZS5tZS5pZCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGlhbG9nLnVzZXJzW2ldICYmIChkaWFsb2cudXNlcnNbaV0uaWQgPT0gJHJvb3RTY29wZS5iYXNlLm1lLmlkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpYWxvZy51c2Vycy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgkc3RhdGVQYXJhbXMuZGlhbG9nSWQpIHtcclxuICAgICAgICAgICAgICAgICRyb290U2NvcGUuYmFzZS5zZXRQcml2YXRlTWVzc2FnZXMoZGlhbG9nLmRpYWxvZ0lkLGxvYWRlZExlbmd0aCk7XHJcblxyXG4gICAgICAgICAgICAgICAgZGlhbG9nLnByaXZhdGVNZXNzYWdlcyA9ICRyb290U2NvcGUuYmFzZS5wcml2YXRlTWVzc2FnZXM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vZGlhbG9nLm1lc3NhZ2VUZXh0ID0gVEVYVF9ERUZBVUxUXzE7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuYmFzZS5pbml0U3RhcnRQYXJhbXNGb3JDcmVhdGVNZXNzYWdlKGRpYWxvZyk7XHJcblxyXG4gICAgICAgIH1jYXRjaChlKXtcclxuICAgICAgICAgICAgJHN0YXRlLmdvKCdkaWFsb2dzJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgbGFzdExvYWRlZElkRkY7XHJcbiAgICAgICAgZGlhbG9nLmFkZE1vcmVJdGVtcyA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHZhciBidWZmID0gZGlhbG9nQ2xpZW50LmdldERpYWxvZ01lc3NhZ2VzKCRzdGF0ZVBhcmFtcy5kaWFsb2dJZCwwLGxvYWRlZExlbmd0aCwkcm9vdFNjb3BlLmJhc2UubGFzdExvYWRlZElkKTtcclxuICAgICAgICAgICAgaWYoYnVmZikge1xyXG4gICAgICAgICAgICAgICAgdmFyIGJ1ZmZMZW5ndGggPSBidWZmLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihidWZmTGVuZ3RoICE9IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5iYXNlLmxhc3RMb2FkZWRJZCA9IGJ1ZmZbYnVmZkxlbmd0aCAtIDFdLmlkO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihsYXN0TG9hZGVkSWRGRiAhPSAkcm9vdFNjb3BlLmJhc2UubGFzdExvYWRlZElkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYnVmZkxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWZmW2ldLmF1dGhvclByb2ZpbGUgPSB1c2VyQ2xpZW50LmdldFVzZXJQcm9maWxlKGJ1ZmZbaV0uYXV0aG9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaWFsb2cucHJpdmF0ZU1lc3NhZ2VzID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuYmFzZS5wcml2YXRlTWVzc2FnZXMgPSAkcm9vdFNjb3BlLmJhc2UucHJpdmF0ZU1lc3NhZ2VzLmNvbmNhdChidWZmKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxhc3RMb2FkZWRJZEZGID0gJHJvb3RTY29wZS5iYXNlLmxhc3RMb2FkZWRJZDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkKCcubmctY2xvYWsnKS5yZW1vdmVDbGFzcygnbmctY2xvYWsnKTtcclxuXHJcbiAgICB9O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBbICckcm9vdFNjb3BlJywnJHN0YXRlUGFyYW1zJywnJHN0YXRlJywgZGlhbG9nQ3RybCBdOyIsIlxyXG52YXIgZGlhbG9nc0N0cmwgPSAgZnVuY3Rpb24oJHJvb3RTY29wZSwkc3RhdGUpe1xyXG4gICAgICAgICRyb290U2NvcGUuaXNUb3BTZWFyY2hTaG93ID0gZmFsc2U7XHJcbiAgICAgICAgJHJvb3RTY29wZS5iYXNlLm1haW5Db250ZW50VG9wSXNIaWRlID0gdHJ1ZTtcclxuICAgICAgICAkcm9vdFNjb3BlLmxlZnRiYXIudGFiID0gMDtcclxuICAgICAgICAkcm9vdFNjb3BlLmJhc2UuaXNGb290ZXJCb3R0b20gPSBmYWxzZTtcclxuICAgICAgICAkcm9vdFNjb3BlLmN1cnJlbnRQYWdlID0gXCJkaWFsb2dzXCI7XHJcbiAgICAgICAgJHJvb3RTY29wZS5jdXJyZW50UnVicmljID0gbnVsbDtcclxuXHJcbiAgICAgICAgcmVzZXRQYWdlcygkcm9vdFNjb3BlLmJhc2UpO1xyXG4gICAgICAgICRyb290U2NvcGUuYmFzZS5wcml2YXRlTWVzc2FnZXNJc0FjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgJHJvb3RTY29wZS5iYXNlLnBhZ2VUaXRsZSA9IFwi0JvQuNGH0L3Ri9C1INGB0L7QvtCx0YnQtdC90LjRj1wiO1xyXG5cclxuICAgICAgICByZXNldEFjZU5hdkJ0bnMoJHJvb3RTY29wZS5uYXZiYXIpO1xyXG4gICAgICAgICRyb290U2NvcGUubmF2YmFyLnByaXZhdGVNZXNzYWdlc0J0blN0YXR1cyA9IFwiYWN0aXZlXCI7XHJcblxyXG4gICAgICAgICRyb290U2NvcGUuYmFzZS5wcml2YXRlTWVzc2FnZXNMb2FkU3RhdHVzID0gXCJpc0xvYWRlZFwiO1xyXG5cclxuICAgICAgICAkcm9vdFNjb3BlLmlzTmV3UHJpdmF0ZU1lc3NhZ2VBZGRlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICB2YXIgZGlhbG9ncyA9IHRoaXM7XHJcblxyXG4gICAgICAgIGRpYWxvZ3MuZGlhbG9nc0xpc3QgPSBkaWFsb2dDbGllbnQuZ2V0RGlhbG9ncygwKTtcclxuICAgICAgICB2YXIgZGlhbG9nc0xpc3RMZW5ndGggPSBkaWFsb2dzLmRpYWxvZ3NMaXN0Lmxlbmd0aDtcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgZGlhbG9nc0xpc3RMZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIChkaWFsb2dzLmRpYWxvZ3NMaXN0W2ldLnVzZXJzWzBdLmlkICE9ICRyb290U2NvcGUuYmFzZS5tZS5pZCkgP1xyXG4gICAgICAgICAgICAgICAgZGlhbG9ncy5kaWFsb2dzTGlzdFtpXS5hbm90aGVyVXNlciA9IGRpYWxvZ3MuZGlhbG9nc0xpc3RbaV0udXNlcnNbMF0gOlxyXG4gICAgICAgICAgICAgICAgZGlhbG9ncy5kaWFsb2dzTGlzdFtpXS5hbm90aGVyVXNlciA9IGRpYWxvZ3MuZGlhbG9nc0xpc3RbaV0udXNlcnNbMV07XHJcblxyXG4gICAgICAgICAgICBkaWFsb2dzLmRpYWxvZ3NMaXN0W2ldLm5ld01lc3NhZ2VzQ291bnQgPSAwO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImRpYWxvZyBcIiskcm9vdFNjb3BlLm5ld01lc3NhZ2VzLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIGlmKCRyb290U2NvcGUubmV3TWVzc2FnZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG5ld01lc3NhZ2VzTGVuZ3RoID0gJHJvb3RTY29wZS5uZXdNZXNzYWdlcy5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICBmb3IodmFyIGogPSAwOyBqIDwgbmV3TWVzc2FnZXNMZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkaWFsb2dzLmRpYWxvZ3NMaXN0W2ldLmlkID09ICRyb290U2NvcGUubmV3TWVzc2FnZXNbal0uZGlhbG9nSWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlhbG9ncy5kaWFsb2dzTGlzdFtpXS5uZXdNZXNzYWdlc0NvdW50ID0gJHJvb3RTY29wZS5uZXdNZXNzYWdlc1tqXS5jb3VudDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRpYWxvZ3MuZ29Ub1NpbmdsZURpYWxvZyA9IGZ1bmN0aW9uKGRpYWxvZ0lkKXtcclxuICAgICAgICAgICAgdmFyIHVzZXJzSW5mb0FycmF5ID0gW10sXHJcbiAgICAgICAgICAgICAgICB1c2Vyc0luZm9MZW5ndGgsXHJcbiAgICAgICAgICAgICAgICB1c2Vyc0lkID0gW107XHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBkaWFsb2dzTGlzdExlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGlmKGRpYWxvZ3MuZGlhbG9nc0xpc3RbaV0uaWQgPT0gZGlhbG9nSWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJzSW5mb0FycmF5ID0gZGlhbG9ncy5kaWFsb2dzTGlzdFtpXS51c2VycztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih1c2Vyc0luZm9BcnJheSl7XHJcbiAgICAgICAgICAgICAgICB1c2Vyc0luZm9MZW5ndGggPSB1c2Vyc0luZm9BcnJheS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdXNlcnNJbmZvTGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJzSWRbaV0gPSB1c2Vyc0luZm9BcnJheVtpXS5pZFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vJHJvb3RTY29wZS5jdXJyZW50RGlhbG9nID0gZGlhbG9nQ2xpZW50LmdldERpYWxvZyh1c2Vyc0lkKTtcclxuICAgICAgICAgICAgJHN0YXRlLmdvKCdkaWFsb2ctc2luZ2xlJyx7IGRpYWxvZ0lkIDogZGlhbG9nSWR9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkKCcubmctY2xvYWsnKS5yZW1vdmVDbGFzcygnbmctY2xvYWsnKTtcclxuXHJcbiAgICB9O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBbICckcm9vdFNjb3BlJywnJHN0YXRlJywgZGlhbG9nc0N0cmwgXTsiLCJcclxudmFyIGltcG9ydGFudEN0cmwgPSBmdW5jdGlvbigkcm9vdFNjb3BlKSB7XHJcblxyXG4gICAgICAgICRyb290U2NvcGUuc2V0VGFiKDQpO1xyXG4gICAgICAgICRyb290U2NvcGUuYmFzZS5zaG93QWxsR3JvdXBzKCk7XHJcbiAgICAgICAgJHJvb3RTY29wZS5iYXNlLmlzRm9vdGVyQm90dG9tID0gZmFsc2U7XHJcbiAgICAgICAgJHJvb3RTY29wZS5iYXNlLnBhZ2VUaXRsZSA9IFwi0JLQsNC20L3QvlwiO1xyXG4gICAgICAgICRyb290U2NvcGUuYmFzZS5tYWluQ29udGVudFRvcElzSGlkZSA9IHRydWU7XHJcbiAgICAgICAgJHJvb3RTY29wZS5jdXJyZW50UnVicmljID0gbnVsbDtcclxuXHJcbiAgICAgICAgdmFyIGltcG9ydGFudCA9IHRoaXMsXHJcbiAgICAgICAgICAgIGxhc3RMb2FkZWRJZCA9IDAsXHJcbiAgICAgICAgICAgIGxvYWRlZExlbmd0aCA9IDEwO1xyXG5cclxuICAgICAgICAkcm9vdFNjb3BlLkNPTU1FTlRTX0RFRkFVTFRfQ09VTlQgPSA0O1xyXG4gICAgICAgIGltcG9ydGFudC5zZWxlY3RlZEdyb3VwSW5Ub3AgPSAkcm9vdFNjb3BlLmN1cnJlbnRHcm91cDtcclxuXHJcbiAgICAgICAgLyppZighJHJvb3RTY29wZS5pbXBvcnRhbnRJc0xvYWRlZEZyb21Ub3ApXHJcbiAgICAgICAgICAgICRyb290U2NvcGUuaW1wb3J0YW50VG9waWNzID0gbWVzc2FnZUNsaWVudC5nZXRJbXBvcnRhbnRUb3BpY3MoJHJvb3RTY29wZS5jdXJyZW50R3JvdXAuaWQpO1xyXG4gICAgICAgICRyb290U2NvcGUuaW1wb3J0YW50SXNMb2FkZWRGcm9tVG9wID0gZmFsc2U7Ki9cclxuXHJcbiAgICAgICAgLy9pbXBvcnRhbnQudG9waWNzID0gbWVzc2FnZUNsaWVudC5nZXRJbXBvcnRhbnRUb3BpY3MoJHJvb3RTY29wZS5jdXJyZW50R3JvdXAuaWQpO1xyXG4gICAgICAgIGltcG9ydGFudC53YWxsSXRlbXMgPSBtZXNzYWdlQ2xpZW50LmdldEltcG9ydGFudE5ld3MoJHJvb3RTY29wZS5jdXJyZW50R3JvdXAuaWQsMCwwLDApO1xyXG5cclxuICAgICAgICBpbXBvcnRhbnQuYXR0YWNoSWQgPSBcIjBcIjtcclxuICAgICAgICAvLyRyb290U2NvcGUuYmFzZS5pbml0U3RhcnRQYXJhbXNGb3JDcmVhdGVUb3BpYyhpbXBvcnRhbnQpO1xyXG5cclxuICAgICAgICBpbXBvcnRhbnQubWVzc2FnZSA9IHt9O1xyXG5cclxuICAgICAgICBpbXBvcnRhbnQubWVzc2FnZS5jb250ZW50ID0gaW1wb3J0YW50Lm1lc3NhZ2UuZGVmYXVsdCA9IFRFWFRfREVGQVVMVF8xO1xyXG5cclxuICAgICAgICAkcm9vdFNjb3BlLmltcG9ydGFudENoYW5nZUdyb3VwID0gZnVuY3Rpb24oZ3JvdXBJZCl7XHJcblxyXG4gICAgICAgICAgICBpbXBvcnRhbnQud2FsbEl0ZW1zID0gbWVzc2FnZUNsaWVudC5nZXRJbXBvcnRhbnROZXdzKGdyb3VwSWQsIDAsIGxvYWRlZExlbmd0aCk7XHJcblxyXG4gICAgICAgICAgICBpZihpbXBvcnRhbnQud2FsbEl0ZW1zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgaW5pdFdhbGxJdGVtKGltcG9ydGFudC53YWxsSXRlbXMpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vbGFzdExvYWRlZElkID0gbGVudGEud2FsbEl0ZW1zW2ltcG9ydGFudC53YWxsSXRlbXMubGVuZ3RoLTFdLnRvcGljLmlkO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHZhciB3YWxsSXRlbXNMZW5ndGg7XHJcbiAgICAgICAgaW1wb3J0YW50LndhbGxJdGVtcyA/IHdhbGxJdGVtc0xlbmd0aCA9IGltcG9ydGFudC53YWxsSXRlbXMubGVuZ3RoIDpcclxuICAgICAgICAgICAgd2FsbEl0ZW1zTGVuZ3RoID0gMDtcclxuXHJcbiAgICAgICAgaWYod2FsbEl0ZW1zTGVuZ3RoID09IDApICRyb290U2NvcGUuYmFzZS5tYWluQ29udGVudFRvcElzSGlkZSA9IHRydWU7XHJcblxyXG4gICAgICAgIGlmKHdhbGxJdGVtc0xlbmd0aCAhPSAwKSBsYXN0TG9hZGVkSWQgPSBpbXBvcnRhbnQud2FsbEl0ZW1zW3dhbGxJdGVtc0xlbmd0aC0xXS50b3BpYy5pZDtcclxuXHJcbiAgICAgICAgaW5pdFdhbGxJdGVtKGltcG9ydGFudC53YWxsSXRlbXMpO1xyXG5cclxuICAgICAgICAkcm9vdFNjb3BlLnNlbGVjdEdyb3VwSW5Ecm9wZG93bl9pbXBvcnRhbnQgPSBmdW5jdGlvbihncm91cElkKXtcclxuICAgICAgICAgICAgaW1wb3J0YW50LnNlbGVjdGVkR3JvdXAgPSAkcm9vdFNjb3BlLmJhc2UuYnVmZmVyU2VsZWN0ZWRHcm91cCA9IHNlbGVjdEdyb3VwSW5Ecm9wZG93bihncm91cElkKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpbXBvcnRhbnQuZ29Ub0Fuc3dlcklucHV0ID0gZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHZhciBpbml0RmxhZ3NBcnJheSA9IFtdO1xyXG4gICAgICAgIGltcG9ydGFudC5zaG93QW5zd2VySW5wdXQgPSBmdW5jdGlvbihldmVudCx3YWxsSXRlbSx3YWxsTWVzc2FnZSl7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAvKndhbGxJdGVtLmFuc3dlclNob3cgP1xyXG4gICAgICAgICAgICAgd2FsbEl0ZW0uYW5zd2VyU2hvdyA9IGZhbHNlIDoqL1xyXG4gICAgICAgICAgICB3YWxsSXRlbS5hbnN3ZXJTaG93ID0gdHJ1ZSA7XHJcbiAgICAgICAgICAgIHdhbGxJdGVtLmlzRm9jdXMgPSB0cnVlIDtcclxuXHJcbiAgICAgICAgICAgIGlmKHdhbGxNZXNzYWdlKXtcclxuICAgICAgICAgICAgICAgIHZhciBhdXRob3JOYW1lO1xyXG4gICAgICAgICAgICAgICAgd2FsbE1lc3NhZ2UudXNlckluZm8gP1xyXG4gICAgICAgICAgICAgICAgICAgIGF1dGhvck5hbWUgPSB3YWxsTWVzc2FnZS51c2VySW5mby5maXJzdE5hbWUgOlxyXG4gICAgICAgICAgICAgICAgICAgIGF1dGhvck5hbWUgPSB3YWxsTWVzc2FnZS5hdXRob3JOYW1lLnNwbGl0KCcgJylbMF07XHJcbiAgICAgICAgICAgICAgICB3YWxsSXRlbS5jb21tZW50VGV4dCA9IGF1dGhvck5hbWUrXCIsIFwiO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHdhbGxJdGVtLmNvbW1lbnRUZXh0ID0gXCJcIjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoIWluaXRGbGFnc0FycmF5W3dhbGxJdGVtLnRvcGljLmlkXSkge1xyXG4gICAgICAgICAgICAgICAgLy8g0LjQvdC40YTQuNGG0LDQu9C40LfQsNGG0LzRjiBBdHRhY2hJbWFnZSDQvdGD0LbQvdC+INC00LXQu9Cw0YLRjCDRgtC+0LvRjNC60L4g0L7QtNC40L0g0YDQsNC3INC00LvRjyDQutCw0LbQtNC+0LPQviDRgdC+0L7QsdGJ0LXQvdC40Y9cclxuICAgICAgICAgICAgICAgIGluaXRGbGFnc0FycmF5W3dhbGxJdGVtLnRvcGljLmlkXSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHJvb3RTY29wZS53YWxsQ2hhbmdlR3JvdXAgPSBmdW5jdGlvbihncm91cElkKXtcclxuXHJcbiAgICAgICAgICAgIGltcG9ydGFudC53YWxsSXRlbXMgPSBtZXNzYWdlQ2xpZW50LmdldFdhbGxJdGVtcyhncm91cElkLCAwLCBsb2FkZWRMZW5ndGgpO1xyXG5cclxuICAgICAgICAgICAgaWYoaW1wb3J0YW50LndhbGxJdGVtcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGluaXRXYWxsSXRlbShpbXBvcnRhbnQud2FsbEl0ZW1zKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsYXN0TG9hZGVkSWQgPSBpbXBvcnRhbnQud2FsbEl0ZW1zW2ltcG9ydGFudC53YWxsSXRlbXMubGVuZ3RoLTFdLnRvcGljLmlkO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGluaXRXYWxsSXRlbSh3YWxsSXRlbXMpe1xyXG4gICAgICAgICAgICB3YWxsSXRlbXNMZW5ndGggPSB3YWxsSXRlbXMubGVuZ3RoO1xyXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgd2FsbEl0ZW1zTGVuZ3RoOyBpKyspe1xyXG5cclxuICAgICAgICAgICAgICAgICRyb290U2NvcGUuYmFzZS5pbml0U3RhcnRQYXJhbXNGb3JDcmVhdGVNZXNzYWdlKHdhbGxJdGVtc1tpXSk7XHJcblxyXG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5iYXNlLmluaXRTdGFydFBhcmFtc0ZvckNyZWF0ZVRvcGljKHdhbGxJdGVtc1tpXS50b3BpYyk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gIHdhbGxJdGVtc1tpXS50b3BpYy5tZXNzYWdlLmdyb3VwSWQg0YHQtdC50YfQsNGBINC90LUg0LfQsNC00LDQvdCwINC/0L7Rh9C10LzRgy3RgtC+XHJcbiAgICAgICAgICAgICAgICB3YWxsSXRlbXNbaV0ubGFiZWwgPSBnZXRMYWJlbCgkcm9vdFNjb3BlLmJhc2UuZ3JvdXBzLHdhbGxJdGVtc1tpXS50b3BpYy5ncm91cFR5cGUpO1xyXG5cclxuICAgICAgICAgICAgICAgIHdhbGxJdGVtc1tpXS50YWdDb2xvciA9IGdldFRhZ0NvbG9yKHdhbGxJdGVtc1tpXS5sYWJlbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgd2FsbEl0ZW1zW2ldLmlzT3BlbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKHdhbGxJdGVtc1tpXS50b3BpYy5tZXNzYWdlLmltcG9ydGFudCA9PSAxKXtcclxuICAgICAgICAgICAgICAgICAgICB3YWxsSXRlbXNbaV0udG9waWMubWVzc2FnZS5pbXBvcnRhbnRUZXh0ID0gJ9Ch0L3Rj9GC0Ywg0LzQtdGC0LrRgyBcItCS0LDQttC90L7QtVwiJztcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHdhbGxJdGVtc1tpXS50b3BpYy5tZXNzYWdlLmltcG9ydGFudFRleHQgPSAn0J/QvtC80LXRgtC40YLRjCDQutCw0LogXCLQktCw0LbQvdC+0LVcIic7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYod2FsbEl0ZW1zW2ldLnRvcGljLm1lc3NhZ2UudHlwZSA9PSAxKXtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgd2FsbEl0ZW1zW2ldLnRvcGljLmxhc3RVcGRhdGVFZGl0ID0gZ2V0VGltaW5nKHdhbGxJdGVtc1tpXS50b3BpYy5sYXN0VXBkYXRlKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZih3YWxsSXRlbXNbaV0udG9waWMubWVzc2FnZS50eXBlID09IDUpe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB3YWxsSXRlbXNbaV0udG9waWMubWVzc2FnZS5jcmVhdGVkRWRpdCA9IGdldFRpbWluZyh3YWxsSXRlbXNbaV0udG9waWMubWVzc2FnZS5jcmVhdGVkKTtcclxuICAgICAgICAgICAgICAgICAgICB3YWxsSXRlbXNbaV0udG9waWMuYXV0aG9yTmFtZSA9IGdldEF1dGhvck5hbWUod2FsbEl0ZW1zW2ldLnRvcGljLnVzZXJJbmZvKTtcclxuICAgICAgICAgICAgICAgICAgICB3YWxsSXRlbXNbaV0udG9waWMubWV0YVR5cGUgPSBcIm1lc3NhZ2VcIjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1lc0xlbjtcclxuICAgICAgICAgICAgICAgICAgICB3YWxsSXRlbXNbaV0ubWVzc2FnZXMgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNMZW4gPSB3YWxsSXRlbXNbaV0ubWVzc2FnZXMubGVuZ3RoOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNMZW4gPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3IodmFyIGogPSAwOyBqIDwgbWVzTGVuOyBqKyspe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3YWxsSXRlbXNbaV0ubWVzc2FnZXNbal0uY3JlYXRlZEVkaXQgPSBnZXRUaW1pbmcod2FsbEl0ZW1zW2ldLm1lc3NhZ2VzW2pdLmNyZWF0ZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3YWxsSXRlbXNbaV0ubWVzc2FnZXNbal0uYXV0aG9yTmFtZSA9IGdldEF1dGhvck5hbWUod2FsbEl0ZW1zW2ldLm1lc3NhZ2VzW2pdLnVzZXJJbmZvKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2FsbEl0ZW1zW2ldLm1lc3NhZ2VzW2pdLmlzRWRpdCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5iYXNlLmluaXRTdGFydFBhcmFtc0ZvckNyZWF0ZU1lc3NhZ2Uod2FsbEl0ZW1zW2ldLm1lc3NhZ2VzW2pdKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIChtZXNMZW4gPj0gJHJvb3RTY29wZS5DT01NRU5UU19ERUZBVUxUX0NPVU5UKSA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdhbGxJdGVtc1tpXS5idWZmZXJNZXNzYWdlcyA9IHdhbGxJdGVtc1tpXS5tZXNzYWdlcy5zbGljZShtZXNMZW4tJHJvb3RTY29wZS5DT01NRU5UU19ERUZBVUxUX0NPVU5UKTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2FsbEl0ZW1zW2ldLmJ1ZmZlck1lc3NhZ2VzID0gd2FsbEl0ZW1zW2ldLm1lc3NhZ2VzO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHdhbGxJdGVtc1tpXS50b3BpYy5wb2xsICE9IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL9C30L3QsNGH0LjRgiDRjdGC0L4g0L7Qv9GA0L7RgVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRQb2xsRWRpdE5hbWVzKHdhbGxJdGVtc1tpXS50b3BpYy5wb2xsKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdhbGxJdGVtc1tpXS50b3BpYy5tZXRhVHlwZSA9IFwicG9sbFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW1wb3J0YW50LnRvZ2dsZUNvbW1lbnRzID0gZnVuY3Rpb24oZXZlbnQsd2FsbEl0ZW0pe1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgdmFyIG1lc0xlbiA9IHdhbGxJdGVtLm1lc3NhZ2VzLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgIGlmKHdhbGxJdGVtLmlzT3Blbil7XHJcbiAgICAgICAgICAgICAgICB3YWxsSXRlbS5pc09wZW4gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICAobWVzTGVuID49ICRyb290U2NvcGUuQ09NTUVOVFNfREVGQVVMVF9DT1VOVCkgP1xyXG4gICAgICAgICAgICAgICAgICAgIHdhbGxJdGVtLmJ1ZmZlck1lc3NhZ2VzID0gd2FsbEl0ZW0ubWVzc2FnZXMuc2xpY2UobWVzTGVuLSRyb290U2NvcGUuQ09NTUVOVFNfREVGQVVMVF9DT1VOVCk6XHJcbiAgICAgICAgICAgICAgICAgICAgd2FsbEl0ZW0uYnVmZmVyTWVzc2FnZXMgPSB3YWxsSXRlbS5tZXNzYWdlcztcclxuXHJcbiAgICAgICAgICAgICAgICAvL3dhbGxJdGVtLmJ1ZmZlck1lc3NhZ2VzID0gd2FsbEl0ZW0ubWVzc2FnZXMuc2xpY2UobWVzTGVuLWltcG9ydGFudC5DT01NRU5UU19ERUZBVUxUX0NPVU5UKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB3YWxsSXRlbS5pc09wZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgd2FsbEl0ZW0uYnVmZmVyTWVzc2FnZXMgPSB3YWxsSXRlbS5tZXNzYWdlcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGluaXRGYW5jeUJveCgkKCcuZm9ydW0nKSk7XHJcblxyXG4gICAgICAgICQoJy5uZy1jbG9haycpLnJlbW92ZUNsYXNzKCduZy1jbG9haycpO1xyXG5cclxuICAgIH07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFsgJyRyb290U2NvcGUnLCBpbXBvcnRhbnRDdHJsIF07IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBhbmd1bGFyLm1vZHVsZSgnVk9Db250cm9sbGVycycsIFsndWkuc2VsZWN0MicsJ2luZmluaXRlLXNjcm9sbCcsJ25nU2FuaXRpemUnLCd5YU1hcCcsJ3VpLmJvb3RzdHJhcCddKVxyXG5cclxuICAgIC5jb250cm9sbGVyKCdiYXNlQ3RybCcsIHJlcXVpcmUoJy4vYmFzZS5qcycpKVxyXG5cclxuICAgIC5jb250cm9sbGVyKCdhYm91dEN0cmwnLCByZXF1aXJlKCcuL2Fib3V0LmpzJykpXHJcbiAgICAuY29udHJvbGxlcignYWR2ZXJ0c0N0cmwnLCByZXF1aXJlKCcuL2FkdmVydHMuanMnKSlcclxuICAgIC5jb250cm9sbGVyKCdhZHZlcnRzU2luZ2xlQ3RybCcsIHJlcXVpcmUoJy4vYWR2ZXJ0c1NpbmdsZS5qcycpKVxyXG4gICAgLmNvbnRyb2xsZXIoJ2Jsb2dDdHJsJywgcmVxdWlyZSgnLi9ibG9nLmpzJykpXHJcbiAgICAuY29udHJvbGxlcignY2hhbmdlQXZhdGFyQ3RybCcsIHJlcXVpcmUoJy4vY2hhbmdlQXZhdGFyLmpzJykpXHJcbiAgICAuY29udHJvbGxlcignY29udGFjdHNDdHJsJywgcmVxdWlyZSgnLi9jb250YWN0cy5qcycpKVxyXG4gICAgLmNvbnRyb2xsZXIoJ2NvdW50ZXJzQ3RybCcsIHJlcXVpcmUoJy4vY291bnRlcnMuanMnKSlcclxuICAgIC5jb250cm9sbGVyKCdjb3VudGVyc0hpc3RvcnlDdHJsJywgcmVxdWlyZSgnLi9jb3VudGVyc0hpc3RvcnkuanMnKSlcclxuICAgIC5jb250cm9sbGVyKCdkaWFsb2dDdHJsJywgcmVxdWlyZSgnLi9kaWFsb2cuanMnKSlcclxuICAgIC5jb250cm9sbGVyKCdkaWFsb2dzQ3RybCcsIHJlcXVpcmUoJy4vZGlhbG9ncy5qcycpKVxyXG4gICAgLmNvbnRyb2xsZXIoJ2ltcG9ydGFudEN0cmwnLCByZXF1aXJlKCcuL2ltcG9ydGFudC5qcycpKVxyXG4gICAgLmNvbnRyb2xsZXIoJ2xlZnRCYXJDdHJsJywgcmVxdWlyZSgnLi9sZWZ0QmFyLmpzJykpXHJcbiAgICAuY29udHJvbGxlcignd2FsbEN0cmwnLCByZXF1aXJlKCcuL3dhbGwuanMnKSlcclxuICAgIC5jb250cm9sbGVyKCdtYWluQ29udGVudFRvcEN0cmwnLCByZXF1aXJlKCcuL21haW5Db250ZW50VG9wLmpzJykpXHJcbiAgICAuY29udHJvbGxlcignbWFwc0N0cmwnLCByZXF1aXJlKCcuL21hcHMuanMnKSlcclxuICAgIC5jb250cm9sbGVyKCdtb2RhbEluc3RhbmNlQ3RybCcsIHJlcXVpcmUoJy4vbW9kYWxJbnN0YW5jZS5qcycpKVxyXG4gICAgLmNvbnRyb2xsZXIoJ25hdmJhckN0cmwnLCByZXF1aXJlKCcuL25hdmJhci5qcycpKVxyXG4gICAgLmNvbnRyb2xsZXIoJ25lYXJieUN0cmwnLCByZXF1aXJlKCcuL25lYXJieS5qcycpKVxyXG4gICAgLmNvbnRyb2xsZXIoJ25lYXJieVNpbmdsZUN0cmwnLCByZXF1aXJlKCcuL25lYXJieVNpbmdsZS5qcycpKVxyXG4gICAgLmNvbnRyb2xsZXIoJ25laWdoYm91cnNDdHJsJywgcmVxdWlyZSgnLi9uZWlnaGJvdXJzLmpzJykpXHJcbiAgICAuY29udHJvbGxlcigncHJvZmlsZUN0cmwnLCByZXF1aXJlKCcuL3Byb2ZpbGUuanMnKSlcclxuICAgIC5jb250cm9sbGVyKCdydWJyaWNzQ3RybCcsIHJlcXVpcmUoJy4vcnVicmljcy5qcycpKVxyXG4gICAgLmNvbnRyb2xsZXIoJ3J1YnJpY3NTaW5nbGVDdHJsJywgcmVxdWlyZSgnLi9ydWJyaWNzU2luZ2xlLmpzJykpXHJcbiAgICAuY29udHJvbGxlcignc2V0SW5mb0N0cmwnLCByZXF1aXJlKCcuL3NldEluZm8uanMnKSlcclxuICAgIC5jb250cm9sbGVyKCdzZXR0aW5nc0N0cmwnLCByZXF1aXJlKCcuL3NldHRpbmdzLmpzJykpXHJcbiAgICAuY29udHJvbGxlcigndGFsa3NDdHJsJywgcmVxdWlyZSgnLi90YWxrcy5qcycpKVxyXG4gICAgLmNvbnRyb2xsZXIoJ3RhbGtzU2luZ2xlQ3RybCcsIHJlcXVpcmUoJy4vdGFsa3NTaW5nbGUuanMnKSlcclxuICAgIC5jb250cm9sbGVyKCd1bmNvbmZpcm1lZEN0cmwnLCByZXF1aXJlKCcuL3VuY29uZmlybWVkLmpzJykpXHJcbiAgICAuY29udHJvbGxlcignd2FsbFNpbmdsZUN0cmwnLCByZXF1aXJlKCcuL3dhbGxTaW5nbGUuanMnKSlcclxuXHJcbiAgICAvLyBidXNpbmVzc1xyXG4gICAgLmNvbnRyb2xsZXIoJ2NhYmluZXRDdHJsJywgcmVxdWlyZSgnLi9idXNpbmVzcy9jYWJpbmV0LmpzJykpXHJcbiAgICAuY29udHJvbGxlcignZWRpdEN0cmwnLCByZXF1aXJlKCcuL2J1c2luZXNzL2VkaXQuanMnKSlcclxuICAgIC5jb250cm9sbGVyKCdzdGF0aXN0aWNDdHJsJywgcmVxdWlyZSgnLi9idXNpbmVzcy9zdGF0aXN0aWMuanMnKSlcclxuOyIsIlxyXG52YXIgbGVmdEJhckN0cmwgPSBmdW5jdGlvbigkcm9vdFNjb3BlLCRzdGF0ZSkge1xyXG5cclxuICAgICRyb290U2NvcGUuc2V0VGFiID0gZnVuY3Rpb24obmV3VmFsdWUpe1xyXG5cclxuICAgICAgICAkcm9vdFNjb3BlLmxlZnRiYXIudGFiID0gbmV3VmFsdWU7XHJcbiAgICAgICAgJHJvb3RTY29wZS5pc1RvcFNlYXJjaFNob3cgPSB0cnVlO1xyXG4gICAgICAgIHJlc2V0UGFnZXMoJHJvb3RTY29wZS5iYXNlKTtcclxuICAgICAgICByZXNldEFjZU5hdkJ0bnMoJHJvb3RTY29wZS5uYXZiYXIpO1xyXG5cclxuICAgICAgICBzd2l0Y2gobmV3VmFsdWUpe1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmJhc2UubWFpbkNvbnRlbnRUb3BJc0hpZGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICRyb290U2NvcGUuYmFzZS5sZW50YUlzQWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICRyb290U2NvcGUuY3VycmVudFBhZ2UgPSAnbGVudGEnO1xyXG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5iYXNlLnBhZ2VUaXRsZSA9IFwi0J3QvtCy0L7RgdGC0LhcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmJhc2UubWFpbkNvbnRlbnRUb3BJc0hpZGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICRyb290U2NvcGUuYmFzZS5pc1RhbGtUaXRsZXMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5iYXNlLnRhbGtzSXNBY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5jdXJyZW50UGFnZSA9ICd0YWxrcyc7XHJcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmJhc2UucGFnZVRpdGxlID0gXCLQntCx0YHRg9C20LTQtdC90LjRj1wiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICRyb290U2NvcGUuYmFzZS5tYWluQ29udGVudFRvcElzSGlkZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5iYXNlLmlzQWR2ZXJ0c1RpdGxlcyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmJhc2UuYWR2ZXJ0c0lzQWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICRyb290U2NvcGUuY3VycmVudFBhZ2UgPSAnYWR2ZXJ0cyc7XHJcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmJhc2UucGFnZVRpdGxlID0gXCLQntCx0YrRj9Cy0LvQtdC90LjRj1wiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgICRyb290U2NvcGUuYmFzZS5tYWluQ29udGVudFRvcElzSGlkZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5iYXNlLmltcG9ydGFudElzQWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICRyb290U2NvcGUuY3VycmVudFBhZ2UgPSAnaW1wb3J0YW50JztcclxuICAgICAgICAgICAgICAgICRyb290U2NvcGUuYmFzZS5wYWdlVGl0bGUgPSBcItCS0LDQttC90YvQtSDRgdC+0L7QsdGJ0LXQvdC40Y9cIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmJhc2UubWFpbkNvbnRlbnRUb3BJc0hpZGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICRyb290U2NvcGUuYmFzZS5pbXBvcnRhbnRJc0FjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmN1cnJlbnRQYWdlID0gJ25lYXJieSc7XHJcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmJhc2UucGFnZVRpdGxlID0gXCLQoNGP0LTQvtC8XCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdCA6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAkcm9vdFNjb3BlLmlzU2V0ID0gZnVuY3Rpb24obnVtYmVyKXtcclxuICAgICAgICByZXR1cm4gJHJvb3RTY29wZS5sZWZ0YmFyLnRhYiA9PT0gbnVtYmVyO1xyXG4gICAgfTtcclxuXHJcbiAgICAkcm9vdFNjb3BlLnNldFJ1YnJpYyA9IGZ1bmN0aW9uKHJ1YnJpYyl7XHJcblxyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLmN1cnJlbnRSdWJyaWMgPSBydWJyaWM7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuc2VsUnVicmljTmFtZSA9ICRyb290U2NvcGUuY3VycmVudFJ1YnJpYy52aXNpYmxlTmFtZTtcclxuICAgICAgICBpZighcnVicmljKSB7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuY3VycmVudFJ1YnJpYyA9IHt9O1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLnNlbFJ1YnJpY05hbWUgPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoJHN0YXRlLmN1cnJlbnQubmFtZSAhPSAnbWFpbicpIHtcclxuICAgICAgICAgICAgdmFyIHN0ID0gJHN0YXRlLmdldCgnbWFpbicpO1xyXG4gICAgICAgICAgICBzdC5ydWJyaWNJZCA9IHJ1YnJpYy5pZDtcclxuICAgICAgICAgICAgJHN0YXRlLmdvKCdtYWluJyk7XHJcbiAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLndhbGxDaGFuZ2VSdWJyaWMoJHJvb3RTY29wZS5jdXJyZW50UnVicmljLmlkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gIH07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFsgJyRyb290U2NvcGUnLCckc3RhdGUnLCBsZWZ0QmFyQ3RybCBdOyIsIlxyXG52YXIgbWFpbkNvbnRlbnRUb3BDdHJsID0gZnVuY3Rpb24oJHJvb3RTY29wZSwgJHN0YXRlKSB7XHJcblxyXG4gICAgICAgIHZhciB0b3BDdHJsID0gdGhpcztcclxuXHJcbiAgICAgICAgdG9wQ3RybC5ncm91cHMgPSB1c2VyQ2xpZW50R3JvdXBzOy8vID8gdXNlckNsaWVudEdyb3Vwcy5yZXZlcnNlKCkgOiB1c2VyQ2xpZW50LmdldFVzZXJHcm91cHMoKS5yZXZlcnNlKCk7XHJcbiAgICAgICAgdmFyIGdyb3VwcyA9ICRyb290U2NvcGUuZ3JvdXBzID0gdG9wQ3RybC5ncm91cHMsXHJcbiAgICAgICAgICAgIGdyb3Vwc0xlbmd0aCA9IGdyb3Vwcy5sZW5ndGg7XHJcblxyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBncm91cHNMZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGdyb3Vwc1tpXS5pc1Nob3cgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZihncm91cHNbaV0uaWQgPT0gJHJvb3RTY29wZS5jdXJyZW50R3JvdXAuaWQpIGdyb3Vwc1tpXS5zZWxlY3RlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0b3BDdHJsLmlzU2V0ID0gZnVuY3Rpb24oZ3JvdXBJZCl7XHJcbiAgICAgICAgICAgIC8vcmV0dXJuIGdyb3VwSWQgPT09XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHJvb3RTY29wZS5zZWxlY3RHcm91cCA9IGZ1bmN0aW9uKGdyb3VwKXtcclxuICAgICAgICAgICAgLy92YXIgZ3JvdXBJZCA9IGdyb3VwLmlkO1xyXG5cclxuICAgICAgICAgICAgaWYoZ3JvdXAuaWQgPT0gMCl7XHJcblxyXG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdzZXQtaW5mbycpO1xyXG5cclxuICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYoJHN0YXRlLmN1cnJlbnQubmFtZSA9PSAnc2V0LWluZm8nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ1ZPX3NldEluZm9fZ3JvdXBJZCcsZ3JvdXAuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnbWFpbicpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZ3JvdXBzTGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBncm91cHNbaV0uc2VsZWN0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBncm91cC5zZWxlY3RlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5jdXJyZW50R3JvdXAgPSBncm91cDtcclxuICAgICAgICAgICAgICAgICRyb290U2NvcGUuYmFzZS5idWZmZXJTZWxlY3RlZEdyb3VwID0gc2VsZWN0R3JvdXBJbkRyb3Bkb3duKGdyb3VwLmlkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyRyb290U2NvcGUuaW1wb3J0YW50VG9waWNzID0gbWVzc2FnZUNsaWVudC5nZXRJbXBvcnRhbnROZXdzKGdyb3VwLmlkKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJHJvb3RTY29wZS5jdXJyZW50UGFnZSA9PSAnbGVudGEnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS53YWxsQ2hhbmdlR3JvdXAoZ3JvdXAuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuc2VsZWN0R3JvdXBJbkRyb3Bkb3duX2xlbnRhKGdyb3VwLmlkKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoJHJvb3RTY29wZS5jdXJyZW50UGFnZSA9PSAndGFsa3MnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS50YWxrc0NoYW5nZUdyb3VwKGdyb3VwLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnNlbGVjdEdyb3VwSW5Ecm9wZG93bl90YWxrcyhncm91cC5pZCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCRyb290U2NvcGUuY3VycmVudFBhZ2UgPT0gJ2FkdmVydHMnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5hZHZlcnRzQ2hhbmdlR3JvdXAoZ3JvdXAuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuc2VsZWN0R3JvdXBJbkRyb3Bkb3duX2FkdmVydHMoZ3JvdXAuaWQpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICgkcm9vdFNjb3BlLmN1cnJlbnRQYWdlID09ICduZWlnaGJvdXJzJykge1xyXG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUubmVpZ2hib3Vyc0NoYW5nZUdyb3VwKGdyb3VwLmlkKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoJHJvb3RTY29wZS5jdXJyZW50UGFnZSA9PSAnbWFwcycpIHtcclxuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLm1hcHNDaGFuZ2VHcm91cChncm91cC5pZCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCRyb290U2NvcGUuY3VycmVudFBhZ2UgPT0gJ2ltcG9ydGFudCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmltcG9ydGFudENoYW5nZUdyb3VwKGdyb3VwLmlkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZ3JvdXBJZCcsIGdyb3VwLmlkKTtcclxuICAgICAgICAgICAgICAgIC8vJHJvb3RTY29wZS5jdXJyZW50R3JvdXAgPSAkcm9vdFNjb3BlLmJhc2Uuc2VsZWN0R3JvdXBJbkRyb3Bkb3duKGdyb3VwLmlkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRyb290U2NvcGUuc2hvd0NyZWF0ZVRvcGljID0gZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgJHJvb3RTY29wZS5iYXNlLmNyZWF0ZVRvcGljSXNIaWRlID8gJHJvb3RTY29wZS5iYXNlLmNyZWF0ZVRvcGljSXNIaWRlID0gZmFsc2UgOiAkcm9vdFNjb3BlLmJhc2UuY3JlYXRlVG9waWNJc0hpZGUgPSB0cnVlO1xyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkKCcubmctY2xvYWsnKS5yZW1vdmVDbGFzcygnbmctY2xvYWsnKTtcclxuICAgIH07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFsgJyRyb290U2NvcGUnLCckc3RhdGUnLCBtYWluQ29udGVudFRvcEN0cmwgXTsiLCJcclxudmFyIG1hcHNDdHJsID0gZnVuY3Rpb24oJHJvb3RTY29wZSkge1xyXG4gICAgICAgIHZhciBtYXBzID0gdGhpcztcclxuXHJcbiAgICAgICAgJHJvb3RTY29wZS5jdXJyZW50UGFnZSA9IFwibWFwc1wiO1xyXG4gICAgICAgICRyb290U2NvcGUuaXNUb3BTZWFyY2hTaG93ID0gZmFsc2U7XHJcbiAgICAgICAgJHJvb3RTY29wZS5iYXNlLm1haW5Db250ZW50VG9wSXNIaWRlID0gZmFsc2U7XHJcbiAgICAgICAgJHJvb3RTY29wZS5sZWZ0YmFyLnRhYiA9IDA7XHJcbiAgICAgICAgJHJvb3RTY29wZS5iYXNlLnBhZ2VUaXRsZSA9IFwi0JrQsNGA0YLRi1wiO1xyXG5cclxuICAgICAgICByZXNldFBhZ2VzKCRyb290U2NvcGUuYmFzZSk7XHJcbiAgICAgICAgJHJvb3RTY29wZS5iYXNlLm1hcHNJc0FjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgICAgIHJlc2V0QWNlTmF2QnRucygkcm9vdFNjb3BlLm5hdmJhcik7XHJcbiAgICAgICAgJHJvb3RTY29wZS5uYXZiYXIubWFwc0J0blN0YXR1cyA9IFwiYWN0aXZlXCI7XHJcblxyXG4gICAgICAgICRyb290U2NvcGUuYmFzZS5tYXBzTG9hZFN0YXR1cyA9IFwiaXNMb2FkZWRcIjtcclxuXHJcbiAgICAgICAgc2hvd0dyb3VwT3ZlckJ1aWxkaW5nKCRyb290U2NvcGUuZ3JvdXBzKTtcclxuICAgICAgICAvLyRyb290U2NvcGUuZ3JvdXBzWzBdLmlzU2hvdyA9IGZhbHNlO1xyXG4gICAgICAgIC8vJHJvb3RTY29wZS5ncm91cHNbMV0uc2VsZWN0ZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAvKmlmKCRyb290U2NvcGUuY3VycmVudEdyb3VwLmlkID09ICRyb290U2NvcGUuZ3JvdXBzWzBdLmlkKXtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS5jdXJyZW50R3JvdXAgPSAkcm9vdFNjb3BlLmdyb3Vwc1sxXTtcclxuICAgICAgICB9Ki9cclxuICAgICRyb290U2NvcGUuY3VycmVudEdyb3VwID0gdXNlckNsaWVudEdyb3Vwc1szXTtcclxuXHJcbiAgICAgICAgJHJvb3RTY29wZS5iYXNlLmlzRm9vdGVyQm90dG9tID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgdmFyIHlhTWFwO1xyXG4gICAgICAgIG1hcHMuYWZ0ZXJNYXBJbml0PWZ1bmN0aW9uKG5NYXApe1xyXG4gICAgICAgICAgICB5YU1hcCA9IG5NYXA7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbWFwcy5jb2xvciA9IE1BUF9DT0xPUjtcclxuXHJcbiAgICAgICAgLy9tYXBzLnVybCA9IHVzZXJDbGllbnQuZ2V0R3JvdXBNYXAoJHJvb3RTY29wZS5jdXJyZW50R3JvdXAuaWQsTUFQX0NPTE9SKTtcclxuXHJcbiAgICAgICAgdmFyIGxvY2F0aW9uID0gdXNlckNsaWVudC5nZXRHcm91cFZpZXcoJHJvb3RTY29wZS5jdXJyZW50R3JvdXAuaWQpO1xyXG5cclxuICAgICAgICB2YXIgc2V0TWFwID0gZnVuY3Rpb24obG9jYXRpb24pe1xyXG5cclxuICAgICAgICAgICAgbWFwcy5jZW50ZXIgPSBbbG9jYXRpb24ubG9uZ2l0dWRlLGxvY2F0aW9uLmxhdGl0dWRlXTtcclxuXHJcbiAgICAgICAgICAgIGlmICh5YU1hcCkge1xyXG4gICAgICAgICAgICAgICAgKCRyb290U2NvcGUuY3VycmVudEdyb3VwLnR5cGUgPT0gNCkgPyB5YU1hcC5zZXRab29tKDE3KSA6IHlhTWFwLnNldFpvb20oMTYpOyA7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgKCRyb290U2NvcGUuY3VycmVudEdyb3VwLnR5cGUgPT0gNCkgPyBtYXBzLnpvb20gPSAxNyA6IG1hcHMuem9vbSA9IDE2IDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbWFwcy5iYWxvb24gPSB7XHJcbiAgICAgICAgICAgICAgICAvLyDQk9C10L7QvNC10YLRgNC40Y8gPSDRgtC40L8g0L7QsdGK0LXQutGC0LAgKyDQs9C10L7Qs9GA0LDRhNC40YfQtdGB0LrQuNC1INC60L7QvtGA0LTQuNC90LDRgtGLINC+0LHRitC10LrRgtCwXHJcbiAgICAgICAgICAgICAgICBnZW9tZXRyeToge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vINCi0LjQvyDQs9C10L7QvNC10YLRgNC40LggLSDRgtC+0YfQutCwXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ1BvaW50JyxcclxuICAgICAgICAgICAgICAgICAgICAvLyDQmtC+0L7RgNC00LjQvdCw0YLRiyDRgtC+0YfQutC4LlxyXG4gICAgICAgICAgICAgICAgICAgIGNvb3JkaW5hdGVzOiBtYXBzLmNlbnRlclxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIC8vINCh0LLQvtC50YHRgtCy0LBcclxuICAgICAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICAgICAgICAgICAgICBoaW50Q29udGVudDogXCLQryDQt9C00LXRgdGMXCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIG1hcHMucmFkaXVzID0ge1xyXG4gICAgICAgICAgICAgICAgZ2VvbWV0cnk6IHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnQ2lyY2xlJyxcclxuICAgICAgICAgICAgICAgICAgICBjb29yZGluYXRlczogbWFwcy5jZW50ZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgcmFkaXVzOiBsb2NhdGlvbi5yYWRpdXNcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHNldE1hcChsb2NhdGlvbik7XHJcblxyXG4gICAgICAgICRyb290U2NvcGUubWFwc0NoYW5nZUdyb3VwID0gZnVuY3Rpb24oZ3JvdXBJZCl7XHJcbiAgICAgICAgICAgIHZhciBsb2NhdGlvbiA9IHVzZXJDbGllbnQuZ2V0R3JvdXBWaWV3KGdyb3VwSWQpO1xyXG5cclxuICAgICAgICAgICAgc2V0TWFwKGxvY2F0aW9uKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vJHJvb3RTY29wZS5zZWxlY3RHcm91cChnZXRCdWlsZGluZ0dyb3VwKCRyb290U2NvcGUuY3VycmVudEdyb3VwKSk7XHJcblxyXG4gICAgICAgIGFuZ3VsYXIuZWxlbWVudCgkKCcubWFwcy5wYWdlJykpLmNzcyh7J21pbi1oZWlnaHQnOiAkKHdpbmRvdykuaGVpZ2h0KCktMTc1fSk7IFxyXG5cclxuICAgIH07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFsgJyRyb290U2NvcGUnLCBtYXBzQ3RybCBdOyIsIlxyXG52YXIgbW9kYWxJbnN0YW5jZUN0cmwgPSBmdW5jdGlvbigkc2NvcGUsICRtb2RhbEluc3RhbmNlKSB7XHJcbiAgICAgICAgJHNjb3BlLm9rID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkbW9kYWxJbnN0YW5jZS5jbG9zZSgpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRtb2RhbEluc3RhbmNlLmRpc21pc3MoJ2NhbmNlbCcpO1xyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBbICckc2NvcGUnLCckJG1vZGFsSW5zdGFuY2UnLCBtb2RhbEluc3RhbmNlQ3RybCBdOyIsIlxyXG52YXIgbmF2YmFyQ3RybCA9IGZ1bmN0aW9uKCRyb290U2NvcGUpIHtcclxuXHJcbiAgICAgICAgdGhpcy5wcml2YXRlTWVzc2FnZXNCdG5TdGF0dXMgPSBcIlwiO1xyXG4gICAgICAgICRyb290U2NvcGUubmF2YmFyID0gdGhpcztcclxuXHJcbiAgICAgICAgdGhpcy5sb2dvdXQgPSBmdW5jdGlvbihldmVudCl7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnZ3JvdXBJZCcpO1xyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnVk9faXNfYnVzaW5lc3MnKTtcclxuICAgICAgICAgICAgYXV0aENsaWVudC5sb2dvdXQoKTtcclxuXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmxvY2F0aW9uLnJlcGxhY2UoXCIvbG9naW5cIik7XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vJCgnLm5nLWNsb2FrJykucmVtb3ZlQ2xhc3MoJ25nLWNsb2FrJyk7XHJcblxyXG4gIH07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFsgJyRyb290U2NvcGUnLCBuYXZiYXJDdHJsIF07IiwiXHJcbnZhciBuZWFyYnlDdHJsID0gZnVuY3Rpb24oJHJvb3RTY29wZSkge1xyXG4gICAgdmFyIG5lYXJieSA9IHRoaXM7XHJcblxyXG4gICAgdmFyIGdyb3VwVHlwZSA9IGNvbS52bWVzdGVvbmxpbmUuYmUudGhyaWZ0Lkdyb3VwVHlwZS5ORUlHSEJPUlM7XHJcbiAgICBuZWFyYnkuYnVzaW5lc3NMaXN0ID0gYnVzaW5lc3NDbGllbnQuZ2V0QnVzaW5lc3NMaXN0KGdyb3VwVHlwZSwwKTtcclxuXHJcbiAgICAkcm9vdFNjb3BlLmJhc2UuaXNGb290ZXJCb3R0b20gPSB0cnVlO1xyXG4gICAgJHJvb3RTY29wZS5iYXNlLnBhZ2VUaXRsZSA9IFwi0KDRj9C00L7QvFwiO1xyXG4gICAgJHJvb3RTY29wZS5iYXNlLnRhbGtzSXNBY3RpdmUgPSAkcm9vdFNjb3BlLmJhc2UuYWR2ZXJ0c0lzQWN0aXZlID0gZmFsc2U7XHJcbiAgICBzaG93R3JvdXBPdmVyQnVpbGRpbmcoJHJvb3RTY29wZS5ncm91cHMpO1xyXG4gICAgJHJvb3RTY29wZS5jdXJyZW50UnVicmljID0gbnVsbDtcclxuXHJcbiAgICBuZWFyYnkuaXNBdXRoID0gYXV0aENsaWVudC5jaGVja0lmQXV0aG9yaXplZCgpO1xyXG5cclxuICAgIGlmKG5lYXJieS5pc0F1dGgpe1xyXG4gICAgICAgIC8vbWUgPSB1c2VyQ2xpZW50LmdldFVzZXJQcm9maWxlKCk7XHJcbiAgICAgICAgLy8kKCcuYW5vbk5hbWUnKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XHJcbiAgICB9XHJcblxyXG4gICAgbmVhcmJ5LnBvc3RzID0gbWVzc2FnZUNsaWVudC5nZXRCdXNpbmVzc1RvcGljcygwLDEwMDApO1xyXG5cclxuICAgIGlmKG5lYXJieS5wb3N0cy50b3BpY3MpIHtcclxuICAgICAgICB2YXIgbGVuID0gbmVhcmJ5LnBvc3RzLnRvcGljcy5sZW5ndGg7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICBuZWFyYnkucG9zdHMudG9waWNzW2ldLmlzQ29tbWVudFNob3cgPSBmYWxzZTtcclxuICAgICAgICAgICAgbmVhcmJ5LnBvc3RzLnRvcGljc1tpXS5pc0lucHV0U2hvdyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBuZWFyYnkucG9zdHMudG9waWNzW2ldLnNob3J0ID0gbmVhcmJ5LnBvc3RzLnRvcGljc1tpXS5tZXNzYWdlLmNvbnRlbnQuc3BsaXQoJzsnKVswXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYW5ndWxhci5lbGVtZW50KCQoJy5uZWFyYnknKSkuY3NzKHsnbWluLWhlaWdodCc6ICQod2luZG93KS5oZWlnaHQoKS0xMTB9KTtcclxuXHJcbiAgICAkKCcubmctY2xvYWsnKS5yZW1vdmVDbGFzcygnbmctY2xvYWsnKTtcclxuXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFsgJyRyb290U2NvcGUnLCBuZWFyYnlDdHJsIF07IiwiXHJcbnZhciBuZWFyYnlTaW5nbGVDdHJsID0gIGZ1bmN0aW9uKCRyb290U2NvcGUsJHN0YXRlUGFyYW1zKSB7XHJcbiAgICB2YXIgbmVhcmJ5ID0gdGhpcyxcclxuICAgICAgICBidXNpbmVzc0lkO1xyXG5cclxuICAgIGlmICgkc3RhdGVQYXJhbXMubmVhcmJ5SWQgJiYgJHN0YXRlUGFyYW1zLm5lYXJieUlkICE9IDApe1xyXG4gICAgICAgIGJ1c2luZXNzSWQgPSAkc3RhdGVQYXJhbXMubmVhcmJ5SWQ7XHJcbiAgICB9XHJcblxyXG4gICAgbmVhcmJ5LmluZm8gPSBidXNpbmVzc0NsaWVudC5nZXRCdXNpbmVzc0Rlc2NyaXB0aW9uKGJ1c2luZXNzSWQpO1xyXG4gICAgbmVhcmJ5LndhbGxJdGVtID0gYnVzaW5lc3NDbGllbnQuZ2V0V2FsbEl0ZW0obmVhcmJ5LmluZm8uaWQpO1xyXG5cclxuICAgICRyb290U2NvcGUuYmFzZS5pc0Zvb3RlckJvdHRvbSA9IHRydWU7XHJcbiAgICAkcm9vdFNjb3BlLmJhc2UucGFnZVRpdGxlID0gXCLQoNGP0LTQvtC8XCI7XHJcblxyXG4gICAgbmVhcmJ5LmlzQXV0aCA9IGF1dGhDbGllbnQuY2hlY2tJZkF1dGhvcml6ZWQoKTtcclxuXHJcbiAgICBpZihuZWFyYnkuaXNBdXRoKXtcclxuICAgICAgICAvL21lID0gdXNlckNsaWVudC5nZXRVc2VyUHJvZmlsZSgpO1xyXG4gICAgICAgIC8vJCgnLmFub25OYW1lJykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgfVxyXG5cclxuICAgIG5lYXJieS5wb3N0cyA9IG1lc3NhZ2VDbGllbnQuZ2V0QnVzaW5lc3NUb3BpY3MoMCwxMDAwKTtcclxuXHJcbiAgICBpZihuZWFyYnkucG9zdHMudG9waWNzKSB7XHJcbiAgICAgICAgdmFyIGxlbiA9IG5lYXJieS5wb3N0cy50b3BpY3MubGVuZ3RoO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cobmVhcmJ5LnBvc3RzLnRvcGljc1tpXS5pZCxwYXJzZUludChidXNpbmVzc0lkKSk7XHJcbiAgICAgICAgICAgIGlmKG5lYXJieS5wb3N0cy50b3BpY3NbaV0uaWQgPT0gcGFyc2VJbnQoYnVzaW5lc3NJZCkpe1xyXG4gICAgICAgICAgICAgICAgbmVhcmJ5LnBvc3RzLnRvcGljc1tpXS5pc0NvbW1lbnRTaG93ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIG5lYXJieS5wb3N0cy50b3BpY3NbaV0uaXNJbnB1dFNob3cgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgbmVhcmJ5LnBvc3RzLnRvcGljc1tpXS5mdWxsID0gbmVhcmJ5LnBvc3RzLnRvcGljc1tpXS5tZXNzYWdlLmNvbnRlbnQuc3BsaXQoJzsnKVsxXTtcclxuXHJcbiAgICAgICAgICAgICAgICBuZWFyYnkucG9zdCA9IG5lYXJieS5wb3N0cy50b3BpY3NbaV07XHJcbiAgICAgICAgICAgICAgICBuZWFyYnkucG9zdC5mdWxsTGluayA9ICcvJytuZWFyYnkucG9zdHMudG9waWNzW2ldLmZ1bGw7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhuZWFyYnkucG9zdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbmVhcmJ5LnRvZ2dsZUNvbW0gPSBmdW5jdGlvbigkZXZlbnQscG9zdCl7XHJcbiAgICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgIGlmIChwb3N0LmlzQ29tbWVudFNob3cpe1xyXG4gICAgICAgICAgICBwb3N0LmlzQ29tbWVudFNob3cgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHBvc3QuaXNDb21tZW50U2hvdyA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBpZighcG9zdC5jb21tZW50cykge1xyXG4gICAgICAgICAgICAgICAgcG9zdC5jb21tZW50cyA9IG1lc3NhZ2VDbGllbnQuZ2V0TWVzc2FnZXNBc0xpc3QocG9zdC5pZCwgOCwgMCwgZmFsc2UsIDEwMDApLm1lc3NhZ2VzO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2ZpbmlzaCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgbmVhcmJ5LnRvZ2dsZUlucHV0ID0gZnVuY3Rpb24oJGV2ZW50LHBvc3Qpe1xyXG4gICAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICBwb3N0LmlzSW5wdXRTaG93ID8gcG9zdC5pc0lucHV0U2hvdyA9IGZhbHNlIDogcG9zdC5pc0lucHV0U2hvdyA9IHRydWU7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdpbnB1dCcscG9zdC5pc0lucHV0U2hvdyk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICBuZWFyYnkuc2VuZENvbW0gPSBmdW5jdGlvbigkZXZlbnQscG9zdCl7XHJcbiAgICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSBuZXcgY29tLnZtZXN0ZW9ubGluZS5iZS50aHJpZnQubWVzc2FnZXNlcnZpY2UuTWVzc2FnZSgpO1xyXG5cclxuICAgICAgICBtZXNzYWdlLmlkID0gMDtcclxuICAgICAgICBtZXNzYWdlLnRvcGljSWQgPSBuZWFyYnkuaW5mby5pZDsgLy9wb3N0LmlkO1xyXG4gICAgICAgIG1lc3NhZ2UudHlwZSA9IGNvbS52bWVzdGVvbmxpbmUuYmUudGhyaWZ0Lm1lc3NhZ2VzZXJ2aWNlLk1lc3NhZ2VUeXBlLldBTEw7Ly84O1xyXG4gICAgICAgIG1lc3NhZ2UuZ3JvdXBJZCA9IDA7XHJcbiAgICAgICAgbWVzc2FnZS5jb250ZW50ID0gcG9zdC5jb21tZW50aW5nO1xyXG4gICAgICAgIG1lc3NhZ2UudG9waWNJZCA9IG5lYXJieS53YWxsSXRlbS50b3BpYy5pZDtcclxuICAgICAgICBtZXNzYWdlLnBhcmVudElkID0gMDtcclxuICAgICAgICBtZXNzYWdlLmNyZWF0ZWQgPSBEYXRlLnBhcnNlKG5ldyBEYXRlKCkpLzEwMDA7XHJcbiAgICAgICAgcG9zdC5jb21tZW50aW5nID0gXCJcIjtcclxuXHJcbiAgICAgICAgaWYoIW5lYXJieS5pc0F1dGgpe1xyXG4gICAgICAgICAgICBtZXNzYWdlLmFub25OYW1lID0gcG9zdC5hbm9uTmFtZTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgbWVzc2FnZS5hbm9uTmFtZSA9IFwiXCI7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coJ3Bvc3QnLG1lc3NhZ2UpO1xyXG4gICAgICAgIC8vdmFyIHJldHVybkNvbW1lbnQgPSBtZXNzYWdlQ2xpZW50LnBvc3RCdXNpbmVzc1RvcGljcyhtZXNzYWdlKTtcclxuICAgICAgICB2YXIgcmV0dXJuQ29tbWVudCA9IG1lc3NhZ2VDbGllbnQucG9zdE1lc3NhZ2UobWVzc2FnZSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3Bvc3QyJyxyZXR1cm5Db21tZW50KTtcclxuXHJcblxyXG4gICAgICAgIGlmKG5lYXJieS53YWxsSXRlbS5tZXNzYWdlcyAmJiBuZWFyYnkud2FsbEl0ZW0ubWVzc2FnZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIG5lYXJieS53YWxsSXRlbS5tZXNzYWdlcy5wdXNoKHJldHVybkNvbW1lbnQpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBuZWFyYnkud2FsbEl0ZW0ubWVzc2FnZXMgPSBbXTtcclxuICAgICAgICAgICAgbmVhcmJ5LndhbGxJdGVtLm1lc3NhZ2VzWzBdID0gcmV0dXJuQ29tbWVudDtcclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICBuZWFyYnkuZ2V0VGltaW5nID0gZnVuY3Rpb24obWVzc2FnZU9iakRhdGUpe1xyXG4gICAgICAgIHZhciBtaW51dGUgPSA2MCoxMDAwLFxyXG4gICAgICAgICAgICBob3VyID0gbWludXRlKjYwLFxyXG4gICAgICAgICAgICBkYXkgPSBob3VyKjI0LFxyXG4gICAgICAgICAgICB0aHJlZURheXMgPSBkYXkqIDMsXHJcbiAgICAgICAgICAgIG5vdyA9IERhdGUucGFyc2UobmV3IERhdGUoKSksXHJcbiAgICAgICAgICAgIHRpbWluZyA9IChub3cgLSBtZXNzYWdlT2JqRGF0ZSoxMDAwKSxcclxuICAgICAgICAgICAgdGltZVRlbXA7XHJcblxyXG4gICAgICAgIGlmKHRpbWluZyA8IG1pbnV0ZSl7XHJcbiAgICAgICAgICAgIHRpbWluZyA9IFwi0YLQvtC70YzQutC+INGH0YLQvlwiO1xyXG4gICAgICAgIH1lbHNlIGlmKHRpbWluZyA8IGhvdXIpe1xyXG4gICAgICAgICAgICB0aW1pbmcgPSBuZXcgRGF0ZSh0aW1pbmcpO1xyXG4gICAgICAgICAgICB0aW1pbmcgPSB0aW1pbmcuZ2V0TWludXRlcygpK1wiINC80LjQvSDQvdCw0LfQsNC0XCI7XHJcbiAgICAgICAgfWVsc2UgaWYodGltaW5nIDwgZGF5KXtcclxuICAgICAgICAgICAgdGltaW5nID0gbmV3IERhdGUodGltaW5nKTtcclxuICAgICAgICAgICAgdGltZVRlbXAgPSB0aW1pbmcuZ2V0SG91cnMoKTtcclxuICAgICAgICAgICAgaWYodGltZVRlbXAgPT0gMSB8fCB0aW1lVGVtcCA9PSAwKXtcclxuICAgICAgICAgICAgICAgIHRpbWluZyA9IFwiMSDRh9Cw0YEg0L3QsNC30LDQtFwiO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZih0aW1lVGVtcCA+IDEgJiYgdGltZVRlbXAgPCA1KXtcclxuICAgICAgICAgICAgICAgIHRpbWluZyA9IHRpbWVUZW1wICsgXCIg0YfQsNGB0LAg0L3QsNC30LDQtFwiO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRpbWluZyA9IHRpbWVUZW1wICsgXCIg0YfQsNGB0L7QsiDQvdCw0LfQsNC0XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZSBpZih0aW1pbmcgPCB0aHJlZURheXMpe1xyXG4gICAgICAgICAgICB0aW1pbmcgPSBuZXcgRGF0ZSh0aW1pbmcpO1xyXG4gICAgICAgICAgICB0aW1lVGVtcCA9IHRpbWluZy5nZXREYXRlKCk7XHJcbiAgICAgICAgICAgIGlmKHRpbWVUZW1wID09IDEpe1xyXG4gICAgICAgICAgICAgICAgdGltaW5nID0gdGltZVRlbXArXCIg0LTQtdC90Ywg0L3QsNC30LDQtFwiO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRpbWluZyA9IHRpbWVUZW1wK1wiINC00L3QtdC5INC90LDQt9Cw0LRcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aW1lVGVtcCA9IG5ldyBEYXRlKG1lc3NhZ2VPYmpEYXRlKjEwMDApLnRvTG9jYWxlRGF0ZVN0cmluZygpO1xyXG4gICAgICAgICAgICB2YXIgYXJyID0gdGltZVRlbXAuc3BsaXQoJy4nKTtcclxuICAgICAgICAgICAgaWYoYXJyWzBdLmxlbmd0aCA9PSAxKSBhcnJbMF0gPSBcIjBcIithcnJbMF07XHJcbiAgICAgICAgICAgIGlmKGFyclsxXS5sZW5ndGggPT0gMSkgYXJyWzFdID0gXCIwXCIrYXJyWzFdO1xyXG4gICAgICAgICAgICB0aW1pbmcgPSBhcnJbMF0rXCIuXCIrYXJyWzFdK1wiLlwiK2FyclsyXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aW1pbmc7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAkKCcubmctY2xvYWsnKS5yZW1vdmVDbGFzcygnbmctY2xvYWsnKTtcclxuXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFsgJyRyb290U2NvcGUnLCckc3RhdGVQYXJhbXMnLCBuZWFyYnlTaW5nbGVDdHJsIF07IiwiXHJcbnZhciBuZWlnaGJvdXJzQ3RybCA9IGZ1bmN0aW9uKCRyb290U2NvcGUsJHN0YXRlKSB7XHJcbiAgICAgICAgJHJvb3RTY29wZS5jdXJyZW50UGFnZSA9IFwibmVpZ2hib3Vyc1wiO1xyXG4gICAgICAgICRyb290U2NvcGUuaXNUb3BTZWFyY2hTaG93ID0gZmFsc2U7XHJcbiAgICAgICAgJHJvb3RTY29wZS5sZWZ0YmFyLnRhYiA9IDA7XHJcbiAgICAgICAgJHJvb3RTY29wZS5iYXNlLnNob3dBbGxHcm91cHMoKTtcclxuICAgICAgICAkcm9vdFNjb3BlLmJhc2UuaXNGb290ZXJCb3R0b20gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgcmVzZXRQYWdlcygkcm9vdFNjb3BlLmJhc2UpO1xyXG4gICAgICAgICRyb290U2NvcGUuYmFzZS5tYWluQ29udGVudFRvcElzSGlkZSA9IGZhbHNlO1xyXG4gICAgICAgICRyb290U2NvcGUuYmFzZS5uZWlnaGJvdXJzSXNBY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgICAgICByZXNldEFjZU5hdkJ0bnMoJHJvb3RTY29wZS5uYXZiYXIpO1xyXG4gICAgICAgICRyb290U2NvcGUubmF2YmFyLm5laWdoYm91cnNCdG5TdGF0dXMgPSBcImFjdGl2ZVwiO1xyXG4gICAgICAgICRyb290U2NvcGUuYmFzZS5wYWdlVGl0bGUgPSBcIlwiO1xyXG5cclxuICAgICAgICAkcm9vdFNjb3BlLmN1cnJlbnRHcm91cCA9IHVzZXJDbGllbnRHcm91cHNbM107XHJcblxyXG4gICAgICAgICRyb290U2NvcGUuYmFzZS5uZWlnaGJvdXJzTG9hZFN0YXR1cyA9IFwiaXNMb2FkZWRcIjtcclxuXHJcbiAgICAgICAgdmFyIG5laWdoYm91cnMgPSB0aGlzO1xyXG4gICAgICAgIG5laWdoYm91cnMubmVpZ2hib29ycyA9IHVzZXJDbGllbnQuZ2V0TmVpZ2hib3Vyc0J5R3JvdXAoJHJvb3RTY29wZS5jdXJyZW50R3JvdXAuaWQpO1xyXG5cclxuICAgICAgICAkcm9vdFNjb3BlLm5laWdoYm91cnNDaGFuZ2VHcm91cCA9IGZ1bmN0aW9uKGdyb3VwSWQpe1xyXG4gICAgICAgICAgICBuZWlnaGJvdXJzLm5laWdoYm9vcnMgPSB1c2VyQ2xpZW50LmdldE5laWdoYm91cnNCeUdyb3VwKGdyb3VwSWQpO1xyXG4gICAgICAgICAgICBpbml0QXV0b0ZpbGwoKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBuZWlnaGJvdXJzLm5laWdoYm9vcnNTaXplID0gbmVpZ2hib3Vycy5uZWlnaGJvb3JzLmxlbmd0aDtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaW5pdEF1dG9GaWxsKCl7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gW10sXHJcbiAgICAgICAgICAgICAgICBuZWlnaGJvdXJzTGVuZ3RoID0gbmVpZ2hib3Vycy5uZWlnaGJvb3JzLmxlbmd0aDtcclxuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IG5laWdoYm91cnNMZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBkYXRhW2ldID0ge307XHJcbiAgICAgICAgICAgICAgICBkYXRhW2ldLmxhYmVsID0gbmVpZ2hib3Vycy5uZWlnaGJvb3JzW2ldLmZpcnN0TmFtZStcIiBcIituZWlnaGJvdXJzLm5laWdoYm9vcnNbaV0ubGFzdE5hbWU7XHJcbiAgICAgICAgICAgICAgICBkYXRhW2ldLnZhbHVlID0gbmVpZ2hib3Vycy5uZWlnaGJvb3JzW2ldLmlkO1xyXG4gICAgICAgICAgICAgICAgZGF0YVtpXS5jYXRlZ29yeSA9IFwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJChcIiNzZWFyY2gtbmVpZ2hib3Vyc1wiICkuY2F0Y29tcGxldGUoe1xyXG4gICAgICAgICAgICAgICAgZGVsYXk6IDAsXHJcbiAgICAgICAgICAgICAgICBzb3VyY2U6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICBzZWxlY3Q6IGZ1bmN0aW9uKGV2ZW50LHVpKXtcclxuICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ3Byb2ZpbGUnLHsgJ3VzZXJJZCcgOiB1aS5pdGVtLnZhbHVlfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaW5pdEF1dG9GaWxsKCk7XHJcblxyXG4gICAgICAgICQoJy5uZy1jbG9haycpLnJlbW92ZUNsYXNzKCduZy1jbG9haycpO1xyXG5cclxuICAgIH07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFsgJyRyb290U2NvcGUnLCckc3RhdGUnLCBuZWlnaGJvdXJzQ3RybCBdOyIsIlxyXG52YXIgcHJvZmlsZUN0cmwgPSBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc3RhdGVQYXJhbXMpIHtcclxuXHJcbiAgICAgICAgJHJvb3RTY29wZS5pc1RvcFNlYXJjaFNob3cgPSBmYWxzZTtcclxuICAgICAgICAkcm9vdFNjb3BlLmxlZnRiYXIudGFiID0gMDtcclxuXHJcbiAgICAgICAgcmVzZXRQYWdlcygkcm9vdFNjb3BlLmJhc2UpO1xyXG4gICAgICAgICRyb290U2NvcGUuYmFzZS5wcm9maWxlSXNBY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICRyb290U2NvcGUuYmFzZS5pc0Zvb3RlckJvdHRvbSA9IHRydWU7XHJcblxyXG4gICAgICAgIHJlc2V0QWNlTmF2QnRucygkcm9vdFNjb3BlLm5hdmJhcik7XHJcbiAgICAgICAgJHJvb3RTY29wZS5iYXNlLm1haW5Db250ZW50VG9wSXNIaWRlID0gdHJ1ZTtcclxuICAgICAgICAkcm9vdFNjb3BlLmJhc2UucHJvZmlsZUxvYWRTdGF0dXMgPSBcImlzTG9hZGVkXCI7XHJcblxyXG4gICAgICAgIHZhciBwcm9maWxlID0gdGhpcywgdXNlcklkO1xyXG4gICAgICAgIHByb2ZpbGUuaXNNYXlFZGl0ID0gZmFsc2U7XHJcblxyXG4gICAgICAgICQoXCIjZGlhbG9nLW1lc3NhZ2VcIikuYWRkQ2xhc3MoJ2hpZGUnKTtcclxuXHJcbiAgICAgICAgaWYgKCRzdGF0ZVBhcmFtcy51c2VySWQgJiYgJHN0YXRlUGFyYW1zLnVzZXJJZCAhPSAwICYmICRzdGF0ZVBhcmFtcy51c2VySWQgIT0gc2hvcnRVc2VySW5mby5pZCl7XHJcbiAgICAgICAgICAgIHVzZXJJZCA9ICRzdGF0ZVBhcmFtcy51c2VySWQ7XHJcbiAgICAgICAgICAgIC8vcHJvZmlsZS51c2VyQ29udGFjdHMgPSB1c2VyQ2xpZW50LmdldFVzZXJDb250YWN0c0V4dCh1c2VySWQpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB1c2VySWQgPSAwO1xyXG4gICAgICAgICAgICBwcm9maWxlLmlzTWF5RWRpdCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGxvY2F0aW9uID0gdXNlckNsaWVudC5nZXRHcm91cFZpZXcoJHJvb3RTY29wZS5ncm91cHNbMF0uaWQpO1xyXG5cclxuICAgICAgICAgICAgICAgIHByb2ZpbGUubWFwID0ge307XHJcbiAgICAgICAgICAgICAgICBwcm9maWxlLm1hcC56b29tID0gMTc7XHJcbiAgICAgICAgICAgICAgICBwcm9maWxlLm1hcC5jZW50ZXIgPSBbbG9jYXRpb24ubG9uZ2l0dWRlLCBsb2NhdGlvbi5sYXRpdHVkZV07XHJcblxyXG4gICAgICAgICAgICAgICAgcHJvZmlsZS5tYXAuYmFsb29uID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vINCT0LXQvtC80LXRgtGA0LjRjyA9INGC0LjQvyDQvtCx0YrQtdC60YLQsCArINCz0LXQvtCz0YDQsNGE0LjRh9C10YHQutC40LUg0LrQvtC+0YDQtNC40L3QsNGC0Ysg0L7QsdGK0LXQutGC0LBcclxuICAgICAgICAgICAgICAgICAgICBnZW9tZXRyeToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDQotC40L8g0LPQtdC+0LzQtdGC0YDQuNC4IC0g0YLQvtGH0LrQsFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnUG9pbnQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDQmtC+0L7RgNC00LjQvdCw0YLRiyDRgtC+0YfQutC4LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb29yZGluYXRlczogcHJvZmlsZS5tYXAuY2VudGVyXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAvLyDQodCy0L7QudGB0YLQstCwXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoaW50Q29udGVudDogXCLQryDQt9C00LXRgdGMXCJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9Y2F0Y2goZXJyKXtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL3Byb2ZpbGUubWFwID0gdXNlckNsaWVudC5nZXRHcm91cE1hcCgkcm9vdFNjb3BlLmdyb3Vwc1swXS5pZCwgTUFQX0NPTE9SKTtcclxuICAgICAgICAgICAgLy9wcm9maWxlLnVzZXJDb250YWN0cyA9IHVzZXJDbGllbnQuZ2V0VXNlckNvbnRhY3RzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm9maWxlLnVzZXJQcm9maWxlID0gdXNlckNsaWVudC5nZXRVc2VyUHJvZmlsZSh1c2VySWQpO1xyXG5cclxuICAgICAgICB2YXIgaXNFbXB0eUNvbnRhY3RzID0gZmFsc2UsXHJcbiAgICAgICAgICAgIGlzRW1wdHlGYW1pbHkgPSBmYWxzZSxcclxuICAgICAgICAgICAgaXNFbXB0eUludGVyZXN0cyA9IGZhbHNlLFxyXG4gICAgICAgICAgICBpc0VtcHR5Tm90aWZpY2F0aW9ucyA9IGZhbHNlLFxyXG4gICAgICAgICAgICBpc0VtcHR5VXNlckluZm8gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgaWYoIXByb2ZpbGUudXNlclByb2ZpbGUudXNlckluZm8gfHwgIXByb2ZpbGUudXNlclByb2ZpbGUudXNlckluZm8uYmlydGhkYXkpIGlzRW1wdHlVc2VySW5mbyA9IHRydWU7XHJcblxyXG4gICAgICAgIGlmKCFwcm9maWxlLnVzZXJQcm9maWxlLmNvbnRhY3RzIHx8ICghcHJvZmlsZS51c2VyUHJvZmlsZS5jb250YWN0cy5ob21lQWRkcmVzcyAmJiAhcHJvZmlsZS51c2VyUHJvZmlsZS5jb250YWN0cy5tb2JpbGVQaG9uZSAmJlxyXG4gICAgICAgICAgICAhcHJvZmlsZS51c2VyUHJvZmlsZS5jb250YWN0cy5lbWFpbCkpIGlzRW1wdHlDb250YWN0cyA9IHRydWU7XHJcblxyXG4gICAgICAgIGlmKCFwcm9maWxlLnVzZXJQcm9maWxlLmZhbWlseSB8fCAoIXByb2ZpbGUudXNlclByb2ZpbGUuZmFtaWx5LnJlbGF0aW9uc1xyXG4gICAgICAgICAgICAmJiAhcHJvZmlsZS51c2VyUHJvZmlsZS5mYW1pbHkuY2hpbGRzICYmICFwcm9maWxlLnVzZXJQcm9maWxlLmZhbWlseS5wZXRzKSkgaXNFbXB0eUZhbWlseSA9IHRydWU7XHJcblxyXG4gICAgICAgIGlmKCFwcm9maWxlLnVzZXJQcm9maWxlLmludGVyZXN0cyB8fCAoIXByb2ZpbGUudXNlclByb2ZpbGUuaW50ZXJlc3RzLnVzZXJJbnRlcmVzdHMgJiYgIXByb2ZpbGUudXNlclByb2ZpbGUuaW50ZXJlc3RzLmpvYikpIGlzRW1wdHlJbnRlcmVzdHMgPSB0cnVlO1xyXG5cclxuICAgICAgICBpZighcHJvZmlsZS51c2VyUHJvZmlsZS5ub3RpZmljYXRpb25zKSBpc0VtcHR5Tm90aWZpY2F0aW9ucyA9IHRydWU7XHJcblxyXG4gICAgICAgIC8vYWxlcnQoaXNFbXB0eVVzZXJJbmZvK1wiIFwiK2lzRW1wdHlDb250YWN0cytcIiBcIitpc0VtcHR5RmFtaWx5K1wiIFwiK2lzRW1wdHlJbnRlcmVzdHMrXCIgXCIraXNFbXB0eU5vdGlmaWNhdGlvbnMpO1xyXG4gICAgICAgIGlmKGlzRW1wdHlVc2VySW5mbyAmJiBpc0VtcHR5Q29udGFjdHMgJiYgaXNFbXB0eUZhbWlseSAmJiBpc0VtcHR5SW50ZXJlc3RzICYmIGlzRW1wdHlOb3RpZmljYXRpb25zKVxyXG4gICAgICAgICAgICBwcm9maWxlLmlzRW1wdHlQcm9maWxlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgaWYocHJvZmlsZS51c2VyUHJvZmlsZS51c2VySW5mbyl7XHJcbiAgICAgICAgICAgIGlmIChwcm9maWxlLnVzZXJQcm9maWxlLnVzZXJJbmZvLmdlbmRlciA9PSAxKXtcclxuICAgICAgICAgICAgICAgIHByb2ZpbGUudXNlclByb2ZpbGUudXNlckluZm8uZ2VuZGVyTWV0YSA9IFwi0JbQtdC90YHQutC40LlcIjtcclxuICAgICAgICAgICAgfWVsc2UgaWYocHJvZmlsZS51c2VyUHJvZmlsZS51c2VySW5mby5nZW5kZXIgPT0gMil7XHJcbiAgICAgICAgICAgICAgICBwcm9maWxlLnVzZXJQcm9maWxlLnVzZXJJbmZvLmdlbmRlck1ldGEgPSBcItCc0YPQttGB0LrQvtC5XCI7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgcHJvZmlsZS51c2VyUHJvZmlsZS51c2VySW5mby5nZW5kZXJNZXRhID0gXCJcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJHJvb3RTY29wZS5iYXNlLmF2YXRhckJ1ZmZlciA9IHByb2ZpbGUudXNlclByb2ZpbGUudXNlckluZm8uYXZhdGFyO1xyXG5cclxuICAgICAgICBpZihwcm9maWxlLnVzZXJQcm9maWxlLmZhbWlseSAmJiBwcm9maWxlLnVzZXJQcm9maWxlLmZhbWlseS5yZWxhdGlvbnMgPT0gMCl7XHJcblxyXG4gICAgICAgICAgICBpZihwcm9maWxlLnVzZXJQcm9maWxlLnVzZXJJbmZvLmdlbmRlciA9PSAxKXtcclxuICAgICAgICAgICAgICAgIHByb2ZpbGUudXNlclByb2ZpbGUuZmFtaWx5LnJlbGF0aW9uc01ldGEgPSBcItCX0LDQvNGD0LbQtdC8XCI7XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKHByb2ZpbGUudXNlclByb2ZpbGUudXNlckluZm8uZ2VuZGVyID09IDIpe1xyXG4gICAgICAgICAgICAgICAgcHJvZmlsZS51c2VyUHJvZmlsZS5mYW1pbHkucmVsYXRpb25zTWV0YSA9IFwi0JbQtdC90LDRglwiO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1lbHNlIGlmKHByb2ZpbGUudXNlclByb2ZpbGUuZmFtaWx5ICYmIHByb2ZpbGUudXNlclByb2ZpbGUuZmFtaWx5LnJlbGF0aW9ucyA9PSAxKXtcclxuICAgICAgICAgICAgaWYocHJvZmlsZS51c2VyUHJvZmlsZS51c2VySW5mby5nZW5kZXIgPT0gMSl7XHJcbiAgICAgICAgICAgICAgICBwcm9maWxlLnVzZXJQcm9maWxlLmZhbWlseS5yZWxhdGlvbnNNZXRhID0gXCLQndC1INC30LDQvNGD0LbQtdC8XCI7XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKHByb2ZpbGUudXNlclByb2ZpbGUudXNlckluZm8uZ2VuZGVyID09IDIpe1xyXG4gICAgICAgICAgICAgICAgcHJvZmlsZS51c2VyUHJvZmlsZS5mYW1pbHkucmVsYXRpb25zTWV0YSA9IFwi0KXQvtC70L7RgdGCXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHByb2ZpbGUudXNlclByb2ZpbGUuZmFtaWx5ICYmIHByb2ZpbGUudXNlclByb2ZpbGUuZmFtaWx5LnBldHMgJiYgcHJvZmlsZS51c2VyUHJvZmlsZS5mYW1pbHkucGV0cy5sZW5ndGggIT0gMCl7XHJcbiAgICAgICAgICAgdmFyIHBldHNMZW5ndGggPSBwcm9maWxlLnVzZXJQcm9maWxlLmZhbWlseS5wZXRzLmxlbmd0aDtcclxuICAgICAgICAgICAgdmFyIHBldHMgPSBwcm9maWxlLnVzZXJQcm9maWxlLmZhbWlseS5wZXRzO1xyXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgcGV0c0xlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIHN3aXRjaChwcm9maWxlLnVzZXJQcm9maWxlLmZhbWlseS5wZXRzW2ldLnR5cGUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvZmlsZS51c2VyUHJvZmlsZS5mYW1pbHkucGV0c1tpXS50eXBlTWV0YSA9IFwi0JrQvtGI0LrQsFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2ZpbGUudXNlclByb2ZpbGUuZmFtaWx5LnBldHNbaV0udHlwZU1ldGEgPSBcItCh0L7QsdCw0LrQsFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2ZpbGUudXNlclByb2ZpbGUuZmFtaWx5LnBldHNbaV0udHlwZU1ldGEgPSBcItCf0YLQuNGH0LrQsFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vJHJvb3RTY29wZS5jaGFnZUluZGV4ID0gMDtcclxuXHJcbiAgICAgICAgYW5ndWxhci5lbGVtZW50KCQoJy5wcm9maWxlJykpLmNzcyh7J21pbi1oZWlnaHQnOiAkKHdpbmRvdykuaGVpZ2h0KCktMTM1fSk7XHJcblxyXG4gICAgICAgICQoJy5uZy1jbG9haycpLnJlbW92ZUNsYXNzKCduZy1jbG9haycpO1xyXG5cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gWyAnJHJvb3RTY29wZScsJyRzdGF0ZVBhcmFtcycsIHByb2ZpbGVDdHJsIF07IiwiXHJcbnZhciBydWJyaWNzQ3RybCA9IGZ1bmN0aW9uKCRyb290U2NvcGUsJHN0YXRlUGFyYW1zKSB7XHJcbiAgICAgICAgLypcclxuICAgICAgICAqINC/0YDQuCDRgNCw0LHQvtGC0LUg0YEg0L7QsdGB0LbQtNC10L3QuNGP0LzQuCDQvdGD0LbQvdC+INGD0YfQtdGB0YLRjCDRgdC70LXQtNGD0Y7RidC10LU6XHJcbiAgICAgICAgKiDQtdGB0YLRjCDRgtGA0Lgg0YLQuNC/0LAg0YHQvtC+0LHRidC10L3QuNGPIDpcclxuICAgICAgICAqIDEpINGC0L7Qv9C40LouINCd0LAg0YHRgtGA0LDQvdC40YbQtSDQvtCx0YHRg9C20LTQtdC90LjRjyDQvNC+0LbQtdGCINCx0YvRgtGMINGC0L7Qu9GM0LrQviDQvtC00LjQvS4g0JXQs9C+INC00LXRgtC4XHJcbiAgICAgICAgKiDRjdGC0L4g0YHQvtC+0LHRidC10L3QuNGPINC/0LXRgNCy0L7Qs9C+INGD0YDQvtCy0L3Rjy4g0JXQs9C+INC00LXRgtC4INCy0YHQtdCz0LTQsCDQvtGC0LrRgNGL0YLRiywg0L/QvtGN0YLQvtC80YMg0YMg0L3QtdCz0L5cclxuICAgICAgICAqINC90LXRgiDQutC+0L3RgtGA0L7Qu9CwINC/0LvRjtGBLdC80LjQvdGD0YEuINCh0YLRgNCw0L3QuNGG0LAg0YLQvtC/0LjQutCwINC30LDQs9GA0YPQttCw0LXRgtGB0Y8g0LIg0LzQtdGC0L7QtNC1IHNob3dGdWxsVGFsa1xyXG4gICAgICAgICog0YfQtdGA0LXQtyB0b3BpY0lkINC60L7RgtC+0YDRi9C5INC/0LXRgNC10LTQsNC10YLRgdGPINCyINGE0YPQvdC60YbQuNGOINC/0YDQuCDQstGL0LfQvtCy0LVcclxuICAgICAgICAqINCl0YDQsNC90LjRgtGB0Y8g0LIg0L7QsdGK0LXQutGC0LUgdGFsay5mdWxsVGFsa1RvcGljLlxyXG4gICAgICAgICpcclxuICAgICAgICAqIDIpINCh0L7QvtCx0YnQtdC90LjQtSDQv9C10YDQstC+0LPQviDRg9GA0L7QstC90Y8uINCR0LXRgNGD0YLRgdGPINGH0LXRgNC10LcgZ2V0Rmlyc3RMZXZlbE1lc3NhZ2VzLiDQmNC30L3QsNGH0LDQu9GM0L3QvlxyXG4gICAgICAgICog0LLRgdC1INC/0L7RgtC+0LzQutC4INGB0LrRgNGL0YLRiyDQuCDQvdC1INC/0L7QtNCz0YDRg9C20LXQvdGLLiDQn9GA0Lgg0L/QtdGA0LLQvtC8INC90LDQttCw0YLQuNC4INC90LAg0LrQvtC90YLRgNC+0Lsg0L/Qu9GO0YEt0LzQuNC90YPRgVxyXG4gICAgICAgICog0L/QvtC00LPRgNGD0LbQsNGO0YLRgdGPLCDQv9C+0YLQvtC8INC/0YDQvtGB0YLQviDQv9C10YDQtdC60LvRjtGH0LDQtdGC0YHRjyBzaG93LWhpZGUuIFBhcmVudElkINGDINGC0LDQutC40YUg0YHQvtC+0LHRidC10L3QuNC5XHJcbiAgICAgICAgKiDRgNCw0LLQtdC9IDAuINCS0L3QuNC80LDQvdC40LUhIDogUGFyZW50SWQg0L/QtdGA0LXQtNCw0LXRgtGB0Y8g0LIgZ2V0Rmlyc3RMZXZlbE1lc3NhZ2VzINGH0LXRgNC10LcgbGFzdExvYWRlZElkLiAgICAgICAgKlxyXG4gICAgICAgICog0KMg0LrQsNC20LTQvtCz0L4g0YHQvtC+0LHRidC10L3QuNGPINC/0LXRgNCy0L7Qs9C+INGD0YDQvtCy0L3RjyDQtdGB0YLRjCDRgdCy0L7QuSDQvNCw0YHRgdC40LIg0YHQvtC+0LHRidC10L3QuNC5IDPQs9C+INGC0LjQv9CwLlxyXG4gICAgICAgICog0KXRgNCw0L3Rj9GC0YHRjyDQsiDQvNCw0YHRgdC40LLQtSB0YWxrLmZ1bGxUYWxrRmlyc3RNZXNzYWdlcy5cclxuICAgICAgICAqXHJcbiAgICAgICAgKiAzKSDQn9GA0L7RgdGC0L4g0YHQvtC+0LHRidC10L3QuNC1LiDQkdC10YDQtdGD0YLRgdGPINGH0LXRgNC10LcgZ2V0TWVzc2FnZXMoKS4g0KfQtdGA0LXQtyDQv9Cw0YDQsNC80LXRgtGAIGxhc3RMb2FkZWRJZCDQv9C10YDQtdC00LDQtdGC0YHRj1xyXG4gICAgICAgICogaWQg0L/QvtGB0LvQtdC00L3QtdCz0L4g0LfQsNCz0YDRg9C20LXQvdC90L7Qs9C+INC/0YDQvtGB0YLQvtCz0L4g0YHQvtC+0LHRidC10L3QuNGPLCDQtNC70Y8g0L/QvtC00LPRgNGD0LfQutC4LiDQoyDQutCw0LbQtNC+0LPQviDQv9GA0L7RgdGC0L7Qs9C+INGB0L7QvtCx0YnQtdC90LjRj1xyXG4gICAgICAgICog0LXRgdGC0Ywgb2Zmc2V0LCDQutC+0YLQvtGA0YvQuSDQt9Cw0LTQsNC10YLRgdGPINC90LAg0JHQlS4gb2Zmc2V0J9GLINC+0L/RgNC10LTQtdC70Y/RjtGCINCy0LvQvtC20LXQvdC90L7RgdGC0Ywg0YHQvtC+0LHRidC10L3QuNC5INC4INC30LAg0YHRh9C10YIg0L3QuNGFXHJcbiAgICAgICAgKiDRgdC+0LfQtNCw0LXRgtGB0Y8g0LTRgNC10LLQvtCy0LjQtNC90LDRjyDRgdGC0YDRg9C60YLRg9GA0LAg0YTQvtGA0YPQvNCwLlxyXG4gICAgICAgICog0KXRgNCw0L3Rj9GC0YHRjyDQsiDQtNCy0YPQvNC10YDQvdC+0Lwg0LzQsNGB0YHQuNCy0LUgdGFsay5mdWxsVGFsa01lc3NhZ2VzW2ZpcnN0TWVzc2FnZS5pZF1bXVxyXG4gICAgICAgICpcclxuICAgICAgICAqXHJcbiAgICAgICAgKiDQldGB0YLRjCDRgdC70LXQtNGD0Y7RidC40LUg0YLQuNC/0Ysg0LrQvtC90YLRgNC+0LvQvtCyLCDRgNC10LDQu9C40LfQvtCy0LDQvdC90YvQtSDQtNC70Y8g0YDQsNC30L3Ri9GFINGC0LjQv9C+0LIg0YHQvtC+0LHRidC10L3QuNC5OlxyXG4gICAgICAgICogMSkgc2hvd0Fuc3dlcklucHV0IDog0YDQtdCw0LvQuNC30YPQtdGCINC60LvQuNC6INC90LAgXCLQntGC0LLQtdGC0LjRgtGMXCIsINC/0L7QutCw0LfQstCw0LXRgiDQv9C+0LvQtSDQtNC70Y8g0L7RgtC/0YDQsNCy0LrQuFxyXG4gICAgICAgICog0YHQvtC+0LHRidC10L3QuNGPLlxyXG4gICAgICAgICogMikgYWRkTWVzc2FnZTog0LrQu9C40Log0L3QsCBcItCe0YLQv9GA0LDQstC40YLRjFwiLCDRgdC+0LfQtNCw0LXRgiDQuCDQvtGC0L7QsdGA0LDQttCw0LXRgiDQvdC+0LLQvtC1INGB0L7QvtCx0YnQtdC90LjQtVxyXG4gICAgICAgICogMykgdG9nZ2xlVHJlZTog0LrQvtC90YLRgNC+0LsgXCLQv9C70Y7RgS3QvNC40L3Rg9GBXCIsINGB0LrRgNCy0LDQtdGCLdC/0L7QutCw0LfQstCw0LXRgiDQstC90YPRgtGA0LXQvdC90LjQtSDRgdC+0L7QsdGJ0LXQvdC40Y8g0Y3RgtC+0LPQvlxyXG4gICAgICAgICog0YHQvtC+0LHRidC10L3QuNGPLlxyXG4gICAgICAgICogKi9cclxuICAgICAgICAgICAgJHJvb3RTY29wZS5zZXRUYWIoMik7XHJcbiAgICAgICAgICAgIHZhciB0YWxrID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRhbGsuYXR0YWNoSWQgPSBcIjAwXCI7XHJcbiAgICAgICAgICAgIGluaXRGYW5jeUJveCgkKCcudGFsa3MnKSk7XHJcblxyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLmJhc2Uuc2hvd0FsbEdyb3VwcygpO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLmJhc2UuaXNGb290ZXJCb3R0b20gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICRyb290U2NvcGUuYmFzZS5jcmVhdGVUb3BpY0lzSGlkZSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICB0YWxrLmlzVGFsa3NMb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGFsay5ncm91cHMgPSB1c2VyQ2xpZW50R3JvdXBzO1xyXG5cclxuICAgICAgICAgICAgdGFsay5tZXNzYWdlID0ge307XHJcbiAgICAgICAgICAgIHRhbGsubWVzc2FnZS5jb250ZW50ID0gdGFsay5tZXNzYWdlLmRlZmF1bHQgPSBURVhUX0RFRkFVTFRfMztcclxuICAgICAgICAgICAgdGFsay5zdWJqZWN0ID0gVEVYVF9ERUZBVUxUXzQ7XHJcblxyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLmJhc2UuYnVmZmVyU2VsZWN0ZWRHcm91cCA9IHRhbGsuc2VsZWN0ZWRHcm91cCA9XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuY3VycmVudEdyb3VwID0gdXNlckNsaWVudEdyb3Vwc1szXTtcclxuXHJcbiAgICAgICAgICAgICRyb290U2NvcGUuYmFzZS5pbml0U3RhcnRQYXJhbXNGb3JDcmVhdGVUb3BpYyh0YWxrKTtcclxuXHJcbiAgICAgICAgICAgIHRhbGsuaXNUYWxrID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIHRhbGsuZnVsbFRhbGtUb3BpYyA9IHt9O1xyXG4gICAgICAgICAgICB0YWxrLmZ1bGxUYWxrVG9waWMuYW5zd2VySW5wdXRJc1Nob3cgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGFsay5mdWxsVGFsa01lc3NhZ2VzID0gW107XHJcbiAgICAgICAgICAgIHRhbGsuZnVsbFRhbGtGaXJzdE1lc3NhZ2VzID0gW107XHJcblxyXG4gICAgICAgICAgICB0YWxrLmNvbW1lbnRUZXh0ID0gVEVYVF9ERUZBVUxUXzI7XHJcbiAgICAgICAgICAgIHZhciBmdWxsVGFsa0ZpcnN0TWVzc2FnZXNMZW5ndGgsXHJcbiAgICAgICAgICAgICAgICB0YWxrSWQ7XHJcblxyXG4gICAgICAgICAgICAvKmlmKCEkcm9vdFNjb3BlLmltcG9ydGFudElzTG9hZGVkRnJvbVRvcClcclxuICAgICAgICAgICAgJHJvb3RTY29wZS5pbXBvcnRhbnRUb3BpY3MgPSBtZXNzYWdlQ2xpZW50LmdldEltcG9ydGFudE5ld3MoJHJvb3RTY29wZS5jdXJyZW50R3JvdXAuaWQpO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLmltcG9ydGFudElzTG9hZGVkRnJvbVRvcCA9IGZhbHNlOyovXHJcblxyXG4gICAgICAgICAgICB0YWxrLnRvcGljcyA9IG1lc3NhZ2VDbGllbnQuZ2V0VG9waWNzKHRhbGsuc2VsZWN0ZWRHcm91cC5pZCwgJHN0YXRlUGFyYW1zLnJ1YnJpY0lkLCAwLCAwLCAxMDAwKS50b3BpY3M7XHJcblxyXG4gICAgICAgICAgICBpbml0VGFsa3MoKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghdGFsay50b3BpY3MpIHRhbGsudG9waWNzID0gW107XHJcblxyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLnNlbGVjdEdyb3VwSW5Ecm9wZG93bl90YWxrcyA9IGZ1bmN0aW9uKGdyb3VwSWQpe1xyXG4gICAgICAgICAgICAgICAgdGFsay5zZWxlY3RlZEdyb3VwID0gJHJvb3RTY29wZS5iYXNlLmJ1ZmZlclNlbGVjdGVkR3JvdXAgPSBzZWxlY3RHcm91cEluRHJvcGRvd24oZ3JvdXBJZCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGluaXRUYWxrcygpe1xyXG4gICAgICAgICAgICB2YXIgdG9waWNMZW5ndGg7XHJcbiAgICAgICAgICAgIHRhbGsudG9waWNzID8gdG9waWNMZW5ndGggPSB0YWxrLnRvcGljcy5sZW5ndGggOiB0b3BpY0xlbmd0aCA9IDA7XHJcblxyXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdG9waWNMZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgICAgIHRhbGsudG9waWNzW2ldLmxhc3RVcGRhdGVFZGl0ID0gZ2V0VGltaW5nKHRhbGsudG9waWNzW2ldLmxhc3RVcGRhdGUpO1xyXG4gICAgICAgICAgICAgICAgdGFsay50b3BpY3NbaV0ubGFiZWwgPSBnZXRMYWJlbCh0YWxrLmdyb3Vwcyx0YWxrLnRvcGljc1tpXS5ncm91cFR5cGUpO1xyXG4gICAgICAgICAgICAgICAgdGFsay50b3BpY3NbaV0udGFnQ29sb3IgPSBnZXRUYWdDb2xvcih0YWxrLnRvcGljc1tpXS5sYWJlbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYodGFsay50b3BpY3NbaV0ubWVzc2FnZS5pbXBvcnRhbnQgPT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFsay50b3BpY3NbaV0ubWVzc2FnZS5pbXBvcnRhbnRUZXh0ID0gJ9Ch0L3Rj9GC0Ywg0LzQtdGC0LrRgyBcItCS0LDQttC90L7QtVwiJztcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHRhbGsudG9waWNzW2ldLm1lc3NhZ2UuaW1wb3J0YW50VGV4dCA9ICfQn9C+0LzQtdGC0LjRgtGMINC60LDQuiBcItCS0LDQttC90L7QtVwiJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJHJvb3RTY29wZS50YWxrc0NoYW5nZUdyb3VwID0gZnVuY3Rpb24oZ3JvdXBJZCl7XHJcblxyXG4gICAgICAgICAgICB0YWxrLnRvcGljcyA9IG1lc3NhZ2VDbGllbnQuZ2V0VG9waWNzKGdyb3VwSWQsMCwwLDAsMTAwMCkudG9waWNzO1xyXG5cclxuICAgICAgICAgICAgaWYodGFsay50b3BpY3MpIHtcclxuICAgICAgICAgICAgICAgIGluaXRUYWxrcygpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICQoJy5uZy1jbG9haycpLnJlbW92ZUNsYXNzKCduZy1jbG9haycpO1xyXG5cclxuICAgIH07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFsgJyRyb290U2NvcGUnLCckc3RhdGVQYXJhbXMnLCBydWJyaWNzQ3RybCBdOyIsIlxyXG52YXIgcnVicmljc1NpbmdsZUN0cmwgPSBmdW5jdGlvbigkcm9vdFNjb3BlLCRzdGF0ZVBhcmFtcyl7XHJcblxyXG4gICAgICAgICRyb290U2NvcGUuYmFzZS5pc0Zvb3RlckJvdHRvbSA9IGZhbHNlO1xyXG5cclxuICAgICAgICB2YXIgdGFsayA9IHRoaXMsXHJcbiAgICAgICAgICAgIGZ1bGxUYWxrTWVzc2FnZXNMZW5ndGgsXHJcbiAgICAgICAgICAgIHRhbGtJZCA9ICRzdGF0ZVBhcmFtcy50YWxrSWQ7XHJcblxyXG4gICAgICAgICRyb290U2NvcGUuYmFzZS5sYXN0TG9hZGVkSWQgPSAwO1xyXG4gICAgICAgICRyb290U2NvcGUuYmFzZS5pc0VhcmxpZXN0TWVzc2FnZXMgPSBmYWxzZTtcclxuICAgICAgICAkcm9vdFNjb3BlLmJhc2UuZW5kT2ZMb2FkZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdGFsay5hdHRhY2hJZCA9IFwiMDBcIjtcclxuICAgICAgICB0YWxrLnNlbGVjdGVkR3JvdXAgPSAkcm9vdFNjb3BlLmN1cnJlbnRHcm91cDtcclxuXHJcbiAgICAgICAgLyppZighJHJvb3RTY29wZS5pbXBvcnRhbnRJc0xvYWRlZEZyb21Ub3ApXHJcbiAgICAgICAgICAgICRyb290U2NvcGUuaW1wb3J0YW50VG9waWNzID0gbWVzc2FnZUNsaWVudC5nZXRJbXBvcnRhbnROZXdzKCRyb290U2NvcGUuY3VycmVudEdyb3VwLmlkKTtcclxuICAgICAgICAkcm9vdFNjb3BlLmltcG9ydGFudElzTG9hZGVkRnJvbVRvcCA9IGZhbHNlOyovXHJcblxyXG4gICAgICAgIHRhbGsudG9waWNzID0gbWVzc2FnZUNsaWVudC5nZXRUb3BpY3ModGFsay5zZWxlY3RlZEdyb3VwLmlkLCAwLCAwLCAwLCAxMDAwKS50b3BpY3M7XHJcbiAgICAgICAgdGFsay5mdWxsVGFsa1RvcGljID0ge307XHJcbiAgICAgICAgdGFsay5mdWxsVGFsa01lc3NhZ2VzID0ge307XHJcbiAgICAgICAgdGFsay5mdWxsVGFsa0ZpcnN0TWVzc2FnZXMgPSBbXTtcclxuICAgICAgICB0YWxrLmdyb3VwcyA9IHVzZXJDbGllbnRHcm91cHM7XHJcblxyXG4gICAgICAgIHRhbGsuaXNUYWxrID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgJHJvb3RTY29wZS5iYXNlLmluaXRTdGFydFBhcmFtc0ZvckNyZWF0ZU1lc3NhZ2UodGFsayk7XHJcblxyXG4gICAgICAgIHZhciBzaG93RnVsbFRhbGsgPSBmdW5jdGlvbih0YWxrLHRhbGtPdXRzaWRlSWQpe1xyXG5cclxuICAgICAgICAgICAgaW5pdEZhbmN5Qm94KCQoJy50YWxrcy1zaW5nbGUnKSk7XHJcbiAgICAgICAgICAgIHZhciB0b3BpY0xlbmd0aDtcclxuICAgICAgICAgICAgdGFsay50b3BpY3MgPyB0b3BpY0xlbmd0aCA9IHRhbGsudG9waWNzLmxlbmd0aCA6IHRvcGljTGVuZ3RoID0gMDtcclxuXHJcbiAgICAgICAgICAgIHZhciB0YWxrSWQgPSB0YWxrT3V0c2lkZUlkO1xyXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdG9waWNMZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBpZih0YWxrSWQgPT0gdGFsay50b3BpY3NbaV0uaWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRhbGsuZnVsbFRhbGtUb3BpYyA9IHRhbGsudG9waWNzW2ldO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmJhc2UuaW5pdFN0YXJ0UGFyYW1zRm9yQ3JlYXRlVG9waWModGFsay5mdWxsVGFsa1RvcGljKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGFsay5mdWxsVGFsa1RvcGljLmlzVGFsayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFsay5mdWxsVGFsa1RvcGljLm1lc3NhZ2UuY3JlYXRlZEVkaXQgPSBnZXRUaW1pbmcodGFsay5mdWxsVGFsa1RvcGljLm1lc3NhZ2UuY3JlYXRlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFsay5mdWxsVGFsa1RvcGljLmxhYmVsID0gZ2V0TGFiZWwodGFsay5ncm91cHMsdGFsay5mdWxsVGFsa1RvcGljLmdyb3VwVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFsay5mdWxsVGFsa1RvcGljLnRhZ0NvbG9yID0gZ2V0VGFnQ29sb3IodGFsay5mdWxsVGFsa1RvcGljLmxhYmVsKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGFsay5mdWxsVGFsa1RvcGljLm1lc3NhZ2UuaW1wb3J0YW50ID09IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWxrLmZ1bGxUYWxrVG9waWMubWVzc2FnZS5pbXBvcnRhbnRUZXh0ID0gJ9Ch0L3Rj9GC0Ywg0LzQtdGC0LrRgyBcItCS0LDQttC90L7QtVwiJztcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFsay5mdWxsVGFsa1RvcGljLm1lc3NhZ2UuaW1wb3J0YW50VGV4dCA9ICfQn9C+0LzQtdGC0LjRgtGMINC60LDQuiBcItCS0LDQttC90L7QtVwiJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0YWxrLmZ1bGxUYWxrVG9waWMucG9sbCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRQb2xsRWRpdE5hbWVzKHRhbGsuZnVsbFRhbGtUb3BpYy5wb2xsKTtcclxuICAgICAgICAgICAgICAgIHRhbGsuZnVsbFRhbGtUb3BpYy5tZXRhVHlwZSA9IFwicG9sbFwiO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGFsay5mdWxsVGFsa1RvcGljLm1ldGFUeXBlID0gXCJtZXNzYWdlXCI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRhbGsuZnVsbFRhbGtGaXJzdE1lc3NhZ2VzID0gbWVzc2FnZUNsaWVudC5nZXRGaXJzdExldmVsTWVzc2FnZXModGFsa0lkLCB0YWxrLnNlbGVjdGVkR3JvdXAuaWQsIDEsICRyb290U2NvcGUuYmFzZS5sYXN0TG9hZGVkSWQsIDAsIDEwKS5tZXNzYWdlcztcclxuXHJcbiAgICAgICAgICAgICRyb290U2NvcGUuYmFzZS5sYXN0TG9hZGVkSWQgPSAkcm9vdFNjb3BlLmJhc2UuaW5pdEZpcnN0TWVzc2FnZXModGFsay5mdWxsVGFsa0ZpcnN0TWVzc2FnZXMpO1xyXG5cclxuICAgICAgICAgICAgJHJvb3RTY29wZS5iYXNlLmlzVGFsa1RpdGxlcyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLmJhc2UubWFpbkNvbnRlbnRUb3BJc0hpZGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLmJhc2UuY3JlYXRlVG9waWNJc0hpZGUgPSB0cnVlO1xyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBzaG93RnVsbFRhbGsodGFsayx0YWxrSWQpO1xyXG5cclxuICAgICAgICB2YXIgaW5pdEZsYWdzVG9waWMgPSBbXTtcclxuICAgICAgICB0YWxrLnNob3dUb3BpY0Fuc3dlcklucHV0ID0gZnVuY3Rpb24oZXZlbnQsZnVsbFRhbGtUb3BpYyl7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICB0YWxrLmFuc3dlclNob3cgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgaWYoIWluaXRGbGFnc1RvcGljW2Z1bGxUYWxrVG9waWMuaWRdKSB7XHJcbiAgICAgICAgICAgICAgICBpbml0RmxhZ3NUb3BpY1tmdWxsVGFsa1RvcGljLmlkXSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRhbGsuZnVsbFRhbGtUb3BpYy5hbnN3ZXJJbnB1dElzU2hvdyA/XHJcbiAgICAgICAgICAgICAgICB0YWxrLmZ1bGxUYWxrVG9waWMuYW5zd2VySW5wdXRJc1Nob3cgPSBmYWxzZSA6XHJcbiAgICAgICAgICAgICAgICB0YWxrLmZ1bGxUYWxrVG9waWMuYW5zd2VySW5wdXRJc1Nob3cgPSB0cnVlIDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB2YXIgaW5pdEZsYWdzTWVzc2FnZSA9IFtdO1xyXG4gICAgICAgIHRhbGsuc2hvd01lc3NhZ2VBbnN3ZXJJbnB1dCA9IGZ1bmN0aW9uKGV2ZW50LGZ1bGxUYWxrVG9waWMsZmlyc3RNZXNzYWdlLG1lc3NhZ2Upe1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB2YXIgYXR0YWNoSWQ7XHJcblxyXG4gICAgICAgICAgICBpZighbWVzc2FnZSl7XHJcbiAgICAgICAgICAgICAgICAvLyDQtdGB0LvQuCDRjdGC0L4g0YHQvtC+0LHRidC10L3QuNC1INC/0LXRgNCy0L7Qs9C+INGD0YDQvtCy0L3Rj1xyXG4gICAgICAgICAgICAgICAgZmlyc3RNZXNzYWdlLmlzVGFsayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAvL2ZpcnN0TWVzc2FnZS5pc0VkaXQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICBhdHRhY2hJZCA9IGZ1bGxUYWxrVG9waWMuaWQrJy0nK2ZpcnN0TWVzc2FnZS5pZDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZighdGFsay5mdWxsVGFsa0ZpcnN0TWVzc2FnZXMpIHRhbGsuZnVsbFRhbGtGaXJzdE1lc3NhZ2VzID0gbWVzc2FnZUNsaWVudC5nZXRGaXJzdExldmVsTWVzc2FnZXModGFsa0lkLHRhbGsuc2VsZWN0ZWRHcm91cC5pZCwxLDAsMCwxMDAwKS5tZXNzYWdlcztcclxuICAgICAgICAgICAgICAgIHZhciBmdWxsVGFsa0ZpcnN0TWVzc2FnZXNMZW5ndGggPSB0YWxrLmZ1bGxUYWxrRmlyc3RNZXNzYWdlcy5sZW5ndGg7XHJcblxyXG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5iYXNlLmluaXRTdGFydFBhcmFtc0ZvckNyZWF0ZU1lc3NhZ2UoZmlyc3RNZXNzYWdlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBmaXJzdE1lc3NhZ2UuYW5zd2VySW5wdXRJc1Nob3cgP1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0TWVzc2FnZS5hbnN3ZXJJbnB1dElzU2hvdyA9IGZhbHNlIDpcclxuICAgICAgICAgICAgICAgICAgICBmaXJzdE1lc3NhZ2UuYW5zd2VySW5wdXRJc1Nob3cgPSB0cnVlO1xyXG5cclxuXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgLy8g0LXRgdC70Lgg0L/RgNC+0YHRgtC+0LUg0YHQvtC+0LHRidC10L3QuNC1XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlLmlzVGFsayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAvL21lc3NhZ2UuaXNFZGl0ID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgYXR0YWNoSWQgPSBmdWxsVGFsa1RvcGljLmlkKyctJyttZXNzYWdlLmlkO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKCF0YWxrLmZ1bGxUYWxrTWVzc2FnZXNbZmlyc3RNZXNzYWdlLmlkXSkgdGFsay5mdWxsVGFsa01lc3NhZ2VzW2ZpcnN0TWVzc2FnZS5pZF0gPSBtZXNzYWdlQ2xpZW50LmdldE1lc3NhZ2VzKHRhbGtJZCx0YWxrLnNlbGVjdGVkR3JvdXAuaWQsMSxmaXJzdE1lc3NhZ2UuaWQsMCwxMDAwKS5tZXNzYWdlcztcclxuICAgICAgICAgICAgICAgIHZhciAgZnVsbFRhbGtNZXNzYWdlc0xlbmd0aCA9IHRhbGsuZnVsbFRhbGtNZXNzYWdlc1tmaXJzdE1lc3NhZ2UuaWRdLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmJhc2UuaW5pdFN0YXJ0UGFyYW1zRm9yQ3JlYXRlTWVzc2FnZShtZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UuYW5zd2VySW5wdXRJc1Nob3cgP1xyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuYW5zd2VySW5wdXRJc1Nob3cgPSBmYWxzZSA6XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5hbnN3ZXJJbnB1dElzU2hvdyA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZighaW5pdEZsYWdzTWVzc2FnZVthdHRhY2hJZF0pIHtcclxuICAgICAgICAgICAgICAgIC8vaW5pdEF0dGFjaEltYWdlKCQoJyNhdHRhY2hJbWFnZS0nICsgYXR0YWNoSWQpLCAkKCcjYXR0YWNoLWFyZWEtJyArIGF0dGFjaElkKSk7XHJcbiAgICAgICAgICAgICAgICAvL2luaXRBdHRhY2hEb2MoJCgnI2F0dGFjaERvYy0nICsgYXR0YWNoSWQpLCAkKCcjYXR0YWNoLWRvYy1hcmVhLScgKyBhdHRhY2hJZCkpO1xyXG5cclxuICAgICAgICAgICAgICAgIGluaXRGbGFnc01lc3NhZ2VbYXR0YWNoSWRdID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRhbGsudG9nZ2xlVHJlZUZpcnN0TWVzc2FnZSA9IGZ1bmN0aW9uKGV2ZW50LGZpcnN0TWVzc2FnZSl7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICBmaXJzdE1lc3NhZ2UuaXNUcmVlT3BlbiA/XHJcbiAgICAgICAgICAgICAgICBmaXJzdE1lc3NhZ2UuaXNUcmVlT3BlbiA9IGZhbHNlIDpcclxuICAgICAgICAgICAgICAgIGZpcnN0TWVzc2FnZS5pc1RyZWVPcGVuID0gdHJ1ZSA7XHJcblxyXG5cclxuICAgICAgICAgICAgLy8gLS0tLS0tLS1cclxuXHJcbiAgICAgICAgICAgIHRhbGsuZnVsbFRhbGtNZXNzYWdlc1tmaXJzdE1lc3NhZ2UuaWRdID0gbWVzc2FnZUNsaWVudC5nZXRNZXNzYWdlcyh0YWxrSWQsdGFsay5zZWxlY3RlZEdyb3VwLmlkLDEsZmlyc3RNZXNzYWdlLmlkLDAsMTAwMCkubWVzc2FnZXM7XHJcbiAgICAgICAgICAgIHRhbGsuZnVsbFRhbGtNZXNzYWdlc1tmaXJzdE1lc3NhZ2UuaWRdID9cclxuICAgICAgICAgICAgICAgIGZ1bGxUYWxrTWVzc2FnZXNMZW5ndGggPSB0YWxrLmZ1bGxUYWxrTWVzc2FnZXNbZmlyc3RNZXNzYWdlLmlkXS5sZW5ndGg6XHJcbiAgICAgICAgICAgICAgICBmdWxsVGFsa01lc3NhZ2VzTGVuZ3RoID0gMDtcclxuICAgICAgICAgICAgaWYodGFsay5mdWxsVGFsa01lc3NhZ2VzW2ZpcnN0TWVzc2FnZS5pZF0gPT09IG51bGwpIHRhbGsuZnVsbFRhbGtNZXNzYWdlc1tmaXJzdE1lc3NhZ2UuaWRdID0gW107XHJcblxyXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgZnVsbFRhbGtNZXNzYWdlc0xlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIHRhbGsuZnVsbFRhbGtNZXNzYWdlc1tmaXJzdE1lc3NhZ2UuaWRdW2ldLmFuc3dlcklucHV0SXNTaG93ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0YWxrLmZ1bGxUYWxrTWVzc2FnZXNbZmlyc3RNZXNzYWdlLmlkXVtpXS5pc1RyZWVPcGVuID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRhbGsuZnVsbFRhbGtNZXNzYWdlc1tmaXJzdE1lc3NhZ2UuaWRdW2ldLmlzT3BlbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0YWxrLmZ1bGxUYWxrTWVzc2FnZXNbZmlyc3RNZXNzYWdlLmlkXVtpXS5pc1BhcmVudE9wZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGFsay5mdWxsVGFsa01lc3NhZ2VzW2ZpcnN0TWVzc2FnZS5pZF1baV0uY3JlYXRlZEVkaXQgPSBnZXRUaW1pbmcodGFsay5mdWxsVGFsa01lc3NhZ2VzW2ZpcnN0TWVzc2FnZS5pZF1baV0uY3JlYXRlZCk7XHJcbiAgICAgICAgICAgICAgICB0YWxrLmZ1bGxUYWxrTWVzc2FnZXNbZmlyc3RNZXNzYWdlLmlkXVtpXS5jb21tZW50VGV4dCA9IFRFWFRfREVGQVVMVF8yO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0YWxrLnRvZ2dsZVRyZWUgPSBmdW5jdGlvbihldmVudCxtZXNzYWdlLGZpcnN0TWVzc2FnZSl7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICBpZighdGFsay5mdWxsVGFsa01lc3NhZ2VzW2ZpcnN0TWVzc2FnZS5pZF0pIHRhbGsuZnVsbFRhbGtNZXNzYWdlc1tmaXJzdE1lc3NhZ2UuaWRdID0gbWVzc2FnZUNsaWVudC5nZXRNZXNzYWdlcyh0YWxrSWQsdGFsay5zZWxlY3RlZEdyb3VwLmlkLDEsZmlyc3RNZXNzYWdlLmlkLDAsMTAwMCkubWVzc2FnZXM7XHJcbiAgICAgICAgICAgIHZhciBmdWxsVGFsa01lc3NhZ2VzTGVuZ3RoID0gdGFsay5mdWxsVGFsa01lc3NhZ2VzW2ZpcnN0TWVzc2FnZS5pZF0ubGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgbWVzc2FnZS5pc1RyZWVPcGVuID9cclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UuaXNUcmVlT3BlbiA9IGZhbHNlIDpcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UuaXNUcmVlT3BlbiA9IHRydWUgO1xyXG5cclxuICAgICAgICAgICAgdmFyIGFmdGVyQ3VycmVudEluZGV4ID0gZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBuZXh0TWVzc2FnZU9uQ3VycmVudExldmVsID0gZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBsb29wTWVzc2FnZU9mZnNldCxcclxuICAgICAgICAgICAgICAgIHBhcmVudE9wZW5TdGF0dXMsXHJcbiAgICAgICAgICAgICAgICBhcmVBbGxNeVBhcmVudHNUcmVlT3BlbiA9IFtdLFxyXG4gICAgICAgICAgICAgICAgY2hlY2tBcmVBbGxNeVBhcmVudHNUcmVlT3BlbiA9IHRydWUsXHJcbiAgICAgICAgICAgICAgICBiZWdpbk9mZnNldCA9IG1lc3NhZ2Uub2Zmc2V0LFxyXG4gICAgICAgICAgICAgICAgcGFyZW50T3BlblN0YXR1c0FycmF5ID0gW107XHJcblxyXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgZnVsbFRhbGtNZXNzYWdlc0xlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxvb3BNZXNzYWdlT2Zmc2V0ID0gdGFsay5mdWxsVGFsa01lc3NhZ2VzW2ZpcnN0TWVzc2FnZS5pZF1baV0ub2Zmc2V0O1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKGFmdGVyQ3VycmVudEluZGV4ICYmICFuZXh0TWVzc2FnZU9uQ3VycmVudExldmVsXHJcbiAgICAgICAgICAgICAgICAgICAgJiYgbWVzc2FnZS5vZmZzZXQgPCBsb29wTWVzc2FnZU9mZnNldCl7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGFyZUFsbE15UGFyZW50c1RyZWVPcGVuW2xvb3BNZXNzYWdlT2Zmc2V0XSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGxvb3BNZXNzYWdlT2Zmc2V0IC0gbWVzc2FnZS5vZmZzZXQgPT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v0LXRgdC70Lgg0Y3RgtC+INC90LXQv9C+0YHRgNC10LTRgdGC0LLQtdC90L3Ri9C5INC/0L7RgtC+0LzQvtC6XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWxrLmZ1bGxUYWxrTWVzc2FnZXNbZmlyc3RNZXNzYWdlLmlkXVtpXS5pc09wZW4gP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFsay5mdWxsVGFsa01lc3NhZ2VzW2ZpcnN0TWVzc2FnZS5pZF1baV0uaXNPcGVuID0gZmFsc2UgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFsay5mdWxsVGFsa01lc3NhZ2VzW2ZpcnN0TWVzc2FnZS5pZF1baV0uaXNPcGVuID0gdHJ1ZSA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRPcGVuU3RhdHVzQXJyYXlbbG9vcE1lc3NhZ2VPZmZzZXRdID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50T3BlblN0YXR1cyA9IHRhbGsuZnVsbFRhbGtNZXNzYWdlc1tmaXJzdE1lc3NhZ2UuaWRdW2ldLmlzT3BlbjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGFsay5mdWxsVGFsa01lc3NhZ2VzW2ZpcnN0TWVzc2FnZS5pZF1baV0uaXNUcmVlT3Blbil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmVBbGxNeVBhcmVudHNUcmVlT3Blbltsb29wTWVzc2FnZU9mZnNldF0gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDQtdGB0LvQuCDRjdGC0L4g0L/RgtC+0LzQutC4INC/0L7RgtC+0LzQutCwXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja0FyZUFsbE15UGFyZW50c1RyZWVPcGVuID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yKHZhciBqID0gYmVnaW5PZmZzZXQ7IGogPCBsb29wTWVzc2FnZU9mZnNldDsgaisrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vINC/0YDQvtCy0LXRgNGP0LXQvCDQvdC10YIg0LvQuCDRgyDQutC+0LPQviDQsiDQv9GA0LXQtNC60LDRhSBpc1RyZWVPcGVuID0gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGFyZUFsbE15UGFyZW50c1RyZWVPcGVuW2pdID09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja0FyZUFsbE15UGFyZW50c1RyZWVPcGVuID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50T3BlblN0YXR1cyAmJiBjaGVja0FyZUFsbE15UGFyZW50c1RyZWVPcGVuID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhbGsuZnVsbFRhbGtNZXNzYWdlc1tmaXJzdE1lc3NhZ2UuaWRdW2ldLmlzT3BlbiA9IHRydWUgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFsay5mdWxsVGFsa01lc3NhZ2VzW2ZpcnN0TWVzc2FnZS5pZF1baV0uaXNPcGVuID0gZmFsc2UgO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0YWxrLmZ1bGxUYWxrTWVzc2FnZXNbZmlyc3RNZXNzYWdlLmlkXVtpXS5pc1RyZWVPcGVuKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vINC10YHQu9C4INGDINC60L7Qs9C+LdGC0L4g0LjQtyDQv9GA0LXQtNC60L7QsiDQvdC1INC+0YLQutGA0YvRgtC+INC00LXRgNC10LLQvlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJlQWxsTXlQYXJlbnRzVHJlZU9wZW5bbG9vcE1lc3NhZ2VPZmZzZXRdID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudE9wZW5TdGF0dXNBcnJheVtsb29wTWVzc2FnZU9mZnNldF0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoYWZ0ZXJDdXJyZW50SW5kZXggJiYgbG9vcE1lc3NhZ2VPZmZzZXQgPT0gbWVzc2FnZS5vZmZzZXQpe1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHRNZXNzYWdlT25DdXJyZW50TGV2ZWwgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYobWVzc2FnZS5pZCA9PSB0YWxrLmZ1bGxUYWxrTWVzc2FnZXNbZmlyc3RNZXNzYWdlLmlkXVtpXS5pZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgYWZ0ZXJDdXJyZW50SW5kZXggPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdmFyIGJ1ZmYsXHJcbiAgICAgICAgICAgIGxhc3RMb2FkZWRJZEZGO1xyXG4gICAgICAgIHRhbGsuYWRkTW9yZUl0ZW1zID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdmFyIHRlbXAgPSBtZXNzYWdlQ2xpZW50LmdldEZpcnN0TGV2ZWxNZXNzYWdlcyh0YWxrSWQsdGFsay5zZWxlY3RlZEdyb3VwLmlkLDEsJHJvb3RTY29wZS5iYXNlLmxhc3RMb2FkZWRJZCwwLDEwKSxcclxuICAgICAgICAgICAgICAgIGJ1ZmYgPSB0ZW1wLm1lc3NhZ2VzO1xyXG4gICAgICAgICAgICBpZihidWZmKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYnVmZkxlbmd0aCA9IGJ1ZmYubGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKGJ1ZmZMZW5ndGggIT0gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmJhc2UubGFzdExvYWRlZElkID0gYnVmZltidWZmTGVuZ3RoIC0gMV0uaWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGxhc3RMb2FkZWRJZEZGICE9ICRyb290U2NvcGUuYmFzZS5sYXN0TG9hZGVkSWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5iYXNlLmluaXRGaXJzdE1lc3NhZ2VzKGJ1ZmYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWxrLmZ1bGxUYWxrRmlyc3RNZXNzYWdlcyA9IHRhbGsuZnVsbFRhbGtGaXJzdE1lc3NhZ2VzLmNvbmNhdChidWZmKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxhc3RMb2FkZWRJZEZGID0gJHJvb3RTY29wZS5iYXNlLmxhc3RMb2FkZWRJZDtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5iYXNlLmVuZE9mTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkKCcubmctY2xvYWsnKS5yZW1vdmVDbGFzcygnbmctY2xvYWsnKTtcclxuXHJcbiAgICB9O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBbICckcm9vdFNjb3BlJywnJHN0YXRlUGFyYW1zJywgcnVicmljc1NpbmdsZUN0cmwgXTsiLCJcclxudmFyIHNldEluZm9DdHJsID0gZnVuY3Rpb24oJHN0YXRlLCAkcm9vdFNjb3BlKSB7XHJcbiAgICAgICAgdmFyIHNldEluZm8gPSB0aGlzO1xyXG5cclxuICAgICAgICBzZXRJbmZvLmlzU2F2ZVJlc3VsdCA9IGZhbHNlO1xyXG4gICAgICAgIHNldEluZm8uaXNFcnJvciA9IGZhbHNlO1xyXG5cclxuICAgICAgICBzZXRJbmZvLnNhdmUgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB2YXIgc3RhaXJjYXNlLCBmbG9vcixmbGF0O1xyXG5cclxuICAgICAgICAgICAgKCFzZXRJbmZvLnN0YWlyY2FzZSkgPyBzdGFpcmNhc2UgPSAwIDogc3RhaXJjYXNlID0gc2V0SW5mby5zdGFpcmNhc2U7XHJcbiAgICAgICAgICAgICghc2V0SW5mby5mbG9vcikgPyBmbG9vciA9IDAgOiBmbG9vciA9IHNldEluZm8uZmxvb3I7XHJcbiAgICAgICAgICAgICghc2V0SW5mby5mbGF0KSA/IGZsYXQgPSAwIDogZmxhdCA9IHNldEluZm8uZmxhdDtcclxuXHJcbiAgICAgICAgICAgIHNldEluZm8uaXNTYXZlUmVzdWx0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy90cnkge1xyXG4gICAgICAgICAgICAgICAgdXNlckNsaWVudC51cGRhdGVVc2VyQWRkcmVzcyhzdGFpcmNhc2UsIGZsb29yLCBmbGF0KTtcclxuICAgICAgICAgICAgICAgIHNldEluZm8uaW5mbyA9IFwi0KHQvtGF0YDQsNC90LXQvdC+XCI7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZSgnLycpO1xyXG4gICAgICAgICAgICAgICAgLy8kcm9vdFNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAvKn1jYXRjaChlKXtcclxuICAgICAgICAgICAgICAgIHNldEluZm8uaW5mbyA9IFwi0J/RgNC+0LjQt9C+0YjQu9CwINC+0YjQuNCx0LrQsFwiO1xyXG4gICAgICAgICAgICAgICAgc2V0SW5mby5pc0Vycm9yID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSovXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICB9O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBbICckc3RhdGUnLCckcm9vdFNjb3BlJywgc2V0SW5mb0N0cmwgXTsiLCJcclxudmFyIHNldHRpbmdzQ3RybD0gZnVuY3Rpb24oJHJvb3RTY29wZSwkc2NvcGUpIHtcclxuICAgICAgICAkcm9vdFNjb3BlLmlzVG9wU2VhcmNoU2hvdyA9IGZhbHNlO1xyXG4gICAgICAgICRyb290U2NvcGUubGVmdGJhci50YWIgPSAwO1xyXG5cclxuICAgICAgICByZXNldFBhZ2VzKCRyb290U2NvcGUuYmFzZSk7XHJcbiAgICAgICAgJHJvb3RTY29wZS5iYXNlLnNldHRpbmdzSXNBY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICRyb290U2NvcGUuYmFzZS5pc0Zvb3RlckJvdHRvbSA9IHRydWU7XHJcblxyXG4gICAgICAgIHJlc2V0QWNlTmF2QnRucygkcm9vdFNjb3BlLm5hdmJhcik7XHJcbiAgICAgICAgJHJvb3RTY29wZS5iYXNlLm1haW5Db250ZW50VG9wSXNIaWRlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgJHJvb3RTY29wZS5iYXNlLnNldHRpbmdzTG9hZFN0YXR1cyA9IFwiaXNMb2FkZWRcIjtcclxuXHJcbiAgICAgICAgdmFyIHNldHRpbmdzID0gdGhpcyxcclxuICAgICAgICAgICAgdXNlclByb2ZpbGVNZXRhID0gdXNlckNsaWVudC5nZXRVc2VyUHJvZmlsZSgpLFxyXG4gICAgICAgICAgICB1c2VyQ29udGF0Y3NNZXRhID0gdXNlclByb2ZpbGVNZXRhLmNvbnRhY3RzLFxyXG4gICAgICAgICAgICB1c2VySW5mb01ldGEgPSB1c2VyUHJvZmlsZU1ldGEudXNlckluZm8sXHJcbiAgICAgICAgICAgIHVzZXJQcml2YWN5TWV0YSA9IHVzZXJQcm9maWxlTWV0YS5wcml2YWN5LFxyXG4gICAgICAgICAgICB1c2VyTm90aWZpY2F0aW9uc01ldGEgPSB1c2VyUHJvZmlsZU1ldGEubm90aWZpY2F0aW9ucyxcclxuICAgICAgICAgICAgdXNlckZhbWlseU1ldGEgPSB1c2VyUHJvZmlsZU1ldGEuZmFtaWx5LFxyXG4gICAgICAgICAgICB1c2VySW50ZXJlc3RzTWV0YSA9IHVzZXJQcm9maWxlTWV0YS5pbnRlcmVzdHM7XHJcblxyXG4gICAgICAgIGlmKHVzZXJGYW1pbHlNZXRhID09PSBudWxsKXtcclxuICAgICAgICAgICAgdXNlckZhbWlseU1ldGEgPSBuZXcgY29tLnZtZXN0ZW9ubGluZS5iZS50aHJpZnQuVXNlckZhbWlseSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0dGluZ3MudXNlckNvbnRhY3RzID0gY2xvbmUodXNlckNvbnRhdGNzTWV0YSk7XHJcbiAgICAgICAgc2V0dGluZ3MudXNlckluZm8gPSBjbG9uZSh1c2VySW5mb01ldGEpO1xyXG4gICAgICAgIHNldHRpbmdzLnVzZXJQcml2YWN5ID0gY2xvbmUodXNlclByaXZhY3lNZXRhKTtcclxuICAgICAgICBzZXR0aW5ncy51c2VyTm90aWZpY2F0aW9ucyA9IGNsb25lKHVzZXJOb3RpZmljYXRpb25zTWV0YSk7XHJcbiAgICAgICAgaWYoIXNldHRpbmdzLnVzZXJOb3RpZmljYXRpb25zKXtcclxuICAgICAgICAgICAgc2V0dGluZ3MudXNlck5vdGlmaWNhdGlvbnMgPSBuZXcgY29tLnZtZXN0ZW9ubGluZS5iZS50aHJpZnQuTm90aWZpY2F0aW9ucygpO1xyXG4gICAgICAgICAgICBzZXR0aW5ncy51c2VyTm90aWZpY2F0aW9ucy5mcmVxID0gNDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldHRpbmdzLmZhbWlseSA9IGNsb25lKHVzZXJGYW1pbHlNZXRhKTtcclxuICAgICAgICBzZXR0aW5ncy5pbnRlcmVzdHMgPSBjbG9uZSh1c2VySW50ZXJlc3RzTWV0YSk7XHJcblxyXG4gICAgICAgIGlmIChzZXR0aW5ncy51c2VySW5mby5nZW5kZXIgPT0gMSkge1xyXG4gICAgICAgICAgICBzZXR0aW5ncy5tYXJyaWVkID0gXCLQl9Cw0LzRg9C20LXQvFwiO1xyXG4gICAgICAgICAgICBzZXR0aW5ncy5ub3RNYXJyaWVkID0gXCLQndC1INC30LDQvNGD0LbQtdC8XCI7XHJcbiAgICAgICAgfWVsc2UgaWYoc2V0dGluZ3MudXNlckluZm8uZ2VuZGVyID09IDIpe1xyXG4gICAgICAgICAgICBzZXR0aW5ncy5tYXJyaWVkID0gXCLQltC10L3QsNGCXCI7XHJcbiAgICAgICAgICAgIHNldHRpbmdzLm5vdE1hcnJpZWQgPSBcItCd0LUg0LbQtdC90LDRglwiO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBzZXR0aW5ncy5tYXJyaWVkID0gXCLQkiDQsdGA0LDQutC1XCI7XHJcbiAgICAgICAgICAgIHNldHRpbmdzLm5vdE1hcnJpZWQgPSBcItCd0LUg0YHQvtGB0YLQvtGOINCyINCx0YDQsNC60LVcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldHRpbmdzLnllYXJzPSBbXTtcclxuICAgICAgICB2YXIgaW5kID0gMDtcclxuICAgICAgICBmb3IodmFyIGkgPSAyMDE0OyBpID4gMTk0MDsgaS0tKXtcclxuICAgICAgICAgICAgc2V0dGluZ3MueWVhcnNbaW5kKytdID0gaTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldHRpbmdzLnVzZXJJbmZvLmJpcnRoZGF5ID9cclxuICAgICAgICBzZXR0aW5ncy51c2VySW5mby5iaXJ0aGRheU1ldGEgPSBuZXcgRGF0ZShzZXR0aW5ncy51c2VySW5mby5iaXJ0aGRheSoxMDAwKSA6XHJcbiAgICAgICAgc2V0dGluZ3MudXNlckluZm8uYmlydGhkYXlNZXRhID0gXCJcIjtcclxuXHJcbiAgICAgICAgaWYoc2V0dGluZ3MudXNlckluZm8uYmlydGhkYXlNZXRhKXtcclxuICAgICAgICAgICAgdmFyIG1vbnRoID0gc2V0dGluZ3MudXNlckluZm8uYmlydGhkYXlNZXRhLmdldE1vbnRoKCkrMStcIlwiO1xyXG4gICAgICAgICAgICBpZihtb250aC5sZW5ndGggPT0gMSkgbW9udGggPSBcIjBcIittb250aDtcclxuXHJcbiAgICAgICAgICAgIHZhciBkYXkgPSBcIlwiK3NldHRpbmdzLnVzZXJJbmZvLmJpcnRoZGF5TWV0YS5nZXREYXRlKCk7XHJcbiAgICAgICAgICAgIGlmKGRheS5sZW5ndGggPT0gMSkgZGF5ID0gXCIwXCIrZGF5O1xyXG5cclxuICAgICAgICAgICAgdmFyIHllYXIgPSBzZXR0aW5ncy51c2VySW5mby5iaXJ0aGRheU1ldGEuZ2V0RnVsbFllYXIoKTtcclxuXHJcbiAgICAgICAgICAgIHNldHRpbmdzLnVzZXJJbmZvLmJpcnRoZGF5TWV0YSA9IGRheStcIi5cIittb250aCtcIi5cIit5ZWFyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoc2V0dGluZ3MuZmFtaWx5LmNoaWxkcyA9PT0gbnVsbCB8fCBzZXR0aW5ncy5mYW1pbHkuY2hpbGRzLmxlbmd0aCA9PSAwKXtcclxuICAgICAgICAgICAgc2V0dGluZ3MuZmFtaWx5LmNoaWxkcyA9IFtdO1xyXG4gICAgICAgICAgICBzZXR0aW5ncy5mYW1pbHkuY2hpbGRzWzBdID0gbmV3IGNvbS52bWVzdGVvbmxpbmUuYmUudGhyaWZ0LkNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHNldHRpbmdzLmZhbWlseS5jaGlsZHNbMF0ubmFtZSA9IFwiXCI7XHJcbiAgICAgICAgICAgIHZhciBub3dZZWFyID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgbm93WWVhciA9IG5vd1llYXIuZ2V0RnVsbFllYXIoKTtcclxuICAgICAgICAgICAgLy9zZXR0aW5ncy5mYW1pbHkuY2hpbGRzWzBdLmJpcnRoZGF5ID0gRGF0ZS5wYXJzZSgnMDEuMTUuJytub3dZZWFyKTtcclxuICAgICAgICAgICAgc2V0dGluZ3MuZmFtaWx5LmNoaWxkc1swXS5iaXJ0aGRheSA9IG51bGw7XHJcbiAgICAgICAgICAgIHNldHRpbmdzLmZhbWlseS5jaGlsZHNbMF0uaXNOb3RSZW1vdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgY2hpbGRzTGVuZ3RoID0gc2V0dGluZ3MuZmFtaWx5LmNoaWxkcy5sZW5ndGg7XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGNoaWxkc0xlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYoc2V0dGluZ3MuZmFtaWx5LmNoaWxkc1tpXS5iaXJ0aGRheSkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBiaXJ0aERhdGUgPSBuZXcgRGF0ZShzZXR0aW5ncy5mYW1pbHkuY2hpbGRzW2ldLmJpcnRoZGF5KjEwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzLmZhbWlseS5jaGlsZHNbaV0ubW9udGggPSBcIlwiK2JpcnRoRGF0ZS5nZXRNb250aCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKHNldHRpbmdzLmZhbWlseS5jaGlsZHNbaV0ubW9udGgubGVuZ3RoID09IDEpXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3MuZmFtaWx5LmNoaWxkc1tpXS5tb250aCA9IFwiMFwiK3NldHRpbmdzLmZhbWlseS5jaGlsZHNbaV0ubW9udGg7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzLmZhbWlseS5jaGlsZHNbaV0ueWVhciA9IGJpcnRoRGF0ZS5nZXRGdWxsWWVhcigpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoc2V0dGluZ3MuZmFtaWx5LnBldHMgPT09IG51bGwgfHwgc2V0dGluZ3MuZmFtaWx5LnBldHMubGVuZ3RoID09IDApe1xyXG4gICAgICAgICAgICBzZXR0aW5ncy5mYW1pbHkucGV0cyA9IFtdO1xyXG4gICAgICAgICAgICBzZXR0aW5ncy5mYW1pbHkucGV0c1swXSA9IG5ldyBjb20udm1lc3Rlb25saW5lLmJlLnRocmlmdC5QZXQoKTtcclxuICAgICAgICAgICAgc2V0dGluZ3MuZmFtaWx5LnBldHNbMF0ubmFtZSA9IFwiXCI7XHJcbiAgICAgICAgICAgIHNldHRpbmdzLmZhbWlseS5wZXRzWzBdLnR5cGUgPSBcIjBcIjtcclxuICAgICAgICAgICAgc2V0dGluZ3MuZmFtaWx5LnBldHNbMF0uYnJlZWQgPSBcIlwiO1xyXG4gICAgICAgICAgICBzZXR0aW5ncy5mYW1pbHkucGV0c1swXS5pc05vdFJlbW92ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXR0aW5ncy5vbGRQYXNzdyA9IFwiXCI7XHJcbiAgICAgICAgc2V0dGluZ3MubmV3UGFzc3cgPSBcIlwiO1xyXG5cclxuICAgICAgICBzZXR0aW5ncy5jYW5TYXZlID0gZnVuY3Rpb24obnVtKXtcclxuICAgICAgICAgICAgc3dpdGNoKG51bSl7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRzY29wZS5mb3JtVXNlckluZm8uJHZhbGlkO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkc2NvcGUuZm9ybVByaXZhdGUuJHZhbGlkO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkc2NvcGUuZm9ybUFsZXJ0cy4kdmFsaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRzY29wZS5mb3JtQ29udGFjdHMuJHZhbGlkO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkc2NvcGUuZm9ybUZhbWlseS4kdmFsaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDY6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRzY29wZS5mb3JtSW50ZXJlc3RzLiR2YWxpZDtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBzZXR0aW5ncy5wcm9maWxlSW5mbyA9IFwi0KHQvtGF0YDQsNC90LXQvdC+XCI7XHJcblxyXG4gICAgICAgIHNldHRpbmdzLmlzUHJvZmlsZUVycm9yID0gZmFsc2U7XHJcbiAgICAgICAgc2V0dGluZ3MuaXNQcm9maWxlUmVzdWx0ID0gZmFsc2U7XHJcbiAgICAgICAgc2V0dGluZ3MudXBkYXRlVXNlckluZm8gPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB2YXIgdGVtcCA9IG5ldyBjb20udm1lc3Rlb25saW5lLmJlLnRocmlmdC5Vc2VySW5mbygpO1xyXG5cclxuICAgICAgICAgICAgc2V0dGluZ3MudXNlckluZm8uYmlydGhkYXlNZXRhID9cclxuICAgICAgICAgICAgICAgIHRlbXAuYmlydGhkYXkgPSBEYXRlLnBhcnNlKGdldENvcnJlY3REYXRlKHNldHRpbmdzLnVzZXJJbmZvLmJpcnRoZGF5TWV0YSkpLzEwMDAgOlxyXG4gICAgICAgICAgICAgICAgdGVtcC5iaXJ0aGRheSA9IDA7XHJcblxyXG4gICAgICAgICAgICB0ZW1wLmdlbmRlciA9IHNldHRpbmdzLnVzZXJJbmZvLmdlbmRlcjtcclxuICAgICAgICAgICAgdGVtcC5maXJzdE5hbWUgPSAkcm9vdFNjb3BlLmJhc2UubWUuZmlyc3ROYW1lID0gc2V0dGluZ3MudXNlckluZm8uZmlyc3ROYW1lO1xyXG4gICAgICAgICAgICB0ZW1wLmxhc3ROYW1lID0gJHJvb3RTY29wZS5iYXNlLm1lLmxhc3ROYW1lID0gc2V0dGluZ3MudXNlckluZm8ubGFzdE5hbWU7XHJcblxyXG4gICAgICAgICAgICB1c2VyQ2xpZW50LnVwZGF0ZVVzZXJJbmZvKHRlbXApO1xyXG4gICAgICAgICAgICBzZXR0aW5ncy5pc1Byb2ZpbGVSZXN1bHQgPSB0cnVlO1xyXG4gICAgICAgICAgICBzZXR0aW5ncy5pc1Byb2ZpbGVFcnJvciA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzZXR0aW5ncy5wcm9maWxlSW5mbyA9IFwi0KHQvtGF0YDQsNC90LXQvdC+XCI7XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHNldHRpbmdzLmlzUGFzc3dFcnJvciA9IGZhbHNlO1xyXG4gICAgICAgIHNldHRpbmdzLmlzUGFzc3dSZXN1bHQgPSBmYWxzZTtcclxuICAgICAgICBzZXR0aW5ncy51cGRhdGVQYXNzd29yZCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGlmIChzZXR0aW5ncy5uZXdQYXNzdy5sZW5ndGggPCAzKXtcclxuICAgICAgICAgICAgICAgIHNldHRpbmdzLmlzUGFzc3dSZXN1bHQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3MuaXNQYXNzd0Vycm9yID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHNldHRpbmdzLnBhc3N3SW5mbyA9IFwi0JLRiyDRg9C60LDQt9Cw0LvQuCDRgdC70LjRiNC60L7QvCDQutC+0YDQvtGC0LrQuNC5INC/0LDRgNC+0LvRjFwiO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHNldHRpbmdzLmlzUGFzc3dSZXN1bHQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICB1c2VyQ2xpZW50LmNoYW5nZVBhc3N3b3JkKHNldHRpbmdzLm9sZFBhc3N3LCBzZXR0aW5ncy5uZXdQYXNzdyk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3MuaXNQYXNzd0Vycm9yID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3MucGFzc3dJbmZvID0gXCLQodC+0YXRgNCw0L3QtdC90L5cIjtcclxuICAgICAgICAgICAgICAgIH1jYXRjaChlKXtcclxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5ncy5pc1Bhc3N3RXJyb3IgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzLnBhc3N3SW5mbyA9IFwi0JLRiyDRg9C60LDQt9Cw0LvQuCDQvdC1INCy0LXRgNC90YvQuSDRgdGC0LDRgNGL0Lkg0L/QsNGA0L7Qu9GMXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgc2V0dGluZ3MuaXNQcml2YWN5RXJyb3IgPSBmYWxzZTtcclxuICAgICAgICBzZXR0aW5ncy5pc1ByaXZhY3lSZXN1bHQgPSBmYWxzZTtcclxuICAgICAgICBzZXR0aW5ncy51cGRhdGVQcml2YWN5ID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdXNlckNsaWVudC51cGRhdGVQcml2YWN5KHNldHRpbmdzLnVzZXJQcml2YWN5KTtcclxuXHJcbiAgICAgICAgICAgIHNldHRpbmdzLmlzUHJpdmFjeVJlc3VsdCA9IHRydWU7XHJcbiAgICAgICAgICAgIHNldHRpbmdzLmlzUHJpdmFjeUVycm9yID0gZmFsc2U7XHJcbiAgICAgICAgfTtcclxuXHJcblxyXG4gICAgICAgIHNldHRpbmdzLmlzQ29udGFjdHNFcnJvciA9IGZhbHNlO1xyXG4gICAgICAgIHNldHRpbmdzLmlzQ29udGFjdHNSZXN1bHQgPSBmYWxzZTtcclxuICAgICAgICBzZXR0aW5ncy51cGRhdGVDb250YWN0cyA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHZhciB0ZW1wID0gbmV3IGNvbS52bWVzdGVvbmxpbmUuYmUudGhyaWZ0LlVzZXJDb250YWN0cygpO1xyXG4gICAgICAgICAgICB0ZW1wLmVtYWlsID0gc2V0dGluZ3MudXNlckNvbnRhY3RzLmVtYWlsO1xyXG4gICAgICAgICAgICB0ZW1wLm1vYmlsZVBob25lID0gc2V0dGluZ3MudXNlckNvbnRhY3RzLm1vYmlsZVBob25lO1xyXG4gICAgICAgICAgICB1c2VyQ2xpZW50LnVwZGF0ZUNvbnRhY3RzKHRlbXApO1xyXG5cclxuICAgICAgICAgICAgc2V0dGluZ3MuaXNDb250YWN0c0Vycm9yID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHNldHRpbmdzLmlzQ29udGFjdHNSZXN1bHQgPSB0cnVlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHNldHRpbmdzLmlzQWxlcnRzRXJyb3IgPSBmYWxzZTtcclxuICAgICAgICBzZXR0aW5ncy5pc0FsZXJ0c1Jlc3VsdCA9IGZhbHNlO1xyXG4gICAgICAgIHNldHRpbmdzLnVwZGF0ZU5vdGlmaWNhdGlvbnMgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpZihzZXR0aW5ncy51c2VyTm90aWZpY2F0aW9ucyAmJiAoc2V0dGluZ3MudXNlck5vdGlmaWNhdGlvbnMuZW1haWwgfHwgc2V0dGluZ3MudXNlck5vdGlmaWNhdGlvbnMuZnJlcSkgKXtcclxuICAgICAgICAgICAgICAgIHZhciB0ZW1wID0gbmV3IGNvbS52bWVzdGVvbmxpbmUuYmUudGhyaWZ0Lk5vdGlmaWNhdGlvbnMoKTtcclxuICAgICAgICAgICAgICAgIHRlbXAuZW1haWwgPSBzZXR0aW5ncy51c2VyTm90aWZpY2F0aW9ucy5lbWFpbDtcclxuICAgICAgICAgICAgICAgIHRlbXAuZnJlcSA9IHNldHRpbmdzLnVzZXJOb3RpZmljYXRpb25zLmZyZXE7XHJcblxyXG4gICAgICAgICAgICAgICAgdXNlckNsaWVudC51cGRhdGVOb3RpZmljYXRpb25zKHRlbXApO1xyXG5cclxuICAgICAgICAgICAgICAgIHNldHRpbmdzLmlzQWxlcnRzRXJyb3IgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHNldHRpbmdzLmlzQWxlcnRzUmVzdWx0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHNldHRpbmdzLmlzRmFtaWx5RXJyb3IgPSBmYWxzZTtcclxuICAgICAgICBzZXR0aW5ncy5pc0ZhbWlseVJlc3VsdCA9IGZhbHNlO1xyXG4gICAgICAgIHNldHRpbmdzLnVwZGF0ZUZhbWlseSA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHZhciB0ZW1wID0gbmV3IGNvbS52bWVzdGVvbmxpbmUuYmUudGhyaWZ0LlVzZXJGYW1pbHkoKTtcclxuICAgICAgICAgICAgdGVtcC5yZWxhdGlvbnMgPSBzZXR0aW5ncy5mYW1pbHkucmVsYXRpb25zO1xyXG4gICAgICAgICAgICB0ZW1wLmNoaWxkcyA9IHNldHRpbmdzLmZhbWlseS5jaGlsZHM7XHJcbiAgICAgICAgICAgIC8vdGVtcC5jaGlsZHMgPSBbXTtcclxuICAgICAgICAgICAgLy90ZW1wLmNoaWxkc1swXSA9IHNldHRpbmdzLmZpcnN0Q2hpbGQ7XHJcblxyXG4gICAgICAgICAgICB0ZW1wLnBldHMgPSBzZXR0aW5ncy5mYW1pbHkucGV0cztcclxuXHJcbiAgICAgICAgICAgIHZhciBjaGlsZHNMZW5ndGggPSBzZXR0aW5ncy5mYW1pbHkuY2hpbGRzLmxlbmd0aDtcclxuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGNoaWxkc0xlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGlmKHNldHRpbmdzLmZhbWlseS5jaGlsZHNbaV0ubmFtZSAmJiBzZXR0aW5ncy5mYW1pbHkuY2hpbGRzW2ldLm5hbWUgIT0gXCJcIil7IDwhLS0gICYmIHNldHRpbmdzLmZhbWlseS5jaGlsZHNbaV0ubW9udGggJiYgc2V0dGluZ3MuZmFtaWx5LmNoaWxkc1tpXS55ZWFyIC0tPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGVtcE1vbnRoID0gcGFyc2VJbnQoc2V0dGluZ3MuZmFtaWx5LmNoaWxkc1tpXS5tb250aCkrMStcIlwiO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZih0ZW1wTW9udGgubGVuZ3RoIDwgMikgdGVtcE1vbnRoID0gXCIwXCIgKyB0ZW1wTW9udGg7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHNldHRpbmdzLmZhbWlseS5jaGlsZHNbaV0ueWVhciAmJiBzZXR0aW5ncy5mYW1pbHkuY2hpbGRzW2ldLnllYXIgIT0gJzE5MTEnICYmIHNldHRpbmdzLmZhbWlseS5jaGlsZHNbaV0ubW9udGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcC5jaGlsZHNbaV0uYmlydGhkYXkgPSBEYXRlLnBhcnNlKGdldENvcnJlY3REYXRlKFwiMTUuXCIrdGVtcE1vbnRoICtcIi5cIiArIHNldHRpbmdzLmZhbWlseS5jaGlsZHNbaV0ueWVhcikpIC8gMTAwMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9hbGVydCh0ZW1wTW9udGgrXCIgXCIrZ2V0Q29ycmVjdERhdGUoXCIxNS5cIit0ZW1wTW9udGggK1wiLlwiICsgc2V0dGluZ3MuZmFtaWx5LmNoaWxkc1tpXS55ZWFyKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXAuY2hpbGRzW2ldLmJpcnRoZGF5ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHBldHNMZW5ndGggPSBzZXR0aW5ncy5mYW1pbHkucGV0cy5sZW5ndGg7XHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBwZXRzTGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgaWYodGVtcC5wZXRzW2ldICYmICF0ZW1wLnBldHNbaV0ubmFtZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90ZW1wLnBldHMuc3BsaWNlKGksMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHVzZXJDbGllbnQudXBkYXRlRmFtaWx5KHRlbXApO1xyXG5cclxuICAgICAgICAgICAgc2V0dGluZ3MuaXNGYW1pbHlFcnJvciA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzZXR0aW5ncy5pc0ZhbWlseVJlc3VsdCA9IHRydWU7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgc2V0dGluZ3MuaXNJbnRlcmVzdHNFcnJvciA9IGZhbHNlO1xyXG4gICAgICAgIHNldHRpbmdzLmlzSW50ZXJlc3RzUmVzdWx0ID0gZmFsc2U7XHJcbiAgICAgICAgc2V0dGluZ3MudXBkYXRlSW50ZXJlc3RzID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdmFyIHRlbXAgPSBuZXcgY29tLnZtZXN0ZW9ubGluZS5iZS50aHJpZnQuVXNlckludGVyZXN0cygpO1xyXG4gICAgICAgICAgICB0ZW1wLmpvYiA9IHNldHRpbmdzLmludGVyZXN0cy5qb2I7XHJcbiAgICAgICAgICAgIHRlbXAudXNlckludGVyZXN0cyA9IHNldHRpbmdzLmludGVyZXN0cy51c2VySW50ZXJlc3RzO1xyXG4gICAgICAgICAgICB1c2VyQ2xpZW50LnVwZGF0ZUludGVyZXN0cyh0ZW1wKTtcclxuXHJcbiAgICAgICAgICAgIHNldHRpbmdzLmlzSW50ZXJlc3RzRXJyb3IgPSBmYWxzZTtcclxuICAgICAgICAgICAgc2V0dGluZ3MuaXNJbnRlcmVzdHNSZXN1bHQgPSB0cnVlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHNldHRpbmdzLmNoaWxkQWRkID0gZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgdmFyIG5ld0NoaWxkID0gbmV3IGNvbS52bWVzdGVvbmxpbmUuYmUudGhyaWZ0LkNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIG5ld0NoaWxkLm5hbWUgPSBcIiBcIjtcclxuICAgICAgICAgICAgdmFyIG5vd1llYXIgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICBub3dZZWFyID0gbm93WWVhci5nZXRGdWxsWWVhcigpO1xyXG4gICAgICAgICAgICBuZXdDaGlsZC5iaXJ0aGRheSA9IERhdGUucGFyc2UoZ2V0Q29ycmVjdERhdGUoJzE1LjAxLicrbm93WWVhcikpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGJpcnRoRGF0ZSA9IG5ldyBEYXRlKG5ld0NoaWxkLmJpcnRoZGF5KTtcclxuICAgICAgICAgICAgLy9uZXdDaGlsZC5tb250aCA9IFwiXCIrYmlydGhEYXRlLmdldE1vbnRoKCk7XHJcbiAgICAgICAgICAgIG5ld0NoaWxkLm1vbnRoID0gXCJcIjtcclxuXHJcbiAgICAgICAgICAgIGlmKG5ld0NoaWxkLmxlbmd0aCA9PSAxKVxyXG4gICAgICAgICAgICAgICAgbmV3Q2hpbGQubW9udGggPSBcIjBcIituZXdDaGlsZC5tb250aDtcclxuXHJcbiAgICAgICAgICAgIC8vbmV3Q2hpbGQueWVhciA9IGJpcnRoRGF0ZS5nZXRGdWxsWWVhcigpO1xyXG4gICAgICAgICAgICBuZXdDaGlsZC55ZWFyID0gXCJcIjtcclxuXHJcblxyXG4gICAgICAgICAgICBpZihzZXR0aW5ncy5mYW1pbHkgPT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICBzZXR0aW5ncy5mYW1pbHkgPSBuZXcgY29tLnZtZXN0ZW9ubGluZS5iZS50aHJpZnQuVXNlckZhbWlseSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHNldHRpbmdzLmZhbWlseS5jaGlsZHMgPT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICBzZXR0aW5ncy5mYW1pbHkuY2hpbGRzPSBbXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2V0dGluZ3MuZmFtaWx5LmNoaWxkcy5sZW5ndGggPT0gMCA/XHJcbiAgICAgICAgICAgIHNldHRpbmdzLmZhbWlseS5jaGlsZHNbMF0gPSBuZXdDaGlsZCA6XHJcbiAgICAgICAgICAgIHNldHRpbmdzLmZhbWlseS5jaGlsZHMucHVzaChuZXdDaGlsZCk7XHJcblxyXG4gICAgICAgIH07XHJcbiAgICAgICAgc2V0dGluZ3MucmVtb3ZlQ2hpbGQgPSBmdW5jdGlvbihjaGlsZE5hbWUpe1xyXG4gICAgICAgICAgICB2YXIgY2hpbGRzTGVuZ3RoID0gc2V0dGluZ3MuZmFtaWx5LmNoaWxkcy5sZW5ndGg7XHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBjaGlsZHNMZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBpZihzZXR0aW5ncy5mYW1pbHkuY2hpbGRzW2ldLm5hbWUgPT0gY2hpbGROYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3MuZmFtaWx5LmNoaWxkcy5zcGxpY2UoaSwxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHNldHRpbmdzLnBldEFkZCA9IGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBuZXdQZXQgPSBuZXcgY29tLnZtZXN0ZW9ubGluZS5iZS50aHJpZnQuUGV0KCk7XHJcbiAgICAgICAgICAgIG5ld1BldC5uYW1lID0gXCIgXCI7XHJcbiAgICAgICAgICAgIG5ld1BldC50eXBlID0gXCIwXCI7XHJcblxyXG4gICAgICAgICAgICBpZihzZXR0aW5ncy5mYW1pbHkgPT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICBzZXR0aW5ncy5mYW1pbHkgPSBuZXcgY29tLnZtZXN0ZW9ubGluZS5iZS50aHJpZnQuVXNlckZhbWlseSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHNldHRpbmdzLmZhbWlseS5wZXRzID09IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3MuZmFtaWx5LnBldHM9IFtdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzZXR0aW5ncy5mYW1pbHkucGV0cy5sZW5ndGggPT0gMCA/XHJcbiAgICAgICAgICAgICAgICBzZXR0aW5ncy5mYW1pbHkucGV0c1swXSA9IG5ld1BldCA6XHJcbiAgICAgICAgICAgICAgICBzZXR0aW5ncy5mYW1pbHkucGV0cy5wdXNoKG5ld1BldCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBzZXR0aW5ncy5yZW1vdmVQZXQgPSBmdW5jdGlvbihwZXROYW1lKXtcclxuICAgICAgICAgICAgdmFyIHBldHNMZW5ndGggPSBzZXR0aW5ncy5mYW1pbHkucGV0cy5sZW5ndGg7XHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBwZXRzTGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgaWYoc2V0dGluZ3MuZmFtaWx5LnBldHNbaV0ubmFtZSA9PSBwZXROYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3MuZmFtaWx5LnBldHMuc3BsaWNlKGksMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgc2V0dGluZ3MucGFzc3dDaGFuZ2UgPSBmYWxzZTtcclxuICAgICAgICBzZXR0aW5ncy5jaGFuZ2VQYXNzdyA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHNldHRpbmdzLnBhc3N3Q2hhbmdlID0gdHJ1ZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKihzZXR0aW5ncy51c2VySW5mby5iaXJ0aGRheSAhPSAwKSA/XHJcbiAgICAgICAgc2V0dGluZ3MuYmlydGhkYXkgPSBzZXR0aW5ncy51c2VySW5mby5iaXJ0aGRheSA6XHJcbiAgICAgICAgc2V0dGluZ3MuYmlydGhkYXkgPSBcIlwiOyovXHJcblxyXG4gICAgICAgICQoJyNzZXR0aW5ncy1pbnB1dC0zJykuZGF0ZXBpY2tlcih7Y2hhbmdlTW9udGg6dHJ1ZSwgY2hhbmdlWWVhcjp0cnVlLGRhdGVGb3JtYXQ6IFwiZGQubW0ueXlcIix5ZWFyUmFuZ2U6J2MtMTAwOitjJ30pO1xyXG4gICAgICAgICQuZGF0ZXBpY2tlci5zZXREZWZhdWx0cygkLmRhdGVwaWNrZXIucmVnaW9uYWxbJ3J1J10pO1xyXG5cclxuICAgICAgICBhbmd1bGFyLmVsZW1lbnQoJCgnLnNldHRpbmdzJykpLmNzcyh7J21pbi1oZWlnaHQnOiAkKHdpbmRvdykuaGVpZ2h0KCktMTI1fSk7XHJcblxyXG4gICAgICAgICQoJy5uZy1jbG9haycpLnJlbW92ZUNsYXNzKCduZy1jbG9haycpO1xyXG5cclxuICAgICAgICB2YXIgaHJlZiA9IGRvY3VtZW50LmxvY2F0aW9uLmhyZWY7XHJcbiAgICAgICAgdmFyIGhyZWZJbmQgPSBocmVmLmluZGV4T2YoXCIvXCIsOSk7XHJcbiAgICAgICAgJCgnaW5wdXRbbmFtZT1cInJlZGlyZWN0X3VyaVwiXScpLnZhbChocmVmLnN1YnN0cmluZygwLGhyZWZJbmQpK1wiL29hdXRoXCIpO1xyXG5cclxuICAgIH07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFsgJyRyb290U2NvcGUnLCckc2NvcGUnLCBzZXR0aW5nc0N0cmwgXTsiLCJcclxudmFyIHRhbGtzQ3RybCA9IGZ1bmN0aW9uKCRyb290U2NvcGUpIHtcclxuICAgICAgICAvKlxyXG4gICAgICAgICog0L/RgNC4INGA0LDQsdC+0YLQtSDRgSDQvtCx0YHQttC00LXQvdC40Y/QvNC4INC90YPQttC90L4g0YPRh9C10YHRgtGMINGB0LvQtdC00YPRjtGJ0LXQtTpcclxuICAgICAgICAqINC10YHRgtGMINGC0YDQuCDRgtC40L/QsCDRgdC+0L7QsdGJ0LXQvdC40Y8gOlxyXG4gICAgICAgICogMSkg0YLQvtC/0LjQui4g0J3QsCDRgdGC0YDQsNC90LjRhtC1INC+0LHRgdGD0LbQtNC10L3QuNGPINC80L7QttC10YIg0LHRi9GC0Ywg0YLQvtC70YzQutC+INC+0LTQuNC9LiDQldCz0L4g0LTQtdGC0LhcclxuICAgICAgICAqINGN0YLQviDRgdC+0L7QsdGJ0LXQvdC40Y8g0L/QtdGA0LLQvtCz0L4g0YPRgNC+0LLQvdGPLiDQldCz0L4g0LTQtdGC0Lgg0LLRgdC10LPQtNCwINC+0YLQutGA0YvRgtGLLCDQv9C+0Y3RgtC+0LzRgyDRgyDQvdC10LPQvlxyXG4gICAgICAgICog0L3QtdGCINC60L7QvdGC0YDQvtC70LAg0L/Qu9GO0YEt0LzQuNC90YPRgS4g0KHRgtGA0LDQvdC40YbQsCDRgtC+0L/QuNC60LAg0LfQsNCz0YDRg9C20LDQtdGC0YHRjyDQsiDQvNC10YLQvtC00LUgc2hvd0Z1bGxUYWxrXHJcbiAgICAgICAgKiDRh9C10YDQtdC3IHRvcGljSWQg0LrQvtGC0L7RgNGL0Lkg0L/QtdGA0LXQtNCw0LXRgtGB0Y8g0LIg0YTRg9C90LrRhtC40Y4g0L/RgNC4INCy0YvQt9C+0LLQtVxyXG4gICAgICAgICog0KXRgNCw0L3QuNGC0YHRjyDQsiDQvtCx0YrQtdC60YLQtSB0YWxrLmZ1bGxUYWxrVG9waWMuXHJcbiAgICAgICAgKlxyXG4gICAgICAgICogMikg0KHQvtC+0LHRidC10L3QuNC1INC/0LXRgNCy0L7Qs9C+INGD0YDQvtCy0L3Rjy4g0JHQtdGA0YPRgtGB0Y8g0YfQtdGA0LXQtyBnZXRGaXJzdExldmVsTWVzc2FnZXMuINCY0LfQvdCw0YfQsNC70YzQvdC+XHJcbiAgICAgICAgKiDQstGB0LUg0L/QvtGC0L7QvNC60Lgg0YHQutGA0YvRgtGLINC4INC90LUg0L/QvtC00LPRgNGD0LbQtdC90YsuINCf0YDQuCDQv9C10YDQstC+0Lwg0L3QsNC20LDRgtC40Lgg0L3QsCDQutC+0L3RgtGA0L7QuyDQv9C70Y7RgS3QvNC40L3Rg9GBXHJcbiAgICAgICAgKiDQv9C+0LTQs9GA0YPQttCw0Y7RgtGB0Y8sINC/0L7RgtC+0Lwg0L/RgNC+0YHRgtC+INC/0LXRgNC10LrQu9GO0YfQsNC10YLRgdGPIHNob3ctaGlkZS4gUGFyZW50SWQg0YMg0YLQsNC60LjRhSDRgdC+0L7QsdGJ0LXQvdC40LlcclxuICAgICAgICAqINGA0LDQstC10L0gMC4g0JLQvdC40LzQsNC90LjQtSEgOiBQYXJlbnRJZCDQv9C10YDQtdC00LDQtdGC0YHRjyDQsiBnZXRGaXJzdExldmVsTWVzc2FnZXMg0YfQtdGA0LXQtyBsYXN0TG9hZGVkSWQuICAgICAgICAqXHJcbiAgICAgICAgKiDQoyDQutCw0LbQtNC+0LPQviDRgdC+0L7QsdGJ0LXQvdC40Y8g0L/QtdGA0LLQvtCz0L4g0YPRgNC+0LLQvdGPINC10YHRgtGMINGB0LLQvtC5INC80LDRgdGB0LjQsiDRgdC+0L7QsdGJ0LXQvdC40LkgM9Cz0L4g0YLQuNC/0LAuXHJcbiAgICAgICAgKiDQpdGA0LDQvdGP0YLRgdGPINCyINC80LDRgdGB0LjQstC1IHRhbGsuZnVsbFRhbGtGaXJzdE1lc3NhZ2VzLlxyXG4gICAgICAgICpcclxuICAgICAgICAqIDMpINCf0YDQvtGB0YLQviDRgdC+0L7QsdGJ0LXQvdC40LUuINCR0LXRgNC10YPRgtGB0Y8g0YfQtdGA0LXQtyBnZXRNZXNzYWdlcygpLiDQp9C10YDQtdC3INC/0LDRgNCw0LzQtdGC0YAgbGFzdExvYWRlZElkINC/0LXRgNC10LTQsNC10YLRgdGPXHJcbiAgICAgICAgKiBpZCDQv9C+0YHQu9C10LTQvdC10LPQviDQt9Cw0LPRgNGD0LbQtdC90L3QvtCz0L4g0L/RgNC+0YHRgtC+0LPQviDRgdC+0L7QsdGJ0LXQvdC40Y8sINC00LvRjyDQv9C+0LTQs9GA0YPQt9C60LguINCjINC60LDQttC00L7Qs9C+INC/0YDQvtGB0YLQvtCz0L4g0YHQvtC+0LHRidC10L3QuNGPXHJcbiAgICAgICAgKiDQtdGB0YLRjCBvZmZzZXQsINC60L7RgtC+0YDRi9C5INC30LDQtNCw0LXRgtGB0Y8g0L3QsCDQkdCVLiBvZmZzZXQn0Ysg0L7Qv9GA0LXQtNC10LvRj9GO0YIg0LLQu9C+0LbQtdC90L3QvtGB0YLRjCDRgdC+0L7QsdGJ0LXQvdC40Lkg0Lgg0LfQsCDRgdGH0LXRgiDQvdC40YVcclxuICAgICAgICAqINGB0L7Qt9C00LDQtdGC0YHRjyDQtNGA0LXQstC+0LLQuNC00L3QsNGPINGB0YLRgNGD0LrRgtGD0YDQsCDRhNC+0YDRg9C80LAuXHJcbiAgICAgICAgKiDQpdGA0LDQvdGP0YLRgdGPINCyINC00LLRg9C80LXRgNC90L7QvCDQvNCw0YHRgdC40LLQtSB0YWxrLmZ1bGxUYWxrTWVzc2FnZXNbZmlyc3RNZXNzYWdlLmlkXVtdXHJcbiAgICAgICAgKlxyXG4gICAgICAgICpcclxuICAgICAgICAqINCV0YHRgtGMINGB0LvQtdC00YPRjtGJ0LjQtSDRgtC40L/RiyDQutC+0L3RgtGA0L7Qu9C+0LIsINGA0LXQsNC70LjQt9C+0LLQsNC90L3Ri9C1INC00LvRjyDRgNCw0LfQvdGL0YUg0YLQuNC/0L7QsiDRgdC+0L7QsdGJ0LXQvdC40Lk6XHJcbiAgICAgICAgKiAxKSBzaG93QW5zd2VySW5wdXQgOiDRgNC10LDQu9C40LfRg9C10YIg0LrQu9C40Log0L3QsCBcItCe0YLQstC10YLQuNGC0YxcIiwg0L/QvtC60LDQt9Cy0LDQtdGCINC/0L7Qu9C1INC00LvRjyDQvtGC0L/RgNCw0LLQutC4XHJcbiAgICAgICAgKiDRgdC+0L7QsdGJ0LXQvdC40Y8uXHJcbiAgICAgICAgKiAyKSBhZGRNZXNzYWdlOiDQutC70LjQuiDQvdCwIFwi0J7RgtC/0YDQsNCy0LjRgtGMXCIsINGB0L7Qt9C00LDQtdGCINC4INC+0YLQvtCx0YDQsNC20LDQtdGCINC90L7QstC+0LUg0YHQvtC+0LHRidC10L3QuNC1XHJcbiAgICAgICAgKiAzKSB0b2dnbGVUcmVlOiDQutC+0L3RgtGA0L7QuyBcItC/0LvRjtGBLdC80LjQvdGD0YFcIiwg0YHQutGA0LLQsNC10YIt0L/QvtC60LDQt9Cy0LDQtdGCINCy0L3Rg9GC0YDQtdC90L3QuNC1INGB0L7QvtCx0YnQtdC90LjRjyDRjdGC0L7Qs9C+XHJcbiAgICAgICAgKiDRgdC+0L7QsdGJ0LXQvdC40Y8uXHJcbiAgICAgICAgKiAqL1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLnNldFRhYigyKTtcclxuICAgICAgICAgICAgdmFyIHRhbGsgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGFsay5hdHRhY2hJZCA9IFwiMDBcIjtcclxuICAgICAgICAgICAgaW5pdEZhbmN5Qm94KCQoJy50YWxrcycpKTtcclxuXHJcbiAgICAgICAgICAgICRyb290U2NvcGUuYmFzZS5zaG93QWxsR3JvdXBzKCk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuYmFzZS5pc0Zvb3RlckJvdHRvbSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgJHJvb3RTY29wZS5iYXNlLmNyZWF0ZVRvcGljSXNIaWRlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIHRhbGsuaXNUYWxrc0xvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0YWxrLmdyb3VwcyA9IHVzZXJDbGllbnRHcm91cHM7XHJcblxyXG4gICAgICAgICAgICB0YWxrLm1lc3NhZ2UgPSB7fTtcclxuICAgICAgICAgICAgdGFsay5tZXNzYWdlLmNvbnRlbnQgPSB0YWxrLm1lc3NhZ2UuZGVmYXVsdCA9IFRFWFRfREVGQVVMVF8zO1xyXG4gICAgICAgICAgICB0YWxrLnN1YmplY3QgPSBURVhUX0RFRkFVTFRfNDtcclxuXHJcbiAgICAgICAgICAgICRyb290U2NvcGUuYmFzZS5idWZmZXJTZWxlY3RlZEdyb3VwID0gdGFsay5zZWxlY3RlZEdyb3VwID1cclxuICAgICAgICAgICAgJHJvb3RTY29wZS5jdXJyZW50R3JvdXAgPSB1c2VyQ2xpZW50R3JvdXBzWzNdO1xyXG5cclxuICAgICAgICAgICAgJHJvb3RTY29wZS5jdXJyZW50UnVicmljID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgICRyb290U2NvcGUuYmFzZS5pbml0U3RhcnRQYXJhbXNGb3JDcmVhdGVUb3BpYyh0YWxrKTtcclxuXHJcbiAgICAgICAgICAgIHRhbGsuaXNUYWxrID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIHRhbGsuZnVsbFRhbGtUb3BpYyA9IHt9O1xyXG4gICAgICAgICAgICB0YWxrLmZ1bGxUYWxrVG9waWMuYW5zd2VySW5wdXRJc1Nob3cgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGFsay5mdWxsVGFsa01lc3NhZ2VzID0gW107XHJcbiAgICAgICAgICAgIHRhbGsuZnVsbFRhbGtGaXJzdE1lc3NhZ2VzID0gW107XHJcblxyXG4gICAgICAgICAgICB0YWxrLmNvbW1lbnRUZXh0ID0gVEVYVF9ERUZBVUxUXzI7XHJcbiAgICAgICAgICAgIHZhciBmdWxsVGFsa0ZpcnN0TWVzc2FnZXNMZW5ndGgsXHJcbiAgICAgICAgICAgICAgICB0YWxrSWQ7XHJcblxyXG4gICAgICAgICAgICAvKmlmKCEkcm9vdFNjb3BlLmltcG9ydGFudElzTG9hZGVkRnJvbVRvcClcclxuICAgICAgICAgICAgJHJvb3RTY29wZS5pbXBvcnRhbnRUb3BpY3MgPSBtZXNzYWdlQ2xpZW50LmdldEltcG9ydGFudE5ld3MoJHJvb3RTY29wZS5jdXJyZW50R3JvdXAuaWQpO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLmltcG9ydGFudElzTG9hZGVkRnJvbVRvcCA9IGZhbHNlOyovXHJcblxyXG4gICAgICAgICAgICB0YWxrLnRvcGljcyA9IG1lc3NhZ2VDbGllbnQuZ2V0VG9waWNzKHRhbGsuc2VsZWN0ZWRHcm91cC5pZCwgMCwgMCwgMCwgMTAwMCkudG9waWNzO1xyXG5cclxuICAgICAgICAgICAgaW5pdFRhbGtzKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRhbGsudG9waWNzKSB0YWxrLnRvcGljcyA9IFtdO1xyXG5cclxuICAgICAgICAgICAgJHJvb3RTY29wZS5zZWxlY3RHcm91cEluRHJvcGRvd25fdGFsa3MgPSBmdW5jdGlvbihncm91cElkKXtcclxuICAgICAgICAgICAgICAgIHRhbGsuc2VsZWN0ZWRHcm91cCA9ICRyb290U2NvcGUuYmFzZS5idWZmZXJTZWxlY3RlZEdyb3VwID0gc2VsZWN0R3JvdXBJbkRyb3Bkb3duKGdyb3VwSWQpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBpbml0VGFsa3MoKXtcclxuICAgICAgICAgICAgdmFyIHRvcGljTGVuZ3RoO1xyXG4gICAgICAgICAgICB0YWxrLnRvcGljcyA/IHRvcGljTGVuZ3RoID0gdGFsay50b3BpY3MubGVuZ3RoIDogdG9waWNMZW5ndGggPSAwO1xyXG5cclxuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRvcGljTGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgICAgICB0YWxrLnRvcGljc1tpXS5sYXN0VXBkYXRlRWRpdCA9IGdldFRpbWluZyh0YWxrLnRvcGljc1tpXS5sYXN0VXBkYXRlKTtcclxuICAgICAgICAgICAgICAgIHRhbGsudG9waWNzW2ldLmxhYmVsID0gZ2V0TGFiZWwodGFsay5ncm91cHMsdGFsay50b3BpY3NbaV0uZ3JvdXBUeXBlKTtcclxuICAgICAgICAgICAgICAgIHRhbGsudG9waWNzW2ldLnRhZ0NvbG9yID0gZ2V0VGFnQ29sb3IodGFsay50b3BpY3NbaV0ubGFiZWwpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKHRhbGsudG9waWNzW2ldLm1lc3NhZ2UuaW1wb3J0YW50ID09IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRhbGsudG9waWNzW2ldLm1lc3NhZ2UuaW1wb3J0YW50VGV4dCA9ICfQodC90Y/RgtGMINC80LXRgtC60YMgXCLQktCw0LbQvdC+0LVcIic7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0YWxrLnRvcGljc1tpXS5tZXNzYWdlLmltcG9ydGFudFRleHQgPSAn0J/QvtC80LXRgtC40YLRjCDQutCw0LogXCLQktCw0LbQvdC+0LVcIic7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRyb290U2NvcGUudGFsa3NDaGFuZ2VHcm91cCA9IGZ1bmN0aW9uKGdyb3VwSWQpe1xyXG5cclxuICAgICAgICAgICAgdGFsay50b3BpY3MgPSBtZXNzYWdlQ2xpZW50LmdldFRvcGljcyhncm91cElkLDAsMCwwLDEwMDApLnRvcGljcztcclxuXHJcbiAgICAgICAgICAgIGlmKHRhbGsudG9waWNzKSB7XHJcbiAgICAgICAgICAgICAgICBpbml0VGFsa3MoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgIHRhbGsuc2VsUnVicmljTmFtZSA9IFwi0J7QsdGJ0LXQtVwiO1xyXG4gICAgdGFsay5zZWxlY3RSdWJyaWNOZXcgPSBmdW5jdGlvbihydWJyaWMpe1xyXG4gICAgICAgIGlmKHJ1YnJpYykge1xyXG4gICAgICAgICAgICB0YWxrLnNlbFJ1YnJpY05hbWUgPSBydWJyaWMudmlzaWJsZU5hbWU7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRhbGsuc2VsUnVicmljTmFtZSA9IFwi0J7QsdGJ0LXQtVwiO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLmN1cnJlbnRSdWJyaWMgPSB7fTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS5jdXJyZW50UnVicmljLmlkID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBydWJyaWNzTGVuZ3RoID0gdXNlckNsaWVudFJ1YnJpY3MubGVuZ3RoO1xyXG5cclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgcnVicmljc0xlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYocnVicmljLmlkID09IHVzZXJDbGllbnRSdWJyaWNzW2ldLmlkKXtcclxuICAgICAgICAgICAgICAgICRyb290U2NvcGUuY3VycmVudFJ1YnJpYyA9IHVzZXJDbGllbnRSdWJyaWNzW2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgICAgICQoJy5uZy1jbG9haycpLnJlbW92ZUNsYXNzKCduZy1jbG9haycpO1xyXG5cclxuICAgIH07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFsgJyRyb290U2NvcGUnLCB0YWxrc0N0cmwgXTsiLCJcclxudmFyIHRhbGtzU2luZ2xlQ3RybCA9IGZ1bmN0aW9uKCRyb290U2NvcGUsJHN0YXRlUGFyYW1zKXtcclxuXHJcbiAgICAgICAgJHJvb3RTY29wZS5iYXNlLmlzRm9vdGVyQm90dG9tID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHZhciB0YWxrID0gdGhpcyxcclxuICAgICAgICAgICAgZnVsbFRhbGtNZXNzYWdlc0xlbmd0aCxcclxuICAgICAgICAgICAgdGFsa0lkID0gJHN0YXRlUGFyYW1zLnRhbGtJZDtcclxuXHJcbiAgICAgICAgJHJvb3RTY29wZS5iYXNlLmxhc3RMb2FkZWRJZCA9IDA7XHJcbiAgICAgICAgJHJvb3RTY29wZS5iYXNlLmlzRWFybGllc3RNZXNzYWdlcyA9IGZhbHNlO1xyXG4gICAgICAgICRyb290U2NvcGUuYmFzZS5lbmRPZkxvYWRlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0YWxrLmF0dGFjaElkID0gXCIwMFwiO1xyXG4gICAgICAgIHRhbGsuc2VsZWN0ZWRHcm91cCA9IGdldERlZmF1bHRHcm91cCgkcm9vdFNjb3BlLmJhc2UuZ3JvdXBzKTsvLyRyb290U2NvcGUuY3VycmVudEdyb3VwO1xyXG5cclxuICAgICAgICAvKmlmKCEkcm9vdFNjb3BlLmltcG9ydGFudElzTG9hZGVkRnJvbVRvcClcclxuICAgICAgICAgICAgJHJvb3RTY29wZS5pbXBvcnRhbnRUb3BpY3MgPSBtZXNzYWdlQ2xpZW50LmdldEltcG9ydGFudE5ld3MoJHJvb3RTY29wZS5jdXJyZW50R3JvdXAuaWQpO1xyXG4gICAgICAgICRyb290U2NvcGUuaW1wb3J0YW50SXNMb2FkZWRGcm9tVG9wID0gZmFsc2U7Ki9cclxuXHJcbiAgICAvL2NvbnNvbGUubG9nKCcwJyx0YWxrLnNlbGVjdGVkR3JvdXAsZ2V0RGVmYXVsdEdyb3VwKCRyb290U2NvcGUuYmFzZS5ncm91cHMpKTtcclxuICAgICAgICB0YWxrLnRvcGljcyA9IG1lc3NhZ2VDbGllbnQuZ2V0VG9waWNzKHRhbGsuc2VsZWN0ZWRHcm91cC5pZCwgMCwgMCwgMCwgMTAwMCkudG9waWNzO1xyXG4gICAgICAgIHRhbGsuZnVsbFRhbGtUb3BpYyA9IHt9O1xyXG4gICAgICAgIHRhbGsuZnVsbFRhbGtNZXNzYWdlcyA9IHt9O1xyXG4gICAgICAgIHRhbGsuZnVsbFRhbGtGaXJzdE1lc3NhZ2VzID0gW107XHJcbiAgICAgICAgdGFsay5ncm91cHMgPSB1c2VyQ2xpZW50R3JvdXBzO1xyXG5cclxuICAgICAgICB0YWxrLmlzVGFsayA9IHRydWU7XHJcblxyXG4gICAgICAgICRyb290U2NvcGUuYmFzZS5pbml0U3RhcnRQYXJhbXNGb3JDcmVhdGVNZXNzYWdlKHRhbGspO1xyXG5cclxuICAgICAgICB2YXIgc2hvd0Z1bGxUYWxrID0gZnVuY3Rpb24odGFsayx0YWxrT3V0c2lkZUlkKXtcclxuXHJcbiAgICAgICAgICAgIGluaXRGYW5jeUJveCgkKCcudGFsa3Mtc2luZ2xlJykpO1xyXG4gICAgICAgICAgICB2YXIgdG9waWNMZW5ndGg7XHJcbiAgICAgICAgICAgIHRhbGsudG9waWNzID8gdG9waWNMZW5ndGggPSB0YWxrLnRvcGljcy5sZW5ndGggOiB0b3BpY0xlbmd0aCA9IDA7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGFsa0lkID0gdGFsa091dHNpZGVJZDtcclxuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRvcGljTGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgaWYodGFsa0lkID09IHRhbGsudG9waWNzW2ldLmlkKXtcclxuICAgICAgICAgICAgICAgICAgICB0YWxrLmZ1bGxUYWxrVG9waWMgPSB0YWxrLnRvcGljc1tpXTtcclxuICAgICAgICAgICAgICAgICAgICB0YWxrLmZ1bGxUYWxrVG9waWMucnVicmljID0gZ2V0VG9waWNSdWJyaWModGFsay5mdWxsVGFsa1RvcGljKTtcclxuICAgICAgICAgICAgICAgICAgICBpZighdGFsay5mdWxsVGFsa1RvcGljLnJ1YnJpYykgdGFsay5mdWxsVGFsa1RvcGljLnNlbFJ1YnJpY05hbWUgPSBcItCe0LHRidC10LVcIjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGFsay5mdWxsVGFsa1RvcGljLnNlbGVjdFJ1YnJpY05ldyA9IGZ1bmN0aW9uKHJ1YnJpYyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJ1YnJpYykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFsay5mdWxsVGFsa1RvcGljLnNlbFJ1YnJpY05hbWUgPSBydWJyaWMudmlzaWJsZU5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFsay5mdWxsVGFsa1RvcGljLnNlbFJ1YnJpY05hbWUgPSBcItCe0LHRidC10LVcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuY3VycmVudFJ1YnJpYyA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5jdXJyZW50UnVicmljLmlkID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcnVicmljc0xlbmd0aCA9IHVzZXJDbGllbnRSdWJyaWNzLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBydWJyaWNzTGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocnVicmljLmlkID09IHVzZXJDbGllbnRSdWJyaWNzW2ldLmlkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmN1cnJlbnRSdWJyaWMgPSB1c2VyQ2xpZW50UnVicmljc1tpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3RhbGstc2luZ2xlJywkcm9vdFNjb3BlLmN1cnJlbnRSdWJyaWMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmJhc2UuaW5pdFN0YXJ0UGFyYW1zRm9yQ3JlYXRlVG9waWModGFsay5mdWxsVGFsa1RvcGljKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGFsay5mdWxsVGFsa1RvcGljLmlzVGFsayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFsay5mdWxsVGFsa1RvcGljLm1lc3NhZ2UuY3JlYXRlZEVkaXQgPSBnZXRUaW1pbmcodGFsay5mdWxsVGFsa1RvcGljLm1lc3NhZ2UuY3JlYXRlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFsay5mdWxsVGFsa1RvcGljLmxhYmVsID0gZ2V0TGFiZWwodGFsay5ncm91cHMsdGFsay5mdWxsVGFsa1RvcGljLmdyb3VwVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFsay5mdWxsVGFsa1RvcGljLnRhZ0NvbG9yID0gZ2V0VGFnQ29sb3IodGFsay5mdWxsVGFsa1RvcGljLmxhYmVsKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGFsay5mdWxsVGFsa1RvcGljLm1lc3NhZ2UuaW1wb3J0YW50ID09IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWxrLmZ1bGxUYWxrVG9waWMubWVzc2FnZS5pbXBvcnRhbnRUZXh0ID0gJ9Ch0L3Rj9GC0Ywg0LzQtdGC0LrRgyBcItCS0LDQttC90L7QtVwiJztcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFsay5mdWxsVGFsa1RvcGljLm1lc3NhZ2UuaW1wb3J0YW50VGV4dCA9ICfQn9C+0LzQtdGC0LjRgtGMINC60LDQuiBcItCS0LDQttC90L7QtVwiJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0YWxrLmZ1bGxUYWxrVG9waWMucG9sbCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRQb2xsRWRpdE5hbWVzKHRhbGsuZnVsbFRhbGtUb3BpYy5wb2xsKTtcclxuICAgICAgICAgICAgICAgIHRhbGsuZnVsbFRhbGtUb3BpYy5tZXRhVHlwZSA9IFwicG9sbFwiO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGFsay5mdWxsVGFsa1RvcGljLm1ldGFUeXBlID0gXCJtZXNzYWdlXCI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRhbGsuZnVsbFRhbGtGaXJzdE1lc3NhZ2VzID0gbWVzc2FnZUNsaWVudC5nZXRGaXJzdExldmVsTWVzc2FnZXModGFsa0lkLCB0YWxrLnNlbGVjdGVkR3JvdXAuaWQsIDEsICRyb290U2NvcGUuYmFzZS5sYXN0TG9hZGVkSWQsIDAsIDEwKS5tZXNzYWdlcztcclxuXHJcbiAgICAgICAgICAgICRyb290U2NvcGUuYmFzZS5sYXN0TG9hZGVkSWQgPSAkcm9vdFNjb3BlLmJhc2UuaW5pdEZpcnN0TWVzc2FnZXModGFsay5mdWxsVGFsa0ZpcnN0TWVzc2FnZXMpO1xyXG5cclxuICAgICAgICAgICAgJHJvb3RTY29wZS5iYXNlLmlzVGFsa1RpdGxlcyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLmJhc2UubWFpbkNvbnRlbnRUb3BJc0hpZGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLmJhc2UuY3JlYXRlVG9waWNJc0hpZGUgPSB0cnVlO1xyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBzaG93RnVsbFRhbGsodGFsayx0YWxrSWQpO1xyXG5cclxuICAgICAgICB2YXIgaW5pdEZsYWdzVG9waWMgPSBbXTtcclxuICAgICAgICB0YWxrLnNob3dUb3BpY0Fuc3dlcklucHV0ID0gZnVuY3Rpb24oZXZlbnQsZnVsbFRhbGtUb3BpYyl7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICB0YWxrLmFuc3dlclNob3cgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgaWYoIWluaXRGbGFnc1RvcGljW2Z1bGxUYWxrVG9waWMuaWRdKSB7XHJcbiAgICAgICAgICAgICAgICBpbml0RmxhZ3NUb3BpY1tmdWxsVGFsa1RvcGljLmlkXSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRhbGsuZnVsbFRhbGtUb3BpYy5hbnN3ZXJJbnB1dElzU2hvdyA/XHJcbiAgICAgICAgICAgICAgICB0YWxrLmZ1bGxUYWxrVG9waWMuYW5zd2VySW5wdXRJc1Nob3cgPSBmYWxzZSA6XHJcbiAgICAgICAgICAgICAgICB0YWxrLmZ1bGxUYWxrVG9waWMuYW5zd2VySW5wdXRJc1Nob3cgPSB0cnVlIDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB2YXIgaW5pdEZsYWdzTWVzc2FnZSA9IFtdO1xyXG4gICAgICAgIHRhbGsuc2hvd01lc3NhZ2VBbnN3ZXJJbnB1dCA9IGZ1bmN0aW9uKGV2ZW50LGZ1bGxUYWxrVG9waWMsZmlyc3RNZXNzYWdlLG1lc3NhZ2Upe1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB2YXIgYXR0YWNoSWQ7XHJcblxyXG4gICAgICAgICAgICBpZighbWVzc2FnZSl7XHJcbiAgICAgICAgICAgICAgICAvLyDQtdGB0LvQuCDRjdGC0L4g0YHQvtC+0LHRidC10L3QuNC1INC/0LXRgNCy0L7Qs9C+INGD0YDQvtCy0L3Rj1xyXG4gICAgICAgICAgICAgICAgZmlyc3RNZXNzYWdlLmlzVGFsayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAvL2ZpcnN0TWVzc2FnZS5pc0VkaXQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICBhdHRhY2hJZCA9IGZ1bGxUYWxrVG9waWMuaWQrJy0nK2ZpcnN0TWVzc2FnZS5pZDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZighdGFsay5mdWxsVGFsa0ZpcnN0TWVzc2FnZXMpIHRhbGsuZnVsbFRhbGtGaXJzdE1lc3NhZ2VzID0gbWVzc2FnZUNsaWVudC5nZXRGaXJzdExldmVsTWVzc2FnZXModGFsa0lkLHRhbGsuc2VsZWN0ZWRHcm91cC5pZCwxLDAsMCwxMDAwKS5tZXNzYWdlcztcclxuICAgICAgICAgICAgICAgIHZhciBmdWxsVGFsa0ZpcnN0TWVzc2FnZXNMZW5ndGggPSB0YWxrLmZ1bGxUYWxrRmlyc3RNZXNzYWdlcy5sZW5ndGg7XHJcblxyXG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5iYXNlLmluaXRTdGFydFBhcmFtc0ZvckNyZWF0ZU1lc3NhZ2UoZmlyc3RNZXNzYWdlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBmaXJzdE1lc3NhZ2UuYW5zd2VySW5wdXRJc1Nob3cgP1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0TWVzc2FnZS5hbnN3ZXJJbnB1dElzU2hvdyA9IGZhbHNlIDpcclxuICAgICAgICAgICAgICAgICAgICBmaXJzdE1lc3NhZ2UuYW5zd2VySW5wdXRJc1Nob3cgPSB0cnVlO1xyXG5cclxuXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgLy8g0LXRgdC70Lgg0L/RgNC+0YHRgtC+0LUg0YHQvtC+0LHRidC10L3QuNC1XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlLmlzVGFsayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAvL21lc3NhZ2UuaXNFZGl0ID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgYXR0YWNoSWQgPSBmdWxsVGFsa1RvcGljLmlkKyctJyttZXNzYWdlLmlkO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKCF0YWxrLmZ1bGxUYWxrTWVzc2FnZXNbZmlyc3RNZXNzYWdlLmlkXSkgdGFsay5mdWxsVGFsa01lc3NhZ2VzW2ZpcnN0TWVzc2FnZS5pZF0gPSBtZXNzYWdlQ2xpZW50LmdldE1lc3NhZ2VzKHRhbGtJZCx0YWxrLnNlbGVjdGVkR3JvdXAuaWQsMSxmaXJzdE1lc3NhZ2UuaWQsMCwxMDAwKS5tZXNzYWdlcztcclxuICAgICAgICAgICAgICAgIHZhciAgZnVsbFRhbGtNZXNzYWdlc0xlbmd0aCA9IHRhbGsuZnVsbFRhbGtNZXNzYWdlc1tmaXJzdE1lc3NhZ2UuaWRdLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmJhc2UuaW5pdFN0YXJ0UGFyYW1zRm9yQ3JlYXRlTWVzc2FnZShtZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UuYW5zd2VySW5wdXRJc1Nob3cgP1xyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuYW5zd2VySW5wdXRJc1Nob3cgPSBmYWxzZSA6XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5hbnN3ZXJJbnB1dElzU2hvdyA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZighaW5pdEZsYWdzTWVzc2FnZVthdHRhY2hJZF0pIHtcclxuICAgICAgICAgICAgICAgIC8vaW5pdEF0dGFjaEltYWdlKCQoJyNhdHRhY2hJbWFnZS0nICsgYXR0YWNoSWQpLCAkKCcjYXR0YWNoLWFyZWEtJyArIGF0dGFjaElkKSk7XHJcbiAgICAgICAgICAgICAgICAvL2luaXRBdHRhY2hEb2MoJCgnI2F0dGFjaERvYy0nICsgYXR0YWNoSWQpLCAkKCcjYXR0YWNoLWRvYy1hcmVhLScgKyBhdHRhY2hJZCkpO1xyXG5cclxuICAgICAgICAgICAgICAgIGluaXRGbGFnc01lc3NhZ2VbYXR0YWNoSWRdID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRhbGsudG9nZ2xlVHJlZUZpcnN0TWVzc2FnZSA9IGZ1bmN0aW9uKGV2ZW50LGZpcnN0TWVzc2FnZSl7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICBmaXJzdE1lc3NhZ2UuaXNUcmVlT3BlbiA/XHJcbiAgICAgICAgICAgICAgICBmaXJzdE1lc3NhZ2UuaXNUcmVlT3BlbiA9IGZhbHNlIDpcclxuICAgICAgICAgICAgICAgIGZpcnN0TWVzc2FnZS5pc1RyZWVPcGVuID0gdHJ1ZSA7XHJcblxyXG5cclxuICAgICAgICAgICAgLy8gLS0tLS0tLS1cclxuXHJcbiAgICAgICAgICAgIHRhbGsuZnVsbFRhbGtNZXNzYWdlc1tmaXJzdE1lc3NhZ2UuaWRdID0gbWVzc2FnZUNsaWVudC5nZXRNZXNzYWdlcyh0YWxrSWQsdGFsay5zZWxlY3RlZEdyb3VwLmlkLDEsZmlyc3RNZXNzYWdlLmlkLDAsMTAwMCkubWVzc2FnZXM7XHJcbiAgICAgICAgICAgIHRhbGsuZnVsbFRhbGtNZXNzYWdlc1tmaXJzdE1lc3NhZ2UuaWRdID9cclxuICAgICAgICAgICAgICAgIGZ1bGxUYWxrTWVzc2FnZXNMZW5ndGggPSB0YWxrLmZ1bGxUYWxrTWVzc2FnZXNbZmlyc3RNZXNzYWdlLmlkXS5sZW5ndGg6XHJcbiAgICAgICAgICAgICAgICBmdWxsVGFsa01lc3NhZ2VzTGVuZ3RoID0gMDtcclxuICAgICAgICAgICAgaWYodGFsay5mdWxsVGFsa01lc3NhZ2VzW2ZpcnN0TWVzc2FnZS5pZF0gPT09IG51bGwpIHRhbGsuZnVsbFRhbGtNZXNzYWdlc1tmaXJzdE1lc3NhZ2UuaWRdID0gW107XHJcblxyXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgZnVsbFRhbGtNZXNzYWdlc0xlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIHRhbGsuZnVsbFRhbGtNZXNzYWdlc1tmaXJzdE1lc3NhZ2UuaWRdW2ldLmFuc3dlcklucHV0SXNTaG93ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0YWxrLmZ1bGxUYWxrTWVzc2FnZXNbZmlyc3RNZXNzYWdlLmlkXVtpXS5pc1RyZWVPcGVuID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRhbGsuZnVsbFRhbGtNZXNzYWdlc1tmaXJzdE1lc3NhZ2UuaWRdW2ldLmlzT3BlbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0YWxrLmZ1bGxUYWxrTWVzc2FnZXNbZmlyc3RNZXNzYWdlLmlkXVtpXS5pc1BhcmVudE9wZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGFsay5mdWxsVGFsa01lc3NhZ2VzW2ZpcnN0TWVzc2FnZS5pZF1baV0uY3JlYXRlZEVkaXQgPSBnZXRUaW1pbmcodGFsay5mdWxsVGFsa01lc3NhZ2VzW2ZpcnN0TWVzc2FnZS5pZF1baV0uY3JlYXRlZCk7XHJcbiAgICAgICAgICAgICAgICB0YWxrLmZ1bGxUYWxrTWVzc2FnZXNbZmlyc3RNZXNzYWdlLmlkXVtpXS5jb21tZW50VGV4dCA9IFRFWFRfREVGQVVMVF8yO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0YWxrLnRvZ2dsZVRyZWUgPSBmdW5jdGlvbihldmVudCxtZXNzYWdlLGZpcnN0TWVzc2FnZSl7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICBpZighdGFsay5mdWxsVGFsa01lc3NhZ2VzW2ZpcnN0TWVzc2FnZS5pZF0pIHRhbGsuZnVsbFRhbGtNZXNzYWdlc1tmaXJzdE1lc3NhZ2UuaWRdID0gbWVzc2FnZUNsaWVudC5nZXRNZXNzYWdlcyh0YWxrSWQsdGFsay5zZWxlY3RlZEdyb3VwLmlkLDEsZmlyc3RNZXNzYWdlLmlkLDAsMTAwMCkubWVzc2FnZXM7XHJcbiAgICAgICAgICAgIHZhciBmdWxsVGFsa01lc3NhZ2VzTGVuZ3RoID0gdGFsay5mdWxsVGFsa01lc3NhZ2VzW2ZpcnN0TWVzc2FnZS5pZF0ubGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgbWVzc2FnZS5pc1RyZWVPcGVuID9cclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UuaXNUcmVlT3BlbiA9IGZhbHNlIDpcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UuaXNUcmVlT3BlbiA9IHRydWUgO1xyXG5cclxuICAgICAgICAgICAgdmFyIGFmdGVyQ3VycmVudEluZGV4ID0gZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBuZXh0TWVzc2FnZU9uQ3VycmVudExldmVsID0gZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBsb29wTWVzc2FnZU9mZnNldCxcclxuICAgICAgICAgICAgICAgIHBhcmVudE9wZW5TdGF0dXMsXHJcbiAgICAgICAgICAgICAgICBhcmVBbGxNeVBhcmVudHNUcmVlT3BlbiA9IFtdLFxyXG4gICAgICAgICAgICAgICAgY2hlY2tBcmVBbGxNeVBhcmVudHNUcmVlT3BlbiA9IHRydWUsXHJcbiAgICAgICAgICAgICAgICBiZWdpbk9mZnNldCA9IG1lc3NhZ2Uub2Zmc2V0LFxyXG4gICAgICAgICAgICAgICAgcGFyZW50T3BlblN0YXR1c0FycmF5ID0gW107XHJcblxyXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgZnVsbFRhbGtNZXNzYWdlc0xlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxvb3BNZXNzYWdlT2Zmc2V0ID0gdGFsay5mdWxsVGFsa01lc3NhZ2VzW2ZpcnN0TWVzc2FnZS5pZF1baV0ub2Zmc2V0O1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKGFmdGVyQ3VycmVudEluZGV4ICYmICFuZXh0TWVzc2FnZU9uQ3VycmVudExldmVsXHJcbiAgICAgICAgICAgICAgICAgICAgJiYgbWVzc2FnZS5vZmZzZXQgPCBsb29wTWVzc2FnZU9mZnNldCl7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGFyZUFsbE15UGFyZW50c1RyZWVPcGVuW2xvb3BNZXNzYWdlT2Zmc2V0XSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGxvb3BNZXNzYWdlT2Zmc2V0IC0gbWVzc2FnZS5vZmZzZXQgPT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v0LXRgdC70Lgg0Y3RgtC+INC90LXQv9C+0YHRgNC10LTRgdGC0LLQtdC90L3Ri9C5INC/0L7RgtC+0LzQvtC6XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWxrLmZ1bGxUYWxrTWVzc2FnZXNbZmlyc3RNZXNzYWdlLmlkXVtpXS5pc09wZW4gP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFsay5mdWxsVGFsa01lc3NhZ2VzW2ZpcnN0TWVzc2FnZS5pZF1baV0uaXNPcGVuID0gZmFsc2UgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFsay5mdWxsVGFsa01lc3NhZ2VzW2ZpcnN0TWVzc2FnZS5pZF1baV0uaXNPcGVuID0gdHJ1ZSA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRPcGVuU3RhdHVzQXJyYXlbbG9vcE1lc3NhZ2VPZmZzZXRdID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50T3BlblN0YXR1cyA9IHRhbGsuZnVsbFRhbGtNZXNzYWdlc1tmaXJzdE1lc3NhZ2UuaWRdW2ldLmlzT3BlbjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGFsay5mdWxsVGFsa01lc3NhZ2VzW2ZpcnN0TWVzc2FnZS5pZF1baV0uaXNUcmVlT3Blbil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmVBbGxNeVBhcmVudHNUcmVlT3Blbltsb29wTWVzc2FnZU9mZnNldF0gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDQtdGB0LvQuCDRjdGC0L4g0L/RgtC+0LzQutC4INC/0L7RgtC+0LzQutCwXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja0FyZUFsbE15UGFyZW50c1RyZWVPcGVuID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yKHZhciBqID0gYmVnaW5PZmZzZXQ7IGogPCBsb29wTWVzc2FnZU9mZnNldDsgaisrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vINC/0YDQvtCy0LXRgNGP0LXQvCDQvdC10YIg0LvQuCDRgyDQutC+0LPQviDQsiDQv9GA0LXQtNC60LDRhSBpc1RyZWVPcGVuID0gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGFyZUFsbE15UGFyZW50c1RyZWVPcGVuW2pdID09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja0FyZUFsbE15UGFyZW50c1RyZWVPcGVuID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50T3BlblN0YXR1cyAmJiBjaGVja0FyZUFsbE15UGFyZW50c1RyZWVPcGVuID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhbGsuZnVsbFRhbGtNZXNzYWdlc1tmaXJzdE1lc3NhZ2UuaWRdW2ldLmlzT3BlbiA9IHRydWUgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFsay5mdWxsVGFsa01lc3NhZ2VzW2ZpcnN0TWVzc2FnZS5pZF1baV0uaXNPcGVuID0gZmFsc2UgO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0YWxrLmZ1bGxUYWxrTWVzc2FnZXNbZmlyc3RNZXNzYWdlLmlkXVtpXS5pc1RyZWVPcGVuKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vINC10YHQu9C4INGDINC60L7Qs9C+LdGC0L4g0LjQtyDQv9GA0LXQtNC60L7QsiDQvdC1INC+0YLQutGA0YvRgtC+INC00LXRgNC10LLQvlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJlQWxsTXlQYXJlbnRzVHJlZU9wZW5bbG9vcE1lc3NhZ2VPZmZzZXRdID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudE9wZW5TdGF0dXNBcnJheVtsb29wTWVzc2FnZU9mZnNldF0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoYWZ0ZXJDdXJyZW50SW5kZXggJiYgbG9vcE1lc3NhZ2VPZmZzZXQgPT0gbWVzc2FnZS5vZmZzZXQpe1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHRNZXNzYWdlT25DdXJyZW50TGV2ZWwgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYobWVzc2FnZS5pZCA9PSB0YWxrLmZ1bGxUYWxrTWVzc2FnZXNbZmlyc3RNZXNzYWdlLmlkXVtpXS5pZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgYWZ0ZXJDdXJyZW50SW5kZXggPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdmFyIGJ1ZmYsXHJcbiAgICAgICAgICAgIGxhc3RMb2FkZWRJZEZGO1xyXG4gICAgICAgIHRhbGsuYWRkTW9yZUl0ZW1zID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdmFyIHRlbXAgPSBtZXNzYWdlQ2xpZW50LmdldEZpcnN0TGV2ZWxNZXNzYWdlcyh0YWxrSWQsdGFsay5zZWxlY3RlZEdyb3VwLmlkLDEsJHJvb3RTY29wZS5iYXNlLmxhc3RMb2FkZWRJZCwwLDEwKSxcclxuICAgICAgICAgICAgICAgIGJ1ZmYgPSB0ZW1wLm1lc3NhZ2VzO1xyXG4gICAgICAgICAgICBpZihidWZmKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYnVmZkxlbmd0aCA9IGJ1ZmYubGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKGJ1ZmZMZW5ndGggIT0gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmJhc2UubGFzdExvYWRlZElkID0gYnVmZltidWZmTGVuZ3RoIC0gMV0uaWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGxhc3RMb2FkZWRJZEZGICE9ICRyb290U2NvcGUuYmFzZS5sYXN0TG9hZGVkSWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS5iYXNlLmluaXRGaXJzdE1lc3NhZ2VzKGJ1ZmYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWxrLmZ1bGxUYWxrRmlyc3RNZXNzYWdlcyA9IHRhbGsuZnVsbFRhbGtGaXJzdE1lc3NhZ2VzLmNvbmNhdChidWZmKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxhc3RMb2FkZWRJZEZGID0gJHJvb3RTY29wZS5iYXNlLmxhc3RMb2FkZWRJZDtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5iYXNlLmVuZE9mTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgJCgnLm5nLWNsb2FrJykucmVtb3ZlQ2xhc3MoJ25nLWNsb2FrJyk7XHJcblxyXG4gICAgfTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gWyAnJHJvb3RTY29wZScsJyRzdGF0ZVBhcmFtcycsIHRhbGtzU2luZ2xlQ3RybCBdOyIsIlxyXG52YXIgdW5jb25maXJtZWRDdHJsID0gIGZ1bmN0aW9uKCRyb290U2NvcGUpIHtcclxuICAgICRyb290U2NvcGUuYmFzZS5pc0Zvb3RlckJvdHRvbSA9IHRydWU7XHJcbiAgICAkcm9vdFNjb3BlLmJhc2UubWFpbkNvbnRlbnRUb3BJc0hpZGUgPSB0cnVlO1xyXG4gICAgJHJvb3RTY29wZS5iYXNlLmhpZGVTaWRlYmFyID0gdHJ1ZTtcclxuXHJcbiAgICB2YXIgY3RybCA9IHRoaXM7XHJcbiAgICBjdHJsLnVzZXIgPSB1c2VyQ2xpZW50LmdldFNob3J0VXNlckluZm8oKTtcclxuICAgIGN0cmwuaXNFcnJvckNvbmZpcm0gPSBmYWxzZTtcclxuXHJcbiAgICBjdHJsLnVuY29uZkxvZ2luID0gZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgdmFyIGlzQ29uZmlybSA9IHVzZXJDbGllbnQuY29uZmlybVVzZXJBZGRyZXNzKGN0cmwuY29kZSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coaXNDb25maXJtKTtcclxuICAgICAgICBpZihpc0NvbmZpcm0pe1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLmJhc2UubWUuYWRkcmVzc0NvbmZpcm1lZCA9IHRydWU7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGN0cmwuaXNFcnJvckNvbmZpcm0gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIGFuZ3VsYXIuZWxlbWVudCgkKCcudW5jb25maXJtJykpLmNzcyh7J21pbi1oZWlnaHQnOiAkKHdpbmRvdykuaGVpZ2h0KCktMTA1fSk7XHJcblxyXG4gICAgJCgnLm5nLWNsb2FrJykucmVtb3ZlQ2xhc3MoJ25nLWNsb2FrJyk7XHJcblxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBbICckcm9vdFNjb3BlJywgdW5jb25maXJtZWRDdHJsIF07IiwiXHJcbnZhciB3YWxsQ3RybCA9IGZ1bmN0aW9uKCRyb290U2NvcGUsJHN0YXRlKSB7XHJcblxyXG4gICAgdmFyIGxlbnRhID0gdGhpcztcclxuXHJcbiAgICAvKiovXHJcblxyXG4gICAgbGVudGEuaXNHcm91cHNJbk1lc3NTaG93ID0gZmFsc2U7XHJcbiAgICBsZW50YS5pc1J1YnJpY3NJbk1lc3NTaG93ID0gZmFsc2U7XHJcbiAgICBsZW50YS5pc09wZW5NZXNzYWdlQmFyID0gZmFsc2U7XHJcblxyXG4gICAgbGVudGEuc2hvd0dyb3VwcyA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbGVudGEuaXNHcm91cHNJbk1lc3NTaG93ID8gbGVudGEuaXNHcm91cHNJbk1lc3NTaG93ID0gZmFsc2UgOiBsZW50YS5pc0dyb3Vwc0luTWVzc1Nob3cgPSB0cnVlXHJcbiAgICB9O1xyXG5cclxuICAgIGxlbnRhLnNlbGVjdEdyb3VwTmV3ID0gZnVuY3Rpb24oZ3JvdXApe1xyXG4gICAgICAgIGxlbnRhLmlzR3JvdXBzSW5NZXNzU2hvdyA9IGZhbHNlO1xyXG4gICAgICAgIGxlbnRhLmlzQ3JlYXRlTWVzc2FnZUdyb3VwRXJyb3IgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy9sZW50YS5zZWxHcm91cE5hbWUgPSBncm91cC52aXNpYmxlTmFtZTtcclxuICAgICAgICAkcm9vdFNjb3BlLmJhc2Uuc2VsZWN0R3JvdXBJbkRyb3Bkb3duKGdyb3VwLmlkLGxlbnRhKTtcclxuICAgIH07XHJcblxyXG4gICAgbGVudGEuc2hvd1J1YnJpY3MgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIGxlbnRhLmlzUnVicmljc0luTWVzc1Nob3cgPyBsZW50YS5pc1J1YnJpY3NJbk1lc3NTaG93ID0gZmFsc2UgOiBsZW50YS5pc1J1YnJpY3NJbk1lc3NTaG93ID0gdHJ1ZVxyXG4gICAgfTtcclxuXHJcbiAgICBsZW50YS5zZWxlY3RSdWJyaWNOZXcgPSBmdW5jdGlvbihydWJyaWMsY3RybCl7XHJcbiAgICAgICAgbGVudGEuaXNSdWJyaWNzSW5NZXNzU2hvdyA9IGZhbHNlO1xyXG4gICAgICAgIGxlbnRhLmlzQ3JlYXRlTWVzc2FnZVJ1YnJpY0Vycm9yID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGlmKHJ1YnJpYykge1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLnNlbFJ1YnJpY05hbWUgPSBydWJyaWMudmlzaWJsZU5hbWU7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuc2VsUnVicmljTmFtZSA9IFwi0J7QsdGJ0LXQtVwiO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLmN1cnJlbnRSdWJyaWMgPSB7fTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS5jdXJyZW50UnVicmljLmlkID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8kcm9vdFNjb3BlLmJhc2Uuc2VsZWN0UnVicmljSW5Ecm9wZG93bihydWJyaWMuaWQsbGVudGEpO1xyXG4gICAgICAgIHZhciBydWJyaWNzTGVuZ3RoID0gdXNlckNsaWVudFJ1YnJpY3MubGVuZ3RoLFxyXG4gICAgICAgICAgICBzZWxlY3RlZFJ1YnJpYztcclxuXHJcbiAgICAgICAgLy9pZighY3RybC5pc0VkaXQpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBydWJyaWNzTGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChydWJyaWMuaWQgPT0gdXNlckNsaWVudFJ1YnJpY3NbaV0uaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmN1cnJlbnRSdWJyaWMgPSB1c2VyQ2xpZW50UnVicmljc1tpXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vfVxyXG5cclxuICAgICAgICBpZihjdHJsKXtcclxuICAgICAgICAgICAgcnVicmljID8gY3RybC5zZWxSdWJyaWNOYW1lID0gcnVicmljLnZpc2libGVOYW1lIDogY3RybC5zZWxSdWJyaWNOYW1lID0gXCLQntCx0YnQtdC1XCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyRyb290U2NvcGUuYmFzZS5idWZmZXJTZWxlY3RlZEdyb3VwID0gc2VsZWN0R3JvdXBJbkRyb3Bkb3duKGdyb3VwSWQpO1xyXG5cclxuICAgICAgICAvL2N0cmwuc2VsZWN0ZWRHcm91cCA9ICRyb290U2NvcGUuYmFzZS5idWZmZXJTZWxlY3RlZEdyb3VwO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyRyb290U2NvcGUuY3VycmVudFJ1YnJpYy5pZCA9IDA7XHJcblxyXG4gICAgbGVudGEuY2xvc2VJbnB1dCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbGVudGEuaXNDcmVhdGVNZXNzYWdlRXJyb3IgPSBmYWxzZTtcclxuICAgICAgICBsZW50YS5pc0NyZWF0ZU1lc3NhZ2VHcm91cEVycm9yID0gZmFsc2U7XHJcbiAgICAgICAgbGVudGEuaXNDcmVhdGVNZXNzYWdlUnVicmljRXJyb3IgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgbGVudGEuaXNPcGVuTWVzc2FnZUJhciA9IGZhbHNlO1xyXG4gICAgICAgIGxlbnRhLmlzR3JvdXBzSW5NZXNzU2hvdyA9IGZhbHNlO1xyXG4gICAgICAgIGxlbnRhLmlzUnVicmljc0luTWVzc1Nob3cgPSBmYWxzZTtcclxuICAgICAgICBsZW50YS5zZWxlY3RlZEdyb3VwID0gbGVudGEuc2VsR3JvdXBOYW1lID0gJHJvb3RTY29wZS5zZWxSdWJyaWNOYW1lID0gJHJvb3RTY29wZS5jdXJyZW50UnVicmljID0gbnVsbDtcclxuICAgICAgICBsZW50YS5tZXNzYWdlLmNvbnRlbnQgPSBURVhUX0RFRkFVTFRfMTtcclxuICAgIH07XHJcblxyXG4gICAgbGVudGEuaXNDcmVhdGVNZXNzYWdlRXJyb3IgPSB0cnVlO1xyXG4gICAgbGVudGEuY3JlYXRlTWVzc2FnZUVycm9yVGV4dCA9IFwi0JLRiyDQvdC1INGD0LrQsNC30LDQu9C4INCz0YDRg9C/0L/Rg1wiO1xyXG5cclxuICAgIC8qKi9cclxuXHJcbiAgICAkKCcubmctY2xvYWsnKS5yZW1vdmVDbGFzcygnbmctY2xvYWsnKTtcclxuICAgICAgICAkcm9vdFNjb3BlLnNldFRhYigxKTtcclxuICAgICAgICAkcm9vdFNjb3BlLmJhc2Uuc2hvd0FsbEdyb3VwcygpO1xyXG4gICAgICAgICRyb290U2NvcGUuYmFzZS5pc0Zvb3RlckJvdHRvbSA9IGZhbHNlO1xyXG5cclxuICAgICAgICB2YXIgbGFzdExvYWRlZElkID0gMCxcclxuICAgICAgICAgICAgbG9hZGVkTGVuZ3RoID0gMTA7XHJcblxyXG4gICAgICAgIHZhciBsZW4gPSB1c2VyQ2xpZW50R3JvdXBzLmxlbmd0aDtcclxuICAgICAgICBsZW50YS5pc0NyZWF0ZU5ld3NTaG93ID0gW107XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKXtcclxuICAgICAgICAgICAgbGVudGEuaXNDcmVhdGVOZXdzU2hvd1t1c2VyQ2xpZW50R3JvdXBzW2ldLmlkXSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL2xlbnRhLmlzQ3JlYXRlTmV3c1Nob3dbXSA9IGZhbHNlO1xyXG4gICAgICAgICRyb290U2NvcGUuQ09NTUVOVFNfREVGQVVMVF9DT1VOVCA9IDM7XHJcblxyXG4gICAgICAgIHZhciBsc19zZXRJbmZvX2dyb3VwSWQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVk9fc2V0SW5mb19ncm91cElkJyksXHJcbiAgICAgICAgICAgIGN1cnJlbnRHcm91cCA9IHVzZXJDbGllbnRHcm91cHNbM107XHJcblxyXG4gICAgICAgIGlmKGxzX3NldEluZm9fZ3JvdXBJZCl7XHJcbiAgICAgICAgICAgIHZhciBncm91cHNMZW5ndGggPSB1c2VyQ2xpZW50R3JvdXBzLmxlbmd0aDtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBncm91cHNMZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHVzZXJDbGllbnRHcm91cHNbaV0uaWQgPT0gbHNfc2V0SW5mb19ncm91cElkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudEdyb3VwID0gdXNlckNsaWVudEdyb3Vwc1tpXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnVk9fc2V0SW5mb19ncm91cElkJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIGxlbnRhLnNlbGVjdGVkR3JvdXBJblRvcCA9ICRyb290U2NvcGUuY3VycmVudEdyb3VwID1cclxuICAgICAgICAkcm9vdFNjb3BlLmJhc2UuYnVmZmVyU2VsZWN0ZWRHcm91cCA9IGN1cnJlbnRHcm91cDtcclxuICAgIC8vY29uc29sZS5sb2coJ2xlbnRhJywkcm9vdFNjb3BlLmN1cnJlbnRHcm91cC5pZCk7XHJcblxyXG4gICAgICAgIC8qaWYoISRyb290U2NvcGUuaW1wb3J0YW50SXNMb2FkZWRGcm9tVG9wKVxyXG4gICAgICAgICRyb290U2NvcGUuaW1wb3J0YW50VG9waWNzID0gbWVzc2FnZUNsaWVudC5nZXRJbXBvcnRhbnROZXdzKCRyb290U2NvcGUuY3VycmVudEdyb3VwLmlkKTtcclxuICAgICAgICAkcm9vdFNjb3BlLmltcG9ydGFudElzTG9hZGVkRnJvbVRvcCA9IGZhbHNlOyovXHJcblxyXG4gICAgICAgIGxlbnRhLmF0dGFjaElkID0gXCIwXCI7XHJcbiAgICAgICAgJHJvb3RTY29wZS5iYXNlLmluaXRTdGFydFBhcmFtc0ZvckNyZWF0ZVRvcGljKGxlbnRhKTtcclxuICAgICAgICBsZW50YS5zZWxlY3RlZEdyb3VwID0gbnVsbDtcclxuXHJcbiAgICAgICAgbGVudGEubWVzc2FnZSA9IHt9O1xyXG5cclxuICAgICAgICBsZW50YS5tZXNzYWdlLmNvbnRlbnQgPSBsZW50YS5tZXNzYWdlLmRlZmF1bHQgPSBURVhUX0RFRkFVTFRfMTtcclxuXHJcbiAgICAgICAgJHJvb3RTY29wZS53YWxsQ2hhbmdlUnVicmljID0gZnVuY3Rpb24ocnVicmljSWQpe1xyXG5cclxuICAgICAgICAgICAgbGVudGEud2FsbEl0ZW1zID0gbWVzc2FnZUNsaWVudC5nZXRXYWxsSXRlbXMoY3VycmVudEdyb3VwLmlkLCBydWJyaWNJZCwwLCBsb2FkZWRMZW5ndGgpO1xyXG5cclxuICAgICAgICAgICAgaWYobGVudGEud2FsbEl0ZW1zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgaW5pdFdhbGxJdGVtKGxlbnRhLndhbGxJdGVtcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGFzdExvYWRlZElkID0gbGVudGEud2FsbEl0ZW1zW2xlbnRhLndhbGxJdGVtcy5sZW5ndGgtMV0udG9waWMuaWQ7XHJcbiAgICAgICAgICAgICAgICBsYXN0TG9hZGVkSWRGRiA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYoJHN0YXRlLmN1cnJlbnQucnVicmljSWQpIHtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS53YWxsQ2hhbmdlUnVicmljKCRzdGF0ZS5jdXJyZW50LnJ1YnJpY0lkKTtcclxuICAgICAgICAgICAgJHN0YXRlLmN1cnJlbnQucnVicmljSWQgPSBudWxsO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLmN1cnJlbnRSdWJyaWMgPSB7fTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxlbnRhLndhbGxJdGVtcyA9IG1lc3NhZ2VDbGllbnQuZ2V0V2FsbEl0ZW1zKCRyb290U2NvcGUuYmFzZS5idWZmZXJTZWxlY3RlZEdyb3VwLmlkLCRyb290U2NvcGUuY3VycmVudFJ1YnJpYy5pZCwwLGxvYWRlZExlbmd0aCk7XHJcblxyXG4gICAgICAgIHZhciB3YWxsSXRlbXNMZW5ndGg7XHJcbiAgICAgICAgbGVudGEud2FsbEl0ZW1zID8gd2FsbEl0ZW1zTGVuZ3RoID0gbGVudGEud2FsbEl0ZW1zLmxlbmd0aCA6XHJcbiAgICAgICAgICAgIHdhbGxJdGVtc0xlbmd0aCA9IDA7XHJcblxyXG4gICAgICAgIGlmKHdhbGxJdGVtc0xlbmd0aCAhPSAwKSBsYXN0TG9hZGVkSWQgPSBsZW50YS53YWxsSXRlbXNbd2FsbEl0ZW1zTGVuZ3RoLTFdLnRvcGljLmlkO1xyXG5cclxuICAgICAgICBpbml0V2FsbEl0ZW0obGVudGEud2FsbEl0ZW1zKTtcclxuXHJcbiAgICAgICAgJHJvb3RTY29wZS5zZWxlY3RHcm91cEluRHJvcGRvd25fbGVudGEgPSBmdW5jdGlvbihncm91cElkKXtcclxuICAgICAgICAgICAgLy9sZW50YS5zZWxlY3RlZEdyb3VwID0gJHJvb3RTY29wZS5iYXNlLmJ1ZmZlclNlbGVjdGVkR3JvdXAgPSBzZWxlY3RHcm91cEluRHJvcGRvd24oZ3JvdXBJZCk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuYmFzZS5idWZmZXJTZWxlY3RlZEdyb3VwID0gc2VsZWN0R3JvdXBJbkRyb3Bkb3duKGdyb3VwSWQpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxlbnRhLmdvVG9BbnN3ZXJJbnB1dCA9IGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB2YXIgaW5pdEZsYWdzQXJyYXkgPSBbXTtcclxuICAgICAgICBsZW50YS5zaG93QW5zd2VySW5wdXQgPSBmdW5jdGlvbihldmVudCx3YWxsSXRlbSx3YWxsTWVzc2FnZSl7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAvKndhbGxJdGVtLmFuc3dlclNob3cgP1xyXG4gICAgICAgICAgICAgICAgd2FsbEl0ZW0uYW5zd2VyU2hvdyA9IGZhbHNlIDoqL1xyXG4gICAgICAgICAgICAgICAgd2FsbEl0ZW0uYW5zd2VyU2hvdyA9IHRydWUgO1xyXG4gICAgICAgICAgICAgICAgd2FsbEl0ZW0uaXNGb2N1cyA9IHRydWUgO1xyXG5cclxuICAgICAgICAgICAgaWYod2FsbE1lc3NhZ2Upe1xyXG4gICAgICAgICAgICAgICAgdmFyIGF1dGhvck5hbWU7XHJcbiAgICAgICAgICAgICAgICB3YWxsTWVzc2FnZS51c2VySW5mbyA/XHJcbiAgICAgICAgICAgICAgICAgICAgYXV0aG9yTmFtZSA9IHdhbGxNZXNzYWdlLnVzZXJJbmZvLmZpcnN0TmFtZSA6XHJcbiAgICAgICAgICAgICAgICAgICAgYXV0aG9yTmFtZSA9IHdhbGxNZXNzYWdlLmF1dGhvck5hbWUuc3BsaXQoJyAnKVswXTtcclxuICAgICAgICAgICAgICAgIHdhbGxJdGVtLmNvbW1lbnRUZXh0ID0gYXV0aG9yTmFtZStcIiwgXCI7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgd2FsbEl0ZW0uY29tbWVudFRleHQgPSBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZighaW5pdEZsYWdzQXJyYXlbd2FsbEl0ZW0udG9waWMuaWRdKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDQuNC90LjRhNC40YbQsNC70LjQt9Cw0YbQvNGOIEF0dGFjaEltYWdlINC90YPQttC90L4g0LTQtdC70LDRgtGMINGC0L7Qu9GM0LrQviDQvtC00LjQvSDRgNCw0Lcg0LTQu9GPINC60LDQttC00L7Qs9C+INGB0L7QvtCx0YnQtdC90LjRj1xyXG4gICAgICAgICAgICAgICAgaW5pdEZsYWdzQXJyYXlbd2FsbEl0ZW0udG9waWMuaWRdID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkcm9vdFNjb3BlLndhbGxDaGFuZ2VHcm91cCA9IGZ1bmN0aW9uKGdyb3VwSWQpe1xyXG5cclxuICAgICAgICAgICAgbGVudGEud2FsbEl0ZW1zID0gbWVzc2FnZUNsaWVudC5nZXRXYWxsSXRlbXMoZ3JvdXBJZCwgJHJvb3RTY29wZS5jdXJyZW50UnVicmljLmlkLDAsIGxvYWRlZExlbmd0aCk7XHJcblxyXG4gICAgICAgICAgICBpZihsZW50YS53YWxsSXRlbXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBpbml0V2FsbEl0ZW0obGVudGEud2FsbEl0ZW1zKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsYXN0TG9hZGVkSWQgPSBsZW50YS53YWxsSXRlbXNbbGVudGEud2FsbEl0ZW1zLmxlbmd0aC0xXS50b3BpYy5pZDtcclxuICAgICAgICAgICAgICAgIGxhc3RMb2FkZWRJZEZGID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBpbml0V2FsbEl0ZW0od2FsbEl0ZW1zKXtcclxuICAgICAgICAgICAgd2FsbEl0ZW1zTGVuZ3RoID0gd2FsbEl0ZW1zLmxlbmd0aDtcclxuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHdhbGxJdGVtc0xlbmd0aDsgaSsrKXtcclxuXHJcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmJhc2UuaW5pdFN0YXJ0UGFyYW1zRm9yQ3JlYXRlTWVzc2FnZSh3YWxsSXRlbXNbaV0pO1xyXG5cclxuICAgICAgICAgICAgICAgICRyb290U2NvcGUuYmFzZS5pbml0U3RhcnRQYXJhbXNGb3JDcmVhdGVUb3BpYyh3YWxsSXRlbXNbaV0udG9waWMpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vICB3YWxsSXRlbXNbaV0udG9waWMubWVzc2FnZS5ncm91cElkINGB0LXQudGH0LDRgSDQvdC1INC30LDQtNCw0L3QsCDQv9C+0YfQtdC80YMt0YLQvlxyXG4gICAgICAgICAgICAgICAgd2FsbEl0ZW1zW2ldLmxhYmVsID0gZ2V0TGFiZWwoJHJvb3RTY29wZS5iYXNlLmdyb3Vwcyx3YWxsSXRlbXNbaV0udG9waWMuZ3JvdXBUeXBlKTtcclxuXHJcbiAgICAgICAgICAgICAgICB3YWxsSXRlbXNbaV0udGFnQ29sb3IgPSBnZXRUYWdDb2xvcih3YWxsSXRlbXNbaV0ubGFiZWwpO1xyXG5cclxuICAgICAgICAgICAgICAgIHdhbGxJdGVtc1tpXS5pc09wZW4gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZih3YWxsSXRlbXNbaV0udG9waWMubWVzc2FnZS5pbXBvcnRhbnQgPT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgd2FsbEl0ZW1zW2ldLnRvcGljLm1lc3NhZ2UuaW1wb3J0YW50VGV4dCA9ICfQodC90Y/RgtGMINC80LXRgtC60YMgXCLQktCw0LbQvdC+0LVcIic7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB3YWxsSXRlbXNbaV0udG9waWMubWVzc2FnZS5pbXBvcnRhbnRUZXh0ID0gJ9Cf0L7QvNC10YLQuNGC0Ywg0LrQsNC6IFwi0JLQsNC20L3QvtC1XCInO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKHdhbGxJdGVtc1tpXS50b3BpYy5tZXNzYWdlLnR5cGUgPT0gMSl7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHdhbGxJdGVtc1tpXS50b3BpYy5sYXN0VXBkYXRlRWRpdCA9IGdldFRpbWluZyh3YWxsSXRlbXNbaV0udG9waWMubGFzdFVwZGF0ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYod2FsbEl0ZW1zW2ldLnRvcGljLm1lc3NhZ2UudHlwZSA9PSA1KXtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgd2FsbEl0ZW1zW2ldLnRvcGljLm1lc3NhZ2UuY3JlYXRlZEVkaXQgPSBnZXRUaW1pbmcod2FsbEl0ZW1zW2ldLnRvcGljLm1lc3NhZ2UuY3JlYXRlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgd2FsbEl0ZW1zW2ldLnRvcGljLmF1dGhvck5hbWUgPSBnZXRBdXRob3JOYW1lKHdhbGxJdGVtc1tpXS50b3BpYy51c2VySW5mbyk7XHJcbiAgICAgICAgICAgICAgICAgICAgd2FsbEl0ZW1zW2ldLnRvcGljLm1ldGFUeXBlID0gXCJtZXNzYWdlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgd2FsbEl0ZW1zW2ldLnRvcGljLnJ1YnJpYyA9IGdldFRvcGljUnVicmljKHdhbGxJdGVtc1tpXS50b3BpYyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtZXNMZW47XHJcbiAgICAgICAgICAgICAgICAgICAgd2FsbEl0ZW1zW2ldLm1lc3NhZ2VzID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzTGVuID0gd2FsbEl0ZW1zW2ldLm1lc3NhZ2VzLmxlbmd0aDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzTGVuID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yKHZhciBqID0gMDsgaiA8IG1lc0xlbjsgaisrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2FsbEl0ZW1zW2ldLm1lc3NhZ2VzW2pdLmNyZWF0ZWRFZGl0ID0gZ2V0VGltaW5nKHdhbGxJdGVtc1tpXS5tZXNzYWdlc1tqXS5jcmVhdGVkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2FsbEl0ZW1zW2ldLm1lc3NhZ2VzW2pdLmF1dGhvck5hbWUgPSBnZXRBdXRob3JOYW1lKHdhbGxJdGVtc1tpXS5tZXNzYWdlc1tqXS51c2VySW5mbyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdhbGxJdGVtc1tpXS5tZXNzYWdlc1tqXS5pc0VkaXQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuYmFzZS5pbml0U3RhcnRQYXJhbXNGb3JDcmVhdGVNZXNzYWdlKHdhbGxJdGVtc1tpXS5tZXNzYWdlc1tqXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAobWVzTGVuID49ICRyb290U2NvcGUuQ09NTUVOVFNfREVGQVVMVF9DT1VOVCkgP1xyXG4gICAgICAgICAgICAgICAgICAgIHdhbGxJdGVtc1tpXS5idWZmZXJNZXNzYWdlcyA9IHdhbGxJdGVtc1tpXS5tZXNzYWdlcy5zbGljZShtZXNMZW4tJHJvb3RTY29wZS5DT01NRU5UU19ERUZBVUxUX0NPVU5UKTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2FsbEl0ZW1zW2ldLmJ1ZmZlck1lc3NhZ2VzID0gd2FsbEl0ZW1zW2ldLm1lc3NhZ2VzO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZih3YWxsSXRlbXNbaV0udG9waWMucG9sbCAhPSBudWxsKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/Qt9C90LDRh9C40YIg0Y3RgtC+INC+0L/RgNC+0YFcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0UG9sbEVkaXROYW1lcyh3YWxsSXRlbXNbaV0udG9waWMucG9sbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3YWxsSXRlbXNbaV0udG9waWMubWV0YVR5cGUgPSBcInBvbGxcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxlbnRhLnRvZ2dsZUNvbW1lbnRzID0gZnVuY3Rpb24oZXZlbnQsd2FsbEl0ZW0pe1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgdmFyIG1lc0xlbiA9IHdhbGxJdGVtLm1lc3NhZ2VzLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgIGlmKHdhbGxJdGVtLmlzT3Blbil7XHJcbiAgICAgICAgICAgICAgICB3YWxsSXRlbS5pc09wZW4gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICAobWVzTGVuID49ICRyb290U2NvcGUuQ09NTUVOVFNfREVGQVVMVF9DT1VOVCkgP1xyXG4gICAgICAgICAgICAgICAgICAgIHdhbGxJdGVtLmJ1ZmZlck1lc3NhZ2VzID0gd2FsbEl0ZW0ubWVzc2FnZXMuc2xpY2UobWVzTGVuLSRyb290U2NvcGUuQ09NTUVOVFNfREVGQVVMVF9DT1VOVCk6XHJcbiAgICAgICAgICAgICAgICAgICAgd2FsbEl0ZW0uYnVmZmVyTWVzc2FnZXMgPSB3YWxsSXRlbS5tZXNzYWdlcztcclxuXHJcbiAgICAgICAgICAgICAgICAvL3dhbGxJdGVtLmJ1ZmZlck1lc3NhZ2VzID0gd2FsbEl0ZW0ubWVzc2FnZXMuc2xpY2UobWVzTGVuLWxlbnRhLkNPTU1FTlRTX0RFRkFVTFRfQ09VTlQpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHdhbGxJdGVtLmlzT3BlbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB3YWxsSXRlbS5idWZmZXJNZXNzYWdlcyA9IHdhbGxJdGVtLm1lc3NhZ2VzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdmFyIGxhc3RMb2FkZWRJZEZGO1xyXG4gICAgICAgIGxlbnRhLmFkZE1vcmVJdGVtcyA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIC8vbGFzdExvYWRlZElkRkYgPSBsYXN0TG9hZGVkSWQ7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdhZGRNb3JlSXRlbXMnLGxhc3RMb2FkZWRJZCxsb2FkZWRMZW5ndGgsJHJvb3RTY29wZS5iYXNlLmJ1ZmZlclNlbGVjdGVkR3JvdXAuaWQsJHJvb3RTY29wZS5jdXJyZW50UnVicmljKTtcclxuICAgICAgICAgICAgaWYod2FsbEl0ZW1zTGVuZ3RoID09IDEwKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYnVmZiA9IG1lc3NhZ2VDbGllbnQuZ2V0V2FsbEl0ZW1zKCRyb290U2NvcGUuYmFzZS5idWZmZXJTZWxlY3RlZEdyb3VwLmlkLCRyb290U2NvcGUuY3VycmVudFJ1YnJpYy5pZCwgbGFzdExvYWRlZElkLCBsb2FkZWRMZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJ1ZmYpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJ1ZmZMZW5ndGggPSBidWZmLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJ1ZmZMZW5ndGggIT0gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdExvYWRlZElkID0gYnVmZltidWZmTGVuZ3RoIC0gMV0udG9waWMuaWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihsYXN0TG9hZGVkSWRGRiAhPSBsYXN0TG9hZGVkSWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluaXRXYWxsSXRlbShidWZmKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlbnRhLndhbGxJdGVtcyA9IGxlbnRhLndhbGxJdGVtcy5jb25jYXQoYnVmZik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RMb2FkZWRJZEZGID0gbGFzdExvYWRlZElkO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAkcm9vdFNjb3BlLmluaXRDcmVhdGVUb3BpYyhsZW50YSk7XHJcblxyXG4gICAgICAgIGluaXRGYW5jeUJveCgkKCcuZm9ydW0nKSk7XHJcblxyXG4gICAgfTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gWyAnJHJvb3RTY29wZScsJyRzdGF0ZScsIHdhbGxDdHJsIF07IiwiXHJcbnZhciB3YWxsU2luZ2xlQ3RybCA9IGZ1bmN0aW9uKCRyb290U2NvcGUsICRzdGF0ZVBhcmFtcyl7XHJcbiAgICAgICAgdmFyIHdhbGxTaW5nbGUgPSB0aGlzO1xyXG5cclxuICAgICAgICAkcm9vdFNjb3BlLmJhc2UubWFpbkNvbnRlbnRUb3BJc0hpZGUgPSB0cnVlO1xyXG4gICAgICAgICRyb290U2NvcGUuYmFzZS5pc0Zvb3RlckJvdHRvbSA9IGZhbHNlO1xyXG4gICAgICAgIGluaXRGYW5jeUJveCgkKCcubGVudGEtaXRlbScpKTtcclxuXHJcbiAgICAgICAgLy8g0LLRgNC10LzQtdC90L3Qviwg0L3Rg9C20L3QsCDRhNGD0L3QutGG0LjRjyBnZXRXYWxsSXRlbSh0b3BpY0lkKVxyXG4gICAgICAgICRyb290U2NvcGUuY3VycmVudEdyb3VwLmlkID0gZ2V0RGVmYXVsdEdyb3VwKCRyb290U2NvcGUuYmFzZS5ncm91cHMpLmlkO1xyXG4gICAgICAgIHZhciB3YWxsSXRlbXMgPSBtZXNzYWdlQ2xpZW50LmdldFdhbGxJdGVtcygkcm9vdFNjb3BlLmN1cnJlbnRHcm91cC5pZCwwLDAsMTAwMCksXHJcbiAgICAgICAgd2FsbEl0ZW1zTGVuZ3RoID0gd2FsbEl0ZW1zLmxlbmd0aDtcclxuXHJcbiAgICAvL2NvbnNvbGUubG9nKCcwJyx3YWxsSXRlbXMsJHN0YXRlUGFyYW1zLnRvcGljSWQpO1xyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB3YWxsSXRlbXNMZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKHdhbGxJdGVtc1tpXS50b3BpYy5pZCA9PSAkc3RhdGVQYXJhbXMudG9waWNJZCl7XHJcbiAgICAgICAgICAgICAgICB3YWxsU2luZ2xlLndhbGxJdGVtID0gd2FsbEl0ZW1zW2ldO1xyXG4gICAgICAgICAgICAgICAgd2FsbFNpbmdsZS53YWxsSXRlbS50b3BpYy5pc1dhbGxTaW5nbGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIC8vY29uc29sZS5sb2coJzExJyx3YWxsU2luZ2xlLndhbGxJdGVtLCRyb290U2NvcGUuY3VycmVudEdyb3VwLmlkKTtcclxuICAgICAgICAkcm9vdFNjb3BlLmJhc2UuaW5pdFN0YXJ0UGFyYW1zRm9yQ3JlYXRlTWVzc2FnZSh3YWxsU2luZ2xlLndhbGxJdGVtKTtcclxuICAgICAgICAkcm9vdFNjb3BlLmJhc2UuaW5pdFN0YXJ0UGFyYW1zRm9yQ3JlYXRlVG9waWMod2FsbFNpbmdsZS53YWxsSXRlbS50b3BpYyk7XHJcblxyXG4vKlxyXG4gICAgICAgIHdhbGxTaW5nbGUud2FsbEl0ZW0uY29tbWVudFRleHQgPSBURVhUX0RFRkFVTFRfMjtcclxuICAgICAgICB3YWxsU2luZ2xlLndhbGxJdGVtLmFuc3dlclNob3cgPSBmYWxzZTtcclxuICAgICAgICB3YWxsU2luZ2xlLndhbGxJdGVtLmlzRm9jdXMgPSBmYWxzZTtcclxuICAgICAgICB3YWxsU2luZ2xlLndhbGxJdGVtLmlzQ3JlYXRlQ29tbWVudEVycm9yID0gZmFsc2U7XHJcbiovXHJcblxyXG4gICAgICAgIGlmKHdhbGxTaW5nbGUud2FsbEl0ZW0udG9waWMubWVzc2FnZS5pbXBvcnRhbnQgPT0gMSl7XHJcbiAgICAgICAgICAgIHdhbGxTaW5nbGUud2FsbEl0ZW0udG9waWMubWVzc2FnZS5pbXBvcnRhbnRUZXh0ID0gJ9Ch0L3Rj9GC0Ywg0LzQtdGC0LrRgyBcItCS0LDQttC90L7QtVwiJztcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgd2FsbFNpbmdsZS53YWxsSXRlbS50b3BpYy5tZXNzYWdlLmltcG9ydGFudFRleHQgPSAn0J/QvtC80LXRgtC40YLRjCDQutCw0LogXCLQktCw0LbQvdC+0LVcIic7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyAgbGVudGEud2FsbEl0ZW1zW2ldLnRvcGljLm1lc3NhZ2UuZ3JvdXBJZCDRgdC10LnRh9Cw0YEg0L3QtSDQt9Cw0LTQsNC90LAg0L/QvtGH0LXQvNGDLdGC0L5cclxuICAgICAgICB3YWxsU2luZ2xlLndhbGxJdGVtLmxhYmVsID0gZ2V0TGFiZWwodXNlckNsaWVudEdyb3Vwcyx3YWxsU2luZ2xlLndhbGxJdGVtLnRvcGljLmdyb3VwVHlwZSk7XHJcblxyXG4gICAgICAgIHdhbGxTaW5nbGUud2FsbEl0ZW0udGFnQ29sb3IgPSBnZXRUYWdDb2xvcih3YWxsU2luZ2xlLndhbGxJdGVtLmxhYmVsKTtcclxuXHJcbiAgICAgICAgaWYod2FsbFNpbmdsZS53YWxsSXRlbS50b3BpYy5tZXNzYWdlLnR5cGUgPT0gMSl7XHJcblxyXG4gICAgICAgICAgICB3YWxsU2luZ2xlLndhbGxJdGVtLnRvcGljLmxhc3RVcGRhdGVFZGl0ID0gZ2V0VGltaW5nKHdhbGxTaW5nbGUud2FsbEl0ZW0udG9waWMubGFzdFVwZGF0ZSk7XHJcblxyXG4gICAgICAgIH1lbHNlIGlmKHdhbGxTaW5nbGUud2FsbEl0ZW0udG9waWMubWVzc2FnZS50eXBlID09IDUpe1xyXG5cclxuICAgICAgICAgICAgd2FsbFNpbmdsZS53YWxsSXRlbS50b3BpYy5tZXNzYWdlLmNyZWF0ZWRFZGl0ID0gZ2V0VGltaW5nKHdhbGxTaW5nbGUud2FsbEl0ZW0udG9waWMubWVzc2FnZS5jcmVhdGVkKTtcclxuICAgICAgICAgICAgd2FsbFNpbmdsZS53YWxsSXRlbS50b3BpYy5hdXRob3JOYW1lID0gZ2V0QXV0aG9yTmFtZSh3YWxsU2luZ2xlLndhbGxJdGVtLnRvcGljLnVzZXJJbmZvKTtcclxuICAgICAgICAgICAgd2FsbFNpbmdsZS53YWxsSXRlbS50b3BpYy5tZXRhVHlwZSA9IFwibWVzc2FnZVwiO1xyXG5cclxuICAgICAgICAgICAgdmFyIG1lc0xlbjtcclxuICAgICAgICAgICAgd2FsbFNpbmdsZS53YWxsSXRlbS5tZXNzYWdlcyA/XHJcbiAgICAgICAgICAgICAgICBtZXNMZW4gPSB3YWxsU2luZ2xlLndhbGxJdGVtLm1lc3NhZ2VzLmxlbmd0aDpcclxuICAgICAgICAgICAgICAgIG1lc0xlbiA9IDA7XHJcblxyXG4gICAgICAgICAgICBmb3IodmFyIGogPSAwOyBqIDwgbWVzTGVuOyBqKyspe1xyXG4gICAgICAgICAgICAgICAgd2FsbFNpbmdsZS53YWxsSXRlbS5tZXNzYWdlc1tqXS5jcmVhdGVkRWRpdCA9IGdldFRpbWluZyh3YWxsU2luZ2xlLndhbGxJdGVtLm1lc3NhZ2VzW2pdLmNyZWF0ZWQpO1xyXG4gICAgICAgICAgICAgICAgd2FsbFNpbmdsZS53YWxsSXRlbS5tZXNzYWdlc1tqXS5hdXRob3JOYW1lID0gZ2V0QXV0aG9yTmFtZSh3YWxsU2luZ2xlLndhbGxJdGVtLm1lc3NhZ2VzW2pdLnVzZXJJbmZvKTtcclxuICAgICAgICAgICAgICAgIHdhbGxTaW5nbGUud2FsbEl0ZW0ubWVzc2FnZXNbal0uaXNFZGl0ID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5iYXNlLmluaXRTdGFydFBhcmFtc0ZvckNyZWF0ZU1lc3NhZ2Uod2FsbFNpbmdsZS53YWxsSXRlbS5tZXNzYWdlc1tqXSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICBpZih3YWxsU2luZ2xlLndhbGxJdGVtLnRvcGljLnBvbGwgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICAvL9C30L3QsNGH0LjRgiDRjdGC0L4g0L7Qv9GA0L7RgVxyXG4gICAgICAgICAgICAgICAgc2V0UG9sbEVkaXROYW1lcyh3YWxsU2luZ2xlLndhbGxJdGVtLnRvcGljLnBvbGwpO1xyXG5cclxuICAgICAgICAgICAgICAgIHdhbGxTaW5nbGUud2FsbEl0ZW0udG9waWMubWV0YVR5cGUgPSBcInBvbGxcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGluaXRGbGFnc0FycmF5ID0gW107XHJcbiAgICAgICAgd2FsbFNpbmdsZS5zaG93QW5zd2VySW5wdXQgPSBmdW5jdGlvbihldmVudCx3YWxsSXRlbSx3YWxsTWVzc2FnZSl7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAvKndhbGxJdGVtLmFuc3dlclNob3cgP1xyXG4gICAgICAgICAgICAgd2FsbEl0ZW0uYW5zd2VyU2hvdyA9IGZhbHNlIDoqL1xyXG4gICAgICAgICAgICB3YWxsSXRlbS5hbnN3ZXJTaG93ID0gdHJ1ZSA7XHJcbiAgICAgICAgICAgIHdhbGxJdGVtLmlzRm9jdXMgPSB0cnVlIDtcclxuXHJcbiAgICAgICAgICAgIGlmKHdhbGxNZXNzYWdlKXtcclxuICAgICAgICAgICAgICAgIHZhciBhdXRob3JOYW1lO1xyXG4gICAgICAgICAgICAgICAgd2FsbE1lc3NhZ2UudXNlckluZm8gP1xyXG4gICAgICAgICAgICAgICAgICAgIGF1dGhvck5hbWUgPSB3YWxsTWVzc2FnZS51c2VySW5mby5maXJzdE5hbWUgOlxyXG4gICAgICAgICAgICAgICAgICAgIGF1dGhvck5hbWUgPSB3YWxsTWVzc2FnZS5hdXRob3JOYW1lLnNwbGl0KCcgJylbMF07XHJcbiAgICAgICAgICAgICAgICB3YWxsSXRlbS5jb21tZW50VGV4dCA9IGF1dGhvck5hbWUrXCIsIFwiO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHdhbGxJdGVtLmNvbW1lbnRUZXh0ID0gXCJcIjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoIWluaXRGbGFnc0FycmF5W3dhbGxJdGVtLnRvcGljLmlkXSkge1xyXG4gICAgICAgICAgICAgICAgLy8g0LjQvdC40YTQuNGG0LDQu9C40LfQsNGG0LzRjiBBdHRhY2hJbWFnZSDQvdGD0LbQvdC+INC00LXQu9Cw0YLRjCDRgtC+0LvRjNC60L4g0L7QtNC40L0g0YDQsNC3INC00LvRjyDQutCw0LbQtNC+0LPQviDRgdC+0L7QsdGJ0LXQvdC40Y9cclxuICAgICAgICAgICAgICAgIC8vaW5pdEF0dGFjaEltYWdlKCQoJyNhdHRhY2hJbWFnZS0nICsgd2FsbEl0ZW0udG9waWMuaWQpLCAkKCcjYXR0YWNoLWFyZWEtJyArIHdhbGxJdGVtLnRvcGljLmlkKSk7XHJcbiAgICAgICAgICAgICAgICAvL2luaXRBdHRhY2hEb2MoJCgnI2F0dGFjaERvYy0nICsgd2FsbEl0ZW0udG9waWMuaWQpLCAkKCcjYXR0YWNoLWRvYy1hcmVhLScgKyB3YWxsSXRlbS50b3BpYy5pZCkpO1xyXG4gICAgICAgICAgICAgICAgaW5pdEZsYWdzQXJyYXlbd2FsbEl0ZW0udG9waWMuaWRdID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkKCcubmctY2xvYWsnKS5yZW1vdmVDbGFzcygnbmctY2xvYWsnKTtcclxuICAgIH07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFsgJyRyb290U2NvcGUnLCckc3RhdGVQYXJhbXMnLCB3YWxsU2luZ2xlQ3RybCBdOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8qIERpcmVjdGl2ZXMgKi9cclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdmb3J1bS5kaXJlY3RpdmVzJywgW10pLlxyXG4gIGRpcmVjdGl2ZSgnbmdIYXNmb2N1cycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcclxuXHJcbiAgICAgICAgICAgIHNjb3BlLiR3YXRjaChhdHRycy5uZ0hhc2ZvY3VzLCBmdW5jdGlvbiAoblZhbCwgb1ZhbCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKG5WYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50WzBdLmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoc2NvcGUud2FsbEl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0Q2FyZXRUb1BvcyhlbGVtZW50WzBdLCBzY29wZS53YWxsSXRlbS5jb21tZW50VGV4dC5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKHNjb3BlLmN0cmwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29wZS5iYXNlLnRleHRhcmVhRm9jdXMoc2NvcGUuY3RybC5tZXNzYWdlLmNvbnRlbnQsc2NvcGUuY3RybC5tZXNzYWdlLmRlZmF1bHQsc2NvcGUuY3RybCx0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZWxlbWVudC5iaW5kKCdibHVyJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZihzY29wZS53YWxsSXRlbSl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUud2FsbEl0ZW0uaXNGb2N1cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLiRhcHBseShhdHRycy5uZ0hhc2ZvY3VzICsgXCIgPSBmYWxzZVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vc2NvcGUuJGFwcGx5KGF0dHJzLm5nU2hvdyArIFwiID0gZmFsc2VcIik7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZWxlbWVudC5iaW5kKCdrZXlkb3duJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChlLndoaWNoID09IDEzKVxyXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLiRhcHBseShhdHRycy5uZ0hhc2ZvY3VzICsgXCIgPSBmYWxzZVwiKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuICAgIC5kaXJlY3RpdmUoJ2J1dHRvbicsZnVuY3Rpb24oKXtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByZXN0cmljdCA6ICdFJyxcclxuICAgICAgICAgICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCxhdHRyaWJ1dGVzKXtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoJ2J0bicpO1xyXG4gICAgICAgICAgICAgICAgaWYoYXR0cmlidXRlcy50eXBlID09IFwic3VibWl0XCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoJ2J0bi1wcmltYXJ5Jyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZihhdHRyaWJ1dGVzLnNpemUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoJ2J0bi0nK2F0dHJpYnV0ZXMuc2l6ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pXHJcbiAgICAuZGlyZWN0aXZlKCdwYWdpbmF0aW9uJyxmdW5jdGlvbigpe1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgKiA8cGFnaW5hdGlvbiBudW0tcGFnZXM9XCJ0YXNrLmNvdW50XCIgY3VycmVudC1wYWdlPVwidGFzay5jdXJyZW50XCIgb24tc2VsZWN0LXBhZ2U9XCJzZWxlY3RQYWdlKClcIj48L3BhZ2luYXRpb24+XHJcbiAgICAgICAgKiAqL1xyXG4gICAgICAgIHJldHVybntcclxuICAgICAgICAgICAgdGVtcGxhdGUgOiAnPGRpdiBjbGFzcz1cInBhZ2luYXRpb25cIj4nK1xyXG4gICAgICAgICAgICAgICAgJzx1bD4nK1xyXG4gICAgICAgICAgICAgICAgJzxsaSBuZy1jbGFzcz1cIntkaXNhYmxlZDogbm9QcmV2aW91cygpfVwiPjxhIGhyZWY9XCIjXCIgbmctY2xpY2s9XCJzZWxlY3RQcmV2aW91cygpXCI+UHJldmlvdXM8L2E+PC9saT4nK1xyXG4gICAgICAgICAgICAgICAgJzxsaSBuZy1yZXBlYXQ9XCJwYWdlIGluIHBhZ2VzXCIgbmctY2xhc3M9XCJ7YWN0aXZlIDogaXNBY3RpdmUocGFnZSl9XCI+PGEgaHJlZj1cIiNcIiBuZy1jbGljaz1cInNlbGVjdFBhZ2UocGFnZSlcIj57e3BhZ2V9fTwvYT48L2xpPicrXHJcbiAgICAgICAgICAgICAgICAnPGxpIG5nLWNsYXNzPVwie2Rpc2FibGVkOiBub05leHQoKX1cIj48YSBocmVmPVwiI1wiIG5nLWNsaWNrPVwic2VsZWN0TmV4dCgpXCI+TmV4dDwvYT48L2xpPicrXHJcbiAgICAgICAgICAgICAgICAnPC91bD4nK1xyXG4gICAgICAgICAgICAgICAgJzwvZGl2PicsXHJcbiAgICAgICAgICAgIHJlc3RyaWN0OlwiRVwiLFxyXG4gICAgICAgICAgICBzY29wZSA6IHtcclxuICAgICAgICAgICAgICAgIG51bVBhZ2VzOiBcIj1cIixcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRQYWdlOiBcIj1cIixcclxuICAgICAgICAgICAgICAgIG9uU2VsZWN0UGFnZTogXCImXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcmVwbGFjZTogdHJ1ZSxcclxuICAgICAgICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUpe1xyXG4gICAgICAgICAgICAgICAgc2NvcGUuJHdhdGNoKCdudW1QYWdlcycsZnVuY3Rpb24odmFsdWUpe1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLnBhZ2VzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8PSB2YWx1ZTsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUucGFnZXMucHVzaChpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoc2NvcGUuY3VycmVudFBhZ2UgPiB2YWx1ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLnNlbGVjdFBhZ2UodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHNjb3BlLmlzQWN0aXZlID0gZnVuY3Rpb24ocGFnZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNjb3BlLmN1cnJlbnRQYWdlID09PSBwYWdlO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBzY29wZS5zZWxlY3RQYWdlID0gZnVuY3Rpb24ocGFnZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoIXNjb3BlLmlzQWN0aXZlKHBhZ2UpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUuY3VycmVudFBhZ2UgPSBwYWdlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29wZS5vblNlbGVjdFBhZ2Uoe3BhZ2UgOiBwYWdlfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBzY29wZS5zZWxlY3ROZXh0ID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXNjb3BlLm5vTmV4dCgpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUuc2VsZWN0UGFnZShzY29wZS5jdXJyZW50UGFnZSArIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KVxyXG5cdC5kaXJlY3RpdmUoJ25nVGh1bWInLCBbJyR3aW5kb3cnLCBmdW5jdGlvbigkd2luZG93KSB7XHJcbiAgICAgICAgdmFyIGhlbHBlciA9IHtcclxuICAgICAgICAgICAgc3VwcG9ydDogISEoJHdpbmRvdy5GaWxlUmVhZGVyICYmICR3aW5kb3cuQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKSxcclxuICAgICAgICAgICAgaXNGaWxlOiBmdW5jdGlvbihpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYW5ndWxhci5pc09iamVjdChpdGVtKSAmJiBpdGVtIGluc3RhbmNlb2YgJHdpbmRvdy5GaWxlO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBpc0ltYWdlOiBmdW5jdGlvbihmaWxlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdHlwZSA9ICAnfCcgKyBmaWxlLnR5cGUuc2xpY2UoZmlsZS50eXBlLmxhc3RJbmRleE9mKCcvJykgKyAxKSArICd8JztcclxuICAgICAgICAgICAgICAgIHJldHVybiAnfGpwZ3xwbmd8anBlZ3xibXB8Z2lmfCcuaW5kZXhPZih0eXBlKSAhPT0gLTE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByZXN0cmljdDogJ0EnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJzxjYW52YXMvPicsXHJcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRyaWJ1dGVzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWhlbHBlci5zdXBwb3J0KSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHBhcmFtcyA9IHNjb3BlLiRldmFsKGF0dHJpYnV0ZXMubmdUaHVtYik7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFoZWxwZXIuaXNGaWxlKHBhcmFtcy5maWxlKSkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFoZWxwZXIuaXNJbWFnZShwYXJhbXMuZmlsZSkpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgY2FudmFzID0gZWxlbWVudC5maW5kKCdjYW52YXMnKTtcclxuICAgICAgICAgICAgICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJlYWRlci5vbmxvYWQgPSBvbkxvYWRGaWxlO1xyXG4gICAgICAgICAgICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwocGFyYW1zLmZpbGUpO1xyXG5cclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIG9uTG9hZEZpbGUoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaW1nID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1nLm9ubG9hZCA9IG9uTG9hZEltYWdlO1xyXG4gICAgICAgICAgICAgICAgICAgIGltZy5zcmMgPSBldmVudC50YXJnZXQucmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIG9uTG9hZEltYWdlKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB3aWR0aCA9IHBhcmFtcy53aWR0aCB8fCB0aGlzLndpZHRoIC8gdGhpcy5oZWlnaHQgKiBwYXJhbXMuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBoZWlnaHQgPSBwYXJhbXMuaGVpZ2h0IHx8IHRoaXMuaGVpZ2h0IC8gdGhpcy53aWR0aCAqIHBhcmFtcy53aWR0aDtcclxuICAgICAgICAgICAgICAgICAgICBjYW52YXMuYXR0cih7IHdpZHRoOiB3aWR0aCwgaGVpZ2h0OiBoZWlnaHQgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FudmFzWzBdLmdldENvbnRleHQoJzJkJykuZHJhd0ltYWdlKHRoaXMsIDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL3Njb3BlLiRwYXJlbnQuZmlsZUJhc2U2NCA9IGNhbnZhc1swXS50b0RhdGFVUkwoKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZGlyJyx3aWR0aCxoZWlnaHQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzY29wZS4kcGFyZW50LnNldExvYWRJbWFnZSgndXJsKCcrY2FudmFzWzBdLnRvRGF0YVVSTCgpKycpJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1dKTtcclxuO1xyXG5cclxuXHJcblxyXG4vLyBmdW5jdGlvbnNcclxuXHJcbmZ1bmN0aW9uIHNldFNlbGVjdGlvblJhbmdlKGlucHV0LCBzZWxlY3Rpb25TdGFydCwgc2VsZWN0aW9uRW5kKSB7XHJcbiAgICBpZiAoaW5wdXQuc2V0U2VsZWN0aW9uUmFuZ2UpIHtcclxuICAgICAgICBpbnB1dC5mb2N1cygpO1xyXG4gICAgICAgIGlucHV0LnNldFNlbGVjdGlvblJhbmdlKHNlbGVjdGlvblN0YXJ0LCBzZWxlY3Rpb25FbmQpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoaW5wdXQuY3JlYXRlVGV4dFJhbmdlKSB7XHJcbiAgICAgICAgdmFyIHJhbmdlID0gaW5wdXQuY3JlYXRlVGV4dFJhbmdlKCk7XHJcbiAgICAgICAgcmFuZ2UuY29sbGFwc2UodHJ1ZSk7XHJcbiAgICAgICAgcmFuZ2UubW92ZUVuZCgnY2hhcmFjdGVyJywgc2VsZWN0aW9uRW5kKTtcclxuICAgICAgICByYW5nZS5tb3ZlU3RhcnQoJ2NoYXJhY3RlcicsIHNlbGVjdGlvblN0YXJ0KTtcclxuICAgICAgICByYW5nZS5zZWxlY3QoKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2V0Q2FyZXRUb1BvcyAoaW5wdXQsIHBvcykge1xyXG4gICAgc2V0U2VsZWN0aW9uUmFuZ2UoaW5wdXQsIHBvcywgcG9zKTtcclxufSIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8qIFNlcnZpY2VzICovXHJcblxyXG4vLyBEZW1vbnN0cmF0ZSBob3cgdG8gcmVnaXN0ZXIgc2VydmljZXNcclxuLy8gSW4gdGhpcyBjYXNlIGl0IGlzIGEgc2ltcGxlIHZhbHVlIHNlcnZpY2UuXHJcbmFuZ3VsYXIubW9kdWxlKCdmb3J1bS5zZXJ2aWNlcycsIFtdKS5cclxuICAgIGZhY3RvcnkoICckY291bnRlcnMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBnZXRDb3VudGVycyA6IHV0aWxpdHlDbGllbnQuZ2V0Q291bnRlcnMoKSxcclxuICAgICAgICAgICAgZ2V0VHlwZVN0cmluZyA6IGZ1bmN0aW9uICh0eXBlKXtcclxuICAgICAgICAgICAgICAgIHZhciB0eXBlU3RyaW5nO1xyXG5cclxuICAgICAgICAgICAgICAgIHN3aXRjaCAocGFyc2VJbnQodHlwZSkpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZVN0cmluZyA9IFwi0JPQvtGA0Y/Rh9Cw0Y8g0LLQvtC00LBcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlU3RyaW5nID0gXCLQpdC+0LvQvtC00L3QsNGPINCy0L7QtNCwXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZVN0cmluZyA9IFwi0K3Qu9C10LrRgtGA0LjRh9C10YHRgtCy0L4o0L7QsdGJ0LjQuSlcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlU3RyaW5nID0gXCLQrdC70LXQutGC0YDQuNGH0LXRgdGC0LLQvijQvdC+0YfRjClcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlU3RyaW5nID0gXCLQrdC70LXQutGC0YDQuNGH0LXRgdGC0LLQvijQtNC10L3RjClcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlU3RyaW5nID0gXCLQk9Cw0LdcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA2OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlU3RyaW5nID0gXCLQlNGA0YPQs9C+0LVcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHR5cGVTdHJpbmc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuIl19
