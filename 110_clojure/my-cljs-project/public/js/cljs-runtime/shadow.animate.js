goog.provide('shadow.animate');

/**
 * @interface
 */
shadow.animate.Animation = function(){};

var shadow$animate$Animation$_animate_from$dyn_17641 = (function (this$){
var x__5373__auto__ = (((this$ == null))?null:this$);
var m__5374__auto__ = (shadow.animate._animate_from[goog.typeOf(x__5373__auto__)]);
if((!((m__5374__auto__ == null)))){
return (m__5374__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5374__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5374__auto__.call(null,this$));
} else {
var m__5372__auto__ = (shadow.animate._animate_from["_"]);
if((!((m__5372__auto__ == null)))){
return (m__5372__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5372__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5372__auto__.call(null,this$));
} else {
throw cljs.core.missing_protocol("Animation.-animate-from",this$);
}
}
});
/**
 * return a map of {attr initial-value}
 */
shadow.animate._animate_from = (function shadow$animate$_animate_from(this$){
if((((!((this$ == null)))) && ((!((this$.shadow$animate$Animation$_animate_from$arity$1 == null)))))){
return this$.shadow$animate$Animation$_animate_from$arity$1(this$);
} else {
return shadow$animate$Animation$_animate_from$dyn_17641(this$);
}
});

var shadow$animate$Animation$_animate_to$dyn_17657 = (function (this$){
var x__5373__auto__ = (((this$ == null))?null:this$);
var m__5374__auto__ = (shadow.animate._animate_to[goog.typeOf(x__5373__auto__)]);
if((!((m__5374__auto__ == null)))){
return (m__5374__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5374__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5374__auto__.call(null,this$));
} else {
var m__5372__auto__ = (shadow.animate._animate_to["_"]);
if((!((m__5372__auto__ == null)))){
return (m__5372__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5372__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5372__auto__.call(null,this$));
} else {
throw cljs.core.missing_protocol("Animation.-animate-to",this$);
}
}
});
/**
 * return a map of {attr target-value}
 */
shadow.animate._animate_to = (function shadow$animate$_animate_to(this$){
if((((!((this$ == null)))) && ((!((this$.shadow$animate$Animation$_animate_to$arity$1 == null)))))){
return this$.shadow$animate$Animation$_animate_to$arity$1(this$);
} else {
return shadow$animate$Animation$_animate_to$dyn_17657(this$);
}
});

var shadow$animate$Animation$_animate_toggles$dyn_17664 = (function (this$){
var x__5373__auto__ = (((this$ == null))?null:this$);
var m__5374__auto__ = (shadow.animate._animate_toggles[goog.typeOf(x__5373__auto__)]);
if((!((m__5374__auto__ == null)))){
return (m__5374__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5374__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5374__auto__.call(null,this$));
} else {
var m__5372__auto__ = (shadow.animate._animate_toggles["_"]);
if((!((m__5372__auto__ == null)))){
return (m__5372__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5372__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5372__auto__.call(null,this$));
} else {
throw cljs.core.missing_protocol("Animation.-animate-toggles",this$);
}
}
});
/**
 * return a map of {attr target-value}
 */
shadow.animate._animate_toggles = (function shadow$animate$_animate_toggles(this$){
if((((!((this$ == null)))) && ((!((this$.shadow$animate$Animation$_animate_toggles$arity$1 == null)))))){
return this$.shadow$animate$Animation$_animate_toggles$arity$1(this$);
} else {
return shadow$animate$Animation$_animate_toggles$dyn_17664(this$);
}
});

var shadow$animate$Animation$_animate_timings$dyn_17669 = (function (this$){
var x__5373__auto__ = (((this$ == null))?null:this$);
var m__5374__auto__ = (shadow.animate._animate_timings[goog.typeOf(x__5373__auto__)]);
if((!((m__5374__auto__ == null)))){
return (m__5374__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5374__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5374__auto__.call(null,this$));
} else {
var m__5372__auto__ = (shadow.animate._animate_timings["_"]);
if((!((m__5372__auto__ == null)))){
return (m__5372__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5372__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5372__auto__.call(null,this$));
} else {
throw cljs.core.missing_protocol("Animation.-animate-timings",this$);
}
}
});
/**
 * return a map of {attr timing-function}
 */
shadow.animate._animate_timings = (function shadow$animate$_animate_timings(this$){
if((((!((this$ == null)))) && ((!((this$.shadow$animate$Animation$_animate_timings$arity$1 == null)))))){
return this$.shadow$animate$Animation$_animate_timings$arity$1(this$);
} else {
return shadow$animate$Animation$_animate_timings$dyn_17669(this$);
}
});

var shadow$animate$Animation$_animate_delays$dyn_17672 = (function (this$){
var x__5373__auto__ = (((this$ == null))?null:this$);
var m__5374__auto__ = (shadow.animate._animate_delays[goog.typeOf(x__5373__auto__)]);
if((!((m__5374__auto__ == null)))){
return (m__5374__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5374__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5374__auto__.call(null,this$));
} else {
var m__5372__auto__ = (shadow.animate._animate_delays["_"]);
if((!((m__5372__auto__ == null)))){
return (m__5372__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5372__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5372__auto__.call(null,this$));
} else {
throw cljs.core.missing_protocol("Animation.-animate-delays",this$);
}
}
});
/**
 * return a map of {attr transition-delay}
 */
shadow.animate._animate_delays = (function shadow$animate$_animate_delays(this$){
if((((!((this$ == null)))) && ((!((this$.shadow$animate$Animation$_animate_delays$arity$1 == null)))))){
return this$.shadow$animate$Animation$_animate_delays$arity$1(this$);
} else {
return shadow$animate$Animation$_animate_delays$dyn_17672(this$);
}
});

shadow.animate.transition_string = (function shadow$animate$transition_string(duration,adef){
var timings = shadow.animate._animate_timings(adef);
var delays = shadow.animate._animate_delays(adef);
return clojure.string.join.cljs$core$IFn$_invoke$arity$2(", ",cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__16857){
var vec__16859 = p__16857;
var attr = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16859,(0),null);
var timing = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16859,(1),null);
return [cljs.core.name(attr)," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(duration),"ms"," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(timing),(function (){var delay = cljs.core.get.cljs$core$IFn$_invoke$arity$2(delays,attr);
if(cljs.core.truth_((function (){var and__5023__auto__ = delay;
if(cljs.core.truth_(and__5023__auto__)){
return (delay > (0));
} else {
return and__5023__auto__;
}
})())){
return [" ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(delay),"ms"].join('');
} else {
return null;
}
})()].join('');
}),timings));
});

/**
 * @interface
 */
shadow.animate.IAnimator = function(){};

var shadow$animate$IAnimator$get_duration$dyn_17683 = (function (animator){
var x__5373__auto__ = (((animator == null))?null:animator);
var m__5374__auto__ = (shadow.animate.get_duration[goog.typeOf(x__5373__auto__)]);
if((!((m__5374__auto__ == null)))){
return (m__5374__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5374__auto__.cljs$core$IFn$_invoke$arity$1(animator) : m__5374__auto__.call(null,animator));
} else {
var m__5372__auto__ = (shadow.animate.get_duration["_"]);
if((!((m__5372__auto__ == null)))){
return (m__5372__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5372__auto__.cljs$core$IFn$_invoke$arity$1(animator) : m__5372__auto__.call(null,animator));
} else {
throw cljs.core.missing_protocol("IAnimator.get-duration",animator);
}
}
});
shadow.animate.get_duration = (function shadow$animate$get_duration(animator){
if((((!((animator == null)))) && ((!((animator.shadow$animate$IAnimator$get_duration$arity$1 == null)))))){
return animator.shadow$animate$IAnimator$get_duration$arity$1(animator);
} else {
return shadow$animate$IAnimator$get_duration$dyn_17683(animator);
}
});

var shadow$animate$IAnimator$init_BANG_$dyn_17687 = (function (animator){
var x__5373__auto__ = (((animator == null))?null:animator);
var m__5374__auto__ = (shadow.animate.init_BANG_[goog.typeOf(x__5373__auto__)]);
if((!((m__5374__auto__ == null)))){
return (m__5374__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5374__auto__.cljs$core$IFn$_invoke$arity$1(animator) : m__5374__auto__.call(null,animator));
} else {
var m__5372__auto__ = (shadow.animate.init_BANG_["_"]);
if((!((m__5372__auto__ == null)))){
return (m__5372__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5372__auto__.cljs$core$IFn$_invoke$arity$1(animator) : m__5372__auto__.call(null,animator));
} else {
throw cljs.core.missing_protocol("IAnimator.init!",animator);
}
}
});
/**
 * apply the initial values
 */
