import './resto-item';
import jsonData from '../../DATA.json'

class RestoList extends HTMLElement {
    connectedCallback() {
        fetch(`${jsonData}`)
            .then(response => {
                return response.json()
            })
            .then(responseJson => {
                if(responseJson.restaurants) {
                    this._data = responseJson.restaurants;
                    this.render();
                }
            })
    }

    render() {
        const catalogElement = document.createElement("section");
        const restoListElement = document.createElement("div");

        catalogElement.id = "catalog";
        restoListElement.className = "restaurant__list";

        catalogElement.innerHTML = `<h2 class="section__title">Daftar Restaurant</h2>`;

        this._data.forEach(resto => {
            const restoItemElement = document.createElement("resto-item");
            restoItemElement.data =  resto;
            restoListElement.appendChild(restoItemElement.firstElementChild);
        });
        
        catalogElement.appendChild(restoListElement);
        this.outerHTML = catalogElement.outerHTML;
    }
}

customElements.define("resto-list", RestoList);