/* ============================================
   Urban Threads - Cart JavaScript
   Shared cart logic for product pages
   (man, woman, summer, formal, trending, accessories, contect)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const cartButton = document.getElementById('cart-button');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCountEl = document.getElementById('cart-count');
    const cartSubtotalEl = document.getElementById('cart-subtotal');
    const toastContainer = document.getElementById('toast-container');

    // --- State ---
    let cart = JSON.parse(localStorage.getItem('urbanThreadsCart')) || [];

    // --- Cart Visibility ---
    const toggleCart = () => {
        cartSidebar.classList.toggle('translate-x-full');
        cartOverlay.classList.toggle('opacity-0');
        cartOverlay.classList.toggle('invisible');
        document.body.classList.toggle('overflow-hidden');
    };

    if (cartButton) {
        cartButton.addEventListener('click', (e) => {
            e.preventDefault();
            toggleCart();
        });
    }
    if (closeCartBtn) closeCartBtn.addEventListener('click', toggleCart);
    if (cartOverlay) cartOverlay.addEventListener('click', toggleCart);

    // --- Toast Notification ---
    const showToast = (message) => {
        if (!toastContainer) return;
        const toast = document.createElement('div');
        toast.className = 'bg-black text-white py-2 px-5 rounded-lg shadow-lg opacity-0 transform translate-y-2 transition-all duration-300';
        toast.textContent = message;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.classList.remove('opacity-0', 'translate-y-2');
        }, 10);

        setTimeout(() => {
            toast.classList.add('opacity-0', 'translate-y-2');
            toast.addEventListener('transitionend', () => toast.remove());
        }, 3000);
    };

    // --- Cart Functionality ---
    const renderCart = () => {
        cartItemsContainer.innerHTML = '';
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="text-gray-500 text-center mt-8">Your cart is empty.</p>';
        } else {
            cart.forEach(item => {
                const cartItemEl = document.createElement('div');
                cartItemEl.className = 'flex items-center gap-4 py-4 border-b cart-item';
                cartItemEl.dataset.id = item.id;
                cartItemEl.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="w-20 h-24 object-cover rounded-md">
                    <div class="flex-grow">
                        <h4 class="font-semibold">${item.name}</h4>
                        <p class="text-gray-500 text-sm">$${item.price.toFixed(2)}</p>
                        <div class="flex items-center gap-2 mt-2 cart-item-quantity">
                            <button class="quantity-decrease border rounded-full text-lg w-7 h-7 flex items-center justify-center">-</button>
                            <span class="font-medium w-8 text-center">${item.quantity}</span>
                            <button class="quantity-increase border rounded-full text-lg w-7 h-7 flex items-center justify-center">+</button>
                        </div>
                    </div>
                    <div class="text-right">
                        <p class="font-bold">$${(item.price * item.quantity).toFixed(2)}</p>
                        <button class="remove-item text-red-500 hover:text-red-700 text-sm mt-2">Remove</button>
                    </div>
                `;
                cartItemsContainer.appendChild(cartItemEl);
            });
        }
        updateCartSummary();
    };

    const updateCartSummary = () => {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartCountEl.textContent = totalItems;
        cartSubtotalEl.textContent = `$${subtotal.toFixed(2)}`;
        localStorage.setItem('urbanThreadsCart', JSON.stringify(cart));
    };

    const updateQuantity = (id, newQuantity) => {
        const item = cart.find(item => item.id === id);
        if (item) {
            if (newQuantity <= 0) {
                cart = cart.filter(cartItem => cartItem.id !== id);
            } else {
                item.quantity = newQuantity;
            }
        }
        renderCart();
    };

    // --- Event Delegation ---
    document.body.addEventListener('click', (e) => {
        // Add to Cart button
        if (e.target.closest('.add-to-cart-btn')) {
            const productCard = e.target.closest('.product-card');
            const id = productCard.dataset.id;
            const name = productCard.dataset.name;
            const price = parseFloat(productCard.dataset.price);
            const image = productCard.querySelector('img').src;

            const existingItem = cart.find(item => item.id === id);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ id, name, price, image, quantity: 1 });
            }

            renderCart();
            showToast(`${name} added to cart!`);
        }

        // Cart item actions
        if (e.target.closest('.cart-item')) {
            const itemEl = e.target.closest('.cart-item');
            const id = itemEl.dataset.id;
            const item = cart.find(i => i.id === id);

            if (e.target.closest('.quantity-increase')) {
                updateQuantity(id, item.quantity + 1);
            }
            if (e.target.closest('.quantity-decrease')) {
                updateQuantity(id, item.quantity - 1);
            }
            if (e.target.closest('.remove-item')) {
                updateQuantity(id, 0);
            }
        }
    });

    // --- Initial Load ---
    renderCart();
});
