let siteData = null;
let navigationData = null;
let dataLoaded = false;
let loadingPromise = null;

async function loadJSONData() {
    if (loadingPromise) {
        return loadingPromise;
    }
    
    loadingPromise = (async () => {
        try {
            console.log('🔄 Carregando JSON...');

            // Carrega ambos os arquivos em paralelo para melhor performance
            const [dadosResponse, navResponse] = await Promise.all([
                fetch('dados.json', { cache: 'no-cache' }),
                fetch('navegaçao.json', { cache: 'no-cache' })
            ]);

            if (!dadosResponse.ok) {
                throw new Error(`Erro ao carregar dados.json: ${dadosResponse.status}`);
            }
            if (!navResponse.ok) {
                throw new Error(`Erro ao carregar navegaçao.json: ${navResponse.status}`);
            }

            [siteData, navigationData] = await Promise.all([
                dadosResponse.json(),
                navResponse.json()
            ]);

            dataLoaded = true;
            console.log('✅ JSON carregado');
            
            return { siteData, navigationData };
        } catch (error) {
            console.error('❌ Erro ao carregar JSON:', error);
            loadingPromise = null;
            throw error;
        }
    })();
    
    return loadingPromise;
}

// Função que retorna uma promessa que resolve quando os dados estiverem carregados
function waitForData() {
    return new Promise((resolve) => {
        if (dataLoaded) {
            resolve({ siteData, navigationData });
        } else {
            loadJSONData().then(() => resolve({ siteData, navigationData }));
        }
    });
}

// Exporta as funções e dados globalmente
if (typeof window !== 'undefined') {
    window.siteData = siteData;
    window.navigationData = navigationData;
    window.loadJSONData = loadJSONData;
    window.waitForData = waitForData;

    // Carrega dados imediatamente em paralelo
    loadJSONData().then(({ siteData: site, navigationData: nav }) => {
        window.siteData = site;
        window.navigationData = nav;
        
        // Dispara evento customizado para notificar que dados estão prontos
        window.dispatchEvent(new CustomEvent('dataReady', { detail: { siteData: site, navigationData: nav } }));
        console.log('✅ Dados prontos');
    }).catch(error => {
        console.error('❌ Falha no carregamento:', error);
    });
}
