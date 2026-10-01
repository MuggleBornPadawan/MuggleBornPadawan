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
             ".card img{cursor:zoom-in}"
             "dialog#viewer{border:none;background:#000;padding:0;max-width:95vw;border-radius:12px}"
             "dialog#viewer::backdrop{background:rgba(0,0,0,.85)}"
             ".viewer-wrap{position:relative;background:#000}"
             "#vImg{max-width:92vw;max-height:82vh;object-fit:contain;display:block;margin:0 auto;transform-origin:center}"
             "#vBar{display:flex;gap:8px;align-items:center;padding:8px 10px;background:#1a1a1a;font-size:13px}"
             "#vCap{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-right:8px;color:#bbb}"
             "#vBar .btns{display:flex;gap:6px;flex-shrink:0}"
             "#vBar button,#vBar a{padding:6px 10px;border-radius:8px;border:1px solid #555;background:#222;color:#eee;cursor:pointer;text-decoration:none;font-size:13px}"
             "#vBar button:hover,#vBar a:hover{border-color:#b3892c}"
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
             "\n</main>\n"
             "<dialog id=\"viewer\"><div class=\"viewer-wrap\"><img id=\"vImg\" alt=\"\">"
             "<div id=\"vBar\"><span id=\"vCap\"></span><span class=\"btns\">"
             "<a id=\"vOpen\" target=\"_blank\" rel=\"noopener\">Open original</a>"
             "<button id=\"vPrev\" type=\"button\">Prev</button>"
             "<button id=\"vNext\" type=\"button\">Next</button>"
             "<button id=\"vClose\" type=\"button\">Close</button>"
             "</span></div></div></dialog>\n<script>"
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
             "var viewer=document.getElementById('viewer'),vImg=document.getElementById('vImg'),"
             "vCap=document.getElementById('vCap'),vOpen=document.getElementById('vOpen');"
             "var idx=0,scale=1;"
             "function list(){return Array.prototype.slice.call(document.querySelectorAll('.card:not(.hide)'));}"
             "function setScale(s){scale=Math.min(3,Math.max(1,s));"
             "vImg.style.transform='scale('+scale+')';"
             "vImg.style.cursor=scale>1?'zoom-out':'zoom-in';}"
             "function show(i){var L=list();if(!L.length)return;idx=(i+L.length)%L.length;"
             "var card=L[idx],img=card.querySelector('img');"
             "var src=encodeURI(img.getAttribute('src'));"
             "var name=img.getAttribute('alt')||src;"
             "vImg.src=src;vImg.alt=name;vOpen.href=src;"
             "vCap.textContent=(idx+1)+' / '+L.length+' - '+name;"
             "setScale(1);if(!viewer.open)viewer.showModal();}"
             "document.querySelector('main').addEventListener('click',function(e){"
             "var t=e.target.closest?e.target.closest('.card img'):null;if(!t)return;"
             "show(list().indexOf(t.closest('.card')));});"
             "document.getElementById('vPrev').addEventListener('click',function(e){e.stopPropagation();show(idx-1);});"
             "document.getElementById('vNext').addEventListener('click',function(e){e.stopPropagation();show(idx+1);});"
             "document.getElementById('vClose').addEventListener('click',function(){viewer.close();});"
             "viewer.addEventListener('click',function(e){if(e.target===viewer)viewer.close();});"
             "document.addEventListener('keydown',function(e){if(!viewer.open)return;"
             "if(e.key==='ArrowRight')show(idx+1);else if(e.key==='ArrowLeft')show(idx-1);});"
             "vImg.addEventListener('wheel',function(e){e.preventDefault();setScale(scale+(e.deltaY<0?0.2:-0.2));},{passive:false});"
             "vImg.addEventListener('dblclick',function(){setScale(1);});"
             "</script>\n</body>\n</html>\n"))
  (println "wrote" (.getPath out-file)
           "| disk:" total
           "| categorized:" (- total (count fresh))
           "| uncategorized:" (count fresh)
           "| categories:" (count grouped)))
