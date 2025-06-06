// Modal functionality will be added here later. 

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-img");
    const captionText = document.getElementById("caption");
    const galleryItems = document.querySelectorAll('.gallery-item');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');

    let currentGallery = [];
    let currentIndex = 0;

    function showModal(gallery, index) {
        currentGallery = Array.from(gallery.children);
        currentIndex = index;

        const item = currentGallery[currentIndex];
        const img = item.querySelector('img');
        const title = item.getAttribute('data-title');
        const description = item.getAttribute('data-description');
        
        modal.style.display = "block";
        modalImg.src = img.src;
        captionText.innerHTML = `<h4>${title}</h4><p>${description}</p>`;
    }

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const parentGallery = this.parentElement;
            const itemIndex = Array.from(parentGallery.children).indexOf(this);
            showModal(parentGallery, itemIndex);
        });
    });

    function changeImage(step) {
        currentIndex = (currentIndex + step + currentGallery.length) % currentGallery.length;
        const item = currentGallery[currentIndex];
        const img = item.querySelector('img');
        const title = item.getAttribute('data-title');
        const description = item.getAttribute('data-description');

        modalImg.src = img.src;
        captionText.innerHTML = `<h4>${title}</h4><p>${description}</p>`;
    }

    prevButton.addEventListener('click', () => changeImage(-1));
    nextButton.addEventListener('click', () => changeImage(1));

    const span = document.getElementsByClassName("close")[0];
    span.onclick = function() { 
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    
    document.addEventListener('keydown', function(event) {
        if (modal.style.display === "block") {
            if (event.key === "ArrowLeft") {
                changeImage(-1);
            } else if (event.key === "ArrowRight") {
                changeImage(1);
            } else if (event.key === "Escape") {
                modal.style.display = "none";
            }
        }
    });

    // Scroll to top button functionality
    const scrollTopBtn = document.getElementById("scrollTopBtn");

    if (scrollTopBtn) {
        window.onscroll = function() {
            if (window.scrollY > 100) {
                scrollTopBtn.style.display = "block";
            } else {
                scrollTopBtn.style.display = "none";
            }
        };

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({top: 0, behavior: 'smooth'});
        });
    }
}); 