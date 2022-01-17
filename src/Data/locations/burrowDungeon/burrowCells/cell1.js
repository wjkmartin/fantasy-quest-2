import { useSelector } from 'react-redux';

const cell1 = () => {
    return useSelector(state => state.quests.questState).filter(quest => quest.stage === 0 && quest.id === 1)[0];
}

export default {
    description1: cell1 ? 'A bound person lies on the floor.' : 'there\s nothing here',
    buttons: [{'Exit the cell':'top'}],
    prettyName: 'Cell',
    name: 'cell1',
    type: 'sub',
    super: 'burrowCells'
  };
  