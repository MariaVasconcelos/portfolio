const swiperProjects = new Swiper(".swiper-projects .swiper", {
    rewind: true,
    slidesPerView: 1,
    spaceBetween: 40,
    navigation: {
        nextEl: '.swiper-projects-next',
        prevEl: '.swiper-projects-prev',
    },
    autoplay: {
        delay: 3000,
        pauseOnMouseEnter: true,
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

// Formulário de contato (simulação: a mensagem não é enviada a lugar nenhum)
const contactForm = document.getElementById("contact-form");
const contactSuccess = document.getElementById("contact-success");
let contactSuccessTimer;

contactForm.addEventListener("submit", function(event) {

    event.preventDefault();

    contactForm.reset();
    contactSuccess.hidden = false;

    clearTimeout(contactSuccessTimer);
    contactSuccessTimer = setTimeout(function() {
        contactSuccess.hidden = true;
    }, 5000);

});


// Modal de mídia (áudio e vídeo dos projetos)
const mediaModal = document.getElementById("media-modal");
const mediaModalTitle = document.getElementById("media-modal-title");
const mediaModalBody = document.getElementById("media-modal-body");
const mediaModalClose = document.getElementById("media-modal-close");

function openMediaModal(item) {

    const type = item.dataset.mediaType;
    const src = item.dataset.mediaSrc;
    const cover = item.dataset.mediaCover;
    const title = item.dataset.mediaTitle;

    mediaModalTitle.textContent = title;
    mediaModalBody.innerHTML = "";
    mediaModal.classList.toggle("is-audio", type === "audio");
    mediaModal.classList.toggle("is-pdf", type === "pdf");

    if (type === "pdf") {
        const frame = document.createElement("iframe");
        frame.className = "media-modal-pdf";
        frame.src = src;
        frame.title = title;
        mediaModalBody.appendChild(frame);

        swiperProjects.autoplay.stop();
        mediaModal.showModal();
        return;
    }

    if (type === "audio") {
        const image = document.createElement("img");
        image.className = "media-modal-cover";
        image.src = cover;
        image.alt = "Capa: " + title;
        mediaModalBody.appendChild(image);
    }

    const player = document.createElement(type === "audio" ? "audio" : "video");
    player.src = src;
    player.controls = true;
    player.autoplay = true;
    player.preload = "metadata";
    if (type === "video") {
        player.poster = cover;
        player.playsInline = true;
    }
    mediaModalBody.appendChild(player);

    swiperProjects.autoplay.stop();
    mediaModal.showModal();

}

function closeMediaModal() {
    mediaModal.close();
}

document.querySelectorAll("[data-media-type]").forEach(function(item) {
    item.addEventListener("click", function() {
        openMediaModal(item);
    });
});

mediaModalClose.addEventListener("click", closeMediaModal);

// Fecha ao clicar fora do conteúdo (no fundo escuro)
mediaModal.addEventListener("click", function(event) {
    if (event.target === mediaModal) {
        closeMediaModal();
    }
});

// Ao fechar (botão, clique fora ou tecla Esc): para a mídia e libera o arquivo
mediaModal.addEventListener("close", function() {
    const player = mediaModalBody.querySelector("audio, video");
    if (player) {
        player.pause();
        player.removeAttribute("src");
        player.load();
    }
    mediaModalBody.innerHTML = "";
    swiperProjects.autoplay.start();
});
