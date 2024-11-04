import AddStudentView from "../views/addStudentView.js";
import * as model from "../model/model.js";

const addStudentController = function(data){
  model.studentDetails(data)
  console.log("store",model.state)

}


// add new student
const addStudentButton = document.querySelector('.add-student-btn');
addStudentButton.addEventListener('click',(e) =>{
  document.querySelector('#student-list').innerHTML='';
  // render UI
  AddStudentView.render()
  // Attach the form submission handler
  AddStudentView.insertNewStudentHandler(addStudentController)
})

//show student list
const studentList =  document.querySelector('#view-student-list');
studentList.addEventListener('click',function(){
  AddStudentView.listMarkup(model.state.students)
})
//click on book to check how many students take books
const allStudentsList=document.querySelector('#student-list');