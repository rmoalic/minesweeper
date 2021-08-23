/*! For license information please see index_bundle.js.LICENSE.txt */
(()=>{"use strict";const t="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,e=(t,e,s=null)=>{for(;e!==s;){const s=e.nextSibling;t.removeChild(e),e=s}},s=`{{lit-${String(Math.random()).slice(2)}}}`,i=`\x3c!--${s}--\x3e`,n=new RegExp(`${s}|${i}`),r="$lit$";class o{constructor(t,e){this.parts=[],this.element=e;const i=[],o=[],l=document.createTreeWalker(e.content,133,null,!1);let c=0,p=-1,u=0;const{strings:m,values:{length:f}}=t;for(;u<f;){const t=l.nextNode();if(null!==t){if(p++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:s}=e;let i=0;for(let t=0;t<s;t++)a(e[t].name,r)&&i++;for(;i-- >0;){const e=m[u],s=d.exec(e)[2],i=s.toLowerCase()+r,o=t.getAttribute(i);t.removeAttribute(i);const a=o.split(n);this.parts.push({type:"attribute",index:p,name:s,strings:a}),u+=a.length-1}}"TEMPLATE"===t.tagName&&(o.push(t),l.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(s)>=0){const s=t.parentNode,o=e.split(n),l=o.length-1;for(let e=0;e<l;e++){let i,n=o[e];if(""===n)i=h();else{const t=d.exec(n);null!==t&&a(t[2],r)&&(n=n.slice(0,t.index)+t[1]+t[2].slice(0,-r.length)+t[3]),i=document.createTextNode(n)}s.insertBefore(i,t),this.parts.push({type:"node",index:++p})}""===o[l]?(s.insertBefore(h(),t),i.push(t)):t.data=o[l],u+=l}}else if(8===t.nodeType)if(t.data===s){const e=t.parentNode;null!==t.previousSibling&&p!==c||(p++,e.insertBefore(h(),t)),c=p,this.parts.push({type:"node",index:p}),null===t.nextSibling?t.data="":(i.push(t),p--),u++}else{let e=-1;for(;-1!==(e=t.data.indexOf(s,e+1));)this.parts.push({type:"node",index:-1}),u++}}else l.currentNode=o.pop()}for(const t of i)t.parentNode.removeChild(t)}}const a=(t,e)=>{const s=t.length-e.length;return s>=0&&t.slice(s)===e},l=t=>-1!==t.index,h=()=>document.createComment(""),d=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function c(t,e){const{element:{content:s},parts:i}=t,n=document.createTreeWalker(s,133,null,!1);let r=u(i),o=i[r],a=-1,l=0;const h=[];let d=null;for(;n.nextNode();){a++;const t=n.currentNode;for(t.previousSibling===d&&(d=null),e.has(t)&&(h.push(t),null===d&&(d=t)),null!==d&&l++;void 0!==o&&o.index===a;)o.index=null!==d?-1:o.index-l,r=u(i,r),o=i[r]}h.forEach((t=>t.parentNode.removeChild(t)))}const p=t=>{let e=11===t.nodeType?0:1;const s=document.createTreeWalker(t,133,null,!1);for(;s.nextNode();)e++;return e},u=(t,e=-1)=>{for(let s=e+1;s<t.length;s++){const e=t[s];if(l(e))return s}return-1},m=new WeakMap,f=t=>"function"==typeof t&&m.has(t),_={},g={};class y{constructor(t,e,s){this.__parts=[],this.template=t,this.processor=e,this.options=s}update(t){let e=0;for(const s of this.__parts)void 0!==s&&s.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}_clone(){const e=t?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),s=[],i=this.template.parts,n=document.createTreeWalker(e,133,null,!1);let r,o=0,a=0,h=n.nextNode();for(;o<i.length;)if(r=i[o],l(r)){for(;a<r.index;)a++,"TEMPLATE"===h.nodeName&&(s.push(h),n.currentNode=h.content),null===(h=n.nextNode())&&(n.currentNode=s.pop(),h=n.nextNode());if("node"===r.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(h.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(h,r.name,r.strings,this.options));o++}else this.__parts.push(void 0),o++;return t&&(document.adoptNode(e),customElements.upgrade(e)),e}}const v=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:t=>t}),b=` ${s} `;class w{constructor(t,e,s,i){this.strings=t,this.values=e,this.type=s,this.processor=i}getHTML(){const t=this.strings.length-1;let e="",n=!1;for(let o=0;o<t;o++){const t=this.strings[o],a=t.lastIndexOf("\x3c!--");n=(a>-1||n)&&-1===t.indexOf("--\x3e",a+1);const l=d.exec(t);e+=null===l?t+(n?b:i):t.substr(0,l.index)+l[1]+l[2]+r+l[3]+s}return e+=this.strings[t],e}getTemplateElement(){const t=document.createElement("template");let e=this.getHTML();return void 0!==v&&(e=v.createHTML(e)),t.innerHTML=e,t}}const S=t=>null===t||!("object"==typeof t||"function"==typeof t),x=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class C{constructor(t,e,s){this.dirty=!0,this.element=t,this.name=e,this.strings=s,this.parts=[];for(let t=0;t<s.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new k(this)}_getValue(){const t=this.strings,e=t.length-1,s=this.parts;if(1===e&&""===t[0]&&""===t[1]){const t=s[0].value;if("symbol"==typeof t)return String(t);if("string"==typeof t||!x(t))return t}let i="";for(let n=0;n<e;n++){i+=t[n];const e=s[n];if(void 0!==e){const t=e.value;if(S(t)||!x(t))i+="string"==typeof t?t:String(t);else for(const e of t)i+="string"==typeof e?e:String(e)}}return i+=t[e],i}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class k{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===_||S(t)&&t===this.value||(this.value=t,f(t)||(this.committer.dirty=!0))}commit(){for(;f(this.value);){const t=this.value;this.value=_,t(this)}this.value!==_&&this.committer.commit()}}class P{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(h()),this.endNode=t.appendChild(h())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=h()),t.__insert(this.endNode=h())}insertAfterPart(t){t.__insert(this.startNode=h()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){if(null===this.startNode.parentNode)return;for(;f(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=_,t(this)}const t=this.__pendingValue;t!==_&&(S(t)?t!==this.value&&this.__commitText(t):t instanceof w?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):x(t)?this.__commitIterable(t):t===g?(this.value=g,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,s="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=s:this.__commitNode(document.createTextNode(s)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof y&&this.value.template===e)this.value.update(t.values);else{const s=new y(e,t.processor,this.options),i=s._clone();s.update(t.values),this.__commitNode(i),this.value=s}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let s,i=0;for(const n of t)s=e[i],void 0===s&&(s=new P(this.options),e.push(s),0===i?s.appendIntoPart(this):s.insertAfterPart(e[i-1])),s.setValue(n),s.commit(),i++;i<e.length&&(e.length=i,this.clear(s&&s.endNode))}clear(t=this.startNode){e(this.startNode.parentNode,t.nextSibling,this.endNode)}}class N{constructor(t,e,s){if(this.value=void 0,this.__pendingValue=void 0,2!==s.length||""!==s[0]||""!==s[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=s}setValue(t){this.__pendingValue=t}commit(){for(;f(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=_,t(this)}if(this.__pendingValue===_)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=_}}class E extends C{constructor(t,e,s){super(t,e,s),this.single=2===s.length&&""===s[0]&&""===s[1]}_createPart(){return new A(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class A extends k{}let T=!1;(()=>{try{const t={get capture(){return T=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}})();class O{constructor(t,e,s){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=s,this.__boundHandleEvent=t=>this.handleEvent(t)}setValue(t){this.__pendingValue=t}commit(){for(;f(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=_,t(this)}if(this.__pendingValue===_)return;const t=this.__pendingValue,e=this.value,s=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),i=null!=t&&(null==e||s);s&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),i&&(this.__options=V(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=_}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const V=t=>t&&(T?{capture:t.capture,passive:t.passive,once:t.once}:t.capture);function U(t){let e=M.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},M.set(t.type,e));let i=e.stringsArray.get(t.strings);if(void 0!==i)return i;const n=t.strings.join(s);return i=e.keyString.get(n),void 0===i&&(i=new o(t,t.getTemplateElement()),e.keyString.set(n,i)),e.stringsArray.set(t.strings,i),i}const M=new Map,R=new WeakMap,L=new class{handleAttributeExpressions(t,e,s,i){const n=e[0];return"."===n?new E(t,e.slice(1),s).parts:"@"===n?[new O(t,e.slice(1),i.eventContext)]:"?"===n?[new N(t,e.slice(1),s)]:new C(t,e,s).parts}handleTextExpression(t){return new P(t)}};"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.4.1");const z=(t,...e)=>new w(t,e,"html",L),I=(t,e)=>`${t}--${e}`;let q=!0;void 0===window.ShadyCSS?q=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),q=!1);const H=t=>e=>{const i=I(e.type,t);let n=M.get(i);void 0===n&&(n={stringsArray:new WeakMap,keyString:new Map},M.set(i,n));let r=n.stringsArray.get(e.strings);if(void 0!==r)return r;const a=e.strings.join(s);if(r=n.keyString.get(a),void 0===r){const s=e.getTemplateElement();q&&window.ShadyCSS.prepareTemplateDom(s,t),r=new o(e,s),n.keyString.set(a,r)}return n.stringsArray.set(e.strings,r),r},j=["html","svg"],B=new Set;window.JSCompiler_renameProperty=(t,e)=>t;const F={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},$=(t,e)=>e!==t&&(e==e||t==t),X={attribute:!0,type:String,converter:F,reflect:!1,hasChanged:$};class W extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach(((e,s)=>{const i=this._attributeNameForProperty(s,e);void 0!==i&&(this._attributeToPropertyMap.set(i,s),t.push(i))})),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach(((t,e)=>this._classProperties.set(e,t)))}}static createProperty(t,e=X){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const s="symbol"==typeof t?Symbol():`__${t}`,i=this.getPropertyDescriptor(t,s,e);void 0!==i&&Object.defineProperty(this.prototype,t,i)}static getPropertyDescriptor(t,e,s){return{get(){return this[e]},set(i){const n=this[t];this[e]=i,this.requestUpdateInternal(t,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this._classProperties&&this._classProperties.get(t)||X}static finalize(){const t=Object.getPrototypeOf(this);if(t.hasOwnProperty("finalized")||t.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const s of e)this.createProperty(s,t[s])}}static _attributeNameForProperty(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,s=$){return s(t,e)}static _propertyValueFromAttribute(t,e){const s=e.type,i=e.converter||F,n="function"==typeof i?i:i.fromAttribute;return n?n(t,s):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const s=e.type,i=e.converter;return(i&&i.toAttribute||F.toAttribute)(t,s)}initialize(){this._updateState=0,this._updatePromise=new Promise((t=>this._enableUpdatingResolver=t)),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach(((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}}))}_applyInstanceProperties(){this._instanceProperties.forEach(((t,e)=>this[e]=t)),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,s){e!==s&&this._attributeToProperty(t,s)}_propertyToAttribute(t,e,s=X){const i=this.constructor,n=i._attributeNameForProperty(t,s);if(void 0!==n){const t=i._propertyValueToAttribute(e,s);if(void 0===t)return;this._updateState=8|this._updateState,null==t?this.removeAttribute(n):this.setAttribute(n,t),this._updateState=-9&this._updateState}}_attributeToProperty(t,e){if(8&this._updateState)return;const s=this.constructor,i=s._attributeToPropertyMap.get(t);if(void 0!==i){const t=s.getPropertyOptions(i);this._updateState=16|this._updateState,this[i]=s._propertyValueFromAttribute(e,t),this._updateState=-17&this._updateState}}requestUpdateInternal(t,e,s){let i=!0;if(void 0!==t){const n=this.constructor;s=s||n.getPropertyOptions(t),n._valueHasChanged(this[t],e,s.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==s.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,s))):i=!1}!this._hasRequestedUpdate&&i&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(t,e){return this.requestUpdateInternal(t,e),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(t){}const t=this.performUpdate();return null!=t&&await t,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{t=this.shouldUpdate(e),t?this.update(e):this._markUpdated()}catch(e){throw t=!1,this._markUpdated(),e}t&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach(((t,e)=>this._propertyToAttribute(e,this[e],t))),this._reflectingProperties=void 0),this._markUpdated()}updated(t){}firstUpdated(t){}}W.finalized=!0;const Y=Element.prototype;Y.msMatchesSelector||Y.webkitMatchesSelector;const Z=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,D=Symbol();class J{constructor(t,e){if(e!==D)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(Z?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const G=(t,...e)=>{const s=e.reduce(((e,s,i)=>e+(t=>{if(t instanceof J)return t.cssText;if("number"==typeof t)return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(s)+t[i+1]),t[0]);return new J(s,D)};(window.litElementVersions||(window.litElementVersions=[])).push("2.5.1");const K={};class Q extends W{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const t=this.getStyles();if(Array.isArray(t)){const e=(t,s)=>t.reduceRight(((t,s)=>Array.isArray(s)?e(s,t):(t.add(s),t)),s),s=e(t,new Set),i=[];s.forEach((t=>i.unshift(t))),this._styles=i}else this._styles=void 0===t?[]:[t];this._styles=this._styles.map((t=>{if(t instanceof CSSStyleSheet&&!Z){const e=Array.prototype.slice.call(t.cssRules).reduce(((t,e)=>t+e.cssText),"");return new J(String(e),D)}return t}))}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow(this.constructor.shadowRootOptions)}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?Z?this.renderRoot.adoptedStyleSheets=t.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map((t=>t.cssText)),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){const e=this.render();super.update(t),e!==K&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach((t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)})))}render(){return K}}Q.finalized=!0,Q.render=(t,s,i)=>{if(!i||"object"!=typeof i||!i.scopeName)throw new Error("The `scopeName` option is required.");const n=i.scopeName,r=R.has(s),o=q&&11===s.nodeType&&!!s.host,a=o&&!B.has(n),l=a?document.createDocumentFragment():s;if(((t,s,i)=>{let n=R.get(s);void 0===n&&(e(s,s.firstChild),R.set(s,n=new P(Object.assign({templateFactory:U},i))),n.appendInto(s)),n.setValue(t),n.commit()})(t,l,Object.assign({templateFactory:H(n)},i)),a){const t=R.get(l);R.delete(l);((t,e,s)=>{B.add(t);const i=s?s.element:document.createElement("template"),n=e.querySelectorAll("style"),{length:r}=n;if(0===r)return void window.ShadyCSS.prepareTemplateStyles(i,t);const o=document.createElement("style");for(let t=0;t<r;t++){const e=n[t];e.parentNode.removeChild(e),o.textContent+=e.textContent}(t=>{j.forEach((e=>{const s=M.get(I(e,t));void 0!==s&&s.keyString.forEach((t=>{const{element:{content:e}}=t,s=new Set;Array.from(e.querySelectorAll("style")).forEach((t=>{s.add(t)})),c(t,s)}))}))})(t);const a=i.content;s?function(t,e,s=null){const{element:{content:i},parts:n}=t;if(null==s)return void i.appendChild(e);const r=document.createTreeWalker(i,133,null,!1);let o=u(n),a=0,l=-1;for(;r.nextNode();)for(l++,r.currentNode===s&&(a=p(e),s.parentNode.insertBefore(e,s));-1!==o&&n[o].index===l;){if(a>0){for(;-1!==o;)n[o].index+=a,o=u(n,o);return}o=u(n,o)}}(s,o,a.firstChild):a.insertBefore(o,a.firstChild),window.ShadyCSS.prepareTemplateStyles(i,t);const l=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)e.insertBefore(l.cloneNode(!0),e.firstChild);else if(s){a.insertBefore(o,a.firstChild);const t=new Set;t.add(o),c(s,t)}})(n,l,t.value instanceof y?t.value.template:void 0),e(s,s.firstChild),s.appendChild(l),R.set(s,t)}!r&&o&&window.ShadyCSS.styleElement(s.host)},Q.shadowRootOptions={mode:"open"};const tt=G`
  :host {
    position: fixed;
    display: flex;
    top: 0;
    left: 0;
    z-index: 99;
    width: 100vw;
    height: 100vh;
    visibility: hidden;
    backface-visibility: hidden;
  }

  :host([opened]) {
    visibility: visible;
  }

  .content {
    position: relative;
    z-index: 3;
    margin: auto;
    min-width: var(--kemet-modal-min-width, 0);
    max-width: var(--kemet-modal-max-width, none);
  }

  .overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    visibility: hidden;
    top: 0;
    left: 0;
    z-index: 1;
    opacity: 0;
    background: var(--kemet-modal-overlay-bgcolor, rgba(0,0,0,0.2));
    transition: all var(--kemet-modal-transition-speed, 0.3s);
  }

  :host([opened]) .overlay {
    opacity: 1;
    visibility: visible;
  }
`,et=G`
  /* fadein-scaleup */
  :host([effect="fadein-scaleup"]) .content {
    transform: scale(0.7);
    opacity: 0;
    transition: all var(--kemet-modal-transition-speed, 0.3s);
  }

  :host([effect="fadein-scaleup"][opened]) .content {
    transform: scale(1);
    opacity: 1;
  }

  /* slide-right */
  :host([effect="slide-right"]) .content {
    transform: translateX(20%);
    opacity: 0;
    transition: all var(--kemet-modal-transition-speed, 0.3s) cubic-bezier(0.25, 0.5, 0.5, 0.9);
  }

  :host([effect="slide-right"][opened]) .content {
    transform: translateX(0);
    opacity: 1;
  }

  /* slide-bottom */
  :host([effect="slide-bottom"]) .content {
    transform: translateY(20%);
    opacity: 0;
    transition: all var(--kemet-modal-transition-speed, 0.3s);
  }

  :host([effect="slide-bottom"][opened]) .content {
    transform: translateY(0);
    opacity: 1;
  }

  /* newspaper */
  :host([effect="newspaper"]) .content {
    transform: scale(0) rotate(720deg);
    opacity: 0;
    transition: all var(--kemet-modal-transition-speed, 0.3s);
  }

  :host([effect="newspaper"][opened]) .content {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }

  /* fall */
  :host([effect="fall"]) {
    perspective: 1300px;
  }

  :host([effect="fall"]) .content {
    transform-style: preserve-3d;
    transform: translateZ(600px) rotateX(20deg);
    opacity: 0;
  }

  :host([effect="fall"][opened]) .content {
    transition: all var(--kemet-modal-transition-speed, 0.3s) ease-in;
    transform: translateZ(0px) rotateX(0deg);
    opacity: 1;
  }

  /* side-fall */
  :host([effect="side-fall"]) {
    perspective: 1300px;
  }

  :host([effect="side-fall"]) .content {
    transform-style: preserve-3d;
    transform: translate(30%) translateZ(600px) rotate(10deg);
    opacity: 0;
  }

  :host([effect="side-fall"][opened]) .content {
    transition: all var(--kemet-modal-transition-speed, 0.3s) ease-in;
    transform: translate(0%) translateZ(0) rotate(0deg);
    opacity: 1;
  }

  /* flip-horizontal */
  :host([effect="flip-horizontal"]) {
    perspective: 1300px;
  }

  :host([effect="flip-horizontal"]) .content {
    transform-style: preserve-3d;
    transform: rotateY(-70deg);
    transition: all var(--kemet-modal-transition-speed, 0.3s);
    opacity: 0;
  }

  :host([effect="flip-horizontal"][opened]) .content {
    transform: rotateY(0deg);
    opacity: 1;
  }

  /* flip-vertical */
  :host([effect="flip-vertical"]) {
    perspective: 1300px;
  }

  :host([effect="flip-vertical"]) .content {
    transform-style: preserve-3d;
    transform: rotateX(-70deg);
    transition: all var(--kemet-modal-transition-speed, 0.3s);
    opacity: 0;
  }

  :host([effect="flip-vertical"][opened]) .content {
    transform: rotateX(0deg);
    opacity: 1;
  }

  /* sign-3d */
  :host([effect="sign-3d"]) {
    perspective: 1300px;
  }

  :host([effect="sign-3d"]) .content {
    transform-style: preserve-3d;
    transform: rotateX(-60deg);
    transform-origin: 50% 0;
    opacity: 0;
    transition: all var(--kemet-modal-transition-speed, 0.3s);
  }

  :host([effect="sign-3d"][opened]) .content {
    transform: rotateX(0deg);
    opacity: 1;
  }

  /* super-scaled */
  :host([effect="super-scaled"]) .content {
    transform: scale(2);
    opacity: 0;
    transition: all var(--kemet-modal-transition-speed, 0.3s);
  }

  :host([effect="super-scaled"][opened]) .content {
    transform: scale(1);
    opacity: 1;
  }

  /* slit */
  :host([effect="slit"]) {
    perspective: 1300px;
  }

  :host([effect="slit"]) .content {
    transform-style: preserve-3d;
    transform: translateZ(-3000px) rotateY(90deg);
    opacity: 0;
  }

  :host([effect="slit"][opened]) .content {
    animation: slit .7s forwards ease-out;
  }

  @keyframes slit {
    50% {
      transform: translateZ(-250px) rotateY(89deg);
      opacity: 1;
      animation-timing-function: ease-in;}
    100% {
      transform: translateZ(0) rotateY(0deg);
      opacity: 1;
    }
  }

  /* rotate-bottom */
  :host([effect="rotate-bottom"]) {
    perspective: 1300px;
  }

  :host([effect="rotate-bottom"]) .content {
    transform-style: preserve-3d;
    transform: translateY(100%) rotateX(90deg);
    transform-origin: 0 100%;
    opacity: 0;
    transition: all var(--kemet-modal-transition-speed, 0.3s) ease-out;
  }

  :host([effect="rotate-bottom"][opened]) .content {
    transform: translateY(0%) rotateX(0deg);
    opacity: 1;
  }

  /* rotate-left */
  :host([effect="rotate-left"]) {
    perspective: 1300px;
  }

  :host([effect="rotate-left"]) .content {
    transform-style: preserve-3d;
    transform: translateZ(100px) translateX(-30%) rotateY(90deg);
    transform-origin: 0 100%;
    opacity: 0;
    transition: all var(--kemet-modal-transition-speed, 0.3s);
  }

  :host([effect="rotate-left"][opened]) .content {
    transform: translateZ(0px) translateX(0%) rotateY(0deg);
    opacity: 1;
  }
`;window.customElements.define("kemet-modal",class extends Q{static get styles(){return[tt,et]}static get properties(){return{opened:{type:Boolean,reflect:!0},effect:{type:String,reflect:!0},closeOnClick:{type:Boolean}}}constructor(){super(),this.opened=!1,this.closeOnClick=!1,this.addEventListener("kemet-modal-close-btn",this.close.bind(this))}render(){return z`
      <div class="content">
        <slot></slot>
      </div>

      <div class="overlay"></div>
    `}firstUpdated(){this.addEventListener("click",(t=>{this.opened&&this.closeOnClick&&"kemet-modal"===t.target.tagName.toLowerCase()&&this.close()}))}open(){this.opened=!0,this.dispatchEvent(new CustomEvent("kemet-modal-open",{bubbles:!0,composed:!0,detail:this}))}close(){this.opened=!1,this.dispatchEvent(new CustomEvent("kemet-modal-close",{bubbles:!0,composed:!0,detail:this}))}}),window.customElements.define("kemet-modal-close",class extends Q{render(){return z`
      <slot @click=${this.close}></slot>
    `}close(){this.dispatchEvent(new CustomEvent("kemet-modal-close-btn",{bubbles:!0,composed:!0,detail:this}))}});class st extends class{constructor(){this.observers=new Array}registerObserver(t){this.observers.push(t)}unregisterObserver(t){this.observers=this.observers.filter((e=>e!=t))}notifyObserver(){this.observers.forEach((t=>t.update(this)))}}{constructor(){super(),this._value=0,this._uncovered=!1,this._flagged=!1,this.notifyObserver()}get value(){return this._value}set value(t){this._value=t,this.notifyObserver()}get uncovered(){return this._uncovered}set uncovered(t){this._uncovered=t,this.notifyObserver()}get flagged(){return this._flagged}set flagged(t){this._flagged=t,this.notifyObserver()}}class it{constructor(t,e,s,i=!1){if(this.width=e,this.height=t,this.nb_mines=s,this.seed=1,s>=t*e)throw"nb_mine > nb_tiles";this.board=new Array(e);for(let e=0;e<this.width;e++){this.board[e]=new Array(t);for(let t=0;t<this.height;t++)this.board[e][t]=new st}this._fake_random=i,this.reset()}reset(){this.seed=1,this._is_won=!1,this._is_lost=!1,this.remaining_tiles=this.height*this.width-this.nb_mines;for(let t=0;t<this.width;t++)for(let e=0;e<this.height;e++){let s=this.board[t][e];s.flagged=!1,s.uncovered=!1,s.value=0}this.add_mines(),this.add_indicators()}get is_won(){return this._is_won}get is_lost(){return this._is_lost}get_board(){return this.board}play(t,e){if(!this.inside(t,e))return!0;if(this.board[t][e].flagged)return!0;if(this._is_lost||this.is_won)return!0;const s=-1==this.board[t][e].value;return s&&(this._is_lost=!0),0==this.board[t][e].value?this.uncover_blanc_tiles(t,e):-1==this.board[t][e].value?this.uncover_mines_and_flags():this.uncover_tile(t,e),!s&&this.remaining_tiles<=0&&(this.uncover_mines_and_flags(!0),this._is_won=!0),!s}flag(t,e){if(this.inside(t,e)&&!this.board[t][e].uncovered)return!(!this._is_lost&&!this._is_won)||void(this.board[t][e].flagged=!this.board[t][e].flagged)}uncover_tile(t,e){this.board[t][e].uncovered||(this.board[t][e].uncovered=!0,this.remaining_tiles--)}uncover_blanc_tiles(t,e){let s=[{x:t,y:e}];for(;s.length>0;){let t=s.pop();null!=t&&this.inside(t.x,t.y)&&(this.board[t.x][t.y].uncovered||this.board[t.x][t.y].flagged||(this.uncover_tile(t.x,t.y),0==this.board[t.x][t.y].value&&(s.push({x:t.x,y:t.y-1}),s.push({x:t.x,y:t.y+1}),s.push({x:t.x-1,y:t.y}),s.push({x:t.x+1,y:t.y}),s.push({x:t.x+1,y:t.y-1}),s.push({x:t.x+1,y:t.y+1}),s.push({x:t.x-1,y:t.y-1}),s.push({x:t.x-1,y:t.y+1}))))}}uncover_mines_and_flags(t=!1){for(let e=0;e<this.width;e++)for(let s=0;s<this.height;s++){let i=this.board[e][s];-1==i.value?(t&&!i.flagged&&this.flag(e,s),this.uncover_tile(e,s)):i.flagged&&this.uncover_tile(e,s)}}add_mines(){let t=this._fake_random?this.fake_random():Math.random;for(let e=0;e<this.nb_mines;e++){let e=!1,s=0;for(;!e;){let i=Math.round(t()*(this.width-1)),n=Math.round(t()*(this.height-1));if(-1!=this.board[i][n].value)this.board[i][n].value=-1,e=!0;else if(s++,s>300)throw"infinite loop"}}}inc_tile(t,e){this.inside(t,e)&&-1!=this.board[t][e].value&&this.board[t][e].value++}inc_square(t,e){this.inc_tile(t,e-1),this.inc_tile(t,e+1),this.inc_tile(t-1,e-1),this.inc_tile(t-1,e+1),this.inc_tile(t+1,e-1),this.inc_tile(t+1,e+1),this.inc_tile(t-1,e),this.inc_tile(t+1,e)}add_indicators(){for(let t=0;t<this.width;t++)for(let e=0;e<this.height;e++)-1==this.board[t][e].value&&this.inc_square(t,e)}inside(t,e){return t>=0&&t<this.width&&e>=0&&e<this.height}fake_random(){return()=>{var t=1e4*Math.sin(this.seed++);return t-Math.floor(t)}}}class nt extends HTMLElement{constructor(){super(),this.update_element(0,!1,!1)}update(t){null!=t&&this.update_element(t.value,t.uncovered,t.flagged)}update_element(t,e,s){if(e){switch(t){case-1:s?(this.textContent="💣",this.style.backgroundColor="green"):(this.textContent="💥",this.style.backgroundColor="red");break;case 0:this.textContent=" ",this.style.backgroundColor="white";break;default:this.textContent=t.toString(),this.style.backgroundColor="lightblue"}switch(t){case 1:this.style.color="blue";break;case 2:this.style.color="darkgreen";break;case 3:this.style.color="red";break;case 4:this.style.color="darkblue";break;case 5:this.style.color="darkred";break;case 6:this.style.color="darkturquoise";break;case 7:this.style.color="darkmagenta";break;case 7:this.style.color="darkorange";break;default:this.style.color="black"}}else s?(this.textContent="🚩",this.style.backgroundColor="lightgray"):(this.textContent=" ",this.style.backgroundColor="grey");-1!=t&&s&&e&&(this.textContent="🚩",this.style.backgroundColor="violet")}}customElements.define("ms-tile",nt);class rt extends HTMLElement{constructor(){super(),this.height=15,this.width=15,this.mines=10,this.fake_random=!1,this.attributes_changed=!1,this.saveAttributes();const t=this.attachShadow({mode:"open"});t.addEventListener("reset",this.reset);const e=document.createElement("style");e.innerHTML='\n            :host {\n                display: block;\n                contain: content;\n                font: 16px "DejaVu Sans", sans-serif;\n            }\n            :host([hidden]) {\n                display: none;\n            }\n            ms-tile {\n                display: inline-block;\n                width: 1.2em;\n                height: 1.2em;\n                border: 1px solid black;\n                text-align: center;\n                vertical-align: middle;\n                margin: 1px;\n                font-size: 20px;\n                font-weight: bold;\n            }\n            .board {\n                white-space: nowrap;\n                overflow: auto;\n                user-select: none;\n            }\n        ',t.appendChild(e),this.status_bar=document.createElement("div");const s=document.createElement("span");s.textContent="Game: ",this.status_text=document.createElement("span"),this.status_text.textContent="Ongoing",this.status_bar.appendChild(s),this.status_bar.appendChild(this.status_text),t.appendChild(this.status_bar),this.game_board=document.createElement("div"),this.game_board.classList.add("board"),this.ms=new it(this.height,this.width,this.mines,this.fake_random);const i=this.ms.get_board();this.init_table(i),t.appendChild(this.game_board)}saveAttributes(){if(this.hasAttribute("height")){const t=this.getAttribute("height");null!=t&&(this.height=Number.parseInt(t))}if(this.hasAttribute("width")){const t=this.getAttribute("width");null!=t&&(this.width=Number.parseInt(t))}if(this.hasAttribute("mines")){const t=this.getAttribute("mines");null!=t&&(this.mines=Number.parseInt(t))}this.fake_random=this.hasAttribute("fake_random")}init_table(t){this.game_board.innerHTML="";for(let e=this.height-1;e>=0;e--){const s=document.createElement("div");for(let i=0;i<this.width;i++){const n=new nt;t[i][e].registerObserver(n),n.setAttribute("x",i.toString()),n.setAttribute("y",e.toString()),n.onclick=this.ms_click.bind(this),n.oncontextmenu=this.ms_click.bind(this),s.appendChild(n)}this.game_board.appendChild(s)}}reset(){if(this.status_text.textContent="Ongoing",this.attributes_changed){this.saveAttributes();try{this.ms=new it(this.height,this.width,this.mines,this.fake_random);const t=this.ms.get_board();this.init_table(t)}catch(t){throw this.status_text.textContent="Error",t}}else this.ms.reset()}ms_click(t){if(null==t.target)return!1;const e=t.target,s=e.getAttribute("x");if(null==s)return!1;const i=e.getAttribute("y");if(null==i)return!1;const n=parseInt(s),r=parseInt(i);return 0==t.button?this.ms.play(n,r):this.ms.flag(n,r),this.ms.is_won?(this.status_text.textContent="WON !!!",this.dispatchEvent(new Event("won"))):this.ms.is_lost&&(this.status_text.textContent="lost :(",this.dispatchEvent(new Event("lost"))),!1}attributeChangedCallback(t,e,s){null==s&&"fake_random"!==t||(this.attributes_changed=!0)}static get observedAttributes(){return["width","height","mines","fake_random"]}}customElements.define("ms-element",rt)})();