// Path of Exile Skill Gems Data
const skillsData = [
    {
        name: "Absolution",
        type: "Spell, Minion",
        color: "Blue",
        description: "Deals damage in an area, and summons Sentinels of Absolution if you kill an enemy with it."
    },
    {
        name: "Ambush",
        type: "Attack",
        color: "Green",
        description: "Teleports you to a target and performs a powerful backstab attack."
    },
    {
        name: "Ancestral Cry",
        type: "Warcry",
        color: "Red",
        description: "Performs a warcry, taunting nearby enemies and granting ancestral power to you and your allies."
    },
    {
        name: "Anger",
        type: "Aura, Spell",
        color: "Red",
        description: "Reserves mana to grant you and your allies added fire damage to attacks and spells."
    },
    {
        name: "Animate Weapon",
        type: "Spell, Minion",
        color: "Blue",
        description: "Animates a targeted weapon item, causing it to fight for you."
    },
    {
        name: "Arc",
        type: "Spell, Chaining",
        color: "Blue",
        description: "Lightning spell that chains between nearby enemies."
    },
    {
        name: "Arcane Cloak",
        type: "Spell, Guard",
        color: "Blue",
        description: "Spends mana to create a protective ward, adding to energy shield and granting added damage."
    },
    {
        name: "Arcanist Brand",
        type: "Spell, Brand",
        color: "Blue",
        description: "Creates a brand that attaches to enemies and triggers linked spells."
    },
    {
        name: "Arctic Armour",
        type: "Spell, Aura",
        color: "Blue",
        description: "Reserves mana to create an icy shield that reduces fire and physical damage taken."
    },
    {
        name: "Armageddon Brand",
        type: "Spell, Brand",
        color: "Blue",
        description: "Creates a brand that attaches to enemies and periodically calls down a fiery meteor."
    },
    {
        name: "Artillery Ballista",
        type: "Attack, Totem",
        color: "Green",
        description: "Creates a ballista totem that fires explosive arrows at enemies."
    },
    {
        name: "Autoexertion",
        type: "Utility",
        color: "Red",
        description: "Automatically exerts your next few attacks, granting them additional effects."
    },
    {
        name: "Automation",
        type: "Utility",
        color: "Green",
        description: "Automates certain actions or skills."
    },
    {
        name: "Ball Lightning",
        type: "Spell, Projectile",
        color: "Blue",
        description: "Fires a slow-moving ball of lightning that repeatedly damages enemies it passes near."
    },
    {
        name: "Bane",
        type: "Spell, Chaos, AoE",
        color: "Blue",
        description: "Deals chaos damage in an area and applies linked curses to enemies."
    },
    {
        name: "Barrage",
        type: "Attack, Projectile",
        color: "Green",
        description: "Fires a series of projectiles in quick succession at a single target."
    },
    {
        name: "Bear Trap",
        type: "Trap",
        color: "Green",
        description: "Throws a trap that immobilizes a single enemy and causes them to take increased damage."
    },
    {
        name: "Blade Blast",
        type: "Spell, AoE",
        color: "Blue",
        description: "Detonates lingering blades created by Blade Vortex, Ethereal Knives, or Bladefall."
    },
    {
        name: "Blade Flurry",
        type: "Attack, Channelling",
        color: "Green",
        description: "Channels to repeatedly hit enemies in a cone in front of you, building up stages for a powerful final hit."
    },
    {
        name: "Blade Trap",
        type: "Trap",
        color: "Green",
        description: "Throws a trap that triggers to create spinning blades that damage nearby enemies."
    },
    {
        name: "Blade Vortex",
        type: "Spell, AoE",
        color: "Blue",
        description: "Creates spinning ethereal blades around you that repeatedly hit nearby enemies."
    },
    {
        name: "Bladefall",
        type: "Spell, AoE",
        color: "Blue",
        description: "Causes ethereal blades to rain down in an area, dealing physical damage."
    },
    {
        name: "Bladestorm",
        type: "Attack, AoE",
        color: "Red",
        description: "Creates a storm of blades at your location and where you hit enemies, dealing damage over time."
    },
    {
        name: "Blast Rain",
        type: "Attack, AoE",
        color: "Green",
        description: "Fires arrows into the air that rain down in an area, each exploding and dealing AoE damage."
    },
    {
        name: "Blazing Salvo",
        type: "Spell, Projectile",
        color: "Blue",
        description: "Launches a series of fiery projectiles that impact in a targeted area."
    }
];

// This is a partial list. In a real implementation, you would include all skill gems.
// For brevity, only the first 25 skills are fully detailed here.
// The complete list would include all skills with their metadata.

// Function to get all skill names
function getAllSkillNames() {
    return skillsData.map(skill => skill.name);
}

// Function to get skill by name
function getSkillByName(name) {
    return skillsData.find(skill => skill.name === name);
}

