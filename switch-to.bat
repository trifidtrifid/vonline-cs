echo %1
copy /Y  %1-pom.xml pom.xml
copy /Y src\main\resources\META-INF\%1-persistence.xml  src\main\resources\META-INF\persistence.xml
copy /Y src\main\webapp\WEB-INF\%1-jetty-web.xml  src\main\webapp\WEB-INF\jetty-web.xml  
