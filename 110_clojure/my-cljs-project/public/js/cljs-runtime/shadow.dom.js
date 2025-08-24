goog.provide('shadow.dom');
shadow.dom.transition_supported_QMARK_ = true;

/**
 * @interface
 */
shadow.dom.IElement = function(){};

var shadow$dom$IElement$_to_dom$dyn_11089 = (function (this$){
var x__5373__auto__ = (((this$ == null))?null:this$);
var m__5374__auto__ = (shadow.dom._to_dom[goog.typeOf(x__5373__auto__)]);
if((!((m__5374__auto__ == null)))){
return (m__5374__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5374__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5374__auto__.call(null,this$));
} else {
var m__5372__auto__ = (shadow.dom._to_dom["_"]);
if((!((m__5372__auto__ == null)))){
return (m__5372__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5372__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5372__auto__.call(null,this$));
} else {
throw cljs.core.missing_protocol("IElement.-to-dom",this$);
}
}
});
shadow.dom._to_dom = (function shadow$dom$_to_dom(this$){
if((((!((this$ == null)))) && ((!((this$.shadow$dom$IElement$_to_dom$arity$1 == null)))))){
return this$.shadow$dom$IElement$_to_dom$arity$1(this$);
} else {
return shadow$dom$IElement$_to_dom$dyn_11089(this$);
}
});


/**
 * @interface
 */
shadow.dom.SVGElement = function(){};

var shadow$dom$SVGElement$_to_svg$dyn_11092 = (function (this$){
var x__5373__auto__ = (((this$ == null))?null:this$);
var m__5374__auto__ = (shadow.dom._to_svg[goog.typeOf(x__5373__auto__)]);
if((!((m__5374__auto__ == null)))){
return (m__5374__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5374__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5374__auto__.call(null,this$));
} else {
var m__5372__auto__ = (shadow.dom._to_svg["_"]);
if((!((m__5372__auto__ == null)))){
return (m__5372__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5372__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5372__auto__.call(null,this$));
} else {
throw cljs.core.missing_protocol("SVGElement.-to-svg",this$);
}
}
});
shadow.dom._to_svg = (function shadow$dom$_to_svg(this$){
if((((!((this$ == null)))) && ((!((this$.shadow$dom$SVGElement$_to_svg$arity$1 == null)))))){
return this$.shadow$dom$SVGElement$_to_svg$arity$1(this$);
} else {
return shadow$dom$SVGElement$_to_svg$dyn_11092(this$);
}
});

shadow.dom.lazy_native_coll_seq = (function shadow$dom$lazy_native_coll_seq(coll,idx){
if((idx < coll.length)){
return (new cljs.core.LazySeq(null,(function (){
return cljs.core.cons((coll[idx]),(function (){var G__10123 = coll;
var G__10124 = (idx + (1));
return (shadow.dom.lazy_native_coll_seq.cljs$core$IFn$_invoke$arity$2 ? shadow.dom.lazy_native_coll_seq.cljs$core$IFn$_invoke$arity$2(G__10123,G__10124) : shadow.dom.lazy_native_coll_seq.call(null,G__10123,G__10124));
})());
}),null,null));
} else {
return null;
}
});

/**
* @constructor
 * @implements {cljs.core.IIndexed}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IDeref}
 * @implements {shadow.dom.IElement}
*/
shadow.dom.NativeColl = (function (coll){
this.coll = coll;
this.cljs$lang$protocol_mask$partition0$ = 8421394;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(shadow.dom.NativeColl.prototype.cljs$core$IDeref$_deref$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.coll;
}));

(shadow.dom.NativeColl.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (this$,n){
var self__ = this;
var this$__$1 = this;
return (self__.coll[n]);
}));

(shadow.dom.NativeColl.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (this$,n,not_found){
var self__ = this;
var this$__$1 = this;
var or__5025__auto__ = (self__.coll[n]);
if(cljs.core.truth_(or__5025__auto__)){
return or__5025__auto__;
} else {
return not_found;
}
}));

(shadow.dom.NativeColl.prototype.cljs$core$ICounted$_count$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.coll.length;
}));

(shadow.dom.NativeColl.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return shadow.dom.lazy_native_coll_seq(self__.coll,(0));
}));

(shadow.dom.NativeColl.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.dom.NativeColl.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.coll;
}));

(shadow.dom.NativeColl.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"coll","coll",-1006698606,null)], null);
}));

(shadow.dom.NativeColl.cljs$lang$type = true);

(shadow.dom.NativeColl.cljs$lang$ctorStr = "shadow.dom/NativeColl");

(shadow.dom.NativeColl.cljs$lang$ctorPrWriter = (function (this__5310__auto__,writer__5311__auto__,opt__5312__auto__){
return cljs.core._write(writer__5311__auto__,"shadow.dom/NativeColl");
}));

/**
 * Positional factory function for shadow.dom/NativeColl.
 */
shadow.dom.__GT_NativeColl = (function shadow$dom$__GT_NativeColl(coll){
return (new shadow.dom.NativeColl(coll));
});

