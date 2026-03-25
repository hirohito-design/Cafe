document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const navbar = document.getElementById('navbar');

    function toggleMobileMenu() {
        mobileMenu.classList.toggle('active');
        const icon = mobileBtn.querySelector('i');
        if(mobileMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    }

    mobileBtn.addEventListener('click', toggleMobileMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });

    // 2. Sticky Navbar on Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                // Adjust scroll position for fixed navbar
                const navHeight = navbar.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Section highlighting on scroll
    const sections = document.querySelectorAll('section[id], div[id="visit"]');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Subtract navbar height + a little extra buffer
            if (pageYOffset >= (sectionTop - navbar.offsetHeight - 50)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // 5. Contact Form Submission mock
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
            btn.classList.add('disabled');
            
            // Simulate network request
            setTimeout(() => {
                btn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
                btn.classList.remove('btn-primary');
                btn.style.backgroundColor = '#2e7d32';
                btn.style.color = 'white';
                
                this.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.classList.add('btn-primary');
                    btn.classList.remove('disabled');
                    btn.style.backgroundColor = '';
                }, 3000);
            }, 1000);
        });
    }

    // 6. Dynamic Opening Hours Logic
    const openingStatus = document.getElementById('opening-status');
    if (openingStatus) {
        function updateOpeningStatus() {
            const now = new Date();
            const hour = now.getHours();
            
            // Assumed open from 10:00 AM (10) to 10:00 PM (22)
            if (hour >= 10 && hour < 22) {
                openingStatus.textContent = "Open Now";
                openingStatus.style.color = "#2e7d32"; // Green
            } else {
                openingStatus.textContent = "Closed Now";
                openingStatus.style.color = "#d32f2f"; // Red
            }
        }
        
        // Check immediately and then check every minute
        updateOpeningStatus();
        setInterval(updateOpeningStatus, 60000);
    }

    // Initialize - trigger scroll to set navbar state correctly if page is refreshed down
    window.dispatchEvent(new Event('scroll'));
});
