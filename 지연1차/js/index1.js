(function () {
    const slideList = document.querySelector('.kv-slide-wrap');
    const slideContents = document.querySelectorAll('.kv-slide-wrap section');
    const slideBtnNext = document.querySelector('.slide-next');
    const slideBtnPrev = document.querySelector('.slide-prev');
    const pagination = document.querySelector('.slide-controls ul');
    const slideLen = slideContents.length;
    let slideWidth = slideContents[0].offsetWidth;
    const slideSpeed = 500;
    const startNum = 0;
    
    // console.log(slideContents.style.width);
    slideList.style.width = slideWidth * (slideLen + 2) + "px";

    // Copy first and last slide
    let firstChild = slideList.firstElementChild;
    let lastChild = slideList.lastElementChild;
    let clonedFirst = firstChild.cloneNode(true);
    let clonedLast = lastChild.cloneNode(true);

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
    slideBtnNext.addEventListener('click', function() {
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
    });

    /** Prev Button Event */
    slideBtnPrev.addEventListener('click', function() {
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
    });

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

    

    // setInterval(function() {
    //   if (curIndex <= slideLen - 1) {
    //     slideList.style.transition = slideSpeed + "ms";
    //     slideList.style.transform = "translate3d(-" + (slideWidth * (curIndex + 2)) + "px, 0px, 0px)";
    //   }
    //   if (curIndex === slideLen - 1) {
    //     setTimeout(function() {
    //       slideList.style.transition = "0ms";
    //       slideList.style.transform = "translate3d(-" + slideWidth + "px, 0px, 0px)";
    //     }, slideSpeed);
    //     curIndex = -1;
    //   }
    //   curSlide.classList.remove('slide_active');
    //   pageDots[(curIndex === -1) ? slideLen - 1 : curIndex].classList.remove('dot_active');
    //   curSlide = slideContents[++curIndex];
    //   curSlide.classList.add('slide_active');
    //   pageDots[curIndex].classList.add('dot_active');
    // }, 1000)
    

    window.onresize = function(event){
      let setWidth = window.innerWidth;
      if(setWidth <= "1440") {
        // console.log(slideContents)
        // slideContents.offsetWidth = innerWidth;
        // console.log(setWidth);

        
        [].forEach.call(slideContents, (slide) => {
          slide.style.setProperty('width', setWidth + 'px');
        });


        // slideContents[0].style.setProperty('width', setWidth + 'px');
        // slideBtnPrev.style.setProperty('width', '200px');
        
        // console.log(slideBtnPrev.style.setProperty('width', setWidth))
        // console.log(window.getComputedStyle(slideBtnPrev).getPropertyValue('width'))
        // let __marginRight = Math.round(window.getComputedStyle(__el).getPropertyValue(__marginDirection).replace(/[^0-9^.]/g, ''));
          // document.querySelectorAll('.slideContents section').style.width = setWidth;
          // slideContents[i].style.width = innerWidth;
          // console.log(slideContents[i].style.width = innerWidth)
          // console.log(slideContents[i].style.width)
      } else {
        console.log("1440 over")
      }      
    }
  

  })();