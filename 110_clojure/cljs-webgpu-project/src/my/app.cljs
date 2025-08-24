(ns my.app)

(def shader-code "
  @vertex
  fn vs_main(@builtin(vertex_index) in_vertex_index: u32) -> @builtin(position) vec4<f32> {
    var pos = array<vec2<f32>, 3>(
        vec2<f32>(0.0, 0.7),
        vec2<f32>(-0.75, -0.75),
        vec2<f32>(0.75, -0.75)
    );
    return vec4<f32>(pos[in_vertex_index], 0.0, 1.0);
  }

  @fragment
  fn fs_main() -> @location(0) vec4<f32> {
    return vec4<f32>(1.0, 0.0, 0.0, 1.0); // Return red
  }
")

(defn draw [^js/GPUDevice device ^js/GPUCanvasContext context render-pipeline]
  (let [command-encoder (.createCommandEncoder device)
        texture-view (-> (.getCurrentTexture context) (.createView))
        
        ;; Manually build the descriptor to fix the bug
        render-pass-descriptor (js/Object.)
        color-attachment (js/Object.)]
    
    (aset color-attachment "view" texture-view)
    (aset color-attachment "clearValue" #js {:r 0.1 :g 0.1 :b 0.1 :a 1.0})
    (aset color-attachment "loadOp" "clear")
    (aset color-attachment "storeOp" "store")

    (aset render-pass-descriptor "colorAttachments" #js [color-attachment])
        
    (let [pass-encoder (.beginRenderPass command-encoder render-pass-descriptor)]
      (.setPipeline pass-encoder render-pipeline)
      (.draw pass-encoder 3 1 0 0)
      (.end pass-encoder))
    
    (-> device .-queue (.submit #js [(.finish command-encoder)]))))

(defn create-pipeline [^js/GPUDevice device shader-module presentation-format]
  (let [descriptor (js/Object.)]
    (aset descriptor "layout" "auto")
    (aset descriptor "primitive" #js {:topology "triangle-list"})
    (let [vertex-stage (js/Object.)]
      (aset vertex-stage "module" shader-module)
      (aset vertex-stage "entryPoint" "vs_main")
      (aset descriptor "vertex" vertex-stage))
    (let [fragment-stage (js/Object.)
          color-target (js/Object.)]
      (aset color-target "format" presentation-format)
      (aset fragment-stage "module" shader-module)
      (aset fragment-stage "entryPoint" "fs_main")
      (aset fragment-stage "targets" #js [color-target])
      (aset descriptor "fragment" fragment-stage))
    (let [pipeline (.createRenderPipeline device descriptor)]
      (js/console.log "Render pipeline created!" pipeline)
      pipeline)))

(defn configure-canvas [^js/GPUDevice device ^js/GPU gpu]
  (let [canvas (.getElementById js/document "webgpu-canvas")
        context (.getContext canvas "webgpu")
        presentation-format (.getPreferredCanvasFormat gpu)]
    (.configure context #js {:device device :format presentation-format})
    (js/console.log "Canvas configured successfully.")
    #js {:context context :format presentation-format}))

(defn ^:export init []
  (if-let [gpu (-> js/navigator .-gpu)]
    (do
      (js/console.log "Success! This browser supports WebGPU.")
      (-> (.requestAdapter gpu)
          (.then (fn [^js/GPUAdapter adapter]
                   (js/console.log "Adapter received!" adapter)
                   (-> (.requestDevice adapter)
                       (.then (fn [^js/GPUDevice device]
                                (js/console.log "Device received!" device)
                                (let [canvas-info (configure-canvas device gpu)
                                      shader-module (.createShaderModule device #js {:code shader-code})
                                      render-pipeline (create-pipeline device shader-module (.-format canvas-info))]
                                  (draw device (.-context canvas-info) render-pipeline)))
                              (fn [error]
                                (js/console.error "Failed to get device." error)))))
                 (fn [error]
                   (js/console.error "Failed to get GPU adapter." error)))))
    (js/console.error "Sorry, this browser does not support WebGPU.")))
