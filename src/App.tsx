import { Button } from './components/Button'
import { ThemeSwitcher } from './components/ThemeSwitcher'
import './index.css'

function App() {
  return (
    <div className="w-full h-dvh bg-white ml-0.5 bg-gradient-to-b from-white to-background-white-secondary text-text
      dark:bg-background dark:bg-gradient-to-b dark:from-background dark:to-background-secondary dark:text-white
    ">
      <h1 className="text-center">Ola mundo</h1>

      <Button type="navlink">Home</Button>
      <Button type="navlink">Sobre</Button>
      <Button type="filter">Todos</Button>
      <Button type="filter">Front</Button>
      <Button type="filter">Back</Button>
      <Button type="projlink" link='https://github.com' projType='git'>Ver repositório</Button>
      <Button type="projlink" projType='deploy'>Ver deploy</Button>
      <ThemeSwitcher />
    </div>
  )
}

export default App
