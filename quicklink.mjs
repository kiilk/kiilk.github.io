var e={};function t(e){return new Promise(function(t,n){var r=new XMLHttpRequest;r.open("GET",e,r.withCredentials=!0),r.onload=function(){200===r.status?t():n()},r.send()})}var n,r,i=(n="prefetch",((r=document.createElement("link")).relList||{}).supports&&r.relList.supports(n)?function(e){return new Promise(function(t,n){var r=document.createElement("link");r.rel="prefetch",r.href=e,r.onload=t,r.onerror=n,document.head.appendChild(r)})}:t);function o(n,r,o){if(!(e[n]||(o=navigator.connection)&&((o.effectiveType||"").includes("2g")||o.saveData)))return(r?function(e){return null==self.fetch?t(e):fetch(e,{credentials:"include"})}:i)(n).then(function(){e[n]=!0})}var u=u||function(e){var t=Date.now();return setTimeout(function(){e({didTimeout:!1,timeRemaining:function(){return Math.max(0,50-(Date.now()-t))}})},1)},c=new Set,a=new IntersectionObserver(function(e){e.forEach(function(e){if(e.isIntersecting){var t=e.target.href;c.has(t)&&f(t)}})});function f(e){c.delete(e),o(new URL(e,location.href).toString(),a.priority)}export default function(e){e=Object.assign({timeout:2e3,priority:!1,timeoutFn:u,el:document},e),a.priority=e.priority;var t=e.origins||[location.hostname],n=e.ignores||[];e.timeoutFn(function(){e.urls?e.urls.forEach(f):Array.from(e.el.querySelectorAll("a"),function(e){a.observe(e),t.length&&!t.includes(e.hostname)||function e(t,n){return Array.isArray(n)?n.some(function(n){return e(t,n)}):(n.test||n).call(n,t.href,t)}(e,n)||c.add(e.href)})},{timeout:e.timeout})}
