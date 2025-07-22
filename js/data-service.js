// Data service for managing skill gem data
class SkillDataService {
    constructor(skillsData) {
        this.rawData = skillsData || [];
        this.processedData = [];
        this.initialize();
    }
    
    // Initialize the data service
    initialize() {
        if (!this.rawData || !Array.isArray(this.rawData) || this.rawData.length === 0) {
            console.error('Invalid or empty skills data provided');
            return;
        }
        
        // Process and validate the data
        this.processedData = this.rawData.map(skill => this.validateSkill(skill));
        
        console.log(`Initialized SkillDataService with ${this.processedData.length} skills`);
    }
    
    // Validate and normalize a skill object
    validateSkill(skill) {
        if (!skill) return null;
        
        // Create a new object with validated properties
        const validatedSkill = {
            name: this.validateSkillName(skill.name),
            type: skill.type || '',
            color: this.normalizeColor(skill.color),
            description: skill.description || ''
        };
        
        return validatedSkill;
    }
    
    // Validate skill name
    validateSkillName(name) {
        if (!name || typeof name !== 'string') {
            return 'Unknown Skill';
        }
        return name.trim();
    }
    
    // Normalize color value
    normalizeColor(color) {
        if (!color) return '';
        
        const normalizedColor = color.toLowerCase().trim();
        
        // Map variations to standard colors
        if (normalizedColor.includes('red') || normalizedColor.includes('strength')) {
            return 'Red';
        } else if (normalizedColor.includes('green') || normalizedColor.includes('dexterity')) {
            return 'Green';
        } else if (normalizedColor.includes('blue') || normalizedColor.includes('intelligence')) {
            return 'Blue';
        }
        
        return color;
    }
    
    // Get all skills
    getAllSkills() {
        return this.processedData.filter(skill => skill !== null);
    }
    
    // Get skill by name
    getSkillByName(name) {
        if (!name) return null;
        
        return this.processedData.find(skill => 
            skill && skill.name.toLowerCase() === name.toLowerCase()
        );
    }
    
    // Get random skill
    getRandomSkill(excludeList = []) {
        if (this.processedData.length === 0) {
            throw new Error('No skill data available');
        }
        
        // If exclude list is too large, just return any random skill
        if (excludeList.length >= this.processedData.length - 1) {
            const randomIndex = Math.floor(Math.random() * this.processedData.length);
            return this.processedData[randomIndex];
        }
        
        // Filter out excluded skills
        const availableSkills = this.processedData.filter(skill => 
            !excludeList.some(excludedSkill => 
                excludedSkill && skill && excludedSkill.name === skill.name
            )
        );
        
        // Get random skill from available skills
        const randomIndex = Math.floor(Math.random() * availableSkills.length);
        return availableSkills[randomIndex];
    }
    
    // Get skills by type
    getSkillsByType(type) {
        if (!type) return [];
        
        return this.processedData.filter(skill => 
            skill && skill.type && skill.type.toLowerCase().includes(type.toLowerCase())
        );
    }
    
    // Get skills by color
    getSkillsByColor(color) {
        if (!color) return [];
        
        const normalizedColor = this.normalizeColor(color);
        return this.processedData.filter(skill => 
            skill && skill.color === normalizedColor
        );
    }
    
    // Search skills by name
    searchSkills(query) {
        if (!query) return [];
        
        const normalizedQuery = query.toLowerCase().trim();
        return this.processedData.filter(skill => 
            skill && skill.name.toLowerCase().includes(normalizedQuery)
        );
    }
}