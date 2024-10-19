window.addEventListener("load", function () {
    const fill = document.querySelector(".preloader-fill");

    // Wait for the progress bar to complete
    fill.addEventListener('animationend', () => {
        // Hide the progress bar immediately after it fills
        document.querySelector(".preloader-indicator").style.display = "none";

        // Opening animation for the top and bottom parts of the preloader
        document.querySelector(".preloader-top").style.transform = "translateY(-100%)";
        document.querySelector(".preloader-bottom").style.transform = "translateY(100%)";

        // Hide the preloader after the animation
        setTimeout(() => {
            document.querySelector(".preloader").style.display = "none";
        }, 1000); // Delay to match the duration of the split screen animation
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.getElementById("menu-icon");
    const menuContainer = document.getElementById("menu-container");
    const indicator = document.querySelector('.indicator');
    const indicatorWrapper = document.querySelector('.indicator-wrapper');


    menuIcon.addEventListener("click", function () {
        if (menuContainer.classList.contains("open")) {
            menuContainer.classList.remove("open");
            menuIcon.innerHTML = "menu"; // Hamburger icon
        } else {
            menuContainer.classList.add("open");
            menuIcon.innerHTML = "close"; // Close icon
        }
    });

    const dropdownBtn = document.getElementById("dropdown-button");
    const dropdownList = document.getElementById("dropdown-list");
    const dropdownArrow = document.getElementById("dropdown-arrow");

    dropdownBtn.addEventListener("click", function () {
        if (dropdownList.classList.contains("open")) {
            dropdownList.classList.remove("open");
            dropdownArrow.innerHTML = "stat_minus_1"; // arrow down
        } else {
            dropdownList.classList.add("open");
            dropdownArrow.innerHTML = "stat_1"; // arrow up
        }
    });

    const navContainer = document.querySelector('.top-nav-container');
    const navBrand = document.querySelector('.brand');
    const navBtnToggle = document.querySelector('.nav-button-toggle');
    const navMiddle = document.querySelector('.mid-nav');
    const navMenuLinks = document.querySelector('.nav-menu-links');

    window.addEventListener('scroll', () => {

        // top-nav-background-appear
        let scrollTop = window.scrollY;

        if (scrollTop < 400) {
            navContainer.style.height = `${scrollTop / 5}px`;
            navMenuLinks.style.opacity = scrollTop / 400;
            navBrand.style.color = `rgb(${255 - (scrollTop / 400) * 105}, ${255 - (scrollTop / 400) * 105}, ${255 - (scrollTop / 400) * 105})`; // from white to gray
            navBtnToggle.style.color = `rgb(${255 - (scrollTop / 400) * 105}, ${255 - (scrollTop / 400) * 105}, ${255 - (scrollTop / 400) * 105})`; // from white to gray
        } else if (scrollTop >= 400 && scrollTop < 800) {
            navContainer.style.height = `${40 + (scrollTop - 400) / 5}px`;
            navMenuLinks.style.opacity = 1;
            navBrand.style.color = `rgb(${150 - ((scrollTop - 400) / 400) * 142}, ${150 - ((scrollTop - 400) / 400) * 122}, ${150 - ((scrollTop - 400) / 400) * 92})`; // from gray to black
            navBtnToggle.style.color = `rgb(${150 - ((scrollTop - 400) / 400) * 142}, ${150 - ((scrollTop - 400) / 200) * 122}, ${150 - ((scrollTop - 400) / 400) * 92})`; // from gray to black
        } else {
            navContainer.style.height = '80px';
            navMenuLinks.style.opacity = 1;
            navBrand.style.color = 'rgb(8, 28, 58)'; //black
            navBtnToggle.style.color = 'rgb(8, 28, 58)'; //black
        }

        if (scrollTop >= 400) {
            navMiddle.style.height = '80px';
        } else {
            navMiddle.style.height = '0';
        }


        //left-side-indicator-scroll
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

        // indicator-wrapper's height
        const wrapperHeight = indicatorWrapper.clientHeight - indicator.clientHeight;

        const scrollPercentage = scrollTop / docHeight;

        // indicator's position
        const indicatorPosition = scrollPercentage * wrapperHeight;
        indicator.style.top = `${indicatorPosition}px`;

    });

    // desinations section swiper
    const swiper = new Swiper('.destinations-slide .swiper', {
        speed: 900,
        loop: true,
        slidesPerView: 3,
        spaceBetween: 80,
        allowTouchMove: true,
        centeredSlides: true,

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

    });

    // when mouse move on the swiper images
    const swiperSlides = document.querySelectorAll('.destinations-slide .swiper-slide');

    swiperSlides.forEach(slide => {
        const layer = slide.querySelector('.gradient-overlay');
        const slideImg = slide.querySelector('img');

        layer.addEventListener('mousemove', (e) => {
            const rect = layer.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const moveX = (centerX - mouseX) / 50;
            const moveY = (centerY - mouseY) / 50;

            slideImg.style.transform = `scale(1.1) translate(${moveX}px, ${moveY}px)`;
        });

        layer.addEventListener('mouseout', function () {
            slideImg.style.transform = 'scale(1)';
        });
    });

    //testimonial slide
    const testArr = [
        {
            img: 'https://1233198063.github.io/Connect-with-a-animal-companion//images/wireframe1.png',
            client: 'WireFrame1'
        },
        {
            img: 'https://1233198063.github.io/Connect-with-a-animal-companion//images/wireframe2.png',
            client: 'WireFrame2'
        },
        {
            img: 'https://1233198063.github.io/Connect-with-a-animal-companion//images/wireframe3.png',
            client: 'WireFrame3'
        },
        {
            img: 'https://1233198063.github.io/Connect-with-a-animal-companion//images/wireframe4.png',
            client: 'WireFrame4'
        },
        {
            img: 'https://1233198063.github.io/Connect-with-a-animal-companion//images/wireframe5.png',
            client: 'WireFrame5'
        }
    ];

    //test for testimonial
    const testNext = document.querySelector('.slide-button-next');
    const testPrev = document.querySelector('.slide-button-prev');
    const testImg = document.querySelector('.testimonial-slide .body-display');
    const testClient = document.querySelector('.testimonial-slide .testimonial-client');
    const scrollbarFill = document.querySelector('.scrollbar-fill');

    let testIndex = 0;

    function updateTest(index) {

        testImg.style.opacity = 0;
        testImg.style.transform = 'translateY(20px) scale(0.6)';

        testClient.style.opacity = 0;
        testClient.style.transform = 'translateY(20px) scale(0.8)';

        // Wait for the fade out and transform transition
        setTimeout(() => {
            testImg.style.backgroundImage =  `url('${testArr[index].img}')`;
            testClient.textContent = testArr[index].client;
            testImg.style.opacity = 1;
            testImg.style.transform = 'translateY(0px) scale(1)';

            testClient.style.opacity = 1;
            testClient.style.transform = 'translateY(0px) scale(1)';
        }, 800);
    }

    function updateScrollbar() {
        scrollbarFill.style.top = `${topPercentage}%`;
    }

    updateTest(testIndex);  // Initialize the content

    let topPercentage = 0;
    testNext.addEventListener('click', () => {
        testIndex++;
        if (testIndex > testArr.length - 1) {
            testIndex = 0;
            topPercentage = 0;
        } else {
            topPercentage += 20;
        }
        updateTest(testIndex);
        updateScrollbar();
    });

    testPrev.addEventListener('click', () => {
        testIndex--;
        if (testIndex < 0) {
            testIndex = testArr.length - 1;
            topPercentage = 80;
        } else {
            topPercentage -= 20;
        }
        updateTest(testIndex);
        updateScrollbar();
    });

    // promise section
    window.addEventListener('scroll', function () {
        const promiseSection = document.querySelector('.promise-section');
        const promiseBackground = document.querySelector('.promise-section .background');
        const promiseRect = promiseSection.getBoundingClientRect();

        if (promiseRect.top <= this.window.innerHeight && promiseRect.bottom >= 0) {
            const scrollProgress = (window.innerHeight - promiseRect.top) / (window.innerHeight + promiseRect.height);
            const translateY = (scrollProgress - 0.5) * 30;

            promiseBackground.style.transform = `translateY(${translateY}%))`
            promiseBackground.style.backgroundPositionY = `${50 + translateY}%`
        }
    })

    // about section family pictures

    // background images
    const familyArr = [
        'url(./images/Family001.jpeg)',
        'url(./images/Family002.jpeg)',
        'url(./images/Family003.jpeg)',
        'url(./images/Family004.jpeg)',
        'url(./images/Family005.jpeg)',
        'url(./images/Family006.jpeg)',
    ];

    const familyImages = document.querySelectorAll('.about-img-wrapper .family-img');
    const swiperBg = document.querySelector('.swiper-bg');
    const closeBtn = document.querySelector('.close-button');

    familyImages.forEach((div, index) => {
        if (familyArr[index]) {
            div.style.backgroundImage = familyArr[index];
        }
        div.parentElement.addEventListener('click', function (e) {
            e.preventDefault();
            swiperBg.style.display = 'flex';
            swiper2.slideToLoop(index, 0);  // slide to the related iamge

            document.body.style.overflow = 'hidden'; // no scroll
        });
    });

    const aboutImgWrapper = document.querySelector('.about-img-wrapper')
    const lastImgLink = document.querySelector('.about-img-wrapper .about-imgs-item:last-child')

    // console.log(lastImgLink.offsetLeft);
    // 1771

    // console.log(window.innerWidth);
    // 1042

    // aboutImgWrapper.addEventListener('mousemove', function (e) {
    //     console.log(e.clientX);
    //     if (e.clientX <= window.innerWidth / 2) {
    //         aboutImgWrapper.style.marginLeft = '-100px'
    //     } else {
    //         aboutImgWrapper.style.marginLeft = '-819px'
    //     }
    // })

    // var swiper1 = new Swiper(".mySwiper1", {
    //     loop: false,
    //     spaceBetween: 10,
    //     slidesPerView: 5,
    //     freeMode: true,
    //     watchSlidesProgress: true,
    // });

    // var swiper2 = new Swiper(".mySwiper2", {
    //     loop: false,
    //     spaceBetween: 10,
    //     navigation: {
    //         nextEl: ".swiper-button-next",
    //         prevEl: ".swiper-button-prev",
    //     },
    //     thumbs: {
    //         swiper: swiper1,
    //     },
    // });

    // Close the swiper on click outside
    // closeBtn.addEventListener('click', function () {
    //     swiperBg.style.display = 'none';
    //     document.body.style.overflow = ''; // can scroll
    // });


    // agents section
    // const teamArr = [
    //     'url(./images/607dd2aa459b2b6f7fc0100d_Portrait011.jpeg)',
    //     'url(./images/607dd2c8b05ec3b67689516f_Portrait019.jpeg)',
    //     'url(./images/607dd2e5e99d455515f2034c_Portrait015.jpeg)',
    //     'url(./images/607dd2fe2fd765fe6078acca_Portrait016.jpeg)',
    // ];

    // const teamImg = document.querySelectorAll('.team-member .team-img');

    // teamImg.forEach((div, index) => {
    //     if (teamArr[index]) {
    //         div.style.backgroundImage = teamArr[index];
    //     }
    // });

    // posts section
    const postArr = [
        // 'url(./images/607dcc96ac469709cab4439e_post003.jpeg)',
        // 'url(./images/607dcc84b5be0d0f5f378014_post002.jpeg)',
        // 'url(./images/607dccc6e99d455d30eb59a4_post006.jpeg)',
        // 'url(./images/607dcd0c2a32b5e7275ff68b_post009.jpeg)',
    ];

    const postImg = document.querySelectorAll('.journal-list-image .post-img');

    postImg.forEach((div, index) => {
        if (postArr[index]) {
            div.style.backgroundImage = postArr[index];
        }
    });

});

