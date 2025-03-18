// Função para carregar conteúdo dinamicamente
function loadPage(url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.querySelector('main').innerHTML = data;
            history.pushState({}, '', url); // Atualiza a URL sem recarregar
        })
        .catch(error => console.error('Erro ao carregar a página:', error));
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
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});
