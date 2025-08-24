goog.provide('shadow.cljs.devtools.client.browser');
shadow.cljs.devtools.client.browser.devtools_msg = (function shadow$cljs$devtools$client$browser$devtools_msg(var_args){
var args__5755__auto__ = [];
var len__5749__auto___21271 = arguments.length;
var i__5750__auto___21272 = (0);
while(true){
if((i__5750__auto___21272 < len__5749__auto___21271)){
args__5755__auto__.push((arguments[i__5750__auto___21272]));

var G__21273 = (i__5750__auto___21272 + (1));
i__5750__auto___21272 = G__21273;
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
(shadow.cljs.devtools.client.browser.devtools_msg.cljs$lang$applyTo = (function (seq20978){
var G__20979 = cljs.core.first(seq20978);
var seq20978__$1 = cljs.core.next(seq20978);
var self__5734__auto__ = this;
return self__5734__auto__.cljs$core$IFn$_invoke$arity$variadic(G__20979,seq20978__$1);
}));

shadow.cljs.devtools.client.browser.script_eval = (function shadow$cljs$devtools$client$browser$script_eval(code){
return goog.globalEval(code);
});
shadow.cljs.devtools.client.browser.do_js_load = (function shadow$cljs$devtools$client$browser$do_js_load(sources){
var seq__20982 = cljs.core.seq(sources);
var chunk__20983 = null;
var count__20984 = (0);
var i__20985 = (0);
while(true){
if((i__20985 < count__20984)){
var map__20993 = chunk__20983.cljs$core$IIndexed$_nth$arity$2(null,i__20985);
var map__20993__$1 = cljs.core.__destructure_map(map__20993);
var src = map__20993__$1;
var resource_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20993__$1,new cljs.core.Keyword(null,"resource-id","resource-id",-1308422582));
var output_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20993__$1,new cljs.core.Keyword(null,"output-name","output-name",-1769107767));
var resource_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20993__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
var js = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20993__$1,new cljs.core.Keyword(null,"js","js",1768080579));
$CLJS.SHADOW_ENV.setLoaded(output_name);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load JS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([resource_name], 0));

shadow.cljs.devtools.client.env.before_load_src(src);

try{shadow.cljs.devtools.client.browser.script_eval([cljs.core.str.cljs$core$IFn$_invoke$arity$1(js),"\n//# sourceURL=",cljs.core.str.cljs$core$IFn$_invoke$arity$1($CLJS.SHADOW_ENV.scriptBase),cljs.core.str.cljs$core$IFn$_invoke$arity$1(output_name)].join(''));
}catch (e20995){var e_21274 = e20995;
if(shadow.cljs.devtools.client.env.log){
console.error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name)].join(''),e_21274);
} else {
}

throw (new Error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name),": ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(e_21274.message)].join('')));
}

var G__21275 = seq__20982;
var G__21276 = chunk__20983;
var G__21277 = count__20984;
var G__21278 = (i__20985 + (1));
seq__20982 = G__21275;
chunk__20983 = G__21276;
count__20984 = G__21277;
i__20985 = G__21278;
continue;
} else {
var temp__5823__auto__ = cljs.core.seq(seq__20982);
if(temp__5823__auto__){
var seq__20982__$1 = temp__5823__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__20982__$1)){
var c__5548__auto__ = cljs.core.chunk_first(seq__20982__$1);
var G__21279 = cljs.core.chunk_rest(seq__20982__$1);
var G__21280 = c__5548__auto__;
var G__21281 = cljs.core.count(c__5548__auto__);
var G__21282 = (0);
seq__20982 = G__21279;
chunk__20983 = G__21280;
count__20984 = G__21281;
i__20985 = G__21282;
continue;
} else {
var map__20997 = cljs.core.first(seq__20982__$1);
var map__20997__$1 = cljs.core.__destructure_map(map__20997);
var src = map__20997__$1;
var resource_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20997__$1,new cljs.core.Keyword(null,"resource-id","resource-id",-1308422582));
var output_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20997__$1,new cljs.core.Keyword(null,"output-name","output-name",-1769107767));
var resource_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20997__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
var js = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20997__$1,new cljs.core.Keyword(null,"js","js",1768080579));
$CLJS.SHADOW_ENV.setLoaded(output_name);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load JS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([resource_name], 0));

shadow.cljs.devtools.client.env.before_load_src(src);

try{shadow.cljs.devtools.client.browser.script_eval([cljs.core.str.cljs$core$IFn$_invoke$arity$1(js),"\n//# sourceURL=",cljs.core.str.cljs$core$IFn$_invoke$arity$1($CLJS.SHADOW_ENV.scriptBase),cljs.core.str.cljs$core$IFn$_invoke$arity$1(output_name)].join(''));
}catch (e20998){var e_21283 = e20998;
if(shadow.cljs.devtools.client.env.log){
console.error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name)].join(''),e_21283);
} else {
}

throw (new Error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name),": ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(e_21283.message)].join('')));
}

