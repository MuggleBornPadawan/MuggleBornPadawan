goog.provide('cljs.repl');
cljs.repl.print_doc = (function cljs$repl$print_doc(p__19885){
var map__19886 = p__19885;
var map__19886__$1 = cljs.core.__destructure_map(map__19886);
var m = map__19886__$1;
var n = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19886__$1,new cljs.core.Keyword(null,"ns","ns",441598760));
var nm = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19886__$1,new cljs.core.Keyword(null,"name","name",1843675177));
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
var seq__19930_20387 = cljs.core.seq(new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m));
var chunk__19931_20388 = null;
var count__19932_20389 = (0);
var i__19933_20390 = (0);
while(true){
if((i__19933_20390 < count__19932_20389)){
var f_20392 = chunk__19931_20388.cljs$core$IIndexed$_nth$arity$2(null,i__19933_20390);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["  ",f_20392], 0));


var G__20396 = seq__19930_20387;
var G__20397 = chunk__19931_20388;
var G__20398 = count__19932_20389;
var G__20399 = (i__19933_20390 + (1));
seq__19930_20387 = G__20396;
chunk__19931_20388 = G__20397;
count__19932_20389 = G__20398;
i__19933_20390 = G__20399;
continue;
} else {
var temp__5823__auto___20400 = cljs.core.seq(seq__19930_20387);
if(temp__5823__auto___20400){
var seq__19930_20402__$1 = temp__5823__auto___20400;
if(cljs.core.chunked_seq_QMARK_(seq__19930_20402__$1)){
var c__5548__auto___20403 = cljs.core.chunk_first(seq__19930_20402__$1);
var G__20404 = cljs.core.chunk_rest(seq__19930_20402__$1);
var G__20405 = c__5548__auto___20403;
var G__20406 = cljs.core.count(c__5548__auto___20403);
var G__20407 = (0);
seq__19930_20387 = G__20404;
chunk__19931_20388 = G__20405;
count__19932_20389 = G__20406;
i__19933_20390 = G__20407;
continue;
} else {
var f_20414 = cljs.core.first(seq__19930_20402__$1);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["  ",f_20414], 0));


var G__20415 = cljs.core.next(seq__19930_20402__$1);
var G__20416 = null;
var G__20417 = (0);
var G__20418 = (0);
seq__19930_20387 = G__20415;
chunk__19931_20388 = G__20416;
count__19932_20389 = G__20417;
i__19933_20390 = G__20418;
continue;
}
} else {
}
}
break;
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m))){
var arglists_20419 = new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_((function (){var or__5025__auto__ = new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__5025__auto__)){
return or__5025__auto__;
} else {
return new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m);
}
})())){
cljs.core.prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([arglists_20419], 0));
} else {
cljs.core.prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.first(arglists_20419)))?cljs.core.second(arglists_20419):arglists_20419)], 0));
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
var seq__20029_20423 = cljs.core.seq(new cljs.core.Keyword(null,"methods","methods",453930866).cljs$core$IFn$_invoke$arity$1(m));
var chunk__20030_20424 = null;
var count__20031_20425 = (0);
var i__20032_20426 = (0);
while(true){
if((i__20032_20426 < count__20031_20425)){
var vec__20087_20427 = chunk__20030_20424.cljs$core$IIndexed$_nth$arity$2(null,i__20032_20426);
var name_20428 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20087_20427,(0),null);
var map__20090_20429 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20087_20427,(1),null);
var map__20090_20430__$1 = cljs.core.__destructure_map(map__20090_20429);
var doc_20431 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20090_20430__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists_20432 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20090_20430__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println();

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",name_20428], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",arglists_20432], 0));

if(cljs.core.truth_(doc_20431)){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",doc_20431], 0));
} else {
}


