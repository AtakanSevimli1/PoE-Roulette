// Comprehensive test suite for the random skill selector

// Test suite for RandomSelector class
class RandomSelectorTests {
    constructor() {
        this.testData = [
            { name: "Fireball", type: "Spell", color: "Blue" },
            { name: "Lightning Strike", type: "Attack", color: "Green" },
            { name: "Cleave", type: "Attack", color: "Red" },
            { name: "Arc", type: "Spell", color: "Blue" },
            { name: "Cyclone", type: "Attack", color: "Red" },
            { name: "Ice Nova", type: "Spell", color: "Blue" },
            { name: "Ground Slam", type: "Attack", color: "Red" },
            { name: "Frost Bolt", type: "Spell", color: "Blue" },
            { name: "Spectral Throw", type: "Attack", color: "Green" },
            { name: "Spark", type: "Spell", color: "Blue" }
        ];
        this.passedTests = 0;
        this.totalTests = 0;
    }
    
    // Helper method to run a test
    runTest(testName, testFunction) {
        this.totalTests++;
        console.log(`\n--- Running ${testName} ---`);
        
        try {
            const result = testFunction();
            if (result) {
                console.log(`✅ PASS: ${testName}`);
                this.passedTests++;
            } else {
                console.log(`❌ FAIL: ${testName}`);
            }
        } catch (error) {
            console.log(`❌ ERROR in ${testName}:`, error.message);
        }
    }
    
    // Test basic functionality
    testBasicFunctionality() {
        return this.runTest("Basic Functionality", () => {
            const selector = new RandomSelector(this.testData);
            
            // Test that we can select a skill
            const skill = selector.selectRandomSkill();
            if (!skill || !skill.name) {
                console.log("Failed to select a skill");
                return false;
            }
            
            // Test that the selected skill is from our data
            const isValidSkill = this.testData.some(s => s.name === skill.name);
            if (!isValidSkill) {
                console.log("Selected skill is not from the provided data");
                return false;
            }
            
            console.log(`Selected skill: ${skill.name}`);
            return true;
        });
    }
    
    // Test randomness distribution
    testRandomnessDistribution() {
        return this.runTest("Randomness Distribution", () => {
            const selector = new RandomSelector(this.testData);
            const iterations = 5000;
            const counts = {};
            
            // Initialize counts
            this.testData.forEach(skill => {
                counts[skill.name] = 0;
            });
            
            // Run iterations without history to test pure randomness
            for (let i = 0; i < iterations; i++) {
                const skill = selector.selectRandomSkill(false);
                counts[skill.name]++;
            }
            
            // Calculate statistics
            const expectedCount = iterations / this.testData.length;
            let totalDeviation = 0;
            let maxDeviation = 0;
            
            Object.values(counts).forEach(count => {
                const deviation = Math.abs(count - expectedCount);
                totalDeviation += Math.pow(deviation, 2);
                maxDeviation = Math.max(maxDeviation, deviation);
            });
            
            const standardDeviation = Math.sqrt(totalDeviation / this.testData.length);
            const maxDeviationPercent = (maxDeviation / expectedCount) * 100;
            
            console.log(`Expected count per skill: ${expectedCount.toFixed(1)}`);
            console.log(`Standard deviation: ${standardDeviation.toFixed(2)}`);
            console.log(`Max deviation: ${maxDeviation.toFixed(1)} (${maxDeviationPercent.toFixed(1)}%)`);
            
            // Test passes if standard deviation is reasonable and max deviation is not too high
            return standardDeviation < expectedCount * 0.3 && maxDeviationPercent < 25;
        });
    }
    
