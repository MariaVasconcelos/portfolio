const swiperProjects = new Swiper(".swiper-projects .swiper", {
    loop:true,
    slidesPerView: 1,
    spaceBetween: 40,
    navigation: {
        nextEl: '.swiper-projects-next',
        prevEl: '.swiper-projects-prev',
    },
    autoplay: {
        delay: 2000,
    },
    breakpoints: {
        992: {
            slidesPerView: 3
        },
        572: {
            slidesPerView: 2
        }

    }
});

const buttonMenu = document.getElementById("menu-open");
const menu = document.getElementById("header-mobile");
const closeButtonMenu = document.getElementById("closeMenu");

buttonMenu.addEventListener("click", function() {
    
    // Acessibilidade
    menu.setAttribute("aria-hidden", "false");
    buttonMenu.setAttribute("aria-expanded", "true");
    closeButtonMenu.setAttribute("aria-expanded", "true");

    menu.classList.add("active");

});

closeButtonMenu.addEventListener("click", function() {

    // Acessibilidade
    menu.setAttribute("aria-hidden", "true");
    buttonMenu.setAttribute("aria-expanded", "false");
    closeButtonMenu.setAttribute("aria-expanded", "false");
    
    menu.classList.remove("active");

});