var G__20434 = seq__20029_20423;
var G__20435 = chunk__20030_20424;
var G__20436 = count__20031_20425;
var G__20437 = (i__20032_20426 + (1));
seq__20029_20423 = G__20434;
chunk__20030_20424 = G__20435;
count__20031_20425 = G__20436;
i__20032_20426 = G__20437;
continue;
} else {
var temp__5823__auto___20438 = cljs.core.seq(seq__20029_20423);
if(temp__5823__auto___20438){
var seq__20029_20440__$1 = temp__5823__auto___20438;
if(cljs.core.chunked_seq_QMARK_(seq__20029_20440__$1)){
var c__5548__auto___20441 = cljs.core.chunk_first(seq__20029_20440__$1);
var G__20443 = cljs.core.chunk_rest(seq__20029_20440__$1);
var G__20444 = c__5548__auto___20441;
var G__20445 = cljs.core.count(c__5548__auto___20441);
var G__20446 = (0);
seq__20029_20423 = G__20443;
chunk__20030_20424 = G__20444;
count__20031_20425 = G__20445;
i__20032_20426 = G__20446;
continue;
} else {
var vec__20110_20447 = cljs.core.first(seq__20029_20440__$1);
var name_20448 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20110_20447,(0),null);
var map__20113_20449 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20110_20447,(1),null);
var map__20113_20450__$1 = cljs.core.__destructure_map(map__20113_20449);
var doc_20451 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20113_20450__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists_20452 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20113_20450__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println();

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",name_20448], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",arglists_20452], 0));

if(cljs.core.truth_(doc_20451)){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",doc_20451], 0));
} else {
}


var G__20456 = cljs.core.next(seq__20029_20440__$1);
var G__20457 = null;
var G__20458 = (0);
var G__20459 = (0);
seq__20029_20423 = G__20456;
chunk__20030_20424 = G__20457;
count__20031_20425 = G__20458;
i__20032_20426 = G__20459;
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

var seq__20120 = cljs.core.seq(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"args","args",1315556576),new cljs.core.Keyword(null,"ret","ret",-468222814),new cljs.core.Keyword(null,"fn","fn",-1175266204)], null));
var chunk__20121 = null;
var count__20122 = (0);
var i__20123 = (0);
while(true){
if((i__20123 < count__20122)){
var role = chunk__20121.cljs$core$IIndexed$_nth$arity$2(null,i__20123);
var temp__5823__auto___20461__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(fnspec,role);
if(cljs.core.truth_(temp__5823__auto___20461__$1)){
var spec_20462 = temp__5823__auto___20461__$1;
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([["\n ",cljs.core.name(role),":"].join(''),cljs.spec.alpha.describe(spec_20462)], 0));
} else {
}


var G__20463 = seq__20120;
var G__20464 = chunk__20121;
var G__20465 = count__20122;
var G__20466 = (i__20123 + (1));
seq__20120 = G__20463;
chunk__20121 = G__20464;
count__20122 = G__20465;
i__20123 = G__20466;
continue;
} else {
var temp__5823__auto____$1 = cljs.core.seq(seq__20120);
if(temp__5823__auto____$1){
var seq__20120__$1 = temp__5823__auto____$1;
if(cljs.core.chunked_seq_QMARK_(seq__20120__$1)){
var c__5548__auto__ = cljs.core.chunk_first(seq__20120__$1);
var G__20468 = cljs.core.chunk_rest(seq__20120__$1);
var G__20469 = c__5548__auto__;
var G__20470 = cljs.core.count(c__5548__auto__);
var G__20471 = (0);
seq__20120 = G__20468;
chunk__20121 = G__20469;
count__20122 = G__20470;
i__20123 = G__20471;
continue;
} else {
var role = cljs.core.first(seq__20120__$1);
var temp__5823__auto___20472__$2 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(fnspec,role);
if(cljs.core.truth_(temp__5823__auto___20472__$2)){
var spec_20473 = temp__5823__auto___20472__$2;
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([["\n ",cljs.core.name(role),":"].join(''),cljs.spec.alpha.describe(spec_20473)], 0));
} else {
}


var G__20474 = cljs.core.next(seq__20120__$1);
var G__20475 = null;
var G__20476 = (0);
var G__20477 = (0);
seq__20120 = G__20474;
chunk__20121 = G__20475;
count__20122 = G__20476;
i__20123 = G__20477;
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
var map__20167 = datafied_throwable;
var map__20167__$1 = cljs.core.__destructure_map(map__20167);
var via = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20167__$1,new cljs.core.Keyword(null,"via","via",-1904457336));
var trace = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20167__$1,new cljs.core.Keyword(null,"trace","trace",-1082747415));
var phase = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__20167__$1,new cljs.core.Keyword(null,"phase","phase",575722892),new cljs.core.Keyword(null,"execution","execution",253283524));
var map__20168 = cljs.core.last(via);
var map__20168__$1 = cljs.core.__destructure_map(map__20168);
var type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20168__$1,new cljs.core.Keyword(null,"type","type",1174270348));
var message = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20168__$1,new cljs.core.Keyword(null,"message","message",-406056002));
var data = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20168__$1,new cljs.core.Keyword(null,"data","data",-232669377));
var map__20169 = data;
var map__20169__$1 = cljs.core.__destructure_map(map__20169);
var problems = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20169__$1,new cljs.core.Keyword("cljs.spec.alpha","problems","cljs.spec.alpha/problems",447400814));
var fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20169__$1,new cljs.core.Keyword("cljs.spec.alpha","fn","cljs.spec.alpha/fn",408600443));
var caller = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20169__$1,new cljs.core.Keyword("cljs.spec.test.alpha","caller","cljs.spec.test.alpha/caller",-398302390));
var map__20170 = new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.first(via));
var map__20170__$1 = cljs.core.__destructure_map(map__20170);
var top_data = map__20170__$1;
var source = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20170__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397));
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3((function (){var G__20180 = phase;
var G__20180__$1 = (((G__20180 instanceof cljs.core.Keyword))?G__20180.fqn:null);
switch (G__20180__$1) {
case "read-source":
var map__20193 = data;
var map__20193__$1 = cljs.core.__destructure_map(map__20193);
var line = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20193__$1,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471));
var column = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20193__$1,new cljs.core.Keyword("clojure.error","column","clojure.error/column",304721553));
var G__20194 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.second(via)),top_data], 0));
var G__20194__$1 = (cljs.core.truth_(source)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__20194,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),source):G__20194);
var G__20194__$2 = (cljs.core.truth_((function (){var fexpr__20196 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null);
return (fexpr__20196.cljs$core$IFn$_invoke$arity$1 ? fexpr__20196.cljs$core$IFn$_invoke$arity$1(source) : fexpr__20196.call(null,source));
})())?cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(G__20194__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397)):G__20194__$1);
if(cljs.core.truth_(message)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__20194__$2,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message);
} else {
return G__20194__$2;
}

