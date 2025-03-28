cd
cd MuggleBornPadawan
git status
git add .
git commit -m "tmp rstr pnt"
git status
cd
./MuggleBornPadawan/700_linux/bckp/commits.sh
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
