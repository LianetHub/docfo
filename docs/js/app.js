"use strict";

//  init Fancybox
if (typeof Fancybox !== "undefined" && Fancybox !== null) {
    Fancybox.bind("[data-fancybox]", {
        dragToClose: false,
        closeButton: false
    });
}

$(function () {

    // detect user OS
    const isMobile = {
        Android: () => /Android/i.test(navigator.userAgent),
        BlackBerry: () => /BlackBerry/i.test(navigator.userAgent),
        iOS: () => /iPhone|iPad|iPod/i.test(navigator.userAgent),
        Opera: () => /Opera Mini/i.test(navigator.userAgent),
        Windows: () => /IEMobile/i.test(navigator.userAgent),
        any: function () {
            return this.Android() || this.BlackBerry() || this.iOS() || this.Opera() || this.Windows();
        },
    };

    function getNavigator() {
        if (isMobile.any() || $(window).width() < 992) {
            $('body').removeClass('_pc').addClass('_touch');
        } else {
            $('body').removeClass('_touch').addClass('_pc');
        }
    }

    getNavigator();

    $(window).on('resize', () => {
        getNavigator();
    });




    // event handlers
    $(document).on('click', (e) => {
        const $target = $(e.target);

        //  menu
        if ($target.closest('.header__menu-btn').length) {
            $('.header').toggleClass('open-menu');
        }

        if ($target.is('.wrapper') && $('.header').hasClass('open-menu')) {
            $('.header').removeClass('open-menu');
        }

        // faq accordion
        if ($target.closest('.faq__item').length) {
            const $faqItem = $target.closest('.faq__item');
            $faqItem.toggleClass('active');
            $faqItem.find('.faq__item-answer').slideToggle()
        }

        // Открытие/закрытие списка локаций
        if ($target.closest('.sign-lesson__location-selected').length) {
            const $selectedBtn = $target.closest('.sign-lesson__location-selected');
            const $locationList = $selectedBtn.siblings('.sign-lesson__location-list');

            $selectedBtn.toggleClass('active');
            $locationList.toggleClass('open');
        }

        // Закрытие списка при клике вне блока
        if (!$target.closest('.sign-lesson__location').length) {
            $('.sign-lesson__location-selected').removeClass('active');
            $('.sign-lesson__location-list').removeClass('open');
        }

        // Выбор элемента из списка локаций
        if ($target.closest('.sign-lesson__location-item').length) {
            const $locationItem = $target.closest('.sign-lesson__location-item');
            const $locationWrapper = $locationItem.closest('.sign-lesson__location');
            const $locationSelected = $locationWrapper.find('.sign-lesson__location-selected');
            const $locationList = $locationWrapper.find('.sign-lesson__location-list');
            const $contentBlocks = $('.sign-lesson__content');

            // Обновление активного элемента списка
            $locationList.find('.sign-lesson__location-item').removeClass('active');
            $locationItem.addClass('active');

            // Обновление кнопки
            $locationSelected.text($locationItem.text());
            $locationSelected.removeClass('active');
            $locationList.removeClass('open');

            // Обновление контента
            $contentBlocks.removeClass('active').eq($locationItem.index()).addClass('active');
        }

        // Открытие promo__info при клике на form__tooltip
        if ($target.closest('.form__tooltip').length) {
            const $promoForm = $target.closest('.promo__form');
            const $promoInfo = $promoForm.siblings('.promo__info');

            $promoForm.addClass('hidden');
            $promoInfo.removeClass('hidden');
        }

        // Закрытие promo__info при клике на promo__info-close
        if ($target.closest('.promo__info-close').length) {
            const $promoInfo = $target.closest('.promo__info');
            const $promoForm = $promoInfo.siblings('.promo__form');

            $promoInfo.addClass('hidden');
            $promoForm.removeClass('hidden');
        }

        // header location
        if ($target.is('.header__location-btn')) {
            $target.toggleClass('active');
            $('.header__location-list').toggleClass('active');
        }


        if ($('body').hasClass('_touch')) {
            if ($target.closest('.menu__link').length && $target.closest('.menu__item.has-children').length) {
                e.preventDefault();
                const $menuLink = $target.closest('.menu__link');
                const $submenu = $menuLink.next('.submenu');

                const isActive = $menuLink.hasClass('active');

                $('.menu__link').removeClass('active');
                $('.submenu').removeClass('open');

                if (!isActive) {
                    $menuLink.addClass('active');
                    $submenu.addClass('open');
                }
            }
        }

        if ($target.closest('.submenu__close').length) {
            $('.menu__link').removeClass('active');
            $('.submenu').removeClass('open');
        }


    });


    //  sliders
    if ($('.atmosphere__slider').length) {
        new Swiper('.atmosphere__slider', {
            spaceBetween: 10,
            slidesPerView: 1.15,
            navigation: {
                prevEl: '.atmosphere__prev',
                nextEl: '.atmosphere__next',
            },
            pagination: {
                el: '.atmosphere__pagination',
                clickable: true
            },
            breakpoints: {
                797.98: {
                    slidesPerView: 1,
                    spaceBetween: 0
                }
            }
        })
    }

    if ($('.languages__slider').length) {
        new Swiper('.languages__slider', {
            slidesPerView: "auto",
            spaceBetween: 20,
            watchOverflow: true,
            pagination: {
                clickable: true,
                el: '.languages__pagination'
            },
            breakpoints: {
                991.98: {
                    spaceBetween: 19,
                    slidesPerView: 5,
                },
                1199.98: {
                    spaceBetween: 36,
                    slidesPerView: 5,
                }
            }
        })
    }

    if ($('.programms__slider').length) {
        new Swiper('.programms__slider', {
            slidesPerView: "auto",
            spaceBetween: 20,
            watchOverflow: true,
            pagination: {
                clickable: true,
                el: '.programms__pagination'
            },
            breakpoints: {
                991.98: {
                    spaceBetween: 40,
                    slidesPerView: 3,
                },
                1199.98: {
                    spaceBetween: 72,
                    slidesPerView: 3,
                }
            }
        })
    }

    if ($('.prices__slider').length) {
        $('.prices__slider').each(function (index, element) {
            const $slider = $(element);
            const $pagination = $slider.find('.prices__slider-pagination');

            new Swiper($slider[0], {
                slidesPerView: "auto",
                watchOverflow: true,
                pagination: {
                    clickable: true,
                    el: $pagination[0],
                },
            });
        });
    }

    if ($('.why__body').length) {
        getMobileSlider('.why__body', {
            spaceBetween: 20,
            slidesPerView: 'auto',
            pagination: {
                clickable: true,
                el: '.why__pagination'
            }
        })
    }

    if ($('.best-teachers__slider').length) {
        getMobileSlider('.best-teachers__slider', {
            spaceBetween: 20,
            slidesPerView: 'auto',
            pagination: {
                clickable: true,
                el: '.best-teachers__pagination'
            }
        })
    }

    if ($('.info__slider').length) {
        getMobileSlider('.info__slider', {
            spaceBetween: 20,
            slidesPerView: 'auto',
            pagination: {
                clickable: true,
                el: '.info__slider-pagination'
            }
        })
    }

    if ($('.cards__slider').length) {
        getMobileSlider('.cards__slider', {
            spaceBetween: 10,
            slidesPerView: 'auto',
            pagination: {
                clickable: true,
                el: '.cards__slider-pagination'
            }
        })
    }

    if ($('.gallery__slider').length) {
        new Swiper('.gallery__slider-content', {
            spaceBetween: 10,
            slidesPerView: 1,
            navigation: {
                prevEl: '.gallery__slider-prev',
                nextEl: '.gallery__slider-next',
            },
            pagination: {
                el: '.gallery__slider-pagination',
                clickable: true
            },
            breakpoints: {
                576.98: {
                    spaceBetween: 0
                }
            }
        })
    }

    if ($('.goals__slider').length) {
        new Swiper('.goals__slider', {
            spaceBetween: 20,
            slidesPerView: "auto",
            watchOverflow: true,
            pagination: {
                el: '.goals__pagination',
                clickable: true
            },
            breakpoints: {
                991.98: {
                    spaceBetween: 20,
                    slidesPerView: 4,
                },
                1199.98: {
                    spaceBetween: 28,
                    slidesPerView: 4,

                }
            }
        })
    }

    if ($('.daily-routine__items').length) {
        getMobileSlider('.daily-routine__items', {
            slidesPerView: 'auto',
            watchOverflow: true,
            pagination: {
                clickable: true,
                el: '.daily-routine__pagination'
            }
        })
    }

    if ($('.popular__slider').length) {
        new Swiper('.popular__slider', {
            slidesPerView: 'auto',
            spaceBetween: 60,
            pagination: {
                el: '.popular__slider-pagination',
                clickable: true
            },
            breakpoints: {
                767.98: {
                    slidesPerView: 3,
                }
            }
        })
    }




    function getMobileSlider(sliderName, options) {

        let init = false;
        let swiper = null;

        function getSwiper() {
            if (window.innerWidth <= 767.98) {
                if (!init) {
                    init = true;
                    swiper = new Swiper(sliderName, options);
                }
            } else if (init) {
                swiper.destroy();
                swiper = null;
                init = false;
            }
        }
        getSwiper();
        window.addEventListener("resize", getSwiper);
    }





    // observer header scroll
    const callback = (entries) => {
        if (entries[0].isIntersecting) {
            $('.header').removeClass('scroll');
        } else {
            $('.header').addClass('scroll');
        }
    };

    const headerObserver = new IntersectionObserver(callback);
    headerObserver.observe($('.header')[0]);


    // observer header height
    function updateHeaderHeight() {
        var headerHeight = $('.header__wrapper').outerHeight() / parseFloat($('html').css('font-size'));

        $('body').css('--header-height', headerHeight + 'rem');
    }

    updateHeaderHeight();

    $(window).on('resize', function () {
        updateHeaderHeight();
    });




    // tabs
    // class Tabs {
    //     constructor(wrapper) {
    //         this.$wrapper = $(wrapper);
    //         this.$tabButtons = this.$wrapper.find('.tabs__item');
    //         this.$tabContents = this.$wrapper.find('.tab-content');
    //         this.init();
    //     }

    //     init() {
    //         this.$tabButtons.each((index, button) => {
    //             $(button).on('click', () => this.activateTab(index));
    //         });
    //     }

    //     activateTab(index) {
    //         this.$tabButtons.removeClass('active');
    //         this.$tabContents.removeClass('active');

    //         this.$tabButtons.eq(index).addClass('active');
    //         this.$tabContents.eq(index).addClass('active');
    //     }
    // }

    // $('.tabs-wrapper').each((_, wrapper) => new Tabs(wrapper));



    // Custom Select

    class CustomSelect {

        static openDropdown = null

        constructor(selectElement) {
            this.$select = $(selectElement);
            this.defaultText = this.$select.find('option:selected').text();
            this.selectName = this.$select.attr('name');
            this.$options = this.$select.find('option');
            this.icon = this.$select.data('icon');
            this.title = this.$select.data('title');
            this.$dropdown = null;
            this.initialState = {};
            this.init();
        }

        init() {
            if (!this.$select.length) return;
            this.saveInitialState();
            this.$select.addClass('hidden');
            this.renderDropdown();
            this.setupEvents();
        }

        saveInitialState() {
            const $selectedOption = this.$select.find('option:selected');
            this.initialState = {
                selectedText: $selectedOption.text(),
                selectedValue: $selectedOption.val(),
            };
        }

        renderDropdown() {
            const isDisabled = this.$select.is(':disabled')

            let buttonTemplate = '';

            if (this.icon) {
                buttonTemplate = `
                    <button type="button" class="dropdown__button icon-chevron" 
                        aria-expanded="false" 
                        aria-haspopup="true" 
                        ${isDisabled ? 'disabled' : ''}>
                        <span class="dropdown__button-icon ${this.icon}"></span>
                        <span class="dropdown__button-text">${this.defaultText}</span>
                    </button>
                `;
            } else if (this.title) {

                buttonTemplate = `
                    <button type="button" class="dropdown__button icon-chevron" 
                        aria-expanded="false" 
                        aria-haspopup="true" 
                        ${isDisabled ? 'disabled' : ''}>
                        <span class="dropdown__button-column">
                            <span class="dropdown__button-caption">${this.title}</span>
                            <span class="dropdown__button-text">${this.defaultText}</span>
                        </span>
                    </button>
                `;
            } else {
                buttonTemplate = `
                    <button type="button" class="dropdown__button icon-chevron" 
                        aria-expanded="false" 
                        aria-haspopup="true" 
                        ${isDisabled ? 'disabled' : ''}>
                        <span class="dropdown__button-text">${this.defaultText}</span>
                    </button>
                `;
            }

            this.$dropdown = $(`
                <div class="dropdown">
                    ${buttonTemplate}
                    <div class="dropdown__body" aria-hidden="true">
                        <ul class="dropdown__list" role="listbox"></ul>
                    </div>
                </div>
            `);

            const $list = this.$dropdown.find('.dropdown__list');
            this.$options.each((index, option) => {
                const $option = $(option);
                const value = $option.attr('value');
                const text = $option.text();
                const isSelected = $option.is(':selected');
                const isDisabled = $option.is(':disabled');

                $list.append(`
                    <li role="option"
                        data-value="${value}"
                        aria-checked="${isSelected}"
                        class="dropdown__list-item${isSelected ? ' selected' : ''}${isDisabled ? ' disabled' : ''}" 
                        ${isDisabled ? 'aria-disabled="true"' : ''}>
                        ${text}
                    </li>
                `);
            });

            this.$select.after(this.$dropdown);


        }

        setupEvents() {
            this.$dropdown.find('.dropdown__button').on('click', (event) => {
                event.stopPropagation();
                const isOpen = this.$dropdown.hasClass('visible');
                this.toggleDropdown(!isOpen);
            });

            this.$dropdown.find('.dropdown__list-item').on('click', (event) => {
                event.stopPropagation();
                const $item = $(event.currentTarget);

                if (!$item.hasClass('disabled')) {
                    this.selectOption($item);
                }
            });

            $(document).on('click', () => this.closeDropdown());
            $(document).on('keydown', (event) => {
                if (event.key === 'Escape') this.closeDropdown();
            });

            this.$select.closest('form').on('reset', () => this.restoreInitialState());

            const observerDisabled = new MutationObserver(() => {
                const isSelectDisabled = this.$select.is(':disabled');
                const $button = this.$dropdown.find('.dropdown__button');

                if (isSelectDisabled) {
                    $button.prop('disabled', true);
                } else {
                    $button.prop('disabled', false);
                }
            });

            observerDisabled.observe(this.$select[0], {
                attributes: true,
                attributeFilter: ['disabled']
            });

            const observerSelected = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'disabled') {
                        const $option = $(mutation.target);
                        const value = $option.attr('value');
                        const isDisabled = $option.is(':disabled');
                        const $item = this.$dropdown.find(`.dropdown__list-item[data-value="${value}"]`);

                        $item.toggleClass('disabled', isDisabled);
                        if (isDisabled) {
                            $item.attr('aria-disabled', 'true');
                        } else {
                            $item.removeAttr('aria-disabled');
                        }
                    }

                    if (mutation.type === 'attributes' && mutation.attributeName === 'selected') {
                        this.syncSelectedOption();
                    }
                });
            });

            observerSelected.observe(this.$select[0], {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['selected', 'disabled']
            });
        }

        toggleDropdown(isOpen) {
            if (isOpen && CustomSelect.openDropdown && CustomSelect.openDropdown !== this) {
                CustomSelect.openDropdown.closeDropdown();
            }

            const $body = this.$dropdown.find('.dropdown__body');
            const $list = this.$dropdown.find('.dropdown__list');
            const hasScroll = $list[0].scrollHeight > $list[0].clientHeight;

            this.$dropdown.toggleClass('visible', isOpen);
            this.$dropdown.find('.dropdown__button').attr('aria-expanded', isOpen);
            $body.attr('aria-hidden', !isOpen);

            if (isOpen) {
                CustomSelect.openDropdown = this;
                this.$dropdown.removeClass('dropdown-top');
                const dropdownRect = $body[0].getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                if (dropdownRect.bottom > viewportHeight) {
                    this.$dropdown.addClass('dropdown-top');
                }

                $list.toggleClass('has-scroll', hasScroll);
            } else {
                if (CustomSelect.openDropdown === this) {
                    CustomSelect.openDropdown = null;
                }
            }
        }

        closeDropdown() {
            this.toggleDropdown(false);
        }

        selectOption($item) {
            const value = $item.data('value');
            const text = $item.text();

            this.$dropdown.find('.dropdown__list-item').removeClass('selected').attr('aria-checked', 'false');
            $item.addClass('selected').attr('aria-checked', 'true');

            this.$dropdown.find('.dropdown__button-text').text(text);
            this.$select.val(value).trigger('change');
            this.closeDropdown();
        }

        restoreInitialState() {
            const state = this.initialState;
            this.$select.val(state.selectedValue).trigger('change');
            this.$dropdown.find('.dropdown__list-item').removeClass('selected').attr('aria-checked', 'false');
            this.$dropdown
                .find(`.dropdown__list-item[data-value="${state.selectedValue}"]`)
                .addClass('selected')
                .attr('aria-checked', 'true');
            this.$dropdown.find('.dropdown__button-text').text(state.selectedText);
        }

        syncSelectedOption() {
            const $selectedOption = this.$select.find('option:selected');
            const selectedValue = $selectedOption.val();
            const selectedText = $selectedOption.text();


            this.$dropdown.find('.dropdown__list-item').removeClass('selected').attr('aria-checked', 'false');
            this.$dropdown
                .find(`.dropdown__list-item[data-value="${selectedValue}"]`)
                .addClass('selected')
                .attr('aria-checked', 'true');
            this.$dropdown.find('.dropdown__button-text').text(selectedText);
        }
    }

    $('.select').each((index, element) => {
        new CustomSelect(element);
    });


    // international phone input
    if ($('.phone-input').length > 0) {
        $('.phone-input').each(function (idx, input) {

            let inputInt = intlTelInput(input, {
                utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js",
                initialCountry: "ru",
                separateDialCode: true,
            });

            let pattern = getPattern();


            input.addEventListener("countrychange", function () {
                pattern = getPattern();
                $(input).formatter().resetPattern(pattern);
            });

            $(input).formatter({
                'pattern': pattern
            });

            function getPattern() {
                let pattern;
                if (inputInt.j == 'ru') {
                    pattern = '({{999}}) {{999}}-{{99}}-{{99}}';
                } else {
                    pattern = '{{9999999999999999999999}}';
                }

                return pattern;
            }
        });
    }


})