    // Test repeat avoidance
    testRepeatAvoidance() {
        return this.runTest("Repeat Avoidance", () => {
            const selector = new RandomSelector(this.testData);
            const iterations = 100;
            const sequence = [];
            
            // Generate a sequence of skills
            for (let i = 0; i < iterations; i++) {
                const skill = selector.selectRandomSkill(true);
                sequence.push(skill.name);
            }
            
            // Count immediate repeats (consecutive same skills)
            let immediateRepeats = 0;
            for (let i = 1; i < sequence.length; i++) {
                if (sequence[i] === sequence[i-1]) {
                    immediateRepeats++;
                }
            }
            
            // Count repeats within history window
            let historyRepeats = 0;
            const historySize = selector.maxHistorySize;
            
            for (let i = historySize; i < sequence.length; i++) {
                const historyWindow = sequence.slice(i - historySize, i);
                if (historyWindow.includes(sequence[i])) {
                    historyRepeats++;
                }
            }
            
            const immediateRepeatRate = (immediateRepeats / (iterations - 1)) * 100;
            const historyRepeatRate = (historyRepeats / (iterations - historySize)) * 100;
            
            console.log(`Immediate repeats: ${immediateRepeats}/${iterations-1} (${immediateRepeatRate.toFixed(1)}%)`);
            console.log(`History repeats: ${historyRepeats}/${iterations-historySize} (${historyRepeatRate.toFixed(1)}%)`);
            
            // Test passes if immediate repeats are very rare and history repeats are reasonable
            return immediateRepeatRate < 5 && historyRepeatRate < 50;
        });
    }
    
    // Test secure random vs Math.random
    testSecureRandom() {
        return this.runTest("Secure Random", () => {
            const selector = new RandomSelector(this.testData);
            
            console.log(`Secure random available: ${selector.isSecureRandomAvailable()}`);
            console.log(`Using secure random: ${selector.useSecureRandom}`);
            
            // Test that getSecureRandom returns values between 0 and 1
            for (let i = 0; i < 100; i++) {
                const value = selector.getSecureRandom();
                if (value < 0 || value >= 1) {
                    console.log(`Invalid random value: ${value}`);
                    return false;
                }
            }
            
            // Test that getRandomInt returns integers in the correct range
            for (let i = 0; i < 100; i++) {
                const value = selector.getRandomInt(0, 10);
                if (!Number.isInteger(value) || value < 0 || value >= 10) {
                    console.log(`Invalid random int: ${value}`);
                    return false;
                }
            }
            
            return true;
        });
    }
    
    // Test history management
    testHistoryManagement() {
        return this.runTest("History Management", () => {
            const selector = new RandomSelector(this.testData);
            
            // Test initial state
            if (selector.getRecentHistory().length !== 0) {
                console.log("History should be empty initially");
                return false;
            }
            
            // Add some skills to history
            const skill1 = this.testData[0];
            const skill2 = this.testData[1];
            
            selector.addToHistory(skill1);
            selector.addToHistory(skill2);
            
            const history = selector.getRecentHistory();
            if (history.length !== 2) {
                console.log(`Expected history length 2, got ${history.length}`);
                return false;
            }
            
            if (history[0].name !== skill2.name || history[1].name !== skill1.name) {
                console.log("History order is incorrect");
                return false;
            }
            
            // Test history size limit
            selector.setMaxHistorySize(2);
            selector.addToHistory(this.testData[2]);
            
            const limitedHistory = selector.getRecentHistory();
            if (limitedHistory.length !== 2) {
                console.log(`Expected limited history length 2, got ${limitedHistory.length}`);
                return false;
            }
            
            // Test clear history
            selector.clearHistory();
            if (selector.getRecentHistory().length !== 0) {
                console.log("History should be empty after clearing");
                return false;
            }
            
            return true;
        });
    }
    
