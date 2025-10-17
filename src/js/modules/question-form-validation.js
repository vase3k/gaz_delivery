'use strict';

import JustValidate from 'just-validate';

function validateQuestionForm() {
    const validation = new JustValidate('.question__form', {
        submitFormAutomatically: false,
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
        .onSuccess(e => {
            //get data from form
            const formData = new FormData(e.srcElement);
            const object = {};
            formData.forEach((value, key) => {
                object[key] = value;
            });
            const json = JSON.stringify(object);

            //send data via http request
            const request = new XMLHttpRequest();
            request.open('POST', 'https://httpbin.org/post');
            request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            request.send(json);

            request.addEventListener('error', () => {
                console.log('something went wrong');
            });

            request.addEventListener('load', () => {
                if (request.status >= 200 && request.status < 300) {
                    console.log('succes', JSON.parse(request.response).json);
                } else {
                    console.log('somethig went wrong');
                }
            });

            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.paddingRight = `${scrollbarWidth}px`;
            const confirmationModal = document.querySelector('.confirmation');
            confirmationModal.classList.toggle('hide');
            document.body.style.overflow = 'hidden';
        });
    validation.refresh();

    const confirmationModal = document.querySelector('.confirmation');
    const confirmationForm = document.querySelector('.question__form');

    confirmationModal.addEventListener('click', e => {
        if (
            e.target === confirmationModal ||
            e.target.matches('.confirmation__button') ||
            e.target.matches('.confirmation__container')
        ) {
            confirmationModal.classList.toggle('hide');
            document.body.style.overflow = ''; // вернуть скролл
            document.body.style.paddingRight = ''; // убрать компенсацию
            confirmationForm.reset();
            validation.refresh();
        }
    });
}

export default validateQuestionForm;
