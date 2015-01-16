package com.vmesteonline.be;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.junit.runners.Suite.SuiteClasses;

@RunWith(Suite.class)
@SuiteClasses({
        UserServiceImplTest.class,
        VoGeocoderTest.class,
        OauthServletTests.class,
        MessagesTreeTests.class,
        AuthServiceImplTests.class,
        MessageServiceTests.class,
        NewsNotificationsTests.class})
public class AllTests {

}
