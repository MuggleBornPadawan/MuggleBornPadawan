#!/bin/sh
echo "setup of ec2"
sudo yum update -y
sudo yum upgrade -y
sudo yum install -y git
git --version
git clone https://github.com/MuggleBornPadawan/MuggleBornPadawan.git

sudo yum install -y emacs python3 vim sqlite sbcl
emacs --version
python3 --version
vim --version
sqlite3 --version
sbcl --version

sudo yum install -y wget
wget https://raw.githubusercontent.com/technomancy/leiningen/stable/bin/lein
chmod +x lein
sudo mv lein /usr/local/bin/
clojure --version

sudo amazon-linux-extras enable R3.4
sudo yum install -y R
R --version

sudo amazon-linux-extras enable postgresql12
sudo yum install -y postgresql-server postgresql
psql --version

sudo yum groupinstall -y "Development Tools"



