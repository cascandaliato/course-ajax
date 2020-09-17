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
    const unsplashRequest = new XMLHttpRequest();

    unsplashRequest.open(
      'GET',
      `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
    );
    function addImage() {
      //   debugger;
      let htmlContent = '';
      const data = JSON.parse(this.responseText);
      const firstImage = data.results[0];

      if (data && data.results && data.results[0]) {
        htmlContent = `<img src="${firstImage.urls.regular}" alt="${searchedForText}
             >
            <figcaption>${searchedForText} by ${firstImage.user.name}<figcaption
        </figure>`;
      } else {
        htmlContent = '<div class="error-no-image">No images available</div>';
      }
      responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
    }
    unsplashRequest.onload = addImage;
    unsplashRequest.setRequestHeader('Authorization', 'Client-ID ---');
    unsplashRequest.send();

    // articles
    function addArticles() {
      let htmlContent = '';
      const data = JSON.parse(this.responseText);

      if (data.response && data.response.docs && data.response.docs.length > 1) {
        htmlContent =
          '<ul>' +
          data.response.docs
            .map(
              (article) => `<li class"article">
              <p>${article.snippet}</p>
              <h2><a href="${article.web_url}">${article.headline.main}</a></h2>
            </li>`,
            )
            .join('') +
          '</ul>';
      } else {
        htmlContent = '<div class="error-no-image">No articles available</div>';
      }

      responseContainer.insertAdjacentElement('beforeend', htmlContent);
    }
    const articleRequest = new XMLHttpRequest();
    articleRequest.onload = addArticles;
    articleRequest.open(
      'GET',
      `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=<your-API-key-goes-here>`,
    );
    articleRequest.send();
  });
})();
