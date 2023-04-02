import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { fetchCountries } from './js/fetchCountries';

const searchForm = document.getElementById('search-form');
const picturesContainer = document.querySelector('.gallery');
// const btnOnloadMore = document.querySelector('.load-more');

searchForm.addEventListener('submit', onSearchForm);

let query = '';
let page = 1;
const perPage = 40;

function renderGallery(imagesItems) {
    const createGalleryMarkup  = imagesItems
        .map(image => {
            const {
                id,
                largeImageURL,
                webformatURL,
                tags,
                likes,
                views,
                comments,
                downloads,
            } = image;
            return `
        <a class="gallery__link" href="${largeImageURL}">
          <div class="gallery-item" id="${id}">
            <img class="gallery-item__img" src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
              <p class="info-item"><b>Likes</b>${likes}</p>
              <p class="info-item"><b>Views</b>${views}</p>
              <p class="info-item"><b>Comments</b>${comments}</p>
              <p class="info-item"><b>Downloads</b>${downloads}</p>
            </div>
          </div>
        </a>
      `;
        })
        .join('');

   picturesContainer.insertAdjacentHTML('beforeend', createGalleryMarkup);
    
    const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
};

function onSearchForm(e) {
    e.preventDefault();
    page = 1;
    query = e.currentTarget.elements.searchQuery.value.trim();
    picturesContainer.innerHTML = '';
    
    if (query === '') {
    Notiflix.Notify.failure(
      'The search string cannot be empty. Please specify your search query.',
    );
    return;
  }

  fetchCountries(query, page, perPage)
    .then(data => {
      if (data.totalHits === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.',
        );
      } else {
          renderGallery(data.hits);
          simpleLightBox = new SimpleLightbox('.gallery a').refresh();
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
      }
    })
    .catch(error => console.log(error))
    .finally(() => {
      searchForm.reset();
    });
};

function onloadMore() {
 page += 1;
  simpleLightBox.destroy();
 
  fetchCountries(query, page, perPage)
    .then(data => {
      renderGallery(data.hits);
      simpleLightBox = new SimpleLightbox('.gallery a').refresh();

      const totalPages = Math.ceil(data.totalHits / perPage);

      if (page > totalPages) {
        Notiflix.Notify.failure(
          "We're sorry, but you've reached the end of search results.",
        );
      }
    })
    .catch(error => console.log(error));
}

function checkIfEndOfPage() {
  return (
    window.innerHeight + window.pageYOffset >=
    document.documentElement.scrollHeight
  );
}


function showLoadMorePage() {
  if (checkIfEndOfPage()) {
    onloadMore();
  }
}

window.addEventListener('scroll', showLoadMorePage);

window.addEventListener('scroll', function () {
  arrowTop.hidden = scrollY < document.documentElement.clientHeight;
});


