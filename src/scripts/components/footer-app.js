import logo from '../../public/images/logo/logo.svg';

class FooterApp extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.outerHTML = /* html*/`
      <footer>
        <img src="${logo}" alt="" width="48px" height="48px">
        <p>Copyright © 2021 - Restlog</p>
      </footer>`;
  }
}

customElements.define('footer-app', FooterApp);
