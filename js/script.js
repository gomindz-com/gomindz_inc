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