shadow.animate.init_BANG_ = (function shadow$animate$init_BANG_(animator){
if((((!((animator == null)))) && ((!((animator.shadow$animate$IAnimator$init_BANG_$arity$1 == null)))))){
return animator.shadow$animate$IAnimator$init_BANG_$arity$1(animator);
} else {
return shadow$animate$IAnimator$init_BANG_$dyn_17687(animator);
}
});

var shadow$animate$IAnimator$start_BANG_$dyn_17694 = (function (animator){
var x__5373__auto__ = (((animator == null))?null:animator);
var m__5374__auto__ = (shadow.animate.start_BANG_[goog.typeOf(x__5373__auto__)]);
if((!((m__5374__auto__ == null)))){
return (m__5374__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5374__auto__.cljs$core$IFn$_invoke$arity$1(animator) : m__5374__auto__.call(null,animator));
} else {
var m__5372__auto__ = (shadow.animate.start_BANG_["_"]);
if((!((m__5372__auto__ == null)))){
return (m__5372__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5372__auto__.cljs$core$IFn$_invoke$arity$1(animator) : m__5372__auto__.call(null,animator));
} else {
throw cljs.core.missing_protocol("IAnimator.start!",animator);
}
}
});
/**
 * start the animation, must return a channel that closes once the animation is done
 */
shadow.animate.start_BANG_ = (function shadow$animate$start_BANG_(animator){
if((((!((animator == null)))) && ((!((animator.shadow$animate$IAnimator$start_BANG_$arity$1 == null)))))){
return animator.shadow$animate$IAnimator$start_BANG_$arity$1(animator);
} else {
return shadow$animate$IAnimator$start_BANG_$dyn_17694(animator);
}
});

var shadow$animate$IAnimator$finish_BANG_$dyn_17699 = (function (animator){
var x__5373__auto__ = (((animator == null))?null:animator);
var m__5374__auto__ = (shadow.animate.finish_BANG_[goog.typeOf(x__5373__auto__)]);
if((!((m__5374__auto__ == null)))){
return (m__5374__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5374__auto__.cljs$core$IFn$_invoke$arity$1(animator) : m__5374__auto__.call(null,animator));
} else {
var m__5372__auto__ = (shadow.animate.finish_BANG_["_"]);
if((!((m__5372__auto__ == null)))){
return (m__5372__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5372__auto__.cljs$core$IFn$_invoke$arity$1(animator) : m__5372__auto__.call(null,animator));
} else {
throw cljs.core.missing_protocol("IAnimator.finish!",animator);
}
}
});
/**
 * cleanup
 */
shadow.animate.finish_BANG_ = (function shadow$animate$finish_BANG_(animator){
if((((!((animator == null)))) && ((!((animator.shadow$animate$IAnimator$finish_BANG_$arity$1 == null)))))){
return animator.shadow$animate$IAnimator$finish_BANG_$arity$1(animator);
} else {
return shadow$animate$IAnimator$finish_BANG_$dyn_17699(animator);
}
});


/**
* @constructor
 * @implements {shadow.animate.IAnimator}
*/
shadow.animate.Animator = (function (duration,items){
this.duration = duration;
this.items = items;
});
(shadow.animate.Animator.prototype.shadow$animate$IAnimator$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.animate.Animator.prototype.shadow$animate$IAnimator$get_duration$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.duration;
}));

(shadow.animate.Animator.prototype.shadow$animate$IAnimator$init_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
var n__5616__auto__ = self__.items.length;
var i__12235__auto__ = (0);
while(true){
if((i__12235__auto__ < n__5616__auto__)){
var map__16926_17706 = (self__.items[i__12235__auto__]);
var map__16926_17707__$1 = cljs.core.__destructure_map(map__16926_17706);
var el_17708 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16926_17707__$1,new cljs.core.Keyword(null,"el","el",-1618201118));
var from_17709 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16926_17707__$1,new cljs.core.Keyword(null,"from","from",1815293044));
goog.style.setStyle(el_17708,from_17709);

var G__17713 = (i__12235__auto__ + (1));
i__12235__auto__ = G__17713;
continue;
} else {
return null;
}
break;
}
}));

(shadow.animate.Animator.prototype.shadow$animate$IAnimator$start_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
var n__5616__auto__ = self__.items.length;
var i__12235__auto__ = (0);
while(true){
if((i__12235__auto__ < n__5616__auto__)){
var map__16932_17714 = (self__.items[i__12235__auto__]);
var map__16932_17715__$1 = cljs.core.__destructure_map(map__16932_17714);
var el_17716 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16932_17715__$1,new cljs.core.Keyword(null,"el","el",-1618201118));
var to_17717 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16932_17715__$1,new cljs.core.Keyword(null,"to","to",192099007));
var transition_17718 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16932_17715__$1,new cljs.core.Keyword(null,"transition","transition",765692007));
(to_17717["transition"] = transition_17718);

goog.style.setStyle(el_17716,to_17717);

var G__17720 = (i__12235__auto__ + (1));
i__12235__auto__ = G__17720;
continue;
} else {
return null;
}
break;
}
}));

(shadow.animate.Animator.prototype.shadow$animate$IAnimator$finish_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
var n__5616__auto__ = self__.items.length;
var i__12235__auto__ = (0);
while(true){
if((i__12235__auto__ < n__5616__auto__)){
var map__16938_17723 = (self__.items[i__12235__auto__]);
var map__16938_17724__$1 = cljs.core.__destructure_map(map__16938_17723);
var el_17725 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16938_17724__$1,new cljs.core.Keyword(null,"el","el",-1618201118));
var toggles_17726 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16938_17724__$1,new cljs.core.Keyword(null,"toggles","toggles",1077909479));
(toggles_17726["transition"] = null);

goog.style.setStyle(el_17725,toggles_17726);

var G__17727 = (i__12235__auto__ + (1));
i__12235__auto__ = G__17727;
continue;
} else {
return null;
}
break;
}
}));

(shadow.animate.Animator.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"duration","duration",-1210334701,null),new cljs.core.Symbol(null,"items","items",-1622480831,null)], null);
}));

(shadow.animate.Animator.cljs$lang$type = true);

(shadow.animate.Animator.cljs$lang$ctorStr = "shadow.animate/Animator");

(shadow.animate.Animator.cljs$lang$ctorPrWriter = (function (this__5310__auto__,writer__5311__auto__,opt__5312__auto__){
return cljs.core._write(writer__5311__auto__,"shadow.animate/Animator");
}));

/**
 * Positional factory function for shadow.animate/Animator.
 */
shadow.animate.__GT_Animator = (function shadow$animate$__GT_Animator(duration,items){
return (new shadow.animate.Animator(duration,items));
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
shadow.animate.AnimationStep = (function (el,from,to,toggles,transition,__meta,__extmap,__hash){
this.el = el;
this.from = from;
this.to = to;
this.toggles = toggles;
this.transition = transition;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2230716170;
this.cljs$lang$protocol_mask$partition1$ = 139264;
});
(shadow.animate.AnimationStep.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__5323__auto__,k__5324__auto__){
var self__ = this;
var this__5323__auto____$1 = this;
return this__5323__auto____$1.cljs$core$ILookup$_lookup$arity$3(null,k__5324__auto__,null);
}));

(shadow.animate.AnimationStep.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5325__auto__,k16947,else__5326__auto__){
var self__ = this;
var this__5325__auto____$1 = this;
var G__16955 = k16947;
var G__16955__$1 = (((G__16955 instanceof cljs.core.Keyword))?G__16955.fqn:null);
switch (G__16955__$1) {
case "el":
return self__.el;

break;
case "from":
return self__.from;

break;
case "to":
return self__.to;

break;
case "toggles":
return self__.toggles;

break;
case "transition":
return self__.transition;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k16947,else__5326__auto__);

}
}));

