package com.vmesteonline.be;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.junit.runners.Suite.SuiteClasses;

@RunWith(Suite.class)
@SuiteClasses({ AllTests.class, AuthServiceImplTests.class, MessageServiceTests.class })
public class AllTests {

}
