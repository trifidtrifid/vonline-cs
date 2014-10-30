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