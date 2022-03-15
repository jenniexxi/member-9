const body = document.querySelector('body');
const container = document.querySelector('#container');
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
const pagination = document.querySelector('.slide-controls ul');
const slideSpeed = 300;
let play = setInterval(nextEvent, 3500);
let curDot;
const mainMenu = document.querySelectorAll(".menu-nav > ul > li");
const subMenu = document.querySelectorAll(".depth-menu-wrap");
const memberImgs = document.querySelectorAll(".members-life-content > li > a");
const popupList = document.querySelector(".membership-life-popup");
const popups = document.querySelectorAll(".life-popup");
const popDim = document.querySelector(".popup-dimm");
const popupCloseBtns = document.querySelector(".popup-close");
const infoSelect = document.querySelectorAll(".select-btn");
const infoLists = document.querySelectorAll(".select-drop");



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
slideList.style.transform = "translate(-" + contsWidth * (startNum + 1) + "%, 0)";

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
    slideList.style.transform = "translate(-" + contsWidth * (selectIndex + 1) + "%, 0)";
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

    if(selectIndex <= slideLength - 1) {
        slideList.style.transition = "all 0.3s";
        slideList.style.transform = "translate(-" + contsWidth * (selectIndex + 2) + "%, 0)";
    }
    if(selectIndex === slideLength - 1) {
        setTimeout(function(){
            slideList.style.transition = "0s";
            slideList.style.transform = "translate(-" + contsWidth + "%, 0)";
        }, 300);
        selectIndex = -1;
    }
    
    selectSlide.classList.remove(active);
    selectSlide = slides[++selectIndex];
    selectSlide.classList.add(active);

    syncWithPaingBtn(getSlideIndex(selectSlide) - 1);
}



