# 🚀 GUIA RÁPIDO - Carrossel JSON

## ✅ O QUE FOI IMPLEMENTADO

### 📄 index.html
- ✅ Carrossel dinâmico gerado do `dados.json`
- ✅ 3 slides com imagens e legendas
- ✅ Navegação automática com fade
- ✅ Botão "Entrar" funcional

### 📄 detalhe.html  
- ✅ Carrossel detalhado do `navegaçao.json`
- ✅ Botões coloridos para cada relíquia
- ✅ Especificações técnicas completas
- ✅ Layout responsivo

## 🎯 COMO TESTAR

### 1. Servidor está rodando em:
```
http://localhost:3000
```

### 2. Páginas disponíveis:

| Página | URL | Descrição |
|--------|-----|-----------|
| **Principal** | http://localhost:3000/index.html | Carrossel principal |
| **Detalhes** | http://localhost:3000/detalhe.html | Relíquias detalhadas |
| **Teste** | http://localhost:3000/teste.html | Verificar JSON |

### 3. Fluxo de navegação:
```
index.html → Botão "Entrar" → detalhe.html
```

## 🔍 VERIFICAR SE ESTÁ FUNCIONANDO

### No index.html:
1. ✅ Carrossel deve aparecer automaticamente
2. ✅ Deve ter 3 slides (Armadura, Lavadora, Cortador)
3. ✅ Legendas devem aparecer sobre as imagens
4. ✅ Navegação automática a cada 5 segundos
5. ✅ Setas de navegação funcionando

### No detalhe.html:
1. ✅ Deve aparecer 3 botões coloridos no topo
2. ✅ Botão marrom: Armadura de Urso 🛡️
3. ✅ Botão verde: Lavadora de 1907 🔧
4. ✅ Botão vermelho: Cortador Antigo 🔪
5. ✅ Carrossel com especificações técnicas
6. ✅ Ao clicar nos botões, carrossel muda

### No teste.html:
1. ✅ Deve mostrar "✅ dados.json carregado"
2. ✅ Deve mostrar "✅ navegaçao.json carregado"
3. ✅ Resumo dos dados deve aparecer
4. ✅ Botões "Mostrar" exibem JSON completo

## 🐛 SE NÃO FUNCIONAR

### Problema: Carrossel vazio no index.html
**Solução:**
1. Abra o console (F12)
2. Verifique se há erro de carregamento
3. Confirme que `dados.json` existe em `public/`
4. Recarregue a página (Ctrl+R)

### Problema: Botões não aparecem no detalhe.html
**Solução:**
1. Verifique se `navegaçao.json` está na pasta `public/`
2. Abra `teste.html` para verificar se JSON carregou
3. Veja o console para erros
4. Recarregue a página

### Problema: Servidor não está rodando
**Solução:**
```bash
cd "c:\Users\User\Nova pasta (12)\trabalho-pratico-si-semanas-13-e-14-vi816"
npm run serve
```

## 📊 ARQUIVOS PRINCIPAIS

```
public/
├── index.html              → Página principal
├── detalhe.html            → Página de detalhes
├── teste.html              → Verificar JSON
├── dados.json              → Dados do carrossel
├── navegaçao.json          → Dados das relíquias
├── json-loader.js          → Carrega os JSON
└── assets/scripts/
    ├── carocel-generation.js  → Gera carrossel index
    ├── detalhe-page.js        → Gera página detalhes
    └── page.js                → Redirecionamento
```

## 🎨 CUSTOMIZAR

### Mudar cores dos botões:
Edite `navegaçao.json`:
```json
"navigationButtons": [
  {
    "color": "#FF0000",  ← Mude aqui
    "label": "Nome do Botão"
  }
]
```

### Adicionar mais slides:
Edite `dados.json` → `mainContent.carousel.items`:
```json
{
  "id": 4,
  "active": false,
  "image": {
    "src": "img/nova-imagem.jpg",
    "title": "Novo Título",
    "description": "Nova Descrição"
  }
}
```

## ✅ CHECKLIST FINAL

- [x] Servidor rodando na porta 3000
- [x] index.html com carrossel funcionando
- [x] detalhe.html com botões e especificações
- [x] teste.html mostrando dados carregados
- [x] Navegação entre páginas funcionando
- [x] Console sem erros
- [x] JSONs carregando corretamente

## 🎉 TUDO PRONTO!

Acesse:
- **http://localhost:3000/index.html** para começar
- Use o botão "Entrar" para ir aos detalhes
- Use **http://localhost:3000/teste.html** para debug

---

**Autor:** Vinicius Henrique Antonio Oliveira  
**Instituição:** PUC Minas - Sistema de Informação  
**Ano:** 2025
