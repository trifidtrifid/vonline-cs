
forumControllers.controller('Edit',function($rootScope) {

    var edit = this;

    edit.businessDescription = businessClient.getMyBusinessInfo();

    //edit.businessDescription = new com.vmesteonline.be.thrift.businesservice.BusinessDescription;

    edit.save = function(){

        //edit.businessDescription.logo = new com.vmesteonline.be.thrift.messageservice.Array();
        //edit.businessDescription.logo.fileName = '1';
        //edit.businessDescription.logo.URL = '/static/images/anna.jpg';

        console.log(edit.businessDescription);
        businessClient.updateBusinessDescription(edit.businessDescription)

    }

});