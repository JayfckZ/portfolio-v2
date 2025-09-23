import { Navbar } from './containers/Navbar'
import { Card } from './components/Card'
import { Routes, Route } from 'react-router-dom'
import './index.css'
import { Container } from './components/Container'

const teste: Projeto = {
  image: 'https://placehold.co/500x250',
  title: 'Projeto Teste',
  description:
    'Esse é um projeto teste para ver se o card está funcionando corretamente.',
  tags: [
    'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
  ],
  links: {
    git: 'github.com',
    deploy: '',
  },
}

function App() {
  return (
    <div
      className="w-full h-screen bg-white ml-0.5 bg-gradient-to-b from-white to-background-white-secondary text-text
      dark:bg-background dark:bg-gradient-to-b dark:from-background dark:to-background-secondary dark:text-white
    "
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/sobre" element={<div>Sobre</div>} />
        <Route
          path="/projetos"
          element={
            <Container>
              <Card projeto={teste} />
            </Container>
          }
        />
      </Routes>
    </div>
  )
}

export default App