(shadow.animate.AnimationStep.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__5343__auto__,f__5344__auto__,init__5345__auto__){
var self__ = this;
var this__5343__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__5346__auto__,p__16967){
var vec__16972 = p__16967;
var k__5347__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16972,(0),null);
var v__5348__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16972,(1),null);
return (f__5344__auto__.cljs$core$IFn$_invoke$arity$3 ? f__5344__auto__.cljs$core$IFn$_invoke$arity$3(ret__5346__auto__,k__5347__auto__,v__5348__auto__) : f__5344__auto__.call(null,ret__5346__auto__,k__5347__auto__,v__5348__auto__));
}),init__5345__auto__,this__5343__auto____$1);
}));

(shadow.animate.AnimationStep.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5338__auto__,writer__5339__auto__,opts__5340__auto__){
var self__ = this;
var this__5338__auto____$1 = this;
var pr_pair__5341__auto__ = (function (keyval__5342__auto__){
return cljs.core.pr_sequential_writer(writer__5339__auto__,cljs.core.pr_writer,""," ","",opts__5340__auto__,keyval__5342__auto__);
});
return cljs.core.pr_sequential_writer(writer__5339__auto__,pr_pair__5341__auto__,"#shadow.animate.AnimationStep{",", ","}",opts__5340__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"el","el",-1618201118),self__.el],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"from","from",1815293044),self__.from],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"to","to",192099007),self__.to],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"toggles","toggles",1077909479),self__.toggles],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"transition","transition",765692007),self__.transition],null))], null),self__.__extmap));
}));

(shadow.animate.AnimationStep.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__16946){
var self__ = this;
var G__16946__$1 = this;
return (new cljs.core.RecordIter((0),G__16946__$1,5,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"el","el",-1618201118),new cljs.core.Keyword(null,"from","from",1815293044),new cljs.core.Keyword(null,"to","to",192099007),new cljs.core.Keyword(null,"toggles","toggles",1077909479),new cljs.core.Keyword(null,"transition","transition",765692007)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
}));

(shadow.animate.AnimationStep.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__5321__auto__){
var self__ = this;
var this__5321__auto____$1 = this;
return self__.__meta;
}));

(shadow.animate.AnimationStep.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__5318__auto__){
var self__ = this;
var this__5318__auto____$1 = this;
return (new shadow.animate.AnimationStep(self__.el,self__.from,self__.to,self__.toggles,self__.transition,self__.__meta,self__.__extmap,self__.__hash));
}));

(shadow.animate.AnimationStep.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__5327__auto__){
var self__ = this;
var this__5327__auto____$1 = this;
return (5 + cljs.core.count(self__.__extmap));
}));

(shadow.animate.AnimationStep.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__5319__auto__){
var self__ = this;
var this__5319__auto____$1 = this;
var h__5134__auto__ = self__.__hash;
if((!((h__5134__auto__ == null)))){
return h__5134__auto__;
} else {
var h__5134__auto____$1 = (function (coll__5320__auto__){
return (630436239 ^ cljs.core.hash_unordered_coll(coll__5320__auto__));
})(this__5319__auto____$1);
(self__.__hash = h__5134__auto____$1);

return h__5134__auto____$1;
}
}));

(shadow.animate.AnimationStep.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this16948,other16950){
var self__ = this;
var this16948__$1 = this;
return (((!((other16950 == null)))) && ((((this16948__$1.constructor === other16950.constructor)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this16948__$1.el,other16950.el)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this16948__$1.from,other16950.from)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this16948__$1.to,other16950.to)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this16948__$1.toggles,other16950.toggles)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this16948__$1.transition,other16950.transition)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this16948__$1.__extmap,other16950.__extmap)))))))))))))));
}));

(shadow.animate.AnimationStep.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__5333__auto__,k__5334__auto__){
var self__ = this;
var this__5333__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"el","el",-1618201118),null,new cljs.core.Keyword(null,"transition","transition",765692007),null,new cljs.core.Keyword(null,"toggles","toggles",1077909479),null,new cljs.core.Keyword(null,"from","from",1815293044),null,new cljs.core.Keyword(null,"to","to",192099007),null], null), null),k__5334__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core._with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__5333__auto____$1),self__.__meta),k__5334__auto__);
} else {
return (new shadow.animate.AnimationStep(self__.el,self__.from,self__.to,self__.toggles,self__.transition,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__5334__auto__)),null));
}
}));

(shadow.animate.AnimationStep.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this__5330__auto__,k16947){
var self__ = this;
var this__5330__auto____$1 = this;
var G__17042 = k16947;
var G__17042__$1 = (((G__17042 instanceof cljs.core.Keyword))?G__17042.fqn:null);
switch (G__17042__$1) {
case "el":
case "from":
case "to":
case "toggles":
case "transition":
return true;

break;
default:
return cljs.core.contains_QMARK_(self__.__extmap,k16947);

}
}));

(shadow.animate.AnimationStep.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5331__auto__,k__5332__auto__,G__16946){
var self__ = this;
var this__5331__auto____$1 = this;
var pred__17051 = cljs.core.keyword_identical_QMARK_;
var expr__17052 = k__5332__auto__;
if(cljs.core.truth_((pred__17051.cljs$core$IFn$_invoke$arity$2 ? pred__17051.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"el","el",-1618201118),expr__17052) : pred__17051.call(null,new cljs.core.Keyword(null,"el","el",-1618201118),expr__17052)))){
return (new shadow.animate.AnimationStep(G__16946,self__.from,self__.to,self__.toggles,self__.transition,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__17051.cljs$core$IFn$_invoke$arity$2 ? pred__17051.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"from","from",1815293044),expr__17052) : pred__17051.call(null,new cljs.core.Keyword(null,"from","from",1815293044),expr__17052)))){
return (new shadow.animate.AnimationStep(self__.el,G__16946,self__.to,self__.toggles,self__.transition,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__17051.cljs$core$IFn$_invoke$arity$2 ? pred__17051.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"to","to",192099007),expr__17052) : pred__17051.call(null,new cljs.core.Keyword(null,"to","to",192099007),expr__17052)))){
return (new shadow.animate.AnimationStep(self__.el,self__.from,G__16946,self__.toggles,self__.transition,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__17051.cljs$core$IFn$_invoke$arity$2 ? pred__17051.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"toggles","toggles",1077909479),expr__17052) : pred__17051.call(null,new cljs.core.Keyword(null,"toggles","toggles",1077909479),expr__17052)))){
return (new shadow.animate.AnimationStep(self__.el,self__.from,self__.to,G__16946,self__.transition,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__17051.cljs$core$IFn$_invoke$arity$2 ? pred__17051.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"transition","transition",765692007),expr__17052) : pred__17051.call(null,new cljs.core.Keyword(null,"transition","transition",765692007),expr__17052)))){
return (new shadow.animate.AnimationStep(self__.el,self__.from,self__.to,self__.toggles,G__16946,self__.__meta,self__.__extmap,null));
} else {
return (new shadow.animate.AnimationStep(self__.el,self__.from,self__.to,self__.toggles,self__.transition,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5332__auto__,G__16946),null));
}
}
}
}
}
}));

(shadow.animate.AnimationStep.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5336__auto__){
var self__ = this;
var this__5336__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"el","el",-1618201118),self__.el,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"from","from",1815293044),self__.from,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"to","to",192099007),self__.to,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"toggles","toggles",1077909479),self__.toggles,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"transition","transition",765692007),self__.transition,null))], null),self__.__extmap));
}));

(shadow.animate.AnimationStep.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5322__auto__,G__16946){
var self__ = this;
var this__5322__auto____$1 = this;
return (new shadow.animate.AnimationStep(self__.el,self__.from,self__.to,self__.toggles,self__.transition,G__16946,self__.__extmap,self__.__hash));
}));

(shadow.animate.AnimationStep.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__5328__auto__,entry__5329__auto__){
var self__ = this;
var this__5328__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__5329__auto__)){
return this__5328__auto____$1.cljs$core$IAssociative$_assoc$arity$3(null,cljs.core._nth(entry__5329__auto__,(0)),cljs.core._nth(entry__5329__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__5328__auto____$1,entry__5329__auto__);
}
}));