shadow.dom.native_coll = (function shadow$dom$native_coll(coll){
return (new shadow.dom.NativeColl(coll));
});
shadow.dom.dom_node = (function shadow$dom$dom_node(el){
if((el == null)){
return null;
} else {
if((((!((el == null))))?((((false) || ((cljs.core.PROTOCOL_SENTINEL === el.shadow$dom$IElement$))))?true:false):false)){
return el.shadow$dom$IElement$_to_dom$arity$1(null);
} else {
if(typeof el === 'string'){
return document.createTextNode(el);
} else {
if(typeof el === 'number'){
return document.createTextNode(cljs.core.str.cljs$core$IFn$_invoke$arity$1(el));
} else {
return el;

}
}
}
}
});
shadow.dom.query_one = (function shadow$dom$query_one(var_args){
var G__10127 = arguments.length;
switch (G__10127) {
case 1:
return shadow.dom.query_one.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.query_one.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.query_one.cljs$core$IFn$_invoke$arity$1 = (function (sel){
return document.querySelector(sel);
}));

(shadow.dom.query_one.cljs$core$IFn$_invoke$arity$2 = (function (sel,root){
return shadow.dom.dom_node(root).querySelector(sel);
}));

(shadow.dom.query_one.cljs$lang$maxFixedArity = 2);

shadow.dom.query = (function shadow$dom$query(var_args){
var G__10129 = arguments.length;
switch (G__10129) {
case 1:
return shadow.dom.query.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.query.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.query.cljs$core$IFn$_invoke$arity$1 = (function (sel){
return (new shadow.dom.NativeColl(document.querySelectorAll(sel)));
}));

(shadow.dom.query.cljs$core$IFn$_invoke$arity$2 = (function (sel,root){
return (new shadow.dom.NativeColl(shadow.dom.dom_node(root).querySelectorAll(sel)));
}));

(shadow.dom.query.cljs$lang$maxFixedArity = 2);

shadow.dom.by_id = (function shadow$dom$by_id(var_args){
var G__10131 = arguments.length;
switch (G__10131) {
case 2:
return shadow.dom.by_id.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return shadow.dom.by_id.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.by_id.cljs$core$IFn$_invoke$arity$2 = (function (id,el){
return shadow.dom.dom_node(el).getElementById(id);
}));

(shadow.dom.by_id.cljs$core$IFn$_invoke$arity$1 = (function (id){
return document.getElementById(id);
}));

(shadow.dom.by_id.cljs$lang$maxFixedArity = 2);

shadow.dom.build = shadow.dom.dom_node;
shadow.dom.ev_stop = (function shadow$dom$ev_stop(var_args){
var G__10133 = arguments.length;
switch (G__10133) {
case 1:
return shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 4:
return shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$1 = (function (e){
if(cljs.core.truth_(e.stopPropagation)){
e.stopPropagation();

e.preventDefault();
} else {
(e.cancelBubble = true);

(e.returnValue = false);
}

return e;
}));

(shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$2 = (function (e,el){
shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$1(e);

return el;
}));

(shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$4 = (function (e,el,scope,owner){
shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$1(e);

return el;
}));

(shadow.dom.ev_stop.cljs$lang$maxFixedArity = 4);

/**
 * check wether a parent node (or the document) contains the child
 */
shadow.dom.contains_QMARK_ = (function shadow$dom$contains_QMARK_(var_args){
var G__10135 = arguments.length;
switch (G__10135) {
case 1:
return shadow.dom.contains_QMARK_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.contains_QMARK_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.contains_QMARK_.cljs$core$IFn$_invoke$arity$1 = (function (el){
return goog.dom.contains(document,shadow.dom.dom_node(el));
}));

(shadow.dom.contains_QMARK_.cljs$core$IFn$_invoke$arity$2 = (function (parent,el){
return goog.dom.contains(shadow.dom.dom_node(parent),shadow.dom.dom_node(el));
}));

(shadow.dom.contains_QMARK_.cljs$lang$maxFixedArity = 2);

shadow.dom.add_class = (function shadow$dom$add_class(el,cls){
return goog.dom.classlist.add(shadow.dom.dom_node(el),cls);
});
shadow.dom.remove_class = (function shadow$dom$remove_class(el,cls){
return goog.dom.classlist.remove(shadow.dom.dom_node(el),cls);
});
shadow.dom.toggle_class = (function shadow$dom$toggle_class(var_args){
var G__10143 = arguments.length;
switch (G__10143) {
case 2:
return shadow.dom.toggle_class.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return shadow.dom.toggle_class.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.toggle_class.cljs$core$IFn$_invoke$arity$2 = (function (el,cls){
return goog.dom.classlist.toggle(shadow.dom.dom_node(el),cls);
}));

(shadow.dom.toggle_class.cljs$core$IFn$_invoke$arity$3 = (function (el,cls,v){
if(cljs.core.truth_(v)){
return shadow.dom.add_class(el,cls);
} else {
return shadow.dom.remove_class(el,cls);
}
}));

(shadow.dom.toggle_class.cljs$lang$maxFixedArity = 3);

shadow.dom.dom_listen = (cljs.core.truth_((function (){var or__5025__auto__ = (!((typeof document !== 'undefined')));
if(or__5025__auto__){
return or__5025__auto__;
} else {
return document.addEventListener;
}
})())?(function shadow$dom$dom_listen_good(el,ev,handler){
return el.addEventListener(ev,handler,false);
}):(function shadow$dom$dom_listen_ie(el,ev,handler){
try{return el.attachEvent(["on",cljs.core.str.cljs$core$IFn$_invoke$arity$1(ev)].join(''),(function (e){
return (handler.cljs$core$IFn$_invoke$arity$2 ? handler.cljs$core$IFn$_invoke$arity$2(e,el) : handler.call(null,e,el));
}));
}catch (e10150){if((e10150 instanceof Object)){
var e = e10150;
return console.log("didnt support attachEvent",el,e);
} else {
throw e10150;

}
}}));
shadow.dom.dom_listen_remove = (cljs.core.truth_((function (){var or__5025__auto__ = (!((typeof document !== 'undefined')));
if(or__5025__auto__){
return or__5025__auto__;
} else {
return document.removeEventListener;
}
})())?(function shadow$dom$dom_listen_remove_good(el,ev,handler){
return el.removeEventListener(ev,handler,false);
}):(function shadow$dom$dom_listen_remove_ie(el,ev,handler){
return el.detachEvent(["on",cljs.core.str.cljs$core$IFn$_invoke$arity$1(ev)].join(''),handler);
}));
shadow.dom.on_query = (function shadow$dom$on_query(root_el,ev,selector,handler){
var seq__10164 = cljs.core.seq(shadow.dom.query.cljs$core$IFn$_invoke$arity$2(selector,root_el));
var chunk__10165 = null;
var count__10166 = (0);
var i__10167 = (0);
while(true){
if((i__10167 < count__10166)){
var el = chunk__10165.cljs$core$IIndexed$_nth$arity$2(null,i__10167);
var handler_11122__$1 = ((function (seq__10164,chunk__10165,count__10166,i__10167,el){
return (function (e){
return (handler.cljs$core$IFn$_invoke$arity$2 ? handler.cljs$core$IFn$_invoke$arity$2(e,el) : handler.call(null,e,el));
});})(seq__10164,chunk__10165,count__10166,i__10167,el))
;
shadow.dom.dom_listen(el,cljs.core.name(ev),handler_11122__$1);


var G__11123 = seq__10164;
var G__11124 = chunk__10165;
var G__11125 = count__10166;
var G__11126 = (i__10167 + (1));
seq__10164 = G__11123;
chunk__10165 = G__11124;
count__10166 = G__11125;
i__10167 = G__11126;
continue;
} else {
var temp__5823__auto__ = cljs.core.seq(seq__10164);
if(temp__5823__auto__){
var seq__10164__$1 = temp__5823__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__10164__$1)){
var c__5548__auto__ = cljs.core.chunk_first(seq__10164__$1);
var G__11129 = cljs.core.chunk_rest(seq__10164__$1);
var G__11130 = c__5548__auto__;
var G__11131 = cljs.core.count(c__5548__auto__);
var G__11132 = (0);
seq__10164 = G__11129;
chunk__10165 = G__11130;
count__10166 = G__11131;
i__10167 = G__11132;
continue;
} else {
var el = cljs.core.first(seq__10164__$1);
var handler_11133__$1 = ((function (seq__10164,chunk__10165,count__10166,i__10167,el,seq__10164__$1,temp__5823__auto__){
return (function (e){
return (handler.cljs$core$IFn$_invoke$arity$2 ? handler.cljs$core$IFn$_invoke$arity$2(e,el) : handler.call(null,e,el));
});})(seq__10164,chunk__10165,count__10166,i__10167,el,seq__10164__$1,temp__5823__auto__))
;
shadow.dom.dom_listen(el,cljs.core.name(ev),handler_11133__$1);


var G__11140 = cljs.core.next(seq__10164__$1);
var G__11141 = null;
var G__11142 = (0);
var G__11143 = (0);
seq__10164 = G__11140;
chunk__10165 = G__11141;
count__10166 = G__11142;
i__10167 = G__11143;
continue;
}
} else {
return null;
}
}
break;
}
});
shadow.dom.on = (function shadow$dom$on(var_args){
var G__10212 = arguments.length;
switch (G__10212) {
case 3:
return shadow.dom.on.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return shadow.dom.on.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.on.cljs$core$IFn$_invoke$arity$3 = (function (el,ev,handler){
return shadow.dom.on.cljs$core$IFn$_invoke$arity$4(el,ev,handler,false);
}));

(shadow.dom.on.cljs$core$IFn$_invoke$arity$4 = (function (el,ev,handler,capture){
if(cljs.core.vector_QMARK_(ev)){
return shadow.dom.on_query(el,cljs.core.first(ev),cljs.core.second(ev),handler);
} else {
var handler__$1 = (function (e){
return (handler.cljs$core$IFn$_invoke$arity$2 ? handler.cljs$core$IFn$_invoke$arity$2(e,el) : handler.call(null,e,el));
});
return shadow.dom.dom_listen(shadow.dom.dom_node(el),cljs.core.name(ev),handler__$1);
}
}));

(shadow.dom.on.cljs$lang$maxFixedArity = 4);

shadow.dom.remove_event_handler = (function shadow$dom$remove_event_handler(el,ev,handler){
return shadow.dom.dom_listen_remove(shadow.dom.dom_node(el),cljs.core.name(ev),handler);
});
shadow.dom.add_event_listeners = (function shadow$dom$add_event_listeners(el,events){
var seq__10239 = cljs.core.seq(events);
var chunk__10240 = null;
var count__10241 = (0);
var i__10242 = (0);
while(true){
if((i__10242 < count__10241)){
var vec__10270 = chunk__10240.cljs$core$IIndexed$_nth$arity$2(null,i__10242);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10270,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10270,(1),null);
shadow.dom.on.cljs$core$IFn$_invoke$arity$3(el,k,v);


var G__11155 = seq__10239;
var G__11156 = chunk__10240;
var G__11158 = count__10241;
var G__11159 = (i__10242 + (1));
seq__10239 = G__11155;
chunk__10240 = G__11156;
count__10241 = G__11158;
i__10242 = G__11159;
continue;
} else {
var temp__5823__auto__ = cljs.core.seq(seq__10239);
if(temp__5823__auto__){
var seq__10239__$1 = temp__5823__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__10239__$1)){
var c__5548__auto__ = cljs.core.chunk_first(seq__10239__$1);
var G__11161 = cljs.core.chunk_rest(seq__10239__$1);
var G__11162 = c__5548__auto__;
var G__11163 = cljs.core.count(c__5548__auto__);
var G__11164 = (0);
seq__10239 = G__11161;
chunk__10240 = G__11162;
count__10241 = G__11163;
i__10242 = G__11164;
continue;
} else {
var vec__10285 = cljs.core.first(seq__10239__$1);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10285,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10285,(1),null);
shadow.dom.on.cljs$core$IFn$_invoke$arity$3(el,k,v);


var G__11166 = cljs.core.next(seq__10239__$1);
var G__11167 = null;
var G__11168 = (0);
var G__11169 = (0);
seq__10239 = G__11166;
chunk__10240 = G__11167;
count__10241 = G__11168;
i__10242 = G__11169;
continue;
}
} else {
return null;
}
}
break;
}
});
shadow.dom.set_style = (function shadow$dom$set_style(el,styles){
var dom = shadow.dom.dom_node(el);
var seq__10293 = cljs.core.seq(styles);
var chunk__10294 = null;
var count__10295 = (0);
var i__10296 = (0);
while(true){
if((i__10296 < count__10295)){
var vec__10338 = chunk__10294.cljs$core$IIndexed$_nth$arity$2(null,i__10296);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10338,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10338,(1),null);
goog.style.setStyle(dom,cljs.core.name(k),(((v == null))?"":v));


var G__11171 = seq__10293;
var G__11172 = chunk__10294;
var G__11173 = count__10295;
var G__11174 = (i__10296 + (1));
seq__10293 = G__11171;
chunk__10294 = G__11172;
count__10295 = G__11173;
i__10296 = G__11174;
continue;
} else {
var temp__5823__auto__ = cljs.core.seq(seq__10293);
if(temp__5823__auto__){
var seq__10293__$1 = temp__5823__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__10293__$1)){
var c__5548__auto__ = cljs.core.chunk_first(seq__10293__$1);
var G__11175 = cljs.core.chunk_rest(seq__10293__$1);
var G__11176 = c__5548__auto__;
var G__11177 = cljs.core.count(c__5548__auto__);
var G__11178 = (0);
seq__10293 = G__11175;
chunk__10294 = G__11176;
count__10295 = G__11177;
i__10296 = G__11178;
continue;
} else {
var vec__10354 = cljs.core.first(seq__10293__$1);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10354,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10354,(1),null);
goog.style.setStyle(dom,cljs.core.name(k),(((v == null))?"":v));


var G__11183 = cljs.core.next(seq__10293__$1);
var G__11184 = null;
var G__11185 = (0);
var G__11186 = (0);
seq__10293 = G__11183;
chunk__10294 = G__11184;
count__10295 = G__11185;
i__10296 = G__11186;
continue;
}
} else {
return null;
}
}
break;
}
});
shadow.dom.set_attr_STAR_ = (function shadow$dom$set_attr_STAR_(el,key,value){
var G__10379_11188 = key;
var G__10379_11189__$1 = (((G__10379_11188 instanceof cljs.core.Keyword))?G__10379_11188.fqn:null);
switch (G__10379_11189__$1) {
case "id":
(el.id = cljs.core.str.cljs$core$IFn$_invoke$arity$1(value));

break;
case "class":
(el.className = cljs.core.str.cljs$core$IFn$_invoke$arity$1(value));

break;
case "for":
(el.htmlFor = value);

break;
case "cellpadding":
el.setAttribute("cellPadding",value);

break;
case "cellspacing":
el.setAttribute("cellSpacing",value);

break;
case "colspan":
el.setAttribute("colSpan",value);

break;
case "frameborder":
el.setAttribute("frameBorder",value);

break;
case "height":
el.setAttribute("height",value);

break;
case "maxlength":
el.setAttribute("maxLength",value);

break;
case "role":
el.setAttribute("role",value);

break;
case "rowspan":
el.setAttribute("rowSpan",value);

break;
case "type":
el.setAttribute("type",value);

break;
case "usemap":
el.setAttribute("useMap",value);

break;
case "valign":
el.setAttribute("vAlign",value);

break;
case "width":
el.setAttribute("width",value);

break;
case "on":
shadow.dom.add_event_listeners(el,value);

break;
case "style":
if((value == null)){
} else {
if(typeof value === 'string'){
el.setAttribute("style",value);
} else {
if(cljs.core.map_QMARK_(value)){
shadow.dom.set_style(el,value);
} else {
goog.style.setStyle(el,value);

}
}
}

break;
default:
var ks_11200 = cljs.core.name(key);
if(cljs.core.truth_((function (){var or__5025__auto__ = goog.string.startsWith(ks_11200,"data-");
if(cljs.core.truth_(or__5025__auto__)){
return or__5025__auto__;
} else {
return goog.string.startsWith(ks_11200,"aria-");
}
})())){
el.setAttribute(ks_11200,value);
} else {
(el[ks_11200] = value);
}

}

return el;
});
shadow.dom.set_attrs = (function shadow$dom$set_attrs(el,attrs){
return cljs.core.reduce_kv((function (el__$1,key,value){
shadow.dom.set_attr_STAR_(el__$1,key,value);

return el__$1;
}),shadow.dom.dom_node(el),attrs);
});
shadow.dom.set_attr = (function shadow$dom$set_attr(el,key,value){
return shadow.dom.set_attr_STAR_(shadow.dom.dom_node(el),key,value);
});
shadow.dom.has_class_QMARK_ = (function shadow$dom$has_class_QMARK_(el,cls){
return goog.dom.classlist.contains(shadow.dom.dom_node(el),cls);
});
shadow.dom.merge_class_string = (function shadow$dom$merge_class_string(current,extra_class){
if(cljs.core.seq(current)){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(current)," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(extra_class)].join('');
} else {
return extra_class;
}
});
shadow.dom.parse_tag = (function shadow$dom$parse_tag(spec){
var spec__$1 = cljs.core.name(spec);
var fdot = spec__$1.indexOf(".");
var fhash = spec__$1.indexOf("#");
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((-1),fdot)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((-1),fhash)))){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spec__$1,null,null], null);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((-1),fhash)){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spec__$1.substring((0),fdot),null,clojure.string.replace(spec__$1.substring((fdot + (1))),/\./," ")], null);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((-1),fdot)){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spec__$1.substring((0),fhash),spec__$1.substring((fhash + (1))),null], null);
} else {
if((fhash > fdot)){
throw ["cant have id after class?",spec__$1].join('');
} else {
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spec__$1.substring((0),fhash),spec__$1.substring((fhash + (1)),fdot),clojure.string.replace(spec__$1.substring((fdot + (1))),/\./," ")], null);

}
}
}
}
});
shadow.dom.create_dom_node = (function shadow$dom$create_dom_node(tag_def,p__10448){
var map__10449 = p__10448;
var map__10449__$1 = cljs.core.__destructure_map(map__10449);
var props = map__10449__$1;
var class$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10449__$1,new cljs.core.Keyword(null,"class","class",-2030961996));
var tag_props = ({});
var vec__10455 = shadow.dom.parse_tag(tag_def);
var tag_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10455,(0),null);
var tag_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10455,(1),null);
var tag_classes = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10455,(2),null);
if(cljs.core.truth_(tag_id)){
(tag_props["id"] = tag_id);
} else {
}

