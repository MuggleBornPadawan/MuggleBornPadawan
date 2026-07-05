(def my-seq (seq [1 2 3 4 53]))
(first my-seq)      ; => 1
(rest my-seq)       ; => (2 3)
(map inc [1 2 3])   ; => (2 3 4) (returns a lazy sequence)
