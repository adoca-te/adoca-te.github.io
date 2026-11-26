# Site Adoça-te

Site estático (HTML + CSS + JS, sem dependências). Abre-se o `index.html` no browser para ver.

## 1. Antes de publicar

- Contactos já preenchidos: WhatsApp/telemóvel **+351 910 023 328** e a página de Facebook. O email não aparece no site.
- O site está em **https://adoca-te.github.io** (GitHub Pages, repositório `adoca-te/adoca-te.github.io`). Quando houver **domínio próprio**: procurar e substituir `https://adoca-te.github.io` em **index.html**, **robots.txt** e **sitemap.xml** pelo domínio final (ex.: `https://adocate.pt`) e ligá-lo em *Settings* → *Pages* → *Custom domain* — o endereço github.io passa a redirecionar sozinho.

Confirmar com ela:
- O **menu de doces** e as **combinações** vêm dos stories de 2023 — ver se ainda faz tudo (ex.: doces de São Gonçalo, cavacas).
- O texto **"Sobre mim"** e as descrições dos bolos sem legenda — ela pode querer afinar.

## 2. Publicar (grátis) — recomendado: Cloudflare Pages

**Cloudflare Pages** (https://pages.cloudflare.com) – grátis, rápido em Portugal e traz as estatísticas de visitas incluídas.

1. Criar conta Cloudflare → *Workers & Pages* → *Create* → *Pages* → **Upload assets**.
2. Arrastar a pasta do site (só precisa de `index.html`, `css/`, `js/`, `assets/`, `robots.txt`, `sitemap.xml` — a pasta `images/` com os originais não é usada).
3. Em *Custom domains*, ligar o domínio (ex.: `adoca-te.pt` ou `adocate.pt`, ~10–15 €/ano). Um domínio com o nome da marca ajuda muito a aparecer na pesquisa "adoça-te".

Alternativa: **Netlify Drop** – https://app.netlify.com/drop (arrastar a pasta).

**GitHub Pages** também serve (grátis):
1. Criar um repositório no GitHub e enviar os ficheiros do site.
2. *Settings* → *Pages* → *Source: Deploy from a branch* → `main` / `(root)`.
3. Fica em `https://<utilizador>.github.io/<repositório>/`. Para usar domínio próprio: *Settings* → *Pages* → *Custom domain* (o GitHub cria o ficheiro `CNAME`) e configurar o DNS como o GitHub indica.
4. ⚠️ Num repositório público **tudo fica visível**, incluindo a pasta `images/` (originais, `nao-publicados/`, `sobre-mim/`). Não enviar essa pasta — por exemplo, criar um ficheiro `.gitignore` com a linha `images/`.

## 3. Estatísticas de visitas (Cloudflare Web Analytics)

Gratuito e sem cookies (por isso não é preciso aviso de cookies). Mostra visitas, páginas vistas, de onde vêm as pessoas (Google, Instagram…), país/cidade e se usam telemóvel ou computador.

- **Se o site estiver no Cloudflare Pages:** no projeto → *Metrics* → *Web Analytics* → **Enable**. Já está — não é preciso mexer no código.
- **Se estiver noutro alojamento (GitHub Pages, Netlify…):** Cloudflare → *Analytics & Logs* → *Web Analytics* → *Add a site* → escrever o domínio → copiar o **token**. No fim do `index.html`, trocar `O_TEU_TOKEN` pelo token e tirar o `<!--` e `-->` dessa linha.

As estatísticas começam a aparecer poucos minutos depois das primeiras visitas.

## 4. Aparecer no Google (o mais importante)

1. **Perfil da Empresa no Google (Google Business Profile)** – https://business.google.com
   É isto que faz aparecer no mapa e no topo das pesquisas "bolos amarante".
   - Categoria: *Pastelaria* / *Loja de bolos*
   - Como não há loja física: escolher "presto serviços ao cliente" e definir a área **Amarante** (esconde a morada)
   - Colocar o link do site, telefone, fotos dos bolos
   - Pedir a clientes satisfeitos que deixem avaliações — é o fator que mais pesa
2. **Google Search Console** – https://search.google.com/search-console
   Adicionar o domínio e submeter `sitemap.xml`. O Google costuma indexar em poucos dias.
3. **Colocar o link do site** na bio do Instagram e na página de Facebook.
4. Ir **atualizando a galeria** com bolos novos (sites que mudam são valorizados).

## 5. Adicionar um bolo novo à galeria

**Organização das fotos originais** (`images/`): uma pasta por bolo, com nome curto e descritivo (`super-mario`, `profissao-de-fe`…). Dentro: `super-mario-1.jpeg` (capa), `-2`, `-3`… e a legenda em `descricao.rtfd`. Em `images/sobre-mim/` ficam a foto de perfil e o screenshot do Facebook; em `images/nao-publicados/` as fotos que ficaram fora do site.

1. Converter as fotos para WebP (no Mac, precisa de `brew install webp` uma vez), com o prefixo `bolo-`:
   ```
   cwebp -q 78 -m 6 -sharp_yuv -metadata none -resize 960 0 images/novo/novo-1.jpeg -o assets/img/bolo-novo-1.webp
   cwebp -q 72 -m 6 -sharp_yuv -metadata none -resize 570 0 images/novo/novo-1.jpeg -o assets/img/bolo-novo-1-sm.webp
   cwebp -q 72 -m 6 -sharp_yuv -metadata none -resize 480 0 images/novo/novo-1.jpeg -o assets/img/bolo-novo-1-xs.webp
   ```
   (`-xs` é a miniatura leve para telemóvel; só para fotos em pé. No `<img>` da galeria, copiar também o `srcset` e o `sizes` de outro bolo, trocando os nomes.)
   A versão pequena (`-sm`) só é precisa para a **1.ª foto** (a capa na galeria); as restantes (`-2`, `-3`…) só precisam da versão grande.
   (`-resize 960 0` = 960 px de largura, altura automática; para fotos deitadas usar `1280 0` e `760 0`.)
   Se der "Operation not permitted" (fotos guardadas do WhatsApp), abrir a foto em Pré-visualização → *Exportar* → JPEG e usar essa cópia.
2. No `index.html`, copiar um bloco `<li class="cake">…</li>` e mudar:
   - `data-cat`: `aniversario`, `infantil`, `elegante`, `celebracoes` (finalistas, comunhões, batizados, eventos), `caseiros` (doces caseiros) ou `packs`
   - `data-images`: `bolo-novo-1,bolo-novo-2,…`
   - a imagem (`assets/img/bolo-novo-1-sm.webp`), o `alt` (descrever o bolo, ex.: "Bolo de aniversário infantil do…"), o título, a tag e os textos.
3. Os primeiros 15 bolos aparecem logo; os que têm `data-extra` só aparecem em "Ver mais bolos". Para destacar um bolo novo, coloca-o no topo da lista (e passa o `data-extra` para o 16.º).

## 6. Depois de mudar o CSS ou o JS

No `index.html`, os ficheiros têm um número de versão (`css/style.css?v=…` e `js/main.js?v=…`). Ao alterar algum deles, mudar esse número (ex.: a data de hoje) — senão os telemóveis podem continuar a mostrar a versão antiga durante algum tempo.
