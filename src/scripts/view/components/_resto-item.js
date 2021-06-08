import CONFIG from '../../globals/config';

class RestoItem extends HTMLElement {
  /**
   * @param {Object} data an Object data to render
   */
  set restoData(data) {
    this._restoData = data;
    this._render();
  }

  _render() {
    const {pictureId, name, rating, city, id, description} = this._restoData;
    this.innerHTML = /* html*/`
      <article class="restaurant__item">
        <div class="restaurant__thumbnail">
          <img src="${CONFIG.SMALL_BASE_IMAGE_URL}${pictureId}" 
            alt="Gambar restaurant ${name}">
          <p class="restaurant__rating">⭐ ${rating}</p>
          <p class="restaurant__city">🏠 ${city}</p>
        </div>
        <div class="restaurant__content">
          <a href="/#/detail/${id}"
            class="restaurant__title">${name}</a>
          <p class="restaurant__description">${description}</p>
        </div>
      </article>
    `;
  }
}

customElements.define('resto-item', RestoItem);
