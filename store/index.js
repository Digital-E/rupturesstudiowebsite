import React, { useReducer, createContext, useEffect } from "react";

const initialState = {
  projectIndex: 0,
  slideIndex: 0,
  projectOpen: false,
  allProjects: [],
};

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    const newState = state;
    switch (action.type) {
      case "update project index":
        return {
          ...newState,
          projectIndex: action.value
        };
      case "update slide index":
        return {
          ...newState,
          slideIndex: action.value
        };
      case "update all projects":
        newState.allProjects = action.value;
        return newState;
      case "update project open":
        return {
          ...newState,
          projectOpen: action.value
        };                           
      default:
        throw new Error();
    }
  }, initialState);


  // useEffect(() => {
  //   Object.keys(initialState).forEach((item) => {
  //     initialState[`${item}`] = JSON.parse(localStorage.getItem(item));
  //   });
  // }, []);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
