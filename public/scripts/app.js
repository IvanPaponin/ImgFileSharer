const uploadForm = document.forms.uploadForm;
const userImagesDiv = document.querySelector('#user-images');
const filesInput = document.querySelector('#files-input');
const preview = document.createElement('div');
const filePath = document.querySelector('.file-path');
const imgLayout = document.querySelector('.img-layout');
let filesToSend = [];

preview.classList.add('preview');

filesInput.parentElement.insertAdjacentElement('afterend', preview);

filesInput.addEventListener('change', (event) => {
  if (!event.target.files.length) return;

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

  filesToSend = files;

  preview.addEventListener('click', event => {
    if (!event.target.dataset.name) return;

    const {name} = event.target.dataset;
    filePath.value = '';

    const block = preview
    .querySelector(`[data-name="${name}"`)
    .closest('.preview-image');

    block.classList.add('removing');
    setTimeout(() => {
      block.remove();
      filesToSend = filesToSend.filter(file => file.name !== name);
      filesToSend.forEach(file => filePath.value += `${file.name}\t`);
      // console.log(filesToSend);
      // filesInput.files = files.filter(file => file.name !== name);
    }, 300)
  })

});

// console.log(userImagesDiv);

uploadForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData();

  preview.innerHTML = '';
  filePath.value = '';

  for (let i = 0; i < filesToSend.length; i++) {
    formData.append('myImage',filesToSend[i], filesToSend[i].name); 
  }
  
  const response = await fetch(event.target.action, {
    method: event.target.method,
    body: formData,
  });

  const result = await response.json();

  for (let i = 0; i < result.length; i++) {
    const imgContainer = document.createElement('div');
    imgContainer.classList.add('img-container');

    const image = document.createElement('img');
    image.classList.add("img-uploded", "card-image", "responsive-img");
    image.src = `/uploads/${result[i].filename}`;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = "waves-effect waves-light btn";
    deleteBtn.dataset.name = result[i].filename;
    deleteBtn.innerText = 'удалить';

    imgContainer.appendChild(image);
    imgContainer.appendChild(deleteBtn);
    userImagesDiv.insertBefore(imgContainer, userImagesDiv.firstChild);
  }
});

imgLayout.addEventListener('click', async () => {
  if (!event.target.dataset.name) return;
  const img = {filename: event.target.dataset.name};
  const imgBlock = event.target.closest('.img-container');
  imgBlock.remove();

  await fetch ('/user', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(img)
  })

})
