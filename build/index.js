(window.webpackJsonp_block=window.webpackJsonp_block||[]).push([[1],{6:function(e,t,r){}}]),function(e){function t(t){for(var n,o,c=t[0],i=t[1],s=t[2],u=0,m=[];u<c.length;u++)o=c[u],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&m.push(a[o][0]),a[o]=0;for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n]);for(p&&p(t);m.length;)m.shift()();return l.push.apply(l,s||[]),r()}function r(){for(var e,t=0;t<l.length;t++){for(var r=l[t],n=!0,c=1;c<r.length;c++){var i=r[c];0!==a[i]&&(n=!1)}n&&(l.splice(t--,1),e=o(o.s=r[0]))}return e}var n={},a={0:0},l=[];function o(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=e,o.c=n,o.d=function(e,t,r){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)o.d(r,n,function(t){return e[t]}.bind(null,n));return r},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="";var c=window.webpackJsonp_block=window.webpackJsonp_block||[],i=c.push.bind(c);c.push=t,c=c.slice();for(var s=0;s<c.length;s++)t(c[s]);var p=i;l.push([7,1]),r()}([function(e,t){e.exports=window.wp.element},function(e,t){e.exports=window.wp.components},function(e,t){e.exports=window.wp.blockEditor},function(e,t){e.exports=window.jQuery},function(e,t){e.exports=window.wp.i18n},function(e,t){e.exports=window.wp.blocks},,function(e,t,r){"use strict";r.r(t);var n=r(5),a=(r(6),r(0)),l=(r(4),r(2)),o=r(1),c=r(3),i=r.n(c);Object(n.registerBlockType)("create-block/block",{edit:function({attributes:e,setAttributes:t}){const r=Object(l.useBlockProps)(),{apiKey:n,apiStatus:c,placeId:s,locationData:p,selectPlaceName:u,res:m}=e,[b,d]=Object(a.useState)(!1),[v,g]=Object(a.useState)(),[f,w]=Object(a.useState)();console.log(n,m,c,s);const O=document.getElementById("admin-js").getAttribute("src").split("/"),j=O.slice(0,O.length-1).join("/");return Object(a.createElement)(a.Fragment,null,Object(a.createElement)(l.InspectorControls,null,Object(a.createElement)(o.PanelBody,{title:"API情報入力",initialOpen:!1},Object(a.createElement)("a",{href:j+"/setting_api.pdf",target:"_blank",className:"setting-link"},"APIキーの取得方法"),Object(a.createElement)(o.TextControl,{label:"APIキー",value:e.apiKey,onChange:e=>t({apiKey:e})})),Object(a.createElement)(o.PanelBody,{title:"GoogleMapの位置情報の入力",initialOpen:!1},Object(a.createElement)(o.TextControl,{label:"位置情報（緯度・経度）の入力",value:e.locationData,onChange:e=>t({locationData:e}),className:"u-mb10"}),Object(a.createElement)(o.Button,{variant:"primary",className:"is-primary u-mb24",onClick:()=>{i.a.getScript("https://maps.google.com/maps/api/js?key="+n+"&libraries=places").done((function(){const t=p.split(","),r=new google.maps.LatLng(Number(t[0]),Number(t[1]));new google.maps.places.PlacesService(document.createElement("div")).nearbySearch({location:r,radius:"3"},(function(t,r){if(r==google.maps.places.PlacesServiceStatus.OK){console.log(t);const r=[{value:null,label:"Select an Option",disabled:!0}];for(let e=0;e<t.length;e++){const n={value:t[e].place_id,label:t[e].name};r.push(n)}e.selectPlaceName=r,console.log(r),w(r)}}))}))}},"位置情報を設定する"),Object(a.createElement)(o.SelectControl,{label:"箇所を選択する",value:e.placeId,options:e.selectPlaceName,onChange:e=>t({placeId:e})}),Object(a.createElement)(o.TextControl,{label:"ロケーションID（直接指定も可能です）",value:e.placeId,onChange:e=>t({placeId:e}),className:"u-mb10"}),Object(a.createElement)("p",null,"直接指定する場合の検索は",Object(a.createElement)("a",{href:"https://developers.google.com/maps/documentation/places/web-service/place-id"},"こちら")),Object(a.createElement)(o.Button,{variant:"primary",className:"is-primary",onClick:()=>{i.a.getScript("https://maps.google.com/maps/api/js?key="+n+"&libraries=places",(function(){new google.maps.places.PlacesService(document.createElement("div")).getDetails({placeId:s,fields:["review"]},(function(t,r){if(console.log(r),"INVALID_REQUEST"===r&&(e.apiStatus="false",e.res="",d(!1),console.log("error")),r==google.maps.places.PlacesServiceStatus.OK){if(console.log("reviews"in t),!("reviews"in t))return void alert("口コミ情報が登録されていません");if(0===t.reviews.length)return void alert("口コミ情報が登録されていません");for(let e=0;e<t.reviews.length;e++){const r=t.reviews[e].author_url.split("/");r.pop(),r.push("place"),r.push(s);const n=r.join("/");t.reviews[e].reviewUrl=n}console.log(t.reviews),e.res=t.reviews,e.apiStatus="true",d(!0),g(t.reviews)}}))}))}},"口コミ情報を表示する"))),Object(a.createElement)("div",r,Object(a.createElement)("div",{className:"review"},"true"===c&&""!==m&&m.map((e,t)=>Object(a.createElement)("div",{className:"review__item",key:"review-"+t},Object(a.createElement)("div",{className:"review__user"},Object(a.createElement)("img",{src:e.profile_photo_url}),Object(a.createElement)("p",null,e.author_name)),Object(a.createElement)("p",{className:"review_rating","data-rating":e.rating},"星の数：",e.rating),Object(a.createElement)("a",{href:e.reviewUrl,target:"_blank",rel:"noreferrer noopener",className:"review__text"},e.text))))))},save:function({attributes:e}){const{placeId:t,res:r}=e;return Object(a.createElement)("div",{className:"review"},void 0!==r&&r.map((e,t)=>Object(a.createElement)(a.Fragment,null,Object(a.createElement)("div",{className:"review__item"},Object(a.createElement)("div",{className:"review__user"},Object(a.createElement)("img",{src:e.profile_photo_url}),Object(a.createElement)("p",null,e.author_name)),Object(a.createElement)("p",{className:"review__rating","data-rating":e.rating}),Object(a.createElement)("a",{href:e.reviewUrl,target:"_blank",rel:"noreferrer noopener",className:"review__text",key:t},e.text)))))}})}]);