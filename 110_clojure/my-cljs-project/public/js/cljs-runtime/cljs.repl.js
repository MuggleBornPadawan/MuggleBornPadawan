goog.provide('cljs.repl');
cljs.repl.print_doc = (function cljs$repl$print_doc(p__16144){
var map__16145 = p__16144;
var map__16145__$1 = cljs.core.__destructure_map(map__16145);
var m = map__16145__$1;
var n = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16145__$1,new cljs.core.Keyword(null,"ns","ns",441598760));
var nm = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16145__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["-------------------------"], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(function (){var or__5025__auto__ = new cljs.core.Keyword(null,"spec","spec",347520401).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__5025__auto__)){
return or__5025__auto__;
} else {
return [(function (){var temp__5823__auto__ = new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(temp__5823__auto__)){
var ns = temp__5823__auto__;
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns),"/"].join('');
} else {
return null;
}
})(),cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m))].join('');
}
})()], 0));

if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Protocol"], 0));
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m))){
var seq__16152_16310 = cljs.core.seq(new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m));
var chunk__16153_16311 = null;
var count__16154_16312 = (0);
var i__16155_16313 = (0);
while(true){
if((i__16155_16313 < count__16154_16312)){
var f_16315 = chunk__16153_16311.cljs$core$IIndexed$_nth$arity$2(null,i__16155_16313);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["  ",f_16315], 0));


var G__16316 = seq__16152_16310;
var G__16317 = chunk__16153_16311;
var G__16318 = count__16154_16312;
var G__16319 = (i__16155_16313 + (1));
seq__16152_16310 = G__16316;
chunk__16153_16311 = G__16317;
count__16154_16312 = G__16318;
i__16155_16313 = G__16319;
continue;
} else {
var temp__5823__auto___16320 = cljs.core.seq(seq__16152_16310);
if(temp__5823__auto___16320){
var seq__16152_16321__$1 = temp__5823__auto___16320;
if(cljs.core.chunked_seq_QMARK_(seq__16152_16321__$1)){
var c__5548__auto___16322 = cljs.core.chunk_first(seq__16152_16321__$1);
var G__16323 = cljs.core.chunk_rest(seq__16152_16321__$1);
var G__16324 = c__5548__auto___16322;
var G__16325 = cljs.core.count(c__5548__auto___16322);
var G__16326 = (0);
seq__16152_16310 = G__16323;
chunk__16153_16311 = G__16324;
count__16154_16312 = G__16325;
i__16155_16313 = G__16326;
continue;
} else {
var f_16327 = cljs.core.first(seq__16152_16321__$1);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["  ",f_16327], 0));


var G__16328 = cljs.core.next(seq__16152_16321__$1);
var G__16329 = null;
var G__16330 = (0);
var G__16331 = (0);
seq__16152_16310 = G__16328;
chunk__16153_16311 = G__16329;
count__16154_16312 = G__16330;
i__16155_16313 = G__16331;
continue;
}
} else {
}
}
break;
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m))){
var arglists_16332 = new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_((function (){var or__5025__auto__ = new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__5025__auto__)){
return or__5025__auto__;
} else {
return new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m);
}
})())){
cljs.core.prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([arglists_16332], 0));
} else {
cljs.core.prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.first(arglists_16332)))?cljs.core.second(arglists_16332):arglists_16332)], 0));
}
} else {
}
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"special-form","special-form",-1326536374).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Special Form"], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m)], 0));

if(cljs.core.contains_QMARK_(m,new cljs.core.Keyword(null,"url","url",276297046))){
if(cljs.core.truth_(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(m))){
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([["\n  Please see http://clojure.org/",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(m))].join('')], 0));
} else {
return null;
}
} else {
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([["\n  Please see http://clojure.org/special_forms#",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m))].join('')], 0));
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Macro"], 0));
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"spec","spec",347520401).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Spec"], 0));
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["REPL Special Function"], 0));
} else {
}

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m)], 0));

