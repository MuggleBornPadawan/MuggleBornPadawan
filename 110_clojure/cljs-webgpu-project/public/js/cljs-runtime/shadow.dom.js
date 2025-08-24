goog.provide('shadow.dom');
shadow.dom.transition_supported_QMARK_ = true;

/**
 * @interface
 */
shadow.dom.IElement = function(){};

var shadow$dom$IElement$_to_dom$dyn_14064 = (function (this$){
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
return shadow$dom$IElement$_to_dom$dyn_14064(this$);
}
});


/**
 * @interface
 */
shadow.dom.SVGElement = function(){};

var shadow$dom$SVGElement$_to_svg$dyn_14075 = (function (this$){
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
return shadow$dom$SVGElement$_to_svg$dyn_14075(this$);
}
});

shadow.dom.lazy_native_coll_seq = (function shadow$dom$lazy_native_coll_seq(coll,idx){
if((idx < coll.length)){
return (new cljs.core.LazySeq(null,(function (){
return cljs.core.cons((coll[idx]),(function (){var G__11759 = coll;
var G__11760 = (idx + (1));
return (shadow.dom.lazy_native_coll_seq.cljs$core$IFn$_invoke$arity$2 ? shadow.dom.lazy_native_coll_seq.cljs$core$IFn$_invoke$arity$2(G__11759,G__11760) : shadow.dom.lazy_native_coll_seq.call(null,G__11759,G__11760));
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
var G__11779 = arguments.length;
switch (G__11779) {
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
var G__11781 = arguments.length;
switch (G__11781) {
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
var G__11785 = arguments.length;
switch (G__11785) {
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
var G__11791 = arguments.length;
switch (G__11791) {
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
var G__11810 = arguments.length;
switch (G__11810) {
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
var G__11825 = arguments.length;
switch (G__11825) {
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
}catch (e11838){if((e11838 instanceof Object)){
var e = e11838;
return console.log("didnt support attachEvent",el,e);
} else {
throw e11838;

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
var seq__11849 = cljs.core.seq(shadow.dom.query.cljs$core$IFn$_invoke$arity$2(selector,root_el));
var chunk__11850 = null;
var count__11851 = (0);
var i__11852 = (0);
while(true){
if((i__11852 < count__11851)){
var el = chunk__11850.cljs$core$IIndexed$_nth$arity$2(null,i__11852);
var handler_14125__$1 = ((function (seq__11849,chunk__11850,count__11851,i__11852,el){
return (function (e){
return (handler.cljs$core$IFn$_invoke$arity$2 ? handler.cljs$core$IFn$_invoke$arity$2(e,el) : handler.call(null,e,el));
});})(seq__11849,chunk__11850,count__11851,i__11852,el))
;
shadow.dom.dom_listen(el,cljs.core.name(ev),handler_14125__$1);


var G__14126 = seq__11849;
var G__14127 = chunk__11850;
var G__14128 = count__11851;
var G__14129 = (i__11852 + (1));
seq__11849 = G__14126;
chunk__11850 = G__14127;
count__11851 = G__14128;
i__11852 = G__14129;
continue;
} else {
var temp__5823__auto__ = cljs.core.seq(seq__11849);
if(temp__5823__auto__){
var seq__11849__$1 = temp__5823__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__11849__$1)){
var c__5548__auto__ = cljs.core.chunk_first(seq__11849__$1);
var G__14133 = cljs.core.chunk_rest(seq__11849__$1);
var G__14134 = c__5548__auto__;
var G__14135 = cljs.core.count(c__5548__auto__);
var G__14136 = (0);
seq__11849 = G__14133;
chunk__11850 = G__14134;
count__11851 = G__14135;
i__11852 = G__14136;
continue;
} else {
var el = cljs.core.first(seq__11849__$1);
var handler_14140__$1 = ((function (seq__11849,chunk__11850,count__11851,i__11852,el,seq__11849__$1,temp__5823__auto__){
return (function (e){
return (handler.cljs$core$IFn$_invoke$arity$2 ? handler.cljs$core$IFn$_invoke$arity$2(e,el) : handler.call(null,e,el));
});})(seq__11849,chunk__11850,count__11851,i__11852,el,seq__11849__$1,temp__5823__auto__))
;
shadow.dom.dom_listen(el,cljs.core.name(ev),handler_14140__$1);


var G__14141 = cljs.core.next(seq__11849__$1);
var G__14142 = null;
var G__14143 = (0);
var G__14144 = (0);
seq__11849 = G__14141;
chunk__11850 = G__14142;
count__11851 = G__14143;
i__11852 = G__14144;
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
var G__11868 = arguments.length;
switch (G__11868) {
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
var seq__11888 = cljs.core.seq(events);
var chunk__11889 = null;
var count__11890 = (0);
var i__11891 = (0);
while(true){
if((i__11891 < count__11890)){
var vec__11932 = chunk__11889.cljs$core$IIndexed$_nth$arity$2(null,i__11891);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11932,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11932,(1),null);
shadow.dom.on.cljs$core$IFn$_invoke$arity$3(el,k,v);


var G__14149 = seq__11888;
var G__14150 = chunk__11889;
var G__14151 = count__11890;
var G__14152 = (i__11891 + (1));
seq__11888 = G__14149;
chunk__11889 = G__14150;
count__11890 = G__14151;
i__11891 = G__14152;
continue;
} else {
var temp__5823__auto__ = cljs.core.seq(seq__11888);
if(temp__5823__auto__){
var seq__11888__$1 = temp__5823__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__11888__$1)){
var c__5548__auto__ = cljs.core.chunk_first(seq__11888__$1);
var G__14153 = cljs.core.chunk_rest(seq__11888__$1);
var G__14154 = c__5548__auto__;
var G__14155 = cljs.core.count(c__5548__auto__);
var G__14156 = (0);
seq__11888 = G__14153;
chunk__11889 = G__14154;
count__11890 = G__14155;
i__11891 = G__14156;
continue;
} else {
var vec__11936 = cljs.core.first(seq__11888__$1);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11936,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11936,(1),null);
shadow.dom.on.cljs$core$IFn$_invoke$arity$3(el,k,v);


var G__14157 = cljs.core.next(seq__11888__$1);
var G__14158 = null;
var G__14159 = (0);
var G__14160 = (0);
seq__11888 = G__14157;
chunk__11889 = G__14158;
count__11890 = G__14159;
i__11891 = G__14160;
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
var seq__11943 = cljs.core.seq(styles);
var chunk__11944 = null;
var count__11945 = (0);
var i__11946 = (0);
while(true){
if((i__11946 < count__11945)){
var vec__11976 = chunk__11944.cljs$core$IIndexed$_nth$arity$2(null,i__11946);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11976,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11976,(1),null);
goog.style.setStyle(dom,cljs.core.name(k),(((v == null))?"":v));


var G__14164 = seq__11943;
var G__14165 = chunk__11944;
var G__14166 = count__11945;
var G__14167 = (i__11946 + (1));
seq__11943 = G__14164;
chunk__11944 = G__14165;
count__11945 = G__14166;
i__11946 = G__14167;
continue;
} else {
var temp__5823__auto__ = cljs.core.seq(seq__11943);
if(temp__5823__auto__){
var seq__11943__$1 = temp__5823__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__11943__$1)){
var c__5548__auto__ = cljs.core.chunk_first(seq__11943__$1);
var G__14168 = cljs.core.chunk_rest(seq__11943__$1);
var G__14169 = c__5548__auto__;
var G__14170 = cljs.core.count(c__5548__auto__);
var G__14171 = (0);
seq__11943 = G__14168;
chunk__11944 = G__14169;
count__11945 = G__14170;
i__11946 = G__14171;
continue;
} else {
var vec__11988 = cljs.core.first(seq__11943__$1);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11988,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11988,(1),null);
goog.style.setStyle(dom,cljs.core.name(k),(((v == null))?"":v));


var G__14172 = cljs.core.next(seq__11943__$1);
var G__14173 = null;
var G__14174 = (0);
var G__14175 = (0);
seq__11943 = G__14172;
chunk__11944 = G__14173;
count__11945 = G__14174;
i__11946 = G__14175;
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
var G__11997_14176 = key;
var G__11997_14177__$1 = (((G__11997_14176 instanceof cljs.core.Keyword))?G__11997_14176.fqn:null);
switch (G__11997_14177__$1) {
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
var ks_14183 = cljs.core.name(key);
if(cljs.core.truth_((function (){var or__5025__auto__ = goog.string.startsWith(ks_14183,"data-");
if(cljs.core.truth_(or__5025__auto__)){
return or__5025__auto__;
} else {
return goog.string.startsWith(ks_14183,"aria-");
}
})())){
el.setAttribute(ks_14183,value);
} else {
(el[ks_14183] = value);
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
shadow.dom.create_dom_node = (function shadow$dom$create_dom_node(tag_def,p__12015){
var map__12016 = p__12015;
var map__12016__$1 = cljs.core.__destructure_map(map__12016);
var props = map__12016__$1;
var class$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12016__$1,new cljs.core.Keyword(null,"class","class",-2030961996));
var tag_props = ({});
var vec__12018 = shadow.dom.parse_tag(tag_def);
var tag_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12018,(0),null);
var tag_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12018,(1),null);
var tag_classes = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12018,(2),null);
if(cljs.core.truth_(tag_id)){
(tag_props["id"] = tag_id);
} else {
}

if(cljs.core.truth_(tag_classes)){
(tag_props["class"] = shadow.dom.merge_class_string(class$,tag_classes));
} else {
}

var G__12022 = goog.dom.createDom(tag_name,tag_props);
shadow.dom.set_attrs(G__12022,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(props,new cljs.core.Keyword(null,"class","class",-2030961996)));

return G__12022;
});
shadow.dom.append = (function shadow$dom$append(var_args){
var G__12025 = arguments.length;
switch (G__12025) {
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

shadow.dom.destructure_node = (function shadow$dom$destructure_node(create_fn,p__12032){
var vec__12033 = p__12032;
var seq__12034 = cljs.core.seq(vec__12033);
var first__12035 = cljs.core.first(seq__12034);
var seq__12034__$1 = cljs.core.next(seq__12034);
var nn = first__12035;
var first__12035__$1 = cljs.core.first(seq__12034__$1);
var seq__12034__$2 = cljs.core.next(seq__12034__$1);
var np = first__12035__$1;
var nc = seq__12034__$2;
var node = vec__12033;
if((nn instanceof cljs.core.Keyword)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("invalid dom node",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"node","node",581201198),node], null));
}

if((((np == null)) && ((nc == null)))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__12038 = nn;
var G__12039 = cljs.core.PersistentArrayMap.EMPTY;
return (create_fn.cljs$core$IFn$_invoke$arity$2 ? create_fn.cljs$core$IFn$_invoke$arity$2(G__12038,G__12039) : create_fn.call(null,G__12038,G__12039));
})(),cljs.core.List.EMPTY], null);
} else {
if(cljs.core.map_QMARK_(np)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(create_fn.cljs$core$IFn$_invoke$arity$2 ? create_fn.cljs$core$IFn$_invoke$arity$2(nn,np) : create_fn.call(null,nn,np)),nc], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__12044 = nn;
var G__12045 = cljs.core.PersistentArrayMap.EMPTY;
return (create_fn.cljs$core$IFn$_invoke$arity$2 ? create_fn.cljs$core$IFn$_invoke$arity$2(G__12044,G__12045) : create_fn.call(null,G__12044,G__12045));
})(),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(nc,np)], null);

}
}
});
shadow.dom.make_dom_node = (function shadow$dom$make_dom_node(structure){
var vec__12047 = shadow.dom.destructure_node(shadow.dom.create_dom_node,structure);
var node = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12047,(0),null);
var node_children = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12047,(1),null);
var seq__12054_14189 = cljs.core.seq(node_children);
var chunk__12055_14190 = null;
var count__12056_14191 = (0);
var i__12057_14192 = (0);
while(true){
if((i__12057_14192 < count__12056_14191)){
var child_struct_14193 = chunk__12055_14190.cljs$core$IIndexed$_nth$arity$2(null,i__12057_14192);
var children_14194 = shadow.dom.dom_node(child_struct_14193);
if(cljs.core.seq_QMARK_(children_14194)){
var seq__12159_14195 = cljs.core.seq(cljs.core.map.cljs$core$IFn$_invoke$arity$2(shadow.dom.dom_node,children_14194));
var chunk__12161_14196 = null;
var count__12162_14197 = (0);
var i__12163_14198 = (0);
while(true){
if((i__12163_14198 < count__12162_14197)){
var child_14199 = chunk__12161_14196.cljs$core$IIndexed$_nth$arity$2(null,i__12163_14198);
if(cljs.core.truth_(child_14199)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_14199);


var G__14200 = seq__12159_14195;
var G__14201 = chunk__12161_14196;
var G__14202 = count__12162_14197;
var G__14203 = (i__12163_14198 + (1));
seq__12159_14195 = G__14200;
chunk__12161_14196 = G__14201;
count__12162_14197 = G__14202;
i__12163_14198 = G__14203;
continue;
} else {
var G__14205 = seq__12159_14195;
var G__14206 = chunk__12161_14196;
var G__14207 = count__12162_14197;
var G__14208 = (i__12163_14198 + (1));
seq__12159_14195 = G__14205;
chunk__12161_14196 = G__14206;
count__12162_14197 = G__14207;
i__12163_14198 = G__14208;
continue;
}
} else {
var temp__5823__auto___14209 = cljs.core.seq(seq__12159_14195);
if(temp__5823__auto___14209){
var seq__12159_14210__$1 = temp__5823__auto___14209;
if(cljs.core.chunked_seq_QMARK_(seq__12159_14210__$1)){
var c__5548__auto___14211 = cljs.core.chunk_first(seq__12159_14210__$1);
var G__14212 = cljs.core.chunk_rest(seq__12159_14210__$1);
var G__14213 = c__5548__auto___14211;
var G__14214 = cljs.core.count(c__5548__auto___14211);
var G__14215 = (0);
seq__12159_14195 = G__14212;
chunk__12161_14196 = G__14213;
count__12162_14197 = G__14214;
i__12163_14198 = G__14215;
continue;
} else {
var child_14216 = cljs.core.first(seq__12159_14210__$1);
if(cljs.core.truth_(child_14216)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_14216);


var G__14217 = cljs.core.next(seq__12159_14210__$1);
var G__14218 = null;
var G__14219 = (0);
var G__14220 = (0);
seq__12159_14195 = G__14217;
chunk__12161_14196 = G__14218;
count__12162_14197 = G__14219;
i__12163_14198 = G__14220;
continue;
} else {
var G__14221 = cljs.core.next(seq__12159_14210__$1);
var G__14222 = null;
var G__14223 = (0);
var G__14224 = (0);
seq__12159_14195 = G__14221;
chunk__12161_14196 = G__14222;
count__12162_14197 = G__14223;
i__12163_14198 = G__14224;
continue;
}
}
} else {
}
}
break;
}
} else {
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,children_14194);
}


var G__14225 = seq__12054_14189;
var G__14226 = chunk__12055_14190;
var G__14227 = count__12056_14191;
var G__14228 = (i__12057_14192 + (1));
seq__12054_14189 = G__14225;
chunk__12055_14190 = G__14226;
count__12056_14191 = G__14227;
i__12057_14192 = G__14228;
continue;
} else {
var temp__5823__auto___14229 = cljs.core.seq(seq__12054_14189);
if(temp__5823__auto___14229){
var seq__12054_14230__$1 = temp__5823__auto___14229;
if(cljs.core.chunked_seq_QMARK_(seq__12054_14230__$1)){
var c__5548__auto___14231 = cljs.core.chunk_first(seq__12054_14230__$1);
var G__14232 = cljs.core.chunk_rest(seq__12054_14230__$1);
var G__14233 = c__5548__auto___14231;
var G__14234 = cljs.core.count(c__5548__auto___14231);
var G__14235 = (0);
seq__12054_14189 = G__14232;
chunk__12055_14190 = G__14233;
count__12056_14191 = G__14234;
i__12057_14192 = G__14235;
continue;
} else {
var child_struct_14236 = cljs.core.first(seq__12054_14230__$1);
var children_14237 = shadow.dom.dom_node(child_struct_14236);
if(cljs.core.seq_QMARK_(children_14237)){
var seq__12243_14238 = cljs.core.seq(cljs.core.map.cljs$core$IFn$_invoke$arity$2(shadow.dom.dom_node,children_14237));
var chunk__12245_14239 = null;
var count__12246_14240 = (0);
var i__12247_14241 = (0);
while(true){
if((i__12247_14241 < count__12246_14240)){
var child_14242 = chunk__12245_14239.cljs$core$IIndexed$_nth$arity$2(null,i__12247_14241);
if(cljs.core.truth_(child_14242)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_14242);


var G__14243 = seq__12243_14238;
var G__14244 = chunk__12245_14239;
var G__14245 = count__12246_14240;
var G__14246 = (i__12247_14241 + (1));
seq__12243_14238 = G__14243;
chunk__12245_14239 = G__14244;
count__12246_14240 = G__14245;
i__12247_14241 = G__14246;
continue;
} else {
var G__14247 = seq__12243_14238;
var G__14248 = chunk__12245_14239;
var G__14249 = count__12246_14240;
var G__14250 = (i__12247_14241 + (1));
seq__12243_14238 = G__14247;
chunk__12245_14239 = G__14248;
count__12246_14240 = G__14249;
i__12247_14241 = G__14250;
continue;
}
} else {
var temp__5823__auto___14251__$1 = cljs.core.seq(seq__12243_14238);
if(temp__5823__auto___14251__$1){
var seq__12243_14252__$1 = temp__5823__auto___14251__$1;
if(cljs.core.chunked_seq_QMARK_(seq__12243_14252__$1)){
var c__5548__auto___14253 = cljs.core.chunk_first(seq__12243_14252__$1);
var G__14254 = cljs.core.chunk_rest(seq__12243_14252__$1);
var G__14255 = c__5548__auto___14253;
var G__14256 = cljs.core.count(c__5548__auto___14253);
var G__14257 = (0);
seq__12243_14238 = G__14254;
chunk__12245_14239 = G__14255;
count__12246_14240 = G__14256;
i__12247_14241 = G__14257;
continue;
} else {
var child_14258 = cljs.core.first(seq__12243_14252__$1);
if(cljs.core.truth_(child_14258)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_14258);


var G__14259 = cljs.core.next(seq__12243_14252__$1);
var G__14260 = null;
var G__14261 = (0);
var G__14262 = (0);
seq__12243_14238 = G__14259;
chunk__12245_14239 = G__14260;
count__12246_14240 = G__14261;
i__12247_14241 = G__14262;
continue;
} else {
var G__14263 = cljs.core.next(seq__12243_14252__$1);
var G__14264 = null;
var G__14265 = (0);
var G__14266 = (0);
seq__12243_14238 = G__14263;
chunk__12245_14239 = G__14264;
count__12246_14240 = G__14265;
i__12247_14241 = G__14266;
continue;
}
}
} else {
}
}
break;
}
} else {
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,children_14237);
}


var G__14267 = cljs.core.next(seq__12054_14230__$1);
var G__14268 = null;
var G__14269 = (0);
var G__14270 = (0);
seq__12054_14189 = G__14267;
chunk__12055_14190 = G__14268;
count__12056_14191 = G__14269;
i__12057_14192 = G__14270;
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
var seq__12405 = cljs.core.seq(node);
var chunk__12406 = null;
var count__12407 = (0);
var i__12408 = (0);
while(true){
if((i__12408 < count__12407)){
var n = chunk__12406.cljs$core$IIndexed$_nth$arity$2(null,i__12408);
(shadow.dom.remove.cljs$core$IFn$_invoke$arity$1 ? shadow.dom.remove.cljs$core$IFn$_invoke$arity$1(n) : shadow.dom.remove.call(null,n));


var G__14271 = seq__12405;
var G__14272 = chunk__12406;
var G__14273 = count__12407;
var G__14274 = (i__12408 + (1));
seq__12405 = G__14271;
chunk__12406 = G__14272;
count__12407 = G__14273;
i__12408 = G__14274;
continue;
} else {
var temp__5823__auto__ = cljs.core.seq(seq__12405);
if(temp__5823__auto__){
var seq__12405__$1 = temp__5823__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__12405__$1)){
var c__5548__auto__ = cljs.core.chunk_first(seq__12405__$1);
var G__14276 = cljs.core.chunk_rest(seq__12405__$1);
var G__14277 = c__5548__auto__;
var G__14278 = cljs.core.count(c__5548__auto__);
var G__14279 = (0);
seq__12405 = G__14276;
chunk__12406 = G__14277;
count__12407 = G__14278;
i__12408 = G__14279;
continue;
} else {
var n = cljs.core.first(seq__12405__$1);
(shadow.dom.remove.cljs$core$IFn$_invoke$arity$1 ? shadow.dom.remove.cljs$core$IFn$_invoke$arity$1(n) : shadow.dom.remove.call(null,n));


var G__14280 = cljs.core.next(seq__12405__$1);
var G__14281 = null;
var G__14282 = (0);
var G__14283 = (0);
seq__12405 = G__14280;
chunk__12406 = G__14281;
count__12407 = G__14282;
i__12408 = G__14283;
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
var G__12464 = arguments.length;
switch (G__12464) {
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
var G__12504 = arguments.length;
switch (G__12504) {
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
var G__12533 = arguments.length;
switch (G__12533) {
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
var len__5749__auto___14293 = arguments.length;
var i__5750__auto___14294 = (0);
while(true){
if((i__5750__auto___14294 < len__5749__auto___14293)){
args__5755__auto__.push((arguments[i__5750__auto___14294]));

var G__14295 = (i__5750__auto___14294 + (1));
i__5750__auto___14294 = G__14295;
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
var seq__12657_14297 = cljs.core.seq(nodes);
var chunk__12659_14298 = null;
var count__12660_14299 = (0);
var i__12661_14300 = (0);
while(true){
if((i__12661_14300 < count__12660_14299)){
var node_14302 = chunk__12659_14298.cljs$core$IIndexed$_nth$arity$2(null,i__12661_14300);
fragment.appendChild(shadow.dom._to_dom(node_14302));


var G__14304 = seq__12657_14297;
var G__14305 = chunk__12659_14298;
var G__14306 = count__12660_14299;
var G__14307 = (i__12661_14300 + (1));
seq__12657_14297 = G__14304;
chunk__12659_14298 = G__14305;
count__12660_14299 = G__14306;
i__12661_14300 = G__14307;
continue;
} else {
var temp__5823__auto___14308 = cljs.core.seq(seq__12657_14297);
if(temp__5823__auto___14308){
var seq__12657_14309__$1 = temp__5823__auto___14308;
if(cljs.core.chunked_seq_QMARK_(seq__12657_14309__$1)){
var c__5548__auto___14310 = cljs.core.chunk_first(seq__12657_14309__$1);
var G__14311 = cljs.core.chunk_rest(seq__12657_14309__$1);
var G__14312 = c__5548__auto___14310;
var G__14313 = cljs.core.count(c__5548__auto___14310);
var G__14314 = (0);
seq__12657_14297 = G__14311;
chunk__12659_14298 = G__14312;
count__12660_14299 = G__14313;
i__12661_14300 = G__14314;
continue;
} else {
var node_14315 = cljs.core.first(seq__12657_14309__$1);
fragment.appendChild(shadow.dom._to_dom(node_14315));


var G__14316 = cljs.core.next(seq__12657_14309__$1);
var G__14317 = null;
var G__14318 = (0);
var G__14319 = (0);
seq__12657_14297 = G__14316;
chunk__12659_14298 = G__14317;
count__12660_14299 = G__14318;
i__12661_14300 = G__14319;
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
(shadow.dom.fragment.cljs$lang$applyTo = (function (seq12618){
var self__5735__auto__ = this;
return self__5735__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq12618));
}));

/**
 * given a html string, eval all <script> tags and return the html without the scripts
 * don't do this for everything, only content you trust.
 */
shadow.dom.eval_scripts = (function shadow$dom$eval_scripts(s){
var scripts = cljs.core.re_seq(/<script[^>]*?>(.+?)<\/script>/,s);
var seq__12698_14320 = cljs.core.seq(scripts);
var chunk__12699_14321 = null;
var count__12700_14322 = (0);
var i__12701_14323 = (0);
while(true){
if((i__12701_14323 < count__12700_14322)){
var vec__12725_14324 = chunk__12699_14321.cljs$core$IIndexed$_nth$arity$2(null,i__12701_14323);
var script_tag_14325 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12725_14324,(0),null);
var script_body_14326 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12725_14324,(1),null);
eval(script_body_14326);


var G__14327 = seq__12698_14320;
var G__14328 = chunk__12699_14321;
var G__14329 = count__12700_14322;
var G__14330 = (i__12701_14323 + (1));
seq__12698_14320 = G__14327;
chunk__12699_14321 = G__14328;
count__12700_14322 = G__14329;
i__12701_14323 = G__14330;
continue;
} else {
var temp__5823__auto___14331 = cljs.core.seq(seq__12698_14320);
if(temp__5823__auto___14331){
var seq__12698_14332__$1 = temp__5823__auto___14331;
if(cljs.core.chunked_seq_QMARK_(seq__12698_14332__$1)){
var c__5548__auto___14333 = cljs.core.chunk_first(seq__12698_14332__$1);
var G__14334 = cljs.core.chunk_rest(seq__12698_14332__$1);
var G__14335 = c__5548__auto___14333;
var G__14336 = cljs.core.count(c__5548__auto___14333);
var G__14337 = (0);
seq__12698_14320 = G__14334;
chunk__12699_14321 = G__14335;
count__12700_14322 = G__14336;
i__12701_14323 = G__14337;
continue;
} else {
var vec__12737_14338 = cljs.core.first(seq__12698_14332__$1);
var script_tag_14339 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12737_14338,(0),null);
var script_body_14340 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12737_14338,(1),null);
eval(script_body_14340);


var G__14341 = cljs.core.next(seq__12698_14332__$1);
var G__14342 = null;
var G__14343 = (0);
var G__14344 = (0);
seq__12698_14320 = G__14341;
chunk__12699_14321 = G__14342;
count__12700_14322 = G__14343;
i__12701_14323 = G__14344;
continue;
}
} else {
}
}
break;
}

return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (s__$1,p__12742){
var vec__12743 = p__12742;
var script_tag = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12743,(0),null);
var script_body = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12743,(1),null);
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
var G__12818 = arguments.length;
switch (G__12818) {
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
var seq__12876 = cljs.core.seq(style_keys);
var chunk__12877 = null;
var count__12878 = (0);
var i__12879 = (0);
while(true){
if((i__12879 < count__12878)){
var it = chunk__12877.cljs$core$IIndexed$_nth$arity$2(null,i__12879);
shadow.dom.remove_style_STAR_(el__$1,it);


var G__14346 = seq__12876;
var G__14347 = chunk__12877;
var G__14348 = count__12878;
var G__14349 = (i__12879 + (1));
seq__12876 = G__14346;
chunk__12877 = G__14347;
count__12878 = G__14348;
i__12879 = G__14349;
continue;
} else {
var temp__5823__auto__ = cljs.core.seq(seq__12876);
if(temp__5823__auto__){
var seq__12876__$1 = temp__5823__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__12876__$1)){
var c__5548__auto__ = cljs.core.chunk_first(seq__12876__$1);
var G__14350 = cljs.core.chunk_rest(seq__12876__$1);
var G__14351 = c__5548__auto__;
var G__14352 = cljs.core.count(c__5548__auto__);
var G__14353 = (0);
seq__12876 = G__14350;
chunk__12877 = G__14351;
count__12878 = G__14352;
i__12879 = G__14353;
continue;
} else {
var it = cljs.core.first(seq__12876__$1);
shadow.dom.remove_style_STAR_(el__$1,it);


var G__14354 = cljs.core.next(seq__12876__$1);
var G__14355 = null;
var G__14356 = (0);
var G__14357 = (0);
seq__12876 = G__14354;
chunk__12877 = G__14355;
count__12878 = G__14356;
i__12879 = G__14357;
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

(shadow.dom.Coordinate.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5325__auto__,k12911,else__5326__auto__){
var self__ = this;
var this__5325__auto____$1 = this;
var G__12943 = k12911;
var G__12943__$1 = (((G__12943 instanceof cljs.core.Keyword))?G__12943.fqn:null);
switch (G__12943__$1) {
case "x":
return self__.x;

break;
case "y":
return self__.y;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k12911,else__5326__auto__);

}
}));

(shadow.dom.Coordinate.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__5343__auto__,f__5344__auto__,init__5345__auto__){
var self__ = this;
var this__5343__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__5346__auto__,p__12949){
var vec__12950 = p__12949;
var k__5347__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12950,(0),null);
var v__5348__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12950,(1),null);
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

(shadow.dom.Coordinate.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__12910){
var self__ = this;
var G__12910__$1 = this;
return (new cljs.core.RecordIter((0),G__12910__$1,2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"x","x",2099068185),new cljs.core.Keyword(null,"y","y",-1757859776)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
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

(shadow.dom.Coordinate.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this12912,other12913){
var self__ = this;
var this12912__$1 = this;
return (((!((other12913 == null)))) && ((((this12912__$1.constructor === other12913.constructor)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this12912__$1.x,other12913.x)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this12912__$1.y,other12913.y)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this12912__$1.__extmap,other12913.__extmap)))))))));
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

(shadow.dom.Coordinate.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this__5330__auto__,k12911){
var self__ = this;
var this__5330__auto____$1 = this;
var G__13012 = k12911;
var G__13012__$1 = (((G__13012 instanceof cljs.core.Keyword))?G__13012.fqn:null);
switch (G__13012__$1) {
case "x":
case "y":
return true;

break;
default:
return cljs.core.contains_QMARK_(self__.__extmap,k12911);

}
}));

(shadow.dom.Coordinate.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5331__auto__,k__5332__auto__,G__12910){
var self__ = this;
var this__5331__auto____$1 = this;
var pred__13015 = cljs.core.keyword_identical_QMARK_;
var expr__13016 = k__5332__auto__;
if(cljs.core.truth_((pred__13015.cljs$core$IFn$_invoke$arity$2 ? pred__13015.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"x","x",2099068185),expr__13016) : pred__13015.call(null,new cljs.core.Keyword(null,"x","x",2099068185),expr__13016)))){
return (new shadow.dom.Coordinate(G__12910,self__.y,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__13015.cljs$core$IFn$_invoke$arity$2 ? pred__13015.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"y","y",-1757859776),expr__13016) : pred__13015.call(null,new cljs.core.Keyword(null,"y","y",-1757859776),expr__13016)))){
return (new shadow.dom.Coordinate(self__.x,G__12910,self__.__meta,self__.__extmap,null));
} else {
return (new shadow.dom.Coordinate(self__.x,self__.y,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5332__auto__,G__12910),null));
}
}
}));

