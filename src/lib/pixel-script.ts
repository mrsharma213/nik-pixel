// This generates the pixel.js content as a string
export function generatePixelScript(baseUrl: string): string {
  return `(function(){
var s=document.currentScript,sid=s&&s.getAttribute("data-site")||"",
h="${baseUrl}",ep=h+"/api/events",
ls=window.localStorage,dk="nk_vid",sk="nk_sid",
vid=ls.getItem(dk)||g(),sesId=ls.getItem(sk)||g(),
ret=!!ls.getItem(dk),sd=0,top=0,iv,bou=1;
ls.setItem(dk,vid);ls.setItem(sk,sesId);
function g(){return"xxxxxxxx".replace(/x/g,function(){return(Math.random()*16|0).toString(16)})+Date.now().toString(36)}
function u(){var p=new URLSearchParams(location.search);return{s:p.get("utm_source")||"",m:p.get("utm_medium")||"",c:p.get("utm_campaign")||"",t:p.get("utm_term")||"",n:p.get("utm_content")||""}}
function d(){var w=screen.width,ua=navigator.userAgent;return{dt:w<768?"mobile":w<1024?"tablet":"desktop",br:ua.match(/Chrome/)?ua.match(/Edg/)?"Edge":"Chrome":ua.match(/Firefox/)?"Firefox":ua.match(/Safari/)?"Safari":"Other",os:ua.match(/Windows/)?"Windows":ua.match(/Mac/)?"macOS":ua.match(/Linux/)?"Linux":ua.match(/Android/)?"Android":ua.match(/iPhone|iPad/)?"iOS":"Other",sw:screen.width,sh:screen.height}}
function p(t,ex){
var utm=u(),di=d(),b={site_id:sid,type:t,session_id:sesId,visitor_id:vid,url:location.href,referrer:document.referrer,utm_source:utm.s,utm_medium:utm.m,utm_campaign:utm.c,utm_term:utm.t,utm_content:utm.n,device_type:di.dt,browser:di.br,os:di.os,screen_width:di.sw,screen_height:di.sh,returning:ret};
if(ex)for(var k in ex)b[k]=ex[k];
try{if(navigator.sendBeacon){navigator.sendBeacon(ep,JSON.stringify(b))}else{var x=new XMLHttpRequest();x.open("POST",ep,true);x.setRequestHeader("Content-Type","application/json");x.send(JSON.stringify(b))}}catch(e){}
}
function sc(){var h=document.documentElement,b=document.body,st=window.pageYOffset||h.scrollTop||b.scrollTop,sh=Math.max(h.scrollHeight,b.scrollHeight)-window.innerHeight;if(sh<=0)return;var pct=Math.round(st/sh*100),th=[25,50,75,100],ns=0;for(var i=0;i<th.length;i++){if(pct>=th[i])ns=th[i]}if(ns>sd){sd=ns;p("scroll",{scroll_depth:ns})}}
p("pageview");
iv=setInterval(function(){top+=5;bou=0;p("heartbeat",{time_on_page:top})},5000);
window.addEventListener("scroll",sc,{passive:true});
document.addEventListener("click",function(e){var t=e.target,a=t.closest?t.closest("a"):null;if(a){var hr=a.href||"";if(hr&&a.hostname!==location.hostname){p("click",{event_name:"outbound",event_data:JSON.stringify({url:hr})})}}var tr=t.closest?t.closest("[data-nk-track]"):null;if(tr){p("click",{event_name:tr.getAttribute("data-nk-track"),event_data:JSON.stringify({text:tr.innerText||""})})}});
window.addEventListener("beforeunload",function(){if(bou)p("bounce",{time_on_page:top});clearInterval(iv)});
window.nk=function(t,a,b){if(t==="event"){p("custom",{event_name:a,event_data:typeof b==="object"?JSON.stringify(b):b||""})}else if(t==="conversion"){var c=a||{};p("conversion",{conversion_value:c.value||0,conversion_currency:c.currency||"USD",order_id:c.order_id||""})}};
})();`;
}
