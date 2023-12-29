export function userSubmit(userData) {
  return {
    type: "SUBMIT",
    payload: userData,
  };
}

export function deleteRow(index) {
  return {
    type: "DELETE",
    payload: index,
  };
}

export function updateRow(userData) {
  return {
    type: "UPDATE",
    payload: userData,
  };
}

export function editRow(index) {
  return {
    type: "EDIT",
    payload: index,
  };
}
