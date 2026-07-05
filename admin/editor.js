(() => {
  const state = JSON.parse(JSON.stringify(window.SITE_CONTENT || { categories: [], services: [], projects: [], process: [] }));
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => Array.from(root.querySelectorAll(s));
  function esc(v=''){return String(v).replace(/[&<>"]/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[s]));}
  function panelTabs(){
    $$('.tab').forEach(btn=>btn.addEventListener('click',()=>{
      $$('.tab').forEach(b=>b.classList.remove('active')); btn.classList.add('active');
      $$('.panel').forEach(p=>p.classList.remove('active')); $('#'+btn.dataset.tab).classList.add('active');
    }));
  }
  function render(){renderProjects();renderServices();renderProcess();renderCategories();generate();}
  function renderProjects(){
    $('#projects-list').innerHTML = state.projects.map((item,i)=>`<article class="card"><div class="card-title"><strong>${esc(item.title||'未命名案例')}</strong><button class="danger" data-del="projects" data-i="${i}">删除</button></div><div class="grid"><label>案例标题<input data-bind="projects.${i}.title" value="${esc(item.title)}"></label><label>分类ID<select data-bind="projects.${i}.category">${state.categories.filter(c=>c.id!=='all').map(c=>`<option value="${esc(c.id)}" ${item.category===c.id?'selected':''}>${esc(c.id)}｜${esc(c.label)}</option>`).join('')}</select></label><label>分类显示名<input data-bind="projects.${i}.categoryLabel" value="${esc(item.categoryLabel)}"></label><label>图片路径<input data-bind="projects.${i}.image" value="${esc(item.image)}" placeholder="assets/images/xxx.jpg"></label><label>卡片尺寸<select data-bind="projects.${i}.size"><option value="standard" ${item.size==='standard'?'selected':''}>standard 普通</option><option value="large" ${item.size==='large'?'selected':''}>large 大图</option><option value="wide" ${item.size==='wide'?'selected':''}>wide 宽图</option></select></label></div></article>`).join('');
  }
  function renderServices(){
    $('#services-list').innerHTML = state.services.map((item,i)=>`<article class="card"><div class="card-title"><strong>${esc(item.number||'服务')}</strong><button class="danger" data-del="services" data-i="${i}">删除</button></div><div class="grid"><label>编号<input data-bind="services.${i}.number" value="${esc(item.number)}"></label><label>标题<input data-bind="services.${i}.title" value="${esc(item.title)}"></label><label class="grid full">说明<textarea data-bind="services.${i}.text">${esc(item.text)}</textarea></label></div></article>`).join('');
  }
  function renderProcess(){
    $('#process-list').innerHTML = state.process.map((item,i)=>`<article class="card"><div class="card-title"><strong>${esc(item.number||'流程')}</strong><button class="danger" data-del="process" data-i="${i}">删除</button></div><div class="grid"><label>编号<input data-bind="process.${i}.number" value="${esc(item.number)}"></label><label>标题<input data-bind="process.${i}.title" value="${esc(item.title)}"></label><label class="grid full">说明<textarea data-bind="process.${i}.text">${esc(item.text)}</textarea></label></div></article>`).join('');
  }
  function renderCategories(){
    $('#categories-list').innerHTML = state.categories.map((item,i)=>`<article class="card"><div class="card-title"><strong>${esc(item.label||item.id)}</strong>${item.id==='all'?'':'<button class="danger" data-del="categories" data-i="'+i+'">删除</button>'}</div><div class="grid"><label>分类ID<input data-bind="categories.${i}.id" value="${esc(item.id)}" ${item.id==='all'?'readonly':''}></label><label>显示名称<input data-bind="categories.${i}.label" value="${esc(item.label)}"></label></div></article>`).join('');
  }
  function setByPath(path, value){
    const parts = path.split('.'); let obj = state;
    while(parts.length>1) obj = obj[parts.shift()];
    obj[parts[0]] = value;
  }
  document.addEventListener('input', e=>{ const el=e.target.closest('[data-bind]'); if(!el)return; setByPath(el.dataset.bind, el.value); generate(); });
  document.addEventListener('change', e=>{ const el=e.target.closest('[data-bind]'); if(!el)return; setByPath(el.dataset.bind, el.value); generate(); });
  document.addEventListener('click', e=>{
    const add=e.target.closest('[data-add]');
    if(add){ const type=add.dataset.add; if(type==='projects')state.projects.push({title:'新案例',category:'courtyard',categoryLabel:'私人庭院',image:'assets/images/new-project.jpg',size:'standard'}); if(type==='services')state.services.push({number:String(state.services.length+1).padStart(2,'0'),title:'新服务',text:'服务说明'}); if(type==='process')state.process.push({number:String(state.process.length+1).padStart(2,'0'),title:'新流程',text:'流程说明'}); if(type==='categories')state.categories.push({id:'new-category',label:'新分类'}); render(); }
    const del=e.target.closest('[data-del]');
    if(del && confirm('确定删除这一项吗？')){ state[del.dataset.del].splice(Number(del.dataset.i),1); render(); }
  });
  function generate(){ $('#output').value = '/*\n * 网站内容配置\n * 由木沐景观 CMS V2 预览版生成。\n */\nwindow.SITE_CONTENT = ' + JSON.stringify(state,null,2) + ';\n'; }
  $('#btn-generate').addEventListener('click',()=>{generate(); document.querySelector('[data-tab="export"]').click();});
  $('#btn-download').addEventListener('click',()=>{generate(); const blob=new Blob([$('#output').value],{type:'text/javascript;charset=utf-8'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='content.js'; a.click(); URL.revokeObjectURL(a.href);});
  panelTabs(); render();
})();
