(function () {
  const form = document.querySelector('#search-form');
  const searchField = document.querySelector('#search-keyword');
  let searchedForText;
  const responseContainer = document.querySelector('#response-container');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    responseContainer.innerHTML = '';
    searchedForText = searchField.value;

    // image
    function addImage(data) {
      let htmlContent = '';
      const firstImage = data.results[0];

      if (firstImage) {
        htmlContent = `<figure>
            <img src="${firstImage.urls.small}" alt="${searchedForText}">
            <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
        </figure>`;
      } else {
        htmlContent = 'Unfortunately, no image was returned for your search.';
      }

      responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
    }
    function requestError(err, part) {
      console.log(err);
      responseContainer.insertAdjacentHTML(
        'beforeend',
        `<p class="network-warning">Oh no! There was an error making a request for the ${part}.</p>`,
      );
    }
    fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`, {
      headers: {
        Authorization: 'Client-ID abc123',
      },
    })
      .then((response) => response.json())
      .then(addImage)
      .catch((err) => requestError(err, 'image'));

    // articles
    function addArticles(data) {
      responseContainer.insertAdjacentElement(
        'beforeend',
        '<ul>' +
          data.response.docs
            .map(
              (article) => `<li class"article">
              <p>${article.snippet}</p>
              <h2><a href="${article.web_url}">${article.headline.main}</a></h2>
            </li>`,
            )
            .join('') +
          '</ul>',
      );
    }
    fetch(
      `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=<your-API-key-goes-here>`,
    )
      .then((response) => response.json())
      .then(addArticles)
      .catch((err) => requestError(err, 'articles'));
  });
})();
