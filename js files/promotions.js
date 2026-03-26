document.addEventListener('DOMContentLoaded', () => {
    const CHECKOUT_STORAGE_KEY = 'checkoutItem';
    const buyButtons = document.querySelectorAll('.buy-btn');

    const parsePrice = (text) => {
        const match = text.match(/(\d+(?:\.\d+)?)\s*евро/);
        return match ? Number.parseFloat(match[1]) : 0;
    };

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
                price: parsePrice(productCard.querySelector('.new-price')?.textContent ?? ''),
                image: productCard.querySelector('.product-image')?.src ?? '',
                quantity,
            };

            goToCheckout(product);
        });
    });

    const promotions = [
        { id: 'promo1', endTime: Date.now() + (24 * 60 * 60 * 1000) },
        { id: 'promo2', endTime: Date.now() + (48 * 60 * 60 * 1000) },
        { id: 'promo3', endTime: Date.now() + (72 * 60 * 60 * 1000) },
        { id: 'promo4', endTime: Date.now() + (96 * 60 * 60 * 1000) },
    ];

    promotions.forEach((promo) => {
        const timerElement = document.getElementById(`timer-${promo.id}`);
        if (!timerElement) {
            return;
        }

        const updateCountdown = () => {
            const distance = promo.endTime - Date.now();

            if (distance < 0) {
                timerElement.textContent = 'Изтекла';
                clearInterval(intervalId);
                return;
            }

            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            timerElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes
                .toString()
                .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        };

        updateCountdown();
        const intervalId = setInterval(updateCountdown, 1000);
    });
});
