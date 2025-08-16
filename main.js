(function ($) {
  $(function () {
    // Mobile Menu Toggle
    $('.menu-toggle').on('click', function () {
      const $nav = $('nav');
      $nav.toggleClass('active');
      $(this).find('i').toggleClass('fa-times');
      $(this).attr('aria-expanded', $nav.hasClass('active'));
    });

    // Set active nav link
      function setActiveNavLink() {
      const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
      $('.nav-link')
        .removeClass('active')
        .each(function () {
          if ($(this).data('page') === currentPage) {
            $(this).addClass('active');
          }
        });
    }
    
    setActiveNavLink();
    // Form Validation
    $('#contactForm').on('submit', function (e) {
      e.preventDefault();
      let isValid = true;

      const name = $('#name').val()?.trim() || '';
      if (name === '') {
        $('#nameError').show();
        isValid = false;
      } else {
        $('#nameError').hide();
      }

      const email = $('#email').val()?.trim() || '';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        $('#emailError').show();
        isValid = false;
      } else {
        $('#emailError').hide();
      }

      const phone = $('#phone').val()?.trim() || '';
      if (phone !== '' && !/^[\d\s\-()+]{10,}$/.test(phone)) {
        $('#phoneError').show();
        isValid = false;
      } else {
        $('#phoneError').hide();
      }

      const message = $('#message').val()?.trim() || '';
      if (message === '') {
        $('#messageError').show();
        isValid = false;
      } else {
        $('#messageError').hide();
      }

      if (isValid) {
        $('#formSuccess').show();
        this.reset();
        setTimeout(() => $('#formSuccess').hide(), 5000);
      }
    });

    
    // Testimonial Slider (hardened)
    let currentTestimonial = 0;
    const testimonials = [
      {
        text:
          'Sa Re Ga Ma Studios transformed my EP into something beyond my expectations. Their attention to detail and creative input took my songs to the next level.',
        name: 'Dikshya Rai',
        role: 'Independent Artist',
        image: 'images/Dikshya Rai.jpeg'
      },
      {
        text:
          'Working with their team on our film score was a dream. They understood the emotional tone we were going for and delivered beyond our expectations.',
        name: 'Jaya Kishan Basnet',
        role: 'Film Director',
        image: 'images/Jay Kishan Basnet.jpeg'
      },
      {
        text:
          "The best mastering I've ever had for my tracks. They made my music sound professional and ready for all platforms.",
        name: 'DJ Ifti',
        role: 'Electronic Producer',
        image: 'images/man.jpg'
      }
    ];

    const $testimonialsWrap = $('.testimonials').first();
    if (!$testimonialsWrap.length) {
      console.warn('[Testimonials] .testimonials container not found on this page.');
    }

    // Ensure there is a slide container to inject into
    let $slide = $testimonialsWrap.find('.testimonial-slide').first();
    if ($testimonialsWrap.length && !$slide.length) {
      $slide = $('<div class="testimonial-slide"></div>').appendTo($testimonialsWrap);
      console.warn('[Testimonials] .testimonial-slide not found; created one automatically.');
    }

    function updateTestimonial(index) {
      if (!$slide || !$slide.length) return;
      const total = testimonials.length;
      const t = testimonials[index];

      // ARIA for accessibility
      $testimonialsWrap.attr('aria-live', 'polite');
      $slide
        .attr({
          role: 'group',
          'aria-roledescription': 'slide',
          'aria-label': `${index + 1} of ${total}`
        })
        .html(
          `
          <div class="client-image">
              <img src="${t.image}" alt="${t.name}">
          </div>
          <p class="testimonial-text">${t.text}</p>
          <p class="client-name">${t.name}</p>
          <p class="client-role">${t.role}</p>
        `
        );
    }

    if ($testimonialsWrap.length) {
      $testimonialsWrap.on('click', '[data-action="prev"], .prev, .btn-prev', function (e) {
        e.preventDefault();
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        updateTestimonial(currentTestimonial);
      });

      $testimonialsWrap.on('click', '[data-action="next"], .next, .btn-next', function (e) {
        e.preventDefault();
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        updateTestimonial(currentTestimonial);
      });

      const $genericBtns = $testimonialsWrap.find('.btn');
      if ($genericBtns.length === 2) {
        $genericBtns.eq(0).on('click', function (e) {
          e.preventDefault();
          currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
          updateTestimonial(currentTestimonial);
        });
        $genericBtns.eq(1).on('click', function (e) {
          e.preventDefault();
          currentTestimonial = (currentTestimonial + 1) % testimonials.length;
          updateTestimonial(currentTestimonial);
        });
      }

      // Initialize first testimonial
      updateTestimonial(0);
    }

    // Animation on scroll
    function animateOnScroll() {
      $('.service-card, .about-image, .about-text, .work-card, .team-member, .equipment-card').each(function () {
        const elementTop = this.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.3;
        if (elementTop < screenPos) {
          $(this).css({
            opacity: '1',
            transform: 'translateY(0)'
          });
        }
      });
    }

    $('.service-card, .about-image, .about-text, .work-card, .team-member, .equipment-card').css({
      opacity: '0',
      transform: 'translateY(20px)',
      transition: 'opacity 0.5s ease, transform 0.5s ease'
    });

    $(window).on('scroll', animateOnScroll);
    animateOnScroll();

    // Header scroll effect
    $(window).on('scroll', function () {
      if (window.scrollY > 100) {
        $('header').css({
          padding: '0.5rem 5%',
          background: 'rgba(26, 26, 46, 0.95)'
        });
      } else {
        $('header').css({
          padding: '1rem 5%',
          background: 'rgba(26, 26, 46, 0.9)'
        });
      }
    });

    // Focus styles for accessibility
   
    $(document).on('keyup', function (e) {
      if (e.key === 'Tab') {
        $('html').addClass('keyboard-nav');
      }
    });

    $(document).on('mousedown', function () {
      $('html').removeClass('keyboard-nav');
    });

   
    // Sanity check
    
    if (!window.jQuery) {
      console.error('jQuery is not loaded. Make sure it is included before main.js');
    } else {
      // console.log('jQuery v' + $.fn.jquery + ' initialized');
    }
  });
})(jQuery);
