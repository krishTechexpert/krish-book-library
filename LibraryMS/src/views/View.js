export default class View {
  _data;
  
  render(data=false){
    this._data=data;
    const markup = data ? this.generateMarkup(data): this.generateMarkup();
    this.clear();
    this._parentElement.insertAdjacentHTML('afterbegin',markup)
  }
  clear(){
    this._parentElement.innerHTML='';
  }

  makeButtonActive(element){
    Array.from(document.querySelectorAll('.nav-btn')).forEach(element => {
      element.classList.remove('active');
    });
    element.classList.add('active')
  }

  errorMessage(message){
      const markup = `
        <div class="error">
          <p>${message}</p>
        </div>
      `;
      this._parentElement.insertAdjacentHTML('afterbegin',markup);
      message && setTimeout(() => this._parentElement.querySelector('.error')?.remove(),2000)
  }
  resetHTML(Element){
    Element.closest('.mid-content').querySelectorAll(".main-content").forEach(ele => ele.innerHTML='')
  }
}