goog.provide('cljs.core.async');
goog.scope(function(){
  cljs.core.async.goog$module$goog$array = goog.module.get('goog.array');
});

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async14721 = (function (f,blockable,meta14722){
this.f = f;
this.blockable = blockable;
this.meta14722 = meta14722;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async14721.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_14723,meta14722__$1){
var self__ = this;
var _14723__$1 = this;
return (new cljs.core.async.t_cljs$core$async14721(self__.f,self__.blockable,meta14722__$1));
}));

(cljs.core.async.t_cljs$core$async14721.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_14723){
var self__ = this;
var _14723__$1 = this;
return self__.meta14722;
}));

(cljs.core.async.t_cljs$core$async14721.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async14721.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async14721.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.blockable;
}));

(cljs.core.async.t_cljs$core$async14721.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.f;
}));

(cljs.core.async.t_cljs$core$async14721.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"blockable","blockable",-28395259,null),new cljs.core.Symbol(null,"meta14722","meta14722",-139408660,null)], null);
}));

(cljs.core.async.t_cljs$core$async14721.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async14721.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async14721");

(cljs.core.async.t_cljs$core$async14721.cljs$lang$ctorPrWriter = (function (this__5310__auto__,writer__5311__auto__,opt__5312__auto__){
return cljs.core._write(writer__5311__auto__,"cljs.core.async/t_cljs$core$async14721");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async14721.
 */
cljs.core.async.__GT_t_cljs$core$async14721 = (function cljs$core$async$__GT_t_cljs$core$async14721(f,blockable,meta14722){
return (new cljs.core.async.t_cljs$core$async14721(f,blockable,meta14722));
});


cljs.core.async.fn_handler = (function cljs$core$async$fn_handler(var_args){
var G__14717 = arguments.length;
switch (G__14717) {
case 1:
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1 = (function (f){
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2(f,true);
}));

(cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2 = (function (f,blockable){
return (new cljs.core.async.t_cljs$core$async14721(f,blockable,cljs.core.PersistentArrayMap.EMPTY));
}));

(cljs.core.async.fn_handler.cljs$lang$maxFixedArity = 2);

/**
 * Returns a fixed buffer of size n. When full, puts will block/park.
 */
cljs.core.async.buffer = (function cljs$core$async$buffer(n){
return cljs.core.async.impl.buffers.fixed_buffer(n);
});
/**
 * Returns a buffer of size n. When full, puts will complete but
 *   val will be dropped (no transfer).
 */
cljs.core.async.dropping_buffer = (function cljs$core$async$dropping_buffer(n){
return cljs.core.async.impl.buffers.dropping_buffer(n);
});
/**
 * Returns a buffer of size n. When full, puts will complete, and be
 *   buffered, but oldest elements in buffer will be dropped (not
 *   transferred).
 */
cljs.core.async.sliding_buffer = (function cljs$core$async$sliding_buffer(n){
return cljs.core.async.impl.buffers.sliding_buffer(n);
});
/**
 * Returns true if a channel created with buff will never block. That is to say,
 * puts into this buffer will never cause the buffer to be full. 
 */
cljs.core.async.unblocking_buffer_QMARK_ = (function cljs$core$async$unblocking_buffer_QMARK_(buff){
if((!((buff == null)))){
if(((false) || ((cljs.core.PROTOCOL_SENTINEL === buff.cljs$core$async$impl$protocols$UnblockingBuffer$)))){
return true;
} else {
if((!buff.cljs$lang$protocol_mask$partition$)){
return cljs.core.native_satisfies_QMARK_(cljs.core.async.impl.protocols.UnblockingBuffer,buff);
} else {
return false;
}
}
} else {
return cljs.core.native_satisfies_QMARK_(cljs.core.async.impl.protocols.UnblockingBuffer,buff);
}
});
/**
 * Creates a channel with an optional buffer, an optional transducer (like (map f),
 *   (filter p) etc or a composition thereof), and an optional exception handler.
 *   If buf-or-n is a number, will create and use a fixed buffer of that size. If a
 *   transducer is supplied a buffer must be specified. ex-handler must be a
 *   fn of one argument - if an exception occurs during transformation it will be called
 *   with the thrown value as an argument, and any non-nil return value will be placed
 *   in the channel.
 */
cljs.core.async.chan = (function cljs$core$async$chan(var_args){
var G__14760 = arguments.length;
switch (G__14760) {
case 0:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(null);
}));

(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1 = (function (buf_or_n){
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3(buf_or_n,null,null);
}));

(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2 = (function (buf_or_n,xform){
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3(buf_or_n,xform,null);
}));

(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3 = (function (buf_or_n,xform,ex_handler){
var buf_or_n__$1 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(buf_or_n,(0)))?null:buf_or_n);
if(cljs.core.truth_(xform)){
if(cljs.core.truth_(buf_or_n__$1)){
} else {
throw (new Error(["Assert failed: ","buffer must be supplied when transducer is","\n","buf-or-n"].join('')));
}
} else {
}

return cljs.core.async.impl.channels.chan.cljs$core$IFn$_invoke$arity$3(((typeof buf_or_n__$1 === 'number')?cljs.core.async.buffer(buf_or_n__$1):buf_or_n__$1),xform,ex_handler);
}));

(cljs.core.async.chan.cljs$lang$maxFixedArity = 3);

/**
 * Creates a promise channel with an optional transducer, and an optional
 *   exception-handler. A promise channel can take exactly one value that consumers
 *   will receive. Once full, puts complete but val is dropped (no transfer).
 *   Consumers will block until either a value is placed in the channel or the
 *   channel is closed, then return the value (or nil) forever. See chan for the
 *   semantics of xform and ex-handler.
 */
cljs.core.async.promise_chan = (function cljs$core$async$promise_chan(var_args){
var G__14789 = arguments.length;
switch (G__14789) {
case 0:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$1(null);
}));

(cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$1 = (function (xform){
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$2(xform,null);
}));

(cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$2 = (function (xform,ex_handler){
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3(cljs.core.async.impl.buffers.promise_buffer(),xform,ex_handler);
}));

(cljs.core.async.promise_chan.cljs$lang$maxFixedArity = 2);

/**
 * Returns a channel that will close after msecs
 */
cljs.core.async.timeout = (function cljs$core$async$timeout(msecs){
return cljs.core.async.impl.timers.timeout(msecs);
});
/**
 * takes a val from port. Must be called inside a (go ...) block. Will
 *   return nil if closed. Will park if nothing is available.
 *   Returns true unless port is already closed
 */
cljs.core.async._LT__BANG_ = (function cljs$core$async$_LT__BANG_(port){
throw (new Error("<! used not in (go ...) block"));
});
/**
 * Asynchronously takes a val from port, passing to fn1. Will pass nil
 * if closed. If on-caller? (default true) is true, and value is
 * immediately available, will call fn1 on calling thread.
 * Returns nil.
 */
cljs.core.async.take_BANG_ = (function cljs$core$async$take_BANG_(var_args){
var G__14822 = arguments.length;
switch (G__14822) {
case 2:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,fn1){
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3(port,fn1,true);
}));

(cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,fn1,on_caller_QMARK_){
var ret = cljs.core.async.impl.protocols.take_BANG_(port,cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1(fn1));
if(cljs.core.truth_(ret)){
var val_18298 = cljs.core.deref(ret);
if(cljs.core.truth_(on_caller_QMARK_)){
(fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(val_18298) : fn1.call(null,val_18298));
} else {
cljs.core.async.impl.dispatch.run((function (){
return (fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(val_18298) : fn1.call(null,val_18298));
}));
}
} else {
}

return null;
}));

(cljs.core.async.take_BANG_.cljs$lang$maxFixedArity = 3);

cljs.core.async.nop = (function cljs$core$async$nop(_){
return null;
});
cljs.core.async.fhnop = cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1(cljs.core.async.nop);
/**
 * puts a val into port. nil values are not allowed. Must be called
 *   inside a (go ...) block. Will park if no buffer space is available.
 *   Returns true unless port is already closed.
 */
cljs.core.async._GT__BANG_ = (function cljs$core$async$_GT__BANG_(port,val){
throw (new Error(">! used not in (go ...) block"));
});
/**
 * Asynchronously puts a val into port, calling fn1 (if supplied) when
 * complete. nil values are not allowed. Will throw if closed. If
 * on-caller? (default true) is true, and the put is immediately
 * accepted, will call fn1 on calling thread.  Returns nil.
 */
cljs.core.async.put_BANG_ = (function cljs$core$async$put_BANG_(var_args){
var G__14869 = arguments.length;
switch (G__14869) {
case 2:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,val){
var temp__5821__auto__ = cljs.core.async.impl.protocols.put_BANG_(port,val,cljs.core.async.fhnop);
if(cljs.core.truth_(temp__5821__auto__)){
var ret = temp__5821__auto__;
return cljs.core.deref(ret);
} else {
return true;
}
}));

(cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,val,fn1){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4(port,val,fn1,true);
}));

(cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4 = (function (port,val,fn1,on_caller_QMARK_){
var temp__5821__auto__ = cljs.core.async.impl.protocols.put_BANG_(port,val,cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1(fn1));
if(cljs.core.truth_(temp__5821__auto__)){
var retb = temp__5821__auto__;
var ret = cljs.core.deref(retb);
if(cljs.core.truth_(on_caller_QMARK_)){
(fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(ret) : fn1.call(null,ret));
} else {
cljs.core.async.impl.dispatch.run((function (){
return (fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(ret) : fn1.call(null,ret));
}));
}

return ret;
} else {
return true;
}
}));

(cljs.core.async.put_BANG_.cljs$lang$maxFixedArity = 4);

cljs.core.async.close_BANG_ = (function cljs$core$async$close_BANG_(port){
return cljs.core.async.impl.protocols.close_BANG_(port);
});
cljs.core.async.random_array = (function cljs$core$async$random_array(n){
var a = (new Array(n));
var n__5616__auto___18303 = n;
var x_18304 = (0);
while(true){
if((x_18304 < n__5616__auto___18303)){
(a[x_18304] = x_18304);

var G__18305 = (x_18304 + (1));
x_18304 = G__18305;
continue;
} else {
}
break;
}

cljs.core.async.goog$module$goog$array.shuffle(a);

return a;
});

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async14901 = (function (flag,meta14903){
this.flag = flag;
this.meta14903 = meta14903;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async14901.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_14904,meta14903__$1){
var self__ = this;
var _14904__$1 = this;
return (new cljs.core.async.t_cljs$core$async14901(self__.flag,meta14903__$1));
}));

(cljs.core.async.t_cljs$core$async14901.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_14904){
var self__ = this;
var _14904__$1 = this;
return self__.meta14903;
}));

(cljs.core.async.t_cljs$core$async14901.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async14901.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.deref(self__.flag);
}));

(cljs.core.async.t_cljs$core$async14901.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async14901.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_(self__.flag,null);

return true;
}));

(cljs.core.async.t_cljs$core$async14901.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"meta14903","meta14903",-474103657,null)], null);
}));

(cljs.core.async.t_cljs$core$async14901.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async14901.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async14901");

(cljs.core.async.t_cljs$core$async14901.cljs$lang$ctorPrWriter = (function (this__5310__auto__,writer__5311__auto__,opt__5312__auto__){
return cljs.core._write(writer__5311__auto__,"cljs.core.async/t_cljs$core$async14901");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async14901.
 */
cljs.core.async.__GT_t_cljs$core$async14901 = (function cljs$core$async$__GT_t_cljs$core$async14901(flag,meta14903){
return (new cljs.core.async.t_cljs$core$async14901(flag,meta14903));
});


cljs.core.async.alt_flag = (function cljs$core$async$alt_flag(){
var flag = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(true);
return (new cljs.core.async.t_cljs$core$async14901(flag,cljs.core.PersistentArrayMap.EMPTY));
});

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async14939 = (function (flag,cb,meta14940){
this.flag = flag;
this.cb = cb;
this.meta14940 = meta14940;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async14939.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_14941,meta14940__$1){
var self__ = this;
var _14941__$1 = this;
return (new cljs.core.async.t_cljs$core$async14939(self__.flag,self__.cb,meta14940__$1));
}));

(cljs.core.async.t_cljs$core$async14939.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_14941){
var self__ = this;
var _14941__$1 = this;
return self__.meta14940;
}));

(cljs.core.async.t_cljs$core$async14939.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async14939.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.active_QMARK_(self__.flag);
}));

(cljs.core.async.t_cljs$core$async14939.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async14939.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.async.impl.protocols.commit(self__.flag);

return self__.cb;
}));

(cljs.core.async.t_cljs$core$async14939.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"cb","cb",-2064487928,null),new cljs.core.Symbol(null,"meta14940","meta14940",613220274,null)], null);
}));

(cljs.core.async.t_cljs$core$async14939.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async14939.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async14939");

(cljs.core.async.t_cljs$core$async14939.cljs$lang$ctorPrWriter = (function (this__5310__auto__,writer__5311__auto__,opt__5312__auto__){
return cljs.core._write(writer__5311__auto__,"cljs.core.async/t_cljs$core$async14939");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async14939.
 */
cljs.core.async.__GT_t_cljs$core$async14939 = (function cljs$core$async$__GT_t_cljs$core$async14939(flag,cb,meta14940){
return (new cljs.core.async.t_cljs$core$async14939(flag,cb,meta14940));
});


cljs.core.async.alt_handler = (function cljs$core$async$alt_handler(flag,cb){
return (new cljs.core.async.t_cljs$core$async14939(flag,cb,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * returns derefable [val port] if immediate, nil if enqueued
 */
cljs.core.async.do_alts = (function cljs$core$async$do_alts(fret,ports,opts){
if((cljs.core.count(ports) > (0))){
} else {
throw (new Error(["Assert failed: ","alts must have at least one channel operation","\n","(pos? (count ports))"].join('')));
}

var flag = cljs.core.async.alt_flag();
var ports__$1 = cljs.core.vec(ports);
var n = cljs.core.count(ports__$1);
var _ = (function (){var i = (0);
while(true){
if((i < n)){
var port_18313 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(ports__$1,i);
if(cljs.core.vector_QMARK_(port_18313)){
if((!(((port_18313.cljs$core$IFn$_invoke$arity$1 ? port_18313.cljs$core$IFn$_invoke$arity$1((1)) : port_18313.call(null,(1))) == null)))){
} else {
throw (new Error(["Assert failed: ","can't put nil on channel","\n","(some? (port 1))"].join('')));
}
} else {
}

var G__18318 = (i + (1));
i = G__18318;
continue;
} else {
return null;
}
break;
}
})();
var idxs = cljs.core.async.random_array(n);
var priority = new cljs.core.Keyword(null,"priority","priority",1431093715).cljs$core$IFn$_invoke$arity$1(opts);
var ret = (function (){var i = (0);
while(true){
if((i < n)){
var idx = (cljs.core.truth_(priority)?i:(idxs[i]));
var port = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(ports__$1,idx);
var wport = ((cljs.core.vector_QMARK_(port))?(port.cljs$core$IFn$_invoke$arity$1 ? port.cljs$core$IFn$_invoke$arity$1((0)) : port.call(null,(0))):null);
var vbox = (cljs.core.truth_(wport)?(function (){var val = (port.cljs$core$IFn$_invoke$arity$1 ? port.cljs$core$IFn$_invoke$arity$1((1)) : port.call(null,(1)));
return cljs.core.async.impl.protocols.put_BANG_(wport,val,cljs.core.async.alt_handler(flag,((function (i,val,idx,port,wport,flag,ports__$1,n,_,idxs,priority){
return (function (p1__15032_SHARP_){
var G__15048 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__15032_SHARP_,wport], null);
return (fret.cljs$core$IFn$_invoke$arity$1 ? fret.cljs$core$IFn$_invoke$arity$1(G__15048) : fret.call(null,G__15048));
});})(i,val,idx,port,wport,flag,ports__$1,n,_,idxs,priority))
));
})():cljs.core.async.impl.protocols.take_BANG_(port,cljs.core.async.alt_handler(flag,((function (i,idx,port,wport,flag,ports__$1,n,_,idxs,priority){
return (function (p1__15033_SHARP_){
var G__15051 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__15033_SHARP_,port], null);
return (fret.cljs$core$IFn$_invoke$arity$1 ? fret.cljs$core$IFn$_invoke$arity$1(G__15051) : fret.call(null,G__15051));
});})(i,idx,port,wport,flag,ports__$1,n,_,idxs,priority))
)));
if(cljs.core.truth_(vbox)){
return cljs.core.async.impl.channels.box(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.deref(vbox),(function (){var or__5025__auto__ = wport;
if(cljs.core.truth_(or__5025__auto__)){
return or__5025__auto__;
} else {
return port;
}
})()], null));
} else {
var G__18322 = (i + (1));
i = G__18322;
continue;
}
} else {
return null;
}
break;
}
})();
var or__5025__auto__ = ret;
if(cljs.core.truth_(or__5025__auto__)){
return or__5025__auto__;
} else {
if(cljs.core.contains_QMARK_(opts,new cljs.core.Keyword(null,"default","default",-1987822328))){
var temp__5823__auto__ = (function (){var and__5023__auto__ = flag.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1(null);
if(cljs.core.truth_(and__5023__auto__)){
return flag.cljs$core$async$impl$protocols$Handler$commit$arity$1(null);
} else {
return and__5023__auto__;
}
})();
if(cljs.core.truth_(temp__5823__auto__)){
var got = temp__5823__auto__;
return cljs.core.async.impl.channels.box(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"default","default",-1987822328).cljs$core$IFn$_invoke$arity$1(opts),new cljs.core.Keyword(null,"default","default",-1987822328)], null));
} else {
return null;
}
} else {
return null;
}
}
});
/**
 * Completes at most one of several channel operations. Must be called
 * inside a (go ...) block. ports is a vector of channel endpoints,
 * which can be either a channel to take from or a vector of
 *   [channel-to-put-to val-to-put], in any combination. Takes will be
 *   made as if by <!, and puts will be made as if by >!. Unless
 *   the :priority option is true, if more than one port operation is
 *   ready a non-deterministic choice will be made. If no operation is
 *   ready and a :default value is supplied, [default-val :default] will
 *   be returned, otherwise alts! will park until the first operation to
 *   become ready completes. Returns [val port] of the completed
 *   operation, where val is the value taken for takes, and a
 *   boolean (true unless already closed, as per put!) for puts.
 * 
 *   opts are passed as :key val ... Supported options:
 * 
 *   :default val - the value to use if none of the operations are immediately ready
 *   :priority true - (default nil) when true, the operations will be tried in order.
 * 
 *   Note: there is no guarantee that the port exps or val exprs will be
 *   used, nor in what order should they be, so they should not be
 *   depended upon for side effects.
 */
cljs.core.async.alts_BANG_ = (function cljs$core$async$alts_BANG_(var_args){
var args__5755__auto__ = [];
var len__5749__auto___18326 = arguments.length;
var i__5750__auto___18327 = (0);
while(true){
if((i__5750__auto___18327 < len__5749__auto___18326)){
args__5755__auto__.push((arguments[i__5750__auto___18327]));

var G__18328 = (i__5750__auto___18327 + (1));
i__5750__auto___18327 = G__18328;
continue;
} else {
}
break;
}

var argseq__5756__auto__ = ((((1) < args__5755__auto__.length))?(new cljs.core.IndexedSeq(args__5755__auto__.slice((1)),(0),null)):null);
return cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5756__auto__);
});

(cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (ports,p__15074){
var map__15075 = p__15074;
var map__15075__$1 = cljs.core.__destructure_map(map__15075);
var opts = map__15075__$1;
throw (new Error("alts! used not in (go ...) block"));
}));

