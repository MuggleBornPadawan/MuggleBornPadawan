goog.provide('shadow.cljs.devtools.client.browser');
shadow.cljs.devtools.client.browser.devtools_msg = (function shadow$cljs$devtools$client$browser$devtools_msg(var_args){
var args__5755__auto__ = [];
var len__5749__auto___18407 = arguments.length;
var i__5750__auto___18408 = (0);
while(true){
if((i__5750__auto___18408 < len__5749__auto___18407)){
args__5755__auto__.push((arguments[i__5750__auto___18408]));

var G__18409 = (i__5750__auto___18408 + (1));
i__5750__auto___18408 = G__18409;
continue;
} else {
}
break;
}

var argseq__5756__auto__ = ((((1) < args__5755__auto__.length))?(new cljs.core.IndexedSeq(args__5755__auto__.slice((1)),(0),null)):null);
return shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5756__auto__);
});

(shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic = (function (msg,args){
if(shadow.cljs.devtools.client.env.log){
if(cljs.core.seq(shadow.cljs.devtools.client.env.log_style)){
return console.log.apply(console,cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [["%cshadow-cljs: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg)].join(''),shadow.cljs.devtools.client.env.log_style], null),args)));
} else {
return console.log.apply(console,cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [["shadow-cljs: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg)].join('')], null),args)));
}
} else {
return null;
}
}));

(shadow.cljs.devtools.client.browser.devtools_msg.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(shadow.cljs.devtools.client.browser.devtools_msg.cljs$lang$applyTo = (function (seq18121){
var G__18122 = cljs.core.first(seq18121);
var seq18121__$1 = cljs.core.next(seq18121);
var self__5734__auto__ = this;
return self__5734__auto__.cljs$core$IFn$_invoke$arity$variadic(G__18122,seq18121__$1);
}));

shadow.cljs.devtools.client.browser.script_eval = (function shadow$cljs$devtools$client$browser$script_eval(code){
return goog.globalEval(code);
});
shadow.cljs.devtools.client.browser.do_js_load = (function shadow$cljs$devtools$client$browser$do_js_load(sources){
var seq__18125 = cljs.core.seq(sources);
var chunk__18126 = null;
var count__18127 = (0);
var i__18128 = (0);
while(true){
if((i__18128 < count__18127)){
var map__18133 = chunk__18126.cljs$core$IIndexed$_nth$arity$2(null,i__18128);
var map__18133__$1 = cljs.core.__destructure_map(map__18133);
var src = map__18133__$1;
var resource_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18133__$1,new cljs.core.Keyword(null,"resource-id","resource-id",-1308422582));
var output_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18133__$1,new cljs.core.Keyword(null,"output-name","output-name",-1769107767));
var resource_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18133__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
var js = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18133__$1,new cljs.core.Keyword(null,"js","js",1768080579));
$CLJS.SHADOW_ENV.setLoaded(output_name);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load JS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([resource_name], 0));

shadow.cljs.devtools.client.env.before_load_src(src);

try{shadow.cljs.devtools.client.browser.script_eval([cljs.core.str.cljs$core$IFn$_invoke$arity$1(js),"\n//# sourceURL=",cljs.core.str.cljs$core$IFn$_invoke$arity$1($CLJS.SHADOW_ENV.scriptBase),cljs.core.str.cljs$core$IFn$_invoke$arity$1(output_name)].join(''));
}catch (e18134){var e_18410 = e18134;
if(shadow.cljs.devtools.client.env.log){
console.error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name)].join(''),e_18410);
} else {
}

throw (new Error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name),": ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(e_18410.message)].join('')));
}

var G__18411 = seq__18125;
var G__18412 = chunk__18126;
var G__18413 = count__18127;
var G__18414 = (i__18128 + (1));
seq__18125 = G__18411;
chunk__18126 = G__18412;
count__18127 = G__18413;
i__18128 = G__18414;
continue;
} else {
var temp__5823__auto__ = cljs.core.seq(seq__18125);
if(temp__5823__auto__){
var seq__18125__$1 = temp__5823__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__18125__$1)){
var c__5548__auto__ = cljs.core.chunk_first(seq__18125__$1);
var G__18415 = cljs.core.chunk_rest(seq__18125__$1);
var G__18416 = c__5548__auto__;
var G__18417 = cljs.core.count(c__5548__auto__);
var G__18418 = (0);
seq__18125 = G__18415;
chunk__18126 = G__18416;
count__18127 = G__18417;
i__18128 = G__18418;
continue;
} else {
var map__18135 = cljs.core.first(seq__18125__$1);
var map__18135__$1 = cljs.core.__destructure_map(map__18135);
var src = map__18135__$1;
var resource_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18135__$1,new cljs.core.Keyword(null,"resource-id","resource-id",-1308422582));
var output_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18135__$1,new cljs.core.Keyword(null,"output-name","output-name",-1769107767));
var resource_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18135__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
var js = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18135__$1,new cljs.core.Keyword(null,"js","js",1768080579));
$CLJS.SHADOW_ENV.setLoaded(output_name);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load JS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([resource_name], 0));

shadow.cljs.devtools.client.env.before_load_src(src);

try{shadow.cljs.devtools.client.browser.script_eval([cljs.core.str.cljs$core$IFn$_invoke$arity$1(js),"\n//# sourceURL=",cljs.core.str.cljs$core$IFn$_invoke$arity$1($CLJS.SHADOW_ENV.scriptBase),cljs.core.str.cljs$core$IFn$_invoke$arity$1(output_name)].join(''));
}catch (e18136){var e_18419 = e18136;
if(shadow.cljs.devtools.client.env.log){
console.error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name)].join(''),e_18419);
} else {
}

throw (new Error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name),": ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(e_18419.message)].join('')));
}

var G__18420 = cljs.core.next(seq__18125__$1);
var G__18421 = null;
var G__18422 = (0);
var G__18423 = (0);
seq__18125 = G__18420;
chunk__18126 = G__18421;
count__18127 = G__18422;
i__18128 = G__18423;
continue;
}
} else {
return null;
}
}
break;
}
});
shadow.cljs.devtools.client.browser.do_js_reload = (function shadow$cljs$devtools$client$browser$do_js_reload(msg,sources,complete_fn,failure_fn){
return shadow.cljs.devtools.client.env.do_js_reload.cljs$core$IFn$_invoke$arity$4(cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(msg,new cljs.core.Keyword(null,"log-missing-fn","log-missing-fn",732676765),(function (fn_sym){
return null;
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"log-call-async","log-call-async",183826192),(function (fn_sym){
return shadow.cljs.devtools.client.browser.devtools_msg(["call async ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym)].join(''));
}),new cljs.core.Keyword(null,"log-call","log-call",412404391),(function (fn_sym){
return shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym)].join(''));
})], 0)),(function (next){
shadow.cljs.devtools.client.browser.do_js_load(sources);

return (next.cljs$core$IFn$_invoke$arity$0 ? next.cljs$core$IFn$_invoke$arity$0() : next.call(null));
}),complete_fn,failure_fn);
});
/**
 * when (require '["some-str" :as x]) is done at the REPL we need to manually call the shadow.js.require for it
 * since the file only adds the shadow$provide. only need to do this for shadow-js.
 */
