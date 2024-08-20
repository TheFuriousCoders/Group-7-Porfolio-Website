let menu = document.querySelector('#menu-icon');
let navlist = document.querySelectorAll('.navlist');

menu.onclick= () => {
  menu.classList.toggle('bx-x');
  navlist.classList.toggle('open');
}

const sr = ScrollReveal({
  distance: '65px',
  duration: 2600,
  delay:450,
  reset: true
});

sr.reveal('.hero-text',{delay:200,origin:'top'});
sr.reveal('.hero-img',{delay:450,origin:'top'});
sr.reveal('.icons',{delay:200,origin:'top'});

function submitQuiz() {
  var totalQuestions = 5;
  var score = 0;

  var answers = {
      q1: "a",
      q2: "c",
      q3: "b",
      q4: "d",
      q5: "b"
  };

  for (var i = 1; i <= totalQuestions; i++) {
      var q = document.querySelector('input[name="q' + i + '"]:checked');
      if (q && q.value === answers['q' + i]) {
          score++;
      }
  }

  var result = document.getElementById('result');
  result.innerHTML = "You scored " + score + " out of " + totalQuestions;
}