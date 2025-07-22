// Random Selection Algorithm for Path of Exile Skill Gems
class RandomSelector {
    constructor(skillsData = []) {
        this.skillsData = skillsData;
        this.recentHistory = [];
        this.maxHistorySize = 5; // Avoid repeating last 5 selections
        this.useSecureRandom = this.isSecureRandomAvailable();
    }
    
    // Check if secure random is available
    isSecureRandomAvailable() {
        return typeof window !== 'undefined' && 
               window.crypto && 
               typeof window.crypto.getRandomValues === 'function';
    }
    
    // Generate a secure random number between 0 and 1
    getSecureRandom() {
        if (this.useSecureRandom) {
            const array = new Uint32Array(1);
            window.crypto.getRandomValues(array);
            return array[0] / (0xFFFFFFFF + 1);
        } else {
            return Math.random();
        }
    }
    
    // Generate a random integer between min (inclusive) and max (exclusive)
    getRandomInt(min, max) {
        const randomValue = this.getSecureRandom();
        return Math.floor(randomValue * (max - min)) + min;
    }
    
    // Select a random skill gem from the array
    selectRandomSkill(excludeRecent = true) {
        if (!this.skillsData || this.skillsData.length === 0) {
            throw new Error('No skill data available for random selection');
        }
        
        // If we only have one skill, return it
        if (this.skillsData.length === 1) {
            const skill = this.skillsData[0];
            this.addToHistory(skill);
            return skill;
        }
        
        let availableSkills = this.skillsData;
        
        // Filter out recently selected skills if requested and if we have enough skills
        if (excludeRecent && this.recentHistory.length > 0) {
            const filteredSkills = this.skillsData.filter(skill => 
                !this.isInRecentHistory(skill)
            );
            
            // Only use filtered list if we have enough skills remaining
            // Keep at least 50% of skills available to avoid infinite loops
            if (filteredSkills.length >= Math.max(1, Math.floor(this.skillsData.length * 0.5))) {
                availableSkills = filteredSkills;
            }
        }
        
        // Select random skill from available skills
        const randomIndex = this.getRandomInt(0, availableSkills.length);
        const selectedSkill = availableSkills[randomIndex];
        
        // Add to history
        this.addToHistory(selectedSkill);
        
        return selectedSkill;
    }
    
    // Add a skill to the recent history
    addToHistory(skill) {
        if (!skill) return;
        
        // Remove the skill if it's already in history (move to front)
        this.recentHistory = this.recentHistory.filter(
            historySkill => historySkill.name !== skill.name
        );
        
        // Add to the beginning of history
        this.recentHistory.unshift(skill);
        
        // Maintain maximum history size
        if (this.recentHistory.length > this.maxHistorySize) {
            this.recentHistory = this.recentHistory.slice(0, this.maxHistorySize);
        }
    }
    
    // Check if a skill is in recent history
    isInRecentHistory(skill) {
        if (!skill || this.recentHistory.length === 0) return false;
        
        return this.recentHistory.some(
            historySkill => historySkill.name === skill.name
        );
    }
    
    // Get the recent history
    getRecentHistory() {
        return [...this.recentHistory]; // Return a copy
    }
    
    // Clear the recent history
    clearHistory() {
        this.recentHistory = [];
    }
    
    // Set the maximum history size
    setMaxHistorySize(size) {
        if (size < 0) {
            throw new Error('History size must be non-negative');
        }
        
        this.maxHistorySize = size;
        
        // Trim current history if needed
        if (this.recentHistory.length > this.maxHistorySize) {
            this.recentHistory = this.recentHistory.slice(0, this.maxHistorySize);
        }
    }
    
    // Update the skills data
    updateSkillsData(newSkillsData) {
        if (!Array.isArray(newSkillsData)) {
            throw new Error('Skills data must be an array');
        }
        
        this.skillsData = newSkillsData;
        
        // Clean up history - remove skills that no longer exist
        this.recentHistory = this.recentHistory.filter(historySkill =>
            this.skillsData.some(skill => skill.name === historySkill.name)
        );
    }
    
    // Get statistics about the random selection
    getStats() {
        return {
            totalSkills: this.skillsData.length,
            historySize: this.recentHistory.length,
            maxHistorySize: this.maxHistorySize,
            availableSkills: this.skillsData.length - this.recentHistory.length,
            useSecureRandom: this.useSecureRandom
        };
    }
    
    // Test the randomness of the selection algorithm
    testRandomness(iterations = 1000) {
        if (this.skillsData.length === 0) {
            throw new Error('No skills available for testing');
        }
        
        const counts = {};
        const originalHistory = [...this.recentHistory];
        
        // Initialize counts
        this.skillsData.forEach(skill => {
            counts[skill.name] = 0;
        });
        
        // Clear history for testing
        this.clearHistory();
        
        // Run iterations
        for (let i = 0; i < iterations; i++) {
            const skill = this.selectRandomSkill(false); // Don't exclude recent for pure randomness test
            counts[skill.name]++;
        }
        
        // Restore original history
        this.recentHistory = originalHistory;
        
        // Calculate statistics
        const expectedCount = iterations / this.skillsData.length;
        let totalDeviation = 0;
        let maxDeviation = 0;
        let minCount = Infinity;
        let maxCount = 0;
        
        Object.values(counts).forEach(count => {
            const deviation = Math.abs(count - expectedCount);
            totalDeviation += Math.pow(deviation, 2);
            maxDeviation = Math.max(maxDeviation, deviation);
            minCount = Math.min(minCount, count);
            maxCount = Math.max(maxCount, count);
        });
        
        const standardDeviation = Math.sqrt(totalDeviation / this.skillsData.length);
        
        return {
            iterations,
            expectedCount,
            standardDeviation,
            maxDeviation,
            minCount,
            maxCount,
            counts,
            isReasonablyRandom: standardDeviation < expectedCount * 0.5 // Arbitrary threshold
        };
    }
}

// Export for use in other modules (Node.js)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RandomSelector;
}

// Make available globally (Browser)
if (typeof window !== 'undefined') {
    window.RandomSelector = RandomSelector;
} else if (typeof global !== 'undefined') {
    global.RandomSelector = RandomSelector;
}