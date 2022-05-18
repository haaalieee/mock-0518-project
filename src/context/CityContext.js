import React, { useContext, useReducer } from "react";

const CityContext = React.createContext();
const CityUpdateContext = React.createContext();

const ACTIONS = {
  HOVERCITY: "hoverCity",
  CLICKEDCITY: "clickedCity",
  OBJECTPOSITION: "objectPosition",
  ISCARDIALOGOPEN: "isCarDialogOpen",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.HOVERCITY:
      return {
        ...state,
        hoverCity: action.payload.hoverCity ?? !state.hoverCity,
      };
    case ACTIONS.CLICKEDCITY:
      return {
        ...state,
        clickedCity: !state.clickedCity,
      };
    case ACTIONS.OBJECTPOSITION:
      return {
        ...state,
        objectPosition: action.payload,
      };
    case ACTIONS.ISCARDIALOGOPEN:
      return {
        ...state,
        isCarDialogOpen: !state.isCarDialogOpen,
      };
    default:
      return state;
  }
}

export function useCity() {
  return useContext(CityContext);
}

export function useCityUpdate() {
  return useContext(CityUpdateContext);
}

export function CityProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    hoverCity: false,
    clickedCity: false,
    isCarDialogOpen: false,
    objectPosition: {
      x: 0,
      y: 0,
      z: 0,
    },
  });

  function toggleHoverCity(hoverCity) {
    dispatch({
      type: ACTIONS.HOVERCITY,
      payload: {
        hoverCity: hoverCity,
      },
    });
  }

  function toggleClickedCity() {
    dispatch({
      type: ACTIONS.CLICKEDCITY,
    });
  }

  function toggleCarDialog() {
    dispatch({
      type: ACTIONS.ISCARDIALOGOPEN,
    });
  }

  function setObjectPosition(x, y, z) {
    dispatch({
      type: ACTIONS.OBJECTPOSITION,
      payload: {
        x,
        y,
        z,
      },
    });
  }

  return (
    <CityContext.Provider value={state}>
      <CityUpdateContext.Provider
        value={{
          toggleHoverCity,
          toggleClickedCity,
          toggleCarDialog,
          setObjectPosition,
        }}
      >
        {children}
      </CityUpdateContext.Provider>
    </CityContext.Provider>
  );
}