if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(m))){
var seq__16166_16337 = cljs.core.seq(new cljs.core.Keyword(null,"methods","methods",453930866).cljs$core$IFn$_invoke$arity$1(m));
var chunk__16167_16338 = null;
var count__16168_16339 = (0);
var i__16169_16340 = (0);
while(true){
if((i__16169_16340 < count__16168_16339)){
var vec__16184_16345 = chunk__16167_16338.cljs$core$IIndexed$_nth$arity$2(null,i__16169_16340);
var name_16346 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16184_16345,(0),null);
var map__16187_16347 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16184_16345,(1),null);
var map__16187_16348__$1 = cljs.core.__destructure_map(map__16187_16347);
var doc_16349 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16187_16348__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists_16350 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16187_16348__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println();

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",name_16346], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",arglists_16350], 0));

if(cljs.core.truth_(doc_16349)){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",doc_16349], 0));
} else {
}


var G__16370 = seq__16166_16337;
var G__16371 = chunk__16167_16338;
var G__16372 = count__16168_16339;
var G__16373 = (i__16169_16340 + (1));
seq__16166_16337 = G__16370;
chunk__16167_16338 = G__16371;
count__16168_16339 = G__16372;
i__16169_16340 = G__16373;
continue;
} else {
var temp__5823__auto___16374 = cljs.core.seq(seq__16166_16337);
if(temp__5823__auto___16374){
var seq__16166_16375__$1 = temp__5823__auto___16374;
if(cljs.core.chunked_seq_QMARK_(seq__16166_16375__$1)){
var c__5548__auto___16376 = cljs.core.chunk_first(seq__16166_16375__$1);
var G__16377 = cljs.core.chunk_rest(seq__16166_16375__$1);
var G__16378 = c__5548__auto___16376;
var G__16379 = cljs.core.count(c__5548__auto___16376);
var G__16380 = (0);
seq__16166_16337 = G__16377;
chunk__16167_16338 = G__16378;
count__16168_16339 = G__16379;
i__16169_16340 = G__16380;
continue;
} else {
var vec__16191_16381 = cljs.core.first(seq__16166_16375__$1);
var name_16382 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16191_16381,(0),null);
var map__16194_16383 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16191_16381,(1),null);
var map__16194_16384__$1 = cljs.core.__destructure_map(map__16194_16383);
var doc_16385 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16194_16384__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists_16386 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16194_16384__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println();

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",name_16382], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",arglists_16386], 0));

if(cljs.core.truth_(doc_16385)){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",doc_16385], 0));
} else {
}


var G__16391 = cljs.core.next(seq__16166_16375__$1);
var G__16392 = null;
var G__16393 = (0);
var G__16394 = (0);
seq__16166_16337 = G__16391;
chunk__16167_16338 = G__16392;
count__16168_16339 = G__16393;
i__16169_16340 = G__16394;
continue;
}
} else {
}
}
break;
}
} else {
}

