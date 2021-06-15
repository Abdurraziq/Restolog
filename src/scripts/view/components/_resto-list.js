class RestoList extends HTMLElement {
  connectedCallback() {
    this._renderSkeleton();
  }

  /**
   * @param {Array} restoList An array data to iterate.
   */
  set restoList(restoList) {
    this._renderRestoList(restoList);
  }

  _renderSkeleton() {
    const numberItemSkeleton = 6;
    for (let index = 0; index < numberItemSkeleton; index++) {
      const restoItemElement = document.createElement('resto-item');
      restoItemElement.renderSkeleton();
      this.appendChild(restoItemElement.firstElementChild);
    }
  }

  _renderRestoList(restoList) {
    this.innerHTML = '';
    restoList.forEach((resto) => {
      const restoItemElement = document.createElement('resto-item');
      restoItemElement.restoData = resto;
      this.appendChild(restoItemElement.firstElementChild);
    });
  }
}

customElements.define('resto-list', RestoList);
