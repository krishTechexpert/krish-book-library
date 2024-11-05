export const state = {
  students:[],
  books:[]
}

export const studentDetails = function(data){
  state.students.push(data)
  localStorage.setItem('studentsTable',JSON.stringify(state.students))

}

export const getAllStudenstList=function(){
  return state.students;
}

export const booksIssuesToStudents=function(id){
  const student =state.students.find(row => row.id === id)
  if(student.assignBooks.length ===0){
    throw new Error('No books assiged yet')
  }else {

  }
  console.log(student)
}


const storage=localStorage.getItem('studentsTable');
if(storage){
state.students = JSON.parse(storage);
}
