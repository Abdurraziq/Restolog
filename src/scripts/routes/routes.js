import {detail, favorite, home} from '../view/pages';

const routes = {
  '/': home,
  '/detail/:id': detail,
  '/favorite': favorite,
};

export default routes;
