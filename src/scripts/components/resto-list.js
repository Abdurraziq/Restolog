import './resto-item';
import jsonData from '../../DATA.json';

class RestoList extends HTMLElement {
  connectedCallback() {
    this.showLoadingAnimation();
    fetch(`${jsonData}`)
        .then((response) => {
          return response.json();
        })
        .then((responseJson) => {
          if (responseJson.restaurants) {
            this._data = responseJson.restaurants;
            this.render();
          }
        });
  }

  showLoadingAnimation() {
    this.innerHTML = /* html*/`
            <div class="loading"></div>`;
  }

  render() {
    this.innerHTML = '';
    const catalogElement = document.createElement('section');
    const restoListElement = document.createElement('div');

    catalogElement.id = 'catalog';
    restoListElement.className = 'restaurant__list';

    this._data.forEach((resto) => {
      const restoItemElement = document.createElement('resto-item');
      restoItemElement.data = resto;
      restoListElement.appendChild(restoItemElement.firstElementChild);
    });

    catalogElement.appendChild(restoListElement);
    this.outerHTML = catalogElement.outerHTML;
  }
}

customElements.define('resto-list', RestoList);
