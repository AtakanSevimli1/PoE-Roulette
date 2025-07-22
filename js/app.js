// Main application logic
document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const generateBtn = document.getElementById('generate-btn');
    const skillDisplay = document.getElementById('skill-display');
    const skillName = document.getElementById('skill-name');
    const skillType = document.getElementById('skill-type');
    const skillColor = document.getElementById('skill-color');
    const skillDescription = document.getElementById('skill-description');
    
    // Initialize data service
    const dataService = new SkillDataService(skillsData);
    
    // Application state
    const state = {
        currentSkill: null,
        history: [],
        historyMaxSize: 5, // Remember the last 5 skills to avoid repeats
        isLoading: false,  // Loading state flag
        initialized: false // Flag to track if we've loaded data
    };
    
    // Event listeners
    generateBtn.addEventListener('click', handleGenerateClick);
    
    // Add keyboard shortcut support
    document.addEventListener('keydown', (event) => {
        // Space bar to generate new skill
        if (event.code === 'Space' && 
            !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
            event.preventDefault();
            handleGenerateClick();
        }
    });
    
    // Handle click on generate button
    function handleGenerateClick() {
        if (state.isLoading) return; // Prevent multiple clicks while loading
        
        setLoading(true);
        
        // Simulate a small delay for better UX
        setTimeout(() => {
            try {
                generateRandomSkill();
            } catch (error) {
                handleError(error);
            } finally {
                setLoading(false);
            }
        }, 300);
    }
    
    // Set loading state
    function setLoading(isLoading) {
        state.isLoading = isLoading;
        
        if (isLoading) {
            generateBtn.classList.add('loading');
            generateBtn.setAttribute('disabled', 'disabled');
            generateBtn.innerHTML = 'Generating<span class="loading-dots">...</span>';
        } else {
            generateBtn.classList.remove('loading');
            generateBtn.removeAttribute('disabled');
            generateBtn.textContent = 'Generate Random Skill';
        }
    }
    
    // Handle errors
    function handleError(error) {
        console.error('Error generating random skill:', error);
        
        // Show error message to user
        skillName.textContent = 'Error';
        skillDescription.textContent = 'Failed to generate a random skill. Please try again.';
        skillDescription.style.display = 'block';
        skillType.style.display = 'none';
        skillColor.style.display = 'none';
        
        // Show the skill display if it's hidden
        if (skillDisplay.classList.contains('hidden')) {
            skillDisplay.classList.remove('hidden');
        }
    }
    
    // Generate random skill function
    function generateRandomSkill() {
        try {
            // Check if we have skill data
            const allSkills = dataService.getAllSkills();
            if (!allSkills || allSkills.length === 0) {
                throw new Error('No skill data available');
            }
            
            // Get random skill from the skills array
            const randomSkill = getRandomSkill();
            
            // Update application state
            if (state.currentSkill) {
                // Add current skill to history before updating
                addToHistory(state.currentSkill);
            }
            state.currentSkill = randomSkill;
            
            // Update UI with the selected skill
            updateSkillDisplay(randomSkill);
            
            // Show the skill display if it's hidden
            if (skillDisplay.classList.contains('hidden')) {
                skillDisplay.classList.remove('hidden');
            }
            
            // Add animation effect
            skillDisplay.classList.add('skill-animation');
            setTimeout(() => {
                skillDisplay.classList.remove('skill-animation');
            }, 500);
            
            // Mark as initialized
            if (!state.initialized) {
                state.initialized = true;
            }
            
            // Save to local storage for persistence
            saveToLocalStorage();
            
            return true;
        } catch (error) {
            console.error('Error in generateRandomSkill:', error);
            handleError(error);
            return false;
        }
    }
    
    // Add a skill to the history
    function addToHistory(skill) {
        state.history.unshift(skill); // Add to the beginning
        
        // Keep history at max size
        if (state.history.length > state.historyMaxSize) {
            state.history.pop(); // Remove the oldest entry
        }
    }
    
    // Check if a skill is in the recent history
    function isInHistory(skill) {
        return state.history.some(historicSkill => historicSkill.name === skill.name);
    }
    
    // Get random skill from the skills array
    function getRandomSkill() {
        try {
            // Use the data service to get a random skill that's not in history
            return dataService.getRandomSkill(state.history);
        } catch (error) {
            console.error('Error getting random skill:', error);
            
            // Fallback to basic random selection if data service fails
            if (skillsData && skillsData.length > 0) {
                const randomIndex = Math.floor(Math.random() * skillsData.length);
                return skillsData[randomIndex];
            } else {
                throw new Error('No skill data available');
            }
        }
    }
    
    // Update the UI with the selected skill
    function updateSkillDisplay(skill) {
        skillName.textContent = skill.name;
        
        // Reset any previous color classes
        skillName.className = '';
        
        // Update additional info if available
        if (skill.type) {
            skillType.textContent = `Type: ${skill.type}`;
            skillType.style.display = 'block';
        } else {
            skillType.style.display = 'none';
        }
        
        if (skill.color) {
            skillColor.textContent = `Gem Color: ${skill.color}`;
            skillColor.style.display = 'block';
            
            // Add color class to the skill name
            if (skill.color.toLowerCase().includes('red')) {
                skillName.classList.add('gem-red');
            } else if (skill.color.toLowerCase().includes('green')) {
                skillName.classList.add('gem-green');
            } else if (skill.color.toLowerCase().includes('blue')) {
                skillName.classList.add('gem-blue');
            }
        } else {
            skillColor.style.display = 'none';
        }
        
        if (skill.description) {
            skillDescription.textContent = skill.description;
            skillDescription.style.display = 'block';
        } else {
            skillDescription.style.display = 'none';
        }
        
        // Set focus to the skill name for accessibility
        skillName.focus();
        
        // Update page title with the skill name
        document.title = `${skill.name} - Path of Exile Random Skill Selector`;
    }
    
    // Save state to local storage
    function saveToLocalStorage() {
        try {
            const dataToSave = {
                currentSkill: state.currentSkill,
                history: state.history
            };
            localStorage.setItem('poe-skill-selector', JSON.stringify(dataToSave));
        } catch (error) {
            console.warn('Failed to save to local storage:', error);
        }
    }
    
    // Load state from local storage
    function loadFromLocalStorage() {
        try {
            const savedData = localStorage.getItem('poe-skill-selector');
            if (savedData) {
                const parsedData = JSON.parse(savedData);
                if (parsedData.currentSkill) {
                    state.currentSkill = parsedData.currentSkill;
                    updateSkillDisplay(state.currentSkill);
                    skillDisplay.classList.remove('hidden');
                }
                if (parsedData.history && Array.isArray(parsedData.history)) {
                    state.history = parsedData.history.slice(0, state.historyMaxSize);
                }
                state.initialized = true;
            }
        } catch (error) {
            console.warn('Failed to load from local storage:', error);
        }
    }
    
    // Fisher-Yates shuffle algorithm for truly random array shuffling
    // This can be used if we want to implement a "shuffle all" feature in the future
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            // Use crypto random if available
            let j;
            if (window.crypto && window.crypto.getRandomValues) {
                const array = new Uint32Array(1);
                window.crypto.getRandomValues(array);
                j = array[0] % (i + 1);
            } else {
                j = Math.floor(Math.random() * (i + 1));
            }
            
            // Swap elements
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    // Initialize the application
    function init() {
        // Try to load previous state
        loadFromLocalStorage();
        
        // If we don't have a current skill, generate one automatically
        if (!state.currentSkill && skillsData && skillsData.length > 0) {
            // Don't auto-generate on first visit, wait for user to click
            // generateRandomSkill();
        }
    }
    
    // Run initialization
    init();
});