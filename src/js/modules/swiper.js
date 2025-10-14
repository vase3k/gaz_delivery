import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import swiperAnimation from './swiperAnimation';
import 'swiper/css';
import 'swiper/css/pagination';

function initiateSwiper() {
    const swiper = new Swiper('.swiper', {
        modules: [Navigation, Pagination],
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        loop: true,

        navigation: {
            nextEl: '.feedback__button--next',
            prevEl: '.feedback__button--prev',
        },
    });

    swiper.on('slideNextTransitionStart', () => swiperAnimation());
    swiper.on('slidePrevTransitionStart', () => swiperAnimation('reverse'));
}

export default initiateSwiper;
