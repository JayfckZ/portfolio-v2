import { useState, useEffect } from "react"

export const ThemeSwitcher = ({ className='' }) => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    }
    else {
      root.classList.remove('dark')
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'))
  }

  return (
    <button onClick={toggleTheme} className={`px-3 py-2 bg-none text-primary hover:bg-primary hover:text-white rounded-4xl duration-200 ease-linear cursor-pointer text-2xl ${className}`}>
      {theme === 'dark' ? <i className="bi bi-moon-stars-fill"></i> : <i className="bi bi-sun-fill"></i>}
    </button>
  )
}
