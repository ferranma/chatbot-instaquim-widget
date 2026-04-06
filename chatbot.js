(function(){
var CFG={name:'Instaquim',color:'#009036',colorLight:'#b1c800',phone:'93 889 13 44',email:'info@instaquim.com'};
var API_URL='https://chatbot-instaquim.exterior-046.workers.dev';

var lang='es';
var path=window.location.pathname;
if(path.indexOf('/ca')===0) lang='ca';
else if(path.indexOf('/en')===0) lang='en';
else if(path.indexOf('/fr')===0) lang='fr';
else if(path.indexOf('/pt')===0) lang='pt';
else lang='es';

var TEXTS={
  ca:{sub:'Fabricant de productes de neteja',placeholder:'Escriu la teva consulta...',hello:'Hola! \u{1F44B} S\u00f3c l\'assistent d\'<b>Instaquim</b>. Com et puc ajudar?',suggestions:['Productes','Marca blanca','Mostres gratu\u00eftes','Sectors','Contactar'],offline:'No he pogut connectar. Truca al <b>'+CFG.phone+'</b>.'},
  es:{sub:'Fabricante de productos de limpieza',placeholder:'Escribe tu consulta...',hello:'\u00a1Hola! \u{1F44B} Soy el asistente de <b>Instaquim</b>. \u00bfEn qu\u00e9 puedo ayudarte?',suggestions:['Productos','Marca blanca','Muestras gratis','Sectores','Contactar'],offline:'No he podido conectar. Ll\u00e1manos al <b>'+CFG.phone+'</b>.'},
  en:{sub:'Cleaning products manufacturer',placeholder:'Type your question...',hello:'Hello! \u{1F44B} I\'m the <b>Instaquim</b> assistant. How can I help you?',suggestions:['Products','Private label','Free samples','Sectors','Contact'],offline:'Could not connect. Call us at <b>'+CFG.phone+'</b>.'},
  fr:{sub:'Fabricant de produits de nettoyage',placeholder:'\u00c9crivez votre question...',hello:'Bonjour! \u{1F44B} Je suis l\'assistant d\'<b>Instaquim</b>. Comment puis-je vous aider?',suggestions:['Produits','Marque blanche','\u00c9chantillons gratuits','Secteurs','Contact'],offline:'Impossible de se connecter. Appelez-nous au <b>'+CFG.phone+'</b>.'},
  pt:{sub:'Fabricante de produtos de limpeza',placeholder:'Escreva a sua pergunta...',hello:'Ol\u00e1! \u{1F44B} Sou o assistente da <b>Instaquim</b>. Como posso ajud\u00e1-lo?',suggestions:['Produtos','Marca branca','Amostras gr\u00e1tis','Setores','Contactar'],offline:'N\u00e3o foi poss\u00edvel conectar. Ligue para <b>'+CFG.phone+'</b>.'}
};
var T=TEXTS[lang];

var S=document.createElement('style');
S.textContent='#cb-w *{box-sizing:border-box;margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif}#cb-tog{position:fixed;bottom:24px;right:24px;z-index:99999;width:64px;height:64px;border-radius:50%;background:'+CFG.color+';color:#fff;border:none;cursor:pointer;font-size:28px;box-shadow:0 4px 16px rgba(0,0,0,.2);transition:transform .3s;display:flex;align-items:center;justify-content:center}#cb-tog:hover{transform:scale(1.1)}.cb-bdg{position:absolute;top:-2px;right:-2px;background:#e74c3c;color:#fff;font-size:11px;min-width:20px;height:20px;border-radius:10px;display:flex;align-items:center;justify-content:center;padding:0 5px}#cb-win{position:fixed;bottom:100px;right:24px;z-index:99999;width:380px;max-height:540px;border-radius:16px;background:#fff;box-shadow:0 8px 32px rgba(0,0,0,.15);display:none;flex-direction:column;overflow:hidden}#cb-win.open{display:flex}#cb-hdr{background:'+CFG.color+';color:#fff;padding:16px;display:flex;align-items:center;gap:12px}#cb-hdr .av{width:40px;height:40px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;overflow:hidden}#cb-hdr .av img{width:28px;height:28px}#cb-hdr .inf h3{font-size:15px;font-weight:600}#cb-hdr .inf p{font-size:12px;opacity:.85}#cb-hdr .cls{margin-left:auto;background:none;border:none;color:#fff;font-size:24px;cursor:pointer;padding:4px}#cb-bod{flex:1;overflow-y:auto;padding:16px;max-height:340px;background:#f7f7f8;display:flex;flex-direction:column;gap:16px}#cb-inp{display:flex;padding:12px;background:#fff;border-top:1px solid #eee;gap:8px}#cb-inp input{flex:1;padding:10px 14px;border:1.5px solid #ddd;border-radius:24px;font-size:14px;outline:none;transition:border .2s}#cb-inp input:focus{border-color:'+CFG.color+'}#cb-inp button{width:40px;height:40px;border-radius:50%;background:'+CFG.color+';color:#fff;border:none;cursor:pointer;font-size:18px;display:flex;align-items:center;justify-content:center;transition:opacity .2s}#cb-inp button:hover{opacity:.85}.msg{margin-bottom:0;max-width:85%;animation:cbF .3s ease}.msg.bot{text-align:left}.msg.usr{text-align:right;margin-left:auto}@keyframes cbF{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}.msg .bbl{padding:12px 16px;font-size:14px;line-height:1.6;display:inline-block;max-width:100%}.msg.bot .bbl{background:#fff;border-radius:12px 12px 12px 2px;color:#333;box-shadow:0 1px 3px rgba(0,0,0,.08)}.msg.usr .bbl{background:'+CFG.color+';color:#fff;border-radius:12px 12px 2px 12px}.msg .bbl a{color:'+CFG.colorLight+'}.msg .bbl a.cb-product{display:flex;flex-direction:column;align-items:center;gap:8px;background:#f7f7f8;border:1px solid #e5e5e5;border-radius:10px;padding:12px;margin:8px 0;text-decoration:none;color:#333;transition:all .2s}.msg .bbl a.cb-product:hover{background:#fff;border-color:'+CFG.color+';transform:translateY(-1px);box-shadow:0 2px 8px rgba(0,0,0,.08)}.msg .bbl a.cb-product img{width:160px;height:160px;object-fit:contain;border-radius:8px;background:#fff}.msg .bbl a.cb-product span{font-weight:600;font-size:14px;color:'+CFG.color+';text-align:center}.msg.usr .bbl a{color:#fff;text-decoration:underline}.sug{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}.sug button{background:#fff;border:1.5px solid '+CFG.color+';color:'+CFG.color+';border-radius:16px;padding:6px 14px;font-size:12px;cursor:pointer;transition:all .2s;white-space:nowrap}.sug button:hover{background:'+CFG.color+';color:#fff}.typ{display:flex;gap:4px;padding:8px 14px;align-items:center}.typ span{width:6px;height:6px;border-radius:50%;background:#999;animation:cbD 1.4s infinite}.typ span:nth-child(2){animation-delay:.2s}.typ span:nth-child(3){animation-delay:.4s}@keyframes cbD{0%,80%,100%{transform:scale(.4);opacity:.4}40%{transform:scale(1);opacity:1}}.typ-txt{font-size:12px;color:#999;margin-left:6px}@media(max-width:480px){#cb-win{width:calc(100vw - 16px);right:8px;bottom:96px;max-height:70vh}}';
document.head.appendChild(S);

var W=document.createElement('div');W.id='cb-w';
W.innerHTML='<button id="cb-tog">\u{1F4AC}<span class="cb-bdg">1</span></button><div id="cb-win"><div id="cb-hdr"><div class="av"><img src="https://cdn.jsdelivr.net/gh/ferranma/chatbot-instaquim-widget@main/icon.png" alt="Instaquim"></div><div class="inf"><h3>'+CFG.name+'</h3><p>'+T.sub+'</p></div><button class="cls" id="cb-cls">\u00d7</button></div><div id="cb-bod"></div><div id="cb-inp"><input type="text" id="cb-txt" placeholder="'+T.placeholder+'" autocomplete="off"><button id="cb-snd">\u27A4</button></div></div>';
document.body.appendChild(W);

var tog=document.getElementById('cb-tog'),win=document.getElementById('cb-win'),cls=document.getElementById('cb-cls'),bod=document.getElementById('cb-bod'),txt=document.getElementById('cb-txt'),snd=document.getElementById('cb-snd'),open=false,started=false;

function toggle(){open=!open;win.classList.toggle('open',open);if(open){tog.querySelector('.cb-bdg').style.display='none';if(!started){started=true;startChat()}txt.focus()}}
tog.addEventListener('click',toggle);
cls.addEventListener('click',function(){open=false;win.classList.remove('open')});

function cleanMsg(t){
  t=t.replace(/\*\*(.+?)\*\*/g,'<b>$1</b>').replace(/\n\n/g,'<br><br>').replace(/\n/g,'<br>');
  // Protect existing HTML tags from URL conversion
  var tags=[];
  t=t.replace(/<[^>]+>/g,function(m){tags.push(m);return '\x00'+(tags.length-1)+'\x00'});
  // Convert bare URLs to links
  t=t.replace(/(https?:\/\/[^\s<)"']+)/g,function(url){return '<a href="'+url+'" target="_blank" style="color:'+CFG.colorLight+';text-decoration:underline">'+url.replace(/https?:\/\/(www\.)?/,'').substring(0,40)+'</a>'});
  // Restore tags
  t=t.replace(/\x00(\d+)\x00/g,function(m,i){return tags[parseInt(i)]});
  // Style existing <a> tags that don't have style
  t=t.replace(/<a href="([^"]+)"([^>]*)>(?!.*style)/g,'<a href="$1"$2 style="color:'+CFG.colorLight+';text-decoration:underline">');
  return t;
}
function addMsg(t,isBot){var d=document.createElement('div');d.className='msg '+(isBot?'bot':'usr');d.innerHTML='<div class="bbl">'+cleanMsg(t)+'</div>';bod.appendChild(d);bod.scrollTop=bod.scrollHeight}
var typingTexts={ca:'Escrivint',es:'Escribiendo',en:'Typing',fr:'En train d\'\u00e9crire',pt:'Escrevendo'};
function showTyping(){var d=document.createElement('div');d.className='msg bot';d.id='cb-typing';d.innerHTML='<div class="bbl"><div class="typ"><span></span><span></span><span></span><span class="typ-txt">'+(typingTexts[lang]||'...')+'</span></div></div>';bod.appendChild(d);bod.scrollTop=bod.scrollHeight}
function hideTyping(){var t=document.getElementById('cb-typing');if(t)t.remove()}
function showSuggestions(items){var d=document.createElement('div');d.className='sug';items.forEach(function(s){var b=document.createElement('button');b.textContent=s;b.addEventListener('click',function(){d.remove();sendMsg(s)});d.appendChild(b)});bod.appendChild(d);bod.scrollTop=bod.scrollHeight}

var chatHistory=[];
var sessionId=Date.now().toString(36)+Math.random().toString(36).substr(2,5);

function typeMsg(text,callback){
  var clean=cleanMsg(text);
  var d=document.createElement('div');d.className='msg bot';
  var bbl=document.createElement('div');bbl.className='bbl';
  d.appendChild(bbl);bod.appendChild(d);
  // Set full HTML but clip with max-height animation
  bbl.innerHTML=clean;
  bbl.style.maxHeight='0';bbl.style.overflow='hidden';bbl.style.transition='none';
  var fullHeight=bbl.scrollHeight;
  var currentHeight=0;
  var inc=Math.max(2,fullHeight/40);
  function reveal(){
    currentHeight+=inc;
    if(currentHeight>=fullHeight){bbl.style.maxHeight='none';bbl.style.overflow='visible';bod.scrollTop=bod.scrollHeight;if(callback)callback();return}
    bbl.style.maxHeight=currentHeight+'px';
    bod.scrollTop=bod.scrollHeight;
    setTimeout(reveal,40);
  }
  setTimeout(reveal,100);
}

function sendMsg(text){
  if(!text.trim())return;
  addMsg(text,false);
  txt.value='';
  chatHistory.push({role:'user',content:text});
  showTyping();
  fetch(API_URL,{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({messages:chatHistory,lang:lang,sessionId:sessionId})
  })
  .then(function(r){return r.json()})
  .then(function(data){
    hideTyping();
    var reply=data.reply||T.offline;
    var delay=800+Math.random()*700;
    setTimeout(function(){
      typeMsg(reply,function(){
        chatHistory.push({role:'assistant',content:reply});
        if(typeof gtag==='function')gtag('event','chatbot_interaction',{event_category:'chatbot',event_label:text});
      });
    },delay);
  })
  .catch(function(){
    hideTyping();
    addMsg(T.offline,true);
  });
}

snd.addEventListener('click',function(){sendMsg(txt.value)});
txt.addEventListener('keydown',function(e){if(e.key==='Enter')sendMsg(txt.value)});

function startChat(){setTimeout(function(){addMsg(T.hello,true)},300)}

setTimeout(function(){if(!open&&!sessionStorage.getItem('cb-shown')){toggle();sessionStorage.setItem('cb-shown','1')}},25000);
})();
