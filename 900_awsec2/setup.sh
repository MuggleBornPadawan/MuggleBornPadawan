#!/bin/sh
echo "setup of aws ec2 linux"
cd
rm -rf .bash_history
sudo yum update -y
sudo yum upgrade -y
sudo yum install -y git gh
git clone https://github.com/MuggleBornPadawan/MuggleBornPadawan.git
whoami
uname
curl ifconfig.me
emacs --version
java --version
python3 --version
vim --version
sqlite3 --version
clisp --version
clojure --version
R --version
git --version
psql --version
rm -rf .bash_history
