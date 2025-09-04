// Tabs logic
const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.panel .content');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const target = tab.dataset.tab;
    contents.forEach(c => { c.style.display = (c.id === target) ? 'block' : 'none'; });
  });
});

// Theme toggle
const themeBtn = document.getElementById('themeToggle');
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeBtn.textContent = document.body.classList.contains('dark') ? 'Light' : 'Dark';
});

// Copy email
function copyEmail(){
  const el = document.getElementById('email') || document.querySelector('#contact .email-box');
  const text = el ? el.innerText.trim() : 'faruqueenan7102@gmail.com';
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(()=>{
      toast('Email copied to clipboard');
    }).catch(()=>{
      fallbackCopy(text);
    });
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text){
  try{
    const ta = document.createElement('textarea');
    ta.value = text; ta.style.position='fixed'; ta.style.left='-9999px';
    document.body.appendChild(ta); ta.select();
    document.execCommand('copy'); document.body.removeChild(ta);
    toast('Email copied to clipboard');
  }catch(e){
    prompt('Copy this email:', text);
  }
}

function toast(msg){
  const t = document.createElement('div');
  t.textContent = msg;
  t.style.cssText = 'position:fixed;left:50%;bottom:26px;transform:translateX(-50%);padding:10px 14px;border-radius:10px;background:rgba(2,6,23,0.9);color:#fff;z-index:9999;opacity:0;transition:opacity .2s';
  document.body.appendChild(t);
  requestAnimationFrame(()=> t.style.opacity = '1');
  setTimeout(()=>{ t.style.opacity='0'; setTimeout(()=>t.remove(),220); },1600);
}