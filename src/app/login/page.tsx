'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password
      })

      setIsLoading(false)

      if (result?.ok) {
        router.push('/admin/dashboard')
      } else {
        setError('Email ou senha inválidos. Tente novamente.')
      }
    } catch (err) {
      setIsLoading(false)
      setError('Ocorreu um erro ao tentar fazer o login.')
    }
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-100'>
      <div className='w-full max-w-md rounded-lg bg-white p-8 shadow-lg'>
        <h1 className='mb-6 text-center text-2xl font-bold text-gray-800'>
          Login do Painel
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Campo de Email */}
          <div className='mb-4'>
            <label
              htmlFor='email'
              className='mb-2 block text-sm font-medium text-gray-700'
            >
              Email
            </label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
            />
          </div>

          {/* Campo de Senha */}
          <div className='mb-6'>
            <label
              htmlFor='password'
              className='mb-2 block text-sm font-medium text-gray-700'
            >
              Senha
            </label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
            />
          </div>

          {/* Mensagem de Erro */}
          {error && (
            <p className='mb-4 text-center text-sm text-red-600'>{error}</p>
          )}

          {/* Botão de Login */}
          <button
            type='submit'
            disabled={isLoading}
            className='w-full rounded-md bg-blue-600 px-4 py-2 font-semibold text-white shadow-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400'
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
