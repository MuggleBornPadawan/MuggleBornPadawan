#!/bin/bash

# Define paths and files
EMACS_INIT="$HOME/.emacs.d/init.el"
BACKUP_DIR="$HOME/.emacs.d/backups"
GIT_DIR="$HOME/MuggleBornPadawan/700_linux/bckp/"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="init_${TIMESTAMP}.el"
GIT_FILE="init.el"

### Function to check for sensitive patterns
check_sensitive_content() {
    local file="$1"
    # Common patterns for API keys and passphrases
    local patterns=(
	"api"
	"api[_-]key"
        "apikey"
	"secret"
        "secret[_-]key"
	"pass"
	"pwd"
        "password"
        "passphrase"
        "token"
        "access[_-]key"
	"auth"
        "auth[_-]token"
	"cred"
        "credentials"
    )
    
    # Initialize result variable
    local found=0
    
    # Check each pattern
    for pattern in "${patterns[@]}"; do
	# echo -e "\nchecking pattern match: $pattern"
	if grep -iE "$pattern" "$file" > /dev/null; then
	    echo -e "\npattern match found: $pattern"
	    found=1
            break
        fi
    done
    echo -e "is found? $found"
    return $found
}

### Main script logic

# Check if init.el exists
if [ ! -f "$EMACS_INIT" ]; then
    echo "Error: $EMACS_INIT not found"
    exit 1
fi

# Create backup directory if it doesn't exist
if [ ! -d "$BACKUP_DIR" ]; then
    mkdir -p "$BACKUP_DIR"
fi

# Check for sensitive content
if check_sensitive_content "$EMACS_INIT"; then
    # Create backup
    cp "$EMACS_INIT" "$BACKUP_DIR/$BACKUP_FILE"
    cp "$EMACS_INIT" "$GIT_DIR/$GIT_FILE"
    echo "✅ Backup created successfully; move to cloud manually please"
    exit 1
else
    echo "⚠️  WARNING: Sensitive information detected in $EMACS_INIT"
    echo "❌ No cloud backup taken"
fi

cd
cp .tmux.conf MuggleBornPadawan/700_linux/bckp/.tmux.conf
cd
cd
cd MuggleBornPadawan
git add .
git commit -m "bckp"
cd
EMACS_INIT="$HOME/.emacs.d/init.el"
BACKUP_DIR="$HOME/.emacs.d/backups"
GIT_DIR="$HOME/MuggleBornPadawan/700_linux/bckp/"
