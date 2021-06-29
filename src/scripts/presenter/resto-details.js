/* eslint-disable max-len */
import {getElement} from '../helper';
import UrlParser from '../routes/url-parser';
import Presenter from './presenter';

class RestoDetailPresenter extends Presenter {
  constructor({view, model}) {
    super({view: view, model: model});
    this._formSubmitHandler = this._onFormSubmit.bind(this);
    this._favButtonHandler = this._onFavButtonClick.bind(this);
  }

  async showContent() {
    try {
      const url = UrlParser.parseActiveUrlWithoutCombiner();
      const {detail, favorite} = this._model;
      this._restoDetails = await detail.getRestoDetail(url.id);
      this._isFavoriteResto = !! await favorite.getResto(this._restoDetails.id);
      this._displayContent(this._restoDetails);
    } catch (error) {
      this._view.showMessage(error.message);
    }
  }

  _displayContent(content) {
    super._displayContent(content);
    this._view.formSubmitHandler = this._formSubmitHandler;
    this._view.favButtonHandler = this._favButtonHandler;
    this._view.favButtonState(this._isFavoriteResto);
  }

  /**
   *
   * @param {Event} event
   */
  async _onFormSubmit(event) {
    event.preventDefault();

    try {
      this._view.showLoadingInSubmitButton();

      const reviewForm = getElement('#review-form');
      const formData = new FormData(reviewForm);
      const reviewData = {
        id: this._restoDetails.id,
        name: formData.get('name'),
        review: formData.get('review'),
      };

      const response = await this._model.detail.addReview(reviewData);

      this._view.showNewReviews(response);
      reviewForm.reset();
    } catch (error) {
      this._view.showSnackBar(error.message);
    } finally {
      this._view.showLoadingInSubmitButton(false);
    }
  }

  /**
   *
   * @param {Event} event
   */
  async _onFavButtonClick(event) {
    event.stopPropagation();
    const {id, name, description, pictureId, city, rating} = this._restoDetails;

    this._isFavoriteResto ?
      await this._removeFromFavorite(id) :
      await this._addToFavorite({
        id, name, description, pictureId, city, rating,
      });

    this._isFavoriteResto = !this._isFavoriteResto;
    this._view.favButtonState(this._isFavoriteResto);

    if (process.env.NODE_ENV === 'development') {
      getElement('resto-details').dispatchEvent(new Event('fav-btn:updated'));
    }
  }

  async _addToFavorite(restaurant) {
    await this._model.favorite.putResto(restaurant);
    this._view.showSnackBar('Restaurant berhasil ditambahkan ke favorite');

    if (process.env.NODE_ENV === 'development') {
      getElement('resto-details').dispatchEvent(new Event('snackbar:updated'));
    }
  }

  async _removeFromFavorite(id) {
    await this._model.favorite.deleteResto(id);
    this._view.showSnackBar('Restaurant berhasil dihapus dari favorite');

    if (process.env.NODE_ENV === 'development') {
      getElement('resto-details').dispatchEvent(new Event('snackbar:updated'));
    }
  }
}

export default RestoDetailPresenter;
