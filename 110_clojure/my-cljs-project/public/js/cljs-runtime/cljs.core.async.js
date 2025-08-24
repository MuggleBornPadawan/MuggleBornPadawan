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
cljs.core.async.t_cljs$core$async12867 = (function (f,blockable,meta12868){
this.f = f;
this.blockable = blockable;
this.meta12868 = meta12868;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async12867.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_12869,meta12868__$1){
var self__ = this;
var _12869__$1 = this;
return (new cljs.core.async.t_cljs$core$async12867(self__.f,self__.blockable,meta12868__$1));
}));

(cljs.core.async.t_cljs$core$async12867.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_12869){
var self__ = this;
var _12869__$1 = this;
return self__.meta12868;
}));

(cljs.core.async.t_cljs$core$async12867.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async12867.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async12867.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.blockable;
}));

(cljs.core.async.t_cljs$core$async12867.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.f;
}));

(cljs.core.async.t_cljs$core$async12867.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"blockable","blockable",-28395259,null),new cljs.core.Symbol(null,"meta12868","meta12868",759689623,null)], null);
}));

(cljs.core.async.t_cljs$core$async12867.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async12867.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async12867");

(cljs.core.async.t_cljs$core$async12867.cljs$lang$ctorPrWriter = (function (this__5310__auto__,writer__5311__auto__,opt__5312__auto__){
return cljs.core._write(writer__5311__auto__,"cljs.core.async/t_cljs$core$async12867");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async12867.
 */
cljs.core.async.__GT_t_cljs$core$async12867 = (function cljs$core$async$__GT_t_cljs$core$async12867(f,blockable,meta12868){
return (new cljs.core.async.t_cljs$core$async12867(f,blockable,meta12868));
});


cljs.core.async.fn_handler = (function cljs$core$async$fn_handler(var_args){
var G__12865 = arguments.length;
switch (G__12865) {
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
return (new cljs.core.async.t_cljs$core$async12867(f,blockable,cljs.core.PersistentArrayMap.EMPTY));
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
var G__12891 = arguments.length;
switch (G__12891) {
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
var G__12907 = arguments.length;
switch (G__12907) {
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
var G__12926 = arguments.length;
switch (G__12926) {
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
var val_15327 = cljs.core.deref(ret);
if(cljs.core.truth_(on_caller_QMARK_)){
(fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(val_15327) : fn1.call(null,val_15327));
} else {
cljs.core.async.impl.dispatch.run((function (){
return (fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(val_15327) : fn1.call(null,val_15327));
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
var G__12946 = arguments.length;
switch (G__12946) {
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
var n__5616__auto___15331 = n;
var x_15332 = (0);
while(true){
if((x_15332 < n__5616__auto___15331)){
(a[x_15332] = x_15332);

var G__15333 = (x_15332 + (1));
x_15332 = G__15333;
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
cljs.core.async.t_cljs$core$async12950 = (function (flag,meta12951){
this.flag = flag;
this.meta12951 = meta12951;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async12950.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_12952,meta12951__$1){
var self__ = this;
var _12952__$1 = this;
return (new cljs.core.async.t_cljs$core$async12950(self__.flag,meta12951__$1));
}));

(cljs.core.async.t_cljs$core$async12950.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_12952){
var self__ = this;
var _12952__$1 = this;
return self__.meta12951;
}));

(cljs.core.async.t_cljs$core$async12950.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async12950.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.deref(self__.flag);
}));

(cljs.core.async.t_cljs$core$async12950.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async12950.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_(self__.flag,null);

return true;
}));

(cljs.core.async.t_cljs$core$async12950.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"meta12951","meta12951",-1700716402,null)], null);
}));

(cljs.core.async.t_cljs$core$async12950.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async12950.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async12950");

(cljs.core.async.t_cljs$core$async12950.cljs$lang$ctorPrWriter = (function (this__5310__auto__,writer__5311__auto__,opt__5312__auto__){
return cljs.core._write(writer__5311__auto__,"cljs.core.async/t_cljs$core$async12950");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async12950.
 */
cljs.core.async.__GT_t_cljs$core$async12950 = (function cljs$core$async$__GT_t_cljs$core$async12950(flag,meta12951){
return (new cljs.core.async.t_cljs$core$async12950(flag,meta12951));
});


cljs.core.async.alt_flag = (function cljs$core$async$alt_flag(){
var flag = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(true);
return (new cljs.core.async.t_cljs$core$async12950(flag,cljs.core.PersistentArrayMap.EMPTY));
});

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async12956 = (function (flag,cb,meta12957){
this.flag = flag;
this.cb = cb;
this.meta12957 = meta12957;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async12956.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_12958,meta12957__$1){
var self__ = this;
var _12958__$1 = this;
return (new cljs.core.async.t_cljs$core$async12956(self__.flag,self__.cb,meta12957__$1));
}));

(cljs.core.async.t_cljs$core$async12956.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_12958){
var self__ = this;
var _12958__$1 = this;
return self__.meta12957;
}));

(cljs.core.async.t_cljs$core$async12956.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async12956.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.active_QMARK_(self__.flag);
}));

(cljs.core.async.t_cljs$core$async12956.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async12956.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.async.impl.protocols.commit(self__.flag);

return self__.cb;
}));

(cljs.core.async.t_cljs$core$async12956.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"cb","cb",-2064487928,null),new cljs.core.Symbol(null,"meta12957","meta12957",1902092429,null)], null);
}));

