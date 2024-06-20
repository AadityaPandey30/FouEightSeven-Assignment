document.addEventListener("DOMContentLoaded", function() {
    const carouselInner = document.getElementById('carousel-inner');
    const indicatorButtons = document.querySelectorAll('.indicator-buttons button');
    let currentIndex = 0;

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

});
