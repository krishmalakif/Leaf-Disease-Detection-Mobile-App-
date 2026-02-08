#!/usr/bin/env bash
set -euo pipefail

if [ "$#" -lt 1 ]; then
  echo "Usage: ./download_dataset.sh <gdrive-share-url-or-id> [output_dir]"
  exit 1
fi

INPUT="$1"
OUT_DIR="${2:-New_Plant_Diseases_Dataset}"

command -v python3 >/dev/null 2>&1 || { echo "python3 is required. Install Python 3 and try again."; exit 1; }

if ! python3 -m pip show gdown >/dev/null 2>&1; then
  echo "gdown not found. Installing to user site-packages..."
  python3 -m pip install --user gdown
fi

mkdir -p "$OUT_DIR"

if echo "$INPUT" | grep -q "drive.google.com/drive/folders"; then
  echo "Detected Google Drive folder URL — using gdown --folder"
  python3 -m gdown.cli --folder "$INPUT" -O "$OUT_DIR"
else
  echo "Downloading file from Google Drive..."
  python3 -m gdown.cli "$INPUT" -O "$OUT_DIR"
fi

echo "Download complete. Files placed in: $OUT_DIR"
