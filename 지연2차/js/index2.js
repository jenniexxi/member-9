const slideWrap = document.querySelector('.kv-wrap');
const slideList = document.querySelector('.kv-slide-inner');
const slides = document.querySelectorAll('.kv-slide-inner li');
const slideFirst = document.querySelector('.kv-slide-inner li:first-child');
const slideLast = document.querySelector('.kv-slide-inner li:last-child');
const slideLength = slides.length;
const prevBtn = document.querySelector('.slide-prev');
const nextBtn = document.querySelector('.slide-next');
const pauseBtn = document.querySelector('.stop');
const active = "active";
let slideWidth = 100;
let startNum = 0;
let selectIndex;
let selectSlide;
let contsWidth = (slideWidth / (slideLength + 2));

// clone first and last slide
const firstNode = slideFirst.cloneNode(true);
const lastNode = slideLast.cloneNode(true);
firstNode.style.width = contsWidth + "%";
lastNode.style.width = contsWidth + "%";

// append slides
slideList.appendChild(firstNode);
slideList.insertBefore(lastNode, slideList.firstElementChild);

slideList.style.width = (slideWidth * (slideLength + 2)) + "%";
for(let i = 0; i < slideLength; i++) {
    slides[i].style.width = contsWidth + "%";
}
slideList.style.transform = `translate(-${contsWidth * (startNum + 1)}% , 0)`;

selectIndex = startNum;
selectSlide = slides[selectIndex];
selectSlide.classList.add(active);

function nextEvent(){
    if(selectIndex <= slideLength - 1) {
        slideList.style.transition = `all 0.3s`;
        slideList.style.transform = `translate(-${contsWidth * (selectIndex + 2)}%, 0)`;
    }
    if(selectIndex === slideLength - 1) {
        setTimeout(function(){
            slideList.style.transition = `0s`;
            slideList.style.transform = `translate(-${contsWidth}%, 0)`;
        }, 300);
        selectIndex = -1;
    }
    selectSlide.classList.remove(active);
    selectSlide = slides[++selectIndex];
    selectSlide.classList.add(active);
}

function prevEvent() {
    if(selectIndex >= 0) {
        slideList.style.transition = `all 0.3s`;
        slideList.style.transform = `translate(-${contsWidth * selectIndex}%, 0)`;
    }
    if(selectIndex === 0) {
        setTimeout(function(){
            slideList.style.transition = `0s`;
            slideList.style.transform = `translate(-${contsWidth * slideLength}%, 0)`;
        }, 300);
        selectIndex = slideLength;
    }
    selectSlide.classList.remove(active);
    selectSlide = slides[--selectIndex];
    selectSlide.classList.add(active);
}

// next button
nextBtn.addEventListener('click', function(){
    nextEvent();
})

// prev button
prevBtn.addEventListener('click', function(){
    prevEvent();
})

// play, pause button
let play = setInterval(nextEvent, 3500);

function puaseTogglePlay() {
    const btnText = pauseBtn.querySelector('.blind');
    if (pauseBtn.classList == 'stop') {
        clearInterval(play);
        pauseBtn.classList.remove("stop");
        pauseBtn.classList.add("play");
        btnText.innerText = "재생";
    } else {
        play = setInterval(nextEvent, 3500);
        pauseBtn.classList.remove("play");
        pauseBtn.classList.add("stop");
        btnText.innerText = "일시중지";
    }
}

pauseBtn.addEventListener('click', function(){
    puaseTogglePlay();
})







// Add pagination dynamically
let pageChild = '';
for (var i = 0; i < slideLen; i++) {
  pageChild += '<li class="dot';
  pageChild += (i === startNum) ? ' dot_active' : '';
  pageChild += '" data-index="' + i + '"><a href="#"></a></li>';
}
pagination.innerHTML = pageChild;
const pageDots = document.querySelectorAll('.dot');



/** Pagination Button Event */
let curDot;
Array.prototype.forEach.call(pageDots, function (dot, i) {
  dot.addEventListener('click', function (e) {
    e.preventDefault();
    curDot = document.querySelector('.dot_active');
    curDot.classList.remove('dot_active');
    
    curDot = this;
    this.classList.add('dot_active');

    curSlide.classList.remove('slide_active');
    curIndex = Number(this.getAttribute('data-index'));
    curSlide = slideContents[curIndex];
    curSlide.classList.add('slide_active');
    slideList.style.transition = slideSpeed + "ms";
    slideList.style.transform = "translate3d(-" + (slideWidth * (curIndex + 1)) + "px, 0px, 0px)";
  });
});



