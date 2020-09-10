$(document).ready( () => {
    $('#responsive-slick').slick({
        infinite: true,
        dots: false,
        slidesToShow: 4,
        slidesToScroll: 4,
        centerMode: true,
        arrows: false,
        responsive: [
            {
            breakpoint: 1024,
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
            }
        ]
    })
})
$('.left').click(function(){
  $('#responsive-slick').slick('slickPrev');
})

$('.right').click(function(){
  $('#responsive-slick').slick('slickNext');
})