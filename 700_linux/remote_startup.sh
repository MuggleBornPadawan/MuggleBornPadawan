# ./MuggleBornPadawan/700_linux/remote_startup.sh | tee - a ./MuggleBornPadawan/700_linux/bckp/shell_log.log
clear
echo "run this file for any remote debian server setup, startup and chk backups"
echo -e "\nDate: $(date) \nOS: $(uname -s) \nKernel: $(uname -r)"
sudo apt-get update
sudo apt-get dist-upgrade
sudo apt-get install git openjdk-17-jdk python3 python3-pip mit-scheme clojure emacs sbcl r-base firefox-esr fortune cowsay neofetch trash-cli
sudo apt-get autoremove 
git config --global user.name "MuggleBornPadawan"
git config --global user.email "mugglebornpadawan@icloud.com"
# run hello worlds 
alias rm='trash-put'
trash-list
echo -e "\nuse trash-empty or trash-restore as you see fit"
rm .bash_history
fortune | cowsay
./MuggleBornPadawan/700_linux/bckp/bckp.sh

