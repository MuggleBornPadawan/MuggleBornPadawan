# ~/.bash_aliases — custom aliases | reload with `s` (source ~/.bashrc)
# backup: ~/.bash_aliases.bak.*

# ── Core / Reload ──
alias s='source ~/.bashrc'
alias a='s && alias | less'
alias e='emacs -nw'
alias grep='grep --color=auto'

# ── General ──
alias c='clear'
alias h='history | less'
alias ps='ps aux'
alias du='du -sh'
alias df='df -hT'
alias o='xdg-open'

# ── Navigation ──
alias l='ls --color=auto'
alias r='cd && l'
alias ..='cd .. && l'
alias ...='cd ../.. && l'
alias m='cd && cd MuggleBornPadawan && l'
alias ww='cd && cd /home/rgroot/MuggleBornPadawan/000_refcards/c/test && l'

# ── File Mgmt + Safety ──
alias ln='ln -i'
alias less='less -R'
alias get='curl -O'
alias mkdir='mkdir -p'
alias fo='r && o $(fzf)'
# rm: prefer trash-put if installed, else rm -i (old file had duplicate `rm` — second overwrote first)
if command -v trash-put >/dev/null 2>&1; then
  alias rm='trash-put'
else
  alias rm='rm -i'
fi

# ── Git ──
alias g='pwd && git gc && git cat-file -p HEAD && git diff --staged && git diff HEAD && git status && git branch'
alias gl='git log --oneline --decorate --graph'
alias gp="s && pw && touch test.tmp && echo 'meowww at $(date)' >> test.tmp && git add . && git commit -m 'wip $(date +%s)' && git push && git status && git branch"
alias gs="clear && pw && pwd && git branch && git status && echo 'use git commit, git checkout main, git merge <branch_name>, git push origin main, git branch <branch_name> eod everyday'"

# ── NPM ──
alias nu='npm list -g --depth=0 && npm outdated && npm update && npm audit fix --force && npm install -g npm-check-updates'
alias abc="cd && echo '/show info' > ./.ollama/history && cd -"

# ── System / Security ──
alias pw='pass unKnoWn'
alias security="sudo ufw status verbose && sudo ufw version && echo 'use this command to get more info: sudo ufw app list'"
alias genpass="cd && ./MuggleBornPadawan/700_linux/scripts/password_generator.sh && cd -"
alias snow="sudo -i -u snow"
alias scanFully='sudo clamscan -r -i /'
alias scanStatus='sudo freshclam && clamscan --version && sudo systemctl status clamav-freshclam'

# ── Scripts ──
alias remote='cd && ./MuggleBornPadawan/700_linux/remote_startup.sh'
alias commit='cd && ./MuggleBornPadawan/700_linux/bckp/commits.sh'
alias start='cd && ./MuggleBornPadawan/700_linux/bckp/start.sh'
alias sw='cd && ./MuggleBornPadawan/700_linux/scripts/wisdom_nugget_generator.sh'
alias sm='cd && ./MuggleBornPadawan/700_linux/scripts/gemini_artithmetic_test.sh'
alias sa='cd && ./MuggleBornPadawan/700_linux/scripts/aeo_gemini.sh'
alias sl="s && c && echo 'sleeping for few mins... $(date)' && sleep $((RANDOM % 600))"
alias info='./MuggleBornPadawan/700_linux/scripts/info.sh | less'
alias ii='./MuggleBornPadawan/700_linux/scripts/sysinfo.sh'
alias pp='./MuggleBornPadawan/700_linux/scripts/ping_test.sh'
alias eo='emacs -nw -q -l /home/rgroot/MuggleBornPadawan/dummy/ollama-init.el'

# ── Tmux ──
alias t='tmux a'
alias tn='ulimit -u 1000 && sleep 2 && tmux new -s "alpha"'
alias td='tmux detach'
alias tk="echo 'abort now if you want to stop killing server.. ' && sleep 11 && tmux kill-server"
alias tf='tmux set-option -g status off'
alias to='tmux set-option -g status on'
alias ts='tmux switch-client -l'

# ── Cleanup / Info (use with care) ──
alias j='tk && pw && r && genpass && history -w && history -c && rm .bash_history Dockerfile Jenkinsfile tempFile* aeo_results_log.txt daily_nuggets.txt tmp.txt && c && echo "clean slate protocol activated" && tn'
alias i='to ; tty ; pwd ; date ; ulimit -a | grep processes ; abc ; ping -c 1 www.google.com ; curl -s https://ipinfo.io/json ; sleep 5 ; tf'

# ── Functions (need args — aliases cannot handle $1 correctly) ──
# q/mq/qg/sy were aliases with `$1` / `$(pass url)` — converted to functions so args expand at run time, not at source time
# unalias first: if old aliases still loaded, `q() {` would expand to broken syntax
unalias q mq qg sy chat 2>/dev/null || true
q()  { "$HOME/MuggleBornPadawan/700_linux/scripts/gemini_query.sh" "$@"; }
mq() { "$HOME/MuggleBornPadawan/700_linux/scripts/openrouter_multiple_models_query.sh" "$@"; }
qg() { "$HOME/MuggleBornPadawan/700_linux/scripts/grok.sh" "$@"; }
sy() { (cd ~ && ./MuggleBornPadawan/700_linux/scripts/yadda_yadda.sh "$(pass url)"); }
chat() { (cd ~ && ./MuggleBornPadawan/700_linux/scripts/gemini_chat.sh); }
