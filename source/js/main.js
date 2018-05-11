/*  global jQuery, $  */

jQuery(document).ready(function () {
  $('nav#menu').mmenu({
    drag: true,
    pageScroll: {
      scroll: true,
      update: true
    },
    'extensions': [
      'theme-dark',
      'fx-menu-fade',
      'fx-listitems-slide'
    ]
  }, {
    classNames: {
      fixedElements: {
        fixed: 'fix',
        sticky: 'sticky-top'
      }
    }
  })
  $('#pageHeader').sticky({topSpacing: 0})
  $('#pageHeader').on('sticky-end', function () { $(this).parent('.sticky-wrapper').css({height: 'auto'}) }) // sticky 補丁

  $().UItoTop({ easingType: 'easeOutQuart' })
  $('.dropdown-hover').dropdownHover(100)

  $('#heroBanner').slick({
    lazyLoad: 'ondemand', // lazyLoad
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000
  })
  $('.process-slider').slick({
    lazyLoad: 'ondemand', // lazyLoad
    slidesToShow: 4,
    slidesToScroll: 1,
    dots: true,
    centerMode: false,
    arrows: false,
    focusOnSelect: true,
    responsive: [{
      breakpoint: 1441,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 1201,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }]
  })

  $('.process-slider-two').slick({
    lazyLoad: 'ondemand', // lazyLoad
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    responsive: [{
      breakpoint: 1440,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 3,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 768,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }]
  })

  $('.one-time').slick({
    lazyLoad: 'ondemand', // lazyLoad
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: false,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 7000
  })

  $('.product-one-time').slick({
    lazyLoad: 'ondemand', // lazyLoad
    dots: true,
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    adaptiveHeight: true
  })

  $('.papperproduct-one-time').slick({
    lazyLoad: 'ondemand', // lazyLoad
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: false,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 7000,
    fade: true,
    cssEase: 'linear'
  })

  $('.responsive').slick({
    lazyLoad: 'ondemand', // lazyLoad
    autoplay: true,
    autoplaySpeed: 3500,
    dots: false,
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [{
      breakpoint: 1140,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: false
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }]
  })

  $('.slider-for').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.slider-nav'
  })
  $('.slider-nav').slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    dots: false,
    centerMode: true,
    focusOnSelect: true
  })

  $('.lazy').Lazy()
})
