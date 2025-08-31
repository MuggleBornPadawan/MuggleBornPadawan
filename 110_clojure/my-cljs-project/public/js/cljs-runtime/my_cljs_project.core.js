goog.provide('my_cljs_project.core');
my_cljs_project.core.app = (function my_cljs_project$core$app(){
var current_time = reagent.core.atom.cljs$core$IFn$_invoke$arity$1((new Date()));
var timer = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
return reagent.core.create_class.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"component-did-mount","component-did-mount",-1126910518),(function (){
return cljs.core.reset_BANG_(timer,setInterval((function (){
return cljs.core.reset_BANG_(current_time,(new Date()));
}),(1000)));
}),new cljs.core.Keyword(null,"component-will-unmount","component-will-unmount",-2058314698),(function (){
return clearInterval(cljs.core.deref(timer));
}),new cljs.core.Keyword(null,"reagent-render","reagent-render",-985383853),(function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h1","h1",-1896887462),"Hello from ClojureScript!"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),"The current time is: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(current_time))], null)], null);
})], null));
});
my_cljs_project.core.init = (function my_cljs_project$core$init(){
var root = reagent.dom.client.create_root.cljs$core$IFn$_invoke$arity$1(document.getElementById("app"));
return reagent.dom.client.render.cljs$core$IFn$_invoke$arity$2(root,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [my_cljs_project.core.app], null));
});
goog.exportSymbol('my_cljs_project.core.init', my_cljs_project.core.init);

//# sourceMappingURL=my_cljs_project.core.js.map
