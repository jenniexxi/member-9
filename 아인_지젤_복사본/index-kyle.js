/////////////////카일





(function () {
    //초기형 객체 지형 ==> class
    var slide = {
        elem: {
            // body = document.getElementsByTagName('body'),
            // container = document.getElementById('# container'),
            // slideWrap = document.getElementsByClassName('.kv-wrap'),
            slideList : document.querySelector('.kv-slide-inner'),
            slides : document.querySelectorAll('.kv-slide-inner li'),
            slideFirst : document.querySelector('.kv-slide-inner li:first-child'),
            slideLast : document.querySelector('.kv-slide-inner li:last-child'),
            slideLength : document.querySelectorAll('.kv-slide-inner li').length,
            prevBtn : document.querySelector('.slide-prev'),
            nextBtn : document.querySelector('.slide-next'),
            pauseBtn : document.querySelector('.stop'),
            active : "active",
            // slideWidth = getComputedStyle(slides[0]).getPropertyValue("width").replace(/[^0-9^.]/g, ''),
            startNum : 0,
            // let contsWidth = (slideWidth / (slideLength + 2));
            pagination : document.querySelector('.slide-controls ul'),
            slideSpeed : 300,
            autoPlay : null,
            // play : setInterval(slide.event.next(), 3500),
            firstNode : document.querySelector('.kv-slide-inner li:first-child').cloneNode(true),
            lastNode : document.querySelector('.kv-slide-inner li:last-child').cloneNode(true),
            pageDots : document.querySelectorAll('.slide-controls ul li'),
            slideWidth : null,
            selectIndex : null,
            selectSlide : null,
            curDot : null
        },
        reset: {
            //setting reset
            default: function () {
                slide.elem.slideWidth = getComputedStyle( slide.elem.slides[0]).getPropertyValue("width").replace(/[^0-9^.]/g, '');
                console.log("***");
                console.log(slide.elem.slideWidth); //1440
            },

            interval: function() {
                if (slide.elem.autoPlay === null) return;
                
                if (slide.elem.pauseBtn.classList == 'stop') {
                    clearInterval(slide.elem.autoPlay);
                    // console.log(this.elem.autoPlay);
                    // autoPlay = setInterval(slide.event.next(), 3500);
                }
            },
        },
        
        autoPlay: function() {
            this.autoPlay = setInterval(slide.event.next(), 3500);
        },

        setting: function () {
            //width 계산을 위한 reset call
            this.reset.default();
            this.reset.interval();
            
            this.move();
            //width setting
            if (window.innerWidth <= 1400) {
                var newWidth = window.innerWidth;

                slide.elem.slideWidth = newWidth;
                this.move();
            }

            slide.elem.selectIndex = slide.elem.startNum;
            slide.elem.selectSlide = slide.elem.slides[slide.elem.selectIndex];
            slide.elem.selectSlide.classList.add(slide.elem.active);
        },

        drawPaging: function () {
            var pageChild = '';
            for (var i = 0; i < slide.elem.slideLength; i++) {
                pageChild += '<li class="';
                pageChild += (i === slide.elem.startNum) ? 'on' : '';
                pageChild += '" data-index="' + i + '">';
                pageChild += '<button type="button"><span class="blind">slide' + i + '</span></button></li>';
            }
            slide.elem.pagination.innerHTML = pageChild;
        },

        getSlideIndex: function (userSlide) {
            // var index = 0;
            // return index;
            var turnIndex = userSlide.getAttribute('class');
            turnIndex = turnIndex.replace('kv-slide0','');
            turnIndex = turnIndex.replace(' active','');
            return turnIndex;
        },

        move: function () {
            // var index = this.getSlideIndex();

            // slide.elem.slideList.style.width = slide.elem.slideWidth * (slide.elem.slideLength + 2) + "px";
            // slideList.style.transform = "translate(-" + slide.elem.slideWidth * (slide.elem.startNum + 1) + "px, 0)";
            // for(var i = 0; i < slide.elem.slideLength; i++) {
            //     slide.elem.slides[i].style.width = slide.elem.slideWidth + "px";
            // }
            // slide.elem.firstNode.style.width = slide.elem.slideWidth + "px";
            // slide.elem.lastNode.style.width = slide.elem.slideWidth + "px";
        },

        delayBtn: function (btn, ms) {
            btn.disabled = true;
            setTimeout(function() {
                btn.disabled = false;
            }, ms);
        },

        syncWithPaingBtn: function (idx) {
            for(var i=0; i < slide.elem.pageDots.length; i++){
                if( i == idx){
                    slide.elem.pageDots[i].classList.add('on');
                }
                else {
                    slide.elem.pageDots[i].classList.remove('on');
                }
            }
        },

        event: {
            next: function () {
                slide.elem.nextBtn.addEventListener('click', function(){
                    slide.reset.interval();

                    slide.delayBtn(slide.elem.nextBtn, 500);
            
                    if(slide.elem.selectIndex <= slide.elem.slideLength - 1) {
                        slide.elem.slideList.style.transition = "all 0.3s";
                        slide.elem.slideList.style.transform = "translate(-" + slide.elem.slideWidth * (slide.elem.selectIndex + 2) + "px, 0)";
                    }

                    if(slide.elem.selectIndex === slide.elem.slideLength - 1) {
                        setTimeout(function(){
                            slide.elem.slideList.style.transition = "0s";
                            slide.elem.slideList.style.transform = "translate(-" + slide.elem.slideWidth + "px, 0)";
                        }, 300);
                        slide.elem.selectIndex = -1;
                    }
                    
                    slide.elem.selectSlide.classList.remove(slide.elem.active);
                    slide.elem.selectSlide = slide.elem.slides[++slide.elem.selectIndex];
                    slide.elem.selectSlide.classList.add(slide.elem.active);
            
                    slide.syncWithPaingBtn(slide.getSlideIndex(slide.elem.selectSlide)) - 1;
                });
            },
            prev: function () {
                slide.elem.prevBtn.addEventListener('click', function(){
                    slide.reset.interval();

                    slide.delayBtn(slide.elem.prevBtn, 500);
    
                    if(slide.elem.selectIndex >= 0) {
                        slide.elem.slideList.style.transition = "all 0.3s";
                        slide.elem.slideList.style.transform = "translate(-" + slide.elem.slideWidth * slide.elem.selectIndex + "px, 0)";
                    }
                    if(slide.elem.selectIndex === 0) {
                        setTimeout(function(){
                            slide.elem.slideList.style.transition = "0s";
                            slide.elem.slideList.style.transform = "translate(-" + slide.elem.slideWidth * slide.elem.slideLength + "px, 0)";
                        }, 300);
                        slide.elem.selectIndex = slide.elem.slideLength;
                    }
                    slide.elem.selectSlide.classList.remove(slide.elem.active);
                    slide.elem.selectSlide = slide.elem.slides[--slide.elem.selectIndex];
                    slide.elem.selectSlide.classList.add(slide.elem.active);
    
                    slide.syncWithPaingBtn(slide.getSlideIndex(slide.elem.selectSlide)) - 1;
                });
            },
            puase : {
                btnPauseTogglePlay: function (e) {
                    slide.elem.pauseBtn.addEventListener('click', function(e){
                        e.preventDefault();
                        var btnText = slide.elem.pauseBtn.querySelector('.blind');
                        if (slide.elem.pauseBtn.classList == 'stop') {
                            // clearInterval(play);
                            slide.elem.pauseBtn.classList.remove("stop");
                            slide.elem.pauseBtn.classList.add("play");
                            btnText.innerText = "재생";
                        } else {
                            slide.elem.autoPlay = setInterval(slide.event.next(), 3500);
                            slide.elem.pauseBtn.classList.remove("play");
                            slide.elem.pauseBtn.classList.add("stop");
                            btnText.innerText = "일시중지";
                        }
                    });
                }
            },
            controls: function () {
                [Array.prototype].forEach.call(slide.elem.pageDots, function (dot, i) {
                    dot.addEventListener('click', function (e) {
                        e.preventDefault(); 
                        slide.reset.interval();
            
                        slide.elem.curDot = document.querySelector('.on');
                        slide.elem.curDot.classList.remove('on');
                        
                        slide.elem.curDot = this;
                        this.classList.add('on');
            
                        slide.elem.selectIndex = Number(this.getAttribute('data-index'));
                        slide.elem.selectSlide = slide.elem.slides[slide.elem.selectIndex];
                        slide.elem.slideList.style.transition = slide.elem.slideSpeed + "ms";
                        slide.elem.slideList.style.transform = "translate(-" + slide.elem.slideWidth * (slide.elem.selectIndex + 1) + "px, 0)";
                    });
                });
            }
        },

        resize: function () {
            this.setting();
        },

        init: function () {
            this.setting();
            this.drawPaging();
            this.event.next();
            this.event.prev();
            this.event.puase.btnPauseTogglePlay();
        }
    }

    var delay = 300;
    var timer = null;

    window.addEventListener('resize', function(){
        clearTimeout(timer);
        timer = setTimeout(function(){
            slide.resize();
        }, delay);
    });

    window.onload = function () {
        slide.init();
        console.log("#####");
    }

})();


