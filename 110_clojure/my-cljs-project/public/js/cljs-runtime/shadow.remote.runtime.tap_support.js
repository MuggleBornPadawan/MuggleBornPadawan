goog.provide('shadow.remote.runtime.tap_support');
shadow.remote.runtime.tap_support.tap_subscribe = (function shadow$remote$runtime$tap_support$tap_subscribe(p__17465,p__17466){
var map__17467 = p__17465;
var map__17467__$1 = cljs.core.__destructure_map(map__17467);
var svc = map__17467__$1;
var subs_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17467__$1,new cljs.core.Keyword(null,"subs-ref","subs-ref",-1355989911));
var obj_support = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17467__$1,new cljs.core.Keyword(null,"obj-support","obj-support",1522559229));
var runtime = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17467__$1,new cljs.core.Keyword(null,"runtime","runtime",-1331573996));
var map__17469 = p__17466;
var map__17469__$1 = cljs.core.__destructure_map(map__17469);
var msg = map__17469__$1;
var from = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17469__$1,new cljs.core.Keyword(null,"from","from",1815293044));
var summary = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17469__$1,new cljs.core.Keyword(null,"summary","summary",380847952));
var history__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17469__$1,new cljs.core.Keyword(null,"history","history",-247395220));
var num = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__17469__$1,new cljs.core.Keyword(null,"num","num",1985240673),(10));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(subs_ref,cljs.core.assoc,from,msg);

if(cljs.core.truth_(history__$1)){
return shadow.remote.runtime.shared.reply(runtime,msg,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"tap-subscribed","tap-subscribed",-1882247432),new cljs.core.Keyword(null,"history","history",-247395220),cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (oid){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"oid","oid",-768692334),oid,new cljs.core.Keyword(null,"summary","summary",380847952),shadow.remote.runtime.obj_support.obj_describe_STAR_(obj_support,oid)], null);
}),shadow.remote.runtime.obj_support.get_tap_history(obj_support,num)))], null));
} else {
return null;
}
});
shadow.remote.runtime.tap_support.tap_unsubscribe = (function shadow$remote$runtime$tap_support$tap_unsubscribe(p__17480,p__17481){
var map__17482 = p__17480;
var map__17482__$1 = cljs.core.__destructure_map(map__17482);
var subs_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17482__$1,new cljs.core.Keyword(null,"subs-ref","subs-ref",-1355989911));
var map__17483 = p__17481;
var map__17483__$1 = cljs.core.__destructure_map(map__17483);
var from = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17483__$1,new cljs.core.Keyword(null,"from","from",1815293044));
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(subs_ref,cljs.core.dissoc,from);
});
shadow.remote.runtime.tap_support.request_tap_history = (function shadow$remote$runtime$tap_support$request_tap_history(p__17491,p__17492){
var map__17494 = p__17491;
var map__17494__$1 = cljs.core.__destructure_map(map__17494);
var obj_support = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17494__$1,new cljs.core.Keyword(null,"obj-support","obj-support",1522559229));
var runtime = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17494__$1,new cljs.core.Keyword(null,"runtime","runtime",-1331573996));
var map__17495 = p__17492;
var map__17495__$1 = cljs.core.__destructure_map(map__17495);
var msg = map__17495__$1;
var num = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__17495__$1,new cljs.core.Keyword(null,"num","num",1985240673),(10));
var tap_ids = shadow.remote.runtime.obj_support.get_tap_history(obj_support,num);
return shadow.remote.runtime.shared.reply(runtime,msg,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"tap-history","tap-history",-282803347),new cljs.core.Keyword(null,"oids","oids",-1580877688),tap_ids], null));
});
shadow.remote.runtime.tap_support.tool_disconnect = (function shadow$remote$runtime$tap_support$tool_disconnect(p__17498,tid){
var map__17499 = p__17498;
var map__17499__$1 = cljs.core.__destructure_map(map__17499);
var svc = map__17499__$1;
var subs_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17499__$1,new cljs.core.Keyword(null,"subs-ref","subs-ref",-1355989911));
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(subs_ref,cljs.core.dissoc,tid);
});
shadow.remote.runtime.tap_support.start = (function shadow$remote$runtime$tap_support$start(runtime,obj_support){
var subs_ref = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var tap_fn = (function shadow$remote$runtime$tap_support$start_$_runtime_tap(obj){
if((!((obj == null)))){
var oid = shadow.remote.runtime.obj_support.register(obj_support,obj,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"from","from",1815293044),new cljs.core.Keyword(null,"tap","tap",-1086702463)], null));
var seq__17511 = cljs.core.seq(cljs.core.deref(subs_ref));
var chunk__17512 = null;
var count__17513 = (0);
var i__17514 = (0);
while(true){
if((i__17514 < count__17513)){
var vec__17548 = chunk__17512.cljs$core$IIndexed$_nth$arity$2(null,i__17514);
var tid = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17548,(0),null);
var tap_config = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17548,(1),null);
shadow.remote.runtime.api.relay_msg(runtime,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"tap","tap",-1086702463),new cljs.core.Keyword(null,"to","to",192099007),tid,new cljs.core.Keyword(null,"oid","oid",-768692334),oid], null));


