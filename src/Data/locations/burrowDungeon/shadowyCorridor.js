import questSlice from '../../../DataHandlers/redux/slices/quests';
import locationSlice from '../../../DataHandlers/redux/slices/locations';
import UISlice from '../../../DataHandlers/redux/slices/UI';
import { useSelector } from 'react-redux';

const shadowyCorridor = () => {
  return useSelector((state) => state.quests.questStateUntracked).filter(
    (quest) => quest.id === 1
  )[0];
};

const buttonsDarkness = [
  {
    'Attempt to press on through the darkness.': {
      type: 'justButton',
      onPress: (dispatch, state) => {
        dispatch(
          UISlice.actions.addMessageToActivityLog({
            message:
              'You enter the darkness, but a few moments later find yourself exiting exactly where you entered. It would seem passage further is impossible.',
          })
        );
      },
    },
  },
  {
    'Attempt to dispel the obviously magical darkness.': {
      type: 'justButton',
      onPress: (dispatch, state) => {
        if (state.actors.actorsById[0].intelligence >= 20) {
          dispatch(
            UISlice.actions.addMessageToActivityLog({
              message:
                'Summoning your magic, you cast a spell that dispels the darkness, watching as it fades like melting fog in the sun. The passage is now clear.',
            })
          );
          dispatch(
            questSlice.actions.setQuestStageUntracked({ id: 1, stage: 1 })
          );
          dispatch(locationSlice.actions.unHideLocationById({ id: 73 }));
        } else {
          dispatch(
            UISlice.actions.addMessageToActivityLog({
              message:
                'You attempt to dispel the darkness, but your magic is too weak. You beat yourself up a little before finally settling on the thought that you must just be having an off day. The passage is still blocked by the shadows.',
            })
          );
        }
      },
    },
  },
];

export default {
  name: 'shadowyCorridor',
  icon: 'grip-lines',
  buttons: shadowyCorridor.stage ? [] : buttonsDarkness,
  description1: shadowyCorridor.stage
    ? 'The shadows that once pervaded the air here are all but gone now, with only a few wisps visible in the corners of the corridor.'
    : 'A malevolent inky blackness fills the corridor, making it impossible to see beyond. The darkness absorbs the surrounding light, and the longer you state at the swirling nothingness the more you feel an overpowering sense of dread.',
  prettyName: 'Shadowy Corridor',
  type: 'top',
};
