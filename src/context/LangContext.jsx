import { createContext, useContext, useState, useEffect } from 'react'

const LangContext = createContext()

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => 
    localStorage.getItem('exhibition-lang') || 'ko'
  )

  useEffect(() => {
    localStorage.setItem('exhibition-lang', lang)
    document.documentElement.lang = lang === 'ko' ? 'ko' : 'en'
  }, [lang])

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  const context = useContext(LangContext)
  if (!context) {
    throw new Error('useLang must be used within LangProvider')
  }
  return context
}
