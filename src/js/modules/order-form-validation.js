'use strict';

import JustValidate from 'just-validate';

function validateOrderForm() {
    const validation = new JustValidate('.modal__form', {
        submitFormAutomatically: true,
        validateBeforeSubmitting: true,
    });

    validation
        .addField(
            '.modal__input[name="name"]',
            [
                {
                    rule: 'required',
                    errorMessage: 'Введите имя',
                },
                {
                    rule: 'minLength',
                    value: 2,
                    errorMessage: 'короче двух символов имя быть не может',
                },
            ],
            {
                errorsContainer: document.querySelector('.modal__input[name="name"]')
                    .nextElementSibling,
            }
        )
        .addField(
            '.modal__input[name="phone"]',
            [
                { rule: 'required', errorMessage: 'сюда нужно ввести телефон' },
                {
                    rule: 'minLength',
                    value: 7,
                    errorMessage: 'сюда нужно ввести телефон',
                },
                {
                    validator: value => {
                        const phoneRegex = /^\+?\s*(?:[\d\s()-]*\d){7,15}$/;
                        return phoneRegex.test(value);
                    },
                    errorMessage: 'Введите корректный телефон',
                },
            ],
            {
                errorsContainer: document.querySelector('.modal__input[name="phone"]')
                    .nextElementSibling,
            }
        )
        .onSuccess(event => {
            event.target.submit();
        });
    validation.refresh();

    //show modal
    const modal = document.querySelector('.modal');
    const close = modal.querySelector('.modal__close img');
    const form = modal.querySelector('.modal__form');
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    console.log(close);

    const showModal = () => {
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${scrollbarWidth}px`;
    };

    const hideModal = () => {
        modal.classList.add('hide');
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
        form.reset();
        if (typeof validation?.refresh === 'function') validation.refresh();
    };

    document.addEventListener('click', e => {
        console.log(e.target);
        if (e.target.matches('[data-order]')) showModal();
        if (e.target === modal || e.target === close) hideModal();
    });
}

export default validateOrderForm;
