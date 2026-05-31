const galleryItems =
document.querySelectorAll(".gallery-item");

const filterButtons =
document.querySelectorAll(".filter-btn");

const lightbox =
document.getElementById("lightbox");

const lightboxImage =
document.getElementById("lightbox-image");

const closeBtn =
document.querySelector(".close-btn");

const nextBtn =
document.querySelector(".next-btn");

const prevBtn =
document.querySelector(".prev-btn");

const imageNumber =
document.getElementById("image-number");

const imageCount =
document.getElementById("image-count");

/* VARIABLES */

let currentIndex = 0;

let visibleItems =
[...galleryItems];

/* OPEN LIGHTBOX */

galleryItems.forEach((item) => {

    item.addEventListener("click", () => {

        currentIndex =
        visibleItems.indexOf(item);

        showImage();

        lightbox.classList.add("show");

        document.body.style.overflow =
        "hidden";

    });

});

/* SHOW IMAGE */

function showImage(){

    const img =
    visibleItems[currentIndex]
    .querySelector("img");

    lightboxImage.src =
    img.src;

    imageNumber.textContent =
    `${currentIndex + 1} / ${visibleItems.length}`;

}

/* CLOSE */

function closeLightbox(){

    lightbox.classList.remove("show");

    document.body.style.overflow =
    "auto";

}

closeBtn.addEventListener(
    "click",
    closeLightbox
);

/* CLICK OUTSIDE */

lightbox.addEventListener(
    "click",
    (e) => {

        if(e.target === lightbox){

            closeLightbox();

        }

    }
);

/* NEXT */

function nextImage(){

    currentIndex++;

    if(currentIndex >= visibleItems.length){

        currentIndex = 0;

    }

    showImage();

}

/* PREVIOUS */

function prevImage(){

    currentIndex--;

    if(currentIndex < 0){

        currentIndex =
        visibleItems.length - 1;

    }

    showImage();

}

nextBtn.addEventListener(
    "click",
    nextImage
);

prevBtn.addEventListener(
    "click",
    prevImage
);

/* KEYBOARD SUPPORT */

document.addEventListener(
    "keydown",
    (e) => {

        if(
            lightbox.classList.contains(
                "show"
            )
        ){

            if(e.key === "ArrowRight"){
                nextImage();
            }

            if(e.key === "ArrowLeft"){
                prevImage();
            }

            if(e.key === "Escape"){
                closeLightbox();
            }

        }

    }
);

/* FILTERS */

filterButtons.forEach((button) => {

    button.addEventListener(
        "click",
        () => {

            filterButtons.forEach((btn) => {

                btn.classList.remove(
                    "active"
                );

            });

            button.classList.add(
                "active"
            );

            const filter =
            button.dataset.filter;

            visibleItems = [];

            galleryItems.forEach((item) => {

                if(
                    filter === "all" ||
                    item.classList.contains(filter)
                ){

                    item.style.display =
                    "block";

                    visibleItems.push(item);

                }

                else{

                    item.style.display =
                    "none";

                }

            });

            imageCount.textContent =
            visibleItems.length;

        }
    );

});

/* TOUCH SWIPE */

let touchStartX = 0;

let touchEndX = 0;

lightbox.addEventListener(
    "touchstart",
    (e) => {

        touchStartX =
        e.changedTouches[0].screenX;

    }
);

lightbox.addEventListener(
    "touchend",
    (e) => {

        touchEndX =
        e.changedTouches[0].screenX;

        handleSwipe();

    }
);

function handleSwipe(){

    if(touchEndX < touchStartX - 50){

        nextImage();

    }

    if(touchEndX > touchStartX + 50){

        prevImage();

    }

}