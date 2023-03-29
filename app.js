const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
var contador = 0
let shuffledQuestions, currentQuestionIndex

function meuMenuToggle() {
  var x = document.getElementById("divAll");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
    
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')

  } else {
    startButton.innerText = 'Finish'
    startButton.classList.remove('hide')
    //document.location.reload(true)
    if(startButton.innerText === 'Finish'){
      function resultados() {
        document.getElementById("question-container").style.display = "none"
        document.getElementById("resultados").style.display = "block"
        document.getElementById("span").innerHTML = "" + contador + "";
        
        setTimeout(function(){
          window.location.reload();
        }, 10000);
      }
    }
    
    document.getElementById("start-btn").onclick = function() {
      var idOriginal = this.id;
      this.id = "start-btn";
      idOriginal == "start-btn" ? resultados() : '';
    };
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')

    if(element.classList.value == 'correct'){
      contador+=1
    }
    
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Ciências puras também pode ser chamada de: ',
    answers: [
      { text: 'Ciências fundamentais', correct: true },
      { text: '22', correct: false },
      { text: 'Um no', correct: false },
      { text: 'IDK', correct: false }
    ]
  },
  {
    question: 'As ciências puras... ',
    answers: [
      { text: 'Web Dev Simplified', correct: false },
      { text: 'Traversy Media', correct: false },
      { text: 'Dev Ed', correct: false },
      { text: 'estudam os conceitos básicos do conhecimento sem preocupação com sua imediata aplicação', correct: true }
    ]
  },
  {
    question: 'As ciências puras podem ser ser: ',
    answers: [
      { text: 'Kinda', correct: false },
      { text: 'Empíricas e formais.', correct: true },
      { text: 'Um no', correct: false },
      { text: 'IDK', correct: false }
    ]
  },
  {
    question: 'What is 4 * 2?',
    answers: [
      { text: '6', correct: false },
      { text: '8', correct: true },
      { text: 'Um no', correct: false },
      { text: 'IDK', correct: false }
    ]
  }
]


