type Projeto = {
  image: string
  title: string
  description: string
  tags: string[]
  links: {
    git?: string
    deploy?: string
  }
}
