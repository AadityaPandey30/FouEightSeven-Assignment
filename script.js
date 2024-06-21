document.addEventListener("DOMContentLoaded", function() {
    const carouselInner = document.getElementById('carousel-inner');
    const indicatorButtons = document.querySelectorAll('.indicator-buttons button');
    let currentIndex = 0;
    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    const images = carouselInner.querySelectorAll('img');
    const totalImages = images.length;

    function updateCarousel() {
        const offset = -currentIndex * 100;
        carouselInner.style.transform = `translateX(${offset}%)`;
        updateIndicators();
    }

    function updateIndicators() {
        indicatorButtons.forEach(button => button.classList.remove('active'));
        indicatorButtons[currentIndex].classList.add('active');
    }

    indicatorButtons.forEach(button => {
        button.addEventListener('click', function() {
            currentIndex = parseInt(this.dataset.index);
            updateCarousel();
        });
    });

    // Touch event listeners
    carouselInner.addEventListener('touchstart', handleTouchStart);
    carouselInner.addEventListener('touchmove', handleTouchMove);
    carouselInner.addEventListener('touchend', handleTouchEnd);

    function handleTouchStart(event) {
        startX = event.touches[0].clientX;
        isDragging = true;
    }

    function handleTouchMove(event) {
        if (!isDragging) return;
        currentX = event.touches[0].clientX;
    }

    function handleTouchEnd() {
        if (!isDragging) return;
        const diffX = startX - currentX;
        if (Math.abs(diffX) > 50) { // Minimum swipe distance
            if (diffX > 0) {
                // Swiped left
                currentIndex = (currentIndex + 1) % totalImages;
            } else {
                // Swiped right
                currentIndex = (currentIndex - 1 + totalImages) % totalImages;
            }
            updateCarousel();
        }
        isDragging = false;
    }

    // Initial update
    updateCarousel();
});
