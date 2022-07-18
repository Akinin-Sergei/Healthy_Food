/* PRELOADER */
$(function preloader() {
    $(() => {

        setInterval(() => {

            let preloader = $('.preloader');

            preloader.css('opacity', 0);

            setInterval(
                () => preloader.remove(),
                parseInt(preloader.css('animation-duration', 20000))
            );

        }, 1000);
    });
});

setInterval(() => preloader(), 20000);



/* Smooth scroll */
$(function smoothscroll() {

    $("[data-scroll]").on("click", function (event) {
        event.preventDefault();

        var $this = $(this),
            blockId = $this.data('scroll'),
            blockOffset = $(blockId).offset().top;

        $("html, body").animate({
            scrollTop: blockOffset
        }, 1000);
    });

});


/* BURGER-MENU */
function burgerMenu(selector) {
    let menu = $(selector);
    let button = menu.find('.burger-menu__button');
    let links = menu.find('.burger-menu__link');
    let overlay = menu.find('.burger-menu__overlay');

    button.on('click', (e) => {
        e.preventDefault();
        toggleMenu();
    });

    links.on('click', () => toggleMenu());
    overlay.on('click', () => toggleMenu());

    function toggleMenu() {
        menu.toggleClass('burger-menu_active');

        if (menu.hasClass('burger-menu_active')) {
            $('body').css('overflow', 'hidden');
        } else {
            $('body').css('overflow', 'visible');
        }
    }
}

burgerMenu('.burger-menu');



