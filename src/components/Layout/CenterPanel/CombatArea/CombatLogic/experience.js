import actions from "../../../../../DataHandlers/redux/actions";

export function addXP(qty, dispatch, player, overrideMax = 0) {
    const XPMaxToTest = (player.xpToNextLevel > overrideMax ? player.xpToNextLevel : overrideMax) 
    if ((player.xp + qty) >= XPMaxToTest) {
        const overflow = (player.xp + qty) - player.xpToNextLevel  
        const nextLevelXPMax = (player.xpToNextLevel + 50) * 1.5;
        dispatch(actions.modifyActorAttributeByActorId(0, "xp", player.xpToNextLevel - qty));
        dispatch(actions.addMessageToActivityLog(`You've leveled up! Welcome to level ${player.level + 1}!`))
        dispatch(actions.setActorAttributeByActorId(0, 'xpToNextLevel', nextLevelXPMax))
        dispatch(actions.modifyActorAttributeByActorId(0, 'levelsUpAvailable', 1))
        if (overflow > 0) addXP(overflow, dispatch, player, nextLevelXPMax)
    } else {
        dispatch(actions.modifyActorAttributeByActorId(0, "xp", qty));
    }
}