var G__21284 = cljs.core.next(seq__20982__$1);
var G__21285 = null;
var G__21286 = (0);
var G__21287 = (0);
seq__20982 = G__21284;
chunk__20983 = G__21285;
count__20984 = G__21286;
i__20985 = G__21287;
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
var seq__20999 = cljs.core.seq(js_requires);
var chunk__21000 = null;
var count__21001 = (0);
var i__21002 = (0);
while(true){
if((i__21002 < count__21001)){
var js_ns = chunk__21000.cljs$core$IIndexed$_nth$arity$2(null,i__21002);
var require_str_21288 = ["var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns)," = shadow.js.require(\"",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns),"\");"].join('');
shadow.cljs.devtools.client.browser.script_eval(require_str_21288);


var G__21289 = seq__20999;
var G__21290 = chunk__21000;
var G__21291 = count__21001;
var G__21292 = (i__21002 + (1));
seq__20999 = G__21289;
chunk__21000 = G__21290;
count__21001 = G__21291;
i__21002 = G__21292;
continue;
} else {
var temp__5823__auto__ = cljs.core.seq(seq__20999);
if(temp__5823__auto__){
var seq__20999__$1 = temp__5823__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__20999__$1)){
var c__5548__auto__ = cljs.core.chunk_first(seq__20999__$1);
var G__21293 = cljs.core.chunk_rest(seq__20999__$1);
var G__21294 = c__5548__auto__;
var G__21295 = cljs.core.count(c__5548__auto__);
var G__21296 = (0);
seq__20999 = G__21293;
chunk__21000 = G__21294;
count__21001 = G__21295;
i__21002 = G__21296;
continue;
} else {
var js_ns = cljs.core.first(seq__20999__$1);
var require_str_21297 = ["var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns)," = shadow.js.require(\"",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns),"\");"].join('');
shadow.cljs.devtools.client.browser.script_eval(require_str_21297);


var G__21298 = cljs.core.next(seq__20999__$1);
var G__21299 = null;
var G__21300 = (0);
var G__21301 = (0);
seq__20999 = G__21298;
chunk__21000 = G__21299;
count__21001 = G__21300;
i__21002 = G__21301;
continue;
}
} else {
return null;
}
}
break;
}
});
shadow.cljs.devtools.client.browser.handle_build_complete = (function shadow$cljs$devtools$client$browser$handle_build_complete(runtime,p__21006){
var map__21007 = p__21006;
var map__21007__$1 = cljs.core.__destructure_map(map__21007);
var msg = map__21007__$1;
var info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21007__$1,new cljs.core.Keyword(null,"info","info",-317069002));
var reload_info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21007__$1,new cljs.core.Keyword(null,"reload-info","reload-info",1648088086));
var warnings = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.distinct.cljs$core$IFn$_invoke$arity$1((function (){var iter__5503__auto__ = (function shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__21008(s__21009){
return (new cljs.core.LazySeq(null,(function (){
var s__21009__$1 = s__21009;
while(true){
var temp__5823__auto__ = cljs.core.seq(s__21009__$1);
if(temp__5823__auto__){
var xs__6383__auto__ = temp__5823__auto__;
var map__21014 = cljs.core.first(xs__6383__auto__);
var map__21014__$1 = cljs.core.__destructure_map(map__21014);
var src = map__21014__$1;
var resource_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21014__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
var warnings = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21014__$1,new cljs.core.Keyword(null,"warnings","warnings",-735437651));
if(cljs.core.not(new cljs.core.Keyword(null,"from-jar","from-jar",1050932827).cljs$core$IFn$_invoke$arity$1(src))){
var iterys__5499__auto__ = ((function (s__21009__$1,map__21014,map__21014__$1,src,resource_name,warnings,xs__6383__auto__,temp__5823__auto__,map__21007,map__21007__$1,msg,info,reload_info){
return (function shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__21008_$_iter__21010(s__21011){
return (new cljs.core.LazySeq(null,((function (s__21009__$1,map__21014,map__21014__$1,src,resource_name,warnings,xs__6383__auto__,temp__5823__auto__,map__21007,map__21007__$1,msg,info,reload_info){
return (function (){
var s__21011__$1 = s__21011;
while(true){
var temp__5823__auto____$1 = cljs.core.seq(s__21011__$1);
if(temp__5823__auto____$1){
var s__21011__$2 = temp__5823__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__21011__$2)){
var c__5501__auto__ = cljs.core.chunk_first(s__21011__$2);
var size__5502__auto__ = cljs.core.count(c__5501__auto__);
var b__21013 = cljs.core.chunk_buffer(size__5502__auto__);
if((function (){var i__21012 = (0);
while(true){
if((i__21012 < size__5502__auto__)){
var warning = cljs.core._nth(c__5501__auto__,i__21012);
cljs.core.chunk_append(b__21013,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(warning,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100),resource_name));

var G__21302 = (i__21012 + (1));
i__21012 = G__21302;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__21013),shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__21008_$_iter__21010(cljs.core.chunk_rest(s__21011__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__21013),null);
}
} else {
var warning = cljs.core.first(s__21011__$2);
return cljs.core.cons(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(warning,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100),resource_name),shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__21008_$_iter__21010(cljs.core.rest(s__21011__$2)));
}
} else {
return null;
}
break;
}
});})(s__21009__$1,map__21014,map__21014__$1,src,resource_name,warnings,xs__6383__auto__,temp__5823__auto__,map__21007,map__21007__$1,msg,info,reload_info))
,null,null));
});})(s__21009__$1,map__21014,map__21014__$1,src,resource_name,warnings,xs__6383__auto__,temp__5823__auto__,map__21007,map__21007__$1,msg,info,reload_info))
;
var fs__5500__auto__ = cljs.core.seq(iterys__5499__auto__(warnings));
if(fs__5500__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5500__auto__,shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__21008(cljs.core.rest(s__21009__$1)));
} else {
var G__21303 = cljs.core.rest(s__21009__$1);
s__21009__$1 = G__21303;
continue;
}
} else {
var G__21304 = cljs.core.rest(s__21009__$1);
s__21009__$1 = G__21304;
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
var seq__21015_21305 = cljs.core.seq(warnings);
var chunk__21016_21306 = null;
var count__21017_21307 = (0);
var i__21018_21308 = (0);
while(true){
if((i__21018_21308 < count__21017_21307)){
var map__21021_21309 = chunk__21016_21306.cljs$core$IIndexed$_nth$arity$2(null,i__21018_21308);
var map__21021_21310__$1 = cljs.core.__destructure_map(map__21021_21309);
var w_21311 = map__21021_21310__$1;
var msg_21312__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21021_21310__$1,new cljs.core.Keyword(null,"msg","msg",-1386103444));
var line_21313 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21021_21310__$1,new cljs.core.Keyword(null,"line","line",212345235));
var column_21314 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21021_21310__$1,new cljs.core.Keyword(null,"column","column",2078222095));
var resource_name_21315 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21021_21310__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
console.warn(["BUILD-WARNING in ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name_21315)," at [",cljs.core.str.cljs$core$IFn$_invoke$arity$1(line_21313),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(column_21314),"]\n\t",cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg_21312__$1)].join(''));


var G__21316 = seq__21015_21305;
var G__21317 = chunk__21016_21306;
var G__21318 = count__21017_21307;
var G__21319 = (i__21018_21308 + (1));
seq__21015_21305 = G__21316;
chunk__21016_21306 = G__21317;
count__21017_21307 = G__21318;
i__21018_21308 = G__21319;
continue;
} else {
var temp__5823__auto___21320 = cljs.core.seq(seq__21015_21305);
if(temp__5823__auto___21320){
var seq__21015_21321__$1 = temp__5823__auto___21320;
if(cljs.core.chunked_seq_QMARK_(seq__21015_21321__$1)){
var c__5548__auto___21322 = cljs.core.chunk_first(seq__21015_21321__$1);
var G__21323 = cljs.core.chunk_rest(seq__21015_21321__$1);
var G__21324 = c__5548__auto___21322;
var G__21325 = cljs.core.count(c__5548__auto___21322);
var G__21326 = (0);
seq__21015_21305 = G__21323;
chunk__21016_21306 = G__21324;
count__21017_21307 = G__21325;
i__21018_21308 = G__21326;
continue;
} else {
var map__21022_21327 = cljs.core.first(seq__21015_21321__$1);
var map__21022_21328__$1 = cljs.core.__destructure_map(map__21022_21327);
var w_21329 = map__21022_21328__$1;
var msg_21330__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21022_21328__$1,new cljs.core.Keyword(null,"msg","msg",-1386103444));
var line_21331 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21022_21328__$1,new cljs.core.Keyword(null,"line","line",212345235));
var column_21332 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21022_21328__$1,new cljs.core.Keyword(null,"column","column",2078222095));
var resource_name_21333 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21022_21328__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
console.warn(["BUILD-WARNING in ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name_21333)," at [",cljs.core.str.cljs$core$IFn$_invoke$arity$1(line_21331),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(column_21332),"]\n\t",cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg_21330__$1)].join(''));


var G__21334 = cljs.core.next(seq__21015_21321__$1);
var G__21335 = null;
var G__21336 = (0);
var G__21337 = (0);
seq__21015_21305 = G__21334;
chunk__21016_21306 = G__21335;
count__21017_21307 = G__21336;
i__21018_21308 = G__21337;
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

return shadow.cljs.devtools.client.shared.load_sources(runtime,sources_to_get,(function (p1__21005_SHARP_){
return shadow.cljs.devtools.client.browser.do_js_reload(msg,p1__21005_SHARP_,shadow.cljs.devtools.client.hud.load_end_success,shadow.cljs.devtools.client.hud.load_failure);
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
return cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var G__21024 = node_uri;
G__21024.setQuery(null);

G__21024.setPath(new$);

return G__21024;
})());
} else {
return and__5023__auto____$1;
}
} else {
return and__5023__auto__;
}
}
});
shadow.cljs.devtools.client.browser.handle_asset_update = (function shadow$cljs$devtools$client$browser$handle_asset_update(p__21025){
var map__21026 = p__21025;
var map__21026__$1 = cljs.core.__destructure_map(map__21026);
var msg = map__21026__$1;
var updates = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21026__$1,new cljs.core.Keyword(null,"updates","updates",2013983452));
var reload_info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21026__$1,new cljs.core.Keyword(null,"reload-info","reload-info",1648088086));
var seq__21027 = cljs.core.seq(updates);
var chunk__21029 = null;
var count__21030 = (0);
var i__21031 = (0);
while(true){
if((i__21031 < count__21030)){
var path = chunk__21029.cljs$core$IIndexed$_nth$arity$2(null,i__21031);
if(clojure.string.ends_with_QMARK_(path,"css")){
var seq__21141_21338 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(document.querySelectorAll("link[rel=\"stylesheet\"]")));
var chunk__21145_21339 = null;
var count__21146_21340 = (0);
var i__21147_21341 = (0);
while(true){
if((i__21147_21341 < count__21146_21340)){
var node_21342 = chunk__21145_21339.cljs$core$IIndexed$_nth$arity$2(null,i__21147_21341);
if(cljs.core.not(node_21342.shadow$old)){
var path_match_21343 = shadow.cljs.devtools.client.browser.match_paths(node_21342.getAttribute("href"),path);
if(cljs.core.truth_(path_match_21343)){
var new_link_21344 = (function (){var G__21173 = node_21342.cloneNode(true);
G__21173.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_21343),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__21173;
})();
(node_21342.shadow$old = true);

(new_link_21344.onload = ((function (seq__21141_21338,chunk__21145_21339,count__21146_21340,i__21147_21341,seq__21027,chunk__21029,count__21030,i__21031,new_link_21344,path_match_21343,node_21342,path,map__21026,map__21026__$1,msg,updates,reload_info){
return (function (e){
var seq__21174_21345 = cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"asset-load","asset-load",-1925902322)], null)));
var chunk__21176_21346 = null;
var count__21177_21347 = (0);
var i__21178_21348 = (0);
while(true){
if((i__21178_21348 < count__21177_21347)){
var map__21182_21349 = chunk__21176_21346.cljs$core$IIndexed$_nth$arity$2(null,i__21178_21348);
var map__21182_21350__$1 = cljs.core.__destructure_map(map__21182_21349);
var task_21351 = map__21182_21350__$1;
var fn_str_21352 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21182_21350__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_21353 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21182_21350__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_21354 = goog.getObjectByName(fn_str_21352,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_21353)].join(''));

(fn_obj_21354.cljs$core$IFn$_invoke$arity$2 ? fn_obj_21354.cljs$core$IFn$_invoke$arity$2(path,new_link_21344) : fn_obj_21354.call(null,path,new_link_21344));


var G__21355 = seq__21174_21345;
var G__21356 = chunk__21176_21346;
var G__21357 = count__21177_21347;
var G__21358 = (i__21178_21348 + (1));
seq__21174_21345 = G__21355;
chunk__21176_21346 = G__21356;
count__21177_21347 = G__21357;
i__21178_21348 = G__21358;
continue;
} else {
var temp__5823__auto___21359 = cljs.core.seq(seq__21174_21345);
if(temp__5823__auto___21359){
var seq__21174_21360__$1 = temp__5823__auto___21359;
if(cljs.core.chunked_seq_QMARK_(seq__21174_21360__$1)){
var c__5548__auto___21361 = cljs.core.chunk_first(seq__21174_21360__$1);
var G__21362 = cljs.core.chunk_rest(seq__21174_21360__$1);
var G__21363 = c__5548__auto___21361;
var G__21364 = cljs.core.count(c__5548__auto___21361);
var G__21365 = (0);
seq__21174_21345 = G__21362;
chunk__21176_21346 = G__21363;
count__21177_21347 = G__21364;
i__21178_21348 = G__21365;
continue;
} else {
var map__21183_21366 = cljs.core.first(seq__21174_21360__$1);
var map__21183_21367__$1 = cljs.core.__destructure_map(map__21183_21366);
var task_21368 = map__21183_21367__$1;
var fn_str_21369 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21183_21367__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_21370 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21183_21367__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_21371 = goog.getObjectByName(fn_str_21369,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_21370)].join(''));

(fn_obj_21371.cljs$core$IFn$_invoke$arity$2 ? fn_obj_21371.cljs$core$IFn$_invoke$arity$2(path,new_link_21344) : fn_obj_21371.call(null,path,new_link_21344));


var G__21372 = cljs.core.next(seq__21174_21360__$1);
var G__21373 = null;
var G__21374 = (0);
var G__21375 = (0);
seq__21174_21345 = G__21372;
chunk__21176_21346 = G__21373;
count__21177_21347 = G__21374;
i__21178_21348 = G__21375;
continue;
}
} else {
}
}
break;
}

return goog.dom.removeNode(node_21342);
});})(seq__21141_21338,chunk__21145_21339,count__21146_21340,i__21147_21341,seq__21027,chunk__21029,count__21030,i__21031,new_link_21344,path_match_21343,node_21342,path,map__21026,map__21026__$1,msg,updates,reload_info))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_21343], 0));

