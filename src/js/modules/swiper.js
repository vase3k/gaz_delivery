import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const swiper = new Swiper('.swiper', {
    modules: [Navigation, Pagination],
    pagination: {
        el: '.swiper-pagination',
    },
    loop: true,
    navigation: {
        nextEl: '.feedback__button--next',
        prevEl: '.feedback__button--prev',
    },
});
