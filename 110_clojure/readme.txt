sudo apt update
sudo apt install openjdk-17-jdk -y
sudo apt install nodejs npm -y
java -version
node -v
npm -v
mkdir my-cljs-project && cd my-cljs-project
npm init -y
npm install shadow-cljs
# The configuration file
touch shadow-cljs.edn
# The HTML file for the browser
touch index.html
# The directory for our ClojureScript source code
mkdir -p src/main
# Our first ClojureScript file
touch src/main/core.cljs
