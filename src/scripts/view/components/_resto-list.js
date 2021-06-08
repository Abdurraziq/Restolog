class RestoList extends HTMLElement {
  /**
   * @param {Array} restoList An array data to iterate.
   */
  set restoList(restoList) {
    this._renderRestoList(restoList);
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