    // Test error handling
    testErrorHandling() {
        return this.runTest("Error Handling", () => {
            // Test with empty data
            const emptySelector = new RandomSelector([]);
            
            try {
                emptySelector.selectRandomSkill();
                console.log("Should have thrown error for empty data");
                return false;
            } catch (error) {
                if (!error.message.includes('No skill data available')) {
                    console.log(`Unexpected error message: ${error.message}`);
                    return false;
                }
            }
            
            // Test with invalid history size
            const selector = new RandomSelector(this.testData);
            
            try {
                selector.setMaxHistorySize(-1);
                console.log("Should have thrown error for negative history size");
                return false;
            } catch (error) {
                if (!error.message.includes('non-negative')) {
                    console.log(`Unexpected error message: ${error.message}`);
                    return false;
                }
            }
            
            // Test with invalid skills data update
            try {
                selector.updateSkillsData("not an array");
                console.log("Should have thrown error for invalid skills data");
                return false;
            } catch (error) {
                if (!error.message.includes('must be an array')) {
                    console.log(`Unexpected error message: ${error.message}`);
                    return false;
                }
            }
            
            return true;
        });
    }
    
    // Test statistics and built-in randomness test
    testBuiltInRandomnessTest() {
        return this.runTest("Built-in Randomness Test", () => {
            const selector = new RandomSelector(this.testData);
            
            const stats = selector.testRandomness(1000);
            
            console.log(`Randomness test results:`);
            console.log(`- Expected count: ${stats.expectedCount.toFixed(1)}`);
            console.log(`- Standard deviation: ${stats.standardDeviation.toFixed(2)}`);
            console.log(`- Max deviation: ${stats.maxDeviation.toFixed(1)}`);
            console.log(`- Min count: ${stats.minCount}`);
            console.log(`- Max count: ${stats.maxCount}`);
            console.log(`- Is reasonably random: ${stats.isReasonablyRandom}`);
            
            return stats.isReasonablyRandom;
        });
    }
    
    // Test integration with existing skillsData
    testIntegrationWithSkillsData() {
        return this.runTest("Integration with skillsData", () => {
            // Use actual skillsData if available
            const data = typeof skillsData !== 'undefined' ? skillsData : this.testData;
            const selector = new RandomSelector(data);
            
            // Test that we can select skills from the actual data
            for (let i = 0; i < 10; i++) {
                const skill = selector.selectRandomSkill();
                if (!skill || !skill.name) {
                    console.log(`Failed to select skill on iteration ${i}`);
                    return false;
                }
                
                const isValidSkill = data.some(s => s.name === skill.name);
                if (!isValidSkill) {
                    console.log(`Selected invalid skill: ${skill.name}`);
                    return false;
                }
            }
            
            console.log(`Successfully tested with ${data.length} skills`);
            return true;
        });
    }
    
    // Run all tests
    runAllTests() {
        console.log("🧪 Starting RandomSelector Test Suite");
        console.log("=====================================");
        
        this.testBasicFunctionality();
        this.testRandomnessDistribution();
        this.testRepeatAvoidance();
        this.testSecureRandom();
        this.testHistoryManagement();
        this.testErrorHandling();
        this.testBuiltInRandomnessTest();
        this.testIntegrationWithSkillsData();
        
        console.log("\n=====================================");
        console.log(`📊 Test Results: ${this.passedTests}/${this.totalTests} tests passed`);
        
        if (this.passedTests === this.totalTests) {
            console.log("🎉 All tests passed!");
        } else {
            console.log(`⚠️  ${this.totalTests - this.passedTests} tests failed`);
        }
        
        return this.passedTests === this.totalTests;
    }
}

// Legacy test functions (kept for compatibility)
function testRandomDistribution() {
    console.log("Running legacy random distribution test...");
    
    const testSuite = new RandomSelectorTests();
    testSuite.testRandomnessDistribution();
}

function testRepeatAvoidance() {
    console.log("Running legacy repeat avoidance test...");
    
    const testSuite = new RandomSelectorTests();
    testSuite.testRepeatAvoidance();
}

// Main test runner
function runRandomSelectorTests() {
    const testSuite = new RandomSelectorTests();
    return testSuite.runAllTests();
}

// Auto-run tests in test environment
if (typeof window === 'undefined' || window.location.href.includes('test') || window.location.search.includes('test=true')) {
    console.log("Auto-running RandomSelector tests...");
    runRandomSelectorTests();
}