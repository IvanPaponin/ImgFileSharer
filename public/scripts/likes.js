const layout = document.querySelector('.img-layout');

layout.addEventListener('click', async (event) => {
  event.preventDefault();
  if (!event.target.dataset.name) return;

  const likeSymbol = event.target;

  const img = { filename: event.target.dataset.name };
  const likeCount = likeSymbol.previousElementSibling;

  const response = await fetch('/', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(img),
  });

  const result = await response.json();
  let count = Number(likeCount.innerText);
  let modifier = Number(result.index);
  if (modifier === -1 || count !== 0) {
    likeSymbol.classList.remove('btn-active');
    return (likeCount.innerText = count - 1);
  } else {
    likeSymbol.classList.add('btn-active');
    return (likeCount.innerText = count + 1);
  }
});
