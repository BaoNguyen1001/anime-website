import api from "./Api.service";
import { store, showDialog } from "../store";

const getRecommendIdByUser = async () => {
  const response = await api
    .get("/recommend/top-rating")
    .then((res) => {
      const {
        data: { data: result },
      } = res;
      return result;
    })
    .catch((err) => {
      const { error } = err.response.data;
      store.dispatch(
        showDialog({
          title: "Error message",
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
      const {
        data: { data: result },
      } = res;
      return result;
    })
    .catch((err) => {
      const { error } = err.response.data;
      store.dispatch(
        showDialog({
          title: "Error message",
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
