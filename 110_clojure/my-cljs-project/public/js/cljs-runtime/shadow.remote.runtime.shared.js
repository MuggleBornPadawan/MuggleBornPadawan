goog.provide('shadow.remote.runtime.shared');
shadow.remote.runtime.shared.init_state = (function shadow$remote$runtime$shared$init_state(client_info){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"extensions","extensions",-1103629196),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"ops","ops",1237330063),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"client-info","client-info",1958982504),client_info,new cljs.core.Keyword(null,"call-id-seq","call-id-seq",-1679248218),(0),new cljs.core.Keyword(null,"call-handlers","call-handlers",386605551),cljs.core.PersistentArrayMap.EMPTY], null);
});
shadow.remote.runtime.shared.now = (function shadow$remote$runtime$shared$now(){
return Date.now();
});
shadow.remote.runtime.shared.get_client_id = (function shadow$remote$runtime$shared$get_client_id(p__12331){
var map__12332 = p__12331;
var map__12332__$1 = cljs.core.__destructure_map(map__12332);
var runtime = map__12332__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12332__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
var or__5025__auto__ = new cljs.core.Keyword(null,"client-id","client-id",-464622140).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state_ref));
if(cljs.core.truth_(or__5025__auto__)){
return or__5025__auto__;
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("runtime has no assigned runtime-id",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"runtime","runtime",-1331573996),runtime], null));
}
});
shadow.remote.runtime.shared.relay_msg = (function shadow$remote$runtime$shared$relay_msg(runtime,msg){
var self_id_12599 = shadow.remote.runtime.shared.get_client_id(runtime);
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"to","to",192099007).cljs$core$IFn$_invoke$arity$1(msg),self_id_12599)){
shadow.remote.runtime.api.relay_msg(runtime,msg);
} else {
Promise.resolve((1)).then((function (){
var G__12339 = runtime;
var G__12340 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(msg,new cljs.core.Keyword(null,"from","from",1815293044),self_id_12599);
return (shadow.remote.runtime.shared.process.cljs$core$IFn$_invoke$arity$2 ? shadow.remote.runtime.shared.process.cljs$core$IFn$_invoke$arity$2(G__12339,G__12340) : shadow.remote.runtime.shared.process.call(null,G__12339,G__12340));
}));
}

return msg;
});
shadow.remote.runtime.shared.reply = (function shadow$remote$runtime$shared$reply(runtime,p__12341,res){
var map__12342 = p__12341;
var map__12342__$1 = cljs.core.__destructure_map(map__12342);
var call_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12342__$1,new cljs.core.Keyword(null,"call-id","call-id",1043012968));
var from = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12342__$1,new cljs.core.Keyword(null,"from","from",1815293044));
var res__$1 = (function (){var G__12343 = res;
var G__12343__$1 = (cljs.core.truth_(call_id)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__12343,new cljs.core.Keyword(null,"call-id","call-id",1043012968),call_id):G__12343);
if(cljs.core.truth_(from)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__12343__$1,new cljs.core.Keyword(null,"to","to",192099007),from);
} else {
return G__12343__$1;
}
})();
return shadow.remote.runtime.api.relay_msg(runtime,res__$1);
});
shadow.remote.runtime.shared.call = (function shadow$remote$runtime$shared$call(var_args){
var G__12349 = arguments.length;
switch (G__12349) {
case 3:
return shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$3 = (function (runtime,msg,handlers){
return shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$4(runtime,msg,handlers,(0));
}));

(shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$4 = (function (p__12350,msg,handlers,timeout_after_ms){
var map__12351 = p__12350;
var map__12351__$1 = cljs.core.__destructure_map(map__12351);
var runtime = map__12351__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12351__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
if(cljs.core.map_QMARK_(msg)){
} else {
throw (new Error("Assert failed: (map? msg)"));
}

if(cljs.core.map_QMARK_(handlers)){
} else {
throw (new Error("Assert failed: (map? handlers)"));
}

if(cljs.core.nat_int_QMARK_(timeout_after_ms)){
} else {
throw (new Error("Assert failed: (nat-int? timeout-after-ms)"));
}

var call_id = new cljs.core.Keyword(null,"call-id-seq","call-id-seq",-1679248218).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state_ref));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state_ref,cljs.core.update,new cljs.core.Keyword(null,"call-id-seq","call-id-seq",-1679248218),cljs.core.inc);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state_ref,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"call-handlers","call-handlers",386605551),call_id], null),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"handlers","handlers",79528781),handlers,new cljs.core.Keyword(null,"called-at","called-at",607081160),shadow.remote.runtime.shared.now(),new cljs.core.Keyword(null,"msg","msg",-1386103444),msg,new cljs.core.Keyword(null,"timeout","timeout",-318625318),timeout_after_ms], null));

