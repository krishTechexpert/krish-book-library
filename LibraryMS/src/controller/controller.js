import * as model from "../model/model.js";
import AddStudentView from "../views/addStudentView.js";
import StudentList from "../views/studentsList.js";
import AddBook from "../views/addBook.js";

const addStudentController = function(data){
  model.studentDetails(data)
  console.log("store",model.state)
}

const studentListController = function(){
  const students=model.getAllStudenstList();
  return students;
}

const booksIssuesPerStudentController = function(stdId){
  try{
    model.booksIssuesToStudents(stdId)

  }catch(error){
    StudentList.errorMessage(error.message)
  }
}

const addBookController = function(){

}

function appStart(){
  console.log('app starting...')
  //student
  AddStudentView.showStudentForm(addStudentController);
  StudentList.showStudentRecords(studentListController)
  StudentList.bookIssuesToStudent(booksIssuesPerStudentController);

  // book
  AddBook.showBookForm(addBookController)
}

appStart();

