
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import BoardContainer from './BoardContainer'

const Board = (props) => {    
    return (
        <DndProvider backend={HTML5Backend}>
            <BoardContainer {...props}/>
        </DndProvider>
    )
};

export default Board;