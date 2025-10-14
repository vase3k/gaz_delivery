'use strict';

import tabs from './modules/tabs';
import initiateSwiper from './modules/swiper';
import accordion from './modules/accordion';
import validateQuestionForm from './modules/question-form-validation';

window.addEventListener('DOMContentLoaded', () => {
    try {
        tabs({
            buttonsSelector: '.delivery__tabs-button',
            tabsSelector: '.delivery__content-item',
        });
        initiateSwiper();
        accordion();
        validateQuestionForm();
    } catch (e) {
        console.log(e.message);
    }
});
