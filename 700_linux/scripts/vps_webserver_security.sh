#!/bin/bash
# 1. update systems 
sudo apt update && sudo apt upgrade -y
sudo apt install unattended-upgrades
# 2. non root user is safer than root 
# adduser deployer
# usermod -aG sudo deployer
# 3. ssh setup for password authentication 
# ssh-keygen -t ed25519 -C "your-email@example.com"
# ssh-copy-id deployer@your-server-ip
# update the /etc/ssh/ssd_config
# PermitRootLogin no
# PasswordAuthentication no
# PermitEmptyPasswords no
# MaxAuthTries 3
# AllowUsers deployer
# sudo systemctl restart sshd
# 4. install firewall 
sudo apt install ufw
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
# 5. brute force protection 
# sudo apt install fail2ban
# create local config 
# sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
# sudo nano /etc/fail2ban/jail.local
# [sshd]
# enabled = true
# port = ssh
# maxretry = 3
# bantime = 3600
# findtime = 600
# sudo systemctl restart fail2ban
# sudo systemctl enable fail2ban
# 6. remove unnecessary services
sudo ss -tulpn
sudo systemctl disable cups
sudo systemctl stop cups
# 7. take backups
BACKUP_DIR="/backup"
DATE=$(date +%Y-%m-%d)
# tar -czf $BACKUP_DIR/backup-$DATE.tar.gz /home /etc /var/www
# find $BACKUP_DIR -name "backup-*.tar.gz" -mtime +7 -delete
# sudo crontab -e
# 0 2 * * * /usr/local/bin/backup.sh
# 8. disaable root password login  
# sudo passwd -l root
