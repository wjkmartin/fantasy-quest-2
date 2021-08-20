import actions from "../../DataHandlers/redux/actions"
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
                dispatch(actions.modifyActorAttributeByActorId(0, 'health', (healingRoll > healthDif ? healthDif : healingRoll)))
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
                dispatch(actions.modifyActorAttributeByActorId(0, 'health', (healingRoll > healthDif ? healthDif : healingRoll)))
            }
        },
        icon: 'fa-flask-potion',
        rarity: 3,
        descDetails: 'Restores 3d8 + 50 health.',
        desc: 'An exceedingly uncommon "greater" potion of healing, which requires extremely rare ingredients and care to craft. Use it well.',
        value: 100,
        type: 'consumable',
        slot: 'none'
    }
}