(shadow.animate.AnimationStep.getBasis = (function (){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"el","el",22330409,null),new cljs.core.Symbol(null,"from","from",-839142725,null),new cljs.core.Symbol(null,"to","to",1832630534,null),new cljs.core.Symbol(null,"toggles","toggles",-1576526290,null),new cljs.core.Symbol(null,"transition","transition",-1888743762,null)], null);
}));

(shadow.animate.AnimationStep.cljs$lang$type = true);

(shadow.animate.AnimationStep.cljs$lang$ctorPrSeq = (function (this__5369__auto__){
return (new cljs.core.List(null,"shadow.animate/AnimationStep",null,(1),null));
}));

(shadow.animate.AnimationStep.cljs$lang$ctorPrWriter = (function (this__5369__auto__,writer__5370__auto__){
return cljs.core._write(writer__5370__auto__,"shadow.animate/AnimationStep");
}));

/**
 * Positional factory function for shadow.animate/AnimationStep.
 */
shadow.animate.__GT_AnimationStep = (function shadow$animate$__GT_AnimationStep(el,from,to,toggles,transition){
return (new shadow.animate.AnimationStep(el,from,to,toggles,transition,null,null,null));
});

/**
 * Factory function for shadow.animate/AnimationStep, taking a map of keywords to field values.
 */
shadow.animate.map__GT_AnimationStep = (function shadow$animate$map__GT_AnimationStep(G__16951){
var extmap__5365__auto__ = (function (){var G__17111 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__16951,new cljs.core.Keyword(null,"el","el",-1618201118),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"from","from",1815293044),new cljs.core.Keyword(null,"to","to",192099007),new cljs.core.Keyword(null,"toggles","toggles",1077909479),new cljs.core.Keyword(null,"transition","transition",765692007)], 0));
if(cljs.core.record_QMARK_(G__16951)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__17111);
} else {
return G__17111;
}
})();
return (new shadow.animate.AnimationStep(new cljs.core.Keyword(null,"el","el",-1618201118).cljs$core$IFn$_invoke$arity$1(G__16951),new cljs.core.Keyword(null,"from","from",1815293044).cljs$core$IFn$_invoke$arity$1(G__16951),new cljs.core.Keyword(null,"to","to",192099007).cljs$core$IFn$_invoke$arity$1(G__16951),new cljs.core.Keyword(null,"toggles","toggles",1077909479).cljs$core$IFn$_invoke$arity$1(G__16951),new cljs.core.Keyword(null,"transition","transition",765692007).cljs$core$IFn$_invoke$arity$1(G__16951),null,cljs.core.not_empty(extmap__5365__auto__),null));
});

