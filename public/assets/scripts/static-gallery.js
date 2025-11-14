document.addEventListener('DOMContentLoaded', async function() {
    
    console.log('🔄 Aguardando carregamento dos dados JSON...');
    
    await new Promise(resolve => {
        const checkData = () => {
            if (typeof waitForData === 'function') {
                resolve();
            } else {
                setTimeout(checkData, 100);
            }
        };
        checkData();
    });
    
    const { siteData, navigationData } = await waitForData();
    
    if (!navigationData || !navigationData.carouselItems) {
        console.error('❌ Dados de navegação não foram carregados corretamente');
        return;
    }

    console.log('✅ Dados carregados, iniciando galeria...');

    // Salvar dados no localStorage para usar em detalhe.html
    localStorage.setItem('galleryData', JSON.stringify(navigationData));

    function createItemsGallery() {
        const container = document.createElement('div');
        container.style.cssText = `
            max-width: 1200px;
            margin: 30px auto;
            padding: 20px;
        `;

        const title = document.createElement('h3');
        title.textContent = 'Nossa Coleção de Relíquias';
        title.style.cssText = `
            text-align: center;
            margin-bottom: 30px;
            font-size: 28px;
            color: #333;
        `;
        container.appendChild(title);

        const itemsContainer = document.createElement('div');
        itemsContainer.style.cssText = `
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 30px;
            margin: 0 auto;
        `;

        navigationData.carouselItems.forEach((item, index) => {
            const itemCard = document.createElement('div');
            itemCard.classList.add('item-card');
            itemCard.dataset.category = navigationData.navigationButtons[index]?.category || 'geral';
            itemCard.dataset.index = index;
            itemCard.style.cssText = `
                background: white;
                border-radius: 15px;
                box-shadow: 0 8px 20px rgba(0,0,0,0.1);
                overflow: hidden;
                border: 2px solid #f0f0f0;
                cursor: pointer;
            `;

            // Adicionar clique para ir para detalhe.html
            itemCard.onclick = function() {
                window.location.href = `detalhe.html?id=${index}`;
            };

            const buttonData = navigationData.navigationButtons[index] || {};
            itemCard.innerHTML = `
                <div style="position: relative; overflow: hidden;">
                    <img src="${item.image.src}" 
                         alt="${item.image.alt}"
                         style="
                            width: 100%; 
                            height: 250px; 
                            object-fit: cover;
                         ">
                    <div style="
                        position: absolute;
                        top: 15px;
                        right: 15px;
                        background: rgba(0,0,0,0.7);
                        color: white;
                        padding: 8px 12px;
                        border-radius: 20px;
                        font-size: 18px;
                    ">
                        ${buttonData.icon || '🏺'}
                    </div>
                </div>
                
                <div style="padding: 25px;">
                    <div style="
                        display: flex;
                        align-items: center;
                        margin-bottom: 15px;
                    ">
                        <h4 style="
                            margin: 0;
                            color: #333;
                            font-size: 22px;
                            font-weight: bold;
                            flex: 1;
                        ">${item.title}</h4>
                        <span style="
                            background: ${buttonData.color || '#666'};
                            color: white;
                            padding: 4px 8px;
                            border-radius: 12px;
                            font-size: 12px;
                            font-weight: bold;
                        ">${item.period}</span>
                    </div>
                    
                    <p style="
                        color: #666;
                        line-height: 1.6;
                        margin-bottom: 20px;
                        font-size: 15px;
                    ">${item.description}</p>
                    
                    <button style="
                        width: 100%;
                        background: ${buttonData.color || '#666'};
                        color: white;
                        padding: 12px;
                        border: none;
                        border-radius: 8px;
                        font-size: 16px;
                        font-weight: bold;
                        cursor: pointer;
                    ">
                        Ver Detalhes Completos →
                    </button>
                </div>
            `;

            itemsContainer.appendChild(itemCard);
        });

        container.appendChild(itemsContainer);
        return container;
    }

    function createFilterButtons() {
        const filterContainer = document.createElement('div');
        filterContainer.style.cssText = `
            text-align: center;
            margin: 20px 0;
        `;

        const filterTitle = document.createElement('h4');
        filterTitle.textContent = 'Filtrar por Categoria:';
        filterTitle.style.cssText = `
            margin-bottom: 15px;
            color: rgb(147, 13, 13);
            font-family: Georgia, serif;
        `;
        filterContainer.appendChild(filterTitle);

        const buttonsContainer = document.createElement('div');
        buttonsContainer.style.cssText = `
            display: flex;
            justify-content: center;
            gap: 15px;
            flex-wrap: wrap;
        `;

        const allButton = document.createElement('button');
        allButton.textContent = '🔍 Todos os Itens';
        allButton.className = 'botoes';
        allButton.onclick = () => showAllItems();
        buttonsContainer.appendChild(allButton);

        const categories = ['medieval', 'industrial', 'culinario'];
        const categoryNames = ['Medieval', 'Industrial', 'Culinário'];
        const categoryIcons = ['🛡️', '🔧', '🔪'];

        categories.forEach((category, index) => {
            const btn = document.createElement('button');
            btn.textContent = `${categoryIcons[index]} ${categoryNames[index]}`;
            btn.className = 'botoes';
            btn.onclick = () => filterByCategory(category);
            buttonsContainer.appendChild(btn);
        });

        filterContainer.appendChild(buttonsContainer);
        return filterContainer;
    }

    function showAllItems() {
        const items = document.querySelectorAll('.item-card');
        items.forEach(item => {
            item.style.display = 'block';
        });
    }

    function filterByCategory(category) {
        const items = document.querySelectorAll('.item-card');
        items.forEach((item) => {
            const itemCategory = item.dataset.category;
            item.style.display = itemCategory === category ? 'block' : 'none';
        });
    }

    function initializeStaticPage() {
        const header = document.querySelector('header');
        if (!header) {
            console.error('Header não encontrado');
            return;
        }

        const filterButtons = createFilterButtons();
        header.insertAdjacentElement('afterend', filterButtons);

        const gallery = createItemsGallery();
        filterButtons.insertAdjacentElement('afterend', gallery);

        console.log('✅ Galeria estática de itens criada com sucesso!');
    }

    initializeStaticPage();

    window.staticGallery = {
        showAll: showAllItems,
        filterBy: filterByCategory,
        data: navigationData
    };
});
