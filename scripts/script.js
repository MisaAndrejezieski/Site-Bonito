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

    const totalImages = 20; // Número total de imagens

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
    e.preventDefault();

    if (e.deltaY > 0) {
        // Scroll para baixo
        currentPageIndex = Math.min(currentPageIndex + 1, pages.length - 1);
    } else {
        // Scroll para cima
        currentPageIndex = Math.max(currentPageIndex - 1, 0);
    }

    showPage(currentPageIndex);
});

// Inicialização
window.addEventListener('load', () => {
    showPage(currentPageIndex);
    loadImages();
});
