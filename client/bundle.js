!function(e){var t={};function o(n){if(t[n])return t[n].exports;var s=t[n]={i:n,l:!1,exports:{}};return e[n].call(s.exports,s,s.exports,o),s.l=!0,s.exports}o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)o.d(n,s,function(t){return e[t]}.bind(null,s));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=14)}([function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return SzBaseElement}));const inlineEvents=["click","change","focusout","focusin"];class SzBaseElement extends HTMLElement{constructor(e,t){super(),this.commentMap=new Map,e&&(this.loadTemplate(e,t),this.initInlineEventBinding(),this.initNodeIfStatus(),this.setRefElements())}loadTemplate(e,t){if(t){const o=document.createElement("template");o.innerHTML=e,this.attachShadow({mode:t}),this.shadowRoot.appendChild(o.content.cloneNode(!0))}else this.innerHTML=e}connectedCallback(){console.log("connectedCallback")}initInlineEventBinding(){const e=this;inlineEvents.forEach(t=>{this.querySelectorAll(`[${t}]`).forEach(o=>{const n=o.getAttribute(t);o.addEventListener(t,()=>{e[n]()})})})}disconnectedCallback(){console.log("called"),this.onDisconnect&&this.onDisconnect()}initNodeIfStatus(){const e=new RegExp(/([\[\]\-_a-z0-9A-Z\.]+)/g);this.querySelectorAll("[if]").forEach(t=>{const o=t.getAttribute("if"),n=o&&o.match(e)[0];console.log(n,o),!Object.hasOwnProperty.call(this,n)&&Object.defineProperty(this,n,{get:()=>this[`_${n}`],set:e=>{console.log("set",n,e),this[`_${n}`]=e,this.updateDom()}}),this.seCommentElement(o,t)})}updateDomOld(){this.commentMap.forEach((val,key)=>{key=key.replace(/([A-Za-z0-9]+)/g,"this.$1"),console.log(key);const value=eval(key);console.log(value),value?val.forEach(e=>e.comment.replaceWith(e.dom)):val.forEach(e=>e.dom.replaceWith(e.comment))})}updateDom(){console.dir(this),this.commentMap.forEach((e,t)=>{t=t.replace(/([\[\]\-_a-z0-9A-Z\.]+)/g,"this.$1");const o=new Function(`return ${t}`),n=(()=>o.call(this))();console.log(t,n),n?e.forEach(e=>e.comment.replaceWith(e.dom)):e.forEach(e=>e.dom.replaceWith(e.comment))})}updateCurrentDom(e,t){t?e.forEach(e=>e.comment.replaceWith(e.dom)):e.forEach(e=>e.dom.replaceWith(e.comment))}setRefElements(...e){var t={};this.querySelectorAll("[ref]").forEach(e=>{const o=e.getAttribute("ref");t[o]=e}),this.elementRef=t}seCommentElement(e,t){let o=this.commentMap.get(e);o=o||[],this.commentMap.has(e)?(o=this.commentMap.get(e)).push(SzComment.create(t)):this.commentMap.set(e,[SzComment.create(t)])}}class SzComment{constructor(){}static create(e){const t=document.createComment(`${SzComment.counter++}`),o=new SzComment;return o.comment=t,o.dom=e,console.log(o),o}}SzComment.counter=0},function(e,t,o){"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var o=function(e,t){var o=e[1]||"",n=e[3];if(!n)return o;if(t&&"function"==typeof btoa){var s=(i=n,c=btoa(unescape(encodeURIComponent(JSON.stringify(i)))),a="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(c),"/*# ".concat(a," */")),r=n.sources.map((function(e){return"/*# sourceURL=".concat(n.sourceRoot).concat(e," */")}));return[o].concat(r).concat([s]).join("\n")}var i,c,a;return[o].join("\n")}(t,e);return t[2]?"@media ".concat(t[2],"{").concat(o,"}"):o})).join("")},t.i=function(e,o){"string"==typeof e&&(e=[[null,e,""]]);for(var n={},s=0;s<this.length;s++){var r=this[s][0];null!=r&&(n[r]=!0)}for(var i=0;i<e.length;i++){var c=e[i];null!=c[0]&&n[c[0]]||(o&&!c[2]?c[2]=o:o&&(c[2]="(".concat(c[2],") and (").concat(o,")")),t.push(c))}},t}},function(e,t,o){"use strict";var n,s={},r=function(){return void 0===n&&(n=Boolean(window&&document&&document.all&&!window.atob)),n},i=function(){var e={};return function(t){if(void 0===e[t]){var o=document.querySelector(t);if(window.HTMLIFrameElement&&o instanceof window.HTMLIFrameElement)try{o=o.contentDocument.head}catch(e){o=null}e[t]=o}return e[t]}}();function c(e,t){for(var o=[],n={},s=0;s<e.length;s++){var r=e[s],i=t.base?r[0]+t.base:r[0],c={css:r[1],media:r[2],sourceMap:r[3]};n[i]?n[i].parts.push(c):o.push(n[i]={id:i,parts:[c]})}return o}function a(e,t){for(var o=0;o<e.length;o++){var n=e[o],r=s[n.id],i=0;if(r){for(r.refs++;i<r.parts.length;i++)r.parts[i](n.parts[i]);for(;i<n.parts.length;i++)r.parts.push(b(n.parts[i],t))}else{for(var c=[];i<n.parts.length;i++)c.push(b(n.parts[i],t));s[n.id]={id:n.id,refs:1,parts:c}}}}function l(e){var t=document.createElement("style");if(void 0===e.attributes.nonce){var n=o.nc;n&&(e.attributes.nonce=n)}if(Object.keys(e.attributes).forEach((function(o){t.setAttribute(o,e.attributes[o])})),"function"==typeof e.insert)e.insert(t);else{var s=i(e.insert||"head");if(!s)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");s.appendChild(t)}return t}var u,d=(u=[],function(e,t){return u[e]=t,u.filter(Boolean).join("\n")});function p(e,t,o,n){var s=o?"":n.css;if(e.styleSheet)e.styleSheet.cssText=d(t,s);else{var r=document.createTextNode(s),i=e.childNodes;i[t]&&e.removeChild(i[t]),i.length?e.insertBefore(r,i[t]):e.appendChild(r)}}function h(e,t,o){var n=o.css,s=o.media,r=o.sourceMap;if(s&&e.setAttribute("media",s),r&&btoa&&(n+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r))))," */")),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}var f=null,m=0;function b(e,t){var o,n,s;if(t.singleton){var r=m++;o=f||(f=l(t)),n=p.bind(null,o,r,!1),s=p.bind(null,o,r,!0)}else o=l(t),n=h.bind(null,o,t),s=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(o)};return n(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;n(e=t)}else s()}}e.exports=function(e,t){(t=t||{}).attributes="object"==typeof t.attributes?t.attributes:{},t.singleton||"boolean"==typeof t.singleton||(t.singleton=r());var o=c(e,t);return a(o,t),function(e){for(var n=[],r=0;r<o.length;r++){var i=o[r],l=s[i.id];l&&(l.refs--,n.push(l))}e&&a(c(e,t),t);for(var u=0;u<n.length;u++){var d=n[u];if(0===d.refs){for(var p=0;p<d.parts.length;p++)d.parts[p]();delete s[d.id]}}}}},function(e,t){e.exports="<div class=sz-slider-backdrop></div> <div class=sz-slider-main> </div>"},function(e,t){e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black"><path d="M0 0h24v24H0z" fill="none"></path><path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></svg>'},function(e,t){e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black"><path d="M0 0h24v24H0z" fill="none"></path><path d="M9 16h2V8H9v8zm3-14C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-4h2V8h-2v8z"></path></svg>'},function(e,t){e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black"><path d="M0 0h24v24H0z" fill="none"></path><circle cx="12" cy="12" r="3.2"></circle><path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"></path></svg>'},function(e,t){e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M20 4h-3.17L15 2H9L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h4.05l.59-.65L9.88 4h4.24l1.24 1.35.59.65H20v12zM12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8.2c-1.77 0-3.2-1.43-3.2-3.2 0-1.77 1.43-3.2 3.2-3.2s3.2 1.43 3.2 3.2c0 1.77-1.43 3.2-3.2 3.2z"></path></svg>'},function(e,t){e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black"><path d="M0 0h24v24H0z" fill="none"></path><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>'},function(e,t){e.exports='<div class=sz-puppeteer-action-button-group if=!isCaptureMode> <button class=sz-button-icon if=!isPaused szpopover="Take Screen shot" click=initCapture> <sz-icon-camera></sz-icon-camera> </button> <button class=sz-button-icon if=!isPaused szpopover="Resume the Process" click=resume> <sz-icon-play></sz-icon-play> </button> <button class=sz-button-icon if=isPaused szpopover="Pause the Process" click=pause> <sz-icon-pause></sz-icon-pause> </button> </div>'},function(e,t,o){var n=o(11);"string"==typeof n&&(n=[[e.i,n,""]]);var s={insert:"head",singleton:!1};o(2)(n,s);n.locals&&(e.exports=n.locals)},function(e,t,o){(e.exports=o(1)(!1)).push([e.i,".sz-slider-backdrop{position:fixed;width:100%;height:100%;background-color:#0000004d;left:0;top:0}.sz-slider-main{position:fixed;top:0;box-sizing:border-box;background-color:#FFF;height:100%;max-width:700px;right:0;transform:translate(100%);transition:transform .5s ease;display:flex;flex-direction:column;width:100%;max-width:600px}.sz-slider-main header{height:100px;margin-bottom:20px;background-color:#EEEEEE;display:flex;justify-content:center;align-items:center}\n",""])},function(e,t,o){var n=o(13);"string"==typeof n&&(n=[[e.i,n,""]]);var s={insert:"head",singleton:!1};o(2)(n,s);n.locals&&(e.exports=n.locals)},function(e,t,o){(e.exports=o(1)(!1)).push([e.i,'p{padding:0;margin:0}body{color:rgba(0,0,0,0.75)}.sz-button-icon{padding:10px;border:1px solid #00bcd4;background:transparent;color:#00bcd4;cursor:pointer;margin:0 2px}.sz-button-icon:hover,.sz-button-icon:active,.sz-button-icon:focus{border-color:#008ba3;color:#008ba3}.sz-button-icon:focus{outline-color:#008ba3}.sz-button{padding:10px;border:1px solid #00bcd4;background:transparent;color:#00bcd4;cursor:pointer;margin:0 2px}.sz-button:hover,.sz-button:active,.sz-button:focus{border-color:#008ba3;color:#008ba3}.sz-button:focus{outline-color:#008ba3}.sz-button-solid{padding:10px;border:1px solid #00bcd4;background:#00bcd4;color:rgba(0,0,0,0.75);cursor:pointer;margin:0 2px}.sz-button-solid:hover,.sz-button-solid:active,.sz-button-solid:focus{border-color:#008ba3}.sz-button-solid:focus{outline-color:#008ba3}.sz-button-clear{padding:10px;border:1px solid #00bcd4;background:transparent;color:#00bcd4;cursor:pointer;margin:0 2px}.sz-button-clear:hover,.sz-button-clear:active,.sz-button-clear:focus{border-color:#008ba3;color:#008ba3}.sz-button-clear:focus{outline-color:#008ba3}.sz-button-icon{display:flex;align-self:flex-end;justify-self:flex-start;height:30px;width:30px;align-items:center;justify-content:center;background:transparent;border:none;cursor:pointer}.sz-link{background:transparent;border:1px solid transparent;cursor:pointer;color:#000;padding:10px;display:flex;margin:0 2px}.sz-link:hover{border-color:#000}.sz-link:focus{border-color:#000;outline-color:#000}.sz-anchor-link{background:transparent;cursor:pointer;color:#00bcd4;padding:10px;display:flex;margin:0 2px}.sz-anchor-link:hover{border-color:#00bcd4}.sz-anchor-link:focus{border-color:#00bcd4;outline-color:#00bcd4}.sz-spacer{flex:1 0 auto}.sz-input-wrapper{margin:0px 10px}input[type="text"]{padding:8px}.sz-flex{display:flex;flex-direction:column}.sz-flex-row{display:flex;flex-direction:row}.sz-flex-row.sz-flex-center{justify-content:center;justify-items:center}.sz-base-icon{height:inherit;width:inherit}.sz-checkbox{height:20px;width:20px;cursor:pointer}canvas{position:fixed;top:0;left:0;z-index:999999;box-sizing:border-box;border:1px solid black}sz-puppeteer-action-button{z-index:9999;display:flex;flex-direction:column;position:fixed;top:10px;right:10px;padding:5px}sz-puppeteer-action-button .sz-puppeteer-action-button-group{display:flex;flex-direction:column}\n',""])},function(e,t,o){"use strict";o.r(t);var n=o(0),s=o(3),r=o.n(s);o(10);class i{constructor(e={}){this.hasBackdrop=!1,this.maxWidth="600px"}static create(e={}){return new i(e)}}class c extends n.a{constructor(){super(r.a),this.classList.add("sz-slider-container"),this.init()}insert(e,t){const o=this.querySelector(".sz-slider-main");this.updateConfig(o,t),this.elementInstance=new e,o.appendChild(this.elementInstance),setTimeout(()=>{o.style.transform="translate(0%)"},100)}close(){this.querySelector(".sz-slider-main").style.transform="",setTimeout(()=>{this.remove()},500)}init(){this.querySelector(".sz-slider-backdrop").addEventListener("click",()=>this.close())}addBackdrop(e){const t=document.createElement("div");t.classList.add("sz-popup-backdrop"),e.appendChild(t)}updateConfig(e,t=i.create()){e.style.maxWidth=t.maxWidth||"600px"}scrollStrategy(){}}customElements.define("sz-slider",c);class a extends HTMLElement{constructor(e){super(),e&&this.loadTemplate(e)}loadTemplate(e){this.innerHTML=e;const t=this.querySelector("svg").style;t.height=t.width="inherit",this.classList.add("sz-base-icon")}}(class{static register(e,t){const o=class extends t{constructor(...e){super(e),console.dir(this),console.log(typeof t)}};customElements.define(e,o),this.registry.set(e,o)}static get(e){return this.registry.get(e)}}).registry=new Map;var l=o(4),u=o.n(l),d=o(5),p=o.n(d),h=o(6),f=o.n(h),m=o(7),b=o.n(m),g=o(8),v=o.n(g);class x{static register(e,t){this.iconRegistry.set(e,t),customElements.define(`sz-icon-${e}`,class extends a{constructor(){super(t)}})}}x.iconRegistry=new Map,x.register("play",u.a),x.register("pause",p.a),x.register("camera",f.a),x.register("camera-outlined",b.a),x.register("close",v.a);var z=o(9),w=o.n(z);o(12);class y extends n.a{constructor(){super(w.a),this.isCaptureMode=!1,this.isPaused=!0,this.isResume=!1,this.updateDom()}drawable(e){const t=(t,o,n,s,r)=>{t.beginPath(),t.strokeStyle="black",t.lineWidth=0,t.clearRect(0,0,e.width,e.height),t.strokeRect(o,n,s-o,r-n),t.closePath()};let o=0,n=0;const s=e.getContext("2d");e.width=window.innerWidth,e.height=window.innerHeight;let r=e=>{t(s,o,n,e.offsetX,e.offsetY)};e.addEventListener("mousedown",t=>{o=t.offsetX,n=t.offsetY,e.addEventListener("mousemove",r)}),e.addEventListener("mouseup",i=>{e.removeEventListener("mousemove",r),t(s,o,n,i.offsetX,i.offsetY),console.log(o,n,i.offsetX-o,i.offsetY-n);window.onSnapshot;const c=document.body.getBoundingClientRect(),a={x:o,y:n-c.top,width:i.offsetX-o,height:i.offsetY-n};a.width<0&&(a.x=a.x+a.width,a.width=-a.width),a.height<0&&(a.y=a.y+a.height,a.height=-a.height),console.log(a),s.clearRect(0,0,e.width,e.height);const l=window;l.onPuppeteerScreenshot&&l.onPuppeteerScreenshot(a),o=0,n=0,this.disableCapture(e)})}initCapture(){const e=document.createElement("canvas");document.body.appendChild(e),this.drawable(e),this.isCaptureMode=!0}disableCapture(e){e.remove(),setTimeout(()=>this.isCaptureMode=!1,1e3)}pause(){this.isPaused=!1;const e=window;e.onPuppeteerPauseExecution&&e.onPuppeteerPauseExecution()}resume(){this.isPaused=!0;const e=window;e.onPuppeteerResumeExecution&&e.onPuppeteerResumeExecution()}}customElements.define("sz-puppeteer-action-button",y)}]);
//# sourceMappingURL=bundle.js.map