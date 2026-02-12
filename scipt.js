// Telefon ve WhatsApp numaraları
const TELEFON = "0555234567"; // Çağrı merkezi
const WHATSAPP = "905552345678"; // WhatsApp hattı

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', function() {
    initializeMenus();
    updateContactLinks();
    setupSmoothScroll();
    setupMobileMenu();
});

// Mobil menü ayarları
function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const closeMenu = document.querySelector('.close-mobile-menu');
    const slideBar = document.querySelector('.slide-bar');
    const bodyOverlay = document.querySelector('.body-overlay');

    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            if (slideBar) {
                slideBar.classList.add('active');
            }
            if (bodyOverlay) {
                bodyOverlay.classList.add('active');
            }
        });
    }

    if (closeMenu) {
        closeMenu.addEventListener('click', function() {
            if (slideBar) {
                slideBar.classList.remove('active');
            }
            if (bodyOverlay) {
                bodyOverlay.classList.remove('active');
            }
        });
    }

    if (bodyOverlay) {
        bodyOverlay.addEventListener('click', function() {
            if (slideBar) {
                slideBar.classList.remove('active');
            }
            this.classList.remove('active');
        });
    }
}

// Menü başlatma
function initializeMenus() {
    const dropdowns = document.querySelectorAll('.dropdown > a');
    
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            const submenu = this.nextElementSibling;
            if (submenu && submenu.classList.contains('submenu')) {
                e.preventDefault();
                submenu.classList.toggle('active');
            }
        });
    });
}

// İletişim linklerini güncelle
function updateContactLinks() {
    // Telefon linklerini güncelle
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.href = `tel:${TELEFON}`;
    });

    // WhatsApp linkini güncelle
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    whatsappLinks.forEach(link => {
        link.href = `https://wa.me/${WHATSAPP}`;
    });
}

// Yumuşak kaydırma ayarı
function setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }

            // Mobil menüyü kapat
            const slideBar = document.querySelector('.slide-bar');
            const bodyOverlay = document.querySelector('.body-overlay');
            if (slideBar) slideBar.classList.remove('active');
            if (bodyOverlay) bodyOverlay.classList.remove('active');
        });
    });
}

// Sayfaya kaydırma sırasında aktif menü güncellemesi
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });

    // Sticky header gölgesini ayarla
    const stickyHeader = document.getElementById('sticky-header');
    if (stickyHeader) {
        if (window.scrollY > 100) {
            stickyHeader.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.15)';
        } else {
            stickyHeader.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
        }
    }
});

// Animasyon gözlemcisi
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Animasyona tabi olacak öğeleri gözlemle
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.service__card, .about__section > div, .contact__section > div');
    animateElements.forEach(element => {
        observer.observe(element);
    });
});

// Haber mesajı gö
