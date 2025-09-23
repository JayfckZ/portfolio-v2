import {  useState } from "react"
import { Button } from "../../components/Button";
import { ThemeSwitcher } from "../../components/ThemeSwitcher";
import { Heading } from "../../components/Heading";

export const Navbar = () => {
  const [activeLink, setActiveLink] = useState('home')

  return (
    <nav className="h-auto py-0.5 flex items-center justify-center lg:w-full lg:px-9 lg:justify-between">
      <Heading className="hidden lg:block">Portfólio</Heading>
      <div className="buttons flex items-center gap-1">
        <Button
          type="navlink"
          link="/"
          isActive={activeLink === 'home'}
          onClick={() => setActiveLink('home')}
        >
          Home
        </Button>
        <Button
          type="navlink"
          link="/sobre"
          isActive={activeLink === 'sobre'}
          onClick={() => setActiveLink('sobre')}
        >
          Sobre
        </Button>
        <Button
          type="navlink"
          link="/projetos"
          isActive={activeLink === 'projetos'}
          onClick={() => setActiveLink('projetos')}
        >
          Projetos
        </Button>

        <ThemeSwitcher />
      </div>
    </nav>
  )
}