if(cljs.core.truth_(tag_classes)){
(tag_props["class"] = shadow.dom.merge_class_string(class$,tag_classes));
} else {
}

var G__10460 = goog.dom.createDom(tag_name,tag_props);
shadow.dom.set_attrs(G__10460,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(props,new cljs.core.Keyword(null,"class","class",-2030961996)));

return G__10460;
});
shadow.dom.append = (function shadow$dom$append(var_args){
var G__10470 = arguments.length;
switch (G__10470) {
case 1:
return shadow.dom.append.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.append.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.append.cljs$core$IFn$_invoke$arity$1 = (function (node){
if(cljs.core.truth_(node)){
var temp__5823__auto__ = shadow.dom.dom_node(node);
if(cljs.core.truth_(temp__5823__auto__)){
var n = temp__5823__auto__;
document.body.appendChild(n);

return n;
} else {
return null;
}
} else {
return null;
}
}));

(shadow.dom.append.cljs$core$IFn$_invoke$arity$2 = (function (el,node){
if(cljs.core.truth_(node)){
var temp__5823__auto__ = shadow.dom.dom_node(node);
if(cljs.core.truth_(temp__5823__auto__)){
var n = temp__5823__auto__;
shadow.dom.dom_node(el).appendChild(n);

return n;
} else {
return null;
}
} else {
return null;
}
}));

(shadow.dom.append.cljs$lang$maxFixedArity = 2);

shadow.dom.destructure_node = (function shadow$dom$destructure_node(create_fn,p__10494){
var vec__10497 = p__10494;
var seq__10498 = cljs.core.seq(vec__10497);
var first__10499 = cljs.core.first(seq__10498);
var seq__10498__$1 = cljs.core.next(seq__10498);
var nn = first__10499;
var first__10499__$1 = cljs.core.first(seq__10498__$1);
var seq__10498__$2 = cljs.core.next(seq__10498__$1);
var np = first__10499__$1;
var nc = seq__10498__$2;
var node = vec__10497;
if((nn instanceof cljs.core.Keyword)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("invalid dom node",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"node","node",581201198),node], null));
}

if((((np == null)) && ((nc == null)))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__10503 = nn;
var G__10504 = cljs.core.PersistentArrayMap.EMPTY;
return (create_fn.cljs$core$IFn$_invoke$arity$2 ? create_fn.cljs$core$IFn$_invoke$arity$2(G__10503,G__10504) : create_fn.call(null,G__10503,G__10504));
})(),cljs.core.List.EMPTY], null);
} else {
if(cljs.core.map_QMARK_(np)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(create_fn.cljs$core$IFn$_invoke$arity$2 ? create_fn.cljs$core$IFn$_invoke$arity$2(nn,np) : create_fn.call(null,nn,np)),nc], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__10507 = nn;
var G__10508 = cljs.core.PersistentArrayMap.EMPTY;
return (create_fn.cljs$core$IFn$_invoke$arity$2 ? create_fn.cljs$core$IFn$_invoke$arity$2(G__10507,G__10508) : create_fn.call(null,G__10507,G__10508));
})(),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(nc,np)], null);

}
}
});
shadow.dom.make_dom_node = (function shadow$dom$make_dom_node(structure){
var vec__10511 = shadow.dom.destructure_node(shadow.dom.create_dom_node,structure);
var node = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10511,(0),null);
var node_children = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10511,(1),null);
var seq__10515_11232 = cljs.core.seq(node_children);
var chunk__10516_11233 = null;
var count__10517_11234 = (0);
var i__10518_11235 = (0);
while(true){
if((i__10518_11235 < count__10517_11234)){
var child_struct_11236 = chunk__10516_11233.cljs$core$IIndexed$_nth$arity$2(null,i__10518_11235);
var children_11237 = shadow.dom.dom_node(child_struct_11236);
if(cljs.core.seq_QMARK_(children_11237)){
var seq__10551_11238 = cljs.core.seq(cljs.core.map.cljs$core$IFn$_invoke$arity$2(shadow.dom.dom_node,children_11237));
var chunk__10553_11239 = null;
var count__10554_11240 = (0);
var i__10555_11241 = (0);
while(true){
if((i__10555_11241 < count__10554_11240)){
var child_11242 = chunk__10553_11239.cljs$core$IIndexed$_nth$arity$2(null,i__10555_11241);
if(cljs.core.truth_(child_11242)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_11242);


var G__11243 = seq__10551_11238;
var G__11244 = chunk__10553_11239;
var G__11245 = count__10554_11240;
var G__11246 = (i__10555_11241 + (1));
seq__10551_11238 = G__11243;
chunk__10553_11239 = G__11244;
count__10554_11240 = G__11245;
i__10555_11241 = G__11246;
continue;
} else {
var G__11247 = seq__10551_11238;
var G__11248 = chunk__10553_11239;
var G__11249 = count__10554_11240;
var G__11250 = (i__10555_11241 + (1));
seq__10551_11238 = G__11247;
chunk__10553_11239 = G__11248;
count__10554_11240 = G__11249;
i__10555_11241 = G__11250;
continue;
}
} else {
var temp__5823__auto___11251 = cljs.core.seq(seq__10551_11238);
if(temp__5823__auto___11251){
var seq__10551_11258__$1 = temp__5823__auto___11251;
if(cljs.core.chunked_seq_QMARK_(seq__10551_11258__$1)){
var c__5548__auto___11286 = cljs.core.chunk_first(seq__10551_11258__$1);
var G__11305 = cljs.core.chunk_rest(seq__10551_11258__$1);
var G__11306 = c__5548__auto___11286;
var G__11307 = cljs.core.count(c__5548__auto___11286);
var G__11308 = (0);
seq__10551_11238 = G__11305;
chunk__10553_11239 = G__11306;
count__10554_11240 = G__11307;
i__10555_11241 = G__11308;
continue;
} else {
var child_11309 = cljs.core.first(seq__10551_11258__$1);
if(cljs.core.truth_(child_11309)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_11309);


var G__11311 = cljs.core.next(seq__10551_11258__$1);
var G__11312 = null;
var G__11313 = (0);
var G__11314 = (0);
seq__10551_11238 = G__11311;
chunk__10553_11239 = G__11312;
count__10554_11240 = G__11313;
i__10555_11241 = G__11314;
continue;
} else {
var G__11316 = cljs.core.next(seq__10551_11258__$1);
var G__11317 = null;
var G__11318 = (0);
var G__11319 = (0);
seq__10551_11238 = G__11316;
chunk__10553_11239 = G__11317;
count__10554_11240 = G__11318;
i__10555_11241 = G__11319;
continue;
}
}
} else {
}
}
break;
}
} else {
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,children_11237);
}


var G__11321 = seq__10515_11232;
var G__11322 = chunk__10516_11233;
var G__11323 = count__10517_11234;
var G__11324 = (i__10518_11235 + (1));
seq__10515_11232 = G__11321;
chunk__10516_11233 = G__11322;
count__10517_11234 = G__11323;
i__10518_11235 = G__11324;
continue;
} else {
var temp__5823__auto___11325 = cljs.core.seq(seq__10515_11232);
if(temp__5823__auto___11325){
var seq__10515_11332__$1 = temp__5823__auto___11325;
if(cljs.core.chunked_seq_QMARK_(seq__10515_11332__$1)){
var c__5548__auto___11333 = cljs.core.chunk_first(seq__10515_11332__$1);
var G__11334 = cljs.core.chunk_rest(seq__10515_11332__$1);
var G__11335 = c__5548__auto___11333;
var G__11336 = cljs.core.count(c__5548__auto___11333);
var G__11337 = (0);
seq__10515_11232 = G__11334;
chunk__10516_11233 = G__11335;
count__10517_11234 = G__11336;
i__10518_11235 = G__11337;
continue;
} else {
var child_struct_11338 = cljs.core.first(seq__10515_11332__$1);
var children_11340 = shadow.dom.dom_node(child_struct_11338);
if(cljs.core.seq_QMARK_(children_11340)){
var seq__10563_11341 = cljs.core.seq(cljs.core.map.cljs$core$IFn$_invoke$arity$2(shadow.dom.dom_node,children_11340));
var chunk__10565_11342 = null;
var count__10566_11343 = (0);
var i__10567_11344 = (0);
while(true){
if((i__10567_11344 < count__10566_11343)){
var child_11345 = chunk__10565_11342.cljs$core$IIndexed$_nth$arity$2(null,i__10567_11344);
if(cljs.core.truth_(child_11345)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_11345);


var G__11346 = seq__10563_11341;
var G__11347 = chunk__10565_11342;
var G__11348 = count__10566_11343;
var G__11349 = (i__10567_11344 + (1));
seq__10563_11341 = G__11346;
chunk__10565_11342 = G__11347;
count__10566_11343 = G__11348;
i__10567_11344 = G__11349;
continue;
} else {
var G__11351 = seq__10563_11341;
var G__11352 = chunk__10565_11342;
var G__11353 = count__10566_11343;
var G__11354 = (i__10567_11344 + (1));
seq__10563_11341 = G__11351;
chunk__10565_11342 = G__11352;
count__10566_11343 = G__11353;
i__10567_11344 = G__11354;
continue;
}
} else {
var temp__5823__auto___11355__$1 = cljs.core.seq(seq__10563_11341);
if(temp__5823__auto___11355__$1){
var seq__10563_11356__$1 = temp__5823__auto___11355__$1;
if(cljs.core.chunked_seq_QMARK_(seq__10563_11356__$1)){
var c__5548__auto___11357 = cljs.core.chunk_first(seq__10563_11356__$1);
var G__11358 = cljs.core.chunk_rest(seq__10563_11356__$1);
var G__11359 = c__5548__auto___11357;
var G__11360 = cljs.core.count(c__5548__auto___11357);
var G__11361 = (0);
seq__10563_11341 = G__11358;
chunk__10565_11342 = G__11359;
count__10566_11343 = G__11360;
i__10567_11344 = G__11361;
continue;
} else {
var child_11366 = cljs.core.first(seq__10563_11356__$1);
if(cljs.core.truth_(child_11366)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_11366);


var G__11367 = cljs.core.next(seq__10563_11356__$1);
var G__11368 = null;
var G__11369 = (0);
var G__11370 = (0);
seq__10563_11341 = G__11367;
chunk__10565_11342 = G__11368;
count__10566_11343 = G__11369;
i__10567_11344 = G__11370;
continue;
} else {
var G__11371 = cljs.core.next(seq__10563_11356__$1);
var G__11372 = null;
var G__11373 = (0);
var G__11374 = (0);
seq__10563_11341 = G__11371;
chunk__10565_11342 = G__11372;
count__10566_11343 = G__11373;
i__10567_11344 = G__11374;
continue;
}
}
} else {
}
}
break;
}
} else {
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,children_11340);
}


