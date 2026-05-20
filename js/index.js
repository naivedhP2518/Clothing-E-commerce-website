/* ============================================
   Urban Threads - Index Page JavaScript
   Specific to the homepage (index.html)
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
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const quickViewModal = document.getElementById('quick-view-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const modalImage = document.getElementById('modal-image');
    const quickViewButtons = document.querySelectorAll('.quick-view-btn');

    let cart = [];

    // --- Quick View Modal Logic ---
    const openModal = (imageSrc) => {
        modalImage.src = imageSrc;
        quickViewModal.classList.remove('hidden');
        quickViewModal.classList.add('flex');
    };

    const closeModal = () => {
        quickViewModal.classList.add('hidden');
        quickViewModal.classList.remove('flex');
        modalImage.src = ''; // Clear src
    };

    quickViewButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card');
            const imageSrc = productCard.querySelector('img').src;
            openModal(imageSrc);
        });
    });

    closeModalBtn.addEventListener('click', closeModal);
    quickViewModal.addEventListener('click', (e) => {
        if (e.target === quickViewModal) {
            closeModal();
        }
    });

    // --- Cart Visibility ---
    const toggleCart = () => {
        cartSidebar.classList.toggle('open');
        cartOverlay.classList.toggle('open');
    };

    cartButton.addEventListener('click', toggleCart);
    closeCartBtn.addEventListener('click', toggleCart);
    cartOverlay.addEventListener('click', toggleCart);

    // --- Cart Logic ---
    const addToCart = (e) => {
        const productCard = e.target.closest('.product-card');
        const id = productCard.dataset.id;
        const name = productCard.dataset.name;
        const price = parseFloat(productCard.dataset.price);
        const image = productCard.dataset.image;

        const existingItem = cart.find(item => item.id === id);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ id, name, price, image, quantity: 1 });
        }

        renderCart();
    };

    const updateQuantity = (id, newQuantity) => {
        const item = cart.find(item => item.id === id);
        if (item) {
            if (newQuantity <= 0) {
                cart = cart.filter(item => item.id !== id);
            } else {
                item.quantity = newQuantity;
            }
        }
        renderCart();
    };

    const handleCartActions = (e) => {
        const target = e.target;
        const itemEl = target.closest('.cart-item');
        if (!itemEl) return;

        const id = itemEl.dataset.id;
        const item = cart.find(i => i.id === id);

        if (target.matches('.quantity-increase')) {
            updateQuantity(id, item.quantity + 1);
        }
        if (target.matches('.quantity-decrease')) {
            updateQuantity(id, item.quantity - 1);
        }
        if (target.matches('.remove-item')) {
            updateQuantity(id, 0); // Setting quantity to 0 removes it
        }
    };

    const renderCart = () => {
        cartItemsContainer.innerHTML = '';

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="text-gray-500 text-center">Your cart is empty.</p>';
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
                            <button class="quantity-decrease border rounded-full text-lg">-</button>
                            <span class="font-medium">${item.quantity}</span>
                            <button class="quantity-increase border rounded-full text-lg">+</button>
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
    };

    // --- Event Listeners ---
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });

    cartItemsContainer.addEventListener('click', handleCartActions);

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }

            // Close mobile menu after clicking a link
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });
    });

    // Initial Render
    renderCart();
});
