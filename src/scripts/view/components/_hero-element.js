class HeroElement extends HTMLElement {
  connectedCallback() {
    this._render();
  }

  _render() {
    this.outerHTML = /* html*/ `
      <div id="hero">
        <h1 class="hero__heading">Restlog</h1>
        <p class="hero__subheading">Restaurant Catalog</p>
        <p class="hero__tagline">Jelajahi berbagai cita rasa Restaurant dalam
          satu katalog komprehensif</p>
      </div>
    `;
  }
}

customElements.define('hero-element', HeroElement);
