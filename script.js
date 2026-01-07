/* --- SLIDESHOW FUNCTIONS --- */
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
  // (Check if dots exist to prevent errors if you have fewer dots than slides)
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  
  // Show the current slide
  if (slides[slideIndex-1]) {
    slides[slideIndex-1].style.display = "flex";
  }
  
  // Highlight the corresponding dot (if it exists)
  if (dots[slideIndex-1]) {
    dots[slideIndex-1].className += " active";
  }
}

/* --- QUIZ FUNCTIONS --- */

// REMOVED the broken "function checkAnswers()" line here

let currentQuestionIndex = 0;
let score = 0;
let isQuestionAnswered = false; // Tracks if we are ready to move to next

function handleQuizAction() {
  const questions = document.querySelectorAll('.question-block');
  const actionBtn = document.getElementById('quiz-action-btn');
  const currentQ = questions[currentQuestionIndex];
  
  // 1. If we haven't answered yet, we are in "CHECK" mode
  if (!isQuestionAnswered) {
    // Find selected input in the current block
    const selectedOption = currentQ.querySelector('input:checked');
    const feedbackDiv = currentQ.querySelector('.feedback');
    const correctValue = currentQ.getAttribute('data-correct'); // Read truth from HTML

    if (!selectedOption) {
      alert("Please select an answer first!");
      return;
    }

    // Show feedback
    feedbackDiv.style.display = "block";
    
    // Check if the value matches the data-correct attribute
    if (selectedOption.value === correctValue) {
      feedbackDiv.innerHTML = "✅ Correct!";
      feedbackDiv.className = "feedback correct-text";
      score++;
    } else {
      feedbackDiv.innerHTML = "❌ Incorrect.";
      feedbackDiv.className = "feedback incorrect-text";
    }

    // Change Button to "Next" mode
    isQuestionAnswered = true;
    
    // Check if this was the last question
    if (currentQuestionIndex === questions.length - 1) {
      actionBtn.innerText = "See Results";
    } else {
      actionBtn.innerText = "Next Question";
    }
  } 
  
  // 2. If we HAVE answered, we are in "NEXT" mode
  else {
    // Hide current
    currentQ.classList.remove('active-question');
    
    // Increment index
    currentQuestionIndex++;

    // Check if quiz is over
    if (currentQuestionIndex >= questions.length) {
      showResults(questions.length);
      return;
    }

    // Show next question
    const nextQ = questions[currentQuestionIndex];
    nextQ.classList.add('active-question');
    
    // Update progress text
    document.getElementById('quiz-progress').innerText = 
      `Question ${currentQuestionIndex + 1} of ${questions.length}`;

    // Reset button for the new question
    actionBtn.innerText = "Check Answer";
    isQuestionAnswered = false;
  }
}

function showResults(total) {
  document.getElementById('quiz-action-btn').style.display = 'none'; // Hide button
  document.getElementById('quiz-end-screen').style.display = 'block'; // Show score
  
  const scoreText = document.getElementById('final-score-text');
  scoreText.innerHTML = `You scored <strong>${score} / ${total}</strong>`;
  
  if(score === total) {
    scoreText.innerHTML += " <br>🎉 Perfect score!";
  }
}
