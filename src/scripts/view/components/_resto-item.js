import CONFIG from '../../global/config';

class RestoItem extends HTMLElement {
  /**
   * @param {Object} data an Object data to render
   */
  set restoData(data) {
    this._restoData = data;
    this._render();
  }

  renderSkeleton() {
    this.innerHTML = /* html*/`
      <div class="resto__item skeleton">
        <div class="resto__thumbnail">
          <div class="skeleton__body"></div>
        </div>
        <div class="resto__content">
          <div class="skeleton__head"></div>
          <div class="sm skeleton__body"></div>
        </div>
      </div>
    `;
  }

  _render() {
    const {pictureId, name, rating, city, id, description} = this._restoData;
    this.innerHTML = /* html*/`
      <article class="resto__item">
        <div class="resto__thumbnail">
          <img
            class="lazyload"
            data-src="${CONFIG.SMALL_BASE_IMAGE_URL}${pictureId}" 
            alt="Gambar restaurant ${name}">
          <p class="resto__rating">⭐ ${rating}</p>
          <p class="resto__city">🏠 ${city}</p>
        </div>
        <div class="resto__content">
          <a href="/#/detail/${id}"
            class="resto__name">${name}</a>
          <p class="resto__description">${description}</p>
        </div>
      </article>
    `;
  }
}

customElements.define('resto-item', RestoItem);