var G__11377 = cljs.core.next(seq__10515_11332__$1);
var G__11378 = null;
var G__11379 = (0);
var G__11380 = (0);
seq__10515_11232 = G__11377;
chunk__10516_11233 = G__11378;
count__10517_11234 = G__11379;
i__10518_11235 = G__11380;
continue;
}
} else {
}
}
break;
}

return node;
});
(cljs.core.Keyword.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.Keyword.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var this$__$1 = this;
return shadow.dom.make_dom_node(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [this$__$1], null));
}));

(cljs.core.PersistentVector.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.PersistentVector.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var this$__$1 = this;
return shadow.dom.make_dom_node(this$__$1);
}));

(cljs.core.LazySeq.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.LazySeq.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var this$__$1 = this;
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(shadow.dom._to_dom,this$__$1);
}));
if(cljs.core.truth_(((typeof HTMLElement) != 'undefined'))){
(HTMLElement.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(HTMLElement.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var this$__$1 = this;
return this$__$1;
}));
} else {
}
if(cljs.core.truth_(((typeof DocumentFragment) != 'undefined'))){
(DocumentFragment.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(DocumentFragment.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var this$__$1 = this;
return this$__$1;
}));
} else {
}
/**
 * clear node children
 */
shadow.dom.reset = (function shadow$dom$reset(node){
return goog.dom.removeChildren(shadow.dom.dom_node(node));
});
shadow.dom.remove = (function shadow$dom$remove(node){
if((((!((node == null))))?(((((node.cljs$lang$protocol_mask$partition0$ & (8388608))) || ((cljs.core.PROTOCOL_SENTINEL === node.cljs$core$ISeqable$))))?true:false):false)){
var seq__10602 = cljs.core.seq(node);
var chunk__10603 = null;
var count__10604 = (0);
var i__10605 = (0);
while(true){
if((i__10605 < count__10604)){
var n = chunk__10603.cljs$core$IIndexed$_nth$arity$2(null,i__10605);
(shadow.dom.remove.cljs$core$IFn$_invoke$arity$1 ? shadow.dom.remove.cljs$core$IFn$_invoke$arity$1(n) : shadow.dom.remove.call(null,n));


var G__11384 = seq__10602;
var G__11385 = chunk__10603;
var G__11386 = count__10604;
var G__11387 = (i__10605 + (1));
seq__10602 = G__11384;
chunk__10603 = G__11385;
count__10604 = G__11386;
i__10605 = G__11387;
continue;
} else {
var temp__5823__auto__ = cljs.core.seq(seq__10602);
if(temp__5823__auto__){
var seq__10602__$1 = temp__5823__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__10602__$1)){
var c__5548__auto__ = cljs.core.chunk_first(seq__10602__$1);
var G__11390 = cljs.core.chunk_rest(seq__10602__$1);
var G__11391 = c__5548__auto__;
var G__11392 = cljs.core.count(c__5548__auto__);
var G__11393 = (0);
seq__10602 = G__11390;
chunk__10603 = G__11391;
count__10604 = G__11392;
i__10605 = G__11393;
continue;
} else {
var n = cljs.core.first(seq__10602__$1);
(shadow.dom.remove.cljs$core$IFn$_invoke$arity$1 ? shadow.dom.remove.cljs$core$IFn$_invoke$arity$1(n) : shadow.dom.remove.call(null,n));


var G__11395 = cljs.core.next(seq__10602__$1);
var G__11396 = null;
var G__11397 = (0);
var G__11398 = (0);
seq__10602 = G__11395;
chunk__10603 = G__11396;
count__10604 = G__11397;
i__10605 = G__11398;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return goog.dom.removeNode(node);
}
});
shadow.dom.replace_node = (function shadow$dom$replace_node(old,new$){
return goog.dom.replaceNode(shadow.dom.dom_node(new$),shadow.dom.dom_node(old));
});
shadow.dom.text = (function shadow$dom$text(var_args){
var G__10614 = arguments.length;
switch (G__10614) {
case 2:
return shadow.dom.text.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return shadow.dom.text.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.text.cljs$core$IFn$_invoke$arity$2 = (function (el,new_text){
return (shadow.dom.dom_node(el).innerText = new_text);
}));

(shadow.dom.text.cljs$core$IFn$_invoke$arity$1 = (function (el){
return shadow.dom.dom_node(el).innerText;
}));

(shadow.dom.text.cljs$lang$maxFixedArity = 2);

shadow.dom.check = (function shadow$dom$check(var_args){
var G__10623 = arguments.length;
switch (G__10623) {
case 1:
return shadow.dom.check.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.check.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.check.cljs$core$IFn$_invoke$arity$1 = (function (el){
return shadow.dom.check.cljs$core$IFn$_invoke$arity$2(el,true);
}));

(shadow.dom.check.cljs$core$IFn$_invoke$arity$2 = (function (el,checked){
return (shadow.dom.dom_node(el).checked = checked);
}));

(shadow.dom.check.cljs$lang$maxFixedArity = 2);

shadow.dom.checked_QMARK_ = (function shadow$dom$checked_QMARK_(el){
return shadow.dom.dom_node(el).checked;
});
shadow.dom.form_elements = (function shadow$dom$form_elements(el){
return (new shadow.dom.NativeColl(shadow.dom.dom_node(el).elements));
});
shadow.dom.children = (function shadow$dom$children(el){
return (new shadow.dom.NativeColl(shadow.dom.dom_node(el).children));
});
shadow.dom.child_nodes = (function shadow$dom$child_nodes(el){
return (new shadow.dom.NativeColl(shadow.dom.dom_node(el).childNodes));
});
shadow.dom.attr = (function shadow$dom$attr(var_args){
var G__10652 = arguments.length;
switch (G__10652) {
case 2:
return shadow.dom.attr.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return shadow.dom.attr.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.attr.cljs$core$IFn$_invoke$arity$2 = (function (el,key){
return shadow.dom.dom_node(el).getAttribute(cljs.core.name(key));
}));

(shadow.dom.attr.cljs$core$IFn$_invoke$arity$3 = (function (el,key,default$){
var or__5025__auto__ = shadow.dom.dom_node(el).getAttribute(cljs.core.name(key));
if(cljs.core.truth_(or__5025__auto__)){
return or__5025__auto__;
} else {
return default$;
}
}));

(shadow.dom.attr.cljs$lang$maxFixedArity = 3);

shadow.dom.del_attr = (function shadow$dom$del_attr(el,key){
return shadow.dom.dom_node(el).removeAttribute(cljs.core.name(key));
});
shadow.dom.data = (function shadow$dom$data(el,key){
return shadow.dom.dom_node(el).getAttribute(["data-",cljs.core.name(key)].join(''));
});
shadow.dom.set_data = (function shadow$dom$set_data(el,key,value){
return shadow.dom.dom_node(el).setAttribute(["data-",cljs.core.name(key)].join(''),cljs.core.str.cljs$core$IFn$_invoke$arity$1(value));
});
shadow.dom.set_html = (function shadow$dom$set_html(node,text){
return (shadow.dom.dom_node(node).innerHTML = text);
});
shadow.dom.get_html = (function shadow$dom$get_html(node){
return shadow.dom.dom_node(node).innerHTML;
});
shadow.dom.fragment = (function shadow$dom$fragment(var_args){
var args__5755__auto__ = [];
var len__5749__auto___11408 = arguments.length;
var i__5750__auto___11409 = (0);
while(true){
if((i__5750__auto___11409 < len__5749__auto___11408)){
args__5755__auto__.push((arguments[i__5750__auto___11409]));

var G__11410 = (i__5750__auto___11409 + (1));
i__5750__auto___11409 = G__11410;
continue;
} else {
}
break;
}

var argseq__5756__auto__ = ((((0) < args__5755__auto__.length))?(new cljs.core.IndexedSeq(args__5755__auto__.slice((0)),(0),null)):null);
return shadow.dom.fragment.cljs$core$IFn$_invoke$arity$variadic(argseq__5756__auto__);
});

(shadow.dom.fragment.cljs$core$IFn$_invoke$arity$variadic = (function (nodes){
var fragment = document.createDocumentFragment();
var seq__10681_11411 = cljs.core.seq(nodes);
var chunk__10682_11412 = null;
var count__10683_11413 = (0);
var i__10684_11414 = (0);
while(true){
if((i__10684_11414 < count__10683_11413)){
var node_11415 = chunk__10682_11412.cljs$core$IIndexed$_nth$arity$2(null,i__10684_11414);
fragment.appendChild(shadow.dom._to_dom(node_11415));


var G__11418 = seq__10681_11411;
var G__11419 = chunk__10682_11412;
var G__11420 = count__10683_11413;
var G__11421 = (i__10684_11414 + (1));
seq__10681_11411 = G__11418;
chunk__10682_11412 = G__11419;
count__10683_11413 = G__11420;
i__10684_11414 = G__11421;
continue;
} else {
var temp__5823__auto___11422 = cljs.core.seq(seq__10681_11411);
if(temp__5823__auto___11422){
var seq__10681_11426__$1 = temp__5823__auto___11422;
if(cljs.core.chunked_seq_QMARK_(seq__10681_11426__$1)){
var c__5548__auto___11427 = cljs.core.chunk_first(seq__10681_11426__$1);
var G__11428 = cljs.core.chunk_rest(seq__10681_11426__$1);
var G__11429 = c__5548__auto___11427;
var G__11430 = cljs.core.count(c__5548__auto___11427);
var G__11431 = (0);
seq__10681_11411 = G__11428;
chunk__10682_11412 = G__11429;
count__10683_11413 = G__11430;
i__10684_11414 = G__11431;
continue;
} else {
var node_11432 = cljs.core.first(seq__10681_11426__$1);
fragment.appendChild(shadow.dom._to_dom(node_11432));


var G__11433 = cljs.core.next(seq__10681_11426__$1);
var G__11434 = null;
var G__11435 = (0);
var G__11436 = (0);
seq__10681_11411 = G__11433;
chunk__10682_11412 = G__11434;
count__10683_11413 = G__11435;
i__10684_11414 = G__11436;
continue;
}
} else {
}
}
break;
}

return (new shadow.dom.NativeColl(fragment));
}));

(shadow.dom.fragment.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(shadow.dom.fragment.cljs$lang$applyTo = (function (seq10675){
var self__5735__auto__ = this;
return self__5735__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq10675));
}));

/**
 * given a html string, eval all <script> tags and return the html without the scripts
 * don't do this for everything, only content you trust.
 */
shadow.dom.eval_scripts = (function shadow$dom$eval_scripts(s){
var scripts = cljs.core.re_seq(/<script[^>]*?>(.+?)<\/script>/,s);
var seq__10693_11439 = cljs.core.seq(scripts);
var chunk__10694_11440 = null;
var count__10695_11441 = (0);
var i__10696_11442 = (0);
while(true){
if((i__10696_11442 < count__10695_11441)){
var vec__10707_11443 = chunk__10694_11440.cljs$core$IIndexed$_nth$arity$2(null,i__10696_11442);
var script_tag_11444 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10707_11443,(0),null);
var script_body_11445 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10707_11443,(1),null);
eval(script_body_11445);


var G__11458 = seq__10693_11439;
var G__11459 = chunk__10694_11440;
var G__11460 = count__10695_11441;
var G__11461 = (i__10696_11442 + (1));
seq__10693_11439 = G__11458;
chunk__10694_11440 = G__11459;
count__10695_11441 = G__11460;
i__10696_11442 = G__11461;
continue;
} else {
var temp__5823__auto___11462 = cljs.core.seq(seq__10693_11439);
if(temp__5823__auto___11462){
var seq__10693_11463__$1 = temp__5823__auto___11462;
if(cljs.core.chunked_seq_QMARK_(seq__10693_11463__$1)){
var c__5548__auto___11464 = cljs.core.chunk_first(seq__10693_11463__$1);
var G__11466 = cljs.core.chunk_rest(seq__10693_11463__$1);
var G__11467 = c__5548__auto___11464;
var G__11468 = cljs.core.count(c__5548__auto___11464);
var G__11469 = (0);
seq__10693_11439 = G__11466;
chunk__10694_11440 = G__11467;
count__10695_11441 = G__11468;
i__10696_11442 = G__11469;
continue;
} else {
var vec__10713_11471 = cljs.core.first(seq__10693_11463__$1);
var script_tag_11472 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10713_11471,(0),null);
var script_body_11473 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10713_11471,(1),null);
eval(script_body_11473);


var G__11474 = cljs.core.next(seq__10693_11463__$1);
var G__11475 = null;
var G__11476 = (0);
var G__11477 = (0);
seq__10693_11439 = G__11474;
chunk__10694_11440 = G__11475;
count__10695_11441 = G__11476;
i__10696_11442 = G__11477;
continue;
}
} else {
}
}
break;
}

return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (s__$1,p__10725){
var vec__10727 = p__10725;
var script_tag = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10727,(0),null);
var script_body = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10727,(1),null);
return clojure.string.replace(s__$1,script_tag,"");
}),s,scripts);
});
shadow.dom.str__GT_fragment = (function shadow$dom$str__GT_fragment(s){
var el = document.createElement("div");
(el.innerHTML = s);

return (new shadow.dom.NativeColl(goog.dom.childrenToNode_(document,el)));
});
shadow.dom.node_name = (function shadow$dom$node_name(el){
return shadow.dom.dom_node(el).nodeName;
});
shadow.dom.ancestor_by_class = (function shadow$dom$ancestor_by_class(el,cls){
return goog.dom.getAncestorByClass(shadow.dom.dom_node(el),cls);
});
shadow.dom.ancestor_by_tag = (function shadow$dom$ancestor_by_tag(var_args){
var G__10736 = arguments.length;
switch (G__10736) {
case 2:
return shadow.dom.ancestor_by_tag.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return shadow.dom.ancestor_by_tag.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.ancestor_by_tag.cljs$core$IFn$_invoke$arity$2 = (function (el,tag){
return goog.dom.getAncestorByTagNameAndClass(shadow.dom.dom_node(el),cljs.core.name(tag));
}));

(shadow.dom.ancestor_by_tag.cljs$core$IFn$_invoke$arity$3 = (function (el,tag,cls){
return goog.dom.getAncestorByTagNameAndClass(shadow.dom.dom_node(el),cljs.core.name(tag),cljs.core.name(cls));
}));

(shadow.dom.ancestor_by_tag.cljs$lang$maxFixedArity = 3);

shadow.dom.get_value = (function shadow$dom$get_value(dom){
return goog.dom.forms.getValue(shadow.dom.dom_node(dom));
});
shadow.dom.set_value = (function shadow$dom$set_value(dom,value){
return goog.dom.forms.setValue(shadow.dom.dom_node(dom),value);
});
shadow.dom.px = (function shadow$dom$px(value){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1((value | (0))),"px"].join('');
});
shadow.dom.pct = (function shadow$dom$pct(value){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(value),"%"].join('');
});
shadow.dom.remove_style_STAR_ = (function shadow$dom$remove_style_STAR_(el,style){
return el.style.removeProperty(cljs.core.name(style));
});
shadow.dom.remove_style = (function shadow$dom$remove_style(el,style){
var el__$1 = shadow.dom.dom_node(el);
return shadow.dom.remove_style_STAR_(el__$1,style);
});
shadow.dom.remove_styles = (function shadow$dom$remove_styles(el,style_keys){
var el__$1 = shadow.dom.dom_node(el);
var seq__10748 = cljs.core.seq(style_keys);
var chunk__10749 = null;
var count__10750 = (0);
var i__10751 = (0);
while(true){
if((i__10751 < count__10750)){
var it = chunk__10749.cljs$core$IIndexed$_nth$arity$2(null,i__10751);
shadow.dom.remove_style_STAR_(el__$1,it);


var G__11489 = seq__10748;
var G__11490 = chunk__10749;
var G__11491 = count__10750;
var G__11492 = (i__10751 + (1));
seq__10748 = G__11489;
chunk__10749 = G__11490;
count__10750 = G__11491;
i__10751 = G__11492;
continue;
} else {
var temp__5823__auto__ = cljs.core.seq(seq__10748);
if(temp__5823__auto__){
var seq__10748__$1 = temp__5823__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__10748__$1)){
var c__5548__auto__ = cljs.core.chunk_first(seq__10748__$1);
var G__11495 = cljs.core.chunk_rest(seq__10748__$1);
var G__11496 = c__5548__auto__;
var G__11497 = cljs.core.count(c__5548__auto__);
var G__11498 = (0);
seq__10748 = G__11495;
chunk__10749 = G__11496;
count__10750 = G__11497;
i__10751 = G__11498;
continue;
} else {
var it = cljs.core.first(seq__10748__$1);
shadow.dom.remove_style_STAR_(el__$1,it);


var G__11502 = cljs.core.next(seq__10748__$1);
var G__11503 = null;
var G__11504 = (0);
var G__11505 = (0);
seq__10748 = G__11502;
chunk__10749 = G__11503;
count__10750 = G__11504;
i__10751 = G__11505;
continue;
}
} else {
return null;
}
}
break;
}
});

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IKVReduce}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
shadow.dom.Coordinate = (function (x,y,__meta,__extmap,__hash){
this.x = x;
this.y = y;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2230716170;
this.cljs$lang$protocol_mask$partition1$ = 139264;
});
(shadow.dom.Coordinate.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__5323__auto__,k__5324__auto__){
var self__ = this;
var this__5323__auto____$1 = this;
return this__5323__auto____$1.cljs$core$ILookup$_lookup$arity$3(null,k__5324__auto__,null);
}));

