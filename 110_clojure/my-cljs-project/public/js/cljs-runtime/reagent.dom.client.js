goog.provide('reagent.dom.client');
var module$node_modules$react$index=shadow.js.require("module$node_modules$react$index", {});
var module$node_modules$react_dom$client=shadow.js.require("module$node_modules$react_dom$client", {});
var module$node_modules$react_dom$index=shadow.js.require("module$node_modules$react_dom$index", {});
/**
 * Create a React Root connected to given container DOM element.
 */
reagent.dom.client.create_root = (function reagent$dom$client$create_root(var_args){
var G__6180 = arguments.length;
switch (G__6180) {
case 1:
return reagent.dom.client.create_root.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return reagent.dom.client.create_root.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(reagent.dom.client.create_root.cljs$core$IFn$_invoke$arity$1 = (function (container){
return module$node_modules$react_dom$client.createRoot(container);
}));

(reagent.dom.client.create_root.cljs$core$IFn$_invoke$arity$2 = (function (container,options){
return module$node_modules$react_dom$client.createRoot(container,options);
}));

(reagent.dom.client.create_root.cljs$lang$maxFixedArity = 2);

/**
 * Unmount the given React Root
 */
reagent.dom.client.unmount = (function reagent$dom$client$unmount(root){
return root.unmount();
});
reagent.dom.client.reagent_root = (function reagent$dom$client$reagent_root(js_props){
module$node_modules$react$index.useEffect((function (){
var _STAR_always_update_STAR__orig_val__6181 = reagent.impl.util._STAR_always_update_STAR_;
var _STAR_always_update_STAR__temp_val__6182 = false;
(reagent.impl.util._STAR_always_update_STAR_ = _STAR_always_update_STAR__temp_val__6182);

try{reagent.impl.batching.flush_after_render();

return undefined;
}finally {(reagent.impl.util._STAR_always_update_STAR_ = _STAR_always_update_STAR__orig_val__6181);
}}));

var _STAR_always_update_STAR__orig_val__6183 = reagent.impl.util._STAR_always_update_STAR_;
var _STAR_always_update_STAR__temp_val__6184 = true;
(reagent.impl.util._STAR_always_update_STAR_ = _STAR_always_update_STAR__temp_val__6184);

try{return module$node_modules$react$index.createElement(js_props.comp);
}finally {(reagent.impl.util._STAR_always_update_STAR_ = _STAR_always_update_STAR__orig_val__6183);
}});
/**
 * Render the given Reagent element (i.e. Hiccup data)
 *   into a given React root.
 */
reagent.dom.client.render = (function reagent$dom$client$render(var_args){
var G__6186 = arguments.length;
switch (G__6186) {
case 2:
return reagent.dom.client.render.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return reagent.dom.client.render.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(reagent.dom.client.render.cljs$core$IFn$_invoke$arity$2 = (function (root,el){
return reagent.dom.client.render.cljs$core$IFn$_invoke$arity$3(root,el,reagent.impl.template._STAR_current_default_compiler_STAR_);
}));

(reagent.dom.client.render.cljs$core$IFn$_invoke$arity$3 = (function (root,el,compiler){
(reagent.impl.batching.react_flush = module$node_modules$react_dom$index.flushSync);

var comp = (function (){
return reagent.impl.protocols.as_element(compiler,el);
});
var js_props = ({});
(js_props.comp = comp);

return root.render(module$node_modules$react$index.createElement(reagent.dom.client.reagent_root,js_props));
}));

(reagent.dom.client.render.cljs$lang$maxFixedArity = 3);

reagent.dom.client.hydrate_root = (function reagent$dom$client$hydrate_root(var_args){
var G__6188 = arguments.length;
switch (G__6188) {
case 2:
return reagent.dom.client.hydrate_root.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return reagent.dom.client.hydrate_root.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(reagent.dom.client.hydrate_root.cljs$core$IFn$_invoke$arity$2 = (function (container,el){
return reagent.dom.client.hydrate_root.cljs$core$IFn$_invoke$arity$3(container,el,null);
}));

(reagent.dom.client.hydrate_root.cljs$core$IFn$_invoke$arity$3 = (function (container,el,p__6189){
var map__6190 = p__6189;
var map__6190__$1 = cljs.core.__destructure_map(map__6190);
var compiler = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__6190__$1,new cljs.core.Keyword(null,"compiler","compiler",-267926731),reagent.impl.template._STAR_current_default_compiler_STAR_);
var on_recoverable_error = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__6190__$1,new cljs.core.Keyword(null,"on-recoverable-error","on-recoverable-error",1651056576));
var identifier_prefix = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__6190__$1,new cljs.core.Keyword(null,"identifier-prefix","identifier-prefix",1929840008));
(reagent.impl.batching.react_flush = module$node_modules$react_dom$index.flushSync);

var js_props = ({});
var comp = (function (){
return reagent.impl.protocols.as_element(compiler,el);
});
(js_props.comp = comp);

return module$node_modules$react_dom$client.hydrateRoot(container,module$node_modules$react$index.createElement(reagent.dom.client.reagent_root,js_props));
}));

(reagent.dom.client.hydrate_root.cljs$lang$maxFixedArity = 3);


//# sourceMappingURL=reagent.dom.client.js.map
