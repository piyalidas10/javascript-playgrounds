let slides, indicators;
let prevSlide, nextSlide;
let currentSlideIndex = 1;
window.addEventListener('load', function(e) {
    slides = document.getElementsByClassName('slide');
    indicators = document.getElementsByClassName('carousel-indicators')[0].children;
    prevSlide = document.getElementsByClassName('prevSlide')[0];
    nextSlide = document.getElementsByClassName('nextSlide')[0];
    prevSlide.addEventListener('click', function(e) {
        goToPrevSlide(false, e);
    });
    prevSlide.addEventListener('keydown', function(e) {
        goToPrevSlide(true, e);
    });
    nextSlide.addEventListener('click', function(e) {
        goToNextSlide(false, e);
    });
    nextSlide.addEventListener('keydown', function(e) {
        goToNextSlide(true, e);
    });    
    for (let indicatorIndex = 0; indicatorIndex < indicators.length; indicatorIndex++) {
        indicators[indicatorIndex].addEventListener('click', function(e) {
            goToCurrentSlide(indicatorIndex+1, false, e);
        });
        indicators[indicatorIndex].addEventListener('keydown', function(e) {
            goToCurrentSlide(indicatorIndex+1, true, e);
        });
    }
    currentSlideIndex = getCurrentSlideIndex();
    setControlButton(currentSlideIndex);    
    autoPlay(e);
});
function setControlButton(currentSlideIndex) {
    if(currentSlideIndex == 1) {
        prevSlide.classList.add('inactive');
    } else {
        prevSlide.classList.remove('inactive');
    }
    if(currentSlideIndex == slides.length) {
        nextSlide.classList.add('inactive');
    } else {
        nextSlide.classList.remove('inactive');
    }
}
function goToPrevSlide(isKey, event) {
    currentSlideIndex = getCurrentSlideIndex() - 1;
    if(currentSlideIndex >= 1) {
        if(isKey) {
            if(event.keyCode === 13) {            
                showCurrentSlide(currentSlideIndex);
            }
        } else {
            showCurrentSlide(currentSlideIndex);
        }
        setControlButton(currentSlideIndex);
    }        
}
function goToNextSlide(isKey, event) {
    currentSlideIndex = getCurrentSlideIndex() + 1;
    if(currentSlideIndex <= slides.length) {
        if(isKey) {
            if(event.keyCode === 13) {
                showCurrentSlide(currentSlideIndex);
            }
        } else {
            showCurrentSlide(currentSlideIndex);
        }
        setControlButton(currentSlideIndex);
    } 
}
function getCurrentSlideIndex() {
    for (let slideIndex = 0; slideIndex < slides.length; slideIndex++) {
        if(slides[slideIndex].classList.contains('active')) {
            currentSlideIndex = slideIndex;
        }
    }
    return currentSlideIndex + 1;
}
function goToCurrentSlide(slideIndex, isKey, event) {
    if(isKey) {
        if(event.keyCode === 13) {
            showCurrentSlide(slideIndex);
        }
    } else {
        showCurrentSlide(slideIndex);
    }
}
function showCurrentSlide(slideIndex) {
    for (let slide of slides) {
        slide.classList.remove('active');
    }   
    for (let indicator of indicators) {
        indicator.classList.remove('active');
    }
    slides[slideIndex-1].classList.add('active');
    indicators[slideIndex-1].classList.add('active');
    setControlButton(slideIndex);
}
function autoPlay(event) {
    setInterval(function () {
        if(currentSlideIndex <= slides.length) {
            goToNextSlide(false, event);
        }
        if(currentSlideIndex > slides.length) {
            currentSlideIndex = 1;
            showCurrentSlide(currentSlideIndex);
        }
    }, 4000);
}