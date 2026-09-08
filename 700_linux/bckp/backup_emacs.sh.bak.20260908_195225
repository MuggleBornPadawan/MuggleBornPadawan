#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Configuration
SOURCE_DIR="$HOME/.emacs.d"
BACKUP_PARENT_DIR="$HOME/emacs_backups"
#TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
TIMESTAMP=$(date +"%Y%m")
BACKUP_DIR="$BACKUP_PARENT_DIR/emacs_backup_$TIMESTAMP"

# List of essential files/directories to back up
ESSENTIAL_ITEMS=(
    "init.el"
    "custom.el"
    "customizations"
    "bookmarks"
)

# Optional configuration/test files to include if they exist
OPTIONAL_ITEMS=(
    "minimal-emacs-test.el"
    "minimal-ob-scheme-integrity-test.el"
)

echo "Starting Emacs configuration backup..."

# Ensure source directory exists
if [ ! -d "$SOURCE_DIR" ]; then
    echo "Error: Source directory $SOURCE_DIR does not exist." >&2
    exit 1
fi

# Create backup directory
mkdir -p "$BACKUP_DIR"
echo "Backup directory created at: $BACKUP_DIR"

# Copy essential items
for item in "${ESSENTIAL_ITEMS[@]}"; do
    src_path="$SOURCE_DIR/$item"
    if [ -e "$src_path" ]; then
        echo "Backing up: $item"
        cp -R "$src_path" "$BACKUP_DIR/"
    else
        echo "Warning: Essential item '$item' not found in $SOURCE_DIR, skipping."
    fi
done

# Copy optional items if present
for item in "${OPTIONAL_ITEMS[@]}"; do
    src_path="$SOURCE_DIR/$item"
    if [ -f "$src_path" ]; then
        echo "Backing up optional file: $item"
        cp "$src_path" "$BACKUP_DIR/"
    fi
done

# Create a compressed tarball of the backup
TAR_FILE="$BACKUP_PARENT_DIR/emacs_backup_$TIMESTAMP.tar.gz"
tar -czf "$TAR_FILE" -C "$BACKUP_PARENT_DIR" "emacs_backup_$TIMESTAMP"

# Clean up the uncompressed backup directory
rm -rf "$BACKUP_DIR"

echo "----------------------------------------"
echo "Backup completed successfully!"
echo "Saved archive to: $TAR_FILE"
echo "----------------------------------------"
