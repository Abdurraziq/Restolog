/* eslint-disable max-len */
import FavoriteRestoIdb from '../../src/scripts/data/favorite-resto-idb';
import {getElement} from '../../src/scripts/helper';
import dummyData from '../helper/dummy-data';

import '../../src/scripts/view/components/_resto-details';
import '../../src/scripts/view/components/_resto-info';
import '../../src/scripts/view/components/_resto-review';
import '../../src/scripts/view/pages/detail-page';
import {clearIdb} from '../helper/idb-helper';
import {initRestoDetailPresenter} from '../helper/init-presenter';

describe('UnFavoriting A Resto', () => {
  const {id, name, description, pictureId, city, rating} =
      dummyData.getRestaurantDetail.restaurant;

  beforeEach(async () => {
    await FavoriteRestoIdb.putResto({id, name, description, pictureId, city, rating});
    await initRestoDetailPresenter();
  });

  afterEach(async () => {
    await clearIdb();
  });

  describe('When the restaurant has been favorited before', () => {
    it('should display the unfavorited button', async () => {
      const favButtonElement = getElement('#fav-button');
      expect(favButtonElement.textContent)
          .toEqual('×');
      expect(favButtonElement.getAttribute('aria-label'))
          .toEqual('Hapus restaurant ini dari daftar favorite Anda');
      expect(favButtonElement.title)
          .toEqual('Hapus restaurant ini dari daftar favorite Anda');
    });

    it('should not display the favorite button', async () => {
      const favButtonElement = getElement('#fav-button');
      expect(favButtonElement.textContent)
          .not.toEqual('+');
      expect(favButtonElement.getAttribute('aria-label'))
          .not.toEqual('Tambahkan restaurant ini ke daftar favorite Anda');
      expect(favButtonElement.title)
          .not.toEqual('Tambahkan restaurant ini ke daftar favorite Anda');
    });
  });

  describe('When unfavorite button clicked', () => {
    it('should display the favorite button', (done) => {
      const favButtonElement = getElement('#fav-button');
      const testIt = () => {
        expect(favButtonElement.textContent)
            .toEqual('+');
        expect(favButtonElement.getAttribute('aria-label'))
            .toEqual('Tambahkan restaurant ini ke daftar favorite Anda');
        expect(favButtonElement.title)
            .toEqual('Tambahkan restaurant ini ke daftar favorite Anda');
        done();
      };
      getElement('resto-details').addEventListener('fav-btn:updated', testIt);
      favButtonElement.dispatchEvent(new Event('click'));
    });

    it('should show a snackbar to notify the restaurant has been successfully remove from favorites', (done) => {
      const favButtonElement = getElement('#fav-button');
      const testIt = () => {
        expect(getElement('#snackbar').textContent)
            .toEqual('Restaurant berhasil dihapus dari favorite');
        done();
      };
      getElement('resto-details').addEventListener('snackbar:updated', testIt);
      favButtonElement.dispatchEvent(new Event('click'));
    });

    it('should be able to remove favorited resto from the list', (done) => {
      const favButtonElement = getElement('#fav-button');
      const testIt = async () => {
        expect(await FavoriteRestoIdb.getResto(id))
            .toEqual(undefined);
        expect(await FavoriteRestoIdb.getAllResto())
            .toEqual([]);
        done();
      };
      getElement('resto-details').addEventListener('snackbar:updated', testIt);
      favButtonElement.dispatchEvent(new Event('click'));
    });

    it('should not throw error if the unfavorited resto is not in the list', (done) => {
      (async () => {
        await FavoriteRestoIdb.deleteResto(id);
        const favButtonElement = getElement('#fav-button');
        const testIt = async () => {
          expect(await FavoriteRestoIdb.getResto(id))
              .toEqual(undefined);
          expect(await FavoriteRestoIdb.getAllResto())
              .toEqual([]);
          done();
        };
        getElement('resto-details').addEventListener('snackbar:updated', testIt);
        favButtonElement.dispatchEvent(new Event('click'));
      })();
    });
  });
});

