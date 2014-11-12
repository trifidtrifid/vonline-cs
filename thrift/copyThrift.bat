@echo off
for %%f in (*.thrift) do (
	thrift --gen js %%f
	echo %%f Processed for js
	thrift --gen java %%f
	echo %%f Processed for Java
)
if not exist ..\src\main\webapp\gen-js. mkdir ..\src\main\webapp\gen-js
for %%F IN (gen-js\*.js) do ( 
	echo fix file %%F
	type %%F | repl.bat "if \(args instanceof " "if (args && args instanceof " >..\src\main\webapp\%%F
)
if exist gen-js rmdir /S /Q gen-js 

robocopy gen-java ..\src\main\java /S /MOVE /np /ns /nfl
exit 0