goog.dom.insertSiblingAfter(new_link_21344,node_21342);


var G__21376 = seq__21141_21338;
var G__21377 = chunk__21145_21339;
var G__21378 = count__21146_21340;
var G__21379 = (i__21147_21341 + (1));
seq__21141_21338 = G__21376;
chunk__21145_21339 = G__21377;
count__21146_21340 = G__21378;
i__21147_21341 = G__21379;
continue;
} else {
var G__21380 = seq__21141_21338;
var G__21381 = chunk__21145_21339;
var G__21382 = count__21146_21340;
var G__21383 = (i__21147_21341 + (1));
seq__21141_21338 = G__21380;
chunk__21145_21339 = G__21381;
count__21146_21340 = G__21382;
i__21147_21341 = G__21383;
continue;
}
} else {
var G__21384 = seq__21141_21338;
var G__21385 = chunk__21145_21339;
var G__21386 = count__21146_21340;
var G__21387 = (i__21147_21341 + (1));
seq__21141_21338 = G__21384;
chunk__21145_21339 = G__21385;
count__21146_21340 = G__21386;
i__21147_21341 = G__21387;
continue;
}
} else {
var temp__5823__auto___21388 = cljs.core.seq(seq__21141_21338);
if(temp__5823__auto___21388){
var seq__21141_21389__$1 = temp__5823__auto___21388;
if(cljs.core.chunked_seq_QMARK_(seq__21141_21389__$1)){
var c__5548__auto___21390 = cljs.core.chunk_first(seq__21141_21389__$1);
var G__21391 = cljs.core.chunk_rest(seq__21141_21389__$1);
var G__21392 = c__5548__auto___21390;
var G__21393 = cljs.core.count(c__5548__auto___21390);
var G__21394 = (0);
seq__21141_21338 = G__21391;
chunk__21145_21339 = G__21392;
count__21146_21340 = G__21393;
i__21147_21341 = G__21394;
continue;
} else {
var node_21395 = cljs.core.first(seq__21141_21389__$1);
if(cljs.core.not(node_21395.shadow$old)){
var path_match_21396 = shadow.cljs.devtools.client.browser.match_paths(node_21395.getAttribute("href"),path);
if(cljs.core.truth_(path_match_21396)){
var new_link_21397 = (function (){var G__21184 = node_21395.cloneNode(true);
G__21184.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_21396),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__21184;
})();
(node_21395.shadow$old = true);

(new_link_21397.onload = ((function (seq__21141_21338,chunk__21145_21339,count__21146_21340,i__21147_21341,seq__21027,chunk__21029,count__21030,i__21031,new_link_21397,path_match_21396,node_21395,seq__21141_21389__$1,temp__5823__auto___21388,path,map__21026,map__21026__$1,msg,updates,reload_info){
return (function (e){
var seq__21185_21398 = cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"asset-load","asset-load",-1925902322)], null)));
var chunk__21187_21399 = null;
var count__21188_21400 = (0);
var i__21189_21401 = (0);
while(true){
if((i__21189_21401 < count__21188_21400)){
var map__21193_21402 = chunk__21187_21399.cljs$core$IIndexed$_nth$arity$2(null,i__21189_21401);
var map__21193_21403__$1 = cljs.core.__destructure_map(map__21193_21402);
var task_21404 = map__21193_21403__$1;
var fn_str_21405 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21193_21403__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_21406 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21193_21403__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_21407 = goog.getObjectByName(fn_str_21405,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_21406)].join(''));

(fn_obj_21407.cljs$core$IFn$_invoke$arity$2 ? fn_obj_21407.cljs$core$IFn$_invoke$arity$2(path,new_link_21397) : fn_obj_21407.call(null,path,new_link_21397));


var G__21408 = seq__21185_21398;
var G__21409 = chunk__21187_21399;
var G__21410 = count__21188_21400;
var G__21411 = (i__21189_21401 + (1));
seq__21185_21398 = G__21408;
chunk__21187_21399 = G__21409;
count__21188_21400 = G__21410;
i__21189_21401 = G__21411;
continue;
} else {
var temp__5823__auto___21412__$1 = cljs.core.seq(seq__21185_21398);
if(temp__5823__auto___21412__$1){
var seq__21185_21413__$1 = temp__5823__auto___21412__$1;
if(cljs.core.chunked_seq_QMARK_(seq__21185_21413__$1)){
var c__5548__auto___21414 = cljs.core.chunk_first(seq__21185_21413__$1);
var G__21415 = cljs.core.chunk_rest(seq__21185_21413__$1);
var G__21416 = c__5548__auto___21414;
var G__21417 = cljs.core.count(c__5548__auto___21414);
var G__21418 = (0);
seq__21185_21398 = G__21415;
chunk__21187_21399 = G__21416;
count__21188_21400 = G__21417;
i__21189_21401 = G__21418;
continue;
} else {
var map__21194_21419 = cljs.core.first(seq__21185_21413__$1);
var map__21194_21420__$1 = cljs.core.__destructure_map(map__21194_21419);
var task_21421 = map__21194_21420__$1;
var fn_str_21422 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21194_21420__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_21423 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21194_21420__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_21424 = goog.getObjectByName(fn_str_21422,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_21423)].join(''));

(fn_obj_21424.cljs$core$IFn$_invoke$arity$2 ? fn_obj_21424.cljs$core$IFn$_invoke$arity$2(path,new_link_21397) : fn_obj_21424.call(null,path,new_link_21397));


var G__21425 = cljs.core.next(seq__21185_21413__$1);
var G__21426 = null;
var G__21427 = (0);
var G__21428 = (0);
seq__21185_21398 = G__21425;
chunk__21187_21399 = G__21426;
count__21188_21400 = G__21427;
i__21189_21401 = G__21428;
continue;
}
} else {
}
}
break;
}

return goog.dom.removeNode(node_21395);
});})(seq__21141_21338,chunk__21145_21339,count__21146_21340,i__21147_21341,seq__21027,chunk__21029,count__21030,i__21031,new_link_21397,path_match_21396,node_21395,seq__21141_21389__$1,temp__5823__auto___21388,path,map__21026,map__21026__$1,msg,updates,reload_info))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_21396], 0));

