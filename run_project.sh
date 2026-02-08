#!/usr/bin/env bash
set -e
echo "Run instructions for Leaf Disease project (Unix/macOS/Linux)."

echo "1) Start the Python model server (LeafScaner):"
echo "   open a terminal and run:"
echo ""
echo "   cd LeafScaner"
echo "   # activate venv if you have one, then:"
echo "   python app.py"
echo ""
echo "2) Start Node backend (if present):"
echo "   cd LeafScaner && npm install && npm start"
echo ""
echo "3) Start React Native app (GracePlant):"
echo "   cd GracePlant && npm install && npx react-native run-android  # or run-ios"

echo "This script does not attempt to run everything in one terminal — open separate terminals for each service."
