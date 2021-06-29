import routes from '../routes/routes';
import UrlParser from '../routes/url-parser';

class App {
  constructor({appBar, contentContainer}) {
    this._appBar = appBar;
    this._contentContainer = contentContainer;
    this._appShellInit();
  }

  _appShellInit() {
    this._appBar.setMenu([
      {url: '#/', label: 'Home'},
      {url: '#/favorite', label: 'Favorite'},
      {url: 'https://raziq.tech/about', label: 'About Us'},
    ]);
  }

  async renderContent() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    if (url !== '/main-content') {
      window.scrollTo(0, 0);

      const presenter = routes[url]();
      const contentElement = presenter.view;

      this._appBar.changeActiveMenuItem(url);
      this._appBar.background = contentElement.isHasHeroElement;

      this._contentContainer.innerHTML = '';
      this._contentContainer.appendChild(contentElement);
      await presenter.showContent();
    }
  }
}

export default App;
