'use strict';

function accordion() {
    const container = document.querySelector('.faq__accordion');

    container.addEventListener('click', e => {
        //возвращает ближайший элемент с классом
        const question = e.target.closest('.faq__question');
        if (!question) return;

        question.classList.toggle('faq__question--active');
        const answer = question.nextElementSibling;
        const isActive = answer.classList.toggle('faq__answer--active');

        // requestAnimationFrame сам вызывает callback
        requestAnimationFrame(() => {
            answer.style.maxHeight = isActive ? answer.scrollHeight + 'px' : '0';
        });
    });
}

export default accordion;
