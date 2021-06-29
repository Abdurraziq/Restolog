/* eslint-disable max-len */
import FavoriteRestoIdb from '../../src/scripts/data/favorite-resto-idb';
import itActsAsFavoriteRestoModel from '../contract/favoriteRestoContract';
import {clearIdb} from '../helper/idb-helper';

describe('Favorite Resto Idb Contract Test Implementation', () => {
  afterEach(async () => {
    await clearIdb();
  });

  itActsAsFavoriteRestoModel(FavoriteRestoIdb);
});
