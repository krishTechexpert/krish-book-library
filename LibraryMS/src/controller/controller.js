import * as model from "../model/model.js";
import AddStudentView from "../views/addStudentView.js";
import StudentList from "../views/studentsList.js";
import AddBook from "../views/addBook.js";
import IssuesBook from "../views/issuesBook.js";
import Dashboard from "../views/dashBoard.js";
import dashBoard from "../views/dashBoard.js";

const addStudentController = function(data){
  model.insertStudentDetails(data)
}

const studentListController = function(){
  const students=model.getAllStudenstList();
  return students;
}

const deleteStudentController = function(id){
  model.deleteStudent(id)
  StudentList.updateStudentRecord(model.state.students)
}

// list of individual books that students got it.
const StudentIssuesBookListController = function(stdId){
  try{
    const student = model.studentIssuedBookList(stdId);
    IssuesBook.bookIssueListModel(student)

  }catch(error){
    console.log(error)
    StudentList.errorMessage(error.message)
  }
}

const addBookController = function(data){
  model.insertBook(data)
}

const issuesBookController = function(){
  return model.state;
}

// 1 book to many students
const mapBookwithStudentController = function(stdId,bookId){
  try{
    model.singleBookIssuedToMultipleStudents(stdId,bookId)
  }catch(error){
    console.log(error)
    StudentList.errorMessage(error.message)
  }

}


const dashBoardController = function(){
  return model.state.books
}

const oneBookIssueToManyStudentController = function(bookId){
  const studentList =model.dashboard(bookId)
  dashBoard.studentListModel(studentList);
  //return studentList;
}
 
const deleteBookController = function(bookId){
  model.deleteBook(bookId)
  Dashboard.updateDashboard(model.state.books)
}


function appStart(){
  console.log('app starting')
  //student
  AddStudentView.showStudentForm(addStudentController);
  StudentList.showStudentRecords(studentListController)
  StudentList.bookIssuesToStudent(StudentIssuesBookListController);
  StudentList.deleteStudent(deleteStudentController)
  // book
  AddBook.showBookForm(addBookController)

  // issued book
  IssuesBook.showBookIssueForm(issuesBookController,mapBookwithStudentController);

  //dashboard
  Dashboard.showBooksRecords(dashBoardController)
  Dashboard.bookIssuesToManyStudent(oneBookIssueToManyStudentController)
  Dashboard.deleteBook(deleteBookController)
}

appStart();

window.addEventListener('DOMContentLoaded',function(){
  Dashboard.render(model.state.books)

})