(window.webpackJsonp=window.webpackJsonp||[]).push([[180],{3088:function(e,t,n){},3089:function(e,t,n){},4643:function(e,t,n){"use strict";n(3088)},4644:function(e,t,n){"use strict";n(3089)},4843:function(e,t,n){"use strict";n.r(t);n(11),n(63),n(19);var o=n(5),r=n(3),c=n(95),l=n(47),d=n.n(l),v=n(4642),f=n.n(v),y=n(178),m=n(4),h=n(65),j=n(57),x=n(39),_=n(245),w=Object(r.b)({components:{Lazy:y.a,Icon:c.Icon},setup:function(){var e,t=Object(r.c)(),n=Object(r.n)(!1),c=Object(r.n)(""),l=Object(r.n)({w:0,h:0}),v=Object(r.x)(),y=Object(r.n)(),h=Object(r.n)({}),w=Object(r.n)({}),k=Object(r.a)((function(){return null==t?void 0:t.proxy.$device.isMobile}));function T(){return(T=Object(o.a)(regeneratorRuntime.mark((function t(){var o,r,f,j,x,_;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,v.dispatch(m.TCC_CONFIG,"juejin_float_banner");case 2:if(y.value=t.sent,null===(o=y.value)||void 0===o?void 0:o.id){t.next=5;break}return t.abrupt("return");case 5:if(f=Date.now(),!(y.value.startTime&&f<y.value.startTime)){t.next=8;break}return t.abrupt("return");case 8:if(!(y.value.endTime&&f>y.value.endTime)){t.next=10;break}return t.abrupt("return");case 10:if(j=k.value?y.value.bannerH5:y.value.bannerWeb,c.value=j.iconUrl,l.value={w:j.width,h:j.height},x={width:"".concat(j.width,"px"),height:"".concat(j.height,"px"),right:"".concat(j.initPos.right,"px"),bottom:"".concat(j.initPos.bottom,"px")},h.value=x,w.value={right:"".concat(j.closePos.right,"px"),top:"".concat(j.closePos.top,"px")},e=C(),_=d()(new Date(f)).format("YYYY-MM-DD"),e&&e.id===y.value.id){t.next=23;break}return n.value=!0,O({id:y.value.id,pos:{dx:0,dy:0},frequency:{todayClose:{date:_,closeTime:0},nextDisplayTime:0}}),t.abrupt("return");case 23:if(!(f<e.frequency.nextDisplayTime)){t.next=25;break}return t.abrupt("return");case 25:if(e.frequency.todayClose&&_===e.frequency.todayClose.date||(e.frequency.todayClose={date:_,closeTime:0},O(e)),!((null===(r=y.value.frequencyControl)||void 0===r?void 0:r.dailyLimit)&&e.frequency.todayClose.closeTime>=y.value.frequencyControl.dailyLimit)){t.next=28;break}return t.abrupt("return");case 28:n.value=!0;case 29:case"end":return t.stop()}}),t)})))).apply(this,arguments)}return function(){T.apply(this,arguments)}(),Object(r.y)(n,(function(){n.value&&Object(r.g)((function(){(null==t?void 0:t.proxy.$el)&&(document.body.appendChild(t.proxy.$el),function(t){var n={x:(null==e?void 0:e.pos.dx)||0,y:(null==e?void 0:e.pos.dy)||0};t.style.transform="translate(".concat(n.x,"px, ").concat(n.y,"px)");var o=f()(t);o.draggable({listeners:{move:function(e){n.x+=e.dx,n.y+=e.dy,e.target.style.transform="translate(".concat(n.x,"px, ").concat(n.y,"px)")},end:function(){var e=C();e&&(e.pos.dx=n.x,e.pos.dy=n.y,O(e))}}}),o.on("tap",(function(e){var t;e.originalEvent.srcElement.classList.contains("no-interact")||(Object(x.h)("pendant_click",{current_page:Object(_.h)(window.location.href),from_seo:Object(j.d)()===j.a.seo?"1":"0",click_method:"activity_btn",ad_url:(null===(t=y.value)||void 0===t?void 0:t.action.value)||""}),y.value&&"url"===y.value.action.type&&window.open(y.value.action.value,"_blank"))}))}(t.proxy.$el),setTimeout((function(){var e=t.proxy.$el.querySelector(".jj_animate_bounceIn");e&&(e.classList.remove("jj_animate_bounceIn"),e.classList.add("jj_animate_pulse"))}),2e3))}))})),{isMobile:k,imgResize:l,containerStyle:h,iconUrl:c,visible:n,closeStyle:w,onVisibleChange:function(e){var t;e&&Object(x.h)("pendant_show",{current_page:Object(_.h)(window.location.href),from_seo:Object(j.d)()===j.a.seo?"1":"0",ad_url:(null===(t=y.value)||void 0===t?void 0:t.action.value)||"",type:"float_banner"})},onClose:function(){var t;if(Object(x.h)("pendant_click",{current_page:Object(_.h)(window.location.href),from_seo:Object(j.d)()===j.a.seo?"1":"0",click_method:"cross_off"}),n.value=!1,e){e.frequency.todayClose.closeTime+=1;var o=(null===(t=y.value)||void 0===t?void 0:t.frequencyControl.minimumInterval)||{},r=o.unit,c=o.value;r&&c&&(e.frequency.nextDisplayTime=Date.now()+{hour:36e5,minute:6e4,day:864e5}[r]*c),O(e)}}}}});function O(data){try{window.localStorage.setItem("jj_float_banner",JSON.stringify(data))}catch(e){console.error(e)}}function C(){return Object(h.f)(window.localStorage.getItem("jj_float_banner"))}var k=w,T=(n(4643),n(4644),n(29)),component=Object(T.a)(k,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.visible?n("div",{directives:[{name:"visible-change",rawName:"v-visible-change.once",value:e.onVisibleChange,expression:"onVisibleChange",modifiers:{once:!0}}],staticClass:"global-float-banner",class:{h5:e.isMobile},style:e.containerStyle},[n("Lazy",{staticClass:"jj_animate_bounceIn",attrs:{url:e.iconUrl,resize:e.imgResize,watermark:!1}}),e._v(" "),n("div",{staticClass:"close no-interact",style:e.closeStyle,on:{click:function(t){return t.stopPropagation(),e.onClose(t)}}},[n("Icon",{staticClass:"no-interact",attrs:{type:"close"}})],1)],1):e._e()}),[],!1,null,"33dd1f94",null);t.default=component.exports}}]);
//# sourceMappingURL=c15ba31.js.map