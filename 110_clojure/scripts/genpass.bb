#!/usr/bin/env bb

(ns genpass
  (:require [clojure.edn :as edn]
            [clojure.java.io :as io]))

(defn generate-password [length]
  (let [chars "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?"
        sr (java.security.SecureRandom.)]
    (apply str (repeatedly length #(nth chars (.nextInt sr (.length chars)))))))

(defn load-store [path]
  (if (.exists (io/file path))
    (edn/read-string (slurp path))
    {}))

(defn save-store [path store]
  (spit path (pr-str store)))

(defn -main []
  (let [portal (first *command-line-args*)]
    (if-not portal
      (do
        (println "Error: Portal name required.")
        (println "Usage: bb genpass.bb <portal-name>")
        (System/exit 1))
      (let [store-path "passwords.edn"
            store (load-store store-path)]
        (if-let [existing (get store portal)]
          (do
            (println "Portal:" portal)
            (println "Password:" existing))
          (let [new-pass (generate-password 20)
                updated-store (assoc store portal new-pass)]
            (save-store store-path updated-store)
            (println "Generated new password for portal:" portal)
            (println "Password:" new-pass)))))))

(when (= *file* (System/getProperty "babashka.file"))
  (-main))
