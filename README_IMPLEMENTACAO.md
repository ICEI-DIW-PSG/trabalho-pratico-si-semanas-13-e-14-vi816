# ✅ Sistema de Carrossel com JSON - Implementação Completa

## 📋 Resumo da Implementação

Este projeto integra arquivos JSON com páginas HTML para criar carrosséis dinâmicos e conteúdo gerado automaticamente.

---

## 🎯 Funcionalidades Implementadas

### 1️⃣ **index.html** - Página Principal
✅ Carrossel gerado dinamicamente do `dados.json`  
✅ Exibe 3 relíquias com imagens, títulos e descrições  
✅ Navegação automática com fade  
✅ Botão "Entrar" redireciona para página de detalhes  
✅ Conteúdo atualizado do JSON (títulos, descrições, rodapé)  

### 2️⃣ **detalhe.html** - Página de Detalhes
✅ Carrossel detalhado com dados do `navegaçao.json`  
✅ Botões coloridos para navegar entre relíquias  
✅ Especificações técnicas completas (material, origem, peso, conservação)  
✅ Layout responsivo com Bootstrap 5  
✅ Títulos e subtítulos carregados do JSON  

---

## 📁 Estrutura de Arquivos

```
trabalho-pratico-si-semanas-13-e-14-vi816/
├── public/
│   ├── index.html                          # Página principal
│   ├── detalhe.html                        # Página de detalhes
│   ├── dados.json                          # Dados do carrossel principal
│   ├── navegaçao.json                      # Dados da página de detalhes
│   ├── json-loader.js                      # Carrega os JSONs
│   ├── css/
│   │   └── styles.css                      # Estilos customizados
│   └── assets/
│       └── scripts/
│           ├── carocel-generation.js       # Gera carrossel no index.html
│           ├── detalhe-page.js             # Gera conteúdo do detalhe.html
│           └── page.js                     # Função de redirecionamento
├── db/
│   └── db.json                             # Banco de dados JSON Server
└── package.json                            # Configurações do projeto
```

---

## 🔄 Fluxo de Funcionamento

### **index.html:**

1. Página carrega → `json-loader.js` é executado primeiro
2. `json-loader.js` busca `dados.json` e `navegaçao.json`
3. `carocel-generation.js` aguarda dados com `waitForData()`
4. Carrossel é gerado dinamicamente no container `#myCarousel`
5. Títulos, subtítulos e rodapé são atualizados
6. Bootstrap inicializa o carrossel com animação fade

### **detalhe.html:**

1. Página carrega → `json-loader.js` carrega os dados
2. `detalhe-page.js` aguarda dados com `waitForData()`
3. Gera botões coloridos de navegação do `navegaçao.json`
4. Cria carrossel detalhado com especificações técnicas
5. Cada slide mostra: imagem, título, período, descrição e detalhes
6. Botões permitem navegar diretamente para cada relíquia

---

## 🚀 Como Executar

### **Opção 1: Usando npm (Recomendado)**

```bash
# No diretório do projeto
npm run serve
```

Acesse: **http://localhost:3000/index.html**

### **Opção 2: Usando Live Server (VS Code)**

1. Instale a extensão "Live Server"
2. Clique com botão direito em `public/index.html`
3. Selecione "Open with Live Server"

### **Opção 3: Usando Python**

```bash
cd public
python -m http.server 8000
```

Acesse: **http://localhost:8000/index.html**

---

## 📊 Dados JSON

### **dados.json** - Estrutura:
```json
{
  "metadata": { "title", "description", "charset", "language", "viewport" },
  "dependencies": { "bootstrap", "customFiles" },
  "header": { "mainTitle", "navigation" },
  "mainContent": {
    "subtitle",
    "description",
    "carousel": {
      "id": "myCarousel",
      "items": [
        {
          "id": 1,
          "active": true,
          "image": { "src", "alt", "title", "description" },
          "style": "max-height:400px;object-fit:contain;"
        }
      ],
      "controls": { "previous", "next" }
    }
  },
  "footer": { "author", "profileImage", "socialLinks" }
}
```

