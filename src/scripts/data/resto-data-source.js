import API_ENDPOINT from '../global/api-endpoint';
import {getData, postData} from '../helper';

class RestoDataSource {
  static async getAllResto() {
    const jsonResponse = await getData(API_ENDPOINT.LIST);
    if (jsonResponse.restaurants) {
      return jsonResponse.restaurants;
    }
    throw new Error('Daftar restaurant kosong.');
  }

  static async getRestoDetail(id) {
    const jsonResponse = await getData(API_ENDPOINT.DETAIL(id));
    if (jsonResponse.restaurant) {
      return jsonResponse.restaurant;
    }
    throw new Error('Detail restaurant tidak ditemukan.');
  }

  static async addReview(data) {
    const response = await postData(API_ENDPOINT.ADD_REVIEW, data);
    if (response.customerReviews) {
      return response.customerReviews;
    }
    throw new Error('Terjadi kesalahan, silahkan ulangi kembali.');
  }
}

export default RestoDataSource;
