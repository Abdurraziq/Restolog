import {createElement} from '../../helper';

class RestoDetails extends HTMLElement {
  connectedCallback() {
    this._renderSkeleton();
  }

  /**
   * @param {Object} details
   */
  set details(details) {
    this._details = details;
    this._render();
  }

  _renderSkeleton() {
    this.innerHTML = /* html */`
      <div class="description skeleton">
        <div class="skeleton__head"></div>
        <div class="desc__content">
          <div class="skeleton__body"></div>
          <div class="skeleton__body"></div>
        </div>
      </div>
      
      <div class="info">
        <div class="main-info">
          <div class="skeleton__head"></div>
          <div class="skeleton__body"></div>
        </div>
        <div class="resto-menus">
          <div class="skeleton__head"></div>
          <div class="menus">
            <div class="skeleton__body"></div>
            <div class="skeleton__body"></div>
          </div>
        </div>
      </div>
    `;
  }

  _render() {
    const {
      name,
      description,
      city,
      address,
      pictureId,
      categories,
      menus,
      rating,
      customerReviews,
    } = this._details;

    this.innerHTML = '';

    const mainInfoElement = createElement('resto-info');
    this.appendChild(mainInfoElement);

    const reviewElement = createElement('resto-review');
    this.appendChild(reviewElement);

    this._favButton = createElement('button');
    this._favButton.id = 'fav-button';
    this.appendChild(this._favButton);

    mainInfoElement.mainInfo = {
      name,
      city,
      address,
      pictureId,
      rating,
      description,
      categories,
      menus,
    };

    reviewElement.reviews = customerReviews;
  }

  /**
   * Set favorite button state
   * @param {boolean} isFavorited
   */
  set favButtonState(isFavorited) {
    const icon = isFavorited ? '×' : '+';
    const label = isFavorited ?
      'Hapus restaurant ini dari daftar favorite Anda' :
      'Tambahkan restaurant ini ke daftar favorite Anda';

    this._favButton.textContent = icon;
    this._favButton.ariaLabel = label;
    this._favButton.title = label;
  }
}

customElements.define('resto-details', RestoDetails);
