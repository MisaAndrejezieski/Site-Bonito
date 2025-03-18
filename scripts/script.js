// Função para carregar conteúdo dinamicamente
function loadPage(url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar a página');
            }
            return response.text();
        })
        .then(data => {
            // Extrai apenas o conteúdo do <main> da página carregada
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const newContent = doc.querySelector('main').innerHTML;

            // Atualiza o conteúdo da página atual
            document.querySelector('main').innerHTML = newContent;

            // Atualiza a URL no navegador sem recarregar a página
            history.pushState({}, '', url);
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao carregar a página. Verifique o console para mais detalhes.');
        });
}

// Intercepta cliques nos links do menu
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Evita o comportamento padrão do link
        const href = link.getAttribute('href');
        loadPage(href);
    });
});

// Atualiza o conteúdo ao navegar no histórico
window.addEventListener('popstate', () => {
    loadPage(window.location.pathname);
});

// Rolagem suave para links âncora
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
