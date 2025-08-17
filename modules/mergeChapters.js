function mergeAll(){
  let data = AppAPI.getChapters();
  let groups = {};

  data.forEach(ch => {
    let m = ch.title.match(/^\s*(?:Chương|Chapter|Ch)\s*(\d+)(?:\s*[\.\-]\s*(\d+))?\s*$/i);
    if(m){
      let main = +m[1], sub = m[2] ? +m[2] : 0;
      groups[main] = groups[main] || [];
      groups[main].push({ sub, content: ch.content.trim() });
    }
  });

  let merged = [];
  Object.keys(groups).sort((a,b)=>a-b).forEach(main=>{
    let parts = groups[main].sort((a,b)=>a.sub-b.sub).map(p=>p.content);
    let finalContent = parts.filter((v,i,arr)=>arr.indexOf(v)===i).join("\n\n");
    merged.push({ title: `Chương ${main}`, content: finalContent });
  });

  AppAPI.replaceAll(merged);
}
window.mergeAll = mergeAll;
