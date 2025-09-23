import { Button } from '../Button'
import { Heading } from '../Heading'

export const Card = ({ projeto }: { projeto: Projeto }) => {
  return (
    <div className="flex flex-col gap-2 bg-card dark:bg-card-dark rounded-b-lg">
      <img src={projeto.image} alt={projeto.title.replace(' ', '_') + '_img'} />
      <div className="px-4 pb-4">
        <Heading>{projeto.title}</Heading>
        <div className="flex gap-1 mt-1 mb-2">
          {projeto.tags.map((tag) => (
            <img
              className="w-6 h-6"
              src={
                `${tag}` ||
                'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg'
              }
            />
          ))}
        </div>

        <p>{projeto.description}</p>
        <div className="flex flex-col gap-2 mt-7">
          <Button type="projlink" projType="git" link={projeto.links.git}>
            GitHub
          </Button>
          <Button type="projlink" projType="deploy" link={projeto.links.deploy}>
            Deploy indisponível
          </Button>
        </div>
      </div>
    </div>
  )
}