if(cljs.core.truth_(n)){
var temp__5823__auto__ = cljs.spec.alpha.get_spec(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2(cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.ns_name(n)),cljs.core.name(nm)));
if(cljs.core.truth_(temp__5823__auto__)){
var fnspec = temp__5823__auto__;
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Spec"], 0));

var seq__16201 = cljs.core.seq(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"args","args",1315556576),new cljs.core.Keyword(null,"ret","ret",-468222814),new cljs.core.Keyword(null,"fn","fn",-1175266204)], null));
var chunk__16202 = null;
var count__16203 = (0);
var i__16204 = (0);
while(true){
if((i__16204 < count__16203)){
var role = chunk__16202.cljs$core$IIndexed$_nth$arity$2(null,i__16204);
var temp__5823__auto___16399__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(fnspec,role);
if(cljs.core.truth_(temp__5823__auto___16399__$1)){
var spec_16400 = temp__5823__auto___16399__$1;
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([["\n ",cljs.core.name(role),":"].join(''),cljs.spec.alpha.describe(spec_16400)], 0));
} else {
}


var G__16401 = seq__16201;
var G__16402 = chunk__16202;
var G__16403 = count__16203;
var G__16404 = (i__16204 + (1));
seq__16201 = G__16401;
chunk__16202 = G__16402;
count__16203 = G__16403;
i__16204 = G__16404;
continue;
} else {
var temp__5823__auto____$1 = cljs.core.seq(seq__16201);
if(temp__5823__auto____$1){
var seq__16201__$1 = temp__5823__auto____$1;
if(cljs.core.chunked_seq_QMARK_(seq__16201__$1)){
var c__5548__auto__ = cljs.core.chunk_first(seq__16201__$1);
var G__16408 = cljs.core.chunk_rest(seq__16201__$1);
var G__16409 = c__5548__auto__;
var G__16410 = cljs.core.count(c__5548__auto__);
var G__16411 = (0);
seq__16201 = G__16408;
chunk__16202 = G__16409;
count__16203 = G__16410;
i__16204 = G__16411;
continue;
} else {
var role = cljs.core.first(seq__16201__$1);
var temp__5823__auto___16412__$2 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(fnspec,role);
if(cljs.core.truth_(temp__5823__auto___16412__$2)){
var spec_16413 = temp__5823__auto___16412__$2;
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([["\n ",cljs.core.name(role),":"].join(''),cljs.spec.alpha.describe(spec_16413)], 0));
} else {
}


var G__16414 = cljs.core.next(seq__16201__$1);
var G__16415 = null;
var G__16416 = (0);
var G__16417 = (0);
seq__16201 = G__16414;
chunk__16202 = G__16415;
count__16203 = G__16416;
i__16204 = G__16417;
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
} else {
return null;
}
}
});
/**
 * Constructs a data representation for a Error with keys:
 *  :cause - root cause message
 *  :phase - error phase
 *  :via - cause chain, with cause keys:
 *           :type - exception class symbol
 *           :message - exception message
 *           :data - ex-data
 *           :at - top stack element
 *  :trace - root cause stack elements
 */
cljs.repl.Error__GT_map = (function cljs$repl$Error__GT_map(o){
return cljs.core.Throwable__GT_map(o);
});
/**
 * Returns an analysis of the phase, error, cause, and location of an error that occurred
 *   based on Throwable data, as returned by Throwable->map. All attributes other than phase
 *   are optional:
 *  :clojure.error/phase - keyword phase indicator, one of:
 *    :read-source :compile-syntax-check :compilation :macro-syntax-check :macroexpansion
 *    :execution :read-eval-result :print-eval-result
 *  :clojure.error/source - file name (no path)
 *  :clojure.error/line - integer line number
 *  :clojure.error/column - integer column number
 *  :clojure.error/symbol - symbol being expanded/compiled/invoked
 *  :clojure.error/class - cause exception class symbol
 *  :clojure.error/cause - cause exception message
 *  :clojure.error/spec - explain-data for spec error
 */
cljs.repl.ex_triage = (function cljs$repl$ex_triage(datafied_throwable){
var map__16213 = datafied_throwable;
var map__16213__$1 = cljs.core.__destructure_map(map__16213);
var via = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16213__$1,new cljs.core.Keyword(null,"via","via",-1904457336));
var trace = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16213__$1,new cljs.core.Keyword(null,"trace","trace",-1082747415));
var phase = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__16213__$1,new cljs.core.Keyword(null,"phase","phase",575722892),new cljs.core.Keyword(null,"execution","execution",253283524));
var map__16214 = cljs.core.last(via);
var map__16214__$1 = cljs.core.__destructure_map(map__16214);
var type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16214__$1,new cljs.core.Keyword(null,"type","type",1174270348));
var message = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16214__$1,new cljs.core.Keyword(null,"message","message",-406056002));
var data = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16214__$1,new cljs.core.Keyword(null,"data","data",-232669377));
var map__16215 = data;
var map__16215__$1 = cljs.core.__destructure_map(map__16215);
var problems = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16215__$1,new cljs.core.Keyword("cljs.spec.alpha","problems","cljs.spec.alpha/problems",447400814));
var fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16215__$1,new cljs.core.Keyword("cljs.spec.alpha","fn","cljs.spec.alpha/fn",408600443));
var caller = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16215__$1,new cljs.core.Keyword("cljs.spec.test.alpha","caller","cljs.spec.test.alpha/caller",-398302390));
var map__16216 = new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.first(via));
var map__16216__$1 = cljs.core.__destructure_map(map__16216);
var top_data = map__16216__$1;
var source = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16216__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397));
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3((function (){var G__16222 = phase;
var G__16222__$1 = (((G__16222 instanceof cljs.core.Keyword))?G__16222.fqn:null);
switch (G__16222__$1) {
case "read-source":
var map__16223 = data;
var map__16223__$1 = cljs.core.__destructure_map(map__16223);
var line = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16223__$1,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471));
var column = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16223__$1,new cljs.core.Keyword("clojure.error","column","clojure.error/column",304721553));
var G__16224 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.second(via)),top_data], 0));
var G__16224__$1 = (cljs.core.truth_(source)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__16224,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),source):G__16224);
var G__16224__$2 = (cljs.core.truth_((function (){var fexpr__16225 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null);
return (fexpr__16225.cljs$core$IFn$_invoke$arity$1 ? fexpr__16225.cljs$core$IFn$_invoke$arity$1(source) : fexpr__16225.call(null,source));
})())?cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(G__16224__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397)):G__16224__$1);
if(cljs.core.truth_(message)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__16224__$2,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message);
} else {
return G__16224__$2;
}

