import * as model from "../model/model.js";
import AddStudentView from "../views/addStudentView.js";
import StudentList from "../views/studentsList.js";
import AddBook from "../views/addBook.js";
import IssuesBook from "../views/issuesBook.js";

const addStudentController = function(data){
  model.insertStudentDetails(data)
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

const addBookController = function(data){
  model.insertBook(data)
}

const issuesBookController = function(){
  return model.state;
}

const mapBookwithStudentController = function(stdId,bookId){
  model.UpdateBooksIssuesToStudents(stdId,bookId)
}
 


function appStart(){
  console.log('app starting')
  //student
  AddStudentView.showStudentForm(addStudentController);
  StudentList.showStudentRecords(studentListController)
  StudentList.bookIssuesToStudent(booksIssuesPerStudentController);

  // book
  AddBook.showBookForm(addBookController)

  IssuesBook.showBookIssueForm(issuesBookController,mapBookwithStudentController);
}

appStart();

