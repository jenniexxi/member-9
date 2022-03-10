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
const memberImgs = document.querySelectorAll(".members-life-content > li > a");
const modals = document.getElementsByClassName("pop_wrap");
const modalCloseBtns = document.getElementsByClassName("pop-close");



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



// Add pagination dynamically
let pageChild = '';
for (var i = 0; i < slideLength; i++) {
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
    slideList.style.transform = `translate(-${contsWidth * (selectIndex + 1)}%, 0)`;
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

    // Array.prototype.map.call ( pageDots, (dot) => {
    //     dot.classList.remove('on');
    // });
    // pageDots[turnIndex - 1].classList.add('on');
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

    syncWithPaingBtn(getSlideIndex(selectSlide) - 1);
}



// prev button event
function prevEvent() {
    resetInterval();

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

    syncWithPaingBtn(getSlideIndex(selectSlide) - 1);
}

nextBtn.addEventListener('click', function(){
    nextEvent();
})

prevBtn.addEventListener('click', function(){
    prevEvent();
})



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

pauseBtn.addEventListener('click', function(){
    puaseTogglePlay();
})



// gnb
const mainMenu = document.querySelectorAll(".menu-nav > ul > li");
const subMenu = document.querySelectorAll(".depth-menu");

[].forEach.call(mainMenu, (menu, index, arr) => {
    menu.addEventListener('mouseenter', e => {
        subMenu[index].style.display = "block";
    });
    menu.addEventListener('mouseleave', e => {
        subMenu[index].style.display = "none";
    });
});



// modal(popup)
function Modal(num) {
    memberImgs[num].onclick = function (e) {
        e.preventDefault();
        modals[num].style.display = "block";
    };

    modalCloseBtns[num].onclick = function (e) {
        e.preventDefault();
        modals[num].style.display = "none";
    };
};

for (var i = 0; i < memberImgs.length; i++) {
    Modal(i);
}

window.onclick = function (event) {
    if (event.target.className == "pop_wrap") {
        event.target.style.display = "none";
    }
};



// bottom selectbox
const infoSelect = document.querySelectorAll(".select-btn");
const infoLists = document.querySelectorAll(".select-drop");

[].forEach.call(infoSelect, (selectbox, index, arr) => {
    selectbox.addEventListener ("click", function() { 
        for (let i = 0; i < infoSelect.length; i++) {
            if ( i == index) {
                if (infoLists[i].style.display == "block") {
                    infoLists[i].style.display = "none";
                } else {
                    infoLists[i].style.display = "block";
                }
            } 
        }
    });
});

// [].forEach.call(infoSelect, (selectbox, index, arr) => {
//     console.log(selectbox)
//     selectbox.classList.toggle('.infoList');
// });