(shadow.dom.Coordinate.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5325__auto__,k10764,else__5326__auto__){
var self__ = this;
var this__5325__auto____$1 = this;
var G__10775 = k10764;
var G__10775__$1 = (((G__10775 instanceof cljs.core.Keyword))?G__10775.fqn:null);
switch (G__10775__$1) {
case "x":
return self__.x;

break;
case "y":
return self__.y;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k10764,else__5326__auto__);

}
}));

(shadow.dom.Coordinate.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__5343__auto__,f__5344__auto__,init__5345__auto__){
var self__ = this;
var this__5343__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__5346__auto__,p__10776){
var vec__10777 = p__10776;
var k__5347__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10777,(0),null);
var v__5348__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10777,(1),null);
return (f__5344__auto__.cljs$core$IFn$_invoke$arity$3 ? f__5344__auto__.cljs$core$IFn$_invoke$arity$3(ret__5346__auto__,k__5347__auto__,v__5348__auto__) : f__5344__auto__.call(null,ret__5346__auto__,k__5347__auto__,v__5348__auto__));
}),init__5345__auto__,this__5343__auto____$1);
}));

(shadow.dom.Coordinate.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5338__auto__,writer__5339__auto__,opts__5340__auto__){
var self__ = this;
var this__5338__auto____$1 = this;
var pr_pair__5341__auto__ = (function (keyval__5342__auto__){
return cljs.core.pr_sequential_writer(writer__5339__auto__,cljs.core.pr_writer,""," ","",opts__5340__auto__,keyval__5342__auto__);
});
return cljs.core.pr_sequential_writer(writer__5339__auto__,pr_pair__5341__auto__,"#shadow.dom.Coordinate{",", ","}",opts__5340__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"x","x",2099068185),self__.x],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"y","y",-1757859776),self__.y],null))], null),self__.__extmap));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__10763){
var self__ = this;
var G__10763__$1 = this;
return (new cljs.core.RecordIter((0),G__10763__$1,2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"x","x",2099068185),new cljs.core.Keyword(null,"y","y",-1757859776)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__5321__auto__){
var self__ = this;
var this__5321__auto____$1 = this;
return self__.__meta;
}));

(shadow.dom.Coordinate.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__5318__auto__){
var self__ = this;
var this__5318__auto____$1 = this;
return (new shadow.dom.Coordinate(self__.x,self__.y,self__.__meta,self__.__extmap,self__.__hash));
}));

(shadow.dom.Coordinate.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__5327__auto__){
var self__ = this;
var this__5327__auto____$1 = this;
return (2 + cljs.core.count(self__.__extmap));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__5319__auto__){
var self__ = this;
var this__5319__auto____$1 = this;
var h__5134__auto__ = self__.__hash;
if((!((h__5134__auto__ == null)))){
return h__5134__auto__;
} else {
var h__5134__auto____$1 = (function (coll__5320__auto__){
return (145542109 ^ cljs.core.hash_unordered_coll(coll__5320__auto__));
})(this__5319__auto____$1);
(self__.__hash = h__5134__auto____$1);

return h__5134__auto____$1;
}
}));

(shadow.dom.Coordinate.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this10765,other10766){
var self__ = this;
var this10765__$1 = this;
return (((!((other10766 == null)))) && ((((this10765__$1.constructor === other10766.constructor)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this10765__$1.x,other10766.x)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this10765__$1.y,other10766.y)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this10765__$1.__extmap,other10766.__extmap)))))))));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__5333__auto__,k__5334__auto__){
var self__ = this;
var this__5333__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"y","y",-1757859776),null,new cljs.core.Keyword(null,"x","x",2099068185),null], null), null),k__5334__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core._with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__5333__auto____$1),self__.__meta),k__5334__auto__);
} else {
return (new shadow.dom.Coordinate(self__.x,self__.y,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__5334__auto__)),null));
}
}));

