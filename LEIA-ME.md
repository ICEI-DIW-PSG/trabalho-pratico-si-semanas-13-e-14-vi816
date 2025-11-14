# 🏛️ Relíquias Antigas - Sistema de Visualização

Sistema web para exibição e rastreamento de relíquias históricas com dashboard de estatísticas.

## 📋 Estrutura do Projeto

```
trabalho-pratico-si-semanas-13-e-14-vi816/
├── db/
│   └── db.json                 # Banco de dados JSON Server
├── public/
│   ├── assets/
│   │   └── scripts/
│   │       ├── carocel-generation.js    # Gera carrossel do index
│   │       ├── detalhe-page.js          # Gera página de detalhes
│   │       ├── page.js                   # Funções de navegação
│   │       └── static-gallery.js         # Galeria estática
│   ├── css/
│   │   └── styles.css           # Estilos globais
│   ├── config.js                # Configurações da aplicação
│   ├── json-loader.js           # Carrega dados JSON
│   ├── dados.json               # Dados do carrossel principal
│   ├── navegaçao.json           # Dados da página de detalhes
│   ├── index.html               # Página principal
│   ├── detalhe.html             # Página de detalhes das relíquias
│   ├── grafico.html             # Dashboard de estatísticas
│   └── [imagens]                # Arquivos de imagem
├── package.json                 # Dependências do projeto
└── start-server.ps1             # Script para iniciar servidor

```

## 🚀 Como Executar

### Opção 1: Usando o script PowerShell
```powershell
.\start-server.ps1
```

### Opção 2: Usando npm
```bash
npm run serve
```

### Opção 3: Comando direto
```bash
npx json-server ./db/db.json --port 3000 --static ./public
```

## 🌐 URLs Disponíveis

- **Página Principal**: http://localhost:3000 ou http://localhost:3000/index.html
- **Detalhes**: http://localhost:3000/detalhe.html
- **Estatísticas**: http://localhost:3000/grafico.html

### API Endpoints

- **GET /acessos** - Lista todos os acessos
- **GET /acessos/:id** - Busca acesso específico
- **PUT /acessos/:id** - Atualiza acesso
- **GET /usuarios** - Lista usuários
- **GET /estatisticas** - Busca estatísticas gerais

## ✨ Funcionalidades

### 1. Página Principal (index.html)
- ✅ Carrossel de relíquias (manual, sem auto-play)
- ✅ Rastreamento de visualizações
- ✅ Navegação para página de detalhes

### 2. Página de Detalhes (detalhe.html)
- ✅ Carrossel com informações detalhadas
- ✅ Botões de navegação entre itens
- ✅ Especificações técnicas de cada relíquia
- ✅ Rastreamento de cliques

### 3. Dashboard de Estatísticas (grafico.html)
- ✅ Gráfico de barras com visualizações por item
- ✅ Gráfico de pizza por categoria
- ✅ Cards com estatísticas gerais
- ✅ Lista detalhada de acessos
- ✅ Sem atualização automática (sem flickering)

## 🎨 Relíquias Disponíveis

1. **Armadura de Urso** (Medieval)
   - Século XIX, Sibéria
   - Material: Metal e couro

2. **Lavadora de 1907** (Industrial)
   - Início do século XX
   - Sistema de rotação manual

3. **Cortador Antigo** (Culinário)
   - Final do século XIX
   - Usado em mercados tradicionais

## 🔧 Configurações

Arquivo `config.js`:
```javascript
API_BASE_URL: 'http://localhost:3000'
REQUEST_TIMEOUT: 10000 // 10 segundos
CACHE_BUSTING: true
```

## 📊 Estrutura do Banco de Dados

### Acessos
```json
{
  "id": "1",
  "item": "Nome do Item",
  "visualizacoes": 0,
  "categoria": "medieval|industrial|culinario|navegacao",
  "ultimoAcesso": "2025-11-13T00:00:00.000Z"
}
```

## 🐛 Correções Aplicadas

✅ Removido arquivo db.json duplicado de public/
✅ IDs corrigidos para string em todos os scripts
✅ Autoplay dos carrosséis desabilitado
✅ Adicionado config.js centralizado
✅ Timeout de 10s em requisições
✅ Validação de dados recebidos do servidor
✅ Tratamento de erros robusto
✅ Cache-busting ativado
✅ Dados zerados para início limpo

## 📝 Observações

- Os carrosséis agora são **totalmente manuais**
- Não há mais atualização automática em nenhuma página
- O sistema de tracking está funcionando corretamente
- Todos os IDs usam strings para compatibilidade com JSON Server

## 👨‍💻 Autor

Vinicius Henrique Antonio Oliveira - 2025
Estudante da PUC Minas - Sistema de Informação