(cljs.core.async.alts_BANG_.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(cljs.core.async.alts_BANG_.cljs$lang$applyTo = (function (seq15065){
var G__15066 = cljs.core.first(seq15065);
var seq15065__$1 = cljs.core.next(seq15065);
var self__5734__auto__ = this;
return self__5734__auto__.cljs$core$IFn$_invoke$arity$variadic(G__15066,seq15065__$1);
}));

/**
 * Puts a val into port if it's possible to do so immediately.
 *   nil values are not allowed. Never blocks. Returns true if offer succeeds.
 */
cljs.core.async.offer_BANG_ = (function cljs$core$async$offer_BANG_(port,val){
var ret = cljs.core.async.impl.protocols.put_BANG_(port,val,cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2(cljs.core.async.nop,false));
if(cljs.core.truth_(ret)){
return cljs.core.deref(ret);
} else {
return null;
}
});
/**
 * Takes a val from port if it's possible to do so immediately.
 *   Never blocks. Returns value if successful, nil otherwise.
 */
cljs.core.async.poll_BANG_ = (function cljs$core$async$poll_BANG_(port){
var ret = cljs.core.async.impl.protocols.take_BANG_(port,cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2(cljs.core.async.nop,false));
if(cljs.core.truth_(ret)){
return cljs.core.deref(ret);
} else {
return null;
}
});
/**
 * Takes elements from the from channel and supplies them to the to
 * channel. By default, the to channel will be closed when the from
 * channel closes, but can be determined by the close?  parameter. Will
 * stop consuming the from channel if the to channel closes
 */
cljs.core.async.pipe = (function cljs$core$async$pipe(var_args){
var G__15117 = arguments.length;
switch (G__15117) {
case 2:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2 = (function (from,to){
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3(from,to,true);
}));

(cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3 = (function (from,to,close_QMARK_){
var c__14559__auto___18330 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__14560__auto__ = (function (){var switch__13986__auto__ = (function (state_15213){
var state_val_15214 = (state_15213[(1)]);
if((state_val_15214 === (7))){
var inst_15208 = (state_15213[(2)]);
var state_15213__$1 = state_15213;
var statearr_15224_18331 = state_15213__$1;
(statearr_15224_18331[(2)] = inst_15208);

(statearr_15224_18331[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15214 === (1))){
var state_15213__$1 = state_15213;
var statearr_15225_18332 = state_15213__$1;
(statearr_15225_18332[(2)] = null);

(statearr_15225_18332[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15214 === (4))){
var inst_15163 = (state_15213[(7)]);
var inst_15163__$1 = (state_15213[(2)]);
var inst_15164 = (inst_15163__$1 == null);
var state_15213__$1 = (function (){var statearr_15226 = state_15213;
(statearr_15226[(7)] = inst_15163__$1);

return statearr_15226;
})();
if(cljs.core.truth_(inst_15164)){
var statearr_15227_18333 = state_15213__$1;
(statearr_15227_18333[(1)] = (5));

} else {
var statearr_15228_18334 = state_15213__$1;
(statearr_15228_18334[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15214 === (13))){
var state_15213__$1 = state_15213;
var statearr_15243_18335 = state_15213__$1;
(statearr_15243_18335[(2)] = null);

(statearr_15243_18335[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15214 === (6))){
var inst_15163 = (state_15213[(7)]);
var state_15213__$1 = state_15213;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_15213__$1,(11),to,inst_15163);
} else {
if((state_val_15214 === (3))){
var inst_15210 = (state_15213[(2)]);
var state_15213__$1 = state_15213;
return cljs.core.async.impl.ioc_helpers.return_chan(state_15213__$1,inst_15210);
} else {
if((state_val_15214 === (12))){
var state_15213__$1 = state_15213;
var statearr_15255_18336 = state_15213__$1;
(statearr_15255_18336[(2)] = null);

(statearr_15255_18336[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15214 === (2))){
var state_15213__$1 = state_15213;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_15213__$1,(4),from);
} else {
if((state_val_15214 === (11))){
var inst_15200 = (state_15213[(2)]);
var state_15213__$1 = state_15213;
if(cljs.core.truth_(inst_15200)){
var statearr_15266_18337 = state_15213__$1;
(statearr_15266_18337[(1)] = (12));

} else {
var statearr_15267_18338 = state_15213__$1;
(statearr_15267_18338[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15214 === (9))){
var state_15213__$1 = state_15213;
var statearr_15268_18339 = state_15213__$1;
(statearr_15268_18339[(2)] = null);

(statearr_15268_18339[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15214 === (5))){
var state_15213__$1 = state_15213;
if(cljs.core.truth_(close_QMARK_)){
var statearr_15269_18340 = state_15213__$1;
(statearr_15269_18340[(1)] = (8));

} else {
var statearr_15273_18341 = state_15213__$1;
(statearr_15273_18341[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15214 === (14))){
var inst_15206 = (state_15213[(2)]);
var state_15213__$1 = state_15213;
var statearr_15278_18342 = state_15213__$1;
(statearr_15278_18342[(2)] = inst_15206);

(statearr_15278_18342[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15214 === (10))){
var inst_15174 = (state_15213[(2)]);
var state_15213__$1 = state_15213;
var statearr_15313_18343 = state_15213__$1;
(statearr_15313_18343[(2)] = inst_15174);

(statearr_15313_18343[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15214 === (8))){
var inst_15168 = cljs.core.async.close_BANG_(to);
var state_15213__$1 = state_15213;
var statearr_15314_18345 = state_15213__$1;
(statearr_15314_18345[(2)] = inst_15168);

(statearr_15314_18345[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__13987__auto__ = null;
var cljs$core$async$state_machine__13987__auto____0 = (function (){
var statearr_15319 = [null,null,null,null,null,null,null,null];
(statearr_15319[(0)] = cljs$core$async$state_machine__13987__auto__);

(statearr_15319[(1)] = (1));

return statearr_15319;
});
var cljs$core$async$state_machine__13987__auto____1 = (function (state_15213){
while(true){
var ret_value__13988__auto__ = (function (){try{while(true){
var result__13989__auto__ = switch__13986__auto__(state_15213);
if(cljs.core.keyword_identical_QMARK_(result__13989__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__13989__auto__;
}
break;
}
}catch (e15320){var ex__13990__auto__ = e15320;
var statearr_15324_18347 = state_15213;
(statearr_15324_18347[(2)] = ex__13990__auto__);


if(cljs.core.seq((state_15213[(4)]))){
var statearr_15328_18348 = state_15213;
(statearr_15328_18348[(1)] = cljs.core.first((state_15213[(4)])));

} else {
throw ex__13990__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__13988__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__18349 = state_15213;
state_15213 = G__18349;
continue;
} else {
return ret_value__13988__auto__;
}
break;
}
});
cljs$core$async$state_machine__13987__auto__ = function(state_15213){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__13987__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__13987__auto____1.call(this,state_15213);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__13987__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__13987__auto____0;
cljs$core$async$state_machine__13987__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__13987__auto____1;
return cljs$core$async$state_machine__13987__auto__;
})()
})();
var state__14561__auto__ = (function (){var statearr_15336 = f__14560__auto__();
(statearr_15336[(6)] = c__14559__auto___18330);

return statearr_15336;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__14561__auto__);
}));


return to;
}));

(cljs.core.async.pipe.cljs$lang$maxFixedArity = 3);

cljs.core.async.pipeline_STAR_ = (function cljs$core$async$pipeline_STAR_(n,to,xf,from,close_QMARK_,ex_handler,type){
if((n > (0))){
} else {
throw (new Error("Assert failed: (pos? n)"));
}

var jobs = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(n);
var results = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(n);
var process__$1 = (function (p__15346){
var vec__15347 = p__15346;
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15347,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15347,(1),null);
var job = vec__15347;
if((job == null)){
cljs.core.async.close_BANG_(results);

return null;
} else {
var res = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3((1),xf,ex_handler);
var c__14559__auto___18358 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__14560__auto__ = (function (){var switch__13986__auto__ = (function (state_15354){
var state_val_15355 = (state_15354[(1)]);
if((state_val_15355 === (1))){
var state_15354__$1 = state_15354;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_15354__$1,(2),res,v);
} else {
if((state_val_15355 === (2))){
var inst_15351 = (state_15354[(2)]);
var inst_15352 = cljs.core.async.close_BANG_(res);
var state_15354__$1 = (function (){var statearr_15356 = state_15354;
(statearr_15356[(7)] = inst_15351);

return statearr_15356;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_15354__$1,inst_15352);
} else {
return null;
}
}
});
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__13987__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__13987__auto____0 = (function (){
var statearr_15357 = [null,null,null,null,null,null,null,null];
(statearr_15357[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__13987__auto__);

(statearr_15357[(1)] = (1));

return statearr_15357;
});
var cljs$core$async$pipeline_STAR__$_state_machine__13987__auto____1 = (function (state_15354){
while(true){
var ret_value__13988__auto__ = (function (){try{while(true){
var result__13989__auto__ = switch__13986__auto__(state_15354);
if(cljs.core.keyword_identical_QMARK_(result__13989__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__13989__auto__;
}
break;
}
}catch (e15361){var ex__13990__auto__ = e15361;
var statearr_15362_18362 = state_15354;
(statearr_15362_18362[(2)] = ex__13990__auto__);


if(cljs.core.seq((state_15354[(4)]))){
var statearr_15376_18366 = state_15354;
(statearr_15376_18366[(1)] = cljs.core.first((state_15354[(4)])));

} else {
throw ex__13990__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__13988__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__18367 = state_15354;
state_15354 = G__18367;
continue;
} else {
return ret_value__13988__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__13987__auto__ = function(state_15354){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__13987__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__13987__auto____1.call(this,state_15354);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__13987__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__13987__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__13987__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__13987__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__13987__auto__;
})()
})();
var state__14561__auto__ = (function (){var statearr_15380 = f__14560__auto__();
(statearr_15380[(6)] = c__14559__auto___18358);

return statearr_15380;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__14561__auto__);
}));


cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(p,res);

return true;
}
});
var async = (function (p__15383){
var vec__15384 = p__15383;
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15384,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15384,(1),null);
var job = vec__15384;
if((job == null)){
cljs.core.async.close_BANG_(results);

return null;
} else {
var res = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
(xf.cljs$core$IFn$_invoke$arity$2 ? xf.cljs$core$IFn$_invoke$arity$2(v,res) : xf.call(null,v,res));

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(p,res);

return true;
}
});
var n__5616__auto___18375 = n;
var __18379 = (0);
while(true){
if((__18379 < n__5616__auto___18375)){
var G__15387_18383 = type;
var G__15387_18384__$1 = (((G__15387_18383 instanceof cljs.core.Keyword))?G__15387_18383.fqn:null);
switch (G__15387_18384__$1) {
case "compute":
var c__14559__auto___18386 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (__18379,c__14559__auto___18386,G__15387_18383,G__15387_18384__$1,n__5616__auto___18375,jobs,results,process__$1,async){
return (function (){
var f__14560__auto__ = (function (){var switch__13986__auto__ = ((function (__18379,c__14559__auto___18386,G__15387_18383,G__15387_18384__$1,n__5616__auto___18375,jobs,results,process__$1,async){
return (function (state_15404){
var state_val_15405 = (state_15404[(1)]);
if((state_val_15405 === (1))){
var state_15404__$1 = state_15404;
var statearr_15413_18388 = state_15404__$1;
(statearr_15413_18388[(2)] = null);

(statearr_15413_18388[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15405 === (2))){
var state_15404__$1 = state_15404;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_15404__$1,(4),jobs);
} else {
if((state_val_15405 === (3))){
var inst_15402 = (state_15404[(2)]);
var state_15404__$1 = state_15404;
return cljs.core.async.impl.ioc_helpers.return_chan(state_15404__$1,inst_15402);
} else {
if((state_val_15405 === (4))){
var inst_15390 = (state_15404[(2)]);
var inst_15391 = process__$1(inst_15390);
var state_15404__$1 = state_15404;
if(cljs.core.truth_(inst_15391)){
var statearr_15415_18390 = state_15404__$1;
(statearr_15415_18390[(1)] = (5));

} else {
var statearr_15416_18391 = state_15404__$1;
(statearr_15416_18391[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15405 === (5))){
var state_15404__$1 = state_15404;
var statearr_15417_18392 = state_15404__$1;
(statearr_15417_18392[(2)] = null);

(statearr_15417_18392[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15405 === (6))){
var state_15404__$1 = state_15404;
var statearr_15418_18393 = state_15404__$1;
(statearr_15418_18393[(2)] = null);

(statearr_15418_18393[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15405 === (7))){
var inst_15396 = (state_15404[(2)]);
var state_15404__$1 = state_15404;
var statearr_15421_18394 = state_15404__$1;
(statearr_15421_18394[(2)] = inst_15396);

(statearr_15421_18394[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
});})(__18379,c__14559__auto___18386,G__15387_18383,G__15387_18384__$1,n__5616__auto___18375,jobs,results,process__$1,async))
;
return ((function (__18379,switch__13986__auto__,c__14559__auto___18386,G__15387_18383,G__15387_18384__$1,n__5616__auto___18375,jobs,results,process__$1,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__13987__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__13987__auto____0 = (function (){
var statearr_15425 = [null,null,null,null,null,null,null];
(statearr_15425[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__13987__auto__);

(statearr_15425[(1)] = (1));

return statearr_15425;
});
var cljs$core$async$pipeline_STAR__$_state_machine__13987__auto____1 = (function (state_15404){
while(true){
var ret_value__13988__auto__ = (function (){try{while(true){
var result__13989__auto__ = switch__13986__auto__(state_15404);
if(cljs.core.keyword_identical_QMARK_(result__13989__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__13989__auto__;
}
break;
}
}catch (e15427){var ex__13990__auto__ = e15427;
var statearr_15428_18395 = state_15404;
(statearr_15428_18395[(2)] = ex__13990__auto__);


if(cljs.core.seq((state_15404[(4)]))){
var statearr_15429_18396 = state_15404;
(statearr_15429_18396[(1)] = cljs.core.first((state_15404[(4)])));

} else {
throw ex__13990__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__13988__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__18397 = state_15404;
state_15404 = G__18397;
continue;
} else {
return ret_value__13988__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__13987__auto__ = function(state_15404){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__13987__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__13987__auto____1.call(this,state_15404);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__13987__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__13987__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__13987__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__13987__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__13987__auto__;
})()
;})(__18379,switch__13986__auto__,c__14559__auto___18386,G__15387_18383,G__15387_18384__$1,n__5616__auto___18375,jobs,results,process__$1,async))
})();
var state__14561__auto__ = (function (){var statearr_15432 = f__14560__auto__();
(statearr_15432[(6)] = c__14559__auto___18386);

return statearr_15432;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__14561__auto__);
});})(__18379,c__14559__auto___18386,G__15387_18383,G__15387_18384__$1,n__5616__auto___18375,jobs,results,process__$1,async))
);


break;
case "async":
var c__14559__auto___18399 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (__18379,c__14559__auto___18399,G__15387_18383,G__15387_18384__$1,n__5616__auto___18375,jobs,results,process__$1,async){
return (function (){
var f__14560__auto__ = (function (){var switch__13986__auto__ = ((function (__18379,c__14559__auto___18399,G__15387_18383,G__15387_18384__$1,n__5616__auto___18375,jobs,results,process__$1,async){
return (function (state_15447){
var state_val_15448 = (state_15447[(1)]);
if((state_val_15448 === (1))){
var state_15447__$1 = state_15447;
var statearr_15461_18400 = state_15447__$1;
(statearr_15461_18400[(2)] = null);

(statearr_15461_18400[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15448 === (2))){
var state_15447__$1 = state_15447;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_15447__$1,(4),jobs);
} else {
if((state_val_15448 === (3))){
var inst_15445 = (state_15447[(2)]);
var state_15447__$1 = state_15447;
return cljs.core.async.impl.ioc_helpers.return_chan(state_15447__$1,inst_15445);
} else {
if((state_val_15448 === (4))){
var inst_15437 = (state_15447[(2)]);
var inst_15438 = async(inst_15437);
var state_15447__$1 = state_15447;
if(cljs.core.truth_(inst_15438)){
var statearr_15463_18403 = state_15447__$1;
(statearr_15463_18403[(1)] = (5));

} else {
var statearr_15464_18405 = state_15447__$1;
(statearr_15464_18405[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15448 === (5))){
var state_15447__$1 = state_15447;
var statearr_15466_18407 = state_15447__$1;
(statearr_15466_18407[(2)] = null);

(statearr_15466_18407[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15448 === (6))){
var state_15447__$1 = state_15447;
var statearr_15468_18408 = state_15447__$1;
(statearr_15468_18408[(2)] = null);

(statearr_15468_18408[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15448 === (7))){
var inst_15443 = (state_15447[(2)]);
var state_15447__$1 = state_15447;
var statearr_15469_18409 = state_15447__$1;
(statearr_15469_18409[(2)] = inst_15443);

(statearr_15469_18409[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
});})(__18379,c__14559__auto___18399,G__15387_18383,G__15387_18384__$1,n__5616__auto___18375,jobs,results,process__$1,async))
;
return ((function (__18379,switch__13986__auto__,c__14559__auto___18399,G__15387_18383,G__15387_18384__$1,n__5616__auto___18375,jobs,results,process__$1,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__13987__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__13987__auto____0 = (function (){
var statearr_15502 = [null,null,null,null,null,null,null];
(statearr_15502[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__13987__auto__);

(statearr_15502[(1)] = (1));

return statearr_15502;
});
var cljs$core$async$pipeline_STAR__$_state_machine__13987__auto____1 = (function (state_15447){
while(true){
var ret_value__13988__auto__ = (function (){try{while(true){
var result__13989__auto__ = switch__13986__auto__(state_15447);
if(cljs.core.keyword_identical_QMARK_(result__13989__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__13989__auto__;
}
break;
}
}catch (e15503){var ex__13990__auto__ = e15503;
var statearr_15504_18411 = state_15447;
(statearr_15504_18411[(2)] = ex__13990__auto__);


if(cljs.core.seq((state_15447[(4)]))){
var statearr_15507_18412 = state_15447;
(statearr_15507_18412[(1)] = cljs.core.first((state_15447[(4)])));

} else {
throw ex__13990__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__13988__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__18413 = state_15447;
state_15447 = G__18413;
continue;
} else {
return ret_value__13988__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__13987__auto__ = function(state_15447){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__13987__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__13987__auto____1.call(this,state_15447);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__13987__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__13987__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__13987__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__13987__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__13987__auto__;
})()
;})(__18379,switch__13986__auto__,c__14559__auto___18399,G__15387_18383,G__15387_18384__$1,n__5616__auto___18375,jobs,results,process__$1,async))
})();
var state__14561__auto__ = (function (){var statearr_15508 = f__14560__auto__();
(statearr_15508[(6)] = c__14559__auto___18399);

return statearr_15508;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__14561__auto__);
});})(__18379,c__14559__auto___18399,G__15387_18383,G__15387_18384__$1,n__5616__auto___18375,jobs,results,process__$1,async))
);


break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__15387_18384__$1)].join('')));

}

var G__18418 = (__18379 + (1));
__18379 = G__18418;
continue;
} else {
}
break;
}

var c__14559__auto___18419 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__14560__auto__ = (function (){var switch__13986__auto__ = (function (state_15613){
var state_val_15614 = (state_15613[(1)]);
if((state_val_15614 === (7))){
var inst_15609 = (state_15613[(2)]);
var state_15613__$1 = state_15613;
var statearr_15626_18421 = state_15613__$1;
(statearr_15626_18421[(2)] = inst_15609);

(statearr_15626_18421[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15614 === (1))){
var state_15613__$1 = state_15613;
var statearr_15627_18423 = state_15613__$1;
(statearr_15627_18423[(2)] = null);

(statearr_15627_18423[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15614 === (4))){
var inst_15512 = (state_15613[(7)]);
var inst_15512__$1 = (state_15613[(2)]);
var inst_15513 = (inst_15512__$1 == null);
var state_15613__$1 = (function (){var statearr_15628 = state_15613;
(statearr_15628[(7)] = inst_15512__$1);

return statearr_15628;
})();
if(cljs.core.truth_(inst_15513)){
var statearr_15629_18425 = state_15613__$1;
(statearr_15629_18425[(1)] = (5));

} else {
var statearr_15652_18426 = state_15613__$1;
(statearr_15652_18426[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15614 === (6))){
var inst_15512 = (state_15613[(7)]);
var inst_15522 = (state_15613[(8)]);
var inst_15522__$1 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
var inst_15537 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_15543 = [inst_15512,inst_15522__$1];
var inst_15544 = (new cljs.core.PersistentVector(null,2,(5),inst_15537,inst_15543,null));
var state_15613__$1 = (function (){var statearr_15659 = state_15613;
(statearr_15659[(8)] = inst_15522__$1);

return statearr_15659;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_15613__$1,(8),jobs,inst_15544);
} else {
if((state_val_15614 === (3))){
var inst_15611 = (state_15613[(2)]);
var state_15613__$1 = state_15613;
return cljs.core.async.impl.ioc_helpers.return_chan(state_15613__$1,inst_15611);
} else {
if((state_val_15614 === (2))){
var state_15613__$1 = state_15613;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_15613__$1,(4),from);
} else {
if((state_val_15614 === (9))){
var inst_15606 = (state_15613[(2)]);
var state_15613__$1 = (function (){var statearr_15665 = state_15613;
(statearr_15665[(9)] = inst_15606);

return statearr_15665;
})();
var statearr_15667_18433 = state_15613__$1;
(statearr_15667_18433[(2)] = null);

(statearr_15667_18433[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15614 === (5))){
var inst_15519 = cljs.core.async.close_BANG_(jobs);
var state_15613__$1 = state_15613;
var statearr_15669_18434 = state_15613__$1;
(statearr_15669_18434[(2)] = inst_15519);

(statearr_15669_18434[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15614 === (8))){
var inst_15522 = (state_15613[(8)]);
var inst_15546 = (state_15613[(2)]);
var state_15613__$1 = (function (){var statearr_15673 = state_15613;
(statearr_15673[(10)] = inst_15546);

return statearr_15673;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_15613__$1,(9),results,inst_15522);
} else {
return null;
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__13987__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__13987__auto____0 = (function (){
var statearr_15691 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_15691[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__13987__auto__);

(statearr_15691[(1)] = (1));

return statearr_15691;
});
var cljs$core$async$pipeline_STAR__$_state_machine__13987__auto____1 = (function (state_15613){
while(true){
var ret_value__13988__auto__ = (function (){try{while(true){
var result__13989__auto__ = switch__13986__auto__(state_15613);
if(cljs.core.keyword_identical_QMARK_(result__13989__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__13989__auto__;
}
break;
}
}catch (e15692){var ex__13990__auto__ = e15692;
var statearr_15693_18438 = state_15613;
(statearr_15693_18438[(2)] = ex__13990__auto__);


if(cljs.core.seq((state_15613[(4)]))){
var statearr_15696_18439 = state_15613;
(statearr_15696_18439[(1)] = cljs.core.first((state_15613[(4)])));

} else {
throw ex__13990__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__13988__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__18440 = state_15613;
state_15613 = G__18440;
continue;
} else {
return ret_value__13988__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__13987__auto__ = function(state_15613){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__13987__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__13987__auto____1.call(this,state_15613);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__13987__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__13987__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__13987__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__13987__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__13987__auto__;
})()
})();
var state__14561__auto__ = (function (){var statearr_15697 = f__14560__auto__();
(statearr_15697[(6)] = c__14559__auto___18419);

return statearr_15697;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__14561__auto__);
}));


var c__14559__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__14560__auto__ = (function (){var switch__13986__auto__ = (function (state_15748){
var state_val_15749 = (state_15748[(1)]);
if((state_val_15749 === (7))){
var inst_15744 = (state_15748[(2)]);
var state_15748__$1 = state_15748;
var statearr_15754_18441 = state_15748__$1;
(statearr_15754_18441[(2)] = inst_15744);

(statearr_15754_18441[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15749 === (20))){
var state_15748__$1 = state_15748;
var statearr_15756_18442 = state_15748__$1;
(statearr_15756_18442[(2)] = null);

(statearr_15756_18442[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15749 === (1))){
var state_15748__$1 = state_15748;
var statearr_15757_18443 = state_15748__$1;
(statearr_15757_18443[(2)] = null);

(statearr_15757_18443[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15749 === (4))){
var inst_15701 = (state_15748[(7)]);
var inst_15701__$1 = (state_15748[(2)]);
var inst_15702 = (inst_15701__$1 == null);
var state_15748__$1 = (function (){var statearr_15761 = state_15748;
(statearr_15761[(7)] = inst_15701__$1);

return statearr_15761;
})();
if(cljs.core.truth_(inst_15702)){
var statearr_15762_18444 = state_15748__$1;
(statearr_15762_18444[(1)] = (5));

} else {
var statearr_15763_18449 = state_15748__$1;
(statearr_15763_18449[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15749 === (15))){
var inst_15724 = (state_15748[(8)]);
var state_15748__$1 = state_15748;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_15748__$1,(18),to,inst_15724);
} else {
if((state_val_15749 === (21))){
var inst_15739 = (state_15748[(2)]);
var state_15748__$1 = state_15748;
var statearr_15764_18450 = state_15748__$1;
(statearr_15764_18450[(2)] = inst_15739);

(statearr_15764_18450[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15749 === (13))){
var inst_15741 = (state_15748[(2)]);
var state_15748__$1 = (function (){var statearr_15766 = state_15748;
(statearr_15766[(9)] = inst_15741);

return statearr_15766;
})();
var statearr_15767_18452 = state_15748__$1;
(statearr_15767_18452[(2)] = null);

(statearr_15767_18452[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15749 === (6))){
var inst_15701 = (state_15748[(7)]);
var state_15748__$1 = state_15748;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_15748__$1,(11),inst_15701);
} else {
if((state_val_15749 === (17))){
var inst_15734 = (state_15748[(2)]);
var state_15748__$1 = state_15748;
if(cljs.core.truth_(inst_15734)){
var statearr_15768_18453 = state_15748__$1;
(statearr_15768_18453[(1)] = (19));

} else {
var statearr_15769_18454 = state_15748__$1;
(statearr_15769_18454[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15749 === (3))){
var inst_15746 = (state_15748[(2)]);
var state_15748__$1 = state_15748;
return cljs.core.async.impl.ioc_helpers.return_chan(state_15748__$1,inst_15746);
} else {
if((state_val_15749 === (12))){
var inst_15721 = (state_15748[(10)]);
var state_15748__$1 = state_15748;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_15748__$1,(14),inst_15721);
} else {
if((state_val_15749 === (2))){
var state_15748__$1 = state_15748;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_15748__$1,(4),results);
} else {
if((state_val_15749 === (19))){
var state_15748__$1 = state_15748;
var statearr_15770_18455 = state_15748__$1;
(statearr_15770_18455[(2)] = null);

(statearr_15770_18455[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15749 === (11))){
var inst_15721 = (state_15748[(2)]);
var state_15748__$1 = (function (){var statearr_15771 = state_15748;
(statearr_15771[(10)] = inst_15721);

return statearr_15771;
})();
var statearr_15772_18456 = state_15748__$1;
(statearr_15772_18456[(2)] = null);

(statearr_15772_18456[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15749 === (9))){
var state_15748__$1 = state_15748;
var statearr_15774_18457 = state_15748__$1;
(statearr_15774_18457[(2)] = null);

(statearr_15774_18457[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15749 === (5))){
var state_15748__$1 = state_15748;
if(cljs.core.truth_(close_QMARK_)){
var statearr_15775_18458 = state_15748__$1;
(statearr_15775_18458[(1)] = (8));

} else {
var statearr_15776_18459 = state_15748__$1;
(statearr_15776_18459[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15749 === (14))){
var inst_15724 = (state_15748[(8)]);
var inst_15726 = (state_15748[(11)]);
var inst_15724__$1 = (state_15748[(2)]);
var inst_15725 = (inst_15724__$1 == null);
var inst_15726__$1 = cljs.core.not(inst_15725);
var state_15748__$1 = (function (){var statearr_15778 = state_15748;
(statearr_15778[(8)] = inst_15724__$1);

(statearr_15778[(11)] = inst_15726__$1);

return statearr_15778;
})();
if(inst_15726__$1){
var statearr_15779_18460 = state_15748__$1;
(statearr_15779_18460[(1)] = (15));

} else {
var statearr_15782_18461 = state_15748__$1;
(statearr_15782_18461[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15749 === (16))){
var inst_15726 = (state_15748[(11)]);
var state_15748__$1 = state_15748;
var statearr_15788_18463 = state_15748__$1;
(statearr_15788_18463[(2)] = inst_15726);

(statearr_15788_18463[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15749 === (10))){
var inst_15717 = (state_15748[(2)]);
var state_15748__$1 = state_15748;
var statearr_15791_18467 = state_15748__$1;
(statearr_15791_18467[(2)] = inst_15717);

(statearr_15791_18467[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15749 === (18))){
var inst_15731 = (state_15748[(2)]);
var state_15748__$1 = state_15748;
var statearr_15792_18468 = state_15748__$1;
(statearr_15792_18468[(2)] = inst_15731);

(statearr_15792_18468[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15749 === (8))){
var inst_15706 = cljs.core.async.close_BANG_(to);
var state_15748__$1 = state_15748;
var statearr_15794_18469 = state_15748__$1;
(statearr_15794_18469[(2)] = inst_15706);

(statearr_15794_18469[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__13987__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__13987__auto____0 = (function (){
var statearr_15795 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_15795[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__13987__auto__);

(statearr_15795[(1)] = (1));

return statearr_15795;
});
var cljs$core$async$pipeline_STAR__$_state_machine__13987__auto____1 = (function (state_15748){
while(true){
var ret_value__13988__auto__ = (function (){try{while(true){
var result__13989__auto__ = switch__13986__auto__(state_15748);
if(cljs.core.keyword_identical_QMARK_(result__13989__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__13989__auto__;
}
break;
}
}catch (e15796){var ex__13990__auto__ = e15796;
var statearr_15797_18471 = state_15748;
(statearr_15797_18471[(2)] = ex__13990__auto__);


if(cljs.core.seq((state_15748[(4)]))){
var statearr_15798_18472 = state_15748;
(statearr_15798_18472[(1)] = cljs.core.first((state_15748[(4)])));

} else {
throw ex__13990__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__13988__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__18473 = state_15748;
state_15748 = G__18473;
continue;
} else {
return ret_value__13988__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__13987__auto__ = function(state_15748){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__13987__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__13987__auto____1.call(this,state_15748);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__13987__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__13987__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__13987__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__13987__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__13987__auto__;
})()
})();
var state__14561__auto__ = (function (){var statearr_15805 = f__14560__auto__();
(statearr_15805[(6)] = c__14559__auto__);

return statearr_15805;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__14561__auto__);
}));

return c__14559__auto__;
});
/**
 * Takes elements from the from channel and supplies them to the to
 *   channel, subject to the async function af, with parallelism n. af
 *   must be a function of two arguments, the first an input value and
 *   the second a channel on which to place the result(s). The
 *   presumption is that af will return immediately, having launched some
 *   asynchronous operation whose completion/callback will put results on
 *   the channel, then close! it. Outputs will be returned in order
 *   relative to the inputs. By default, the to channel will be closed
 *   when the from channel closes, but can be determined by the close?
 *   parameter. Will stop consuming the from channel if the to channel
 *   closes. See also pipeline, pipeline-blocking.
 */
cljs.core.async.pipeline_async = (function cljs$core$async$pipeline_async(var_args){
var G__15809 = arguments.length;
switch (G__15809) {
case 4:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4 = (function (n,to,af,from){
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5(n,to,af,from,true);
}));

(cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5 = (function (n,to,af,from,close_QMARK_){
return cljs.core.async.pipeline_STAR_(n,to,af,from,close_QMARK_,null,new cljs.core.Keyword(null,"async","async",1050769601));
}));

(cljs.core.async.pipeline_async.cljs$lang$maxFixedArity = 5);

/**
 * Takes elements from the from channel and supplies them to the to
 *   channel, subject to the transducer xf, with parallelism n. Because
 *   it is parallel, the transducer will be applied independently to each
 *   element, not across elements, and may produce zero or more outputs
 *   per input.  Outputs will be returned in order relative to the
 *   inputs. By default, the to channel will be closed when the from
 *   channel closes, but can be determined by the close?  parameter. Will
 *   stop consuming the from channel if the to channel closes.
 * 
 *   Note this is supplied for API compatibility with the Clojure version.
 *   Values of N > 1 will not result in actual concurrency in a
 *   single-threaded runtime.
 */
cljs.core.async.pipeline = (function cljs$core$async$pipeline(var_args){
var G__15817 = arguments.length;
switch (G__15817) {
case 4:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
case 6:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$4 = (function (n,to,xf,from){
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5(n,to,xf,from,true);
}));

(cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5 = (function (n,to,xf,from,close_QMARK_){
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6(n,to,xf,from,close_QMARK_,null);
}));

(cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6 = (function (n,to,xf,from,close_QMARK_,ex_handler){
return cljs.core.async.pipeline_STAR_(n,to,xf,from,close_QMARK_,ex_handler,new cljs.core.Keyword(null,"compute","compute",1555393130));
}));

(cljs.core.async.pipeline.cljs$lang$maxFixedArity = 6);

/**
 * Takes a predicate and a source channel and returns a vector of two
 *   channels, the first of which will contain the values for which the
 *   predicate returned true, the second those for which it returned
 *   false.
 * 
 *   The out channels will be unbuffered by default, or two buf-or-ns can
 *   be supplied. The channels will close after the source channel has
 *   closed.
 */
cljs.core.async.split = (function cljs$core$async$split(var_args){
var G__15836 = arguments.length;
switch (G__15836) {
case 2:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 4:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.split.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$4(p,ch,null,null);
}));

(cljs.core.async.split.cljs$core$IFn$_invoke$arity$4 = (function (p,ch,t_buf_or_n,f_buf_or_n){
var tc = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(t_buf_or_n);
var fc = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(f_buf_or_n);
var c__14559__auto___18485 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__14560__auto__ = (function (){var switch__13986__auto__ = (function (state_15865){
var state_val_15866 = (state_15865[(1)]);
if((state_val_15866 === (7))){
var inst_15861 = (state_15865[(2)]);
var state_15865__$1 = state_15865;
var statearr_15868_18486 = state_15865__$1;
(statearr_15868_18486[(2)] = inst_15861);

(statearr_15868_18486[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15866 === (1))){
var state_15865__$1 = state_15865;
var statearr_15869_18488 = state_15865__$1;
(statearr_15869_18488[(2)] = null);

(statearr_15869_18488[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15866 === (4))){
var inst_15841 = (state_15865[(7)]);
var inst_15841__$1 = (state_15865[(2)]);
var inst_15842 = (inst_15841__$1 == null);
var state_15865__$1 = (function (){var statearr_15873 = state_15865;
(statearr_15873[(7)] = inst_15841__$1);

return statearr_15873;
})();
if(cljs.core.truth_(inst_15842)){
var statearr_15874_18489 = state_15865__$1;
(statearr_15874_18489[(1)] = (5));

} else {
var statearr_15875_18490 = state_15865__$1;
(statearr_15875_18490[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15866 === (13))){
var state_15865__$1 = state_15865;
var statearr_15877_18491 = state_15865__$1;
(statearr_15877_18491[(2)] = null);

(statearr_15877_18491[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15866 === (6))){
var inst_15841 = (state_15865[(7)]);
var inst_15848 = (p.cljs$core$IFn$_invoke$arity$1 ? p.cljs$core$IFn$_invoke$arity$1(inst_15841) : p.call(null,inst_15841));
var state_15865__$1 = state_15865;
if(cljs.core.truth_(inst_15848)){
var statearr_15878_18495 = state_15865__$1;
(statearr_15878_18495[(1)] = (9));

} else {
var statearr_15879_18496 = state_15865__$1;
(statearr_15879_18496[(1)] = (10));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15866 === (3))){
var inst_15863 = (state_15865[(2)]);
var state_15865__$1 = state_15865;
return cljs.core.async.impl.ioc_helpers.return_chan(state_15865__$1,inst_15863);
} else {
if((state_val_15866 === (12))){
var state_15865__$1 = state_15865;
var statearr_15880_18505 = state_15865__$1;
(statearr_15880_18505[(2)] = null);

(statearr_15880_18505[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15866 === (2))){
var state_15865__$1 = state_15865;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_15865__$1,(4),ch);
} else {
if((state_val_15866 === (11))){
var inst_15841 = (state_15865[(7)]);
var inst_15852 = (state_15865[(2)]);
var state_15865__$1 = state_15865;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_15865__$1,(8),inst_15852,inst_15841);
} else {
if((state_val_15866 === (9))){
var state_15865__$1 = state_15865;
var statearr_15882_18512 = state_15865__$1;
(statearr_15882_18512[(2)] = tc);

(statearr_15882_18512[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15866 === (5))){
var inst_15844 = cljs.core.async.close_BANG_(tc);
var inst_15845 = cljs.core.async.close_BANG_(fc);
var state_15865__$1 = (function (){var statearr_15884 = state_15865;
(statearr_15884[(8)] = inst_15844);

return statearr_15884;
})();
var statearr_15886_18513 = state_15865__$1;
(statearr_15886_18513[(2)] = inst_15845);

(statearr_15886_18513[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15866 === (14))){
var inst_15859 = (state_15865[(2)]);
var state_15865__$1 = state_15865;
var statearr_15887_18514 = state_15865__$1;
(statearr_15887_18514[(2)] = inst_15859);

(statearr_15887_18514[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15866 === (10))){
var state_15865__$1 = state_15865;
var statearr_15888_18521 = state_15865__$1;
(statearr_15888_18521[(2)] = fc);

(statearr_15888_18521[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15866 === (8))){
var inst_15854 = (state_15865[(2)]);
var state_15865__$1 = state_15865;
if(cljs.core.truth_(inst_15854)){
var statearr_15891_18522 = state_15865__$1;
(statearr_15891_18522[(1)] = (12));

} else {
var statearr_15893_18523 = state_15865__$1;
(statearr_15893_18523[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__13987__auto__ = null;
var cljs$core$async$state_machine__13987__auto____0 = (function (){
var statearr_15898 = [null,null,null,null,null,null,null,null,null];
(statearr_15898[(0)] = cljs$core$async$state_machine__13987__auto__);

(statearr_15898[(1)] = (1));

return statearr_15898;
});
var cljs$core$async$state_machine__13987__auto____1 = (function (state_15865){
while(true){
var ret_value__13988__auto__ = (function (){try{while(true){
var result__13989__auto__ = switch__13986__auto__(state_15865);
if(cljs.core.keyword_identical_QMARK_(result__13989__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__13989__auto__;
}
break;
}
}catch (e15900){var ex__13990__auto__ = e15900;
var statearr_15901_18524 = state_15865;
(statearr_15901_18524[(2)] = ex__13990__auto__);


if(cljs.core.seq((state_15865[(4)]))){
var statearr_15902_18526 = state_15865;
(statearr_15902_18526[(1)] = cljs.core.first((state_15865[(4)])));

} else {
throw ex__13990__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__13988__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__18529 = state_15865;
state_15865 = G__18529;
continue;
} else {
return ret_value__13988__auto__;
}
break;
}
});
cljs$core$async$state_machine__13987__auto__ = function(state_15865){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__13987__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__13987__auto____1.call(this,state_15865);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__13987__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__13987__auto____0;
cljs$core$async$state_machine__13987__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__13987__auto____1;
return cljs$core$async$state_machine__13987__auto__;
})()
})();
var state__14561__auto__ = (function (){var statearr_15905 = f__14560__auto__();
(statearr_15905[(6)] = c__14559__auto___18485);

return statearr_15905;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__14561__auto__);
}));


return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tc,fc], null);
}));

(cljs.core.async.split.cljs$lang$maxFixedArity = 4);

/**
 * f should be a function of 2 arguments. Returns a channel containing
 *   the single result of applying f to init and the first item from the
 *   channel, then applying f to that result and the 2nd item, etc. If
 *   the channel closes without yielding items, returns init and f is not
 *   called. ch must close before reduce produces a result.
 */
cljs.core.async.reduce = (function cljs$core$async$reduce(f,init,ch){
var c__14559__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__14560__auto__ = (function (){var switch__13986__auto__ = (function (state_15937){
var state_val_15938 = (state_15937[(1)]);
if((state_val_15938 === (7))){
var inst_15933 = (state_15937[(2)]);
var state_15937__$1 = state_15937;
var statearr_15939_18535 = state_15937__$1;
(statearr_15939_18535[(2)] = inst_15933);

(statearr_15939_18535[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15938 === (1))){
var inst_15913 = init;
var inst_15914 = inst_15913;
var state_15937__$1 = (function (){var statearr_15941 = state_15937;
(statearr_15941[(7)] = inst_15914);

return statearr_15941;
})();
var statearr_15942_18536 = state_15937__$1;
(statearr_15942_18536[(2)] = null);

(statearr_15942_18536[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15938 === (4))){
var inst_15918 = (state_15937[(8)]);
var inst_15918__$1 = (state_15937[(2)]);
var inst_15919 = (inst_15918__$1 == null);
var state_15937__$1 = (function (){var statearr_15945 = state_15937;
(statearr_15945[(8)] = inst_15918__$1);

return statearr_15945;
})();
if(cljs.core.truth_(inst_15919)){
var statearr_15948_18537 = state_15937__$1;
(statearr_15948_18537[(1)] = (5));

} else {
var statearr_15949_18538 = state_15937__$1;
(statearr_15949_18538[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15938 === (6))){
var inst_15914 = (state_15937[(7)]);
var inst_15918 = (state_15937[(8)]);
var inst_15924 = (state_15937[(9)]);
var inst_15924__$1 = (f.cljs$core$IFn$_invoke$arity$2 ? f.cljs$core$IFn$_invoke$arity$2(inst_15914,inst_15918) : f.call(null,inst_15914,inst_15918));
var inst_15925 = cljs.core.reduced_QMARK_(inst_15924__$1);
var state_15937__$1 = (function (){var statearr_15950 = state_15937;
(statearr_15950[(9)] = inst_15924__$1);

return statearr_15950;
})();
if(inst_15925){
var statearr_15951_18539 = state_15937__$1;
(statearr_15951_18539[(1)] = (8));

} else {
var statearr_15952_18540 = state_15937__$1;
(statearr_15952_18540[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15938 === (3))){
var inst_15935 = (state_15937[(2)]);
var state_15937__$1 = state_15937;
return cljs.core.async.impl.ioc_helpers.return_chan(state_15937__$1,inst_15935);
} else {
if((state_val_15938 === (2))){
var state_15937__$1 = state_15937;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_15937__$1,(4),ch);
} else {
if((state_val_15938 === (9))){
var inst_15924 = (state_15937[(9)]);
var inst_15914 = inst_15924;
var state_15937__$1 = (function (){var statearr_15954 = state_15937;
(statearr_15954[(7)] = inst_15914);

return statearr_15954;
})();
var statearr_15955_18541 = state_15937__$1;
(statearr_15955_18541[(2)] = null);

(statearr_15955_18541[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15938 === (5))){
var inst_15914 = (state_15937[(7)]);
var state_15937__$1 = state_15937;
var statearr_15957_18542 = state_15937__$1;
(statearr_15957_18542[(2)] = inst_15914);

(statearr_15957_18542[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15938 === (10))){
var inst_15931 = (state_15937[(2)]);
var state_15937__$1 = state_15937;
var statearr_15958_18544 = state_15937__$1;
(statearr_15958_18544[(2)] = inst_15931);

(statearr_15958_18544[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15938 === (8))){
var inst_15924 = (state_15937[(9)]);
var inst_15927 = cljs.core.deref(inst_15924);
var state_15937__$1 = state_15937;
var statearr_15966_18545 = state_15937__$1;
(statearr_15966_18545[(2)] = inst_15927);

(statearr_15966_18545[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$reduce_$_state_machine__13987__auto__ = null;
var cljs$core$async$reduce_$_state_machine__13987__auto____0 = (function (){
var statearr_15976 = [null,null,null,null,null,null,null,null,null,null];
(statearr_15976[(0)] = cljs$core$async$reduce_$_state_machine__13987__auto__);

(statearr_15976[(1)] = (1));

return statearr_15976;
});
var cljs$core$async$reduce_$_state_machine__13987__auto____1 = (function (state_15937){
while(true){
var ret_value__13988__auto__ = (function (){try{while(true){
var result__13989__auto__ = switch__13986__auto__(state_15937);
if(cljs.core.keyword_identical_QMARK_(result__13989__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__13989__auto__;
}
break;
}
}catch (e15977){var ex__13990__auto__ = e15977;
var statearr_15978_18546 = state_15937;
(statearr_15978_18546[(2)] = ex__13990__auto__);


if(cljs.core.seq((state_15937[(4)]))){
var statearr_15979_18547 = state_15937;
(statearr_15979_18547[(1)] = cljs.core.first((state_15937[(4)])));

} else {
throw ex__13990__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__13988__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__18548 = state_15937;
state_15937 = G__18548;
continue;
} else {
return ret_value__13988__auto__;
}
break;
}
});
cljs$core$async$reduce_$_state_machine__13987__auto__ = function(state_15937){
switch(arguments.length){
case 0:
return cljs$core$async$reduce_$_state_machine__13987__auto____0.call(this);
case 1:
return cljs$core$async$reduce_$_state_machine__13987__auto____1.call(this,state_15937);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$reduce_$_state_machine__13987__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$reduce_$_state_machine__13987__auto____0;
cljs$core$async$reduce_$_state_machine__13987__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$reduce_$_state_machine__13987__auto____1;
return cljs$core$async$reduce_$_state_machine__13987__auto__;
})()
})();
var state__14561__auto__ = (function (){var statearr_15980 = f__14560__auto__();
(statearr_15980[(6)] = c__14559__auto__);

return statearr_15980;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__14561__auto__);
}));

return c__14559__auto__;
});
/**
 * async/reduces a channel with a transformation (xform f).
 *   Returns a channel containing the result.  ch must close before
 *   transduce produces a result.
 */
cljs.core.async.transduce = (function cljs$core$async$transduce(xform,f,init,ch){
var f__$1 = (xform.cljs$core$IFn$_invoke$arity$1 ? xform.cljs$core$IFn$_invoke$arity$1(f) : xform.call(null,f));
var c__14559__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__14560__auto__ = (function (){var switch__13986__auto__ = (function (state_15987){
var state_val_15988 = (state_15987[(1)]);
if((state_val_15988 === (1))){
var inst_15982 = cljs.core.async.reduce(f__$1,init,ch);
var state_15987__$1 = state_15987;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_15987__$1,(2),inst_15982);
} else {
if((state_val_15988 === (2))){
var inst_15984 = (state_15987[(2)]);
var inst_15985 = (f__$1.cljs$core$IFn$_invoke$arity$1 ? f__$1.cljs$core$IFn$_invoke$arity$1(inst_15984) : f__$1.call(null,inst_15984));
var state_15987__$1 = state_15987;
return cljs.core.async.impl.ioc_helpers.return_chan(state_15987__$1,inst_15985);
} else {
return null;
}
}
});
return (function() {
var cljs$core$async$transduce_$_state_machine__13987__auto__ = null;
var cljs$core$async$transduce_$_state_machine__13987__auto____0 = (function (){
var statearr_15991 = [null,null,null,null,null,null,null];
(statearr_15991[(0)] = cljs$core$async$transduce_$_state_machine__13987__auto__);

(statearr_15991[(1)] = (1));

return statearr_15991;
});
var cljs$core$async$transduce_$_state_machine__13987__auto____1 = (function (state_15987){
while(true){
var ret_value__13988__auto__ = (function (){try{while(true){
var result__13989__auto__ = switch__13986__auto__(state_15987);
if(cljs.core.keyword_identical_QMARK_(result__13989__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__13989__auto__;
}
break;
}
}catch (e15992){var ex__13990__auto__ = e15992;
var statearr_15993_18554 = state_15987;
(statearr_15993_18554[(2)] = ex__13990__auto__);


if(cljs.core.seq((state_15987[(4)]))){
var statearr_15994_18556 = state_15987;
(statearr_15994_18556[(1)] = cljs.core.first((state_15987[(4)])));

} else {
throw ex__13990__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__13988__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__18557 = state_15987;
state_15987 = G__18557;
continue;
} else {
return ret_value__13988__auto__;
}
break;
}
});
cljs$core$async$transduce_$_state_machine__13987__auto__ = function(state_15987){
switch(arguments.length){
case 0:
return cljs$core$async$transduce_$_state_machine__13987__auto____0.call(this);
case 1:
return cljs$core$async$transduce_$_state_machine__13987__auto____1.call(this,state_15987);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$transduce_$_state_machine__13987__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$transduce_$_state_machine__13987__auto____0;
cljs$core$async$transduce_$_state_machine__13987__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$transduce_$_state_machine__13987__auto____1;
return cljs$core$async$transduce_$_state_machine__13987__auto__;
})()
})();
var state__14561__auto__ = (function (){var statearr_15998 = f__14560__auto__();
(statearr_15998[(6)] = c__14559__auto__);

return statearr_15998;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__14561__auto__);
}));

return c__14559__auto__;
});
/**
 * Puts the contents of coll into the supplied channel.
 * 
 *   By default the channel will be closed after the items are copied,
 *   but can be determined by the close? parameter.
 * 
 *   Returns a channel which will close after the items are copied.
 */
cljs.core.async.onto_chan_BANG_ = (function cljs$core$async$onto_chan_BANG_(var_args){
var G__16007 = arguments.length;
switch (G__16007) {
case 2:
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (ch,coll){
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3(ch,coll,true);
}));

(cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (ch,coll,close_QMARK_){
var c__14559__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__14560__auto__ = (function (){var switch__13986__auto__ = (function (state_16039){
var state_val_16040 = (state_16039[(1)]);
if((state_val_16040 === (7))){
var inst_16021 = (state_16039[(2)]);
var state_16039__$1 = state_16039;
var statearr_16044_18564 = state_16039__$1;
(statearr_16044_18564[(2)] = inst_16021);

(statearr_16044_18564[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16040 === (1))){
var inst_16012 = cljs.core.seq(coll);
var inst_16013 = inst_16012;
var state_16039__$1 = (function (){var statearr_16045 = state_16039;
(statearr_16045[(7)] = inst_16013);

return statearr_16045;
})();
var statearr_16047_18567 = state_16039__$1;
(statearr_16047_18567[(2)] = null);

(statearr_16047_18567[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16040 === (4))){
var inst_16013 = (state_16039[(7)]);
var inst_16019 = cljs.core.first(inst_16013);
var state_16039__$1 = state_16039;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_16039__$1,(7),ch,inst_16019);
} else {
if((state_val_16040 === (13))){
var inst_16033 = (state_16039[(2)]);
var state_16039__$1 = state_16039;
var statearr_16048_18568 = state_16039__$1;
(statearr_16048_18568[(2)] = inst_16033);

(statearr_16048_18568[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16040 === (6))){
var inst_16024 = (state_16039[(2)]);
var state_16039__$1 = state_16039;
if(cljs.core.truth_(inst_16024)){
var statearr_16049_18569 = state_16039__$1;
(statearr_16049_18569[(1)] = (8));

} else {
var statearr_16050_18570 = state_16039__$1;
(statearr_16050_18570[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16040 === (3))){
var inst_16037 = (state_16039[(2)]);
var state_16039__$1 = state_16039;
return cljs.core.async.impl.ioc_helpers.return_chan(state_16039__$1,inst_16037);
} else {
if((state_val_16040 === (12))){
var state_16039__$1 = state_16039;
var statearr_16052_18571 = state_16039__$1;
(statearr_16052_18571[(2)] = null);

(statearr_16052_18571[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16040 === (2))){
var inst_16013 = (state_16039[(7)]);
var state_16039__$1 = state_16039;
if(cljs.core.truth_(inst_16013)){
var statearr_16057_18572 = state_16039__$1;
(statearr_16057_18572[(1)] = (4));

} else {
var statearr_16058_18573 = state_16039__$1;
(statearr_16058_18573[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16040 === (11))){
var inst_16030 = cljs.core.async.close_BANG_(ch);
var state_16039__$1 = state_16039;
var statearr_16059_18574 = state_16039__$1;
(statearr_16059_18574[(2)] = inst_16030);

(statearr_16059_18574[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16040 === (9))){
var state_16039__$1 = state_16039;
if(cljs.core.truth_(close_QMARK_)){
var statearr_16060_18575 = state_16039__$1;
(statearr_16060_18575[(1)] = (11));

} else {
var statearr_16063_18576 = state_16039__$1;
(statearr_16063_18576[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16040 === (5))){
var inst_16013 = (state_16039[(7)]);
var state_16039__$1 = state_16039;
var statearr_16065_18580 = state_16039__$1;
(statearr_16065_18580[(2)] = inst_16013);

(statearr_16065_18580[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16040 === (10))){
var inst_16035 = (state_16039[(2)]);
var state_16039__$1 = state_16039;
var statearr_16067_18581 = state_16039__$1;
(statearr_16067_18581[(2)] = inst_16035);

(statearr_16067_18581[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16040 === (8))){
var inst_16013 = (state_16039[(7)]);
var inst_16026 = cljs.core.next(inst_16013);
var inst_16013__$1 = inst_16026;
var state_16039__$1 = (function (){var statearr_16068 = state_16039;
(statearr_16068[(7)] = inst_16013__$1);

return statearr_16068;
})();
var statearr_16070_18582 = state_16039__$1;
(statearr_16070_18582[(2)] = null);

(statearr_16070_18582[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__13987__auto__ = null;
var cljs$core$async$state_machine__13987__auto____0 = (function (){
var statearr_16071 = [null,null,null,null,null,null,null,null];
(statearr_16071[(0)] = cljs$core$async$state_machine__13987__auto__);

(statearr_16071[(1)] = (1));

return statearr_16071;
});
var cljs$core$async$state_machine__13987__auto____1 = (function (state_16039){
while(true){
var ret_value__13988__auto__ = (function (){try{while(true){
var result__13989__auto__ = switch__13986__auto__(state_16039);
if(cljs.core.keyword_identical_QMARK_(result__13989__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__13989__auto__;
}
break;
}
}catch (e16072){var ex__13990__auto__ = e16072;
var statearr_16073_18583 = state_16039;
(statearr_16073_18583[(2)] = ex__13990__auto__);


if(cljs.core.seq((state_16039[(4)]))){
var statearr_16074_18584 = state_16039;
(statearr_16074_18584[(1)] = cljs.core.first((state_16039[(4)])));

} else {
throw ex__13990__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__13988__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__18585 = state_16039;
state_16039 = G__18585;
continue;
} else {
return ret_value__13988__auto__;
}
break;
}
});
cljs$core$async$state_machine__13987__auto__ = function(state_16039){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__13987__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__13987__auto____1.call(this,state_16039);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__13987__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__13987__auto____0;
cljs$core$async$state_machine__13987__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__13987__auto____1;
return cljs$core$async$state_machine__13987__auto__;
})()
})();
var state__14561__auto__ = (function (){var statearr_16075 = f__14560__auto__();
(statearr_16075[(6)] = c__14559__auto__);

return statearr_16075;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__14561__auto__);
}));

return c__14559__auto__;
}));

(cljs.core.async.onto_chan_BANG_.cljs$lang$maxFixedArity = 3);

/**
 * Creates and returns a channel which contains the contents of coll,
 *   closing when exhausted.
 */
cljs.core.async.to_chan_BANG_ = (function cljs$core$async$to_chan_BANG_(coll){
var ch = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(cljs.core.bounded_count((100),coll));
cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$2(ch,coll);

return ch;
});
/**
 * Deprecated - use onto-chan!
 */
cljs.core.async.onto_chan = (function cljs$core$async$onto_chan(var_args){
var G__16078 = arguments.length;
switch (G__16078) {
case 2:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2 = (function (ch,coll){
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3(ch,coll,true);
}));

(cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3 = (function (ch,coll,close_QMARK_){
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3(ch,coll,close_QMARK_);
}));

(cljs.core.async.onto_chan.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - use to-chan!
 */
cljs.core.async.to_chan = (function cljs$core$async$to_chan(coll){
return cljs.core.async.to_chan_BANG_(coll);
});

/**
 * @interface
 */
cljs.core.async.Mux = function(){};

var cljs$core$async$Mux$muxch_STAR_$dyn_18587 = (function (_){
var x__5373__auto__ = (((_ == null))?null:_);
var m__5374__auto__ = (cljs.core.async.muxch_STAR_[goog.typeOf(x__5373__auto__)]);
if((!((m__5374__auto__ == null)))){
return (m__5374__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5374__auto__.cljs$core$IFn$_invoke$arity$1(_) : m__5374__auto__.call(null,_));
} else {
var m__5372__auto__ = (cljs.core.async.muxch_STAR_["_"]);
if((!((m__5372__auto__ == null)))){
return (m__5372__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5372__auto__.cljs$core$IFn$_invoke$arity$1(_) : m__5372__auto__.call(null,_));
} else {
throw cljs.core.missing_protocol("Mux.muxch*",_);
}
}
});
cljs.core.async.muxch_STAR_ = (function cljs$core$async$muxch_STAR_(_){
if((((!((_ == null)))) && ((!((_.cljs$core$async$Mux$muxch_STAR_$arity$1 == null)))))){
return _.cljs$core$async$Mux$muxch_STAR_$arity$1(_);
} else {
return cljs$core$async$Mux$muxch_STAR_$dyn_18587(_);
}
});


/**
 * @interface
 */
cljs.core.async.Mult = function(){};

var cljs$core$async$Mult$tap_STAR_$dyn_18588 = (function (m,ch,close_QMARK_){
var x__5373__auto__ = (((m == null))?null:m);
var m__5374__auto__ = (cljs.core.async.tap_STAR_[goog.typeOf(x__5373__auto__)]);
if((!((m__5374__auto__ == null)))){
return (m__5374__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5374__auto__.cljs$core$IFn$_invoke$arity$3(m,ch,close_QMARK_) : m__5374__auto__.call(null,m,ch,close_QMARK_));
} else {
var m__5372__auto__ = (cljs.core.async.tap_STAR_["_"]);
if((!((m__5372__auto__ == null)))){
return (m__5372__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5372__auto__.cljs$core$IFn$_invoke$arity$3(m,ch,close_QMARK_) : m__5372__auto__.call(null,m,ch,close_QMARK_));
} else {
throw cljs.core.missing_protocol("Mult.tap*",m);
}
}
});
cljs.core.async.tap_STAR_ = (function cljs$core$async$tap_STAR_(m,ch,close_QMARK_){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mult$tap_STAR_$arity$3 == null)))))){
return m.cljs$core$async$Mult$tap_STAR_$arity$3(m,ch,close_QMARK_);
} else {
return cljs$core$async$Mult$tap_STAR_$dyn_18588(m,ch,close_QMARK_);
}
});

var cljs$core$async$Mult$untap_STAR_$dyn_18589 = (function (m,ch){
var x__5373__auto__ = (((m == null))?null:m);
var m__5374__auto__ = (cljs.core.async.untap_STAR_[goog.typeOf(x__5373__auto__)]);
if((!((m__5374__auto__ == null)))){
return (m__5374__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5374__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5374__auto__.call(null,m,ch));
} else {
var m__5372__auto__ = (cljs.core.async.untap_STAR_["_"]);
if((!((m__5372__auto__ == null)))){
return (m__5372__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5372__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5372__auto__.call(null,m,ch));
} else {
throw cljs.core.missing_protocol("Mult.untap*",m);
}
}
});
cljs.core.async.untap_STAR_ = (function cljs$core$async$untap_STAR_(m,ch){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mult$untap_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mult$untap_STAR_$arity$2(m,ch);
} else {
return cljs$core$async$Mult$untap_STAR_$dyn_18589(m,ch);
}
});

var cljs$core$async$Mult$untap_all_STAR_$dyn_18590 = (function (m){
var x__5373__auto__ = (((m == null))?null:m);
var m__5374__auto__ = (cljs.core.async.untap_all_STAR_[goog.typeOf(x__5373__auto__)]);
if((!((m__5374__auto__ == null)))){
return (m__5374__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5374__auto__.cljs$core$IFn$_invoke$arity$1(m) : m__5374__auto__.call(null,m));
} else {
var m__5372__auto__ = (cljs.core.async.untap_all_STAR_["_"]);
if((!((m__5372__auto__ == null)))){
return (m__5372__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5372__auto__.cljs$core$IFn$_invoke$arity$1(m) : m__5372__auto__.call(null,m));
} else {
throw cljs.core.missing_protocol("Mult.untap-all*",m);
}
}
});
cljs.core.async.untap_all_STAR_ = (function cljs$core$async$untap_all_STAR_(m){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mult$untap_all_STAR_$arity$1 == null)))))){
return m.cljs$core$async$Mult$untap_all_STAR_$arity$1(m);
} else {
return cljs$core$async$Mult$untap_all_STAR_$dyn_18590(m);
}
});


/**
* @constructor
 * @implements {cljs.core.async.Mult}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async16098 = (function (ch,cs,meta16099){
this.ch = ch;
this.cs = cs;
this.meta16099 = meta16099;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async16098.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_16100,meta16099__$1){
var self__ = this;
var _16100__$1 = this;
return (new cljs.core.async.t_cljs$core$async16098(self__.ch,self__.cs,meta16099__$1));
}));

(cljs.core.async.t_cljs$core$async16098.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_16100){
var self__ = this;
var _16100__$1 = this;
return self__.meta16099;
}));

(cljs.core.async.t_cljs$core$async16098.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async16098.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
}));

(cljs.core.async.t_cljs$core$async16098.prototype.cljs$core$async$Mult$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async16098.prototype.cljs$core$async$Mult$tap_STAR_$arity$3 = (function (_,ch__$1,close_QMARK_){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(self__.cs,cljs.core.assoc,ch__$1,close_QMARK_);

return null;
}));

(cljs.core.async.t_cljs$core$async16098.prototype.cljs$core$async$Mult$untap_STAR_$arity$2 = (function (_,ch__$1){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.cs,cljs.core.dissoc,ch__$1);

return null;
}));

(cljs.core.async.t_cljs$core$async16098.prototype.cljs$core$async$Mult$untap_all_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_(self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return null;
}));

(cljs.core.async.t_cljs$core$async16098.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"meta16099","meta16099",-252527635,null)], null);
}));

(cljs.core.async.t_cljs$core$async16098.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async16098.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async16098");

(cljs.core.async.t_cljs$core$async16098.cljs$lang$ctorPrWriter = (function (this__5310__auto__,writer__5311__auto__,opt__5312__auto__){
return cljs.core._write(writer__5311__auto__,"cljs.core.async/t_cljs$core$async16098");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async16098.
 */
cljs.core.async.__GT_t_cljs$core$async16098 = (function cljs$core$async$__GT_t_cljs$core$async16098(ch,cs,meta16099){
return (new cljs.core.async.t_cljs$core$async16098(ch,cs,meta16099));
});


/**
 * Creates and returns a mult(iple) of the supplied channel. Channels
 *   containing copies of the channel can be created with 'tap', and
 *   detached with 'untap'.
 * 
 *   Each item is distributed to all taps in parallel and synchronously,
 *   i.e. each tap must accept before the next item is distributed. Use
 *   buffering/windowing to prevent slow taps from holding up the mult.
 * 
 *   Items received when there are no taps get dropped.
 * 
 *   If a tap puts to a closed channel, it will be removed from the mult.
 */
cljs.core.async.mult = (function cljs$core$async$mult(ch){
var cs = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var m = (new cljs.core.async.t_cljs$core$async16098(ch,cs,cljs.core.PersistentArrayMap.EMPTY));
var dchan = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
var dctr = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var done = (function (_){
if((cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(dctr,cljs.core.dec) === (0))){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(dchan,true);
} else {
return null;
}
});
var c__14559__auto___18595 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__14560__auto__ = (function (){var switch__13986__auto__ = (function (state_16261){
var state_val_16263 = (state_16261[(1)]);
if((state_val_16263 === (7))){
var inst_16253 = (state_16261[(2)]);
var state_16261__$1 = state_16261;
var statearr_16270_18596 = state_16261__$1;
(statearr_16270_18596[(2)] = inst_16253);

(statearr_16270_18596[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16263 === (20))){
var inst_16155 = (state_16261[(7)]);
var inst_16169 = cljs.core.first(inst_16155);
var inst_16170 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_16169,(0),null);
var inst_16171 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_16169,(1),null);
var state_16261__$1 = (function (){var statearr_16279 = state_16261;
(statearr_16279[(8)] = inst_16170);

return statearr_16279;
})();
if(cljs.core.truth_(inst_16171)){
var statearr_16284_18597 = state_16261__$1;
(statearr_16284_18597[(1)] = (22));

} else {
var statearr_16285_18598 = state_16261__$1;
(statearr_16285_18598[(1)] = (23));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16263 === (27))){
var inst_16199 = (state_16261[(9)]);
var inst_16201 = (state_16261[(10)]);
var inst_16206 = (state_16261[(11)]);
var inst_16114 = (state_16261[(12)]);
var inst_16206__$1 = cljs.core._nth(inst_16199,inst_16201);
var inst_16207 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3(inst_16206__$1,inst_16114,done);
var state_16261__$1 = (function (){var statearr_16289 = state_16261;
(statearr_16289[(11)] = inst_16206__$1);

return statearr_16289;
})();
if(cljs.core.truth_(inst_16207)){
var statearr_16291_18599 = state_16261__$1;
(statearr_16291_18599[(1)] = (30));

} else {
var statearr_16294_18600 = state_16261__$1;
(statearr_16294_18600[(1)] = (31));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16263 === (1))){
var state_16261__$1 = state_16261;
var statearr_16298_18601 = state_16261__$1;
(statearr_16298_18601[(2)] = null);

(statearr_16298_18601[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16263 === (24))){
var inst_16155 = (state_16261[(7)]);
var inst_16176 = (state_16261[(2)]);
var inst_16177 = cljs.core.next(inst_16155);
var inst_16132 = inst_16177;
var inst_16133 = null;
var inst_16134 = (0);
var inst_16135 = (0);
var state_16261__$1 = (function (){var statearr_16304 = state_16261;
(statearr_16304[(13)] = inst_16176);

(statearr_16304[(14)] = inst_16132);

(statearr_16304[(15)] = inst_16133);

(statearr_16304[(16)] = inst_16134);

(statearr_16304[(17)] = inst_16135);

return statearr_16304;
})();
var statearr_16307_18602 = state_16261__$1;
(statearr_16307_18602[(2)] = null);

(statearr_16307_18602[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16263 === (39))){
var state_16261__$1 = state_16261;
var statearr_16318_18603 = state_16261__$1;
(statearr_16318_18603[(2)] = null);

(statearr_16318_18603[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16263 === (4))){
var inst_16114 = (state_16261[(12)]);
var inst_16114__$1 = (state_16261[(2)]);
var inst_16119 = (inst_16114__$1 == null);
var state_16261__$1 = (function (){var statearr_16321 = state_16261;
(statearr_16321[(12)] = inst_16114__$1);

return statearr_16321;
})();
if(cljs.core.truth_(inst_16119)){
var statearr_16322_18608 = state_16261__$1;
(statearr_16322_18608[(1)] = (5));

} else {
var statearr_16323_18609 = state_16261__$1;
(statearr_16323_18609[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16263 === (15))){
var inst_16135 = (state_16261[(17)]);
var inst_16132 = (state_16261[(14)]);
var inst_16133 = (state_16261[(15)]);
var inst_16134 = (state_16261[(16)]);
var inst_16151 = (state_16261[(2)]);
var inst_16152 = (inst_16135 + (1));
var tmp16309 = inst_16134;
var tmp16310 = inst_16133;
var tmp16311 = inst_16132;
var inst_16132__$1 = tmp16311;
var inst_16133__$1 = tmp16310;
var inst_16134__$1 = tmp16309;
var inst_16135__$1 = inst_16152;
var state_16261__$1 = (function (){var statearr_16333 = state_16261;
(statearr_16333[(18)] = inst_16151);

(statearr_16333[(14)] = inst_16132__$1);

(statearr_16333[(15)] = inst_16133__$1);

(statearr_16333[(16)] = inst_16134__$1);

(statearr_16333[(17)] = inst_16135__$1);

return statearr_16333;
})();
var statearr_16334_18613 = state_16261__$1;
(statearr_16334_18613[(2)] = null);

(statearr_16334_18613[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16263 === (21))){
var inst_16180 = (state_16261[(2)]);
var state_16261__$1 = state_16261;
var statearr_16344_18614 = state_16261__$1;
(statearr_16344_18614[(2)] = inst_16180);

(statearr_16344_18614[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16263 === (31))){
var inst_16206 = (state_16261[(11)]);
var inst_16210 = m.cljs$core$async$Mult$untap_STAR_$arity$2(null,inst_16206);
var state_16261__$1 = state_16261;
var statearr_16350_18615 = state_16261__$1;
(statearr_16350_18615[(2)] = inst_16210);

(statearr_16350_18615[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16263 === (32))){
var inst_16201 = (state_16261[(10)]);
var inst_16198 = (state_16261[(19)]);
var inst_16199 = (state_16261[(9)]);
var inst_16200 = (state_16261[(20)]);
var inst_16212 = (state_16261[(2)]);
var inst_16213 = (inst_16201 + (1));
var tmp16341 = inst_16200;
var tmp16342 = inst_16199;
var tmp16343 = inst_16198;
var inst_16198__$1 = tmp16343;
var inst_16199__$1 = tmp16342;
var inst_16200__$1 = tmp16341;
var inst_16201__$1 = inst_16213;
var state_16261__$1 = (function (){var statearr_16355 = state_16261;
(statearr_16355[(21)] = inst_16212);

(statearr_16355[(19)] = inst_16198__$1);

(statearr_16355[(9)] = inst_16199__$1);

(statearr_16355[(20)] = inst_16200__$1);

(statearr_16355[(10)] = inst_16201__$1);

return statearr_16355;
})();
var statearr_16359_18616 = state_16261__$1;
(statearr_16359_18616[(2)] = null);

(statearr_16359_18616[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16263 === (40))){
var inst_16225 = (state_16261[(22)]);
var inst_16229 = m.cljs$core$async$Mult$untap_STAR_$arity$2(null,inst_16225);
var state_16261__$1 = state_16261;
var statearr_16364_18617 = state_16261__$1;
(statearr_16364_18617[(2)] = inst_16229);

(statearr_16364_18617[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16263 === (33))){
var inst_16216 = (state_16261[(23)]);
var inst_16218 = cljs.core.chunked_seq_QMARK_(inst_16216);
var state_16261__$1 = state_16261;
if(inst_16218){
var statearr_16368_18618 = state_16261__$1;
(statearr_16368_18618[(1)] = (36));

} else {
var statearr_16369_18619 = state_16261__$1;
(statearr_16369_18619[(1)] = (37));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16263 === (13))){
var inst_16145 = (state_16261[(24)]);
var inst_16148 = cljs.core.async.close_BANG_(inst_16145);
var state_16261__$1 = state_16261;
var statearr_16371_18620 = state_16261__$1;
(statearr_16371_18620[(2)] = inst_16148);

(statearr_16371_18620[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16263 === (22))){
var inst_16170 = (state_16261[(8)]);
var inst_16173 = cljs.core.async.close_BANG_(inst_16170);
var state_16261__$1 = state_16261;
var statearr_16375_18621 = state_16261__$1;
(statearr_16375_18621[(2)] = inst_16173);

(statearr_16375_18621[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16263 === (36))){
var inst_16216 = (state_16261[(23)]);
var inst_16220 = cljs.core.chunk_first(inst_16216);
var inst_16221 = cljs.core.chunk_rest(inst_16216);
var inst_16222 = cljs.core.count(inst_16220);
var inst_16198 = inst_16221;
var inst_16199 = inst_16220;
var inst_16200 = inst_16222;
var inst_16201 = (0);
var state_16261__$1 = (function (){var statearr_16382 = state_16261;
(statearr_16382[(19)] = inst_16198);

(statearr_16382[(9)] = inst_16199);

(statearr_16382[(20)] = inst_16200);

(statearr_16382[(10)] = inst_16201);

return statearr_16382;
})();
var statearr_16384_18625 = state_16261__$1;
(statearr_16384_18625[(2)] = null);

(statearr_16384_18625[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16263 === (41))){
var inst_16216 = (state_16261[(23)]);
var inst_16231 = (state_16261[(2)]);
var inst_16232 = cljs.core.next(inst_16216);
var inst_16198 = inst_16232;
var inst_16199 = null;
var inst_16200 = (0);
var inst_16201 = (0);
var state_16261__$1 = (function (){var statearr_16389 = state_16261;
(statearr_16389[(25)] = inst_16231);

(statearr_16389[(19)] = inst_16198);

(statearr_16389[(9)] = inst_16199);

(statearr_16389[(20)] = inst_16200);

(statearr_16389[(10)] = inst_16201);

return statearr_16389;
})();
var statearr_16392_18626 = state_16261__$1;
(statearr_16392_18626[(2)] = null);

(statearr_16392_18626[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16263 === (43))){
var state_16261__$1 = state_16261;
var statearr_16394_18627 = state_16261__$1;
(statearr_16394_18627[(2)] = null);

(statearr_16394_18627[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16263 === (29))){
var inst_16240 = (state_16261[(2)]);
var state_16261__$1 = state_16261;
var statearr_16397_18628 = state_16261__$1;
(statearr_16397_18628[(2)] = inst_16240);

(statearr_16397_18628[(1)] = (26));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16263 === (44))){
var inst_16250 = (state_16261[(2)]);
var state_16261__$1 = (function (){var statearr_16399 = state_16261;
(statearr_16399[(26)] = inst_16250);

return statearr_16399;
})();
var statearr_16401_18629 = state_16261__$1;
(statearr_16401_18629[(2)] = null);

(statearr_16401_18629[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16263 === (6))){
var inst_16190 = (state_16261[(27)]);
var inst_16189 = cljs.core.deref(cs);
var inst_16190__$1 = cljs.core.keys(inst_16189);
var inst_16191 = cljs.core.count(inst_16190__$1);
var inst_16192 = cljs.core.reset_BANG_(dctr,inst_16191);
var inst_16197 = cljs.core.seq(inst_16190__$1);
var inst_16198 = inst_16197;
var inst_16199 = null;
var inst_16200 = (0);
var inst_16201 = (0);
var state_16261__$1 = (function (){var statearr_16405 = state_16261;
(statearr_16405[(27)] = inst_16190__$1);

(statearr_16405[(28)] = inst_16192);

(statearr_16405[(19)] = inst_16198);

(statearr_16405[(9)] = inst_16199);

(statearr_16405[(20)] = inst_16200);

(statearr_16405[(10)] = inst_16201);

return statearr_16405;
})();
var statearr_16407_18630 = state_16261__$1;
(statearr_16407_18630[(2)] = null);

(statearr_16407_18630[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16263 === (28))){
var inst_16198 = (state_16261[(19)]);
var inst_16216 = (state_16261[(23)]);
var inst_16216__$1 = cljs.core.seq(inst_16198);
var state_16261__$1 = (function (){var statearr_16411 = state_16261;
(statearr_16411[(23)] = inst_16216__$1);

return statearr_16411;
})();
if(inst_16216__$1){
var statearr_16414_18635 = state_16261__$1;
(statearr_16414_18635[(1)] = (33));

} else {
var statearr_16417_18636 = state_16261__$1;
(statearr_16417_18636[(1)] = (34));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16263 === (25))){
var inst_16201 = (state_16261[(10)]);
var inst_16200 = (state_16261[(20)]);
var inst_16203 = (inst_16201 < inst_16200);
var inst_16204 = inst_16203;
var state_16261__$1 = state_16261;
if(cljs.core.truth_(inst_16204)){
var statearr_16420_18640 = state_16261__$1;
(statearr_16420_18640[(1)] = (27));

} else {
var statearr_16422_18641 = state_16261__$1;
(statearr_16422_18641[(1)] = (28));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16263 === (34))){
var state_16261__$1 = state_16261;
var statearr_16427_18642 = state_16261__$1;
(statearr_16427_18642[(2)] = null);

(statearr_16427_18642[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16263 === (17))){
var state_16261__$1 = state_16261;
var statearr_16428_18643 = state_16261__$1;
(statearr_16428_18643[(2)] = null);

(statearr_16428_18643[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16263 === (3))){
var inst_16256 = (state_16261[(2)]);
var state_16261__$1 = state_16261;
return cljs.core.async.impl.ioc_helpers.return_chan(state_16261__$1,inst_16256);
} else {
if((state_val_16263 === (12))){
var inst_16185 = (state_16261[(2)]);
var state_16261__$1 = state_16261;
var statearr_16433_18645 = state_16261__$1;
(statearr_16433_18645[(2)] = inst_16185);

(statearr_16433_18645[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16263 === (2))){
var state_16261__$1 = state_16261;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_16261__$1,(4),ch);
} else {
if((state_val_16263 === (23))){
var state_16261__$1 = state_16261;
var statearr_16439_18646 = state_16261__$1;
(statearr_16439_18646[(2)] = null);

(statearr_16439_18646[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16263 === (35))){
var inst_16238 = (state_16261[(2)]);
var state_16261__$1 = state_16261;
var statearr_16441_18647 = state_16261__$1;
(statearr_16441_18647[(2)] = inst_16238);

(statearr_16441_18647[(1)] = (29));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16263 === (19))){
var inst_16155 = (state_16261[(7)]);
var inst_16161 = cljs.core.chunk_first(inst_16155);
var inst_16162 = cljs.core.chunk_rest(inst_16155);
var inst_16163 = cljs.core.count(inst_16161);
var inst_16132 = inst_16162;
var inst_16133 = inst_16161;
var inst_16134 = inst_16163;
var inst_16135 = (0);
var state_16261__$1 = (function (){var statearr_16445 = state_16261;
(statearr_16445[(14)] = inst_16132);

(statearr_16445[(15)] = inst_16133);

(statearr_16445[(16)] = inst_16134);

(statearr_16445[(17)] = inst_16135);

return statearr_16445;
})();
var statearr_16447_18648 = state_16261__$1;
(statearr_16447_18648[(2)] = null);

(statearr_16447_18648[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16263 === (11))){
var inst_16132 = (state_16261[(14)]);
var inst_16155 = (state_16261[(7)]);
var inst_16155__$1 = cljs.core.seq(inst_16132);
var state_16261__$1 = (function (){var statearr_16455 = state_16261;
(statearr_16455[(7)] = inst_16155__$1);

return statearr_16455;
})();
if(inst_16155__$1){
var statearr_16460_18649 = state_16261__$1;
(statearr_16460_18649[(1)] = (16));

} else {
var statearr_16461_18650 = state_16261__$1;
(statearr_16461_18650[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16263 === (9))){
var inst_16187 = (state_16261[(2)]);
var state_16261__$1 = state_16261;
var statearr_16467_18654 = state_16261__$1;
(statearr_16467_18654[(2)] = inst_16187);

(statearr_16467_18654[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16263 === (5))){
var inst_16126 = cljs.core.deref(cs);
var inst_16127 = cljs.core.seq(inst_16126);
var inst_16132 = inst_16127;
var inst_16133 = null;
var inst_16134 = (0);
var inst_16135 = (0);
var state_16261__$1 = (function (){var statearr_16472 = state_16261;
(statearr_16472[(14)] = inst_16132);

(statearr_16472[(15)] = inst_16133);

(statearr_16472[(16)] = inst_16134);

(statearr_16472[(17)] = inst_16135);

return statearr_16472;
})();
var statearr_16474_18655 = state_16261__$1;
(statearr_16474_18655[(2)] = null);

(statearr_16474_18655[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16263 === (14))){
var state_16261__$1 = state_16261;
var statearr_16478_18656 = state_16261__$1;
(statearr_16478_18656[(2)] = null);

(statearr_16478_18656[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16263 === (45))){
var inst_16246 = (state_16261[(2)]);
var state_16261__$1 = state_16261;
var statearr_16479_18657 = state_16261__$1;
(statearr_16479_18657[(2)] = inst_16246);

(statearr_16479_18657[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16263 === (26))){
var inst_16190 = (state_16261[(27)]);
var inst_16242 = (state_16261[(2)]);
var inst_16243 = cljs.core.seq(inst_16190);
var state_16261__$1 = (function (){var statearr_16481 = state_16261;
(statearr_16481[(29)] = inst_16242);

return statearr_16481;
})();
if(inst_16243){
var statearr_16484_18658 = state_16261__$1;
(statearr_16484_18658[(1)] = (42));

} else {
var statearr_16489_18659 = state_16261__$1;
(statearr_16489_18659[(1)] = (43));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16263 === (16))){
var inst_16155 = (state_16261[(7)]);
var inst_16158 = cljs.core.chunked_seq_QMARK_(inst_16155);
var state_16261__$1 = state_16261;
if(inst_16158){
var statearr_16492_18660 = state_16261__$1;
(statearr_16492_18660[(1)] = (19));

} else {
var statearr_16493_18661 = state_16261__$1;
(statearr_16493_18661[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16263 === (38))){
var inst_16235 = (state_16261[(2)]);
var state_16261__$1 = state_16261;
var statearr_16498_18662 = state_16261__$1;
(statearr_16498_18662[(2)] = inst_16235);

(statearr_16498_18662[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16263 === (30))){
var state_16261__$1 = state_16261;
var statearr_16499_18663 = state_16261__$1;
(statearr_16499_18663[(2)] = null);

(statearr_16499_18663[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16263 === (10))){
var inst_16133 = (state_16261[(15)]);
var inst_16135 = (state_16261[(17)]);
var inst_16144 = cljs.core._nth(inst_16133,inst_16135);
var inst_16145 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_16144,(0),null);
var inst_16146 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_16144,(1),null);
var state_16261__$1 = (function (){var statearr_16507 = state_16261;
(statearr_16507[(24)] = inst_16145);

return statearr_16507;
})();
if(cljs.core.truth_(inst_16146)){
var statearr_16509_18664 = state_16261__$1;
(statearr_16509_18664[(1)] = (13));

} else {
var statearr_16512_18665 = state_16261__$1;
(statearr_16512_18665[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16263 === (18))){
var inst_16183 = (state_16261[(2)]);
var state_16261__$1 = state_16261;
var statearr_16517_18666 = state_16261__$1;
(statearr_16517_18666[(2)] = inst_16183);

(statearr_16517_18666[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16263 === (42))){
var state_16261__$1 = state_16261;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_16261__$1,(45),dchan);
} else {
if((state_val_16263 === (37))){
var inst_16216 = (state_16261[(23)]);
var inst_16225 = (state_16261[(22)]);
var inst_16114 = (state_16261[(12)]);
var inst_16225__$1 = cljs.core.first(inst_16216);
var inst_16226 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3(inst_16225__$1,inst_16114,done);
var state_16261__$1 = (function (){var statearr_16524 = state_16261;
(statearr_16524[(22)] = inst_16225__$1);

return statearr_16524;
})();
if(cljs.core.truth_(inst_16226)){
var statearr_16527_18671 = state_16261__$1;
(statearr_16527_18671[(1)] = (39));

} else {
var statearr_16529_18672 = state_16261__$1;
(statearr_16529_18672[(1)] = (40));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16263 === (8))){
var inst_16135 = (state_16261[(17)]);
var inst_16134 = (state_16261[(16)]);
var inst_16138 = (inst_16135 < inst_16134);
var inst_16139 = inst_16138;
var state_16261__$1 = state_16261;
if(cljs.core.truth_(inst_16139)){
var statearr_16532_18673 = state_16261__$1;
(statearr_16532_18673[(1)] = (10));

} else {
var statearr_16534_18674 = state_16261__$1;
(statearr_16534_18674[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$mult_$_state_machine__13987__auto__ = null;
var cljs$core$async$mult_$_state_machine__13987__auto____0 = (function (){
var statearr_16539 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_16539[(0)] = cljs$core$async$mult_$_state_machine__13987__auto__);

(statearr_16539[(1)] = (1));

return statearr_16539;
});
var cljs$core$async$mult_$_state_machine__13987__auto____1 = (function (state_16261){
while(true){
var ret_value__13988__auto__ = (function (){try{while(true){
var result__13989__auto__ = switch__13986__auto__(state_16261);
if(cljs.core.keyword_identical_QMARK_(result__13989__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__13989__auto__;
}
break;
}
}catch (e16544){var ex__13990__auto__ = e16544;
var statearr_16545_18675 = state_16261;
(statearr_16545_18675[(2)] = ex__13990__auto__);


if(cljs.core.seq((state_16261[(4)]))){
var statearr_16547_18677 = state_16261;
(statearr_16547_18677[(1)] = cljs.core.first((state_16261[(4)])));

} else {
throw ex__13990__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__13988__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__18678 = state_16261;
state_16261 = G__18678;
continue;
} else {
return ret_value__13988__auto__;
}
break;
}
});
cljs$core$async$mult_$_state_machine__13987__auto__ = function(state_16261){
switch(arguments.length){
case 0:
return cljs$core$async$mult_$_state_machine__13987__auto____0.call(this);
case 1:
return cljs$core$async$mult_$_state_machine__13987__auto____1.call(this,state_16261);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mult_$_state_machine__13987__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mult_$_state_machine__13987__auto____0;
cljs$core$async$mult_$_state_machine__13987__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mult_$_state_machine__13987__auto____1;
return cljs$core$async$mult_$_state_machine__13987__auto__;
})()
})();
var state__14561__auto__ = (function (){var statearr_16560 = f__14560__auto__();
(statearr_16560[(6)] = c__14559__auto___18595);

return statearr_16560;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__14561__auto__);
}));


return m;
});
/**
 * Copies the mult source onto the supplied channel.
 * 
 *   By default the channel will be closed when the source closes,
 *   but can be determined by the close? parameter.
 */
cljs.core.async.tap = (function cljs$core$async$tap(var_args){
var G__16574 = arguments.length;
switch (G__16574) {
case 2:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2 = (function (mult,ch){
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3(mult,ch,true);
}));

(cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3 = (function (mult,ch,close_QMARK_){
cljs.core.async.tap_STAR_(mult,ch,close_QMARK_);

return ch;
}));

(cljs.core.async.tap.cljs$lang$maxFixedArity = 3);

/**
 * Disconnects a target channel from a mult
 */
cljs.core.async.untap = (function cljs$core$async$untap(mult,ch){
return cljs.core.async.untap_STAR_(mult,ch);
});
/**
 * Disconnects all target channels from a mult
 */
cljs.core.async.untap_all = (function cljs$core$async$untap_all(mult){
return cljs.core.async.untap_all_STAR_(mult);
});

/**
 * @interface
 */
cljs.core.async.Mix = function(){};

var cljs$core$async$Mix$admix_STAR_$dyn_18680 = (function (m,ch){
var x__5373__auto__ = (((m == null))?null:m);
var m__5374__auto__ = (cljs.core.async.admix_STAR_[goog.typeOf(x__5373__auto__)]);
if((!((m__5374__auto__ == null)))){
return (m__5374__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5374__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5374__auto__.call(null,m,ch));
} else {
var m__5372__auto__ = (cljs.core.async.admix_STAR_["_"]);
if((!((m__5372__auto__ == null)))){
return (m__5372__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5372__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5372__auto__.call(null,m,ch));
} else {
throw cljs.core.missing_protocol("Mix.admix*",m);
}
}
});
cljs.core.async.admix_STAR_ = (function cljs$core$async$admix_STAR_(m,ch){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$admix_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$admix_STAR_$arity$2(m,ch);
} else {
return cljs$core$async$Mix$admix_STAR_$dyn_18680(m,ch);
}
});

var cljs$core$async$Mix$unmix_STAR_$dyn_18681 = (function (m,ch){
var x__5373__auto__ = (((m == null))?null:m);
var m__5374__auto__ = (cljs.core.async.unmix_STAR_[goog.typeOf(x__5373__auto__)]);
if((!((m__5374__auto__ == null)))){
return (m__5374__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5374__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5374__auto__.call(null,m,ch));
} else {
var m__5372__auto__ = (cljs.core.async.unmix_STAR_["_"]);
if((!((m__5372__auto__ == null)))){
return (m__5372__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5372__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5372__auto__.call(null,m,ch));
} else {
throw cljs.core.missing_protocol("Mix.unmix*",m);
}
}
});
cljs.core.async.unmix_STAR_ = (function cljs$core$async$unmix_STAR_(m,ch){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$unmix_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$unmix_STAR_$arity$2(m,ch);
} else {
return cljs$core$async$Mix$unmix_STAR_$dyn_18681(m,ch);
}
});

var cljs$core$async$Mix$unmix_all_STAR_$dyn_18682 = (function (m){
var x__5373__auto__ = (((m == null))?null:m);
var m__5374__auto__ = (cljs.core.async.unmix_all_STAR_[goog.typeOf(x__5373__auto__)]);
if((!((m__5374__auto__ == null)))){
return (m__5374__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5374__auto__.cljs$core$IFn$_invoke$arity$1(m) : m__5374__auto__.call(null,m));
} else {
var m__5372__auto__ = (cljs.core.async.unmix_all_STAR_["_"]);
if((!((m__5372__auto__ == null)))){
return (m__5372__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5372__auto__.cljs$core$IFn$_invoke$arity$1(m) : m__5372__auto__.call(null,m));
} else {
throw cljs.core.missing_protocol("Mix.unmix-all*",m);
}
}
});
cljs.core.async.unmix_all_STAR_ = (function cljs$core$async$unmix_all_STAR_(m){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$unmix_all_STAR_$arity$1 == null)))))){
return m.cljs$core$async$Mix$unmix_all_STAR_$arity$1(m);
} else {
return cljs$core$async$Mix$unmix_all_STAR_$dyn_18682(m);
}
});

var cljs$core$async$Mix$toggle_STAR_$dyn_18683 = (function (m,state_map){
var x__5373__auto__ = (((m == null))?null:m);
var m__5374__auto__ = (cljs.core.async.toggle_STAR_[goog.typeOf(x__5373__auto__)]);
if((!((m__5374__auto__ == null)))){
return (m__5374__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5374__auto__.cljs$core$IFn$_invoke$arity$2(m,state_map) : m__5374__auto__.call(null,m,state_map));
} else {
var m__5372__auto__ = (cljs.core.async.toggle_STAR_["_"]);
if((!((m__5372__auto__ == null)))){
return (m__5372__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5372__auto__.cljs$core$IFn$_invoke$arity$2(m,state_map) : m__5372__auto__.call(null,m,state_map));
} else {
throw cljs.core.missing_protocol("Mix.toggle*",m);
}
}
});
cljs.core.async.toggle_STAR_ = (function cljs$core$async$toggle_STAR_(m,state_map){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$toggle_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$toggle_STAR_$arity$2(m,state_map);
} else {
return cljs$core$async$Mix$toggle_STAR_$dyn_18683(m,state_map);
}
});

var cljs$core$async$Mix$solo_mode_STAR_$dyn_18684 = (function (m,mode){
var x__5373__auto__ = (((m == null))?null:m);
var m__5374__auto__ = (cljs.core.async.solo_mode_STAR_[goog.typeOf(x__5373__auto__)]);
if((!((m__5374__auto__ == null)))){
return (m__5374__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5374__auto__.cljs$core$IFn$_invoke$arity$2(m,mode) : m__5374__auto__.call(null,m,mode));
} else {
var m__5372__auto__ = (cljs.core.async.solo_mode_STAR_["_"]);
if((!((m__5372__auto__ == null)))){
return (m__5372__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5372__auto__.cljs$core$IFn$_invoke$arity$2(m,mode) : m__5372__auto__.call(null,m,mode));
} else {
throw cljs.core.missing_protocol("Mix.solo-mode*",m);
}
}
});
cljs.core.async.solo_mode_STAR_ = (function cljs$core$async$solo_mode_STAR_(m,mode){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$solo_mode_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$solo_mode_STAR_$arity$2(m,mode);
} else {
return cljs$core$async$Mix$solo_mode_STAR_$dyn_18684(m,mode);
}
});

cljs.core.async.ioc_alts_BANG_ = (function cljs$core$async$ioc_alts_BANG_(var_args){
var args__5755__auto__ = [];
var len__5749__auto___18687 = arguments.length;
var i__5750__auto___18688 = (0);
while(true){
if((i__5750__auto___18688 < len__5749__auto___18687)){
args__5755__auto__.push((arguments[i__5750__auto___18688]));

var G__18689 = (i__5750__auto___18688 + (1));
i__5750__auto___18688 = G__18689;
continue;
} else {
}
break;
}

var argseq__5756__auto__ = ((((3) < args__5755__auto__.length))?(new cljs.core.IndexedSeq(args__5755__auto__.slice((3)),(0),null)):null);
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__5756__auto__);
});

(cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (state,cont_block,ports,p__16700){
var map__16702 = p__16700;
var map__16702__$1 = cljs.core.__destructure_map(map__16702);
var opts = map__16702__$1;
var statearr_16703_18691 = state;
(statearr_16703_18691[(1)] = cont_block);


var temp__5823__auto__ = cljs.core.async.do_alts((function (val){
var statearr_16705_18692 = state;
(statearr_16705_18692[(2)] = val);


return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state);
}),ports,opts);
if(cljs.core.truth_(temp__5823__auto__)){
var cb = temp__5823__auto__;
var statearr_16709_18693 = state;
(statearr_16709_18693[(2)] = cljs.core.deref(cb));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}));

(cljs.core.async.ioc_alts_BANG_.cljs$lang$maxFixedArity = (3));

/** @this {Function} */
(cljs.core.async.ioc_alts_BANG_.cljs$lang$applyTo = (function (seq16696){
var G__16697 = cljs.core.first(seq16696);
var seq16696__$1 = cljs.core.next(seq16696);
var G__16698 = cljs.core.first(seq16696__$1);
var seq16696__$2 = cljs.core.next(seq16696__$1);
var G__16699 = cljs.core.first(seq16696__$2);
var seq16696__$3 = cljs.core.next(seq16696__$2);
var self__5734__auto__ = this;
return self__5734__auto__.cljs$core$IFn$_invoke$arity$variadic(G__16697,G__16698,G__16699,seq16696__$3);
}));


/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mix}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async16728 = (function (change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta16729){
this.change = change;
this.solo_mode = solo_mode;
this.pick = pick;
this.cs = cs;
this.calc_state = calc_state;
this.out = out;
this.changed = changed;
this.solo_modes = solo_modes;
this.attrs = attrs;
this.meta16729 = meta16729;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async16728.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_16730,meta16729__$1){
var self__ = this;
var _16730__$1 = this;
return (new cljs.core.async.t_cljs$core$async16728(self__.change,self__.solo_mode,self__.pick,self__.cs,self__.calc_state,self__.out,self__.changed,self__.solo_modes,self__.attrs,meta16729__$1));
}));

(cljs.core.async.t_cljs$core$async16728.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_16730){
var self__ = this;
var _16730__$1 = this;
return self__.meta16729;
}));

(cljs.core.async.t_cljs$core$async16728.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async16728.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.out;
}));

(cljs.core.async.t_cljs$core$async16728.prototype.cljs$core$async$Mix$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async16728.prototype.cljs$core$async$Mix$admix_STAR_$arity$2 = (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(self__.cs,cljs.core.assoc,ch,cljs.core.PersistentArrayMap.EMPTY);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async16728.prototype.cljs$core$async$Mix$unmix_STAR_$arity$2 = (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.cs,cljs.core.dissoc,ch);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async16728.prototype.cljs$core$async$Mix$unmix_all_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_(self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async16728.prototype.cljs$core$async$Mix$toggle_STAR_$arity$2 = (function (_,state_map){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.cs,cljs.core.partial.cljs$core$IFn$_invoke$arity$2(cljs.core.merge_with,cljs.core.merge),state_map);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async16728.prototype.cljs$core$async$Mix$solo_mode_STAR_$arity$2 = (function (_,mode){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_((self__.solo_modes.cljs$core$IFn$_invoke$arity$1 ? self__.solo_modes.cljs$core$IFn$_invoke$arity$1(mode) : self__.solo_modes.call(null,mode)))){
} else {
throw (new Error(["Assert failed: ",["mode must be one of: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(self__.solo_modes)].join(''),"\n","(solo-modes mode)"].join('')));
}

cljs.core.reset_BANG_(self__.solo_mode,mode);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async16728.getBasis = (function (){
return new cljs.core.PersistentVector(null, 10, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"change","change",477485025,null),new cljs.core.Symbol(null,"solo-mode","solo-mode",2031788074,null),new cljs.core.Symbol(null,"pick","pick",1300068175,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"calc-state","calc-state",-349968968,null),new cljs.core.Symbol(null,"out","out",729986010,null),new cljs.core.Symbol(null,"changed","changed",-2083710852,null),new cljs.core.Symbol(null,"solo-modes","solo-modes",882180540,null),new cljs.core.Symbol(null,"attrs","attrs",-450137186,null),new cljs.core.Symbol(null,"meta16729","meta16729",-1079812676,null)], null);
}));

(cljs.core.async.t_cljs$core$async16728.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async16728.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async16728");

(cljs.core.async.t_cljs$core$async16728.cljs$lang$ctorPrWriter = (function (this__5310__auto__,writer__5311__auto__,opt__5312__auto__){
return cljs.core._write(writer__5311__auto__,"cljs.core.async/t_cljs$core$async16728");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async16728.
 */
cljs.core.async.__GT_t_cljs$core$async16728 = (function cljs$core$async$__GT_t_cljs$core$async16728(change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta16729){
return (new cljs.core.async.t_cljs$core$async16728(change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta16729));
});


/**
 * Creates and returns a mix of one or more input channels which will
 *   be put on the supplied out channel. Input sources can be added to
 *   the mix with 'admix', and removed with 'unmix'. A mix supports
 *   soloing, muting and pausing multiple inputs atomically using
 *   'toggle', and can solo using either muting or pausing as determined
 *   by 'solo-mode'.
 * 
 *   Each channel can have zero or more boolean modes set via 'toggle':
 * 
 *   :solo - when true, only this (ond other soloed) channel(s) will appear
 *        in the mix output channel. :mute and :pause states of soloed
 *        channels are ignored. If solo-mode is :mute, non-soloed
 *        channels are muted, if :pause, non-soloed channels are
 *        paused.
 * 
 *   :mute - muted channels will have their contents consumed but not included in the mix
 *   :pause - paused channels will not have their contents consumed (and thus also not included in the mix)
 */
cljs.core.async.mix = (function cljs$core$async$mix(out){
var cs = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var solo_modes = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"pause","pause",-2095325672),null,new cljs.core.Keyword(null,"mute","mute",1151223646),null], null), null);
var attrs = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(solo_modes,new cljs.core.Keyword(null,"solo","solo",-316350075));
var solo_mode = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"mute","mute",1151223646));
var change = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(cljs.core.async.sliding_buffer((1)));
var changed = (function (){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(change,true);
});
var pick = (function (attr,chs){
return cljs.core.reduce_kv((function (ret,c,v){
if(cljs.core.truth_((attr.cljs$core$IFn$_invoke$arity$1 ? attr.cljs$core$IFn$_invoke$arity$1(v) : attr.call(null,v)))){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(ret,c);
} else {
return ret;
}
}),cljs.core.PersistentHashSet.EMPTY,chs);
});
var calc_state = (function (){
var chs = cljs.core.deref(cs);
var mode = cljs.core.deref(solo_mode);
var solos = pick(new cljs.core.Keyword(null,"solo","solo",-316350075),chs);
var pauses = pick(new cljs.core.Keyword(null,"pause","pause",-2095325672),chs);
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"solos","solos",1441458643),solos,new cljs.core.Keyword(null,"mutes","mutes",1068806309),pick(new cljs.core.Keyword(null,"mute","mute",1151223646),chs),new cljs.core.Keyword(null,"reads","reads",-1215067361),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(((((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(mode,new cljs.core.Keyword(null,"pause","pause",-2095325672))) && (cljs.core.seq(solos))))?cljs.core.vec(solos):cljs.core.vec(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(pauses,cljs.core.keys(chs)))),change)], null);
});
var m = (new cljs.core.async.t_cljs$core$async16728(change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,cljs.core.PersistentArrayMap.EMPTY));
var c__14559__auto___18719 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__14560__auto__ = (function (){var switch__13986__auto__ = (function (state_16822){
var state_val_16823 = (state_16822[(1)]);
if((state_val_16823 === (7))){
var inst_16779 = (state_16822[(2)]);
var state_16822__$1 = state_16822;
if(cljs.core.truth_(inst_16779)){
var statearr_16825_18720 = state_16822__$1;
(statearr_16825_18720[(1)] = (8));

} else {
var statearr_16826_18721 = state_16822__$1;
(statearr_16826_18721[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16823 === (20))){
var inst_16772 = (state_16822[(7)]);
var state_16822__$1 = state_16822;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_16822__$1,(23),out,inst_16772);
} else {
if((state_val_16823 === (1))){
var inst_16748 = calc_state();
var inst_16749 = cljs.core.__destructure_map(inst_16748);
var inst_16754 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_16749,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_16755 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_16749,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_16756 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_16749,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var inst_16757 = inst_16748;
var state_16822__$1 = (function (){var statearr_16837 = state_16822;
(statearr_16837[(8)] = inst_16754);

(statearr_16837[(9)] = inst_16755);

(statearr_16837[(10)] = inst_16756);

(statearr_16837[(11)] = inst_16757);

return statearr_16837;
})();
var statearr_16839_18725 = state_16822__$1;
(statearr_16839_18725[(2)] = null);

(statearr_16839_18725[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16823 === (24))){
var inst_16761 = (state_16822[(12)]);
var inst_16757 = inst_16761;
var state_16822__$1 = (function (){var statearr_16841 = state_16822;
(statearr_16841[(11)] = inst_16757);

return statearr_16841;
})();
var statearr_16842_18729 = state_16822__$1;
(statearr_16842_18729[(2)] = null);

(statearr_16842_18729[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16823 === (4))){
var inst_16772 = (state_16822[(7)]);
var inst_16774 = (state_16822[(13)]);
var inst_16771 = (state_16822[(2)]);
var inst_16772__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_16771,(0),null);
var inst_16773 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_16771,(1),null);
var inst_16774__$1 = (inst_16772__$1 == null);
var state_16822__$1 = (function (){var statearr_16846 = state_16822;
(statearr_16846[(7)] = inst_16772__$1);

(statearr_16846[(14)] = inst_16773);

(statearr_16846[(13)] = inst_16774__$1);

return statearr_16846;
})();
if(cljs.core.truth_(inst_16774__$1)){
var statearr_16847_18738 = state_16822__$1;
(statearr_16847_18738[(1)] = (5));

} else {
var statearr_16848_18739 = state_16822__$1;
(statearr_16848_18739[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16823 === (15))){
var inst_16762 = (state_16822[(15)]);
var inst_16793 = (state_16822[(16)]);
var inst_16793__$1 = cljs.core.empty_QMARK_(inst_16762);
var state_16822__$1 = (function (){var statearr_16854 = state_16822;
(statearr_16854[(16)] = inst_16793__$1);

return statearr_16854;
})();
if(inst_16793__$1){
var statearr_16855_18740 = state_16822__$1;
(statearr_16855_18740[(1)] = (17));

} else {
var statearr_16856_18741 = state_16822__$1;
(statearr_16856_18741[(1)] = (18));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16823 === (21))){
var inst_16761 = (state_16822[(12)]);
var inst_16757 = inst_16761;
var state_16822__$1 = (function (){var statearr_16862 = state_16822;
(statearr_16862[(11)] = inst_16757);

return statearr_16862;
})();
var statearr_16865_18742 = state_16822__$1;
(statearr_16865_18742[(2)] = null);

(statearr_16865_18742[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16823 === (13))){
var inst_16786 = (state_16822[(2)]);
var inst_16787 = calc_state();
var inst_16757 = inst_16787;
var state_16822__$1 = (function (){var statearr_16869 = state_16822;
(statearr_16869[(17)] = inst_16786);

(statearr_16869[(11)] = inst_16757);

return statearr_16869;
})();
var statearr_16871_18745 = state_16822__$1;
(statearr_16871_18745[(2)] = null);

(statearr_16871_18745[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16823 === (22))){
var inst_16815 = (state_16822[(2)]);
var state_16822__$1 = state_16822;
var statearr_16872_18746 = state_16822__$1;
(statearr_16872_18746[(2)] = inst_16815);

(statearr_16872_18746[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16823 === (6))){
var inst_16773 = (state_16822[(14)]);
var inst_16777 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_16773,change);
var state_16822__$1 = state_16822;
var statearr_16877_18747 = state_16822__$1;
(statearr_16877_18747[(2)] = inst_16777);

(statearr_16877_18747[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16823 === (25))){
var state_16822__$1 = state_16822;
var statearr_16884_18748 = state_16822__$1;
(statearr_16884_18748[(2)] = null);

(statearr_16884_18748[(1)] = (26));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16823 === (17))){
var inst_16765 = (state_16822[(18)]);
var inst_16773 = (state_16822[(14)]);
var inst_16797 = (inst_16765.cljs$core$IFn$_invoke$arity$1 ? inst_16765.cljs$core$IFn$_invoke$arity$1(inst_16773) : inst_16765.call(null,inst_16773));
var inst_16798 = cljs.core.not(inst_16797);
var state_16822__$1 = state_16822;
var statearr_16889_18749 = state_16822__$1;
(statearr_16889_18749[(2)] = inst_16798);

(statearr_16889_18749[(1)] = (19));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16823 === (3))){
var inst_16819 = (state_16822[(2)]);
var state_16822__$1 = state_16822;
return cljs.core.async.impl.ioc_helpers.return_chan(state_16822__$1,inst_16819);
} else {
if((state_val_16823 === (12))){
var state_16822__$1 = state_16822;
var statearr_16897_18750 = state_16822__$1;
(statearr_16897_18750[(2)] = null);

(statearr_16897_18750[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16823 === (2))){
var inst_16757 = (state_16822[(11)]);
var inst_16761 = (state_16822[(12)]);
var inst_16761__$1 = cljs.core.__destructure_map(inst_16757);
var inst_16762 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_16761__$1,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_16765 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_16761__$1,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_16766 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_16761__$1,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var state_16822__$1 = (function (){var statearr_16903 = state_16822;
(statearr_16903[(12)] = inst_16761__$1);

(statearr_16903[(15)] = inst_16762);

(statearr_16903[(18)] = inst_16765);

return statearr_16903;
})();
return cljs.core.async.ioc_alts_BANG_(state_16822__$1,(4),inst_16766);
} else {
if((state_val_16823 === (23))){
var inst_16806 = (state_16822[(2)]);
var state_16822__$1 = state_16822;
if(cljs.core.truth_(inst_16806)){
var statearr_16906_18758 = state_16822__$1;
(statearr_16906_18758[(1)] = (24));

} else {
var statearr_16908_18759 = state_16822__$1;
(statearr_16908_18759[(1)] = (25));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16823 === (19))){
var inst_16801 = (state_16822[(2)]);
var state_16822__$1 = state_16822;
var statearr_16913_18760 = state_16822__$1;
(statearr_16913_18760[(2)] = inst_16801);

(statearr_16913_18760[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16823 === (11))){
var inst_16773 = (state_16822[(14)]);
var inst_16783 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(cs,cljs.core.dissoc,inst_16773);
var state_16822__$1 = state_16822;
var statearr_16919_18764 = state_16822__$1;
(statearr_16919_18764[(2)] = inst_16783);

(statearr_16919_18764[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16823 === (9))){
var inst_16762 = (state_16822[(15)]);
var inst_16773 = (state_16822[(14)]);
var inst_16790 = (state_16822[(19)]);
var inst_16790__$1 = (inst_16762.cljs$core$IFn$_invoke$arity$1 ? inst_16762.cljs$core$IFn$_invoke$arity$1(inst_16773) : inst_16762.call(null,inst_16773));
var state_16822__$1 = (function (){var statearr_16923 = state_16822;
(statearr_16923[(19)] = inst_16790__$1);

return statearr_16923;
})();
if(cljs.core.truth_(inst_16790__$1)){
var statearr_16925_18765 = state_16822__$1;
(statearr_16925_18765[(1)] = (14));

} else {
var statearr_16926_18766 = state_16822__$1;
(statearr_16926_18766[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16823 === (5))){
var inst_16774 = (state_16822[(13)]);
var state_16822__$1 = state_16822;
var statearr_16927_18767 = state_16822__$1;
(statearr_16927_18767[(2)] = inst_16774);

(statearr_16927_18767[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16823 === (14))){
var inst_16790 = (state_16822[(19)]);
var state_16822__$1 = state_16822;
var statearr_16928_18768 = state_16822__$1;
(statearr_16928_18768[(2)] = inst_16790);

(statearr_16928_18768[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16823 === (26))){
var inst_16811 = (state_16822[(2)]);
var state_16822__$1 = state_16822;
var statearr_16929_18775 = state_16822__$1;
(statearr_16929_18775[(2)] = inst_16811);

(statearr_16929_18775[(1)] = (22));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16823 === (16))){
var inst_16803 = (state_16822[(2)]);
var state_16822__$1 = state_16822;
if(cljs.core.truth_(inst_16803)){
var statearr_16930_18776 = state_16822__$1;
(statearr_16930_18776[(1)] = (20));

} else {
var statearr_16931_18778 = state_16822__$1;
(statearr_16931_18778[(1)] = (21));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16823 === (10))){
var inst_16817 = (state_16822[(2)]);
var state_16822__$1 = state_16822;
var statearr_16933_18780 = state_16822__$1;
(statearr_16933_18780[(2)] = inst_16817);

(statearr_16933_18780[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16823 === (18))){
var inst_16793 = (state_16822[(16)]);
var state_16822__$1 = state_16822;
var statearr_16939_18781 = state_16822__$1;
(statearr_16939_18781[(2)] = inst_16793);

(statearr_16939_18781[(1)] = (19));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16823 === (8))){
var inst_16772 = (state_16822[(7)]);
var inst_16781 = (inst_16772 == null);
var state_16822__$1 = state_16822;
if(cljs.core.truth_(inst_16781)){
var statearr_16945_18794 = state_16822__$1;
(statearr_16945_18794[(1)] = (11));

} else {
var statearr_16946_18795 = state_16822__$1;
(statearr_16946_18795[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$mix_$_state_machine__13987__auto__ = null;
var cljs$core$async$mix_$_state_machine__13987__auto____0 = (function (){
var statearr_16969 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_16969[(0)] = cljs$core$async$mix_$_state_machine__13987__auto__);

(statearr_16969[(1)] = (1));

return statearr_16969;
});
var cljs$core$async$mix_$_state_machine__13987__auto____1 = (function (state_16822){
while(true){
var ret_value__13988__auto__ = (function (){try{while(true){
var result__13989__auto__ = switch__13986__auto__(state_16822);
if(cljs.core.keyword_identical_QMARK_(result__13989__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__13989__auto__;
}
break;
}
}catch (e16971){var ex__13990__auto__ = e16971;
var statearr_16972_18802 = state_16822;
(statearr_16972_18802[(2)] = ex__13990__auto__);


if(cljs.core.seq((state_16822[(4)]))){
var statearr_16973_18803 = state_16822;
(statearr_16973_18803[(1)] = cljs.core.first((state_16822[(4)])));

} else {
throw ex__13990__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__13988__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__18804 = state_16822;
state_16822 = G__18804;
continue;
} else {
return ret_value__13988__auto__;
}
break;
}
});
cljs$core$async$mix_$_state_machine__13987__auto__ = function(state_16822){
switch(arguments.length){
case 0:
return cljs$core$async$mix_$_state_machine__13987__auto____0.call(this);
case 1:
return cljs$core$async$mix_$_state_machine__13987__auto____1.call(this,state_16822);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mix_$_state_machine__13987__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mix_$_state_machine__13987__auto____0;
cljs$core$async$mix_$_state_machine__13987__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mix_$_state_machine__13987__auto____1;
return cljs$core$async$mix_$_state_machine__13987__auto__;
})()
})();
var state__14561__auto__ = (function (){var statearr_16977 = f__14560__auto__();
(statearr_16977[(6)] = c__14559__auto___18719);

return statearr_16977;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__14561__auto__);
}));


return m;
});
/**
 * Adds ch as an input to the mix
 */
cljs.core.async.admix = (function cljs$core$async$admix(mix,ch){
return cljs.core.async.admix_STAR_(mix,ch);
});
/**
 * Removes ch as an input to the mix
 */
cljs.core.async.unmix = (function cljs$core$async$unmix(mix,ch){
return cljs.core.async.unmix_STAR_(mix,ch);
});
/**
 * removes all inputs from the mix
 */
cljs.core.async.unmix_all = (function cljs$core$async$unmix_all(mix){
return cljs.core.async.unmix_all_STAR_(mix);
});
/**
 * Atomically sets the state(s) of one or more channels in a mix. The
 *   state map is a map of channels -> channel-state-map. A
 *   channel-state-map is a map of attrs -> boolean, where attr is one or
 *   more of :mute, :pause or :solo. Any states supplied are merged with
 *   the current state.
 * 
 *   Note that channels can be added to a mix via toggle, which can be
 *   used to add channels in a particular (e.g. paused) state.
 */
cljs.core.async.toggle = (function cljs$core$async$toggle(mix,state_map){
return cljs.core.async.toggle_STAR_(mix,state_map);
});
/**
 * Sets the solo mode of the mix. mode must be one of :mute or :pause
 */
cljs.core.async.solo_mode = (function cljs$core$async$solo_mode(mix,mode){
return cljs.core.async.solo_mode_STAR_(mix,mode);
});

/**
 * @interface
 */
cljs.core.async.Pub = function(){};

var cljs$core$async$Pub$sub_STAR_$dyn_18807 = (function (p,v,ch,close_QMARK_){
var x__5373__auto__ = (((p == null))?null:p);
var m__5374__auto__ = (cljs.core.async.sub_STAR_[goog.typeOf(x__5373__auto__)]);
if((!((m__5374__auto__ == null)))){
return (m__5374__auto__.cljs$core$IFn$_invoke$arity$4 ? m__5374__auto__.cljs$core$IFn$_invoke$arity$4(p,v,ch,close_QMARK_) : m__5374__auto__.call(null,p,v,ch,close_QMARK_));
} else {
var m__5372__auto__ = (cljs.core.async.sub_STAR_["_"]);
if((!((m__5372__auto__ == null)))){
return (m__5372__auto__.cljs$core$IFn$_invoke$arity$4 ? m__5372__auto__.cljs$core$IFn$_invoke$arity$4(p,v,ch,close_QMARK_) : m__5372__auto__.call(null,p,v,ch,close_QMARK_));
} else {
throw cljs.core.missing_protocol("Pub.sub*",p);
}
}
});
cljs.core.async.sub_STAR_ = (function cljs$core$async$sub_STAR_(p,v,ch,close_QMARK_){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$sub_STAR_$arity$4 == null)))))){
return p.cljs$core$async$Pub$sub_STAR_$arity$4(p,v,ch,close_QMARK_);
} else {
return cljs$core$async$Pub$sub_STAR_$dyn_18807(p,v,ch,close_QMARK_);
}
});

var cljs$core$async$Pub$unsub_STAR_$dyn_18809 = (function (p,v,ch){
var x__5373__auto__ = (((p == null))?null:p);
var m__5374__auto__ = (cljs.core.async.unsub_STAR_[goog.typeOf(x__5373__auto__)]);
if((!((m__5374__auto__ == null)))){
return (m__5374__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5374__auto__.cljs$core$IFn$_invoke$arity$3(p,v,ch) : m__5374__auto__.call(null,p,v,ch));
} else {
var m__5372__auto__ = (cljs.core.async.unsub_STAR_["_"]);
if((!((m__5372__auto__ == null)))){
return (m__5372__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5372__auto__.cljs$core$IFn$_invoke$arity$3(p,v,ch) : m__5372__auto__.call(null,p,v,ch));
} else {
throw cljs.core.missing_protocol("Pub.unsub*",p);
}
}
});
cljs.core.async.unsub_STAR_ = (function cljs$core$async$unsub_STAR_(p,v,ch){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$unsub_STAR_$arity$3 == null)))))){
return p.cljs$core$async$Pub$unsub_STAR_$arity$3(p,v,ch);
} else {
return cljs$core$async$Pub$unsub_STAR_$dyn_18809(p,v,ch);
}
});

var cljs$core$async$Pub$unsub_all_STAR_$dyn_18817 = (function() {
var G__18818 = null;
var G__18818__1 = (function (p){
var x__5373__auto__ = (((p == null))?null:p);
var m__5374__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__5373__auto__)]);
if((!((m__5374__auto__ == null)))){
return (m__5374__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5374__auto__.cljs$core$IFn$_invoke$arity$1(p) : m__5374__auto__.call(null,p));
} else {
var m__5372__auto__ = (cljs.core.async.unsub_all_STAR_["_"]);
if((!((m__5372__auto__ == null)))){
return (m__5372__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5372__auto__.cljs$core$IFn$_invoke$arity$1(p) : m__5372__auto__.call(null,p));
} else {
throw cljs.core.missing_protocol("Pub.unsub-all*",p);
}
}
});
var G__18818__2 = (function (p,v){
var x__5373__auto__ = (((p == null))?null:p);
var m__5374__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__5373__auto__)]);
if((!((m__5374__auto__ == null)))){
return (m__5374__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5374__auto__.cljs$core$IFn$_invoke$arity$2(p,v) : m__5374__auto__.call(null,p,v));
} else {
var m__5372__auto__ = (cljs.core.async.unsub_all_STAR_["_"]);
if((!((m__5372__auto__ == null)))){
return (m__5372__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5372__auto__.cljs$core$IFn$_invoke$arity$2(p,v) : m__5372__auto__.call(null,p,v));
} else {
throw cljs.core.missing_protocol("Pub.unsub-all*",p);
}
}
});
G__18818 = function(p,v){
switch(arguments.length){
case 1:
return G__18818__1.call(this,p);
case 2:
return G__18818__2.call(this,p,v);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
G__18818.cljs$core$IFn$_invoke$arity$1 = G__18818__1;
G__18818.cljs$core$IFn$_invoke$arity$2 = G__18818__2;
return G__18818;
})()
;
cljs.core.async.unsub_all_STAR_ = (function cljs$core$async$unsub_all_STAR_(var_args){
var G__17023 = arguments.length;
switch (G__17023) {
case 1:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1 = (function (p){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$unsub_all_STAR_$arity$1 == null)))))){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$1(p);
} else {
return cljs$core$async$Pub$unsub_all_STAR_$dyn_18817(p);
}
}));

(cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2 = (function (p,v){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$unsub_all_STAR_$arity$2 == null)))))){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$2(p,v);
} else {
return cljs$core$async$Pub$unsub_all_STAR_$dyn_18817(p,v);
}
}));

(cljs.core.async.unsub_all_STAR_.cljs$lang$maxFixedArity = 2);



/**
* @constructor
 * @implements {cljs.core.async.Pub}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async17060 = (function (ch,topic_fn,buf_fn,mults,ensure_mult,meta17061){
this.ch = ch;
this.topic_fn = topic_fn;
this.buf_fn = buf_fn;
this.mults = mults;
this.ensure_mult = ensure_mult;
this.meta17061 = meta17061;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async17060.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_17062,meta17061__$1){
var self__ = this;
var _17062__$1 = this;
return (new cljs.core.async.t_cljs$core$async17060(self__.ch,self__.topic_fn,self__.buf_fn,self__.mults,self__.ensure_mult,meta17061__$1));
}));

(cljs.core.async.t_cljs$core$async17060.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_17062){
var self__ = this;
var _17062__$1 = this;
return self__.meta17061;
}));

(cljs.core.async.t_cljs$core$async17060.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async17060.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
}));

(cljs.core.async.t_cljs$core$async17060.prototype.cljs$core$async$Pub$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async17060.prototype.cljs$core$async$Pub$sub_STAR_$arity$4 = (function (p,topic,ch__$1,close_QMARK_){
var self__ = this;
var p__$1 = this;
var m = (self__.ensure_mult.cljs$core$IFn$_invoke$arity$1 ? self__.ensure_mult.cljs$core$IFn$_invoke$arity$1(topic) : self__.ensure_mult.call(null,topic));
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3(m,ch__$1,close_QMARK_);
}));

(cljs.core.async.t_cljs$core$async17060.prototype.cljs$core$async$Pub$unsub_STAR_$arity$3 = (function (p,topic,ch__$1){
var self__ = this;
var p__$1 = this;
var temp__5823__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(self__.mults),topic);
if(cljs.core.truth_(temp__5823__auto__)){
var m = temp__5823__auto__;
return cljs.core.async.untap(m,ch__$1);
} else {
return null;
}
}));

(cljs.core.async.t_cljs$core$async17060.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.reset_BANG_(self__.mults,cljs.core.PersistentArrayMap.EMPTY);
}));

(cljs.core.async.t_cljs$core$async17060.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$2 = (function (_,topic){
var self__ = this;
var ___$1 = this;
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.mults,cljs.core.dissoc,topic);
}));

(cljs.core.async.t_cljs$core$async17060.getBasis = (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"topic-fn","topic-fn",-862449736,null),new cljs.core.Symbol(null,"buf-fn","buf-fn",-1200281591,null),new cljs.core.Symbol(null,"mults","mults",-461114485,null),new cljs.core.Symbol(null,"ensure-mult","ensure-mult",1796584816,null),new cljs.core.Symbol(null,"meta17061","meta17061",1252312687,null)], null);
}));

(cljs.core.async.t_cljs$core$async17060.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async17060.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async17060");

(cljs.core.async.t_cljs$core$async17060.cljs$lang$ctorPrWriter = (function (this__5310__auto__,writer__5311__auto__,opt__5312__auto__){
return cljs.core._write(writer__5311__auto__,"cljs.core.async/t_cljs$core$async17060");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async17060.
 */
cljs.core.async.__GT_t_cljs$core$async17060 = (function cljs$core$async$__GT_t_cljs$core$async17060(ch,topic_fn,buf_fn,mults,ensure_mult,meta17061){
return (new cljs.core.async.t_cljs$core$async17060(ch,topic_fn,buf_fn,mults,ensure_mult,meta17061));
});


/**
 * Creates and returns a pub(lication) of the supplied channel,
 *   partitioned into topics by the topic-fn. topic-fn will be applied to
 *   each value on the channel and the result will determine the 'topic'
 *   on which that value will be put. Channels can be subscribed to
 *   receive copies of topics using 'sub', and unsubscribed using
 *   'unsub'. Each topic will be handled by an internal mult on a
 *   dedicated channel. By default these internal channels are
 *   unbuffered, but a buf-fn can be supplied which, given a topic,
 *   creates a buffer with desired properties.
 * 
 *   Each item is distributed to all subs in parallel and synchronously,
 *   i.e. each sub must accept before the next item is distributed. Use
 *   buffering/windowing to prevent slow subs from holding up the pub.
 * 
 *   Items received when there are no matching subs get dropped.
 * 
 *   Note that if buf-fns are used then each topic is handled
 *   asynchronously, i.e. if a channel is subscribed to more than one
 *   topic it should not expect them to be interleaved identically with
 *   the source.
 */
cljs.core.async.pub = (function cljs$core$async$pub(var_args){
var G__17056 = arguments.length;
switch (G__17056) {
case 2:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2 = (function (ch,topic_fn){
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3(ch,topic_fn,cljs.core.constantly(null));
}));

(cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3 = (function (ch,topic_fn,buf_fn){
var mults = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var ensure_mult = (function (topic){
var or__5025__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(mults),topic);
if(cljs.core.truth_(or__5025__auto__)){
return or__5025__auto__;
} else {
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(mults,(function (p1__17044_SHARP_){
if(cljs.core.truth_((p1__17044_SHARP_.cljs$core$IFn$_invoke$arity$1 ? p1__17044_SHARP_.cljs$core$IFn$_invoke$arity$1(topic) : p1__17044_SHARP_.call(null,topic)))){
return p1__17044_SHARP_;
} else {
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__17044_SHARP_,topic,cljs.core.async.mult(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((buf_fn.cljs$core$IFn$_invoke$arity$1 ? buf_fn.cljs$core$IFn$_invoke$arity$1(topic) : buf_fn.call(null,topic)))));
}
})),topic);
}
});
var p = (new cljs.core.async.t_cljs$core$async17060(ch,topic_fn,buf_fn,mults,ensure_mult,cljs.core.PersistentArrayMap.EMPTY));
var c__14559__auto___18891 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__14560__auto__ = (function (){var switch__13986__auto__ = (function (state_17151){
var state_val_17152 = (state_17151[(1)]);
if((state_val_17152 === (7))){
var inst_17147 = (state_17151[(2)]);
var state_17151__$1 = state_17151;
var statearr_17154_18892 = state_17151__$1;
(statearr_17154_18892[(2)] = inst_17147);

(statearr_17154_18892[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17152 === (20))){
var state_17151__$1 = state_17151;
var statearr_17158_18893 = state_17151__$1;
(statearr_17158_18893[(2)] = null);

(statearr_17158_18893[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17152 === (1))){
var state_17151__$1 = state_17151;
var statearr_17162_18894 = state_17151__$1;
(statearr_17162_18894[(2)] = null);

(statearr_17162_18894[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17152 === (24))){
var inst_17130 = (state_17151[(7)]);
var inst_17139 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(mults,cljs.core.dissoc,inst_17130);
var state_17151__$1 = state_17151;
var statearr_17164_18895 = state_17151__$1;
(statearr_17164_18895[(2)] = inst_17139);

(statearr_17164_18895[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17152 === (4))){
var inst_17078 = (state_17151[(8)]);
var inst_17078__$1 = (state_17151[(2)]);
var inst_17082 = (inst_17078__$1 == null);
var state_17151__$1 = (function (){var statearr_17165 = state_17151;
(statearr_17165[(8)] = inst_17078__$1);

return statearr_17165;
})();
if(cljs.core.truth_(inst_17082)){
var statearr_17166_18903 = state_17151__$1;
(statearr_17166_18903[(1)] = (5));

} else {
var statearr_17170_18904 = state_17151__$1;
(statearr_17170_18904[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17152 === (15))){
var inst_17124 = (state_17151[(2)]);
var state_17151__$1 = state_17151;
var statearr_17172_18909 = state_17151__$1;
(statearr_17172_18909[(2)] = inst_17124);

(statearr_17172_18909[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17152 === (21))){
var inst_17144 = (state_17151[(2)]);
var state_17151__$1 = (function (){var statearr_17173 = state_17151;
(statearr_17173[(9)] = inst_17144);

return statearr_17173;
})();
var statearr_17174_18910 = state_17151__$1;
(statearr_17174_18910[(2)] = null);

(statearr_17174_18910[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17152 === (13))){
var inst_17106 = (state_17151[(10)]);
var inst_17108 = cljs.core.chunked_seq_QMARK_(inst_17106);
var state_17151__$1 = state_17151;
if(inst_17108){
var statearr_17180_18911 = state_17151__$1;
(statearr_17180_18911[(1)] = (16));

} else {
var statearr_17181_18912 = state_17151__$1;
(statearr_17181_18912[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17152 === (22))){
var inst_17136 = (state_17151[(2)]);
var state_17151__$1 = state_17151;
if(cljs.core.truth_(inst_17136)){
var statearr_17183_18913 = state_17151__$1;
(statearr_17183_18913[(1)] = (23));

} else {
var statearr_17185_18914 = state_17151__$1;
(statearr_17185_18914[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17152 === (6))){
var inst_17078 = (state_17151[(8)]);
var inst_17130 = (state_17151[(7)]);
var inst_17132 = (state_17151[(11)]);
var inst_17130__$1 = (topic_fn.cljs$core$IFn$_invoke$arity$1 ? topic_fn.cljs$core$IFn$_invoke$arity$1(inst_17078) : topic_fn.call(null,inst_17078));
var inst_17131 = cljs.core.deref(mults);
var inst_17132__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_17131,inst_17130__$1);
var state_17151__$1 = (function (){var statearr_17186 = state_17151;
(statearr_17186[(7)] = inst_17130__$1);

(statearr_17186[(11)] = inst_17132__$1);

return statearr_17186;
})();
if(cljs.core.truth_(inst_17132__$1)){
var statearr_17187_18922 = state_17151__$1;
(statearr_17187_18922[(1)] = (19));

} else {
var statearr_17188_18923 = state_17151__$1;
(statearr_17188_18923[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17152 === (25))){
var inst_17141 = (state_17151[(2)]);
var state_17151__$1 = state_17151;
var statearr_17191_18924 = state_17151__$1;
(statearr_17191_18924[(2)] = inst_17141);

(statearr_17191_18924[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17152 === (17))){
var inst_17106 = (state_17151[(10)]);
var inst_17115 = cljs.core.first(inst_17106);
var inst_17116 = cljs.core.async.muxch_STAR_(inst_17115);
var inst_17117 = cljs.core.async.close_BANG_(inst_17116);
var inst_17118 = cljs.core.next(inst_17106);
var inst_17092 = inst_17118;
var inst_17093 = null;
var inst_17094 = (0);
var inst_17095 = (0);
var state_17151__$1 = (function (){var statearr_17193 = state_17151;
(statearr_17193[(12)] = inst_17117);

(statearr_17193[(13)] = inst_17092);

(statearr_17193[(14)] = inst_17093);

(statearr_17193[(15)] = inst_17094);

(statearr_17193[(16)] = inst_17095);

return statearr_17193;
})();
var statearr_17195_18942 = state_17151__$1;
(statearr_17195_18942[(2)] = null);

(statearr_17195_18942[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17152 === (3))){
var inst_17149 = (state_17151[(2)]);
var state_17151__$1 = state_17151;
return cljs.core.async.impl.ioc_helpers.return_chan(state_17151__$1,inst_17149);
} else {
if((state_val_17152 === (12))){
var inst_17126 = (state_17151[(2)]);
var state_17151__$1 = state_17151;
var statearr_17197_18943 = state_17151__$1;
(statearr_17197_18943[(2)] = inst_17126);

(statearr_17197_18943[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17152 === (2))){
var state_17151__$1 = state_17151;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_17151__$1,(4),ch);
} else {
if((state_val_17152 === (23))){
var state_17151__$1 = state_17151;
var statearr_17198_18945 = state_17151__$1;
(statearr_17198_18945[(2)] = null);

(statearr_17198_18945[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17152 === (19))){
var inst_17132 = (state_17151[(11)]);
var inst_17078 = (state_17151[(8)]);
var inst_17134 = cljs.core.async.muxch_STAR_(inst_17132);
var state_17151__$1 = state_17151;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_17151__$1,(22),inst_17134,inst_17078);
} else {
if((state_val_17152 === (11))){
var inst_17092 = (state_17151[(13)]);
var inst_17106 = (state_17151[(10)]);
var inst_17106__$1 = cljs.core.seq(inst_17092);
var state_17151__$1 = (function (){var statearr_17202 = state_17151;
(statearr_17202[(10)] = inst_17106__$1);

return statearr_17202;
})();
if(inst_17106__$1){
var statearr_17204_18950 = state_17151__$1;
(statearr_17204_18950[(1)] = (13));

} else {
var statearr_17205_18951 = state_17151__$1;
(statearr_17205_18951[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17152 === (9))){
var inst_17128 = (state_17151[(2)]);
var state_17151__$1 = state_17151;
var statearr_17206_18952 = state_17151__$1;
(statearr_17206_18952[(2)] = inst_17128);

(statearr_17206_18952[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17152 === (5))){
var inst_17089 = cljs.core.deref(mults);
var inst_17090 = cljs.core.vals(inst_17089);
var inst_17091 = cljs.core.seq(inst_17090);
var inst_17092 = inst_17091;
var inst_17093 = null;
var inst_17094 = (0);
var inst_17095 = (0);
var state_17151__$1 = (function (){var statearr_17209 = state_17151;
(statearr_17209[(13)] = inst_17092);

(statearr_17209[(14)] = inst_17093);

(statearr_17209[(15)] = inst_17094);

(statearr_17209[(16)] = inst_17095);

return statearr_17209;
})();
var statearr_17213_18953 = state_17151__$1;
(statearr_17213_18953[(2)] = null);

(statearr_17213_18953[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17152 === (14))){
var state_17151__$1 = state_17151;
var statearr_17217_18954 = state_17151__$1;
(statearr_17217_18954[(2)] = null);

(statearr_17217_18954[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17152 === (16))){
var inst_17106 = (state_17151[(10)]);
var inst_17110 = cljs.core.chunk_first(inst_17106);
var inst_17111 = cljs.core.chunk_rest(inst_17106);
var inst_17112 = cljs.core.count(inst_17110);
var inst_17092 = inst_17111;
var inst_17093 = inst_17110;
var inst_17094 = inst_17112;
var inst_17095 = (0);
var state_17151__$1 = (function (){var statearr_17220 = state_17151;
(statearr_17220[(13)] = inst_17092);

(statearr_17220[(14)] = inst_17093);

(statearr_17220[(15)] = inst_17094);

(statearr_17220[(16)] = inst_17095);

return statearr_17220;
})();
var statearr_17221_18960 = state_17151__$1;
(statearr_17221_18960[(2)] = null);

(statearr_17221_18960[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17152 === (10))){
var inst_17093 = (state_17151[(14)]);
var inst_17095 = (state_17151[(16)]);
var inst_17092 = (state_17151[(13)]);
var inst_17094 = (state_17151[(15)]);
var inst_17100 = cljs.core._nth(inst_17093,inst_17095);
var inst_17101 = cljs.core.async.muxch_STAR_(inst_17100);
var inst_17102 = cljs.core.async.close_BANG_(inst_17101);
var inst_17103 = (inst_17095 + (1));
var tmp17214 = inst_17094;
var tmp17215 = inst_17093;
var tmp17216 = inst_17092;
var inst_17092__$1 = tmp17216;
var inst_17093__$1 = tmp17215;
var inst_17094__$1 = tmp17214;
var inst_17095__$1 = inst_17103;
var state_17151__$1 = (function (){var statearr_17223 = state_17151;
(statearr_17223[(17)] = inst_17102);

(statearr_17223[(13)] = inst_17092__$1);

(statearr_17223[(14)] = inst_17093__$1);

(statearr_17223[(15)] = inst_17094__$1);

(statearr_17223[(16)] = inst_17095__$1);

return statearr_17223;
})();
var statearr_17226_18964 = state_17151__$1;
(statearr_17226_18964[(2)] = null);

(statearr_17226_18964[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17152 === (18))){
var inst_17121 = (state_17151[(2)]);
var state_17151__$1 = state_17151;
var statearr_17235_18965 = state_17151__$1;
(statearr_17235_18965[(2)] = inst_17121);

(statearr_17235_18965[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17152 === (8))){
var inst_17095 = (state_17151[(16)]);
var inst_17094 = (state_17151[(15)]);
var inst_17097 = (inst_17095 < inst_17094);
var inst_17098 = inst_17097;
var state_17151__$1 = state_17151;
if(cljs.core.truth_(inst_17098)){
var statearr_17237_18966 = state_17151__$1;
(statearr_17237_18966[(1)] = (10));

} else {
var statearr_17239_18967 = state_17151__$1;
(statearr_17239_18967[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__13987__auto__ = null;
var cljs$core$async$state_machine__13987__auto____0 = (function (){
var statearr_17264 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_17264[(0)] = cljs$core$async$state_machine__13987__auto__);

(statearr_17264[(1)] = (1));

return statearr_17264;
});
var cljs$core$async$state_machine__13987__auto____1 = (function (state_17151){
while(true){
var ret_value__13988__auto__ = (function (){try{while(true){
var result__13989__auto__ = switch__13986__auto__(state_17151);
if(cljs.core.keyword_identical_QMARK_(result__13989__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__13989__auto__;
}
break;
}
}catch (e17274){var ex__13990__auto__ = e17274;
var statearr_17277_18972 = state_17151;
(statearr_17277_18972[(2)] = ex__13990__auto__);


if(cljs.core.seq((state_17151[(4)]))){
var statearr_17288_18973 = state_17151;
(statearr_17288_18973[(1)] = cljs.core.first((state_17151[(4)])));

} else {
throw ex__13990__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__13988__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__18974 = state_17151;
state_17151 = G__18974;
continue;
} else {
return ret_value__13988__auto__;
}
break;
}
});
cljs$core$async$state_machine__13987__auto__ = function(state_17151){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__13987__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__13987__auto____1.call(this,state_17151);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__13987__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__13987__auto____0;
cljs$core$async$state_machine__13987__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__13987__auto____1;
return cljs$core$async$state_machine__13987__auto__;
})()
})();
var state__14561__auto__ = (function (){var statearr_17297 = f__14560__auto__();
(statearr_17297[(6)] = c__14559__auto___18891);

return statearr_17297;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__14561__auto__);
}));


return p;
}));

(cljs.core.async.pub.cljs$lang$maxFixedArity = 3);

/**
 * Subscribes a channel to a topic of a pub.
 * 
 *   By default the channel will be closed when the source closes,
 *   but can be determined by the close? parameter.
 */
cljs.core.async.sub = (function cljs$core$async$sub(var_args){
var G__17300 = arguments.length;
switch (G__17300) {
case 3:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3 = (function (p,topic,ch){
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4(p,topic,ch,true);
}));

(cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4 = (function (p,topic,ch,close_QMARK_){
return cljs.core.async.sub_STAR_(p,topic,ch,close_QMARK_);
}));

(cljs.core.async.sub.cljs$lang$maxFixedArity = 4);

/**
 * Unsubscribes a channel from a topic of a pub
 */
cljs.core.async.unsub = (function cljs$core$async$unsub(p,topic,ch){
return cljs.core.async.unsub_STAR_(p,topic,ch);
});
/**
 * Unsubscribes all channels from a pub, or a topic of a pub
 */
cljs.core.async.unsub_all = (function cljs$core$async$unsub_all(var_args){
var G__17321 = arguments.length;
switch (G__17321) {
case 1:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1 = (function (p){
return cljs.core.async.unsub_all_STAR_(p);
}));

(cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2 = (function (p,topic){
return cljs.core.async.unsub_all_STAR_(p,topic);
}));

(cljs.core.async.unsub_all.cljs$lang$maxFixedArity = 2);

/**
 * Takes a function and a collection of source channels, and returns a
 *   channel which contains the values produced by applying f to the set
 *   of first items taken from each source channel, followed by applying
 *   f to the set of second items from each channel, until any one of the
 *   channels is closed, at which point the output channel will be
 *   closed. The returned channel will be unbuffered by default, or a
 *   buf-or-n can be supplied
 */
cljs.core.async.map = (function cljs$core$async$map(var_args){
var G__17328 = arguments.length;
switch (G__17328) {
case 2:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.map.cljs$core$IFn$_invoke$arity$2 = (function (f,chs){
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$3(f,chs,null);
}));

(cljs.core.async.map.cljs$core$IFn$_invoke$arity$3 = (function (f,chs,buf_or_n){
var chs__$1 = cljs.core.vec(chs);
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var cnt = cljs.core.count(chs__$1);
var rets = cljs.core.object_array.cljs$core$IFn$_invoke$arity$1(cnt);
var dchan = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
var dctr = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var done = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (i){
return (function (ret){
(rets[i] = ret);

if((cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(dctr,cljs.core.dec) === (0))){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(dchan,rets.slice((0)));
} else {
return null;
}
});
}),cljs.core.range.cljs$core$IFn$_invoke$arity$1(cnt));
if((cnt === (0))){
cljs.core.async.close_BANG_(out);
} else {
var c__14559__auto___18996 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__14560__auto__ = (function (){var switch__13986__auto__ = (function (state_17389){
var state_val_17390 = (state_17389[(1)]);
if((state_val_17390 === (7))){
var state_17389__$1 = state_17389;
var statearr_17391_19005 = state_17389__$1;
(statearr_17391_19005[(2)] = null);

(statearr_17391_19005[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17390 === (1))){
var state_17389__$1 = state_17389;
var statearr_17393_19006 = state_17389__$1;
(statearr_17393_19006[(2)] = null);

(statearr_17393_19006[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17390 === (4))){
var inst_17343 = (state_17389[(7)]);
var inst_17338 = (state_17389[(8)]);
var inst_17345 = (inst_17343 < inst_17338);
var state_17389__$1 = state_17389;
if(cljs.core.truth_(inst_17345)){
var statearr_17395_19007 = state_17389__$1;
(statearr_17395_19007[(1)] = (6));

} else {
var statearr_17399_19008 = state_17389__$1;
(statearr_17399_19008[(1)] = (7));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17390 === (15))){
var inst_17373 = (state_17389[(9)]);
var inst_17379 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(f,inst_17373);
var state_17389__$1 = state_17389;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_17389__$1,(17),out,inst_17379);
} else {
if((state_val_17390 === (13))){
var inst_17373 = (state_17389[(9)]);
var inst_17373__$1 = (state_17389[(2)]);
var inst_17375 = cljs.core.some(cljs.core.nil_QMARK_,inst_17373__$1);
var state_17389__$1 = (function (){var statearr_17416 = state_17389;
(statearr_17416[(9)] = inst_17373__$1);

return statearr_17416;
})();
if(cljs.core.truth_(inst_17375)){
var statearr_17417_19011 = state_17389__$1;
(statearr_17417_19011[(1)] = (14));

} else {
var statearr_17418_19012 = state_17389__$1;
(statearr_17418_19012[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17390 === (6))){
var state_17389__$1 = state_17389;
var statearr_17419_19013 = state_17389__$1;
(statearr_17419_19013[(2)] = null);

(statearr_17419_19013[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17390 === (17))){
var inst_17381 = (state_17389[(2)]);
var state_17389__$1 = (function (){var statearr_17431 = state_17389;
(statearr_17431[(10)] = inst_17381);

return statearr_17431;
})();
var statearr_17432_19014 = state_17389__$1;
(statearr_17432_19014[(2)] = null);

(statearr_17432_19014[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17390 === (3))){
var inst_17386 = (state_17389[(2)]);
var state_17389__$1 = state_17389;
return cljs.core.async.impl.ioc_helpers.return_chan(state_17389__$1,inst_17386);
} else {
if((state_val_17390 === (12))){
var _ = (function (){var statearr_17433 = state_17389;
(statearr_17433[(4)] = cljs.core.rest((state_17389[(4)])));

return statearr_17433;
})();
var state_17389__$1 = state_17389;
var ex17420 = (state_17389__$1[(2)]);
var statearr_17434_19018 = state_17389__$1;
(statearr_17434_19018[(5)] = ex17420);


if((ex17420 instanceof Object)){
var statearr_17438_19020 = state_17389__$1;
(statearr_17438_19020[(1)] = (11));

(statearr_17438_19020[(5)] = null);

} else {
throw ex17420;

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17390 === (2))){
var inst_17337 = cljs.core.reset_BANG_(dctr,cnt);
var inst_17338 = cnt;
var inst_17343 = (0);
var state_17389__$1 = (function (){var statearr_17441 = state_17389;
(statearr_17441[(11)] = inst_17337);

(statearr_17441[(8)] = inst_17338);

(statearr_17441[(7)] = inst_17343);

return statearr_17441;
})();
var statearr_17442_19030 = state_17389__$1;
(statearr_17442_19030[(2)] = null);

(statearr_17442_19030[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17390 === (11))){
var inst_17352 = (state_17389[(2)]);
var inst_17353 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(dctr,cljs.core.dec);
var state_17389__$1 = (function (){var statearr_17444 = state_17389;
(statearr_17444[(12)] = inst_17352);

return statearr_17444;
})();
var statearr_17445_19031 = state_17389__$1;
(statearr_17445_19031[(2)] = inst_17353);

(statearr_17445_19031[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17390 === (9))){
var inst_17343 = (state_17389[(7)]);
var _ = (function (){var statearr_17447 = state_17389;
(statearr_17447[(4)] = cljs.core.cons((12),(state_17389[(4)])));

return statearr_17447;
})();
var inst_17359 = (chs__$1.cljs$core$IFn$_invoke$arity$1 ? chs__$1.cljs$core$IFn$_invoke$arity$1(inst_17343) : chs__$1.call(null,inst_17343));
var inst_17360 = (done.cljs$core$IFn$_invoke$arity$1 ? done.cljs$core$IFn$_invoke$arity$1(inst_17343) : done.call(null,inst_17343));
var inst_17361 = cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2(inst_17359,inst_17360);
var ___$1 = (function (){var statearr_17448 = state_17389;
(statearr_17448[(4)] = cljs.core.rest((state_17389[(4)])));

return statearr_17448;
})();
var state_17389__$1 = state_17389;
var statearr_17449_19042 = state_17389__$1;
(statearr_17449_19042[(2)] = inst_17361);

(statearr_17449_19042[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17390 === (5))){
var inst_17371 = (state_17389[(2)]);
var state_17389__$1 = (function (){var statearr_17451 = state_17389;
(statearr_17451[(13)] = inst_17371);

return statearr_17451;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_17389__$1,(13),dchan);
} else {
if((state_val_17390 === (14))){
var inst_17377 = cljs.core.async.close_BANG_(out);
var state_17389__$1 = state_17389;
var statearr_17455_19044 = state_17389__$1;
(statearr_17455_19044[(2)] = inst_17377);

(statearr_17455_19044[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17390 === (16))){
var inst_17384 = (state_17389[(2)]);
var state_17389__$1 = state_17389;
var statearr_17456_19048 = state_17389__$1;
(statearr_17456_19048[(2)] = inst_17384);

(statearr_17456_19048[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17390 === (10))){
var inst_17343 = (state_17389[(7)]);
var inst_17364 = (state_17389[(2)]);
var inst_17365 = (inst_17343 + (1));
var inst_17343__$1 = inst_17365;
var state_17389__$1 = (function (){var statearr_17457 = state_17389;
(statearr_17457[(14)] = inst_17364);

(statearr_17457[(7)] = inst_17343__$1);

return statearr_17457;
})();
var statearr_17458_19066 = state_17389__$1;
(statearr_17458_19066[(2)] = null);

(statearr_17458_19066[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17390 === (8))){
var inst_17369 = (state_17389[(2)]);
var state_17389__$1 = state_17389;
var statearr_17459_19067 = state_17389__$1;
(statearr_17459_19067[(2)] = inst_17369);

(statearr_17459_19067[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__13987__auto__ = null;
var cljs$core$async$state_machine__13987__auto____0 = (function (){
var statearr_17460 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_17460[(0)] = cljs$core$async$state_machine__13987__auto__);

(statearr_17460[(1)] = (1));

return statearr_17460;
});
var cljs$core$async$state_machine__13987__auto____1 = (function (state_17389){
while(true){
var ret_value__13988__auto__ = (function (){try{while(true){
var result__13989__auto__ = switch__13986__auto__(state_17389);
if(cljs.core.keyword_identical_QMARK_(result__13989__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__13989__auto__;
}
break;
}
}catch (e17461){var ex__13990__auto__ = e17461;
var statearr_17462_19071 = state_17389;
(statearr_17462_19071[(2)] = ex__13990__auto__);


if(cljs.core.seq((state_17389[(4)]))){
var statearr_17463_19072 = state_17389;
(statearr_17463_19072[(1)] = cljs.core.first((state_17389[(4)])));

} else {
throw ex__13990__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__13988__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__19077 = state_17389;
state_17389 = G__19077;
continue;
} else {
return ret_value__13988__auto__;
}
break;
}
});
cljs$core$async$state_machine__13987__auto__ = function(state_17389){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__13987__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__13987__auto____1.call(this,state_17389);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__13987__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__13987__auto____0;
cljs$core$async$state_machine__13987__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__13987__auto____1;
return cljs$core$async$state_machine__13987__auto__;
})()
})();
var state__14561__auto__ = (function (){var statearr_17464 = f__14560__auto__();
(statearr_17464[(6)] = c__14559__auto___18996);

return statearr_17464;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__14561__auto__);
}));

}

return out;
}));

(cljs.core.async.map.cljs$lang$maxFixedArity = 3);

/**
 * Takes a collection of source channels and returns a channel which
 *   contains all values taken from them. The returned channel will be
 *   unbuffered by default, or a buf-or-n can be supplied. The channel
 *   will close after all the source channels have closed.
 */
cljs.core.async.merge = (function cljs$core$async$merge(var_args){
var G__17470 = arguments.length;
switch (G__17470) {
case 1:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1 = (function (chs){
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2(chs,null);
}));

(cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2 = (function (chs,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__14559__auto___19080 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__14560__auto__ = (function (){var switch__13986__auto__ = (function (state_17502){
var state_val_17503 = (state_17502[(1)]);
if((state_val_17503 === (7))){
var inst_17481 = (state_17502[(7)]);
var inst_17482 = (state_17502[(8)]);
var inst_17481__$1 = (state_17502[(2)]);
var inst_17482__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_17481__$1,(0),null);
var inst_17483 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_17481__$1,(1),null);
var inst_17484 = (inst_17482__$1 == null);
var state_17502__$1 = (function (){var statearr_17504 = state_17502;
(statearr_17504[(7)] = inst_17481__$1);

(statearr_17504[(8)] = inst_17482__$1);

(statearr_17504[(9)] = inst_17483);

return statearr_17504;
})();
if(cljs.core.truth_(inst_17484)){
var statearr_17505_19094 = state_17502__$1;
(statearr_17505_19094[(1)] = (8));

} else {
var statearr_17506_19095 = state_17502__$1;
(statearr_17506_19095[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17503 === (1))){
var inst_17471 = cljs.core.vec(chs);
var inst_17472 = inst_17471;
var state_17502__$1 = (function (){var statearr_17507 = state_17502;
(statearr_17507[(10)] = inst_17472);

return statearr_17507;
})();
var statearr_17508_19096 = state_17502__$1;
(statearr_17508_19096[(2)] = null);

(statearr_17508_19096[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17503 === (4))){
var inst_17472 = (state_17502[(10)]);
var state_17502__$1 = state_17502;
return cljs.core.async.ioc_alts_BANG_(state_17502__$1,(7),inst_17472);
} else {
if((state_val_17503 === (6))){
var inst_17498 = (state_17502[(2)]);
var state_17502__$1 = state_17502;
var statearr_17521_19097 = state_17502__$1;
(statearr_17521_19097[(2)] = inst_17498);

(statearr_17521_19097[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17503 === (3))){
var inst_17500 = (state_17502[(2)]);
var state_17502__$1 = state_17502;
return cljs.core.async.impl.ioc_helpers.return_chan(state_17502__$1,inst_17500);
} else {
if((state_val_17503 === (2))){
var inst_17472 = (state_17502[(10)]);
var inst_17474 = cljs.core.count(inst_17472);
var inst_17475 = (inst_17474 > (0));
var state_17502__$1 = state_17502;
if(cljs.core.truth_(inst_17475)){
var statearr_17523_19098 = state_17502__$1;
(statearr_17523_19098[(1)] = (4));

} else {
var statearr_17524_19099 = state_17502__$1;
(statearr_17524_19099[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17503 === (11))){
var inst_17472 = (state_17502[(10)]);
var inst_17491 = (state_17502[(2)]);
var tmp17522 = inst_17472;
var inst_17472__$1 = tmp17522;
var state_17502__$1 = (function (){var statearr_17525 = state_17502;
(statearr_17525[(11)] = inst_17491);

(statearr_17525[(10)] = inst_17472__$1);

return statearr_17525;
})();
var statearr_17526_19114 = state_17502__$1;
(statearr_17526_19114[(2)] = null);

(statearr_17526_19114[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17503 === (9))){
var inst_17482 = (state_17502[(8)]);
var state_17502__$1 = state_17502;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_17502__$1,(11),out,inst_17482);
} else {
if((state_val_17503 === (5))){
var inst_17496 = cljs.core.async.close_BANG_(out);
var state_17502__$1 = state_17502;
var statearr_17529_19115 = state_17502__$1;
(statearr_17529_19115[(2)] = inst_17496);

(statearr_17529_19115[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17503 === (10))){
var inst_17494 = (state_17502[(2)]);
var state_17502__$1 = state_17502;
var statearr_17530_19116 = state_17502__$1;
(statearr_17530_19116[(2)] = inst_17494);

(statearr_17530_19116[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17503 === (8))){
var inst_17472 = (state_17502[(10)]);
var inst_17481 = (state_17502[(7)]);
var inst_17482 = (state_17502[(8)]);
var inst_17483 = (state_17502[(9)]);
var inst_17486 = (function (){var cs = inst_17472;
var vec__17477 = inst_17481;
var v = inst_17482;
var c = inst_17483;
return (function (p1__17468_SHARP_){
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(c,p1__17468_SHARP_);
});
})();
var inst_17487 = cljs.core.filterv(inst_17486,inst_17472);
var inst_17472__$1 = inst_17487;
var state_17502__$1 = (function (){var statearr_17531 = state_17502;
(statearr_17531[(10)] = inst_17472__$1);

return statearr_17531;
})();
var statearr_17532_19117 = state_17502__$1;
(statearr_17532_19117[(2)] = null);

(statearr_17532_19117[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__13987__auto__ = null;
var cljs$core$async$state_machine__13987__auto____0 = (function (){
var statearr_17533 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_17533[(0)] = cljs$core$async$state_machine__13987__auto__);

(statearr_17533[(1)] = (1));

return statearr_17533;
});
var cljs$core$async$state_machine__13987__auto____1 = (function (state_17502){
while(true){
var ret_value__13988__auto__ = (function (){try{while(true){
var result__13989__auto__ = switch__13986__auto__(state_17502);
if(cljs.core.keyword_identical_QMARK_(result__13989__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__13989__auto__;
}
break;
}
}catch (e17534){var ex__13990__auto__ = e17534;
var statearr_17535_19126 = state_17502;
(statearr_17535_19126[(2)] = ex__13990__auto__);


if(cljs.core.seq((state_17502[(4)]))){
var statearr_17536_19133 = state_17502;
(statearr_17536_19133[(1)] = cljs.core.first((state_17502[(4)])));

} else {
throw ex__13990__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__13988__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__19136 = state_17502;
state_17502 = G__19136;
continue;
} else {
return ret_value__13988__auto__;
}
break;
}
});
cljs$core$async$state_machine__13987__auto__ = function(state_17502){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__13987__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__13987__auto____1.call(this,state_17502);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__13987__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__13987__auto____0;
cljs$core$async$state_machine__13987__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__13987__auto____1;
return cljs$core$async$state_machine__13987__auto__;
})()
})();
var state__14561__auto__ = (function (){var statearr_17537 = f__14560__auto__();
(statearr_17537[(6)] = c__14559__auto___19080);

return statearr_17537;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__14561__auto__);
}));


return out;
}));

(cljs.core.async.merge.cljs$lang$maxFixedArity = 2);

/**
 * Returns a channel containing the single (collection) result of the
 *   items taken from the channel conjoined to the supplied
 *   collection. ch must close before into produces a result.
 */
cljs.core.async.into = (function cljs$core$async$into(coll,ch){
return cljs.core.async.reduce(cljs.core.conj,coll,ch);
});
/**
 * Returns a channel that will return, at most, n items from ch. After n items
 * have been returned, or ch has been closed, the return chanel will close.
 * 
 *   The output channel is unbuffered by default, unless buf-or-n is given.
 */
cljs.core.async.take = (function cljs$core$async$take(var_args){
var G__17549 = arguments.length;
switch (G__17549) {
case 2:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.take.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$3(n,ch,null);
}));

(cljs.core.async.take.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__14559__auto___19151 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__14560__auto__ = (function (){var switch__13986__auto__ = (function (state_17581){
var state_val_17582 = (state_17581[(1)]);
if((state_val_17582 === (7))){
var inst_17563 = (state_17581[(7)]);
var inst_17563__$1 = (state_17581[(2)]);
var inst_17564 = (inst_17563__$1 == null);
var inst_17565 = cljs.core.not(inst_17564);
var state_17581__$1 = (function (){var statearr_17583 = state_17581;
(statearr_17583[(7)] = inst_17563__$1);

return statearr_17583;
})();
if(inst_17565){
var statearr_17584_19153 = state_17581__$1;
(statearr_17584_19153[(1)] = (8));

} else {
var statearr_17585_19154 = state_17581__$1;
(statearr_17585_19154[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17582 === (1))){
var inst_17558 = (0);
var state_17581__$1 = (function (){var statearr_17586 = state_17581;
(statearr_17586[(8)] = inst_17558);

return statearr_17586;
})();
var statearr_17587_19155 = state_17581__$1;
(statearr_17587_19155[(2)] = null);

(statearr_17587_19155[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17582 === (4))){
var state_17581__$1 = state_17581;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_17581__$1,(7),ch);
} else {
if((state_val_17582 === (6))){
var inst_17576 = (state_17581[(2)]);
var state_17581__$1 = state_17581;
var statearr_17588_19159 = state_17581__$1;
(statearr_17588_19159[(2)] = inst_17576);

(statearr_17588_19159[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17582 === (3))){
var inst_17578 = (state_17581[(2)]);
var inst_17579 = cljs.core.async.close_BANG_(out);
var state_17581__$1 = (function (){var statearr_17589 = state_17581;
(statearr_17589[(9)] = inst_17578);

return statearr_17589;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_17581__$1,inst_17579);
} else {
if((state_val_17582 === (2))){
var inst_17558 = (state_17581[(8)]);
var inst_17560 = (inst_17558 < n);
var state_17581__$1 = state_17581;
if(cljs.core.truth_(inst_17560)){
var statearr_17590_19176 = state_17581__$1;
(statearr_17590_19176[(1)] = (4));

} else {
var statearr_17591_19177 = state_17581__$1;
(statearr_17591_19177[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17582 === (11))){
var inst_17558 = (state_17581[(8)]);
var inst_17568 = (state_17581[(2)]);
var inst_17569 = (inst_17558 + (1));
var inst_17558__$1 = inst_17569;
var state_17581__$1 = (function (){var statearr_17592 = state_17581;
(statearr_17592[(10)] = inst_17568);

(statearr_17592[(8)] = inst_17558__$1);

return statearr_17592;
})();
var statearr_17594_19178 = state_17581__$1;
(statearr_17594_19178[(2)] = null);

(statearr_17594_19178[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17582 === (9))){
var state_17581__$1 = state_17581;
var statearr_17595_19179 = state_17581__$1;
(statearr_17595_19179[(2)] = null);

(statearr_17595_19179[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17582 === (5))){
var state_17581__$1 = state_17581;
var statearr_17597_19182 = state_17581__$1;
(statearr_17597_19182[(2)] = null);

(statearr_17597_19182[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17582 === (10))){
var inst_17573 = (state_17581[(2)]);
var state_17581__$1 = state_17581;
var statearr_17599_19183 = state_17581__$1;
(statearr_17599_19183[(2)] = inst_17573);

(statearr_17599_19183[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17582 === (8))){
var inst_17563 = (state_17581[(7)]);
var state_17581__$1 = state_17581;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_17581__$1,(11),out,inst_17563);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__13987__auto__ = null;
var cljs$core$async$state_machine__13987__auto____0 = (function (){
var statearr_17600 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_17600[(0)] = cljs$core$async$state_machine__13987__auto__);

(statearr_17600[(1)] = (1));

return statearr_17600;
});
var cljs$core$async$state_machine__13987__auto____1 = (function (state_17581){
while(true){
var ret_value__13988__auto__ = (function (){try{while(true){
var result__13989__auto__ = switch__13986__auto__(state_17581);
if(cljs.core.keyword_identical_QMARK_(result__13989__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__13989__auto__;
}
break;
}
}catch (e17602){var ex__13990__auto__ = e17602;
var statearr_17603_19185 = state_17581;
(statearr_17603_19185[(2)] = ex__13990__auto__);


if(cljs.core.seq((state_17581[(4)]))){
var statearr_17610_19186 = state_17581;
(statearr_17610_19186[(1)] = cljs.core.first((state_17581[(4)])));

} else {
throw ex__13990__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__13988__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__19187 = state_17581;
state_17581 = G__19187;
continue;
} else {
return ret_value__13988__auto__;
}
break;
}
});
cljs$core$async$state_machine__13987__auto__ = function(state_17581){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__13987__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__13987__auto____1.call(this,state_17581);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__13987__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__13987__auto____0;
cljs$core$async$state_machine__13987__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__13987__auto____1;
return cljs$core$async$state_machine__13987__auto__;
})()
})();
var state__14561__auto__ = (function (){var statearr_17611 = f__14560__auto__();
(statearr_17611[(6)] = c__14559__auto___19151);

return statearr_17611;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__14561__auto__);
}));


return out;
}));

(cljs.core.async.take.cljs$lang$maxFixedArity = 3);


/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async17628 = (function (f,ch,meta17614,_,fn1,meta17629){
this.f = f;
this.ch = ch;
this.meta17614 = meta17614;
this._ = _;
this.fn1 = fn1;
this.meta17629 = meta17629;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async17628.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_17630,meta17629__$1){
var self__ = this;
var _17630__$1 = this;
return (new cljs.core.async.t_cljs$core$async17628(self__.f,self__.ch,self__.meta17614,self__._,self__.fn1,meta17629__$1));
}));

(cljs.core.async.t_cljs$core$async17628.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_17630){
var self__ = this;
var _17630__$1 = this;
return self__.meta17629;
}));

(cljs.core.async.t_cljs$core$async17628.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async17628.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (___$1){
var self__ = this;
var ___$2 = this;
return cljs.core.async.impl.protocols.active_QMARK_(self__.fn1);
}));

(cljs.core.async.t_cljs$core$async17628.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (___$1){
var self__ = this;
var ___$2 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async17628.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (___$1){
var self__ = this;
var ___$2 = this;
var f1 = cljs.core.async.impl.protocols.commit(self__.fn1);
return (function (p1__17612_SHARP_){
var G__17639 = (((p1__17612_SHARP_ == null))?null:(self__.f.cljs$core$IFn$_invoke$arity$1 ? self__.f.cljs$core$IFn$_invoke$arity$1(p1__17612_SHARP_) : self__.f.call(null,p1__17612_SHARP_)));
return (f1.cljs$core$IFn$_invoke$arity$1 ? f1.cljs$core$IFn$_invoke$arity$1(G__17639) : f1.call(null,G__17639));
});
}));

(cljs.core.async.t_cljs$core$async17628.getBasis = (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta17614","meta17614",1104402679,null),cljs.core.with_meta(new cljs.core.Symbol(null,"_","_",-1201019570,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol("cljs.core.async","t_cljs$core$async17613","cljs.core.async/t_cljs$core$async17613",1219395816,null)], null)),new cljs.core.Symbol(null,"fn1","fn1",895834444,null),new cljs.core.Symbol(null,"meta17629","meta17629",234457182,null)], null);
}));

(cljs.core.async.t_cljs$core$async17628.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async17628.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async17628");

(cljs.core.async.t_cljs$core$async17628.cljs$lang$ctorPrWriter = (function (this__5310__auto__,writer__5311__auto__,opt__5312__auto__){
return cljs.core._write(writer__5311__auto__,"cljs.core.async/t_cljs$core$async17628");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async17628.
 */
cljs.core.async.__GT_t_cljs$core$async17628 = (function cljs$core$async$__GT_t_cljs$core$async17628(f,ch,meta17614,_,fn1,meta17629){
return (new cljs.core.async.t_cljs$core$async17628(f,ch,meta17614,_,fn1,meta17629));
});



/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async17613 = (function (f,ch,meta17614){
this.f = f;
this.ch = ch;
this.meta17614 = meta17614;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async17613.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_17615,meta17614__$1){
var self__ = this;
var _17615__$1 = this;
return (new cljs.core.async.t_cljs$core$async17613(self__.f,self__.ch,meta17614__$1));
}));

(cljs.core.async.t_cljs$core$async17613.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_17615){
var self__ = this;
var _17615__$1 = this;
return self__.meta17614;
}));

(cljs.core.async.t_cljs$core$async17613.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async17613.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async17613.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async17613.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async17613.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
var ret = cljs.core.async.impl.protocols.take_BANG_(self__.ch,(new cljs.core.async.t_cljs$core$async17628(self__.f,self__.ch,self__.meta17614,___$1,fn1,cljs.core.PersistentArrayMap.EMPTY)));
if(cljs.core.truth_((function (){var and__5023__auto__ = ret;
if(cljs.core.truth_(and__5023__auto__)){
return (!((cljs.core.deref(ret) == null)));
} else {
return and__5023__auto__;
}
})())){
return cljs.core.async.impl.channels.box((function (){var G__17659 = cljs.core.deref(ret);
return (self__.f.cljs$core$IFn$_invoke$arity$1 ? self__.f.cljs$core$IFn$_invoke$arity$1(G__17659) : self__.f.call(null,G__17659));
})());
} else {
return ret;
}
}));

(cljs.core.async.t_cljs$core$async17613.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async17613.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_(self__.ch,val,fn1);
}));

(cljs.core.async.t_cljs$core$async17613.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta17614","meta17614",1104402679,null)], null);
}));

(cljs.core.async.t_cljs$core$async17613.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async17613.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async17613");

(cljs.core.async.t_cljs$core$async17613.cljs$lang$ctorPrWriter = (function (this__5310__auto__,writer__5311__auto__,opt__5312__auto__){
return cljs.core._write(writer__5311__auto__,"cljs.core.async/t_cljs$core$async17613");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async17613.
 */
cljs.core.async.__GT_t_cljs$core$async17613 = (function cljs$core$async$__GT_t_cljs$core$async17613(f,ch,meta17614){
return (new cljs.core.async.t_cljs$core$async17613(f,ch,meta17614));
});


/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_LT_ = (function cljs$core$async$map_LT_(f,ch){
return (new cljs.core.async.t_cljs$core$async17613(f,ch,cljs.core.PersistentArrayMap.EMPTY));
});

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async17671 = (function (f,ch,meta17672){
this.f = f;
this.ch = ch;
this.meta17672 = meta17672;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async17671.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_17673,meta17672__$1){
var self__ = this;
var _17673__$1 = this;
return (new cljs.core.async.t_cljs$core$async17671(self__.f,self__.ch,meta17672__$1));
}));

(cljs.core.async.t_cljs$core$async17671.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_17673){
var self__ = this;
var _17673__$1 = this;
return self__.meta17672;
}));

(cljs.core.async.t_cljs$core$async17671.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async17671.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async17671.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async17671.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_(self__.ch,fn1);
}));

(cljs.core.async.t_cljs$core$async17671.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async17671.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_(self__.ch,(self__.f.cljs$core$IFn$_invoke$arity$1 ? self__.f.cljs$core$IFn$_invoke$arity$1(val) : self__.f.call(null,val)),fn1);
}));

(cljs.core.async.t_cljs$core$async17671.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta17672","meta17672",-701737672,null)], null);
}));

(cljs.core.async.t_cljs$core$async17671.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async17671.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async17671");

(cljs.core.async.t_cljs$core$async17671.cljs$lang$ctorPrWriter = (function (this__5310__auto__,writer__5311__auto__,opt__5312__auto__){
return cljs.core._write(writer__5311__auto__,"cljs.core.async/t_cljs$core$async17671");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async17671.
 */
cljs.core.async.__GT_t_cljs$core$async17671 = (function cljs$core$async$__GT_t_cljs$core$async17671(f,ch,meta17672){
return (new cljs.core.async.t_cljs$core$async17671(f,ch,meta17672));
});


/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_GT_ = (function cljs$core$async$map_GT_(f,ch){
return (new cljs.core.async.t_cljs$core$async17671(f,ch,cljs.core.PersistentArrayMap.EMPTY));
});

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async17684 = (function (p,ch,meta17685){
this.p = p;
this.ch = ch;
this.meta17685 = meta17685;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async17684.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_17686,meta17685__$1){
var self__ = this;
var _17686__$1 = this;
return (new cljs.core.async.t_cljs$core$async17684(self__.p,self__.ch,meta17685__$1));
}));

(cljs.core.async.t_cljs$core$async17684.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_17686){
var self__ = this;
var _17686__$1 = this;
return self__.meta17685;
}));

(cljs.core.async.t_cljs$core$async17684.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async17684.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async17684.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async17684.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async17684.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_(self__.ch,fn1);
}));

(cljs.core.async.t_cljs$core$async17684.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async17684.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_((self__.p.cljs$core$IFn$_invoke$arity$1 ? self__.p.cljs$core$IFn$_invoke$arity$1(val) : self__.p.call(null,val)))){
return cljs.core.async.impl.protocols.put_BANG_(self__.ch,val,fn1);
} else {
return cljs.core.async.impl.channels.box(cljs.core.not(cljs.core.async.impl.protocols.closed_QMARK_(self__.ch)));
}
}));

(cljs.core.async.t_cljs$core$async17684.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"p","p",1791580836,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta17685","meta17685",-1722875916,null)], null);
}));

(cljs.core.async.t_cljs$core$async17684.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async17684.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async17684");

(cljs.core.async.t_cljs$core$async17684.cljs$lang$ctorPrWriter = (function (this__5310__auto__,writer__5311__auto__,opt__5312__auto__){
return cljs.core._write(writer__5311__auto__,"cljs.core.async/t_cljs$core$async17684");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async17684.
 */
cljs.core.async.__GT_t_cljs$core$async17684 = (function cljs$core$async$__GT_t_cljs$core$async17684(p,ch,meta17685){
return (new cljs.core.async.t_cljs$core$async17684(p,ch,meta17685));
});


/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_GT_ = (function cljs$core$async$filter_GT_(p,ch){
return (new cljs.core.async.t_cljs$core$async17684(p,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_GT_ = (function cljs$core$async$remove_GT_(p,ch){
return cljs.core.async.filter_GT_(cljs.core.complement(p),ch);
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_LT_ = (function cljs$core$async$filter_LT_(var_args){
var G__17702 = arguments.length;
switch (G__17702) {
case 2:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3(p,ch,null);
}));

(cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__14559__auto___19245 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__14560__auto__ = (function (){var switch__13986__auto__ = (function (state_17723){
var state_val_17724 = (state_17723[(1)]);
if((state_val_17724 === (7))){
var inst_17719 = (state_17723[(2)]);
var state_17723__$1 = state_17723;
var statearr_17725_19246 = state_17723__$1;
(statearr_17725_19246[(2)] = inst_17719);

(statearr_17725_19246[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17724 === (1))){
var state_17723__$1 = state_17723;
var statearr_17729_19247 = state_17723__$1;
(statearr_17729_19247[(2)] = null);

(statearr_17729_19247[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17724 === (4))){
var inst_17705 = (state_17723[(7)]);
var inst_17705__$1 = (state_17723[(2)]);
var inst_17706 = (inst_17705__$1 == null);
var state_17723__$1 = (function (){var statearr_17730 = state_17723;
(statearr_17730[(7)] = inst_17705__$1);

return statearr_17730;
})();
if(cljs.core.truth_(inst_17706)){
var statearr_17731_19248 = state_17723__$1;
(statearr_17731_19248[(1)] = (5));

} else {
var statearr_17732_19249 = state_17723__$1;
(statearr_17732_19249[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17724 === (6))){
var inst_17705 = (state_17723[(7)]);
var inst_17710 = (p.cljs$core$IFn$_invoke$arity$1 ? p.cljs$core$IFn$_invoke$arity$1(inst_17705) : p.call(null,inst_17705));
var state_17723__$1 = state_17723;
if(cljs.core.truth_(inst_17710)){
var statearr_17733_19250 = state_17723__$1;
(statearr_17733_19250[(1)] = (8));

} else {
var statearr_17734_19251 = state_17723__$1;
(statearr_17734_19251[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17724 === (3))){
var inst_17721 = (state_17723[(2)]);
var state_17723__$1 = state_17723;
return cljs.core.async.impl.ioc_helpers.return_chan(state_17723__$1,inst_17721);
} else {
if((state_val_17724 === (2))){
var state_17723__$1 = state_17723;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_17723__$1,(4),ch);
} else {
if((state_val_17724 === (11))){
var inst_17713 = (state_17723[(2)]);
var state_17723__$1 = state_17723;
var statearr_17738_19252 = state_17723__$1;
(statearr_17738_19252[(2)] = inst_17713);

(statearr_17738_19252[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17724 === (9))){
var state_17723__$1 = state_17723;
var statearr_17739_19253 = state_17723__$1;
(statearr_17739_19253[(2)] = null);

(statearr_17739_19253[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17724 === (5))){
var inst_17708 = cljs.core.async.close_BANG_(out);
var state_17723__$1 = state_17723;
var statearr_17740_19254 = state_17723__$1;
(statearr_17740_19254[(2)] = inst_17708);

(statearr_17740_19254[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17724 === (10))){
var inst_17716 = (state_17723[(2)]);
var state_17723__$1 = (function (){var statearr_17744 = state_17723;
(statearr_17744[(8)] = inst_17716);

return statearr_17744;
})();
var statearr_17745_19255 = state_17723__$1;
(statearr_17745_19255[(2)] = null);

(statearr_17745_19255[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17724 === (8))){
var inst_17705 = (state_17723[(7)]);
var state_17723__$1 = state_17723;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_17723__$1,(11),out,inst_17705);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__13987__auto__ = null;
var cljs$core$async$state_machine__13987__auto____0 = (function (){
var statearr_17746 = [null,null,null,null,null,null,null,null,null];
(statearr_17746[(0)] = cljs$core$async$state_machine__13987__auto__);

(statearr_17746[(1)] = (1));

return statearr_17746;
});
var cljs$core$async$state_machine__13987__auto____1 = (function (state_17723){
while(true){
var ret_value__13988__auto__ = (function (){try{while(true){
var result__13989__auto__ = switch__13986__auto__(state_17723);
if(cljs.core.keyword_identical_QMARK_(result__13989__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__13989__auto__;
}
break;
}
}catch (e17754){var ex__13990__auto__ = e17754;
var statearr_17758_19262 = state_17723;
(statearr_17758_19262[(2)] = ex__13990__auto__);


if(cljs.core.seq((state_17723[(4)]))){
var statearr_17759_19263 = state_17723;
(statearr_17759_19263[(1)] = cljs.core.first((state_17723[(4)])));

} else {
throw ex__13990__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__13988__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__19264 = state_17723;
state_17723 = G__19264;
continue;
} else {
return ret_value__13988__auto__;
}
break;
}
});
cljs$core$async$state_machine__13987__auto__ = function(state_17723){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__13987__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__13987__auto____1.call(this,state_17723);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__13987__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__13987__auto____0;
cljs$core$async$state_machine__13987__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__13987__auto____1;
return cljs$core$async$state_machine__13987__auto__;
})()
})();
var state__14561__auto__ = (function (){var statearr_17760 = f__14560__auto__();
(statearr_17760[(6)] = c__14559__auto___19245);

return statearr_17760;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__14561__auto__);
}));


return out;
}));

(cljs.core.async.filter_LT_.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_LT_ = (function cljs$core$async$remove_LT_(var_args){
var G__17768 = arguments.length;
switch (G__17768) {
case 2:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3(p,ch,null);
}));

(cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3(cljs.core.complement(p),ch,buf_or_n);
}));

(cljs.core.async.remove_LT_.cljs$lang$maxFixedArity = 3);

cljs.core.async.mapcat_STAR_ = (function cljs$core$async$mapcat_STAR_(f,in$,out){
var c__14559__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__14560__auto__ = (function (){var switch__13986__auto__ = (function (state_17853){
var state_val_17854 = (state_17853[(1)]);
if((state_val_17854 === (7))){
var inst_17849 = (state_17853[(2)]);
var state_17853__$1 = state_17853;
var statearr_17867_19267 = state_17853__$1;
(statearr_17867_19267[(2)] = inst_17849);

(statearr_17867_19267[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17854 === (20))){
var inst_17812 = (state_17853[(7)]);
var inst_17830 = (state_17853[(2)]);
var inst_17831 = cljs.core.next(inst_17812);
var inst_17798 = inst_17831;
var inst_17799 = null;
var inst_17800 = (0);
var inst_17801 = (0);
var state_17853__$1 = (function (){var statearr_17868 = state_17853;
(statearr_17868[(8)] = inst_17830);

(statearr_17868[(9)] = inst_17798);

(statearr_17868[(10)] = inst_17799);

(statearr_17868[(11)] = inst_17800);

(statearr_17868[(12)] = inst_17801);

return statearr_17868;
})();
var statearr_17869_19270 = state_17853__$1;
(statearr_17869_19270[(2)] = null);

(statearr_17869_19270[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17854 === (1))){
var state_17853__$1 = state_17853;
var statearr_17870_19271 = state_17853__$1;
(statearr_17870_19271[(2)] = null);

(statearr_17870_19271[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17854 === (4))){
var inst_17782 = (state_17853[(13)]);
var inst_17782__$1 = (state_17853[(2)]);
var inst_17783 = (inst_17782__$1 == null);
var state_17853__$1 = (function (){var statearr_17871 = state_17853;
(statearr_17871[(13)] = inst_17782__$1);

return statearr_17871;
})();
if(cljs.core.truth_(inst_17783)){
var statearr_17872_19272 = state_17853__$1;
(statearr_17872_19272[(1)] = (5));

} else {
var statearr_17873_19273 = state_17853__$1;
(statearr_17873_19273[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17854 === (15))){
var state_17853__$1 = state_17853;
var statearr_17877_19278 = state_17853__$1;
(statearr_17877_19278[(2)] = null);

(statearr_17877_19278[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17854 === (21))){
var state_17853__$1 = state_17853;
var statearr_17878_19279 = state_17853__$1;
(statearr_17878_19279[(2)] = null);

(statearr_17878_19279[(1)] = (23));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17854 === (13))){
var inst_17801 = (state_17853[(12)]);
var inst_17798 = (state_17853[(9)]);
var inst_17799 = (state_17853[(10)]);
var inst_17800 = (state_17853[(11)]);
var inst_17808 = (state_17853[(2)]);
var inst_17809 = (inst_17801 + (1));
var tmp17874 = inst_17799;
var tmp17875 = inst_17800;
var tmp17876 = inst_17798;
var inst_17798__$1 = tmp17876;
var inst_17799__$1 = tmp17874;
var inst_17800__$1 = tmp17875;
var inst_17801__$1 = inst_17809;
var state_17853__$1 = (function (){var statearr_17879 = state_17853;
(statearr_17879[(14)] = inst_17808);

(statearr_17879[(9)] = inst_17798__$1);

(statearr_17879[(10)] = inst_17799__$1);

(statearr_17879[(11)] = inst_17800__$1);

(statearr_17879[(12)] = inst_17801__$1);

return statearr_17879;
})();
var statearr_17880_19281 = state_17853__$1;
(statearr_17880_19281[(2)] = null);

(statearr_17880_19281[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17854 === (22))){
var state_17853__$1 = state_17853;
var statearr_17881_19282 = state_17853__$1;
(statearr_17881_19282[(2)] = null);

(statearr_17881_19282[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17854 === (6))){
var inst_17782 = (state_17853[(13)]);
var inst_17795 = (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(inst_17782) : f.call(null,inst_17782));
var inst_17796 = cljs.core.seq(inst_17795);
var inst_17798 = inst_17796;
var inst_17799 = null;
var inst_17800 = (0);
var inst_17801 = (0);
var state_17853__$1 = (function (){var statearr_17882 = state_17853;
(statearr_17882[(9)] = inst_17798);

(statearr_17882[(10)] = inst_17799);

(statearr_17882[(11)] = inst_17800);

(statearr_17882[(12)] = inst_17801);

return statearr_17882;
})();
var statearr_17883_19284 = state_17853__$1;
(statearr_17883_19284[(2)] = null);

(statearr_17883_19284[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17854 === (17))){
var inst_17812 = (state_17853[(7)]);
var inst_17823 = cljs.core.chunk_first(inst_17812);
var inst_17824 = cljs.core.chunk_rest(inst_17812);
var inst_17825 = cljs.core.count(inst_17823);
var inst_17798 = inst_17824;
var inst_17799 = inst_17823;
var inst_17800 = inst_17825;
var inst_17801 = (0);
var state_17853__$1 = (function (){var statearr_17884 = state_17853;
(statearr_17884[(9)] = inst_17798);

(statearr_17884[(10)] = inst_17799);

(statearr_17884[(11)] = inst_17800);

(statearr_17884[(12)] = inst_17801);

return statearr_17884;
})();
var statearr_17888_19286 = state_17853__$1;
(statearr_17888_19286[(2)] = null);

(statearr_17888_19286[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17854 === (3))){
var inst_17851 = (state_17853[(2)]);
var state_17853__$1 = state_17853;
return cljs.core.async.impl.ioc_helpers.return_chan(state_17853__$1,inst_17851);
} else {
if((state_val_17854 === (12))){
var inst_17839 = (state_17853[(2)]);
var state_17853__$1 = state_17853;
var statearr_17889_19296 = state_17853__$1;
(statearr_17889_19296[(2)] = inst_17839);

(statearr_17889_19296[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17854 === (2))){
var state_17853__$1 = state_17853;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_17853__$1,(4),in$);
} else {
if((state_val_17854 === (23))){
var inst_17847 = (state_17853[(2)]);
var state_17853__$1 = state_17853;
var statearr_17893_19299 = state_17853__$1;
(statearr_17893_19299[(2)] = inst_17847);

(statearr_17893_19299[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17854 === (19))){
var inst_17834 = (state_17853[(2)]);
var state_17853__$1 = state_17853;
var statearr_17894_19301 = state_17853__$1;
(statearr_17894_19301[(2)] = inst_17834);

(statearr_17894_19301[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17854 === (11))){
var inst_17798 = (state_17853[(9)]);
var inst_17812 = (state_17853[(7)]);
var inst_17812__$1 = cljs.core.seq(inst_17798);
var state_17853__$1 = (function (){var statearr_17895 = state_17853;
(statearr_17895[(7)] = inst_17812__$1);

return statearr_17895;
})();
if(inst_17812__$1){
var statearr_17896_19303 = state_17853__$1;
(statearr_17896_19303[(1)] = (14));

} else {
var statearr_17897_19304 = state_17853__$1;
(statearr_17897_19304[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17854 === (9))){
var inst_17841 = (state_17853[(2)]);
var inst_17842 = cljs.core.async.impl.protocols.closed_QMARK_(out);
var state_17853__$1 = (function (){var statearr_17898 = state_17853;
(statearr_17898[(15)] = inst_17841);

return statearr_17898;
})();
if(cljs.core.truth_(inst_17842)){
var statearr_17902_19306 = state_17853__$1;
(statearr_17902_19306[(1)] = (21));

} else {
var statearr_17903_19307 = state_17853__$1;
(statearr_17903_19307[(1)] = (22));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17854 === (5))){
var inst_17788 = cljs.core.async.close_BANG_(out);
var state_17853__$1 = state_17853;
var statearr_17904_19310 = state_17853__$1;
(statearr_17904_19310[(2)] = inst_17788);

(statearr_17904_19310[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17854 === (14))){
var inst_17812 = (state_17853[(7)]);
var inst_17818 = cljs.core.chunked_seq_QMARK_(inst_17812);
var state_17853__$1 = state_17853;
if(inst_17818){
var statearr_17905_19311 = state_17853__$1;
(statearr_17905_19311[(1)] = (17));

} else {
var statearr_17906_19312 = state_17853__$1;
(statearr_17906_19312[(1)] = (18));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17854 === (16))){
var inst_17837 = (state_17853[(2)]);
var state_17853__$1 = state_17853;
var statearr_17907_19318 = state_17853__$1;
(statearr_17907_19318[(2)] = inst_17837);

(statearr_17907_19318[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17854 === (10))){
var inst_17799 = (state_17853[(10)]);
var inst_17801 = (state_17853[(12)]);
var inst_17806 = cljs.core._nth(inst_17799,inst_17801);
var state_17853__$1 = state_17853;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_17853__$1,(13),out,inst_17806);
} else {
if((state_val_17854 === (18))){
var inst_17812 = (state_17853[(7)]);
var inst_17828 = cljs.core.first(inst_17812);
var state_17853__$1 = state_17853;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_17853__$1,(20),out,inst_17828);
} else {
if((state_val_17854 === (8))){
var inst_17801 = (state_17853[(12)]);
var inst_17800 = (state_17853[(11)]);
var inst_17803 = (inst_17801 < inst_17800);
var inst_17804 = inst_17803;
var state_17853__$1 = state_17853;
if(cljs.core.truth_(inst_17804)){
var statearr_17911_19320 = state_17853__$1;
(statearr_17911_19320[(1)] = (10));

} else {
var statearr_17912_19321 = state_17853__$1;
(statearr_17912_19321[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$mapcat_STAR__$_state_machine__13987__auto__ = null;
var cljs$core$async$mapcat_STAR__$_state_machine__13987__auto____0 = (function (){
var statearr_17913 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_17913[(0)] = cljs$core$async$mapcat_STAR__$_state_machine__13987__auto__);

(statearr_17913[(1)] = (1));

return statearr_17913;
});
var cljs$core$async$mapcat_STAR__$_state_machine__13987__auto____1 = (function (state_17853){
while(true){
var ret_value__13988__auto__ = (function (){try{while(true){
var result__13989__auto__ = switch__13986__auto__(state_17853);
if(cljs.core.keyword_identical_QMARK_(result__13989__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__13989__auto__;
}
break;
}
}catch (e17914){var ex__13990__auto__ = e17914;
var statearr_17918_19322 = state_17853;
(statearr_17918_19322[(2)] = ex__13990__auto__);


if(cljs.core.seq((state_17853[(4)]))){
var statearr_17919_19323 = state_17853;
(statearr_17919_19323[(1)] = cljs.core.first((state_17853[(4)])));

} else {
throw ex__13990__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__13988__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__19324 = state_17853;
state_17853 = G__19324;
continue;
} else {
return ret_value__13988__auto__;
}
break;
}
});
cljs$core$async$mapcat_STAR__$_state_machine__13987__auto__ = function(state_17853){
switch(arguments.length){
case 0:
return cljs$core$async$mapcat_STAR__$_state_machine__13987__auto____0.call(this);
case 1:
return cljs$core$async$mapcat_STAR__$_state_machine__13987__auto____1.call(this,state_17853);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mapcat_STAR__$_state_machine__13987__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mapcat_STAR__$_state_machine__13987__auto____0;
cljs$core$async$mapcat_STAR__$_state_machine__13987__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mapcat_STAR__$_state_machine__13987__auto____1;
return cljs$core$async$mapcat_STAR__$_state_machine__13987__auto__;
})()
})();
var state__14561__auto__ = (function (){var statearr_17924 = f__14560__auto__();
(statearr_17924[(6)] = c__14559__auto__);

return statearr_17924;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__14561__auto__);
}));

return c__14559__auto__;
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_LT_ = (function cljs$core$async$mapcat_LT_(var_args){
var G__17929 = arguments.length;
switch (G__17929) {
case 2:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2 = (function (f,in$){
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3(f,in$,null);
}));

(cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3 = (function (f,in$,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
cljs.core.async.mapcat_STAR_(f,in$,out);

return out;
}));

(cljs.core.async.mapcat_LT_.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_GT_ = (function cljs$core$async$mapcat_GT_(var_args){
var G__17932 = arguments.length;
switch (G__17932) {
case 2:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2 = (function (f,out){
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3(f,out,null);
}));

(cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3 = (function (f,out,buf_or_n){
var in$ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
cljs.core.async.mapcat_STAR_(f,in$,out);

return in$;
}));

(cljs.core.async.mapcat_GT_.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.unique = (function cljs$core$async$unique(var_args){
var G__17937 = arguments.length;
switch (G__17937) {
case 1:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1 = (function (ch){
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2(ch,null);
}));

(cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2 = (function (ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__14559__auto___19361 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__14560__auto__ = (function (){var switch__13986__auto__ = (function (state_17967){
var state_val_17968 = (state_17967[(1)]);
if((state_val_17968 === (7))){
var inst_17959 = (state_17967[(2)]);
var state_17967__$1 = state_17967;
var statearr_17969_19362 = state_17967__$1;
(statearr_17969_19362[(2)] = inst_17959);

(statearr_17969_19362[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17968 === (1))){
var inst_17941 = null;
var state_17967__$1 = (function (){var statearr_17972 = state_17967;
(statearr_17972[(7)] = inst_17941);

return statearr_17972;
})();
var statearr_17973_19364 = state_17967__$1;
(statearr_17973_19364[(2)] = null);

(statearr_17973_19364[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17968 === (4))){
var inst_17944 = (state_17967[(8)]);
var inst_17944__$1 = (state_17967[(2)]);
var inst_17945 = (inst_17944__$1 == null);
var inst_17946 = cljs.core.not(inst_17945);
var state_17967__$1 = (function (){var statearr_17974 = state_17967;
(statearr_17974[(8)] = inst_17944__$1);

return statearr_17974;
})();
if(inst_17946){
var statearr_17975_19365 = state_17967__$1;
(statearr_17975_19365[(1)] = (5));

} else {
var statearr_17976_19366 = state_17967__$1;
(statearr_17976_19366[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17968 === (6))){
var state_17967__$1 = state_17967;
var statearr_17980_19367 = state_17967__$1;
(statearr_17980_19367[(2)] = null);

(statearr_17980_19367[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17968 === (3))){
var inst_17961 = (state_17967[(2)]);
var inst_17962 = cljs.core.async.close_BANG_(out);
var state_17967__$1 = (function (){var statearr_17981 = state_17967;
(statearr_17981[(9)] = inst_17961);

return statearr_17981;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_17967__$1,inst_17962);
} else {
if((state_val_17968 === (2))){
var state_17967__$1 = state_17967;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_17967__$1,(4),ch);
} else {
if((state_val_17968 === (11))){
var inst_17944 = (state_17967[(8)]);
var inst_17953 = (state_17967[(2)]);
var inst_17941 = inst_17944;
var state_17967__$1 = (function (){var statearr_17985 = state_17967;
(statearr_17985[(10)] = inst_17953);

(statearr_17985[(7)] = inst_17941);

return statearr_17985;
})();
var statearr_17986_19401 = state_17967__$1;
(statearr_17986_19401[(2)] = null);

(statearr_17986_19401[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17968 === (9))){
var inst_17944 = (state_17967[(8)]);
var state_17967__$1 = state_17967;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_17967__$1,(11),out,inst_17944);
} else {
if((state_val_17968 === (5))){
var inst_17944 = (state_17967[(8)]);
var inst_17941 = (state_17967[(7)]);
var inst_17948 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_17944,inst_17941);
var state_17967__$1 = state_17967;
if(inst_17948){
var statearr_17988_19404 = state_17967__$1;
(statearr_17988_19404[(1)] = (8));

} else {
var statearr_17989_19405 = state_17967__$1;
(statearr_17989_19405[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17968 === (10))){
var inst_17956 = (state_17967[(2)]);
var state_17967__$1 = state_17967;
var statearr_17990_19406 = state_17967__$1;
(statearr_17990_19406[(2)] = inst_17956);

(statearr_17990_19406[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17968 === (8))){
var inst_17941 = (state_17967[(7)]);
var tmp17987 = inst_17941;
var inst_17941__$1 = tmp17987;
var state_17967__$1 = (function (){var statearr_17991 = state_17967;
(statearr_17991[(7)] = inst_17941__$1);

return statearr_17991;
})();
var statearr_17992_19408 = state_17967__$1;
(statearr_17992_19408[(2)] = null);

(statearr_17992_19408[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__13987__auto__ = null;
var cljs$core$async$state_machine__13987__auto____0 = (function (){
var statearr_17993 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_17993[(0)] = cljs$core$async$state_machine__13987__auto__);

(statearr_17993[(1)] = (1));

return statearr_17993;
});
var cljs$core$async$state_machine__13987__auto____1 = (function (state_17967){
while(true){
var ret_value__13988__auto__ = (function (){try{while(true){
var result__13989__auto__ = switch__13986__auto__(state_17967);
if(cljs.core.keyword_identical_QMARK_(result__13989__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__13989__auto__;
}
break;
}
}catch (e17994){var ex__13990__auto__ = e17994;
var statearr_17995_19409 = state_17967;
(statearr_17995_19409[(2)] = ex__13990__auto__);


if(cljs.core.seq((state_17967[(4)]))){
var statearr_17996_19410 = state_17967;
(statearr_17996_19410[(1)] = cljs.core.first((state_17967[(4)])));

} else {
throw ex__13990__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__13988__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__19411 = state_17967;
state_17967 = G__19411;
continue;
} else {
return ret_value__13988__auto__;
}
break;
}
});
cljs$core$async$state_machine__13987__auto__ = function(state_17967){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__13987__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__13987__auto____1.call(this,state_17967);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__13987__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__13987__auto____0;
cljs$core$async$state_machine__13987__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__13987__auto____1;
return cljs$core$async$state_machine__13987__auto__;
})()
})();
var state__14561__auto__ = (function (){var statearr_17999 = f__14560__auto__();
(statearr_17999[(6)] = c__14559__auto___19361);

return statearr_17999;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__14561__auto__);
}));


return out;
}));

(cljs.core.async.unique.cljs$lang$maxFixedArity = 2);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition = (function cljs$core$async$partition(var_args){
var G__18002 = arguments.length;
switch (G__18002) {
case 2:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3(n,ch,null);
}));

(cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__14559__auto___19414 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__14560__auto__ = (function (){var switch__13986__auto__ = (function (state_18040){
var state_val_18041 = (state_18040[(1)]);
if((state_val_18041 === (7))){
var inst_18036 = (state_18040[(2)]);
var state_18040__$1 = state_18040;
var statearr_18042_19429 = state_18040__$1;
(statearr_18042_19429[(2)] = inst_18036);

(statearr_18042_19429[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18041 === (1))){
var inst_18003 = (new Array(n));
var inst_18004 = inst_18003;
var inst_18005 = (0);
var state_18040__$1 = (function (){var statearr_18044 = state_18040;
(statearr_18044[(7)] = inst_18004);

(statearr_18044[(8)] = inst_18005);

return statearr_18044;
})();
var statearr_18049_19431 = state_18040__$1;
(statearr_18049_19431[(2)] = null);

(statearr_18049_19431[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18041 === (4))){
var inst_18008 = (state_18040[(9)]);
var inst_18008__$1 = (state_18040[(2)]);
var inst_18009 = (inst_18008__$1 == null);
var inst_18010 = cljs.core.not(inst_18009);
var state_18040__$1 = (function (){var statearr_18054 = state_18040;
(statearr_18054[(9)] = inst_18008__$1);

return statearr_18054;
})();
if(inst_18010){
var statearr_18055_19432 = state_18040__$1;
(statearr_18055_19432[(1)] = (5));

} else {
var statearr_18056_19433 = state_18040__$1;
(statearr_18056_19433[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18041 === (15))){
var inst_18030 = (state_18040[(2)]);
var state_18040__$1 = state_18040;
var statearr_18057_19434 = state_18040__$1;
(statearr_18057_19434[(2)] = inst_18030);

(statearr_18057_19434[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18041 === (13))){
var state_18040__$1 = state_18040;
var statearr_18058_19435 = state_18040__$1;
(statearr_18058_19435[(2)] = null);

(statearr_18058_19435[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18041 === (6))){
var inst_18005 = (state_18040[(8)]);
var inst_18026 = (inst_18005 > (0));
var state_18040__$1 = state_18040;
if(cljs.core.truth_(inst_18026)){
var statearr_18059_19436 = state_18040__$1;
(statearr_18059_19436[(1)] = (12));

} else {
var statearr_18060_19437 = state_18040__$1;
(statearr_18060_19437[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18041 === (3))){
var inst_18038 = (state_18040[(2)]);
var state_18040__$1 = state_18040;
return cljs.core.async.impl.ioc_helpers.return_chan(state_18040__$1,inst_18038);
} else {
if((state_val_18041 === (12))){
var inst_18004 = (state_18040[(7)]);
var inst_18028 = cljs.core.vec(inst_18004);
var state_18040__$1 = state_18040;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_18040__$1,(15),out,inst_18028);
} else {
if((state_val_18041 === (2))){
var state_18040__$1 = state_18040;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_18040__$1,(4),ch);
} else {
if((state_val_18041 === (11))){
var inst_18020 = (state_18040[(2)]);
var inst_18021 = (new Array(n));
var inst_18004 = inst_18021;
var inst_18005 = (0);
var state_18040__$1 = (function (){var statearr_18102 = state_18040;
(statearr_18102[(10)] = inst_18020);

(statearr_18102[(7)] = inst_18004);

(statearr_18102[(8)] = inst_18005);

return statearr_18102;
})();
var statearr_18107_19438 = state_18040__$1;
(statearr_18107_19438[(2)] = null);

(statearr_18107_19438[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18041 === (9))){
var inst_18004 = (state_18040[(7)]);
var inst_18018 = cljs.core.vec(inst_18004);
var state_18040__$1 = state_18040;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_18040__$1,(11),out,inst_18018);
} else {
if((state_val_18041 === (5))){
var inst_18004 = (state_18040[(7)]);
var inst_18005 = (state_18040[(8)]);
var inst_18008 = (state_18040[(9)]);
var inst_18013 = (state_18040[(11)]);
var inst_18012 = (inst_18004[inst_18005] = inst_18008);
var inst_18013__$1 = (inst_18005 + (1));
var inst_18014 = (inst_18013__$1 < n);
var state_18040__$1 = (function (){var statearr_18112 = state_18040;
(statearr_18112[(12)] = inst_18012);

(statearr_18112[(11)] = inst_18013__$1);

return statearr_18112;
})();
if(cljs.core.truth_(inst_18014)){
var statearr_18113_19449 = state_18040__$1;
(statearr_18113_19449[(1)] = (8));

} else {
var statearr_18114_19450 = state_18040__$1;
(statearr_18114_19450[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18041 === (14))){
var inst_18033 = (state_18040[(2)]);
var inst_18034 = cljs.core.async.close_BANG_(out);
var state_18040__$1 = (function (){var statearr_18116 = state_18040;
(statearr_18116[(13)] = inst_18033);

return statearr_18116;
})();
var statearr_18117_19451 = state_18040__$1;
(statearr_18117_19451[(2)] = inst_18034);

(statearr_18117_19451[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18041 === (10))){
var inst_18024 = (state_18040[(2)]);
var state_18040__$1 = state_18040;
var statearr_18118_19452 = state_18040__$1;
(statearr_18118_19452[(2)] = inst_18024);

(statearr_18118_19452[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18041 === (8))){
var inst_18004 = (state_18040[(7)]);
var inst_18013 = (state_18040[(11)]);
var tmp18115 = inst_18004;
var inst_18004__$1 = tmp18115;
var inst_18005 = inst_18013;
var state_18040__$1 = (function (){var statearr_18119 = state_18040;
(statearr_18119[(7)] = inst_18004__$1);

(statearr_18119[(8)] = inst_18005);

return statearr_18119;
})();
var statearr_18120_19454 = state_18040__$1;
(statearr_18120_19454[(2)] = null);

(statearr_18120_19454[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__13987__auto__ = null;
var cljs$core$async$state_machine__13987__auto____0 = (function (){
var statearr_18121 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_18121[(0)] = cljs$core$async$state_machine__13987__auto__);

(statearr_18121[(1)] = (1));

return statearr_18121;
});
var cljs$core$async$state_machine__13987__auto____1 = (function (state_18040){
while(true){
var ret_value__13988__auto__ = (function (){try{while(true){
var result__13989__auto__ = switch__13986__auto__(state_18040);
if(cljs.core.keyword_identical_QMARK_(result__13989__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__13989__auto__;
}
break;
}
}catch (e18122){var ex__13990__auto__ = e18122;
var statearr_18123_19458 = state_18040;
(statearr_18123_19458[(2)] = ex__13990__auto__);


if(cljs.core.seq((state_18040[(4)]))){
var statearr_18124_19460 = state_18040;
(statearr_18124_19460[(1)] = cljs.core.first((state_18040[(4)])));

} else {
throw ex__13990__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__13988__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__19462 = state_18040;
state_18040 = G__19462;
continue;
} else {
return ret_value__13988__auto__;
}
break;
}
});
cljs$core$async$state_machine__13987__auto__ = function(state_18040){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__13987__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__13987__auto____1.call(this,state_18040);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__13987__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__13987__auto____0;
cljs$core$async$state_machine__13987__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__13987__auto____1;
return cljs$core$async$state_machine__13987__auto__;
})()
})();
var state__14561__auto__ = (function (){var statearr_18125 = f__14560__auto__();
(statearr_18125[(6)] = c__14559__auto___19414);

return statearr_18125;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__14561__auto__);
}));


return out;
}));

(cljs.core.async.partition.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition_by = (function cljs$core$async$partition_by(var_args){
var G__18130 = arguments.length;
switch (G__18130) {
case 2:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2 = (function (f,ch){
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3(f,ch,null);
}));

(cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3 = (function (f,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__14559__auto___19470 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__14560__auto__ = (function (){var switch__13986__auto__ = (function (state_18187){
var state_val_18188 = (state_18187[(1)]);
if((state_val_18188 === (7))){
var inst_18183 = (state_18187[(2)]);
var state_18187__$1 = state_18187;
var statearr_18189_19476 = state_18187__$1;
(statearr_18189_19476[(2)] = inst_18183);

(statearr_18189_19476[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18188 === (1))){
var inst_18138 = [];
var inst_18139 = inst_18138;
var inst_18140 = new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123);
var state_18187__$1 = (function (){var statearr_18190 = state_18187;
(statearr_18190[(7)] = inst_18139);

(statearr_18190[(8)] = inst_18140);

return statearr_18190;
})();
var statearr_18191_19477 = state_18187__$1;
(statearr_18191_19477[(2)] = null);

(statearr_18191_19477[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18188 === (4))){
var inst_18143 = (state_18187[(9)]);
var inst_18143__$1 = (state_18187[(2)]);
var inst_18144 = (inst_18143__$1 == null);
var inst_18145 = cljs.core.not(inst_18144);
var state_18187__$1 = (function (){var statearr_18195 = state_18187;
(statearr_18195[(9)] = inst_18143__$1);

return statearr_18195;
})();
if(inst_18145){
var statearr_18196_19478 = state_18187__$1;
(statearr_18196_19478[(1)] = (5));

} else {
var statearr_18207_19479 = state_18187__$1;
(statearr_18207_19479[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18188 === (15))){
var inst_18139 = (state_18187[(7)]);
var inst_18175 = cljs.core.vec(inst_18139);
var state_18187__$1 = state_18187;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_18187__$1,(18),out,inst_18175);
} else {
if((state_val_18188 === (13))){
var inst_18167 = (state_18187[(2)]);
var state_18187__$1 = state_18187;
var statearr_18208_19482 = state_18187__$1;
(statearr_18208_19482[(2)] = inst_18167);

(statearr_18208_19482[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18188 === (6))){
var inst_18139 = (state_18187[(7)]);
var inst_18169 = inst_18139.length;
var inst_18170 = (inst_18169 > (0));
var state_18187__$1 = state_18187;
if(cljs.core.truth_(inst_18170)){
var statearr_18213_19483 = state_18187__$1;
(statearr_18213_19483[(1)] = (15));

} else {
var statearr_18214_19484 = state_18187__$1;
(statearr_18214_19484[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18188 === (17))){
var inst_18180 = (state_18187[(2)]);
var inst_18181 = cljs.core.async.close_BANG_(out);
var state_18187__$1 = (function (){var statearr_18215 = state_18187;
(statearr_18215[(10)] = inst_18180);

return statearr_18215;
})();
var statearr_18216_19486 = state_18187__$1;
(statearr_18216_19486[(2)] = inst_18181);

(statearr_18216_19486[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18188 === (3))){
var inst_18185 = (state_18187[(2)]);
var state_18187__$1 = state_18187;
return cljs.core.async.impl.ioc_helpers.return_chan(state_18187__$1,inst_18185);
} else {
if((state_val_18188 === (12))){
var inst_18139 = (state_18187[(7)]);
var inst_18159 = cljs.core.vec(inst_18139);
var state_18187__$1 = state_18187;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_18187__$1,(14),out,inst_18159);
} else {
if((state_val_18188 === (2))){
var state_18187__$1 = state_18187;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_18187__$1,(4),ch);
} else {
if((state_val_18188 === (11))){
var inst_18139 = (state_18187[(7)]);
var inst_18143 = (state_18187[(9)]);
var inst_18147 = (state_18187[(11)]);
var inst_18155 = inst_18139.push(inst_18143);
var tmp18217 = inst_18139;
var inst_18139__$1 = tmp18217;
var inst_18140 = inst_18147;
var state_18187__$1 = (function (){var statearr_18218 = state_18187;
(statearr_18218[(12)] = inst_18155);

(statearr_18218[(7)] = inst_18139__$1);

(statearr_18218[(8)] = inst_18140);

return statearr_18218;
})();
var statearr_18219_19494 = state_18187__$1;
(statearr_18219_19494[(2)] = null);

(statearr_18219_19494[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18188 === (9))){
var inst_18140 = (state_18187[(8)]);
var inst_18151 = cljs.core.keyword_identical_QMARK_(inst_18140,new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123));
var state_18187__$1 = state_18187;
var statearr_18222_19499 = state_18187__$1;
(statearr_18222_19499[(2)] = inst_18151);

(statearr_18222_19499[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18188 === (5))){
var inst_18143 = (state_18187[(9)]);
var inst_18147 = (state_18187[(11)]);
var inst_18140 = (state_18187[(8)]);
var inst_18148 = (state_18187[(13)]);
var inst_18147__$1 = (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(inst_18143) : f.call(null,inst_18143));
var inst_18148__$1 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_18147__$1,inst_18140);
var state_18187__$1 = (function (){var statearr_18229 = state_18187;
(statearr_18229[(11)] = inst_18147__$1);

(statearr_18229[(13)] = inst_18148__$1);

return statearr_18229;
})();
if(inst_18148__$1){
var statearr_18233_19505 = state_18187__$1;
(statearr_18233_19505[(1)] = (8));

} else {
var statearr_18234_19506 = state_18187__$1;
(statearr_18234_19506[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18188 === (14))){
var inst_18143 = (state_18187[(9)]);
var inst_18147 = (state_18187[(11)]);
var inst_18161 = (state_18187[(2)]);
var inst_18162 = [];
var inst_18164 = inst_18162.push(inst_18143);
var inst_18139 = inst_18162;
var inst_18140 = inst_18147;
var state_18187__$1 = (function (){var statearr_18235 = state_18187;
(statearr_18235[(14)] = inst_18161);

(statearr_18235[(15)] = inst_18164);

(statearr_18235[(7)] = inst_18139);

(statearr_18235[(8)] = inst_18140);

return statearr_18235;
})();
var statearr_18236_19507 = state_18187__$1;
(statearr_18236_19507[(2)] = null);

(statearr_18236_19507[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18188 === (16))){
var state_18187__$1 = state_18187;
var statearr_18241_19508 = state_18187__$1;
(statearr_18241_19508[(2)] = null);

(statearr_18241_19508[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18188 === (10))){
var inst_18153 = (state_18187[(2)]);
var state_18187__$1 = state_18187;
if(cljs.core.truth_(inst_18153)){
var statearr_18242_19514 = state_18187__$1;
(statearr_18242_19514[(1)] = (11));

} else {
var statearr_18243_19515 = state_18187__$1;
(statearr_18243_19515[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18188 === (18))){
var inst_18177 = (state_18187[(2)]);
var state_18187__$1 = state_18187;
var statearr_18244_19516 = state_18187__$1;
(statearr_18244_19516[(2)] = inst_18177);

(statearr_18244_19516[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18188 === (8))){
var inst_18148 = (state_18187[(13)]);
var state_18187__$1 = state_18187;
var statearr_18245_19517 = state_18187__$1;
(statearr_18245_19517[(2)] = inst_18148);

(statearr_18245_19517[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__13987__auto__ = null;
var cljs$core$async$state_machine__13987__auto____0 = (function (){
var statearr_18247 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_18247[(0)] = cljs$core$async$state_machine__13987__auto__);

(statearr_18247[(1)] = (1));

return statearr_18247;
});
var cljs$core$async$state_machine__13987__auto____1 = (function (state_18187){
while(true){
var ret_value__13988__auto__ = (function (){try{while(true){
var result__13989__auto__ = switch__13986__auto__(state_18187);
if(cljs.core.keyword_identical_QMARK_(result__13989__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__13989__auto__;
}
break;
}
}catch (e18251){var ex__13990__auto__ = e18251;
var statearr_18252_19518 = state_18187;
(statearr_18252_19518[(2)] = ex__13990__auto__);


if(cljs.core.seq((state_18187[(4)]))){
var statearr_18253_19519 = state_18187;
(statearr_18253_19519[(1)] = cljs.core.first((state_18187[(4)])));

} else {
throw ex__13990__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__13988__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__19520 = state_18187;
state_18187 = G__19520;
continue;
} else {
return ret_value__13988__auto__;
}
break;
}
});
cljs$core$async$state_machine__13987__auto__ = function(state_18187){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__13987__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__13987__auto____1.call(this,state_18187);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__13987__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__13987__auto____0;
cljs$core$async$state_machine__13987__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__13987__auto____1;
return cljs$core$async$state_machine__13987__auto__;
})()
})();
var state__14561__auto__ = (function (){var statearr_18254 = f__14560__auto__();
(statearr_18254[(6)] = c__14559__auto___19470);

return statearr_18254;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__14561__auto__);
}));


return out;
}));

(cljs.core.async.partition_by.cljs$lang$maxFixedArity = 3);


//# sourceMappingURL=cljs.core.async.js.map