shadow.cljs.devtools.client.browser.do_js_requires = (function shadow$cljs$devtools$client$browser$do_js_requires(js_requires){
var seq__18137 = cljs.core.seq(js_requires);
var chunk__18138 = null;
var count__18139 = (0);
var i__18140 = (0);
while(true){
if((i__18140 < count__18139)){
var js_ns = chunk__18138.cljs$core$IIndexed$_nth$arity$2(null,i__18140);
var require_str_18424 = ["var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns)," = shadow.js.require(\"",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns),"\");"].join('');
shadow.cljs.devtools.client.browser.script_eval(require_str_18424);


var G__18425 = seq__18137;
var G__18426 = chunk__18138;
var G__18427 = count__18139;
var G__18428 = (i__18140 + (1));
seq__18137 = G__18425;
chunk__18138 = G__18426;
count__18139 = G__18427;
i__18140 = G__18428;
continue;
} else {
var temp__5823__auto__ = cljs.core.seq(seq__18137);
if(temp__5823__auto__){
var seq__18137__$1 = temp__5823__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__18137__$1)){
var c__5548__auto__ = cljs.core.chunk_first(seq__18137__$1);
var G__18429 = cljs.core.chunk_rest(seq__18137__$1);
var G__18430 = c__5548__auto__;
var G__18431 = cljs.core.count(c__5548__auto__);
var G__18432 = (0);
seq__18137 = G__18429;
chunk__18138 = G__18430;
count__18139 = G__18431;
i__18140 = G__18432;
continue;
} else {
var js_ns = cljs.core.first(seq__18137__$1);
var require_str_18433 = ["var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns)," = shadow.js.require(\"",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns),"\");"].join('');
shadow.cljs.devtools.client.browser.script_eval(require_str_18433);


var G__18434 = cljs.core.next(seq__18137__$1);
var G__18435 = null;
var G__18436 = (0);
var G__18437 = (0);
seq__18137 = G__18434;
chunk__18138 = G__18435;
count__18139 = G__18436;
i__18140 = G__18437;
continue;
}
} else {
return null;
}
}
break;
}
});
shadow.cljs.devtools.client.browser.handle_build_complete = (function shadow$cljs$devtools$client$browser$handle_build_complete(runtime,p__18142){
var map__18143 = p__18142;
var map__18143__$1 = cljs.core.__destructure_map(map__18143);
var msg = map__18143__$1;
var info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18143__$1,new cljs.core.Keyword(null,"info","info",-317069002));
var reload_info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18143__$1,new cljs.core.Keyword(null,"reload-info","reload-info",1648088086));
var warnings = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.distinct.cljs$core$IFn$_invoke$arity$1((function (){var iter__5503__auto__ = (function shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__18144(s__18145){
return (new cljs.core.LazySeq(null,(function (){
var s__18145__$1 = s__18145;
while(true){
var temp__5823__auto__ = cljs.core.seq(s__18145__$1);
if(temp__5823__auto__){
var xs__6383__auto__ = temp__5823__auto__;
var map__18150 = cljs.core.first(xs__6383__auto__);
var map__18150__$1 = cljs.core.__destructure_map(map__18150);
var src = map__18150__$1;
var resource_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18150__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
var warnings = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18150__$1,new cljs.core.Keyword(null,"warnings","warnings",-735437651));
if(cljs.core.not(new cljs.core.Keyword(null,"from-jar","from-jar",1050932827).cljs$core$IFn$_invoke$arity$1(src))){
var iterys__5499__auto__ = ((function (s__18145__$1,map__18150,map__18150__$1,src,resource_name,warnings,xs__6383__auto__,temp__5823__auto__,map__18143,map__18143__$1,msg,info,reload_info){
return (function shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__18144_$_iter__18146(s__18147){
return (new cljs.core.LazySeq(null,((function (s__18145__$1,map__18150,map__18150__$1,src,resource_name,warnings,xs__6383__auto__,temp__5823__auto__,map__18143,map__18143__$1,msg,info,reload_info){
return (function (){
var s__18147__$1 = s__18147;
while(true){
var temp__5823__auto____$1 = cljs.core.seq(s__18147__$1);
if(temp__5823__auto____$1){
var s__18147__$2 = temp__5823__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__18147__$2)){
var c__5501__auto__ = cljs.core.chunk_first(s__18147__$2);
var size__5502__auto__ = cljs.core.count(c__5501__auto__);
var b__18149 = cljs.core.chunk_buffer(size__5502__auto__);
if((function (){var i__18148 = (0);
while(true){
if((i__18148 < size__5502__auto__)){
var warning = cljs.core._nth(c__5501__auto__,i__18148);
cljs.core.chunk_append(b__18149,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(warning,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100),resource_name));

var G__18438 = (i__18148 + (1));
i__18148 = G__18438;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__18149),shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__18144_$_iter__18146(cljs.core.chunk_rest(s__18147__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__18149),null);
}
} else {
var warning = cljs.core.first(s__18147__$2);
return cljs.core.cons(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(warning,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100),resource_name),shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__18144_$_iter__18146(cljs.core.rest(s__18147__$2)));
}
} else {
return null;
}
break;
}
});})(s__18145__$1,map__18150,map__18150__$1,src,resource_name,warnings,xs__6383__auto__,temp__5823__auto__,map__18143,map__18143__$1,msg,info,reload_info))
,null,null));
});})(s__18145__$1,map__18150,map__18150__$1,src,resource_name,warnings,xs__6383__auto__,temp__5823__auto__,map__18143,map__18143__$1,msg,info,reload_info))
;
var fs__5500__auto__ = cljs.core.seq(iterys__5499__auto__(warnings));
if(fs__5500__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5500__auto__,shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__18144(cljs.core.rest(s__18145__$1)));
} else {
var G__18439 = cljs.core.rest(s__18145__$1);
s__18145__$1 = G__18439;
continue;
}
} else {
var G__18440 = cljs.core.rest(s__18145__$1);
s__18145__$1 = G__18440;
continue;
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5503__auto__(new cljs.core.Keyword(null,"sources","sources",-321166424).cljs$core$IFn$_invoke$arity$1(info));
})()));
if(shadow.cljs.devtools.client.env.log){
var seq__18151_18441 = cljs.core.seq(warnings);
var chunk__18152_18442 = null;
var count__18153_18443 = (0);
var i__18154_18444 = (0);
while(true){
if((i__18154_18444 < count__18153_18443)){
var map__18157_18445 = chunk__18152_18442.cljs$core$IIndexed$_nth$arity$2(null,i__18154_18444);
var map__18157_18446__$1 = cljs.core.__destructure_map(map__18157_18445);
var w_18447 = map__18157_18446__$1;
var msg_18448__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18157_18446__$1,new cljs.core.Keyword(null,"msg","msg",-1386103444));
var line_18449 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18157_18446__$1,new cljs.core.Keyword(null,"line","line",212345235));
var column_18450 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18157_18446__$1,new cljs.core.Keyword(null,"column","column",2078222095));
var resource_name_18451 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18157_18446__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
console.warn(["BUILD-WARNING in ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name_18451)," at [",cljs.core.str.cljs$core$IFn$_invoke$arity$1(line_18449),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(column_18450),"]\n\t",cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg_18448__$1)].join(''));


var G__18452 = seq__18151_18441;
var G__18453 = chunk__18152_18442;
var G__18454 = count__18153_18443;
var G__18455 = (i__18154_18444 + (1));
seq__18151_18441 = G__18452;
chunk__18152_18442 = G__18453;
count__18153_18443 = G__18454;
i__18154_18444 = G__18455;
continue;
} else {
var temp__5823__auto___18456 = cljs.core.seq(seq__18151_18441);
if(temp__5823__auto___18456){
var seq__18151_18457__$1 = temp__5823__auto___18456;
if(cljs.core.chunked_seq_QMARK_(seq__18151_18457__$1)){
var c__5548__auto___18458 = cljs.core.chunk_first(seq__18151_18457__$1);
var G__18459 = cljs.core.chunk_rest(seq__18151_18457__$1);
var G__18460 = c__5548__auto___18458;
var G__18461 = cljs.core.count(c__5548__auto___18458);
var G__18462 = (0);
seq__18151_18441 = G__18459;
chunk__18152_18442 = G__18460;
count__18153_18443 = G__18461;
i__18154_18444 = G__18462;
continue;
} else {
var map__18158_18463 = cljs.core.first(seq__18151_18457__$1);
var map__18158_18464__$1 = cljs.core.__destructure_map(map__18158_18463);
var w_18465 = map__18158_18464__$1;
var msg_18466__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18158_18464__$1,new cljs.core.Keyword(null,"msg","msg",-1386103444));
var line_18467 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18158_18464__$1,new cljs.core.Keyword(null,"line","line",212345235));
var column_18468 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18158_18464__$1,new cljs.core.Keyword(null,"column","column",2078222095));
var resource_name_18469 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18158_18464__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
console.warn(["BUILD-WARNING in ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name_18469)," at [",cljs.core.str.cljs$core$IFn$_invoke$arity$1(line_18467),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(column_18468),"]\n\t",cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg_18466__$1)].join(''));


var G__18470 = cljs.core.next(seq__18151_18457__$1);
var G__18471 = null;
var G__18472 = (0);
var G__18473 = (0);
seq__18151_18441 = G__18470;
chunk__18152_18442 = G__18471;
count__18153_18443 = G__18472;
i__18154_18444 = G__18473;
continue;
}
} else {
}
}
break;
}
} else {
}

if((!(shadow.cljs.devtools.client.env.autoload))){
return shadow.cljs.devtools.client.hud.load_end_success();
} else {
if(((cljs.core.empty_QMARK_(warnings)) || (shadow.cljs.devtools.client.env.ignore_warnings))){
var sources_to_get = shadow.cljs.devtools.client.env.filter_reload_sources(info,reload_info);
if(cljs.core.not(cljs.core.seq(sources_to_get))){
return shadow.cljs.devtools.client.hud.load_end_success();
} else {
if(cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"after-load","after-load",-1278503285)], null)))){
} else {
shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("reloading code but no :after-load hooks are configured!",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["https://shadow-cljs.github.io/docs/UsersGuide.html#_lifecycle_hooks"], 0));
}

