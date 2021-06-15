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

  get isContainHeroElement() {
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
    const reviewForm = this.querySelector('#review-form');
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
    const favButton = document.querySelector('#fav-button');
    favButton.addEventListener('click', this._favButtonHandler);
  }

  /**
   *
   * @param {boolean} isShown
   */
  showLoadingOnFormSubmit(isShown = true) {
    const loadingIndicator = document.querySelector('.btn__loading');
    loadingIndicator.style.display = isShown ? 'inline-block' : 'none';
  }

  /**
   *
   * @param {Object} customerReviews
   */
  showNewReviews(customerReviews) {
    const restoReviewElement = document.querySelector('resto-review');
    restoReviewElement.reRenderReviewElement(customerReviews);
  }

  /**
   *
   * @param {boolean} isLiked
   */
  changeFavButton(isLiked) {
    const detailElement = document.querySelector('resto-details');
    detailElement.favButtonState = isLiked;
  }

  /**
   *
   * @param {string} message
   */
  showSnackBar(message) {
    const messageElement = document.createElement('div');
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
