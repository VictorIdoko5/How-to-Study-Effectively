// ================= DATA =================
const questions = [
    {
        question: "How do you prefer to study?",
        options: [
            { text: "Diagrams and charts", type: "visual" },
            { text: "Listening to explanations", type: "auditory" },
            { text: "Reading notes", type: "reading" },
            { text: "Practicing hands-on", type: "kinesthetic" }
        ]
    },
    {
        question: "What helps you remember best?",
        options: [
            { text: "Images and colors", type: "visual" },
            { text: "Talking out loud", type: "auditory" },
            { text: "Writing summaries", type: "reading" },
            { text: "Doing exercises", type: "kinesthetic" }
        ]
    },
    {
        question: "In class, you prefer:",
        options: [
            { text: "Slides and visuals", type: "visual" },
            { text: "Listening to teacher", type: "auditory" },
            { text: "Taking notes", type: "reading" },
            { text: "Group activities", type: "kinesthetic" }
        ]
    }
    
];
questions.push({
    question: "How do you solve problems?",
    options: [
        { text: "Visualizing the solution", type: "visual" },
        { text: "Discussing it", type: "auditory" },
        { text: "Writing it out", type: "reading" },
        { text: "Trying it practically", type: "kinesthetic" }
    ]
});

// ================= STATE =================
const state = {
    currentQuestion: 0,
    selectedType: null,
    scores: {
        visual: 0,
        auditory: 0,
        reading: 0,
        kinesthetic: 0
    }
};

// ================= ELEMENTS =================
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options1");
const resultEl = document.getElementById("result");
const resultText = document.getElementById("resultText");
const resultDesc = document.getElementById("resultDesc");
const nextBtn = document.getElementById("nextBtn");
const progressEl = document.getElementById("progress");
const countEl = document.getElementById("count");

// ================= INIT =================
document.addEventListener("DOMContentLoaded", () => {
    nextBtn.addEventListener("click", handleNext);
    loadQuestion();
});

// ================= FUNCTIONS =================

function loadQuestion() {
    const q = questions[state.currentQuestion];

    questionEl.textContent = q.question;
    countEl.textContent = `Question ${state.currentQuestion + 1} of ${questions.length}`;

    optionsEl.innerHTML = "";
    nextBtn.style.display = "none";
    state.selectedType = null;

    updateProgress();

    q.options.forEach(option => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.textContent = option.text;
        btn.type = "button";

        btn.addEventListener("click", () => selectOption(btn, option.type));

        optionsEl.appendChild(btn);
    });
}

function selectOption(button, type) {
    const buttons = document.querySelectorAll(".option-btn");

    buttons.forEach(btn => {
        btn.classList.remove("selected");
        btn.disabled = true;
    });

    button.classList.add("selected");
    state.selectedType = type;

    nextBtn.style.display = "block";
}

function handleNext() {
    if (!state.selectedType) return;

    state.scores[state.selectedType]++;
    state.currentQuestion++;

    if (state.currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function updateProgress() {
    const progressPercent = (state.currentQuestion / questions.length) * 100;
    progressEl.style.width = `${progressPercent}%`;
}

function showResult() {
    document.querySelector(".quiz-app").style.display = "none";
    resultEl.style.display = "block";
    progressEl.style.width = "100%";

    const topType = Object.keys(state.scores).reduce((a, b) =>
        state.scores[a] > state.scores[b] ? a : b
    );

    const descriptions = {
        visual: "You learn best through images, diagrams, and visual aids.",
        auditory: "You learn best by listening and speaking.",
        reading: "You learn best through reading and writing.",
        kinesthetic: "You learn best through practice and hands-on activities."
    };

    const careers = {
        visual: [
            "Medicine (Radiology, Surgery, Pathology)",
            "Architecture",
            "Graphic Design",
            "Engineering (Civil, Design-focused)"
        ],
        auditory: [
            "Medicine (General Practice, Psychiatry)",
            "Law",
            "Teaching / Lecturing",
            "Broadcasting / Media"
        ],
        reading: [
            "Medicine (Research, Pharmacology)",
            "Law",
            "Writing / Journalism",
            "Academia / Research"
        ],
        kinesthetic: [
            "Medicine (Surgery, Nursing, Physiotherapy)",
            "Engineering (Mechanical)",
            "Sports Science",
            "Technical Skills / Trades"
        ]
    };

    resultText.textContent = topType.toUpperCase();

    // safer rendering
    resultDesc.innerHTML = `
        <p>${descriptions[topType]}</p>
        <br>
        <strong>Great careers for you:</strong>
        <ul>
            ${careers[topType].map(c => `<li>${c}</li>`).join("")}
        </ul>
    `;
}