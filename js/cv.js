(() => {
  const dialog = document.getElementById('cvDialog');
  const preview = document.getElementById('previewCv');
  const closeTop = document.getElementById('closeCv');
  const closeBottom = document.getElementById('closeCvBottom');
  const download = document.getElementById('downloadCv');
  function openPreview() {
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else window.open('documents/CV.pdf', '_blank', 'noopener');
  }
  function closePreview() { dialog.close(); }
  preview.addEventListener('click', openPreview);
  closeTop.addEventListener('click', closePreview);
  closeBottom.addEventListener('click', closePreview);
  download.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = 'documents/CV.pdf';
    link.download = 'Gladwell_Sandile_Sibiya_CV.pdf';
    document.body.appendChild(link);
    link.click();
    link.remove();
  });
  dialog.addEventListener('click', event => {
    if (event.target === dialog) closePreview();
  });
})();