return shadow.cljs.devtools.client.shared.load_sources(runtime,sources_to_get,(function (p1__18141_SHARP_){
return shadow.cljs.devtools.client.browser.do_js_reload(msg,p1__18141_SHARP_,shadow.cljs.devtools.client.hud.load_end_success,shadow.cljs.devtools.client.hud.load_failure);
}));
}
} else {
return null;
}
}
});
shadow.cljs.devtools.client.browser.page_load_uri = (cljs.core.truth_(goog.global.document)?goog.Uri.parse(document.location.href):null);
shadow.cljs.devtools.client.browser.match_paths = (function shadow$cljs$devtools$client$browser$match_paths(old,new$){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("file",shadow.cljs.devtools.client.browser.page_load_uri.getScheme())){
var rel_new = cljs.core.subs.cljs$core$IFn$_invoke$arity$2(new$,(1));
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(old,rel_new)) || (clojure.string.starts_with_QMARK_(old,[rel_new,"?"].join(''))))){
return rel_new;
} else {
return null;
}
} else {
var node_uri = goog.Uri.parse(old);
var node_uri_resolved = shadow.cljs.devtools.client.browser.page_load_uri.resolve(node_uri);
var node_abs = node_uri_resolved.getPath();
var and__5023__auto__ = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$1(shadow.cljs.devtools.client.browser.page_load_uri.hasSameDomainAs(node_uri))) || (cljs.core.not(node_uri.hasDomain())));
if(and__5023__auto__){
var and__5023__auto____$1 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(node_abs,new$);
if(and__5023__auto____$1){
return cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var G__18160 = node_uri;
G__18160.setQuery(null);

G__18160.setPath(new$);

return G__18160;
})());
} else {
return and__5023__auto____$1;
}
} else {
return and__5023__auto__;
}
}
});
shadow.cljs.devtools.client.browser.handle_asset_update = (function shadow$cljs$devtools$client$browser$handle_asset_update(p__18161){
var map__18162 = p__18161;
var map__18162__$1 = cljs.core.__destructure_map(map__18162);
var msg = map__18162__$1;
var updates = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18162__$1,new cljs.core.Keyword(null,"updates","updates",2013983452));
var reload_info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18162__$1,new cljs.core.Keyword(null,"reload-info","reload-info",1648088086));
var seq__18163 = cljs.core.seq(updates);
var chunk__18165 = null;
var count__18166 = (0);
var i__18167 = (0);
while(true){
if((i__18167 < count__18166)){
var path = chunk__18165.cljs$core$IIndexed$_nth$arity$2(null,i__18167);
if(clojure.string.ends_with_QMARK_(path,"css")){
var seq__18277_18474 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(document.querySelectorAll("link[rel=\"stylesheet\"]")));
var chunk__18281_18475 = null;
var count__18282_18476 = (0);
var i__18283_18477 = (0);
while(true){
if((i__18283_18477 < count__18282_18476)){
var node_18478 = chunk__18281_18475.cljs$core$IIndexed$_nth$arity$2(null,i__18283_18477);
if(cljs.core.not(node_18478.shadow$old)){
var path_match_18479 = shadow.cljs.devtools.client.browser.match_paths(node_18478.getAttribute("href"),path);
if(cljs.core.truth_(path_match_18479)){
var new_link_18480 = (function (){var G__18309 = node_18478.cloneNode(true);
G__18309.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_18479),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__18309;
})();
(node_18478.shadow$old = true);

(new_link_18480.onload = ((function (seq__18277_18474,chunk__18281_18475,count__18282_18476,i__18283_18477,seq__18163,chunk__18165,count__18166,i__18167,new_link_18480,path_match_18479,node_18478,path,map__18162,map__18162__$1,msg,updates,reload_info){
return (function (e){
var seq__18310_18481 = cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"asset-load","asset-load",-1925902322)], null)));
var chunk__18312_18482 = null;
var count__18313_18483 = (0);
var i__18314_18484 = (0);
while(true){
if((i__18314_18484 < count__18313_18483)){
var map__18318_18485 = chunk__18312_18482.cljs$core$IIndexed$_nth$arity$2(null,i__18314_18484);
var map__18318_18486__$1 = cljs.core.__destructure_map(map__18318_18485);
var task_18487 = map__18318_18486__$1;
var fn_str_18488 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18318_18486__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_18489 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18318_18486__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_18490 = goog.getObjectByName(fn_str_18488,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_18489)].join(''));

(fn_obj_18490.cljs$core$IFn$_invoke$arity$2 ? fn_obj_18490.cljs$core$IFn$_invoke$arity$2(path,new_link_18480) : fn_obj_18490.call(null,path,new_link_18480));


var G__18491 = seq__18310_18481;
var G__18492 = chunk__18312_18482;
var G__18493 = count__18313_18483;
var G__18494 = (i__18314_18484 + (1));
seq__18310_18481 = G__18491;
chunk__18312_18482 = G__18492;
count__18313_18483 = G__18493;
i__18314_18484 = G__18494;
continue;
} else {
var temp__5823__auto___18495 = cljs.core.seq(seq__18310_18481);
if(temp__5823__auto___18495){
var seq__18310_18496__$1 = temp__5823__auto___18495;
if(cljs.core.chunked_seq_QMARK_(seq__18310_18496__$1)){
var c__5548__auto___18497 = cljs.core.chunk_first(seq__18310_18496__$1);
var G__18498 = cljs.core.chunk_rest(seq__18310_18496__$1);
var G__18499 = c__5548__auto___18497;
var G__18500 = cljs.core.count(c__5548__auto___18497);
var G__18501 = (0);
seq__18310_18481 = G__18498;
chunk__18312_18482 = G__18499;
count__18313_18483 = G__18500;
i__18314_18484 = G__18501;
continue;
} else {
var map__18319_18502 = cljs.core.first(seq__18310_18496__$1);
var map__18319_18503__$1 = cljs.core.__destructure_map(map__18319_18502);
var task_18504 = map__18319_18503__$1;
var fn_str_18505 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18319_18503__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_18506 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18319_18503__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_18507 = goog.getObjectByName(fn_str_18505,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_18506)].join(''));

(fn_obj_18507.cljs$core$IFn$_invoke$arity$2 ? fn_obj_18507.cljs$core$IFn$_invoke$arity$2(path,new_link_18480) : fn_obj_18507.call(null,path,new_link_18480));


var G__18508 = cljs.core.next(seq__18310_18496__$1);
var G__18509 = null;
var G__18510 = (0);
var G__18511 = (0);
seq__18310_18481 = G__18508;
chunk__18312_18482 = G__18509;
count__18313_18483 = G__18510;
i__18314_18484 = G__18511;
continue;
}
} else {
}
}
break;
}

return goog.dom.removeNode(node_18478);
});})(seq__18277_18474,chunk__18281_18475,count__18282_18476,i__18283_18477,seq__18163,chunk__18165,count__18166,i__18167,new_link_18480,path_match_18479,node_18478,path,map__18162,map__18162__$1,msg,updates,reload_info))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_18479], 0));

