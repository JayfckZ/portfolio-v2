interface HeadingProps {
  type?: 'h1'| 'h2' | 'h3'
  color?: string
  className?: string
  children?: React.ReactNode
}

export const Heading = ({ type='h2', color='text-primary', className, children }: HeadingProps) => {
  switch (type) {
    case 'h1':
      return <h1 className={`text-5xl font-bold ${color}`}>{children}</h1>
    case 'h2':
      return <h2 className={`text-3xl font-bold ${color} ${className}`}>{children}</h2>
    case 'h3':
      return <h3 className={`text-2xl font-bold ${color}`}>{children}</h3>
  }
}
