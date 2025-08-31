# ./MuggleBornPadawan/700_linux/remote_startup.sh | tee - a ./MuggleBornPadawan/700_linux/bckp/shell_log.log
clear
cd
espeak -v en-gb -s 175 -p 50 "roger that"
echo "run this file for any remote debian server setup, startup and chk backups"
echo -e "\nDate: $(date) \nOS: $(uname -s) \nKernel: $(uname -r)"
sudo apt-get update
sudo apt-get dist-upgrade
sudo apt-get install lm-sensors sqlite3 mpg123 dnsutils make bats jq cron postfix mailutils pass gnupg nmap htop pv tldr tree ncdu parallel tmux rsync bat fd-find git rig espeak nodejs npm openjdk-17-jdk python3 python3-pip mit-scheme racket clojure emacs magit sbcl clisp r-base build-essential firefox-esr fortune cowsay neofetch trash-cli
sudo apt-get autoremove 
sudo apt-get clean
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
pass ls

# backups 
./MuggleBornPadawan/700_linux/bckp/bckp.sh
./MuggleBornPadawan/700_linux/scripts/gpg_protector.sh encrypt daily_nuggets.txt 13
mv daily_nuggets.txt.enc MuggleBornPadawan/700_linux/bckp/

# fetch chennai weather
curl wttr.in/Chennai | head -n 7
# Fetch Pondicherry weather
curl wttr.in/Pondicherry | head -n 7
ping -w 12 google.com > tmp.txt
cat tmp.txt | grep "rtt"
fortune -a | cowsay

# sudo nohup ./MuggleBornPadawan/700_linux/runners/my-simple-daemon.sh 2>/dev/null # deprecated 
# ./MuggleBornPadawan/700_linux/runners/my-simple-daemon.sh > /dev/null 2>&1 & #deprecated 
# ollama run gemma3:1b-it-qat "speak gibberish"
echo "start gemma3:1b"
ollama run gemma3:1b "write 7 gibberish words in a single sentence; skip commentary; skip asking questions; skip notes"
ollama stop gemma3:1b
echo "stop gemma"
echo "start deepseek-r1:1.5b"
ollama run deepseek-r1:1.5b "ok"
ollama stop deepseek-r1:1.5b
echo "stop deepseek"
tmux new -s alpha

# final words 
sleep 2
cd
espeak -v en-gb -s 175 -p 50 "penguin out"
rm startup_log.log - a tmp.txt
