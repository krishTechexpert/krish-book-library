export const state = {
  students:[],
  books:[]
}

export const insertStudentDetails = function(data){
  state.students.push(data)
  persistStudents(state.students)
}

export const getAllStudenstList=function(){
  return state.students;
}

export const deleteStudent =function(id){
  const studentIndex =state.students.findIndex(row => row.id === id)
  state.students.splice(studentIndex,1)
  persistStudents(state.students)

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
  try{
  const book = bookId && state.books.find(b=>b.ISBN === bookId)
  const student =state.students.find(row => row.id === studentId)
  if(book && student) {

    const alreadyAssignedBook = student.assignBooks && student.assignBooks.some(book => book.ISBN === bookId)
    if(alreadyAssignedBook){
      throw new Error(`${book.name} is already assigned to ${student.name}`)

    }
    
    if(student.maxAllowedBook ==0){
      throw new Error('Only 3 Books allows per student to issue. Please return some of your books to get new one.')
    }

    book.issueDate=new Date().toLocaleDateString();
    student.maxAllowedBook--;
    student.assignBooks.push(book)
    state.students[student.id] = student;
  }
  return student;
}catch(error){
  throw error
  }
}

export const insertBook = function(books){
  state.books.push(books)
  persistBooks(state.books)
}

function persistStudents(students){
  localStorage.setItem('studentsTable',JSON.stringify(students))
}

function persistBooks(books){
  localStorage.setItem('booksTable',JSON.stringify(books))
}

const storage1=localStorage.getItem('studentsTable');
const storage2=localStorage.getItem('booksTable');

if(storage1 && storage2){
  state.students = JSON.parse(storage1);
  state.books=JSON.parse(storage2)
}
