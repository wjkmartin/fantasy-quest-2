import hpLevelDescriptionsData from '../../../../Data/damageText/injuryText'
import _ from 'underscore'

export function getFancyNameForDamage(actorHP, actorMaxHP) {
    const hpPercentage = actorHP / actorMaxHP
   
    let randNum = _.random(0,4)
    
    if (hpPercentage === 1) {
        return hpLevelDescriptionsData[100][randNum]
    } else if (hpPercentage > .9) {
        return hpLevelDescriptionsData[90][randNum]
    } else if (hpPercentage > .75) {
        return hpLevelDescriptionsData[75][randNum]
    } else if (hpPercentage > .5) {
        return hpLevelDescriptionsData[50][randNum]
    } else if (hpPercentage > .25) {
        return hpLevelDescriptionsData[25][randNum]
    } else if (hpPercentage > .1) {
        return hpLevelDescriptionsData[10][randNum]
    } else return "They are DED."

}