import View from "./View";
class IssuesBook extends View {
  _parentElement=document.querySelector('#issue-book-container');
  _issueBook=document.querySelector('#issue-book-btn');
  _mapBookWithStudent;
  

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
        const {stdId:StudentId, bookId} = this._mapBookWithStudent
        mapBookwithStudentController(StudentId,bookId)
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
}

export default new IssuesBook();