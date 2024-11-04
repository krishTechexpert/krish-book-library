import View from "./View";

class AddStudentView extends View{
  _parentElement = document.getElementById('add-student');
  _list = document.getElementById('student-list');
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
      this._data=studentObj;
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

  listMarkup(data){
    if(data.length === 0) return null;
    const markup=` <h2>Students List</h2>      
      <table>
        <tr>
          <th>Name</th>
          <th>StudentId</th>
          <th>Phone</th>
          <th>Address</th>
          <th>Class</th>
          <th>Assigned Books</th>
        </tr>
       ${data.map(std => {
          return `<tr class="student-record">
          <td>${std.name}</td>
          <td>${std.id}</td>
          <td>${std.phone}</td>
          <td>${std.address}</td>
          <td>${std.class}</td>
          <td class="asigned-book">Books</td>
          </tr>`
        })}
      </table>`
    this._parentElement.innerHTML='';
    document.querySelector('#student-list').innerHTML=markup;
  }
  showBookAssinedPerStudent(){

  }
}

export default new AddStudentView();
