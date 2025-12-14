/* ==========================================
   JUNAYA BAKEHOUSE - PREMIUM JAVASCRIPT
   Features: Smooth animations, interactive UI, modern UX
   ========================================== */

// ==========================================
// GLOBAL VARIABLES & STATE
// ==========================================
let quantity = 1;
// let selectedProduct = { name: 'Classic Tiramisu', price: 350000 };
let selectedProduct = { 
    name: '', 
    size: '', 
    price: 0 
};


let cart = [];
let isMenuOpen = false;

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    initializeAnimations();
    updatePrice();
    setMinDeliveryDate();
});

// ==========================================
// APP INITIALIZATION
// ==========================================
function initializeApp() {
    console.log('🎂 Junaya Bakehouse - Initializing...');
    
    // Set current year in footer
    const yearElement = document.querySelector('.current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Initialize menu filter
    initializeMenuFilter();
    
    // Load cart from storage if exists
    loadCartFromStorage();
    
    console.log('✅ App initialized successfully');
}

// ==========================================
// EVENT LISTENERS
// ==========================================
function setupEventListeners() {
    // Navbar scroll effect
    window.addEventListener('scroll', throttle(handleScroll, 100));
    
    // Mobile menu toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', toggleMobileMenu);
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (isMenuOpen && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                closeMobileMenu();
            }
        });
    }
    
    // Close mobile menu when clicking nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                closeMobileMenu();
            }
        });
    });
    
    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', handleSmoothScroll);
    });
    
    // Form submission
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', handleOrderSubmit);
    }
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
    
    // Product select change
    const productSelect = document.getElementById('productSelect');
    if (productSelect) {
        productSelect.addEventListener('change', function () {
        const option = this.options[this.selectedIndex];

        selectedProduct = {
        name: option.dataset.name || '',
        size: option.dataset.size || '',
        price: parseInt(option.value) || 0
    };

        updatePrice();
});

    }
        // === TOMBOL DELIVERY / PICKUP (WAJIB ADA DI SINI) ===
    const deliveryRadios = document.querySelectorAll('input[name="deliveryMethod"]');
    deliveryRadios.forEach(radio => {
        radio.addEventListener('change', updatePrice);
    });

    // Quantity buttons (dipanggil sekali aja)
    //setupQuantityButtons();
    
    // Quantity buttons
    //setupQuantityButtons();
    
    
    // FAQ toggles
    setupFAQToggles();
    
    // Menu tabs
    setupMenuTabs();
    
    // Scroll to top button
    setupScrollToTop();

    setupProductPicker();

    
    // Window resize handler
    window.addEventListener('resize', debounce(handleResize, 250));
    
    // Prevent form submission on enter in newsletter
    const newsletterInput = document.querySelector('.newsletter-input');
    if (newsletterInput) {
        newsletterInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const form = this.closest('form');
                if (form) {
                    form.dispatchEvent(new Event('submit'));
                }
            }
        });
    }
}

const music = document.getElementById("bgMusic");
const btn = document.querySelector(".music-toggle");
let isPlaying = false;

function toggleMusic() {
    if (!isPlaying) {
        music.volume = 0.25;
        music.play();
        btn.classList.add("active");
    } else {
        music.pause();
        btn.classList.remove("active");
    }
    isPlaying = !isPlaying;
}


// ==========================================
// NAVBAR FUNCTIONS
// ==========================================
function handleScroll() {
    const navbar = document.getElementById('navbar');
    const scrollTop = document.querySelector('.scroll-top');
    
    if (!navbar) return;
    
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        if (scrollTop) {
            scrollTop.classList.add('visible');
        }
    } else {
        navbar.classList.remove('scrolled');
        if (scrollTop) {
            scrollTop.classList.remove('visible');
        }
    }
    
    // Update active nav link based on scroll position
    updateActiveNavLink();
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

function toggleMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    const navToggle = document.getElementById('navToggle');
    
    if (!navMenu || !navToggle) return;
    
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
        navMenu.classList.add('active');
        navToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        closeMobileMenu();
    }
}

function closeMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    const navToggle = document.getElementById('navToggle');
    
    if (!navMenu || !navToggle) return;
    
    isMenuOpen = false;
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
    document.body.style.overflow = '';
}

