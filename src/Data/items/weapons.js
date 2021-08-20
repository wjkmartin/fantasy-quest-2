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
        addedDmgString: '1d2'
    },
}