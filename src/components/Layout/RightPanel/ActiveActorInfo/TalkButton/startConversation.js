import store from '../../../../../DataHandlers/redux/store'
import UI from '../../../../../DataHandlers/redux/slices/UI';

export default function startConversation(actorId) {
    store.dispatch(UI.actions.startConversationWithActorById(actorId))
    
}