// ==========================================
// SMOOTH SCROLL
// ==========================================
function handleSmoothScroll(e) {
    const href = this.getAttribute('href');
    
    // Check if it's an internal anchor link
    if (!href || !href.startsWith('#')) return;
    
    e.preventDefault();
    
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function scrollToOrder() {
    const orderSection = document.getElementById('order');
    if (orderSection) {
        const offsetTop = orderSection.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

function setupScrollToTop() {
    const scrollTopBtn = document.querySelector('.scroll-top');
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', scrollToTop);
    }
}

// ==========================================
// MENU FUNCTIONS
// ==========================================
function setupMenuTabs() {
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuCards = document.querySelectorAll('.menu-card');
    
    menuTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active tab
            menuTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Filter menu cards
            filterMenuCards(category, menuCards);
        });
    });
}

function filterMenuCards(category, cards) {
    cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
            // Trigger reflow for animation
            card.style.animation = 'none';
            setTimeout(() => {
                card.style.animation = 'fadeInUp 0.5s ease';
            }, 10);
        } else {
            card.style.display = 'none';
        }
    });
}

function initializeMenuFilter() {
    const menuCards = document.querySelectorAll('.menu-card');
    menuCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

function addToCart(productName, price) {
    updateOrderSummary(productName, price);
    scrollToOrder();
    showNotification(`${productName} ditambahkan ke pesanan`);
}


function saveCartToStorage() {
    try {
        // In a real app, you'd use localStorage here
        // localStorage.setItem('cart', JSON.stringify(cart));
        console.log('Cart saved:', cart);
    } catch (error) {
        console.error('Error saving cart:', error);
    }
}

function loadCartFromStorage() {
    try {
        // In a real app, you'd load from localStorage here
        // const savedCart = localStorage.getItem('cart');
        // if (savedCart) {
        //     cart = JSON.parse(savedCart);
        //     updateCartUI();
        // }
        console.log('Cart loaded');
    } catch (error) {
        console.error('Error loading cart:', error);
    }
}

function updateCartUI() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    
    // Update cart badge if exists
    const cartBadge = document.querySelector('.cart-badge');
    if (cartBadge) {
        cartBadge.textContent = cartCount;
        if (cartCount > 0) {
            cartBadge.classList.add('has-items');
        }
    }
}

// ==========================================
// ORDER FORM FUNCTIONS
// ==========================================
function setupQuantityButtons() {
    const decreaseBtn = document.querySelector('.quantity-decrease');
    const increaseBtn = document.querySelector('.quantity-increase');
    
    // Hapus event lama biar gak numpuk
    decreaseBtn?.replaceWith(decreaseBtn.cloneNode(true));
    increaseBtn?.replaceWith(increaseBtn.cloneNode(true));
    
    // Ambil ulang karena udah di-clone
    document.querySelector('.quantity-decrease')?.addEventListener('click', () => changeQuantity(-1));
    document.querySelector('.quantity-increase')?.addEventListener('click', () => changeQuantity(1));
}

function changeQuantity(change) {
    quantity = Math.max(1, quantity + change);
    
    const quantityDisplay = document.getElementById('quantity');
    if (quantityDisplay) {
        quantityDisplay.textContent = quantity;
        
        // Add animation
        quantityDisplay.style.transform = 'scale(1.2)';
        setTimeout(() => {
            quantityDisplay.style.transform = 'scale(1)';
        }, 200);
    }
    
    updatePrice();
}

// UPDATE SUMMARY //
//               //


function updateOrderSummary(productName, price, size = '') {
    const productSelect = document.getElementById('productSelect');
    if (!productSelect) return;

    const option = Array.from(productSelect.options).find(opt =>
        opt.dataset.name === productName &&
        (size ? opt.dataset.size === size : !opt.dataset.size)
    );

    if (!option) {
        console.warn('Option not found:', productName, size);
        return;
    }

    productSelect.value = option.value;

    selectedProduct = {
        name: productName,
        size: size,
        price: price
    };

    updatePrice();
}



//
//
//

