var deleteEditControls = function () {
    //debugger
    var carousels = $('.carousel.slide');
    var carouselCount = carousels.length;
    for (let i = 0; i < carouselCount; i++) {
        var carouselID = carousels[i].id;
        var carousel = $('#' + carouselID); 

        var carousel_slides = carousel.find('.carousel-inner .item.' + carouselID);
        var slideCount = carousel_slides.length;

        for (let i = 0; i < slideCount; i++) {
            if (carousel_slides[i].children[0].id.toLowerCase().localeCompare('slide-controls') == 0) {
                carousel_slides[i].children[0].remove();
            }
        }

        var leftControl = carousel.find('.left.carousel-control');
        leftControl = leftControl[0];
        if (leftControl.children[0].getAttribute('class') == 'sr-only') {
            leftControl.insertAdjacentHTML('afterbegin', '<span class="glyphicon glyphicon-chevron-left" aria-hidden="true">');
        }

        var rightControl = carousel.find('.right.carousel-control');
        rightControl = rightControl[0];
        if (rightControl.children[0].getAttribute('class') == 'sr-only') {
            rightControl.insertAdjacentHTML('afterbegin', '<span class="glyphicon glyphicon-chevron-right" aria-hidden="true">');
        }
    }
};


document.addEventListener('DOMContentLoaded', function () {
    deleteEditControls();
});