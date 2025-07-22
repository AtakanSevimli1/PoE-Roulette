// Simple test functions for the random skill selector

// Test for randomness distribution
function testRandomDistribution() {
    console.log("Testing random distribution...");
    
    // Create a map to count occurrences of each skill
    const counts = {};
    const iterations = 10000;
    
    // Mock the skillsData array if it's not available
    const testData = typeof skillsData !== 'undefined' ? skillsData : 
        Array.from({ length: 100 }, (_, i) => ({ name: `Skill ${i}` }));
    
    // Run many iterations
    for (let i = 0; i < iterations; i++) {
        const randomIndex = Math.floor(Math.random() * testData.length);
        const skill = testData[randomIndex];
        
        if (!counts[skill.name]) {
            counts[skill.name] = 0;
        }
        counts[skill.name]++;
    }
    
    // Calculate expected count per skill
    const expectedCount = iterations / testData.length;
    console.log(`Expected count per skill: ${expectedCount}`);
    
    // Calculate standard deviation
    let totalDeviation = 0;
    Object.values(counts).forEach(count => {
        totalDeviation += Math.pow(count - expectedCount, 2);
    });
    
    const stdDev = Math.sqrt(totalDeviation / testData.length);
    console.log(`Standard deviation: ${stdDev}`);
    
    // Check if any skill is significantly over or under represented
    let maxDiff = 0;
    let maxDiffSkill = '';
    
    Object.entries(counts).forEach(([skill, count]) => {
        const diff = Math.abs(count - expectedCount);
        if (diff > maxDiff) {
            maxDiff = diff;
            maxDiffSkill = skill;
        }
    });
    
    console.log(`Maximum difference: ${maxDiff} for skill ${maxDiffSkill}`);
    console.log(`As percentage: ${(maxDiff / expectedCount * 100).toFixed(2)}%`);
    
    // A good random distribution should have a standard deviation close to the square root of the expected count
    const expectedStdDev = Math.sqrt(expectedCount);
    console.log(`Expected standard deviation: ${expectedStdDev}`);
    
    if (stdDev < expectedStdDev * 1.5) {
        console.log("PASS: Random distribution looks good");
    } else {
        console.log("FAIL: Random distribution may be biased");
    }
}

// Test for repeat avoidance
function testRepeatAvoidance() {
    console.log("Testing repeat avoidance...");
    
    // Mock the application state and functions
    const state = {
        history: [],
        historyMaxSize: 5
    };
    
    // Mock the skillsData array if it's not available
    const testData = typeof skillsData !== 'undefined' ? skillsData : 
        Array.from({ length: 20 }, (_, i) => ({ name: `Skill ${i}` }));
    
    function addToHistory(skill) {
        state.history.unshift(skill);
        if (state.history.length > state.historyMaxSize) {
            state.history.pop();
        }
    }
    
    function isInHistory(skill) {
        return state.history.some(historicSkill => historicSkill.name === skill.name);
    }
    
    function getRandomSkill() {
        let attempts = 0;
        const maxAttempts = 10;
        
        while (attempts < maxAttempts) {
            const randomIndex = Math.floor(Math.random() * testData.length);
            const candidate = testData[randomIndex];
            
            if (state.history.length === 0 || !isInHistory(candidate)) {
                return candidate;
            }
            
            attempts++;
        }
        
        const randomIndex = Math.floor(Math.random() * testData.length);
        return testData[randomIndex];
    }
    
    // Run a sequence of selections and check for repeats
    const sequence = [];
    const iterations = 100;
    
    for (let i = 0; i < iterations; i++) {
        const skill = getRandomSkill();
        sequence.push(skill.name);
        addToHistory(skill);
    }
    
    // Count immediate repeats
    let immediateRepeats = 0;
    for (let i = 1; i < sequence.length; i++) {
        if (sequence[i] === sequence[i-1]) {
            immediateRepeats++;
        }
    }
    
    console.log(`Immediate repeats: ${immediateRepeats} out of ${iterations-1} transitions`);
    
    // Count repeats within history size
    let historyRepeats = 0;
    for (let i = state.historyMaxSize; i < sequence.length; i++) {
        const historyWindow = sequence.slice(i - state.historyMaxSize, i);
        if (historyWindow.includes(sequence[i])) {
            historyRepeats++;
        }
    }
    
    console.log(`History repeats: ${historyRepeats} out of ${iterations - state.historyMaxSize} possible`);
    
    // With a history size of 5 and 20 skills, we expect some repeats due to the pigeonhole principle
    // But immediate repeats should be very rare
    if (immediateRepeats < iterations * 0.1) {
        console.log("PASS: Immediate repeat avoidance looks good");
    } else {
        console.log("FAIL: Too many immediate repeats");
    }
}

// Run tests if in a test environment
if (typeof window === 'undefined' || window.location.href.includes('test')) {
    console.log("Running tests for Path of Exile Random Skill Selector");
    testRandomDistribution();
    testRepeatAvoidance();
}