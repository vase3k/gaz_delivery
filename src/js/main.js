'use strict';

import tabs from './modules/tabs';
import initiateSwiper from './modules/swiper';

window.addEventListener('DOMContentLoaded', () => {
    try {
        tabs({
            buttonsSelector: '.delivery__tabs-button',
            tabsSelector: '.delivery__content-item',
        });
        initiateSwiper();
    } catch (e) {
        console.log(e.message);
    }
});
