# 🧵 Urban Threads — Modern Clothing E-commerce Website

> Urban Threads is a modern, responsive e-commerce website for fashion enthusiasts. Founded in **Vadodara** in **2024**, it offers a curated collection of trendy clothing and accessories, blending timeless silhouettes with contemporary street style.

---

## 📋 Table of Contents

| # | Section |
|---|---------|
| 1 | [Features](#-features) |
| 2 | [Technologies Used](#-technologies-used) |
| 3 | [Project Structure](#-project-structure) |
| 4 | [Pages Overview](#-pages-overview) |
| 5 | [CSS Architecture](#-css-architecture) |
| 6 | [JavaScript Modules](#-javascript-modules) |
| 7 | [Image Assets](#-image-assets) |
| 8 | [Installation & Setup](#-installation--setup) |
| 9 | [Usage Guide](#-usage-guide) |
| 10 | [Contributing](#-contributing) |

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🎨 Responsive Design | Fully optimized for desktop, tablet, and mobile viewports |
| 🛍️ Product Catalog | Browse new arrivals, trending items, and curated collections |
| 🛒 Shopping Cart | Client-side cart with `localStorage` persistence across pages |
| 👀 Quick View Modals | Instant product preview without navigating away |
| 📂 Collections | Dedicated pages for Men, Women, Accessories, Summer Vibes & Workwear |
| 👤 User Accounts | Login, signup, and profile management with address book |
| 📞 Customer Support | FAQ, contact form with map, shipping info & size guide |
| ✉️ Newsletter Signup | Email subscription for latest drops and offers |
| 🎞️ Smooth Animations | Hover effects, transitions, toast notifications & micro-interactions |

---

## 🛠️ Technologies Used

| Technology | Version / Source | Purpose |
|------------|-----------------|---------|
| HTML5 | — | Semantic page structure |
| Tailwind CSS | CDN (`cdn.tailwindcss.com`) | Utility-first responsive styling |
| JavaScript | ES6+ | Interactive functionality & DOM manipulation |
| Feather Icons | CDN (`unpkg.com/feather-icons`) | Lightweight SVG icon library |
| Google Fonts | Inter (400–800) | Modern, clean typography |
| LocalStorage API | Built-in | Client-side cart data persistence |

---

## 📁 Project Structure

```
Clothing-E-commerce-website-main/
│
├── 📄 index.html               # Homepage (root entry point)
├── 📄 README.md                # Project documentation
│
├── 📁 images/                  # All image assets (29 files)
│   ├── Hero Section Background.png
│   ├── Product Card 1–4.png
│   ├── The Urban Explorer Look.png
│   ├── summer vibe.png
│   ├── morden workwear.png
│   └── ... (product images)
│
├── 📁 css/                     # External stylesheets (5 files)
│   ├── style.css               # Shared base styles
│   ├── index.css               # Homepage-specific styles
│   ├── pages.css               # Sub-page shared styles
│   ├── login.css               # Auth form styles
│   └── profile.css             # Profile page styles
│
├── 📁 js/                      # External JavaScript (4 files)
│   ├── common.js               # Shared utilities
│   ├── cart.js                 # Cart logic (product pages)
│   ├── index.js                # Homepage logic
│   └── profile.js              # Profile page logic
│
└── 📁 pages/                   # All HTML sub-pages (17 files)
    ├── man.html, woman.html    # Product collections
    ├── about.html, faq.html    # Informational pages
    ├── login.html, signup.html # Authentication
    └── ... (see Pages Overview)
```

---

## 📄 Pages Overview

| Page File | Title | Category | Key Features |
|-----------|-------|----------|--------------|
| `index.html` | Homepage | 🏠 Main | Hero banner, New Arrivals, Trending, Collections, Newsletter |
| `man.html` | Men's Collection | 👔 Shop | 8 product cards, Add to Cart, Cart sidebar |
| `woman.html` | Women's Collection | 👗 Shop | 8 product cards, Add to Cart, Cart sidebar |
| `summer.html` | Summer Collection | ☀️ Shop | 8 product cards, Add to Cart, Cart sidebar |
| `formal.html` | Formal Wear | 💼 Shop | 8 product cards, Add to Cart, Cart sidebar |
| `trending.html` | Trending Items | 🔥 Shop | 8 product cards, Add to Cart, Cart sidebar |
| `Accessories.html` | Accessories | 🎒 Shop | 8 product cards, Add to Cart, Cart sidebar |
| `about.html` | About Us | ℹ️ Info | Company story, mission, values |
| `contect.html` | Contact Us | 📞 Support | Contact form, phone/email/address, Google Maps embed |
| `faq.html` | FAQ | ❓ Support | Frequently asked questions |
| `shipping.html` | Shipping & Returns | 🚚 Support | Shipping policy, return process |
| `size.html` | Size Guide | 📏 Support | Measurement tables and guides |
| `login.html` | Login | 🔐 Auth | User login form |
| `signup.html` | Sign Up | 📝 Auth | User registration form |
| `profile.html` | User Profile | 👤 Account | Edit profile, tab nav, address modal with geolocation |
| `Careers.html` | Careers | 🏢 Company | Job listings and company culture |
| `policy.html` | Privacy Policy | 📜 Legal | Privacy and data handling policies |
| `terms.html` | Terms of Service | 📜 Legal | Terms and conditions |

---

## 🎨 CSS Architecture

| File | Scope | Styles Included |
|------|-------|-----------------|
| `style.css` | 🌐 Global (all pages) | Body defaults, `.nav-link` with hover underline, `.btn-primary`, `.btn-secondary`, cart sidebar/overlay transitions, `overflow-hidden` |
| `index.css` | 🏠 Homepage only | `.hero-section`, `.product-card` hover (translateY + shadow), `.add-to-cart-btn` reveal, quick-view modal, cart sidebar positioning |
| `pages.css` | 📄 Sub-pages | `.product-card` hover, `.content-section` heading/paragraph typography |
| `login.css` | 🔐 Login & Signup | `.form-input` focus effects (border color + box-shadow) |
| `profile.css` | 👤 Profile only | `.profile-nav-link` active/hover state, disabled inputs, modal overlay/container transitions |

---

## ⚙️ JavaScript Modules

| File | Scope | Functionality |
|------|-------|---------------|
| `common.js` | 🌐 All pages | `feather.replace()` icon initialization, mobile hamburger menu toggle |
| `cart.js` | 🛒 Product pages | Full cart system: `localStorage` read/write, `toggleCart()`, `renderCart()`, `updateQuantity()`, add-to-cart via event delegation, `showToast()` notifications |
| `index.js` | 🏠 Homepage only | Quick-view modal (open/close), cart with class-based open/close, smooth scrolling for anchor links, `renderCart()` |
| `profile.js` | 👤 Profile only | Edit/save/cancel profile form, tab navigation, address modal (open/close, geolocation, form submit, delete address) |

### JS File Usage Per Page

| Page | `common.js` | `cart.js` | `index.js` | `profile.js` |
|------|:-----------:|:---------:|:----------:|:-------------:|
| `index.html` | ✅ | ❌ | ✅ | ❌ |
| `man.html` | ✅ | ✅ | ❌ | ❌ |
| `woman.html` | ✅ | ✅ | ❌ | ❌ |
| `summer.html` | ✅ | ✅ | ❌ | ❌ |
| `formal.html` | ✅ | ✅ | ❌ | ❌ |
| `trending.html` | ✅ | ✅ | ❌ | ❌ |
| `Accessories.html` | ✅ | ✅ | ❌ | ❌ |
| `contect.html` | ✅ | ✅ | ❌ | ❌ |
| `profile.html` | ✅ | ❌ | ❌ | ✅ |
| All other pages | ✅ | ❌ | ❌ | ❌ |

---

## 🖼️ Image Assets

| Image | Used In | Purpose |
|-------|---------|---------|
| `Hero Section Background.png` | `index.html` | Full-width hero banner background |
| `Product Card 1.png` | `index.html` | New Arrivals — Graphic Tee |
| `Product Card 2.png` | `index.html` | New Arrivals — Relaxed Fit Jeans |
| `Product Card 3.png` | `index.html` | New Arrivals — Oversized Hoodie |
| `Product Card 4.png` | `index.html` | New Arrivals — Utility Jacket |
| `The Urban Explorer Look.png` | `index.html` | Trending section feature image |
| `summer vibe.png` | `index.html` | Summer collection card |
| `morden workwear.png` | `index.html` | Workwear collection card |
| `Linen Shirt.png` – `Tank Top.png` | Sub-pages | Individual product images (21 items) |

> **Note:** Sub-pages (`man.html`, `woman.html`, etc.) currently use placeholder images via `placehold.co` CDN. Only `index.html` uses the local PNG files.

---

## 🚀 Installation & Setup

| Step | Command / Action |
|------|-----------------|
| 1. Clone repo | `git clone https://github.com/yourusername/urban-threads.git` |
| 2. Navigate | `cd urban-threads` |
| 3. Open | Open `index.html` in any modern browser |
| 4. Requirements | No server, build tools, or `npm install` needed — it's a static site |

---

## 📖 Usage Guide

| Action | How To |
|--------|--------|
| Browse Products | Use the header navigation menu to visit collections |
| Quick View | Hover on a product card → click "Quick View" button |
| Add to Cart | Click "Add to Cart" on any product card |
| Manage Cart | Click the 🛍️ bag icon in the header to open the cart sidebar |
| Update Quantity | Use `+` / `−` buttons in the cart sidebar |
| Remove Item | Click "Remove" link in the cart sidebar |
| Explore Collections | Visit Men, Women, Summer, Formal, Trending, or Accessories pages |
| Contact Support | Navigate to Contact page via footer or header links |

---

## 🤝 Contributing

| Step | Action |
|------|--------|
| 1 | Fork the repository |
| 2 | Create a feature branch: `git checkout -b feature/amazing-feature` |
| 3 | Make changes and test thoroughly |
| 4 | Commit: `git commit -m 'Add amazing feature'` |
| 5 | Push: `git push origin feature/amazing-feature` |
| 6 | Open a Pull Request |

### Contribution Guidelines

| Guideline | Description |
|-----------|-------------|
| Code Style | Maintain consistent formatting and naming conventions |
| Browser Testing | Test on Chrome, Firefox, Safari, and Edge |
| Responsive Design | Ensure layouts work across all breakpoints |
| JavaScript | Add comments for complex logic |
| CSS | Use external files — no inline `<style>` blocks |

---

## 📊 Project Stats

| Metric | Count |
|--------|-------|
| Total HTML Pages | 18 (1 root + 17 sub-pages) |
| CSS Files | 5 |
| JS Files | 4 |
| Image Assets | 29 |
| External CDNs | 3 (Tailwind, Feather Icons, Google Fonts) |

---

<p align="center">
  <strong>© 2025 Urban Threads. All Rights Reserved.</strong><br>
  <em>Founded in 2024 — Redefining fashion with quality, style, and accessibility.</em>
</p>
