param(
    [Parameter(Mandatory=$true)]
    [string]$Url,
    [string]$OutDir = "New_Plant_Diseases_Dataset"
)

Write-Host "Download script for Windows (PowerShell)"

if (-not (Get-Command python -ErrorAction SilentlyContinue)) {
    Write-Error "Python is required. Install Python 3 and ensure 'python' is on PATH."
    exit 1
}

$gdownCheck = & python -m pip show gdown 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "gdown not found. Installing to user site-packages..."
    & python -m pip install --user gdown
    if ($LASTEXITCODE -ne 0) { Write-Error "Failed to install gdown"; exit 1 }
}

New-Item -ItemType Directory -Path $OutDir -Force | Out-Null

if ($Url -match "drive.google.com/drive/folders") {
    Write-Host "Detected Google Drive folder URL — using gdown --folder"
    & python -m gdown.cli --folder $Url -O $OutDir
} else {
    Write-Host "Downloading file from Google Drive..."
    & python -m gdown.cli $Url -O $OutDir
}

if ($LASTEXITCODE -eq 0) { Write-Host "Download complete. Files placed in: $OutDir" } else { Write-Error "Download failed" }
