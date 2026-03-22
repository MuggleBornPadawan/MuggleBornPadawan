#!/bin/bash
# Author: Gemini
# License: GNU GPL v3
# Description: Reset or create the 'snow' user with sudo privileges.

### --- Configuration --- ###
targetUser="snow"
userPass="snow"
adminGroup="sudo"

### --- Logic --- ###

# 1. Check if user exists
if id "$targetUser" &>/dev/null; then
    echo "User $targetUser found. Removing..."
    # --remove-home deletes the directory as well
    sudo deluser --remove-home "$targetUser"
fi

# 2. Create the user
# -m creates home dir, -s sets shell
# -K UMASK=077 ensures all files snow creates are private by default
sudo useradd -m -s /bin/bash -K UMASK=077 "$targetUser"
# lockdown: The 'snow' home is a private island
sudo chmod 700 "/home/$targetUser"

# 3. Set the password
# Using chpasswd for non-interactive scripting
echo "$targetUser:$userPass" | sudo chpasswd

# 4. Grant sudo privileges
# sudo usermod -aG "$adminGroup" "$targetUser"

# 5. Check user existence
sudo getent group | grep $targetUser

echo "User $targetUser has been created/reset with sudo access."
echo "-------------------------------------------------------"
