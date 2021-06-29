import {createElement, getElement} from '../../helper';

class Page extends HTMLElement {
  constructor({basePageElement, contentElement}) {
    super();
    this._basePageElement = basePageElement;
    this._contentElement = contentElement;
  }

  connectedCallback() {
    this._render();
    this.contentElement = createElement(this._contentElement);
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
    this._contentContainer = getElement('section.container');
  }

  /**
   * Show an error message
   * @param {string} message Error message to shown.
   */
  showMessage(message) {
    this._contentContainer.innerHTML = /* html*/`
      <div class="message">
        <p class="message__heading">Upss.. 😢</p>
        <p class="message__content">${message}</p>
      </div>
    `;
  }
}

export default Page;
