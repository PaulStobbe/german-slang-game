// German Slang Game - Main JavaScript
// Jeu d'argot allemand - JavaScript principal

document.addEventListener('DOMContentLoaded', function() {
    // Initialize game
    loadGameState();
    initializeGame();
});

function initializeGame() {
    // Set up event listeners
    setupModeNavigation();
    setupConversationMode();
    setupQuizMode();
    setupFlashcardMode();
    setupDictionaryMode();
    
    // Start with conversation mode
    showMode('conversation');
    loadConversationScenario();
}

// Mode Navigation
function setupModeNavigation() {
    const modeButtons = document.querySelectorAll('.mode-btn');
    modeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const mode = btn.dataset.mode;
            
            // Update active button
            modeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Show corresponding mode
            showMode(mode);
        });
    });
}

function showMode(mode) {
    // Hide all sections
    document.querySelectorAll('.game-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(`${mode}-mode`).classList.add('active');
    
    // Initialize mode-specific content
    switch(mode) {
        case 'conversation':
            loadConversationScenario();
            break;
        case 'quiz':
            initializeQuiz();
            break;
        case 'flashcards':
            initializeFlashcards();
            break;
        case 'dictionary':
            loadDictionary();
            break;
    }
}

// Conversation Mode
function setupConversationMode() {
    document.getElementById('next-conversation').addEventListener('click', nextConversation);
    document.getElementById('show-hint').addEventListener('click', showHint);
}

function loadConversationScenario() {
    const conversation = gameData.conversations[gameState.currentConversation];
    
    document.getElementById('scenario-title').textContent = conversation.title;
    document.getElementById('scenario-description').textContent = conversation.description;
    
    // Reset conversation
    gameState.currentConversationStep = 0;
    document.getElementById('conversation-messages').innerHTML = '';
    
    // Start conversation
    displayNextConversationStep();
}

function displayNextConversationStep() {
    const conversation = gameData.conversations[gameState.currentConversation];
    const step = conversation.scenario[gameState.currentConversationStep];
    
    if (!step) {
        // Conversation finished
        finishConversation();
        return;
    }
    
    if (step.speaker) {
        // NPC message
        displayMessage(step.german, step.french, 'npc', step.speaker);
        gameState.currentConversationStep++;
        setTimeout(() => displayNextConversationStep(), 2000);
    } else if (step.responses) {
        // Player response options
        displayResponseOptions(step.responses);
    }
}

function displayMessage(german, french, type, speaker = '') {
    const messagesContainer = document.getElementById('conversation-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    
    let speakerName = speaker ? `<strong>${speaker}:</strong> ` : '';
    messageDiv.innerHTML = `
        ${speakerName}${german}
        <div class="translation">${french}</div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function displayResponseOptions(responses) {
    const optionsContainer = document.getElementById('response-options');
    optionsContainer.innerHTML = '';
    
    responses.forEach((response, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'response-option';
        optionDiv.innerHTML = `
            <strong>${response.german}</strong>
            <div class="translation">${response.french}</div>
        `;
        
        optionDiv.addEventListener('click', () => selectResponse(index, responses));
        optionsContainer.appendChild(optionDiv);
    });
}

function selectResponse(index, responses) {
    const selectedResponse = responses[index];
    const options = document.querySelectorAll('.response-option');
    
    // Mark selection
    options[index].classList.add('selected');
    
    // Display player message
    displayMessage(selectedResponse.german, selectedResponse.french, 'user');
    
    // Update score
    if (selectedResponse.correct) {
        gameState.score += 10;
        gameState.wordsLearned++;
    }
    
    // Show feedback
    setTimeout(() => {
        showFeedback(selectedResponse.feedback, selectedResponse.correct);
        
        // Continue conversation after feedback
        setTimeout(() => {
            document.getElementById('response-options').innerHTML = '';
            gameState.currentConversationStep++;
            displayNextConversationStep();
        }, 3000);
    }, 1000);
}

function showFeedback(feedback, isCorrect) {
    const messagesContainer = document.getElementById('conversation-messages');
    const feedbackDiv = document.createElement('div');
    feedbackDiv.className = `message ${isCorrect ? 'correct' : 'incorrect'}`;
    feedbackDiv.style.background = isCorrect ? '#4caf50' : '#ff9800';
    feedbackDiv.style.color = 'white';
    feedbackDiv.innerHTML = `<strong>💡 ${feedback}</strong>`;
    
    messagesContainer.appendChild(feedbackDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function finishConversation() {
    gameState.conversationsCompleted++;
    gameState.level = Math.floor(gameState.conversationsCompleted / 3) + 1;
    
    const messagesContainer = document.getElementById('conversation-messages');
    const completionDiv = document.createElement('div');
    completionDiv.className = 'message system';
    completionDiv.style.background = '#667eea';
    completionDiv.style.color = 'white';
    completionDiv.style.textAlign = 'center';
    completionDiv.innerHTML = `
        <strong>🎉 Conversation terminée !</strong><br>
        Score: +${gameState.score} points<br>
        Mots appris: ${gameState.wordsLearned}
    `;
    
    messagesContainer.appendChild(completionDiv);
    saveGameState();
    updateUI();
}

function nextConversation() {
    gameState.currentConversation = (gameState.currentConversation + 1) % gameData.conversations.length;
    loadConversationScenario();
}

function showHint() {
    alert("💡 Astuce: Utilisez l'argot allemand pour paraître plus naturel dans vos réponses !");
}

// Quiz Mode
function setupQuizMode() {
    document.getElementById('next-quiz').addEventListener('click', nextQuizQuestion);
}

function initializeQuiz() {
    gameState.currentQuiz = 0;
    gameState.quizResults = [];
    loadQuizQuestion();
    updateQuizProgress();
}

function loadQuizQuestion() {
    if (gameState.currentQuiz >= gameData.quizQuestions.length) {
        showQuizResults();
        return;
    }
    
    const question = gameData.quizQuestions[gameState.currentQuiz];
    
    document.getElementById('quiz-question-text').textContent = question.question;
    
    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'quiz-option';
        optionDiv.textContent = option;
        optionDiv.addEventListener('click', () => selectQuizAnswer(index));
        optionsContainer.appendChild(optionDiv);
    });
    
    // Hide feedback and next button
    document.getElementById('quiz-feedback').classList.remove('show');
    document.getElementById('next-quiz').style.display = 'none';
}

function selectQuizAnswer(selectedIndex) {
    const question = gameData.quizQuestions[gameState.currentQuiz];
    const options = document.querySelectorAll('.quiz-option');
    const isCorrect = selectedIndex === question.correct;
    
    // Disable all options
    options.forEach((option, index) => {
        option.style.pointerEvents = 'none';
        if (index === question.correct) {
            option.classList.add('correct');
        } else if (index === selectedIndex && !isCorrect) {
            option.classList.add('incorrect');
        }
    });
    
    // Record result
    gameState.quizResults.push(isCorrect);
    
    if (isCorrect) {
        gameState.score += 15;
        gameState.wordsLearned++;
    }
    
    // Show feedback
    const feedbackDiv = document.getElementById('quiz-feedback');
    feedbackDiv.innerHTML = `
        <h4>${isCorrect ? '✅ Correct !' : '❌ Incorrect'}</h4>
        <p>${question.explanation}</p>
    `;
    feedbackDiv.classList.add('show');
    
    // Show next button
    document.getElementById('next-quiz').style.display = 'inline-block';
    
    updateUI();
    saveGameState();
}

function nextQuizQuestion() {
    gameState.currentQuiz++;
    updateQuizProgress();
    loadQuizQuestion();
}

function updateQuizProgress() {
    const progress = (gameState.currentQuiz / gameData.quizQuestions.length) * 100;
    document.getElementById('quiz-progress').style.width = `${progress}%`;
    document.getElementById('quiz-counter').textContent = `${gameState.currentQuiz + 1}/${gameData.quizQuestions.length}`;
}

function showQuizResults() {
    const correct = gameState.quizResults.filter(r => r).length;
    const total = gameState.quizResults.length;
    const percentage = Math.round((correct / total) * 100);
    
    document.getElementById('quiz-question-text').innerHTML = `
        <h3>🎯 Quiz terminé !</h3>
        <p>Score: ${correct}/${total} (${percentage}%)</p>
        <button class="btn primary" onclick="initializeQuiz()">Recommencer</button>
    `;
    
    document.getElementById('quiz-options').innerHTML = '';
    document.getElementById('quiz-feedback').classList.remove('show');
    document.getElementById('next-quiz').style.display = 'none';
}

// Flashcard Mode
function setupFlashcardMode() {
    document.getElementById('flip-card').addEventListener('click', flipFlashcard);
    document.getElementById('know-card').addEventListener('click', () => markCard(true));
    document.getElementById('learn-card').addEventListener('click', () => markCard(false));
    document.getElementById('flashcard').addEventListener('click', flipFlashcard);
}

function initializeFlashcards() {
    gameState.currentFlashcard = 0;
    loadFlashcard();
    updateFlashcardCounter();
}

function loadFlashcard() {
    if (gameState.currentFlashcard >= gameData.flashcards.length) {
        gameState.currentFlashcard = 0;
    }
    
    const flashcard = gameData.flashcards[gameState.currentFlashcard];
    
    document.getElementById('flashcard-german').textContent = flashcard.german;
    document.getElementById('flashcard-context').textContent = flashcard.context;
    document.getElementById('flashcard-french').textContent = flashcard.french;
    document.getElementById('flashcard-example').textContent = flashcard.example;
    
    // Reset card to front
    document.getElementById('flashcard').classList.remove('flipped');
    
    updateFlashcardCounter();
}

function flipFlashcard() {
    document.getElementById('flashcard').classList.toggle('flipped');
}

function markCard(known) {
    if (known) {
        gameState.score += 5;
        gameState.wordsLearned++;
    }
    
    // Move to next card
    gameState.currentFlashcard++;
    
    if (gameState.currentFlashcard >= gameData.flashcards.length) {
        // Show completion message
        alert(`🎉 Toutes les flashcards terminées ! Score: ${gameState.score}`);
        gameState.currentFlashcard = 0;
    }
    
    loadFlashcard();
    updateUI();
    saveGameState();
}

function updateFlashcardCounter() {
    document.getElementById('flashcard-counter').textContent = 
        `${gameState.currentFlashcard + 1}/${gameData.flashcards.length}`;
}

// Dictionary Mode
function setupDictionaryMode() {
    document.getElementById('search-btn').addEventListener('click', searchDictionary);
    document.getElementById('dictionary-search').addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            searchDictionary();
        }
    });
    
    // Category buttons
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterByCategory(btn.dataset.category);
        });
    });
}

function loadDictionary() {
    displayDictionaryEntries(gameData.dictionary);
}

function searchDictionary() {
    const searchTerm = document.getElementById('dictionary-search').value.toLowerCase();
    
    if (!searchTerm) {
        displayDictionaryEntries(gameData.dictionary);
        return;
    }
    
    const results = gameData.dictionary.filter(entry => 
        entry.german.toLowerCase().includes(searchTerm) ||
        entry.french.toLowerCase().includes(searchTerm) ||
        entry.example.toLowerCase().includes(searchTerm)
    );
    
    displayDictionaryEntries(results);
}

function filterByCategory(category) {
    if (category === 'all') {
        displayDictionaryEntries(gameData.dictionary);
    } else {
        const filtered = gameData.dictionary.filter(entry => entry.category === category);
        displayDictionaryEntries(filtered);
    }
}

function displayDictionaryEntries(entries) {
    const resultsContainer = document.getElementById('dictionary-results');
    
    if (entries.length === 0) {
        resultsContainer.innerHTML = '<p style="text-align: center; color: #666;">Aucun résultat trouvé.</p>';
        return;
    }
    
    resultsContainer.innerHTML = entries.map(entry => `
        <div class="dictionary-entry">
            <h4>${entry.german}</h4>
            <div class="translation">${entry.french}</div>
            <div class="example">${entry.example}<br><em>${entry.exampleTranslation}</em></div>
            <span class="category">${getCategoryName(entry.category)}</span>
        </div>
    `).join('');
}

function getCategoryName(category) {
    const categoryNames = {
        'emotions': 'Émotions',
        'people': 'Personnes',
        'activities': 'Activités',
        'expressions': 'Expressions'
    };
    return categoryNames[category] || category;
}

// Utility functions
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Achievement system
function checkAchievements() {
    const achievements = [];
    
    if (gameState.score >= 100 && !localStorage.getItem('achievement_100_points')) {
        achievements.push('🏆 Premier Century - 100 points atteints !');
        localStorage.setItem('achievement_100_points', 'true');
    }
    
    if (gameState.wordsLearned >= 20 && !localStorage.getItem('achievement_20_words')) {
        achievements.push('📚 Vocabulaire Riche - 20 mots appris !');
        localStorage.setItem('achievement_20_words', 'true');
    }
    
    if (gameState.conversationsCompleted >= 5 && !localStorage.getItem('achievement_5_conversations')) {
        achievements.push('💬 Bavard - 5 conversations terminées !');
        localStorage.setItem('achievement_5_conversations', 'true');
    }
    
    if (achievements.length > 0) {
        setTimeout(() => {
            achievements.forEach(achievement => {
                showAchievement(achievement);
            });
        }, 1000);
    }
}

function showAchievement(text) {
    const achievementDiv = document.createElement('div');
    achievementDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        font-weight: bold;
        z-index: 1000;
        animation: slideInRight 0.5s ease-out;
    `;
    achievementDiv.textContent = text;
    
    document.body.appendChild(achievementDiv);
    
    setTimeout(() => {
        achievementDiv.remove();
    }, 4000);
}

// Auto-save game state periodically
setInterval(() => {
    saveGameState();
    checkAchievements();
}, 30000); // Every 30 seconds