return shadow.remote.runtime.api.relay_msg(runtime,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(msg,new cljs.core.Keyword(null,"call-id","call-id",1043012968),call_id));
}));

(shadow.remote.runtime.shared.call.cljs$lang$maxFixedArity = 4);

shadow.remote.runtime.shared.trigger_BANG_ = (function shadow$remote$runtime$shared$trigger_BANG_(var_args){
var args__5755__auto__ = [];
var len__5749__auto___12601 = arguments.length;
var i__5750__auto___12602 = (0);
while(true){
if((i__5750__auto___12602 < len__5749__auto___12601)){
args__5755__auto__.push((arguments[i__5750__auto___12602]));

var G__12603 = (i__5750__auto___12602 + (1));
i__5750__auto___12602 = G__12603;
continue;
} else {
}
break;
}

var argseq__5756__auto__ = ((((2) < args__5755__auto__.length))?(new cljs.core.IndexedSeq(args__5755__auto__.slice((2)),(0),null)):null);
return shadow.remote.runtime.shared.trigger_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__5756__auto__);
});

(shadow.remote.runtime.shared.trigger_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (p__12356,ev,args){
var map__12357 = p__12356;
var map__12357__$1 = cljs.core.__destructure_map(map__12357);
var runtime = map__12357__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12357__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
var seq__12358 = cljs.core.seq(cljs.core.vals(new cljs.core.Keyword(null,"extensions","extensions",-1103629196).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state_ref))));
var chunk__12361 = null;
var count__12362 = (0);
var i__12363 = (0);
while(true){
if((i__12363 < count__12362)){
var ext = chunk__12361.cljs$core$IIndexed$_nth$arity$2(null,i__12363);
var ev_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(ext,ev);
if(cljs.core.truth_(ev_fn)){
cljs.core.apply.cljs$core$IFn$_invoke$arity$2(ev_fn,args);


var G__12605 = seq__12358;
var G__12606 = chunk__12361;
var G__12607 = count__12362;
var G__12608 = (i__12363 + (1));
seq__12358 = G__12605;
chunk__12361 = G__12606;
count__12362 = G__12607;
i__12363 = G__12608;
continue;
} else {
var G__12609 = seq__12358;
var G__12610 = chunk__12361;
var G__12611 = count__12362;
var G__12612 = (i__12363 + (1));
seq__12358 = G__12609;
chunk__12361 = G__12610;
count__12362 = G__12611;
i__12363 = G__12612;
continue;
}
} else {
var temp__5823__auto__ = cljs.core.seq(seq__12358);
if(temp__5823__auto__){
var seq__12358__$1 = temp__5823__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__12358__$1)){
var c__5548__auto__ = cljs.core.chunk_first(seq__12358__$1);
var G__12613 = cljs.core.chunk_rest(seq__12358__$1);
var G__12614 = c__5548__auto__;
var G__12615 = cljs.core.count(c__5548__auto__);
var G__12616 = (0);
seq__12358 = G__12613;
chunk__12361 = G__12614;
count__12362 = G__12615;
i__12363 = G__12616;
continue;
} else {
var ext = cljs.core.first(seq__12358__$1);
var ev_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(ext,ev);
if(cljs.core.truth_(ev_fn)){
cljs.core.apply.cljs$core$IFn$_invoke$arity$2(ev_fn,args);


var G__12617 = cljs.core.next(seq__12358__$1);
var G__12618 = null;
var G__12619 = (0);
var G__12620 = (0);
seq__12358 = G__12617;
chunk__12361 = G__12618;
count__12362 = G__12619;
i__12363 = G__12620;
continue;
} else {
var G__12621 = cljs.core.next(seq__12358__$1);
var G__12622 = null;
var G__12623 = (0);
var G__12624 = (0);
seq__12358 = G__12621;
chunk__12361 = G__12622;
count__12362 = G__12623;
i__12363 = G__12624;
continue;
}
}
} else {
return null;
}
}
break;
}
}));

