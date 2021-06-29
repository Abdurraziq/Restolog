import {getAllElement} from '../../src/scripts/helper';
import '../../src/scripts/view/components/_app-bar';
import dummyData from '../helper/dummy-data';

describe('App-bar Element', () => {
  const appBarElement = document.createElement('app-bar');

  beforeAll(() => {
    document.body.appendChild(appBarElement);
  });

  describe('When a page have hero element', () => {
    it('should not have background', () => {
      appBarElement.background = true;
      expect(appBarElement.classList.contains('background'))
          .toBeFalsy();
    });
  });

  describe('When a page not have hero element', () => {
    it('should have background', () => {
      appBarElement.background = false;
      expect(appBarElement.classList.contains('background'))
          .toBeTruthy();
    });
  });

  describe('When menu is set', () => {
    let allMenuItemElement;
    let menuButton;

    beforeAll(() => {
      appBarElement.setMenu(dummyData.menus);
      allMenuItemElement = getAllElement('.menu__item');
      menuButton = document.querySelector('#menu-btn');
    });

    describe('Menu element', () => {
      it('should show menu item correctly', () => {
        // Number of Menu item
        expect(allMenuItemElement.length)
            .toEqual(dummyData.menus.length);

        // Label and url
        allMenuItemElement.forEach((menuItem, index) => {
          const anchorElement = menuItem.children[0];
          expect(anchorElement.text)
              .toEqual(dummyData.menus[index].label);
          expect(anchorElement.getAttribute('href'))
              .toEqual(dummyData.menus[index].url);
        });
      });

      it('should show active indicator only on menu that has been set', () => {
        dummyData.menus.forEach(({url}, menuIndex) => {
          appBarElement.changeActiveMenuItem(url.substring(1));
          allMenuItemElement.forEach((element, elementIndex) => {
            if (menuIndex === elementIndex) {
              expect(element.className)
                  .toEqual('menu__item active');
            } else {
              expect(element.className)
                  .toEqual('menu__item');
            }
          });
        });
      });
    });

    describe('Menu button', () =>{
      it('should toggle (show/hide) menu', () => {
        menuButton.dispatchEvent(new Event('click'));
        expect(menuButton.textContent )
            .toEqual('⨉');
        expect(appBarElement.classList.contains('menu__open'))
            .toBeTruthy();

        menuButton.dispatchEvent(new Event('click'));
        expect(menuButton.textContent )
            .toEqual('☰');
        expect(appBarElement.classList.contains('menu__open'))
            .toBeFalsy();
      });
    });
  });
});
