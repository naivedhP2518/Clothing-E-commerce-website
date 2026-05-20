/* ============================================
   Urban Threads - Common JavaScript
   Shared across all pages
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Feather Icons
    feather.replace();

    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
});