(shadow.dom.Coordinate.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this__5330__auto__,k10764){
var self__ = this;
var this__5330__auto____$1 = this;
var G__10800 = k10764;
var G__10800__$1 = (((G__10800 instanceof cljs.core.Keyword))?G__10800.fqn:null);
switch (G__10800__$1) {
case "x":
case "y":
return true;

break;
default:
return cljs.core.contains_QMARK_(self__.__extmap,k10764);

}
}));

(shadow.dom.Coordinate.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5331__auto__,k__5332__auto__,G__10763){
var self__ = this;
var this__5331__auto____$1 = this;
var pred__10803 = cljs.core.keyword_identical_QMARK_;
var expr__10804 = k__5332__auto__;
if(cljs.core.truth_((pred__10803.cljs$core$IFn$_invoke$arity$2 ? pred__10803.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"x","x",2099068185),expr__10804) : pred__10803.call(null,new cljs.core.Keyword(null,"x","x",2099068185),expr__10804)))){
return (new shadow.dom.Coordinate(G__10763,self__.y,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__10803.cljs$core$IFn$_invoke$arity$2 ? pred__10803.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"y","y",-1757859776),expr__10804) : pred__10803.call(null,new cljs.core.Keyword(null,"y","y",-1757859776),expr__10804)))){
return (new shadow.dom.Coordinate(self__.x,G__10763,self__.__meta,self__.__extmap,null));
} else {
return (new shadow.dom.Coordinate(self__.x,self__.y,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5332__auto__,G__10763),null));
}
}
}));

(shadow.dom.Coordinate.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5336__auto__){
var self__ = this;
var this__5336__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"x","x",2099068185),self__.x,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"y","y",-1757859776),self__.y,null))], null),self__.__extmap));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5322__auto__,G__10763){
var self__ = this;
var this__5322__auto____$1 = this;
return (new shadow.dom.Coordinate(self__.x,self__.y,G__10763,self__.__extmap,self__.__hash));
}));

(shadow.dom.Coordinate.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__5328__auto__,entry__5329__auto__){
var self__ = this;
var this__5328__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__5329__auto__)){
return this__5328__auto____$1.cljs$core$IAssociative$_assoc$arity$3(null,cljs.core._nth(entry__5329__auto__,(0)),cljs.core._nth(entry__5329__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__5328__auto____$1,entry__5329__auto__);
}
}));

(shadow.dom.Coordinate.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"x","x",-555367584,null),new cljs.core.Symbol(null,"y","y",-117328249,null)], null);
}));

(shadow.dom.Coordinate.cljs$lang$type = true);

(shadow.dom.Coordinate.cljs$lang$ctorPrSeq = (function (this__5369__auto__){
return (new cljs.core.List(null,"shadow.dom/Coordinate",null,(1),null));
}));

(shadow.dom.Coordinate.cljs$lang$ctorPrWriter = (function (this__5369__auto__,writer__5370__auto__){
return cljs.core._write(writer__5370__auto__,"shadow.dom/Coordinate");
}));

/**
 * Positional factory function for shadow.dom/Coordinate.
 */
shadow.dom.__GT_Coordinate = (function shadow$dom$__GT_Coordinate(x,y){
return (new shadow.dom.Coordinate(x,y,null,null,null));
});

/**
 * Factory function for shadow.dom/Coordinate, taking a map of keywords to field values.
 */
shadow.dom.map__GT_Coordinate = (function shadow$dom$map__GT_Coordinate(G__10770){
var extmap__5365__auto__ = (function (){var G__10813 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__10770,new cljs.core.Keyword(null,"x","x",2099068185),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"y","y",-1757859776)], 0));
if(cljs.core.record_QMARK_(G__10770)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__10813);
} else {
return G__10813;
}
})();
return (new shadow.dom.Coordinate(new cljs.core.Keyword(null,"x","x",2099068185).cljs$core$IFn$_invoke$arity$1(G__10770),new cljs.core.Keyword(null,"y","y",-1757859776).cljs$core$IFn$_invoke$arity$1(G__10770),null,cljs.core.not_empty(extmap__5365__auto__),null));
});

shadow.dom.get_position = (function shadow$dom$get_position(el){
var pos = goog.style.getPosition(shadow.dom.dom_node(el));
return shadow.dom.__GT_Coordinate(pos.x,pos.y);
});
shadow.dom.get_client_position = (function shadow$dom$get_client_position(el){
var pos = goog.style.getClientPosition(shadow.dom.dom_node(el));
return shadow.dom.__GT_Coordinate(pos.x,pos.y);
});
shadow.dom.get_page_offset = (function shadow$dom$get_page_offset(el){
var pos = goog.style.getPageOffset(shadow.dom.dom_node(el));
return shadow.dom.__GT_Coordinate(pos.x,pos.y);
});

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IKVReduce}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
shadow.dom.Size = (function (w,h,__meta,__extmap,__hash){
this.w = w;
this.h = h;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2230716170;
this.cljs$lang$protocol_mask$partition1$ = 139264;
});
(shadow.dom.Size.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__5323__auto__,k__5324__auto__){
var self__ = this;
var this__5323__auto____$1 = this;
return this__5323__auto____$1.cljs$core$ILookup$_lookup$arity$3(null,k__5324__auto__,null);
}));

(shadow.dom.Size.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5325__auto__,k10822,else__5326__auto__){
var self__ = this;
var this__5325__auto____$1 = this;
var G__10835 = k10822;
var G__10835__$1 = (((G__10835 instanceof cljs.core.Keyword))?G__10835.fqn:null);
switch (G__10835__$1) {
case "w":
return self__.w;

break;
case "h":
return self__.h;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k10822,else__5326__auto__);

}
}));

(shadow.dom.Size.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__5343__auto__,f__5344__auto__,init__5345__auto__){
var self__ = this;
var this__5343__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__5346__auto__,p__10839){
var vec__10841 = p__10839;
var k__5347__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10841,(0),null);
var v__5348__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10841,(1),null);
return (f__5344__auto__.cljs$core$IFn$_invoke$arity$3 ? f__5344__auto__.cljs$core$IFn$_invoke$arity$3(ret__5346__auto__,k__5347__auto__,v__5348__auto__) : f__5344__auto__.call(null,ret__5346__auto__,k__5347__auto__,v__5348__auto__));
}),init__5345__auto__,this__5343__auto____$1);
}));

(shadow.dom.Size.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5338__auto__,writer__5339__auto__,opts__5340__auto__){
var self__ = this;
var this__5338__auto____$1 = this;
var pr_pair__5341__auto__ = (function (keyval__5342__auto__){
return cljs.core.pr_sequential_writer(writer__5339__auto__,cljs.core.pr_writer,""," ","",opts__5340__auto__,keyval__5342__auto__);
});
return cljs.core.pr_sequential_writer(writer__5339__auto__,pr_pair__5341__auto__,"#shadow.dom.Size{",", ","}",opts__5340__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"w","w",354169001),self__.w],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"h","h",1109658740),self__.h],null))], null),self__.__extmap));
}));

(shadow.dom.Size.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__10821){
var self__ = this;
var G__10821__$1 = this;
return (new cljs.core.RecordIter((0),G__10821__$1,2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"w","w",354169001),new cljs.core.Keyword(null,"h","h",1109658740)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
}));

(shadow.dom.Size.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__5321__auto__){
var self__ = this;
var this__5321__auto____$1 = this;
return self__.__meta;
}));

(shadow.dom.Size.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__5318__auto__){
var self__ = this;
var this__5318__auto____$1 = this;
return (new shadow.dom.Size(self__.w,self__.h,self__.__meta,self__.__extmap,self__.__hash));
}));

(shadow.dom.Size.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__5327__auto__){
var self__ = this;
var this__5327__auto____$1 = this;
return (2 + cljs.core.count(self__.__extmap));
}));

(shadow.dom.Size.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__5319__auto__){
var self__ = this;
var this__5319__auto____$1 = this;
var h__5134__auto__ = self__.__hash;
if((!((h__5134__auto__ == null)))){
return h__5134__auto__;
} else {
var h__5134__auto____$1 = (function (coll__5320__auto__){
return (-1228019642 ^ cljs.core.hash_unordered_coll(coll__5320__auto__));
})(this__5319__auto____$1);
(self__.__hash = h__5134__auto____$1);

return h__5134__auto____$1;
}
}));

(shadow.dom.Size.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this10823,other10824){
var self__ = this;
var this10823__$1 = this;
return (((!((other10824 == null)))) && ((((this10823__$1.constructor === other10824.constructor)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this10823__$1.w,other10824.w)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this10823__$1.h,other10824.h)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this10823__$1.__extmap,other10824.__extmap)))))))));
}));

(shadow.dom.Size.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__5333__auto__,k__5334__auto__){
var self__ = this;
var this__5333__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"w","w",354169001),null,new cljs.core.Keyword(null,"h","h",1109658740),null], null), null),k__5334__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core._with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__5333__auto____$1),self__.__meta),k__5334__auto__);
} else {
return (new shadow.dom.Size(self__.w,self__.h,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__5334__auto__)),null));
}
}));

(shadow.dom.Size.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this__5330__auto__,k10822){
var self__ = this;
var this__5330__auto____$1 = this;
var G__10861 = k10822;
var G__10861__$1 = (((G__10861 instanceof cljs.core.Keyword))?G__10861.fqn:null);
switch (G__10861__$1) {
case "w":
case "h":
return true;

break;
default:
return cljs.core.contains_QMARK_(self__.__extmap,k10822);

}
}));

(shadow.dom.Size.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5331__auto__,k__5332__auto__,G__10821){
var self__ = this;
var this__5331__auto____$1 = this;
var pred__10862 = cljs.core.keyword_identical_QMARK_;
var expr__10863 = k__5332__auto__;
if(cljs.core.truth_((pred__10862.cljs$core$IFn$_invoke$arity$2 ? pred__10862.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"w","w",354169001),expr__10863) : pred__10862.call(null,new cljs.core.Keyword(null,"w","w",354169001),expr__10863)))){
return (new shadow.dom.Size(G__10821,self__.h,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__10862.cljs$core$IFn$_invoke$arity$2 ? pred__10862.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"h","h",1109658740),expr__10863) : pred__10862.call(null,new cljs.core.Keyword(null,"h","h",1109658740),expr__10863)))){
return (new shadow.dom.Size(self__.w,G__10821,self__.__meta,self__.__extmap,null));
} else {
return (new shadow.dom.Size(self__.w,self__.h,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5332__auto__,G__10821),null));
}
}
}));

(shadow.dom.Size.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5336__auto__){
var self__ = this;
var this__5336__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"w","w",354169001),self__.w,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"h","h",1109658740),self__.h,null))], null),self__.__extmap));
}));

(shadow.dom.Size.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5322__auto__,G__10821){
var self__ = this;
var this__5322__auto____$1 = this;
return (new shadow.dom.Size(self__.w,self__.h,G__10821,self__.__extmap,self__.__hash));
}));

