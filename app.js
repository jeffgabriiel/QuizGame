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

        var contRegreessiva = 10
        setTimeout(function(){
          while(contRegreessiva >= 0){
            console.log(contRegreessiva)
            contRegreessiva--
          }
          //window.location.reload();
        }, 20000);
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
    question: 'Qual é uma das ferramentas usuais dos cientistas de acordo com Wazlawick?',
    answers: [
      { text: 'Análise', correct: true },
      { text: 'Síntese', correct: false },
      { text: 'Intuição', correct: false },
    ]
  },
  {
    question: 'Segundo Wazlawick, qual é o objeto de estudo das ciências sociais?',
    answers: [
      { text: 'As ideias', correct: false },
      { text: 'Os fenômenos que ocorrem no mundo real', correct: false },
      { text: 'Os aspectos das relações humanas', correct: true }
    ]
  },
  {
    question: 'De acordo com Wazlawick, quais são os exemplos de ciências empíricas?',
    answers: [
      { text: 'Lógica, Matemática e Estatística', correct: false },
      { text: 'Astronomia, Física e Biologia', correct: true },
      { text: 'Sociologia, Psicologia e Política', correct: false }
    ]
  },
  {
    question: 'Qual é o foco das ciências puras, de acordo com Wazlawick?',
    answers: [
      { text: 'Estudar conceitos básicos sem aplicação imediata', correct: true },
      { text: 'Descobrir novas tecnologias aplicáveis à indústria', correct: false },
      { text: 'Estudar conceitos básicos com aplicação imediata', correct: false },
    ]
  },
  {
    question: 'Qual é o objetivo das ciências aplicadas, segundo Wazlawick?',
    answers: [
      { text: 'Descobrir conceitos básicos do conhecimento', correct: false },
      { text: 'Estudar sistemas multiagentes', correct: false },
      { text: 'Realizar descobertas aplicáveis imediatamente à indústria', correct: true },
    ]
  },
  {
    question: 'De acordo com Wazlawick (2010), a Ciência da Computação normalmente é classificada entre as ciências exatas. Quais são as características das ciências exatas?',
    answers: [
      { text: 'Os resultados são imprecisos e imprevisíveis', correct: false },
      { text: 'As leis são altamente preditivas e previsíveis', correct: true },
      { text: 'As leis são altamente subjetivas e imprecisas', correct: false },
    ]
  },
  {
    question: 'Segundo Wazlawick (2010), a Computação possui uma subárea que é considerada uma ciência inexata. Qual é essa subárea?',
    answers: [
      { text: 'Inteligência Artificial', correct: false },
      { text: 'Redes de Computadores', correct: false },
      { text: 'Algoritmos Genéticos', correct: true },
    ]
  },
  {
    question: 'Qual é a definição de "ciências duras" de acordo com Wazlawick?',
    answers: [
      { text: 'As ciências que não usam rigor científico em suas observações e deduções', correct: false },
      { text: 'As ciências que usam de rigor científico em suas observações, experimentos e deduções', correct: true },
      { text: 'As ciências que dependem de dados anedotais para comprovar seus experimentos', correct: false },
    ]
  },
  {
    question: 'Qual das afirmações abaixo é verdadeira sobre as ciências idiográficas?',
    answers: [
      { text: 'Analisam fenômenos únicos que não se repetem, mas têm validade como campo de estudo', correct: true },
      { text: 'Estudam fenômenos que se repetem e permitem fazer previsões', correct: false },
      { text: 'Analisam fenômenos únicos que não se repetem, mas não têm validade como campo de estudo', correct: false },
    ]
  },
  {
    question: 'Qual a importância do método científico na Computação, segundo Wazlawick?',
    answers: [
      { text: 'O método científico é fundamental na Computação para explicar os dados coletados de maneira mais provável', correct: true },
      { text: 'O método científico não é relevante na Computação porque os dados não precisam ser explicados', correct: false },
      { text: 'O método científico é importante porque a coleta de dados é a única atividade relevante na Computação', correct: false },
    ]
  },
  {
    question: 'Qual a visão do pragmatismo sobre a descrição da realidade pela Ciência?',
    answers: [
      { text: 'Os pragmáticos assumem que não é possível saber exatamente o que é a realidade e que assim, a Ciência explica apenas os fenômenos observados e suas previsões são consistentes e úteis', correct: true },
      { text: 'Os pragmáticos assumem que é possível saber exatamente o que é a realidade e que assim, a Ciência explica apenas os fenômenos observados', correct: false },
      { text: 'Os realistas defendem que a Ciência, de fato, descreve a realidade', correct: false },
    ]
  },
  {
    question: 'Qual é o critério de objetividade em Ciência, de acordo com Wazlawick (2010)?',
    answers: [
      { text: 'O critério de objetividade leva em consideração as opiniões em Ciência, mesmo que sejam subjetivas', correct: false },
      { text: 'O critério de objetividade exclui as opiniões em Ciência, porque são subjetivas e dependem da experiência, caráter e motivação das pessoas que as emitem', correct: true },
      { text: 'O critério de objetividade considera as opiniões em Ciência apenas se forem emitidas por pessoas com autoridade na área', correct: false },
    ]
  },
  {
    question: 'Qual é o princípio da indução segundo Wazlawick?',
    answers: [
      { text: 'Indução natural só pode ser aplicada como princípio científico independentemente de outros conhecimentos e observações feitas', correct: false },
      { text: 'Uma situação que se sustenta em todos os casos observados se sustenta em todos os casos, até prova em contrário', correct: true },
      { text: 'O método científico não sustenta a ideia de que uma situação que se sustenta em todos os casos observados se sustenta em todos os casos, até prova em contrário', correct: false },
    ]
  },
  {
    question: 'Quanto à natureza, como podemos classificar os tipos de pesquisa segundo Wazlawick?',
    answers: [
      { text: 'Descritiva e documental', correct: false },
      { text: 'Original e bibliográfica', correct: false },
      { text: 'Original e survey', correct: true },
    ]
  },
  {
    question: 'Quanto aos objetivos, qual é a diferença entre a pesquisa exploratória e a explicativa, segundo Wazlawick?',
    answers: [
      { text: 'A pesquisa exploratória busca explicar as causas e explicações dos dados, enquanto a explicativa não tem uma hipótese ou objetivo definido em mente', correct: false },
      { text: 'A pesquisa exploratória não necessariamente tem uma hipótese ou objetivo definido em mente, enquanto a explicativa busca analisar os dados observados e suas causas e explicações', correct: false },
      { text: 'A pesquisa exploratória busca dados consistentes sobre uma determinada realidade, enquanto a explicativa não tem uma hipótese ou objetivo definido em mente', correct: true },
    ]
  },
]


