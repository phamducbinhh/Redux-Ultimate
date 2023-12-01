import { createContext, useContext, useState, ReactNode } from 'react'

interface DarkModeContextProps {
  isDarkMode: string
  toggleDarkMode: () => void
}

const DarkModeContext = createContext<DarkModeContextProps | undefined>(undefined)

export const DarkModeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState('light')

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
  }

  const values = { isDarkMode, toggleDarkMode }

  return <DarkModeContext.Provider value={values}>{children}</DarkModeContext.Provider>
}

export const useDarkMode = (): DarkModeContextProps => {
  const context = useContext(DarkModeContext)
  if (!context) {
    throw new Error('useDarkMode must be used within a DarkModeProvider')
  }
  return context
}
