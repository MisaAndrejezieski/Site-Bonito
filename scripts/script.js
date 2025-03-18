// Função para carregar imagens dinamicamente
function loadImages() {
    const imageGrid = document.querySelector('.image-grid');
    if (!imageGrid) return; // Se não houver galeria, sai da função

    // Número total de imagens (ajuste conforme necessário)
    const totalImages = 20; // Exemplo: 20 imagens

    for (let i = 1; i <= totalImages; i++) {
        const imageNumber = i.toString().padStart(3, '0'); // Formata para a001, a002, etc.
        const imageUrl = `images/a${imageNumber}.jpg`;

        // Cria um elemento de imagem e adiciona à galeria
        const imgElement = document.createElement('img');
        imgElement.src = imageUrl;
        imgElement.alt = `Imagem ${imageNumber}`;
        imgElement.loading = "lazy"; // Carregamento otimizado
        imageGrid.appendChild(imgElement);
    }
}

// Executa a função ao carregar a página
window.addEventListener('load', loadImages);
