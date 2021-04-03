const uploadForm = document.forms.uploadForm;

uploadForm.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log(event);
  const formData = new FormData(event.target);

  const response = fetch(event.target.action, {
    method: event.target.method,
    body: formData,
  });
  
});
