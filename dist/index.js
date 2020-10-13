(()=>{var e={20:e=>{"use strict";var r="%[a-f0-9]{2}",t=new RegExp(r,"gi"),n=new RegExp("("+r+")+","gi");function o(e,r){try{return decodeURIComponent(e.join(""))}catch(e){}if(1===e.length)return e;r=r||1;var t=e.slice(0,r),n=e.slice(r);return Array.prototype.concat.call([],o(t),o(n))}function a(e){try{return decodeURIComponent(e)}catch(a){for(var r=e.match(t),n=1;n<r.length;n++)r=(e=o(r,n).join("")).match(t);return e}}e.exports=function(e){if("string"!=typeof e)throw new TypeError("Expected `encodedURI` to be of type `string`, got `"+typeof e+"`");try{return e=e.replace(/\+/g," "),decodeURIComponent(e)}catch(r){return function(e){for(var r={"%FE%FF":"��","%FF%FE":"��"},t=n.exec(e);t;){try{r[t[0]]=decodeURIComponent(t[0])}catch(e){var o=a(t[0]);o!==t[0]&&(r[t[0]]=o)}t=n.exec(e)}r["%C2"]="�";for(var s=Object.keys(r),c=0;c<s.length;c++){var i=s[c];e=e.replace(new RegExp(i,"g"),r[i])}return e}(e)}}},563:(e,r,t)=>{"use strict";const n=t(610),o=t(20),a=t(500);function s(e){if("string"!=typeof e||1!==e.length)throw new TypeError("arrayFormatSeparator must be single character string")}function c(e,r){return r.encode?r.strict?n(e):encodeURIComponent(e):e}function i(e,r){return r.decode?o(e):e}function u(e){return Array.isArray(e)?e.sort():"object"==typeof e?u(Object.keys(e)).sort(((e,r)=>Number(e)-Number(r))).map((r=>e[r])):e}function l(e){const r=e.indexOf("#");return-1!==r&&(e=e.slice(0,r)),e}function p(e){const r=(e=l(e)).indexOf("?");return-1===r?"":e.slice(r+1)}function f(e,r){return r.parseNumbers&&!Number.isNaN(Number(e))&&"string"==typeof e&&""!==e.trim()?e=Number(e):!r.parseBooleans||null===e||"true"!==e.toLowerCase()&&"false"!==e.toLowerCase()||(e="true"===e.toLowerCase()),e}function m(e,r){s((r=Object.assign({decode:!0,sort:!0,arrayFormat:"none",arrayFormatSeparator:",",parseNumbers:!1,parseBooleans:!1},r)).arrayFormatSeparator);const t=function(e){let r;switch(e.arrayFormat){case"index":return(e,t,n)=>{r=/\[(\d*)\]$/.exec(e),e=e.replace(/\[\d*\]$/,""),r?(void 0===n[e]&&(n[e]={}),n[e][r[1]]=t):n[e]=t};case"bracket":return(e,t,n)=>{r=/(\[\])$/.exec(e),e=e.replace(/\[\]$/,""),r?void 0!==n[e]?n[e]=[].concat(n[e],t):n[e]=[t]:n[e]=t};case"comma":case"separator":return(r,t,n)=>{const o="string"==typeof t&&t.split("").indexOf(e.arrayFormatSeparator)>-1?t.split(e.arrayFormatSeparator).map((r=>i(r,e))):null===t?t:i(t,e);n[r]=o};default:return(e,r,t)=>{void 0!==t[e]?t[e]=[].concat(t[e],r):t[e]=r}}}(r),n=Object.create(null);if("string"!=typeof e)return n;if(!(e=e.trim().replace(/^[?#&]/,"")))return n;for(const o of e.split("&")){let[e,s]=a(r.decode?o.replace(/\+/g," "):o,"=");s=void 0===s?null:["comma","separator"].includes(r.arrayFormat)?s:i(s,r),t(i(e,r),s,n)}for(const e of Object.keys(n)){const t=n[e];if("object"==typeof t&&null!==t)for(const e of Object.keys(t))t[e]=f(t[e],r);else n[e]=f(t,r)}return!1===r.sort?n:(!0===r.sort?Object.keys(n).sort():Object.keys(n).sort(r.sort)).reduce(((e,r)=>{const t=n[r];return Boolean(t)&&"object"==typeof t&&!Array.isArray(t)?e[r]=u(t):e[r]=t,e}),Object.create(null))}r.extract=p,r.parse=m,r.stringify=(e,r)=>{if(!e)return"";s((r=Object.assign({encode:!0,strict:!0,arrayFormat:"none",arrayFormatSeparator:","},r)).arrayFormatSeparator);const t=t=>r.skipNull&&null==e[t]||r.skipEmptyString&&""===e[t],n=function(e){switch(e.arrayFormat){case"index":return r=>(t,n)=>{const o=t.length;return void 0===n||e.skipNull&&null===n||e.skipEmptyString&&""===n?t:null===n?[...t,[c(r,e),"[",o,"]"].join("")]:[...t,[c(r,e),"[",c(o,e),"]=",c(n,e)].join("")]};case"bracket":return r=>(t,n)=>void 0===n||e.skipNull&&null===n||e.skipEmptyString&&""===n?t:null===n?[...t,[c(r,e),"[]"].join("")]:[...t,[c(r,e),"[]=",c(n,e)].join("")];case"comma":case"separator":return r=>(t,n)=>null==n||0===n.length?t:0===t.length?[[c(r,e),"=",c(n,e)].join("")]:[[t,c(n,e)].join(e.arrayFormatSeparator)];default:return r=>(t,n)=>void 0===n||e.skipNull&&null===n||e.skipEmptyString&&""===n?t:null===n?[...t,c(r,e)]:[...t,[c(r,e),"=",c(n,e)].join("")]}}(r),o={};for(const r of Object.keys(e))t(r)||(o[r]=e[r]);const a=Object.keys(o);return!1!==r.sort&&a.sort(r.sort),a.map((t=>{const o=e[t];return void 0===o?"":null===o?c(t,r):Array.isArray(o)?o.reduce(n(t),[]).join("&"):c(t,r)+"="+c(o,r)})).filter((e=>e.length>0)).join("&")},r.parseUrl=(e,r)=>{r=Object.assign({decode:!0},r);const[t,n]=a(e,"#");return Object.assign({url:t.split("?")[0]||"",query:m(p(e),r)},r&&r.parseFragmentIdentifier&&n?{fragmentIdentifier:i(n,r)}:{})},r.stringifyUrl=(e,t)=>{t=Object.assign({encode:!0,strict:!0},t);const n=l(e.url).split("?")[0]||"",o=r.extract(e.url),a=r.parse(o,{sort:!1}),s=Object.assign(a,e.query);let i=r.stringify(s,t);i&&(i="?"+i);let u=function(e){let r="";const t=e.indexOf("#");return-1!==t&&(r=e.slice(t)),r}(e.url);return e.fragmentIdentifier&&(u="#"+c(e.fragmentIdentifier,t)),`${n}${i}${u}`}},500:e=>{"use strict";e.exports=(e,r)=>{if("string"!=typeof e||"string"!=typeof r)throw new TypeError("Expected the arguments to be of type `string`");if(""===r)return[e];const t=e.indexOf(r);return-1===t?[e]:[e.slice(0,t),e.slice(t+r.length)]}},610:e=>{"use strict";e.exports=e=>encodeURIComponent(e).replace(/[!'()*]/g,(e=>"%"+e.charCodeAt(0).toString(16).toUpperCase()))}},r={};function t(n){if(r[n])return r[n].exports;var o=r[n]={exports:{}};return e[n](o,o.exports,t),o.exports}(()=>{const e=t(563),r="sqp",n=["utm_source","utm_campaign","utm_medium","utm_term","utm_content"];function o(e){return[r,e].join(".")}function a(r){const t=e.parseUrl(r.href);n.forEach((function(e){const r=window.localStorage.getItem(o(e));r&&(t.query[e]=r)})),r.href=e.stringifyUrl(t)}window.sqp={stickParams:function(){window.sqpConfig=window.sqpConfig||{};const r=e.parse(window.location.search);if(n.forEach((function(e){r[e]&&window.localStorage.setItem(o(e),r[e])})),!window.sqpConfig.conversionDomain)throw new Error("Unable to find conversionDomain in window.sqpConfig. Please double check setup instructions.");(function(e){const r=[],t=document.getElementsByTagName("a");for(let n=0;n<t.length;n++){const o=t[n];-1!==o.href.indexOf(e)&&r.push(o)}return r})(sqpConfig.conversionDomain).forEach(a)}}})()})();