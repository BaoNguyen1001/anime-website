import api from "./Api.service";
import { store, showDialog } from "../store";

const getRecommendIdByUser = async () => {
  const response = await api
    .get("/recommend/top-rating")
    .then((res) => {
      const { recommendations } = res.data.result;
      return recommendations;
    })
    .catch((err) => {
      const { error } = err.response.data;
      store.dispatch(
        showDialog({
          msgs: error,
          onOK: () => window.history.back(),
        })
      );

      throw err;
    });
  return response;
};

const getNewRecommend = async () => {
  const response = await api
    .get("/recommend")
    .then((res) => {
      const { recommendations } = res.data.result;
      return recommendations;
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

const PredictService = {
  getRecommendIdByUser,
  getNewRecommend,
};

export default PredictService;
