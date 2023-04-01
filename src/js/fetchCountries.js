import axios from 'axios';
import { KEY } from './api-key.js';


axios.defaults.baseURL = 'https://pixabay.com/api/';

async function fetchCountries(query, page, perPage) {
  const response = await axios.get(
    `?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`,
  );
  return response.data;
};

export { fetchCountries };

