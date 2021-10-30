let products, sliderFullWidth, scrollerWidth, productWidth, productsShowAtATime, productsSpaceBetween;
let currentSlideIndex = 1;
let interval = 5000;
let timer;
let windowEvent;
window.addEventListener('load', function(e) {
    windowEvent = e;
    if(document.getElementsByClassName('product-sliders') && document.getElementsByClassName('product-sliders-scroller')) {
        sliderFullWidth = document.getElementsByClassName('product-sliders')[0].offsetWidth;
        productsShowAtATime = document.getElementsByClassName('product-sliders')[0].getAttribute('data-slidesShow');
        productsSpaceBetween = document.getElementsByClassName('product-sliders')[0].getAttribute('data-spacebetween');
        products = document.getElementsByClassName('product');
        if(products.length > 0) {
            productWidth = sliderFullWidth/productsShowAtATime;
            scrollerWidth = (productWidth+productsSpaceBetween) * products.length;
            setProductProperties(products);        
        }
    }    
});
function setProductProperties(products){
    for (let product of products) {
        product.style.width =  productWidth + "px";
        product.style.marginRight = productsSpaceBetween + 'px';
        product.style.transform = 'rotateY(30deg)';
        product.style.transitionDuration = 0+"ms";
    }
    
}
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