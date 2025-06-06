// Modal functionality will be added here later. 

document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const hamburger = document.querySelector('.hamburger');
    const navUl = document.querySelector('nav ul');

    // Show header on hover
    document.addEventListener('mousemove', function(e) {
        if (e.clientY < 60) {
            header.classList.add('visible');
        }
    });

    // Keep header visible if the nav is open
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navUl.classList.toggle('active');
            header.classList.add('visible');
        });
    }

    // Hide header when scrolling down, show when scrolling up or at top
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop === 0) {
            header.classList.add('visible');
        } else if (scrollTop > lastScrollTop) {
            if (!navUl.classList.contains('active')) {
                header.classList.remove('visible');
            }
        } else {
            header.classList.add('visible');
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    // Initially show header if at top of page
    if (window.pageYOffset === 0) {
        header.classList.add('visible');
    }

    // JS-based Lazy Loading
    const lazyImages = document.querySelectorAll('.lazy');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        lazyImages.forEach(img => {
            observer.observe(img);
        });
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
        });
    }

    const modal = document.getElementById("modal");

    // Only run modal logic if the modal element exists on the page
    if (modal) {
        const modalImg = document.getElementById("modal-img");
        const captionText = document.getElementById("caption");
        const galleryItems = document.querySelectorAll('.gallery-item');
        const prevButton = document.querySelector('.prev');
        const nextButton = document.querySelector('.next');
        const span = document.getElementsByClassName("close")[0];

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
    }

    // Scroll to top button functionality
    const scrollTopBtn = document.getElementById("scrollTopBtn");

    if (scrollTopBtn) {
        window.onscroll = function() {
            if (window.scrollY > 200) {
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