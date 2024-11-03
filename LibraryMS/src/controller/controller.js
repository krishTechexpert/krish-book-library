import AddStudentView from "../views/addStudentView.js";
import * as model from "../model/model.js";

const addStudentController = function(data){
  model.studentDetails(data)
  console.log("store",model.state)

}



const addStudentButton = document.querySelector('.add-student-btn');
addStudentButton.addEventListener('click',(e) =>{
  // render UI
  AddStudentView.render()
  // Attach the form submission handler
  AddStudentView.insertNewStudentHandler(addStudentController)
})
