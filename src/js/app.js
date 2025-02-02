"use strict";

import initSlideToggle from './modules/slideToggle.js';
import isWebp from './modules/webp.js';
import detectDevice from './modules/detectDevice.js';
import { inpuTelMaskRussia } from './modules/maskRussia.js';
import { Popup } from './modules/popup.js';
import { FilePreview } from './modules/inputFileAttachments.js';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';



initSlideToggle();


document.addEventListener("DOMContentLoaded", () => {

    // check support webP
    isWebp();

    // detect user device
    detectDevice();

    // input mask Russia
    inpuTelMaskRussia();

    // init modals
    const popupManager = new Popup();

    // init preview file attachments
    const filePreview = new FilePreview();




    // click handlers
    document.addEventListener('click', (e) => {

        const { target } = e;

        // header search toggler
        if (target.matches('.header__search-toggler')) {

            const searchBox = document.querySelector('.header__search');
            const searchField = searchBox.querySelector('.form__control');

            searchBox.classList.add('active');
            setTimeout(() => {
                searchField.focus()
            }, 300);

            searchField.addEventListener('blur', () => {
                searchBox.classList.remove('active');
            }, { once: true });
        }

        // toggle mobile menu
        if (target.closest('.icon-menu')) {
            const menuBtn = target.closest('.icon-menu');
            const menu = document.querySelector('.menu');

            menuBtn.classList.toggle('active');
            menu.classList.toggle('active');
        }

        // favorite btn
        if (target.matches('.favorite-btn')) {
            target.classList.toggle('active')
        }

        // cases tabs
        if (target.matches('.cases__btn')) {
            const caseButtons = document.querySelectorAll('.cases__btn');
            const caseBlocks = document.querySelectorAll('.cases__block');

            const targetIndex = Array.from(caseButtons).indexOf(target);

            caseButtons.forEach((caseBtn) => caseBtn.classList.remove('active'));
            caseBlocks.forEach((caseBlock) => caseBlock.classList.remove('active'));

            target.classList.add('active');

            if (caseBlocks[targetIndex]) {
                caseBlocks[targetIndex].classList.add('active');
            }
        }

        // see visible more cases on touch devices
        if (target.matches('.case__more-btn') && document.body.classList.contains('_touch')) {
            const caseMore = target.closest('.case__more');
            caseMore.classList.add('visible');

            document.addEventListener('click', () => {
                caseMore.classList.remove('visible')
            }, { once: true });
        }

        // faq accoridon
        if (target.closest('.faq__item')) {
            target.closest('.faq__item').classList.toggle('active');
            target.closest('.faq__item').style.setProperty('pointer-events', 'none');
            target.closest('.faq__item')?.querySelector('.faq__item-answer').slideToggle(300, () => {
                target.closest('.faq__item').removeAttribute('style');
            })
        }

        // see more doctor education info in sidebar
        if (target.matches('.doctor__property') && target.closest('.sidebar__doctors') && document.body.classList.contains('_touch')) {
            e.preventDefault();

            const educationMore = target?.nextElementSibling;

            educationMore.classList.add('visible');

            document.addEventListener('click', () => {
                educationMore.classList.remove('visible')
            }, { once: true });
        }
    });





    // sliders
    if (document.querySelector('.reviews__slider')) {
        new Swiper(document.querySelector('.reviews__slider'), {
            modules: [Navigation],
            slidesPerView: 1.05,
            spaceBetween: 6,
            watchOverflow: true,
            navigation: {
                nextEl: '.reviews__next',
                prevEl: '.reviews__prev'
            },
            breakpoints: {
                575.98: {
                    slidesPerView: 2,
                    spaceBetween: 12,
                },
                767.98: {
                    slidesPerView: 3,
                    spaceBetween: 12,
                }
            }
        })
    }

    if (document.querySelector('.blog__slider')) {
        new Swiper(document.querySelector('.blog__slider'), {
            modules: [Navigation],
            slidesPerView: 1,
            spaceBetween: 6,
            watchOverflow: true,
            navigation: {
                nextEl: '.blog__next',
                prevEl: '.blog__prev'
            },
            breakpoints: {
                575.98: {
                    slidesPerView: 2,
                    spaceBetween: 12,
                },
                767.98: {
                    slidesPerView: 3,
                    spaceBetween: 12,
                }
            }
        })
    }

})



