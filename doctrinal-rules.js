// ============================================
// BIBLICAL DISCERNMENT SYSTEM 5.0
// Doctrinal Rules & Scripture Evaluation Engine
// ============================================

const DOCTRINAL_RULES = {
    // === THE 16 THEOLOGICAL CATEGORIES ===
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

    // === THE 8 VERDICTS ===
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

    // === CORE SCRIPTURE FOR EACH CATEGORY ===
    coreScripture: {
        1: { name: "God's Nature & Attributes", references: ['Exodus 3:14', 'Psalm 90:2', '1 John 4:8', 'Deuteronomy 6:4', 'Isaiah 46:9-10'] },
        2: { name: "Christ's Person & Work", references: ['John 1:1-3', 'John 1:14', 'Romans 1:3-4', '1 Corinthians 15:3-4', 'Acts 1:11'] },
        3: { name: "Holy Spirit's Nature & Work", references: ['John 14:16-17', 'Romans 8:26-27', '1 Corinthians 3:16', 'Titus 3:5-6', 'Ephesians 1:13-14'] },
        4: { name: 'The Trinity', references: ['Matthew 28:19', '1 John 5:7', '1 Corinthians 8:6', '2 Corinthians 13:14', 'Deuteronomy 6:4'] },
        5: { name: 'Authority & Sufficiency of Scripture', references: ['2 Timothy 3:16-17', '2 Peter 1:20-21', 'Psalm 119:105', 'Isaiah 40:8', 'Matthew 4:4'] },
        6: { name: 'Human Nature & Identity', references: ['Genesis 1:27', 'Psalm 139:14', '1 Thessalonians 5:23', 'Romans 6:19', 'Proverbs 22:6'] },
        7: { name: "Sin & Its Consequences", references: ['Romans 3:23', 'Romans 6:23', 'Isaiah 53:6', '1 John 1:8', 'Genesis 3:6'] },
        8: { name: 'Salvation by Grace Through Faith', references: ['Ephesians 2:8-9', 'John 3:16', 'Romans 10:9', 'Titus 3:4-7', 'Philippians 3:9'] },
        9: { name: "The Church as Christ's Body", references: ['1 Corinthians 12:12-27', 'Ephesians 4:4-6', 'Hebrews 10:24-25', 'Matthew 16:18', 'Ephesians 5:25-27'] },
        10: { name: 'End Times & Resurrection', references: ['1 Thessalonians 4:13-18', 'Revelation 20:12-13', '2 Peter 3:9-13', 'Matthew 24:30', 'Philippians 3:20-21'] },
        11: { name: 'Angels & Demons', references: ['Hebrews 1:14', 'Colossians 1:16', 'Ephesians 6:12', 'Revelation 12:7-9', '2 Corinthians 11:14'] },
        12: { name: 'Old Testament Types & New Testament Fulfillment', references: ['Galatians 3:24', 'Hebrews 10:1', 'Luke 24:27', '1 Corinthians 10:11', 'Romans 5:14'] },
        13: { name: 'Union with Christ & New Creation', references: ['2 Corinthians 5:17', 'Ephesians 2:4-6', 'John 1:12', 'Romans 8:1-2', '1 Peter 2:9-10'] },
        14: { name: 'Christian Conduct & Holiness', references: ['Romans 12:1-2', 'Galatians 5:22-23', 'James 1:22-25', '1 John 2:3-6', 'Matthew 22:37-40'] },
        15: { name: 'Prayer, Worship & Spiritual Disciplines', references: ['1 Thessalonians 5:17', 'Joshua 1:8', 'Hebrews 10:24-25', 'Matthew 26:26-29', 'Colossians 3:16'] },
        16: { name: 'Gospel & Culture', references: ['2 Timothy 2:2', 'Colossians 2:8', '1 Peter 3:15', 'Proverbs 8:33-36', 'Romans 12:2'] }
    },

    // === KEYWORD DETECTION FOR CATEGORIES ===
    categoryKeywords: {
        1: ['god', 'sovereign', 'almighty', 'eternal', 'omniscient', 'attributes', 'nature of god'],
        2: ['jesus', 'christ', 'messiah', 'incarnation', 'resurrection', 'ascension', 'deity', 'divine', 'human'],
        3: ['holy spirit', 'spirit power', 'indwelling', 'regenerate', 'sanctification', 'fruit of spirit'],
        4: ['trinity', 'three in one', 'father son spirit', 'oneness', 'triune'],
        5: ['bible', 'scripture', 'word of god', 'authoritative', 'inerrant', 'infallible', 'canon'],
        6: ['man', 'human', 'soul', 'spirit', 'image of god', 'nature of humanity', 'body'],
        7: ['sin', 'evil', 'rebellion', 'transgression', 'guilt', 'shame', 'fallen'],
        8: ['salvation', 'save', 'gospel', 'faith', 'grace', 'redemption', 'forgiven', 'born again'],
        9: ['church', 'body of christ', 'congregation', 'believers', 'assembly', 'fellowship'],
        10: ['end times', 'return', 'judgment', 'heaven', 'hell', 'second coming', 'resurrection', 'eternity'],
        11: ['angel', 'demon', 'satan', 'devil', 'spiritual warfare', 'principalities', 'powers'],
        12: ['covenant', 'redemptive history', 'old testament', 'new testament', 'promise', 'fulfillment', 'types'],
        13: ['identity', 'in christ', 'believer', 'new life', 'regenerate', 'adopted', 'righteous'],
        14: ['ethics', 'morality', 'holiness', 'righteousness', 'virtue', 'commandment', 'law', 'behavior'],
        15: ['prayer', 'worship', 'spiritual', 'practice', 'discipline', 'communion', 'baptism', 'serve'],
        16: ['culture', 'philosophy', 'worldview', 'wisdom', 'truth', 'reason', 'society']
    },

    // === DETECT WHICH CATEGORIES A TEACHING FALLS INTO ===
    detectCategories: function(teaching) {
        const teachingLower = teaching.toLowerCase();
        const detected = [];

        for (let i = 1; i <= 16; i++) {
            const keywords = this.categoryKeywords[i];
            if (keywords.some(kw => teachingLower.includes(kw))) {
                detected.push(i);
            }
        }

        // If no categories detected, default to general categories
        if (detected.length === 0) {
            detected.push(5, 12);
        }

        return detected.slice(0, 4);
    },

    // === GET SCRIPTURE VERSES FROM BIBLE API ===
    getScriptureVerses: async function(categoryIds) {
        const verses = [];

        for (let catId of categoryIds) {
            const references = this.coreScripture[catId].references;
            const categoryName = this.coreScripture[catId].name;

            for (let ref of references) {
                try {
                    const verse = await this.fetchVerseFromAPI(ref, categoryName);
                    if (verse) {
                        verses.push(verse);
                    }
                } catch (error) {
                    console.log(`Could not fetch ${ref}, using cached version`);
                    const cached = this.getCachedVerse(ref, categoryName);
                    if (cached) verses.push(cached);
                }
            }
        }

        return verses;
    },

    // === FETCH VERSE FROM BIBLE API ===
    fetchVerseFromAPI: async function(reference, category) {
        try {
            const response = await fetch(`https://bible-api.com/${encodeURIComponent(reference)}`);
            
            if (response.ok) {
                const data = await response.json();
                return {
                    reference: data.reference,
                    text: data.text,
                    category: category
                };
            }
        } catch (error) {
            console.log(`API error for ${reference}:`, error);
        }
        return this.getCachedVerse(reference, category);
    },

    // === CACHED VERSES (Fallback if API fails) ===
    cachedVerses: {
        'John 1:1': 'In the beginning was the Word, and the Word was with God, and the Word was God.',
        'John 1:14': 'And the Word became flesh and dwelt among us, and we have seen his glory, glory as of the only Son from the Father, full of grace and truth.',
        'Romans 3:23': 'For all have sinned and fall short of the glory of God.',
        'Ephesians 2:8-9': 'For by grace you have been saved through faith. And this is not your own doing; it is the gift of God, not a result of works, so that no one may boast.',
        '2 Timothy 3:16-17': 'All Scripture is breathed out by God and profitable for teaching, for reproof, for correction, and for training in righteousness.',
        'Matthew 28:19': 'Go therefore and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit.',
        'Genesis 1:27': 'So God created man in his own image, in the image of God he created him; male and female he created them.',
        'John 3:16': 'For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.'
    },

    getCachedVerse: function(reference, category) {
        const text = this.cachedVerses[reference];
        if (text) {
            return {
                reference: reference,
                text: text,
                category: category
            };
        }
        return null;
    },

    // === EVALUATE TEACHING AGAINST SCRIPTURE ===
    evaluateTeachingAgainstScripture: function(teaching, verses) {
        const teachingLower = teaching.toLowerCase();
        
        const antiGospelFlags = ['salvation by works', 'jesus not god', 'jesus not human', 'no resurrection', 'no judgment', 'all will be saved', 'god is not sovereign'];
        const unbiblicalFlags = ['extra biblical revelation', 'contradicts bible', 'denies trinity', 'denies grace', 'denies faith'];

        let alignmentScore = 0;
        verses.forEach(verse => {
            if (this.verseSupportsTeaching(teaching, verse)) {
                alignmentScore++;
            }
        });

        for (let flag of antiGospelFlags) {
            if (teachingLower.includes(flag)) {
                return this.verdicts[7];
            }
        }

        for (let flag of unbiblicalFlags) {
            if (teachingLower.includes(flag)) {
                return this.verdicts[5];
            }
        }

        const alignmentPercentage = verses.length > 0 ? (alignmentScore / verses.length) * 100 : 50;

        if (alignmentPercentage >= 80) {
            return this.verdicts[0];
        } else if (alignmentPercentage >= 60) {
            return this.verdicts[1];
        } else if (alignmentPercentage >= 40) {
            return this.verdicts[2];
        } else if (alignmentPercentage >= 20) {
            return this.verdicts[3];
        } else {
            return this.verdicts[4];
        }
    },

    // === CHECK IF VERSE SUPPORTS TEACHING ===
    verseSupportsTeaching: function(teaching, verse) {
        const teachingLower = teaching.toLowerCase();
        const verseLower = verse.text.toLowerCase();
        const keywords = ['christ', 'jesus', 'god', 'grace', 'faith', 'salvation', 'spirit', 'believers', 'sin', 'lord', 'father', 'heaven'];
        
        let matches = 0;
        keywords.forEach(kw => {
            if (teachingLower.includes(kw) && verseLower.includes(kw)) {
                matches++;
            }
        });

        return matches > 0;
    },

    // === GENERATE ANALYSIS ===
    generateAnalysis: function(teaching, categories, verses, verdict) {
        let analysis = '<p>';
        
        analysis += `<strong>Summary:</strong> Your teaching has been evaluated against core Scripture passages across ${categories.length} theological category/categories.<br><br>`;
        
        analysis += `<strong>Verdict: ${verdict.name}</strong><br>`;
        analysis += `${verdict.description}<br><br>`;
        
        if (verses.length > 0) {
            analysis += `<strong>Scripture Match:</strong> Found ${verses.length} key passages related to your teaching.<br>`;
            analysis += 'The verses displayed above represent the core biblical teaching in these areas.<br><br>';
        }
        
        if (verdict.id === 1) {
            analysis += '✅ <strong>This teaching aligns well with Scripture and evangelical theology.</strong><br>';
            analysis += 'Study the verses above to deepen your understanding and ground this truth in Scripture.';
        } else if (verdict.id === 2) {
            analysis += '✅ <strong>This teaching is biblical but incomplete.</strong><br>';
            analysis += 'While true, consider what important biblical components might be missing. Study the related passages to develop a more complete understanding.';
        } else if (verdict.id === 3) {
            analysis += '⚠️ <strong>This teaching contains both truth and error.</strong><br>';
            analysis += 'Carefully compare it against the Scripture passages shown. Identify which parts align with Scripture and which parts need correction.';
        } else if (verdict.id === 4) {
            analysis += '⚠️ <strong>This teaching twists or warps biblical truth.</strong><br>';
            analysis += 'While it may contain some truth, it distorts important biblical doctrine. Study these passages to understand the correct biblical teaching.';
        } else if (verdict.id >= 5) {
            analysis += '❌ <strong>This teaching contradicts Scripture.</strong><br>';
            analysis += 'It conflicts with core biblical doctrine. Please study the passages above to understand what Scripture actually teaches.';
        }
        
        analysis += '</p>';
        return analysis;
    }
};
