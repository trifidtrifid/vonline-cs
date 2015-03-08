
console.log('edit-1');
var editCtrl = function($rootScope,$scope,$c,FileUploader) {

    console.log('edit',$c,FileUploader);
    var edit = this;

    var attach = new com.vmesteonline.be.thrift.messageservice.Attach(),
        isLogoUploader, isImagesUploader, imagesCounter = 0,imagesLength;

    $scope.setLoadImage = function(fileBase64){

        var svc = $c.fileClient.saveFileContent(fileBase64, true);
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


    $rootScope.businessDescription = edit.businessDescription = $c.businessClient.getMyBusinessInfo();

    //edit.businessDescription = new com.vmesteonline.be.thrift.businesservice.BusinessDescription;

    edit.save = function(){

        //edit.businessDescription.logo.URL = $c.fileClient.saveFileContent(bg, true);
        // bg - binary data base64


        edit.businessDescription.logo = attach;
        console.log('save',edit.businessDescription);
        //edit.businessDescription.logo.fileName = '1';
        //edit.businessDescription.logo.URL = '/static/images/anna.jpg';

        try {
            $c.businessClient.updateBusinessDescription(edit.businessDescription);
            edit.statusText = "Сохранено";
            edit.status = 1;
        }catch(e){
            edit.statusText = "При сохранении произошла ошибка";
            edit.status = 0;
        }

        console.log('after save',edit.businessDescription);

    }

};

module.exports = [ '$rootScope','$scope','$c','FileUploader', editCtrl ];