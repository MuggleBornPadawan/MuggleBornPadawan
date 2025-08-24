goog.provide('my.app');
my.app.shader_code = "\n  @vertex\n  fn vs_main(@builtin(vertex_index) in_vertex_index: u32) -> @builtin(position) vec4<f32> {\n    var pos = array<vec2<f32>, 3>(\n        vec2<f32>(0.0, 0.7),\n        vec2<f32>(-0.75, -0.75),\n        vec2<f32>(0.75, -0.75)\n    );\n    return vec4<f32>(pos[in_vertex_index], 0.0, 1.0);\n  }\n\n  @fragment\n  fn fs_main() -> @location(0) vec4<f32> {\n    return vec4<f32>(1.0, 0.0, 0.0, 1.0); // Return red\n  }\n";
my.app.draw = (function my$app$draw(device,context,render_pipeline){
var command_encoder = device.createCommandEncoder();
var texture_view = context.getCurrentTexture().createView();
var render_pass_descriptor = (new Object());
var color_attachment = (new Object());
(color_attachment["view"] = texture_view);

(color_attachment["clearValue"] = ({"r": 0.1, "g": 0.1, "b": 0.1, "a": 1.0}));

(color_attachment["loadOp"] = "clear");

(color_attachment["storeOp"] = "store");

(render_pass_descriptor["colorAttachments"] = [color_attachment]);

var pass_encoder_11768 = command_encoder.beginRenderPass(render_pass_descriptor);
pass_encoder_11768.setPipeline(render_pipeline);

pass_encoder_11768.draw((3),(1),(0),(0));

pass_encoder_11768.end();

return device.queue.submit([command_encoder.finish()]);
});
my.app.create_pipeline = (function my$app$create_pipeline(device,shader_module,presentation_format){
var descriptor = (new Object());
(descriptor["layout"] = "auto");

(descriptor["primitive"] = ({"topology": "triangle-list"}));

var vertex_stage_11769 = (new Object());
(vertex_stage_11769["module"] = shader_module);

(vertex_stage_11769["entryPoint"] = "vs_main");

(descriptor["vertex"] = vertex_stage_11769);

var fragment_stage_11770 = (new Object());
var color_target_11771 = (new Object());
(color_target_11771["format"] = presentation_format);

(fragment_stage_11770["module"] = shader_module);

(fragment_stage_11770["entryPoint"] = "fs_main");

(fragment_stage_11770["targets"] = [color_target_11771]);

(descriptor["fragment"] = fragment_stage_11770);

var pipeline = device.createRenderPipeline(descriptor);
console.log("Render pipeline created!",pipeline);

return pipeline;
});
my.app.configure_canvas = (function my$app$configure_canvas(device,gpu){
var canvas = document.getElementById("webgpu-canvas");
var context = canvas.getContext("webgpu");
var presentation_format = gpu.getPreferredCanvasFormat();
context.configure(({"device": device, "format": presentation_format}));

console.log("Canvas configured successfully.");

return ({"context": context, "format": presentation_format});
});
my.app.init = (function my$app$init(){
var temp__5821__auto__ = navigator.gpu;
if(cljs.core.truth_(temp__5821__auto__)){
var gpu = temp__5821__auto__;
console.log("Success! This browser supports WebGPU.");

return gpu.requestAdapter().then((function (adapter){
console.log("Adapter received!",adapter);

return adapter.requestDevice().then((function (device){
console.log("Device received!",device);

var canvas_info = my.app.configure_canvas(device,gpu);
var shader_module = device.createShaderModule(({"code": my.app.shader_code}));
var render_pipeline = my.app.create_pipeline(device,shader_module,canvas_info.format);
return my.app.draw(device,canvas_info.context,render_pipeline);
}),(function (error){
return console.error("Failed to get device.",error);
}));
}),(function (error){
return console.error("Failed to get GPU adapter.",error);
}));
} else {
return console.error("Sorry, this browser does not support WebGPU.");
}
});
goog.exportSymbol('my.app.init', my.app.init);

//# sourceMappingURL=my.app.js.map
