import { getServerSession } from 'next-auth'
import { LogoutButton } from './components/LogoutButton'

// O layout é um Server Component, então podemos buscar dados do servidor aqui
export default async function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession() // Pega a sessão do usuário no servidor

  return (
    <section className='bg-gray-50 min-h-screen'>
      <header className='bg-white shadow-sm p-4 flex justify-between items-center'>
        <h1 className='text-xl font-semibold'>Painel Administrativo</h1>
        <div className='flex items-center gap-4'>
          <span className='text-sm'>Olá, {session?.user?.name ?? 'Admin'}</span>
          <LogoutButton />
        </div>
      </header>
      <main className='p-8'>
        {children}{' '}
        {/* Aqui é onde as páginas (ex: dashboard) serão renderizadas */}
      </main>
    </section>
  )
}
