const uploadForm = document.forms.uploadForm;
const userImagesDiv = document.querySelector('#user-images');

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
