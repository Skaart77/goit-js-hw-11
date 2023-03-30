import axios from 'axios';
import { KEY } from './api-key.js';


axios.defaults.baseURL = 'https://pixabay.com/api/';
// Додаю перехоплювач запиту
axios.interceptors.response.use(function (response) {
    // Будь-який код стану, що знаходиться в межах 2хх, викликає спрацьовування цієї функції
    return response;
  }, function (error) {
    Notiflix.Notify.failure('Something went wrong. Please try again later.');
    return Promise.reject(error);
  });

async function fetchCountries(query, page, perPage) {
  const response = await axios.get(
    `?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`,
  );
  return response;
}

export { fetchCountries };

