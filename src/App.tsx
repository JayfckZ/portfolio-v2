import { Navbar } from './containers/Navbar'
import { Routes, Route } from 'react-router-dom'
import './index.css'

function App() {
  return (
    <div className="w-full bg-white ml-0.5 bg-gradient-to-b from-white to-background-white-secondary text-text
      dark:bg-background dark:bg-gradient-to-b dark:from-background dark:to-background-secondary dark:text-white
    ">
      <Navbar />
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/sobre" element={<div>Sobre</div>} />
        <Route path="/projetos" element={<div>Projetos</div>} />
      </Routes>
    </div>
  )
}

export default App