// Additional skill gems (names only for now)
const additionalSkills = [
    "Blight", "Boneshatter", "Brand Recall", "Burning Arrow", "Caustic Arrow", 
    "Chain Hook", "Charged Dash", "Clarity", "Cleave", "Cobra Lash", 
    "Cold Snap", "Conductivity", "Consecrated Path", "Contagion", "Conversion Trap", 
    "Corrupting Fever", "Crackling Lance", "Creeping Frost", "Cremation", "Crushing Fist", 
    "Cyclone", "Dark Pact", "Detonate Dead", "Devouring Totem", "Discharge", 
    "Discipline", "Divine Ire", "Divine Retribution", "Dominating Blow", "Double Strike", 
    "Dual Strike", "Earthquake", "Earthshatter", "Elemental Hit", "Elemental Weakness", 
    "Enduring Cry", "Energy Blade", "Ensnaring Arrow", "Essence Drain", "Ethereal Knives", 
    "Eviscerate", "Explosive Arrow", "Explosive Concoction", "Explosive Trap", "Exsanguinate", 
    "Eye of Winter", "Fire Trap", "Fireball", "Firestorm", "Flame Dash", 
    "Flame Link", "Flame Surge", "Flame Wall", "Flameblast", "Flamethrower Trap", 
    "Flicker Strike", "Forbidden Rite", "Freezing Pulse", "Frost Blades", "Frost Bomb", 
    "Frost Shield", "Frost Wall", "Frostbite", "Frostblink", "Frostbolt", 
    "Frozen Legion", "Galvanic Arrow", "Galvanic Field", "Glacial Cascade", "Glacial Hammer", 
    "Glacial Shield Swipe", "Ground Slam", "Heavy Strike", "Hexblast", "Holy Flame Totem", 
    "Hydrosphere", "Ice Crash", "Ice Nova", "Ice Shot", "Ice Spear", 
    "Ice Trap", "Icicle Mine", "Incinerate", "Infernal Blow", "Intuitive Link", 
    "Kinetic Blast", "Kinetic Bolt", "Lacerate", "Lancing Steel", "Leap Slam", 
    "Lightning Arrow", "Lightning Conduit", "Lightning Spire Trap", "Lightning Strike", "Lightning Tendrils", 
    "Lightning Trap", "Lightning Warp", "Manabond", "Mirror Arrow", "Molten Shell", 
    "Molten Strike", "Orb of Storms", "Penance Brand", "Perforate", "Pestilent Strike", 
    "Plague Bearer", "Poisonous Concoction", "Power Siphon", "Puncture", "Punishment", 
    "Purifying Flame", "Pyroclast Mine", "Rage Vortex", "Rain of Arrows", "Raise Spectre", 
    "Raise Zombie", "Reap", "Reave", "Righteous Fire", "Rolling Magma", 
    "Scorching Ray", "Scourge Arrow", "Searing Bond", "Seismic Cry", "Seismic Trap", 
    "Shattering Steel", "Shield Charge", "Shield Crush", "Shock Nova", "Shockwave Totem", 
    "Shrapnel Ballista", "Siege Ballista", "Sigil of Power", "Siphoning Trap", "Smite", 
    "Smoke Mine", "Snipe", "Soulrend", "Spark", "Spectral Helix", 
    "Spectral Shield Throw", "Spectral Throw", "Spellslinger", "Spirit Offering", "Split Arrow", 
    "Splitting Steel", "Static Strike", "Storm Brand", "Storm Burst", "Storm Call", 
    "Storm Rain", "Stormbind", "Stormblast Mine", "Summon Carrion Golem", "Summon Chaos Golem", 
    "Summon Flame Golem", "Summon Holy Relic", "Summon Ice Golem", "Summon Lightning Golem", "Summon Raging Spirit", 
    "Summon Reaper", "Summon Skeletons", "Summon Stone Golem", "Sunder", "Sweep", 
    "Swordstorm", "Tectonic Slam", "Temporal Chains", "Temporal Rift", "Tornado", 
    "Tornado Shot", "Toxic Rain", "Unearth", "Vaal Venom Gyre", "Venom Gyre", 
    "Vigilant Strike", "Viper Strike", "Void Sphere", "Volatile Dead", "Volcanic Fissure", 
    "Voltaxic Burst", "Vortex", "Wave of Conviction", "Whirling Blades", "Wild Strike", 
    "Winter Orb", "Wintertide Brand"
];

// Add additional skills to the skillsData array with minimal information
additionalSkills.forEach(skillName => {
    // Check if the skill is already in the data
    if (!skillsData.some(skill => skill.name === skillName)) {
        skillsData.push({
            name: skillName
            // Type, color, and description are omitted for brevity
            // In a complete implementation, you would add this metadata
        });
    }
});