goog.dom.insertSiblingAfter(new_link_21397,node_21395);


var G__21429 = cljs.core.next(seq__21141_21389__$1);
var G__21430 = null;
var G__21431 = (0);
var G__21432 = (0);
seq__21141_21338 = G__21429;
chunk__21145_21339 = G__21430;
count__21146_21340 = G__21431;
i__21147_21341 = G__21432;
continue;
} else {
var G__21433 = cljs.core.next(seq__21141_21389__$1);
var G__21434 = null;
var G__21435 = (0);
var G__21436 = (0);
seq__21141_21338 = G__21433;
chunk__21145_21339 = G__21434;
count__21146_21340 = G__21435;
i__21147_21341 = G__21436;
continue;
}
} else {
var G__21437 = cljs.core.next(seq__21141_21389__$1);
var G__21438 = null;
var G__21439 = (0);
var G__21440 = (0);
seq__21141_21338 = G__21437;
chunk__21145_21339 = G__21438;
count__21146_21340 = G__21439;
i__21147_21341 = G__21440;
continue;
}
}
} else {
}
}
break;
}


var G__21441 = seq__21027;
var G__21442 = chunk__21029;
var G__21443 = count__21030;
var G__21444 = (i__21031 + (1));
seq__21027 = G__21441;
chunk__21029 = G__21442;
count__21030 = G__21443;
i__21031 = G__21444;
continue;
} else {
var G__21445 = seq__21027;
var G__21446 = chunk__21029;
var G__21447 = count__21030;
var G__21448 = (i__21031 + (1));
seq__21027 = G__21445;
chunk__21029 = G__21446;
count__21030 = G__21447;
i__21031 = G__21448;
continue;
}
} else {
var temp__5823__auto__ = cljs.core.seq(seq__21027);
if(temp__5823__auto__){
var seq__21027__$1 = temp__5823__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__21027__$1)){
var c__5548__auto__ = cljs.core.chunk_first(seq__21027__$1);
var G__21449 = cljs.core.chunk_rest(seq__21027__$1);
var G__21450 = c__5548__auto__;
var G__21451 = cljs.core.count(c__5548__auto__);
var G__21452 = (0);
seq__21027 = G__21449;
chunk__21029 = G__21450;
count__21030 = G__21451;
i__21031 = G__21452;
continue;
} else {
var path = cljs.core.first(seq__21027__$1);
if(clojure.string.ends_with_QMARK_(path,"css")){
var seq__21195_21453 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(document.querySelectorAll("link[rel=\"stylesheet\"]")));
var chunk__21199_21454 = null;
var count__21200_21455 = (0);
var i__21201_21456 = (0);
while(true){
if((i__21201_21456 < count__21200_21455)){
var node_21457 = chunk__21199_21454.cljs$core$IIndexed$_nth$arity$2(null,i__21201_21456);
if(cljs.core.not(node_21457.shadow$old)){
var path_match_21458 = shadow.cljs.devtools.client.browser.match_paths(node_21457.getAttribute("href"),path);
if(cljs.core.truth_(path_match_21458)){
var new_link_21459 = (function (){var G__21227 = node_21457.cloneNode(true);
G__21227.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_21458),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__21227;
})();
(node_21457.shadow$old = true);

(new_link_21459.onload = ((function (seq__21195_21453,chunk__21199_21454,count__21200_21455,i__21201_21456,seq__21027,chunk__21029,count__21030,i__21031,new_link_21459,path_match_21458,node_21457,path,seq__21027__$1,temp__5823__auto__,map__21026,map__21026__$1,msg,updates,reload_info){
return (function (e){
var seq__21228_21460 = cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"asset-load","asset-load",-1925902322)], null)));
var chunk__21230_21461 = null;
var count__21231_21462 = (0);
var i__21232_21463 = (0);
while(true){
if((i__21232_21463 < count__21231_21462)){
var map__21236_21464 = chunk__21230_21461.cljs$core$IIndexed$_nth$arity$2(null,i__21232_21463);
var map__21236_21465__$1 = cljs.core.__destructure_map(map__21236_21464);
var task_21466 = map__21236_21465__$1;
var fn_str_21467 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21236_21465__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_21468 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21236_21465__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_21469 = goog.getObjectByName(fn_str_21467,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_21468)].join(''));

(fn_obj_21469.cljs$core$IFn$_invoke$arity$2 ? fn_obj_21469.cljs$core$IFn$_invoke$arity$2(path,new_link_21459) : fn_obj_21469.call(null,path,new_link_21459));


var G__21470 = seq__21228_21460;
var G__21471 = chunk__21230_21461;
var G__21472 = count__21231_21462;
var G__21473 = (i__21232_21463 + (1));
seq__21228_21460 = G__21470;
chunk__21230_21461 = G__21471;
count__21231_21462 = G__21472;
i__21232_21463 = G__21473;
continue;
} else {
var temp__5823__auto___21474__$1 = cljs.core.seq(seq__21228_21460);
if(temp__5823__auto___21474__$1){
var seq__21228_21475__$1 = temp__5823__auto___21474__$1;
if(cljs.core.chunked_seq_QMARK_(seq__21228_21475__$1)){
var c__5548__auto___21476 = cljs.core.chunk_first(seq__21228_21475__$1);
var G__21477 = cljs.core.chunk_rest(seq__21228_21475__$1);
var G__21478 = c__5548__auto___21476;
var G__21479 = cljs.core.count(c__5548__auto___21476);
var G__21480 = (0);
seq__21228_21460 = G__21477;
chunk__21230_21461 = G__21478;
count__21231_21462 = G__21479;
i__21232_21463 = G__21480;
continue;
} else {
var map__21237_21481 = cljs.core.first(seq__21228_21475__$1);
var map__21237_21482__$1 = cljs.core.__destructure_map(map__21237_21481);
var task_21483 = map__21237_21482__$1;
var fn_str_21484 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21237_21482__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_21485 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21237_21482__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_21486 = goog.getObjectByName(fn_str_21484,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_21485)].join(''));

(fn_obj_21486.cljs$core$IFn$_invoke$arity$2 ? fn_obj_21486.cljs$core$IFn$_invoke$arity$2(path,new_link_21459) : fn_obj_21486.call(null,path,new_link_21459));


var G__21487 = cljs.core.next(seq__21228_21475__$1);
var G__21488 = null;
var G__21489 = (0);
var G__21490 = (0);
seq__21228_21460 = G__21487;
chunk__21230_21461 = G__21488;
count__21231_21462 = G__21489;
i__21232_21463 = G__21490;
continue;
}
} else {
}
}
break;
}

return goog.dom.removeNode(node_21457);
});})(seq__21195_21453,chunk__21199_21454,count__21200_21455,i__21201_21456,seq__21027,chunk__21029,count__21030,i__21031,new_link_21459,path_match_21458,node_21457,path,seq__21027__$1,temp__5823__auto__,map__21026,map__21026__$1,msg,updates,reload_info))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_21458], 0));

