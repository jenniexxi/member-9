(function () {
    //초기형 객체 지형 ==> class
    var common = {
        elem: {
            body : document.querySelector('body'),
            dimm : document.querySelector(".popup-dimm"),
            scrollPosition : 0,
        }
    }

    var slide = {
        elem: {
            kvWrap : document.querySelector('.kv-slide-wrap'),
            slideList : document.querySelector('.kv-slide-inner'),
            slides : document.querySelectorAll('.kv-slide-inner li'),
            slideFirst : document.querySelector('.kv-slide-inner li:first-child'),
            slideLast : document.querySelector('.kv-slide-inner li:last-child'),
            slideLength : document.querySelectorAll('.kv-slide-inner li').length,
            prevBtn : document.querySelector('.slide-prev'),
            nextBtn : document.querySelector('.slide-next'),
            pauseBtn : document.querySelector('.stop'),
            playBtn : document.querySelector('.play'),
            active : "active",
            startNum : 0,
            pagination : document.querySelector('.slide-controls ul'),
            slideSpeed : 300, 
            firstNode : document.querySelector('.kv-slide-inner li:first-child').cloneNode(true),
            lastNode : document.querySelector('.kv-slide-inner li:last-child').cloneNode(true),
            slideWidth : 0,
            selectIndex : 0,
            selectSlide : "",
            curDot : "",
            play : null,
            delay : 0,
            timer : null,
        },

        reset: function () {
            //setting reset
            slide.elem.slideList.appendChild(slide.elem.firstNode);
            slide.elem.slideList.insertBefore(slide.elem.lastNode, slide.elem.slideList.firstElementChild);

            // slide.elem.slideWidth = getComputedStyle( slide.elem.slides[0]).getPropertyValue("width").replace(/[^0-9^.]/g, '');
            slide.elem.slideWidth = Math.floor(slide.elem.slides[0].getBoundingClientRect().width);

            slide.elem.slideList.style.width = slide.elem.slideWidth * (slide.elem.slideLength + 2) + "px";
            slide.elem.slideList.style.transform = "translate(-" + slide.elem.slideWidth * (slide.elem.startNum + 1) + "px, 0)";
            
            for(let i = 0; i < slide.elem.slideLength; i++) {
                slide.elem.slides[i].style.width = slide.elem.slideWidth + "px";
            }

            slide.elem.firstNode.style.width = slide.elem.slideWidth + "px";
            slide.elem.lastNode.style.width = slide.elem.slideWidth + "px";

            slide.elem.selectIndex = slide.elem.startNum;
            slide.elem.selectSlide = slide.elem.slides[slide.elem.selectIndex];
            slide.elem.selectSlide.classList.add(slide.elem.active);
        },

        setting: function () {
            //width 계산을 위한 reset call
            //width setting
            var windowWidth = window.innerWidth;
            
            if (windowWidth < 1440) {
                for(let i = 0; i < slide.elem.slideLength; i++) {
                    slide.elem.slides[i].setAttribute("style", "width: " + windowWidth + "px");
                }
                slide.elem.firstNode.setAttribute("style", "width: " + windowWidth + "px");
                slide.elem.lastNode.setAttribute("style", "width: " + windowWidth + "px");
                slide.reset();
            } else {
                for(let i = 0; i < slide.elem.slideLength; i++) {
                    slide.elem.slides[i].removeAttribute("style");
                }
                slide.elem.firstNode.removeAttribute("style");
                slide.elem.lastNode.removeAttribute("style");
                slide.reset();
            }

            //width 계산
            // slide.elem.slides.forEach((__slide) => {
            //     __slide.removeAttribute('style');
            //     setTimeout( ()=> {
            //         __slide.setAttribute('style', `width: ${__slide.offsetWidth}px`);
            //     }, 0);
            // });

            if (windowWidth > 1200) {
                gnb.elem.moMenuWrap.style.display = "none";
                common.elem.dimm.style.display = "none";
            }
        },

        getSlideIndex: function (userSlide) {
            var turnIndex = userSlide.getAttribute('class');
            turnIndex = turnIndex.replace('kv-slide0','');
            turnIndex = turnIndex.replace(' active','');
            return turnIndex;
        },

        autoPlay: function() {
            play = setInterval(slide.move.right, 3500);
        },

        resetInterval: function() {
            if (slide.elem.pauseBtn.classList[0] === 'stop') {
                clearInterval(play);
                play = setInterval(slide.move.right, 3500);
            }
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

        syncWithPagingBtn: function (idx) { 
            var pageDots = document.querySelectorAll('.slide-controls ul li');
            for (var i=0; i < pageDots.length; i++){
                if( i === idx ) {
                    pageDots[i].classList.add('on');
                } else {
                    pageDots[i].classList.remove('on');
                }
            }
        },

        move: {
            right: function () {
                slide.resetInterval();

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
        
                slide.syncWithPagingBtn(slide.getSlideIndex(slide.elem.selectSlide) - 1);
            },
            left: function () {
                slide.resetInterval();

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

                slide.syncWithPagingBtn(slide.getSlideIndex(slide.elem.selectSlide) - 1);
            }
        },

        event: {
            next: function () {
                slide.elem.nextBtn.addEventListener('click', function() {                  
                    slide.move.right();
                });
            },
            
            prev: function () {
                slide.elem.prevBtn.addEventListener('click', function() {
                    slide.move.left();
                });
            },

            pause : function () {
                slide.elem.pauseBtn.addEventListener('click', function(e){
                    e.preventDefault();
                    slide.event.puaseTogglePlay();
                });
            },
            
            puaseTogglePlay : function () {
                var btnText = slide.elem.pauseBtn.querySelector('.blind');
                if (slide.elem.pauseBtn.classList[0] === 'stop') {
                    clearInterval(play);
                    slide.elem.pauseBtn.classList.remove("stop");
                    slide.elem.pauseBtn.classList.add("play");
                    btnText.innerText = "재생";
                } else {
                    play = setInterval(slide.move.right, 3500);
                    slide.elem.pauseBtn.classList.remove("play");
                    slide.elem.pauseBtn.classList.add("stop");
                    btnText.innerText = "일시중지";
                }
            },

            controls: function () {
                var pageDots = document.querySelectorAll('.slide-controls ul li');
                [Array.prototype].forEach.call(pageDots, function (dot, i) {
                    dot.addEventListener('click', function (e) {
                        e.preventDefault();
                        slide.resetInterval();
            
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
            },

            mouseEnter : function () {
                slide.elem.slideList.addEventListener('mouseenter', function (e) {
                    // e.preventDefault();
                    clearInterval(play);
                    slide.elem.pauseBtn.classList.remove("stop");
                    slide.elem.pauseBtn.classList.add("play");
                    slide.elem.pauseBtn.querySelector('.blind').innerText = "재생";
                });

                // [].forEach.call(slide.elem.kvWrap.querySelectorAll('button'), function (__el) {
                //     __el.addEventListener('mouseenter', function (__e) {
                //         clearInterval(play);
                //         slide.elem.pauseBtn.classList.remove("stop");
                //         slide.elem.pauseBtn.classList.add("play");
                //         slide.elem.pauseBtn.querySelector('.blind').innerText = "재생";
                //     });
                // });
            },
            
            mouseLeave : function () {
                slide.elem.slideList.addEventListener('mouseleave', function () {
                    play = setInterval(slide.move.right, 3500);
                    slide.elem.pauseBtn.classList.remove("play");
                    slide.elem.pauseBtn.classList.add("stop");
                    slide.elem.pauseBtn.querySelector('.blind').innerText = "일시중지";
                });
            },
        },

        tagging: {
            event : {
                playPauseBtn : function (__btn , __type) {
                    var tag = __btn.querySelector('.blind'),
                        btnClass = __btn.classList;
                    
                    if (__type == 'stop') {
                        tag = tag.innerText = "재생";
                    } else {
                        tag = tag.innerText = "일시정지";
                    }
                    // __type == 'stop' ? tag = tag.innerHTML.replace("일시정지", "재생") : tag = tag.innerHTML.replace("재생", "일시정지");
                    __type == 'stop' ? btnClass = btnClass.replace('stop', 'play') :  btnClass = btnClass.replace('play', 'stop');
                }
            }
        },

        accessibility : {
            KeyboardEvent: function () {
                slide.elem.prevBtn.addEventListener("keydown", function (e) {
                    var keyCode = e.key.toLowerCase();
                    if (e.shiftKey && keyCode === 'tab') {}
                    else if (keyCode === 'tab') {
                        e.preventDefault();
                        clearInterval(play);
                        slide.tagging.event.playPauseBtn(slide.elem.pauseBtn, 'stop');
                        slide.elem.slideList.querySelector('li.active .common-btn.first').focus();
                    }
                });

                [].forEach.call(slide.elem.slideList.querySelectorAll('.common-btn.first'), function (__el) {
                    __el.addEventListener('keydown', function (__e) {
                        var keyCode = __e.key.toLowerCase();
                        
                        if (__e.shiftKey && keyCode === 'tab') {
                            if (__e.target.parentNode.parentNode.className.indexOf('active') > -1 ) {
                                console.log('__e ', __e.target.parentNode.parentNode);
                                __e.preventDefault();
                                slide.elem.prevBtn.focus();
                            }                            
                        } else if (keyCode === 'tab') {
                            var windowWidth = window.innerWidth;
                            if (windowWidth < 1200) {
                                __e.preventDefault();
                                slide.elem.nextBtn.focus();
                            }
                        }
                    });
                });

                [].forEach.call(slide.elem.slideList.querySelectorAll('.common-btn.last'), function (__el) {
                    __el.addEventListener('keydown', function (__e) {
                        var keyCode = __e.key.toLowerCase();

                        if (__e.shiftKey && keyCode === 'tab') {} 
                        else if (keyCode === 'tab') {
                            if (__e.target.parentNode.parentNode.className.indexOf('active') > -1 ) {
                                __e.preventDefault();
                                slide.elem.nextBtn.focus();
                            }
                        }
                    });
                });

                slide.elem.nextBtn.addEventListener("keydown", function (e) {
                    var keyCode = e.key.toLowerCase();
                    if (e.shiftKey && keyCode === 'tab') {
                        e.preventDefault();
                        clearInterval(play);
                        slide.elem.slideList.querySelector('li.active .common-btn.last').focus();
                    } else if (keyCode === 'tab') {}
                });


                [].forEach.call(slide.elem.slideList.querySelectorAll('.common-btn.first'), function (__el) {
                    __el.addEventListener('keyup', function (__e) {
                        var keyCode = __e.key.toLowerCase();
                        
                        if (__e.shiftKey && keyCode === 'tab') {
                            if (__e.target.parentNode.parentNode.className.indexOf('active') > -1 ) {
                                __e.preventDefault();
                                clearInterval(play);
                            }
                        } else if (keyCode === 'tab') {
                            __e.preventDefault();
                            clearInterval(play);
                        }
                    });
                });

                [].forEach.call(slide.elem.slideList.querySelectorAll('.common-btn.last'), function (__el) {
                    __el.addEventListener('keyup', function (__e) {
                        var keyCode = __e.key.toLowerCase();

                        if (__e.shiftKey && keyCode === 'tab') {
                            __e.preventDefault();
                            clearInterval(play);
                        }
                        else if (keyCode === 'tab') {
                            if (__e.target.parentNode.parentNode.className.indexOf('active') > -1 ) {
                                __e.preventDefault();
                                clearInterval(play);
                            }
                        }
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
            this.event.pause();
            this.event.controls();
            this.autoPlay();
            this.event.mouseEnter();
            this.event.mouseLeave();
            this.accessibility.KeyboardEvent();
        }
    }


    var gnb = {
        elem: {
            mainMenu : document.querySelectorAll(".menu-nav > ul > li"),
            subMenu : document.querySelectorAll(".depth-menu-wrap"),
            menuBar : document.querySelector(".menu-bar"),
            subMenuList : document.querySelectorAll(".depth-menu > li"),
            subMenuLast : document.querySelector(".depth-menu > li:last-child"),
            subDepthLast : document.querySelector(".sub-depth-list > li:last-child a"),
            moMenuIcon : document.querySelector(".icon-menubar"),
            moMenuCloseBtn : document.querySelector(".menu-close"),
            moMenuWrap : document.querySelector(".mo-menu-list-wrap"),
            moSubList : document.getElementsByClassName('mo-big-list'),
            mologin : document.querySelector('.menu-login a'),
            moBottomLogin : document.querySelector('.mo-login-bottom'), 
        },

        event: {
            mouseEnter : function () {
                [].forEach.call(gnb.elem.mainMenu, function (__el, index) {
                    var __elLeft = __el.offsetLeft,
                        __elPadLeft = Math.round(window.getComputedStyle(__el).getPropertyValue('padding-left').replace(/[^0-9^.]/g, '')),
                        __elAWidth = __el.querySelector(".main-menu-tit").offsetWidth;                        

                    __el.addEventListener('mouseenter', function (__e) {
                        __e.preventDefault();
                        gnb.elem.menuBar.style.display = "block";
                        gnb.elem.subMenu[index].style.display = "block";
                        gnb.elem.menuBar.style.left = (__elLeft + __elPadLeft) + "px";
                        gnb.elem.menuBar.style.width = __elAWidth + "px";
                    });
                });
            },
            
            mouseLeave : function () {
                [].forEach.call(gnb.elem.mainMenu, function (__el, index) {                   
                    __el.addEventListener('mouseleave', function (__e) {
                        __e.preventDefault();
                        gnb.elem.menuBar.style.display = "none";
                        gnb.elem.subMenu[index].style.display = "none";
                    });
                });
            },

            //mobile
            moShow : function () {
                gnb.elem.moMenuIcon.addEventListener("click", function (e) {
                    e.preventDefault();                    

                    gnb.elem.moMenuWrap.style.display = "block";
                    common.elem.dimm.style.display = "block";

                    common.elem.scrollPosition = window.pageYOffset;
                    common.elem.body.style.overflow = 'hidden';
                    common.elem.body.style.position = 'fixed';
                    common.elem.body.style.top = "-" + common.elem.scrollPosition + "px";
                    common.elem.body.style.width = '100%';
                });
            },

            moHide : function () {
                gnb.elem.moMenuCloseBtn.addEventListener("click", function (e) {
                    e.preventDefault();
                    gnb.elem.moMenuWrap.style.display = "none";
                    common.elem.dimm.style.display = "none";

                    common.elem.body.removeAttribute("style");
                    window.scrollTo(0, common.elem.scrollPosition);
                });
            },

            moSubShow : function () {
                [].forEach.call(gnb.elem.moSubList, function (__el, index) {
                    __el.addEventListener('click', function (__e) {
                        __e.preventDefault();
                        for (var i = 0; i < gnb.elem.moSubList.length; i++) {
                            if (i !== index) {
                                gnb.elem.moSubList[i].classList.remove("on");
                            } else {
                                if (gnb.elem.moSubList[i].classList.contains("on") == true) {
                                    gnb.elem.moSubList[i].classList.remove("on");
                                } else {
                                    gnb.elem.moSubList[i].classList.add("on");
                                }
                            }
                        }
                    });
                });
            },
        },
        
        accessibility: {
            KeyboardEvent: function () {
                [].forEach.call(gnb.elem.mainMenu, function (__el, index) {
                    __el.addEventListener('keydown', function (__e) {
                        var key = __e.key || __e.keyCode;
                        
                        if (key === 'Enter' || key === 13) {
                            __e.preventDefault();                            
                            for (var i = 0; i < gnb.elem.subMenu.length; i++) {
                                gnb.elem.subMenu[i].style.display = "none";
                            }
                            gnb.elem.subMenu[index].style.display = "block";
                        }
                    });
                });
                
                [].forEach.call(gnb.elem.subMenuLast, function (__el, index) {
                    __el.addEventListener('keydown', function (__e) {
                        var keyCode = __e.key.toLowerCase();

                        if (__e.shiftKey && keyCode === 'tab') {}
                        else if (keyCode === 'tab') {
                            __e.preventDefault();
                            gnb.elem.subMenu[index].style.display = "none";
                        }
                    });
                });
                
                gnb.elem.subDepthLast.addEventListener("keydown", function (__e) {
                    var keyCode = __e.key.toLowerCase();

                    if (__e.shiftKey && keyCode === 'tab') {}
                    else if (keyCode === 'tab') {
                        __e.preventDefault();
                        gnb.elem.subMenu[gnb.elem.subMenu.length - 1].style.display = "none";
                    }
                });
                
                //mobile
                gnb.elem.moMenuIcon.addEventListener("keydown", function (__e) {
                    var key = __e.key || __e.keyCode;
                    
                    if (key === 'Enter' || key === 13) {
                        __e.preventDefault();
                        gnb.elem.moMenuWrap.style.display = "block";
                        common.elem.dimm.style.display = "block";
                        gnb.elem.mologin.focus();
                    }
                });

                gnb.elem.moBottomLogin.addEventListener("keydown", function (__e) {
                    var keyCode = __e.key.toLowerCase();

                    if (__e.shiftKey && keyCode === 'tab') {}
                    else if (keyCode === 'tab') {
                        __e.preventDefault();
                        gnb.elem.moMenuCloseBtn.focus();
                    }
                });

                gnb.elem.moMenuCloseBtn.addEventListener("keydown", function (__e) {
                    var keyCode = __e.key.toLowerCase();

                    if (__e.shiftKey && keyCode === 'tab') {
                        __e.preventDefault();
                        gnb.elem.moBottomLogin.focus();
                    }
                    else if (keyCode === 'tab') {
                        __e.preventDefault();
                        gnb.elem.mologin.focus();
                    }
                });
            }
        },

        init: function () {
            this.event.mouseEnter();
            this.event.mouseLeave();
            this.event.moShow();
            this.event.moHide();
            this.event.moSubShow();
            this.accessibility.KeyboardEvent();
        }
    }


    var popup = {
        elem: {
            contsList : document.querySelectorAll(".members-life-content li"),
            memberPopup : document.querySelector(".membership-popup"),
            memberCloseBtn : document.querySelector(".popup-close"),
            popupList : document.querySelectorAll(".members-life-content li a"),
            popTitle : document.querySelector(".popup-head .title"),
            popDesc : document.querySelector(".popup-conts .desc"),
        },

        event: {
            show: function () {
                [].forEach.call(popup.elem.contsList, function (__el, index) {                   
                    __el.addEventListener('click', function (__e) {
                        __e.preventDefault();
                        popup.elem.memberPopup.style.display = "block";
                        common.elem.dimm.style.display = "block";

                        common.elem.scrollPosition = window.pageYOffset;
                        common.elem.body.style.overflow = 'hidden';
                        common.elem.body.style.position = 'fixed';
                        common.elem.body.style.top = "-" + common.elem.scrollPosition + "px";
                        common.elem.body.style.width = '100%';

                        popup.elem.popTitle.innerText = __el.dataset.title;
                        popup.elem.popDesc.innerText = __el.dataset.desc;
                    });
                });
            },

            hide: function () {             
                popup.elem.memberCloseBtn.addEventListener('click', function (e) {
                    e.preventDefault();
                    popup.elem.memberPopup.style.display = "none";
                    common.elem.dimm.style.display = "none";

                    common.elem.body.removeAttribute("style");
                    window.scrollTo(0, common.elem.scrollPosition);
                });                
            },

            textShow: function () {
                var data = document.querySelectorAll('.members-life-content li[data-pop]');
                console.log(data);
            }
        },

        accessibility: {
            KeyboardEvent: function () {
                var focusableElementsString = 'a[href], button:not([disabled])',
                    focusableElements = popup.elem.memberPopup.querySelectorAll(focusableElementsString),
                    firstTab = focusableElements[0],
                    lastTab = focusableElements[focusableElements.length - 1];
                
                [].forEach.call(popup.elem.popupList, function (__el, index) {
                    __el.addEventListener('keydown', function (__e) {
                        var key = __e.key || __e.keyCode;

                        if (key === 'Enter' || key === 13) {
                            __e.preventDefault();
                            __el.setAttribute('data-focus','on');
                            popup.elem.memberPopup.style.display = "block";
                            common.elem.dimm.style.display = "block";
                            popup.elem.memberPopup.setAttribute('tabindex', 0);
                            popup.elem.memberPopup.focus();
                            
                            popup.elem.popTitle.innerText = __el.parentNode.dataset.title;
                            popup.elem.popDesc.innerText = __el.parentNode.dataset.desc;
                        }
                    });
                });

                popup.elem.memberCloseBtn.addEventListener('keydown', function (__e) {
                    var key = __e.key || __e.keyCode,
                        keyCode = __e.key.toLowerCase();

                    focusableElements = Array.prototype.slice.call(focusableElements);

                    if (key === 'Enter' || key === 13) {
                        __e.preventDefault();
                        document.querySelector('a[data-focus="on"]').focus();
                        setTimeout(function() {
                            document.querySelector('a[data-focus="on"]').removeAttribute('data-focus');
                        }, 100);

                        popup.elem.memberPopup.style.display = "none";
                        common.elem.dimm.style.display = "none";
                        popup.elem.memberPopup.removeAttribute('tabindex');
                    }

                    if (__e.shiftKey && keyCode === 'tab') {
                        __e.preventDefault();
                        focusableElements[focusableElements.length - 2].focus();
                    } else if (keyCode === 'tab') {
                        __e.preventDefault();
                        firstTab.focus();
                    } 
                });

                firstTab.addEventListener('keydown', function (__e) {
                    var keyCode = __e.key.toLowerCase();

                    if (__e.shiftKey && keyCode === 'tab') {
                        __e.preventDefault();
                        lastTab.focus();
                    }
                });
            }
        },

        init: function () {
            this.event.show();
            this.event.hide();
            this.accessibility.KeyboardEvent();
            // this.event.textShow();
        }
    }


    var selectBox = {
        elem: {
            infoSelect : document.getElementsByClassName('select-btn'),
            optionLists : document.getElementsByClassName('select-drop'),
            options : document.querySelectorAll('.select-drop li a'),
        },
        event: {
            toggle: function () {
                [].forEach.call(selectBox.elem.infoSelect, function (__el, index) {                   
                    __el.addEventListener('click', function (__e) {
                        __e.preventDefault();
                        for (var i = 0; i < selectBox.elem.infoSelect.length; i++) {
                            selectBox.elem.infoSelect[i].classList.remove("on");
                        };
                        
                        for (var _i = 0; _i < selectBox.elem.infoSelect.length; _i++) {
                            if (_i !== index) {
                                selectBox.elem.optionLists[_i].style.display = "none";
                            } else {
                                if (selectBox.elem.optionLists[_i].style.display == "block") {
                                    selectBox.elem.optionLists[_i].style.display = "none";
                                    selectBox.elem.infoSelect[_i].classList.remove("on");
                                } else {
                                    selectBox.elem.optionLists[_i].style.display = "block";
                                    selectBox.elem.infoSelect[_i].classList.add("on");
                                }
                            }
                        }
                    });
                });
            },
            option: function() {
                [].forEach.call(selectBox.elem.options, function (__el) {
                    __el.addEventListener("click", function (__e) {
                        __e.preventDefault();
                        __el.closest(".select-drop").style.display = "none";
                        __el.closest(".select-drop").previousElementSibling.classList.remove('on');
                    });
                });
            }
        },
        // accessibility: {
        //     KeyboardEvent: function() {
        //         [].forEach.call(selectBox.elem.infoSelect, function (__el) {
        //             __el.addEventListener('keydown', function (__e) {
        //                 var keyCode = __e.key.toLowerCase();

        //                 if (__e.shiftKey && keyCode === 'tab') {}
        //                 else if (keyCode === 'tab') {
        //                     __e.preventDefault();
                            
        //                 }
        //             });
        //         });
        //     }
        // },

        init: function () {
            this.event.toggle();
            this.event.option();
            // this.accessibility.KeyboardEvent();
        }
    }

    var dataObj = {
        loadJSON: function (callback) {
            var xObj = new XMLHttpRequest();
            xObj.overrideMimeType("application/json");
            xObj.open('GET', 'data.json', true);
            xObj.onreadystatechange = function() {
                if (xObj.readyState === 4 && xObj.status === 200) {
                    callback(xObj.responseText);
                }
            };
            xObj.send(null);
        },
        load: {
            title: function(arr) {
                for (var i = 0; i < arr.dataList.length; i++) {
                    var dataTitle = arr.dataList[i].title;
                    // popup.elem.popTitle[i].innerText = dataTitle;
                }
            },
            desc: function(arr) {
                for (var i = 0; i < arr.dataList.length; i++) {
                    var dataDesc = arr.dataList[i].desc;
                    popup.elem.popDesc.innerText = dataDesc; 
                }
            }
        },
        init: function () {
            dataObj.loadJSON(function(response) {
                var json = JSON.parse(response);
                dataObj.load.title(json.response);
                dataObj.load.desc(json.response);
                // popup.elem.popTitle.innerText = json.dataList.data1.title;
            });
        }
    }


    window.addEventListener('resize', function(){
        clearTimeout(slide.elem.timer);
        slide.elem.timer = setTimeout(function(){
            slide.resize();
        }, slide.elem.delay);
    });
    
    window.onload = function () {
        slide.init();
        gnb.init();
        popup.init();
        selectBox.init();
        // dataObj.init();
    }

})();