/* Slider__main */
$(function slidermain() {

    $('.main-slider').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        prevArrow: '<button class="main_slider-btn main_slider-btnprev"><img src="img/arrow-left.png" alt="arrow_left"></button>',
        nextArrow: '<button class="main_slider-btn main_slider-btnnext"><img src="img/arrow-right.png" alt="arrow_right"></button>',
        responsive: [
            {
                breakpoint: 601,
                settings: {
                    arrows: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    });

});



/* SCROLL TO TOP */
$(function scrollToTop() {

    let button = $('.back-to-top');

    $(window).on('scroll', () => {
        if ($(this).scrollTop() >= 700) {
            button.fadeIn();
        } else {
            button.fadeOut();
        }
    });

    button.on('click', (e) => {
        e.preventDefault();
        $('html').animate({ scrollTop: 0 }, 1000);
    });

});

$('.ration-day').on('click', function (e) {
    e.preventDefoult;

    $($(this).siblings()).removeClass('ration-day-acteve');
    $(this).toggleClass('ration-day-acteve');
});



/*my Lib*/
(function () {
    window.myLib = {};

    window.myLib.body = document.querySelector('body');

    window.myLib.closestAttr = function (item, attr) {
        var node = item;

        while (node) {
            var attrValue = node.getAttribute(attr);
            if (attrValue) {
                return attrValue;
            }

            node = node.parentElement;
        }

        return null;
    };

    window.myLib.closestItemByClass = function (item, className) {
        var node = item;

        while (node) {
            if (node.classList.contains(className)) {
                return node;
            }

            node = node.parentElement;
        }

        return null;
    };

    window.myLib.toggleScroll = function () {
        myLib.body.classList.toggle('no-scroll');
    };
})();




/*cataloge-filter*/
(function () {
    var catalogSection = document.querySelector('.food__ration');

    if (catalogSection === null) {
        return;
    }

    var removeChildren = function (item) {
        while (item.firstChild) {
            item.removeChild(item.firstChild);
        }
    };

    var updateChildren = function (item, children) {
        removeChildren(item);
        for (var i = 0; i < children.length; i += 1) {
            item.appendChild(children[i]);
        }
    };

    var catalog = catalogSection.querySelector('.catalog');
    var catalogNav = catalogSection.querySelector('.catalog_nav');
    var catalogItems = catalogSection.querySelectorAll('.catalog-item');

    catalogNav.addEventListener('click', function (e) {
        var target = e.target;
        var item = myLib.closestItemByClass(target, 'catalog_nav-btn');

        if (item === null || item.classList.contains('is-acteve')) {
            return;
        }

        e.preventDefault();
        var filterValue = item.getAttribute('data-filter');
        var previousBtnActive = catalogNav.querySelector('.catalog_nav-btn.is-acteve');

        previousBtnActive.classList.remove('is-acteve');
        item.classList.add('is-acteve');

        if (filterValue === 'all') {
            updateChildren(catalog, catalogItems);
            return;
        }

        var filteredItems = [];
        for (var i = 0; i < catalogItems.length; i += 1) {
            var current = catalogItems[i];
            if (current.getAttribute('data-category') === filterValue) {
                filteredItems.push(current);
            }
        }

        updateChildren(catalog, filteredItems);
    });
})();



/*POPUP*/
function modal(selectorButton, selectorContent) {
    let body = $('body');
    let content = $(selectorContent);
    let button = $(selectorButton);

    body.prepend(
        '<div class="modal" data-modal="'
        + selectorButton
        + '">'
        + '<div class="modal__content">'
        + '</div>'
        + '</div>'
    );

    let modal = $(
        '.modal[data-modal="'
        + selectorButton
        + '"]'
    );

    let close = $('.modal__close');


    modal
        .find('.modal__content')
        .append(content);

    button.on('click', function (e) {
        e.preventDefault();
        modal.addClass('modal-active');
        body
            .children('*:not(script, .modal)')
            .addClass('modal-blur');
        $("html,body").css("overflow", "hidden");
    });


    close.on('click', function (e) {
        e.preventDefault();
        modal.removeClass('modal-active');
        $('.modal-blur').removeClass('modal-blur');
        $("html,body").css("overflow", "auto");
    });
}

modal('#button-1', '#content-1');
modal('#button-2', '#content-2');
modal('#button-3', '#content-3');
modal('#button-4', '#content-4');
modal('#button-5', '#content-5');
modal('#button-6', '#content-6');
modal('#button-7', '#content-7');
modal('#button-8', '#content-8');
modal('#button-9', '#content-9');



/*TABS*/
function tabs(selector) {
    var tabs = $(selector);
    var span = tabs.children('span');
    var div = tabs.children('div');


    tabs
        .addClass('tabs')
        .prepend('<div class="tabs__controls"></div>')
        .append('<div class="tabs__panels"></div>')
        .on('click', '.tabs__control', function (e) {
            e.preventDefault();
            tabs
                .find('.tabs__control-active')
                .removeClass('tabs__control-active');
            tabs
                .find('.tabs__panel-active')
                .removeClass('tabs__panel-active');
            $(this).addClass('tabs__control-active');
            tabs
                .find('.tabs__panel')
                .eq($(this).index())
                .addClass('tabs__panel-active');
        });

    span
        .prependTo(selector + ' .tabs__controls')
        .each(function (i) {

            var span = $(this);

            if (!i) {
                span
                    .replaceWith(
                        '<a class="tabs__control tabs__control-active" href="#">'
                        + span.text()
                        + '</a>'
                    );
            } else {
                span
                    .replaceWith(
                        '<a class="tabs__control" href="#">'
                        + span.text()
                        + '</a>'
                    );
            }

        });

    div
        .prependTo(selector + ' .tabs__panels')
        .addClass('tabs__panel')
        .eq(0)
        .addClass('tabs__panel-active');

}

tabs('#tab-1');
tabs('#tab-2');
tabs('#tab-3');
tabs('#tab-4');
tabs('#tab-5');
tabs('#tab-6');
tabs('#tab-7');
tabs('#tab-8');
tabs('#tab-9');



/*MAP*/
$(function () {
    if (typeof ymaps === 'undefined') {
        return;
    }

    ymaps.ready(function () {
        var myMap = new ymaps.Map('ymap', {
            center: [55.747566, 37.602292],
            zoom: 15
        }, {
            searchControlProvider: 'yandex#search'
        }),

            myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
                balloonContent: 'Мы находимся здесь!'
            }, {
                // Опции.
                // Необходимо указать данный тип макета.
                iconLayout: 'default#image',
                // Своё изображение иконки метки.
                iconImageHref: '',
                // Размеры метки.
                iconImageSize: [36, 51],
                // Смещение левого верхнего угла иконки относительно
                // её "ножки" (точки привязки).
                iconImageOffset: [-5, -38]
            });

        myMap.geoObjects.add(myPlacemark)

        myMap.behaviors.disable('scrollZoom');/*что бы убрать скролл при наведении на карту*/

    });
});



/* Slider__reviews */
$(function slidermain() {

    $('.reviews_slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<button class="review_slider-btn review_slider-btnprev"><img src="img/arrow-left.png" alt="arrow_left"></button>',
        nextArrow: '<button class="review_slider-btn review_slider-btnnext"><img src="img/arrow-right.png" alt="arrow_right"></button>'
    });

});



/* Появление элементов при скролле страницы */

//Добавить class="_anim-items" в HTML документе к элементам которые будут анимироваться
//Добавить в CSS файле к анимированному элементу .classel._active{}
//Добавить class="_anim-no-hide" в HTML документе к элементам у которых есть class="_anim-items", что бы они анимировались один раз
const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll);
    function animOnScroll() {
        for (let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 4;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;

            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }

            if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                animItem.classList.add('_active');
            } else {
                if (!animItem.classList.contains('_anim-no-hide')) {
                    animItem.classList.remove('_active');
                }
            }
        }
    }
    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }

    setTimeout(() => {
        animOnScroll();
    }, 100);

}



/* Параллакс эффект */
function parallax(event) {
    this.querySelectorAll('.layer').forEach(layer => {
        let speed = layer.getAttribute('data-speed');
        layer.style.transform = `translate(${event.clientX * speed / 1000}px,${event.clientY * speed / 1000}px)`
    });
}

document.addEventListener('mousemove', parallax);