(shadow.dom.Coordinate.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5336__auto__){
var self__ = this;
var this__5336__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"x","x",2099068185),self__.x,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"y","y",-1757859776),self__.y,null))], null),self__.__extmap));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5322__auto__,G__12910){
var self__ = this;
var this__5322__auto____$1 = this;
return (new shadow.dom.Coordinate(self__.x,self__.y,G__12910,self__.__extmap,self__.__hash));
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
shadow.dom.map__GT_Coordinate = (function shadow$dom$map__GT_Coordinate(G__12924){
var extmap__5365__auto__ = (function (){var G__13043 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__12924,new cljs.core.Keyword(null,"x","x",2099068185),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"y","y",-1757859776)], 0));
if(cljs.core.record_QMARK_(G__12924)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__13043);
} else {
return G__13043;
}
})();
return (new shadow.dom.Coordinate(new cljs.core.Keyword(null,"x","x",2099068185).cljs$core$IFn$_invoke$arity$1(G__12924),new cljs.core.Keyword(null,"y","y",-1757859776).cljs$core$IFn$_invoke$arity$1(G__12924),null,cljs.core.not_empty(extmap__5365__auto__),null));
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

(shadow.dom.Size.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5325__auto__,k13065,else__5326__auto__){
var self__ = this;
var this__5325__auto____$1 = this;
var G__13087 = k13065;
var G__13087__$1 = (((G__13087 instanceof cljs.core.Keyword))?G__13087.fqn:null);
switch (G__13087__$1) {
case "w":
return self__.w;

break;
case "h":
return self__.h;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k13065,else__5326__auto__);

}
}));

