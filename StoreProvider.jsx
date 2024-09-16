import React, { createContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
  userLoggedIn: localStorage.getItem("userLoggedIn")
    ? JSON.parse(localStorage.getItem("userLoggedIn"))
    : null,
  placeInfo: localStorage.getItem("placeInfo")
    ? JSON.parse(localStorage.getItem("placeInfo"))
    : null,
  loading: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_DATA":
      return {
        ...state,
        isLoading: true,
      };

    case "FETCH_END":
      return {
        ...state,
        isLoading: false,
      };
    case "LOG_IN":
      return {
        ...state,
        userLoggedIn: action.payload,
        isLoading: true,
      };
    case "LOG_OUT":
      return {
        ...state,
        userLoggedIn: null,
        isLoading: false,
      };

    case "GET_CREATED_PLACE_DETAIL":
      return {
        ...state,
        placeInfo: action.payload,
        isLoading: false,
      };

    default:
      return state;
  }
};

function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <Store.Provider value={value}>{children}</Store.Provider>;
}

export default StoreProvider;
