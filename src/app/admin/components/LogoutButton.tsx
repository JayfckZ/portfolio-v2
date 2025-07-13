'use client'
import { signOut } from 'next-auth/react'

export function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/login' })}
      className='bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600'
    >
      Sair
    </button>
  )
}
