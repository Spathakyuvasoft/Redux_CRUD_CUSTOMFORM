export function userSubmit(users) {
  return {
    type: "SUBMIT",
    payload: users,
  };
}

export function deleteRow(index) {
  return {
    type: "DELETE",
    payload: index,
  };
}

export function updateRow(userData) { 
  console.log(userData)
  return {
    type: "UPDATE",
    payload: userData,
  };
} 


export function editRow(index){
  return {
    type:"EDIT",
    payload:index
  }
}
