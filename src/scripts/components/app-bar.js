import logo from '../../public/images/logo/logo.svg'

class AppBar extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.outerHTML = /*html*/ `
            <header class="app-bar">
                <div class="container">
                    <div>
                        <a href="/" class="app-bar__logo">
                            <img src="${logo}" alt="Logo" width="44px" height="44px">
                            Restlog
                        </a>
                    </div>
                    <button id="menu-btn">☰</button>
                    <nav class="menu">
                        <ul class="menu__list">
                            <li class="menu__item"><a href="/">Home</a></li>
                            <li class="menu__item"><a href="#">Favorite</a></li>
                            <li class="menu__item"><a href="https://raziq-tech.com/about">About Us</a></li>
                        </ul>
                    </nav>
                </div>
            </header>`;
    }
}

customElements.define("app-bar", AppBar);
