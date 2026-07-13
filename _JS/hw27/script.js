const track = document.getElementById('slider-track');
const slides = document.querySelectorAll(".slide");
const nextButtom = document.getElementById('next');
const prevButtom = document.getElementById('prev');
const dotsContainer = document.getElementById('dots');

const sliderRotationInterval = 5000;
const sliderWidth = 960;

let currentSlideIndex = 0;
const totalSlides = slides.length;

function startRotation() {
    setInterval(nextSlide, sliderRotationInterval);
}

function showSlide(idx) {
    track.style.transition = "transform 0.3s ease-out";
    track.style.transform = `translateX(-${idx * sliderWidth}px)`;
    updateDots(idx);
}

function nextSlide() {
    currentSlideIndex = currentSlideIndex >= totalSlides - 1 ? 0 : ++currentSlideIndex;
    showSlide(currentSlideIndex);
}

function prevSlide() {
    currentSlideIndex = currentSlideIndex <= 0 ? totalSlides - 1 : --currentSlideIndex;
    showSlide(currentSlideIndex);
}

function initDots() {
    slides.forEach((slide, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dotsContainer.append(dot);

        dot.addEventListener('click', () => {
            currentSlideIndex = index;
            showSlide(index);
        });
    });
}

function updateDots(dotIndex) {
    const dots = document.querySelectorAll('.dot');
    if (dots.length === 0) return;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[dotIndex].classList.add('active');
}

nextButtom.addEventListener('click', nextSlide);
prevButtom.addEventListener('click', prevSlide);

let startX = 0;
let isMoving = false;

track.addEventListener('touchstart', (event) => {
    if (event.touches.length > 1) {
        return;
    }
    startX = event.touches[0].clientX;
    isMoving = true;
    track.style.transition = "none";
});

track.addEventListener('touchmove', (event) => {
    if (!isMoving) return;
    const dx = event.touches[0].clientX - startX;
    const currentOffset = -(currentSlideIndex * sliderWidth) + dx;
    track.style.transform = `translateX(${currentOffset}px)`;
});

track.addEventListener('touchend', (event) => {
    if (!isMoving) return;
    isMoving = false;
    const endX = event.changedTouches[0].clientX;
    const dX = endX - startX;
    if (dX > 200) {
        prevSlide();
    } else if (dX < -200) {
        nextSlide();
    } else {
        showSlide(currentSlideIndex);
    }
});

startRotation();
initDots();
updateDots(currentSlideIndex);
