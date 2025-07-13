// src/app/admin/projetos/novo/page.tsx

'use client'

import { useRouter } from 'next/navigation'
import { createProject } from '../actions'
import { useState, useActionState } from 'react'
import { AVAILABLE_TECHS } from '@/lib/technologies'

export default function NewProjectPage() {
  const router = useRouter()

  // Usamos o useFormState para lidar com erros vindos da Server Action
  const [state, formAction, isPending] = useActionState(createProject, {
    message: ''
  })

  // 2. Novo estado para controlar as tecnologias selecionadas
  const [selectedTechs, setSelectedTechs] = useState<string[]>([])

  // 3. Função para adicionar/remover tecnologias da nossa lista de selecionadas
  const handleTechClick = (tech: string) => {
    if (selectedTechs.includes(tech)) {
      // Se a tecnologia já foi selecionada, removemos ela
      setSelectedTechs(selectedTechs.filter((t) => t !== tech))
    } else {
      // Se não, adicionamos ela à lista
      setSelectedTechs([...selectedTechs, tech])
    }
  }

  return (
    <div>
      <h1 className='text-2xl font-bold mb-6'>Adicionar Novo Projeto</h1>

      {/* O form agora chama a 'formAction' que está ligada ao nosso estado */}
      <form
        action={formAction}
        encType='multipart/form-data'
        className='bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto space-y-4'
      >
        {/* Título */}
        <div>
          <label
            htmlFor='titulo'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Título do Projeto
          </label>
          <input
            type='text'
            name='titulo'
            id='titulo'
            required
            className='w-full p-2 border border-gray-300 rounded-md'
          />
        </div>

        {/* Descrição */}
        <div>
          <label
            htmlFor='descricao'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Descrição
          </label>
          <textarea
            name='descricao'
            id='descricao'
            rows={4}
            required
            className='w-full p-2 border border-gray-300 rounded-md'
          ></textarea>
        </div>

        {/* Tecnologias */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Tecnologias
          </label>
          <div className='flex flex-wrap gap-2'>
            {AVAILABLE_TECHS.map((tech) => (
              <button
                type='button' // Importante: type="button" para não submeter o formulário
                key={tech}
                onClick={() => handleTechClick(tech)}
                className={`px-3 py-1 text-sm rounded-full border transition-colors
                  ${
                    selectedTechs.includes(tech)
                      ? 'bg-blue-600 text-white border-blue-600' // Estilo quando selecionado
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100' // Estilo padrão
                  }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        {/* 5. O TRUQUE: O Input Oculto */}
        <input
          type='hidden'
          name='tecnologias'
          value={selectedTechs.join(',')}
        />

        {/* Imagem */}
        <div>
          <label
            htmlFor='imagem'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Imagem de Capa (Opcional)
          </label>
          <input
            type='file'
            name='imagem'
            id='imagem'
            accept='image/*' // Ajuda o usuário a selecionar apenas imagens
            className='w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
          />
        </div>

        {/* Links */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label
              htmlFor='repoUrl'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              URL do Repositório
            </label>
            <input
              type='url'
              name='repoUrl'
              id='repoUrl'
              required
              placeholder='https://github.com/...'
              className='w-full p-2 border border-gray-300 rounded-md'
            />
          </div>
          <div>
            <label
              htmlFor='deployUrl'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              URL do Deploy (Opcional)
            </label>
            <input
              type='url'
              name='deployUrl'
              id='deployUrl'
              placeholder='https://...'
              className='w-full p-2 border border-gray-300 rounded-md'
            />
          </div>
        </div>

        {/* Exibição de Erros */}
        {state.message && (
          <p className='text-red-500 text-sm'>{state.message}</p>
        )}

        {/* Botões de Ação */}
        <div className='flex justify-end gap-4 pt-4'>
          <button
            type='button'
            onClick={() => router.back()}
            className='px-4 py-2 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300'
          >
            Cancelar
          </button>
          <button
            type='submit'
            disabled={isPending}
            className='px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed'
          >
            {isPending ? 'Salvando...' : 'Salvar Projeto'}
          </button>
        </div>
      </form>
    </div>
  )
}
