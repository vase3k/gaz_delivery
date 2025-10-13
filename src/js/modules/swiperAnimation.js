'use strict';

function animateSlide() {
    const next = document.querySelector('.feedback__button--next');
    const prev = document.querySelector('.feedback__button--prev');
    const slide = document.querySelector('.feedback__container');

    next.addEventListener('click', () => {
        if (slide.classList.contains('feedback__container--animate-1')) {
            slide.classList.toggle('feedback__container--animate-2');
        } else {
            slide.classList.toggle('feedback__container--animate-1');
        }
    });
    prev.addEventListener('click', () => {
        if (slide.classList.contains('feedback__container--animate-1')) {
            slide.classList.toggle('feedback__container--animate-2');
        } else {
            slide.classList.toggle('feedback__container--animate-1');
        }
    });
}

export default animateSlide;