(shadow.dom.Size.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__5343__auto__,f__5344__auto__,init__5345__auto__){
var self__ = this;
var this__5343__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__5346__auto__,p__13099){
var vec__13100 = p__13099;
var k__5347__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13100,(0),null);
var v__5348__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13100,(1),null);
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

(shadow.dom.Size.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__13064){
var self__ = this;
var G__13064__$1 = this;
return (new cljs.core.RecordIter((0),G__13064__$1,2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"w","w",354169001),new cljs.core.Keyword(null,"h","h",1109658740)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
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

(shadow.dom.Size.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this13066,other13067){
var self__ = this;
var this13066__$1 = this;
return (((!((other13067 == null)))) && ((((this13066__$1.constructor === other13067.constructor)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this13066__$1.w,other13067.w)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this13066__$1.h,other13067.h)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this13066__$1.__extmap,other13067.__extmap)))))))));
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

(shadow.dom.Size.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this__5330__auto__,k13065){
var self__ = this;
var this__5330__auto____$1 = this;
var G__13228 = k13065;
var G__13228__$1 = (((G__13228 instanceof cljs.core.Keyword))?G__13228.fqn:null);
switch (G__13228__$1) {
case "w":
case "h":
return true;

break;
default:
return cljs.core.contains_QMARK_(self__.__extmap,k13065);

}
}));

