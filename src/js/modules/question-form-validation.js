'use strict';

import JustValidate from 'just-validate';

function validateQuestionForm() {
    const validation = new JustValidate('.question__form', {
        submitFormAutomatically: true,
        validateBeforeSubmitting: true,
    });

    validation
        .addField(
            '.question__form-input[name="name"]',
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
                errorsContainer: document.querySelector('.question__form-input[name="name"]')
                    .nextElementSibling,
            }
        )
        .addField(
            '.question__form-input[name="contact"]',
            [
                { rule: 'required', errorMessage: 'сюда нужно ввести Email или телефон' },
                {
                    rule: 'minLength',
                    value: 2,
                    errorMessage: 'сюда нужно ввести почту или телефон',
                },
                {
                    validator: value => {
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        const phoneRegex = /^\+?\s*(?:[\d\s()-]*\d){7,15}$/;
                        return emailRegex.test(value) || phoneRegex.test(value);
                    },
                    errorMessage: 'Введите корректный email или телефон',
                },
            ],
            {
                errorsContainer: document.querySelector('.question__form-input[name="contact"]')
                    .nextElementSibling,
            }
        )
        .addField(
            '.question__form-textarea[name="question"]',
            [
                { rule: 'required', errorMessage: 'Введите вопрос' },
                {
                    rule: 'minLength',
                    value: 2,
                    errorMessage: 'сюда нужно ввести вопрос',
                },
            ],
            {
                errorsContainer: document.querySelector('.question__form-textarea[name="question"]')
                    .nextElementSibling,
            }
        )
        .onSuccess(event => {
            event.target.submit();
        });
    validation.refresh();
}

export default validateQuestionForm;