goog.dom.insertSiblingAfter(new_link_18480,node_18478);


var G__18512 = seq__18277_18474;
var G__18513 = chunk__18281_18475;
var G__18514 = count__18282_18476;
var G__18515 = (i__18283_18477 + (1));
seq__18277_18474 = G__18512;
chunk__18281_18475 = G__18513;
count__18282_18476 = G__18514;
i__18283_18477 = G__18515;
continue;
} else {
var G__18516 = seq__18277_18474;
var G__18517 = chunk__18281_18475;
var G__18518 = count__18282_18476;
var G__18519 = (i__18283_18477 + (1));
seq__18277_18474 = G__18516;
chunk__18281_18475 = G__18517;
count__18282_18476 = G__18518;
i__18283_18477 = G__18519;
continue;
}
} else {
var G__18520 = seq__18277_18474;
var G__18521 = chunk__18281_18475;
var G__18522 = count__18282_18476;
var G__18523 = (i__18283_18477 + (1));
seq__18277_18474 = G__18520;
chunk__18281_18475 = G__18521;
count__18282_18476 = G__18522;
i__18283_18477 = G__18523;
continue;
}
} else {
var temp__5823__auto___18524 = cljs.core.seq(seq__18277_18474);
if(temp__5823__auto___18524){
var seq__18277_18525__$1 = temp__5823__auto___18524;
if(cljs.core.chunked_seq_QMARK_(seq__18277_18525__$1)){
var c__5548__auto___18526 = cljs.core.chunk_first(seq__18277_18525__$1);
var G__18527 = cljs.core.chunk_rest(seq__18277_18525__$1);
var G__18528 = c__5548__auto___18526;
var G__18529 = cljs.core.count(c__5548__auto___18526);
var G__18530 = (0);
seq__18277_18474 = G__18527;
chunk__18281_18475 = G__18528;
count__18282_18476 = G__18529;
i__18283_18477 = G__18530;
continue;
} else {
var node_18531 = cljs.core.first(seq__18277_18525__$1);
if(cljs.core.not(node_18531.shadow$old)){
var path_match_18532 = shadow.cljs.devtools.client.browser.match_paths(node_18531.getAttribute("href"),path);
if(cljs.core.truth_(path_match_18532)){
var new_link_18533 = (function (){var G__18320 = node_18531.cloneNode(true);
G__18320.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_18532),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__18320;
})();
(node_18531.shadow$old = true);

(new_link_18533.onload = ((function (seq__18277_18474,chunk__18281_18475,count__18282_18476,i__18283_18477,seq__18163,chunk__18165,count__18166,i__18167,new_link_18533,path_match_18532,node_18531,seq__18277_18525__$1,temp__5823__auto___18524,path,map__18162,map__18162__$1,msg,updates,reload_info){
return (function (e){
var seq__18321_18534 = cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"asset-load","asset-load",-1925902322)], null)));
var chunk__18323_18535 = null;
var count__18324_18536 = (0);
var i__18325_18537 = (0);
while(true){
if((i__18325_18537 < count__18324_18536)){
var map__18329_18538 = chunk__18323_18535.cljs$core$IIndexed$_nth$arity$2(null,i__18325_18537);
var map__18329_18539__$1 = cljs.core.__destructure_map(map__18329_18538);
var task_18540 = map__18329_18539__$1;
var fn_str_18541 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18329_18539__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_18542 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18329_18539__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_18543 = goog.getObjectByName(fn_str_18541,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_18542)].join(''));

(fn_obj_18543.cljs$core$IFn$_invoke$arity$2 ? fn_obj_18543.cljs$core$IFn$_invoke$arity$2(path,new_link_18533) : fn_obj_18543.call(null,path,new_link_18533));


var G__18544 = seq__18321_18534;
var G__18545 = chunk__18323_18535;
var G__18546 = count__18324_18536;
var G__18547 = (i__18325_18537 + (1));
seq__18321_18534 = G__18544;
chunk__18323_18535 = G__18545;
count__18324_18536 = G__18546;
i__18325_18537 = G__18547;
continue;
} else {
var temp__5823__auto___18548__$1 = cljs.core.seq(seq__18321_18534);
if(temp__5823__auto___18548__$1){
var seq__18321_18549__$1 = temp__5823__auto___18548__$1;
if(cljs.core.chunked_seq_QMARK_(seq__18321_18549__$1)){
var c__5548__auto___18550 = cljs.core.chunk_first(seq__18321_18549__$1);
var G__18551 = cljs.core.chunk_rest(seq__18321_18549__$1);
var G__18552 = c__5548__auto___18550;
var G__18553 = cljs.core.count(c__5548__auto___18550);
var G__18554 = (0);
seq__18321_18534 = G__18551;
chunk__18323_18535 = G__18552;
count__18324_18536 = G__18553;
i__18325_18537 = G__18554;
continue;
} else {
var map__18330_18555 = cljs.core.first(seq__18321_18549__$1);
var map__18330_18556__$1 = cljs.core.__destructure_map(map__18330_18555);
var task_18557 = map__18330_18556__$1;
var fn_str_18558 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18330_18556__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_18559 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18330_18556__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_18560 = goog.getObjectByName(fn_str_18558,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_18559)].join(''));

(fn_obj_18560.cljs$core$IFn$_invoke$arity$2 ? fn_obj_18560.cljs$core$IFn$_invoke$arity$2(path,new_link_18533) : fn_obj_18560.call(null,path,new_link_18533));


var G__18561 = cljs.core.next(seq__18321_18549__$1);
var G__18562 = null;
var G__18563 = (0);
var G__18564 = (0);
seq__18321_18534 = G__18561;
chunk__18323_18535 = G__18562;
count__18324_18536 = G__18563;
i__18325_18537 = G__18564;
continue;
}
} else {
}
}
break;
}

return goog.dom.removeNode(node_18531);
});})(seq__18277_18474,chunk__18281_18475,count__18282_18476,i__18283_18477,seq__18163,chunk__18165,count__18166,i__18167,new_link_18533,path_match_18532,node_18531,seq__18277_18525__$1,temp__5823__auto___18524,path,map__18162,map__18162__$1,msg,updates,reload_info))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_18532], 0));