goog.dom.insertSiblingAfter(new_link_21459,node_21457);


var G__21491 = seq__21195_21453;
var G__21492 = chunk__21199_21454;
var G__21493 = count__21200_21455;
var G__21494 = (i__21201_21456 + (1));
seq__21195_21453 = G__21491;
chunk__21199_21454 = G__21492;
count__21200_21455 = G__21493;
i__21201_21456 = G__21494;
continue;
} else {
var G__21495 = seq__21195_21453;
var G__21496 = chunk__21199_21454;
var G__21497 = count__21200_21455;
var G__21498 = (i__21201_21456 + (1));
seq__21195_21453 = G__21495;
chunk__21199_21454 = G__21496;
count__21200_21455 = G__21497;
i__21201_21456 = G__21498;
continue;
}
} else {
var G__21499 = seq__21195_21453;
var G__21500 = chunk__21199_21454;
var G__21501 = count__21200_21455;
var G__21502 = (i__21201_21456 + (1));
seq__21195_21453 = G__21499;
chunk__21199_21454 = G__21500;
count__21200_21455 = G__21501;
i__21201_21456 = G__21502;
continue;
}
} else {
var temp__5823__auto___21503__$1 = cljs.core.seq(seq__21195_21453);
if(temp__5823__auto___21503__$1){
var seq__21195_21504__$1 = temp__5823__auto___21503__$1;
if(cljs.core.chunked_seq_QMARK_(seq__21195_21504__$1)){
var c__5548__auto___21505 = cljs.core.chunk_first(seq__21195_21504__$1);
var G__21506 = cljs.core.chunk_rest(seq__21195_21504__$1);
var G__21507 = c__5548__auto___21505;
var G__21508 = cljs.core.count(c__5548__auto___21505);
var G__21509 = (0);
seq__21195_21453 = G__21506;
chunk__21199_21454 = G__21507;
count__21200_21455 = G__21508;
i__21201_21456 = G__21509;
continue;
} else {
var node_21510 = cljs.core.first(seq__21195_21504__$1);
if(cljs.core.not(node_21510.shadow$old)){
var path_match_21511 = shadow.cljs.devtools.client.browser.match_paths(node_21510.getAttribute("href"),path);
if(cljs.core.truth_(path_match_21511)){
var new_link_21512 = (function (){var G__21238 = node_21510.cloneNode(true);
G__21238.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_21511),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__21238;
})();
(node_21510.shadow$old = true);

(new_link_21512.onload = ((function (seq__21195_21453,chunk__21199_21454,count__21200_21455,i__21201_21456,seq__21027,chunk__21029,count__21030,i__21031,new_link_21512,path_match_21511,node_21510,seq__21195_21504__$1,temp__5823__auto___21503__$1,path,seq__21027__$1,temp__5823__auto__,map__21026,map__21026__$1,msg,updates,reload_info){
return (function (e){
var seq__21239_21513 = cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"asset-load","asset-load",-1925902322)], null)));
var chunk__21241_21514 = null;
var count__21242_21515 = (0);
var i__21243_21516 = (0);
while(true){
if((i__21243_21516 < count__21242_21515)){
var map__21247_21517 = chunk__21241_21514.cljs$core$IIndexed$_nth$arity$2(null,i__21243_21516);
var map__21247_21518__$1 = cljs.core.__destructure_map(map__21247_21517);
var task_21519 = map__21247_21518__$1;
var fn_str_21520 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21247_21518__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_21521 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21247_21518__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_21522 = goog.getObjectByName(fn_str_21520,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_21521)].join(''));

(fn_obj_21522.cljs$core$IFn$_invoke$arity$2 ? fn_obj_21522.cljs$core$IFn$_invoke$arity$2(path,new_link_21512) : fn_obj_21522.call(null,path,new_link_21512));


var G__21523 = seq__21239_21513;
var G__21524 = chunk__21241_21514;
var G__21525 = count__21242_21515;
var G__21526 = (i__21243_21516 + (1));
seq__21239_21513 = G__21523;
chunk__21241_21514 = G__21524;
count__21242_21515 = G__21525;
i__21243_21516 = G__21526;
continue;
} else {
var temp__5823__auto___21527__$2 = cljs.core.seq(seq__21239_21513);
if(temp__5823__auto___21527__$2){
var seq__21239_21528__$1 = temp__5823__auto___21527__$2;
if(cljs.core.chunked_seq_QMARK_(seq__21239_21528__$1)){
var c__5548__auto___21529 = cljs.core.chunk_first(seq__21239_21528__$1);
var G__21530 = cljs.core.chunk_rest(seq__21239_21528__$1);
var G__21531 = c__5548__auto___21529;
var G__21532 = cljs.core.count(c__5548__auto___21529);
var G__21533 = (0);
seq__21239_21513 = G__21530;
chunk__21241_21514 = G__21531;
count__21242_21515 = G__21532;
i__21243_21516 = G__21533;
continue;
} else {
var map__21248_21534 = cljs.core.first(seq__21239_21528__$1);
var map__21248_21535__$1 = cljs.core.__destructure_map(map__21248_21534);
var task_21536 = map__21248_21535__$1;
var fn_str_21537 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21248_21535__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_21538 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21248_21535__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_21539 = goog.getObjectByName(fn_str_21537,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_21538)].join(''));

(fn_obj_21539.cljs$core$IFn$_invoke$arity$2 ? fn_obj_21539.cljs$core$IFn$_invoke$arity$2(path,new_link_21512) : fn_obj_21539.call(null,path,new_link_21512));


var G__21540 = cljs.core.next(seq__21239_21528__$1);
var G__21541 = null;
var G__21542 = (0);
var G__21543 = (0);
seq__21239_21513 = G__21540;
chunk__21241_21514 = G__21541;
count__21242_21515 = G__21542;
i__21243_21516 = G__21543;
continue;
}
} else {
}
}
break;
}

return goog.dom.removeNode(node_21510);
});})(seq__21195_21453,chunk__21199_21454,count__21200_21455,i__21201_21456,seq__21027,chunk__21029,count__21030,i__21031,new_link_21512,path_match_21511,node_21510,seq__21195_21504__$1,temp__5823__auto___21503__$1,path,seq__21027__$1,temp__5823__auto__,map__21026,map__21026__$1,msg,updates,reload_info))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_21511], 0));

