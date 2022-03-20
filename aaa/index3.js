(function () {
    var slideList = document.getElementById("slide-list"),
        slideWrapWidth = slideList.parentNode.offsetWidth,
        totalSlides = slideList.querySelectorAll("li").length,
        prevBtn = document.getElementById("btn-prev"),
        nextBtn = document.getElementById("btn-next"),
        animteSlides = false,
        timer = null;

    if ( totalSlides > 1 ) {
        prevBtn.addEventListener("click", function(e){
            e.preventDefault();

            if ( ! animteSlides ) {
                animteSlides = true;

                var elem = slideList.querySelector("li:last-of-type");
                slideList.insertBefore(elem, slideList.querySelector("li:first-of-type"));

                slideList.style.transitionProperty = "none";
                slideList.style.left = -slideWrapWidth + "px";

                setTimeout(function(){
                    slideList.style.transitionProperty = "left";
                    slideList.style.left = '0px';
                }, 50);

                setTimeout(function(){
                    animteSlides = false;
                }, 300);
                resetInterval();
            }
        });

        nextBtn.addEventListener("click", function(e){
            e.preventDefault();

            if ( ! animteSlides ) {
                animteSlides = true;

                slideList.style.transitionProperty = "left";
                slideList.style.left = -slideWrapWidth + "px";

                setTimeout(function(){
                    var elem = slideList.querySelector("li:first-of-type");
                    slideList.appendChild(elem);

                    slideList.style.transitionProperty = "none";
                    slideList.style.left = '0px';
                }, 300);

                setTimeout(function(){
                    animteSlides = false;
                }, 300);
                resetInterval();
            }
        });
    }


    



    // reset interval
    function resetInterval() {
        // if (pauseBtn.classList == 'stop') {
            clearInterval(timer);
            autoplay();
        // }
    }

    slideList.addEventListener('mouseover', function(){
        if ( timer ) {
            clearInterval(timer);
            timer = null;
        }
    });

    slideList.addEventListener('mouseout', function(){
        autoplay();
    });

    
    function autoplay(){
        if ( nextBtn ) {
            timer = setInterval(function(){
                nextBtn.click();
            }, 2000);
        }
    }


    function slideMotion(){
        slideWrapWidth = slideList.parentNode.offsetWidth;
        var items = slideList.querySelectorAll("li");

        for (var i = 0; i < items.length; i++) {
            items[i].style.width = slideWrapWidth + "px";
        }

        slideList.style.width = (slideWrapWidth * items.length) + "px";
    }




    window.addEventListener("resize", function (e) {
        slideMotion();
    });

    window.addEventListener("load", function (e) {
        autoplay();
        slideMotion();
    });

})();