# Dataset download (external hosting)

This project keeps the large image dataset out of the Git repository to keep the repo small. Use these scripts to host the dataset on Google Drive and download it into the project workspace.

1) Upload your `New_Plant_Diseases_Dataset/` folder to Google Drive.
2) Make the folder (or file) shareable with "Anyone with the link can view".
3) Copy the shareable link.

Usage (Linux / macOS):

```bash
./download_dataset.sh "https://drive.google.com/drive/folders/<FOLDER_ID>"
# or for a single file:
./download_dataset.sh "https://drive.google.com/file/d/<FILE_ID>/view?usp=sharing"
```

Usage (Windows PowerShell):

```powershell
.\download_dataset.ps1 -Url "https://drive.google.com/drive/folders/<FOLDER_ID>" -OutDir New_Plant_Diseases_Dataset
```

Notes
- These scripts use `gdown` (https://github.com/wkentaro/gdown). The script attempts to install `gdown` via `pip` if it's not found.
- If you prefer not to use Google Drive, upload the dataset to any public storage and adjust the scripts accordingly.
- After download, the dataset directory will be created at the repository root as `New_Plant_Diseases_Dataset/`.

If you want me to add the dataset files to the repository instead (not recommended due to size), tell me which exact subfolders or files to include.
