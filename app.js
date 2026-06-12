// ============================================
// BIBLICAL DISCERNMENT SYSTEM 5.0
// Direct Scripture Evaluation
// ============================================

let currentState = {
    teaching: '',
    detectedCategories: [],
    verdict: null,
    scriptureVerses: [],
    analysis: ''
};

// === DOM ELEMENTS ===
const phases = {
    1: document.getElementById('phase1'),
    2: document.getElementById('phase2'),
    3: document.getElementById('phase3')
};

const teachingInput = document.getElementById('teachingInput');
const analyzeBtn = document.getElementById('analyzeBtn');
const startOverBtn = document.getElementById('startOverBtn');

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
});

function setupEventListeners() {
    analyzeBtn.addEventListener('click', analyzeTeaching);
    startOverBtn.addEventListener('click', resetForm);
}

// === PHASE 1: ANALYZE TEACHING ===
async function analyzeTeaching() {
    const teaching = teachingInput.value.trim();
    
    if (!teaching) {
        alert('Please enter a teaching to analyze');
        return;
    }
    
    currentState.teaching = teaching;
    
    // Show loading
    goToPhase(2);
    
    // Step 1: Detect which categories the teaching falls into
    const categories = DOCTRINAL_RULES.detectCategories(teaching);
    currentState.detectedCategories = categories;
    
    // Step 2: Get relevant Bible verses for those categories
    const verses = await DOCTRINAL_RULES.getScriptureVerses(categories);
    currentState.scriptureVerses = verses;
    
    // Step 3: Calculate verdict based on teaching vs scripture
    const verdict = DOCTRINAL_RULES.evaluateTeachingAgainstScripture(teaching, verses);
    currentState.verdict = verdict;
    
    // Step 4: Generate analysis
    const analysis = DOCTRINAL_RULES.generateAnalysis(teaching, categories, verses, verdict);
    currentState.analysis = analysis;
    
    // Show results
    renderResults();
    goToPhase(3);
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
                <p class="teaching-quote"><strong>Teaching Evaluated:</strong> "${currentState.teaching.substring(0, 80)}${currentState.teaching.length > 80 ? '...' : ''}"</p>
            </div>
        </div>
    `;
    
    // Render category box
    const categoryBox = document.getElementById('categoryBox');
    const categoryNames = currentState.detectedCategories
        .map(catId => {
            const cat = DOCTRINAL_RULES.categories.find(c => c.id === catId);
            return cat ? `${cat.icon} ${cat.name}` : '';
        })
        .filter(name => name)
        .join(' | ');
    
    categoryBox.innerHTML = `
        <div class="category-content">
            <h4>Theological Category</h4>
            <p>${categoryNames || 'General Biblical Teaching'}</p>
        </div>
    `;
    
    // Render scripture results
    const scriptureResults = document.getElementById('scriptureResults');
    scriptureResults.innerHTML = '';
    
    if (currentState.scriptureVerses.length > 0) {
        const verseGroups = {};
        
        currentState.scriptureVerses.forEach(verse => {
            if (!verseGroups[verse.category]) {
                verseGroups[verse.category] = [];
            }
            verseGroups[verse.category].push(verse);
        });
        
        Object.keys(verseGroups).forEach(category => {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'verse-category';
            
            const categoryTitle = document.createElement('h4');
            categoryTitle.className = 'category-title';
            categoryTitle.textContent = category;
            categoryDiv.appendChild(categoryTitle);
            
            verseGroups[category].forEach(verse => {
                const verseDiv = document.createElement('div');
                verseDiv.className = 'verse-card';
                verseDiv.innerHTML = `
                    <p class="verse-reference"><strong>${verse.reference}</strong></p>
                    <p class="verse-text">"${verse.text}"</p>
                `;
                categoryDiv.appendChild(verseDiv);
            });
            
            scriptureResults.appendChild(categoryDiv);
        });
    } else {
        scriptureResults.innerHTML = '<p class="no-results">No specific verses found in this category.</p>';
    }
    
    // Render analysis
    const analysisText = document.getElementById('analysisText');
    analysisText.innerHTML = currentState.analysis;
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
        detectedCategories: [],
        verdict: null,
        scriptureVerses: [],
        analysis: ''
    };
    teachingInput.value = '';
    teachingInput.focus();
    goToPhase(1);
}