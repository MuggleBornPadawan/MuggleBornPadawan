ping -i 60 www.google.com | awk '{print strftime("[%Y-%m-%d %H:%M:%S]"), $0}'
