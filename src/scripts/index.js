import 'regenerator-runtime';
import '../styles/style.scss';

import './components/app-bar';
import './components/hero-element';
import './components/resto-list';
import './components/footer-app';


document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('#menu-btn');
  const body = document.querySelector('body');
  const header = document.querySelector('.app-bar');

  let isMenuOpen = false;

  const headerBackgroundEvent = () => {
    window.pageYOffset > 320 ?
      header.classList.add('background') :
      header.classList.remove('background');
  };

  headerBackgroundEvent();

  menuBtn.addEventListener('click', (event) => {
    isMenuOpen = !isMenuOpen;
    menuBtn.textContent = isMenuOpen ? '⨉' : '☰';
    header.classList.toggle('menu__open');
    body.classList.toggle('hideoverflow');
    event.stopPropagation();
  });

  window.addEventListener('scroll', () => {
    headerBackgroundEvent();
  });
});
