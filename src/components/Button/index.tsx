import { Link } from 'react-router-dom'

interface ButtonProps {
  type: 'navlink' | 'filter' | 'projlink'
  projType?: 'git' | 'deploy'
  link?: string
  children?: React.ReactNode
  isActive?: boolean
  onClick?: () => void
}

export const Button = ({
  type,
  projType,
  link,
  children,
  isActive,
  onClick,
}: ButtonProps) => {
  if (type === 'navlink') {
    return (
      <Link
        to={link || '/'}
        onClick={onClick}
        className={`p-2 rounded-lg bg-none text-primary hover:bg-primary hover:text-white duration-200 ease-linear cursor-pointer outline-none
        ${isActive && 'bg-primary text-white'}`}
      >
        {children}
      </Link>
    )
  } else if (type === 'filter') {
    return (
      <button
        onClick={onClick}
        className={`p-2 rounded-lg bg-background font-bold  duration-200 ease-linear cursor-pointer outline-none
        ${isActive ? 'bg-primary text-white dark:text-white dark:bg-primary' : 'text-white dark:bg-white dark:text-background'}`}
      >
        {children}
      </button>
    )
  } else if (type === 'projlink') {
    return (
      <a
        href={link}
        target="_blank"
        className={`p-1.5 rounded-lg bg-background text-white dark:bg-white dark:text-background duration-200 ease-linear outline-none
          flex justify-center items-center relative
          ${!link ? 'brightness-75' : 'cursor-pointer'}`}
      >
        <span className="absolute left-2">
          {projType == 'git' ? (
            <i className="bi bi-github"></i>
          ) : (
            <i className="bi bi-globe-americas"></i>
          )}
        </span>
        {children}
      </a>
    )
  }
}