break;
case "compile-syntax-check":
case "compilation":
case "macro-syntax-check":
case "macroexpansion":
var G__16226 = top_data;
var G__16226__$1 = (cljs.core.truth_(source)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__16226,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),source):G__16226);
var G__16226__$2 = (cljs.core.truth_((function (){var fexpr__16227 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null);
return (fexpr__16227.cljs$core$IFn$_invoke$arity$1 ? fexpr__16227.cljs$core$IFn$_invoke$arity$1(source) : fexpr__16227.call(null,source));
})())?cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(G__16226__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397)):G__16226__$1);
var G__16226__$3 = (cljs.core.truth_(type)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__16226__$2,new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890),type):G__16226__$2);
var G__16226__$4 = (cljs.core.truth_(message)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__16226__$3,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message):G__16226__$3);
if(cljs.core.truth_(problems)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__16226__$4,new cljs.core.Keyword("clojure.error","spec","clojure.error/spec",2055032595),data);
} else {
return G__16226__$4;
}

break;
case "read-eval-result":
case "print-eval-result":
var vec__16228 = cljs.core.first(trace);
var source__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16228,(0),null);
var method = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16228,(1),null);
var file = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16228,(2),null);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16228,(3),null);
var G__16234 = top_data;
var G__16234__$1 = (cljs.core.truth_(line)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__16234,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471),line):G__16234);
var G__16234__$2 = (cljs.core.truth_(file)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__16234__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),file):G__16234__$1);
var G__16234__$3 = (cljs.core.truth_((function (){var and__5023__auto__ = source__$1;
if(cljs.core.truth_(and__5023__auto__)){
return method;
} else {
return and__5023__auto__;
}
})())?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__16234__$2,new cljs.core.Keyword("clojure.error","symbol","clojure.error/symbol",1544821994),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[source__$1,method],null))):G__16234__$2);
var G__16234__$4 = (cljs.core.truth_(type)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__16234__$3,new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890),type):G__16234__$3);
if(cljs.core.truth_(message)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__16234__$4,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message);
} else {
return G__16234__$4;
}

