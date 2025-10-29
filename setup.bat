@echo off
title Balama Marketplace - Setup
echo Setting up Balama Marketplace...
echo =============================

echo Installing server dependencies...
cd c:\Users\rishu\OneDrive\Desktop\Balama005\server
npm install
if %errorlevel% neq 0 (
    echo Error installing server dependencies!
    pause
    exit /b %errorlevel%
)

echo Installing client dependencies...
cd c:\Users\rishu\OneDrive\Desktop\Balama005\client
npm install
if %errorlevel% neq 0 (
    echo Error installing client dependencies!
    pause
    exit /b %errorlevel%
)

echo Installing ML engine dependencies...
cd c:\Users\rishu\OneDrive\Desktop\Balama005\ml
npm install
if %errorlevel% neq 0 (
    echo Error installing ML engine dependencies!
    pause
    exit /b %errorlevel%
)

echo Setup completed successfully!
echo Run 'start-all.bat' to start the application.
pause