goog.dom.insertSiblingAfter(new_link_18533,node_18531);


var G__18565 = cljs.core.next(seq__18277_18525__$1);
var G__18566 = null;
var G__18567 = (0);
var G__18568 = (0);
seq__18277_18474 = G__18565;
chunk__18281_18475 = G__18566;
count__18282_18476 = G__18567;
i__18283_18477 = G__18568;
continue;
} else {
var G__18569 = cljs.core.next(seq__18277_18525__$1);
var G__18570 = null;
var G__18571 = (0);
var G__18572 = (0);
seq__18277_18474 = G__18569;
chunk__18281_18475 = G__18570;
count__18282_18476 = G__18571;
i__18283_18477 = G__18572;
continue;
}
} else {
var G__18573 = cljs.core.next(seq__18277_18525__$1);
var G__18574 = null;
var G__18575 = (0);
var G__18576 = (0);
seq__18277_18474 = G__18573;
chunk__18281_18475 = G__18574;
count__18282_18476 = G__18575;
i__18283_18477 = G__18576;
continue;
}
}
} else {
}
}
break;
}


var G__18577 = seq__18163;
var G__18578 = chunk__18165;
var G__18579 = count__18166;
var G__18580 = (i__18167 + (1));
seq__18163 = G__18577;
chunk__18165 = G__18578;
count__18166 = G__18579;
i__18167 = G__18580;
continue;
} else {
var G__18581 = seq__18163;
var G__18582 = chunk__18165;
var G__18583 = count__18166;
var G__18584 = (i__18167 + (1));
seq__18163 = G__18581;
chunk__18165 = G__18582;
count__18166 = G__18583;
i__18167 = G__18584;
continue;
}
} else {
var temp__5823__auto__ = cljs.core.seq(seq__18163);
if(temp__5823__auto__){
var seq__18163__$1 = temp__5823__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__18163__$1)){
var c__5548__auto__ = cljs.core.chunk_first(seq__18163__$1);
var G__18585 = cljs.core.chunk_rest(seq__18163__$1);
var G__18586 = c__5548__auto__;
var G__18587 = cljs.core.count(c__5548__auto__);
var G__18588 = (0);
seq__18163 = G__18585;
chunk__18165 = G__18586;
count__18166 = G__18587;
i__18167 = G__18588;
continue;
} else {
var path = cljs.core.first(seq__18163__$1);
if(clojure.string.ends_with_QMARK_(path,"css")){
var seq__18331_18589 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(document.querySelectorAll("link[rel=\"stylesheet\"]")));
var chunk__18335_18590 = null;
var count__18336_18591 = (0);
var i__18337_18592 = (0);
while(true){
if((i__18337_18592 < count__18336_18591)){
var node_18593 = chunk__18335_18590.cljs$core$IIndexed$_nth$arity$2(null,i__18337_18592);
if(cljs.core.not(node_18593.shadow$old)){
var path_match_18594 = shadow.cljs.devtools.client.browser.match_paths(node_18593.getAttribute("href"),path);
if(cljs.core.truth_(path_match_18594)){
var new_link_18595 = (function (){var G__18363 = node_18593.cloneNode(true);
G__18363.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_18594),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__18363;
})();
(node_18593.shadow$old = true);

(new_link_18595.onload = ((function (seq__18331_18589,chunk__18335_18590,count__18336_18591,i__18337_18592,seq__18163,chunk__18165,count__18166,i__18167,new_link_18595,path_match_18594,node_18593,path,seq__18163__$1,temp__5823__auto__,map__18162,map__18162__$1,msg,updates,reload_info){
return (function (e){
var seq__18364_18596 = cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"asset-load","asset-load",-1925902322)], null)));
var chunk__18366_18597 = null;
var count__18367_18598 = (0);
var i__18368_18599 = (0);
while(true){
if((i__18368_18599 < count__18367_18598)){
var map__18372_18600 = chunk__18366_18597.cljs$core$IIndexed$_nth$arity$2(null,i__18368_18599);
var map__18372_18601__$1 = cljs.core.__destructure_map(map__18372_18600);
var task_18602 = map__18372_18601__$1;
var fn_str_18603 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18372_18601__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_18604 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18372_18601__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_18605 = goog.getObjectByName(fn_str_18603,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_18604)].join(''));

(fn_obj_18605.cljs$core$IFn$_invoke$arity$2 ? fn_obj_18605.cljs$core$IFn$_invoke$arity$2(path,new_link_18595) : fn_obj_18605.call(null,path,new_link_18595));


var G__18606 = seq__18364_18596;
var G__18607 = chunk__18366_18597;
var G__18608 = count__18367_18598;
var G__18609 = (i__18368_18599 + (1));
seq__18364_18596 = G__18606;
chunk__18366_18597 = G__18607;
count__18367_18598 = G__18608;
i__18368_18599 = G__18609;
continue;
} else {
var temp__5823__auto___18610__$1 = cljs.core.seq(seq__18364_18596);
if(temp__5823__auto___18610__$1){
var seq__18364_18611__$1 = temp__5823__auto___18610__$1;
if(cljs.core.chunked_seq_QMARK_(seq__18364_18611__$1)){
var c__5548__auto___18612 = cljs.core.chunk_first(seq__18364_18611__$1);
var G__18613 = cljs.core.chunk_rest(seq__18364_18611__$1);
var G__18614 = c__5548__auto___18612;
var G__18615 = cljs.core.count(c__5548__auto___18612);
var G__18616 = (0);
seq__18364_18596 = G__18613;
chunk__18366_18597 = G__18614;
count__18367_18598 = G__18615;
i__18368_18599 = G__18616;
continue;
} else {
var map__18373_18617 = cljs.core.first(seq__18364_18611__$1);
var map__18373_18618__$1 = cljs.core.__destructure_map(map__18373_18617);
var task_18619 = map__18373_18618__$1;
var fn_str_18620 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18373_18618__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_18621 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18373_18618__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_18622 = goog.getObjectByName(fn_str_18620,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_18621)].join(''));

(fn_obj_18622.cljs$core$IFn$_invoke$arity$2 ? fn_obj_18622.cljs$core$IFn$_invoke$arity$2(path,new_link_18595) : fn_obj_18622.call(null,path,new_link_18595));


var G__18623 = cljs.core.next(seq__18364_18611__$1);
var G__18624 = null;
var G__18625 = (0);
var G__18626 = (0);
seq__18364_18596 = G__18623;
chunk__18366_18597 = G__18624;
count__18367_18598 = G__18625;
i__18368_18599 = G__18626;
continue;
}
} else {
}
}
break;
}

return goog.dom.removeNode(node_18593);
});})(seq__18331_18589,chunk__18335_18590,count__18336_18591,i__18337_18592,seq__18163,chunk__18165,count__18166,i__18167,new_link_18595,path_match_18594,node_18593,path,seq__18163__$1,temp__5823__auto__,map__18162,map__18162__$1,msg,updates,reload_info))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_18594], 0));

