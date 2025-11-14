# Integração JSON com HTML - Instruções

## O que foi implementado:

### Arquivos criados/modificados:

1. **json-loader.js** - Carrega os arquivos JSON (dados.json e navegaçao.json)
2. **carocel-generation.js** - Gera o carrossel dinamicamente no index.html
3. **detalhe-page.js** - Gera o conteúdo da página detalhe.html
4. **index.html** - Atualizado para usar os scripts JSON
5. **detalhe.html** - Atualizado para usar os scripts JSON

## Como funciona:

### index.html:
- Carrega `dados.json` para obter informações do carrossel
- Gera dinamicamente:
  - Carrossel com imagens e legendas
  - Títulos e descrições da página
  - Informações do rodapé

### detalhe.html:
- Carrega `navegaçao.json` para obter informações das relíquias
- Gera dinamicamente:
  - Botões de navegação com cores e ícones
  - Carrossel detalhado com especificações técnicas
  - Títulos e subtítulos da página

## Para testar:

### Opção 1: Usando json-server (recomendado)
```bash
npm run serve
```
Acesse: http://localhost:3000

### Opção 2: Usando Live Server (extensão VS Code)
1. Instale a extensão "Live Server" no VS Code
2. Clique com botão direito em index.html
3. Selecione "Open with Live Server"

### Opção 3: Usando Python
```bash
cd public
python -m http.server 8000
```
Acesse: http://localhost:8000

## Estrutura dos dados:

### dados.json:
- Metadados da página
- Configurações do carrossel
- Informações do cabeçalho e rodapé
- Itens do carrossel com imagens, títulos e descrições

### navegaçao.json:
- Informações da página de detalhes
- Botões de navegação (cores, ícones, labels)
- Itens do carrossel com detalhes técnicos
- Especificações de cada relíquia

## Fluxo de carregamento:

1. HTML carrega json-loader.js primeiro
2. json-loader.js busca e carrega os arquivos JSON
3. Outros scripts aguardam os dados usando waitForData()
4. Scripts geram o conteúdo dinamicamente usando os dados JSON
5. Bootstrap inicializa os carrosseis

## Navegação:

- **Página inicial (index.html)**: Mostra carrossel principal e galeria de imagens
- **Botão "Entrar"**: Redireciona para detalhe.html
- **Página de detalhes (detalhe.html)**: Mostra carrossel detalhado com especificações técnicas
- **Botões coloridos**: Navegam diretamente para cada item do carrossel
