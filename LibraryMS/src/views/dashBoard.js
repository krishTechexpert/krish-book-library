import View from "./View";
import Modal from "./popup"
class Dashboard extends View{
  _parentElement=document.querySelector('#dashboard-container');
  _dashboardButton =  document.querySelector('#dashboard-btn');

  showBooksRecords(dashBoardController){
    this._dashboardButton.addEventListener('click',() => {
      this.makeButtonActive(this._dashboardButton)
      this.resetHTML(this._parentElement)
      const records= dashBoardController();
      this.render(records)

    })
  }
  updateDashboard(records){
    this.render(records)
  }

  generateMarkup(data){
    console.log(data)
    if (!data || data.length === 0) {
      return `<h2>Books Details</h2><table><tr><td>No record found</td></tr></table>`;
    }

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
        const result=data.map(book => {
            return `<tr class="student-record">
            <td>${book.name}</td>
            <td>${book.author}</td>
            <td>${book.publisher}</td>
            <td>${book.ISBN}</td>
            <td class="asigned-book" data-stdId-book-asigned="${book.ISBN}">Student</td>
            <td class="delete-book" data-bookId="${book.ISBN}">X</td>
            </tr>`
          })
          return markup  + result.join('')
    }

  bookIssuesToManyStudent(oneBookIssueToManyStudentController){
    this._parentElement.addEventListener('click',function(e){

      const node =e.target.closest('.asigned-book');
        if(!node) return null;
        const bookId=node.dataset.stdidBookAsigned;
        oneBookIssueToManyStudentController(bookId)
      
    })
  }
  deleteBook(deleteBookController){
    this._parentElement.addEventListener('click',function(e){

      const node =e.target.closest('.delete-book');
        if(!node) return null;
        const bookId=node.dataset.bookid;
        deleteBookController(bookId)
      
    })
  }

  studentListModel(student){
    const modelDataTable=Modal._model.querySelector('.table')
    if(modelDataTable){
      modelDataTable.remove();
    }
    function columndData(){
      let rowsMarkup='';
      if(student == undefined){
        return rowsMarkup = `<tr><td>No record found</td></tr>`
     }
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

   Modal._model.insertAdjacentHTML('afterbegin',markup)
   Modal.toggleWindow();

    // way2 -- Only add event listeners once without constructor initlialize
    //if (!this._isListenersAdded) {
      //this._closedModel.addEventListener('click', this.toggleWindow.bind(this));
      //this._overlay.addEventListener('click', this.toggleWindow.bind(this));
      //this._isListenersAdded = true; // To avoid adding listeners multiple times
    //}

  }
  
  
}
export default new Dashboard();