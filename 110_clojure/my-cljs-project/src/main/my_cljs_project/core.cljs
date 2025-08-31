;; src/main/core.cljs

(ns my-cljs-project.core
  (:require [reagent.core :as r]
            [reagent.dom.client :as rdom]))

(defn app []
  (let [current-time (r/atom (js/Date.))
        timer (atom nil)]
    (r/create-class
     {:component-did-mount
      (fn []
        (reset! timer (js/setInterval
                       #(reset! current-time (js/Date.))
                       1000)))
      :component-will-unmount
      (fn []
        (js/clearInterval @timer))
      :reagent-render
      (fn []
        [:div
         [:h1 "Hello from ClojureScript!"]
         [:p "The current time is: " (str @current-time)]])})))

(defn ^:export init []
  (let [root (rdom/create-root (.getElementById js/document "app"))]
    (rdom/render root [app])))

;;(ns my-cljs-project.core
;;  (:require [reagent.dom.client :as rdom]))
;;
;;(defn app []
;;  [:div
;;   [:h1 "Hello from ClojureScript!"]
;;   [:p "Isn't this neat??? what's the time"]])
;;
;;(defn ^:export init []
;;  (let [root (rdom/create-root (.getElementById js/document "app"))]
;;    (rdom/render root [app])))
;;
