/* eslint-env jquery */

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
    function addImage(images) {
      const firstImage = images.results[0];

      responseContainer.insertAdjacentHTML(
        'afterbegin',
        `<img src="${firstImage.urls.regular}" alt="${searchedForText}
             >
            <figcaption>${searchedForText} by ${firstImage.user.name}<figcaption
        </figure>`,
      );
    }
    $.ajax({
      url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
      headers: {
        Authorization: 'Client-ID 123abc456def',
      },
    }).done(addImage);

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
    $.ajax({
      url: `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=<your-API-key-goes-here>`,
    }).done(addArticles);
  });
})();
