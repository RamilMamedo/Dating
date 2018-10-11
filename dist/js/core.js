'use strict';

document.addEventListener('DOMContentLoaded', function () {
  // Hamburger
  $('.hamburger').on('touchstart click', function (e) {
    e.preventDefault();
    $(this).toggleClass('active');
    $('.mobile').show('slow');
    $('.mobile .hamburger').addClass('active');
    return false;
  });
  if ($('.mobile .hamburger').hasClass('active')) {
    $('.mobile .hamburger').on('touchstart click', function (e) {
      e.preventDefault();
      $('.mobile').hide('slow');
      $('.header .hamburger').removeClass('active');
    });
  }

  //  Rating Stars
  $('#stars li').on('mouseover', function () {
    var onStar = parseInt($(this).data('value'), 10);
    $(this).parent().children('li.star').each(function (e) {
      if (e < onStar) {
        $(this).addClass('hover');
      } else {
        $(this).removeClass('hover');
      }
    });
  }).on('mouseout', function () {
    $(this).parent().children('li.star').each(function (e) {
      $(this).removeClass('hover');
    });
  });
  $('#stars li').one('click', function () {
    var onStar = parseInt($(this).data('value'), 10);
    var stars = $(this).parent().children('li.star');
    for (i = 0; i < stars.length; i++) {
      $(stars[i]).removeClass('selected');
    }
    for (i = 0; i < onStar; i++) {
      $(stars[i]).addClass('selected');
    }

    var countEl = $(this).closest('.partner-rank').find('.count');
    var count = parseInt(countEl.text());
    countEl.text(count + 1);
  });
  //  Arrow Up
  $('.arrow-up').on('click', function () {
    $('html, body').animate({
      scrollTop: 0
    }, 'slow');
    return false;
  });
  //  Accordion
  $('.question h6').on('click', function () {
    $(this).next('.content').slideToggle();
    $(this).children().toggleClass('active');
  });
  // Sticky Partner Row
  var nav = $('.review-page-banner');
  var navPos, winPos, navHeight;
  function refreshVar() {
    if (document.querySelector('.review-page-banner')) {
      navPos = nav.offset().top;
      navHeight = nav.outerHeight(true);
    }
  }
  refreshVar();
  $(window).resize(refreshVar);
  $('<div class="clone-nav"></div>').insertBefore('.review-page-banner').css('height', navHeight).hide();
  $(window).scroll(function () {
    winPos = $(window).scrollTop();
    if (winPos >= navPos) {
      $('.review-page-banner').addClass('fixed shadow');
      $('.clone-nav').show();
    } else {
      $('.review-page-banner').removeClass('fixed shadow');
      $('.clone-nav').hide();
    }
  });
  // Sticky Sidebar
  $('.sticky-sidebar').theiaStickySidebar({
    containerSelector: '.sticky-sidebar-parent',
    additionalMarginTop: 20,
    additionalMarginBottom: 30
  });
  //  Swiper
  var swiper = new Swiper('.swiper-container', {
    pagination: {
      el: '.swiper-pagination',
      draggable: true,
      clickable: true,
      grabCursor: true
    },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false
    }
  });

  $(function () {
    var $container = $('.index .partners-table'),
        $checkboxes = $('.filter-block input');

    $container.isotope({
      itemSelector: '.item'
    });

    $checkboxes.change(function () {
      var filters = [];
      // get checked checkboxes values
      $checkboxes.filter(':checked').each(function () {
        filters.push(this.value);
      });
      filters = filters.join(', ');
      $container.isotope({ filter: filters });
      checkResults();
    });

    // Function to check if filters have some results
    function checkResults() {
      var visibleItemsCount = $container.data('isotope').filteredItems.length;
      if (visibleItemsCount > 0) {
        $('.no-results').hide();
        $('.index-bottom-text').css('marginTop', '45px');
      } else {
        $('.no-results').show();
        $('.index-bottom-text').css('marginTop', '90px');
      }
    }
  });

  //   Filtering reviews
  function filterRowsBy(options) {
    $('.partners-table--item').each(function () {
      if (options !== 'all' && options.length > 0) {
        var reviewShow = false,
            reviewCats = $(this).data('options').split(',');
        // Display apposite elements
        for (i = 0; i < reviewCats.length; i++) {
          if (options.indexOf(reviewCats[i]) != -1) {
            $(this).show(0);
            reviewShow = true;
            break;
          }
        }
        if (!reviewShow) $(this).hide(0);
      } else {
        $(this).show(0);
      }
    });
  }
});

function filterReviewsBy(filters) {
  $('.casino-reviews-list-item').each(function () {
    if (filters !== 'all' && filters.length > 0) {
      var reviewShow = false;
      var reviewCats = $(this).data('filters').split(',');
      for (i = 0; i < reviewCats.length; i++) {
        if (filters.indexOf(reviewCats[i]) != -1) {
          $(this).show(0);
          reviewShow = true;
          break;
        }
      }
      if (!reviewShow) {
        $(this).hide(0);
      }
    } else {
      $(this).show(0);
    }
  });
}