// prev button event
function prevEvent() {
    resetInterval();

    if(selectIndex >= 0) {
        slideList.style.transition = "all 0.3s";
        slideList.style.transform = "translate(-" + contsWidth * selectIndex + "%, 0)";
    }
    if(selectIndex === 0) {
        setTimeout(function(){
            slideList.style.transition = "0s";
            slideList.style.transform = "translate(-" + contsWidth * slideLength + "%, 0)";
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



// gnb
[].forEach.call(mainMenu, function (menu, index, arr) {
    menu.addEventListener('mouseenter', function (e) {
        subMenu[index].style.display = "block";
        mainMenu[index].classList.add('active');
    });
    menu.addEventListener('mouseleave', function (e) {
        subMenu[index].style.display = "none";
        mainMenu[index].classList.remove('active');
    });
});

[].forEach.call(subMenu, function (menu, index, arr) {
    menu.addEventListener('mouseenter', function (e) {
        mainMenu[index].classList.add('active');
    });
    menu.addEventListener('mouseleave', function (e) {
        mainMenu[index].classList.remove('active');
    });
});




// modal(popup)
function Modal(num) {
    memberImgs[num].onclick = function (e) {
        e.preventDefault();
        popDim.style.display = "block";
        popupList.style.display = "block";
        popups[num].style.display = "block";
    };
    
    popupCloseBtns.onclick = function (e) {
        e.preventDefault();
        popDim.style.display = "none";
        popupList.style.display = "none";
        for (let i = 0; i < popups.length; i++) {
            popups[i].style.display = "none";
        }
    };
};

for (let i = 0; i < memberImgs.length; i++) {
    Modal(i);
}





// bottom selectbox
[].forEach.call(infoSelect, function (selectbox, index, arr) {
    selectbox.addEventListener("click", function () {
        for (var i = 0; i < infoSelect.length; i++) {
            infoSelect[i].classList.remove("on");
        };

        for (var _i = 0; _i < infoSelect.length; _i++) {
            if (_i !== index) {
                infoLists[_i].style.display = "none";
            } else {
                if (infoLists[_i].style.display == "block") {
                    infoLists[_i].style.display = "none";
                    infoSelect[_i].classList.remove("on");
                } else {
                    infoLists[_i].style.display = "block";
                    infoSelect[_i].classList.add("on");
                }
            }
        }
    });
});

// option select
const options = document.querySelectorAll('.select-drop li a');
[].forEach.call(options, function (opt, index, arr) {
    opt.addEventListener("click", function (e) {
        e.preventDefault();
        this.closest(".select-drop").style.display = "none";
        this.closest(".select-drop").previousElementSibling.classList.remove('on');
    });
});








// mobile menu
const moMenuIcon = document.querySelector('.icon-menubar');
const moMenuListWrap = document.querySelector('.mo-menu-list-wrap');
const moMenuClose = document.querySelector('.menu-close');
const moSubList = document.querySelectorAll('.mo-big-list');
const moMenuDim = document.querySelector(".menu-dimm");
let scrollPosition = 0;

moMenuIcon.addEventListener('click', function(e) {
    e.preventDefault();
    moMenuListWrap.style.display = "block";
    moMenuDim.style.display = "block";

    scrollPosition = window.pageYOffset;
    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = "-" + scrollPosition + "px";
    body.style.width = '100%';
});

moMenuClose.addEventListener('click', function(e) {
    e.preventDefault();
    moMenuListWrap.style.display = "none";
    moMenuDim.style.display = "none";

    body.style.removeProperty('overflow');
    body.style.removeProperty('position');
    body.style.removeProperty('top');
    body.style.removeProperty('width');
    window.scrollTo(0, scrollPosition);
});

[].forEach.call(moSubList, function (moSub, index, arr) {
    moSub.addEventListener("click", function (e) {
        e.preventDefault();
        for (var i = 0; i < moSubList.length; i++) {
            if (i !== index) {
                moSubList[i].classList.remove("on");
            } else {
                if (moSubList[i].classList.contains("on") == true) {
                    moSubList[i].classList.remove("on");
                } else {
                    moSubList[i].classList.add("on");
                }
            }
        }
    });
});






// accessibility
// skip_content
const skipContents = document.querySelectorAll("#skip_content a");

[].forEach.call(skipContents, function (conts, contsIndex, arr) {
    conts.addEventListener('keydown', function (e) {
        if (contsIndex == 0) {
            if (e.keyCode == 13) {
                container.focus();
            }
        }
    });
});




// prevBtn
prevBtn.addEventListener('keydown', function(e) {
    e.preventDefault();
    if( e.keyCode == 9 ) {
        const detailBtnFirst = selectSlide.childNodes[3].querySelector('.common-btn');
        const detailBtnLast = selectSlide.childNodes[5].querySelector('.common-btn');
        
        detailBtnFirst.focus();

        if ( document.hasFocus() ) {
            clearInterval(play);
            detailBtnFirst.tabIndex = 1;
            detailBtnLast.tabIndex = 2;
            nextBtn.tabIndex = 3;
        }
    }
});

// nextBtn
nextBtn.addEventListener('keydown', function(e) {
    e.preventDefault();
    if( e.keyCode == 9 ) {
        pagination.querySelector('li:first-child button').focus();
    }
});






// slide click
// slideWrap.addEventListener('click', function(e) {
//     e.preventDefault();
//     clearInterval(play);
    
//     const detailBtnFirst = selectSlide.childNodes[3].querySelector('.common-btn');
//     const detailBtnLast = selectSlide.childNodes[5].querySelector('.common-btn');
//     const lists = selectSlide.querySelectorAll(".common-btn");
    
//     [].forEach.call(lists, (list, listsIndex, arr) => {
//         list.addEventListener('keydown', function(e) {
//             e.preventDefault();
//             if( e.keyCode == 9 ) {
//                 focusEle = document.activeElement;
//                 if( detailBtnFirst == focusEle ) {
//                     detailBtnFirst.tabIndex = 1;
//                     detailBtnLast.tabIndex = 2;
//                     nextBtn.tabIndex = 3;
//                 }
//             }
//         })
//     });
// });





// modal
// [].forEach.call(memberImgs, (img, imgsIndex, arr) => {
//     img.addEventListener('keydown', function(e) {
//         if( e.keyCode == 13 ) {
//             Modal(imgsIndex);
//             popupList.tabIndex = 0;
//             popupList.focus();
//         }
//     })
// });







// gnb
// const mainMenuTitle = mainMenu.querySelector(".main-menu-tit");

[].forEach.call(mainMenu, function (menu, index, arr) {
    menu.addEventListener('keydown', function (e) {
        // subMenu[index].style.display = "none";
        if (e.keyCode == 9) {
            subMenu[index].style.display = "block";
            mainMenu[index].classList.add('active');          
        }
        
        // const abc = subMenu[index].querySelector(".depth-menu li:last-child a");
        // focusEle = document.activeElement;
        // // console.log( abc == focusEle );
        // if( abc == focusEle ) {
        //     abc.addEventListener('keydown', function (e) {
        //         console.log("success");
        //         if (e.keyCode == 9) {
        //             // abc.parentElement('.depth-menu-wrap').style.display = "block";
        //             abc.parentNode.parentNode.parentNode.style.display = "block";
        //             mainMenu[index].classList.remove('active');  
        //         }
        //     });            
        // }
    });
});

const subDepthLast = subMenu.querySelector('.depth-menu li:last-child');

[].forEach.call(mainMenu, function (menu, index, arr) {
    menu.addEventListener('keydown', function (e) {
        if (e.keyCode == 9) {
            subMenu[index].style.display = "block";
            mainMenu[index].classList.add('active');          
        }
    });
});







// console.log(subDepthLast);
// if ( subDepthLast.keyCode == 9 ) {
//     console.log("last");
//     subMenu[index].style.display = "none";
//     mainMenu[index].classList.remove('active');
// }