(shadow.dom.Size.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__5328__auto__,entry__5329__auto__){
var self__ = this;
var this__5328__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__5329__auto__)){
return this__5328__auto____$1.cljs$core$IAssociative$_assoc$arity$3(null,cljs.core._nth(entry__5329__auto__,(0)),cljs.core._nth(entry__5329__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__5328__auto____$1,entry__5329__auto__);
}
}));

(shadow.dom.Size.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"w","w",1994700528,null),new cljs.core.Symbol(null,"h","h",-1544777029,null)], null);
}));

(shadow.dom.Size.cljs$lang$type = true);

(shadow.dom.Size.cljs$lang$ctorPrSeq = (function (this__5369__auto__){
return (new cljs.core.List(null,"shadow.dom/Size",null,(1),null));
}));

(shadow.dom.Size.cljs$lang$ctorPrWriter = (function (this__5369__auto__,writer__5370__auto__){
return cljs.core._write(writer__5370__auto__,"shadow.dom/Size");
}));

/**
 * Positional factory function for shadow.dom/Size.
 */
shadow.dom.__GT_Size = (function shadow$dom$__GT_Size(w,h){
return (new shadow.dom.Size(w,h,null,null,null));
});

/**
 * Factory function for shadow.dom/Size, taking a map of keywords to field values.
 */
shadow.dom.map__GT_Size = (function shadow$dom$map__GT_Size(G__10829){
var extmap__5365__auto__ = (function (){var G__10872 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__10829,new cljs.core.Keyword(null,"w","w",354169001),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"h","h",1109658740)], 0));
if(cljs.core.record_QMARK_(G__10829)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__10872);
} else {
return G__10872;
}
})();
return (new shadow.dom.Size(new cljs.core.Keyword(null,"w","w",354169001).cljs$core$IFn$_invoke$arity$1(G__10829),new cljs.core.Keyword(null,"h","h",1109658740).cljs$core$IFn$_invoke$arity$1(G__10829),null,cljs.core.not_empty(extmap__5365__auto__),null));
});

shadow.dom.size__GT_clj = (function shadow$dom$size__GT_clj(size){
return (new shadow.dom.Size(size.width,size.height,null,null,null));
});
shadow.dom.get_size = (function shadow$dom$get_size(el){
return shadow.dom.size__GT_clj(goog.style.getSize(shadow.dom.dom_node(el)));
});
shadow.dom.get_height = (function shadow$dom$get_height(el){
return shadow.dom.get_size(el).h;
});
shadow.dom.get_viewport_size = (function shadow$dom$get_viewport_size(){
return shadow.dom.size__GT_clj(goog.dom.getViewportSize());
});
shadow.dom.first_child = (function shadow$dom$first_child(el){
return (shadow.dom.dom_node(el).children[(0)]);
});
shadow.dom.select_option_values = (function shadow$dom$select_option_values(el){
var native$ = shadow.dom.dom_node(el);
var opts = (native$["options"]);
var a__5613__auto__ = opts;
var l__5614__auto__ = a__5613__auto__.length;
var i = (0);
var ret = cljs.core.PersistentVector.EMPTY;
while(true){
if((i < l__5614__auto__)){
var G__11613 = (i + (1));
var G__11614 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(ret,(opts[i]["value"]));
i = G__11613;
ret = G__11614;
continue;
} else {
return ret;
}
break;
}
});
shadow.dom.build_url = (function shadow$dom$build_url(path,query_params){
if(cljs.core.empty_QMARK_(query_params)){
return path;
} else {
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(path),"?",clojure.string.join.cljs$core$IFn$_invoke$arity$2("&",cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__10899){
var vec__10900 = p__10899;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10900,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10900,(1),null);
return [cljs.core.name(k),"=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(encodeURIComponent(cljs.core.str.cljs$core$IFn$_invoke$arity$1(v)))].join('');
}),query_params))].join('');
}
});
shadow.dom.redirect = (function shadow$dom$redirect(var_args){
var G__10907 = arguments.length;
switch (G__10907) {
case 1:
return shadow.dom.redirect.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.redirect.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.redirect.cljs$core$IFn$_invoke$arity$1 = (function (path){
return shadow.dom.redirect.cljs$core$IFn$_invoke$arity$2(path,cljs.core.PersistentArrayMap.EMPTY);
}));

(shadow.dom.redirect.cljs$core$IFn$_invoke$arity$2 = (function (path,query_params){
return (document["location"]["href"] = shadow.dom.build_url(path,query_params));
}));

(shadow.dom.redirect.cljs$lang$maxFixedArity = 2);

shadow.dom.reload_BANG_ = (function shadow$dom$reload_BANG_(){
return (document.location.href = document.location.href);
});
shadow.dom.tag_name = (function shadow$dom$tag_name(el){
var dom = shadow.dom.dom_node(el);
return dom.tagName;
});
shadow.dom.insert_after = (function shadow$dom$insert_after(ref,new$){
var new_node = shadow.dom.dom_node(new$);
goog.dom.insertSiblingAfter(new_node,shadow.dom.dom_node(ref));

return new_node;
});
shadow.dom.insert_before = (function shadow$dom$insert_before(ref,new$){
var new_node = shadow.dom.dom_node(new$);
goog.dom.insertSiblingBefore(new_node,shadow.dom.dom_node(ref));

return new_node;
});
shadow.dom.insert_first = (function shadow$dom$insert_first(ref,new$){
var temp__5821__auto__ = shadow.dom.dom_node(ref).firstChild;
if(cljs.core.truth_(temp__5821__auto__)){
var child = temp__5821__auto__;
return shadow.dom.insert_before(child,new$);
} else {
return shadow.dom.append.cljs$core$IFn$_invoke$arity$2(ref,new$);
}
});
shadow.dom.index_of = (function shadow$dom$index_of(el){
var el__$1 = shadow.dom.dom_node(el);
var i = (0);
while(true){
var ps = el__$1.previousSibling;
if((ps == null)){
return i;
} else {
var G__11618 = ps;
var G__11619 = (i + (1));
el__$1 = G__11618;
i = G__11619;
continue;
}
break;
}
});
shadow.dom.get_parent = (function shadow$dom$get_parent(el){
return goog.dom.getParentElement(shadow.dom.dom_node(el));
});
shadow.dom.parents = (function shadow$dom$parents(el){
var parent = shadow.dom.get_parent(el);
if(cljs.core.truth_(parent)){
return cljs.core.cons(parent,(new cljs.core.LazySeq(null,(function (){
return (shadow.dom.parents.cljs$core$IFn$_invoke$arity$1 ? shadow.dom.parents.cljs$core$IFn$_invoke$arity$1(parent) : shadow.dom.parents.call(null,parent));
}),null,null)));
} else {
return null;
}
});
shadow.dom.matches = (function shadow$dom$matches(el,sel){
return shadow.dom.dom_node(el).matches(sel);
});
shadow.dom.get_next_sibling = (function shadow$dom$get_next_sibling(el){
return goog.dom.getNextElementSibling(shadow.dom.dom_node(el));
});
shadow.dom.get_previous_sibling = (function shadow$dom$get_previous_sibling(el){
return goog.dom.getPreviousElementSibling(shadow.dom.dom_node(el));
});
shadow.dom.xmlns = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, ["svg","http://www.w3.org/2000/svg","xlink","http://www.w3.org/1999/xlink"], null));
shadow.dom.create_svg_node = (function shadow$dom$create_svg_node(tag_def,props){
var vec__10937 = shadow.dom.parse_tag(tag_def);
var tag_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10937,(0),null);
var tag_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10937,(1),null);
var tag_classes = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10937,(2),null);
var el = document.createElementNS("http://www.w3.org/2000/svg",tag_name);
if(cljs.core.truth_(tag_id)){
el.setAttribute("id",tag_id);
} else {
}

if(cljs.core.truth_(tag_classes)){
el.setAttribute("class",shadow.dom.merge_class_string(new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(props),tag_classes));
} else {
}

var seq__10942_11626 = cljs.core.seq(props);
var chunk__10943_11627 = null;
var count__10944_11628 = (0);
var i__10945_11629 = (0);
while(true){
if((i__10945_11629 < count__10944_11628)){
var vec__10957_11630 = chunk__10943_11627.cljs$core$IIndexed$_nth$arity$2(null,i__10945_11629);
var k_11631 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10957_11630,(0),null);
var v_11632 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10957_11630,(1),null);
el.setAttributeNS((function (){var temp__5823__auto__ = cljs.core.namespace(k_11631);
if(cljs.core.truth_(temp__5823__auto__)){
var ns = temp__5823__auto__;
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(shadow.dom.xmlns),ns);
} else {
return null;
}
})(),cljs.core.name(k_11631),v_11632);


var G__11634 = seq__10942_11626;
var G__11635 = chunk__10943_11627;
var G__11636 = count__10944_11628;
var G__11637 = (i__10945_11629 + (1));
seq__10942_11626 = G__11634;
chunk__10943_11627 = G__11635;
count__10944_11628 = G__11636;
i__10945_11629 = G__11637;
continue;
} else {
var temp__5823__auto___11638 = cljs.core.seq(seq__10942_11626);
if(temp__5823__auto___11638){
var seq__10942_11639__$1 = temp__5823__auto___11638;
if(cljs.core.chunked_seq_QMARK_(seq__10942_11639__$1)){
var c__5548__auto___11640 = cljs.core.chunk_first(seq__10942_11639__$1);
var G__11641 = cljs.core.chunk_rest(seq__10942_11639__$1);
var G__11642 = c__5548__auto___11640;
var G__11643 = cljs.core.count(c__5548__auto___11640);
var G__11644 = (0);
seq__10942_11626 = G__11641;
chunk__10943_11627 = G__11642;
count__10944_11628 = G__11643;
i__10945_11629 = G__11644;
continue;
} else {
var vec__10967_11646 = cljs.core.first(seq__10942_11639__$1);
var k_11648 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10967_11646,(0),null);
var v_11649 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10967_11646,(1),null);
el.setAttributeNS((function (){var temp__5823__auto____$1 = cljs.core.namespace(k_11648);
if(cljs.core.truth_(temp__5823__auto____$1)){
var ns = temp__5823__auto____$1;
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(shadow.dom.xmlns),ns);
} else {
return null;
}
})(),cljs.core.name(k_11648),v_11649);


var G__11653 = cljs.core.next(seq__10942_11639__$1);
var G__11654 = null;
var G__11655 = (0);
var G__11656 = (0);
seq__10942_11626 = G__11653;
chunk__10943_11627 = G__11654;
count__10944_11628 = G__11655;
i__10945_11629 = G__11656;
continue;
}
} else {
}
}
break;
}

