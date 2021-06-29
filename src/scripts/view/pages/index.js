import RestoListPresenter from '../../presenter/resto-list';
import RestoDetailPresenter from '../../presenter/resto-details';

import RestoDataSource from '../../data/resto-data-source';
import FavoriteRestoIdb from '../../data/favorite-resto-idb';

import {createElement} from '../../helper';

// Pages entry
import './home-page';
import './detail-page';
import './favorite-page';


const home = () => {
  return new RestoListPresenter({
    view: createElement('home-page'),
    model: RestoDataSource,
  });
};

const favorite = () => {
  return new RestoListPresenter({
    view: createElement('favorite-page'),
    model: FavoriteRestoIdb,
  });
};

const detail = () => {
  return new RestoDetailPresenter({
    view: createElement('detail-page'),
    model: {
      detail: RestoDataSource,
      favorite: FavoriteRestoIdb,
    },
  });
};

export {home, favorite, detail};
