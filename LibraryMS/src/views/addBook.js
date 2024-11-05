import View from "../views/View.js";

class AddBook extends View{
  _parentElement=document.querySelector('#add-book-container');
  _newBook=document.querySelector('#new-book-btn');

  showBookForm(addBookController){
    this._newBook.addEventListener('click',() => {
      this.makeButtonActive(this._newBook)
      this.resetHTML(this._parentElement)
      this.render();
      this.insertNewBookHandler(addBookController);
    })
  }
  generateMarkup(){
    return `<h2>Add New Book</h2>
      <form id="book-form">
          <fieldset> 
            <label for="name">Name:</label>
            <input type="text" placeholder="enter name" id="name" name="name"/>
          </fieldset>
          <fieldset> 
            <label for="author">Author:</label>
            <input type="text" placeholder="enter author" id="author" name="author"/>
          </fieldset>
          <fieldset> 
            <label for="publisher">Publisher:</label>
            <input type="text" placeholder="enter publisher" id="publisher" name="publisher"/>
          </fieldset>
          <fieldset> 
            <label for="ISBN">ISBN:</label>
            <input type="text" placeholder="enter ISBN" id="ISBN" name="ISBN"/>
          </fieldset>
          <button class="btn">Add Book</button>
        </form>
    `
    }
  
    insertNewBookHandler(addBookController){
      this._parentElement.querySelector('#book-form').addEventListener('submit',(e) =>{
        e.preventDefault();
        //console.log(e.target)//= form
        const data = new FormData(e.target);
        let bookObj={};
        for(let [key,value] of data){
          bookObj[key]=value
        }
        bookObj.id='STU'+(Math.floor(Math.random()*100)+1);
        bookObj.maxAllowedBook=10;
        bookObj.assignBooks=[];
        addStudentController(studentObj)
        this.resetInputField();
  
      })
    }
}
export default new AddBook();