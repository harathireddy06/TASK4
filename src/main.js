import './style.css'

// Sticky Navigation
const nav = document.querySelector('#main-nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Basic mobile menu behavior - can be expanded
    if (navLinks.classList.contains('active')) {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.backgroundColor = 'white';
        navLinks.style.padding = '20px';
        navLinks.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        navLinks.querySelectorAll('a').forEach(a => a.style.color = '#1a2419');
    } else {
        navLinks.style.display = '';
    }
});

// Impact Statistics Counter
const stats = document.querySelectorAll('.stat-number');
const statsSection = document.querySelector('.impact-stats');
let started = false;

const startCounter = () => {
    stats.forEach(stat => {
        const target = +stat.getAttribute('data-target');
        const count = +stat.innerText;
        const speed = target / 100;

        if (count < target) {
            stat.innerText = Math.ceil(count + speed);
            setTimeout(startCounter, 30);
        } else {
            stat.innerText = target.toLocaleString();
        }
    });
};

const observerOptions = {
    threshold: 0.5
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !started) {
            startCounter();
            started = true;
        }
    });
}, observerOptions);

statsObserver.observe(statsSection);

// Donation Calculator
const donateInput = document.querySelector('#donate-amount');
const treeCount = document.querySelector('#tree-count');
const amountTabs = document.querySelectorAll('.amount-tab');

const updateImpact = (amount) => {
    const count = Math.floor(amount / 200); // 200 per tree
    treeCount.innerText = count;
};

donateInput.addEventListener('input', (e) => {
    updateImpact(e.target.value);
    amountTabs.forEach(tab => tab.classList.remove('active'));
});

amountTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        amountTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const amount = tab.getAttribute('data-amount');
        if (amount !== 'custom') {
            donateInput.value = amount;
            updateImpact(amount);
        } else {
            donateInput.focus();
        }
    });
});

// Modal Handling
const modals = document.querySelectorAll('.modal');
const modalBtns = document.querySelectorAll('.open-modal');
const closeBtns = document.querySelectorAll('.close-modal');

modalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const modalId = btn.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (modalId === 'donate-modal') {
            document.getElementById('modal-amount').innerText = donateInput.value;
        }
        modal.classList.add('active');
    });
});

closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        modals.forEach(modal => modal.classList.remove('active'));
    });
});

window.addEventListener('click', (e) => {
    modals.forEach(modal => {
        if (e.target === modal) modal.classList.remove('active');
    });
});

// Form Submissions
const handleFormSubmit = (formId, successId) => {
    const form = document.getElementById(formId);
    const success = document.getElementById(successId);

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simulate API call
            form.style.opacity = '0.5';
            form.querySelectorAll('button').forEach(b => b.disabled = true);
            
            setTimeout(() => {
                form.classList.add('hidden');
                success.classList.remove('hidden');
            }, 1000);
        });
    }
};

handleFormSubmit('volunteer-form', 'volunteer-success');
handleFormSubmit('contact-form', 'contact-success');
handleFormSubmit('newsletter-form', 'newsletter-success');
handleFormSubmit('event-reg-form', 'event-reg-success');

// Donation Completion
const finalDonateBtn = document.getElementById('final-donate-btn');
const donationCheckout = document.getElementById('donation-checkout');
const donationSuccess = document.getElementById('donation-success');

finalDonateBtn.addEventListener('click', () => {
    finalDonateBtn.disabled = true;
    finalDonateBtn.innerText = 'Processing...';
    
    setTimeout(() => {
        donationCheckout.classList.add('hidden');
        donationSuccess.classList.remove('hidden');
    }, 1500);
});

// Lightbox Gallery
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('.lightbox-img');
const lightboxCaption = lightbox.querySelector('.lightbox-caption');
const closeLightbox = document.querySelector('.close-lightbox');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const bgImg = getComputedStyle(item.querySelector('.gallery-image')).backgroundImage;
        const src = bgImg.slice(5, -2);
        const caption = item.querySelector('.gallery-overlay span').innerText;
        
        lightboxImg.src = src;
        lightboxCaption.innerText = caption;
        lightbox.classList.add('active');
    });
});

closeLightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.classList.remove('active');
});

// Smooth Scroll for all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu if open
            navLinks.classList.remove('active');
            navLinks.style.display = '';
        }
    });
});
