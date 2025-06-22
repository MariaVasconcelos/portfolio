const swiperProjects = new Swiper(".swiper-projects .swiper", {
    loop:true,
    slidesPerView: 3,
    spaceBetween: 40,
    navigation: {
        nextEl: '.swiper-projects-next',
        prevEl: '.swiper-projects-prev',
    },
    autoplay: {
        delay: 2000,
    }
});