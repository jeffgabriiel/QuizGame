const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
var contador = 0
let shuffledQuestions, currentQuestionIndex

let somAcerto = document.querySelector('#somAcerto')
let somErro = document.querySelector('#somErro')

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
        
        document.querySelector('#aplausos').play()

        //setTimeout(function(){
          //window.location.reload();
        //}, 20000);
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
      somAcerto.play()
    }
    
  } else {
    element.classList.add('wrong')

    if(element.classList.value == 'wrong'){
      somErro.play()
    }

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
    ]
  },
  {
    question: 'As ciências puras... ',
    answers: [
      { text: 'Web Dev Simplified', correct: false },
      { text: 'Dev Ed', correct: false },
      { text: 'estudam os conceitos básicos do conhecimento sem preocupação com sua imediata aplicação', correct: true }
    ]
  },
  {
    question: 'As ciências puras podem ser ser: ',
    answers: [
      { text: 'Kinda', correct: false },
      { text: 'Empíricas e formais', correct: true },
      { text: 'IDK', correct: false }
    ]
  },
  /*
  {
    question: 'Ser básico aqui significa: ',
    answers: [
      { text: 'estar mais interessado nos fundamentos, nas leis que regem os fenômenos físicos ou as ideias', correct: true },
      { text: 'Um no', correct: false },
      { text: 'IDK', correct: false },
    ]
  },
  {
    question: 'É considerada uma ciência básica por excelência',
    answers: [
      { text: '6', correct: false },
      { text: 'Cosmologia', correct: true },
      { text: 'IDK', correct: false },
    ]
  },
  {
    question: 'A cosmologia',
    answers: [
      { text: '6', correct: false },
      { text: 'estuda a formação do universo sem preocupação explícita com aplicações práticas', correct: true },
      { text: 'Um no', correct: false },
    ]
  },
  {
    question: 'A cosmologia é considerada uma ciência empírica pois:',
    answers: [
      { text: '6', correct: false },
      { text: 'suas teorias precisam ser validadas pela observação de fenômenos', correct: true },
      { text: 'Um no', correct: false },
    ]
  },
  {
    question: 'A Lógica pode também:',
    answers: [
      { text: '6', correct: false },
      { text: 'ser considerada uma ciência básica, mas formal', correct: true },
      { text: 'IDK', correct: false },
    ]
  },
  {
    question: 'Como evoluiu a Teorica do Caos?',
    answers: [
      { text: 'a partir de observações de fenômenos obtidos com ferramentas computacionais', correct: true },
      { text: 'Um no', correct: false },
      { text: 'IDK', correct: false },
    ]
  },
  {
    question: 'Outra subárea da Computação que apresenta forte característica de ciência básica é:',
    answers: [
      { text: 'o estudo de sistemas multiagentes e também a área conhecida como matética computacional', correct: true },
      { text: 'Um no', correct: false },
      { text: 'IDK', correct: false },
    ]
  },
  {
    question: 'Qual é o objetivo destas subáreas?',
    answers: [
      { text: '6', correct: false },
      { text: 'entender como os processos sociais ou de aprendizagem ocorrem entre seres humanos a partir da elaboração e teste de modelos computacionais que incorporam teorias que tentam explicar alguns fenômenos', correct: true },
      { text: 'Um no', correct: false },
    ]
  },
  {
    question: 'Um exemplo de pesquisa básica que só veio a produzir aplicações práticas posteriormente:',
    answers: [
      { text: '6', correct: false },
      { text: ' Teoria do Caos', correct: true },
      { text: 'IDK', correct: false },
    ]
  },
  {
    question: 'As ciências aplicadas...',
    answers: [
      { text: '6', correct: false },
      { text: 'visam à realização de descobertas que possam ser imediatamente aplicadas a algum processo industrial ou assemelhado, visando produzir algum tipo de ganho', correct: true },
      { text: 'Um no', correct: false },
    ]
  },
  {
    question: 'A Computação muitas vezes é vista como: ',
    answers: [
      { text: 'o uma disciplina de engenharia', correct: true },
      { text: 'Um no', correct: false },
      { text: 'IDK', correct: false },
    ]
  },
  {
    question: 'Existe a engenharia de software, a engenharia de computação e a engenharia de computadores, cada qual com um objetivo diferenciado, mas sendo que todas têm em comum: ',
    answers: [
      { text: 'a produção de conhecimento para aplicação em processos de produção de software, sistemas ou hardware.', correct: true },
      { text: 'Um no', correct: false },
      { text: 'IDK', correct: false },
    ]
  },
  */
]


