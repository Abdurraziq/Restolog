import FavoriteRestoIdb from '../../data/favoriteresto-idb';
import '../pages/favorite';

class Favorite {
  createElement() {
    this.element = document.createElement('favorite-page');
    return this.element;
  }

  async showContent() {
    try {
      const restoList = await FavoriteRestoIdb.getAllResto();
      if (restoList.length > 0) {
        this.element.data = restoList;
      } else {
        this.element.showMessage('Belum ada restaurant yang Anda favoritkan');
      }
    } catch (error) {
      console.error(error);
      this.element.showMessage(error.message);
    }
  }
}

export default Favorite;
