!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.BasicSlider=t():e.BasicSlider=t()}("undefined"!=typeof self?self:this,function(){return function(e){var t=window.webpackHotUpdateBasicSlider;window.webpackHotUpdateBasicSlider=function(e,i){!function(e,t){if(!w[e]||!y[e])return;for(var i in y[e]=!1,t)Object.prototype.hasOwnProperty.call(t,i)&&(p[i]=t[i]);0==--m&&0===b&&E()}(e,i),t&&t(e,i)};var i,n=!0,r="f1ef3269e99a90ee1a16",s=1e4,o={},c=[],a=[];function l(e){var t=L[e];if(!t)return I;var n=function(n){return t.hot.active?(L[n]?L[n].parents.indexOf(e)<0&&L[n].parents.push(e):(c=[e],i=n),t.children.indexOf(n)<0&&t.children.push(n)):(console.warn("[HMR] unexpected require("+n+") from disposed module "+e),c=[]),I(n)},r=function(e){return{configurable:!0,enumerable:!0,get:function(){return I[e]},set:function(t){I[e]=t}}};for(var s in I)Object.prototype.hasOwnProperty.call(I,s)&&"e"!==s&&Object.defineProperty(n,s,r(s));return n.e=function(e){return"ready"===h&&f("prepare"),b++,I.e(e).then(t,function(e){throw t(),e});function t(){b--,"prepare"===h&&(v[e]||S(e),0===b&&0===m&&E())}},n}var d=[],h="idle";function f(e){h=e;for(var t=0;t<d.length;t++)d[t].call(null,e)}var u,p,g,m=0,b=0,v={},y={},w={};function O(e){return+e+""===e?+e:e}function j(e){if("idle"!==h)throw new Error("check() is only allowed in idle status");return n=e,f("check"),(t=s,t=t||1e4,new Promise(function(e,i){if("undefined"==typeof XMLHttpRequest)return i(new Error("No browser support"));try{var n=new XMLHttpRequest,s=I.p+""+r+".hot-update.json";n.open("GET",s,!0),n.timeout=t,n.send(null)}catch(e){return i(e)}n.onreadystatechange=function(){if(4===n.readyState)if(0===n.status)i(new Error("Manifest request to "+s+" timed out."));else if(404===n.status)e();else if(200!==n.status&&304!==n.status)i(new Error("Manifest request to "+s+" failed."));else{try{var t=JSON.parse(n.responseText)}catch(e){return void i(e)}e(t)}}})).then(function(e){if(!e)return f("idle"),null;y={},v={},w=e.c,g=e.h,f("prepare");var t=new Promise(function(e,t){u={resolve:e,reject:t}});p={};return S(0),"prepare"===h&&0===b&&0===m&&E(),t});var t}function S(e){w[e]?(y[e]=!0,m++,function(e){var t=document.getElementsByTagName("head")[0],i=document.createElement("script");i.type="text/javascript",i.charset="utf-8",i.src=I.p+""+e+"."+r+".hot-update.js",t.appendChild(i)}(e)):v[e]=!0}function E(){f("ready");var e=u;if(u=null,e)if(n)Promise.resolve().then(function(){return D(n)}).then(function(t){e.resolve(t)},function(t){e.reject(t)});else{var t=[];for(var i in p)Object.prototype.hasOwnProperty.call(p,i)&&t.push(O(i));e.resolve(t)}}function D(t){if("ready"!==h)throw new Error("apply() is only allowed in ready status");var i,n,s,a,l;function d(e){for(var t=[e],i={},n=t.slice().map(function(e){return{chain:[e],id:e}});n.length>0;){var r=n.pop(),s=r.id,o=r.chain;if((a=L[s])&&!a.hot._selfAccepted){if(a.hot._selfDeclined)return{type:"self-declined",chain:o,moduleId:s};if(a.hot._main)return{type:"unaccepted",chain:o,moduleId:s};for(var c=0;c<a.parents.length;c++){var l=a.parents[c],d=L[l];if(d){if(d.hot._declinedDependencies[s])return{type:"declined",chain:o.concat([l]),moduleId:s,parentId:l};t.indexOf(l)>=0||(d.hot._acceptedDependencies[s]?(i[l]||(i[l]=[]),u(i[l],[s])):(delete i[l],t.push(l),n.push({chain:o.concat([l]),id:l})))}}}}return{type:"accepted",moduleId:e,outdatedModules:t,outdatedDependencies:i}}function u(e,t){for(var i=0;i<t.length;i++){var n=t[i];e.indexOf(n)<0&&e.push(n)}}t=t||{};var m={},b=[],v={},y=function(){console.warn("[HMR] unexpected require("+S.moduleId+") to disposed module")};for(var j in p)if(Object.prototype.hasOwnProperty.call(p,j)){var S;l=O(j);var E=!1,D=!1,x=!1,A="";switch((S=p[j]?d(l):{type:"disposed",moduleId:j}).chain&&(A="\nUpdate propagation: "+S.chain.join(" -> ")),S.type){case"self-declined":t.onDeclined&&t.onDeclined(S),t.ignoreDeclined||(E=new Error("Aborted because of self decline: "+S.moduleId+A));break;case"declined":t.onDeclined&&t.onDeclined(S),t.ignoreDeclined||(E=new Error("Aborted because of declined dependency: "+S.moduleId+" in "+S.parentId+A));break;case"unaccepted":t.onUnaccepted&&t.onUnaccepted(S),t.ignoreUnaccepted||(E=new Error("Aborted because "+l+" is not accepted"+A));break;case"accepted":t.onAccepted&&t.onAccepted(S),D=!0;break;case"disposed":t.onDisposed&&t.onDisposed(S),x=!0;break;default:throw new Error("Unexception type "+S.type)}if(E)return f("abort"),Promise.reject(E);if(D)for(l in v[l]=p[l],u(b,S.outdatedModules),S.outdatedDependencies)Object.prototype.hasOwnProperty.call(S.outdatedDependencies,l)&&(m[l]||(m[l]=[]),u(m[l],S.outdatedDependencies[l]));x&&(u(b,[S.moduleId]),v[l]=y)}var _,H=[];for(n=0;n<b.length;n++)l=b[n],L[l]&&L[l].hot._selfAccepted&&H.push({module:l,errorHandler:L[l].hot._selfAccepted});f("dispose"),Object.keys(w).forEach(function(e){!1===w[e]&&function(e){delete installedChunks[e]}(e)});for(var X,M,P=b.slice();P.length>0;)if(l=P.pop(),a=L[l]){var C={},k=a.hot._disposeHandlers;for(s=0;s<k.length;s++)(i=k[s])(C);for(o[l]=C,a.hot.active=!1,delete L[l],delete m[l],s=0;s<a.children.length;s++){var T=L[a.children[s]];T&&((_=T.parents.indexOf(l))>=0&&T.parents.splice(_,1))}}for(l in m)if(Object.prototype.hasOwnProperty.call(m,l)&&(a=L[l]))for(M=m[l],s=0;s<M.length;s++)X=M[s],(_=a.children.indexOf(X))>=0&&a.children.splice(_,1);for(l in f("apply"),r=g,v)Object.prototype.hasOwnProperty.call(v,l)&&(e[l]=v[l]);var W=null;for(l in m)if(Object.prototype.hasOwnProperty.call(m,l)&&(a=L[l])){M=m[l];var R=[];for(n=0;n<M.length;n++)if(X=M[n],i=a.hot._acceptedDependencies[X]){if(R.indexOf(i)>=0)continue;R.push(i)}for(n=0;n<R.length;n++){i=R[n];try{i(M)}catch(e){t.onErrored&&t.onErrored({type:"accept-errored",moduleId:l,dependencyId:M[n],error:e}),t.ignoreErrored||W||(W=e)}}}for(n=0;n<H.length;n++){var q=H[n];l=q.module,c=[l];try{I(l)}catch(e){if("function"==typeof q.errorHandler)try{q.errorHandler(e)}catch(i){t.onErrored&&t.onErrored({type:"self-accept-error-handler-errored",moduleId:l,error:i,orginalError:e,originalError:e}),t.ignoreErrored||W||(W=i),W||(W=e)}else t.onErrored&&t.onErrored({type:"self-accept-errored",moduleId:l,error:e}),t.ignoreErrored||W||(W=e)}}return W?(f("fail"),Promise.reject(W)):(f("idle"),new Promise(function(e){e(b)}))}var L={};function I(t){if(L[t])return L[t].exports;var n=L[t]={i:t,l:!1,exports:{},hot:function(e){var t={_acceptedDependencies:{},_declinedDependencies:{},_selfAccepted:!1,_selfDeclined:!1,_disposeHandlers:[],_main:i!==e,active:!0,accept:function(e,i){if(void 0===e)t._selfAccepted=!0;else if("function"==typeof e)t._selfAccepted=e;else if("object"==typeof e)for(var n=0;n<e.length;n++)t._acceptedDependencies[e[n]]=i||function(){};else t._acceptedDependencies[e]=i||function(){}},decline:function(e){if(void 0===e)t._selfDeclined=!0;else if("object"==typeof e)for(var i=0;i<e.length;i++)t._declinedDependencies[e[i]]=!0;else t._declinedDependencies[e]=!0},dispose:function(e){t._disposeHandlers.push(e)},addDisposeHandler:function(e){t._disposeHandlers.push(e)},removeDisposeHandler:function(e){var i=t._disposeHandlers.indexOf(e);i>=0&&t._disposeHandlers.splice(i,1)},check:j,apply:D,status:function(e){if(!e)return h;d.push(e)},addStatusHandler:function(e){d.push(e)},removeStatusHandler:function(e){var t=d.indexOf(e);t>=0&&d.splice(t,1)},data:o[e]};return i=void 0,t}(t),parents:(a=c,c=[],a),children:[]};return e[t].call(n.exports,n,n.exports,l(t)),n.l=!0,n.exports}return I.m=e,I.c=L,I.d=function(e,t,i){I.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:i})},I.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return I.d(t,"a",t),t},I.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},I.p="./",I.h=function(){return r},l(0)(I.s=0)}([function(e,t,i){"use strict";throw Object.defineProperty(t,"__esModule",{value:!0}),new Error('Cannot find module "./scss/styles.scss"')},function(e,t,i){"use strict";var n=i(2),r=i(3),s=i(4),o=i(5),c=i(6),a=i(7);class l{constructor(e){if(this.config=l.mergeSettings(e),console.log("this.config -> ",this.config),this.selector="string"==typeof this.config.selector?Object(n.a)(this.config.selector):this.config.selector,null===this.selector)throw new Error("Something wrong with your selector!");this.selectWidth=this.selector.offsetWidth,this.innerElements=[].slice.call(this.selector.children),this.transformProperty=l.transformSupport(),console.log("BasicSlider.transformSupport() -> ",l.transformSupport()),this.init()}static mergeSettings(e){const t={selector:".slider",dotsWrapper:".dots-wrapper",arrowLeft:".arrow-left",arrowRight:".arrow-right",transition:{speed:300,easing:"ease-in"},swipe:!0,autoHeight:!0,loop:!1,afterChangeSlide:function(){}},i=e;for(const e in i)t[e]=i[e];return t}static transformSupport(){return"string"==typeof document.documentElement.style.transform?"transform":"WebkitTransform"}buildDots(){for(var e=0;e<this.innerElements.length;e++){var t=document.createElement("li");t.setAttribute("data-slide",e+1),Object(n.a)(this.config.dotsWrapper).appendChild(t)}Object(n.a)(this.config.dotsWrapper).addEventListener("click",e=>{e.target&&"LI"==e.target.nodeName&&(this.curSlide=e.target.getAttribute("data-slide"),this.goToSlide())},!1)}getCurLeft(){this.curLeft=parseInt(this.sliderInner.style.left.split("px")[0]),console.log("this.curLeft -> ",this.curLeft)}goToSlide(){this.sliderInner.style.transition="left "+this.config.transition.speed/1e3+"s "+this.config.transition.easing,this.sliderInner.style.left=-(this.curSlide-1)*this.slideW+"px",Object(r.a)(Object(n.a)(this.config.selector),"isAnimating"),setTimeout(()=>{this.sliderInner.style.transition="",Object(s.a)(Object(n.a)(this.config.selector),"isAnimating")},this.config.transition.speed),this.setDot(),this.updateArrowClass(),this.config.autoHeight&&(Object(n.a)(this.config.selector).style.height=this.innerElements[this.curSlide-1].offsetHeight+"px"),this.config.afterChangeSlide(this)}loadedImg(e){console.log("el -> ",e);var t=!1;function i(){t||(t=!0,this.loadedCnt++,this.loadedCnt>=this.innerElements.length&&this.updateSliderDimension())}var n=e.querySelector("img");n?(n.onload=i,n.src=n.getAttribute("data-src"),n.style.display="block",n.complete&&i()):this.updateSliderDimension()}updateSliderDimension(){if(console.log("Update dimension"),this.slideW=parseInt(Object(n.a)(this.config.selector).querySelectorAll(".item")[0].offsetWidth),console.log("this.slideW --\x3e ",this.slideW),this.sliderInner.style.left=-this.slideW*(this.curSlide-1)+"px",this.config.autoHeight)console.log("this.curSlide inside DIMENSION -> ",this.curSlide),Object(n.a)(this.config.selector).style.height=this.innerElements[this.curSlide].offsetHeight+"px";else for(var e=0;e<this.innerElements.length;e++)this.innerElements[e].offsetHeight>this.config.target.offsetHeight&&(this.config.target.style.height=this.innerElements[e].offsetHeight+"px");this.config.afterChangeSlide(this)}setDot(){var e=this.curSlide-1;console.log("this.innerElements.length -> ",this.innerElements.length);for(var t=0;t<this.innerElements.length;t++)Object(s.a)(Object(n.a)(this.config.dotsWrapper).querySelectorAll("li")[t],"active");this.curSlide-1<0?e=this.innerElements.length-1:this.curSlide-1>this.innerElements.length-1&&(e=0),Object(r.a)(Object(n.a)(this.config.dotsWrapper).querySelectorAll("li")[e],"active")}initArrows(){""!=this.config.arrowLeft&&Object(n.a)(this.config.arrowLeft).addEventListener("click",()=>{if(!Object(o.a)(this.config.selector,"isAnimating")){if(1==this.curSlide)return;this.curSlide--,setTimeout(()=>{this.goToSlide()},20)}},!1),""!=this.config.arrowRight&&Object(n.a)(this.config.arrowRight).addEventListener("click",()=>{if(!Object(o.a)(this.config.selector,"isAnimating")){if(this.curSlide==this.innerElements.length)return;this.curSlide++,setTimeout(()=>{this.goToSlide()},20)}},!1)}updateArrowClass(){this.curSlide==this.innerElements.length?(Object(o.a)(this.config.arrowRight,"is-disabled")||Object(r.a)(Object(n.a)(this.config.arrowRight),"is-disabled"),Object(o.a)(this.config.arrowLeft,"is-disabled")||Object(s.a)(Object(n.a)(this.config.arrowLeft),"is-disabled")):1==this.curSlide?(Object(o.a)(this.config.arrowLeft,"is-disabled")||Object(r.a)(Object(n.a)(this.config.arrowLeft),"is-disabled"),Object(o.a)(this.config.arrowRight,"is-disabled")||Object(s.a)(Object(n.a)(this.config.arrowRight),"is-disabled")):(Object(o.a)(this.config.arrowLeft,"is-disabled")||Object(s.a)(Object(n.a)(this.config.arrowLeft),"is-disabled"),Object(o.a)(this.config.arrowRight,"is-disabled")||Object(s.a)(Object(n.a)(this.config.arrowRight),"is-disabled"))}startSwipe(e){console.log(e);var t=e;this.getCurLeft(),this.isAnimating||("touchstart"==e.type&&(t=e.targetTouches[0]||e.changedTouches[0]),this.startX=t.pageX,this.startY=t.pageY,Object(c.a)(this.sliderInner,"mousemove touchmove",this.swipeMove.bind(this)),Object(c.a)(Object(n.a)("body"),"mouseup touchend",this.swipeEnd.bind(this)))}swipeMove(e){var t=e;"touchmove"==e.type&&(t=e.targetTouches[0]||e.changedTouches[0]),this.moveX=t.pageX,this.moveY=t.pageY,Math.abs(this.moveX-this.startX)<40||(this.isAnimating=!0,Object(r.a)(Object(n.a)(this.config.selector),"isAnimating"),e.preventDefault(),this.curLeft+this.moveX-this.startX>0&&0==this.curLeft?this.curLeft=-this.totalSlides*this.slideW:this.curLeft+this.moveX-this.startX<-(this.totalSlides+1)*this.slideW&&(this.curLeft=-this.slideW),this.sliderInner.style.left=this.curLeft+this.moveX-this.startX+"px")}swipeEnd(e){this.getCurLeft(),0!==Math.abs(this.moveX-this.startX)&&(this.stayAtCur=Math.abs(this.moveX-this.startX)<40||void 0===this.moveX,this.dir=this.startX<this.moveX?"left":"right",this.stayAtCur||("left"==this.dir?this.curSlide--:this.curSlide++,this.curSlide<0?this.curSlide=this.totalSlides:this.curSlide==this.totalSlides+2&&(this.curSlide=1)),delete this.startX,delete this.startY,delete this.moveX,delete this.moveY,this.isAnimating=!1,Object(s.a)(this.config.target,"isAnimating"),Object(a.a)(this.sliderInner,"mousemove touchmove",this.swipeMove.bind(this)),Object(a.a)(Object(n.a)("body"),"mouseup touchend",this.swipeEnd.bind(this)))}init(){console.log("this ------\x3e ",this);let e=Object(n.a)(this.config.selector).innerHTML;Object(n.a)(this.config.selector).innerHTML=`<div class="slider-inner">${e}</div>`,this.sliderInner=Object(n.a)(this.config.selector).querySelector(".slider-inner"),console.log("this.sliderInner -> ",this.sliderInner),this.loadedCnt=0,this.curSlide=0,this.curSlide++,this.sliderInner.style.width=100*this.innerElements.length+"%";for(var t=0;t<this.innerElements.length;t++)this.innerElements[t].style.width=100/this.innerElements.length+"%",this.loadedImg(this.innerElements[t]);this.updateSliderDimension(),this.buildDots(),this.setDot(),this.initArrows(),this.updateArrowClass(),this.config.swipe&&Object(c.a)(this.sliderInner,"mousedown touchstart",this.startSwipe.bind(this)),this.isAnimating=!1}}t.a=l},function(e,t,i){"use strict";t.a=function(e){return document.querySelector(e)}},function(e,t,i){"use strict";t.a=function(e,t){e.classList?e.classList.add(t):e.className+=" "+t}},function(e,t,i){"use strict";t.a=function(e,t){e.classList?e.classList.remove(t):e.className=e.className.replace(new RegExp("(^|\\b)"+t.split(" ").join("|")+"(\\b|$)","gi")," ")}},function(e,t,i){"use strict";t.a=function(e,t){return e.classList?e.classList.contains(t):new RegExp("(^| )"+t+"( |$)","gi").test(e.className)}},function(e,t,i){"use strict";t.a=function(e,t,i){t.split(" ").forEach(function(t){return e.addEventListener(t,i,!1)})}},function(e,t,i){"use strict";t.a=function(e,t,i){t.split(" ").forEach(function(t){return e.removeEventListener(t,i,!1)})}}]).default});