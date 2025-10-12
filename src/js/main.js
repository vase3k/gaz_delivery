'use strict';

import tabs from './modules/tabs';
import '/src/js/modules/swiper.js';

window.addEventListener('DOMContentLoaded', async () => {
    try {
        tabs({
            buttonsSelector: '.delivery__tabs-button',
            tabsSelector: '.delivery__content-item',
        });
    } catch (e) {
        return;
    }
});
