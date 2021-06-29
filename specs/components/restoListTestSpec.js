/* eslint-disable max-len */
import {getAllElement} from '../../src/scripts/helper';
import '../../src/scripts/view/components/_resto-item';
import '../../src/scripts/view/components/_resto-list';
import dummyData from '../helper/dummy-data';

describe('Resto List Element', () => {
  let restoElement;

  beforeEach(() =>{
    document.body.innerHTML = '<resto-list></resto-list>';
    restoElement = document.querySelector('resto-list');
  });

  describe('When resto list not set yet', () => {
    it('should show skeleton', () => {
      expect(restoElement.querySelector('.skeleton'))
          .toBeTruthy();
    });
  });

  describe('When resto list is set', () => {
    beforeEach(() => {
      restoElement.restoList = dummyData.restaurants;
    });

    it('should remove skeleton', () => {
      expect(restoElement.querySelector('.skeleton'))
          .toBeFalsy();
    });

    it('should show the entire list of restaurants with the correct number', () => {
      const restoItemElements = getAllElement('.resto__item');
      expect(restoItemElements.length)
          .toEqual(dummyData.restaurants.length);
    });

    it('should show all restaurants item content correctly', () => {
      const restoItemElements = getAllElement('.resto__item');
      restoItemElements.forEach((element, index) => {
        const {name, description, rating, city} = dummyData.restaurants[index];
        expect(element.querySelector('.resto__name').textContent)
            .toEqual(name);
        expect(element.querySelector('.resto__description').textContent)
            .toEqual(description);
        expect(element.querySelector('.resto__rating').textContent)
            .toEqual(`⭐ ${rating}`);
        expect(element.querySelector('.resto__city').textContent)
            .toEqual(`🏠 ${city}`);
      });
    });
  });
});
