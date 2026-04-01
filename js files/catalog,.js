document.addEventListener('DOMContentLoaded', () => {
    const CHECKOUT_STORAGE_KEY = 'checkoutItem';
    const buyButtons = document.querySelectorAll('.buy-btn');
    const searchInput = document.getElementById('search-input');
    const productCards = document.querySelectorAll('.catalog-container .product-card');
    const filterButtons = document.querySelectorAll('.catalog-filter');
    const catalogContainer = document.querySelector('.catalog-container');
    let activeCategory = 'all';

    const goToCheckout = (product) => {
        localStorage.setItem(CHECKOUT_STORAGE_KEY, JSON.stringify(product));
        window.location.href = 'payment.html';
    };

    buyButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const productCard = button.closest('.product-card');
            const quantityInput = productCard.querySelector('.quantity-input');
            let quantity = Number.parseInt(quantityInput?.value ?? '1', 10);

            if (Number.isNaN(quantity) || quantity < 1) {
                quantity = 1;
                if (quantityInput) {
                    quantityInput.value = '1';
                }
            }
 if (quantity > 5) {
    alert('Няма наличност за повече от 5 броя.');
    return;
}
            const product = {
                id: productCard.dataset.id,
                name: productCard.querySelector('.product-name')?.textContent.trim() ?? '',
                price: Number.parseFloat(
                    (productCard.querySelector('.product-price')?.textContent ?? '')
                        .replace('Цена: ', '')
                        .replace(' евро', '')
                ) || 0,
                image: productCard.querySelector('.product-image')?.src ?? '',
                quantity,
            };

            goToCheckout(product);
        });
    });

    if (searchInput && catalogContainer) {
        const noResultsMessage = document.createElement('p');
        noResultsMessage.classList.add('catalog-no-results');
        noResultsMessage.textContent = 'Нямаме такъв продукт';
        catalogContainer.appendChild(noResultsMessage);

        const applyFilters = () => {
            const filter = searchInput.value.toLowerCase();
            let found = false;

            productCards.forEach((card) => {
                const nameText = card.querySelector('.product-name')?.textContent.toLowerCase() ?? '';
                const descriptionText = card.querySelector('.product-description')?.textContent.toLowerCase() ?? '';
                const category = card.dataset.category ?? '';
                const matchesSearch = nameText.includes(filter) || descriptionText.includes(filter);
                const matchesCategory = activeCategory === 'all' || category === activeCategory;
                const isMatch = matchesSearch && matchesCategory;

                card.style.display = isMatch ? '' : 'none';
                if (isMatch) {
                    found = true;
                }
            });

            noResultsMessage.style.display = found ? 'none' : 'block';
        };

        searchInput.addEventListener('input', applyFilters);

        filterButtons.forEach((button) => {
            button.addEventListener('click', () => {
                activeCategory = button.dataset.filter ?? 'all';
                filterButtons.forEach((btn) => btn.classList.remove('is-active'));
                button.classList.add('is-active');
                applyFilters();
            });
        });

        applyFilters();
    }

    const scrollToTopButton = document.getElementById('scroll-to-top-btn');

    if (scrollToTopButton) {
        scrollToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Fallback for browsers that do not consistently honor smooth scroll on document root.
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        });
    }


});
