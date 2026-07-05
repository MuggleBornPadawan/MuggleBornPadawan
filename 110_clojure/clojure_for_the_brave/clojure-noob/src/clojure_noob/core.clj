(ns clojure-noob.core
  (:gen-class))

(defn -main
  "I don't do a whole lot ... yet."
  [& args]
  (println "I'm a little teapot.. yay!")
  (crash-course-demo)
  (println "cleanliness is next to godliness"))

; do things - crash course
(defn crash-course-demo
  []
  ; sample named function
  (defn train
    "run a train well"
    []
    (println "Choo choo.. choo cooooo!"))

  ; demo of comments
  (defn comments-demo
    "explanation of types of comments:  line comment (;); form comment (#); (comment (block a b)); M-x comment-dwim (un/comment selected region)"
    []
    (println "this line has a line comment in code") ; line comment
    (println (+ 4 5 #_(* 3 4 5) 4 5)) ; form comment (#_)
    (comment
      (println "not printed because this code is inside comment block")) ; comment block
    ;; (do
    ;;   (println "select region and un/comment with M-x commen-dwim"))
    )

  ; form demo
  (defn form-demo
    "(operator operand1 operand2... operandn"
    []
    (println (+ 2 3 4))
    (println (str "i " "am " "thinking" "!!!")) ; str concatenates
    )

  ; control flow function
  (defn control-flow-demo
    "basic control flow operators: if, do, when 
   nil, true, false, truthiness, equality, and boolean expressions"
    []
    (println (if true 1 2))
    (println (if false 1 3))
    (println (if true "a" 1))
    (println (if false "x"))
    (println (if true
               (do (println "success") (println "success statement"))
               (do (println "failure") (println "failure statement"))))
    (println (if false
               (do (println "success") (println "success statement"))
               (do (println "failure") (println "failure statement"))))
    (when true (println "abc") "abc") ; when is a combination of (if true do)
    (when false (println "abc") "abc") ; when has no execution for false
    (println "truthy and falsey")
    (println (= 1 1))
    (println (= 1 2))
    (println (= nil nil))
    (println (nil? 1))
    (println (nil? nil))
    (println (= 2 3))
    (println "boolean operators or and and. clojure uses the boolean operators or and and. or returns either the first truthy value or the last value. and returns the first falsey value or, if no values are falsey, the last truthy value")
    (println (or false nil :large_I_mean_venti :why_cant_I_just_say_large))
    (println (or (= 0 1) (= "yes" "no")))
    (println (or nil))
    (println (and :free_wifi :hot_coffee))
    (println (and :feelin_super_cool nil false))
    )
  ; naming variables with def
  (defn def-demo
    "naming variables wiht def demo"
    []
    (def failed-protagonist-names ["Larry Potter" "Doreen the Explorer" "The Incredible Bulk"])
    (println failed-protagonist-names)
    (defn error-message
      [severity]
      (str "OH GOD! IT'S A DISASTER! WE'RE "
           (if (= severity :mild)
             "MILDLY INCONVENIENCED!"
             "DOOOOOOOMED!")))
    (println (error-message :mild))
    (println (error-message :0)))
  (defn ds-demo
    "data structures"
    []
    (println "clojure numbers - integer, float, ratio")
    (def name "Chewbacca")
    (println(str "\"Uggllglglglglglglglll\" - " name))
    (println (hash-map :a 1 :b 2))
    (println (get {:a 0 :b 1} :b))
    (println (get {:a 0 :b {:c "ho hum"}} :b))
    (println (get {:a 0 :b 1} :c))
    (println (get {:a 0 :b 1} :c "unicorns?"))
    (println (get-in {:a 0 :b {:c "ho hum"}} [:b :c]))
    (println ({:name "The Human Coffeepot"} :name))
    (println "keyword as a function - equivalent to get (lookup values)")
    (println (:d {:a 1 :b 2 :c 3} "No gnome knows homes like Noah knows")) ; providing a default value
    (println (nth '(:a :b :c) 0))
    )
  (train) (comments-demo) (form-demo) (control-flow-demo) (def-demo) (ds-demo)
  )