function updatePrice() {
    const productSelect = document.getElementById('productSelect');
    if (!productSelect) return;

    const basePrice = parseInt(productSelect.value) || 0;
    const subtotal = basePrice * quantity;

    // Ambil metode pengiriman
    const deliveryMethod = document.querySelector('input[name="deliveryMethod"]:checked')?.value || 'delivery';
    const deliveryFee = deliveryMethod === 'delivery' ? 50000 : 0;
    const tax = 0; // UMKM bebas pajak!

    const total = subtotal + deliveryFee + tax;

    // Update tampilan harga
    updatePriceDisplay('subtotal', subtotal);
    updatePriceDisplay('delivery', deliveryFee);
    updatePriceDisplay('tax', tax);
    updatePriceDisplay('total', total);

    // Update tulisan ongkir jadi FREE kalau pickup
    const deliveryEl = document.getElementById('delivery');
    if (deliveryEl) {
        deliveryEl.textContent = deliveryFee === 0 ? 'FREE' : formatCurrency(deliveryFee);
        deliveryEl.style.color = deliveryFee === 0 ? '#4e4e4eff' : '';
        deliveryEl.style.fontWeight = deliveryFee === 0 ? '600' : 'normal';
    }
}

// function updatePriceDisplay(elementId, amount) {
//     const element = document.getElementById(elementId);
//    if (element) {
//        element.textContent = formatCurrency(amount);
//    }
// }

function updatePriceDisplay(elementId, amount) {
    const element = document.getElementById(elementId);
    if (element) {
        if (elementId === 'tax' && amount === 0) {
            element.textContent = 'FREE';
            element.style.color = '#959595ff';
            element.style.fontWeight = '600';
        } else {
            element.textContent = formatCurrency(amount);
        }
    }
}

function formatCurrency(amount) {
    return 'Rp ' + amount.toLocaleString('id-ID', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
}

function setMinDeliveryDate() {
    const deliveryDateInput = document.getElementById('deliveryDate');
    if (deliveryDateInput) {
        // Set minimum date to tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const minDate = tomorrow.toISOString().split('T')[0];
        deliveryDateInput.setAttribute('min', minDate);
        
        // Set default to tomorrow
        deliveryDateInput.value = minDate;
    }
}

function handleOrderSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const productSelect = document.getElementById('productSelect');
    const selectedOption = productSelect.options[productSelect.selectedIndex];
    //const productName = selectedOption.text.split(' - ')[0];
    const productName = selectedOption.dataset.size
    ? `${selectedOption.dataset.name} (${selectedOption.dataset.size})`
    : selectedOption.dataset.name;

    const deliveryMethod = formData.get('deliveryMethod');
    const deliveryFee = deliveryMethod === 'delivery' ? 50000 : 0;

    const orderData = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        address: formData.get('address'),
        city: formData.get('city'),
        postalCode: formData.get('postalCode'),
        product: productName,
        quantity: quantity,
        deliveryDate: formData.get('deliveryDate'),
        specialInstructions: formData.get('specialInstructions'),
        deliveryMethod: deliveryMethod,

        // Pricing yang benar
        subtotal: parseInt(productSelect.value) * quantity,
        delivery: deliveryFee,
        tax: 0,
        total: parseInt(productSelect.value) * quantity + deliveryFee,

        timestamp: Date.now(),
        orderDate: new Date().toISOString()
    };
    
    // Send to WhatsApp
    sendOrderViaWhatsApp(orderData);
}

function sendOrderViaWhatsApp(orderData) {
    // Format WhatsApp message
    const message = `
*NEW ORDER - JUNAYA BAKEHOUSE*
Order Date: ${new Date().toLocaleString('id-ID')}

*CUSTOMER INFORMATION*
- Name: ${orderData.firstName} ${orderData.lastName}
- Email: ${orderData.email}
- Phone: ${orderData.phone}

*DELIVERY ADDRESS*
- ${orderData.address}
- ${orderData.city}, ${orderData.postalCode}

*ORDER DETAILS*
- Product: ${orderData.product}
- Quantity: ${orderData.quantity}
- Delivery: ${orderData.deliveryMethod === 'delivery' 
  ? `Antar ke: ${orderData.address}, ${orderData.city}` 
  : 'Ambil Sendiri di Toko (GRATIS ONGKIR)'}
- Delivery Date: ${orderData.deliveryDate}
${orderData.specialInstructions ? `Special Instructions: "${orderData.specialInstructions}"` : ''}

*PAYMENT SUMMARY*
Subtotal     : ${formatCurrency(orderData.subtotal)}
Ongkir        : ${orderData.delivery === 0 ? 'FREE' : formatCurrency(orderData.delivery)}
Tax (10%)     : FREE
======================

*TOTAL         : ${formatCurrency(orderData.total)}*


            Thank you Mate!       
    `.trim();
    
    // WhatsApp admin number - GANTI DENGAN NOMOR ASLI!
    const whatsappNumber = '62895325720423';
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappURL, '_blank');
    
    // Show success notification
    showNotification('Redirecting ke WhatsApp... Silakan kirim pesan untuk menyelesaikan order! 📱');
}

