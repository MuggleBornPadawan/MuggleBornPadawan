# ./MuggleBornPadawan/700_linux/remote_startup.sh | tee - a ./MuggleBornPadawan/700_linux/bckp/shell_log.log
clear
cd
ulimit -u 1000
echo "/show info" > ./.ollama/history
espeak -v en-gb -s 175 -p 50 "roger that"
echo "run this file for any remote debian server setup, startup and chk backups"
echo -e "\nDate: $(date) \nOS: $(uname -s) \nKernel: $(uname -r)"
#ufw
sudo ufw enable 
sudo ufw deny 20 #ftp
sudo ufw deny ftp #21
sudo ufw deny ssh #22
sudo ufw deny smtp #25
sudo ufw deny dns #53 
sudo ufw deny http #80
sudo ufw deny pop3 #110
sudo ufw deny 137 #NetBIOS / SMB
sudo ufw deny 138 #NetBIOS / SMB
sudo ufw deny 139 #NetBIOS / SMB
sudo ufw deny 143 #imap 
sudo ufw deny https #443
sudo ufw deny 445 #server message block (smb)
sudo ufw default deny incoming
sudo ufw default allow outgoing
#linux debian packages
sudo apt-get update && sudo apt-get dist-upgrade
sudo apt-get upgrade calc uuid-runtime fonts-dejavu fzf zoxide gnuplot nasm ffmpeg lm-sensors sqlite3 mpg123 dnsutils make bats jq cron postfix mailutils pass gnupg nmap htop pv tldr tree ncdu parallel tmux rsync bat fd-find git rig espeak nodejs npm openjdk-17-jdk python3 python3-pip mit-scheme racket clojure rlwrap leiningen emacs magit sbcl clisp r-base build-essential firefox-esr fortune cowsay neofetch trash-cli
#clamav - antivirus package
sudo apt-get upgrade gcc make pkg-config python3 python3-pip python3-pytest valgrind cmake check libbz2-dev libcurl4-openssl-dev libjson-c-dev libmilter-dev libncurses5-dev libpcre2-dev libssl-dev libxml2-dev zlib1g-dev
#firewall - security - openvpn
#sudo apt-get install openvpn -y
sudo apt-get upgrade ufw netcat-openbsd iproute2 
# devops
sudo apt-get upgrade podman crun
#cleanup
sudo apt-get autoremove && sudo apt-get clean && sudo apt-get autoclean
#npm packages
npm list -g --depth=0
npm outdated
npm update
npm audit fix --force
npm install -g npm-check-updates
ncu
ncu -u
npm install
npm update
npm audit fix --force
#restore to local
cp MuggleBornPadawan/.gitignore $HOME
cp MuggleBornPadawan/.dockerignore $HOME
cp MuggleBornPadawan/Dockerfile $HOME
cp MuggleBornPadawan/Jenkinsfile $HOME
git config --global user.name "MuggleBornPadawan" && git config --global user.email "mugglebornpadawan@icloud.com"
echo -e "\nrun commits seperately; docker and jenkins startup shell scripts to be created seperately"
alias rm="trash-put"
# trash-list # use only to list the files in the trash bin
echo -e "\nIMPORTANT: restore bkp, if not done yet. list: tmux, emacs, alias, gitignore, dockerignore, jenkins"
echo -e "\nuse trash-empty or trash-restore as you see fit"
history -w
history -c
rm .bash_history
pass ls
# sudo nohup ./MuggleBornPadawan/700_linux/runners/my-simple-daemon.sh 2>/dev/null # deprecated 
# ./MuggleBornPadawan/700_linux/runners/my-simple-daemon.sh > /dev/null 2>&1 & #deprecated 
tmux new -s alpha
# final words 
sleep 2
sudo ufw version 
echo 'use this command to get more info: sudo ufw app list'
echo 'use alias security to get local copy' 
sudo ufw status verbose numbered | sort -u
sudo freshclam
clamscan --version
echo "run 'sudo clamscan -r /' every day. stay safe. have a good day"
echo "run 'sudo systemctl status clamav-freshclam' to check status"
echo "use 'tmux set-option -g status on/off' to toggle tmux status bar"
cd
espeak -v en-gb -s 175 -p 50 "Tux out"
