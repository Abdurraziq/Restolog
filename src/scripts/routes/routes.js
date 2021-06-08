import {Favorite, Home, Detail} from '../view/contents-hendler';

const routes = {
  '/': Home,
  '/detail/:id': Detail,
  '/favorite': Favorite,
};

export default routes;