(cljs.core.async.t_cljs$core$async12956.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async12956.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async12956");

(cljs.core.async.t_cljs$core$async12956.cljs$lang$ctorPrWriter = (function (this__5310__auto__,writer__5311__auto__,opt__5312__auto__){
return cljs.core._write(writer__5311__auto__,"cljs.core.async/t_cljs$core$async12956");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async12956.
 */
cljs.core.async.__GT_t_cljs$core$async12956 = (function cljs$core$async$__GT_t_cljs$core$async12956(flag,cb,meta12957){
return (new cljs.core.async.t_cljs$core$async12956(flag,cb,meta12957));
});


cljs.core.async.alt_handler = (function cljs$core$async$alt_handler(flag,cb){
return (new cljs.core.async.t_cljs$core$async12956(flag,cb,cljs.core.PersistentArrayMap.EMPTY));
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
var port_15338 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(ports__$1,i);
if(cljs.core.vector_QMARK_(port_15338)){
if((!(((port_15338.cljs$core$IFn$_invoke$arity$1 ? port_15338.cljs$core$IFn$_invoke$arity$1((1)) : port_15338.call(null,(1))) == null)))){
} else {
throw (new Error(["Assert failed: ","can't put nil on channel","\n","(some? (port 1))"].join('')));
}
} else {
}

var G__15339 = (i + (1));
i = G__15339;
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
return (function (p1__12960_SHARP_){
var G__12969 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__12960_SHARP_,wport], null);
return (fret.cljs$core$IFn$_invoke$arity$1 ? fret.cljs$core$IFn$_invoke$arity$1(G__12969) : fret.call(null,G__12969));
});})(i,val,idx,port,wport,flag,ports__$1,n,_,idxs,priority))
));
})():cljs.core.async.impl.protocols.take_BANG_(port,cljs.core.async.alt_handler(flag,((function (i,idx,port,wport,flag,ports__$1,n,_,idxs,priority){
return (function (p1__12961_SHARP_){
var G__12971 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__12961_SHARP_,port], null);
return (fret.cljs$core$IFn$_invoke$arity$1 ? fret.cljs$core$IFn$_invoke$arity$1(G__12971) : fret.call(null,G__12971));
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
var G__15344 = (i + (1));
i = G__15344;
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
var len__5749__auto___15345 = arguments.length;
var i__5750__auto___15346 = (0);
while(true){
if((i__5750__auto___15346 < len__5749__auto___15345)){
args__5755__auto__.push((arguments[i__5750__auto___15346]));

var G__15347 = (i__5750__auto___15346 + (1));
i__5750__auto___15346 = G__15347;
continue;
} else {
}
break;
}

var argseq__5756__auto__ = ((((1) < args__5755__auto__.length))?(new cljs.core.IndexedSeq(args__5755__auto__.slice((1)),(0),null)):null);
return cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5756__auto__);
});

(cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (ports,p__12978){
var map__12979 = p__12978;
var map__12979__$1 = cljs.core.__destructure_map(map__12979);
var opts = map__12979__$1;
throw (new Error("alts! used not in (go ...) block"));
}));

(cljs.core.async.alts_BANG_.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(cljs.core.async.alts_BANG_.cljs$lang$applyTo = (function (seq12976){
var G__12977 = cljs.core.first(seq12976);
var seq12976__$1 = cljs.core.next(seq12976);
var self__5734__auto__ = this;
return self__5734__auto__.cljs$core$IFn$_invoke$arity$variadic(G__12977,seq12976__$1);
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
var G__12988 = arguments.length;
switch (G__12988) {
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
var c__12782__auto___15352 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__12783__auto__ = (function (){var switch__12182__auto__ = (function (state_13018){
var state_val_13019 = (state_13018[(1)]);
if((state_val_13019 === (7))){
var inst_13014 = (state_13018[(2)]);
var state_13018__$1 = state_13018;
var statearr_13021_15353 = state_13018__$1;
(statearr_13021_15353[(2)] = inst_13014);

(statearr_13021_15353[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13019 === (1))){
var state_13018__$1 = state_13018;
var statearr_13022_15354 = state_13018__$1;
(statearr_13022_15354[(2)] = null);

(statearr_13022_15354[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13019 === (4))){
var inst_12997 = (state_13018[(7)]);
var inst_12997__$1 = (state_13018[(2)]);
var inst_12998 = (inst_12997__$1 == null);
var state_13018__$1 = (function (){var statearr_13024 = state_13018;
(statearr_13024[(7)] = inst_12997__$1);

return statearr_13024;
})();
if(cljs.core.truth_(inst_12998)){
var statearr_13025_15355 = state_13018__$1;
(statearr_13025_15355[(1)] = (5));

} else {
var statearr_13026_15356 = state_13018__$1;
(statearr_13026_15356[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13019 === (13))){
var state_13018__$1 = state_13018;
var statearr_13027_15357 = state_13018__$1;
(statearr_13027_15357[(2)] = null);

(statearr_13027_15357[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13019 === (6))){
var inst_12997 = (state_13018[(7)]);
var state_13018__$1 = state_13018;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_13018__$1,(11),to,inst_12997);
} else {
if((state_val_13019 === (3))){
var inst_13016 = (state_13018[(2)]);
var state_13018__$1 = state_13018;
return cljs.core.async.impl.ioc_helpers.return_chan(state_13018__$1,inst_13016);
} else {
if((state_val_13019 === (12))){
var state_13018__$1 = state_13018;
var statearr_13032_15358 = state_13018__$1;
(statearr_13032_15358[(2)] = null);

(statearr_13032_15358[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13019 === (2))){
var state_13018__$1 = state_13018;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_13018__$1,(4),from);
} else {
if((state_val_13019 === (11))){
var inst_13007 = (state_13018[(2)]);
var state_13018__$1 = state_13018;
if(cljs.core.truth_(inst_13007)){
var statearr_13034_15359 = state_13018__$1;
(statearr_13034_15359[(1)] = (12));

} else {
var statearr_13035_15360 = state_13018__$1;
(statearr_13035_15360[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13019 === (9))){
var state_13018__$1 = state_13018;
var statearr_13036_15361 = state_13018__$1;
(statearr_13036_15361[(2)] = null);

(statearr_13036_15361[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13019 === (5))){
var state_13018__$1 = state_13018;
if(cljs.core.truth_(close_QMARK_)){
var statearr_13037_15362 = state_13018__$1;
(statearr_13037_15362[(1)] = (8));

} else {
var statearr_13038_15363 = state_13018__$1;
(statearr_13038_15363[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13019 === (14))){
var inst_13012 = (state_13018[(2)]);
var state_13018__$1 = state_13018;
var statearr_13039_15364 = state_13018__$1;
(statearr_13039_15364[(2)] = inst_13012);

(statearr_13039_15364[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13019 === (10))){
var inst_13004 = (state_13018[(2)]);
var state_13018__$1 = state_13018;
var statearr_13040_15365 = state_13018__$1;
(statearr_13040_15365[(2)] = inst_13004);

(statearr_13040_15365[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13019 === (8))){
var inst_13001 = cljs.core.async.close_BANG_(to);
var state_13018__$1 = state_13018;
var statearr_13042_15366 = state_13018__$1;
(statearr_13042_15366[(2)] = inst_13001);

(statearr_13042_15366[(1)] = (10));


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
var cljs$core$async$state_machine__12183__auto__ = null;
var cljs$core$async$state_machine__12183__auto____0 = (function (){
var statearr_13044 = [null,null,null,null,null,null,null,null];
(statearr_13044[(0)] = cljs$core$async$state_machine__12183__auto__);

(statearr_13044[(1)] = (1));

return statearr_13044;
});
var cljs$core$async$state_machine__12183__auto____1 = (function (state_13018){
while(true){
var ret_value__12184__auto__ = (function (){try{while(true){
var result__12185__auto__ = switch__12182__auto__(state_13018);
if(cljs.core.keyword_identical_QMARK_(result__12185__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__12185__auto__;
}
break;
}
}catch (e13045){var ex__12186__auto__ = e13045;
var statearr_13046_15371 = state_13018;
(statearr_13046_15371[(2)] = ex__12186__auto__);


if(cljs.core.seq((state_13018[(4)]))){
var statearr_13047_15372 = state_13018;
(statearr_13047_15372[(1)] = cljs.core.first((state_13018[(4)])));

} else {
throw ex__12186__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__12184__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__15376 = state_13018;
state_13018 = G__15376;
continue;
} else {
return ret_value__12184__auto__;
}
break;
}
});
cljs$core$async$state_machine__12183__auto__ = function(state_13018){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__12183__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__12183__auto____1.call(this,state_13018);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__12183__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__12183__auto____0;
cljs$core$async$state_machine__12183__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__12183__auto____1;
return cljs$core$async$state_machine__12183__auto__;
})()
})();
var state__12784__auto__ = (function (){var statearr_13053 = f__12783__auto__();
(statearr_13053[(6)] = c__12782__auto___15352);

return statearr_13053;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__12784__auto__);
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
var process__$1 = (function (p__13060){
var vec__13061 = p__13060;
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13061,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13061,(1),null);
var job = vec__13061;
if((job == null)){
cljs.core.async.close_BANG_(results);

return null;
} else {
var res = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3((1),xf,ex_handler);
var c__12782__auto___15379 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__12783__auto__ = (function (){var switch__12182__auto__ = (function (state_13069){
var state_val_13070 = (state_13069[(1)]);
if((state_val_13070 === (1))){
var state_13069__$1 = state_13069;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_13069__$1,(2),res,v);
} else {
if((state_val_13070 === (2))){
var inst_13066 = (state_13069[(2)]);
var inst_13067 = cljs.core.async.close_BANG_(res);
var state_13069__$1 = (function (){var statearr_13071 = state_13069;
(statearr_13071[(7)] = inst_13066);

return statearr_13071;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_13069__$1,inst_13067);
} else {
return null;
}
}
});
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__12183__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__12183__auto____0 = (function (){
var statearr_13072 = [null,null,null,null,null,null,null,null];
(statearr_13072[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__12183__auto__);

(statearr_13072[(1)] = (1));

return statearr_13072;
});
var cljs$core$async$pipeline_STAR__$_state_machine__12183__auto____1 = (function (state_13069){
while(true){
var ret_value__12184__auto__ = (function (){try{while(true){
var result__12185__auto__ = switch__12182__auto__(state_13069);
if(cljs.core.keyword_identical_QMARK_(result__12185__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__12185__auto__;
}
break;
}
}catch (e13073){var ex__12186__auto__ = e13073;
var statearr_13074_15381 = state_13069;
(statearr_13074_15381[(2)] = ex__12186__auto__);


if(cljs.core.seq((state_13069[(4)]))){
var statearr_13076_15382 = state_13069;
(statearr_13076_15382[(1)] = cljs.core.first((state_13069[(4)])));

} else {
throw ex__12186__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__12184__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__15383 = state_13069;
state_13069 = G__15383;
continue;
} else {
return ret_value__12184__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__12183__auto__ = function(state_13069){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__12183__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__12183__auto____1.call(this,state_13069);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__12183__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__12183__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__12183__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__12183__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__12183__auto__;
})()
})();
var state__12784__auto__ = (function (){var statearr_13078 = f__12783__auto__();
(statearr_13078[(6)] = c__12782__auto___15379);

return statearr_13078;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__12784__auto__);
}));


cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(p,res);

return true;
}
});
var async = (function (p__13082){
var vec__13083 = p__13082;
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13083,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13083,(1),null);
var job = vec__13083;
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
var n__5616__auto___15388 = n;
var __15389 = (0);
while(true){
if((__15389 < n__5616__auto___15388)){
var G__13086_15390 = type;
var G__13086_15391__$1 = (((G__13086_15390 instanceof cljs.core.Keyword))?G__13086_15390.fqn:null);
switch (G__13086_15391__$1) {
case "compute":
var c__12782__auto___15394 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (__15389,c__12782__auto___15394,G__13086_15390,G__13086_15391__$1,n__5616__auto___15388,jobs,results,process__$1,async){
return (function (){
var f__12783__auto__ = (function (){var switch__12182__auto__ = ((function (__15389,c__12782__auto___15394,G__13086_15390,G__13086_15391__$1,n__5616__auto___15388,jobs,results,process__$1,async){
return (function (state_13100){
var state_val_13102 = (state_13100[(1)]);
if((state_val_13102 === (1))){
var state_13100__$1 = state_13100;
var statearr_13103_15397 = state_13100__$1;
(statearr_13103_15397[(2)] = null);

(statearr_13103_15397[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13102 === (2))){
var state_13100__$1 = state_13100;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_13100__$1,(4),jobs);
} else {
if((state_val_13102 === (3))){
var inst_13098 = (state_13100[(2)]);
var state_13100__$1 = state_13100;
return cljs.core.async.impl.ioc_helpers.return_chan(state_13100__$1,inst_13098);
} else {
if((state_val_13102 === (4))){
var inst_13090 = (state_13100[(2)]);
var inst_13091 = process__$1(inst_13090);
var state_13100__$1 = state_13100;
if(cljs.core.truth_(inst_13091)){
var statearr_13109_15398 = state_13100__$1;
(statearr_13109_15398[(1)] = (5));

} else {
var statearr_13111_15399 = state_13100__$1;
(statearr_13111_15399[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13102 === (5))){
var state_13100__$1 = state_13100;
var statearr_13112_15402 = state_13100__$1;
(statearr_13112_15402[(2)] = null);

(statearr_13112_15402[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13102 === (6))){
var state_13100__$1 = state_13100;
var statearr_13113_15407 = state_13100__$1;
(statearr_13113_15407[(2)] = null);

(statearr_13113_15407[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13102 === (7))){
var inst_13096 = (state_13100[(2)]);
var state_13100__$1 = state_13100;
var statearr_13115_15408 = state_13100__$1;
(statearr_13115_15408[(2)] = inst_13096);

(statearr_13115_15408[(1)] = (3));


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
});})(__15389,c__12782__auto___15394,G__13086_15390,G__13086_15391__$1,n__5616__auto___15388,jobs,results,process__$1,async))
;
return ((function (__15389,switch__12182__auto__,c__12782__auto___15394,G__13086_15390,G__13086_15391__$1,n__5616__auto___15388,jobs,results,process__$1,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__12183__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__12183__auto____0 = (function (){
var statearr_13120 = [null,null,null,null,null,null,null];
(statearr_13120[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__12183__auto__);

(statearr_13120[(1)] = (1));

return statearr_13120;
});
var cljs$core$async$pipeline_STAR__$_state_machine__12183__auto____1 = (function (state_13100){
while(true){
var ret_value__12184__auto__ = (function (){try{while(true){
var result__12185__auto__ = switch__12182__auto__(state_13100);
if(cljs.core.keyword_identical_QMARK_(result__12185__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__12185__auto__;
}
break;
}
}catch (e13121){var ex__12186__auto__ = e13121;
var statearr_13122_15409 = state_13100;
(statearr_13122_15409[(2)] = ex__12186__auto__);


if(cljs.core.seq((state_13100[(4)]))){
var statearr_13123_15413 = state_13100;
(statearr_13123_15413[(1)] = cljs.core.first((state_13100[(4)])));

} else {
throw ex__12186__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__12184__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__15414 = state_13100;
state_13100 = G__15414;
continue;
} else {
return ret_value__12184__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__12183__auto__ = function(state_13100){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__12183__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__12183__auto____1.call(this,state_13100);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__12183__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__12183__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__12183__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__12183__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__12183__auto__;
})()
;})(__15389,switch__12182__auto__,c__12782__auto___15394,G__13086_15390,G__13086_15391__$1,n__5616__auto___15388,jobs,results,process__$1,async))
})();
var state__12784__auto__ = (function (){var statearr_13125 = f__12783__auto__();
(statearr_13125[(6)] = c__12782__auto___15394);

return statearr_13125;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__12784__auto__);
});})(__15389,c__12782__auto___15394,G__13086_15390,G__13086_15391__$1,n__5616__auto___15388,jobs,results,process__$1,async))
);


break;
case "async":
var c__12782__auto___15415 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (__15389,c__12782__auto___15415,G__13086_15390,G__13086_15391__$1,n__5616__auto___15388,jobs,results,process__$1,async){
return (function (){
var f__12783__auto__ = (function (){var switch__12182__auto__ = ((function (__15389,c__12782__auto___15415,G__13086_15390,G__13086_15391__$1,n__5616__auto___15388,jobs,results,process__$1,async){
return (function (state_13138){
var state_val_13139 = (state_13138[(1)]);
if((state_val_13139 === (1))){
var state_13138__$1 = state_13138;
var statearr_13140_15416 = state_13138__$1;
(statearr_13140_15416[(2)] = null);

(statearr_13140_15416[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13139 === (2))){
var state_13138__$1 = state_13138;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_13138__$1,(4),jobs);
} else {
if((state_val_13139 === (3))){
var inst_13136 = (state_13138[(2)]);
var state_13138__$1 = state_13138;
return cljs.core.async.impl.ioc_helpers.return_chan(state_13138__$1,inst_13136);
} else {
if((state_val_13139 === (4))){
var inst_13128 = (state_13138[(2)]);
var inst_13129 = async(inst_13128);
var state_13138__$1 = state_13138;
if(cljs.core.truth_(inst_13129)){
var statearr_13146_15417 = state_13138__$1;
(statearr_13146_15417[(1)] = (5));

} else {
var statearr_13148_15418 = state_13138__$1;
(statearr_13148_15418[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13139 === (5))){
var state_13138__$1 = state_13138;
var statearr_13149_15419 = state_13138__$1;
(statearr_13149_15419[(2)] = null);

(statearr_13149_15419[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13139 === (6))){
var state_13138__$1 = state_13138;
var statearr_13150_15420 = state_13138__$1;
(statearr_13150_15420[(2)] = null);

(statearr_13150_15420[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13139 === (7))){
var inst_13134 = (state_13138[(2)]);
var state_13138__$1 = state_13138;
var statearr_13151_15421 = state_13138__$1;
(statearr_13151_15421[(2)] = inst_13134);

(statearr_13151_15421[(1)] = (3));


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
});})(__15389,c__12782__auto___15415,G__13086_15390,G__13086_15391__$1,n__5616__auto___15388,jobs,results,process__$1,async))
;
return ((function (__15389,switch__12182__auto__,c__12782__auto___15415,G__13086_15390,G__13086_15391__$1,n__5616__auto___15388,jobs,results,process__$1,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__12183__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__12183__auto____0 = (function (){
var statearr_13154 = [null,null,null,null,null,null,null];
(statearr_13154[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__12183__auto__);

(statearr_13154[(1)] = (1));

return statearr_13154;
});
var cljs$core$async$pipeline_STAR__$_state_machine__12183__auto____1 = (function (state_13138){
while(true){
var ret_value__12184__auto__ = (function (){try{while(true){
var result__12185__auto__ = switch__12182__auto__(state_13138);
if(cljs.core.keyword_identical_QMARK_(result__12185__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__12185__auto__;
}
break;
}
}catch (e13159){var ex__12186__auto__ = e13159;
var statearr_13160_15426 = state_13138;
(statearr_13160_15426[(2)] = ex__12186__auto__);


if(cljs.core.seq((state_13138[(4)]))){
var statearr_13162_15427 = state_13138;
(statearr_13162_15427[(1)] = cljs.core.first((state_13138[(4)])));

} else {
throw ex__12186__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__12184__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__15428 = state_13138;
state_13138 = G__15428;
continue;
} else {
return ret_value__12184__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__12183__auto__ = function(state_13138){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__12183__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__12183__auto____1.call(this,state_13138);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__12183__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__12183__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__12183__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__12183__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__12183__auto__;
})()
;})(__15389,switch__12182__auto__,c__12782__auto___15415,G__13086_15390,G__13086_15391__$1,n__5616__auto___15388,jobs,results,process__$1,async))
})();
var state__12784__auto__ = (function (){var statearr_13163 = f__12783__auto__();
(statearr_13163[(6)] = c__12782__auto___15415);

return statearr_13163;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__12784__auto__);
});})(__15389,c__12782__auto___15415,G__13086_15390,G__13086_15391__$1,n__5616__auto___15388,jobs,results,process__$1,async))
);


break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__13086_15391__$1)].join('')));

}

var G__15429 = (__15389 + (1));
__15389 = G__15429;
continue;
} else {
}
break;
}

var c__12782__auto___15430 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__12783__auto__ = (function (){var switch__12182__auto__ = (function (state_13192){
var state_val_13193 = (state_13192[(1)]);
if((state_val_13193 === (7))){
var inst_13188 = (state_13192[(2)]);
var state_13192__$1 = state_13192;
var statearr_13194_15431 = state_13192__$1;
(statearr_13194_15431[(2)] = inst_13188);

(statearr_13194_15431[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13193 === (1))){
var state_13192__$1 = state_13192;
var statearr_13195_15432 = state_13192__$1;
(statearr_13195_15432[(2)] = null);

(statearr_13195_15432[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13193 === (4))){
var inst_13172 = (state_13192[(7)]);
var inst_13172__$1 = (state_13192[(2)]);
var inst_13173 = (inst_13172__$1 == null);
var state_13192__$1 = (function (){var statearr_13196 = state_13192;
(statearr_13196[(7)] = inst_13172__$1);

return statearr_13196;
})();
if(cljs.core.truth_(inst_13173)){
var statearr_13198_15433 = state_13192__$1;
(statearr_13198_15433[(1)] = (5));

} else {
var statearr_13200_15434 = state_13192__$1;
(statearr_13200_15434[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13193 === (6))){
var inst_13172 = (state_13192[(7)]);
var inst_13177 = (state_13192[(8)]);
var inst_13177__$1 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
var inst_13178 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_13180 = [inst_13172,inst_13177__$1];
var inst_13181 = (new cljs.core.PersistentVector(null,2,(5),inst_13178,inst_13180,null));
var state_13192__$1 = (function (){var statearr_13204 = state_13192;
(statearr_13204[(8)] = inst_13177__$1);

return statearr_13204;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_13192__$1,(8),jobs,inst_13181);
} else {
if((state_val_13193 === (3))){
var inst_13190 = (state_13192[(2)]);
var state_13192__$1 = state_13192;
return cljs.core.async.impl.ioc_helpers.return_chan(state_13192__$1,inst_13190);
} else {
if((state_val_13193 === (2))){
var state_13192__$1 = state_13192;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_13192__$1,(4),from);
} else {
if((state_val_13193 === (9))){
var inst_13185 = (state_13192[(2)]);
var state_13192__$1 = (function (){var statearr_13205 = state_13192;
(statearr_13205[(9)] = inst_13185);

return statearr_13205;
})();
var statearr_13206_15447 = state_13192__$1;
(statearr_13206_15447[(2)] = null);

(statearr_13206_15447[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13193 === (5))){
var inst_13175 = cljs.core.async.close_BANG_(jobs);
var state_13192__$1 = state_13192;
var statearr_13208_15448 = state_13192__$1;
(statearr_13208_15448[(2)] = inst_13175);

(statearr_13208_15448[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13193 === (8))){
var inst_13177 = (state_13192[(8)]);
var inst_13183 = (state_13192[(2)]);
var state_13192__$1 = (function (){var statearr_13209 = state_13192;
(statearr_13209[(10)] = inst_13183);

return statearr_13209;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_13192__$1,(9),results,inst_13177);
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
var cljs$core$async$pipeline_STAR__$_state_machine__12183__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__12183__auto____0 = (function (){
var statearr_13211 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_13211[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__12183__auto__);

(statearr_13211[(1)] = (1));

return statearr_13211;
});
var cljs$core$async$pipeline_STAR__$_state_machine__12183__auto____1 = (function (state_13192){
while(true){
var ret_value__12184__auto__ = (function (){try{while(true){
var result__12185__auto__ = switch__12182__auto__(state_13192);
if(cljs.core.keyword_identical_QMARK_(result__12185__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__12185__auto__;
}
break;
}
}catch (e13212){var ex__12186__auto__ = e13212;
var statearr_13214_15455 = state_13192;
(statearr_13214_15455[(2)] = ex__12186__auto__);


if(cljs.core.seq((state_13192[(4)]))){
var statearr_13215_15456 = state_13192;
(statearr_13215_15456[(1)] = cljs.core.first((state_13192[(4)])));

} else {
throw ex__12186__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__12184__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__15457 = state_13192;
state_13192 = G__15457;
continue;
} else {
return ret_value__12184__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__12183__auto__ = function(state_13192){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__12183__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__12183__auto____1.call(this,state_13192);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__12183__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__12183__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__12183__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__12183__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__12183__auto__;
})()
})();
var state__12784__auto__ = (function (){var statearr_13220 = f__12783__auto__();
(statearr_13220[(6)] = c__12782__auto___15430);

return statearr_13220;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__12784__auto__);
}));


var c__12782__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__12783__auto__ = (function (){var switch__12182__auto__ = (function (state_13261){
var state_val_13262 = (state_13261[(1)]);
if((state_val_13262 === (7))){
var inst_13257 = (state_13261[(2)]);
var state_13261__$1 = state_13261;
var statearr_13268_15458 = state_13261__$1;
(statearr_13268_15458[(2)] = inst_13257);

(statearr_13268_15458[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13262 === (20))){
var state_13261__$1 = state_13261;
var statearr_13269_15459 = state_13261__$1;
(statearr_13269_15459[(2)] = null);

(statearr_13269_15459[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13262 === (1))){
var state_13261__$1 = state_13261;
var statearr_13270_15460 = state_13261__$1;
(statearr_13270_15460[(2)] = null);

(statearr_13270_15460[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13262 === (4))){
var inst_13225 = (state_13261[(7)]);
var inst_13225__$1 = (state_13261[(2)]);
var inst_13226 = (inst_13225__$1 == null);
var state_13261__$1 = (function (){var statearr_13272 = state_13261;
(statearr_13272[(7)] = inst_13225__$1);

return statearr_13272;
})();
if(cljs.core.truth_(inst_13226)){
var statearr_13273_15461 = state_13261__$1;
(statearr_13273_15461[(1)] = (5));

} else {
var statearr_13274_15462 = state_13261__$1;
(statearr_13274_15462[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13262 === (15))){
var inst_13238 = (state_13261[(8)]);
var state_13261__$1 = state_13261;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_13261__$1,(18),to,inst_13238);
} else {
if((state_val_13262 === (21))){
var inst_13252 = (state_13261[(2)]);
var state_13261__$1 = state_13261;
var statearr_13275_15464 = state_13261__$1;
(statearr_13275_15464[(2)] = inst_13252);

(statearr_13275_15464[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13262 === (13))){
var inst_13254 = (state_13261[(2)]);
var state_13261__$1 = (function (){var statearr_13276 = state_13261;
(statearr_13276[(9)] = inst_13254);

return statearr_13276;
})();
var statearr_13277_15465 = state_13261__$1;
(statearr_13277_15465[(2)] = null);

(statearr_13277_15465[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13262 === (6))){
var inst_13225 = (state_13261[(7)]);
var state_13261__$1 = state_13261;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_13261__$1,(11),inst_13225);
} else {
if((state_val_13262 === (17))){
var inst_13247 = (state_13261[(2)]);
var state_13261__$1 = state_13261;
if(cljs.core.truth_(inst_13247)){
var statearr_13279_15472 = state_13261__$1;
(statearr_13279_15472[(1)] = (19));

} else {
var statearr_13280_15473 = state_13261__$1;
(statearr_13280_15473[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13262 === (3))){
var inst_13259 = (state_13261[(2)]);
var state_13261__$1 = state_13261;
return cljs.core.async.impl.ioc_helpers.return_chan(state_13261__$1,inst_13259);
} else {
if((state_val_13262 === (12))){
var inst_13235 = (state_13261[(10)]);
var state_13261__$1 = state_13261;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_13261__$1,(14),inst_13235);
} else {
if((state_val_13262 === (2))){
var state_13261__$1 = state_13261;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_13261__$1,(4),results);
} else {
if((state_val_13262 === (19))){
var state_13261__$1 = state_13261;
var statearr_13285_15474 = state_13261__$1;
(statearr_13285_15474[(2)] = null);

(statearr_13285_15474[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13262 === (11))){
var inst_13235 = (state_13261[(2)]);
var state_13261__$1 = (function (){var statearr_13286 = state_13261;
(statearr_13286[(10)] = inst_13235);

return statearr_13286;
})();
var statearr_13287_15475 = state_13261__$1;
(statearr_13287_15475[(2)] = null);

(statearr_13287_15475[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13262 === (9))){
var state_13261__$1 = state_13261;
var statearr_13289_15476 = state_13261__$1;
(statearr_13289_15476[(2)] = null);

(statearr_13289_15476[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13262 === (5))){
var state_13261__$1 = state_13261;
if(cljs.core.truth_(close_QMARK_)){
var statearr_13290_15477 = state_13261__$1;
(statearr_13290_15477[(1)] = (8));

} else {
var statearr_13291_15478 = state_13261__$1;
(statearr_13291_15478[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13262 === (14))){
var inst_13238 = (state_13261[(8)]);
var inst_13240 = (state_13261[(11)]);
var inst_13238__$1 = (state_13261[(2)]);
var inst_13239 = (inst_13238__$1 == null);
var inst_13240__$1 = cljs.core.not(inst_13239);
var state_13261__$1 = (function (){var statearr_13293 = state_13261;
(statearr_13293[(8)] = inst_13238__$1);

(statearr_13293[(11)] = inst_13240__$1);

return statearr_13293;
})();
if(inst_13240__$1){
var statearr_13294_15479 = state_13261__$1;
(statearr_13294_15479[(1)] = (15));

} else {
var statearr_13295_15480 = state_13261__$1;
(statearr_13295_15480[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13262 === (16))){
var inst_13240 = (state_13261[(11)]);
var state_13261__$1 = state_13261;
var statearr_13296_15481 = state_13261__$1;
(statearr_13296_15481[(2)] = inst_13240);

(statearr_13296_15481[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13262 === (10))){
var inst_13232 = (state_13261[(2)]);
var state_13261__$1 = state_13261;
var statearr_13301_15482 = state_13261__$1;
(statearr_13301_15482[(2)] = inst_13232);

(statearr_13301_15482[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13262 === (18))){
var inst_13244 = (state_13261[(2)]);
var state_13261__$1 = state_13261;
var statearr_13304_15484 = state_13261__$1;
(statearr_13304_15484[(2)] = inst_13244);

(statearr_13304_15484[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13262 === (8))){
var inst_13229 = cljs.core.async.close_BANG_(to);
var state_13261__$1 = state_13261;
var statearr_13305_15485 = state_13261__$1;
(statearr_13305_15485[(2)] = inst_13229);

(statearr_13305_15485[(1)] = (10));


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
var cljs$core$async$pipeline_STAR__$_state_machine__12183__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__12183__auto____0 = (function (){
var statearr_13307 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_13307[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__12183__auto__);

(statearr_13307[(1)] = (1));

return statearr_13307;
});
var cljs$core$async$pipeline_STAR__$_state_machine__12183__auto____1 = (function (state_13261){
while(true){
var ret_value__12184__auto__ = (function (){try{while(true){
var result__12185__auto__ = switch__12182__auto__(state_13261);
if(cljs.core.keyword_identical_QMARK_(result__12185__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__12185__auto__;
}
break;
}
}catch (e13312){var ex__12186__auto__ = e13312;
var statearr_13314_15486 = state_13261;
(statearr_13314_15486[(2)] = ex__12186__auto__);


if(cljs.core.seq((state_13261[(4)]))){
var statearr_13316_15487 = state_13261;
(statearr_13316_15487[(1)] = cljs.core.first((state_13261[(4)])));

} else {
throw ex__12186__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__12184__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__15488 = state_13261;
state_13261 = G__15488;
continue;
} else {
return ret_value__12184__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__12183__auto__ = function(state_13261){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__12183__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__12183__auto____1.call(this,state_13261);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__12183__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__12183__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__12183__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__12183__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__12183__auto__;
})()
})();
var state__12784__auto__ = (function (){var statearr_13317 = f__12783__auto__();
(statearr_13317[(6)] = c__12782__auto__);

return statearr_13317;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__12784__auto__);
}));

return c__12782__auto__;
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
var G__13319 = arguments.length;
switch (G__13319) {
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
var G__13324 = arguments.length;
switch (G__13324) {
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
var G__13329 = arguments.length;
switch (G__13329) {
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
var c__12782__auto___15495 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__12783__auto__ = (function (){var switch__12182__auto__ = (function (state_13357){
var state_val_13358 = (state_13357[(1)]);
if((state_val_13358 === (7))){
var inst_13353 = (state_13357[(2)]);
var state_13357__$1 = state_13357;
var statearr_13363_15496 = state_13357__$1;
(statearr_13363_15496[(2)] = inst_13353);

(statearr_13363_15496[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13358 === (1))){
var state_13357__$1 = state_13357;
var statearr_13364_15497 = state_13357__$1;
(statearr_13364_15497[(2)] = null);

(statearr_13364_15497[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13358 === (4))){
var inst_13333 = (state_13357[(7)]);
var inst_13333__$1 = (state_13357[(2)]);
var inst_13334 = (inst_13333__$1 == null);
var state_13357__$1 = (function (){var statearr_13365 = state_13357;
(statearr_13365[(7)] = inst_13333__$1);

return statearr_13365;
})();
if(cljs.core.truth_(inst_13334)){
var statearr_13366_15498 = state_13357__$1;
(statearr_13366_15498[(1)] = (5));

} else {
var statearr_13367_15499 = state_13357__$1;
(statearr_13367_15499[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13358 === (13))){
var state_13357__$1 = state_13357;
var statearr_13368_15500 = state_13357__$1;
(statearr_13368_15500[(2)] = null);

(statearr_13368_15500[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13358 === (6))){
var inst_13333 = (state_13357[(7)]);
var inst_13339 = (p.cljs$core$IFn$_invoke$arity$1 ? p.cljs$core$IFn$_invoke$arity$1(inst_13333) : p.call(null,inst_13333));
var state_13357__$1 = state_13357;
if(cljs.core.truth_(inst_13339)){
var statearr_13369_15501 = state_13357__$1;
(statearr_13369_15501[(1)] = (9));

} else {
var statearr_13370_15502 = state_13357__$1;
(statearr_13370_15502[(1)] = (10));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13358 === (3))){
var inst_13355 = (state_13357[(2)]);
var state_13357__$1 = state_13357;
return cljs.core.async.impl.ioc_helpers.return_chan(state_13357__$1,inst_13355);
} else {
if((state_val_13358 === (12))){
var state_13357__$1 = state_13357;
var statearr_13373_15508 = state_13357__$1;
(statearr_13373_15508[(2)] = null);

(statearr_13373_15508[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13358 === (2))){
var state_13357__$1 = state_13357;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_13357__$1,(4),ch);
} else {
if((state_val_13358 === (11))){
var inst_13333 = (state_13357[(7)]);
var inst_13343 = (state_13357[(2)]);
var state_13357__$1 = state_13357;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_13357__$1,(8),inst_13343,inst_13333);
} else {
if((state_val_13358 === (9))){
var state_13357__$1 = state_13357;
var statearr_13377_15509 = state_13357__$1;
(statearr_13377_15509[(2)] = tc);

(statearr_13377_15509[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13358 === (5))){
var inst_13336 = cljs.core.async.close_BANG_(tc);
var inst_13337 = cljs.core.async.close_BANG_(fc);
var state_13357__$1 = (function (){var statearr_13382 = state_13357;
(statearr_13382[(8)] = inst_13336);

return statearr_13382;
})();
var statearr_13386_15510 = state_13357__$1;
(statearr_13386_15510[(2)] = inst_13337);

(statearr_13386_15510[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13358 === (14))){
var inst_13351 = (state_13357[(2)]);
var state_13357__$1 = state_13357;
var statearr_13387_15516 = state_13357__$1;
(statearr_13387_15516[(2)] = inst_13351);

(statearr_13387_15516[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13358 === (10))){
var state_13357__$1 = state_13357;
var statearr_13388_15517 = state_13357__$1;
(statearr_13388_15517[(2)] = fc);

(statearr_13388_15517[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13358 === (8))){
var inst_13345 = (state_13357[(2)]);
var state_13357__$1 = state_13357;
if(cljs.core.truth_(inst_13345)){
var statearr_13389_15518 = state_13357__$1;
(statearr_13389_15518[(1)] = (12));

} else {
var statearr_13390_15520 = state_13357__$1;
(statearr_13390_15520[(1)] = (13));

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
var cljs$core$async$state_machine__12183__auto__ = null;
var cljs$core$async$state_machine__12183__auto____0 = (function (){
var statearr_13392 = [null,null,null,null,null,null,null,null,null];
(statearr_13392[(0)] = cljs$core$async$state_machine__12183__auto__);

(statearr_13392[(1)] = (1));

return statearr_13392;
});
var cljs$core$async$state_machine__12183__auto____1 = (function (state_13357){
while(true){
var ret_value__12184__auto__ = (function (){try{while(true){
var result__12185__auto__ = switch__12182__auto__(state_13357);
if(cljs.core.keyword_identical_QMARK_(result__12185__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__12185__auto__;
}
break;
}
}catch (e13395){var ex__12186__auto__ = e13395;
var statearr_13397_15521 = state_13357;
(statearr_13397_15521[(2)] = ex__12186__auto__);


if(cljs.core.seq((state_13357[(4)]))){
var statearr_13398_15522 = state_13357;
(statearr_13398_15522[(1)] = cljs.core.first((state_13357[(4)])));

} else {
throw ex__12186__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__12184__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__15523 = state_13357;
state_13357 = G__15523;
continue;
} else {
return ret_value__12184__auto__;
}
break;
}
});
cljs$core$async$state_machine__12183__auto__ = function(state_13357){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__12183__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__12183__auto____1.call(this,state_13357);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__12183__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__12183__auto____0;
cljs$core$async$state_machine__12183__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__12183__auto____1;
return cljs$core$async$state_machine__12183__auto__;
})()
})();
var state__12784__auto__ = (function (){var statearr_13402 = f__12783__auto__();
(statearr_13402[(6)] = c__12782__auto___15495);

return statearr_13402;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__12784__auto__);
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
var c__12782__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__12783__auto__ = (function (){var switch__12182__auto__ = (function (state_13437){
var state_val_13438 = (state_13437[(1)]);
if((state_val_13438 === (7))){
var inst_13430 = (state_13437[(2)]);
var state_13437__$1 = state_13437;
var statearr_13442_15524 = state_13437__$1;
(statearr_13442_15524[(2)] = inst_13430);

(statearr_13442_15524[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13438 === (1))){
var inst_13412 = init;
var inst_13413 = inst_13412;
var state_13437__$1 = (function (){var statearr_13444 = state_13437;
(statearr_13444[(7)] = inst_13413);

return statearr_13444;
})();
var statearr_13446_15526 = state_13437__$1;
(statearr_13446_15526[(2)] = null);

(statearr_13446_15526[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13438 === (4))){
var inst_13416 = (state_13437[(8)]);
var inst_13416__$1 = (state_13437[(2)]);
var inst_13418 = (inst_13416__$1 == null);
var state_13437__$1 = (function (){var statearr_13450 = state_13437;
(statearr_13450[(8)] = inst_13416__$1);

return statearr_13450;
})();
if(cljs.core.truth_(inst_13418)){
var statearr_13451_15528 = state_13437__$1;
(statearr_13451_15528[(1)] = (5));

} else {
var statearr_13452_15529 = state_13437__$1;
(statearr_13452_15529[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13438 === (6))){
var inst_13413 = (state_13437[(7)]);
var inst_13416 = (state_13437[(8)]);
var inst_13421 = (state_13437[(9)]);
var inst_13421__$1 = (f.cljs$core$IFn$_invoke$arity$2 ? f.cljs$core$IFn$_invoke$arity$2(inst_13413,inst_13416) : f.call(null,inst_13413,inst_13416));
var inst_13422 = cljs.core.reduced_QMARK_(inst_13421__$1);
var state_13437__$1 = (function (){var statearr_13454 = state_13437;
(statearr_13454[(9)] = inst_13421__$1);

return statearr_13454;
})();
if(inst_13422){
var statearr_13458_15531 = state_13437__$1;
(statearr_13458_15531[(1)] = (8));

} else {
var statearr_13459_15532 = state_13437__$1;
(statearr_13459_15532[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13438 === (3))){
var inst_13433 = (state_13437[(2)]);
var state_13437__$1 = state_13437;
return cljs.core.async.impl.ioc_helpers.return_chan(state_13437__$1,inst_13433);
} else {
if((state_val_13438 === (2))){
var state_13437__$1 = state_13437;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_13437__$1,(4),ch);
} else {
if((state_val_13438 === (9))){
var inst_13421 = (state_13437[(9)]);
var inst_13413 = inst_13421;
var state_13437__$1 = (function (){var statearr_13464 = state_13437;
(statearr_13464[(7)] = inst_13413);

return statearr_13464;
})();
var statearr_13465_15536 = state_13437__$1;
(statearr_13465_15536[(2)] = null);

(statearr_13465_15536[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13438 === (5))){
var inst_13413 = (state_13437[(7)]);
var state_13437__$1 = state_13437;
var statearr_13468_15537 = state_13437__$1;
(statearr_13468_15537[(2)] = inst_13413);

(statearr_13468_15537[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13438 === (10))){
var inst_13428 = (state_13437[(2)]);
var state_13437__$1 = state_13437;
var statearr_13472_15539 = state_13437__$1;
(statearr_13472_15539[(2)] = inst_13428);

(statearr_13472_15539[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13438 === (8))){
var inst_13421 = (state_13437[(9)]);
var inst_13424 = cljs.core.deref(inst_13421);
var state_13437__$1 = state_13437;
var statearr_13473_15540 = state_13437__$1;
(statearr_13473_15540[(2)] = inst_13424);

(statearr_13473_15540[(1)] = (10));


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
var cljs$core$async$reduce_$_state_machine__12183__auto__ = null;
var cljs$core$async$reduce_$_state_machine__12183__auto____0 = (function (){
var statearr_13479 = [null,null,null,null,null,null,null,null,null,null];
(statearr_13479[(0)] = cljs$core$async$reduce_$_state_machine__12183__auto__);

(statearr_13479[(1)] = (1));

return statearr_13479;
});
var cljs$core$async$reduce_$_state_machine__12183__auto____1 = (function (state_13437){
while(true){
var ret_value__12184__auto__ = (function (){try{while(true){
var result__12185__auto__ = switch__12182__auto__(state_13437);
if(cljs.core.keyword_identical_QMARK_(result__12185__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__12185__auto__;
}
break;
}
}catch (e13480){var ex__12186__auto__ = e13480;
var statearr_13481_15541 = state_13437;
(statearr_13481_15541[(2)] = ex__12186__auto__);


if(cljs.core.seq((state_13437[(4)]))){
var statearr_13483_15542 = state_13437;
(statearr_13483_15542[(1)] = cljs.core.first((state_13437[(4)])));

} else {
throw ex__12186__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__12184__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__15544 = state_13437;
state_13437 = G__15544;
continue;
} else {
return ret_value__12184__auto__;
}
break;
}
});
cljs$core$async$reduce_$_state_machine__12183__auto__ = function(state_13437){
switch(arguments.length){
case 0:
return cljs$core$async$reduce_$_state_machine__12183__auto____0.call(this);
case 1:
return cljs$core$async$reduce_$_state_machine__12183__auto____1.call(this,state_13437);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$reduce_$_state_machine__12183__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$reduce_$_state_machine__12183__auto____0;
cljs$core$async$reduce_$_state_machine__12183__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$reduce_$_state_machine__12183__auto____1;
return cljs$core$async$reduce_$_state_machine__12183__auto__;
})()
})();
var state__12784__auto__ = (function (){var statearr_13488 = f__12783__auto__();
(statearr_13488[(6)] = c__12782__auto__);

return statearr_13488;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__12784__auto__);
}));

return c__12782__auto__;
});
/**
 * async/reduces a channel with a transformation (xform f).
 *   Returns a channel containing the result.  ch must close before
 *   transduce produces a result.
 */
cljs.core.async.transduce = (function cljs$core$async$transduce(xform,f,init,ch){
var f__$1 = (xform.cljs$core$IFn$_invoke$arity$1 ? xform.cljs$core$IFn$_invoke$arity$1(f) : xform.call(null,f));
var c__12782__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__12783__auto__ = (function (){var switch__12182__auto__ = (function (state_13499){
var state_val_13500 = (state_13499[(1)]);
if((state_val_13500 === (1))){
var inst_13493 = cljs.core.async.reduce(f__$1,init,ch);
var state_13499__$1 = state_13499;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_13499__$1,(2),inst_13493);
} else {
if((state_val_13500 === (2))){
var inst_13496 = (state_13499[(2)]);
var inst_13497 = (f__$1.cljs$core$IFn$_invoke$arity$1 ? f__$1.cljs$core$IFn$_invoke$arity$1(inst_13496) : f__$1.call(null,inst_13496));
var state_13499__$1 = state_13499;
return cljs.core.async.impl.ioc_helpers.return_chan(state_13499__$1,inst_13497);
} else {
return null;
}
}
});
return (function() {
var cljs$core$async$transduce_$_state_machine__12183__auto__ = null;
var cljs$core$async$transduce_$_state_machine__12183__auto____0 = (function (){
var statearr_13509 = [null,null,null,null,null,null,null];
(statearr_13509[(0)] = cljs$core$async$transduce_$_state_machine__12183__auto__);

(statearr_13509[(1)] = (1));

return statearr_13509;
});
var cljs$core$async$transduce_$_state_machine__12183__auto____1 = (function (state_13499){
while(true){
var ret_value__12184__auto__ = (function (){try{while(true){
var result__12185__auto__ = switch__12182__auto__(state_13499);
if(cljs.core.keyword_identical_QMARK_(result__12185__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__12185__auto__;
}
break;
}
}catch (e13510){var ex__12186__auto__ = e13510;
var statearr_13512_15553 = state_13499;
(statearr_13512_15553[(2)] = ex__12186__auto__);


if(cljs.core.seq((state_13499[(4)]))){
var statearr_13513_15554 = state_13499;
(statearr_13513_15554[(1)] = cljs.core.first((state_13499[(4)])));

} else {
throw ex__12186__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__12184__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__15555 = state_13499;
state_13499 = G__15555;
continue;
} else {
return ret_value__12184__auto__;
}
break;
}
});
cljs$core$async$transduce_$_state_machine__12183__auto__ = function(state_13499){
switch(arguments.length){
case 0:
return cljs$core$async$transduce_$_state_machine__12183__auto____0.call(this);
case 1:
return cljs$core$async$transduce_$_state_machine__12183__auto____1.call(this,state_13499);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$transduce_$_state_machine__12183__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$transduce_$_state_machine__12183__auto____0;
cljs$core$async$transduce_$_state_machine__12183__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$transduce_$_state_machine__12183__auto____1;
return cljs$core$async$transduce_$_state_machine__12183__auto__;
})()
})();
var state__12784__auto__ = (function (){var statearr_13521 = f__12783__auto__();
(statearr_13521[(6)] = c__12782__auto__);

return statearr_13521;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__12784__auto__);
}));

return c__12782__auto__;
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
var G__13527 = arguments.length;
switch (G__13527) {
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
var c__12782__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__12783__auto__ = (function (){var switch__12182__auto__ = (function (state_13563){
var state_val_13564 = (state_13563[(1)]);
if((state_val_13564 === (7))){
var inst_13544 = (state_13563[(2)]);
var state_13563__$1 = state_13563;
var statearr_13570_15559 = state_13563__$1;
(statearr_13570_15559[(2)] = inst_13544);

(statearr_13570_15559[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13564 === (1))){
var inst_13535 = cljs.core.seq(coll);
var inst_13536 = inst_13535;
var state_13563__$1 = (function (){var statearr_13573 = state_13563;
(statearr_13573[(7)] = inst_13536);

return statearr_13573;
})();
var statearr_13575_15560 = state_13563__$1;
(statearr_13575_15560[(2)] = null);

(statearr_13575_15560[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13564 === (4))){
var inst_13536 = (state_13563[(7)]);
var inst_13542 = cljs.core.first(inst_13536);
var state_13563__$1 = state_13563;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_13563__$1,(7),ch,inst_13542);
} else {
if((state_val_13564 === (13))){
var inst_13556 = (state_13563[(2)]);
var state_13563__$1 = state_13563;
var statearr_13580_15561 = state_13563__$1;
(statearr_13580_15561[(2)] = inst_13556);

(statearr_13580_15561[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13564 === (6))){
var inst_13547 = (state_13563[(2)]);
var state_13563__$1 = state_13563;
if(cljs.core.truth_(inst_13547)){
var statearr_13582_15562 = state_13563__$1;
(statearr_13582_15562[(1)] = (8));

} else {
var statearr_13584_15563 = state_13563__$1;
(statearr_13584_15563[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13564 === (3))){
var inst_13560 = (state_13563[(2)]);
var state_13563__$1 = state_13563;
return cljs.core.async.impl.ioc_helpers.return_chan(state_13563__$1,inst_13560);
} else {
if((state_val_13564 === (12))){
var state_13563__$1 = state_13563;
var statearr_13588_15565 = state_13563__$1;
(statearr_13588_15565[(2)] = null);

(statearr_13588_15565[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13564 === (2))){
var inst_13536 = (state_13563[(7)]);
var state_13563__$1 = state_13563;
if(cljs.core.truth_(inst_13536)){
var statearr_13590_15569 = state_13563__$1;
(statearr_13590_15569[(1)] = (4));

} else {
var statearr_13591_15570 = state_13563__$1;
(statearr_13591_15570[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13564 === (11))){
var inst_13553 = cljs.core.async.close_BANG_(ch);
var state_13563__$1 = state_13563;
var statearr_13597_15572 = state_13563__$1;
(statearr_13597_15572[(2)] = inst_13553);

(statearr_13597_15572[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13564 === (9))){
var state_13563__$1 = state_13563;
if(cljs.core.truth_(close_QMARK_)){
var statearr_13599_15573 = state_13563__$1;
(statearr_13599_15573[(1)] = (11));

} else {
var statearr_13600_15574 = state_13563__$1;
(statearr_13600_15574[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13564 === (5))){
var inst_13536 = (state_13563[(7)]);
var state_13563__$1 = state_13563;
var statearr_13604_15576 = state_13563__$1;
(statearr_13604_15576[(2)] = inst_13536);

(statearr_13604_15576[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13564 === (10))){
var inst_13558 = (state_13563[(2)]);
var state_13563__$1 = state_13563;
var statearr_13606_15577 = state_13563__$1;
(statearr_13606_15577[(2)] = inst_13558);

(statearr_13606_15577[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13564 === (8))){
var inst_13536 = (state_13563[(7)]);
var inst_13549 = cljs.core.next(inst_13536);
var inst_13536__$1 = inst_13549;
var state_13563__$1 = (function (){var statearr_13609 = state_13563;
(statearr_13609[(7)] = inst_13536__$1);

return statearr_13609;
})();
var statearr_13611_15578 = state_13563__$1;
(statearr_13611_15578[(2)] = null);

(statearr_13611_15578[(1)] = (2));


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
var cljs$core$async$state_machine__12183__auto__ = null;
var cljs$core$async$state_machine__12183__auto____0 = (function (){
var statearr_13614 = [null,null,null,null,null,null,null,null];
(statearr_13614[(0)] = cljs$core$async$state_machine__12183__auto__);

(statearr_13614[(1)] = (1));

return statearr_13614;
});
var cljs$core$async$state_machine__12183__auto____1 = (function (state_13563){
while(true){
var ret_value__12184__auto__ = (function (){try{while(true){
var result__12185__auto__ = switch__12182__auto__(state_13563);
if(cljs.core.keyword_identical_QMARK_(result__12185__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__12185__auto__;
}
break;
}
}catch (e13617){var ex__12186__auto__ = e13617;
var statearr_13619_15583 = state_13563;
(statearr_13619_15583[(2)] = ex__12186__auto__);


if(cljs.core.seq((state_13563[(4)]))){
var statearr_13620_15584 = state_13563;
(statearr_13620_15584[(1)] = cljs.core.first((state_13563[(4)])));

} else {
throw ex__12186__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__12184__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__15585 = state_13563;
state_13563 = G__15585;
continue;
} else {
return ret_value__12184__auto__;
}
break;
}
});
cljs$core$async$state_machine__12183__auto__ = function(state_13563){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__12183__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__12183__auto____1.call(this,state_13563);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__12183__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__12183__auto____0;
cljs$core$async$state_machine__12183__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__12183__auto____1;
return cljs$core$async$state_machine__12183__auto__;
})()
})();
var state__12784__auto__ = (function (){var statearr_13628 = f__12783__auto__();
(statearr_13628[(6)] = c__12782__auto__);

return statearr_13628;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__12784__auto__);
}));

return c__12782__auto__;
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
var G__13639 = arguments.length;
switch (G__13639) {
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

var cljs$core$async$Mux$muxch_STAR_$dyn_15590 = (function (_){
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
return cljs$core$async$Mux$muxch_STAR_$dyn_15590(_);
}
});


/**
 * @interface
 */
cljs.core.async.Mult = function(){};

var cljs$core$async$Mult$tap_STAR_$dyn_15591 = (function (m,ch,close_QMARK_){
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
return cljs$core$async$Mult$tap_STAR_$dyn_15591(m,ch,close_QMARK_);
}
});

var cljs$core$async$Mult$untap_STAR_$dyn_15592 = (function (m,ch){
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
return cljs$core$async$Mult$untap_STAR_$dyn_15592(m,ch);
}
});

var cljs$core$async$Mult$untap_all_STAR_$dyn_15600 = (function (m){
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
return cljs$core$async$Mult$untap_all_STAR_$dyn_15600(m);
}
});


/**
* @constructor
 * @implements {cljs.core.async.Mult}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async13728 = (function (ch,cs,meta13729){
this.ch = ch;
this.cs = cs;
this.meta13729 = meta13729;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async13728.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_13730,meta13729__$1){
var self__ = this;
var _13730__$1 = this;
return (new cljs.core.async.t_cljs$core$async13728(self__.ch,self__.cs,meta13729__$1));
}));

(cljs.core.async.t_cljs$core$async13728.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_13730){
var self__ = this;
var _13730__$1 = this;
return self__.meta13729;
}));

(cljs.core.async.t_cljs$core$async13728.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async13728.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
}));

(cljs.core.async.t_cljs$core$async13728.prototype.cljs$core$async$Mult$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async13728.prototype.cljs$core$async$Mult$tap_STAR_$arity$3 = (function (_,ch__$1,close_QMARK_){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(self__.cs,cljs.core.assoc,ch__$1,close_QMARK_);

return null;
}));

(cljs.core.async.t_cljs$core$async13728.prototype.cljs$core$async$Mult$untap_STAR_$arity$2 = (function (_,ch__$1){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.cs,cljs.core.dissoc,ch__$1);

return null;
}));

(cljs.core.async.t_cljs$core$async13728.prototype.cljs$core$async$Mult$untap_all_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_(self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return null;
}));

(cljs.core.async.t_cljs$core$async13728.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"meta13729","meta13729",-30426196,null)], null);
}));

(cljs.core.async.t_cljs$core$async13728.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async13728.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async13728");

(cljs.core.async.t_cljs$core$async13728.cljs$lang$ctorPrWriter = (function (this__5310__auto__,writer__5311__auto__,opt__5312__auto__){
return cljs.core._write(writer__5311__auto__,"cljs.core.async/t_cljs$core$async13728");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async13728.
 */
cljs.core.async.__GT_t_cljs$core$async13728 = (function cljs$core$async$__GT_t_cljs$core$async13728(ch,cs,meta13729){
return (new cljs.core.async.t_cljs$core$async13728(ch,cs,meta13729));
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
var m = (new cljs.core.async.t_cljs$core$async13728(ch,cs,cljs.core.PersistentArrayMap.EMPTY));
var dchan = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
var dctr = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var done = (function (_){
if((cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(dctr,cljs.core.dec) === (0))){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(dchan,true);
} else {
return null;
}
});
var c__12782__auto___15607 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__12783__auto__ = (function (){var switch__12182__auto__ = (function (state_13912){
var state_val_13913 = (state_13912[(1)]);
if((state_val_13913 === (7))){
var inst_13908 = (state_13912[(2)]);
var state_13912__$1 = state_13912;
var statearr_13922_15608 = state_13912__$1;
(statearr_13922_15608[(2)] = inst_13908);

(statearr_13922_15608[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13913 === (20))){
var inst_13805 = (state_13912[(7)]);
var inst_13817 = cljs.core.first(inst_13805);
var inst_13818 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_13817,(0),null);
var inst_13819 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_13817,(1),null);
var state_13912__$1 = (function (){var statearr_13927 = state_13912;
(statearr_13927[(8)] = inst_13818);

return statearr_13927;
})();
if(cljs.core.truth_(inst_13819)){
var statearr_13928_15609 = state_13912__$1;
(statearr_13928_15609[(1)] = (22));

} else {
var statearr_13932_15610 = state_13912__$1;
(statearr_13932_15610[(1)] = (23));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13913 === (27))){
var inst_13853 = (state_13912[(9)]);
var inst_13855 = (state_13912[(10)]);
var inst_13861 = (state_13912[(11)]);
var inst_13766 = (state_13912[(12)]);
var inst_13861__$1 = cljs.core._nth(inst_13853,inst_13855);
var inst_13862 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3(inst_13861__$1,inst_13766,done);
var state_13912__$1 = (function (){var statearr_13937 = state_13912;
(statearr_13937[(11)] = inst_13861__$1);

return statearr_13937;
})();
if(cljs.core.truth_(inst_13862)){
var statearr_13939_15611 = state_13912__$1;
(statearr_13939_15611[(1)] = (30));

} else {
var statearr_13940_15612 = state_13912__$1;
(statearr_13940_15612[(1)] = (31));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13913 === (1))){
var state_13912__$1 = state_13912;
var statearr_13941_15613 = state_13912__$1;
(statearr_13941_15613[(2)] = null);

(statearr_13941_15613[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13913 === (24))){
var inst_13805 = (state_13912[(7)]);
var inst_13824 = (state_13912[(2)]);
var inst_13825 = cljs.core.next(inst_13805);
var inst_13779 = inst_13825;
var inst_13780 = null;
var inst_13781 = (0);
var inst_13782 = (0);
var state_13912__$1 = (function (){var statearr_13942 = state_13912;
(statearr_13942[(13)] = inst_13824);

(statearr_13942[(14)] = inst_13779);

(statearr_13942[(15)] = inst_13780);

(statearr_13942[(16)] = inst_13781);

(statearr_13942[(17)] = inst_13782);

return statearr_13942;
})();
var statearr_13943_15617 = state_13912__$1;
(statearr_13943_15617[(2)] = null);

(statearr_13943_15617[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13913 === (39))){
var state_13912__$1 = state_13912;
var statearr_13951_15618 = state_13912__$1;
(statearr_13951_15618[(2)] = null);

(statearr_13951_15618[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13913 === (4))){
var inst_13766 = (state_13912[(12)]);
var inst_13766__$1 = (state_13912[(2)]);
var inst_13770 = (inst_13766__$1 == null);
var state_13912__$1 = (function (){var statearr_13953 = state_13912;
(statearr_13953[(12)] = inst_13766__$1);

return statearr_13953;
})();
if(cljs.core.truth_(inst_13770)){
var statearr_13954_15619 = state_13912__$1;
(statearr_13954_15619[(1)] = (5));

} else {
var statearr_13955_15620 = state_13912__$1;
(statearr_13955_15620[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13913 === (15))){
var inst_13782 = (state_13912[(17)]);
var inst_13779 = (state_13912[(14)]);
var inst_13780 = (state_13912[(15)]);
var inst_13781 = (state_13912[(16)]);
var inst_13800 = (state_13912[(2)]);
var inst_13801 = (inst_13782 + (1));
var tmp13948 = inst_13781;
var tmp13949 = inst_13779;
var tmp13950 = inst_13780;
var inst_13779__$1 = tmp13949;
var inst_13780__$1 = tmp13950;
var inst_13781__$1 = tmp13948;
var inst_13782__$1 = inst_13801;
var state_13912__$1 = (function (){var statearr_13956 = state_13912;
(statearr_13956[(18)] = inst_13800);

(statearr_13956[(14)] = inst_13779__$1);

(statearr_13956[(15)] = inst_13780__$1);

(statearr_13956[(16)] = inst_13781__$1);

(statearr_13956[(17)] = inst_13782__$1);

return statearr_13956;
})();
var statearr_13958_15625 = state_13912__$1;
(statearr_13958_15625[(2)] = null);

(statearr_13958_15625[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13913 === (21))){
var inst_13831 = (state_13912[(2)]);
var state_13912__$1 = state_13912;
var statearr_13963_15626 = state_13912__$1;
(statearr_13963_15626[(2)] = inst_13831);

(statearr_13963_15626[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13913 === (31))){
var inst_13861 = (state_13912[(11)]);
var inst_13865 = m.cljs$core$async$Mult$untap_STAR_$arity$2(null,inst_13861);
var state_13912__$1 = state_13912;
var statearr_13964_15630 = state_13912__$1;
(statearr_13964_15630[(2)] = inst_13865);

(statearr_13964_15630[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13913 === (32))){
var inst_13855 = (state_13912[(10)]);
var inst_13852 = (state_13912[(19)]);
var inst_13853 = (state_13912[(9)]);
var inst_13854 = (state_13912[(20)]);
var inst_13867 = (state_13912[(2)]);
var inst_13868 = (inst_13855 + (1));
var tmp13960 = inst_13853;
var tmp13961 = inst_13852;
var tmp13962 = inst_13854;
var inst_13852__$1 = tmp13961;
var inst_13853__$1 = tmp13960;
var inst_13854__$1 = tmp13962;
var inst_13855__$1 = inst_13868;
var state_13912__$1 = (function (){var statearr_13965 = state_13912;
(statearr_13965[(21)] = inst_13867);

(statearr_13965[(19)] = inst_13852__$1);

(statearr_13965[(9)] = inst_13853__$1);

(statearr_13965[(20)] = inst_13854__$1);

(statearr_13965[(10)] = inst_13855__$1);

return statearr_13965;
})();
var statearr_13966_15631 = state_13912__$1;
(statearr_13966_15631[(2)] = null);

(statearr_13966_15631[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13913 === (40))){
var inst_13880 = (state_13912[(22)]);
var inst_13885 = m.cljs$core$async$Mult$untap_STAR_$arity$2(null,inst_13880);
var state_13912__$1 = state_13912;
var statearr_13967_15635 = state_13912__$1;
(statearr_13967_15635[(2)] = inst_13885);

(statearr_13967_15635[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13913 === (33))){
var inst_13871 = (state_13912[(23)]);
var inst_13873 = cljs.core.chunked_seq_QMARK_(inst_13871);
var state_13912__$1 = state_13912;
if(inst_13873){
var statearr_13971_15636 = state_13912__$1;
(statearr_13971_15636[(1)] = (36));

} else {
var statearr_13972_15637 = state_13912__$1;
(statearr_13972_15637[(1)] = (37));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13913 === (13))){
var inst_13791 = (state_13912[(24)]);
var inst_13797 = cljs.core.async.close_BANG_(inst_13791);
var state_13912__$1 = state_13912;
var statearr_13973_15638 = state_13912__$1;
(statearr_13973_15638[(2)] = inst_13797);

(statearr_13973_15638[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13913 === (22))){
var inst_13818 = (state_13912[(8)]);
var inst_13821 = cljs.core.async.close_BANG_(inst_13818);
var state_13912__$1 = state_13912;
var statearr_13974_15639 = state_13912__$1;
(statearr_13974_15639[(2)] = inst_13821);

(statearr_13974_15639[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13913 === (36))){
var inst_13871 = (state_13912[(23)]);
var inst_13875 = cljs.core.chunk_first(inst_13871);
var inst_13876 = cljs.core.chunk_rest(inst_13871);
var inst_13877 = cljs.core.count(inst_13875);
var inst_13852 = inst_13876;
var inst_13853 = inst_13875;
var inst_13854 = inst_13877;
var inst_13855 = (0);
var state_13912__$1 = (function (){var statearr_13975 = state_13912;
(statearr_13975[(19)] = inst_13852);

(statearr_13975[(9)] = inst_13853);

(statearr_13975[(20)] = inst_13854);

(statearr_13975[(10)] = inst_13855);

return statearr_13975;
})();
var statearr_13976_15640 = state_13912__$1;
(statearr_13976_15640[(2)] = null);

(statearr_13976_15640[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13913 === (41))){
var inst_13871 = (state_13912[(23)]);
var inst_13887 = (state_13912[(2)]);
var inst_13888 = cljs.core.next(inst_13871);
var inst_13852 = inst_13888;
var inst_13853 = null;
var inst_13854 = (0);
var inst_13855 = (0);
var state_13912__$1 = (function (){var statearr_13977 = state_13912;
(statearr_13977[(25)] = inst_13887);

(statearr_13977[(19)] = inst_13852);

(statearr_13977[(9)] = inst_13853);

(statearr_13977[(20)] = inst_13854);

(statearr_13977[(10)] = inst_13855);

return statearr_13977;
})();
var statearr_13978_15641 = state_13912__$1;
(statearr_13978_15641[(2)] = null);

(statearr_13978_15641[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13913 === (43))){
var state_13912__$1 = state_13912;
var statearr_13982_15642 = state_13912__$1;
(statearr_13982_15642[(2)] = null);

(statearr_13982_15642[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13913 === (29))){
var inst_13896 = (state_13912[(2)]);
var state_13912__$1 = state_13912;
var statearr_13983_15643 = state_13912__$1;
(statearr_13983_15643[(2)] = inst_13896);

(statearr_13983_15643[(1)] = (26));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13913 === (44))){
var inst_13905 = (state_13912[(2)]);
var state_13912__$1 = (function (){var statearr_13984 = state_13912;
(statearr_13984[(26)] = inst_13905);

return statearr_13984;
})();
var statearr_13985_15644 = state_13912__$1;
(statearr_13985_15644[(2)] = null);

(statearr_13985_15644[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13913 === (6))){
var inst_13844 = (state_13912[(27)]);
var inst_13843 = cljs.core.deref(cs);
var inst_13844__$1 = cljs.core.keys(inst_13843);
var inst_13845 = cljs.core.count(inst_13844__$1);
var inst_13846 = cljs.core.reset_BANG_(dctr,inst_13845);
var inst_13851 = cljs.core.seq(inst_13844__$1);
var inst_13852 = inst_13851;
var inst_13853 = null;
var inst_13854 = (0);
var inst_13855 = (0);
var state_13912__$1 = (function (){var statearr_13989 = state_13912;
(statearr_13989[(27)] = inst_13844__$1);

(statearr_13989[(28)] = inst_13846);

(statearr_13989[(19)] = inst_13852);

(statearr_13989[(9)] = inst_13853);

(statearr_13989[(20)] = inst_13854);

(statearr_13989[(10)] = inst_13855);

return statearr_13989;
})();
var statearr_13990_15645 = state_13912__$1;
(statearr_13990_15645[(2)] = null);

(statearr_13990_15645[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13913 === (28))){
var inst_13852 = (state_13912[(19)]);
var inst_13871 = (state_13912[(23)]);
var inst_13871__$1 = cljs.core.seq(inst_13852);
var state_13912__$1 = (function (){var statearr_13991 = state_13912;
(statearr_13991[(23)] = inst_13871__$1);

return statearr_13991;
})();
if(inst_13871__$1){
var statearr_13992_15646 = state_13912__$1;
(statearr_13992_15646[(1)] = (33));

} else {
var statearr_13993_15647 = state_13912__$1;
(statearr_13993_15647[(1)] = (34));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13913 === (25))){
var inst_13855 = (state_13912[(10)]);
var inst_13854 = (state_13912[(20)]);
var inst_13858 = (inst_13855 < inst_13854);
var inst_13859 = inst_13858;
var state_13912__$1 = state_13912;
if(cljs.core.truth_(inst_13859)){
var statearr_13996_15648 = state_13912__$1;
(statearr_13996_15648[(1)] = (27));

} else {
var statearr_13997_15649 = state_13912__$1;
(statearr_13997_15649[(1)] = (28));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13913 === (34))){
var state_13912__$1 = state_13912;
var statearr_13998_15650 = state_13912__$1;
(statearr_13998_15650[(2)] = null);

(statearr_13998_15650[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13913 === (17))){
var state_13912__$1 = state_13912;
var statearr_13999_15651 = state_13912__$1;
(statearr_13999_15651[(2)] = null);

(statearr_13999_15651[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13913 === (3))){
var inst_13910 = (state_13912[(2)]);
var state_13912__$1 = state_13912;
return cljs.core.async.impl.ioc_helpers.return_chan(state_13912__$1,inst_13910);
} else {
if((state_val_13913 === (12))){
var inst_13836 = (state_13912[(2)]);
var state_13912__$1 = state_13912;
var statearr_14000_15652 = state_13912__$1;
(statearr_14000_15652[(2)] = inst_13836);

(statearr_14000_15652[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13913 === (2))){
var state_13912__$1 = state_13912;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_13912__$1,(4),ch);
} else {
if((state_val_13913 === (23))){
var state_13912__$1 = state_13912;
var statearr_14003_15653 = state_13912__$1;
(statearr_14003_15653[(2)] = null);

(statearr_14003_15653[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13913 === (35))){
var inst_13894 = (state_13912[(2)]);
var state_13912__$1 = state_13912;
var statearr_14004_15657 = state_13912__$1;
(statearr_14004_15657[(2)] = inst_13894);

(statearr_14004_15657[(1)] = (29));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13913 === (19))){
var inst_13805 = (state_13912[(7)]);
var inst_13809 = cljs.core.chunk_first(inst_13805);
var inst_13810 = cljs.core.chunk_rest(inst_13805);
var inst_13811 = cljs.core.count(inst_13809);
var inst_13779 = inst_13810;
var inst_13780 = inst_13809;
var inst_13781 = inst_13811;
var inst_13782 = (0);
var state_13912__$1 = (function (){var statearr_14007 = state_13912;
(statearr_14007[(14)] = inst_13779);

(statearr_14007[(15)] = inst_13780);

(statearr_14007[(16)] = inst_13781);

(statearr_14007[(17)] = inst_13782);

return statearr_14007;
})();
var statearr_14008_15658 = state_13912__$1;
(statearr_14008_15658[(2)] = null);

(statearr_14008_15658[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13913 === (11))){
var inst_13779 = (state_13912[(14)]);
var inst_13805 = (state_13912[(7)]);
var inst_13805__$1 = cljs.core.seq(inst_13779);
var state_13912__$1 = (function (){var statearr_14037 = state_13912;
(statearr_14037[(7)] = inst_13805__$1);

return statearr_14037;
})();
if(inst_13805__$1){
var statearr_14038_15659 = state_13912__$1;
(statearr_14038_15659[(1)] = (16));

} else {
var statearr_14039_15660 = state_13912__$1;
(statearr_14039_15660[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13913 === (9))){
var inst_13838 = (state_13912[(2)]);
var state_13912__$1 = state_13912;
var statearr_14041_15661 = state_13912__$1;
(statearr_14041_15661[(2)] = inst_13838);

(statearr_14041_15661[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13913 === (5))){
var inst_13777 = cljs.core.deref(cs);
var inst_13778 = cljs.core.seq(inst_13777);
var inst_13779 = inst_13778;
var inst_13780 = null;
var inst_13781 = (0);
var inst_13782 = (0);
var state_13912__$1 = (function (){var statearr_14043 = state_13912;
(statearr_14043[(14)] = inst_13779);

(statearr_14043[(15)] = inst_13780);

(statearr_14043[(16)] = inst_13781);

(statearr_14043[(17)] = inst_13782);

return statearr_14043;
})();
var statearr_14045_15666 = state_13912__$1;
(statearr_14045_15666[(2)] = null);

(statearr_14045_15666[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13913 === (14))){
var state_13912__$1 = state_13912;
var statearr_14048_15667 = state_13912__$1;
(statearr_14048_15667[(2)] = null);

(statearr_14048_15667[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13913 === (45))){
var inst_13902 = (state_13912[(2)]);
var state_13912__$1 = state_13912;
var statearr_14051_15668 = state_13912__$1;
(statearr_14051_15668[(2)] = inst_13902);

(statearr_14051_15668[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13913 === (26))){
var inst_13844 = (state_13912[(27)]);
var inst_13898 = (state_13912[(2)]);
var inst_13899 = cljs.core.seq(inst_13844);
var state_13912__$1 = (function (){var statearr_14057 = state_13912;
(statearr_14057[(29)] = inst_13898);

return statearr_14057;
})();
if(inst_13899){
var statearr_14058_15672 = state_13912__$1;
(statearr_14058_15672[(1)] = (42));

} else {
var statearr_14059_15673 = state_13912__$1;
(statearr_14059_15673[(1)] = (43));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13913 === (16))){
var inst_13805 = (state_13912[(7)]);
var inst_13807 = cljs.core.chunked_seq_QMARK_(inst_13805);
var state_13912__$1 = state_13912;
if(inst_13807){
var statearr_14060_15674 = state_13912__$1;
(statearr_14060_15674[(1)] = (19));

} else {
var statearr_14061_15675 = state_13912__$1;
(statearr_14061_15675[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13913 === (38))){
var inst_13891 = (state_13912[(2)]);
var state_13912__$1 = state_13912;
var statearr_14062_15676 = state_13912__$1;
(statearr_14062_15676[(2)] = inst_13891);

(statearr_14062_15676[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13913 === (30))){
var state_13912__$1 = state_13912;
var statearr_14077_15677 = state_13912__$1;
(statearr_14077_15677[(2)] = null);

(statearr_14077_15677[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13913 === (10))){
var inst_13780 = (state_13912[(15)]);
var inst_13782 = (state_13912[(17)]);
var inst_13790 = cljs.core._nth(inst_13780,inst_13782);
var inst_13791 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_13790,(0),null);
var inst_13792 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_13790,(1),null);
var state_13912__$1 = (function (){var statearr_14085 = state_13912;
(statearr_14085[(24)] = inst_13791);

return statearr_14085;
})();
if(cljs.core.truth_(inst_13792)){
var statearr_14086_15678 = state_13912__$1;
(statearr_14086_15678[(1)] = (13));

} else {
var statearr_14087_15679 = state_13912__$1;
(statearr_14087_15679[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13913 === (18))){
var inst_13834 = (state_13912[(2)]);
var state_13912__$1 = state_13912;
var statearr_14097_15680 = state_13912__$1;
(statearr_14097_15680[(2)] = inst_13834);

(statearr_14097_15680[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13913 === (42))){
var state_13912__$1 = state_13912;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_13912__$1,(45),dchan);
} else {
if((state_val_13913 === (37))){
var inst_13871 = (state_13912[(23)]);
var inst_13880 = (state_13912[(22)]);
var inst_13766 = (state_13912[(12)]);
var inst_13880__$1 = cljs.core.first(inst_13871);
var inst_13882 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3(inst_13880__$1,inst_13766,done);
var state_13912__$1 = (function (){var statearr_14106 = state_13912;
(statearr_14106[(22)] = inst_13880__$1);

return statearr_14106;
})();
if(cljs.core.truth_(inst_13882)){
var statearr_14109_15681 = state_13912__$1;
(statearr_14109_15681[(1)] = (39));

} else {
var statearr_14110_15682 = state_13912__$1;
(statearr_14110_15682[(1)] = (40));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13913 === (8))){
var inst_13782 = (state_13912[(17)]);
var inst_13781 = (state_13912[(16)]);
var inst_13784 = (inst_13782 < inst_13781);
var inst_13785 = inst_13784;
var state_13912__$1 = state_13912;
if(cljs.core.truth_(inst_13785)){
var statearr_14111_15683 = state_13912__$1;
(statearr_14111_15683[(1)] = (10));

} else {
var statearr_14112_15684 = state_13912__$1;
(statearr_14112_15684[(1)] = (11));

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
var cljs$core$async$mult_$_state_machine__12183__auto__ = null;
var cljs$core$async$mult_$_state_machine__12183__auto____0 = (function (){
var statearr_14117 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_14117[(0)] = cljs$core$async$mult_$_state_machine__12183__auto__);

(statearr_14117[(1)] = (1));

return statearr_14117;
});
var cljs$core$async$mult_$_state_machine__12183__auto____1 = (function (state_13912){
while(true){
var ret_value__12184__auto__ = (function (){try{while(true){
var result__12185__auto__ = switch__12182__auto__(state_13912);
if(cljs.core.keyword_identical_QMARK_(result__12185__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__12185__auto__;
}
break;
}
}catch (e14118){var ex__12186__auto__ = e14118;
var statearr_14119_15685 = state_13912;
(statearr_14119_15685[(2)] = ex__12186__auto__);


if(cljs.core.seq((state_13912[(4)]))){
var statearr_14120_15686 = state_13912;
(statearr_14120_15686[(1)] = cljs.core.first((state_13912[(4)])));

} else {
throw ex__12186__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__12184__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__15687 = state_13912;
state_13912 = G__15687;
continue;
} else {
return ret_value__12184__auto__;
}
break;
}
});
cljs$core$async$mult_$_state_machine__12183__auto__ = function(state_13912){
switch(arguments.length){
case 0:
return cljs$core$async$mult_$_state_machine__12183__auto____0.call(this);
case 1:
return cljs$core$async$mult_$_state_machine__12183__auto____1.call(this,state_13912);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mult_$_state_machine__12183__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mult_$_state_machine__12183__auto____0;
cljs$core$async$mult_$_state_machine__12183__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mult_$_state_machine__12183__auto____1;
return cljs$core$async$mult_$_state_machine__12183__auto__;
})()
})();
var state__12784__auto__ = (function (){var statearr_14121 = f__12783__auto__();
(statearr_14121[(6)] = c__12782__auto___15607);

return statearr_14121;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__12784__auto__);
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
var G__14127 = arguments.length;
switch (G__14127) {
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

var cljs$core$async$Mix$admix_STAR_$dyn_15689 = (function (m,ch){
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
return cljs$core$async$Mix$admix_STAR_$dyn_15689(m,ch);
}
});

var cljs$core$async$Mix$unmix_STAR_$dyn_15693 = (function (m,ch){
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
return cljs$core$async$Mix$unmix_STAR_$dyn_15693(m,ch);
}
});

var cljs$core$async$Mix$unmix_all_STAR_$dyn_15694 = (function (m){
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
return cljs$core$async$Mix$unmix_all_STAR_$dyn_15694(m);
}
});

var cljs$core$async$Mix$toggle_STAR_$dyn_15697 = (function (m,state_map){
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
return cljs$core$async$Mix$toggle_STAR_$dyn_15697(m,state_map);
}
});

var cljs$core$async$Mix$solo_mode_STAR_$dyn_15698 = (function (m,mode){
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
return cljs$core$async$Mix$solo_mode_STAR_$dyn_15698(m,mode);
}
});

cljs.core.async.ioc_alts_BANG_ = (function cljs$core$async$ioc_alts_BANG_(var_args){
var args__5755__auto__ = [];
var len__5749__auto___15699 = arguments.length;
var i__5750__auto___15700 = (0);
while(true){
if((i__5750__auto___15700 < len__5749__auto___15699)){
args__5755__auto__.push((arguments[i__5750__auto___15700]));

var G__15701 = (i__5750__auto___15700 + (1));
i__5750__auto___15700 = G__15701;
continue;
} else {
}
break;
}

var argseq__5756__auto__ = ((((3) < args__5755__auto__.length))?(new cljs.core.IndexedSeq(args__5755__auto__.slice((3)),(0),null)):null);
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__5756__auto__);
});

(cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (state,cont_block,ports,p__14163){
var map__14164 = p__14163;
var map__14164__$1 = cljs.core.__destructure_map(map__14164);
var opts = map__14164__$1;
var statearr_14166_15702 = state;
(statearr_14166_15702[(1)] = cont_block);


var temp__5823__auto__ = cljs.core.async.do_alts((function (val){
var statearr_14167_15703 = state;
(statearr_14167_15703[(2)] = val);


return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state);
}),ports,opts);
if(cljs.core.truth_(temp__5823__auto__)){
var cb = temp__5823__auto__;
var statearr_14169_15705 = state;
(statearr_14169_15705[(2)] = cljs.core.deref(cb));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}));

(cljs.core.async.ioc_alts_BANG_.cljs$lang$maxFixedArity = (3));

/** @this {Function} */
(cljs.core.async.ioc_alts_BANG_.cljs$lang$applyTo = (function (seq14159){
var G__14160 = cljs.core.first(seq14159);
var seq14159__$1 = cljs.core.next(seq14159);
var G__14161 = cljs.core.first(seq14159__$1);
var seq14159__$2 = cljs.core.next(seq14159__$1);
var G__14162 = cljs.core.first(seq14159__$2);
var seq14159__$3 = cljs.core.next(seq14159__$2);
var self__5734__auto__ = this;
return self__5734__auto__.cljs$core$IFn$_invoke$arity$variadic(G__14160,G__14161,G__14162,seq14159__$3);
}));


/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mix}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async14177 = (function (change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta14178){
this.change = change;
this.solo_mode = solo_mode;
this.pick = pick;
this.cs = cs;
this.calc_state = calc_state;
this.out = out;
this.changed = changed;
this.solo_modes = solo_modes;
this.attrs = attrs;
this.meta14178 = meta14178;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async14177.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_14179,meta14178__$1){
var self__ = this;
var _14179__$1 = this;
return (new cljs.core.async.t_cljs$core$async14177(self__.change,self__.solo_mode,self__.pick,self__.cs,self__.calc_state,self__.out,self__.changed,self__.solo_modes,self__.attrs,meta14178__$1));
}));

(cljs.core.async.t_cljs$core$async14177.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_14179){
var self__ = this;
var _14179__$1 = this;
return self__.meta14178;
}));

(cljs.core.async.t_cljs$core$async14177.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async14177.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.out;
}));

(cljs.core.async.t_cljs$core$async14177.prototype.cljs$core$async$Mix$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async14177.prototype.cljs$core$async$Mix$admix_STAR_$arity$2 = (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(self__.cs,cljs.core.assoc,ch,cljs.core.PersistentArrayMap.EMPTY);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async14177.prototype.cljs$core$async$Mix$unmix_STAR_$arity$2 = (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.cs,cljs.core.dissoc,ch);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async14177.prototype.cljs$core$async$Mix$unmix_all_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_(self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async14177.prototype.cljs$core$async$Mix$toggle_STAR_$arity$2 = (function (_,state_map){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.cs,cljs.core.partial.cljs$core$IFn$_invoke$arity$2(cljs.core.merge_with,cljs.core.merge),state_map);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async14177.prototype.cljs$core$async$Mix$solo_mode_STAR_$arity$2 = (function (_,mode){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_((self__.solo_modes.cljs$core$IFn$_invoke$arity$1 ? self__.solo_modes.cljs$core$IFn$_invoke$arity$1(mode) : self__.solo_modes.call(null,mode)))){
} else {
throw (new Error(["Assert failed: ",["mode must be one of: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(self__.solo_modes)].join(''),"\n","(solo-modes mode)"].join('')));
}

cljs.core.reset_BANG_(self__.solo_mode,mode);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async14177.getBasis = (function (){
return new cljs.core.PersistentVector(null, 10, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"change","change",477485025,null),new cljs.core.Symbol(null,"solo-mode","solo-mode",2031788074,null),new cljs.core.Symbol(null,"pick","pick",1300068175,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"calc-state","calc-state",-349968968,null),new cljs.core.Symbol(null,"out","out",729986010,null),new cljs.core.Symbol(null,"changed","changed",-2083710852,null),new cljs.core.Symbol(null,"solo-modes","solo-modes",882180540,null),new cljs.core.Symbol(null,"attrs","attrs",-450137186,null),new cljs.core.Symbol(null,"meta14178","meta14178",215038068,null)], null);
}));

(cljs.core.async.t_cljs$core$async14177.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async14177.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async14177");

(cljs.core.async.t_cljs$core$async14177.cljs$lang$ctorPrWriter = (function (this__5310__auto__,writer__5311__auto__,opt__5312__auto__){
return cljs.core._write(writer__5311__auto__,"cljs.core.async/t_cljs$core$async14177");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async14177.
 */
cljs.core.async.__GT_t_cljs$core$async14177 = (function cljs$core$async$__GT_t_cljs$core$async14177(change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta14178){
return (new cljs.core.async.t_cljs$core$async14177(change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta14178));
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
var m = (new cljs.core.async.t_cljs$core$async14177(change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,cljs.core.PersistentArrayMap.EMPTY));
var c__12782__auto___15713 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__12783__auto__ = (function (){var switch__12182__auto__ = (function (state_14259){
var state_val_14260 = (state_14259[(1)]);
if((state_val_14260 === (7))){
var inst_14216 = (state_14259[(2)]);
var state_14259__$1 = state_14259;
if(cljs.core.truth_(inst_14216)){
var statearr_14263_15714 = state_14259__$1;
(statearr_14263_15714[(1)] = (8));

} else {
var statearr_14264_15715 = state_14259__$1;
(statearr_14264_15715[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14260 === (20))){
var inst_14209 = (state_14259[(7)]);
var state_14259__$1 = state_14259;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_14259__$1,(23),out,inst_14209);
} else {
if((state_val_14260 === (1))){
var inst_14192 = calc_state();
var inst_14193 = cljs.core.__destructure_map(inst_14192);
var inst_14194 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_14193,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_14195 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_14193,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_14196 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_14193,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var inst_14197 = inst_14192;
var state_14259__$1 = (function (){var statearr_14265 = state_14259;
(statearr_14265[(8)] = inst_14194);

(statearr_14265[(9)] = inst_14195);

(statearr_14265[(10)] = inst_14196);

(statearr_14265[(11)] = inst_14197);

return statearr_14265;
})();
var statearr_14266_15716 = state_14259__$1;
(statearr_14266_15716[(2)] = null);

(statearr_14266_15716[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14260 === (24))){
var inst_14200 = (state_14259[(12)]);
var inst_14197 = inst_14200;
var state_14259__$1 = (function (){var statearr_14267 = state_14259;
(statearr_14267[(11)] = inst_14197);

return statearr_14267;
})();
var statearr_14268_15717 = state_14259__$1;
(statearr_14268_15717[(2)] = null);

(statearr_14268_15717[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14260 === (4))){
var inst_14209 = (state_14259[(7)]);
var inst_14211 = (state_14259[(13)]);
var inst_14208 = (state_14259[(2)]);
var inst_14209__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_14208,(0),null);
var inst_14210 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_14208,(1),null);
var inst_14211__$1 = (inst_14209__$1 == null);
var state_14259__$1 = (function (){var statearr_14273 = state_14259;
(statearr_14273[(7)] = inst_14209__$1);

(statearr_14273[(14)] = inst_14210);

(statearr_14273[(13)] = inst_14211__$1);

return statearr_14273;
})();
if(cljs.core.truth_(inst_14211__$1)){
var statearr_14275_15718 = state_14259__$1;
(statearr_14275_15718[(1)] = (5));

} else {
var statearr_14276_15719 = state_14259__$1;
(statearr_14276_15719[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14260 === (15))){
var inst_14201 = (state_14259[(15)]);
var inst_14233 = (state_14259[(16)]);
var inst_14233__$1 = cljs.core.empty_QMARK_(inst_14201);
var state_14259__$1 = (function (){var statearr_14279 = state_14259;
(statearr_14279[(16)] = inst_14233__$1);

return statearr_14279;
})();
if(inst_14233__$1){
var statearr_14280_15720 = state_14259__$1;
(statearr_14280_15720[(1)] = (17));

} else {
var statearr_14281_15721 = state_14259__$1;
(statearr_14281_15721[(1)] = (18));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14260 === (21))){
var inst_14200 = (state_14259[(12)]);
var inst_14197 = inst_14200;
var state_14259__$1 = (function (){var statearr_14282 = state_14259;
(statearr_14282[(11)] = inst_14197);

return statearr_14282;
})();
var statearr_14283_15725 = state_14259__$1;
(statearr_14283_15725[(2)] = null);

(statearr_14283_15725[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14260 === (13))){
var inst_14223 = (state_14259[(2)]);
var inst_14224 = calc_state();
var inst_14197 = inst_14224;
var state_14259__$1 = (function (){var statearr_14284 = state_14259;
(statearr_14284[(17)] = inst_14223);

(statearr_14284[(11)] = inst_14197);

return statearr_14284;
})();
var statearr_14286_15729 = state_14259__$1;
(statearr_14286_15729[(2)] = null);

(statearr_14286_15729[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14260 === (22))){
var inst_14253 = (state_14259[(2)]);
var state_14259__$1 = state_14259;
var statearr_14287_15730 = state_14259__$1;
(statearr_14287_15730[(2)] = inst_14253);

(statearr_14287_15730[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14260 === (6))){
var inst_14210 = (state_14259[(14)]);
var inst_14214 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_14210,change);
var state_14259__$1 = state_14259;
var statearr_14295_15731 = state_14259__$1;
(statearr_14295_15731[(2)] = inst_14214);

(statearr_14295_15731[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14260 === (25))){
var state_14259__$1 = state_14259;
var statearr_14296_15732 = state_14259__$1;
(statearr_14296_15732[(2)] = null);

(statearr_14296_15732[(1)] = (26));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14260 === (17))){
var inst_14202 = (state_14259[(18)]);
var inst_14210 = (state_14259[(14)]);
var inst_14235 = (inst_14202.cljs$core$IFn$_invoke$arity$1 ? inst_14202.cljs$core$IFn$_invoke$arity$1(inst_14210) : inst_14202.call(null,inst_14210));
var inst_14236 = cljs.core.not(inst_14235);
var state_14259__$1 = state_14259;
var statearr_14297_15735 = state_14259__$1;
(statearr_14297_15735[(2)] = inst_14236);

(statearr_14297_15735[(1)] = (19));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14260 === (3))){
var inst_14257 = (state_14259[(2)]);
var state_14259__$1 = state_14259;
return cljs.core.async.impl.ioc_helpers.return_chan(state_14259__$1,inst_14257);
} else {
if((state_val_14260 === (12))){
var state_14259__$1 = state_14259;
var statearr_14298_15737 = state_14259__$1;
(statearr_14298_15737[(2)] = null);

(statearr_14298_15737[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14260 === (2))){
var inst_14197 = (state_14259[(11)]);
var inst_14200 = (state_14259[(12)]);
var inst_14200__$1 = cljs.core.__destructure_map(inst_14197);
var inst_14201 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_14200__$1,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_14202 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_14200__$1,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_14203 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_14200__$1,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var state_14259__$1 = (function (){var statearr_14299 = state_14259;
(statearr_14299[(12)] = inst_14200__$1);

(statearr_14299[(15)] = inst_14201);

(statearr_14299[(18)] = inst_14202);

return statearr_14299;
})();
return cljs.core.async.ioc_alts_BANG_(state_14259__$1,(4),inst_14203);
} else {
if((state_val_14260 === (23))){
var inst_14244 = (state_14259[(2)]);
var state_14259__$1 = state_14259;
if(cljs.core.truth_(inst_14244)){
var statearr_14300_15742 = state_14259__$1;
(statearr_14300_15742[(1)] = (24));

} else {
var statearr_14301_15743 = state_14259__$1;
(statearr_14301_15743[(1)] = (25));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14260 === (19))){
var inst_14239 = (state_14259[(2)]);
var state_14259__$1 = state_14259;
var statearr_14302_15744 = state_14259__$1;
(statearr_14302_15744[(2)] = inst_14239);

(statearr_14302_15744[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14260 === (11))){
var inst_14210 = (state_14259[(14)]);
var inst_14220 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(cs,cljs.core.dissoc,inst_14210);
var state_14259__$1 = state_14259;
var statearr_14303_15745 = state_14259__$1;
(statearr_14303_15745[(2)] = inst_14220);

(statearr_14303_15745[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14260 === (9))){
var inst_14201 = (state_14259[(15)]);
var inst_14210 = (state_14259[(14)]);
var inst_14227 = (state_14259[(19)]);
var inst_14227__$1 = (inst_14201.cljs$core$IFn$_invoke$arity$1 ? inst_14201.cljs$core$IFn$_invoke$arity$1(inst_14210) : inst_14201.call(null,inst_14210));
var state_14259__$1 = (function (){var statearr_14304 = state_14259;
(statearr_14304[(19)] = inst_14227__$1);

return statearr_14304;
})();
if(cljs.core.truth_(inst_14227__$1)){
var statearr_14305_15746 = state_14259__$1;
(statearr_14305_15746[(1)] = (14));

} else {
var statearr_14306_15747 = state_14259__$1;
(statearr_14306_15747[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14260 === (5))){
var inst_14211 = (state_14259[(13)]);
var state_14259__$1 = state_14259;
var statearr_14307_15748 = state_14259__$1;
(statearr_14307_15748[(2)] = inst_14211);

(statearr_14307_15748[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14260 === (14))){
var inst_14227 = (state_14259[(19)]);
var state_14259__$1 = state_14259;
var statearr_14308_15749 = state_14259__$1;
(statearr_14308_15749[(2)] = inst_14227);

(statearr_14308_15749[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14260 === (26))){
var inst_14249 = (state_14259[(2)]);
var state_14259__$1 = state_14259;
var statearr_14309_15750 = state_14259__$1;
(statearr_14309_15750[(2)] = inst_14249);

(statearr_14309_15750[(1)] = (22));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14260 === (16))){
var inst_14241 = (state_14259[(2)]);
var state_14259__$1 = state_14259;
if(cljs.core.truth_(inst_14241)){
var statearr_14310_15751 = state_14259__$1;
(statearr_14310_15751[(1)] = (20));

} else {
var statearr_14311_15752 = state_14259__$1;
(statearr_14311_15752[(1)] = (21));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14260 === (10))){
var inst_14255 = (state_14259[(2)]);
var state_14259__$1 = state_14259;
var statearr_14313_15753 = state_14259__$1;
(statearr_14313_15753[(2)] = inst_14255);

(statearr_14313_15753[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14260 === (18))){
var inst_14233 = (state_14259[(16)]);
var state_14259__$1 = state_14259;
var statearr_14314_15754 = state_14259__$1;
(statearr_14314_15754[(2)] = inst_14233);

(statearr_14314_15754[(1)] = (19));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14260 === (8))){
var inst_14209 = (state_14259[(7)]);
var inst_14218 = (inst_14209 == null);
var state_14259__$1 = state_14259;
if(cljs.core.truth_(inst_14218)){
var statearr_14318_15755 = state_14259__$1;
(statearr_14318_15755[(1)] = (11));

} else {
var statearr_14319_15756 = state_14259__$1;
(statearr_14319_15756[(1)] = (12));

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
var cljs$core$async$mix_$_state_machine__12183__auto__ = null;
var cljs$core$async$mix_$_state_machine__12183__auto____0 = (function (){
var statearr_14320 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_14320[(0)] = cljs$core$async$mix_$_state_machine__12183__auto__);

(statearr_14320[(1)] = (1));

return statearr_14320;
});
var cljs$core$async$mix_$_state_machine__12183__auto____1 = (function (state_14259){
while(true){
var ret_value__12184__auto__ = (function (){try{while(true){
var result__12185__auto__ = switch__12182__auto__(state_14259);
if(cljs.core.keyword_identical_QMARK_(result__12185__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__12185__auto__;
}
break;
}
}catch (e14321){var ex__12186__auto__ = e14321;
var statearr_14322_15757 = state_14259;
(statearr_14322_15757[(2)] = ex__12186__auto__);


if(cljs.core.seq((state_14259[(4)]))){
var statearr_14323_15758 = state_14259;
(statearr_14323_15758[(1)] = cljs.core.first((state_14259[(4)])));

} else {
throw ex__12186__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__12184__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__15759 = state_14259;
state_14259 = G__15759;
continue;
} else {
return ret_value__12184__auto__;
}
break;
}
});
cljs$core$async$mix_$_state_machine__12183__auto__ = function(state_14259){
switch(arguments.length){
case 0:
return cljs$core$async$mix_$_state_machine__12183__auto____0.call(this);
case 1:
return cljs$core$async$mix_$_state_machine__12183__auto____1.call(this,state_14259);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mix_$_state_machine__12183__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mix_$_state_machine__12183__auto____0;
cljs$core$async$mix_$_state_machine__12183__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mix_$_state_machine__12183__auto____1;
return cljs$core$async$mix_$_state_machine__12183__auto__;
})()
})();
var state__12784__auto__ = (function (){var statearr_14324 = f__12783__auto__();
(statearr_14324[(6)] = c__12782__auto___15713);

return statearr_14324;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__12784__auto__);
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

var cljs$core$async$Pub$sub_STAR_$dyn_15777 = (function (p,v,ch,close_QMARK_){
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
return cljs$core$async$Pub$sub_STAR_$dyn_15777(p,v,ch,close_QMARK_);
}
});

var cljs$core$async$Pub$unsub_STAR_$dyn_15794 = (function (p,v,ch){
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
return cljs$core$async$Pub$unsub_STAR_$dyn_15794(p,v,ch);
}
});

var cljs$core$async$Pub$unsub_all_STAR_$dyn_15795 = (function() {
var G__15796 = null;
var G__15796__1 = (function (p){
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
var G__15796__2 = (function (p,v){
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
G__15796 = function(p,v){
switch(arguments.length){
case 1:
return G__15796__1.call(this,p);
case 2:
return G__15796__2.call(this,p,v);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
G__15796.cljs$core$IFn$_invoke$arity$1 = G__15796__1;
G__15796.cljs$core$IFn$_invoke$arity$2 = G__15796__2;
return G__15796;
})()
;
cljs.core.async.unsub_all_STAR_ = (function cljs$core$async$unsub_all_STAR_(var_args){
var G__14346 = arguments.length;
switch (G__14346) {
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
return cljs$core$async$Pub$unsub_all_STAR_$dyn_15795(p);
}
}));

(cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2 = (function (p,v){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$unsub_all_STAR_$arity$2 == null)))))){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$2(p,v);
} else {
return cljs$core$async$Pub$unsub_all_STAR_$dyn_15795(p,v);
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
cljs.core.async.t_cljs$core$async14361 = (function (ch,topic_fn,buf_fn,mults,ensure_mult,meta14362){
this.ch = ch;
this.topic_fn = topic_fn;
this.buf_fn = buf_fn;
this.mults = mults;
this.ensure_mult = ensure_mult;
this.meta14362 = meta14362;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async14361.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_14363,meta14362__$1){
var self__ = this;
var _14363__$1 = this;
return (new cljs.core.async.t_cljs$core$async14361(self__.ch,self__.topic_fn,self__.buf_fn,self__.mults,self__.ensure_mult,meta14362__$1));
}));

(cljs.core.async.t_cljs$core$async14361.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_14363){
var self__ = this;
var _14363__$1 = this;
return self__.meta14362;
}));

(cljs.core.async.t_cljs$core$async14361.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async14361.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
}));

(cljs.core.async.t_cljs$core$async14361.prototype.cljs$core$async$Pub$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async14361.prototype.cljs$core$async$Pub$sub_STAR_$arity$4 = (function (p,topic,ch__$1,close_QMARK_){
var self__ = this;
var p__$1 = this;
var m = (self__.ensure_mult.cljs$core$IFn$_invoke$arity$1 ? self__.ensure_mult.cljs$core$IFn$_invoke$arity$1(topic) : self__.ensure_mult.call(null,topic));
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3(m,ch__$1,close_QMARK_);
}));

(cljs.core.async.t_cljs$core$async14361.prototype.cljs$core$async$Pub$unsub_STAR_$arity$3 = (function (p,topic,ch__$1){
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

(cljs.core.async.t_cljs$core$async14361.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.reset_BANG_(self__.mults,cljs.core.PersistentArrayMap.EMPTY);
}));

(cljs.core.async.t_cljs$core$async14361.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$2 = (function (_,topic){
var self__ = this;
var ___$1 = this;
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.mults,cljs.core.dissoc,topic);
}));

(cljs.core.async.t_cljs$core$async14361.getBasis = (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"topic-fn","topic-fn",-862449736,null),new cljs.core.Symbol(null,"buf-fn","buf-fn",-1200281591,null),new cljs.core.Symbol(null,"mults","mults",-461114485,null),new cljs.core.Symbol(null,"ensure-mult","ensure-mult",1796584816,null),new cljs.core.Symbol(null,"meta14362","meta14362",-2047637275,null)], null);
}));

(cljs.core.async.t_cljs$core$async14361.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async14361.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async14361");

(cljs.core.async.t_cljs$core$async14361.cljs$lang$ctorPrWriter = (function (this__5310__auto__,writer__5311__auto__,opt__5312__auto__){
return cljs.core._write(writer__5311__auto__,"cljs.core.async/t_cljs$core$async14361");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async14361.
 */
cljs.core.async.__GT_t_cljs$core$async14361 = (function cljs$core$async$__GT_t_cljs$core$async14361(ch,topic_fn,buf_fn,mults,ensure_mult,meta14362){
return (new cljs.core.async.t_cljs$core$async14361(ch,topic_fn,buf_fn,mults,ensure_mult,meta14362));
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
var G__14360 = arguments.length;
switch (G__14360) {
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
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(mults,(function (p1__14354_SHARP_){
if(cljs.core.truth_((p1__14354_SHARP_.cljs$core$IFn$_invoke$arity$1 ? p1__14354_SHARP_.cljs$core$IFn$_invoke$arity$1(topic) : p1__14354_SHARP_.call(null,topic)))){
return p1__14354_SHARP_;
} else {
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__14354_SHARP_,topic,cljs.core.async.mult(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((buf_fn.cljs$core$IFn$_invoke$arity$1 ? buf_fn.cljs$core$IFn$_invoke$arity$1(topic) : buf_fn.call(null,topic)))));
}
})),topic);
}
});
var p = (new cljs.core.async.t_cljs$core$async14361(ch,topic_fn,buf_fn,mults,ensure_mult,cljs.core.PersistentArrayMap.EMPTY));
var c__12782__auto___15809 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__12783__auto__ = (function (){var switch__12182__auto__ = (function (state_14463){
var state_val_14464 = (state_14463[(1)]);
if((state_val_14464 === (7))){
var inst_14451 = (state_14463[(2)]);
var state_14463__$1 = state_14463;
var statearr_14471_15810 = state_14463__$1;
(statearr_14471_15810[(2)] = inst_14451);

(statearr_14471_15810[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14464 === (20))){
var state_14463__$1 = state_14463;
var statearr_14478_15811 = state_14463__$1;
(statearr_14478_15811[(2)] = null);

(statearr_14478_15811[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14464 === (1))){
var state_14463__$1 = state_14463;
var statearr_14479_15812 = state_14463__$1;
(statearr_14479_15812[(2)] = null);

(statearr_14479_15812[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14464 === (24))){
var inst_14434 = (state_14463[(7)]);
var inst_14443 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(mults,cljs.core.dissoc,inst_14434);
var state_14463__$1 = state_14463;
var statearr_14480_15813 = state_14463__$1;
(statearr_14480_15813[(2)] = inst_14443);

(statearr_14480_15813[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14464 === (4))){
var inst_14386 = (state_14463[(8)]);
var inst_14386__$1 = (state_14463[(2)]);
var inst_14387 = (inst_14386__$1 == null);
var state_14463__$1 = (function (){var statearr_14481 = state_14463;
(statearr_14481[(8)] = inst_14386__$1);

return statearr_14481;
})();
if(cljs.core.truth_(inst_14387)){
var statearr_14482_15816 = state_14463__$1;
(statearr_14482_15816[(1)] = (5));

} else {
var statearr_14483_15817 = state_14463__$1;
(statearr_14483_15817[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14464 === (15))){
var inst_14428 = (state_14463[(2)]);
var state_14463__$1 = state_14463;
var statearr_14484_15818 = state_14463__$1;
(statearr_14484_15818[(2)] = inst_14428);

(statearr_14484_15818[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14464 === (21))){
var inst_14448 = (state_14463[(2)]);
var state_14463__$1 = (function (){var statearr_14485 = state_14463;
(statearr_14485[(9)] = inst_14448);

return statearr_14485;
})();
var statearr_14486_15819 = state_14463__$1;
(statearr_14486_15819[(2)] = null);

(statearr_14486_15819[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14464 === (13))){
var inst_14410 = (state_14463[(10)]);
var inst_14412 = cljs.core.chunked_seq_QMARK_(inst_14410);
var state_14463__$1 = state_14463;
if(inst_14412){
var statearr_14489_15820 = state_14463__$1;
(statearr_14489_15820[(1)] = (16));

} else {
var statearr_14490_15821 = state_14463__$1;
(statearr_14490_15821[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14464 === (22))){
var inst_14440 = (state_14463[(2)]);
var state_14463__$1 = state_14463;
if(cljs.core.truth_(inst_14440)){
var statearr_14491_15822 = state_14463__$1;
(statearr_14491_15822[(1)] = (23));

} else {
var statearr_14492_15823 = state_14463__$1;
(statearr_14492_15823[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14464 === (6))){
var inst_14386 = (state_14463[(8)]);
var inst_14434 = (state_14463[(7)]);
var inst_14436 = (state_14463[(11)]);
var inst_14434__$1 = (topic_fn.cljs$core$IFn$_invoke$arity$1 ? topic_fn.cljs$core$IFn$_invoke$arity$1(inst_14386) : topic_fn.call(null,inst_14386));
var inst_14435 = cljs.core.deref(mults);
var inst_14436__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_14435,inst_14434__$1);
var state_14463__$1 = (function (){var statearr_14493 = state_14463;
(statearr_14493[(7)] = inst_14434__$1);

(statearr_14493[(11)] = inst_14436__$1);

return statearr_14493;
})();
if(cljs.core.truth_(inst_14436__$1)){
var statearr_14494_15829 = state_14463__$1;
(statearr_14494_15829[(1)] = (19));

} else {
var statearr_14496_15831 = state_14463__$1;
(statearr_14496_15831[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14464 === (25))){
var inst_14445 = (state_14463[(2)]);
var state_14463__$1 = state_14463;
var statearr_14497_15832 = state_14463__$1;
(statearr_14497_15832[(2)] = inst_14445);

(statearr_14497_15832[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14464 === (17))){
var inst_14410 = (state_14463[(10)]);
var inst_14419 = cljs.core.first(inst_14410);
var inst_14420 = cljs.core.async.muxch_STAR_(inst_14419);
var inst_14421 = cljs.core.async.close_BANG_(inst_14420);
var inst_14422 = cljs.core.next(inst_14410);
var inst_14396 = inst_14422;
var inst_14397 = null;
var inst_14398 = (0);
var inst_14399 = (0);
var state_14463__$1 = (function (){var statearr_14498 = state_14463;
(statearr_14498[(12)] = inst_14421);

(statearr_14498[(13)] = inst_14396);

(statearr_14498[(14)] = inst_14397);

(statearr_14498[(15)] = inst_14398);

(statearr_14498[(16)] = inst_14399);

return statearr_14498;
})();
var statearr_14499_15833 = state_14463__$1;
(statearr_14499_15833[(2)] = null);

(statearr_14499_15833[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14464 === (3))){
var inst_14453 = (state_14463[(2)]);
var state_14463__$1 = state_14463;
return cljs.core.async.impl.ioc_helpers.return_chan(state_14463__$1,inst_14453);
} else {
if((state_val_14464 === (12))){
var inst_14430 = (state_14463[(2)]);
var state_14463__$1 = state_14463;
var statearr_14500_15838 = state_14463__$1;
(statearr_14500_15838[(2)] = inst_14430);

(statearr_14500_15838[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14464 === (2))){
var state_14463__$1 = state_14463;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_14463__$1,(4),ch);
} else {
if((state_val_14464 === (23))){
var state_14463__$1 = state_14463;
var statearr_14501_15839 = state_14463__$1;
(statearr_14501_15839[(2)] = null);

(statearr_14501_15839[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14464 === (19))){
var inst_14436 = (state_14463[(11)]);
var inst_14386 = (state_14463[(8)]);
var inst_14438 = cljs.core.async.muxch_STAR_(inst_14436);
var state_14463__$1 = state_14463;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_14463__$1,(22),inst_14438,inst_14386);
} else {
if((state_val_14464 === (11))){
var inst_14396 = (state_14463[(13)]);
var inst_14410 = (state_14463[(10)]);
var inst_14410__$1 = cljs.core.seq(inst_14396);
var state_14463__$1 = (function (){var statearr_14502 = state_14463;
(statearr_14502[(10)] = inst_14410__$1);

return statearr_14502;
})();
if(inst_14410__$1){
var statearr_14503_15840 = state_14463__$1;
(statearr_14503_15840[(1)] = (13));

} else {
var statearr_14504_15841 = state_14463__$1;
(statearr_14504_15841[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14464 === (9))){
var inst_14432 = (state_14463[(2)]);
var state_14463__$1 = state_14463;
var statearr_14508_15842 = state_14463__$1;
(statearr_14508_15842[(2)] = inst_14432);

(statearr_14508_15842[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14464 === (5))){
var inst_14393 = cljs.core.deref(mults);
var inst_14394 = cljs.core.vals(inst_14393);
var inst_14395 = cljs.core.seq(inst_14394);
var inst_14396 = inst_14395;
var inst_14397 = null;
var inst_14398 = (0);
var inst_14399 = (0);
var state_14463__$1 = (function (){var statearr_14509 = state_14463;
(statearr_14509[(13)] = inst_14396);

(statearr_14509[(14)] = inst_14397);

(statearr_14509[(15)] = inst_14398);

(statearr_14509[(16)] = inst_14399);

return statearr_14509;
})();
var statearr_14510_15843 = state_14463__$1;
(statearr_14510_15843[(2)] = null);

(statearr_14510_15843[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14464 === (14))){
var state_14463__$1 = state_14463;
var statearr_14514_15844 = state_14463__$1;
(statearr_14514_15844[(2)] = null);

(statearr_14514_15844[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14464 === (16))){
var inst_14410 = (state_14463[(10)]);
var inst_14414 = cljs.core.chunk_first(inst_14410);
var inst_14415 = cljs.core.chunk_rest(inst_14410);
var inst_14416 = cljs.core.count(inst_14414);
var inst_14396 = inst_14415;
var inst_14397 = inst_14414;
var inst_14398 = inst_14416;
var inst_14399 = (0);
var state_14463__$1 = (function (){var statearr_14515 = state_14463;
(statearr_14515[(13)] = inst_14396);

(statearr_14515[(14)] = inst_14397);

(statearr_14515[(15)] = inst_14398);

(statearr_14515[(16)] = inst_14399);

return statearr_14515;
})();
var statearr_14516_15845 = state_14463__$1;
(statearr_14516_15845[(2)] = null);

(statearr_14516_15845[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14464 === (10))){
var inst_14397 = (state_14463[(14)]);
var inst_14399 = (state_14463[(16)]);
var inst_14396 = (state_14463[(13)]);
var inst_14398 = (state_14463[(15)]);
var inst_14404 = cljs.core._nth(inst_14397,inst_14399);
var inst_14405 = cljs.core.async.muxch_STAR_(inst_14404);
var inst_14406 = cljs.core.async.close_BANG_(inst_14405);
var inst_14407 = (inst_14399 + (1));
var tmp14511 = inst_14398;
var tmp14512 = inst_14396;
var tmp14513 = inst_14397;
var inst_14396__$1 = tmp14512;
var inst_14397__$1 = tmp14513;
var inst_14398__$1 = tmp14511;
var inst_14399__$1 = inst_14407;
var state_14463__$1 = (function (){var statearr_14517 = state_14463;
(statearr_14517[(17)] = inst_14406);

(statearr_14517[(13)] = inst_14396__$1);

(statearr_14517[(14)] = inst_14397__$1);

(statearr_14517[(15)] = inst_14398__$1);

(statearr_14517[(16)] = inst_14399__$1);

return statearr_14517;
})();
var statearr_14518_15846 = state_14463__$1;
(statearr_14518_15846[(2)] = null);

(statearr_14518_15846[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14464 === (18))){
var inst_14425 = (state_14463[(2)]);
var state_14463__$1 = state_14463;
var statearr_14519_15847 = state_14463__$1;
(statearr_14519_15847[(2)] = inst_14425);

(statearr_14519_15847[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14464 === (8))){
var inst_14399 = (state_14463[(16)]);
var inst_14398 = (state_14463[(15)]);
var inst_14401 = (inst_14399 < inst_14398);
var inst_14402 = inst_14401;
var state_14463__$1 = state_14463;
if(cljs.core.truth_(inst_14402)){
var statearr_14520_15848 = state_14463__$1;
(statearr_14520_15848[(1)] = (10));

} else {
var statearr_14521_15849 = state_14463__$1;
(statearr_14521_15849[(1)] = (11));

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
var cljs$core$async$state_machine__12183__auto__ = null;
var cljs$core$async$state_machine__12183__auto____0 = (function (){
var statearr_14525 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_14525[(0)] = cljs$core$async$state_machine__12183__auto__);

(statearr_14525[(1)] = (1));

return statearr_14525;
});
var cljs$core$async$state_machine__12183__auto____1 = (function (state_14463){
while(true){
var ret_value__12184__auto__ = (function (){try{while(true){
var result__12185__auto__ = switch__12182__auto__(state_14463);
if(cljs.core.keyword_identical_QMARK_(result__12185__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__12185__auto__;
}
break;
}
}catch (e14526){var ex__12186__auto__ = e14526;
var statearr_14527_15854 = state_14463;
(statearr_14527_15854[(2)] = ex__12186__auto__);


if(cljs.core.seq((state_14463[(4)]))){
var statearr_14528_15858 = state_14463;
(statearr_14528_15858[(1)] = cljs.core.first((state_14463[(4)])));

} else {
throw ex__12186__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__12184__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__15859 = state_14463;
state_14463 = G__15859;
continue;
} else {
return ret_value__12184__auto__;
}
break;
}
});
cljs$core$async$state_machine__12183__auto__ = function(state_14463){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__12183__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__12183__auto____1.call(this,state_14463);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__12183__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__12183__auto____0;
cljs$core$async$state_machine__12183__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__12183__auto____1;
return cljs$core$async$state_machine__12183__auto__;
})()
})();
var state__12784__auto__ = (function (){var statearr_14529 = f__12783__auto__();
(statearr_14529[(6)] = c__12782__auto___15809);

return statearr_14529;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__12784__auto__);
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
var G__14531 = arguments.length;
switch (G__14531) {
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
var G__14533 = arguments.length;
switch (G__14533) {
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
var G__14535 = arguments.length;
switch (G__14535) {
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
var c__12782__auto___15866 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__12783__auto__ = (function (){var switch__12182__auto__ = (function (state_14578){
var state_val_14579 = (state_14578[(1)]);
if((state_val_14579 === (7))){
var state_14578__$1 = state_14578;
var statearr_14580_15867 = state_14578__$1;
(statearr_14580_15867[(2)] = null);

(statearr_14580_15867[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14579 === (1))){
var state_14578__$1 = state_14578;
var statearr_14581_15869 = state_14578__$1;
(statearr_14581_15869[(2)] = null);

(statearr_14581_15869[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14579 === (4))){
var inst_14539 = (state_14578[(7)]);
var inst_14538 = (state_14578[(8)]);
var inst_14541 = (inst_14539 < inst_14538);
var state_14578__$1 = state_14578;
if(cljs.core.truth_(inst_14541)){
var statearr_14582_15871 = state_14578__$1;
(statearr_14582_15871[(1)] = (6));

} else {
var statearr_14583_15872 = state_14578__$1;
(statearr_14583_15872[(1)] = (7));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14579 === (15))){
var inst_14564 = (state_14578[(9)]);
var inst_14569 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(f,inst_14564);
var state_14578__$1 = state_14578;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_14578__$1,(17),out,inst_14569);
} else {
if((state_val_14579 === (13))){
var inst_14564 = (state_14578[(9)]);
var inst_14564__$1 = (state_14578[(2)]);
var inst_14565 = cljs.core.some(cljs.core.nil_QMARK_,inst_14564__$1);
var state_14578__$1 = (function (){var statearr_14584 = state_14578;
(statearr_14584[(9)] = inst_14564__$1);

return statearr_14584;
})();
if(cljs.core.truth_(inst_14565)){
var statearr_14585_15873 = state_14578__$1;
(statearr_14585_15873[(1)] = (14));

} else {
var statearr_14586_15874 = state_14578__$1;
(statearr_14586_15874[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14579 === (6))){
var state_14578__$1 = state_14578;
var statearr_14587_15875 = state_14578__$1;
(statearr_14587_15875[(2)] = null);

(statearr_14587_15875[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14579 === (17))){
var inst_14571 = (state_14578[(2)]);
var state_14578__$1 = (function (){var statearr_14589 = state_14578;
(statearr_14589[(10)] = inst_14571);

return statearr_14589;
})();
var statearr_14590_15879 = state_14578__$1;
(statearr_14590_15879[(2)] = null);

(statearr_14590_15879[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14579 === (3))){
var inst_14576 = (state_14578[(2)]);
var state_14578__$1 = state_14578;
return cljs.core.async.impl.ioc_helpers.return_chan(state_14578__$1,inst_14576);
} else {
if((state_val_14579 === (12))){
var _ = (function (){var statearr_14599 = state_14578;
(statearr_14599[(4)] = cljs.core.rest((state_14578[(4)])));

return statearr_14599;
})();
var state_14578__$1 = state_14578;
var ex14588 = (state_14578__$1[(2)]);
var statearr_14603_15880 = state_14578__$1;
(statearr_14603_15880[(5)] = ex14588);


if((ex14588 instanceof Object)){
var statearr_14604_15881 = state_14578__$1;
(statearr_14604_15881[(1)] = (11));

(statearr_14604_15881[(5)] = null);

} else {
throw ex14588;

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14579 === (2))){
var inst_14537 = cljs.core.reset_BANG_(dctr,cnt);
var inst_14538 = cnt;
var inst_14539 = (0);
var state_14578__$1 = (function (){var statearr_14608 = state_14578;
(statearr_14608[(11)] = inst_14537);

(statearr_14608[(8)] = inst_14538);

(statearr_14608[(7)] = inst_14539);

return statearr_14608;
})();
var statearr_14609_15882 = state_14578__$1;
(statearr_14609_15882[(2)] = null);

(statearr_14609_15882[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14579 === (11))){
var inst_14543 = (state_14578[(2)]);
var inst_14544 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(dctr,cljs.core.dec);
var state_14578__$1 = (function (){var statearr_14610 = state_14578;
(statearr_14610[(12)] = inst_14543);

return statearr_14610;
})();
var statearr_14611_15883 = state_14578__$1;
(statearr_14611_15883[(2)] = inst_14544);

(statearr_14611_15883[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14579 === (9))){
var inst_14539 = (state_14578[(7)]);
var _ = (function (){var statearr_14612 = state_14578;
(statearr_14612[(4)] = cljs.core.cons((12),(state_14578[(4)])));

return statearr_14612;
})();
var inst_14550 = (chs__$1.cljs$core$IFn$_invoke$arity$1 ? chs__$1.cljs$core$IFn$_invoke$arity$1(inst_14539) : chs__$1.call(null,inst_14539));
var inst_14551 = (done.cljs$core$IFn$_invoke$arity$1 ? done.cljs$core$IFn$_invoke$arity$1(inst_14539) : done.call(null,inst_14539));
var inst_14552 = cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2(inst_14550,inst_14551);
var ___$1 = (function (){var statearr_14613 = state_14578;
(statearr_14613[(4)] = cljs.core.rest((state_14578[(4)])));

return statearr_14613;
})();
var state_14578__$1 = state_14578;
var statearr_14614_15884 = state_14578__$1;
(statearr_14614_15884[(2)] = inst_14552);

(statearr_14614_15884[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14579 === (5))){
var inst_14562 = (state_14578[(2)]);
var state_14578__$1 = (function (){var statearr_14615 = state_14578;
(statearr_14615[(13)] = inst_14562);

return statearr_14615;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_14578__$1,(13),dchan);
} else {
if((state_val_14579 === (14))){
var inst_14567 = cljs.core.async.close_BANG_(out);
var state_14578__$1 = state_14578;
var statearr_14616_15885 = state_14578__$1;
(statearr_14616_15885[(2)] = inst_14567);

(statearr_14616_15885[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14579 === (16))){
var inst_14574 = (state_14578[(2)]);
var state_14578__$1 = state_14578;
var statearr_14617_15886 = state_14578__$1;
(statearr_14617_15886[(2)] = inst_14574);

(statearr_14617_15886[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14579 === (10))){
var inst_14539 = (state_14578[(7)]);
var inst_14555 = (state_14578[(2)]);
var inst_14556 = (inst_14539 + (1));
var inst_14539__$1 = inst_14556;
var state_14578__$1 = (function (){var statearr_14618 = state_14578;
(statearr_14618[(14)] = inst_14555);

(statearr_14618[(7)] = inst_14539__$1);

return statearr_14618;
})();
var statearr_14619_15887 = state_14578__$1;
(statearr_14619_15887[(2)] = null);

(statearr_14619_15887[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14579 === (8))){
var inst_14560 = (state_14578[(2)]);
var state_14578__$1 = state_14578;
var statearr_14620_15888 = state_14578__$1;
(statearr_14620_15888[(2)] = inst_14560);

(statearr_14620_15888[(1)] = (5));


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
var cljs$core$async$state_machine__12183__auto__ = null;
var cljs$core$async$state_machine__12183__auto____0 = (function (){
var statearr_14621 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_14621[(0)] = cljs$core$async$state_machine__12183__auto__);

(statearr_14621[(1)] = (1));

return statearr_14621;
});
var cljs$core$async$state_machine__12183__auto____1 = (function (state_14578){
while(true){
var ret_value__12184__auto__ = (function (){try{while(true){
var result__12185__auto__ = switch__12182__auto__(state_14578);
if(cljs.core.keyword_identical_QMARK_(result__12185__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__12185__auto__;
}
break;
}
}catch (e14622){var ex__12186__auto__ = e14622;
var statearr_14623_15892 = state_14578;
(statearr_14623_15892[(2)] = ex__12186__auto__);


if(cljs.core.seq((state_14578[(4)]))){
var statearr_14624_15893 = state_14578;
(statearr_14624_15893[(1)] = cljs.core.first((state_14578[(4)])));

} else {
throw ex__12186__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__12184__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__15894 = state_14578;
state_14578 = G__15894;
continue;
} else {
return ret_value__12184__auto__;
}
break;
}
});
cljs$core$async$state_machine__12183__auto__ = function(state_14578){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__12183__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__12183__auto____1.call(this,state_14578);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__12183__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__12183__auto____0;
cljs$core$async$state_machine__12183__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__12183__auto____1;
return cljs$core$async$state_machine__12183__auto__;
})()
})();
var state__12784__auto__ = (function (){var statearr_14625 = f__12783__auto__();
(statearr_14625[(6)] = c__12782__auto___15866);

return statearr_14625;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__12784__auto__);
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
var G__14628 = arguments.length;
switch (G__14628) {
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
var c__12782__auto___15896 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__12783__auto__ = (function (){var switch__12182__auto__ = (function (state_14663){
var state_val_14664 = (state_14663[(1)]);
if((state_val_14664 === (7))){
var inst_14642 = (state_14663[(7)]);
var inst_14643 = (state_14663[(8)]);
var inst_14642__$1 = (state_14663[(2)]);
var inst_14643__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_14642__$1,(0),null);
var inst_14644 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_14642__$1,(1),null);
var inst_14645 = (inst_14643__$1 == null);
var state_14663__$1 = (function (){var statearr_14665 = state_14663;
(statearr_14665[(7)] = inst_14642__$1);

(statearr_14665[(8)] = inst_14643__$1);

(statearr_14665[(9)] = inst_14644);

return statearr_14665;
})();
if(cljs.core.truth_(inst_14645)){
var statearr_14666_15897 = state_14663__$1;
(statearr_14666_15897[(1)] = (8));

} else {
var statearr_14667_15898 = state_14663__$1;
(statearr_14667_15898[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14664 === (1))){
var inst_14629 = cljs.core.vec(chs);
var inst_14633 = inst_14629;
var state_14663__$1 = (function (){var statearr_14668 = state_14663;
(statearr_14668[(10)] = inst_14633);

return statearr_14668;
})();
var statearr_14669_15899 = state_14663__$1;
(statearr_14669_15899[(2)] = null);

(statearr_14669_15899[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14664 === (4))){
var inst_14633 = (state_14663[(10)]);
var state_14663__$1 = state_14663;
return cljs.core.async.ioc_alts_BANG_(state_14663__$1,(7),inst_14633);
} else {
if((state_val_14664 === (6))){
var inst_14659 = (state_14663[(2)]);
var state_14663__$1 = state_14663;
var statearr_14670_15900 = state_14663__$1;
(statearr_14670_15900[(2)] = inst_14659);

(statearr_14670_15900[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14664 === (3))){
var inst_14661 = (state_14663[(2)]);
var state_14663__$1 = state_14663;
return cljs.core.async.impl.ioc_helpers.return_chan(state_14663__$1,inst_14661);
} else {
if((state_val_14664 === (2))){
var inst_14633 = (state_14663[(10)]);
var inst_14635 = cljs.core.count(inst_14633);
var inst_14636 = (inst_14635 > (0));
var state_14663__$1 = state_14663;
if(cljs.core.truth_(inst_14636)){
var statearr_14672_15901 = state_14663__$1;
(statearr_14672_15901[(1)] = (4));

} else {
var statearr_14673_15902 = state_14663__$1;
(statearr_14673_15902[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14664 === (11))){
var inst_14633 = (state_14663[(10)]);
var inst_14652 = (state_14663[(2)]);
var tmp14671 = inst_14633;
var inst_14633__$1 = tmp14671;
var state_14663__$1 = (function (){var statearr_14674 = state_14663;
(statearr_14674[(11)] = inst_14652);

(statearr_14674[(10)] = inst_14633__$1);

return statearr_14674;
})();
var statearr_14675_15903 = state_14663__$1;
(statearr_14675_15903[(2)] = null);

(statearr_14675_15903[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14664 === (9))){
var inst_14643 = (state_14663[(8)]);
var state_14663__$1 = state_14663;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_14663__$1,(11),out,inst_14643);
} else {
if((state_val_14664 === (5))){
var inst_14657 = cljs.core.async.close_BANG_(out);
var state_14663__$1 = state_14663;
var statearr_14678_15904 = state_14663__$1;
(statearr_14678_15904[(2)] = inst_14657);

(statearr_14678_15904[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14664 === (10))){
var inst_14655 = (state_14663[(2)]);
var state_14663__$1 = state_14663;
var statearr_14679_15905 = state_14663__$1;
(statearr_14679_15905[(2)] = inst_14655);

(statearr_14679_15905[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14664 === (8))){
var inst_14633 = (state_14663[(10)]);
var inst_14642 = (state_14663[(7)]);
var inst_14643 = (state_14663[(8)]);
var inst_14644 = (state_14663[(9)]);
var inst_14647 = (function (){var cs = inst_14633;
var vec__14638 = inst_14642;
var v = inst_14643;
var c = inst_14644;
return (function (p1__14626_SHARP_){
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(c,p1__14626_SHARP_);
});
})();
var inst_14648 = cljs.core.filterv(inst_14647,inst_14633);
var inst_14633__$1 = inst_14648;
var state_14663__$1 = (function (){var statearr_14680 = state_14663;
(statearr_14680[(10)] = inst_14633__$1);

return statearr_14680;
})();
var statearr_14681_15909 = state_14663__$1;
(statearr_14681_15909[(2)] = null);

(statearr_14681_15909[(1)] = (2));


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
var cljs$core$async$state_machine__12183__auto__ = null;
var cljs$core$async$state_machine__12183__auto____0 = (function (){
var statearr_14682 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_14682[(0)] = cljs$core$async$state_machine__12183__auto__);

(statearr_14682[(1)] = (1));

return statearr_14682;
});
var cljs$core$async$state_machine__12183__auto____1 = (function (state_14663){
while(true){
var ret_value__12184__auto__ = (function (){try{while(true){
var result__12185__auto__ = switch__12182__auto__(state_14663);
if(cljs.core.keyword_identical_QMARK_(result__12185__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__12185__auto__;
}
break;
}
}catch (e14685){var ex__12186__auto__ = e14685;
var statearr_14686_15910 = state_14663;
(statearr_14686_15910[(2)] = ex__12186__auto__);


if(cljs.core.seq((state_14663[(4)]))){
var statearr_14687_15911 = state_14663;
(statearr_14687_15911[(1)] = cljs.core.first((state_14663[(4)])));

} else {
throw ex__12186__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__12184__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__15912 = state_14663;
state_14663 = G__15912;
continue;
} else {
return ret_value__12184__auto__;
}
break;
}
});
cljs$core$async$state_machine__12183__auto__ = function(state_14663){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__12183__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__12183__auto____1.call(this,state_14663);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__12183__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__12183__auto____0;
cljs$core$async$state_machine__12183__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__12183__auto____1;
return cljs$core$async$state_machine__12183__auto__;
})()
})();
var state__12784__auto__ = (function (){var statearr_14691 = f__12783__auto__();
(statearr_14691[(6)] = c__12782__auto___15896);

return statearr_14691;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__12784__auto__);
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
var G__14695 = arguments.length;
switch (G__14695) {
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
var c__12782__auto___15921 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__12783__auto__ = (function (){var switch__12182__auto__ = (function (state_14729){
var state_val_14730 = (state_14729[(1)]);
if((state_val_14730 === (7))){
var inst_14709 = (state_14729[(7)]);
var inst_14709__$1 = (state_14729[(2)]);
var inst_14710 = (inst_14709__$1 == null);
var inst_14711 = cljs.core.not(inst_14710);
var state_14729__$1 = (function (){var statearr_14733 = state_14729;
(statearr_14733[(7)] = inst_14709__$1);

return statearr_14733;
})();
if(inst_14711){
var statearr_14734_15922 = state_14729__$1;
(statearr_14734_15922[(1)] = (8));

} else {
var statearr_14735_15923 = state_14729__$1;
(statearr_14735_15923[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14730 === (1))){
var inst_14700 = (0);
var state_14729__$1 = (function (){var statearr_14736 = state_14729;
(statearr_14736[(8)] = inst_14700);

return statearr_14736;
})();
var statearr_14737_15930 = state_14729__$1;
(statearr_14737_15930[(2)] = null);

(statearr_14737_15930[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14730 === (4))){
var state_14729__$1 = state_14729;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_14729__$1,(7),ch);
} else {
if((state_val_14730 === (6))){
var inst_14724 = (state_14729[(2)]);
var state_14729__$1 = state_14729;
var statearr_14741_15931 = state_14729__$1;
(statearr_14741_15931[(2)] = inst_14724);

(statearr_14741_15931[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14730 === (3))){
var inst_14726 = (state_14729[(2)]);
var inst_14727 = cljs.core.async.close_BANG_(out);
var state_14729__$1 = (function (){var statearr_14742 = state_14729;
(statearr_14742[(9)] = inst_14726);

return statearr_14742;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_14729__$1,inst_14727);
} else {
if((state_val_14730 === (2))){
var inst_14700 = (state_14729[(8)]);
var inst_14705 = (inst_14700 < n);
var state_14729__$1 = state_14729;
if(cljs.core.truth_(inst_14705)){
var statearr_14743_15932 = state_14729__$1;
(statearr_14743_15932[(1)] = (4));

} else {
var statearr_14744_15933 = state_14729__$1;
(statearr_14744_15933[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14730 === (11))){
var inst_14700 = (state_14729[(8)]);
var inst_14714 = (state_14729[(2)]);
var inst_14717 = (inst_14700 + (1));
var inst_14700__$1 = inst_14717;
var state_14729__$1 = (function (){var statearr_14745 = state_14729;
(statearr_14745[(10)] = inst_14714);

(statearr_14745[(8)] = inst_14700__$1);

return statearr_14745;
})();
var statearr_14746_15934 = state_14729__$1;
(statearr_14746_15934[(2)] = null);

(statearr_14746_15934[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14730 === (9))){
var state_14729__$1 = state_14729;
var statearr_14747_15935 = state_14729__$1;
(statearr_14747_15935[(2)] = null);

(statearr_14747_15935[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14730 === (5))){
var state_14729__$1 = state_14729;
var statearr_14748_15936 = state_14729__$1;
(statearr_14748_15936[(2)] = null);

(statearr_14748_15936[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14730 === (10))){
var inst_14721 = (state_14729[(2)]);
var state_14729__$1 = state_14729;
var statearr_14749_15937 = state_14729__$1;
(statearr_14749_15937[(2)] = inst_14721);

(statearr_14749_15937[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14730 === (8))){
var inst_14709 = (state_14729[(7)]);
var state_14729__$1 = state_14729;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_14729__$1,(11),out,inst_14709);
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
var cljs$core$async$state_machine__12183__auto__ = null;
var cljs$core$async$state_machine__12183__auto____0 = (function (){
var statearr_14750 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_14750[(0)] = cljs$core$async$state_machine__12183__auto__);

(statearr_14750[(1)] = (1));

return statearr_14750;
});
var cljs$core$async$state_machine__12183__auto____1 = (function (state_14729){
while(true){
var ret_value__12184__auto__ = (function (){try{while(true){
var result__12185__auto__ = switch__12182__auto__(state_14729);
if(cljs.core.keyword_identical_QMARK_(result__12185__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__12185__auto__;
}
break;
}
}catch (e14751){var ex__12186__auto__ = e14751;
var statearr_14752_15941 = state_14729;
(statearr_14752_15941[(2)] = ex__12186__auto__);


if(cljs.core.seq((state_14729[(4)]))){
var statearr_14753_15942 = state_14729;
(statearr_14753_15942[(1)] = cljs.core.first((state_14729[(4)])));

} else {
throw ex__12186__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__12184__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__15943 = state_14729;
state_14729 = G__15943;
continue;
} else {
return ret_value__12184__auto__;
}
break;
}
});
cljs$core$async$state_machine__12183__auto__ = function(state_14729){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__12183__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__12183__auto____1.call(this,state_14729);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__12183__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__12183__auto____0;
cljs$core$async$state_machine__12183__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__12183__auto____1;
return cljs$core$async$state_machine__12183__auto__;
})()
})();
var state__12784__auto__ = (function (){var statearr_14760 = f__12783__auto__();
(statearr_14760[(6)] = c__12782__auto___15921);

return statearr_14760;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__12784__auto__);
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
cljs.core.async.t_cljs$core$async14768 = (function (f,ch,meta14763,_,fn1,meta14769){
this.f = f;
this.ch = ch;
this.meta14763 = meta14763;
this._ = _;
this.fn1 = fn1;
this.meta14769 = meta14769;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async14768.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_14770,meta14769__$1){
var self__ = this;
var _14770__$1 = this;
return (new cljs.core.async.t_cljs$core$async14768(self__.f,self__.ch,self__.meta14763,self__._,self__.fn1,meta14769__$1));
}));

(cljs.core.async.t_cljs$core$async14768.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_14770){
var self__ = this;
var _14770__$1 = this;
return self__.meta14769;
}));

(cljs.core.async.t_cljs$core$async14768.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async14768.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (___$1){
var self__ = this;
var ___$2 = this;
return cljs.core.async.impl.protocols.active_QMARK_(self__.fn1);
}));

(cljs.core.async.t_cljs$core$async14768.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (___$1){
var self__ = this;
var ___$2 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async14768.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (___$1){
var self__ = this;
var ___$2 = this;
var f1 = cljs.core.async.impl.protocols.commit(self__.fn1);
return (function (p1__14761_SHARP_){
var G__14771 = (((p1__14761_SHARP_ == null))?null:(self__.f.cljs$core$IFn$_invoke$arity$1 ? self__.f.cljs$core$IFn$_invoke$arity$1(p1__14761_SHARP_) : self__.f.call(null,p1__14761_SHARP_)));
return (f1.cljs$core$IFn$_invoke$arity$1 ? f1.cljs$core$IFn$_invoke$arity$1(G__14771) : f1.call(null,G__14771));
});
}));

(cljs.core.async.t_cljs$core$async14768.getBasis = (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta14763","meta14763",687422939,null),cljs.core.with_meta(new cljs.core.Symbol(null,"_","_",-1201019570,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol("cljs.core.async","t_cljs$core$async14762","cljs.core.async/t_cljs$core$async14762",-1341966499,null)], null)),new cljs.core.Symbol(null,"fn1","fn1",895834444,null),new cljs.core.Symbol(null,"meta14769","meta14769",1259237757,null)], null);
}));

(cljs.core.async.t_cljs$core$async14768.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async14768.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async14768");

(cljs.core.async.t_cljs$core$async14768.cljs$lang$ctorPrWriter = (function (this__5310__auto__,writer__5311__auto__,opt__5312__auto__){
return cljs.core._write(writer__5311__auto__,"cljs.core.async/t_cljs$core$async14768");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async14768.
 */
cljs.core.async.__GT_t_cljs$core$async14768 = (function cljs$core$async$__GT_t_cljs$core$async14768(f,ch,meta14763,_,fn1,meta14769){
return (new cljs.core.async.t_cljs$core$async14768(f,ch,meta14763,_,fn1,meta14769));
});



/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async14762 = (function (f,ch,meta14763){
this.f = f;
this.ch = ch;
this.meta14763 = meta14763;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async14762.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_14764,meta14763__$1){
var self__ = this;
var _14764__$1 = this;
return (new cljs.core.async.t_cljs$core$async14762(self__.f,self__.ch,meta14763__$1));
}));

(cljs.core.async.t_cljs$core$async14762.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_14764){
var self__ = this;
var _14764__$1 = this;
return self__.meta14763;
}));

(cljs.core.async.t_cljs$core$async14762.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async14762.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async14762.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async14762.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async14762.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
var ret = cljs.core.async.impl.protocols.take_BANG_(self__.ch,(new cljs.core.async.t_cljs$core$async14768(self__.f,self__.ch,self__.meta14763,___$1,fn1,cljs.core.PersistentArrayMap.EMPTY)));
if(cljs.core.truth_((function (){var and__5023__auto__ = ret;
if(cljs.core.truth_(and__5023__auto__)){
return (!((cljs.core.deref(ret) == null)));
} else {
return and__5023__auto__;
}
})())){
return cljs.core.async.impl.channels.box((function (){var G__14778 = cljs.core.deref(ret);
return (self__.f.cljs$core$IFn$_invoke$arity$1 ? self__.f.cljs$core$IFn$_invoke$arity$1(G__14778) : self__.f.call(null,G__14778));
})());
} else {
return ret;
}
}));

(cljs.core.async.t_cljs$core$async14762.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async14762.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_(self__.ch,val,fn1);
}));

(cljs.core.async.t_cljs$core$async14762.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta14763","meta14763",687422939,null)], null);
}));

(cljs.core.async.t_cljs$core$async14762.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async14762.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async14762");

(cljs.core.async.t_cljs$core$async14762.cljs$lang$ctorPrWriter = (function (this__5310__auto__,writer__5311__auto__,opt__5312__auto__){
return cljs.core._write(writer__5311__auto__,"cljs.core.async/t_cljs$core$async14762");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async14762.
 */
cljs.core.async.__GT_t_cljs$core$async14762 = (function cljs$core$async$__GT_t_cljs$core$async14762(f,ch,meta14763){
return (new cljs.core.async.t_cljs$core$async14762(f,ch,meta14763));
});


/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_LT_ = (function cljs$core$async$map_LT_(f,ch){
return (new cljs.core.async.t_cljs$core$async14762(f,ch,cljs.core.PersistentArrayMap.EMPTY));
});

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async14789 = (function (f,ch,meta14790){
this.f = f;
this.ch = ch;
this.meta14790 = meta14790;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async14789.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_14791,meta14790__$1){
var self__ = this;
var _14791__$1 = this;
return (new cljs.core.async.t_cljs$core$async14789(self__.f,self__.ch,meta14790__$1));
}));

(cljs.core.async.t_cljs$core$async14789.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_14791){
var self__ = this;
var _14791__$1 = this;
return self__.meta14790;
}));

(cljs.core.async.t_cljs$core$async14789.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async14789.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async14789.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async14789.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_(self__.ch,fn1);
}));

(cljs.core.async.t_cljs$core$async14789.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async14789.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_(self__.ch,(self__.f.cljs$core$IFn$_invoke$arity$1 ? self__.f.cljs$core$IFn$_invoke$arity$1(val) : self__.f.call(null,val)),fn1);
}));

(cljs.core.async.t_cljs$core$async14789.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta14790","meta14790",-1063721191,null)], null);
}));

(cljs.core.async.t_cljs$core$async14789.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async14789.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async14789");

(cljs.core.async.t_cljs$core$async14789.cljs$lang$ctorPrWriter = (function (this__5310__auto__,writer__5311__auto__,opt__5312__auto__){
return cljs.core._write(writer__5311__auto__,"cljs.core.async/t_cljs$core$async14789");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async14789.
 */
cljs.core.async.__GT_t_cljs$core$async14789 = (function cljs$core$async$__GT_t_cljs$core$async14789(f,ch,meta14790){
return (new cljs.core.async.t_cljs$core$async14789(f,ch,meta14790));
});


/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_GT_ = (function cljs$core$async$map_GT_(f,ch){
return (new cljs.core.async.t_cljs$core$async14789(f,ch,cljs.core.PersistentArrayMap.EMPTY));
});

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async14805 = (function (p,ch,meta14806){
this.p = p;
this.ch = ch;
this.meta14806 = meta14806;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async14805.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_14807,meta14806__$1){
var self__ = this;
var _14807__$1 = this;
return (new cljs.core.async.t_cljs$core$async14805(self__.p,self__.ch,meta14806__$1));
}));

(cljs.core.async.t_cljs$core$async14805.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_14807){
var self__ = this;
var _14807__$1 = this;
return self__.meta14806;
}));

(cljs.core.async.t_cljs$core$async14805.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async14805.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async14805.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async14805.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async14805.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_(self__.ch,fn1);
}));

(cljs.core.async.t_cljs$core$async14805.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async14805.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_((self__.p.cljs$core$IFn$_invoke$arity$1 ? self__.p.cljs$core$IFn$_invoke$arity$1(val) : self__.p.call(null,val)))){
return cljs.core.async.impl.protocols.put_BANG_(self__.ch,val,fn1);
} else {
return cljs.core.async.impl.channels.box(cljs.core.not(cljs.core.async.impl.protocols.closed_QMARK_(self__.ch)));
}
}));

(cljs.core.async.t_cljs$core$async14805.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"p","p",1791580836,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta14806","meta14806",533858164,null)], null);
}));

(cljs.core.async.t_cljs$core$async14805.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async14805.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async14805");

(cljs.core.async.t_cljs$core$async14805.cljs$lang$ctorPrWriter = (function (this__5310__auto__,writer__5311__auto__,opt__5312__auto__){
return cljs.core._write(writer__5311__auto__,"cljs.core.async/t_cljs$core$async14805");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async14805.
 */
cljs.core.async.__GT_t_cljs$core$async14805 = (function cljs$core$async$__GT_t_cljs$core$async14805(p,ch,meta14806){
return (new cljs.core.async.t_cljs$core$async14805(p,ch,meta14806));
});


/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_GT_ = (function cljs$core$async$filter_GT_(p,ch){
return (new cljs.core.async.t_cljs$core$async14805(p,ch,cljs.core.PersistentArrayMap.EMPTY));
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
var G__14831 = arguments.length;
switch (G__14831) {
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
var c__12782__auto___15949 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__12783__auto__ = (function (){var switch__12182__auto__ = (function (state_14852){
var state_val_14853 = (state_14852[(1)]);
if((state_val_14853 === (7))){
var inst_14848 = (state_14852[(2)]);
var state_14852__$1 = state_14852;
var statearr_14854_15950 = state_14852__$1;
(statearr_14854_15950[(2)] = inst_14848);

(statearr_14854_15950[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14853 === (1))){
var state_14852__$1 = state_14852;
var statearr_14855_15951 = state_14852__$1;
(statearr_14855_15951[(2)] = null);

(statearr_14855_15951[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14853 === (4))){
var inst_14834 = (state_14852[(7)]);
var inst_14834__$1 = (state_14852[(2)]);
var inst_14835 = (inst_14834__$1 == null);
var state_14852__$1 = (function (){var statearr_14856 = state_14852;
(statearr_14856[(7)] = inst_14834__$1);

return statearr_14856;
})();
if(cljs.core.truth_(inst_14835)){
var statearr_14857_15952 = state_14852__$1;
(statearr_14857_15952[(1)] = (5));

} else {
var statearr_14858_15953 = state_14852__$1;
(statearr_14858_15953[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14853 === (6))){
var inst_14834 = (state_14852[(7)]);
var inst_14839 = (p.cljs$core$IFn$_invoke$arity$1 ? p.cljs$core$IFn$_invoke$arity$1(inst_14834) : p.call(null,inst_14834));
var state_14852__$1 = state_14852;
if(cljs.core.truth_(inst_14839)){
var statearr_14859_15954 = state_14852__$1;
(statearr_14859_15954[(1)] = (8));

} else {
var statearr_14860_15955 = state_14852__$1;
(statearr_14860_15955[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14853 === (3))){
var inst_14850 = (state_14852[(2)]);
var state_14852__$1 = state_14852;
return cljs.core.async.impl.ioc_helpers.return_chan(state_14852__$1,inst_14850);
} else {
if((state_val_14853 === (2))){
var state_14852__$1 = state_14852;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_14852__$1,(4),ch);
} else {
if((state_val_14853 === (11))){
var inst_14842 = (state_14852[(2)]);
var state_14852__$1 = state_14852;
var statearr_14861_15956 = state_14852__$1;
(statearr_14861_15956[(2)] = inst_14842);

(statearr_14861_15956[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14853 === (9))){
var state_14852__$1 = state_14852;
var statearr_14862_15957 = state_14852__$1;
(statearr_14862_15957[(2)] = null);

(statearr_14862_15957[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14853 === (5))){
var inst_14837 = cljs.core.async.close_BANG_(out);
var state_14852__$1 = state_14852;
var statearr_14863_15958 = state_14852__$1;
(statearr_14863_15958[(2)] = inst_14837);

(statearr_14863_15958[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14853 === (10))){
var inst_14845 = (state_14852[(2)]);
var state_14852__$1 = (function (){var statearr_14864 = state_14852;
(statearr_14864[(8)] = inst_14845);

return statearr_14864;
})();
var statearr_14865_15960 = state_14852__$1;
(statearr_14865_15960[(2)] = null);

(statearr_14865_15960[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14853 === (8))){
var inst_14834 = (state_14852[(7)]);
var state_14852__$1 = state_14852;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_14852__$1,(11),out,inst_14834);
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
var cljs$core$async$state_machine__12183__auto__ = null;
var cljs$core$async$state_machine__12183__auto____0 = (function (){
var statearr_14866 = [null,null,null,null,null,null,null,null,null];
(statearr_14866[(0)] = cljs$core$async$state_machine__12183__auto__);

(statearr_14866[(1)] = (1));

return statearr_14866;
});
var cljs$core$async$state_machine__12183__auto____1 = (function (state_14852){
while(true){
var ret_value__12184__auto__ = (function (){try{while(true){
var result__12185__auto__ = switch__12182__auto__(state_14852);
if(cljs.core.keyword_identical_QMARK_(result__12185__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__12185__auto__;
}
break;
}
}catch (e14867){var ex__12186__auto__ = e14867;
var statearr_14868_15964 = state_14852;
(statearr_14868_15964[(2)] = ex__12186__auto__);


if(cljs.core.seq((state_14852[(4)]))){
var statearr_14869_15965 = state_14852;
(statearr_14869_15965[(1)] = cljs.core.first((state_14852[(4)])));

} else {
throw ex__12186__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__12184__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__15966 = state_14852;
state_14852 = G__15966;
continue;
} else {
return ret_value__12184__auto__;
}
break;
}
});
cljs$core$async$state_machine__12183__auto__ = function(state_14852){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__12183__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__12183__auto____1.call(this,state_14852);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__12183__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__12183__auto____0;
cljs$core$async$state_machine__12183__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__12183__auto____1;
return cljs$core$async$state_machine__12183__auto__;
})()
})();
var state__12784__auto__ = (function (){var statearr_14870 = f__12783__auto__();
(statearr_14870[(6)] = c__12782__auto___15949);

return statearr_14870;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__12784__auto__);
}));


return out;
}));

(cljs.core.async.filter_LT_.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_LT_ = (function cljs$core$async$remove_LT_(var_args){
var G__14872 = arguments.length;
switch (G__14872) {
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
var c__12782__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__12783__auto__ = (function (){var switch__12182__auto__ = (function (state_14946){
var state_val_14947 = (state_14946[(1)]);
if((state_val_14947 === (7))){
var inst_14942 = (state_14946[(2)]);
var state_14946__$1 = state_14946;
var statearr_14950_15971 = state_14946__$1;
(statearr_14950_15971[(2)] = inst_14942);

(statearr_14950_15971[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14947 === (20))){
var inst_14912 = (state_14946[(7)]);
var inst_14923 = (state_14946[(2)]);
var inst_14924 = cljs.core.next(inst_14912);
var inst_14898 = inst_14924;
var inst_14899 = null;
var inst_14900 = (0);
var inst_14901 = (0);
var state_14946__$1 = (function (){var statearr_14951 = state_14946;
(statearr_14951[(8)] = inst_14923);

(statearr_14951[(9)] = inst_14898);

(statearr_14951[(10)] = inst_14899);

(statearr_14951[(11)] = inst_14900);

(statearr_14951[(12)] = inst_14901);

return statearr_14951;
})();
var statearr_14952_15972 = state_14946__$1;
(statearr_14952_15972[(2)] = null);

(statearr_14952_15972[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14947 === (1))){
var state_14946__$1 = state_14946;
var statearr_14953_15973 = state_14946__$1;
(statearr_14953_15973[(2)] = null);

(statearr_14953_15973[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14947 === (4))){
var inst_14887 = (state_14946[(13)]);
var inst_14887__$1 = (state_14946[(2)]);
var inst_14888 = (inst_14887__$1 == null);
var state_14946__$1 = (function (){var statearr_14954 = state_14946;
(statearr_14954[(13)] = inst_14887__$1);

return statearr_14954;
})();
if(cljs.core.truth_(inst_14888)){
var statearr_14955_15974 = state_14946__$1;
(statearr_14955_15974[(1)] = (5));

} else {
var statearr_14956_15975 = state_14946__$1;
(statearr_14956_15975[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14947 === (15))){
var state_14946__$1 = state_14946;
var statearr_14960_15976 = state_14946__$1;
(statearr_14960_15976[(2)] = null);

(statearr_14960_15976[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14947 === (21))){
var state_14946__$1 = state_14946;
var statearr_14962_15977 = state_14946__$1;
(statearr_14962_15977[(2)] = null);

(statearr_14962_15977[(1)] = (23));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14947 === (13))){
var inst_14901 = (state_14946[(12)]);
var inst_14898 = (state_14946[(9)]);
var inst_14899 = (state_14946[(10)]);
var inst_14900 = (state_14946[(11)]);
var inst_14908 = (state_14946[(2)]);
var inst_14909 = (inst_14901 + (1));
var tmp14957 = inst_14898;
var tmp14958 = inst_14899;
var tmp14959 = inst_14900;
var inst_14898__$1 = tmp14957;
var inst_14899__$1 = tmp14958;
var inst_14900__$1 = tmp14959;
var inst_14901__$1 = inst_14909;
var state_14946__$1 = (function (){var statearr_14973 = state_14946;
(statearr_14973[(14)] = inst_14908);

(statearr_14973[(9)] = inst_14898__$1);

(statearr_14973[(10)] = inst_14899__$1);

(statearr_14973[(11)] = inst_14900__$1);

(statearr_14973[(12)] = inst_14901__$1);

return statearr_14973;
})();
var statearr_14974_15978 = state_14946__$1;
(statearr_14974_15978[(2)] = null);

(statearr_14974_15978[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14947 === (22))){
var state_14946__$1 = state_14946;
var statearr_14975_15979 = state_14946__$1;
(statearr_14975_15979[(2)] = null);

(statearr_14975_15979[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14947 === (6))){
var inst_14887 = (state_14946[(13)]);
var inst_14896 = (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(inst_14887) : f.call(null,inst_14887));
var inst_14897 = cljs.core.seq(inst_14896);
var inst_14898 = inst_14897;
var inst_14899 = null;
var inst_14900 = (0);
var inst_14901 = (0);
var state_14946__$1 = (function (){var statearr_14976 = state_14946;
(statearr_14976[(9)] = inst_14898);

(statearr_14976[(10)] = inst_14899);

(statearr_14976[(11)] = inst_14900);

(statearr_14976[(12)] = inst_14901);

return statearr_14976;
})();
var statearr_14977_15982 = state_14946__$1;
(statearr_14977_15982[(2)] = null);

(statearr_14977_15982[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14947 === (17))){
var inst_14912 = (state_14946[(7)]);
var inst_14916 = cljs.core.chunk_first(inst_14912);
var inst_14917 = cljs.core.chunk_rest(inst_14912);
var inst_14918 = cljs.core.count(inst_14916);
var inst_14898 = inst_14917;
var inst_14899 = inst_14916;
var inst_14900 = inst_14918;
var inst_14901 = (0);
var state_14946__$1 = (function (){var statearr_14978 = state_14946;
(statearr_14978[(9)] = inst_14898);

(statearr_14978[(10)] = inst_14899);

(statearr_14978[(11)] = inst_14900);

(statearr_14978[(12)] = inst_14901);

return statearr_14978;
})();
var statearr_14980_15983 = state_14946__$1;
(statearr_14980_15983[(2)] = null);

(statearr_14980_15983[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14947 === (3))){
var inst_14944 = (state_14946[(2)]);
var state_14946__$1 = state_14946;
return cljs.core.async.impl.ioc_helpers.return_chan(state_14946__$1,inst_14944);
} else {
if((state_val_14947 === (12))){
var inst_14932 = (state_14946[(2)]);
var state_14946__$1 = state_14946;
var statearr_14981_15984 = state_14946__$1;
(statearr_14981_15984[(2)] = inst_14932);

(statearr_14981_15984[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14947 === (2))){
var state_14946__$1 = state_14946;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_14946__$1,(4),in$);
} else {
if((state_val_14947 === (23))){
var inst_14940 = (state_14946[(2)]);
var state_14946__$1 = state_14946;
var statearr_14983_15989 = state_14946__$1;
(statearr_14983_15989[(2)] = inst_14940);

(statearr_14983_15989[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14947 === (19))){
var inst_14927 = (state_14946[(2)]);
var state_14946__$1 = state_14946;
var statearr_14984_15990 = state_14946__$1;
(statearr_14984_15990[(2)] = inst_14927);

(statearr_14984_15990[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14947 === (11))){
var inst_14898 = (state_14946[(9)]);
var inst_14912 = (state_14946[(7)]);
var inst_14912__$1 = cljs.core.seq(inst_14898);
var state_14946__$1 = (function (){var statearr_14985 = state_14946;
(statearr_14985[(7)] = inst_14912__$1);

return statearr_14985;
})();
if(inst_14912__$1){
var statearr_14986_15991 = state_14946__$1;
(statearr_14986_15991[(1)] = (14));

} else {
var statearr_14987_15992 = state_14946__$1;
(statearr_14987_15992[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14947 === (9))){
var inst_14934 = (state_14946[(2)]);
var inst_14935 = cljs.core.async.impl.protocols.closed_QMARK_(out);
var state_14946__$1 = (function (){var statearr_14988 = state_14946;
(statearr_14988[(15)] = inst_14934);

return statearr_14988;
})();
if(cljs.core.truth_(inst_14935)){
var statearr_14989_15996 = state_14946__$1;
(statearr_14989_15996[(1)] = (21));

} else {
var statearr_14990_15997 = state_14946__$1;
(statearr_14990_15997[(1)] = (22));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14947 === (5))){
var inst_14890 = cljs.core.async.close_BANG_(out);
var state_14946__$1 = state_14946;
var statearr_14991_15998 = state_14946__$1;
(statearr_14991_15998[(2)] = inst_14890);

(statearr_14991_15998[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14947 === (14))){
var inst_14912 = (state_14946[(7)]);
var inst_14914 = cljs.core.chunked_seq_QMARK_(inst_14912);
var state_14946__$1 = state_14946;
if(inst_14914){
var statearr_14995_15999 = state_14946__$1;
(statearr_14995_15999[(1)] = (17));

} else {
var statearr_14996_16000 = state_14946__$1;
(statearr_14996_16000[(1)] = (18));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14947 === (16))){
var inst_14930 = (state_14946[(2)]);
var state_14946__$1 = state_14946;
var statearr_15001_16001 = state_14946__$1;
(statearr_15001_16001[(2)] = inst_14930);

(statearr_15001_16001[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14947 === (10))){
var inst_14899 = (state_14946[(10)]);
var inst_14901 = (state_14946[(12)]);
var inst_14906 = cljs.core._nth(inst_14899,inst_14901);
var state_14946__$1 = state_14946;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_14946__$1,(13),out,inst_14906);
} else {
if((state_val_14947 === (18))){
var inst_14912 = (state_14946[(7)]);
var inst_14921 = cljs.core.first(inst_14912);
var state_14946__$1 = state_14946;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_14946__$1,(20),out,inst_14921);
} else {
if((state_val_14947 === (8))){
var inst_14901 = (state_14946[(12)]);
var inst_14900 = (state_14946[(11)]);
var inst_14903 = (inst_14901 < inst_14900);
var inst_14904 = inst_14903;
var state_14946__$1 = state_14946;
if(cljs.core.truth_(inst_14904)){
var statearr_15008_16002 = state_14946__$1;
(statearr_15008_16002[(1)] = (10));

} else {
var statearr_15009_16003 = state_14946__$1;
(statearr_15009_16003[(1)] = (11));

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
var cljs$core$async$mapcat_STAR__$_state_machine__12183__auto__ = null;
var cljs$core$async$mapcat_STAR__$_state_machine__12183__auto____0 = (function (){
var statearr_15013 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_15013[(0)] = cljs$core$async$mapcat_STAR__$_state_machine__12183__auto__);

(statearr_15013[(1)] = (1));

return statearr_15013;
});
var cljs$core$async$mapcat_STAR__$_state_machine__12183__auto____1 = (function (state_14946){
while(true){
var ret_value__12184__auto__ = (function (){try{while(true){
var result__12185__auto__ = switch__12182__auto__(state_14946);
if(cljs.core.keyword_identical_QMARK_(result__12185__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__12185__auto__;
}
break;
}
}catch (e15014){var ex__12186__auto__ = e15014;
var statearr_15015_16004 = state_14946;
(statearr_15015_16004[(2)] = ex__12186__auto__);


if(cljs.core.seq((state_14946[(4)]))){
var statearr_15016_16005 = state_14946;
(statearr_15016_16005[(1)] = cljs.core.first((state_14946[(4)])));

} else {
throw ex__12186__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__12184__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__16007 = state_14946;
state_14946 = G__16007;
continue;
} else {
return ret_value__12184__auto__;
}
break;
}
});
cljs$core$async$mapcat_STAR__$_state_machine__12183__auto__ = function(state_14946){
switch(arguments.length){
case 0:
return cljs$core$async$mapcat_STAR__$_state_machine__12183__auto____0.call(this);
case 1:
return cljs$core$async$mapcat_STAR__$_state_machine__12183__auto____1.call(this,state_14946);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mapcat_STAR__$_state_machine__12183__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mapcat_STAR__$_state_machine__12183__auto____0;
cljs$core$async$mapcat_STAR__$_state_machine__12183__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mapcat_STAR__$_state_machine__12183__auto____1;
return cljs$core$async$mapcat_STAR__$_state_machine__12183__auto__;
})()
})();
var state__12784__auto__ = (function (){var statearr_15017 = f__12783__auto__();
(statearr_15017[(6)] = c__12782__auto__);

return statearr_15017;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__12784__auto__);
}));

return c__12782__auto__;
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_LT_ = (function cljs$core$async$mapcat_LT_(var_args){
var G__15019 = arguments.length;
switch (G__15019) {
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
var G__15021 = arguments.length;
switch (G__15021) {
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
var G__15025 = arguments.length;
switch (G__15025) {
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
var c__12782__auto___16015 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__12783__auto__ = (function (){var switch__12182__auto__ = (function (state_15050){
var state_val_15051 = (state_15050[(1)]);
if((state_val_15051 === (7))){
var inst_15045 = (state_15050[(2)]);
var state_15050__$1 = state_15050;
var statearr_15052_16016 = state_15050__$1;
(statearr_15052_16016[(2)] = inst_15045);

(statearr_15052_16016[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15051 === (1))){
var inst_15027 = null;
var state_15050__$1 = (function (){var statearr_15053 = state_15050;
(statearr_15053[(7)] = inst_15027);

return statearr_15053;
})();
var statearr_15054_16017 = state_15050__$1;
(statearr_15054_16017[(2)] = null);

(statearr_15054_16017[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15051 === (4))){
var inst_15030 = (state_15050[(8)]);
var inst_15030__$1 = (state_15050[(2)]);
var inst_15031 = (inst_15030__$1 == null);
var inst_15032 = cljs.core.not(inst_15031);
var state_15050__$1 = (function (){var statearr_15055 = state_15050;
(statearr_15055[(8)] = inst_15030__$1);

return statearr_15055;
})();
if(inst_15032){
var statearr_15065_16018 = state_15050__$1;
(statearr_15065_16018[(1)] = (5));

} else {
var statearr_15066_16019 = state_15050__$1;
(statearr_15066_16019[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15051 === (6))){
var state_15050__$1 = state_15050;
var statearr_15067_16020 = state_15050__$1;
(statearr_15067_16020[(2)] = null);

(statearr_15067_16020[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15051 === (3))){
var inst_15047 = (state_15050[(2)]);
var inst_15048 = cljs.core.async.close_BANG_(out);
var state_15050__$1 = (function (){var statearr_15068 = state_15050;
(statearr_15068[(9)] = inst_15047);

return statearr_15068;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_15050__$1,inst_15048);
} else {
if((state_val_15051 === (2))){
var state_15050__$1 = state_15050;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_15050__$1,(4),ch);
} else {
if((state_val_15051 === (11))){
var inst_15030 = (state_15050[(8)]);
var inst_15039 = (state_15050[(2)]);
var inst_15027 = inst_15030;
var state_15050__$1 = (function (){var statearr_15069 = state_15050;
(statearr_15069[(10)] = inst_15039);

(statearr_15069[(7)] = inst_15027);

return statearr_15069;
})();
var statearr_15070_16021 = state_15050__$1;
(statearr_15070_16021[(2)] = null);

(statearr_15070_16021[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15051 === (9))){
var inst_15030 = (state_15050[(8)]);
var state_15050__$1 = state_15050;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_15050__$1,(11),out,inst_15030);
} else {
if((state_val_15051 === (5))){
var inst_15030 = (state_15050[(8)]);
var inst_15027 = (state_15050[(7)]);
var inst_15034 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_15030,inst_15027);
var state_15050__$1 = state_15050;
if(inst_15034){
var statearr_15072_16022 = state_15050__$1;
(statearr_15072_16022[(1)] = (8));

} else {
var statearr_15080_16023 = state_15050__$1;
(statearr_15080_16023[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15051 === (10))){
var inst_15042 = (state_15050[(2)]);
var state_15050__$1 = state_15050;
var statearr_15081_16024 = state_15050__$1;
(statearr_15081_16024[(2)] = inst_15042);

(statearr_15081_16024[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15051 === (8))){
var inst_15027 = (state_15050[(7)]);
var tmp15071 = inst_15027;
var inst_15027__$1 = tmp15071;
var state_15050__$1 = (function (){var statearr_15082 = state_15050;
(statearr_15082[(7)] = inst_15027__$1);

return statearr_15082;
})();
var statearr_15083_16025 = state_15050__$1;
(statearr_15083_16025[(2)] = null);

(statearr_15083_16025[(1)] = (2));


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
var cljs$core$async$state_machine__12183__auto__ = null;
var cljs$core$async$state_machine__12183__auto____0 = (function (){
var statearr_15084 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_15084[(0)] = cljs$core$async$state_machine__12183__auto__);

(statearr_15084[(1)] = (1));

return statearr_15084;
});
var cljs$core$async$state_machine__12183__auto____1 = (function (state_15050){
while(true){
var ret_value__12184__auto__ = (function (){try{while(true){
var result__12185__auto__ = switch__12182__auto__(state_15050);
if(cljs.core.keyword_identical_QMARK_(result__12185__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__12185__auto__;
}
break;
}
}catch (e15085){var ex__12186__auto__ = e15085;
var statearr_15086_16027 = state_15050;
(statearr_15086_16027[(2)] = ex__12186__auto__);


if(cljs.core.seq((state_15050[(4)]))){
var statearr_15087_16031 = state_15050;
(statearr_15087_16031[(1)] = cljs.core.first((state_15050[(4)])));

} else {
throw ex__12186__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__12184__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__16032 = state_15050;
state_15050 = G__16032;
continue;
} else {
return ret_value__12184__auto__;
}
break;
}
});
cljs$core$async$state_machine__12183__auto__ = function(state_15050){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__12183__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__12183__auto____1.call(this,state_15050);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__12183__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__12183__auto____0;
cljs$core$async$state_machine__12183__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__12183__auto____1;
return cljs$core$async$state_machine__12183__auto__;
})()
})();
var state__12784__auto__ = (function (){var statearr_15088 = f__12783__auto__();
(statearr_15088[(6)] = c__12782__auto___16015);

return statearr_15088;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__12784__auto__);
}));


return out;
}));

(cljs.core.async.unique.cljs$lang$maxFixedArity = 2);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition = (function cljs$core$async$partition(var_args){
var G__15090 = arguments.length;
switch (G__15090) {
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
var c__12782__auto___16034 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__12783__auto__ = (function (){var switch__12182__auto__ = (function (state_15137){
var state_val_15138 = (state_15137[(1)]);
if((state_val_15138 === (7))){
var inst_15133 = (state_15137[(2)]);
var state_15137__$1 = state_15137;
var statearr_15139_16035 = state_15137__$1;
(statearr_15139_16035[(2)] = inst_15133);

(statearr_15139_16035[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15138 === (1))){
var inst_15091 = (new Array(n));
var inst_15092 = inst_15091;
var inst_15093 = (0);
var state_15137__$1 = (function (){var statearr_15140 = state_15137;
(statearr_15140[(7)] = inst_15092);

(statearr_15140[(8)] = inst_15093);

return statearr_15140;
})();
var statearr_15141_16037 = state_15137__$1;
(statearr_15141_16037[(2)] = null);

(statearr_15141_16037[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15138 === (4))){
var inst_15099 = (state_15137[(9)]);
var inst_15099__$1 = (state_15137[(2)]);
var inst_15106 = (inst_15099__$1 == null);
var inst_15107 = cljs.core.not(inst_15106);
var state_15137__$1 = (function (){var statearr_15144 = state_15137;
(statearr_15144[(9)] = inst_15099__$1);

return statearr_15144;
})();
if(inst_15107){
var statearr_15145_16038 = state_15137__$1;
(statearr_15145_16038[(1)] = (5));

} else {
var statearr_15146_16039 = state_15137__$1;
(statearr_15146_16039[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15138 === (15))){
var inst_15127 = (state_15137[(2)]);
var state_15137__$1 = state_15137;
var statearr_15147_16041 = state_15137__$1;
(statearr_15147_16041[(2)] = inst_15127);

(statearr_15147_16041[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15138 === (13))){
var state_15137__$1 = state_15137;
var statearr_15148_16042 = state_15137__$1;
(statearr_15148_16042[(2)] = null);

(statearr_15148_16042[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15138 === (6))){
var inst_15093 = (state_15137[(8)]);
var inst_15123 = (inst_15093 > (0));
var state_15137__$1 = state_15137;
if(cljs.core.truth_(inst_15123)){
var statearr_15149_16043 = state_15137__$1;
(statearr_15149_16043[(1)] = (12));

} else {
var statearr_15150_16044 = state_15137__$1;
(statearr_15150_16044[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15138 === (3))){
var inst_15135 = (state_15137[(2)]);
var state_15137__$1 = state_15137;
return cljs.core.async.impl.ioc_helpers.return_chan(state_15137__$1,inst_15135);
} else {
if((state_val_15138 === (12))){
var inst_15092 = (state_15137[(7)]);
var inst_15125 = cljs.core.vec(inst_15092);
var state_15137__$1 = state_15137;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_15137__$1,(15),out,inst_15125);
} else {
if((state_val_15138 === (2))){
var state_15137__$1 = state_15137;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_15137__$1,(4),ch);
} else {
if((state_val_15138 === (11))){
var inst_15117 = (state_15137[(2)]);
var inst_15118 = (new Array(n));
var inst_15092 = inst_15118;
var inst_15093 = (0);
var state_15137__$1 = (function (){var statearr_15152 = state_15137;
(statearr_15152[(10)] = inst_15117);

(statearr_15152[(7)] = inst_15092);

(statearr_15152[(8)] = inst_15093);

return statearr_15152;
})();
var statearr_15154_16045 = state_15137__$1;
(statearr_15154_16045[(2)] = null);

(statearr_15154_16045[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15138 === (9))){
var inst_15092 = (state_15137[(7)]);
var inst_15115 = cljs.core.vec(inst_15092);
var state_15137__$1 = state_15137;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_15137__$1,(11),out,inst_15115);
} else {
if((state_val_15138 === (5))){
var inst_15092 = (state_15137[(7)]);
var inst_15093 = (state_15137[(8)]);
var inst_15099 = (state_15137[(9)]);
var inst_15110 = (state_15137[(11)]);
var inst_15109 = (inst_15092[inst_15093] = inst_15099);
var inst_15110__$1 = (inst_15093 + (1));
var inst_15111 = (inst_15110__$1 < n);
var state_15137__$1 = (function (){var statearr_15155 = state_15137;
(statearr_15155[(12)] = inst_15109);

(statearr_15155[(11)] = inst_15110__$1);

return statearr_15155;
})();
if(cljs.core.truth_(inst_15111)){
var statearr_15156_16052 = state_15137__$1;
(statearr_15156_16052[(1)] = (8));

} else {
var statearr_15157_16053 = state_15137__$1;
(statearr_15157_16053[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15138 === (14))){
var inst_15130 = (state_15137[(2)]);
var inst_15131 = cljs.core.async.close_BANG_(out);
var state_15137__$1 = (function (){var statearr_15159 = state_15137;
(statearr_15159[(13)] = inst_15130);

return statearr_15159;
})();
var statearr_15163_16054 = state_15137__$1;
(statearr_15163_16054[(2)] = inst_15131);

(statearr_15163_16054[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15138 === (10))){
var inst_15121 = (state_15137[(2)]);
var state_15137__$1 = state_15137;
var statearr_15164_16055 = state_15137__$1;
(statearr_15164_16055[(2)] = inst_15121);

(statearr_15164_16055[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15138 === (8))){
var inst_15092 = (state_15137[(7)]);
var inst_15110 = (state_15137[(11)]);
var tmp15158 = inst_15092;
var inst_15092__$1 = tmp15158;
var inst_15093 = inst_15110;
var state_15137__$1 = (function (){var statearr_15165 = state_15137;
(statearr_15165[(7)] = inst_15092__$1);

(statearr_15165[(8)] = inst_15093);

return statearr_15165;
})();
var statearr_15166_16056 = state_15137__$1;
(statearr_15166_16056[(2)] = null);

(statearr_15166_16056[(1)] = (2));


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
var cljs$core$async$state_machine__12183__auto__ = null;
var cljs$core$async$state_machine__12183__auto____0 = (function (){
var statearr_15167 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_15167[(0)] = cljs$core$async$state_machine__12183__auto__);

(statearr_15167[(1)] = (1));

return statearr_15167;
});
var cljs$core$async$state_machine__12183__auto____1 = (function (state_15137){
while(true){
var ret_value__12184__auto__ = (function (){try{while(true){
var result__12185__auto__ = switch__12182__auto__(state_15137);
if(cljs.core.keyword_identical_QMARK_(result__12185__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__12185__auto__;
}
break;
}
}catch (e15168){var ex__12186__auto__ = e15168;
var statearr_15169_16067 = state_15137;
(statearr_15169_16067[(2)] = ex__12186__auto__);


if(cljs.core.seq((state_15137[(4)]))){
var statearr_15170_16069 = state_15137;
(statearr_15170_16069[(1)] = cljs.core.first((state_15137[(4)])));

} else {
throw ex__12186__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__12184__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__16076 = state_15137;
state_15137 = G__16076;
continue;
} else {
return ret_value__12184__auto__;
}
break;
}
});
cljs$core$async$state_machine__12183__auto__ = function(state_15137){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__12183__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__12183__auto____1.call(this,state_15137);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__12183__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__12183__auto____0;
cljs$core$async$state_machine__12183__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__12183__auto____1;
return cljs$core$async$state_machine__12183__auto__;
})()
})();
var state__12784__auto__ = (function (){var statearr_15171 = f__12783__auto__();
(statearr_15171[(6)] = c__12782__auto___16034);

return statearr_15171;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__12784__auto__);
}));


return out;
}));

(cljs.core.async.partition.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition_by = (function cljs$core$async$partition_by(var_args){
var G__15183 = arguments.length;
switch (G__15183) {
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
var c__12782__auto___16086 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__12783__auto__ = (function (){var switch__12182__auto__ = (function (state_15241){
var state_val_15242 = (state_15241[(1)]);
if((state_val_15242 === (7))){
var inst_15237 = (state_15241[(2)]);
var state_15241__$1 = state_15241;
var statearr_15249_16087 = state_15241__$1;
(statearr_15249_16087[(2)] = inst_15237);

(statearr_15249_16087[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15242 === (1))){
var inst_15188 = [];
var inst_15189 = inst_15188;
var inst_15190 = new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123);
var state_15241__$1 = (function (){var statearr_15250 = state_15241;
(statearr_15250[(7)] = inst_15189);

(statearr_15250[(8)] = inst_15190);

return statearr_15250;
})();
var statearr_15251_16088 = state_15241__$1;
(statearr_15251_16088[(2)] = null);

(statearr_15251_16088[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15242 === (4))){
var inst_15193 = (state_15241[(9)]);
var inst_15193__$1 = (state_15241[(2)]);
var inst_15194 = (inst_15193__$1 == null);
var inst_15195 = cljs.core.not(inst_15194);
var state_15241__$1 = (function (){var statearr_15256 = state_15241;
(statearr_15256[(9)] = inst_15193__$1);

return statearr_15256;
})();
if(inst_15195){
var statearr_15257_16093 = state_15241__$1;
(statearr_15257_16093[(1)] = (5));

} else {
var statearr_15258_16106 = state_15241__$1;
(statearr_15258_16106[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15242 === (15))){
var inst_15189 = (state_15241[(7)]);
var inst_15229 = cljs.core.vec(inst_15189);
var state_15241__$1 = state_15241;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_15241__$1,(18),out,inst_15229);
} else {
if((state_val_15242 === (13))){
var inst_15217 = (state_15241[(2)]);
var state_15241__$1 = state_15241;
var statearr_15259_16107 = state_15241__$1;
(statearr_15259_16107[(2)] = inst_15217);

(statearr_15259_16107[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15242 === (6))){
var inst_15189 = (state_15241[(7)]);
var inst_15226 = inst_15189.length;
var inst_15227 = (inst_15226 > (0));
var state_15241__$1 = state_15241;
if(cljs.core.truth_(inst_15227)){
var statearr_15267_16108 = state_15241__$1;
(statearr_15267_16108[(1)] = (15));

} else {
var statearr_15268_16109 = state_15241__$1;
(statearr_15268_16109[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15242 === (17))){
var inst_15234 = (state_15241[(2)]);
var inst_15235 = cljs.core.async.close_BANG_(out);
var state_15241__$1 = (function (){var statearr_15269 = state_15241;
(statearr_15269[(10)] = inst_15234);

return statearr_15269;
})();
var statearr_15270_16111 = state_15241__$1;
(statearr_15270_16111[(2)] = inst_15235);

(statearr_15270_16111[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15242 === (3))){
var inst_15239 = (state_15241[(2)]);
var state_15241__$1 = state_15241;
return cljs.core.async.impl.ioc_helpers.return_chan(state_15241__$1,inst_15239);
} else {
if((state_val_15242 === (12))){
var inst_15189 = (state_15241[(7)]);
var inst_15208 = cljs.core.vec(inst_15189);
var state_15241__$1 = state_15241;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_15241__$1,(14),out,inst_15208);
} else {
if((state_val_15242 === (2))){
var state_15241__$1 = state_15241;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_15241__$1,(4),ch);
} else {
if((state_val_15242 === (11))){
var inst_15189 = (state_15241[(7)]);
var inst_15193 = (state_15241[(9)]);
var inst_15197 = (state_15241[(11)]);
var inst_15205 = inst_15189.push(inst_15193);
var tmp15271 = inst_15189;
var inst_15189__$1 = tmp15271;
var inst_15190 = inst_15197;
var state_15241__$1 = (function (){var statearr_15273 = state_15241;
(statearr_15273[(12)] = inst_15205);

(statearr_15273[(7)] = inst_15189__$1);

(statearr_15273[(8)] = inst_15190);

return statearr_15273;
})();
var statearr_15274_16112 = state_15241__$1;
(statearr_15274_16112[(2)] = null);

(statearr_15274_16112[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15242 === (9))){
var inst_15190 = (state_15241[(8)]);
var inst_15201 = cljs.core.keyword_identical_QMARK_(inst_15190,new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123));
var state_15241__$1 = state_15241;
var statearr_15275_16113 = state_15241__$1;
(statearr_15275_16113[(2)] = inst_15201);

(statearr_15275_16113[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15242 === (5))){
var inst_15193 = (state_15241[(9)]);
var inst_15197 = (state_15241[(11)]);
var inst_15190 = (state_15241[(8)]);
var inst_15198 = (state_15241[(13)]);
var inst_15197__$1 = (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(inst_15193) : f.call(null,inst_15193));
var inst_15198__$1 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_15197__$1,inst_15190);
var state_15241__$1 = (function (){var statearr_15276 = state_15241;
(statearr_15276[(11)] = inst_15197__$1);

(statearr_15276[(13)] = inst_15198__$1);

return statearr_15276;
})();
if(inst_15198__$1){
var statearr_15277_16114 = state_15241__$1;
(statearr_15277_16114[(1)] = (8));

} else {
var statearr_15278_16115 = state_15241__$1;
(statearr_15278_16115[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15242 === (14))){
var inst_15193 = (state_15241[(9)]);
var inst_15197 = (state_15241[(11)]);
var inst_15210 = (state_15241[(2)]);
var inst_15211 = [];
var inst_15212 = inst_15211.push(inst_15193);
var inst_15189 = inst_15211;
var inst_15190 = inst_15197;
var state_15241__$1 = (function (){var statearr_15279 = state_15241;
(statearr_15279[(14)] = inst_15210);

(statearr_15279[(15)] = inst_15212);

(statearr_15279[(7)] = inst_15189);

(statearr_15279[(8)] = inst_15190);

return statearr_15279;
})();
var statearr_15282_16116 = state_15241__$1;
(statearr_15282_16116[(2)] = null);

(statearr_15282_16116[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15242 === (16))){
var state_15241__$1 = state_15241;
var statearr_15283_16117 = state_15241__$1;
(statearr_15283_16117[(2)] = null);

(statearr_15283_16117[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15242 === (10))){
var inst_15203 = (state_15241[(2)]);
var state_15241__$1 = state_15241;
if(cljs.core.truth_(inst_15203)){
var statearr_15284_16122 = state_15241__$1;
(statearr_15284_16122[(1)] = (11));

} else {
var statearr_15288_16123 = state_15241__$1;
(statearr_15288_16123[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15242 === (18))){
var inst_15231 = (state_15241[(2)]);
var state_15241__$1 = state_15241;
var statearr_15289_16124 = state_15241__$1;
(statearr_15289_16124[(2)] = inst_15231);

(statearr_15289_16124[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15242 === (8))){
var inst_15198 = (state_15241[(13)]);
var state_15241__$1 = state_15241;
var statearr_15292_16129 = state_15241__$1;
(statearr_15292_16129[(2)] = inst_15198);

(statearr_15292_16129[(1)] = (10));


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
var cljs$core$async$state_machine__12183__auto__ = null;
var cljs$core$async$state_machine__12183__auto____0 = (function (){
var statearr_15293 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_15293[(0)] = cljs$core$async$state_machine__12183__auto__);

(statearr_15293[(1)] = (1));

return statearr_15293;
});
var cljs$core$async$state_machine__12183__auto____1 = (function (state_15241){
while(true){
var ret_value__12184__auto__ = (function (){try{while(true){
var result__12185__auto__ = switch__12182__auto__(state_15241);
if(cljs.core.keyword_identical_QMARK_(result__12185__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__12185__auto__;
}
break;
}
}catch (e15294){var ex__12186__auto__ = e15294;
var statearr_15295_16133 = state_15241;
(statearr_15295_16133[(2)] = ex__12186__auto__);


if(cljs.core.seq((state_15241[(4)]))){
var statearr_15302_16134 = state_15241;
(statearr_15302_16134[(1)] = cljs.core.first((state_15241[(4)])));

} else {
throw ex__12186__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__12184__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__16135 = state_15241;
state_15241 = G__16135;
continue;
} else {
return ret_value__12184__auto__;
}
break;
}
});
cljs$core$async$state_machine__12183__auto__ = function(state_15241){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__12183__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__12183__auto____1.call(this,state_15241);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__12183__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__12183__auto____0;
cljs$core$async$state_machine__12183__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__12183__auto____1;
return cljs$core$async$state_machine__12183__auto__;
})()
})();
var state__12784__auto__ = (function (){var statearr_15303 = f__12783__auto__();
(statearr_15303[(6)] = c__12782__auto___16086);

return statearr_15303;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__12784__auto__);
}));


return out;
}));

(cljs.core.async.partition_by.cljs$lang$maxFixedArity = 3);


//# sourceMappingURL=cljs.core.async.js.map
