@echo off
REM DBT Student Portal Backend Startup Script for Windows

echo Starting DBT Student Portal Backend...

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Python is not installed. Please install Python 3.8 or higher.
    pause
    exit /b 1
)

REM Check if pip is installed
pip --version >nul 2>&1
if %errorlevel% neq 0 (
    echo pip is not installed. Please install pip.
    pause
    exit /b 1
)

REM Install dependencies
echo Installing dependencies...
pip install -r requirements.txt

REM Start the FastAPI server
echo Starting FastAPI server on http://localhost:8000
echo API Documentation available at http://localhost:8000/docs
echo Press Ctrl+C to stop the server

python main.py
pause