(shadow.remote.runtime.shared.trigger_BANG_.cljs$lang$maxFixedArity = (2));

/** @this {Function} */
(shadow.remote.runtime.shared.trigger_BANG_.cljs$lang$applyTo = (function (seq12352){
var G__12353 = cljs.core.first(seq12352);
var seq12352__$1 = cljs.core.next(seq12352);
var G__12354 = cljs.core.first(seq12352__$1);
var seq12352__$2 = cljs.core.next(seq12352__$1);
var self__5734__auto__ = this;
return self__5734__auto__.cljs$core$IFn$_invoke$arity$variadic(G__12353,G__12354,seq12352__$2);
}));

shadow.remote.runtime.shared.welcome = (function shadow$remote$runtime$shared$welcome(p__12391,p__12392){
var map__12396 = p__12391;
var map__12396__$1 = cljs.core.__destructure_map(map__12396);
var runtime = map__12396__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12396__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
var map__12397 = p__12392;
var map__12397__$1 = cljs.core.__destructure_map(map__12397);
var msg = map__12397__$1;
var client_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12397__$1,new cljs.core.Keyword(null,"client-id","client-id",-464622140));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(state_ref,cljs.core.assoc,new cljs.core.Keyword(null,"client-id","client-id",-464622140),client_id,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"welcome","welcome",-578152123),true], 0));

var map__12429 = cljs.core.deref(state_ref);
var map__12429__$1 = cljs.core.__destructure_map(map__12429);
var client_info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12429__$1,new cljs.core.Keyword(null,"client-info","client-info",1958982504));
var extensions = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12429__$1,new cljs.core.Keyword(null,"extensions","extensions",-1103629196));
shadow.remote.runtime.shared.relay_msg(runtime,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"hello","hello",-245025397),new cljs.core.Keyword(null,"client-info","client-info",1958982504),client_info], null));

