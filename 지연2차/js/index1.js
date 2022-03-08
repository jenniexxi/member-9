const slideList = document.querySelector('.kv-slide-inner');
const slideContents = document.querySelectorAll('.kv-slide-inner li');
const slideBtnNext = document.querySelector('.slide-next');
const slideBtnPrev = document.querySelector('.slide-prev');
const pagination = document.querySelector('.slide-controls ul');
const slideLen = slideContents.length;
let slideWidth = slideContents[0].offsetWidth;
const slideSpeed = 100;
const startNum = 0;

slideList.style.width = slideWidth * (slideLen + 2) + "px";

// Copy first and last slide
const firstChild = slideList.firstElementChild;
const lastChild = slideList.lastElementChild;
const clonedFirst = firstChild.cloneNode(true);
const clonedLast = lastChild.cloneNode(true);

// Add copied Slides
slideList.appendChild(clonedFirst);
slideList.insertBefore(clonedLast, slideList.firstElementChild);

// Add pagination dynamically
let pageChild = '';
for (var i = 0; i < slideLen; i++) {
  pageChild += '<li class="dot';
  pageChild += (i === startNum) ? ' dot_active' : '';
  pageChild += '" data-index="' + i + '"><a href="#"></a></li>';
}
pagination.innerHTML = pageChild;
const pageDots = document.querySelectorAll('.dot');

slideList.style.transform = "translate3d(-" + (slideWidth * (startNum + 1)) + "px, 0px, 0px)";

let curIndex = startNum;
let curSlide = slideContents[curIndex];
curSlide.classList.add('slide_active');

/** Next Button Event */
function nextEvent() {
  if (curIndex <= slideLen - 1) {
    slideList.style.transition = slideSpeed + "ms";
    slideList.style.transform = "translate3d(-" + (slideWidth * (curIndex + 2)) + "px, 0px, 0px)";
  }
  if (curIndex === slideLen - 1) {
    setTimeout(function() {
      slideList.style.transition = "0ms";
      slideList.style.transform = "translate3d(-" + slideWidth + "px, 0px, 0px)";
    }, slideSpeed);
    curIndex = -1;
  }
  curSlide.classList.remove('slide_active');
  pageDots[(curIndex === -1) ? slideLen - 1 : curIndex].classList.remove('dot_active');
  curSlide = slideContents[++curIndex];
  curSlide.classList.add('slide_active');
  pageDots[curIndex].classList.add('dot_active');
}



/** Prev Button Event */
function prevEvent() {
  if (curIndex >= 0) {
    slideList.style.transition = slideSpeed + "ms";
    slideList.style.transform = "translate3d(-" + (slideWidth * curIndex) + "px, 0px, 0px)";
  }
  if (curIndex === 0) {
    setTimeout(function() {
      slideList.style.transition = "0ms";
      slideList.style.transform = "translate3d(-" + (slideWidth * slideLen) + "px, 0px, 0px)";
    }, slideSpeed);
    curIndex = slideLen;
  }
  curSlide.classList.remove('slide_active');
  pageDots[(curIndex === slideLen) ? 0 : curIndex].classList.remove('dot_active');
  curSlide = slideContents[--curIndex];
  curSlide.classList.add('slide_active');
  pageDots[curIndex].classList.add('dot_active');
}


slideBtnNext.addEventListener('click', function() {
  nextEvent();
})

slideBtnPrev.addEventListener('click', function() {
  prevEvent();
})






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





window.onresize = function(event){
  console.log('resize')
  console.log('startNum:',startNum)
  let setWidth = window.innerWidth;

  slideList.removeAttribute("style");
  // slideList.style.setProperty('width', setWidth * (slideLen + 2) + "px");
  // slideList.style.setProperty('transform', "translate3d(-" + (setWidth * (startNum + 1)) + "px, 0px, 0px)");


  
  // if(setWidth <= "1440") {      
  //   [].forEach.call(slideContents, (slide) => {
  //     slide.style.setProperty('width', setWidth + 'px');
  //   });
  //   clonedFirst.style.setProperty('width', setWidth + 'px');
  //   clonedLast.style.setProperty('width', setWidth + 'px');
  // } else {
  //   console.log("1440 over")
  // }    
  
  
  nextEvent();
  prevEvent();
  


}


window.onload = function(event){
  let setWidth = window.innerWidth;

  // slideList.style.setProperty('width', setWidth * (slideLen + 2) + "px");
  // slideList.style.setProperty('transform', "translate3d(-" + (setWidth * (startNum + 1)) + "px, 0px, 0px)");




  
  // if(setWidth <= "1440") {
  //   [].forEach.call(slideContents, (slide) => {
  //     slide.style.setProperty('width', setWidth + 'px');
  //   });
  //   clonedFirst.style.setProperty('width', setWidth + 'px');
  //   clonedLast.style.setProperty('width', setWidth + 'px');
  // } else {
  //   console.log("1440 over")
  // }   


    
  nextEvent();
  prevEvent();

}
  

