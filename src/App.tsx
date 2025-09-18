import { ThemeSwitcher } from './components/ThemeSwitcher'
import './index.css'

function App() {
  return (
    <div className="w-full h-dvh bg-white dark:bg-black text-black dark:text-white">
      <h1 className="text-center">Ola mundo</h1>

      <ThemeSwitcher />
    </div>
  )
}

export default App
