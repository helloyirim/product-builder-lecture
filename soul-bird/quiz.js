document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        {
            question: "당신의 MBTI 유형은 무엇인가요?",
            answers: [
                { text: "E (외향형)", type: "E" },
                { text: "I (내향형)", type: "I" }
            ]
        },
        {
            question: "주말에 무엇을 하고 싶으신가요?",
            answers: [
                { text: "친구들과 함께 떠들썩한 파티", type: "E" },
                { text: "집에서 조용히 영화 보기", type: "I" }
            ]
        },
        {
            question: "새로운 장소에 갔을 때 당신의 행동은?",
            answers: [
                { text: "먼저 다가가서 말을 건다", type: "E" },
                { text: "주변을 조용히 관찰한다", type: "I" }
            ]
        },
        {
            question: "여행 계획을 세울 때 당신의 스타일은?",
            answers: [
                { text: "즉흥적으로 마음 가는 대로!", type: "P" },
                { text: "꼼꼼하게 계획을 세워서!", type: "J" }
            ]
        },
        {
            question: "친구가 약속 시간에 늦는다면?",
            answers: [
                { text: "무슨 일이 있나 걱정된다", type: "F" },
                { text: "왜 늦는지 이유가 궁금하다", type: "T" }
            ]
        }
    ];

    let currentQuestionIndex = 0;
    const userAnswers = [];

    const questionEl = document.getElementById('question');
    const answersEl = document.getElementById('answers');
    const progressEl = document.getElementById('progress');
    const quizBox = document.getElementById('quiz-box');
    const loadingBox = document.getElementById('loading-box');

    function showQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        const progressPercent = ((currentQuestionIndex) / questions.length) * 100;

        progressEl.style.width = progressPercent + '%';
        progressEl.innerText = `${Math.round(progressPercent)}%`;

        questionEl.innerText = currentQuestion.question;
        answersEl.innerHTML = '';

        currentQuestion.answers.forEach(answer => {
            const button = document.createElement('button');
            button.classList.add('answer-btn');
            button.innerText = answer.text;
            button.addEventListener('click', () => selectAnswer(answer.type));
            answersEl.appendChild(button);
        });
    }

    function selectAnswer(type) {
        userAnswers.push(type);
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showLoadingAndRedirect();
        }
    }

    function showLoadingAndRedirect() {
        quizBox.style.display = 'none';
        loadingBox.style.display = 'flex';

        setTimeout(() => {
            const resultType = calculateResult();
            window.location.href = `results.html?bird=${resultType}`;
        }, 3000); // 3초 동안 로딩 애니메이션 보여주기
    }

    function calculateResult() {
        const counts = userAnswers.reduce((acc, type) => {
            acc[type] = (acc[type] || 0) + 1;
            return acc;
        }, {});

        // This is a very simplified logic. You can make it more complex.
        const E_count = counts['E'] || 0;
        const I_count = counts['I'] || 0;

        if (E_count > I_count) {
            return (counts['J'] || 0) > (counts['P'] || 0) ? 'eagle' : 'parrot';
        } else {
            return (counts['F'] || 0) > (counts['T'] || 0) ? 'swan' : 'owl';
        }
    }

    showQuestion();
});
