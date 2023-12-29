const initialState = {
  userTableInformation: [],
  id: 0,
  routingId: null,
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SUBMIT":
      return {
        ...state,
        userTableInformation: [
          ...state.userTableInformation,
          { ...action.payload, id: state.id },
        ],
        id: state.id + 1,
      };
    case "DELETE":
      return {
        ...state,
        userTableInformation: state.userTableInformation.filter(
          (each) => each.id !== action.payload
        ),
      };
    case "UPDATE":
      const acessedUserIndex = parseInt(action.payload.acessUserIndex);
      const acessedUserData = action.payload.userUpdatedRow;
      state.userTableInformation.splice(acessedUserIndex, 1, acessedUserData);
      return {
        ...state,
        userTableInformation: state.userTableInformation,
      };

    case "EDIT":
      return {
        ...state,
        routingId: parseInt(action.payload),
      };
    default:
      return state;
  }
};

export default Reducer;