(shadow.dom.Size.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5331__auto__,k__5332__auto__,G__13064){
var self__ = this;
var this__5331__auto____$1 = this;
var pred__13248 = cljs.core.keyword_identical_QMARK_;
var expr__13249 = k__5332__auto__;
if(cljs.core.truth_((pred__13248.cljs$core$IFn$_invoke$arity$2 ? pred__13248.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"w","w",354169001),expr__13249) : pred__13248.call(null,new cljs.core.Keyword(null,"w","w",354169001),expr__13249)))){
return (new shadow.dom.Size(G__13064,self__.h,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__13248.cljs$core$IFn$_invoke$arity$2 ? pred__13248.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"h","h",1109658740),expr__13249) : pred__13248.call(null,new cljs.core.Keyword(null,"h","h",1109658740),expr__13249)))){
return (new shadow.dom.Size(self__.w,G__13064,self__.__meta,self__.__extmap,null));
} else {
return (new shadow.dom.Size(self__.w,self__.h,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5332__auto__,G__13064),null));
}
}
}));

(shadow.dom.Size.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5336__auto__){
var self__ = this;
var this__5336__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"w","w",354169001),self__.w,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"h","h",1109658740),self__.h,null))], null),self__.__extmap));
}));

(shadow.dom.Size.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5322__auto__,G__13064){
var self__ = this;
var this__5322__auto____$1 = this;
return (new shadow.dom.Size(self__.w,self__.h,G__13064,self__.__extmap,self__.__hash));
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
shadow.dom.map__GT_Size = (function shadow$dom$map__GT_Size(G__13071){
var extmap__5365__auto__ = (function (){var G__13317 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__13071,new cljs.core.Keyword(null,"w","w",354169001),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"h","h",1109658740)], 0));
if(cljs.core.record_QMARK_(G__13071)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__13317);
} else {
return G__13317;
}
})();
return (new shadow.dom.Size(new cljs.core.Keyword(null,"w","w",354169001).cljs$core$IFn$_invoke$arity$1(G__13071),new cljs.core.Keyword(null,"h","h",1109658740).cljs$core$IFn$_invoke$arity$1(G__13071),null,cljs.core.not_empty(extmap__5365__auto__),null));
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
var G__14372 = (i + (1));
var G__14373 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(ret,(opts[i]["value"]));
i = G__14372;
ret = G__14373;
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
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(path),"?",clojure.string.join.cljs$core$IFn$_invoke$arity$2("&",cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__13440){
var vec__13441 = p__13440;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13441,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13441,(1),null);
return [cljs.core.name(k),"=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(encodeURIComponent(cljs.core.str.cljs$core$IFn$_invoke$arity$1(v)))].join('');
}),query_params))].join('');
}
});
shadow.dom.redirect = (function shadow$dom$redirect(var_args){
var G__13453 = arguments.length;
switch (G__13453) {
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
var G__14376 = ps;
var G__14377 = (i + (1));
el__$1 = G__14376;
i = G__14377;
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
var vec__13723 = shadow.dom.parse_tag(tag_def);
var tag_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13723,(0),null);
var tag_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13723,(1),null);
var tag_classes = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13723,(2),null);
var el = document.createElementNS("http://www.w3.org/2000/svg",tag_name);
if(cljs.core.truth_(tag_id)){
el.setAttribute("id",tag_id);
} else {
}

