import { createContext, useContext, useReducer } from "react";

const AppStateContext = createContext();
const AppDispatchContext = createContext();

const initialState = {
  isLoading: false,
  users: [],
  error: "",
  idSort: false,
  nameSort: false,
  ageSort: false,
  gender: "Gender",
  country: "Country",
  page: 1,
};

function reducer(state, action) {
  switch (action.type) {
    case "app/fetching":
      return { ...state, isLoading: true };
    case "app/fetched":
      return { ...state, isLoading: false, users: action.payload };
    case "app/rejected":
      return { ...state, isLoading: false, error: action.payload };
    case "app/nameSort":
      return {
        ...state,
        nameSort: !state.nameSort,
        isLoading: true,
      };
    case "app/ageSort":
      return {
        ...state,
        ageSort: !state.ageSort,
        isLoading: true,
      };
    case "app/idSort":
      return {
        ...state,
        isLoading: true,
        idSort: !state.idSort,
      };
    case "app/gender":
      if (action.payload === "gender") {
        return { ...state, gender: action.payload };
      }
      return {
        ...state,
        gender: action.payload,
        users: state.users.filter((e) => e.gender === action.payload),
      };
    case "app/country":
      if (action.payload === "Country") {
        return { ...state, country: action.payload };
      }
      return {
        ...state,
        country: action.payload,
        users: state.users.filter((e) => e.address.country === action.payload),
      };
    case "app/reset":
      return {
        ...state,
        isLoading: false,
        error: "",
        idSort: false,
        nameSort: false,
      };
    case "app/pagination":
      return {
        ...state,
        page: action.payload,
        gender: "Gender",
        country: "Country",
      };
    default:
      alert("Invalid request.");
  }
}

export default function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAppState() {
  const context = useContext(AppStateContext);

  if (context === undefined) {
    throw new Error("AppStateContext was used outside the AppStateProvider.");
  }

  return context;
}
// eslint-disable-next-line react-refresh/only-export-components
export function useAppDispatch() {
  const context = useContext(AppDispatchContext);
  if (context === undefined) {
    throw new Error(
      "AppDispatchContext was used outside the AppDispatchProvider."
    );
  }
  return context;
}
