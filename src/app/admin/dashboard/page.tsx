import { PrismaClient } from '@prisma/client'
import Link from 'next/link' // Usamos o Link do Next.js para navegação rápida
import Image from 'next/image' // Usamos o Image do Next.js para otimização de imagens

const prisma = new PrismaClient()

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
        <Link
          href='/admin/projetos/novo'
          className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors'
        >
          + Adicionar Projeto
        </Link>
      </div>

      {/* Tabela de Projetos */}
      <div className='bg-white rounded-lg shadow-md overflow-hidden'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Projeto
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Tecnologias
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Data de Criação
              </th>
              <th scope='col' className='relative px-6 py-3'>
                <span className='sr-only'>Ações</span>
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {projetos.map((projeto) => (
              <tr key={projeto.id}>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='flex items-center'>
                    <div className='flex-shrink-0 h-10 w-10'>
                      {/* Usamos o componente Image do Next para performance */}
                      <Image
                        className='h-10 w-10 rounded-full object-cover'
                        src={
                          projeto.imagemUrl ?? 'https://via.placeholder.com/40'
                        }
                        alt={`Imagem do projeto ${projeto.titulo}`}
                        width={40}
                        height={40}
                      />
                    </div>
                    <div className='ml-4'>
                      <div className='text-sm font-medium text-gray-900'>
                        {projeto.titulo}
                      </div>
                    </div>
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='flex flex-wrap gap-1'>
                    {projeto.tecnologias.map((tech) => (
                      <span
                        key={tech}
                        className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800'
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {new Date(projeto.createdAt).toLocaleDateString('pt-BR')}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                  {/* Links para as futuras páginas de edição e exclusão */}
                  <Link
                    href={`/admin/projetos/editar/${projeto.id}`}
                    className='text-indigo-600 hover:text-indigo-900'
                  >
                    Editar
                  </Link>
                  <button className='ml-4 text-red-600 hover:text-red-900'>
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
