class RestoItem extends HTMLElement {
    set data(data) {
        this._data = data;
        this.render();
    }

    render() {
        this.innerHTML = /*html*/`
            <article class="restaurant__item">
                <div class="restaurant__img">
                    <img src="${this._data.pictureId}" alt="Gambar restaurant ${this._data.name}">
                </div>
                <div class="restaurant__content">
                    <p class="restaurant__rating">⭐ ${this._data.rating}</p>
                    <p class="restaurant__city">🏠 ${this._data.city}</p>
                    <a href="#" class="restaurant__title">${this._data.name}</a>
                    <p class="restaurant__description">${this._data.description}</p>
                </div>
            </article>`;
    }
}

customElements.define("resto-item", RestoItem);