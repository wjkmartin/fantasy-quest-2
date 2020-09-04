import _ from 'underscore'

export default 
{
    oak_stave: {
        name: 'Oak Branch',
        icon: 'fa-staff',
        rarity: 0,
        descDetails: 'Deals 1d4 damage per hit.',
        desc: 'A simple weapon. Strong and sturdy. No man turns down a stout wooden branch, when the alternative is an empty hand to face the sharp steel of a bandit.',
        stats: {weaponDamageFunction: function() {return _.random(1,4)}},
        value: 2,
        slot: 'weapon_main',
        addedDmgString: '1d4'
    },
}