return shadow.remote.runtime.shared.trigger_BANG_(runtime,new cljs.core.Keyword(null,"on-welcome","on-welcome",1895317125));
});
shadow.remote.runtime.shared.ping = (function shadow$remote$runtime$shared$ping(runtime,msg){
return shadow.remote.runtime.shared.reply(runtime,msg,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"pong","pong",-172484958)], null));
});
shadow.remote.runtime.shared.request_supported_ops = (function shadow$remote$runtime$shared$request_supported_ops(p__12454,msg){
var map__12455 = p__12454;
var map__12455__$1 = cljs.core.__destructure_map(map__12455);
var runtime = map__12455__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12455__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
return shadow.remote.runtime.shared.reply(runtime,msg,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"supported-ops","supported-ops",337914702),new cljs.core.Keyword(null,"ops","ops",1237330063),cljs.core.disj.cljs$core$IFn$_invoke$arity$variadic(cljs.core.set(cljs.core.keys(new cljs.core.Keyword(null,"ops","ops",1237330063).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state_ref)))),new cljs.core.Keyword(null,"welcome","welcome",-578152123),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"unknown-relay-op","unknown-relay-op",170832753),new cljs.core.Keyword(null,"unknown-op","unknown-op",1900385996),new cljs.core.Keyword(null,"request-supported-ops","request-supported-ops",-1034994502),new cljs.core.Keyword(null,"tool-disconnect","tool-disconnect",189103996)], 0))], null));
});
shadow.remote.runtime.shared.unknown_relay_op = (function shadow$remote$runtime$shared$unknown_relay_op(msg){
return console.warn("unknown-relay-op",msg);
});
shadow.remote.runtime.shared.unknown_op = (function shadow$remote$runtime$shared$unknown_op(msg){
return console.warn("unknown-op",msg);
});
shadow.remote.runtime.shared.add_extension_STAR_ = (function shadow$remote$runtime$shared$add_extension_STAR_(p__12459,key,p__12460){
var map__12462 = p__12459;
var map__12462__$1 = cljs.core.__destructure_map(map__12462);
var state = map__12462__$1;
var extensions = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12462__$1,new cljs.core.Keyword(null,"extensions","extensions",-1103629196));
var map__12463 = p__12460;
var map__12463__$1 = cljs.core.__destructure_map(map__12463);
var spec = map__12463__$1;
var ops = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12463__$1,new cljs.core.Keyword(null,"ops","ops",1237330063));
var transit_write_handlers = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12463__$1,new cljs.core.Keyword(null,"transit-write-handlers","transit-write-handlers",1886308716));
if(cljs.core.contains_QMARK_(extensions,key)){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("extension already registered",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),key,new cljs.core.Keyword(null,"spec","spec",347520401),spec], null));
} else {
}

return cljs.core.reduce_kv((function (state__$1,op_kw,op_handler){
if(cljs.core.truth_(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state__$1,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ops","ops",1237330063),op_kw], null)))){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("op already registered",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),key,new cljs.core.Keyword(null,"op","op",-1882987955),op_kw], null));
} else {
}

return cljs.core.assoc_in(state__$1,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ops","ops",1237330063),op_kw], null),op_handler);
}),cljs.core.assoc_in(state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"extensions","extensions",-1103629196),key], null),spec),ops);
});
shadow.remote.runtime.shared.add_extension = (function shadow$remote$runtime$shared$add_extension(p__12468,key,spec){
var map__12469 = p__12468;
var map__12469__$1 = cljs.core.__destructure_map(map__12469);
var runtime = map__12469__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12469__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state_ref,shadow.remote.runtime.shared.add_extension_STAR_,key,spec);

var temp__5827__auto___12629 = new cljs.core.Keyword(null,"on-welcome","on-welcome",1895317125).cljs$core$IFn$_invoke$arity$1(spec);
if((temp__5827__auto___12629 == null)){
} else {
var on_welcome_12631 = temp__5827__auto___12629;
if(cljs.core.truth_(new cljs.core.Keyword(null,"welcome","welcome",-578152123).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state_ref)))){
(on_welcome_12631.cljs$core$IFn$_invoke$arity$0 ? on_welcome_12631.cljs$core$IFn$_invoke$arity$0() : on_welcome_12631.call(null));
} else {
}
}

