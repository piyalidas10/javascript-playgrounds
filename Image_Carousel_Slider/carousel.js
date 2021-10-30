let slides, indicators;
let prevSlide, nextSlide;
let currentSlideIndex = 1;
let interval = 5000;
let timer;
let windowEvent;
window.addEventListener('load', function(e) {
    windowEvent = e;
    slides = document.getElementsByClassName('slide');
    if(document.getElementsByClassName('carousel-indicators')) {
        if(document.getElementsByClassName('carousel-indicators').length > 0) {
            indicators = document.getElementsByClassName('carousel-indicators')[0].children;
            if(indicators) {
                for (let indicatorIndex = 0; indicatorIndex < indicators.length; indicatorIndex++) {
                    indicators[indicatorIndex].addEventListener('click', function(e) {
                        goToCurrentSlide(indicatorIndex+1, false, e);
                    });
                    indicators[indicatorIndex].addEventListener('keydown', function(e) {
                        goToCurrentSlide(indicatorIndex+1, true, e);
                    });
                }
            }
        }        
    }    
    if(document.getElementsByClassName('prevSlide')) {
        prevSlide = document.getElementsByClassName('prevSlide')[0];
        prevSlide.addEventListener('click', function(e) {
            goToPrevSlide(false, e);
        });
        prevSlide.addEventListener('keydown', function(e) {
            goToPrevSlide(true, e);
        });
    }
    if(document.getElementsByClassName('nextSlide')) {
        nextSlide = document.getElementsByClassName('nextSlide')[0];
        nextSlide.addEventListener('click', function(e) {
            goToNextSlide(false, e);
        });
        nextSlide.addEventListener('keydown', function(e) {
            goToNextSlide(true, e);
        });
    }  
    if(slides && slides.length > 1) {
        currentSlideIndex = getCurrentSlideIndex();
        setControlButton(currentSlideIndex);    
        autoPlay(windowEvent, interval);
    }    
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
    if(slides && slides.length > 0) {
        for (let slide of slides) {
            slide.classList.remove('active');
        } 
        slides[slideIndex-1].classList.add('active');
    } 
    if(indicators && indicators.length > 0) {
        for (let indicator of indicators) {
            indicator.classList.remove('active');
            indicator.setAttribute('aria-disabled', 'true');
        }
        indicators[slideIndex-1].classList.add('active');
        indicators[slideIndex-1].setAttribute('aria-disabled', 'false');
    }
    setControlButton(slideIndex);
    clearInterval(timer);
    autoPlay(windowEvent, interval);
}
function autoPlay(event, interval) {
    if (interval === 0) return;
    timer = setInterval(function () {
        if(currentSlideIndex <= slides.length) {
            goToNextSlide(false, event);
        }
        if(currentSlideIndex > slides.length) {
            currentSlideIndex = 1;
            showCurrentSlide(currentSlideIndex);
        }
    }, interval);
}