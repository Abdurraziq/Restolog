import Presenter from './presenter';

class RestoListPresenter extends Presenter {
  constructor({view, model}) {
    super({view: view, model: model});
  }

  async showContent() {
    try {
      const allRestoList = await this._model.getAllResto();
      allRestoList.length > 0 ?
        this._displayContent(allRestoList) :
        this._displayMessage('Daftar restaurant kosong');
    } catch (error) {
      this._displayMessage(error.message);
    }
  }
}

export default RestoListPresenter;
