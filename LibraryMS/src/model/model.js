export const state = {
  students:[],
  books:[]
}

export const studentDetails = function(data){
  console.log(data)
  state.students.push(data)
}


