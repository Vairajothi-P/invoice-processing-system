@echo off 
set "FILE_PATH=%~1" 
echo Uploading "%FILE_PATH%" to OCR Invoice... 
curl -X POST -F "file=@%FILE_PATH%" http://localhost:3000/api/external-upload 
if %errorlevel% neq 0 ( 
    echo. 
    echo Error: Failed to upload. Is the Next.js server running on localhost:3000? 
    pause 
) else ( 
    echo Upload Success 
    timeout /t 2 
) 