var G__17631 = seq__17511;
var G__17632 = chunk__17512;
var G__17633 = count__17513;
var G__17634 = (i__17514 + (1));
seq__17511 = G__17631;
chunk__17512 = G__17632;
count__17513 = G__17633;
i__17514 = G__17634;
continue;
} else {
var temp__5823__auto__ = cljs.core.seq(seq__17511);
if(temp__5823__auto__){
var seq__17511__$1 = temp__5823__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__17511__$1)){
var c__5548__auto__ = cljs.core.chunk_first(seq__17511__$1);
var G__17645 = cljs.core.chunk_rest(seq__17511__$1);
var G__17646 = c__5548__auto__;
var G__17647 = cljs.core.count(c__5548__auto__);
var G__17648 = (0);
seq__17511 = G__17645;
chunk__17512 = G__17646;
count__17513 = G__17647;
i__17514 = G__17648;
continue;
} else {
var vec__17567 = cljs.core.first(seq__17511__$1);
var tid = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17567,(0),null);
var tap_config = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17567,(1),null);
shadow.remote.runtime.api.relay_msg(runtime,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"tap","tap",-1086702463),new cljs.core.Keyword(null,"to","to",192099007),tid,new cljs.core.Keyword(null,"oid","oid",-768692334),oid], null));


var G__17651 = cljs.core.next(seq__17511__$1);
var G__17652 = null;
var G__17653 = (0);
var G__17654 = (0);
seq__17511 = G__17651;
chunk__17512 = G__17652;
count__17513 = G__17653;
i__17514 = G__17654;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return null;
}
});
var svc = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"runtime","runtime",-1331573996),runtime,new cljs.core.Keyword(null,"obj-support","obj-support",1522559229),obj_support,new cljs.core.Keyword(null,"tap-fn","tap-fn",1573556461),tap_fn,new cljs.core.Keyword(null,"subs-ref","subs-ref",-1355989911),subs_ref], null);
shadow.remote.runtime.api.add_extension(runtime,new cljs.core.Keyword("shadow.remote.runtime.tap-support","ext","shadow.remote.runtime.tap-support/ext",1019069674),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"ops","ops",1237330063),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"tap-subscribe","tap-subscribe",411179050),(function (p1__17502_SHARP_){
return shadow.remote.runtime.tap_support.tap_subscribe(svc,p1__17502_SHARP_);
}),new cljs.core.Keyword(null,"tap-unsubscribe","tap-unsubscribe",1183890755),(function (p1__17504_SHARP_){
return shadow.remote.runtime.tap_support.tap_unsubscribe(svc,p1__17504_SHARP_);
}),new cljs.core.Keyword(null,"request-tap-history","request-tap-history",-670837812),(function (p1__17506_SHARP_){
return shadow.remote.runtime.tap_support.request_tap_history(svc,p1__17506_SHARP_);
})], null),new cljs.core.Keyword(null,"on-tool-disconnect","on-tool-disconnect",693464366),(function (p1__17507_SHARP_){
return shadow.remote.runtime.tap_support.tool_disconnect(svc,p1__17507_SHARP_);
})], null));

cljs.core.add_tap(tap_fn);

return svc;
});
shadow.remote.runtime.tap_support.stop = (function shadow$remote$runtime$tap_support$stop(p__17580){
var map__17581 = p__17580;
var map__17581__$1 = cljs.core.__destructure_map(map__17581);
var svc = map__17581__$1;
var tap_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17581__$1,new cljs.core.Keyword(null,"tap-fn","tap-fn",1573556461));
var runtime = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17581__$1,new cljs.core.Keyword(null,"runtime","runtime",-1331573996));
cljs.core.remove_tap(tap_fn);

return shadow.remote.runtime.api.del_extension(runtime,new cljs.core.Keyword("shadow.remote.runtime.tap-support","ext","shadow.remote.runtime.tap-support/ext",1019069674));
});

//# sourceMappingURL=shadow.remote.runtime.tap_support.js.map
