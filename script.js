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
// QUIZ FUNCTIONS

function checkAnswers() {
  // 1. Define the correct answers here
  // Format: 'questionID': 'correctValue'
  const answers = {
    q1: "false", // Example: Auto-save is usually in Preferences > General, not Auto-Save tab
    q2: "true"
  };

  let score = 0;
  let totalQuestions = Object.keys(answers).length;

  // 2. Loop through each question to check answers
  for (let question in answers) {
    const selectedOption = document.querySelector(`input[name="${question}"]:checked`);
    const feedbackDiv = document.getElementById(`feedback-${question}`);
    
    // Reset display
    feedbackDiv.style.display = "block";
    feedbackDiv.className = "feedback"; // clear previous color classes

    if (selectedOption) {
      if (selectedOption.value === answers[question]) {
        // Correct Answer
        score++;
        feedbackDiv.innerHTML = "✅ Correct!";
        feedbackDiv.classList.add("correct-text");
      } else {
        // Incorrect Answer
        feedbackDiv.innerHTML = "❌ Incorrect. Please review the lesson.";
        feedbackDiv.classList.add("incorrect-text");
      }
    } else {
      // No answer selected
      feedbackDiv.innerHTML = "⚠️ Please select an answer.";
      feedbackDiv.style.color = "orange";
    }
  }

  // 3. Display Final Score
  const resultDiv = document.getElementById("quiz-result");
  resultDiv.innerHTML = `You scored ${score} out of ${totalQuestions}`;
  
  if (score === totalQuestions) {
    resultDiv.innerHTML += " — Great job! 🎉";
    resultDiv.style.color = "var(--accent)";
  } else {
    resultDiv.style.color = "var(--text)";
  }
}
