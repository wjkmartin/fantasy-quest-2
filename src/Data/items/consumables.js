import actor from '../../DataHandlers/redux/slices/actors'
import _ from 'underscore'

export default {
    potion_of_healing: {
        name: 'Potion of Healing',
        effectFunction: function(playerObject, dispatch) {
            const playerHealth = playerObject.health
            const playerMaxHealth = playerObject.maxHealth
            const healthDif = (playerMaxHealth - playerHealth > 0 ? playerMaxHealth - playerHealth : 0)

            if (healthDif > 0) {
                const healingRoll = _.random(1,8) + _.random(1,8) + 25;
                dispatch(actor.actions.modifyActorAttributeByActorId({actorId: 0, attribute: 'health', value: (healingRoll > healthDif ? healthDif : healingRoll)}))
            }
        },
        icon: 'fa-flask-potion',
        rarity: 2,
        descDetails: 'Restores 2d8 + 25 health.',
        desc: 'A potion of healing - a difficult to brew magical potion that will instantly cure your wounds... but it has its limitations.',
        value: 20,
        type: 'consumable',
        slot: 'none'
    },
    potion_of_greater_healing: {
        name: 'Potion of Greater Healing',
        effectFunction: function(playerObject, dispatch) {
            const playerHealth = playerObject.health
            const playerMaxHealth = playerObject.maxHealth
            const healthDif = (playerMaxHealth - playerHealth > 0 ? playerMaxHealth - playerHealth : 0)

            if (healthDif > 0) {
                const healingRoll = _.random(1,12) + _.random(1,12) + _.random(1,12) + 50;
                dispatch(actor.actions.modifyActorAttributeByActorId({actorId: 0, attribute: 'health', value: (healingRoll > healthDif ? healthDif : healingRoll)}))
            }
        },
        icon: 'fa-flask-potion',
        rarity: 3,
        descDetails: 'Restores 3d8 + 50 health.',
        desc: 'An exceedingly uncommon "greater" potion of healing, which requires extremely rare ingredients and care to craft. Use it well.',
        value: 100,
        type: 'consumable',
        slot: 'none'
    },
    herb_healing: {
        name: 'Brendlewort',
        effectFunction: function(playerObject, dispatch) {
            const playerHealth = playerObject.health
            const playerMaxHealth = playerObject.maxHealth
            const healthDif = (playerMaxHealth - playerHealth > 0 ? playerMaxHealth - playerHealth : 0)

            if (healthDif > 0) {
                dispatch(actor.actions.modifyActorAttributeByActorId({actorId: 0, attribute: 'health', value: 1}))
            }
        },
        icon: 'fa-leaf',
        rarity: 0,
        descDetails: 'Restores 1 health.',
        desc: 'A somewhat uncommon herb that can be used as a component of healing potions. The refining process is a closely guarded secret few possess, rendering it worthless to all but a few.',
        value: 10,
        type: 'consumable',
        slot: 'none'
    },
}