break;
case "compile-syntax-check":
case "compilation":
case "macro-syntax-check":
case "macroexpansion":
var G__20197 = top_data;
var G__20197__$1 = (cljs.core.truth_(source)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__20197,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),source):G__20197);
var G__20197__$2 = (cljs.core.truth_((function (){var fexpr__20199 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null);
return (fexpr__20199.cljs$core$IFn$_invoke$arity$1 ? fexpr__20199.cljs$core$IFn$_invoke$arity$1(source) : fexpr__20199.call(null,source));
})())?cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(G__20197__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397)):G__20197__$1);
var G__20197__$3 = (cljs.core.truth_(type)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__20197__$2,new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890),type):G__20197__$2);
var G__20197__$4 = (cljs.core.truth_(message)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__20197__$3,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message):G__20197__$3);
if(cljs.core.truth_(problems)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__20197__$4,new cljs.core.Keyword("clojure.error","spec","clojure.error/spec",2055032595),data);
} else {
return G__20197__$4;
}

break;
case "read-eval-result":
case "print-eval-result":
var vec__20201 = cljs.core.first(trace);
var source__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20201,(0),null);
var method = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20201,(1),null);
var file = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20201,(2),null);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20201,(3),null);
var G__20205 = top_data;
var G__20205__$1 = (cljs.core.truth_(line)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__20205,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471),line):G__20205);
var G__20205__$2 = (cljs.core.truth_(file)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__20205__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),file):G__20205__$1);
var G__20205__$3 = (cljs.core.truth_((function (){var and__5023__auto__ = source__$1;
if(cljs.core.truth_(and__5023__auto__)){
return method;
} else {
return and__5023__auto__;
}
})())?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__20205__$2,new cljs.core.Keyword("clojure.error","symbol","clojure.error/symbol",1544821994),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[source__$1,method],null))):G__20205__$2);
var G__20205__$4 = (cljs.core.truth_(type)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__20205__$3,new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890),type):G__20205__$3);
if(cljs.core.truth_(message)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__20205__$4,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message);
} else {
return G__20205__$4;
}

