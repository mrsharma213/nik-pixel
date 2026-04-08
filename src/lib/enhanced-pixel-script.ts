// Enhanced pixel script with custom events support
export function generateEnhancedPixelScript(baseUrl: string): string {
  return `(function(){
"use strict";
var s=document.currentScript,sid=s&&s.getAttribute("data-site")||"";
if(!sid)return;
var h="${baseUrl}",ep=h+"/api/events",cep=h+"/api/custom-events/"+sid,
ls=window.localStorage,dk="nk_vid",sk="nk_sid",stk="nk_st",
vid=ls.getItem(dk)||g(),
sesId,ret=!!ls.getItem(dk),sd=0,top=0,iv,engaged=0,
customEvents=[],cartTotal=0,quizSteps={},formFields={};

// Persist visitor ID
ls.setItem(dk,vid);

// Session management: rotate session after 30 min of inactivity
var now=Date.now(),lastSeen=Number(ls.getItem(stk))||0;
if(now-lastSeen>1800000||!ls.getItem(sk)){
  sesId=g();
  ls.setItem(sk,sesId);
}else{
  sesId=ls.getItem(sk);
}
ls.setItem(stk,String(now));

function g(){return"xxxxxxxx-xxxx".replace(/x/g,function(){return(Math.random()*16|0).toString(16)})+Date.now().toString(36)}

function u(){var p=new URLSearchParams(location.search);return{s:p.get("utm_source")||"",m:p.get("utm_medium")||"",c:p.get("utm_campaign")||"",t:p.get("utm_term")||"",n:p.get("utm_content")||""}}

function d(){var w=screen.width,ua=navigator.userAgent;return{dt:w<768?"mobile":w<1024?"tablet":"desktop",br:ua.match(/Chrome/)?ua.match(/Edg/)?"Edge":"Chrome":ua.match(/Firefox/)?"Firefox":ua.match(/Safari/)?"Safari":"Other",os:ua.match(/Windows/)?"Windows":ua.match(/Mac/)?"macOS":ua.match(/Linux/)?"Linux":ua.match(/Android/)?"Android":ua.match(/iPhone|iPad/)?"iOS":"Other",sw:screen.width,sh:screen.height}}

function p(t,ex){
var utm=u(),di=d(),b={site_id:sid,type:t,session_id:sesId,visitor_id:vid,url:location.href,referrer:document.referrer,page_title:document.title||"",utm_source:utm.s,utm_medium:utm.m,utm_campaign:utm.c,utm_term:utm.t,utm_content:utm.n,device_type:di.dt,browser:di.br,os:di.os,screen_width:di.sw,screen_height:di.sh,returning:ret};
if(ex)for(var k in ex)b[k]=ex[k];
try{if(navigator.sendBeacon){navigator.sendBeacon(ep,JSON.stringify(b))}else{var x=new XMLHttpRequest();x.open("POST",ep,true);x.setRequestHeader("Content-Type","application/json");x.send(JSON.stringify(b))}}catch(e){}
}

// Load custom events configuration
function loadCustomEvents(){
try{
var x=new XMLHttpRequest();
x.open("GET",cep,true);
x.onreadystatechange=function(){
if(x.readyState===4&&x.status===200){
try{
var data=JSON.parse(x.responseText);
customEvents=data.events||[];
setupCustomEventTracking();
}catch(e){}
}
};
x.send();
}catch(e){}
}

// Fire platform-specific events
function firePlatformEvents(eventName,mappings,eventData){
if(!mappings)return;

// Fire Meta Pixel events
if(mappings.meta&&window.fbq){
window.fbq('track',mappings.meta,eventData);
}

// Fire Google Analytics events  
if(mappings.google&&window.gtag){
window.gtag('event',mappings.google,eventData);
}

// Fire TikTok Pixel events
if(mappings.tiktok&&window.ttq){
window.ttq.track(mappings.tiktok,eventData);
}

// Log to Sharmlytics
p("custom_event",{
event_name:eventName,
platform_mappings:JSON.stringify(mappings),
event_data:JSON.stringify(eventData)
});
}

// Check custom event triggers
function checkEventTriggers(triggerType,data){
customEvents.forEach(function(event){
if(!event.enabled||event.event_type!==triggerType)return;

var conditions=event.trigger_conditions;
var shouldTrigger=false;
var eventData=data||{};

switch(triggerType){
case "cart_value":
if(conditions.cart_threshold&&cartTotal>=conditions.cart_threshold){
shouldTrigger=true;
eventData.cart_value=cartTotal;
eventData.currency=conditions.currency||"USD";
}
break;

case "quiz_completion":
var stepKey=conditions.quiz_id||"default";
if(conditions.quiz_step&&quizSteps[stepKey]>=getQuizStepNumber(conditions.quiz_step)){
shouldTrigger=true;
eventData.quiz_id=conditions.quiz_id;
eventData.quiz_step=conditions.quiz_step;
}
break;

case "lead_capture":
if(conditions.field_type&&formFields[conditions.field_type]){
shouldTrigger=true;
eventData.field_type=conditions.field_type;
eventData.form_id=conditions.form_id;
}
break;
}

if(shouldTrigger){
firePlatformEvents(event.event_name,event.platform_mappings,eventData);
}
});
}

function getQuizStepNumber(step){
var stepMap={"start":1,"middle":2,"final":3,"complete":4};
return stepMap[step]||1;
}

// Cart value tracking
function updateCartTotal(){
// Look for cart total in common selectors
var selectors=[
'[data-cart-total]',
'.cart-total',
'#cart-total',
'.total-price',
'[data-testid="cart-total"]',
'.cart-summary .total'
];

for(var i=0;i<selectors.length;i++){
var el=document.querySelector(selectors[i]);
if(el){
var text=el.textContent||el.getAttribute('data-cart-total')||'';
var match=text.match(/[\d,]+\.?\d*/);
if(match){
var newTotal=parseFloat(match[0].replace(/,/g,''));
if(newTotal!==cartTotal){
cartTotal=newTotal;
checkEventTriggers("cart_value");
}
break;
}
}
}
}

// Quiz tracking
function trackQuizStep(quizId,step){
quizSteps[quizId||"default"]=getQuizStepNumber(step);
checkEventTriggers("quiz_completion");
}

// Form field tracking
function trackFormField(fieldType,value,formId){
if(value&&value.length>0){
formFields[fieldType]=true;
checkEventTriggers("lead_capture",{form_id:formId});
}
}

// Setup custom event tracking
function setupCustomEventTracking(){
// Monitor cart changes
setInterval(updateCartTotal,2000);

// Monitor form inputs
document.addEventListener('input',function(e){
var input=e.target;
if(input.type==='email'||input.name==='email'){
trackFormField('email',input.value,input.closest('form')&&input.closest('form').id);
}
if(input.type==='tel'||input.name==='phone'||input.name==='tel'){
trackFormField('phone',input.value,input.closest('form')&&input.closest('form').id);
}
});

// Monitor quiz steps via data attributes
document.addEventListener('click',function(e){
var el=e.target.closest('[data-quiz-step]');
if(el){
var quizId=el.getAttribute('data-quiz-id')||'default';
var step=el.getAttribute('data-quiz-step');
trackQuizStep(quizId,step);
}
});
}

function sc(){var h=document.documentElement,b=document.body,st=window.pageYOffset||h.scrollTop||b.scrollTop,sh=Math.max(h.scrollHeight,b.scrollHeight)-window.innerHeight;if(sh<=0)return;var pct=Math.round(st/sh*100),th=[25,50,75,100],ns=0;for(var i=0;i<th.length;i++){if(pct>=th[i])ns=th[i]}if(ns>sd){sd=ns;engaged=1;p("scroll",{scroll_depth:ns})}}

// Send initial pageview
p("pageview");

// Load custom events config
loadCustomEvents();

// Initial cart check
setTimeout(updateCartTotal,1000);

// Heartbeat: fires every 5s, marks engagement
iv=setInterval(function(){top+=5;engaged=1;p("heartbeat",{time_on_page:top});ls.setItem(stk,String(Date.now()))},5000);

// Scroll tracking
window.addEventListener("scroll",sc,{passive:true});

// Enhanced click tracking
document.addEventListener("click",function(e){
engaged=1;

var t=e.target,a=t.closest?t.closest("a"):null;
if(a){var hr=a.href||"";if(hr&&a.hostname!==location.hostname){p("click",{event_name:"outbound",event_data:JSON.stringify({url:hr})})}}
var tr=t.closest?t.closest("[data-nk-track]"):null;
if(tr){p("click",{event_name:tr.getAttribute("data-nk-track"),event_data:JSON.stringify({text:tr.innerText||""})})}

// Check for cart add buttons
var cartBtn=t.closest('[data-cart-add], .add-to-cart, [data-testid="add-to-cart"]');
if(cartBtn){
setTimeout(updateCartTotal,500); // Check cart after add
}
});

// On page leave: send final time_on_page and engagement status
window.addEventListener("visibilitychange",function(){
if(document.visibilityState==="hidden"){
p("leave",{time_on_page:top,engaged:engaged?1:0});
clearInterval(iv);
}
});

// Enhanced Public API
window.nk=function(t,a,b){
if(t==="event"){p("custom",{event_name:a,event_data:typeof b==="object"?JSON.stringify(b):b||""})}
else if(t==="conversion"){var c=a||{};p("conversion",{conversion_value:c.value||0,conversion_currency:c.currency||"USD",order_id:c.order_id||""})}
else if(t==="cart"){cartTotal=parseFloat(a)||0;checkEventTriggers("cart_value")}
else if(t==="quiz"){trackQuizStep(b,a)}
else if(t==="form"){trackFormField(a,b,arguments[3])}
};
})();`;
}