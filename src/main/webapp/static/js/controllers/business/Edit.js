
forumControllers.controller('Edit',function($rootScope,$scope, FileUploader) {

    var edit = this;

    $scope.fileBase64 = null;
    var attach = new com.vmesteonline.be.thrift.messageservice.Attach();

    $scope.setLoadImage = function(fileBase64){

        attach.URL = edit.logoURL = fileClient.saveFileContent(fileBase64, true);
        console.log('setLoadImage',edit.logoURL,fileBase64);
    };

    var uploader = $scope.uploader = new FileUploader({
        //url: 'upload.php'
    });

    // FILTERS

    uploader.filters.push({
        name: 'imageFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    });

    /*uploader.onWhenAddingFileFailed = function(item *//*{File|FileLikeObject}*//*, filter, options) {
        console.info('onWhenAddingFileFailed', item, filter, options);
    };*/
    uploader.onAfterAddingFile = function(fileItem) {
        console.info('onAfterAddingFile', fileItem, uploader);

        attach.fileName = fileItem._file.name;
        attach.contentType = fileItem._file.type;
    };
    /*uploader.onAfterAddingAll = function(addedFileItems) {
        console.info('onAfterAddingAll', addedFileItems);
    };
    uploader.onBeforeUploadItem = function(item) {
        console.info('onBeforeUploadItem', item);
    };
    uploader.onProgressItem = function(fileItem, progress) {
        console.info('onProgressItem', fileItem, progress);
    };
    uploader.onProgressAll = function(progress) {
        console.info('onProgressAll', progress);
    };
    uploader.onSuccessItem = function(fileItem, response, status, headers) {
        console.info('onSuccessItem', fileItem, response, status, headers);
    };
    uploader.onErrorItem = function(fileItem, response, status, headers) {
        console.info('onErrorItem', fileItem, response, status, headers);
    };
    uploader.onCancelItem = function(fileItem, response, status, headers) {
        console.info('onCancelItem', fileItem, response, status, headers);
    };
    uploader.onCompleteItem = function(fileItem, response, status, headers) {
        console.info('onCompleteItem', fileItem, response, status, headers);
    };
    uploader.onCompleteAll = function() {
        console.info('onCompleteAll');
    };*/


    edit.businessDescription = businessClient.getMyBusinessInfo();

    //edit.businessDescription = new com.vmesteonline.be.thrift.businesservice.BusinessDescription;

    edit.save = function(){

        //edit.businessDescription.logo.URL = fileClient.saveFileContent(bg, true);
        // bg - binary data base64

        edit.businessDescription.logo = attach;
        console.log('save',edit.businessDescription.logo);
        //edit.businessDescription.logo.fileName = '1';
        //edit.businessDescription.logo.URL = '/static/images/anna.jpg';

        console.log(edit.businessDescription);
        businessClient.updateBusinessDescription(edit.businessDescription)

    }

});