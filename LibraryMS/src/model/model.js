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
// check one student issued how many books maxBook allowed=3
export const studentIssuedBookList=function(studentId){
  
  const student =state.students.find(row => row.id === studentId)
  if(student.assignBooks.length ===0){
    throw new Error('No books assiged yet')
  }else {
      const studentWithBooks =state.students.find(row => row.id === studentId)
      const index =state.students.findIndex(row => row.id === studentId)
      state.students[index]=studentWithBooks;
      persistStudents(state.students)
      return studentWithBooks
  }
}

// check how many multiple students got same  book
export const singleBookIssuedToMultipleStudents=function(studentId,bookId=''){
  try{
    const book = bookId && state.books.find(b=>b.ISBN === bookId)
    const student =state.students.find(row => row.id === studentId)
    if (!book) throw new Error("Book not found");
    if (!student) throw new Error("Student not found");
  
    if(book && student) {

    const alreadyAssignedBook = student.assignBooks && student.assignBooks.some(book => book.ISBN === bookId)
    if(alreadyAssignedBook){
      throw new Error(`${book.name} is already assigned to ${student.name}`)

    }
    
    if(student.maxAllowedBook ==0){
      throw new Error('Only 3 Books allows per student to issue. Please return some of your books to get new one.')
    }

    // Update book issue details and student record immutably
    const updatedStudent = { 
      ...student,
      maxAllowedBook: student.maxAllowedBook - 1,
      assignBooks: [...(student.assignBooks || []), { ...book, issueDate: new Date().toLocaleDateString() }]
    };

    // Update the student in state.students
    const studentIndex = state.students.findIndex(row => row.id === studentId);
    if (studentIndex !== -1) {
      state.students[studentIndex] = updatedStudent;
    }
    return updatedStudent;

  }

}catch(error){
  throw error
  }
}

export const dashboard=function(bookId){
  const book = bookId && state.books.find(b=>b.ISBN === bookId)

  if(!book) throw new Error('book not found')

  
const studentList = state.students
  .filter(std => std.assignBooks && std.assignBooks.some(book => book.ISBN === bookId))

  if(book && studentList.length){
    console.log(studentList)
    return  studentList
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



const initializeData = () => {
  const students = localStorage.getItem('studentsTable');
  const books = localStorage.getItem('booksTable');
  if (students) state.students = JSON.parse(students);
  if (books) state.books = JSON.parse(books);
};

initializeData();