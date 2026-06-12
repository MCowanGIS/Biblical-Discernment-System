// ============================================
// BIBLICAL DISCERNMENT SYSTEM 5.0
// Doctrinal Rules & Evaluation Engine
// ============================================

const DOCTRINAL_RULES = {
    // === THE 16 CATEGORIES ===
    categories: [
        { id: 1, name: 'Theology Proper', icon: '⛪' },
        { id: 2, name: 'Christology', icon: '✝️' },
        { id: 3, name: 'Pneumatology', icon: '🕊' },
        { id: 4, name: 'Trinity', icon: '🔺' },
        { id: 5, name: 'Bibliology', icon: '📖' },
        { id: 6, name: 'Anthropology', icon: '👤' },
        { id: 7, name: 'Hamartiology', icon: '⚠️' },
        { id: 8, name: 'Soteriology', icon: '🆘' },
        { id: 9, name: 'Ecclesiology', icon: '⛪' },
        { id: 10, name: 'Eschatology', icon: '⏰' },
        { id: 11, name: 'Angelology', icon: '👼' },
        { id: 12, name: 'Covenant & Redemptive History', icon: '📜' },
        { id: 13, name: 'Christian Identity', icon: '👑' },
        { id: 14, name: 'Christian Ethics', icon: '⚖️' },
        { id: 15, name: 'Christian Practice', icon: '🙏' },
        { id: 16, name: 'Cultural & Philosophical', icon: '🌍' }
    ],

    // === THE 8 BDX VERDICTS ===
    verdicts: [
        { id: 1, name: 'Biblical', color: '#00b300', icon: '✅', description: 'Aligns with Scripture and evangelical theology' },
        { id: 2, name: 'Biblical but Incomplete', color: '#66cc00', icon: '✅', description: 'True but missing important biblical components' },
        { id: 3, name: 'Mixed', color: '#ffcc00', icon: '⚠️', description: 'Contains both truth and error' },
        { id: 4, name: 'Distorted', color: '#ffaa00', icon: '⚠️', description: 'Twists or warps biblical truth' },
        { id: 5, name: 'Speculative', color: '#ff8800', icon: '❓', description: 'Based on imagination rather than Scripture' },
        { id: 6, name: 'Unbiblical', color: '#ff3333', icon: '❌', description: 'Contradicts Scripture' },
        { id: 7, name: 'Deceptive', color: '#cc0000', icon: '🚫', description: 'Uses half-truths or manipulative framing' },
        { id: 8, name: 'Anti-Gospel', color: '#990000', icon: '⛔', description: 'Opposes or undermines the gospel of grace' }
    ],

    // === SMART QUESTION GENERATOR ===
    generateSmartQuestions: function(teaching) {
        const teachingLower = teaching.toLowerCase();
        const questions = [];
        const usedCategories = new Set();

        // Check for keywords and map to categories
        const keywordMap = [
            { keywords: ['jesus', 'christ', 'messiah', 'incarnation', 'resurrection', 'ascension'], catId: 2 },
            { keywords: ['salvation', 'save', 'gospel', 'faith', 'grace', 'redemption', 'forgiven'], catId: 8 },
            { keywords: ['bible', 'scripture', 'word of god', 'authoritative', 'inerrant'], catId: 5 },
            { keywords: ['god', 'sovereign', 'almighty', 'eternal', 'omniscient'], catId: 1 },
            { keywords: ['holy spirit', 'spirit power', 'indwelling', 'regenerate'], catId: 3 },
            { keywords: ['trinity', 'three in one', 'father son spirit'], catId: 4 },
            { keywords: ['sin', 'evil', 'rebellion', 'transgression', 'guilt'], catId: 7 },
            { keywords: ['church', 'body of christ', 'congregation', 'believers'], catId: 9 },
            { keywords: ['end times', 'return', 'judgment', 'heaven', 'hell', 'second coming'], catId: 10 },
            { keywords: ['ethics', 'morality', 'holiness', 'commandment', 'law'], catId: 14 },
            { keywords: ['prayer', 'worship', 'spiritual', 'practice', 'discipline'], catId: 15 }
        ];

        for (let map of keywordMap) {
            if (map.keywords.some(kw => teachingLower.includes(kw)) && !usedCategories.has(map.catId)) {
                usedCategories.add(map.catId);
                const category = this.categories.find(c => c.id === map.catId);
                
                // Generate contextual question
                const contextQuestion = this.generateContextualQuestion(map.catId, teaching);
                questions.push({
                    category: map.catId,
                    categoryName: category.name,
                    text: contextQuestion,
                    options: ['Yes', 'Partially/Unclear', 'No']
                });
            }
            if (questions.length >= 6) break;
        }

        // If we don't have enough questions, add general ones
        if (questions.length < 4) {
            if (!usedCategories.has(5)) {
                questions.push({
                    category: 5,
                    categoryName: 'Bibliology',
                    text: 'Is this teaching grounded in the 66 books of the Bible?',
                    options: ['Yes', 'Partially/Unclear', 'No']
                });
                usedCategories.add(5);
            }
            if (!usedCategories.has(12)) {
                questions.push({
                    category: 12,
                    categoryName: 'Covenant & Redemptive History',
                    text: 'Does this teaching align with the Bible\'s overarching redemptive storyline?',
                    options: ['Yes', 'Partially/Unclear', 'No']
                });
                usedCategories.add(12);
            }
        }

        return questions.slice(0, 6);
    },

    // === CONTEXTUAL QUESTION GENERATOR ===
    generateContextualQuestion: function(catId, teaching) {
        const contextualQuestions = {
            1: 'Does this teaching accurately represent God\'s attributes according to Scripture?',
            2: 'Does this teaching affirm Jesus as fully God, fully human, the Messiah, and His physical resurrection and return?',
            3: 'Does this teaching honor the Holy Spirit as fully God and acknowledge His work in salvation and sanctification?',
            4: 'Does this teaching affirm the biblical Trinity—God as one essence in three persons?',
            5: 'Does this teaching submit to the authority of the 66 books of the Bible?',
            6: 'Does this teaching recognize humans as made in God\'s image with both body and soul?',
            7: 'Does this teaching take sin seriously as rebellion against God with real consequences?',
            8: 'Does this teaching affirm salvation is by grace alone through faith alone in Christ alone?',
            9: 'Does this teaching align with a biblical understanding of the church as Christ\'s body?',
            10: 'Does this teaching acknowledge Christ\'s return, resurrection, judgment, and eternal states?',
            11: 'Does this teaching recognize angels and demons as real, but subordinate to God\'s sovereignty?',
            12: 'Does this teaching see Christ as the fulfillment of Old Testament types and promises?',
            13: 'Does this teaching affirm believers\' union with Christ and new identity in Him?',
            14: 'Does this teaching ground ethics in God\'s character and the gospel?',
            15: 'Does this teaching encourage biblical spiritual practices like prayer and Scripture study?',
            16: 'Does this teaching maintain biblical truth in its cultural application?'
        };
        return contextualQuestions[catId] || 'Is this teaching biblically sound?';
    },

    // === CALCULATE VERDICT BASED ON ANSWERS ===
    calculateVerdict: function(answers) {
        let score = { biblical: 0, partial: 0, unbiblical: 0 };
        
        Object.values(answers).forEach(answer => {
            if (answer === 'Yes') score.biblical++;
            else if (answer === 'Partially/Unclear') score.partial++;
            else score.unbiblical++;
        });

        // Verdict logic
        if (score.unbiblical >= 3) return 8; // Anti-Gospel
        if (score.unbiblical === 2) return 6; // Unbiblical
        if (score.unbiblical === 1 && score.partial >= 2) return 7; // Deceptive
        if (score.unbiblical === 1) return 4; // Distorted
        if (score.partial >= 4) return 5; // Speculative
        if (score.partial >= 2) return 3; // Mixed
        if (score.partial === 1) return 2; // Biblical but Incomplete
        return 1; // Biblical
    },

    // === SCRIPTURE REFERENCES FOR EACH CATEGORY ===
    scriptureReferences: {
        1: ['Exodus 3:14', 'Psalm 90:2', '1 John 4:8', 'Deuteronomy 6:4', 'Isaiah 46:9-10'],
        2: ['John 1:1-3', 'John 1:14', 'Romans 1:3-4', '1 Corinthians 15:3-4', 'Acts 1:11'],
        3: ['John 14:16-17', 'Romans 8:26-27', '1 Corinthians 3:16', 'Titus 3:5-6', 'Ephesians 1:13-14'],
        4: ['Matthew 28:19', '1 John 5:7', '1 Corinthians 8:6', '2 Corinthians 13:14', 'Deuteronomy 6:4'],
        5: ['2 Timothy 3:16-17', '2 Peter 1:20-21', 'Psalm 119:105', 'Isaiah 40:8', 'Matthew 4:4'],
        6: ['Genesis 1:27', 'Psalm 139:14', '1 Thessalonians 5:23', 'Romans 6:19', 'Proverbs 22:6'],
        7: ['Romans 3:23', 'Romans 6:23', 'Isaiah 53:6', '1 John 1:8', 'Genesis 3:6'],
        8: ['Ephesians 2:8-9', 'John 3:16', 'Romans 10:9', 'Titus 3:4-7', 'Philippians 3:9'],
        9: ['1 Corinthians 12:12-27', 'Ephesians 4:4-6', 'Hebrews 10:24-25', 'Matthew 16:18', 'Ephesians 5:25-27'],
        10: ['1 Thessalonians 4:13-18', 'Revelation 20:12-13', '2 Peter 3:9-13', 'Matthew 24:30', 'Philippians 3:20-21'],
        11: ['Hebrews 1:14', 'Colossians 1:16', 'Ephesians 6:12', 'Revelation 12:7-9', '2 Corinthians 11:14'],
        12: ['Galatians 3:24', 'Hebrews 10:1', 'Luke 24:27', '1 Corinthians 10:11', 'Romans 5:14'],
        13: ['2 Corinthians 5:17', 'Ephesians 2:4-6', 'John 1:12', 'Romans 8:1-2', '1 Peter 2:9-10'],
        14: ['Romans 12:1-2', 'Galatians 5:22-23', 'James 1:22-25', '1 John 2:3-6', 'Matthew 22:37-40'],
        15: ['1 Thessalonians 5:17', 'Joshua 1:8', 'Hebrews 10:24-25', 'Matthew 26:26-29', 'Colossians 3:16'],
        16: ['2 Timothy 2:2', 'Colossians 2:8', '1 Peter 3:15', 'Proverbs 8:33-36', 'Romans 12:2']
    },

    // === NEXT STEPS FOR DEEPER STUDY ===
    nextSteps: {
        1: 'Study God\'s character and attributes in Psalms, Isaiah, and Exodus',
        2: 'Read the Gospels to understand the person and work of Christ comprehensively',
        3: 'Explore Pneumatology through John 14-16, Romans 8, and Ephesians 1',
        4: 'Study the Trinity through Matthew 28:19, 2 Corinthians 13:14, and 1 John 5:7',
        5: 'Review 2 Timothy 3:16-17 and 2 Peter 1:20-21 on Scripture\'s authority',
        6: 'Meditate on Genesis 1:27 and Psalm 139 on human identity',
        7: 'Read Romans 1-3 and Isaiah 53-57 on sin and its consequences',
        8: 'Study Romans 3-5, Ephesians 2:8-9, and Titus 3:4-7 on salvation',
        9: 'Read 1 Corinthians 12, Ephesians 4, and Hebrews 10:24-25 on the church',
        10: 'Study 1 Thessalonians 4:13-18, Revelation 20, and Matthew 24-25 on end times',
        11: 'Read Ephesians 6:10-20 and Colossians 1:16 on angels and demons',
        12: 'Study Hebrews 10:1-18 on Old Covenant types and New Covenant fulfillment',
        13: 'Read 2 Corinthians 5:17, Ephesians 1:3-14, and Colossians 1:27 on identity in Christ',
        14: 'Study Matthew 22:37-40, Romans 12:1-2, and James 1:22-25 on ethics',
        15: 'Review 1 Thessalonians 5:17, Colossians 3:15-17 on spiritual practices',
        16: 'Study 2 Timothy 2:2-4 and 1 Peter 3:15 on defending truth in culture'
    }
};