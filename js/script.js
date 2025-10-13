// ---------------- CHANGE BACKGRUOUND HEADER ----------------
function scrollHeader(){
    const header = document.getElementById('header')
    // When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)


// VIDEO-SECTION
document.addEventListener('DOMContentLoaded', function() {
  const videoBtn = document.getElementById('videoBtn');
  const videoModal = document.getElementById('videoModal');
  const video = document.getElementById('fullscreenVideo');
  const closeBtn = document.querySelector('.close-btn');
  
  // Open modal with smooth transition
  videoBtn.addEventListener('click', function() {
    videoModal.style.display = 'block';
    void videoModal.offsetWidth;
    videoModal.classList.add('active');
    video.play().catch(e => console.log('Autoplay prevented:', e));
  });
  
  // Close modal with smooth transition
  function closeModal() {
    videoModal.classList.remove('active');
    setTimeout(() => {
      if (!videoModal.classList.contains('active')) {
        videoModal.style.display = 'none';
        video.pause();
      }
    }, 400);
  }
  
  closeBtn.addEventListener('click', closeModal);
  
  // Close when clicking on overlay (but not video)
  videoModal.addEventListener('click', function(e) {
    if (e.target.classList.contains('video-overlay')) {
      closeModal();
    }
  });
  
  // Close with ESC key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && videoModal.style.display === 'block') {
      closeModal();
    }
  });
});

// WHY-US-SECTION
document.addEventListener('DOMContentLoaded', function() {
            const ctaButton = document.querySelector('.cta-button');
            
            ctaButton.addEventListener('mouseenter', function() {
                this.style.boxShadow = '0 10px 15px -3px rgba(59, 130, 246, 0.4)';
            });
            
            ctaButton.addEventListener('mouseleave', function() {
                this.style.boxShadow = '0 4px 6px -1px rgba(59, 130, 246, 0.3)';
            });
            
            ctaButton.addEventListener('click', function() {
                // Replace with your actual action
                console.log('CTA button clicked');
                // window.location.href = '/discover';
            });
        });



// PARTNERS_SECTION
const slideTrack = document.getElementById("slideTrack");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const partnersSection = document.querySelector(".partners");

// Partner logos
const logos = [
  { src: "./images/partners/academy.webp", alt: "Academy", width: "72px" },
  { src: "./images/partners/amc.webp", alt: "AMC", width: "105px" },
  { src: "./images/partners/easy_financial.png", alt: "Demz", width: "105px" },
  { src: "./images/partners/nccrm.png", alt: "NCCRM", width: "80px" },
  { src: "./images/partners/mops.png", alt: "MOPS", width: "70px" },
  { src: "./images/partners/porek.webp", alt: "Porek", width: "92px" },
  { src: "./images/partners/gicta.png", alt: "GICTA", width: "100px" },
  { src: "./images/partners/modem.png", alt: "Modem Pay", width: "100px" },
  { src: "./images/partners/baldez-media.png", alt: "Baldez Media", width: "110px" },
  { src: "./images/partners/aneked.png", alt: "Aneked", width: "80px" },
  { src: "./images/partners/nccp.png", alt: "nccp", width: "70px" },
  { src: "./images/partners/fisheries.webp", alt: "Fisheries", width: "70px" },
  { src: "./images/partners/ab.png", alt: "ab_financial", width: "90px" },
  { src: "./images/partners/tendaba.webp", alt: "Tendaba", width: "100px" },
  { src: "./images/partners/ecomansa.webp", alt: "Ecomansa", width: "90px" },
  { src: "./images/partners/nana.webp", alt: "Nana", width: "90px" },
  { src: "./images/partners/demz.png", alt: "Demz", width: "80px" },
];

// Create slides dynamically
function createSlides() {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < 2; i++) {
    logos.forEach((logo) => {
      const slide = document.createElement("div");
      slide.className = "logo-slide";
      const widthAttr = logo.width ? `style="width:${logo.width}"` : "";
      slide.innerHTML = `<img src="${logo.src}" alt="${logo.alt}" ${widthAttr}>`;
      fragment.appendChild(slide);
    });
  }
  slideTrack.appendChild(fragment);
}

createSlides();

let pos = 0;
let isPaused = false;
let animationId;
let totalWidth = 0;
const speed = 0.4;

// Calculate total width dynamically after rendering
function updateTotalWidth() {
  const firstSet = Array.from(slideTrack.children).slice(0, logos.length);
  totalWidth = firstSet.reduce((sum, slide) => sum + slide.offsetWidth, 0);
}

setTimeout(updateTotalWidth, 300);

// Continuous auto-scroll
function animate() {
  if (!isPaused && totalWidth > 0) {
    pos -= speed;

    // Reset position when first set fully scrolls
    if (Math.abs(pos) >= totalWidth) {
      pos = 0;
    }

    slideTrack.style.transform = `translateX(${pos}px)`;
  }

  animationId = requestAnimationFrame(animate);
}

// Manual navigation
function navigate(direction) {
  isPaused = true;
  cancelAnimationFrame(animationId);

  pos += direction * 100; // Move manually
  slideTrack.style.transition = "transform 0.5s ease-out";
  slideTrack.style.transform = `translateX(${pos}px)`;

  // Resume after short delay
  setTimeout(() => {
    slideTrack.style.transition = "none";
    isPaused = false;
    animate();
  }, 1500);
}

nextBtn.addEventListener("click", (e) => {
  e.preventDefault();
  navigate(-1);
});

prevBtn.addEventListener("click", (e) => {
  e.preventDefault();
  navigate(1);
});

// Pause on hover
partnersSection.addEventListener("mouseenter", () => (isPaused = true));
partnersSection.addEventListener("mouseleave", () => (isPaused = false));

// Start animation
animate();


// TESTIMONIAL-SECTION
const slides = document.querySelector(".slider").children;
const indicatorImages = document.querySelector(".slider-indicator").children;

for(let i=0; i<indicatorImages.length; i++){
    indicatorImages[i].addEventListener("click", function(){
        // console.log(this.getAttribute("data-id"))
        for(let j=0; j<indicatorImages.length; j++){
            indicatorImages[j].classList.remove("active");
        }
        this.classList.add("active");
        const id=this.getAttribute("data-id");
        // remove class active from all slides
        for(let j=0; j<slides.length; j++){
            slides[j].classList.remove("active");
        }
        slides[id].classList.add("active");
    })
}       

// TEAM-SECTION
