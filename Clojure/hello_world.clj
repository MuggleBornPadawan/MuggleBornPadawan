;; Import necessary classes from java.time and java.io
(import java.time.LocalDateTime)
(import java.io.FileWriter)

;; Get the current date and time
(def current-time (LocalDateTime/now))

;; Create the message string
(def message (str "Hello, Clojure World! The current date and time is: " current-time))

;; Print the message to the console
(println message)

;; Write the message to a log file
(with-open [writer (FileWriter. "hello_world.log" true)] ;; Open the file in append mode
  (.write writer (str message "\n")))
(println "Log written to hello_world.log")
