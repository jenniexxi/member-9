document.addEventListener("DOMContentLoaded", function(){
    var slider = document.getElementById("js-slideshow"),
        item_width = slider.parentNode.offsetWidth,
        animating = false,
        prev_button = null,
        next_button = null,
        total_items = slider.querySelectorAll("li").length,
        timer = null;

    window.addEventListener("resize", adjust, true);
    adjust();

    // Click handlers
    if ( total_items > 1 ) {
        // Add previous/next links
        prev_button = document.createElement("a");
        prev_button.setAttribute("href", "#");
        prev_button.setAttribute("id", "btn-prev");
        prev_button.innerHTML = '<i class="fa fa-angle-left"></i><span>Previous</span>';

        next_button = document.createElement("a");
        next_button.setAttribute("href", "#");
        next_button.setAttribute("id", "btn-next");
        next_button.innerHTML = '<i class="fa fa-angle-right"></i><span>Next</span>';

        slider.parentNode.appendChild(prev_button);
        slider.parentNode.appendChild(next_button);

        prev_button.addEventListener("click", function(e){
            e.preventDefault();

            if ( ! animating ) {
                animating = true;

                var elem = slider.querySelector("li:last-of-type");
                slider.insertBefore(elem, slider.querySelector("li:first-of-type"));

                slider.style.transitionProperty = "none";
                slider.style.left = -item_width + "px";

                setTimeout(function(){
                    slider.style.transitionProperty = "left";
                    slider.style.left = '0px';
                }, 50);

                setTimeout(function(){
                    animating = false;
                }, 300);
            }
        });

        next_button.addEventListener("click", function(e){
            e.preventDefault();

            if ( ! animating ) {
                animating = true;

                slider.style.transitionProperty = "left";
                slider.style.left = -item_width + "px";

                setTimeout(function(){
                    var elem = slider.querySelector("li:first-of-type");
                    slider.appendChild(elem);

                    slider.style.transitionProperty = "none";
                    slider.style.left = '0px';
                }, 300);

                setTimeout(function(){
                    animating = false;
                }, 300);
            }
        });

    }

    // Autoplay slider (but only when the window/tab is active
    // to save resources)
    document.addEventListener("visibilitychange", function() {
        if ( "undefined" !== typeof document.hidden && document.hidden ) {
            clearInterval(timer);
            timer = null;
        } else {
            autoplay();
        }
    }, false);

    // Resume/pause autoplay on hover in/out
    slider.addEventListener('mouseover', function(){
        if ( timer ) {
            clearInterval(timer);
            timer = null;
        }
    });

    slider.addEventListener('mouseout', function(){
        autoplay();
    });

    /** Helper functions */
    function autoplay(){
        if ( next_button ) {
            timer = setInterval(function(){
                next_button.click();
            }, 5000);
        }
    }

    function adjust(){
        item_width = slider.parentNode.offsetWidth;
        var items = slider.querySelectorAll("li");

        for (var i = 0; i < items.length; i++) {
            items[i].style.width = item_width + "px";
        }

        slider.style.width = (item_width * items.length) + "px";
    }
});