'use strict';

function tabs({ tabsSelector, defaultSlide = 0, buttonsSelector }) {
    const tabs = Array.from(document.querySelectorAll(tabsSelector));
    const buttons = Array.from(document.querySelectorAll(buttonsSelector));

    tabs.forEach((tab, i) => {
        tab.classList.toggle('delivery__content-item--active', i === defaultSlide);
    });

    const buttonsParent = buttons[0].parentNode;
    buttonsParent.addEventListener('click', e => {
        if (e.target.tagName === 'BUTTON') {
            const tabIndex = buttons.indexOf(e.target);
            if (tabIndex < 0) return;

            tabs.forEach((tab, i) => {
                tab.classList.toggle('delivery__content-item--active', i === tabIndex);
            });
        }
    });
}

export default tabs;
