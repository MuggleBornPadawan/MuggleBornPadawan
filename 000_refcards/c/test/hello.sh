javac hello.java
java hello
gcc -o hello hello.c
chmod +x hello
./hello
node hello.js
go run hello.go
g++  -o hello_cpp hello.cpp
./hello_cpp
echo "Hello Shell World!"
# xdg-open hello.html
python3 hello.py
rm hello_cpp hello
# assignment 
declare -a myArray
myArray+=("Linux")
myArray+=("is")
myArray+=("cool!")
echo ${myArray[@]}
pwd
currentTS=$(date +%s)
yesterdayTS=$(($currentTS - 24 * 60 * 60))
for file in *
do
  if [[ $(date -r "$file" +%s) -gt $yesterdayTS ]]
  then
      echo $file # [TASK 11]
  fi

done
