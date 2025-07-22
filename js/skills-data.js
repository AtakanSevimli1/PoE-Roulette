// Path of Exile Skill Gems Data - Active Damage Skills Only
const skillsData = [
    {
        name: "Absolution",
        type: "Spell, Minion",
        color: "Blue",
        description: "Deals damage in an area, and summons Sentinels of Absolution if you kill an enemy with it."
    },
    {
        name: "Animate Weapon",
        type: "Spell, Minion",
        color: "Blue",
        description: "Animates a targeted weapon item, causing it to fight for you."
    },
    {
        name: "Arc",
        type: "Spell, Lightning",
        color: "Blue",
        description: "Lightning spell that chains between nearby enemies."
    },
    {
        name: "Armageddon Brand",
        type: "Spell, Brand, Fire",
        color: "Blue",
        description: "Creates a brand that attaches to enemies and periodically calls down a fiery meteor."
    },
    {
        name: "Artillery Ballista",
        type: "Attack, Totem, Bow",
        color: "Green",
        description: "Creates a ballista totem that fires explosive arrows at enemies."
    },
    {
        name: "Ball Lightning",
        type: "Spell, Projectile, Lightning",
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
        type: "Attack, Projectile, Bow",
        color: "Green",
        description: "Fires a series of projectiles in quick succession at a single target."
    },
    {
        name: "Bear Trap",
        type: "Trap, Physical",
        color: "Green",
        description: "Throws a trap that immobilizes a single enemy and causes them to take increased damage."
    },
    {
        name: "Blade Blast",
        type: "Spell, AoE, Physical",
        color: "Blue",
        description: "Detonates lingering blades created by Blade Vortex, Ethereal Knives, or Bladefall."
    },
    {
        name: "Blade Flurry",
        type: "Attack, Channelling, Melee",
        color: "Green",
        description: "Channels to repeatedly hit enemies in a cone in front of you, building up stages for a powerful final hit."
    },
    {
        name: "Blade Trap",
        type: "Trap, Physical",
        color: "Green",
        description: "Throws a trap that triggers to create spinning blades that damage nearby enemies."
    },
    {
        name: "Blade Vortex",
        type: "Spell, AoE, Physical",
        color: "Blue",
        description: "Creates spinning ethereal blades around you that repeatedly hit nearby enemies."
    },
    {
        name: "Bladefall",
        type: "Spell, AoE, Physical",
        color: "Blue",
        description: "Causes ethereal blades to rain down in an area, dealing physical damage."
    },
    {
        name: "Bladestorm",
        type: "Attack, AoE, Melee",
        color: "Red",
        description: "Creates a storm of blades at your location and where you hit enemies, dealing damage over time."
    },
    {
        name: "Blast Rain",
        type: "Attack, AoE, Bow",
        color: "Green",
        description: "Fires arrows into the air that rain down in an area, each exploding and dealing AoE damage."
    },
    {
        name: "Blazing Salvo",
        type: "Spell, Projectile, Fire",
        color: "Blue",
        description: "Launches a series of fiery projectiles that impact in a targeted area."
    },
    {
        name: "Blight",
        type: "Spell, Chaos, Channelling",
        color: "Blue",
        description: "Channels to deal chaos damage over time to enemies in a cone."
    },
    {
        name: "Boneshatter",
        type: "Attack, Melee, Strike",
        color: "Red",
        description: "Attacks with your weapon, applying a stacking debuff that deals damage over time."
    },
    {
        name: "Burning Arrow",
        type: "Attack, Projectile, Fire, Bow",
        color: "Green",
        description: "Fires a burning arrow that deals fire damage and ignites enemies."
    },
    {
        name: "Caustic Arrow",
        type: "Attack, Projectile, AoE, Chaos, Bow",
        color: "Green",
        description: "Fires an arrow that creates a caustic cloud dealing chaos damage over time."
    },
    {
        name: "Chain Hook",
        type: "Attack, Melee, Strike",
        color: "Red",
        description: "Throws a chain that pulls you to the enemy and performs a melee attack."
    },
    {
        name: "Charged Dash",
        type: "Attack, AoE, Movement, Lightning, Melee",
        color: "Red",
        description: "Charges up while moving, then releases lightning damage in an area."
    },
    {
        name: "Cleave",
        type: "Attack, AoE, Melee",
        color: "Red",
        description: "Attacks enemies in a cone in front of you with melee weapons."
    },
    {
        name: "Cobra Lash",
        type: "Attack, Projectile, Chaos",
        color: "Green",
        description: "Throws a projectile that chains between enemies, dealing chaos damage."
    },
    {
        name: "Cold Snap",
        type: "Spell, AoE, Cold",
        color: "Blue",
        description: "Creates an expanding area of cold that deals damage and chills enemies."
    },
    {
        name: "Consecrated Path",
        type: "Attack, AoE, Melee, Fire, Strike",
        color: "Red",
        description: "Teleports to a location and attacks, creating consecrated ground."
    },
    {
        name: "Contagion",
        type: "Spell, AoE, Chaos",
        color: "Blue",
        description: "Deals chaos damage over time and spreads when enemies die."
    },
    {
        name: "Conversion Trap",
        type: "Trap, Minion",
        color: "Green",
        description: "Throws a trap that converts enemies to fight for you temporarily."
    },
    {
        name: "Corrupting Fever",
        type: "Spell, Physical",
        color: "Red",
        description: "Grants a buff that causes attacks to inflict bleeding that deals more damage."
    },
    {
        name: "Crackling Lance",
        type: "Spell, Lightning",
        color: "Blue",
        description: "Releases a lance of lightning that becomes more powerful with intensity."
    },
    {
        name: "Creeping Frost",
        type: "Spell, Projectile, AoE, Cold",
        color: "Blue",
        description: "Fires a projectile that creates expanding areas of cold damage."
    },
    {
        name: "Cremation",
        type: "Spell, AoE, Fire, Projectile",
        color: "Blue",
        description: "Creates a geyser that fires projectiles at nearby enemies."
    },
    {
        name: "Crushing Fist",
        type: "Attack, Melee, Strike, AoE",
        color: "Red",
        description: "Performs a powerful unarmed attack that deals area damage."
    },
    {
        name: "Cyclone",
        type: "Attack, AoE, Movement, Channelling, Melee",
        color: "Red",
        description: "Channels to spin continuously, dealing damage to nearby enemies."
    },
    {
        name: "Dark Pact",
        type: "Spell, AoE, Chaos",
        color: "Blue",
        description: "Sacrifices life or minions to deal chaos damage in an area."
    },
    {
        name: "Detonate Dead",
        type: "Spell, AoE, Fire",
        color: "Blue",
        description: "Detonates corpses, dealing fire damage based on their life."
    },
    {
        name: "Devouring Totem",
        type: "Totem, Spell",
        color: "Blue",
        description: "Summons a totem that consumes nearby corpses to recover your life and mana."
    },
    {
        name: "Discharge",
        type: "Spell, AoE, Fire, Cold, Lightning",
        color: "Blue",
        description: "Consumes power, frenzy, and endurance charges to deal elemental damage."
    },
    {
        name: "Divine Ire",
        type: "Spell, AoE, Lightning, Physical, Channelling",
        color: "Blue",
        description: "Channels to build up stages, then releases a powerful beam."
    },
    {
        name: "Dominating Blow",
        type: "Attack, Melee, Strike, Minion",
        color: "Red",
        description: "Attacks enemies and converts them into minions when killed."
    },
    {
        name: "Double Strike",
        type: "Attack, Melee, Strike",
        color: "Red",
        description: "Performs two quick strikes with melee weapons."
    },
    {
        name: "Dual Strike",
        type: "Attack, Melee, Strike",
        color: "Red",
        description: "Attacks with both weapons simultaneously when dual wielding."
    },
    {
        name: "Earthquake",
        type: "Attack, AoE, Melee, Slam",
        color: "Red",
        description: "Slams the ground, creating an earthquake that deals damage in two stages."
    },
    {
        name: "Earthshatter",
        type: "Attack, AoE, Slam, Melee",
        color: "Red",
        description: "Slams the ground to create spikes that can be detonated by warcries."
    },
    {
        name: "Elemental Hit",
        type: "Attack, Projectile, Bow",
        color: "Green",
        description: "Each attack randomly deals fire, cold, or lightning damage."
    },
    {
        name: "Energy Blade",
        type: "Spell, Lightning",
        color: "Blue",
        description: "Converts energy shield into a lightning-based weapon."
    },
    {
        name: "Ensnaring Arrow",
        type: "Attack, Projectile, AoE, Bow",
        color: "Green",
        description: "Fires an arrow that creates a rope, slowing and damaging enemies."
    },
    {
        name: "Essence Drain",
        type: "Spell, Projectile, Chaos",
        color: "Blue",
        description: "Fires a projectile that deals chaos damage over time."
    },
    {
        name: "Ethereal Knives",
        type: "Spell, Projectile, Physical",
        color: "Blue",
        description: "Fires ethereal knives in a spread pattern."
    },
    {
        name: "Eviscerate",
        type: "Attack, Melee, Strike",
        color: "Red",
        description: "Performs a vicious melee attack with increased critical strike chance."
    },
    {
        name: "Explosive Arrow",
        type: "Attack, Projectile, AoE, Fire, Bow",
        color: "Green",
        description: "Fires arrows that stick to enemies and explode after a delay."
    },
    {
        name: "Explosive Concoction",
        type: "Attack, AoE, Fire",
        color: "Green",
        description: "Throws a bottle that explodes, dealing fire damage in an area."
    },
    {
        name: "Explosive Trap",
        type: "Trap, Spell, AoE, Fire",
        color: "Green",
        description: "Throws a trap that explodes, dealing fire damage in an area."
    },
    {
        name: "Exsanguinate",
        type: "Spell, Projectile, Physical",
        color: "Blue",
        description: "Fires projectiles that chain and deal physical damage over time."
    },
    {
        name: "Eye of Winter",
        type: "Spell, Projectile, Cold",
        color: "Blue",
        description: "Fires a slow projectile that fires additional projectiles as it travels."
    },
    {
        name: "Fire Trap",
        type: "Trap, Spell, AoE, Fire",
        color: "Green",
        description: "Throws a trap that explodes in a burst of fire."
    },
    {
        name: "Fireball",
        type: "Spell, Projectile, AoE, Fire",
        color: "Blue",
        description: "Launches a fireball that explodes on impact."
    },
    {
        name: "Firestorm",
        type: "Spell, AoE, Fire",
        color: "Blue",
        description: "Calls down a storm of fire that rains down in an area."
    },
    {
        name: "Flame Dash",
        type: "Spell, Movement, Fire",
        color: "Blue",
        description: "Teleports through flames, dealing fire damage at the destination."
    },
    {
        name: "Flame Surge",
        type: "Spell, AoE, Fire",
        color: "Blue",
        description: "Creates a surge of flame that deals more damage to burning enemies."
    },
    {
        name: "Flame Wall",
        type: "Spell, AoE, Fire",
        color: "Blue",
        description: "Creates a wall of fire that damages enemies and enhances projectiles."
    },
    {
        name: "Flameblast",
        type: "Spell, AoE, Fire, Channelling",
        color: "Blue",
        description: "Channels to create an expanding circle of fire that explodes."
    },
    {
        name: "Flamethrower Trap",
        type: "Trap, Spell, AoE, Fire",
        color: "Green",
        description: "Throws a trap that creates a continuous stream of fire."
    },
    {
        name: "Flicker Strike",
        type: "Attack, Melee, Strike, Movement",
        color: "Red",
        description: "Teleports to a nearby enemy and attacks."
    },
    {
        name: "Forbidden Rite",
        type: "Spell, AoE, Chaos",
        color: "Blue",
        description: "Deals chaos damage to enemies and yourself in an area."
    },
    {
        name: "Freezing Pulse",
        type: "Spell, Projectile, Cold",
        color: "Blue",
        description: "Fires icy projectiles that slow enemies and deal more damage at close range."
    },
    {
        name: "Frost Blades",
        type: "Attack, Projectile, Melee, Strike, Cold",
        color: "Green",
        description: "Attacks with melee weapons, creating icy projectiles."
    },
    {
        name: "Frost Bomb",
        type: "Spell, AoE, Cold",
        color: "Blue",
        description: "Creates a crystal that explodes after a delay, dealing cold damage."
    },
    {
        name: "Frostblink",
        type: "Spell, Movement, Cold",
        color: "Blue",
        description: "Teleports to a location, dealing cold damage at origin and destination."
    },
    {
        name: "Frostbolt",
        type: "Spell, Projectile, Cold",
        color: "Blue",
        description: "Fires slow-moving projectiles that pierce and deal cold damage."
    },
    {
        name: "Galvanic Arrow",
        type: "Attack, Projectile, Lightning, Bow",
        color: "Green",
        description: "Fires an arrow that deals lightning damage and creates shocked ground."
    },
    {
        name: "Galvanic Field",
        type: "Spell, AoE, Lightning",
        color: "Blue",
        description: "Creates a field of lightning that damages enemies over time."
    },
    {
        name: "Glacial Cascade",
        type: "Spell, AoE, Cold, Physical",
        color: "Blue",
        description: "Creates a cascade of ice that deals cold and physical damage."
    },
    {
        name: "Glacial Hammer",
        type: "Attack, Melee, Strike, Cold",
        color: "Red",
        description: "Attacks with melee weapons, dealing cold damage and potentially freezing enemies."
    },
    {
        name: "Ground Slam",
        type: "Attack, AoE, Slam, Melee",
        color: "Red",
        description: "Slams the ground with melee weapons, creating a wave of damage."
    },
    {
        name: "Heavy Strike",
        type: "Attack, Melee, Strike",
        color: "Red",
        description: "Performs a powerful melee attack with increased damage."
    },
    {
        name: "Hexblast",
        type: "Spell, AoE, Chaos",
        color: "Blue",
        description: "Deals chaos damage that scales with the number of hexes on enemies."
    },
    {
        name: "Holy Flame Totem",
        type: "Totem, Spell, AoE, Fire",
        color: "Red",
        description: "Summons a totem that fires a stream of flame at enemies."
    },
    {
        name: "Hydrosphere",
        type: "Spell, AoE, Cold, Lightning, Physical",
        color: "Blue",
        description: "Creates a sphere that can chain lightning and be moved by attacks."
    },
    {
        name: "Ice Crash",
        type: "Attack, AoE, Cold, Slam, Melee",
        color: "Red",
        description: "Slams the ground, creating expanding areas of ice damage."
    },
    {
        name: "Ice Nova",
        type: "Spell, AoE, Cold",
        color: "Blue",
        description: "Creates a nova of ice around you or a Frostbolt."
    },
    {
        name: "Ice Shot",
        type: "Attack, AoE, Cold, Projectile, Bow",
        color: "Green",
        description: "Fires an arrow that creates a cone of ice on impact."
    },
    {
        name: "Ice Spear",
        type: "Spell, Projectile, Cold",
        color: "Blue",
        description: "Fires spears of ice that gain critical strike chance over distance."
    },
    {
        name: "Ice Trap",
        type: "Trap, Spell, AoE, Cold",
        color: "Green",
        description: "Throws a trap that explodes in a burst of ice."
    },
    {
        name: "Icicle Mine",
        type: "Mine, Spell, Cold, AoE",
        color: "Green",
        description: "Throws a mine that fires icicles in a spread pattern."
    },
    {
        name: "Incinerate",
        type: "Spell, Fire, Channelling, AoE",
        color: "Blue",
        description: "Channels to release a stream of fire that gains stages."
    },
    {
        name: "Infernal Blow",
        type: "Attack, AoE, Melee, Strike, Fire",
        color: "Red",
        description: "Attacks enemies, causing them to explode when killed."
    },
    {
        name: "Kinetic Blast",
        type: "Attack, Projectile, AoE",
        color: "Green",
        description: "Fires a projectile that explodes when hitting terrain or at maximum range."
    },
    {
        name: "Kinetic Bolt",
        type: "Attack, Projectile",
        color: "Green",
        description: "Fires a projectile that forks when hitting enemies."
    },
    {
        name: "Lacerate",
        type: "Attack, AoE, Physical, Melee",
        color: "Red",
        description: "Slashes twice in quick succession, creating overlapping areas."
    },
    {
        name: "Lancing Steel",
        type: "Attack, Projectile, Physical",
        color: "Green",
        description: "Fires steel shards that impale enemies and can be called back."
    },
    {
        name: "Leap Slam",
        type: "Attack, AoE, Movement, Melee, Slam",
        color: "Red",
        description: "Leaps to a location and slams down, dealing damage in an area."
    },
    {
        name: "Lightning Arrow",
        type: "Attack, AoE, Lightning, Projectile, Bow",
        color: "Green",
        description: "Fires an arrow that deals lightning damage in a cone behind the target."
    },
    {
        name: "Lightning Conduit",
        type: "Spell, AoE, Lightning",
        color: "Blue",
        description: "Deals lightning damage to shocked enemies in an area."
    },
    {
        name: "Lightning Spire Trap",
        type: "Trap, Spell, AoE, Lightning",
        color: "Green",
        description: "Throws a trap that creates a spire firing lightning at nearby enemies."
    },
    {
        name: "Lightning Strike",
        type: "Attack, Projectile, Melee, Strike, Lightning",
        color: "Green",
        description: "Attacks with melee weapons, creating lightning projectiles."
    },
    {
        name: "Lightning Tendrils",
        type: "Spell, AoE, Lightning, Channelling",
        color: "Blue",
        description: "Channels to release tendrils of lightning that shock enemies."
    },
    {
        name: "Lightning Trap",
        type: "Trap, Spell, AoE, Lightning",
        color: "Green",
        description: "Throws a trap that explodes in a burst of lightning."
    },
    {
        name: "Lightning Warp",
        type: "Spell, AoE, Lightning, Movement",
        color: "Blue",
        description: "Teleports to a location after a delay, dealing lightning damage."
    },
    {
        name: "Manabond",
        type: "Spell, AoE, Lightning",
        color: "Blue",
        description: "Deals lightning damage based on missing mana."
    },
    {
        name: "Molten Strike",
        type: "Attack, Projectile, AoE, Melee, Strike, Fire",
        color: "Red",
        description: "Attacks with melee weapons, creating molten projectiles."
    },
    {
        name: "Orb of Storms",
        type: "Spell, AoE, Lightning",
        color: "Blue",
        description: "Creates an orb that fires lightning at nearby enemies."
    },
    {
        name: "Penance Brand",
        type: "Spell, AoE, Lightning, Brand",
        color: "Blue",
        description: "Creates a brand that builds energy and explodes."
    },
    {
        name: "Perforate",
        type: "Attack, AoE, Melee",
        color: "Red",
        description: "Attacks in different patterns depending on stance."
    },
    {
        name: "Pestilent Strike",
        type: "Attack, Melee, Strike, AoE, Chaos",
        color: "Green",
        description: "Attacks with melee weapons, creating chaos explosions on poisoned enemies."
    },
    {
        name: "Plague Bearer",
        type: "Spell, Chaos, AoE",
        color: "Blue",
        description: "Stores chaos damage while enemies die nearby, then releases it."
    },
    {
        name: "Poisonous Concoction",
        type: "Attack, AoE, Chaos, Projectile",
        color: "Green",
        description: "Throws a bottle that creates a poisonous area."
    },
    {
        name: "Power Siphon",
        type: "Attack, Projectile",
        color: "Green",
        description: "Fires projectiles that can generate power charges when enemies die."
    },
    {
        name: "Puncture",
        type: "Attack, Projectile, Physical, Bow",
        color: "Green",
        description: "Fires a projectile that causes bleeding, dealing more damage if the enemy moves."
    },
    {
        name: "Purifying Flame",
        type: "Spell, AoE, Fire, Physical",
        color: "Blue",
        description: "Deals fire and physical damage, creating consecrated ground."
    },
    {
        name: "Pyroclast Mine",
        type: "Mine, Spell, AoE, Fire, Physical",
        color: "Green",
        description: "Throws a mine that explodes in a fiery blast."
    },
    {
        name: "Rage Vortex",
        type: "Attack, AoE, Melee",
        color: "Red",
        description: "Consumes rage to create a vortex that deals damage over time."
    },
    {
        name: "Rain of Arrows",
        type: "Attack, AoE, Projectile, Bow",
        color: "Green",
        description: "Fires arrows into the air that rain down in a targeted area."
    },
    {
        name: "Raise Spectre",
        type: "Spell, Minion",
        color: "Blue",
        description: "Raises a monster corpse as a minion with its original abilities."
    },
    {
        name: "Raise Zombie",
        type: "Spell, Minion",
        color: "Blue",
        description: "Raises a zombie minion from a corpse."
    },
    {
        name: "Reap",
        type: "Spell, Physical, AoE",
        color: "Blue",
        description: "Deals physical damage that scales with blood charges."
    },
    {
        name: "Reave",
        type: "Attack, AoE, Melee",
        color: "Red",
        description: "Attacks with melee weapons, with area increasing with each hit."
    },
    {
        name: "Righteous Fire",
        type: "Spell, AoE, Fire",
        color: "Red",
        description: "Burns enemies around you while draining your life and energy shield."
    },
    {
        name: "Rolling Magma",
        type: "Spell, AoE, Fire, Projectile",
        color: "Blue",
        description: "Fires a ball of magma that rolls and bounces."
    },
    {
        name: "Scorching Ray",
        type: "Spell, Fire, Channelling, AoE",
        color: "Blue",
        description: "Channels a beam of fire that applies burning and reduces fire resistance."
    },
    {
        name: "Scourge Arrow",
        type: "Attack, Projectile, Channelling, Chaos, Bow",
        color: "Green",
        description: "Channels to fire an arrow that releases spore pods."
    },
    {
        name: "Seismic Trap",
        type: "Trap, Spell, AoE, Physical",
        color: "Green",
        description: "Throws a trap that creates seismic waves dealing damage over time."
    },
    {
        name: "Shattering Steel",
        type: "Attack, Projectile, AoE, Physical",
        color: "Green",
        description: "Fires steel projectiles that shatter when hitting terrain."
    },
    {
        name: "Shield Charge",
        type: "Attack, AoE, Movement, Physical, Melee",
        color: "Red",
        description: "Charges forward with a shield, dealing damage based on distance traveled."
    },
    {
        name: "Shield Crush",
        type: "Attack, AoE, Physical, Melee",
        color: "Red",
        description: "Attacks with your shield, dealing damage based on its defenses."
    },
    {
        name: "Shock Nova",
        type: "Spell, AoE, Lightning",
        color: "Blue",
        description: "Creates a nova of lightning around you."
    },
    {
        name: "Shockwave Totem",
        type: "Totem, Spell, AoE, Physical",
        color: "Red",
        description: "Summons a totem that creates damaging shockwaves."
    },
    {
        name: "Shrapnel Ballista",
        type: "Attack, Projectile, Totem, Physical, Bow",
        color: "Green",
        description: "Creates a ballista totem that fires piercing projectiles."
    },
    {
        name: "Siege Ballista",
        type: "Attack, Totem, Bow",
        color: "Green",
        description: "Creates a ballista totem that fires at nearby enemies."
    },
    {
        name: "Siphoning Trap",
        type: "Trap, Spell, AoE",
        color: "Green",
        description: "Throws a trap that slows enemies and recovers your energy shield."
    },
    {
        name: "Smite",
        type: "Attack, AoE, Lightning, Melee, Strike",
        color: "Red",
        description: "Attacks enemies, calling down lightning on nearby foes."
    },
    {
        name: "Smoke Mine",
        type: "Mine, Spell, AoE, Movement",
        color: "Green",
        description: "Throws a mine that creates a smoke cloud and teleports you to it."
    },
    {
        name: "Snipe",
        type: "Attack, Projectile, Channelling, Bow",
        color: "Green",
        description: "Channels to fire a powerful shot that gains damage over time."
    },
    {
        name: "Soulrend",
        type: "Spell, Projectile, Chaos",
        color: "Blue",
        description: "Fires a projectile that deals chaos damage over time."
    },
    {
        name: "Spark",
        type: "Spell, Projectile, Lightning",
        color: "Blue",
        description: "Fires sparks that bounce around and pierce enemies."
    },
    {
        name: "Spectral Helix",
        type: "Attack, Projectile",
        color: "Green",
        description: "Throws spectral copies of your weapon in a helix pattern."
    },
    {
        name: "Spectral Shield Throw",
        type: "Attack, Projectile, Physical",
        color: "Green",
        description: "Throws a spectral copy of your shield that can chain between enemies."
    },
    {
        name: "Spectral Throw",
        type: "Attack, Projectile",
        color: "Green",
        description: "Throws a spectral copy of your weapon that returns to you."
    },
    {
        name: "Split Arrow",
        type: "Attack, Projectile, Bow",
        color: "Green",
        description: "Fires multiple arrows in a spread pattern."
    },
    {
        name: "Splitting Steel",
        type: "Attack, Projectile, AoE, Physical",
        color: "Green",
        description: "Fires steel projectiles that split when impaling enemies."
    },
    {
        name: "Static Strike",
        type: "Attack, Melee, Strike, AoE, Lightning",
        color: "Red",
        description: "Attacks create beams of lightning that persist and hit nearby enemies."
    },
    {
        name: "Storm Brand",
        type: "Spell, AoE, Lightning, Brand",
        color: "Blue",
        description: "Creates a brand that attaches to enemies and zaps nearby foes."
    },
    {
        name: "Storm Burst",
        type: "Spell, AoE, Lightning, Channelling",
        color: "Blue",
        description: "Channels to create orbs that explode after a delay."
    },
    {
        name: "Storm Call",
        type: "Spell, AoE, Lightning",
        color: "Blue",
        description: "Calls down lightning strikes after a delay."
    },
    {
        name: "Storm Rain",
        type: "Attack, AoE, Lightning, Projectile, Bow",
        color: "Green",
        description: "Fires arrows that create storms of lightning beams."
    },
    {
        name: "Stormbind",
        type: "Spell, AoE, Lightning, Channelling",
        color: "Blue",
        description: "Channels to place runes that can be detonated for lightning damage."
    },
    {
        name: "Stormblast Mine",
        type: "Mine, Spell, AoE, Lightning",
        color: "Green",
        description: "Throws a mine that creates an orb firing lightning in all directions."
    },
    {
        name: "Summon Carrion Golem",
        type: "Spell, Minion, Golem",
        color: "Blue",
        description: "Summons a Carrion Golem that buffs other minions and attacks enemies."
    },
    {
        name: "Summon Chaos Golem",
        type: "Spell, Minion, Golem, Chaos",
        color: "Blue",
        description: "Summons a Chaos Golem that casts chaos spells."
    },
    {
        name: "Summon Flame Golem",
        type: "Spell, Minion, Golem, Fire",
        color: "Red",
        description: "Summons a Flame Golem that casts fire spells."
    },
    {
        name: "Summon Holy Relic",
        type: "Spell, Minion",
        color: "Red",
        description: "Summons a Holy Relic that heals you and attacks enemies."
    },
    {
        name: "Summon Ice Golem",
        type: "Spell, Minion, Golem, Cold",
        color: "Blue",
        description: "Summons an Ice Golem that casts cold spells and buffs your critical strikes."
    },
    {
        name: "Summon Lightning Golem",
        type: "Spell, Minion, Golem, Lightning",
        color: "Blue",
        description: "Summons a Lightning Golem that casts lightning spells and buffs your attack speed."
    },
    {
        name: "Summon Raging Spirit",
        type: "Spell, Minion, Fire",
        color: "Red",
        description: "Summons raging spirits that seek out and attack enemies."
    },
    {
        name: "Summon Reaper",
        type: "Spell, Minion, Physical",
        color: "Red",
        description: "Summons a powerful Reaper that consumes other minions to become stronger."
    },
    {
        name: "Summon Skeletons",
        type: "Spell, Minion",
        color: "Blue",
        description: "Summons skeleton warriors to fight for you."
    },
    {
        name: "Summon Stone Golem",
        type: "Spell, Minion, Golem",
        color: "Red",
        description: "Summons a Stone Golem that taunts enemies and buffs your life regeneration."
    },
    {
        name: "Sunder",
        type: "Attack, AoE, Slam, Melee",
        color: "Red",
        description: "Slams the ground, creating a fissure that travels forward."
    },
    {
        name: "Sweep",
        type: "Attack, AoE, Melee",
        color: "Red",
        description: "Attacks all enemies around you with melee weapons."
    },
    {
        name: "Tectonic Slam",
        type: "Attack, AoE, Fire, Slam, Melee",
        color: "Red",
        description: "Slams the ground, creating a fiery fissure."
    },
    {
        name: "Tornado",
        type: "Spell, AoE, Physical",
        color: "Blue",
        description: "Creates a tornado that moves around and reflects projectiles."
    },
    {
        name: "Tornado Shot",
        type: "Attack, Projectile, Bow",
        color: "Green",
        description: "Fires an arrow that creates secondary projectiles on impact."
    },
    {
        name: "Toxic Rain",
        type: "Attack, AoE, Chaos, Projectile, Bow",
        color: "Green",
        description: "Fires arrows that create spore pods dealing chaos damage over time."
    },
    {
        name: "Unearth",
        type: "Spell, Projectile, AoE, Physical",
        color: "Blue",
        description: "Fires bone projectiles and creates corpses."
    },
    {
        name: "Venom Gyre",
        type: "Attack, Projectile, Chaos",
        color: "Green",
        description: "Throws projectiles that whirl around you and can be recalled."
    },
    {
        name: "Vigilant Strike",
        type: "Attack, Melee, Strike",
        color: "Red",
        description: "Attacks with melee weapons, granting fortify on hit."
    },
    {
        name: "Viper Strike",
        type: "Attack, Melee, Strike, Chaos",
        color: "Green",
        description: "Attacks with melee weapons, applying stacking poison."
    },
    {
        name: "Void Sphere",
        type: "Spell, AoE, Physical",
        color: "Blue",
        description: "Creates a sphere that pulls in enemies and projectiles."
    },
    {
        name: "Volatile Dead",
        type: "Spell, AoE, Fire",
        color: "Blue",
        description: "Consumes corpses to create orbs that seek out and explode on enemies."
    },
    {
        name: "Volcanic Fissure",
        type: "Attack, AoE, Melee, Slam, Fire",
        color: "Red",
        description: "Slams the ground to create a volcanic fissure."
    },
    {
        name: "Voltaxic Burst",
        type: "Spell, AoE, Chaos, Lightning",
        color: "Blue",
        description: "Deals chaos and lightning damage in an area, with damage scaling over time."
    },
    {
        name: "Vortex",
        type: "Spell, AoE, Cold",
        color: "Blue",
        description: "Creates a vortex of cold that deals damage over time."
    },
    {
        name: "Wave of Conviction",
        type: "Spell, AoE, Fire, Lightning, Physical",
        color: "Blue",
        description: "Deals fire, lightning, and physical damage while exposing enemy resistances."
    },
    {
        name: "Whirling Blades",
        type: "Attack, Movement, Melee",
        color: "Green",
        description: "Moves through enemies while attacking with melee weapons."
    },
    {
        name: "Wild Strike",
        type: "Attack, Melee, Strike",
        color: "Green",
        description: "Attacks with melee weapons, randomly triggering elemental effects."
    },
    {
        name: "Winter Orb",
        type: "Spell, Channelling, Cold, Projectile",
        color: "Blue",
        description: "Channels to create an orb that fires projectiles at nearby enemies."
    },
    {
        name: "Wintertide Brand",
        type: "Spell, Brand, Cold, AoE",
        color: "Blue",
        description: "Creates a brand that deals cold damage over time, with damage increasing over time."
    }
];

// Function to get all skill names
function getAllSkillNames() {
    return skillsData.map(skill => skill.name);
}

// Function to get skill by name
function getSkillByName(name) {
    return skillsData.find(skill => skill.name === name);
}

// Make skillsData available globally
if (typeof window !== 'undefined') {
    window.skillsData = skillsData;
} else if (typeof global !== 'undefined') {
    global.skillsData = skillsData;
}