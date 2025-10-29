# start-all.ps1 - Run all Balama Marketplace services

Write-Host "Starting Balama Marketplace Application..." -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green

# Start Backend Server
Write-Host "Starting Backend Server (Port 3001)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd c:\Users\rishu\OneDrive\Desktop\Balama005\server; node server.js" -WindowStyle Normal

# Start ML Engine
Write-Host "Starting ML Engine (Port 4000)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd c:\Users\rishu\OneDrive\Desktop\Balama005\ml; node index.js" -WindowStyle Normal

# Start Frontend
Write-Host "Starting Frontend (Port 3000)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd c:\Users\rishu\OneDrive\Desktop\Balama005\client; npm run dev" -WindowStyle Normal

Write-Host "All services started successfully!" -ForegroundColor Green
Write-Host "Access the application at: http://localhost:3000" -ForegroundColor Cyan
Write-Host "Backend API: http://localhost:3001" -ForegroundColor Cyan
Write-Host "ML Engine: http://localhost:4000" -ForegroundColor Cyan