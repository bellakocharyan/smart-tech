
//@@include(`_swiper-bundle.min.js`);

function testWebP(callback) {

    var webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {

    if (support == true) {
        document.querySelector('body').classList.add('webp');
    } else {
        document.querySelector('body').classList.add('no-webp');
    }
});

//header
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__list');

function menuToggle() {
    iconMenu.classList.toggle('active-menu');
    menuBody.classList.toggle('active-menu');
    document.body.classList.toggle('lock');
}
iconMenu.addEventListener("click", menuToggle);


//scroll

const smoothScroll = function (targetEl, duration) {
    const headerElHeight = document.querySelector('.header').clientHeight;
    const target = document.querySelector(targetEl);
    let targetPosition = target.getBoundingClientRect().top - headerElHeight;
    let startPosition = window.pageYOffset;
    let startTime = null;

    const ease = function (t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    };

    const animation = function (currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, targetPosition, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    };
    requestAnimationFrame(animation);
};

const scrollTo = function () {
    const links = document.querySelectorAll('.menu__link');
    const heroLink = document.querySelector('.hero__link');
    links.forEach(each => {
        each.addEventListener('click', function () {
            const currentTarget = this.getAttribute('href');
            menuToggle();
            smoothScroll(currentTarget, 1000);
        });
    });
    heroLink.addEventListener(`click`, function () {
        smoothScroll(this.getAttribute('href'), 1000);
    })
};
scrollTo();

//accardion
const accItem = document.querySelectorAll(`.acc-item__title`);
for (let i = 0; i < accItem.length; i++) {
    accItem[i].onclick = function (e) {
        e.preventDefault();
        const active = document.querySelector('.active');
        if (active) {
            active.classList.remove('active');
            active.nextElementSibling.classList.remove('active');
        }
        e.currentTarget.classList.add('active');
        e.currentTarget.nextElementSibling.classList.add('active');
    }
}

//filter category
const category = document.querySelector(`.projects__list`).children;
const items = document.querySelector(`.projects__items`).children;
const loadMore = document.querySelector(`.projects__load-more`);

for (let i = 0; i < category.length; i++) {
    category[i].onclick = function () {
        // e.preventDefault();
        for (let j = 0; j < category.length; j++) {
            category[j].classList.remove(`active`)
        }
        this.classList.add('active');
        let target = this.getAttribute(`data-filter`);
        for (let k = 0; k < items.length; k++) {
            setTimeout(() => {
                items[k].style.display = `none`;
            }, 300);
            if (items[k].getAttribute(`data-filter`) === target) {
                setTimeout(() => {
                    items[k].style.display = `block`
                }, 300);
            }
            if (target === `all`) {
                setTimeout(() => {
                    items[k].style.display = `block`
                }, 300);
            }
        }
    }
}

//carusel
const slider = document.querySelector(`.swiper-container`);
let mySwiper = new Swiper(slider, {

    slidesPerView: 1,
    spaceBetween: 30,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
    },
    autoplay: {
        delay: 3000,
    },
    loop: true,
    breakpoints: {
        // when window width is >= 320px
        450: {
            slidesPerView: 2.2,
            spaceBetween: 15

        },
        1025: {
            slidesPerView: 3,
            spaceBetween: 20
        }

    }
})


//sub validation
document.forms[`menuForm`].onsubmit = function () {
    if (document.forms[`menuForm`][`email`].value === "") {
        alert("Email must be filled out");
        return false;
    }
}
document.forms[`footerForm`].onsubmit = function () {
    if (document.forms[`footerForm`][`email`].value === "") {
        alert("Email must be filled out");
        return false;
    }
}
