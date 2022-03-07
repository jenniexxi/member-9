const slideList = document.querySelector('.kv-slide-wrap');
const slideContents = document.querySelectorAll('.kv-slide-wrap section');
const slideBtnNext = document.querySelector('.slide-next');
const slideBtnPrev = document.querySelector('.slide-prev');
const pagination = document.querySelector('.slide-controls ul');
const slideLen = slideContents.length;
const slideWidth = 100;
const slideSpeed = 300;
slideList.style.width = slideWidth * (slideLen) + "%";
let curIndex = 0; // current slide index (except copied slide)


/** Next Button Event */
slideBtnNext.addEventListener('click', function() {
    if (curIndex <= slideLen - 1) {
        slideList.style.transition = slideSpeed + "ms";
        slideList.style.transform = "translate3d(-" + (slideWidth * (curIndex + 1)) + "px, 0px, 0px)";
    }
    curSlide = slideContents[++curIndex];
});



