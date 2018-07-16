// scroll resize
$(window).on("scroll", function(){
  if
    ($(window).scrollTop() > 100){
    $("page-header").addClass("shrink");
  }
  else
  {
    $("page-header").removeClass("shrink");
  }
});

// scroll reveal effect
window.sr = ScrollReveal();
sr.reveal('.header-img');
sr.reveal('.page-header');
sr.reveal('.about-title');
sr.reveal('.about-details');
sr.reveal('.case-img');
sr.reveal('.practice-title');
sr.reveal('.practice-details');
