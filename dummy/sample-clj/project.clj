(defproject sample-clj "0.1.0-SNAPSHOT"
  :description "Sample Clojure project with edge-case tests"
  :license {:name "EPL-2.0"}
  :dependencies [[org.clojure/clojure "1.12.0"]]
  :source-paths ["src"]
  :test-paths ["test"]
  :profiles {:dev {:dependencies [[org.clojure/test.check "1.1.1"]]}}
  :main sample-clj.core)
