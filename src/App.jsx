import { useEffect, useState } from 'react'
import './App.css'
import Hero from './components/layouts/Hero'
import Navbar from './components/layouts/Navbar'
import Footer from './components/sections/Footer'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem('tis-theme') === 'dark',
  )

  useEffect(() => {
    localStorage.setItem('tis-theme', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  return (
    <div className="app-shell" data-theme={isDarkMode ? 'dark' : 'light'}>
      <Navbar isDarkMode={isDarkMode} onToggleTheme={() => setIsDarkMode((current) => !current)} />
      <Hero />
      <Footer />
    </div>
  )
}

export default App
