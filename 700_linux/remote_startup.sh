# ./MuggleBornPadawan/700_linux/remote_startup.sh | tee - a ./MuggleBornPadawan/700_linux/bckp/shell_log.log
clear
espeak -v en-gb -s 175 -p 50 "roger that"
echo "run this file for any remote debian server setup, startup and chk backups"
echo -e "\nDate: $(date) \nOS: $(uname -s) \nKernel: $(uname -r)"
sudo apt-get update
sudo apt-get dist-upgrade
sudo apt-get install pass gnupg nmap htop pv tldr tree ncdu parallel tmux rsync bat fd-find git rig espeak nodejs npm openjdk-17-jdk python3 python3-pip mit-scheme clojure emacs magit sbcl clisp r-base firefox-esr fortune cowsay neofetch trash-cli
sudo apt-get autoremove 
cp MuggleBornPadawan/.gitignore $HOME
cp MuggleBornPadawan/.dockerignore $HOME
cp MuggleBornPadawan/Dockerfile $HOME
cp MuggleBornPadawan/Jenkinsfile $HOME
git config --global user.name "MuggleBornPadawan"
git config --global user.email "mugglebornpadawan@icloud.com"
echo -e "\nrun commits seperately; docker and jenkins startup shell scripts to be created seperately"
alias rm='trash-put'
trash-list
echo -e "\nuse trash-empty or trash-restore as you see fit"
rm .bash_history
ping -w 12 google.com > tmp.txt
cat tmp.txt | grep "rtt"
fortune -a | cowsay
./MuggleBornPadawan/700_linux/bckp/bckp.sh
sleep 2
cd
# sudo nohup ./MuggleBornPadawan/700_linux/runners/my-simple-daemon.sh 2>/dev/null
espeak -v en-gb -s 175 -p 50 "nohup started - penguin out"
