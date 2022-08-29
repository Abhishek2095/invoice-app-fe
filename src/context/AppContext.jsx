import React, { createContext } from "react";
import { useReducer } from "react";
import AppReducer from "./AppReducer";
import initialState from "./InitialState";
// TODO Change CustomerContext to AppContext
// TODO Separate AppReducer, InitialState, Context&Provider
// TODO declare constants for action separately
// TODO MODAL_OPEN state

export const AppContext = createContext();

export const AppProvider = (props) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  return (
    <AppContext.Provider
      value={{
        customerList: state.customerList,
        itemList: state.itemList,
        currentNav: state.currentNav,
        isModalOpen: state.isModalOpen,
        dispatch,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
