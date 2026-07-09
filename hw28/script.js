class Slider {
    #sliderRotationInterval = null;
    #track = null;
    #slides = null;
    #slide = null;
    #nextButton = null;
    #prevButton = null;
    #dotsContainer = null;
    #currentSlideIndex = null;
    #totalSlides = null;
    #dots = null;
    #startX = 0;
    #isMoving = false;
    #timer = null;

    constructor(options = {}) {
        this.#sliderRotationInterval = options.sliderRotationInterval;

        this.#track = document.getElementById(options.track);
        this.#slides = document.querySelectorAll(options.slides);
        this.#slide = document.getElementById(options.slide);
        this.#nextButton = document.getElementById(options.nextButton);
        this.#prevButton = document.getElementById(options.prevButton);
        this.#dotsContainer = document.getElementById(options.dotsContainer);

        this.#currentSlideIndex = 0;
        this.#totalSlides = this.#slides.length;

        this.#initDots();
        this.#attachEventListeners();
        this.#attachTouchEventListeners();
        this.startRotation();

        window.addEventListener('resize', () => {
            this.#track.style.transition = "none";
            this.#track.style.transform = `translateX(-${this.#currentSlideIndex * this.#sliderWidth}px)`;
        });
    }

    get #sliderWidth() {
        return this.#slide ? this.#slide.clientWidth : 0;
    }

    startRotation() {
        if (this.#timer) return;
        this.#timer = setInterval(() => this.#nextSlide(), this.#sliderRotationInterval);
    }

    stopRotation() {
        clearInterval(this.#timer);
        this.#timer = null;
    }

    #restartRotation() {
        this.stopRotation();
        this.startRotation();
    }

    #nextSlide() {
        this.#currentSlideIndex = this.#currentSlideIndex >= this.#totalSlides - 1 ? 0 : ++this.#currentSlideIndex;
        this.#showSlide(this.#currentSlideIndex);
    }

    #showSlide(idx) {
        this.#track.style.transition = "transform 0.3s ease-out";
        this.#track.style.transform = `translateX(-${idx * this.#sliderWidth}px)`;
        this.#updateDots(idx);
    }

    #prevSlide() {
        this.#currentSlideIndex = this.#currentSlideIndex <= 0 ? this.#totalSlides - 1 : --this.#currentSlideIndex;
        this.#showSlide(this.#currentSlideIndex);
    }

    #attachEventListeners() {
        this.#nextButton.addEventListener('click', () => {
            this.#nextSlide();
            this.#restartRotation();
        });
        this.#prevButton.addEventListener('click', () => {
            this.#prevSlide();
            this.#restartRotation();
        });

        if (this.#slide) {
            this.#slide.addEventListener('mouseover', () => {
                console.log('MOUSE >>>');
                this.stopRotation();
            });

            this.#slide.addEventListener('mouseout', () => {
                console.log('MOUSE <<<');
                this.startRotation();
            });
        }
    }

    #initDots() {
        this.#slides.forEach((slide, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) {
                dot.classList.add('active');
            }
            this.#dotsContainer.append(dot);

            dot.addEventListener('click', () => {
                this.#currentSlideIndex = index;
                this.#showSlide(index);
                this.#restartRotation();
            });
        });

        this.#dots = document.querySelectorAll('.dot');
    }

    #updateDots(dotIndex) {
        const dots = this.#dots;
        dots.forEach(dot => dot.classList.remove('active'));
        if (dots[dotIndex]) {
            dots[dotIndex].classList.add('active');
        }
    }

    #attachTouchEventListeners() {
        this.#track.addEventListener('touchstart', (event) => {
            if (event.touches.length > 1) {
                return;
            }
            this.#startX = event.touches.clientX;
            this.#isMoving = true;
            this.#track.style.transition = "none";
            this.stopRotation();
        });

        this.#track.addEventListener('touchmove', (event) => {
            if (!this.#isMoving) return;
            const dx = event.touches.clientX - this.#startX;
            const currentOffset = -(this.#currentSlideIndex * this.#sliderWidth) + dx;
            this.#track.style.transform = `translateX(${currentOffset}px)`;
        });

        this.#track.addEventListener('touchend', (event) => {
            if (!this.#isMoving) return;
            this.#isMoving = false;
            const endX = event.changedTouches.clientX;
            const dX = endX - this.#startX;
            if (dX > 50) {
                this.#prevSlide();
            } else if (dX < -50) {
                this.#nextSlide();
            } else {
                this.#showSlide(this.#currentSlideIndex);
            }
            this.startRotation();
        });
    }
}

const slider = new Slider({
    sliderRotationInterval: 5000,
    track: 'slider-track',
    slides: '.slide',
    slide: 'slider',
    nextButton: 'next',
    prevButton: 'prev',
    dotsContainer: 'dots',
});

const play = document.getElementById('start');
const stop = document.getElementById('stop');

if (play) play.addEventListener('click', () => slider.startRotation());
if (stop) stop.addEventListener('click', () => slider.stopRotation());
