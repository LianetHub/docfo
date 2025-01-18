"use strict";

import initSlideToggle from './modules/slideToggle.js';
import { Popup } from './modules/popup.js';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';



initSlideToggle();


document.addEventListener("DOMContentLoaded", () => {

    // init modals
    const popupManager = new Popup();

    // click handlers
    document.addEventListener('click', (e) => {

        const { target } = e;

        // header search toggler
        if (target.matches('.header__search-toggler')) {
            document.querySelector('.header__search').classList.add('active');
            setTimeout(() => {
                document.querySelector('.header__search .form__control').focus()
            }, 300)
        }

        // favorite btn
        if (target.matches('.favorite-btn')) {
            target.classList.toggle('active')
        }

        // faq accoridon
        if (target.closest('.faq__item')) {
            target.closest('.faq__item').classList.toggle('active');
            target.closest('.faq__item')?.querySelector('.faq__item-answer').slideToggle()
        }
    })


    // sliders
    if (document.querySelector('.reviews__slider')) {
        new Swiper(document.querySelector('.reviews__slider'), {
            modules: [Navigation],
            slidesPerView: 3,
            spaceBetween: 12,
            watchOverflow: true,
            navigation: {
                nextEl: '.reviews__next',
                prevEl: '.reviews__prev'
            }
        })
    }

    if (document.querySelector('.blog__slider')) {
        new Swiper(document.querySelector('.blog__slider'), {
            modules: [Navigation],
            slidesPerView: 3,
            spaceBetween: 12,
            watchOverflow: true,
            navigation: {
                nextEl: '.blog__next',
                prevEl: '.blog__prev'
            }
        })
    }

})



