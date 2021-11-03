
import UI from "../../../../../DataHandlers/redux/slices/UI";
import actorSlice from "../../../../../DataHandlers/redux/slices/actors";

export function addXP(qty, dispatch, player, overrideMax = 0) {
    const XPMaxToTest = (player.xpToNextLevel > overrideMax ? player.xpToNextLevel : overrideMax) 
    if ((player.xp + qty) >= XPMaxToTest) {
        const overflow = (player.xp + qty) - player.xpToNextLevel  
        const nextLevelXPMax = (player.xpToNextLevel + 50) * 1.5;
        dispatch(actorSlice.actions.setActorAttributeByActorId({actorId: 0, attribute: "xp", value: player.xp + (player.xpToNextLevel - qty)}));
        dispatch(UI.actions.addMessageToActivityLog(`You've leveled up! Welcome to level ${player.level + 1}!`))
        dispatch(actorSlice.actions.setActorAttributeByActorId({actorId: 0, attribute: 'xpToNextLevel', value: nextLevelXPMax}))
        dispatch(actorSlice.actions.setActorAttributeByActorId({actorId: 0, attribute: 'levelsUpAvailable', value: player.levelsUpAvailable + 1}))
        if (overflow > 0) addXP(overflow, dispatch, player, nextLevelXPMax)
    } else {
        dispatch(actorSlice.actions.setActorAttributeByActorId({actorId: 0, attribute: "xp", value: player.xp + qty}));
    }
}