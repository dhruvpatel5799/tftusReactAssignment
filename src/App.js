import { createContext, useContext, useState } from "react";
import Login from "./Components/Login"
import Navigation from "./Components/Navigation";
import Users from "./Components/Users";

export const centralState = createContext();

function App() {
  const cState = useContext(centralState);

  //central state
  const [store, setStore] = useState({
    IsLoggedIn: false,
    users: []
  });

  return (
    <centralState.Provider value={{store,setStore}}>
      <Navigation />
    </centralState.Provider>
  );
}

export default App;