break;
case "execution":
var vec__20221 = cljs.core.first(trace);
var source__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20221,(0),null);
var method = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20221,(1),null);
var file = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20221,(2),null);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20221,(3),null);
var file__$1 = cljs.core.first(cljs.core.remove.cljs$core$IFn$_invoke$arity$2((function (p1__20165_SHARP_){
var or__5025__auto__ = (p1__20165_SHARP_ == null);
if(or__5025__auto__){
return or__5025__auto__;
} else {
var fexpr__20235 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null);
return (fexpr__20235.cljs$core$IFn$_invoke$arity$1 ? fexpr__20235.cljs$core$IFn$_invoke$arity$1(p1__20165_SHARP_) : fexpr__20235.call(null,p1__20165_SHARP_));
}
}),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(caller),file], null)));
var err_line = (function (){var or__5025__auto__ = new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(caller);
if(cljs.core.truth_(or__5025__auto__)){
return or__5025__auto__;
} else {
return line;
}
})();
var G__20236 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890),type], null);
var G__20236__$1 = (cljs.core.truth_(err_line)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__20236,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471),err_line):G__20236);
var G__20236__$2 = (cljs.core.truth_(message)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__20236__$1,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message):G__20236__$1);
var G__20236__$3 = (cljs.core.truth_((function (){var or__5025__auto__ = fn;
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
})())?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__20236__$2,new cljs.core.Keyword("clojure.error","symbol","clojure.error/symbol",1544821994),(function (){var or__5025__auto__ = fn;
if(cljs.core.truth_(or__5025__auto__)){
return or__5025__auto__;
} else {
return (new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[source__$1,method],null));
}
})()):G__20236__$2);
var G__20236__$4 = (cljs.core.truth_(file__$1)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__20236__$3,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),file__$1):G__20236__$3);
if(cljs.core.truth_(problems)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__20236__$4,new cljs.core.Keyword("clojure.error","spec","clojure.error/spec",2055032595),data);
} else {
return G__20236__$4;
}

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__20180__$1)].join('')));

}
})(),new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358),phase);
});
/**
 * Returns a string from exception data, as produced by ex-triage.
 *   The first line summarizes the exception phase and location.
 *   The subsequent lines describe the cause.
 */
cljs.repl.ex_str = (function cljs$repl$ex_str(p__20286){
var map__20288 = p__20286;
var map__20288__$1 = cljs.core.__destructure_map(map__20288);
var triage_data = map__20288__$1;
var phase = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20288__$1,new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358));
var source = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20288__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397));
var line = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20288__$1,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471));
var column = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20288__$1,new cljs.core.Keyword("clojure.error","column","clojure.error/column",304721553));
var symbol = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20288__$1,new cljs.core.Keyword("clojure.error","symbol","clojure.error/symbol",1544821994));
var class$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20288__$1,new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890));
var cause = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20288__$1,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742));
var spec = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20288__$1,new cljs.core.Keyword("clojure.error","spec","clojure.error/spec",2055032595));
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
var G__20300 = phase;
var G__20300__$1 = (((G__20300 instanceof cljs.core.Keyword))?G__20300.fqn:null);
switch (G__20300__$1) {
case "read-source":
return (format.cljs$core$IFn$_invoke$arity$3 ? format.cljs$core$IFn$_invoke$arity$3("Syntax error reading source at (%s).\n%s\n",loc,cause) : format.call(null,"Syntax error reading source at (%s).\n%s\n",loc,cause));

break;
case "macro-syntax-check":
var G__20301 = "Syntax error macroexpanding %sat (%s).\n%s";
var G__20302 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__20303 = loc;
var G__20304 = (cljs.core.truth_(spec)?(function (){var sb__5670__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR__orig_val__20311_20511 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR__orig_val__20312_20512 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR__temp_val__20313_20513 = true;
var _STAR_print_fn_STAR__temp_val__20314_20514 = (function (x__5671__auto__){
return sb__5670__auto__.append(x__5671__auto__);
});
(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__temp_val__20313_20513);

(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__temp_val__20314_20514);

try{cljs.spec.alpha.explain_out(cljs.core.update.cljs$core$IFn$_invoke$arity$3(spec,new cljs.core.Keyword("cljs.spec.alpha","problems","cljs.spec.alpha/problems",447400814),(function (probs){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__20265_SHARP_){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__20265_SHARP_,new cljs.core.Keyword(null,"in","in",-1531184865));
}),probs);
}))
);
}finally {(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__orig_val__20312_20512);

(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__orig_val__20311_20511);
}
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__5670__auto__);
})():(format.cljs$core$IFn$_invoke$arity$2 ? format.cljs$core$IFn$_invoke$arity$2("%s\n",cause) : format.call(null,"%s\n",cause)));
return (format.cljs$core$IFn$_invoke$arity$4 ? format.cljs$core$IFn$_invoke$arity$4(G__20301,G__20302,G__20303,G__20304) : format.call(null,G__20301,G__20302,G__20303,G__20304));

