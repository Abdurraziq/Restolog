import FavoriteRestoIdb from '../../data/favoriteresto-idb';
import RestoDataSource from '../../data/resto-data-source';
import UrlParser from '../../routes/url-parser';
import '../pages/detail';

class Detail {
  constructor() {
    this._formSubmitHandler = this._onFormSubmit.bind(this);
    this._favButtonHandler = this._onFavButtonClick.bind(this);
  }

  createElement() {
    this.element = document.createElement('detail-page');
    return this.element;
  }

  async showContent() {
    try {
      const url = UrlParser.parseActiveUrlWithoutCombiner();
      this._restoDetails = await RestoDataSource.restaurantDetail(url.id);
      this.isFavoriteResto = await FavoriteRestoIdb.getResto(url.id);

      this.element.data = this._restoDetails;
      this.element.formSubmitHandler = this._formSubmitHandler;
      this.element.favButtonHandler = this._favButtonHandler;

      this.element.changeFavButton(this.isFavoriteResto);
    } catch (error) {
      console.error(error);
      this.element.showMessage(error.message);
    }
  }

  /**
   *
   * @param {Event} event
   */
  async _onFormSubmit(event) {
    event.preventDefault();

    try {
      // Show loading on Submit
      this.element.showLoadingOnFormSubmit();

      const reviewForm = document.querySelector('#review-form');
      const formData = new FormData(reviewForm);
      const reviewData = {
        id: this._restoDetails.id,
        name: formData.get('name'),
        review: formData.get('review'),
      };

      const response = await RestoDataSource.addReview(reviewData);

      if (response.error) {
        throw new Error('Upps... terjadi kesalahan, silahkan ulangi kembali.');
      }
      this.element.showNewReviews(response.customerReviews);
      reviewForm.reset();
    } catch (error) {
      console.error(error.message);
      alert(error);
    } finally {
      // Hide loading after Submit
      this.element.showLoadingOnFormSubmit(false);
    }
  }

  /**
   *
   * @param {Event} event
   */
  async _onFavButtonClick(event) {
    event.stopPropagation();
    const restaurant = {
      id: this._restoDetails.id,
      name: this._restoDetails.name,
      description: this._restoDetails.description,
      pictureId: this._restoDetails.pictureId,
      city: this._restoDetails.city,
      rating: this._restoDetails.rating,
    };

    this.isFavoriteResto ?
      await this._removeFromFavorite(restaurant.id) :
      await this._addToFavorite(restaurant);

    this.isFavoriteResto = !this.isFavoriteResto;
    this.element.changeFavButton(this.isFavoriteResto);
  }

  async _addToFavorite(restaurant) {
    await FavoriteRestoIdb.putResto(restaurant);
    this.element.showSnackBar('Restaurant berhasil ditambahkan ke favorite');
  }

  async _removeFromFavorite(id) {
    await FavoriteRestoIdb.deleteResto(id);
    this.element.showSnackBar('Restaurant berhasil dihapus dari favorite');
  }
}

export default Detail;