goog.dom.insertSiblingAfter(new_link_18595,node_18593);


var G__18627 = seq__18331_18589;
var G__18628 = chunk__18335_18590;
var G__18629 = count__18336_18591;
var G__18630 = (i__18337_18592 + (1));
seq__18331_18589 = G__18627;
chunk__18335_18590 = G__18628;
count__18336_18591 = G__18629;
i__18337_18592 = G__18630;
continue;
} else {
var G__18631 = seq__18331_18589;
var G__18632 = chunk__18335_18590;
var G__18633 = count__18336_18591;
var G__18634 = (i__18337_18592 + (1));
seq__18331_18589 = G__18631;
chunk__18335_18590 = G__18632;
count__18336_18591 = G__18633;
i__18337_18592 = G__18634;
continue;
}
} else {
var G__18635 = seq__18331_18589;
var G__18636 = chunk__18335_18590;
var G__18637 = count__18336_18591;
var G__18638 = (i__18337_18592 + (1));
seq__18331_18589 = G__18635;
chunk__18335_18590 = G__18636;
count__18336_18591 = G__18637;
i__18337_18592 = G__18638;
continue;
}
} else {
var temp__5823__auto___18639__$1 = cljs.core.seq(seq__18331_18589);
if(temp__5823__auto___18639__$1){
var seq__18331_18640__$1 = temp__5823__auto___18639__$1;
if(cljs.core.chunked_seq_QMARK_(seq__18331_18640__$1)){
var c__5548__auto___18641 = cljs.core.chunk_first(seq__18331_18640__$1);
var G__18642 = cljs.core.chunk_rest(seq__18331_18640__$1);
var G__18643 = c__5548__auto___18641;
var G__18644 = cljs.core.count(c__5548__auto___18641);
var G__18645 = (0);
seq__18331_18589 = G__18642;
chunk__18335_18590 = G__18643;
count__18336_18591 = G__18644;
i__18337_18592 = G__18645;
continue;
} else {
var node_18646 = cljs.core.first(seq__18331_18640__$1);
if(cljs.core.not(node_18646.shadow$old)){
var path_match_18647 = shadow.cljs.devtools.client.browser.match_paths(node_18646.getAttribute("href"),path);
if(cljs.core.truth_(path_match_18647)){
var new_link_18648 = (function (){var G__18374 = node_18646.cloneNode(true);
G__18374.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_18647),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__18374;
})();
(node_18646.shadow$old = true);

(new_link_18648.onload = ((function (seq__18331_18589,chunk__18335_18590,count__18336_18591,i__18337_18592,seq__18163,chunk__18165,count__18166,i__18167,new_link_18648,path_match_18647,node_18646,seq__18331_18640__$1,temp__5823__auto___18639__$1,path,seq__18163__$1,temp__5823__auto__,map__18162,map__18162__$1,msg,updates,reload_info){
return (function (e){
var seq__18375_18649 = cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"asset-load","asset-load",-1925902322)], null)));
var chunk__18377_18650 = null;
var count__18378_18651 = (0);
var i__18379_18652 = (0);
while(true){
if((i__18379_18652 < count__18378_18651)){
var map__18383_18653 = chunk__18377_18650.cljs$core$IIndexed$_nth$arity$2(null,i__18379_18652);
var map__18383_18654__$1 = cljs.core.__destructure_map(map__18383_18653);
var task_18655 = map__18383_18654__$1;
var fn_str_18656 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18383_18654__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_18657 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18383_18654__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_18658 = goog.getObjectByName(fn_str_18656,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_18657)].join(''));

(fn_obj_18658.cljs$core$IFn$_invoke$arity$2 ? fn_obj_18658.cljs$core$IFn$_invoke$arity$2(path,new_link_18648) : fn_obj_18658.call(null,path,new_link_18648));


var G__18659 = seq__18375_18649;
var G__18660 = chunk__18377_18650;
var G__18661 = count__18378_18651;
var G__18662 = (i__18379_18652 + (1));
seq__18375_18649 = G__18659;
chunk__18377_18650 = G__18660;
count__18378_18651 = G__18661;
i__18379_18652 = G__18662;
continue;
} else {
var temp__5823__auto___18663__$2 = cljs.core.seq(seq__18375_18649);
if(temp__5823__auto___18663__$2){
var seq__18375_18664__$1 = temp__5823__auto___18663__$2;
if(cljs.core.chunked_seq_QMARK_(seq__18375_18664__$1)){
var c__5548__auto___18665 = cljs.core.chunk_first(seq__18375_18664__$1);
var G__18666 = cljs.core.chunk_rest(seq__18375_18664__$1);
var G__18667 = c__5548__auto___18665;
var G__18668 = cljs.core.count(c__5548__auto___18665);
var G__18669 = (0);
seq__18375_18649 = G__18666;
chunk__18377_18650 = G__18667;
count__18378_18651 = G__18668;
i__18379_18652 = G__18669;
continue;
} else {
var map__18384_18670 = cljs.core.first(seq__18375_18664__$1);
var map__18384_18671__$1 = cljs.core.__destructure_map(map__18384_18670);
var task_18672 = map__18384_18671__$1;
var fn_str_18673 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18384_18671__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_18674 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18384_18671__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_18675 = goog.getObjectByName(fn_str_18673,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_18674)].join(''));

(fn_obj_18675.cljs$core$IFn$_invoke$arity$2 ? fn_obj_18675.cljs$core$IFn$_invoke$arity$2(path,new_link_18648) : fn_obj_18675.call(null,path,new_link_18648));


var G__18676 = cljs.core.next(seq__18375_18664__$1);
var G__18677 = null;
var G__18678 = (0);
var G__18679 = (0);
seq__18375_18649 = G__18676;
chunk__18377_18650 = G__18677;
count__18378_18651 = G__18678;
i__18379_18652 = G__18679;
continue;
}
} else {
}
}
break;
}

return goog.dom.removeNode(node_18646);
});})(seq__18331_18589,chunk__18335_18590,count__18336_18591,i__18337_18592,seq__18163,chunk__18165,count__18166,i__18167,new_link_18648,path_match_18647,node_18646,seq__18331_18640__$1,temp__5823__auto___18639__$1,path,seq__18163__$1,temp__5823__auto__,map__18162,map__18162__$1,msg,updates,reload_info))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_18647], 0));

goog.dom.insertSiblingAfter(new_link_18648,node_18646);


