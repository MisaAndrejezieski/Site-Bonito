let currentPageIndex = 0;
const pages = document.querySelectorAll('.page');
const totalImages = 12;
const background = document.querySelector('.background');
const navLinks = document.querySelectorAll('.nav-link');

function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

async function loadBackground() {
    const imageNumber = (currentPageIndex % totalImages) + 1;
    const imageUrl = `images/a${imageNumber.toString().padStart(3, '0')}.jpg`;
    try {
        await preloadImage(imageUrl);
        background.style.backgroundImage = `url('${imageUrl}')`;
    } catch (error) {
        console.error(`Erro ao carregar a imagem: ${imageUrl}`);
    }
}

function preloadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = resolve;
        img.onerror = reject;
    });
}

function showPage(index) {
    pages.forEach((page, i) => {
        page.classList.toggle('active', i === index);
    });
    navLinks.forEach((link, i) => {
        link.classList.toggle('active', i === index);
        link.setAttribute('aria-current', i === index ? 'page' : null);
    });
}

window.addEventListener('wheel', debounce(() => {
    const currentPage = pages[currentPageIndex];
    const isScrollingDown = e.deltaY > 0;
    const isAtTop = currentPage.scrollTop === 0;
    const isAtBottom = currentPage.scrollTop + currentPage.clientHeight >= currentPage.scrollHeight;

    if (isScrollingDown && isAtBottom) {
        currentPageIndex = Math.min(currentPageIndex + 1, pages.length - 1);
    } else if (!isScrollingDown && isAtTop) {
        currentPageIndex = Math.max(currentPageIndex - 1, 0);
    }
    showPage(currentPageIndex);
    loadBackground();
}, 100));

window.addEventListener('load', () => {
    showPage(currentPageIndex);
    loadBackground();
});
