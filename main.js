// main.js
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            const nav = document.querySelector('nav');
            nav.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-times');
            this.setAttribute('aria-expanded', nav.classList.contains('active'));
        });
    }

    // Set active nav link based on current page
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === currentPage) {
                link.classList.add('active');
            }
        });
    }

    setActiveNavLink();

    // Form Validation (for contact page)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;

            // Validate name
            const name = document.getElementById('name').value.trim();
            if (name === '') {
                document.getElementById('nameError').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('nameError').style.display = 'none';
            }

            // Validate email
            const email = document.getElementById('email').value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                document.getElementById('emailError').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('emailError').style.display = 'none';
            }

            // Validate phone (optional but must be valid if provided)
            const phone = document.getElementById('phone').value.trim();
            if (phone !== '' && !/^[\d\s\-()+]{10,}$/.test(phone)) {
                document.getElementById('phoneError').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('phoneError').style.display = 'none';
            }

            // Validate message
            const message = document.getElementById('message').value.trim();
            if (message === '') {
                document.getElementById('messageError').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('messageError').style.display = 'none';
            }

            if (isValid) {
                // Here you would typically send the data to a server
                // For now, we'll simulate a successful submission
                document.getElementById('formSuccess').style.display = 'block';
                this.reset();

                // Hide success message after 5 seconds
                setTimeout(() => {
                    document.getElementById('formSuccess').style.display = 'none';
                }, 5000);
            }
        });
    }


    // Testimonial Slider (for services page)
    let currentTestimonial = 0;
    const testimonials = [
        {
            text: "Sa Re Ga Ma Studios transformed my EP into something beyond my expectations. Their attention to detail and creative input took my songs to the next level.",
            name: "Dikshya Rai",
            role: "Independent Artist",
            image: "images/Dikshya Rai.jpeg"
        },
        {
            text: "Working with their team on our film score was a dream. They understood the emotional tone we were going for and delivered beyond our expectations.",
            name: "Jaya Kishan Basnet",
            role: "Film Director",
            image: "images/Jay Kishan Basnet.jpeg"
        },
        {
            text: "The best mastering I've ever had for my tracks. They made my music sound professional and ready for all platforms.",
            name: "DJ Ifti",
            role: "Electronic Producer",
            image: "images/man.jpg"
        }
    ];

    function updateTestimonial(index) {
        const testimonial = testimonials[index];
        const slide = document.querySelector('.testimonial-slide');
        
        if (slide) {
            slide.innerHTML = `
                <div class="client-image">
                    <img src="${testimonial.image}" alt="${testimonial.name}">
                </div>
                <p class="testimonial-text">${testimonial.text}</p>
                <p class="client-name">${testimonial.name}</p>
                <p class="client-role">${testimonial.role}</p>
            `;
        }
    }

    const testimonialBtns = document.querySelectorAll('.testimonials .btn');
    if (testimonialBtns.length > 0) {
        testimonialBtns.forEach((btn, i) => {
            btn.addEventListener('click', function() {
                if (i === 0) {
                    // Previous button
                    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
                } else {
                    // Next button
                    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
                }
                updateTestimonial(currentTestimonial);
            });
        });
    }

    // Initialize first testimonial
    updateTestimonial(0);

    // Animation on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.service-card, .about-image, .about-text, .work-card, .team-member, .equipment-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.service-card, .about-image, .about-text, .work-card, .team-member, .equipment-card');
    if (animatedElements.length > 0) {
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
    }

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 100) {
                header.style.padding = '0.5rem 5%';
                header.style.background = 'rgba(26, 26, 46, 0.95)';
            } else {
                header.style.padding = '1rem 5%';
                header.style.background = 'rgba(26, 26, 46, 0.9)';
            }
        }
    });

    // Focus styles for accessibility
    document.addEventListener('keyup', function(e) {
        if (e.key === 'Tab') {
            document.documentElement.classList.add('keyboard-nav');
        }
    });

    document.addEventListener('mousedown', function() {
        document.documentElement.classList.remove('keyboard-nav');
    });
});