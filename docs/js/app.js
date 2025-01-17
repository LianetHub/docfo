"use strict";

import initSlideToggle from './modules/slideToggle.js';
import Fancybox from "@fancyapps/ui/src/Fancybox";
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

//  init Fancybox
if (typeof Fancybox !== "undefined" && Fancybox !== null) {
    Fancybox.bind("[data-fancybox]", {
        dragToClose: false,
        closeButton: false
    });
}

initSlideToggle();


document.addEventListener("DOMContentLoaded", () => {

    // click handlers
    document.addEventListener('click', (e) => {
        const { target } = e;

        if (target.closest('.faq__item')) {

            target.closest('.faq__item').classList.toggle('active');
            target.closest('.faq__item')?.querySelector('.faq__item-answer').slideToggle()
        }
    })

})



