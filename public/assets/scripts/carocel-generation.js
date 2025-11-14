// Inicializa assim que os dados estiverem prontos
async function initCarousel() {
    try {
        // Se os dados já estiverem carregados, usa imediatamente
        if (window.siteData) {
            console.log('✅ Dados já disponíveis');
        } else {
            // Senão, aguarda o carregamento
            await waitForData();
        }
    } catch (error) {
        console.error('❌ Erro ao carregar dados:', error);
        return;
    }

    const siteData = window.siteData;

    if (!siteData) {
        console.error('❌ siteData não disponível');
        return;
    }

    function generateCarousel() {
        const carouselContainer = document.getElementById('myCarousel') || document.querySelector('.carousel-container');
        if (!carouselContainer) {
            console.log('Container do carrossel não encontrado nesta página');
            return;
        }

        const carouselData = siteData.mainContent && siteData.mainContent.carousel;
        if (!carouselData || !Array.isArray(carouselData.items) || carouselData.items.length === 0) {
            console.log('Dados do carrossel não disponíveis nesta página');
            return;
        }

        const carouselId = carouselData.id || carouselContainer.id || 'myCarouselInner';

        if (!carouselData.items.some(i => i.active)) {
            carouselData.items[0].active = true;
        }

        const indicatorsHTML = carouselData.items.map((item, index) => {
            const activeClass = item.active ? 'active' : '';
            const ariaCurrent = item.active ? 'aria-current="true"' : '';
            return `<button type="button" data-bs-target="#${carouselId}" data-bs-slide-to="${index}" class="${activeClass}" ${ariaCurrent} aria-label="Slide ${index + 1}"></button>`;
        }).join('');

        const itemsHTML = carouselData.items.map(item => {
            const activeClass = item.active ? 'active' : '';
            const styleAttr = item.style ? `style="${item.style}"` : '';
            const imgSrc = item.image && item.image.src ? item.image.src : '';
            const imgAlt = item.image && item.image.alt ? item.image.alt : '';
            const imgTitle = item.image && item.image.title ? item.image.title : '';
            const imgDesc = item.image && item.image.description ? item.image.description : '';
            return `
                <div class="carousel-item ${activeClass}">
                    <img src="${imgSrc}" class="d-block w-100 carousel-img" alt="${imgAlt}" ${styleAttr}>
                    <div class="carousel-caption d-none d-md-block">
                        <h5>${imgTitle}</h5>
                        <p>${imgDesc}</p>
                    </div>
                </div>
            `;
        }).join('');

        const carouselHTML = `
            <div id="${carouselId}" class="carousel slide">
                <div class="carousel-indicators">
                    ${indicatorsHTML}
                </div>
                <div class="carousel-inner">
                    ${itemsHTML}
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">${(carouselData.controls && carouselData.controls.previous && carouselData.controls.previous.text) || 'Previous'}</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#${carouselId}" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">${(carouselData.controls && carouselData.controls.next && carouselData.controls.next.text) || 'Next'}</span>
                </button>
            </div>
        `;

        carouselContainer.innerHTML = carouselHTML;

        const carouselElement = document.getElementById(carouselId);
        if (!carouselElement) {
            console.error('Elemento do carrossel não criado corretamente');
            return;
        }

        const carousel = new bootstrap.Carousel(carouselElement, {
            interval: false,
            wrap: true,
            keyboard: true,
            pause: false
        });

        addCarouselEvents(carouselElement, carousel);

        console.log('Carrossel gerado dinamicamente com sucesso!');
    }

    function addCarouselEvents(carouselElement, carouselInstance) {
        let lastTrackedSlide = -1;
        
        carouselElement.addEventListener('slid.bs.carousel', function (event) {
            const idx = event.to;
            const slideData = siteData.mainContent.carousel.items[idx];
            console.log(`Agora visualizando: ${slideData && slideData.image && slideData.image.title}`);
            
            // Rastreia apenas uma vez por slide
            if (slideData && slideData.image && slideData.image.title && idx !== lastTrackedSlide) {
                lastTrackedSlide = idx;
                trackIndexView(slideData.image.title);
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                carouselInstance.prev();
            } else if (e.key === 'ArrowRight') {
                carouselInstance.next();
            }
        });

        carouselElement.addEventListener('mouseenter', function() {
            carouselInstance.pause();
        });

        carouselElement.addEventListener('mouseleave', function() {
            carouselInstance.cycle();
        });

        const images = carouselElement.querySelectorAll('img');
        images.forEach(img => {
            img.addEventListener('error', function() {
                console.warn(`Imagem não encontrada: ${this.src}`);
                this.alt = 'Imagem não disponível';
                this.style.backgroundColor = '#f8f9fa';
                this.style.border = '2px dashed #dee2e6';
                this.style.minHeight = '200px';
            });
        });
    }

    function generateNavigation() {
        if (!siteData.navigation || !Array.isArray(siteData.navigation.items)) return;
        const nav = document.querySelector('nav .navbar-nav') || document.querySelector('nav');
        if (!nav) return;

        const ul = nav.tagName === 'UL' ? nav : document.createElement('ul');
        ul.className = 'navbar-nav';
        ul.innerHTML = '';
        
        siteData.navigation.items.forEach(item => {
            const li = document.createElement('li');
            li.className = 'nav-item';
            const a = document.createElement('a');
            a.className = 'nav-link';
            a.href = item.href || '#';
            a.textContent = item.text || item.label || '';
            li.appendChild(a);
            ul.appendChild(li);
        });

        if (nav.tagName !== 'UL') {
            nav.innerHTML = '';
            nav.appendChild(ul);
        }
    }

    function updatePageContent() {
        if (siteData.metadata && siteData.metadata.title) {
            document.title = siteData.metadata.title;
        }

        const mainTitle = document.querySelector('header h1');
        if (mainTitle && siteData.header && siteData.header.mainTitle) {
            mainTitle.textContent = siteData.header.mainTitle;
        }

        const subtitle = document.querySelector('.container h2, main h2');
        if (subtitle && siteData.mainContent && siteData.mainContent.subtitle) {
            subtitle.textContent = siteData.mainContent.subtitle;
        }

        const description = document.querySelector('.container > p, main > p');
        if (description && siteData.mainContent && siteData.mainContent.description) {
            description.innerHTML = siteData.mainContent.description.replace(/\n/g, '<br>');
        }

        const footerText = document.querySelector('footer p');
        if (footerText && siteData.footer && siteData.footer.author) {
            const a = siteData.footer.author;
            footerText.innerHTML = `AUTOR: ${a.name} - ${a.year}<br>${a.role} da ${a.institution}`;
        }

        console.log('Conteúdo atualizado para:', document.title);
    }

    generateNavigation();
    generateCarousel();
    updatePageContent();

    // Registra visualização da página principal
    trackIndexView('Página Principal');

    window.carouselUtils = {
        regenerateCarousel: generateCarousel,
        updateContent: updatePageContent,
        getData: () => siteData
    };
}

