/*!
  * doormat - http://jh3y.github.io/doormat
  *
  * @license MIT
  * @author jh3y
  * (c) 2017
!*/
"use strict";function _classCallCheck(o,t){if(!(o instanceof t))throw new TypeError("Cannot call a class as a function")}var Doormat=function o(t){_classCallCheck(this,o),_initialiseProps.call(this);var e=this.bind,i=this.calibrate,n=this.classes,s=this.active,a=this.defaults,r=this.enums,l=this.errors;if(this.options=Object.assign({},a,t),this.options.snapMode!==r.travel&&this.options.snapMode!==r.viewport)throw Error(l.invalidSnap);if(this.options.mode!==r.inbound&&this.options.mode!==r.outbound)throw Error(l.invalidMode);s.classList.add(n.active),this.options.mode===r.inbound&&this.el.classList.add(n.inbound),i(),e()},_initialiseProps=function(){var o=this;this.classes={active:"dm-panel--active",el:"dm",inbound:"dm--inbound",obsolete:"dm-panel--obsolete"},this.enums={inbound:"inbound",outbound:"outbound",travel:"travel",viewport:"viewport",bottom:"bottom",top:"top",up:"up",down:"down",updateEvent:"doormat:update"},this.defaults={snapDebounce:150,scrollDuration:250,snapMode:this.enums.viewport,mode:this.enums.outbound,snapThreshold:30},this.errors={invalidMode:'Doormat: mode must be either "inbound" or "outbound"',invalidSnap:'Doormat: snapMode must be set to either "viewport" or "travel"'},this.scrollPos=0,this.el=document.querySelector("."+this.classes.el),this.panels=this.el.children,this.updating=!1,this.active=this.panels[0],this.activeIndex=1,this.requestUpdate=function(t){o.updating||(requestAnimationFrame(t),o.updating=!0)},this.bind=function(){var t=function(){return o.requestUpdate(o.calibrate)};"onorientationchange"in window?window.onorientationchange=t:window.onresize=t,window.onscroll=o.onScroll},this.onScroll=function(){var t=o.enums,e=o.scrollPos,i=window.scrollY||window.pageYOffset;o.scrollDir=e<i?t.down:t.up,o.scrollPos=i,o.requestUpdate(o.handleScroll)},this.handleScroll=function(){var t=o.classes,e=o.active,i=o.el,n=o.handleSnap,s=o.inSnapRegion,a=o.enums,r=o.options,l=o.scrollPos,d=r.snapMode,c=r.snapDebounce,u=e.doormatIndex,h=e.nextElementSibling,p=e.previousElementSibling,v=r.mode===a.inbound,m={up:v?h&&l>=h.offsetTop:h&&l>=e.offsetTop+e.offsetHeight,down:v?p&&l<p.doormatBoundary:p&&l<e.offsetTop};if(m.up?(e.classList.remove(t.active),e.classList.add(t.obsolete),h.classList.add(t.active),h.style.top=v?"0":h.doormatActiveTop,o.active=h):m.down&&(e.classList.remove(t.active),e.style.top=v?e.doormatActiveTop:"0",p.classList.remove(t.obsolete),p.classList.add(t.active),o.active=p),u!==o.active.doormatIndex){var f=new Event(a.updateEvent,{bubbles:!0});o.activeIndex=o.active.doormatIndex,i.dispatchEvent(f)}if(o.updating=!1,d){var w=s();clearTimeout(n.__TIMER),w&&(o.handleSnap.__TIMER=setTimeout(function(){n(w)},c))}},this.inSnapRegion=function(){var t=o.enums,e=o.active,i=o.options,n=o.scrollPos,s=o.scrollDir,a=i.snapMode,r=i.snapThreshold,l=e.startScrollPos,d=e.offsetHeight,c=window.innerHeight*(r/100),u=void 0,h=void 0,p=l+d,v=p-c,m=l+c;if(a===t.viewport?(u=n>v&&n<p,h=n>l&&n<m):a===t.travel&&(u=n>m&&s===t.down,h=s===t.up&&n<v),u||h)return u?t.bottom:t.top},this.scrollTo=function(t,e){var i=o.options,n=o.scrollPos,s=performance.now(),a=e||i.scrollDuration,r=n||window.scrollY||window.pageYOffset,l=t-r;!function o(){var e=performance.now(),i=Math.min(1,(e-s)/a),n=Math.sin(i*(Math.PI/2));window.pageYOffset!==t&&(window.scrollTo(0,Math.ceil(n*l+r)),requestAnimationFrame(o))}()},this.scrollToPanel=function(t,e){var i=o.panels,n=o.scrollTo,s=i[t-1];if(!s)throw Error("Doormat: No panel available at that index");n(s.startScrollPos,e)},this.next=function(){o.scrollToPanel(o.active.doormatIndex+1)},this.prev=function(){o.scrollToPanel(o.active.doormatIndex-1)},this.handleSnap=function(t){var e=o.active,i=o.enums,n=o.scrollTo,s=e.nextElementSibling;o.scrolling||n((t===i.top?e:s).startScrollPos)},this.isGreaterThanViewport=function(){for(var t=o.panels,e=!1,i=0;i<t.length;i++)t[i].offsetHeight>window.innerHeight&&(e=!0);return e},this.reset=function(){var t=o.classes,e=o.panels;window.scrollTo(0,0);var i=!0,n=!1,s=void 0;try{for(var a,r=e[Symbol.iterator]();!(i=(a=r.next()).done);i=!0){var l=a.value;l.classList.remove(t.obsolete),l.classList.remove(t.active)}}catch(o){n=!0,s=o}finally{try{!i&&r.return&&r.return()}finally{if(n)throw s}}e[0].classList.add(t.active)},this.calibrate=function(t){for(var e=o.el,i=o.enums,n=o.panels,s=o.reset,a=o.options.mode===i.outbound,r=o.isGreaterThanViewport(),l=0,d=0,c=0;c<n.length;c++){var u=n[c];u.doormatIndex=c+1,l+=u.offsetHeight,c&&(d+=n[c-1].offsetHeight),u.startScrollPos=d,u.doormatActiveTop=r?d+"px":c+"00vh",u.style.zIndex=a?1e3-c:1e3-(n.length-c),a||(u.doormatBoundary=l,u.style.top=u.doormatActiveTop)}o.cumulativeHeight=l,e.style.height=r?l+"px":n.length+"00vh",t&&s(),o.updating=!1}};window.Doormat=Doormat;