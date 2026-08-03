// ===========================
// ELEMENT
// ===========================

const track = document.querySelector(".track");
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

// ===========================
// CONFIG
// ===========================

let currentIndex = 0;
const totalSlides = slides.length;
const autoDelay = 5000;

let autoSlide;

// ===========================
// UPDATE SLIDER
// ===========================

function updateSlider() {

    track.style.transform =
        `translateX(-${currentIndex * 100}%)`;

    dots.forEach(dot => {
        dot.classList.remove("active");
    });

    dots[currentIndex].classList.add("active");

}

// ===========================
// NEXT
// ===========================

function nextSlide() {

    currentIndex++;

    if (currentIndex >= totalSlides) {

        currentIndex = 0;

    }

    updateSlider();

}

// ===========================
// PREVIOUS
// ===========================

function prevSlide() {

    currentIndex--;

    if (currentIndex < 0) {

        currentIndex = totalSlides - 1;

    }

    updateSlider();

}

// ===========================
// AUTO SLIDE
// ===========================

function startAutoSlide() {

    autoSlide = setInterval(() => {

        nextSlide();

    }, autoDelay);

}

function restartAutoSlide() {

    clearInterval(autoSlide);

    startAutoSlide();

}

// ===========================
// BUTTON
// ===========================

nextBtn.addEventListener("click", () => {

    nextSlide();

    restartAutoSlide();

});

prevBtn.addEventListener("click", () => {

    prevSlide();

    restartAutoSlide();

});

// ===========================
// DOT INDICATOR
// ===========================

dots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        currentIndex = index;

        updateSlider();

        restartAutoSlide();

    });

});

// ===========================
// SWIPE MOBILE
// ===========================

let touchStartX = 0;
let touchEndX = 0;

track.addEventListener("touchstart", (e) => {

    touchStartX = e.touches[0].clientX;

});

track.addEventListener("touchmove", (e) => {

    touchEndX = e.touches[0].clientX;

});

track.addEventListener("touchend", () => {

    const distance = touchStartX - touchEndX;

    if (distance > 60) {

        nextSlide();

        restartAutoSlide();

    }

    if (distance < -60) {

        prevSlide();

        restartAutoSlide();

    }

});

// ===========================
// KEYBOARD
// ===========================

document.addEventListener("keydown", (e) => {

    if (e.key === "ArrowRight") {

        nextSlide();

        restartAutoSlide();

    }

    if (e.key === "ArrowLeft") {

        prevSlide();

        restartAutoSlide();

    }

});

// ===========================
// PAUSE TAB
// ===========================

document.addEventListener("visibilitychange", () => {

    if (document.hidden) {

        clearInterval(autoSlide);

    } else {

        restartAutoSlide();

    }

});

// ===========================
// START
// ===========================

updateSlider();

startAutoSlide();