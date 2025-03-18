let currentPageIndex = 0;
const pages = document.querySelectorAll('.page');
const totalImages = 12; // Número total de imagens
const background = document.querySelector('.background');

// Função para mostrar a página atual
function showPage(index) {
    pages.forEach((page, i) => {
        if (i === index) {
            page.classList.add('active');
        } else {
            page.classList.remove('active');
        }
    });
}

// Função para carregar imagens de fundo dinamicamente
function loadBackground() {
    const imageNumber = (currentPageIndex % totalImages) + 1; // Alterna entre as 12 imagens
    const imageUrl = `images/a${imageNumber.toString().padStart(3, '0')}.jpg`;
    background.style.backgroundImage = `url('${imageUrl}')`;
}

// Controle de scroll personalizado
window.addEventListener('wheel', (e) => {
    const currentPage = pages[currentPageIndex];
    const isScrollingDown = e.deltaY > 0;

    // Verifica se o usuário está no topo ou no final da página
    const isAtTop = currentPage.scrollTop === 0;
    const isAtBottom = currentPage.scrollTop + currentPage.clientHeight >= currentPage.scrollHeight;

    if (isScrollingDown && isAtBottom) {
        // Scroll para baixo: vai para a próxima página
        currentPageIndex = Math.min(currentPageIndex + 1, pages.length - 1);
        showPage(currentPageIndex);
        loadBackground(); // Atualiza o fundo ao trocar de página
    } else if (!isScrollingDown && isAtTop) {
        // Scroll para cima: volta para a página anterior
        currentPageIndex = Math.max(currentPageIndex - 1, 0);
        showPage(currentPageIndex);
        loadBackground(); // Atualiza o fundo ao trocar de página
    }
});

// Inicialização
window.addEventListener('load', () => {
    showPage(currentPageIndex);
    loadBackground();
});
