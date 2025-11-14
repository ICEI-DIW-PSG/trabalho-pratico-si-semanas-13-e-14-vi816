// detalhe-page.js - Script para a página de detalhes

document.addEventListener('DOMContentLoaded', async function() {
    console.log('🔄 Carregando página de detalhes...');

    try {
        // Aguarda os dados JSON serem carregados
        const { siteData, navigationData } = await waitForData();

        if (!navigationData || !navigationData.carouselItems) {
            console.error('❌ Dados de navegação não encontrados');
            return;
        }

        console.log('✅ Dados carregados para página de detalhes:', navigationData);

        // Detecta qual página está sendo carregada
        const isIndexPage = window.location.pathname.includes('index.html') || 
                            window.location.pathname === '/' ||
                            window.location.pathname.endsWith('/');

        // Atualiza o título da página
        const h1 = document.querySelector('header h1');
        if (h1 && navigationData.pageInfo) {
            h1.textContent = navigationData.pageInfo.title;
        }

        // Atualiza o subtítulo
        const h2 = document.querySelector('header h2');
        if (h2 && navigationData.pageInfo) {
            h2.textContent = navigationData.pageInfo.subtitle;
        }

        // Define o título da página
        if (navigationData.pageInfo) {
            document.title = navigationData.pageInfo.title;
        }

        // Cria o carrossel apropriado para cada página
        if (isIndexPage) {
            createSimpleCarousel();
        } else {
            createDetailCarousel();
        }

        console.log('✅ Página configurada!');
    } catch (error) {
        console.error('❌ Erro ao carregar página de detalhes:', error);
    }
});

function createSimpleCarousel() {
    const { navigationData } = window;
    
    if (!navigationData) {
        console.error('Dados não disponíveis');
        return;
    }

    const header = document.querySelector('header');
    if (!header) return;

    // Cria o container do carrossel simples
    const carouselContainer = document.createElement('div');
    carouselContainer.style.cssText = `
        max-width: 900px;
        margin: 40px auto;
        padding: 30px;
        background: #f8f9fa;
        border-radius: 15px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    `;

    const carouselId = navigationData.pageInfo?.carouselId || 'indexCarousel';
    
    const indicatorsHTML = navigationData.carouselItems.map((item, index) => `
        <button type="button" data-bs-target="#${carouselId}" data-bs-slide-to="${index}" 
                ${index === 0 ? 'class="active" aria-current="true"' : ''} 
                aria-label="Slide ${index + 1}"></button>
    `).join('');

    const itemsHTML = navigationData.carouselItems.map((item, index) => `
        <div class="carousel-item ${index === 0 ? 'active' : ''}">
            <img src="${item.image.src}" class="d-block w-100" alt="${item.image.alt}"
                 style="max-height: 500px; object-fit: contain; border-radius: 10px;">
            <div class="carousel-caption d-none d-md-block" style="background: rgba(0,0,0,0.7); border-radius: 10px; padding: 20px;">
                <h3>${item.title}</h3>
                <p>${item.period}</p>
            </div>
        </div>
    `).join('');

    carouselContainer.innerHTML = `
        <div id="${carouselId}" class="carousel slide">
            <div class="carousel-indicators">
                ${indicatorsHTML}
            </div>
            <div class="carousel-inner">
                ${itemsHTML}
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Anterior</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#${carouselId}" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Próximo</span>
            </button>
        </div>
    `;

    header.insertAdjacentElement('afterend', carouselContainer);
}

