(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
        let section = select(navbarlink.hash)
      if (!section) return
        if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
          navbarlink.classList.add('active')
        } else {
          navbarlink.classList.remove('active')
        }
      })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 16
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Header fixed top on scroll
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    let headerOffset = selectHeader.offsetTop
    let nextElement = selectHeader.nextElementSibling
    const headerFixed = () => {
      if ((headerOffset - window.scrollY) <= 0) {
        selectHeader.classList.add('fixed-top')
        nextElement.classList.add('scrolled-offset')
      } else {
        selectHeader.classList.remove('fixed-top')
        nextElement.classList.remove('scrolled-offset')
      }
    }
    window.addEventListener('load', headerFixed)
    onscroll(document, headerFixed)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero carousel indicators
   */
  let heroCarouselIndicators = select("#hero-carousel-indicators")
  let heroCarouselItems = select('#heroCarousel .carousel-item', true)

  heroCarouselItems.forEach((item, index) => {
    (index === 0) ?
    heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "' class='active'></li>":
    heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "'></li>"
  });

  /**
   * Clients Slider
   */
  new Swiper('.clients-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 40
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 60
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 80
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 120
      }
    }
  });

 /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let bigoffersContainer = select('.bigoffers-container');
    if (bigoffersContainer) {
      let bigoffersIsotope = new Isotope(bigoffersContainer, {
        itemSelector: '.bigoffers-item'
      });

      let bigoffersFilters = select('#bigoffers-flters li', true);

      on('click', '#bigoffers-flters li', function(e) {
        e.preventDefault();
        bigoffersFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        bigoffersIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });

      }, true);
    }

  });

  /**
   * Initiate bigoffers lightbox 
   */
  const bigoffersLightbox = GLightbox({
    selector: '.bigoffers-lightbox'
  });

  /**
   * bigoffers details slider
   */
  var swiper = new Swiper(".bigoffers_Swiper", {
    initialSlide: 2,
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },

    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {

      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 0.8,
      slideShadows: true
    },
    
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });


  //All ITEMS JS
  let tabs = document.querySelectorAll('.tab');
  let content = document.querySelectorAll('.content-item');
  for (let i = 0; i < tabs.length; i++) {            
    tabs[i].addEventListener('click', () => tabClick(i));
  }

  function tabClick(currentTab) {
    removeActive();
    tabs[currentTab].classList.add('active');
    content[currentTab].classList.add('active');
    console.log(currentTab);
  }

  function removeActive() {
    for (let i = 0; i < tabs.length; i++) {
      tabs[i].classList.remove('active');
      content[i].classList.remove('active');
    }
  }
//tabsnew
  var tab = document.querySelector('.specialoffertabs');
  var tabButtons = document.querySelectorAll('[role="tab"]');
  var tabPanels = Array.from(document.querySelectorAll('[role="tabpanel"]'));

  function tabClickHandler(e) {
  //Hide All Tabpane
    tabPanels.forEach(panel => {
      panel.hidden = 'true';
    });
    
  //Deselect Tab Button
    tabButtons.forEach( button => {
      button.setAttribute('aria-selected', 'false');
    });
    
  //Mark New Tab
    e.currentTarget.setAttribute('aria-selected', 'true');
    
  //Show New Tab
    var { id } = e.currentTarget;
    
    var currentTab = tabPanels.find(
      panel => panel.getAttribute('aria-labelledby') === id
      );
    
    currentTab.hidden = false;
  }


  tabButtons.forEach(button => {
    button.addEventListener('click', tabClickHandler);

  });
//We best
//  TESTIMONIALS CAROUSEL HOOK
  var swiper = new Swiper(" .swiper-container", {
    initialSlide:2,
    speed:200,
    effect: "coverflow",
    loop:true,
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    autoplay: {
      delay: 2000,
      disableOnInteraction: false
    },
    coverflowEffect: {
      rotate: 10,
      stretch: 100,
      depth: 200,
      modifier: .5,
      slideShadows: true
    },


    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
      
    }
  });


  // Cart Item 
  
  
})()