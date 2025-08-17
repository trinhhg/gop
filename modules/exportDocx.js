function exportDocx(index){
  const chapter = AppAPI.getChapters()[index];
  const doc = new docx.Document({
    sections: [{ properties:{}, children:[
      new docx.Paragraph({ text: chapter.title, heading: docx.HeadingLevel.HEADING_1 }),
      new docx.Paragraph({ text: chapter.content })
    ]}]
  });
  docx.Packer.toBlob(doc).then(blob=>{
    let a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = chapter.title + ".docx";
    a.click();
  });
}
window.exportDocx = exportDocx;
