import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Esta é uma página de servidor, então podemos acessar o banco de dados diretamente
export default async function DashboardPage() {
  const projetos = await prisma.project.findMany({
    orderBy: {
      createdAt: 'desc' // Ordena para mostrar os mais recentes primeiro
    }
  })

  return (
    <div>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl font-bold'>Meus Projetos</h2>
        <a
          href='/admin/projetos/novo'
          className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700'
        >
          + Adicionar Projeto
        </a>
      </div>

      {/* Aqui virá a tabela de projetos */}
      <div className='bg-white p-4 rounded-lg shadow'>
        <p>Você tem {projetos.length} projetos cadastrados.</p>
        {/* Nas próximas etapas, vamos transformar isso em uma tabela bonita */}
        <ul>
          {projetos.map((projeto) => (
            <li key={projeto.id}>{projeto.titulo}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