goog.dom.insertSiblingAfter(new_link_21512,node_21510);


var G__21544 = cljs.core.next(seq__21195_21504__$1);
var G__21545 = null;
var G__21546 = (0);
var G__21547 = (0);
seq__21195_21453 = G__21544;
chunk__21199_21454 = G__21545;
count__21200_21455 = G__21546;
i__21201_21456 = G__21547;
continue;
} else {
var G__21548 = cljs.core.next(seq__21195_21504__$1);
var G__21549 = null;
var G__21550 = (0);
var G__21551 = (0);
seq__21195_21453 = G__21548;
chunk__21199_21454 = G__21549;
count__21200_21455 = G__21550;
i__21201_21456 = G__21551;
continue;
}
} else {
var G__21552 = cljs.core.next(seq__21195_21504__$1);
var G__21553 = null;
var G__21554 = (0);
var G__21555 = (0);
seq__21195_21453 = G__21552;
chunk__21199_21454 = G__21553;
count__21200_21455 = G__21554;
i__21201_21456 = G__21555;
continue;
}
}
} else {
}
}
break;
}


var G__21556 = cljs.core.next(seq__21027__$1);
var G__21557 = null;
var G__21558 = (0);
var G__21559 = (0);
seq__21027 = G__21556;
chunk__21029 = G__21557;
count__21030 = G__21558;
i__21031 = G__21559;
continue;
} else {
var G__21560 = cljs.core.next(seq__21027__$1);
var G__21561 = null;
var G__21562 = (0);
var G__21563 = (0);
seq__21027 = G__21560;
chunk__21029 = G__21561;
count__21030 = G__21562;
i__21031 = G__21563;
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
try{var G__21250 = shadow.cljs.devtools.client.browser.global_eval(code);
return (success.cljs$core$IFn$_invoke$arity$1 ? success.cljs$core$IFn$_invoke$arity$1(G__21250) : success.call(null,G__21250));
}catch (e21249){var e = e21249;
return (fail.cljs$core$IFn$_invoke$arity$1 ? fail.cljs$core$IFn$_invoke$arity$1(e) : fail.call(null,e));
}}));

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$cljs$devtools$client$shared$IHostSpecific$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$cljs$devtools$client$shared$IHostSpecific$do_invoke$arity$5 = (function (this$,ns,p__21251,success,fail){
var map__21252 = p__21251;
var map__21252__$1 = cljs.core.__destructure_map(map__21252);
var js = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21252__$1,new cljs.core.Keyword(null,"js","js",1768080579));
var this$__$1 = this;
try{var G__21254 = shadow.cljs.devtools.client.browser.global_eval(js);
return (success.cljs$core$IFn$_invoke$arity$1 ? success.cljs$core$IFn$_invoke$arity$1(G__21254) : success.call(null,G__21254));
}catch (e21253){var e = e21253;
return (fail.cljs$core$IFn$_invoke$arity$1 ? fail.cljs$core$IFn$_invoke$arity$1(e) : fail.call(null,e));
}}));

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$cljs$devtools$client$shared$IHostSpecific$do_repl_init$arity$4 = (function (runtime,p__21255,done,error){
var map__21256 = p__21255;
var map__21256__$1 = cljs.core.__destructure_map(map__21256);
var repl_sources = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21256__$1,new cljs.core.Keyword(null,"repl-sources","repl-sources",723867535));
var runtime__$1 = this;
return shadow.cljs.devtools.client.shared.load_sources(runtime__$1,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.remove.cljs$core$IFn$_invoke$arity$2(shadow.cljs.devtools.client.env.src_is_loaded_QMARK_,repl_sources)),(function (sources){
shadow.cljs.devtools.client.browser.do_js_load(sources);

return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
}));
}));

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$cljs$devtools$client$shared$IHostSpecific$do_repl_require$arity$4 = (function (runtime,p__21257,done,error){
var map__21258 = p__21257;
var map__21258__$1 = cljs.core.__destructure_map(map__21258);
var msg = map__21258__$1;
var sources = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21258__$1,new cljs.core.Keyword(null,"sources","sources",-321166424));
var reload_namespaces = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21258__$1,new cljs.core.Keyword(null,"reload-namespaces","reload-namespaces",250210134));
var js_requires = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21258__$1,new cljs.core.Keyword(null,"js-requires","js-requires",-1311472051));
var runtime__$1 = this;
var sources_to_load = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.remove.cljs$core$IFn$_invoke$arity$2((function (p__21259){
var map__21260 = p__21259;
var map__21260__$1 = cljs.core.__destructure_map(map__21260);
var src = map__21260__$1;
var provides = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21260__$1,new cljs.core.Keyword(null,"provides","provides",-1634397992));
var and__5023__auto__ = shadow.cljs.devtools.client.env.src_is_loaded_QMARK_(src);
if(cljs.core.truth_(and__5023__auto__)){
return cljs.core.not(cljs.core.some(reload_namespaces,provides));
} else {
return and__5023__auto__;
}
}),sources));
if(cljs.core.not(cljs.core.seq(sources_to_load))){
var G__21261 = cljs.core.PersistentVector.EMPTY;
return (done.cljs$core$IFn$_invoke$arity$1 ? done.cljs$core$IFn$_invoke$arity$1(G__21261) : done.call(null,G__21261));
} else {
return shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$3(runtime__$1,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"cljs-load-sources","cljs-load-sources",-1458295962),new cljs.core.Keyword(null,"to","to",192099007),shadow.cljs.devtools.client.env.worker_client_id,new cljs.core.Keyword(null,"sources","sources",-321166424),cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"resource-id","resource-id",-1308422582)),sources_to_load)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"cljs-sources","cljs-sources",31121610),(function (p__21262){
var map__21263 = p__21262;
var map__21263__$1 = cljs.core.__destructure_map(map__21263);
var msg__$1 = map__21263__$1;
var sources__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21263__$1,new cljs.core.Keyword(null,"sources","sources",-321166424));
try{shadow.cljs.devtools.client.browser.do_js_load(sources__$1);

if(cljs.core.seq(js_requires)){
shadow.cljs.devtools.client.browser.do_js_requires(js_requires);
} else {
}

return (done.cljs$core$IFn$_invoke$arity$1 ? done.cljs$core$IFn$_invoke$arity$1(sources_to_load) : done.call(null,sources_to_load));
}catch (e21264){var ex = e21264;
return (error.cljs$core$IFn$_invoke$arity$1 ? error.cljs$core$IFn$_invoke$arity$1(ex) : error.call(null,ex));
}})], null));
}
}));

