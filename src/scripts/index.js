import 'regenerator-runtime';
import '../styles/style.scss';
import './view/components';
import App from './view/app';
import {swRegister} from './helper';

const app = new App({
  appBar: document.querySelector('app-bar'),
  contentContainer: document.querySelector('#content'),
});

window.addEventListener('load', () => {
  app.renderContent();
  swRegister();
});

window.addEventListener('hashchange', () => {
  app.renderContent();
});
