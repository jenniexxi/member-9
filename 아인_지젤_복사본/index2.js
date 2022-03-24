(function () {

    //초기형 객체 지형 ==> class
    const slide = {
        elem: {

        },
        reset: function () {
            //setting reset
        },

        setting: function () {
            //width 계산을 위한 reset call
            this.reset();

            //width setting
            if (window.innerWidth <= 1400) {

            }
        },

        drawPaging: function () {

        },

        getSlideIndex: function () {
            let index = 0;
            return index;
        },

        move: function () {
            let index = this.getSlideIndex();
        },

        event: function () {
            
        },

        resize: function () {
            this.setting();
        },

        init: function () {
            this.reset();
            this.setting();
            this.drawPaging();
            this.event();
        }
    }

    var delay = 300;
    var timer = null;

    //Javascript
    window.addEventListener('resize', function(){
        clearTimeout(timer);
        timer = setTimeout(function(){
            slide.resize();
        }, delay);
    });

    window.onload = function () {
        slide.init();
    }

})();


(function () {
    const body = document.querySelector('body');
    const container = document.querySelector('#container');
    const slideWrap = document.querySelector('.kv-wrap');
    let slideList = document.querySelector('.kv-slide-inner');
    const slides = document.querySelectorAll('.kv-slide-inner li');
    const slideFirst = document.querySelector('.kv-slide-inner li:first-child');
    const slideLast = document.querySelector('.kv-slide-inner li:last-child');
    const slideLength = slides.length;
    const prevBtn = document.querySelector('.slide-prev');
    const nextBtn = document.querySelector('.slide-next');
    const pauseBtn = document.querySelector('.stop');
    const active = "active";
    let slideWidth = getComputedStyle(slides[0]).getPropertyValue("width").replace(/[^0-9^.]/g, '');
    // let slideWidth;
    let startNum = 0;
    let selectIndex;
    let selectSlide;
    // let contsWidth = (slideWidth / (slideLength + 2));
    const pagination = document.querySelector('.slide-controls ul');
    const slideSpeed = 300;
    let play = setInterval(nextEvent, 3500);
    let curDot;

    const firstNode = slideFirst.cloneNode(true);
    const lastNode = slideLast.cloneNode(true);

    
    slideList.appendChild(firstNode);
    slideList.insertBefore(lastNode, slideList.firstElementChild);

    function resizeGetFn() {
        let newWidth = window.innerWidth;

        // if (slideWidth > 1440) {
        //     slideWidth = newWidth;
        //     slideList.style.width = slideWidth * (slideLength + 2) + "px";
        //     slideList.style.transform = "translate(-" + slideWidth * (startNum + 1) + "px, 0)";
        //     for(let i = 0; i < slideLength; i++) {
        //         slides[i].style.width = slideWidth + "px";
        //     }
        //     firstNode.style.width = slideWidth + "px";
        //     lastNode.style.width = slideWidth + "px";
        // }


        if( slideWidth < newWidth ) {
            // slideWidth = slideWidth;
            // slideWidth.style.removeProperty('width');

            slideList.style.width = slideWidth * (slideLength + 2) + "px";
            slideList.style.transform = "translate(-" + slideWidth * (startNum + 1) + "px, 0)";
            for(let i = 0; i < slideLength; i++) {
                slides[i].style.width = slideWidth + "px";
            }
            firstNode.style.width = slideWidth + "px";
            lastNode.style.width = slideWidth + "px";
        } else {
            slideWidth = newWidth;
            slideList.style.width = slideWidth * (slideLength + 2) + "px";
            slideList.style.transform = "translate(-" + slideWidth * (startNum + 1) + "px, 0)";
            for(let i = 0; i < slideLength; i++) {
                slides[i].style.width = slideWidth + "px";
            }
            firstNode.style.width = slideWidth + "px";
            lastNode.style.width = slideWidth + "px";
        }
    }
    

    window.addEventListener('load', function (e) {
        resizeGetFn();
    }, true);

    window.addEventListener('resize', function (e) {
        resizeGetFn();
    }, true);

    // slideList.style.width = slideWidth * (slideLength + 2) + "px";





    // append slides


    // slideList.style.width = (slideWidth * (slideLength + 2)) + "px";
    // for(let i = 0; i < slideLength; i++) {
    //     slides[i].style.width = slideWidth + "px";
    // }
    

    selectIndex = startNum;
    selectSlide = slides[selectIndex];
    selectSlide.classList.add(active);



    // Add pagination dynamically
    let pageChild = '';
    for (let i = 0; i < slideLength; i++) {
        pageChild += '<li class="';
        pageChild += (i === startNum) ? 'on' : '';
        pageChild += '" data-index="' + i + '">';
        pageChild += '<button type="button"><span class="blind">slide' + i + '</span></button></li>';
    }
    pagination.innerHTML = pageChild;
    const pageDots = document.querySelectorAll('.slide-controls ul li');



    // pagination button event
    [Array.prototype].forEach.call(pageDots, function (dot, i) {
        dot.addEventListener('click', function (e) {
            e.preventDefault();
            resetInterval();

            curDot = document.querySelector('.on');
            curDot.classList.remove('on');
            
            curDot = this;
            this.classList.add('on');

            selectIndex = Number(this.getAttribute('data-index'));
            selectSlide = slides[selectIndex];
            slideList.style.transition = slideSpeed + "ms";
            slideList.style.transform = "translate(-" + slideWidth * (selectIndex + 1) + "px, 0)";
        });
    });



    // reset interval
    function resetInterval() {
        if (pauseBtn.classList == 'stop') {
            clearInterval(play);
            play = setInterval(nextEvent, 3500);
        }
    }



    // sync with paging-nextBtn-prevBtn
    function syncWithPaingBtn(idx) {
        for(let i=0; i < pageDots.length; i++){
            if( i == idx){
                pageDots[i].classList.add('on');
            }
            else {
                pageDots[i].classList.remove('on');
            }
        }
    }

    function getSlideIndex(userSlide) {
        let turnIndex = userSlide.getAttribute('class');
        turnIndex = turnIndex.replace('kv-slide0','');
        turnIndex = turnIndex.replace(' active','');
        return turnIndex;
    }



    // next button event
    function nextEvent(){
        resetInterval();

        delayBtn(nextBtn, 500);

        if(selectIndex <= slideLength - 1) {
            slideList.style.transition = "all 0.3s";
            slideList.style.transform = "translate(-" + slideWidth * (selectIndex + 2) + "px, 0)";
        }
        if(selectIndex === slideLength - 1) {
            setTimeout(function(){
                slideList.style.transition = "0s";
                slideList.style.transform = "translate(-" + slideWidth + "px, 0)";
            }, 300);
            selectIndex = -1;
        }
        
        selectSlide.classList.remove(active);
        selectSlide = slides[++selectIndex];
        selectSlide.classList.add(active);

        syncWithPaingBtn(getSlideIndex(selectSlide) - 1);
    }


    function delayBtn(btn, ms) {
        btn.disabled = true;
        setTimeout(function() {
            btn.disabled = false;
        }, ms);
    }


    // prev button event
    function prevEvent() {
        resetInterval();

        delayBtn(nextBtn, 500);

        if(selectIndex >= 0) {
            slideList.style.transition = "all 0.3s";
            slideList.style.transform = "translate(-" + slideWidth * selectIndex + "px, 0)";
        }
        if(selectIndex === 0) {
            setTimeout(function(){
                slideList.style.transition = "0s";
                slideList.style.transform = "translate(-" + slideWidth * slideLength + "px, 0)";
            }, 300);
            selectIndex = slideLength;
        }
        selectSlide.classList.remove(active);
        selectSlide = slides[--selectIndex];
        selectSlide.classList.add(active);

        syncWithPaingBtn(getSlideIndex(selectSlide) - 1);
    }


    nextBtn.addEventListener('click', function(){
        nextEvent();
    });

    prevBtn.addEventListener('click', function(){
        prevEvent();
    });



    // puase-play btn toggle
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

    pauseBtn.addEventListener('click', function(e){
        e.preventDefault();
        puaseTogglePlay();
    });



})();
