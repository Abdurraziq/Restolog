class Presenter {
  constructor({view, model}) {
    this._view = view;
    this._model = model;
  }

  get view() {
    return this._view;
  }

  _displayContent(content) {
    this._view.data = content;
  }

  _displayMessage(message) {
    this._view.showMessage(message);
  }
}

export default Presenter;
