;; generate_gallery.bb — static HTML viewer for images/
;; Usage: bb generate_gallery.bb
;; Reads images/catalog.edn, scans images/ dir, writes images/index.html.
;; Files on disk but missing from catalog show as Uncategorized on top.
(require '[clojure.edn :as edn]
         '[clojure.java.io :as io]
         '[clojure.string :as str])

(def root (io/file "/home/rgroot/MuggleBornPadawan/000_refcards"))
(def img-dir (io/file root "images"))
(def catalog-file (io/file img-dir "catalog.edn"))
(def out-file (io/file img-dir "index.html"))

(defn escape-html [s]
  (-> s
      (str/replace "&" "&amp;")
      (str/replace "<" "&lt;")
      (str/replace ">" "&gt;")
      (str/replace "\"" "&quot;")))

(defn image-files []
  (->> (.listFiles img-dir)
       (map #(.getName ^java.io.File %))
       (filter #(re-matches #"(?i).+\.(png|jpe?g|svg)" %))
       sort
       vec))

(defn load-catalog []
  (if (.exists catalog-file)
    (edn/read-string (slurp catalog-file))
    []))

(defn card [f]
  (str "<figure class=\"card\" data-name=\"" (escape-html (str/lower-case f)) "\">"
       "<img loading=\"lazy\" src=\"" (escape-html f) "\" alt=\"" (escape-html f) "\">"
       "<figcaption>" (escape-html f) "</figcaption>"
       "</figure>"))

(defn section [id title files highlight?]
  (str "<section class=\"group" (when highlight? " uncat") "\" data-group=\"" (escape-html id) "\">"
       "<h2>" (escape-html title) " (" (count files) ")</h2>"
       "<div class=\"grid\">"
       (str/join "\n" (map card files))
       "</div></section>"))

(let [catalog (load-catalog)
      known (into {} (map (juxt :file :category) catalog))
      disk (image-files)
      stale (remove (set disk) (keys known))
      fresh (remove (set (keys known)) disk)
      grouped (->> disk
                   (remove (set fresh))
                   (map (fn [f] [f (get known f "meta-misc")]))
                   (group-by second)
                   (map (fn [[c xs]] [c (sort (map first xs))]))
                   (sort-by first)
                   vec)
      cats (map first grouped)
      total (count disk)]
  (when (seq stale)
    (println "WARN: catalog entries missing on disk:" (str/join ", " (sort stale))))
  (spit out-file
        (str "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n"
             "<meta charset=\"utf-8\">\n"
             "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n"
             "<title>Refcards Gallery — " total " images</title>\n"
             "<style>"
             "body{font-family:system-ui,sans-serif;margin:0;background:#111;color:#eee}"
             "header{position:sticky;top:0;background:#1a1a1a;padding:12px 16px;border-bottom:1px solid #333;z-index:10}"
             "h1{font-size:18px;margin:0 0 8px}"
             ".row{display:flex;gap:8px;flex-wrap:wrap;align-items:center}"
             "input[type=search]{flex:1;min-width:200px;padding:8px;border-radius:8px;border:1px solid #444;background:#222;color:#eee}"
             ".filters{display:flex;gap:6px;flex-wrap:wrap;margin-top:8px}"
             ".filters button{padding:6px 10px;border-radius:20px;border:1px solid #555;background:#222;color:#eee;cursor:pointer}"
             ".filters button.on{background:#b3892c;border-color:#b3892c;color:#111}"
             "main{padding:16px}"
             ".group h2{font-size:16px;text-transform:capitalize;border-bottom:1px solid #333;padding-bottom:6px}"
             ".group.uncat h2{color:#ffb020}"
             ".grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px}"
             ".card{background:#1c1c1c;border:1px solid #333;border-radius:10px;overflow:hidden;margin:0}"
             ".group.uncat .card{border-color:#ffb020}"
             ".card img{width:100%;height:180px;object-fit:cover;display:block;background:#000}"
             ".card figcaption{font-size:11px;padding:6px 8px;word-break:break-all;color:#bbb}"
             ".hide{display:none!important}"
             "</style>\n</head>\n<body>\n"
             "<header><h1>Refcards Gallery — " total " images</h1>"
             "<div class=\"row\"><input id=\"q\" type=\"search\" placeholder=\"Filter by filename…\"></div>"
             "<div class=\"filters\" id=\"filters\">"
             "<button data-f=\"all\">all</button>"
             (when (seq fresh) "<button data-f=\"uncategorized\">uncategorized</button>")
             (str/join "" (map #(str "<button data-f=\"" (escape-html %) "\""
                                     (when (= % "meta-misc") " class=\"on\"")
                                     ">" (escape-html %) "</button>") cats))
             "</div></header>\n<main>\n"
             (when (seq fresh)
               (section "uncategorized" "Uncategorized — new files, add to catalog.edn" (sort fresh) true))
             (str/join "\n" (map (fn [[c fs]] (section c c fs false)) grouped))
             "\n</main>\n<script>"
             "var q=document.getElementById('q'),f=document.getElementById('filters');"
             "var cur='meta-misc';"
             "function apply(){var s=q.value.toLowerCase();"
             "document.querySelectorAll('.group').forEach(function(g){"
             "var gok=(cur==='all'||g.dataset.group===cur||(cur==='meta-misc'&&g.dataset.group==='uncategorized'));"
             "var any=false;"
             "g.querySelectorAll('.card').forEach(function(c){"
             "var ok=gok&&(!s||c.dataset.name.includes(s));"
             "c.classList.toggle('hide',!ok);if(ok)any=true;});"
             "g.classList.toggle('hide',!any);});}"
             "q.addEventListener('input',apply);"
             "f.addEventListener('click',function(e){if(e.target.tagName!=='BUTTON')return;"
             "cur=e.target.dataset.f;"
             "f.querySelectorAll('button').forEach(function(b){b.classList.toggle('on',b===e.target);});"
             "apply();});apply();"
             "</script>\n</body>\n</html>\n"))
  (println "wrote" (.getPath out-file)
           "| disk:" total
           "| categorized:" (- total (count fresh))
           "| uncategorized:" (count fresh)
           "| categories:" (count grouped)))
