import { createContext, useState } from 'react'

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem("darkMode");
    return stored ? JSON.parse(stored) : false;
  });

  return (
    <AppContext.Provider
      value={{
        darkMode,
        setDarkMode
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider;