const AppReducer = (state, action) => {
  switch (action.type) {
    case "ADD_CUSTOMER":
      return {
        ...state,
        customerList: [...state.customerList, action.payload],
      };
    case "ADD_ITEM":
      return {
        ...state,
        itemList: [...state.itemList, action.payload],
      };
    case "CHANGE_NAV":
      return {
        ...state,
        currentNav: action.payload,
      };
    case "MODAL_OPEN":
      return {
        state,
        isModalOpen: action.payload,
      };
    default:
      return state;
  }
};

export default AppReducer;
