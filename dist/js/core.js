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

  $('.question h6').click(function () {
    $(this).children().text($(this).children().text() == '+' ? '-' : '+');
    $(this).next('.content').slideToggle();
  });

  // Sticky Sidebar
  $('.sticky-sidebar').theiaStickySidebar({
    containerSelector: '.sticky-sidebar-parent',
    additionalMarginTop: 10,
    additionalMarginBottom: 30
  });

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

  $('#stars li').on('click', function () {
    var onStar = parseInt($(this).data('value'), 10);
    var stars = $(this).parent().children('li.star');
    for (i = 0; i < stars.length; i++) {
      $(stars[i]).removeClass('selected');
    }
    for (i = 0; i < onStar; i++) {
      $(stars[i]).addClass('selected');
    }
  });

  // Filtering reviews - function
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