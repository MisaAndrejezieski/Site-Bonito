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

// Inicialização
window.addEventListener('load', () => {
    loadImages();
});
