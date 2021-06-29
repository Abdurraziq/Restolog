import FavoriteRestoIdb from '../../src/scripts/data/favorite-resto-idb';
import RestoDataSource from '../../src/scripts/data/resto-data-source';
import {createElement} from '../../src/scripts/helper';
import RestoDetailPresenter from '../../src/scripts/presenter/resto-details';
import dummyData from './dummy-data';

const initRestoDetailPresenter = async () => {
  spyOn(RestoDataSource, 'getRestoDetail')
      .and.returnValue(dummyData.getRestaurantDetail.restaurant);
  const view = createElement('detail-page');
  const model = {
    detail: RestoDataSource,
    favorite: FavoriteRestoIdb,
  };
  const presenter = new RestoDetailPresenter({view, model});
  document.body.innerHTML = '';
  document.body.appendChild(presenter.view);
  await presenter.showContent();
};

export {initRestoDetailPresenter};
