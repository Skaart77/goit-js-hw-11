import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const searchForm = document.getElementById('search-form');
const picturesContainer = document.querySelector('.gallery');
const searchBtn = document.querySelector('#searchBtn');

searchBtn.addEventListener('click', e => {
    e.preventDefault();
    const  searchValue = document.querySelector('#searchInput').value;
    fetchCountries(searchValue).then(response => {
        if (!response.ok) {
            Notiflix.Notify.failure(
                'Sorry, there are no images matching your search query. Please try again.'
            )
        }
        return response.json();
    }).catch(error => console.log(error))
        .finally(() => {
      searchForm.reset();
    }); 
});

const renderGallery = (galleryItems) => {
    picturesContainer.innerHTML = '';
    const galleryMarkup = galleryItems.map(({ id,
            largeImageURL,
            webformatURL,
            tags,
            likes,
            views,
            comments,
            downloads }) => {
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
    }).join('');
    
    gallery.insertAdjacentHTML('beforeend', galleryMarkup);
    
};










