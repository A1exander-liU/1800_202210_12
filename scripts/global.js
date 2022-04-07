// load skeltons using JS
function loadSkeleton(){
    console.log($('#headerPlaceholder').load('../partials/header.html'));
    console.log($('#menubarPlaceholder').load('../partials/menubar.html'));
    console.log($('#footerPlaceholder').load('../partials/footer.html'));
    console.log($('#buttonPlaceholder').load('../partials/floatbutton.html'));
    console.log($('#promptPlaceholder').load('../partials/prompt.html'));
    console.log($('#carouselPlaceholder').load('../partials/carousel.html'));
}

loadSkeleton();


(function() {
    window.onresize = displayWindowSize;
    window.onload = displayWindowSize;

    function displayWindowSize() {
      let myWidth = window.innerWidth;
      let myHeight = window.innerHeight;
      console.log(myWidth, myHeight)
      $('.confirmation').css({'top': myHeight / 2.9, 'right': myWidth / 2.7})
    };


  })();

function setup() {
    $('body').on('click', '.trigger', function(){
        $('.toast').toast('show');
    })
}

$(document).ready(setup)
