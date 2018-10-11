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
  // Filter
  $('#filter').change(function () {
    var selectedID = $(this)[0].selectedIndex;
    var $selected = $(this).children('option:nth-child(' + (selectedID + 1) + ')');
    var option = $selected.attr('value').replace('option-', '');
    filterRowsBy(option);
  });
  //


  function uncheckAllFilters() {
    $(".table-filter-checkbox").each(function () {
      if (this.value !== "all") {
        $(this).prop("checked", false);
      }
    });
  }

  function uncheckSelectAllFilter() {
    $(".table-filter-checkbox[value='all']").prop("checked", false);
  }

  $(".table-filter-checkbox").each(function () {
    $(this).on("change", function (e) {
      var value = e.currentTarget.value;
      var wrapper = $('.partners-table');
      console.log(value);

      wrapper.find(".partners-table--item").each(function () {
        var item = $(this);

        if (value === "all") {
          uncheckAllFilters();
          item.show();
        } else {
          uncheckSelectAllFilter();
          var itemCategories = item.attr("data-categories");
          var selectedCategories = $(".table-filter-checkbox").filter(function (i, item) {
            return item.checked === true;
          }).map(function (i, item) {
            return item.value;
          });

          var includeAll = true;
          for (var i = 0; i < selectedCategories.length; i++) {
            if (itemCategories.indexOf(selectedCategories[i]) === -1) {
              includeAll = false;
              break;
            }
          }

          if (includeAll) {
            item.show();
          } else {
            item.hide();
          }
        }
      });
    });
  });

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