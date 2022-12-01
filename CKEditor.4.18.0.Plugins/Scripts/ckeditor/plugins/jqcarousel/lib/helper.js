
var addEditControls = function () {
        var carousels = $(CKEDITOR.instances.e1.window.getFrame().$).contents().find('.carousel.slide');
        var carouselCount = carousels.length;
        for (let i = 0; i < carouselCount; i++) {
            var carouselID = carousels[i].id;
            var carousel = $(CKEDITOR.instances.e1.window.getFrame().$).contents().find('#' + carouselID); // selecting by id so we get the dom element...

            var carousel_slides = carousel.find('.carousel-inner .item.' + carouselID);
            var slideCount = carousel_slides.length;

            var controls = '<div id="slide-controls" class="positionabsolute leftcontrol top15">';
            controls += '<button class="btn btn-primary btn-slide mr10" data-action="add-slide-' + carouselID + '" data-id="' + carouselID + '">Add Slide</button>';
            controls += '<button class="btn btn-primary btn-slide mr10" data-action="upload-image-' + carouselID + '" data-id="' + carouselID + '">Upload Image</button>&nbsp;';
            controls += '<button class="btn btn-danger btn-slide mr10" data-action="delete-slide-' + carouselID + '" data-id="' + carouselID + '">Delete Slide</button>';
            controls += '<button class="btn btn-primary btn-slide" data-action="image-reposition-' + carouselID + '" data-status="view" data-id="' + carouselID + '">Position</button>';
            controls += '</div>';

            for (let i = 0; i < slideCount; i++) {
                if (carousel_slides[i].children[0].id.toLowerCase().localeCompare('slide-controls') != 0) {
                    carousel_slides[i].insertAdjacentHTML("afterbegin", controls);
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

    /*
        this function enables the dragging of images of slider. 
        this function activates when Reposition button is clicked.
        */
    var carousel_drag = function (carousel) {
        var carouselID = carousel[0].id;

        carousel.find('.carousel-inner .item.' + carouselID + '.active').imagedrag({
            input: "#output",
            position: "top",
            attribute: "html"
        }).css({
            "cursor": "move"
        });

        carousel.find('.carousel-inner .item.' + carouselID + '.active [data-action="image-reposition-' + carouselID + '"]').text('Save Changes').attr('data-status', 'edit');

        carousel.find('.carousel-inner .item.' + carouselID + '.active img').draggable('enable');
    };

    var runHelper = function () {
        addEditControls();
        var carousels = $(CKEDITOR.instances.e1.window.getFrame().$).contents().find('.carousel.slide');
        var carouselCount = carousels.length;

        for (let i = 0; i < carouselCount; i++) {
            var carouselID = carousels[i].id;
            var carousel = $(CKEDITOR.instances.e1.window.getFrame().$).contents().find('#' + carouselID); // selecting by id so we get the dom element...

            /*
            this function handles the click event of Reposition click event.
            it checks if the current status is edit or view only.
            Edit mode is when user can drag image.  
            */
            carousel.on('click', '[data-action="image-reposition-' + carouselID + '"]', function () {
                var that = this;
                var carouselID = that.getAttribute("data-id");
                var carousel = $(CKEDITOR.instances.e1.window.getFrame().$).contents().find('#' + carouselID);

                if ($(this).attr('data-status') == "view") {
                    carousel_drag(carousel);
                } else {
                    carousel.find('.carousel-inner .item.' + carouselID + '.active img').draggable('disable').css({
                        "cursor": "default"
                    });
                    $(this).text("Reposition").attr("data-status", "view");
                }
            });


            /* this function adds new slide in carousel */
            carousel.on('click', '[data-action="add-slide-' + carouselID + '"]', function () {
                var that = this;
                var carouselID = that.getAttribute("data-id");
                var carousel = $(CKEDITOR.instances.e1.window.getFrame().$).contents().find('#' + carouselID);

                var count_carousel = carousel.find('.carousel-inner .item.' + carouselID).length;

                var new_indicator = '<li data-target="#' + carouselID + '" data-slide-to="' + (count_carousel) + '" class="active"></li>';

                var new_slider = '<div class="item ' + carouselID + ' active" data-slide-index="' + count_carousel + '">';
                new_slider += '<img src="../Scripts/ckeditor/plugins/jqcarousel/images/InsertImageHere.png" alt="..." class="w100p">';
                new_slider += '<div class="carousel-caption"> ';
                //new_slider += 'Slider ' + (count_carousel + 1) + ' Caption';
                new_slider += '</div>';
                new_slider += '</div>';

                carousel.find('.carousel-inner .item.' + carouselID).removeClass('active');
                carousel.find('.carousel-indicators li').removeClass('active');

                carousel.find('.carousel-indicators').append(new_indicator);
                carousel.find('.carousel-inner').append(new_slider);

                addEditControls();
            });


            /*
            this function is triggered when user click image upload button
            it opens the file browsing window to select image.
            */
            carousel.on('click', '[data-action="upload-image-' + carouselID + '"]', function () {
                debugger
                var that = this;
                var carouselID = that.getAttribute("data-id");
                var carousel = $(CKEDITOR.instances.e1.window.getFrame().$).contents().find('#' + carouselID);
                var slideIdentifier = carousel.find('.ImageUpdate');  //there should only be one in the carousel
                //set the carouselID and slideindex we want to upload the image on to be used on the dialog window
                slideIdentifier[0].setAttribute('carouselid', carouselID);
                var slideIndex = that.parentElement.parentElement.getAttribute('data-slide-index');
                slideIdentifier[0].setAttribute('slideindex', slideIndex);

                CKEDITOR.instances.e1.execCommand('jqcarouselRequestUpload');
            });


            /*
            this function deletes the slide from carousel.
            */
            carousel.on('click', '[data-action="delete-slide-' + carouselID + '"]', function () {
                var that = this;
                var carouselID = that.getAttribute("data-id");
                var carousel = $(CKEDITOR.instances.e1.window.getFrame().$).contents().find('#' + carouselID);

                var slider_index = $(this).parents().eq(1).attr('data-slide-index');

                $(this).parents().eq(1).remove();
                carousel.find('.carousel-indicators li[data-slide-to="' + slider_index + '"]').remove();

                carousel.find('.carousel-inner .item.' + carouselID + ':first-child').addClass('active');
                carousel.find('.carousel-indicators li:first-child').addClass('active');
            });

        }
    }






