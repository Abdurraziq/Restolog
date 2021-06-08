import API_ENDPOINT from '../globals/api-endpoint';
import {getData, postData} from '../helper';

class RestoDataSource {
  static async restaurantList() {
    const jsonResponse = await getData(API_ENDPOINT.LIST);
    if (jsonResponse.restaurants) {
      return jsonResponse.restaurants;
    }
    throw new Error('Data tidak tersedia.');
  }

  static async restaurantDetail(id) {
    const jsonResponse = await getData(API_ENDPOINT.DETAIL(id));
    if (jsonResponse.restaurant) {
      return jsonResponse.restaurant;
    }
    throw new Error('Data tidak tersedia.');
  }

  static async addReview(data) {
    const response = await postData(API_ENDPOINT.ADD_REVIEW, data);
    return response;
  }
}

export default RestoDataSource;