shadow.cljs.devtools.client.shared.add_plugin_BANG_(new cljs.core.Keyword("shadow.cljs.devtools.client.browser","client","shadow.cljs.devtools.client.browser/client",-1461019282),cljs.core.PersistentHashSet.EMPTY,(function (p__21265){
var map__21266 = p__21265;
var map__21266__$1 = cljs.core.__destructure_map(map__21266);
var env = map__21266__$1;
var runtime = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21266__$1,new cljs.core.Keyword(null,"runtime","runtime",-1331573996));
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
}),new cljs.core.Keyword("shadow.cljs.devtools.client.env","worker-notify","shadow.cljs.devtools.client.env/worker-notify",-1456820670),(function (p__21267){
var map__21268 = p__21267;
var map__21268__$1 = cljs.core.__destructure_map(map__21268);
var event_op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21268__$1,new cljs.core.Keyword(null,"event-op","event-op",200358057));
var client_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21268__$1,new cljs.core.Keyword(null,"client-id","client-id",-464622140));
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
}),(function (p__21269){
var map__21270 = p__21269;
var map__21270__$1 = cljs.core.__destructure_map(map__21270);
var svc = map__21270__$1;
var runtime = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21270__$1,new cljs.core.Keyword(null,"runtime","runtime",-1331573996));
return shadow.remote.runtime.api.del_extension(runtime,new cljs.core.Keyword("shadow.cljs.devtools.client.browser","client","shadow.cljs.devtools.client.browser/client",-1461019282));
}));

shadow.cljs.devtools.client.shared.init_runtime_BANG_(shadow.cljs.devtools.client.browser.client_info,shadow.cljs.devtools.client.websocket.start,shadow.cljs.devtools.client.websocket.send,shadow.cljs.devtools.client.websocket.stop);
} else {
}

//# sourceMappingURL=shadow.cljs.devtools.client.browser.js.map
