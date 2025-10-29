@echo off
title Balama Marketplace - Starting All Services
echo Starting Balama Marketplace Application...
echo ========================================

echo Starting Backend Server (Port 3001)...
start "Backend Server" cmd /k "cd /d c:\Users\rishu\OneDrive\Desktop\Balama005\server && node server.js"

echo Starting ML Engine (Port 4000)...
start "ML Engine" cmd /k "cd /d c:\Users\rishu\OneDrive\Desktop\Balama005\ml && node index.js"

echo Starting Frontend (Port 3000)...
start "Frontend" cmd /k "cd /d c:\Users\rishu\OneDrive\Desktop\Balama005\client && npm run dev"

echo.
echo All services started successfully!
echo Access the application at: http://localhost:3000
echo Backend API: http://localhost:3001
echo ML Engine: http://localhost:4000
echo.

pause