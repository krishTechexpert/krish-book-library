import View from "./View";

class Dashboard extends View{
  _parentElement=document.querySelector('#dashboard-container');
  _dashboardButton =  document.querySelector('#dashboard-btn');

  _overlay=document.querySelector('.overlay');
  _model=document.querySelector('.model');
  _closedModel=document.querySelector('.closed-btn')

  constructor(){
    super();
      this._closedModel.addEventListener('click', this.toggleWindow.bind(this)); // attach event listener once
      this._overlay.addEventListener('click', this.toggleWindow.bind(this));
      
  }

  showBooksRecords(handler){
    this._dashboardButton.addEventListener('click',() => {
      this.makeButtonActive(this._dashboardButton)
      this.resetHTML(this._parentElement)
      const records= handler();
      this.render(records)

    })
  }
  updateStudentRecord(records){
    this.render(records)
  }

  generateMarkup(data){
    let markup=` <h2>Books Details</h2>      
      <table>
        <tr>
          <th>Book Name</th>
          <th>author</th>
          <th>Publisher</th>
          <th>ISBN</th>
          <th>Assigned To</th>
          <th>Delete</th>
        </tr>`;
        
        if(data?.length === 0) {
          return markup + ` <tr>No record found</tr>`;
        }else{
          const result=data.map(book => {
            return `<tr class="student-record">
            <td>${book.name}</td>
            <td>${book.author}</td>
            <td>${book.publisher}</td>
            <td>${book.ISBN}</td>
            <td class="asigned-book" data-stdId-book-asigned="${book.ISBN}">Student</td>
            <td class="delete-book" data-stdId="${book.ISBN}">X</td>
            </tr>`
          })
          return markup  + result.join('')
        }
  }
  bookIssuesToManyStudent(oneBookIssueToManyStudentController){
    this._parentElement.addEventListener('click',function(e){

      const node =e.target.closest('.asigned-book');
        if(!node) return null;
        const bookId=node.dataset.stdidBookAsigned;
        oneBookIssueToManyStudentController(bookId)
      
    })
  }
  deleteStudent(handler){
    this._parentElement.addEventListener('click',function(e){

      const node =e.target.closest('.delete-student');
        if(!node) return null;
        const studentId=node.dataset.stdId;
        handler(studentId)
      
    })
  }

  studentListModel(student){
    const modelDataTable=this._model.querySelector('.table')
    if(modelDataTable){
      modelDataTable.remove();
    }
    function columndData(){
      let rowsMarkup='';
      if (student && Array.isArray(student)) {
      student.forEach((std,index) => {
        return rowsMarkup += `<tr>
          <td>${index+1}</td>
           <td>${std.name}</td>
            <td>${std.id}</td>
            <td>${std.class}</td>
            <td>${std.phone}</td>
            <td>${std.address}</td>
        </tr>`
      });
      }
      return rowsMarkup;
    }

    this.addHandlerShowModal()
   const markup = `<div class="table">
    <h2>Student Information</h2>
    <table>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>ID</th>
        <th>Class</th>
        <th>phone</th>
        <th>Address</th>
      </tr>
      ${columndData()}
      
      
    </table> </div>
   `;

   this._model.insertAdjacentHTML('afterbegin',markup)
    // way2 -- Only add event listeners once without constructor initlialize
    //if (!this._isListenersAdded) {
      //this._closedModel.addEventListener('click', this.toggleWindow.bind(this));
      //this._overlay.addEventListener('click', this.toggleWindow.bind(this));
      //this._isListenersAdded = true; // To avoid adding listeners multiple times
    //}

  }
  toggleWindow(){

    this._overlay.classList.toggle('hidden')
    this._model.classList.toggle('hidden')
  }
  addHandlerShowModal(){
    this.toggleWindow();
    
  }
}
export default new Dashboard();