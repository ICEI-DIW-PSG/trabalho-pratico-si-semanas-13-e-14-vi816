// config.js - Configurações globais da aplicação

// Detecta automaticamente a URL base
function getApiBaseUrl() {
    // Se estiver rodando via json-server (porta 3000)
    if (window.location.port === '3000' || window.location.hostname === 'localhost') {
        return 'http://localhost:3000';
    }
    // Se estiver rodando via Live Server ou outro servidor
    return window.location.origin;
}

const CONFIG = {
    // URL base da API (detectada automaticamente)
    API_BASE_URL: getApiBaseUrl(),
    
    
    ENDPOINTS: {
        ACESSOS: '/acessos',
        USUARIOS: '/usuarios',
        ESTATISTICAS: '/estatisticas'
    },
    
    // Timeout para requisições (em ms)
    REQUEST_TIMEOUT: 5000,
    
    // Cache
    CACHE_BUSTING: true,
    
    // Logs
    DEBUG: true,
    
    // Detecta se json-server está disponível
    isJsonServerAvailable: async function() {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 2000);
            
            const response = await fetch(`${this.API_BASE_URL}${this.ENDPOINTS.ACESSOS}`, {
                method: 'HEAD',
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            return response.ok;
        } catch {
            return false;
        }
    }
};

// Exporta globalmente
if (typeof window !== 'undefined') {
    window.CONFIG = CONFIG;
}
