class Page extends HTMLElement {
  constructor({basePageElement, contentElement}) {
    super();
    this._basePageElement = basePageElement;
    this._contentElement = contentElement;
  }

  connectedCallback() {
    this._render();
    this.contentElement = document.createElement(this._contentElement);
    this._contentContainer.appendChild(this.contentElement);
  }

  /**
   * @param {Object} data
   */
  set data(data) {
    this._data = data;
    this._showContent();
  }

  _render() {
    this.innerHTML = this._basePageElement;
    this._contentContainer = this.querySelector('section.container');
  }

  /**
   * Show an error message
   * @param {string} message Error message to shown.
   */
  showMessage(message) {
    this._contentContainer.innerHTML = /* html*/`
      <div class="error">
        <p class="error__heading">Upss.. 😢</p>
        <p>${message}</p>
      </div>
    `;
  }
}

export default Page;