return runtime;
});
shadow.remote.runtime.shared.add_defaults = (function shadow$remote$runtime$shared$add_defaults(runtime){
return shadow.remote.runtime.shared.add_extension(runtime,new cljs.core.Keyword("shadow.remote.runtime.shared","defaults","shadow.remote.runtime.shared/defaults",-1821257543),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"ops","ops",1237330063),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"welcome","welcome",-578152123),(function (p1__12470_SHARP_){
return shadow.remote.runtime.shared.welcome(runtime,p1__12470_SHARP_);
}),new cljs.core.Keyword(null,"unknown-relay-op","unknown-relay-op",170832753),(function (p1__12471_SHARP_){
return shadow.remote.runtime.shared.unknown_relay_op(p1__12471_SHARP_);
}),new cljs.core.Keyword(null,"unknown-op","unknown-op",1900385996),(function (p1__12472_SHARP_){
return shadow.remote.runtime.shared.unknown_op(p1__12472_SHARP_);
}),new cljs.core.Keyword(null,"ping","ping",-1670114784),(function (p1__12473_SHARP_){
return shadow.remote.runtime.shared.ping(runtime,p1__12473_SHARP_);
}),new cljs.core.Keyword(null,"request-supported-ops","request-supported-ops",-1034994502),(function (p1__12474_SHARP_){
return shadow.remote.runtime.shared.request_supported_ops(runtime,p1__12474_SHARP_);
})], null)], null));
});
shadow.remote.runtime.shared.del_extension_STAR_ = (function shadow$remote$runtime$shared$del_extension_STAR_(state,key){
var ext = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"extensions","extensions",-1103629196),key], null));
if(cljs.core.not(ext)){
return state;
} else {
return cljs.core.reduce_kv((function (state__$1,op_kw,op_handler){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(state__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ops","ops",1237330063)], null),cljs.core.dissoc,op_kw);
}),cljs.core.update.cljs$core$IFn$_invoke$arity$4(state,new cljs.core.Keyword(null,"extensions","extensions",-1103629196),cljs.core.dissoc,key),new cljs.core.Keyword(null,"ops","ops",1237330063).cljs$core$IFn$_invoke$arity$1(ext));
}
});
shadow.remote.runtime.shared.del_extension = (function shadow$remote$runtime$shared$del_extension(p__12500,key){
var map__12501 = p__12500;
var map__12501__$1 = cljs.core.__destructure_map(map__12501);
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12501__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(state_ref,shadow.remote.runtime.shared.del_extension_STAR_,key);
});
shadow.remote.runtime.shared.unhandled_call_result = (function shadow$remote$runtime$shared$unhandled_call_result(call_config,msg){
return console.warn("unhandled call result",msg,call_config);
});
shadow.remote.runtime.shared.unhandled_client_not_found = (function shadow$remote$runtime$shared$unhandled_client_not_found(p__12505,msg){
var map__12506 = p__12505;
var map__12506__$1 = cljs.core.__destructure_map(map__12506);
var runtime = map__12506__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12506__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
return shadow.remote.runtime.shared.trigger_BANG_.cljs$core$IFn$_invoke$arity$variadic(runtime,new cljs.core.Keyword(null,"on-client-not-found","on-client-not-found",-642452849),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([msg], 0));
});
shadow.remote.runtime.shared.reply_unknown_op = (function shadow$remote$runtime$shared$reply_unknown_op(runtime,msg){
return shadow.remote.runtime.shared.reply(runtime,msg,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"unknown-op","unknown-op",1900385996),new cljs.core.Keyword(null,"msg","msg",-1386103444),msg], null));
});
shadow.remote.runtime.shared.process = (function shadow$remote$runtime$shared$process(p__12550,p__12551){
var map__12552 = p__12550;
var map__12552__$1 = cljs.core.__destructure_map(map__12552);
var runtime = map__12552__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12552__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
var map__12553 = p__12551;
var map__12553__$1 = cljs.core.__destructure_map(map__12553);
var msg = map__12553__$1;
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12553__$1,new cljs.core.Keyword(null,"op","op",-1882987955));
var call_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12553__$1,new cljs.core.Keyword(null,"call-id","call-id",1043012968));
var state = cljs.core.deref(state_ref);
var op_handler = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ops","ops",1237330063),op], null));
if(cljs.core.truth_(call_id)){
var cfg = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"call-handlers","call-handlers",386605551),call_id], null));
var call_handler = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cfg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"handlers","handlers",79528781),op], null));
if(cljs.core.truth_(call_handler)){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(state_ref,cljs.core.update,new cljs.core.Keyword(null,"call-handlers","call-handlers",386605551),cljs.core.dissoc,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([call_id], 0));

return (call_handler.cljs$core$IFn$_invoke$arity$1 ? call_handler.cljs$core$IFn$_invoke$arity$1(msg) : call_handler.call(null,msg));
} else {
if(cljs.core.truth_(op_handler)){
return (op_handler.cljs$core$IFn$_invoke$arity$1 ? op_handler.cljs$core$IFn$_invoke$arity$1(msg) : op_handler.call(null,msg));
} else {
return shadow.remote.runtime.shared.unhandled_call_result(cfg,msg);

}
}
} else {
if(cljs.core.truth_(op_handler)){
return (op_handler.cljs$core$IFn$_invoke$arity$1 ? op_handler.cljs$core$IFn$_invoke$arity$1(msg) : op_handler.call(null,msg));
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"client-not-found","client-not-found",-1754042614),op)){
return shadow.remote.runtime.shared.unhandled_client_not_found(runtime,msg);
} else {
return shadow.remote.runtime.shared.reply_unknown_op(runtime,msg);

}
}
}
});
shadow.remote.runtime.shared.run_on_idle = (function shadow$remote$runtime$shared$run_on_idle(state_ref){
var seq__12576 = cljs.core.seq(cljs.core.vals(new cljs.core.Keyword(null,"extensions","extensions",-1103629196).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state_ref))));
var chunk__12578 = null;
var count__12579 = (0);
var i__12580 = (0);
while(true){
if((i__12580 < count__12579)){
var map__12596 = chunk__12578.cljs$core$IIndexed$_nth$arity$2(null,i__12580);
var map__12596__$1 = cljs.core.__destructure_map(map__12596);
var on_idle = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12596__$1,new cljs.core.Keyword(null,"on-idle","on-idle",2044706602));
if(cljs.core.truth_(on_idle)){
(on_idle.cljs$core$IFn$_invoke$arity$0 ? on_idle.cljs$core$IFn$_invoke$arity$0() : on_idle.call(null));


var G__12640 = seq__12576;
var G__12641 = chunk__12578;
var G__12642 = count__12579;
var G__12643 = (i__12580 + (1));
seq__12576 = G__12640;
chunk__12578 = G__12641;
count__12579 = G__12642;
i__12580 = G__12643;
continue;
} else {
var G__12644 = seq__12576;
var G__12645 = chunk__12578;
var G__12646 = count__12579;
var G__12647 = (i__12580 + (1));
seq__12576 = G__12644;
chunk__12578 = G__12645;
count__12579 = G__12646;
i__12580 = G__12647;
continue;
}
} else {
var temp__5823__auto__ = cljs.core.seq(seq__12576);
if(temp__5823__auto__){
var seq__12576__$1 = temp__5823__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__12576__$1)){
var c__5548__auto__ = cljs.core.chunk_first(seq__12576__$1);
var G__12652 = cljs.core.chunk_rest(seq__12576__$1);
var G__12653 = c__5548__auto__;
var G__12654 = cljs.core.count(c__5548__auto__);
var G__12655 = (0);
seq__12576 = G__12652;
chunk__12578 = G__12653;
count__12579 = G__12654;
i__12580 = G__12655;
continue;
} else {
var map__12598 = cljs.core.first(seq__12576__$1);
var map__12598__$1 = cljs.core.__destructure_map(map__12598);
var on_idle = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12598__$1,new cljs.core.Keyword(null,"on-idle","on-idle",2044706602));
if(cljs.core.truth_(on_idle)){
(on_idle.cljs$core$IFn$_invoke$arity$0 ? on_idle.cljs$core$IFn$_invoke$arity$0() : on_idle.call(null));


var G__12658 = cljs.core.next(seq__12576__$1);
var G__12659 = null;
var G__12660 = (0);
var G__12661 = (0);
seq__12576 = G__12658;
chunk__12578 = G__12659;
count__12579 = G__12660;
i__12580 = G__12661;
continue;
} else {
var G__12662 = cljs.core.next(seq__12576__$1);
var G__12663 = null;
var G__12664 = (0);
var G__12665 = (0);
seq__12576 = G__12662;
chunk__12578 = G__12663;
count__12579 = G__12664;
i__12580 = G__12665;
continue;
}
}
} else {
return null;
}
}
break;
}
});

//# sourceMappingURL=shadow.remote.runtime.shared.js.map
