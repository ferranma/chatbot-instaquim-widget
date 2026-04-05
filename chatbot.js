(function(){
var CFG={name:'Instaquim',color:'#1a5276',phone:'93 889 13 44',email:'instaquim@instaquim.com'};
var API_URL='https://chatbot-instaquim.exterior-046.workers.dev';

var S=document.createElement('style');
S.textContent='#cb-w *{box-sizing:border-box;margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif}#cb-tog{position:fixed;bottom:24px;right:24px;z-index:99999;width:64px;height:64px;border-radius:50%;background:'+CFG.color+';color:#fff;border:none;cursor:pointer;font-size:28px;box-shadow:0 4px 16px rgba(0,0,0,.2);transition:transform .3s;display:flex;align-items:center;justify-content:center}#cb-tog:hover{transform:scale(1.1)}.cb-bdg{position:absolute;top:-2px;right:-2px;background:#e74c3c;color:#fff;font-size:11px;min-width:20px;height:20px;border-radius:10px;display:flex;align-items:center;justify-content:center;padding:0 5px}#cb-win{position:fixed;bottom:100px;right:24px;z-index:99999;width:380px;max-height:540px;border-radius:16px;background:#fff;box-shadow:0 8px 32px rgba(0,0,0,.15);display:none;flex-direction:column;overflow:hidden}#cb-win.open{display:flex}#cb-hdr{background:'+CFG.color+';color:#fff;padding:16px;display:flex;align-items:center;gap:12px}#cb-hdr .av{width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;font-size:22px}#cb-hdr .inf h3{font-size:15px;font-weight:600}#cb-hdr .inf p{font-size:12px;opacity:.85}#cb-hdr .cls{margin-left:auto;background:none;border:none;color:#fff;font-size:24px;cursor:pointer;padding:4px}#cb-bod{flex:1;overflow-y:auto;padding:16px;max-height:340px;background:#f7f7f8}#cb-inp{display:flex;padding:12px;background:#fff;border-top:1px solid #eee;gap:8px}#cb-inp input{flex:1;padding:10px 14px;border:1.5px solid #ddd;border-radius:24px;font-size:14px;outline:none;transition:border .2s}#cb-inp input:focus{border-color:'+CFG.color+'}#cb-inp button{width:40px;height:40px;border-radius:50%;background:'+CFG.color+';color:#fff;border:none;cursor:pointer;font-size:18px;display:flex;align-items:center;justify-content:center;transition:opacity .2s}#cb-inp button:hover{opacity:.85}.msg{margin-bottom:12px;max-width:85%;animation:cbF .3s ease}.msg.bot{text-align:left}.msg.usr{text-align:right;margin-left:auto}@keyframes cbF{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}.msg .bbl{padding:10px 14px;font-size:14px;line-height:1.5;display:inline-block;max-width:100%}.msg.bot .bbl{background:#fff;border-radius:12px 12px 12px 2px;color:#333;box-shadow:0 1px 3px rgba(0,0,0,.08)}.msg.usr .bbl{background:'+CFG.color+';color:#fff;border-radius:12px 12px 2px 12px}.msg .bbl a{color:'+CFG.color+'}.msg.usr .bbl a{color:#fff;text-decoration:underline}.sug{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}.sug button{background:#fff;border:1.5px solid '+CFG.color+';color:'+CFG.color+';border-radius:16px;padding:6px 14px;font-size:12px;cursor:pointer;transition:all .2s;white-space:nowrap}.sug button:hover{background:'+CFG.color+';color:#fff}.typ{display:flex;gap:4px;padding:8px 14px;align-items:center}.typ span{width:6px;height:6px;border-radius:50%;background:#999;animation:cbD 1.4s infinite}.typ span:nth-child(2){animation-delay:.2s}.typ span:nth-child(3){animation-delay:.4s}@keyframes cbD{0%,80%,100%{transform:scale(.4);opacity:.4}40%{transform:scale(1);opacity:1}}@media(max-width:480px){#cb-win{width:calc(100vw - 16px);right:8px;bottom:96px;max-height:70vh}}';
document.head.appendChild(S);

var W=document.createElement('div');W.id='cb-w';
W.innerHTML='<button id="cb-tog">\u{1F4AC}<span class="cb-bdg">1</span></button><div id="cb-win"><div id="cb-hdr"><div class="av">\u{1F9EA}</div><div class="inf"><h3>'+CFG.name+'</h3><p>Fabricant de productes de neteja</p></div><button class="cls" id="cb-cls">\u00d7</button></div><div id="cb-bod"></div><div id="cb-inp"><input type="text" id="cb-txt" placeholder="Escriu la teva consulta..." autocomplete="off"><button id="cb-snd">\u27A4</button></div></div>';
document.body.appendChild(W);

var tog=document.getElementById('cb-tog'),win=document.getElementById('cb-win'),cls=document.getElementById('cb-cls'),bod=document.getElementById('cb-bod'),txt=document.getElementById('cb-txt'),snd=document.getElementById('cb-snd'),open=false,started=false;

function toggle(){open=!open;win.classList.toggle('open',open);if(open){tog.querySelector('.cb-bdg').style.display='none';if(!started){started=true;startChat()}txt.focus()}}
tog.addEventListener('click',toggle);
cls.addEventListener('click',function(){open=false;win.classList.remove('open')});

function addMsg(t,isBot){var d=document.createElement('div');d.className='msg '+(isBot?'bot':'usr');d.innerHTML='<div class="bbl">'+t+'</div>';bod.appendChild(d);bod.scrollTop=bod.scrollHeight}
function showTyping(){var d=document.createElement('div');d.className='msg bot';d.id='cb-typing';d.innerHTML='<div class="bbl"><div class="typ"><span></span><span></span><span></span></div></div>';bod.appendChild(d);bod.scrollTop=bod.scrollHeight}
function hideTyping(){var t=document.getElementById('cb-typing');if(t)t.remove()}
function showSuggestions(items){var d=document.createElement('div');d.className='sug';items.forEach(function(s){var b=document.createElement('button');b.textContent=s;b.addEventListener('click',function(){d.remove();sendMsg(s)});d.appendChild(b)});bod.appendChild(d);bod.scrollTop=bod.scrollHeight}

function sendMsg(text){
  if(!text.trim())return;
  addMsg(text,false);
  txt.value='';
  showTyping();
  fetch(API_URL,{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({message:text})
  })
  .then(function(r){return r.json()})
  .then(function(data){
    hideTyping();
    addMsg(data.reply||'Error. Truca al '+CFG.phone,true);
    if(typeof gtag==='function')gtag('event','chatbot_interaction',{event_category:'chatbot',event_label:text});
  })
  .catch(function(){
    hideTyping();
    addMsg('No he pogut connectar. Truca al <b>'+CFG.phone+'</b>.',true);
  });
}

snd.addEventListener('click',function(){sendMsg(txt.value)});
txt.addEventListener('keydown',function(e){if(e.key==='Enter')sendMsg(txt.value)});

function startChat(){setTimeout(function(){addMsg('Hola! \u{1F44B} S\u00f3c l\'assistent d\'<b>'+CFG.name+'</b>, fabricant de productes qu\u00edmics de neteja. Com et puc ajudar?',true);setTimeout(function(){showSuggestions(['Productes','Marca blanca','Mostres gr\u00e0tues','Sectors','Contactar'])},400)},300)}

setTimeout(function(){if(!open&&!sessionStorage.getItem('cb-shown')){toggle();sessionStorage.setItem('cb-shown','1')}},25000);
})();
