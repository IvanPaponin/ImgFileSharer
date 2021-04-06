const uploadForm = document.forms.uploadForm;
const userImagesDiv = document.querySelector('#user-images');
const filesInput = document.querySelector('#files-input');
const preview = document.createElement('div');

preview.classList.add('preview');

filesInput.parentElement.insertAdjacentElement('afterend', preview);

filesInput.addEventListener('change', (event) => {
  if (!event.target.files) return;

  let files = Array.from(event.target.files);

  files.forEach(file => {
    preview.innerHTML = '';
    if (!file.type.match('image')) return;

    const reader = new FileReader();

    reader.onload = ev => {
      const src = ev.target.result;
      preview.insertAdjacentHTML('afterbegin', `
      <div class="preview-image">
      <div class="preview-remove" data-name="${file.name}">&times;</div>
      <img src="${src}" alt="${file.name}"/>
      </div>
      `)
    };

    reader.readAsDataURL(file);

  });

  preview.addEventListener('click', event => {
    if (!event.target.dataset.name) return;

    const {name} = event.target.dataset;
    files.filter(file => file.name !== name);

    const block = preview
    .querySelector(`[data-name="${name}"`)
    .closest('.preview-image');

    block.classList.add('removing');
    setTimeout(() => block.remove(), 300)
  })

});

// console.log(userImagesDiv);

uploadForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);

  const response = await fetch(event.target.action, {
    method: event.target.method,
    body: formData,
  });

  const result = await response.json();
  // console.log(result);

  for (let i = 0; i < result.length; i++) {
    const image = document.createElement('img');
    image.classList.add("img-uploded", "card-image", "responsive-img")
    image.src = `/uploads/${result[i].filename}`;
    userImagesDiv.insertBefore(image, userImagesDiv.firstChild);
  }
  console.log(userImagesDiv);
});
