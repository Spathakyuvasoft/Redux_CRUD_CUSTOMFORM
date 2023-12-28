const initialState = {
  list: [],
  id: 0,
  routingId: null,
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SUBMIT":
      return {
        ...state,
        list: [...state.list, { ...action.payload, id: state.id }],
        id: state.id + 1
      };
    case "DELETE":
      return {
        ...state,
        list: state.list.filter((each) => each.id !== action.payload),
      };
    case "UPDATE":
      const first = parseInt(action.payload.Latest);
      const second = action.payload.ones;
      state.list.splice(first, 1, second);
      return {
        ...state,
        list: state.list,
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
