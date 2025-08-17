function exportZip(){
  let zip = new JSZip();
  let promises = [];
  AppAPI.getChapters().forEach((chapter)=>{
    const doc = new docx.Document({
      sections: [{ properties:{}, children:[
        new docx.Paragraph({ text: chapter.title, heading: docx.HeadingLevel.HEADING_1 }),
        new docx.Paragraph({ text: chapter.content })
      ]}]
    });
    promises.push(docx.Packer.toBlob(doc).then(blob=>{
      zip.file(chapter.title + ".docx", blob);
    }));
  });
  Promise.all(promises).then(()=>{
    zip.generateAsync({type:"blob"}).then(content=>{
      let a = document.createElement('a');
      a.href = URL.createObjectURL(content);
      a.download = "chapters.zip";
      a.click();
    });
  });
}
window.exportZip = exportZip;