if(cljs.core.truth_(tag_classes)){
el.setAttribute("class",shadow.dom.merge_class_string(new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(props),tag_classes));
} else {
}

var seq__13734_14378 = cljs.core.seq(props);
var chunk__13735_14379 = null;
var count__13736_14380 = (0);
var i__13737_14381 = (0);
while(true){
if((i__13737_14381 < count__13736_14380)){
var vec__13772_14382 = chunk__13735_14379.cljs$core$IIndexed$_nth$arity$2(null,i__13737_14381);
var k_14383 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13772_14382,(0),null);
var v_14384 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13772_14382,(1),null);
el.setAttributeNS((function (){var temp__5823__auto__ = cljs.core.namespace(k_14383);
if(cljs.core.truth_(temp__5823__auto__)){
var ns = temp__5823__auto__;
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(shadow.dom.xmlns),ns);
} else {
return null;
}
})(),cljs.core.name(k_14383),v_14384);


var G__14385 = seq__13734_14378;
var G__14386 = chunk__13735_14379;
var G__14387 = count__13736_14380;
var G__14388 = (i__13737_14381 + (1));
seq__13734_14378 = G__14385;
chunk__13735_14379 = G__14386;
count__13736_14380 = G__14387;
i__13737_14381 = G__14388;
continue;
} else {
var temp__5823__auto___14389 = cljs.core.seq(seq__13734_14378);
if(temp__5823__auto___14389){
var seq__13734_14390__$1 = temp__5823__auto___14389;
if(cljs.core.chunked_seq_QMARK_(seq__13734_14390__$1)){
var c__5548__auto___14391 = cljs.core.chunk_first(seq__13734_14390__$1);
var G__14392 = cljs.core.chunk_rest(seq__13734_14390__$1);
var G__14393 = c__5548__auto___14391;
var G__14394 = cljs.core.count(c__5548__auto___14391);
var G__14395 = (0);
seq__13734_14378 = G__14392;
chunk__13735_14379 = G__14393;
count__13736_14380 = G__14394;
i__13737_14381 = G__14395;
continue;
} else {
var vec__13794_14396 = cljs.core.first(seq__13734_14390__$1);
var k_14397 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13794_14396,(0),null);
var v_14398 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13794_14396,(1),null);
el.setAttributeNS((function (){var temp__5823__auto____$1 = cljs.core.namespace(k_14397);
if(cljs.core.truth_(temp__5823__auto____$1)){
var ns = temp__5823__auto____$1;
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(shadow.dom.xmlns),ns);
} else {
return null;
}
})(),cljs.core.name(k_14397),v_14398);


