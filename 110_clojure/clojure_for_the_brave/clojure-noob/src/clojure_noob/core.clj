(ns clojure-noob.core
  (:require [clojure.string :as str])
  (:gen-class))

;; --- helpers: now top-level, not inside -main ---
;; Before: (defn train ...) INSIDE -main -> global surprise
;; After: top-level -> clear, runs once, testable

(defn train
  "run a train well"
  []
  (println "Choo choo.. choo cooooo!"))

(defn comments-demo
  "types of comments: ; line, #_ form, (comment block)"
  []
  (println "this line has a line comment in code") ; line comment
  (println (+ 4 5 #_(* 3 4 5) 4 5)) ; #_ ignores next form
  (comment
    (println "not printed because inside comment block")))

(defn form-demo
  "(operator operand1 operand2 ...)"
  []
  (println (+ 2 3 4))
  (println (str "i " "am " "thinking" "!!!")))

(defn control-flow-demo
  "if, do, when, nil, equality, or/and"
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
  (when true (println "abc") "abx")
  (when false (println "abc") "abxc")
  (println "truthy and falsey")
  (println (= 1 1))
  (println (= 1 2))
  (println (= nil nil))
  (println (nil? 1))
  (println (nil? nil))
  (println (= 2 3))
  (println "or returns first truthy or last value. and returns first falsey or last truthy")
  (println (or false nil :large_I_mean_venti :why_cant_I_just_say_large))
  (println (or (= 0 1) (= "yes" "no")))
  (println (or nil))
  (println (and :free_wifi :hot_coffee))
  (println (and :feelin_super_cool nil false)))

;; helper for def-demo: was (defn error-message ...) INSIDE def-demo -> bad
;; now top-level
(defn error-message
  [severity]
  (str "OH GOD! IT'S A DISASTER! WE'RE "
       (if (= severity :mild)
         "MILDLY INCONVENIENCED!"
         "DOOOOOOOMED!")))

(defn def-demo
  "naming values: use let, not def, inside fns"
  []
  ;; Before: (def failed-protagonist-names [...]) -> global
  ;; After: let -> local, dies after function ends
  (let [failed-protagonist-names ["Larry Potter" "Doreen the Explorer" "The Incredible Bulk"]]
    (println failed-protagonist-names))
  (println (error-message :mild))
  (println (error-message :0)))

(defn ds-demo
  "data structures"
  []
  (println "ds - string, numbers, hash-maps, vectors, sets")
  (let [name "Chewbacca"]
    (println (str "\"Uggllglglglglglglglll\" - " name)))
  (println (hash-map :a 1 :b 2))
  (println (get {:a 0 :b 1} :b))
  (println (get {:a 0 :b {:c "ho hum"}} :b))
  (println (get {:a 0 :b 1} :c))
  (println (get {:a 0 :b 1} :c "unicorns?"))
  (println (get-in {:a 0 :b {:c "ho hum"}} [:b :c]))
  (println ({:name "The Human Coffeepot"} :name))
  (println "keyword as function = get")
  (println (:d {:a 1 :b 2 :c 3} "No gnome knows homes like Noah knows"))
  (println (nth '(:a :b :c) 0))
  (println (hash-set 1 1 2 2))
  (println (conj #{:a :b} :b))
  (println (set [3 3 3 4 4]))
  (println (contains? #{:a :b} :a))
  (println (contains? #{:a :b} 3))
  (println (contains? #{nil} nil))
  (println (:a #{:a :b}))
  (println (get #{:a :b} :a))
  (println (get #{:a nil} nil))
  (println (get #{:a :b} "kurt vonnegut")))

;; helpers for fn-demo: were inner defns -> now private top-level
(defn- codger-communication [whippersnapper]
  (str "Get off my lawn, " whippersnapper "!!!"))

(defn- codger [& whippersnappers]
  (map codger-communication whippersnappers))

(defn- favorite-things [name & things]
  (str "Hi, " name ", here are my favorite things: "
       (str/join ", " things)))

(defn- chooser [[first-choice second-choice & unimportant-choices]]
  (println (str "Your first choice is: " first-choice))
  (println (str "Your second choice is: " second-choice))
  (println (str "We're ignoring the rest. Here they are: "
                (str/join ", " unimportant-choices))))

(defn- announce-treasure-location [{lat :lat lng :lng}]
  (println (str "Treasure lat: " lat))
  (println (str "Treasure lng: " lng)))

(defn- receive-treasure-location [{:keys [lat lng] :as treasure-location}]
  (println (str "Treasure lat x: " lat))
  (println (str "Treasure lng: " lng))
  (println treasure-location))

(defn fn-demo
  "functions, varargs, destructuring"
  []
  (println "functions - call / define, anonymous, return")
  (println (or + -))
  (println ((or + -) 3 4 5))
  (println ((and (= 1 1) +) 1 2 3))
  (println ((first [+ 0]) 1 2 3))
  (println (map inc [0 1 2 3 1.1]))
  (println (+ (inc 199) (/ 100 (- 7 2))))
  (println (codger "Billy" "Anne-Marie" "The Incredible Bulk"))
  (println (favorite-things "Doreen" "gum" "shoes" "kara-te"))
  (chooser ["Marmalade" "Handsome Jack" "Pigpen" "Aquaman"])
  (announce-treasure-location {:lat 28.22 :lng 81.33})
  (receive-treasure-location {:lat 1 :lng 2}))

(defn anonfn-demo
  "anonymous functions"
  []
  ;; Before: (def my-special-multiplier (fn ...)) -> global
  ;; After: let -> local
  (let [my-special-multiplier (fn [x] (* x 3))]
    (println (my-special-multiplier 12)))
  (println (#(* % 3) 8))
  (println (map (fn [name] (str "Hi, " name))
                ["Darth Vader" "Mr. Magoo"]))
  (println (map #(str "Hi, " %) ["Darth Vader" "Mr. Magoo"]))
  (println (#(str %1 " and " %2) "cornbread" "butter beans"))
  (println (#(identity %&) 1 "blarg" :yip)))

;; helper for closures-demo: was inner defn -> now top-level
(defn inc-maker
  "Create a custom incrementor"
  [inc-by]
  #(+ % inc-by))

(defn closures-demo
  "closures are returned fns"
  []
  ;; Before: (def inc3 (inc-maker 3)) -> global
  ;; After: let -> local
  (let [inc3 (inc-maker 3)]
    (println "closure usage" (inc3 7))))

(defn dummy-demo
  []
  (println "hell0o from dummyyy")
  (+ 1 1))

(defn crash-course-demo
  "run all demos"
  []
  (train)
  (comments-demo)
  (form-demo)
  (control-flow-demo)
  (def-demo)
  (ds-demo)
  (fn-demo)
  (anonfn-demo)
  (closures-demo)
  (dummy-demo))

(defn -main
  "I don't do a whole lot ... yet."
  [& _args]
  (println "I'm a little teapot.. yay!")
  (crash-course-demo)
  (println "cleanliness is next to godlinessss"))
