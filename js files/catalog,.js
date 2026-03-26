document.addEventListener('DOMContentLoaded', () => {
    const CHECKOUT_STORAGE_KEY = 'checkoutItem';
    const buyButtons = document.querySelectorAll('.buy-btn');
    const searchInput = document.getElementById('search-input');
    const productCards = document.querySelectorAll('.catalog-container .product-card');
    const catalogContainer = document.querySelector('.catalog-container');
    const scrollToTopButton = document.getElementById('scroll-to-top-btn');

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
        noResultsMessage.textContent = 'Нямаме такъв продукт';
        noResultsMessage.style.display = 'none';
        noResultsMessage.style.textAlign = 'center';
        noResultsMessage.style.color = '#ff4d4d';
        noResultsMessage.style.fontSize = '1.2rem';
        catalogContainer.appendChild(noResultsMessage);

        searchInput.addEventListener('input', () => {
            const filter = searchInput.value.toLowerCase();
            let found = false;

            productCards.forEach((card) => {
                const nameText = card.querySelector('.product-name')?.textContent.toLowerCase() ?? '';
                const descriptionText = card.querySelector('.product-description')?.textContent.toLowerCase() ?? '';
                const isMatch = nameText.includes(filter) || descriptionText.includes(filter);

                card.style.display = isMatch ? '' : 'none';
                if (isMatch) {
                    found = true;
                }
            });

            noResultsMessage.style.display = found ? 'none' : 'block';
        });
    }

    if (scrollToTopButton) {
        const toggleScrollButton = () => {
            const shouldShow = window.scrollY > 350;
            scrollToTopButton.classList.toggle('is-visible', shouldShow);
        };

        window.addEventListener('scroll', toggleScrollButton);
        toggleScrollButton();

        scrollToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
