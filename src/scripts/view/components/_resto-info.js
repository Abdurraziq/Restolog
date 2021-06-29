import CONFIG from '../../global/config';

class RestoInfo extends HTMLElement {
  set mainInfo(mainInfo) {
    this._mainInfo = mainInfo;
    this._showMainInfo();
  }

  _showMainInfo() {
    const {
      name,
      city,
      address,
      pictureId,
      rating,
      description,
      categories,
      menus,
    } = this._mainInfo;

    const restoCategories = this._createList(categories);
    const restoFoodMenu = this._createList(menus.foods);
    const restodrinksMenu = this._createList(menus.drinks);

    this.innerHTML = /* html*/`
      <article class="description">
        <h1>${name}</h1>
        <div class="desc__content">
          <div class="thumbnail">
            <div class="resto-img">
              <img
                src="${CONFIG.SMALL_BASE_IMAGE_URL}${pictureId}"
                alt="Gambar restaurant ${name}">
            </div>
          </div>
          <p>${description}</p>
        </div>
      </article>
      <section class="info">
        <article class="main-info">
          <h2>Informasi</h2>
          <h3>Alamat</h3>
          <p>${address}</p>
          <h3>Kota</h3>
          <p>${city}</p>
          <h3>Rating</h3>
          <p>${rating}</p>
          <h3>Ketegori Menu</h3>
          <ul>
            ${restoCategories}
          </ul>
        </article>
        <article class="resto-menus">
          <h2>Daftar Menu</h2>
          <div class="menus">
            <div>
              <h3>Makanan</h3>
              <ul>
                ${restoFoodMenu}
              </ul>
            </div>
            <div>
              <h3>Minuman</h3>
              <ul>
                ${restodrinksMenu}
              </ul>
            </div>
          </div>
        </article>
      </section>
    `;
  }

  /**
   * Create list (li) element from items array.
   * @param {Array} items The array of items to iterate over.
   * @return {String} a html list (li).
   */
  _createList(items) {
    let li = ``;
    items.forEach(({name}) => {
      li += /* html */`<li>${name}</li>`;
    });
    return li;
  }
}

customElements.define('resto-info', RestoInfo);
