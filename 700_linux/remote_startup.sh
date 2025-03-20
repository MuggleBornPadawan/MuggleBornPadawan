# ./MuggleBornPadawan/700_linux/remote_startup.sh | tee - a ./MuggleBornPadawan/700_linux/bckp/shell_log.log
clear
echo "use this for any remote debian server setup and startup"
echo -e "\nDate: $(date) \nOS: $(uname -s) \nKernel: $(uname -r)"
sudo apt-get update
sudo apt-get dist-upgrade
sudo apt-get install git openjdk-17-jdk python3 python3-pip mit-scheme clojure emacs sbcl r-base firefox-esr fortune cowsay neofetch trash-cli
sudo apt-get autoremove 
git config --global user.name "MuggleBornPadawan"
git config --global user.email "mugglebornpadawan@icloud.com"
alias rm='trash-put'
trash-list
echo -e "\nuse trash-empty or trash-restore as you see fit"
rm .bash_history
fortune | cowsay
# back up - $PATH, init.el?,
# run hello worlds 
