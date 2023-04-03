const targetClass = 'history-item-header-sum-'; // название класса div, которое нужно найти
const sumDivs = document.querySelectorAll(`div[class*="${targetClass}"]`);

const commentDivs = document.querySelectorAll('span[class^="history-item-header-info-comment-"]');

sumDivs.forEach((sumDiv, index) => {
  const sum = sumDiv.textContent;
  const comment = commentDivs[index].textContent.trim();


  if (comment === 'Комментарий') {
    fetch('https://example.com/api/data', {
      method: 'GET',
      mode: 'cors', // добавляем режим cors
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  }

  console.log(`Сумма: ${sum}, Комментарий: ${comment}`);
});
