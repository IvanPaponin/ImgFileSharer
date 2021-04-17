const commentForm = document.forms.commentForm;
const userName = document.querySelector('#userName');
const userLastName = document.querySelector('#userLastName');
const author = `${userName.innerText} ${userLastName.innerText}`;
let authorId = document.querySelector('#userID');
authorId = authorId.innerText;
const commentList = document.querySelector('.card-content');

commentForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const commentText = commentForm.commentText.value;

  const postedAt = new Date().toLocaleString();
  const response = await fetch(event.target.action, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ commentText, author, authorId, postedAt }),
  });

  const result = await response.json();
  console.log(result);

  commentList.insertAdjacentHTML(
    'afterbegin',
    `
    <div class='comment collection-item'>
      <p>${commentText}</p>
      <div class="authorInfo">
      <span>${author}</span> <span>${postedAt}</span>
      </div>
    </div>
    <a class="waves-effect waves-teal btn-flat" data-assignment="${result.newCommentId}" href="/card/${result.imgFilename}">Удалить</a>`
  );
  commentForm.commentText.value = '';
});

commentList.addEventListener('click', async (event) => {
  event.preventDefault();
  if (!event.target.dataset.assignment) return;
  const block = event.target.parentElement;
  const commentToDelete = event.target.dataset.assignment;
  console.log(event.target.href);

  await fetch(event.target.href, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ commentToDelete }),
  });

  block.remove();
});