var G__18680 = cljs.core.next(seq__18331_18640__$1);
var G__18681 = null;
var G__18682 = (0);
var G__18683 = (0);
seq__18331_18589 = G__18680;
chunk__18335_18590 = G__18681;
count__18336_18591 = G__18682;
i__18337_18592 = G__18683;
continue;
} else {
var G__18684 = cljs.core.next(seq__18331_18640__$1);
var G__18685 = null;
var G__18686 = (0);
var G__18687 = (0);
seq__18331_18589 = G__18684;
chunk__18335_18590 = G__18685;
count__18336_18591 = G__18686;
i__18337_18592 = G__18687;
continue;
}
} else {
var G__18688 = cljs.core.next(seq__18331_18640__$1);
var G__18689 = null;
var G__18690 = (0);
var G__18691 = (0);
seq__18331_18589 = G__18688;
chunk__18335_18590 = G__18689;
count__18336_18591 = G__18690;
i__18337_18592 = G__18691;
continue;
}
}
} else {
}
}
break;
}


var G__18692 = cljs.core.next(seq__18163__$1);
var G__18693 = null;
var G__18694 = (0);
var G__18695 = (0);
seq__18163 = G__18692;
chunk__18165 = G__18693;
count__18166 = G__18694;
i__18167 = G__18695;
continue;
} else {
var G__18696 = cljs.core.next(seq__18163__$1);
var G__18697 = null;
var G__18698 = (0);
var G__18699 = (0);
seq__18163 = G__18696;
chunk__18165 = G__18697;
count__18166 = G__18698;
i__18167 = G__18699;
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
shadow.cljs.devtools.client.browser.global_eval = (function shadow$cljs$devtools$client$browser$global_eval(js){
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2("undefined",typeof(module))){
return eval(js);
} else {
return (0,eval)(js);;
}
});
shadow.cljs.devtools.client.browser.runtime_info = (((typeof SHADOW_CONFIG !== 'undefined'))?shadow.json.to_clj.cljs$core$IFn$_invoke$arity$1(SHADOW_CONFIG):null);
shadow.cljs.devtools.client.browser.client_info = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([shadow.cljs.devtools.client.browser.runtime_info,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"host","host",-1558485167),(cljs.core.truth_(goog.global.document)?new cljs.core.Keyword(null,"browser","browser",828191719):new cljs.core.Keyword(null,"browser-worker","browser-worker",1638998282)),new cljs.core.Keyword(null,"user-agent","user-agent",1220426212),[(cljs.core.truth_(goog.userAgent.OPERA)?"Opera":(cljs.core.truth_(goog.userAgent.product.CHROME)?"Chrome":(cljs.core.truth_(goog.userAgent.IE)?"MSIE":(cljs.core.truth_(goog.userAgent.EDGE)?"Edge":(cljs.core.truth_(goog.userAgent.GECKO)?"Firefox":(cljs.core.truth_(goog.userAgent.SAFARI)?"Safari":(cljs.core.truth_(goog.userAgent.WEBKIT)?"Webkit":null)))))))," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(goog.userAgent.VERSION)," [",cljs.core.str.cljs$core$IFn$_invoke$arity$1(goog.userAgent.PLATFORM),"]"].join(''),new cljs.core.Keyword(null,"dom","dom",-1236537922),(!((goog.global.document == null)))], null)], 0));
if((typeof shadow !== 'undefined') && (typeof shadow.cljs !== 'undefined') && (typeof shadow.cljs.devtools !== 'undefined') && (typeof shadow.cljs.devtools.client !== 'undefined') && (typeof shadow.cljs.devtools.client.browser !== 'undefined') && (typeof shadow.cljs.devtools.client.browser.ws_was_welcome_ref !== 'undefined')){
} else {
shadow.cljs.devtools.client.browser.ws_was_welcome_ref = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(false);
}
if(((shadow.cljs.devtools.client.env.enabled) && ((shadow.cljs.devtools.client.env.worker_client_id > (0))))){
(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$remote$runtime$api$IEvalJS$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$remote$runtime$api$IEvalJS$_js_eval$arity$4 = (function (this$,code,success,fail){
var this$__$1 = this;
try{var G__18386 = shadow.cljs.devtools.client.browser.global_eval(code);
return (success.cljs$core$IFn$_invoke$arity$1 ? success.cljs$core$IFn$_invoke$arity$1(G__18386) : success.call(null,G__18386));
}catch (e18385){var e = e18385;
return (fail.cljs$core$IFn$_invoke$arity$1 ? fail.cljs$core$IFn$_invoke$arity$1(e) : fail.call(null,e));
}}));

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$cljs$devtools$client$shared$IHostSpecific$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$cljs$devtools$client$shared$IHostSpecific$do_invoke$arity$5 = (function (this$,ns,p__18387,success,fail){
var map__18388 = p__18387;
var map__18388__$1 = cljs.core.__destructure_map(map__18388);
var js = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18388__$1,new cljs.core.Keyword(null,"js","js",1768080579));
var this$__$1 = this;
try{var G__18390 = shadow.cljs.devtools.client.browser.global_eval(js);
return (success.cljs$core$IFn$_invoke$arity$1 ? success.cljs$core$IFn$_invoke$arity$1(G__18390) : success.call(null,G__18390));
}catch (e18389){var e = e18389;
return (fail.cljs$core$IFn$_invoke$arity$1 ? fail.cljs$core$IFn$_invoke$arity$1(e) : fail.call(null,e));
}}));

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$cljs$devtools$client$shared$IHostSpecific$do_repl_init$arity$4 = (function (runtime,p__18391,done,error){
var map__18392 = p__18391;
var map__18392__$1 = cljs.core.__destructure_map(map__18392);
var repl_sources = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18392__$1,new cljs.core.Keyword(null,"repl-sources","repl-sources",723867535));
var runtime__$1 = this;
return shadow.cljs.devtools.client.shared.load_sources(runtime__$1,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.remove.cljs$core$IFn$_invoke$arity$2(shadow.cljs.devtools.client.env.src_is_loaded_QMARK_,repl_sources)),(function (sources){
shadow.cljs.devtools.client.browser.do_js_load(sources);

return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
}));
}));

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$cljs$devtools$client$shared$IHostSpecific$do_repl_require$arity$4 = (function (runtime,p__18393,done,error){
var map__18394 = p__18393;
var map__18394__$1 = cljs.core.__destructure_map(map__18394);
var msg = map__18394__$1;
var sources = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18394__$1,new cljs.core.Keyword(null,"sources","sources",-321166424));
var reload_namespaces = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18394__$1,new cljs.core.Keyword(null,"reload-namespaces","reload-namespaces",250210134));
var js_requires = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18394__$1,new cljs.core.Keyword(null,"js-requires","js-requires",-1311472051));
var runtime__$1 = this;
var sources_to_load = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.remove.cljs$core$IFn$_invoke$arity$2((function (p__18395){
var map__18396 = p__18395;
var map__18396__$1 = cljs.core.__destructure_map(map__18396);
var src = map__18396__$1;
var provides = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18396__$1,new cljs.core.Keyword(null,"provides","provides",-1634397992));
var and__5023__auto__ = shadow.cljs.devtools.client.env.src_is_loaded_QMARK_(src);
if(cljs.core.truth_(and__5023__auto__)){
return cljs.core.not(cljs.core.some(reload_namespaces,provides));
} else {
return and__5023__auto__;
}
}),sources));
if(cljs.core.not(cljs.core.seq(sources_to_load))){
var G__18397 = cljs.core.PersistentVector.EMPTY;
return (done.cljs$core$IFn$_invoke$arity$1 ? done.cljs$core$IFn$_invoke$arity$1(G__18397) : done.call(null,G__18397));
} else {
return shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$3(runtime__$1,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"cljs-load-sources","cljs-load-sources",-1458295962),new cljs.core.Keyword(null,"to","to",192099007),shadow.cljs.devtools.client.env.worker_client_id,new cljs.core.Keyword(null,"sources","sources",-321166424),cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"resource-id","resource-id",-1308422582)),sources_to_load)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"cljs-sources","cljs-sources",31121610),(function (p__18398){
var map__18399 = p__18398;
var map__18399__$1 = cljs.core.__destructure_map(map__18399);
var msg__$1 = map__18399__$1;
var sources__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18399__$1,new cljs.core.Keyword(null,"sources","sources",-321166424));
try{shadow.cljs.devtools.client.browser.do_js_load(sources__$1);

if(cljs.core.seq(js_requires)){
shadow.cljs.devtools.client.browser.do_js_requires(js_requires);
} else {
}

return (done.cljs$core$IFn$_invoke$arity$1 ? done.cljs$core$IFn$_invoke$arity$1(sources_to_load) : done.call(null,sources_to_load));
}catch (e18400){var ex = e18400;
return (error.cljs$core$IFn$_invoke$arity$1 ? error.cljs$core$IFn$_invoke$arity$1(ex) : error.call(null,ex));
}})], null));
}
}));

