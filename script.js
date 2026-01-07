let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  
  // If we go past the last slide, wrap to the first
  if (n > slides.length) {slideIndex = 1}
  
  // If we go before the first slide, wrap to the last
  if (n < 1) {slideIndex = slides.length}
  
  // Hide all slides initially
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  
  // Remove "active" class from all dots
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  
  // Show the current slide and highlight the corresponding dot
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}
