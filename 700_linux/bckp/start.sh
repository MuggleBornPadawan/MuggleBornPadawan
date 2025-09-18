cd
cd MuggleBornPadawan
git status
git add .
git commit -m "tmp rstr pnt"
git status
cd
./MuggleBornPadawan/700_linux/bckp/commits.sh
cp .bash_aliases MuggleBornPadawan/999_dotfiles/.bash_aliases_bk
cp .tmux.conf MuggleBornPadawan/999_dotfiles/.tmux.conf.bkp
cp MuggleBornPadawan/.gitignore MuggleBornPadawan/999_dotfiles/.gitignore_bkp
cp .emacs.d/init.el MuggleBornPadawan/999_dotfiles/.emacs_init.el.bkp
cp MuggleBornPadawan/.dockerignore MuggleBornPadawan/999_dotfiles/.dockerignore.bkp
cp MuggleBornPadawan/Dockerfile MuggleBornPadawan/999_dotfiles/Dockerfile_bkp
cp MuggleBornPadawan/Jenkinsfile MuggleBornPadawan/999_dotfiles/Jenkinsfile_bkp

echo "Do you want to continue? (Press Enter)"
read -p ""
echo "Continuing..."
./MuggleBornPadawan/700_linux/remote_startup.sh | tee - a ./MuggleBornPadawan/700_linux/bckp/shell_log.log
cd
cd MuggleBornPadawan
git add .
git commit -m "log daily"
git status
cd
