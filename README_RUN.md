# Running this project

Short runnable guide to start the project components (model server, backend, and React Native frontend).

Windows (one-command launcher)
```bat
run_project.bat
```

Manual / cross-platform steps

1) Start the Python model server
```bash
cd LeafScaner
# optional: activate your virtualenv (pythonenv or my_env)
python app.py
```

2) Start the Node backend (if present)
```bash
cd LeafScaner
npm install
npm start
```

3) Start the React Native app
```bash
cd GracePlant
npm install
npx react-native run-android   # or npx react-native run-ios
```

Notes
- The project contains large dataset and model files under `New_Plant_Diseases_Dataset/` and TFJS models under `tfjs_model/`.
- By default these are listed in `.gitignore`. If you want your portfolio to include the trained model or dataset, remove those lines from [.gitignore](.gitignore).
- Before pushing to GitHub, make sure you remove any sensitive files (API keys, .env). The `.gitignore` already excludes `.env` files.
