;; src/main/core.cljs

(ns my-cljs-project.core
  (:require [reagent.dom.client :as rdom]))

(defn app []
  [:div
   [:h1 "Hello from ClojureScript!"]
   [:p "Isn't this neat? whta the time"]])

(defn ^:export init []
  (let [root (rdom/create-root (.getElementById js/document "app"))]
    (rdom/render root [app])))
