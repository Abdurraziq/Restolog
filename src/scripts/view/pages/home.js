import Page from './page';

class HomePage extends Page {
  constructor() {
    super({
      basePageElement: /* html */`
        <hero-element></hero-element>
        <section id="/main-content" class="container">
          <div class="loading"></div>
        </section>
      `,
      contentElement: 'resto-list',
    });
  }

  get isContainHeroElement() {
    return true;
  }

  _showContent() {
    super._showContent();
    this.contentElement.restoList = this._data;
  }
}

customElements.define('home-page', HomePage);
