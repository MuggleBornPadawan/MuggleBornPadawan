#!/bin/sh
echo "setup of ec2"
sudo yum update -y
sudo yum upgrade -y
sudo yum install -y git emacs python3 vim sqlite clojure sbcl
sudo amazon-linux-extras enable postgresql12
sudo yum install -y postgresql-server postgresql
psql --version
sqlite3 --version
sbcl --version
clojure --version
python3 --version
emacs --version

