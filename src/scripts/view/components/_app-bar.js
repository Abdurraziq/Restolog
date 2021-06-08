import logo from '../../../public/images/icons/logo.svg';

class AppBar extends HTMLElement {
  constructor() {
    super();
    this._isMenuDisplayed = false;
    this._menuItemClickHandler = this._onMenuItemClick.bind(this);
    this._pageScrollHendler = this._onPageScroll.bind(this);
  }

  connectedCallback() {
    this._render();
  }

  _render() {
    this.innerHTML = /* html*/ `
      <div class="container">
        <div>
          <a href="/" class="app-bar__logo">
            <img src="${logo}" alt="Logo" width="27px" height="27px">
            <span>Restlog</span>
          </a>
        </div>
        <button id="menu-btn" aria-label="Tampilkan Menu">☰</button>
        <nav class="menu">
          <ul class="menu__list"></ul>
        </nav>
      </div>
    `;
  }

  /**
   * Create menus based on menuList array
   * @param {Array} menuList
   */
  setMenu(menuList) {
    const menuListElement = this.querySelector('.menu__list');
    menuList.forEach(({url, label}) => {
      const menuItemElement = /* html*/ `
        <li class="menu__item">
          <a href="${url}">${label}</a>
        </li>
      `;
      menuListElement.insertAdjacentHTML('beforeend', menuItemElement);
    });
    this._initAppBar();
  }

  _initAppBar() {
    this._bodyElement = document.querySelector('body');
    this._menuButton = this.querySelector('#menu-btn');
    this._menuItems = this.querySelectorAll('.menu__item');

    this._menuButton.addEventListener('click', (event) => {
      event.stopPropagation();
      this._menuHandler();
    });
  }

  _menuHandler() {
    this._isMenuDisplayed = !this._isMenuDisplayed;
    this._toggleMenu();
    this._toggleBodyOverflow();
    this._isMenuDisplayed ?
      this._addMenuItemsListener():
      this._removeMenuItemsListener();
  }

  _toggleMenu() {
    this._menuButton.textContent = this._isMenuDisplayed ? '⨉' : '☰';
    this.classList.toggle('menu__open');
  }

  /**
   * Digunakan untuk menyembunyikan scrollbar dan mencegah halaman terscroll
   * saat menu ditampilkan.
   */
  _toggleBodyOverflow() {
    this._bodyElement.classList.toggle('hideoverflow');
  }

  _addMenuItemsListener() {
    this._menuItems.forEach((menuItem) => {
      menuItem.addEventListener('click', this._menuItemClickHandler);
    });
  }

  _removeMenuItemsListener() {
    this._menuItems.forEach((menuItem) => {
      menuItem.removeEventListener('click', this._menuItemClickHandler);
    });
  }

  /**
   * Menu Item Click Handler:
   * @param {Event} event
   */
  _onMenuItemClick(event) {
    event.stopPropagation();
    this._hideMenu();
  }

  _hideMenu() {
    if (this._isMenuDisplayed) {
      this._menuHandler();
    }
  }

  /**
   * Change active menu indicator based on Url.
   * @param {string} url
   */
  changeActiveMenuItem(url) {
    const activeMenu = this.querySelector('.menu__item.active');
    const menuToActivate = this.querySelector(`[href="#${url}"]`);

    activeMenu?.classList.remove('active');
    menuToActivate?.parentElement.classList.add('active');
    this._hideMenu();
  }

  /**
   * Methode for add or remove background in AppBar.
   * @param {boolean} isContainHeroElement
   */
  backgroundHandler(isContainHeroElement) {
    if (isContainHeroElement) {
      this._removeAppBarBackground();
      window.addEventListener('scroll', this._pageScrollHendler);
    } else {
      window.removeEventListener('scroll', this._pageScrollHendler);
      this._addBackgroundToAppBar();
    }
  }

  _onPageScroll() {
    const HERO_ELEMENT_HEIGHT = 320;
    const pagePostion = window.pageYOffset;

    pagePostion > HERO_ELEMENT_HEIGHT ?
      this._addBackgroundToAppBar() :
      this._removeAppBarBackground();
  }

  _addBackgroundToAppBar() {
    this.classList.add('background');
  }

  _removeAppBarBackground() {
    this.classList.remove('background');
  }
}

customElements.define('app-bar', AppBar);
