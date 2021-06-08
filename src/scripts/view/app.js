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
      const content = new routes[url]();
      const contentElement = content.createElement();

      this._appBar.changeActiveMenuItem(url);
      this._appBar.backgroundHandler(contentElement.isContainHeroElement);

      this._contentContainer.innerHTML = '';
      this._contentContainer.appendChild(contentElement);

      content.showContent();
    }
  }
}

export default App;
