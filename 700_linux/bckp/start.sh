cd
cd MuggleBornPadawan
git status
git add .
git commit -m "tmp rstr pnt"
git status
cd
./MuggleBornPadawan/700_linux/bckp/commits.sh
echo -e "\nBckps - tbd"
cp .bashrc MuggleBornPadawan/999_dotfiles/.bashrc_bkp
cp .bash_aliases MuggleBornPadawan/999_dotfiles/.bash_aliases_bkp
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
# backups 
# ./MuggleBornPadawan/700_linux/bckp/bckp.sh
./MuggleBornPadawan/700_linux/scripts/gpg_protector.sh encrypt daily_nuggets.txt 13
mv daily_nuggets.txt.enc MuggleBornPadawan/700_linux/bckp/
echo "Backup log - done"
rm daily_nuggets.txt model_answers.log aeo_results_log.txt
rm startup_log.log - a tmp.txt
./MuggleBornPadawan/700_linux/scripts/yadda_yadda.sh
