'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('forum.controllers'));


  it('should baseCtrl default values', inject(function($controller) {
    //spec body
    var baseController = $controller('baseController', { $scope: {} });
    expect(baseController).toBeDefined();
    expect(baseController.nextdoorsLoadStatus).toBeDefined();
    expect(baseController.privateMessagesLoadStatus).toBeDefined();
    expect(baseController.profileLoadStatus).toBeDefined();

    expect(baseController.mainContentTopIsHide).toEqual(false);
    expect(baseController.createTopicIsHide).toEqual(true);
    expect(baseController.isTalkTitles).toEqual(true);
    expect(baseController.lentaIsActive).toEqual(true);

    expect(baseController.nextdoorsIsActive).toEqual(false);
    expect(baseController.privateMessagesIsActive).toEqual(false);
    expect(baseController.profileIsActive).toEqual(false);
    expect(baseController.talksIsActive).toEqual(false);
    expect(baseController.lentaIsActive).toEqual(false);
    expect(baseController.servicesIsActive).toEqual(false);

  }));

  it('should navbarCtrl default values', inject(function($controller) {
    //spec body
    var navbarController = $controller('navbarController', { $scope: {} });
    expect(navbarController).toBeDefined();
      expect(navbarController.privateMessagesBtnStatus).toBeDefined();
      expect(navbarController.nextdoorsBtnStatus).toBeDefined();

  }));
});
