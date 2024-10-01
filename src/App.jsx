import React, { useState } from "react";
import { UserProvided } from "./context/userProvided";
import NavBar from "./components/pages/NavBar";
function App() {
  const [darkMode, setDarkMode] = useState(false);


  return (
    <UserProvided>
      <div className={`min-h-screen items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <NavBar setDarkMode={setDarkMode} darkMode={darkMode} />
      </div>
    </UserProvided>

  );
}

export default App;
