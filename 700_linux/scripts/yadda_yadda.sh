cd
espeak -v en-gb -s 175 -p 50 "yaadda yaada"
url=https://openweathermap.org/
dig $url
host $url
nmap $url
# who is online?
echo "who is online?" && w
# others
id
echo $XDG_SESSION_TYPE
loginctl show-session $(loginctl | grep $(whoami) | awk '{print $1}') -p Type
tty
hostname
hostname -i
pgrep emacs
pstree
echo $PATH | tr : '\n' | sort -u
calc 100 / 7
trans :fr hello | head -n 5
trans :es hello | head -n 5
# tilde
echo "tilde"
echo ~
echo ~-
echo ~+
# fetch chennai weather
curl -s wttr.in/chennai | head -n 7
# Fetch Pondicherry weather
curl -s wttr.in/pondicherry | head -n 7
ping -w 3 google.com > tmp.txt
cat tmp.txt | grep "rtt"
# timestamp generation
start=$(date +%s)
for i in $(seq 0 9); do
 echo "$(date -d "@$((start + i*60))" +"%Y-%m-%d %H:%M:%S")"
done
echo "random $RANDOM"
echo "shuffle random within range: $(shuf -i 1-1000 -n 5 | tr '\n' ',' | sed 's/,$//')"
# fun stuff - generate password, retrieve location url, get reasons for NO
./MuggleBornPadawan/700_linux/scripts/password_generator.sh > /dev/null 2>&1
curl -sIL https://tinyurl.com/2sw62h3y | grep location:
curl -si --get https://naas.isalman.dev/no | grep reason
fortune -a | cowsay
# sequential numbers 
seq -s ", " 1 .71 10
seq -f "%02g" -s "," 1 10
seq -w -s "," 1 .71 10
seq -f "tempFile_%02g.txt" 1 5 | xargs touch
seq -f "tempFile_2025-03-%02g.txt" 1 31 | xargs touch
# generating test files with seq
for i in $(seq 1 5); do
 for line in $(seq 1 100); do
   echo "File $i, Line $line: Some random content here"
 done > "tempFile_$i.txt"
done
# stress testing
echo "stress testing website using seq"
echo "start time: $(date)"
seq 10 | xargs -I {} curl -s $url >/dev/null
echo "end time: $(date)"
# ollama run gemma3:1b-it-qat "speak gibberish"
echo "start gemma3:1b"
ollama run gemma3:1b "write 7 gibberish words in a single sentence; skip commentary; skip asking questions; skip notes"
ollama stop gemma3:1b
echo "stop gemma"
echo "start deepseek-r1:1.5b"
ollama run deepseek-r1:1.5b "how are you doing?"
ollama stop deepseek-r1:1.5b
echo "stop deepseek"
sudo netstat -pnltu
espeak -v en-gb -s 175 -p 50 "yaada yaam out"