return el;
});
shadow.dom.svg_node = (function shadow$dom$svg_node(el){
if((el == null)){
return null;
} else {
if((((!((el == null))))?((((false) || ((cljs.core.PROTOCOL_SENTINEL === el.shadow$dom$SVGElement$))))?true:false):false)){
return el.shadow$dom$SVGElement$_to_svg$arity$1(null);
} else {
return el;

}
}
});
shadow.dom.make_svg_node = (function shadow$dom$make_svg_node(structure){
var vec__10977 = shadow.dom.destructure_node(shadow.dom.create_svg_node,structure);
var node = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10977,(0),null);
var node_children = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10977,(1),null);
var seq__10981_11659 = cljs.core.seq(node_children);
var chunk__10983_11660 = null;
var count__10984_11661 = (0);
var i__10985_11662 = (0);
while(true){
if((i__10985_11662 < count__10984_11661)){
var child_struct_11663 = chunk__10983_11660.cljs$core$IIndexed$_nth$arity$2(null,i__10985_11662);
if((!((child_struct_11663 == null)))){
if(typeof child_struct_11663 === 'string'){
var text_11665 = (node["textContent"]);
(node["textContent"] = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(text_11665),child_struct_11663].join(''));
} else {
var children_11666 = shadow.dom.svg_node(child_struct_11663);
if(cljs.core.seq_QMARK_(children_11666)){
var seq__11017_11667 = cljs.core.seq(children_11666);
var chunk__11019_11668 = null;
var count__11020_11669 = (0);
var i__11021_11670 = (0);
while(true){
if((i__11021_11670 < count__11020_11669)){
var child_11671 = chunk__11019_11668.cljs$core$IIndexed$_nth$arity$2(null,i__11021_11670);
if(cljs.core.truth_(child_11671)){
node.appendChild(child_11671);


var G__11672 = seq__11017_11667;
var G__11673 = chunk__11019_11668;
var G__11674 = count__11020_11669;
var G__11675 = (i__11021_11670 + (1));
seq__11017_11667 = G__11672;
chunk__11019_11668 = G__11673;
count__11020_11669 = G__11674;
i__11021_11670 = G__11675;
continue;
} else {
var G__11676 = seq__11017_11667;
var G__11677 = chunk__11019_11668;
var G__11678 = count__11020_11669;
var G__11679 = (i__11021_11670 + (1));
seq__11017_11667 = G__11676;
chunk__11019_11668 = G__11677;
count__11020_11669 = G__11678;
i__11021_11670 = G__11679;
continue;
}
} else {
var temp__5823__auto___11680 = cljs.core.seq(seq__11017_11667);
if(temp__5823__auto___11680){
var seq__11017_11681__$1 = temp__5823__auto___11680;
if(cljs.core.chunked_seq_QMARK_(seq__11017_11681__$1)){
var c__5548__auto___11682 = cljs.core.chunk_first(seq__11017_11681__$1);
var G__11683 = cljs.core.chunk_rest(seq__11017_11681__$1);
var G__11684 = c__5548__auto___11682;
var G__11685 = cljs.core.count(c__5548__auto___11682);
var G__11686 = (0);
seq__11017_11667 = G__11683;
chunk__11019_11668 = G__11684;
count__11020_11669 = G__11685;
i__11021_11670 = G__11686;
continue;
} else {
var child_11687 = cljs.core.first(seq__11017_11681__$1);
if(cljs.core.truth_(child_11687)){
node.appendChild(child_11687);


var G__11688 = cljs.core.next(seq__11017_11681__$1);
var G__11689 = null;
var G__11690 = (0);
var G__11691 = (0);
seq__11017_11667 = G__11688;
chunk__11019_11668 = G__11689;
count__11020_11669 = G__11690;
i__11021_11670 = G__11691;
continue;
} else {
var G__11692 = cljs.core.next(seq__11017_11681__$1);
var G__11693 = null;
var G__11694 = (0);
var G__11695 = (0);
seq__11017_11667 = G__11692;
chunk__11019_11668 = G__11693;
count__11020_11669 = G__11694;
i__11021_11670 = G__11695;
continue;
}
}
} else {
}
}
break;
}
} else {
node.appendChild(children_11666);
}
}


var G__11744 = seq__10981_11659;
var G__11745 = chunk__10983_11660;
var G__11746 = count__10984_11661;
var G__11747 = (i__10985_11662 + (1));
seq__10981_11659 = G__11744;
chunk__10983_11660 = G__11745;
count__10984_11661 = G__11746;
i__10985_11662 = G__11747;
continue;
} else {
var G__11757 = seq__10981_11659;
var G__11758 = chunk__10983_11660;
var G__11759 = count__10984_11661;
var G__11760 = (i__10985_11662 + (1));
seq__10981_11659 = G__11757;
chunk__10983_11660 = G__11758;
count__10984_11661 = G__11759;
i__10985_11662 = G__11760;
continue;
}
} else {
var temp__5823__auto___11761 = cljs.core.seq(seq__10981_11659);
if(temp__5823__auto___11761){
var seq__10981_11762__$1 = temp__5823__auto___11761;
if(cljs.core.chunked_seq_QMARK_(seq__10981_11762__$1)){
var c__5548__auto___11763 = cljs.core.chunk_first(seq__10981_11762__$1);
var G__11765 = cljs.core.chunk_rest(seq__10981_11762__$1);
var G__11766 = c__5548__auto___11763;
var G__11767 = cljs.core.count(c__5548__auto___11763);
var G__11768 = (0);
seq__10981_11659 = G__11765;
chunk__10983_11660 = G__11766;
count__10984_11661 = G__11767;
i__10985_11662 = G__11768;
continue;
} else {
var child_struct_11769 = cljs.core.first(seq__10981_11762__$1);
if((!((child_struct_11769 == null)))){
if(typeof child_struct_11769 === 'string'){
var text_11771 = (node["textContent"]);
(node["textContent"] = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(text_11771),child_struct_11769].join(''));
} else {
var children_11772 = shadow.dom.svg_node(child_struct_11769);
if(cljs.core.seq_QMARK_(children_11772)){
var seq__11036_11773 = cljs.core.seq(children_11772);
var chunk__11038_11774 = null;
var count__11039_11775 = (0);
var i__11040_11776 = (0);
while(true){
if((i__11040_11776 < count__11039_11775)){
var child_11777 = chunk__11038_11774.cljs$core$IIndexed$_nth$arity$2(null,i__11040_11776);
if(cljs.core.truth_(child_11777)){
node.appendChild(child_11777);


var G__11778 = seq__11036_11773;
var G__11779 = chunk__11038_11774;
var G__11780 = count__11039_11775;
var G__11781 = (i__11040_11776 + (1));
seq__11036_11773 = G__11778;
chunk__11038_11774 = G__11779;
count__11039_11775 = G__11780;
i__11040_11776 = G__11781;
continue;
} else {
var G__11782 = seq__11036_11773;
var G__11783 = chunk__11038_11774;
var G__11784 = count__11039_11775;
var G__11785 = (i__11040_11776 + (1));
seq__11036_11773 = G__11782;
chunk__11038_11774 = G__11783;
count__11039_11775 = G__11784;
i__11040_11776 = G__11785;
continue;
}
} else {
var temp__5823__auto___11805__$1 = cljs.core.seq(seq__11036_11773);
if(temp__5823__auto___11805__$1){
var seq__11036_11814__$1 = temp__5823__auto___11805__$1;
if(cljs.core.chunked_seq_QMARK_(seq__11036_11814__$1)){
var c__5548__auto___11815 = cljs.core.chunk_first(seq__11036_11814__$1);
var G__11816 = cljs.core.chunk_rest(seq__11036_11814__$1);
var G__11817 = c__5548__auto___11815;
var G__11818 = cljs.core.count(c__5548__auto___11815);
var G__11819 = (0);
seq__11036_11773 = G__11816;
chunk__11038_11774 = G__11817;
count__11039_11775 = G__11818;
i__11040_11776 = G__11819;
continue;
} else {
var child_11820 = cljs.core.first(seq__11036_11814__$1);
if(cljs.core.truth_(child_11820)){
node.appendChild(child_11820);


var G__11821 = cljs.core.next(seq__11036_11814__$1);
var G__11822 = null;
var G__11823 = (0);
var G__11824 = (0);
seq__11036_11773 = G__11821;
chunk__11038_11774 = G__11822;
count__11039_11775 = G__11823;
i__11040_11776 = G__11824;
continue;
} else {
var G__11825 = cljs.core.next(seq__11036_11814__$1);
var G__11826 = null;
var G__11827 = (0);
var G__11828 = (0);
seq__11036_11773 = G__11825;
chunk__11038_11774 = G__11826;
count__11039_11775 = G__11827;
i__11040_11776 = G__11828;
continue;
}
}
} else {
}
}
break;
}
} else {
node.appendChild(children_11772);
}
}


var G__11829 = cljs.core.next(seq__10981_11762__$1);
var G__11830 = null;
var G__11831 = (0);
var G__11832 = (0);
seq__10981_11659 = G__11829;
chunk__10983_11660 = G__11830;
count__10984_11661 = G__11831;
i__10985_11662 = G__11832;
continue;
} else {
var G__11833 = cljs.core.next(seq__10981_11762__$1);
var G__11834 = null;
var G__11835 = (0);
var G__11836 = (0);
seq__10981_11659 = G__11833;
chunk__10983_11660 = G__11834;
count__10984_11661 = G__11835;
i__10985_11662 = G__11836;
continue;
}
}
} else {
}
}
break;
}

return node;
});
(shadow.dom.SVGElement["string"] = true);

(shadow.dom._to_svg["string"] = (function (this$){
if((this$ instanceof cljs.core.Keyword)){
return shadow.dom.make_svg_node(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [this$], null));
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("strings cannot be in svgs",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"this","this",-611633625),this$], null));
}
}));

(cljs.core.PersistentVector.prototype.shadow$dom$SVGElement$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.PersistentVector.prototype.shadow$dom$SVGElement$_to_svg$arity$1 = (function (this$){
var this$__$1 = this;
return shadow.dom.make_svg_node(this$__$1);
}));

(cljs.core.LazySeq.prototype.shadow$dom$SVGElement$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.LazySeq.prototype.shadow$dom$SVGElement$_to_svg$arity$1 = (function (this$){
var this$__$1 = this;
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(shadow.dom._to_svg,this$__$1);
}));

(shadow.dom.SVGElement["null"] = true);

(shadow.dom._to_svg["null"] = (function (_){
return null;
}));
shadow.dom.svg = (function shadow$dom$svg(var_args){
var args__5755__auto__ = [];
var len__5749__auto___11840 = arguments.length;
var i__5750__auto___11842 = (0);
while(true){
if((i__5750__auto___11842 < len__5749__auto___11840)){
args__5755__auto__.push((arguments[i__5750__auto___11842]));

var G__11843 = (i__5750__auto___11842 + (1));
i__5750__auto___11842 = G__11843;
continue;
} else {
}
break;
}

var argseq__5756__auto__ = ((((1) < args__5755__auto__.length))?(new cljs.core.IndexedSeq(args__5755__auto__.slice((1)),(0),null)):null);
return shadow.dom.svg.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5756__auto__);
});

(shadow.dom.svg.cljs$core$IFn$_invoke$arity$variadic = (function (attrs,children){
return shadow.dom._to_svg(cljs.core.vec(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"svg","svg",856789142),attrs], null),children)));
}));

(shadow.dom.svg.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(shadow.dom.svg.cljs$lang$applyTo = (function (seq11074){
var G__11075 = cljs.core.first(seq11074);
var seq11074__$1 = cljs.core.next(seq11074);
var self__5734__auto__ = this;
return self__5734__auto__.cljs$core$IFn$_invoke$arity$variadic(G__11075,seq11074__$1);
}));


//# sourceMappingURL=shadow.dom.js.map
