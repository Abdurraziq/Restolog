import Page from './page';

class FavoritePage extends Page {
  constructor() {
    super({
      basePageElement: /* html */`
        <section id="/main-content" class="container">
          <h1>Daftar Resturant Favorite</h1>
        </section>
      `,
      contentElement: 'resto-list',
    });
  }

  get isHasHeroElement() {
    return false;
  }

  _showContent() {
    this.contentElement.restoList = this._data;
  }
}

customElements.define('favorite-page', FavoritePage);
