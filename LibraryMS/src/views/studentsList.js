import View from "./View";

class StudentList extends View{
  _parentElement=document.querySelector('#student-list-container');
  _studentList =  document.querySelector('#view-student-btn');

  showStudentRecords(handler){
    this._studentList.addEventListener('click',() => {
      this.makeButtonActive(this._studentList)
      this.resetHTML(this._parentElement)
      const records= handler();
      this.render(records)

    })
  }

  generateMarkup(data){
    let markup=` <h2>Students List</h2>      
      <table>
        <tr>
          <th>Name</th>
          <th>StudentId</th>
          <th>Phone</th>
          <th>Address</th>
          <th>Class</th>
          <th>Assigned Books</th>
        </tr>`;
        
        if(data?.length === 0) {
          return markup + ` <tr>No record found</tr>`;
        }else{
          const result=data.map(std => {
            return `<tr class="student-record">
            <td>${std.name}</td>
            <td>${std.id}</td>
            <td>${std.phone}</td>
            <td>${std.address}</td>
            <td>${std.class}</td>
            <td class="asigned-book" data-stdId-book-asigned="${std.id}">Books</td>
            </tr>`
          })
          return markup  + result.join('')
        }
  }
  bookIssuesToStudent(handler){
    this._parentElement.addEventListener('click',function(e){

      const node =e.target.closest('.asigned-book');
      if(!node) return null;
      const studentId=node.dataset.stdidBookAsigned;
      handler(studentId)

    })
  }
  clear(){

  }
}
export default new StudentList();