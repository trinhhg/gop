window.AppAPI = (function(){
  let chapters = JSON.parse(localStorage.getItem('chapters') || '[]');
  let history = [], redoStack = [];

  function saveState(){
    history.push(JSON.stringify(chapters));
    localStorage.setItem('chapters', JSON.stringify(chapters));
    redoStack = [];
    render();
  }
  function render(){
    const container = document.getElementById('chapters');
    container.innerHTML = '';
    chapters.forEach((c, i) => {
      const div = document.createElement('div');
      div.className = 'chapter';
      div.innerHTML = `<b>${c.title}</b>
        <button onclick="AppAPI.exportDocx(${i})">.docx</button>
        <pre>${c.content}</pre>`;
      container.appendChild(div);
    });
  }
  function addChapter(){
    const t = document.getElementById('title').value.trim();
    const c = document.getElementById('content').value.trim();
    if(!t || !c) return;
    chapters.push({ title: t, content: c });
    saveState();
  }
  function setChapters(data){ chapters = data; saveState(); }
  function getChapters(){ return chapters; }
  function replaceAll(data){ chapters = data; saveState(); }
  function undo(){
    if(history.length){
      redoStack.push(JSON.stringify(chapters));
      chapters = JSON.parse(history.pop());
      localStorage.setItem('chapters', JSON.stringify(chapters));
      render();
    }
  }
  function redo(){
    if(redoStack.length){
      history.push(JSON.stringify(chapters));
      chapters = JSON.parse(redoStack.pop());
      localStorage.setItem('chapters', JSON.stringify(chapters));
      render();
    }
  }
  function onEvent(){/*plugin hooks*/} 
  function triggerEvent(){}

  render();

  return {
    addChapter, getChapters, setChapters, replaceAll,
    undo, redo, exportDocx, exportZip,
    mergeAll, snapshot: saveState, onEvent, triggerEvent
  };
})();
