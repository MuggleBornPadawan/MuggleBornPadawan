#!/usr/bin/env bb
(ns server
(import [java.net ServerSocket Socket]
        [java.io BufferedReader InputStreamReader PrintWriter OutputStream])

(def port (if (> (count *command-line-args*) 0)
            (Integer/parseInt (first *command-line-args*))
            8080))

(def data-dir (java.io.File. "error_discovery_data"))
(.mkdirs data-dir)
(def annotations-file (java.io.File. data-dir "annotations.json"))

(defn send-response [^OutputStream out status content-type body]
  (let [body-bytes (if (string? body) (.getBytes body "UTF-8") body)
        headers (str "HTTP/1.1 " status " OK\r\n"
                     "Content-Type: " content-type "\r\n"
                     "Content-Length: " (alength body-bytes) "\r\n"
                     "Access-Control-Allow-Origin: *\r\n"
                     "Access-Control-Allow-Methods: GET, POST, OPTIONS\r\n"
                     "Access-Control-Allow-Headers: Content-Type\r\n"
                     "\r\n")]
    (.write out (.getBytes headers "UTF-8"))
    (.write out body-bytes)
    (.flush out)))

(defn handle-request [^Socket socket]
  (try
    (let [in (BufferedReader. (InputStreamReader. (.getInputStream socket) "UTF-8"))
          out (.getOutputStream socket)
          request-line (.readLine in)]
      (when request-line
        (let [parts (.split request-line " ")
              method (nth parts 0 "")
              path (nth parts 1 "")]
          (cond
            (= method "OPTIONS")
            (send-response out 200 "text/plain" "")

            (and (= method "GET") (= path "/api/annotations"))
            (let [content (if (.exists annotations-file)
                            (slurp annotations-file)
                            "[]")]
              (send-response out 200 "application/json" content))

            (and (= method "GET") (or (= path "/") (= path "/review.html")))
            (let [f (java.io.File. (if (= path "/") "review.html" (subs path 1)))]
              (if (.exists f)
                (send-response out 200 "text/html; charset=utf-8" (slurp f))
                (send-response out 404 "text/plain" "Not Found")))

            (= method "POST")
            (let [headers (loop [headers {}]
                            (let [line (.readLine in)]
                              (if (or (nil? line) (empty? line))
                                headers
                                (let [kv (.split line ": " 2)]
                                  (if (= 2 (count kv))
                                    (recur (assoc headers (.toLowerCase (nth kv 0)) (nth kv 1)))
                                    (recur headers))))))
                  content-length (Integer/parseInt (get headers "content-length" "0"))
                  char-buf (char-array content-length)
                  _ (.read in char-buf 0 content-length)
                  body (String. char-buf)]
              (spit annotations-file body)
              (send-response out 200 "application/json" "{\"status\":\"ok\"}"))

            :else
            (let [f (java.io.File. (subs path 1))]
              (if (and (.exists f) (.isFile f))
                (send-response out 200 "text/html" (slurp f))
                (send-response out 404 "text/plain" "Not Found")))))))
    (catch Exception e
      (.printStackTrace e))
    (finally
      (.close socket))))

(defn -main [& args]
  (let [ss (ServerSocket. port)]
    (println (str "Review server running at http://127.0.0.1:" port))
    (while true
      (let [socket (.accept ss)]
        (future (handle-request socket))))))

(when (= *file* (System/getProperty "babashka.file"))
  (apply -main *command-line-args*))
