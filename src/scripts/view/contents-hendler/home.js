import RestoDataSource from '../../data/resto-data-source';
import '../pages/home';

class Home {
  createElement() {
    this.element = document.createElement('home-page');
    return this.element;
  }

  async showContent() {
    try {
      const restoList = await RestoDataSource.restaurantList();
      this.element.data = restoList;
    } catch (error) {
      console.error(error);
      this.element.showMessage(error.message);
    }
  }
}

export default Home;