shadow.animate.setup = (function shadow$animate$setup(duration,elements){
var items = cljs.core.into_array.cljs$core$IFn$_invoke$arity$1((function (){var iter__5503__auto__ = (function shadow$animate$setup_$_iter__17142(s__17143){
return (new cljs.core.LazySeq(null,(function (){
var s__17143__$1 = s__17143;
while(true){
var temp__5823__auto__ = cljs.core.seq(s__17143__$1);
if(temp__5823__auto__){
var s__17143__$2 = temp__5823__auto__;
if(cljs.core.chunked_seq_QMARK_(s__17143__$2)){
var c__5501__auto__ = cljs.core.chunk_first(s__17143__$2);
var size__5502__auto__ = cljs.core.count(c__5501__auto__);
var b__17145 = cljs.core.chunk_buffer(size__5502__auto__);
if((function (){var i__17144 = (0);
while(true){
if((i__17144 < size__5502__auto__)){
var vec__17146 = cljs.core._nth(c__5501__auto__,i__17144);
var el = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17146,(0),null);
var adef = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17146,(1),null);
cljs.core.chunk_append(b__17145,(function (){
if((((!((adef == null))))?((((false) || ((cljs.core.PROTOCOL_SENTINEL === adef.shadow$animate$Animation$))))?true:(((!adef.cljs$lang$protocol_mask$partition$))?cljs.core.native_satisfies_QMARK_(shadow.animate.Animation,adef):false)):cljs.core.native_satisfies_QMARK_(shadow.animate.Animation,adef))){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("invalid animation",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"el","el",-1618201118),el,new cljs.core.Keyword(null,"animation","animation",-1248293244),adef], null));
}

var from = shadow.animate._animate_from(adef);
var to = shadow.animate._animate_to(adef);
var toggles = shadow.animate._animate_toggles(adef);
return (new shadow.animate.AnimationStep(shadow.dom.dom_node(el),cljs.core.clj__GT_js(from),cljs.core.clj__GT_js(to),cljs.core.clj__GT_js(toggles),shadow.animate.transition_string(duration,adef),null,null,null));
})()
);

var G__17780 = (i__17144 + (1));
i__17144 = G__17780;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__17145),shadow$animate$setup_$_iter__17142(cljs.core.chunk_rest(s__17143__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__17145),null);
}
} else {
var vec__17196 = cljs.core.first(s__17143__$2);
var el = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17196,(0),null);
var adef = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17196,(1),null);
return cljs.core.cons((function (){
if((((!((adef == null))))?((((false) || ((cljs.core.PROTOCOL_SENTINEL === adef.shadow$animate$Animation$))))?true:(((!adef.cljs$lang$protocol_mask$partition$))?cljs.core.native_satisfies_QMARK_(shadow.animate.Animation,adef):false)):cljs.core.native_satisfies_QMARK_(shadow.animate.Animation,adef))){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("invalid animation",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"el","el",-1618201118),el,new cljs.core.Keyword(null,"animation","animation",-1248293244),adef], null));
}

var from = shadow.animate._animate_from(adef);
var to = shadow.animate._animate_to(adef);
var toggles = shadow.animate._animate_toggles(adef);
return (new shadow.animate.AnimationStep(shadow.dom.dom_node(el),cljs.core.clj__GT_js(from),cljs.core.clj__GT_js(to),cljs.core.clj__GT_js(toggles),shadow.animate.transition_string(duration,adef),null,null,null));
})()
,shadow$animate$setup_$_iter__17142(cljs.core.rest(s__17143__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5503__auto__(elements);
})());
return (new shadow.animate.Animator(duration,items));
});
shadow.animate.continue_BANG_ = (function shadow$animate$continue_BANG_(animator){
shadow.animate.start_BANG_(animator);

var c__12782__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__12783__auto__ = (function (){var switch__12182__auto__ = (function (state_17249){
var state_val_17250 = (state_17249[(1)]);
if((state_val_17250 === (1))){
var inst_17239 = shadow.animate.get_duration(animator);
var inst_17244 = cljs.core.async.timeout(inst_17239);
var state_17249__$1 = state_17249;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_17249__$1,(2),inst_17244);
} else {
if((state_val_17250 === (2))){
var inst_17246 = (state_17249[(2)]);
var inst_17247 = shadow.animate.finish_BANG_(animator);
var state_17249__$1 = (function (){var statearr_17274 = state_17249;
(statearr_17274[(7)] = inst_17246);

(statearr_17274[(8)] = inst_17247);

return statearr_17274;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_17249__$1,new cljs.core.Keyword(null,"done","done",-889844188));
} else {
return null;
}
}
});
return (function() {
var shadow$animate$continue_BANG__$_state_machine__12183__auto__ = null;
var shadow$animate$continue_BANG__$_state_machine__12183__auto____0 = (function (){
var statearr_17275 = [null,null,null,null,null,null,null,null,null];
(statearr_17275[(0)] = shadow$animate$continue_BANG__$_state_machine__12183__auto__);

(statearr_17275[(1)] = (1));

return statearr_17275;
});
var shadow$animate$continue_BANG__$_state_machine__12183__auto____1 = (function (state_17249){
while(true){
var ret_value__12184__auto__ = (function (){try{while(true){
var result__12185__auto__ = switch__12182__auto__(state_17249);
if(cljs.core.keyword_identical_QMARK_(result__12185__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__12185__auto__;
}
break;
}
}catch (e17276){var ex__12186__auto__ = e17276;
var statearr_17277_17792 = state_17249;
(statearr_17277_17792[(2)] = ex__12186__auto__);


if(cljs.core.seq((state_17249[(4)]))){
var statearr_17278_17793 = state_17249;
(statearr_17278_17793[(1)] = cljs.core.first((state_17249[(4)])));

} else {
throw ex__12186__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__12184__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__17794 = state_17249;
state_17249 = G__17794;
continue;
} else {
return ret_value__12184__auto__;
}
break;
}
});
shadow$animate$continue_BANG__$_state_machine__12183__auto__ = function(state_17249){
switch(arguments.length){
case 0:
return shadow$animate$continue_BANG__$_state_machine__12183__auto____0.call(this);
case 1:
return shadow$animate$continue_BANG__$_state_machine__12183__auto____1.call(this,state_17249);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
shadow$animate$continue_BANG__$_state_machine__12183__auto__.cljs$core$IFn$_invoke$arity$0 = shadow$animate$continue_BANG__$_state_machine__12183__auto____0;
shadow$animate$continue_BANG__$_state_machine__12183__auto__.cljs$core$IFn$_invoke$arity$1 = shadow$animate$continue_BANG__$_state_machine__12183__auto____1;
return shadow$animate$continue_BANG__$_state_machine__12183__auto__;
})()
})();
var state__12784__auto__ = (function (){var statearr_17282 = f__12783__auto__();
(statearr_17282[(6)] = c__12782__auto__);

return statearr_17282;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__12784__auto__);
}));

return c__12782__auto__;
});
shadow.animate.start = (function shadow$animate$start(duration,elements){
var animator = shadow.animate.setup(duration,elements);
animator.shadow$animate$IAnimator$init_BANG_$arity$1(null);

return shadow.animate.continue_BANG_(animator);
});

/**
* @constructor
 * @implements {shadow.animate.Animation}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
shadow.animate.t_shadow$animate17297 = (function (attr,from,to,timing,delay,meta17298){
this.attr = attr;
this.from = from;
this.to = to;
this.timing = timing;
this.delay = delay;
this.meta17298 = meta17298;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(shadow.animate.t_shadow$animate17297.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_17299,meta17298__$1){
var self__ = this;
var _17299__$1 = this;
return (new shadow.animate.t_shadow$animate17297(self__.attr,self__.from,self__.to,self__.timing,self__.delay,meta17298__$1));
}));

(shadow.animate.t_shadow$animate17297.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_17299){
var self__ = this;
var _17299__$1 = this;
return self__.meta17298;
}));

(shadow.animate.t_shadow$animate17297.prototype.shadow$animate$Animation$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.animate.t_shadow$animate17297.prototype.shadow$animate$Animation$_animate_from$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.PersistentArrayMap.createAsIfByAssoc([self__.attr,self__.from]);
}));

(shadow.animate.t_shadow$animate17297.prototype.shadow$animate$Animation$_animate_to$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.PersistentArrayMap.createAsIfByAssoc([self__.attr,self__.to]);
}));

(shadow.animate.t_shadow$animate17297.prototype.shadow$animate$Animation$_animate_toggles$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.PersistentArrayMap.EMPTY;
}));

(shadow.animate.t_shadow$animate17297.prototype.shadow$animate$Animation$_animate_timings$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.PersistentArrayMap.createAsIfByAssoc([self__.attr,self__.timing]);
}));

(shadow.animate.t_shadow$animate17297.prototype.shadow$animate$Animation$_animate_delays$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.PersistentArrayMap.createAsIfByAssoc([self__.attr,self__.delay]);
}));

(shadow.animate.t_shadow$animate17297.getBasis = (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"attr","attr",1036399174,null),new cljs.core.Symbol(null,"from","from",-839142725,null),new cljs.core.Symbol(null,"to","to",1832630534,null),new cljs.core.Symbol(null,"timing","timing",-208693668,null),new cljs.core.Symbol(null,"delay","delay",1066306308,null),new cljs.core.Symbol(null,"meta17298","meta17298",-478562971,null)], null);
}));

(shadow.animate.t_shadow$animate17297.cljs$lang$type = true);

(shadow.animate.t_shadow$animate17297.cljs$lang$ctorStr = "shadow.animate/t_shadow$animate17297");

(shadow.animate.t_shadow$animate17297.cljs$lang$ctorPrWriter = (function (this__5310__auto__,writer__5311__auto__,opt__5312__auto__){
return cljs.core._write(writer__5311__auto__,"shadow.animate/t_shadow$animate17297");
}));

/**
 * Positional factory function for shadow.animate/t_shadow$animate17297.
 */
shadow.animate.__GT_t_shadow$animate17297 = (function shadow$animate$__GT_t_shadow$animate17297(attr,from,to,timing,delay,meta17298){
return (new shadow.animate.t_shadow$animate17297(attr,from,to,timing,delay,meta17298));
});


/**
 * transition the given attr from -> to using timing function and delay
 * timing defaults to ease, delay to 0
 */
shadow.animate.transition = (function shadow$animate$transition(var_args){
var G__17286 = arguments.length;
switch (G__17286) {
case 3:
return shadow.animate.transition.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return shadow.animate.transition.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return shadow.animate.transition.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.animate.transition.cljs$core$IFn$_invoke$arity$3 = (function (attr,from,to){
return shadow.animate.transition.cljs$core$IFn$_invoke$arity$5(attr,from,to,"ease",(0));
}));

(shadow.animate.transition.cljs$core$IFn$_invoke$arity$4 = (function (attr,from,to,timing){
return shadow.animate.transition.cljs$core$IFn$_invoke$arity$5(attr,from,to,timing,(0));
}));

(shadow.animate.transition.cljs$core$IFn$_invoke$arity$5 = (function (attr,from,to,timing,delay){
return (new shadow.animate.t_shadow$animate17297(attr,from,to,timing,delay,cljs.core.PersistentArrayMap.EMPTY));
}));

(shadow.animate.transition.cljs$lang$maxFixedArity = 5);


/**
* @constructor
 * @implements {shadow.animate.Animation}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
shadow.animate.t_shadow$animate17334 = (function (attr,from,to,meta17335){
this.attr = attr;
this.from = from;
this.to = to;
this.meta17335 = meta17335;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(shadow.animate.t_shadow$animate17334.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_17336,meta17335__$1){
var self__ = this;
var _17336__$1 = this;
return (new shadow.animate.t_shadow$animate17334(self__.attr,self__.from,self__.to,meta17335__$1));
}));

(shadow.animate.t_shadow$animate17334.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_17336){
var self__ = this;
var _17336__$1 = this;
return self__.meta17335;
}));

(shadow.animate.t_shadow$animate17334.prototype.shadow$animate$Animation$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.animate.t_shadow$animate17334.prototype.shadow$animate$Animation$_animate_to$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.PersistentArrayMap.EMPTY;
}));

(shadow.animate.t_shadow$animate17334.prototype.shadow$animate$Animation$_animate_from$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.PersistentArrayMap.createAsIfByAssoc([self__.attr,self__.from]);
}));

(shadow.animate.t_shadow$animate17334.prototype.shadow$animate$Animation$_animate_toggles$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.PersistentArrayMap.createAsIfByAssoc([self__.attr,self__.to]);
}));

(shadow.animate.t_shadow$animate17334.prototype.shadow$animate$Animation$_animate_timings$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.PersistentArrayMap.EMPTY;
}));

(shadow.animate.t_shadow$animate17334.prototype.shadow$animate$Animation$_animate_delays$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.PersistentArrayMap.EMPTY;
}));

(shadow.animate.t_shadow$animate17334.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"attr","attr",1036399174,null),new cljs.core.Symbol(null,"from","from",-839142725,null),new cljs.core.Symbol(null,"to","to",1832630534,null),new cljs.core.Symbol(null,"meta17335","meta17335",2033513338,null)], null);
}));

(shadow.animate.t_shadow$animate17334.cljs$lang$type = true);

(shadow.animate.t_shadow$animate17334.cljs$lang$ctorStr = "shadow.animate/t_shadow$animate17334");

(shadow.animate.t_shadow$animate17334.cljs$lang$ctorPrWriter = (function (this__5310__auto__,writer__5311__auto__,opt__5312__auto__){
return cljs.core._write(writer__5311__auto__,"shadow.animate/t_shadow$animate17334");
}));

/**
 * Positional factory function for shadow.animate/t_shadow$animate17334.
 */
shadow.animate.__GT_t_shadow$animate17334 = (function shadow$animate$__GT_t_shadow$animate17334(attr,from,to,meta17335){
return (new shadow.animate.t_shadow$animate17334(attr,from,to,meta17335));
});


shadow.animate.toggle = (function shadow$animate$toggle(attr,from,to){
return (new shadow.animate.t_shadow$animate17334(attr,from,to,cljs.core.PersistentArrayMap.EMPTY));
});

/**
* @constructor
 * @implements {shadow.animate.Animation}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
shadow.animate.t_shadow$animate17399 = (function (attrs,meta17400){
this.attrs = attrs;
this.meta17400 = meta17400;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(shadow.animate.t_shadow$animate17399.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_17401,meta17400__$1){
var self__ = this;
var _17401__$1 = this;
return (new shadow.animate.t_shadow$animate17399(self__.attrs,meta17400__$1));
}));

(shadow.animate.t_shadow$animate17399.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_17401){
var self__ = this;
var _17401__$1 = this;
return self__.meta17400;
}));

(shadow.animate.t_shadow$animate17399.prototype.shadow$animate$Animation$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.animate.t_shadow$animate17399.prototype.shadow$animate$Animation$_animate_to$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.PersistentArrayMap.EMPTY;
}));

(shadow.animate.t_shadow$animate17399.prototype.shadow$animate$Animation$_animate_from$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.attrs;
}));

(shadow.animate.t_shadow$animate17399.prototype.shadow$animate$Animation$_animate_toggles$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.PersistentArrayMap.EMPTY;
}));

(shadow.animate.t_shadow$animate17399.prototype.shadow$animate$Animation$_animate_timings$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.PersistentArrayMap.EMPTY;
}));

(shadow.animate.t_shadow$animate17399.prototype.shadow$animate$Animation$_animate_delays$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.PersistentArrayMap.EMPTY;
}));

(shadow.animate.t_shadow$animate17399.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"attrs","attrs",-450137186,null),new cljs.core.Symbol(null,"meta17400","meta17400",-360871335,null)], null);
}));

(shadow.animate.t_shadow$animate17399.cljs$lang$type = true);

(shadow.animate.t_shadow$animate17399.cljs$lang$ctorStr = "shadow.animate/t_shadow$animate17399");

(shadow.animate.t_shadow$animate17399.cljs$lang$ctorPrWriter = (function (this__5310__auto__,writer__5311__auto__,opt__5312__auto__){
return cljs.core._write(writer__5311__auto__,"shadow.animate/t_shadow$animate17399");
}));

/**
 * Positional factory function for shadow.animate/t_shadow$animate17399.
 */
shadow.animate.__GT_t_shadow$animate17399 = (function shadow$animate$__GT_t_shadow$animate17399(attrs,meta17400){
return (new shadow.animate.t_shadow$animate17399(attrs,meta17400));
});


/**
 * set attr to value when the animation starts
 */
shadow.animate.set_attr = (function shadow$animate$set_attr(var_args){
var G__17396 = arguments.length;
switch (G__17396) {
case 1:
return shadow.animate.set_attr.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.animate.set_attr.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.animate.set_attr.cljs$core$IFn$_invoke$arity$1 = (function (attrs){
return (new shadow.animate.t_shadow$animate17399(attrs,cljs.core.PersistentArrayMap.EMPTY));
}));

(shadow.animate.set_attr.cljs$core$IFn$_invoke$arity$2 = (function (attr,value){
return shadow.animate.set_attr.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.createAsIfByAssoc([attr,value]));
}));

(shadow.animate.set_attr.cljs$lang$maxFixedArity = 2);


/**
* @constructor
 * @implements {shadow.animate.Animation}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
shadow.animate.t_shadow$animate17417 = (function (attr,meta17418){
this.attr = attr;
this.meta17418 = meta17418;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(shadow.animate.t_shadow$animate17417.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_17419,meta17418__$1){
var self__ = this;
var _17419__$1 = this;
return (new shadow.animate.t_shadow$animate17417(self__.attr,meta17418__$1));
}));

(shadow.animate.t_shadow$animate17417.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_17419){
var self__ = this;
var _17419__$1 = this;
return self__.meta17418;
}));

(shadow.animate.t_shadow$animate17417.prototype.shadow$animate$Animation$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.animate.t_shadow$animate17417.prototype.shadow$animate$Animation$_animate_to$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.PersistentArrayMap.EMPTY;
}));

(shadow.animate.t_shadow$animate17417.prototype.shadow$animate$Animation$_animate_from$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.PersistentArrayMap.EMPTY;
}));

(shadow.animate.t_shadow$animate17417.prototype.shadow$animate$Animation$_animate_toggles$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.PersistentArrayMap.createAsIfByAssoc([self__.attr,null]);
}));

(shadow.animate.t_shadow$animate17417.prototype.shadow$animate$Animation$_animate_timings$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.PersistentArrayMap.EMPTY;
}));

(shadow.animate.t_shadow$animate17417.prototype.shadow$animate$Animation$_animate_delays$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.PersistentArrayMap.EMPTY;
}));

(shadow.animate.t_shadow$animate17417.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"attr","attr",1036399174,null),new cljs.core.Symbol(null,"meta17418","meta17418",948455394,null)], null);
}));

(shadow.animate.t_shadow$animate17417.cljs$lang$type = true);

(shadow.animate.t_shadow$animate17417.cljs$lang$ctorStr = "shadow.animate/t_shadow$animate17417");

(shadow.animate.t_shadow$animate17417.cljs$lang$ctorPrWriter = (function (this__5310__auto__,writer__5311__auto__,opt__5312__auto__){
return cljs.core._write(writer__5311__auto__,"shadow.animate/t_shadow$animate17417");
}));

/**
 * Positional factory function for shadow.animate/t_shadow$animate17417.
 */
shadow.animate.__GT_t_shadow$animate17417 = (function shadow$animate$__GT_t_shadow$animate17417(attr,meta17418){
return (new shadow.animate.t_shadow$animate17417(attr,meta17418));
});


/**
 * use to remove a given attribute style when the animation is finished
 * usually only needed to remove attributes we no longer need since they are probably
 * inherited and we only used for previous transitions
 */
shadow.animate.delete_attr = (function shadow$animate$delete_attr(attr){
return (new shadow.animate.t_shadow$animate17417(attr,cljs.core.PersistentArrayMap.EMPTY));
});

/**
* @constructor
 * @implements {shadow.animate.Animation}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
shadow.animate.t_shadow$animate17451 = (function (transitions,to,from,toggles,timings,delays,temp__5821__auto__,meta17452){
this.transitions = transitions;
this.to = to;
this.from = from;
this.toggles = toggles;
this.timings = timings;
this.delays = delays;
this.temp__5821__auto__ = temp__5821__auto__;
this.meta17452 = meta17452;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(shadow.animate.t_shadow$animate17451.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_17453,meta17452__$1){
var self__ = this;
var _17453__$1 = this;
return (new shadow.animate.t_shadow$animate17451(self__.transitions,self__.to,self__.from,self__.toggles,self__.timings,self__.delays,self__.temp__5821__auto__,meta17452__$1));
}));

(shadow.animate.t_shadow$animate17451.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_17453){
var self__ = this;
var _17453__$1 = this;
return self__.meta17452;
}));

(shadow.animate.t_shadow$animate17451.prototype.shadow$animate$Animation$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.animate.t_shadow$animate17451.prototype.shadow$animate$Animation$_animate_from$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.from;
}));

(shadow.animate.t_shadow$animate17451.prototype.shadow$animate$Animation$_animate_to$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.to;
}));

(shadow.animate.t_shadow$animate17451.prototype.shadow$animate$Animation$_animate_toggles$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.toggles;
}));

(shadow.animate.t_shadow$animate17451.prototype.shadow$animate$Animation$_animate_timings$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.timings;
}));

(shadow.animate.t_shadow$animate17451.prototype.shadow$animate$Animation$_animate_delays$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.delays;
}));

(shadow.animate.t_shadow$animate17451.getBasis = (function (){
return new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"transitions","transitions",-405684594,null),new cljs.core.Symbol(null,"to","to",1832630534,null),new cljs.core.Symbol(null,"from","from",-839142725,null),new cljs.core.Symbol(null,"toggles","toggles",-1576526290,null),new cljs.core.Symbol(null,"timings","timings",-569636600,null),new cljs.core.Symbol(null,"delays","delays",-873843187,null),new cljs.core.Symbol(null,"temp__5821__auto__","temp__5821__auto__",-711172737,null),new cljs.core.Symbol(null,"meta17452","meta17452",240436356,null)], null);
}));

(shadow.animate.t_shadow$animate17451.cljs$lang$type = true);

(shadow.animate.t_shadow$animate17451.cljs$lang$ctorStr = "shadow.animate/t_shadow$animate17451");

(shadow.animate.t_shadow$animate17451.cljs$lang$ctorPrWriter = (function (this__5310__auto__,writer__5311__auto__,opt__5312__auto__){
return cljs.core._write(writer__5311__auto__,"shadow.animate/t_shadow$animate17451");
}));

/**
 * Positional factory function for shadow.animate/t_shadow$animate17451.
 */
shadow.animate.__GT_t_shadow$animate17451 = (function shadow$animate$__GT_t_shadow$animate17451(transitions,to,from,toggles,timings,delays,temp__5821__auto__,meta17452){
return (new shadow.animate.t_shadow$animate17451(transitions,to,from,toggles,timings,delays,temp__5821__auto__,meta17452));
});



/**
* @constructor
 * @implements {shadow.animate.Animation}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
shadow.animate.t_shadow$animate17470 = (function (transitions,to,from,toggles,timings,delays,temp__5821__auto__,meta17471){
this.transitions = transitions;
this.to = to;
this.from = from;
this.toggles = toggles;
this.timings = timings;
this.delays = delays;
this.temp__5821__auto__ = temp__5821__auto__;
this.meta17471 = meta17471;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(shadow.animate.t_shadow$animate17470.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_17472,meta17471__$1){
var self__ = this;
var _17472__$1 = this;
return (new shadow.animate.t_shadow$animate17470(self__.transitions,self__.to,self__.from,self__.toggles,self__.timings,self__.delays,self__.temp__5821__auto__,meta17471__$1));
}));

(shadow.animate.t_shadow$animate17470.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_17472){
var self__ = this;
var _17472__$1 = this;
return self__.meta17471;
}));

(shadow.animate.t_shadow$animate17470.prototype.shadow$animate$Animation$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.animate.t_shadow$animate17470.prototype.shadow$animate$Animation$_animate_from$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.from;
}));

(shadow.animate.t_shadow$animate17470.prototype.shadow$animate$Animation$_animate_to$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.to;
}));

(shadow.animate.t_shadow$animate17470.prototype.shadow$animate$Animation$_animate_toggles$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.toggles;
}));

(shadow.animate.t_shadow$animate17470.prototype.shadow$animate$Animation$_animate_timings$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.timings;
}));

(shadow.animate.t_shadow$animate17470.prototype.shadow$animate$Animation$_animate_delays$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.delays;
}));

(shadow.animate.t_shadow$animate17470.getBasis = (function (){
return new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"transitions","transitions",-405684594,null),cljs.core.with_meta(new cljs.core.Symbol(null,"to","to",1832630534,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol(null,"any","any",-948528346,null)], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"from","from",-839142725,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol(null,"any","any",-948528346,null)], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"toggles","toggles",-1576526290,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol(null,"any","any",-948528346,null)], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"timings","timings",-569636600,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol(null,"any","any",-948528346,null)], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"delays","delays",-873843187,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol(null,"any","any",-948528346,null)], null)),new cljs.core.Symbol(null,"temp__5821__auto__","temp__5821__auto__",-711172737,null),new cljs.core.Symbol(null,"meta17471","meta17471",133416601,null)], null);
}));

(shadow.animate.t_shadow$animate17470.cljs$lang$type = true);

(shadow.animate.t_shadow$animate17470.cljs$lang$ctorStr = "shadow.animate/t_shadow$animate17470");

(shadow.animate.t_shadow$animate17470.cljs$lang$ctorPrWriter = (function (this__5310__auto__,writer__5311__auto__,opt__5312__auto__){
return cljs.core._write(writer__5311__auto__,"shadow.animate/t_shadow$animate17470");
}));

/**
 * Positional factory function for shadow.animate/t_shadow$animate17470.
 */
shadow.animate.__GT_t_shadow$animate17470 = (function shadow$animate$__GT_t_shadow$animate17470(transitions,to,from,toggles,timings,delays,temp__5821__auto__,meta17471){
return (new shadow.animate.t_shadow$animate17470(transitions,to,from,toggles,timings,delays,temp__5821__auto__,meta17471));
});


shadow.animate.combine = (function shadow$animate$combine(var_args){
var args__5755__auto__ = [];
var len__5749__auto___17847 = arguments.length;
var i__5750__auto___17848 = (0);
while(true){
if((i__5750__auto___17848 < len__5749__auto___17847)){
args__5755__auto__.push((arguments[i__5750__auto___17848]));

var G__17849 = (i__5750__auto___17848 + (1));
i__5750__auto___17848 = G__17849;
continue;
} else {
}
break;
}

var argseq__5756__auto__ = ((((0) < args__5755__auto__.length))?(new cljs.core.IndexedSeq(args__5755__auto__.slice((0)),(0),null)):null);
return shadow.animate.combine.cljs$core$IFn$_invoke$arity$variadic(argseq__5756__auto__);
});

(shadow.animate.combine.cljs$core$IFn$_invoke$arity$variadic = (function (transitions){
var to = cljs.core.PersistentArrayMap.EMPTY;
var from = cljs.core.PersistentArrayMap.EMPTY;
var toggles = cljs.core.PersistentArrayMap.EMPTY;
var timings = cljs.core.PersistentArrayMap.EMPTY;
var delays = cljs.core.PersistentArrayMap.EMPTY;
var transitions__$1 = transitions;
while(true){
var temp__5821__auto__ = cljs.core.first(transitions__$1);
if(cljs.core.truth_(temp__5821__auto__)){
var adef = temp__5821__auto__;
var G__17855 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([to,shadow.animate._animate_to(adef)], 0));
var G__17856 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([from,shadow.animate._animate_from(adef)], 0));
var G__17857 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([toggles,shadow.animate._animate_toggles(adef)], 0));
var G__17858 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([timings,shadow.animate._animate_timings(adef)], 0));
var G__17859 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([delays,shadow.animate._animate_delays(adef)], 0));
var G__17860 = cljs.core.rest(transitions__$1);
to = G__17855;
from = G__17856;
toggles = G__17857;
timings = G__17858;
delays = G__17859;
transitions__$1 = G__17860;
continue;
} else {
return (new shadow.animate.t_shadow$animate17470(transitions__$1,to,from,toggles,timings,delays,temp__5821__auto__,cljs.core.PersistentArrayMap.EMPTY));
}
break;
}
}));

(shadow.animate.combine.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(shadow.animate.combine.cljs$lang$applyTo = (function (seq17433){
var self__5735__auto__ = this;
return self__5735__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq17433));
}));

shadow.animate.fade_in = (function shadow$animate$fade_in(var_args){
var G__17488 = arguments.length;
switch (G__17488) {
case 0:
return shadow.animate.fade_in.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return shadow.animate.fade_in.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.animate.fade_in.cljs$core$IFn$_invoke$arity$0 = (function (){
return shadow.animate.fade_in.cljs$core$IFn$_invoke$arity$1("ease-in");
}));

(shadow.animate.fade_in.cljs$core$IFn$_invoke$arity$1 = (function (timing_function){
return shadow.animate.transition.cljs$core$IFn$_invoke$arity$4(new cljs.core.Keyword(null,"opacity","opacity",397153780),"0","1",timing_function);
}));

(shadow.animate.fade_in.cljs$lang$maxFixedArity = 1);

shadow.animate.fade_out = (function shadow$animate$fade_out(var_args){
var G__17497 = arguments.length;
switch (G__17497) {
case 0:
return shadow.animate.fade_out.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return shadow.animate.fade_out.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.animate.fade_out.cljs$core$IFn$_invoke$arity$0 = (function (){
return shadow.animate.fade_in.cljs$core$IFn$_invoke$arity$1("ease-out");
}));

(shadow.animate.fade_out.cljs$core$IFn$_invoke$arity$1 = (function (timing_function){
return shadow.animate.transition.cljs$core$IFn$_invoke$arity$4(new cljs.core.Keyword(null,"opacity","opacity",397153780),"1","0",timing_function);
}));

(shadow.animate.fade_out.cljs$lang$maxFixedArity = 1);

shadow.animate.vendor_prefix = goog.dom.vendor.getVendorPrefix();
shadow.animate.vendor_transform = cljs.core.keyword.cljs$core$IFn$_invoke$arity$1([cljs.core.str.cljs$core$IFn$_invoke$arity$1(shadow.animate.vendor_prefix),"-transform"].join(''));

/**
* @constructor
 * @implements {shadow.animate.Animation}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
shadow.animate.t_shadow$animate17521 = (function (from,to,timing,delay,meta17522){
this.from = from;
this.to = to;
this.timing = timing;
this.delay = delay;
this.meta17522 = meta17522;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(shadow.animate.t_shadow$animate17521.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_17523,meta17522__$1){
var self__ = this;
var _17523__$1 = this;
return (new shadow.animate.t_shadow$animate17521(self__.from,self__.to,self__.timing,self__.delay,meta17522__$1));
}));

(shadow.animate.t_shadow$animate17521.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_17523){
var self__ = this;
var _17523__$1 = this;
return self__.meta17522;
}));

(shadow.animate.t_shadow$animate17521.prototype.shadow$animate$Animation$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.animate.t_shadow$animate17521.prototype.shadow$animate$Animation$_animate_from$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"transform","transform",1381301764),["translateY(",cljs.core.str.cljs$core$IFn$_invoke$arity$1(self__.from),")"].join('')], null);
}));

(shadow.animate.t_shadow$animate17521.prototype.shadow$animate$Animation$_animate_to$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"transform","transform",1381301764),["translateY(",cljs.core.str.cljs$core$IFn$_invoke$arity$1(self__.to),")"].join('')], null);
}));

(shadow.animate.t_shadow$animate17521.prototype.shadow$animate$Animation$_animate_timings$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.PersistentArrayMap.createAsIfByAssoc([shadow.animate.vendor_transform,self__.timing]);
}));

(shadow.animate.t_shadow$animate17521.prototype.shadow$animate$Animation$_animate_toggles$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.PersistentArrayMap.EMPTY;
}));

(shadow.animate.t_shadow$animate17521.prototype.shadow$animate$Animation$_animate_delays$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.PersistentArrayMap.createAsIfByAssoc([shadow.animate.vendor_transform,self__.delay]);
}));

(shadow.animate.t_shadow$animate17521.getBasis = (function (){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"from","from",-839142725,null),new cljs.core.Symbol(null,"to","to",1832630534,null),new cljs.core.Symbol(null,"timing","timing",-208693668,null),new cljs.core.Symbol(null,"delay","delay",1066306308,null),new cljs.core.Symbol(null,"meta17522","meta17522",1196282139,null)], null);
}));

(shadow.animate.t_shadow$animate17521.cljs$lang$type = true);

(shadow.animate.t_shadow$animate17521.cljs$lang$ctorStr = "shadow.animate/t_shadow$animate17521");

(shadow.animate.t_shadow$animate17521.cljs$lang$ctorPrWriter = (function (this__5310__auto__,writer__5311__auto__,opt__5312__auto__){
return cljs.core._write(writer__5311__auto__,"shadow.animate/t_shadow$animate17521");
}));

/**
 * Positional factory function for shadow.animate/t_shadow$animate17521.
 */
shadow.animate.__GT_t_shadow$animate17521 = (function shadow$animate$__GT_t_shadow$animate17521(from,to,timing,delay,meta17522){
return (new shadow.animate.t_shadow$animate17521(from,to,timing,delay,meta17522));
});


shadow.animate.translate_y = (function shadow$animate$translate_y(var_args){
var G__17515 = arguments.length;
switch (G__17515) {
case 3:
return shadow.animate.translate_y.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return shadow.animate.translate_y.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.animate.translate_y.cljs$core$IFn$_invoke$arity$3 = (function (from,to,timing){
return shadow.animate.translate_y.cljs$core$IFn$_invoke$arity$4(from,to,timing,(0));
}));

(shadow.animate.translate_y.cljs$core$IFn$_invoke$arity$4 = (function (from,to,timing,delay){
return (new shadow.animate.t_shadow$animate17521(from,to,timing,delay,cljs.core.PersistentArrayMap.EMPTY));
}));

(shadow.animate.translate_y.cljs$lang$maxFixedArity = 4);


/**
* @constructor
 * @implements {shadow.animate.Animation}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
shadow.animate.t_shadow$animate17586 = (function (from,to,timing,delay,meta17587){
this.from = from;
this.to = to;
this.timing = timing;
this.delay = delay;
this.meta17587 = meta17587;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(shadow.animate.t_shadow$animate17586.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_17588,meta17587__$1){
var self__ = this;
var _17588__$1 = this;
return (new shadow.animate.t_shadow$animate17586(self__.from,self__.to,self__.timing,self__.delay,meta17587__$1));
}));

(shadow.animate.t_shadow$animate17586.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_17588){
var self__ = this;
var _17588__$1 = this;
return self__.meta17587;
}));

(shadow.animate.t_shadow$animate17586.prototype.shadow$animate$Animation$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.animate.t_shadow$animate17586.prototype.shadow$animate$Animation$_animate_from$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"transform","transform",1381301764),["translateX(",cljs.core.str.cljs$core$IFn$_invoke$arity$1(self__.from),")"].join('')], null);
}));

(shadow.animate.t_shadow$animate17586.prototype.shadow$animate$Animation$_animate_to$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"transform","transform",1381301764),["translateX(",cljs.core.str.cljs$core$IFn$_invoke$arity$1(self__.to),")"].join('')], null);
}));

(shadow.animate.t_shadow$animate17586.prototype.shadow$animate$Animation$_animate_timings$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.PersistentArrayMap.createAsIfByAssoc([shadow.animate.vendor_transform,self__.timing]);
}));

(shadow.animate.t_shadow$animate17586.prototype.shadow$animate$Animation$_animate_toggles$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.PersistentArrayMap.EMPTY;
}));

(shadow.animate.t_shadow$animate17586.prototype.shadow$animate$Animation$_animate_delays$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.PersistentArrayMap.createAsIfByAssoc([shadow.animate.vendor_transform,self__.delay]);
}));

(shadow.animate.t_shadow$animate17586.getBasis = (function (){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"from","from",-839142725,null),new cljs.core.Symbol(null,"to","to",1832630534,null),new cljs.core.Symbol(null,"timing","timing",-208693668,null),new cljs.core.Symbol(null,"delay","delay",1066306308,null),new cljs.core.Symbol(null,"meta17587","meta17587",797879791,null)], null);
}));

(shadow.animate.t_shadow$animate17586.cljs$lang$type = true);

(shadow.animate.t_shadow$animate17586.cljs$lang$ctorStr = "shadow.animate/t_shadow$animate17586");

(shadow.animate.t_shadow$animate17586.cljs$lang$ctorPrWriter = (function (this__5310__auto__,writer__5311__auto__,opt__5312__auto__){
return cljs.core._write(writer__5311__auto__,"shadow.animate/t_shadow$animate17586");
}));

/**
 * Positional factory function for shadow.animate/t_shadow$animate17586.
 */
shadow.animate.__GT_t_shadow$animate17586 = (function shadow$animate$__GT_t_shadow$animate17586(from,to,timing,delay,meta17587){
return (new shadow.animate.t_shadow$animate17586(from,to,timing,delay,meta17587));
});


shadow.animate.translate_x = (function shadow$animate$translate_x(var_args){
var G__17579 = arguments.length;
switch (G__17579) {
case 3:
return shadow.animate.translate_x.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return shadow.animate.translate_x.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.animate.translate_x.cljs$core$IFn$_invoke$arity$3 = (function (from,to,timing){
return shadow.animate.translate_x.cljs$core$IFn$_invoke$arity$4(from,to,timing,(0));
}));

(shadow.animate.translate_x.cljs$core$IFn$_invoke$arity$4 = (function (from,to,timing,delay){
return (new shadow.animate.t_shadow$animate17586(from,to,timing,delay,cljs.core.PersistentArrayMap.EMPTY));
}));

(shadow.animate.translate_x.cljs$lang$maxFixedArity = 4);


//# sourceMappingURL=shadow.animate.js.map
