import _ from 'underscore'

export default 
{
    oak_stave: {
        name: 'Oak Branch',
        icon: 'fa-staff',
        rarity: 0,
        descDetails: 'Deals an additional 1 damage per hit.',
        desc: 'A simple weapon. Strong and sturdy. No man turns down a stout wooden branch, when the alternative is an empty hand to face the sharp steel of a bandit.',
        stats: {weaponDamageFunction: function() {return 1}},
        value: 1,
        slot: 'weapon_main',
        addedDmgString: '1'
    },
    rusty_sword: {
        name: 'Rusty Iron Sword',
        icon: 'fa-sword',
        rarity: 0,
        descDetails: 'Deals an additional 1d4 damage per hit.',
        desc: 'This rusty sword was a non-rusty sword once, perhaps. Not any more. It will not do much against armor, but to the unprotected it may sting a little.',
        stats: {weaponDamageFunction: function() {return _.random(1,4)}},
        value: 10,
        slot: 'weapon_main',
        addedDmgString: '1d4'
    },
    iron_sword: {
        name: 'Iron Sword',
        icon: 'fa-sword',
        rarity: 1,
        descDetails: 'Deals an additional 1d4 + 4 damage per hit.',
        desc: 'A blade of freshly forged iron. Some might call this weapon basic, but with the right wielder great and terrible things can be accomplished with this blade.',
        stats: {weaponDamageFunction: function() {return _.random(1,4) + 4}},
        value: 50,
        slot: 'weapon_main',
        addedDmgString: '1d4 + 4'
    },
    steel_sword: {
        name: 'Steel Sword',
        icon: 'fa-sword',
        rarity: 2,
        descDetails: 'Deals an additional 3d4 + 4 damage per hit.',
        desc: 'A fine weapon made of razor sharp steel. A weapon of this quality is often found among city guards and the more succesful mercenaries.',
        stats: {weaponDamageFunction: function() {return _.random(1,4) + _.random(1,4) + _.random(1,4) + 4}},
        value: 200,
        slot: 'weapon_main',
        addedDmgString: '3d4 + 4'
    },
    enchanted_steel_sword: {
        name: 'Enchanted Steel Sword',
        icon: 'fa-sword',
        rarity: 4,
        descDetails: 'Deals an additional 3d4 + 14 damage per hit.',
        desc: 'Enchanted weapons deal devastating damage to the magically unprotected, albeit at a significant cost.',
        stats: {weaponDamageFunction: function() {return _.random(1,4) + _.random(1,4) + _.random(1,4) + 14}},
        value: 1000,
        slot: 'weapon_main',
        addedDmgString: '3d4 + 14',
        magic: true
    },
}