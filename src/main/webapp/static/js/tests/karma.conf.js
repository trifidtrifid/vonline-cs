module.exports = function(config){
  config.set({

    basePath : '../../../',

    files : [
      'js/forum/angular/angular.js',
        'js/forum//bower_components/angular-route/angular-route.js',
        'js/forum//bower_components/angular-mocks/angular-mocks.js',
      'js/forum/controllers.js',
      'js/forum/tests/unit/**/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