### **navegaçao.json** - Estrutura:
```json
{
  "pageInfo": { "title", "subtitle", "carouselId" },
  "navigationButtons": [
    {
      "id": "btn-armadura",
      "label": "Armadura de Urso",
      "targetSlide": 0,
      "icon": "🛡️",
      "color": "#8B4513",
      "category": "medieval"
    }
  ],
  "carouselItems": [
    {
      "id": 0,
      "title": "Armadura de Urso Siberiano",
      "period": "Século XIX",
      "description": "...",
      "image": { "src", "alt" },
      "details": { "material", "origem", "peso", "conservacao" }
    }
  ]
}
```

---

## 🎨 Recursos Visuais

### **index.html:**
- ✨ Carrossel com efeito fade
- 🎯 3 slides com legendas sobre as imagens
- 🔄 Navegação automática (5 segundos)
- ⌨️ Navegação por teclado (setas)
- 🖱️ Pausa ao passar o mouse

### **detalhe.html:**
- 🔘 Botões coloridos personalizados para cada relíquia
- 📊 Cards com especificações técnicas detalhadas
- 🖼️ Imagens em alta qualidade com object-fit
- 📱 Layout 100% responsivo
- 🎯 Navegação direta por botões ou controles do carrossel

---

## 🔧 Scripts JavaScript

### **json-loader.js**
- Carrega `dados.json` e `navegaçao.json`
- Disponibiliza dados globalmente via `window.siteData` e `window.navigationData`
- Fornece função `waitForData()` para aguardar carregamento
- Tratamento de erros com mensagens no console

### **carocel-generation.js**
- Gera carrossel no `#myCarousel` do index.html
- Cria indicadores, slides e controles dinamicamente
- Inicializa Bootstrap Carousel com configurações
- Adiciona eventos de navegação por teclado
- Atualiza títulos e conteúdo da página

### **detalhe-page.js**
- Gera botões coloridos de navegação
- Cria carrossel detalhado com especificações
- Permite navegação direta via botões
- Exibe informações técnicas em cards estilizados
- Atualiza títulos da página dinamicamente

### **page.js**
- Função `redirecionar()` para botão "Entrar"
- Redireciona de index.html para detalhe.html

---

## ✅ Status Atual

### **✔️ index.html:**
- [x] Carrossel funcionando com dados do JSON
- [x] Títulos e descrições carregados
- [x] Navegação automática ativa
- [x] Rodapé atualizado do JSON
- [x] Botão "Entrar" funcionando

### **✔️ detalhe.html:**
- [x] Carrossel detalhado funcionando
- [x] Botões de navegação coloridos
- [x] Especificações técnicas exibidas
- [x] Layout responsivo
- [x] Dados carregados do JSON

---

## 🎯 Navegação no Site

1. **Acesse http://localhost:3000/index.html**
2. Veja o carrossel principal com 3 relíquias
3. Clique no botão **"Entrar"**
4. Na página de detalhes, use os botões coloridos ou setas para navegar
5. Veja especificações técnicas completas de cada item

---

## 📝 Notas Técnicas

- **Bootstrap 5.3.8** para carrossel e grid system
- **Fetch API** para carregar arquivos JSON
- **Async/Await** para sincronização de dados
- **JSON Server** para servir arquivos estáticos e API
- **ES6+** JavaScript moderno
- **Promises** para controle assíncrono

---

## 🐛 Resolução de Problemas

### Carrossel não aparece no index.html:
1. Verifique se o servidor está rodando na porta 3000
2. Abra o console do navegador (F12)
3. Verifique se há erros de carregamento dos JSONs
4. Confirme que `dados.json` está na pasta `public/`

### Botões não funcionam no detalhe.html:
1. Verifique se `navegaçao.json` foi carregado
2. Confirme que Bootstrap está carregado (veja console)
3. Verifique se `detalhe-page.js` está sendo executado

### Imagens não aparecem:
1. Confirme que as imagens estão na pasta `public/img/`
2. Verifique os caminhos no JSON (devem começar com `img/`)
3. Abra o console para ver erros de carregamento

---

## 👨‍💻 Autor

**Vinicius Henrique Antonio Oliveira**  
Estudante da PUC Minas - Sistema de Informação  
Ano: 2025

---

## 📄 Licença

Este projeto é parte de um trabalho acadêmico da disciplina de Desenvolvimento de Interfaces Web.
