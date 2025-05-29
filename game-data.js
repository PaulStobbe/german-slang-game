// German Slang Game Data
// Données du jeu d'argot allemand

const gameData = {
    // Slang dictionary with French translations
    dictionary: [
        {
            german: "Geil",
            french: "Génial, super, cool",
            category: "emotions",
            example: "Das Konzert war echt geil!",
            exampleTranslation: "Le concert était vraiment génial !",
            context: "Expression d'enthousiasme très populaire"
        },
        {
            german: "Krass",
            french: "Dingue, incroyable",
            category: "emotions",
            example: "Das ist ja krass!",
            exampleTranslation: "C'est dingue ça !",
            context: "Pour exprimer l'étonnement ou l'admiration"
        },
        {
            german: "Alter",
            french: "Mec, vieux",
            category: "people",
            example: "Alter, was machst du denn da?",
            exampleTranslation: "Mec, qu'est-ce que tu fais là ?",
            context: "Façon familière de s'adresser à quelqu'un"
        },
        {
            german: "Chillen",
            french: "Se détendre, glander",
            category: "activities",
            example: "Lass uns einfach chillen.",
            exampleTranslation: "Relaxons-nous simplement.",
            context: "Activité de détente"
        },
        {
            german: "Bock haben",
            french: "Avoir envie de",
            category: "expressions",
            example: "Hast du Bock auf Kino?",
            exampleTranslation: "Tu as envie d'aller au cinéma ?",
            context: "Expression pour demander l'envie de faire quelque chose"
        },
        {
            german: "Mega",
            french: "Super, hyper",
            category: "emotions",
            example: "Das war mega lustig!",
            exampleTranslation: "C'était hyper marrant !",
            context: "Intensificateur très utilisé"
        },
        {
            german: "Digga",
            french: "Mec, pote",
            category: "people",
            example: "Was geht, Digga?",
            exampleTranslation: "Quoi de neuf, mec ?",
            context: "Salutation entre amis (Nord de l'Allemagne)"
        },
        {
            german: "Abfahren",
            french: "Kiffer, adorer",
            category: "emotions",
            example: "Ich fahre total auf diese Musik ab.",
            exampleTranslation: "Je kiffe complètement cette musique.",
            context: "Exprimer un goût prononcé pour quelque chose"
        },
        {
            german: "Gammeln",
            french: "Traîner, glander",
            category: "activities",
            example: "Ich will heute nur gammeln.",
            exampleTranslation: "Je veux juste traîner aujourd'hui.",
            context: "Ne rien faire de productif"
        },
        {
            german: "Hammer",
            french: "Génial, terrible",
            category: "emotions",
            example: "Der Film war echt Hammer!",
            exampleTranslation: "Le film était vraiment génial !",
            context: "Expression d'appréciation forte"
        },
        {
            german: "Pennen",
            french: "Dormir, roupiller",
            category: "activities",
            example: "Ich muss pennen gehen.",
            exampleTranslation: "Je dois aller roupiller.",
            context: "Façon familière de dire dormir"
        },
        {
            german: "Kohle",
            french: "Fric, argent",
            category: "expressions",
            example: "Ich hab keine Kohle mehr.",
            exampleTranslation: "Je n'ai plus de fric.",
            context: "Terme familier pour l'argent"
        },
        {
            german: "Checken",
            french: "Piger, comprendre",
            category: "expressions",
            example: "Checkst du das?",
            exampleTranslation: "Tu piges ça ?",
            context: "Comprendre ou vérifier quelque chose"
        },
        {
            german: "Abgehen",
            french: "Faire la fête, s'éclater",
            category: "activities",
            example: "Heute geht richtig ab!",
            exampleTranslation: "Aujourd'hui on va s'éclater !",
            context: "Faire la fête intensément"
        },
        {
            german: "Schnee von gestern",
            french: "De l'histoire ancienne",
            category: "expressions",
            example: "Das ist Schnee von gestern.",
            exampleTranslation: "C'est de l'histoire ancienne.",
            context: "Quelque chose de dépassé"
        }
    ],

    // Conversation scenarios
    conversations: [
        {
            title: "Au café avec des amis",
            description: "Vous discutez avec vos amis allemands dans un café de Munich.",
            scenario: [
                {
                    speaker: "Max",
                    german: "Hey Alter, was geht?",
                    french: "Salut mec, quoi de neuf ?",
                    type: "npc"
                },
                {
                    responses: [
                        {
                            german: "Alles geil, und bei dir?",
                            french: "Tout va super, et toi ?",
                            correct: true,
                            feedback: "Parfait ! Vous utilisez 'geil' de manière appropriée pour dire que tout va bien."
                        },
                        {
                            german: "Mir geht es sehr gut, danke.",
                            french: "Je vais très bien, merci.",
                            correct: false,
                            feedback: "Trop formel ! Essayez une réponse plus décontractée avec de l'argot."
                        },
                        {
                            german: "Ich habe heute keinen Bock.",
                            french: "Je n'ai pas envie aujourd'hui.",
                            correct: false,
                            feedback: "Cette réponse ne correspond pas à la question. 'Was geht?' demande des nouvelles."
                        }
                    ]
                },
                {
                    speaker: "Max",
                    german: "Mega! Hast du Bock auf 'ne Runde FIFA?",
                    french: "Super ! Tu as envie d'une partie de FIFA ?",
                    type: "npc"
                },
                {
                    responses: [
                        {
                            german: "Klar, lass uns zocken!",
                            french: "Bien sûr, allons jouer !",
                            correct: true,
                            feedback: "Excellent ! 'Zocken' est parfait pour parler de jeux vidéo."
                        },
                        {
                            german: "Nein, ich möchte nicht spielen.",
                            french: "Non, je ne veux pas jouer.",
                            correct: false,
                            feedback: "Correct mais trop formel. Utilisez de l'argot pour mieux vous intégrer."
                        },
                        {
                            german: "Ich muss leider pennen gehen.",
                            french: "Je dois malheureusement aller dormir.",
                            correct: false,
                            feedback: "Étrange de vouloir dormir au café ! Mais bon usage de 'pennen'."
                        }
                    ]
                }
            ]
        },
        {
            title: "Planning une soirée",
            description: "Vous organisez une soirée avec vos potes allemands.",
            scenario: [
                {
                    speaker: "Lisa",
                    german: "Digga, heute Abend geht richtig ab! Kommst du mit?",
                    french: "Mec, ce soir ça va déchirer ! Tu viens avec nous ?",
                    type: "npc"
                },
                {
                    responses: [
                        {
                            german: "Klar, ich bin dabei! Wird bestimmt geil.",
                            french: "Bien sûr, je suis de la partie ! Ça va être génial.",
                            correct: true,
                            feedback: "Super ! Vous montrez votre enthousiasme avec le bon argot."
                        },
                        {
                            german: "Ja, ich komme gerne mit zur Party.",
                            french: "Oui, je viens volontiers à la fête.",
                            correct: false,
                            feedback: "Trop formel ! Montrez plus d'enthousiasme avec de l'argot."
                        },
                        {
                            german: "Sorry, ich hab keinen Bock heute.",
                            french: "Désolé, je n'ai pas envie aujourd'hui.",
                            correct: true,
                            feedback: "Bon usage de l'argot, même pour décliner poliment."
                        }
                    ]
                }
            ]
        }
    ],

    // Quiz questions
    quizQuestions: [
        {
            question: "Que signifie 'geil' en argot allemand ?",
            options: [
                "Génial, super",
                "Fatigué",
                "Énervé",
                "Confus"
            ],
            correct: 0,
            explanation: "'Geil' est l'une des expressions les plus populaires en allemand pour dire que quelque chose est génial ou super."
        },
        {
            question: "Comment dit-on 'avoir envie de' en argot allemand ?",
            options: [
                "Mögen",
                "Wollen",
                "Bock haben",
                "Brauchen"
            ],
            correct: 2,
            explanation: "'Bock haben' est l'expression argotique pour dire 'avoir envie de faire quelque chose'."
        },
        {
            question: "Que veut dire 'Alter' ?",
            options: [
                "Vieux (âge)",
                "Mec, vieux (familier)",
                "Temps",
                "Nouveau"
            ],
            correct: 1,
            explanation: "'Alter' est une façon très familière de s'adresser à quelqu'un, comme 'mec' en français."
        },
        {
            question: "Comment dit-on 'se détendre' en argot ?",
            options: [
                "Entspannen",
                "Ruhen",
                "Chillen",
                "Schlafen"
            ],
            correct: 2,
            explanation: "'Chillen' vient de l'anglais 'chill' et est très utilisé par les jeunes allemands."
        },
        {
            question: "Que signifie 'krass' ?",
            options: [
                "Normal",
                "Dingue, incroyable",
                "Calme",
                "Triste"
            ],
            correct: 1,
            explanation: "'Krass' exprime l'étonnement ou l'admiration, comme 'dingue' ou 'incroyable'."
        },
        {
            question: "Comment dit-on 'argent' en argot allemand ?",
            options: [
                "Geld",
                "Münze",
                "Kohle",
                "Euro"
            ],
            correct: 2,
            explanation: "'Kohle' (littéralement 'charbon') est le terme argotique pour l'argent."
        },
        {
            question: "Que veut dire 'abfahren auf' ?",
            options: [
                "Partir en voyage",
                "Kiffer, adorer",
                "Conduire vite",
                "Être en retard"
            ],
            correct: 1,
            explanation: "'Abfahren auf' signifie avoir un goût prononcé pour quelque chose, l'adorer."
        },
        {
            question: "Comment dit-on 'dormir' en argot ?",
            options: [
                "Schlafen",
                "Pennen",
                "Träumen",
                "Ruhen"
            ],
            correct: 1,
            explanation: "'Pennen' est la façon familière de dire dormir en allemand."
        },
        {
            question: "Que signifie 'Digga' ?",
            options: [
                "Copain, mec",
                "Creuser",
                "Comprendre",
                "Manger"
            ],
            correct: 0,
            explanation: "'Digga' est un terme d'amitié très populaire dans le nord de l'Allemagne."
        },
        {
            question: "Comment dit-on que quelque chose est 'génial' ?",
            options: [
                "Schlecht",
                "Normal",
                "Hammer",
                "Langweilig"
            ],
            correct: 2,
            explanation: "'Hammer' (littéralement 'marteau') est utilisé pour dire que quelque chose est génial."
        }
    ],

    // Flashcards data
    flashcards: [
        {
            german: "Geil!",
            french: "Génial ! Super !",
            context: "Expression d'enthousiasme",
            example: "Das Konzert war echt geil! - Le concert était vraiment génial !",
            difficulty: 1
        },
        {
            german: "Alter",
            french: "Mec, vieux",
            context: "Interpellation familière",
            example: "Alter, was machst du? - Mec, qu'est-ce que tu fais ?",
            difficulty: 1
        },
        {
            german: "Bock haben",
            french: "Avoir envie de",
            context: "Exprimer l'envie",
            example: "Hast du Bock auf Pizza? - Tu as envie de pizza ?",
            difficulty: 2
        },
        {
            german: "Chillen",
            french: "Se détendre, glander",
            context: "Activité de détente",
            example: "Lass uns chillen. - Relaxons-nous.",
            difficulty: 1
        },
        {
            german: "Krass",
            french: "Dingue, incroyable",
            context: "Étonnement",
            example: "Das ist krass! - C'est dingue !",
            difficulty: 1
        }
    ]
};

// Game state management
const gameState = {
    score: 0,
    level: 1,
    wordsLearned: 0,
    conversationsCompleted: 0,
    streakDays: 0,
    currentConversation: 0,
    currentConversationStep: 0,
    currentQuiz: 0,
    currentFlashcard: 0,
    quizResults: []
};

// Save game state to localStorage
function saveGameState() {
    localStorage.setItem('germanSlangGameState', JSON.stringify(gameState));
}

// Load game state from localStorage
function loadGameState() {
    const saved = localStorage.getItem('germanSlangGameState');
    if (saved) {
        Object.assign(gameState, JSON.parse(saved));
        updateUI();
    }
}

// Update UI elements with current game state
function updateUI() {
    document.getElementById('score').textContent = gameState.score;
    document.getElementById('level').textContent = gameState.level;
    document.getElementById('words-learned').textContent = gameState.wordsLearned;
    document.getElementById('conversations-completed').textContent = gameState.conversationsCompleted;
    document.getElementById('streak-days').textContent = gameState.streakDays;
}