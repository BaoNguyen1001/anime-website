import api from "./Api.service";
import { store, showDialog } from "../store";

const getRating = async (id) => {
  const response = await api
    .get(`/movie/rating/${id}`)
    .then((res) => {
      const { rating } = res.data.result;
      return rating;
    })
    .catch((err) => {
      const { error } = err.response.data;
      store.dispatch(
        showDialog({
          msgs: error,
        })
      );

      throw err;
    });

  return response;
};

const updateRating = async (id, rating) => {
  const response = await api
    .post(`/movie/rating/${id}`, {
      rating,
    })
    .then((res) => {
      const { rating } = res.data.result;
      return rating;
    })
    .catch((err) => {
      const { error } = err.response.data;
      store.dispatch(
        showDialog({
          msgs: error,
        })
      );

      throw err;
    });

  return response;
};

const MovieService = {
  getRating,
  updateRating,
};

export default MovieService;
