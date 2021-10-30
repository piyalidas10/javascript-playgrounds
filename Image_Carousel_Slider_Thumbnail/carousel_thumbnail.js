let slides, thumbnails;
let prevSlide, nextSlide;
let prevThumbnail, nextThumbnail;
let currentSlideIndex = 1;
let interval = 5000;
let timer;
let windowEvent;
let thumbnailDiv, thumbnailWidth, eachThumbnailWidth, scrollToWidth;
let thumbnailShowAtATime = 5;
let dataHasPrevTrumbnail = 0;
let dataHasNextTrumbnail = 0;
window.addEventListener('load', function(e) {
    windowEvent = e;
    slides = document.getElementsByClassName('slide');
    if(document.getElementsByClassName('carousel-thumbnail-inner')) {
        thumbnailDiv = document.getElementsByClassName('carousel-thumbnail-inner')[0];
    }
    if(document.getElementsByClassName('carousel-thumbnail-inner')) {
        if(document.getElementsByClassName('carousel-thumbnail-inner').length > 0) {
            thumbnails = document.getElementsByClassName('thumbnail');
            if(thumbnails) {
                for (let indicatorIndex = 0; indicatorIndex < thumbnails.length; indicatorIndex++) {
                    thumbnails[indicatorIndex].addEventListener('click', function(e) {
                        goToCurrentSlide(indicatorIndex+1, false, e);
                    });
                    thumbnails[indicatorIndex].addEventListener('keydown', function(e) {
                        goToCurrentSlide(indicatorIndex+1, true, e);
                    });
                }
            }
        }        
    } 
    if(thumbnailDiv && (thumbnails && thumbnails.length > 0)) {
        thumbnailWidth = document.getElementsByClassName('carousel-thumbnail-inner')[0].offsetWidth;
        setThumbnailImg(thumbnails);
        dataHasNextTrumbnail = thumbnails.length - thumbnailShowAtATime;
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
    if(document.getElementsByClassName('thumbnail-prev')) {
        prevThumbnail = document.getElementsByClassName('thumbnail-prev')[0];
        prevThumbnail.addEventListener('click', function(e) {
            leftScrollThumbnail(false, e);
        });
        prevThumbnail.addEventListener('keydown', function(e) {
            leftScrollThumbnail(true, e);
        });
    }
    if(document.getElementsByClassName('thumbnail-next')) {
        nextThumbnail = document.getElementsByClassName('thumbnail-next')[0];
        nextThumbnail.addEventListener('click', function(e) {
            rightScrollThumbnail(false, e);
        });
        nextThumbnail.addEventListener('keydown', function(e) {
            rightScrollThumbnail(true, e);
        });
    }
    if(slides && slides.length > 1) {
        currentSlideIndex = getCurrentSlideIndex();
        setControlButton(currentSlideIndex);    
        autoPlay(windowEvent, interval);
    }  
    if(prevThumbnail && nextThumbnail) {
        currentSlideIndex = getCurrentSlideIndex();
        setThumnailControlButton();
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
    if(thumbnails && thumbnails.length > 0) {
        for (let indicator of thumbnails) {
            indicator.classList.remove('active');
            indicator.setAttribute('aria-disabled', 'true');
        }
        thumbnails[slideIndex-1].classList.add('active');
        thumbnails[slideIndex-1].setAttribute('aria-disabled', 'false');
    }
    if(slideIndex > thumbnailShowAtATime) {
        rightScrollThumbnail();
    }
    if(slideIndex === thumbnails.length) {
        dataHasNextTrumbnail = 0;
        dataHasPrevTrumbnail = thumbnails.length - thumbnailShowAtATime;
    }
    if(slideIndex === 1) {      
        dataHasPrevTrumbnail = 0;      
        dataHasNextTrumbnail = thumbnails.length - thumbnailShowAtATime; 
        thumbnailDiv.scrollLeft = 0;
    }
    setThumnailControlButton();
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
function setThumnailControlButton() {
    if(dataHasPrevTrumbnail === 0) {
        prevThumbnail.classList.remove('enable');
    } else {
        prevThumbnail.classList.add('enable');
    }
    if(dataHasNextTrumbnail === 0) {
        nextThumbnail.classList.remove('enable');
    } else {
        nextThumbnail.classList.add('enable');
    }
}
function setThumbnailImg(thumbnails) {    
    for (let thumbnail of thumbnails) {
        eachThumbnailWidth = thumbnailWidth/thumbnailShowAtATime;
        thumbnail.childNodes[1].children[0].width  = eachThumbnailWidth;
    }
}
function rightScrollThumbnail(isKey, event) {
    thumbnailDiv.scrollLeft += eachThumbnailWidth;       
    dataHasNextTrumbnail--;
    dataHasPrevTrumbnail++;
    if(isKey) {
        if(event.keyCode === 13) {
            setThumnailControlButton();
        }
    } else {
        setThumnailControlButton();
    }
}
function leftScrollThumbnail(isKey, event) {
    thumbnailDiv.scrollLeft -= eachThumbnailWidth;    
    dataHasNextTrumbnail++;
    dataHasPrevTrumbnail--;
    if(isKey) {
        if(event.keyCode === 13) {
            setThumnailControlButton();
        }
    } else {
        setThumnailControlButton();
    }
}