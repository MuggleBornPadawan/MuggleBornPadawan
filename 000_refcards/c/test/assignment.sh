#!/bin/bash

echo 'Are you enjoying this course so far?'
echo -n "Enter \"y\" for yes, \"n\" for no"
read response
if [ "$response" = "y" ]
then
    echo "I'm pleased to hear you are enjoying the course!"
    echo "Your feedback regarding what you have been enjoying would be most welcome!"
elif [ "$response" = "n" ]
then
   echo "I'm sorry to hear you are not enjoying the course."
   echo "Your feedback regarding what we can do to improve the learning experience"
   echo "for this course would be greatly appreciated!"
else
   echo "Your response must be either 'y' or 'n'."
   echo "Please re-run the script to try again."
fi

# conditionals

echo -n "Enter an integer: "
read n1
echo -n "Enter another integer: "
read n2

sum=$(($n1+$n2))
product=$(($n1*$n2))

echo "The sum of $n1 and $n2 is $sum"
echo "The product of $n1 and $n2 is $product."

# adding logic 
echo -n "Enter an integer: "
read n1
echo -n "Enter another integer: "
read n2

sum=$(($n1+$n2))
product=$(($n1*$n2))

echo "The sum of $n1 and $n2 is $sum"
echo "The product of $n1 and $n2 is $product."

if [ $sum -lt $product ]
then
   echo "The sum is less than the product."
elif [ $sum -eq $product ]
then
   echo "The sum is equal to the product."
elif [ $sum -gt $product ]
then
   echo "The sum is greater than the product."
fi

# arrays f0r storing and passingg in loops
#csv_file="https://cf-courses-data.s3.us.cloud-object-storage.appdomain.cloud/IBM-LX0117EN-SkillsNetwork/labs/M3/L2/arrays_table.csv"
#wget $csv_file

cat arrays_table.csv
csv_file="./arrays_table.csv"

# parse table columns into 3 arrays
column_0=($(cut -d "," -f 1 $csv_file))
column_1=($(cut -d "," -f 2 $csv_file))
column_2=($(cut -d "," -f 3 $csv_file))

# print first array
echo "Displaying the first column:"
echo "${column_0[@]}"

## Create a new array as the difference of columns 1 and 2
# initialize array with header
column_3=("column_3")
# get the number of lines in each column
nlines=$(cat $csv_file | wc -l)
echo "There are $nlines lines in the file"
# populate the array
for ((i=1; i<$nlines; i++)); do
  column_3[$i]=$((column_2[$i] - column_1[$i]))
done
echo "${column_3[@]}"

## Combine the new array with the csv file
# first write the new array to file
# initialize the file with a header
echo "${column_3[0]}" > column_3.txt
for ((i=1; i<nlines; i++)); do
  echo "${column_3[$i]}" >> column_3.txt
done
paste -d "," $csv_file column_3.txt > report.csv

cat report.csv

#weather

#Assign city name as Casablanca
city=Casablanca
#Obtain the weather report for Casablanca
curl -s wttr.in/$city?T --output weather_report
#To extract Current Temperature
obs_temp=$(curl -s wttr.in/$city?T | grep -m 1 '°.' | grep -Eo -e '-?[[:digit:]].*')
echo "The current Temperature of $city: $obs_temp"
# To extract the forecast tempearature for noon tomorrow
fc_temp=$(curl -s wttr.in/$city?T | head -23 | tail -1 | grep '°.' | cut -d 'C' -f2 | grep -Eo -e '-?[[:digit:]].*')
echo "The forecasted temperature for noon tomorrow for $city : $fc_temp C"
#Assign Country and City to variable TZ
TZ='Morocco/Casablanca'
# Use command substitution to store the current day, month, and year in corresponding shell variables:
day=$(TZ='Morocco/Casablanca' date -u +%d)
month=$(TZ='Morocco/Casablanca' date +%m)
year=$(TZ='Morocco/Casablanca' date +%Y)
# Log the weather
record=$(echo -e "$year\t$month\t$day\t$obs_temp\t$fc_temp C")
echo $record>>rx_poc.log
cat rx_poc.log
