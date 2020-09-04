import store from '../../../../../DataHandlers/redux/store'
import actions from '../../../../../DataHandlers/redux/actions'

export default function startConversation(actorId) {
    store.dispatch(actions.startConversationWithActorById(actorId))
    
}