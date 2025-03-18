let currentPageIndex = 0;
const pages = document.querySelectorAll('.page');

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

// Função para carregar imagens dinamicamente
function loadImages() {
    const imageGrid = document.querySelector('.image-grid');
    if (!imageGrid) return;

    const totalImages = 12; // Número total de imagens

    for (let i = 1; i <= totalImages; i++) {
        const imageNumber = i.toString().padStart(3, '0');
        const imageUrl = `images/a${imageNumber}.jpg`;

        const imgElement = document.createElement('img');
        imgElement.src = imageUrl;
        imgElement.alt = `Imagem ${imageNumber}`;
        imgElement.loading = "lazy";
        imageGrid.appendChild(imgElement);
    }
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
    } else if (!isScrollingDown && isAtTop) {
        // Scroll para cima: volta para a página anterior
        currentPageIndex = Math.max(currentPageIndex - 1, 0);
        showPage(currentPageIndex);
    }
});

// Inicialização
window.addEventListener('load', () => {
    showPage(currentPageIndex);
    loadImages();
});
