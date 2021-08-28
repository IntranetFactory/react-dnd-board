
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import BoardContainer from './BoardContainer'

const Board = ({ metadata }) => {
    return (
        <DndProvider backend={HTML5Backend}>
            <BoardContainer />
        </DndProvider>
    )
};

export default Board;