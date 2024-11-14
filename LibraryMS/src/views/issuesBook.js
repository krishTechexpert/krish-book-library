import View from "./View";
class IssuesBook extends View {
  _parentElement=document.querySelector('#issue-book-container');
  _issueBook=document.querySelector('#issue-book-btn');
  _overlay=document.querySelector('.overlay');
  _model=document.querySelector('.model');
  _closedModel=document.querySelector('.closed-btn')
  _mapBookWithStudent;
  
  constructor(){
    super();
      this._closedModel.addEventListener('click', this.toggleWindow.bind(this)); // attach event listener once
      this._overlay.addEventListener('click', this.toggleWindow.bind(this));
      
  }

  showBookIssueForm(issuesBookController,mapBookwithStudentController){
    this._issueBook.addEventListener('click',() => {
      this.makeButtonActive(this._issueBook)
      this.resetHTML(this._parentElement)
      const model =issuesBookController();
      this.render(model);
      this.bookMapToStudents(model,mapBookwithStudentController);
    })
  }

  generateMarkup(model){
    return `<h2>Issue Book To Student</h2>
        <div class="issued-book-form">
          <fieldset> 
            <p for="selectbook">Select Book</p>
            <select id="selectbook">
              <option value="">select</option>
                ${this.showBookList(model.books)}
            </select>
          </fieldset>
          <fieldset> 
            <p for="selectstudent">Select Students</p>
            <select id="selectstudent">
            <option value="">select</option>
              ${this.showStudentList(model.students)}
            </select>
          </fieldset>
        </div>
    <button class="btn issue-btn">Issues Book</button>`
  }
    
  showBookList(books){
    const BookList = books && books.map(book => {
      return `<option value=${book.ISBN}>${book.name}</option>`
    });
    return BookList.join('');
  }

  showStudentList(students){
    const studentList = students && students.map(student => {
      return `<option value=${student.id}>${student.name}</option>`
    });
    return studentList.join('');
  }

  bookMapToStudents(model,mapBookwithStudentController){
    this.selectBook(model.books);
    this.selectStudent(model.students);
    const selectElement=this._parentElement.querySelector('.issue-btn');
    if(selectElement) {
      selectElement.addEventListener('click',() => {
      //  if(!this._mapBookWithStudent) return
        if((this._parentElement.querySelector('#selectbook').value='') || 
          (this._parentElement.querySelector('#selectstudent').value='')){
            return;
          }
        const {stdId:StudentId, bookId} = this._mapBookWithStudent;

        mapBookwithStudentController(StudentId,bookId)
        this._parentElement.querySelector('#selectbook').value='';
        this._parentElement.querySelector('#selectstudent').value='';
        this._parentElement.querySelector('.book-details').remove();
        this._parentElement.querySelector('.student-details').remove();
      })
    }
  }

  selectBook(books){
    const selectElement=this._parentElement.querySelector('#selectbook');
    selectElement.addEventListener('change',(e) =>{
      
    const detailsElement=  this._parentElement.querySelector('.book-details')
      if(detailsElement){
        detailsElement.remove()
      }
      if(e.target.value !==''){
      const booksDetails= books.find(b=> b.ISBN === e.target.value)
       const markup=`<div class="book-details">
        <p><strong>Book Name:</strong>${booksDetails.name}</p>
        <p><strong>Book author:</strong>${booksDetails.author}</p>
        <p><strong>Book ISBN:</strong>${booksDetails.ISBN}</p></div>
      `;
        selectElement.insertAdjacentHTML('afterend',markup);
        this._mapBookWithStudent={bookId:booksDetails.ISBN};
      }
    })
  }

  selectStudent(students){
    const selectElement=this._parentElement.querySelector('#selectstudent');
    selectElement.addEventListener('change',(e) =>{
      
    const detailsElement=  this._parentElement.querySelector('.student-details')
      if(detailsElement){
        detailsElement.remove()
      }
      if(e.target.value !==''){
      const studentDetails= students.find(s=> s.id === e.target.value)
       const markup=`<div class="student-details">
        <p><strong>Student Name:</strong>${studentDetails.name}</p>
        <p><strong>Student Class:</strong>${studentDetails.class}</p>
        <p><strong>Student Id:</strong>${studentDetails.id}</p></div>
      `;
        selectElement.insertAdjacentHTML('afterend',markup);
        this._mapBookWithStudent={...this._mapBookWithStudent,stdId:studentDetails.id};
      }
    })
  }
  bookIssueListModel(student){
    const modelDataTable=this._model.querySelector('.table')
    if(modelDataTable){
      modelDataTable.remove();
    }
    function columndData(){
      let rowsMarkup='';
      if (student && Array.isArray(student.assignBooks)) {
      student.assignBooks.forEach((book,index) => {
        return rowsMarkup += `<tr>
          <td>${index+1}</td>
           <td>${book.name}</td>
            <td>${book.issueDate}</td>
            <td>${book.author}</td>
            <td>${book.publisher}</td>
            <td>${book.ISBN}</td>
        </tr>`
      });
      }
      return rowsMarkup;
    }

    this.addHandlerShowModal()
   const markup = `<div class="table">
    <h2>List of books issued to ${student.name}</h2>
    <table>
      <tr>
        <th>#</th>
        <th>Book Name</th>
        <th>Issued date</th>
        <th>Author</th>
        <th>Publisher</th>
        <th>ISBN</th>
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

export default new IssuesBook();