break;
case "macroexpansion":
var G__20335 = "Unexpected error%s macroexpanding %sat (%s).\n%s\n";
var G__20336 = cause_type;
var G__20337 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__20338 = loc;
var G__20339 = cause;
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5(G__20335,G__20336,G__20337,G__20338,G__20339) : format.call(null,G__20335,G__20336,G__20337,G__20338,G__20339));

break;
case "compile-syntax-check":
var G__20341 = "Syntax error%s compiling %sat (%s).\n%s\n";
var G__20342 = cause_type;
var G__20343 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__20344 = loc;
var G__20345 = cause;
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5(G__20341,G__20342,G__20343,G__20344,G__20345) : format.call(null,G__20341,G__20342,G__20343,G__20344,G__20345));

break;
case "compilation":
var G__20349 = "Unexpected error%s compiling %sat (%s).\n%s\n";
var G__20350 = cause_type;
var G__20351 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__20352 = loc;
var G__20353 = cause;
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5(G__20349,G__20350,G__20351,G__20352,G__20353) : format.call(null,G__20349,G__20350,G__20351,G__20352,G__20353));

break;
case "read-eval-result":
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5("Error reading eval result%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause) : format.call(null,"Error reading eval result%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause));

break;
case "print-eval-result":
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5("Error printing return value%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause) : format.call(null,"Error printing return value%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause));

break;
case "execution":
if(cljs.core.truth_(spec)){
var G__20356 = "Execution error - invalid arguments to %s at (%s).\n%s";
var G__20357 = symbol;
var G__20358 = loc;
var G__20359 = (function (){var sb__5670__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR__orig_val__20360_20532 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR__orig_val__20361_20533 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR__temp_val__20362_20534 = true;
var _STAR_print_fn_STAR__temp_val__20363_20535 = (function (x__5671__auto__){
return sb__5670__auto__.append(x__5671__auto__);
});
(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__temp_val__20362_20534);

(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__temp_val__20363_20535);

try{cljs.spec.alpha.explain_out(cljs.core.update.cljs$core$IFn$_invoke$arity$3(spec,new cljs.core.Keyword("cljs.spec.alpha","problems","cljs.spec.alpha/problems",447400814),(function (probs){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__20272_SHARP_){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__20272_SHARP_,new cljs.core.Keyword(null,"in","in",-1531184865));
}),probs);
}))
);
}finally {(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__orig_val__20361_20533);

(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__orig_val__20360_20532);
}
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__5670__auto__);
})();
return (format.cljs$core$IFn$_invoke$arity$4 ? format.cljs$core$IFn$_invoke$arity$4(G__20356,G__20357,G__20358,G__20359) : format.call(null,G__20356,G__20357,G__20358,G__20359));
} else {
var G__20371 = "Execution error%s at %s(%s).\n%s\n";
var G__20372 = cause_type;
var G__20373 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__20374 = loc;
var G__20375 = cause;
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5(G__20371,G__20372,G__20373,G__20374,G__20375) : format.call(null,G__20371,G__20372,G__20373,G__20374,G__20375));
}

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__20300__$1)].join('')));

}
});
cljs.repl.error__GT_str = (function cljs$repl$error__GT_str(error){
return cljs.repl.ex_str(cljs.repl.ex_triage(cljs.repl.Error__GT_map(error)));
});

//# sourceMappingURL=cljs.repl.js.map
