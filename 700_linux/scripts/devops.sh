echo "os details"
cat /etc/os-release
echo "memory free"
free -m
echo "what's eating cpu and memory right now?"
top | head -n 5
ps aux --sort=-%cpu | head -n 5
ps aux --sort=-%mem | head -n 5
echo "which process owns which port"
lsof -i
echo "active connections and listening sockets"
sudo ss -tulnp
echo "kernel routing table"
netstat -rn
echo "tcpdump -i eth0 - might create a large file dump. look up and use wisely"
echo "7. strace: trace system calls, last resort debugging"
cat <<EOF
8. dmesg -T: kernel messages, OOM kills show up here
9. journalctl -b -1: logs from the previous boot
10. df -h / du -sh: disk usage before you get a "no space left" alert
11. free -m: memory overview including buffers and cache
12. vmstat 1: real-time CPU, memory, IO snapshot
13. iotop: which process is hammering disk
14. uptime: load averages, quick node health check
15. who / last: who logged in and when
16. curl -v: full HTTP request/response including headers and TLS
17. dig / nslookup: DNS resolution debugging
18. traceroute / mtr: packet path and where it breaks
19. iptables -L: firewall rules, often the silent culprit
20. systemctl status: service state, last logs, exit codes
21. crontab -l: scheduled jobs, often forgotten until they break
22. find / -name: locate files across the system
23. tar -xvf / gzip: compress, extract, move things around
24. chmod / chown: permission fixes, classic junior task
25. env / printenv: check what environment variables are actually set
EOF
