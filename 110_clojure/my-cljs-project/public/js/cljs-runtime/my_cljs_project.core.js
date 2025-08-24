goog.provide('my_cljs_project.core');
my_cljs_project.core.app = (function my_cljs_project$core$app(){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h1","h1",-1896887462),"Hello from ClojureScript!"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),"Isn't this neat? whta the time"], null)], null);
});
my_cljs_project.core.init = (function my_cljs_project$core$init(){
var root = reagent.dom.client.create_root.cljs$core$IFn$_invoke$arity$1(document.getElementById("app"));
return reagent.dom.client.render.cljs$core$IFn$_invoke$arity$2(root,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [my_cljs_project.core.app], null));
});
goog.exportSymbol('my_cljs_project.core.init', my_cljs_project.core.init);

//# sourceMappingURL=my_cljs_project.core.js.map
