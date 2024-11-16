class Model {
  constructor(){
    this._overlay=document.querySelector('.overlay');
    this._model=document.querySelector('.model');
    this._closedModel=document.querySelector('.closed-btn');
    this._initEventListeners();
  }
  _initEventListeners() {
    this._closedModel.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  toggleWindow(){
    this._overlay.classList.toggle('hidden')
    this._model.classList.toggle('hidden')
  }

  
}

export default new Model();