break;
case "execution":
var vec__16236 = cljs.core.first(trace);
var source__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16236,(0),null);
var method = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16236,(1),null);
var file = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16236,(2),null);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16236,(3),null);
var file__$1 = cljs.core.first(cljs.core.remove.cljs$core$IFn$_invoke$arity$2((function (p1__16212_SHARP_){
var or__5025__auto__ = (p1__16212_SHARP_ == null);
if(or__5025__auto__){
return or__5025__auto__;
} else {
var fexpr__16239 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null);
return (fexpr__16239.cljs$core$IFn$_invoke$arity$1 ? fexpr__16239.cljs$core$IFn$_invoke$arity$1(p1__16212_SHARP_) : fexpr__16239.call(null,p1__16212_SHARP_));
}
}),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(caller),file], null)));
var err_line = (function (){var or__5025__auto__ = new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(caller);
if(cljs.core.truth_(or__5025__auto__)){
return or__5025__auto__;
} else {
return line;
}
})();
var G__16244 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890),type], null);
var G__16244__$1 = (cljs.core.truth_(err_line)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__16244,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471),err_line):G__16244);
var G__16244__$2 = (cljs.core.truth_(message)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__16244__$1,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message):G__16244__$1);
var G__16244__$3 = (cljs.core.truth_((function (){var or__5025__auto__ = fn;
if(cljs.core.truth_(or__5025__auto__)){
return or__5025__auto__;
} else {
var and__5023__auto__ = source__$1;
if(cljs.core.truth_(and__5023__auto__)){
return method;
} else {
return and__5023__auto__;
}
}
})())?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__16244__$2,new cljs.core.Keyword("clojure.error","symbol","clojure.error/symbol",1544821994),(function (){var or__5025__auto__ = fn;
if(cljs.core.truth_(or__5025__auto__)){
return or__5025__auto__;
} else {
return (new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[source__$1,method],null));
}
})()):G__16244__$2);
var G__16244__$4 = (cljs.core.truth_(file__$1)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__16244__$3,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),file__$1):G__16244__$3);
if(cljs.core.truth_(problems)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__16244__$4,new cljs.core.Keyword("clojure.error","spec","clojure.error/spec",2055032595),data);
} else {
return G__16244__$4;
}

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__16222__$1)].join('')));

}
})(),new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358),phase);
});
/**
 * Returns a string from exception data, as produced by ex-triage.
 *   The first line summarizes the exception phase and location.
 *   The subsequent lines describe the cause.
 */
cljs.repl.ex_str = (function cljs$repl$ex_str(p__16253){
var map__16254 = p__16253;
var map__16254__$1 = cljs.core.__destructure_map(map__16254);
var triage_data = map__16254__$1;
var phase = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16254__$1,new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358));
var source = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16254__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397));
var line = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16254__$1,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471));
var column = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16254__$1,new cljs.core.Keyword("clojure.error","column","clojure.error/column",304721553));
var symbol = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16254__$1,new cljs.core.Keyword("clojure.error","symbol","clojure.error/symbol",1544821994));
var class$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16254__$1,new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890));
var cause = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16254__$1,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742));
var spec = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16254__$1,new cljs.core.Keyword("clojure.error","spec","clojure.error/spec",2055032595));
var loc = [cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var or__5025__auto__ = source;
if(cljs.core.truth_(or__5025__auto__)){
return or__5025__auto__;
} else {
return "<cljs repl>";
}
})()),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var or__5025__auto__ = line;
if(cljs.core.truth_(or__5025__auto__)){
return or__5025__auto__;
} else {
return (1);
}
})()),(cljs.core.truth_(column)?[":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(column)].join(''):"")].join('');
var class_name = cljs.core.name((function (){var or__5025__auto__ = class$;
if(cljs.core.truth_(or__5025__auto__)){
return or__5025__auto__;
} else {
return "";
}
})());
var simple_class = class_name;
var cause_type = ((cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["RuntimeException",null,"Exception",null], null), null),simple_class))?"":[" (",simple_class,")"].join(''));
var format = goog.string.format;
var G__16256 = phase;
var G__16256__$1 = (((G__16256 instanceof cljs.core.Keyword))?G__16256.fqn:null);
switch (G__16256__$1) {
case "read-source":
return (format.cljs$core$IFn$_invoke$arity$3 ? format.cljs$core$IFn$_invoke$arity$3("Syntax error reading source at (%s).\n%s\n",loc,cause) : format.call(null,"Syntax error reading source at (%s).\n%s\n",loc,cause));

break;
case "macro-syntax-check":
var G__16257 = "Syntax error macroexpanding %sat (%s).\n%s";
var G__16258 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__16259 = loc;
var G__16260 = (cljs.core.truth_(spec)?(function (){var sb__5670__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR__orig_val__16261_16503 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR__orig_val__16262_16504 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR__temp_val__16263_16505 = true;
var _STAR_print_fn_STAR__temp_val__16264_16506 = (function (x__5671__auto__){
return sb__5670__auto__.append(x__5671__auto__);
});
(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__temp_val__16263_16505);

(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__temp_val__16264_16506);

try{cljs.spec.alpha.explain_out(cljs.core.update.cljs$core$IFn$_invoke$arity$3(spec,new cljs.core.Keyword("cljs.spec.alpha","problems","cljs.spec.alpha/problems",447400814),(function (probs){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__16250_SHARP_){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__16250_SHARP_,new cljs.core.Keyword(null,"in","in",-1531184865));
}),probs);
}))
);
}finally {(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__orig_val__16262_16504);

(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__orig_val__16261_16503);
}
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__5670__auto__);
})():(format.cljs$core$IFn$_invoke$arity$2 ? format.cljs$core$IFn$_invoke$arity$2("%s\n",cause) : format.call(null,"%s\n",cause)));
return (format.cljs$core$IFn$_invoke$arity$4 ? format.cljs$core$IFn$_invoke$arity$4(G__16257,G__16258,G__16259,G__16260) : format.call(null,G__16257,G__16258,G__16259,G__16260));

