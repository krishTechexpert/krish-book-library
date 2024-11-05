import View from "./View";

class AddStudentView extends View{
  _parentElement = document.getElementById('add-student-container');
  _addStudentButton = document.querySelector('#add-student-btn');

  showStudentForm(addStudentController){
    this._addStudentButton.addEventListener('click',() => {
      this.makeButtonActive(this._addStudentButton)
      this.resetHTML(this._parentElement)
      this.render();
      this.insertNewStudentHandler(addStudentController);
    })
  }

  insertNewStudentHandler(addStudentController){
    this._parentElement.querySelector('#student-form').addEventListener('submit',(e) =>{
      e.preventDefault();
      //console.log(e.target)//= form
      const data = new FormData(e.target);
      let studentObj={};
      for(let [key,value] of data){
        studentObj[key]=value
      }
      studentObj.id='STU'+(Math.floor(Math.random()*100)+1);
      studentObj.maxAllowedBook=10;
      studentObj.assignBooks=[];
      addStudentController(studentObj)
      this.resetInputField();

    })
  }


  generateMarkup(){
  return `<h2>Add New Student</h2>
    <form id="student-form">
        <fieldset> 
          <label for="name">Name:</label>
          <input type="text" placeholder="enter name" id="name" name="name"/>
        </fieldset>
        <fieldset> 
          <label for="class">Class:</label>
          <input type="text" placeholder="enter class" id="class" name="class"/>
        </fieldset>
        <fieldset> 
          <label for="phone">phone:</label>
          <input type="text" placeholder="enter phone" id="phone" name="phone"/>
        </fieldset>
        <fieldset> 
          <label for="address">address:</label>
          <input type="text" placeholder="enter address" id="address" name="address"/>
        </fieldset>
        <button class="btn">Add New Student</button>
      </form>
  `
  }

  resetInputField(){
    this._parentElement.querySelector('#name').value='';
    this._parentElement.querySelector('#class').value='';
    this._parentElement.querySelector('#phone').value='';
    this._parentElement.querySelector('#address').value='';
  }

  
  showBookAssinedPerStudent(){

  }
}

export default new AddStudentView();
