import {createElement, getElement} from '../../helper';
import Page from './page';

class DetailPage extends Page {
  constructor() {
    super({
      basePageElement: /* html */`
        <section id="/main-content" class="container"></section>
      `,
      contentElement: 'resto-details',
    });
  }

  get isHasHeroElement() {
    return false;
  }

  _showContent() {
    this.contentElement.details = this._data;
  }

  /**
   * @param {EventListenerOrEventListenerObject} formSubmitHandler
   */
  set formSubmitHandler(formSubmitHandler) {
    this._formSubmitHandler = formSubmitHandler;
    this._createFormSubmitHandler();
  }

  _createFormSubmitHandler() {
    const reviewForm = getElement('#review-form');
    reviewForm.addEventListener('submit', this._formSubmitHandler);
  }

  /**
   * @param {EventListenerOrEventListenerObject} favButtonHandler
   */
  set favButtonHandler(favButtonHandler) {
    this._favButtonHandler = favButtonHandler;
    this._createFavButtonHandler();
  }

  _createFavButtonHandler() {
    const favButton = getElement('#fav-button');
    favButton.addEventListener('click', this._favButtonHandler);
  }

  /**
   *
   * @param {boolean} isShown
   */
  showLoadingInSubmitButton(isShown = true) {
    const loadingIndicator = getElement('.btn__loading');
    loadingIndicator.style.display = isShown ? 'inline-block' : 'none';
  }

  /**
   *
   * @param {Object} customerReviews
   */
  showNewReviews(customerReviews) {
    const restoReviewElement = getElement('resto-review');
    restoReviewElement.reRenderReviewElement(customerReviews);
  }

  /**
   *
   * @param {boolean} isFavorited
   */
  favButtonState(isFavorited) {
    const detailElement = getElement('resto-details');
    detailElement.favButtonState = isFavorited;
  }

  /**
   *
   * @param {string} message
   */
  showSnackBar(message) {
    const messageElement = createElement('div');
    messageElement.id = 'snackbar';
    messageElement.textContent = message;
    this.appendChild(messageElement);
    messageElement.className = 'show';
    setTimeout(() => {
      messageElement.classList.remove('show');
      messageElement.remove();
    }, 3000);
  }
}

customElements.define('detail-page', DetailPage);