break;
case "macroexpansion":
var G__16271 = "Unexpected error%s macroexpanding %sat (%s).\n%s\n";
var G__16272 = cause_type;
var G__16273 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__16274 = loc;
var G__16275 = cause;
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5(G__16271,G__16272,G__16273,G__16274,G__16275) : format.call(null,G__16271,G__16272,G__16273,G__16274,G__16275));

break;
case "compile-syntax-check":
var G__16276 = "Syntax error%s compiling %sat (%s).\n%s\n";
var G__16277 = cause_type;
var G__16278 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__16279 = loc;
var G__16280 = cause;
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5(G__16276,G__16277,G__16278,G__16279,G__16280) : format.call(null,G__16276,G__16277,G__16278,G__16279,G__16280));

break;
case "compilation":
var G__16285 = "Unexpected error%s compiling %sat (%s).\n%s\n";
var G__16286 = cause_type;
var G__16287 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__16288 = loc;
var G__16289 = cause;
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5(G__16285,G__16286,G__16287,G__16288,G__16289) : format.call(null,G__16285,G__16286,G__16287,G__16288,G__16289));

break;
case "read-eval-result":
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5("Error reading eval result%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause) : format.call(null,"Error reading eval result%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause));

break;
case "print-eval-result":
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5("Error printing return value%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause) : format.call(null,"Error printing return value%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause));

break;
case "execution":
if(cljs.core.truth_(spec)){
var G__16290 = "Execution error - invalid arguments to %s at (%s).\n%s";
var G__16291 = symbol;
var G__16292 = loc;
var G__16293 = (function (){var sb__5670__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR__orig_val__16295_16523 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR__orig_val__16296_16524 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR__temp_val__16297_16525 = true;
var _STAR_print_fn_STAR__temp_val__16298_16526 = (function (x__5671__auto__){
return sb__5670__auto__.append(x__5671__auto__);
});
(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__temp_val__16297_16525);

(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__temp_val__16298_16526);

try{cljs.spec.alpha.explain_out(cljs.core.update.cljs$core$IFn$_invoke$arity$3(spec,new cljs.core.Keyword("cljs.spec.alpha","problems","cljs.spec.alpha/problems",447400814),(function (probs){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__16251_SHARP_){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__16251_SHARP_,new cljs.core.Keyword(null,"in","in",-1531184865));
}),probs);
}))
);
}finally {(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__orig_val__16296_16524);

(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__orig_val__16295_16523);
}
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__5670__auto__);
})();
return (format.cljs$core$IFn$_invoke$arity$4 ? format.cljs$core$IFn$_invoke$arity$4(G__16290,G__16291,G__16292,G__16293) : format.call(null,G__16290,G__16291,G__16292,G__16293));
} else {
var G__16302 = "Execution error%s at %s(%s).\n%s\n";
var G__16303 = cause_type;
var G__16304 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__16305 = loc;
var G__16306 = cause;
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5(G__16302,G__16303,G__16304,G__16305,G__16306) : format.call(null,G__16302,G__16303,G__16304,G__16305,G__16306));
}

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__16256__$1)].join('')));

}
});
cljs.repl.error__GT_str = (function cljs$repl$error__GT_str(error){
return cljs.repl.ex_str(cljs.repl.ex_triage(cljs.repl.Error__GT_map(error)));
});

//# sourceMappingURL=cljs.repl.js.map
