import api from './Api.service';

const getRating = async (id, setNotAvailable, setRating) => {
  return await api.get(`/movie/rating/${id}`)
    .then((response) => {
      const { rating } = response.data;
      if(rating) {
        setRating(rating);
      }
    })
    .catch((err) => {
      setNotAvailable(err.response.data.error);
    })
}

const updateRating = async (id, rating, setRating) => {
  return await api.post(`/movie/rating/${id}`, {
    rating,
  })
  .then(() => {
    setRating(rating);
    return true;
  })
  .catch(() => {
    return false;
  })
}


const MovieService = {
  getRating,
  updateRating,
}

export default MovieService;