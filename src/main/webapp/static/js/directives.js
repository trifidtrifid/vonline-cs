'use strict';

/* Directives */

angular.module('forum.directives', []).
  directive('ngHasfocus', function() {
        return function(scope, element, attrs) {
            scope.$watch(attrs.ngHasfocus, function (nVal, oVal) {
                if (nVal && scope.wallItem) {
                    element[0].focus();
                    setCaretToPos(element[0],scope.wallItem.commentText.length);
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
    });



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