// Inicia quando DOM e dados estiverem prontos (o que vier depois)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (window.siteData) {
            initCarousel();
        } else {
            window.addEventListener('dataReady', initCarousel, { once: true });
        }
    });
} else {
    // DOM já carregado
    if (window.siteData) {
        initCarousel();
    } else {
        window.addEventListener('dataReady', initCarousel, { once: true });
    }
}

// Função para rastrear visualizações no index
async function trackIndexView(itemName) {
    try {
        // Verifica se json-server está disponível
        if (!window.CONFIG || !await window.CONFIG.isJsonServerAvailable()) {
            console.log('⚠️ JSON Server não disponível - tracking desabilitado');
            return;
        }

        const itemMap = {
            'Armadura de Urso': '1',
            'Lavadora de 1907': '2',
            'Cortador Antigo': '3',
            'Página Principal': '4'
        };

        const itemId = itemMap[itemName];
        if (!itemId) return;

        const response = await fetch(`${window.CONFIG.API_BASE_URL}/acessos/${itemId}`);
        if (!response.ok) return;

        const item = await response.json();
        
        const updatedItem = {
            ...item,
            visualizacoes: item.visualizacoes + 1,
            ultimoAcesso: new Date().toISOString()
        };

        await fetch(`${window.CONFIG.API_BASE_URL}/acessos/${itemId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedItem)
        });

        console.log(`✅ Visualização registrada: ${itemName} (${updatedItem.visualizacoes})`);
    } catch (error) {
        console.error('Erro ao rastrear visualização:', error);
    }
}