shadow.cljs.devtools.client.shared.add_plugin_BANG_(new cljs.core.Keyword("shadow.cljs.devtools.client.browser","client","shadow.cljs.devtools.client.browser/client",-1461019282),cljs.core.PersistentHashSet.EMPTY,(function (p__18401){
var map__18402 = p__18401;
var map__18402__$1 = cljs.core.__destructure_map(map__18402);
var env = map__18402__$1;
var runtime = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18402__$1,new cljs.core.Keyword(null,"runtime","runtime",-1331573996));
var svc = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"runtime","runtime",-1331573996),runtime], null);
shadow.remote.runtime.api.add_extension(runtime,new cljs.core.Keyword("shadow.cljs.devtools.client.browser","client","shadow.cljs.devtools.client.browser/client",-1461019282),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"on-welcome","on-welcome",1895317125),(function (){
cljs.core.reset_BANG_(shadow.cljs.devtools.client.browser.ws_was_welcome_ref,true);

shadow.cljs.devtools.client.hud.connection_error_clear_BANG_();

shadow.cljs.devtools.client.env.patch_goog_BANG_();

return shadow.cljs.devtools.client.browser.devtools_msg(["#",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"client-id","client-id",-464622140).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(new cljs.core.Keyword(null,"state-ref","state-ref",2127874952).cljs$core$IFn$_invoke$arity$1(runtime))))," ready!"].join(''));
}),new cljs.core.Keyword(null,"on-disconnect","on-disconnect",-809021814),(function (e){
if(cljs.core.truth_(cljs.core.deref(shadow.cljs.devtools.client.browser.ws_was_welcome_ref))){
shadow.cljs.devtools.client.hud.connection_error("The Websocket connection was closed!");

return cljs.core.reset_BANG_(shadow.cljs.devtools.client.browser.ws_was_welcome_ref,false);
} else {
return null;
}
}),new cljs.core.Keyword(null,"on-reconnect","on-reconnect",1239988702),(function (e){
return shadow.cljs.devtools.client.hud.connection_error("Reconnecting ...");
}),new cljs.core.Keyword(null,"ops","ops",1237330063),new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"access-denied","access-denied",959449406),(function (msg){
cljs.core.reset_BANG_(shadow.cljs.devtools.client.browser.ws_was_welcome_ref,false);

return shadow.cljs.devtools.client.hud.connection_error(["Stale Output! Your loaded JS was not produced by the running shadow-cljs instance."," Is the watch for this build running?"].join(''));
}),new cljs.core.Keyword(null,"cljs-asset-update","cljs-asset-update",1224093028),(function (msg){
return shadow.cljs.devtools.client.browser.handle_asset_update(msg);
}),new cljs.core.Keyword(null,"cljs-build-configure","cljs-build-configure",-2089891268),(function (msg){
return null;
}),new cljs.core.Keyword(null,"cljs-build-start","cljs-build-start",-725781241),(function (msg){
shadow.cljs.devtools.client.hud.hud_hide();

shadow.cljs.devtools.client.hud.load_start();

return shadow.cljs.devtools.client.env.run_custom_notify_BANG_(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(msg,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"build-start","build-start",-959649480)));
}),new cljs.core.Keyword(null,"cljs-build-complete","cljs-build-complete",273626153),(function (msg){
var msg__$1 = shadow.cljs.devtools.client.env.add_warnings_to_info(msg);
shadow.cljs.devtools.client.hud.connection_error_clear_BANG_();

shadow.cljs.devtools.client.hud.hud_warnings(msg__$1);

shadow.cljs.devtools.client.browser.handle_build_complete(runtime,msg__$1);

return shadow.cljs.devtools.client.env.run_custom_notify_BANG_(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(msg__$1,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"build-complete","build-complete",-501868472)));
}),new cljs.core.Keyword(null,"cljs-build-failure","cljs-build-failure",1718154990),(function (msg){
shadow.cljs.devtools.client.hud.load_end();

shadow.cljs.devtools.client.hud.hud_error(msg);

return shadow.cljs.devtools.client.env.run_custom_notify_BANG_(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(msg,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"build-failure","build-failure",-2107487466)));
}),new cljs.core.Keyword("shadow.cljs.devtools.client.env","worker-notify","shadow.cljs.devtools.client.env/worker-notify",-1456820670),(function (p__18403){
var map__18404 = p__18403;
var map__18404__$1 = cljs.core.__destructure_map(map__18404);
var event_op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18404__$1,new cljs.core.Keyword(null,"event-op","event-op",200358057));
var client_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18404__$1,new cljs.core.Keyword(null,"client-id","client-id",-464622140));
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"client-disconnect","client-disconnect",640227957),event_op)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(client_id,shadow.cljs.devtools.client.env.worker_client_id)))){
shadow.cljs.devtools.client.hud.connection_error_clear_BANG_();

return shadow.cljs.devtools.client.hud.connection_error("The watch for this build was stopped!");
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"client-connect","client-connect",-1113973888),event_op)){
shadow.cljs.devtools.client.hud.connection_error_clear_BANG_();

return shadow.cljs.devtools.client.hud.connection_error("The watch for this build was restarted. Reload required!");
} else {
return null;
}
}
})], null)], null));

return svc;
}),(function (p__18405){
var map__18406 = p__18405;
var map__18406__$1 = cljs.core.__destructure_map(map__18406);
var svc = map__18406__$1;
var runtime = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18406__$1,new cljs.core.Keyword(null,"runtime","runtime",-1331573996));
return shadow.remote.runtime.api.del_extension(runtime,new cljs.core.Keyword("shadow.cljs.devtools.client.browser","client","shadow.cljs.devtools.client.browser/client",-1461019282));
}));

shadow.cljs.devtools.client.shared.init_runtime_BANG_(shadow.cljs.devtools.client.browser.client_info,shadow.cljs.devtools.client.websocket.start,shadow.cljs.devtools.client.websocket.send,shadow.cljs.devtools.client.websocket.stop);
} else {
}

//# sourceMappingURL=shadow.cljs.devtools.client.browser.js.map
