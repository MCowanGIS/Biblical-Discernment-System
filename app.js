// ============================================
// BIBLICAL DISCERNMENT SYSTEM 5.0
// Main Application Logic
// ============================================

let currentState = {
    teaching: '',
    questions: [],
    answers: {},
    verdict: null,
    categoryScores: {}
};

// === DOM ELEMENTS ===
const phases = {
    1: document.getElementById('phase1'),
    2: document.getElementById('phase2'),
    3: document.getElementById('phase3')
};

const teachingInput = document.getElementById('teachingInput');
const analyzeBtn = document.getElementById('analyzeBtn');
const questionsContainer = document.getElementById('questionsContainer');
const evaluateBtn = document.getElementById('evaluateBtn');
const backBtn1 = document.getElementById('backBtn1');
const backBtn2 = document.getElementById('backBtn2');
const startOverBtn = document.getElementById('startOverBtn');

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
});

function setupEventListeners() {
    analyzeBtn.addEventListener('click', analyzeTeaching);
    evaluateBtn.addEventListener('click', evaluateTeaching);
    backBtn1.addEventListener('click', () => goToPhase(1));
    backBtn2.addEventListener('click', () => goToPhase(2));
    startOverBtn.addEventListener('click', resetForm);
}

// === PHASE 1: ANALYZE TEACHING ===
function analyzeTeaching() {
    const teaching = teachingInput.value.trim();
    
    if (!teaching) {
        alert('Please enter a teaching to analyze');
        return;
    }
    
    currentState.teaching = teaching;
    currentState.questions = DOCTRINAL_RULES.generateSmartQuestions(teaching);
    
    renderQuestions();
    goToPhase(2);
}

// === PHASE 2: RENDER QUESTIONS ===
function renderQuestions() {
    questionsContainer.innerHTML = '';
    
    currentState.questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question-card';
        questionDiv.innerHTML = `
            <div class="question-header">
                <span class="category-badge">${DOCTRINAL_RULES.categories[q.category - 1].icon} ${q.categoryName}</span>
                <span class="question-number">Question ${index + 1} of ${currentState.questions.length}</span>
            </div>
            <p class="question-text">${q.text}</p>
            <div class="option-group">
                ${q.options.map(opt => `
                    <label class="option-label">
                        <input 
                            type="radio" 
                            name="question-${q.category}" 
                            value="${opt}"
                            ${currentState.answers[q.category] === opt ? 'checked' : ''}
                        >
                        <span class="option-text">${opt}</span>
                    </label>
                `).join('')}
            </div>
        `;
        
        // Add change listeners
        const radios = questionDiv.querySelectorAll('input[type="radio"]');
        radios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                currentState.answers[q.category] = e.target.value;
            });
        });
        
        questionsContainer.appendChild(questionDiv);
    });
}

// === PHASE 3: EVALUATE TEACHING ===
function evaluateTeaching() {
    // Check all questions answered
    if (Object.keys(currentState.answers).length !== currentState.questions.length) {
        alert('Please answer all questions');
        return;
    }
    
    // Calculate verdict
    const verdictId = DOCTRINAL_RULES.calculateVerdict(currentState.answers);
    currentState.verdict = DOCTRINAL_RULES.verdicts[verdictId - 1];
    
    // Score each category based on answers
    scoreCategories();
    
    // Render results
    renderResults();
    goToPhase(3);
}

// === SCORE CATEGORIES ===
function scoreCategories() {
    DOCTRINAL_RULES.categories.forEach(cat => {
        const answer = currentState.answers[cat.id];
        
        if (answer === 'Yes') {
            currentState.categoryScores[cat.id] = { score: 1, status: 'Aligns with Scripture' };
        } else if (answer === 'Partially/Unclear') {
            currentState.categoryScores[cat.id] = { score: 0.5, status: 'Partially aligns / Needs clarification' };
        } else {
            currentState.categoryScores[cat.id] = { score: 0, status: 'Contradicts Scripture' };
        }
    });
}

// === RENDER RESULTS ===
function renderResults() {
    // Render verdict box
    const verdictBox = document.getElementById('verdictBox');
    verdictBox.innerHTML = `
        <div class="verdict-content" style="border-left: 5px solid ${currentState.verdict.color}">
            <div class="verdict-icon">${currentState.verdict.icon}</div>
            <div class="verdict-text">
                <h3 class="verdict-title">${currentState.verdict.name}</h3>
                <p class="verdict-description">${currentState.verdict.description}</p>
                <p class="teaching-quote"><strong>Teaching:</strong> "${currentState.teaching.substring(0, 100)}${currentState.teaching.length > 100 ? '...' : ''}"</p>
            </div>
        </div>
    `;
    
    // Render category breakdown
    const categoriesContainer = document.getElementById('categoriesContainer');
    categoriesContainer.innerHTML = '<h3>Category Breakdown</h3>';
    
    const categoriesGrid = document.createElement('div');
    categoriesGrid.className = 'categories-grid';
    
    DOCTRINAL_RULES.categories.forEach(cat => {
        const score = currentState.categoryScores[cat.id];
        const statusColor = score.score === 1 ? '#00b300' : score.score === 0.5 ? '#ffcc00' : '#ff3333';
        
        const categoryCard = document.createElement('div');
        categoryCard.className = 'category-card';
        categoryCard.style.borderLeftColor = statusColor;
        categoryCard.innerHTML = `
            <div class="category-header">
                <span class="category-icon">${cat.icon}</span>
                <h4 class="category-name">${cat.name}</h4>
            </div>
            <p class="category-status" style="color: ${statusColor}">${score.status}</p>
        `;
        
        categoriesGrid.appendChild(categoryCard);
    });
    
    categoriesContainer.appendChild(categoriesGrid);
    
    // Render scripture references
    const scriptureList = document.getElementById('scriptureList');
    scriptureList.innerHTML = '';
    
    // Get top categories mentioned
    const topCategories = currentState.questions.slice(0, 5).map(q => q.category);
    topCategories.forEach(catId => {
        const references = DOCTRINAL_RULES.scriptureReferences[catId];
        references.forEach(ref => {
            const li = document.createElement('li');
            li.textContent = ref;
            li.className = 'scripture-verse';
            scriptureList.appendChild(li);
        });
    });
    
    // Render next steps
    const nextStepsList = document.getElementById('nextStepsList');
    nextStepsList.innerHTML = '';
    
    topCategories.forEach(catId => {
        const step = DOCTRINAL_RULES.nextSteps[catId];
        const li = document.createElement('li');
        li.textContent = step;
        li.className = 'next-step-item';
        nextStepsList.appendChild(li);
    });
}

// === NAVIGATION ===
function goToPhase(phaseNum) {
    Object.values(phases).forEach(phase => phase.classList.remove('active'));
    phases[phaseNum].classList.add('active');
    window.scrollTo(0, 0);
}

function resetForm() {
    currentState = {
        teaching: '',
        questions: [],
        answers: {},
        verdict: null,
        categoryScores: {}
    };
    teachingInput.value = '';
    questionsContainer.innerHTML = '';
    goToPhase(1);
}