function createDetailCarousel() {
    const { navigationData } = window;
    
    if (!navigationData) {
        console.error('Dados não disponíveis');
        return;
    }

    const header = document.querySelector('header');
    if (!header) return;

    // Registra acesso à página de detalhes
    trackPageView('Página de Detalhes');

    // Container para os botões de navegação
    const buttonsContainer = document.createElement('div');
    buttonsContainer.style.cssText = `
        display: flex;
        justify-content: center;
        gap: 20px;
        margin: 30px 0;
        flex-wrap: wrap;
    `;

    // Cria os botões de navegação
    navigationData.navigationButtons.forEach((btn, index) => {
        const button = document.createElement('button');
        button.textContent = `${btn.icon} ${btn.label}`;
        button.className = 'botoes';
        button.style.cssText = `
            background: ${btn.color};
            color: white;
            border: none;
            padding: 15px 25px;
            border-radius: 10px;
            cursor: pointer;
            font-size: 16px;
            font-weight: bold;
            min-width: 200px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        `;

        button.onclick = () => {
            showCarouselSlide(index);
            // O rastreamento será feito pelo evento slid.bs.carousel
        };
        buttonsContainer.appendChild(button);
    });

    header.insertAdjacentElement('afterend', buttonsContainer);

    // Cria o container do carrossel
    const carouselContainer = document.createElement('div');
    carouselContainer.style.cssText = `
        max-width: 900px;
        margin: 20px auto;
        padding: 30px;
        background: #f8f9fa;
        border-radius: 15px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    `;

    const carouselId = navigationData.pageInfo?.carouselId || 'paginaCarousel';
    
    const indicatorsHTML = navigationData.carouselItems.map((item, index) => `
        <button type="button" data-bs-target="#${carouselId}" data-bs-slide-to="${index}" 
                ${index === 0 ? 'class="active" aria-current="true"' : ''} 
                aria-label="Slide ${index + 1}"></button>
    `).join('');

    const itemsHTML = navigationData.carouselItems.map((item, index) => `
        <div class="carousel-item ${index === 0 ? 'active' : ''}">
            <img src="${item.image.src}" class="d-block w-100" alt="${item.image.alt}"
                 style="max-height: 500px; object-fit: contain; border-radius: 10px;">
            <div style="margin-top: 20px; text-align: left;">
                <h3 style="color: #333; font-size: 28px; margin-bottom: 10px;">
                    ${item.title}
                </h3>
                <p style="color: #666; font-size: 14px; margin-bottom: 15px;">
                    <strong>Período:</strong> ${item.period}
                </p>
                <p style="color: #555; line-height: 1.8; margin-bottom: 20px; font-size: 16px;">
                    ${item.description}
                </p>
                <div style="background: white; padding: 20px; border-radius: 10px; border-left: 4px solid #007bff;">
                    <h4 style="color: #333; font-size: 18px; margin-bottom: 15px;">
                        📋 Especificações Técnicas
                    </h4>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                        <div><strong>Material:</strong> ${item.details.material}</div>
                        <div><strong>Origem:</strong> ${item.details.origem}</div>
                        <div><strong>${item.details.peso ? 'Peso' : 'Capacidade'}:</strong> ${item.details.peso || item.details.capacidade || 'N/A'}</div>
                        <div><strong>Estado:</strong> ${item.details.conservacao}</div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    carouselContainer.innerHTML = `
        <div id="${carouselId}" class="carousel slide">
            <div class="carousel-indicators">
                ${indicatorsHTML}
            </div>
            <div class="carousel-inner">
                ${itemsHTML}
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Anterior</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#${carouselId}" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Próximo</span>
            </button>
        </div>
    `;

    buttonsContainer.insertAdjacentElement('afterend', carouselContainer);

    // Adiciona rastreamento aos eventos do carrossel
    const carouselElement = document.getElementById(carouselId);
    if (carouselElement) {
        let lastTrackedDetailSlide = -1;
        
        carouselElement.addEventListener('slid.bs.carousel', function(event) {
            const index = event.to;
            // Rastreia apenas se for um slide diferente
            if (index !== lastTrackedDetailSlide) {
                lastTrackedDetailSlide = index;
                const itemName = navigationData.carouselItems[index].title;
                trackPageView(itemName);
            }
        });
    }
}

// Função para rastrear visualizações e atualizar o servidor
async function trackPageView(itemName) {
    try {
        // Verifica se json-server está disponível
        if (!window.CONFIG || !await window.CONFIG.isJsonServerAvailable()) {
            console.log('⚠️ JSON Server não disponível - tracking desabilitado');
            return;
        }

        // Mapeia nomes para IDs no banco
        const itemMap = {
            'Armadura de Urso': '1',
            'Lavadora de 1907': '2',
            'Cortador Antigo': '3',
            'Página Principal': '4',
            'Página de Detalhes': '5'
        };

        const itemId = itemMap[itemName];
        if (!itemId) {
            console.log('Item não mapeado:', itemName);
            return;
        }

        // Busca o item atual
        const response = await fetch(`${window.CONFIG.API_BASE_URL}/acessos/${itemId}`);
        if (!response.ok) return;

        const item = await response.json();
        
        // Incrementa as visualizações
        const updatedItem = {
            ...item,
            visualizacoes: item.visualizacoes + 1,
            ultimoAcesso: new Date().toISOString()
        };

        // Atualiza no servidor
        await fetch(`${window.CONFIG.API_BASE_URL}/acessos/${itemId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedItem)
        });

        // Atualiza as estatísticas gerais
        await updateStats();

        console.log(`✅ Visualização registrada: ${itemName} (${updatedItem.visualizacoes})`);
    } catch (error) {
        console.error('Erro ao rastrear visualização:', error);
    }
}

// Atualiza as estatísticas gerais
async function updateStats() {
    try {
        const response = await fetch(`${window.CONFIG.API_BASE_URL}/acessos`);
        const acessos = await response.json();

        const totalVisualizacoes = acessos.reduce((sum, item) => sum + item.visualizacoes, 0);
        
        const itemMaisAcessado = acessos.reduce((max, item) => 
            item.visualizacoes > max.visualizacoes ? item : max
        );

        const reliquias = acessos.filter(item => 
            ['medieval', 'industrial', 'culinario'].includes(item.categoria)
        );
        const reliquiaMaisAcessada = reliquias.reduce((max, item) => 
            item.visualizacoes > max.visualizacoes ? item : max
        );

        const stats = {
            totalVisualizacoes,
            itemMaisAcessado: itemMaisAcessado.item,
            reliquiaMaisAcessada: reliquiaMaisAcessada.item,
            periodo: "Última semana"
        };

        await fetch(`${window.CONFIG.API_BASE_URL}/estatisticas`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(stats)
        });
    } catch (error) {
        console.error('Erro ao atualizar estatísticas:', error);
    }
}

function showCarouselSlide(index) {
    const { navigationData } = window;
    const carouselId = navigationData?.pageInfo?.carouselId || 'paginaCarousel';
    const carouselElement = document.getElementById(carouselId);
    
    if (carouselElement) {
        const carousel = bootstrap.Carousel.getInstance(carouselElement) || 
                        new bootstrap.Carousel(carouselElement);
        carousel.to(index);
    }
}

// Exporta funções globalmente
window.showCarouselSlide = showCarouselSlide;
window.trackPageView = trackPageView;
