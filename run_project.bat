@echo off
echo Starting Leaf Disease project components...

REM 1) Start Python model server (LeafScaner/app.py)
start "Model Server" cmd /k "cd /d %~dp0\LeafScaner && if exist pythonenv\Scripts\activate (call pythonenv\Scripts\activate && python app.py) else python app.py"

REM 2) Start Node backend (if present in LeafScaner)
start "Backend (Node)" cmd /k "if exist %~dp0\LeafScaner\package.json (cd /d %~dp0\LeafScaner && npm install && npm start) else echo No Node backend detected in LeafScaner & pause"

REM 3) Start React Native app (GracePlant)
start "React Native (GracePlant)" cmd /k "cd /d %~dp0\GracePlant && npm install && npx react-native run-android || npx react-native run-ios"

echo All start commands launched in separate windows.
pause
