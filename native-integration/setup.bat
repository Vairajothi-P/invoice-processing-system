@echo off
setlocal enabledelayedexpansion

:: Get the absolute path of the current directory
set "SCRIPT_DIR=%~dp0"
set "HANDLER_PATH=%SCRIPT_DIR%upload-handler.bat"
set "HANDLER_PATH_ESC=%HANDLER_PATH:\=\\%"

:: 1. Create the Upload Handler Batch File
echo @echo off > "%HANDLER_PATH%"
echo set "FILE_PATH=%%~1" >> "%HANDLER_PATH%"
echo echo Uploading "%%FILE_PATH%%" to OCR Invoice... >> "%HANDLER_PATH%"
echo curl -X POST -F "file=@%%FILE_PATH%%" http://localhost:3000/api/external-upload >> "%HANDLER_PATH%"
echo if %%errorlevel%% neq 0 ( >> "%HANDLER_PATH%"
echo     echo. >> "%HANDLER_PATH%"
echo     echo Error: Failed to upload. Is the Next.js server running on localhost:3000? >> "%HANDLER_PATH%"
echo     pause >> "%HANDLER_PATH%"
echo ) else ( >> "%HANDLER_PATH%"
echo     echo Upload Success! >> "%HANDLER_PATH%"
echo     timeout /t 2 > nul >> "%HANDLER_PATH%"
echo ) >> "%HANDLER_PATH%"

:: 2. Create the Registry File
set "REG_FILE=%SCRIPT_DIR%register_menu.reg"
echo Windows Registry Editor Version 5.00 > "%REG_FILE%"
echo. >> "%REG_FILE%"
echo [HKEY_CLASSES_ROOT\*\shell\UploadToOCR] >> "%REG_FILE%"
echo @="Upload to OCR invoice" >> "%REG_FILE%"
echo "Icon"="C:\\Windows\\System32\\shell32.dll,145" >> "%REG_FILE%"
echo. >> "%REG_FILE%"
echo [HKEY_CLASSES_ROOT\*\shell\UploadToOCR\command] >> "%REG_FILE%"
echo @="\"%HANDLER_PATH_ESC%\" \"%%1\"" >> "%REG_FILE%"

:: 3. Inform the user
echo Integration scripts created successfully in %SCRIPT_DIR%
echo.
echo IMPORTANT: To finish integration, please right-click 'register_menu.reg' and select 'Merge'.
echo This will add 'Upload to OCR invoice' to your right-click menu.
echo.
echo Make sure your Next.js server is running (npm run dev) when you use the feature!
pause
