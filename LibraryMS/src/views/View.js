export default class View {
  _data;
  render(data){
    this._data=data;
    const markup = this.generateMarkup();
    this.clear();
    this._parentElement.insertAdjacentHTML('afterbegin',markup)
  }
  clear(){
    this._parentElement.innerHTML='';

  }
}