function sendViaEmail() {
    const form = document.getElementById('orderForm');
    
    // Validate form
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    // Get form data
    const formData = new FormData(form);
    const productSelect = document.getElementById('productSelect');
    const selectedOption = productSelect.options[productSelect.selectedIndex];
    const productName = selectedOption.text.split(' - ')[0];
    
    const orderData = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        address: formData.get('address'),
        city: formData.get('city'),
        postalCode: formData.get('postalCode'),
        product: productName,
        quantity: quantity,
        deliveryDate: formData.get('deliveryDate'),
        specialInstructions: formData.get('specialInstructions'),
        subtotal: parseInt(productSelect.value) * quantity,
        delivery: 50000,
        tax: parseInt(productSelect.value) * quantity * 0.1,
        total: (parseInt(productSelect.value) * quantity) + 50000 + (parseInt(productSelect.value) * quantity * 0.1)
    };
    
    // Create email subject and body
    const subject = `New Order - ${orderData.product} - ${orderData.firstName} ${orderData.lastName}`;
    
    const body = `
NEW ORDER - JUNAYA BAKEHOUSE

CUSTOMER INFORMATION
Name: ${orderData.firstName} ${orderData.lastName}
Email: ${orderData.email}
Phone: ${orderData.phone}

DELIVERY ADDRESS
${orderData.address}
${orderData.city}, ${orderData.postalCode}

ORDER DETAILS
Product: ${orderData.product}
Quantity: ${orderData.quantity}
Delivery Date: ${orderData.deliveryDate}
${orderData.specialInstructions ? `Special Instructions: ${orderData.specialInstructions}` : ''}

PAYMENT SUMMARY
Subtotal: ${formatCurrency(orderData.subtotal)}
Delivery Fee: ${formatCurrency(orderData.delivery)}
Tax (10%): ${formatCurrency(orderData.tax)}
Total: ${formatCurrency(orderData.total)}

Order Date: ${new Date().toLocaleString('id-ID')}
    `.trim();
    
    // Email admin - GANTI DENGAN EMAIL ASLI!
    const adminEmail = 'thisisagung1@gmail.com';
    
    // Create mailto link
    const mailtoLink = `mailto:${adminEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success notification
    showNotification('Membuka email client... Silakan kirim email untuk menyelesaikan order! 📧');
}

function showSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ==========================================
// FAQ FUNCTIONS
// ==========================================
function setupFAQToggles() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            toggleFAQ(this);
        });
    });
}

function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const answer = faqItem.querySelector('.faq-answer');
    const icon = element.querySelector('.faq-icon');
    
    // Close all other FAQs
    const allFAQItems = document.querySelectorAll('.faq-item');
    allFAQItems.forEach(item => {
        if (item !== faqItem && item.classList.contains('active')) {
            item.classList.remove('active');
            const otherAnswer = item.querySelector('.faq-answer');
            const otherIcon = item.querySelector('.faq-icon');
            if (otherAnswer) otherAnswer.style.maxHeight = '0';
            if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
        }
    });
    
    // Toggle current FAQ
    const isActive = faqItem.classList.contains('active');
    
    if (isActive) {
        faqItem.classList.remove('active');
        if (answer) answer.style.maxHeight = '0';
        if (icon) icon.style.transform = 'rotate(0deg)';
    } else {
        faqItem.classList.add('active');
        if (answer) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }
        if (icon) icon.style.transform = 'rotate(180deg)';
    }
}

// ==========================================
// NEWSLETTER FUNCTIONS
// ==========================================
function handleNewsletterSubmit(e) {
    e.preventDefault();
    
    const emailInput = e.target.querySelector('input[type="email"]');
    const email = emailInput.value;
    
    if (!email) {
        showNotification('Mohon masukkan alamat email yang valid', 'error');
        return;
    }
    
    console.log('Newsletter subscription:', email);
    
    showNotification('Terima kasih sudah subscribe! 🎉 Kami akan mengirimkan update terbaru ke email Anda.');
    
    e.target.reset();
}

// ==========================================
// STATISTICS ANIMATION
// ==========================================
// ==========================================
// STATISTICS ANIMATION
// ==========================================
// ==========================================
// STATISTICS ANIMATION
// ==========================================
function animateStats() {
    const statNumbers = document.querySelectorAll('.stats-section .stat-number');
    
    statNumbers.forEach(stat => {
        // Check if already animated
        if (stat.classList.contains('animated')) return;
        
        const target = parseInt(stat.getAttribute('data-target'));
        
        if (!target || isNaN(target)) return;
        
        // Mark as animating
        stat.classList.add('animated');
        
        const duration = 2000; // 2 seconds
        const frameRate = 1000 / 60; // 60fps
        const totalFrames = Math.round(duration / frameRate);
        
        let frame = 0;
        const startTime = performance.now();
        
        // Explicitly start from 0
        stat.textContent = '0';
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth acceleration and deceleration
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            
            const current = Math.floor(easeOutQuart * target);
            stat.textContent = formatStatNumber(current);
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                // Ensure final value is exact
                stat.textContent = formatStatNumber(target);
            }
        }
        
        requestAnimationFrame(updateCounter);
    });
}

function formatStatNumber(num) {
    if (num >= 1000) {
        const k = (num / 1000);
        // Show decimal for intermediate values
        if (k < 10 && num % 1000 !== 0) {
            return k.toFixed(1) + 'K+';
        }
        return Math.floor(k) + 'K+';
    }
    return num + '+';
}

function initializeStatsObserver() {
    const statsSection = document.querySelector('.stats-section');
    
    if (!statsSection) {
        console.log('❌ Stats section not found');
        return;
    }
    
    console.log('✅ Stats observer initialized');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log('🎯 Stats section visible - Starting animation!');
                // Add small delay for better UX
                setTimeout(() => {
                    animateStats();
                }, 300);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2, // Trigger when 20% visible
        rootMargin: '0px 0px -10% 0px' // Trigger a bit before fully visible
    });
    
    observer.observe(statsSection);
}

// ==========================================
// SCROLL ANIMATIONS
// ==========================================
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements with data-aos attribute
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => observer.observe(el));
    
    // Initialize stats animation
    initializeStatsObserver();
}

// ==========================================
// GALLERY FUNCTIONS
// ==========================================
function viewImage(imageSrc) {
    // Create modal for image viewing
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="image-modal-overlay" onclick="closeImageModal()"></div>
        <div class="image-modal-content">
            <button class="image-modal-close" onclick="closeImageModal()">
                <i class="fas fa-times"></i>
            </button>
            <img src="${imageSrc}" alt="Gallery Image">
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Trigger animation
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

function closeImageModal() {
    const modal = document.querySelector('.image-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    }
}

// ==========================================
// NOTIFICATION SYSTEM
// ==========================================
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="closeNotification(this)">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        closeNotification(notification);
    }, 5000);
}

function closeNotification(element) {
    const notification = element.classList ? element : element.closest('.notification');
    if (notification) {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function handleResize() {
    // Close mobile menu if window is resized to desktop size
    if (window.innerWidth > 768 && isMenuOpen) {
        closeMobileMenu();
    }
}



// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================

// Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        images.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    }
}

// Initialize lazy loading
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', lazyLoadImages);
} else {
    lazyLoadImages();
}

// SIZE MODAL FUNCTIONS
let selectedSize = 'small';  // Default S
let selectedSizePrice = 0;
let currentProductName = '';

function showSizeModal(productName, smallPrice, mediumPrice) {
    currentProductName = productName;
    
    document.getElementById('selectedProductName').textContent = productName;
    document.getElementById('smallPrice').textContent = formatCurrency(smallPrice);
    document.getElementById('mediumPrice').textContent = formatCurrency(mediumPrice);
    
    const modal = document.getElementById('sizeModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // === TAMBAHIN INI 4 BARIS BIAR KLIK JALAN & DEFAULT SMALL ===
    selectedSize = 'small';
    selectedSizePrice = smallPrice;
    document.querySelectorAll('.size-option').forEach(option => option.classList.remove('active'));
    document.querySelector('.size-options .size-option:first-child').classList.add('active');
}

function closeSizeModal() {
    const modal = document.getElementById('sizeModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function selectSize(size, element) {
    selectedSize = size;
    
    // Fix parse harga Indonesia (ganti titik & Rp)
    const priceText = element.querySelector('.size-price').textContent;
    const priceClean = priceText.replace(/Rp|\s|\./g, '');
    selectedSizePrice = parseInt(priceClean);
    
    // Update active class
    document.querySelectorAll('.size-option').forEach(option => option.classList.remove('active'));
    element.classList.add('active');
}

        
    function setupProductPicker() {
    const pickerTrigger = document.querySelector(".picker-trigger");
    const productPicker = document.querySelector(".product-picker");
    const cards = document.querySelectorAll(".product-card");
    const productSelect = document.getElementById("productSelect");

    pickerTrigger?.addEventListener("click", () => {
        productPicker.classList.toggle("show");
    });

    cards.forEach(card => {
        card.addEventListener("click", () => {
            const name = card.dataset.name;
            const size = card.dataset.size || '';
            const price = parseInt(card.dataset.price) || 0;

            cards.forEach(c => c.classList.remove("active"));
            card.classList.add("active");

            updateOrderSummary(name, price, size);

            productPicker.classList.remove("show");
            showNotification(`${name}${size ? ' (' + size + ')' : ''} dipilih ✨`);
        });
    });
 
}



function confirmSize() {
    closeSizeModal();

    const sizeLabel = selectedSize === 'small' ? 'Small' : 'Medium';

    updateOrderSummary(
        currentProductName,
        selectedSizePrice,
        sizeLabel
    );

    scrollToOrder();
    showNotification(
        `Ukuran ${sizeLabel} dipilih untuk ${currentProductName}!`
    );
}


// ==========================================
// WELCOME INTRO SCREEN
// ==========================================
window.addEventListener('load', () => {
    const welcome = document.getElementById('welcomeScreen');
    if (!welcome) return;

    // tahan sebentar biar kebaca
    setTimeout(() => {
        welcome.classList.add('merge');
    }, 1600);

    // background ikut hilang
    setTimeout(() => {
        welcome.style.opacity = '0';
        welcome.style.visibility = 'hidden';
    }, 2400);

    // bersihin DOM
    setTimeout(() => {
        welcome.remove();
    }, 3600);
});


// ==========================================
// CONSOLE BRANDING
// ==========================================
console.log('%c🎂 JUNAYA BAKEHOUSE', 'font-size: 24px; font-weight: bold; color: #8B4513;');
console.log('%cPremium Italian Dessert & Artisan Bakery', 'font-size: 14px; color: #86868b;');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #d4af37;');
console.log('%cWebsite crafted with ❤️', 'color: #8B4513;');

// ==========================================
// EXPORT FUNCTIONS (Global scope for HTML onclick)
// ==========================================
window.scrollToTop = scrollToTop;
window.scrollToOrder = scrollToOrder;
window.addToCart = addToCart;
window.changeQuantity = changeQuantity;
window.updatePrice = updatePrice;
window.toggleFAQ = toggleFAQ;
window.closeModal = closeModal;
window.viewImage = viewImage;
window.closeImageModal = closeImageModal;
window.showNotification = showNotification;
window.closeNotification = closeNotification;
// Cari bagian ini dan tambahkan baris terakhir
window.sendViaEmail = sendViaEmail;
window.showSizeModal = showSizeModal;
window.closeSizeModal = closeSizeModal;
window.selectSize = selectSize;
window.confirmSize = confirmSize;
