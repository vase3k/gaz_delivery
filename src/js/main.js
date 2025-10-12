'use strict';

import tabs from './modules/tabs';

window.addEventListener('DOMContentLoaded', async () => {
    tabs({
        buttonsSelector: '.delivery__tabs-button',
        tabsSelector: '.delivery__content-item',
    });
});
