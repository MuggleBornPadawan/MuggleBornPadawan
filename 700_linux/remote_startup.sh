# ./MuggleBornPadawan/700_linux/remote_startup.sh | tee - a ./MuggleBornPadawan/700_linux/shell_log.log
clear
echo "use this for any remote debian server setup and startup"
sudo apt-get update
sudo apt-get dist-upgrade
sudo apt-get install git openjdk-17-jdk python3 python3-pip mit-scheme clojure emacs sbcl r-base firefox-esr 
sudo apt-get autoremove 
git --version
git config --global user.name "MuggleBornPadawan"
git config --global user.email "mugglebornpadawan@icloud.com"
# back up - $PATH, init.el?,
# trash for commandline
# remove bash history
# neofetch? 
# fortune 
