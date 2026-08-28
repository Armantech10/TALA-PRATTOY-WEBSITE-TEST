
document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const hamburgerIcon = document.getElementById('hamburger-icon');
  const closeIcon = document.getElementById('close-icon');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const navbar = document.getElementById('navbar');

  function openMobileMenu() {
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.remove('menu-hidden');
    mobileMenu.classList.add('menu-visible');
    if (hamburgerIcon && closeIcon) {
      hamburgerIcon.classList.add('hidden');
      closeIcon.classList.remove('hidden');
    }
  }

  function closeMobileMenu() {
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('menu-visible');
    mobileMenu.classList.add('menu-hidden');
    if (hamburgerIcon && closeIcon) {
      hamburgerIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    }
  }

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    document.addEventListener('click', (e) => {
      if (
        mobileMenu.classList.contains('menu-visible') &&
        !mobileMenu.contains(e.target) &&
        !mobileMenuBtn.contains(e.target)
      ) {
        closeMobileMenu();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('menu-visible')) {
        closeMobileMenu();
      }
    });
  }

  function updateNavbar() {
    if (!navbar) return;
    if (window.scrollY > 30) {
      navbar.classList.add('bg-black/90', 'border-b', 'border-white/10');
      navbar.classList.remove('bg-black/40');
    } else {
      navbar.classList.remove('bg-black/90', 'border-b', 'border-white/10');
      navbar.classList.add('bg-black/40');
    }
  }
  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item, index) => {
    const header = item.querySelector('.faq-header');
    if (header) {
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherBtn = otherItem.querySelector('button');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });

        if (isActive) {
          item.classList.remove('active');
          header.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('active');
          header.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  const newsTrack = document.getElementById('news-slider-track');
  const newsDots = document.querySelectorAll('.news-dot');

  if (newsTrack && newsDots.length > 0) {
    newsDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        const cardWidth = newsTrack.querySelector('div')?.offsetWidth || 300;
        const scrollAmount = index * (cardWidth + 24);
        newsTrack.scrollTo({
          left: scrollAmount,
          behavior: 'smooth'
        });

        newsDots.forEach(d => {
          d.classList.remove('bg-[#E50914]', 'w-6');
          d.classList.add('bg-neutral-600', 'w-2');
        });
        dot.classList.remove('bg-neutral-600', 'w-2');
        dot.classList.add('bg-[#E50914]', 'w-6');
      });
    });

    newsTrack.addEventListener('scroll', () => {
      const cardWidth = newsTrack.querySelector('div')?.offsetWidth || 300;
      const scrollPos = newsTrack.scrollLeft;
      const activeIndex = Math.min(
        Math.round(scrollPos / (cardWidth + 24)),
        newsDots.length - 1
      );

      newsDots.forEach((d, i) => {
        if (i === activeIndex) {
          d.classList.remove('bg-neutral-600', 'w-2');
          d.classList.add('bg-[#E50914]', 'w-6');
        } else {
          d.classList.remove('bg-[#E50914]', 'w-6');
          d.classList.add('bg-neutral-600', 'w-2');
        }
      });
    }, { passive: true });
  }

  const awardTrack = document.getElementById('award-slider-track');
  const awardPrevBtn = document.getElementById('award-prev-btn');
  const awardNextBtn = document.getElementById('award-next-btn');

  if (awardTrack) {
    if (awardPrevBtn) {
      awardPrevBtn.addEventListener('click', () => {
        awardTrack.scrollBy({ left: -220, behavior: 'smooth' });
      });
    }
    if (awardNextBtn) {
      awardNextBtn.addEventListener('click', () => {
        awardTrack.scrollBy({ left: 220, behavior: 'smooth' });
      });
    }
  }

  const discoverDots = document.querySelectorAll('.discover-dot');
  if (discoverDots.length > 0) {
    discoverDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        discoverDots.forEach(d => {
          d.classList.remove('bg-[#E50914]', 'w-5');
          d.classList.add('bg-neutral-600', 'w-2');
        });
        dot.classList.remove('bg-neutral-600', 'w-2');
        dot.classList.add('bg-[#E50914]', 'w-5');
      });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerHeight = 70;
        const targetPos = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });

  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('newsletter-email');
      if (emailInput && emailInput.value) {
        alert(`Thank you for subscribing to Tala Prattoy updates with ${emailInput.value}!`);
        emailInput.value = '';
      }
    });
  }
});
