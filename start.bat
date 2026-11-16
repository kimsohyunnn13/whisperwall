@echo off
title Papan Curhat Anonim Sementara
echo ========================================================
echo   Menjalankan Papan Curhat Anonim Sementara...
echo ========================================================
echo.

where node >nul 2>nul
if %errorlevel% equ 0 (
  node server.js
) else (
  if exist "C:\Users\ASUS\AppData\Roaming\Antigravity\bin\agy-node.cmd" (
    "C:\Users\ASUS\AppData\Roaming\Antigravity\bin\agy-node.cmd" server.js
  ) else (
    echo [ERROR] Node.js tidak ditemukan. Pastikan Node.js terinstall.
    pause
  )
)
pause
