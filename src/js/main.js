'use strict';

import animateSlide from './modules/swiperAnimation';
import tabs from './modules/tabs';
import '/src/js/modules/swiper.js';

window.addEventListener('DOMContentLoaded', () => {
    try {
        tabs({
            buttonsSelector: '.delivery__tabs-button',
            tabsSelector: '.delivery__content-item',
        });
    } catch (e) {
        console.log(e.message);
    }
    animateSlide();
});
