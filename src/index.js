import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { fetchCountries } from './js/fetchCountries';

const searchForm = document.getElementById('search-form');
const picturesContainer = document.querySelector('.gallery');

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
}







