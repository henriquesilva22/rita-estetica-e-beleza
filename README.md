# Rita Beleza e Estética — site

Site estático (HTML, CSS e JS puros). Não precisa de build nem de npm.

## Estrutura
- `index.html` — página
- `assets/styles.css` — visual e responsividade (mobile, tablet, desktop)
- `assets/app.js` — **dados** (preços, telefones, horários, galeria) e comportamento
- `img/`, `logos/` — imagens

## Editar conteúdo
Tudo fica no bloco `DADOS` no topo de `assets/app.js`:
- `instagram`: coloque o @ (ex.: `'ritabelezaestetica'`) para aparecer o ícone no rodapé
- `CATS`: serviços e preços
- `GAL`: fotos da galeria (arquivo, categoria, descrição, largura, altura)

## Publicar na Vercel
**Opção 1 — pelo site:** crie um repositório no GitHub com esta pasta, entre em vercel.com → *Add New → Project* → importe o repositório. Framework: **Other**. Sem build command, output directory em branco. Deploy.

**Opção 2 — pela linha de comando:**
```bash
npm i -g vercel
vercel          # primeira vez (prévia)
vercel --prod   # produção
```

Depois de ter o domínio final, troque `og:image` em `index.html` por URL completa (ex.: `https://seudominio.com.br/img/cabelo-02.jpg`) para a imagem aparecer ao compartilhar no WhatsApp.
