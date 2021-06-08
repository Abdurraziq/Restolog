class RestoDetails extends HTMLElement {
  /**
   * @param {Object} details
   */
  set details(details) {
    this._details = details;
    this._render();
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

    const mainInfoElement = document.createElement('resto-info');
    this.appendChild(mainInfoElement);

    const reviewElement = document.createElement('resto-review');
    this.appendChild(reviewElement);

    this._favButton = document.createElement('button');
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
   * @param {boolean} isLiked
   */
  set favButtonState(isLiked) {
    const icon = isLiked ? '×' : '+';
    const ariaLabel = isLiked ?
      'Hapus restaurant ini dari daftar favorite Anda' :
      'Tambahkan restaurant ini ke daftar favorite Anda';

    this._favButton.textContent = icon;
    this._favButton.ariaLabel = ariaLabel;
  }
}

customElements.define('resto-details', RestoDetails);
