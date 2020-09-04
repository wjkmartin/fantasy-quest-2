import store from "../../../../../DataHandlers/redux/store";
import actions from "../../../../../DataHandlers/redux/actions";

export default function startCombat() {
    store.dispatch(actions.resetActorCombatPropsById(0))
    store.dispatch(actions.setActorLocationCombat(0, [0,3]))

    Object.values(arguments).forEach(id => {
        store.dispatch(actions.resetActorCombatPropsById(id))
        store.dispatch(actions.setActorLocationCombat(id, [1,3]))
    });

    store.dispatch(actions.startCombat())
}