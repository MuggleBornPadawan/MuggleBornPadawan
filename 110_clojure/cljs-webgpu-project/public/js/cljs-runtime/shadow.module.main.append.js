
shadow.cljs.devtools.client.env.module_loaded('main');

try { my.app.init(); } catch (e) { console.error("An error occurred when calling (my.app/init)"); console.error(e); }