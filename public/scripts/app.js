const uploadForm = document.forms.uploadForm;
const newImagesDiv = document.querySelector('#uploaded-images');

uploadForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  // console.log(event);
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
    newImagesDiv.appendChild(image);
  }
  console.log(newImagesDiv);
});
