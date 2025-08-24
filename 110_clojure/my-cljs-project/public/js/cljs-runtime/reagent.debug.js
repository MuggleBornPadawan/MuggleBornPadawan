goog.provide('reagent.debug');
reagent.debug.has_console = (typeof console !== 'undefined');
reagent.debug.tracking = false;
if((typeof reagent !== 'undefined') && (typeof reagent.debug !== 'undefined') && (typeof reagent.debug.warnings !== 'undefined')){
} else {
reagent.debug.warnings = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
}
if((typeof reagent !== 'undefined') && (typeof reagent.debug !== 'undefined') && (typeof reagent.debug.track_console !== 'undefined')){
} else {
reagent.debug.track_console = (function (){var o = ({});
(o.warn = (function() { 
var G__7660__delegate = function (args){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(reagent.debug.warnings,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"warn","warn",-436710552)], null),cljs.core.conj,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,args)], 0));
};
var G__7660 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__7661__i = 0, G__7661__a = new Array(arguments.length -  0);
while (G__7661__i < G__7661__a.length) {G__7661__a[G__7661__i] = arguments[G__7661__i + 0]; ++G__7661__i;}
  args = new cljs.core.IndexedSeq(G__7661__a,0,null);
} 
return G__7660__delegate.call(this,args);};
G__7660.cljs$lang$maxFixedArity = 0;
G__7660.cljs$lang$applyTo = (function (arglist__7663){
var args = cljs.core.seq(arglist__7663);
return G__7660__delegate(args);
});
G__7660.cljs$core$IFn$_invoke$arity$variadic = G__7660__delegate;
return G__7660;
})()
);

(o.error = (function() { 
var G__7667__delegate = function (args){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(reagent.debug.warnings,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"error","error",-978969032)], null),cljs.core.conj,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,args)], 0));
};
var G__7667 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__7668__i = 0, G__7668__a = new Array(arguments.length -  0);
while (G__7668__i < G__7668__a.length) {G__7668__a[G__7668__i] = arguments[G__7668__i + 0]; ++G__7668__i;}
  args = new cljs.core.IndexedSeq(G__7668__a,0,null);
} 
return G__7667__delegate.call(this,args);};
G__7667.cljs$lang$maxFixedArity = 0;
G__7667.cljs$lang$applyTo = (function (arglist__7669){
var args = cljs.core.seq(arglist__7669);
return G__7667__delegate(args);
});
G__7667.cljs$core$IFn$_invoke$arity$variadic = G__7667__delegate;
return G__7667;
})()
);

return o;
})();
}
reagent.debug.track_warnings = (function reagent$debug$track_warnings(f){
(reagent.debug.tracking = true);

cljs.core.reset_BANG_(reagent.debug.warnings,null);

(f.cljs$core$IFn$_invoke$arity$0 ? f.cljs$core$IFn$_invoke$arity$0() : f.call(null));

var warns = cljs.core.deref(reagent.debug.warnings);
cljs.core.reset_BANG_(reagent.debug.warnings,null);

(reagent.debug.tracking = false);

return warns;
});

//# sourceMappingURL=reagent.debug.js.map
