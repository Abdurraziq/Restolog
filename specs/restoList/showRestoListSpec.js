/* eslint-disable max-len */
import RestoDataSource from '../../src/scripts/data/resto-data-source';
import {createElement, getElement, getAllElement} from '../../src/scripts/helper';
import dummyData from '../helper/dummy-data';
import RestoListPresenter from '../../src/scripts/presenter/resto-list';

import '../../src/scripts/view/pages/home-page';
import '../../src/scripts/view/components/_resto-list';
import '../../src/scripts/view/components/_resto-item';


describe('Resto List Presenter', () => {
  const initWithData = async (data) => {
    spyOn(RestoDataSource, 'getAllResto').and.returnValue(data);
    const view = createElement('home-page');
    const model = RestoDataSource;
    const presenter = new RestoListPresenter({view, model});

    document.body.innerHTML = '';
    document.body.appendChild(presenter.view);
    await presenter.showContent();
  };

  describe('When resto list is not empty', () => {
    beforeEach(async () => {
      await initWithData(dummyData.restaurants);
    });

    it('should call the model to get all resto list', () => {
      expect(RestoDataSource.getAllResto).toHaveBeenCalledTimes(1);
    });

    it('should show the entire list of restaurants with the correct number', () => {
      expect(getAllElement('.resto__item').length)
          .toEqual(dummyData.restaurants.length);
    });

    it('should show all restaurants list content correctly', () => {
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

  describe('When resto list is empty', () => {
    beforeEach(async () => {
      await initWithData([]);
    });

    it('should call the model to get all resto list', () => {
      expect(RestoDataSource.getAllResto).toHaveBeenCalledTimes(1);
    });

    it('should show the information that empty restaurant list', () => {
      const messageElement = getElement('.message');
      expect(messageElement.children[0].textContent)
          .toEqual('Upss.. 😢');
      expect(messageElement.children[1].textContent)
          .toEqual('Daftar restaurant kosong');
    });

    it('should not show restaurant list', () => {
      expect(getElement('article.resto__item'))
          .toBeFalsy();
    });
  });
});

