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
    const buttons = document.querySelectorAll('button[data-order]');
    const close = document.querySelector('.modal__close');
    const form = document.querySelector('.modal__form');

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.classList.remove('hide');
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        });
    });

    close.addEventListener('click', () => {
        modal.classList.add('hide');
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
        form.reset();
        validation.refresh();
    });

    modal.addEventListener('click', e => {
        if (e.target.classList.contains('modal')) {
            modal.classList.add('hide');
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
            form.reset();
            validation.refresh();
        }
    });
}

export default validateOrderForm;
