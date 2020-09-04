export default 
{
    TEMPLATE: {
        name: '', //Should be pretty
        icon: '', //FA classname 
        rarity: 1, // [1-6] Common, Uncommon, Rare, Very Rare, Legendary, Artifact
        type: '', // type of weapon or armor e.g. "Magical Sword"
        damageDesc: '', //decription of special dmg effects
        desc: '', //pretty flavor text.
        slot: '' //head, chest, legs, feet, rightHand, leftHand, accessory
    },
    basic_circlet: {
        name: 'Scratched Circlet of Brass',
        icon: 'fa-hat-wizard',
        rarity: 1,
        descDetails: 'Adds 1 armor.',
        desc: 'A damaged circlet made of common brass. The magical runes are damaged, rendering it wholly mundane.',
        stats: {armor: 1},
        slot: 'head',
        value: 3,
    },
};