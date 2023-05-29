import api from './Api.service';
import { store, showDialog } from '../store'

const getRecommendIdByUser = async () => {
  const response = await api.get('/recommend/top-rating')
    .then(res => {
      return res;
    })
    .catch(err => {
      const { error } = err.response.data;
      store.dispatch(showDialog({
        title: 'Error message',
        msgs: error,
        onOK: () => window.history.back(),
      }))

      throw err;
    })
  
    return response
}


const PredictService = {
  getRecommendIdByUser,
}

export default PredictService