'use strict';

function tabs({ tabsSelector, defaultSlide = 0, buttonsSelector }) {
    const tabs = document.querySelectorAll(tabsSelector);
    const buttons = document.querySelectorAll(buttonsSelector);
    if (!tabs.length || !buttons.length) return;

    const setActive = index => {
        for (let i = 0; i < tabs.length; i++) {
            const isActive = i === index;
            tabs[i].classList.toggle('delivery__content-item--active', isActive);
            buttons[i].classList.toggle('delivery__tabs-button--active', isActive);
        }
    };

    setActive(defaultSlide);

    const buttonsParent = buttons[0].parentElement;

    buttonsParent.addEventListener('click', e => {
        const btn = e.target.closest('button');
        if (!btn) return;

        const tabIndex = Array.prototype.indexOf.call(buttons, btn);
        if (tabIndex === -1) return;

        setActive(tabIndex);
    });
}

export default tabs;
