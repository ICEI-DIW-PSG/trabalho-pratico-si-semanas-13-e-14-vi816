document.addEventListener('DOMContentLoaded', function() {
    
    var btnDetalhe = document.getElementById('mudar');
    if (btnDetalhe) {
        btnDetalhe.addEventListener('click', function() {
            window.location.href = "detalhe.html";
        });
    }
    
    var btnVoltar = document.getElementById('voltar');
    if (btnVoltar) {
        btnVoltar.addEventListener('click', function() {
            window.location.href = "index.html";
        });
    }
});
