#!/usr/bin/env bash

echo "=== SYSTEM INFORMATION ==="
# echo "Date: $(date)"
# echo "Host: $(hostname)"
echo "-----------------------------------"
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    cat /etc/os-release | grep NAME
    echo " "
    echo "[CPU]"
    lscpu | grep -E "Model name|Socket|Thread|CPU\(s\):"
    echo -e "\n[MEMORY (RAM)]"
    free -h
    #echo -e "\n[DISK SPACE]"
    #df -h /
    #echo -e "\n[GPU]"
    #lspci -nnk | grep -iA3 vga
elif [[ "$OSTYPE" == "darwin"* ]]; then
    echo "[macOS HARDWARE OVERVIEW]"
    system_profiler SPHardwareDataType
else
    echo "Unsupported OS: $OSTYPE"
    exit 1
fi
echo " "
emacs --version | head -n 1
#ollama ls
echo "-----------------------------------"
#echo "Done."
