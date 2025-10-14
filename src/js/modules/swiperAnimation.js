'use strict';

function swiperAnimation(direction = 'normal') {
    const slide1 = document.querySelector('.feedback__animation-slide-1'),
        slide2 = document.querySelector('.feedback__animation-slide-2'),
        slide3 = document.querySelector('.feedback__animation-slide-3'),
        slide4 = document.querySelector('.feedback__animation-slide-4');

    slide1.animate(
        [
            { maxWidth: '759px', height: '220px', zIndex: -3 },
            { maxWidth: '799px', height: '286px', zIndex: -3 },
        ],
        {
            duration: 500,
            iterations: 1,
            direction: direction,
            easing: 'linear',
        }
    );
    slide2.animate(
        [
            { maxWidth: '799px', height: '286px' },
            { maxWidth: '759px', height: '320px', zIndex: -1 },
        ],
        {
            duration: 500,
            iterations: 1,
            direction: direction,
            easing: 'linear',
        }
    );
    slide3.animate(
        [
            { maxWidth: '839px', height: '252px' },
            { maxWidth: '799px', height: '286px', zIndex: -2 },
        ],
        {
            duration: 500,
            iterations: 1,
            direction: direction,
            easing: 'linear',
        }
    );
    slide4.animate(
        [
            {
                opacity: 1,
            },
        ],
        {
            duration: 500,
            iterations: 1,
            direction: direction,
            easing: 'linear',
        }
    );
}

export default swiperAnimation;
