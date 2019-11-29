$(document).ready(function() {
  $(window).scroll(function() {
    scroll = $(window).scrollTop();
    if (scroll > 100) {
      $('.menu').css({ position: 'fixed' });
      $('.menu').css({ width: '100%' });
      $('.menu').css({ top: '0' });
      $('.menu').css({ background: '#fff' });
      $('.menu a').css({ color: '#000' });
      $('.logo').css({ color: '#000' });
      $('.menu').css({ 'box-shadow': 'rgba(0,0,0,0.22) 6px 1px 1px' });
      $('.menu').css({ 'z-inidex': '100vh' });
    } else {
      $('.menu').css({ position: 'relative' });
      $('.menu').css({ background: 'transparent' });
      $('.menu').css({ 'box-shadow': '0 0 0' });
      $('.menu a').css({ color: '#fff' });
      $('.logo').css({ color: '#fff' });
    }
  });
  $('.menu-icon').click(function() {
    $('header nav').slideToggle();
    $('header nav').css({ background: '#979CBF' });
  });
});
