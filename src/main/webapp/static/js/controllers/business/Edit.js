
forumControllers.controller('Edit',function($rootScope) {

    var edit = this;

    edit.info = businessClient.getMyBusinessInfo();

    edit.businessDescription = new com.vmesteonline.be.thrift.businesservice.BusinessDescription;

    edit.save = function(){

        businessClient.createBusinesDescription(businessDescription)

    }

});