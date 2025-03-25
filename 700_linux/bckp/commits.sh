echo " - - - "
echo "test programming blocks"
cd
cd MuggleBornPadawan/200_java
java -jar HelloWorld.jar
cd
cd MuggleBornPadawan/
git add .
git commit -m "daily java"
cd 
cd MuggleBornPadawan/300_python
python3 hello_world.py
cd
cd MuggleBornPadawan/
git add .
git commit -m "daily python"
cd 
cd MuggleBornPadawan/100_clisp
clisp hello-world.lisp
cd
cd MuggleBornPadawan/
git add .
git commit -m "daily clisp"
cd 
cd MuggleBornPadawan/400_r
Rscript hello_world.R
cd
cd MuggleBornPadawan/
git add .
git commit -m "daily r"
cd 
cd MuggleBornPadawan/110_clojure
clojure hello_world.clj
cd
cd MuggleBornPadawan/
git add .
git commit -m "daily clj"
cd 
cd MuggleBornPadawan/120_elisp
emacs -Q --script hello_world.el
cd
cd MuggleBornPadawan/
git add .
git commit -m "daily elisp"
cd 
echo " - - - "
neofetch
