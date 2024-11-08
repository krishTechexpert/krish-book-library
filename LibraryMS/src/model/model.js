export const state = {
  students:[],
  books:[]
}

export const insertStudentDetails = function(data){
  state.students.push(data)
  localStorage.setItem('studentsTable',JSON.stringify(state.students))
}

export const getAllStudenstList=function(){
  return state.students;
}

export const booksIssuesToStudents=function(studentId){
  
  const student =state.students.find(row => row.id === studentId)
  if(student.assignBooks.length ===0){
    throw new Error('No books assiged yet')
  }else {
    const studentWithBooks = UpdateBooksIssuesToStudents(student.id)
    return studentWithBooks
  }
}

export const UpdateBooksIssuesToStudents=function(studentId,bookId=''){

  const book = bookId && state.books.find(b=>b.ISBN === bookId)
  const student =state.students.find(row => row.id === studentId)
  if(book && student) {
    book.issueDate=new Date().toLocaleDateString();
    student.assignBooks.push(book)
    state.students[student.id] = student;
  }
  return student;
  
}

export const insertBook = function(books){
  state.books.push(books)
  localStorage.setItem('booksTable',JSON.stringify(state.books))
}

const storage1=localStorage.getItem('studentsTable');
const storage2=localStorage.getItem('booksTable');

if(storage1 && storage2){
  state.students = JSON.parse(storage1);
  state.books=JSON.parse(storage2)
}
