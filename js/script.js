const questions = [
    {
        question: "Как переводится полное название игры?",
        answer: ["Оборона древних", "Древние силы", "Наследие древних", "Сокровища драконов"],
        correct: 1,
    },
    {
        question: "Кто из нижеперечисленных был первым созданным героем в Dota 2?",
        answer: ["Pudje", "Invoker", "Anti-Mage", "Lina"],
        correct: 4,
    },
    {
        question: "Какая из приведенных пассивных способностей не работает на здания?",
        answer: ["Mortla Strike", "Curse of Avernus", "Return", "Phantom Rush"],
        correct: 1,
    },
    {
        question: "Что не является способностью Luna?",
        answer: ["Lucent Beam", "Lunar Blessing", "Void", "Moon Glaive"],
        correct: 3,
    },
    {
        question: "Кто пытался приручить Viper’a?",
        answer: ["Pugna", "Death Prophet", "Necrophos", "Lich"],
        correct: 1,
    },
    {
        question: "Какого урона нет в Доте 2?",
        answer: ["Смешанный", "Чистый", "Физический", "Магический"],
        correct: 1,
    },
    {
        question: "Какой герой умеет восстанавливать здоровье башням в игре?",
        answer: ["Трент", "Рики", "Люкан", "Лич"],
        correct: 1,
    },
    {
        question: "Самый сильный нейтральный персонаж?",
        answer: ["Кентавр", "Рошан", "Ящерица", "Дракон"],
        correct: 2,
    }
];

//находим элементы
const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitButton = document.querySelector('#submit')

//Переменная игры
let score = 0;//кол-во правильных ответов
let questionIndex = 0;//текущий вопрос

clearPage ();
showQuestion();

submitButton.onclick = checkAnswer;

function clearPage() {
    headerContainer.innerHTML = '';
    listContainer.innerHTML = '';
}

function showQuestion() {
    //Вопрос
    const headerTemplate = `<h1 class="quiz__header-title">%title%</h1>`;//обромление шаблоных меток: "%"
    const title = headerTemplate.replace('%title%', questions[questionIndex]['question']);
    
    headerContainer.innerHTML = title;

    //Варианты ответов
    let answerNumber = 1;
    for (answerText of questions[questionIndex]['answer']) {
        const questionTemplate = `
                <li>
                    <label>
                        <input value="%number%" class="custom-radio" type="radio" class="quiz__answer" name="answer">
                        <span>%answer%</span>
                    </label>
                </li>`;
        
       const answerHTML = questionTemplate
                                    .replace('%answer%', answerText)
                                    .replace('%number%', answerNumber);

       listContainer.innerHTML += answerHTML;//listContainer.innerHTML = listContainer.innerHTML + answerHTML
       answerNumber++;
    }
}

function checkAnswer() {
    const checkRadio = listContainer.querySelector('input[type="radio"]:checked');//Находим выбранную радио кнопку
    //Если ответ не выбран - ничего не делаем, выходим из функции
    if(!checkRadio) {
       submitButton.blur();
       return
    }
    const userAnswer = parseInt(checkRadio.value);

    //Если ответил верно - увеличиваем счет
    if(userAnswer === questions[questionIndex]['correct']) {
        score++;
    }

    if(questionIndex !== questions.length - 1) {
        questionIndex++;
        clearPage();
        showQuestion();
        return;
    }else {
        clearPage();
        showResults();
    }
}

function showResults() {
    console.log(score);

    const resultTemplate = `
            <h2 class="title">%title%</h2>
            <h3 class="summary">%message%</h3>
            <p class="result">%result%</p>`;

        let title, message;
        //Варианты заголовков и текста
        if(score === questions.length) {
            title = 'Поздравляем, вы залупа! Ты ответил на все вопросы по доте! 🎉';
            message = 'Вы ответили на все вопросы';
        }else if ((score * 100) / questions.length >= 50) {
            title = 'Неплохой результат, залупа!';
            message = 'ВЫ ответили боллее половины правильных ответов';
        }else {
            title = 'Стоит постораться, залупа';
            message = 'У тебя меньше половины правильных ответов';
        }

        //Результат
        let result = `${score} из ${questions.length}`;

        //Финальный ответ, подставляем данные в шаблон
        const finalMesasge = resultTemplate
                                .replace('%title%', title)
                                .replace('%message%', message)
                                .replace('%result%', result)

        headerContainer.innerHTML = finalMesasge;

        //Меняем кнопку на "Играть снова"
        submitButton.blur();
        submitButton.innerText = 'Начни заново';
        submitButton.onclick = () => history.go();


}