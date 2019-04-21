$(function() {

// stars rating
var stars = $(".star__item");
var starsActive;
var starsSelect;
  
stars.hover(function(el) {
  starsActive = stars.slice(0, $(this).index()+1);
  starsActive.addClass("star__item_active");
},
function(){
  stars.removeClass("star__item_active");
});

stars.on("click", function() {
  stars.removeClass("star__item_select");
  starsActive.addClass("star__item_select");
  starsSelect = starsActive;
});

//mobile nav
	$('.burger-link').click(function(){
		$(this).toggleClass('close');
		$('.header-nav__list.mobile-nav').toggleClass('close');
	});

	

}); // end jquery