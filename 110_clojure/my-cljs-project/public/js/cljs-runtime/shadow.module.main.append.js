
shadow.cljs.devtools.client.env.module_loaded('main');

try { my_cljs_project.core.init(); } catch (e) { console.error("An error occurred when calling (my-cljs-project.core/init)"); console.error(e); }