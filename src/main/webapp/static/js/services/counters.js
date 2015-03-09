'use strict';

var counters = function($c){
        return {
            getCounters : $c.utilityClient.getCounters(),
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
};

module.exports = ['$c',counters];