var G__14401 = cljs.core.next(seq__13734_14390__$1);
var G__14402 = null;
var G__14403 = (0);
var G__14404 = (0);
seq__13734_14378 = G__14401;
chunk__13735_14379 = G__14402;
count__13736_14380 = G__14403;
i__13737_14381 = G__14404;
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
var vec__13827 = shadow.dom.destructure_node(shadow.dom.create_svg_node,structure);
var node = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13827,(0),null);
var node_children = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13827,(1),null);
var seq__13833_14409 = cljs.core.seq(node_children);
var chunk__13835_14410 = null;
var count__13836_14411 = (0);
var i__13837_14412 = (0);
while(true){
if((i__13837_14412 < count__13836_14411)){
var child_struct_14413 = chunk__13835_14410.cljs$core$IIndexed$_nth$arity$2(null,i__13837_14412);
if((!((child_struct_14413 == null)))){
if(typeof child_struct_14413 === 'string'){
var text_14414 = (node["textContent"]);
(node["textContent"] = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(text_14414),child_struct_14413].join(''));
} else {
var children_14415 = shadow.dom.svg_node(child_struct_14413);
if(cljs.core.seq_QMARK_(children_14415)){
var seq__13942_14416 = cljs.core.seq(children_14415);
var chunk__13944_14417 = null;
var count__13945_14418 = (0);
var i__13946_14419 = (0);
while(true){
if((i__13946_14419 < count__13945_14418)){
var child_14420 = chunk__13944_14417.cljs$core$IIndexed$_nth$arity$2(null,i__13946_14419);
if(cljs.core.truth_(child_14420)){
node.appendChild(child_14420);


var G__14421 = seq__13942_14416;
var G__14422 = chunk__13944_14417;
var G__14423 = count__13945_14418;
var G__14424 = (i__13946_14419 + (1));
seq__13942_14416 = G__14421;
chunk__13944_14417 = G__14422;
count__13945_14418 = G__14423;
i__13946_14419 = G__14424;
continue;
} else {
var G__14426 = seq__13942_14416;
var G__14427 = chunk__13944_14417;
var G__14428 = count__13945_14418;
var G__14429 = (i__13946_14419 + (1));
seq__13942_14416 = G__14426;
chunk__13944_14417 = G__14427;
count__13945_14418 = G__14428;
i__13946_14419 = G__14429;
continue;
}
} else {
var temp__5823__auto___14431 = cljs.core.seq(seq__13942_14416);
if(temp__5823__auto___14431){
var seq__13942_14432__$1 = temp__5823__auto___14431;
if(cljs.core.chunked_seq_QMARK_(seq__13942_14432__$1)){
var c__5548__auto___14433 = cljs.core.chunk_first(seq__13942_14432__$1);
var G__14434 = cljs.core.chunk_rest(seq__13942_14432__$1);
var G__14435 = c__5548__auto___14433;
var G__14436 = cljs.core.count(c__5548__auto___14433);
var G__14437 = (0);
seq__13942_14416 = G__14434;
chunk__13944_14417 = G__14435;
count__13945_14418 = G__14436;
i__13946_14419 = G__14437;
continue;
} else {
var child_14438 = cljs.core.first(seq__13942_14432__$1);
if(cljs.core.truth_(child_14438)){
node.appendChild(child_14438);


var G__14440 = cljs.core.next(seq__13942_14432__$1);
var G__14441 = null;
var G__14442 = (0);
var G__14443 = (0);
seq__13942_14416 = G__14440;
chunk__13944_14417 = G__14441;
count__13945_14418 = G__14442;
i__13946_14419 = G__14443;
continue;
} else {
var G__14444 = cljs.core.next(seq__13942_14432__$1);
var G__14445 = null;
var G__14446 = (0);
var G__14447 = (0);
seq__13942_14416 = G__14444;
chunk__13944_14417 = G__14445;
count__13945_14418 = G__14446;
i__13946_14419 = G__14447;
continue;
}
}
} else {
}
}
break;
}
} else {
node.appendChild(children_14415);
}
}


var G__14449 = seq__13833_14409;
var G__14450 = chunk__13835_14410;
var G__14451 = count__13836_14411;
var G__14452 = (i__13837_14412 + (1));
seq__13833_14409 = G__14449;
chunk__13835_14410 = G__14450;
count__13836_14411 = G__14451;
i__13837_14412 = G__14452;
continue;
} else {
var G__14453 = seq__13833_14409;
var G__14454 = chunk__13835_14410;
var G__14455 = count__13836_14411;
var G__14456 = (i__13837_14412 + (1));
seq__13833_14409 = G__14453;
chunk__13835_14410 = G__14454;
count__13836_14411 = G__14455;
i__13837_14412 = G__14456;
continue;
}
} else {
var temp__5823__auto___14458 = cljs.core.seq(seq__13833_14409);
if(temp__5823__auto___14458){
var seq__13833_14459__$1 = temp__5823__auto___14458;
if(cljs.core.chunked_seq_QMARK_(seq__13833_14459__$1)){
var c__5548__auto___14460 = cljs.core.chunk_first(seq__13833_14459__$1);
var G__14461 = cljs.core.chunk_rest(seq__13833_14459__$1);
var G__14462 = c__5548__auto___14460;
var G__14463 = cljs.core.count(c__5548__auto___14460);
var G__14464 = (0);
seq__13833_14409 = G__14461;
chunk__13835_14410 = G__14462;
count__13836_14411 = G__14463;
i__13837_14412 = G__14464;
continue;
} else {
var child_struct_14465 = cljs.core.first(seq__13833_14459__$1);
if((!((child_struct_14465 == null)))){
if(typeof child_struct_14465 === 'string'){
var text_14466 = (node["textContent"]);
(node["textContent"] = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(text_14466),child_struct_14465].join(''));
} else {
var children_14467 = shadow.dom.svg_node(child_struct_14465);
if(cljs.core.seq_QMARK_(children_14467)){
var seq__13978_14468 = cljs.core.seq(children_14467);
var chunk__13980_14469 = null;
var count__13981_14470 = (0);
var i__13982_14471 = (0);
while(true){
if((i__13982_14471 < count__13981_14470)){
var child_14473 = chunk__13980_14469.cljs$core$IIndexed$_nth$arity$2(null,i__13982_14471);
if(cljs.core.truth_(child_14473)){
node.appendChild(child_14473);


var G__14476 = seq__13978_14468;
var G__14477 = chunk__13980_14469;
var G__14478 = count__13981_14470;
var G__14479 = (i__13982_14471 + (1));
seq__13978_14468 = G__14476;
chunk__13980_14469 = G__14477;
count__13981_14470 = G__14478;
i__13982_14471 = G__14479;
continue;
} else {
var G__14484 = seq__13978_14468;
var G__14485 = chunk__13980_14469;
var G__14486 = count__13981_14470;
var G__14487 = (i__13982_14471 + (1));
seq__13978_14468 = G__14484;
chunk__13980_14469 = G__14485;
count__13981_14470 = G__14486;
i__13982_14471 = G__14487;
continue;
}
} else {
var temp__5823__auto___14488__$1 = cljs.core.seq(seq__13978_14468);
if(temp__5823__auto___14488__$1){
var seq__13978_14489__$1 = temp__5823__auto___14488__$1;
if(cljs.core.chunked_seq_QMARK_(seq__13978_14489__$1)){
var c__5548__auto___14490 = cljs.core.chunk_first(seq__13978_14489__$1);
var G__14491 = cljs.core.chunk_rest(seq__13978_14489__$1);
var G__14492 = c__5548__auto___14490;
var G__14493 = cljs.core.count(c__5548__auto___14490);
var G__14494 = (0);
seq__13978_14468 = G__14491;
chunk__13980_14469 = G__14492;
count__13981_14470 = G__14493;
i__13982_14471 = G__14494;
continue;
} else {
var child_14495 = cljs.core.first(seq__13978_14489__$1);
if(cljs.core.truth_(child_14495)){
node.appendChild(child_14495);


var G__14496 = cljs.core.next(seq__13978_14489__$1);
var G__14497 = null;
var G__14498 = (0);
var G__14499 = (0);
seq__13978_14468 = G__14496;
chunk__13980_14469 = G__14497;
count__13981_14470 = G__14498;
i__13982_14471 = G__14499;
continue;
} else {
var G__14501 = cljs.core.next(seq__13978_14489__$1);
var G__14502 = null;
var G__14503 = (0);
var G__14504 = (0);
seq__13978_14468 = G__14501;
chunk__13980_14469 = G__14502;
count__13981_14470 = G__14503;
i__13982_14471 = G__14504;
continue;
}
}
} else {
}
}
break;
}
} else {
node.appendChild(children_14467);
}
}


var G__14505 = cljs.core.next(seq__13833_14459__$1);
var G__14506 = null;
var G__14507 = (0);
var G__14508 = (0);
seq__13833_14409 = G__14505;
chunk__13835_14410 = G__14506;
count__13836_14411 = G__14507;
i__13837_14412 = G__14508;
continue;
} else {
var G__14511 = cljs.core.next(seq__13833_14459__$1);
var G__14512 = null;
var G__14513 = (0);
var G__14514 = (0);
seq__13833_14409 = G__14511;
chunk__13835_14410 = G__14512;
count__13836_14411 = G__14513;
i__13837_14412 = G__14514;
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
var len__5749__auto___14520 = arguments.length;
var i__5750__auto___14521 = (0);
while(true){
if((i__5750__auto___14521 < len__5749__auto___14520)){
args__5755__auto__.push((arguments[i__5750__auto___14521]));

var G__14523 = (i__5750__auto___14521 + (1));
i__5750__auto___14521 = G__14523;
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
(shadow.dom.svg.cljs$lang$applyTo = (function (seq14018){
var G__14019 = cljs.core.first(seq14018);
var seq14018__$1 = cljs.core.next(seq14018);
var self__5734__auto__ = this;
return self__5734__auto__.cljs$core$IFn$_invoke$arity$variadic(G__14019,seq14018__$1);
}));


//# sourceMappingURL=shadow.dom.js.map
