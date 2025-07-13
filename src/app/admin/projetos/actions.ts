// src/app/admin/projetos/actions.ts

'use server'

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@supabase/supabase-js' // 1. Importar o cliente Supabase

// 2. Criar o cliente Supabase com as nossas variáveis de ambiente
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const prisma = new PrismaClient()

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
}

export async function createProject(
  prevState: { message: string },
  formData: FormData
) {
  try {
    const titulo = formData.get('titulo') as string
    const descricao = formData.get('descricao') as string
    const tecnologiasRaw = formData.get('tecnologias') as string
    const repoUrl = formData.get('repoUrl') as string
    const deployUrl = (formData.get('deployUrl') as string) || null

    // 3. Pegar o arquivo de imagem do formulário
    const imagemFile = formData.get('imagem') as File
    let imagemUrl: string | null = null

    // 4. Se uma imagem foi enviada, fazer o upload para o Supabase Storage
    if (imagemFile && imagemFile.size > 0) {
      const fileExt = imagemFile.name.split('.').pop()
      const fileName = `${generateSlug(titulo)}-${Date.now()}.${fileExt}`

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('portfolio-images') // O nome do bucket que criamos
        .upload(fileName, imagemFile)

      if (uploadError) {
        throw new Error('Falha no upload da imagem: ' + uploadError.message)
      }

      // 5. Pegar a URL pública da imagem que acabamos de subir
      const { data: publicUrlData } = supabase.storage
        .from('portfolio-images')
        .getPublicUrl(fileName)

      imagemUrl = publicUrlData.publicUrl
    }

    // ... (validação dos outros campos, como antes)

    const slug = generateSlug(titulo)
    const tecnologias = tecnologiasRaw.split(',').map((tech) => tech.trim())

    // 6. Salvar o projeto no Prisma com a URL da imagem (se houver)
    await prisma.project.create({
      data: {
        titulo,
        slug,
        descricao,
        imagemUrl, // Salva a URL do Supabase ou null
        repoUrl,
        deployUrl,
        tecnologias
      }
    })
  } catch (e) {
    console.error(e)
    // Em caso de erro no banco (ex: slug duplicado), retornamos uma mensagem
    return { message: 'Erro: Falha ao criar o projeto no banco de dados.' }
  }

  // 3. Revalidar o cache e redirecionar em caso de sucesso
  revalidatePath('/admin/dashboard') // Avisa o Next.js para buscar os dados novos na página do dashboard
  redirect('/admin/dashboard') // Redireciona o usuário de volta para o dashboard
}
