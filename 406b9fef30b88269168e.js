(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{340:function(e,t,n){var r;
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
!function(){"use strict";var n={}.hasOwnProperty;function a(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var o=typeof r;if("string"===o||"number"===o)e.push(r);else if(Array.isArray(r)&&r.length){var i=a.apply(null,r);i&&e.push(i)}else if("object"===o)for(var c in r)n.call(r,c)&&r[c]&&e.push(c)}}return e.join(" ")}e.exports?(a.default=a,e.exports=a):void 0===(r=function(){return a}.apply(t,[]))||(e.exports=r)}()},343:function(e,t){e.exports=function(e){var t,n,r=e[0]/255,a=e[1]/255,o=e[2]/255,i=Math.min(r,a,o),c=Math.max(r,a,o),s=c-i;return c==i?t=0:r==c?t=(a-o)/s:a==c?t=2+(o-r)/s:o==c&&(t=4+(r-a)/s),(t=Math.min(60*t,360))<0&&(t+=360),n=(i+c)/2,[t,100*(c==i?0:n<=.5?s/(c+i):s/(2-c-i)),100*n]}},355:function(e,t){e.exports=function(e){var t,n,r,a,o,i=e[0]/360,c=e[1]/100,s=e[2]/100;if(0==c)return[o=255*s,o,o];t=2*s-(n=s<.5?s*(1+c):s+c-s*c),a=[0,0,0];for(var l=0;l<3;l++)(r=i+1/3*-(l-1))<0&&r++,r>1&&r--,o=6*r<1?t+6*(n-t)*r:2*r<1?n:3*r<2?t+(n-t)*(2/3-r)*6:t,a[l]=255*o;return a}},356:function(e,t,n){"use strict";const r=n(357);e.exports=((e,t={})=>{if("function"!=typeof e)throw new TypeError(`Expected the first argument to be a function, got \`${typeof e}\``);let n,a;const o=function(...r){const o=this,i=t.immediate&&!n;return clearTimeout(n),n=setTimeout(()=>{n=null,t.immediate||(a=e.apply(o,r))},t.wait||0),i&&(a=e.apply(o,r)),a};return r(o,e),o.cancel=(()=>{n&&(clearTimeout(n),n=null)}),o})},357:function(e,t,n){"use strict";const r=(e,t)=>{for(const n of Reflect.ownKeys(t))Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n));return e};e.exports=r,e.exports.default=r},358:function(e,t){e.exports=function(e){var t,n,r=e[0],a=e[1]/100,o=e[2]/100;return t=a*o,[r,100*(t=(t/=(n=(2-a)*o)<=1?n:2-n)||0),100*(n/=2)]}},359:function(e,t,n){var r=n(360);"string"==typeof r&&(r=[[e.i,r,""]]);var a={hmr:!0,transform:void 0,insertInto:void 0};n(138)(r,a);r.locals&&(e.exports=r.locals)},360:function(e,t,n){(t=e.exports=n(137)(!1)).push([e.i,'.👯🏼🤽‍♀️{transform:translateY(-50%);width:90vw;height:90vw;padding:0;margin:0;-webkit-user-select:none;user-select:none}.👯🏼🤽‍♀️,.🚵🏿🏄🏽{position:absolute;top:50%}.🚵🏿🏄🏽{left:50%;transform:translate(-50%,-50%);width:100%;height:100%;box-shadow:inset var(--background) 0 0 .75rem 0;border-radius:50%;transition:all .25s ease}.🙋🏽‍♂️👩 .🚵🏿🏄🏽{width:77%;height:77%}.🍦🤹‍♂️ .🚵🏿🏄🏽{opacity:0}.💁🏾💇🏻‍♀️{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:75%;height:75%;background:var(--background);border-radius:50%;box-shadow:var(--background) 0 0 1.5rem 0}.🙋🏽‍♂️👩 .💁🏾💇🏻‍♀️{box-shadow:var(--background) 0 0 0 0}.🇹🇩👮🏾{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:45%;height:45%;border-radius:50%;transition:width .25s ease,height .25s ease;background:var(--colour)}.🙋🏽‍♂️👩 .🇹🇩👮🏾{width:40%;height:40%;transition:width .25s ease,height .25s ease}.🍦🤹‍♂️ .🇹🇩👮🏾{opacity:0}.👶🏾🌽{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:43%;height:43%;background:var(--background);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:7rem;font-weight:100;color:#1e1f21;transition:all .3s cubic-bezier(.335,.88,.45,.94)}.👶🏾🌽:active{color:#26262c}.🍦🤹‍♂️ .👶🏾🌽{width:55%;height:55%;color:#636369;background:#1e1f21}.🙋🏽‍♂️👩.🍦🤹‍♂️ .👶🏾🌽{color:#1e1f21;background:var(--background)}.🍦🤹‍♂️ .👶🏾🌽:active{color:#fff}.👲🏿🇬🇧{position:absolute;transform:translate(-50%,50%) rotate(var(--angle));transform-origin:center;border-radius:8px;display:flex;justify-content:center;align-items:center;width:2%;height:6%;min-width:16px;min-height:16px;background:var(--background);cursor:pointer;box-shadow:0 0 .5rem 0 rgba(0,0,0,.5);transition:height .2s cubic-bezier(.335,.88,.45,.94)}.👶🏻🏃🏾 .👲🏿🇬🇧,.👲🏿🇬🇧:active{height:10%}.🙋🏽‍♂️👩 .👲🏿🇬🇧{height:0;width:0;opacity:0;transition:height .25s ease,left 0s ease .25s,bottom 0s ease .25s,opacity 0s ease .25s}.🍦🤹‍♂️ .👲🏿🇬🇧{opacity:0}.👲🏿🇬🇧:after{content:"";display:block;height:75%;width:2px;background:var(--handle-colour);border-radius:2px;transition:width .25s cubic-bezier(.335,.88,.45,.94),height .25s cubic-bezier(.335,.88,.45,.94)}.👶🏻🏃🏾 .👲🏿🇬🇧:after{width:4px;height:85%}.🙋🏽‍♂️👩 .👲🏿🇬🇧:after,.💁🏽‍♂️🚴🏾 .👲🏿🇬🇧:after{opacity:0}',""]),t.locals={container:"👯🏼🤽‍♀️",outerCircle:"🚵🏿🏄🏽",disabled:"🙋🏽‍♂️👩",interactionDisabled:"🍦🤹‍♂️",innerMaskingCircle:"💁🏾💇🏻‍♀️",innerIndicatorCircle:"🇹🇩👮🏾",indicatorMaskingCircle:"👶🏾🌽",handle:"👲🏿🇬🇧",active:"👶🏻🏃🏾",disabledInteraction:"💁🏽‍♂️🚴🏾"}},361:function(e,t,n){var r=n(362);"string"==typeof r&&(r=[[e.i,r,""]]);var a={hmr:!0,transform:void 0,insertInto:void 0};n(138)(r,a);r.locals&&(e.exports=r.locals)},362:function(e,t,n){(t=e.exports=n(137)(!1)).push([e.i,'.🕵🏼‍♂️🙆{position:relative;border-radius:50%;background:currentColor;width:20%;height:20%}.🇲🇪🙅🏻‍♀️{position:absolute;width:90%;height:10%;top:50%;transform:translateX(-95%) translateY(-50%) rotate(calc(45deg*var(--n)));transform-origin:150% 50%}.🇲🇪🙅🏻‍♀️:after{display:block;content:"";height:100%;background:currentColor;border-radius:20px;transition:all .3s cubic-bezier(0,1.04,.82,1.08);width:var(--width);margin-left:var(--margin)}.🇲🇪🙅🏻‍♀️:first-child{--n:0}.🇲🇪🙅🏻‍♀️:nth-child(2){--n:1}.🇲🇪🙅🏻‍♀️:nth-child(3){--n:2}.🇲🇪🙅🏻‍♀️:nth-child(4){--n:3}.🇲🇪🙅🏻‍♀️:nth-child(5){--n:4}.🇲🇪🙅🏻‍♀️:nth-child(6){--n:5}.🇲🇪🙅🏻‍♀️:nth-child(7){--n:6}.🇲🇪🙅🏻‍♀️:nth-child(8){--n:7}',""]),t.locals={centre:"🕵🏼‍♂️🙆",ray:"🇲🇪🙅🏻‍♀️"}},363:function(e,t,n){var r=n(364);"string"==typeof r&&(r=[[e.i,r,""]]);var a={hmr:!0,transform:void 0,insertInto:void 0};n(138)(r,a);r.locals&&(e.exports=r.locals)},364:function(e,t,n){(t=e.exports=n(137)(!1)).push([e.i,'.🔣🕕{--width:50vw;--left:50vw;--optionHeight:7rem;position:absolute;top:5rem;left:calc(var(--left) - var(--width)/2);color:#fff;font-size:2.5rem;text-align:center;height:var(--optionHeight);z-index:1}.🖖🏽🇱🇦{background:#fff;width:50vw;border-radius:10px;position:relative;z-index:0;top:1rem;padding:0;height:0;transition:all .15s ease}.🖖🏽🇱🇦:before{--size:4vw;content:"";display:block;position:absolute;background:#fff;width:0;height:0;top:0;left:calc(var(--width)/2);transform:rotate(45deg);border-radius:.25rem;z-index:-1;transition:all .125s ease}.🖖🏽🇱🇦.🐹💦{height:var(--open-height)}.🖖🏽🇱🇦.🐹💦:before{top:calc(-0.4*var(--size));height:var(--size);width:var(--size);left:calc(var(--width)/2 - 2vw)}.🤦🏿‍♀️🤷🏾‍♀️{color:#848484;height:0;margin:0;display:flex;align-items:center;justify-content:center;opacity:0;overflow:hidden;transition:opacity .15s ease 0s,height 0s ease .25s}.🐹💦 .🤦🏿‍♀️🤷🏾‍♀️{opacity:1;transition-delay:var(--delay);height:var(--optionHeight)}.📗👨‍👩‍👦{height:calc(var(--optionHeight)/1.5);fill:#505050;transition:all .15s ease}.📗👨‍👩‍👦:active{fill:#666}.📗👨‍👩‍👦.🐹💦{fill:#fff}',""]),t.locals={modePicker:"🔣🕕",modeDropdown:"🖖🏽🇱🇦",open:"🐹💦",modeOption:"🤦🏿‍♀️🤷🏾‍♀️",icon:"📗👨‍👩‍👦"}},365:function(e,t,n){var r=n(366);"string"==typeof r&&(r=[[e.i,r,""]]);var a={hmr:!0,transform:void 0,insertInto:void 0};n(138)(r,a);r.locals&&(e.exports=r.locals)},366:function(e,t,n){(t=e.exports=n(137)(!1)).push([e.i,'.💁🏻🇺🇳{display:flex;--height:11.25vw;width:90vw;height:var(--height);-webkit-user-select:none;user-select:none;box-shadow:0 0 .5rem 0 rgba(0,0,0,.05);border-radius:1.25rem;align-items:center;transition:all .3s cubic-bezier(.335,.88,.45,.94),opacity .2s cubic-bezier(.335,.88,.45,.94)}.💁🏻🇺🇳.🤽🏼💁🏻‍♂️{width:0}.🏄🏻‍♂️🐡{opacity:.5}.👨🏼🔞{border-radius:8px;display:flex;justify-content:center;align-items:center;width:1.75%;height:50%;min-width:16px;min-height:16px;background:var(--background);cursor:pointer;box-shadow:0 0 .5rem 0 rgba(0,0,0,.04);transition:height .2s cubic-bezier(.335,.88,.45,.94);position:relative;transform:translateX(-50%)}.🈶👨🏿‍🔬 .👨🏼🔞,.👨🏼🔞:active{height:70%}.🏄🏻‍♂️🐡 .👨🏼🔞{height:0;width:0;transition:height .2s cubic-bezier(.335,.88,.45,.94),left .2s cubic-bezier(.335,.88,.45,.94)}.🤽🏼💁🏻‍♂️ .👨🏼🔞{opacity:0}.👨🏼🔞:after{content:"";display:block;height:75%;width:2px;background:var(--handle-colour);border-radius:2px;transition:width .25s cubic-bezier(.335,.88,.45,.94),height .25s cubic-bezier(.335,.88,.45,.94)}.🈶👨🏿‍🔬 .👨🏼🔞:after{width:4px;height:85%}.🏄🏻‍♂️🐡 .👨🏼🔞:after{opacity:0}',""]),t.locals={container:"💁🏻🇺🇳",interactionDisabled:"🤽🏼💁🏻‍♂️",disabled:"🏄🏻‍♂️🐡",handle:"👨🏼🔞",active:"🈶👨🏿‍🔬"}},367:function(e,t){e.exports=function(e){var t=e[0]/60,n=e[1]/100,r=e[2]/100,a=Math.floor(t)%6,o=t-Math.floor(t),i=255*r*(1-n),c=255*r*(1-n*o),s=255*r*(1-n*(1-o));switch(r*=255,a){case 0:return[r,s,i];case 1:return[c,r,i];case 2:return[i,r,s];case 3:return[i,c,r];case 4:return[s,i,r];case 5:return[r,i,c]}}},368:function(e,t){e.exports=function(e){var t,n,r=e[0],a=e[1],o=e[2],i=Math.min(r,a,o),c=Math.max(r,a,o),s=c-i;return n=0==c?0:s/c*1e3/10,c==i?t=0:r==c?t=(a-o)/s:a==c?t=2+(o-r)/s:o==c&&(t=4+(r-a)/s),(t=Math.min(60*t,360))<0&&(t+=360),[t,n,c/255*1e3/10]}},369:function(e,t,n){var r=n(370);"string"==typeof r&&(r=[[e.i,r,""]]);var a={hmr:!0,transform:void 0,insertInto:void 0};n(138)(r,a);r.locals&&(e.exports=r.locals)},370:function(e,t,n){(t=e.exports=n(137)(!1)).push([e.i,".👩🏾‍🌾🤴{width:100%;height:100%;display:flex;justify-content:flex-end;align-items:center;flex-direction:column;padding-bottom:5rem}.🙈🔗>:first-child{border-bottom-left-radius:0;border-bottom-right-radius:0}.🙈🔗>:last-child{border-top-left-radius:0;border-top-right-radius:0}.🙈🔗>:not(:first-child):not(:last-child){border-radius:0}.🙈🔗>:nth-child(2n - 1){border-bottom:8px solid var(--background)}",""]),t.locals={screen:"👩🏾‍🌾🤴",sliderGroup:"🙈🔗"}},398:function(e,t,n){"use strict";n.r(t);var r=n(1),a=n.n(r),o=n(52),i=(n(343),n(355),n(356));const c=n.n(i)()((e,t)=>{e({type:"LIGHT_STATE",payload:t}),c.cancel()},{wait:40,leading:!0});var s=c,l=n(340),u=n.n(l),d=n(358),h=n.n(d),f=({hue:e,saturation:t,value:n})=>{const[r,a,o]=h()([e/255*360,t/255*100,n/255*100]);return"hsl(".concat(r,"deg, ").concat(a,"%, ").concat(o,"%)")},b=e=>()=>{e.current.addEventListener("touchmove",e=>e.preventDefault(),{passive:!1})};const g=e=>{if(e.copy)return e.copy;const t=e.cloneNode();return t.style.transition="none",t.style.visibility="hidden",e.parentNode.appendChild(t),e.copy=t,t};var p=({outerCircleRef:e,innerCircleRef:t})=>{const n=g(e.current),r=g(t.current),{width:a,height:o,x:i,y:c}=n.getBoundingClientRect(),{width:s,height:l}=r.getBoundingClientRect(),[u,d]=[i+a/2,c+o/2],[h,f]=[a/2,s/2];return{centerX:u,centerY:d,outerRadius:h,midlineRadius:f+(h-f)/2}},m=n(359),v=({colour:e,disabledInteraction:t,enabled:n,onChange:o,config:{backgroundCSS:i,colourToAngle:c,angleToColour:s},children:l})=>{const d=Object(r.useRef)(),h=Object(r.useRef)(),g=Object(r.useRef)(),v=Object(r.useRef)(),[y,w]=Object(r.useState)(e),[E,C]=Object(r.useState)(n),[x,O]=Object(r.useState)({}),[j,R]=Object(r.useState)(!1),[k,I]=Object(r.useState)(!1),[M,z]=Object(r.useState)({left:null,bottom:null});Object(r.useEffect)((({setRealEvent:e,setLocalColour:t,colour:n,setEnabled:r,enabledProp:a,active:o,eventInfo:i,setEventInfo:c})=>()=>{o||(e(!1),c({angle:null,side:i.side}),t(n),r(a))})({setRealEvent:R,setLocalColour:w,colour:e,setEnabled:C,enabledProp:n,active:k,eventInfo:x,setEventInfo:O}),[e,n,k]),Object(r.useEffect)((({realEvent:e,onChange:t,localColour:n,enabled:r})=>()=>{e&&t&&t({colour:n,enabled:r})})({realEvent:j,onChange:o,localColour:y,enabled:E}),[y,E]),Object(r.useEffect)((({outerCircleRef:e,innerCircleRef:t,localColour:n,colourToAngle:r,setHandlePosition:a,eventInfo:o})=>()=>{const{outerRadius:i,midlineRadius:c}=p({outerCircleRef:e,innerCircleRef:t}),s=r?r(n,o):0,l=s*Math.PI/180;a({left:i+c*Math.sin(l),bottom:i+c*Math.cos(l),"--angle":"".concat(s,"deg")})})({outerCircleRef:h,innerCircleRef:g,localColour:y,colourToAngle:c,setHandlePosition:z,eventInfo:x}),[y]),Object(r.useEffect)(b(d),[]);const N=(({outerCircleRef:e,innerCircleRef:t,handleRef:n,localColour:r,setLocalColour:a,angleToColour:o,setRealEvent:i,touchOn:c,enabled:s,setEventInfo:l,disabledInteraction:u})=>d=>{if(u||!s||d.target!==e.current&&d.target!==n.current)return;c();const{centerX:h,centerY:f,outerRadius:b,midlineRadius:g}=p({outerCircleRef:e,innerCircleRef:t}),{clientX:m,clientY:v}=d.touches[0],[y,w]=[m-h,v-f],E=(360+(Math.atan2(w,y)+.5*Math.PI)/Math.PI*180)%360;i(!0),l({angle:E,side:m>h?1:2}),a({...r,...o(E)})})({outerCircleRef:h,innerCircleRef:g,handleRef:v,localColour:y,setLocalColour:w,angleToColour:s,setRealEvent:R,touchOn:()=>t?null:I(!0),enabled:E,setEventInfo:O,disabledInteraction:t});return a.a.createElement(a.a.Fragment,null,a.a.createElement("section",{ref:d,className:u()(m.container,{[m.active]:k,[m.disabled]:!E,[m.interactionDisabled]:t}),onTouchStart:N,onTouchMove:N,onTouchEnd:()=>t?null:I(!1),style:{"--colour":f(y),"--handle-colour":f({...y,saturation:255,value:255})}},a.a.createElement("section",{ref:h,className:m.outerCircle,style:{background:i}}),a.a.createElement("section",{ref:v,className:m.handle,style:M}),a.a.createElement("section",{ref:g,className:m.innerMaskingCircle}),a.a.createElement("section",{className:m.innerIndicatorCircle}),a.a.createElement("section",{className:m.indicatorMaskingCircle,onTouchEnd:e=>{R(!0),C(!E)}},l)))},y=n(361),w=({colour:{value:e}})=>{const[t,n]=[10.5,46],r=n-t,[o,i]=[61.6,25],c=(1-e/255)*(o-i)+i,s={"--width":"".concat(e/255*r+t,"%"),"--margin":"".concat(c,"%")};return a.a.createElement("section",{className:y.centre,style:s},a.a.createElement("section",{className:y.ray}),a.a.createElement("section",{className:y.ray}),a.a.createElement("section",{className:y.ray}),a.a.createElement("section",{className:y.ray}),a.a.createElement("section",{className:y.ray}),a.a.createElement("section",{className:y.ray}),a.a.createElement("section",{className:y.ray}),a.a.createElement("section",{className:y.ray}))},E=n(363),C=({mode:e,onChange:t,modes:n})=>{const[o,i]=Object(r.useState)(!1),c=Object(r.useRef)();Object(r.useEffect)(()=>{const e=e=>!c.current.contains(e.target)&&i(!1);return o&&document.body.addEventListener("touchstart",e),()=>!o&&document.body.removeEventListener("touchstart",e)},[o]);const s=Object.keys(n).filter(t=>t!==e),l=e=>()=>{i(!1),t({mode:e})},d=n[e].Icon;return a.a.createElement("section",{ref:c,className:E.modePicker},a.a.createElement(a.a.Fragment,null,a.a.createElement("span",{onTouchEnd:()=>i(!o)},a.a.createElement(d,{className:u()(E.icon,{[E.open]:o})})),a.a.createElement("section",{className:u()(E.modeDropdown,{[E.open]:o}),style:{"--open-height":"calc(var(--optionHeight) * ".concat(s.length,")")}},s.map((e,t)=>{const r=n[e].Icon;return a.a.createElement("p",{key:e,className:E.modeOption,style:{"--delay":"".concat(.05+.025*(t+1),"s")},onTouchEnd:l(e)},a.a.createElement(a.a.Fragment,null,a.a.createElement(r,{className:E.icon})))}))))};var x=n(365),O=({colour:e,disabledInteraction:t,enabled:n=!1,onChange:o,setBeingTouched:i,property:c,style:s})=>{const l=Object(r.useRef)(),d=Object(r.useRef)(),[h,g]=Object(r.useState)(e.value/255),[p,m]=Object(r.useState)(!1),[v,y]=Object(r.useState)(!1),[w,E]=Object(r.useState)({left:null});Object(r.useEffect)((({setRealEvent:e,setValue:t,colour:n,active:r,property:a})=>()=>{r||(e(!1),t(n[a]/255))})({setRealEvent:m,setValue:g,colour:e,active:v,property:c}),[e,v]),Object(r.useEffect)((({realEvent:e,onChange:t,value:n,property:r})=>()=>{e&&t&&t({colour:{[r]:255*n}})})({realEvent:p,onChange:o,value:h,property:c}),[h]),Object(r.useEffect)((({value:e,setHandlePosition:t})=>()=>{t({left:"".concat(2.625+94.75*e,"%")})})({containerRef:l,value:h,setHandlePosition:E}),[h,n]),Object(r.useEffect)(b(l),[]);const C=(({containerRef:e,handleRef:t,setValue:n,setRealEvent:r,touchOn:a,enabled:o,disabledInteraction:i})=>o=>{if(i||o.target!==e.current&&o.target!==t.current)return;a();const{width:c,x:s}=(({containerRef:e})=>e.current.getBoundingClientRect())({containerRef:e}),{clientX:l}=o.touches[0];r(!0),n(Math.max(0,Math.min((l-s)/c,1)))})({containerRef:l,handleRef:d,setValue:g,setRealEvent:m,touchOn:()=>t?null:y(!0),disabledInteraction:t});return a.a.createElement("section",{ref:l,style:{...s,"--colour":f({...e,[c]:255}),"--handle-colour":f(e)},className:u()(x.container,{[x.active]:v,[x.disabled]:!n,[x.interactionDisabled]:t}),onTouchStart:C,onTouchMove:C,onTouchEnd:()=>t?null:y(!1)},a.a.createElement("section",{ref:d,className:x.handle,style:w}))},j=e=>{if(6500===e)return[255,255,255];const t=e/100;if(e<6500){const n=t-2,r=t-10;return[255,-155.25485562709179-.44596950469579133*n+104.49216199393888*Math.log(n),e>2e3?.8274096064007395*r-254.76935184120902+115.67994401066147*Math.log(r):0]}const n=t-55,r=t-50;return[351.97690566805693+.114206453784165*n-40.25366309332127*Math.log(n),325.4494125711974+.07943456536662342*r-28.0852963507957*Math.log(r),255]},R=n(367),k=n.n(R),I=n(368),M=n.n(I);function z(){return(z=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function N(){return(N=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function T(){return(T=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var S={breathe:{showControls:!1,show:0,Icon:e=>a.a.createElement("svg",z({},e,{viewBox:"0 0 512 512"}),a.a.createElement("path",{d:"M256 228.719c-22.879 0-41.597 18.529-41.597 41.18 0 22.652 18.718 41.182 41.597 41.182 22.878 0 41.597-18.529 41.597-41.182 0-22.651-18.719-41.18-41.597-41.18zm124.8 41.179c0-67.946-56.163-123.539-124.8-123.539s-124.8 55.593-124.8 123.539c0 45.303 24.961 85.447 62.396 107.072l20.807-36.032c-24.972-14.417-41.604-40.153-41.604-71.04 0-45.295 37.433-82.358 83.201-82.358 45.771 0 83.201 37.063 83.201 82.358 0 30.887-16.633 56.623-41.604 71.04l20.807 36.032c37.433-21.624 62.396-61.769 62.396-107.072zM256 64C141.597 64 48 156.654 48 269.898 48 346.085 89.592 411.968 152 448l20.799-36.032c-49.919-28.824-83.207-81.324-83.207-142.069 0-90.593 74.891-164.718 166.408-164.718 91.517 0 166.406 74.125 166.406 164.718 0 60.745-33.284 114.271-83.205 142.069L360 448c62.406-36.032 104-101.915 104-178.102C464 156.654 370.403 64 256 64z"}))},colour:{showControls:!0,show:2,backgroundCSS:"conic-gradient(#f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)",colourToAngle:({hue:e},{angle:t})=>t||0===t?t:e/255*360,angleToColour:e=>({hue:e/360*255}),Icon:e=>a.a.createElement("svg",N({},e,{viewBox:"0 0 512 512"}),a.a.createElement("path",{d:"M430.1 347.9c-6.6-6.1-16.3-7.6-24.6-9-11.5-1.9-15.9-4-22.6-10-14.3-12.7-14.3-31.1 0-43.8l30.3-26.9c46.4-41 46.4-108.2 0-149.2-34.2-30.1-80.1-45-127.8-45-55.7 0-113.9 20.3-158.8 60.1-83.5 73.8-83.5 194.7 0 268.5 41.5 36.7 97.5 55 152.9 55.4h1.7c55.4 0 110-17.9 148.8-52.4 14.4-12.7 12-36.6.1-47.7zM120 216c0-17.7 14.3-32 32-32s32 14.3 32 32-14.3 32-32 32-32-14.3-32-32zm40 126c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm64-161c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm72 219c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm24-208c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"}))},white:{showControls:!0,show:2,backgroundCSS:"linear-gradient(to bottom, rgb(255, 111, 0), rgb(255, 154, 60), rgb(255, 184, 125), rgb(255, 207, 169), rgb(255, 226, 203), rgb(255, 242, 230), rgb(255, 251, 255), rgb(230, 235, 255), rgb(217, 227, 255), rgb(208, 222, 255))",colourToAngle:({hue:e,saturation:t},{angle:n,side:r})=>{if(n||0===n)return n;const[a,o,i]=k()([e,t/255*100,100]),c=(Math.abs((([e,t,n])=>{let r=0,a=1e3,o=4e4;for(;o-a>.4;){r=.5*(o+a);const[t,,i]=j(r);i/t>=n/e?o=r:a=r}return Math.round(r)})([a,o,i]))-1550)/8450;return 2===r?360-180*c:180*c},angleToColour:e=>{const t=8450*((e>=180?360-e:e)/180)+1550,[n,r,a]=j(t),[o,i]=M()([n,r,a]);return{hue:o/360*255,saturation:i/100*255}},Icon:e=>a.a.createElement("svg",T({},e,{viewBox:"0 0 512 512"}),a.a.createElement("path",{d:"M309.8 304.6c-4.3-3-6.9-7.9-6.9-13.1v-213c0-25.7-21-46.5-47-46.5s-47 20.8-47 46.5v213c0 5.2-2.6 10.2-6.9 13.1-25.2 17.3-42 46.4-42 79.3 0 53 43 96 96 96s96-43 96-96c0-32.9-17-62.1-42.2-79.3zM256.1 445c-32 0-58.1-26.3-58.1-58.8 0-25.4 15.4-47.1 37.9-55.3 3.2-1.2 5.4-4.1 5.4-7.5V180.2c0-8 6.5-14.5 14.5-14.5s14.5 6.5 14.5 14.5v143.2c0 3.4 2.1 6.3 5.3 7.5 21.9 8.2 38.4 29.9 38.4 55.2 0 32.5-25.8 58.9-57.9 58.9z"}))}},P=n(369);t.default=(()=>{const e=Object(o.b)(),t=Object(r.useCallback)(e=>({state:e.light.state})),{state:n}=Object(o.c)(t),[i,c]=Object(r.useState)(n),[l,u]=Object(r.useState)(255),[d,h]=Object(r.useState)("colour"),[f,b]=Object(r.useState)(!0);Object(r.useEffect)(()=>{n.value&&u(n.value),n.show!==S[d].show&&h(Object.entries(S).find(([e,{show:t}])=>n.show===t)[0]),c(n),b(!0)},[n]),Object(r.useEffect)(()=>{f||s(e,i)},[i]),Object(r.useEffect)((e=>()=>{const t=()=>!document.hidden&&e({type:"LIGHT_ONLINE_CHECK"});return document.addEventListener("visibilitychange",t),()=>document.removeEventListener("visibilitychange",t)})(e),[]);const g=({colour:{hue:e=null,saturation:t=null,value:n=null}={},enabled:r=null,mode:a=null})=>{const o={...i};null!==e&&(o.hue=e),null!==t&&(o.saturation=t),null!==a&&S[a]&&(h(a),o.show=S[a].show),null!==n&&(u(n),o.value=n,o.value>0?o.enabled=!0:0===o.value&&(o.enabled=!1)),null!==r&&(o.enabled=r,o.value=r?l:0),c(o),b(!1)},p={hue:i.hue,saturation:i.saturation,value:i.value},m=S[d];return a.a.createElement("section",{className:P.screen},a.a.createElement(C,{mode:d,modes:S,onChange:g}),a.a.createElement(v,{colour:p,enabled:i.enabled,disabledInteraction:!m.showControls,onChange:g,config:m},a.a.createElement(w,{colour:p})),a.a.createElement("span",{className:P.sliderGroup},a.a.createElement(O,{property:"value",colour:p,enabled:i.enabled,disabledInteraction:!m.showControls,onChange:g,style:{background:"linear-gradient(to right, black, var(--colour))"}}),a.a.createElement(O,{property:"saturation",colour:p,enabled:i.enabled,disabledInteraction:!m.showControls,onChange:g,style:{background:"linear-gradient(to right, white, var(--colour))"}})))})}}]);