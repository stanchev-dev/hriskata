document.addEventListener('DOMContentLoaded', () => {
    const CHECKOUT_STORAGE_KEY = 'checkoutItem';
    const orderItemsContainer = document.getElementById('order-items');
    const orderTotal = document.getElementById('order-total');
    const paymentForm = document.getElementById('payment-form');
    const paymentFormWrapper = document.querySelector('.payment-form');

    const storedCheckoutItem = localStorage.getItem(CHECKOUT_STORAGE_KEY);
    const orderItems = storedCheckoutItem ? [JSON.parse(storedCheckoutItem)] : [];

    const calculateTotal = () => orderItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const renderOrderSummary = () => {
        orderItemsContainer.innerHTML = '';

        if (orderItems.length === 0) {
            orderItemsContainer.innerHTML = '<p>Няма избран продукт за плащане.</p>';
            paymentFormWrapper.style.display = 'none';
            orderTotal.textContent = '0 евро';
            return;
        }

        paymentFormWrapper.style.display = 'block';

        orderItems.forEach((item) => {
            const listItem = document.createElement('li');
            listItem.classList.add('order-item');

            const itemContainer = document.createElement('div');
            itemContainer.style.display = 'flex';
            itemContainer.style.alignItems = 'center';
            itemContainer.style.marginBottom = '10px';

            const img = document.createElement('img');
            img.src = item.image;
            img.alt = item.name;
            img.classList.add('order-item-image');
            img.loading = 'lazy';

            const detailsDiv = document.createElement('div');
            detailsDiv.classList.add('order-item-details');

            const name = document.createElement('span');
            name.textContent = item.name;
            name.style.display = 'block';
            name.style.fontWeight = 'bold';

            const quantity = document.createElement('span');
            quantity.textContent = `Количество: ${item.quantity}`;

            const price = document.createElement('span');
            price.textContent = `Цена: ${item.price * item.quantity} евро`;

            detailsDiv.append(name, quantity, price);
            itemContainer.append(img, detailsDiv);
            listItem.appendChild(itemContainer);
            orderItemsContainer.appendChild(listItem);
        });

        orderTotal.textContent = `${calculateTotal()} евро`;
    };

    paymentForm.addEventListener('submit', (event) => {
        event.preventDefault();

        if (orderItems.length === 0) {
            return;
        }

        localStorage.removeItem(CHECKOUT_STORAGE_KEY);
        paymentForm.reset();
        window.location.href = 'thankyou.html';
    });

    renderOrderSummary();
});
